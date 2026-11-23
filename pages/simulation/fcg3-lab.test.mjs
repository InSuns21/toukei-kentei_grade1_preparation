import './fcg3-grid-resolution.test.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {FCG3_N,FCG3_DT,FCG3_OMEGA,fcg3Initial,fcg3Exact,fcg3Bilinear,
  fcg3Grid,fcg3Metrics,fcg3PixelCell,expectedFCG3Samples,compareFCG3Readback}
  from './fcg3-lab-core.mjs';

test('FCG3 continuous rotation returns to initial position and CFL exceeds one',()=>{
  assert.equal(FCG3_N,32);
  assert.equal(FCG3_DT,1/32);
  assert.ok(Math.abs(FCG3_OMEGA*FCG3_DT*32-2*Math.PI)<1e-12);
  assert.ok(Math.abs(fcg3Exact(0.7,0.5,32)-fcg3Initial(0.7,0.5))<1e-12);
  assert.ok(Math.abs(fcg3Exact(0.5,0.7,8)-fcg3Initial(0.7,0.5))<1e-12);
  assert.ok(0.4*Math.PI>1);
  assert.equal(fcg3Initial(0.5,0.5),0);
});

test('FCG3 bilinear weights, zero exterior and constant preservation',()=>{
  const q=new Float64Array(32*32).fill(1);
  assert.ok(Math.abs(fcg3Bilinear(q,0.5,0.5)-1)<1e-12);
  assert.equal(fcg3Bilinear(q,-1,-1),0);
  assert.ok(Math.abs(fcg3Bilinear(q,0,0)-0.25)<1e-12);
  const values=new Float64Array(32*32);
  const i=5,j=7;values[i+32*j]=1;
  // Relative cell-center coordinate a=1/4, b=1/2.
  assert.ok(Math.abs(fcg3Bilinear(values,(i+0.75)/32,(j+1)/32)-3/8)<1e-12);
});

test('FCG3 32-step real numerical advection preserves range but not total mass',()=>{
  const zero=fcg3Grid(0),last=fcg3Grid(32);
  const m0=fcg3Metrics(0),m32=fcg3Metrics(32);
  assert.equal(zero.length,1024);
  assert.equal(last.length,1024);
  assert.ok(last.every(x=>Number.isFinite(x)&&x>=0&&x<=1));
  assert.ok(Math.abs(m0.mass-0.02053533328145507)<1e-11);
  assert.ok(Math.abs(m32.mass-0.020673011094032332)<1e-11);
  assert.ok(Math.abs(m32.l1-0.01668012084007966)<1e-11);
  assert.ok(m32.peak<m0.peak);
  assert.ok(m32.l1>0.01);
  assert.ok(m32.mass>m0.mass);
  for(let n=0;n<=32;n+=4){
    const grid=fcg3Grid(n),m=fcg3Metrics(n);
    assert.ok(grid.every(x=>x>=0&&x<=1&&Number.isFinite(x)), 'step '+n);
    assert.ok(m.l1>=0&&m.max>=0&&Number.isFinite(m.mass));
  }
  assert.throws(()=>fcg3Grid(33),RangeError);
});

test('FCG3 independent 6-pixel GPU R8 baselines and viewports',()=>{
  for(const [w,h] of [[320,240],[64,64],[640,480],[1024,512]]){
    for(const step of [0,1,8,16,32]){
      const p=expectedFCG3Samples(w,h,step);
      assert.equal(p.length,6);
      assert.equal(p.filter(x=>x.label.startsWith('density')).length,3);
      assert.equal(p.filter(x=>x.label.startsWith('error')).length,3);
      const actual=p.map(({x,y,rgba})=>({x,y,rgba:[...rgba]}));
      assert.ok(compareFCG3Readback(actual,w,h,step).every(x=>x.pass));
      actual[1].rgba[0]=actual[1].rgba[0]>8?actual[1].rgba[0]-5:actual[1].rgba[0]+5;
      assert.equal(compareFCG3Readback(actual,w,h,step)[1].pass,false);
    }
  }
  assert.deepEqual(fcg3PixelCell(0,0,320,240),{i:0,j:0,panel:'density'});
  assert.deepEqual(fcg3PixelCell(319,239,320,240),{i:31,j:31,panel:'error'});
  assert.throws(()=>fcg3PixelCell(320,0,320,240),RangeError);
});

test('FCG3 actual editable JS/GLSL, independent oracle and safe lab contract',async()=>{
  const root=new URL('../../textbook/volumes/dream_thater/計算系/FCG/FCG3/',import.meta.url);
  const [js,vert,frag,host,html,md]=await Promise.all([
    readFile(new URL('advection.js',root),'utf8'),
    readFile(new URL('advection.vert',root),'utf8'),
    readFile(new URL('advection.frag',root),'utf8'),
    readFile(new URL('wgl-lab-host.mjs',import.meta.url),'utf8'),
    readFile(new URL('wgl-lab.html',import.meta.url),'utf8'),
    readFile(new URL('index.md',root),'utf8')]);
  assert.match(js,/settings\.steps/);
  assert.match(js,/Float64Array/);
  assert.match(js,/\[previous,next\]=\[next,previous\]/);
  assert.match(js,/gl\.texImage2D\(gl\.TEXTURE_2D,0,gl\.R8/);
  assert.match(js,/gl\.drawArrays\(gl\.TRIANGLES,0,3\)/);
  assert.match(js,/COMPILE_STATUS/);
  assert.match(js,/LINK_STATUS/);
  assert.match(js,/report\('MASS'/);
  assert.match(js,/report\('ERROR'/);
  assert.match(vert,/#version 300 es/);
  assert.match(frag,/texelFetch\(u_numeric,cell,0\)/);
  assert.match(frag,/texelFetch\(u_exact,cell,0\)/);
  assert.match(frag,/5\.0\*abs\(q-exact\)/);
  assert.match(host,/lesson === 'FCG3'/);
  assert.match(host,/expectedFCG3Samples/);
  assert.match(host,/fcg3Metrics/);
  assert.match(host,/fcg3-cpu-prediction/);
  assert.match(host,/fcg3-pick/);
  assert.match(host,/iframe\.setAttribute\('sandbox', 'allow-scripts'\)/);
  assert.ok(!host.includes('allow-same-origin'));
  assert.match(html,/role="tablist"/);
  assert.match(md,/lesson=FCG3/);
  assert.equal((md.match(/- Level: A/g)||[]).length,4);
  assert.equal((md.match(/- Level: B/g)||[]).length,3);
  assert.equal((md.match(/- Level: C/g)||[]).length,1);
  assert.equal((md.match(/<!-- solution-start -->/g)||[]).length,8);
});


test('FCG3 CPU oracle and pixel prediction follow the selected 32/64/96 grid and radius',()=>{
  for(const N of [32,64,96]){
    for(const radius of [0.14,0.24]){
      const m0=fcg3Metrics(0,N,radius),m32=fcg3Metrics(32,N,radius);
      assert.equal(fcg3Grid(16,N,radius).length,N*N);
      assert.ok(m0.mass>0&&m32.mass>0&&m32.l1>=0);
      for(const [w,h] of [[1024,512],[320,240],[64,64]]){
        const p=expectedFCG3Samples(w,h,16,N,radius);
        assert.equal(p.length,6);
        assert.ok(p.every(s=>s.x>=0&&s.y>=0&&s.x<w&&s.y<h));
        const got=p.map(({x,y,rgba})=>({x,y,rgba:[...rgba]}));
        assert.ok(compareFCG3Readback(got,w,h,16,2,N,radius).every(s=>s.pass));
      }
    }
    assert.equal(fcg3PixelCell(1023,511,1024,512,N).i,N-1);
  }
  assert.throws(()=>fcg3Grid(1,129),RangeError);
  assert.throws(()=>fcg3Initial(.5,.5,-.1),RangeError);
});
