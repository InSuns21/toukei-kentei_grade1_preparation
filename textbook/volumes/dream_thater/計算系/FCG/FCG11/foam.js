// Editable secondary-particle trajectories; positions are in metres.
const time=0.35;
const curvatureThreshold=0.8;
const speedThreshold=1.5;
const lifetime=0.8;
const radius=0.055;
const amount=24;
if(![time,curvatureThreshold,speedThreshold,lifetime,radius,amount].every(Number.isFinite)||
 time<0||time>1.8||curvatureThreshold<0||curvatureThreshold>3||
 speedThreshold<0||speedThreshold>2.5||lifetime<0.1||lifetime>1.5||
 radius<0.025||radius>0.1||!Number.isInteger(amount)||amount<1||amount>40)
 throw RangeError('FCG11 parameter outside the documented range');
const h=x=>0.25*Math.cos(Math.PI*(x-1));
const sprites=new Float32Array(120*4);
function computeAt(time){
 sprites.fill(0);
let count=0,emitted=0,sprayCount=0,foamCount=0,bubbleCount=0;
function add(x,z,kind){sprites.set([x,z,radius,kind],4*count++);}
for(let i=0;i<amount;i++){
 const x0=4*(i+0.5)/amount,phase=Math.PI*(x0-1),z0=h(x0);
 const slope=-Math.PI/4*Math.sin(phase);
 const curvature=Math.abs(Math.PI*Math.PI/4*Math.cos(phase))/Math.pow(1+slope*slope,1.5);
 const speed=1.2+0.8*Math.cos(phase);
 if(z0<=0||curvature<curvatureThreshold||speed<speedThreshold)continue;
 const birth=0.08*(i%4),age=time-birth;
 if(age<0)continue;
 emitted++;
 if(age>=lifetime)continue;
 const x=x0+0.32*age,z=z0+2.4*age-4.9*age*age;
 if(age===0||z>h(x)){add(x,z,1);sprayCount++;}
 const xf=x0+0.18*age;add(xf,h(xf),2);foamCount++;
 const zb=z0-0.22+0.12*age;
 if(zb<z0){add(x0,zb,3);bubbleCount++;}
}
return {count,emitted,sprayCount,foamCount,bubbleCount};
}
function compile(type,source){
 const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);
 if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));
 return s;
}
const p=gl.createProgram(),v=compile(gl.VERTEX_SHADER,vertexSource),f=compile(gl.FRAGMENT_SHADER,fragmentSource);
gl.attachShader(p,v);gl.attachShader(p,f);gl.linkProgram(p);
if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(p));
gl.deleteShader(v);gl.deleteShader(f);gl.useProgram(p);
gl.bindVertexArray(gl.createVertexArray());
function renderAt(time){
const stats=computeAt(time);
gl.uniform4fv(gl.getUniformLocation(p,'u_particles[0]'),sprites);
gl.uniform1i(gl.getUniformLocation(p,'u_count'),stats.count);
gl.viewport(0,0,canvas.width,canvas.height);gl.disable(gl.DITHER);gl.disable(gl.BLEND);gl.disable(gl.DEPTH_TEST);
gl.drawArrays(gl.TRIANGLES,0,3);
return stats;
}
const {emitted,sprayCount,foamCount,bubbleCount}=renderAt(time);
report('PARTICLES','t='+time+' s; emitted sites='+emitted+'; spray='+sprayCount+'; foam='+foamCount+'; bubbles='+bubbleCount);

 // Advance the same editable computation; the first frame remains the audit snapshot.
let liveValue=time,playing=false,timer=null;
function emit(){canvas.dispatchEvent(new CustomEvent('fcg-time-progress',{detail:{value:liveValue,playing}}));}
function cancel(){if(timer!==null)clearTimeout(timer);timer=null;playing=false;}
function advanceLive(value){renderAt(value);liveValue=value;}
function pause(){cancel();emit();}
function next(){return Math.min(1.8,Math.round((liveValue+0.05)*1e8)/1e8);}
function tick(){
 timer=null;if(!playing)return;
 try{advanceLive(next());if(liveValue>=1.8)cancel();emit();if(playing)timer=setTimeout(tick,50);}
 catch(error){cancel();canvas.dispatchEvent(new CustomEvent('fcg-time-failure',{detail:String(error?.message||error)}));}
}
function play(){if(playing)return;if(liveValue>=1.8)advanceLive(0);playing=true;emit();timer=setTimeout(tick,50);}
function step(){cancel();advanceLive(next());emit();}
function reset(){cancel();advanceLive(0);emit();}
canvas.addEventListener?.('webglcontextlost',cancel);
return {play,pause,step,reset};
