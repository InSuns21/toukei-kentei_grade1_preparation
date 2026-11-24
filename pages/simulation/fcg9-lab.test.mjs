import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {referenceFCG9,expectedFCG9Samples,compareFCG9Readback} from './fcg9-lab-core.mjs';
const js=await readFile(new URL('../../textbook/volumes/dream_thater/計算系/FCG/FCG9/surface.js',import.meta.url),'utf8');
function run(options={}){
  const source=Object.entries(options).reduce((s,[k,v])=>s.replace(new RegExp('const '+k+'=[^;]+;'),'const '+k+'='+JSON.stringify(v)+';'),js);
  const noOp=()=>{},gl=new Proxy({COMPILE_STATUS:1,LINK_STATUS:2,
    getShaderParameter:()=>true,getProgramParameter:()=>true,getUniformLocation:()=>1},
    {get:(o,k)=>k in o?o[k]:typeof k==='string'&&k===k.toUpperCase()?1:noOp});
  return new Function('gl','canvas','vertexSource','fragmentSource','report','settings',source)(gl,{width:960,height:480},'', '',noOp,{});
}
test('actual editable FCG9 numerical field, crossing coordinates and seam degree match independent CPU',()=>{
  for(const options of [{N:12,steps:0},{N:24,steps:12},{N:96,steps:24}]){
    const result=run(options),ref=referenceFCG9(options);
    assert.equal(result.mesh.vertices.length,ref.edges.size);
    assert.equal(result.mesh.segments.length,ref.segments.length);
    assert.ok(result.mesh.degree.every(d=>d===2));
    for(const [k,v] of result.field.entries())assert.ok(Math.abs(v-ref.rows[Math.floor(k/ref.N)][k%ref.N])<1e-12);
    for(const v of result.mesh.vertices){
      const p=ref.edges.get(v.edge.join(':')).p;
      assert.ok(Math.hypot(p[0]-v.p[0],p[1]-v.p[1])<1e-12);
    }
    const length=ref.segments.reduce((s,[a,b])=>s+Math.hypot(a.p[0]-b.p[0],a.p[1]-b.p[1]),0);
    assert.ok(Math.abs(length-result.mesh.perimeter)<1e-12);
  }
});
test('the two saddle signs pair different edges; exact-zero policy is deterministic',()=>{
  const {extract}=run(),N=12,a=5+5*N;
  function local(values){
    const phi=new Float64Array(N*N).fill(5);
    [a,a+1,a+N+1,a+N].forEach((k,i)=>phi[k]=values[i]);
    const m=extract(phi),edges=[[a,a+1],[a+1,a+N+1],[a+N,a+N+1],[a,a+N]].map(e=>e.join(':'));
    return m.segments.map(s=>s.map(i=>edges.indexOf(m.vertices[i].edge.join(':'))))
      .filter(s=>s.every(i=>i>=0)).map(s=>s.slice().sort().join(':')).sort();
  }
  assert.deepEqual(local([-2,1,-2,1]),['0:1','2:3']);
  assert.deepEqual(local([-1,2,-1,2]),['0:3','1:2']);
  assert.deepEqual(local([-1,1,-1,1]),['0:1','2:3']);
});
test('independent shaded-pixel oracle covers both orientations and rejects corrupt readback',()=>{
  for(const [w,h] of [[960,480],[720,960]]){
    const expected=expectedFCG9Samples(w,h);
    assert.ok(expected.some(p=>p.label==='側面内点の陰影'));
    assert.ok(compareFCG9Readback(expected,w,h).every(p=>p.pass));
    assert.ok(compareFCG9Readback(expected.map(p=>({...p,rgba:[255,0,0,255]})),w,h).every(p=>!p.pass));
  }
});
