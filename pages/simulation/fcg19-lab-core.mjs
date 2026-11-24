// Extract the original editable kernels rather than maintaining duplicate solvers.
function prefix(src,marker){
 const i=src.indexOf(marker);
 if(i<0||src.indexOf(marker,i+marker.length)>=0)throw Error('FCG19 kernel boundary: '+marker);
 return src.slice(0,i);
}
export function assembleFCG19(fluid,water,smoke,driver){
 const a=prefix(fluid,'// Three physical'),b=prefix(water,'solveUntil(time);'),c=prefix(smoke,'const sim=');
 const source='// FCG19: original FCG5/12/14 calculation sections, then editable performance driver.\n'+
 'function makeFluid(){\nconst settings={steps:0};\n'+a+
 '\nlet n=0;return {N,dt,advance(){advanceFluidStep();n++;},state(){return {time:n*dt,steps:n,field:dye,arrays:[u,v,p,dye],diagnostic:[["最大発散 [1/s]",divAfter],["Poisson残差",poissonMax]],scale:1};}};}\n'+
 'function makeWater(){\n'+b+
 '\nlet n=0;return {N,dt:.05,advance(){solveUntil(++n*.05);},state(){let min=Infinity;const field=new Float64Array(N*N);for(let k=0;k<field.length;k++){field[k]=U[3*k];min=Math.min(min,field[k]);}return {time:t,steps,field,arrays:[U],diagnostic:[["水量差 [m³]",volume(U)-initialVolume],["最小水深 [m]",min],["最大Courant数",largestCourant]],scale:1};}};}\n'+
 'function makeSmoke(){\n'+c+
 '\nconst m=createSmoke({N,dt,buoyancy,heatSource,smokeSource,kappa});return {N,dt,advance:m.advance,state(){const s=m.state();return {time:s.time,steps:s.step,field:s.q,arrays:[s.u,s.v,s.q,s.T],diagnostic:[["最大発散 [1/s]",s.div],["煙の累積収支誤差",s.M-s.time*smokeSource*s.sourceIntegral],["熱の累積収支誤差",s.heat-s.time*heatSource*s.sourceIntegral]],scale:2};}};}\n'+driver;
 if(source.length>30000)throw Error('FCG19 assembled source exceeds editable source limit');
 return source;
}
export function expectedFCG19Samples(width,height,{modelIndex=0,renderScale=1,formatIndex=0}={}){
 const N=[48,40,48][modelIndex],w=Math.floor(width*renderScale),h=Math.floor(height*renderScale);
 if(!N||w<1||h<1)throw RangeError('FCG19 sample dimensions');
 return [[.73,.48,'右側'],[.50,.50,'中央'],[.12,.18,'左下']].map(([a,b,label])=>{
  const x=Math.floor(a*width),y=Math.floor(b*height);
  const i=Math.min(N-1,Math.floor((Math.floor((x+.5)*w/width)+.5)*N/w));
  const j=Math.min(N-1,Math.floor((Math.floor((y+.5)*h/height)+.5)*N/h));
  const X=(i+.5)/N,Y=(j+.5)/N;
  const value=modelIndex===0?Math.exp(-((X-.73)**2+(Y-.48)**2)/.11**2):modelIndex===1?(X*20>7&&X*20<13&&Y*20>7&&Y*20<13?.75:.25):0;
  const q=formatIndex===1?Math.round(value*255)/255:Math.fround(value);
  return {label,x,y,rgba:[.03+.32*q,.06+.8*q,.10+.9*q].map(z=>Math.round(z*255)).concat(255)};
 });
}
export function compareFCG19Readback(samples,w,h,options){
 return expectedFCG19Samples(w,h,options).map((p,i)=>{
  const a=samples[i],valid=a&&a.x===p.x&&a.y===p.y&&Array.isArray(a.rgba)&&a.rgba.length===4;
  const difference=valid?p.rgba.map((v,k)=>Math.abs(v-a.rgba[k])):[Infinity,Infinity,Infinity,Infinity];
  return {...p,actual:valid?a.rgba:null,difference,pass:!!valid&&difference.every(v=>v<=3)};
 });
}
