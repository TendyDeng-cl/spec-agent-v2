// The styles and script every casebook page shares: a page template holds the two markers, this fills them in.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const part = (name: string) => readFileSync(join(import.meta.dirname, '..', name), 'utf8');

// The theme (user, 2026-11-27): System, Light or Dark, chosen per browser on the Settings page and kept in
// localStorage 'casebook-theme'. It sets <html data-theme>, which every page's dark rules already honour, and points the
// browser bar's theme-color at the chosen side. It runs in <head>, before anything is drawn, so a dark page never
// flashes white; a page without a <head> of its own runs it at the start of the shared script instead. Another tab
// changing the choice redraws this one (storage event), and so does coming back to it (pageshow, visibilitychange). window.cbTheme() applies it again after a change here.
export const THEME_JS = `(function () {
  var K = 'casebook-theme';
  function apply() {
    var t = ''; try { t = localStorage.getItem(K) || ''; } catch (e) {}
    var r = document.documentElement;
    if (t === 'light' || t === 'dark') r.setAttribute('data-theme', t); else r.removeAttribute('data-theme');
    document.querySelectorAll('meta[name="theme-color"]').forEach(function (m) {
      if (!m.hasAttribute('data-media')) m.setAttribute('data-media', m.getAttribute('media') || '');
      var media = m.getAttribute('data-media');
      m.setAttribute('media', !t || !media ? media : media.indexOf(t) >= 0 ? 'all' : 'not all');
    });
  }
  apply(); window.cbTheme = apply;
  addEventListener('storage', function (e) { if (e.key === K) apply(); });
  // a page restored from the back-forward cache (Settings, then Back) or brought back to the front checks the choice again
  addEventListener('pageshow', apply);
  document.addEventListener('visibilitychange', function () { if (!document.hidden) apply(); });
})();`;

export function withShared(html: string): string {
  const head = html.includes('</head>');
  return html.replace('/*__SHARED_CSS__*/', () => part('page-shared.css.tpl'))
    .replace('/*__SHARED_JS__*/', () => (head ? '' : THEME_JS + '\n') + part('page-shared.js.tpl'))
    .replace('</head>', () => `<script>${THEME_JS}</script>\n</head>`);
}
