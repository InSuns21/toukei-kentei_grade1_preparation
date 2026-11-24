#version 300 es
precision highp float;
in vec2 v_uv;
out vec4 outColor;
uniform highp sampler2D u_field;
void main(){
 ivec2 n=textureSize(u_field,0);
 ivec2 k=clamp(ivec2(floor(v_uv*vec2(n))),ivec2(0),n-1);
 float q=texelFetch(u_field,k,0).r;
 outColor=vec4(mix(vec3(.03,.06,.10),vec3(.35,.86,1.),q),1.);
}
