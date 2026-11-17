// WGL15: independent, pure CPU reference; it does not execute editable GLSL or lab JS.
const FRONT = Object.freeze({id:1,depth:2,left:-1,right:0.15,bottom:-0.6,top:0.7,rgba:[230,70,35,255]});
const BACK = Object.freeze({id:2,depth:3,left:-0.1,right:1.5,bottom:-0.5,top:0.7,rgba:[30,150,220,255]});
const BACKGROUND = [10,18,29,255];
export const WGL15_PANELS = Object.freeze([FRONT,BACK]);
export function validateWGL15Size(width,height) {
  if(!Number.isInteger(width)||!Number.isInteger(height)||width<64||height<64||
      width>1024||height>1024||width*height>524288)
    throw new RangeError('WGL15 canvas must be 64..1024 pixels per side and <=524288 total');
}
export function cssToWGL15Pixel(clientX,clientY,rect,width,height) {
  validateWGL15Size(width,height);
  if(!rect||![rect.left,rect.top,rect.width,rect.height,clientX,clientY]
      .every(Number.isFinite)||rect.width<=0||rect.height<=0)
    throw new RangeError('invalid CSS rectangle/event');
  const u=(clientX-rect.left)/rect.width;
  const v=(clientY-rect.top)/rect.height;
  if(u<0||u>=1||v<0||v>=1) return null;
  return {x:Math.floor(u*width),y:height-1-Math.floor(v*height)};
}
export function ndcOfWGL15Pixel(x,y,width,height) {
  validateWGL15Size(width,height);
  if(!Number.isInteger(x)||!Number.isInteger(y)||x<0||x>=width||y<0||y>=height)
    throw new RangeError('pixel outside drawing buffer');
  return [2*(x+0.5)/width-1,2*(y+0.5)/height-1];
}
export function cpuPickWGL15Pixel(x,y,width,height) {
  const [nx,ny]=ndcOfWGL15Pixel(x,y,width,height);
  // Perspective inverse for n=1,f=9, theta=90deg, eye=(0,0,0).
  const dir=[(width/height)*nx,ny,-1];
  let winner=null;
  for(const panel of WGL15_PANELS) {
    const parameter=-panel.depth/dir[2];
    const px=parameter*dir[0],py=parameter*dir[1];
    if(parameter>=1&&parameter<=9&&
        px>=panel.left&&px<=panel.right&&py>=panel.bottom&&py<=panel.top&&
        (!winner||parameter<winner.depth)) {
      winner={id:panel.id,depth:parameter,point:[px,py,-parameter]};
    }
  }
  return winner||{id:0,depth:null,point:null};
}
export function expectedWGL15Samples(width,height) {
  validateWGL15Size(width,height);
  const checks=[
    ['手前の面',-0.25,0],['奥の面',0.25,0],['重なり（手前優先）',0,0],['背景',0.9,0.8]
  ];
  return checks.map(([label,nx,ny])=>{
    const x=Math.max(0,Math.min(width-1,Math.floor((nx+1)*width/2)));
    const y=Math.max(0,Math.min(height-1,Math.floor((ny+1)*height/2)));
    const {id}=cpuPickWGL15Pixel(x,y,width,height);
    const rgba=id===1?[...FRONT.rgba]:id===2?[...BACK.rgba]:[...BACKGROUND];
    return {label,x,y,id,rgba};
  });
}
export function compareWGL15Readback(actual,width,height,tolerance=2) {
  if(!Number.isFinite(tolerance)||tolerance<0)throw new RangeError('invalid tolerance');
  return expectedWGL15Samples(width,height).map((expected,i)=>{
    const a=actual[i];
    const valid=!!a&&a.x===expected.x&&a.y===expected.y&&
      Array.isArray(a.rgba)&&a.rgba.length===4&&
      a.rgba.every(v=>Number.isInteger(v)&&v>=0&&v<=255);
    const difference=valid?expected.rgba.map((v,k)=>Math.abs(v-a.rgba[k])):
      [Infinity,Infinity,Infinity,Infinity];
    return {...expected,actual:valid?a.rgba:null,difference,
      pass:valid&&difference.every(v=>v<=tolerance)};
  });
}
