import test from "node:test";
import assert from "node:assert/strict";
import { validateConfig, initial, next, objective, run, safety } from "./ml1-09-gradient-core.mjs";

const base = { m: 1, L: 4, alpha: 0.25, x0: 2, y0: 2 };

test("解析解どおりの軌道を生成する", () => {
  const points = run(base, 2);
  assert.deepEqual(points.map(p => p.k), [0, 1, 2]);
  assert.equal(points[0].f, 10);
  assert.equal(points[1].x, 1.5);
  assert.equal(points[1].y, 0);
  assert.equal(points[1].f, 1.125);
  assert.equal(points[2].x, 1.125);
  assert.equal(points[2].y, 0);
  assert.equal(points[2].f, 0.6328125);
});

test("alpha=2/L では最大固有値方向の損失が一定", () => {
  const p = { ...base, x0: 0, alpha: 0.5 };
  const path = run(p, 4);
  assert.deepEqual(path.map(s => s.y), [2, -2, 2, -2, 2]);
  assert.ok(path.every(s => s.f === 8));
  assert.match(safety(p), /境界/);
});

test("alpha>2/L は二次損失の発散例を再現する", () => {
  const p = { ...base, x0: 0, alpha: 0.6 };
  const path = run(p, 4);
  assert.equal(path[0].f, 8);
  assert.ok(path.every((v,i) => i === 0 || v.f > path[i-1].f));
  assert.match(safety(p), /安全域外/);
});

test("初期値・固有値・歩幅の変更で演算結果が変わる", () => {
  assert.notEqual(run({ ...base, x0: 1 }, 1)[1].f, run(base, 1)[1].f);
  assert.notEqual(run({ ...base, m: 2 }, 1)[1].f, run(base, 1)[1].f);
  assert.notEqual(run({ ...base, alpha: 0.1 }, 1)[1].f, run(base, 1)[1].f);
});

test("パラメータ範囲、上限、非有限の結果を検出する", () => {
  assert.throws(() => validateConfig({ ...base, m: 5 }), RangeError);
  assert.throws(() => validateConfig({ ...base, alpha: NaN }), RangeError);
  assert.throws(() => run(base, 201), RangeError);
  assert.equal(next(base, initial(base)).k, 1);
  assert.equal(objective(1, 1, 1, 4), 2.5);
});
