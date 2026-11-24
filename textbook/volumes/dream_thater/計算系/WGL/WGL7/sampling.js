// WGL7: one texture and shader, two sampler settings.
// First draw the flat numerical probe; then show the same texture on a receding floor.
// The observation controls update these same WebGL uniforms and sampler parameters.
const textureKind = 'checker'; // 'checker' or 'data'
const repeats = 128;           // observation density: 128 = 2 repeats across the floor
const wrapMode = 'repeat';      // 'repeat', 'clamp', or 'mirror'
const leftMinFilter = 'nearest'; // 'nearest' or 'linear'
const rightMinFilter = 'mipmap'; // 'mipmap', 'nearest', or 'linear'
const offset = [0.017125, 0.0365]; // non-boundary probe coordinates
if (!['checker','data'].includes(textureKind) ||
    !['repeat','clamp','mirror'].includes(wrapMode) ||
    !['nearest','linear','mipmap','nearest-mip-nearest','linear-mip-nearest','nearest-mip-linear'].includes(leftMinFilter) ||
    !['nearest','linear','mipmap','nearest-mip-nearest','linear-mip-nearest','nearest-mip-linear'].includes(rightMinFilter) ||
    !(Number.isFinite(repeats) && repeats > 0 && repeats <= 256)) {
  throw new RangeError('invalid texture experiment settings');
}
const size = textureKind === 'checker' ? 8 : 4;
const pixels = new Uint8Array(size * size * 4);
for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
  const at = 4 * (y * size + x);
  if (textureKind === 'checker') {
    const gray = ((x + y) % 2) ? 224 : 32;
    pixels.set([gray, gray, gray, 255], at);
  } else {
    // Unsigned RGBA8: data are quantized to bytes before upload.
    pixels.set([Math.round(255*x/(size-1)),
                Math.round(255*y/(size-1)),64,255], at);
  }
}
function compile(type, source, stage) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error(stage + ': createShader failed');
  gl.shaderSource(shader, source); gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader) || 'no log';
    gl.deleteShader(shader);
    throw new Error(stage + ' compile: ' + log);
  }
  return shader;
}
const vs = compile(gl.VERTEX_SHADER, vertexSource, 'VERTEX');
const fs = compile(gl.FRAGMENT_SHADER, fragmentSource, 'FRAGMENT');
const program = gl.createProgram();
if (!program) throw new Error('createProgram failed');
gl.attachShader(program, vs); gl.attachShader(program, fs);
gl.linkProgram(program);
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
  throw new Error('LINK: ' + (gl.getProgramInfoLog(program) || 'no log'));
}
gl.deleteShader(vs); gl.deleteShader(fs);
const vao = gl.createVertexArray(), buffer = gl.createBuffer();
const texture = gl.createTexture();
if (!vao || !buffer || !texture) throw new Error('WebGL resource creation failed');
gl.bindVertexArray(vao);
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
// Two triangles cover the NDC square. UV is affine in screen space (w=1).
const quad = new Float32Array([
  -1,-1, 0,0,   1,-1, 1,0,  -1,1, 0,1,
  -1, 1, 0,1,   1,-1, 1,0,   1,1, 1,1
]);
gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);
gl.enableVertexAttribArray(0);
gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 16, 0);
gl.enableVertexAttribArray(1);
gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 16, 8);
gl.disableVertexAttribArray(2);
gl.vertexAttrib1f(2, 1); // flat numerical probe: homogeneous w=1
gl.activeTexture(gl.TEXTURE0);
gl.bindTexture(gl.TEXTURE_2D, texture);
gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, size, size, 0,
              gl.RGBA, gl.UNSIGNED_BYTE, pixels);
gl.generateMipmap(gl.TEXTURE_2D);
const wraps = {repeat:gl.REPEAT, clamp:gl.CLAMP_TO_EDGE, mirror:gl.MIRRORED_REPEAT};
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wraps[wrapMode]);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wraps[wrapMode]);
gl.useProgram(program);
const loc = name => {
  const l = gl.getUniformLocation(program, name);
  if (l === null) throw new Error('missing uniform ' + name);
  return l;
};
gl.uniform1i(loc('u_texture'), 0);
gl.uniform1f(loc('u_repeats'), repeats);
gl.uniform2f(loc('u_offset'), offset[0], offset[1]);
gl.disable(gl.BLEND); gl.disable(gl.DITHER);
gl.disable(gl.DEPTH_TEST); gl.disable(gl.CULL_FACE);
gl.clearColor(0, 0, 0, 1); gl.clear(gl.COLOR_BUFFER_BIT);
const filters = {
  nearest:gl.NEAREST, linear:gl.LINEAR, mipmap:gl.LINEAR_MIPMAP_LINEAR,
  'nearest-mip-nearest':gl.NEAREST_MIPMAP_NEAREST,
  'linear-mip-nearest':gl.LINEAR_MIPMAP_NEAREST,
  'nearest-mip-linear':gl.NEAREST_MIPMAP_LINEAR
};
const leftWidth = Math.floor(canvas.width / 2);
const rightWidth = canvas.width - leftWidth;
for (const [x, width, filter] of [[0,leftWidth,leftMinFilter],
                                 [leftWidth,rightWidth,rightMinFilter]]) {
  gl.viewport(x,0,width,canvas.height);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filters[filter]);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER,
                   filter.startsWith('nearest') ? gl.NEAREST : gl.LINEAR);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
}
gl.flush();
report('WGL7', 'left='+leftMinFilter+', right='+rightMinFilter+
       ', texture='+textureKind+' '+size+'x'+size+', wrap='+wrapMode);
report('FOOTPRINT', 'repeat='+repeats+
       ', texels/pixel x(left)='+(size*repeats/leftWidth).toFixed(3)+
       ', y='+(size*repeats/canvas.height).toFixed(3));
report('UPLOAD', 'RGBA8/UNSIGNED_BYTE, UNPACK_ALIGNMENT=1; mipmap generated locally');


// The host calls this only AFTER collecting the flat numerical probes.
// Both views continue to use this exact program, texture and UV uniforms.
function showObservation() {
  const names = {
    nearest:'NEAREST', linear:'LINEAR',
    'nearest-mip-nearest':'NEAREST_MIPMAP_NEAREST',
    'linear-mip-nearest':'LINEAR_MIPMAP_NEAREST',
    'nearest-mip-linear':'NEAREST_MIPMAP_LINEAR',
    mipmap:'LINEAR_MIPMAP_LINEAR'
  };
  let left=leftMinFilter, right=rightMinFilter, wrap=wrapMode;
  let density=repeats, mode='floor', shift=0, playing=false, last=null, raf=0;
  let lost=false;
  const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
  const panel=document.createElement('div');
  panel.style.cssText='padding:6px 8px;font:13px/1.45 system-ui;color:#152637;background:#fff';
  const top=document.createElement('div');
  top.style.cssText='display:flex;flex-wrap:wrap;gap:6px 12px;align-items:center';
  panel.append(top);
  function select(parent,label,options,value,change) {
    const l=document.createElement('label');
    l.style.cssText='display:flex;flex-direction:column;min-width:0;flex:1';
    l.textContent=label;
    const el=document.createElement('select');
    el.style.cssText='max-width:100%;min-width:0;font:inherit';
    for(const [key,title] of Object.entries(options)){
      const o=document.createElement('option');o.value=key;o.textContent=title;el.append(o);
    }
    el.value=value;el.addEventListener('change',()=>{change(el.value);render();});
    l.append(el);parent.append(l);
    return el;
  }
  select(top,'観察する場面',{floor:'遠近のある床',close:'拡大・UV境界'},mode,value=>{mode=value;});
  select(top,'ラップ方式',{repeat:'REPEAT',clamp:'CLAMP_TO_EDGE',mirror:'MIRRORED_REPEAT'},wrap,value=>{wrap=value;});
  const densityLabel=document.createElement('label');
  const densityText=document.createElement('span');
  const slider=document.createElement('input');
  slider.type='range';slider.min='1';slider.max='256';slider.step='1';slider.value=String(density);
  slider.style.cssText='width:100%;display:block';
  densityLabel.style.cssText='flex:1 1 140px;min-width:0';
  densityLabel.append(densityText,slider);top.append(densityLabel);
  slider.addEventListener('input',()=>{density=Number(slider.value);render();});
  const buttons=document.createElement('div');
  buttons.style.cssText='display:flex;gap:6px;align-items:center;margin:5px 0;flex-wrap:wrap';
  const play=document.createElement('button'), reset=document.createElement('button');
  play.type=reset.type='button';play.textContent='模様を移動';reset.textContent='移動をリセット';
  const status=document.createElement('span');status.setAttribute('aria-live','off');
  buttons.append(play,reset,status);panel.append(buttons);
  const labels=document.createElement('div');
  labels.style.cssText='display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:8px;border-top:1px solid #cbd5e1;padding-top:5px';
  select(labels,'左のフィルタ',names,left,value=>{left=value;});
  select(labels,'右のフィルタ',names,right,value=>{right=value;});
  panel.append(labels);canvas.before(panel);
  const legend=document.createElement('p');
  legend.style.cssText='margin:0;padding:5px 8px;background:#fff;color:#152637;font:13px/1.4 system-ui';
  canvas.after(legend);
  canvas.tabIndex=0;
  canvas.setAttribute('aria-label','左右の同じ床を異なるフィルタで表示。SpaceまたはEnterで模様の移動を切り替え');
  const repeatsLoc=loc('u_repeats'),offsetLoc=loc('u_offset');
  // Each vertex stores screen NDC x,y, base UV, and positive clip w.
  // Floor: near edge w=1, far edge w=6; perspective-correct UV.
  // At density=128: 2 texture copies across, 32 along the floor.
  function geometry() {
    const near=mode==='floor' ? .94 : .82;
    const far=mode==='floor' ? near/6 : near;
    const bottom=mode==='floor' ? -.94 : -.82;
    const topY=mode==='floor' ? .82 : .82;
    const w=mode==='floor' ? 6 : 1;
    const u0=mode==='floor' ? 0 : -.25/128;
    const u1=mode==='floor' ? 2/128 : 1.25/128;
    const v0=u0;
    const v1=mode==='floor' ? 32/128 : 1.25/128;
    const a=[-near,bottom,u0,v0,1], b=[near,bottom,u1,v0,1];
    const c=[-far,topY,u0,v1,w], d=[far,topY,u1,v1,w];
    return new Float32Array([...a,...b,...c,...c,...b,...d]);
  }
  function render() {
    if(lost)return;
    gl.useProgram(program);gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
    gl.bufferData(gl.ARRAY_BUFFER,geometry(),gl.DYNAMIC_DRAW);
    gl.vertexAttribPointer(0,2,gl.FLOAT,false,20,0);
    gl.vertexAttribPointer(1,2,gl.FLOAT,false,20,8);
    gl.enableVertexAttribArray(2);
    gl.vertexAttribPointer(2,1,gl.FLOAT,false,20,16);
    gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,texture);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,wraps[wrap]);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,wraps[wrap]);
    gl.uniform1f(repeatsLoc,density);
    gl.uniform2f(offsetLoc,offset[0],offset[1]+shift);
    gl.clearColor(.12,.17,.23,1);gl.clear(gl.COLOR_BUFFER_BIT);
    for(const [x,width,filter] of [[0,leftWidth,left],[leftWidth,rightWidth,right]]){
      gl.viewport(x,0,width,canvas.height);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,filters[filter]);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,filter.startsWith('nearest')?gl.NEAREST:gl.LINEAR);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
    densityText.textContent='模様密度 '+density+'（無次元）';
    status.textContent='UV移動 '+shift.toFixed(2);
    legend.textContent=mode==='floor'
      ? '手前のタイルと奥の偽の縞を比較。横 '+(density/64).toFixed(2)+' 回、奥行 '+(density/4).toFixed(2)+' 回の反復。'
      : '同じ画像を拡大し、テクセルの角・中間色・UV境界のつながりを比較。';
    play.textContent=playing?'移動を停止':'模様を移動';
    play.setAttribute('aria-pressed',String(playing));
  }
  function frame(time){
    if(!playing||lost)return;
    if(last!==null)shift=(shift+Math.min(.05,(time-last)/1000)*.22)%2;
    last=time;render();raf=requestAnimationFrame(frame);
  }
  function stopMotion(){playing=false;last=null;cancelAnimationFrame(raf);render();}
  function toggle(){
    if(lost)return;
    if(playing)stopMotion();
    else{playing=true;last=null;render();raf=requestAnimationFrame(frame);}
  }
  play.addEventListener('click',toggle);
  reset.addEventListener('click',()=>{stopMotion();shift=0;render();});
  canvas.addEventListener('keydown',e=>{
    if(e.key===' '||e.key==='Enter'){e.preventDefault();toggle();}
  });
  motion.addEventListener('change',e=>{if(e.matches)stopMotion();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stopMotion();});
  canvas.addEventListener('webglcontextlost',()=>{lost=true;playing=false;cancelAnimationFrame(raf);});
  window.addEventListener('pagehide',()=>cancelAnimationFrame(raf),{once:true});
  render();
}
return {showObservation};
