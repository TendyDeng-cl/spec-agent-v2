// Draft 20261126-111221 (both platforms; the iOS and Android draft folders hold the same file): every entry point
// (analysis.md pass 12) [Req: REQ-010]. User 2026-11-26: the primary entry (Launcher, the Design's entry) keeps the full
// table plus a reel generated through it; every other entry (the AI Magic tab and three editor toolbar places of the
// product team's toolbar sheet, KP-107) gets a UI pass of four rows: the landing and what it brings in, every control
// once, Add Media and the photo the preview reads, Generate once and every exit (「for each entry, it should only check
// the UI, so click everything once and make sure there's no errors for each button and options」).
// Rebuilds draft.csv, requirements.md, spec.json (Android; iOS keeps the one new-draft.ts wrote), update-plan.md,
// phases.json, questions.zh-Hant.json and the carried-over traces in this folder from the approved table.
// The full-flow version of this script (copies of every row per entry) was replaced the same day.
// Run: node library/pdr/cinematic-reel-recommendation/<platform>/drafts/20261126-111221/build-draft.ts
// then: node scripts/knowledge.ts pdr/cinematic-reel-recommendation <platform> --for analysis --out <this folder>/knowledge.md
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseCsv, toCsv } from '../../../../../../scripts/lib/csv.ts';

const DRAFT = '20261126-111221';
const DIR = dirname(fileURLToPath(import.meta.url));
const PLATFORM = basename(dirname(dirname(DIR))) as 'android' | 'ios';
const TABLE = dirname(dirname(DIR));
const ios = PLATFORM === 'ios';
const manifest = JSON.parse(readFileSync(join(TABLE, 'manifest.json'), 'utf8'));
const PREV = manifest.draft as string;
const REQ = 'REQ-010';
const QUOTE = '「for any features that have multiple entry points, each entry needs to be tested completely and cannot assume they both lead to the same thing and have the same behavior」';

const rawCsv = readFileSync(join(TABLE, 'cases.csv'), 'utf8');
const bom = rawCsv.startsWith('﻿');
const approved = parseCsv(rawCsv.replace(/^﻿/, ''));
const H = approved[0];
const col = (n: string) => { const i = H.indexOf(n); if (i < 0) throw new Error(`no column ${n}`); return i; };
const [cID, cSec, cPre, cAct, cExp, cPri, cRef, cNotes] = ['ID', 'Section', 'Precondition', 'Action', 'Expected Result', 'Priority', 'Spec Ref', 'Notes'].map(col);
const body = approved.slice(1).filter(r => r.length > 1);
let next = Math.max(...body.map(r => +r[cID].slice(3))) + 1;
const tc = () => `TC-${String(next++).padStart(3, '0')}`;
const rows = body.map(r => [...r, 'unchanged', '']);
const steps = (a: string[]) => a.length === 1 ? a[0] : a.map((s, i) => `${i + 1}. ${s}`).join('\n');
const unnum = (s: string) => s.split('\n').map(l => l.replace(/^\d+\.\s+/, ''));

// ---- requirement and question ids ----
const reqText = readFileSync(join(TABLE, 'requirements.md'), 'utf8');
const maxR = Math.max(...[...reqText.matchAll(/^- R-(\d{3})/gm)].map(m => +m[1]));
const rid = (k: number) => `R-${String(maxR + k).padStart(3, '0')}`;
const R_LAUNCHER = rid(1), R_AIMAGIC = rid(2), R_GLOBAL = rid(3), R_PHOTO = rid(4), R_PIP = rid(5);
if (!/^- Q-5 /m.test(reqText) || /^- Q-6 /m.test(reqText)) throw new Error(`${PLATFORM}: expected Q-1 – Q-5 only`);

// ---- the entries ----
// Cinematic Reel Creator's own flow (NOT TESTABLE here): Android numbers it one higher (R-016 is its system Back rule).
const Rn = (n: number) => `R-${String(n + (ios ? 0 : 1)).padStart(3, '0')}`;
const GEN = `${Rn(16)} – ${Rn(27)}`;
const BASE = ['PowerDirector signed in on the test account', 'App language English', 'The Cinematic Reel Creator tutorial was dismissed before (its template page opens directly)'];
const PAGE_RE = /open on its template page$/;
const PROJECT = 'A project open in the editor with one photo on the main track and one photo on an overlay track (fixtures.md)';
const PROJECT_SAVED = 'A saved project with one photo on the main track and one photo on an overlay track (fixtures.md)';
const OPEN_PROJECT = 'Tap the Launcher\'s 「Project」 tab and open that project';
type Entry = {
  key: string; R: string; Q: string; path: string; section: string; source: string;
  setup: string[];            // precondition lines that put the app where the entry starts
  coldSetup: string[];        // precondition lines added when the row starts from a stopped app
  reach: string[];            // steps from that start to the template page
  coldReach: string[];        // steps from the Launcher of a fresh launch to the template page
  backTo: string;             // where ‹ is expected to return
  unchanged?: string;         // what the editor keeps after ‹
  reselect?: string;          // step that restores the start before reopening
  brings?: string;            // what the entry might bring in
};
const entries: Entry[] = [
  {
    key: 'aimagic', R: R_AIMAGIC, Q: '', path: 'Launcher › 「AI Magic」 tab › 「Cinematic Reel Creator」',
    section: 'Entry › AI Magic tab › Cinematic Reel Creator',
    source: 'KP-012, KP-013 (the AI Magic tab lists the AI tools; the Launcher\'s AI-Powered Creation 「View more」 opens it); not in the toolbar sheet',
    setup: ['The Launcher shown on its Home tab'], coldSetup: [],
    reach: ['Tap the 「AI Magic」 tab at the bottom', 'Tap 「Cinematic Reel Creator」 in the AI Magic list'],
    coldReach: ['Tap the 「AI Magic」 tab at the bottom', 'Tap 「Cinematic Reel Creator」 in the AI Magic list'],
    backTo: 'the AI Magic tab',
  },
  {
    key: 'global', R: R_GLOBAL, Q: '', path: 'Editor (nothing selected) › Global Toolbar › 「AI Magic」 › 「Cinematic Reel Creator」',
    section: 'Entry › Editor › Global Toolbar › AI Magic › Cinematic Reel Creator',
    source: 'toolbar sheet tab 「2026/11 Auto Reframe」, Global Toolbar › AI Magic (7/E), KP-107',
    setup: [PROJECT, 'Nothing selected on the timeline (the Global Toolbar shown)'], coldSetup: [PROJECT_SAVED],
    reach: ['Tap 「AI Magic」 on the editor toolbar', 'Tap 「Cinematic Reel Creator」'],
    coldReach: [OPEN_PROJECT, 'Tap 「AI Magic」 on the editor toolbar with nothing selected', 'Tap 「Cinematic Reel Creator」'],
    backTo: 'the editor', unchanged: 'nothing is selected and the timeline has the same two photos, none added, replaced or removed',
    reselect: 'If a clip is selected, tap an empty part of the timeline',
    brings: 'anything from the project (a photo already set on a card or a preview, 「Import a Photo」 replaced or skipped)',
  },
  {
    key: 'photo', R: R_PHOTO, Q: 'Q-8', path: 'Editor › select a main-track photo › Photo Toolbar › 「Effects」 › 「Cinematic Reel Creator」',
    section: 'Entry › Editor › Photo Toolbar › Effects › Cinematic Reel Creator',
    source: 'toolbar sheet tab 「2026/11 Auto Reframe」, Photo Toolbar › Effects (7/E), KP-107',
    setup: [PROJECT, 'The photo on the main track selected (the Photo Toolbar shown)'], coldSetup: [PROJECT_SAVED],
    reach: ['Tap 「Effects」 on the Photo Toolbar', 'Tap 「Cinematic Reel Creator」'],
    coldReach: [OPEN_PROJECT, 'Tap the photo on the main track', 'Tap 「Effects」 on the Photo Toolbar', 'Tap 「Cinematic Reel Creator」'],
    backTo: 'the editor', unchanged: 'the main-track photo is still selected and unchanged, and the timeline has the same two photos, none added, replaced or removed',
    reselect: 'If the main-track photo is no longer selected, tap it',
    brings: 'the selected main-track photo (shown on a card or a preview, 「Import a Photo」 replaced or skipped)',
  },
  {
    key: 'pip', R: R_PIP, Q: 'Q-9', path: 'Editor › select an overlay photo › PIP Photo Toolbar › 「Effects」 › 「Cinematic Reel Creator」',
    section: 'Entry › Editor › PIP Photo Toolbar › Effects › Cinematic Reel Creator',
    source: 'toolbar sheet tab 「2026/11 Auto Reframe」, PIP Photo Toolbar › Effects (7/E), KP-107',
    setup: [PROJECT, 'The photo on the overlay track selected (the PIP Photo Toolbar shown)'], coldSetup: [PROJECT_SAVED],
    reach: ['Tap 「Effects」 on the PIP Photo Toolbar', 'Tap 「Cinematic Reel Creator」'],
    coldReach: [OPEN_PROJECT, 'Tap the photo on the overlay track', 'Tap 「Effects」 on the PIP Photo Toolbar', 'Tap 「Cinematic Reel Creator」'],
    backTo: 'the editor', unchanged: 'the overlay photo is still selected and unchanged on its overlay track, and the timeline has the same two photos, none added, replaced or removed',
    reselect: 'If the overlay photo is no longer selected, tap it',
    brings: 'the selected overlay photo (shown on a card or a preview, 「Import a Photo」 replaced or skipped)',
  },
];
const LAUNCHER: Entry = {
  key: 'launcher', R: R_LAUNCHER, Q: '', path: 'Launcher › 「Cinematic Reel Creator」', section: '', source: 'Design d-cinestory Launcher_2026_v1 (361:16292), the flow\'s first frame',
  setup: ['The Launcher shown on its Home tab'], coldSetup: [], reach: ['Tap 「Cinematic Reel Creator」 on the Launcher'],
  coldReach: ['Tap 「Cinematic Reel Creator」 on the Launcher'], backTo: 'the Launcher (Home tab)',
};


// ---- new IDs: every row new in this draft is numbered here, in table order (approved IDs never change) ----
const SEL: Record<string, string> = { photo: 'the selected main-track photo', pip: 'the selected overlay photo' };
const PLACE: Record<string, string> = { global: 'added to the timeline', photo: 'replacing the main-track photo', pip: 'replacing the overlay photo on its overlay track' };
const KEEP: Record<string, string> = { global: 'both photos are where they were', photo: 'the overlay photo is where it was', pip: 'the main-track photo is where it was' };
const pageOf = (e: Entry, primary: boolean) => primary ? 'Launcher › 「Cinematic Reel Creator」 open on its template page' : `Cinematic Reel Creator opened from ${e.path}, on its template page`;
const CRED = 'Credits on the account for one Micro Cinema generation';
const CRED2 = 'Credits on the account for two Micro Cinema generations';
const PHOTO = 'A gallery photo that is not in the project, the generation photo (fixtures.md)';
const WAIT = `A generation takes minutes${ios ? '' : ', the upload alone up to 8 min (KP-100)'}: keep the app in front; spend the credits it needs (AGENTS.md › Credits).`;
const RULE = `Entry UI pass (analysis.md pass 12; user, 2026-11-26: 「for each entry, it should only check the UI, so click everything once and make sure there's no errors for each button and options」).`;
const ids: Record<string, string[]> = {};

// ---- primary entry: landing and way back, then a reel generated (user ruling 2026-11-26 「Yes, generate per entry」) ----
function launcherLanding(): string[] {
  const act = ['Tap 「Cinematic Reel Creator」 on the Launcher', 'Tap ‹ on the template page'];
  const exp = ['Step 1: the Launcher shows 「Cinematic Reel Creator」',
    'Step 1: the Cinematic Reel Creator template page opens directly, with no tutorial',
    'Step 1: the template cards show, each with its 「View photo tips」 chip and 「Import a Photo」',
    'Step 1: the header shows ‹, the credit pill with the account\'s balance, 「?」 and history',
    'Step 2: the Launcher (Home tab) is shown again'];
  if (!ios) { act.push('Tap 「Cinematic Reel Creator」 on the Launcher', 'Press system Back'); exp.push('Step 3: the template page opens again', 'Step 4: system Back leaves the template page to the Launcher (Home tab)'); }
  return [tc(), 'View photo tips chip', steps([...BASE, 'The Launcher shown on its Home tab']), steps(act), exp.join('\n'), 'P2', `${R_LAUNCHER}, R-001; ${REQ}`,
    'Entry › Launcher, the primary entry (pass 12): the landing and the way back. Template page ‹ and system Back are not drawn; leaving and returning is the team\'s QA rule.',
    'new', `${REQ} (pass 12): the primary entry had no row for its landing and its way back`];
}
function launcherGen(): string[][] {
  const e = LAUNCHER, [g1, g2, g3] = [tc(), tc(), tc()];
  const pre = (extra: string[]) => steps([...BASE, pageOf(e, true), ...extra]);
  const ruling = 'Generation per entry: user ruling 2026-11-26 (REQ-010).';
  const flow = 'Flow: Design arrows Add Media photo → preview 「Generate」 → Analyzing & Generating → task list; the 「AI Processing Notice」 and the price on 「Generate」 are from the exploration notes, not the spec.';
  const reason = (what: string) => `${REQ} (pass 12, user ruling 2026-11-26 「Yes, generate per entry」): ${what} through ${e.path}`;
  const ref = `${e.R}; ${REQ}`;
  const r1 = [g1, 'View photo tips chip', pre([CRED2, PHOTO]), steps(['Read the credit pill on the template page', 'Swipe the template cards to the 「Micro Cinema」 card', 'Tap 「Import a Photo」', 'In Add Media, tap the generation photo (skip when Add Media does not open)', 'Tap 「Generate」 on the preview', 'If a notice or a credit confirmation opens, tap 「I Agree」 or 「OK」', 'Wait until Analyzing & Generating hands over to the task list', 'Read the credit pill']),
    ['Step 1: record the balance', 'Step 3: Add Media opens', 'Before step 5: the preview shows the generation photo', 'Before step 5: 「Generate」 shows its credit price (record it)', 'Step 6: record each dialog\'s title and text (none is in the spec)', 'Step 7: Analyzing & Generating runs its steps, then the task list shows a 「Micro Cinema <MMDD>」 task in progress', 'Step 8: the balance is lower by exactly the price on 「Generate」, charged once'].join('\n'),
    'P1', ref, `${ruling} ${flow} ${WAIT} Leave the task running: ${g3} opens its reel.`, 'new', reason('a reel generated and charged')];
  const leave = ios ? 'While 「Uploading」 or Analyzing & Generating shows, tap ‹ at the top left (record when there is none)' : 'While 「Uploading」 or Analyzing & Generating shows, press system Back';
  const r2 = [g2, 'View photo tips chip', pre([CRED2, PHOTO, 'The 「Micro Cinema」 card in view']), steps(['Tap 「Import a Photo」 on the 「Micro Cinema」 card', 'In Add Media, tap the generation photo (skip when Add Media does not open)', 'Tap 「Generate」 on the preview', 'If a notice or a credit confirmation opens, tap 「I Agree」 or 「OK」', leave, 'If the app is still on that page, tap 「View later」', 'Open the Cinematic Reel Creator task list from the template page\'s history icon, reaching the template page through this Section\'s entry if the app left it']),
    [`Step 5: record what happens: the page closes to the template page, to ${e.backTo}, a leave or cancel dialog opens (quote it), or nothing`, 'Step 5: the Design draws only 「View later」 and 「Create another one」 on that page (Q-10), so any outcome is recorded as Fail (question) for PM', 'Step 7: record whether the task is in the list (in progress, done or failed)', 'Step 7: the credit pill shows one charge for this generation, or a refund if the generation was cancelled (record which)', 'Steps 1–7: the app does not crash or freeze'].join('\n'),
    'P2', ref, `${ruling} Q-10: leaving while a reel is generated.${ios ? ' iOS has no system Back: the top-left control is the way out.' : ''} ${WAIT}`, 'new', reason('leaving during a generation')];
  const r3 = [g3, 'View photo tips chip', pre([`The task started by ${g1} (Micro Cinema) running or done`]), steps(['Tap the history icon on the template page', `Wait until the task started by ${g1} shows 「View」`, 'Tap 「View」', ios ? 'Tap ‹ on the result page' : 'Press system Back on the result page', 'Tap ‹ until Cinematic Reel Creator is left', 'Open the Launcher\'s 「Project」 tab', 'Open the 「AI Magic」 tab › 「My Artwork」']),
    ['Step 3: the result page opens with the reel\'s cover, 「Add Text」 and 「Edit Music」', 'Step 4: record where it leads (the task list or the template page): no spec draws it (Q-10), so it is recorded as Fail (question) for PM', `Step 5: ${e.backTo} is shown again`, 'Step 6: record whether a new project appeared', 'Step 7: My Artwork\'s 「Cinematic Reel Creator」 block shows the reel'].join('\n'),
    'P1', ref, `${ruling} Design arrows: task 「View」 → result page. KP-103: open the task list once if the My Artwork tile still reads 「Processing...」. KP-079: the reel is not saved to the gallery by itself.`, 'new', reason('the finished reel, where it lands and the way out')];
  return [r1, r2, r3];
}

// ---- every other entry: a UI pass, four rows (landing, every control once, Add Media and the photo, Generate once and every exit) ----
const TEMPLATES = ['Horror Movie', 'Micro Cinema', 'One-Take Shot', 'Time Lapse', 'Handheld Camera', 'Fast Cut'];
function uiRows(e: Entry): string[][] {
  const [u1, u2, u3, u4] = [tc(), tc(), tc(), tc()];
  ids[e.key] = [u1, u2, u3, u4];
  const page = pageOf(e, false), sel = SEL[e.key], editor = !!e.unchanged, q = e.Q;
  const pre = (extra: string[]) => steps([...BASE, ...e.setup, page, ...extra]);
  const ent = `Entry: ${e.path}${q ? ` (${q})` : ''}.`;
  const reason = (what: string) => `${REQ} (pass 12, UI pass): ${what} through ${e.path}`;
  const k = e.reach.length;

  // U1 landing and what the entry brings in
  const x1 = [
    `Step ${k - 1}: ${e.key === 'aimagic' ? 'the AI Magic list' : 'the menu'} shows 「Cinematic Reel Creator」 (record where it sits)`,
    q ? `Step ${k - 1}: if it is not there, record the absence as Fail (question) for PM (${q}) and mark the rest of this Section Blocked` : `Step ${k - 1}: if it is not there, record the absence for the phase wrap-up (a PM question there) and mark the rest of this Section Blocked`,
    `Step ${k}: the Cinematic Reel Creator template page opens directly, with no tutorial`,
    `Step ${k}: the template cards show, each with its 「View photo tips」 chip and 「Import a Photo」`,
    `Step ${k}: the header shows ‹, the credit pill with the account's balance, 「?」 and history`,
    `Step ${k}: the cards are in the region's CMS order, the order the Launcher entry shows (record the first three names)`,
    ...(e.brings ? (q ? [`Step ${k}: record whether the page brings in ${e.brings}`, `Step ${k}: the Launcher entry brings nothing in, which is assumed here (${q}): anything brought in is recorded as Fail (question) for PM`] : [`Step ${k}: the page brings nothing in from the project, as from the Launcher entry`]) : []),
  ];
  const r1 = [u1, e.section, steps([...BASE, ...e.setup]), steps(e.reach), x1.join('\n'), 'P1', `${e.R}, R-001; ${REQ}`,
    `${RULE} Entry: ${e.path}, from ${e.source}. The spec draws only the Launcher entry, so this Section asserts the Launcher behaviour${q ? ` (${q})` : ''}. Exits are ${u4}.`,
    'new', reason('presence, the landing and what the entry brings in')];

  // U2 every control on the template page and the photo tips once
  const a2: string[] = []; const s2 = (t: string) => (a2.push(t), a2.length);
  const x2: string[] = [];
  for (const t of TEMPLATES) {
    s2(`Swipe the template cards to the 「${t}」 card`);
    const chip = s2('Tap 「View photo tips」 on that card');
    x2.push(`Step ${chip}: the photo tips sheet opens over the dimmed page and reads 「For best results with the ${t} template, follow this advice:」, with two 「Recommendation」 and three 「Avoid」 items, each picture loaded`);
    if (t === 'Micro Cinema') {
      s2('Swipe the 「Avoid」 row left');
      const sw = s2('Swipe the 「Avoid」 row back right');
      x2.push(`Step ${sw}: the row scrolls to 「Extreme Close-up」 and back, the 「Recommendation」 row stays`);
      const dim = s2('Tap the dimmed page above the sheet');
      x2.push(`Step ${dim}: record whether the sheet closes (Q-3)`, `Step ${dim}: nothing behind the dim reacts`);
      const swd = s2('If the sheet is still open, swipe it down from its first sentence');
      x2.push(`Step ${swd}: record whether the swipe closes the sheet (Q-3)`);
      s2('If the sheet is still open, tap 「Got it」');
      const re = s2('Tap 「View photo tips」 on the same card again');
      x2.push(`Step ${re}: the Micro Cinema sheet is open again`);
      if (!ios) { const b = s2('Press system Back'); x2.push(`Step ${b}: the sheet closes, back on the 「Micro Cinema」 card`); s2('Tap 「View photo tips」 on the same card again'); }
    }
    const got = s2('Tap 「Got it」');
    x2.push(`Step ${got}: the sheet closes, the dim is gone and the 「${t}」 card is shown`);
  }
  const help = s2('Tap 「?」 in the template page header');
  x2.push(`Step ${help}: the Cinematic Reel Creator tutorial opens (record its title)`);
  const helpX = s2('Close the tutorial with its X');
  x2.push(`Step ${helpX}: the template page is shown again`);
  const hist = s2('Tap the history icon in the header');
  x2.push(`Step ${hist}: the Cinematic Reel Creator task list opens (its tasks or 「No videos yet. Choose a template to create!」)`);
  const histB = s2(ios ? 'Tap the task list\'s top-left control' : 'Press system Back');
  x2.push(`Step ${histB}: the template page is shown again`);
  x2.push(`Steps 1–${a2.length}: every control responds once, with no error message, crash, freeze, blank picture or wrong template name`);
  const r2 = [u2, e.section, pre([]), steps(a2), x2.join('\n'), 'P2', `${e.R}, R-001, R-002, R-003, R-006, R-007, R-008, R-009, R-010, R-012${ios ? '' : ', R-016'}; ${REQ}`,
    `${RULE} Checklist: the controls of the primary rows TC-001 – TC-009${ios ? ', TC-046' : ', TC-020, TC-077'} (chip on each card, the sheet, Avoid row swipe, dimmed area and swipe down (Q-3), 「Got it」${ios ? '' : ', system Back'}) and the header 「?」 and history (control-trace.json). Q-3 outcomes are recorded, not failed here: TC-${ios ? '046' : '077'} files them. ${ent}`,
    'new', reason('every template page and photo tips control once')];

  // U3 Add Media and the photo: the values the page reads from its input
  const a3: string[] = []; const s3 = (t: string) => (a3.push(t), a3.length);
  const x3: string[] = [];
  s3('Swipe the template cards to the 「Micro Cinema」 card');
  const imp = s3('Tap 「Import a Photo」');
  if (sel) x3.push(`Step ${imp}: record whether Add Media opens or ${sel} is taken without it`, `Step ${imp}: the Launcher entry opens Add Media, which is assumed here (${q}): a photo taken from the editor is recorded as Fail (question) for PM`);
  else x3.push(`Step ${imp}: Add Media opens`);
  const qm = s3('Tap 「?」 in the Add Media header (skip steps that need Add Media when it did not open)');
  x3.push(`Step ${qm}: the Micro Cinema photo tips sheet opens over Add Media (Q-1: a missing 「?」 is DRA262611P0289, cited, not filed again)`);
  const got = s3('Tap 「Got it」');
  x3.push(`Step ${got}: Add Media is shown again, no photo picked`);
  if (!ios) { s3('Tap 「?」 in the Add Media header'); const b = s3('Press system Back'); x3.push(`Step ${b}: the sheet closes, Add Media is shown again`); }
  const tabs = s3('Tap each Add Media source tab once, ending on 「Recents」');
  x3.push(`Step ${tabs}: each tab shows its photos or its own sign-in or empty state, with no error`);
  const addBack = s3('Tap ‹ in the Add Media header');
  x3.push(`Step ${addBack}: the template page is shown again on the 「Micro Cinema」 card`);
  if (!ios) { s3('Tap 「Import a Photo」'); const b = s3('Press system Back'); x3.push(`Step ${b}: Add Media closes to the template page`); }
  s3('Tap 「Import a Photo」');
  const pick = s3('Tap the generation photo');
  x3.push(`Step ${pick}: the preview opens with the template 「Micro Cinema」 and 「Generate」 with its credit price (record it)`);
  x3.push(`Step ${pick}: the photo on the preview is the one picked${sel ? ` (record if it is ${sel} instead)` : ''}, whole, in its own orientation and aspect, not rotated, stretched, cropped to another photo or blank`);
  x3.push(`Step ${pick}: the price is the one the Launcher entry shows for Micro Cinema (${ids.launcher[0]})`);
  const prevB = s3('Tap ‹ on the preview');
  x3.push(`Step ${prevB}: record where it leads (Add Media or the template page), with no photo kept that was not picked`);
  const r3 = [u3, e.section, pre([PHOTO]), steps(a3), x3.join('\n'), 'P1', `${e.R}, R-004, R-005, R-010${ios ? '' : ', R-016'}; ${REQ}`,
    `${RULE} Checklist: the controls of the primary rows TC-010 – TC-016${ios ? '' : ', TC-021'} (「Import a Photo」, the Add Media 「?」, 「Got it」${ios ? '' : ', system Back'}) and Add Media's tabs, ‹ and photo pick. The input is the photo: the preview must show it as it is. ${ent}`,
    'new', reason('Add Media and the photo the page reads')];

  // U4 Generate once and every exit
  const a4: string[] = []; const s4 = (t: string) => (a4.push(t), a4.length);
  const x4: string[] = [];
  const read = s4('Read the credit pill on the template page');
  s4('Tap 「Import a Photo」 on the 「Micro Cinema」 card');
  s4('In Add Media, tap the generation photo (skip when Add Media does not open)');
  s4('Tap 「Generate」 on the preview');
  const dlg = s4('If a notice or a credit confirmation opens, tap 「I Agree」 or 「OK」');
  const leave = s4(ios ? 'While 「Uploading」 or Analyzing & Generating shows, tap ‹ at the top left (record when there is none)' : 'While 「Uploading」 or Analyzing & Generating shows, press system Back');
  s4('If the app is still on that page, tap 「View later」');
  const list = s4('Open the task list from the template page\'s history icon, reaching the template page through this entry if the app left it');
  s4('If the task was cancelled, generate again from the 「Micro Cinema」 card and do not leave');
  s4('Wait until the task shows 「View」');
  const done = s4('Read the credit pill');
  const view = s4('Tap 「View」');
  const rb = s4(ios ? 'Tap ‹ on the result page' : 'Press system Back on the result page');
  const out = s4('Tap ‹ until Cinematic Reel Creator is left');
  const look = editor ? s4('Look at the project\'s timeline') : 0;
  let again = 0;
  if (!ios) { if (e.reselect) s4(e.reselect); for (const st of e.reach) again = s4(st); }
  const back = !ios ? s4('Press system Back') : 0;
  const proj = s4(editor ? 'Tap ⌂ in the editor and open the Launcher\'s 「Project」 tab' : 'Open the Launcher\'s 「Project」 tab');
  const art = s4('Open the 「AI Magic」 tab › 「My Artwork」');
  x4.push(`Step ${read}: record the balance`, `Step ${dlg}: record each dialog's title and text (none is in the spec)`,
    `Step ${leave}: record what happens: the page closes to the template page, to ${e.backTo}, a leave or cancel dialog opens (quote it), or nothing`,
    `Step ${leave}: the Design draws only 「View later」 and 「Create another one」 on that page (Q-10), so any outcome is recorded as Fail (question) for PM`,
    `Step ${list}: record whether the task is in the list (in progress, done or failed)`,
    `Step ${done}: the balance is lower by exactly the price on 「Generate」, charged once for the reel that finished (a cancelled task refunded)`,
    `Step ${view}: the result page opens with the reel's cover, 「Add Text」 and 「Edit Music」`,
    `Step ${rb}: record where it leads (the task list or the template page): no spec draws it (Q-10), so it is recorded as Fail (question) for PM`,
    `Step ${out}: ${e.backTo} is shown again`, ...(q ? [`Step ${out}: no spec draws this entry's way back (${q}): ${e.backTo} is assumed`] : []));
  if (editor && q) x4.push(`Step ${look}: record where the reel is: ${PLACE[e.key]}, added as a new clip, or not in the project`,
    `Step ${look}: the Launcher entry adds nothing to any project, which is assumed here (${q}): a reel in the project is recorded as Fail (question) for PM`);
  if (editor && !q) x4.push(`Step ${look}: the reel is not added to the project, as from the Launcher entry`);
  if (editor) x4.push(
    `Step ${look}: ${KEEP[e.key]}, and nothing else on the timeline changed`);
  if (!ios) x4.push(`Step ${again}: the template page opens again`, `Step ${back}: system Back leaves the template page to ${e.backTo}${e.unchanged ? `, and ${e.unchanged}` : ''}`);
  x4.push(q ? `Step ${proj}: record whether a new project appeared (the Launcher entry opens none, assumed here, ${q})` : `Step ${proj}: no new project appeared, as from the Launcher entry`,
    `Step ${art}: My Artwork's 「Cinematic Reel Creator」 block shows the reel`);
  const r4 = [u4, e.section, pre([CRED2, PHOTO, 'The 「Micro Cinema」 card in view']), steps(a4), x4.join('\n'), 'P1', `${e.R}; ${REQ}`,
    `${RULE} Generate once (user ruling 2026-11-26 「Yes, generate per entry」), the leave-during-generation check folded in (Q-10); a second generation only if leaving cancelled the first. Checklist: the exits of the primary rows ${launcherIds[0]}, ${launcherIds.slice(1).join(', ')}. ${WAIT} KP-103: open the task list once if the My Artwork tile still reads 「Processing...」. ${ent}`,
    'new', reason('Generate once, where the reel lands and every exit')];
  return [r1, r2, r3, r4];
}

const launcherIds: string[] = [];
{
  const land = launcherLanding(); const gen = launcherGen();
  launcherIds.push(land[0], ...gen.map(r => r[0]));
  ids.launcher = gen.map(r => r[0]);
  const firstChip = rows.findIndex(r => r[cSec] === 'View photo tips chip');
  rows.splice(firstChip, 0, land, ...gen);
}
const sections: Record<string, string[][]> = {};
for (const e of entries) sections[e.key] = uiRows(e);
const mui = rows.findIndex(r => r[cSec] === 'MUI');
if (mui < 0 || rows.slice(mui).some(r => r[cSec] !== 'MUI')) throw new Error('the MUI section is not last');
rows.splice(mui, 0, ...entries.flatMap(e => sections[e.key]));
writeFileSync(join(DIR, 'draft.csv'), toCsv([[...H, 'Change', 'Change Reason'], ...rows]));

// ---- requirements.md ----
const range = (k: string) => { const a = k === 'launcher' ? launcherIds : ids[k]; return `${a[0]} – ${a[a.length - 1]}`; };
const [G1, G2, G3] = ids.launcher;
const U = (k: string, i: number) => ids[k][i];
const ALLLEAVE = [G2, ...entries.map(e => U(e.key, 3))].join(', '), ALLAFTER = [G3, ...entries.map(e => U(e.key, 3))].join(', ');
const BACK = ios ? '‹' : '‹ and system Back';
const RULING = `Rule changed by the user the same day (2026-11-26): 「for each entry, it should only check the UI, so click everything once and make sure there's no errors for each button and options」: the primary entry keeps the full table, every other entry gets a UI pass`;
let req = reqText;
{
  const m = req.match(/\n## View photo tips chip\n/); if (!m) throw new Error('no first section');
  req = req.replace(m[0], `\nDraft ${DRAFT} [Req: ${REQ}]: every entry point (analysis.md pass 12; user, 2026-11-26: ${QUOTE}).
${RULING}. The Launcher (primary, the Design's entry) gets a landing row and a reel generated (user ruling 2026-11-26
「Yes, generate per entry」): ${range('launcher')}. The AI Magic tab and three editor toolbar places (KP-107) each get four
rows in their own Section: the landing, every control once, Add Media and the photo, Generate once and every exit:
${entries.map(e => range(e.key)).join(', ')}. New: ${R_LAUNCHER} – ${R_PIP}, Q-8 – Q-10 (the per-entry questions Q-6 and Q-7 of the same day were trimmed: user, 2026-11-26 「yes, trim them」; the AI Magic tab and Global Toolbar rows assert the Launcher behaviour).\n${m[0]}`);
}
const gen = (k: string) => `${U(k, 3)}`;
const entryReqs = `## Entry points (pass 12, ${REQ})
- ${R_LAUNCHER} [DS:d-cinestory Launcher_2026_v1 361:16292; Rule 12: entry points; Req: ${REQ}] Primary entry: Launcher › 「Cinematic Reel Creator」 opens the template page directly (tutorial dismissed before) with the template cards and their 「View photo tips」 chips; ${BACK} on the template page return to the Launcher (leave and return, team QA rule). A reel generated from it (user ruling 2026-11-26, REQ-010): an Add Media pick → preview 「Generate」 with its price → Analyzing & Generating → task list → 「View」 → result page; the price is charged once and the reel shows in My Artwork, no project created (${G1} – ${G3}; leaving during and after: Q-10).
- ${R_AIMAGIC} [KB: KP-012; Rule 12: entry points; Req: ${REQ}] Launcher › 「AI Magic」 tab › 「Cinematic Reel Creator」 opens the same template page as the Launcher entry; every chip, photo tips sheet, Add Media control and the preview respond once with no error; Generate is charged the Launcher entry's price once and the reel lands only in the task list and My Artwork; ${BACK} return to the AI Magic tab. The spec does not draw this entry: its rows assert the Launcher behaviour, and a missing entry is raised at the phase wrap-up. UI pass ${range('aimagic')} (user rule 2026-11-26).
- ${R_GLOBAL} [KB: KP-107 toolbar sheet 「2026/11 Auto Reframe」 Global Toolbar › AI Magic (7/E); Rule 12: entry points; Req: ${REQ}] In the editor with nothing selected, Global Toolbar › 「AI Magic」 › 「Cinematic Reel Creator」 opens the same template page as the Launcher entry, bringing nothing in; every control responds once with no error; Generate takes an Add Media pick, is charged the Launcher entry's price once and the reel lands only in the task list and My Artwork, the project unchanged; ${BACK} return to the editor. The spec does not draw this entry: its rows assert the Launcher behaviour, and a missing entry is raised at the phase wrap-up. UI pass ${range('global')}.
- ${R_PHOTO} [KB: KP-107 toolbar sheet 「2026/11 Auto Reframe」 Photo Toolbar › Effects (7/E); Rule 12: entry points; Req: ${REQ}] With a main-track photo selected, Photo Toolbar › 「Effects」 › 「Cinematic Reel Creator」 opens the same template page as the Launcher entry; whether the selected photo is brought in is not stated; the preview shows the photo it takes as it is; every control responds once with no error; Generate is charged the Launcher entry's price once and the reel lands only in the task list and My Artwork, the main-track photo kept; ${BACK} return to the editor with that photo still selected (Q-8). UI pass ${range('photo')}.
- ${R_PIP} [KB: KP-107 toolbar sheet 「2026/11 Auto Reframe」 PIP Photo Toolbar › Effects (7/E); Rule 12: entry points; Req: ${REQ}] With an overlay photo selected, PIP Photo Toolbar › 「Effects」 › 「Cinematic Reel Creator」 opens the same template page as the Launcher entry; whether the selected overlay photo is brought in is not stated; the preview shows the photo it takes as it is; every control responds once with no error; Generate is charged the Launcher entry's price once and the reel lands only in the task list and My Artwork, the overlay photo kept; ${BACK} return to the editor with that photo still selected (Q-9). UI pass ${range('pip')}.

`;
{
  const i = req.indexOf('\n## MUI\n'); if (i < 0) throw new Error('no ## MUI');
  req = req.slice(0, i + 1) + entryReqs + req.slice(i + 1);
}
const questions: Record<string, string> = {
  'Q-8': `Editor Photo Toolbar entry: the toolbar sheet places Cinematic Reel Creator under Photo Toolbar › Effects (7/E) for a main-track photo, and no spec draws it. Is it in the build, and does the selected photo come into Cinematic Reel Creator (shown on a card or a preview, 「Import a Photo」 skipped, so Add Media and its 「?」 are not reached), or does the same template page open as from the Launcher? Where do ${BACK} return, and does a generated reel replace that photo on the main track? Assumption: the same template page as from the Launcher, nothing brought in, ${BACK} return to the editor with the photo still selected and unchanged, and the reel lands only in the task list and My Artwork. ${R_PHOTO}, ${U('photo', 0)} (presence, what it brings in), ${U('photo', 2)} (the photo the generation takes), ${U('photo', 3)} (Generate, where the reel lands, exits).`,
  'Q-9': `Editor PIP Photo Toolbar entry: the toolbar sheet places Cinematic Reel Creator under PIP Photo Toolbar › Effects (7/E) for an overlay photo, and no spec draws it. Is it in the build, does the selected overlay photo come in (「Import a Photo」 skipped) or does the same template page open as from the Launcher, where do ${BACK} return, and does a generated reel replace the overlay photo on its overlay track or go to the main track? Assumption: the same template page as from the Launcher, nothing brought in, ${BACK} return to the editor with the overlay photo still selected and unchanged, and the reel lands only in the task list and My Artwork. ${R_PIP}, ${U('pip', 0)} (presence, what it brings in), ${U('pip', 2)} (the photo the generation takes), ${U('pip', 3)} (Generate, where the reel lands, exits).`,
  'Q-10': `Leaving during and after a generation: the Design draws only 「View later」 and 「Create another one」 on Analyzing & Generating, and the result page's own buttons, but no ${BACK} on either page. What should ${BACK} do while the photo uploads or the reel is generated (cancel with a refund, keep the task running, a leave dialog), and where should ${BACK} on the result page lead? Assumption: none: the rows record it as Fail (question) for PM, during (${ALLLEAVE}) and after (${ALLAFTER}). ${R_LAUNCHER} – ${R_PIP}.`,
};
{
  const m = req.match(/\n- Q-5 [^\n]*\n/); if (!m) throw new Error('no Q-5');
  req = req.replace(m[0], m[0] + Object.entries(questions).map(([q, t]) => `- ${q} ${t}`).join('\n') + '\n');
}
const entryGrid = `
## Added 2026-11-26 — pass 12, every entry point (${REQ})

### Entry points
- Launcher › 「Cinematic Reel Creator」 — primary: Design d-cinestory Launcher_2026_v1 (361:16292) is the flow's first frame (board-notes 「Whole CineStory flow (Launcher, …)」) · ios, android · the full table: Sections View photo tips chip, Photo tips sheet, Media room ?, Language, Data source, MUI · every approved row, ${launcherIds[0]} (landing and ${BACK}) and ${G1} – ${G3} (a reel generated, leaving during it, the finished reel) · ${R_LAUNCHER}
${entries.map(e => `- ${e.path} — ${e.source} · ios, android (no platform note in the sheet) · UI pass, Section 「${e.section}」 · ${U(e.key, 0)} landing and what it brings in, ${U(e.key, 1)} every template page and photo tips control once, ${U(e.key, 2)} Add Media and the photo, ${U(e.key, 3)} Generate once and every exit · ${[e.R, e.Q].filter(Boolean).join(', ')}`).join('\n')}
- UI pass (user rule 2026-11-26): the other entries do not repeat the primary rows; their checklist is the primary rows' controls (named in each row's Notes). Combinations, the six templates' item lists, offline, the CMS log, Language and MUI stay with the primary entry.
- Not entries of this table: the template page's 「?」 is the tutorial (board-notes; ${Rn(26)}); the Add Media 「?」 opens the photo tips inside each entry's flow (R-004, Q-1); 「Create another one」 (${Rn(22)}) and the task list (${Rn(19)} – ${Rn(21)}, ${Rn(27)}) return to the template page from inside Cinematic Reel Creator's generation flow. No banner, push, deep link, Mine › demo or 「You might also like」 entry is named by the spec set, the knowledge or a run of this feature; the Launcher's AI-Powered Creation 「View more」 opens the AI Magic tab (KP-013), so it is the AI Magic tab entry.
- Shared state across entries (pass 9): the tutorial, dismissed once, is assumed dismissed from every entry (each landing row checks that the page opens directly); no 「Don't show again」 or kept setting in the photo tips.
${ios ? '' : `
### System back (entries)
- Template page: ${launcherIds[0]} (Launcher), ${entries.map(e => `${U(e.key, 3)}`).join(', ')}.
- Photo tips sheet (chip): ${entries.map(e => U(e.key, 1)).join(', ')}; Add Media and its sheet: ${entries.map(e => U(e.key, 2)).join(', ')}; Analyzing & Generating and the result page: ${G2}, ${G3}, ${entries.map(e => U(e.key, 3)).join(', ')}.
`}
### Request ledger coverage

| Ledger entry | Requirements |
|---|---|
| ${REQ} (table: every entry point; primary full table, the others a UI pass, user 2026-11-26) | ${R_LAUNCHER} – ${R_PIP}; Q-8 – Q-10 |
`;
req = req.replace(/\n*$/, '\n') + entryGrid;
writeFileSync(join(DIR, 'requirements.md'), req);

// ---- questions.zh-Hant.json ----
const zh: Record<string, string> = JSON.parse(readFileSync(join(TABLE, 'questions.zh-Hant.json'), 'utf8'));
const BACKZ = ios ? '‹' : '‹ 和系統返回鍵';
delete zh['Q-6']; delete zh['Q-7'];
zh['Q-8'] = `編輯器 Photo Toolbar 入口：工具列表把 Cinematic Reel Creator 放在主軌相片的 Photo Toolbar › Effects 底下（7/E），沒有規格畫出來。這個版本有沒有？選取的相片會不會直接帶進 Cinematic Reel Creator（顯示在卡片或預覽上、跳過「Import a Photo」，就不會進到 Add Media 和它的「?」），還是和從 Launcher 進入一樣開啟同一個範本頁？${BACKZ}回到哪裡？產生的影片會不會取代主軌上的那張相片？假設：和 Launcher 入口一樣是同一個範本頁、不帶相片進來，${BACKZ}回到編輯器，相片仍是選取狀態且沒有變動，影片只出現在任務列表和 My Artwork。`;
zh['Q-9'] = `編輯器 PIP Photo Toolbar 入口：工具列表把 Cinematic Reel Creator 放在子母畫面相片的 PIP Photo Toolbar › Effects 底下（7/E），沒有規格畫出來。這個版本有沒有？選取的子母畫面相片會不會直接帶進來（跳過「Import a Photo」），還是和從 Launcher 進入一樣開啟同一個範本頁？${BACKZ}回到哪裡？產生的影片會取代子母畫面軌上的相片，還是放到主軌？假設：和 Launcher 入口一樣是同一個範本頁、不帶相片進來，${BACKZ}回到編輯器，子母畫面相片仍是選取狀態且沒有變動，影片只出現在任務列表和 My Artwork。`;
zh['Q-10'] = `產生中與產生後的離開方式：Design 在 Analyzing & Generating 頁只畫了「View later」和「Create another one」，結果頁也只有它自己的按鈕，兩頁都沒有畫 ${BACKZ}。上傳相片或產生影片時按 ${BACKZ}應該怎樣（取消並退點、任務繼續跑、跳出離開確認）？在結果頁按 ${BACKZ}要回到哪裡？沒有假設：各列把結果記為 Fail（question）交給 PM，產生中是 ${ALLLEAVE}，產生後是 ${ALLAFTER}。`;
writeFileSync(join(DIR, 'questions.zh-Hant.json'), JSON.stringify(zh, null, 2) + '\n');

// ---- carried over: traces (the UI pass rows press the chip, 「Got it」 and 「Import a Photo」) and the run plan ----
for (const f of ['annotation-trace.json', 'control-trace.json']) {
  const from = [join(TABLE, 'drafts', PREV, f), join(TABLE, f)].find(existsSync);
  if (!from) continue;
  const data = JSON.parse(readFileSync(from, 'utf8'));
  if (f === 'control-trace.json') for (const en of data.entries) {
    if (!/^TC-\d{3}/.test(en.press)) continue;
    const add = en.label === 'View photo tips' ? entries.map(e => U(e.key, 1))
      : en.label === 'Got it' ? entries.flatMap(e => [U(e.key, 1), U(e.key, 2)])
      : en.label === 'Import a Photo' ? [G1, G2, ...entries.flatMap(e => [U(e.key, 2), U(e.key, 3)])] : [];
    en.press = [en.press, ...add].join(', ');
  }
  writeFileSync(join(DIR, f), JSON.stringify(data, null, f === 'control-trace.json' ? 1 : 2) + '\n');
}
const phases = JSON.parse(readFileSync(join(TABLE, 'drafts', PREV, 'phases.json'), 'utf8'));
writeFileSync(join(DIR, 'phases.json'), JSON.stringify({ ...phases, draft: DRAFT }, null, 2) + '\n');
if (!existsSync(join(DIR, 'spec.json'))) {
  const prevSpec = JSON.parse(readFileSync(join(TABLE, 'drafts', PREV, 'spec.json'), 'utf8'));
  writeFileSync(join(DIR, 'spec.json'), JSON.stringify({ ...prevSpec, draft: DRAFT, created_at: new Date().toISOString(), based_on_version: manifest.version }, null, 2) + '\n');
}

// ---- update-plan.md ----
const newCount = launcherIds.length + entries.length * 4;
writeFileSync(join(DIR, 'update-plan.md'), `# Update plan — Cinematic Reel Creator Photo Tips / ${PLATFORM}: approved v${manifest.version} → draft ${DRAFT}

Based on approved v${manifest.version} (${manifest.cases} rows). Same spec set (${manifest.spec_folder}); the change comes from the request ledger
[${REQ}] (user, 2026-11-26: ${QUOTE}), as narrowed the same day: ${RULING}
(analysis.md pass 12). A reel is generated through every entry (user ruling 2026-11-26 「Yes, generate per entry」).

## Spec files
- Unchanged: spec set ${manifest.spec_folder}. New or changed: none. No longer supplied: none.
- Also read: the toolbar sheet's newest tab 「2026/11 Auto Reframe」 (\`node scripts/entry-points.ts pdr "Cinematic Reel"\`, KP-107):
  Global Toolbar › AI Magic, Photo Toolbar › Effects, PIP Photo Toolbar › Effects, each 「7/E」, no platform note.
- The generation steps follow the Design arrows and the exploration notes (knowledge/sources/2026-11-03-pdri-exploration-kb/cinematic-reel-creator.md).

## Requirement changes
| Requirement | Change | Before | After |
|---|---|---|---|
| ${R_LAUNCHER} | new | the Launcher entry was only a precondition | primary entry: landing, ${BACK}, a reel generated (${range('launcher')}) |
| ${R_AIMAGIC} – ${R_PIP} | new | — | one UI pass per entry, four rows each, Generate once |
| Q-8, Q-9 | new | — | the Photo and PIP Photo entries: which photo the generation takes and where the reel lands |
| Q-6, Q-7 | dropped | per-entry 「the same as the Launcher?」 questions for the AI Magic tab and the Global Toolbar | their rows assert the Launcher behaviour; a missing entry is raised at the phase wrap-up (pass 12; user, 2026-11-26 「yes, trim them」) |
| Q-10 | new | — | ${BACK} during and after a generation: ${G2}, ${G3} and each entry's exits row |

## Case changes
- New (${newCount}), numbered in table order:
  - ${launcherIds[0]} (${R_LAUNCHER}), first in 「View photo tips chip」: Launcher landing and ${BACK}.
  - ${G1} – ${G3} (${R_LAUNCHER}), right after it: a reel generated and charged, leaving during a generation (Q-10), the finished reel and the way out.
${entries.map(e => `  - ${range(e.key)} (${e.R}), Section 「${e.section}」 before MUI: ${U(e.key, 0)} presence and landing (an absent entry is a Fail (question) and Blocks the Section), ${U(e.key, 1)} every template page and photo tips control once, ${U(e.key, 2)} Add Media and the photo the preview reads, ${U(e.key, 3)} Generate once (charge, leave during it, where the reel lands) and every exit.`).join('\n')}
- Modified (0)
- Removed (0)
- Unchanged: ${body.length}

## Found by the analysis
- Pass 12 entries: the Launcher (primary, Design), the AI Magic tab (KP-012, KP-013), and Global Toolbar › AI Magic,
  Photo Toolbar › Effects, PIP Photo Toolbar › Effects (toolbar sheet, KP-107). No platform limit in the sheet.
- Every approved row reaches the feature from the Launcher; none from any other entry.
- UI pass checklist: the controls of the primary rows (chip on each card, the sheet, the Avoid row, dimmed area and swipe
  down, 「Got it」${ios ? '' : ', system Back'}, 「Import a Photo」, the Add Media 「?」), plus the header 「?」 and history, Add Media's
  tabs and ‹, the preview's ‹ and 「Generate」 (control-trace.json lists the new rows on the chip, 「Got it」 and 「Import a Photo」).
- The input each editor entry may bring is a photo: the preview row checks the photo shown is the one taken, as it is.

## Not added (value check)
- Copies of the primary rows per entry (each template's item list, Fast Cut's picture${ios ? '' : ', the EN pictures'}, the Q-3 gestures
  as their own rows, offline, the CMS log, Language and MUI): the UI pass rule (user, 2026-11-26) keeps them with the primary entry.
- A separate leave-during-generation row per entry: folded into each entry's Generate-and-exits row.
- Tier and paywall per entry: the photo tips charge nothing (KP-007 n/a); Generate reads the price and the charge.

## How the rows run
- Each entry's Section is its own segment (pass 12). The editor Sections need a project with one photo on the main
  track and one on an overlay track, and a gallery photo not in it (fixtures.md).
- Credits: one Micro Cinema generation per non-primary entry (a second only if leaving cancelled the first) and two for
  the Launcher: six per platform, up to ten (user ruling 2026-11-26, AGENTS.md › Credits).
- Run each Section's Generate row early and its control rows while the reel is generated.
- phases.json is carried over unchanged from draft ${PREV} (only the MUI phase); the run plan of the next full run lists
  the four entry Sections as segments.

## Questions for PM
- Q-8 From Photo Toolbar › Effects, is the selected main-track photo brought in, and does the reel replace it?
- Q-9 From PIP Photo Toolbar › Effects, is the selected overlay photo brought in, and where does the reel go?
- Q-10 What should ${BACK} do while a reel is generated, and where do they lead from the result page?

## Questions for you
- None.
`);
console.log(`${PLATFORM}: ${body.length} approved rows + ${newCount} new (${range('launcher')}, ${entries.map(e => range(e.key)).join(', ')}) → ${join(DIR, 'draft.csv')}`);
