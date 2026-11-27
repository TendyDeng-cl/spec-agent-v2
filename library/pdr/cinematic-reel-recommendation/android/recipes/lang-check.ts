// Language rows of Cinematic Reel Creator photo tips (Android): one call per language.
//   node library/pdr/cinematic-reel-recommendation/android/recipes/lang-check.ts <run dir> <cards ID> [<tips ID>] [--launch <tag>] [--tips-only]
// --launch <tag>: `case <cards ID>`, `launch --lang <tag>`, closes the Pro paywall if it opened (btn_close), enters
// Cinematic Reel Creator from the Launcher (third tool tile, 669,1184). Without it the template page must be open on card 1.
// Then lang-cards.steps reads the six cards and (with a tips ID) lang-tips.steps the six sheets. What was read is
// compared word for word with the strings the rows' Expected Result quotes; raw output goes to
// screenshots/<ID>-walk.txt, what was read to screenshots/<ID>-read.json, and one picture of all six screens to
// screenshots/<ID>-montage.png (look at it for cut-off text). Records nothing: run-log.ts set is the caller's.
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { readRecords } from '../../../../../scripts/lib/csv.ts';

const here = dirname(new URL(import.meta.url).pathname.replace(/%20/g, ' '));
const argv = process.argv.slice(2);
const li = argv.indexOf('--launch'); const tag = li >= 0 ? argv.splice(li, 2)[1] : '';
const [runDir, cardsId, tipsId] = argv.filter(a => !a.startsWith("--"));
if (!runDir || !cardsId) { console.error('Usage: lang-check.ts <run dir> <cards ID> [<tips ID>] [--launch <tag>]'); process.exit(2); }
const dev = (...a: string[]) => { try { return execFileSync('node', ['scripts/device-android.ts', runDir, ...a], { encoding: 'utf8', maxBuffer: 1 << 26 }); }
  catch (e: any) { console.error(`${e.stdout ?? ''}\n${e.stderr ?? ''}`); process.exit(e.status ?? 1); } };
const rows = readRecords(readFileSync(join(here, '..', 'cases.csv'), 'utf8'));
const row = (id: string) => { const r = rows.find(x => x.ID === id); if (!r) throw new Error(`no row ${id}`); return r; };
type El = { cls: string; id: string; text: string; x: number; y: number; w: number; h: number };
const els = (block: string): El[] => block.split('\n').map(l => l.split(' | ')).filter(p => p.length >= 5 && /^\d+,\d+,\d+,\d+$/.test(p[4].trim()))
  .map(p => { const [x, y, w, h] = p[4].trim().split(',').map(Number); return { cls: p[0], id: p[1], text: p[2], x, y, w, h }; });
const blocks = (out: string) => out.split(/^.*screenshots\/(?!.*-open\d\.png).*\.png$/m);   // each `shot` line ends a block (not the tips recipe's -openN)
const quoted = (s: string) => [...s.matchAll(/「(.*?)」/g)].map(m => m[1]);
let bad = 0;
const cmp = (what: string, exp: string, got: string) => { if (exp === got) return; bad++; console.log(`DIFF ${what}\n  expected 「${exp}」\n  shown    「${got}」`); };
const montage = (id: string, names: string[], crop: string) => {
  const ins = names.flatMap(n => ['-i', join(runDir, 'screenshots', `${n}.png`)]);
  const f = names.map((_, i) => `[${i}]crop=${crop},scale=500:-2[s${i}]`).join(';') + ';[s0][s1][s2]hstack=3[a];[s3][s4][s5]hstack=3[b];[a][b]vstack';
  try { execFileSync('ffmpeg', ['-y', '-loglevel', 'error', ...ins, '-filter_complex', f, join(runDir, 'screenshots', `${id}-montage.png`)]); console.log(`montage screenshots/${id}-montage.png`); }
  catch (e: any) { console.log(`(no montage: ${String(e.message).slice(0, 120)})`); }
};

const only = argv.includes('--tips-only');   // template page already open: skip the cards walk
if (tag) {
  dev('case', cardsId);
  console.log(dev('launch', '--lang', tag).trim());
  dev('do', 'wait 8 ;; ?id btn_close ;; wait 1');
  const l = els(dev('els'));
  if (!l.some(e => e.id === 'rv_instant_edits')) { console.log('NOT ON THE LAUNCHER after the launch; visible:'); for (const e of l.filter(e => e.text).slice(0, 40)) console.log(`  ${e.id} | ${e.text} | ${e.x},${e.y}`); process.exit(3); }
  const tile = l.filter(e => e.id === 'tv_name').sort((a, b) => Math.hypot(a.x - 549, a.y - 1276) - Math.hypot(b.x - 549, b.y - 1276))[0];
  console.log(`launcher tile tapped: 「${tile?.text}」 · Home tab 「${l.find(e => e.id === 'tv_home')?.text}」`);
  dev('do', 'tap 669 1184 ;; wait 4');
} else dev('case', cardsId);

// ---- cards
if (!only) {
  const exp = [...row(cardsId)['Expected Result'].matchAll(/card (\d) reads 「(.*?)」 with the description 「(.*?)」/g)].map(m => ({ name: m[2], desc: m[3] }));
  const out = dev('do', join(here, 'lang-cards.steps'), cardsId); writeFileSync(join(runDir, 'screenshots', `${cardsId}-walk.txt`), out);
  const read = blocks(out).slice(0, 6).map(b => { const e = els(b); const c = (id: string) => e.find(x => x.id === id && x.x > 150 && x.x < 260);
    return { name: c('tv_title')?.text ?? '(none)', desc: c('tv_description')?.text ?? '(none)', descBox: c('tv_description')?.h, chip: c('tv_photo_tips')?.text ?? '(none)', cta: e.find(x => x.id === 'tv_import' && x.x > 300 && x.x < 800)?.text }; });
  writeFileSync(join(runDir, 'screenshots', `${cardsId}-read.json`), JSON.stringify(read, null, 1));
  console.log(`\n== ${cardsId} cards (${exp.length} expected)`);
  read.forEach((r, i) => console.log(`${i + 1}. ${r.name} | ${r.desc} | chip 「${r.chip}」 | CTA 「${r.cta}」 | desc box h ${r.descBox}`));
  exp.forEach((x, i) => { cmp(`${cardsId} card ${i + 1} name`, x.name, read[i]?.name ?? '(none)'); cmp(`${cardsId} card ${i + 1} description`, x.desc, read[i]?.desc ?? '(none)'); });
  montage(cardsId, [1, 2, 3, 4, 5, 6].map(i => `${cardsId}-card${i}`), '1080:1700:0:240');
}
// ---- sheets
if (tipsId) {
  const lines = row(tipsId)['Expected Result'].split('\n');
  const exp = [1, 3, 5, 7, 9, 11].map(s => { const of = (re: RegExp) => quoted(lines.find(l => l.startsWith(`Step ${s}:`) && re.test(l)) ?? '');
    return { name: of(/first sentence/)[0], rec: of(/first heading/), avoid: of(/second heading/) }; });
  // One pager drag sometimes moves two cards or none (R2-d: it-IT, id-ID), so every sheet is opened only after the
  // centred card's title was read back as the card it belongs to (lang-tips.steps is the same walk without that check).
  const names = [...row(cardsId)['Expected Result'].matchAll(/card \d reads 「(.*?)」/g)].map(m => m[1]);
  const goTo = (i: number) => { for (let n = 0; n < 12; n++) {
    const now = els(dev('els', 'tv_title')).find(x => x.x > 150 && x.x < 260)?.text ?? ''; const at = names.indexOf(now);
    if (at < 0) { console.log(`NOT ON A KNOWN CARD before sheet ${i + 1} (centred title 「${now}」); stopped`); process.exit(3); }
    if (at === i) return; dev('do', `${at < i ? 'drag 800 1000 250 1000' : 'drag 250 1000 800 1000'} ;; wait 1`); }
    console.log(`could not reach card ${i + 1} 「${names[i]}」; stopped`); process.exit(3); };
  dev('case', tipsId); let out = '';
  for (let i = 0; i < 6; i++) { goTo(i); const n = i + 1;
    // A heads-up notification under the chip (the phone's 「Xperia System-Update」, re-posted after each locale change, R2-e)
    // takes the tap and opens its own screen: Back (never its update button), wait for the heads-up to go, tap again.
    for (let t = 0; ; t++) { dev('do', 'tap 315 306 ;; wait 1'); if (els(dev('els', 'btn_cine_story_photo_tips_got_it')).length) break;
      if (t >= 3) { console.log(`sheet ${n} did not open after ${t + 1} taps; stopped`); process.exit(3); }
      console.log(`NOTE sheet ${n}: the chip tap did not open the sheet (another screen took it); Back and again`);
      if (!els(dev('els', 'tv_title')).length) dev('do', 'back ;; wait 2'); dev('do', 'wait 6'); goTo(i); }
    out += dev('do', `shot ${tipsId}-open${n} ;; els ;; fingerdrag 900 1870 200 1870 ;; wait 1 ;; els tip ;; shot ${tipsId}-sheet${n} ;; id btn_cine_story_photo_tips_got_it ;; wait 1 ;; els tv_title ;; shot ${tipsId}-closed${n}`) + '\n'; }
  writeFileSync(join(runDir, 'screenshots', `${tipsId}-walk.txt`), out);
  const b = blocks(out);
  const read = [0, 1, 2, 3, 4, 5].map(i => { const [open, swiped] = (b[i * 2] ?? '').replace(/^.*-open\d\.png$/m, '').split(/^finger-dragged.*$/m); const e = els(open ?? ''), sw = els(swiped ?? ''), closed = els(b[i * 2 + 1] ?? '');
    const t = (id: string) => e.find(x => x.id === id); const avoidY = t('tv_cine_story_photo_tips_avoid')?.y ?? 1e9; const tips = e.filter(x => x.id === 'tv_photo_tip_name');
    const third = sw.filter(x => x.id === 'tv_photo_tip_name' && x.y > avoidY).pop();
    return { sentence: t('tv_cine_story_photo_tips_description')?.text ?? '(none)', heading1: t('tv_cine_story_photo_tips_recommendation')?.text ?? '(none)', heading2: t('tv_cine_story_photo_tips_avoid')?.text ?? '(none)',
      rec: tips.filter(x => x.y < avoidY).map(x => x.text), avoid: tips.filter(x => x.y > avoidY).map(x => x.text), button: t('btn_cine_story_photo_tips_got_it')?.text ?? '(none)',
      thirdInView: !!third && third.w >= 390 && third.x + third.w <= 1080, captionHeights: [...new Set(tips.filter(x => x.w >= 390).map(x => x.h))],
      closed: !closed.some(x => x.id.includes('photo_tips_description')) && closed.some(x => x.id === 'tv_title'), cardAfter: closed.find(x => x.id === 'tv_title' && x.x > 150 && x.x < 260)?.text }; });
  writeFileSync(join(runDir, 'screenshots', `${tipsId}-read.json`), JSON.stringify(read, null, 1));
  console.log(`\n== ${tipsId} sheets`);
  read.forEach((r, i) => console.log(`${i + 1}. ${r.sentence}\n   ${r.heading1}: ${r.rec.join(' / ')}\n   ${r.heading2}: ${r.avoid.join(' / ')}\n   button 「${r.button}」 · third avoid item in view after swipe: ${r.thirdInView} · caption heights ${r.captionHeights} · closed: ${r.closed} (card 「${r.cardAfter}」)`));
  exp.forEach((x, i) => { const r = read[i];
    if (!r.sentence.includes(x.name)) { bad++; console.log(`DIFF ${tipsId} sheet ${i + 1} sentence does not name 「${x.name}」\n  shown    「${r.sentence}」`); }
    cmp(`${tipsId} sheet ${i + 1} first heading items`, x.rec.join(' | '), r.rec.join(' | ')); cmp(`${tipsId} sheet ${i + 1} second heading items`, x.avoid.join(' | '), r.avoid.join(' | '));
    if (!r.closed) { bad++; console.log(`DIFF ${tipsId} sheet ${i + 1} did not close`); } if (!r.thirdInView) console.log(`NOTE ${tipsId} sheet ${i + 1}: third Avoid item not fully in view after the swipe (check the screenshot)`); });
  // one picture: each sheet as opened, with the Avoid row after the swipe (its third item) under it
  { const ins = [1, 2, 3, 4, 5, 6].flatMap(i => ['-i', join(runDir, 'screenshots', `${tipsId}-open${i}.png`), '-i', join(runDir, 'screenshots', `${tipsId}-sheet${i}.png`)]);
    const f = [0, 1, 2, 3, 4, 5].map(i => `[${i * 2}]crop=1080:1640:0:760[o${i}];[${i * 2 + 1}]crop=1080:560:0:1620[w${i}];[o${i}][w${i}]vstack,scale=500:-2[s${i}]`).join(';') + ';[s0][s1][s2]hstack=3[a];[s3][s4][s5]hstack=3[b];[a][b]vstack';
    try { execFileSync('ffmpeg', ['-y', '-loglevel', 'error', ...ins, '-filter_complex', f, join(runDir, 'screenshots', `${tipsId}-montage.png`)]); console.log(`montage screenshots/${tipsId}-montage.png`); }
    catch (e: any) { console.log(`(no montage: ${String(e.message).slice(0, 120)})`); } }
}
console.log(bad ? `\n${bad} difference(s)` : '\nno differences');
