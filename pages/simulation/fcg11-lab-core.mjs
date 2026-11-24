// Independent CPU calculation of particle centres and their raster coverage.
export const FCG11_DEFAULTS=Object.freeze({time:0.35,curvatureThreshold:0.8,speedThreshold:1.5,lifetime:0.8,radius:0.055,amount:12});
const H=x=>Math.cos(Math.PI*(x-2))/4;
export function fcg11State(options={}){
 const o={...FCG11_DEFAULTS,...options},particles=[];
 let emitted=0;
 for(let j=0;j<o.amount;j++){
  const origin=(2+4*j)/o.amount,base=H(origin);
  const derivative=-Math.PI*Math.sin(Math.PI*(origin-2))/4;
  const K=Math.PI**2*Math.abs(base)/(1+derivative**2)**1.5;
  if(!(base>0&&K>=o.curvatureThreshold&&1.2+3.2*base>=o.speedThreshold))continue;
  const age=o.time-0.08*(j%4);
  if(age<0)continue;
  emitted++;
  if(age>=o.lifetime)continue;
  const x=origin+0.32*age,z=base+age*(2.4-4.9*age);
  if(age===0||z>H(x))particles.push({x,z,r:o.radius,kind:1});
  const f=origin+0.18*age;
  particles.push({x:f,z:H(f),r:o.radius,kind:2});
  const bubble=base+0.12*age-0.22;
  if(bubble<base)particles.push({x:origin,z:bubble,r:o.radius,kind:3});
 }
 return {particles,emitted};
}
export function expectedFCG11Samples(width,height,options={}){
 const {particles}=fcg11State(options);
 const points=[[0.1,1.8],[0.1,-0.8]];
 for(const kind of [1,2,3]){
  const p=particles.find(s=>s.kind===kind);
  if(p)points.push([p.x,p.z+(kind===3?0.8*p.r:0)]);
 }
 return points.map(([x,z],i)=>{
  const px=Math.max(0,Math.min(width-1,Math.floor(x/4*width)));
  const py=Math.max(0,Math.min(height-1,Math.floor((z+1)/3*height)));
  const X=(px+0.5)*4/width,Z=(py+0.5)*3/height-1;
  let rgb=Z<H(X)?[13,90,127]:[24,39,60];
  if(Math.abs(Z-H(X))<0.012)rgb=[90,200,205];
  for(const p of particles){
   const a=(X-p.x)/p.r,b=(Z-p.z)/p.r,d=a*a+b*b;
   if(p.kind===1&&d<=1)rgb=[247,249,252];
   if(p.kind===2&&(a/1.6)**2+(b/0.5)**2<=1)rgb=[247,218,146];
   if(p.kind===3&&d>=0.36&&d<=1)rgb=[164,230,245];
  }
  return {label:'断面標本 '+(i+1),x:px,y:py,rgba:[...rgb,255]};
 });
}
export function compareFCG11Readback(samples,width,height,options={}){
 return expectedFCG11Samples(width,height,options).map((p,i)=>{
  const s=samples[i],valid=s&&s.x===p.x&&s.y===p.y&&Array.isArray(s.rgba)&&s.rgba.length===4;
  const difference=valid?p.rgba.map((v,k)=>Math.abs(v-s.rgba[k])):[Infinity,Infinity,Infinity,Infinity];
  return {...p,actual:valid?s.rgba:null,difference,pass:valid&&difference.every(v=>v<=3)};
 });
}
