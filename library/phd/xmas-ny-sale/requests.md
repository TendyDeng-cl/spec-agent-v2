# Xmas & NY Sale — request ledger

Every request that changes what this feature’s tables must cover or how its runs are done, from the user, a
colleague, a reviewer or RD. The spec analysis re-applies every **table** entry on each new or updated draft
(skill: "Standing inputs"), and `check.ts` fails a draft whose `requirements.md` does not cite each open table entry
for its platform. **run** entries are followed by the run rules; **analysis** entries change how the spec is read.
Add new entries at the bottom with the next ID; never renumber. Mark an entry `superseded by REQ-…` in Status instead
of deleting it.

| ID | Date | From | Request | Kind | Platform | Status |
|---|---|---|---|---|---|---|
| REQ-001 | 2026-11-20 | user | Analyse the Kanban item 「Xmas & NY Sale」 and generate test cases (「請幫我分析以下功能並產生test case」). PM spec: PhD MX IAP Page, page 「11E Christmas Sale」 (https://www.figma.com/design/taJPs6ntbB61LQG0wJ0PiZ/PhD-MX-IAP-Page?node-id=14724-43579); Design spec: IAP, page 「261117_xmas_NY_sale」 (https://www.figma.com/design/2ogGJ14xElxFo4V8QjteOM/IAP?node-id=9627-6) (「剛剛那個是pm spec, 這個是design spec」). | table | both | open |
| REQ-002 | 2026-11-20 | user | Android table only (「Android only」, confirmed after the first draft): both specs are written for Google Play (「cancel in Google Play > Subscriptions」, Google Play SKU ids); no iOS table. | table | android | open |
| REQ-003 | 2026-11-20 | user | Run R1 on PhotoDirector 20.19.0 already on the SM-A5560 (R5CX30YHZHV) (「Yes, test 20.19.0」). The agent may change the phone clock (automatic date and time off, each row's date) and restores automatic time at the end. Free-trial eligibility is set with Google's Play Billing Lab app (Configuration settings › Add › Taiwan › tick Free trial › Apply, restart PhotoDirector), without asking. No license tester and no paid-user credit-state accounts were given: those rows are Blocked (test data). | run | android | open |
| REQ-004 | 2026-11-20 | user | After R1-a: continue the run with the moved-clock method (「Continue as is」); rows whose sale content comes from the server (interstitial, IAP Xmas/NY thumbnail, Credit IAP banner) are recorded Blocked (observability), not Fail, while TLS errors from the moved clock (O-3) may hide them. The three purchase rows (TC-023, TC-066, TC-067) may buy with the license tester's 「Test card, always approves」 (「Yes, test card」); cancel the test subscription afterwards. | run | android | open |
