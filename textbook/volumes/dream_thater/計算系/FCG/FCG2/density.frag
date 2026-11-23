#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 v_uv;
uniform sampler2D u_density;
out vec4 outColor;
void main() {
  // Physical texels and screen pixels are separate resolutions.
  ivec2 dims=textureSize(u_density,0);
  ivec2 cell=clamp(ivec2(floor(v_uv*vec2(dims))),ivec2(0),dims-1);
  float q=texelFetch(u_density,cell,0).r;
  // Dye concentration: dark water to amber dye; no emission model.
  vec3 water=vec3(0.025,0.07,0.13);
  vec3 dye=vec3(1.0,0.76,0.22);
  outColor=vec4(mix(water,dye,q),1.0);
}
