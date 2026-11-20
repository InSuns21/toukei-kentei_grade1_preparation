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
  const e=sceneDescription('FCG2',{width:512,height:512,steps:2});
  assert.match(e.grid,/8×8/);
  assert.equal(e.clock,'解析場の基準step 2、t=3.14159 s（dt=π/2 s）');
  assert.match(e.mode,/物理時刻/);
  const uv=sceneDescription('WGL7',{width:960,height:720});
  assert.match(uv.grid,/8×8 RGBA8/);
  assert.match(uv.mode,/UVオフセット/);
  assert.equal(uv.pixels,'960×720 px（GPU描画バッファ）');
  const material=sceneDescription('WGL12',{width:960,height:720});
  assert.match(material.grid,/数値計算格子なし/);
  assert.match(material.color,/線形RGBからsRGB/);
  const audit={fixedMs:20,frames:4,droppedMs:0,steps:6};
  const clock=sceneDescription('WGL19',{width:960,height:720,steps:6,frameAudit:audit});
  assert.equal(clock.clock,'物理更新 6 step、計算時間 120 ms（固定dt=20 ms）');
  assert.match(clock.mode,/合成フレーム 4 回/);
  const edited=sceneDescription('WGL19',{width:640,height:480,steps:2,
    frameAudit:{fixedMs:50,frames:2,droppedMs:0,steps:2}});
  assert.match(edited.clock,/計算時間 100 ms/);
  assert.equal(sceneDescription('WGL19',{width:320,height:240,steps:6}),null);
  assert.equal(sceneDescription('WGL19',{width:320,height:240,steps:6,
    frameAudit:{...audit,steps:5}}),null);
  const triangle=sceneDescription('WGL1',{width:640,height:360});
  assert.match(triangle.grid,/数値計算格子なし/);
  assert.match(triangle.color,/橙色/);
  assert.match(triangle.source,/triangle.frag/);
  assert.equal(triangle.clock,'静止描画1回（物理stepなし）');
  assert.equal(triangle.pixels,'640×360 px（GPU描画バッファ）');
  const colors=sceneDescription('WGL2',{width:512,height:384});
  assert.match(colors.color,/u_gain/);
  assert.match(colors.source,/colors.vert/);
  assert.match(colors.mode,/画素中心/);
  const mesh=sceneDescription('WGL3',{width:960,height:720});
  assert.match(mesh.grid,/頂点\(n\+1\)²、三角形2n²/);
  assert.match(mesh.mode,/drawElements.*drawArrays/);
  assert.match(mesh.source,/gridSteps, drawMode/);
  assert.equal(mesh.clock,triangle.clock);
  assert.equal(sceneDescription('WGL2',{width:0,height:384}),null);
  assert.equal(sceneDescription('WGL3',{width:384,height:-1}),null);
  const transform=sceneDescription('WGL4',{width:960,height:720});
  assert.match(transform.grid,/長方形の4頂点/);
  assert.match(transform.color,/x軸は赤、y軸は緑/);
  assert.match(transform.mode,/T×R×S/);
  assert.match(transform.clock,/静止描画1回/);
  assert.match(transform.source,/angleDegrees.*model.vert/);
  const camera=sceneDescription('WGL5',{width:960,height:720});
  assert.match(camera.grid,/立方体を手前と奥へ2回/);
  assert.match(camera.color,/橙.*青/);
  assert.match(camera.clock,/初期カメラの静止画素検算/);
  assert.match(camera.mode,/近遠面1\/9.*同じ実GLSL/);
  assert.match(camera.source,/depthEnabled/);
  const interp=sceneDescription('WGL6',{width:960,height:720});
  assert.match(interp.grid,/左右のGPU viewport/);
  assert.match(interp.color,/UVの無次元値/);
  assert.match(interp.mode,/透視補正UV.*画面重心座標/);
  assert.match(interp.source,/gridFrequency.*interpolation.frag/);
  assert.equal(interp.clock,'左右の静止比較描画1回（物理stepなし）');
  assert.equal(interp.pixels,'960×720 px（GPU描画バッファ）');
  const blend=sceneDescription('WGL8',{width:800,height:600});
  assert.match(blend.grid,/左右|左・右/);
  assert.match(blend.color,/sRGB符号化成分.*線形光/);
  assert.match(blend.mode,/reverseOrder/);
  assert.match(blend.source,/blending.js.*blending.frag/);
  assert.equal(blend.clock,'初期の静止合成1回（物理stepなし）');
  assert.equal(blend.pixels,'800×600 px（GPU描画バッファ）');
  const lighting=sceneDescription('WGL9',{width:800,height:600});
  assert.match(lighting.grid,/立方体12三角形.*球48×72×2三角形/);
  assert.match(lighting.color,/Lambert.*Blinn–Phong.*sRGB/);
  assert.match(lighting.mode,/u_lightDirection.*CPU画素基準/);
  assert.match(lighting.source,/lighting.js.*lighting.vert.*lighting.frag/);
  const framebuffer=sceneDescription('WGL10',{width:800,height:600});
  assert.match(framebuffer.grid,/RGBA8.*offscreenScale/);
  assert.match(framebuffer.color,/第1パス.*第2パス/);
  assert.match(framebuffer.mode,/texel数.*pixel数/);
  assert.match(framebuffer.source,/framebuffer.js.*framebuffer.frag/);
  assert.equal(framebuffer.clock,'FBOへ描く第1パス→画面へ描く第2パス（物理stepなし）');
  assert.equal(framebuffer.pixels,'800×600 px（GPU描画バッファ）');
  assert.equal(sceneDescription('WGL11',{width:320,height:240,steps:0}),null);
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
  // API names may appear in explanatory prose; forbid actual renderer invocation.
  assert.doesNotMatch(source,/innerHTML\s*=|(?:gl\.)?drawArrays\s*\(|requestAnimationFrame\s*\(|\beval\s*\(/);
});
