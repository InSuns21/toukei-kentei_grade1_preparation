// Independent analytic initial-field pixel reference (no solver execution).
export function expectedFCG20Samples(w,h,{N=48,pulse=1,ridge=1.5}={}){
 return [[.06,.5],[.2,.2],[.5,.5],[.83,.5]].map(([a,b],i)=>{
 const x=Math.floor(w*a),y=Math.floor(h*b),u=(x+.5)/w*3,panel=Math.floor(u),local=u-panel;
 const X=(Math.floor(local*N)+.5)/N,Y=(Math.floor((y+.5)/h*N)+.5)/N;
 const z=Math.fround(.25+ridge*Math.exp(-(((X-.52)/.075)**2))*(1-.8*Math.exp(-(((Y-.5)/.15)**2))));
 const depth=Math.fround(Math.max(0,.65-(.25+ridge*Math.exp(-(((X-.52)/.075)**2))*(1-.8*Math.exp(-(((Y-.5)/.15)**2)))))+pulse*(X<.25&&Math.abs(Y-.5)<.25?1:0));
 const mix=(a,b,t)=>a.map((v,k)=>v+(b[k]-v)*t),d=Math.min(1,depth/2);
 const c=panel===0?(depth>.001?mix([.08,.30,.48],[.35,.85,1],d):mix([.22,.16,.10],[.83,.69,.43],Math.min(1,z/3.25))):panel===1?mix([.04,.08,.12],[.35,.85,1],d):[.05,.08,.12];
 return {label:['貯水域','地形','水深','静止速度'][i],x,y,rgba:c.map(v=>Math.round(255*v)).concat(255)};
 });
}
export function compareFCG20Readback(samples,w,h,opts){return expectedFCG20Samples(w,h,opts).map((p,i)=>{const a=samples[i],valid=a&&a.x===p.x&&a.y===p.y&&Array.isArray(a.rgba)&&a.rgba.length===4;const difference=valid?p.rgba.map((v,k)=>Math.abs(v-a.rgba[k])):[Infinity,Infinity,Infinity,Infinity];return {...p,actual:valid?a.rgba:null,difference,pass:!!valid&&difference.every(v=>v<=3)};});}
