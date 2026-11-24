// Independent initial texture reference, from vertex streamfunction and sampled dye.
const clip=(x,a,b)=>Math.max(a,Math.min(b,x)),byte=x=>Math.round(255*clip(x,0,1));
export function initialCell(i,j,N=24){
 const h=1/N,psi=(a,b)=>.065*Math.sin(2*Math.PI*a/N)*Math.sin(Math.PI*b/N);
 function velocity(a,b){
  a=clip(a,0,N-1);b=clip(b,0,N-1);
  const U=k=>(k===0||k===N)?0:(psi(k,b+1)-psi(k,b))/h;
  const V=k=>(k===0||k===N)?0:-(psi(a+1,k)-psi(a,k))/h;
  return [(U(a)+U(a+1))/2,(V(b)+V(b+1))/2];
 }
 const [u,v]=velocity(i,j),w=(velocity(i+1,j)[1]-velocity(i-1,j)[1]-velocity(i,j+1)[0]+velocity(i,j-1)[0])/(2*h);
 const x=(i+.5)*h,y=(j+.5)*h;
 const dye=Math.min(1,Math.exp(-((x-.50)**2)/(.055**2))*Math.exp(-((y-.48)**2)/(.33**2))+.32*Math.exp(-((x-.22)**2+(y-.25)**2)/(.07**2)));
 return {u,v,w,dye};
}
export function expectedFCG17Samples(width,height,{grid=24,mode=0}={}){
 const out=[];
 for(let side=0;side<2;side++)for(const [a,b] of [[.23,.25],[.47,.48],[.72,.71]]){
  const x=Math.floor(width*(side+a)/2),y=Math.floor(height*(.2+.8*b));
  const u=(x+.5)/width,v=((y+.5)/height-.2)/.8;
  const i=clip(Math.floor((2*u-side)*grid),0,grid-1),j=clip(Math.floor(v*grid),0,grid-1);
  const q=initialCell(i,j,grid);let t,lo,hi;
  if(mode===0){t=byte(q.dye)/255;lo=[.04,.06,.09];hi=[.25,.88,1];}
  else if(mode===1){const z=byte(.5+q.w/20)/255;t=Math.abs(2*z-1);lo=[.12,.12,.12];hi=z<.5?[.25,.62,1]:[1,.54,.19];}
  else{t=byte(Math.hypot(q.u,q.v))/255;lo=[.04,.06,.09];hi=[1,.95,.7];}
  out.push({label:(side?'強調あり':'強調なし')+' '+i+','+j,x,y,rgba:lo.map((z,k)=>byte(z+(hi[k]-z)*t)).concat(255)});
 }return out;
}
export function compareFCG17Readback(samples,w,h,options={}){
 return expectedFCG17Samples(w,h,options).map((p,i)=>{
 const s=samples[i],valid=s&&s.x===p.x&&s.y===p.y&&Array.isArray(s.rgba)&&s.rgba.length===4;
 const difference=valid?p.rgba.map((v,k)=>Math.abs(v-s.rgba[k])):[Infinity,Infinity,Infinity,Infinity];
 return {...p,actual:valid?s.rgba:null,difference,pass:!!valid&&difference.every(v=>v<=3)};
 });
}
