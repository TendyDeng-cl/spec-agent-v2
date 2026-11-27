# Account, credits and access

## KP-038 Get Credit stays at the top right
- kind: rule · platform: web · tags: credits, header · authority: team
- source: contract-runner domain myedit/categories/07_帳戶點數與使用權限.yaml rule 1 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-07-1
- verified: MyEdit-5.11.0-11242029 demo (2026-11-25), Video Enhancer room only (Video Enhancer web run 2026-11-25-r1-full TC-138) · status: disputed: the signed-in Video Enhancer SEO page /en/video-editor/video-enhancer has no 「Get Credits」 in its header while the room has it (Video Enhancer web run 2026-11-25-r1-full TC-138, O-20); whether an SEO tool page counts as a working screen, and whether SEO headers lack it site-wide, is for the user or PM to decide

On every working screen of a credit-consuming operation (main, default, edit pages), a Get Credit entry stays
visible at the top right.

## KP-039 No shortage dialog with enough credits
- kind: rule · platform: web · tags: credits, dialog · authority: team
- source: contract-runner domain myedit/categories/07_帳戶點數與使用權限.yaml rule 2 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-07-2
- verified: MyEdit-5.11.0-11242029 demo (2026-11-25) (Video Enhancer web run 2026-11-25-r1-full TC-138)

A signed-in account with enough credits for the chosen operation never sees the insufficient-credits or purchase
dialog when starting it.

## KP-040 Balance updates without reload
- kind: rule · platform: web · tags: credits, balance, refund · authority: team
- source: contract-runner domain myedit/categories/07_帳戶點數與使用權限.yaml rule 3 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-07-3
- verified: MyEdit-5.11.0-11242029 demo (2026-11-25) (Video Enhancer web run 2026-11-25-r1-full TC-138: room account menu 4578 → 4570 without reload)

After a credit charge or refund completes, the balance shown on the working page reflects it without a reload.

## KP-041 Restricted actions blocked by account state
- kind: rule · platform: web · tags: tier, sign-in, subscription · authority: team
- source: contract-runner domain myedit/categories/07_帳戶點數與使用權限.yaml rule 4 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-07-4

A feature limited by sign-in, subscription or trial eligibility blocks the action for an account that is signed
out, expired or ineligible, with a prompt that fits the account's state.

## KP-042 One-time trial per account
- kind: rule · platform: web · tags: trial, tier · authority: team
- source: contract-runner domain myedit/categories/07_帳戶點數與使用權限.yaml rule 5 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-07-5

A free trial or one-time benefit used by an account is not granted again in another browser, profile or private
window.

## KP-043 Shown credits equal the real charge
- kind: rule · platform: web · tags: credits, pricing · authority: team
- source: contract-runner domain myedit/categories/07_帳戶點數與使用權限.yaml rule 6 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-07-6
- verified: MyEdit-5.11.0-11242029 demo (2026-11-25) (Video Enhancer web run 2026-11-25-r1-full R1-c every Mode × resolution × frame rate price, ledger charges equal 「Enhance N」)

Credits shown for an operation (Generate button, Pricing table) equal the current rule's charge for the chosen
option combination (model, voice, length…), never an old rule or a missing option. Values come from the tool's
confirmed spec; stage values are not production. Added 2026-11-17 (user approved).
