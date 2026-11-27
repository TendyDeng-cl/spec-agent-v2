# TR261123-0071 verify plan — PHD-A 20.19.0.v202611232103 (R8), 2026-11-24

Scope: all 6 bugs on the TR's verify list (PHD-A rule: every bug, whoever created it; all 6 WILLY_WU).
Testers on the TR: WILLY_WU, BIAGGI_LI. Pass 0 / Fail 0 / Not yet verified 6; no QR on the TR yet.
Carried: P0147 failed on R7 (QR261123-0070); the other five are first verified on this TR (filed on TR261111-0042).
RD left no resolve notes (attached straight to the TR by JANE_LAI). TR change log names for Swipe Collage: "Fixed a
release-build crash when restoring drafts and a template page crash affecting eight languages."

Device: Google Pixel 8a (akita, adb 42201JEKB02229), Android 16. Installed base.apk MD5
473C0DDC7F8FF12C492E0E1884A92B46 = the TR's APK (build NAS `CL_Deluxe.20.19.0.v202611232103_PHA261029-01_R8`,
Cyberlink.MD5), installed 2026-11-24 11:05. The SM-A5560 holds a different APK: not used.

Bug bodies: `bugs-bodies.md`.

## What each bug needs (today's spec)

| Bug | Area | Check | Today's spec | Cost |
| --- | --- | --- | --- | --- |
| P0071 | Template Page cards / Template Preview | cards show first page + page dots; preview shows pages, dots, swipes | as filed (Design Template Page / entry_launcher2) | none |
| P0104 | Background Texture / Add Layer frames | PRO crown and NEW tag on textures and frames (Free and Premium) | R-? CMS tags (D2-07 / D3-02 / F17) | none |
| P0105 | Export IAP | Free: 3rd export shows 「PhotoDirector Premium」 IAP, again at 6th | R-126 every 3 saves (exports counted) | none |
| P0106 | Kill during editing | edit → force stop → relaunch: 「Continue editing?」 (launch / Collage / Template Page), Continue restores | R-034; Q-16 where it shows (assumption: recorded) | none |
| P0147 | Draft after Removal + kill | Removal → Try First → ✕ → force stop → reopen Swipe Collage: no crash | R-034 | Removal free try |
| P0111 | AI Hair Color Custom panel | panel: no ✕ ↩ ↪ ✓ row, top corners rounded; ⌄ vs grab handle | Q-17: Design (handle) first; ⌄ not required | none (no generation needed) |

## Order (one segment per subagent, one phone)

- A. Swipe Collage on Free: P0071 → P0104 (textures, frames; then Premium recheck via debug dialog only if Free shows
  none) → P0105 (exports) → P0106 → P0147 (last: kills the app with a draft).
- B. AI Hair Color P0111.

End state to restore: tier as found, test photos pushed by the run removed.
