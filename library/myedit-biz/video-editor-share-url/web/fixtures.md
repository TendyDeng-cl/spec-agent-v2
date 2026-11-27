# Fixtures — myedit-biz/video-editor-share-url (web)

What a run needs on this computer and the accounts (run-web.md › `web/fixtures.md`; REQ-003).

## Environment
- MyEdit Biz demo, https://business-demo.myedit.online (product.json › web.base_urls.demo); build from `device-web.ts … build`
  (version.json) at every segment start. Build under test: TR261124-0031 (build number not known on 2026-11-27).
- Viewport 1440 × 900; TC-056 / TC-057 set 1200 / 1201 px wide and restore it; TC-058 needs Chrome device emulation with a
  phone user agent (a narrow desktop window shows the desktop mask text instead).
- Several accounts are signed in at once, each in its own Chrome profile and port (`web-account.ts`); switch with
  `device-web.ts <run> account NAME`, never by signing out and in. The accounts are shared by MyEdit and MyEdit Biz; check
  each one's **Biz** plan (`web-account.ts check NAME`, account menu on business-demo) before its rows.

## Roles
| Role | Account (web-account) | Plan / storage | Rows |
|---|---|---|---|
| Sharer A | jackcy (JackCY_Lee@cyberlink.com, port 9345) | Biz Pro Plan, Active (checked on business-demo 2026-11-27); 3440 credits; Biz cloud 31.7 / 50 GB | TC-001 – TC-008, TC-011 – TC-013, TC-015, TC-033, TC-034, TC-051 |
| Free receiver B, also owner of P2 | free (port 9341) | Free, 2 / 5 GB | TC-009, TC-014, TC-016, TC-018 – TC-031, TC-033 – TC-038, TC-045, TC-047, TC-050, TC-052, TC-054 – TC-058 |
| Pro receiver C with room | jackcy (port 9345; the user, 2026-11-27, REQ-006). C copies P2 (owned by free), never A's own P1 | Biz Pro Plan (checked 2026-11-27), Biz cloud 31.7 / 50 GB, room ≥ the size of P2 | TC-041 – TC-047 |
| Pro, storage full | premium (port 9342; or studio-pro-full, port 9344) — check it shows Biz Pro | Pro, cloud full; never fill or empty | TC-010, TC-032, TC-048, TC-049 |
| Free, storage full | storage-full (port 9343) | Free, 5 / 5 GB; never fill or empty | TC-039 |
| Signed-out receiver | a fresh Chrome profile on its own port (no sign-in) | — | TC-017, TC-018 (the user signs in), TC-053 |

## Projects (made at the first segment, by the run)
| Project | Owner | Content | Rows |
|---|---|---|---|
| P1 | A (jackcy) | 2–3 clips: one video A uploads (e.g. a 10 s 720p MP4) plus stock clips, one text title | most rows |
| P2 | free | 2 clips, one of them a video the owner uploads (for TC-046 / TC-047) | TC-009, TC-016, TC-041 – TC-047 |
| P0 | A | a Video Editor project with no clips (add one clip, let it save, delete the clip, let it save) | TC-034 |
| P3 | A | a throwaway project with one clip, deleted by TC-051 | TC-051 – TC-053 |

## Purchases
- TC-040 (subscribe in the sales popup): MyEdit Biz demo has no test purchase (the user, 2026-11-27, REQ-007). The user tests
  it by hand (REQ-008): runs skip it and record the user's result; never use a real payment method, never type a password or card number.

## Order (one-way state)
- TC-047 deletes P2's uploaded video: after TC-041 – TC-046.
- TC-051 deletes P3: TC-052, TC-053 after it. The Deleted section runs last.
