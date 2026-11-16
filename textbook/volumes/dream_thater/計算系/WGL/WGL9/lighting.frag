#version 300 es
precision highp float;
in vec3 v_normal;
uniform vec3 u_lightDirection;
uniform vec3 u_baseColor;
uniform float u_lightPower;
uniform float u_shininess;
uniform bool u_showNormals;
out vec4 outColor;
float encodeSrgb(float linearValue) {
  return linearValue <= 0.0031308 ?
    12.92 * linearValue :
    1.055 * pow(linearValue, 1.0 / 2.4) - 0.055;
}
vec3 encodeColor(vec3 linearColor) {
  return vec3(encodeSrgb(linearColor.r),
              encodeSrgb(linearColor.g), encodeSrgb(linearColor.b));
}
void main() {
  // Smoothly interpolated normals generally lose unit length.
  vec3 N = normalize(v_normal);
  if (u_showNormals) {
    outColor = vec4(0.5 * (N + vec3(1.0)), 1.0);
    return;
  }
  vec3 L = normalize(u_lightDirection); // fragment -> directional light
  vec3 V = vec3(0.0, 0.0, 1.0);          // orthographic viewing direction
  vec3 H = normalize(L + V);
  float lambert = max(dot(N, L), 0.0);
  // The specular term is gated: the back side never receives this highlight.
  float specular = lambert > 0.0 ?
    pow(max(dot(N, H), 0.0), u_shininess) : 0.0;
  vec3 linearRgb = u_lightPower *
    (u_baseColor * (0.10 + 0.60 * lambert) +
     vec3(0.30 * specular));
  outColor = vec4(encodeColor(clamp(linearRgb, 0.0, 1.0)), 1.0);
}
