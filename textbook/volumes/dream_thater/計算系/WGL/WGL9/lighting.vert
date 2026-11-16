#version 300 es
precision highp float;
layout(location = 0) in vec3 a_position;
layout(location = 1) in vec3 a_normal;
uniform mat3 u_model;
uniform mat3 u_normalMatrix;
out vec3 v_normal;
void main() {
  vec3 positionWorld = u_model * a_position;
  // Orthographic camera looks from +z. The flipped depth keeps the near face.
  gl_Position = vec4(positionWorld.x * 0.70,
                     positionWorld.y * 0.85,
                    -positionWorld.z * 0.25, 1.0);
  v_normal = u_normalMatrix * a_normal;
}
