#version 300 es
precision highp float;
in vec2 v_uv;
uniform int u_pass;       // 0: scene, 1: FBO copy, 2: inverse, 3: grayscale
uniform sampler2D u_scene; // RGBA8 color attachment from pass A
out vec4 outColor;

// A scene with recognizable large shapes and a fine pattern.
// Four small swatches at UV=(.25/.75, .25/.75) retain the numeric
// RGBA8 reference used in the independent CPU/GPU exercise.
vec3 drawScene(vec2 uv) {
  vec3 sky = mix(vec3(0.08, 0.15, 0.31), vec3(0.97, 0.48, 0.32),
                 smoothstep(0.05, 0.98, uv.y));
  float sun = length((uv - vec2(0.72, 0.75)) * vec2(1.0, 0.8));
  sky = mix(sky, vec3(1.0, 0.85, 0.39),
            1.0 - smoothstep(0.135, 0.145, sun));
  float distant = 0.43 + 0.085 * sin(uv.x * 8.0) + 0.024 * cos(uv.x * 21.0);
  float nearHill = 0.27 + 0.06 * sin(uv.x * 13.0 + 0.4);
  vec3 color = mix(sky, vec3(0.16, 0.23, 0.36), 1.0 - smoothstep(distant - 0.01, distant + 0.01, uv.y));
  color = mix(color, vec3(0.025, 0.16, 0.21), 1.0 - smoothstep(nearHill - 0.008, nearHill + 0.008, uv.y));
  // A tiled foreground makes texture downsampling visibly measurable.
  if (uv.y < 0.20) {
    vec2 tile = floor(uv * vec2(34.0, 52.0));
    float alternating = mod(tile.x + tile.y, 2.0);
    color = mix(vec3(0.06, 0.22, 0.28), vec3(0.26, 0.54, 0.55), alternating);
  }
  // Thin vertical marks make NEAREST upscaling easy to inspect.
  float line = 1.0 - smoothstep(0.0, 0.035, abs(fract(uv.x * 32.0) - 0.5));
  color = mix(color, vec3(0.97, 0.93, 0.64), 0.28 * line * step(0.50, uv.y));
  // Calibration swatches have the four exact values explained in the text.
  vec2 anchor = (floor(uv * 2.0) + 0.5) / 2.0;
  float squareDistance = max(abs(uv.x - anchor.x), abs(uv.y - anchor.y));
  if (squareDistance < 0.051) color = vec3(0.025, 0.035, 0.05);
  if (squareDistance < 0.045) {
    color = vec3(uv.x < 0.5 ? 0.2 : 0.8,
                 uv.y < 0.5 ? 0.3 : 0.7, 0.4);
  }
  return clamp(color, 0.0, 1.0);
}
void main() {
  if (u_pass == 0) {
    outColor = vec4(drawScene(v_uv), 1.0);
    return;
  }
  vec3 saved = texture(u_scene, v_uv).rgb;
  if (u_pass == 2) saved = vec3(1.0) - saved;
  if (u_pass == 3) {
    // A simple numeric grayscale: no additional sRGB transfer.
    float gray = dot(saved, vec3(0.2126, 0.7152, 0.0722));
    saved = vec3(gray);
  }
  outColor = vec4(saved, 1.0);
}
