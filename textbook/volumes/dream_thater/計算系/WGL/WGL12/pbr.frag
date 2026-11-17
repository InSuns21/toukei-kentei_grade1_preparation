#version 300 es
precision highp float;
precision highp int;
uniform vec2 u_resolution;
uniform vec3 u_baseColor;
uniform float u_roughness[3];
uniform float u_metallic[3];
uniform int u_probe;
out vec4 outColor;
const float PI = 3.14159265358979323846;

// All incident/outgoing directions point AWAY from the surface.
vec3 fresnelSchlick(float cosine, vec3 f0) {
  float t = 1.0 - clamp(cosine, 0.0, 1.0);
  return f0 + (vec3(1.0) - f0) * pow(t, 5.0);
}
float ggxD(float noh, float alpha) {
  float a2 = alpha * alpha;
  float d = noh * noh * (a2 - 1.0) + 1.0;
  return a2 / (PI * d * d);
}
float smithG1(float nox, float alpha) {
  float a2 = alpha * alpha;
  return 2.0 * nox / (nox + sqrt(a2 + (1.0 - a2) * nox * nox));
}
vec3 linearToSRGB(vec3 c) {
  vec3 low = 12.92 * c;
  vec3 high = 1.055 * pow(c, vec3(1.0 / 2.4)) - vec3(0.055);
  return mix(low, high, step(vec3(0.0031308), c));
}
vec3 materialBRDF(vec3 n, vec3 v, vec3 l, float rough, float metal) {
  float nol = max(dot(n, l), 0.0);
  float nov = max(dot(n, v), 0.0);
  if (nol <= 0.0 || nov <= 0.0) return vec3(0.0);
  vec3 h = normalize(v + l);
  float noh = max(dot(n, h), 0.0);
  float voh = max(dot(v, h), 0.0);
  float alpha = rough * rough;
  vec3 f0 = mix(vec3(0.04), u_baseColor, metal);
  vec3 f = fresnelSchlick(voh, f0);
  float d = ggxD(noh, alpha);
  float g = smithG1(nol, alpha) * smithG1(nov, alpha);
  vec3 specular = (d * g) * f / (4.0 * nol * nov);
  vec3 diffuse = (1.0 - metal) * (vec3(1.0) - f) * u_baseColor / PI;
  return (diffuse + specular) * nol;
}
void main() {
  // Probe pixels bypass display sRGB conversion. GPU and CPU compare linear F.
  if (u_probe == 1) {
    int k = int(floor(gl_FragCoord.x));
    float metal = k < 2 ? 0.0 : 1.0;
    float voh = (k == 0 || k == 2) ? 1.0 : 0.5;
    vec3 f0 = mix(vec3(0.04), u_baseColor, metal);
    outColor = vec4(fresnelSchlick(voh, f0), 1.0);
    return;
  }
  vec2 xy = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
  int hit = -1;
  vec2 q = vec2(0.0);
  for (int i = 0; i < 3; ++i) {
    vec2 delta = xy - vec2(float(i - 1) * 0.96, 0.0);
    if (dot(delta, delta) < 0.43 * 0.43) {
      hit = i;
      q = delta / 0.43;
    }
  }
  if (hit < 0) {
    outColor = vec4(0.035, 0.052, 0.072, 1.0);
    return;
  }
  // Orthographic view: the front hemisphere of three unit spheres.
  vec3 n = normalize(vec3(q, sqrt(max(0.0, 1.0 - dot(q, q)))));
  vec3 v = vec3(0.0, 0.0, 1.0);
  vec3 l = normalize(vec3(0.40, 0.55, 1.0));
  vec3 linear = materialBRDF(n, v, l, u_roughness[hit], u_metallic[hit]);
  outColor = vec4(linearToSRGB(clamp(linear, 0.0, 1.0)), 1.0);
}
