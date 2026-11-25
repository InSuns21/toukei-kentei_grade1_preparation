import assert from 'node:assert/strict';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {fileURLToPath} from 'node:url';
import fc from 'fast-check';

const actions = ['submit','approve','publish','return'] as const;
type Action = typeof actions[number];
type Phase = 'draft'|'submitted'|'approved'|'published';
const table: Record<Phase, Partial<Record<Action,Phase>>> = {
  draft: {submit:'submitted'},
  submitted: {approve:'approved', return:'draft'},
  approved: {publish:'published', return:'draft'},
  published: {}
};
function valid(w: unknown): asserts w is Action[] {
  assert(Array.isArray(w) && w.every(a => actions.includes(a)), 'invalid action list');
}
function product(w: Action[], mutant = false): string[] {
  valid(w);
  let phase: Phase = 'draft', reviewed = false;
  return w.map(a => {
    const next: Phase|undefined = mutant && phase === 'submitted' && a === 'publish'
      ? 'published' : table[phase][a];
    if (next !== undefined) {
      phase = next;
      if (a === 'approve') reviewed = true;
      else if (a === 'submit' || a === 'return') reviewed = false;
    }
    return Number(next !== undefined)+','+phase+','+Number(reviewed);
  });
}
const oracle = fileURLToPath(new URL('./.lake/build/bin/lvtWorkflowOracle',import.meta.url));
const execute = promisify(execFile);
async function reference(w: Action[]): Promise<string[]> {
  valid(w);
  const {stdout,stderr} = await execute(oracle,w,{encoding:'utf8',timeout:10000,maxBuffer:1048576});
  assert.equal(stderr,'');
  if (!w.length) { assert.equal(stdout,''); return []; }
  assert(stdout.endsWith('\n'));
  const lines = stdout.slice(0,-1).split('\n');
  assert.equal(lines.length,w.length);
  assert(lines.every(s => /^[01],(draft|submitted|approved|published),[01]$/.test(s)));
  return lines;
}
async function compare(w: Action[], mutant = false): Promise<boolean> {
  const expected = await reference(w);
  const actual = product(w,mutant);
  assert.equal(actual.length,expected.length);
  return expected.every((row,i) => row === actual[i]);
}
const witness: Action[] = ['submit','publish'];
const fixed: Action[][] = [[],witness,['publish','approve'],['submit','approve','publish',...actions],
  ['submit','approve','return','submit','publish'],['submit','return','approve']];
for (const w of fixed) assert(await compare(w));
assert.deepEqual(await reference(witness),['1,submitted,0','0,submitted,0']);
assert.deepEqual(product(witness,true),['1,submitted,0','1,published,0']);
assert(!(await compare(witness,true)));
await assert.rejects(() => execute(oracle,['unknown']),{code:2});
const arbitrary = fc.array(fc.constantFrom(...actions),{maxLength:24});
const params = {seed:20261125,numRuns:100};
await fc.assert(fc.asyncProperty(arbitrary,w => compare(w)),params);
let harnessError: unknown;
const result = await fc.check(fc.asyncProperty(arbitrary,async w => {
  try {
    assert(await compare(w),'normal product differs');
    return await compare(w,true);
  } catch(e) { harnessError ??= e; throw e; }
}),{...params,examples:[[witness]]});
if (harnessError !== undefined) throw harnessError;
assert(result.failed && result.counterexample && result.counterexamplePath !== null);
const input = result.counterexample[0];
assert(await compare(input));
assert(!(await compare(input,true)));
console.log(JSON.stringify({seed:result.seed,path:result.counterexamplePath,input}));
console.log('LVT6-03 workflow comparisons OK');
