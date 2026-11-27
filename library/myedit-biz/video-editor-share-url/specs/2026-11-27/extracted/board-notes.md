# Board notes — myedit-biz/video-editor-share-url, spec set 2026-11-27

Read 2026-11-27. Sources: the KC PM spec (board `kc-spec`) and the PM Figma section 「26’ 11/E Share Project URL」
(6531:156549, file 3GnLdOiX9G5NH27l1ltqVr, page 「✅ Video Projects」, figma-pm / qa1). Board images in `figma/` (one
get_screenshot per board section at ≥ 0.5 px per point, shots.json). The boards draw desktop web screens (1920 pt wide),
not phone frames, so `scripts/figma/inventory.js` (phone frames 300–450 pt) was not run; controls are listed by hand
below (「Controls (Figma-read)」) and traced to rows. No arrows are drawn: each board is a left-to-right sequence.

## kc-spec — KC PM spec (ready_for_rd, 2026-11-11)
- Newest PM source, rewritten for Biz on 2026-11-11 (change log: plans Free / Pro, small-screen mask, `/share/{token}`
  URL, Biz storage messages, Podcast references replaced). Wins over the Figma notes where they differ.
- Rules: see requirements.md R-001 – R-060; zh_TW given for 「The shared project has been deleted and is no longer
  available.」 (分享的專案已被刪除，無法再使用。) and 「The project may have been updated. Try copying the link again.」
  (專案可能已更新。請嘗試重新複製連結。) — MUI deferred (REQ-002).

## pm-add-share-option — Add Share Project Option (6545:62731)
- Three editor screens: the top bar button 「Export & Share」 (cloud icon and 「Project Name」 beside it); the dialog
  opened from it; the same dialog with the URL tooltip on hover.
- Dialog drawn (image): title 「Share」 with X; text 「Share access to this project. Anyone with the link can sign in to
  view it. Premium users can copy and edit the project.」; read-only URL field + blue copy icon button; 「Export Format:
  mp4」; 「Cancel」 / 「Download」.
- Note 「20261019 Update」: URL https://myedit.online.en/video-editor/online-video-editor/{project token} (sync Photo
  Editor & Podcast; RD may suggest) — superseded for Biz by the KC spec's `{site}/{tool path}/share/{token}` (Q-2).

## pm-user-a-copy-link — User A Copy Shared Link Flow (6545:64349)
- Dialog open → click copy icon → tooltip 「Copied」 under the icon; A then shares the link himself.

## pm-user-b-receive — User B (Free & Audio Pro) Receive Share Link Flow (6545:67400)
- Header note: B = no Video Tools Access (MyEdit Free / Audio Pro). Biz mapping: Free (KC spec).
- Screens: signed out → 「Sign In」 dialog; shared view (read-only list of allowed and disabled controls, Create Copy
  button at the bottom centre); click Create Copy → Limitation popup (image: sample photo, to be the Video Editor cover;
  「Your account has limited access to copying projects.」 / 「Upgrade to unlock this feature for seamless project
  management.」 / 「Upgrade now」; no close icon visible in the mockup) → sales popup (MyEdit 「Pick a MyEdit Premium Plan」
  with Creator Pro / Studio Pro and 「Subscribe Now」, X at top right; Biz uses its own Pro plan).

## pm-user-c-receive — User C (Creator Pro & Studio Pro) Receive Share Link Flow (6545:75010)
- Header note: C = has Video Tools Access. Biz mapping: Pro.
- Screens: signed out → Sign In; view; Create Copy → dark dialog 「Copy Project to Start Editing」 (body text, 「Cancel」 /
  「Copy」, no X); loading dialog 「Loading Project...」 with a progress bar and 「0%」 over an empty editor (date label
  20261026 in the top bar: sample); the copy in the editor with left panel, Layer panel, enabled 「Export & Share」 and
  the cloud icon beside 「Project Name_copy」.
- Note 「20261019 Update」: the loading includes the time to copy the project's media.

## pm-my-projects-share — Copy Project Link from My Projects (6545:78360)
- My Projects › Video card more menu: 「Duplicate」, 「Share」, 「Rename」, 「Delete」 (icons duplicate, share, pen,
  trash); after Share the menu closes and the toast 「Share link copied. You can now share the link.」 shows at the top.

## Controls (Figma-read)
| Screen | Control | Row that presses it |
|---|---|---|
| Editor top bar | 「Export & Share」 | TC-002 |
| Export & Share dialog | X | TC-008 |
| Export & Share dialog | URL field (hover) | TC-004 |
| Export & Share dialog | copy icon | TC-005 |
| Export & Share dialog | 「Cancel」 | TC-007 |
| Export & Share dialog | 「Download」 | TC-006 |
| My Projects › Video card | more icon | TC-012 |
| More menu | 「Share」 | TC-013 |
| More menu | 「Delete」 | TC-051 (deletes P3) |
| More menu | 「Duplicate」, 「Rename」 | n/a: existing My Projects actions, not part of this feature (only their order is checked, TC-012) |
| Sign In dialog | X / sign-in | TC-017, TC-018 |
| Shared view | Play, Pause, Stop | TC-020 |
| Shared view | playhead | TC-021 |
| Shared view | full screen | TC-022 |
| Shared view | top menu, user profile | TC-023 |
| Shared view | left panel icons | TC-024 |
| Shared view | Layer panel icon | TC-025 |
| Shared view | timeline clip | TC-026 |
| Shared view | zoom in, zoom out, zoom slider | TC-027 |
| Shared view | undo, redo | TC-028 |
| Shared view | 「Export & Share」 (disabled) | TC-029 |
| Shared view | project name | TC-030 |
| Shared view | 「Create Copy of Project」 | TC-035, TC-041, TC-048 |
| Limitation popup | 「Upgrade now」 | TC-036 |
| Limitation popup | close | TC-038 |
| Sales popup | X | TC-037 |
| Sales popup | subscribe | TC-040 (parked: purchase) |
| Copy dialog | 「Cancel」 | TC-042 |
| Copy dialog | 「Copy」 | TC-043 |
| Storage-full message (Pro) | 「Manage」 | TC-049 |
