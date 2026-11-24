// FCG18: planar floating disk and ballistic fluid parcels; event-driven normal impulses.
const mass=0.4;
const dt=0.05;
const restitution=1;
const m=0.02,R=0.12,N=24;
if(!Number.isFinite(mass)||mass<.2||mass>1||!Number.isFinite(dt)||dt<.025||dt>.1||!Number.isFinite(restitution)||restitution<0||restitution>1)throw RangeError('FCG18 parameter range');
function createModel(twoWay){
 const body={x:.6,y:.5,u:0,v:0};
 const particles=Array.from({length:N},(_,k)=>({x:.10+.075*(k%4),y:.24+.10*Math.floor(k/4),u:.45+.03*(k%4),v:0}));
 let time=0,extX=0,extY=0,last=null,contacts=0,penetration=0,average=[0,0];
 const P=()=>particles.reduce((a,q)=>[a[0]+m*q.u,a[1]+m*q.v],[mass*body.u,mass*body.v]);
 const initial=P();
 function drift(t){for(const q of [...particles,body]){q.x+=t*q.u;q.y+=t*q.v;}time+=t;}
 function advance(duration){
  let remaining=duration;average=[0,0];
  for(let count=0;remaining>1e-12;count++){
   if(count>4096)throw Error('Too many contact events');
   let event=null,t=remaining;
   function candidate(s,e){if(Number.isFinite(s)&&s>=-1e-10&&s<=t){t=Math.max(0,s);event=e;}}
   for(const q of [...particles,body]){
    const radius=q===body?R:0;
    for(const [pos,vel,axis] of [[q.x,q.u,'x'],[q.y,q.v,'y']]){
     if(vel>1e-12)candidate((1-radius-pos)/vel,{q,axis,hi:true});
     else if(vel< -1e-12)candidate((radius-pos)/vel,{q,axis,hi:false});
    }
   }
   for(const q of particles){
    const x=q.x-body.x,y=q.y-body.y,u=q.u-body.u,v=q.v-body.v;
    const a=u*u+v*v,b=x*u+y*v,c=x*x+y*y-R*R,D=b*b-a*c;
    if(a>0&&b< -1e-12&&D>1e-18){
     const s=Math.max(0,c)/(-b+Math.sqrt(D));
     candidate(s,{q,contact:true});
    }
   }
   drift(t);remaining-=t;
   if(!event)break;
   const q=event.q;
   if(event.contact){
    const x=q.x-body.x,y=q.y-body.y,d=Math.hypot(x,y),nx=x/d,ny=y/d;
    const g=(q.u-body.u)*nx+(q.v-body.v)*ny;
    if(g>=-1e-10)throw Error('Non-approaching contact');
    const J=-(1+restitution)*g/(1/m+(twoWay?1/mass:0));
    q.u+=J*nx/m;q.v+=J*ny/m;
    if(twoWay){body.u-=J*nx/mass;body.v-=J*ny/mass;}
    else{extX+=J*nx;extY+=J*ny;}
    average[0]-=J*nx/duration;average[1]-=J*ny/duration;
    last={x:q.x,y:q.y,jx:J*nx,jy:J*ny,time};contacts++;
   }else{
    const k=event.axis==='x'?'u':'v',rad=q===body?R:0,weight=q===body?mass:m;
    q[event.axis]=event.hi?1-rad:rad;
    const change=-2*weight*q[k];q[k]=-q[k];
    if(k==='u')extX+=change;else extY+=change;
   }
   check();
  }
  check();
 }
 function check(){
  for(const q of [...particles,body]){
   const r=q===body?R:0;
   penetration=Math.max(penetration,r-q.x,r-q.y,q.x-(1-r),q.y-(1-r));
   if(q!==body)penetration=Math.max(penetration,R-Math.hypot(q.x-body.x,q.y-body.y));
   if(![q.x,q.y,q.u,q.v].every(Number.isFinite))throw Error('Nonfinite state');
  }
  const p=P();
  if(penetration>1e-8||Math.hypot(p[0]-initial[0]-extX,p[1]-initial[1]-extY)>1e-9)throw Error('Contact/momentum check failed');
 }
 return {advance,snapshot:()=>{const p=P();return {body:{...body},particles:particles.map(q=>({...q})),last:last&&{...last},time,contacts,penetration,average:[...average],external:[extX,extY],momentum:p,error:Math.hypot(p[0]-initial[0]-extX,p[1]-initial[1]-extY)};}};
}
let models,time=0,playing=false,timer=null;
function initialize(){models=[createModel(false),createModel(true)];time=0;}
function advance(){const d=Math.min(dt,4-time);if(d>1e-12){for(const model of models)model.advance(d);time=Math.min(4,time+d);}if(4-time<1e-10)time=4;}
initialize();
// GPU DISPLAY
function compile(type,source){
 const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);
 if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s;
}
const vs=compile(gl.VERTEX_SHADER,vertexSource),fs=compile(gl.FRAGMENT_SHADER,fragmentSource);
const program=gl.createProgram();gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);
if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program));
gl.deleteShader(vs);gl.deleteShader(fs);gl.useProgram(program);gl.bindVertexArray(gl.createVertexArray());gl.disable(gl.DITHER);gl.disable(gl.BLEND);
const loc=name=>gl.getUniformLocation(program,name);
const metrics=document.createElement('p');metrics.setAttribute('aria-label','運動量と接触診断');canvas.after(metrics);
function draw(){
 const states=models.map(q=>q.snapshot());
 gl.uniform4fv(loc('u_particles[0]'),new Float32Array(states.flatMap(s=>s.particles.flatMap(q=>[q.x,q.y,q.u,q.v]))));
 gl.uniform4fv(loc('u_bodies[0]'),new Float32Array(states.flatMap(s=>[s.body.x,s.body.y,s.body.u,s.body.v])));
 gl.uniform4fv(loc('u_contact[0]'),new Float32Array(states.flatMap(s=>s.last&&time-s.last.time<.35?[s.last.x,s.last.y,s.last.jx,s.last.jy]:[0,0,0,0])));
 gl.viewport(0,0,canvas.width,canvas.height);gl.drawArrays(gl.TRIANGLES,0,3);
 if(gl.getError()!==gl.NO_ERROR)throw Error('WebGL contact display failed');
 const pair=v=>'('+v.map(x=>x.toFixed(3)).join(', ')+')';
 metrics.textContent=states.map((s,i)=>(i?'右 二方向':'左 一方向')+'：物体速度 '+pair([s.body.u,s.body.v])+' m/s、接触 '+s.contacts+' 回、直前刻みの物体平均力 '+pair(s.average)+' N、外力積補正後の運動量誤差 '+s.error.toExponential(2)+' kg·m/s、最大貫通 '+s.penetration.toExponential(2)+' m').join('　｜　');
}
function emit(){canvas.dispatchEvent(new CustomEvent('fcg-time-progress',{detail:{value:time,playing}}));}
function pause(){playing=false;if(timer!==null)clearTimeout(timer);timer=null;emit();}
function step(){pause();if(time<4){advance();draw();}emit();}
function reset(){pause();initialize();draw();emit();}
function play(){
 if(playing)return;if(time===4){initialize();draw();}
 playing=true;emit();
 function tick(){if(!playing)return;try{if(!document.hidden){advance();draw();if(time===4){pause();return;}emit();}timer=setTimeout(tick,80);}
 catch(e){pause();canvas.dispatchEvent(new CustomEvent('fcg-time-failure',{detail:String(e)}));}}
 timer=setTimeout(tick,80);
}
draw();
report('MODEL','左：固定浮体（一方向）、右：自由並進（二方向）。青い粒子、橙の浮体、白と橙の反対向き矢印');
report('GRID','24 parcels per panel, 1 m square; dt='+dt+' s; event-driven CPU Float64, WebGL2 display');
canvas.tabIndex=0;canvas.setAttribute('aria-label','左 一方向・右 二方向。Spaceで再生・停止');
canvas.addEventListener('keydown',e=>{if(e.key===' '){e.preventDefault();playing?pause():play();}});
canvas.addEventListener('webglcontextlost',pause);
window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',e=>{if(e.matches)pause();});
window.addEventListener('pagehide',pause,{once:true});
return {play,pause,step,reset};
