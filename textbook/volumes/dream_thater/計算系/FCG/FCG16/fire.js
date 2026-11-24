// FCG16: each cell transports fuel, heat and smoke upward by one row per step.
const N=48;
const reaction=0.18;
const cooling=0.28;
const decay=0.04;
const emission=3;
const extinction=5;
const dt=0.05;
if(![reaction,cooling,decay,emission,extinction].every(Number.isFinite)||
 reaction<0||reaction>.4||cooling<0||cooling>.6||decay<0||decay>.2||
 emission<0||emission>5||extinction<0||extinction>10)throw RangeError('FCG16 parameter range');
function react(F,H,S){
 const b=reaction*F;
 return [(1-reaction)*F,(1-cooling)*H+b,(1-decay)*S+b];
}
const cells=new Float64Array(N*N*3);
let frame=-N,playing=false,timer=null;
function advance(){
 frame++;
 for(let j=N-1;j>=1;j--)for(let i=0;i<N;i++){
  const dst=3*(i+N*j),src=dst-3*N;
  const v=react(cells[src],cells[src+1],cells[src+2]);
  if(!v.every(q=>Number.isFinite(q)&&q>=0&&q<=1+1e-12)||v[0]+v[1]>1+1e-12||v[0]+v[2]>1+1e-12)throw Error('invalid reaction state');
  cells.set(v,dst);
 }
 const center=.5+.08*Math.sin(3*frame*dt);
 for(let i=0;i<N;i++){const q=((i+.5)/N-center)/.10;cells.set([Math.exp(-q*q),0,0],3*i);}
}
function initialize(){cells.fill(0);frame=-N;for(let i=0;i<N;i++)advance();}
initialize();
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
const tex=gl.createTexture();gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,tex);
gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
gl.texStorage2D(gl.TEXTURE_2D,1,gl.RGBA8,N,N);
const uniform=name=>gl.getUniformLocation(program,name);
gl.uniform1i(uniform('u_state'),0);
gl.uniform1f(uniform('u_extinction'),extinction);
gl.uniform1f(uniform('u_emission'),emission);
const data=new Uint8Array(4*N*N);
function draw(){
 for(let i=0;i<N*N;i++){for(let k=0;k<3;k++)data[4*i+k]=Math.round(255*cells[3*i+k]);data[4*i+3]=255;}
 gl.texSubImage2D(gl.TEXTURE_2D,0,0,0,N,N,gl.RGBA,gl.UNSIGNED_BYTE,data);
 gl.uniform1f(uniform('u_aspect'),canvas.width/canvas.height);
 gl.viewport(0,0,canvas.width,canvas.height);gl.drawArrays(gl.TRIANGLES,0,3);
 if(gl.getError()!==gl.NO_ERROR)throw Error('WebGL fire draw failed');
}
function emit(){canvas.dispatchEvent(new CustomEvent('fcg-time-progress',{detail:{value:frame*dt,playing}}));}
function pause(){playing=false;if(timer!==null)clearTimeout(timer);timer=null;emit();}
function step(){pause();if(frame<80){advance();draw();}emit();}
function reset(){pause();initialize();draw();emit();}
function play(){
 if(playing)return;
 if(frame===80){initialize();draw();}
 playing=true;emit();
 function tick(){
  if(!playing)return;
  try{if(!document.hidden){advance();draw();if(frame===80){pause();return;}emit();}
   timer=setTimeout(tick,70);
  }catch(e){pause();canvas.dispatchEvent(new CustomEvent('fcg-time-failure',{detail:String(e)}));}
 }
 timer=setTimeout(tick,70);
}
draw();
report('MODEL','左：合成、中央：発光のみ、右：煙のみ。固定速度で上昇する燃料・熱・煙');
report('GRID',N+'×'+N+' cells; dt='+dt+' s; RGBA8 nearest');
report('REACTION','fuel consumption='+reaction+', cooling='+cooling+', smoke decay='+decay);
canvas.tabIndex=0;canvas.setAttribute('aria-label','左：炎と煙、中央：炎のみ、右：煙のみ。Spaceで再生・停止');
canvas.addEventListener('keydown',e=>{if(e.key===' '){e.preventDefault();playing?pause():play();}});
canvas.addEventListener('webglcontextlost',()=>pause());
window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',e=>{if(e.matches)pause();});
window.addEventListener('pagehide',pause,{once:true});
return {play,pause,step,reset};
