#version 300 es
precision highp float;
precision highp usampler2D;
uniform sampler2D u_floatData;
uniform usampler2D u_integerData;
uniform int u_mode; // 0=R8 UNORM, 1=R8UI integer, 2=R32F
uniform int u_floatTarget;
uniform vec2 u_targetSize;
out vec4 outColor;
void main() {
  ivec2 cell = ivec2(clamp(floor(gl_FragCoord.xy * vec2(4.0, 2.0) /
                                 u_targetSize), vec2(0.0), vec2(3.0, 1.0)));
  float physical, normalized;
  if (u_mode == 1) {
    uint byteValue = texelFetch(u_integerData, cell, 0).r;
    normalized = float(byteValue) / 255.0;
    physical = -2.0 + 4.0 * normalized;
  } else if (u_mode == 0) {
    normalized = texelFetch(u_floatData, cell, 0).r;
    physical = -2.0 + 4.0 * normalized;
  } else {
    physical = texelFetch(u_floatData, cell, 0).r;
    normalized = clamp((physical + 2.0) / 4.0, 0.0, 1.0);
  }
  if (u_floatTarget == 1) outColor = vec4(physical, 0.0, 0.0, 1.0);
  else outColor = vec4(normalized, 0.2, 1.0 - normalized, 1.0);
}
