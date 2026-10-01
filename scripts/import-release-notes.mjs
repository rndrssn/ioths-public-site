import fs from 'node:fs';
import path from 'node:path';
import { repositoryRoot } from './content.mjs';

// App Store Connect release notes are free text: section labels vary between
// releases and bullets are sometimes missing their space. Normalize them into
// the changelog's Markdown subset; existing entries are never overwritten, so
// a hand-edited entry survives a later import.
const sectionNames = new Map([
  ["what's new", 'New'],
  ['new', 'New'],
  ['new features and capabilities', 'New'],
  ['improved', 'Improved'],
  ['improvements', 'Improved'],
  ['fixed', 'Fixed'],
  ['fixes', 'Fixed'],
]);

function normalize(whatsNew) {
  const blocks = [];
  for (const rawLine of whatsNew.replaceAll('\r\n', '\n').split('\n')) {
    const line = rawLine.trim();
    if (!line) {
      if (blocks.at(-1) !== '') blocks.push('');
      continue;
    }
    const section = sectionNames.get(line.replace(/:$/, '').toLowerCase());
    if (section) {
      if (blocks.length > 0 && blocks.at(-1) !== '') blocks.push('');
      blocks.push(`### ${section}`, '');
      continue;
    }
    const bullet = line.match(/^[-•–]\s*(.+)$/);
    blocks.push(bullet ? `- ${bullet[1]}` : line);
  }
  return blocks.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

const [, , inputPath, flag] = process.argv;
if (!inputPath) {
  throw new Error('Usage: node ../ioths/scripts/app-store-release-notes.js > notes.json && node scripts/import-release-notes.mjs notes.json [--force]');
}
const { releases } = JSON.parse(fs.readFileSync(inputPath === '-' ? 0 : inputPath, 'utf8'));
const changelogRoot = path.join(repositoryRoot, 'content', 'changelog');
fs.mkdirSync(changelogRoot, { recursive: true });

for (const release of releases) {
  if (!/^\d+\.\d+\.\d+$/.test(release.version)) throw new Error(`Unexpected App Store version: ${release.version}`);
  const file = path.join(changelogRoot, `${release.version}.md`);
  if (fs.existsSync(file) && flag !== '--force') {
    console.log(`kept      ${release.version} (already imported)`);
    continue;
  }
  const body = normalize(release.whatsNew);
  if (!body) {
    console.log(`skipped   ${release.version} (no English release notes; write content/changelog/${release.version}.md by hand)`);
    continue;
  }
  fs.writeFileSync(file, `---\nversion: ${release.version}\ndate: ${release.date}\n---\n\n${body}\n`);
  console.log(`imported  ${release.version}`);
}
