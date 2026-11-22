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
test('WGL19 G2 clock/rate controls edit only their corresponding runtime values', async () => {
  const source = await readFile(new URL('WGL/WGL19/audit.js', base), 'utf8');
  const specs = parametersFor('WGL19');
  assert.deepEqual(specs.map(s => s.id), ['rate','fixed-ms','max-steps-per-frame']);
  const changes = [0.1,40,1];
  let edited = source;
  for (let i=0;i<specs.length;i++) {
    const spec=specs[i];
    assert.equal(spec.sourceFile,'js');
    assert.deepEqual(readLabParameter(source,spec),{ok:true,value:spec.default});
    edited=writeLabParameter(edited,spec,changes[i]);
    assert.deepEqual(readLabParameter(edited,spec),{ok:true,value:changes[i]});
    assert.throws(()=>writeLabParameter(source,spec,spec.max+spec.step),RangeError);
    assert.throws(()=>writeLabParameter(source,spec,spec.min+spec.step/2),RangeError);
  }
  assert.match(edited,/const rate=0\.1;/);
  assert.match(edited,/const fixedMs=40;/);
  assert.match(edited,/const maxStepsPerFrame=1;/);
  assert.match(edited,/gl\.uniform1f\(uniforms\.rate,rate\)/);
  assert.match(edited,/while\(accumulator\+1e-9>=fixedMs && thisFrame<maxStepsPerFrame\)/);
  for(let i=specs.length-1;i>=0;i--)
    edited=writeLabParameter(edited,specs[i],specs[i].default);
  assert.equal(edited,source);
  const expression=source.replace('const fixedMs=20;','const fixedMs=10+10;');
  assert.equal(readLabParameter(expression,specs[1]).ok,false);
  assert.throws(()=>writeLabParameter(expression,specs[1],40),/JSソース/);
  assert.equal(readLabParameter(source+'\nconst fixedMs=30;',specs[1]).ok,false);
});

test('FCG6 shape and moving wall controls rewrite only the executed solid.js literals', async () => {
  const source=await readFile(new URL('FCG/FCG6/solid.js',base),'utf8');
  const specs=parametersFor('FCG6');
  assert.deepEqual(specs.map(spec=>spec.id),
    ['shape','centerY','wallAmplitude','wallFrequency']);
  const changes=['rectangle',0.55,0.12,2.2];
  let edited=source;
  for(let i=0;i<specs.length;i++){
    const spec=specs[i];
    assert.deepEqual(readLabParameter(source,spec),{ok:true,value:spec.default});
    edited=writeLabParameter(edited,spec,changes[i]);
    assert.deepEqual(readLabParameter(edited,spec),{ok:true,value:changes[i]});
  }
  assert.match(edited,/shape='rectangle',centerY=0.55/);
  assert.match(edited,/wallAmplitude=0.12,wallFrequency=2.2/);
  assert.match(edited,/shape==='rectangle'/);
  assert.match(edited,/wallAmplitude\*wallFrequency\*Math.cos/);
  assert.throws(()=>writeLabParameter(source,specs[0],'triangle'),RangeError);
  assert.throws(()=>writeLabParameter(source,specs[1],0.95),RangeError);
  assert.throws(()=>writeLabParameter(source,specs[2],0.123),RangeError);
  const expression=source.replace("shape='circle'","shape=['circle'][0]");
  assert.equal(readLabParameter(expression,specs[0]).ok,false);
  const duplicate=source+"\nconst wallAmplitude=0.10,wallFrequency=1.8,acceleration=0.07;";
  assert.equal(readLabParameter(duplicate,specs[2]).ok,false);
  for(let i=specs.length-1;i>=0;i--)
    edited=writeLabParameter(edited,specs[i],specs[i].default);
  assert.equal(edited,source,'all controls restore the canonical JS exactly');
});

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
