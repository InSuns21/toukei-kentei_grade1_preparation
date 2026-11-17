#version 300 es
precision highp float;
layout(location=0) in vec2 a_local;
layout(location=1) in vec2 a_offset;
layout(location=2) in vec3 a_color;
uniform bool u_instanced;
uniform vec2 u_offset;
uniform vec3 u_color;
out vec3 v_color;
void main() {
  vec2 center = u_instanced ? a_offset : u_offset;
  v_color = u_instanced ? a_color : u_color;
  gl_Position = vec4(a_local + center, 0.0, 1.0);
}
