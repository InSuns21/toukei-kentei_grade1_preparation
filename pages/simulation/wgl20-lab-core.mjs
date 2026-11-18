// Host-only oracle for WGL20, independent of editable learner JavaScript / GLSL.
const KEYS=[[32,96,64],[24,98,210],[172,78,42],[16,24,40]];
export const WGL20_ORIGIN=Object.freeze([37.63308,140.96242,29.70502587]);
export function expectedWGL20Samples(width,height){
 if(!Number.isInteger(width)||!Number.isInteger(height)||width<64||height<64||
    width>1024||height>1024||width*height>524288)throw new RangeError('viewport out of range');
 return KEYS.map((rgb,i)=>({label:['地形凡例','仮想水面凡例','建物凡例','背景凡例'][i],
   x:Math.floor(width*(i+0.5)/4),y:4,rgba:[...rgb,255]}));
}
export function compareWGL20Readback(actual,width,height,tolerance=1){
 return expectedWGL20Samples(width,height).map((p,i)=>{
   const a=actual?.[i],valid=!!a&&a.x===p.x&&a.y===p.y&&
     Array.isArray(a.rgba)&&a.rgba.length===4&&a.rgba.every(n=>Number.isInteger(n)&&n>=0&&n<=255);
   const difference=p.rgba.map((value,k)=>valid?Math.abs(value-a.rgba[k]):Infinity);
   return {...p,actual:valid?a.rgba:null,difference,pass:valid&&difference.every(v=>v<=tolerance)};
 });
}
export function localMetresFromGeodetic(lat,lon,h,origin=WGL20_ORIGIN){
 const [lat0,lon0,h0]=origin,r=Math.PI/180,phi=lat0*r;
 const a=6378137,f=1/298.257222101,e2=2*f-f*f;
 const q=1-e2*Math.sin(phi)**2;
 const E=(lon-lon0)*r*a*Math.cos(phi)/Math.sqrt(q);
 const N=(lat-lat0)*r*a*(1-e2)/Math.pow(q,1.5);
 return [E,N,h-h0];
}
export function verifyWGL20Report(report,snapshot){
 if(!snapshot||snapshot.schema!=='wgl20-offline-mesh-v1'||!report)
   return {valid:false,pass:false,reasons:['dataset/report missing']};
 const p=snapshot.checks?.firstGeodetic;
 if(!Array.isArray(p)||p.length!==3||!p.every(Number.isFinite))
   return {valid:false,pass:false,reasons:['first geodetic vertex missing']};
 const expected=localMetresFromGeodetic(...p,snapshot.coordinate.originLatLonH);
 const first=report.firstLocal;
 const offset=Array.isArray(first)&&first.length===3?
   Math.max(...expected.map((x,i)=>Math.abs(x-first[i]))):Infinity;
 const ground=snapshot.coordinate.originLatLonH[2];
 const depth=Math.max(0,report.waterLevelM-ground);
 const checks={
   firstLocalMetres:Number.isFinite(offset)&&offset<=0.00012,
   count:report.vertices===snapshot.mesh.vertices.length/3&&
     report.triangles===snapshot.mesh.triangles.length/3,
   ground:Math.abs(report.groundAtOriginM-ground)<=1e-8,
   waterDepth:Number.isFinite(depth)&&Math.abs(report.depthAtOriginM-depth)<=1e-8,
   groundAtTest:Number.isFinite(report.groundAtTestM)&&
     Math.abs(report.groundAtTestM-(ground+0.02*10-0.01*(-20)))<=1e-8,
   waterDepthAtTest:Number.isFinite(report.depthAtTestM)&&
     Math.abs(report.depthAtTestM-Math.max(0,report.waterLevelM-(ground+0.4)))<=1e-8,
   groundAtWest:Number.isFinite(report.groundAtWestM)&&
     Math.abs(report.groundAtWestM-(ground+0.02*(-20)-0.01*10))<=1e-8,
   waterDepthAtWest:Number.isFinite(report.depthAtWestM)&&
     Math.abs(report.depthAtWestM-Math.max(0,report.waterLevelM-(ground-0.5)))<=1e-8,
   visualScale:report.zExaggeration>0&&report.zExaggeration<=5
 };
 return {valid:true,pass:Object.values(checks).every(Boolean),checks,offset,ground,depth};
}
