// Independent initial geometry: evaluate the initial scene at the actual pixel centers.
const rgba=(...a)=>a.map(x=>Math.round(255*x)).concat(255);
function pixel(px,py,side){
 let color=rgba(.035,.075,.12);
 if(Math.min(px,py,1-px,1-py)<.006)color=rgba(.55,.66,.76);
 for(let k=0;k<24;k++){
  const x=.1+.075*(k%4),y=.24+.1*Math.floor(k/4),end=x-.055*(.45+.03*(k%4));
  if(Math.hypot(px-Math.max(end,Math.min(x,px)),py-y)<.0035)color=rgba(.25,.63,.86);
  if(Math.hypot(px-x,py-y)<.009)color=rgba(.33,.85,1);
 }
 const dx=px-.6,dy=py-.5,d=Math.hypot(dx,dy);
 if(d<.12)color=rgba(.91,.46,.12);
 if(d<.12&&d>.112)color=rgba(1,.85,.48);
 if(d<.12&&side===0&&Math.abs(dx)>.035&&Math.abs(dy)>.035&&((px+py)*50)%1<.16)color=rgba(.42,.24,.12);
 return color;
}
export function expectedFCG18Samples(width,height){
 return [0,1].flatMap(side=>[[.85,.85,'water'],[.6,.5,'body'],[.1,.24,'particle']].map(([a,b,k])=>{
  const x=Math.floor((side+a)*width/2),y=Math.floor(b*height);
  const actualSide=+(x+.5>=width/2),px=2*(x+.5)/width-actualSide,py=(y+.5)/height;
  return {label:(side?'二方向 ':'一方向 ')+k,x,y,rgba:pixel(px,py,actualSide)};
 }));
}
export function compareFCG18Readback(samples,w,h){
 return expectedFCG18Samples(w,h).map((p,i)=>{
 const s=samples[i],valid=s&&s.x===p.x&&s.y===p.y&&Array.isArray(s.rgba)&&s.rgba.length===4;
 const difference=valid?p.rgba.map((v,k)=>Math.abs(v-s.rgba[k])):[Infinity,Infinity,Infinity,Infinity];
 return {...p,actual:valid?s.rgba:null,difference,pass:!!valid&&difference.every(v=>v<=3)};
 });
}
