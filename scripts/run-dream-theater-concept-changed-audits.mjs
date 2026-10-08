import { spawn } from 'node:child_process';
import { performance } from 'node:perf_hooks';

const tasks = [
  {
    label: 'concept dependency',
    args: ['scripts/validate-dream-theater-concepts-changed.mjs'],
  },
  {
    label: 'undefined terms / first-use',
    args: ['scripts/audit-dream-theater-undefined-terms-filtered.mjs', '--strict', '--changed-only'],
  },
  {
    label: 'formal order',
    args: ['scripts/audit-dream-theater-formal-order.mjs', '--strict', '--changed-only'],
  },
  {
    label: 'explicit dependencies',
    args: ['scripts/audit-dream-theater-explicit-dependencies.mjs', '--strict', '--changed-only'],
  },
  {
    label: 'implicit dependencies',
    args: ['scripts/audit-dream-theater-implicit-dependencies.mjs', '--strict', '--changed-only'],
  },
  {
    label: 'reader prose chapter prerequisites (review queue)',
    args: ['scripts/audit-dream-theater-prose-prerequisites.mjs', '--changed-only', '--strict'],
  },
];

const startedAt = performance.now();
const results = await Promise.all(tasks.map(runTask));

let failed = false;
for (const result of results) {
  console.log('');
  console.log(`=== ${result.label} (${result.elapsedSeconds.toFixed(2)}s) ===`);
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  if (result.code !== 0) {
    failed = true;
    console.error(`${result.label} failed with exit code ${result.code}`);
  }
}

const elapsedSeconds = (performance.now() - startedAt) / 1000;
console.log('');
console.log(`DREAM THEATER changed-only concept audits completed in ${elapsedSeconds.toFixed(2)}s (parallel wall time).`);

process.exit(failed ? 1 : 0);

function runTask(task) {
  return new Promise((resolve) => {
    const started = performance.now();
    const child = spawn(process.execPath, task.args, {
      env: process.env,
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    let stdout = '';
    let stderr = '';

    child.stdout.setEncoding('utf8');
    child.stderr.setEncoding('utf8');
    child.stdout.on('data', (chunk) => {
      stdout += chunk;
    });
    child.stderr.on('data', (chunk) => {
      stderr += chunk;
    });

    child.on('error', (error) => {
      stderr += `Failed to start ${task.label}: ${error.message}\n`;
      resolve({
        label: task.label,
        code: 1,
        stdout,
        stderr,
        elapsedSeconds: (performance.now() - started) / 1000,
      });
    });

    child.on('close', (code, signal) => {
      if (signal) stderr += `${task.label} terminated by signal ${signal}\n`;
      resolve({
        label: task.label,
        code: code ?? 1,
        stdout,
        stderr,
        elapsedSeconds: (performance.now() - started) / 1000,
      });
    });
  });
}
