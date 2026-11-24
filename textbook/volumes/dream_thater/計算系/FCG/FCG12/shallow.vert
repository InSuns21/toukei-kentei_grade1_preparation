#version 300 es
layout(location=0) in vec3 p;
layout(location=1) in vec3 c;
uniform int u_mode;
out vec3 color;
void main(){
 color=c;
 if(u_mode==0)gl_Position=vec4(-0.55+0.39*p.x,0.37+0.51*p.y,0.0,1.0);
 else if(u_mode==1)gl_Position=vec4(-0.55+0.39*p.x,-0.88+0.54*p.y,0.0,1.0);
 else{
  // Orthographic projection of x,y,z; vertical display magnified for visibility.
  gl_Position=vec4(0.50+0.22*(p.x-p.y),-0.28+0.19*(p.x+p.y)+0.60*p.z,0.22*(p.x+p.y)-0.08*p.z,1.0);
 }
}
