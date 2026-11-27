#!/usr/bin/env python3
"""Build the Xmas & NY Sale Android eBug draft batch for round R1 (table v1, draft 20261120-152114) on
PhotoDirector 20.19.0 (90201901), run library/phd/xmas-ny-sale/android/runs/2026-11-20-r1/.

Writes ../20261120_eBug_drafts_Xmas-NY-Sale-R1_20.19.0.md, the sibling _images/ folder (one NN_ISS-ID folder per
entry: JPEGs named 20.19.0_xnsNN_<slug>.jpg with a red box where it helps, plus the logcat excerpt where the finding has
a log cause), logs/ and entries.json. Nothing is filed. Every Fail row of results.csv and every observation O-n is
mapped (entry / not raised); the script stops when one is missing.

Log windows are in PHONE time: the run moved the phone clock (REQ-003), so logcat lines carry the moved date and
log-slice.ts found nothing per case; each excerpt names its segment's pull folder and the phone-time window.
Built from the Creative Reel R1 generator.
Run: python library/phd/xmas-ny-sale/android/ebugs/2026-11-20/generators/ebugs.py
"""
import csv, json, os, re, shutil, sys
from PIL import Image, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.dirname(HERE)
ROOT = os.path.abspath(os.path.join(OUT, "..", ".."))           # library/phd/xmas-ny-sale/android
RUN = f"{ROOT}/runs/2026-11-20-r1"
SPEC = os.path.abspath(f"{ROOT}/../specs/2026-11-20/extracted/figma")
NAME = "20261120_eBug_drafts_Xmas-NY-Sale-R1_20.19.0"
V, B = "20.19.0", "90201901"
PROD = "PHD-A"
FEAT = "Xmas_NY_Sale"
DEV = "Device: Samsung Galaxy A55 (SM-A5560) / Android 15, Test Server, Free account"
DEVP = "Device: Samsung Galaxy A55 (SM-A5560) / Android 15, Test Server, paid (VIP) account"
PM_URL = "https://www.figma.com/design/taJPs6ntbB61LQG0wJ0PiZ/PhD-MX-IAP-Page"
DS_URL = "https://www.figma.com/design/2ogGJ14xElxFo4V8QjteOM/IAP"


def pm(frame, node):
    return f"Spec Link: Xmas & NY Sale PM Figma (PhD MX IAP Page, page 11E Christmas Sale, section spec), {frame} -\n{PM_URL}?node-id={node}"


def ds(frame, node):
    return f"Spec Link: Xmas & NY Sale Design Figma (IAP, page 261117_xmas_NY_sale), {frame} -\n{DS_URL}?node-id={node}"


P_NOTE = pm("spec note board", "14724-43580")
P_IAP = pm("IAP Page frame", "14729-50273")
P_CFREE = pm("Credit IAP Page, Free user frame", "14729-52322")
P_SPLASH = pm("Splash page (Xmas only) frame", "14729-52119")
P_MINE = pm("Mine tab (Xmas only) frame", "14729-51975")
P_LAUNCH = pm("Launcher - IAP icon frame", "14724-43681")
D_IAPX = ds("IAP page Xmas frame", "9707-7836")
D_LNY = ds("Launcher NY frame (NY_ani annotation)", "9740-344")

CLK = lambda t: f"Set the phone clock to {t} local time (automatic date and time off)"
STOP = "Force-stop PhotoDirector"
L = "Launch the APP"
ICON = (740, 90, 1060, 240)          # Launcher IAP icon, top right (1080 x 2340)
ICONB = (740, 90, 1060, 420)         # icon plus the place the countdown bubble takes

# Each entry: iss, title, cls (Functional / UI / UX), sev, owner, cases, rep, note (QA note, not pasted), short, steps,
# res, res_zh, exp, exp_zh, spec (Spec string or None), rec ([AI Recommendation] lines or None), links, dev,
# imgs [(path relative to RUN or spec:<file>, slug, box or None)], log (title, [(label, pull, day, t0, t1)]) or None, rel
E = [
 dict(iss="ISS-XNS-01", title="PM: Xmas splash icon is the Santa-hat logo, not the mockup's reindeer", cls="UI", sev=3, owner="PM",
      cases=["TC-070"], rep=(2, 2),
      note="R-070 (PM spec note: 「Xmas Sale 期間 / splash page 換 icon … (同去年)」; the PM 「Splash page (Xmas only)」 mockup draws the PhotoDirector logo with a reindeer in a Santa hat holding a candy cane). At 2026/12/15 10:00 the splash shows the logo wearing a red Santa hat (a Christmas icon does show) and no reindeer; the same for a paid user (TC-071, Pass on the icon change itself). The note only says the icon changes 「as last year」, so whether the mockup's reindeer is the required art is PM's call: filed to PM rather than RD (spec-basis check). No Design frame draws the splash. Screen recording frames, no log cause.",
      short="Xmas splash icon is a Santa-hat logo, mockup draws a reindeer — PM to confirm",
      steps=[CLK("2026/12/15 10:00"), STOP, L, "Look at the splash page"],
      res="The splash shows the PhotoDirector logo with a Santa hat; the mockup's reindeer is not there.",
      res_zh="聖誕期間啟動頁為戴聖誕帽的 logo，沒有 mockup 中的麋鹿。",
      exp="PM to confirm the Xmas splash art: the mockup's reindeer icon or the Santa-hat logo the app shows.",
      exp_zh="請 PM 確認聖誕啟動頁圖示應為麋鹿版或聖誕帽 logo。",
      spec=None, rec=None,
      links=[P_SPLASH, P_NOTE], dev=DEV,
      imgs=[("screenshots/TC-070-splash-frame.png", "splash_santa_hat", None), ("spec:pm-splash.png", "pm_splash_mockup", None)],
      log=None, rel=[]),
 dict(iss="ISS-XNS-02", title="PM: text under the trial CTA — Design 「Auto-renewal for …/year」 vs PM policy text", cls="UI", sev=3, owner="PM",
      cases=["TC-014"], rep=(2, 2),
      note="Q-4. Design IAP page Xmas frame (page dated 2026-11-17) draws 「Auto-renewal  for $29.99/year」 under 「Start 7-Day Free Trial」; the PM spec note (undated) puts the policy text there 「CTA 下方字串如下, 確保用符合 Policy」: 「7 days free, then <price>/year. Auto-renews yearly …」. The app shows the PM text (NT$650 filled in, no literal <price>). By the team's Design-first rule the Design line would win, but the PM text is a Google Play policy requirement and the PM page has no date, so neither source is plainly newer: filed to PM to decide (open question rule, 2026-11-11). Seen on the Xmas IAP page (TC-014, 12/15) and the NY IAP page (TC-011 screen, 12/30). The non-trial and Monthly texts are PM-only and match (TC-015, TC-016). Layout finding, no log.",
      short="IAP page: PM policy text under trial CTA, Design has 「Auto-renewal for …/year」 — PM to decide",
      steps=[CLK("2026/12/15 10:00"), L, "Tap the Santa-hat IAP icon at the Launcher's top right", "Keep Yearly chosen", "Read the text under 「Start 7-Day Free Trial」"],
      res="Under the CTA the app shows the PM policy text (「7 days free, then NT$650/year …」), not the Design line.",
      res_zh="CTA 下方顯示 PM 的政策文字，而非 Design 的「Auto-renewal for …/year」。",
      exp="PM to decide which text sits under the trial CTA: Design 「Auto-renewal  for <price>/year」 or the PM policy text.",
      exp_zh="請 PM 決定試用 CTA 下方應使用 Design 文字或 PM 政策文字。",
      spec="Spec string: 「Auto-renewal  for $29.99/year」 (Design) / 「7 days free, then <price>/year. Auto-renews yearly until canceled. To avoid being charged, cancel in Google Play > Subscriptions at least 24 hours before the trial ends.」 (PM)",
      rec=["Under trial CTA: 7 days free, then <price>/year. Auto-renews yearly until canceled. To avoid being charged, cancel in Google Play > Subscriptions at least 24 hours before the trial ends."],
      links=[D_IAPX, P_IAP], dev=DEV,
      imgs=[("screenshots/TC-010-iap.png", "trial_cta_text", (60, 2010, 1020, 2150)), ("screenshots/TC-011-iap.png", "trial_cta_text_ny", None)],
      log=None, rel=["Q-4"]),
 dict(iss="ISS-XNS-03", title="IAP page CTA for a user without free trial reads 「Continue」, not 「Subscribe for …/year」", cls="UI", sev=3, owner="RD",
      cases=["TC-015"], rep=(2, 2),
      note="R-019 (PM spec note: 「無 trial 資格用戶 CTA 字串: Subscribe for <price>/year」; PM-only, the Design draws only the trial state). Non-trial user set with Play Billing Lab (Taiwan, Free trial unticked), PhotoDirector relaunched, 12/15 10:00. The gold CTA reads 「Continue」 / 「(NT$650/year)」; the text under it matches the PM non-trial string (Pass). With Monthly chosen the CTA reads 「Continue」 / 「(NT$169/month)」 (TC-016; the spec gives no Monthly CTA string). The text is stated by the spec and the app differs: RD (text rule 2026-11-11). The interstitial's non-trial CTA (R-049, same string) could not be seen (TC-047 Blocked, O-3). Text finding, no log.",
      short="IAP page: non-trial user CTA reads 「Continue (NT$650/year)」, not 「Subscribe for …/year」",
      steps=["Open the Play Billing Lab app", "Tap Configuration settings", "Choose Taiwan", "Untick Free trial", "Tap Apply", CLK("2026/12/15 10:00"), STOP, L, "Tap the Santa-hat IAP icon at the Launcher's top right", "Keep Yearly chosen"],
      res="The gold CTA reads 「Continue」 with 「(NT$650/year)」 below it.",
      res_zh="無試用資格時 CTA 顯示「Continue (NT$650/year)」。",
      exp="The CTA reads 「Subscribe for NT$650/year」 for a user who cannot take the free trial.",
      exp_zh="無試用資格用戶的 CTA 應顯示「Subscribe for NT$650/year」。",
      spec="Spec string: 「Subscribe for <price>/year」",
      rec=["CTA (no free trial, Yearly): Subscribe for <price>/year"],
      links=[P_NOTE], dev=DEV,
      imgs=[("screenshots/TC-015-iap.png", "nontrial_cta", (52, 1860, 1028, 2000)), ("screenshots/TC-016-monthly.png", "nontrial_cta_monthly", None)],
      log=None, rel=[]),
 dict(iss="ISS-XNS-04", title="Free-user sale credit pack: 500 credits NT$2090 is 11% off the regular NT$2350, not 20%", cls="Functional", sev=2, owner="RD",
      cases=["TC-060"], rep=(3, 3),
      note="R-062 (PM spec note: 「[Credit] Free user 500/ Paid user 1000 pack 20% off」, SKU phd_500_credit_freeuser_summer_sale). Credit IAP page, Free, 12/15 10:00: 「Santa’s bonus pack」 500 「NT$2090」; the regular 500 pack on the same page is 「NT$2350」 (also before the sale, O-1). 2090 / 2350 = 0.889 → 11.1% off; 20% off is NT$1880. Google Play checkout 「500 Credits (Special Offer)」 「NT$2,090.00」 and the log names the right SKU, so the SKU's store price is what is off (Q-9: the SKU id is reused from the summer sale; its price may be the summer one). The same NT$2090 in the NY Sale (TC-061 「Year End Sale」) and in the test purchase (TC-066, 「[purchase] success credits: phd_500_credit_freeuser_summer_sale」). Paid user's 1000 pack not reached (account Auto Pass eligible, TC-063). Severity S2: wrong sale price shown and charged.",
      short="Credit IAP page: free-user 500-credit sale pack NT$2090 is 11% off regular NT$2350, not 20%",
      steps=[CLK("2026/12/15 10:00"), L, "Tap Mine", "Tap Buy Now on the My Credits card", "Read the price of the 「Santa’s bonus pack」 500 card", "Read the price of the regular 500 pack", "Tap 「Get 500 Credits for NT$2090」", "Read the price on the Google Play sheet"],
      res="The 500-credit sale pack costs NT$2090 (Google Play NT$2,090.00), 11% below the regular 500 pack's NT$2350.",
      res_zh="免費用戶 500 點折扣包為 NT$2090，只比原價 NT$2350 便宜 11%。",
      exp="The free user's 500-credit sale pack is 20% below the regular 500 pack (NT$1880 at NT$2350).",
      exp_zh="500 點折扣包應比原價便宜 20%（原價 NT$2350 時為 NT$1880）。",
      spec="Spec string: 「[Credit] Free user 500/ Paid user 1000 pack 20% off」",
      rec=None,
      links=[P_NOTE, P_CFREE], dev=DEV,
      imgs=[("screenshots/TC-075-credit-iap.png", "pack_prices", [(72, 790, 1008, 1010), (76, 1284, 371, 1523)]), ("screenshots/TC-060-sheet.png", "play_sheet_price", None), ("screenshots/TC-059-credit.png", "ny_pack_same_price", None)],
      log=("Purchase of the 500-credit sale pack (SKU and price path)", [("TC-060 checkout opened and closed without buying, R1-a", "R1-a", "2026-12-15", "10:07:00", "10:07:30"), ("TC-066 test-card purchase of the same pack, R1-d", "R1-d", "2026-12-15", "10:00:20", "10:01:20")]),
      rel=["Q-9"]),
 dict(iss="ISS-XNS-05", title="NY Sale: Launcher IAP icon stays the regular orange crown, no champagne glasses", cls="Functional", sev=2, owner="RD",
      cases=["TC-031", "TC-004", "TC-038"], rep=(5, 5),
      note="R-031 / R-032 (PM spec note: 「free user sale 期間 Launcher IAP icon 改圖」; Design Launcher NY frame: icon 「NY_ani」, two champagne glasses, Lottie @raw/ny_ani_cheers, loop and autoplay). Free user. At 2026/12/27 23:59:59 → 12/28 00:00:01 on the open Launcher the Xmas bubble reaches 「00:00:00」 (never negative, Pass) and the Santa-hat icon (btnLauncherCampaignPurchase) is replaced by the regular orange crown (btnLauncherPurchase), not the glasses (TC-038). The same after a force-stop and relaunch at 12/28 00:01 (TC-004), at 12/29 09:00 and 12/30 10:00 (TC-031) and 2027/01/02–01/05 (TC-035, TC-006; the NY countdown bubble then sits under the regular crown); TC-032 (animation loop) Blocked behind it. The Xmas Santa-hat crown did show 12/11–12/27 (TC-030 Pass). Log at each launch lists 「addEvent 2027_New_Year_Sale_Campaign」 and ThemeUtils 「LottieAnimationView is an AppCompat widget …」, but the Lottie line appears on every launch, also on the real date and during the Xmas Sale, so it is not shown to be the cause. ⚠ Caveat for the reviewer: with the moved clock the launcher campaign query (hy5 「queryContent Exception … Chain validation failed」, the class that logs 「queryLauncherCampaignData」) fails on every launch (O-3, KP-144); if the NY icon is chosen by server campaign data rather than the build, this may be the moved-clock artefact and RD's server-side sale switch is needed to confirm. Hold it if you want that confirmation first.",
      short="Launcher: NY Sale IAP icon stays regular orange crown, no champagne-glasses animation",
      steps=[CLK("2026/12/30 10:00"), STOP, L, "Look at the IAP icon at the Launcher's top right"],
      res="During the NY Sale the Launcher IAP icon is the regular orange crown, not the champagne glasses.",
      res_zh="新年特賣期間 Launcher IAP 圖示仍為一般橘色皇冠，不是香檳杯。",
      exp="During the NY Sale a free user's IAP icon is the animated two champagne glasses (NY_ani).",
      exp_zh="新年特賣期間免費用戶的 IAP 圖示應為香檳杯動畫（NY_ani）。",
      spec=None, rec=None,
      links=[D_LNY, P_NOTE], dev=DEV,
      imgs=[("screenshots/TC-044-d2.png", "ny_regular_crown", ICON), ("screenshots/TC-031-icon-crop.png", "ny_icon_crop", None), ("screenshots/TC-038-235958.png", "xmas_icon_before", ICONB), ("screenshots/TC-038-000001.png", "after_midnight_crown", ICONB), ("spec:d-launcher-ny.png", "design_ny_launcher", None)],
      log=("Launches during the NY Sale (campaign list, Lottie theme error, launcher campaign query)", [("TC-004 relaunch at 12/28 00:01, R1-c", "R1-c", "2026-12-28", "00:01:00", "00:01:04"), ("TC-031 launch at 12/30 10:00, R1-d", "R1-d", "2026-12-30", "10:00:00", "10:00:06")]),
      rel=[]),
 dict(iss="ISS-XNS-06", title="Countdown bubble does not appear at 72:00:00 on the open Launcher, only after a relaunch", cls="Functional", sev=3, owner="RD",
      cases=["TC-033", "TC-035"], rep=(2, 2),
      note="R-034 (PM spec note: 「從倒數 72:00:00 起設倒數計時 bubble (兩個 sale 都要)」; PM-only, no Design frame, Q-3 covers only its look). Xmas: clock 2026/12/24 23:58:00, launch, stayed on the Launcher: at 23:59:51, 00:00:02 and 00:00:14 no bubble; force-stop + relaunch at 00:00:30 → bubble 「71:59:21」 (TC-033). NY: 2027/01/02 23:58:40, page source every ~4 s to 00:00:22, no bubble; after a relaunch at 00:00:35 「71:59:23」 (TC-035). Once shown, the bubble counts down each second and keeps its time across a relaunch (TC-034 Pass) and reaches 00:00:00 without going negative (TC-038 Pass). So the Launcher only checks the 72-hour threshold when it is created. No log line marks the threshold on the open Launcher (nothing is logged until the relaunch's campaign list); the excerpt shows that.",
      short="Launcher: sale countdown bubble not shown at 72:00:00 on the open Launcher, only after relaunch",
      steps=[CLK("2026/12/24 23:58:00"), STOP, L, "Stay on the Launcher until the clock passes 2026/12/25 00:00:15", "Look at the IAP icon", STOP, L, "Look at the IAP icon"],
      res="At 00:00:00 no countdown bubble appears on the open Launcher; it shows (71:59:21) only after a relaunch.",
      res_zh="倒數 72 小時整時 Launcher 未出現倒數泡泡，需重新啟動才顯示。",
      exp="The countdown bubble appears from 72:00:00 before the sale ends, also on a Launcher that is already open.",
      exp_zh="剩 72 小時整時應即出現倒數泡泡，Launcher 已開啟時也要顯示。",
      spec="Spec string: 「從倒數 72:00:00 起設倒數計時 bubble (兩個 sale 都要)」",
      rec=None,
      links=[P_NOTE, P_LAUNCH], dev=DEV,
      imgs=[("screenshots/TC-033-000015.png", "no_bubble_000015", ICONB), ("screenshots/TC-033-relaunch.png", "bubble_after_relaunch", ICONB), ("screenshots/TC-035-0000.png", "ny_no_bubble_0000", ICONB), ("screenshots/TC-035-relaunch-crop.png", "ny_bubble_after_relaunch", None)],
      log=("Open Launcher across the 72-hour mark, then relaunch", [("TC-033 Xmas, R1-c", "R1-c", "2026-12-24", "23:59:40", "23:59:59"), ("TC-033 Xmas, R1-c (continued)", "R1-c", "2026-12-25", "00:00:00", "00:00:33"), ("TC-035 NY, R1-d", "R1-d", "2027-01-03", "00:00:00", "00:00:40")]),
      rel=["Q-3"]),
 dict(iss="ISS-XNS-07", title="PM: paid user's Mine 「My Credits」 card has no Christmas decoration", cls="UX", sev=3, owner="PM",
      cases=["TC-073"], rep=(1, 1),
      note="Q-13 / R-071 (PM spec note: 「Xmas Sale 期間 / splash page 換 icon, Mine tab credit card 加裝飾 (同去年)」, no user type named; PM 「Mine tab (Xmas only)」 mockup). Paid (「Set to subscriber」 on, Mine 「Hello VIP!」), 12/15 10:00: the 「My Credits」 card is the plain card, no snowman, pine or gifts, while a free user gets them at the same time (TC-072 Pass). A paid user does get the Christmas splash icon (TC-071) and the Christmas decoration on the Credit IAP offer card (TC-062), so the Xmas look differs between screens for the same paid user. Whether paid users get the Mine decoration is not stated: a user-experience decision for PM (`[AIAgent][UX]`, BugBelong PM, rule 2026-11-11 / 2026-11-13). Layout finding, no log.",
      short="Mine: paid user My Credits card has no Xmas decoration, free user has — PM to decide",
      steps=["Turn on 「Set to subscriber」 in Settings About's debug dialog", CLK("2026/12/15 10:00"), STOP, L, "Tap Mine", "Look at the My Credits card"],
      res="For a paid user the My Credits card has no Christmas decoration; a free user's card has it.",
      res_zh="付費用戶 Mine 的 My Credits 卡片沒有聖誕裝飾，免費用戶則有。",
      exp="PM to decide whether paid users also get the Xmas decoration on the My Credits card.",
      exp_zh="請 PM 決定付費用戶的 My Credits 卡片是否也要聖誕裝飾。",
      spec=None, rec=None,
      links=[P_MINE, P_NOTE], dev=DEVP, basis="Basis: None — PM decision requested (the spec names no user type for the Mine card decoration, Q-13)",
      imgs=[("screenshots/TC-073-mine.png", "paid_card_plain", (60, 225, 1035, 830)), ("screenshots/TC-072-mine.png", "free_card_decorated", (43, 227, 1037, 833))],
      log=None, rel=["Q-13"]),
]

OBS_NOT = [
 ("O-1", "Pre-sale Credit IAP reference (2026/12/10): regular packs and banner.", "Reference for TC-068 / TC-060; no defect."),
 ("O-2", "The phone's Google Play account is a license tester (test card).", "Fixture fact; the purchase rows used it (REQ-004)."),
 ("O-3", "Moved clock breaks HTTPS (「Chain validation failed」, OCSP out-of-date); server-fed sale content does not arrive.", "Side effect of the clock method (Q-1, KP-144): not filed (REQ-004). The 24 Blocked observability rows need RD's server-side sale switch."),
 ("O-4", "Test purchases (500-credit pack, sale Monthly) made and the subscription cancelled; balance now 800.", "Fixture state; TC-023 / TC-066 Pass."),
]

KEEP = re.compile(r"addEvent 20\d\d_|LottieAnimationView is an AppCompat|queryLauncherCampaignData|queryContent Exception|"
                  r"Launcher_IAPicon|Monetize_Credit_(Buy|Pay)|CreditShotPage: \[purchase\]|totalRemain=", re.I)
DROP = re.compile(r"memberToken|access_?token|authorization|bearer|signature=|purchaseToken|creditSystemUUID|uuid|doVerifyPurchase|System\.err", re.I)


def log_lines(pull, day, t0, t1):
    got, seen = [], set()
    dirs = [d for d in sorted(os.listdir(f"{RUN}/logs")) if d.startswith(pull + "-")]
    for d in dirs:
        p = f"{RUN}/logs/{d}/logcat-live.txt"
        if not os.path.exists(p):
            continue
        for line in open(p, encoding="utf-8", errors="replace"):
            parts = line.split(" ", 2)
            if len(parts) < 3 or parts[0] != day or not (t0 <= parts[1][:8] <= t1):
                continue
            if not KEEP.search(line) or DROP.search(line):
                continue
            line = re.sub(r"^(\S+ \S+) +\d+ +\d+ [VDIWE] ", r"\1 ", line.rstrip())
            line = re.sub(r"(https?://[^\s'\"?]+)\?\S*", r"\1?…", line)
            if "totalRemain=" in line:   # balance only, without the server's record ids
                m = re.search(r"totalRemain=(\d+)", line)
                line = f"{parts[0]} {parts[1]} CreditSystem: totalRemain={m.group(1)}"
            msg = line.split(" ", 2)[2]
            if msg in seen:          # the campaign list and balance are logged several times per launch: keep the first
                continue
            seen.add(msg)
            got.append(line[:300])
    return sorted(got, key=lambda l: l[:23])


def excerpt(n, iss, title, secs):
    L = [f"# {iss} {title}", f"# PhotoDirector Android {V} ({B}), Samsung SM-A5560 / Android 15, logcat of the app captured by the casebook run",
         "# Times are PHONE time: the run moved the phone clock into the sale period. Campaign, Launcher icon, credit purchase and",
         "# server-query lines only; repeated lines kept once; tokens, purchase tokens and IDs dropped.", ""]
    for label, pull, day, t0, t1 in secs:
        got = log_lines(pull, day, t0, t1)
        L.append(f"## {label} ({day} {t0}–{t1})")
        L.extend(got if got else ["(no campaign, icon or purchase line logged in this window)"])
        L.append("")
    txt = "\n".join(L)
    if re.search(r"eyJ[A-Za-z0-9_-]{10,}|Bearer |ya29\.|memberToken|purchaseToken|AO-J1O", txt):
        sys.exit(f"token-like text in {iss} log")
    os.makedirs(f"{OUT}/logs", exist_ok=True)
    path = f"{OUT}/logs/{V}_xns{n:02d}_log.txt"
    open(path, "w", encoding="utf-8").write(txt)
    return path


def jpg(src, dst, box):
    im = Image.open(src).convert("RGB")
    if box:
        d = ImageDraw.Draw(im)
        for b in (box if isinstance(box, list) else [box]):
            d.rectangle(b, outline=(255, 0, 0), width=8)
    im.thumbnail((1400, 1400))
    im.save(dst, "JPEG", quality=82)


def main():
    rows = list(csv.DictReader(open(f"{RUN}/results.csv", encoding="utf-8-sig")))
    tally = {}
    for r in rows:
        tally[r["Result"]] = tally.get(r["Result"], 0) + 1
    fails = [r["ID"] for r in rows if r["Result"] == "Fail"]
    disp = {r["ID"]: r["Disposition"] for r in rows}
    blocked = [r for r in rows if r["Result"] == "Blocked"]
    obs = sorted(set(re.findall(r"^- (O-\d+)\b", open(f"{RUN}/observations.md", encoding="utf-8").read(), re.M)), key=lambda x: int(x[2:]))
    MAP = {}
    for n, e in enumerate(E, 1):
        for c in e["cases"]:
            MAP.setdefault(c, []).append(f"{n}. {e['iss']}")
    for k, _, _ in OBS_NOT:
        MAP.setdefault(k, ["not raised"])
    missing = [k for k in fails + obs if k not in MAP]
    extra = [k for k in MAP if k not in fails and k not in obs]
    if missing or extra:
        sys.exit(f"reconciliation incomplete: missing {missing}, extra {extra}")
    for e in E:
        for c in e["cases"]:
            if c not in fails:
                sys.exit(f"{e['iss']} cites {c}, which is not a Fail")

    img_root = f"{OUT}/{NAME}_images"
    if os.path.isdir(img_root):
        shutil.rmtree(img_root)
    os.makedirs(img_root)
    Lx = []
    w = Lx.append
    w(f"# Xmas & NY Sale (Android) — eBug drafts, round R1 (table v1), PhotoDirector {V} build {B}")
    w("")
    w(f"**Source:** spec-casebook run `library/phd/xmas-ny-sale/android/runs/2026-11-20-r1/` — phase R1 of draft `drafts/20261120-152114` (table v1, {len(rows)} cases), 2026-11-20 15:56 → 17:12, Samsung Galaxy A55 (SM-A5560) / Android 15, Appium / UiAutomator2, Test Server, phone clock moved into the sale period (REQ-003). Tally: " + ", ".join(f"{v} {k}" for k, v in sorted(tally.items())) + ".")
    w("")
    w("**Status:** nothing filed, uploaded or commented. No TR was named for this run; ECL product 「PhotoDirector Mobile for Android」. Creator WILLY_WU, [AIAgent], API — from the newest filed PHD Android batch (AI Hair Color Custom 2026-11-18-r2, TR261111-0042; no filed batch for this feature yet): confirm, and confirm the TR names build 20.19.0 (90201901).")
    w("")
    w("Rules: reviewer rules 2026-10-21 — one action per Repro step, a Spec Link on every entry (URL on its own line), at least one image per entry, the logcat excerpt on every failure / purchase entry, no video. PM decisions are filed to PM (UX → `[AIAgent][UX]`, text `[AIAgent][UI]`); text and layout `[AIAgent][UI]`, RD when the spec states it; the rest `[AIAgent]` Functional, RD. Spec basis per entry against the Design page 9627:6 「261117_xmas_NY_sale」 (dated 2026-11-17) and the PM page 14724:43579 「11E Christmas Sale」 (undated); Design first unless the PM item is newer. REQ-004: rows Blocked (observability) because server-fed sale content did not arrive with the moved clock (O-3) are not filed.")
    w("")
    w(f"**What is drafted:** {len(E)} new entries (ISS-XNS-01…{len(E):02d}), of which {sum(1 for e in E if e['owner'] == 'PM')} ask PM for a decision. Dedupe per OS: see dedupe.txt.")
    w("")
    w("Legend — Class: Functional / UI / UX · Severity: S1 critical and blocking only, S2 important, S3 moderate, S4 minor · Owner: RD / PM.")
    w("")
    for n, e in enumerate(E, 1):
        folder = f"{n:02d}_{e['iss']}"
        os.makedirs(f"{img_root}/{folder}")
        names = []
        for src, slug, box in e["imgs"]:
            path = f"{SPEC}/{src[5:]}" if src.startswith("spec:") else f"{RUN}/{src}"
            if not os.path.exists(path):
                sys.exit(f"missing image {path}")
            name = f"{V}_xns{n:02d}_{slug}.jpg"
            jpg(path, f"{img_root}/{folder}/{name}", box)
            names.append(name)
        if e.get("log"):
            title, secs = e["log"]
            p = excerpt(n, e["iss"], title, secs)
            shutil.copy(p, f"{img_root}/{folder}/")
            names.append(os.path.basename(p))
        tag = "[AIAgent]" + ("" if e["cls"] == "Functional" else f"[{e['cls']}]")
        short = f"{PROD} {V} - {tag} {FEAT}: {e['short']}"
        if len(short) > 140:
            sys.exit(f"{e['iss']} short description {len(short)} > 140")
        e["_short"] = short
        w("---"); w("")
        w(f"## {n}. {e['iss']} — {e['title']}  ·  Class: {e['cls']}  ·  Severity: S{e['sev']}  ·  Owner: {e['owner']}")
        w("")
        w(f"**Report step:** {', '.join(e['cases'])}  ·  **Reproduce:** {e['rep'][0]}/{e['rep'][1]}  ·  **Verified on:** {V}.{B}")
        w("")
        w(f"> **QA note — not pasted into eBug.** {e['note']}")
        w("")
        w("**Short Description:**"); w(""); w("```"); w(short); w("```"); w("")
        w("**Description:**"); w(""); w("```"); w("Repro Steps:")
        for i, s in enumerate(e["steps"], 1):
            w(f"{i}. {s}")
        w(f"{len(e['steps']) + 1}. Check the result")
        w(""); w("Result:"); w(e["res"]); w(f"摘要：{e['res_zh']}"); w(" ".join("{" + x + "}" for x in names))
        w(""); w("Expect Result:"); w(e["exp"]); w(f"摘要：{e['exp_zh']}")
        if e.get("spec"):
            w(e["spec"])
        if e.get("rec"):
            w(""); w("[AI Recommendation]")
            for r in e["rec"]:
                w(r)
        w(""); w("Note:"); w(e["dev"])
        for l in e["links"]:
            w(l)
        if e.get("basis"):
            w(e["basis"])
        w("<Claude Reviewed>"); w("```"); w("")
        w(f"**Images:** `{NAME}_images/{folder}/`"); w("")

    w("---"); w("")
    w("# Not raised (observations and Blocked rows, for the record)")
    w("")
    w("| Item | What was seen | Why not raised |")
    w("|---|---|---|")
    for k, a, b in OBS_NOT:
        w(f"| {k} | {a} | {b} |")
    bd = {}
    for r in blocked:
        bd.setdefault(r["Disposition"], []).append(r["ID"])
    for k, ids in sorted(bd.items()):
        why = {"observability": "REQ-004: server-fed sale content (interstitial, IAP Xmas/NY thumbnail, Credit IAP banner) did not arrive with the moved clock (O-3). Not filed; needs RD's server-side sale switch for a recheck.",
               "test-data": "Fixture missing: phone language change not allowed (TC-049, TC-050); no paid account outside Credit Auto Pass (TC-063, TC-064, TC-067).",
               "defect": "Upstream of entry 5 (no NY icon to watch)."}.get(k, "")
        w(f"| Blocked {k} ({len(ids)}) | " + ", ".join(ids) + f" | {why} |")
    w("")
    w("# Reconciliation against the run")
    w("")
    nq = sum(1 for f in fails if disp[f] == "question")
    w(f"{len(fails)} Fail ({len(fails) - nq} defect, {nq} question), {len(blocked)} Blocked, {tally.get('Not run', 0)} Not run, {len(obs)} observations (O-1 … O-{len(obs)}). {len(fails)} Fail rows → {len(E)} entries: TC-031 / TC-004 / TC-038 merged into entry 5 (one defect), TC-033 / TC-035 into entry 6; the other 5 rows one entry each (10 − 2 − 1 = 7).")
    w("")
    w("### Row-by-row map")
    w("")
    w("| Item | Result | Disposition | Became |")
    w("|---|---|---|---|")
    for k in fails:
        w(f"| {k} | Fail | {disp[k]} | {'; '.join(MAP[k])} |")
    for k in obs:
        w(f"| {k} | observation | — | {'; '.join(MAP[k])} |")
    w("")
    w("### Owner split")
    w("")
    w("| Owner | Entries |")
    w("|---|---|")
    for o in ("RD", "PM"):
        w(f"| {o} | " + ", ".join(str(i) for i, e in enumerate(E, 1) if e["owner"] == o) + " |")
    w("")
    w("### Filing order")
    w("")
    w("By severity: " + ", ".join(f"**{i}**" for s in (1, 2, 3, 4) for i, e in enumerate(E, 1) if e["sev"] == s) + ". Nothing is filed until the review page's decisions come back.")
    w("")
    open(f"{OUT}/{NAME}.md", "w", encoding="utf-8").write("\n".join(Lx))
    json.dump({e["iss"]: {"cases": e["cases"], "why": e["title"]} for e in E}, open(f"{OUT}/entries.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(f"wrote {len(E)} entries → {OUT}/{NAME}.md")


if __name__ == "__main__":
    main()
