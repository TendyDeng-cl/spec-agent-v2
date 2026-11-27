# Input limits and validation

## KP-001 Model change updates its limits
- kind: rule · platform: web · tags: model, limits, input · authority: team
- source: contract-runner domain myedit/categories/01_輸入驗證與限制.yaml rule 1 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-01-1

When a flow has model-dependent inputs (duration, media count, prompt length): after the user switches model and
before submitting, the model name, description, allowed values and input limits shown all match the new model.

## KP-002 Inputs over a limit are blocked and named
- kind: rule · platform: web · tags: limits, import, validation · authority: team
- source: contract-runner domain myedit/categories/01_輸入驗證與限制.yaml rule 2 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-01-2

When inputs have a count, file size, resolution, storage or reference-media limit: adding one more, or submitting
more than allowed, is blocked and the message names the limit that applies; never accepted silently.

## KP-003 Prompt length limit is visible and enforced
- kind: rule · platform: web · tags: prompt, limits · authority: team
- source: contract-runner domain myedit/categories/01_輸入驗證與限制.yaml rule 3 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-01-3

When a prompt has a character or word limit: at or near it the limit state is clearly shown, text over the limit is
never sent silently, and the user can see how to fix the prompt.

## KP-004 Out-of-range numbers go to the nearest bound
- kind: rule · platform: web · tags: numeric, validation · authority: team
- source: contract-runner domain myedit/categories/01_輸入驗證與限制.yaml rule 4 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-01-4

A numeric field with a minimum and maximum rejects a value outside them or clamps it to the nearest legal bound;
it never jumps to the opposite bound (e.g. a value under the minimum becoming the maximum).

## KP-005 Steppers disable at their bounds
- kind: rule · platform: web · tags: numeric, stepper · authority: team
- source: contract-runner domain myedit/categories/01_輸入驗證與限制.yaml rule 5 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-01-5

Increment and decrement controls of a bounded value are disabled at the minimum or maximum and no longer change the
value.

## KP-006 Rejected imports report and never hang
- kind: rule · platform: web · tags: import, validation, upload · authority: team
- source: contract-runner domain myedit/categories/01_輸入驗證與限制.yaml rule 6 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-01-6

An imported file of an unsupported type, or one that breaks a set limit, gets a clear validation message; it never
stays in a processing state indefinitely.
