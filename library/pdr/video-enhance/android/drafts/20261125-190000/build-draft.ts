// Draft 20261125-190000 (Android) [Req: REQ-045]: a row for every Open question that is still open (Q-14, Q-28).
// Rebuilds this folder from the approved table (v13): draft.csv, requirements.md, control-trace.json, spec.json,
// update-plan.md and the files carried over from draft 20261125-171701 (annotation-trace.json, phases.json,
// knowledge.md); then req-045.ts adds the rows (the same file serves the iOS draft 20261125-171701).
// Run: node library/pdr/video-enhance/android/drafts/20261125-190000/build-draft.ts
// The spec set is Figma-only, so new-draft.ts (which needs a spec file) is not used, as in draft 20261125-171701.
import { readFileSync, writeFileSync, copyFileSync, existsSync } from 'node:fs';
import { dirname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseCsv, toCsv } from '../../../../../../scripts/lib/csv.ts';

const DRAFT = '20261125-190000';
const PREV = '20261125-171701';
const DIR = dirname(fileURLToPath(import.meta.url));
const PLATFORM = basename(dirname(dirname(DIR)));
if (PLATFORM !== 'android' || basename(DIR) !== DRAFT) throw new Error(`this script builds android/drafts/${DRAFT} only`);
const TABLE = dirname(dirname(DIR));
const manifest = JSON.parse(readFileSync(join(TABLE, 'manifest.json'), 'utf8'));

// ---- the approved table, every row unchanged ----
const approved = parseCsv(readFileSync(join(TABLE, 'cases.csv'), 'utf8'));
const H = approved[0];
const body = approved.slice(1).filter(r => r.length > 1);
writeFileSync(join(DIR, 'draft.csv'), toCsv([[...H, 'Change', 'Change Reason'], ...body.map(r => [...r, 'unchanged', ''])]));
copyFileSync(join(TABLE, 'requirements.md'), join(DIR, 'requirements.md'));
copyFileSync(join(TABLE, 'control-trace.json'), join(DIR, 'control-trace.json'));

// ---- carried over unchanged: same spec set, same run plan (the new rows join the next run's plan) ----
for (const f of ['annotation-trace.json', 'knowledge.md']) copyFileSync(join(TABLE, 'drafts', PREV, f), join(DIR, f));
const phases = JSON.parse(readFileSync(join(TABLE, 'drafts', PREV, 'phases.json'), 'utf8'));
writeFileSync(join(DIR, 'phases.json'), JSON.stringify({ ...phases, draft: DRAFT }, null, 2) + '\n');

writeFileSync(join(DIR, 'spec.json'), JSON.stringify({
  feature: 'pdr/video-enhance', platform: PLATFORM, title: manifest.title, draft: DRAFT,
  created_at: '2026-11-25T11:00:00.000Z', based_on_version: manifest.version, spec_folder: manifest.spec_folder,
  spec_files: manifest.spec_files, spec_set_sha256: manifest.spec_set_sha256,
}, null, 2) + '\n');

// req-045.ts replaces the <!-- REQ-045 --> line with the case changes
writeFileSync(join(DIR, 'update-plan.md'), `# Update plan — Video Enhance / ${PLATFORM}: approved v${manifest.version} → draft ${DRAFT}

Based on approved v${manifest.version} (${body.length} rows). Same spec set; the change is a request from the user [REQ-045]: an Open
question that is still open must have a row, so the next run reaches it.

## Spec files
- Unchanged: Figma only (spec set 2026-11-03). New or changed: none. No longer supplied: none.

## Requirement changes
| Requirement | Change | Before | After |
|---|---|---|---|
| Q-14 | question reworded | 「No row asserts it; a consent dialog on first use is recorded, not filed.」 | Names its row; either outcome is a Fail (question) for PM / Legal |
| Q-28 | question reworded | 「no row asserts it: TC-349 pauses before the end」, noted in the run, not filed | Names its row; any outcome is a Fail (question) for PM |
| Request ledger coverage | added | — | REQ-045 |

No requirement (R-…) changed and none was added: no source states either behaviour, so the rows record it.

<!-- REQ-045 -->

## Not added (value check)
- A row for the dialog's 「decline」 branch (Q-14): whether a dialog exists is not known yet, so its buttons are recorded
  and a decline row waits for the answer.
- A second row for Q-20: TC-211 already takes system Back to the notification prompt.
- A new requirement for either question: the spec is silent, so they stay Open questions (formats.md).

## Questions for PM
- Q-28 What does playback do when it reaches the right trim handle: stop there, jump back to the selection start, or loop?

## Questions for you
- None.
`);

// Chinese copy: start from the approved one, so only the new and changed rows need translating (zh-copy.ts export / merge)
for (const [from, to] of [['cases.zh-Hant.csv', 'draft.zh-Hant.csv'], ['cases.zh-Hant.prints.json', 'draft.zh-Hant.prints.json']])
  if (existsSync(join(TABLE, from)) && !existsSync(join(DIR, to))) copyFileSync(join(TABLE, from), join(DIR, to));
console.log(`${PLATFORM}: ${body.length} approved rows → ${join(DIR, 'draft.csv')}`);

await import('./req-045.ts');
