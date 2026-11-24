// FCG10: one editable analytic wave and WebGL2 optical renderer.
const angle=30;
const indexWater=1.33;
const amplitude=0.03;
const phase=0;
const absorption=0.8;
const side='air';
const mode='mixed';
if (![angle,indexWater,amplitude,phase,absorption].every(Number.isFinite) ||
 angle<0||angle>80||indexWater<1||indexWater>1.6||amplitude<0||amplitude>0.06||
 phase<0||phase>6||absorption<0||absorption>3||
 !['air','water'].includes(side)||!['mixed','reflection','transmission'].includes(mode))
 throw RangeError('angle 0..80; index 1..1.6; amplitude 0..0.06; phase 0..6; absorption 0..3');
function compile(type,source) {
 const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);
 if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));
 return s;
}
const p=gl.createProgram(),v=compile(gl.VERTEX_SHADER,vertexSource),f=compile(gl.FRAGMENT_SHADER,fragmentSource);
gl.attachShader(p,v);gl.attachShader(p,f);gl.linkProgram(p);
if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(p));
gl.deleteShader(v);gl.deleteShader(f);gl.useProgram(p);
gl.bindVertexArray(gl.createVertexArray());
const uniform=(name,value)=>{const l=gl.getUniformLocation(p,name);if(l!==null)gl.uniform1f(l,value);};
uniform('u_angle',angle*Math.PI/180);uniform('u_index',indexWater);uniform('u_amplitude',amplitude);
uniform('u_phase',phase);uniform('u_absorption',absorption);uniform('u_side',side==='air'?1:-1);
uniform('u_mode',['mixed','reflection','transmission'].indexOf(mode));
gl.viewport(0,0,canvas.width,canvas.height);gl.disable(gl.DITHER);gl.disable(gl.BLEND);gl.disable(gl.DEPTH_TEST);
gl.drawArrays(gl.TRIANGLES,0,3);
report('OPTICS','angle='+angle+' deg; index='+indexWater+'; side='+side+'; mode='+mode);
report('SURFACE','analytic wave: amplitude='+amplitude+' m; phase='+phase+' rad; depth=0.5 m; absorption='+absorption+' /m');
