#version 300 es
precision highp float;
in vec2 v_uv;
uniform int u_mode; // 0 = GPU smooth (perspective), 1 = affine screen interpolation
uniform vec4 u_viewport; // (viewport x, y, width, height) in framebuffer pixels
uniform float u_gridFrequency;
out vec4 outColor;

float edge2(vec2 a, vec2 b, vec2 p) {
  vec2 ab = b - a, ap = p - a;
  return ab.x * ap.y - ab.y * ap.x;
}
void main() {
  // The two triangles have the same projected coordinates in their own viewport.
  vec2 a = vec2(-0.75, -0.65);
  vec2 b = vec2( 0.75, -0.65);
  vec2 c = vec2( 0.0,   0.80);
  vec2 ndc = 2.0 * (gl_FragCoord.xy - u_viewport.xy) / u_viewport.zw - 1.0;
  float area = edge2(a, b, c);
  vec3 lambda = vec3(edge2(b, c, ndc),
                     edge2(c, a, ndc),
                     edge2(a, b, ndc)) / area;
  // Perspective correction happens automatically for smooth v_uv.
  vec2 uv = u_mode == 0 ? v_uv : vec2(lambda.y, lambda.z);
  float grid = min(fract(uv.x * u_gridFrequency), fract(uv.y * u_gridFrequency));
  vec3 rgb = grid < 0.03 ? vec3(0.05) : vec3(uv, 0.25);
  outColor = vec4(rgb, 1.0);
}
