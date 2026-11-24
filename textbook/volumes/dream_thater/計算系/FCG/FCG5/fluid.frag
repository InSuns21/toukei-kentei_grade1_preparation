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
    // Dark water and luminous dye; use a monotone luminance ramp so
    // faint transported filaments stay visible even without hue perception.
    float ink=pow(max(q,0.0),0.48);
    vec3 water=mix(vec3(0.025,0.045,0.075),vec3(0.075,0.14,0.20),flow);
    vec3 dyeColor=mix(water,vec3(0.18,0.75,0.91),ink);
    dyeColor=mix(dyeColor,vec3(1.0,0.91,0.61),smoothstep(0.45,1.0,q));
    // The velocity background is subtle; the dye is the primary observation.
    outColor=vec4(dyeColor,1.0);
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
