# Library, history and project restore

## KP-031 Saved items survive a reload
- kind: rule · platform: web · tags: library, history, persistence · authority: team
- source: contract-runner domain myedit/categories/06_素材庫歷史紀錄與專案復原.yaml rule 1 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-06-1

A result or project saved to the library, history or cloud account is still found in that view after a page
reload or a later return with the same account.

## KP-032 Library status is current
- kind: rule · platform: web · tags: library, status · authority: team
- source: contract-runner domain myedit/categories/06_素材庫歷史紀錄與專案復原.yaml rule 2 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-06-2

A library or history item shows its latest status (processing, completed, failed) and only the actions that fit
it; an unfinished item never shows as completed.

## KP-033 Saving the same result twice adds no duplicate
- kind: rule · platform: web · tags: library, save, duplicate · authority: team
- source: contract-runner domain myedit/categories/06_素材庫歷史紀錄與專案復原.yaml rule 3 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-06-3

Saving an already-saved result again, without generating a new one, does not create a second library item.

## KP-034 Thumbnail and metadata name the same result
- kind: rule · platform: web · tags: library, thumbnail, metadata · authority: team
- source: contract-runner domain myedit/categories/06_素材庫歷史紀錄與專案復原.yaml rule 4 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-06-4

A library or history item's thumbnail, file name, duration and model name all identify the same saved result.

## KP-035 Reopened project loads its media
- kind: rule · platform: web · tags: project, reopen · authority: team
- source: contract-runner domain myedit/categories/06_素材庫歷史紀錄與專案復原.yaml rule 5 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-06-5

Reopening a project saved with media loads the media and project state, with no blank preview or lost editable
content.

## KP-036 Full storage: new images are not saved
- kind: rule · platform: web · tags: storage, library, agent · authority: team
- source: contract-runner domain myedit/categories/06_素材庫歷史紀錄與專案復原.yaml rule 6 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-06-6

With the account's cloud storage at or over its limit (MyEdit Agent included), a newly generated image is not added
to its My Library folder. Check the real folder by image content and time, not the Agent's 「saved」 text; generating
itself is not forbidden. Known to reproduce on production 2026-10-08 (MyEdit Agent).

## KP-037 Model name in both library popups
- kind: rule · platform: web · tags: library, model, recent · authority: team
- source: contract-runner domain myedit/categories/06_素材庫歷史紀錄與專案復原.yaml rule 7 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-06-7

A result with a model name (Photo Edit by Chat included) shows the same model name in its preview popup from
My Library › Recent Creations and from the tool's own folder; use the model actually chosen. Known to reproduce on
demo 2026-10-08 (missing in Recent Creations).
