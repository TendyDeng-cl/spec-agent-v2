// Chrome client for running cases on a website (MyEdit and other CyberLink web apps) through playwright-core over the
// Chrome DevTools Protocol. The web twin of device.ts / device-android.ts (user, 2026-11-24): same run-dir files
// (.session, activity.log, taps.jsonl, screenshots/, logs/), same recipe runner and exit codes wherever they make sense
// in a browser. Every command is one short process that attaches to the run's Chrome and leaves it running.
// Usage: node scripts/device-web.ts <run dir> <command> [args]
// Coordinates are CSS pixels of the page's viewport, the same frame as `shot` screenshots (taken at CSS scale): a spot
// measured on a screenshot is clicked with the same numbers.
// `els` prints one visible element per line: tag[role] | id (id, data-testid or name) | text | label (aria-label, title,
// placeholder, alt) | x,y,w,h [| flags: disabled, checked, selected, focused, covered]. Elements covered by a dialog or
// overlay are dropped (`els --all` keeps them, flagged covered). Lookups: `id` takes an id, data-testid, data-test-id
// or name; `lbl` / `tapif` / `waitfor` / `expect` match text or label, case-sensitive, containing.
//   start [--env E] [--profile P] [--size WxH]
//                             attach to the shared Chrome on CASEBOOK_WEB_PORT (default 9333) or start one with the
//                             profile ~/.casebook/web/profiles/<P> (default "default"; sign-ins live there, the user signs
//                             in once by hand: the agent never types passwords) and remember it in <run dir>/.session.
//                             The window gets --size (else product.json web.viewport, else 1440x900). --env picks the
//                             base URL from product.json web.base_urls (default web.default_env) for `open`.
//   account [NAME | -]        show / switch the run's test account (scripts/web-account.ts: one Chrome profile and port
//                             per account, signed in once by the user); `start --account NAME` does the same at start.
//                             After a switch run `restart`: it starts that account's Chrome if it is not open
//   restart                   start Chrome again if it is gone, bring the run's tab to the front and print `status`;
//                             run it at every segment start. `restart --hard` first closes the Chrome this run started.
//   status                    Chrome version, the run's environment and base URL, tabs, current URL and window size
//   env [NAME]                show / switch the environment `open` uses (demo, preview, production…)
//   open PATH|URL [--lang L]  go to a URL, or PATH under the environment's base URL (--lang puts /L/ in front: en, tw,
//                             jp, cn, kr, de, fr, es, it for MyEdit); waits for the page to load
//   reload | back | forward | url
//   tabs | tab N | newtab [URL] | closetab [N]
//                             list / switch / open / close tabs; a click that opens a new tab switches to it by itself
//   window [W H]              print or set the window size (viewport size is what `shot` and coordinates use)
//   case ID | case -          name the case now running for the tap log (taps.jsonl), or clear it
//   shot NAME [--full]        save <run dir>/screenshots/NAME.png (viewport; --full: the whole page)
//   els [filter] [--all]      visible elements (format above); filter matches anywhere in the line, case-insensitive
//   texts [NAME]              the visible strings only (text and labels, ids dropped, duplicates merged), top to bottom;
//                             with NAME also screenshots/NAME.png + NAME.txt
//   source                    print the page's HTML
//   tap X Y | dbl X Y | rclick X Y | hold X Y [s] | hover X Y
//                             mouse click / double click / right click / press and hold / move at CSS pixels
//   id NAME | lbl TEXT | click CSS
//                             click the element by id / by text or label / by CSS selector (at its centre, real mouse)
//   tapif TEXT                click the element with TEXT if it is visible, otherwise do nothing
//   drag X1 Y1 X2 Y2 [ms]     mouse drag (sliders, crop boxes, timelines)
//   scroll DY [X Y]           mouse wheel by DY pixels (negative = up) at X,Y (default: the viewport's centre)
//   scrollto TEXT             scroll the element whose text or label contains TEXT into the middle and print its line;
//                             exits 1 when no element has it
//   type TEXT | key KEY       type into the focused element / press a key or chord (Enter, Escape, Tab, Control+A)
//   clear NAME | setval NAME TEXT
//                             clear / fill the field found as `id` finds it (fill replaces the text in one call)
//   upload NAME|- FILE...     set the files of the <input type=file> found as `id` finds it (- = the only file input on
//                             the page, hidden ones included): the web way to pick photos and videos for upload rows
//   wait SECONDS              sleep
//   waitfor "A|B" [--gone] [--timeout S] [--every S]
//                             poll quietly until any text is visible (or, --gone, none is); prints the elapsed seconds
//                             once; exits 1 with a screenshot on timeout. List the failure texts too.
//   expect "A|B" | expect-not "A|B"   fail unless one is visible / if any is
//   credits [ID] | credits ledger [ID]
//                             the credit balance, account and active plan from the account menu (product.json
//                             web.credits.menu_id), or the environment's credit ledger page (text + screenshot), saved to
//                             <run dir>/ledger/<ID>-<time>.json: read before and after every charged action (run.md step 8)
//   build                     the deployed build: product.json web.build_js evaluated on the page, plus URL, title and
//                             Chrome version (the run's build check)
//   logs start|stop|status    background capture of the browser's console messages, page errors, failed requests and
//                             HTTP ≥ 400 responses of every tab into <run dir>/logs/.live/browser.jsonl; start it at the
//                             segment start
//   pull-logs [SEGMENT]       move the live capture so far into <run dir>/logs/<SEGMENT>-<YYYYMMDD-HHMMSS>/browser.jsonl
//                             (capture keeps running) and print a summary (errors, failed requests, HTTP errors)
//   record start [max s] | record stop NAME | record status
//                             screen recording of the run's tab (default limit 180 s, at most 600) →
//                             <run dir>/recordings/NAME.mp4, with the labelled action cursor drawn at each click this script
//                             delivered (lib/action-recording.ts) and the raw frames + clicks.jsonl kept in recordings/NAME/.
//                             Needs ffmpeg (CASEBOOK_FFMPEG). Dynamic bugs: record from before the first step to the result.
//   do <file.steps> [args…] | do "cmd ;; cmd ;; …"
//                             run many commands in one call (recipes: library/<product>/<feature>/web/recipes/*.steps,
//                             "$1".."$9" from args, "?" before a line = may fail); stops at the first failure with a
//                             screenshot and the visible elements
//   stop                      forget this run's session (Chrome keeps running for the next segment)
//   quit                      close the Chrome this run started (never one it only attached to)
// When Chrome cannot be found or started, the script prints BLOCKER and exits 75 (same convention as device.ts).
// Not on the web yet: `design` captures (figma conformance), app language through launch arguments.
import { spawn, execFileSync } from 'node:child_process';
import { appendFileSync, copyFileSync, existsSync, mkdirSync, readFileSync, renameSync, rmSync, statSync, truncateSync, unlinkSync, writeFileSync } from 'node:fs';
import { encodeRecording } from './lib/action-recording.ts';
import { homedir } from 'node:os';
import * as http from 'node:http';
import * as https from 'node:https';
import { join, resolve as resolvePath } from 'node:path';
import { chromium, type Browser, type BrowserContext, type Page } from 'playwright-core';
import { productForRunDir } from './lib/feature-config.ts';
import { BLOCKER, env, logActivity, runRecipe, sleep, stamp } from './lib/device-common.ts';
import { DEFAULT_PORT, loadAccounts, runAccount } from './lib/web-accounts.ts';

const [runDir, cmd, ...rest] = process.argv.slice(2);
if (!runDir || !cmd) { console.error('Usage: node scripts/device-web.ts <run dir> <command> [args]'); process.exit(2); }
mkdirSync(runDir, { recursive: true });
if (cmd !== '__logger') logActivity(runDir, cmd, rest);

// The run's test account (scripts/web-account.ts, user 2026-11-25): `account NAME` (or `start --account NAME`) keeps it
// in <run dir>/.account and every command of the run talks to that account's Chrome; CASEBOOK_WEB_PORT still overrides.
if (cmd === 'account' && rest[0]) {
  const name = rest[0];
  if (name === '-') { if (existsSync(join(runDir, '.account'))) unlinkSync(join(runDir, '.account')); }
  else { if (!loadAccounts().accounts[name]) { console.error(`No web account "${name}" (node scripts/web-account.ts list)`); process.exit(2); } writeFileSync(join(runDir, '.account'), name); }
}
{ const i = cmd === 'start' ? rest.indexOf('--account') : -1;
  if (i >= 0) { const name = rest[i + 1]; rest.splice(i, 2);
    if (!name || !loadAccounts().accounts[name]) { console.error(`No web account "${name}" (node scripts/web-account.ts list)`); process.exit(2); }
    writeFileSync(join(runDir, '.account'), name); } }
const ACCOUNT = runAccount(runDir);
const PORT = Number(env('WEB_PORT') ?? ACCOUNT?.account.port ?? DEFAULT_PORT);
const CDP = `http://127.0.0.1:${PORT}`;
const SESSION = join(runDir, '.session'), TAB = join(runDir, '.tab'), ENVF = join(runDir, '.env'), CASEF = join(runDir, '.case');
const LIVE = join(runDir, 'logs', '.live'), LIVELOG = join(LIVE, 'browser.jsonl'), LOGPID = join(LIVE, '.pid');
const product = productForRunDir(runDir);
const web = product?.web;
type Session = { port: number; profile: string; pid?: number; started: boolean; at: string };
const readJson = <T>(p: string): T | null => { try { return JSON.parse(readFileSync(p, 'utf8')); } catch { return null; } };
const blocker = (why: string): never => { console.error(`BLOCKER (browser): ${why}`); process.exit(BLOCKER); };
const flag = (name: string) => { const i = rest.indexOf(`--${name}`); if (i < 0) return undefined; const v = rest[i + 1]; rest.splice(i, 2); return v; };
const has = (name: string) => { const i = rest.indexOf(`--${name}`); if (i < 0) return false; rest.splice(i, 1); return true; };

// ---- Chrome ----
function chromePath(): string {
  const own = env('CHROME'); if (own && existsSync(own)) return own;
  const c = process.platform === 'win32'
    ? [join(process.env.PROGRAMFILES ?? 'C:\\Program Files', 'Google/Chrome/Application/chrome.exe'),
       join(process.env['PROGRAMFILES(X86)'] ?? 'C:\\Program Files (x86)', 'Google/Chrome/Application/chrome.exe'),
       join(process.env.LOCALAPPDATA ?? '', 'Google/Chrome/Application/chrome.exe')]
    : process.platform === 'darwin' ? ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome']
    : ['/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser'];
  return c.find(existsSync) ?? blocker('Google Chrome not found: install it or set CASEBOOK_CHROME to chrome(.exe).');
}
async function cdpVersion(): Promise<any> {
  try { const r = await fetch(`${CDP}/json/version`, { signal: AbortSignal.timeout(2000) }); return r.ok ? await r.json() : null; } catch { return null; }
}
const defaultSize = () => web?.viewport ? `${web.viewport.width}x${web.viewport.height}` : '1440x900';
async function startChrome(profile: string, size: string): Promise<Session> {
  const up = await cdpVersion();
  if (up) {
    // one shared Chrome per port: later segments attach to it, so the signed-in tab and its state carry over
    const s: Session = { port: PORT, profile: ACCOUNT?.account.profile ?? readJson<Session>(SESSION)?.profile ?? profile, started: false, at: new Date().toISOString() };
    writeFileSync(SESSION, JSON.stringify(s)); return s;
  }
  const dir = join(homedir(), '.casebook', 'web', 'profiles', profile); mkdirSync(dir, { recursive: true });
  const [w, h] = size.split('x').map(Number);
  // the window is sized so its viewport is about W × H (Chrome's frame adds ~ 0 × 85 px on Windows, the `window` command
  // sets the exact viewport afterwards)
  const child = spawn(chromePath(), [`--remote-debugging-port=${PORT}`, `--user-data-dir=${dir}`, '--no-first-run',
    '--no-default-browser-check', '--disable-search-engine-choice-screen', `--window-size=${w},${h + 85}`, 'about:blank'],
    { detached: true, stdio: 'ignore' });
  child.unref();
  for (let i = 0; i < 40 && !(await cdpVersion()); i++) await sleep(0.5);
  if (!(await cdpVersion())) blocker(`Chrome did not open its DevTools port ${PORT} (another Chrome on this profile without the port? close it, or set CASEBOOK_WEB_PORT).`);
  const s: Session = { port: PORT, profile, pid: child.pid, started: true, at: new Date().toISOString() };
  writeFileSync(SESSION, JSON.stringify(s));
  return s;
}

let browser: Browser | undefined;
async function connect(): Promise<BrowserContext> {
  if (!(await cdpVersion())) blocker(`no Chrome on port ${PORT}: run \`device-web.ts ${runDir} start\` (or restart).`);
  // 60 s (2026-11-25): a Chrome that has been up for hours with ECL / IF3 pages open can take ~17 s to attach,
  // which the old 15 s limit reported as a dead browser. CASEBOOK_WEB_CONNECT_MS overrides it.
  browser = await chromium.connectOverCDP(CDP, { timeout: Number(process.env.CASEBOOK_WEB_CONNECT_MS) || 60_000 });
  return browser.contexts()[0] ?? blocker('Chrome has no browser context.');
}
const userPages = (ctx: BrowserContext) => ctx.pages().filter(p => !/^(devtools|chrome-extension|chrome-untrusted):/.test(p.url()));
async function page(): Promise<Page> {
  const ctx = await connect();
  let pages = userPages(ctx);
  if (!pages.length) pages = [await ctx.newPage()];
  const want = existsSync(TAB) ? Number(readFileSync(TAB, 'utf8').trim()) : NaN;
  return pages[Number.isInteger(want) && want >= 0 && want < pages.length ? want : pages.length - 1];
}
const selectTab = (ctx: BrowserContext, p: Page) => writeFileSync(TAB, String(userPages(ctx).indexOf(p)));
// The tab the run works in; written by `tab`, by a click that opened a new tab, and by `open`.
let P: Page;

// ---- Elements ----
type WebEl = { tag: string; role: string; id: string; text: string; label: string; value: string; x: number; y: number; w: number; h: number; flags: string[]; interactive: boolean };
// Runs in the page: visible elements in document order. Interactive ones always; others when they carry their own
// text (a text leaf) or a label. `covered` = the element's centre is under another element that is not its own.
const collect = (all: boolean) => P.evaluate((all: boolean) => {
  const INTER = 'a[href],button,input,select,textarea,summary,label[for],[role=button],[role=link],[role=tab],[role=menuitem],[role=checkbox],[role=switch],[role=radio],[role=option],[role=slider],[role=combobox],[onclick],[tabindex]:not([tabindex="-1"]),[contenteditable=""],[contenteditable=true]';
  const out: any[] = [], vw = innerWidth, vh = innerHeight, clean = (s: string | null | undefined) => (s ?? '').replace(/\s+/g, ' ').trim();
  for (const el of Array.from(document.querySelectorAll<HTMLElement>('body *'))) {
    if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE', 'svg', 'path', 'g', 'defs'].includes(el.tagName)) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 1 || r.height < 1 || r.bottom <= 0 || r.right <= 0 || r.top >= vh || r.left >= vw) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none' || Number(cs.opacity) === 0) continue;
    const interactive = el.matches(INTER) || cs.cursor === 'pointer' && !el.parentElement?.closest(INTER);
    const own = clean(Array.from(el.childNodes).filter(n => n.nodeType === 3).map(n => n.textContent).join(' '));
    const label = clean(el.getAttribute('aria-label') || el.getAttribute('title') || el.getAttribute('placeholder') || el.getAttribute('alt'));
    if (!interactive && !own && !label) continue;
    // its text is already on a small clickable ancestor's line (a wrapper made clickable as a whole keeps its children)
    const owner = el.parentElement?.closest<HTMLElement>(INTER);
    if (!interactive && !all && owner && (owner.innerText ?? '').length <= 120) continue;
    const text = interactive ? clean(el.innerText).slice(0, 120) : own.slice(0, 120);
    const cx = Math.min(vw - 1, Math.max(0, r.left + r.width / 2)), cy = Math.min(vh - 1, Math.max(0, r.top + r.height / 2));
    const top = document.elementFromPoint(cx, cy);
    const covered = !!top && top !== el && !el.contains(top) && !top.contains(el);
    if (covered && !all) continue;
    const input = el as HTMLInputElement;
    const flags = [input.disabled || el.getAttribute('aria-disabled') === 'true' ? 'disabled' : '',
      input.checked || el.getAttribute('aria-checked') === 'true' ? 'checked' : '',
      el.getAttribute('aria-selected') === 'true' || el.classList.contains('active') || el.classList.contains('selected') ? 'selected' : '',
      document.activeElement === el ? 'focused' : '', covered ? 'covered' : ''].filter(Boolean);
    out.push({ tag: el.tagName.toLowerCase(), role: el.getAttribute('role') ?? (el.tagName === 'INPUT' ? input.type : ''),
      id: el.id || el.getAttribute('data-testid') || el.getAttribute('data-test-id') || el.getAttribute('name') || '',
      text, label, value: ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName) && input.type !== 'password' ? clean(input.value).slice(0, 80) : '',
      x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height), flags, interactive });
  }
  return out;
}, all) as Promise<WebEl[]>;
const line = (e: WebEl) => [`${e.tag}${e.role ? `[${e.role}]` : ''}`, e.id, e.text, e.label + (e.value ? ` = ${e.value}` : ''), `${e.x},${e.y},${e.w},${e.h}`, ...(e.flags.length ? [e.flags.join(' ')] : [])].join(' | ');
const visibleTexts = async () => { const seen = new Set<string>(), out: string[] = [];
  for (const e of (await collect(false)).sort((a, b) => a.y - b.y || a.x - b.x)) for (const t of [e.text, e.label, e.value]) if (t && !seen.has(t) && (!e.interactive || t === e.label || !out.some(o => t.includes(o)))) { seen.add(t); out.push(t); }
  return out; };
// Best element for TEXT: exact before containing, interactive before not, the smallest area (the innermost hit).
async function findText(t: string): Promise<WebEl | undefined> {
  const hits = (await collect(false)).filter(e => [e.text, e.label, e.value].some(v => v.includes(t)));
  const rank = (e: WebEl) => ([e.text, e.label].includes(t) ? 0 : 2) + (e.interactive ? 0 : 1);
  return hits.sort((a, b) => rank(a) - rank(b) || a.w * a.h - b.w * b.h)[0];
}
const ID_SEL = (n: string) => { const q = n.replace(/\\/g, '\\\\').replace(/"/g, '\\"'); return [`[id="${q}"]`, `[data-testid="${q}"]`, `[data-test-id="${q}"]`, `[name="${q}"]`]; };
async function findId(n: string): Promise<WebEl | undefined> { return (await collect(false)).find(e => e.id === n); }
// Off-screen elements too (for scrollto): text or label containing t, as a CSS-free handle (data-casebook-hit).
async function allByText(t: string): Promise<WebEl[]> {
  return P.evaluate((t: string) => {
    document.querySelectorAll('[data-casebook-hit]').forEach(e => e.removeAttribute('data-casebook-hit'));
    const clean = (s: string | null) => (s ?? '').replace(/\s+/g, ' ').trim();
    let best: HTMLElement | null = null, area = Infinity;
    for (const el of Array.from(document.querySelectorAll<HTMLElement>('body *'))) {
      const own = clean(Array.from(el.childNodes).filter(n => n.nodeType === 3).map(n => n.textContent).join(' '));
      const label = clean(el.getAttribute('aria-label') || el.getAttribute('title') || el.getAttribute('placeholder') || el.getAttribute('alt'));
      if (!own.includes(t) && !label.includes(t)) continue;
      const r = el.getBoundingClientRect(); if (r.width < 1 || r.height < 1) continue;
      if (r.width * r.height < area) { best = el; area = r.width * r.height; }
    }
    if (!best) return [];
    best.setAttribute('data-casebook-hit', '1');
    return [{ tag: best.tagName.toLowerCase(), role: '', id: best.id, text: clean(best.innerText).slice(0, 120), label: '', value: '', x: 0, y: 0, w: 0, h: 0, flags: [], interactive: false }];
  }, t) as Promise<WebEl[]>;
}

// ---- Tap log (coverage proof, run.md › Tap log) ----
let tapSeq = 0;
async function logTap(kind: string, x?: number, y?: number, el?: WebEl, shot?: Buffer) {
  if (process.env.TAP_LOG === '0') return;
  try {
    const n = `${stamp()}-${String(++tapSeq).padStart(2, '0')}`;
    let file = '';
    if (shot) { const dir = join(runDir, 'screenshots', 'taps'); mkdirSync(dir, { recursive: true }); file = `screenshots/taps/${n}.jpg`; writeFileSync(join(runDir, file), shot); }
    const vp = P.viewportSize() ?? await P.evaluate(() => ({ width: innerWidth, height: innerHeight }));
    const kase = existsSync(CASEF) ? readFileSync(CASEF, 'utf8').trim() : '';
    appendFileSync(join(runDir, 'taps.jsonl'), JSON.stringify({ t: new Date().toISOString(), cmd: kind, case: kase, x, y, win: `${vp.width}x${vp.height}`,
      el: el ? { type: el.tag + (el.role ? `[${el.role}]` : ''), name: el.id, label: el.label || el.text, value: el.value, x: el.x, y: el.y, w: el.w, h: el.h } : undefined, shot: file, url: P.url() }) + '\n');
  } catch {}
}
// Screenshots (MyEdit trial, 2026-11-24): a page with endless CSS animations never turns "stable", so Playwright's
// screenshot timed out after an upload; animations are frozen for the capture, and the raw DevTools capture is the
// fallback.
async function snap(opts: { path?: string; fullPage?: boolean; jpeg?: boolean } = {}): Promise<Buffer> {
  try {
    const b = await P.screenshot({ scale: 'css', animations: 'disabled', caret: 'initial', timeout: 15_000, fullPage: opts.fullPage, ...(opts.jpeg ? { type: 'jpeg' as const, quality: 60 } : {}) });
    if (opts.path) writeFileSync(opts.path, b); return b;
  } catch {
    const cdp = await P.context().newCDPSession(P);
    const r = await cdp.send('Page.captureScreenshot', { format: opts.jpeg ? 'jpeg' : 'png', ...(opts.jpeg ? { quality: 60 } : {}), captureBeyondViewport: !!opts.fullPage });
    const b = Buffer.from(r.data, 'base64'); if (opts.path) writeFileSync(opts.path, b); return b;
  }
}
const preShot = () => process.env.TAP_LOG === '0' ? Promise.resolve(undefined) : snap({ jpeg: true }).catch(() => undefined);
// the element hit: uncovered before covered (a dialog's × over a carousel is the ×), then the innermost
const elAt = async (x: number, y: number) => (await collect(true)).filter(e => x >= e.x && x <= e.x + e.w && y >= e.y && y <= e.y + e.h)
  .sort((a, b) => Number(a.flags.includes('covered')) - Number(b.flags.includes('covered')) || a.w * a.h - b.w * b.h)[0];
// A click that opens a new tab moves the run into it (as a user would look at it).
// The new tab can appear a second or more after the click (MyEdit's signed-in tool menu, 2026-11-24): listen for it
// for up to CASEBOOK_WEB_NEWTAB_WAIT seconds (default 2), ending early when the clicked page starts navigating itself.
async function pressing(fn: () => Promise<void>) {
  const ctx = P.context(); let opened: Page | undefined, navigated = false;
  const onPage = (p: Page) => { opened = p; };
  const onNav = () => { navigated = true; };
  ctx.on('page', onPage); P.on('framenavigated', onNav);
  try {
    await fn();
    const end = Date.now() + Number(env('WEB_NEWTAB_WAIT') ?? 2) * 1000;
    while (!opened && !navigated && Date.now() < end) await sleep(0.1);
  } finally { ctx.off('page', onPage); P.off('framenavigated', onNav); }
  if (opened) { P = opened; await P.waitForLoadState('domcontentloaded').catch(() => {}); selectTab(ctx, P); await P.bringToFront().catch(() => {}); console.log(`  (opened a new tab: ${P.url()})`); }
}
async function clickAt(kind: string, x: number, y: number, el?: WebEl, opts: { button?: 'left' | 'right'; clickCount?: number; hold?: number } = {}) {
  const [shot, hit] = await Promise.all([preShot(), el ? Promise.resolve(el) : elAt(x, y)]);
  await logTap(kind, x, y, hit, shot);
  recClick(x, y);
  await pressing(async () => {
    await glide(x, y);
    if (opts.hold) { await P.mouse.down(); await sleep(opts.hold); await P.mouse.up(); }
    else await P.mouse.click(x, y, { button: opts.button ?? 'left', clickCount: opts.clickCount ?? 1 });
  });
}
// Mouse moves glide from where the pointer was (kept in <run dir>/.mouse across commands), as a hand does: a menu that
// opens on hover closes when the pointer jumps straight off its trigger (MyEdit's signed-in Image Tools menu, 2026-11-24).
const MOUSE = join(runDir, '.mouse');
async function glide(x: number, y: number) {
  const [fx, fy] = existsSync(MOUSE) ? readFileSync(MOUSE, 'utf8').split(',').map(Number) : [NaN, NaN];
  if (Number.isFinite(fx) && Number.isFinite(fy)) { await P.mouse.move(fx, fy); await P.mouse.move(x, y, { steps: Math.max(4, Math.min(25, Math.round(Math.hypot(x - fx, y - fy) / 25))) }); }
  else await P.mouse.move(x, y);
  writeFileSync(MOUSE, `${x},${y}`);
}
const centre = (e: WebEl) => [Math.round(e.x + e.w / 2), Math.round(e.y + e.h / 2)] as const;

// ---- Recording (run-web.md › Recordings) ----
// A background process takes Chrome's screencast frames of the run's tab (following it when the run moves to a new tab)
// into recordings/.live/; every click this script delivers while it runs is logged with its time, and `record stop`
// encodes the frames with the labelled action cursor at those clicks (lib/action-recording.ts).
const REC = join(runDir, 'recordings', '.live'), REC_PID = join(REC, '.pid'), REC_STOP = join(REC, '.stop'), REC_INFO = join(REC, 'info.json');
const recording = () => { const pid = readJson<number>(REC_PID); return pid && alive(pid) ? readJson<{ start: number; max: number }>(REC_INFO) : null; };
function recClick(x: number, y: number) {
  const r = recording(); if (!r) return;
  try { appendFileSync(join(REC, 'clicks.jsonl'), JSON.stringify({ x, y, atMs: Date.now() - r.start }) + '\n'); } catch {}
}
async function recorder() {
  const info = readJson<{ start: number; max: number }>(REC_INFO)!;
  const ctx = await connect();
  const frames: { file: string; elapsedMs: number }[] = [];
  let n = 0, current: Page | undefined, cdp: any;
  const vp = { width: 0, height: 0 };
  const attach = async () => {
    const pages = userPages(ctx); const want = existsSync(TAB) ? Number(readFileSync(TAB, 'utf8').trim()) : NaN;
    const p = pages[Number.isInteger(want) && want >= 0 && want < pages.length ? want : pages.length - 1];
    if (!p || p === current) return;
    if (cdp) await cdp.send('Page.stopScreencast').catch(() => {});
    current = p; cdp = await ctx.newCDPSession(p);
    Object.assign(vp, await p.evaluate(() => ({ width: innerWidth, height: innerHeight })));
    cdp.on('Page.screencastFrame', (fr: any) => {
      const file = `frame-${String(n++).padStart(5, '0')}.jpg`;
      try { writeFileSync(join(REC, file), Buffer.from(fr.data, 'base64')); frames.push({ file, elapsedMs: Date.now() - info.start }); } catch {}
      cdp.send('Page.screencastFrameAck', { sessionId: fr.sessionId }).catch(() => {});
    });
    await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 85, everyNthFrame: 1 });
  };
  const finish = async () => {
    if (cdp) await cdp.send('Page.stopScreencast').catch(() => {});
    const clicks = existsSync(join(REC, 'clicks.jsonl')) ? readFileSync(join(REC, 'clicks.jsonl'), 'utf8').split('\n').filter(Boolean).map(l => JSON.parse(l)) : [];
    // a still page sends no frames: repeat the last one at the end so the video lasts until stop
    if (frames.length) frames.push({ file: frames.at(-1)!.file, elapsedMs: Date.now() - info.start });
    writeFileSync(join(REC, 'capture.json'), JSON.stringify({ frames: dedupeTimes(frames), clicks, viewport: vp }));
    process.exit(0);
  };
  await attach();
  while (true) {
    await sleep(0.3);
    if (existsSync(REC_STOP) || Date.now() - info.start > info.max * 1000) return finish();
    await attach().catch(() => {});
  }
}
// ffconcat needs increasing times: frames that arrive in the same millisecond keep the later one
const dedupeTimes = (f: { file: string; elapsedMs: number }[]) => f.filter((x, i) => i + 1 >= f.length || f[i + 1].elapsedMs > x.elapsedMs);
function ffmpegPath(): string {
  const own = env('FFMPEG'); if (own && existsSync(own)) return own;
  try { execFileSync('ffmpeg', ['-version'], { stdio: 'ignore' }); return 'ffmpeg'; }
  catch { console.error('ffmpeg not found: install it (winget install Gyan.FFmpeg / brew install ffmpeg) or set CASEBOOK_FFMPEG.'); process.exit(2); }
}

// A one-off HTTPS GET without fetch: fetch's pooled socket still closing at process.exit crashes Node 24 on Windows
// (libuv assertion, exit 127; seen 2026-11-25 reading version.json).
function httpGet(url: string): Promise<{ status: number; body: string }> {
  return new Promise((ok, fail) => {
    const req = (url.startsWith('https:') ? https : http).get(url, { agent: false, timeout: 30_000 }, res => {
      let body = ''; res.setEncoding('utf8'); res.on('data', c => body += c); res.on('end', () => ok({ status: res.statusCode ?? 0, body }));
    });
    req.on('timeout', () => req.destroy(new Error('timed out'))); req.on('error', fail);
  });
}

// ---- Environments ----
const envName = () => (existsSync(ENVF) ? readFileSync(ENVF, 'utf8').trim() : '') || web?.default_env || Object.keys(web?.base_urls ?? {})[0] || '';
const baseUrl = (e = envName()) => web?.base_urls?.[e] ?? env('WEB_BASE_URL') ?? '';
function urlFor(path: string, lang?: string) {
  if (/^[a-z]+:/i.test(path)) return path;
  const base = baseUrl();
  if (!base) { console.error(`No base URL for environment "${envName()}": add web.base_urls to library/<product>/product.json or set CASEBOOK_WEB_BASE_URL.`); process.exit(2); }
  return `${base.replace(/\/$/, '')}/${lang ? `${lang}/` : ''}${path.replace(/^\//, '')}`;
}

// ---- Logs ----
function startLogger() {
  mkdirSync(LIVE, { recursive: true });
  const old = readJson<number>(LOGPID);
  if (old && alive(old)) { console.log(`browser log capture already running (pid ${old})`); return; }
  const child = spawn(process.execPath, [process.argv[1], runDir, '__logger'], { detached: true, stdio: 'ignore' });
  child.unref(); writeFileSync(LOGPID, String(child.pid));
  console.log(`browser log capture started (pid ${child.pid}) → ${LIVELOG}`);
}
const alive = (pid: number) => { try { process.kill(pid, 0); return true; } catch { return false; } };
async function logger() {
  const ctx = await connect();
  const out = (o: object) => { try { appendFileSync(LIVELOG, JSON.stringify({ t: new Date().toISOString(), ...o }) + '\n'); } catch {} };
  const watchPage = (p: Page) => {
    p.on('console', m => out({ kind: 'console', level: m.type(), text: m.text().slice(0, 2000), url: p.url() }));
    p.on('pageerror', e => out({ kind: 'pageerror', text: String(e?.stack ?? e).slice(0, 2000), url: p.url() }));
    p.on('requestfailed', r => out({ kind: 'requestfailed', method: r.method(), url: r.url().slice(0, 500), error: r.failure()?.errorText }));
    p.on('response', r => { if (r.status() >= 400) out({ kind: 'http', status: r.status(), method: r.request().method(), url: r.url().slice(0, 500) }); });
    p.on('framenavigated', f => { if (f === p.mainFrame()) out({ kind: 'navigate', url: f.url() }); });
  };
  ctx.pages().forEach(watchPage); ctx.on('page', watchPage);
  out({ kind: 'capture', text: 'started' });
  browser?.on('disconnected', () => process.exit(0));
  await new Promise(() => {});
}
function summarize(file: string) {
  const rows = readFileSync(file, 'utf8').split('\n').filter(Boolean).map(l => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);
  // the site's own requests first: analytics and ad hosts fail all the time (blocked by the page's own COEP) and are
  // counted apart (MyEdit trial, 2026-11-24)
  const site = (u: string) => { try { return new URL(u).hostname.split('.').slice(-2).join('.'); } catch { return ''; } };
  const own = new Set(rows.filter(r => r.kind === 'navigate').map(r => site(r.url)));
  const ours = (r: any) => !r.url || own.has(site(r.url));
  // a blocked third-party load also prints a console error with no URL: it is one of the other hosts' lines
  const errs = rows.filter(r => r.kind === 'pageerror' || r.kind === 'console' && r.level === 'error' && !/ERR_BLOCKED_BY_RESPONSE/.test(r.text));
  const net = rows.filter(r => r.kind === 'requestfailed' || r.kind === 'http'), mine = net.filter(ours);
  console.log(`${rows.length} lines · ${errs.length} errors · ${mine.length} failed or HTTP ≥ 400 requests to the site · ${net.length - mine.length} to other hosts (analytics, ads)`);
  for (const r of [...errs.slice(-10), ...mine.slice(-15)].sort((a, b) => a.t.localeCompare(b.t))) console.log(`  ${r.t.slice(11, 19)} ${r.kind}${r.status ? ` ${r.status}` : ''} ${(r.text ?? `${r.method} ${r.url}${r.error ? ` (${r.error})` : ''}`).slice(0, 200)}`);
}

// ---- Commands ----
async function waitText(alts: string[], gone: boolean, timeout: number, every: number) {
  const t0 = Date.now();
  while (true) {
    const texts = await visibleTexts().catch(() => [] as string[]);
    const hit = alts.find(a => texts.some(t => t.includes(a)));
    if (gone ? !hit : hit) return { hit, secs: Math.round((Date.now() - t0) / 1000) };
    if (Date.now() - t0 > timeout * 1000) {
      const f = join(runDir, 'screenshots', `waitfor-timeout-${stamp()}.png`); mkdirSync(join(runDir, 'screenshots'), { recursive: true });
      await snap({ path: f }).catch(() => {});
      throw new Error(`waitfor: ${gone ? `"${hit}" still visible` : `none of "${alts.join('|')}" visible`} after ${timeout} s (screenshot ${f})`);
    }
    await sleep(every);
  }
}
async function step(c: string, a: string[]): Promise<void> {
  const num = (i: number) => { const v = Number(a[i]); if (!Number.isFinite(v)) throw new Error(`${c}: argument ${i + 1} must be a number`); return v; };
  switch (c) {
    case 'case': if (!a[0] || a[0] === '-') { if (existsSync(CASEF)) unlinkSync(CASEF); console.log('case cleared'); } else { writeFileSync(CASEF, a[0]); console.log('case', a[0]); } return;
    case 'open': {
      const li = a.indexOf('--lang'), lang = li >= 0 ? a[li + 1] : undefined;
      const path = a.filter((_, i) => li < 0 || (i !== li && i !== li + 1))[0] ?? '';
      const u = urlFor(path, lang); await P.goto(u, { waitUntil: 'load', timeout: 90_000 }).catch(e => { if (!/Timeout/i.test(String(e))) throw e; });
      selectTab(P.context(), P); console.log('opened', P.url()); return;
    }
    case 'reload': await P.reload({ waitUntil: 'load' }); console.log('reloaded', P.url()); return;
    case 'back': await P.goBack({ waitUntil: 'load' }); console.log('back', P.url()); return;
    case 'forward': await P.goForward({ waitUntil: 'load' }); console.log('forward', P.url()); return;
    case 'url': console.log(P.url()); return;
    case 'shot': {
      if (!a[0]) throw new Error('shot NAME');
      const f = join(runDir, 'screenshots', `${a[0]}.png`); mkdirSync(join(runDir, 'screenshots'), { recursive: true });
      await snap({ path: f, fullPage: a.includes('--full') }); console.log(f); return;
    }
    case 'els': { const all = a.includes('--all'), f = a.filter(x => x !== '--all')[0]?.toLowerCase();
      console.log((await collect(all)).map(line).filter(l => !f || l.toLowerCase().includes(f)).join('\n')); return; }
    case 'texts': {
      const t = await visibleTexts(); console.log(t.join('\n'));
      if (a[0]) { const d = join(runDir, 'screenshots'); mkdirSync(d, { recursive: true }); await snap({ path: join(d, `${a[0]}.png`) }); writeFileSync(join(d, `${a[0]}.txt`), t.join('\n') + '\n'); }
      return;
    }
    case 'source': console.log(await P.content()); return;
    case 'tap': await clickAt('tap', num(0), num(1)); console.log('tapped', a[0], a[1]); return;
    case 'dbl': await clickAt('dbl', num(0), num(1), undefined, { clickCount: 2 }); console.log('double-clicked', a[0], a[1]); return;
    case 'rclick': await clickAt('rclick', num(0), num(1), undefined, { button: 'right' }); console.log('right-clicked', a[0], a[1]); return;
    case 'hold': await clickAt('hold', num(0), num(1), undefined, { hold: Number(a[2] ?? 1.5) }); console.log('held'); return;
    case 'hover': {
      if (a.length >= 2 && a.every(x => Number.isFinite(Number(x)))) { await glide(num(0), num(1)); console.log('hovering', a[0], a[1]); return; }
      const e = await findText(a.join(' ')); if (!e) throw new Error(`hover: no visible element with "${a.join(' ')}"`);
      await glide(...centre(e)); console.log('hovering', line(e)); return;
    }
    case 'id': case 'lbl': case 'tapif': {
      const t = a.join(' '); const e = c === 'id' ? await findId(t) : await findText(t);
      if (!e) { if (c === 'tapif') { console.log(`(not visible: ${t})`); return; } throw new Error(`${c}: no visible element ${c === 'id' ? 'with id' : 'with text'} "${t}"`); }
      await clickAt(c, ...centre(e), e); console.log('clicked', line(e)); return;
    }
    case 'click': {
      const loc = P.locator(a.join(' ')).first(); const b = await loc.boundingBox();
      if (!b) throw new Error(`click: "${a.join(' ')}" matches no visible element`);
      const x = Math.round(b.x + b.width / 2), y = Math.round(b.y + b.height / 2); await clickAt('click', x, y); console.log('clicked', x, y); return;
    }
    case 'drag': {
      const [x1, y1, x2, y2] = [0, 1, 2, 3].map(num), ms = Number(a[4] ?? 400), steps = Math.max(5, Math.round(ms / 20));
      await logTap('drag', x1, y1, await elAt(x1, y1), await preShot());
      recClick(x1, y1); await glide(x1, y1); await P.mouse.down(); await P.mouse.move(x2, y2, { steps }); await P.mouse.up(); writeFileSync(MOUSE, `${x2},${y2}`); recClick(x2, y2); console.log('dragged'); return;
    }
    case 'scroll': {
      const vp = await P.evaluate(() => ({ w: innerWidth, h: innerHeight }));
      await glide(a[1] ? num(1) : vp.w / 2, a[2] ? num(2) : vp.h / 2); await P.mouse.wheel(0, num(0)); await sleep(0.4); console.log('scrolled', a[0]); return;
    }
    case 'scrollto': {
      const t = a.join(' '); const hit = (await allByText(t))[0]; if (!hit) throw new Error(`scrollto: no element with "${t}" on the page`);
      await P.evaluate(() => document.querySelector('[data-casebook-hit]')?.scrollIntoView({ block: 'center' })); await sleep(0.4);
      const e = await findText(t); console.log(e ? line(e) : `(scrolled to "${t}", covered or not interactive)`); return;
    }
    case 'type': await P.keyboard.type(a.join(' ')); await logTap('type', undefined, undefined, undefined); console.log('typed'); return;
    case 'key': await P.keyboard.press(a[0]); await logTap('key', undefined, undefined, { tag: 'key', role: '', id: '', text: '', label: a[0], value: '', x: 0, y: 0, w: 0, h: 0, flags: [], interactive: false }); console.log('pressed', a[0]); return;
    case 'clear': case 'setval': {
      const n = a[0]; const loc = P.locator(ID_SEL(n).join(',')).first();
      if (!(await loc.count())) throw new Error(`${c}: no field with id "${n}"`);
      await logTap(c, undefined, undefined, await findId(n), await preShot());
      await loc.fill(c === 'setval' ? a.slice(1).join(' ') : ''); console.log(c === 'setval' ? 'set' : 'cleared', n); return;
    }
    case 'upload': {
      const [n, ...files] = a; if (!files.length) throw new Error('upload NAME|- FILE...');
      for (const f of files) if (!existsSync(f)) throw new Error(`upload: no file ${f}`);
      const loc = n === '-' ? P.locator('input[type=file]') : P.locator(ID_SEL(n).map(s => `${s}[type=file], ${s} input[type=file]`).join(','));
      const count = await loc.count();
      if (count !== 1 && n === '-') throw new Error(`upload: ${count} file inputs on the page; name one (els --all, or source)`);
      if (!count) throw new Error(`upload: no file input "${n}"`);
      try { await loc.first().setInputFiles(files); }
      catch (e) {
        // playwright refuses files over 50 MB over connectOverCDP ("not co-located"); the run's Chrome is on this
        // computer, so hand it the paths with DOM.setFileInputFiles instead (fires input/change like a real pick).
        if (!/Cannot transfer files/.test(String((e as Error).message))) throw e;
        const mark = `cb-upload-${Date.now()}`;
        await loc.first().evaluate((el, m) => el.setAttribute('data-cb-upload', m), mark);
        const cdp = await P.context().newCDPSession(P);
        const { root } = await cdp.send('DOM.getDocument', { depth: 0 }) as { root: { nodeId: number } };
        const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: root.nodeId, selector: `[data-cb-upload="${mark}"]` }) as { nodeId: number };
        if (!nodeId) throw new Error('upload: lost the file input while switching to DOM.setFileInputFiles');
        await cdp.send('DOM.setFileInputFiles', { nodeId, files: files.map(f => resolvePath(f)) });
        await cdp.detach().catch(() => {});
        console.log('(file over 50 MB: set by path through DOM.setFileInputFiles)');
      }
      await logTap('upload', undefined, undefined, undefined); console.log('uploaded', files.length, 'file(s)'); return;
    }
    case 'wait': case 'sleep': { const s = Number(a[0] ?? 5); await sleep(s); console.log('waited', s); return; }
    case 'waitfor': {
      const gone = a.includes('--gone'), ti = a.indexOf('--timeout'), ei = a.indexOf('--every');
      const alts = (a[0] ?? '').split('|').filter(Boolean);
      const r = await waitText(alts, gone, ti >= 0 ? Number(a[ti + 1]) : 120, ei >= 0 ? Number(a[ei + 1]) : 2);
      console.log(gone ? `gone after ${r.secs} s` : `"${r.hit}" after ${r.secs} s`); return;
    }
    case 'expect': case 'expect-not': {
      const alts = a.join(' ').split('|').filter(Boolean), texts = await visibleTexts();
      const hit = alts.find(x => texts.some(t => t.includes(x)));
      if (c === 'expect' && !hit) throw new Error(`expect: none of "${alts.join('|')}" is visible`);
      if (c === 'expect-not' && hit) throw new Error(`expect-not: "${hit}" is visible`);
      console.log(c === 'expect' ? `ok: "${hit}"` : 'ok: none visible'); return;
    }
    case 'tabs': userPages(P.context()).forEach((p, i) => console.log(`${p === P ? '*' : ' '} ${i}  ${p.url()}`)); return;
    case 'tab': { const pages = userPages(P.context()), i = num(0); if (!pages[i]) throw new Error(`tab: no tab ${i}`); P = pages[i]; await P.bringToFront(); selectTab(P.context(), P); console.log('tab', i, P.url()); return; }
    case 'newtab': { P = await P.context().newPage(); if (a[0]) await P.goto(urlFor(a[0]), { waitUntil: 'load' }); selectTab(P.context(), P); console.log('new tab', P.url()); return; }
    case 'closetab': { const pages = userPages(P.context()), p = a[0] ? pages[num(0)] : P; if (!p) throw new Error('closetab: no such tab');
      await p.close(); const left = userPages(P.context()); P = left[left.length - 1]; if (P) selectTab(P.context(), P); console.log('closed; now', P?.url()); return; }
    case 'window': {
      const cdp = await P.context().newCDPSession(P);
      if (a.length >= 2) {
        const { windowId } = await cdp.send('Browser.getWindowForTarget');
        await cdp.send('Browser.setWindowBounds', { windowId, bounds: { windowState: 'normal' } });
        // set the outer size, then correct by the measured frame so the viewport is exactly W × H
        for (let i = 0; i < 2; i++) {
          const vp = await P.evaluate(() => ({ w: innerWidth, h: innerHeight, ow: outerWidth, oh: outerHeight }));
          await cdp.send('Browser.setWindowBounds', { windowId, bounds: { width: num(0) + vp.ow - vp.w, height: num(1) + vp.oh - vp.h } });
          await sleep(0.3);
        }
      }
      const vp = await P.evaluate(() => ({ w: innerWidth, h: innerHeight, dpr: devicePixelRatio }));
      console.log(`viewport ${vp.w}x${vp.h} (device pixel ratio ${vp.dpr})`); return;
    }
    case 'credits': {
      // run.md step 8 on the web: the balance from the account menu, or (`credits ledger`) the credit ledger page,
      // saved to ledger/<ID>-<time>.json (+ .png for the ledger) like the phones' `ledger` reads
      const cfg = web?.credits; if (!cfg) throw new Error('credits: no web.credits in product.json');
      const ledger = a[0] === 'ledger', id = (ledger ? a[1] : a[0]) ?? 'credits';
      const dir = join(runDir, 'ledger'); mkdirSync(dir, { recursive: true });
      const file = join(dir, `${id}-${stamp()}`);
      if (ledger) {
        const url = cfg.ledger_urls?.[envName()]; if (!url) throw new Error(`credits ledger: no ledger URL for environment "${envName()}" (web.credits.ledger_urls)`);
        const back = P, ctx = P.context();
        P = await ctx.newPage(); await P.goto(url, { waitUntil: 'load', timeout: 60_000 }).catch(() => {});
        await P.waitForLoadState('networkidle', { timeout: 20_000 }).catch(() => {}); await sleep(2);
        const host = new URL(P.url()).hostname, signedIn = host === new URL(url).hostname;
        const texts = await visibleTexts(); await snap({ path: `${file}.png` });
        // CyberLink Member Zone › Credits (2026-11-25): the balance next to "credits available", and one grid row per
        // transaction whose cells carry their own (mobile) label: Time, Credits, Category, Product, … read as objects
        const page = await P.evaluate(() => {
          const clean = (s: string | null | undefined) => (s ?? '').replace(/\s+/g, ' ').trim();
          const rows = [...document.querySelectorAll<HTMLElement>('[class*="grid-cols-"]')]
            .filter(r => /\b[A-Z][a-z]{2} \d{1,2}, \d{4} \d{1,2}:\d{2}\b/.test(r.innerText ?? '') && r.children.length >= 3)
            .map(r => Object.fromEntries([...r.children].map((c, i) => {
              const spans = [...c.querySelectorAll('span')], label = clean(spans.length > 1 ? spans[0].textContent : '') || `col${i + 1}`;
              const value = clean(spans.length > 1 ? spans.slice(1).map(s => s.textContent).join(' ') : (c as HTMLElement).innerText);
              return [label, value];
            })));
          return { balance: null as number | null, rows };
        });
        // the balance is the first number-only line after "credits available" (the page's own text order)
        const ai = texts.findIndex(t => /credits available/i.test(t)), num = ai < 0 ? undefined : texts.slice(ai + 1).find(t => /^[\d,]+$/.test(t));
        page.balance = num ? Number(num.replace(/,/g, '')) : null;
        writeFileSync(`${file}.json`, JSON.stringify({ at: new Date().toISOString(), env: envName(), url: P.url(), signedIn, balance: page.balance, rows: page.rows, texts }, null, 2));
        await P.close(); P = back; await P.bringToFront().catch(() => {});
        if (!signedIn) throw new Error(`credits ledger: the ledger asks for sign-in (${host}): the user signs in there once in this Chrome profile`);
        console.log(`ledger balance ${page.balance ?? '?'} · ${page.rows.length} transactions on the first page → ${file}.json + .png`);
        for (const r of page.rows.slice(0, 10)) console.log(`  ${Object.values(r).filter(Boolean).join(' | ')}`);
        if (!page.rows.length) console.log(texts.slice(0, 40).join('\n'));
        return;
      }
      const e = await findId(cfg.menu_id); if (!e) throw new Error(`credits: no account menu "${cfg.menu_id}" on this page`);
      await P.mouse.click(...centre(e)); await sleep(1.2);
      const texts = await visibleTexts(); await P.keyboard.press('Escape').catch(() => {}); await sleep(0.4);
      const m = texts.join('\n').match(new RegExp(cfg.pattern ?? 'Credits:\\s*([\\d,]+)', 'i'));
      const email = texts.join(' ').match(/[\w.+-]+@[\w-]+(\.[\w-]+)+/)?.[0] ?? '';
      // one menu line per plan ("Studio Pro Plan Active"); the menu's whole-block line holds every plan and is skipped
      const plans = texts.filter(t => /^[^:@]*\bPlan\s+Active$/i.test(t)).map(t => t.replace(/\s*Active$/i, ''));
      const out = { at: new Date().toISOString(), env: envName(), url: P.url(), balance: m ? Number(m[1].replace(/,/g, '')) : null, account: email, plans };
      writeFileSync(`${file}.json`, JSON.stringify(out, null, 2));
      console.log(`balance ${out.balance ?? '?'} · ${email || 'account ?'}${plans.length ? ` (${plans.join(', ')})` : ''} → ${file}.json`); return;
    }
    case 'build': {
      const v = await cdpVersion();
      const b = web?.build_js ? await P.evaluate(js => { try { return String((0, eval)(js)); } catch (e) { return `build_js failed: ${e}`; } }, web.build_js) : '(no web.build_js in product.json)';
      console.log(`build: ${b}\nurl: ${P.url()}\ntitle: ${await P.title()}\nchrome: ${v?.Browser ?? '?'}`);
      // The site's public version.json is the build of record for MyEdit eBugs (ebug-writing, user 2026-11-25): read it
      // directly and keep it as <run dir>/build-info.json (raw response, version and build as strings).
      if (baseUrl()) {
        const url = `${baseUrl().replace(/\/$/, '')}/version.json`;
        try {
          const r = await httpGet(url), raw = r.body;
          const ver = String(JSON.parse(raw).version ?? '').trim(), seg = ver.split('-');
          const info = { url, capturedAt: new Date().toISOString(), statusCode: r.status, rawResponse: raw, raw: ver,
            version: seg.length >= 2 && /^\d+\.\d+\.\d+$/.test(seg.at(-2)!) ? seg.at(-2) : null, buildNo: seg.length >= 2 && /^\d+$/.test(seg.at(-1)!) ? seg.at(-1) : null };
          writeFileSync(join(runDir, 'build-info.json'), JSON.stringify(info, null, 2));
          console.log(`version.json: ${ver}${info.version ? ` (version ${info.version}, build ${info.buildNo})` : ' (unexpected format: kept raw, do not guess)'} → build-info.json`);
        } catch (e: any) { console.log(`version.json: not read (${String(e?.message ?? e).slice(0, 120)})`); }
      }
      return;
    }
    case 'design': throw new Error('design captures are not available on the web yet (figma skill, conformance).');
    default: throw new Error(`unknown command "${c}" (see the header of scripts/device-web.ts)`);
  }
}

async function status() {
  const v = await cdpVersion(), s = readJson<Session>(SESSION);
  console.log(`Chrome: ${v ? `${v.Browser} on port ${PORT}` : `not running on port ${PORT}`}`);
  console.log(`account: ${ACCOUNT ? `${ACCOUNT.name}${ACCOUNT.account.note ? ` (${ACCOUNT.account.note})` : ''}` : 'none (default profile)'}`);
  console.log(`session: ${s ? `profile ${s.profile}, ${s.started ? `started by this run (pid ${s.pid})` : 'attached'} at ${s.at}` : 'none (start)'}`);
  console.log(`environment: ${envName() || '(none)'} ${baseUrl() || ''}`);
  const pid = readJson<number>(LOGPID); console.log(`browser log capture: ${pid && alive(pid) ? `running (pid ${pid})` : 'off'}`);
  if (!v) return;
  P = await page();
  userPages(P.context()).forEach((p, i) => console.log(`${p === P ? '*' : ' '} tab ${i}  ${p.url()}`));
  const vp = await P.evaluate(() => ({ w: innerWidth, h: innerHeight }));
  console.log(`viewport ${vp.w}x${vp.h}`);
}

async function main() {
  switch (cmd) {
    case '__logger': return logger();
    case '__recorder': return recorder();
    case 'record': {
      const sub = rest[0] ?? 'status';
      if (sub === 'start') {
        if (recording()) { console.log('already recording; record stop NAME first'); return; }
        if (!(await cdpVersion())) blocker(`no Chrome on port ${PORT}`);
        ffmpegPath();
        rmSync(REC, { recursive: true, force: true }); mkdirSync(REC, { recursive: true });
        const max = Math.min(Number(rest[1] ?? 180), 600);
        writeFileSync(REC_INFO, JSON.stringify({ start: Date.now(), max }));
        const child = spawn(process.execPath, [process.argv[1], runDir, '__recorder'], { detached: true, stdio: 'ignore' });
        child.unref(); writeFileSync(REC_PID, String(child.pid));
        for (let i = 0; i < 20 && !existsSync(join(REC, 'frame-00000.jpg')); i++) await sleep(0.25);
        console.log(`recording (pid ${child.pid}, stops by itself after ${max} s)${existsSync(join(REC, 'frame-00000.jpg')) ? '' : ' (no frame yet: the page may be still)'}`);
        return;
      }
      if (sub === 'stop') {
        const name = rest[1]; if (!name) { console.error('record stop NAME'); process.exit(2); }
        const out = join(runDir, 'recordings', `${name}.mp4`);
        if (existsSync(out)) { console.error(`${out} exists; choose another NAME`); process.exit(2); }
        const pid = readJson<number>(REC_PID);
        if (pid && alive(pid)) { writeFileSync(REC_STOP, ''); for (let i = 0; i < 40 && alive(pid); i++) await sleep(0.25); }
        if (!existsSync(join(REC, 'capture.json'))) { console.error('no capture to encode (record start first)'); process.exit(1); }
        const r = encodeRecording(join(REC, 'capture.json'), out, ffmpegPath());
        // keep the raw frames and click log next to the video (local only, like screenshots)
        const raw = join(runDir, 'recordings', name); renameSync(REC, raw);
        console.log(`${out} (${r.frames} frames, ${r.size.width}x${r.size.height}, ${r.clicks} clicks drawn; raw frames in ${raw})`);
        return;
      }
      const r = recording(); console.log(r ? `recording for ${Math.round((Date.now() - r.start) / 1000)} s (max ${r.max} s)` : 'not recording'); return;
    }
    case 'start': {
      const e = flag('env'); if (e) writeFileSync(ENVF, e);
      const s = await startChrome(flag('profile') ?? ACCOUNT?.account.profile ?? 'default', flag('size') ?? defaultSize());
      console.log(s.started ? `Chrome started (pid ${s.pid}, profile ${s.profile}, port ${PORT})` : `attached to the running Chrome on port ${PORT}`);
      return status();
    }
    case 'restart': {
      const hard = has('hard'), s = readJson<Session>(SESSION);
      if (hard && s?.started && s.pid && alive(s.pid)) { try { process.kill(s.pid); } catch {} for (let i = 0; i < 20 && (await cdpVersion()); i++) await sleep(0.5); }
      if (!(await cdpVersion())) await startChrome(ACCOUNT?.account.profile ?? s?.profile ?? 'default', defaultSize());
      P = await page(); await P.bringToFront(); return status();
    }
    case 'status': return status();
    case 'account': {
      // switching only re-points the run; the next `restart` starts the account's Chrome if it is not open yet
      console.log(ACCOUNT ? `account: ${ACCOUNT.name} (port ${ACCOUNT.account.port}, profile ${ACCOUNT.account.profile})${await cdpVersion() ? '' : ' — Chrome not running: restart'}`
        : `account: none (default Chrome on port ${PORT})`);
      return;
    }
    case 'env': { if (rest[0]) { if (web?.base_urls && !web.base_urls[rest[0]]) { console.error(`No environment "${rest[0]}": ${Object.keys(web.base_urls).join(', ')}`); process.exit(2); } writeFileSync(ENVF, rest[0]); }
      console.log(`environment: ${envName()} ${baseUrl()}`); return; }
    case 'stop': if (existsSync(SESSION)) unlinkSync(SESSION); console.log('session forgotten (Chrome keeps running)'); return;
    case 'quit': { const s = readJson<Session>(SESSION);
      if (!s?.started || !s.pid) { console.log('this run did not start Chrome; left running'); return; }
      try { process.kill(s.pid); console.log('Chrome closed'); } catch { console.log('Chrome was already closed'); } unlinkSync(SESSION); return; }
    case 'logs': {
      const sub = rest[0] ?? 'status', pid = readJson<number>(LOGPID);
      if (sub === 'start') { if (!(await cdpVersion())) blocker(`no Chrome on port ${PORT}`); startLogger(); return; }
      if (sub === 'stop') { if (pid && alive(pid)) { process.kill(pid); console.log('browser log capture stopped'); } else console.log('no capture running'); if (existsSync(LOGPID)) unlinkSync(LOGPID); return; }
      console.log(pid && alive(pid) ? `running (pid ${pid}), ${existsSync(LIVELOG) ? statSync(LIVELOG).size : 0} bytes so far` : 'off'); return;
    }
    case 'pull-logs': {
      if (!existsSync(LIVELOG)) { console.log('no live capture (logs start at the segment start)'); return; }
      const dir = join(runDir, 'logs', `${rest[0] ? `${rest[0]}-` : ''}${stamp()}`); mkdirSync(dir, { recursive: true });
      copyFileSync(LIVELOG, join(dir, 'browser.jsonl')); truncateSync(LIVELOG, 0);
      console.log(dir); summarize(join(dir, 'browser.jsonl')); return;
    }
  }
  P = await page();
  if (cmd === 'do') {
    await runRecipe(runDir, rest, step, async () => {
      const f = join(runDir, 'screenshots', `do-failed-${stamp()}.png`); mkdirSync(join(runDir, 'screenshots'), { recursive: true });
      await snap({ path: f }).catch(() => {});
      return [`  screenshot: ${f}`, `  url: ${P.url()}`, ...(await collect(false).catch(() => [])).slice(0, 60).map(e => `  ${line(e)}`)];
    });
    return;
  }
  try { await step(cmd, rest); }
  catch (e: any) { console.error(String(e?.message ?? e).slice(0, 600)); process.exit(1); }
}

main().then(() => process.exit(0), e => { console.error(String(e?.stack ?? e).slice(0, 800)); process.exit(1); });
