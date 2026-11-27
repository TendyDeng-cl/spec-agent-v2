<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- tab icon (settings: a gear), different on each page so the browser tabs are easy to tell apart -->
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='7' fill='%235b6b6e'/><g stroke='%23fff' stroke-width='3' stroke-linecap='round'><path d='M16 6.5v3M16 22.5v3M6.5 16h3M22.5 16h3M9.3 9.3l2.1 2.1M20.6 20.6l2.1 2.1M9.3 22.7l2.1-2.1M20.6 11.4l2.1-2.1'/></g><circle cx='16' cy='16' r='5' fill='none' stroke='%23fff' stroke-width='3'/></svg>">
<title>Casebook settings</title>
<style>
/*__SHARED_CSS__*/
/*__BAR_CSS__*/
body { padding-bottom: 40px }
h1 { font: 700 1.6rem/1.2 var(--display); margin: 24px 0 4px; letter-spacing: -0.01em }
.lead { margin: 0 0 18px; color: var(--muted); max-width: 760px }
section { background: var(--panel); border: 1px solid var(--line); border-radius: 8px; padding: 16px 18px; margin: 0 0 16px; max-width: 760px }
h2.grp { font: 700 0.8rem var(--body); text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted); margin: 24px 0 8px }
h3 { font: 700 1.05rem var(--display); margin: 0 0 4px }

.opts input[type=radio] { accent-color: var(--accent) }
#qby { font: inherit; color: inherit; background: transparent; border: 1px solid var(--line); border-radius: 6px; padding: 6px 10px; width: min(320px, 100%) }
.kept { margin: 0 0 12px; padding-left: 18px; color: var(--muted); font-size: 0.92rem }
.ghost { font: inherit; font-weight: 600; border: 1px solid var(--line); border-radius: 6px; background: var(--panel); color: var(--ink); padding: 6px 14px; cursor: pointer }
.ghost:hover { border-color: var(--muted) } .ghost:disabled { color: var(--muted); cursor: default }
.done { color: var(--pass); font-size: 0.92rem; margin-left: 8px }
section + h2.grp { margin-top: 32px }
@media (pointer: coarse) { .opts label, .ghost, #save, #note, #qby { min-height: 44px } }
@media (max-width: 600px) { #note, #qby, .opts input[type=number] { font-size: 16px } }
.why { margin: 0 0 12px; color: var(--muted); font-size: 0.92rem; max-width: 70ch }
.now { margin: 0 0 12px }
.now b { font-size: 1.15rem }
.now .unset { color: var(--fail); font-weight: 650 }
.opts { display: flex; flex-wrap: wrap; gap: 8px; margin: 0 0 10px }
.opts label { display: inline-flex; align-items: center; gap: 6px; border: 1px solid var(--line); border-radius: 6px; padding: 6px 10px; cursor: pointer }
.opts label:has(input:checked) { border-color: var(--accent); box-shadow: inset 0 0 0 1px var(--accent) }
.opts input[type=number] { font: inherit; color: inherit; background: transparent; width: 6em; border: 1px solid var(--line); border-radius: 4px; padding: 2px 6px }
.row2 { display: flex; flex-wrap: wrap; gap: 8px; align-items: center }
#note { font: inherit; color: inherit; background: transparent; border: 1px solid var(--line); border-radius: 6px; padding: 6px 10px; flex: 1 1 260px; min-width: 0 }
#save { font: inherit; font-weight: 650; border: 0; border-radius: 6px; background: var(--accent); color: #fff; padding: 7px 16px; cursor: pointer }
#save:disabled { opacity: .5; cursor: not-allowed }
#msg { margin: 10px 0 0; font-size: 0.92rem }
#msg.ok { color: var(--pass) } #msg.err { color: var(--fail) }
#msg code, .hist code { font: 0.82rem var(--mono); overflow-wrap: anywhere }
.hist { margin: 14px 0 0; padding: 0; list-style: none; font-size: 0.88rem; color: var(--muted) }
.hist li { padding: 3px 0; border-top: 1px solid var(--line) }
.hist li:first-child { border-top: 0 }
.hist b { color: var(--text, inherit) }
.file { margin-top: 12px; font-size: 0.82rem; color: var(--muted) }
.file code { font: 0.8rem var(--mono); overflow-wrap: anywhere }
:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px }
</style>
</head>
<body>
<nav class="cb-tabs" aria-label="Casebook"><a class="cb-home" href="/" data-en="All features" data-zh="全部功能">All features</a><b data-en="Settings" data-zh="設定">Settings</b><span class="cb-note">__NOTE__</span><span class="cb-lang" role="group" aria-label="Language"><button type="button" data-l="en">English</button><button type="button" data-l="zh">中文</button></span></nav>
<h1 id="t"></h1>
<p class="lead" id="lead"></p>
<h2 class="grp" id="g-pc"></h2>
<section>
  <h3 id="seat-h"></h3>
  <p class="why" id="seat-why"></p>
  <p class="now" id="now"></p>
  <form id="f">
    <div class="opts" id="opts"></div>
    <div class="row2"><input id="note" type="text" maxlength="200" autocomplete="off"><button id="save" type="submit"></button></div>
  </form>
  <p id="msg" hidden></p>
  <ul class="hist" id="hist"></ul>
  <p class="file" id="file"></p>
</section>
<h2 class="grp" id="g-br"></h2>
<section>
  <h3 id="th-h"></h3>
  <p class="why" id="th-why"></p>
  <div class="opts" id="th" role="radiogroup"></div>
</section>
<section>
  <h3 id="lg-h"></h3>
  <p class="why" id="lg-why"></p>
  <div class="opts" id="lg" role="radiogroup"></div>
</section>
<section>
  <h3 id="by-h"></h3>
  <p class="why" id="by-why"></p>
  <input id="qby" type="text" maxlength="60" autocomplete="name"><span class="done" id="by-ok" hidden></span>
</section>
<section>
  <h3 id="rv-h"></h3>
  <p class="why" id="rv-why"></p>
  <ul class="kept" id="rv"></ul>
  <button type="button" class="ghost" id="forget"></button><span class="done" id="rv-ok" hidden></span>
</section>
<script>
/*__SHARED_JS__*/
let D = __DATA__;
let L = 'en'; try { if (localStorage.getItem('casebook-lang') === 'zh') L = 'zh'; } catch (e) {}
const $ = id => document.getElementById(id), tx = (en, zh) => L === 'zh' ? zh : en;
let picked = D.now ? D.now.seat : null, custom = '', last = null;
const fmt = n => `${n}×`;
function render() {
  document.documentElement.lang = L === 'zh' ? 'zh-Hant' : 'en';
  document.querySelectorAll('.cb-tabs [data-zh]').forEach(e => e.textContent = e.dataset[L]);
  document.querySelectorAll('.cb-lang button').forEach(x => x.setAttribute('aria-pressed', String(x.dataset.l === L)));
  $('t').textContent = tx('Settings', '設定');
  $('lead').textContent = tx('This computer\'s settings are kept outside the repo, and every table and run on it uses them. This browser\'s settings stay in this browser and apply at once.', '「這台電腦」的設定存放在 repo 之外，這台電腦上的每份表格與每次執行都會使用。「這個瀏覽器」的設定只存在這個瀏覽器，變更後立即生效。');
  $('g-pc').textContent = tx('This computer', '這台電腦');
  $('g-br').textContent = tx('This browser', '這個瀏覽器');
  $('seat-h').textContent = tx('Claude account seat size', 'Claude 帳號席位大小');
  $('seat-why').textContent = tx('How large the account running the agent is, in Pro units. Progress and Design turn the usage card\'s percentages into Pro-% with it, so a run on a 6.25× Team seat is not read as six times the Pro usage. Saving marks the change in the usage log of every run active in the last 12 hours.',
    '執行 agent 的帳號有多大，以 Pro 為單位。Progress 與 Design 頁用它把用量卡的百分比換算成 Pro-%，6.25× Team 席位上的執行才不會被當成六倍的 Pro 用量。儲存時，會在過去 12 小時內有活動的每次執行的用量紀錄中標記此變更。');
  $('now').innerHTML = D.now ? `${tx('Now', '目前')}: <b>${fmt(D.now.seat)}</b> <span class="cb-muted">· ${tx('since', '自')} ${cbEsc(cbWhen(D.now.at))}</span>`
    : `<span class="unset">${tx('Not set', '尚未設定')}</span> · ${tx('usage readings fall back to the previous reading\'s seat, else 1×', '用量讀數會沿用前一筆讀數的席位，沒有則為 1×')}`;
  const isPreset = D.presets.some(p => p.seat === picked);
  $('opts').innerHTML = D.presets.map(p => `<label><input type="radio" name="seat" value="${p.seat}"${picked === p.seat ? ' checked' : ''}> ${cbEsc(tx(p.en, p.zh))}</label>`).join('')
    + `<label><input type="radio" name="seat" value="custom"${picked != null && !isPreset ? ' checked' : ''}> ${tx('Other', '其他')} <input type="number" id="custom" min="0.1" max="100" step="0.05" value="${cbEsc(picked != null && !isPreset ? String(picked) : custom)}" aria-label="${tx('Seat size in Pro units', '席位大小（Pro 單位）')}">×</label>`;
  document.querySelectorAll('input[name=seat]').forEach(r => r.onchange = () => { picked = r.value === 'custom' ? Number($('custom').value) || null : Number(r.value); });
  $('custom').oninput = e => { custom = e.target.value; const r = document.querySelector('input[name=seat][value=custom]'); r.checked = true; picked = Number(custom) || null; };
  $('note').placeholder = tx('Note (optional), e.g. which account', '備註（選填），例如哪個帳號');
  $('save').textContent = tx('Save', '儲存');
  $('save').disabled = !D.local;
  $('save').title = D.local ? '' : tx('Only this computer can change its settings.', '只有這台電腦能修改它的設定。');
  const m = $('msg');
  if (last) { m.hidden = false; m.className = last.ok ? 'ok' : 'err';
    m.innerHTML = last.ok ? `${tx('Saved', '已儲存')}: ${fmt(last.seat)}. ` + (last.marked.length ? `${tx('Marked in', '已標記於')} ${last.marked.map(x => `<code>${cbEsc(x)}</code>`).join(', ')}.` : tx('No active run needed a marker.', '沒有需要標記的執行。')) : cbEsc(last.error); }
  else if (!D.local) { m.hidden = false; m.className = ''; m.textContent = tx('Only this computer can change its settings; other computers see them read-only.', '只有這台電腦能修改它的設定；其他電腦只能檢視。'); }
  else m.hidden = true;
  $('hist').innerHTML = [...D.seats].reverse().slice(0, 12).map(e => `<li><b>${fmt(e.seat)}</b> · ${cbEsc(cbWhen(e.at))}${e.note ? ` · ${cbEsc(e.note)}` : ''}</li>`).join('');
  $('file').innerHTML = `${tx('Stored in', '存放於')} <code>${cbEsc(D.file)}</code> · ${tx('also', '也可用')} <code>node scripts/settings.ts seat N</code>`;
  browser();
}
// This browser (user, 2026-11-27): kept in this browser's storage, so they work from any computer that opens the pages
// and never reach the repo or this computer's settings file. Each applies at once; there is nothing to save.
const get = k => { try { return localStorage.getItem(k) || ''; } catch (e) { return ''; } };
const put = (k, v) => { try { v ? localStorage.setItem(k, v) : localStorage.removeItem(k); return true; } catch (e) { return false; } };
const pills = (name, cur, list) => list.map(([v, en, zh]) => `<label><input type="radio" name="${name}" value="${v}"${cur === v ? ' checked' : ''}> ${tx(en, zh)}</label>`).join('');
// what the pages remember about how they were last looked at; 「Forget」 clears these and nothing else (never the
// language, the theme, your name, or answers typed and not yet saved)
const VIEWS = [['casebook-dash', 'Dashboard: product, platform, tab and version', 'Dashboard：產品、平台、分頁與版本'], ['casebook-sort', 'Dashboard: sort', 'Dashboard：排序'],
  ['casebook-fold', 'Dashboard: versions folded or opened', 'Dashboard：收合或展開的版本'],
  ['casebook-seen', 'The page each feature opened on last', '每個功能上次開啟的頁面'], ['cases-wide', 'Cases: all columns', 'Cases：顯示全部欄位'],
  ['results-compact', 'Results: compact list', 'Results：精簡清單'], ['design-sort', 'Design: plan order', 'Design：計畫排序'], ['design-rsort', 'Design: result order', 'Design：結果排序']];
let forgot = false;
function browser() {
  $('th-h').textContent = tx('Appearance', '外觀');
  $('th-why').textContent = tx('Light or dark on every casebook page in this browser. System follows the computer\'s setting and changes with it.', '這個瀏覽器中每個 casebook 頁面使用淺色或深色。「跟隨系統」依電腦的設定，並隨之切換。');
  $('th').setAttribute('aria-label', tx('Appearance', '外觀'));
  $('th').innerHTML = pills('theme', get('casebook-theme'), [['', 'System', '跟隨系統'], ['light', 'Light', '淺色'], ['dark', 'Dark', '深色']]);
  $('lg-h').textContent = tx('Language', '語言');
  $('lg-why').textContent = tx('The language of every casebook page in this browser; the switch in each page\'s top bar sets the same thing. Run results stay as recorded.', '這個瀏覽器中每個 casebook 頁面的語言；每頁上方列的切換鈕設定的是同一項。執行結果維持原本紀錄的文字。');
  $('lg').setAttribute('aria-label', tx('Language', '語言'));
  $('lg').innerHTML = pills('lang', L, [['en', 'English', 'English'], ['zh', '中文 (Traditional Chinese)', '中文']]);
  $('by-h').textContent = tx('Your name', '你的名字');
  $('by-why').textContent = tx('Signed under the answers you give to the Open questions on a Cases page, so the team sees who ruled. Optional; the Cases page has the same box.', '在 Cases 頁回答待答問題時署名，讓團隊知道是誰決定的。選填；Cases 頁也有同一個欄位。');
  $('qby').placeholder = tx('Optional', '選填');
  if (document.activeElement !== $('qby')) $('qby').value = get('casebook-q-by');
  $('rv-h').textContent = tx('Remembered views', '記住的檢視');
  $('rv-why').textContent = tx('The pages remember how you last looked at them. Forget them to open every page as it starts; your language, appearance, name and unsaved answers stay.', '各頁會記住你上次的檢視方式。清除後，每頁都從預設狀態開啟；語言、外觀、名字與尚未儲存的答案會保留。');
  const kept = VIEWS.filter(([k]) => get(k));
  $('rv').innerHTML = kept.length ? kept.map(([, en, zh]) => `<li>${tx(en, zh)}</li>`).join('') : `<li>${tx('Nothing remembered', '沒有記住任何檢視')}</li>`;
  $('forget').textContent = tx('Forget remembered views', '清除記住的檢視');
  $('forget').disabled = !kept.length;
  $('rv-ok').hidden = !forgot; $('rv-ok').textContent = tx('Forgotten', '已清除');
}
$('th').onchange = e => { put('casebook-theme', e.target.value); window.cbTheme?.(); };
$('lg').onchange = e => { L = e.target.value; put('casebook-lang', L); render(); };
$('qby').oninput = e => { const ok = put('casebook-q-by', e.target.value.trim()); $('by-ok').hidden = false; $('by-ok').textContent = ok ? tx('Saved', '已儲存') : tx('This browser does not keep it', '這個瀏覽器無法保存'); };
$('forget').onclick = () => { VIEWS.forEach(([k]) => put(k, '')); forgot = true; browser(); };
$('f').onsubmit = async e => {
  e.preventDefault();
  if (!(picked > 0)) { last = { ok: false, error: tx('Choose a seat size first.', '請先選擇席位大小。') }; render(); return; }
  $('save').disabled = true;
  try {
    const r = await fetch('/settings/seat', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ seat: picked, note: $('note').value.trim() }) });
    const j = await r.json();
    if (!r.ok) throw new Error(j.error || r.statusText);
    D = j.data; last = { ok: true, seat: j.entry.seat, marked: j.marked }; $('note').value = '';
  } catch (err) { last = { ok: false, error: String(err.message || err) }; }
  render();
};
document.querySelectorAll('.cb-lang button').forEach(b => b.onclick = () => { L = b.dataset.l; try { localStorage.setItem('casebook-lang', L); } catch (e) {} render(); });
render();
</script>
</body>
</html>
