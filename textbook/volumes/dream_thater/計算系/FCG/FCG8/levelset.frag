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
    // Bilinear DISPLAY reconstruction of the actual uploaded R8 cell field.
    // textureSize follows the editable Float64 simulation grid; interpolation is display-only.
    ivec2 size=textureSize(u_raw,0);
    vec2 maxCell=vec2(size-ivec2(1));
    vec2 grid=clamp(xy*vec2(size)-0.5,vec2(0.0),maxCell);
    ivec2 ij=ivec2(floor(grid)),ij1=min(ij+ivec2(1),size-ivec2(1));
    vec2 f=fract(grid);
    float v00=panel==0?texelFetch(u_raw,ij,0).r:texelFetch(u_reinit,ij,0).r;
    float v10=panel==0?texelFetch(u_raw,ivec2(ij1.x,ij.y),0).r:texelFetch(u_reinit,ivec2(ij1.x,ij.y),0).r;
    float v01=panel==0?texelFetch(u_raw,ivec2(ij.x,ij1.y),0).r:texelFetch(u_reinit,ivec2(ij.x,ij1.y),0).r;
    float v11=panel==0?texelFetch(u_raw,ij1,0).r:texelFetch(u_reinit,ij1,0).r;
    phi=(mix(mix(v00,v10,f.x),mix(v01,v11,f.x),f.y)-0.5)*0.5;
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
