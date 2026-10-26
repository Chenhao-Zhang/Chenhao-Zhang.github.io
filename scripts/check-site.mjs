import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

// Check the generated site before publishing it.
const root = path.resolve('_site');
const files = [];
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const name = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(name);
    else if (entry.name.endsWith('.html')) files.push(name);
  }
}
await walk(root);
const errors = [];
for (const file of files) {
  const html = await readFile(file, 'utf8');
  if (!/<html lang="en">/.test(html)) errors.push(`${file}: missing English language`);
  // The publications page is intentionally blank until publications are added.
  if (path.relative(root, file).split(path.sep).join('/') !== 'article/index.html' && !/<h1[\s>]/.test(html)) errors.push(`${file}: missing main heading`);
  if (/\{\{|\{%/.test(html)) errors.push(`${file}: unrendered template`);
  for (const match of html.matchAll(/(?:href|src)="([^"\s]+)"/g)) {
    const href = match[1];
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(href)) continue;
    const clean = decodeURIComponent(href.split(/[?#]/)[0]);
    let target = clean.startsWith('/') ? path.join(root, clean) : path.resolve(path.dirname(file), clean);
    try {
      if ((await stat(target)).isDirectory()) target = path.join(target, 'index.html');
      await stat(target);
    } catch { errors.push(`${path.relative(root, file)}: broken local link ${href}`); }
  }
}
for (const required of ['index.html', 'blog/index.html', 'article/index.html', '404.html']) {
  try { await stat(path.join(root, required)); } catch { errors.push(`Missing page: ${required}`); }
}
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log(`Checked ${files.length} pages: all local links, assets, headings, and templates passed.`);
