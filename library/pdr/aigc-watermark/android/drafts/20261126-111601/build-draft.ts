// Draft 20261126-111601 (both platforms; the iOS and Android draft folders hold the same file): every entry point of
// every tool in the table: the full table from the primary entry, a UI pass from every other one [Req: REQ-015]
// (analysis.md pass 12, user 2026-11-26).
// Rebuilds draft.csv, requirements.md, spec.json, update-plan.md, control-trace.json, phases.json, annotation-trace.json
// and questions.zh-Hant.json in this folder from the approved table (v5).
// Run: node library/pdr/aigc-watermark/<platform>/drafts/20261126-111601/build-draft.ts
//   ZH_OUT=<file> also writes the Chinese text of the new and modified rows (input for zh-copy.ts merge).
// then: node scripts/knowledge.ts pdr/aigc-watermark <platform> --for analysis --out <this folder>/knowledge.md
import { readFileSync, writeFileSync, copyFileSync, existsSync } from 'node:fs';
import { dirname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseCsv, toCsv } from '../../../../../../scripts/lib/csv.ts';

const DRAFT = '20261126-111601';
const DIR = dirname(fileURLToPath(import.meta.url));
const PLATFORM = basename(dirname(dirname(DIR))) as 'android' | 'ios';
const TABLE = dirname(dirname(DIR));
const ios = PLATFORM === 'ios';
const manifest = JSON.parse(readFileSync(join(TABLE, 'manifest.json'), 'utf8'));
const PREV = manifest.draft as string;
const REQ = 'REQ-015';
const QUOTE = '「for any features that have multiple entry points, each entry needs to be tested completely and cannot assume they both lead to the same thing and have the same behavior」';

const rawCsv = readFileSync(join(TABLE, 'cases.csv'), 'utf8');
const bom = rawCsv.startsWith('﻿');
const approved = parseCsv(rawCsv.replace(/^﻿/, ''));
const H = approved[0];
const col = (n: string) => { const i = H.indexOf(n); if (i < 0) throw new Error(`no column ${n}`); return i; };
const body = approved.slice(1).filter(r => r.length > 1);
const num = (id: string) => +id.slice(3);
const tc = (x: number) => `TC-${String(x).padStart(3, '0')}`;
let next = Math.max(...body.map(r => num(r[col('ID')]))) + 1;   // iOS TC-156, Android TC-159

// Rows of the approved table this draft reads or pins (the iOS table has no system Back rows, so its IDs run lower).
const ID = ios
  ? { tts: 'TC-063', vc: 'TC-066', anime: 'TC-069', cartoon: 'TC-072', sketch: 'TC-075', animeSpan: 'TC-069 – TC-071', c2paExport: 'TC-154', fullOff: 'TC-082', musicTick: 'TC-126', exportTick: 'TC-127', i2vShare: 'TC-044', t2iShare: 'TC-052', ttsShare: 'TC-078' }
  : { tts: 'TC-064', vc: 'TC-067', anime: 'TC-070', cartoon: 'TC-073', sketch: 'TC-076', animeSpan: 'TC-070 – TC-072', c2paExport: 'TC-157', fullOff: 'TC-083', musicTick: 'TC-128', exportTick: 'TC-129', i2vShare: 'TC-044', t2iShare: 'TC-052', ttsShare: 'TC-079' };

// The primary entry's rows of each tool (### Entry points), per platform.
const PRIMARY_ROWS: Record<string, string> = ios ? {
  vebc: 'TC-017 – TC-019, TC-111, TC-112', i2v: 'TC-020 – TC-022, TC-044, TC-045, TC-082, TC-155, TC-088 – TC-096', crc: 'TC-023 – TC-025, TC-109, TC-110',
  cms: 'TC-026 – TC-028, TC-105, TC-106', vor: 'TC-029 – TC-031, TC-107', story: 'TC-032 – TC-034, TC-108', t2v: 'TC-012, TC-013, TC-035 – TC-037, TC-097 – TC-104',
  aav: 'TC-038 – TC-040, TC-113', ta: 'TC-041 – TC-043, TC-114', art: 'TC-046 – TC-048, TC-115', t2i: 'TC-009 – TC-011, TC-049 – TC-053, TC-116, TC-119',
  tts: 'TC-063 – TC-065, TC-078, TC-079, TC-125, TC-154', vc: 'TC-066 – TC-068, TC-124', anime: 'TC-069 – TC-071, TC-121', cartoon: 'TC-072 – TC-074, TC-122',
  sketch: 'TC-075 – TC-077, TC-123', music: 'TC-014, TC-054 – TC-062, TC-117, TC-118, TC-126',
} : {
  vebc: 'TC-017 – TC-019, TC-113, TC-114', i2v: 'TC-020 – TC-022, TC-044, TC-045, TC-083, TC-158, TC-090 – TC-098', crc: 'TC-023 – TC-025, TC-111, TC-112',
  cms: 'TC-026 – TC-028, TC-107, TC-108', vor: 'TC-029 – TC-031, TC-109', story: 'TC-032 – TC-034, TC-110', t2v: 'TC-012, TC-013, TC-035 – TC-037, TC-099 – TC-106',
  aav: 'TC-038 – TC-040, TC-115', ta: 'TC-041 – TC-043, TC-116', art: 'TC-046 – TC-048, TC-117', t2i: 'TC-009 – TC-011, TC-049 – TC-053, TC-118, TC-121',
  tts: 'TC-064 – TC-066, TC-079, TC-080, TC-127, TC-157', vc: 'TC-067 – TC-069, TC-126', anime: 'TC-070 – TC-072, TC-123', cartoon: 'TC-073 – TC-075, TC-124',
  sketch: 'TC-076 – TC-078, TC-125', music: 'TC-014, TC-054 – TC-063, TC-119, TC-120, TC-128',
};

type L = [string, string];                       // [English, Chinese]
const steps = (a: L[]): L => a.length === 1 ? [a[0][0], a[0][1]] : [a.map((s, i) => `${i + 1}. ${s[0]}`).join('\n'), a.map((s, i) => `${i + 1}. ${s[1]}`).join('\n')];
const lines = (a: L[]): L => [a.map(s => s[0]).join('\n'), a.map(s => s[1]).join('\n')];
const OFF: L = ['Menu › Settings › 「Remove AIGC Watermark」 is Off', 'Menu › Settings › 「Remove AIGC Watermark」開關為 Off'];
const ON: L = ['Menu › Settings › 「Remove AIGC Watermark」 is On', 'Menu › Settings › 「Remove AIGC Watermark」開關為 On'];
const CREDITS: L = ['Credit balance read', '已記下點數餘額'];
const FRAMES: L = ['Grab frames of the file at 0.0 s, 1.9 s and 2.1 s on the computer (ffmpeg)', '在電腦上用 ffmpeg 擷取檔案 0.0 s、1.9 s 和 2.1 s 的畫面'];
const COPY: L = ['Copy the file to the computer', '把檔案複製到電腦'];

// ---------------------------------------------------------------- tools
type Cls = 'video' | 'image' | 'timeline' | 'music';
type Tool = { key: string; name: string; cls: Cls; primary: L; share?: boolean; autoSave?: boolean; make?: L[]; c2paNote?: L };
const TOOLS: Record<string, Tool> = {
  vebc: { key: 'vebc', name: 'Video Edit by Chat', cls: 'video', primary: ['Launcher › AI Magic tab › Video Edit by Chat', 'Launcher › AI Magic 分頁 › Video Edit by Chat'], autoSave: true },
  i2v: { key: 'i2v', name: 'Image to Video', cls: 'video', primary: ['Launcher › AI Magic tab › Image to Video', 'Launcher › AI Magic 分頁 › Image to Video'], share: true },
  crc: { key: 'crc', name: 'Cinematic Reel Creator', cls: 'video', primary: ['Launcher › AI Magic tab › Cinematic Reel Creator', 'Launcher › AI Magic 分頁 › Cinematic Reel Creator'] },
  vor: { key: 'vor', name: 'Video Object Removal', cls: 'video', primary: ['Launcher › AI Magic tab › Video Object Removal', 'Launcher › AI Magic 分頁 › Video Object Removal'] },
  t2v: { key: 't2v', name: 'Text to Video', cls: 'video', primary: ['Launcher › AI Magic tab › Text to Video', 'Launcher › AI Magic 分頁 › Text to Video'] },
  aav: { key: 'aav', name: 'AI Anime Video', cls: 'video', primary: ['Launcher › AI Magic tab › AI Anime Video', 'Launcher › AI Magic 分頁 › AI Anime Video'], autoSave: true },
  ta: { key: 'ta', name: 'Talking Avatar', cls: 'video', primary: ['Launcher › AI Magic tab › Talking Avatar', 'Launcher › AI Magic 分頁 › Talking Avatar'], autoSave: true },
  art: { key: 'art', name: 'AI Art', cls: 'image', primary: ['Launcher › AI Magic tab › AI Art', 'Launcher › AI Magic 分頁 › AI Art'] },
  t2i: { key: 't2i', name: 'Text to Image', cls: 'image', primary: ['Launcher › AI Magic tab › Text to Image', 'Launcher › AI Magic 分頁 › Text to Image'], share: true },
  cartoonImg: { key: 'cartoon', name: 'AI Cartoon', cls: 'image', primary: ['Editor › Photo toolbar › Portrait › AI Style Transfer › AI Cartoon', '編輯器 › Photo 工具列 › Portrait › AI Style Transfer › AI Cartoon'] },
  sketchImg: { key: 'sketch', name: 'AI Sketch', cls: 'image', primary: ['Editor › Photo toolbar › Portrait › AI Style Transfer › AI Sketch', '編輯器 › Photo 工具列 › Portrait › AI Style Transfer › AI Sketch'] },
  tts: {
    key: 'tts', name: 'AI Text to Speech', cls: 'timeline', share: true, primary: ['Editor › Global toolbar › Audio › Text to speech', '編輯器 › Global 工具列 › Audio › Text to speech'],
    make: [['Keep the text the entry brought in, or type 「Hello, this is a test of the AI voice.」', '保留入口帶入的文字；沒有的話輸入「Hello, this is a test of the AI voice.」'], ['Pick a voice', '選一個聲音'], ['Tap the generate button', '點產生按鈕'], ['Look at the timeline', '查看時間軸']],
  },
  vc: {
    key: 'vc', name: 'AI Voice Changer', cls: 'timeline', primary: ['Editor › Video toolbar › Audio Tools › AI Voice Changer', '編輯器 › Video 工具列 › Audio Tools › AI Voice Changer'],
    make: [['Pick a Professional AI voice (not an 「Effect」 voice)', '選一個 Professional 的 AI 聲音（不要選「Effect」的聲音）'], ['Apply it', '套用'], ['Look at the timeline', '查看時間軸']],
  },
  cartoon: {
    key: 'cartoon', name: 'AI Cartoon', cls: 'timeline', primary: ['Editor › Photo toolbar › Portrait › AI Style Transfer › AI Cartoon', '編輯器 › Photo 工具列 › Portrait › AI Style Transfer › AI Cartoon'],
    make: [['Pick 「AI Cartoon」', '選「AI Cartoon」'], ['Apply it', '套用'], ['Look at the timeline', '查看時間軸']],
  },
  sketch: {
    key: 'sketch', name: 'AI Sketch', cls: 'timeline', primary: ['Editor › Photo toolbar › Portrait › AI Style Transfer › AI Sketch', '編輯器 › Photo 工具列 › Portrait › AI Style Transfer › AI Sketch'],
    make: [['Pick 「AI Sketch」', '選「AI Sketch」'], ['Apply it', '套用'], ['Look at the timeline', '查看時間軸']],
  },
  music: { key: 'music', name: 'AI Music Generator', cls: 'music', primary: ['Launcher › AI Magic tab › AI Music Generator', 'Launcher › AI Magic 分頁 › AI Music Generator'] },
};

// ---------------------------------------------------------------- contexts and entries
const CTX = {
  global: ['A project open in the editor with one non-AI video clip on the main track, nothing selected', '編輯器開著一個專案，主軌有一段非 AI 影片，沒有選取任何片段'] as L,
  video: ['A project open in the editor with one non-AI video clip on the main track, that clip selected', '編輯器開著一個專案，主軌有一段非 AI 影片，並選取這段影片'] as L,
  pipVideo: ['A project open in the editor with a non-AI video clip on the main track and another on an overlay (PIP) track, the overlay clip selected', '編輯器開著一個專案，主軌有一段非 AI 影片，子母畫面（PIP）軌也有一段，並選取子母畫面的影片'] as L,
  photo: ['A project open in the editor with one non-AI photo on the main track, that photo selected', '編輯器開著一個專案，主軌有一張非 AI 相片，並選取這張相片'] as L,
  pipPhoto: ['A project open in the editor with a non-AI video clip on the main track and a non-AI photo on an overlay (PIP) track, the overlay photo selected', '編輯器開著一個專案，主軌有一段非 AI 影片，子母畫面（PIP）軌有一張非 AI 相片，並選取這張相片'] as L,
  audio: ['A project open in the editor with a non-AI video clip on the main track and a non-AI speech recording on an audio track, the audio clip selected', '編輯器開著一個專案，主軌有一段非 AI 影片，音訊軌有一段非 AI 的人聲錄音，並選取這段音訊'] as L,
  text: ['A project open in the editor with a non-AI video clip on the main track and the title 「Hello, this is a test of the AI voice.」 on the text track, the title selected', '編輯器開著一個專案，主軌有一段非 AI 影片，文字軌有標題「Hello, this is a test of the AI voice.」，並選取這個標題'] as L,
  launcher: ['The Launcher open on the Home tab', '開著 Launcher 的 Home 分頁'] as L,
  artResult: ['An AI Art result open on its result page (made with the switch Off, not saved)', '開著一個 AI Art 結果頁（在開關 Off 時產生，還沒儲存）'] as L,
};
const BRINGS = {
  global: ['nothing selected, so record whether it asks for a source or uses the clip under the playhead', '沒有選取片段，記下它是要求挑選素材，還是直接用播放位置下的片段'] as L,
  clip: ['the selected clip as its source, or nothing', '選取的片段是否帶入當作素材，或什麼都沒帶入'] as L,
  photo: ['the selected photo as its input, or nothing', '選取的相片是否帶入當作輸入，或什麼都沒帶入'] as L,
  audio: ['the selected audio clip as its script or voice, or nothing', '選取的音訊是否帶入當作腳本或聲音，或什麼都沒帶入'] as L,
  text: ['the selected title\'s text, or nothing', '選取標題的文字是否帶入，或什麼都沒帶入'] as L,
  none: ['what the tool page asks for first', '工具頁一開始要求提供什麼'] as L,
  music: ['anything from the open project (its length, the clip under the playhead), or nothing', '是否帶入專案的任何資訊（例如長度、播放位置下的片段），或什麼都沒帶入'] as L,
  art: ['the AI Art image as its input, or nothing', 'AI Art 的圖片是否帶入當作輸入，或什麼都沒帶入'] as L,
};
const ORIGIN = {
  editor: ['The editor shows again with the same project, selection and playhead', '畫面回到編輯器，專案、選取的片段和播放位置都跟原本一樣'] as L,
  launcher: ['The Launcher Home tab shows again', '畫面回到 Launcher 的 Home 分頁'] as L,
  aiMagic: ['The AI Magic tab shows again', '畫面回到 AI Magic 分頁'] as L,
  art: ['The AI Art result page shows again', '畫面回到 AI Art 結果頁'] as L,
};
const tap = (label: string, where?: L): L => where ? [`Tap 「${label}」 ${where[0]}`, `點${where[1]}的「${label}」`] : [`Tap 「${label}」`, `點「${label}」`];
const EDITOR_BAR: L = ['in the editor toolbar', '編輯器工具列'];
const CLIP_BAR: L = ['in the clip toolbar', '片段工具列'];
const PHOTO_BAR: L = ['in the photo toolbar', '相片工具列'];
const AUDIO_BAR: L = ['in the audio clip toolbar', '音訊片段工具列'];
const TEXT_BAR: L = ['in the text toolbar', '文字工具列'];
const BOTTOM: L = ['in the bottom bar', '底部列'];

type Entry = {
  tool: Tool; path: L; source: string; ctx: L; open: L[]; brings: L; origin: L; editor: boolean;
  sheet?: string;                         // the toolbar sheet's place (with its bracket note) → R-062, Q-22
  seen?: L;                               // where the entry is known from, when not the sheet → Q-22
  partial?: L;                            // the timeline part is covered by existing rows (named)
  note?: L;                               // extra Notes for the Section's first row
  platformNote?: L;
};
const E = (x: Entry) => x;
const ENTRIES: Entry[] = [
  // Video Edit by Chat
  E({ tool: TOOLS.vebc, path: ['Launcher › Video Edit by Chat big shortcut', 'Launcher › Video Edit by Chat 大捷徑'], source: 'KP-010 (Launcher big shortcuts), Design 8/E (KP-011)', ctx: CTX.launcher, open: [['Tap the 「Video Edit by Chat」 big shortcut', '點「Video Edit by Chat」大捷徑']], brings: BRINGS.none, origin: ORIGIN.launcher, editor: false, seen: ['KP-010 records it on the iOS Launcher', 'KP-010 記錄 iOS 的 Launcher 有這個捷徑'] }),
  E({ tool: TOOLS.vebc, path: ['Editor › Global toolbar › AI Magic › Video Edit by Chat', '編輯器 › Global 工具列 › AI Magic › Video Edit by Chat'], source: 'toolbar sheet (KP-107), Global › AI Magic 「Video Edit by Chat (8/M)」', ctx: CTX.global, open: [tap('AI Magic', EDITOR_BAR), tap('Video Edit by Chat')], brings: BRINGS.global, origin: ORIGIN.editor, editor: true, sheet: 'Global toolbar › AI Magic, note 「8/M」' }),
  E({ tool: TOOLS.vebc, path: ['Editor › Video toolbar › Effects › Video Edit by Chat', '編輯器 › Video 工具列 › Effects › Video Edit by Chat'], source: 'toolbar sheet (KP-107), Video › Effects 「Video Edit by Chat (8/M)」', ctx: CTX.video, open: [tap('Effects', CLIP_BAR), tap('Video Edit by Chat')], brings: BRINGS.clip, origin: ORIGIN.editor, editor: true, sheet: 'Video toolbar › Effects, note 「8/M」', platformNote: ['KP-050 (iOS 16.8) had 「Video Edit by Chat」 on the clip toolbar\'s first layer: record where this build has it.', 'KP-050（iOS 16.8）的「Video Edit by Chat」在片段工具列第一層：記下這個版本放在哪裡。'] }),
  E({ tool: TOOLS.vebc, path: ['Editor › PIP Video toolbar › Effects › Video Edit by Chat', '編輯器 › PIP Video 工具列 › Effects › Video Edit by Chat'], source: 'toolbar sheet (KP-107), PIP Video › Effects 「Video Edit by Chat (7/E)」', ctx: CTX.pipVideo, open: [tap('Effects', CLIP_BAR), tap('Video Edit by Chat')], brings: BRINGS.clip, origin: ORIGIN.editor, editor: true, sheet: 'PIP Video toolbar › Effects, note 「7/E」' }),
  // Image to Video
  E({ tool: TOOLS.i2v, path: ['Editor › Global toolbar › AI Magic › Image to Video', '編輯器 › Global 工具列 › AI Magic › Image to Video'], source: 'toolbar sheet (KP-107), Global › AI Magic', ctx: CTX.global, open: [tap('AI Magic', EDITOR_BAR), tap('Image to Video')], brings: BRINGS.global, origin: ORIGIN.editor, editor: true, sheet: 'Global toolbar › AI Magic' }),
  E({ tool: TOOLS.i2v, path: ['AI Art result › Turn the image into a video', 'AI Art 結果頁 › Turn the image into a video'], source: 'KP-090 (the AI Art result page offers 「Turn the image into a video」, Android)', ctx: CTX.artResult, open: [['Tap 「Turn the image into a video」', '點「Turn the image into a video」']], brings: BRINGS.art, origin: ORIGIN.art, editor: false, seen: ['KP-090 records this button on the Android AI Art result page', 'KP-090 記錄 Android 的 AI Art 結果頁有這個按鈕'] }),
  // Cinematic Reel Creator
  E({ tool: TOOLS.crc, path: ['Editor › Global toolbar › AI Magic › Cinematic Reel Creator', '編輯器 › Global 工具列 › AI Magic › Cinematic Reel Creator'], source: 'toolbar sheet (KP-107), Global › AI Magic 「Cinematic Reel Creator (7/E)」', ctx: CTX.global, open: [tap('AI Magic', EDITOR_BAR), tap('Cinematic Reel Creator')], brings: BRINGS.global, origin: ORIGIN.editor, editor: true, sheet: 'Global toolbar › AI Magic, note 「7/E」' }),
  E({ tool: TOOLS.crc, path: ['Editor › Photo toolbar › Effects › Cinematic Reel Creator', '編輯器 › Photo 工具列 › Effects › Cinematic Reel Creator'], source: 'toolbar sheet (KP-107), Photo › Effects 「Cinematic Reel Creator (7/E)」', ctx: CTX.photo, open: [tap('Effects', PHOTO_BAR), tap('Cinematic Reel Creator')], brings: BRINGS.photo, origin: ORIGIN.editor, editor: true, sheet: 'Photo toolbar › Effects, note 「7/E」', platformNote: ['Android R3 (2611193) listed 「Cinematic Reel Creator」 on the photo toolbar\'s first layer: record where this build has it.', 'Android R3（2611193）的「Cinematic Reel Creator」在相片工具列第一層：記下這個版本放在哪裡。'] }),
  E({ tool: TOOLS.crc, path: ['Editor › PIP Photo toolbar › Effects › Cinematic Reel Creator', '編輯器 › PIP Photo 工具列 › Effects › Cinematic Reel Creator'], source: 'toolbar sheet (KP-107), PIP Photo › Effects 「Cinematic Reel Creator (7/E)」', ctx: CTX.pipPhoto, open: [tap('Effects', PHOTO_BAR), tap('Cinematic Reel Creator')], brings: BRINGS.photo, origin: ORIGIN.editor, editor: true, sheet: 'PIP Photo toolbar › Effects, note 「7/E」' }),
  // Video Object Removal (the sheet's 「AI Remove」)
  E({ tool: TOOLS.vor, path: ['Editor › Video toolbar › AI Remove', '編輯器 › Video 工具列 › AI Remove'], source: 'toolbar sheet (KP-107), Video toolbar first layer 「AI Remove (4/E IOS)」; KP-050 (iOS clip toolbar 「Object Removal」)', ctx: CTX.video, open: [tap('AI Remove', CLIP_BAR)], brings: BRINGS.clip, origin: ORIGIN.editor, editor: true, sheet: 'Video toolbar first layer 「AI Remove (4/E IOS)」, taken to be Video Object Removal' }),
  E({ tool: TOOLS.vor, path: ['Editor › PIP Video toolbar › AI Remove', '編輯器 › PIP Video 工具列 › AI Remove'], source: 'toolbar sheet (KP-107), PIP Video toolbar first layer 「AI Remove (4/E IOS)」', ctx: CTX.pipVideo, open: [tap('AI Remove', CLIP_BAR)], brings: BRINGS.clip, origin: ORIGIN.editor, editor: true, sheet: 'PIP Video toolbar first layer 「AI Remove (4/E IOS)」, taken to be Video Object Removal' }),
  // Text to Video
  E({ tool: TOOLS.t2v, path: ['Editor › Global toolbar › AI Magic › Text to Video', '編輯器 › Global 工具列 › AI Magic › Text to Video'], source: 'toolbar sheet (KP-107), Global › AI Magic (「Text to Video 2/B 加入」)', ctx: CTX.global, open: [tap('AI Magic', EDITOR_BAR), tap('Text to Video')], brings: BRINGS.global, origin: ORIGIN.editor, editor: true, sheet: 'Global toolbar › AI Magic' }),
  // AI Anime Video
  E({ tool: TOOLS.aav, path: ['Editor › Video toolbar › Effects › AI Anime Video', '編輯器 › Video 工具列 › Effects › AI Anime Video'], source: 'toolbar sheet (KP-107), Video › Effects', ctx: CTX.video, open: [tap('Effects', CLIP_BAR), tap('AI Anime Video')], brings: BRINGS.clip, origin: ORIGIN.editor, editor: true, sheet: 'Video toolbar › Effects', partial: [`The timeline part of this entry (editor preview, export Off and On) is ${ID.animeSpan}, whose precondition now names this entry.`, `這個入口在時間軸上的部分（編輯器預覽、開關 Off／On 匯出）由 ${ID.animeSpan} 負責，它們的前置條件已改成寫明這個入口。`] }),
  E({ tool: TOOLS.aav, path: ['Editor › PIP Video toolbar › Effects › AI Anime Video', '編輯器 › PIP Video 工具列 › Effects › AI Anime Video'], source: 'toolbar sheet (KP-107), PIP Video › Effects', ctx: CTX.pipVideo, open: [tap('Effects', CLIP_BAR), tap('AI Anime Video')], brings: BRINGS.clip, origin: ORIGIN.editor, editor: true, sheet: 'PIP Video toolbar › Effects' }),
  // Talking Avatar
  E({ tool: TOOLS.ta, path: ['Editor › Global toolbar › AI Magic › Talking Avatar', '編輯器 › Global 工具列 › AI Magic › Talking Avatar'], source: 'toolbar sheet (KP-107), Global › AI Magic', ctx: CTX.global, open: [tap('AI Magic', EDITOR_BAR), tap('Talking Avatar')], brings: BRINGS.global, origin: ORIGIN.editor, editor: true, sheet: 'Global toolbar › AI Magic', note: ios ? undefined : ['Android R3 made the TC-041 result from here; this Section runs the whole flow from this entry.', 'Android R3 的 TC-041 結果就是從這裡產生的；這個區塊從這個入口跑完整流程。'] }),
  E({ tool: TOOLS.ta, path: ['Editor › Audio toolbar › Talking Avatar', '編輯器 › Audio 工具列 › Talking Avatar'], source: 'toolbar sheet (KP-107), Audio toolbar first layer', ctx: CTX.audio, open: [tap('Talking Avatar', AUDIO_BAR)], brings: BRINGS.audio, origin: ORIGIN.editor, editor: true, sheet: 'Audio toolbar first layer' }),
  // AI Art
  E({ tool: TOOLS.art, path: ['Editor › Global toolbar › AI Magic › AI Art', '編輯器 › Global 工具列 › AI Magic › AI Art'], source: 'toolbar sheet (KP-107), Global › AI Magic', ctx: CTX.global, open: [tap('AI Magic', EDITOR_BAR), tap('AI Art')], brings: BRINGS.global, origin: ORIGIN.editor, editor: true, sheet: 'Global toolbar › AI Magic' }),
  // Text to Image
  E({ tool: TOOLS.t2i, path: ['Editor › Global toolbar › AI Magic › Text to Image', '編輯器 › Global 工具列 › AI Magic › Text to Image'], source: 'toolbar sheet (KP-107), Global › AI Magic', ctx: CTX.global, open: [tap('AI Magic', EDITOR_BAR), tap('Text to Image')], brings: BRINGS.global, origin: ORIGIN.editor, editor: true, sheet: 'Global toolbar › AI Magic' }),
  E({ tool: TOOLS.t2i, path: ['Editor › Photo toolbar › Tools › Text to Image', '編輯器 › Photo 工具列 › Tools › Text to Image'], source: 'toolbar sheet (KP-107), Photo › Tools', ctx: CTX.photo, open: [tap('Tools', PHOTO_BAR), tap('Text to Image')], brings: BRINGS.photo, origin: ORIGIN.editor, editor: true, sheet: 'Photo toolbar › Tools' }),
  E({ tool: TOOLS.t2i, path: ['Editor › PIP Photo toolbar › Tools › AI Text to Image', '編輯器 › PIP Photo 工具列 › Tools › AI Text to Image'], source: 'toolbar sheet (KP-107), PIP Photo › Tools 「AI Text to Image」', ctx: CTX.pipPhoto, open: [tap('Tools', PHOTO_BAR), tap('AI Text to Image')], brings: BRINGS.photo, origin: ORIGIN.editor, editor: true, sheet: 'PIP Photo toolbar › Tools, labelled 「AI Text to Image」' }),
  // AI Cartoon / AI Sketch outside the editor (photo tools of the AI Magic tab)
  E({ tool: TOOLS.cartoonImg, path: ['Launcher › AI Magic tab › AI Cartoon', 'Launcher › AI Magic 分頁 › AI Cartoon'], source: 'Android R3 TC-073 (AI Cartoon only in the Launcher\'s AI Magic on 2611193; Q-11)', ctx: CTX.launcher, open: [tap('AI Magic', BOTTOM), tap('AI Cartoon')], brings: BRINGS.none, origin: ORIGIN.aiMagic, editor: false, seen: ['Android R3 found AI Cartoon only here (Q-11)', 'Android R3 發現 AI Cartoon 只在這裡（Q-11）'] }),
  E({ tool: TOOLS.sketchImg, path: ['Launcher › AI Magic tab › AI Sketch', 'Launcher › AI Magic 分頁 › AI Sketch'], source: 'Android R3 TC-076 (AI Sketch only in the Launcher\'s AI Magic on 2611193; Q-11)', ctx: CTX.launcher, open: [tap('AI Magic', BOTTOM), tap('AI Sketch')], brings: BRINGS.none, origin: ORIGIN.aiMagic, editor: false, seen: ['Android R3 found AI Sketch only here (Q-11)', 'Android R3 發現 AI Sketch 只在這裡（Q-11）'] }),
  // AI Text to Speech
  E({ tool: TOOLS.tts, path: ['Editor › Global toolbar › Text › Text to Speech', '編輯器 › Global 工具列 › Text › Text to Speech'], source: 'toolbar sheet (KP-107), Global › Text', ctx: CTX.global, open: [tap('Text', EDITOR_BAR), tap('Text to Speech')], brings: BRINGS.global, origin: ORIGIN.editor, editor: true, sheet: 'Global toolbar › Text' }),
  E({ tool: TOOLS.tts, path: ['Editor › Global toolbar › AI Magic › Text to Speech', '編輯器 › Global 工具列 › AI Magic › Text to Speech'], source: 'toolbar sheet (KP-107), Global › AI Magic', ctx: CTX.global, open: [tap('AI Magic', EDITOR_BAR), tap('Text to Speech')], brings: BRINGS.global, origin: ORIGIN.editor, editor: true, sheet: 'Global toolbar › AI Magic' }),
  E({ tool: TOOLS.tts, path: ['Editor › Text toolbar › Text to Speech', '編輯器 › Text 工具列 › Text to Speech'], source: 'toolbar sheet (KP-107), Text toolbar first layer', ctx: CTX.text, open: [tap('Text to Speech', TEXT_BAR)], brings: BRINGS.text, origin: ORIGIN.editor, editor: true, sheet: 'Text toolbar first layer' }),
  // AI Voice Changer
  E({ tool: TOOLS.vc, path: ['Editor › Global toolbar › Audio › AI Voice Changer', '編輯器 › Global 工具列 › Audio › AI Voice Changer'], source: 'toolbar sheet (KP-107), Global › Audio', ctx: CTX.global, open: [tap('Audio', EDITOR_BAR), tap('AI Voice Changer')], brings: BRINGS.global, origin: ORIGIN.editor, editor: true, sheet: 'Global toolbar › Audio' }),
  E({ tool: TOOLS.vc, path: ['Editor › PIP Video toolbar › Audio Tools › AI Voice Changer', '編輯器 › PIP Video 工具列 › Audio Tools › AI Voice Changer'], source: 'toolbar sheet (KP-107), PIP Video › Audio Tools', ctx: CTX.pipVideo, open: [tap('Audio Tools', CLIP_BAR), tap('AI Voice Changer')], brings: BRINGS.clip, origin: ORIGIN.editor, editor: true, sheet: 'PIP Video toolbar › Audio Tools' }),
  E({ tool: TOOLS.vc, path: ['Editor › Audio toolbar › Audio Tools › AI Voice Changer', '編輯器 › Audio 工具列 › Audio Tools › AI Voice Changer'], source: 'toolbar sheet (KP-107), Audio › Audio Tools', ctx: CTX.audio, open: [tap('Audio Tools', AUDIO_BAR), tap('AI Voice Changer')], brings: BRINGS.audio, origin: ORIGIN.editor, editor: true, sheet: 'Audio toolbar › Audio Tools' }),
  // AI Cartoon / AI Sketch on an overlay photo
  E({ tool: TOOLS.cartoon, path: ['Editor › PIP Photo toolbar › Portrait › AI Style Transfer › AI Cartoon', '編輯器 › PIP Photo 工具列 › Portrait › AI Style Transfer › AI Cartoon'], source: 'toolbar sheet (KP-107), PIP Photo › Portrait 「AI Style Transfer」', ctx: CTX.pipPhoto, open: [tap('Portrait', PHOTO_BAR), tap('AI Style Transfer')], brings: BRINGS.photo, origin: ORIGIN.editor, editor: true, sheet: 'PIP Photo toolbar › Portrait › 「AI Style Transfer」 (Android R3 found no AI Style Transfer in the editor on 2611193)' }),
  E({ tool: TOOLS.sketch, path: ['Editor › PIP Photo toolbar › Portrait › AI Style Transfer › AI Sketch', '編輯器 › PIP Photo 工具列 › Portrait › AI Style Transfer › AI Sketch'], source: 'toolbar sheet (KP-107), PIP Photo › Portrait 「AI Style Transfer」', ctx: CTX.pipPhoto, open: [tap('Portrait', PHOTO_BAR), tap('AI Style Transfer')], brings: BRINGS.photo, origin: ORIGIN.editor, editor: true, sheet: 'PIP Photo toolbar › Portrait › 「AI Style Transfer」 (Android R3 found no AI Style Transfer in the editor on 2611193)' }),
  // AI Music Generator
  E({ tool: TOOLS.music, path: ['Editor › Global toolbar › Audio › AI Music Generator', '編輯器 › Global 工具列 › Audio › AI Music Generator'], source: 'toolbar sheet (KP-107), Global › Audio', ctx: CTX.global, open: [tap('Audio', EDITOR_BAR), tap('AI Music Generator')], brings: BRINGS.music, origin: ORIGIN.editor, editor: true, sheet: 'Global toolbar › Audio' }),
  E({ tool: TOOLS.music, path: ['Editor › Global toolbar › AI Magic › AI Music Generator', '編輯器 › Global 工具列 › AI Magic › AI Music Generator'], source: 'toolbar sheet (KP-107), Global › AI Magic', ctx: CTX.global, open: [tap('AI Magic', EDITOR_BAR), tap('AI Music Generator')], brings: BRINGS.music, origin: ORIGIN.editor, editor: true, sheet: 'Global toolbar › AI Magic' }),
  E({ tool: TOOLS.music, path: ['Editor › Global toolbar › Audio › Music › AI Music Generator', '編輯器 › Global 工具列 › Audio › Music › AI Music Generator'], source: 'KP-097 (Add Music › AI Music Generator › My AI Music, Android)', ctx: CTX.global, open: [tap('Audio', EDITOR_BAR), tap('Music'), tap('AI Music Generator')], brings: BRINGS.music, origin: ORIGIN.editor, editor: true, seen: ['KP-097 records AI Music Generator inside Add Music on Android', 'KP-097 記錄 Android 的 Add Music 裡有 AI Music Generator'] }),
];

// ---------------------------------------------------------------- row building
type NewRow = { id: string; en: string[]; zh: Record<string, string>; section: string; kind: string; entry?: Entry };
const newRows: NewRow[] = [];
const sectionOf = (e: Entry): L => [`Entry › ${e.path[0]}`, `入口 › ${e.path[1]}`];
const reason = (e: Entry): L => [`${REQ}: ${e.tool.name} from ${e.path[0]}, a UI pass from this entry (pass 12)`, `${REQ}：從 ${e.path[1]} 進入 ${e.tool.name}，這個入口做一次 UI 檢查（pass 12）`];
function add(kind: string, section: L, pre: L[], act: L[], exp: L[], pri: string, ref: string, notes: L, why: L, entry?: Entry): string {
  const id = tc(next++);
  const P = steps(pre), A = steps(act), X = lines(exp);
  const r = Array(H.length + 2).fill('');
  r[col('ID')] = id; r[col('Section')] = section[0]; r[col('Precondition')] = P[0]; r[col('Action')] = A[0];
  r[col('Expected Result')] = X[0]; r[col('Priority')] = pri; r[col('Spec Ref')] = ref; r[col('Notes')] = notes[0];
  r[H.length] = 'new'; r[H.length + 1] = why[0];
  newRows.push({ id, en: r, section: section[0], kind, entry, zh: { Section: section[1], Precondition: P[1], Action: A[1], 'Expected Result': X[1], Notes: notes[1], 'Change Reason': why[1] } });
  return id;
}
const join2 = (...a: L[]): L => [a.map(x => x[0]).filter(Boolean).join(' '), a.map(x => x[1]).filter(Boolean).join('')];
const Q21: L = ['The spec draws this tool from one place only; the row asserts the primary entry\'s behaviour (pass 12).', '規格只畫了這個工具的一個入口；這一列以主要入口的行為為準（pass 12）。'];
const q22 = (e: Entry): L => e.sheet
  ? [`Q-22: the toolbar sheet places it at ${e.sheet}. If the build does not offer it here, record what the menu lists instead as Fail (question) for PM and mark the rest of this Section Blocked.`, `Q-22：工具列對照表把它放在 ${e.sheet}。如果這個版本這裡沒有，記下選單實際列出的項目，記為 Fail（question）交給 PM，這個區塊其餘的列記為 Blocked。`]
  : e.seen ? [`Q-22: ${e.seen[0]}. If this build does not show it, record that as Fail (question) for PM and mark the rest of this Section Blocked.`, `Q-22：${e.seen[1]}。如果這個版本沒有，記為 Fail（question）交給 PM，這個區塊其餘的列記為 Blocked。`] : ['', ''];
const ONE_WAY_EXPORT: L = [`One-way order: runs before ${ID.exportTick} (the export dialog's 「Don’t show again」).`, `單向狀態：要在 ${ID.exportTick}（匯出對話框的「Don’t show again」）之前跑。`];
const ONE_WAY_MUSIC: L = [`One-way order: runs before ${ID.musicTick} (the music dialog's 「Don’t show again」).`, `單向狀態：要在 ${ID.musicTick}（音樂對話框的「Don’t show again」）之前跑。`];
const refOf = (e: Entry, ...r: string[]) => `${[...r, ...(e.sheet || e.seen ? ['R-062'] : [])].join(', ')}; ${REQ}`;

function landing(e: Entry, kind = 'landing') {
  const t = e.tool, sec = sectionOf(e);
  const pageL: L = t.cls === 'timeline' ? [`The ${t.name} panel opens with the same options and credit price as from ${t.primary[0]}`, `開啟 ${t.name} 面板，選項和點數價格都跟從 ${t.primary[1]} 進入時一樣`]
    : t.cls === 'music' ? ['The AI Music Generator page opens with the same form and credit price as from the AI Magic tab', '開啟 AI Music Generator 頁面，表單和點數價格都跟從 AI Magic 分頁進入時一樣']
    : [`The ${t.name} page opens with the same inputs, options and credit price as from ${t.primary[0]}`, `開啟 ${t.name} 頁面，輸入項目、選項和點數價格都跟從 ${t.primary[1]} 進入時一樣`];
  const exp: L[] = [pageL, [`Record what this entry brings in: ${e.brings[0]}`, `記下這個入口帶入了什麼：${e.brings[1]}`]];
  if (t.cls === 'music') exp.push(['Record whether it opens as a page of its own or as a part of the screen it was opened from', '記下它是開成獨立頁面，還是開在原本畫面裡的一個區塊']);
  const notes = join2(Q21, q22(e), e.partial ?? ['', ''], e.platformNote ?? ['', ''], e.note ?? ['', '']);
  return add(kind, sec, [OFF, e.ctx, CREDITS], e.open, exp, 'P2', refOf(e, 'R-059'), notes, reason(e), e);
}
function exits(e: Entry) {
  const t = e.tool, sec = sectionOf(e);
  const page: L = t.cls === 'timeline' ? [`The ${t.name} panel opened from this entry, nothing applied`, `從這個入口開啟的 ${t.name} 面板，還沒套用任何東西`] : [`The ${t.name} page opened from this entry, nothing generated`, `從這個入口開啟的 ${t.name} 頁面，還沒產生任何東西`];
  const closes: L = [`${t.name} closes`, `${t.name} 關閉`];
  const none: L = ['No credits are taken', '沒有扣點數'];
  const changed: L = e.editor ? ['Nothing was added to or changed on the timeline', '時間軸上沒有新增或改變任何東西'] : ['', ''];
  const exp = [closes, e.origin, none, ...(e.editor ? [changed] : [])];
  add('exit', sec, [page, CREDITS], [[`Tap the ${t.name} ${t.cls === 'timeline' ? 'panel' : 'page'}'s back control (‹ or ✕)`, `點 ${t.name} ${t.cls === 'timeline' ? '面板' : '頁面'}的返回按鈕（‹ 或 ✕）`]], exp, 'P3', `R-061; ${REQ}`, Q21, reason(e), e);
  if (!ios) add('exit', sec, [page, CREDITS], [[`Press system Back on the ${t.name} ${t.cls === 'timeline' ? 'panel' : 'page'}`, `在 ${t.name} ${t.cls === 'timeline' ? '面板' : '頁面'}按系統返回鍵`]], exp, 'P3', `R-061; ${REQ}`, Q21, reason(e), e);
}

// UI pass per non-primary entry (pass 12, user 2026-11-26: 「for each entry, it should only check the UI, so click
// everything once and make sure there's no errors for each button and options」): landing, input values, every control
// once, the main action once (where the result lands, watermark and Content Credentials on it), every exit once.
const CHECKLIST = (t: Tool): L => {
  const k = t.cls === 'timeline' ? t.key : t.key === 'cartoon' || t.key === 'sketch' ? t.key : t.key;
  const rowsOf = PRIMARY_ROWS[k] ?? '';
  return [`Checklist: the controls the primary entry's rows press (${rowsOf}) and every control the ${t.name} ${t.cls === 'timeline' ? 'panel' : 'page'} shows from this entry; a control the primary entry has and this one lacks, or the reverse, is a Fail.`,
    `檢查清單：主要入口那幾列按到的控制項（${rowsOf}），加上從這個入口開啟的 ${t.name} ${t.cls === 'timeline' ? '面板' : '頁面'}上的每個控制項；主要入口有而這個入口沒有的控制項（或反過來）都算 Fail。`];
};
const NO_ERR: L = ['No error, crash, freeze, empty state or wrong value', '沒有錯誤訊息、閃退、卡住、空白畫面或數值錯誤'];
function values(e: Entry) {
  const t = e.tool, sec = sectionOf(e);
  const has = [CTX.video, CTX.pipVideo, CTX.photo, CTX.pipPhoto, CTX.audio, CTX.text].includes(e.ctx);
  const surface: L = t.cls === 'timeline' ? [`The ${t.name} panel opened from this entry`, `從這個入口開啟的 ${t.name} 面板`] : [`The ${t.name} ${t.cls === 'music' ? 'page' : 'page'} opened from this entry`, `從這個入口開啟的 ${t.name} 頁面`];
  const act: L[] = t.cls === 'music'
    ? [['Read every value the page shows that comes from the open project (its length, the clip under the playhead)', '讀取頁面上所有來自目前專案的數值（專案長度、播放位置下的片段）'], ['Compare each with the project in the editor', '逐一和編輯器裡的專案比對']]
    : has
      ? [['Read every value the page shows for its source (thumbnail, length, trim range, fps, resolution, aspect, the text)', '讀取頁面上顯示的來源數值（縮圖、長度、剪輯範圍、fps、解析度、長寬比、文字）'], ['Compare each with the selected item\'s own values (the editor\'s clip info, the file on the computer)', '逐一和選取項目本身的數值比對（編輯器的片段資訊、電腦上的檔案）']]
      : [['Pick the source the page asks for (fixtures.md), if it asks for one', '如果頁面要求挑選素材，依 fixtures.md 挑選'], ['Read every value the page shows for that source (thumbnail, length, trim range, fps, resolution, aspect)', '讀取頁面上顯示的來源數值（縮圖、長度、剪輯範圍、fps、解析度、長寬比）'], ['Compare each with the picked file\'s own values', '逐一和挑選的檔案本身的數值比對']];
  const exp: L[] = [
    t.cls === 'music' ? ['Each value taken from the project equals the project\'s own (record that none is shown, if none is)', '每個來自專案的數值都和專案本身一致（若完全沒有顯示，記下來）']
      : has ? ['Each value equals the selected item\'s own: the thumbnail is that item, and length, fps, resolution, aspect and text match it', '每個數值都和選取的項目一致：縮圖就是這個項目，長度、fps、解析度、長寬比和文字都相符']
        : ['Each value equals the picked file\'s own', '每個數值都和挑選的檔案一致'],
    NO_ERR];
  add('values', sec, [surface], act, exp, 'P2', `R-064; ${REQ}`, ['A clip imported on the timeline is where these values go wrong (Video Enhance read the wrong fps from a timeline clip).', '時間軸匯入的片段最容易讀錯這些數值（Video Enhance 曾從時間軸片段讀到錯的 fps）。'], reason(e), e);
}
function controls(e: Entry) {
  const t = e.tool, sec = sectionOf(e);
  const surface: L = t.cls === 'timeline' ? [`The ${t.name} panel opened from this entry, nothing applied`, `從這個入口開啟的 ${t.name} 面板，還沒套用任何東西`] : [`The ${t.name} page opened from this entry, nothing generated`, `從這個入口開啟的 ${t.name} 頁面，還沒產生任何東西`];
  const act: L[] = t.cls === 'music'
    ? [['Press every control of the page once: each genre, mood and theme chip, the length and song-count options, the description box, ⓘ and tabs (My AI Music)', '頁面上每個控制項各按一次：每個 Genre、Mood、Theme 選項、長度和歌曲數量選項、描述欄、ⓘ 和分頁（My AI Music）'], ['Close every sheet or menu it opens with its own close control', '每個打開的面板或選單都用它自己的關閉按鈕關掉']]
    : t.cls === 'timeline'
      ? [['Press every control of the panel once: each voice or style, each category tab, each slider and toggle, ⓘ and preview', '面板上每個控制項各按一次：每個聲音或風格、每個分類分頁、每個滑桿和開關、ⓘ 和預覽'], ['Close every sheet or menu it opens with its own close control', '每個打開的面板或選單都用它自己的關閉按鈕關掉']]
      : [['Press every control of the page once: each input picker, each model or style chip, each length, resolution and aspect option, each toggle, tab and ⓘ, the prompt box', '頁面上每個控制項各按一次：每個素材選擇器、每個模型或風格選項、每個長度、解析度和長寬比選項、每個開關、分頁和 ⓘ、提示詞欄'], ['Close every sheet or menu it opens with its own close control', '每個打開的面板或選單都用它自己的關閉按鈕關掉']];
  add('controls', sec, [OFF, surface, CREDITS], act,
    [['Step 1: each control responds as it does from the primary entry (its sheet opens, its value is chosen and shown)', '步驟 1：每個控制項的反應都和從主要入口進入時一樣（面板會打開、數值能選且有顯示）'],
      ['Step 1: the price on the main button follows each option as it does from the primary entry', '步驟 1：主按鈕上的價格隨每個選項變化，和從主要入口進入時一樣'],
      ['Steps 1–2: no error, crash, freeze, empty state or wrong value', '步驟 1–2：沒有錯誤訊息、閃退、卡住、空白畫面或數值錯誤'],
      ['Steps 1–2: no credits are taken', '步驟 1–2：沒有扣點數']],
    'P2', `R-065; ${REQ}`, join2(CHECKLIST(t), ['One press per control or option, no combinations (pass 12).', '每個控制項或選項只按一次，不做組合（pass 12）。']), reason(e), e);
}
function mainAction(e: Entry) {
  const t = e.tool, sec = sectionOf(e), R = reason(e);
  const ready: L = t.cls === 'timeline' ? [`The ${t.name} panel opened from this entry with its inputs set`, `從這個入口開啟的 ${t.name} 面板，輸入都設定好`] : [`The ${t.name} page opened from this entry with its inputs filled as in fixtures.md`, `從這個入口開啟的 ${t.name} 頁面，依 fixtures.md 填好輸入`];
  const where: L = e.editor
    ? ['Step 3: record where the result lands from this entry (its result page, this project\'s timeline in place of or after the selected item, an overlay track, or only My Artwork)', '步驟 3：記下從這個入口產生的結果放到哪裡（結果頁、這個專案的時間軸並取代或接在選取項目後面、子母畫面軌，或只在 My Artwork）']
    : ['Step 3: record where the result lands from this entry (its result page, My Artwork, or the album only)', '步驟 3：記下從這個入口產生的結果放到哪裡（結果頁、My Artwork，或只存在相簿）'];
  const cc: L[] = [['Last step: one valid C2PA manifest signed by CyberLink, no provider manifest and no ingredient', '最後一步：只有一份有效、由 CyberLink 簽署的 C2PA manifest，沒有供應商的 manifest，也沒有 ingredient']];
  if (t.cls === 'video' || t.cls === 'image') {
    const vid = t.cls === 'video';
    add('main', sec, [OFF, ready, CREDITS],
      [['Tap the generate button', '點產生按鈕'], ['Wait until the result is ready', '等結果完成'], ['Look where the result shows', '查看結果出現在哪裡'], [`Open it from AI Magic › 「My Artwork」 › ${t.name}`, `從 AI Magic › 「My Artwork」 › ${t.name} 開啟這個結果`], tap('Save'), COPY,
        vid ? FRAMES : ['Look at the saved image on the computer', '在電腦上查看儲存的圖片'], ['Read its Content Credentials (c2patool <file>)', '讀取它的 Content Credentials（c2patool <file>）']],
      [['Step 1: the credits taken equal the price on the button', '步驟 1：扣的點數等於按鈕上的價格'], where,
        [`Step 4: the result is listed in My Artwork under ${t.name} and shows no AI label there`, `步驟 4：My Artwork 的 ${t.name} 底下有這個結果，而且那裡沒有 AI 標記`],
        vid ? ['Step 7: the AI label is at the top-left at 0.0 s and 1.9 s, 12% of the short side, gone at 2.1 s', '步驟 7：左上角在 0.0 s 和 1.9 s 有 AI 標記，大小為短邊的 12%，2.1 s 消失'] : ['Step 7: the AI label is in the top-left corner at 12% of the short side', '步驟 7：左上角有 AI 標記，大小為短邊的 12%'],
        ['Step 8: one valid C2PA manifest signed by CyberLink, no provider manifest and no ingredient', '步驟 8：只有一份有效、由 CyberLink 簽署的 C2PA manifest，沒有供應商的 manifest，也沒有 ingredient']],
      'P1', `R-060, ${vid ? 'R-018, R-019' : 'R-024, R-025'}, R-050, R-056; ${REQ}`,
      join2(Q21, t.autoSave ? ['This tool also writes a gallery copy by itself when the task finishes (KP-079): record that file too.', '這個工具在工作完成時會自己存一份到相簿（KP-079）：這個檔案也要記下來。'] : ['', ''], e.partial ?? ['', '']), R, e);
  } else if (t.cls === 'timeline') {
    add('main', sec, [OFF, ready, CREDITS],
      [['Apply it (generate where the panel asks)', '套用（面板要求時先產生）'], ['Look at the timeline', '查看時間軸'], ['Play the project from 0:00 in the editor preview', '在編輯器預覽從 0:00 播放專案'], ['Tap 「Export」', '點「Export」'], ['Tap 「Export」 in the AIGC dialog', '在 AIGC 對話框點「Export」'], ['Tap 「Produce」', '點「Produce」'], COPY, FRAMES, ['Read its Content Credentials (c2patool <file>)', '讀取它的 Content Credentials（c2patool <file>）']],
      [['Step 1: the credits taken equal the price shown', '步驟 1：扣的點數等於畫面上的價格'],
        [`Step 2: the ${t.name} content is on this project's timeline: record which track and where`, `步驟 2：${t.name} 的內容在這個專案的時間軸上：記下在哪一軌、哪個位置`],
        ['Step 3: the AI label shows at the top-left of the preview for the first two seconds, then disappears', '步驟 3：預覽左上角在前兩秒顯示 AI 標記，之後消失'],
        ['Step 4: the export AIGC dialog appears', '步驟 4：跳出匯出用的 AIGC 對話框'],
        ['Step 8: the AI label is at the top-left at 0.0 s and 1.9 s, gone at 2.1 s', '步驟 8：左上角在 0.0 s 和 1.9 s 有 AI 標記，2.1 s 消失'],
        [`Step 9: record the manifest (signer, actions, ingredient) or 「No claim found」 and any difference from ${ID.c2paExport}: the spec is silent (Q-13), so record it as Fail (question) for PM`, `步驟 9：記下 manifest（簽署者、action、ingredient）或「No claim found」，以及和 ${ID.c2paExport} 的差異：規格沒寫（Q-13），記為 Fail（question）交給 PM`]],
      'P1', `R-060, R-037, R-038, R-043, R-053; ${REQ}`, join2(Q21, ['Q-10 for step 3.', '步驟 3 見 Q-10。'], ONE_WAY_EXPORT), R, e);
  } else {
    const android: L = ios ? ['', ''] : ['Fails at step 1 while DRA262611P0229 (no music dialog) is open: then go on from step 3. Songs carry no claim on Android (KF-008, a defect).', '在 DRA262611P0229（沒有音樂對話框）修好之前步驟 1 會 Fail：接著從步驟 3 繼續。Android 的歌曲沒有 claim（KF-008，屬於缺陷）。'];
    add('main', sec, [OFF, ['AI Music Generator open from this entry with a description typed', '從這個入口開啟 AI Music Generator 並輸入描述'], CREDITS],
      [tap('Generate for ◆ 6'), ['Tap 「Generate」 in the AIGC dialog (checkbox left unticked)', '在 AIGC 對話框點「Generate」（核取方塊維持未勾選）'], ['When the song is ready, play it from the start in My AI Music', '歌曲完成後，在 My AI Music 從頭播放'], ['Save (or download) the song and copy it to the computer', '儲存（或下載）這首歌並複製到電腦'], ['Read its Content Credentials (c2patool <file>)', '讀取它的 Content Credentials（c2patool <file>）']],
      [['Step 1: the dialog 「AIGC Watermark」 opens with 「Don’t show again」, 「Cancel」 and 「Generate」', '步驟 1：跳出「AIGC Watermark」對話框，有「Don’t show again」、「Cancel」和「Generate」'],
        ['Step 2: the popup 「Generating...」 with a percentage and 「Go to My AI Music」 appears', '步驟 2：跳出「Generating...」視窗，顯示百分比和「Go to My AI Music」'],
        ['Step 3: the song is listed in My AI Music and starts straight with the music, with no spoken clip', '步驟 3：這首歌列在 My AI Music，一開始就是音樂，沒有語音提示'],
        ['Step 5: one valid C2PA manifest signed by CyberLink, no provider manifest and no ingredient', '步驟 5：只有一份有效、由 CyberLink 簽署的 C2PA manifest，沒有供應商的 manifest，也沒有 ingredient']],
      'P1', `R-060, R-027, R-029, R-055, R-050; ${REQ}`, join2(Q21, android, ONE_WAY_MUSIC), R, e);
    add('mCancel', sec, [OFF, ['The music 「AIGC Watermark」 dialog open from this entry', '從這個入口開啟的音樂版「AIGC Watermark」對話框'], CREDITS], [tap('Cancel')],
      [['The dialog closes', '對話框關閉'], ['The AI Music Generator page opened from this entry shows again with the same inputs', '回到從這個入口開啟的 AI Music Generator 頁面，輸入都沒變'], ['The credit balance is unchanged', '點數餘額不變']],
      'P2', `R-028; ${REQ}`, join2(android, ONE_WAY_MUSIC), R, e);
    if (!ios) add('mBack', sec, [OFF, ['The music 「AIGC Watermark」 dialog open from this entry', '從這個入口開啟的音樂版「AIGC Watermark」對話框']], [['Press system Back', '按系統返回鍵']],
      [['The dialog closes like 「Cancel」', '對話框像按「Cancel」一樣關閉'], ['Nothing is generating', '沒有任何生成作業']], 'P2', `R-054; ${REQ}`, join2(android, ONE_WAY_MUSIC), R, e);
  }
}
function uiPass(e: Entry) { landing(e); values(e); controls(e); mainAction(e); exits(e); }

// ---------------------------------------------------------------- result-page entries and the inventory
type REntry = { path: L; source: string; open: L[] };
const R_ENTRIES: REntry[] = [
  { path: ['☰ Menu › My Artwork', '☰ Menu › My Artwork'], source: 'Design d-aigc-settings (the Menu lists My Artwork), KP-020', open: [['Open Home › ☰ Menu', '開啟 Home › ☰ Menu'], tap('My Artwork')] },
  { path: ['Mine › My Artwork', 'Mine › My Artwork'], source: 'KP-029 / KP-032 (Mine › 「My Artwork >」)', open: [['Tap the last tab of the bottom bar (「Mine」, 「Pro」 on a paid Android account)', '點底部列最後一個分頁（「Mine」；Android 付費帳號顯示「Pro」）'], tap('My Artwork')] },
];
function resultEntry(re: REntry) {
  const sec: L = [`Entry › ${re.path[0]}`, `入口 › ${re.path[1]}`];
  const why: L = [`${REQ}: My Artwork reached from ${re.path[0]}, a UI pass from this entry (pass 12)`, `${REQ}：從 ${re.path[1]} 進入 My Artwork，這個入口做一次 UI 檢查（pass 12）`];
  const q: L = ['The spec draws My Artwork from AI Magic only; this row asserts the same page (pass 12).', '規格只畫了從 AI Magic 進入 My Artwork；這一列以同一個頁面為準（pass 12）。'];
  add('rLanding', sec, [OFF, ['Image to Video and Text to Image results in My Artwork, none saved yet', 'My Artwork 裡有 Image to Video 和 Text to Image 的結果，都還沒儲存']], [...re.open, ['Look at the Image to Video and Text to Image thumbnails', '查看 Image to Video 和 Text to Image 的縮圖']],
    [[`Step ${re.open.length}: My Artwork opens with the same tiles as AI Magic › 「My Artwork」 (record whether it is a page of its own or the AI Magic tab)`, `步驟 ${re.open.length}：開啟 My Artwork，項目和 AI Magic › 「My Artwork」一樣（記下它是獨立頁面，還是切到 AI Magic 分頁）`],
      [`Step ${re.open.length + 1}: no thumbnail shows an AI label`, `步驟 ${re.open.length + 1}：縮圖都沒有 AI 標記`]],
    'P2', `R-059, R-018, R-024; ${REQ}`, q, why);
  add('controls', sec, [OFF, [`My Artwork opened from ${re.path[0]}`, `從 ${re.path[1]} 開啟的 My Artwork`]],
    [['Press every control once: each tile, a task list\'s 「View」, each Share target (leave without posting), 「Full Editor」 or 「Add to Timeline」, and each back control', '每個控制項各按一次：每個項目、任務清單的「View」、每個分享目標（不發佈就離開）、「Full Editor」或「Add to Timeline」，以及每個返回按鈕']],
    [['Each control responds as it does from AI Magic › 「My Artwork」', '每個控制項的反應都和從 AI Magic › 「My Artwork」進入時一樣'], NO_ERR, ['Nothing is posted', '沒有發佈任何內容']],
    'P2', `R-065; ${REQ}`, join2(['Checklist: the controls the My Artwork rows press (TC-017 – TC-053). One press each, no combinations. Never post.', '檢查清單：My Artwork 那幾列按到的控制項（TC-017 – TC-053）。每個只按一次，不做組合。絕對不要發佈。'], q), why);
  add('main', sec, [OFF, [`An Image to Video result opened from ${re.path[0]} › Image to Video › 「View」, never saved`, `從 ${re.path[1]} › Image to Video › 「View」開啟、從未儲存過的 Image to Video 結果`]],
    [tap('Save'), ['Copy the saved video to the computer', '把儲存的影片複製到電腦'], FRAMES, ['Read its Content Credentials (c2patool <file>)', '讀取它的 Content Credentials（c2patool <file>）']],
    [['Step 3: the AI label is at the top-left at 0.0 s and 1.9 s, 12% of the short side, gone at 2.1 s', '步驟 3：左上角在 0.0 s 和 1.9 s 有 AI 標記，大小為短邊的 12%，2.1 s 消失'], ['Step 4: one valid C2PA manifest signed by CyberLink, no provider manifest and no ingredient', '步驟 4：只有一份有效、由 CyberLink 簽署的 C2PA manifest，沒有供應商的 manifest，也沒有 ingredient']],
    'P1', `R-019, R-050, R-056; ${REQ}`, ['', ''], why);
  if (!ios) add('exit', sec, [[`My Artwork opened from ${re.path[0]}`, `從 ${re.path[1]} 開啟的 My Artwork`]], [['Press system Back', '按系統返回鍵']],
    [[`The screen it was opened from shows again (${re.path[0].split(' › ')[0]})`, `畫面回到開啟它的地方（${re.path[1].split(' › ')[0]}）`], NO_ERR], 'P3', `R-061; ${REQ}`, q, why);
}
function bannerEntry() {
  const sec: L = ['Entry › Editor completion banner › View', '入口 › 編輯器完成通知 › View'];
  const why: L = [`${REQ}: a result reached from the editor's completion banner, a UI pass from this entry (pass 12)`, `${REQ}：從編輯器的完成通知開啟結果，這個入口做一次 UI 檢查（pass 12）`];
  add('bLanding', sec, [OFF, ['An Image to Video task started from the editor (Global toolbar › 「AI Magic」), the editor left open until it finishes', '從編輯器（Global 工具列 › 「AI Magic」）開始一個 Image to Video 工作，編輯器一直開著直到完成']],
    [['Wait for the banner 「Good news! Your … task has been completed. Tap here to view your results.」', '等待通知橫幅「Good news! Your … task has been completed. Tap here to view your results.」'], tap('View')],
    [['Step 1: the banner shows over the preview with 「Close」 and 「View」', '步驟 1：預覽上方出現通知橫幅，有「Close」和「View」'], ['Step 2: the task\'s result page opens, as from My Artwork\'s 「View」, with 「Save」', '步驟 2：開啟這個工作的結果頁，和從 My Artwork 點「View」一樣，有「Save」']],
    'P2', `R-059, R-023, R-062; ${REQ}`, join2(Q21, ['Q-22: KP-055 records the banner on iOS; if this build shows none, record that as Fail (question) and mark the rest of this Section Blocked.', 'Q-22：KP-055 記錄 iOS 有這個通知橫幅；如果這個版本沒有，記為 Fail（question），這個區塊其餘的列記為 Blocked。']), why);
  add('main', sec, [OFF, ['The result page opened from the banner\'s 「View」', '從通知橫幅「View」開啟的結果頁']], [tap('Save'), ['Copy the saved video to the computer', '把儲存的影片複製到電腦'], FRAMES, ['Read its Content Credentials (c2patool <file>)', '讀取它的 Content Credentials（c2patool <file>）']],
    [['Step 3: the AI label is at the top-left at 0.0 s and 1.9 s, 12% of the short side, gone at 2.1 s', '步驟 3：左上角在 0.0 s 和 1.9 s 有 AI 標記，大小為短邊的 12%，2.1 s 消失'], ['Step 4: one valid C2PA manifest signed by CyberLink, no provider manifest and no ingredient', '步驟 4：只有一份有效、由 CyberLink 簽署的 C2PA manifest，沒有供應商的 manifest，也沒有 ingredient']],
    'P1', `R-019, R-050, R-056; ${REQ}`, ['', ''], why);
  add('bClose', sec, [['A finished task\'s banner showing in the editor', '編輯器顯示一個工作完成的通知橫幅']], [tap('Close')],
    [['The banner closes and the editor stays as it was', '通知橫幅關閉，編輯器維持原狀'], ['The result stays in My Artwork', '結果仍在 My Artwork']], 'P3', `R-061; ${REQ}`, Q21, why);
}
function inventory() {
  const sec: L = ['Entry › Launcher, AI Magic tab and other entries', '入口 › Launcher、AI Magic 分頁和其他入口'];
  return add('inventory', sec, [['Signed in with the test account (fixtures.md)', '以測試帳號登入（fixtures.md）']],
    [['On the Launcher, look through the big shortcuts and both pages of small shortcut tiles', '在 Launcher 上查看大捷徑和兩頁小捷徑'], ['Look through the 「AI-Powered Creation」 row and its 「View more」', '查看「AI-Powered Creation」這一列和它的「View more」'], ['Open the AI Magic tab and list its tools', '開啟 AI Magic 分頁，列出所有工具'], ['On an Image to Video and a Text to Image result page, list 「You might also like」', '在 Image to Video 和 Text to Image 的結果頁，列出「You might also like」的項目']],
    [['Steps 1–4: record every item that opens one of this table\'s tools, with its path', '步驟 1–4：記下每個會開啟本表工具的項目和它的路徑'], ['Steps 1–4: every such item is listed under requirements.md › ### Entry points', '步驟 1–4：這些項目都列在 requirements.md › ### Entry points'], ['Steps 1–4: an item that is not listed there is a gap: record its path, and the next draft gives it a Section of its own', '步驟 1–4：沒有列在那裡的項目算是缺口：記下它的路徑，下一版草稿會為它加一個區塊']],
    'P2', `R-063; ${REQ}`, ['The tiles and rows are set on the CMS (KP-012) and can change between runs, so this row is run every round.', '捷徑和各列內容由 CMS 設定（KP-012），每次 run 都可能不同，所以每一輪都要跑這一列。'],
    [`${REQ}: Launcher, AI Magic tab and 「You might also like」 entries are set on the CMS; one row inventories them (pass 12)`, `${REQ}：Launcher、AI Magic 分頁和「You might also like」的入口由 CMS 設定；用一列盤點（pass 12）`]);
}

// ---------------------------------------------------------------- the rows
const rows = body.map(r => [...r, 'unchanged', '']);
const find = (id: string) => { const r = rows.find(x => x[col('ID')] === id); if (!r) throw new Error(`no ${id}`); return r; };
const modified: { id: string; zhPre: string; zhNotes: string; zhWhy: string }[] = [];
// Pin the primary entry of the timeline tools (the existing rows said only 「added from the editor」).
const PIN: { id: string; tool: string; en: string; zh: string; zhTool: string; extra?: L }[] = [
  { id: ID.tts, tool: 'AI Text to Speech', en: 'A new project with one non-AI video clip and AI Text to Speech content added with the editor\'s Global toolbar › 「Audio」 › 「Text to speech」 (nothing selected)', zh: '新專案，含一段非 AI 影片，並用編輯器 Global 工具列 › 「Audio」 › 「Text to speech」加入 AI Text to Speech 內容（沒有選取片段）', zhTool: 'AI Text to Speech' },
  { id: ID.vc, tool: 'Voice Changer', en: 'A new project with one non-AI video clip and Voice Changer content added with that clip\'s Video toolbar › 「Audio Tools」 › 「AI Voice Changer」', zh: '新專案，含一段非 AI 影片，並用這段影片的 Video 工具列 › 「Audio Tools」 › 「AI Voice Changer」加入 Voice Changer 內容', zhTool: 'Voice Changer' },
  { id: ID.anime, tool: 'AI Anime', en: 'A new project with one non-AI video clip and AI Anime content made with that clip\'s Video toolbar › 「Effects」 › 「AI Anime Video」 and put on the timeline', zh: '新專案，含一段非 AI 影片，並用這段影片的 Video 工具列 › 「Effects」 › 「AI Anime Video」產生 AI Anime 內容，放上時間軸', zhTool: 'AI Anime', extra: [' Q-11: the sheet\'s only anime tool in the editor is AI Anime Video, the one Android R3 used here; another AI Anime tool found on this build is recorded with where it was.', 'Q-11：對照表裡編輯器唯一的動漫工具是 AI Anime Video，也就是 Android R3 在這裡用的；如果這個版本有別的 AI Anime 工具，記下它的位置。'] },
  { id: ID.cartoon, tool: 'AI Cartoon', en: 'A new project with one non-AI video clip and a non-AI photo after it, the photo turned to AI Cartoon with the Photo toolbar › 「Portrait」 › 「AI Style Transfer」 › 「AI Cartoon」', zh: '新專案，含一段非 AI 影片，後面接一張非 AI 相片，用 Photo 工具列 › 「Portrait」 › 「AI Style Transfer」 › 「AI Cartoon」把相片轉成 AI Cartoon', zhTool: 'AI Cartoon', extra: [' The sheet places AI Style Transfer under Portrait; Android R1 (2611161) found it under the photo\'s Effects and R3 (2611193) not in the editor at all (Q-11, Q-22).', '對照表把 AI Style Transfer 放在 Portrait 底下；Android R1（2611161）是在相片的 Effects 裡找到，R3（2611193）則在編輯器裡完全找不到（Q-11、Q-22）。'] },
  { id: ID.sketch, tool: 'AI Sketch', en: 'A new project with one non-AI video clip and a non-AI photo after it, the photo turned to AI Sketch with the Photo toolbar › 「Portrait」 › 「AI Style Transfer」 › 「AI Sketch」', zh: '新專案，含一段非 AI 影片，後面接一張非 AI 相片，用 Photo 工具列 › 「Portrait」 › 「AI Style Transfer」 › 「AI Sketch」把相片轉成 AI Sketch', zhTool: 'AI Sketch', extra: [' The sheet places AI Style Transfer under Portrait; Android R1 (2611161) found it under the photo\'s Effects and R3 (2611193) not in the editor at all (Q-11, Q-22).', '對照表把 AI Style Transfer 放在 Portrait 底下；Android R1（2611161）是在相片的 Effects 裡找到，R3（2611193）則在編輯器裡完全找不到（Q-11、Q-22）。'] },
];
const zhApproved = existsSync(join(TABLE, 'cases.zh-Hant.csv')) ? Object.fromEntries(parseCsv(readFileSync(join(TABLE, 'cases.zh-Hant.csv'), 'utf8').replace(/^﻿+/, '')).slice(1).map(r => [r[0], r])) : {};
for (const p of PIN) {
  const r = find(p.id);
  const pre = r[col('Precondition')].split('\n');
  if (pre.length !== 2 || !pre[1].includes('added from the editor') || !pre[1].includes(p.tool)) throw new Error(`${PLATFORM}: ${p.id} is not the ${p.tool} primary row (${pre[1]})`);
  pre[1] = `2. ${p.en}`;
  r[col('Precondition')] = pre.join('\n');
  r[col('Spec Ref')] = `${r[col('Spec Ref')]}, R-059; ${REQ}`;
  r[col('Notes')] = `${r[col('Notes')]} Primary entry of ${p.tool} (### Entry points); the rows after it in this group use the same project.${p.extra?.[0] ?? ''}`;
  r[H.length] = 'modified';
  r[H.length + 1] = `${REQ}: the precondition names the primary entry, so the other entries' Sections can be told from it (pass 12)`;
  const z = zhApproved[p.id];
  modified.push({ id: p.id, zhPre: `${(z?.[2] ?? '').split('\n')[0] || '1. ' + OFF[1]}\n2. ${p.zh}`, zhNotes: `${z?.[7] ?? ''}這是 ${p.zhTool} 的主要入口（### Entry points）；這一組後面的列都用同一個專案。${p.extra?.[1] ?? ''}`, zhWhy: `${REQ}：前置條件寫明主要入口，才能和其他入口的區塊區分（pass 12）` });
}

inventory();
for (const e of ENTRIES) {
  uiPass(e);
}
for (const re of R_ENTRIES) resultEntry(re);
bannerEntry();

// Placement: the entry Sections after the C2PA rows and before the one-way rows (music tick, export tick); MUI stays last.
rows.splice(rows.indexOf(find(ID.c2paExport)) + 1, 0, ...newRows.map(n => n.en));
if (rows[rows.length - 1][col('Section')] !== 'MUI') throw new Error('the MUI section is no longer last');
writeFileSync(join(DIR, 'draft.csv'), (bom ? '﻿' : '') + toCsv([[...H, 'Change', 'Change Reason'], ...rows]));

// ---------------------------------------------------------------- requirements.md
const span = (ids: string[]) => {
  const n = [...new Set(ids.map(num))].sort((a, b) => a - b), out: string[] = [];
  for (let i = 0; i < n.length;) { let j = i; while (n[j + 1] === n[j] + 1) j++; out.push(j - i >= 2 ? `${tc(n[i])} – ${tc(n[j])}` : n.slice(i, j + 1).map(tc).join(', ')); i = j + 1; }
  return out.join(', ');
};
const of = (pred: (n: NewRow) => boolean) => span(newRows.filter(pred).map(n => n.id));
const bySection = new Map<string, string[]>();
for (const n of newRows) bySection.set(n.section, [...(bySection.get(n.section) ?? []), n.id]);
const secRows = (s: string) => span(bySection.get(s) ?? []);

let req = readFileSync(join(TABLE, 'requirements.md'), 'utf8');
const reqSwap = (from: string | RegExp, to: string, what: string) => {
  const hit = typeof from === 'string' ? req.includes(from) : from.test(req);
  if (!hit) throw new Error(`${PLATFORM}: requirements.md: ${what} not found`);
  req = req.replace(from, to);
};
const total = newRows.length;
reqSwap(/\n## (Settings entry)/, `\nDraft ${DRAFT} [Req: ${REQ}]: every entry point of every tool in the table is tested in full (analysis.md pass 12; user, 2026-11-26:
${QUOTE}). The entries come from the product team's toolbar sheet (tab 「2026/11 Auto Reframe」, [KB: KP-107]), the knowledge
and the Android runs (### Entry points); each non-primary entry gets its own Section 「Entry › <path>」 with a UI pass (user, 2026-11-26:
「for each entry, it should only check the UI, so click everything once and make sure there's no errors for each button and options」):
landing, the values read from its input, every control once, the main action once (where the result lands, watermark and
Content Credentials) and every exit once. New: R-059 – R-065, Q-22; ${total} new rows (${span(newRows.map(n => n.id))}); the timeline tools' first rows
(${[ID.tts, ID.vc, ID.anime, ID.cartoon, ID.sketch].join(', ')}) now name their primary entry.\n\n## $1`, 'Settings entry heading');

const NEW_REQ = `
## Entry points (pass 12)
- R-059 [Rule 12: every entry point; Req: ${REQ}; KB: KP-107] A tool opened from any place under ### Entry points opens with the same page or panel, inputs and credit price as from its primary entry; what the entry brings in (the selected clip, photo, audio or title, or nothing) is recorded.
- R-060 [Rule 12; Req: ${REQ}; PM:pm-rules My Artwork Page] A result made through a non-primary entry lands where the primary entry's results do: video and image results in My Artwork under the tool's tile, songs in My AI Music, timeline-tool content on the open project's timeline; where an editor entry also puts the result on its own project is recorded.
- R-061 [Rule 12; Req: ${REQ}] Leaving the tool before anything is made (its back control, and system Back on Android) returns to the screen it was opened from as it was (for an editor entry: the same project, selection and playhead) and takes no credits.
- R-062 [KB: KP-107; Req: ${REQ}] The places the toolbar sheet gives (with its bracket notes such as 「7/E」, 「8/M」, 「4/E IOS」) and those the knowledge records on one platform are in the build; one that is missing is recorded with what the menu lists instead (Q-22).
- R-063 [Rule 12; Req: ${REQ}; KB: KP-012] The CMS-set entries (Launcher big and small shortcuts, 「AI-Powered Creation」, the AI Magic tab list, a result page's 「You might also like」) are inventoried at each run; one that opens a tool of this table and is not under ### Entry points is a gap for the next draft.
- R-064 [Rule 12; Req: ${REQ}] A tool opened from an entry with an input (a selected clip, photo, audio clip or title, or a picked file) shows that input's own values: thumbnail, length, trim range, fps, resolution, aspect and text match the input.
- R-065 [Rule 12; Req: ${REQ}] Every control and option of a tool opened from a non-primary entry, pressed once, responds as from the primary entry, with no error, crash, freeze, empty state or wrong value.
`;
reqSwap(/\n## MUI\n/, `${NEW_REQ}\n## MUI\n`, 'MUI heading');

const landingIds = of(n => n.kind === 'landing'), landsIds = of(n => n.kind === 'main'), valuesIds = of(n => n.kind === 'values'), controlIds = of(n => n.kind === 'controls'), exitIds = of(n => n.kind === 'exit' || n.kind === 'bClose');
const sheetLanding = of(n => n.kind === 'landing' && !!(n.entry?.sheet || n.entry?.seen)) ;
const inv = newRows.find(n => n.kind === 'inventory')!.id;
const NEW_Q = `- Q-22 Places the build may lack: the toolbar sheet's release notes (Video Edit by Chat 「8/M」 / 「7/E」, Cinematic Reel Creator 「7/E」, 「AI Remove (4/E IOS)」), 「AI Remove」 taken to be Video Object Removal (not named in the sheet), AI Style Transfer (AI Cartoon, AI Sketch) under Portrait while Android R3 found none in the editor, and entries known only on one platform (the Launcher big shortcut, KP-010; AI Art's 「Turn the image into a video」, KP-090; Add Music › AI Music Generator, KP-097; the completion banner, KP-055). Assumption: each is present as listed. Rows: the first row of each such Section records presence (${sheetLanding}, ${newRows.find(n => n.kind === 'bLanding')!.id}). R-062.
`;
reqSwap(/\n\n## Added 2026-11-17/, `\n${NEW_Q.trimEnd()}\n\n## Added 2026-11-17`, 'end of Open questions');

// ### Entry points
const PRIMARY_LIST: [string, string, string][] = [
  ['vebc', 'Video Edit by Chat', 'Launcher › AI Magic tab › Video Edit by Chat; results in AI Magic › My Artwork (PM pm-rules My Artwork flow)'],
  ['i2v', 'Image to Video', 'Launcher › AI Magic tab › Image to Video; AI Magic › My Artwork › Image to Video (PM flow arrows 86-968, 86-970)'],
  ['crc', 'Cinematic Reel Creator', 'Launcher › AI Magic tab › Cinematic Reel Creator; My Artwork'],
  ['cms', 'Character Motion Swap', 'Launcher › AI Magic tab › Character Motion Swap; My Artwork (not in the toolbar sheet: no other entry known)'],
  ['vor', 'Video Object Removal', 'Launcher › AI Magic tab › Video Object Removal; My Artwork (Android: not offered, KP-082)'],
  ['story', 'AI Storytelling', 'Launcher › AI Magic tab › AI Storytelling; its own history 「Generated Story」 on Android (KP-085) (not in the toolbar sheet: no other entry known)'],
  ['t2v', 'Text to Video', 'Launcher › AI Magic tab › Text to Video; My Artwork'],
  ['aav', 'AI Anime Video', 'Launcher › AI Magic tab › AI Anime Video; My Artwork'],
  ['ta', 'Talking Avatar', 'Launcher › AI Magic tab › Talking Avatar; My Artwork'],
  ['art', 'AI Art', 'Launcher › AI Magic tab › AI Art; My Artwork'],
  ['t2i', 'Text to Image', 'Launcher › AI Magic tab › Text to Image; My Artwork'],
  ['tts', 'AI Text to Speech', 'Editor › Global toolbar › Audio › Text to speech (the path Android R3 used; pinned in the first row)'],
  ['vc', 'AI Voice Changer', 'Editor › Video toolbar › Audio Tools › AI Voice Changer (pinned in the first row)'],
  ['anime', 'AI Anime (timeline)', 'Editor › Video toolbar › Effects › AI Anime Video (the path Android R3 used; pinned in the first row)'],
  ['cartoon', 'AI Cartoon (timeline)', 'Editor › Photo toolbar › Portrait › AI Style Transfer › AI Cartoon (pinned in the first row)'],
  ['sketch', 'AI Sketch (timeline)', 'Editor › Photo toolbar › Portrait › AI Style Transfer › AI Sketch (pinned in the first row)'],
  ['music', 'AI Music Generator', 'Launcher › AI Magic tab › AI Music Generator (the path the Android runs used)'],
];
const epLines: string[] = [];
const toolOrder = ['Video Edit by Chat', 'Image to Video', 'Cinematic Reel Creator', 'Character Motion Swap', 'Video Object Removal', 'AI Storytelling', 'Text to Video', 'AI Anime Video', 'Talking Avatar', 'AI Art', 'Text to Image', 'AI Text to Speech', 'AI Voice Changer', 'AI Anime (timeline)', 'AI Cartoon (timeline)', 'AI Sketch (timeline)', 'AI Music Generator'];
const groupOf = (e: Entry) => ['AI Cartoon', 'AI Sketch'].includes(e.tool.name) ? `${e.tool.name} (timeline)` : e.tool.name;
for (const name of toolOrder) {
  const p = PRIMARY_LIST.find(x => x[1] === name)!;
  epLines.push(`- ${name} · ${p[2]} · both · **primary**, rows ${PRIMARY_ROWS[p[0]]} (existing)`);
  for (const e of ENTRIES.filter(x => groupOf(x) === name)) {
    const s = `Entry › ${e.path[0]}`;
    epLines.push(`- ${e.tool.name} · ${e.path[0]} · ${e.source} · both${e.seen ? ' (known on one platform: presence recorded, Q-22)' : ''} · Section 「${s}」, rows ${secRows(s)}${e.partial ? ` (timeline part: ${ID.animeSpan})` : ''}`);
  }
}
const EP = `### Entry points
One line per tool × entry (pass 12): path · where it comes from · platforms · Section. The toolbar sheet is the product
team's 「PDRM Toolbar re-org」, tab 「2026/11 Auto Reframe」 [KB: KP-107]; its bracket notes are kept. A primary entry's
rows are the existing ones (the full table); every other entry has its own Section with a UI pass: landing and what it
brings in, the values read from its input, every control and option once (no combinations), the main action once (where
the result lands, watermark and Content Credentials on it) and every exit${ios ? '' : ' and system Back'} once. AI Anime (timeline) is AI Anime Video from the Video toolbar's Effects, listed under AI Anime Video.
${epLines.join('\n')}
- My Artwork results · ☰ Menu › My Artwork · Design d-aigc-settings, KP-020 · both · Section 「Entry › ☰ Menu › My Artwork」, rows ${secRows('Entry › ☰ Menu › My Artwork')}
- My Artwork results · Mine › My Artwork · KP-029, KP-032 · both · Section 「Entry › Mine › My Artwork」, rows ${secRows('Entry › Mine › My Artwork')}
- Results of a task started in the editor · Editor completion banner › 「View」 · KP-055 (iOS) · both (presence recorded, Q-22) · Section 「Entry › Editor completion banner › View」, rows ${secRows('Entry › Editor completion banner › View')}
- Launcher shortcuts, 「AI-Powered Creation」, the AI Magic tab list, 「You might also like」 · CMS-set (KP-012) · both · Section 「Entry › Launcher, AI Magic tab and other entries」, row ${inv} (inventory)
- MUI rows are not copied per entry (pass 12 brief): the strings are the same dialogs and sheet wherever they open.
`;
reqSwap(/\n### Flow arrows walked by existing rows\n/, `\n${EP}\n### Flow arrows walked by existing rows\n`, 'Flow arrows heading');

// grids
const addToTable = (heading: string, add: string[]) => {
  const i = req.indexOf(`\n### ${heading}\n`); if (i < 0) throw new Error(`no ### ${heading}`);
  const after = req.slice(i);
  const m = after.match(/\n\|[^\n]*\|\n(?!\|)/) ?? after.match(/\n\|[^\n]*\|$/); if (!m) throw new Error(`no table under ### ${heading}`);
  const end = i + m.index! + m[0].replace(/\n$/, '').length;
  req = req.slice(0, end) + '\n' + add.join('\n') + req.slice(end);
};
const exitTap = of(n => (n.kind === 'exit' && /Tap the/.test(n.en[col('Action')])) || n.kind === 'bClose');
const exitBack = of(n => n.kind === 'exit' && /system Back/.test(n.en[col('Action')]));
const musicCancel = of(n => n.kind === 'mCancel'), musicBack = of(n => n.kind === 'mBack');
addToTable('Exit × stage', [
  `| Tool page or panel opened from a non-primary entry (pass 12) | ${exitTap} | ${ios ? 'n/a (iOS has no system Back)' : exitBack} |`,
  `| Music dialog open from a non-primary entry | ${musicCancel} | ${ios ? 'n/a (iOS has no system Back)' : musicBack} |`,
]);
addToTable('Request ledger coverage', [
  `| ${REQ} (table: every entry point, full table from the primary entry and a UI pass from each other one, 2026-11-26) | R-059 – R-065; ### Entry points; ${[ID.tts, ID.vc, ID.anime, ID.cartoon, ID.sketch].join(', ')} pinned to their primary entry |`,
]);
writeFileSync(join(DIR, 'requirements.md'), req);

// questions.zh-Hant.json
const zhQ: Record<string, string> = JSON.parse(readFileSync(join(TABLE, 'questions.zh-Hant.json'), 'utf8'));
zhQ['Q-22'] = `這個版本可能沒有的入口：工具列對照表的上線註記（Video Edit by Chat「8/M」／「7/E」、Cinematic Reel Creator「7/E」、「AI Remove (4/E IOS)」）；「AI Remove」假設就是 Video Object Removal（對照表沒寫這個名稱）；AI Style Transfer（AI Cartoon、AI Sketch）放在 Portrait 底下，但 Android R3 在編輯器裡找不到；以及只在單一平台看過的入口（Launcher 大捷徑 KP-010、AI Art 的「Turn the image into a video」KP-090、Add Music › AI Music Generator KP-097、完成通知橫幅 KP-055）。假設：都和清單一樣存在。觀察的案例：每個這類區塊的第一列都會記錄入口在不在（${sheetLanding}、${newRows.find(n => n.kind === 'bLanding')!.id}）。`;
writeFileSync(join(DIR, 'questions.zh-Hant.json'), JSON.stringify(zhQ, null, 2) + '\n');

// ---------------------------------------------------------------- carried over
copyFileSync(join(TABLE, 'control-trace.json'), join(DIR, 'control-trace.json'));
copyFileSync(join(TABLE, 'drafts', PREV, 'annotation-trace.json'), join(DIR, 'annotation-trace.json'));
const phases = JSON.parse(readFileSync(join(TABLE, 'drafts', PREV, 'phases.json'), 'utf8'));
phases.draft = DRAFT;
for (const n of newRows) if (n.kind === 'main') phases.needs[n.id] = ['credits'];
writeFileSync(join(DIR, 'phases.json'), JSON.stringify(phases, null, 2) + '\n');
writeFileSync(join(DIR, 'spec.json'), JSON.stringify({
  feature: 'pdr/aigc-watermark', platform: PLATFORM, title: manifest.title, draft: DRAFT,
  created_at: '2026-11-26T03:16:01.000Z', based_on_version: manifest.version, spec_folder: manifest.spec_folder,
  spec_files: manifest.spec_files, spec_set_sha256: manifest.spec_set_sha256,
}, null, 2) + '\n');

// ---------------------------------------------------------------- update-plan.md
const perTool = new Map<string, number>();
for (const n of newRows) { const k = n.entry ? n.entry.tool.name + (n.entry.tool.cls === 'timeline' ? ' (timeline)' : '') : n.section.replace(/^Entry › /, ''); perTool.set(k, (perTool.get(k) ?? 0) + 1); }
const sections = [...bySection.keys()];
writeFileSync(join(DIR, 'update-plan.md'), `# Update plan — AIGC Watermark / ${PLATFORM}: approved v${manifest.version} → draft ${DRAFT}

Based on approved v${manifest.version} (${manifest.cases} rows). Same spec set; the change comes from the request ledger [${REQ}]
(user, 2026-11-26: ${QUOTE}; narrowed the same day: 「for each entry, it should only check the UI, so click everything once
and make sure there's no errors for each button and options」). The primary entry keeps the full table; every other entry of
every tool gets a UI pass (analysis.md pass 12). AIGC Watermark covers the results of many AI tools, so its entry points are
those tools' entries.

## Spec files
- Unchanged: spec set ${manifest.spec_folder}. New or changed: none. No longer supplied: none.
- New input: the product team's toolbar sheet, tab 「2026/11 Auto Reframe」 (KP-107, \`node scripts/entry-points.ts pdr "<tool>"\`).

## Requirement changes
| Requirement | Change | Before | After |
|---|---|---|---|
| R-059 – R-065 | new section 「Entry points (pass 12)」 | — | landing, where the result lands, exits, sheet places present, CMS inventory, input values, every control once |
| Q-22 | new | — | places the sheet lists that the build may lack (entry rows assert the primary behaviour with no question, pass 12) |
| ### Entry points | new | — | every tool × entry with its source and Section |
| Exit × stage | 2 lines | — | tool page / music dialog opened from a non-primary entry |

## Case changes
- New (${total}): ${span(newRows.map(n => n.id))}, in ${sections.length} new Sections 「Entry › …」, placed after ${ID.c2paExport} and before the one-way rows
  (${ID.musicTick}, ${ID.exportTick}). Per tool / entry group:
${[...perTool.entries()].map(([k, v]) => `  - ${k}: ${v}`).join('\n')}
- Modified (${PIN.length}): ${PIN.map(p => p.id).join(', ')} — the precondition names the primary entry of AI Text to Speech, Voice Changer, AI Anime,
  AI Cartoon and AI Sketch (it said only 「added from the editor」), so the existing rows count for that entry.
- Removed (0)
- Unchanged: ${body.length - PIN.length}

## Found by the analysis
- Entry points (pass 12): ${ENTRIES.length} non-primary tool entries + 3 result-page entries + 1 CMS inventory row.
  Tools with no other known entry: Character Motion Swap, AI Storytelling (not in the toolbar sheet).
- UI pass per tool entry (${ios ? 5 : 6} rows): landing and what it brings in · the values read from the input (fps, length, resolution, aspect, text;
  Video Enhance read the wrong fps from a timeline clip) · every control and option once, no combinations · the main action once (credits,
  where the result lands, the watermark on it, Content Credentials) · the back control${ios ? '' : ' and system Back'}. AI Music Generator adds the dialog's 「Cancel」${ios ? '' : ' and system Back'}.
  My Artwork entries: landing, every control once, Save once${ios ? '' : ', system Back'}; the completion banner: landing, Save once, 「Close」.
- Checklist for the controls rows: the controls the primary entry's rows press (named in each row's Notes).
- AI Anime Video from the Video toolbar's Effects: its timeline part is the existing ${ID.animeSpan} (pinned).
- Pass 9 order: the timeline main actions (they open the export dialog) run before ${ID.exportTick}; the music main actions before ${ID.musicTick}.

## Not added (value check)
- Per entry: Save / export with the switch On, Share, limits, failures, tiers, combinations, MUI and one-way states (the 「Don’t show again」 rows):
  they stay with the primary entry (pass 12). An earlier version of this draft (same day) copied the whole flow per entry; replaced by the UI pass.
- Launcher small shortcut tiles per tool: CMS-set and unknown before the run; ${inv} inventories them and the next draft adds a Section
  for each one found.

## How the rows run
- The run plan counts each 「Entry ›」 Section as its own segment (pass 12); phases.json marks the main-action rows \`credits\`.
- Editor entries need the project of each Section's precondition (fixtures.md): a main-track video, a PIP video, a main-track photo, a PIP photo,
  an audio clip with speech, a title.

## Questions for PM
- Q-22 Are the sheet's places all in this release (release notes 「7/E」, 「8/M」, 「4/E IOS」; 「AI Remove」 = Video Object Removal?; AI Style Transfer in the editor)?

## Questions for you
- None.
`);

// Chinese copy: start from the approved one (zh-copy.ts export / merge translate only the new and changed rows)
for (const [from, to] of [['cases.zh-Hant.csv', 'draft.zh-Hant.csv'], ['cases.zh-Hant.prints.json', 'draft.zh-Hant.prints.json']])
  if (existsSync(join(TABLE, from)) && !existsSync(join(DIR, to))) copyFileSync(join(TABLE, from), join(DIR, to));
if (process.env.ZH_OUT) {
  const out: Record<string, Record<string, string>> = {};
  for (const n of newRows) out[n.id] = n.zh;
  for (const m of modified) out[m.id] = { Precondition: m.zhPre, Notes: m.zhNotes, 'Change Reason': m.zhWhy };
  writeFileSync(process.env.ZH_OUT, JSON.stringify(out, null, 1));
}
console.log(`${PLATFORM}: ${body.length} approved rows (${PIN.length} modified) + ${total} new (${span(newRows.map(n => n.id))}) in ${sections.length} Sections → ${join(DIR, 'draft.csv')}`);
