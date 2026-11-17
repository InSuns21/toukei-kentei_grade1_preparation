import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {BASE_COLOR,schlickScalar,ggxDistribution,expectedWGL12Samples,
  compareWGL12Readback} from './wgl12-lab-core.mjs';

test('WGL12 Schlick Fresnel endpoints, limits and metallic probes', () => {
  assert.equal(schlickScalar(1,0.04),0.04);
  assert.ok(Math.abs(schlickScalar(0.5,0.04)-0.07)<1e-14);
  assert.ok(Math.abs(schlickScalar(0.5,0.8)-0.80625)<1e-14);
  assert.equal(schlickScalar(0,0.8),1);
  for(const f0 of [0,0.04,0.8,1]) {
    let prev = 1;
    for(let i=0;i<=100;i++) {
      const f=schlickScalar(i/100,f0);
      assert.ok(f<=prev+1e-12 && f>=f0-1e-12 && f<=1+1e-12);
      prev=f;
    }
  }
  assert.throws(()=>schlickScalar(-0.1,0.04),RangeError);
  assert.throws(()=>schlickScalar(0.3,1.1),RangeError);
});

test('WGL12 GGX peak, projected-normal normalization and r=0 exclusion', () => {
  assert.ok(Math.abs(ggxDistribution(1,0.5)-16/Math.PI)<1e-12);
  assert.ok(Math.abs(ggxDistribution(0,0.5)-1/(16*Math.PI))<1e-12);
  for(const roughness of [0.08,0.25,0.5,0.8,1]) {
    // Midpoint rule: use fine quadrature except near r=.08 sharp peak.
    const steps=roughness<0.1?600000:60000;
    let integral=0;
    for(let k=0;k<steps;k++) {
      const mu=(k+0.5)/steps;
      integral+=2*Math.PI*ggxDistribution(mu,roughness)*mu/steps;
    }
    assert.ok(Math.abs(integral-1)<0.002,'GGX normalization '+roughness+': '+integral);
  }
  assert.throws(()=>ggxDistribution(1,0),RangeError);
});

test('WGL12 independent CPU probe RGB samples and tolerant GPU readback', () => {
  assert.deepEqual(BASE_COLOR,[0.8,0.3,0.1]);
  for(const [width,height] of [[320,240],[640,360],[64,64],[1024,512]]) {
    const rows=expectedWGL12Samples(width,height);
    assert.deepEqual(rows.map(x=>[x.x,x.y]),[[0,0],[1,0],[2,0],[3,0]]);
    assert.deepEqual(rows.map(x=>x.rgba[0]),[10,18,204,206]);
    assert.deepEqual(rows.map(x=>x.rgba[3]),[255,255,255,255]);
    const gpu=rows.map(x=>({x:x.x,y:x.y,rgba:[...x.rgba]}));
    assert.ok(compareWGL12Readback(gpu,width,height).every(x=>x.pass));
    gpu[0].rgba[0]+=2;
    assert.equal(compareWGL12Readback(gpu,width,height)[0].pass,true);
    gpu[0].rgba[0]+=1;
    assert.equal(compareWGL12Readback(gpu,width,height)[0].pass,false);
    assert.equal(compareWGL12Readback(gpu.slice(1),width,height)[0].pass,false);
  }
  assert.throws(()=>expectedWGL12Samples(0,240),RangeError);
  assert.throws(()=>expectedWGL12Samples(1024,1024),RangeError);
});

test('WGL12 lab source matches BRDF formulas, 4 probe pass and registered host', async () => {
  const dir=new URL('../../textbook/volumes/dream_thater/計算系/WGL/WGL12/',import.meta.url);
  const [js,vert,frag,md,host] = await Promise.all([
    ...['pbr.js','pbr.vert','pbr.frag','index.md'].map(f=>readFile(new URL(f,dir),'utf8')),
    readFile(new URL('wgl-lab-host.mjs',import.meta.url),'utf8')
  ]);
  assert.ok(vert.startsWith('#version 300 es'));
  assert.ok(frag.startsWith('#version 300 es'));
  for(const marker of ['gl.readPixels(0, 0, 4, 1','gl.viewport(0, 0, 4, 1)',
    "uniform('u_probe')",'roughness = [0.16, 0.55, 0.32]',
    'metallic = [0.0, 0.0, 1.0]', 'gl.disable(gl.DITHER)']) {
    assert.ok(js.includes(marker),marker);
  }
  assert.match(frag,/float alpha = rough \* rough;/);
  assert.match(frag,/float d = ggxD\(noh, alpha\);/);
  assert.match(frag,/vec3 specular = \(d \* g\) \* f/);
  assert.match(frag,/outColor = vec4\(fresnelSchlick\(voh, f0\), 1\.0\);/);
  assert.match(host,/const isWGL12 = lesson === 'WGL12'/);
  assert.match(host,/expectedWGL12Samples/);
  assert.match(host,/compareWGL12Readback/);
  assert.match(host,/iframe\.setAttribute\('sandbox', 'allow-scripts'\)/);
  assert.match(md,/lesson=WGL12/);
  assert.equal((md.match(/- Level: A/g)||[]).length,5);
  assert.equal((md.match(/- Level: B/g)||[]).length,4);
  assert.equal((md.match(/- Level: C/g)||[]).length,1);
  assert.equal((md.match(/<!-- solution-start -->/g)||[]).length,10);
  assert.equal((md.match(/<!-- solution-end -->/g)||[]).length,10);
});
