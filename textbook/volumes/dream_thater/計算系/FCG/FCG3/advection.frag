#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 v_uv;
uniform sampler2D u_numeric;
uniform sampler2D u_exact;
out vec4 outColor;
void main(){
  bool left=v_uv.x<0.5;
  vec2 cellUv=vec2(fract(v_uv.x*2.0),v_uv.y);
  ivec2 cell=ivec2(clamp(floor(cellUv*32.0),vec2(0.0),vec2(31.0)));
  float q=texelFetch(u_numeric,cell,0).r;
  float exact=texelFetch(u_exact,cell,0).r;
  if(left)outColor=vec4(q,0.15,1.0-q,1.0);
  else outColor=vec4(min(1.0,5.0*abs(q-exact)),0.08,0.1,1.0);
}
