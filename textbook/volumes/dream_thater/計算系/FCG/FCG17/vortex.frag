#version 300 es
precision highp float;
in vec2 v_uv;
uniform sampler2D u_flow;
uniform sampler2D u_chart;
uniform int u_mode;
out vec4 outColor;
void main(){
 vec3 col=vec3(.04,.05,.07);
 if(v_uv.y>=.2){
  vec3 q=texture(u_flow,vec2(v_uv.x,(v_uv.y-.2)/.8)).rgb;
  if(u_mode==0)col=mix(vec3(.04,.06,.09),vec3(.25,.88,1.),q.r);
  else if(u_mode==1)col=mix(vec3(.12),q.g<.5?vec3(.25,.62,1.):vec3(1.,.54,.19),abs(2.*q.g-1.));
  else col=mix(vec3(.04,.06,.09),vec3(1.,.95,.7),q.b);
  if(abs(v_uv.x-.5)<.002)col=vec3(.8);
 }else{
  vec4 e=texture(u_chart,vec2(v_uv.x,.5));float y=v_uv.y/.2;
  if(abs(y-.5)<.006)col=vec3(.25);
  if(e.a>.5){
   if(abs(y-e.r)<.012)col=vec3(.96);
   if(abs(y-e.g)<.022&&mod(floor(v_uv.x*160.),2.)==0.)col=vec3(1.,.58,.15);
  }
 }
 outColor=vec4(col,1.);
}
