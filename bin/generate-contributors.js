const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const readmePath = path.join(repoRoot, 'README.md');
const outDir = path.join(repoRoot, 'docs', 'themes', 'navy', 'layout', 'partial');

function extractBetween(content, beginMarker, endMarker) {
  const begin = content.indexOf(beginMarker);
  const end = content.indexOf(endMarker);
  if (begin === -1 || end === -1 || end <= begin) return null;
  return content.slice(begin + beginMarker.length, end);
}

function transform(html) {
  if (!html) return '';
  // replace '<br />...'</td> with '</a></td>'
  html = html.replace(/<br \/>.*?<\/td>/gs, '</a></td>');
  // remove width attributes
  html = html.replace(/width="[^"]*"/g, '');
  // remove newlines
  html = html.replace(/\n/g, '');
  // collapse adjacent tr tags
  html = html.replace(/<\/tr>\s*<tr>/g, '');
  return html.trim();
}

function writeFile(name, content) {
  const dest = path.join(outDir, name);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(dest, content, 'utf8');
  console.log('Wrote', dest);
}

const readme = fs.readFileSync(readmePath, 'utf8');

const allBegin = '<!-- ALL-CONTRIBUTORS-LIST:START';
const allEnd = '<!-- ALL-CONTRIBUTORS-LIST:END -->';
const finBegin = '<!-- FINANCIAL-CONTRIBUTORS-BEGIN';
const finEnd = '<!-- FINANCIAL-CONTRIBUTORS-END -->';

const allContent = extractBetween(readme, allBegin, allEnd) || '';
const finContent = extractBetween(readme, finBegin, finEnd) || '';

writeFile('all-contributors.swig', transform(allContent));
writeFile('financial-contributors.swig', transform(finContent));

console.log('Done');
