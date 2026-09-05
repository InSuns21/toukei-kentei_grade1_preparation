import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { spawnSync } from 'node:child_process';

const dir = path.join(process.cwd(), 'scripts', '.syllabus-batch1');
const chunks = fs.readdirSync(dir)
  .filter((name) => /^gz\d+\.b64$/.test(name))
  .sort();

if (!chunks.length) throw new Error('No gzip payload chunks found.');

const b64 = chunks.map((name) => fs.readFileSync(path.join(dir, name), 'utf8').trim()).join('');
const source = zlib.gunzipSync(Buffer.from(b64, 'base64')).toString('utf8');
const generated = path.join(dir, 'apply.generated.mjs');
fs.writeFileSync(generated, source, 'utf8');

const result = spawnSync(process.execPath, [generated], {
  cwd: process.cwd(),
  stdio: 'inherit',
});
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);
