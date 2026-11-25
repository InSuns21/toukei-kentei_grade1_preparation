import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const binary = fileURLToPath(new URL('../../LVT5-06/lab/.lake/build/bin/lvtStatefulOracle', import.meta.url));
const ops = ['add','remove','reset','stop'];
const fixed = [[], ['remove','reset'], ['add','add','add'], ['stop','add','remove','reset']];
const seed = 7;
function generated(initial) {
  let r = initial >>> 0;
  const next = n => {
    r = (Math.imul(1664525,r) + 1013904223) >>> 0;
    return (r >>> 16) % n;
  };
  return Array.from({length:32}, () => Array.from({length:next(9)}, () => ops[next(4)]));
}
function implementation(input, mutant) {
  let count = 0, stopped = 0;
  return input.map(op => {
    let ok = 0;
    if (!stopped) {
      if (op === 'add') {
        ok = [1,1,0][count]; count = [1,2,2][count];
      } else if (op === 'remove') {
        ok = [0,1,1][count]; count = [mutant ? 1 : 0,0,1][count];
      } else if (op === 'reset') {
        ok = 1; count = 0;
      } else if (op === 'stop') {
        ok = 1; stopped = 1;
      } else throw new Error('unknown operation');
    }
    return [ok,count,stopped].join(',');
  });
}
function compare(input, mutant) {
  if (!Array.isArray(input) || !input.every(op => ops.includes(op))) throw new Error('invalid input record');
  const p = spawnSync(binary,input,{encoding:'utf8',timeout:5000,maxBuffer:1024*1024});
  const diagnostic = {exitCode:p.status,signal:p.signal,stdout:p.stdout,stderr:p.stderr,error:p.error?.message ?? null};
  if (p.error || p.status !== 0) return {input,mutant,kind:'execution',diagnostic};
  const reference = p.stdout === '' ? [] : p.stdout.replace(/\r?\n$/,'').split(/\r?\n/);
  if (reference.length !== input.length || !reference.every(line => /^[01],[012],[01]$/.test(line))) {
    return {input,mutant,kind:'format',diagnostic};
  }
  const actual = implementation(input,mutant);
  const first = reference.findIndex((line,i) => line !== actual[i]);
  return {input,mutant,kind:first < 0 ? 'match' : 'mismatch',first:first < 0 ? null : first+1,reference,actual,diagnostic};
}
const [mode,file] = process.argv.slice(2);
if (!file || !['test','discover','replay'].includes(mode)) throw new Error('usage: node replay.mjs test|discover|replay FILE');
const commit = spawnSync('git',['rev-parse','HEAD'],{encoding:'utf8'});
const lean = spawnSync('lean',['--version'],{encoding:'utf8'});
const metadata = {
  commit:commit.status === 0 ? commit.stdout.trim() : null,
  lean:lean.status === 0 ? lean.stdout.trim() : null,
  node:process.version,platform:process.platform,arch:process.arch,
  seed,generator:'lcg32-high16-v1',generatorSource:createHash('sha256').update(readFileSync(fileURLToPath(import.meta.url))).digest('hex'),
  binary,binarySHA256:null
};
const report = {metadata,mode,records:[]};
try {
  metadata.binarySHA256 = createHash('sha256').update(readFileSync(binary)).digest('hex');
  if (mode === 'test') {
    for (const input of [...fixed,...generated(seed)]) report.records.push(compare(input,false));
    assert.ok(report.records.every(r => r.kind === 'match'),'normal comparison failed');
  } else if (mode === 'discover') {
    const record = compare(['remove','reset'],true);
    report.records.push(record);
    assert.equal(record.kind,'mismatch');
    assert.equal(record.first,1);
  } else {
    const saved = JSON.parse(readFileSync(file,'utf8'));
    assert.equal(saved.mode,'discover');
    assert.equal(saved.records.length,1);
    const old = saved.records[0];
    assert.equal(old.kind,'mismatch');
    assert.equal(old.mutant,true);
    if (saved.metadata.binarySHA256 !== metadata.binarySHA256) console.warn('oracle hash changed');
    const record = compare(old.input,old.mutant);
    report.records.push(record);
    for (const key of ['kind','first','reference','actual']) assert.deepEqual(record[key],old[key],key);
  }
  console.log(mode + ' OK');
} catch (e) {
  report.error = String(e);
  throw e;
} finally {
  writeFileSync(mode === 'replay' ? file+'.replay.json' : file,JSON.stringify(report,null,2)+'\n');
}
