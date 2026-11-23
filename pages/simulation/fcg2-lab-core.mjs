// Independent passive-scalar reference: does not import/edit/run learner JS.
// Square domain [0,1]^2 m, stationary vortex center (0.5,0.5) m.
// Physical velocity: Omega(r)*(-dy,dx), Omega(r)=omega*(1+shear*r).
// The analytic characteristic back-rotation solves dq/dt+u.grad(q)=0.
export const FCG2_N = 128;
export const FCG2_PERIOD = 2*Math.PI;
export const FCG2_DEFAULTS = Object.freeze({omega:1,shear:3,amplitude:0.9});
export function fcg2Concentration(x,y,time,{omega=1,shear=3,amplitude=0.9}={}){
  if(![x,y,time,omega,shear,amplitude].every(Number.isFinite)||
     x<0||x>1||y<0||y>1||time<0||time>FCG2_PERIOD||
     omega<0||omega>4||shear<0||shear>8||amplitude<0||amplitude>1)
    throw new RangeError('invalid FCG2 coordinate/time/parameter');
  const dx=x-0.5,dy=y-0.5,r=Math.hypot(dx,dy);
  const radial=Math.max(0,1-((r-0.26)/0.18)**2);
  if(radial===0)return 0;
  const departure=Math.atan2(dy,dx)-omega*(1+shear*r)*time;
  return amplitude*radial*radial*Math.exp((Math.cos(departure)-1)/(0.55*0.55));
}
export function fcg2FieldAtTime(i,j,time,parameters={}){
  if(!Number.isInteger(i)||!Number.isInteger(j)||
     i<0||i>=FCG2_N||j<0||j>=FCG2_N)
    throw new RangeError('invalid FCG2 grid index');
  return fcg2Concentration((i+0.5)/FCG2_N,(j+0.5)/FCG2_N,time,parameters);
}
export function fcg2Field(i,j,n,parameters={}){
  if(!Number.isInteger(n)||n<0||n>4)throw new RangeError('invalid steps');
  return fcg2FieldAtTime(i,j,n*Math.PI/2,parameters);
}
export function fcg2Encode(q){
  if(!Number.isFinite(q)||q<0||q>1)throw new RangeError('R8 value must be in [0,1]');
  return Math.round(255*q);
}
export function fcg2Color(byte){
  if(!Number.isInteger(byte)||byte<0||byte>255)throw new RangeError('invalid dye byte');
  const q=byte/255;
  return [
    Math.round(255*(0.025+(1-0.025)*q)),
    Math.round(255*(0.07+(0.76-0.07)*q)),
    Math.round(255*(0.13+(0.22-0.13)*q)),
    255
  ];
}
export function fcg2Grid(n,parameters={}){
  return Array.from({length:FCG2_N*FCG2_N},(_,k)=>
    fcg2Field(k%FCG2_N,Math.floor(k/FCG2_N),n,parameters));
}
export function fcg2PixelCell(x,y,width,height){
  if(!Number.isInteger(width)||!Number.isInteger(height)||width<64||
     height<64||width>1024||height>1024||width*height>524288||
     !Number.isInteger(x)||!Number.isInteger(y)||x<0||y<0||
     x>=width||y>=height)throw new RangeError('invalid viewport/pixel');
  return [Math.min(FCG2_N-1,Math.floor(FCG2_N*(x+0.5)/width)),
          Math.min(FCG2_N-1,Math.floor(FCG2_N*(y+0.5)/height))];
}
export function expectedFCG2SamplesAtTime(width,height,time,parameters={}){
  const cells=[[32,75],[56,77],[16,54],[97,64],[64,64],[112,20]];
  return cells.map(([i,j])=>{
    const x=Math.floor((i+0.5)*width/FCG2_N),
      y=Math.floor((j+0.5)*height/FCG2_N);
    const [ii,jj]=fcg2PixelCell(x,y,width,height);
    const value=fcg2FieldAtTime(ii,jj,time,parameters),byte=fcg2Encode(value);
    return {label:'格子('+ii+','+jj+')',x,y,value,byte,
      reconstructed:byte/255,rgba:fcg2Color(byte)};
  });
}
export function expectedFCG2Samples(width,height,steps=1,parameters={}){
  if(!Number.isInteger(steps)||steps<0||steps>4)throw new RangeError('invalid steps');
  return expectedFCG2SamplesAtTime(width,height,steps*Math.PI/2,parameters);
}
export function compareFCG2Readback(actual,width,height,steps=1,tolerance=2,parameters={}){
  if(!Number.isFinite(tolerance)||tolerance<0)throw new RangeError('invalid tolerance');
  return expectedFCG2Samples(width,height,steps,parameters).map((p,k)=>{
    const a=actual[k],valid=!!a&&a.x===p.x&&a.y===p.y&&Array.isArray(a.rgba)&&
      a.rgba.length===4&&a.rgba.every(v=>Number.isInteger(v)&&v>=0&&v<=255);
    const difference=valid?p.rgba.map((v,i)=>Math.abs(v-a.rgba[i])):
      [Infinity,Infinity,Infinity,Infinity];
    return {...p,actual:valid?a.rgba:null,difference,
      pass:valid&&difference.every(v=>v<=tolerance)};
  });
}
