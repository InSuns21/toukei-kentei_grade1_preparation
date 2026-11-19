#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 v_uv;
uniform sampler2D u_raw;
uniform sampler2D u_reinit;
uniform vec2 u_particles[64];
uniform float u_time;
uniform float u_shear;
out vec4 outColor;
void main(){
  int panel=min(2,int(floor(v_uv.x*3.0)));
  vec2 xy=vec2(fract(v_uv.x*3.0),v_uv.y);
  float phi;
  if(panel<2){
    ivec2 ij=clamp(ivec2(floor(xy*48.0)),ivec2(0),ivec2(47));
    float encoded=panel==0?texelFetch(u_raw,ij,0).r:texelFetch(u_reinit,ij,0).r;
    phi=(encoded-0.5)*0.5;
  } else {
    vec2 original=vec2(xy.x-u_shear*u_time*(xy.y-0.5),xy.y);
    phi=length(original-vec2(0.5))-0.18;
  }
  vec3 rgb=phi < -0.014?vec3(0.08,0.55,0.79):
    (phi > 0.014?vec3(0.06,0.10,0.14):vec3(0.98,0.74,0.20));
  if(panel==2){
    for(int k=0;k<64;k++){
      if(distance(xy,u_particles[k])<0.010)rgb=vec3(0.96,0.50,0.14);
    }
  }
  outColor=vec4(rgb,1.0);
}
