// OCR on any computer (user, 2026-11-25): macOS keeps Apple Vision (scripts/ocr-tiles.swift, ocr-images.swift);
// Windows uses its built-in OCR (scripts/ocr-windows.ps1, Windows.Media.Ocr) with the same outputs, so spec-boards,
// board-lint and the design check work unchanged on either.
// Windows OCR differences: no confidence (WIN_CONF is given to every line), one engine per installed language
// (Traditional Chinese reads English too; Japanese needs its own language pack), and its CJK lines come back as
// words, which are joined here without the spaces the engine puts between characters.
import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

export type OcrLine = { text: string; x: number; y: number; w: number; h: number; conf: number };
export type OcrImage = { w: number; h: number; lines: OcrLine[] } | null;
const SCRIPTS = resolve(import.meta.dirname, '..');
export const WIN = process.platform === 'win32';
// spec-boards marks lines under 0.5 "(?)": Windows gives no confidence, so its lines count as fairly sure
const WIN_CONF = 0.8;
// the languages Vision reads, in Windows tags; only the installed ones are used
const WIN_LANGS = ['zh-Hant-TW', 'en-US', 'ja', 'zh-Hans-CN'];

const CJK = /[　-鿿가-힯＀-￯]/;
type Word = { text: string; x: number; y: number; w: number; h: number };
/** Join Windows OCR words: one space between two Latin words, none next to a CJK character (the engine splits CJK
 *  text into single characters; a real space between a number and a CJK word is lost: "7231剩餘"). */
export function joinWords(words: Word[]): string {
  let out = '';
  words.forEach((w, i) => {
    if (!i) { out = w.text; return; }
    const glued = CJK.test(out[out.length - 1]) || CJK.test(w.text[0]) || /^[,.;:!?)\]}%、。，：；！？」』）]/.test(w.text) || /[(\[{「『（]$/.test(out);
    out += glued ? w.text : ` ${w.text}`;
  });
  return out;
}
// Which engine's reading of one place wins: a line with CJK text from a CJK engine; otherwise the English engine's
// (the Chinese engine misreads Latin letter case: "VideOTOOlS", "lmage"); otherwise the first engine's.
const rank = (l: OcrLine & { lang: string }) => CJK.test(l.text) ? (/^en/.test(l.lang) ? 1 : 0) : (/^en/.test(l.lang) ? 0 : 2);
const overlap = (a: OcrLine, b: OcrLine) => {
  const ix = Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)), iy = Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
  return ix * iy / Math.max(1, Math.min(a.w * a.h, b.w * b.h));
};

/** Windows: OCR each image with every installed language, the first language's lines first and the others' lines
 *  only where nothing was read yet. */
function windowsOcr(paths: string[]): Record<string, OcrImage> {
  const dir = mkdtempSync(join(tmpdir(), 'casebook-ocr-'));
  try {
    const job = join(dir, 'job.json'), out = join(dir, 'out.json');
    writeFileSync(job, JSON.stringify({ paths: paths.map(p => resolve(p)), langs: WIN_LANGS }));
    const r = spawnSync('powershell.exe', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', join(SCRIPTS, 'ocr-windows.ps1'), job, out], { encoding: 'utf8', maxBuffer: 64 << 20 });
    if (r.status !== 0 || !existsSync(out)) throw new Error(`Windows OCR failed: ${(r.stderr || r.stdout || '').trim().slice(0, 400)}\n` +
      'Add an OCR language under Settings › Time & language › Language (Traditional Chinese for 中文; English for accurate Latin text), or as administrator: ' +
      'Add-WindowsCapability -Online -Name "Language.OCR~~~zh-TW~0.0.1.0" (likewise ~~~en-US~ and ~~~ja-JP~).');
    const raw: Record<string, any> = JSON.parse(readFileSync(out, 'utf8').replace(/^﻿/, ''));
    const res: Record<string, OcrImage> = {};
    paths.forEach(p => {
      const v = raw[resolve(p)];
      if (!v) { res[p] = null; return; }
      const lines: (OcrLine & { lang: string })[] = [];
      for (const lang of [v.results ?? []].flat()) for (const l of [lang.lines ?? []].flat()) {
        const ws = [l.words ?? []].flat().filter((w: any) => w && String(w.text ?? '').trim());
        if (!ws.length) continue;
        const x = Math.min(...ws.map((w: any) => w.x)), y = Math.min(...ws.map((w: any) => w.y));
        const line: OcrLine & { lang: string } = { text: joinWords(ws.map((w: any) => ({ text: String(w.text), x: w.x, y: w.y, w: w.w, h: w.h }))), x: Math.round(x), y: Math.round(y),
          w: Math.round(Math.max(...ws.map((w: any) => w.x + w.w)) - x), h: Math.round(Math.max(...ws.map((w: any) => w.y + w.h)) - y), conf: WIN_CONF, lang: String(lang.lang) };
        const i = lines.findIndex(o => overlap(o, line) > 0.5);
        if (i < 0) lines.push(line); else if (rank(line) < rank(lines[i])) lines[i] = line;
      }
      res[p] = { w: v.w, h: v.h, lines: lines.map(({ lang, ...l }) => l).sort((a, b) => a.y - b.y || a.x - b.x) };
    });
    return res;
  } finally { rmSync(dir, { recursive: true, force: true }); }
}

/** OCR whole images: each line's box in the image's pixels, top-left origin (ocr-images.swift's output). */
export function ocrImages(paths: string[]): Record<string, OcrImage> {
  if (!paths.length) return {};
  if (WIN) return windowsOcr(paths);
  const dir = mkdtempSync(join(tmpdir(), 'casebook-ocr-'));
  try {
    writeFileSync(join(dir, 'job.json'), JSON.stringify(paths));
    const r = spawnSync('swift', [join(SCRIPTS, 'ocr-images.swift'), join(dir, 'job.json')], { encoding: 'utf8', maxBuffer: 64 << 20 });
    if (r.status !== 0) throw new Error(`ocr-images.swift failed: ${(r.stderr || '').slice(0, 400)}`);
    return JSON.parse(r.stdout);
  } finally { rmSync(dir, { recursive: true, force: true }); }
}

/** OCR the rendered tiles in `dir` (index.json from render-tiles.ts) into dir/ocr.json, boxes in PDF points on the
 *  page (ocr-tiles.swift's output). Returns the process result so callers can report failures as before. */
export function ocrTiles(dir: string): { status: number | null; stderr: string; stdout: string } {
  if (!WIN) {
    const r = spawnSync('swift', [join(SCRIPTS, 'ocr-tiles.swift'), dir], { encoding: 'utf8', maxBuffer: 64 << 20 });
    return { status: r.status, stderr: r.stderr ?? '', stdout: r.stdout ?? '' };
  }
  try {
    const index: { tiles: { file: string; x: number; y: number }[]; scale: number } = JSON.parse(readFileSync(join(dir, 'index.json'), 'utf8'));
    const got = windowsOcr(index.tiles.map(t => join(dir, t.file)));
    const out = index.tiles.map(t => ({ file: t.file, x: t.x, y: t.y, lines: (got[join(dir, t.file)]?.lines ?? []).map(l => ({
      text: l.text, x: Math.round(t.x + l.x / index.scale), y: Math.round(t.y + l.y / index.scale),
      w: Math.round(l.w / index.scale), h: Math.round(l.h / index.scale), conf: l.conf })) }));
    writeFileSync(join(dir, 'ocr.json'), JSON.stringify(out, null, 2));
    const msg = `OCR (Windows): ${out.length} tiles → ${join(dir, 'ocr.json')}`;
    console.error(msg);
    return { status: 0, stderr: '', stdout: msg };
  } catch (e: any) { return { status: 1, stderr: String(e?.message ?? e), stdout: '' }; }
}
