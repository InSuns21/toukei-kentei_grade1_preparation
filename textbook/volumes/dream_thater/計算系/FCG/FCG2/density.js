// FCG2: prescribed analytic scalar field, NOT a fluid PDE solver.
// Physical time is continuous in [0, 2pi] seconds; n*pi/2 remains the
// exact, reproducible exercise checkpoint. GPU draws; CPU computes the field.
// The code executes only inside the opaque-origin editable WebGL sandbox.
const N=8, dt=Math.PI/2, period=4*dt;
const steps=settings.steps;
if(!Number.isInteger(steps)||steps<0||steps>4)throw new RangeError('steps must be 0..4');
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
let selection=[Math.floor(1.5*canvas.width/N),Math.floor(1.5*canvas.height/N)];
function emitProgress(force=false){
  const now=performance.now();
  if(!force&&now-lastReport<110)return; // avoid a readPixels stall every display frame
  lastReport=now;
  const rgba=new Uint8Array(4),[x,y]=selection;
  gl.readPixels(x,y,1,1,gl.RGBA,gl.UNSIGNED_BYTE,rgba);
  canvas.dispatchEvent(new CustomEvent('fcg2-progress',{detail:{
    time,playing,x,y,rgba:Array.from(rgba)
  }}));
}
function drawField(t){
  // Re-evaluate the analytic expression at the ACTUAL time, not interpolation
  // between the five exercise snapshots. A frame is not a PDE time step.
  for(let j=0;j<N;j++)for(let i=0;i<N;i++){
    const x=(i+0.5)/N,y=(j+0.5)/N;
    next[i+N*j]=0.5+0.25*Math.sin(2*Math.PI*x)*
      Math.cos(2*Math.PI*y)*Math.sin(t);
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
      const elapsed=Math.min(0.05,Math.max(0,(now-previous)/1000));
      time=(time+elapsed)%period;
      try{drawField(time);emitProgress();}
      catch(error){
        playing=false;
        canvas.dispatchEvent(new CustomEvent('fcg2-failure',{detail:{message:String(error)}}));
        return;
      }
    }
    previous=now;
  }else previous=0;
  frameId=requestAnimationFrame(frame);
}
function play(){
  if(playing)return;
  playing=true;previous=0;emitProgress(true);frameId=requestAnimationFrame(frame);
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
report('TIME','initial snapshot step='+steps+', dt=pi/2 s, physical t='+time.toFixed(5)+' s');
report('FIELD','analytic prescribed scalar; continuous CPU sampling; NOT Navier-Stokes or advection');
report('GRID','8x8 bottom row first; two alternating R8 upload textures; GPU draws only');
report('ERROR','max |q - R8/255| = '+largestError.toPrecision(6)+' (bound 1/510)');
report('FORMAT','R8/RED/UNSIGNED_BYTE; no float render-target extension');
window.addEventListener('pagehide',()=>{playing=false;if(frameId)cancelAnimationFrame(frameId);},{once:true});
return {play,pause,reset:()=>{pause();seek(0);},step,seek,select,getTime:()=>time};
