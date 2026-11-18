#version 300 es
precision highp float;
precision highp sampler2D;
uniform sampler2D u_state;
uniform int u_stage;
uniform float u_rate;
uniform vec2 u_targetSize;
out vec4 outColor;
float cellAt(ivec2 p){
  return texelFetch(u_state,clamp(p,ivec2(0),ivec2(3)),0).r;
}
void main(){
  ivec2 p=u_stage==0 ? ivec2(gl_FragCoord.xy) :
    ivec2(clamp(floor(gl_FragCoord.xy*vec2(4.0)/u_targetSize),
                vec2(0.0),vec2(3.0)));
  float center=cellAt(p);
  if(u_stage==0){
    float neighbors=cellAt(p+ivec2(1,0))+cellAt(p+ivec2(-1,0))
                   +cellAt(p+ivec2(0,1))+cellAt(p+ivec2(0,-1));
    outColor=vec4(center+u_rate*(neighbors-4.0*center),0.0,0.0,1.0);
  }else{
    float v=clamp(center,0.0,1.0);
    outColor=vec4(v,0.2,1.0-v,1.0);
  }
}
