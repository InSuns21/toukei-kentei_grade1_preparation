#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 v_uv;
uniform sampler2D u_dye;
uniform sampler2D u_div;
uniform sampler2D u_speed;
uniform int u_displayMode;
uniform float u_aspect;
out vec4 outColor;
void main(){
  // mode=0: unchanged deterministic 3-panel R8 pixel oracle.
  // mode=1: an aspect-correct large view of the same N×N calculated dye.
  // texel dimensions come from the actual editable JS texture.
  vec2 gridSize=vec2(textureSize(u_dye,0));
  if(u_displayMode==1){
    vec2 xy=(v_uv-0.5)*vec2(u_aspect,1.0)+0.5;
    if(any(lessThan(xy,vec2(0.0)))||any(greaterThan(xy,vec2(1.0)))){
      outColor=vec4(0.013,0.029,0.055,1.0);return;
    }
    float q=texture(u_dye,xy).r,flow=texture(u_speed,xy).r;
    float bloom=pow(max(q,0.0),0.72);
    vec3 dyeColor=vec3(0.015,0.035,0.085)
      +bloom*vec3(0.10,0.42,0.71)
      +pow(bloom,2.2)*vec3(0.62,0.28,0.16);
    // Velocity is encoded as |u|/0.4 and influences only the display.
    dyeColor+=0.055*flow*vec3(0.11,0.24,0.34);
    // Fine lattice lines identify computed cells; interpolation is display-only.
    vec2 g=fract(xy*gridSize),edges=min(g,1.0-g);
    float grid=1.0-smoothstep(0.0,0.025,min(edges.x,edges.y));
    dyeColor*=1.0-0.10*grid;
    outColor=vec4(clamp(dyeColor,0.0,1.0),1.0);
    return;
  }
  int panel=min(2,int(floor(v_uv.x*3.0)));
  vec2 uv=vec2(fract(v_uv.x*3.0),v_uv.y);
  ivec2 ij=ivec2(clamp(floor(uv*gridSize),vec2(0.0),gridSize-1.0));
  if(panel==0){
    float q=texelFetch(u_dye,ij,0).r;
    outColor=vec4(q,0.15,1.0-q,1.0);
  }else if(panel==1){
    float q=texelFetch(u_div,ij,0).r;
    outColor=vec4(q,0.08,0.08,1.0);
  }else{
    float q=texelFetch(u_speed,ij,0).r;
    outColor=vec4(0.12,q,0.8-0.5*q,1.0);
  }
}
