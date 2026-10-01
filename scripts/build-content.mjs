import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { appStoreURL, displayDate, escapeHTML, readCollection, renderMarkdown, repositoryRoot, siteURL } from './content.mjs';

const outputRoot = path.join(repositoryRoot, 'dist');
const organization = { '@type': 'Organization', '@id': 'https://bedrockrebel.app/#organization', name: 'Bedrock Rebellion', url: 'https://bedrockrebel.app/' };
const socialImage = `${siteURL}/assets/marketing/social-card.png`;

function blockHTML(block) {
  return typeof block === 'string' ? block : `<h${block.level}>${block.html}</h${block.level}>`;
}

// The document stylesheet draws a rule above each section, so every h2 opens
// one; anything before the first h2 is the page's lead.
function sectioned(blocks) {
  const groups = [[]];
  for (const block of blocks) {
    if (typeof block !== 'string' && block.level === 2) groups.push([]);
    groups.at(-1).push(blockHTML(block));
  }
  const [lead, ...sections] = groups;
  return [...lead, ...sections.map((section) => `<section>\n      ${section.join('\n      ')}\n    </section>`)].join('\n    ');
}

function breadcrumbs(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, item], index) => ({ '@type': 'ListItem', position: index + 1, name, item })),
  };
}

function page({ urlPath, title, description, label, ogType, structuredData, main }) {
  const url = `${siteURL}${urlPath}`;
  return `<!DOCTYPE html>
<html lang="en" data-theme="plain-readable">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHTML(title)}</title>
  <meta name="description" content="${escapeHTML(description)}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <meta name="author" content="Bedrock Rebellion">
  <meta name="apple-itunes-app" content="app-id=6787224776">
  <link rel="canonical" href="${url}">
  <script src="https://cdn.telemetrydeck.com/websdk/telemetrydeck.min.js" data-app-id="1DCF7FFD-85DF-487C-93D3-439C23BFA67A" defer></script>
  <meta property="og:type" content="${ogType}">
  <meta property="og:url" content="${url}">
  <meta property="og:site_name" content="ioths">
  <meta property="og:title" content="${escapeHTML(title)}">
  <meta property="og:description" content="${escapeHTML(description)}">
  <meta property="og:image" content="${socialImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <script type="application/ld+json">
    ${JSON.stringify({ '@context': 'https://schema.org', '@graph': [...structuredData, organization] }).replaceAll('<', '\\u003c')}
  </script>
  <link rel="stylesheet" href="/assets/platoscave/plain-readable.css">
  <link rel="stylesheet" href="/style.css">
  <link rel="icon" type="image/png" sizes="64x64" href="/favicon-64x64.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
</head>
<body class="journal-document">
  <a class="journal-document-skip" href="#main">Skip to content</a>
  <header class="journal-document-header">
    <div class="journal-document-wrap journal-document-masthead">
      <a class="journal-document-wordmark" href="/"><span class="back-icon" aria-hidden="true">←</span><img src="/icon-why-240.png" alt="" width="32" height="32" decoding="async">ioths</a>
      <p class="journal-document-label">${label}</p>
    </div>
  </header>
  <main id="main" class="journal-document-main journal-content">
    ${main}
    <aside class="callout content-cta" aria-label="Get ioths">
      <p>ioths is a free download for iPhone and iPad running iOS 18 or later. Writing and editing on your device stay free; a one-time Full Unlock, not a subscription, adds Files-folder, GitHub, GitLab, and OneDrive storage.</p>
      <p><a class="button-primary" href="${appStoreURL}" target="_blank" rel="noopener noreferrer">Get ioths on the App Store <span aria-hidden="true">↗</span></a></p>
    </aside>
  </main>
  <footer class="journal-document-footer">
    <div class="journal-document-wrap">
      <p>ioths / An independent tool by Bedrock Rebellion</p>
      <nav aria-label="Site"><a href="/guides/">Guides</a><a href="/changelog">Changelog</a><a href="/support">Contact</a><a href="/legal/privacy">Privacy</a><a href="/legal/terms">Terms</a><a href="/legal/legal-notice">Legal notice</a></nav>
      <p class="journal-trademark">Apple, the Apple logo, iPhone, and iPad are trademarks of Apple Inc., registered in the U.S. and other countries. App Store is a service mark of Apple Inc.</p>
    </div>
  </footer>
</body>
</html>
`;
}

function write(relativePath, html) {
  fs.mkdirSync(path.dirname(path.join(outputRoot, relativePath)), { recursive: true });
  fs.writeFileSync(path.join(outputRoot, relativePath), html);
}

const guides = readCollection('guides').sort((left, right) => right.fields.published.localeCompare(left.fields.published));
for (const guide of guides) {
  assert.match(guide.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, `${guide.file} needs a lowercase hyphenated filename`);
  for (const field of ['title', 'description', 'published', 'updated']) {
    assert.match(guide.fields[field] ?? '', /\S/, `${guide.file} needs ${field}`);
  }
  assert.match(guide.fields.published, /^\d{4}-\d{2}-\d{2}$/, `${guide.file} published must be an ISO date`);
  assert.match(guide.fields.updated, /^\d{4}-\d{2}-\d{2}$/, `${guide.file} updated must be an ISO date`);
}

const changelog = readCollection('changelog').map((entry) => {
  assert.match(entry.fields.version ?? '', /^\d+\.\d+\.\d+$/, `${entry.file} needs a MAJOR.MINOR.PATCH version`);
  assert.equal(entry.slug, entry.fields.version, `${entry.file} filename must match its version`);
  assert.match(entry.fields.date ?? '', /^\d{4}-\d{2}-\d{2}$/, `${entry.file} needs an ISO date`);
  return entry;
}).sort((left, right) => right.fields.version.localeCompare(left.fields.version, 'en', { numeric: true }));

for (const guide of guides) {
  const urlPath = `/guides/${guide.slug}`;
  const url = `${siteURL}${urlPath}`;
  write(`guides/${guide.slug}.html`, page({
    urlPath,
    title: `${guide.fields.title} — ioths`,
    description: guide.fields.description,
    label: 'Guide',
    ogType: 'article',
    structuredData: [
      {
        '@type': 'TechArticle',
        '@id': `${url}#article`,
        headline: guide.fields.title,
        description: guide.fields.description,
        url,
        mainEntityOfPage: url,
        image: socialImage,
        datePublished: guide.fields.published,
        dateModified: guide.fields.updated,
        inLanguage: 'en',
        author: { '@id': organization['@id'] },
        publisher: { '@id': organization['@id'] },
        about: { '@type': 'SoftwareApplication', '@id': `${siteURL}/#app`, name: 'ioths', url: `${siteURL}/` },
      },
      breadcrumbs([['ioths', `${siteURL}/`], ['Guides', `${siteURL}/guides/`], [guide.fields.title, url]]),
    ],
    main: `<p class="journal-document-label journal-document-accent"><a href="/guides/">Guides</a></p>
    <h1>${escapeHTML(guide.fields.title)}</h1>
    <p class="meta">Updated ${displayDate(guide.fields.updated)}</p>
    ${sectioned(renderMarkdown(guide.body))}`,
  }));
}

if (guides.length > 0) {
  write('guides/index.html', page({
    urlPath: '/guides/',
    title: 'Guides — ioths',
    description: 'How to keep Markdown notes, tasks, and a kanban board on iPhone and iPad with ioths: plain files, optional storage, and no account.',
    label: 'Guides',
    ogType: 'website',
    structuredData: [
      { '@type': 'CollectionPage', '@id': `${siteURL}/guides/#page`, url: `${siteURL}/guides/`, name: 'ioths guides', inLanguage: 'en', publisher: { '@id': organization['@id'] } },
      breadcrumbs([['ioths', `${siteURL}/`], ['Guides', `${siteURL}/guides/`]]),
    ],
    main: `<p class="journal-document-label journal-document-accent">Guides</p>
    <h1>Guides</h1>
    <p class="meta">Plain-file notes and tasks on iPhone and iPad</p>
    ${guides.map((guide) => `<section>
      <h2><a href="/guides/${guide.slug}">${escapeHTML(guide.fields.title)}</a></h2>
      <p>${escapeHTML(guide.fields.description)}</p>
    </section>`).join('\n    ')}`,
  }));
}

if (changelog.length > 0) {
  write('changelog.html', page({
    urlPath: '/changelog',
    title: 'Changelog — ioths',
    description: `What changed in each ioths release for iPhone and iPad, from the App Store release notes. Latest: version ${changelog[0].fields.version}.`,
    label: 'Changelog',
    ogType: 'website',
    structuredData: [
      { '@type': 'WebPage', '@id': `${siteURL}/changelog#page`, url: `${siteURL}/changelog`, name: 'ioths changelog', inLanguage: 'en', dateModified: changelog[0].fields.date, about: { '@id': `${siteURL}/#app` }, publisher: { '@id': organization['@id'] } },
      breadcrumbs([['ioths', `${siteURL}/`], ['Changelog', `${siteURL}/changelog`]]),
    ],
    main: `<p class="journal-document-label journal-document-accent">Changelog</p>
    <h1>Changelog</h1>
    <p class="meta">Release notes for every ioths version on the App Store</p>
    ${changelog.map((entry) => `<section id="v${entry.fields.version.replaceAll('.', '-')}">
      <h2>Version ${entry.fields.version}</h2>
      <p class="meta">${displayDate(entry.fields.date)}</p>
      ${renderMarkdown(entry.body).map(blockHTML).join('\n      ')}
    </section>`).join('\n    ')}`,
  }));
}

const sitemapEntries = [
  ...(guides.length > 0 ? [[`${siteURL}/guides/`, guides.map((guide) => guide.fields.updated).sort().at(-1)]] : []),
  ...guides.map((guide) => [`${siteURL}/guides/${guide.slug}`, guide.fields.updated]),
  ...(changelog.length > 0 ? [[`${siteURL}/changelog`, changelog[0].fields.date]] : []),
];
const sitemapPath = path.join(outputRoot, 'sitemap.xml');
// Strip entries from an earlier run so building against an existing dist
// stays idempotent.
const baseSitemap = fs.readFileSync(sitemapPath, 'utf8').replace(/  <url>\n    <loc>https:\/\/ioths\.bedrockrebel\.app\/(?:guides\/[^<]*|changelog)<\/loc>\n    <lastmod>[^<]+<\/lastmod>\n  <\/url>\n/g, '');
fs.writeFileSync(sitemapPath, baseSitemap.replace(
  '</urlset>',
  `${sitemapEntries.map(([loc, lastmod]) => `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`).join('\n')}\n</urlset>`
));
