#version 300 es
layout(location=0) in vec3 p;
layout(location=1) in vec2 slope;
uniform int u_view;
out float height;
out vec2 gradient;
void main(){
 height=p.z;gradient=slope;
 if(u_view==0)gl_Position=vec4(-0.53+0.40*p.x,0.65*p.y,0.0,1.0);
 else{
  float z=0.26*(p.x+p.y)-0.035*p.z;
  if(u_view==2)z-=0.003;
  gl_Position=vec4(0.50+0.23*(p.x-p.y),-0.06+0.28*(p.x+p.y)+0.30*p.z,z,1.0);
 }
}
