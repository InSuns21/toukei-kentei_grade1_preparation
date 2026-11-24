#version 300 es
layout(location=0) in vec3 a_position;
layout(location=1) in vec3 a_normal;
uniform int u_view;
uniform float u_aspect;
uniform float u_height;
out vec3 v_normal;
void main(){
  vec3 p=a_position-vec3(0.5,0.5,u_height*0.5);
  vec2 clip=u_view==0?1.8*p.xy:3.4*vec2(p.x,0.6*p.y+0.8*p.z);
  clip*=vec2(min(1.0,1.0/u_aspect),min(1.0,u_aspect));
  float depth=u_view==0?0.0:0.8*p.y-0.6*p.z;
  gl_Position=vec4(clip,depth,1.0);
  gl_PointSize=5.0;
  v_normal=a_normal;
}
