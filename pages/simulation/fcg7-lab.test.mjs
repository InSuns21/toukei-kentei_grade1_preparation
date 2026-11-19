import {strict as assert} from 'node:assert';
import {test} from 'node:test';
import {fcg7State,expectedFCG7Samples,compareFCG7Readback} from './fcg7-lab-core.mjs';
test('FCG7 periodic P2G preserves nodal mass and particles remain on torus',()=>{
  for(const n of [0,1,8,24]){
    const s=fcg7State(n);
    assert.ok(Math.abs(s.mass-16)<1e-9);
    assert.equal(s.pic.length,16);
    for(const p of [...s.pic,...s.flip]){
      assert.ok(p.every(Number.isFinite));
      assert.ok(p[0]>=0&&p[0]<1&&p[1]>=0&&p[1]<1);
    }
  }
  assert.ok(fcg7State(24).picWrap>0);
  assert.ok(fcg7State(24).flipWrap>0);
});
test('FCG7 transfer distinguishes PIC damping and FLIP noise preservation',()=>{
  const s=fcg7State(8);
  assert.ok(s.energyPic>0&&s.energyFlip>0);
  assert.ok(s.energyFlip>s.energyPic,
    'initial high frequency perturbation should be smoothed in PIC');
});
test('FCG7 reference pixel comparator rejects corrupt and edited readback',()=>{
  const predicted=expectedFCG7Samples(384,256,8);
  assert.ok(compareFCG7Readback(predicted,384,256,8).every(x=>x.pass));
  const broken=predicted.map(x=>({...x,rgba:[0,0,0,255]}));
  assert.ok(compareFCG7Readback(broken,384,256,8).some(x=>!x.pass));
});
