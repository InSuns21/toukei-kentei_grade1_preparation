#version 300 es
precision highp float;
uniform sampler2D u_field;
in vec2 uv;
out vec4 color;
void main(){
 vec2 local=fract(uv*2.);
 bool upper=uv.y>=.5,right=uv.x>=.5;
 vec4 s=texture(u_field,local);
 float h=clamp(s.g/2.,0.,1.),v=clamp(length(s.ba)/3.,0.,1.);
 vec3 dry=mix(vec3(.22,.16,.10),vec3(.83,.69,.43),clamp(s.r/3.25,0.,1.));
 vec3 water=mix(vec3(.08,.30,.48),vec3(.35,.85,1.),h);
 vec3 c;
 if(upper&&!right)c=s.g>.001?water:dry;
 else if(upper)c=mix(vec3(.04,.08,.12),vec3(.35,.85,1.),h);
 else if(!right)c=mix(vec3(.05,.08,.12),vec3(1.,.65,.16),v);
 else{
  // North-south coordinate fixed at the central row; elevation in metres.
  vec4 section=texture(u_field,vec2(local.x,.5));
  float height=local.y*4.,eta=section.r+section.g;
  c=vec3(.08,.12,.16);
  if(abs(height-round(height))<.015)c=vec3(.25,.29,.33);
  if(height<=section.r)c=vec3(.48,.33,.18);
  else if(height<=eta)c=vec3(.13,.54,.78);
  if(section.g>.001&&abs(height-eta)<.025)c=vec3(.96);
 }
 if(local.x<.003||local.x>.997||local.y<.003||local.y>.997)c=vec3(.85);
 color=vec4(c,1.);
}
