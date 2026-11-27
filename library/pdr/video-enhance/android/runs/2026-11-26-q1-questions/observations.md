# Observations — Q1 (Video Enhance Android, 16.9.0 build 2611231, SM-A5360, Stage)

- **O-1 (TC-351, sign-in after `pm clear`).** The first Google sign-in (Pro › User Sign in › Google) went to Chrome
  「You Are All Set!」, but back in the app the Sign In page showed 「No Internet Connection / Check your network
  connection and then try again. / Tap to Retry」 while the phone was online (ping 8.8.8.8 0% loss, 17F-QAAPP-2.4G).
  After 「Tap to Retry」 the Sign In page came back; a second Google tap went through (`bindMember, bindMemberSuccess:
  0` 12:15:57) to 「Account Sign In / Credits & cloud AI tasks on this device will be stored under your account when you
  sign in」 「Got it」. The log shows no network error around it. Seen once; not filed (outside Video Enhance, KP-093
  covers sign-in after `pm clear`). Evidence: screenshots/tc351-reset-09.png, tc351-reset-10.png, tc351-reset-14.png.
- **O-2 (TC-351, Demo page).** The Video Enhance Demo page subtitle is still AI Reframe's 「AI reframe your video for any
  aspect ratio, then fine-tune the crop in real time.」 — already known (R2 TC-011 / O-34, 2611181 recheck). Evidence:
  screenshots/tc351-reset-17.png.
- **O-3 (TC-351, precondition).** ve-000100-720p30 prices 「Enhance ◆ 2」, not ◆ 1 as TC-351's precondition says: its
  video track is 1.033 s and bills 2 s (KF-001). The row's precondition should name ve-clean-noaudio-000100-720p30
  (bills 1) or say ◆ 2. Charged 2 (29372 → 29370).
- **O-4 (TC-351).** After the reset Recent task listed only the new task (KF-009, already known).
