// Deep-water, deterministic, periodic ocean. Physical units: m, s, rad.
const time=2;
const amplitude=0.35;
const modeCount=6;
const wavelengthScale=1;
const direction=0;
const N=64,L=64,g=9.81;
if(![time,amplitude,modeCount,wavelengthScale,direction].every(Number.isFinite)||
 time<0||time>20||amplitude<0||amplitude>0.5||
 !Number.isInteger(modeCount)||modeCount<1||modeCount>8||
 ![1,2,3].includes(wavelengthScale)||![0,1,2,3].includes(direction))throw RangeError('FCG13 parameter range');
const base=[[1,0],[1,1],[2,-1],[3,1],[4,-2],[2,3],[5,2],[3,-4]];
const modes=base.slice(0,modeCount).map(([x,y],j)=>{
 for(let d=0;d<direction;d++)[x,y]=[-y,x];
 x*=wavelengthScale;y*=wavelengthScale;
 const qx=2*Math.PI*x/L,qy=2*Math.PI*y/L;
 return {x,y,qx,qy,a:amplitude/(j+1),phase:0.83*j-Math.sqrt(g*Math.hypot(qx,qy))*time};
});
// Unnormalised inverse FFT: positive exponent, no factor 1/N.
function inverseFFT(re,im){
 const n=re.length;
 for(let i=1,j=0;i<n;i++){
  let bit=n>>1;while(j&bit){j^=bit;bit>>=1;}j^=bit;
  if(i<j){[re[i],re[j]]=[re[j],re[i]];[im[i],im[j]]=[im[j],im[i]];}
 }
 for(let len=2;len<=n;len*=2)for(let start=0;start<n;start+=len){
  for(let j=0;j<len/2;j++){
   const angle=2*Math.PI*j/len,c=Math.cos(angle),s=Math.sin(angle);
   const p=start+j,q=p+len/2,vr=re[q]*c-im[q]*s,vi=re[q]*s+im[q]*c;
   const ur=re[p],ui=im[p];re[p]=ur+vr;im[p]=ui+vi;re[q]=ur-vr;im[q]=ui-vi;
  }
 }
}
function inverse2D(re,im){
 for(let y=0;y<N;y++)inverseFFT(re.subarray(y*N,(y+1)*N),im.subarray(y*N,(y+1)*N));
 const a=new Float64Array(N),b=new Float64Array(N);
 for(let x=0;x<N;x++){
  for(let y=0;y<N;y++){a[y]=re[y*N+x];b[y]=im[y*N+x];}
  inverseFFT(a,b);
  for(let y=0;y<N;y++){re[y*N+x]=a[y];im[y*N+x]=b[y];}
 }
}
const wrap=x=>(x%N+N)%N;
function field(axis){
 const re=new Float64Array(N*N),im=new Float64Array(N*N);
 for(const m of modes)for(const sign of [1,-1]){
  const p=wrap(sign*m.y)*N+wrap(sign*m.x);
  const a=m.a/2*Math.cos(m.phase),b=sign*m.a/2*Math.sin(m.phase);
  const k=sign*(axis===1?m.qx:m.qy);
  re[p]+=axis===0?a:-k*b;im[p]+=axis===0?b:k*a;
 }
 inverse2D(re,im);
 if(!re.every(Number.isFinite)||!im.every(x=>Number.isFinite(x)&&Math.abs(x)<1e-9))throw Error('invalid inverse spectrum');
 return re;
}
function computeAt(t){
 for(const [j,m] of modes.entries())m.phase=0.83*j-Math.sqrt(g*Math.hypot(m.qx,m.qy))*t;
 const eta=field(0),sx=field(1),sy=field(2);
let maxError=0,mean=0,maxSlope=0;
for(let y=0;y<N;y++)for(let x=0;x<N;x++){
 let h=0,a=0,b=0;
 for(const m of modes){
  const p=2*Math.PI*(m.x*x+m.y*y)/N+m.phase;
  h+=m.a*Math.cos(p);a-=m.a*m.qx*Math.sin(p);b-=m.a*m.qy*Math.sin(p);
 }
 const k=y*N+x;maxError=Math.max(maxError,Math.abs(eta[k]-h),Math.abs(sx[k]-a),Math.abs(sy[k]-b));
 mean+=eta[k]/(N*N);maxSlope=Math.max(maxSlope,Math.hypot(sx[k],sy[k]));
}
if(maxError>1e-9)throw Error('inverse FFT differs from direct sum');
 return {eta,sx,sy,mean,maxError,maxSlope};
}
const initial=computeAt(time);
const {eta,sx,sy,mean,maxError,maxSlope}=initial;
report('OCEAN','time='+time+' s; '+modeCount+' waves; '+N+'×'+N+' grid; mean='+mean.toExponential(3)+' m; max slope='+maxSlope.toFixed(3)+'; FFT/direct max difference='+maxError.toExponential(3));
report('WAVES',modes.map(m=>'('+m.x+','+m.y+'): λ='+(2*Math.PI/Math.hypot(m.qx,m.qy)).toFixed(2)+' m, ω='+Math.sqrt(g*Math.hypot(m.qx,m.qy)).toFixed(3)+' rad/s').join('; '));
function compile(type,source){const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s;}
const vs=compile(gl.VERTEX_SHADER,vertexSource),fs=compile(gl.FRAGMENT_SHADER,fragmentSource),program=gl.createProgram();
gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);
if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program));
gl.deleteShader(vs);gl.deleteShader(fs);gl.useProgram(program);
const vao=gl.createVertexArray(),buf=gl.createBuffer();gl.bindVertexArray(vao);gl.bindBuffer(gl.ARRAY_BUFFER,buf);
gl.enableVertexAttribArray(0);gl.vertexAttribPointer(0,3,gl.FLOAT,false,20,0);
gl.enableVertexAttribArray(1);gl.vertexAttribPointer(1,2,gl.FLOAT,false,20,12);
const view=gl.getUniformLocation(program,'u_view');
let vertices=[];
function point(x,y,h,a,b){vertices.push(x,y,h,a,b);}
function draw(kind,mode){gl.uniform1i(view,mode);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertices),gl.STREAM_DRAW);gl.drawArrays(kind,0,vertices.length/5);vertices=[];}
const corners=[[0,0],[1,0],[1,1],[0,0],[1,1],[0,1]];
function render({eta,sx,sy}){
 gl.viewport(0,0,canvas.width,canvas.height);gl.clearColor(0.04,0.07,0.11,1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
gl.disable(gl.DITHER);gl.disable(gl.BLEND);gl.disable(gl.DEPTH_TEST);
// Left: one constant-height colour per physical sample. Right: same data,
// including periodic closure, with heights and interpolated analytic normals.
for(let y=0;y<N;y++)for(let x=0;x<N;x++){
 const h=eta[y*N+x];
 for(const [dx,dy] of corners)point(-1+2*(x+dx)/N,-1+2*(y+dy)/N,h,0,0);
}
draw(gl.TRIANGLES,0);
function node(x,y){const k=wrap(y)*N+wrap(x);point(-1+2*x/N,-1+2*y/N,eta[k],sx[k],sy[k]);}
gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);
for(let y=0;y<N;y++)for(let x=0;x<N;x++)for(const [dx,dy] of corners)node(x+dx,y+dy);
draw(gl.TRIANGLES,1);
// A sparse wire grid makes the height field readable without relying on colour.
for(let y=0;y<=N;y+=8)for(let x=0;x<N;x++){node(x,y);node(x+1,y);}
for(let x=0;x<=N;x+=8)for(let y=0;y<N;y++){node(x,y);node(x,y+1);}
draw(gl.LINES,2);
 gl.disable(gl.DEPTH_TEST);gl.finish();
 if(gl.getError()!==gl.NO_ERROR)throw Error('ocean drawing failed');
}
render(initial);
// Fixed physical time increment, not wall-clock time or GPU frame rate.
let current=time,playing=false,timer=null,metrics=initial;
function emit(){
 canvas.dispatchEvent(new CustomEvent('fcg13-progress',{detail:{
  time:current,playing,mean:metrics.mean,maxSlope:metrics.maxSlope,maxError:metrics.maxError
 }}));
}
function cancel(){if(timer!==null)clearTimeout(timer);timer=null;playing=false;}
function advance(t){current=t;metrics=computeAt(t);render(metrics);}
function pause(){cancel();emit();}
function tick(){
 timer=null;if(!playing)return;
 try{
  advance(Math.min(20,Math.round((current+0.1)*1e8)/1e8));
  if(current>=20)cancel();
  emit();
  if(playing)timer=setTimeout(tick,100);
 }catch(error){
  cancel();
  canvas.dispatchEvent(new CustomEvent('fcg13-failure',{detail:String(error?.message||error)}));
 }
}
function play(){if(playing)return;if(current>=20)advance(0);playing=true;emit();timer=setTimeout(tick,100);}
function step(){cancel();advance(Math.min(20,Math.round((current+0.1)*1e8)/1e8));emit();}
function reset(){cancel();advance(time);emit();}
canvas.addEventListener('webglcontextlost',cancel);
return {play,pause,step,reset};
