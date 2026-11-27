// The Regression (AT) tab's Jenkins reader (lib/at-results.ts) against a stand-in Jenkins and ReportPortal: an Allure
// build, a ReportPortal launch linked from the build description, and a plain JUnit report.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import type { AddressInfo } from 'node:net';
import { pytestTally, readJenkins } from '../lib/at-results.ts';

test('AT results: Allure, ReportPortal and JUnit builds are counted and linked to their report', async () => {
  const seen: string[] = [];
  const server = createServer((req, res) => {
    const p = (req.url ?? '').split('?')[0], B = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
    seen.push(`${p} ${(req.headers.authorization ?? '-').split(' ')[0]}`);
    const routes: Record<string, unknown> = {
      '/job/a/lastCompletedBuild/api/json': { number: 42, url: `${B}/job/a/42/`, result: 'UNSTABLE', timestamp: 0, actions: [{ urlName: 'allure' }] },
      '/job/a/42/allure/widgets/summary.json': { statistic: { failed: 3, broken: 2, skipped: 1, passed: 40, unknown: 1, total: 47 } },
      '/job/rp/lastCompletedBuild/api/json': { number: 7, url: `${B}/job/rp/7/`, result: 'SUCCESS', timestamp: 0, description: `<a href="${B}/ui/#qa/launches/all/77">RP</a>`, actions: [] },
      '/api/v1/qa/launch/77': { id: 77, statistics: { executions: { total: 20, passed: 16, failed: 1, skipped: 1 } } },
      '/job/j/lastCompletedBuild/api/json': { number: 3, url: `${B}/job/j/3/`, result: 'FAILURE', timestamp: 0, actions: [] },
      '/job/j/3/testReport/api/json': { totalCount: 10, failCount: 2, skipCount: 1 },
    };
    if (p.endsWith('/consoleText')) { res.end('nothing linked'); return; }
    if (!(p in routes)) { res.writeHead(404); res.end('{}'); return; }
    res.writeHead(200, { 'content-type': 'application/json' }); res.end(JSON.stringify(routes[p]));
  });
  await new Promise<void>(ok => server.listen(0, '127.0.0.1', ok));
  const B = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
  process.env.JENKINS_USER = 'u'; process.env.JENKINS_TOKEN = 't'; process.env.RP_TOKEN = 'r';
  try {
    const a = await readJenkins({ jenkins: `${B}/job/a` });
    assert.deepEqual([a.kind, a.total, a.pass, a.fail, a.blocked, a.skip, a.report], ['allure', 47, 40, 3, 3, 1, `${B}/job/a/42/allure/`]);
    const rp = await readJenkins({ jenkins: `${B}/job/rp` });
    assert.deepEqual([rp.kind, rp.total, rp.pass, rp.fail, rp.blocked, rp.skip, rp.report], ['reportportal', 20, 16, 1, 2, 1, `${B}/ui/#qa/launches/all/77`]);
    const j = await readJenkins({ jenkins: `${B}/job/j` });
    assert.deepEqual([j.kind, j.total, j.pass, j.fail, j.blocked, j.skip, j.build], ['junit', 10, 7, 2, null, 1, 3]);
    await assert.rejects(readJenkins({ jenkins: `${B}/job/none` }), /no completed build/);
    // Jenkins gets the Jenkins sign-in, ReportPortal its own token
    assert.ok(seen.includes('/job/a/lastCompletedBuild/api/json Basic') && seen.includes('/api/v1/qa/launch/77 Bearer'));
  } finally { server.close(); }
});

test('AT results: the pytest summary of the largest run in a console is counted', () => {
  const text = 'stuff\n= 383 failed, 2912 passed, 2283 skipped, 4 deselected, 1 xfailed, 744 warnings, 2 errors in 32760.12s (9:06:00) =\nmore\n============= 2 failed, 2 passed, 7 warnings in 185.40s (0:03:05) =============\n';
  assert.deepEqual(pytestTally(text), { total: 5581, pass: 2912, fail: 383, blocked: 2, skip: 2284 });
  assert.equal(pytestTally('no summary here'), null);
});
