// Independent FCG5 observation model: semi-Lagrangian 2D colored dye and
// velocity projection. NOT the editable 12x12 FCG5 model or a turbulence solver.
// Implementation authored for this textbook; external fluid demos are UX references.
const clamp=(v,a,z)=>Math.max(a,Math.min(z,v));
const colors=[[.08,.95,.79],[1,.20,.57],[.22,.44,1],[1,.62,.15]];
const at=(n,i,j)=>i+n*j;
const get=(a,n,i,j)=>a[at(n,clamp(i,0,n-1),clamp(j,0,n-1))];
function bilinear(a,n,x,y){
  const X=clamp(x,0,n-1),Y=clamp(y,0,n-1);
  const i=Math.floor(X),j=Math.floor(Y),u=X-i,v=Y-j;
  return (1-v)*((1-u)*get(a,n,i,j)+u*get(a,n,i+1,j))+
    v*((1-u)*get(a,n,i,j+1)+u*get(a,n,i+1,j+1));
}
export function createSmokeState(n=80){
  if(!Number.isInteger(n)||n<24||n>160)throw RangeError('grid dimension');
  const f=()=>new Float32Array(n*n);
  const s={n,u:f(),v:f(),r:f(),g:f(),b:f(),time:0,step:0};
  for(const [x,y,ux,uy,c] of [[.25,.40,.20,-.12,0],[.74,.62,-.16,.17,1],
    [.52,.24,.16,.14,2],[.43,.76,-.19,-.11,3]])
    splatSmoke(s,x,y,ux,uy,colors[c],.07);
  return s;
}
export function splatSmoke(s,x,y,vx,vy,color=colors[0],radius=.055){
  if(![x,y,vx,vy,radius,...color].every(Number.isFinite)||radius<=0)throw RangeError('splat');
  const n=s.n,rr=radius*radius;
  const x0=Math.max(1,Math.floor((x-3*radius)*n)),x1=Math.min(n-2,Math.ceil((x+3*radius)*n));
  const y0=Math.max(1,Math.floor((y-3*radius)*n)),y1=Math.min(n-2,Math.ceil((y+3*radius)*n));
  for(let j=y0;j<=y1;j++)for(let i=x0;i<=x1;i++){
    const dx=(i+.5)/n-x,dy=(j+.5)/n-y;
    const w=Math.exp(-(dx*dx+dy*dy)/(2*rr)),k=at(n,i,j);
    s.u[k]=clamp(s.u[k]+clamp(vx,-1.5,1.5)*w,-2,2);
    s.v[k]=clamp(s.v[k]+clamp(vy,-1.5,1.5)*w,-2,2);
    s.r[k]=clamp(s.r[k]+color[0]*w,0,3);
    s.g[k]=clamp(s.g[k]+color[1]*w,0,3);
    s.b[k]=clamp(s.b[k]+color[2]*w,0,3);
  }
}
export function advanceSmoke(s,dt=1/60,{swirl=.15,fade=.998}={}){
  if(!Number.isFinite(dt)||dt<=0||dt>.05||
      !Number.isFinite(swirl)||swirl<0||swirl>1||
      !Number.isFinite(fade)||fade<.95||fade>1)throw RangeError('simulation settings');
  const n=s.n,h=1/n,count=n*n,u=new Float32Array(count),v=new Float32Array(count);
  for(let j=1;j<n-1;j++)for(let i=1;i<n-1;i++){
    const k=at(n,i,j),x=i-dt*s.u[k]/h,y=j-dt*s.v[k]/h;
    u[k]=bilinear(s.u,n,x,y)*.999;v[k]=bilinear(s.v,n,x,y)*.999;
  }
  if(swirl){
    const curl=new Float32Array(count);
    for(let j=1;j<n-1;j++)for(let i=1;i<n-1;i++){
      const k=at(n,i,j);
      curl[k]=(v[k+1]-v[k-1]-u[k+n]+u[k-n])/(2*h);
    }
    for(let j=2;j<n-2;j++)for(let i=2;i<n-2;i++){
      const k=at(n,i,j);
      const dx=(Math.abs(curl[k+1])-Math.abs(curl[k-1]))/(2*h);
      const dy=(Math.abs(curl[k+n])-Math.abs(curl[k-n]))/(2*h);
      const norm=Math.hypot(dx,dy)+1e-5;
      u[k]=clamp(u[k]+dt*swirl*h*dy/norm*curl[k],-2,2);
      v[k]=clamp(v[k]-dt*swirl*h*dx/norm*curl[k],-2,2);
    }
  }
  const div=new Float32Array(count),pressure=new Float32Array(count),tmp=new Float32Array(count);
  let p=pressure,q=tmp;
  for(let j=1;j<n-1;j++)for(let i=1;i<n-1;i++){
    const k=at(n,i,j);
    div[k]=-h*.5*(u[k+1]-u[k-1]+v[k+n]-v[k-n]);
  }
  for(let pass=0;pass<26;pass++){
    for(let j=1;j<n-1;j++)for(let i=1;i<n-1;i++){
      const k=at(n,i,j);
      q[k]=(div[k]+p[k-1]+p[k+1]+p[k-n]+p[k+n])*.25;
    }
    [p,q]=[q,p];
  }
  for(let j=1;j<n-1;j++)for(let i=1;i<n-1;i++){
    const k=at(n,i,j);
    u[k]=clamp(u[k]-(p[k+1]-p[k-1])/(2*h),-2,2);
    v[k]=clamp(v[k]-(p[k+n]-p[k-n])/(2*h),-2,2);
  }
  const dye=[s.r,s.g,s.b].map(a=>{
    const out=new Float32Array(count);
    for(let j=1;j<n-1;j++)for(let i=1;i<n-1;i++){
      const k=at(n,i,j);
      out[k]=Math.max(0,bilinear(a,n,i-dt*u[k]/h,j-dt*v[k]/h)*fade);
    }
    return out;
  });
  Object.assign(s,{u,v,r:dye[0],g:dye[1],b:dye[2],time:s.time+dt,step:s.step+1});
  return s;
}
export function smokeMetrics(s){
  let sum=0,maxSpeed=0;
  for(let k=0;k<s.u.length;k++){
    sum+=s.r[k]+s.g[k]+s.b[k];
    maxSpeed=Math.max(maxSpeed,Math.hypot(s.u[k],s.v[k]));
  }
  return {meanDye:sum/s.u.length,maxSpeed};
}
// Render the CPU-computed dye with WebGL2 texture filtering and a restrained
// multi-tap glow. The simulation still runs on CPU; this is only a display pass.
function createSmokeGpuPainter(canvas,N=80){
  const gl=canvas.getContext('webgl2',{alpha:false,antialias:false});
  if(!gl)return null;
  const compile=(type,source)=>{
    const sh=gl.createShader(type);if(!sh)throw Error('WebGL shader allocation');
    gl.shaderSource(sh,source);gl.compileShader(sh);
    if(!gl.getShaderParameter(sh,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(sh)||'compile');
    return sh;
  };
  const vertex=compile(gl.VERTEX_SHADER,'#version 300 es\n'+
    'out vec2 v_uv;\nvoid main(){\n'+
    'vec2 p=vec2((gl_VertexID<<1)&2,gl_VertexID&2);\n'+
    'v_uv=p;gl_Position=vec4(2.0*p-1.0,0.0,1.0);\n}');
  const fragment=compile(gl.FRAGMENT_SHADER,'#version 300 es\nprecision highp float;\n'+
    'uniform sampler2D u_dye;\nin vec2 v_uv;\nout vec4 outColor;\n'+
    'void main(){\n'+
    'vec3 dye=texture(u_dye,v_uv).rgb;\n'+
    'vec2 q=vec2(2.5/80.0);\n'+
    'vec3 blurred=(texture(u_dye,v_uv+vec2(q.x,0.0)).rgb+\n'+
    'texture(u_dye,v_uv-vec2(q.x,0.0)).rgb+\n'+
    'texture(u_dye,v_uv+vec2(0.0,q.y)).rgb+\n'+
    'texture(u_dye,v_uv-vec2(0.0,q.y)).rgb)*0.25;\n'+
    'vec3 emission=1.0-exp(-2.5*dye);\n'+
    'vec3 halo=(1.0-exp(-2.0*blurred))*0.23;\n'+
    'vec3 col=clamp(vec3(0.017,0.025,0.06)+emission+halo,0.0,1.0);\n'+
    'outColor=vec4(col,1.0);\n}');
  const program=gl.createProgram();
  if(!program)throw Error('WebGL program allocation');
  gl.attachShader(program,vertex);gl.attachShader(program,fragment);gl.linkProgram(program);
  if(!gl.getProgramParameter(program,gl.LINK_STATUS))
    throw Error(gl.getProgramInfoLog(program)||'program link');
  gl.deleteShader(vertex);gl.deleteShader(fragment);
  const vao=gl.createVertexArray(),tex=gl.createTexture();
  if(!vao||!tex)throw Error('WebGL resource allocation');
  gl.bindVertexArray(vao);gl.useProgram(program);
  const location=gl.getUniformLocation(program,'u_dye');
  if(location===null)throw Error('missing texture uniform');
  gl.uniform1i(location,0);
  gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,tex);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
  const pixels=new Uint8Array(N*N*4);
  gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA8,N,N,0,gl.RGBA,gl.UNSIGNED_BYTE,pixels);
  gl.viewport(0,0,canvas.width,canvas.height);
  gl.disable(gl.DEPTH_TEST);gl.disable(gl.DITHER);gl.disable(gl.BLEND);
  return {paint(state){
    for(let i=0;i<N*N;i++){
      const p=i*4;
      pixels[p]=Math.round(clamp(state.r[i]/3,0,1)*255);
      pixels[p+1]=Math.round(clamp(state.g[i]/3,0,1)*255);
      pixels[p+2]=Math.round(clamp(state.b[i]/3,0,1)*255);
      pixels[p+3]=255;
    }
    gl.texSubImage2D(gl.TEXTURE_2D,0,0,0,N,N,gl.RGBA,gl.UNSIGNED_BYTE,pixels);
    gl.clearColor(.017,.025,.06,1);gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES,0,3);
  }};
}

export function mountSmokeObservation(parent){
  const section=document.createElement('section');
  section.className='visual-observation visual-smoke';
  section.setAttribute('aria-label','染料と渦を動かす観察ビュー');
  section.innerHTML='<header><h2>動かして理解する：色を入れて流れを作る</h2>'+
    '<output class="visual-clock" aria-live="off"></output></header>'+
    '<p>キャンバスをドラッグして染料と速度を追加します。色は染料の表示で、発光現象ではありません。</p>'+
    '<div class="visual-smoke-stage"><canvas width="560" height="560"'+
    ' aria-label="染料が渦を作る2Dアニメーション。ドラッグでかき混ぜる"></canvas>'+
    '<span class="visual-smoke-hint">DRAG TO STIR · マウス・タッチ対応</span></div>'+
    '<div class="visual-observation-controls">'+
    '<button type="button" data-action="play">一時停止</button>'+
    '<button type="button" data-action="reset">初期化</button>'+
    '<button type="button" data-action="splat">色を追加</button>'+
    '<label>渦を強める <input type="range" data-action="swirl" min="0" max="100" value="15"></label>'+
    '<label>速度 <select data-action="rate"><option value=".5">0.5倍</option>'+
    '<option value="1" selected>1倍</option><option value="2">2倍</option></select></label>'+
    '</div><p class="visual-stats" aria-live="off"></p>'+
    '<p class="visual-model-warning"><strong>独立した観察用の簡易2Dモデル</strong>です。'+
    '染料・速度の逆追跡と圧力反復、任意の渦強調を使います。3D煙、浮力、燃焼、'+
    '高精度乱流モデルではありません。下のコード編集・GPU検算は別のFCG5の12×12物理モデルです。'+
    '観察用モデルの結果が編集コードの出力だと誤認しないでください。</p>';
  parent.prepend(section);
  const canvas=section.querySelector('canvas');
  let gpu=null;
  try{gpu=createSmokeGpuPainter(canvas,80);}catch(error){
    section.querySelector('.visual-model-warning').textContent+=' WebGL2描画エラー: '+String(error.message).slice(0,120);
  }
  const ctx=gpu?null:canvas.getContext('2d',{alpha:false});
  const clock=section.querySelector('.visual-clock');
  if(!ctx&&!gpu){clock.textContent='WebGL2 / Canvas2D非対応';return section;}
  const status=document.createElement('small');
  status.className='visual-renderer-status';
  status.textContent=gpu?'表示：WebGL2（CPU流体場をGPUテクスチャ描画）':
    '表示：Canvas2D（WebGL2非対応時の代替）';
  section.querySelector('.visual-smoke-stage').after(status);
  const off=document.createElement('canvas');off.width=off.height=80;
  const offctx=off.getContext('2d',{alpha:false}),pixels=offctx.createImageData(80,80);
  let state=createSmokeState(80),playing=!matchMedia('(prefers-reduced-motion: reduce)').matches;
  let previous=0,number=0,raf=0,down=false,pointBefore=null,palette=0;
  const play=section.querySelector('[data-action="play"]'),speed=section.querySelector('[data-action="rate"]');
  const swirl=section.querySelector('[data-action="swirl"]'),stats=section.querySelector('.visual-stats');
  function paint(){
    for(let j=0;j<80;j++)for(let i=0;i<80;i++){
      const k=i+80*j,a=4*(i+80*(79-j));
      const dye=[state.r[k],state.g[k],state.b[k]],glow=Math.min(38,18*Math.max(...dye));
      for(let c=0;c<3;c++){
        const level=[6,11,23][c]+230*(1-Math.exp(-1.7*dye[c]))+glow;
        pixels.data[a+c]=clamp(Math.round(level),0,255);
      }
      pixels.data[a+3]=255;
    }
    if(gpu){gpu.paint(state);}else{
      offctx.putImageData(pixels,0,0);
      ctx.imageSmoothingEnabled=true;ctx.drawImage(off,0,0,560,560);
    }
    clock.textContent='物理時刻 '+state.time.toFixed(2)+' s / '+state.step+' steps';
    if(number%10===0){
      const m=smokeMetrics(state);
      stats.textContent='平均染料 '+m.meanDye.toFixed(3)+
        ' ／ 最大速度 '+m.maxSpeed.toFixed(3)+'（単位長1・無次元実験）';
    }
  }
  const getPoint=e=>{
    const rect=canvas.getBoundingClientRect();
    return {x:clamp((e.clientX-rect.left)/rect.width,0,1),
      y:clamp(1-(e.clientY-rect.top)/rect.height,0,1)};
  };
  canvas.style.touchAction='none';
  canvas.addEventListener('pointerdown',e=>{
    e.preventDefault();canvas.setPointerCapture(e.pointerId);
    down=true;pointBefore=getPoint(e);palette=(palette+1)%colors.length;
    splatSmoke(state,pointBefore.x,pointBefore.y,0,.13,colors[palette]);
    status.dataset.inputCount=String(Number(status.dataset.inputCount||0)+1);
    status.textContent=(gpu?'表示：WebGL2':'表示：Canvas2D')+' ／染料を投入しました';
    paint();
  });
  canvas.addEventListener('pointermove',e=>{
    if(!down||!pointBefore)return;
    const p=getPoint(e),dx=p.x-pointBefore.x,dy=p.y-pointBefore.y;
    splatSmoke(state,p.x,p.y,clamp(dx*12,-1.3,1.3),
      clamp(dy*12,-1.3,1.3),colors[palette],.04);
    pointBefore=p;if(!playing)paint();
  });
  const release=()=>{down=false;pointBefore=null;};
  canvas.addEventListener('pointerup',release);
  canvas.addEventListener('pointercancel',release);
  if(!playing)play.textContent='再生';
  play.addEventListener('click',()=>{
    playing=!playing;play.textContent=playing?'一時停止':'再生';previous=0;
  });
  section.querySelector('[data-action="reset"]').addEventListener('click',()=>{state=createSmokeState(80);paint();});
  section.querySelector('[data-action="splat"]').addEventListener('click',()=>{
    palette=(palette+1)%colors.length;
    splatSmoke(state,.3+Math.random()*.4,.3+Math.random()*.4,
      Math.random()*.5-.25,Math.random()*.5-.25,colors[palette],.065);paint();
  });
  function tick(now){
    raf=requestAnimationFrame(tick);
    if(document.hidden||!section.getClientRects().length||!playing){previous=now;return;}
    if(!previous)previous=now;
    const delta=clamp((now-previous)/1000,0,.05);
    if(delta<1/34)return;
    previous=now;number++;
    advanceSmoke(state,Math.min(.05,delta*Number(speed.value)),
      {swirl:Number(swirl.value)/100,fade:.998});
    paint();
  }
  paint();raf=requestAnimationFrame(tick);
  window.addEventListener('pagehide',()=>cancelAnimationFrame(raf),{once:true});
  return section;
}
