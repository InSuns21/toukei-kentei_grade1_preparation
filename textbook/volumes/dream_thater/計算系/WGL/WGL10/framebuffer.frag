#version 300 es
precision highp float;
in vec2 v_uv;
uniform int u_pass;
uniform sampler2D u_scene;
out vec4 outColor;
void main() {
  if (u_pass == 0) {
    // First pass: four quadrants with known linear numeric RGB values.
    vec3 sampleColor = vec3(v_uv.x < 0.5 ? 0.2 : 0.8,
                            v_uv.y < 0.5 ? 0.3 : 0.7, 0.4);
    outColor = vec4(sampleColor, 1.0);
  } else {
    vec4 sampled = texture(u_scene, v_uv);
    // Second pass, same source texture in both viewports.
    outColor = u_pass == 2 ?
      vec4(vec3(1.0) - sampled.rgb, 1.0) :
      vec4(sampled.rgb, 1.0);
  }
}
