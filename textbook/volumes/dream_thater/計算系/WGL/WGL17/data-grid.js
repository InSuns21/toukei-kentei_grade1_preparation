// WGL17: compare 8-bit normalized, integer, and float 4x2 textures.
const mode = 'r8'; // source-backed GPU format selector
const probeValue = -1.3; // source-backed slider for cell (1,0)
const physicalValues = [-2.0, probeValue, -0.2, 0.6, 1.2, 1.75, 0.0, 2.0];
const lower=-2, upper=2, gridWidth=4, gridHeight=2;
if (!['r8','r8ui','r32f'].includes(mode)) throw new RangeError('bad mode');
if(!physicalValues.every(x=>Number.isFinite(x)&&x>=lower&&x<=upper)) throw new RangeError('数値は -2〜2 の有限値にしてください');
const bytes = Uint8Array.from(physicalValues, value => Math.round(255*(value-lower)/(upper-lower)));
const floatData = new Float32Array(physicalValues);
function compile(type,src,stage) {
  const shader=gl.createShader(type);
  if(!shader) throw new Error(stage+' shader allocation failed');
  gl.shaderSource(shader,src); gl.compileShader(shader);
  if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))
    throw new Error(stage+': '+(gl.getShaderInfoLog(shader)||'unknown error'));
  return shader;
}
const vs=compile(gl.VERTEX_SHADER,vertexSource,'VERTEX');
const fs=compile(gl.FRAGMENT_SHADER,fragmentSource,'FRAGMENT');
const program=gl.createProgram();
if(!program) throw new Error('program allocation failed');
gl.attachShader(program,vs); gl.attachShader(program,fs);
gl.linkProgram(program);
if(!gl.getProgramParameter(program,gl.LINK_STATUS))
  throw new Error('LINK: '+(gl.getProgramInfoLog(program)||'unknown'));
gl.deleteShader(vs); gl.deleteShader(fs); gl.useProgram(program);
function loc(name) {
  const l=gl.getUniformLocation(program,name);
  if(l===null) throw new Error('missing uniform '+name);
  return l;
}
const uFloat=loc('u_floatData'),uInteger=loc('u_integerData'),
      uMode=loc('u_mode'),uTarget=loc('u_floatTarget'),uSize=loc('u_targetSize');
const vao=gl.createVertexArray(),buffer=gl.createBuffer();
if(!vao||!buffer) throw new Error('quad allocation failed');
gl.bindVertexArray(vao); gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
gl.enableVertexAttribArray(0);
gl.vertexAttribPointer(0,2,gl.FLOAT,false,0,0);
function upload(unit,internal,format,type,data) {
  const t=gl.createTexture(); if(!t) throw new Error('texture allocation failed');
  gl.activeTexture(gl.TEXTURE0+unit);
  gl.bindTexture(gl.TEXTURE_2D,t);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
  gl.pixelStorei(gl.UNPACK_ALIGNMENT,1);
  gl.texImage2D(gl.TEXTURE_2D,0,internal,gridWidth,gridHeight,0,format,type,data);
  const error=gl.getError();
  if(error!==gl.NO_ERROR) throw new Error('texture upload error 0x'+error.toString(16));
  return t;
}
// Every sampler type has a complete texture on a separate texture unit.
const floatTexture=mode==='r32f'
  ? upload(0,gl.R32F,gl.RED,gl.FLOAT,floatData)
  : upload(0,gl.R8,gl.RED,gl.UNSIGNED_BYTE,bytes);
const integerTexture=upload(1,gl.R8UI,gl.RED_INTEGER,gl.UNSIGNED_BYTE,bytes);
gl.uniform1i(uFloat,0);gl.uniform1i(uInteger,1);
gl.uniform1i(uMode,mode==='r8'?0:mode==='r8ui'?1:2);
gl.disable(gl.BLEND);gl.disable(gl.DITHER);
gl.disable(gl.DEPTH_TEST);gl.disable(gl.SCISSOR_TEST);gl.disable(gl.CULL_FACE);
function draw(w,h,floatTarget) {
  gl.viewport(0,0,w,h);gl.uniform2f(uSize,w,h);
  gl.uniform1i(uTarget,floatTarget?1:0);
  gl.drawArrays(gl.TRIANGLES,0,6);
}
let maxInputError=0;
for(let i=0;i<8;i++){
  const reconstructed=mode==='r32f'?floatData[i]:lower+4*bytes[i]/255;
  maxInputError=Math.max(maxInputError,Math.abs(reconstructed-physicalValues[i]));
}
report('FORMAT',mode==='r32f'?'R32F / RED / FLOAT, 32 bits/texel':
  mode==='r8ui'?'R8UI / RED_INTEGER / UNSIGNED_BYTE, 8 bits/texel':
                 'R8 / RED / UNSIGNED_BYTE, normalized 8 bits/texel');
report('CPU','grid 4x2; bottom [-2,-1.3,-0.2,0.6]; top [1.2,1.75,0,2]');
report('BYTES',Array.from(bytes).join(',')+'; max input-to-reconstruction error '+
  maxInputError.toPrecision(6));
report('SAMPLER',mode==='r8ui'?'usampler2D yields uint (not normalized)':
  'sampler2D yields float; texelFetch with integer coordinate and level 0');
let gpuFloatValues=null;
const ext=gl.getExtension('EXT_color_buffer_float');
if(ext&&mode==='r32f') {
  const color=gl.createTexture(),fbo=gl.createFramebuffer();
  if(!color||!fbo) throw new Error('float attachment allocation failed');
  gl.activeTexture(gl.TEXTURE2);gl.bindTexture(gl.TEXTURE_2D,color);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
  gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA32F,4,2,0,gl.RGBA,gl.FLOAT,null);
  gl.bindFramebuffer(gl.FRAMEBUFFER,fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,color,0);
  const status=gl.checkFramebufferStatus(gl.FRAMEBUFFER);
  if(status===gl.FRAMEBUFFER_COMPLETE) {
    draw(4,2,true);
    const actual=new Float32Array(32);
    gl.readPixels(0,0,4,2,gl.RGBA,gl.FLOAT,actual);
    const error=gl.getError();
    if(error===gl.NO_ERROR) {
      gpuFloatValues=actual;
      const delta=physicalValues.map((v,i)=>Math.abs(actual[4*i]-v));
      report('FLOAT_READBACK','RGBA32F/FLOAT: max |GPU-original|='+Math.max(...delta).toPrecision(6));
    } else report('FLOAT_READBACK','readPixels FLOAT failed: 0x'+error.toString(16));
  } else report('FLOAT_READBACK','FBO incomplete: 0x'+status.toString(16));
  gl.bindFramebuffer(gl.FRAMEBUFFER,null);
  gl.deleteFramebuffer(fbo);gl.deleteTexture(color);
} else report('FLOAT_READBACK',ext?
  'extension present; switch to r32f for float readback':
  'EXT_color_buffer_float unavailable; float attachment not verified');
gl.bindFramebuffer(gl.FRAMEBUFFER,null);
gl.activeTexture(gl.TEXTURE0);
gl.clearColor(0,0,0,1);gl.clear(gl.COLOR_BUFFER_BIT);
draw(canvas.width,canvas.height,false);
report('DISPLAY','RGBA8 readPixels is 8-bit even after R32F sampling; do not infer float storage accuracy');

// Visible numerical microscope. All displayed values come from the same
// typed arrays that this editable JavaScript uploaded to the GPU.
if(typeof document!=='undefined'){
  document.body.style.cssText='display:block;margin:0;background:#f8fafc;color:#13263c;'+
    'font:14px/1.5 system-ui,sans-serif';
  canvas.style.cssText='display:block;width:100%;max-width:620px;height:auto';
  canvas.setAttribute('aria-label','4×2テクスチャのGPU画面。上段j=1、下段j=0');
  const caption=document.createElement('p');
  caption.style.cssText='margin:0;padding:8px 12px;background:#deecf4;font-weight:650';
  caption.textContent='① GPUが復元した値を色で表示　青＝−2　赤＝+2 ／ 下段はj=0';
  canvas.before(caption);
  const root=document.createElement('section');
  root.style.cssText='box-sizing:border-box;padding:10px 12px 14px';
  root.setAttribute('aria-label','GPUデータテクスチャの数値比較');
  const heading=document.createElement('strong');
  heading.textContent='② セルを選ぶと、格納された数値と失われた精度が分かる';
  const note=document.createElement('p');
  note.style.cssText='margin:3px 0 8px;font-size:12px;color:#425c73';
  note.textContent='同じ4×2格子の各セル。上段 j=1・下段 j=0。数値は色と別に確認します。';
  const grid=document.createElement('div');
  grid.style.cssText='display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:4px';
  const buttons=[];
  const print=v=>v===0?'0':Number(v).toPrecision(9);
  const decoded=(k,kind)=>kind==='r32f'?floatData[k]:lower+(upper-lower)*bytes[k]/255;
  const detail=document.createElement('output');
  detail.style.cssText='display:block;margin-top:10px;padding-top:8px;'+
    'border-top:1px solid #b8cad8;font-variant-numeric:tabular-nums';
  detail.setAttribute('aria-live','polite');
  const bars=document.createElement('div');
  bars.style.cssText='display:grid;gap:5px;margin-top:6px';
  const gpuInfo=document.createElement('p');
  gpuInfo.style.cssText='font-size:12px;margin:8px 0 0';
  function choose(k){
    buttons.forEach((b,index)=>{
      b.style.border=index===k?'3px solid #15639e':'1px solid #8398a9';
      b.style.background=index===k?'#e0f0fb':'white';
      b.setAttribute('aria-pressed',String(index===k));
    });
    const i=k%4,j=Math.floor(k/4),original=physicalValues[k];
    const restored=decoded(k,mode),error=restored-original;
    detail.textContent='セル ('+i+','+j+')　格納位置 k='+k+
      ' ／ 元の値 x='+original+' → '+mode.toUpperCase()+
      ' → 復元値 '+print(restored)+
      ' ／ 符号付き誤差 '+(error===0?'0':error.toExponential(5));
    bars.replaceChildren();
    for(const kind of ['r8','r8ui','r32f']){
      const value=decoded(k,kind),distance=Math.abs(value-original);
      const item=document.createElement('div');
      item.style.cssText='display:grid;grid-template-columns:53px minmax(0,1fr) 120px;'+
        'gap:7px;align-items:center;font:12px ui-monospace,monospace';
      const name=document.createElement('span');
      name.textContent=kind.toUpperCase()+(mode===kind?' *':'');
      const line=document.createElement('div');
      line.style.cssText='height:12px;background:#dce5eb;border:1px solid #b5c5d3';
      const fill=document.createElement('div');
      fill.style.cssText='height:100%;width:'+
        (100*Math.min(1,distance/(2/255))).toFixed(4)+
        '%;background:'+(mode===kind?'#165a96':'#7092ac');
      line.append(fill);
      const count=document.createElement('span');
      count.textContent='|誤差| '+(distance===0?'0':distance.toExponential(3));
      item.append(name,line,count);
      bars.append(item);
    }
    const p=Math.floor((i+.5)*canvas.width/4),q=Math.floor((j+.5)*canvas.height/2);
    const rgba=new Uint8Array(4);
    gl.bindFramebuffer(gl.FRAMEBUFFER,null);
    gl.readPixels(p,q,1,1,gl.RGBA,gl.UNSIGNED_BYTE,rgba);
    gpuInfo.textContent='③ 実GPU画素（RGBA8）('+p+','+q+') = '+Array.from(rgba).join(', ')+
      ' ／ R8/R8UIの保存byte='+bytes[k]+
      ' ／ R32Fの保存float='+print(floatData[k])+'. '+
      (mode==='r32f'?
        (gpuFloatValues?'別FBOのGPU float読戻し='+print(gpuFloatValues[4*k]):
          'この端末ではGPU float読戻しを確認できません'):
        'R32Fへ切り替えるとfloatのGPU読戻しも確認できます');
  }
  for(let j=1;j>=0;j--)for(let i=0;i<4;i++){
    const k=i+4*j,button=document.createElement('button');
    button.type='button';
    button.style.cssText='min-width:0;padding:7px 2px;background:white;color:#11263c;'+
      'cursor:pointer;border-radius:2px;white-space:pre-line;overflow-wrap:anywhere;'+
      'font:12px/1.4 ui-monospace,monospace';
    button.textContent='('+i+','+j+')\n元 x='+physicalValues[k]+
      '\n'+(mode==='r32f'?'float32=':'byte=')+
      (mode==='r32f'?print(floatData[k]):bytes[k]);
    button.setAttribute('aria-label','セル'+i+','+j+' 入力'+physicalValues[k]+'の復元値と誤差を選ぶ');
    button.addEventListener('click',()=>choose(k));
    grid.append(button);buttons[k]=button;
  }
  const scale=document.createElement('p');
  scale.style.cssText='margin:8px 0 2px;font-weight:600;font-size:12px';
  scale.textContent='保存誤差（横棒100% = R8の最大絶対誤差 2/255）　* はGPU実行形式';
  root.append(heading,note,grid,detail,scale,bars,gpuInfo);
  canvas.after(root);
  choose(1);
}
