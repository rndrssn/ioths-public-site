import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const siteURL = 'https://ioths.bedrockrebel.app';
export const appStoreURL = 'https://apps.apple.com/app/id6787224776';

export function escapeHTML(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

export function parseFrontmatter(source, file) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error(`${file} needs a --- frontmatter block`);
  const fields = {};
  for (const line of match[1].split('\n')) {
    const field = line.match(/^([a-z]+):\s*(.*)$/);
    if (!field) throw new Error(`${file} has an unreadable frontmatter line: ${line}`);
    fields[field[1]] = field[2].trim();
  }
  return { fields, body: match[2].trim() };
}

export function readCollection(directory) {
  const root = path.join(repositoryRoot, 'content', directory);
  if (!fs.existsSync(root)) return [];
  return fs.readdirSync(root)
    .filter((name) => name.endsWith('.md'))
    .map((name) => {
      const file = path.join('content', directory, name);
      return { slug: name.slice(0, -3), file, ...parseFrontmatter(fs.readFileSync(path.join(repositoryRoot, file), 'utf8'), file) };
    });
}

function renderInline(text) {
  const codeSpans = [];
  let html = escapeHTML(text).replace(/`([^`]+)`/g, (_, code) => {
    codeSpans.push(`<code>${code}</code>`);
    return `\u0000${codeSpans.length - 1}\u0000`;
  });
  html = html
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) => {
      if (!/^(?:https:\/\/|\/|#|mailto:)/i.test(href)) throw new Error(`Unsupported link target: ${href}`);
      return `<a href="${href}">${label}</a>`;
    });
  return html.replace(/\u0000(\d+)\u0000/g, (_, index) => codeSpans[Number(index)]);
}

// Supports the subset the guides and App Store release notes use: headings,
// paragraphs, bullet and numbered lists, fenced code, and inline code, bold,
// italics, and links. Anything else renders as a paragraph.
export function renderMarkdown(markdown) {
  const blocks = [];
  const lines = markdown.split('\n');
  for (let index = 0; index < lines.length;) {
    const line = lines[index];
    if (!line.trim()) { index += 1; continue; }
    if (line.startsWith('```')) {
      const code = [];
      for (index += 1; index < lines.length && !lines[index].startsWith('```'); index += 1) code.push(lines[index]);
      index += 1;
      blocks.push(`<pre><code>${escapeHTML(code.join('\n'))}</code></pre>`);
      continue;
    }
    const heading = line.match(/^(#{2,3}) (.+)$/);
    if (heading) {
      blocks.push({ level: heading[1].length, html: renderInline(heading[2]) });
      index += 1;
      continue;
    }
    const ordered = /^\d+\. /.test(line);
    if (ordered || line.startsWith('- ')) {
      const listPattern = ordered ? /^\d+\. (.*)$/ : /^- (.*)$/;
      const tag = ordered ? 'ol' : 'ul';
      const items = [];
      for (; index < lines.length && listPattern.test(lines[index]); index += 1) {
        items.push(`<li>${renderInline(lines[index].match(listPattern)[1])}</li>`);
      }
      blocks.push(`<${tag}>${items.join('')}</${tag}>`);
      continue;
    }
    const paragraph = [];
    for (; index < lines.length && lines[index].trim() && !/^(#{2,3} \S|- |\d+\. |```)/.test(lines[index]); index += 1) {
      paragraph.push(lines[index].trim());
    }
    blocks.push(`<p>${renderInline(paragraph.join(' '))}</p>`);
  }
  return blocks;
}

export function displayDate(isoDate) {
  return new Date(`${isoDate}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}
