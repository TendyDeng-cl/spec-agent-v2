// Entry points of a product's tools, from the product team's toolbar sheet (user, 2026-11-26).
// A feature reached from several places gets its full table on one entry and a UI pass on each other (analysis.md pass 12); this
// script keeps the reference copy of the sheet the analysis reads.
//
// The sheet is named in library/<product>/product.json › entry_points (sheet_id). Its dated tabs ("2026/11 Auto
// Reframe", "2026/09 …") are versions of the toolbar layout; the newest dated tab is the reference, the others
// (Order, Draft_usage_rate, old, older dated tabs) are history. The sheet is readable without sign-in.
//
// Usage:
//   node scripts/entry-points.ts <product> fetch      read the newest dated tab and write
//        library/<product>/knowledge/sources/<date>-toolbar-sheet/ (original HTML git-ignored; source.json and
//        extracted/toolbar.md committed). Unchanged since the last fetch: only source.json's `checked` moves.
//   node scripts/entry-points.ts <product> "<tool>"   every place the tool appears in the newest extracted copy
//        (case-, space- and bracket-insensitive substring), e.g. "Video Enhance", "Cinematic Reel"
//   node scripts/entry-points.ts <product> "<tool>" --platform ios|android
//        the same for one platform: places the sheet limits to the other platform (「4/E IOS」, 「Android沒有」,
//        「only Android」) are listed apart as not on this platform, and a note's other-platform part is dropped
//        (user, 2026-11-27: the Android table read 「AI Remove (4/E IOS)」 as an Android entry, DRA262611P0341)
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { LIBRARY } from './lib/library.ts';

type Cell = { text: string; bg: string };
type Section = { name: string; columns: { name: string; bg: string; items: Cell[] }[]; notes: string[] };

const [product, verb] = process.argv.slice(2);
if (!product || !verb) {
  console.error('Usage: node scripts/entry-points.ts <product> fetch | "<tool name>"');
  process.exit(2);
}
const productJson = JSON.parse(readFileSync(join(LIBRARY, product, 'product.json'), 'utf8'));
const sheetId: string | undefined = productJson.entry_points?.sheet_id;
if (!sheetId) { console.error(`library/${product}/product.json has no entry_points.sheet_id`); process.exit(1); }
const sourcesDir = join(LIBRARY, product, 'knowledge', 'sources');
const SLUG = 'toolbar-sheet';

const WHITE = new Set(['', '#ffffff', '#fff']);
const HEADER = '#c9daf8';   // first-layer header blue

const unescapeHtml = (s: string) => s
  .replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '')
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
  .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n))).replace(/ /g, ' ').trim();

/** The sheet's tabs as {name, gid}, from the public htmlview page. */
async function tabs(): Promise<{ name: string; gid: string }[]> {
  const html = await (await fetch(`https://docs.google.com/spreadsheets/d/${sheetId}/htmlview`)).text();
  const out: { name: string; gid: string }[] = [];
  for (const m of html.matchAll(/name: "((?:[^"\\]|\\.)*)",\s*pageUrl:[^,]*,\s*gid: "(\d+)"/g)) {
    const name = m[1].replace(/\\x([0-9a-f]{2})/gi, (_, h) => String.fromCharCode(parseInt(h, 16))).replace(/\\\//g, '/');
    out.push({ name, gid: m[2] });
  }
  return out;
}

/** The tab's cells as a grid (rowspan / colspan filled), each with its text and background colour. */
function grid(html: string): Cell[][] {
  const css = new Map<string, string>();
  for (const m of html.matchAll(/\.(s\d+)\{([^}]*)\}/g)) css.set(m[1], m[2]);
  const bgOf = (attrs: string) => {
    const style = (attrs.match(/style="([^"]*)"/)?.[1] ?? '') + ';' + (css.get(attrs.match(/class="(s\d+)"/)?.[1] ?? '') ?? '');
    return (style.match(/background-color:\s*([^;]+)/)?.[1] ?? '').trim().toLowerCase();
  };
  const rows: Cell[][] = [];
  const pending: Map<number, { cell: Cell; left: number }> = new Map(); // column → rowspan carry
  for (const tr of html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)) {
    const row: Cell[] = [];
    let col = 0;
    const fillCarry = () => {
      while (pending.has(col)) {
        const p = pending.get(col)!;
        row[col] = p.cell;
        if (--p.left <= 0) pending.delete(col);
        col++;
      }
    };
    for (const td of tr[1].matchAll(/<td([^>]*)>([\s\S]*?)<\/td>/g)) {
      fillCarry();
      const cell = { text: unescapeHtml(td[2]), bg: bgOf(td[1]) };
      const cs = Number(td[1].match(/colspan="(\d+)"/)?.[1] ?? 1);
      const rs = Number(td[1].match(/rowspan="(\d+)"/)?.[1] ?? 1);
      for (let k = 0; k < cs; k++) {
        row[col] = k === 0 ? cell : { text: '', bg: cell.bg };
        if (rs > 1) pending.set(col, { cell: k === 0 ? { text: '', bg: cell.bg } : { text: '', bg: cell.bg }, left: rs - 1 });
        col++;
      }
    }
    fillCarry();
    if (row.length) rows.push(Array.from(row, c => c ?? { text: '', bg: '' }));
  }
  return rows;
}

/** Toolbars: a title bar row, then the first-layer names (a numbers row may come first), the second-layer rows, notes. */
function sections(rows: Cell[][]): Section[] {
  const out: Section[] = [];
  let cur: Section | undefined;
  let names: number | undefined;
  for (const row of rows) {
    const a = row[0]?.text ?? '';
    if (/toolbar$/i.test(a) && !/^1st layer/i.test(a)) { cur = { name: a, columns: [], notes: [] }; out.push(cur); names = undefined; continue; }
    if (!cur) continue;
    const rest = row.slice(1);
    const headerRow = rest.some(c => c.bg === HEADER && c.text);
    if (headerRow && rest.filter(c => c.text).every(c => /^\d+$/.test(c.text) || c.bg !== HEADER || /templates/i.test(c.text)) && rest.some(c => /^\d+$/.test(c.text))) {
      // numbers row: keep a non-number label (「(Promeo App only for free user) Templates」) as that column's name
      rest.forEach((c, i) => { if (c.text && !/^\d+$/.test(c.text)) (cur!.columns[i] ??= { name: '', bg: c.bg, items: [] }).name ||= c.text; });
      continue;
    }
    if (headerRow && names === undefined) {
      names = 1;
      rest.forEach((c, i) => {
        const col = (cur!.columns[i] ??= { name: '', bg: c.bg, items: [] });
        if (c.text) { col.name = col.name ? `${c.text} / ${col.name}` : c.text; col.bg = c.bg; }
      });
      continue;
    }
    if (/^note$/i.test(a)) {
      rest.forEach((c, i) => { if (c.text) cur!.notes.push(`${cur!.columns[i]?.name || `column ${i + 1}`}: ${c.text}`); });
      continue;
    }
    if (names === undefined) continue;
    rest.forEach((c, i) => { if (c.text && cur!.columns[i]) cur!.columns[i].items.push(c); else if (c.text) cur!.notes.push(c.text); });
  }
  for (const s of out) s.columns = s.columns.filter(c => c && (c.name || c.items.length));
  return out;
}

const mark = (c: { bg: string }) => (WHITE.has(c.bg) || c.bg === HEADER ? '' : ` ‹cell ${c.bg}›`);
const oneLine = (s: string) => s.replace(/\s*\n\s*/g, ' ');

function render(tab: string, fetched: string, url: string, secs: Section[]): string {
  const lines = [
    `# Toolbar entry points (PowerDirector Mobile)`,
    '',
    `Extracted by \`scripts/entry-points.ts\` from the product team's toolbar sheet, tab 「${tab}」 (the newest dated tab),`,
    `fetched ${fetched}: ${url}`,
    '',
    'Each toolbar is what the editor shows for the selection (none = Global; a main-track video, PIP video, main-track',
    'photo, PIP photo, audio or text clip). **First layer** is the toolbar button; the items under it are the second',
    'layer it opens. Texts in brackets are the sheet\'s own notes (platform, release: 「4/E IOS」, 「Android沒有」).',
    '‹cell #rrggbb› marks a coloured cell: the sheet colours new items (yellow) and items that do not show in some',
    'states (blue; see the toolbar notes). Kept verbatim; how a tool behaves from each place is for the rows to find.',
    '',
  ];
  for (const s of secs) {
    lines.push(`## ${s.name}`, '');
    for (const c of s.columns) {
      const items = c.items.map(i => oneLine(i.text) + mark(i));
      lines.push(`- **${oneLine(c.name) || '(no name)'}**${mark(c)}${items.length ? ': ' + items.join(' · ') : ' (no second layer)'}`);
    }
    if (s.notes.length) { lines.push('', 'Notes:'); for (const n of s.notes) lines.push(`- ${oneLine(n)}`); }
    lines.push('');
  }
  // Where each tool appears: first-layer buttons and second-layer items, keyed by the name without brackets.
  const where = new Map<string, { name: string; places: string[] }>();
  const add = (name: string, place: string) => {
    const key = norm(name);
    if (!key) return;
    const e = where.get(key) ?? { name: oneLine(name).replace(/\s*\(.*?\)\s*/g, ' ').trim(), places: [] };
    e.places.push(place);
    where.set(key, e);
  };
  for (const s of secs) for (const c of s.columns) {
    const cn = oneLine(c.name);
    add(c.name, `${s.name} › ${cn} (first layer)`);
    for (const i of c.items) add(i.text, `${s.name} › ${cn} › ${oneLine(i.text)}${mark(i)}`);
  }
  lines.push('## Where each tool appears', '', 'Tools reached from more than one place are listed first.', '');
  const all = [...where.values()].sort((a, b) => (b.places.length > 1 ? 1 : 0) - (a.places.length > 1 ? 1 : 0) || a.name.localeCompare(b.name));
  for (const e of all) lines.push(`- **${e.name}** (${e.places.length}): ${e.places.join(' · ')}`);
  return lines.join('\n') + '\n';
}

function norm(s: string): string {
  return s.replace(/\(.*?\)/gs, ' ').replace(/[（(].*$/s, ' ').toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, ' ').trim();
}

function newestFolder(): string | undefined {
  if (!existsSync(sourcesDir)) return;
  return readdirSync(sourcesDir).filter(d => d.endsWith(`-${SLUG}`)).sort().pop();
}

if (verb === 'fetch') {
  const all = await tabs();
  const dated = all.filter(t => /^\d{4}\/\d{2}/.test(t.name)).sort((a, b) => b.name.localeCompare(a.name));
  if (!dated.length) { console.error(`No dated tab among: ${all.map(t => t.name).join(', ')}`); process.exit(1); }
  const tab = dated[0];
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/edit?gid=${tab.gid}#gid=${tab.gid}`;
  const html = await (await fetch(`https://docs.google.com/spreadsheets/d/${sheetId}/htmlview/sheet?headers=true&gid=${tab.gid}`)).text();
  const secs = sections(grid(html));
  if (!secs.length) { console.error('No toolbar sections found: has the sheet layout changed?'); process.exit(1); }
  const today = new Date().toISOString().slice(0, 10);
  const md = render(tab.name, today, url, secs);
  const mdHash = createHash('sha256').update(md.replace(/^fetched .*$/m, '')).digest('hex');
  const prev = newestFolder();
  if (prev) {
    const src = JSON.parse(readFileSync(join(sourcesDir, prev, 'source.json'), 'utf8'));
    if (src.tab === tab.name && src.extracted_sha256 === mdHash) {
      src.checked = today;
      writeFileSync(join(sourcesDir, prev, 'source.json'), JSON.stringify(src, null, 1) + '\n');
      console.log(`Unchanged since ${prev} (tab 「${tab.name}」); checked date moved to ${today}.`);
      process.exit(0);
    }
  }
  const dir = join(sourcesDir, `${today}-${SLUG}`);
  mkdirSync(join(dir, 'extracted'), { recursive: true });
  writeFileSync(join(dir, 'sheet.html'), html);
  writeFileSync(join(dir, 'extracted', 'toolbar.md'), md);
  const source = {
    from: `Product team's PDRM toolbar sheet (${productJson.entry_points.url})`,
    received: today,
    checked: today,
    tab: tab.name,
    gid: tab.gid,
    other_tabs: all.filter(t => t.gid !== tab.gid).map(t => t.name),
    note: 'Entry point reference (user, 2026-11-26): the newest dated tab is the reference; re-fetched at each analysis by scripts/entry-points.ts. Original HTML stays local.',
    extracted_sha256: mdHash,
    files: [{ name: 'sheet.html', bytes: Buffer.byteLength(html), sha256: createHash('sha256').update(html).digest('hex') }],
  };
  writeFileSync(join(dir, 'source.json'), JSON.stringify(source, null, 1) + '\n');
  const multi = (md.split('## Where each tool appears')[1] ?? '').split('\n').filter(l => /^- \*\*.*\*\* \(([2-9]|\d{2,})\)/.test(l)).length;
  console.log(`Tab 「${tab.name}」: ${secs.length} toolbars, ${multi} tools in more than one place → ${join(dir, 'extracted', 'toolbar.md')}${prev ? ` (previous: ${prev})` : ''}`);
} else {
  // A tool lookup, optionally for one platform: `node scripts/entry-points.ts pdr "<tool>" [--platform ios|android]`.
  const platArg = process.argv.indexOf('--platform');
  const want = platArg > 0 ? (process.argv[platArg + 1] ?? '').toLowerCase() : '';
  if (want && want !== 'ios' && want !== 'android') { console.error('--platform takes ios or android'); process.exit(2); }
  const prev = newestFolder();
  if (!prev) { console.error(`No ${SLUG} source yet: run node scripts/entry-points.ts ${product} fetch`); process.exit(1); }
  const md = readFileSync(join(sourcesDir, prev, 'extracted', 'toolbar.md'), 'utf8');
  const q = norm(verb);
  const hits = (md.split('## Where each tool appears')[1] ?? '').split('\n').filter(l => l.startsWith('- **') && norm(l.match(/^- \*\*(.*?)\*\*/)![1]).includes(q));
  const src = JSON.parse(readFileSync(join(sourcesDir, prev, 'source.json'), 'utf8'));
  console.log(`Toolbar sheet tab 「${src.tab}」 (fetched ${src.received}, checked ${src.checked})${want ? `, for ${want === 'ios' ? 'iOS' : 'Android'}` : ''}:`);
  if (!hits.length) {
    console.log(`「${verb}」 is not in the toolbar sheet: its entry points come from the spec, Figma and knowledge only.`);
    process.exit(0);
  }
  const notes = toolbarNotes(md);
  for (const h of hits) {
    const name = h.match(/^- \*\*(.*?)\*\*/)![1];
    const places = h.replace(/^- \*\*.*?\*\* \(\d+\): /, '').split(' · ');
    console.log(`- **${name}**`);
    const off: string[] = [];
    for (const place of places) {
      const p = platformOf(place);
      const tag = p.only ? ` [${p.only === 'ios' ? 'iOS only' : 'Android only'}]` : '';
      if (want && p.only && p.only !== want) { off.push(place + tag); continue; }
      console.log(`  - ${place}${tag}${p.release ? ` [release: ${p.release}]` : ''}`);
      const [toolbar, column] = place.split(' › ');
      for (const n of notes.get(toolbar) ?? []) {
        if (norm(n.split(':')[0]) !== norm(column)) continue;
        const pn = platformNote(n, want);
        if (pn) console.log(`    note: ${pn}`);
      }
    }
    if (off.length) console.log(`  not on ${want === 'ios' ? 'iOS' : 'Android'} (the sheet limits these to the other platform; write no ${want === 'ios' ? 'iOS' : 'Android'} row for them):\n${off.map(o => `    - ${o}`).join('\n')}`);
  }
}

/** Which platform a sheet text limits itself to (user, 2026-11-27): 「Android沒有」/「(4/E IOS)」 → iOS only; 「(only
 *  Android)」/「(android only)」 → Android only; 「(iOS 11/M; And 12/E)」 → both, released at different times. */
function platformOf(text: string): { only?: 'ios' | 'android'; release?: string } {
  const flat = text.toLowerCase().replace(/\s+/g, '');
  if (/(android|andorid)沒有/.test(flat)) return { only: 'ios' };
  if (/onlyandroid|androidonly/.test(flat)) return { only: 'android' };
  for (const b of text.match(/\(([^)]*)\)/g) ?? []) {
    if (/first layer/i.test(b)) continue;
    const ios = /\bios\b/i.test(b), and = /\b(and|android|andorid)\b/i.test(b);
    if (ios && !and) return { only: 'ios', release: b.slice(1, -1) };
    if (and && !ios) return { only: 'android', release: b.slice(1, -1) };
    if (ios && and) return { release: b.slice(1, -1) };
  }
  return {};
}

/** A toolbar note split by platform: 「(iOS) … (Android) …」 keeps the wanted platform's part, marked. */
function platformNote(note: string, want: string): string {
  const parts = note.split(/(?=\((?:iOS|Android)\)|\b(?:iOS|Android):)/i);
  if (parts.length < 2 || !want) return note;
  const head = parts[0];
  const keep = parts.slice(1).filter(p => new RegExp(`^\\(?${want === 'ios' ? 'iOS' : 'Android'}\\)?:?`, 'i').test(p));
  return keep.length ? `${head}${keep.join(' ')} (${want === 'ios' ? 'iOS' : 'Android'} part of the note)` : '';
}

/** Each toolbar's Notes lines, keyed by toolbar heading. */
function toolbarNotes(md: string): Map<string, string[]> {
  const out = new Map<string, string[]>();
  for (const block of md.split('\n## ').slice(1)) {
    const name = block.split('\n')[0].trim();
    const notes = block.split('\nNotes:\n')[1];
    if (notes) out.set(name, notes.split('\n').filter(l => l.startsWith('- ')).map(l => l.slice(2)));
  }
  return out;
}
