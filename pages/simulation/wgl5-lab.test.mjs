import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {depthAtDistance,perspectiveNdc,visibleObjectAtNdc,
  expectedWGL5Samples,compareWGL5Readback} from './wgl5-lab-core.mjs';
const near=(a,b,eps=1e-12)=>assert.ok(Math.abs(a-b)<eps,a+' != '+b);

test('WGL5 near/far map to depth 0/1 and nearer means smaller depth',()=>{
  near(depthAtDistance(1),0);near(depthAtDistance(9),1);
  near(depthAtDistance(2.5),.675);
  near(depthAtDistance(3.5),.8035714285714286);
  near(perspectiveNdc([0,0,-1],4/3)[2],-1);
  near(perspectiveNdc([0,0,-9],4/3)[2],1);
  near(perspectiveNdc([1,0,-2],4/3)[0],.375);
  assert.throws(()=>depthAtDistance(0),RangeError);
  assert.throws(()=>depthAtDistance(10),RangeError);
  assert.throws(()=>perspectiveNdc([0,0,0],1),RangeError);
});
test('WGL5 CPU ray-box intersection chooses nearer, farther and background',()=>{
  assert.equal(visibleObjectAtNdc([0,0],4/3).name,'near');
  assert.equal(visibleObjectAtNdc([.75/(3.5*4/3),0],4/3).name,'far');
  assert.equal(visibleObjectAtNdc([0,.7],4/3),null);
});
test('WGL5 pixel oracle accounts for aspect ratio and pixel centers',()=>{
  for(const [w,h] of [[320,240],[640,480],[64,64],[1024,512],[512,1024]]){
    const rows=expectedWGL5Samples(w,h);
    assert.deepEqual(rows.map(r=>r.visible),['near','far','background','background']);
    const gpu=rows.map(({x,y,rgba})=>({x,y,rgba:[...rgba]}));
    assert.ok(compareWGL5Readback(gpu,w,h).every(r=>r.pass));
    gpu[1].rgba=[0,0,0,255];
    assert.equal(compareWGL5Readback(gpu,w,h)[1].pass,false);
  }
});
test('WGL5 real JS and GLSL use projection, view, model, depth and two draws',async()=>{
  const root=new URL('../../textbook/volumes/dream_thater/計算系/WGL/WGL5/',import.meta.url);
  const [js,vert,frag]=await Promise.all(['camera.js','camera.vert','camera.frag']
    .map(f=>readFile(new URL(f,root),'utf8')));
  assert.match(js,/gl\.enable\(gl\.DEPTH_TEST\)/);
  assert.match(js,/gl\.clear\(gl\.COLOR_BUFFER_BIT\|gl\.DEPTH_BUFFER_BIT\)/);
  assert.match(js,/gl\.uniformMatrix4fv\(uProjection,false,proj\)/);
  assert.match(js,/gl\.drawElements\(gl\.TRIANGLES,36,gl\.UNSIGNED_SHORT,0\)/);
  assert.match(js,/const projectionMode='perspective'/);
  assert.match(vert,/u_projection \* u_view \* u_model/);
  assert.match(frag,/outColor = u_color/);
  const host=await readFile(new URL('./wgl-lab-host.mjs',import.meta.url),'utf8');
  assert.ok(host.includes("isWGL5 ? {js: 'camera.js'"));
  assert.ok(host.includes('expectedWGL5Samples(payload.width,payload.height)'));
  assert.ok(host.includes('compareWGL5Readback'));
});

test('WGL5 orbit moves yaw, pitch and distance in the editable camera model',async()=>{
  const js=await readFile(new URL('../../textbook/volumes/dream_thater/計算系/WGL/WGL5/camera.js',import.meta.url),'utf8');
  for(const marker of ['manualYaw','manualPitch','manualZoom',
    "canvas.addEventListener('pointermove'", "canvas.addEventListener('wheel'",
    "canvas.addEventListener('keydown'",'Math.sin(yaw)*Math.cos(pitch)',
    "gl.uniformMatrix4fv(uView,false,eyeView)","motionMedia.addEventListener('change'"]){
    assert.ok(js.includes(marker),marker);
  }
  assert.ok(js.indexOf('// The initial four CPU/GPU rays')>
    js.indexOf("report('FRUSTUM'"),'time-varying orbit must follow the baseline GPU pass');
});
