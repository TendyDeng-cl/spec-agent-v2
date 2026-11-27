// Draft 20261126-111500 (both platforms; the same file sits in ios/ and android/drafts/20261126-111500/) [Req: REQ-046]:
// analysis.md pass 12, 「Every entry point, every control once」 (user, 2026-11-26; rebuilt the same day when the rule
// changed from a full flow per entry to a UI pass). The primary entry (the Launcher big shortcut) keeps the approved
// table. Every other entry gets its own Section with a few rows that land through it, check every value the panel reads
// from its input (fps, resolution, length, Selected Length, price; timeline clips of 24 / 30 / 60 / 120 fps), press every
// control and option once, press Enhance once and check where the result lands, and press each exit (and Android Back):
//   Entry › AI Magic tab › AI Enhance › AI Video Enhance                    (Design ds-entry-points, R-002)
//   Entry › Editor › main-track video › Enhance › Video Enhance             (Design Timeline_default, toolbar sheet KP-107)
//   Entry › Editor › PIP video › Enhance › Video Enhance                    (toolbar sheet KP-107 only: Q-29)
// Rebuilds draft.csv, requirements.md, spec.json, update-plan.md and zh-map.json (the Chinese of the new rows, for
// zh-fill.ts) in this folder from the approved table (ios v10 / android v14) and copies the traces, phases.json and the
// Chinese copy of the approved rows (knowledge.md: node scripts/knowledge.ts pdr/video-enhance <platform> --for analysis --out <draft>/knowledge.md).
// REQ-047 (same day): one row per entry, the primary included, timing the playhead's thumbnail on a long video (R-215, Q-34).
// Run: node library/pdr/video-enhance/<platform>/drafts/20261126-111500/build-draft.ts
import { readFileSync, writeFileSync, copyFileSync, existsSync } from 'node:fs';
import { dirname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseCsv, toCsv } from '../../../../../../scripts/lib/csv.ts';
import { readZhCopy } from '../../../../../../scripts/lib/zh.ts';

const DRAFT = '20261126-111500';
const DIR = dirname(fileURLToPath(import.meta.url));
const PLATFORM = basename(dirname(dirname(DIR))) as 'android' | 'ios';
const TABLE = dirname(dirname(DIR));
const ios = PLATFORM === 'ios';
const manifest = JSON.parse(readFileSync(join(TABLE, 'manifest.json'), 'utf8'));
const REQ = 'REQ-046';
const USER = '「for each entry, it should only check the UI, so click everything once and make sure there\'s no errors for each button and options (eg. currently there\'s a problem with getting fps value from timeline imported video in video enhance)」';

// ---- approved table ----
const grid = parseCsv(readFileSync(join(TABLE, 'cases.csv'), 'utf8').replace(/^﻿/, ''));
const H = grid[0];
type Row = Record<string, string>;
const approved: Row[] = grid.slice(1).filter(r => r.length > 1).map(r => Object.fromEntries(H.map((h, i) => [h, r[i] ?? ''])));
const byId = new Map(approved.map(r => [r.ID, r]));
const zhAll = readZhCopy(join(TABLE, 'cases.zh-Hant.csv'), approved);
let next = Math.max(...approved.map(r => +r.ID.slice(3))) + 1;
const tierLine = byId.get('TC-160')!.Precondition.split('\n')[0].replace(/^1\. /, '');
const zhTierLine = (zhAll['TC-160']?.Precondition ?? '').split('\n')[0].replace(/^1\. /, '');
const tier = ios ? 'Pro+' : 'Pro';

// ---- entries ----
type Key = 'magic' | 'main' | 'pip' | 'primary';
interface Entry { key: Key; section: string; zhSection: string; label: string; zhLabel: string; req: string }
const ENTRIES: Entry[] = [
  { key: 'magic', section: 'Entry › AI Magic tab › AI Enhance › AI Video Enhance', zhSection: '入口 › AI Magic 分頁 › AI Enhance › AI Video Enhance',
    label: 'AI Magic tab', zhLabel: 'AI Magic 分頁', req: 'R-210' },
  { key: 'main', section: 'Entry › Editor › main-track video › Enhance › Video Enhance', zhSection: '入口 › 編輯器 › 主軌影片 › Enhance › Video Enhance',
    label: 'main-track clip toolbar', zhLabel: '主軌片段工具列', req: 'R-211' },
  { key: 'pip', section: 'Entry › Editor › PIP video › Enhance › Video Enhance', zhSection: '入口 › 編輯器 › 子母畫面（PIP）影片 › Enhance › Video Enhance',
    label: 'PIP Video toolbar', zhLabel: 'PIP Video 工具列', req: 'R-212' },
];
const [MAGIC_E, MAIN_E, PIP_E] = ENTRIES;
const zs = (l: string) => /^[A-Za-z]/.test(l) ? ` ${l}` : l;   // a space before a Latin label after 從

// ---- text helpers: every line is [English, Chinese] ----
type L = [string, string];
const steps = (ls: L[], i: 0 | 1) => ls.length === 1 ? ls[0][i] : ls.map((l, n) => `${n + 1}. ${l[i]}`).join('\n');
const lines = (ls: L[], i: 0 | 1) => ls.map(l => l[i]).join('\n');
interface New { row: Row; zh: Row; entry: Key; kind: string }
const out: New[] = [];
const add = (e: Entry, kind: string, p: { pre: L[]; act: L[]; exp: L[]; pri: string; refs: string; notes: L; why: L; req?: string }) => {
  const id = `TC-${next++}`;
  out.push({ entry: e.key, kind,
    row: { ID: id, Section: e.section, Precondition: steps(p.pre, 0), Action: steps(p.act, 0), 'Expected Result': lines(p.exp, 0),
      Priority: p.pri, 'Spec Ref': p.refs, Notes: p.notes[0], Change: 'new', 'Change Reason': p.req ? `${p.req}: ${p.why[0]}` : `${REQ} (analysis pass 12, UI pass): ${p.why[0]}` },
    zh: { ID: id, Section: e.zhSection, Precondition: steps(p.pre, 1), Action: steps(p.act, 1), 'Expected Result': lines(p.exp, 1),
      Notes: p.notes[1], 'Change Reason': p.req ? `${p.req}：${p.why[1]}` : `${REQ}（分析第 12 輪，UI 檢查）：${p.why[1]}` } });
  return id;
};
const editor = (e: Entry) => e.key !== 'magic';
const ECL: L = ios ? [' On iOS the prices wait on the iOS ECL rates (Q-26): a different number is checked against the iOS ECL table before it is filed.', 'iOS 的價格還在等 iOS ECL 費率（Q-26）：數字不同時要先對照 iOS ECL 表再決定是否開單。']
  : ['', ''];
const CHECKLIST: L = ['Checklist: the panel, Recent task and Result controls of control-trace.json (pass 11) and the controls the primary rows press (TC-031, TC-035, TC-036, TC-061 – TC-063, TC-070, TC-087, TC-042, TC-214, TC-215, TC-037, TC-351, TC-140, TC-144, TC-150 – TC-154).',
  '檢查清單：control-trace.json（第 11 輪）裡面板、Recent task 和 Result 的控制項，以及主要入口各列按到的控制項（TC-031、TC-035、TC-036、TC-061 – TC-063、TC-070、TC-087、TC-042、TC-214、TC-215、TC-037、TC-351、TC-140、TC-144、TC-150 – TC-154）。'];
const NO_ERR: L = ['Every step responds at once, with no error message, crash, freeze, empty screen or wrong value', '每個步驟都立刻有反應，沒有錯誤訊息、閃退、卡住、空白畫面或錯誤數值'];

// the project an editor entry needs, and how to open the panel on a video from each entry
const project = (e: Entry, videos: string, zhVideos: string): L => e.key === 'main'
  ? [`A new project whose main track holds ${videos}, each as its own clip (added from the album, untrimmed)`, `新專案的主軌上放著${zhVideos}，每支各是一個片段（從相簿加入、不裁切）`]
  : [`A new project with the 00:30 video ve-0030-1080p30 on the main track and ${videos} over it one after another, each as its own overlay (PIP) clip (untrimmed, default size and place)`,
     `新專案的主軌放一支 00:30 影片 ve-0030-1080p30，${zhVideos}依序以子母畫面（PIP）片段疊在上面，每支各是一個片段（不裁切，預設大小和位置）`];
const openOn = (e: Entry, v: string, zv: string): L[] => e.key === 'magic'
  ? [['Tap 「AI Magic」 in the bottom bar', '點底部列的「AI Magic」'], ['Tap the 「AI Video Enhance」 card under 「AI Enhance」', '點「AI Enhance」下的「AI Video Enhance」卡片'],
     ['Tap 「Try It Now」 on the Demo page', '在 Demo 頁點「Try It Now」'], [`Tap ${v} in Add Media`, `在 Add Media 點${zv}`]]
  : [[`Tap ${v} on the ${e.key === 'main' ? 'main' : 'overlay'} track`, `點${e.key === 'main' ? '主軌' : '子母畫面軌'}上的${zv}`],
     [`Tap 「Enhance」 › 「AI Video Enhance」 in the ${e.key === 'main' ? 'clip' : 'PIP Video'} toolbar`, `點${e.key === 'main' ? '片段' : ' PIP Video '}工具列的「Enhance」 › 「AI Video Enhance」`]];
const backTo = (e: Entry): L => e.key === 'magic' ? ['Tap ‹ to Add Media', '點 ‹ 回到 Add Media'] : ['Tap ‹ to the editor', '點 ‹ 回到編輯器'];
const reopen = (e: Entry, v: string, zv: string): L[] => e.key === 'magic' ? [[`Tap ${v}`, `點${zv}`]]
  : [[`Tap ${v}`, `點${zv}`], ['Tap 「Enhance」 › 「AI Video Enhance」 in the toolbar', '點工具列的「Enhance」 › 「AI Video Enhance」']];
const entryLine = (e: Entry): L => e.key === 'magic'
  ? ['Entry: only the AI Magic tab (bottom bar 「AI Magic」 › 「AI Enhance」 › the 「AI Video Enhance」 card), never the Launcher big shortcut', '入口：只從 AI Magic 分頁進入（底部列「AI Magic」 › 「AI Enhance」 › 「AI Video Enhance」卡片），不從 Launcher 大捷徑進入']
  : e.key === 'main'
    ? ['Entry: only the editor\'s clip toolbar on a main-track clip (「Enhance」 › 「AI Video Enhance」; 「Video Enhance」 in the toolbar sheet)', '入口：只從編輯器主軌片段的片段工具列進入（「Enhance」 › 「AI Video Enhance」；工具列表上叫「Video Enhance」）']
    : ['Entry: only the editor\'s PIP Video toolbar on an overlay clip (「Enhance」 › 「AI Video Enhance」; 「Video Enhance」 in the toolbar sheet)', '入口：只從編輯器子母畫面片段的 PIP Video 工具列進入（「Enhance」 › 「AI Video Enhance」；工具列表上叫「Video Enhance」）'];
const q29: L = ['', ''];
const pipNote = (e: Entry): L => e.key === 'pip' ? [' Q-29: with no tool on the PIP Video toolbar this row is recorded Blocked --as question.', 'Q-29：PIP Video 工具列上沒有這個工具時，這一列記為 Blocked --as question。'] : q29;
const nn = (...ls: L[]): L => [ls.map(l => l[0]).filter(Boolean).join(' ').replace(/^ /, ''), ls.map(l => l[1]).join('')];

// ---- rows ----
const ids: Record<string, string> = {};
for (const e of ENTRIES) {
  const k = e.key;
  // landing (AI Magic) / presence (PIP)
  if (k === 'magic') ids.magicLand = add(e, 'landing', {
    pre: [[tierLine, zhTierLine], ['「Don’t show again」 on the Demo page not saved yet (run before TC-014)', 'Demo 頁的「Don’t show again」還沒儲存（在 TC-014 之前跑）'], ['The 00:30 video ve-0030-1080p30 in the album', '相簿裡有 00:30 的影片 ve-0030-1080p30']],
    act: [['Tap 「AI Magic」 in the bottom bar', '點底部列的「AI Magic」'], ['Tap the 「AI Video Enhance」 card under 「AI Enhance」', '點「AI Enhance」下的「AI Video Enhance」卡片'],
      ['Tap ‹ on the Demo page', '點 Demo 頁上的 ‹'], ['Tap the 「AI Video Enhance」 card again', '再點一次「AI Video Enhance」卡片'], ['Tap 「Try It Now」', '點「Try It Now」'],
      ['Tap ‹ on Add Media', '點 Add Media 上的 ‹'], ['Tap 「Try It Now」 again', '再點一次「Try It Now」'], ['Tap ve-0030-1080p30', '點 ve-0030-1080p30']],
    exp: [['Step 2: the Demo page opens with ‹, the title 「AI Video Enhance」, a sample video that plays, a description, 「Don’t show again」 and 「Try It Now」', '步驟 2：開啟 Demo 頁，上面有 ‹、標題「AI Video Enhance」、會播放的範例影片、說明文字、「Don’t show again」和「Try It Now」'],
      ['Step 3: the AI Magic tab is back (the entry page), not the Launcher', '步驟 3：回到 AI Magic 分頁（進入的那一頁），不是 Launcher'],
      ['Step 5: Add Media opens with only the 「Video」 tab', '步驟 5：開啟 Add Media，只有「Video」分頁'], ['Step 6: the Demo page is back', '步驟 6：回到 Demo 頁'],
      ['Step 8: the panel opens with ve-0030-1080p30 in the Preview at once (no Next button)', '步驟 8：立刻開啟面板，預覽區是 ve-0030-1080p30（沒有 Next 按鈕）'], NO_ERR],
    pri: 'P1', refs: 'R-210, R-002, R-006, R-008, R-011, R-012, R-013, R-014',
    notes: nn([`UI pass of the AI Magic entry [Req: ${REQ}; analysis pass 12]: its landing and the Demo page and Add Media exits.`, `AI Magic 入口的 UI 檢查 [Req: ${REQ}；分析第 12 輪]：進入點，以及 Demo 頁和 Add Media 的離開方式。`],
      ['The Demo ‹ returns to the entry page (PM A1); Add Media ‹ follows the Q-9 assumption (the previous page).', 'Demo 頁的 ‹ 回到「進入的那一頁」（PM A1）；Add Media 的 ‹ 依 Q-9 的假設回到上一頁。'], CHECKLIST),
    why: ['the AI Magic tab\'s landing, Demo page and Add Media', 'AI Magic 分頁的進入點、Demo 頁和 Add Media'] });
  if (k === 'pip') ids.pipLand = add(e, 'presence', {
    pre: [[tierLine, zhTierLine], project(e, 'the 01:30 video ve-0130-1080p30', ' 01:30 的影片 ve-0130-1080p30 '), ['「Don’t show again」 on the Demo page not saved yet (run before TC-014)', 'Demo 頁的「Don’t show again」還沒儲存（在 TC-014 之前跑）']],
    act: [['Tap the overlay clip', '點選子母畫面片段'], ['Look at the PIP Video toolbar and open its 「Enhance」 group', '查看 PIP Video 工具列，打開它的「Enhance」群組'], ['Tap 「AI Video Enhance」 in it', '點裡面的「AI Video Enhance」']],
    exp: [['Step 2: the PIP Video toolbar has 「Enhance」 and the Video Enhance tool inside it (its name and place recorded)', '步驟 2：PIP Video 工具列有「Enhance」，裡面有 Video Enhance 工具（記下它的名稱和位置）'],
      ['Step 3: the AI Video Enhance panel opens directly with the overlay clip in the Preview (「00:00/01:30」), not the main-track clip', '步驟 3：直接開啟 AI Video Enhance 面板，預覽區是子母畫面片段（「00:00/01:30」），不是主軌片段'],
      ['Step 3: no Demo page and no Add Media appear, although the Demo page has not been turned off', '步驟 3：雖然 Demo 頁還沒關掉，也不會出現 Demo 頁或 Add Media']],
    pri: 'P1', refs: 'R-212, R-003',
    notes: [`Q-29 [Req: ${REQ}]: the product team's toolbar sheet (KP-107, tab 「2026/11 Auto Reframe」) places Video Enhance under PIP Video › Enhance as well as Video › Enhance; the Design and the PM draw only the main-track clip toolbar. With no tool on the PIP Video toolbar the row is recorded Fail (question) for PM with what the toolbar offers, and the rest of this Section Blocked --as question. The landing is asserted as on the main-track entry (TC-003).`,
      `Q-29 [Req: ${REQ}]：產品團隊的工具列表（KP-107，「2026/11 Auto Reframe」分頁）除了 Video › Enhance，也把 Video Enhance 放在 PIP Video › Enhance 下；Design 和 PM 只畫了主軌片段工具列。PIP Video 工具列上沒有這個工具時，這一列記為 Fail (question) 給 PM 並記下工具列有哪些項目，這個區塊其餘的列記為 Blocked --as question。進入後的行為比照主軌入口（TC-003）判定。`],
    why: ['the toolbar sheet places Video Enhance on the PIP Video toolbar, which no spec draws (Q-29)', '工具列表把 Video Enhance 放在 PIP Video 工具列上，但沒有任何規格畫出來（Q-29）'] });

  // values read from the input (R-214)
  const vids: { v: string; zv: string; label: string; f: string; r: string; t: string; price: string }[] = [
    { v: 'the 24 fps 1080p video (the one TC-052 uses)', zv: ' 24 fps、1080p 的影片（TC-052 用的那支）', label: '24fps · 1080p', f: '30fps', r: '1080p', t: '', price: '' },
    { v: 've-0030-1080p30 (00:30, 30 fps, 1080p)', zv: ' ve-0030-1080p30（00:30、30 fps、1080p）', label: '30fps · 1080p', f: '30fps', r: '1080p', t: '00:30', price: '60' },
    { v: 've-0130-1080p60 (01:30, 60 fps, 1080p)', zv: ' ve-0130-1080p60（01:30、60 fps、1080p）', label: '60fps · 1080p', f: '60fps', r: '1080p', t: '01:30', price: '180' },
    { v: 'the 120 fps 1080p video (the one TC-054 uses)', zv: ' 120 fps、1080p 的影片（TC-054 用的那支）', label: '120fps · 1080p', f: '120fps', r: '1080p', t: '', price: '' },
    { v: 've-0030-720p30 (00:30, 30 fps, 720p)', zv: ' ve-0030-720p30（00:30、30 fps、720p）', label: '30fps · 720p', f: '30fps', r: '720p', t: '00:30', price: '30' },
  ];
  const vAct: L[] = [];
  const vExp: L[] = [];
  vids.forEach((x, i) => {
    if (i === 0) vAct.push(...openOn(e, x.v.replace(/ \(.*$/, ''), x.zv.replace(/（.*$/, '')));
    else vAct.push(backTo(e), ...reopen(e, x.v.replace(/ \(.*$/, ''), x.zv.replace(/（.*$/, '')));
    const s = vAct.length;
    vAct.push(['Read the Preview label, the selected fps and Resolution chips, the Preview time, 「Selected Length」 and the CTA', '讀預覽區標籤、選取的 fps 和 Resolution、預覽區時間、「Selected Length」和 CTA']);
    vExp.push([`Step ${s + 1} (${x.v.replace(/ \(.*$/, '')}): the Preview label reads 「${x.label}」 and 「${x.f}」 and 「${x.r}」 are selected`, `步驟 ${s + 1}（${x.zv.replace(/（.*$/, '').trim()}）：預覽區標籤顯示「${x.label}」，選取的是「${x.f}」和「${x.r}」`]);
    vExp.push(x.t
      ? [`Step ${s + 1}: the Preview time reads 「00:00/${x.t}」, 「Selected Length」 「${x.t}」 and the CTA 「Enhance ◆ ${x.price}」`, `步驟 ${s + 1}：預覽區時間顯示「00:00/${x.t}」，「Selected Length」顯示「${x.t}」，CTA 顯示「Enhance ◆ ${x.price}」`]
      : [`Step ${s + 1}: the Preview time and 「Selected Length」 equal the video's own length (ffprobe) and the CTA is its seconds rounded up × 2`, `步驟 ${s + 1}：預覽區時間和「Selected Length」等於影片本身的長度（ffprobe），CTA 是秒數無條件進位 × 2`]);
  });
  if (editor(e)) vExp.unshift(['Step 2: the panel opens directly with the tapped clip, with no Demo page and no Add Media', '步驟 2：直接開啟面板，帶入點選的片段，沒有 Demo 頁也沒有 Add Media']);
  vExp.push(['Every value matches the video\'s own fps, resolution and length (ffprobe), never another clip\'s or a default', '每個數值都和影片本身的 fps、解析度和長度（ffprobe）一致，不會是其他片段的值或預設值']);
  ids[`${k}Values`] = add(e, 'values', {
    pre: [entryLine(e), [tierLine, zhTierLine],
      editor(e) ? project(e, 'the 24 fps 1080p video (TC-052), ve-0030-1080p30, ve-0130-1080p60, the 120 fps 1080p video (TC-054) and ve-0030-720p30', ' 24 fps、1080p 的影片（TC-052）、ve-0030-1080p30、ve-0130-1080p60、120 fps、1080p 的影片（TC-054）和 ve-0030-720p30 ')
        : ['The 24 fps 1080p video (TC-052), ve-0030-1080p30, ve-0130-1080p60, the 120 fps 1080p video (TC-054) and ve-0030-720p30 in the album', '相簿裡有 24 fps、1080p 的影片（TC-052）、ve-0030-1080p30、ve-0130-1080p60、120 fps、1080p 的影片（TC-054）和 ve-0030-720p30'],
      ['Each video\'s fps, resolution and length read with ffprobe beforehand', '先用 ffprobe 讀出每支影片的 fps、解析度和長度']],
    act: vAct, exp: vExp, pri: 'P1', refs: `${e.req}, R-214, R-021, R-043, R-044, R-030, R-060, R-063`,
    notes: nn([`UI pass [Req: ${REQ}; analysis pass 12]: every value the panel reads from the ${e.label}'s input, at 24, 30, 60 and 120 fps and at 720p and 1080p. R-214: the user named the fps read from a timeline-imported video as a known problem (2026-11-26). Lookup: Design 預設值規則 (fps 1–30 → 30fps, 31–60 → 60fps, 61 and over → 120fps). Rates: Standard 1080p 2/s at every fps, 720p 1/s (R-063).`,
      `UI 檢查 [Req: ${REQ}；分析第 12 輪]：面板從${e.zhLabel}帶入的每個數值，涵蓋 24、30、60、120 fps 和 720p、1080p。R-214：使用者指出目前從時間軸匯入的影片讀到的 fps 有問題（2026-11-26）。對照：Design 預設值規則（fps 1–30 → 30fps、31–60 → 60fps、61 以上 → 120fps）。費率：Standard 1080p 每種 fps 都是每秒 2 點，720p 每秒 1 點（R-063）。`], ECL, pipNote(e)),
    why: [`the values the panel reads from the ${e.label}'s input (R-214)`, `面板從${e.zhLabel}帶入的數值（R-214）`] });

  // Q-33: the trimmed part of a timeline clip
  if (editor(e)) {
    const pip = k === 'pip';
    ids[`${k}Range`] = add(e, 'range', {
      pre: [[tierLine, zhTierLine], pip
        ? ['A new project with the 00:30 video ve-0030-1080p30 on the main track and the 12:30 video ve-1230-1080p30 (its time burned into every frame) over it as an overlay (PIP) clip, trimmed in the editor to its 02:00–07:00 part (a 05:00 clip)', '新專案的主軌放一支 00:30 影片 ve-0030-1080p30，上面疊著 12:30 的影片 ve-1230-1080p30（每個畫面都燒有時間）作為子母畫面（PIP）片段，並在編輯器裡裁成它 02:00–07:00 的部分（05:00 的片段）']
        : ['A new project whose main track holds the 12:30 video ve-1230-1080p30 (its time burned into every frame) as its only clip, trimmed in the editor to its 02:00–07:00 part (a 05:00 clip)', '新專案的主軌只有一個片段：12:30 的影片 ve-1230-1080p30（每個畫面都燒有時間），並在編輯器裡裁成它 02:00–07:00 的部分（05:00 的片段）']],
      act: [...openOn(e, 'the clip', '該片段'), ['Read the Preview time and 「Selected Length」', '看預覽區的時間和「Selected Length」'],
        ['Drag the playhead to the left trim handle and read the burned-in time of the frame', '把播放頭拖到左側裁切把手，讀該畫面燒入的時間'], ['Drag the playhead to the right trim handle and read the burned-in time of the frame', '把播放頭拖到右側裁切把手，讀該畫面燒入的時間']],
      exp: [['Step 2: the panel opens with no Demo page and no Add Media (the clip is 05:00, under the 8:00 limit of R-058)', '步驟 2：直接開啟面板，沒有 Demo 頁也沒有 Add Media（片段長 05:00，低於 R-058 的 8:00 上限）'],
        ['Step 3: the panel holds the clip as it is on the timeline: the Preview reads 「00:00/05:00」 and 「Selected Length」 reads 「05:00」', '步驟 3：面板裡的片段和時間軸上的一樣：預覽區顯示「00:00/05:00」，「Selected Length」顯示「05:00」'],
        ['Step 4: the frame at the left handle reads 02:00 (the clip\'s in point)', '步驟 4：左側把手所在畫面顯示 02:00（片段的入點）'], ['Step 5: the frame at the right handle reads 07:00 (the clip\'s out point)', '步驟 5：右側把手所在畫面顯示 07:00（片段的出點）']],
      pri: 'P2', refs: `${e.req}, R-214, R-003, R-058, R-030`,
      notes: nn([`Q-33 [Req: ${REQ}]: no source says whether the panel opened from the editor takes the clip's trimmed part or the whole source file, nor whether a source over 8:00 trimmed under 8:00 opens. The clip's own part is the assumption (PM pm-timeline: the panel opens with that clip); the whole 12:30 source, a 「08:00」 selection or a refusal is recorded as Fail (question) for PM, not a defect.`,
        `Q-33 [Req: ${REQ}]：沒有任何來源說明從編輯器開啟的面板是帶入片段裁切後的部分還是整支原始檔，也沒說超過 8:00 的原始檔裁到 8:00 以內能不能開啟。假設是片段本身的部分（PM pm-timeline：面板帶入該片段）；若是整支 12:30 原始檔、選取「08:00」或無法開啟，記為 Fail (question) 給 PM，不算缺陷。`], pipNote(e)),
      why: [`the ${e.label} brings in a timeline clip, whose trimmed range no source settles (Q-33)`, `從${e.zhLabel}帶入的是時間軸片段，它的裁切範圍沒有來源說明（Q-33）`] });
  }

  const pre30: L[] = [entryLine(e), [tierLine, zhTierLine],
    editor(e) ? project(e, 'the 00:30 video ve-0030-1080p30 (its time burned into every frame)', ' 00:30 的影片 ve-0030-1080p30（每個畫面都燒有時間）')
      : ['The 00:30 video ve-0030-1080p30 (its time burned into every frame) in the album', '相簿裡有 00:30 的影片 ve-0030-1080p30（每個畫面都燒有時間）'],
    ['Panel opened on it through this entry, the defaults kept (「Standard」, 「Natural」, 「30fps」, 「1080p」, 「Enhance ◆ 60」)', '已從這個入口在它上面開啟面板，維持預設值（「Standard」、「Natural」、「30fps」、「1080p」，「Enhance ◆ 60」）']];

  // every chip and bubble once
  const chips: [string, string, string][] = [   // tap, price after, note
    ['「Professional」', '120', 'Professional 1080p 30fps, 4/s'], ['「Standard」', '60', ''], ['「Sharp」', '60', 'style does not change the price'], ['「Natural」', '60', ''],
    ['「60fps」', '60', 'Standard 1080p, 2/s at every fps'], ['「120fps」', '60', ''], ['「30fps」', '60', ''], ['「720p」', '30', '1/s'], ['「4K」', '90', '3/s'], ['「1080p」', '60', ''],
  ];
  const cAct: L[] = [['Tap ⓘ next to 「Selected Length」', '點「Selected Length」旁的 ⓘ'], ['Tap an empty spot of the panel', '點面板的空白處'], ['Tap ⓘ next to 「Mode」', '點「Mode」旁的 ⓘ'], ['Tap an empty spot of the panel', '點面板的空白處'],
    ['Tap ⓘ next to 「Enhancement style」', '點「Enhancement style」旁的 ⓘ'], ['Tap an empty spot of the panel', '點面板的空白處'], ...chips.map(([c]) => [`Tap ${c}`, `點${c}`] as L)];
  const cExp: L[] = [['Step 1: the bubble 「Max 8 minutes. Drag to choose which part.」 shows', '步驟 1：顯示泡泡「Max 8 minutes. Drag to choose which part.」'],
    ['Step 3: the bubble shows 「Standard: Great quality · up to 8 min」 and 「Professional: Maximum detail · up to 2:30」', '步驟 3：泡泡顯示「Standard: Great quality · up to 8 min」和「Professional: Maximum detail · up to 2:30」'],
    ['Step 5: the bubble shows 「Natural: Lighter enhancement with fewer artifacts, for a more realistic look」 and 「Sharp: Moderate enhancement for a sharp, clear image」', '步驟 5：泡泡顯示「Natural: Lighter enhancement with fewer artifacts, for a more realistic look」和「Sharp: Moderate enhancement for a sharp, clear image」'],
    ['Steps 2, 4 and 6: the bubble closes', '步驟 2、4、6：泡泡關閉'],
    ...chips.map(([c, p, why], i) => [`Step ${i + 7}: ${c} is selected, the other chip of its group is not, and the CTA reads 「Enhance ◆ ${p}」${why ? ` (${why})` : ''}`,
      `步驟 ${i + 7}：${c}被選取，同組的其他選項沒有被選取，CTA 顯示「Enhance ◆ ${p}」${why ? `（${why.replace('style does not change the price', '風格不影響價格').replace('at every fps', '每種 fps 都一樣')}）` : ''}`] as L),
    ['After every chip tap 「Charge X credits per second」 shows the rate of the price', '每次點選項後，「Charge X credits per second」都顯示對應價格的費率'], NO_ERR];
  ids[`${k}Chips`] = add(e, 'chips', { pre: pre30, act: cAct, exp: cExp, pri: 'P2', refs: `${e.req}, R-022, R-024, R-025, R-026, R-046, R-051, R-062, R-063, R-065`,
    notes: nn([`UI pass [Req: ${REQ}; analysis pass 12]: every ⓘ and every Mode, Enhancement style, fps and Resolution value pressed once from the ${e.label}, no combinations (they stay with the primary entry's Setting combinations).`,
      `UI 檢查 [Req: ${REQ}；分析第 12 輪]：從${e.zhLabel}進入後，每個 ⓘ 和 Mode、Enhancement style、fps、Resolution 的每個選項各按一次，不做組合（組合留在主要入口的設定組合列）。`], ECL, CHECKLIST, pipNote(e)),
    why: [`every ⓘ and setting value pressed once from the ${e.label}`, `從${e.zhLabel}進入後每個 ⓘ 和設定值各按一次`] });

  // strip, player, top bar and Recent task once
  ids[`${k}Strip`] = add(e, 'strip', { pre: pre30, act: [
      ['Drag the right › handle left to about 00:20', '把右側 › 把手向左拖到約 00:20'], ['Drag the left ‹ handle right to about 00:05', '把左側 ‹ 把手向右拖到約 00:05'], ['Drag the ◀▶ playhead knob to about 00:10', '把 ◀▶ 播放頭圓鈕拖到約 00:10'],
      ['Tap play under the Preview', '點預覽區下方的播放'], ['After about 3 s tap the same button (pause)', '約 3 秒後再點同一個按鈕（暫停）'], ['Tap the full-screen icon', '點全螢幕圖示'], ['Close the full-screen preview', '關閉全螢幕預覽'],
      ['Tap the credit pill in the top bar', '點頂端列的點數膠囊'], ['Tap ‹ on the page that opened', '在開啟的頁面上點 ‹'], ['Tap the Recent task icon in the top bar', '點頂端列的 Recent task 圖示'], ['Tap 「Manage」', '點「Manage」'],
      ['Go back to Recent task', '回到 Recent task'], ['Tap ‹ on Recent task', '點 Recent task 上的 ‹']],
    exp: [['Step 1: the Preview follows the right handle and the selection reads 00:00–00:20 (「Selected Length」 「00:20」, 「Enhance ◆ 40」)', '步驟 1：預覽區畫面跟著右側把手移動，選取範圍是 00:00–00:20（「Selected Length」「00:20」，「Enhance ◆ 40」）'],
      ['Step 2: the Preview follows the left handle and the selection reads 00:05–00:20 (「00:15」, 「Enhance ◆ 30」)', '步驟 2：預覽區畫面跟著左側把手移動，選取範圍是 00:05–00:20（「00:15」，「Enhance ◆ 30」）'],
      ['Step 3: the playhead bubble, the Preview time and the frame follow the knob, which stays between the handles', '步驟 3：播放頭泡泡、預覽區時間和畫面都跟著圓鈕移動，圓鈕停留在兩個把手之間'],
      ['Step 4: playback starts from the playhead (about 00:10) and the time advances', '步驟 4：從播放頭位置（約 00:10）開始播放，時間往前走'], ['Step 5: playback pauses and the frame stays', '步驟 5：暫停播放，畫面停住'],
      ['Steps 6–7: the full-screen preview opens and closes back to the panel with the selection 00:05–00:20 kept', '步驟 6–7：全螢幕預覽開啟後關閉，回到面板，選取範圍仍是 00:05–00:20'],
      ['Steps 8–9: 「My Credits」 opens with the pill\'s balance, and ‹ returns to the panel unchanged', '步驟 8–9：開啟「My Credits」，顯示和膠囊相同的餘額，點 ‹ 回到面板，內容不變'],
      ['Step 10: Recent task opens with the title 「AI Video Enhance」, ‹, ⌂ and the notice with 「Manage」', '步驟 10：開啟 Recent task，有標題「AI Video Enhance」、‹、⌂ 和附「Manage」的提示'],
      ['Step 11: a page to manage the stored tasks opens (what it offers is recorded, Q-8)', '步驟 11：開啟管理已存任務的頁面（記下它提供的功能，Q-8）'],
      ['Step 13: the panel is back with the selection 00:05–00:20 and the defaults', '步驟 13：回到面板，選取範圍仍是 00:05–00:20，設定仍是預設值'], NO_ERR],
    pri: 'P2', refs: `${e.req}, R-031, R-061, R-193, R-027, R-200, R-020, R-110, R-113, R-116, R-114, R-073`,
    notes: nn([`UI pass [Req: ${REQ}; analysis pass 12]: both trim handles, the playhead, play, pause, full screen, the credit pill, Recent task and 「Manage」 pressed once from the ${e.label}. Q-15 (pill) and Q-8 (Manage) as in TC-351 and TC-144.`,
      `UI 檢查 [Req: ${REQ}；分析第 12 輪]：從${e.zhLabel}進入後，兩個裁切把手、播放頭、播放、暫停、全螢幕、點數膠囊、Recent task 和「Manage」各按一次。Q-15（膠囊）和 Q-8（Manage）比照 TC-351 和 TC-144。`], ECL, CHECKLIST, pipNote(e)),
    why: [`the strip, player, top bar and Recent task pressed once from the ${e.label}`, `從${e.zhLabel}進入後縮圖列、播放器、頂端列和 Recent task 各按一次`] });

  // Enhance once: the dialogs, the result's controls and where the result lands
  const land: L[] = k === 'magic'
    ? [['Step 7: the card turns completed with 「View」', '步驟 7：卡片變成已完成，出現「View」']]
    : [[`Step 7: when the task completes the ${k === 'pip' ? 'overlay clip is replaced by the result on its own overlay track, at the same start, length, size and place, and the main-track clip is unchanged' : 'clip on the main track is replaced by the result at the same position'}`,
        `步驟 7：任務完成後，${k === 'pip' ? '子母畫面片段在它自己的子母畫面軌上被結果取代，開始時間、長度、大小和位置都不變，主軌片段沒有改變' : '主軌上的片段在同一個位置被結果取代'}`],
       ['Step 7: the app shows 「Applied Video Enhance」', '步驟 7：App 顯示「Applied Video Enhance」']];
  ids[`${k}Enhance`] = add(e, 'enhance', {
    pre: [entryLine(e), [`${tierLine} with at least 8 credits`, `${zhTierLine}，至少有 8 點`],
      editor(e) ? project(e, 'the 3.2 s video ve-000320-720p30', ' 3.2 秒的影片 ve-000320-720p30 ') : ['The 3.2 s video ve-000320-720p30 in the album', '相簿裡有 3.2 秒的影片 ve-000320-720p30'],
      ['Panel opened on it through this entry, the defaults kept (「Enhance ◆ 4」)', '已從這個入口在它上面開啟面板，維持預設值（「Enhance ◆ 4」）'], ['The balance noted', '先記下餘額']],
    act: [['Tap 「Enhance ◆ 4」', '點「Enhance ◆ 4」'], ['Tap 「Cancel」 on the processing dialog', '在處理中視窗點「Cancel」'], ['Tap 「Leave」', '點「Leave」'], ['Tap 「Enhance ◆ 4」 again', '再點一次「Enhance ◆ 4」'],
      ['Tap 「Cancel」 on the processing dialog', '在處理中視窗點「Cancel」'], ['Tap 「Keep Uploading」', '點「Keep Uploading」'],
      k === 'magic' ? ['Wait in Recent task until the task completes', '在 Recent task 等任務完成'] : ['Tap ‹ on Recent task and ‹ on the panel, and stay in the editor until the task completes', '在 Recent task 點 ‹，再在面板點 ‹，留在編輯器裡等任務完成'],
      k === 'magic' ? ['Tap 「View」 on its card', '點卡片上的「View」'] : ['Open the panel on the clip again, tap the Recent task icon and tap 「View」 on the task\'s card', '再在片段上開啟面板，點 Recent task 圖示，再點該任務卡片上的「View」'],
      ['Tap 「Original」', '點「Original」'], ['Tap 「Result」', '點「Result」'], ['Tap 「Save Result」', '點「Save Result」'], ['Tap 「Add to Timeline」', '點「Add to Timeline」'],
      ['Go back to the Result of the same task (Recent task › 「View」)', '回到同一個任務的 Result（Recent task › 「View」）'], ['Tap 「Enhance More」', '點「Enhance More」']],
    exp: [['Step 1: the processing dialog shows 「Video uploading...」 with a moving progress ring and 「Cancel」', '步驟 1：顯示處理中視窗「Video uploading...」，進度環持續轉動，並有「Cancel」'],
      ['Steps 2 and 5: 「Sure You Want to Leave?」 shows with 「Leave」 and 「Keep Uploading」', '步驟 2 和 5：顯示「Sure You Want to Leave?」，有「Leave」和「Keep Uploading」'],
      ['Step 3: the panel is back with its CTA enabled and the balance is the noted one − 4 (not restored)', '步驟 3：回到面板，CTA 可以按，餘額是記下的餘額 − 4（不退還）'],
      ['Step 6: the leave dialog closes and the upload goes on to Recent task with a processing card', '步驟 6：離開視窗關閉，繼續上傳，進入 Recent task 並出現處理中的卡片'], ...land,
      ['Step 8: the Result opens and plays', '步驟 8：開啟 Result 並可播放'], ['Steps 9–10: 「Original」 shows the source and 「Result」 the enhanced video', '步驟 9–10：「Original」顯示原始影片，「Result」顯示增強後的影片'],
      ['Step 11: 「Saved to your device」 shows and the album has a new 3.2 s, 1280 × 720, 30 fps video', '步驟 11：顯示「Saved to your device」，相簿多一支 3.2 秒、1280 × 720、30 fps 的影片'],
      k === 'magic' ? ['Step 12: a new project opens with the enhanced video on its timeline', '步驟 12：開啟新專案，時間軸上是增強後的影片'] : ['Step 12: the original project opens (no new project is made)', '步驟 12：開啟原本的專案（不會建立新專案）'],
      ['Step 14: Add Media opens for the next video', '步驟 14：開啟 Add Media，可以選下一支影片'],
      ['The balance at the end is the noted one − 8 (two uploads)', '最後餘額是記下的餘額 − 8（上傳兩次）'], NO_ERR],
    pri: 'P1', refs: `${e.req}, R-080, R-086, R-087, R-088, R-089, R-111, R-112, R-120, R-121, R-122, ${k === 'magic' ? 'R-123' : 'R-134'}, R-124${k === 'main' ? ', R-131' : k === 'pip' ? ', R-213, R-131' : ''}`,
    notes: nn([`UI pass [Req: ${REQ}; analysis pass 12]: Enhance pressed once from the ${e.label} (twice to press both 「Leave」 and 「Keep Uploading」), every Result control once, and where the result lands.`,
      `UI 檢查 [Req: ${REQ}；分析第 12 輪]：從${e.zhLabel}進入後按一次 Enhance（為了「Leave」和「Keep Uploading」都按到，共按兩次），Result 的每個控制項各按一次，並確認結果落在哪裡。`],
      k === 'main' ? ['Landing: R-131 (PM-only, Q-11) as in TC-162; 「Add to Timeline」 R-134; 「Enhance More」 opens Add Media as from the Launcher (R-124).', '落點：R-131（只有 PM，Q-11），比照 TC-162；「Add to Timeline」依 R-134；「Enhance More」和從 Launcher 進入時一樣開啟 Add Media（R-124）。']
        : k === 'pip' ? ['Landing: Q-30, PM draws the paste-back only for a main-track clip, so replacing the overlay clip on its own track is the assumption and a different landing is a PM question; 「Enhance More」 opens Add Media as from the Launcher (R-124).', '落點：Q-30，PM 只畫了主軌片段的貼回，所以假設是在子母畫面片段自己的軌道上取代它，落點不同時是要問 PM 的問題；「Enhance More」和從 Launcher 進入時一樣開啟 Add Media（R-124）。']
        : ['', ''], ['Spends 8 credits.', '會花 8 點。'], CHECKLIST, pipNote(e)),
    why: [`Enhance pressed once from the ${e.label}, the Result's controls and where the result lands`, `從${e.zhLabel}進入後按一次 Enhance，按 Result 的控制項並確認結果落點`] });

  // every exit once (and Android system Back)
  const back = (screen: L, to: L): L => [`System Back on ${screen[0]}: ${to[0]}`, `在${screen[1]}按系統返回鍵：${to[1]}`];
  const xAct: L[] = [['Tap ‹ on the panel', '點面板上的 ‹'], editor(e) ? ['Open the panel on the same clip again through this entry', '再從這個入口在同一個片段上開啟面板'] : ['Tap the same video in Add Media', '在 Add Media 點同一支影片'],
    ['Open Recent task from the panel', '從面板開啟 Recent task'], ['Tap 「View」 on the completed card', '點已完成卡片上的「View」'], ['Tap ‹ on the Result', '點 Result 上的 ‹'], ['Tap ⌂ on Recent task', '點 Recent task 上的 ⌂']];
  const xExp: L[] = [[`Step 1: ${editor(e) ? 'the editor is back with the project and the clip unchanged' : 'Add Media is shown again'}`, `步驟 1：${editor(e) ? '回到編輯器，專案和片段都沒有改變' : '回到 Add Media'}`],
    ['Step 5: Recent task is shown again', '步驟 5：回到 Recent task'], ['Step 6: the Launcher opens', '步驟 6：開啟 Launcher']];
  if (!ios) {
    xAct.push(['Open the panel again through this entry', '再從這個入口開啟面板'], ['Tap ⓘ next to 「Selected Length」 and press system Back', '點「Selected Length」旁的 ⓘ，再按系統返回鍵'],
      ['Open the full-screen preview and press system Back', '開啟全螢幕預覽，再按系統返回鍵'], ['Open Recent task from the panel and press system Back', '從面板開啟 Recent task，再按系統返回鍵'],
      ['Open Recent task, tap 「View」 on the completed card and press system Back', '開啟 Recent task，點已完成卡片上的「View」，再按系統返回鍵'], ['Press system Back on Recent task', '在 Recent task 按系統返回鍵'],
      ['Press system Back on the panel', '在面板按系統返回鍵']);
    if (k === 'magic') xAct.push(['Press system Back on Add Media', '在 Add Media 按系統返回鍵'], ['Press system Back on the Demo page', '在 Demo 頁按系統返回鍵']);
    const s = 7;
    xExp.push([`Step ${s + 1}: the bubble closes and the panel stays`, `步驟 ${s + 1}：泡泡關閉，留在面板`], [`Step ${s + 2}: the full-screen preview closes back to the panel`, `步驟 ${s + 2}：全螢幕預覽關閉，回到面板`],
      [`Step ${s + 3}: the panel is shown again (same as ‹)`, `步驟 ${s + 3}：回到面板（和 ‹ 相同）`], [`Step ${s + 4}: Recent task is shown again (same as ‹)`, `步驟 ${s + 4}：回到 Recent task（和 ‹ 相同）`],
      [`Step ${s + 5}: the panel is shown again (same as ‹)`, `步驟 ${s + 5}：回到面板（和 ‹ 相同）`],
      [`Step ${s + 6}: ${editor(e) ? 'the editor is back with the project unchanged (same as ‹)' : 'Add Media is shown again (same as ‹)'}`, `步驟 ${s + 6}：${editor(e) ? '回到編輯器，專案沒有改變（和 ‹ 相同）' : '回到 Add Media（和 ‹ 相同）'}`]);
    if (k === 'magic') xExp.push([`Step ${s + 7}: the Demo page is shown again (same as ‹)`, `步驟 ${s + 7}：回到 Demo 頁（和 ‹ 相同）`], [`Step ${s + 8}: the AI Magic tab is shown again (same as ‹), Add Media does not open`, `步驟 ${s + 8}：回到 AI Magic 分頁（和 ‹ 相同），不會開啟 Add Media`]);
  }
  xExp.push(NO_ERR);
  ids[`${k}Exits`] = add(e, 'exits', {
    pre: [entryLine(e), [tierLine, zhTierLine], [`A completed task in Recent task (the ${e.label} Enhance row)`, `Recent task 裡有一個已完成的任務（${e.zhLabel}的 Enhance 列）`],
      ['Panel opened through this entry, nothing running', '已從這個入口開啟面板，沒有任務在進行']],
    act: xAct, exp: xExp, pri: 'P2', refs: `${e.req}, ${editor(e) ? 'R-133' : 'R-028'}, R-125, R-115${ios ? '' : `, R-190, R-022, R-027, R-114${k === 'magic' ? ', R-011, R-014' : ''}`}`,
    notes: nn([`UI pass [Req: ${REQ}; analysis pass 12]: every exit${ios ? '' : ' and system Back'} pressed once from the ${e.label}${k === 'magic' ? ' (the Demo ‹ and Add Media ‹ are in the landing row)' : ''}.`,
      `UI 檢查 [Req: ${REQ}；分析第 12 輪]：從${e.zhLabel}進入後，每個離開方式${ios ? '' : '和系統返回鍵'}各按一次${k === 'magic' ? '（Demo 頁和 Add Media 的 ‹ 在進入點那一列）' : ''}。`],
      [`⌂ on Recent task opens the Launcher, as from the Launcher entry (R-115, Design ds-alt-exception)${editor(e) ? '; from the editor it leaves the project' : ''}.`, `Recent task 的 ⌂ 和從 Launcher 進入時一樣開啟 Launcher（R-115，Design ds-alt-exception）${editor(e) ? '；從編輯器進入時會離開專案' : ''}。`],
      ios ? ['', ''] : ['Q-20: the Back on a bubble is assumed to close it as any tap does.', 'Q-20：泡泡上的返回鍵假設和「點任何地方」一樣會關閉泡泡。'], CHECKLIST, pipNote(e)),
    why: [`every exit${ios ? '' : ' and system Back'} pressed once from the ${e.label}`, `從${e.zhLabel}進入後每個離開方式${ios ? '' : '和系統返回鍵'}各按一次`] });
}

// ---- REQ-047: how fast the playhead's thumbnail shows after the panel opens on a long video, per entry ----
const REQ47 = 'REQ-047';
const USER47 = '「when a long video is imported, it needs a little bit of time to produce the thumbnail on the playhead, while if the page is opened from timeline, it is immediately shown」';
const PRIMARY: Entry = { key: 'primary', section: 'Add Media', zhSection: zhAll['TC-020']?.Section || 'Add Media', label: 'Launcher big shortcut', zhLabel: 'Launcher 大捷徑', req: 'R-001' };
const timingIds: Partial<Record<Key, string>> = {};
for (const e of [PRIMARY, MAGIC_E, MAIN_E, PIP_E]) {
  const k = e.key, ed = editor(e) && k !== 'primary';
  const wait = (v: string, zv: string): { act: L[] } => ({ act: [
    [`Tap ${v} (the tap that opens the panel)`, `點${zv}（這一下會開啟面板）`],
    ['Without touching the screen, wait until the Preview frame at the playhead and the thumbnail strip show', '不碰畫面，等到播放頭所在的預覽畫面和縮圖列都出現'],
    ['Right after they show, drag the ◀▶ playhead knob to about 03:00 in one move', '畫面一出現就立刻把 ◀▶ 播放頭圓鈕一次拖到約 03:00']] });
  const act: L[] = [];
  if (k === 'primary') act.push(['Tap the big shortcut 「AI Video Enhance」 on the Launcher', '點 Launcher 上的大捷徑「AI Video Enhance」'], ['Tap 「Try It Now」 on the Demo page (skip it once 「Don’t show again」 is saved)', '在 Demo 頁點「Try It Now」（已儲存「Don’t show again」時略過）']);
  if (k === 'magic') act.push(['Tap 「AI Magic」 in the bottom bar', '點底部列的「AI Magic」'], ['Tap the 「AI Video Enhance」 card under 「AI Enhance」', '點「AI Enhance」下的「AI Video Enhance」卡片'], ['Tap 「Try It Now」 on the Demo page (skip it once 「Don’t show again」 is saved)', '在 Demo 頁點「Try It Now」（已儲存「Don’t show again」時略過）']);
  if (ed) act.push([`Tap the 08:00 clip on the ${k === 'main' ? 'main' : 'overlay'} track`, `點${k === 'main' ? '主軌' : '子母畫面軌'}上的 08:00 片段`], ['Open the toolbar\'s 「Enhance」 group', '打開工具列的「Enhance」群組']);
  act.push(['Start a screen recording', '開始螢幕錄影']);
  const first = act.length + 1;
  act.push(...(ed ? wait('「AI Video Enhance」', '「AI Video Enhance」') : wait('ve-0800-1080p30 in Add Media', ' Add Media 裡的 ve-0800-1080p30')).act);
  let second = 0;
  if (!ed) { act.push(['Tap ‹ to Add Media', '點 ‹ 回到 Add Media']); second = act.length + 1; act.push(...wait('ve-1230-1080p30', ' ve-1230-1080p30').act); }
  act.push(['Stop the recording', '停止錄影']);
  const block = (n: number, v: string, zv: string): L[] => [
    [`Step ${n} – ${n + 1} (${v}): the time from the tap to the Preview frame at the playhead showing the video's own first frame (burned-in 00:00) is read from the recording and recorded`, `步驟 ${n} – ${n + 1}（${zv}）：從錄影讀出從點下去到播放頭位置的預覽畫面顯示影片自己的第一個畫面（燒入的 00:00）所花的時間並記下`],
    [`Step ${n} – ${n + 1}: the time until the thumbnail strip is filled is recorded`, `步驟 ${n} – ${n + 1}：記下縮圖列填滿所花的時間`],
    k === 'main' ? [`Step ${n} – ${n + 1}: the frame shows at once, with no blank, black or stale thumbnail (this time is the reference for the other entries' rows)`, `步驟 ${n} – ${n + 1}：畫面立刻出現，沒有空白、全黑或舊的縮圖（這個時間是其他入口各列的比較基準）`]
      : [`Step ${n} – ${n + 1}: the frame shows as quickly as when the panel is opened from the main-track clip toolbar, with no blank, black or stale thumbnail meanwhile (a loading state, if any, is recorded)`, `步驟 ${n} – ${n + 1}：畫面出現的速度和從主軌片段工具列開啟面板時一樣快，等待時沒有空白、全黑或舊的縮圖（若有載入中的狀態要記下）`],
    [`Step ${n + 2}: the Preview frame follows the knob during the drag (its burned-in time equals the bubble's), or how far and how long it lags is recorded`, `步驟 ${n + 2}：拖曳時預覽畫面跟著圓鈕移動（燒入時間和泡泡一致），否則記下落後多少、多久`]];
  const exp: L[] = [...block(first, 've-0800-1080p30', 've-0800-1080p30'), ...(second ? block(second, 've-1230-1080p30', 've-1230-1080p30') : [])];
  if (!ed) exp.push(['A wait clearly longer than the main-track editor row\'s for the same video is recorded as Fail (question) for PM (Q-34), with both times', '若等待時間明顯比主軌編輯器那一列同一支影片的時間長，記為 Fail (question) 給 PM（Q-34），並附上兩邊的時間']);
  timingIds[k] = add(e, 'timing', {
    pre: [...(k === 'primary' ? [['Entry: only the Launcher big shortcut 「AI Video Enhance」 (primary)', '入口：只從 Launcher 大捷徑「AI Video Enhance」進入（主要入口）'] as L] : [entryLine(e)]), [tierLine, zhTierLine],
      ed ? project(e, 'the 08:00 video ve-0800-1080p30 (its time burned into every frame)', ' 08:00 的影片 ve-0800-1080p30（每個畫面都燒有時間）')
        : ['The 08:00 video ve-0800-1080p30 and the 12:30 video ve-1230-1080p30 (their time burned into every frame) in the album', '相簿裡有 08:00 的影片 ve-0800-1080p30 和 12:30 的影片 ve-1230-1080p30（每個畫面都燒有時間）'],
      ['Nothing else running in PowerDirector', 'PowerDirector 沒有其他工作在進行']],
    act, exp, pri: 'P2', refs: `R-215, ${e.req}, R-021, R-192, R-193`,
    notes: [`Evidence: screen recording from the tap that opens the panel until the playhead's thumbnail and the strip show, and through the drag (analysis pass 4, *During a gesture*; run-android.md, *Judging a drag*). [Req: ${REQ47}] the user, 2026-11-26: ${USER47}. Q-34: no source gives an allowed delay or a loading state, so the timeline's quick showing is the assumption and the times are compared across entries on the same ve-0800-1080p30${ed ? ' (a clip over 8:00 does not open from the editor, R-058, so the 12:30 video is used only from Add Media)' : ' (the 12:30 video too, which the editor entries cannot open, R-058)'}.`,
      `證據：從點下去開啟面板到播放頭縮圖和縮圖列出現、再到拖曳結束的螢幕錄影（分析第 4 輪「手勢進行中」；run-android.md「判斷拖曳」）。[Req: ${REQ47}] 使用者（2026-11-26）：${USER47}。Q-34：沒有任何來源給出允許的延遲或載入中狀態，所以假設和時間軸一樣立刻顯示，並用同一支 ve-0800-1080p30 比較各入口的時間${ed ? '（超過 8:00 的片段無法從編輯器開啟，R-058，所以 12:30 影片只在 Add Media 使用）' : '（也用 12:30 影片，編輯器入口無法開啟它，R-058）'}。`],
    why: [`time to the playhead's thumbnail on a long video from the ${e.label}`, `從${zs(e.zhLabel)}開啟長影片時，播放頭縮圖出現的時間`], req: REQ47 });
}
const anchorOf: Record<string, string> = { magic: ids.magicLand, main: ids.mainValues, pip: ids.pipLand };
const ordered: New[] = [];
for (const n of out.filter(n => n.kind !== 'timing')) {
  ordered.push(n);
  for (const [k, a] of Object.entries(anchorOf)) if (n.row.ID === a) ordered.push(out.find(x => x.row.ID === timingIds[k as Key])!);
}
const primaryNew = out.find(x => x.row.ID === timingIds.primary)!;

// ---- draft.csv ----
const DH = [...H, 'Change', 'Change Reason'];
const muiAt = approved.findIndex(r => r.Section === 'MUI');
const finalRows: Row[] = [
  ...approved.slice(0, muiAt).flatMap(r => [{ ...r, Change: 'unchanged', 'Change Reason': '' }, ...(r.ID === 'TC-020' ? [primaryNew.row] : [])]),
  ...ordered.map(n => n.row),
  ...approved.slice(muiAt).map(r => ({ ...r, Change: 'unchanged', 'Change Reason': '' })),
];
writeFileSync(join(DIR, 'draft.csv'), toCsv([DH, ...finalRows.map(r => DH.map(h => r[h] ?? ''))]));
writeFileSync(join(DIR, 'zh-map.json'), JSON.stringify(Object.fromEntries(out.map(n => [n.row.ID, { zh: n.zh, missing: [], src: '' }])), null, 1));

// ---- requirements.md ----
const idsOf = (k: Key) => out.filter(n => n.entry === k && n.kind !== 'timing').map(n => n.row.ID);
const range = (k: Key) => { const a = idsOf(k); return `${a[0]} – ${a[a.length - 1]}`; };
let req = readFileSync(join(TABLE, 'requirements.md'), 'utf8');
const ins = (anchor: string | RegExp, text: string, where: 'before' | 'after') => {
  const m = typeof anchor === 'string' ? req.indexOf(anchor) : req.search(anchor);
  if (m < 0) throw new Error(`${PLATFORM}: anchor not found: ${anchor}`);
  if (where === 'before') req = req.slice(0, m) + text + req.slice(m);
  else { const end = req.indexOf('\n', m) + 1; req = req.slice(0, end) + text + req.slice(end); }
};
ins('\n## Entry points\n', `\nDraft ${DRAFT} [Req: ${REQ}]: analysis.md pass 12 (user, 2026-11-26). AI Video Enhance has four entries
(\`### Entry points\`): the Launcher big shortcut (primary: the approved rows, the full table), the AI Magic tab, the
main-track clip toolbar and the PIP Video toolbar (toolbar sheet KP-107 only). Each other entry gets a UI pass in its
own Section: the landing, every value the panel reads from its input, every control and option pressed once (no
combinations), Enhance once with where the result lands, and every exit${ios ? '' : ' and system Back'}. The user, on the rule (2026-11-26):
${USER}. New: R-210 – R-214, Q-29, Q-30, Q-33; rows ${range('magic')} (AI Magic), ${range('main')} (main-track), ${range('pip')} (PIP).
The same draft, ${'REQ-047'} (user, 2026-11-26): ${USER47}. New: R-215, Q-34; one row per entry
(${timingIds.primary} primary, ${timingIds.magic} AI Magic, ${timingIds.main} main-track, ${timingIds.pip} PIP), each in its entry's Section.
`, 'before');
ins(/^- R-005 .*$/m, `- R-210 [DS:ds-entry-points Launcher_AI Magic; DS:ds-routing 「Launcher / AI Magic → Demo page」; PM:pm-draft-logic A0 / A1; Rule: analysis pass 12; Req: ${REQ}] From the AI Magic entry (R-002) the Demo page, Add Media, the panel, Enhance, Recent task and the Result respond to every control as from the Launcher; the Demo page's ‹ (and Android system Back) return to the entry page, the AI Magic tab (PM A1), and 「Add to Timeline」 opens a new project (R-123).
- R-211 [DS:ds-entry-points Timeline_default; DS:ds-routing 「Timeline 入口，無 Demo page」; PM:pm-timeline §4.1; KB: KP-107 (Video Toolbar › Enhance › Video Enhance); Rule: analysis pass 12; Req: ${REQ}] From the main-track clip toolbar the panel opens with the selected clip (R-003) and every panel, Recent task and Result control responds as from the Launcher; a finished task replaces the clip (R-131), ‹ returns to the editor (R-133) and 「Add to Timeline」 returns to the original project (R-134).
- R-212 [KB: KP-107 (toolbar sheet tab 「2026/11 Auto Reframe」: PIP Video Toolbar › Enhance › Video Enhance); Rule: analysis pass 12; Req: ${REQ}] A selected overlay (PIP) video clip's PIP Video toolbar has 「Enhance」 › the Video Enhance tool, which opens the panel directly with that overlay clip (no Demo page, no Add Media), and every control responds as on the main-track entry (R-211). Not drawn by the Design or the PM (Q-29).
- R-213 [PM:pm-timeline arrow 397-1921 「Applied Video Enhance」 (drawn for a main-track clip); Req: ${REQ}] After a task started from an overlay clip succeeds, the result replaces that overlay clip on its own overlay track, at the same start and length and with the same size and place, and the main-track clip is unchanged (assumption, Q-30).
- R-214 [DS:ds-ai-video-enhance 預設值規則 and Preview label; Req: ${REQ}, user 2026-11-26: ${USER}] From every entry the panel reads its values from the input itself: the Preview label shows the video's own fps and resolution, the fps and Resolution chips follow the 預設值規則 lookup for that fps and resolution (R-043, R-044), and the Preview time, 「Selected Length」 and the price follow the video's own length (R-030, R-060). A clip imported to the timeline (main track or overlay) is checked at 24, 30, 60 and 120 fps, because the fps read from a timeline-imported video is a known problem.
- R-215 [DS:ds-ai-video-enhance Preview and Length (the playhead and the thumbnail strip); Req: REQ-047, user 2026-11-26: ${USER47}] Opening the panel on a long video (08:00, and 12:30 where the entry allows it) shows the Preview frame at the playhead and the thumbnail strip as quickly from Add Media (Launcher, AI Magic tab) as from the editor, where they show at once, with no blank, black or stale thumbnail meanwhile; dragging the playhead right after opening, the frame follows it. No source states an allowed delay or a loading state (Q-34).
`, 'after');
ins('\n## Answered questions', `- Q-29 PIP entry (REQ-046): the product team's toolbar sheet (KP-107) places Video Enhance under PIP Video › Enhance as well as Video › Enhance, but the Design and the PM draw only the main-track clip toolbar. Is the tool meant to be on the PIP Video toolbar, and does it act on the overlay clip? Assumption: yes, with the main-track entry's behaviour. ${ids.pipLand} records whether the tool is there; absent, it is a Fail (question) for PM. R-212 (${ids.pipLand}).
- Q-30 Where an overlay clip's result lands (REQ-046): PM draws the paste-back (「Applied Video Enhance」) only for a main-track clip. Assumption: the result replaces the overlay clip on its own track at the same start, length, size and place, and the main-track clip is unchanged. R-213 (${ids.pipEnhance}).
- Q-33 Which part of a timeline clip the panel takes (REQ-046): no source says whether a panel opened from the editor holds the clip's trimmed part or the whole source file, nor whether a source over 8:00 trimmed under 8:00 on the timeline opens. Assumption: the clip's own part (PM pm-timeline: the panel opens with that clip), so a 05:00 part of a 12:30 source opens with 「00:00/05:00」 and its in and out points at the handles. R-211, R-212, R-214, R-058 (${ids.mainRange}, ${ids.pipRange}).
- Q-34 Thumbnail delay on a long video (REQ-047): the user saw that a long video picked in Add Media takes a while to show the playhead's thumbnail, while from the timeline it shows at once; no source gives an allowed delay or says whether a loading state should show meanwhile. Should the thumbnail show at once from every entry, and is a loading state expected while it does not? Assumption: it shows as quickly as from the timeline, with no blank or stale thumbnail. Each row records the time per entry on the same ve-0800-1080p30 (and ve-1230-1080p30 from Add Media); an Add Media wait clearly longer than the timeline's is a Fail (question) for PM. R-215 (${timingIds.primary}, ${timingIds.magic}, ${timingIds.main}, ${timingIds.pip}).
`, 'before');
ins('### Build checks', `### Entry points
AI Video Enhance is reached from four places (analysis pass 12, user 2026-11-26) [Req: ${REQ}]. Found with
\`node scripts/entry-points.ts pdr "Video Enhance"\` (sheet tab 「2026/11 Auto Reframe」, fetched 2026-11-26: Video Toolbar ›
Enhance › Video Enhance · PIP Video Toolbar › Enhance › Video Enhance; no platform bracket), the Design's
ds-entry-points / ds-routing boards, PM pm-timeline and the knowledge (no other entry: no Launcher small shortcut, banner,
notification or deep link to it in the spec, the knowledge or the approved table). The primary entry keeps the full
table; each other entry gets a UI pass (landing, input values, every control once, Enhance once, every exit).
- **Launcher › big shortcut 「AI Video Enhance」 › Demo page › Add Media** — Design ds-main-flow / ds-entry-points (R-001) — iOS, Android — **primary**: the approved Sections (Entry points TC-001, Demo page through Failure and refund${ios ? '' : ', System back'}).
- **AI Magic tab › 「AI Enhance」 › 「AI Video Enhance」 card › Demo page › Add Media** — Design ds-entry-points, ds-routing (R-002, R-210) — iOS, Android — Section 「${MAGIC_E.section}」 ${range('magic')}; TC-002 and TC-014 (its 「Don’t show again」 check) also reach it.
- **Editor › select a main-track video › 「Enhance」 › 「AI Video Enhance」** (sheet: Video Toolbar › Enhance › Video Enhance) — Design ds-entry-points Timeline_default, PM pm-timeline, KP-107 (R-003, R-211, R-214) — iOS, Android — Section 「${MAIN_E.section}」 ${range('main')}; the approved TC-003, TC-004 and the Timeline entry rows (TC-160 – TC-165, TC-276, TC-318, TC-319${ios ? '' : ', System back TC-213'}) also reach it.
- **Editor › select an overlay (PIP) video › 「Enhance」 › 「AI Video Enhance」** (sheet: PIP Video Toolbar › Enhance › Video Enhance) — KP-107 only, not in the Design or PM (R-212, R-213, R-214, Q-29) — iOS, Android — Section 「${PIP_E.section}」 ${range('pip')}; presence ${ids.pipLand}.

`, 'before');
ins(/^\| REQ-045 .*$/m, `| ${REQ} (table: every entry point; rule changed the same day — the primary entry keeps the full table, every other entry gets a UI pass: landing, input values incl. timeline fps, every control once, Enhance once, every exit) | R-210, R-211, R-212, R-213, R-214; Q-29, Q-30, Q-33; \`### Entry points\`; rows ${range('magic')}, ${range('main')}, ${range('pip')} |\n`, 'after');
ins(/^\| REQ-046 .*$/m, `| REQ-047 (table: time to the playhead's thumbnail on a long video, per entry; the user saw Add Media slower than the timeline) | R-215; Q-34; rows ${timingIds.primary}, ${timingIds.magic}, ${timingIds.main}, ${timingIds.pip} |\n`, 'after');
writeFileSync(join(DIR, 'requirements.md'), req);

// ---- spec.json, traces, phases, Chinese copy of the approved rows ----
const prevDraft = join(TABLE, 'drafts', manifest.draft);
const spec = JSON.parse(readFileSync(join(prevDraft, 'spec.json'), 'utf8'));
writeFileSync(join(DIR, 'spec.json'), JSON.stringify({ ...spec, draft: DRAFT, created_at: '2026-11-26T03:15:00.000Z', based_on_version: manifest.version }, null, 2) + '\n');
for (const f of ['annotation-trace.json', 'control-trace.json']) if (existsSync(join(prevDraft, f))) copyFileSync(join(prevDraft, f), join(DIR, f));
const phases = JSON.parse(readFileSync(join(prevDraft, 'phases.json'), 'utf8'));
writeFileSync(join(DIR, 'phases.json'), JSON.stringify({ ...phases, draft: DRAFT }, null, 2) + '\n');
for (const [from, to] of [['cases.zh-Hant.csv', 'draft.zh-Hant.csv'], ['cases.zh-Hant.prints.json', 'draft.zh-Hant.prints.json']])
  if (existsSync(join(TABLE, from)) && !existsSync(join(DIR, to))) copyFileSync(join(TABLE, from), join(DIR, to));

// ---- update-plan.md ----
const KIND: Record<string, string> = { landing: 'landing: Demo page, Add Media and their ‹', presence: 'presence of the tool on the PIP Video toolbar and its landing (Q-29)',
  values: 'every value read from the input: 24 / 30 / 60 / 120 fps, 720p and 1080p, length, Selected Length, price (R-214)', range: 'a clip trimmed on the timeline (Q-33)',
  chips: 'every ⓘ and every Mode, style, fps and Resolution value once', strip: 'both handles, the playhead, play / pause, full screen, credit pill, Recent task, 「Manage」',
  timing: 'time to the playhead\'s thumbnail and the strip on a long video, and the playhead drag right after (REQ-047, Q-34)', enhance: 'Enhance once: Cancel › Leave, Cancel › Keep Uploading, where the result lands, every Result control', exits: `every exit${ios ? '' : ' and system Back'}, ⌂` };
const listRows = (k: Key) => ordered.filter(n => n.entry === k).map(n => `  - ${n.row.ID}: ${KIND[n.kind]}`).join('\n');
writeFileSync(join(DIR, 'update-plan.md'), `# Update plan — Video Enhance / ${PLATFORM}: approved v${manifest.version} → draft ${DRAFT}

Based on approved v${manifest.version} (${approved.length} rows). Same spec set (2026-11-03, Figma only); the change is a new standing
rule from the user [${REQ}], first 「for any features that have multiple entry points, each entry needs to be tested
completely and cannot assume they both lead to the same thing and have the same behavior」, then, the same day, narrowed
for the other entries: ${USER} (analysis.md pass 12). This draft was first built with a full-flow copy of every row per
entry (548 iOS / 579 Android rows); it is rebuilt in place as a UI pass per entry, and those copies are gone.
Then REQ-047 (user, 2026-11-26): ${USER47}: one timing row per entry, the primary one included.

## Spec files
- Unchanged: Figma only (spec set 2026-11-03). New or changed: none. No longer supplied: none.
- New input: the product team's toolbar sheet (KP-107, tab 「2026/11 Auto Reframe」, fetched 2026-11-26): Video Enhance under
  Video Toolbar › Enhance and PIP Video Toolbar › Enhance, no platform bracket.

## Requirement changes
| Requirement | Change | Before | After |
|---|---|---|---|
| R-210 | new | — | The AI Magic entry: every control responds as from the Launcher; its Demo ‹ returns to the AI Magic tab |
| R-211 | new | — | The main-track clip toolbar entry: panel with the clip, every control as from the Launcher, result replaces the clip |
| R-212 | new | — | The PIP Video toolbar has Enhance › Video Enhance acting on the overlay clip (sheet only, Q-29) |
| R-213 | new | — | An overlay clip's result replaces it on its own track; the main track is unchanged (assumption, Q-30) |
| R-215 | new | — | A long video's playhead thumbnail and strip show as quickly from Add Media as from the editor; the frame follows a drag right after opening (REQ-047, Q-34) |
| R-214 | new | — | The panel's fps, resolution, length and price come from the input itself on every entry; timeline clips checked at 24 / 30 / 60 / 120 fps (user: the fps read from a timeline-imported video is a known problem) |
| Q-29, Q-30, Q-33 | new questions | — | PIP entry presence; overlay result landing; the timeline clip's trimmed range (the first build's Q-31 and Q-32 dropped: entry rows assert the primary behaviour, pass 12) |
| \`### Entry points\` | new | — | One line per entry with its source, platforms and Section |

## Case changes
- New (${out.length}): ${out.length - 1} in three Sections after the approved Sections and before MUI:
- 「${MAGIC_E.section}」 (${idsOf('magic').length}):
${listRows('magic')}
- 「${MAIN_E.section}」 (${idsOf('main').length}):
${listRows('main')}
- 「${PIP_E.section}」 (${idsOf('pip').length}):
${listRows('pip')}
- 「Add Media」 (primary entry, 1), right after TC-020: ${timingIds.primary}: ${KIND.timing}
- Modified (0) · Removed (0) · Unchanged: ${approved.length}

## Found by the analysis
- Pass 12: four entries; the PIP entry is only in the toolbar sheet (Q-29). Checklist for the UI pass: the panel,
  Recent task and Result controls of control-trace.json and the controls the primary rows press (named in each row's Notes).
- Pass 9 order: the AI Magic landing row, TC-003 and ${ids.pipLand} need the Demo page still on: run them before TC-014.

## Not added (value check)
- Full-flow copies of the primary rows per entry (the first build of this draft): replaced by the UI pass (user, 2026-11-26).
  Combinations, limits, failures, tiers, MUI and one-way states stay with the primary entry (pass 12).

## PM-only rows
- ${ids.pipLand} and the PIP Section rest on the toolbar sheet (no spec frame); the editor Enhance rows' paste-back is PM-only (R-131, Q-11).

## Questions for PM
- Q-29 Is Video Enhance meant to be on the PIP Video toolbar (sheet) though no spec draws it? ${ids.pipLand}.
- Q-30 Where does an overlay clip's result land? ${ids.pipEnhance}.
- Q-33 Does the panel take a timeline clip's trimmed part or the whole source? ${ids.mainRange}, ${ids.pipRange}.
- Q-34 Should the playhead's thumbnail show at once from every entry, and is a loading state expected meanwhile? ${timingIds.primary}, ${timingIds.magic}, ${timingIds.main}, ${timingIds.pip}.

## Questions for you
- None. Run cost: ${out.length} rows, three Enhance rows of 8 credits each.
`);
console.log(`${PLATFORM}: ${approved.length} approved + ${out.length} new (magic ${idsOf('magic').length} ${range('magic')}, main ${idsOf('main').length} ${range('main')}, pip ${idsOf('pip').length} ${range('pip')})`);
