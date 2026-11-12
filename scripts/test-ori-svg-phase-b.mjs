import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {SPECS,stateAt,cubicRoots} from '../textbook/volumes/dream_thater/幾何系/ORI/shared/ori-phase-b-models.mjs';
import {svgFrame,posterSvg} from '../textbook/volumes/dream_thater/幾何系/ORI/shared/ori-phase-b-svg.mjs';
const base='textbook/volumes/dream_thater/幾何系/ORI';
const close=(a,b,n)=>assert.ok(Number.isFinite(a)&&Math.abs(a-b)<=1e-7,n+': '+a+' vs '+b);
for(const spec of SPECS){
 test('ORI-V'+spec.id+': 全モード201フレーム・不変量・復帰',()=>{
   for(const mode of spec.modes){
    const saved=stateAt(spec.id,.375,mode);
    for(let j=0;j<=200;j++){
      const state=stateAt(spec.id,j/200,mode);
      assert.equal(state.id,spec.id);
      assert.ok(state.shapes.length);
      for(const r of state.checks)close(r.actual,r.expected,'V'+spec.id+' '+mode+' '+j+' '+r.name);
      assert.match(svgFrame({...state,title:spec.title}),/<rect/);
    }
    stateAt(spec.id,.9,mode);stateAt(spec.id,.1,mode);
    assert.deepEqual(stateAt(spec.id,.375,mode),saved,'スクラブの結果は操作履歴に依存しない');
   }
   assert.throws(()=>stateAt(spec.id,-.0001),RangeError);
   assert.throws(()=>stateAt(spec.id,1.0001),RangeError);
   assert.throws(()=>stateAt(spec.id,.5,'forbidden-mode'),RangeError);
 });
 test('ORI-V'+spec.id+': 操作UIと静止図と本文の整合',()=>{
   const name='ori-v'+spec.id,folder=base+'/'+spec.chapter,html=readFileSync(folder+'/assets/'+name+'-player.html','utf8');
   const poster=readFileSync(folder+'/assets/'+name+'-poster.svg','utf8'),chapter=readFileSync(folder+'/index.md','utf8');
   for(const key of ['play','reset','previous','next','speed','time','step','status','announcement']){
     assert.ok(html.includes('data-player="'+key+'"'),'missing '+key);
   }
   assert.match(html,/aria-live="polite"/);
   assert.match(html,/静止SVG/);
   const escaped=x=>x.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
   assert.ok(html.includes(escaped(spec.formula)),'stale player formula '+spec.id);
   assert.ok(html.includes('ORI-V'+spec.id+' '+spec.title),'stale player title '+spec.id);
   assert.ok(html.includes(escaped(stateAt(spec.id,0,spec.modes[0]).readout)),'stale transcript at t=0 '+spec.id);
   assert.ok(html.includes(escaped(stateAt(spec.id,1,spec.modes[0]).readout)),'stale transcript at t=1 '+spec.id);
   assert.match(html,/type="module"/);
   assert.match(poster,/data-layout-lint="strict"/);
   assert.match(poster,/<title/);
   assert.match(poster,/<desc/);
   assert.match(poster,/<clipPath/);
   assert.match(chapter,new RegExp('assets/ori-v'+spec.id+'-player\\.html'));
   assert.match(chapter,new RegExp('assets/ori-v'+spec.id+'-poster\\.svg'));
   const posterTime=({'02':.5,'05':.5,'06':.5,'07':.5,'13':1})[spec.id]??.75;
   assert.equal(poster,posterSvg({...stateAt(spec.id,posterTime,spec.modes[0]),title:spec.title},'ORI-V'+spec.id+' '+spec.title),'poster derives from the mathematical model');
 });
}
test('ORI-V02: 芳賀折りの三等分を再計算',()=>{
 close(stateAt('02',.5).values.ratio,1/3,'Haga one third');
});
test('ORI-V05 O5 の0/1/2本と接点',()=>{
 assert.equal(stateAt('05',0).values.targets.length,0);
 assert.equal(stateAt('05',1/6).values.targets.length,1);
 assert.equal(stateAt('05',.5).values.targets.length,2);
 assert.equal(stateAt('05',5/6).values.targets.length,1);
 assert.equal(stateAt('05',1).values.targets.length,0);
});
test('ORI-V06 O6の三次実根数と重根の例',()=>{
 for(const [c,n] of [[0,3],[2,2],[-2,2],[2.5,1],[-2.5,1]])assert.equal(cubicRoots(c).length,n);
});
test('ORI-V07 O6から立方根、ORI-V09の必要条件、ORI-V10層順の循環',()=>{
 assert.ok(Math.abs(stateAt('07',.4,'cube').values.m**3-stateAt('07',.4,'cube').values.r)<1e-10);
 assert.equal(stateAt('09',.5,'valid').values.necessary,true);
 assert.equal(stateAt('09',.5,'invalid').values.necessary,false);
 assert.equal(stateAt('10',1,'cycle').values.cycle,true);
 assert.equal(stateAt('10',1,'acyclic').values.cycle,false);
});
test('ORI-V11の対称像、ORI-V14の正確な剛体頂点と非運動格子を区別',()=>{
 close(stateAt('11',1).values.projectedCutX,-1,'切断線一致');
 assert.ok(stateAt('11',1).values.folded);
 assert.equal(stateAt('14',.5,'vertex').values.rays.length,4);
 assert.equal(stateAt('14',.5,'miura').values.cells,9);
});
