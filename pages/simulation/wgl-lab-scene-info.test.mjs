import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {sceneDescription} from './wgl-lab-scene-info.mjs';

test('G3 legends derive their initial step and GPU buffer dimensions from the run payload', () => {
  const a=sceneDescription('FCG3',{width:640,height:320,steps:8});
  assert.match(a.grid,/32×32/);
  assert.equal(a.clock,'物理step 8、t=0.25000 s（dt=1/32 s）');
  assert.equal(a.pixels,'640×320 px（GPU描画バッファ）');
  assert.match(a.color,/5\|q−q_exact\|/);
  const b=sceneDescription('FCG4',{width:900,height:300,steps:128});
  assert.match(b.clock,/Poisson反復 128 回（物理時刻は固定）/);
  assert.match(b.mode,/物理stepではなく/);
  const c=sceneDescription('FCG5',{width:900,height:300,steps:8});
  assert.match(c.clock,/t=0.32 s/);
  assert.match(c.mode,/線形補間は描画のみ/);
  const d=sceneDescription('WGL18',{width:320,height:240,steps:12});
  assert.match(d.grid,/4×4/);
  assert.match(d.mode,/同じGPU ping-pong格子/);
  assert.equal(sceneDescription('WGL1',{width:320,height:240,steps:0}),null);
  assert.equal(sceneDescription('FCG3',{width:NaN,height:320,steps:1}),null);
  assert.equal(sceneDescription('FCG3',{width:320,height:320,steps:-1}),null);
});

test('G3 canvas legend is before the iframe; no alternate renderer or unsafe markup',async () => {
  const [html,host,css,source]=await Promise.all([
    readFile(new URL('./wgl-lab.html',import.meta.url),'utf8'),
    readFile(new URL('./wgl-lab-host.mjs',import.meta.url),'utf8'),
    readFile(new URL('./wgl-lab.css',import.meta.url),'utf8'),
    readFile(new URL('./wgl-lab-scene-info.mjs',import.meta.url),'utf8')
  ]);
  assert.ok(html.indexOf('id="scene-info"') < html.indexOf('id="canvas-slot"'));
  assert.match(host,/mountSceneInfo\(lesson, byId\('scene-info'\)\)/);
  assert.match(host,/updateSceneInfo\(null\)/);
  assert.match(host,/updateSceneInfo\(data\.ok \? \{/);
  assert.match(css,/\.scene-info-list\{/);
  assert.match(source,/element\.textContent = info \?/);
  assert.doesNotMatch(source,/innerHTML|drawArrays|requestAnimationFrame|eval\(/);
});
