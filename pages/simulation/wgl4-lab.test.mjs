import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {worldPoint,localPoint,referenceCorners,expectedWGL4Samples,compareWGL4Readback}
  from './wgl4-lab-core.mjs';

const near = (a,b) => assert.ok(Math.abs(a-b)<1e-6, a+' != '+b);
test('WGL4 independent CPU geometry: four corners, inverse and composition order',()=>{
  const expected=[[0.4,-0.5],[0.4,0.3],[0.1,0.3],[0.1,-0.5]];
  referenceCorners().forEach((point,i)=>{
    point.forEach((v,j)=>near(v,expected[i][j]));
    localPoint(point).forEach((v,j)=>near(v,[[-.4,-.3],[.4,-.3],[.4,.3],[-.4,.3]][i][j]));
  });
  // T*R applies rotation first, then translation; R*T is generally different.
  worldPoint([1,0]).forEach((v,j)=>near(v,[.25,.9][j]));
  const rt=[.1,1.25];
  assert.ok(Math.abs(worldPoint([1,0])[0]-rt[0])>.1);
  assert.throws(()=>localPoint([0,0],{sx:0,sy:1}),RangeError);
});
test('WGL4 oracle uses post-rounding pixel centers and catches pixel mismatches',()=>{
  for(const [w,h] of [[320,240],[640,480],[64,64],[1024,512]]) {
    const rows=expectedWGL4Samples(w,h);
    assert.deepEqual(rows.map(r=>r.inside),[true,true,false,false]);
    const gpu=rows.map(({x,y,rgba})=>({x,y,rgba:[...rgba]}));
    assert.ok(compareWGL4Readback(gpu,w,h).every(r=>r.pass));
    gpu[0].rgba=[0,0,0,255];
    assert.equal(compareWGL4Readback(gpu,w,h)[0].pass,false);
  }
});
test('WGL4 source uses column-major uniformMatrix4fv and two colored axes',async()=>{
  const root=new URL('../../textbook/volumes/dream_thater/計算系/WGL/WGL4/',import.meta.url);
  const [js,vert,frag]=await Promise.all(['model.js','model.vert','model.frag']
    .map(f=>readFile(new URL(f,root),'utf8')));
  assert.match(js,/gl\.uniformMatrix4fv\(modelLocation, false, model\)/);
  assert.match(js,/const model = multiply4\(multiply4\(T, R\), S\)/);
  assert.match(js,/gl\.drawElements\(gl\.TRIANGLES, 6/);
  assert.match(js,/gl\.drawArrays\(gl\.LINES, 0, 2\)/);
  assert.match(js,/gl\.drawArrays\(gl\.LINES, 2, 2\)/);
  assert.match(vert,/gl_Position = u_model \* vec4\(a_position, 1\.0\)/);
  assert.match(frag,/outColor = u_color/);
});
