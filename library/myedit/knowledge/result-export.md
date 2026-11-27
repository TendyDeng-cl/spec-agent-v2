# Result preview and export

## KP-012 Download matches the preview
- kind: rule · platform: web · tags: download, preview, output · authority: team
- source: contract-runner domain myedit/categories/03_結果預覽與匯出完整性.yaml rule 1 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-03-1

A previewed result, once downloaded, matches the preview in content, orientation, aspect ratio, duration and audio,
unless the spec states a difference.

## KP-013 Orientation metadata is followed throughout
- kind: rule · platform: web · tags: orientation, exif, import · authority: team
- source: contract-runner domain myedit/categories/03_結果預覽與匯出完整性.yaml rule 2 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-03-2

Media whose stored pixel orientation differs from its display orientation (EXIF) shows and generates in the
correct orientation everywhere: preview, processing, thumbnails and export.

## KP-014 File extension matches the encoding
- kind: rule · platform: web · tags: download, filename, format · authority: team
- source: contract-runner domain myedit/categories/03_結果預覽與匯出完整性.yaml rule 3 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-03-3

A downloaded result's file extension matches its actual encoding (no .jpg name on PNG data).

## KP-015 Audio off means no audio track
- kind: rule · platform: web · tags: audio, generation, output · authority: team
- source: contract-runner domain myedit/categories/03_結果預覽與匯出完整性.yaml rule 4 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-03-4

When the user turns audio off before generating, the played or downloaded result has no audio track, unless the
spec defines otherwise.

## KP-016 Result duration matches the chosen one
- kind: rule · platform: web · tags: duration, generation, output · authority: team
- source: contract-runner domain myedit/categories/03_結果預覽與匯出完整性.yaml rule 5 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-03-5

A result generated with a chosen allowed duration has that duration, within the tolerance the spec and model
define.

## KP-017 Repeated export keeps the result playable
- kind: rule · platform: web · tags: export, preview · authority: team
- source: contract-runner domain myedit/categories/03_結果預覽與匯出完整性.yaml rule 6 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-03-6

Previewing or exporting the same result again leaves it playable; it is never corrupted or replaced by a blank
result.
