#version 300 es
precision highp float;
layout(location=0) in vec3 a_position;
layout(location=1) in float a_id;
uniform mat4 u_projection;
flat out int v_id;
void main() {
  v_id = int(a_id + 0.5);
  gl_Position = u_projection * vec4(a_position, 1.0);
}
