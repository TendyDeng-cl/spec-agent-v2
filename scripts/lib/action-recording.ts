// Encodes a browser recording made by device-web.ts `record`: live frames captured from Chrome (DevTools screencast)
// plus the clicks the run actually delivered, drawn as an explicitly labelled "ACTION CURSOR OVERLAY" (white arrow
// with dark outline and soft shadow, a brief cyan ring at each click). Adapted with the user's go-ahead (2026-11-24)
// from qadm-myedit-web-spec-contract-runner-agent's create-ebug `encode-action-recording.ts`, whose cursor style the
// team approved on 2026-11-09 (MYE261106P0015). Browser automation never moves the OS pointer, so the cursor is placed
// only at delivered click coordinates; between clicks it stays at the last one, and no trajectory is invented.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

export type Capture = {
  frames: { file: string; elapsedMs: number }[];
  clicks: { x: number; y: number; atMs: number }[]; // CSS pixels of the viewport
  viewport: { width: number; height: number };
};

/** Width and height of a JPEG (SOFn marker) or PNG (IHDR). */
export function imageSize(file: string): { width: number; height: number } {
  const b = fs.readFileSync(file);
  if (b[0] === 0x89 && b.toString('ascii', 1, 4) === 'PNG') return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
  for (let i = 2; i < b.length - 9;) {
    if (b[i] !== 0xff) { i++; continue; }
    const m = b[i + 1], len = b.readUInt16BE(i + 2);
    if (m >= 0xc0 && m <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(m)) return { height: b.readUInt16BE(i + 5), width: b.readUInt16BE(i + 7) };
    i += 2 + len;
  }
  throw new Error(`Cannot read the size of ${file}`);
}

const pointerShape = [[4, 3], [4, 31], [11, 24], [17, 38], [23, 35], [17, 22], [29, 22]];
function insidePolygon(x: number, y: number): boolean {
  let inside = false;
  for (let i = 0, j = pointerShape.length - 1; i < pointerShape.length; j = i++) {
    const [xi, yi] = pointerShape[i], [xj, yj] = pointerShape[j];
    if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}
function edgeDistance(x: number, y: number): number {
  return Math.min(...pointerShape.map(([ax, ay], i) => {
    const [bx, by] = pointerShape[(i + 1) % pointerShape.length];
    const t = Math.max(0, Math.min(1, ((x - ax) * (bx - ax) + (y - ay) * (by - ay)) / ((bx - ax) ** 2 + (by - ay) ** 2)));
    return Math.hypot(x - ax - t * (bx - ax), y - ay - t * (by - ay));
  }));
}
// Supersampled RGBA assets (PAM) avoid the green fringe of chroma-keyed cursors.
function rgbaAsset(file: string, size: number, sample: (x: number, y: number) => number[]): string {
  const pixels = Buffer.alloc(size * size * 4);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const sums = [0, 0, 0, 0];
    for (let sy = 0; sy < 4; sy++) for (let sx = 0; sx < 4; sx++) {
      const rgba = sample(x + (sx + 0.5) / 4, y + (sy + 0.5) / 4);
      for (let c = 0; c < 3; c++) sums[c] += rgba[c] * rgba[3] / 255;
      sums[3] += rgba[3];
    }
    for (let c = 0; c < 3; c++) pixels[(y * size + x) * 4 + c] = sums[3] ? Math.round(sums[c] * 255 / sums[3]) : 0;
    pixels[(y * size + x) * 4 + 3] = Math.round(sums[3] / 16);
  }
  fs.writeFileSync(file, Buffer.concat([Buffer.from(`P7\nWIDTH ${size}\nHEIGHT ${size}\nDEPTH 4\nMAXVAL 255\nTUPLTYPE RGB_ALPHA\nENDHDR\n`), pixels]));
  return file;
}

/** Encode `<folder>/capture.json` to `output` (a new MP4). Returns the frame size and the clicks drawn. */
export function encodeRecording(captureJson: string, output: string, ffmpeg = 'ffmpeg') {
  if (fs.existsSync(output)) throw new Error(`${output} already exists; choose a new recording name`);
  const capture: Capture = JSON.parse(fs.readFileSync(captureJson, 'utf8'));
  const folder = path.dirname(path.resolve(captureJson));
  if (!capture.frames.length) throw new Error('No frames were captured (did the page change while recording?)');
  const lines: string[] = [];
  capture.frames.forEach((f, i) => {
    if (!/^frame-\d+\.(jpg|png)$/.test(f.file)) throw new Error(`Unsafe frame file name ${f.file}`);
    const d = i + 1 < capture.frames.length ? (capture.frames[i + 1].elapsedMs - f.elapsedMs) / 1000 : 0.6;
    lines.push(`file '${f.file}'`, `duration ${Math.max(d, 0.001).toFixed(4)}`);
  });
  lines.push(`file '${capture.frames.at(-1)!.file}'`);
  fs.writeFileSync(path.join(folder, 'frames.ffconcat'), lines.join('\n') + '\n');
  // clicks are CSS pixels; the screencast frame may be scaled (device pixel ratio, size limits)
  const size = imageSize(path.join(folder, capture.frames[0].file));
  const k = capture.viewport.width ? size.width / capture.viewport.width : 1;
  const clicks = capture.clicks.filter(c => [c.x, c.y, c.atMs].every(Number.isFinite) && c.atMs >= 0)
    .map(c => ({ x: Math.round(c.x * k), y: Math.round(c.y * k), atMs: c.atMs }));
  const fontFile = [process.env.EBUG_OVERLAY_FONT, process.env.CASEBOOK_OVERLAY_FONT,
    process.platform === 'win32' ? path.join(process.env.WINDIR ?? 'C:\\Windows', 'Fonts', 'arial.ttf') : undefined,
    process.platform === 'darwin' ? '/System/Library/Fonts/Supplemental/Arial.ttf' : undefined].find((f): f is string => !!f && fs.existsSync(f));
  const fontOption = fontFile ? `fontfile='${fontFile.replace(/\\/g, '/').replace(/:/g, '\\:')}':` : '';
  const base = '[0:v]pad=ceil(iw/2)*2:ceil(ih/2)*2';
  const args = ['-v', 'error', '-n', '-f', 'concat', '-safe', '0', '-i', path.join(folder, 'frames.ffconcat')];
  let filter: string;
  if (!clicks.length) filter = `${base}[out]`; // nothing clicked: plain recording, no overlay label
  else {
    const cursor = rgbaAsset(path.join(folder, 'action-cursor.pam'), 44, (x, y) => {
      if (insidePolygon(x, y)) return edgeDistance(x, y) < 1.4 ? [25, 30, 40, 255] : [255, 255, 255, 255];
      if (insidePolygon(x - 1, y - 2)) return [0, 0, 0, 65];
      return [0, 0, 0, 0];
    });
    const ring = rgbaAsset(path.join(folder, 'action-click-ring.pam'), 48, (x, y) => Math.abs(Math.hypot(x - 24, y - 24) - 18) < 1.5 ? [65, 195, 255, 210] : [0, 0, 0, 0]);
    const at = (axis: 'x' | 'y') => {
      let v = String(clicks.at(-1)![axis]);
      for (let i = clicks.length - 2; i >= 0; i--) v = `if(lt(t,${clicks[i + 1].atMs / 1000}),${clicks[i][axis]},${v})`;
      return v;
    };
    let screen = 'screen0';
    const rings = clicks.map((c, i) => {
      const next = `screen${i + 1}`;
      const f = `[${screen}][ring${i}]overlay=x=${c.x - 24}:y=${c.y - 24}:enable='between(t,${c.atMs / 1000},${c.atMs / 1000 + 0.55})':shortest=1[${next}];`;
      screen = next; return f;
    }).join('');
    filter = `${base},drawtext=${fontOption}text='ACTION CURSOR OVERLAY':x=12:y=h-32:fontsize=18:fontcolor=white:box=1:boxcolor=black@0.8[screen0];` +
      `[2:v]split=${clicks.length}${clicks.map((_, i) => `[ring${i}]`).join('')};` + rings +
      `[${screen}][1:v]overlay=x='${at('x')}-4':y='${at('y')}-3':enable='gte(t,${clicks[0].atMs / 1000})':shortest=1[out]`;
    args.push('-loop', '1', '-i', cursor, '-loop', '1', '-i', ring);
  }
  execFileSync(ffmpeg, [...args, '-filter_complex', filter, '-map', '[out]', '-r', '15', '-c:v', 'libx264', '-crf', '24',
    '-pix_fmt', 'yuv420p', '-movflags', '+faststart', path.resolve(output)], { stdio: 'inherit' });
  return { size, clicks: clicks.length, frames: capture.frames.length };
}
