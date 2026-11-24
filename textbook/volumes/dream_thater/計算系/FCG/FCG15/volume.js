// FCG15: prescribed 3D transport, R8 volume, and editable ray marching.
const N=48;
const extinction=6;
const scattering=0.8;
const samples=64;
const rise=0.13;
const spin=1;
const homogeneous=0;
const dt=0.05;
if(![32,48,64].includes(N)||![extinction,scattering,rise,spin].every(Number.isFinite)||
 extinction<0||extinction>12||scattering<0||scattering>1||rise<0||rise>.18||
 spin<0||spin>2||!Number.isInteger(samples)||samples<16||samples>96||samples%16!==0||![0,1].includes(homogeneous))throw RangeError('FCG15 parameter range');
if(gl.getParameter(gl.MAX_3D_TEXTURE_SIZE)<N)throw Error('3D texture size unsupported');
function bump(x,y,z,cx,cy,cz,rx,ry,rz){
 const q=((x-cx)/rx)**2+((y-cy)/ry)**2+((z-cz)/rz)**2;
 return Math.max(0,1-q)**2;
}
function density(x,y,z,t){
 if(homogeneous)return 0.5;
 const a=spin*t,c=Math.cos(a),s=Math.sin(a),X=x-.5,Z=z-.5;
 const u=.5+c*X+s*Z,v=.5-s*X+c*Z,w=y-rise*t;
 return .55*bump(u,w,v,.44,.24,.50,.24,.20,.24)+
 .30*bump(u,w,v,.59,.34,.55,.19,.21,.17)+
 .15*bump(u,w,v,.38,.42,.40,.16,.17,.17);
}
function compile(type,source){
 const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);
 if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s;
}
const vs=compile(gl.VERTEX_SHADER,vertexSource),fs=compile(gl.FRAGMENT_SHADER,fragmentSource);
const program=gl.createProgram();gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);
if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program));
gl.deleteShader(vs);gl.deleteShader(fs);gl.useProgram(program);
gl.bindVertexArray(gl.createVertexArray());gl.disable(gl.DITHER);gl.disable(gl.BLEND);
gl.pixelStorei(gl.UNPACK_ALIGNMENT,1);
const tex=gl.createTexture();gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_3D,tex);
for(const axis of [gl.TEXTURE_WRAP_S,gl.TEXTURE_WRAP_T,gl.TEXTURE_WRAP_R])gl.texParameteri(gl.TEXTURE_3D,axis,gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_3D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
gl.texParameteri(gl.TEXTURE_3D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
gl.texStorage3D(gl.TEXTURE_3D,1,gl.R8,N,N,N);
const uniform=name=>gl.getUniformLocation(program,name);
gl.uniform1i(uniform('u_density'),0);
gl.uniform1f(uniform('u_extinction'),extinction);
gl.uniform1f(uniform('u_scattering'),scattering);
gl.uniform1i(uniform('u_samples'),samples);
let frame=0,playing=false,timer=null;
const data=new Uint8Array(N*N*N);
function draw(){
 const t=frame*dt;
 for(let k=0;k<N;k++)for(let j=0;j<N;j++)for(let i=0;i<N;i++){
  const q=density((i+.5)/N,(j+.5)/N,(k+.5)/N,t);
  if(!Number.isFinite(q)||q<0||q>1)throw Error('invalid density');
  data[i+N*(j+N*k)]=Math.round(255*q);
 }
 gl.texSubImage3D(gl.TEXTURE_3D,0,0,0,0,N,N,N,gl.RED,gl.UNSIGNED_BYTE,data);
 gl.uniform1f(uniform('u_aspect'),canvas.width/canvas.height);
 gl.viewport(0,0,canvas.width,canvas.height);gl.drawArrays(gl.TRIANGLES,0,3);
 if(gl.getError()!==gl.NO_ERROR)throw Error('WebGL volume draw failed');
}
function emit(){canvas.dispatchEvent(new CustomEvent('fcg-time-progress',{detail:{value:frame*dt,playing}}));}
function pause(){playing=false;if(timer!==null)clearTimeout(timer);timer=null;emit();}
function step(){pause();if(frame<80){frame++;draw();}emit();}
function reset(){pause();frame=0;draw();emit();}
function play(){
 if(playing)return;
 if(frame===80){frame=0;draw();}
 playing=true;emit();
 function tick(){
  if(!playing)return;
  try{if(!document.hidden){frame++;draw();if(frame===80){pause();return;}emit();}
   timer=setTimeout(tick,70);
  }catch(e){pause();canvas.dispatchEvent(new CustomEvent('fcg-time-failure',{detail:String(e)}));}
 }
 timer=setTimeout(tick,70);
}
draw();
report('MODEL','左：透過・散乱近似、右：z=0.5 m の濃度断面。1 m立方体');
report('GRID',N+'³ R8, '+samples+' samples/ray; ds='+1/samples+' m');
report('UNIFORM','一定密度0.5の解析透過率 '+Math.exp(-extinction*.5)+'（R8標本では '+Math.exp(-extinction*128/255)+'）');
canvas.tabIndex=0;canvas.setAttribute('aria-label','左：体積煙、右：同じ煙の断面。Spaceで再生・停止');
canvas.addEventListener('keydown',e=>{if(e.key===' '){e.preventDefault();playing?pause():play();}});
canvas.addEventListener('webglcontextlost',()=>pause());
window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',e=>{if(e.matches)pause();});
window.addEventListener('pagehide',pause,{once:true});
return {play,pause,step,reset};
