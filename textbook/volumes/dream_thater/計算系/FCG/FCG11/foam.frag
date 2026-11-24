#version 300 es
precision highp float;
in vec2 uv;
out vec4 outColor;
uniform vec4 u_particles[36];
uniform int u_count;
void main(){
 vec2 q=vec2(4.0*uv.x,3.0*uv.y-1.0);
 float h=0.25*cos(3.141592653589793*(q.x-2.0));
 vec3 color=q.y<h?vec3(13,90,127):vec3(24,39,60);
 if(abs(q.y-h)<0.012)color=vec3(90,200,205);
 for(int i=0;i<36;i++){
  if(i>=u_count)break;
  vec4 s=u_particles[i];
  vec2 d=(q-s.xy)/s.z;
  float d2=dot(d,d);
  if(s.w==1.0&&d2<=1.0)color=vec3(247,249,252);
  if(s.w==2.0&&dot(d/vec2(1.6,0.5),d/vec2(1.6,0.5))<=1.0)color=vec3(247,218,146);
  if(s.w==3.0&&d2>=0.36&&d2<=1.0)color=vec3(164,230,245);
 }
 outColor=vec4(color/255.0,1.0);
}
