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
    assert.ok(parts.every(v=>typeof v==='string'&&v.trim().length>=3),id);
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
  assert.match(guide,/document\.createElement\('details'\)/);
  assert.match(guide,/details\.append\(summary,detailText\)/);
  assert.ok(!guide.includes("上のボタンは編集欄の実際のJS・GLSL"),'duplicate explanatory copy stays out of primary UI');
  assert.ok(!css.includes('border-radius:15px;background:linear-gradient(120deg'),'primary guide must not be a decorative card');
  assert.match(css,/\.visual-guide-steps>div\{min-width:0\}/,'step columns should not be framed cards');
});
test('animated teaching code uses original lesson state and shader',async()=>{
  const root=new URL('../../textbook/volumes/dream_thater/計算系/',import.meta.url);
  for(const [path,signals] of [
    ['FCG/FCG3/advection.js',['requestAnimationFrame(fcg3VisualFrame)','fcg3UpdateOnce()',
      'gl.texSubImage2D(', 'gl.drawArrays(gl.TRIANGLES,0,3)']],
    ['WGL/WGL5/camera.js',['requestAnimationFrame(wgl5Frame)','updateOrbit()',
      'gl.uniformMatrix4fv(uView,false,eyeView)','gl.drawElements(gl.TRIANGLES,36,gl.UNSIGNED_SHORT,0)']],
    ['WGL/WGL9/lighting.js',['requestAnimationFrame(wgl9Frame)','wgl9Draw(wgl9Phase)',
      'gl.uniform3fv(wgl9LightLoc,orbit)','gl.drawArrays(gl.TRIANGLES,0,meshes[i].array.length/6)']]
  ]){
    const text=await readFile(new URL(path,root),'utf8');
    for(const signature of signals)assert.ok(text.includes(signature),path+': '+signature);
    assert.ok(text.includes("prefers-reduced-motion: reduce"),path);
    if(path==='WGL/WGL5/camera.js'){
      for(const interaction of ["canvas.addEventListener('pointerdown'",
        "canvas.addEventListener('pointermove'","canvas.addEventListener('wheel'",
        "canvas.addEventListener('keydown'"])
        assert.ok(text.includes(interaction),path+': '+interaction);
    }else assert.ok(text.includes("canvas.addEventListener('click'"),path);
    const first=text.indexOf('gl.flush()');
    const animation=text.indexOf('requestAnimationFrame(');
    if(first>=0)assert.ok(first<animation,path+' must finish static GPU oracle first');
  }
});

test('FCG1 has the same visual-first contract in its separate editable Canvas host',async()=>{
  const [html,host]=await Promise.all([
    readFile(new URL('./fcg1-lab.html',import.meta.url),'utf8'),
    readFile(new URL('./fcg-canvas-lab-host.mjs',import.meta.url),'utf8')]);
  assert.match(html,/id="fcg1-observe"/);
  assert.match(html,/class="visual-lesson-guide"/);
  assert.ok(host.includes("el('fcg1-observe')?.addEventListener('click',()=>el('run').click())"));
  assert.ok(host.includes("frame.setAttribute('sandbox', 'allow-scripts')"));
});

test('WGL wave1 auxiliary overlays stay collapsed until requested',async()=>{
  const root=new URL('../../textbook/volumes/dream_thater/計算系/WGL/',import.meta.url);
  for(const [path,container,contents] of [
    ['WGL18/diffusion.js','valuesPanel',['liveReadback()','refreshNumbers()','stepNumber']]
  ]){
    const source=await readFile(new URL(path,root),'utf8');
    assert.match(source,new RegExp('const '+container+"=document\\.createElement\\('details'\\)"),path);
    assert.match(source,/const toggle=document\.createElement\('summary'\)/,path);
    assert.ok(source.includes(container+'.append(toggle,'),path+' summary comes before inspector');
    assert.doesNotMatch(source,new RegExp(container+'\\.open\\s*=\\s*true'),path+' starts closed');
    for(const item of contents)assert.ok(source.includes(item),path+': '+item);
    assert.ok(source.includes("canvas.insertAdjacentElement('afterend',"+container+")"),
      path+' must be attached to the real GPU mesh/canvas');
  }
});

test('WGL17 keeps the actual data grid and precision comparison visible', async()=>{
  const path=new URL('../../textbook/volumes/dream_thater/計算系/WGL/WGL17/data-grid.js',import.meta.url);
  const source=await readFile(path,'utf8');
  assert.match(source,/const root=document\.createElement\('section'\)/);
  assert.match(source,/canvas\.after\(root\)/);
  assert.match(source,/buttons\[k\]=button/);
  assert.match(source,/grid\.append\(button\)/);
  assert.match(source,/bars\.replaceChildren\(\)/);
  assert.match(source,/gl\.readPixels\(p,q,1,1/);
  assert.doesNotMatch(source,/document\.createElement\('details'\)/);
});

test('WGL3 first-wave visual is now a live shared-vs-expanded GPU experiment',async()=>{
  const root=new URL('../../textbook/volumes/dream_thater/計算系/WGL/WGL3/',import.meta.url);
  const source=await readFile(new URL('mesh.js',root),'utf8');
  assert.match(source,/gl\.viewport\(0, 0, leftWidth, canvas\.height\)/);
  assert.match(source,/gl\.viewport\(leftWidth, 0, canvas\.width - leftWidth, canvas\.height\)/);
  assert.match(source,/const splitControl = document\.createElement\('input'\)/);
  assert.match(source,/drawGuide\(\)/);
  assert.match(source,/gl\.bufferSubData\(gl\.ARRAY_BUFFER, 0, arraysLive\)/);
  assert.match(source,/gl\.bufferSubData\(gl\.ARRAY_BUFFER, 0, indexedLive\)/);
  assert.ok(!source.includes("const panel=document.createElement('details')"),
    'primary WGL3 experiment must be visible without an inspector disclosure');
});

test('WGL19 replaces the hidden timeline with source-backed GPU diffusion replay',async()=>{
  const root=new URL('../../textbook/volumes/dream_thater/計算系/WGL/WGL19/audit.js',import.meta.url);
  const source=await readFile(root,'utf8');
  for(const signal of ['function resetPlayback()','function nextFrame()',
    "canvas.addEventListener('wgl19-control'",'const values=readState();',
    'labels[k].textContent=values[k].toFixed(3)',"wgl19-initial-oracle-captured"]){
    assert.ok(source.includes(signal),'WGL19/audit.js: '+signal);
  }
  assert.doesNotMatch(source,/document\.createElement\('details'\)/,
    'GPU scene and step controls must be visible instead of hidden in an inspector');
  assert.ok(source.includes('shell.append(canvas)'),
    'numeric labels must overlay the actual WebGL canvas');
});
