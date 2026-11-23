// FCG3: CPU semi-Lagrangian advection and WebGL2 R8 visualization.
// Student code: modify the characteristic foot, bilinear weights, or fragment GLSL.
// This runs only inside the isolated shared WGL/FCG code laboratory.
const N=32, dt=1/32, omega=2*Math.PI;
const steps=settings.steps;
if(!Number.isInteger(steps)||steps<0||steps>32)throw new RangeError('steps must be 0..32');
const at=i=>(i+0.5)/N, radius=0.14;
function initial(x,y){
  const z=((x-0.7)**2+(y-0.5)**2)/(radius*radius);
  return z<1?(1-z)**2:0;
}
function exact(x,y,t){
  const a=omega*t,c=Math.cos(a),s=Math.sin(a),dx=x-0.5,dy=y-0.5;
  return initial(0.5+c*dx+s*dy,0.5-s*dx+c*dy);
}
function sample(q,x,y){
  // Coordinates are cell centers; zero exterior values model inflow.
  const a=N*x-0.5,b=N*y-0.5,i=Math.floor(a),j=Math.floor(b),u=a-i,v=b-j;
  const g=(ii,jj)=>ii<0||jj<0||ii>=N||jj>=N?0:q[ii+N*jj];
  return (1-u)*(1-v)*g(i,j)+u*(1-v)*g(i+1,j)+
         (1-u)*v*g(i,j+1)+u*v*g(i+1,j+1);
}
let previous=Float64Array.from({length:N*N},(_,k)=>initial(at(k%N),at(Math.floor(k/N))));
let next=new Float64Array(N*N);
const c=Math.cos(omega*dt),s=Math.sin(omega*dt);
for(let n=0;n<steps;n++){
  for(let j=0;j<N;j++)for(let i=0;i<N;i++){
    const dx=at(i)-0.5,dy=at(j)-0.5;
    // Inverse characteristic: exact for this prescribed rotation.
    // Try replacing this by x-dt*u(x) to isolate the tracking error.
    const footX=0.5+c*dx+s*dy, footY=0.5-s*dx+c*dy;
    next[i+N*j]=sample(previous,footX,footY);
  }
  [previous,next]=[next,previous];
}
const analytic=Float64Array.from({length:N*N},(_,k)=>exact(at(k%N),at(Math.floor(k/N)),steps*dt));
const cellArea=1/(N*N);
let mass=0,exactMass=0,l1=0,maximum=0,peak=0;
for(let k=0;k<N*N;k++){
  if(!Number.isFinite(previous[k])||previous[k]<-1e-10||previous[k]>1+1e-10)
    throw new Error('nonfinite or out-of-range scalar at '+k);
  mass+=previous[k]*cellArea;exactMass+=analytic[k]*cellArea;
  l1+=Math.abs(previous[k]-analytic[k])*cellArea;
  maximum=Math.max(maximum,Math.abs(previous[k]-analytic[k]));
  peak=Math.max(peak,previous[k]);
}
function texture(values){
  const bytes=Uint8Array.from(values,q=>Math.round(255*Math.max(0,Math.min(1,q))));
  const tex=gl.createTexture();if(!tex)throw new Error('R8 texture allocation failed');
  gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,tex);
  gl.pixelStorei(gl.UNPACK_ALIGNMENT,1);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D,0,gl.R8,N,N,0,gl.RED,gl.UNSIGNED_BYTE,bytes);
  if(gl.getError()!==gl.NO_ERROR)throw new Error('R8 upload error');
  return tex;
}
const numericalTex=texture(previous),analyticTex=texture(analytic);
function compile(type,source,name){
  const shader=gl.createShader(type);if(!shader)throw new Error(name+' allocation failed');
  gl.shaderSource(shader,source);gl.compileShader(shader);
  if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))
    throw new Error(name+': '+(gl.getShaderInfoLog(shader)||'compile failed'));
  return shader;
}
const vertex=compile(gl.VERTEX_SHADER,vertexSource,'VERTEX');
const fragment=compile(gl.FRAGMENT_SHADER,fragmentSource,'FRAGMENT');
const program=gl.createProgram();if(!program)throw new Error('program allocation failed');
gl.attachShader(program,vertex);gl.attachShader(program,fragment);gl.linkProgram(program);
if(!gl.getProgramParameter(program,gl.LINK_STATUS))
  throw new Error('LINK: '+(gl.getProgramInfoLog(program)||'link failed'));
gl.deleteShader(vertex);gl.deleteShader(fragment);
gl.useProgram(program);
function bind(name,unit,tex){
  const loc=gl.getUniformLocation(program,name);
  if(loc===null)throw new Error('missing '+name+' uniform');
  gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,tex);gl.uniform1i(loc,unit);
}
bind('u_numeric',0,numericalTex);bind('u_exact',1,analyticTex);
const vao=gl.createVertexArray();if(!vao)throw new Error('VAO allocation failed');
gl.bindVertexArray(vao);
gl.disable(gl.DITHER);gl.disable(gl.BLEND);gl.disable(gl.DEPTH_TEST);
gl.disable(gl.SCISSOR_TEST);gl.disable(gl.CULL_FACE);
gl.viewport(0,0,canvas.width,canvas.height);
gl.clearColor(0,0,0,1);gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLES,0,3);
report('GRID','real '+N+'x'+N+' CPU cells per field; canvas '+canvas.width+'x'+canvas.height+' pixels; R8 nearest-neighbor texelFetch');
report('TIME','physical step '+steps+'/32, t='+(steps*dt).toFixed(5)+' s, render != physics');
report('METHOD','CPU updates old->new; exact inverse rotation foot + bilinear interpolation; zero exterior');
report('MASS','area*sum q='+mass.toPrecision(9)+', exact sampled='+exactMass.toPrecision(9)+
  ', difference='+(mass-exactMass).toPrecision(6)+' (NOT conservative)');
report('ERROR','area*sum |q-exact|='+l1.toPrecision(7)+', max cell error='+maximum.toPrecision(7));
report('PEAK','peak q='+peak.toPrecision(7)+'; convex weights bound q to [0,1]');
report('DISPLAY','left=numerical q, right=5x abs(R8 numerical - R8 analytic); GPU draws only');
report('R8','each texture '+(N*N)+' bytes; R8 rounding separated from Float64 CPU metrics');


// FCG3 animated observation uses this *same edited* semi-Lagrangian solver
// and fragment shader, not a separately hard-coded reference demonstration.
// The first frame is kept unchanged until the runner finishes GPU readPixels.
const fcg3Reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
let fcg3Playing=!fcg3Reduced.matches,fcg3FrameStamp=null,fcg3Accum=0,fcg3Step=steps;
canvas.tabIndex=0;
canvas.setAttribute('aria-label','FCG3 染料の回転とぼやけ。クリック・Spaceで一時停止');
canvas.title='クリック／Spaceで再生・停止。移流は物理時間1/32秒ずつ更新し、描画fpsとは区別します。';
function fcg3Toggle(){fcg3Playing=!fcg3Playing;fcg3FrameStamp=null;}
canvas.addEventListener('click',fcg3Toggle);
canvas.addEventListener('keydown',e=>{
  if(e.key===' '||e.key==='Enter'){e.preventDefault();fcg3Toggle();}
});
function fcg3UpdateOnce(){
  if(fcg3Step>=32){
    previous=Float64Array.from({length:N*N},(_,k)=>initial(at(k%N),at(Math.floor(k/N))));
    fcg3Step=0;
  }else{
    for(let j=0;j<N;j++)for(let i=0;i<N;i++){
      const dx=at(i)-.5,dy=at(j)-.5;
      next[i+N*j]=sample(previous,.5+c*dx+s*dy,.5-s*dx+c*dy);
    }
    [previous,next]=[next,previous];fcg3Step++;
  }
  const now=fcg3Step*dt;
  for(let j=0;j<N;j++)for(let i=0;i<N;i++)
    analytic[i+N*j]=exact(at(i),at(j),now);
  gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,numericalTex);
  gl.texSubImage2D(gl.TEXTURE_2D,0,0,0,N,N,gl.RED,gl.UNSIGNED_BYTE,
    Uint8Array.from(previous,q=>Math.round(255*Math.max(0,Math.min(1,q)))));
  gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_2D,analyticTex);
  gl.texSubImage2D(gl.TEXTURE_2D,0,0,0,N,N,gl.RED,gl.UNSIGNED_BYTE,
    Uint8Array.from(analytic,q=>Math.round(255*Math.max(0,Math.min(1,q)))));
}
function fcg3VisualFrame(now){
  if(fcg3Playing&&!document.hidden){
    if(fcg3FrameStamp===null)fcg3FrameStamp=now;
    const elapsed=Math.min(.1,Math.max(0,(now-fcg3FrameStamp)/1000));
    fcg3FrameStamp=now;fcg3Accum+=elapsed;
    // Slow playback: one physical update every 125 ms. This does NOT
    // change dt or its numerical stability, only the observation rate.
    if(fcg3Accum>=.125){fcg3Accum-=.125;fcg3UpdateOnce();}
    gl.useProgram(program);gl.bindVertexArray(vao);
    gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,numericalTex);
    gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_2D,analyticTex);
    gl.viewport(0,0,canvas.width,canvas.height);
    gl.drawArrays(gl.TRIANGLES,0,3);
  }else fcg3FrameStamp=null;
  requestAnimationFrame(fcg3VisualFrame);
}
requestAnimationFrame(fcg3VisualFrame);
