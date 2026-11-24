// One editable secondary-particle snapshot; positions are in metres.
const time=0.35;
const curvatureThreshold=0.8;
const speedThreshold=1.5;
const lifetime=0.8;
const radius=0.055;
const amount=12;
if(![time,curvatureThreshold,speedThreshold,lifetime,radius,amount].every(Number.isFinite)||
 time<0||time>1.8||curvatureThreshold<0||curvatureThreshold>3||
 speedThreshold<0||speedThreshold>2.5||lifetime<0.1||lifetime>1.5||
 radius<0.025||radius>0.1||!Number.isInteger(amount)||amount<1||amount>12)
 throw RangeError('FCG11 parameter outside the documented range');
const h=x=>0.25*Math.cos(Math.PI*(x-2));
const sprites=new Float32Array(36*4);
let count=0,emitted=0,sprayCount=0,foamCount=0,bubbleCount=0;
function add(x,z,kind){sprites.set([x,z,radius,kind],4*count++);}
for(let i=0;i<amount;i++){
 const x0=4*(i+0.5)/amount,phase=Math.PI*(x0-2),z0=h(x0);
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
gl.uniform4fv(gl.getUniformLocation(p,'u_particles[0]'),sprites);
gl.uniform1i(gl.getUniformLocation(p,'u_count'),count);
gl.viewport(0,0,canvas.width,canvas.height);gl.disable(gl.DITHER);gl.disable(gl.BLEND);gl.disable(gl.DEPTH_TEST);
gl.drawArrays(gl.TRIANGLES,0,3);
report('PARTICLES','t='+time+' s; emitted sites='+emitted+'; spray='+sprayCount+'; foam='+foamCount+'; bubbles='+bubbleCount);
