#version 300 es
precision highp float;
precision highp int;
flat in int v_id;
uniform int u_idMode;
uniform int u_selected;
out vec4 outColor;
void main() {
  if(u_idMode == 1) {
    // Exact ID encoded into the red byte of a non-sRGB RGBA8 attachment.
    outColor = vec4(float(v_id)/255.0, 0.0, 0.0, 1.0);
    return;
  }
  vec3 rgb = v_id == 1 ? vec3(230.0,70.0,35.0)/255.0 :
                             vec3(30.0,150.0,220.0)/255.0;
  if(u_selected == v_id) {
    rgb = v_id == 1 ? vec3(255.0,210.0,85.0)/255.0 :
                      vec3(85.0,255.0,200.0)/255.0;
  }
  outColor = vec4(rgb, 1.0);
}
