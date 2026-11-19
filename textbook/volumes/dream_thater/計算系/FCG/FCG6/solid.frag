#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 v_uv;
uniform sampler2D u_dye,u_div,u_speed,u_solid;
out vec4 outColor;
float maskAt(ivec2 a){
  ivec2 c=clamp(a,ivec2(0),ivec2(15));
  return texelFetch(u_solid,c,0).r>0.5?1.0:0.0;
}
void main(){
  int panel=min(2,int(floor(v_uv.x*3.0)));
  vec2 uv=vec2(fract(v_uv.x*3.0),v_uv.y);
  vec2 xy=clamp(uv*16.0,vec2(0.0),vec2(15.999));
  ivec2 ij=ivec2(floor(xy));
  if(maskAt(ij)>0.5){
    outColor=vec4(0.2,0.23,0.27,1.0);
    return;
  }
  float d=texelFetch(u_dye,ij,0).r;
  float v=texelFetch(u_div,ij,0).r;
  float s=texelFetch(u_speed,ij,0).r;
  vec3 rgb=panel==0?vec3(d,0.15,1.0-d):
    panel==1?vec3(v,0.08,0.08):vec3(0.12,s,0.8-0.5*s);
  // Raster normal from the fluid cell to adjacent solid cells.
  // This is NOT the exact circle normal.
  vec2 normal=vec2(maskAt(ij+ivec2(1,0))-maskAt(ij-ivec2(1,0)),
                   maskAt(ij+ivec2(0,1))-maskAt(ij-ivec2(0,1)));
  float norm=length(normal);
  if(panel==2&&norm>0.5){
    vec2 n=normal/norm;
    vec2 r=fract(xy)-vec2(0.5);
    float along=dot(r,n),across=abs(n.x*r.y-n.y*r.x);
    bool shaft=along>-0.28&&along<0.22&&across<0.055;
    bool tip=along>=0.12&&along<0.38&&across<0.75*(0.38-along);
    if(shaft||tip)rgb=vec3(1.0,0.9,0.1);
  }
  outColor=vec4(rgb,1.0);
}
