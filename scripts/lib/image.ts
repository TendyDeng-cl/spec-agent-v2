// Image resizing and JPEG conversion on any computer (user, 2026-11-25): what the pages did with macOS `sips`, done with
// the mupdf package the casebook already uses for spec PDFs, so Windows gets the same small copies. An image opened as
// a one-page document is drawn at the scale that fits `max`, on white (screenshots have no transparency worth keeping).
import * as mupdf from 'mupdf';
import { readFileSync, writeFileSync } from 'node:fs';

const MAGIC = (p: string, b: Buffer) => b[0] === 0x89 && b[1] === 0x50 ? 'image/png' : b[0] === 0xff && b[1] === 0xd8 ? 'image/jpeg'
  : /\.webp$/i.test(p) ? 'image/webp' : /\.gif$/i.test(p) ? 'image/gif' : /\.bmp$/i.test(p) ? 'image/bmp' : 'image/png';

/** JPEG bytes of `src`, its longest side at most `max` px (0 = keep the size), at `quality` (0–100). */
export function jpegOf(src: string, opts: { max?: number; quality?: number } = {}): Buffer {
  const buf = readFileSync(src);
  const doc = mupdf.Document.openDocument(buf, MAGIC(src, buf));
  try {
    const page = doc.loadPage(0), [x0, y0, x1, y1] = page.getBounds();
    const w = x1 - x0, h = y1 - y0, max = opts.max ?? 0;
    // an image document's page is in points at the image's resolution: scale to its pixels first
    const img = new mupdf.Image(buf), px = img.getWidth(), k0 = px / w;
    const k = max && Math.max(w, h) * k0 > max ? max / Math.max(w, h) : k0;
    const pix = page.toPixmap(mupdf.Matrix.scale(k, k), mupdf.ColorSpace.DeviceRGB, false);
    return Buffer.from(pix.asJPEG(opts.quality ?? 75));
  } finally { doc.destroy?.(); }
}

/** Write a JPEG copy of `src` to `out`; false when the image cannot be read. */
export function toJpeg(src: string, out: string, opts: { max?: number; quality?: number } = {}): boolean {
  try { writeFileSync(out, jpegOf(src, opts)); return true; } catch { return false; }
}
