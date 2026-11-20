import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

test('FCG5 animates one and the same editable MAC state and retains static panels',async()=>{
  const dir=new URL('../../textbook/volumes/dream_thater/計算系/FCG/FCG5/',import.meta.url);
  const [js,frag]=await Promise.all(['fluid.js','fluid.frag']
    .map(p=>readFile(new URL(p,dir),'utf8')));
  assert.match(js,/function advanceFluidStep\(\)/);
  assert.match(js,/for\(let t=0;t<steps;t\+\+\)advanceFluidStep\(\)/);
  assert.match(js,/else\{advanceFluidStep\(\);stateStep\+\+;\}/);
  assert.match(js,/function refreshGpuFields\(\)/);
  assert.match(js,/gl\.texSubImage2D\(gl\.TEXTURE_2D/);
  assert.match(js,/function inject\(e\)/);
  assert.match(js,/dye\[ci\(i,j\)\]=clip\(/);
  assert.match(js,/requestAnimationFrame\(frame\)/);
  assert.match(js,/matchMedia\?\.\('\(prefers-reduced-motion: reduce\)'\)/);
  assert.match(frag,/uniform int u_displayMode;/);
  assert.match(frag,/if\(u_displayMode==1\)/);
  assert.match(frag,/texelFetch\(u_dye,ij,0\)/);
  assert.match(frag,/texelFetch\(u_div,ij,0\)/);
  assert.match(frag,/texelFetch\(u_speed,ij,0\)/);
  // Dynamic pixels are not the old independent CPU oracle for step8.
  const host=await readFile(new URL('./wgl-lab-host.mjs',import.meta.url),'utf8');
  assert.ok(host.includes("['FCG3','FCG5','WGL5','WGL9','WGL12']"));
});
test('WGL12 uses its learner-edited GGX shader, preserving Fresnel readback first',async()=>{
  const dir=new URL('../../textbook/volumes/dream_thater/計算系/WGL/WGL12/',import.meta.url);
  const [js,frag]=await Promise.all(['pbr.js','pbr.frag']
    .map(p=>readFile(new URL(p,dir),'utf8')));
  assert.match(frag,/uniform vec3 u_lightDirection;/);
  assert.match(frag,/vec3 l = normalize\(u_lightDirection\)/);
  assert.match(frag,/if \(u_probe == 1\)/);
  assert.match(js,/gl\.uniform3fv\(light,new Float32Array\(initialLight\)\)/);
  assert.ok(js.indexOf("gl.readPixels(0, 0, 4, 1")<js.indexOf("requestAnimationFrame(frame)"),
    'static four Fresnel pixels are read before live material frames');
  assert.match(js,/gl\.uniform3f\(light,x,y,z\)/);
  assert.match(js,/gl\.uniform1i\(probe,0\)/);
  assert.match(js,/matchMedia\?\.\('\(prefers-reduced-motion: reduce\)'\)/);
  assert.doesNotMatch(js,/gl\.deleteProgram\(program\)/);
});
