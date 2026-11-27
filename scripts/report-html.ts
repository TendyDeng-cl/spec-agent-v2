// node scripts/report-html.ts <report.zh-Hant.md> <out.html>
// Run reports as a readable HTML page (user, 2026-11-26: every run report gets one, in Chinese, like the Video
// Enhancer R1 report). Handles the subset the reports use: headings, tables, lists, paragraphs, **bold**, `code`,
// links. Light and dark themes, phone width safe. Output goes to library/<product>/<feature>/comparisons/
// (git-ignored), named <date>_<round>-report.html.
import fs from 'node:fs';
const [, , inp, out] = process.argv;
if (!inp || !out) { console.error('usage: node scripts/report-html.ts <in.md> <out.html>'); process.exit(2); }
const src = fs.readFileSync(inp, 'utf8').replace(/\r/g, '');
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const inline = (s: string) => esc(s)
  .replace(/`([^`]+)`/g, '<code>$1</code>')
  .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  .replace(/(https?:\/\/[^\s）),，]+)/g, '<a href="$1">$1</a>');
const lines = src.split('\n');
let html = '', i = 0, title = '';
const para: string[] = [];
const flush = () => { if (para.length) { html += `<p>${inline(para.join(''))}</p>\n`; para.length = 0; } };
while (i < lines.length) {
  const l = lines[i];
  if (/^# /.test(l)) { flush(); title = l.slice(2).trim(); html += `<h1>${inline(title)}</h1>\n`; i++; continue; }
  if (/^## /.test(l)) { flush(); html += `<h2>${inline(l.slice(3))}</h2>\n`; i++; continue; }
  if (/^### /.test(l)) { flush(); html += `<h3>${inline(l.slice(4))}</h3>\n`; i++; continue; }
  if (/^\|/.test(l)) {
    flush();
    const rows: string[] = [];
    while (i < lines.length && /^\|/.test(lines[i])) { rows.push(lines[i]); i++; }
    const cells = (r: string) => r.replace(/^\||\|$/g, '').split('|').map(c => c.trim());
    const head = cells(rows[0]), body = rows.slice(2).map(cells);
    const numeric = head.map((_, c) => body.every(r => /^[\d\s/，、.:時分%（）()a-z+-]*$/i.test(r[c] ?? '') && /\d/.test(r[c] ?? '')));
    html += `<div class="tw"><table class="c${head.length}"><thead><tr>${head.map((h, c) => `<th${numeric[c] ? ' class="n"' : ''}>${inline(h)}</th>`).join('')}</tr></thead><tbody>\n`;
    for (const r of body) {
      const total = /合計|Total/.test(r[0]);
      html += `<tr${total ? ' class="total"' : ''}>${r.map((c, k) => `<td${numeric[k] ? ' class="n"' : ''}>${inline(c)}</td>`).join('')}</tr>\n`;
    }
    html += '</tbody></table></div>\n';
    continue;
  }
  if (/^- /.test(l)) {
    flush();
    html += '<ul>\n';
    while (i < lines.length && /^- /.test(lines[i])) {
      let item = lines[i].slice(2); i++;
      while (i < lines.length && /^  \S/.test(lines[i])) { item += lines[i].trim(); i++; }
      html += `<li>${inline(item)}</li>\n`;
    }
    html += '</ul>\n';
    continue;
  }
  if (!l.trim()) { flush(); i++; continue; }
  para.push(l.trim()); i++;
}
flush();
const page = `<!doctype html>
<html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title.replace(/\s*—.*$/, '') || 'Report')}</title>
<style>
:root{--bg:#ffffff;--fg:#1d1d1f;--muted:#5f6368;--line:#dfe1e5;--head:#f4f5f7;--accent:#0b57d0;--code:#f1f3f4;--total:#eef3fd}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--bg:#17181a;--fg:#e8eaed;--muted:#9aa0a6;--line:#3c4043;--head:#202124;--accent:#8ab4f8;--code:#2a2b2e;--total:#1f2a3d}}
:root[data-theme="dark"]{--bg:#17181a;--fg:#e8eaed;--muted:#9aa0a6;--line:#3c4043;--head:#202124;--accent:#8ab4f8;--code:#2a2b2e;--total:#1f2a3d}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--fg);font:15px/1.65 system-ui,-apple-system,"Segoe UI","Microsoft JhengHei","PingFang TC",sans-serif}
main{max-width:1040px;margin:0 auto;padding:28px 16px 64px}
h1{font-size:1.55rem;line-height:1.3;margin:0 0 14px}
h2{font-size:1.15rem;margin:34px 0 10px;padding-bottom:6px;border-bottom:1px solid var(--line)}
p,li{overflow-wrap:anywhere}
ul{padding-left:1.25em}li{margin:4px 0}
code{background:var(--code);padding:1px 5px;border-radius:4px;font-size:.88em;font-family:ui-monospace,Consolas,monospace}
a{color:var(--accent)}
.tw{overflow-x:auto;margin:10px 0 6px;border:1px solid var(--line);border-radius:8px}
table{border-collapse:collapse;width:100%;font-size:.93rem}
th,td{padding:7px 10px;border-bottom:1px solid var(--line);text-align:left;vertical-align:top;overflow-wrap:anywhere}
th{background:var(--head);font-weight:600;white-space:nowrap}
tr:last-child td{border-bottom:0}
td.n,th.n{white-space:nowrap}
tr.total td{background:var(--total);font-weight:600}
table.c2 td:first-child{width:9.5em}
@media (max-width:600px){body{font-size:14px}table{min-width:520px}table.c2{min-width:0}}
</style></head><body><main>
${html}</main></body></html>
`;
fs.writeFileSync(out, page);
console.log('wrote', out);
