#version 300 es
precision highp float;
layout(location = 0) in vec2 a_position;
layout(location = 1) in vec2 a_uv;
layout(location = 2) in float a_w;
out vec2 v_uv;
void main() {
  // Keep NDC positions fixed; w controls perspective-correct UV interpolation.
  gl_Position = vec4(a_position * a_w, 0.0, a_w);
  v_uv = a_uv;
}
