// WGL9 analytic CPU reference: solve the cube and ellipsoid ray intersections
// independently of the GPU mesh and fragment output.
export const MODEL_SCALE = Object.freeze([1.25,0.75,1.0]);
export const ROTATION_DEGREES = 30;
export const LIGHT = Object.freeze([0.6,0.2,Math.sqrt(0.6)]);
export const VIEW = Object.freeze([0,0,1]);
export const CUBE_COLOR = Object.freeze([0.1,0.45,0.75]);
export const SPHERE_COLOR = Object.freeze([0.65,0.20,0.08]);
export const CLEAR_RGBA = Object.freeze([5,6,10,255]);
const cos=Math.cos(Math.PI*ROTATION_DEGREES/180);
const sin=Math.sin(Math.PI*ROTATION_DEGREES/180);
export function normalize3(v) {
  if (v.length!==3 || !v.every(Number.isFinite)) throw new RangeError('3 finite components required');
  const n=Math.hypot(...v);
  if(n<1e-12) throw new RangeError('cannot normalize zero vector');
  return v.map(x=>x/n);
}
export function dot3(a,b) { return a.reduce((sum,x,i)=>sum+x*b[i],0); }
export function correctNormal(local,scale=MODEL_SCALE,angle=ROTATION_DEGREES) {
  if(scale.some(s=>!(s>0))) throw new RangeError('noninvertible model transform');
  const c=Math.cos(Math.PI*angle/180), s=Math.sin(Math.PI*angle/180);
  const x=local[0]/scale[0], y=local[1]/scale[1], z=local[2]/scale[2];
  return normalize3([c*x+s*z,y,-s*x+c*z]);
}
export function wrongNormal(local,scale=MODEL_SCALE,angle=ROTATION_DEGREES) {
  const c=Math.cos(Math.PI*angle/180), s=Math.sin(Math.PI*angle/180);
  const x=local[0]*scale[0], y=local[1]*scale[1], z=local[2]*scale[2];
  return normalize3([c*x+s*z,y,-s*x+c*z]);
}
export function encodeSrgb(linear) {
  if(!Number.isFinite(linear)||linear<0||linear>1)
    throw new RangeError('linear light outside [0,1]');
  return linear<=0.0031308 ? 12.92*linear : 1.055*linear**(1/2.4)-0.055;
}
export function shadeNormal(local,base,options={}) {
  const power=options.power ?? 1;
  const shininess=options.shininess ?? 16;
  const N=options.incorrect ? wrongNormal(local) : correctNormal(local);
  if(options.showNormals) return [...N.map(x=>.5*(x+1)),1];
  const L=normalize3(options.light ?? LIGHT);
  const H=normalize3([L[0],L[1],L[2]+1]);
  const diffuse=Math.max(0,dot3(N,L));
  const spec=diffuse>0 ? Math.max(0,dot3(N,H))**shininess : 0;
  const linear=base.map(v=>Math.min(1,Math.max(0,power*(v*(.10+.60*diffuse)+.30*spec))));
  return [...linear.map(encodeSrgb),1];
}
function worldToLocalRay(x,y) {
  // Local point: S^(-1) R^T (x, y, z). Each coordinate is A*z+B.
  const [sx,sy,sz]=MODEL_SCALE;
  return [[-sin/sx,cos*x/sx],[0,y/sy],[cos/sz,sin*x/sz]];
}
export function cubeFrontNormal(x,y) {
  const ray=worldToLocalRay(x,y);
  let lower=-Infinity, upper=Infinity, upperFace=-1;
  const h=.6;
  for(let i=0;i<3;i++) {
    const [a,b]=ray[i];
    if(Math.abs(a)<1e-12) {
      if(Math.abs(b)>h+1e-10)return null;
      continue;
    }
    const z1=(-h-b)/a,z2=(h-b)/a;
    const hi=Math.max(z1,z2),lo=Math.min(z1,z2);
    lower=Math.max(lower,lo);
    if(hi<upper){upper=hi;upperFace=i;}
  }
  if(lower>upper+1e-10||upperFace<0) return null;
  const local=[0,0,0];
  const a=ray[upperFace][0],b=ray[upperFace][1];
  local[upperFace]=a*upper+b>0 ? 1:-1;
  return local;
}
export function sphereFrontNormal(x,y) {
  const ray=worldToLocalRay(x,y);
  const radius=.65;
  const a=ray.reduce((sum,[m])=>sum+m*m,0);
  const b=2*ray.reduce((sum,[m,n])=>sum+m*n,0);
  const c=ray.reduce((sum,[,n])=>sum+n*n,0)-radius*radius;
  const discriminant=b*b-4*a*c;
  if(discriminant<0)return null;
  const z=(-b+Math.sqrt(discriminant))/(2*a);
  const normal=ray.map(([m,n])=>(m*z+n)/radius);
  return normalize3(normal);
}
export function expectedAt(figure,xNdc,yNdc) {
  const xWorld=xNdc/.70, yWorld=yNdc/.85;
  const local=figure==='cube' ? cubeFrontNormal(xWorld,yWorld) : sphereFrontNormal(xWorld,yWorld);
  if(!local)return [...CLEAR_RGBA];
  const base=figure==='cube'?CUBE_COLOR:SPHERE_COLOR;
  return shadeNormal(local,base).map(v=>Math.round(255*v));
}
export function expectedWGL9Samples(width,height) {
  if(!Number.isInteger(width)||!Number.isInteger(height)||
     width<64||height<64||width>1024||height>1024||width*height>524288)
    throw new RangeError('invalid drawing buffer');
  const left=Math.floor(width/2);
  const probes=[
    ['中心',.5,.5],['右寄り',.68,.5],['上寄り',.5,.64],['背景',.06,.06]
  ];
  return ['cube','sphere'].flatMap((figure,i)=>{
    const viewportWidth=i===0 ? left : width-left;
    const start=i===0 ? 0 : left;
    return probes.map(([label,u,v])=>{
      const localX=Math.floor(u*viewportWidth),y=Math.floor(v*height);
      const ndcX=2*(localX+.5)/viewportWidth-1;
      const ndcY=2*(y+.5)/height-1;
      return {label:(figure==='cube'?'立方体':'球')+' '+label,
        x:start+localX,y,rgba:expectedAt(figure,ndcX,ndcY)};
    });
  });
}
export function compareWGL9Readback(actual,width,height,tolerance=10) {
  return expectedWGL9Samples(width,height).map((ref,i)=>{
    const sample=actual[i];
    const valid=sample&&sample.x===ref.x&&sample.y===ref.y&&
      Array.isArray(sample.rgba)&&sample.rgba.length===4&&
      sample.rgba.every(x=>Number.isInteger(x)&&x>=0&&x<=255);
    const difference=valid?ref.rgba.map((v,j)=>Math.abs(v-sample.rgba[j])):
      [Infinity,Infinity,Infinity,Infinity];
    return {...ref,actual:valid?sample.rgba:null,difference,
      pass:!!valid&&difference.every(x=>x<=tolerance)};
  });
}
