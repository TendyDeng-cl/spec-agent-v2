# TR261123-0071 RD change log check — PHD-A 20.19.0.v202611232103 (R8), 2026-11-24

Request (user, 2026-11-24): after QR261124-0033, verify on the Pixel 8a what RD wrote in the TR's change log for
Swipe Collage and Image to Video. Phone: Google Pixel 8a (42201JEKB02229), installed APK MD5 = the TR's APK; not
signed in, Free.

Each item gets: Works / Partly / Not seen / Can't check, with screenshots (and logcat for analytics), and anything
it changes compared with the spec (library/phd/swipe-collage, library/phd/i2v-reuse).

## C. Swipe Collage
1. Page count controls; long-press page reordering; discard confirmation for page changes (Pages ✕ after a change).
2. Editing viewport shows about 1.2 pages; rotation snapping and position snapping (PM evaluation).
3. Shadow controls for stickers and frames.
4. Element selection, placement, multi-page photo selection.
5. Adjust and Filter kept when opening Removal, not applied twice afterwards.
6. Draft restore crash fixed (checked in QR261124-0033, P0147); template page crash in eight languages: open the
   Template Page with the app locale set to each TR language (`cmd locale set-app-locales`), restore English after.

## D. Image to Video
7. 「Settings applied」 toast when Reuse restores Custom settings.
8. Reuse follows the standard introduction flow; leaving the room returns to Save & Share.
9. Portrait orientation applied earlier: no brief landscape flash on entering (screen recording).
10. Model-specific ImageToVideo_Reuse_Click analytics (logcat).
