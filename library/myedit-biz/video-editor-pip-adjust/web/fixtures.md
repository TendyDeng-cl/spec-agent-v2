# Fixtures — myedit-biz/video-editor-pip-adjust (web)

What a run needs on this computer and the accounts (run-web.md › `web/fixtures.md`; REQ-005).

## Environment
- MyEdit Biz demo, https://business-demo.myedit.online (product.json › web.base_urls.demo), English site, Chrome at
  1440 × 900. Build from `device-web.ts … build` (window.SENTRY_RELEASE) on the run day; TR261124-0031 names no build yet.
- Video Editor: create the projects below once per run and name them `casebook-pip-<date>-<name>`; work only in them.

## Accounts (shared by MyEdit and MyEdit Biz: `node scripts/web-account.ts list`)
- Main test account: `jackcy` (port 9345, JackCY_Lee@cyberlink.com; cloud 88.57 GB / 100 GB; the menu shows no plan name). Check its MyEdit Biz plan with `web-account.ts check jackcy` and the account menu before the run.
- Biz Pro account (Cutout is Biz Pro only, KC code-derived): needed by every row whose Precondition says 「Biz Pro」 (TC-045, TC-046, TC-053, TC-055, TC-078 – TC-080, TC-104 – TC-109, TC-117). That account is `jackcy` (the user, 2026-11-27, REQ-006): business-demo account menu on 2026-11-27 shows Pro Plan, Active, 3440 credits, Biz cloud 31.7 / 50 GB (the 88.57 / 100 GB figure is its MyEdit storage). Cutout may spend credits: check the balance first.
- Account without Biz Pro (TC-116): `free` (port 9341) if it signs in to MyEdit Biz demo; `premium` (Creator Pro, storage full) and `storage-full` are full: do not use them for rows that save projects. Never fill or empty `storage-full` or `studio-pro-full`.

## Test media (kept in `~/.casebook/web/fixtures/video-editor-pip-adjust/`, not in git; make with ffmpeg / an image tool)
| Name | What | Rows |
|---|---|---|
| fx-photo | 1200 × 800 PNG (3:2, non-square): left half red, right half white, a blue square in the top-right corner, an arrow pointing up | most rows (orientation, crop, mask) |
| fx-photo2 | another clearly different photo (e.g. 800 × 1200, green with a yellow star) | second PiP in the full project |
| fx-subject | a photo of a standing person on a plain but non-white background (feet visible) | Cutout rows |
| fx-main | 30 s 1080p H.264 MP4 with the time code burnt in large (frame at 0:02 and 0:05 tell apart) and colourful content | main track |
| fx-main2 | 10 s 1080p MP4, different colours | second main clip, transitions |
| fx-pipvideo | 5 s MP4 | video PiP (R-005, R-031) |

## Projects
- **basic**: fx-main on the main track, fx-photo as a Photo PiP from 0:05 to 0:10 (rows that say 「starts at 0:05」 rely on this).
- **main photo**: fx-main, then fx-photo on the main track (main photo).
- **full**: fx-main and fx-main2 on the main track with a transition between them, fx-photo and fx-photo2 as Photo PiPs, fx-pipvideo as a video PiP, a text, a sticker and a music track.
- **missing file** (TC-048): a project whose main video, main photo and Photo PiP were deleted from Uploads after being added. If the site does not let a used upload be deleted or keeps the clip, record TC-048 Blocked `--as test-data`.
- Reset state between rows by Undo or a fresh copy of the project; Fade, Corner, Cutout, Mask and Crop settings named in a Precondition are set at the start of the row.

## Evidence
- Screen recording (`device-web.ts record`) for drags (TC-016, TC-069, TC-085), the Cutout fades and processing screens (TC-078, TC-079, TC-104 – TC-109).
- Exports (TC-056, TC-057, TC-114) are downloaded MP4 files: check them with ffprobe and frame grabs at the PiP's time.
