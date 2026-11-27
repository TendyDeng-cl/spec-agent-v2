// Mark a table as in the regression suite (converted to AT, automated test), as not AT-capable, or take the mark off
// (user, 2026-11-25/27); link the Jenkins job its AT runs in and read the job's latest results (user, 2026-11-27).
// The Dashboard (scripts/pages.ts, first page) lists marked features under 「Regression (AT)」 with their Jenkins results;
// every other table is waiting for its conversion, or marked 「Not AT-capable」. The same can be done on the Dashboard
// itself (this computer only). The mark is library/<product>/<feature>/regression.json (lib/regression.ts), the job
// at.json beside it (lib/at-results.ts), both committed; credentials and readings stay in ~/.casebook/.
// Usage: node scripts/regression.ts                                   list every table and its state
//        node scripts/regression.ts <product>/<feature> <ios|android|both> [--since YYYY-MM-DD] [--note "<where the AT lives>"]
//        node scripts/regression.ts <product>/<feature> <ios|android|both> --na [--note "<why it cannot be automated>"]
//        node scripts/regression.ts <product>/<feature> <ios|android|both> --off
//        node scripts/regression.ts <product>/<feature> <ios|android> --jenkins <job URL> [--source allure|reportportal|junit]
//            [--rp-url <origin> --rp-project <project> [--rp-launch <launch name>]] [--ebugs "<words of its [AT] eBugs>"]
//        node scripts/regression.ts <product>/<feature> <ios|android> --folder <tests folder> [--suite core]
//            the table's tests are one top-level folder of the product's suite launch (product.json › at)
//        node scripts/regression.ts <product>/<feature> <ios|android> --unlink           forget the Jenkins job or folder
//        node scripts/regression.ts --refresh [<product>/<feature> <ios|android|both>]  read Jenkins (and [AT] eBugs) now;
//            with no table named, also each product's own suite (product.json › at, 「Core AT suite」)
import { existsSync } from 'node:fs';
import { PLATFORMS, arg, listFeatures, tableDir } from './lib/library.ts';
import { isAtMark, readRegression, setRegression } from './lib/regression.ts';
import { atReading, readAtSources, readSuites, refreshAt, refreshSuites, setAtSource, suiteOf, type AtSource } from './lib/at-results.ts';

const VALUED = ['--since', '--note', '--jenkins', '--source', '--rp-url', '--rp-project', '--rp-launch', '--ebugs', '--folder', '--suite'];
const [feature, which] = process.argv.slice(2).filter((a, i, all) => !a.startsWith('--') && !VALUED.includes(all[i - 1]));
const tables = (f: string) => PLATFORMS.filter(p => existsSync(tableDir(f, p)));
const has = (flag: string) => process.argv.includes(flag);
const fail = (msg: string) => { console.error(msg); process.exit(1); };
const describe = (f: string, p: string) => {
  const r = readRegression(f)[p], src = readAtSources(f)[p], got = atReading(f, p)?.result;
  const mark = !r ? 'waiting for AT' : isAtMark(r) ? `in regression (AT) since ${r.since}` : `not AT-capable (since ${r.since})`;
  const job = src ? ` · ${src.folder ? `suite folder ${src.folder}` : `Jenkins ${src.jenkins}`}${got ? ` #${got.build}: ${got.pass} pass, ${got.fail} fail, ${got.blocked ?? '–'} blocked, ${got.skip} skipped` : ''}` : '';
  return `${f} ${p}: ${mark}${r?.note ? ` — ${r.note}` : ''}${job}`;
};

try {
  if (has('--refresh')) {
    const list: [string, string][] = feature ? (which === 'both' || !which ? tables(feature) : [which]).map(p => [feature, p])
      : listFeatures().flatMap(f => tables(f).filter(p => isAtMark(readRegression(f)[p]) || readAtSources(f)[p]).map(p => [f, p] as [string, string]));
    const done = await refreshAt(list);
    for (const [f, p] of list) console.log(describe(f, p));
    // with no table named, the products' own suites too (product.json › at)
    if (!feature) for (const pr of new Set(listFeatures().map(f => f.split('/')[0]))) for (const pl of PLATFORMS) {
      if (!readSuites(pr, pl).length) continue;
      const s = await refreshSuites(pr, pl); done.read += s.read; done.errors.push(...s.errors);
      for (const x of readSuites(pr, pl).map(y => suiteOf(pr, pl, y))) for (const [name, r] of [[x.name, x.result], ...x.also.map(a => [`${x.name} · ${a.label}`, a.result])] as const)
        console.log(`${pr} ${pl} ${name}: ${r ? `Jenkins #${r.build}${r.version ? ` on ${r.version}` : ''}: ${r.note ?? `${r.pass} pass, ${r.fail} fail, ${r.blocked ?? '–'} blocked, ${r.skip} skipped of ${r.total}`}` : 'not read'}`);
    }
    for (const e of done.errors) console.error(e);
    process.exit(done.errors.length && !done.read ? 1 : 0);
  }
  if (!feature) { for (const f of listFeatures()) for (const p of tables(f)) console.log(describe(f, p)); process.exit(0); }
  const platforms = which === 'both' ? tables(feature) : [which];
  if (!platforms.length || !platforms[0]) fail(`No table under library/${feature}/`);
  if (has('--folder') || has('--jenkins') || has('--unlink') || has('--source') || has('--rp-url') || has('--rp-project') || has('--rp-launch') || has('--ebugs')) {
    if (platforms.length !== 1) fail('Link one platform at a time: a job runs one platform');
    const rp = { url: arg('rp-url'), project: arg('rp-project'), launch: arg('rp-launch') };
    const src = has('--unlink') ? null : has('--folder') ? { folder: arg('folder'), suite: arg('suite'), ebugs: arg('ebugs') } : { jenkins: arg('jenkins'), source: arg('source') as AtSource['source'], ebugs: arg('ebugs'), ...(Object.values(rp).some(Boolean) ? { reportportal: rp } : {}) };
    setAtSource(feature, platforms[0], src as Partial<AtSource> | null);
    if (src) await refreshAt([[feature, platforms[0]]]);
    console.log(describe(feature, platforms[0]));
    const err = atReading(feature, platforms[0])?.error; if (src && err) console.error(`Not read: ${err}`);
    process.exit(0);
  }
  const state = has('--off') ? null : has('--na') ? 'na' : 'at';
  for (const p of platforms) { setRegression(feature, p, state, { since: arg('since'), note: arg('note') }); console.log(describe(feature, p)); }
} catch (e: any) { fail(e?.message ?? String(e)); }
