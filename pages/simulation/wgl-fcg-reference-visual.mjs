// Independent, aspect-correct reference animations for FCG8 and WGL4.
// The source-editing / pixel-oracle runner remains a separate learning activity.
import {fcg8State} from './fcg8-lab-core.mjs';
const clamp=(v,a,z)=>Math.max(a,Math.min(z,v));
function initialFrame(lesson){
  const section=document.createElement('section');
  section.className='visual-observation';
  section.setAttribute('aria-label',lesson==='FCG8'?'自由表面の観察':'モデル行列の観察');
  const isFluid=lesson==='FCG8';
  const title=isFluid?'動かして理解する：液滴が伸びる理由':'動かして理解する：行列で長方形を回す';
  const intro=isFluid?
    '同じ1m×1mの液滴を3通りで表示します。白い破線＝厳密界面、黄色い線＝格子から求めた界面です。'+
    '円の縦横比は保存し、観察ビューを横に引き伸ばしません。':
    '四角形と赤・緑の座標軸を同じモデル行列で回します。実際のWebGL2で毎フレーム描画します。';
  section.innerHTML='<header><h2>'+title+'</h2><output class="visual-clock" aria-live="off"></output></header>'+
    '<p>'+intro+'</p><div class="visual-observation-controls">'+
    '<button type="button" data-action="play">一時停止</button>'+
    '<button type="button" data-action="back">最初に戻す</button>'+
    '<label>時刻・角度 <input type="range" min="0" max="1000" step="1" value="0" data-action="seek"></label>'+
    '<label>速度 <select data-action="speed"><option value=".5">0.5倍</option>'+
    '<option value="1" selected>1倍</option><option value="2">2倍</option></select></label>'+
    '</div><div class="visual-observation-grid'+(isFluid?'':' single')+'"></div>'+
    '<p class="visual-stats"></p><p class="visual-model-warning"></p>';
  const grid=section.querySelector('.visual-observation-grid');
  const names=isFluid?['1. 半Lagrange移流','2. 移流＋再初期化','3. 厳密界面＋64粒子']:
    ['モデルの回転（WebGL2）'];
  const legends=isFluid?[
    '黄実線：格子の零等位線／白破線：厳密界面',
    '黄実線：格子の零等位線／白破線：厳密界面',
    '青：液体／橙の点：解析軌道の粒子'
  ]:['水色：モデルの四角形／赤：x軸／緑：y軸'];
  const canvases=names.map((name,i)=>{
    const figure=document.createElement('figure'),figcaption=document.createElement('figcaption');
    figcaption.textContent=name;
    const canvas=document.createElement('canvas');
    // Retina sharpness, independent of the underlying 48-cell numerical grid.
    const ratio=clamp(Number(window.devicePixelRatio)||1,1,2);
    canvas.width=canvas.height=Math.round((isFluid?320:440)*ratio);
    canvas.setAttribute('aria-label',name+'。正方形の物理表示領域');
    const legend=document.createElement('small');legend.textContent=legends[i];
    figure.append(figcaption,canvas,legend);grid.append(figure);return canvas;
  });
  return {section,canvases};
}
function paintGrid(ctx,n){
  ctx.save();ctx.strokeStyle='rgba(210,234,250,.13)';ctx.lineWidth=.8*n/320;
  for(let k=1;k<5;k++){
    const a=k*n/5;
    ctx.beginPath();ctx.moveTo(a,0);ctx.lineTo(a,n);
    ctx.moveTo(0,a);ctx.lineTo(n,a);ctx.stroke();
  }
  ctx.restore();
}
function contour(ctx,n,t,fill=false){
  const r=.18,sh=.6;
  ctx.save();ctx.beginPath();
  for(let k=0;k<=160;k++){
    const a=k*Math.PI*2/160, y=.5+r*Math.sin(a);
    const x=.5+r*Math.cos(a)+sh*t*(y-.5);
    const X=x*n,Y=(1-y)*n;
    if(k===0)ctx.moveTo(X,Y);else ctx.lineTo(X,Y);
  }
  ctx.closePath();
  if(fill){ctx.fillStyle='rgba(31,143,210,.65)';ctx.fill();}
  ctx.setLineDash([6*n/320,4*n/320]);ctx.strokeStyle='#f8fafc';ctx.lineWidth=1.7*n/320;ctx.stroke();ctx.restore();
}
function levelMap(canvas,field){
  const ctx=canvas.getContext('2d'),N=48,n=canvas.width;
  const tmp=document.createElement('canvas');tmp.width=tmp.height=N;
  const off=tmp.getContext('2d'),img=off.createImageData(N,N);
  for(let j=0;j<N;j++)for(let i=0;i<N;i++){
    const value=field[i+j*N],k=(i+(N-1-j)*N)*4;
    const rgb=value<-.012?[18,123,181]:value>.012?[11,30,49]:[246,185,79];
    for(let c=0;c<3;c++)img.data[k+c]=rgb[c];
    img.data[k+3]=255;
  }
  off.putImageData(img,0,0);
  ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.drawImage(tmp,0,0,n,n);
}
function interpolated(a,b,t){
  const out=new Float64Array(a.length);
  for(let i=0;i<out.length;i++)out[i]=a[i]*(1-t)+b[i]*t;
  return out;
}
function zeroLines(ctx,n,field){
  // Marching-squares edge interpolation: identifies sign changes, not a mass fix.
  const N=48,val=(i,j)=>field[i+j*N],point=(i,j,dx,dy,a,b)=>{
    const f=a===b?.5:clamp(a/(a-b),0,1);
    return [(i+.5+f*dx)/N*n,(1-(j+.5+f*dy)/N)*n];
  };
  ctx.save();ctx.beginPath();ctx.strokeStyle='#ffd16a';ctx.lineWidth=2*n/320;
  for(let j=0;j<N-1;j++)for(let i=0;i<N-1;i++){
    const a=val(i,j),b=val(i+1,j),c=val(i+1,j+1),d=val(i,j+1);
    const pts=[];
    if((a<0)!==(b<0))pts.push(point(i,j,1,0,a,b));
    if((b<0)!==(c<0))pts.push(point(i+1,j,0,1,b,c));
    if((c<0)!==(d<0))pts.push(point(i+1,j+1,-1,0,c,d));
    if((d<0)!==(a<0))pts.push(point(i,j+1,0,-1,d,a));
    for(let k=0;k+1<pts.length;k+=2){ctx.moveTo(...pts[k]);ctx.lineTo(...pts[k+1]);}
  }
  ctx.stroke();ctx.restore();
}
function particles(ctx,n,t){
  ctx.save();ctx.fillStyle='#fdae44';ctx.strokeStyle='#502705';
  for(let k=0;k<64;k++){
    const a=k*2*Math.PI/64,y=.5+.18*Math.sin(a);
    const x=.5+.18*Math.cos(a)+.6*t*(y-.5);
    ctx.beginPath();ctx.arc(x*n,(1-y)*n,2.7*n/320,0,2*Math.PI);
    ctx.fill();ctx.lineWidth=.7;ctx.stroke();
  }
  ctx.restore();
}
function createWebGLRotation(canvas){
  const gl=canvas.getContext('webgl2',{alpha:false,antialias:true});
  if(!gl)return null;
  const compile=(kind,code)=>{
    const obj=gl.createShader(kind);if(!obj)throw Error('shader allocation');
    gl.shaderSource(obj,code);gl.compileShader(obj);
    if(!gl.getShaderParameter(obj,gl.COMPILE_STATUS))
      throw Error(gl.getShaderInfoLog(obj)||'shader');
    return obj;
  };
  const vs=compile(gl.VERTEX_SHADER,'#version 300 es\n'+
    'layout(location=0) in vec2 a_pos;\n'+
    'uniform float u_angle;\nvoid main(){\n'+
    'vec2 s=a_pos*vec2(1.0,0.5);\n'+
    'vec2 xy=vec2(cos(u_angle)*s.x-sin(u_angle)*s.y,\n'+
    'sin(u_angle)*s.x+cos(u_angle)*s.y)+vec2(0.25,-0.10);\n'+
    'gl_Position=vec4(xy,0.0,1.0);\n}');
  const fs=compile(gl.FRAGMENT_SHADER,'#version 300 es\nprecision highp float;\n'+
    'uniform vec3 u_color;\nout vec4 outColor;\nvoid main(){outColor=vec4(u_color,1.0);}');
  const program=gl.createProgram();gl.attachShader(program,vs);gl.attachShader(program,fs);
  gl.linkProgram(program);
  if(!gl.getProgramParameter(program,gl.LINK_STATUS))
    throw Error(gl.getProgramInfoLog(program)||'program link');
  gl.deleteShader(vs);gl.deleteShader(fs);
  const vao=gl.createVertexArray(),vbo=gl.createBuffer();
  if(!vao||!vbo)throw Error('VAO allocation');
  gl.bindVertexArray(vao);gl.bindBuffer(gl.ARRAY_BUFFER,vbo);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([
    -.4,-.3,.4,-.3,.4,.3,-.4,-.3,.4,.3,-.4,.3,
    0,0,.65,0,0,0,0,.65
  ]),gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);gl.vertexAttribPointer(0,2,gl.FLOAT,false,0,0);
  gl.useProgram(program);
  const uAngle=gl.getUniformLocation(program,'u_angle'),uColor=gl.getUniformLocation(program,'u_color');
  if(uAngle===null||uColor===null)throw Error('uniform');
  gl.disable(gl.BLEND);gl.disable(gl.DEPTH_TEST);gl.disable(gl.DITHER);
  gl.viewport(0,0,canvas.width,canvas.height);
  const draw=a=>{
    gl.clearColor(.036,.083,.144,1);gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(uAngle,a);
    gl.uniform3f(uColor,.22,.67,.88);gl.drawArrays(gl.TRIANGLES,0,6);
    gl.uniform3f(uColor,1,.35,.3);gl.drawArrays(gl.LINES,6,2);
    gl.uniform3f(uColor,.32,1,.44);gl.drawArrays(gl.LINES,8,2);
  };
  return {draw};
}
export function mountReferenceObservation({lesson,parent}){
  if(!['FCG8','WGL4'].includes(lesson))return null;
  const {section,canvases}=initialFrame(lesson);
  parent.prepend(section);
  const isFluid=lesson==='FCG8',clock=section.querySelector('.visual-clock');
  const seek=section.querySelector('[data-action="seek"]');
  const button=section.querySelector('[data-action="play"]'),stats=section.querySelector('.visual-stats');
  const notes=section.querySelector('.visual-model-warning');
  notes.textContent=isFluid?
    'FCG8の独立CPU基準を使い、96stepの間を表示だけ線形補間します。中間フレームは新しいPDE解ではありません。'+
    'GPU編集コードの連続再生は下の3タブラボで行います。後半は境界付近の数値誤差に注意してください。':
    'WGL4の実際の変換 T×R×S（scaleY=0.5、平行移動=(0.25,-0.10)）を使うWebGL2の観察用シェーダです。'+
    '下の編集欄とは独立であり、コード編集による画素変化は従来のラボで確かめます。';
  let renderer=null;
  if(!isFluid){
    try{renderer=createWebGLRotation(canvases[0]);}
    catch(error){notes.textContent+=' WebGL2初期化失敗: '+String(error.message).slice(0,150);}
    if(!renderer){
      const p=document.createElement('p');p.className='error';
      p.textContent='WebGL2非対応です。GPU回転観察は実行できません。';section.append(p);
    }
  }
  const cache=new Map(),state=k=>{
    if(!cache.has(k))cache.set(k,fcg8State(k));
    return cache.get(k);
  };
  const duration=isFluid?12:8,maxSteps=96;
  let position=0,playing=!matchMedia('(prefers-reduced-motion: reduce)').matches;
  let previous=0,raf=0,frames=0;
  if(!playing)button.textContent='再生';
  const speed=section.querySelector('[data-action="speed"]');
  function paint(){
    const fraction=position/duration;
    seek.value=String(Math.round(fraction*1000));
    if(!isFluid){
      const deg=90+fraction*360;
      clock.textContent='回転角 '+(deg%360).toFixed(0)+'°';
      renderer?.draw(deg*Math.PI/180);
      stats.textContent='T×R×S / 回転の基準角90° / 赤と緑の座標軸も同じ行列で変換';
      return;
    }
    const progress=fraction*maxSteps,k=Math.min(maxSteps,Math.floor(progress)),alpha=progress-k;
    const a=state(k),b=state(Math.min(maxSteps,k+1)),t=progress*.04;
    clock.textContent='物理時刻 '+t.toFixed(2)+' s / step '+progress.toFixed(1);
    for(let i=0;i<3;i++){
      const canvas=canvases[i],ctx=canvas.getContext('2d'),size=canvas.width;
      if(i<2){
        const field=interpolated(i===0?a.raw:a.reinit,i===0?b.raw:b.reinit,alpha);
        levelMap(canvas,field);paintGrid(ctx,size);zeroLines(ctx,size,field);contour(ctx,size,t);
      }else{
        ctx.fillStyle='#0b1e31';ctx.fillRect(0,0,size,size);
        paintGrid(ctx,size);contour(ctx,size,t,true);particles(ctx,size,t);
      }
    }
    if(frames%8===0){
      stats.textContent='離散面積（移流） '+(a.rawMetric.area*(1-alpha)+b.rawMetric.area*alpha).toFixed(5)+
        ' m² ／（再初期化） '+(a.reinitMetric.area*(1-alpha)+b.reinitMetric.area*alpha).toFixed(5)+
        ' m² ／ 解析的面積 '+a.analyticArea.toFixed(5)+' m²（中間は表示補間）';
    }
  }
  function tick(now){
    raf=requestAnimationFrame(tick);
    if(document.hidden||!section.getClientRects().length||!playing){previous=now;return;}
    if(!previous)previous=now;
    const delta=clamp((now-previous)/1000,0,.05);
    previous=now;
    position=isFluid?Math.min(duration,position+delta*Number(speed.value)):
      (position+delta*Number(speed.value))%duration;
    if(isFluid&&position>=duration){playing=false;button.textContent='再生';}
    frames++;paint();
  }
  button.addEventListener('click',()=>{playing=!playing;button.textContent=playing?'一時停止':'再生';previous=0;});
  section.querySelector('[data-action="back"]').addEventListener('click',()=>{position=0;paint();});
  seek.addEventListener('input',()=>{position=Number(seek.value)/1000*duration;paint();previous=0;});
  paint();raf=requestAnimationFrame(tick);
  window.addEventListener('pagehide',()=>cancelAnimationFrame(raf),{once:true});
  return section;
}
