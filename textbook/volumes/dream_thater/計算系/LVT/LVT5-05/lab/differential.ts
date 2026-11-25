import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import fc from 'fast-check';

type Order = { id: string; stock: number; qty: number };
type Answer = { id: string; status: 'rejected' } |
  { id: string; status: 'ok'; rest: number };
type Pair = [Order, Order];
const MAX = Number.MAX_SAFE_INTEGER;
const oracle = fileURLToPath(new URL('../../LVT5-02/lab/.lake/build/bin/lvtOracle', import.meta.url));
const comparator = fileURLToPath(new URL('./compare.py', import.meta.url));

function run(file: string, args: string[], input: Buffer): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const child = execFile(file, args, { encoding: 'buffer', timeout: 10000, maxBuffer: 1024 * 1024 },
      (error, stdout, stderr) => {
        if (error) reject(error);
        else if (stderr.length) reject(new Error('unexpected stderr: ' + stderr.toString()));
        else resolve(stdout);
      });
    child.stdin!.on('error', reject);
    child.stdin!.end(input);
  });
}
function encode(x: unknown): Buffer { return Buffer.from(JSON.stringify(x) + '\n'); }
function tsAnswer(x: Order): Answer {
  if (typeof x.id !== 'string' || !Number.isSafeInteger(x.stock) ||
      !Number.isSafeInteger(x.qty) || x.stock < 0 || x.qty < 0)
    throw new Error('outside business domain');
  const rest = x.stock - x.qty;
  return x.qty === 0 || rest < 0 ? { id: x.id, status: 'rejected' } :
    { id: x.id, status: 'ok', rest };
}
async function leanAnswer(x: Order): Promise<Buffer> {
  const out = await run(oracle, ['--batch'], encode(x));
  assert(out.length > 1 && out[out.length - 1] === 10 &&
    out.indexOf(10) === out.length - 1, 'expected one terminated response');
  return out;
}
async function equal(a: Buffer, b: Buffer): Promise<boolean> {
  const result = (await run('python3', [comparator], Buffer.concat([a,b]))).toString();
  assert(result === 'equal\n' || result === 'different\n', 'invalid comparison result');
  return result === 'equal\n';
}
async function agreement(xs: Pair, swap = false): Promise<boolean> {
  const expected = await Promise.all(xs.map(leanAnswer));
  const actual = xs.map(x => encode(tsAnswer(x)));
  if (swap) actual.reverse();
  // Validate both comparisons even if the first differs.
  const comparisons = await Promise.all(expected.map((a,i) => equal(a, actual[i])));
  return comparisons.every(Boolean);
}
const integer = fc.integer({ min: 0, max: MAX });
const id = fc.array(fc.constantFrom('a','b','日','😀','\n','"'), { maxLength: 8 }).map(a => a.join(''));
const orders = fc.oneof(
  fc.record({ id, stock: integer, qty: integer }),
  fc.record({ id, stock: fc.integer({ min: 1, max: MAX }) }).map(x => ({ ...x, qty: x.stock })),
  fc.record({ id, stock: integer }).map(x => ({ ...x, qty: 0 })),
  fc.record({ id, stock: fc.integer({ min: 0, max: MAX - 1 }) }).map(x => ({ ...x, qty: x.stock + 1 }))
);
const pairs = fc.tuple(orders, orders, id).map(([a,b,t]): Pair =>
  [{ ...a, id: t + 'a' }, { ...b, id: t + 'b' }]);
const parameters = { seed: 20261125, numRuns: 40 };
const fixed: Pair[] = [
  [{id:'日\n',stock:1,qty:1},{id:'😀',stock:2,qty:3}],
  [{id:'"',stock:MAX,qty:1},{id:'',stock:MAX,qty:MAX}],
  [{id:'same',stock:0,qty:0},{id:'same',stock:1,qty:0}]
];

async function asyncWitness() {
  let release!: () => void;
  const gate = new Promise<void>(resolve => { release = resolve; });
  let observed = false;
  const pending = gate.then(() => { observed = true; return false; });
  const premature = async () => { void pending; return true; };
  assert.equal(await premature(), true);
  assert.equal(observed, false);
  release();
  assert.equal(await pending, false);
  assert.equal(observed, true);
}
async function test() {
  assert.deepEqual(tsAnswer({id:'a',stock:MAX,qty:2}), {id:'a',status:'ok',rest:MAX-2});
  for (const xs of fixed) assert(await agreement(xs));
  assert.equal(await agreement(fixed[0],true), false);
  assert.equal(await agreement(fixed[2],true), true);
  await assert.rejects(() => equal(Buffer.from('{"status":"ok","id":"a","rest":0,"rest":1}\n'), encode({id:'a',status:'ok',rest:1})));
  await assert.rejects(() => equal(Buffer.from('{"status":"ok","id":"a","rest":1.0}\n'), encode({id:'a',status:'ok',rest:1})));
  await asyncWitness();
  await fc.assert(fc.asyncProperty(pairs, xs => agreement(xs)), parameters);
  console.log('LVT5-05: normal asynchronous comparisons OK');
}
async function discover(path: string) {
  let harnessError: unknown;
  const result = await fc.check(fc.asyncProperty(pairs, async xs => {
    try {
      // A real failure must occur only for the swapped implementation.
      if (!await agreement(xs)) throw new Error('normal comparison failed');
      return await agreement(xs,true);
    } catch (error) { harnessError ??= error; throw error; }
  }), parameters);
  if (harnessError !== undefined) throw harnessError;
  assert(result.failed && result.counterexample && result.counterexamplePath !== null);
  const input = result.counterexample[0];
  assert(await agreement(input));
  assert.equal(await agreement(input,true), false);
  const record = { seed: result.seed, path: result.counterexamplePath, input };
  await writeFile(path, JSON.stringify(record,null,2)+'\n');
  console.log(record);
}
async function replay(path: string) {
  const record = JSON.parse(await readFile(path,'utf8'));
  assert(Array.isArray(record.input) && record.input.length === 2);
  const input: Pair = record.input;
  assert(await agreement(input));
  assert.equal(await agreement(input,true), false);
  console.log('saved counterexample reproduced', record);
}
const [action,path] = process.argv.slice(2);
if (action === 'test') await test();
else if (action === 'discover' && path) await discover(path);
else if (action === 'replay' && path) await replay(path);
else throw new Error('usage: differential.ts test | discover PATH | replay PATH');
