#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 v_uv;
uniform sampler2D u_pressure;
uniform sampler2D u_div;
uniform sampler2D u_speed;
uniform sampler2D u_before;
uniform sampler2D u_after;
uniform int u_observe;
uniform int u_stacked;
uniform float u_divScale;
out vec4 outColor;
float segment(vec2 q,vec2 a,vec2 b){
  vec2 d=b-a;
  return length(q-a-d*clamp(dot(q-a,d)/max(dot(d,d),1e-8),0.0,1.0));
}
vec3 signedColor(float value){
  vec3 neutral=vec3(0.10,0.15,0.21);
  return mix(neutral,value<0.0?vec3(0.15,0.53,0.95):vec3(0.97,0.37,0.15),clamp(abs(value),0.0,1.0));
}
vec3 flowArrow(vec3 rgb,vec2 q,vec2 velocity){
  float speed=length(velocity);
  if(speed<0.004)return rgb;
  vec2 dir=velocity/speed,side=vec2(-dir.y,dir.x);
  float len=min(0.37,0.08+0.70*speed);
  vec2 tip=dir*len,tail=-dir*len;
  float d=segment(q,tail,tip);
  d=min(d,segment(q,tip,tip-dir*0.13+side*0.10));
  d=min(d,segment(q,tip,tip-dir*0.13-side*0.10));
  return mix(rgb,vec3(0.98,0.98,0.94),1.0-smoothstep(0.025,0.055,d));
}
void main(){
  if(u_observe!=0){
    float coord=u_stacked!=0?3.0*(1.0-v_uv.y):3.0*v_uv.x;
    int part=clamp(int(floor(coord)),0,2);
    vec2 uv=u_stacked!=0?vec2(v_uv.x,1.0-fract(coord)):vec2(fract(coord),v_uv.y);
    ivec2 size=textureSize(u_after,0);
    vec2 grid=uv*vec2(size);
    ivec2 index=clamp(ivec2(floor(grid)),ivec2(0),size-1);
    vec4 field=part==0?texelFetch(u_before,index,0):texelFetch(u_after,index,0);
    vec3 rgb=part==1?signedColor(field.a):signedColor(field.b/u_divScale);
    vec2 q=fract(grid)-0.5;
    float edge=max(abs(q.x),abs(q.y));
    rgb=mix(rgb,vec3(0.55,0.62,0.69),0.16*smoothstep(0.47,0.50,edge));
    if(part!=1)rgb=flowArrow(rgb,q,field.rg);
    if(min(min(uv.x,1.0-uv.x),min(uv.y,1.0-uv.y))<0.008)rgb=vec3(0.67,0.72,0.77);
    outColor=vec4(rgb,1.0);
    return;
  }
  int panel=min(2,int(floor(v_uv.x*3.0)));
  vec2 localUv=vec2(fract(v_uv.x*3.0),v_uv.y);
  ivec2 cell=ivec2(clamp(floor(localUv*8.0),vec2(0.0),vec2(7.0)));
  if(panel==0){
    float q=texelFetch(u_pressure,cell,0).r;
    outColor=vec4(q,0.15,1.0-q,1.0);
  }else if(panel==1){
    float q=texelFetch(u_div,cell,0).r;
    outColor=vec4(q,0.08,0.08,1.0);
  }else{
    float q=texelFetch(u_speed,cell,0).r;
    outColor=vec4(0.12,q,0.8-0.5*q,1.0);
  }
}
