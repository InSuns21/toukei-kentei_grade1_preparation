#version 300 es
precision highp float;
precision highp int;
in vec3 v_world;
in vec3 v_normal;
uniform mat4 u_lightMatrix;
uniform sampler2D u_shadow;
uniform float u_bias;
uniform int u_pass;
uniform bool u_useShadow;
uniform vec3 u_lightDirection;
out vec4 outColor;
// Shadow coordinate xyz: light clip -> [0,1]. Depth is compared in the
// SAME light projection in which the first pass wrote gl_FragCoord.z.
float visibility(vec3 world) {
  vec4 clip = u_lightMatrix * vec4(world, 1.0);
  vec3 q = 0.5 * (clip.xyz / clip.w + vec3(1.0));
  if (q.x < 0.0 || q.x > 1.0 || q.y < 0.0 || q.y > 1.0 ||
      q.z < 0.0 || q.z > 1.0) return 1.0;
  float nearestDepth = texture(u_shadow, q.xy).r;
  return q.z - u_bias <= nearestDepth ? 1.0 : 0.0;
}
float srgb(float c) {
  return c <= 0.0031308 ? 12.92*c : 1.055*pow(c, 1.0/2.4)-0.055;
}
void main() {
  if (u_pass == 0) {
    // This FBO has DEPTH_ATTACHMENT only; fragment colour is discarded.
    outColor = vec4(0.0);
    return;
  }
  if (u_pass == 2) {
    // Independent fixed receivers for GPU/CPU comparison. The light ray
    // direction from a receiver is (0.5,0.25,1).
    vec3 p = gl_FragCoord.x < 1.0 ? vec3(-0.75,-0.25,0.0) :
             gl_FragCoord.x < 2.0 ? vec3( 1.25, 1.10,0.0) :
             gl_FragCoord.x < 3.0 ? vec3( 0.00, 0.00,1.1) :
                                    vec3(-1.50, 1.50,0.0);
    float v = visibility(p);
    outColor = vec4(vec3(v), 1.0);
    return;
  }
  vec3 N = normalize(v_normal);
  vec3 L = normalize(u_lightDirection);
  float diffuse = max(dot(N,L),0.0);
  float vis = u_useShadow ? visibility(v_world) : 1.0;
  vec3 albedo = v_world.z > 0.001 ? vec3(0.82,0.25,0.15) :
                                       vec3(0.38,0.53,0.64);
  vec3 linear = clamp(albedo * (0.22 + 0.76*diffuse*vis), 0.0, 1.0);
  outColor = vec4(srgb(linear.r),srgb(linear.g),srgb(linear.b),1.0);
}
