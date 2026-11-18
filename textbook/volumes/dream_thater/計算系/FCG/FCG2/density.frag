#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 v_uv;
uniform sampler2D u_density;
out vec4 outColor;
void main() {
  ivec2 cell=ivec2(clamp(floor(v_uv*8.0),vec2(0.0),vec2(7.0)));
  float q=texelFetch(u_density,cell,0).r;
  outColor=vec4(q,0.15,1.0-q,1.0);
}
