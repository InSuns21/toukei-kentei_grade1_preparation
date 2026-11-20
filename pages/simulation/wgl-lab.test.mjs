import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {expectedSamples, signedDoubleArea, insideTriangle,
  pixelToNdc, ndcToViewport, compareReadback} from './wgl-lab-core.mjs';

test('viewport map and inverse pixel center at 320x240', () => {
  assert.deepEqual(ndcToViewport(0, 0, 320, 240), [160,120]);
  const [x,y] = pixelToNdc(160,120,320,240);
  assert.equal(x, 0.0031250000000000444);
  assert.ok(Math.abs(y - (1/240)) < 1e-14);
  assert.equal(insideTriangle([x,y]), true);
  assert.equal(insideTriangle([-.99,-.99]), false);
  assert.equal(signedDoubleArea([-.8,-.8],[.8,-.8],[0,.8]), 2.5600000000000005);
});
test('CPU reference: center orange and bottom-left black, before/after resize', () => {
  for (const [w,h] of [[320,240],[640,480],[64,64],[1024,512]]) {
    const rows = expectedSamples(w,h);
    assert.deepEqual(rows[0].rgba,[255,128,0,255]);
    assert.deepEqual(rows[1].rgba,[0,0,0,255]);
    const got = rows.map(r=>({x:r.x,y:r.y,rgba:r.rgba}));
    assert.ok(compareReadback(got,w,h).every(r=>r.pass));
    got[0].rgba=[255,120,0,255];
    assert.equal(compareReadback(got,w,h)[0].pass,false);
  }
});
test('input limits and no accidental same-origin sandbox', async () => {
  const html=await readFile(new URL('./wgl-lab.html',import.meta.url),'utf8');
  const host=await readFile(new URL('./wgl-lab-host.mjs',import.meta.url),'utf8');
  assert.ok(html.includes('role="tablist"'));
  assert.equal((html.match(/role="tabpanel"/g)||[]).length,3);
  assert.ok(host.includes("iframe.setAttribute('sandbox', 'allow-scripts')"));
  assert.ok(!host.includes('allow-same-origin'));
  for (const rule of ["connect-src 'none'","frame-src 'none'","form-action 'none'"]) {
    assert.ok(host.includes(rule),rule);
  }
  assert.ok(host.includes('event.source !== active.frame.contentWindow'));
  assert.ok(host.includes('data.session !== active.session'));
  assert.ok(host.includes('data.generation !== active.generation'));
  assert.ok(host.includes('clearTimeout'));
  assert.ok(host.includes('iframe.srcdoc'));
});
test('WGL/FCG shared editor uses a full-width column and sticky actions before panels', async () => {
  const [html, css, host] = await Promise.all([
    readFile(new URL('./wgl-lab.html', import.meta.url), 'utf8'),
    readFile(new URL('./wgl-lab.css', import.meta.url), 'utf8'),
    readFile(new URL('./wgl-lab-host.mjs', import.meta.url), 'utf8')
  ]);
  assert.ok(html.indexOf('id="lab-actions"') < html.indexOf('id="panel-conditions"'));
  assert.equal((html.match(/id="run"/g) || []).length, 1);
  assert.match(css, /\.editors\{display:grid;grid-template-columns:minmax\(0,1fr\)/);
  assert.doesNotMatch(css, /grid-template-columns:1fr 1fr/);
  assert.doesNotMatch(css, /^\/\//m);
  assert.match(css, /\.lab-actions\{position:sticky;top:0/);
  assert.match(css, /\.editors textarea\{min-height:15rem\}/);
  // FCG physical-step controls must join the same persistent group, not be hidden in a tab.
  assert.ok(host.includes("byId('run').parentElement.before(controls)"));
  assert.ok(html.indexOf('id="lab-actions"') < html.indexOf('id="js-source"'));
});

test('initial shaders have compilable GLSL ES 3.00 interface and independent CPU colors',async()=>{
  const base=new URL('../../textbook/volumes/dream_thater/計算系/WGL/WGL1/',import.meta.url);
  // Repository workspace source path differs from published route.
  const repoBase=new URL('../../textbook/volumes/dream_thater/計算系/WGL/WGL1/',import.meta.url);
  void base;void repoBase;
  const fsPath=new URL('../../textbook/volumes/dream_thater/計算系/WGL/WGL1/',import.meta.url);
  const text=await readFile(new URL('triangle.js',fsPath),'utf8');
  const vert=await readFile(new URL('triangle.vert',fsPath),'utf8');
  const frag=await readFile(new URL('triangle.frag',fsPath),'utf8');
  assert.ok(text.includes('gl.drawArrays(gl.TRIANGLES, 0, 3)'));
  assert.ok(text.includes('gl.viewport(0, 0, canvas.width, canvas.height)'));
  assert.ok(vert.startsWith('#version 300 es'));
  assert.ok(frag.startsWith('#version 300 es'));
  assert.ok(vert.includes('in vec2 a_position'));
  assert.ok(frag.includes('vec4(1.0, 0.5, 0.0, 1.0)'));
});

import {barycentric, expectedWGL2Samples, compareWGL2Readback} from './wgl2-lab-core.mjs';

test('WGL2 barycentric oracle checks exact weights and four known pixel probes', () => {
  const w=barycentric([0,0]);
  assert.ok(Math.abs(w[0]-0.25)<1e-12);
  assert.ok(Math.abs(w[1]-0.25)<1e-12);
  assert.ok(Math.abs(w[2]-0.5)<1e-12);
  const samples=expectedWGL2Samples(320,240);
  assert.deepEqual(samples.map(x=>x.rgba),[
    [63,64,128,255],[140,19,96,255],[19,140,96,255],[0,0,0,255]
  ]);
  assert.ok(samples.every(x=>Math.abs(x.weights.reduce((a,b)=>a+b,0)-1)<1e-12));
  assert.deepEqual(samples.map(x=>x.inside),[true,true,true,false]);
  const got=samples.map(x=>({x:x.x,y:x.y,rgba:[...x.rgba]}));
  assert.ok(compareWGL2Readback(got,320,240).every(x=>x.pass));
  got[1].rgba=[255,255,255,255];
  assert.equal(compareWGL2Readback(got,320,240)[1].pass,false);
});

test('WGL2 GLSL interfaces and interleaved attribute layout are in real lesson files', async () => {
  const base=new URL('../../textbook/volumes/dream_thater/計算系/WGL/WGL2/',import.meta.url);
  const [js,vert,frag]=await Promise.all(['colors.js','colors.vert','colors.frag']
    .map(name=>readFile(new URL(name,base),'utf8')));
  assert.match(vert,/layout\(location = 0\) in vec2 a_position/);
  assert.match(vert,/layout\(location = 1\) in vec3 a_color/);
  assert.match(vert,/out vec3 v_color/);
  assert.match(frag,/in vec3 v_color/);
  assert.match(frag,/uniform vec3 u_gain/);
  assert.ok(js.includes('gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 20, 0)'));
  assert.ok(js.includes('gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 20, 8)'));
  assert.ok(js.includes('gl.uniform3f(gain, 1.0, 1.0, 1.0)'));
});

test('readback tolerance and UI copy match WGL1 and WGL2 independently', async () => {
  const host = await readFile(new URL('./wgl-lab-host.mjs', import.meta.url), 'utf8');
  assert.ok(host.includes("(isWGL2 ? '±2' : '±1')"));

  const wgl1 = expectedSamples(320, 240).map(s => ({x:s.x, y:s.y, rgba:[...s.rgba]}));
  wgl1[0].rgba[1] = 127; // expected 128; one-step difference is accepted
  assert.equal(compareReadback(wgl1, 320, 240)[0].pass, true);
  wgl1[0].rgba[1] = 126; // two-step difference is rejected by WGL1
  assert.equal(compareReadback(wgl1, 320, 240)[0].pass, false);

  const wgl2 = expectedWGL2Samples(320, 240).map(s => ({x:s.x, y:s.y, rgba:[...s.rgba]}));
  wgl2[0].rgba[0] += 2; // WGL2 accepts two steps
  assert.equal(compareWGL2Readback(wgl2, 320, 240)[0].pass, true);
  wgl2[0].rgba[0] += 1; // three steps must fail
  assert.equal(compareWGL2Readback(wgl2, 320, 240)[0].pass, false);
});

// WGL3のCPU検算と実教材コードのテストも共通ラボCIで実行する。
import './wgl3-lab.test.mjs';


import {highlightSource} from './wgl-lab-highlight.mjs';

test('WGL editors highlight JS and GLSL without interpreting source as HTML', () => {
  const js = highlightSource('const shade = "<script>&"; // let ignored\nfunction draw() { return gl.drawArrays(3); }', 'javascript');
  assert.match(js, /wgl-token-keyword">const<\/span>/);
  assert.match(js, /wgl-token-string">"&lt;script&gt;&amp;"<\/span>/);
  assert.match(js, /wgl-token-comment">\/\/ let ignored<\/span>/);
  assert.match(js, /wgl-token-function">draw<\/span>/);
  assert.match(js, /wgl-token-number">3<\/span>/);
  assert.ok(!js.includes('<script>'));
  assert.ok(!js.includes('wgl-token-keyword">let'));

  const glsl = highlightSource('#version 300 es\nprecision highp float;\nin vec2 a_position; // vec3 ignored\nvoid main() { gl_Position = vec4(0.0, 1.0, 0.0, 1.0); }', 'glsl');
  assert.match(glsl, /wgl-token-directive">#version 300 es<\/span>/);
  assert.match(glsl, /wgl-token-keyword">precision<\/span>/);
  assert.match(glsl, /wgl-token-type">vec2<\/span>/);
  assert.match(glsl, /wgl-token-builtin">gl_Position<\/span>/);
  assert.match(glsl, /wgl-token-number">0\.0<\/span>/);
  assert.ok(!glsl.includes('wgl-token-type">vec3'));

  const block = highlightSource('/* const fake = 2; */ const live = 1;', 'javascript');
  assert.match(block, /wgl-token-comment">\/\* const fake = 2; \*\/<\/span>/);
  assert.match(block, /wgl-token-keyword">const<\/span> live/);
  assert.equal(highlightSource('', 'glsl'), '');
});

test('WGL source editor keeps all textarea IDs and loads a local syntax-highlighter module', async () => {
  const html = await readFile(new URL('./wgl-lab.html', import.meta.url), 'utf8');
  const host = await readFile(new URL('./wgl-lab-host.mjs', import.meta.url), 'utf8');
  const css = await readFile(new URL('./wgl-lab.css', import.meta.url), 'utf8');
  for (const id of ['js-source', 'vertex-source', 'fragment-source']) {
    assert.ok(html.includes('id="' + id + '"'));
  }
  assert.ok(host.includes("import { highlightSource } from './wgl-lab-highlight.mjs'"));
  assert.ok(host.includes("editor.addEventListener('input', refresh)"));
  assert.ok(host.includes("highlight.scrollTop = editor.scrollTop"));
  assert.ok(host.includes("editor.wrap = 'soft'"));
  assert.ok(!host.includes("editor.wrap = 'off'"));
  assert.ok(!host.includes("highlight.scrollLeft = editor.scrollLeft"));
  assert.match(css, /white-space:pre-wrap;overflow-wrap:anywhere/);
  assert.match(css, /scrollbar-gutter:stable/);
  assert.match(css, /overflow-x:hidden;overflow-y:auto/);
  assert.match(css, /\.wgl-code-highlight code \{[^}]*overflow-wrap:inherit/);
  assert.ok(host.includes('refreshSourceHighlights();')); // programmatic reset/presets
  assert.match(css, /\.wgl-code-editor textarea\s*\{/);
  assert.match(css, /-webkit-text-fill-color:transparent/);
  assert.match(css, /pointer-events:none/);
});

// WGL4: 独立CPU基準・実ソース・共通ラボの追加検証。
import './wgl4-lab.test.mjs';

// WGL5: camera/projection/depth source and CPU oracle.
import './wgl5-lab.test.mjs';

// WGL6: perspective-correct UV, winding and aliasing oracle.
import './wgl6-lab.test.mjs';

// WGL8: algebraic source-over, sRGB conversion and independent GPU-pixel oracle.
import './wgl8-lab.test.mjs';

// WGL9: CPU inverse-transpose, Lambert/Blinn-Phong, ray/mesh lesson contract.
import './wgl9-lab.test.mjs';

// WGL10: RGBA8 attachment, resize, two passes, and independent CPU oracle.
import './wgl10-lab.test.mjs';

// WGL11: depth-only shadow-map FBO and independent ray-box CPU oracle.
import './wgl11-lab.test.mjs';

// WGL12: Fresnel/GGX CPU oracle and editable roughness/metallic WebGL2 lab.
import './wgl12-lab.test.mjs';

// WGL13: cube-map faces, reflection, seams and independent 12-pixel oracle.
import './wgl13-lab.test.mjs';

// WGL14: 3x3 convolution, boundary replication, positive Laplacian, Reinhard and 7 probes.
import './wgl14-lab.test.mjs';

// WGL15: CSS/device coordinates, ray-panel intersections, depth IDs and interactive sandbox.
import './wgl15-lab.test.mjs';

// WGL16: instance attribute divisors, draw-call counts and independent 6-pixel oracle.
import './wgl16-lab.test.mjs';
// WGL17: typed texture, quantization, and independent 8-point oracle.
import './wgl17-lab.test.mjs';

// WGL18: diffusion conservation/positivity and GPU float/CPU oracle.
import './wgl18-lab.test.mjs';

// WGL19: distinct simulation/render clocks, GPU float oracle and resource lifecycle.
import './wgl19-lab.test.mjs';

// FCG2: 8x8 analytic scalar field, R8 quantization and WebGL host.
import './fcg2-lab.test.mjs';

// FCG8: independently verify level-set advection, redistancing and pixel oracle
// in the regularly executed shared laboratory suite.
import './fcg8-lab.test.mjs';

test('FCG8 editable Level Set source and shared host are wired consistently', async () => {
  const root=new URL('../../textbook/volumes/dream_thater/計算系/FCG/FCG8/',import.meta.url);
  const [host,js,vert,frag]=await Promise.all([
    readFile(new URL('./wgl-lab-host.mjs',import.meta.url),'utf8'),
    readFile(new URL('levelset.js',root),'utf8'),
    readFile(new URL('levelset.vert',root),'utf8'),
    readFile(new URL('levelset.frag',root),'utf8')
  ]);
  assert.ok(host.includes("lesson === 'FCG8'"));
  assert.ok(host.includes("js:'levelset.js',vertex:'levelset.vert',fragment:'levelset.frag'"));
  assert.ok(host.includes('compareFCG8Readback('));
  assert.ok(host.includes("id='fcg8-cpu-prediction'"));
  assert.ok(host.includes('fcg8Steps++'));
  assert.ok(host.includes('fcg8Timer=setInterval('));
  assert.ok(host.includes("data.type === 'fcg8-pick'"));
  assert.match(js,/const N=48,h=1\/N,dt=0\.04/);
  assert.ok(js.includes('redistance(advect(reinit),redistanceIterations)'));
  assert.ok(js.includes("gl.texImage2D(gl.TEXTURE_2D,0,gl.R8,N,N"));
  assert.ok(js.includes("report('AREA'"));
  assert.ok(js.includes("report('DISTANCE'"));
  assert.ok(vert.startsWith('#version 300 es'));
  assert.ok(frag.startsWith('#version 300 es'));
  assert.ok(frag.includes('uniform vec2 u_particles[64]'));
  assert.ok(frag.includes('uniform sampler2D u_raw'));
  assert.ok(frag.includes('uniform sampler2D u_reinit'));
  assert.ok(frag.includes('outColor=vec4(rgb,1.0);'));
});

// Learner-first WebGL and fluid observation regressions run in the common lab suite.
import './wgl-fcg-visual.test.mjs';
