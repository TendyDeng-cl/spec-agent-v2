<!-- eBug review page template: filled by scripts/ebug-review.ts (do not edit a generated page by hand). -->
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{{TITLE}}</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Condensed:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap">
<style>
/* Layout: a single triage column — batch decisions on top, one ticket card per entry, then the record panels.
   Ticket cards carry their severity as a left stripe that recolours live. */
:root{
  --bg:#eef1f3; --panel:#ffffff; --ink:#17222b; --muted:#5b6974; --line:#d5dce1; --soft:#f5f7f8;
  --accent:#1f5f8b; --accent-ink:#ffffff; --warn:#a15c00; --warn-bg:#fff3df;
  --s1:#c62828; --s2:#e0661b; --s3:#b38b00; --s4:#6d7a84; --s5:#8f9aa3;
  --ok:#2e7d4f; --hold-op:.45;
  --display:"IBM Plex Sans Condensed","Arial Narrow",system-ui,sans-serif;
  --body:"IBM Plex Sans",system-ui,-apple-system,"Segoe UI",sans-serif;
  --mono:"IBM Plex Mono",ui-monospace,"SF Mono",Menlo,monospace;
}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){
  --bg:#12181d; --panel:#1a2229; --ink:#e3e9ee; --muted:#94a3ae; --line:#2c3842; --soft:#212b33;
  --accent:#6fb1e0; --accent-ink:#0d1a24; --warn:#f0b05a; --warn-bg:#33270f;
  --s1:#ef5350; --s2:#ff8a3d; --s3:#d9b42a; --s4:#93a1ab; --s5:#7d8a93; --ok:#5cc28a; color-scheme:dark}}
:root[data-theme="dark"]{
  --bg:#12181d; --panel:#1a2229; --ink:#e3e9ee; --muted:#94a3ae; --line:#2c3842; --soft:#212b33;
  --accent:#6fb1e0; --accent-ink:#0d1a24; --warn:#f0b05a; --warn-bg:#33270f;
  --s1:#ef5350; --s2:#ff8a3d; --s3:#d9b42a; --s4:#93a1ab; --s5:#7d8a93; --ok:#5cc28a; color-scheme:dark}
*{box-sizing:border-box}
body{background:var(--bg);color:var(--ink);font:15px/1.5 var(--body);margin:0}
.wrap{max-width:1060px;margin:0 auto;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));padding-block:28px 64px;display:grid;gap:22px}
h1,h2,h3{font-family:var(--display);text-wrap:balance;margin:0;line-height:1.15}
h1{font-size:clamp(26px,4vw,36px);font-weight:700}
h2{font-size:21px;font-weight:600}
.eyebrow{font:500 12px/1.3 var(--mono);letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}
.lede{color:var(--muted);max-width:68ch;margin:6px 0 0}
dl.facts{display:flex;flex-wrap:wrap;gap:10px 28px;margin:0;padding:14px 16px;background:var(--panel);border:1px solid var(--line);border-radius:8px}
dl.facts div{min-width:0}
dl.facts dt{font:500 11px var(--mono);letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}
dl.facts dd{margin:2px 0 0;font-weight:600;font-variant-numeric:tabular-nums}
.need{color:var(--warn)}
.panel{background:var(--panel);border:1px solid var(--line);border-radius:8px;padding:16px;display:grid;gap:12px;min-width:0}
.decisions{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px}
.decisions label{display:grid;gap:6px;font-weight:600}
.decisions small{color:var(--muted);font-weight:400}
input[type=text],select,textarea{font:inherit;color:var(--ink);background:var(--soft);border:1px solid var(--line);border-radius:6px;padding:7px 9px;width:100%;min-width:0}
input.pending{border-color:var(--warn);background:var(--warn-bg)}
.radios{display:grid;gap:6px}
.radios label{display:flex;gap:8px;align-items:flex-start;font-weight:500}
.radios input{margin-top:4px}
.tally{display:flex;flex-wrap:wrap;gap:8px}
.chip{display:inline-flex;align-items:center;gap:6px;font:500 12px/1 var(--mono);padding:5px 8px;border-radius:999px;border:1px solid var(--line);background:var(--soft);white-space:nowrap}
.chip b{font-weight:600}
.chip.dup{border-color:var(--warn);color:var(--warn);background:var(--warn-bg)}
.chip.s1{color:var(--s1)}.chip.s2{color:var(--s2)}.chip.s3{color:var(--s3)}
.cal{color:var(--muted);font-size:14px;max-width:80ch;margin:0}
.toolbar{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
button{font:600 14px var(--body);border-radius:6px;border:1px solid var(--line);background:var(--panel);color:var(--ink);padding:7px 12px;cursor:pointer}
button.primary{background:var(--accent);color:var(--accent-ink);border-color:var(--accent)}
button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible,summary:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.card{background:var(--panel);border:1px solid var(--line);border-left:5px solid var(--sevc,var(--s3));border-radius:8px;padding:16px 16px 14px;display:grid;gap:12px;min-width:0;transition:opacity .2s}
.card.held{opacity:var(--hold-op)}
.card.held:hover,.card.held:focus-within{opacity:1}
.head{display:flex;flex-wrap:wrap;gap:8px 12px;align-items:baseline}
.fid{font:700 17px var(--display);color:var(--sevc)}
.head h3{font-size:19px;font-weight:600;flex:1 1 280px;min-width:0}
.chips{display:flex;flex-wrap:wrap;gap:6px}
.why{margin:0;max-width:75ch}
.sd{font:500 13px/1.45 var(--mono);background:var(--soft);border:1px solid var(--line);border-radius:6px;padding:8px 10px;overflow-wrap:anywhere}
details{border:1px solid var(--line);border-radius:6px;background:var(--soft)}
details summary{cursor:pointer;padding:7px 10px;font-weight:600;font-size:14px}
details pre{margin:0;padding:0 10px 10px;font:13px/1.5 var(--mono);white-space:pre-wrap;overflow-wrap:anywhere}
.strip{display:flex;gap:8px;overflow-x:auto;padding-bottom:4px}
.strip button{padding:0;border:1px solid var(--line);background:var(--soft);flex:0 0 auto;width:104px;position:relative}
.strip img{display:block;width:104px;height:150px;object-fit:cover;object-position:top;border-radius:5px}
.strip span{position:absolute;right:4px;bottom:4px;font:500 11px var(--mono);background:var(--panel);color:var(--ink);border-radius:4px;padding:1px 4px}
.myread{border-left:3px solid var(--accent);padding:8px 12px;background:var(--soft);border-radius:0 6px 6px 0;font-size:14px}
.myread b{color:var(--accent);font-family:var(--display);letter-spacing:.02em}
.dupbox{border:1px solid var(--warn);background:var(--warn-bg);border-radius:6px;padding:8px 12px;font-size:14px}
.bar{display:flex;flex-wrap:wrap;gap:10px 14px;align-items:center;border-top:1px solid var(--line);padding-top:12px}
.bar .file{display:flex;gap:6px;align-items:center;font-weight:600}
.seg{display:inline-flex;border:1px solid var(--line);border-radius:6px;overflow:hidden}
.seg button{border:0;border-radius:0;padding:6px 10px;background:var(--soft);font-variant-numeric:tabular-nums}
.seg button+button{border-left:1px solid var(--line)}
.seg button[aria-pressed="true"]{background:var(--sevc);color:#fff}
.bar select{width:auto}
.ctx{flex:1 1 260px;display:grid;gap:4px;min-width:0}
.ctx span{font:600 12px var(--body);color:var(--accent)}
.ctx textarea{min-height:38px;resize:vertical}
table{border-collapse:collapse;width:100%;font-size:14px}
th,td{text-align:left;border-bottom:1px solid var(--line);padding:6px 8px;vertical-align:top}
th{font:500 11px var(--mono);letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}
.tbl{overflow-x:auto}
#tdtbl td{overflow-wrap:break-word}
#tdtbl td:first-child,#tdtbl td:nth-child(2){white-space:nowrap}
#tdtbl td:last-child{min-width:10em}
#tdtbl td:nth-child(4),#tdtbl td:nth-child(5),#tdtbl td:nth-child(7){min-width:8em}
@media (max-width:640px){
  #tdtbl thead{display:none}
  #tdtbl tr{display:block;border-top:1px solid var(--line);padding:8px 0}
  #tdtbl td{display:grid;grid-template-columns:7.5em 1fr;gap:8px;border:0;padding:2px 0;white-space:normal}
  #tdtbl td::before{content:attr(data-l);font-weight:600;color:var(--muted)}
  #tdtbl td:last-child,#tdtbl td:nth-child(4),#tdtbl td:nth-child(5),#tdtbl td:nth-child(7){min-width:0}
}
.mono{font-family:var(--mono);font-size:13px}
#out{font:12px/1.45 var(--mono);min-height:180px;white-space:pre}
.lb{position:fixed;inset:0;background:rgba(5,10,14,.86);display:grid;grid-template-rows:1fr auto;gap:10px;padding:calc(16px + env(safe-area-inset-top,0px)) max(16px,env(safe-area-inset-right,0px)) calc(16px + env(safe-area-inset-bottom,0px)) max(16px,env(safe-area-inset-left,0px));z-index:9}
.lb img{max-width:100%;max-height:100%;margin:auto;object-fit:contain;min-height:0}
.lb .cap{color:#e9eef2;display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:center;text-align:center}
.lb .cap button{background:#26323b;color:#e9eef2;border-color:#3a4852}
small.from{color:var(--ok);font-weight:600}
a.chip.filed{color:var(--ok);text-decoration:none;border-color:currentColor;white-space:normal;max-width:100%;overflow-wrap:anywhere}
.filedbar{border:1px solid var(--ok);border-radius:10px;padding:10px 12px;color:var(--ok)}
@media (max-width:560px){.strip img{height:130px}.head h3{flex-basis:100%}}
@media (prefers-reduced-motion:reduce){.card{transition:none}}
.logbox{border:1px solid var(--line,#8884);border-radius:10px;margin:8px 0}.logbox h4{margin:0;padding:8px 10px;font-size:13px}.logbox h4 span{font:12px var(--mono);opacity:.75;margin-left:6px}.logbox pre{max-height:320px;overflow:auto;font-size:11.5px;white-space:pre}.lb[hidden]{display:none}

.logbox summary{padding:8px 10px;font-size:13px;font-weight:600;cursor:pointer}
.logbox summary span{font:12px var(--mono);opacity:.75;margin-left:6px;font-weight:400}
.logbox pre{white-space:pre-wrap;overflow-wrap:anywhere;word-break:break-word;margin:0;padding:8px 10px}
.card,.card>*,main,section,details,.dupbox,.myread,.sd,.bar,.chips,.strip{min-width:0;max-width:100%}
.card pre,.card code,.dupbox,.myread,.sd,td{overflow-wrap:anywhere}
.card img{max-width:100%;height:auto}
.strip,.bar{flex-wrap:wrap}
table{max-width:100%}
.tblwrap,.scrollx{overflow-x:auto;max-width:100%}
#langsw{display:inline-flex;gap:0;border:1px solid var(--line);border-radius:999px;overflow:hidden;justify-self:end}
#langsw[hidden]{display:none}
#langsw button{border:0;background:transparent;color:var(--ink);font:inherit;font-size:13px;padding:4px 12px;cursor:pointer;border-radius:0}
#langsw button[aria-pressed="true"]{background:var(--accent);color:var(--accent-ink)}
</style>

<div class="wrap">
  <header style="display:grid;gap:10px">
    <div style="display:flex;gap:10px;align-items:center;justify-content:space-between;flex-wrap:wrap"><div class="eyebrow">{{EYEBROW}}</div><div id="langsw" role="group" aria-label="Language" hidden><button type="button" data-l="zh">中文</button><button type="button" data-l="en">English</button></div></div>
    <h1 id="h1">{{H1}}</h1>
    <p class="lede" id="lede">{{LEDE}}</p>
    <dl class="facts">{{FACTS}}</dl>
  </header>

  <section class="panel" aria-labelledby="bd">
    <h2 id="bd" data-zh="批次決定">Batch decisions</h2>
    <div class="decisions">
      <label for="acct"><span data-zh="送單帳號（Creator）">Filing account (Creator)</span>
        <input type="text" id="acct" class="pending" placeholder="ECL login, e.g. ETHAN_HSU">
        <small data-zh="會成為每張單的 Creator。">{{ACCT_NOTE}}</small>
      </label>
      <label for="tag"><span data-zh="來源標籤">Source tag</span>
        <input type="text" id="tag" class="pending" value="AIAgent">
        <small data-zh="[AIAgent]，每批 casebook 都一樣。">[AIAgent], as for every casebook batch.</small>
      </label>
      <label for="tr">TRCode
        <input type="text" id="tr" class="pending" value="{{TR}}">
        <small data-zh="每張卡片都掛在這張 TR；下面一行說明它的來源。">{{TR_NOTE}}</small>
      </label>
      <div class="radios" role="radiogroup" aria-labelledby="mlab">
        <span id="mlab" style="font-weight:600" data-zh="送單方式">Filing method</span>
        <label><input type="radio" name="method" id="m-api" value="API" checked> <span data-zh="API（新方式）">API (new way)</span> <small data-zh="範本在 IF3 時，用 ecl_if3.py 建單並上傳附件。">ecl_if3.py create plus attachment upload, if the template is on IF3.</small></label>
        <label><input type="radio" name="method" id="m-web" value="Browser form"> <span data-zh="瀏覽器表單（舊方式）">Browser form (old way)</span> <small data-zh="在瀏覽器窗格開 ECL 網頁表單，每一欄手動填。">ECL web form through the browser pane, every field by hand.</small></label>
      </div>
    </div>
  </section>

  <section class="panel" aria-labelledby="tl">
    <h2 id="tl" data-zh="這輪測試的結果">Where the run landed</h2>
    <div class="tally" id="tally"></div>
    <p class="cal" id="cal">{{CAL}}</p>
    <div class="toolbar">
      <button type="button" id="fileAll" data-zh="全部送出">File all</button>
      <button type="button" id="holdAll" data-zh="全部暫緩">Hold all</button>
      <button type="button" id="reset" data-zh="還原成建議">Reset to proposal</button>
    </div>
  </section>

  <main id="cards" style="display:grid;gap:16px"></main>

  <section class="panel" aria-labelledby="td" id="tdpanel" hidden>
    <h2 id="td">Translation doubts: your call</h2>
    <p class="cal" style="margin:0">MUI strings with no translation sheet to check against: the run judged these translations odd. Choose File (becomes an MUI translation bug) or Fine as is (not raised again).</p>
    <div class="tbl"><table id="tdtbl"><thead><tr><th>ID</th><th>Language</th><th>Screen</th><th>English</th><th>App shows</th><th>Why it seems off</th><th>Better wording</th><th>Decision</th></tr></thead><tbody></tbody></table></div>
  </section>

  <section class="panel" aria-labelledby="nf">
    <h2 id="nf" data-zh="暫緩、已有人發、引用與不提出的項目">Held, already filed, cited and not raised</h2>
    <p class="cal" style="margin:0" data-zh="團隊規則（2026-10-21）：已經存在的單不留言、不重開、不退回修正。">Team rule (2026-10-21): no comments, no reopen, no reject on existing tickets.</p>
    <div class="tbl"><table id="fxtbl"><thead><tr><th data-zh="項目">Item</th><th data-zh="結果">Outcome</th></tr></thead><tbody></tbody></table></div>
  </section>

  <section class="panel" aria-labelledby="gp">
    <h2 id="gp" data-zh="你需要知道的缺口">Gaps you should know about</h2>
    <p class="cal" style="margin:0" id="gaps">{{GAPS}}</p>
    <div class="tbl"><table id="blk"><thead><tr><th data-zh="案例">Case</th><th data-zh="為什麼是 Blocked">Why it is Blocked</th></tr></thead><tbody></tbody></table></div>
  </section>

  <section class="panel" aria-labelledby="cd">
    <h2 id="cd" data-zh="複製決定">Copy decisions</h2>
    <div class="toolbar"><button type="button" class="primary" id="copy" data-zh="複製決定">Copy decisions</button><span id="copied" class="cal" role="status"></span></div>
    <textarea id="out" readonly aria-label="Decisions table"></textarea>
  </section>
</div>

<div class="lb" id="lb" hidden role="dialog" aria-modal="true" aria-label="Evidence">
  <img id="lbimg" alt="">
  <div class="cap"><button type="button" id="lbprev" data-zh="← 上一張">← Prev</button><span id="lbcap"></span><button type="button" id="lbnext" data-zh="下一張 →">Next →</button><button type="button" id="lbclose" data-zh="關閉">Close</button></div>
</div>

<script>
const DATA = /*DATA*/;;
const KEY = "ebug-review-" + DATA.meta.key + "-v1";
const SEVC = {1:"var(--s1)",2:"var(--s2)",3:"var(--s3)",4:"var(--s4)",5:"var(--s5)"};
const BELONGS = ["RD","PM","PC-Doc","PC-Art","Setup Kit","Marketing","RD-ECL"];
const TYPES = ["Functional","UI","UX"];
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
// Language (user, 2026-11-25): with DATA.zh the page opens in 中文; the eBug text itself (Short Description and the
// description as filed) is never translated.
let LANG = DATA.zh ? "zh" : "en";
try { const l = localStorage.getItem("ebug-review-lang"); if (DATA.zh && (l === "zh" || l === "en")) LANG = l; } catch(e) {}
const Z = () => LANG === "zh" && !!DATA.zh;
const tx = (en, zh) => (Z() && zh) ? zh : en;
const ez = (e, k) => (Z() && e.zh && e.zh[k]) ? e.zh[k] : e[k];
function applyLang(){
  document.documentElement.lang = Z() ? "zh-Hant" : "en";
  document.querySelectorAll("[data-zh]").forEach(el => { if (el.dataset.en == null) el.dataset.en = el.textContent; el.textContent = Z() ? el.dataset.zh : el.dataset.en; });
  for (const k of ["h1", "lede", "cal", "gaps"]) { const el = document.getElementById(k); if (!el) continue;
    if (el.dataset.en == null) el.dataset.en = el.textContent; el.textContent = (Z() && DATA.zh[k]) ? DATA.zh[k] : el.dataset.en; }
  const DT = {"Version":"版本", "Build No":"Build 編號", "Device":"裝置", "Account":"帳號", "TRCode":"TRCode"};
  document.querySelectorAll(".facts dt").forEach(dt => { if (dt.dataset.en == null) dt.dataset.en = dt.textContent; dt.textContent = Z() ? (DT[dt.dataset.en] || dt.dataset.en) : dt.dataset.en; });
  const sw = document.getElementById("langsw"); sw.hidden = !DATA.zh;
  sw.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.l === (Z() ? "zh" : "en"))));
}
const proposal = () => Object.fromEntries(DATA.entries.map(e => [e.iss, {action:e.action, sev:e.sev, belong:e.belong, type:e.type, note:""}]));
// Filing defaults from the newest earlier filed batch (scripts/ebug-defaults.ts) and this batch's own filing, if done.
const DEF = (DATA.defaults && DATA.defaults.found) ? DATA.defaults : null;
const FILED = DATA.filed || null;
const seed = FILED ? FILED.meta : DEF;
let st = {td: {}, d: proposal(), acct: seed ? seed.creator : "", tag: seed ? (seed.tag || "AIAgent") : "AIAgent", tr: seed ? seed.tr : "", method: seed ? seed.method : "API"};
try { const s = JSON.parse(localStorage.getItem(KEY) || "null");
  if (s && s.d) st = {...st, ...Object.fromEntries(Object.entries(s).filter(([k, v]) => k !== "d" && k !== "td" && v !== "" && v != null)), d:{...st.d, ...s.d}, td:{...(s.td || {})}}; } catch(e) {}
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch(e) {} };

function tally(){
  const c = DATA.counts, d = Object.values(st.d);
  const fileN = d.filter(x => x.action === "file").length;
  const sev = n => d.filter(x => x.action === "file" && +x.sev === n).length;
  document.getElementById("tally").innerHTML =
    `${DATA.meta.cases ? `<span class="chip">${tx(`<b>${DATA.meta.cases}</b> ${esc(DATA.meta.round)} cases`, `${esc(DATA.meta.round)} 共 <b>${DATA.meta.cases}</b> 個案例`)}</span><span class="chip" style="color:var(--ok)"><b>${c.Pass||0}</b> ${tx("pass","通過")}</span><span class="chip s1"><b>${c.Fail||0}</b> ${tx("fail","失敗")}</span><span class="chip"><b>${c.Blocked||0}</b> ${tx("blocked","Blocked")}</span>` : ""}` +
    `<span class="chip"><b>${DATA.entries.length}</b> ${tx("entries","張卡片")}</span><span class="chip"><b>${fileN}</b> ${tx("to file","要送")}</span><span class="chip"><b>${DATA.entries.length - fileN}</b> ${tx("on hold","暫緩")}</span>` +
    `<span class="chip s1">S1 <b>${sev(1)}</b></span><span class="chip s2">S2 <b>${sev(2)}</b></span><span class="chip s3">S3 <b>${sev(3)}</b></span>`;
}

function card(e){
  const s = st.d[e.iss];
  const el = document.createElement("article");
  el.className = "card" + (s.action === "hold" ? " held" : "");
  el.id = "e" + e.n;
  el.style.setProperty("--sevc", SEVC[s.sev]);
  const chips = [`<span class="chip">${esc(e.iss)}</span>`, `<span class="chip">${tx("Reproduced", "重現")} ${e.out}/${e.times}</span>`,
    ...e.cases.map(c => `<span class="chip">${esc(c)}</span>`),
    e.dup ? `<span class="chip dup">${tx("Duplicate?", "可能重複")} ${esc(e.dup.code)}</span>` : "",
    e.imgs.length ? "" : `<span class="chip dup">${tx("Evidence gap", "缺證據")}</span>`,
    FILED && FILED.bugs[e.iss] ? `<a class="chip filed" href="https://ecl.cyberlink.com/IF3/ebug/BPM/FormView/${esc(FILED.bugs[e.iss].code)}" target="_blank" rel="noopener">${tx("Filed", "已送出")} ${esc(FILED.bugs[e.iss].code)} · ${tx("sev", "嚴重度")} ${esc(FILED.bugs[e.iss].sev)} · ${esc(FILED.bugs[e.iss].belong)} · ${esc(FILED.bugs[e.iss].files)} ${tx("files", "個附件")}</a>` : ""].join("");
  el.innerHTML = `
    <div class="head"><span class="fid">F-${e.n}</span><h3>${esc(ez(e, "title"))}</h3></div>
    <div class="chips">${chips}</div>
    <p class="why">${esc(ez(e, "why"))}</p>
    <div class="sd">${esc(e.short)}</div>
    <details><summary>${tx("Repro steps, result and note as filed", "送出的重現步驟、結果與 Note（原文，不翻譯）")}</summary><pre>${esc(e.desc)}</pre></details>
    ${(e.logs||[]).map(l => `<details class="logbox"><summary>${tx("Log", "記錄")} <span>${esc(l.name)}</span></summary><pre>${esc(l.text)}</pre></details>`).join("")}
    <div class="strip">${e.imgs.map((im,i) => `<button type="button" data-n="${e.n}" data-i="${i}" aria-label="Open ${esc(im.name)}"><img src="${im.src}" alt="${esc(im.name)}" loading="lazy"><span>${i+1}/${e.imgs.length}</span></button>`).join("")}</div>
    ${e.dup ? `<div class="dupbox"><b>${tx("Already in ECL:", "ECL 已有：")}</b> ${esc(e.dup.code)} (${esc(e.dup.status)}). ${esc(e.dup.text)}</div>` : ""}
    ${e.related ? `<div class="dupbox">${esc((Z() && e.zh && e.zh.related) ? e.zh.related : e.related)}</div>` : ""}
    <div class="myread"><b>${tx("My read", "我的看法")}</b> ${esc(ez(e, "note"))}</div>
    <div class="bar">
      <label class="file"><input type="checkbox" id="f-${e.n}" ${s.action === "file" ? "checked" : ""}> ${tx("File", "送出")}</label>
      <div class="seg" role="group" aria-label="Severity">${[1,2,3,4,5].map(n => `<button type="button" data-sev="${n}" aria-pressed="${+s.sev === n}">${n}</button>`).join("")}</div>
      <label>${tx("Owner", "歸屬")} <select id="b-${e.n}">${BELONGS.map(b => `<option ${b === s.belong ? "selected" : ""}>${b}</option>`).join("")}</select></label>
      <label>${tx("Type", "類型")} <select id="t-${e.n}">${TYPES.map(t => `<option ${t === s.type ? "selected" : ""}>${t}</option>`).join("")}</select></label>
      <label class="ctx" for="c-${e.n}"><span>${tx("Add context — what am I missing?", "補充說明：我漏了什麼？")}</span><textarea id="c-${e.n}" rows="1">${esc(s.note)}</textarea></label>
    </div>`;
  el.querySelector(`#f-${e.n}`).addEventListener("change", ev => { s.action = ev.target.checked ? "file" : "hold"; el.classList.toggle("held", !ev.target.checked); upd(); });
  el.querySelectorAll(".seg button").forEach(b => b.addEventListener("click", () => {
    s.sev = +b.dataset.sev; el.style.setProperty("--sevc", SEVC[s.sev]);
    el.querySelectorAll(".seg button").forEach(x => x.setAttribute("aria-pressed", String(x === b))); upd(); }));
  el.querySelector(`#b-${e.n}`).addEventListener("change", ev => { s.belong = ev.target.value; upd(); });
  el.querySelector(`#t-${e.n}`).addEventListener("change", ev => { s.type = ev.target.value; upd(); });
  el.querySelector(`#c-${e.n}`).addEventListener("input", ev => { s.note = ev.target.value; upd(); });
  el.querySelectorAll(".strip button").forEach(b => b.addEventListener("click", () => openLb(+b.dataset.n, +b.dataset.i)));
  return el;
}

function render(){
  const m = document.getElementById("cards"); m.innerHTML = "";
  DATA.entries.forEach(e => m.appendChild(card(e)));
  upd();
}

function decisions(){
  const cell = v => String(v ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ");
  const tag = (st.tag || "").replace(/[\[\]\s]/g, "");
  const L = [`Account: ${st.acct || "(needed)"}`, `Method: ${st.method}`, `Source tag: [${tag || "(needed)"}]`, `TRCode: ${st.tr || "(needed)"}`, "",
    "| # | ISS | Sev | Belong | Type | Action | Short Description | Note |", "|---|---|---|---|---|---|---|---|"];
  DATA.entries.forEach(e => {
    const s = st.d[e.iss];
    const short = e.short.replace("[AIAgent]", `[${tag || "AIAgent"}]`).replace(/\]\[(Functional)\]/, "]");
    L.push(`| F-${e.n} | ${e.iss} | ${s.sev} | ${s.belong} | ${s.type} | ${s.action}${e.dup && s.action === "hold" ? " (dup " + e.dup.code + ")" : ""} | ${cell(short)} | ${cell(s.note)} |`);
  });
  const TD = DATA.doubts || [];
  if (TD.length) {
    L.push("", "TRANSLATION DOUBTS", "| ID | Language | English | App shows | Decision | Note |", "|---|---|---|---|---|---|");
    TD.forEach(d => { const s = st.td[d.id] || {}; L.push(`| ${d.id} | ${cell(d.lang)} | ${cell(d.en)} | ${cell(d.app)} | ${s.dec || "(needed)"} | ${cell(s.note)} |`); });
  }
  return L.join("\n");
}
function upd(){ tally(); document.getElementById("out").value = decisions(); save(); }

for (const [id, k] of [["acct","acct"],["tag","tag"],["tr","tr"]]) {
  const el = document.getElementById(id); el.value = st[k] ?? el.value;
  el.addEventListener("input", () => { st[k] = el.value.trim(); upd(); });
}
document.querySelectorAll('input[name="method"]').forEach(r => { r.checked = r.value === st.method; r.addEventListener("change", () => { st.method = r.value; upd(); }); });
function prefillNotes(){
  document.querySelectorAll("small.from, .filedbar").forEach(x => x.remove());
  const add = (el, txt) => { if (!el) return; const sm = document.createElement("small"); sm.className = "from"; sm.textContent = txt; el.appendChild(sm); };
  const fA = document.getElementById("f-acct"), fT = document.getElementById("f-tr");
  if (FILED) {
    const m = FILED.meta;
    add(document.getElementById("acct").closest("label"), tx(`Filed as ${m.creator} on ${m.filed_on}`, `${m.filed_on} 以 ${m.creator} 送出`));
    add(document.getElementById("tag").closest("label"), tx(`Filed with [${m.tag}]`, `送出時用 [${m.tag}]`));
    add(document.getElementById("tr").closest("label"), tx(`Filed on ${m.tr} (${m.version} build ${m.build})`, `掛在 ${m.tr}（${m.version} build ${m.build}）`));
    add(document.querySelector(".radios"), tx(`Filed via ${m.method}`, `用 ${m.method} 送出`));
    fA.textContent = tx(`${m.creator} (filed ${m.filed_on})`, `${m.creator}（${m.filed_on} 送出）`); fA.classList.remove("need");
    fT.textContent = tx(`${m.tr} (filed)`, `${m.tr}（已送出）`); fT.classList.remove("need");
  }
  if (DEF) {
    const c = FILED ? "" : tx(" — confirm", "，請確認");
    add(document.getElementById("acct").closest("label"), tx(`Prefilled from ${DEF.from}${c}`, `沿用 ${DEF.from}${c}`));
    add(document.getElementById("tag").closest("label"), tx(`[${DEF.tag}] from ${DEF.from}${c}`, `[${DEF.tag}] 沿用 ${DEF.from}${c}`));
    add(document.getElementById("tr").closest("label"), tx(DATA.meta.trNote, DATA.zh && DATA.zh.trNote));
    add(document.querySelector(".radios"), tx(`${DEF.method} from ${DEF.from}${c}`, `${DEF.method} 沿用 ${DEF.from}${c}`));
    if (!FILED) { fA.textContent = tx(`${DEF.creator} — from ${DEF.from}, confirm`, `${DEF.creator}（沿用 ${DEF.from}，請確認）`); fT.textContent = tx(`${DEF.tr} — build ${DEF.build}, confirm`, `${DEF.tr}（build ${DEF.build}，請確認）`); }
  }
  if (FILED) {
    const codes = Object.entries(FILED.bugs).map(([iss, b]) => `${b.code} (${iss})`).join(", ");
    document.querySelector("header").insertAdjacentHTML("beforeend", tx(`<div class="filedbar" role="status"><b>Filed ${esc(FILED.meta.filed_on)}</b> by ${esc(FILED.meta.creator)} on ${esc(FILED.meta.tr)} via ${esc(FILED.meta.method)}, every bug read back: ${esc(codes)}</div>`, `<div class="filedbar" role="status"><b>${esc(FILED.meta.filed_on)} 已送出</b>：由 ${esc(FILED.meta.creator)} 用 ${esc(FILED.meta.method)} 掛在 ${esc(FILED.meta.tr)}，每張都已讀回確認：${esc(codes)}</div>`));
  }
}
document.getElementById("fileAll").addEventListener("click", () => { DATA.entries.forEach(e => st.d[e.iss].action = e.dup ? "hold" : "file"); render(); });
document.getElementById("holdAll").addEventListener("click", () => { DATA.entries.forEach(e => st.d[e.iss].action = "hold"); render(); });
document.getElementById("reset").addEventListener("click", () => { st.d = proposal(); render(); });
document.getElementById("copy").addEventListener("click", () => {
  const t = document.getElementById("out"), msg = document.getElementById("copied");
  const ok = () => { msg.textContent = tx("Copied. Paste it back in the chat.", "已複製，貼回聊天室即可。"); };
  t.focus(); t.select(); let done = false; try { done = document.execCommand("copy"); } catch (e) {}
  if (done) { ok(); return; }
  (navigator.clipboard ? navigator.clipboard.writeText(t.value) : Promise.reject()).then(ok, () => { msg.textContent = tx("This window does not allow copying (an app preview pane can block it; open the file in Safari or Chrome). The text is selected: press Cmd+C.", "這個視窗不允許複製（App 的預覽窗格可能擋住；請用 Chrome 或 Safari 開這個檔案）。文字已選取，請按 Ctrl+C。"); });
});

function tables(){
  const ftb = document.querySelector("#fxtbl tbody"); ftb.innerHTML = "";
  DATA.fixes.forEach(([c, w]) => { const z = Z() && DATA.zh.fixes ? DATA.zh.fixes[String(c).split(" — ")[0]] : null;
    const [c2, w2] = z ? z : [c, w]; ftb.insertAdjacentHTML("beforeend", `<tr><td class="mono">${esc(c2)}</td><td>${esc(w2)}</td></tr>`); });
  const btb = document.querySelector("#blk tbody"); btb.innerHTML = "";
  DATA.blocked.forEach(([k, why]) => { const w2 = (Z() && DATA.zh.blocked && DATA.zh.blocked[k]) || why;
    btb.insertAdjacentHTML("beforeend", `<tr><td class="mono">${esc(k)}</td><td>${esc(w2)}</td></tr>`); });
}
(function(){
  const TD = DATA.doubts || []; if (!TD.length) return;
  document.getElementById("tdpanel").hidden = false;
  const tb = document.querySelector("#tdtbl tbody");
  TD.forEach(d => {
    const s = st.td[d.id] = st.td[d.id] || {dec: "", note: ""};
    const tr = document.createElement("tr");
    tr.innerHTML = `<td class="mono" data-l="ID">${esc(d.id)}</td><td data-l="Language">${esc(d.lang)}</td><td data-l="Screen">${esc(d.screen)}</td><td data-l="English">${esc(d.en)}</td><td data-l="App shows">${esc(d.app)}</td><td data-l="Why it seems off">${esc(d.why)}</td><td data-l="Better wording">${esc(d.better)}</td>` +
      `<td data-l="Decision"><div><select aria-label="Decision for ${esc(d.id)}"><option value="">Choose</option><option>File</option><option>Fine as is</option></select>` +
      `<input type="text" placeholder="Note" aria-label="Note for ${esc(d.id)}" style="margin-top:4px;width:100%"></div></td>`;
    const [sel, inp] = [tr.querySelector("select"), tr.querySelector("input")];
    sel.value = s.dec; inp.value = s.note;
    sel.addEventListener("change", () => { s.dec = sel.value; upd(); });
    inp.addEventListener("input", () => { s.note = inp.value; upd(); });
    tb.appendChild(tr);
  });
  upd();
})();

let lbE = null, lbI = 0;
const lb = document.getElementById("lb");
function openLb(n, i){ lbE = DATA.entries.find(e => e.n === n); lbI = i; showLb(); lb.hidden = false; document.getElementById("lbclose").focus(); }
function showLb(){ const im = lbE.imgs[lbI]; document.getElementById("lbimg").src = im.src; document.getElementById("lbimg").alt = im.name;
  document.getElementById("lbcap").textContent = tx(`F-${lbE.n} · ${lbI+1} of ${lbE.imgs.length} · ${im.name}`, `F-${lbE.n} · 第 ${lbI+1}／${lbE.imgs.length} 張 · ${im.name}`); }
const step = d => { lbI = (lbI + d + lbE.imgs.length) % lbE.imgs.length; showLb(); };
document.getElementById("lbprev").onclick = () => step(-1);
document.getElementById("lbnext").onclick = () => step(1);
document.getElementById("lbclose").onclick = () => { lb.hidden = true; };
lb.addEventListener("click", ev => { if (ev.target === lb) lb.hidden = true; });
document.addEventListener("keydown", ev => { if (lb.hidden) return; if (ev.key === "Escape") lb.hidden = true; if (ev.key === "ArrowLeft") step(-1); if (ev.key === "ArrowRight") step(1); });

document.querySelectorAll("#langsw button").forEach(b => b.addEventListener("click", () => {
  LANG = b.dataset.l; try { localStorage.setItem("ebug-review-lang", LANG); } catch(e) {}
  applyLang(); render(); prefillNotes(); tables();
}));
applyLang();
render();
prefillNotes();
tables();
</script>
