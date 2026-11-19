#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 v_uv;
uniform vec2 u_pic[16];
uniform vec2 u_flip[16];
uniform sampler2D u_speed;
out vec4 outColor;
void main(){
  int panel=min(2,int(floor(v_uv.x*3.0)));
  vec2 xy=vec2(fract(v_uv.x*3.0),v_uv.y);
  if(panel==2){
    ivec2 ij=clamp(ivec2(floor(xy*8.0)),ivec2(0),ivec2(7));
    float v=texelFetch(u_speed,ij,0).r;
    outColor=vec4(v,0.2,1.0-v,1.0);
    return;
  }
  bool dotHit=false;
  for(int i=0;i<16;i++){
    vec2 p=panel==0?u_pic[i]:u_flip[i];
    if(length(xy-p)<0.029)dotHit=true;
  }
  vec3 rgb=dotHit?(panel==0?vec3(0.10,0.80,0.94):vec3(0.96,0.57,0.15))
    :vec3(0.06,0.08,0.12);
  outColor=vec4(rgb,1.0);
}
