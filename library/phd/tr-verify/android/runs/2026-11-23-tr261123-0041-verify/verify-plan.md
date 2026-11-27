# TR261123-0041 verify plan — PHD-A 20.19.0.v202611231214 (R7), 2026-11-23

Scope: all 22 bugs on the TR's verify list (PHD-A rule: every bug, whoever created it; 21 WILLY_WU, 1 IAN_SWEN).
Testers on the TR: WILLY_WU, BIAGGI_LI. Pass 0 / Fail 0 / Not yet verified 22 at 14:20.
Carried from TR261118-0070 (R5): P0118 failed there; every other bug is new on this TR.

Device: Google Pixel 8a (akita, adb 42201JEKB02229), Android 16, 1080 × 2400. App 20.19.0 versionCode 90201902,
installed by the user 2026-11-23 14:24 (the TR's build; R5 was 90201901), VCS revision b4d0cd92. About shows Version
20.19.0, SR PHA261029-01; no build number on screen. Test Server.
Start state: not signed in, Free, 1925 credits (Mine, 14:35).

Bug bodies: `bugs-bodies.md`; RD resolve notes: `rd-notes.json`; raw: `bugs-logdata.json`.

## What each bug needs (today's spec)

| Bug | Area | RD says | Check | Cost |
| --- | --- | --- | --- | --- |
| P0078 | Swipe Collage Text / Text Bubble | implemented | Text opens field + keyboard; text and bubble content editable | none |
| P0079 | Swipe Collage frame tool bar | implemented | frame bar has Opacity, Shadow, Flip H, Flip V, Duplicate, Lock, Delete; floating Lock | none |
| P0081 | Swipe Collage image tool bar labels | latest build | labels Flip H / Flip V / Adjust / Enhance | none |
| P0086 | Swipe Collage credit button | "ui modify, remove credit button" | credit button: gone, or shows balance + opens Buy Credit; check today's Design Enhance_2 | AI Enhance 6 credits if needed |
| P0088 | Swipe Collage BG eyedropper | "tap the canvas, the pin moves there" | eyedropper picks a photo colour (tap and drag) | none |
| P0090 | Swipe Collage Sticker panel | ui modify | Edit Room Sticker panel: store, Favorites, AI Sticker, More, ✕/✓ | none |
| P0091 | Swipe Collage Text Bubble panel | ui modify | 「∅」 first, ✕/✓ bar | none |
| P0093 | Swipe Collage Ratio | latest build | ratio change keeps elements; canvas grows down / shrinks up | none |
| P0095 | Swipe Collage Pages ✓/✕ | latest build | ✓ applies; ✕ asks 「Discard changes?」 when changed | none |
| P0096 | Swipe Collage Pages undo/redo | ui modify | no ↶/↷ in Pages | none |
| P0147 | Swipe Collage draft after kill | originalUri stored | Removal → Try First → ✕ → force stop → reopen: no crash | Removal free try |
| P0120 | Batch 「All」 per photo | per-photo state | Adjust and Crop: photo 2 with no change → All disabled | none |
| P0125 | Batch Crop & Rotate crash | clamp fix | 2730×1535 and 1706×2559 photos open in Crop & Rotate, also by thumbnail switch | none |
| P0130 | Reel Creator Import crash | tray notify fix | after a generation, template → photo → Import: no crash | 1 Reel generation |
| P0132 | Reel Creator red tray text | PM: no red text, Next disabled | build follows the PM comment (no red text, Next disabled) | none |
| P0133 | Reel Creator Import ticks | compare by file id | Import ticks every imported photo; tap unpicks, no duplicate | deletes 2 test photos |
| P0134 | Reel Creator confirm page | PM: no 9:16, hint removed | build follows the PM comment | none |
| P0135 | Reel Creator confirm count red | n/max in error colour | 14/40 red, Generate disabled | none |
| P0127 | Hair Color palette Done | already solved | Done adds a new ringed circle after the wheel | none |
| P0118 | Hair Color one-time 100% dialog | PM: panel first → close → Intensity, implemented | first Custom result: dialog after collapsing the panel | 1 Custom generation |
| P0107 | AI Edit Agent Suggestion tap area | click on bubble only | blank space right of a chip / suggestion does nothing; bubble works | none |
| P0126 | I2V Recent Custom Save & Share | already solved | new Custom video from Recent › Video shows 「Prompts & Settings」 | 1 Kling 3.0 5 s (30) |

## Order (one segment per subagent, phone shared, run one at a time)

- A. Swipe Collage: P0090 → P0091 → P0078 → P0079 → P0081 → P0086 → P0088 → P0093 → P0095 → P0096 → P0147 (last:
  it kills the app with a draft).
- B. Batch Editing P0120 → P0125; AI Hair Color P0127 → P0118 (one-time state).
- C. Reel Creator P0134 → P0135 → P0132 → P0133 → generation → P0130.
- D. AI Edit Agent P0107; I2V P0126 (one generation).

End state to restore: Free, signed out as found, Wi-Fi on, test photos pushed by the run removed.
