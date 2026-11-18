#version 300 es
precision highp float;
precision highp sampler2D;
uniform sampler2D u_state;
uniform int u_stage; // 0: advance 4x4 data; 1: show 320x240 canvas
uniform float u_rate;
uniform vec2 u_targetSize;
out vec4 outColor;
float cellAt(ivec2 p) {
  ivec2 q = clamp(p, ivec2(0), ivec2(3));
  return texelFetch(u_state, q, 0).r;
}
void main() {
  ivec2 p = u_stage == 0 ? ivec2(gl_FragCoord.xy) :
      ivec2(clamp(floor(gl_FragCoord.xy * vec2(4.0) / u_targetSize),
                  vec2(0.0), vec2(3.0)));
  float center = cellAt(p);
  if (u_stage == 0) {
    float laplace = cellAt(p + ivec2(1,0)) + cellAt(p + ivec2(-1,0))
                  + cellAt(p + ivec2(0,1)) + cellAt(p + ivec2(0,-1))
                  - 4.0 * center;
    float nextValue = center + u_rate * laplace;
    outColor = vec4(nextValue, 0.0, 0.0, 1.0);
  } else {
    float value = clamp(center, 0.0, 1.0);
    outColor = vec4(value, 0.2, 1.0-value, 1.0);
  }
}
