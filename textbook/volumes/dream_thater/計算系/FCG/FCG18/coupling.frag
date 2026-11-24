#version 300 es
precision highp float;
in vec2 v_uv;
out vec4 outColor;
uniform vec4 u_particles[48];
uniform vec4 u_bodies[2];
uniform vec4 u_contact[2];
float seg(vec2 p,vec2 a,vec2 b){
 vec2 v=b-a;return length(p-a-v*clamp(dot(p-a,v)/max(dot(v,v),1e-10),0.,1.));
}
bool arrow(vec2 p,vec2 a,vec2 v){
 float d=length(v);if(d<.005)return false;
 vec2 n=v/d,t=vec2(-n.y,n.x),b=a+v;
 return min(seg(p,a,b),min(seg(p,b,b-.022*n+.014*t),seg(p,b,b-.022*n-.014*t)))<.0035;
}
void main(){
 int side=int(v_uv.x>=.5);
 vec2 p=vec2(v_uv.x*2.-float(side),v_uv.y);
 vec3 col=vec3(.035,.075,.12);
 if(min(min(p.x,p.y),min(1.-p.x,1.-p.y))<.006)col=vec3(.55,.66,.76);
 for(int i=0;i<24;i++){
  vec4 q=u_particles[side*24+i];
  if(seg(p,q.xy,q.xy-.055*q.zw)<.0035)col=vec3(.25,.63,.86);
  if(length(p-q.xy)<.009)col=vec3(.33,.85,1.);
 }
 vec4 b=u_bodies[side];float d=length(p-b.xy);
 if(d<.12)col=vec3(.91,.46,.12);
 if(d<.12&&d>.112)col=vec3(1.,.85,.48);
 if(d<.12&&side==0&&abs(p.x-b.x)>.035&&abs(p.y-b.y)>.035&&mod((p.x+p.y)*50.,1.)<.16)col=vec3(.42,.24,.12);
 if(arrow(p,b.xy,b.zw*.20))col=vec3(.12,.10,.06);
 vec4 c=u_contact[side];
 if(length(c.zw)>1e-8){
  vec2 n=normalize(c.zw),v=n*clamp(length(c.zw)*5.,.04,.16);
  if(arrow(p,c.xy,v))col=vec3(1.);
  if(arrow(p,c.xy,-v))col=vec3(1.,.66,.20);
 }
 outColor=vec4(col,1.);
}
