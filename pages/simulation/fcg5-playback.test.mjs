import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {fcg5State} from './fcg5-lab-core.mjs';
import {parametersFor,readLabParameter,writeLabParameter} from './wgl-lab-parameters.mjs';

const dir=new URL('../../textbook/volumes/dream_thater/計算系/FCG/FCG5/',import.meta.url);
const clamp=x=>Math.round(255*Math.max(0,Math.min(1,x)));
function harness(source) {
  const textures=[],progress=[],listeners=new Map();
  let textureUnit=0,callback=null,nextId=0;
  const listen=(type,fn)=>listeners.set(type,[...(listeners.get(type)||[]),fn]);
  const canvas={
    width:320,height:240,tabIndex:0,title:'',
    addEventListener:listen,
    removeEventListener(type,fn){listeners.set(type,(listeners.get(type)||[]).filter(x=>x!==fn));},
    dispatchEvent(event){for(const fn of listeners.get(event.type)||[])fn(event);},
    setAttribute(){},
    getBoundingClientRect(){return {left:0,top:0,width:320,height:240};}
  };
  class CE {constructor(type,opts={}){this.type=type;this.detail=opts.detail;}}
  const motion={matches:false,addEventListener(){},removeEventListener(){}};
  const window={
    parent:{},matchMedia(){return motion;},
    addEventListener(){},removeEventListener(){}
  };
  const gl={
    TEXTURE0:33984,TEXTURE_2D:3553,R8:33321,RED:6403,UNSIGNED_BYTE:5121,
    TEXTURE_MIN_FILTER:10241,TEXTURE_MAG_FILTER:10240,NEAREST:9728,LINEAR:9729,
    TEXTURE_WRAP_S:10242,TEXTURE_WRAP_T:10243,CLAMP_TO_EDGE:33071,
    UNPACK_ALIGNMENT:3317,NO_ERROR:0,VERTEX_SHADER:35633,FRAGMENT_SHADER:35632,
    COMPILE_STATUS:35713,LINK_STATUS:35714,COLOR_BUFFER_BIT:16384,TRIANGLES:4,
    DITHER:3024,BLEND:3042,DEPTH_TEST:2929,CULL_FACE:2884,SCISSOR_TEST:3089,
    createTexture(){return {};},activeTexture(value){textureUnit=value-this.TEXTURE0;},
    bindTexture(){},pixelStorei(){},texParameteri(){},getError(){return 0;},
    texImage2D(_t,_level,_format,_width,_height,_border,_format2,_type,bytes){
      textures[textureUnit]=Uint8Array.from(bytes);
    },
    texSubImage2D(_t,_level,_x,_y,_width,_height,_format,_type,bytes){
      textures[textureUnit]=Uint8Array.from(bytes);
    },
    createShader(){return {};},shaderSource(){},compileShader(){},
    getShaderParameter(){return true;},getShaderInfoLog(){return '';},
    createProgram(){return {};},attachShader(){},linkProgram(){},
    getProgramParameter(){return true;},getProgramInfoLog(){return '';},
    deleteShader(){},useProgram(){},getUniformLocation(_p,name){return {name};},
    uniform1i(){},uniform1f(){},createVertexArray(){return {};},bindVertexArray(){},
    disable(){},viewport(){},clearColor(){},clear(){},drawArrays(){}
  };
  const requestAnimationFrame=fn=>{callback=fn;return ++nextId;};
  const cancelAnimationFrame=()=>{callback=null;};
  const run=new Function('gl','canvas','vertexSource','fragmentSource','report',
    'settings','window','document','requestAnimationFrame','cancelAnimationFrame',
    'CustomEvent','Event',source);
  run(gl,canvas,'vertex','fragment',()=>{},{steps:0},window,{hidden:false},
    requestAnimationFrame,cancelAnimationFrame,CE,CE);
  canvas.addEventListener('fcg5-physics-progress',event=>progress.push({...event.detail}));
  const control=action=>canvas.dispatchEvent(new CE('fcg5-physics-control',{detail:{action}}));
  const tick=time=>{
    assert.ok(callback,'rAF callback must remain installed');
    const fn=callback;callback=null;fn(time);
  };
  return {textures,progress,canvas,control,tick};
}

test('FCG5 live step/reset updates the actual editable MAC texture without autoplay',async()=>{
  const source=await readFile(new URL('fluid.js',dir),'utf8');
  const h=harness(source),initial=h.textures[0].slice();
  h.control('step');
  assert.deepEqual(h.progress.at(-1),{step:1,playing:false});
  const cpu=fcg5State(1);
  assert.deepEqual(h.textures[0],Uint8Array.from(cpu.q,clamp),
    'live dye texture must match independent one-step CPU calculation');
  assert.notDeepEqual(h.textures[0],initial);
  h.control('reset');
  assert.deepEqual(h.progress.at(-1),{step:0,playing:false});
  assert.deepEqual(h.textures[0],initial,'reset restores initial dye cells');
  h.tick(1000);h.tick(1200);
  assert.equal(h.progress.at(-1).step,0,'paused reset must not auto advance');
  h.control('toggle');
  assert.equal(h.progress.at(-1).playing,true);
  h.tick(1400);h.tick(1550);h.tick(1610);
  assert.equal(h.progress.at(-1).step,1,'playback advances the same state');
});

test('FCG5 playback pacing edits learner JS only, not the physical timestep or initial GPU fields',async()=>{
  const source=await readFile(new URL('fluid.js',dir),'utf8');
  const spec=parametersFor('FCG5').find(x=>x.id==='playback-ms');
  assert.deepEqual(readLabParameter(source,spec),{ok:true,value:140});
  const edited=writeLabParameter(source,spec,70);
  assert.deepEqual(readLabParameter(edited,spec),{ok:true,value:70});
  assert.equal(writeLabParameter(edited,spec,140),source);
  assert.throws(()=>writeLabParameter(source,spec,35),RangeError);
  assert.throws(()=>writeLabParameter(source,spec,350),RangeError);
  const expression=source.replace('const playbackIntervalMs=140','const playbackIntervalMs=70*2');
  assert.equal(readLabParameter(expression,spec).ok,false);
  assert.throws(()=>writeLabParameter(expression,spec,70),/JSソース/);
  const normal=harness(source),fast=harness(edited);
  assert.deepEqual(fast.textures,normal.textures,'presentation rate leaves initial GPU fields unchanged');
  normal.tick(1000);fast.tick(1000);
  normal.tick(1080);fast.tick(1080);
  assert.equal(normal.progress.length,0,'140ms has not elapsed');
  assert.deepEqual(fast.progress.at(-1),{step:1,playing:true},
    '70ms advances the same physical solver sooner');
});
