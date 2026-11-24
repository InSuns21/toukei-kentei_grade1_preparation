#version 300 es
precision highp float;
in vec2 uv;
out vec4 outColor;
uniform float u_angle,u_index,u_amplitude,u_phase,u_absorption,u_side,u_mode;
const float tau=6.283185307179586;
float fresnel(float c,float d,float n1,float n2,float k){
 if(n1==n2)return 0.0;
 if(k<=0.0||c<=0.0)return 1.0;
 float rs=(n1*c-n2*d)/(n1*c+n2*d);
 float rp=(n2*c-n1*d)/(n2*c+n1*d);
 return 0.5*(rs*rs+rp*rp);
}
vec3 sky(vec3 D){
 if(D.z<=0.0)return vec3(0.025,0.035,0.05);
 float cloud=0.5+0.5*cos(12.0*D.x+5.0*D.y);
 return mix(vec3(0.18,0.42,0.78),vec3(0.90,0.93,0.98),cloud*cloud);
}
vec3 floorColor(vec3 P,vec3 D){
 if(D.z>=-0.0001)return vec3(0.025,0.035,0.05);
 float ell=(P.z+0.5)/(-D.z);
 vec2 q=P.xy+ell*D.xy;
 float tiles=0.5+0.5*cos(tau*5.0*q.x)*cos(tau*5.0*q.y);
 vec3 color=mix(vec3(0.12,0.27,0.36),vec3(0.85,0.82,0.62),tiles);
 return color*exp(-u_absorption*ell*vec3(1.6,0.65,0.18));
}
void main(){
 float x=uv.x,y=uv.y;
 float a=tau*x-u_phase,b=tau*y;
 float h=u_amplitude*sin(a)*cos(b);
 vec3 P=vec3(x,y,h);
 vec3 N=u_side*normalize(vec3(-tau*u_amplitude*cos(a)*cos(b),tau*u_amplitude*sin(a)*sin(b),1.0));
 vec3 I=vec3(sin(u_angle),0.0,-u_side*cos(u_angle));
 float c=-dot(I,N);
 if(c<=0.0){outColor=vec4(0.025,0.035,0.05,1.0);return;}
 c=clamp(c,0.0,1.0);
 float n1=u_side>0.0?1.0:u_index,n2=u_side>0.0?u_index:1.0;
 float eta=n1/n2,k=1.0-eta*eta*(1.0-c*c);
 vec3 R=I+2.0*c*N;
 vec3 CR=u_side>0.0?sky(R):floorColor(P,R);
 vec3 CT=vec3(0.0);
 if(k>=0.0){
  vec3 T=eta*(I+c*N)-sqrt(k)*N;
  CT=u_side>0.0?floorColor(P,T):sky(T);
 }
 float F=fresnel(c,sqrt(max(k,0.0)),n1,n2,k);
 vec3 C=u_mode==1.0?CR:(u_mode==2.0?CT:mix(CT,CR,F));
 outColor=vec4(clamp(C,0.0,1.0),1.0);
}
