#version 300 es
precision highp float;
precision highp int;
layout(location=0) in vec3 a_position;
layout(location=1) in vec3 a_normal;
uniform mat4 u_mvp;
uniform int u_pass;
out vec3 v_world;
out vec3 v_normal;
void main() {
  v_world = a_position;
  v_normal = a_normal;
  // Probe pass draws a four-pixel strip in clip coordinates.
  gl_Position = u_pass == 2
    ? vec4(a_position.xy, 0.0, 1.0)
    : u_mvp * vec4(a_position, 1.0);
}
