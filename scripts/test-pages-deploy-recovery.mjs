import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import YAML from 'yaml';

const workflow = YAML.parse(readFileSync(new URL('../.github/workflows/recover-pages-deploy.yml', import.meta.url), 'utf8'));
const retryJob = workflow.jobs['retry-deploy'];
const retryScript = retryJob.steps.find((step) => step.name.startsWith('Re-run failed deployment')).run;

// Supply deterministic GitHub API responses without network calls or writes.
const fakeGitHub = [
  'gh() {',
  '  case "$*" in',
  '    *"/commits/main"*) printf "%s\\n" "$TEST_MAIN_SHA" ;;',
  '    *"/jobs?per_page=100"*) printf "%s\\n" "$TEST_JOBS_JSON" ;;',
  '    *"/rerun-failed-jobs"*) printf "%s\\n" "POSTED" ;;',
  '    *"/actions/runs/"*) printf "%s\\n" "$TEST_RUN_JSON" ;;',
  '    *) echo "Unexpected mock API request: $*" >&2; return 1 ;;',
  '  esac',
  '}',
].join('\n');

function runRecovery({
  mainSha = 'abc',
  sourceSha = 'abc',
  attempt = 1,
  eventAttempt = attempt,
  runStatus = 'completed',
  runConclusion = 'failure',
  buildConclusion = 'success',
  deployConclusion = 'failure',
} = {}) {
  const run = {
    status: runStatus,
    conclusion: runConclusion,
    run_attempt: attempt,
    head_sha: sourceSha,
  };
  const jobs = {
    jobs: [
      { name: 'build', conclusion: buildConclusion },
      { name: 'deploy', conclusion: deployConclusion },
      { name: 'Smoke-test changed published Pages files', conclusion: 'skipped' },
    ],
  };
  return spawnSync('bash', ['-c', `${fakeGitHub}\n${retryScript}`], {
    encoding: 'utf8',
    env: {
      ...process.env,
      GITHUB_REPOSITORY: 'InSuns21/toukei-kentei_grade1_preparation',
      SOURCE_RUN_ID: '42',
      SOURCE_RUN_ATTEMPT: String(eventAttempt),
      SOURCE_SHA: sourceSha,
      TEST_MAIN_SHA: mainSha,
      TEST_RUN_JSON: JSON.stringify(run),
      TEST_JOBS_JSON: JSON.stringify(jobs),
    },
  });
}

test('Pages recovery workflow is narrowly triggered and bounded', () => {
  assert.deepEqual(workflow.on.workflow_run.types, ['completed']);
  assert.deepEqual(workflow.on.workflow_run.workflows, ['Deploy learning site to GitHub Pages']);
  assert.equal(workflow.permissions.actions, 'write');
  assert.match(retryJob.if, /head_repository\.full_name == github\.repository/);
  assert.match(retryJob.if, /head_branch == 'main'/);
  assert.match(retryScript, /attempt >= 3/);
});

test('retries only a failed deploy after a successful build', () => {
  const result = runRecovery();
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Retrying failed deployment/);
  assert.match(result.stdout, /POSTED/);
});

test('does not republish a stale main commit', () => {
  const result = runRecovery({ mainSha: 'newer' });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Skipping stale deployment/);
  assert.doesNotMatch(result.stdout, /POSTED/);
});

test('does not retry a build failure or an already successful deploy', () => {
  for (const params of [
    { buildConclusion: 'failure' },
    { deployConclusion: 'success' },
  ]) {
    const result = runRecovery(params);
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /Skipping non-Pages failure/);
    assert.doesNotMatch(result.stdout, /POSTED/);
  }
});

test('ignores out-of-date recovery events', () => {
  for (const params of [
    { eventAttempt: 1, attempt: 2 },
    { runConclusion: 'success' },
    { runStatus: 'in_progress' },
  ]) {
    const result = runRecovery(params);
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /has changed since the recovery event/);
    assert.doesNotMatch(result.stdout, /POSTED/);
  }
});

test('stops after the second automated retry', () => {
  const result = runRecovery({ attempt: 3 });
  assert.equal(result.status, 1, result.stderr);
  assert.match(result.stdout, /manual investigation required/);
  assert.doesNotMatch(result.stdout, /POSTED/);
});
