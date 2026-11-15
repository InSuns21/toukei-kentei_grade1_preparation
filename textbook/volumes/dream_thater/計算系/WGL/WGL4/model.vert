#version 300 es
precision highp float;
layout(location = 0) in vec3 a_position;
uniform mat4 u_model;
void main() {
  // WGL5で視点行列と投影行列を加える。ここではworld xyを直接clip xyとみなす。
  gl_Position = u_model * vec4(a_position, 1.0);
}
