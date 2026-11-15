#version 300 es
precision highp float;

in vec3 v_color;
uniform vec3 u_gain;
out vec4 outColor;

void main() {
  outColor = vec4(v_color * u_gain, 1.0);
}
