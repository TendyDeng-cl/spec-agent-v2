# MyEdit domain knowledge

Rules true of every MyEdit web tool that no single feature spec states (`KP-…`, `platform: web`). Format, scopes and
how analyses and runs use them: the `domain-knowledge` skill. Read them merged with the CyberLink and feature entries:
`node scripts/knowledge.ts myedit/<feature> web [--for analysis|run|ebug]`.

## Where these came from (2026-11-25)

`sources/2026-11-25-contract-runner-domain/`: a one-time import, approved by the user on 2026-11-25, of the MyEdit Web
Spec Contract Runner's `domain_knowledge` (MyEdit version 2026-09-27 with additions to 2026-11-17, plus the shared
MyEdit / MyEdit Biz guides of 2026-11-02/04). Later changes there arrive only when someone brings them again.

- `myedit/categories/01…10`: cross-tool rules the runner distilled from recurring QA eBugs, with the additions the user
  approved on 2026-11-17 (Light Mode rules, rules confirmed product-wide). Each becomes one entry, `authority: team`,
  `aka: MyEdit-<category>-<rule>` (e.g. `MyEdit-01-2`), so `knowledge.ts myedit --grep MyEdit-01-2` finds it.
- `shared/storage-full-and-import-orientation.md` and `shared/new-tool-entry-coverage.md`: checks the user confirmed for
  MyEdit and MyEdit Biz, split into one entry each in `shared-checks.md` (`aka: shared-…`, also `use: ebug`).
- Kept as source only: `myedit-biz/` (waits until a MyEdit Biz table needs it) and `shared/ebug-intake-gate.md` (the
  runner's curator procedure for turning eBugs into rules, not a fact about the app). The originals are git-ignored.

## How to apply them

- A rule applies only when its condition fits the feature (the first clause of each body: the tool has that ability).
- Tool-specific names, values, menus and limits come from the feature's current spec, never from these entries or an
  older tool.
- These rules fill gaps only where the spec is silent. A spec that states otherwise wins for its feature until a human
  decides: the conflict is an Open question in the next draft (`domain-knowledge` › Taking in knowledge, step 4).
- `library-history.md` KP-036 and KP-037 record expected behaviour that still reproduced on 2026-10-08; that is no
  statement about later builds.

## Files

| File | Topic | Ids |
|---|---|---|
| `input-limits.md` | Input limits and validation | KP-001 – KP-006 |
| `job-lifecycle.md` | Generation and processing lifecycle | KP-007 – KP-011 |
| `result-export.md` | Result preview and export | KP-012 – KP-017 |
| `editing-selection.md` | Editing and selection | KP-018 – KP-023 |
| `session-state.md` | Session state and unsaved changes | KP-024 – KP-030 |
| `library-history.md` | Library, history and project restore | KP-031 – KP-037 |
| `credits-access.md` | Account, credits and access | KP-038 – KP-043 |
| `navigation-routing.md` | Navigation, routing and access control | KP-044 – KP-049 |
| `controls-layout.md` | Shared controls and responsive layout | KP-050 – KP-060 |
| `localization.md` | Localization and browser compatibility | KP-061 – KP-064 |
| `shared-checks.md` | Shared MyEdit and MyEdit Biz checks (storage full, persistence, import orientation, file names, new-tool entries, Pricing, tab title, tool card thumbnail) | KP-065 – KP-075 |
| `run-tooling.md` | Driving MyEdit web runs (device-web gaps, Chrome quirks), observed on runs | KP-076 – KP-079 |
