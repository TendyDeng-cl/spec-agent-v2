// Test accounts for website runs (user, 2026-11-25): one Chrome profile per account on its own DevTools port, so a run
// switches account by switching Chrome. The user signs in once in each account's window; the agent never types a
// password, and no password is stored anywhere (registry: ~/.casebook/web/accounts.json, see lib/web-accounts.ts).
// Usage: node scripts/web-account.ts <command> [args]
//   add NAME [--product P] [--env E] [--port N] [--note TEXT]
//                     register NAME (profile ~/.casebook/web/profiles/acct-NAME, the next free port from 9341), open
//                     its Chrome on the product's site (P: myedit (default) or myedit-biz; E: product.json
//                     web.default_env) and wait: the user signs in there once
//   open NAME         start NAME's Chrome if it is not running and open the site (to sign in again when it expired)
//   check NAME        is NAME's Chrome signed in? prints the account e-mail and plans from the account menu; exit 1 if not
//   list              every account: port, profile, Chrome running, active mark (add --check to also check sign-ins)
//   use NAME | use -  set / clear this computer's active account (runs without their own account use it)
//   note NAME TEXT    set NAME's note (what the account is for: "Free, 0 credits", "Premium, yearly")
//   remove NAME       drop NAME from the registry (its profile folder stays; delete it by hand if wanted)
// A run picks its account with `device-web.ts <run dir> account NAME` (kept in <run dir>/.account); every later
// device-web.ts command of that run talks to that account's Chrome. Exit 75 = BLOCKER (no Chrome).
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { chromium } from 'playwright-core';
import { BLOCKER, env, sleep } from './lib/device-common.ts';
import { ACCOUNTS_FILE, WEB_HOME, loadAccounts, nextPort, saveAccounts, validName, type WebAccount } from './lib/web-accounts.ts';

const [cmd, ...rest] = process.argv.slice(2);
const flag = (name: string) => { const i = rest.indexOf(`--${name}`); if (i < 0) return undefined; const v = rest[i + 1]; rest.splice(i, 2); return v; };
const has = (name: string) => { const i = rest.indexOf(`--${name}`); if (i < 0) return false; rest.splice(i, 1); return true; };
const die = (msg: string, code = 2): never => { console.error(msg); process.exit(code); };
const REPO = join(import.meta.dirname, '..');

type Web = { base_urls?: Record<string, string>; default_env?: string; viewport?: { width: number; height: number }; credits?: { menu_id?: string } };
function productWeb(product: string): Web {
  const f = join(REPO, 'library', product, 'product.json');
  if (!existsSync(f)) die(`No library/${product}/product.json`);
  const web = JSON.parse(readFileSync(f, 'utf8')).web as Web | undefined;
  return web ?? die(`library/${product}/product.json has no "web" section`);
}
function siteUrl(a: WebAccount, envName?: string): string {
  const web = productWeb(a.product ?? 'myedit'), e = envName ?? web.default_env ?? Object.keys(web.base_urls ?? {})[0];
  return web.base_urls?.[e!] ?? die(`No environment "${e}" in library/${a.product ?? 'myedit'}/product.json web.base_urls`);
}

function chromePath(): string {
  const own = env('CHROME'); if (own && existsSync(own)) return own;
  const c = process.platform === 'win32'
    ? [join(process.env.PROGRAMFILES ?? 'C:\\Program Files', 'Google/Chrome/Application/chrome.exe'),
       join(process.env['PROGRAMFILES(X86)'] ?? 'C:\\Program Files (x86)', 'Google/Chrome/Application/chrome.exe'),
       join(process.env.LOCALAPPDATA ?? '', 'Google/Chrome/Application/chrome.exe')]
    : process.platform === 'darwin' ? ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome']
    : ['/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser'];
  return c.find(existsSync) ?? die('BLOCKER (browser): Google Chrome not found: install it or set CASEBOOK_CHROME.', BLOCKER);
}
async function running(port: number): Promise<boolean> {
  try { const r = await fetch(`http://127.0.0.1:${port}/json/version`, { signal: AbortSignal.timeout(2000) }); return r.ok; } catch { return false; }
}
async function ensureChrome(name: string, a: WebAccount): Promise<boolean> {
  if (await running(a.port)) return false;
  const dir = join(WEB_HOME, 'profiles', a.profile); mkdirSync(dir, { recursive: true });
  const v = productWeb(a.product ?? 'myedit').viewport ?? { width: 1440, height: 900 };
  const child = spawn(chromePath(), [`--remote-debugging-port=${a.port}`, `--user-data-dir=${dir}`, '--no-first-run',
    '--no-default-browser-check', '--disable-search-engine-choice-screen', `--window-size=${v.width},${v.height + 85}`, 'about:blank'],
    { detached: true, stdio: 'ignore' });
  child.unref();
  for (let i = 0; i < 40 && !(await running(a.port)); i++) await sleep(0.5);
  if (!(await running(a.port))) die(`BLOCKER (browser): ${name}'s Chrome did not open port ${a.port} (is the profile open in another Chrome?)`, BLOCKER);
  return true;
}
async function openSite(a: WebAccount, url: string) {
  const b = await chromium.connectOverCDP(`http://127.0.0.1:${a.port}`, { timeout: 15_000 });
  const ctx = b.contexts()[0]; const blank = ctx.pages().find(p => p.url() === 'about:blank');
  const p = blank ?? await ctx.newPage();
  await p.goto(url, { waitUntil: 'load', timeout: 60_000 }).catch(() => {});
  await p.bringToFront().catch(() => {});
  await b.close();
}

// Signed in = the site shows the account menu; its open menu gives the e-mail and the active plans. Done in a tab of its
// own that is closed again, so a run's tab is left as it was.
async function check(a: WebAccount): Promise<{ signedIn: boolean; email: string; plans: string[]; url: string }> {
  const web = productWeb(a.product ?? 'myedit'), menu = web.credits?.menu_id ?? 'POL_DefaultPhd_AccountMenuButton';
  const b = await chromium.connectOverCDP(`http://127.0.0.1:${a.port}`, { timeout: 15_000 });
  const p = await b.contexts()[0].newPage();
  try {
    const sel = `[id="${menu}"], [data-testid="${menu}"], [data-test-id="${menu}"], [name="${menu}"]`;
    // the landing page (/, /tw) has no account menu even when signed in; the signed-in Home (/<lang>/home) has it
    // (2026-11-25), so try the landing page first, then Home
    let btn = null;
    for (const url of [siteUrl(a), siteUrl(a).replace(/\/+$/, '') + '/en/home']) {
      await p.goto(url, { waitUntil: 'load', timeout: 60_000 }).catch(() => {});
      await p.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {});
      btn = await p.waitForSelector(sel, { state: 'visible', timeout: 8_000 }).catch(() => null);
      if (btn) break;
    }
    if (!btn) return { signedIn: false, email: '', plans: [], url: p.url() };
    await btn.click(); await sleep(1.2);
    const text: string = await p.evaluate(() => document.body.innerText);
    const email = text.match(/[\w.+-]+@[\w-]+(\.[\w-]+)+/)?.[0] ?? '';
    const plans = text.split('\n').map(t => t.trim()).filter(t => /^[^:@]*\bPlan\s+Active$/i.test(t)).map(t => t.replace(/\s*Active$/i, ''));
    return { signedIn: !!email, email, plans, url: p.url() };
  } finally { await p.close().catch(() => {}); await b.close(); }
}

function get(name: string | undefined): [string, WebAccount] {
  if (!name) die(`Usage: node scripts/web-account.ts ${cmd} NAME`);
  const a = loadAccounts().accounts[name!];
  return a ? [name!, a] : die(`No web account "${name}" (node scripts/web-account.ts list)`);
}

async function main() {
  switch (cmd) {
    case 'add': {
      const product = flag('product') ?? 'myedit', e = flag('env'), port = flag('port'), note = flag('note'), name = rest[0];
      if (!name || !validName(name)) die('Usage: web-account.ts add NAME (letters, digits, - and _)');
      productWeb(product);
      const all = loadAccounts();
      if (all.accounts[name]) die(`"${name}" already exists (port ${all.accounts[name].port}); use \`open ${name}\` to sign in again`);
      const a: WebAccount = { profile: `acct-${name}`, port: port ? Number(port) : nextPort(all), product, ...(note ? { note } : {}) };
      if (Object.values(all.accounts).some(x => x.port === a.port)) die(`port ${a.port} is already used by another account`);
      all.accounts[name] = a; saveAccounts(all);
      await ensureChrome(name, a); await openSite(a, siteUrl(a, e));
      console.log(`added "${name}": profile ${a.profile}, port ${a.port}, ${product}`);
      console.log(`→ sign in as the ${name} account in the Chrome window that just opened, then run: node scripts/web-account.ts check ${name}`);
      return;
    }
    case 'open': {
      const [name, a] = get(rest[0]); const started = await ensureChrome(name, a);
      await openSite(a, siteUrl(a, flag('env')));
      console.log(`${name}: Chrome ${started ? 'started' : 'already running'} on port ${a.port}, site opened`); return;
    }
    case 'check': {
      const [name, a] = get(rest[0]);
      if (!(await running(a.port))) await ensureChrome(name, a);
      const r = await check(a);
      if (!r.signedIn) { console.log(`${name}: NOT signed in (${r.url}). The user signs in: node scripts/web-account.ts open ${name}`); process.exit(1); }
      console.log(`${name}: signed in as ${r.email}${r.plans.length ? ` (${r.plans.join(', ')})` : ' (no active plan shown)'}`); return;
    }
    case 'list': {
      const doCheck = has('check'), all = loadAccounts(), names = Object.keys(all.accounts);
      if (!names.length) { console.log(`no web accounts yet (${ACCOUNTS_FILE}); add one: web-account.ts add NAME`); return; }
      for (const n of names) {
        const a = all.accounts[n], up = await running(a.port);
        let s = `${all.active === n ? '*' : ' '} ${n.padEnd(12)} port ${a.port}  ${(a.product ?? 'myedit').padEnd(10)} profile ${a.profile}  Chrome ${up ? 'running' : 'closed'}`;
        if (doCheck && up) { const r = await check(a); s += r.signedIn ? `  signed in: ${r.email}${r.plans.length ? ` (${r.plans.join(', ')})` : ''}` : '  NOT signed in'; }
        if (a.note) s += `  — ${a.note}`;
        console.log(s);
      }
      return;
    }
    case 'use': {
      const all = loadAccounts(), name = rest[0];
      if (!name) die('Usage: web-account.ts use NAME | use -');
      if (name === '-') { delete all.active; saveAccounts(all); console.log('no active account (runs use the default Chrome on port 9333)'); return; }
      get(name); all.active = name; saveAccounts(all); console.log(`active account: ${name}`); return;
    }
    case 'note': { const [name] = get(rest[0]); const all = loadAccounts(); all.accounts[name].note = rest.slice(1).join(' '); saveAccounts(all); console.log(`${name}: ${all.accounts[name].note}`); return; }
    case 'remove': {
      const [name, a] = get(rest[0]); const all = loadAccounts(); delete all.accounts[name]; if (all.active === name) delete all.active; saveAccounts(all);
      console.log(`removed "${name}" (profile folder ${join(WEB_HOME, 'profiles', a.profile)} kept)`); return;
    }
    default: die('Usage: node scripts/web-account.ts add|open|check|list|use|note|remove … (see the header of this file)');
  }
}
main().catch(e => { console.error(String(e?.message ?? e)); process.exit(1); });
