// WGL13: WebGL2 cube-map sampling and independent 12-pixel direction probes.
// Each 2x2 face has a different base hue and four different brightness levels.
const yawDegrees = 0; // try 90, -90, 180; rotates the sampling direction about Y
const fresnelF0 = 0.75; // Schlick mix at normal incidence; GUI starts from this source value
const sceneResolution = 128; // texels per side of each procedurally painted cube face
const initialShowSeams = false; // overlay major-axis boundaries on the same sphere shader
const faceColors = [
  [224,48,48], [48,224,48], [48,48,224],
  [224,224,48], [224,48,224], [48,224,224]
]; // +X, -X, +Y, -Y, +Z, -Z
const brightness = [0.55,0.70,0.85,1.0]; // texel order: lower-left, lower-right, upper-left, upper-right
if (!Number.isFinite(yawDegrees) || !Number.isFinite(fresnelF0) ||
    fresnelF0 < 0 || fresnelF0 > 1 || !Number.isInteger(sceneResolution) ||
    sceneResolution < 32 || sceneResolution > 512 || faceColors.length !== 6 ||
    faceColors.some(c => c.length !== 3 || c.some(v => !Number.isInteger(v) || v < 0 || v > 255))) {
  throw new RangeError('Require finite yaw, F0 in [0,1], and six RGB8 face colours');
}
function compile(type, source, stage) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error(stage + ': createShader failed');
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader) || 'no driver log';
    gl.deleteShader(shader);
    throw new Error(stage + ' compilation: ' + log);
  }
  return shader;
}
const vs = compile(gl.VERTEX_SHADER, vertexSource, 'VERTEX');
const fs = compile(gl.FRAGMENT_SHADER, fragmentSource, 'FRAGMENT');
const program = gl.createProgram();
if (!program) throw new Error('createProgram failed');
gl.attachShader(program, vs);
gl.attachShader(program, fs);
gl.linkProgram(program);
if (!gl.getProgramParameter(program, gl.LINK_STATUS))
  throw new Error('LINK: ' + (gl.getProgramInfoLog(program) || 'no driver log'));
gl.deleteShader(vs);
gl.deleteShader(fs);
gl.useProgram(program);
function uniform(name) {
  const loc = gl.getUniformLocation(program, name);
  if (loc === null) throw new Error('Missing uniform: ' + name);
  return loc;
}
const env = gl.createTexture();
if (!env) throw new Error('createTexture failed');
gl.activeTexture(gl.TEXTURE0);
gl.bindTexture(gl.TEXTURE_CUBE_MAP, env);
gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
for (let face = 0; face < 6; face++) {
  const bytes = new Uint8Array(16);
  for (let cell = 0; cell < 4; cell++) {
    for (let channel = 0; channel < 3; channel++)
      bytes[4 * cell + channel] = Math.round(faceColors[face][channel] * brightness[cell]);
    bytes[4 * cell + 3] = 255;
  }
  // All six faces must have the same dimensions, format and mip level.
  gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + face, 0, gl.RGBA8,
    2, 2, 0, gl.RGBA, gl.UNSIGNED_BYTE, bytes);
}
gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
gl.uniform1i(uniform('u_env'), 0);
gl.uniform2f(uniform('u_resolution'), canvas.width, canvas.height);
gl.uniform1f(uniform('u_yaw'), yawDegrees * Math.PI / 180);
gl.uniform1f(uniform('u_fresnelF0'), fresnelF0);
// Six axis centres, then six off-axis lower-left texels in face-local UV.
// Not rotated by yaw: probe the cube-map orientation separately from the illustration.
const dirs = [
  [1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1],
  [1,0.5,0.5],[-1,0.5,-0.5],[-0.5,1,-0.5],
  [-0.5,-1,0.5],[-0.5,0.5,1],[0.5,0.5,-1]
];
gl.uniform3fv(uniform('u_probeDirections[0]'),new Float32Array(dirs.flat()));
const probe = uniform('u_probe');
gl.disable(gl.BLEND);
gl.disable(gl.DITHER);
gl.disable(gl.DEPTH_TEST);
gl.disable(gl.SCISSOR_TEST);
gl.disable(gl.CULL_FACE);
const vertices = new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]);
const vao = gl.createVertexArray(), vbo = gl.createBuffer();
if (!vao || !vbo) throw new Error('createVertexArray/createBuffer failed');
gl.bindVertexArray(vao);
gl.bindBuffer(gl.ARRAY_BUFFER,vbo);
gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);
gl.enableVertexAttribArray(0);
gl.vertexAttribPointer(0,2,gl.FLOAT,false,0,0);
gl.viewport(0,0,canvas.width,canvas.height);
gl.uniform1i(probe,0);
gl.drawArrays(gl.TRIANGLES,0,6);
gl.viewport(0,0,12,1);
gl.uniform1i(probe,1);
gl.drawArrays(gl.TRIANGLES,0,6);
gl.finish();
const readback = new Uint8Array(12 * 4);
gl.readPixels(0,0,12,1,gl.RGBA,gl.UNSIGNED_BYTE,readback);
const err=gl.getError();
if (err !== gl.NO_ERROR) throw new Error('GL error: 0x'+err.toString(16));
// CPU oracle: explicitly select the major axis, orient each cube face,
// then apply nearest-neighbour selection in face-local 2x2 texel coordinates.
function selectFace(d) {
  const [x,y,z]=d, a=Math.abs(x),b=Math.abs(y),c=Math.abs(z);
  if (a>=b && a>=c) return x>0?[0,-z/a,-y/a]:[1,z/a,-y/a];
  if (b>=a && b>=c) return y>0?[2,x/b,z/b]:[3,x/b,-z/b];
  return z>0?[4,x/c,-y/c]:[5,-x/c,-y/c];
}
const expected=dirs.map(d=>{
  const [face,sc,tc]=selectFace(d);
  const col=(sc+1)/2>=0.5?1:0, row=(tc+1)/2>=0.5?1:0;
  const factor=brightness[2*row+col];
  return [...faceColors[face].map(v=>Math.round(v*factor)),255];
});
const errors=expected.map((e,i)=>Math.max(...e.map((v,k)=>Math.abs(v-readback[4*i+k]))));
report('CUBE MAP', '6 RGBA8 2x2 faces; +X,-X,+Y,-Y,+Z,-Z; 4 brightness cells per face');
report('MATERIAL', 'yaw='+yawDegrees+' deg, F0='+fresnelF0+'; display is a single-direction illustration');
report('PROBES','6 axis + 6 off-axis probes. CPU predicted RGB: '+expected.map(e=>e.slice(0,3).join('/')).join(' | '));
report('GPU READBACK',Array.from({length:12},(_,i)=>Array.from(readback.slice(4*i,4*i+3)).join('/')).join(' | '));
report('CHECK', errors.every(e=>e<=1)?'PASS: all 12 cube-face/orientation probes within 1 byte':'FAIL: max channel errors '+errors.join(','));
report('SEAMS','NEAREST and deliberately different face colours can show sharp edges; this checks mapping, not seamless filtering.');

// A 128x128 environment made from six genuine cube faces.  The colour is
// defined by the world direction, not by a separate fake sphere renderer.
// All six faces and the sphere are sampled using the same samplerCube shader.
function cubeDirection(face,s,t){
  const sc=2*s-1,tc=2*t-1;
  const d=face===0?[1,-tc,-sc]:
    face===1?[-1,-tc,sc]:
    face===2?[sc,1,tc]:
    face===3?[sc,-1,-tc]:
    face===4?[sc,-tc,1]:[-sc,-tc,-1];
  const len=Math.hypot(...d);
  return d.map(x=>x/len);
}
function sceneColor(d){
  const [x,y,z]=d;
  const longitude=Math.atan2(z,x);
  const skyline=0.015+0.045*Math.sin(7*longitude)+0.018*Math.cos(17*longitude);
  let c;
  if(y>skyline){
    const h=Math.min(1,Math.max(0,(y-skyline)*1.7));
    c=[Math.round(143-103*h),Math.round(183-111*h),Math.round(210-84*h)];
    // A sun and a broad bright halo stay fixed in world space.
    const sunDot=(0.45*x+0.57*y-0.69*z)/Math.hypot(0.45,0.57,0.69);
    const halo=Math.max(0,(sunDot-0.90)/0.10);
    c=c.map((v,k)=>Math.min(255,Math.round(v+(k===2?48:92)*halo*halo)));
    if(sunDot>0.995)c=[255,249,207];
    const cloud=Math.sin(13*x+5*z+3*y)*Math.cos(16*z-2*x+6*y);
    if(y>0.10 && y<0.54 && cloud>0.42)c=c.map(v=>Math.min(255,Math.round(v+33)));
  }else if(y>-0.16){
    // Buildings near the horizon; windows distinguish azimuths.
    const block=Math.floor((longitude+Math.PI)*16/Math.PI);
    const u=((longitude+Math.PI)*16/Math.PI)%1;
    const row=Math.floor((y+0.16)*70);
    const window=u>0.18&&u<0.82&&row%3===1;
    const v=window?150:41+(block%4)*9;
    c=[v,Math.round(v*.95),Math.round(v*.85)];
  }else{
    // Ground lines converge in the distance: a recognizable environment.
    const gx=x/Math.max(0.075,-y),gz=z/Math.max(0.075,-y);
    const fx=Math.abs(gx*2-Math.round(gx*2)),fz=Math.abs(gz*2-Math.round(gz*2));
    const line=fx<0.045||fz<0.045;
    const paving=(Math.floor(gx*2)+Math.floor(gz*2))%2===0;
    c=line?[216,203,148]:paving?[90,112,120]:[69,90,102];
    if(Math.abs(gx)<0.16)c=[166,103,51];
  }
  return c;
}
const scenery=gl.createTexture();
if(!scenery)throw new Error('createTexture scene failed');
gl.activeTexture(gl.TEXTURE1);
gl.bindTexture(gl.TEXTURE_CUBE_MAP,scenery);
gl.pixelStorei(gl.UNPACK_ALIGNMENT,1);
for(let face=0;face<6;face++){
  const pixels=new Uint8Array(sceneResolution*sceneResolution*4);
  for(let row=0;row<sceneResolution;row++){
    for(let col=0;col<sceneResolution;col++){
      const d=cubeDirection(face,(col+0.5)/sceneResolution,(row+0.5)/sceneResolution);
      const rgb=sceneColor(d),base=4*(row*sceneResolution+col);
      pixels.set([...rgb,255],base);
    }
  }
  gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X+face,0,gl.RGBA8,
    sceneResolution,sceneResolution,0,gl.RGBA,gl.UNSIGNED_BYTE,pixels);
}
gl.texParameteri(gl.TEXTURE_CUBE_MAP,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
gl.texParameteri(gl.TEXTURE_CUBE_MAP,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
gl.texParameteri(gl.TEXTURE_CUBE_MAP,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_CUBE_MAP,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_CUBE_MAP,gl.TEXTURE_WRAP_R,gl.CLAMP_TO_EDGE);
gl.uniform1i(uniform('u_scene'),1);
gl.activeTexture(gl.TEXTURE0);
const showSceneLoc=uniform('u_showScene'),seamsLoc=uniform('u_showSeams');
const chosenLoc=uniform('u_selectedPoint'),yawLoc=uniform('u_yaw');
const f0Loc=uniform('u_fresnelF0');
report('SCENE MAP', 'six '+sceneResolution+'x'+sceneResolution+
  ' generated cubemap faces share the sphere shader; 2x2 face map remains for 12 raw RGBA8 probes');
report('WHAT TO OBSERVE', 'large sphere = reflected direction; right net = six source faces. The highlighted tile is the selected point’s reflected face.');

if(typeof window!=='undefined' && typeof requestAnimationFrame==='function'){
  const faceNames=['+X','-X','+Y','-Y','+Z','-Z'];
  const prefersReduced=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches??false;
  let yaw=yawDegrees, f0=fresnelF0, sceneMode=true, seams=initialShowSeams;
  let selected=[0,0],playing=false,raf=0,previousFrame=0,drag=null;
  const section=document.createElement('section');
  section.setAttribute('aria-label','WGL13 反射球の操作');
  section.style.cssText='font:14px/1.6 system-ui;color:#e8f1fc;padding:8px 2px;max-width:100%;';
  const controls=document.createElement('div');
  controls.style.cssText='display:flex;flex-wrap:wrap;gap:8px 16px;align-items:center;margin-bottom:6px';
  section.append(controls);
  function control(label,element){
    const node=document.createElement('label');
    node.style.cssText='display:inline-flex;align-items:center;gap:6px';
    node.append(document.createTextNode(label),element);
    controls.append(node);
    return node;
  }
  function slider(name,min,max,step,value){
    const input=document.createElement('input');
    input.type='range';input.min=min;input.max=max;input.step=step;input.value=value;
    input.style.width='110px';input.setAttribute('aria-label',name);
    const display=document.createElement('output');
    display.textContent=String(value);
    const box=control(name,input);box.append(display);
    return [input,display];
  }
  const [yawSlider,yawNumber]=slider('環境の回転（°）',-180,180,5,yaw);
  const [fSlider,fNumber]=slider('正面反射率 F₀（0–1）',0,1,.05,f0);
  function button(text){
    const b=document.createElement('button');b.type='button';b.textContent=text;
    b.style.cssText='padding:5px 10px;border:1px solid #9eacc0;border-radius:3px;background:#172b45;color:#fff;cursor:pointer';
    controls.append(b);return b;
  }
  const mode=button('表示：風景128×128'),edges=button('境界線：非表示');
  const play=button('回転を再生'),reset=button('初期値へ');
  const status=document.createElement('output');
  status.setAttribute('role','status');status.setAttribute('aria-live','polite');
  status.style.cssText='display:block;white-space:normal;font-variant-numeric:tabular-nums';
  const legend=document.createElement('p');
  legend.style.cssText='margin:5px 0 0;color:#b7cde1;font:12px/1.5 ui-monospace,monospace';
  legend.textContent='右の展開図：　　　　+Y ／ -X  +Z  +X  -Z ／　　　　-Y （橙枠＝選択した反射方向）。球をクリックして点を選ぶ。ドラッグ/左右矢印＝環境回転。Space＝自動回転。';
  section.append(status,legend);
  canvas.insertAdjacentElement('afterend',section);
  canvas.tabIndex=0;
  canvas.style.touchAction='none';
  canvas.setAttribute('aria-label','実際のWebGL2反射球と6面の展開図。クリックして面を選び、左右矢印で回転');
  canvas.title='クリックで球面上の点を調査。ドラッグ・左右矢印で環境を回す。Spaceで回転を再生';
  function rotateDirection(d,radians){
    const c=Math.cos(radians),s=Math.sin(radians);
    return [c*d[0]+s*d[2],d[1],-s*d[0]+c*d[2]];
  }
  function faceUV(d){
    const [face,sc,tc]=selectFace(d);
    return {face,s:(sc+1)/2,t:(tc+1)/2};
  }
  function selectedInfo(){
    const [a,b]=selected, nz=Math.sqrt(Math.max(0,1-a*a-b*b));
    const n=[a,b,nz], dot=-nz;
    const reflection=[2*nz*a,2*nz*b,-1+2*nz*nz];
    const d=rotateDirection(reflection,yaw*Math.PI/180);
    const {face,s,t}=faceUV(d);
    const color=sceneMode?sceneColor(d):
      faceColors[face].map(c=>Math.round(c*brightness[
        2*Math.min(1,Math.floor(2*t))+Math.min(1,Math.floor(2*s))]));
    return {face,s,t,color,reflection,d,dot};
  }
  function paint(){
    gl.useProgram(program);gl.bindVertexArray(vao);
    gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_CUBE_MAP,env);
    gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_CUBE_MAP,scenery);
    gl.uniform1i(probe,0);
    gl.uniform1f(yawLoc,yaw*Math.PI/180);
    gl.uniform1f(f0Loc,f0);gl.uniform1i(showSceneLoc,sceneMode?1:0);
    gl.uniform1i(seamsLoc,seams?1:0);
    gl.uniform2f(chosenLoc,selected[0],selected[1]);
    gl.viewport(0,0,canvas.width,canvas.height);
    gl.drawArrays(gl.TRIANGLES,0,6);
    // Keep the original 12 diagnostic GPU pixels stable even while rotating.
    gl.viewport(0,0,12,1);gl.uniform1i(probe,1);
    gl.drawArrays(gl.TRIANGLES,0,6);
    gl.uniform1i(probe,0);
    const info=selectedInfo();
    status.textContent='選択した反射先：'+faceNames[info.face]+
      ' ／ 面内 (s,t)=('+info.s.toFixed(2)+', '+info.t.toFixed(2)+')'+
      ' ／ 入力RGB目安='+info.color.join(',')+
      ' ／ Y回転 '+yaw.toFixed(0)+'°'+
      ' ／ F₀='+f0.toFixed(2)+
      (playing?' ／ 自動回転中':' ／ 静止');
    yawSlider.value=yaw;yawNumber.textContent=yaw.toFixed(0);
    fSlider.value=f0;fNumber.textContent=f0.toFixed(2);
    play.textContent=playing?'回転を停止':'回転を再生';
  }
  function pause(){playing=false;previousFrame=0;}
  yawSlider.addEventListener('input',()=>{pause();yaw=Number(yawSlider.value);paint();});
  fSlider.addEventListener('input',()=>{pause();f0=Number(fSlider.value);paint();});
  mode.addEventListener('click',()=>{
    pause();sceneMode=!sceneMode;
    mode.textContent='表示：'+(sceneMode?'風景'+sceneResolution+'×'+sceneResolution:'面診断2×2');
    paint();
  });
  edges.addEventListener('click',()=>{
    pause();seams=!seams;edges.textContent='境界線：'+(seams?'表示':'非表示');
    paint();
  });
  play.addEventListener('click',()=>{playing=!playing;previousFrame=0;paint();});
  reset.addEventListener('click',()=>{
    pause();yaw=yawDegrees;f0=fresnelF0;selected=[0,0];
    sceneMode=true;seams=initialShowSeams;
    mode.textContent='表示：風景'+sceneResolution+'×'+sceneResolution;
    edges.textContent='境界線：'+(seams?'表示':'非表示');paint();
  });
  function normalizedSpherePoint(e){
    const rect=canvas.getBoundingClientRect();
    const x=(e.clientX-rect.left)/rect.width*canvas.width;
    const y=(rect.bottom-e.clientY)/rect.height*canvas.height;
    const split=canvas.width*.64;
    const radius=Math.min(split*.45,canvas.height*.43);
    const a=(x-split*.5)/radius,b=(y-canvas.height*.5)/radius;
    return x<split&&a*a+b*b<.98?[a,b]:null;
  }
  canvas.addEventListener('pointerdown',e=>{
    drag={x:e.clientX,y:e.clientY,yaw,moved:false};
    canvas.setPointerCapture?.(e.pointerId);canvas.focus();
  });
  canvas.addEventListener('pointermove',e=>{
    if(!drag)return;
    const dx=e.clientX-drag.x,dy=e.clientY-drag.y;
    if(Math.abs(dx)+Math.abs(dy)>5)drag.moved=true;
    if(drag.moved){
      pause();yaw=((drag.yaw+dx/Math.max(1,canvas.getBoundingClientRect().width)*360+540)%360)-180;
      paint();
    }
  });
  canvas.addEventListener('pointerup',e=>{
    if(drag && !drag.moved){
      const picked=normalizedSpherePoint(e);
      if(picked){pause();selected=picked;paint();}
    }
    drag=null;
  });
  canvas.addEventListener('pointercancel',()=>{drag=null;});
  canvas.addEventListener('keydown',e=>{
    if(e.key==='ArrowLeft'||e.key==='ArrowRight'){
      e.preventDefault();pause();yaw=((yaw+(e.key==='ArrowRight'?5:-5)+540)%360)-180;paint();
    }else if(e.key===' '||e.key==='Enter'){
      e.preventDefault();playing=!playing;previousFrame=0;paint();
    }
  });
  function frame(t){
    if(playing&&!document.hidden){
      if(previousFrame){
        const dt=Math.min(0.07,Math.max(0,(t-previousFrame)/1000));
        yaw=((yaw+25*dt+540)%360)-180;paint();
      }
      previousFrame=t;
    }else previousFrame=0;
    raf=requestAnimationFrame(frame);
  }
  raf=requestAnimationFrame(frame);
  window.addEventListener('pagehide',()=>cancelAnimationFrame(raf),{once:true});
  paint(); // first rendered frame: the same GL program and texture data as later frames
  if(prefersReduced)report('MOTION','reduced-motion preference: automatic rotation is off (also off by default)');
}
// GPU resources live until sandbox Stop/disposal. No second renderer exists.
