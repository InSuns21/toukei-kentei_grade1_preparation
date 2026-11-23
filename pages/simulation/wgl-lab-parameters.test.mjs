import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {parametersFor, readLabParameter, writeLabParameter,verifiedFCG3Physics} from './wgl-lab-parameters.mjs';

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
    ['grid','shape','centerY','wallAmplitude','wallFrequency']);
  const changes=[64,'rectangle',0.55,0.12,2.2];
  let edited=source;
  for(let i=0;i<specs.length;i++){
    const spec=specs[i];
    assert.deepEqual(readLabParameter(source,spec),{ok:true,value:spec.default});
    edited=writeLabParameter(edited,spec,changes[i]);
    assert.deepEqual(readLabParameter(edited,spec),{ok:true,value:changes[i]});
  }
  assert.match(edited,/const N=64,h=1\/N/);
  assert.match(edited,/shape='rectangle',centerY=0.55/);
  assert.match(edited,/wallAmplitude=0.12,wallFrequency=2.2/);
  assert.match(edited,/shape==='rectangle'/);
  assert.match(edited,/wallAmplitude\*wallFrequency\*Math.cos/);
  assert.throws(()=>writeLabParameter(source,specs[0],16),RangeError);
  assert.throws(()=>writeLabParameter(source,specs[1],'triangle'),RangeError);
  assert.throws(()=>writeLabParameter(source,specs[2],0.95),RangeError);
  assert.throws(()=>writeLabParameter(source,specs[3],0.123),RangeError);
  const expression=source.replace("shape='circle'","shape=['circle'][0]");
  assert.equal(readLabParameter(expression,specs[1]).ok,false);
  const duplicate=source+"\nconst wallAmplitude=0.10,wallFrequency=1.8,acceleration=0.07;";
  assert.equal(readLabParameter(duplicate,specs[3]).ok,false);
  for(let i=specs.length-1;i>=0;i--)
    edited=writeLabParameter(edited,specs[i],specs[i].default);
  let normalizedSource=source;
  for(const spec of specs)
    normalizedSource=writeLabParameter(normalizedSource,spec,spec.default);
  assert.equal(edited,normalizedSource,'restored literals preserve the canonical physics code');
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


test('FCG3 G2 grid and radius changes can be independently rechecked only for known source literals',async()=>{
  const folder=new URL('FCG/FCG3/',base);
  const [js,vertex,fragment]=await Promise.all(['advection.js','advection.vert','advection.frag']
    .map(file=>readFile(new URL(file,folder),'utf8')));
  const specs=parametersFor('FCG3'),defaults={js,vertex,fragment};
  assert.deepEqual(specs.map(s=>s.id),['radius','grid']);
  assert.deepEqual(verifiedFCG3Physics(js,vertex,fragment,defaults),{radius:0.14,N:32});
  for(const N of [32,64,96]){
    const edited=writeLabParameter(writeLabParameter(js,specs[0],0.24),specs[1],N);
    assert.deepEqual(verifiedFCG3Physics(edited,vertex,fragment,defaults),{radius:0.24,N});
    assert.deepEqual(readLabParameter(edited,specs[1]),{ok:true,value:N});
    assert.equal(writeLabParameter(writeLabParameter(edited,specs[1],32),specs[0],0.14),js);
  }
  assert.throws(()=>writeLabParameter(js,specs[1],48),RangeError);
  const expression=js.replace('const N=32,','const N=16*2,');
  assert.equal(readLabParameter(expression,specs[1]).ok,false);
  assert.equal(verifiedFCG3Physics(expression,vertex,fragment,defaults),null);
  assert.equal(verifiedFCG3Physics(js.replace('steps=settings.steps','steps=0'),vertex,fragment,defaults),null);
  assert.equal(verifiedFCG3Physics(js,vertex,fragment.replace('5.0*abs','10.0*abs'),defaults),null);
});

test('WGL20 G2 source sliders edit the same terrain.js that builds and lights the city',async()=>{
 const source=await readFile(new URL('WGL/WGL20/terrain.js',base),'utf8');
 const specs=parametersFor('WGL20');
 assert.deepEqual(specs.map(s=>s.id),
   ['water-level','z-exaggeration','view-azimuth','view-elevation','sun-azimuth']);
 const values=[30,2,70,62,275];
 const expected=['clipWet','u_zScale','cameraAzimuthDeg','cameraElevationDeg','sunAzimuthDeg'];
 for(const [i,spec] of specs.entries()){
   assert.equal(spec.sourceFile,'js');
   assert.equal(spec.index,null);
   assert.equal(readLabParameter(source,spec).value,spec.default);
   assert.ok(source.includes(expected[i]),'renderer reads '+spec.id);
   const modified=writeLabParameter(source,spec,values[i]);
   assert.notEqual(modified,source);
   assert.deepEqual(readLabParameter(modified,spec),{ok:true,value:values[i]});
   assert.throws(()=>writeLabParameter(source,spec,spec.max+spec.step),RangeError);
   assert.throws(()=>writeLabParameter(source,spec,spec.min+spec.step/2),RangeError);
   const broken=source.replace('const '+(i===0?'waterLevelM':i===1?'zExaggeration':i===2?'cameraAzimuthDeg':i===3?'cameraElevationDeg':'sunAzimuthDeg')+'=',
                              'const '+(i===0?'waterLevelM':i===1?'zExaggeration':i===2?'cameraAzimuthDeg':i===3?'cameraElevationDeg':'sunAzimuthDeg')+'=(1+');
   assert.equal(readLabParameter(broken,spec).ok,false,'nonliteral input never overwritten');
 }
});
