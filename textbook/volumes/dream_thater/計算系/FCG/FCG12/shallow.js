// Closed 20 m square tank; cell averages [h,hu,hv] in SI units.
const N=40;
const time=1;
const baseDepth=0.25;
const bump=0.5;
const maxDt=0.05;
const cfl=0.4;
if(!Number.isInteger(N)||N<20||N>60||N%20!==0||
 ![time,baseDepth,bump,maxDt,cfl].every(Number.isFinite)||
 time<0||time>3||baseDepth<0.1||baseDepth>0.5||bump<0||bump>0.5||
 maxDt<0.01||maxDt>0.1||cfl<0.1||cfl>0.45)throw RangeError('FCG12 parameter outside range');
const g=9.81,dx=20/N;
let U=new Float64Array(3*N*N),V=new Float64Array(U.length);
const at=(i,j)=>3*(j*N+i);
for(let j=0;j<N;j++)for(let i=0;i<N;i++){
 const x=(i+0.5)*dx,y=(j+0.5)*dx;
 U[at(i,j)]=baseDepth+(x>7&&x<13&&y>7&&y<13?bump:0);
}
function volume(A){let s=0;for(let k=0;k<A.length;k+=3)s+=A[k];return s*dx*dx;}
const initialVolume=volume(U),initialState=U.slice();
let t=0,steps=0,largestCourant=0;
function face(i,j,axis){
 const k=at(i,j),h=U[k],m=U[k+1],n=U[k+2];
 return [h,m,n];
}
function flux(q,axis){
 const [h,m,n]=q,p=g*h*h/2;
 return axis===0?[m,m*m/h+p,m*n/h]:[n,m*n/h,n*n/h+p];
}
function addFace(i,j,axis,a,dt){
 const ni=i+(axis===0?1:0),nj=j+(axis===1?1:0);
 let L,R,kL=-1,kR=-1;
 if(i<0||j<0){kR=at(ni,nj);R=face(ni,nj,axis);L=R.slice();L[axis+1]*=-1;}
 else if(ni===N||nj===N){kL=at(i,j);L=face(i,j,axis);R=L.slice();R[axis+1]*=-1;}
 else{kL=at(i,j);kR=at(ni,nj);L=face(i,j,axis);R=face(ni,nj,axis);}
 const f=flux(L,axis),q=flux(R,axis);
 for(let d=0;d<3;d++){
  const change=dt/dx*(f[d]+q[d]-a*(R[d]-L[d]))/2;
  if(kL>=0)V[kL+d]-=change;
  if(kR>=0)V[kR+d]+=change;
 }
}
function solveUntil(target){
while(t<target-1e-12){
 let a=0;
 for(let k=0;k<U.length;k+=3){
  const h=U[k];
  if(!(h>0)||!Number.isFinite(h))throw Error('nonpositive or invalid depth');
  a=Math.max(a,Math.max(Math.abs(U[k+1]),Math.abs(U[k+2]))/h+Math.sqrt(g*h));
 }
 const dt=Math.min(maxDt,cfl*dx/a,target-t);
 if(!(dt>0)||++steps>10000)throw Error('invalid time step');
 largestCourant=Math.max(largestCourant,a*dt/dx);
 V.set(U);
 for(let j=0;j<N;j++)for(let i=-1;i<N;i++)addFace(i,j,0,a,dt);
 for(let i=0;i<N;i++)for(let j=-1;j<N;j++)addFace(i,j,1,a,dt);
 [U,V]=[V,U];t+=dt;
}
}
solveUntil(time);
let minDepth=Infinity,maxDepth=0,maxSpeed=0;
for(let k=0;k<U.length;k+=3){
 const h=U[k],speed=Math.hypot(U[k+1],U[k+2])/h;
 if(!(h>0)||!Number.isFinite(speed))throw Error('invalid final state');
 minDepth=Math.min(minDepth,h);maxDepth=Math.max(maxDepth,h);maxSpeed=Math.max(maxSpeed,speed);
}
report('WATER','t='+t.toFixed(3)+' s; steps='+steps+'; volume='+volume(U).toFixed(9)+' m³; ΔV='+(volume(U)-initialVolume).toExponential(3)+' m³; h min/max='+minDepth.toFixed(4)+'/'+maxDepth.toFixed(4)+' m; max |u|='+maxSpeed.toFixed(4)+' m/s; max Courant='+largestCourant.toFixed(4));
// RENDER: a single computed U feeds plan view, centre section, arrows and surface.
function shader(type,source){const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s;}
const program=gl.createProgram(),vs=shader(gl.VERTEX_SHADER,vertexSource),fs=shader(gl.FRAGMENT_SHADER,fragmentSource);
gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);
if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program));
gl.deleteShader(vs);gl.deleteShader(fs);gl.useProgram(program);
const vao=gl.createVertexArray(),buf=gl.createBuffer();gl.bindVertexArray(vao);gl.bindBuffer(gl.ARRAY_BUFFER,buf);
gl.enableVertexAttribArray(0);gl.vertexAttribPointer(0,3,gl.FLOAT,false,24,0);
gl.enableVertexAttribArray(1);gl.vertexAttribPointer(1,3,gl.FLOAT,false,24,12);
const mode=gl.getUniformLocation(program,'u_mode');
const color=h=>{const d=Math.min(1,Math.max(0,h));return [0.08+0.25*d,0.28+0.54*d,0.49+0.46*d];};
const white=[0.94,0.97,1],dark=[0.12,0.23,0.32],orange=[1,0.7,0.28];
let vertices=[];
function point(x,y,z,c){vertices.push(x,y,z,...c);}
function draw(kind,m){gl.uniform1i(mode,m);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertices),gl.STREAM_DRAW);gl.drawArrays(kind,0,vertices.length/6);vertices=[];}
function h(i,j){return U[at(i,j)];}
function render(){
gl.viewport(0,0,canvas.width,canvas.height);gl.clearColor(0.045,0.075,0.12,1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
gl.disable(gl.DITHER);gl.disable(gl.BLEND);gl.disable(gl.DEPTH_TEST);
// Left: top-down depth cells. World x,y normalised to [-1,1].
for(let j=0;j<N;j++)for(let i=0;i<N;i++){
 const x=-1+2*i/N,y=-1+2*j/N,X=x+2/N,Y=y+2/N,c=color(h(i,j));
 for(const [a,b] of [[x,y],[X,y],[X,Y],[x,y],[X,Y],[x,Y]])point(a,b,0,c);
}
draw(gl.TRIANGLES,0);
// Sparse velocity arrows: actual horizontal velocity, 0.8 m of arrow per m/s.
for(let j=2;j<N;j+=5)for(let i=2;i<N;i+=5){
 const k=at(i,j),x=-1+2*(i+0.5)/N,y=-1+2*(j+0.5)/N,du=0.08*U[k+1]/U[k],dv=0.08*U[k+2]/U[k];
 if(Math.hypot(du,dv)<1e-6)continue;
 point(x,y,0,white);point(x+du,y+dv,0,white);
 point(x+du,y+dv,0,white);point(x+0.72*du-0.2*dv,y+0.72*dv+0.2*du,0,white);
 point(x+du,y+dv,0,white);point(x+0.72*du+0.2*dv,y+0.72*dv-0.2*du,0,white);
}
const row=Math.floor(N/2),rowY=-1+2*(row+0.5)/N;
point(-1,rowY,0,orange);point(1,rowY,0,orange);draw(gl.LINES,0);
// Lower left: actual height along the orange row, vertical scale 0..1 m.
for(let i=0;i<N-1;i++){
 point(-1+2*(i+0.5)/N,h(i,row),0,orange);
 point(-1+2*(i+1.5)/N,h(i+1,row),0,orange);
}
point(-1,0,0,white);point(1,0,0,white);point(-1,0,0,white);point(-1,1,0,white);draw(gl.LINES,1);
// Right: the same cell-centre heights in an orthographic 3D mesh.
function node(i,j,c){point(-1+2*(i+0.5)/N,-1+2*(j+0.5)/N,h(i,j),c||color(h(i,j)));}
gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);
for(let j=0;j<N-1;j++)for(let i=0;i<N-1;i++){
 for(const [a,b] of [[i,j],[i+1,j],[i+1,j+1],[i,j],[i+1,j+1],[i,j+1]])node(a,b);
}
draw(gl.TRIANGLES,2);
for(let j=0;j<N;j+=5)for(let i=0;i<N-1;i++){node(i,j,dark);node(i+1,j,dark);}
for(let i=0;i<N;i+=5)for(let j=0;j<N-1;j++){node(i,j,dark);node(i,j+1,dark);}
for(let i=0;i<N-1;i++){node(i,row,orange);node(i+1,row,orange);}
draw(gl.LINES,2);
gl.disable(gl.DEPTH_TEST);gl.finish();
}
render();

 // Advance the same editable computation; the first frame remains the audit snapshot.
let liveValue=time,playing=false,timer=null;
function emit(){canvas.dispatchEvent(new CustomEvent('fcg-time-progress',{detail:{value:liveValue,playing}}));}
function cancel(){if(timer!==null)clearTimeout(timer);timer=null;playing=false;}
function advanceLive(value){if(value<t){U.set(initialState);t=0;steps=0;largestCourant=0;}solveUntil(value);render();liveValue=value;}
function pause(){cancel();emit();}
function next(){return Math.min(3,Math.round((liveValue+0.05)*1e8)/1e8);}
function tick(){
 timer=null;if(!playing)return;
 try{advanceLive(next());if(liveValue>=3)cancel();emit();if(playing)timer=setTimeout(tick,70);}
 catch(error){cancel();canvas.dispatchEvent(new CustomEvent('fcg-time-failure',{detail:String(error?.message||error)}));}
}
function play(){if(playing)return;if(liveValue>=3)advanceLive(0);playing=true;emit();timer=setTimeout(tick,70);}
function step(){cancel();advanceLive(next());emit();}
function reset(){cancel();advanceLive(0);emit();}
canvas.addEventListener?.('webglcontextlost',cancel);
return {play,pause,step,reset};
