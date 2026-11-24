// Independent analytic initial-field pixel reference (no solver execution).
export function expectedFCG20Samples(w,h,{N=48,pulse=1,ridge=1.5}={}){
 return [[.09,.75],[.29,.60],[.75,.75],[.25,.25],[.59,.07],[.59,.16],[.59,.45]].map(([a,b],i)=>{
 const x=Math.floor(w*a),y=Math.floor(h*b),u=(x+.5)/w*2,v=(y+.5)/h*2,right=u>=1,upper=v>=1,lx=u-Math.floor(u),ly=v-Math.floor(v);
 const X=(Math.floor(lx*N)+.5)/N,Y=(Math.floor((right&&!upper?.5:ly)*N)+.5)/N;
 const z0=.25+ridge*Math.exp(-(((X-.52)/.075)**2))*(1-.8*Math.exp(-(((Y-.5)/.15)**2)));
 const z=Math.fround(z0),depth=Math.fround(Math.max(0,.65-z0)+pulse*(X<.25&&Math.abs(Y-.5)<.25?1:0));
 const mix=(a,b,t)=>a.map((v,k)=>v+(b[k]-v)*t),d=Math.min(1,depth/2);
 let c;
 if(upper&&!right)c=depth>.001?mix([.08,.30,.48],[.35,.85,1],d):mix([.22,.16,.10],[.83,.69,.43],Math.min(1,z/3.25));
 else if(upper)c=mix([.04,.08,.12],[.35,.85,1],d);
 else if(!right)c=[.05,.08,.12];
 else{
  const height=ly*4,eta=z+depth;
  c=[.08,.12,.16];if(Math.abs(height-Math.round(height))<.015)c=[.25,.29,.33];
  if(height<=z)c=[.48,.33,.18];else if(height<=eta)c=[.13,.54,.78];
  if(depth>.001&&Math.abs(height-eta)<.025)c=[.96,.96,.96];
 }
 if(lx<.003||lx>.997||ly<.003||ly>.997)c=[.85,.85,.85];
 return {label:['貯水域','地形','水深','静止速度','断面下部','断面水域','断面上部'][i],x,y,rgba:c.map(v=>Math.round(255*v)).concat(255)};
 });
}
export function compareFCG20Readback(samples,w,h,opts){return expectedFCG20Samples(w,h,opts).map((p,i)=>{const a=samples[i],valid=a&&a.x===p.x&&a.y===p.y&&Array.isArray(a.rgba)&&a.rgba.length===4;const difference=valid?p.rgba.map((v,k)=>Math.abs(v-a.rgba[k])):[Infinity,Infinity,Infinity,Infinity];return {...p,actual:valid?a.rgba:null,difference,pass:!!valid&&difference.every(v=>v<=3)};});}
