import test from 'node:test';
import assert from 'node:assert/strict';
import {expectedWGL20Samples,compareWGL20Readback,localMetresFromGeodetic,verifyWGL20Report} from './wgl20-lab-core.mjs';
test('diagnostic rgba and resizable probes',()=>{
 for(const [w,h] of [[64,64],[320,240],[1024,512]]){
   const a=expectedWGL20Samples(w,h);
   assert.equal(a.length,4);assert.ok(a.every(p=>p.y<12));
   const actual=a.map(x=>({x:x.x,y:x.y,rgba:x.rgba}));
   assert.ok(compareWGL20Readback(actual,w,h).every(x=>x.pass));
   actual[0].rgba=[255,0,0,255];
   assert.equal(compareWGL20Readback(actual,w,h)[0].pass,false);
 }
});
test('EPSG 6697 input axis order: lat lon height; local origin cancels',()=>{
 const origin=[37.63308,140.96242,29.70502587];
 assert.deepEqual(localMetresFromGeodetic(...origin),[0,0,0]);
 const x=localMetresFromGeodetic(37.63297022805161,140.9624389225186,29.70502587);
 assert.ok(Math.abs(x[0]-1.6703)<0.0001);
 assert.ok(Math.abs(x[1]+12.1835)<0.0001);
 assert.equal(x[2],0);
});
test('numeric elevations and counts are checked separately from pixels',()=>{
 const origin=[37.63308,140.96242,29.70502587];
 const first=[37.63297022805161,140.9624389225186,29.70502587];
 const xyz=localMetresFromGeodetic(...first).map(v=>Math.round(v*1e4)/1e4);
 const snapshot={schema:'wgl20-offline-mesh-v1',coordinate:{originLatLonH:origin},
   checks:{firstGeodetic:first},mesh:{vertices:[...xyz],triangles:[0,0,0]}};
 const report={firstLocal:xyz,vertices:1,triangles:1,waterLevelM:32,
   groundAtOriginM:origin[2],depthAtOriginM:32-origin[2],
   groundAtTestM:origin[2]+0.4,depthAtTestM:32-origin[2]-0.4,
   groundAtWestM:origin[2]-0.5,depthAtWestM:32-origin[2]+0.5,zExaggeration:1.5};
 assert.ok(verifyWGL20Report(report,snapshot).pass);
 assert.equal(verifyWGL20Report({...report,depthAtOriginM:32},snapshot).pass,false);
 assert.equal(verifyWGL20Report({...report,depthAtTestM:32},snapshot).pass,false);
 assert.equal(verifyWGL20Report({...report,firstLocal:[100,0,0]},snapshot).pass,false);
});
