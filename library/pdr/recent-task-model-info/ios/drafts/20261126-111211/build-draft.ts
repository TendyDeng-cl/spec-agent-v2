// Draft 20261126-111211 (ios) / 20261126-111212 (android): every entry point [Req: REQ-004; spec-casebook analysis.md
// pass 12, rewritten 2026-11-26]. The same file sits in both draft folders.
// The primary entry (AI Magic › My Artwork, tasks generated from AI Magic › the tool) keeps the full approved table.
// Every other way to the Recent tasks of Image to Video, Text to Video and Text to Image gets its own Section
// `Entry › …` with a UI pass (user, 2026-11-26: 「for each entry, it should only check the UI, so click everything once
// and make sure there's no errors for each button and options」): the landing and what it lists, the tags against the
// tasks' own models, every control once, one generation where the entry starts one, every exit and system Back once.
// TC-029 / TC-030 / TC-034 start from the Template tab only (Home 「What's Trending」 has its own Section). MUI stays last.
// Run:  node <this file>        rebuild draft.csv, requirements.md and update-plan.md
//       node <this file> --zh   after `zh-copy.ts … export`: answer zh-work/batch-NN.json from the Chinese written here
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { dirname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseCsv, toCsv } from '../../../../../../scripts/lib/csv.ts';

const DIR = dirname(fileURLToPath(import.meta.url));
const DRAFT = basename(DIR);
const PLATFORM = basename(dirname(dirname(DIR))) as 'android' | 'ios';
const TABLE = dirname(dirname(DIR));
const ios = PLATFORM === 'ios';
const REQ = 'REQ-004';

type Row = Record<string, string>;
const COLS = ['ID', 'Section', 'Precondition', 'Action', 'Expected Result', 'Priority', 'Spec Ref', 'Notes'];
const read = (f: string) => { const [, ...b] = parseCsv(readFileSync(f, 'utf8')); return b.map(r => Object.fromEntries(COLS.map((c, i) => [c, r[i] ?? '']))) as Row[]; };
const approved = read(join(TABLE, 'cases.csv'));
const zhById = new Map(read(join(TABLE, 'cases.zh-Hant.csv')).map(r => [r.ID, r]));
const base = approved.filter(r => r.Section !== 'MUI');
const mui = approved.filter(r => r.Section === 'MUI');
let next = Math.max(...approved.map(r => +r.ID.slice(3))) + 1;
const tc = (n: number) => `TC-${String(n).padStart(3, '0')}`;

const Q0 = ios ? 5 : 6;
const Q = { MINE: `Q-${Q0}`, MENU: `Q-${Q0 + 1}`, TOOL: `Q-${Q0 + 2}`, EDITOR: `Q-${Q0 + 3}`, PHOTO: `Q-${Q0 + 4}`, HOME: `Q-${Q0 + 5}`, BANNER: `Q-${Q0 + 6}` };

type Bi = { en: string; zh: string };
const B = (en: string, zh: string): Bi => ({ en, zh });
const lines = (s: string) => s.split('\n').map(l => l.replace(/^\d+\.\s+/, '')).filter(l => l.trim() !== '');
const num = (ls: string[]) => ls.length === 1 ? ls[0] : ls.map((s, i) => `${i + 1}. ${s}`).join('\n');

type Tool = 'Image to Video' | 'Text to Video' | 'Text to Image';
type Kind = 'MINE' | 'MENU' | 'TOOL' | 'EDITOR' | 'SHORTCUT' | 'AIPC' | 'PHOTO' | 'PIP' | 'BANNER' | 'WT';
const R: Record<Kind, string> = { MINE: 'R-090', MENU: 'R-091', TOOL: 'R-092', EDITOR: 'R-093', PHOTO: 'R-094', PIP: 'R-095', SHORTCUT: 'R-096', AIPC: 'R-097', WT: 'R-098', BANNER: 'R-099' };
// Only real unknowns get a question (pass 12, 「When the spec is silent」, user 2026-11-26): the editor entries (task list per
// tool or per project, where the result lands, the exits) and Photo / PIP Photo Text to Image (presence, the selected photo).
// The other entries assert the primary behaviour with no question; a difference is filed or raised at the wrap-up.
const QOF: Partial<Record<Kind, string>> = { EDITOR: Q.EDITOR, PHOTO: Q.PHOTO, PIP: Q.PHOTO };
const lab = (k: Kind, X: Tool) => k === 'PIP' ? 'AI Text to Image' : X;

function path(k: Kind, X: Tool): Bi {
  switch (k) {
    case 'MINE': return B('Mine › 「My Artwork」', 'Mine › 「My Artwork」');
    case 'MENU': return B('Home › ☰ › 「My Artwork」', '首頁（Home）› ☰ › 「My Artwork」');
    case 'TOOL': return B(`AI Magic › 「${X}」 › Recent tasks`, `AI Magic › 「${X}」 › Recent 任務`);
    case 'EDITOR': return B(`Editor › Global toolbar › 「AI Magic」 › 「${X}」`, `編輯器 › Global 工具列 › 「AI Magic」 › 「${X}」`);
    case 'SHORTCUT': return B(`Home › 「${X}」 shortcut tile`, `首頁（Home）› 「${X}」捷徑圖示`);
    case 'AIPC': return B(`Home › 「AI-Powered Creation」 › 「${X}」`, `首頁（Home）› 「AI-Powered Creation」 › 「${X}」`);
    case 'PHOTO': return B('Editor › Photo toolbar › 「Tools」 › 「Text to Image」', '編輯器 › Photo 工具列 › 「Tools」 › 「Text to Image」');
    case 'PIP': return B('Editor › PIP Photo toolbar › 「Tools」 › 「AI Text to Image」', '編輯器 › PIP Photo 工具列 › 「Tools」 › 「AI Text to Image」');
    case 'WT': return B('Home › 「What\'s Trending」 › template', '首頁（Home）› 「What\'s Trending」 › 範本');
    case 'BANNER': return B(`completion banner of 「${X}」 › 「View」 › ‹`, `「${X}」的完成通知橫幅 › 「View」 › ‹`);
  }
}
function section(k: Kind, X?: Tool): Bi {
  switch (k) {
    case 'MINE': return B('Entry › Mine › My Artwork', '入口 › Mine › My Artwork');
    case 'MENU': return B('Entry › Home › ☰ › My Artwork', '入口 › 首頁 › ☰ › My Artwork');
    case 'TOOL': return B(`Entry › AI Magic › ${X} › Recent tasks`, `入口 › AI Magic › ${X} › 工具頁的 Recent 任務`);
    case 'EDITOR': return B(`Entry › Editor › Global › AI Magic › ${X}`, `入口 › 編輯器 › Global 工具列 › AI Magic › ${X}`);
    case 'SHORTCUT': return B(`Entry › Home › shortcut › ${X}`, `入口 › 首頁 › 捷徑 › ${X}`);
    case 'AIPC': return B(`Entry › Home › AI-Powered Creation › ${X}`, `入口 › 首頁 › AI 創作推薦區 › ${X}`);
    case 'PHOTO': return B('Entry › Editor › Photo › Tools › Text to Image', '入口 › 編輯器 › 相片工具列 › 工具 › Text to Image');
    case 'PIP': return B('Entry › Editor › PIP Photo › Tools › AI Text to Image', '入口 › 編輯器 › 子母畫面相片工具列 › 工具 › AI Text to Image');
    case 'WT': return B('Entry › Home › What\'s Trending › template', '入口 › 首頁 › What\'s Trending › 範本');
    case 'BANNER': return B(`Entry › Completion banner › ${X}`, `入口 › 完成通知橫幅 › ${X}`);
  }
}

// ---- steps ----
const artworkSteps = (k: Kind): Bi[] => k === 'MINE'
  ? [B('Tap 「Mine」 in the bottom bar (「Pro」 on a Pro account)', '點底部的「Mine」（Pro 帳號顯示為「Pro」）'), B('Tap 「My Artwork」', '點「My Artwork」')]
  : [B('Open Home', '開啟首頁（Home）'), B('Tap ☰ at the top left', '點左上角的 ☰'), B('Tap 「My Artwork」', '點「My Artwork」')];
function openTool(k: Kind, X: Tool): Bi[] {
  switch (k) {
    case 'TOOL': case 'BANNER': return [B(`Open AI Magic › 「${X}」`, `開啟 AI Magic › 「${X}」`)];
    case 'EDITOR': return [B('Open a project in the editor with nothing selected', '在編輯器開啟一個專案，不選取任何素材'), B('Tap 「AI Magic」 on the toolbar', '點工具列上的「AI Magic」'), B(`Tap 「${X}」`, `點「${X}」`)];
    case 'SHORTCUT': return [B('Open Home', '開啟首頁（Home）'), B(`Tap the 「${X}」 shortcut tile`, `點「${X}」捷徑圖示`)];
    case 'AIPC': return [B('Open Home', '開啟首頁（Home）'), B(`In 「AI-Powered Creation」 tap the 「${X}」 card`, `在「AI-Powered Creation」點「${X}」卡片`)];
    case 'PHOTO': return [B('Open a project in the editor with a photo on the main track', '在編輯器開啟一個主軌上有相片的專案'), B('Tap the photo to select it', '點該相片選取它'), B('Tap 「Tools」', '點「Tools」'), B('Tap 「Text to Image」', '點「Text to Image」')];
    case 'PIP': return [B('Open a project in the editor with a photo on an overlay (PIP) track', '在編輯器開啟一個子母畫面（PIP）軌上有相片的專案'), B('Tap the overlay photo to select it', '點該子母畫面相片選取它'), B('Tap 「Tools」', '點「Tools」'), B('Tap 「AI Text to Image」', '點「AI Text to Image」')];
    default: throw new Error(k);
  }
}
const RECENT = B('Open the page\'s Recent tasks (its history or 「Recent」 control)', '開啟該頁的 Recent 任務（歷史紀錄或「Recent」按鈕）');
const reachRecent = (k: Kind, X: Tool): Bi[] => k === 'MINE' || k === 'MENU'
  ? [...artworkSteps(k), B(`Tap the 「${X}」 card row`, `點「${X}」卡片列`)]
  : [...openTool(k, X), RECENT];
// where ‹ on the tool page leads, per entry
const dest = (k: Kind): Bi => ({
  TOOL: B('AI Magic shows again', '再次顯示 AI Magic'), BANNER: B('AI Magic shows again', '再次顯示 AI Magic'),
  EDITOR: B('the editor shows again with the project as it was (nothing added to or removed from the timeline)', '回到編輯器，專案維持原樣（時間軸沒有多也沒有少任何素材）'),
  SHORTCUT: B('Home shows again', '再次顯示首頁（Home）'), AIPC: B('Home shows again', '再次顯示首頁（Home）'),
  PHOTO: B('the editor shows again with the photo still selected', '回到編輯器，相片仍是選取狀態'), PIP: B('the editor shows again with the overlay photo still selected', '回到編輯器，子母畫面相片仍是選取狀態'),
} as Record<string, Bi>)[k];
const MODEL: Record<Tool, string | null> = { 'Image to Video': 'Vidu Q2', 'Text to Video': 'Wan 2.7', 'Text to Image': null };
const TASKS: Record<Tool, Bi> = {
  'Image to Video': B('The Image to Video tasks of TC-003 and TC-006 – TC-014 (one per model) and the template task of TC-029 exist', 'TC-003、TC-006 – TC-014 產生的 Image to Video 任務（每個模型一個）和 TC-029 的範本任務都在'),
  'Text to Video': B('The Text to Video tasks of TC-016 and TC-019 – TC-026 (one per model) and the template task of TC-030 exist', 'TC-016、TC-019 – TC-026 產生的 Text to Video 任務（每個模型一個）和 TC-030 的範本任務都在'),
  'Text to Image': B('The account has a finished Text to Image task (TC-033)', '帳號有一個已完成的 Text to Image 任務（TC-033）'),
};

// ---- row builder ----
type Out = Row & { Change: string; 'Change Reason': string };
type Pair = { en: Out; zh: Out };
const pairs: Pair[] = [];
const entryRows: Record<string, string[]> = {};
const qRows: Record<string, string[]> = {};
class RB {
  a: Bi[] = []; e: Bi[] = []; pre: Bi[] = [];
  step(...xs: Bi[]) { this.a.push(...xs); return this.a.length; }
  ex(n: number | string, en: string, zh: string) { this.e.push(B(`Step ${n}: ${en}`, `步驟 ${n}：${zh}`)); }
  line(en: string, zh: string) { this.e.push(B(en, zh)); }
}
const SIGNED = B('Signed in with the test account (fixtures.md)', '以測試帳號登入（fixtures.md）');
const NOERR = B('Every step: the app responds with no error, crash, freeze or empty screen', '每一步：App 都有正常回應，沒有錯誤、閃退、卡住或空白畫面');
function emit(k: Kind, X: Tool | null, what: Bi, rb: RB, refs: string, pri: string, note: Bi, q = true) {
  const id = tc(next++), sec = section(k, X ?? undefined), p = path(k, X ?? 'Image to Video');
  const pre = rb.pre.length ? rb.pre : [SIGNED];
  const mk = (l: 'en' | 'zh'): Out => ({
    ID: id, Section: sec[l], Precondition: num(pre.map(x => x[l])), Action: num(rb.a.map(x => x[l])),
    'Expected Result': rb.e.map(x => x[l]).join('\n'), Priority: pri, 'Spec Ref': `${refs}, ${R[k]}`, Notes: note[l],
    Change: l === 'en' ? 'new' : '新增',
    'Change Reason': l === 'en' ? `Pass 12 UI pass (${REQ}): ${what.en} through ${p.en}` : `第 12 輪 UI 檢查（${REQ}）：經由 ${p.zh}${what.zh}`,
  });
  pairs.push({ en: mk('en'), zh: mk('zh') });
  (entryRows[sec.en] ??= []).push(id);
  const qk = QOF[k];
  if (q && qk) (qRows[qk] ??= []).push(id);
  return id;
}
const assumeNote = (k: Kind, X: Tool, extra?: Bi): Bi => {
  const p = path(k, X), q = QOF[k];
  const en = q ? `Entry ${p.en}: the spec draws only AI Magic › My Artwork; the row asserts the same behaviour (${q}).` : `Entry ${p.en}: the row asserts the primary entry's behaviour (AI Magic › My Artwork); a difference is filed or raised at the phase wrap-up.`;
  const zh = q ? `入口 ${p.zh}：規格只畫了 AI Magic › My Artwork，此列假設行為相同（${q}）。` : `入口 ${p.zh}：此列以主要入口（AI Magic › My Artwork）的行為為準；若有差異，開 eBug 或在階段收尾時提出。`;
  return extra ? B(`${extra.en} ${en}`, `${extra.zh}${zh}`) : B(en, zh);
};
const presenceNote = (k: Kind, X: Tool): Bi => {
  const q = QOF[k];
  return B(`Entry ${path(k, X).en}. Presence: if the build has no such entry, record what is there instead; the absence is raised as a PM question at the phase wrap-up${q ? ` (${q})` : ''} and the other rows of this Section are Blocked.`,
    `入口 ${path(k, X).zh}。是否存在：若此版本沒有這個入口，記錄實際看到的畫面；缺少入口會在階段收尾時當作問題交給 PM${q ? `（${q}）` : ''}，本區其他列記為 Blocked。`);
};
const CHECK_I2V = B('Checklist: the controls of the primary rows TC-005 and TC-035 – TC-037 (control-trace.json: card, model tag, 「View」, 「Manage」, checkbox, 「Select All」, 「Deselect All」, 「Cancel」; 「Delete」 is never tapped). The Recent page draws no ⋯ menu, filter, tab or Share: if the build shows one, press it once and record what it does.',
  '檢查清單：主要入口 TC-005、TC-035 – TC-037 用到的控制項（control-trace.json：卡片、model 標籤、「View」、「Manage」、核取方塊、「Select All」、「Deselect All」、「Cancel」；千萬不要點「Delete」）。Recent 頁沒有畫 ⋯ 選單、篩選、分頁或分享；如果版本有，點一次並記錄它的作用。');
const CHECK_TTI = B('Checklist: the primary row TC-033 and the Design\'s Text to Image path (My Artwork › Recent task › Preview page, 1794:3221). If the page shows other controls (⋯, Share, filters), press each once and record what it does.',
  '檢查清單：主要入口的 TC-033，以及 Design 的 Text to Image 流程（My Artwork › Recent task › Preview 頁，1794:3221）。如果頁面還有其他控制項（⋯、分享、篩選），各點一次並記錄它的作用。');

// ---- rows ----
// landing: the entry is there and lists the tool's tasks
function landing(k: Kind, X: Tool) {
  const rb = new RB();
  if (k === 'BANNER') {
    const m = MODEL[X];
    rb.pre = X === 'Image to Video' ? [SIGNED, B('A photo in the gallery', '圖庫裡有一張相片')] : [SIGNED];
    rb.step(...openTool(k, X));
    if (X === 'Image to Video') rb.step(B('Add the photo', '加入相片'));
    else rb.step(B('Type a short prompt', '輸入一段簡短提示詞'));
    if (m) rb.step(B(`Pick the model 「${m}」`, `選擇模型「${m}」`));
    const g = rb.step(B('Tap Generate and stay until it finishes', '點 Generate，停在這裡等到產生完成'));
    const v = rb.step(B('Tap 「View」 on the completion banner', '點完成通知橫幅上的「View」'));
    const b = rb.step(B('Tap ‹ on the result page', '在結果頁點 ‹'));
    rb.ex(g, 'when the task finishes, a completion banner with 「View」 shows', '任務完成時出現帶有「View」的完成通知橫幅');
    rb.ex(v, 'the result page of that task opens with no error', '開啟該任務的結果頁，沒有錯誤');
    rb.ex(b, `the ${X} Recent tasks open, titled 「${X}」, newest first`, `開啟 ${X} 的 Recent 任務，標題為「${X}」，由新到舊排列`);
    rb.ex(b, m ? `the new task is listed first and its tag reads 「${m}」` : 'the new task is listed first, with no model tag (Q-1)', m ? `新任務排在最前面，標籤為「${m}」` : '新任務排在最前面，沒有 model 標籤（Q-1）');
    rb.ex(b, `the list also holds the ${X} tasks started from the other entries`, `清單裡也有從其他入口開始的 ${X} 任務`);
    return emit(k, X, B('the landing and the new task', '確認落點與新任務'), rb, m ? `R-001, R-002, ${X === 'Image to Video' ? 'R-010' : 'R-011'}, R-012` : 'R-001, R-022', 'P1', presenceNote(k, X));
  }
  const ot = openTool(k, X);
  rb.step(...ot);
  if (k === 'PHOTO' || k === 'PIP') rb.ex(ot.length - 1, `「Tools」 offers 「${lab(k, X)}」`, `「Tools」裡有「${lab(k, X)}」`);
  rb.ex(ot.length, `the 「${lab(k, X)}」 page opens with no error`, `開啟「${lab(k, X)}」頁，沒有錯誤`);
  const n = rb.step(RECENT);
  rb.ex(n, `the ${X} Recent tasks open, titled 「${X}」, newest first`, `開啟 ${X} 的 Recent 任務，標題為「${X}」，由新到舊排列`);
  rb.ex(n, `they list every ${X} task of the account, also those started from AI Magic and the other entries, not only those started here`, `列出帳號所有的 ${X} 任務，包含從 AI Magic 和其他入口開始的，不只是從這裡開始的`);
  return emit(k, X, B('the landing and what it lists', '確認落點與列出的任務'), rb, 'R-001', 'P1', presenceNote(k, X));
}
// landing through My Artwork (Mine, ☰): every feature row once
function artworkLanding(k: Kind) {
  const rb = new RB();
  const a = rb.step(...artworkSteps(k));
  rb.ex(a, 'My Artwork opens with a card row per feature, including 「Cinematic Reel Creator」, 「Text to Video」, 「Image to Video」 and 「Text to Image」', '開啟 My Artwork，每項功能各有一列卡片，包含「Cinematic Reel Creator」、「Text to Video」、「Image to Video」與「Text to Image」');
  const backs: number[] = [];
  for (const [X, en, zh] of [
    ['Image to Video', 'the Image to Video Recent page opens, titled 「Image to Video」, its cards newest first', '開啟 Image to Video 的 Recent 頁，標題為「Image to Video」，卡片由新到舊排列'],
    ['Text to Video', 'the Text to Video Recent page opens, titled 「Text to Video」, its cards newest first', '開啟 Text to Video 的 Recent 頁，標題為「Text to Video」，卡片由新到舊排列'],
    ['Text to Image', 'the Text to Image Recent page opens with no model tag on its items (Q-1)', '開啟 Text to Image 的 Recent 頁，項目沒有 model 標籤（Q-1）'],
    ['Cinematic Reel Creator', 'the Cinematic Reel Creator Recent page opens with no model tag and no empty line on any card (R-021)', '開啟 Cinematic Reel Creator 的 Recent 頁，所有卡片都沒有 model 標籤，也沒有空行（R-021）'],
  ]) {
    const s = rb.step(B(`Tap the 「${X}」 card row`, `點「${X}」卡片列`)); rb.ex(s, en, zh);
    backs.push(rb.step(B('Tap ‹', '點 ‹')));
  }
  rb.e.push(B(`Steps ${backs.join(', ')}: My Artwork shows again`, `步驟 ${backs.join('、')}：再次顯示 My Artwork`));
  return emit(k, null, B('the landing and every feature row', '確認落點與每一列功能'), rb, 'R-001, R-021, R-022', 'P1', presenceNote(k, 'Image to Video'));
}
// tags against the tasks' own models
function tags(k: Kind, X: Tool, after?: string) {
  const rb = new RB();
  const tools: Tool[] = X ? [X] : ['Image to Video', 'Text to Video'];
  rb.pre = after ? [B(`The ${X} Recent tasks reached in ${after} are open`, `${after} 開啟的 ${X} Recent 任務還在畫面上`)] : tools.map(t => TASKS[t]);
  for (const t of tools) {
    if (!after) rb.step(...(k === 'MINE' || k === 'MENU' ? (t === tools[0] ? reachRecent(k, t) : [B(`Tap the 「${t}」 card row`, `點「${t}」卡片列`)]) : reachRecent(k, t)));
    const s = rb.step(B(`Read the tag of every ${t} card`, `逐一查看每張 ${t} 卡片的標籤`));
    rb.ex(s, `each card's tag reads the model its own task was generated with (as recorded in ${t === 'Image to Video' ? 'TC-003, TC-006 – TC-014' : 'TC-016, TC-019 – TC-026'}), written as the model picker names it`, `每張卡片的標籤都是該任務自己產生時用的模型（以 ${t === 'Image to Video' ? 'TC-003、TC-006 – TC-014' : 'TC-016、TC-019 – TC-026'} 記錄的為準），名稱與模型選單一致`);
    rb.ex(s, 'the template card shows no tag and no empty line', '範本卡片沒有標籤，也沒有空行');
    rb.ex(s, 'every tag is one line, cut with 「…」 only when it does not fit, never overlapping 「View」, and every card is 120 pt tall', '每個標籤都是單行，放不下時才以「…」截斷，不會蓋到「View」，每張卡片高度都是 120 pt');
    if (k === 'MINE' || k === 'MENU') if (t === tools[0]) rb.step(B('Tap ‹', '點 ‹'));
  }
  return emit(k, X, B('the tags against each task\'s own model', '核對每個標籤與任務自己的模型'), rb, 'R-010, R-011, R-012, R-013, R-014, R-016, R-020', 'P1', assumeNote(k, X ?? 'Image to Video'));
}
// every control once
function controls(k: Kind, X: Tool, after?: string) {
  const rb = new RB();
  rb.pre = after ? [B(`The ${X} Recent tasks reached in ${after} are open`, `${after} 開啟的 ${X} Recent 任務還在畫面上`)] : [TASKS[X]];
  if (!after) rb.step(...reachRecent(k, X));
  if (X === 'Text to Image') {
    const a = rb.step(B('Tap a Text to Image item', '點一個 Text to Image 項目'));
    const b = rb.step(B('Tap ‹ on its preview page', '在預覽頁點 ‹'));
    rb.ex(a, 'its preview (result) page opens with no error', '開啟它的預覽（結果）頁，沒有錯誤');
    rb.ex(b, 'the Text to Image Recent tasks show again, with no model tag on any item (Q-1)', '再次顯示 Text to Image 的 Recent 任務，所有項目都沒有 model 標籤（Q-1）');
    rb.line(NOERR.en, NOERR.zh);
    return emit(k, X, B('every control once', '每個控制項點一次'), rb, 'R-002, R-022', 'P2', assumeNote(k, X, CHECK_TTI));
  }
  const t = rb.step(B('Tap the model tag of a card', '點一張卡片的 model 標籤'));
  const v = rb.step(B('Tap 「View」 on a tagged card', '點一張有標籤的卡片上的「View」'));
  const b = rb.step(B('Tap ‹ on the result page', '在結果頁點 ‹'));
  const m = rb.step(B('Tap 「Manage」', '點「Manage」'));
  const c = rb.step(B('Tap the checkbox of a tagged card', '點一張有標籤的卡片的核取方塊'));
  const sa = rb.step(B('Tap 「Select All」', '點「Select All」'));
  const da = rb.step(B('Tap 「Deselect All」', '點「Deselect All」'));
  const ca = rb.step(B('Tap 「Cancel」', '點「Cancel」'));
  rb.ex(t, 'nothing opens and the card stays as it was (the Design draws the tag as a label)', '不會開啟任何東西，卡片維持原樣（Design 把標籤畫成純文字標示）');
  rb.ex(v, 'the result page of that task opens with no error', '開啟該任務的結果頁，沒有錯誤');
  rb.ex(b, 'the Recent tasks show again and the card keeps its tag', '再次顯示 Recent 任務，該卡片的標籤不變');
  rb.ex(m, 'edit mode opens: an empty checkbox on every card, 「Select All」, 「Cancel」 and the 「Delete」 bar, every tag unchanged', '進入編輯模式：每張卡片都有空的核取方塊，並出現「Select All」、「Cancel」和「Delete」列，標籤都不變');
  rb.ex(c, 'that checkbox is ticked and the tag still shows', '該核取方塊被勾選，標籤仍然顯示');
  rb.ex(sa, 'every checkbox is ticked and the button reads 「Deselect All」', '所有核取方塊都被勾選，按鈕文字變成「Deselect All」');
  rb.ex(da, 'every checkbox is empty', '所有核取方塊都是空的');
  rb.ex(ca, 'edit mode closes and every card shows 「View」 with the same tags', '離開編輯模式，每張卡片再次顯示「View」，標籤與先前相同');
  rb.line(NOERR.en, NOERR.zh);
  return emit(k, X, B('every control once', '每個控制項點一次'), rb, 'R-002, R-030', 'P2', assumeNote(k, X, CHECK_I2V));
}
// every control once through My Artwork (Mine, ☰): the Image to Video page fully, the other pages' own controls
function artworkControls(k: Kind) {
  const rb = new RB();
  rb.pre = [TASKS['Image to Video'], TASKS['Text to Video'], TASKS['Text to Image']];
  rb.step(...reachRecent(k, 'Image to Video'));
  const t = rb.step(B('Tap the model tag of a card', '點一張卡片的 model 標籤'));
  const v = rb.step(B('Tap 「View」 on a tagged card', '點一張有標籤的卡片上的「View」'));
  const b = rb.step(B('Tap ‹ on the result page', '在結果頁點 ‹'));
  const m = rb.step(B('Tap 「Manage」', '點「Manage」'));
  const c = rb.step(B('Tap the checkbox of a tagged card', '點一張有標籤的卡片的核取方塊'));
  const sa = rb.step(B('Tap 「Select All」', '點「Select All」'));
  const da = rb.step(B('Tap 「Deselect All」', '點「Deselect All」'));
  const ca = rb.step(B('Tap 「Cancel」', '點「Cancel」'));
  rb.step(B('Tap ‹', '點 ‹'));
  rb.step(B('Tap the 「Text to Video」 card row', '點「Text to Video」卡片列'));
  const v2 = rb.step(B('Tap 「View」 on a tagged card', '點一張有標籤的卡片上的「View」'));
  const b2 = rb.step(B('Tap ‹ on the result page', '在結果頁點 ‹'));
  rb.step(B('Tap ‹', '點 ‹'));
  rb.step(B('Tap the 「Text to Image」 card row', '點「Text to Image」卡片列'));
  const v3 = rb.step(B('Tap a Text to Image item', '點一個 Text to Image 項目'));
  const b3 = rb.step(B('Tap ‹ on its preview page', '在預覽頁點 ‹'));
  rb.ex(t, 'nothing opens and the card stays as it was (the Design draws the tag as a label)', '不會開啟任何東西，卡片維持原樣（Design 把標籤畫成純文字標示）');
  rb.e.push(B(`Steps ${v}, ${v2}, ${v3}: the result (preview) page of that task opens with no error`, `步驟 ${v}、${v2}、${v3}：開啟該任務的結果（預覽）頁，沒有錯誤`));
  rb.e.push(B(`Steps ${b}, ${b2}, ${b3}: the Recent page shows again and every card keeps its tag (Text to Image: none)`, `步驟 ${b}、${b2}、${b3}：再次顯示 Recent 頁，每張卡片的標籤都不變（Text to Image 沒有標籤）`));
  rb.ex(m, 'edit mode opens: an empty checkbox on every card, 「Select All」, 「Cancel」 and the 「Delete」 bar, every tag unchanged', '進入編輯模式：每張卡片都有空的核取方塊，並出現「Select All」、「Cancel」和「Delete」列，標籤都不變');
  rb.ex(c, 'that checkbox is ticked and the tag still shows', '該核取方塊被勾選，標籤仍然顯示');
  rb.ex(sa, 'every checkbox is ticked and the button reads 「Deselect All」', '所有核取方塊都被勾選，按鈕文字變成「Deselect All」');
  rb.ex(da, 'every checkbox is empty', '所有核取方塊都是空的');
  rb.ex(ca, 'edit mode closes and every card shows 「View」 with the same tags', '離開編輯模式，每張卡片再次顯示「View」，標籤與先前相同');
  rb.line(NOERR.en, NOERR.zh);
  return emit(k, null, B('every control once', '每個控制項點一次'), rb, 'R-002, R-022, R-030', 'P2', assumeNote(k, 'Image to Video', CHECK_I2V));
}
// one generation from the entry and where the result lands
function generate(k: Kind, X: Tool) {
  const rb = new RB(), m = MODEL[X], L = lab(k, X);
  rb.pre = X === 'Image to Video' ? [SIGNED, B('A photo in the gallery', '圖庫裡有一張相片')] : [SIGNED];
  rb.step(...openTool(k, X));
  rb.step(X === 'Image to Video' ? B('Add the photo', '加入相片') : B('Type a short prompt', '輸入一段簡短提示詞'));
  const p = m ? rb.step(B(`Pick the model 「${m}」`, `選擇模型「${m}」`)) : 0;
  rb.step(B('Tap Generate and wait until it finishes', '點 Generate，等到產生完成'));
  const r = rb.step(B(`Back on the 「${L}」 page, open its Recent tasks (its history or 「Recent」 control)`, `回到「${L}」頁，開啟它的 Recent 任務（歷史紀錄或「Recent」按鈕）`));
  const v = rb.step(B('Tap 「View」 on the new task (Text to Image: tap the new item)', '點新任務上的「View」（Text to Image：點新項目）'));
  const b = rb.step(B('Tap ‹ on the result page', '在結果頁點 ‹'));
  const b2 = rb.step(B('Tap ‹ on the Recent tasks', '在 Recent 任務頁點 ‹'));
  const b3 = rb.step(B(`Tap ‹ on the 「${L}」 page`, `在「${L}」頁點 ‹`));
  if (p) rb.ex(p, `「${m}」 is selected`, `已選取「${m}」`);
  rb.ex(r, m ? `the new task is listed first and its tag reads 「${m}」` : 'the new task is listed first, with no model tag (Q-1)', m ? `新任務排在最前面，標籤為「${m}」` : '新任務排在最前面，沒有 model 標籤（Q-1）');
  rb.ex(v, 'the result page of the new task opens with no error', '開啟新任務的結果頁，沒有錯誤');
  rb.ex(b, 'the Recent tasks show again', '再次顯示 Recent 任務');
  rb.ex(b2, `the 「${L}」 page shows again`, `再次顯示「${L}」頁`);
  rb.ex(b3, dest(k).en, dest(k).zh);
  if (k === 'PHOTO' || k === 'PIP') rb.ex(b3, `what happened to the selected photo (unchanged, replaced by the result, or a new clip added) is recorded as a Fail (question) for PM (${Q.PHOTO}), whatever it is`, `記錄選取的相片怎麼了（不變、被結果取代，或多了一個新素材），不論結果如何都記為 Fail（question）交給 PM（${Q.PHOTO}）`);
  const extra = k === 'EDITOR' || k === 'PHOTO' || k === 'PIP' ? B('Record whether the result page offers to add the result to this project.', '請記錄結果頁是否提供把結果加入這個專案的選項。') : undefined;
  return emit(k, X, B('one generation and where its result lands', '產生一次並確認結果的去向'), rb, m ? `R-002, ${X === 'Image to Video' ? 'R-010' : 'R-011'}, R-012` : 'R-002, R-022', 'P1', assumeNote(k, X, extra));
}
// every exit and (Android) system Back once
function exits(k: Kind, X: Tool, after?: string) {
  const rb = new RB();
  const mine = k === 'MINE' || k === 'MENU', tti = X === 'Text to Image', L = lab(k, X);
  const back = B('Press system Back', '按系統返回鍵');
  const originEx = mine ? B('My Artwork shows again', '再次顯示 My Artwork') : B(`the 「${L}」 page shows again`, `再次顯示「${L}」頁`);
  rb.pre = after ? [B(`The ${X} Recent tasks reached in ${after} are open`, `${after} 開啟的 ${X} Recent 任務還在畫面上`)] : [TASKS[X]];
  if (!after) rb.step(...reachRecent(k, X));
  if (!ios) {
    rb.step(tti ? B('Tap a Text to Image item', '點一個 Text to Image 項目') : B('Tap 「View」 on a tagged card', '點一張有標籤的卡片上的「View」'));
    const r1 = rb.step(back);
    rb.ex(r1, 'the Recent tasks show again with the tags unchanged', '再次顯示 Recent 任務，標籤不變');
    if (!tti) {
      rb.step(B('Tap 「Manage」', '點「Manage」'), B('Tap the checkbox of a card', '點一張卡片的核取方塊'));
      const e = rb.step(back);
      rb.ex(e, `edit mode closes as with 「Cancel」, no task is deleted and every card keeps its tag (Q-5)`, '編輯模式關閉，效果和「Cancel」相同，沒有任務被刪除，每張卡片都保留標籤（Q-5）');
    }
    if (k !== 'BANNER') {
      const r2 = rb.step(back); rb.ex(r2, originEx.en, originEx.zh);
      if (!mine || k === 'MENU') {
        const d = rb.step(back);
        if (k === 'MENU') rb.ex(d, 'the ☰ page shows again', '再次顯示 ☰ 頁面'); else rb.ex(d, dest(k).en, dest(k).zh);
      }
      rb.step(...reachRecent(k, X));
    }
  }
  const r = rb.step(B('Tap ‹ on the Recent tasks', '在 Recent 任務頁點 ‹'));
  rb.ex(r, originEx.en, originEx.zh);
  if (!mine) {
    const d = rb.step(k === 'BANNER' && !ios ? back : B(`Tap ‹ on the 「${L}」 page`, `在「${L}」頁點 ‹`));
    rb.ex(d, dest(k).en, dest(k).zh);
  }
  if (k === 'MENU') { const d = rb.step(B('Leave My Artwork with its ‹', '用 My Artwork 的 ‹ 離開')); rb.ex(d, 'the ☰ page shows again', '再次顯示 ☰ 頁面'); }
  return emit(k, X, B(ios ? 'every exit once' : 'every exit and system Back once', ios ? '每個離開方式各一次' : '每個離開方式和系統返回鍵各一次'), rb, ios ? 'R-002' : 'R-002, R-070', 'P2', assumeNote(k, X));
}

// ---- primary rows: TC-029 / TC-030 / TC-034 start from the Template tab ----
const TEMPLATE_START: Record<string, Bi> = {
  'TC-029': B('Start an Image to Video template from the Template tab with the photo', '用這張相片從 Template 分頁開始一個 Image to Video 範本'),
  'TC-030': B('Start a Text to Video template from the Template tab', '從 Template 分頁開始一個 Text to Video 範本'),
  'TC-034': B('Start an Image to Video template from the Template tab with the photo and tap Generate', '用這張相片從 Template 分頁開始一個 Image to Video 範本並點 Generate'),
};
const primaryPairs: Pair[] = base.map(r => {
  const z = zhById.get(r.ID)!;
  const en: Out = { ...r, Change: 'unchanged', 'Change Reason': '' } as Out;
  const zh: Out = { ...z, Change: '未變更', 'Change Reason': '' } as Out;
  const t = TEMPLATE_START[r.ID];
  if (t) {
    const A = lines(r.Action), Az = lines(z.Action); A[0] = t.en; Az[0] = t.zh;
    en.Action = num(A); zh.Action = num(Az); en.Change = 'modified'; zh.Change = '已修改';
    en['Change Reason'] = `Pass 12 (${REQ}): starts from the Template tab only; the Home 「What's Trending」 start has its own Section`;
    zh['Change Reason'] = `第 12 輪（${REQ}）：只從 Template 分頁開始；從首頁「What's Trending」開始的另有自己的區塊`;
  }
  return { en, zh };
});

// ---- the entry Sections ----
const TOOLS: Tool[] = ['Image to Video', 'Text to Video', 'Text to Image'];
for (const k of ['MINE', 'MENU'] as Kind[]) { artworkLanding(k); tags(k, null as unknown as Tool); artworkControls(k); exits(k, 'Image to Video'); }
for (const k of ['TOOL', 'EDITOR'] as Kind[]) for (const X of TOOLS) {
  landing(k, X); if (X !== 'Text to Image') tags(k, X); controls(k, X); if (k === 'EDITOR') generate(k, X); exits(k, X);
}
for (const k of ['PHOTO', 'PIP'] as Kind[]) { landing(k, 'Text to Image'); controls(k, 'Text to Image'); generate(k, 'Text to Image'); exits(k, 'Text to Image'); }
for (const k of ['SHORTCUT', 'AIPC'] as Kind[]) for (const X of TOOLS) {
  landing(k, X); if (X !== 'Text to Image') tags(k, X); controls(k, X); generate(k, X); exits(k, X);
}
// Home 「What's Trending」 templates: start the template there, look at it on the primary Recent page
for (const [X, en, zh] of [['Image to Video', 'an Image to Video', '一個 Image to Video'], ['Text to Video', 'a Text to Video', '一個 Text to Video']] as [Tool, string, string][]) {
  const rb = new RB();
  rb.pre = X === 'Image to Video' ? [SIGNED, B('A photo in the gallery', '圖庫裡有一張相片')] : [SIGNED];
  rb.step(B('Open Home', '開啟首頁（Home）'));
  const t = rb.step(B(`In 「What's Trending」 tap ${en} template`, `在「What's Trending」點${zh}範本`));
  rb.step(X === 'Image to Video' ? B('Start it with the photo', '用這張相片開始') : B('Start it', '開始這個範本'));
  rb.step(B('Generate and wait until it finishes', '產生並等到完成'));
  rb.step(B('Open AI Magic › 「My Artwork」', '開啟 AI Magic › 「My Artwork」'));
  const r = rb.step(B(`Tap 「${X}」`, `點「${X}」`));
  rb.ex(t, 'the template page opens with no error', '開啟範本頁，沒有錯誤');
  rb.ex(r, 'the template task is listed with no model tag and no empty line where the tag would be', '範本任務出現在清單中，沒有 model 標籤，標籤的位置也沒有空行');
  rb.ex(r, 'its card is 120 pt tall, as the tagged cards', '卡片高度為 120 pt，和有標籤的卡片相同');
  emit('WT', X, B(`${X} template once`, `開始一次 ${X} 範本`), rb, 'R-020, R-016', 'P2', assumeNote('WT', X, B(`Checklist: the primary row ${X === 'Image to Video' ? 'TC-029' : 'TC-030'} (Q-3 applies).`, `檢查清單：主要入口的 ${X === 'Image to Video' ? 'TC-029' : 'TC-030'}（適用 Q-3）。`)));
}
for (const X of TOOLS) {
  const first = landing('BANNER', X);
  if (X !== 'Text to Image') tags('BANNER', X, first);
  controls('BANNER', X, first); exits('BANNER', X, first);
}

// ---- draft.csv ----
const muiPairs: Pair[] = mui.map(r => ({ en: { ...r, Change: 'unchanged', 'Change Reason': '' } as Out, zh: { ...zhById.get(r.ID)!, Change: '未變更', 'Change Reason': '' } as Out }));
const all = [...primaryPairs, ...pairs, ...muiPairs];
const HEAD = [...COLS, 'Change', 'Change Reason'];
if (process.argv.includes('--zh')) {
  const work = join(DIR, 'zh-work'), zh = new Map(all.map(p => [p.zh.ID, p.zh as Row]));
  let n = 0;
  for (const f of readdirSync(work).filter(f => /^batch-\d+\.json$/.test(f))) {
    const b = JSON.parse(readFileSync(join(work, f), 'utf8'));
    const out: Record<string, Record<string, string>> = {};
    for (const r of b.rows) { const z = zh.get(r.ID); if (!z) throw new Error(`no Chinese for ${r.ID}`); out[r.ID] = Object.fromEntries(Object.keys(r.en).map(k => [k, z[k] ?? ''])); }
    writeFileSync(join(work, f.replace('.json', '.out.json')), JSON.stringify(out, null, 1)); n++;
  }
  console.log(`wrote ${n} answer file(s) in ${work}`);
  process.exit(0);
}
writeFileSync(join(DIR, 'draft.csv'), toCsv([HEAD, ...all.map(p => HEAD.map(c => (p.en as Row)[c] ?? ''))]));

// ---- requirements.md ----
const uniq = (xs: string[]) => xs.filter((v, i, a) => a.indexOf(v) === i);
const qIds = (q: string) => uniq(qRows[q] ?? []).join(', ');
const rowsOf = (k: Kind, X?: Tool) => entryRows[section(k, X).en] ?? [];
const span = (xs: string[]) => xs.length ? (xs.length === 1 ? xs[0] : `${xs[0]} – ${xs.at(-1)}`) : '';
const UI = 'a UI pass: the landing and what it lists, the tags against each task\'s own model, every control once, one generation where the entry starts one, every exit' + (ios ? '' : ' and system Back') + ' once';
const lead = `Draft ${DRAFT} [Req: ${REQ}]: every entry point (spec-casebook analysis.md pass 12, user 2026-11-26). The Design draws one way to
the Recent tasks (AI Magic › My Artwork, the primary entry, R-001), which keeps the full table. Every other way there gets
its own Section \`Entry › …\` with ${UI}; combinations, model variants, limits, failures and MUI stay with the primary entry.
Where the spec is silent on an entry the rows assert the primary behaviour with no question; only the real unknowns are
Open questions: the editor entries (${Q.EDITOR}) and Text to Image from the Photo / PIP Photo toolbars (${Q.PHOTO}). New: R-090 – R-099.
`;
const entryReqs = `## Entry points [Req: ${REQ}]
- R-090 [Rule 12: entry Mine › My Artwork; KB: KP-032; Req: ${REQ}] Through Mine › 「My Artwork」 the Recent pages open with the same cards, tasks and model tags as through AI Magic › My Artwork, every control on them responds as there with no error, and ‹ on a Recent page returns to My Artwork (as the primary entry).
- R-091 [Rule 12: entry Home ☰ › My Artwork; KB: KP-020; Req: ${REQ}] Through Home › ☰ › 「My Artwork」 the same holds, and leaving My Artwork returns to the ☰ page.
- R-092 [Rule 12: entry tool page › Recent tasks; KB: KP-058; Req: ${REQ}] The Image to Video, Text to Video and Text to Image pages opened from AI Magic open their own Recent tasks, listing every task of the tool with the same tags, every control responding with no error; ‹ returns to the tool page.
- R-093 [Rule 12: entry Editor › Global toolbar › AI Magic; KB: KP-107; Req: ${REQ}] The tools opened from the editor's Global toolbar › 「AI Magic」 show the same Recent tasks and tags with every control responding; a task generated there gets the tag of its chosen model; each ‹ goes back one step, ending in the editor with the project unchanged (assumption, ${Q.EDITOR}).
- R-094 [Rule 12: entry Editor › Photo toolbar › Tools › Text to Image; KB: KP-107; Req: ${REQ}] Text to Image opened from the Photo toolbar's 「Tools」 is the same tool: its items open with no error and show no model tag (R-022, Q-1); what happens to the selected photo is recorded (${Q.PHOTO}).
- R-095 [Rule 12: entry Editor › PIP Photo toolbar › Tools › AI Text to Image; KB: KP-107; Req: ${REQ}] 「AI Text to Image」 opened from the PIP Photo toolbar's 「Tools」 behaves as R-094 (${Q.PHOTO}).
- R-096 [Rule 12: entry Home shortcut tile; KB: KP-012; Req: ${REQ}] A Home shortcut tile of these tools (set on the CMS) opens the same tool page, Recent tasks and tags, every control responding; a task generated there gets its tag; ‹ returns to Home.
- R-097 [Rule 12: entry Home › AI-Powered Creation; KB: KP-012; Req: ${REQ}] A Home 「AI-Powered Creation」 card of these tools behaves as R-096.
- R-098 [Rule 12: entry Home › What's Trending template; Req: ${REQ}] An Image to Video or Text to Video template started from Home › 「What's Trending」 opens with no error and its task shows no model tag, as one started from the Template tab (R-020).
- R-099 [Rule 12: entry completion banner; KB: KP-059; Req: ${REQ}] When an Image to Video, Text to Video or Text to Image task finishes, a completion banner offers 「View」; its result page's ‹ lands on that tool's Recent tasks with the same tags, every control responding; ‹ there returns to the tool page.

`;
const qs = `- ${Q.EDITOR} Editor › Global toolbar › 「AI Magic」 › Image to Video / Text to Video / Text to Image (the product team's toolbar sheet, KP-107): do the tools opened there show the same Recent tasks (every task of the tool, not only this project's) and tags, does a task generated there get its tag, and where do the result page and each ‹ lead (does the result go into the project)? Assumption: the same list and tags, the tag of the chosen model; each ‹ goes back one step to the editor, project unchanged. R-093, ${qIds(Q.EDITOR)}.
- ${Q.PHOTO} The toolbar sheet also places Text to Image under Photo toolbar › 「Tools」 and, named 「AI Text to Image」, under PIP Photo toolbar › 「Tools」 (KP-107). Are they in the build, are they the same tool with the same Recent tasks, and what happens to the selected photo when a result is made (unchanged, replaced, a new clip)? Assumption: present, the same tool and Recent tasks, no model tag (Q-1); the result's effect on the photo is recorded for PM. R-094, R-095, ${qIds(Q.PHOTO)}.
`;
const tl = (X: Tool | 'all three', k: Kind, src: string) => `| ${X} | ${path(k, X === 'all three' ? 'Image to Video' : X).en} | ${src} | iOS, Android | ${section(k, X === 'all three' ? undefined : X).en} (${span(rowsOf(k, X === 'all three' ? undefined : X))}) |`;
const entryTable = `### Entry points
Found with \`node scripts/entry-points.ts pdr "<tool>"\` (toolbar sheet tab 「2026/11 Auto Reframe」, fetched 2026-11-26), the
Design boards, the approved table and \`knowledge.ts --grep entry / launcher / "AI Magic" / "My Artwork" / banner\`.
The sheet's brackets limit none of these places. The primary entry keeps the full table; each other entry has a UI pass
(pass 12): landing, tags, every control once, one generation where the entry starts one, every exit${ios ? '' : ' and system Back'} once.

| Tool | Entry (path) | Source | Platforms | Section (rows) |
|---|---|---|---|---|
| Image to Video | **primary**: AI Magic › My Artwork › 「Image to Video」 (Recent page), tasks generated from AI Magic › 「Image to Video」 | Design d-recent-video, arrow 1036-3983 | iOS, Android | Image to Video — model tag, Long model names, Cards without a model, Card states, Persistence, Appearance${ios ? '' : ', System Back'} (TC-001, TC-003 – TC-015, TC-027 – TC-029, TC-034 – TC-043${ios ? '' : ', TC-044 – TC-046'}); MUI walks this entry only |
| Text to Video | **primary**: AI Magic › My Artwork › 「Text to Video」, tasks generated from AI Magic › 「Text to Video」 | Design d-recent-video | iOS, Android | Text to Video — model tag, Cards without a model (TC-002, TC-016 – TC-026, TC-030, TC-039, TC-041) |
| Text to Image | **primary**: AI Magic › My Artwork › 「Text to Image」 | Design 1794:3221 (context), Q-1 | iOS, Android | Cards without a model (TC-033) |
| Cinematic Reel Creator, other features | AI Magic › My Artwork (only to check they show no tag) | Design d-model-info | iOS, Android | TC-031, TC-032; also opened in the Mine and ☰ landing rows |
| Image to Video, Text to Video templates | **primary**: Template tab | approved TC-029 / TC-030 (which named either place) | iOS, Android | TC-029, TC-030, TC-034 (now the Template tab only) |
${tl('all three', 'MINE', 'KP-032' + (ios ? '' : ' (iOS; presence recorded on Android)'))}
${tl('all three', 'MENU', 'KP-020' + (ios ? '' : ' (iOS; presence recorded on Android)'))}
${TOOLS.map(X => tl(X, 'TOOL', X === 'Text to Image' ? 'KP-058, Design 1794:3221 「Recent task（可收合）」' : 'KP-058' + (ios ? '' : ', KP-103'))).join('\n')}
${TOOLS.map(X => tl(X, 'EDITOR', 'toolbar sheet Global Toolbar › AI Magic, KP-107')).join('\n')}
${tl('Text to Image', 'PHOTO', 'toolbar sheet Photo Toolbar › Tools, KP-107')}
${tl('Text to Image', 'PIP', 'toolbar sheet PIP Photo Toolbar › Tools (named 「AI Text to Image」), KP-107')}
${TOOLS.map(X => tl(X, 'SHORTCUT', 'KP-010, KP-012 (CMS)')).join('\n')}
${TOOLS.map(X => tl(X, 'AIPC', 'KP-010, KP-013')).join('\n')}
| Image to Video, Text to Video templates | ${path('WT', 'Image to Video').en} | approved TC-029 / TC-030, KP-010 | iOS, Android | ${section('WT').en} (${span(rowsOf('WT'))}) |
${TOOLS.map(X => tl(X, 'BANNER', 'KP-059, KP-058 (other tools)')).join('\n')}

Not entries to this feature: the result page's other controls, Mine › Demo Videos (other tools' demos), notifications and
push (no source places these tools there; the banner rows record what shows), deep links (none known).
Checklist for the control rows: the primary rows' controls (TC-005, TC-018, TC-033, TC-035 – TC-037; \`control-trace.json\`).
`;
const approvedReq = readFileSync(join(TABLE, 'requirements.md'), 'utf8');
let req = approvedReq
  .replace(/(\nDraft 20261126-100000 \[Req: REQ-002\][\s\S]*?\n)\n/, `$1\n${lead}\n`)
  .replace(/\n## MUI\n/, `\n${entryReqs}## MUI\n`)
  .replace(/(\n## Open questions\n[\s\S]*?)(\n\n## Added)/, `$1\n${qs.trimEnd()}$2`)
  .replace(/\n### Request ledger coverage\n/, `\n${entryTable}\n### Request ledger coverage\n`)
  .trimEnd() + `\n| ${REQ} (table: every entry point; the primary keeps the full table, each other entry a UI pass, pass 12) | R-090 – R-099 (${span(pairs.map(p => p.en.ID))}) |\n`;
writeFileSync(join(DIR, 'requirements.md'), req);

// ---- update-plan.md ----
const perSection = Object.entries(entryRows).map(([s, v]) => `- ${s}: ${span(v)} (${v.length})`).join('\n');
writeFileSync(join(DIR, 'update-plan.md'), `# Update plan — Recent Task Model Info (${PLATFORM}): approved v2 → draft ${DRAFT}

Same spec set (2026-11-23). The change comes from the request ledger: ${REQ} (user, 2026-11-26) and pass 12 in
spec-casebook \`analysis.md\`, as changed the same day: 「for each entry, it should only check the UI, so click everything
once and make sure there's no errors for each button and options」. The primary entry keeps the full table; every other
entry gets ${UI}. (The first build of this draft copied the whole flow per entry, 313 / 334 rows; it is replaced.)

## Spec files
- Unchanged: Design Figma 1794-3210, Design Guideline Cards, PDRA Jira. New input: the toolbar sheet (KP-107, entry-points.ts).

## Requirement changes
| Requirement | Change | Before | After |
|---|---|---|---|
| R-090 – R-099 | new | — | one requirement per non-primary entry (\`## Entry points\`) |
| Open questions | new | Q-1 – Q-${Q0 - 1} | ${Q.EDITOR} (editor entries: task list per tool or project, where the result lands, the exits) and ${Q.PHOTO} (Photo / PIP Photo Text to Image: presence, the selected photo); the other entries assert the primary behaviour with no question (pass 12) |

## Case changes
- New (${pairs.length}), one Section per entry:
${perSection}
- Modified (3): TC-029, TC-030, TC-034 start from the Template tab only (TC-029 / TC-030 named 「What's Trending」 or the Template tab); the 「What's Trending」 start is its own Section.
- Removed: none. Unchanged: ${base.length - 3 + mui.length} (MUI included).

## Found by the analysis
- Entry points (pass 12): see \`### Entry points\` in requirements.md. Rows per Section: a landing row (presence; for the
  banner it generates once), a tag row (Image to Video and Text to Video: every card's tag against its own task's model,
  the tasks of TC-003 / TC-006 – TC-014 and TC-016 / TC-019 – TC-026, no model re-run), a control row (every control of the
  primary rows once: tag, 「View」, ‹, 「Manage」, checkbox, 「Select All」, 「Deselect All」, 「Cancel」; Text to Image: an item and
  its preview), a generation row where the entry opens the tool (editor, Photo / PIP Photo, Home tile, AI-Powered
  Creation: one task with 「Vidu Q2」 / 「Wan 2.7」, then where the result lands), and an exit row (every ‹${ios ? '' : ' and system Back'} once).
- Pass 9 (one-way state): none. The entries share the task list (cloud, R-040).

## How the rows run
- Each entry Section is a short segment after the primary rows (they make the tasks the tag rows read). Generations: one per
  tool for the editor, Home tile and AI-Powered Creation Sections, one each for Photo and PIP Photo, one per tool for the banner,
  two templates.
- A missing entry (landing row) is recorded and raised as a PM question at the phase wrap-up; that Section's other rows are Blocked.

## Not added (value check)
- Model variants, long names, text size, card states (error, NSFW, processing), persistence, appearance, templates and MUI per
  entry: they stay with the primary entry (pass 12: combinations, limits, failures, tiers, MUI and one-way states).
- TC-031 / TC-032 in tool entries: other features' Recent pages are reached only through My Artwork (the Mine and ☰ landing rows open Cinematic Reel Creator).
- Notifications, push and deep links to these tools: no spec, sheet or knowledge entry places them.

## PM-only rows
- None (no PM spec for this ticket).

## Questions for PM
${qs}
## Questions for you
- None.
`);
console.log(JSON.stringify({ platform: PLATFORM, draft: DRAFT, rows: all.length, new: pairs.length, ids: `${pairs[0].en.ID} – ${pairs.at(-1)!.en.ID}`, sections: Object.fromEntries(Object.entries(entryRows).map(([s, v]) => [s, v.length])) }));
