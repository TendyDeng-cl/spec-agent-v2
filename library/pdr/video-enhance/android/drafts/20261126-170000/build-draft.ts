// Draft 20261126-170000 (both platforms; the same file sits in ios/ and android/drafts/20261126-170000/).
// Figma change check 2026-11-26 (SKILL.md step 0.2): Design board 3300:32003 「AI Video Enhance」 (section
// 「AI Video Enhance_26.09_v2」, the only Video Enhance Design source, REQ-010) changed. Re-read (group d4) and compared
// with the previous read: the only changed words are the Mode ⓘ bubble (panel 3479:106886),
// 「Standard: Great quality · up to 8 min」 / 「Professional: Maximum detail · up to 2:30」 →
// 「Standard: Great quality · up to 08:00」 / 「Professional: Maximum detail · up to 02:30」; both bubbles moved slightly
// (3446 → 3461, 4114 → 4099), no other text, screen, control or arrow changed. R-025 and every row quoting the bubble
// take the new words; nothing else changes.
// Rebuilds draft.csv, draft.zh-Hant.csv, requirements.md, spec.json, update-plan.md from the approved table and copies
// the traces, phases.json and questions.zh-Hant.json.
// Run: node library/pdr/video-enhance/<platform>/drafts/20261126-170000/build-draft.ts
import { readFileSync, writeFileSync, copyFileSync, existsSync } from 'node:fs';
import { dirname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseCsv, toCsv } from '../../../../../../scripts/lib/csv.ts';

const DRAFT = '20261126-170000';
const DIR = dirname(fileURLToPath(import.meta.url));
const PLATFORM = basename(dirname(dirname(DIR))) as 'android' | 'ios';
const TABLE = dirname(dirname(DIR));
const manifest = JSON.parse(readFileSync(join(TABLE, 'manifest.json'), 'utf8'));
const prevDraft = join(TABLE, 'drafts', manifest.draft);

const OLD = [['Standard: Great quality · up to 8 min', 'Standard: Great quality · up to 08:00'],
  ['Professional: Maximum detail · up to 2:30', 'Professional: Maximum detail · up to 02:30']] as const;
const swap = (s: string) => OLD.reduce((t, [a, b]) => t.split(a).join(b), s);
const REASON = 'Design 3300:32003 redrawn (Figma check 2026-11-26): the Mode bubble now reads 「up to 08:00」 / 「up to 02:30」 (R-025)';
const REASON_ZH = 'Design 3300:32003 改版（2026-11-26 Figma 檢查）：Mode 泡泡改為「up to 08:00」/「up to 02:30」（R-025）';

const strip = (s: string) => s.replace(/^﻿/, '');
const [H, ...rows] = parseCsv(strip(readFileSync(join(TABLE, 'cases.csv'), 'utf8')));
const DH = [...H, 'Change', 'Change Reason'];
const changed: string[] = [];
const out = rows.map(r => {
  const o = Object.fromEntries(H.map((h, i) => [h, r[i] ?? ''])) as Record<string, string>;
  let mod = false;
  for (const f of ['Precondition', 'Action', 'Expected Result']) { const n = swap(o[f]); if (n !== o[f]) { o[f] = n; mod = true; } }
  if (mod) changed.push(o.ID);
  return { ...o, Change: mod ? 'modified' : 'unchanged', 'Change Reason': mod ? REASON : '' };
});
writeFileSync(join(DIR, 'draft.csv'), '﻿' + toCsv([DH, ...out.map(o => DH.map(h => o[h] ?? ''))]));

// Chinese copy: the bubble is quoted in English inside the Chinese, so the same swap applies.
const zhPath = join(TABLE, 'cases.zh-Hant.csv');
if (existsSync(zhPath)) {
  const [ZH, ...zr] = parseCsv(strip(readFileSync(zhPath, 'utf8')));
  const zout = zr.map(r => r.map(swap));
  const hasChange = ZH.length > H.length;
  const ZH2 = hasChange ? ZH : [...ZH, '變更', '變更原因'];
  const zrows = zout.map(r => { if (hasChange) return r; const id = r[0]; const m = changed.includes(id); return [...r, m ? '修改' : '未變更', m ? REASON_ZH : '']; });
  writeFileSync(join(DIR, 'draft.zh-Hant.csv'), '﻿' + toCsv([ZH2, ...zrows]));
}

let req = readFileSync(join(TABLE, 'requirements.md'), 'utf8');
const before = req;
req = req.replace(/^(- R-025 .*)$/m, l => swap(l).replace(/ \(PM 1002/, ' (Design 3300:32003 redrawn 2026-11-26, was 「up to 8 min」 / 「up to 2:30」; PM 1002'));
if (req === before) throw new Error('R-025 not found');
writeFileSync(join(DIR, 'requirements.md'), req);

const spec = JSON.parse(readFileSync(join(prevDraft, 'spec.json'), 'utf8'));
writeFileSync(join(DIR, 'spec.json'), JSON.stringify({ ...spec, draft: DRAFT, created_at: '2026-11-26T09:00:00.000Z', based_on_version: manifest.version }, null, 2) + '\n');
for (const f of ['annotation-trace.json', 'control-trace.json', 'questions.zh-Hant.json', 'decisions.json'])
  if (existsSync(join(prevDraft, f))) copyFileSync(join(prevDraft, f), join(DIR, f));
if (!existsSync(join(DIR, 'phases.json'))) {
  const phases = JSON.parse(readFileSync(join(prevDraft, 'phases.json'), 'utf8'));
  writeFileSync(join(DIR, 'phases.json'), JSON.stringify({ ...phases, draft: DRAFT }, null, 2) + '\n');
}

writeFileSync(join(DIR, 'update-plan.md'), `# Update plan — Video Enhance / ${PLATFORM}: approved v${manifest.version} → draft ${DRAFT}

Based on approved v${manifest.version} (${rows.length} rows). Same spec set (2026-11-03, Figma only). The Figma change check of
2026-11-26 found one changed board, Design 3300:32003 「AI Video Enhance」 (section 「AI Video Enhance_26.09_v2」, REQ-010);
its re-read (group d4) differs from the previous read only in the Mode ⓘ bubble's words (and both bubbles moved a few
pixels). No screen, control or arrow changed; the PM boards are unchanged.

## Spec files
- Unchanged: Figma only (spec set 2026-11-03). Changed: Design board 3300:32003 (re-read 2026-11-26).

## Requirement changes
| Requirement | Change | Before | After |
|---|---|---|---|
| R-025 | modified | 「Standard: Great quality · up to 8 min」 / 「Professional: Maximum detail · up to 2:30」 | 「Standard: Great quality · up to 08:00」 / 「Professional: Maximum detail · up to 02:30」 |

## Case changes
- Modified (${changed.length}): ${changed.join(', ')}: the quoted Mode bubble takes the new words (TC-035, the entry-point
  rows that open the bubble, and the MUI rows' English base).
- New: none. Removed: none.

## Not added
- Nothing: the change is wording only.

## Run order
- The modified rows run in their usual segments of the next full run (R4); nothing moves.
`);
console.log(JSON.stringify({ platform: PLATFORM, rows: rows.length, modified: changed }, null, 1));
