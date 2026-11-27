// Fills this draft's zh-work/batch-NN.out.json from zh-map.json (written by build-draft.ts: the Chinese of each entry copy,
// derived from the approved row's translation with the same entry changes) and zh-manual.json ({ English field text: Chinese }, translated by
// hand where a change could not be carried over; shared by both platforms). Prints the fields still missing. Then: node scripts/zh-copy.ts … merge.
// Run: node library/pdr/video-enhance/<platform>/drafts/20261126-111500/zh-fill.ts
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = dirname(fileURLToPath(import.meta.url));
const WORK = join(DIR, 'zh-work');
type Fields = Record<string, string>;
const map: Record<string, { zh: Fields | null; missing: string[] }> = JSON.parse(readFileSync(join(DIR, 'zh-map.json'), 'utf8'));
const manual: Record<string, string> = existsSync(join(DIR, 'zh-manual.json')) ? JSON.parse(readFileSync(join(DIR, 'zh-manual.json'), 'utf8')) : {};
const left: Record<string, Fields> = {};
for (const f of readdirSync(WORK).filter(f => /^batch-\d+\.json$/.test(f))) {
  const batch = JSON.parse(readFileSync(join(WORK, f), 'utf8'));
  const out: Record<string, Fields> = {};
  for (const r of batch.rows as { ID: string; en: Fields; zh: Fields; todo: string[] }[]) {
    const m = map[r.ID];
    const o: Fields = { ...r.zh };
    for (const field of Object.keys(r.en)) {
      if (o[field]) continue;
      if (manual[r.en[field]]) o[field] = manual[r.en[field]];
      else if (m?.zh && !m.missing.includes(field) && m.zh[field]) o[field] = m.zh[field];
      else (left[r.ID] ??= {})[field] = r.en[field];
    }
    out[r.ID] = o;
  }
  writeFileSync(join(WORK, f.replace('.json', '.out.json')), JSON.stringify(out, null, 1));
}
writeFileSync(join(DIR, 'zh-left.json'), JSON.stringify(left, null, 1));
console.log(`${Object.keys(left).length} rows with fields still to translate → zh-left.json`);
