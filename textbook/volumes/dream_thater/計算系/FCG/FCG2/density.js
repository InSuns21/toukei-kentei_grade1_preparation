// FCG2: a passive dye patch carried by a prescribed, incompressible vortex.
// Physical model: u = Omega(r) * (-dy, dx), Omega(r)=omega*(1+shear*r).
// The exact characteristic map is theta(t)=theta(0)+Omega(r)*t, r(t)=r(0).
// The same analytic q(x,y,t) drives the editable GPU display and source-linked GUI.
// The next lesson (FCG3) replaces this exact evaluation by numerical advection.
const N=128;
const omega=1;           // rad/s: base angular speed; GUI edits this literal
const shear=3;           // 1/m: radial increase of angular speed; GUI edits this
const amplitude=0.9;     // 0..1: initial peak dye concentration; GUI edits this
const dt=Math.PI/2, period=4*dt;
const steps=settings.steps;
if(!Number.isInteger(steps)||steps<0||steps>4)throw new RangeError('steps must be 0..4');
if(!Number.isFinite(omega)||omega<0||omega>4||
   !Number.isFinite(shear)||shear<0||shear>8||
   !Number.isFinite(amplitude)||amplitude<0||amplitude>1)
  throw new RangeError('omega, shear or amplitude outside demo limits');
let time=steps*dt, playing=false, frameId=0, previous=0, lastReport=-Infinity;
let current=new Float64Array(N*N),next=new Float64Array(N*N);
let active=-1, largestError=0;
const textures=[];
gl.pixelStorei(gl.UNPACK_ALIGNMENT,1);
for(let k=0;k<2;k++){
  const tex=gl.createTexture();if(!tex)throw new Error('texture allocation failed');
  textures.push(tex);
  gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,tex);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D,0,gl.R8,N,N,0,gl.RED,gl.UNSIGNED_BYTE,null);
}
function compile(type,source,name){
  const shader=gl.createShader(type);
  if(!shader)throw new Error(name+' allocation failed');
  gl.shaderSource(shader,source);gl.compileShader(shader);
  if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))
    throw new Error(name+': '+(gl.getShaderInfoLog(shader)||'compile failed'));
  return shader;
}
const vert=compile(gl.VERTEX_SHADER,vertexSource,'VERTEX');
const frag=compile(gl.FRAGMENT_SHADER,fragmentSource,'FRAGMENT');
const program=gl.createProgram();
if(!program)throw new Error('program allocation failed');
gl.attachShader(program,vert);gl.attachShader(program,frag);gl.linkProgram(program);
if(!gl.getProgramParameter(program,gl.LINK_STATUS))
  throw new Error('LINK: '+(gl.getProgramInfoLog(program)||'link failed'));
gl.deleteShader(vert);gl.deleteShader(frag);gl.useProgram(program);
const sampler=gl.getUniformLocation(program,'u_density');
if(sampler===null)throw new Error('missing u_density uniform');
gl.uniform1i(sampler,0);
const vao=gl.createVertexArray();
if(!vao)throw new Error('VAO allocation failed');
gl.bindVertexArray(vao);
gl.disable(gl.DITHER);gl.disable(gl.BLEND);gl.disable(gl.DEPTH_TEST);
gl.disable(gl.SCISSOR_TEST);gl.disable(gl.CULL_FACE);
gl.viewport(0,0,canvas.width,canvas.height);
let selection=[Math.floor(0.25*canvas.width),Math.floor(0.59*canvas.height)];
function concentration(x,y,t){
  const dx=x-0.5,dy=y-0.5,r=Math.hypot(dx,dy);
  const radial=Math.max(0,1-((r-0.26)/0.18)**2);
  if(radial===0)return 0;
  const theta=Math.atan2(dy,dx);
  const departure=theta-omega*(1+shear*r)*t;
  return amplitude*radial*radial*
    Math.exp((Math.cos(departure)-1)/(0.55*0.55));
}
function emitProgress(force=false){
  const now=performance.now();
  if(!force&&now-lastReport<150)return;
  lastReport=now;
  const rgba=new Uint8Array(4),[x,y]=selection;
  gl.readPixels(x,y,1,1,gl.RGBA,gl.UNSIGNED_BYTE,rgba);
  canvas.dispatchEvent(new CustomEvent('fcg2-progress',{detail:{
    time,playing,x,y,rgba:Array.from(rgba)
  }}));
}
function drawField(t){
  // Exact back-rotation: every texel evaluates the same physical dye field.
  // There is no image interpolation and no separately simulated GUI scene.
  for(let j=0;j<N;j++)for(let i=0;i<N;i++){
    const x=(i+0.5)/N,y=(j+0.5)/N;
    next[i+N*j]=concentration(x,y,t);
  }
  [current,next]=[next,current];
  active=(active+1)%2;
  const encoded=new Uint8Array(N*N);
  largestError=0;
  for(let k=0;k<encoded.length;k++){
    encoded[k]=Math.round(255*current[k]);
    largestError=Math.max(largestError,Math.abs(current[k]-encoded[k]/255));
  }
  gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,textures[active]);
  gl.texSubImage2D(gl.TEXTURE_2D,0,0,0,N,N,gl.RED,gl.UNSIGNED_BYTE,encoded);
  const error=gl.getError();
  if(error!==gl.NO_ERROR)throw new Error('R8 upload failed: 0x'+error.toString(16));
  gl.clearColor(0,0,0,1);gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES,0,3);
}
function pause(){
  playing=false;previous=0;
  if(frameId){cancelAnimationFrame(frameId);frameId=0;}
  emitProgress(true);
}
function seek(t){
  if(!Number.isFinite(t)||t<0||t>period)throw new RangeError('time must be in [0,2pi]');
  time=t;previous=0;drawField(time);emitProgress(true);
}
function frame(now){
  frameId=0;
  if(!playing)return;
  if(!document.hidden){
    if(previous){
      // Limit time jump after a stalled browser tab; keep physical seconds explicit.
      const elapsed=Math.min(0.05,Math.max(0,(now-previous)/1000));
      time=Math.min(period,time+elapsed);
      try{drawField(time);emitProgress();}
      catch(error){
        playing=false;
        canvas.dispatchEvent(new CustomEvent('fcg2-failure',{detail:{message:String(error)}}));
        return;
      }
      if(time>=period){playing=false;previous=0;emitProgress(true);return;}
    }
    previous=now;
  }else previous=0;
  frameId=requestAnimationFrame(frame);
}
function play(){
  if(playing)return;
  if(time>=period)seek(0);
  playing=true;previous=0;emitProgress(true);
  frameId=requestAnimationFrame(frame);
}
function step(){
  pause();
  const n=Math.floor((time+1e-8)/dt)+1;
  seek(n>4?0:n*dt);
}
function select(x,y){
  if(!Number.isInteger(x)||!Number.isInteger(y)||
     x<0||y<0||x>=canvas.width||y>=canvas.height)
    throw new RangeError('pixel outside drawing buffer');
  selection=[x,y];emitProgress(true);
}
drawField(time);
report('PHYSICS','2D passive dye: u=omega(1+shear*r)(-dy,dx), div u=0');
report('PARAMETERS','omega='+omega+' rad/s, shear='+shear+' 1/m, peak='+amplitude);
report('GRID','128x128 physical samples, 2 alternating R8 GPU upload textures');
report('CLOCK','exact characteristic at t='+time.toFixed(5)+' s, playback stops at 2pi s');
report('ERROR','max |q-R8/255|='+largestError.toPrecision(6)+' <=1/510');
window.addEventListener('pagehide',()=>{playing=false;if(frameId)cancelAnimationFrame(frameId);},{once:true});
return {play,pause,reset:()=>{pause();seek(0);},step,seek,select,getTime:()=>time};
