// WGL5: 2つの立方体を view・projection・深度テストで描く。JS/GLSLは共通ラボで編集できる。
const projectionMode='perspective'; // 'perspective' / 'orthographic'
const eye=[0,0,1], target=[0,0,0], worldUp=[0,1,0];
const nearPlane=1, farPlane=9, fovYDegrees=90;
const nearCenter=[-.15,0,-2], farCenter=[.4,0,-3];
const depthEnabled=true;
if(!['perspective','orthographic'].includes(projectionMode)) throw new RangeError('投影モードが不正');
if(![...eye,...target,...worldUp,nearPlane,farPlane,fovYDegrees,
  ...nearCenter,...farCenter].every(Number.isFinite)) throw new RangeError('有限値が必要');
if(!(nearPlane>0 && farPlane>nearPlane && fovYDegrees>0 && fovYDegrees<180))
  throw new RangeError('0<nearPlane<farPlane、0<fovYDegrees<180 が必要');
const dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
function unit(v){const n=Math.hypot(...v);if(!(n>1e-7))throw new RangeError('視線とupが退化');
  return v.map(x=>x/n);}
// 前方f、右r、上u、後方b=-f。view行列の行はそれぞれの軸と原点補正。
const forward=unit(target.map((x,i)=>x-eye[i]));
const right=unit(cross(forward,worldUp)),back=forward.map(x=>-x),up=cross(back,right);
const view=new Float32Array([
  right[0],up[0],back[0],0, right[1],up[1],back[1],0,
  right[2],up[2],back[2],0, -dot(right,eye),-dot(up,eye),-dot(back,eye),1
]);
const aspect=canvas.width/canvas.height;
const proj=new Float32Array(16);
if(projectionMode==='perspective'){
  const cot=1/Math.tan(fovYDegrees*Math.PI/360);
  proj.set([cot/aspect,0,0,0, 0,cot,0,0,
    0,0,-(farPlane+nearPlane)/(farPlane-nearPlane),-1,
    0,0,-2*farPlane*nearPlane/(farPlane-nearPlane),0]);
}else{
  const halfHeight=2,halfWidth=aspect*halfHeight;
  proj.set([1/halfWidth,0,0,0, 0,1/halfHeight,0,0,
    0,0,-2/(farPlane-nearPlane),0, 0,0,-(farPlane+nearPlane)/(farPlane-nearPlane),1]);
}
function translation([x,y,z]){
  return new Float32Array([1,0,0,0, 0,1,0,0, 0,0,1,0, x,y,z,1]);
}
function compile(kind,source,stage){
  const s=gl.createShader(kind);if(!s)throw new Error(stage+': createShader失敗');
  gl.shaderSource(s,source);gl.compileShader(s);
  if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){
    const log=gl.getShaderInfoLog(s)||'ログなし';gl.deleteShader(s);
    throw new Error(stage+' compile: '+log);
  }return s;
}
const vs=compile(gl.VERTEX_SHADER,vertexSource,'VERTEX');
const fs=compile(gl.FRAGMENT_SHADER,fragmentSource,'FRAGMENT');
const program=gl.createProgram();if(!program)throw new Error('program作成失敗');
gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);
if(!gl.getProgramParameter(program,gl.LINK_STATUS))
  throw new Error('LINK: '+(gl.getProgramInfoLog(program)||'ログなし'));
gl.deleteShader(vs);gl.deleteShader(fs);
// 8頂点と12面三角形を両立方体で共有する。
const xyz=new Float32Array([
  -.5,-.5,.5, .5,-.5,.5, .5,.5,.5, -.5,.5,.5,
  -.5,-.5,-.5, .5,-.5,-.5, .5,.5,-.5, -.5,.5,-.5
]);
const indices=new Uint16Array([
  0,1,2,0,2,3, 4,6,5,4,7,6, 4,0,3,4,3,7,
  1,5,6,1,6,2, 3,2,6,3,6,7, 4,5,1,4,1,0
]);
const vao=gl.createVertexArray(),vbo=gl.createBuffer(),ebo=gl.createBuffer();
if(!vao||!vbo||!ebo)throw new Error('VAO/Buffer作成失敗');
gl.bindVertexArray(vao);gl.bindBuffer(gl.ARRAY_BUFFER,vbo);
gl.bufferData(gl.ARRAY_BUFFER,xyz,gl.STATIC_DRAW);
gl.enableVertexAttribArray(0);gl.vertexAttribPointer(0,3,gl.FLOAT,false,12,0);
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ebo);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,indices,gl.STATIC_DRAW);
gl.useProgram(program);
const loc=name=>{const p=gl.getUniformLocation(program,name);
  if(p===null)throw new Error('uniformがshaderに無い: '+name);return p;};
const uView=loc('u_view'),uProjection=loc('u_projection');
const uModel=loc('u_model'),uColor=loc('u_color');
gl.uniformMatrix4fv(uView,false,view);gl.uniformMatrix4fv(uProjection,false,proj);
gl.viewport(0,0,canvas.width,canvas.height);
gl.disable(gl.BLEND);gl.disable(gl.DITHER);gl.disable(gl.CULL_FACE);
gl.clearColor(0,0,0,1);gl.clearDepth(1);
if(depthEnabled){gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LESS);}
else gl.disable(gl.DEPTH_TEST);
gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.bindVertexArray(vao);
// 手前→奥の順。深度が無効だと後から描く奥が重なりを上書きする。
gl.uniformMatrix4fv(uModel,false,translation(nearCenter));
gl.uniform4f(uColor,.9,.3,.2,1);gl.drawElements(gl.TRIANGLES,36,gl.UNSIGNED_SHORT,0);
gl.uniformMatrix4fv(uModel,false,translation(farCenter));
gl.uniform4f(uColor,.2,.6,.9,1);gl.drawElements(gl.TRIANGLES,36,gl.UNSIGNED_SHORT,0);
gl.flush();
report('CAMERA','eye='+eye.join(',')+' target='+target.join(',')+' projection='+projectionMode);
report('FRUSTUM','near='+nearPlane+' far='+farPlane+' fovY='+fovYDegrees+
  ' aspect='+aspect.toFixed(3)+' depthBits='+gl.getParameter(gl.DEPTH_BITS));
report('GEOMETRY','8頂点・36添字の立方体を2回描画、手前=橙、奥=青、深度テスト='+depthEnabled);
for(const [name,d] of [['NEAR_FRONT',2.5],['FAR_FRONT',3.5]]){
  const z=(farPlane+nearPlane)/(farPlane-nearPlane)-
    2*farPlane*nearPlane/((farPlane-nearPlane)*d);
  report(name,'標準視点の前面距離='+d+' NDC z='+z.toFixed(6)+
    ' depth='+(0.5*z+0.5).toFixed(6));
}


// The initial four CPU/GPU rays above remain a deterministic snapshot.
// This orbit uses the *same* source-defined matrices, meshes and GPU program.
// Yaw, pitch and distance can now be explored on all three camera axes;
// no separate demonstration renderer or independent camera model is introduced.
const motionMedia=window.matchMedia('(prefers-reduced-motion: reduce)');
let wgl5Playing=!motionMedia.matches, wgl5Stamp=null, wgl5Phase=0;
let manualYaw=0,manualPitch=0,manualZoom=1,dragPoint=null;
const limit=(x,a,b)=>Math.max(a,Math.min(b,x));
const baseOffset=eye.map((value,k)=>value-target[k]);
const baseRadius=Math.hypot(...baseOffset);
const baseYaw=Math.atan2(baseOffset[0],baseOffset[2]);
const basePitch=Math.asin(limit(baseOffset[1]/baseRadius,-1,1));
canvas.tabIndex=0;
canvas.style.touchAction='none';
canvas.setAttribute('aria-label',
  'WGL5 手前の橙と奥の青い立方体。ドラッグで水平・上下に視点移動、ホイールで距離調整、Spaceで自動周回停止、Rで初期視点');
canvas.title='ドラッグ：視点の水平・上下移動／ホイール：距離／Space：自動周回／R：初期視点';
const viewNote=document.createElement('output');
viewNote.setAttribute('aria-live','off');
viewNote.style.cssText='position:absolute;left:8px;top:8px;max-width:calc(100% - 16px);'+
  'padding:4px 7px;background:rgba(3,13,27,.86);color:white;'+
  'font:12px/1.5 system-ui;pointer-events:none;white-space:pre-wrap';
document.body.style.position='relative';
canvas.insertAdjacentElement('afterend',viewNote);
function pauseOrbit(){wgl5Playing=false;wgl5Stamp=null;}
function toggleOrbit(){wgl5Playing=!wgl5Playing;wgl5Stamp=null;updateOrbit();}
function updateOrbit(){
  const yaw=baseYaw+0.58*Math.sin(wgl5Phase)+manualYaw;
  const pitch=limit(basePitch+0.34*Math.sin(.71*wgl5Phase)+manualPitch,-1.25,1.25);
  const radius=baseRadius*limit(manualZoom*(1+.22*Math.sin(.53*wgl5Phase)),.72,3.5);
  const orbit=[target[0]+radius*Math.sin(yaw)*Math.cos(pitch),
    target[1]+radius*Math.sin(pitch),
    target[2]+radius*Math.cos(yaw)*Math.cos(pitch)];
  const forward=unit(target.map((v,k)=>v-orbit[k]));
  const right=unit(cross(forward,worldUp));
  const back=forward.map(v=>-v),up=cross(back,right);
  const eyeView=new Float32Array([
    right[0],up[0],back[0],0,right[1],up[1],back[1],0,
    right[2],up[2],back[2],0,
    -dot(right,orbit),-dot(up,orbit),-dot(back,orbit),1
  ]);
  gl.useProgram(program);gl.bindVertexArray(vao);
  gl.uniformMatrix4fv(uView,false,eyeView);
  gl.uniformMatrix4fv(uProjection,false,proj);
  gl.viewport(0,0,canvas.width,canvas.height);
  gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
  gl.uniformMatrix4fv(uModel,false,translation(nearCenter));
  gl.uniform4f(uColor,.9,.3,.2,1);
  gl.drawElements(gl.TRIANGLES,36,gl.UNSIGNED_SHORT,0);
  gl.uniformMatrix4fv(uModel,false,translation(farCenter));
  gl.uniform4f(uColor,.2,.6,.9,1);
  gl.drawElements(gl.TRIANGLES,36,gl.UNSIGNED_SHORT,0);
  viewNote.textContent='視点 E = ('+orbit.map(v=>v.toFixed(2)).join(', ')+')'+
    ' ／水平 '+((yaw-baseYaw)*180/Math.PI).toFixed(0)+'°'+
    '・仰角 '+(pitch*180/Math.PI).toFixed(0)+'°\n'+
    'ドラッグ：水平/上下　ホイール：距離　Space：'+
    (wgl5Playing?'停止':'再生')+'　R：初期';
}
canvas.addEventListener('pointerdown',event=>{
  if(event.button!==0)return;
  canvas.focus();pauseOrbit();
  dragPoint={id:event.pointerId,x:event.clientX,y:event.clientY};
  canvas.setPointerCapture(event.pointerId);
});
canvas.addEventListener('pointermove',event=>{
  if(!dragPoint||event.pointerId!==dragPoint.id)return;
  const rect=canvas.getBoundingClientRect();
  manualYaw+=(event.clientX-dragPoint.x)/Math.max(1,rect.width)*2.4;
  manualPitch=limit(manualPitch-(event.clientY-dragPoint.y)/
    Math.max(1,rect.height)*1.6,-1.2,1.2);
  dragPoint={id:event.pointerId,x:event.clientX,y:event.clientY};
  updateOrbit();
});
const release=event=>{if(dragPoint?.id===event.pointerId)dragPoint=null;};
canvas.addEventListener('pointerup',release);
canvas.addEventListener('pointercancel',release);
canvas.addEventListener('wheel',event=>{
  event.preventDefault();pauseOrbit();
  manualZoom=limit(manualZoom*Math.exp(event.deltaY*.001),.72,3.2);
  updateOrbit();
},{passive:false});
canvas.addEventListener('keydown',event=>{
  if(event.key===' '||event.key==='Enter'){
    event.preventDefault();toggleOrbit();
  }else if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)){
    event.preventDefault();pauseOrbit();
    if(event.key==='ArrowLeft')manualYaw-=.12;
    if(event.key==='ArrowRight')manualYaw+=.12;
    if(event.key==='ArrowUp')manualPitch=limit(manualPitch+.1,-1.2,1.2);
    if(event.key==='ArrowDown')manualPitch=limit(manualPitch-.1,-1.2,1.2);
    updateOrbit();
  }else if(event.key==='r'||event.key==='R'){
    event.preventDefault();pauseOrbit();
    manualYaw=manualPitch=0;manualZoom=1;wgl5Phase=0;updateOrbit();
  }
});
const onMotionChange=event=>{if(event.matches){pauseOrbit();updateOrbit();}};
motionMedia.addEventListener('change',onMotionChange);
function wgl5Frame(stamp){
  if(wgl5Playing&&!document.hidden){
    if(wgl5Stamp===null)wgl5Stamp=stamp;
    const dt=Math.min(.08,Math.max(0,(stamp-wgl5Stamp)/1000));
    wgl5Stamp=stamp;wgl5Phase+=dt*.72;
    updateOrbit();
  }else wgl5Stamp=null;
  wgl5Raf=requestAnimationFrame(wgl5Frame);
}
let wgl5Raf=requestAnimationFrame(wgl5Frame);
window.addEventListener('pagehide',()=>{
  cancelAnimationFrame(wgl5Raf);
  motionMedia.removeEventListener('change',onMotionChange);
},{once:true});
