// Synthetic metric DEM; no external geodata. Directional hydrostatic reconstruction.
const N=48;
const pulse=1;
const ridge=1.5;
const g=9.81,L=48,interval=.05,endTime=4;
function makeFlood(n=N,p=pulse,b=ridge){
 if(!Number.isInteger(n)||n<12||n>96||!Number.isFinite(p)||p<0||p>2||!Number.isFinite(b)||b<0||b>3)throw RangeError('FCG20 parameter range');
 const d=L/n,z=new Float64Array(n*n),U=new Float64Array(3*n*n);
 const idx=(i,j)=>i+n*j;
 for(let j=0;j<n;j++)for(let i=0;i<n;i++){
  const x=(i+.5)/n,y=(j+.5)/n,k=idx(i,j);
  z[k]=.25+ b*Math.exp(-(((x-.52)/.075)**2))*(1-.8*Math.exp(-(((y-.5)/.15)**2)));
  U[3*k]=Math.max(0,.65-z[k])+p*(x<.25&&Math.abs(y-.5)<.25?1:0);
 }
 const volume=()=>{let sum=0;for(let k=0;k<n*n;k++)sum+=U[3*k];return sum*d*d;};
 const initialVolume=volume();let time=0,steps=0;
 function face(k,l,axis,wall=0){
  const q=axis+1,s=2-axis;
  const h=U[3*k],H=U[3*l],u=h>0?U[3*k+q]/h:0,v=h>0?U[3*k+s]/h:0;
  const V=H>0?U[3*l+s]/H:0,w=wall?-u:H>0?U[3*l+q]/H:0;
  const B=Math.max(z[k],z[l]),a=Math.max(0,h+z[k]-B),c=Math.max(0,H+z[l]-B);
  const speed=Math.max(Math.abs(u)+Math.sqrt(g*a),Math.abs(w)+Math.sqrt(g*c));
  const mass=wall?0:.5*(a*u+c*w-speed*(c-a));
  const normal=.5*(a*u*u+c*w*w+.5*g*(a*a+c*c)-speed*(c*w-a*u));
  const tangent=wall?0:.5*(a*u*v+c*w*V-speed*(c*V-a*v));
  return [mass,normal,tangent,.5*g*(h*h-a*a),.5*g*(H*H-c*c),speed];
 }
 function sweep(axis,dt){
  const next=U.slice(),q=axis+1,s=2-axis;
  for(let j=0;j<n;j++)for(let i=0;i<n;i++){
   const k=idx(i,j),lo=axis===0?i:j,hi=n-1;
   const left=lo===0?face(k,k,axis,1):face(k-(axis===0?1:n),k,axis);
   // At a left wall the reflected state must be on the left.
   if(lo===0){const h=U[3*k],u=h?U[3*k+q]/h:0;left[1]=h*u*u+.5*g*h*h-left[5]*h*u;}
   const right=lo===hi?face(k,k,axis,1):face(k,k+(axis===0?1:n),axis);
   const a=dt/d;
   next[3*k]-=a*(right[0]-left[0]);
   next[3*k+q]-=a*(right[1]+right[3]-left[1]-left[4]);
   next[3*k+s]-=a*(right[2]-left[2]);
   if(next[3*k]<-1e-12||!next.subarray(3*k,3*k+3).every(Number.isFinite))throw Error('invalid shallow-water state');
   if(next[3*k]<=0){next[3*k]=0;next[3*k+1]=0;next[3*k+2]=0;}
  }
  U.set(next);
 }
 function maxSpeed(){let a=0;for(let k=0;k<n*n;k++){const h=U[3*k];if(h>0)a=Math.max(a,Math.abs(U[3*k+1]/h)+Math.sqrt(g*h),Math.abs(U[3*k+2]/h)+Math.sqrt(g*h));}return a;}
 function advance(){
  const target=Math.min(endTime,time+interval);
  while(time<target-1e-12){
   if(steps>=50000)throw Error('step limit');
   const dt=Math.min(target-time,.2*d/Math.max(maxSpeed(),1e-9));
   // Each directional stage uses its own CFL bound. Subdivide the second sweep
   // if the first changes the characteristic speed.
   sweep(0,dt);
   let remain=dt,substeps=0;
   while(remain>1e-12){if(++substeps>10000)throw Error('substep limit');const sub=Math.min(remain,.2*d/Math.max(maxSpeed(),1e-9));sweep(1,sub);remain-=sub;}
   time+=dt;steps++;
  }
 }
 function state(){let wet=0,min=Infinity,velocity=0;const field=new Float32Array(4*n*n);
  for(let k=0;k<n*n;k++){const h=U[3*k],u=h?U[3*k+1]/h:0,v=h?U[3*k+2]/h:0;
   field.set([z[k],h,u,v],4*k);min=Math.min(min,h);if(h>.001)wet++;velocity=Math.max(velocity,Math.hypot(u,v));}
  return {time,steps,field,volume:volume(),error:volume()-initialVolume,min,wetArea:wet*d*d,velocity};
 }
 return {n,d,z,U,advance,state};
}
// GPU DISPLAY
function shader(type,src){const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s;}
const vs=shader(gl.VERTEX_SHADER,vertexSource),fs=shader(gl.FRAGMENT_SHADER,fragmentSource),program=gl.createProgram();
gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);gl.deleteShader(vs);gl.deleteShader(fs);
if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program));
const tex=gl.createTexture(),vao=gl.createVertexArray();
gl.bindVertexArray(vao);gl.useProgram(program);gl.disable(gl.DITHER);gl.disable(gl.BLEND);gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,tex);
gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
gl.uniform1i(gl.getUniformLocation(program,'u_field'),0);
let sim=makeFlood(),playing=false,raf=null,last=0,lost=false;
const caption=document.createElement('p');caption.setAttribute('aria-label','浸水診断');canvas.after(caption);
function draw(){if(lost)return;const s=sim.state();gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA32F,N,N,0,gl.RGBA,gl.FLOAT,s.field);gl.viewport(0,0,canvas.width,canvas.height);gl.drawArrays(gl.TRIANGLES,0,3);
 if(gl.getError()!==gl.NO_ERROR)throw Error('FCG20 draw failed');
 caption.textContent='左上：地形＋水面（茶＝乾地、青＝水）｜右上：水深 0–2 m（暗→明）｜左下：流速 0–3 m/s（暗→明）｜右下：中央断面（横48 m・縦4 m、縦12倍、白線＝水面、茶＝地盤）。時刻 '+s.time.toFixed(2)+' s、水量 '+s.volume.toFixed(3)+' m³、収支差 '+s.error.toExponential(2)+' m³、最小水深 '+s.min.toFixed(4)+' m、浸水面積（h>1 mm） '+s.wetArea.toFixed(1)+' m²、最大流速 '+s.velocity.toFixed(3)+' m/s';}
function emit(){canvas.dispatchEvent(new CustomEvent('fcg-time-progress',{detail:{value:sim.state().time,playing}}));}
function pause(){playing=false;if(raf!==null)cancelAnimationFrame(raf);raf=null;emit();}
function step(){pause();sim.advance();draw();emit();}
function reset(){pause();sim=makeFlood();draw();emit();}
function tick(t){if(!playing||lost)return;try{if(!document.hidden&&t-last>=75){sim.advance();draw();emit();last=t;}if(sim.state().time>=endTime-1e-10){pause();return;}raf=requestAnimationFrame(tick);}catch(e){pause();canvas.dispatchEvent(new CustomEvent('fcg-time-failure',{detail:String(e)}));}}
function play(){if(playing||lost)return;if(sim.state().time>=endTime-1e-10)reset();playing=true;last=0;emit();raf=requestAnimationFrame(tick);}
draw();report('GRID',N+'×'+N+' cells; local metric 48×48 m; synthetic DEM');
canvas.tabIndex=0;canvas.setAttribute('aria-label','地形と水深・流速の3面比較。Spaceで再生停止');canvas.addEventListener('keydown',e=>{if(e.key===' '){e.preventDefault();playing?pause():play();}});
canvas.addEventListener('webglcontextlost',()=>{lost=true;pause();});
window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',e=>{if(e.matches)pause();});
window.addEventListener('pagehide',()=>{pause();if(!lost){gl.deleteTexture(tex);gl.deleteVertexArray(vao);gl.deleteProgram(program);}},{once:true});
return {play,pause,step,reset};
