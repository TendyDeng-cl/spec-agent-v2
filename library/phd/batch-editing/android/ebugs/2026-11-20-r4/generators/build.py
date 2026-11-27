#!/usr/bin/env python3
"""Build the Batch Editing Android eBug draft batch for run 2026-11-20-r4 (phase R4, table v9, full run) on
20.19.0.v202611181947 (90201901, SR PHA261029-01, TR261118-0070).

Writes ../20261120_eBug_drafts_Batch-Edit-R4_20.19.0.md and the sibling _images/ folder (one NN_ISS-ID folder per
entry, red-boxed JPEGs named 20.19.0_<slug>.jpg). Nothing is filed. Every Fail row of results.csv is mapped to an
entry or to dedupe.txt, and every observation O-n is mapped; the script stops when one is missing.

    python -I library/phd/batch-editing/android/ebugs/2026-11-20-r4/generators/build.py
"""
import csv, os, re, shutil, sys

from PIL import Image, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.dirname(HERE)
ROOT = os.path.dirname(os.path.dirname(OUT))                      # library/phd/batch-editing/android
REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(ROOT))))
RUN = f"{ROOT}/runs/2026-11-20-r4"
SHOTS = f"{RUN}/screenshots"
NAME = "20261120_eBug_drafts_Batch-Edit-R4_20.19.0"
V, B = "20.19.0", "v202611181947 (90201901)"
PRE = f"PHD-A {V} - [AIAgent]"
DEVICE = "Device: Samsung Galaxy S23 (SM-S9110) / Android 16"
PM_URL = "https://www.figma.com/design/iWlQTjlmfykHfmlNvg9J4p/Batch-Editing?node-id="
DS_URL = "https://www.figma.com/design/qZXJfrM5gb5g4tFoCIS1YU/Batch-Edit?node-id="
S3_PDF = "Section 3 · 美圖 Apply to all 實測.pdf"


def pm(board, what, node):
    return f"Spec Link: Batch Editing PM Figma, {board} board ({what}) -\n{PM_URL}{node}"


def ds(frame, what, node):
    return f"Spec Link: Batch Edit Design Figma, {frame} frame ({what}) -\n{DS_URL}{node}"


def pdf(board, what):
    return f"Spec Link: Batch Edit PM spec ({S3_PDF}), {board} board ({what}) - no Figma URL for this PDF"


def steps(*s):
    return "\n".join(f"{i}. {x}" for i, x in enumerate(s, 1))


START = ("Launch the APP", "Tap Edit on the Launcher", "Tap Batch", "Select 12 photos", "Tap Next")
START4 = ("Launch the APP", "Tap Edit on the Launcher", "Tap Batch",
          "Select 4 photos (the last one 2730 x 1535, 16:9)", "Tap Next")
ALL = (840, 100, 1060, 225)          # 「All」 capsule, top right
LABEL = (330, 100, 760, 215)         # 「W x H」 size label, top middle
DIALOG = (70, 960, 1010, 1335)       # 「Discard changes?」 dialog

# Fail rows that repeat an open or resolved Android ticket: dedupe.txt only (dedupe per OS, overlay rule 7).
DEDUPE = {
    "TC-012": "PHA262026P0061 (Assigned)",
    "TC-062": "PHA262026P0121 (NewCreated, PM)",
    "TC-076": "PHA262026P0121 (NewCreated, PM)",
    "TC-049": "PHA262026P0122 (NewCreated, PM; the 2560 px copy is in its Note, its Expect asks for the range from the original)",
    "TC-057": "PHA262026P0122 (range) and PHA262026P0123 (width-only toast) (NewCreated, PM)",
    "TC-058": "PHA262026P0122 (NewCreated, PM)",
    "TC-135": "PHA262026P0124 (NewCreated, PM)",
}

# Fail rows not drafted and not a ticket repeat: held for the user.
HELD = {
    "TC-128": "held: ISS-BEA-18 (Q-20: 「Saved 12 photos」 vs Design 「Save 12 photos」; held by the user 2026-11-17, same on this build)",
    "TC-151": "held: table question for the user (Q-13 ruling 「上面expand會打開相簿選擇畫面」: the album selection opens from the top 「▼」 album tab; the row and R-233 read it as the tile's expand icon, which opens the photo viewer)",
}

E = [
 dict(iss="ISS-BEA-21", cls="UX", sev=3, owner="PM", rep="2/2", cases=["TC-070", "TC-172", "TC-173"],
      title="PM decision: the batch Adjustment room has no 「AI Exposure」, which every Design Adjustment frame draws and PM DR-06 leaves out (Q-18)",
      short=f"{PRE}[UX] Batch_Editing: Adjustment room has no AI Exposure, which the Design draws",
      steps=steps(*START, "Tap Adjustments", "Tap Light", "Check the tool row after Exposure"),
      result="The Light row has no 「AI Exposure」 (Exposure is followed by Contrast), for Premium and Free users.",
      result_zh="Light 工具列沒有 AI Exposure，Premium 與 Free 皆同。",
      expect="PM to decide: Design shows 「AI Exposure」 between Exposure and Contrast; PM DR-06 says none (Q-18).",
      expect_zh="請 PM 決定：Design 有 AI Exposure，PM DR-06 寫不出現（Q-18）。",
      notes=["Related: open question Q-18; the Design was taken first (REQ-020) but the build follows PM DR-06"],
      links=[ds("adjust", "Batch Edit Room › Adjustment, Light row with 「AI Exposure」 between 「Exposure」 and 「Contrast」", "41-923"),
             pm("pm-ui-4", "Batch Edit Room · Adjustment · default, DR-06: 不出現 AI Exposure", "16-13767")],
      images=[("tc174-4-p3.png", "adjust_light_row_no_ai_exposure", (0, 1890, 1079, 2100))],
      qa="R4 (TR261118-0070, 20.19.0.v202611181947), TC-070 Premium, TC-172 step 2 Premium, TC-173 Free (「Set to subscriber」 off, Mine 「Upgrade to Premium!」): the Light row has no 「AI Exposure」, so there is no Try it / Upgrade to VIP dialog to check. Q-18 is open: PM DR-06 (pm-ui-4 「不出現 AI Exposure」) against every Design Adjustment frame; the table follows the Design (REQ-020, Design first) and the build follows PM. Same build behaviour as R3 (rows new or changed in v9, so not raised before). No ruling or ticket answers it (P0120–P0125, P0057–P0061 checked). Filed to PM as UX (scope decision)."),
 dict(iss="ISS-BEA-22", cls="UX", sev=3, owner="PM", rep="1/1", cases=["TC-174"],
      title="PM decision: 「All」 after 「Auto」 runs Auto again on every photo instead of copying photo 1's values",
      short=f"{PRE}[UX] Batch_Editing: 「All」 after Auto re-runs Auto on each photo instead of copying the values",
      steps=steps(*START, "Tap Adjustments", "Tap Auto", "Check the Exposure value", "Tap All",
                  "Tap photo 3's thumbnail", "Tap Highlights", "Check the value"),
      result="After Auto photo 1 reads Exposure -0.43; after 「All」 photo 3 reads Exposure 0.55: Auto ran again on it.",
      result_zh="第 1 張 Auto 後為 -0.43；按 All 後第 3 張為 0.55，是各自重算 Auto。",
      expect="PM to decide: should 「All」 copy photo 1's Auto values (R-092) or run Auto on each photo (R-240)?",
      expect_zh="請 PM 決定：All 複製第 1 張的數值，或每張各自重算 Auto？",
      notes=["Related: photo 1 Highlights 30 vs photo 3 Highlights 49; the toast reads 「Applied to 11 photos」"],
      links=[pm("pm-flow-2", "Adjustment flow, 「Auto」 then Apply to all", "16-9281"),
             pm("pm-ui-4", "Batch Edit Room · Adjustment · applied, DR-04: Apply to all copies this room's settings", "16-13767")],
      images=[("tc174-1-auto.png", "adjust_auto_photo1_values", (900, 1660, 1060, 1790)),
              ("tc174-4-p3.png", "adjust_all_after_auto_photo3_values", (900, 1660, 1060, 1790))],
      qa="R4-d TC-174 (new in v9): fresh room, 「Auto」 on photo 1 (Exposure 「-0.43」, Contrast 「0」, Highlights 「30」), 「All」: toast 「Applied to 11 photos」, every thumbnail changed, but photo 3 reads Exposure 「0.55」 / Highlights 「49」 (darker photo brighter, others darker): Auto is re-run per photo. Per-photo Auto is a reasonable design, so a PM decision, not a defect. Not in any existing Android ticket. Reviewer: the red box on each image is the slider value of the selected tool; check it still sits on the number."),
 dict(iss="ISS-BEA-23", cls="UX", sev=3, owner="PM", rep="1/1", cases=["TC-022"],
      title="PM decision: the Launcher Features grid has no 「Batch Edit」 shortcut, which the Design Launcher board draws (Q-15)",
      short=f"{PRE}[UX] Batch_Editing: Launcher Features grid has no Batch Edit shortcut drawn by the Design",
      steps=steps("Launch the APP", "Check the Features grid on the Launcher", "Swipe the Features grid left",
                  "Check the second page"),
      result="No 「Batch Edit」 shortcut on either page; 「AI Removal」 and 「Beautify」 sit next to each other in row 2.",
      result_zh="Features 兩頁都沒有 Batch Edit 捷徑；第二列 AI Removal 與 Beautify 相鄰。",
      expect="PM to decide whether this version has the Design's 「Batch Edit」 shortcut (PM D0-04: pickers only; Q-15).",
      expect_zh="請 PM 決定本版是否加入 Design 畫的 Batch Edit 捷徑（Q-15）。",
      notes=["Related: the Design draws it between 「AI Removal」 and 「Beautify」; the release notes of this build do not mention it"],
      links=[ds("launcher · Light · orange · rest", "Launcher Features grid with 「Batch Edit」", "225-3699"),
             pm("pm-flow-1", "Entry: Launcher › Batch Editing shortcut; D0-04 名稱只出現在兩個 Picker", "16-9281")],
      images=[("TC-022-p1.png", "launcher_features_no_batch_edit", (0, 1310, 1079, 1520)),
              ("TC-022-p2.png", "launcher_features_page2_no_batch_edit", None)],
      qa="R4-a TC-022 (row changed in v9 after the Design Launcher board 225:3699 was read on 2026-11-18, REQ-019). Features pager, 2 pages of 8, no 「Batch Edit」. The PM side is split: pm-flow-1 has an 「Entry: Launcher › Batch Editing shortcut」 flow while D0-04 says the name appears only in the two pickers, and the UI UX flow says the icon is still to be designed; so the gap may be intended for this version. Filed to PM (scope, Q-15); the Design-first rule makes it the table's expectation, not an RD defect."),
]

OBS = [
 ("O-1", "AI Enhance confirmation restyled with pill buttons as the Design draws it (release note 「banner style」); 「Discard changes?」 keeps the old flat style; for Design/PM, not raised."),
 ("O-2", "20-photo AI Enhance took ≈ 150 s on Test Server (R3 100 s), one photo 10.04 s; Test Server timings are not an SLA (KP-070); not raised."),
]

def boxed(src, dst, box):
    im = Image.open(f"{SHOTS}/{src}").convert("RGB")
    if box:
        d = ImageDraw.Draw(im)
        x0, y0, x1, y1 = box
        x1, y1 = min(x1, im.size[0] - 1), min(y1, im.size[1] - 1)
        for k in range(6):
            d.rectangle([x0 + k, y0 + k, x1 - k, y1 - k], outline=(255, 0, 0))
    im.save(dst, "JPEG", quality=85)


def main():
    results = list(csv.DictReader(open(f"{RUN}/results.csv", encoding="utf-8-sig")))
    fails = {r["ID"] for r in results if r["Result"] == "Fail"}
    mapped = {c for e in E for c in e["cases"]} | set(DEDUPE) | set(HELD)
    if fails - mapped:
        sys.exit(f"unmapped Fail rows: {sorted(fails - mapped)}")
    obs = set(re.findall(r"^- (O-\d+)", open(f"{RUN}/observations.md", encoding="utf-8").read(), re.M))
    if obs - {o for o, _ in OBS}:
        sys.exit(f"unmapped observations: {sorted(obs - {o for o, _ in OBS})}")
    tally = {}
    for r in results:
        tally[r["Result"]] = tally.get(r["Result"], 0) + 1
    nq = sum(1 for e in E if e["owner"] == "PM")

    imgroot = f"{OUT}/{NAME}_images"
    shutil.rmtree(imgroot, ignore_errors=True)
    md = [f"# Batch Editing (Android) — eBug drafts, run R4 (table v9, full run), PhotoDirector {V} build {B}\n",
          f"**Source:** spec-casebook run `library/phd/batch-editing/android/runs/2026-11-20-r4/` — phase R4 of draft "
          f"`drafts/20261118-101500` (approved table v9, all 177 rows), 2026-11-20 on Samsung Galaxy S23 (SM-S9110, "
          f"Android 16) through Appium / UiAutomator2, Test Server, Premium through the debug switch (Free for R4-g and TC-173). "
          f"Build 20.19.0.v202611181947, SR PHA261029-01, TR261118-0070. Tally: {tally.get('Pass', 0)} Pass, "
          f"{tally.get('Fail', 0)} Fail, {tally.get('Blocked', 0)} Blocked, {tally.get('Not run', 0)} Not run.\n",
          "**Status:** nothing filed, uploaded or commented. Filing defaults from the newest filed batch "
          "(2026-11-17-tr261113-0038, `ebug-defaults.ts`): Creator WILLY_WU, [AIAgent], API; TRCode TR261118-0070 "
          "(the build these findings were verified on; the previous batch was on TR261113-0038). All for the reviewer "
          "to confirm. Dedupe is read-only, Android pool only (dedupe per OS): see `dedupe.txt`.\n",
          "Rules: reviewer rules — one action per Repro step, a Spec Link on every entry (URL on its own line), at least "
          "one image per entry, no video; no failure-related entry, so no log. Open questions the run cannot settle go "
          "to PM (BugBelong PM) as `[AIAgent][UX]` (user-experience decisions). Feature name `Batch_Editing:` (REQ-008). "
          "Spec basis check (REQ-055) done per entry.\n",
          f"**What is drafted:** {len(E)} PM decisions (ISS-BEA-21…23: rows new or changed in v9 and the 2026-11-18 Design board) "
          f"from {len(fails) - len(DEDUPE) - len(HELD)} Fail rows. {len(DEDUPE)} Fail rows repeat open Android tickets "
          f"(P0061, P0121–P0124) and are only in `dedupe.txt`; {len(HELD)} are held (ISS-BEA-18 by the user; TC-151 a "
          f"table question). Release-note fixes hold: P0120 (TC-162 / TC-164 Pass), P0125 (no crash); P0057–P0060 Pass too.\n",
          "Legend — Class: Functional / UI / UX · Severity: S1 critical and blocking only, S2 important, S3 moderate · "
          "Owner: RD / PM.\n\n---\n"]
    for n, e in enumerate(E, 1):
        folder = f"{imgroot}/{n:02d}_{e['iss']}"
        os.makedirs(folder)
        tag = e["iss"].split("-")[-1].lower()
        cites = []
        for src, slug, box in e["images"]:
            fn = f"{V}_bea{tag}_{slug}.jpg"
            boxed(src, f"{folder}/{fn}", box)
            cites.append(fn)
        note = [DEVICE] + e["notes"] + e["links"] + ["<Claude Reviewed>"]
        desc = (f"Repro Steps:\n{e['steps']}\n\nResult:\n{e['result']}\n摘要：{e['result_zh']}\n"
                + " ".join("{" + c + "}" for c in cites)
                + f"\n\nExpect Result:\n{e['expect']}\n摘要：{e['expect_zh']}\n\nNote:\n" + "\n".join(note))
        if len(e["short"]) > 140:
            sys.exit(f"{e['iss']} short description {len(e['short'])} chars")
        md.append(f"## {n}. {e['iss']} — {e['title']}  ·  Class: {e['cls']}  ·  Severity: S{e['sev']}  ·  Owner: {e['owner']}\n")
        md.append(f"**Report step:** {', '.join(e['cases'])}  ·  **Reproduce:** {e['rep']}  ·  **Verified on:** {V}.{B}\n")
        md.append(f"> **QA note — not pasted into eBug.** {e['qa']}\n")
        md.append(f"**Short Description:**\n\n```\n{e['short']}\n```\n")
        md.append(f"**Description:**\n\n```\n{desc}\n```\n")
        md.append(f"**Images:** `{NAME}_images/{n:02d}_{e['iss']}/`\n\n---\n")
    md.append("## Already filed — repeats of existing Android tickets (not drafted; `dedupe.txt`)\n")
    md.append("| Case | Ticket |\n|---|---|")
    for c, t in DEDUPE.items():
        md.append(f"| {c} | {t} |")
    md.append("\n## Held (not on the review page)\n")
    md.append("| Case | Finding | Why held |\n|---|---|---|")
    for c, t in HELD.items():
        md.append(f"| {c} | {t.split(' (')[0].replace('held: ', '')} | {t.split(' (', 1)[1].rstrip(')')} |")
    md.append("\n## Not raised (observations, for the record)\n")
    md.append("| Observation | Note |\n|---|---|")
    for o, t in OBS:
        md.append(f"| {o} | {t} |")
    md.append("\n## Reconciliation against the run (Fail rows)\n")
    md.append("| Case | Result | Where |\n|---|---|---|")
    where = {}
    for n, e in enumerate(E, 1):
        for c in e["cases"]:
            where[c] = (where[c] + ", " if c in where else "") + f"F-{n} {e['iss']}"
    for c, t in DEDUPE.items():
        where[c] = f"dedupe.txt ({t})"
    for c, t in HELD.items():
        where[c] = t.split(" (")[0]
    for r in results:
        if r["Result"] == "Fail":
            md.append(f"| {r['ID']} | {r['Result']} {r['Disposition']} | {where.get(r['ID'], '—')} |")
    md.append("\nBlocked rows (no verdict, not drafted): " + ", ".join(
        f"{r['ID']} ({r['Disposition']})" for r in results if r["Result"] == "Blocked") + ".\n")
    open(f"{OUT}/{NAME}.md", "w", encoding="utf-8").write("\n".join(md))
    print(f"wrote {NAME}.md with {len(E)} entries")


if __name__ == "__main__":
    main()
