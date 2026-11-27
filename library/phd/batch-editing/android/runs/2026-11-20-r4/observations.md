# Observations — R4 (TR261118-0070, S23)

- **O-1 (R4-e, TC-086 / TC-100).** The release note's 「banner style」 AI Enhance confirmation is still a centred modal
  card (90,930 900×443 px, room dimmed, taps behind and outside ignored, Cancel / system Back close it); what changed is
  its look: pill buttons, 「Cancel」 outlined and 「Start」 filled peach, replacing R3's flat text buttons with a divider
  (R3 tc086-dialog.png vs R4 tc086-banner.png). This is what the Design board design-dark-enhance draws, so no table
  question. The 「Discard changes?」 dialog (Keep / Discard) on the same page keeps the old flat text-button style
  (tc100-discard.png); whether it should follow is for Design/PM, not filed.
- **O-2 (R4-e, TC-094).** 20-photo batch took ≈ 150 s on Test Server (R3 100 s); one photo took 10.04 s
  (image 607), the rest ≤ 9.6 s (KP-070: Test Server timings are not an SLA).
- **O-3 (TC-151 re-run on v10).** With the picker's album list open (album name ▲), system Back leaves the Photo
  Picker for the Launcher instead of closing the list (TC-151-r-back-launcher.png). No source says what Back does
  here; noted, not judged or drafted.
