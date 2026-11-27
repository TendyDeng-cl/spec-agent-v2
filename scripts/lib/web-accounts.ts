// Test accounts for website runs (user, 2026-11-25): one Chrome profile per account, each on its own DevTools port, so
// a run switches account by switching Chrome instead of signing out and in. The registry is
// ~/.casebook/web/accounts.json (per computer, never in the repo): names, profiles, ports and notes only. No password is
// ever stored or typed: the user signs in once in each account's Chrome and the profile keeps the sign-in.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

export type WebAccount = { profile: string; port: number; note?: string; product?: string };
export type WebAccounts = { active?: string; accounts: Record<string, WebAccount> };

export const WEB_HOME = join(homedir(), '.casebook', 'web');
export const ACCOUNTS_FILE = join(WEB_HOME, 'accounts.json');
export const DEFAULT_PORT = 9333;
export const FIRST_ACCOUNT_PORT = 9341;

export function loadAccounts(): WebAccounts {
  try { const j = JSON.parse(readFileSync(ACCOUNTS_FILE, 'utf8')); return { active: j.active, accounts: j.accounts ?? {} }; }
  catch { return { accounts: {} }; }
}
export function saveAccounts(a: WebAccounts) {
  mkdirSync(WEB_HOME, { recursive: true });
  writeFileSync(ACCOUNTS_FILE, JSON.stringify(a, null, 2) + '\n');
}
export function nextPort(a: WebAccounts): number {
  const used = new Set(Object.values(a.accounts).map(x => x.port));
  let p = FIRST_ACCOUNT_PORT; while (used.has(p)) p++; return p;
}
export const validName = (n: string) => /^[a-z0-9][a-z0-9_-]{0,31}$/i.test(n);

// The account a run uses: <run dir>/.account, else the computer's active account, else none (the old single Chrome on
// CASEBOOK_WEB_PORT / 9333 with profile "default").
export function runAccount(runDir: string): { name: string; account: WebAccount } | null {
  const f = join(runDir, '.account');
  const name = (existsSync(f) ? readFileSync(f, 'utf8').trim() : '') || loadAccounts().active || '';
  if (!name) return null;
  const account = loadAccounts().accounts[name];
  if (!account) { console.error(`Web account "${name}" is not in ${ACCOUNTS_FILE} (node scripts/web-account.ts list).`); process.exit(2); }
  return { name, account };
}
