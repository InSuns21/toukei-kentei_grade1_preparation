import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { POINTS, stateAt, foldPoint, distance } from '../textbook/volumes/dream_thater/幾何系/ORI/ORI1/assets/ori-v01-model.mjs';
import { EXAMPLES, angularWalk, construction, sectorPath, stageAt } from '../textbook/volumes/dream_thater/幾何系/ORI/ORI14/assets/ori-v08-model.mjs';
import { mountPlayer } from '../textbook/volumes/dream_thater/幾何系/ORI/shared/ori-svg-player.mjs';

const close = (actual, expected, label) => assert.ok(Math.abs(actual - expected) < 1e-10, `${label}: ${actual} != ${expected}`);

test('ORI-V01: 全101フレームで固定点・面内距離・回転半径を保存', () => {
  for (let frame=0; frame<=100; frame++) {
    const t = frame/100;
    const s = stateAt(t);
    close(s.Q.x,0,'Q.x'); close(s.Q.y,.5,'Q.y'); close(s.Q.z,0,'Q.z');
    close(s.creaseDistance,1.8,'|PQ|');
    close(s.panelDistance,1.5,'|PB|');
    close(Math.hypot(s.P.x,s.P.z),1.8,'回転半径');
    close(s.theta,Math.PI*t,'角度');
    const arbitrary = foldPoint({ x: 0, y: 1.37, z: 0 },t);
    close(arbitrary.x,0,'折り線上 x'); close(arbitrary.y,1.37,'折り線上 y'); close(arbitrary.z,0,'折り線上 z');
    assert.ok(s.stationaryCrease);
  }
});

test('ORI-V01: 始点・直角・終点と鏡映公式、戻しの決定性', () => {
  const initial = stateAt(0);
  const vertical = stateAt(.5);
  const final = stateAt(1);
  close(initial.P.x,1.8,'始点 x'); close(initial.P.z,0,'始点 z');
  close(vertical.P.x,0,'直角 x'); close(vertical.P.z,1.8,'直角 z');
  close(final.P.x,-1.8,'鏡映 x'); close(final.P.z,0,'鏡映 z');
  close(distance(POINTS.P, POINTS.B),distance(final.P,final.B),'端点鏡映後の等距離');
  const before = stateAt(.375);
  stateAt(.9); stateAt(.1);
  assert.deepEqual(stateAt(.375),before,'順逆の操作履歴に依存しない');
  assert.throws(() => stateAt(-.1),RangeError);
  assert.throws(() => stateAt(1.1),RangeError);
});

test('ORI-V08: 成立例は角度・巡回・扇形幅・閉路が一致する', () => {
  const s = construction('valid');
  assert.deepEqual(s.source.original,[0,60,180,300,360]);
  assert.deepEqual(s.source.alternating,[0,60,-60,60,0]);
  assert.equal(s.start,2,'偶数途中和の最小は2番の後');
  assert.deepEqual(s.rotated,[120,60,60,120]);
  assert.deepEqual(s.placed.alternating,[0,120,60,120,0]);
  assert.equal(s.source.odd,180); assert.equal(s.source.even,180);
  assert.ok(s.source.closed);
  for (let i=0;i<4;i++) {
    close(Math.abs(s.placed.alternating[i+1]-s.placed.alternating[i]),s.rotated[i],`面${i+1}の幅`);
  }
  for (const value of s.placed.alternating) assert.ok(value >= 0 && value <= 180,'上半平面への配置');
});

test('ORI-V08: 不成立例は一周360度でも交互和が0に戻らない', () => {
  const s = construction('invalid');
  assert.equal(s.source.original.at(-1),360);
  assert.equal(s.source.odd,120); assert.equal(s.source.even,240);
  assert.equal(s.source.alternating.at(-1),-120);
  assert.equal(s.placed.alternating.at(-1),-120);
  assert.equal(s.source.closed,false);
  assert.equal(s.start,0);
  assert.throws(() => angularWalk([0,180,180,0]),RangeError);
  assert.throws(() => angularWalk([60,120,180]),RangeError);
});

test('ORI-V08: 201フレームで数学的配置は不変、可視率だけ変化', () => {
  for (const example of Object.keys(EXAMPLES)) {
    const initial = stageAt(0,example);
    for (let frame=0;frame<=200;frame++) {
      const s = stageAt(frame/200,example);
      assert.deepEqual(s.placed,initial.placed);
      assert.deepEqual(s.source,initial.source);
      assert.ok(s.visibility.every(v => v>=0 && v<=1));
      assert.ok(s.visibility.every((v,i) => i===0 || v<=s.visibility[i-1]));
    }
    assert.deepEqual(stageAt(1,example).visibility,[1,1,1,1]);
    assert.deepEqual(stageAt(0,example).visibility,[0,0,0,0]);
    const sampled=stageAt(.625,example);
    stageAt(.9,example); stageAt(.1,example);
    assert.deepEqual(stageAt(.625,example),sampled,'巻戻し・再スクラブで同じ状態');
  }
  assert.match(sectorPath(0,0,50,0,120),/^M 0 0 L /);
});

test('Phase A: HTML の操作・静止代替・数式参照とSVGの説明', () => {
  const root = 'textbook/volumes/dream_thater/幾何系/ORI';
  for (const [chapter,id] of [['ORI1','v01'],['ORI14','v08']]) {
    const html = readFileSync(`${root}/${chapter}/assets/ori-${id}-player.html`,'utf8');
    const poster = readFileSync(`${root}/${chapter}/assets/ori-${id}-poster.svg`,'utf8');
    const chapterText = readFileSync(`${root}/${chapter}/index.md`,'utf8');
    for (const action of ['play','reset','previous','next','speed','time','status','step','announcement']) assert.match(html,new RegExp(`data-player="${action}"`));
    assert.match(html,/aria-live="polite"/);
    assert.match(html,/type="module"/);
    assert.match(html,/折り|扇形/);
    assert.match(html,/静止/);
    assert.match(chapterText,new RegExp(`assets/ori-${id}-player\\.html`));
    assert.match(poster,/data-layout-lint="strict"/);
    assert.match(poster,/<title/);
    assert.match(poster,/<desc/);
  }
});

test('共通再生器: 再生・停止・前後工程・スクラブ・速度・非アニメーション初期表示', () => {
  const saved = Object.fromEntries(['document','matchMedia','requestAnimationFrame','cancelAnimationFrame'].map(k => [k,globalThis[k]]));
  const callbacks = new Map();
  const elements = Object.fromEntries(['play','reset','previous','next','time','speed','status','step','announcement'].map(name => [name,{
    value: name === 'speed' ? '1' : '0', textContent: '', attributes: {}, listeners: {},
    setAttribute(key,value) { this.attributes[key] = value; },
    addEventListener(event,handler) { this.listeners[event] = handler; },
    fire(event) { this.listeners[event](); }
  }]));
  const root = { querySelector(selector) { return elements[/data-player="([^"]+)"/.exec(selector)[1]]; } };
  let nextId=1;
  let hidden=false;
  const page = { addEventListener(event, handler) { if (event==='visibilitychange') this.visibilityHandler=handler; }, get hidden() { return hidden; } };
  globalThis.document = page;
  globalThis.matchMedia = () => ({ matches: true });
  globalThis.requestAnimationFrame = fn => { const id=nextId++; callbacks.set(id,fn); return id; };
  globalThis.cancelAnimationFrame = id => callbacks.delete(id);
  const frame = timestamp => { const [id,fn] = callbacks.entries().next().value; callbacks.delete(id); fn(timestamp); };
  try {
    const player=mountPlayer({ root, render:t => ({ readout:`t=${t.toFixed(2)}`, step:`工程${Math.floor(t*4)}` }), steps:[0,.25,.5,.75,1], durationMs:1000 });
    assert.equal(player.time,1,'動きを減らす設定なら代表静止フレーム');
    assert.equal(player.playing,false,'自動再生しない');
    assert.match(elements.announcement.textContent,/t=1.00/);
    elements.previous.fire('click'); assert.equal(player.time,.75);
    elements.previous.fire('click'); assert.equal(player.time,.5);
    elements.next.fire('click'); assert.equal(player.time,.75);
    elements.reset.fire('click'); assert.equal(player.time,0);
    elements.time.value='.625'; elements.time.fire('input'); assert.equal(player.time,.625);
    elements.speed.value='2'; elements.speed.fire('change');
    elements.play.fire('click'); assert.equal(player.playing,true);
    frame(100); frame(200);
    assert.ok(player.time > .8,'速度2倍で時間が進む');
    assert.equal(player.playing,true);
    elements.play.fire('click'); assert.equal(player.playing,false);
    assert.equal(callbacks.size,0,'停止時のアニメーション予約は残さない');
    elements.time.value='0'; elements.time.fire('input');
    elements.play.fire('click'); frame(1000);
    hidden=true; page.visibilityHandler();
    assert.equal(player.playing,false,'背景タブでは停止');
    assert.equal(callbacks.size,0);
    elements.next.fire('click'); assert.equal(player.time,.25);
    assert.match(elements.announcement.textContent,/工程1/,'工程送りは読み上げ内容も更新');
  } finally {
    for (const [key,value] of Object.entries(saved)) {
      if (value === undefined) delete globalThis[key]; else globalThis[key]=value;
    }
  }
});
