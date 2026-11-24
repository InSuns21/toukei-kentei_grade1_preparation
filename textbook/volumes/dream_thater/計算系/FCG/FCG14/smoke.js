// FCG14: FCG5 MAC projection + conservative scalar fluxes. Physical arrays are Float64.
const N=48;
const buoyancy=0.03;
const heatSource=3;
const smokeSource=1;
const kappa=0.0005;
const dt=0.025;
function createSmoke({N,dt,buoyancy,heatSource,smokeSource,kappa}){
  if(![32,48,64].includes(N)||!Number.isFinite(dt)||dt<=0||dt>.025||
     ![buoyancy,heatSource,smokeSource,kappa].every(Number.isFinite)||
     buoyancy<0||buoyancy>.06||heatSource<0||heatSource>4||smokeSource<0||smokeSource>1||kappa<0||kappa>.002)throw RangeError('FCG14 parameter range');
  const h=1/N,nu=.001,vis=nu*dt/(h*h);
  if(vis>.25)throw Error('viscosity step bound');
  const c=(i,j)=>i+N*j,ix=(i,j)=>i+(N+1)*j,iy=(i,j)=>i+N*j;
  let u,v,q,T,step,div,massError,heatError;
  function reset(){u=new Float64Array((N+1)*N);v=new Float64Array(N*(N+1));q=new Float64Array(N*N);T=new Float64Array(N*N);step=0;div=massError=heatError=0;}
  reset();
  const source=Float64Array.from(q,(_,k)=>Math.exp(-(((k%N+.5)*h-.44)**2+((Math.floor(k/N)+.5)*h-.12)**2)/.085**2));
  const sum=a=>a.reduce((s,z)=>s+z,0)*h*h;
  const sourceIntegral=sum(source);
  function sample(a,w,n,ox,oy,x,y){
    const X=Math.min(w-1,Math.max(0,x/h-ox)),Y=Math.min(n-1,Math.max(0,y/h-oy));
    const i=Math.floor(X),j=Math.floor(Y),I=Math.min(w-1,i+1),J=Math.min(n-1,j+1),s=X-i,t=Y-j;
    return (1-t)*((1-s)*a[i+w*j]+s*a[I+w*j])+t*((1-s)*a[i+w*J]+s*a[I+w*J]);
  }
  function D(U,V,i,j){return (U[ix(i+1,j)]-U[ix(i,j)]+V[iy(i,j+1)]-V[iy(i,j)])/h;}
  function advance(){
    const U=new Float64Array(u.length),V=new Float64Array(v.length);
    for(let j=0;j<N;j++)for(let i=1;i<N;i++){
      const k=ix(i,j),x=i*h,y=(j+.5)*h,ux=u[k],vy=sample(v,N,N+1,.5,0,x,y);
      U[k]=sample(u,N+1,N,0,.5,x-dt*ux,y-dt*vy)+vis*(u[ix(i-1,j)]+u[ix(i+1,j)]+u[ix(i,Math.max(j-1,0))]+u[ix(i,Math.min(j+1,N-1))]-4*ux);
    }
    for(let j=1;j<N;j++)for(let i=0;i<N;i++){
      const k=iy(i,j),x=(i+.5)*h,y=j*h,vy=v[k],ux=sample(u,N+1,N,0,.5,x,y);
      V[k]=sample(v,N,N+1,.5,0,x-dt*ux,y-dt*vy)+vis*(v[iy(Math.max(i-1,0),j)]+v[iy(Math.min(i+1,N-1),j)]+v[iy(i,j-1)]+v[iy(i,j+1)]-4*vy)+dt*buoyancy*(T[c(i,j-1)]+T[c(i,j)])/2;
    }
    // FCG5 MAC pressure projection, using pressure divided by constant density.
    const rhs=new Float64Array(N*N),p=new Float64Array(N*N);
    for(let j=0;j<N;j++)for(let i=0;i<N;i++)rhs[c(i,j)]=D(U,V,i,j)/dt;
    function neighbors(i,j){let s=0,m=0;if(i>0){s+=p[c(i-1,j)];m++;}if(i<N-1){s+=p[c(i+1,j)];m++;}if(j>0){s+=p[c(i,j-1)];m++;}if(j<N-1){s+=p[c(i,j+1)];m++;}return [s,m];}
    let residual=Infinity;const omega=2/(1+Math.sin(Math.PI/N));
    for(let it=1;it<=16*N;it++){
      for(let parity=0;parity<2;parity++)for(let j=0;j<N;j++)for(let i=(j+parity)%2;i<N;i+=2){const k=c(i,j),[s,m]=neighbors(i,j);p[k]+=omega*((s-h*h*rhs[k])/m-p[k]);}
      if(it%4===0){residual=0;for(let j=0;j<N;j++)for(let i=0;i<N;i++){const k=c(i,j),[s,m]=neighbors(i,j);residual=Math.max(residual,Math.abs((s-m*p[k])/(h*h)-rhs[k]));}if(residual<1e-6)break;}
    }
    if(!(residual<1e-6))throw Error('pressure projection did not converge');
    for(let j=0;j<N;j++)for(let i=1;i<N;i++)U[ix(i,j)]-=dt*(p[c(i,j)]-p[c(i-1,j)])/h;
    for(let j=1;j<N;j++)for(let i=0;i<N;i++)V[iy(i,j)]-=dt*(p[c(i,j)]-p[c(i,j-1)])/h;
    u=U;v=V;div=0;
    let outgoing=0;
    for(let j=0;j<N;j++)for(let i=0;i<N;i++){
      div=Math.max(div,Math.abs(D(u,v,i,j)));
      outgoing=Math.max(outgoing,(Math.max(0,u[ix(i+1,j)])+Math.max(0,-u[ix(i,j)])+Math.max(0,v[iy(i,j+1)])+Math.max(0,-v[iy(i,j)]))/h);
    }
    const sub=Math.max(1,Math.ceil(dt*(outgoing+4*kappa/(h*h))/.9));
    if(sub>64)throw Error('scalar substep limit');
    const ds=dt/sub;
    function transport(a,rate){
      const before=sum(a);
      for(let n=0;n<sub;n++){
        const next=a.slice(),d=ds*kappa/(h*h);
        function face(L,R,w){const flux=ds*w/h*(w>=0?a[L]:a[R])+d*(a[L]-a[R]);next[L]-=flux;next[R]+=flux;}
        for(let j=0;j<N;j++)for(let i=1;i<N;i++)face(c(i-1,j),c(i,j),u[ix(i,j)]);
        for(let j=1;j<N;j++)for(let i=0;i<N;i++)face(c(i,j-1),c(i,j),v[iy(i,j)]);
        for(let k=0;k<a.length;k++)next[k]+=ds*rate*source[k];
        a=next;
      }
      if(a.some(z=>!Number.isFinite(z)||z< -1e-12))throw Error('invalid scalar');
      return [a,sum(a)-before-dt*rate*sourceIntegral];
    }
    [q,massError]=transport(q,smokeSource);[T,heatError]=transport(T,heatSource);
    if(u.some(z=>!Number.isFinite(z))||v.some(z=>!Number.isFinite(z)))throw Error('invalid velocity');
    step++;
  }
  function state(){
    let M=0,Y=0,heat=0,maxSpeed=0;
    for(let j=0;j<N;j++)for(let i=0;i<N;i++){const k=c(i,j);M+=q[k]*h*h;Y+=q[k]*h*h*(j+.5)*h;heat+=T[k]*h*h;maxSpeed=Math.max(maxSpeed,Math.hypot((u[ix(i,j)]+u[ix(i+1,j)])/2,(v[iy(i,j)]+v[iy(i,j+1)])/2));}
    return {u,v,q,T,step,time:step*dt,div,massError,heatError,M,Y:M?Y/M:0,heat,maxSpeed,sourceIntegral};
  }
  return {advance,reset,state};
}
const sim=createSmoke({N,dt,buoyancy,heatSource,smokeSource,kappa});
const initialSteps=40;
for(let n=0;n<initialSteps;n++)sim.advance();
function compile(type,source){
 const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);
 if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s;
}
const vs=compile(gl.VERTEX_SHADER,vertexSource),fs=compile(gl.FRAGMENT_SHADER,fragmentSource);
const program=gl.createProgram();gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);
if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program));
gl.deleteShader(vs);gl.deleteShader(fs);gl.useProgram(program);
const vao=gl.createVertexArray();gl.bindVertexArray(vao);gl.disable(gl.DITHER);gl.disable(gl.BLEND);
gl.pixelStorei(gl.UNPACK_ALIGNMENT,1);
const textures=['u_smoke','u_heat','u_velocity'].map((name,unit)=>{
 const tex=gl.createTexture();gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,tex);
 gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
 gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
 gl.uniform1i(gl.getUniformLocation(program,name),unit);return tex;
});
const enc=x=>Math.round(255*Math.min(1,Math.max(0,x)));
function draw(){
 const s=sim.state(),vel=new Uint8Array(2*N*N);
 for(let j=0;j<N;j++)for(let i=0;i<N;i++){const k=i+N*j;vel[2*k]=enc(.5+.5*(s.u[i+(N+1)*j]+s.u[i+1+(N+1)*j]));vel[2*k+1]=enc(.5+.5*(s.v[i+N*j]+s.v[i+N*(j+1)]));}
 const data=[Uint8Array.from(s.q,z=>enc(z/2)),Uint8Array.from(s.T,z=>enc(z/8)),vel];
 for(let unit=0;unit<3;unit++){gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,textures[unit]);gl.texImage2D(gl.TEXTURE_2D,0,unit===2?gl.RG8:gl.R8,N,N,0,unit===2?gl.RG:gl.RED,gl.UNSIGNED_BYTE,data[unit]);}
 gl.uniform1f(gl.getUniformLocation(program,'u_aspect'),canvas.width/canvas.height);
 gl.viewport(0,0,canvas.width,canvas.height);gl.drawArrays(gl.TRIANGLES,0,3);
 if(gl.getError()!==gl.NO_ERROR)throw Error('WebGL draw failed');
 return s;
}
const initial=draw();
report('MODEL','左：煙濃度 0–2（無次元）、右：温度差 0–8 K・速度矢印（表示クリップあり）');
report('TIME','t='+initial.time+' s, N='+N+', dt='+dt+' s');
report('MASS','煙='+initial.M+', 重心高さ='+initial.Y+' m, 収支誤差='+initial.massError);
report('HEAT','温度差積分='+initial.heat+', 収支誤差='+initial.heatError);
report('PROJECTION','最大発散='+initial.div+' s^-1');
let playing=false,timer=null;
function emit(s){canvas.dispatchEvent(new CustomEvent('fcg14-progress',{detail:{time:s.time,playing,mean:s.Y,maxSlope:s.maxSpeed,maxError:Math.max(Math.abs(s.massError),Math.abs(s.heatError))}}));}
function pause(){playing=false;if(timer!==null)clearTimeout(timer);timer=null;emit(sim.state());}
function step(){pause();if(sim.state().time<4-1e-9)sim.advance();emit(draw());}
function reset(){pause();sim.reset();emit(draw());}
function play(){if(playing||sim.state().time>=4-1e-9)return;playing=true;emit(sim.state());
 function tick(){if(!playing)return;try{if(!document.hidden){sim.advance();const s=draw();if(s.time>=4-1e-9){pause();return;}emit(s);}timer=setTimeout(tick,60);}catch(e){pause();canvas.dispatchEvent(new CustomEvent('fcg14-failure',{detail:String(e)}));}}
 timer=setTimeout(tick,60);
}
canvas.tabIndex=0;canvas.setAttribute('aria-label','左：煙濃度。右：温度差と流速。Spaceで再生・停止');
canvas.addEventListener('keydown',e=>{if(e.key===' '){e.preventDefault();playing?pause():play();}});
window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',e=>{if(e.matches)pause();});
window.addEventListener('pagehide',pause,{once:true});
return {play,pause,step,reset};
