import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const root=new URL('../../textbook/volumes/dream_thater/計算系/',import.meta.url);
const file=path=>readFile(new URL(path,root),'utf8');

test('FCG4 animated convergence uses EXACT initial numerical Jacobi update',async()=>{
  const js=await file('FCG/FCG4/projection.js');
  assert.match(js,/function jacobiIteration\(\)/);
  assert.match(js,/for\(let k=0;k<iterations;k\+\+\)jacobiIteration\(\)/);
  assert.match(js,/if\(iter>=160\)restart\(\)/);
  assert.match(js,/if\(firstCycle\)\{firstCycle=false;restart\(\);refreshProjectedState\(\);\}/);
  assert.match(js,/jacobiIteration\(\);iter\+\+;/);
  assert.match(js,/u\.set\(uStar\);v\.set\(vStar\)/);
  assert.match(js,/Math\.abs\(div\+dt\/rho\*residual\)/);
  assert.match(js,/gl\.texSubImage2D\(gl\.TEXTURE_2D/);
  assert.match(js,/requestAnimationFrame\(frame\)/);
  assert.match(js,/prefers-reduced-motion: reduce/);
  assert.match(js,/window\.addEventListener\('pagehide',\(\)=>cancelAnimationFrame\(raf\)/);
  // Shader remains the same deterministic three physical fields.
  const frag=await file('FCG/FCG4/projection.frag');
  assert.match(frag,/texelFetch\(u_pressure,cell,0\)/);
  assert.match(frag,/texelFetch\(u_div,cell,0\)/);
  assert.match(frag,/texelFetch\(u_speed,cell,0\)/);
  assert.doesNotThrow(()=>new Function('gl','canvas','settings','vertexSource','fragmentSource','report',js));
});
test('WGL7 samples the same editable texture with moving UV and independent filters',async()=>{
  const js=await file('WGL/WGL7/sampling.js');
  const frag=await file('WGL/WGL7/sampling.frag');
  assert.match(js,/gl\.uniform2f\(offsetLoc,offset\[0\],offset\[1\]\+shift\)/);
  assert.match(js,/gl\.uniform1f\(repeatsLoc,density\)/);
  assert.match(js,/gl\.texParameteri\(gl\.TEXTURE_2D, gl\.TEXTURE_MIN_FILTER,filters\[filter\]\)/);
  assert.match(js,/gl\.enableVertexAttribArray\(2\)/);
  assert.match(js,/leftMinFilter/);
  assert.match(js,/rightMinFilter/);
  assert.match(js,/gl\.LINEAR_MIPMAP_LINEAR/);
  assert.ok(js.indexOf("gl.flush();")<js.indexOf("requestAnimationFrame(frame)"),
    'static GPU probes precede dynamic UV presentation');
  assert.match(js,/requestAnimationFrame\(frame\)/);
  assert.match(js,/prefers-reduced-motion: reduce/);
  assert.match(frag,/texture\(u_texture, v_uv \* u_repeats \+ u_offset\)/);
  assert.doesNotThrow(()=>new Function('gl','canvas','settings','vertexSource','fragmentSource','report',js));
});
test('WGL13 preserves raw 12-face oracle, animates ONLY the environment lookup',async()=>{
  const js=await file('WGL/WGL13/environment.js');
  const frag=await file('WGL/WGL13/environment.frag');
  assert.match(frag,/if\(u_probe==1\)/);
  assert.match(frag,/rotateY\(reflection,u_yaw\)/);
  assert.match(frag,/textureLod\(u_env,normalize\(u_probeDirections\[k\]\),0\.0\)/);
  assert.ok(js.indexOf("gl.readPixels(0,0,12,1")<js.indexOf("requestAnimationFrame(frame)"));
  assert.match(js,/gl\.uniform1f\(yawLoc,yaw\*Math\.PI\/180\)/);
  assert.match(js,/gl\.uniform1i\(probe,0\)/);
  assert.match(js,/e\.key==='ArrowLeft'\|\|e\.key==='ArrowRight'/);
  assert.match(js,/canvas\.addEventListener\('pointerdown'/);
  assert.match(js,/prefers-reduced-motion: reduce/);
  assert.doesNotMatch(js,/gl\.deleteProgram\(program\)/);
  assert.doesNotThrow(()=>new Function('gl','canvas','settings','vertexSource','fragmentSource','report',js));
});
test('changed chapters explain animation versus the static oracle',async()=>{
  for(const id of ['FCG4','WGL7','WGL13']){
    const series=id.startsWith('FCG')?'FCG':'WGL';
    const md=await file(series+'/'+id+'/index.md');
    assert.match(md,/Space\/Enter/);
    assert.match(md,/CPU\/GPU/);
  }
  const host=await readFile(new URL('./wgl-lab-host.mjs',import.meta.url),'utf8');
  const note=host.slice(host.indexOf("if (['FCG3'"),host.indexOf('mountVisualGuide('));
  for(const id of ['FCG4','WGL13'])
    assert.ok(note.includes("'"+id+"'"),id+' must retain its static-oracle label');
  const sceneInfo=await readFile(new URL('./wgl-lab-scene-info.mjs',import.meta.url),'utf8');
  const wgl7=sceneInfo.slice(sceneInfo.indexOf('WGL7: Object.freeze'),sceneInfo.indexOf('WGL11: Object.freeze'));
  assert.match(wgl7,/平面8画素の検算/);
  assert.ok(host.indexOf('hooks.showObservation();')>host.indexOf('const samples = positions.map'),
    'WGL7 displays the interactive floor only after the initial flat readback');
  assert.ok(host.includes("iframe.setAttribute('sandbox', 'allow-scripts')"));
});
