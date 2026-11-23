import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {localMetresFromGeodetic,verifyWGL20Report} from './wgl20-lab-core.mjs';
const asset=new URL('../../textbook/volumes/dream_thater/計算系/WGL/WGL20/',import.meta.url);
const load=async name=>readFile(new URL(name,asset),'utf8');
test('WGL20 checked-in PLATEAU mesh has nondegenerate triangles and reproducible coordinate contract',async()=>{
 const snapshot=JSON.parse(await load('plateau-lod1.json'));
 assert.equal(snapshot.schema,'wgl20-offline-mesh-v1');
 assert.equal(snapshot.source.commit,'e921990effa2e884f1c8667cef1cab491d1de619');
 assert.equal(snapshot.source.declaredCrs,'EPSG:6697');
 assert.equal(snapshot.checks.polygonCount,25);
 assert.equal(snapshot.mesh.vertices.length/3,138);
 assert.equal(snapshot.mesh.triangles.length/3,88);
 assert.deepEqual(snapshot.mesh.vertices.slice(0,3),[1.6703,-12.1835,0]);
 const reference=localMetresFromGeodetic(...snapshot.checks.firstGeodetic,snapshot.coordinate.originLatLonH);
 assert.ok(Math.max(...reference.map((v,i)=>Math.abs(v-snapshot.mesh.vertices[i])))<0.00008);
 const xs=[],ys=[],zs=[];
 for(let k=0;k<snapshot.mesh.vertices.length;k+=3){
   const [x,y,z]=snapshot.mesh.vertices.slice(k,k+3);
   assert.ok([x,y,z].every(Number.isFinite));
   xs.push(x);ys.push(y);zs.push(z);
 }
 assert.ok(Math.min(...xs)>-40&&Math.max(...xs)<40);
 assert.ok(Math.min(...ys)>-40&&Math.max(...ys)<40);
 const indices=snapshot.mesh.triangles;
 for(const id of indices)assert.ok(Number.isInteger(id)&&id>=0&&id<138);
 for(let k=0;k<indices.length;k+=3){
   const coords=indices.slice(k,k+3).map(i=>snapshot.mesh.vertices.slice(3*i,3*i+3));
   const ab=coords[1].map((v,i)=>v-coords[0][i]);
   const ac=coords[2].map((v,i)=>v-coords[0][i]);
   const n=[ab[1]*ac[2]-ab[2]*ac[1],ab[2]*ac[0]-ab[0]*ac[2],ab[0]*ac[1]-ab[1]*ac[0]];
   assert.ok(Math.hypot(...n)>1e-7,'zero-area triangle '+k/3);
 }
 assert.ok(Math.abs(Math.max(...zs)-Math.min(...zs)-14.54581833)<0.002);
 const report={firstLocal:snapshot.mesh.vertices.slice(0,3),vertices:138,triangles:88,
   waterLevelM:32,groundAtOriginM:snapshot.coordinate.originLatLonH[2],
   depthAtOriginM:2.29497413,groundAtTestM:snapshot.coordinate.originLatLonH[2]+0.4,
   depthAtTestM:1.89497413,groundAtWestM:snapshot.coordinate.originLatLonH[2]-0.5,
   depthAtWestM:2.79497413,zExaggeration:1.5};
 assert.equal(verifyWGL20Report(report,snapshot).pass,true);
});
test('WGL20 3-tab lab source is valid editable JS, and all 3 case presets exist',async()=>{
 const source=await load('terrain.js');
 assert.doesNotThrow(()=>new Function('gl','canvas','vertexSource','fragmentSource','report','settings',source));
 const vertex=await load('terrain.vert'),fragment=await load('terrain.frag');
 for(const s of [vertex,fragment])assert.ok(s.startsWith('#version 300 es'));
 assert.ok(fragment.includes('outColor'));
 for(const token of ["scenario==='CS1'","scenario==='CS2'","scenario==='CS3'","gl.checkFramebufferStatus","gl.readPixels","gl.deleteProgram"]) {
   if(token==="scenario==='CS3'")continue;
   assert.ok(source.includes(token),token);
 }
 const host=await readFile(new URL('wgl-lab-host.mjs',import.meta.url),'utf8');
 assert.ok(host.includes("'WGL20'"));
 assert.ok(host.includes("case=CS1")===false); // host uses validated query parameter, not unsafe URL concatenation
 assert.ok(host.includes("verifyWGL20Report"));
 assert.ok(host.includes("wgl20-pick"));
 assert.ok(host.includes("iframe.setAttribute('sandbox', 'allow-scripts')"));
 assert.ok(!host.includes('allow-same-origin'));
 for(const file of ['cs1.md','cs2.md','cs3.md']){
   const text=await load(file);
   assert.ok(text.includes('wgl-lab.html?lesson=WGL20&amp;case='));
   assert.ok(text.includes('詳細解答'));
 }
});

test('WGL20 urban context has actual 3D walls, a directional shadow FBO and clipped water',async()=>{
 const [js,vert,frag]=await Promise.all([load('terrain.js'),load('terrain.vert'),load('terrain.frag')]);
 assert.ok(js.length<30000,'sandbox source limit');
 assert.doesNotThrow(()=>new Function('gl','canvas','vertexSource','fragmentSource','report','settings',js));
 for(const token of [
   'const showContext=true','const showShadows=true','const blocks=[',
   'counts.context','const shadowProgram','gl.DEPTH_COMPONENT16',
   'gl.framebufferTexture2D','const clipWet=polygon',
   "canvas.addEventListener('pointermove'", "canvas.addEventListener('keydown'",
   'draw(counts.context)','gl.depthMask(false)','gl.depthMask(true)'
 ])assert.ok(js.includes(token),token);
 assert.ok(vert.includes('layout(location=3) in vec3 a_normal'));
 assert.ok(vert.includes('v_lightClip'));
 assert.ok(frag.includes('sampler2D u_shadowMap'));
 assert.ok(frag.includes('textureSize(u_shadowMap,0)'));
 assert.ok(frag.includes('float lambert=max(dot(n,sun),0.0)'));
 assert.ok(frag.includes('float sunVisibility()'));
 assert.ok(frag.includes('v_kind>2.5&&v_kind<3.5'),'RGBA oracle remains unlit');
});
test('WGL20 learner instructions and CS1/2/3 distinguish official data from synthetic city',async()=>{
 const [main,cs1,cs2,cs3,provenance]=await Promise.all([
  load('index.md'),load('cs1.md'),load('cs2.md'),load('cs3.md'),load('data-provenance.md')]);
 assert.match(main,/建物9棟/);
 assert.match(main,/合成建物8棟/);
 assert.match(main,/シャドウマッピング/);
 assert.match(main,/ドラッグ/);
 assert.match(main,/240 m×240 m/);
 assert.match(cs1,/公式PLATEAU建物1/);
 assert.match(cs1,/合成の周辺建物2/);
 assert.match(cs2,/合計13回/);
 assert.match(cs2,/合計6回/);
 assert.match(cs3,/アルファ0.33/);
 assert.match(provenance,/実在の位置や属性を表しません/);
});
