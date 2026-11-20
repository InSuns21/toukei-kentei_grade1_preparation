import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {parametersFor, readLabParameter, writeLabParameter} from './wgl-lab-parameters.mjs';

const base = new URL('../../textbook/volumes/dream_thater/計算系/', import.meta.url);
const cases = [
  ['WGL18', 'WGL/WGL18/diffusion.js', 0.2, 0.1, 'gl.uniform1f(uRate,rate)'],
  ['WGL12', 'WGL/WGL12/pbr.js', 0.55, 0.8, 'gl.uniform1fv(rough, new Float32Array(roughness))'],
  ['FCG3', 'FCG/FCG3/advection.js', 0.14, 0.24, 'return z<1?']
];
for (const [lesson, path, initial, altered, consumer] of cases) {
  test(lesson + ' G2 slider modifies the actual learner JS consumed by the renderer', async () => {
    const source = await readFile(new URL(path, base), 'utf8');
    const [spec] = parametersFor(lesson);
    assert.ok(source.includes(consumer), lesson + ' actual renderer linkage');
    assert.equal(spec.sourceFile, 'js');
    assert.equal(spec.default, initial);
    assert.deepEqual(readLabParameter(source, spec), {ok: true, value: initial});
    const modified = writeLabParameter(source, spec, altered);
    assert.notEqual(modified, source);
    assert.deepEqual(readLabParameter(modified, spec), {ok: true, value: altered});
    assert.equal(writeLabParameter(modified, spec, initial), source);
    assert.throws(() => writeLabParameter(source, spec, spec.max + spec.step), RangeError);
    assert.throws(() => writeLabParameter(source, spec, spec.min + spec.step / 2), RangeError);
  });
}
test('WGL12 array edit retains the two other sphere materials and edited GLSL', async () => {
  const source = await readFile(new URL('WGL/WGL12/pbr.js', base), 'utf8');
  const spec = parametersFor('WGL12')[0];
  const modified = writeLabParameter(source, spec, .8);
  assert.ok(modified.includes('const roughness = [0.16, 0.8, 0.32];'));
  assert.ok(modified.includes('const metallic = [0.0, 0.0, 1.0];'));
  assert.deepEqual(readLabParameter(modified.replace('[0.16, 0.8, 0.32]', '[0.16, 1/2, 0.32]'), spec).ok, false);
});
test('expression/duplicate declaration cannot be silently overwritten', async () => {
  const source = await readFile(new URL('WGL/WGL18/diffusion.js', base), 'utf8');
  const spec = parametersFor('WGL18')[0];
  const expression = source.replace('const rate = 0.2;', 'const rate = 1/5;');
  assert.equal(readLabParameter(expression, spec).ok, false);
  assert.throws(() => writeLabParameter(expression, spec, 0.1), /JSソース/);
  assert.equal(readLabParameter(source + '\nconst rate = 0.2;', spec).ok, false);
  assert.throws(() => writeLabParameter(source + '\nconst rate = 0.2;', spec, 0.1));
});
test('G2 host mounts within the conditions tab, while execution remains opaque sandbox', async () => {
  const [html, host] = await Promise.all([
    readFile(new URL('./wgl-lab.html', import.meta.url), 'utf8'),
    readFile(new URL('./wgl-lab-host.mjs', import.meta.url), 'utf8')
  ]);
  assert.ok(html.includes('id="lab-parameters"'));
  assert.ok(html.indexOf('id="panel-conditions"') < html.indexOf('id="lab-parameters"'));
  assert.ok(html.indexOf('id="lab-parameters"') < html.indexOf('id="panel-code"'));
  assert.match(host, /mountLabParameters\(lesson/);
  assert.match(host, /inputs\.js\.addEventListener\('input', refreshParameterControls\)/);
  assert.match(host, /iframe\.setAttribute\('sandbox', 'allow-scripts'\)/);
  assert.match(host, /setSources\(defaults\)/);
  assert.match(host, /localStorage\.setItem\(STORAGE_KEY/);
  assert.deepEqual(parametersFor('WGL1'), []);
});
