#version 300 es
precision highp float;
precision highp int;
precision highp sampler3D;
in vec2 v_uv;
uniform sampler3D u_density;
uniform float u_extinction;
uniform float u_scattering;
uniform int u_samples;
uniform float u_aspect;
out vec4 outColor;
void main(){
 vec2 p=(v_uv-.5)*vec2(max(2.,u_aspect),max(1.,2./u_aspect))+vec2(1.,.5);
 if(p.x<0.||p.x>=2.||p.y<0.||p.y>=1.){outColor=vec4(.04,.05,.07,1.);return;}
 vec2 uv=vec2(fract(p.x),p.y);
 if(p.x>=1.){
  float q=texture(u_density,vec3(uv,.5)).r;
  outColor=vec4(mix(vec3(.04,.06,.09),vec3(.98,.85,.42),q),1.);return;
 }
 float checker=mod(floor(uv.x*8.)+floor(uv.y*8.),2.);
 vec3 bg=mix(vec3(.055,.08,.12),vec3(.22,.27,.34),checker);
 vec3 source=u_scattering*vec3(.95,.97,1.);
 float T=1.;vec3 C=vec3(0.);
 float ds=1./float(u_samples);
 for(int i=0;i<96;i++){
  if(i>=u_samples)break;
  float z=(float(i)+.5)*ds;
  float q=texture(u_density,vec3(uv,z)).r;
  float tr=exp(-u_extinction*q*ds);
  C+=T*(1.-tr)*source;
  T*=tr;
 }
 outColor=vec4(C+T*bg,1.);
}
