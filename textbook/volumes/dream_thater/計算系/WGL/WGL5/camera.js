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


// Visual observation after the deterministic readPixels snapshot.
// This intentionally uses *the same editable* camera matrices, geometry,
// program and depth settings as the initial oracle. The GL runner reads the
// original snapshot synchronously; requestAnimationFrame then animates only
// its display. Stop/dispose removes the containing sandbox and this loop.
const motionMedia=window.matchMedia('(prefers-reduced-motion: reduce)');
let wgl5Playing=!motionMedia.matches, wgl5Start=null, wgl5Phase=0;
canvas.tabIndex=0;
canvas.setAttribute('aria-label','WGL5 視点の往復アニメーション。クリックかSpaceで再生・停止');
canvas.title='クリック／Space：視点の再生・停止（初期画素検算は時刻0のスナップショット）';
function wgl5Toggle(){wgl5Playing=!wgl5Playing;wgl5Start=null;}
canvas.addEventListener('click',wgl5Toggle);
canvas.addEventListener('keydown',e=>{
  if(e.key===' '||e.key==='Enter'){e.preventDefault();wgl5Toggle();}
});
function wgl5DrawOrbit(phase){
  const displacement=eye.map((v,i)=>v-target[i]);
  const a=0.50*Math.sin(phase),ca=Math.cos(a),sa=Math.sin(a);
  const orbit=[target[0]+ca*displacement[0]+sa*displacement[2],
    eye[1],target[2]-sa*displacement[0]+ca*displacement[2]];
  const f=unit(target.map((v,i)=>v-orbit[i]));
  const r=unit(cross(f,worldUp)),bb=f.map(v=>-v),uu=cross(bb,r);
  const eyeView=new Float32Array([
    r[0],uu[0],bb[0],0, r[1],uu[1],bb[1],0,
    r[2],uu[2],bb[2],0, -dot(r,orbit),-dot(uu,orbit),-dot(bb,orbit),1
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
}
function wgl5Frame(stamp){
  if(wgl5Playing&&!document.hidden){
    if(wgl5Start===null)wgl5Start=stamp;
    const elapsed=Math.min(0.08,Math.max(0,(stamp-wgl5Start)/1000));
    wgl5Start=stamp;
    wgl5Phase+=elapsed*.8;
    wgl5DrawOrbit(wgl5Phase);
  }else{wgl5Start=null;}
  requestAnimationFrame(wgl5Frame);
}
requestAnimationFrame(wgl5Frame);
