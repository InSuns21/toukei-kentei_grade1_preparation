#version 300 es
precision highp float;
in vec3 v_normal;
uniform vec3 u_color;
uniform int u_lit;
out vec4 outColor;
void main(){
  vec3 light=normalize(vec3(-0.6,-0.8,0.0));
  float factor=u_lit==1?0.28+0.72*max(dot(normalize(v_normal),light),0.0):1.0;
  outColor=vec4(u_color*factor,1.0);
}
