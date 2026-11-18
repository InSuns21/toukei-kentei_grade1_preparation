#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 v_uv;
uniform sampler2D u_pressure;
uniform sampler2D u_div;
uniform sampler2D u_speed;
out vec4 outColor;
void main(){
  int panel=min(2,int(floor(v_uv.x*3.0)));
  vec2 localUv=vec2(fract(v_uv.x*3.0),v_uv.y);
  ivec2 cell=ivec2(clamp(floor(localUv*8.0),vec2(0.0),vec2(7.0)));
  if(panel==0){
    float q=texelFetch(u_pressure,cell,0).r;
    outColor=vec4(q,0.15,1.0-q,1.0);
  }else if(panel==1){
    float q=texelFetch(u_div,cell,0).r;
    outColor=vec4(q,0.08,0.08,1.0);
  }else{
    float q=texelFetch(u_speed,cell,0).r;
    outColor=vec4(0.12,q,0.8-0.5*q,1.0);
  }
}
