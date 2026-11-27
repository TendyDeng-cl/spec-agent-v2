// MUI translation check from the build (user, 2026-11-24): read a feature's strings in every language straight from
// the Android APK, so translations need no phone, no language switch and no credits (spec-casebook references/mui.md).
// Usage: node scripts/mui-strings.ts <product>/<feature> --apk <file.apk | build dir> [--out <dir>] [--prefix a,b]
//
//   The feature's strings: every string resource whose name starts with a prefix of the feature's mui.json
//   (`android_prefixes`, or --prefix), plus every resource whose English text is a 「…」 string of three or more words
//   the feature's Android cases.csv quotes (shorter ones, 「OK」 「Pro」, match other features' resources too). The languages: mui.json, or the product list (`library/<product>/product.json` › mui), each with
//   its Android resource qualifier (`android`, e.g. zh-rTW, iw, in).
//   For each string and language it records the text the app shows: its own translation, else the parent locale's
//   (es-rMX → es), else the English default (a missing translation). Flags per language: missing (English shown),
//   identical to English (left untranslated, or a name or unit), placeholders that differ from the English (%s, %1$d,
//   {0}, <n>, line breaks).
// Writes <out>/mui-strings.json (every string × language) and <out>/mui-strings.md (the flags per language, then each
// flagged string). Judging the wording (doubts) is the run's job: read the JSON per language against the English.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, resolve } from 'node:path';
import { parseCsv } from './lib/csv.ts';
import { ROOT } from './lib/library.ts';

const args = process.argv.slice(2);
const opt = (n: string) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : undefined; };
const feature = args.find((a, i) => !a.startsWith('--') && !['--apk', '--out', '--prefix'].includes(args[i - 1]));
const die = (m: string): never => { console.error(m); process.exit(2); };
if (!feature || !opt('--apk')) die('Usage: node scripts/mui-strings.ts <product>/<feature> --apk <file.apk | build dir> [--out <dir>] [--prefix a,b]');
const [product] = feature!.split('/');
const FDIR = join(ROOT, 'library', feature!);

// the APK (a build dir from ~/.casebook/android/apks/<build>/ holds it somewhere below)
function findApk(p: string): string {
  if (statSync(p).isFile()) return p;
  for (const e of readdirSync(p)) { const q = join(p, e); if (statSync(q).isDirectory()) { const f = findApk(q); if (f) return f; } else if (/\.apk$/i.test(e)) return q; }
  return '';
}
const apk = findApk(resolve(opt('--apk')!)) || die(`No .apk under ${opt('--apk')}`);

// aapt2 from the newest build-tools
const sdk = [process.env.ANDROID_HOME, process.env.ANDROID_SDK_ROOT, join(homedir(), 'Library', 'Android', 'sdk')].find(d => d && existsSync(join(d, 'build-tools')))
  || die('No Android SDK build-tools (ANDROID_HOME, ANDROID_SDK_ROOT or ~/Library/Android/sdk)');
const bt = readdirSync(join(sdk, 'build-tools')).filter(v => existsSync(join(sdk, 'build-tools', v, 'aapt2'))).sort((a, b) => a.localeCompare(b, undefined, { numeric: true })).pop()
  || die('No aapt2 in build-tools');
const dump = execFileSync(join(sdk, 'build-tools', bt, 'aapt2'), ['dump', 'resources', apk], { maxBuffer: 1 << 30, encoding: 'utf8' });

// languages
const prodMui = JSON.parse(readFileSync(join(ROOT, 'library', product, 'product.json'), 'utf8')).mui ?? {};
const fMui = existsSync(join(FDIR, 'mui.json')) ? JSON.parse(readFileSync(join(FDIR, 'mui.json'), 'utf8')) : {};
const cfg = fMui.languages === 'product' || !fMui.languages ? { ...prodMui, ...fMui, languages: prodMui.languages } : fMui;
const base = cfg.base ?? 'en-US';
type Lang = { tag: string; name: string; code: string; android?: string };
const qualifier = (l: Lang) => l.android ?? (() => {   // without an explicit `android`: language, plus -r<REGION> for zh / pt / es-MX
  const [lang, ...rest] = l.code.split('-'); const region = rest.find(p => /^[A-Z]{2}$/.test(p));
  const l2 = ({ he: 'iw', id: 'in', yi: 'ji' } as Record<string, string>)[lang] ?? lang;
  return region && (['zh', 'pt'].includes(lang) || l.code === 'es-MX') ? `${l2}-r${region}` : l2;
})();
const LANGS: (Lang & { q: string })[] = (cfg.languages ?? []).filter((l: Lang) => l.code !== base).map((l: Lang) => ({ ...l, q: qualifier(l) }));
if (!LANGS.length) die('No MUI languages (mui.json / product.json › mui)');

// string resources: name → { qualifier: text }
const strings = new Map<string, Record<string, string>>();
let cur: Record<string, string> | null = null;
const unesc = (s: string) => s.replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\'/g, "'");
// a value with a real line break is printed over several lines, each continuation indented by aapt2 (seen 2026-11-25:
// aigc_watermark_export_reminder_message was dropped before this)
let open: { q: string; parts: string[] } | null = null;
for (const line of dump.split('\n')) {
  if (open) {
    const end = line.match(/^\s*(.*)"\s*$/);
    open.parts.push(end ? end[1] : line.replace(/^\s+/, ''));
    if (end) { cur![open.q] = unesc(open.parts.join('\n')); open = null; }
    continue;
  }
  const r = line.match(/^\s+resource 0x[0-9a-f]+ string\/(\S+)/);
  if (r) { cur = {}; strings.set(r[1], cur); continue; }
  if (/^\s+resource /.test(line) || /^\s*type /.test(line)) { cur = null; continue; }
  const v = cur && line.match(/^\s+\(([^)]*)\) (?:\[[^\]]*\] )?"(.*)"\s*$/);
  if (v) { cur![v[1]] = unesc(v[2]); continue; }
  const o = cur && line.match(/^\s+\(([^)]*)\) (?:\[[^\]]*\] )?"(.*)$/);
  if (o) open = { q: o[1], parts: [o[2]] };
}

// the feature's strings
const prefixes = (opt('--prefix')?.split(',') ?? fMui.android_prefixes ?? []).filter(Boolean) as string[];
const quoted = new Set<string>();
const casesCsv = join(FDIR, 'android', 'cases.csv');
if (existsSync(casesCsv)) for (const row of parseCsv(readFileSync(casesCsv, 'utf8').replace(/^﻿/, ''))) for (const cell of row) for (const m of cell.matchAll(/「([^」]+)」/g)) quoted.add(m[1]);
const picked = [...strings.entries()].filter(([k, v]) => v[''] !== undefined && (prefixes.some(p => k.startsWith(p)) || (quoted.has(v['']) && v[''].trim().split(/\s+/).length >= 3)));
if (!picked.length) die(`No strings found: give mui.json "android_prefixes" or --prefix (${strings.size} string resources in the APK)`);

const PH = /%(\d+\$)?[-#+ 0,(]*\d*(\.\d+)?[sdfxXc@]|\{\d+\}|<[a-z]+>|\n/g;
const ph = (s: string) => (s.match(PH) ?? []).map(x => x.replace(/^%\d+\$/, '%')).sort().join(' ');
const shown = (v: Record<string, string>, q: string): [string, string] => {
  if (v[q] !== undefined) return [v[q], q];
  const parent = q.split('-r')[0];
  if (parent !== q && v[parent] !== undefined) return [v[parent], parent];
  return [v[''], 'en'];
};
const out = picked.map(([key, v]) => {
  const text: Record<string, string> = {}, from: Record<string, string> = {}, flags: Record<string, string[]> = {};
  for (const l of LANGS) {
    const [t, f] = shown(v, l.q); text[l.tag] = t; from[l.tag] = f;
    const fl: string[] = [];
    if (f === 'en') fl.push('missing (English shown)');
    else if (f !== l.q) fl.push(`from ${f}`);
    if (f !== 'en' && t === v[''] && /[A-Za-z]{3}/.test(t)) fl.push('identical to English');
    if (ph(t) !== ph(v[''])) fl.push(`placeholders ${ph(t) || 'none'} vs ${ph(v['']) || 'none'}`);
    if (fl.length) flags[l.tag] = fl;
  }
  return { key, en: v[''], text, from, flags };
});

const dir = resolve(opt('--out') ?? join(FDIR, 'android', 'mui'));
mkdirSync(dir, { recursive: true });
const build = (apk.match(/(\d+\.\d+\.\d+\.\d{6,7})/) || [, ''])[1];
writeFileSync(join(dir, 'mui-strings.json'), JSON.stringify({ feature, apk, build, read_at: new Date().toISOString(), prefixes,
  languages: LANGS.map(({ tag, name, code, q }) => ({ tag, name, code, android: q })), strings: out }, null, 1) + '\n');

const md: string[] = [`# MUI strings from the build — ${feature}`, '', `Build ${build || '?'} (\`${apk.split('/').pop()}\`), ${out.length} strings × ${LANGS.length} languages; prefixes ${prefixes.join(', ') || 'none'} plus the table's quoted strings.`, '',
  '| Language | Missing (English shown) | From parent | Identical to English | Placeholders differ |', '|---|---|---|---|---|'];
for (const l of LANGS) {
  const c = (re: RegExp) => out.filter(s => (s.flags[l.tag] ?? []).some(f => re.test(f))).length;
  md.push(`| ${l.tag} ${l.name} (${l.q}) | ${c(/^missing/)} | ${c(/^from /)} | ${c(/^identical/)} | ${c(/^placeholders/)} |`);
}
md.push('', '## Flagged strings', '');
for (const s of out.filter(s => Object.keys(s.flags).length)) {
  md.push(`### ${s.key}`, '', `English: ${JSON.stringify(s.en)}`, '');
  for (const [tag, fl] of Object.entries(s.flags)) md.push(`- ${tag}: ${fl.join('; ')} — ${JSON.stringify(s.text[tag])}`);
  md.push('');
}
writeFileSync(join(dir, 'mui-strings.md'), md.join('\n') + '\n');
const tot = (re: RegExp) => out.reduce((n, s) => n + Object.values(s.flags).filter(f => f.some(x => re.test(x))).length, 0);
console.log(`${out.length} strings × ${LANGS.length} languages from ${apk.split('/').pop()}: ${tot(/^missing/)} missing, ${tot(/^identical/)} identical to English, ${tot(/^placeholders/)} placeholder differences → ${join(dir, 'mui-strings.md')}`);
