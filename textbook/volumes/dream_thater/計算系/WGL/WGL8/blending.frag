#version 300 es
precision highp float;
in vec2 v_uv;
uniform int u_mode;
uniform int u_reverse;
uniform vec4 u_drawColor;
uniform vec4 u_background;
uniform vec4 u_layerA;
uniform vec4 u_layerB;
out vec4 outColor;
float toLinear(float s) {
  return s <= 0.04045 ? s / 12.92 : pow((s + 0.055) / 1.055, 2.4);
}
float toSrgb(float l) {
  return l <= 0.0031308 ? 12.92 * l : 1.055 * pow(l, 1.0/2.4) - 0.055;
}
vec3 decode(vec3 c) {
  return vec3(toLinear(c.r), toLinear(c.g), toLinear(c.b));
}
vec3 encode(vec3 c) {
  return vec3(toSrgb(c.r), toSrgb(c.g), toSrgb(c.b));
}
vec3 overLayer(vec3 back, vec4 front) {
  return mix(back, decode(front.rgb), front.a);
}
bool inRect(vec2 p, vec4 rect) {
  return p.x >= rect.x && p.x < rect.z &&
         p.y >= rect.y && p.y < rect.w;
}
void main() {
  if (u_mode == 0) {
    outColor = u_drawColor;
    return;
  }
  bool inA = inRect(v_uv, vec4(0.1, 0.2, 0.75, 0.85));
  bool inB = inRect(v_uv, vec4(0.4, 0.4, 0.9, 0.75));
  vec3 light = decode(u_background.rgb);
  if (u_reverse == 0) {
    if (inA) light = overLayer(light, u_layerA);
    if (inB) light = overLayer(light, u_layerB);
  } else {
    if (inB) light = overLayer(light, u_layerB);
    if (inA) light = overLayer(light, u_layerA);
  }
  outColor = vec4(encode(light), 1.0);
}
