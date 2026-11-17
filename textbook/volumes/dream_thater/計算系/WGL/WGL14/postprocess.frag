#version 300 es
precision highp float;
precision highp int;
in vec2 v_uv;
uniform sampler2D u_source;
uniform int u_pass;          // 0 scene, 1 convolution, 2 display
uniform int u_filterMode;    // 0 mean blur, 1 positive Laplacian
uniform int u_applyTone;     // only on the processed panel
uniform float u_exposure;
out vec4 outColor;

float sourceAt(ivec2 p) {
  ivec2 q=clamp(p,ivec2(0),ivec2(7));
  return texelFetch(u_source,q,0).r;
}
void main() {
  if(u_pass==0) {
    // Two exactly representable RGBA8 impulses, lower-left (0,0) and (3,3).
    ivec2 p=ivec2(floor(gl_FragCoord.xy));
    float value=all(equal(p,ivec2(0,0))) ? 90.0/255.0 :
      (all(equal(p,ivec2(3,3))) ? 1.0 : 0.0);
    outColor=vec4(vec3(value),1.0);
    return;
  }
  if(u_pass==1) {
    ivec2 p=ivec2(floor(gl_FragCoord.xy));
    float v=0.0;
    if(u_filterMode==0) {
      for(int dy=-1;dy<=1;dy++)
        for(int dx=-1;dx<=1;dx++)
          v+=sourceAt(p+ivec2(dx,dy))/9.0;
    } else {
      // Positive part of discrete four-neighbour Laplacian.
      v=max(0.0,4.0*sourceAt(p)-sourceAt(p+ivec2(-1,0))
        -sourceAt(p+ivec2(1,0))-sourceAt(p+ivec2(0,-1))
        -sourceAt(p+ivec2(0,1)));
    }
    outColor=vec4(vec3(clamp(v,0.0,1.0)),1.0);
    return;
  }
  vec3 rgb=texture(u_source,v_uv).rgb;
  if(u_applyTone==1) {
    vec3 light=max(vec3(0.0),u_exposure*rgb);
    rgb=light/(vec3(1.0)+light);
  }
  outColor=vec4(rgb,1.0);
}
