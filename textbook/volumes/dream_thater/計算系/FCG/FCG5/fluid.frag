#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 v_uv;
uniform sampler2D u_dye;
uniform sampler2D u_div;
uniform sampler2D u_speed;
out vec4 outColor;
void main(){
  int panel=min(2,int(floor(v_uv.x*3.0)));
  vec2 uv=vec2(fract(v_uv.x*3.0),v_uv.y);
  ivec2 ij=ivec2(clamp(floor(uv*12.0),vec2(0.0),vec2(11.0)));
  if(panel==0){
    float q=texelFetch(u_dye,ij,0).r;
    outColor=vec4(q,0.15,1.0-q,1.0);
  }else if(panel==1){
    float q=texelFetch(u_div,ij,0).r;
    outColor=vec4(q,0.08,0.08,1.0);
  }else{
    float q=texelFetch(u_speed,ij,0).r;
    outColor=vec4(0.12,q,0.8-0.5*q,1.0);
  }
}
