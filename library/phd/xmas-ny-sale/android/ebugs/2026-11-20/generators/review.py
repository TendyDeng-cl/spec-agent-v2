#!/usr/bin/env python3
"""Build the self-contained eBug review page for Xmas & NY Sale R1 (Android) from upload/bodies.json.

Layout per ebug-tr-filer/references/review-page.md: page head facts (TRCode shown as 「needed」: no TR named for this
run; Creator / tag / method from the newest filed PHD Android batch, marked confirm), batch decisions, UX card banner and
UX check for the one [UX] entry, one card per entry (why, Short Description, collapsed body, evidence strip with
lightbox, collapsed log, My read), then PM questions, not filed, gaps, and Copy decisions. Thumbnails are embedded as
data: URIs (Pillow), so the page needs no folder. Nothing is filed. Run after ebugs.py, drafts_to_bodies.py and the
format check.
"""
import base64, html, io, json, os, re, sys
from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import ebugs as G

OUT = G.OUT
PAGE = f"{OUT}/20261120_eBug_review_Xmas-NY-Sale-R1_20.19.0.html"
bodies = json.load(open(f"{OUT}/upload/bodies.json", encoding="utf-8"))
items = list(bodies.values()) if isinstance(bodies, dict) else bodies
byiss = {e["iss"]: e for e in G.E}
esc = html.escape
ZH = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "zh.json"), encoding="utf-8"))
ZS = '<br><span class="zhh" style="margin:0">{}</span>'


def thumb(path, size=760, q=72):
    im = Image.open(path).convert("RGB")
    im.thumbnail((size, size))
    b = io.BytesIO()
    im.save(b, "JPEG", quality=q)
    return "data:image/jpeg;base64," + base64.b64encode(b.getvalue()).decode()


SEVC = {1: "var(--s1)", 2: "var(--s2)", 3: "var(--s3)", 4: "var(--s4)", 5: "var(--s4)"}
cards = []
for it in items:
    e = byiss[it["iss"]]
    z = ZH.get(it["iss"], {})
    zbox = (f'<div class="zh"><div class="zl">中文說明（僅供審核，不會送出）</div><div class="zt">{esc(z["t"])}</div>'
            f'<div>{esc(z["w"])}</div><div class="zs">{esc(z["s"])}</div></div>') if z else ""
    n = it["entry"]
    imgs, logs = [], []
    for f in it["files"]:
        p = os.path.join(it["images_dir"], f)
        if f.endswith(".txt"):
            logs.append((f, open(p, encoding="utf-8").read()))
        else:
            imgs.append((f, thumb(p)))
    strip = "".join(
        f'<figure class="th" data-n="{n}" data-i="{i}"><img src="{src}" alt="{esc(f)}" loading="lazy"><figcaption>{i + 1}/{len(imgs)} · {esc(f.split("_", 2)[-1].rsplit(".", 1)[0].replace("_", " "))}</figcaption></figure>'
        for i, (f, src) in enumerate(imgs))
    logh = "".join(f'<details class="log"><summary>Log · {esc(f)}</summary><pre>{esc(t)}</pre></details>' for f, t in logs)
    chips = f'<span class="chip">Reproduced {e["rep"][0]}/{e["rep"][1]}</span><span class="chip">{esc(", ".join(e["cases"]))}</span>'
    if not imgs:
        chips += '<span class="chip warn">Evidence gap</span>'
    if "⚠" in e["note"]:
        chips += '<span class="chip warn">Caveat: see My read</span>'
    ux = bool(it.get("ux"))
    uxban = (f'<div class="uxban"><b>UX — confirm before filing: no spec or in-product basis; goes to PM</b><br>{esc(it.get("basis") or "")}'
             '<br><small>Does a spec, or another feature of this app, already say what correct is? → Reclassify. Only another product’s behaviour, or nothing? → Confirm.</small><br><small>中文：UX 問題，送出前請確認。spec 或這個 App 的其他功能已經寫明正確行為 → 選 Reclassify（改開給 RD）；只有別的產品這樣做、或根本沒有依據 → 選 Confirmed（開給 PM）。</small></div>') if ux else ""
    uxsel = ('<label>UX check <select data-k="ux"><option value="">— choose —</option><option value="confirmed">Confirmed UX → PM</option>'
             '<option value="reclassify">Reclassify → Functional / UI → RD</option><option value="notbug">Not a bug → hold</option></select></label>') if ux else ""
    belong = it["belong"]
    opts = "".join(f'<option{" selected" if b == belong else ""}>{b}</option>' for b in ["RD", "PC-Doc", "PM", "PC-Art", "Setup Kit", "Marketing", "RD-ECL"])
    topts = "".join(f'<option{" selected" if t == it["type"] else ""}>{t}</option>' for t in ["Functional", "UI", "UX"])
    sev = "".join(f'<label><input type="radio" name="sev{n}" value="{s}"{" checked" if s == it["sev"] else ""}>{s}</label>' for s in range(1, 6))
    cards.append(f'''
<article class="card{' ux' if ux else ''}" id="F-{n}" data-n="{n}" style="--sev:{SEVC[it['sev']]}">
  {uxban}<header><span class="fid">F-{n}</span><h3>{esc(e['title'])}</h3><div class="chips">{chips}</div></header>
  <p class="why">{esc(e['res'])} Expected: {esc(e['exp'])}</p>
  {zbox}
  <div class="sd" data-sd="{n}">{esc(it['short'])}</div>
  <details class="body"><summary>Description (as filed)</summary><pre>{esc(it['desc'])}</pre></details>
  <div class="strip">{strip}</div>
  {logh}
  <aside class="read"><b>My read.</b><span class="zhh">我的判斷（英文，細節見上方中文說明）</span> {esc(e['note'])}</aside>
  <div class="bar">
    {uxsel}<label class="file"><input type="checkbox" data-k="file"{'' if ux else ' checked'}{' disabled' if ux else ''}> file</label>
    <span class="sev" data-k="sev">Sev {sev}</span>
    <label>Belong <select data-k="belong">{opts}</select></label>
    <label>Type <select data-k="type">{topts}</select></label>
    <label class="ctx">Add context — what am I missing? <textarea data-k="note" rows="1" placeholder="Rewrite, split, merge, hold reason…"></textarea></label>
  </div>
</article>''')

ZO = ZH.get("OBS", {})
notr = "".join(f"<tr><td>{esc(k)}</td><td>{esc(a)}{ZS.format(esc(ZO[k][0])) if k in ZO else ''}</td><td>{esc(b)}{ZS.format(esc(ZO[k][1])) if k in ZO else ''}</td></tr>" for k, a, b in G.OBS_NOT)
sevcount = {}
for it in items:
    sevcount[it["sev"]] = sevcount.get(it["sev"], 0) + 1
tally = " · ".join(f"S{s} ×{c}" for s, c in sorted(sevcount.items()))

PAGE_HTML = f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Xmas NY Sale eBugs</title>
<style>
:root{{--bg:#f7f6f3;--fg:#1d1c1a;--mut:#6b675f;--card:#fff;--line:#e3e0d8;--acc:#b4531f;--s1:#b42318;--s2:#d9480f;--s3:#b08900;--s4:#5f7f3a;--warn:#b42318;--mono:ui-monospace,Consolas,monospace;--ux:#6941c6;--gutter:16px}}
@media (prefers-color-scheme:dark){{:root:not([data-theme="light"]){{--bg:#161514;--fg:#ece9e3;--mut:#a39e94;--card:#211f1d;--line:#36332f;--acc:#f08a4b;--s1:#f0625a;--s2:#ff8a4c;--s3:#e0b84a;--s4:#9cc26a;--warn:#ff7a70;--ux:#b692f6}}}}
:root[data-theme="dark"]{{--bg:#161514;--fg:#ece9e3;--mut:#a39e94;--card:#211f1d;--line:#36332f;--acc:#f08a4b;--s1:#f0625a;--s2:#ff8a4c;--s3:#e0b84a;--s4:#9cc26a;--warn:#ff7a70;--ux:#b692f6}}
*{{box-sizing:border-box}} body{{margin:0;background:var(--bg);color:var(--fg);font:15px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif}}
main{{max-width:1080px;margin:0 auto;padding:24px var(--gutter) 80px}}
.eyebrow{{color:var(--mut);font-size:13px;text-transform:uppercase;letter-spacing:.06em}} h1{{margin:4px 0 6px;font-size:26px}}
dl.facts{{display:flex;flex-wrap:wrap;gap:8px 22px;margin:14px 0;padding:12px 14px;background:var(--card);border:1px solid var(--line);border-radius:10px}}
dl.facts div{{min-width:0}} dt{{font-size:12px;color:var(--mut)}} dd{{margin:0;font-weight:600;overflow-wrap:anywhere}} .need{{color:var(--warn)}}
.panel{{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:14px 16px;margin:16px 0}} .panel h2{{margin:0 0 8px;font-size:18px}}
.grid{{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px}} .grid label{{display:flex;flex-direction:column;font-size:13px;color:var(--mut)}}
input[type=text],select,textarea{{font:inherit;color:var(--fg);background:var(--bg);border:1px solid var(--line);border-radius:6px;padding:5px 8px;max-width:100%}}
.card{{background:var(--card);border:1px solid var(--line);border-left:4px solid var(--sev);border-radius:10px;padding:14px 16px;margin:18px 0;min-width:0}}
.card.held{{opacity:.45}} .card.ux{{outline:3px solid var(--ux);outline-offset:-1px}} .uxban{{background:color-mix(in srgb,var(--ux) 14%,transparent);border:1px solid var(--ux);border-radius:8px;padding:8px 10px;margin:-4px 0 10px;font-size:14px;overflow-wrap:anywhere}} .uxchip{{color:var(--ux);border-color:var(--ux);text-decoration:none}} .card header{{display:flex;flex-wrap:wrap;align-items:baseline;gap:8px}} .fid{{font-weight:700;color:var(--sev)}} .card h3{{margin:0;font-size:17px;flex:1 1 300px}}
.chips{{display:flex;flex-wrap:wrap;gap:6px}} .chip{{font-size:12px;border:1px solid var(--line);border-radius:999px;padding:1px 8px;color:var(--mut)}} .chip.warn{{color:var(--warn);border-color:var(--warn)}}
.why{{margin:8px 0}} .sd{{font-family:var(--mono);font-size:13px;background:var(--bg);border:1px solid var(--line);border-radius:6px;padding:8px 10px;overflow-wrap:anywhere}}
details summary{{cursor:pointer;color:var(--mut);margin:8px 0 4px}} pre{{white-space:pre-wrap;overflow-wrap:anywhere;font-family:var(--mono);font-size:12.5px;background:var(--bg);border:1px solid var(--line);border-radius:6px;padding:10px;margin:0}}
.strip{{display:flex;gap:10px;overflow-x:auto;padding:8px 0}} .th{{margin:0;flex:0 0 auto;width:110px;cursor:zoom-in}} .th img{{width:110px;height:auto;border-radius:6px;border:1px solid var(--line);display:block}} .th figcaption{{font-size:11px;color:var(--mut);overflow-wrap:anywhere}}
.read{{border-left:3px solid var(--acc);background:color-mix(in srgb,var(--acc) 8%,transparent);padding:8px 12px;margin:10px 0;border-radius:0 6px 6px 0;font-size:14px;overflow-wrap:anywhere}}
.bar{{display:flex;flex-wrap:wrap;gap:10px 16px;align-items:center;border-top:1px solid var(--line);padding-top:10px;font-size:14px}} .sev label{{margin-left:6px}}
.ctx{{flex:1 1 260px;display:flex;flex-direction:column;color:var(--acc);font-weight:600}} .ctx textarea{{width:100%;font-weight:400;resize:vertical}}
table{{width:100%;border-collapse:collapse;font-size:14px;table-layout:fixed}} td,th{{border-top:1px solid var(--line);padding:6px;vertical-align:top;text-align:left;overflow-wrap:anywhere}}
th:first-child,td:first-child{{width:90px}} button{{font:inherit;background:var(--acc);color:#fff;border:0;border-radius:8px;padding:8px 14px;cursor:pointer}}
#lb{{position:fixed;inset:0;background:rgba(0,0,0,.85);display:none;flex-direction:column;align-items:center;justify-content:center;padding:16px;z-index:9}} #lb.on{{display:flex}} #lb img{{max-width:100%;max-height:78vh}} #lb p{{color:#eee;margin:8px 0;text-align:center}} #lb nav{{display:flex;gap:10px}}
.zh{{border-left:3px solid var(--s4);background:var(--bg);border-radius:0 6px 6px 0;padding:8px 12px;margin:8px 0;font-size:14px;display:grid;gap:4px}} .zh .zt{{font-weight:700}} .zh .zs{{white-space:pre-line}} .zh .zl{{font-size:12px;color:var(--mut)}} .zhh{{font-weight:400;color:var(--mut);font-size:.85em;margin-left:6px}}
@media (max-width:600px){{h1{{font-size:21px}} .card{{padding:12px}}}}
</style></head><body><main>
<div class="eyebrow">spec-casebook · PhotoDirector Android · Xmas &amp; NY Sale · round R1 (table v1)</div>
<h1>Xmas &amp; NY Sale — {len(items)} eBug drafts for review</h1>
<p>Decide file / hold, severity and owner per card, add context where the draft misses something, then press <b>Copy decisions</b> and paste the block back in chat. Nothing has been filed.<br><span class="zhh" style="margin:0">中文：每張卡片是將送出的 eBug 原文（英文），綠色框是中文說明，只給審核參考、不會送出。請對每張卡片決定送出或保留、嚴重度、歸屬與類型，必要時補充說明，最後按 Copy decisions 把結果貼回對話。目前沒有送出任何 eBug。</span></p>
<dl class="facts"><div><dt>Version</dt><dd>20.19.0</dd></div><div><dt>Build No</dt><dd>90201901</dd></div><div><dt>Server</dt><dd>Test Server</dd></div>
<div><dt>Device</dt><dd>Galaxy A55 (SM-A5560) / Android 15</dd></div><div><dt>Account</dt><dd>Free (paid only for F-7, by 「Set to subscriber」); phone clock moved into the sale (REQ-003)</dd></div>
<div><dt>TRCode</dt><dd>TR261118-0070 (user, 2026-11-23) — build 20.19.0.v202611181947</dd></div><div><dt>ECL product</dt><dd>PhotoDirector Mobile for Android</dd></div>
<div><dt>Severity</dt><dd>{tally}</dd></div><div><dt>UX</dt><dd><a class="chip uxchip" href="#F-7">UX ×{sum(1 for it in items if it.get("ux"))} — each needs your UX check</a></dd></div>
<div><dt>Dedupe</dt><dd>done 2026-11-23: no duplicate on Android (dedupe.txt; related closed tickets PHA242024-1314, PHA252025-0751)</dd></div></dl>
<p style="color:var(--mut);font-size:14px">Calibration: S4 is rare in the PHD Android pool (1 of 175 in the Sept 2026 export), so nothing is proposed at S4. S2 for the wrong sale price shown and charged (F-4) and the NY icon never changing for the whole NY Sale (F-5); the rest S3. No S1: nothing crashes or blocks a purchase.<br><span class="zhh" style="margin:0">嚴重度依據：PHD Android 票池裡 S4 很少（2026 年 9 月匯出的 175 張只有 1 張），所以沒有提 S4。特價顯示和扣款都錯（F-4）、整個 NY Sale 圖示都沒換（F-5）提 S2，其他 S3。沒有閃退或擋住購買的問題，所以沒有 S1。</span></p>
<section class="panel"><h2>Batch decisions<span class="zhh">建單設定</span></h2><div class="grid">
<label>Filing account (Creator, from AI Hair Color Custom 2026-11-18-r2 — confirm)<input type="text" id="b-creator" value="WILLY_WU"></label>
<label>TRCode (user, 2026-11-23; header: PhotoDirector Mobile for Android 20.19.0.v202611181947, Tester WILLY_WU)<input type="text" id="b-tr" value="TR261118-0070" placeholder="TR……-…."></label>
<label>Source tag (from 2026-11-18-r2 — confirm)<input type="text" id="b-tag" value="[AIAgent]"></label>
<label>Method (from 2026-11-18-r2 — confirm)<select id="b-method"><option>API (new way)</option><option>Browser form (old way)</option></select></label>
<label>ECL product<input type="text" id="b-prod" value="PhotoDirector Mobile for Android"></label></div></section>
{''.join(cards)}
<section class="panel"><h2>Reproduced but deliberately not filed<span class="zhh">有重現但不開單</span></h2><p><b>Dedupe (2026-11-23):</b> no Android duplicate; the closest are closed tickets of earlier years' sales (PHA242024-1314 logo, PHA252025-0751 countdown number), other defects (dedupe.txt). <b>Not filed by your decision REQ-004:</b> 24 rows Blocked (observability) because server-fed sale content did not arrive with the moved clock (O-3, TLS 「Chain validation failed」): the sale interstitial (TC-002, TC-003, TC-006, TC-040 – TC-048, TC-051 – TC-054, TC-044), the Xmas / NY IAP thumbnail and sparkles (TC-010, TC-011, TC-021, TC-022) and the Credit IAP festive banner (TC-058, TC-059, TC-069, TC-075). They need RD's server-side sale switch (or a server date inside the sale) for a recheck.<br><span class="zhh" style="margin:0">重複檢查（2026-11-23）：Android 上沒有重複；最接近的是往年特價已關閉的票（PHA242024-1314 logo、PHA252025-0751 倒數數字），都是不同的問題（見 dedupe.txt）。依你的決定（REQ-004）不開單：24 個 case 因為改時間後拿不到伺服器提供的特價內容（O-3，TLS「Chain validation failed」）記為 Blocked（無法觀察），包括特價插頁、Xmas／NY IAP 縮圖和閃光、Credit IAP 節慶 banner。要重測需要 RD 的伺服器端特價開關（或把伺服器日期設在特價期間）。</span></p><table><tr><th>Item</th><th>What was seen</th><th>Why not raised</th></tr>{notr}</table></section>
<section class="panel"><h2>Gaps you should know about<span class="zhh">需要注意的缺口</span></h2><ul>
<li>F-5 (NY icon) rests on launches where the launcher campaign query failed TLS (O-3). The Xmas Santa-hat crown did appear and the NY Lottie is an app resource, so it is drafted; if the NY icon is chosen by server campaign data it may be the moved-clock artefact. Hold it if you want RD's server switch first.<br><span class="zhh" style="margin:0">F-5（NY 圖示）的依據是 Launcher 活動查詢因 TLS 失敗（O-3）的那些啟動。Xmas 聖誕帽皇冠有出現，NY 的 Lottie 也是 App 內建資源，所以有寫草稿；但如果 NY 圖示是看伺服器活動資料決定，可能只是改時間的假象。想先等 RD 的伺服器開關就先保留。</span></li>
<li>Log excerpts carry PHONE time (the clock was moved to 2026/12 – 2027/01); log-slice found nothing per case for that reason, so the windows were cut by phone time per segment pull.<br><span class="zhh" style="margin:0">log 片段用的是手機時間（時間被改到 2026/12～2027/01），所以 log-slice 依 case 切不到東西，改用每段拉 log 時的手機時間來切。</span></li>
<li>Test data missing: TC-049 / TC-050 (Japanese art: phone language not allowed), TC-063 / TC-064 / TC-067 (no paid account outside Credit Auto Pass), so the paid user's 1000-credit pack price is unchecked.<br><span class="zhh" style="margin:0">缺測試資料：TC-049／TC-050（日文圖，不允許改手機語言）、TC-063／TC-064／TC-067（沒有不具 Credit Auto Pass 資格的付費帳號），所以付費用戶 1000 點包的價格沒驗到。</span></li>
<li>The run has no tap log (taps.jsonl), so the coverage page counts 0 controls pressed although every non-blocked row was walked.<br><span class="zhh" style="margin:0">這次 run 沒有點擊紀錄（taps.jsonl），所以 Coverage 頁顯示按過 0 個控制項，但其實每個沒被 Block 的 case 都有走過。</span></li>
<li>check_ebug_format.py --allow-agent-ux: 0 errors, 14 warnings (Short Descriptions over 120, Repro Steps that start with the clock step). verify_ebug_drafts.py passes except its exploration-suite sheet-index checks, which do not apply here.<br><span class="zhh" style="margin:0">check_ebug_format.py --allow-agent-ux：0 錯誤、14 個警告（Short Description 超過 120 字、Repro Steps 第一步是改時間）。verify_ebug_drafts.py 除了探索流程專用的頁名檢查（這裡不適用）之外都通過。</span></li></ul></section>
<section class="panel"><h2>Copy decisions<span class="zhh">複製審核結果</span></h2><button id="copy">Copy decisions</button> <span id="copied" style="color:var(--mut)"></span><textarea id="out" rows="10" readonly style="display:none;width:100%;margin-top:10px;font-family:var(--mono);font-size:12.5px"></textarea></section>
</main>
<div id="lb"><img alt=""><p></p><nav><button id="pv">← Prev</button><button id="cl">Close</button><button id="nx">Next →</button></nav></div>
<script>
const KEY='xns-r1-review';let st={{}};try{{st=JSON.parse(localStorage.getItem(KEY)||'{{}}')}}catch(e){{}}
function save(){{try{{localStorage.setItem(KEY,JSON.stringify(st))}}catch(e){{}}}}
const sevc={{1:'var(--s1)',2:'var(--s2)',3:'var(--s3)',4:'var(--s4)',5:'var(--s4)'}};
document.querySelectorAll('.card').forEach(c=>{{const n=c.dataset.n,s=st[n]||(st[n]={{}});
 const f=c.querySelector('[data-k=file]'),u=c.querySelector('[data-k=ux]'),b=c.querySelector('[data-k=belong]'),t=c.querySelector('[data-k=type]'),no=c.querySelector('[data-k=note]');
 if(u&&s.ux){{u.value=s.ux;f.disabled=s.ux==='notbug'}} if(s.file!==undefined)f.checked=s.file; if(s.belong)b.value=s.belong; if(s.type)t.value=s.type; if(s.note)no.value=s.note;
 if(s.sev){{const r=c.querySelector(`input[name=sev${{n}}][value="${{s.sev}}"]`);if(r)r.checked=true}}
 const paint=()=>{{c.classList.toggle('held',!f.checked);const v=c.querySelector(`input[name=sev${{n}}]:checked`).value;c.style.setProperty('--sev',sevc[v])}};paint();
 if(u)u.addEventListener('change',()=>{{f.disabled=!u.value||u.value==='notbug';if(u.value==='confirmed'){{b.value='PM';f.checked=true}}if(u.value==='reclassify'){{t.value='Functional';b.value='RD';f.checked=true}}if(u.value==='notbug'||!u.value)f.checked=false;s.ux=u.value}});
 c.addEventListener('change',()=>{{s.file=f.checked;s.belong=b.value;s.type=t.value;s.note=no.value;s.sev=c.querySelector(`input[name=sev${{n}}]:checked`).value;paint();save()}});
 no.addEventListener('input',()=>{{s.note=no.value;save()}});}});
['b-creator','b-tr','b-tag','b-method','b-prod'].forEach(id=>{{const el=document.getElementById(id);if(st[id])el.value=st[id];el.addEventListener('input',()=>{{st[id]=el.value;save()}});el.addEventListener('change',()=>{{st[id]=el.value;save()}})}});
document.getElementById('copy').onclick=()=>{{const v=id=>document.getElementById(id).value;
 let o=`Account: ${{v('b-creator')||'(needed)'}}\\nTRCode: ${{v('b-tr')||'(needed)'}}\\nSource tag: ${{v('b-tag')}}\\nMethod: ${{v('b-method')}}\\nECL product: ${{v('b-prod')}}\\n\\n| # | Sev | Belong | Type | UX check | Action | Short Description | Note |\\n|---|---|---|---|---|---|---|---|\\n`;
 document.querySelectorAll('.card').forEach(c=>{{const n=c.dataset.n;o+=`| ${{n}} | ${{c.querySelector(`input[name=sev${{n}}]:checked`).value}} | ${{c.querySelector('[data-k=belong]').value}} | ${{c.querySelector('[data-k=type]').value}} | ${{c.querySelector('[data-k=ux]')?(c.querySelector('[data-k=ux]').value||'unchecked'):'—'}} | ${{c.querySelector('[data-k=file]').checked?'file':'hold'}} | ${{c.querySelector('.sd').textContent}} | ${{c.querySelector('[data-k=note]').value.replace(/\\|/g,'/').replace(/\\n/g,' ')}} |\\n`}});
 const t=document.getElementById('out'),msg=document.getElementById('copied');t.value=o;t.style.display='block';const ok=()=>{{msg.textContent='Copied. Paste it back in the chat.'}};
 t.focus();t.select();let done=false;try{{done=document.execCommand('copy')}}catch(e){{}} if(done){{ok();return}}
 (navigator.clipboard?navigator.clipboard.writeText(o):Promise.reject()).then(ok,()=>{{msg.textContent='This window does not allow copying (an app preview pane can block it). The text is selected: press Ctrl+C.'}})}};
const lb=document.getElementById('lb'),li=lb.querySelector('img'),lp=lb.querySelector('p');let cur=[],ci=0;
function show(){{const f=cur[ci];li.src=f.querySelector('img').src;lp.textContent=`F-${{f.dataset.n}} · ${{ci+1}} of ${{cur.length}} — ${{f.querySelector('figcaption').textContent}}`}}
document.querySelectorAll('.th').forEach(f=>f.onclick=()=>{{cur=[...document.querySelectorAll(`.th[data-n="${{f.dataset.n}}"]`)];ci=+f.dataset.i;show();lb.classList.add('on')}});
document.getElementById('pv').onclick=()=>{{ci=(ci+cur.length-1)%cur.length;show()}};document.getElementById('nx').onclick=()=>{{ci=(ci+1)%cur.length;show()}};
document.getElementById('cl').onclick=()=>lb.classList.remove('on');
document.addEventListener('keydown',e=>{{if(!lb.classList.contains('on'))return;if(e.key==='Escape')lb.classList.remove('on');if(e.key==='ArrowLeft')document.getElementById('pv').click();if(e.key==='ArrowRight')document.getElementById('nx').click()}});
</script></body></html>'''
open(PAGE, "w", encoding="utf-8").write(PAGE_HTML)
print(f"wrote {PAGE} ({os.path.getsize(PAGE) // 1024} KB, {len(items)} cards)")
