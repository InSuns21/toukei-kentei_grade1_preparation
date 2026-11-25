import assert from 'node:assert/strict';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {fileURLToPath} from 'node:url';
import fc from 'fast-check';

const roles = ['viewer','editor'] as const;
const actions = ['read','write'] as const;
const rules = ['R','W','S'] as const;
type Role = typeof roles[number];
type Action = typeof actions[number];
type Rule = typeof rules[number];
type Input = {role:Role, action:Action, blocked:boolean, policies:Rule[]};
const oracle = fileURLToPath(new URL('./.lake/build/bin/lvtAuthorizationOracle',import.meta.url));
const execute = promisify(execFile);

function product(x:Input, mutant = false): boolean {
  const ps = new Set(x.policies);
  const grant = (ps.has('R') && x.action === 'read') ||
    (ps.has('W') && x.role === 'editor' && x.action === 'write');
  const reject = ps.has('S') && x.blocked;
  return mutant ? grant : grant && !reject;
}

async function reference(x:Input): Promise<boolean> {
  const args = [x.role,x.action,x.blocked ? '1' : '0',...x.policies];
  const {stdout,stderr} = await execute(oracle,args,{encoding:'utf8',timeout:10000,maxBuffer:1048576});
  assert.equal(stderr,'');
  assert(stdout === '1\n' || stdout === '0\n', 'invalid oracle response');
  return stdout === '1\n';
}
async function compare(x:Input, mutant = false): Promise<boolean> {
  return await reference(x) === product(x,mutant);
}
let count = 0;
for (const role of roles) for (const action of actions) for (const blocked of [false,true]) {
  for (let mask=0;mask<8;mask++) {
    const policies = rules.filter((_,i) => (mask & (1<<i)) !== 0);
    assert(await compare({role,action,blocked,policies}));
    count++;
  }
}
assert.equal(count,64);
const witness:Input = {role:'editor',action:'write',blocked:true,policies:['W','S']};
assert.equal(await reference(witness),false);
assert.equal(product(witness,true),true);
assert(!(await compare(witness,true)));
for (const args of [['unknown','read','0'],['viewer','unknown','0'],['viewer','read','2'],['viewer','read','0','X'],['viewer']]) {
  await assert.rejects(() => execute(oracle,args),{code:2});
}
const arbitrary = fc.record({role:fc.constantFrom(...roles),action:fc.constantFrom(...actions),
  blocked:fc.boolean(),policies:fc.array(fc.constantFrom(...rules),{maxLength:12})});
const params = {seed:20261125,numRuns:100};
await fc.assert(fc.asyncProperty(arbitrary,x => compare(x)),params);
let harnessError:unknown;
const result = await fc.check(fc.asyncProperty(arbitrary,async x => {
  try {
    assert(await compare(x),'normal product differs');
    return await compare(x,true);
  } catch(e) { harnessError ??= e; throw e; }
}),{...params,examples:[[witness]]});
if (harnessError !== undefined) throw harnessError;
assert(result.failed && result.counterexample && result.counterexamplePath !== null);
const input = result.counterexample[0];
assert(await compare(input));
assert(!(await compare(input,true)));
console.log(JSON.stringify({seed:result.seed,path:result.counterexamplePath,input}));
console.log('LVT6-04: 64 finite comparisons and generated comparisons OK');
