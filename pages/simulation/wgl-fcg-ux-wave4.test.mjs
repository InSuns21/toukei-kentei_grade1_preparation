import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {FCG6_N,fcg6State,expectedFCG6Samples,compareFCG6Readback}
  from './fcg6-lab-core.mjs';
import {LIGHT_RAY,expectedWGL11Samples,compareWGL11Readback}
  from './wgl11-lab-core.mjs';

const base=new URL('../../textbook/volumes/dream_thater/計算系/',import.meta.url);
const read=path=>readFile(new URL(path,base),'utf8');

test('FCG6 live obstacle uses the same editable 48x48 MAC step and mask',async()=>{
  const [js,frag]=await Promise.all([read('FCG/FCG6/solid.js'),read('FCG/FCG6/solid.frag')]);
  assert.match(js,/function advanceObstacleStep\(step\)\{/);
  assert.match(js,/for\(let step=0;step<steps;step\+\+\)advanceObstacleStep\(step\)/);
  assert.match(js,/advanceObstacleStep\(stepNumber\);stepNumber\+\+/);
  assert.match(js,/geom=geometry\(\(step\+1\)\*dt\)/);
  assert.match(js,/u=new Float64Array\(\(N\+1\)\*N\)/);
  assert.match(js,/v=new Float64Array\(N\*\(N\+1\)\)/);
  assert.match(js,/boundary\(u,v,geom\.s,geom\.wallU\)/);
  assert.match(js,/gl\.texSubImage2D\(gl\.TEXTURE_2D/);
  assert.match(js,/firstCycle=false;resetState\(\);uploadState\(\)/);
  assert.match(js,/requestAnimationFrame\(frame\)/);
  assert.match(js,/prefers-reduced-motion: reduce/);
  assert.match(frag,/uniform int u_viewMode;/);
  assert.match(frag,/uniform float u_aspect;/);
  assert.match(frag,/if\(u_viewMode==1\)/);
  assert.match(frag,/texelFetch\(u_dye,ij,0\)/);
  assert.match(frag,/texelFetch\(u_div,ij,0\)/);
  assert.match(frag,/texelFetch\(u_speed,ij,0\)/);
  assert.doesNotThrow(()=>new Function('gl','canvas','settings','vertexSource','fragmentSource','report',js));
  const snapshot=fcg6State(8);
  assert.equal(FCG6_N,48);
  assert.equal(snapshot.solid.length,48*48);
  assert.ok(snapshot.residual<2e-6,'independent CG residual');
  assert.ok(snapshot.identity<1e-7,'masked projection identity');
  assert.match(frag,/textureSize\(u_solid,0\)/);
  assert.ok(snapshot.wall<1e-10);
  const ex=expectedFCG6Samples(1536,512,8);
  assert.equal(ex.length,9);
  assert.ok(compareFCG6Readback(ex.map(x=>({...x})),1536,512,8).every(x=>x.pass));
});

test('WGL11 live shadows use same depth-only FBO and update *both* passes',async()=>{
  const [js,frag]=await Promise.all([read('WGL/WGL11/shadow.js'),read('WGL/WGL11/shadow.frag')]);
  assert.deepEqual(LIGHT_RAY,[.5,.25,1]);
  const init=expectedWGL11Samples(320,240);
  assert.ok(compareWGL11Readback(init.map(x=>({...x})),320,240).every(x=>x.pass));
  assert.match(js,/gl\.uniform3f\(lightDirectionLoc,0\.5,0\.25,1\.0\)/);
  assert.match(js,/light\[8\]=-.5\*dx;light\[9\]=-.5\*dy;/);
  assert.match(js,/gl\.uniform3f\(lightDirectionLoc,dx,dy,1\.0\)/);
  assert.match(js,/gl\.bindFramebuffer\(gl\.FRAMEBUFFER,fbo\)/);
  assert.match(js,/gl\.bindTexture\(gl\.TEXTURE_2D,null\)/);
  assert.match(js,/gl\.drawBuffers\(\[gl\.NONE\]\)/);
  assert.match(js,/gl\.drawBuffers\(\[gl\.BACK\]\)/);
  assert.match(js,/gl\.uniform1i\(passLoc,0\)/);
  assert.match(js,/gl\.uniform1i\(passLoc,1\)/);
  assert.ok(js.indexOf("gl.readPixels(0,0,4,1")<js.indexOf("requestAnimationFrame(frame)"));
  assert.match(js,/requestAnimationFrame\(frame\)/);
  assert.match(js,/prefers-reduced-motion: reduce/);
  assert.match(js,/pagehide/);
  assert.match(frag,/uniform vec3 u_lightDirection;/);
  assert.match(frag,/vec3 L = normalize\(u_lightDirection\);/);
  assert.match(frag,/q\.z - u_bias <= nearestDepth/);
  assert.match(frag,/if \(u_pass == 2\)/);
  assert.doesNotThrow(()=>new Function('gl','canvas','settings','vertexSource','fragmentSource','report',js));
});

test('FCG6 and WGL11 present initial-oracle limits and live controls to learners',async()=>{
  for(const id of ['FCG6','WGL11']){
    const root=id.startsWith('FCG')?'FCG':'WGL';
    const md=await read(root+'/'+id+'/index.md');
    assert.match(md,/CPU\/GPU/);
    assert.match(md,/Space\/Enter/);
  }
  const host=await readFile(new URL('./wgl-lab-host.mjs',import.meta.url),'utf8');
  assert.ok(host.includes("['FCG4','FCG6','WGL11','WGL13']"));
  assert.ok(host.includes("iframe.setAttribute('sandbox', 'allow-scripts')"));
});
