import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {repeat,clamp,mirroredRepeat,checkerTexel,nearestChecker,bilinearChecker,
  footprint,pixelUv,expectedWGL7Samples,compareWGL7Readback} from './wgl7-lab-core.mjs';

const near=(a,b,tolerance=1e-9)=>assert.ok(Math.abs(a-b)<tolerance,a+' != '+b);
test('WGL7 wrapping and texel-center rules',()=>{
  near(repeat(-.125),.875); near(repeat(1.125),.125);
  near(clamp(-.125),0); near(clamp(1.125),1);
  near(mirroredRepeat(1.25),.75);near(mirroredRepeat(-.25),.25);
  assert.equal(checkerTexel(0,0),32);
  assert.equal(checkerTexel(1,0),224);
  assert.equal(nearestChecker(.01,.01),32);
  assert.equal(nearestChecker(1.14,0),224);
  assert.throws(()=>repeat(Infinity),RangeError);
});
test('WGL7 bilinear: center, corner and checker mip average',()=>{
  near(bilinearChecker(.5/8,.5/8),32);
  near(bilinearChecker(1/8,.5/8),128); // halfway between 32 and 224
  near(bilinearChecker(0,0),128);      // periodic meeting of four texels
  for(let y=0;y<8;y+=2)for(let x=0;x<8;x+=2){
    const mean=(checkerTexel(x,y)+checkerTexel(x+1,y)+
                checkerTexel(x,y+1)+checkerTexel(x+1,y+1))/4;
    near(mean,128);
  }
});
test('WGL7 screen footprint selects mip level at strong minification',()=>{
  const f=footprint(8,128,160,240);
  near(f.rho,6.4);near(f.lod,Math.log2(6.4));
  assert.ok(f.lod>1);
  near(footprint(8,1,160,240).rho,.05);
  assert.throws(()=>footprint(8,0,160,240),RangeError);
});
test('WGL7 initial drawing pixel probes and difference detection',()=>{
  for(const [w,h] of [[320,240],[640,480],[64,64],[1024,512],[512,1024]]){
    const expected=expectedWGL7Samples(w,h);
    assert.equal(expected.length,8);
    assert.ok(expected.slice(4).every(p=>p.rgba[0]===128));
    assert.ok(expected.slice(0,4).every(p=>[32,224].includes(p.rgba[0])));
    const measured=expected.map(({x,y,rgba})=>({x,y,rgba:[...rgba]}));
    assert.ok(compareWGL7Readback(measured,w,h).every(p=>p.pass));
    measured[0].rgba[0]=128;
    assert.ok(!compareWGL7Readback(measured,w,h)[0].pass);
  }
  const u=pixelUv(0,0,0,160,240);
  near(u[0],128*.5/160+.017125);
});
test('WGL7 lesson sources and sandbox host hooks',async()=>{
  const dir=new URL('../../textbook/volumes/dream_thater/計算系/WGL/WGL7/',import.meta.url);
  const [js,vs,fs,host,md]=await Promise.all([
    ...['sampling.js','sampling.vert','sampling.frag'].map(p=>readFile(new URL(p,dir),'utf8')),
    readFile(new URL('./wgl-lab-host.mjs',import.meta.url),'utf8'),
    readFile(new URL('index.md',dir),'utf8')
  ]);
  assert.match(js,/gl\.texImage2D\(gl\.TEXTURE_2D, 0, gl\.RGBA8/);
  assert.match(js,/gl\.generateMipmap\(gl\.TEXTURE_2D\)/);
  assert.match(js,/gl\.LINEAR_MIPMAP_LINEAR/);
  assert.match(js,/gl\.drawArrays\(gl\.TRIANGLES, 0, 6\)/);
  assert.match(vs,/out vec2 v_uv/);assert.match(fs,/texture\(u_texture/);
  for(const s of ['expectedWGL7Samples','compareWGL7Readback',"'WGL7'"])
    assert.ok(host.includes(s),s);
  assert.match(host,/iframe\.setAttribute\('sandbox', 'allow-scripts'\)/);
  assert.match(md,/lesson=WGL7/);
});

test('WGL7 floor observation starts after independent readback',async()=>{
  const dir=new URL('../../textbook/volumes/dream_thater/計算系/WGL/WGL7/',import.meta.url);
  const [js,vs,host]=await Promise.all([
    readFile(new URL('sampling.js',dir),'utf8'),
    readFile(new URL('sampling.vert',dir),'utf8'),
    readFile(new URL('./wgl-lab-host.mjs',import.meta.url),'utf8')
  ]);
  assert.match(js,/return \{showObservation\}/);
  assert.match(vs,/vec4\(a_position \* a_w, 0\.0, a_w\)/);
  assert.match(js,/mode==='floor' \? 6 : 1/);
  assert.match(js,/gl\.uniform1f\(repeatsLoc,density\)/);
  assert.match(js,/gl\.NEAREST_MIPMAP_NEAREST/);
  assert.match(js,/gl\.LINEAR_MIPMAP_NEAREST/);
  assert.match(js,/gl\.NEAREST_MIPMAP_LINEAR/);
  assert.ok(host.indexOf('hooks.showObservation();')>host.indexOf('const samples = positions.map'));
});
