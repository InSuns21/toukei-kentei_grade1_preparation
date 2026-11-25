import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import fc from 'fast-check';

const ops = ['add','remove','reset','stop'] as const;
type Op = typeof ops[number];
type Observation = string;
const oracle = fileURLToPath(new URL('./.lake/build/bin/lvtStatefulOracle', import.meta.url));
const execute = promisify(execFile);

function valid(w: unknown): asserts w is Op[] {
  assert(Array.isArray(w) && w.every(a => ops.includes(a)), 'invalid operation list');
}
function product(w: Op[], mutant = false): Observation[] {
  valid(w);
  let c = 0, halted = false;
  return w.map(a => {
    let accepted = false;
    if (!halted) {
      if (a === 'stop') { halted = true; accepted = true; }
      else if (a === 'reset') { c = 0; accepted = true; }
      else {
        const next = (a === 'add' ? [1,2,null] : [null,0,1])[c];
        if (next !== null) { c = next; accepted = true; }
        else if (mutant && a === 'remove') c = 1;
      }
    }
    return Number(accepted) + ',' + c + ',' + Number(halted);
  });
}
async function reference(w: Op[]): Promise<Observation[]> {
  valid(w);
  const {stdout, stderr} = await execute(oracle, w, {encoding:'utf8',timeout:10000,maxBuffer:1048576});
  assert.equal(stderr,'');
  if (!w.length) { assert.equal(stdout,''); return []; }
  assert(stdout.endsWith('\n'), 'missing line terminator');
  const lines = stdout.slice(0,-1).split('\n');
  assert.equal(lines.length,w.length);
  assert(lines.every(s => /^[01],[012],[01]$/.test(s)), 'malformed observation');
  return lines;
}
function firstDifference(a: Observation[], b: Observation[]): number {
  assert.equal(a.length,b.length);
  return a.findIndex((x,i) => x !== b[i]);
}
async function compare(w: Op[], mutant = false): Promise<number> {
  return firstDifference(await reference(w), product(w,mutant));
}
const arbitrary = fc.array(fc.constantFrom(...ops),{maxLength:24});
const parameters = {seed:20261125,numRuns:100};
async function test() {
  const fixed: Op[][] = [[],['add','add','add'],['remove','reset'],['add','stop',...ops],
    ['add','remove','remove'],['add','add','remove','reset','stop']];
  for (const w of fixed) assert.equal(await compare(w),-1);
  assert.deepEqual(await reference(['remove','reset']),['0,0,0','1,0,0']);
  assert.deepEqual(product(['remove','reset'],true),['0,1,0','1,0,0']);
  assert.equal(await compare(['remove','reset'],true),0);
  await assert.rejects(() => execute(oracle,['unknown']));
  await fc.assert(fc.asyncProperty(arbitrary,async w => await compare(w) === -1),parameters);
  console.log('LVT5-06: stateful comparisons OK');
}
async function discover(path: string) {
  let harnessError: unknown;
  const result = await fc.check(fc.asyncProperty(arbitrary,async w => {
    try {
      assert.equal(await compare(w),-1,'normal comparison failed');
      return await compare(w,true) === -1;
    } catch (e) { harnessError ??= e; throw e; }
  }),{...parameters,examples:[[['remove','reset']]]});
  if (harnessError !== undefined) throw harnessError;
  assert(result.failed && result.counterexample && result.counterexamplePath !== null);
  const input = result.counterexample[0];
  assert.equal(await compare(input),-1);
  const first = await compare(input,true);
  assert(first >= 0);
  const prefix = input.slice(0,first+1);
  assert.equal(await compare(prefix,true),first);
  const record = {seed:result.seed,path:result.counterexamplePath,input,firstDifference:first+1,prefix};
  await writeFile(path,JSON.stringify(record,null,2)+'\n');
  console.log(record);
}
async function replay(path: string) {
  const record = JSON.parse(await readFile(path,'utf8'));
  valid(record.input);
  assert.equal(await compare(record.input),-1);
  const first = await compare(record.input,true);
  assert(first >= 0);
  assert.equal(first+1,record.firstDifference);
  assert.equal(await compare(record.input.slice(0,first+1),true),first);
  console.log('saved counterexample reproduced',record);
}
const [action,path] = process.argv.slice(2);
if (action === 'test') await test();
else if (action === 'discover' && path) await discover(path);
else if (action === 'replay' && path) await replay(path);
else throw new Error('usage: differential.ts test | discover PATH | replay PATH');
