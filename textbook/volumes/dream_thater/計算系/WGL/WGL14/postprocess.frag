#version 300 es
precision highp float;
precision highp int;
in vec2 v_uv;
uniform sampler2D u_source;     // A: unfiltered scene
uniform sampler2D u_processed;  // B: filtered RGBA8 image
uniform int u_pass;             // 0 scene A, 1 filtered B, 2 comparison canvas
uniform int u_sceneMode;        // 0: 8x8 impulse test, 1: illustrated 128x128 scene
uniform int u_size;             // actual FBO texture width / height in texels
uniform int u_filterMode;       // 0: box blur, 1: positive four-neighbour Laplacian
uniform int u_blurRadius;       // radius 1 -> 3x3, radius 2 -> 5x5, etc.
uniform int u_toneFirst;        // 0: filter then tone, 1: tone then filter
uniform float u_exposure;       // nonnegative, dimensionless
uniform float u_compare;        // 0..1: position of before/after wipe
out vec4 outColor;

vec3 toneMap(vec3 rgb) {
  vec3 x = max(vec3(0.0), u_exposure * rgb);
  return x / (vec3(1.0) + x);
}

// A small high-contrast illustration lets a real neighbourhood filter be seen.
// Values are in display RGB here; this is not a linear-light photographic pipeline.
vec3 illustratedScene(ivec2 p) {
  vec2 uv = (vec2(p) + 0.5) / float(u_size);
  vec3 color = uv.y > 0.42 ? vec3(30.0, 91.0, 148.0) : vec3(52.0, 124.0, 74.0);
  if (uv.y < 0.52 - 0.72 * abs(uv.x - 0.22))
    color = vec3(87.0, 110.0, 125.0); // distant hill
  if (distance(uv, vec2(0.81, 0.78)) < 0.105)
    color = vec3(255.0, 211.0, 77.0); // sun
  if (uv.y < 0.26 && abs(uv.x - 0.48) < 0.045 + (0.26 - uv.y) * 0.45)
    color = vec3(204.0, 178.0, 126.0); // path
  if (uv.x > 0.30 && uv.x < 0.64 && uv.y > 0.26 && uv.y < 0.65)
    color = vec3(235.0, 184.0, 112.0); // house
  if (uv.x > 0.26 && uv.x < 0.68 &&
      uv.y >= 0.65 && uv.y < 0.83 - 0.85 * abs(uv.x - 0.47))
    color = vec3(161.0, 65.0, 54.0); // roof
  if (uv.y > 0.45 && uv.y < 0.57 &&
      ((uv.x > 0.35 && uv.x < 0.42) || (uv.x > 0.53 && uv.x < 0.60)))
    color = vec3(33.0, 75.0, 107.0); // windows
  if (uv.x > 0.45 && uv.x < 0.53 && uv.y > 0.26 && uv.y < 0.42)
    color = vec3(92.0, 64.0, 55.0); // door
  if (uv.x > 0.77 && uv.x < 0.805 && uv.y > 0.17 && uv.y < 0.49)
    color = vec3(101.0, 63.0, 42.0); // tree trunk
  if (distance(uv, vec2(0.79, 0.54)) < 0.125)
    color = vec3(27.0, 95.0, 59.0); // crown
  return color / 255.0;
}
vec3 sceneAt(ivec2 p) {
  if (u_sceneMode == 0) {
    float byteValue = all(equal(p, ivec2(0, 0))) ? 90.0 :
      (all(equal(p, ivec2(3, 3))) ? 255.0 : 0.0);
    return vec3(byteValue / 255.0);
  }
  return illustratedScene(p);
}
vec3 sourceAt(ivec2 p) {
  ivec2 q = clamp(p, ivec2(0), ivec2(u_size - 1));
  vec3 rgb = texelFetch(u_source, q, 0).rgb;
  return u_toneFirst == 1 ? toneMap(rgb) : rgb;
}
void main() {
  if (u_pass == 0) {
    ivec2 p = ivec2(floor(gl_FragCoord.xy));
    outColor = vec4(sceneAt(p), 1.0);
    return;
  }
  if (u_pass == 1) {
    ivec2 p = ivec2(floor(gl_FragCoord.xy));
    vec3 rgb = vec3(0.0);
    if (u_filterMode == 0) {
      float count = 0.0;
      for (int dy = -4; dy <= 4; ++dy) {
        for (int dx = -4; dx <= 4; ++dx) {
          if (abs(dx) > u_blurRadius || abs(dy) > u_blurRadius) continue;
          rgb += sourceAt(p + ivec2(dx, dy));
          count += 1.0;
        }
      }
      rgb /= count;
    } else {
      // Positive Laplacian, clipped after subtraction. For color, per-channel.
      rgb = max(vec3(0.0), 4.0 * sourceAt(p)
        - sourceAt(p + ivec2(-1, 0)) - sourceAt(p + ivec2(1, 0))
        - sourceAt(p + ivec2(0, -1)) - sourceAt(p + ivec2(0, 1)));
    }
    outColor = vec4(clamp(rgb, 0.0, 1.0), 1.0);
    return;
  }
  // One shared UV coordinate: wipe reveals the same point before and after.
  vec3 original = texture(u_source, v_uv).rgb;
  vec3 processed = texture(u_processed, v_uv).rgb;
  if (u_toneFirst == 0) processed = toneMap(processed);
  vec3 result = v_uv.x < u_compare ? original : processed;
  // The divider is visual only; no oracle probe is placed on this line.
  if (abs(v_uv.x - u_compare) < 0.0015)
    result = vec3(1.0);
  outColor = vec4(result, 1.0);
}
