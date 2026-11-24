// The shared editor prepends the original FCG5, FCG12, FCG14 kernels.
const modelIndex=0;
const renderScale=1;
const formatIndex=0;
const playbackMs=100;
if(![0,1,2].includes(modelIndex)||![0,1].includes(formatIndex)||
 !Number.isFinite(renderScale)||renderScale<.125||renderScale>1||
 !Number.isFinite(playbackMs)||playbackMs<50||playbackMs>250)throw RangeError('FCG19 parameter range');
const names=['FCG5 染料濃度','FCG12 水深 [m]','FCG14 煙濃度'];
const createModel=index=>[makeFluid,makeWater,makeSmoke][index]();
const endTime=1.2;
function encodeField(field,scale,format){
 const data=format===1?new Uint8Array(field.length):new Float32Array(field.length);
 let maxError=0,clipped=0;
 for(let k=0;k<field.length;k++){
  if(!Number.isFinite(field[k]))throw Error('invalid physical field');
  const z=field[k]/scale,q=Math.min(1,Math.max(0,z));
  if(q!==z)clipped++;
  data[k]=format===1?Math.round(q*255):q;
  const restored=format===1?data[k]/255:data[k];
  maxError=Math.max(maxError,Math.abs(restored-q));
 }
 return {data,maxError,clipped};
}
// GPU DISPLAY
function shader(type,src){
 const a=gl.createShader(type);if(!a)throw Error('shader allocation');
 gl.shaderSource(a,src);gl.compileShader(a);
 if(!gl.getShaderParameter(a,gl.COMPILE_STATUS)){const msg=gl.getShaderInfoLog(a);gl.deleteShader(a);throw Error(msg);}
 return a;
}
const vs=shader(gl.VERTEX_SHADER,vertexSource),fs=shader(gl.FRAGMENT_SHADER,fragmentSource);
const program=gl.createProgram();gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);
gl.deleteShader(vs);gl.deleteShader(fs);
if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program));
const vao=gl.createVertexArray(),tex=gl.createTexture(),screen=gl.createTexture(),fbo=gl.createFramebuffer();
if(!vao||!tex||!screen||!fbo)throw Error('WebGL resource allocation');
gl.bindVertexArray(vao);gl.useProgram(program);gl.disable(gl.DITHER);gl.disable(gl.BLEND);
const w=Math.floor(canvas.width*renderScale),h=Math.floor(canvas.height*renderScale);
function bindTexture(t){
 gl.bindTexture(gl.TEXTURE_2D,t);
 gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
 gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
 gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
 gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
}
gl.activeTexture(gl.TEXTURE0);
bindTexture(screen);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA8,w,h,0,gl.RGBA,gl.UNSIGNED_BYTE,null);
gl.bindFramebuffer(gl.FRAMEBUFFER,fbo);gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,screen,0);
if(gl.checkFramebufferStatus(gl.FRAMEBUFFER)!==gl.FRAMEBUFFER_COMPLETE)throw Error('FBO incomplete: reduce renderScale and rerun');
gl.bindFramebuffer(gl.FRAMEBUFFER,null);
gl.uniform1i(gl.getUniformLocation(program,'u_field'),0);
const ext=gl.getExtension('EXT_disjoint_timer_query_webgl2');
let pending=null,gpuMs=null,model,physical,encoding,playing=false,raf=null,lastFrame=null,nextPhysical=0;
let cpuMs=0,submitMs=0,intervals=[],lost=false;
const caption=document.createElement('p');caption.setAttribute('aria-label','FCG19 性能と物理診断');canvas.after(caption);
function clearQuery(){if(pending&&!lost)gl.deleteQuery(pending);pending=null;gpuMs=null;}
function poll(){
 if(!ext||!pending)return;
 if(gl.getParameter(ext.GPU_DISJOINT_EXT)){clearQuery();return;}
 if(gl.getQueryParameter(pending,gl.QUERY_RESULT_AVAILABLE)){
  gpuMs=gl.getQueryParameter(pending,gl.QUERY_RESULT)/1e6;
  gl.deleteQuery(pending);pending=null;
 }
}
function upload(){
 physical=model.state();encoding=encodeField(physical.field,physical.scale,formatIndex);
 bindTexture(tex);gl.pixelStorei(gl.UNPACK_ALIGNMENT,1);
 gl.texImage2D(gl.TEXTURE_2D,0,formatIndex===1?gl.R8:gl.R32F,model.N,model.N,0,gl.RED,formatIndex===1?gl.UNSIGNED_BYTE:gl.FLOAT,encoding.data);
}
function initialize(){clearQuery();model=createModel(modelIndex);cpuMs=0;submitMs=0;intervals=[];lastFrame=null;upload();}
function advance(){
 if(physical.time>=endTime-1e-10)return;
 const t=performance.now();model.advance();cpuMs=performance.now()-t;upload();
}
function draw(){
 if(lost)return;
 poll();
 const t=performance.now();
 let q=null;
 if(ext&&!pending&&!gl.getParameter(ext.GPU_DISJOINT_EXT)){q=gl.createQuery();if(q)gl.beginQuery(ext.TIME_ELAPSED_EXT,q);}
 gl.bindFramebuffer(gl.FRAMEBUFFER,fbo);gl.viewport(0,0,w,h);gl.drawArrays(gl.TRIANGLES,0,3);
 gl.bindFramebuffer(gl.READ_FRAMEBUFFER,fbo);gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER,null);
 gl.blitFramebuffer(0,0,w,h,0,0,canvas.width,canvas.height,gl.COLOR_BUFFER_BIT,gl.NEAREST);
 gl.bindFramebuffer(gl.FRAMEBUFFER,null);gl.viewport(0,0,canvas.width,canvas.height);
 if(q){gl.endQuery(ext.TIME_ELAPSED_EXT);pending=q;}
 submitMs=performance.now()-t;
 if(gl.getError()!==gl.NO_ERROR)throw Error('FCG19 WebGL draw failed: rerun with smaller display');
 const fps=intervals.length?1000*intervals.length/intervals.reduce((a,b)=>a+b,0):null;
 const ms=x=>x===null?'未計測':x.toFixed(2)+' ms';
 caption.textContent=names[modelIndex]+'（色0〜'+physical.scale+'、暗→明）｜格子 '+model.N+'²／描画 '+w+'×'+h+'／'+(formatIndex?'R8':'R32F')+
 '｜時刻 '+physical.time.toFixed(3)+' s、物理step '+physical.steps+
 '｜CPU更新 '+ms(physical.steps?cpuMs:null)+'、描画発行 '+ms(submitMs)+'、GPU '+(ext?ms(gpuMs):'拡張未対応')+'、FPS '+(fps===null?'未計測':fps.toFixed(1))+
 '｜転送誤差 '+encoding.maxError.toExponential(2)+'（正規化値）、クリップ '+encoding.clipped+
 '｜'+physical.diagnostic.map(([label,value])=>label+' '+value.toExponential(3)).join('、');
}
function emit(){canvas.dispatchEvent(new CustomEvent('fcg-time-progress',{detail:{value:Math.min(endTime,physical.time),playing}}));}
function pause(){playing=false;if(raf!==null)cancelAnimationFrame(raf);raf=null;lastFrame=null;emit();}
function step(){pause();advance();draw();emit();}
function reset(){pause();initialize();draw();emit();}
function tick(now){
 if(!playing||lost)return;
 try{
  if(document.hidden){lastFrame=null;nextPhysical=now;raf=requestAnimationFrame(tick);return;}
  if(lastFrame!==null){intervals.push(now-lastFrame);if(intervals.length>20)intervals.shift();}
  lastFrame=now;
  if(now>=nextPhysical){advance();nextPhysical=now+playbackMs;}
  draw();emit();
  if(physical.time>=endTime-1e-10){pause();return;}
  raf=requestAnimationFrame(tick);
 }catch(e){pause();canvas.dispatchEvent(new CustomEvent('fcg-time-failure',{detail:String(e)}));}
}
function play(){if(playing||lost)return;if(physical.time>=endTime-1e-10)initialize();playing=true;lastFrame=null;intervals=[];nextPhysical=0;emit();raf=requestAnimationFrame(tick);}
initialize();draw();
report('GRID',names[modelIndex]+'; '+model.N+'x'+model.N+' physical cells; '+w+'x'+h+' render pixels; CPU Float64, display '+(formatIndex?'R8':'R32F'));
canvas.tabIndex=0;canvas.setAttribute('aria-label','流体の濃度または水深。Spaceで再生・停止');
canvas.addEventListener('keydown',e=>{if(e.key===' '){e.preventDefault();playing?pause():play();}});
canvas.addEventListener('webglcontextlost',()=>{lost=true;pending=null;pause();});
window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',e=>{if(e.matches)pause();});
window.addEventListener('pagehide',()=>{pause();if(!lost){clearQuery();gl.deleteFramebuffer(fbo);gl.deleteTexture(tex);gl.deleteTexture(screen);gl.deleteVertexArray(vao);gl.deleteProgram(program);}},{once:true});
return {play,pause,step,reset};
