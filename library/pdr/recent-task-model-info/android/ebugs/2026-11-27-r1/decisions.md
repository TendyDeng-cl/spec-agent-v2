# Review decisions — Recent Task Model Info Android, R1, 16.9.0 build 2611251

The reviewer's decisions (user, 2026-11-27, in chat): 「file all as Ethan_Hsu and use the build's TR as the target」, with the review pages' copied decisions. TR261125-0064 header re-read before filing: 「16.9.0.2611251 (Deluxe)」, PowerDirector Mobile for Android, Generic v16.9, due 2026-12-02. The page's Account and TRCode were blank; the user's message sets them (ETHAN_HSU, the build's TR).

Account: ETHAN_HSU
Method: API
Source tag: [AIAgent]
TRCode: TR261125-0064

Same-OS duplicates of the AIGC Watermark E1 batch, filed there first and not filed again (overlay rule 7; the user asked about the same overlap on the Cinematic Reel page): ISS-RTM-06 = ISS-AWA-24 (Text to Image from a selected photo clears the editor selection; TC-109/110/113/114), ISS-RTM-09 = ISS-AWA-29 (My Artwork from the Home ☰ Menu has no way back to the Menu; TC-081). Their bug codes are recorded in dedupe.txt and question-status.json.

| # | ISS | Sev | Belong | Type | Action | Short Description |
|---|---|---|---|---|---|---|
| F-1 | ISS-RTM-01 | 2 | RD | UI | file | PDR-A 16.9.0 - [AIAgent][UI] Recent task: Image to Video Recent page and model tag stay dark in light mode |
| F-2 | ISS-RTM-02 | 3 | RD | Functional | file | PDR-A 16.9.0 - [AIAgent] Recent task: Closing a Text to Image item from My Artwork skips the Text to Image list |
| F-3 | ISS-RTM-03 | 3 | RD | Functional | file | PDR-A 16.9.0 - [AIAgent] Text to Video: ‹ on Recent tasks after Generate skips the Text to Video page |
| F-4 | ISS-RTM-04 | 2 | PM | UX | file | PDR-A 16.9.0 - [AIAgent][UX] Recent task: System Back in edit mode leaves the page, not just edit mode — PM to decide |
| F-5 | ISS-RTM-05 | 3 | PM | UX | file | PDR-A 16.9.0 - [AIAgent][UX] Recent task: Tapping the model tag opens the result page — PM to decide |
| F-6 | ISS-RTM-06 | 3 | PM | UX | duplicate of ISS-AWA-24 | PDR-A 16.9.0 - [AIAgent][UX] Text to Image (Photo Tools): Back to the editor clears the photo selection — PM to decide |
| F-7 | ISS-RTM-07 | 3 | PM | UI | file | PDR-A 16.9.0 - [AIAgent][UI] PIP Photo Tools: Entry reads 「Text to Image」, sheet says 「AI Text to Image」 — PM to decide |
| F-8 | ISS-RTM-08 | 3 | PM | UX | file | PDR-A 16.9.0 - [AIAgent][UX] Recent task: From a completion banner it has no ‹ and leaves to the Launcher — PM to decide |
| F-9 | ISS-RTM-09 | 3 | PM | UX | duplicate of ISS-AWA-29 | PDR-A 16.9.0 - [AIAgent][UX] Home Menu: My Artwork opened from ☰ has no way back to the Menu — PM to decide |
