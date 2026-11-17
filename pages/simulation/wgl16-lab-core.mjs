// WGL16: pure CPU oracle, independent from editable JavaScript/GLSL.
export const WGL16_DEFAULT_GRID=8;
export const WGL16_ORANGE=[230,80,40,255];
export const WGL16_BLUE=[40,150,220,255];
export const WGL16_BACKGROUND=[12,20,32,255];
export function validateWGL16Size(width,height){
  if(!Number.isInteger(width)||!Number.isInteger(height)||
     width<64||height<64||width>1024||height>1024||width*height>524288)
    throw new RangeError('WGL16 drawing buffer must be 64..1024 per side, <=524288 pixels');
}
export function predictWGL16Pixel(x,y,width,height,grid=8){
  validateWGL16Size(width,height);
  if(!Number.isInteger(x)||!Number.isInteger(y)||x<0||x>=width||y<0||y>=height)
    throw new RangeError('pixel outside framebuffer');
  if(!Number.isInteger(grid)||grid<2||grid>16)throw new RangeError('bad grid');
  const nx=2*(x+0.5)/width-1,ny=2*(y+0.5)/height-1;
  const col=Math.floor((nx+1)*grid/2),row=Math.floor((ny+1)*grid/2);
  if(col<0||col>=grid||row<0||row>=grid)return [...WGL16_BACKGROUND];
  const cx=-1+(col+0.5)*2/grid,cy=-1+(row+0.5)*2/grid;
  // Every local quad spans [-0.7/grid,0.7/grid] in each direction.
  if(Math.abs(nx-cx)>0.7/grid||Math.abs(ny-cy)>0.7/grid)
    return [...WGL16_BACKGROUND];
  return [...((row+col)%2===0?WGL16_ORANGE:WGL16_BLUE)];
}
export function expectedWGL16Samples(width,height) {
  validateWGL16Size(width,height);
  const centers=[[0,0],[2,5],[7,7],[3,4]];
  const samples=centers.map(([col,row])=>{
    const nx=-1+(col+0.5)*2/WGL16_DEFAULT_GRID;
    const ny=-1+(row+0.5)*2/WGL16_DEFAULT_GRID;
    return {label:'格子('+col+','+row+')',
      x:Math.floor((nx+1)*width/2), y:Math.floor((ny+1)*height/2)};
  });
  samples.push({label:'左下の背景',x:0,y:0},
    {label:'右上の背景',x:width-1,y:height-1});
  return samples.map(p=>({...p,rgba:predictWGL16Pixel(p.x,p.y,width,height)}));
}
export function compareWGL16Readback(actual,width,height,tolerance=2){
  if(!Number.isFinite(tolerance)||tolerance<0)throw new RangeError('invalid tolerance');
  return expectedWGL16Samples(width,height).map((expected,i)=>{
    const a=actual[i];
    const valid=!!a&&a.x===expected.x&&a.y===expected.y&&
      Array.isArray(a.rgba)&&a.rgba.length===4&&
      a.rgba.every(v=>Number.isInteger(v)&&v>=0&&v<=255);
    const diff=valid?expected.rgba.map((v,k)=>Math.abs(v-a.rgba[k])):
      [Infinity,Infinity,Infinity,Infinity];
    return {...expected,actual:valid?a.rgba:null,difference:diff,
      pass:valid&&diff.every(v=>v<=tolerance)};
  });
}
export function wgl16DrawCounts(grid){
  if(!Number.isInteger(grid)||grid<2||grid>16)throw new RangeError('bad grid');
  const instances=grid*grid;
  return {instances,loopCalls:instances,instancedCalls:1,vertexInvocations:6*instances,
    instanceBytes:20*instances,meshBytes:48};
}
