# Generation and processing lifecycle

## KP-007 Progress starts at 0 and never goes back
- kind: rule · platform: web · tags: progress, generation · authority: team
- source: contract-runner domain myedit/categories/02_生成與處理生命週期.yaml rule 1 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-02-1
- verified: MyEdit-5.11.0-11242029 demo (2026-11-25), Video Enhancer upload and job progress (Video Enhancer web run 2026-11-25-r1-full TC-128)

An async job (generate, enhance, transcribe, upload, export) shows progress from 0, and progress never moves back
once complete. Progress need not be linear unless the spec says it is proportional.

## KP-008 Jobs end in a terminal state
- kind: rule · platform: web · tags: progress, generation, status · authority: team
- source: contract-runner domain myedit/categories/02_生成與處理生命週期.yaml rule 2 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-02-2

A job shown as processing ends Completed, Failed or Cancelled once the server or client finishes or rejects it; it
never stays processing indefinitely.

## KP-009 A cancelled job is not reported as failed
- kind: rule · platform: web · tags: cancel, generation · authority: team
- source: contract-runner domain myedit/categories/02_生成與處理生命週期.yaml rule 3 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-02-3

When the user cancels a running job it ends Cancelled, with no generation-failed message.

## KP-010 Failure keeps the page and the inputs
- kind: rule · platform: web · tags: failure, generation, retry · authority: team
- source: contract-runner domain myedit/categories/02_生成與處理生命週期.yaml rule 4 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-02-4

When a job fails the user sees an understandable error message, the page does not reload, and valid inputs are
kept for fixing or retrying.

## KP-011 Inputs in use are protected while a job runs
- kind: rule · platform: web · tags: generation, input, disabled · authority: team
- source: contract-runner domain myedit/categories/02_生成與處理生命週期.yaml rule 5 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-02-5

While a job runs, actions that would conflict with it (replacing or removing the input it uses) are disabled or the
running job is clearly protected from them.
