#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 v_uv;
uniform sampler2D u_pic;
uniform sampler2D u_flip;
uniform sampler2D u_speed;
out vec4 outColor;
ivec2 cell(vec2 uv,ivec2 size){return clamp(ivec2(floor(uv*vec2(size))),ivec2(0),size-1);}
void main(){
  int panel=min(2,int(floor(v_uv.x*3.0)));
  vec2 xy=vec2(fract(v_uv.x*3.0),v_uv.y);
  if(panel==2){
    float v=texelFetch(u_speed,cell(xy,textureSize(u_speed,0)),0).r;
    outColor=vec4(v,0.2,1.0-v,1.0);
    return;
  }
  int dye=panel==0
    ?int(round(255.0*texelFetch(u_pic,cell(xy,textureSize(u_pic,0)),0).r))
    :int(round(255.0*texelFetch(u_flip,cell(xy,textureSize(u_flip,0)),0).r));
  // Same passive tracer palette in both simulations. Dark cells contain no particle marks.
  vec3 rgb=vec3(15,20,31)/255.0;
  if(dye==1)rgb=vec3(80,148,255)/255.0;
  if(dye==2)rgb=vec3(38,222,193)/255.0;
  if(dye==3)rgb=vec3(255,220,104)/255.0;
  if(dye==4)rgb=vec3(248,125,81)/255.0;
  outColor=vec4(rgb,1.0);
}
