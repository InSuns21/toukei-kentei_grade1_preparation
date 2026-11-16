// WGL7 independent CPU reference; never use the GPU output as an oracle.
export const TEXTURE_SIZE = 8;
export const UV_REPEATS = 128;
export const OFFSET = Object.freeze([0.017125, 0.0365]);
export const DARK = 32, LIGHT = 224, MIP_GRAY = 128;
export function repeat(u) {
  if (!Number.isFinite(u)) throw new RangeError('finite coordinate required');
  return u - Math.floor(u);
}
export function clamp(u) {
  if (!Number.isFinite(u)) throw new RangeError('finite coordinate required');
  return Math.max(0, Math.min(1, u));
}
export function mirroredRepeat(u) {
  if (!Number.isFinite(u)) throw new RangeError('finite coordinate required');
  const r = u - 2 * Math.floor(u / 2);
  return r <= 1 ? r : 2 - r;
}
export function checkerTexel(x,y) {
  const i = ((x % TEXTURE_SIZE) + TEXTURE_SIZE) % TEXTURE_SIZE;
  const j = ((y % TEXTURE_SIZE) + TEXTURE_SIZE) % TEXTURE_SIZE;
  return ((i + j) % 2) ? LIGHT : DARK;
}
// With texture normalized coordinates u/v, texel centers are (i+1/2)/8.
export function nearestChecker(u,v) {
  return checkerTexel(Math.floor(repeat(u)*TEXTURE_SIZE),
                      Math.floor(repeat(v)*TEXTURE_SIZE));
}
export function bilinearChecker(u,v) {
  const s=u*TEXTURE_SIZE-0.5, t=v*TEXTURE_SIZE-0.5;
  const i=Math.floor(s),j=Math.floor(t),a=s-i,b=t-j;
  return (1-a)*(1-b)*checkerTexel(i,j) +
         a*(1-b)*checkerTexel(i+1,j) +
         (1-a)*b*checkerTexel(i,j+1) +
         a*b*checkerTexel(i+1,j+1);
}
export function footprint(texels, repeats, width, height) {
  if (![texels,repeats,width,height].every(Number.isFinite) ||
      texels<=0||repeats<=0||width<=0||height<=0)
    throw new RangeError('positive footprint inputs required');
  const rho=Math.max(texels*repeats/width,texels*repeats/height);
  return {rho, lod:Math.log2(rho)};
}
export function pixelUv(x,y,vpX,vpW,height,repeats=UV_REPEATS) {
  if (!Number.isInteger(x)||!Number.isInteger(y)||x<vpX||x>=vpX+vpW||
      y<0||y>=height||vpW<=0||height<=0)
    throw new RangeError('pixel outside viewport');
  return [repeats*(x-vpX+0.5)/vpW+OFFSET[0],
          repeats*(y+0.5)/height+OFFSET[1]];
}
export function expectedWGL7Samples(width,height) {
  if (!Number.isInteger(width)||!Number.isInteger(height)||
      width<64||height<64||width>1024||height>1024||
      width*height>524288) throw new RangeError('invalid drawing buffer');
  const leftWidth=Math.floor(width/2);
  const viewports=[
    {label:'最近傍（左）',x:0,width:leftWidth,right:false},
    {label:'mipmap（右）',x:leftWidth,width:width-leftWidth,right:true}
  ];
  const candidates=[[.18,.18],[.35,.39],[.63,.66],[.83,.83]];
  const samples=[];
  for (const vp of viewports) {
    for (let k=0;k<candidates.length;k++) {
      // Search for a pixel far from discontinuous texel boundaries, so
      // small GPU interpolation error cannot flip NEAREST's selection.
      const cx=Math.floor(vp.width*candidates[k][0]);
      const cy=Math.floor(height*candidates[k][1]);
      let chosen=null;
      for(let delta=0;delta<vp.width && !chosen;delta++){
        for (const shift of delta===0?[0]:[delta,-delta]) {
          const localX=cx+shift;
          if(localX<1||localX>=vp.width-1)continue;
          const x=vp.x+localX,y=Math.max(1,Math.min(height-2,cy));
          const uv=pixelUv(x,y,vp.x,vp.width,height);
          const fx=repeat(uv[0]*TEXTURE_SIZE);
          const fy=repeat(uv[1]*TEXTURE_SIZE);
          if(Math.min(fx,1-fx,fy,1-fy)>.08) {chosen={x,y,uv};break;}
        }
      }
      if(!chosen) {
        const x=vp.x+cx,y=Math.max(1,Math.min(height-2,cy));
        chosen={x,y,uv:pixelUv(x,y,vp.x,vp.width,height)};
      }
      const value=vp.right?MIP_GRAY:nearestChecker(...chosen.uv);
      samples.push({label:vp.label+' '+(k+1),x:chosen.x,y:chosen.y,
        uv:chosen.uv,rgba:[value,value,value,255]});
    }
  }
  return samples;
}
export function compareWGL7Readback(actual,width,height,tolerance=3) {
  return expectedWGL7Samples(width,height).map((expected,i)=>{
    const found=actual[i];
    const valid=found&&found.x===expected.x&&found.y===expected.y&&
      Array.isArray(found.rgba)&&found.rgba.length===4&&
      found.rgba.every(v=>Number.isInteger(v)&&v>=0&&v<=255);
    const difference=valid?expected.rgba.map((v,j)=>Math.abs(v-found.rgba[j])):
      [Infinity,Infinity,Infinity,Infinity];
    return {...expected,actual:valid?found.rgba:null,difference,
      pass:!!valid&&difference.every(v=>v<=tolerance)};
  });
}
