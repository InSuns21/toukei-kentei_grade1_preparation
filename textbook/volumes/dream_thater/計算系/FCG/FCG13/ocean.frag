#version 300 es
precision highp float;
in float height;
in vec2 gradient;
uniform int u_view;
out vec4 outColor;
void main(){
 if(u_view==0){
  float a=clamp(0.5+0.5*height,0.0,1.0);
  outColor=vec4(mix(vec3(0.06,0.20,0.38),vec3(0.66,0.87,0.93),a),1.0);
 }else if(u_view==2){
  outColor=vec4(0.09,0.19,0.26,1.0);
 }else{
  vec3 n=normalize(vec3(-gradient,1.0));
  vec3 v=normalize(vec3(-0.8,-0.8,0.75));
  vec3 r=reflect(-v,n);
  vec3 sky=mix(vec3(0.80,0.88,0.91),vec3(0.11,0.36,0.65),clamp(r.z,0.0,1.0));
  float sun=pow(max(dot(r,normalize(vec3(-0.25,-0.35,0.9))),0.0),60.0);
  float f=0.02+0.98*pow(1.0-max(dot(n,v),0.0),5.0);
  outColor=vec4(clamp(mix(vec3(0.03,0.31,0.39),sky,f)+0.7*sun,0.0,1.0),1.0);
 }
}
