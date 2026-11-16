#version 300 es
precision highp float;
in vec2 v_uv;
uniform sampler2D u_texture;
uniform float u_repeats;
uniform vec2 u_offset;
out vec4 outColor;
void main() {
  // The texture unit's MIN_FILTER and wrap modes are set in sampling.js.
  outColor = texture(u_texture, v_uv * u_repeats + u_offset);
}
