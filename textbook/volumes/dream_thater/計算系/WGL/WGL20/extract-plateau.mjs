// WGL20: fixed, deliberately small CityGML 2.0 sample converter.
// Usage: node extract-plateau.mjs building_sample.gml plateau-lod1.json
// Input must be the pinned Project-PLATEAU sample; no network calls are made.
import {readFileSync,writeFileSync} from 'node:fs';
const [input,output]=process.argv.slice(2);
if(!input||!output){console.error('usage: node extract-plateau.mjs input.gml output.json');process.exit(2);}
const source=readFileSync(input,'utf8');
const crs=(source.match(/<gml:Envelope\b[^>]*srsName="([^"]+)"/)||[])[1];
if(crs!=='http://www.opengis.net/def/crs/EPSG/0/6697')
 throw new Error('unsupported input srsName; do not guess axis order');
const member=source.match(/<bldg:Building\s+gml:id="([^"]+)"([\s\S]*?)<\/bldg:Building>/);
if(!member||[...source.matchAll(/<bldg:Building\b/g)].length!==1)
 throw new Error('expected exactly one official sample Building');
const solid=member[2].match(/<bldg:lod1Solid>([\s\S]*?)<\/bldg:lod1Solid>/)?.[1];
if(!solid)throw new Error('lod1Solid missing');
const raw=[...solid.matchAll(/<gml:posList>([^<]+)<\/gml:posList>/g)].map(x=>{
 const numbers=x[1].trim().split(/\s+/).map(Number);
 if(numbers.length%3||numbers.some(v=>!Number.isFinite(v)))throw new Error('invalid posList');
 const ring=[];
 for(let k=0;k<numbers.length;k+=3)ring.push(numbers.slice(k,k+3));
 if(ring.length>1&&ring[0].every((v,i)=>Math.abs(v-ring.at(-1)[i])<1e-8))ring.pop();
 return ring;
});
if(raw.length!==25||solid.includes('<gml:interior>'))
 throw new Error('this sample-only converter cannot silently triangulate holes or new geometry');
const origin=[37.63308,140.96242,29.70502587];
const phi=origin[0]*Math.PI/180,a=6378137,f=1/298.257222101,e2=2*f-f*f;
const q=1-e2*Math.sin(phi)**2;
const eastDegree=Math.PI/180*a*Math.cos(phi)/Math.sqrt(q);
const northDegree=Math.PI/180*a*(1-e2)/q**1.5;
const round=x=>Math.round(x*10000)/10000;
const project=([lat,lon,h])=>[
 round((lon-origin[1])*eastDegree),
 round((lat-origin[0])*northDegree),
 round(h-origin[2])];
function triangles(p){
 let normal=[0,0,0];
 for(let i=0;i<p.length;i++){
   const u=p[i],v=p[(i+1)%p.length];
   normal[0]+=(u[1]-v[1])*(u[2]+v[2]);
   normal[1]+=(u[2]-v[2])*(u[0]+v[0]);
   normal[2]+=(u[0]-v[0])*(u[1]+v[1]);
 }
 const absolute=normal.map(Math.abs);
 const axis=absolute.indexOf(Math.max(...absolute));
 const xy=p.map(v=>axis===0?[v[1],v[2]]:axis===1?[v[0],v[2]]:[v[0],v[1]]);
 const area=xy.reduce((s,u,i)=>{const v=xy[(i+1)%xy.length];return s+u[0]*v[1]-v[0]*u[1];},0);
 const sign=Math.sign(area);
 if(!sign)throw new Error('degenerate polygon');
 const cross=(a,b,c)=>(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]);
 const sequence=p.map((_,i)=>i),out=[];
 while(sequence.length>3){
   let found=false;
   for(let j=0;j<sequence.length;j++){
     const ia=sequence[(j+sequence.length-1)%sequence.length],ib=sequence[j],ic=sequence[(j+1)%sequence.length];
     const [A,B,C]=[xy[ia],xy[ib],xy[ic]];
     if(sign*cross(A,B,C)<=1e-8)continue;
     if(sequence.some(k=>k!==ia&&k!==ib&&k!==ic&&
       sign*cross(A,B,xy[k])>=-1e-8&&
       sign*cross(B,C,xy[k])>=-1e-8&&
       sign*cross(C,A,xy[k])>=-1e-8))continue;
     out.push([ia,ib,ic]);sequence.splice(j,1);found=true;break;
   }
   if(!found)throw new Error('failed to triangulate polygon: check self-intersection');
 }
 out.push(sequence);
 return out;
}
const vertices=[],indices=[];
for(const ring of raw){
 const start=vertices.length/3,local=ring.map(project);
 for(const p of local)vertices.push(...p);
 for(const t of triangles(local))indices.push(...t.map(i=>start+i));
}
if(vertices.length/3!==138||indices.length/3!==88)
 throw new Error('upstream sample/triangulation changed; re-review geometry');
const height=Number(member[2].match(/<bldg:measuredHeight[^>]*>([^<]+)/)?.[1]);
if(!Number.isFinite(height))throw new Error('measuredHeight missing');
const result={
 schema:'wgl20-offline-mesh-v1',
 source:{
   repository:'Project-PLATEAU/PLATEAU-generator-for-spatialid',
   commit:'e921990effa2e884f1c8667cef1cab491d1de619',
   path:'examples/citygml/udx/bldg/building_sample.gml',
   gmlId:member[1],declaredCrs:'EPSG:6697',lod:'lod1Solid',
   municipality:'not given in sample metadata',
   surveyYear:'not given in sample metadata',
   license:'BSD-3-Clause (upstream repository)',
   heightAttributeM:height
 },
 coordinate:{
   originLatLonH:origin,axisOrderInput:'lat lon verticalHeight',
   axisOrderLocal:'east north up',
   unitsInput:'degrees degrees metres',unitsOutput:'metres metres metres',
   eastMetresPerDegree:eastDegree,northMetresPerDegree:northDegree,
   method:'GRS80 curvature local linearization at origin, vertical difference without datum conversion',
   roundingMetres:0.0001
 },
 mesh:{vertices,triangles:indices},
 checks:{polygonCount:raw.length,vertexCount:vertices.length/3,
   triangleCount:indices.length/3,firstGeodetic:raw[0][0],firstLocal:vertices.slice(0,3)}
};
writeFileSync(output,JSON.stringify(result,null,2)+'\n');
console.log('WGL20 sample: 1 building, '+raw.length+' polygons, '+
 result.checks.vertexCount+' vertices, '+result.checks.triangleCount+' triangles');
