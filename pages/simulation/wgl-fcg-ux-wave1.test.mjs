import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {VISUAL_GUIDES,visualGuideIds} from './wgl-fcg-visual-guide.mjs';

test('every implemented shared WGL/FCG lesson has nonempty visual first guide',()=>{
  const ids=[...Array.from({length:20},(_,i)=>'WGL'+(i+1)),
    ...Array.from({length:7},(_,i)=>'FCG'+(i+2))];
  assert.equal(visualGuideIds.length,ids.length);
  assert.deepEqual(visualGuideIds.slice().sort(),ids.sort());
  for(const [id,parts] of Object.entries(VISUAL_GUIDES)){
    assert.match(id,/^(?:WGL(?:[1-9]|1[0-9]|20)|FCG[2-8])$/);
    assert.equal(parts.length,4,id);
    assert.ok(parts.every(v=>typeof v==='string'&&v.length>=5),id);
  }
});
test('observation guide executes the real source in the existing opaque sandbox',async()=>{
  const [guide,host,html,css]=await Promise.all([
    readFile(new URL('./wgl-fcg-visual-guide.mjs',import.meta.url),'utf8'),
    readFile(new URL('./wgl-lab-host.mjs',import.meta.url),'utf8'),
    readFile(new URL('./wgl-lab.html',import.meta.url),'utf8'),
    readFile(new URL('./wgl-lab.css',import.meta.url),'utf8')
  ]);
  assert.ok(guide.includes('run()'));
  assert.ok(!guide.includes('new Function('));
  assert.ok(!guide.includes('eval('));
  assert.ok(host.includes("mountVisualGuide(lesson,byId('panel-conditions'),{run,focusResult:selectTab})"));
  assert.ok(host.includes("iframe.setAttribute('sandbox', 'allow-scripts')"));
  assert.ok(!host.includes('allow-same-origin'));
  assert.match(html,/role="tablist"/);
  assert.match(css,/\.visual-lesson-guide\{/);
});
test('animated teaching code uses original lesson state and shader',async()=>{
  const root=new URL('../../textbook/volumes/dream_thater/計算系/',import.meta.url);
  for(const [path,signals] of [
    ['FCG/FCG3/advection.js',['requestAnimationFrame(fcg3VisualFrame)','fcg3UpdateOnce()',
      'gl.texSubImage2D(', 'gl.drawArrays(gl.TRIANGLES,0,3)']],
    ['WGL/WGL5/camera.js',['requestAnimationFrame(wgl5Frame)','wgl5DrawOrbit(wgl5Phase)',
      'gl.uniformMatrix4fv(uView,false,eyeView)','gl.drawElements(gl.TRIANGLES,36,gl.UNSIGNED_SHORT,0)']],
    ['WGL/WGL9/lighting.js',['requestAnimationFrame(wgl9Frame)','wgl9Draw(wgl9Phase)',
      'gl.uniform3fv(wgl9LightLoc,orbit)','gl.drawArrays(gl.TRIANGLES,0,meshes[i].array.length/6)']]
  ]){
    const text=await readFile(new URL(path,root),'utf8');
    for(const signature of signals)assert.ok(text.includes(signature),path+': '+signature);
    assert.ok(text.includes("prefers-reduced-motion: reduce"),path);
    assert.ok(text.includes("canvas.addEventListener('click'"),path);
    const first=text.indexOf('gl.flush()');
    const animation=text.indexOf('requestAnimationFrame(');
    if(first>=0)assert.ok(first<animation,path+' must finish static GPU oracle first');
  }
});
