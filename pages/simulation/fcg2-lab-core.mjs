// Independent CPU oracle: never imports or executes the student's JavaScript or GLSL.
// Bottom-left is (i,j)=(0,0). Physical time step dt=pi/2 seconds.
const N=8;
export function fcg2Field(i,j,n) {
  if(!Number.isInteger(i)||!Number.isInteger(j)||i<0||i>=N||j<0||j>=N||
     !Number.isInteger(n)||n<0||n>4) throw new RangeError('invalid FCG2 grid/time');
  return 0.5+0.25*Math.sin(2*Math.PI*(i+0.5)/N)*
    Math.cos(2*Math.PI*(j+0.5)/N)*Math.sin(n*Math.PI/2);
}
export function fcg2Encode(q) {
  if(!Number.isFinite(q)||q<0||q>1) throw new RangeError('R8 value must be in [0,1]');
  return Math.round(255*q);
}
export function fcg2Grid(n) {
  return Array.from({length:N*N},(_,k)=>fcg2Field(k%N,Math.floor(k/N),n));
}
export function fcg2PixelCell(x,y,width,height) {
  if(!Number.isInteger(width)||!Number.isInteger(height)||width<64||
     height<64||width>1024||height>1024||width*height>524288||
     !Number.isInteger(x)||!Number.isInteger(y)||x<0||y<0||
     x>=width||y>=height) throw new RangeError('invalid viewport/pixel');
  return [Math.min(N-1,Math.floor(N*(x+0.5)/width)),
          Math.min(N-1,Math.floor(N*(y+0.5)/height))];
}
export function expectedFCG2Samples(width,height,steps=1) {
  if(!Number.isInteger(steps)||steps<0||steps>4)throw new RangeError('invalid steps');
  const cells=[[1,1],[3,2],[5,5],[7,6],[0,7]];
  return cells.map(([i,j])=>{
    const x=Math.floor((i+0.5)*width/N),y=Math.floor((j+0.5)*height/N);
    const [ii,jj]=fcg2PixelCell(x,y,width,height);
    const value=fcg2Field(ii,jj,steps),byte=fcg2Encode(value);
    return {label:'格子('+ii+','+jj+')',x,y,value,byte,
      reconstructed:byte/255,rgba:[byte,38,255-byte,255]};
  });
}
export function compareFCG2Readback(actual,width,height,steps=1,tolerance=2) {
  if(!Number.isFinite(tolerance)||tolerance<0)throw new RangeError('invalid tolerance');
  return expectedFCG2Samples(width,height,steps).map((p,k)=>{
    const a=actual[k],valid=!!a&&a.x===p.x&&a.y===p.y&&Array.isArray(a.rgba)&&
      a.rgba.length===4&&a.rgba.every(v=>Number.isInteger(v)&&v>=0&&v<=255);
    const difference=valid?p.rgba.map((v,i)=>Math.abs(v-a.rgba[i])):
      [Infinity,Infinity,Infinity,Infinity];
    return {...p,actual:valid?a.rgba:null,difference,
      pass:valid&&difference.every(v=>v<=tolerance)};
  });
}
