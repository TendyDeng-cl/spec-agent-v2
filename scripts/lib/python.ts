// The Python the scripts run: CASEBOOK_PYTHON, else the repo's own venv when it exists (README › Install puts Pillow
// there), else the interpreter on PATH. Isolated runs (`python3 -I`) skip user installs and PYTHONPATH, so only an
// interpreter with Pillow in its own site-packages works for them (user, 2026-11-23). On Windows `python3` is usually
// the Microsoft Store stub (exit 49, no Pillow) and the real interpreter is `python` (2026-11-17).
import { existsSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const win = process.platform === 'win32';
const venv = win ? join(ROOT, '.venv', 'Scripts', 'python.exe') : join(ROOT, '.venv', 'bin', 'python');

export const PYTHON = process.env.CASEBOOK_PYTHON || (existsSync(venv) ? venv : win ? 'python' : 'python3');
