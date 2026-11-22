#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 v_uv;
uniform sampler2D u_dye,u_div,u_speed,u_solid;
uniform int u_viewMode;
uniform float u_aspect;
out vec4 outColor;
float maskAt(ivec2 a){
  ivec2 c=clamp(a,ivec2(0),textureSize(u_solid,0)-ivec2(1));
  return texelFetch(u_solid,c,0).r>0.5?1.0:0.0;
}
void main(){
  // u_viewMode=0 is the unmodified 3-panel R8 static pixel oracle.
  // u_viewMode=1 is a larger square view of the SAME NxN MAC state.
  if(u_viewMode==1){
    vec2 uv=(v_uv-0.5)*vec2(u_aspect,1.0)+0.5;
    if(any(lessThan(uv,vec2(0.0)))||
       any(greaterThan(uv,vec2(1.0)))){
      outColor=vec4(0.012,0.024,0.043,1.0);return;
    }
    vec2 xy=clamp(uv*float(textureSize(u_solid,0).x),vec2(0.0),vec2(float(textureSize(u_solid,0).x)-0.001));
    ivec2 ij=ivec2(floor(xy));
    bool isSolid=maskAt(ij)>0.5;
    // Label the *cell-step* boundary, not the exact moving circle.
    float faceNear=max(max(maskAt(ij+ivec2(1,0)),maskAt(ij-ivec2(1,0))),
                       max(maskAt(ij+ivec2(0,1)),maskAt(ij-ivec2(0,1))));
    vec2 cellUV=fract(xy),edge=min(cellUV,1.0-cellUV);
    float grid=1.0-smoothstep(0.0,0.018,min(edge.x,edge.y));
    float dye=texture(u_dye,uv).r,spd=texture(u_speed,uv).r;
    vec3 rgb=vec3(0.018,0.043,0.090)+
       pow(clamp(dye,0.0,1.0),0.72)*vec3(0.18,0.50,0.73)+
       pow(clamp(dye,0.0,1.0),2.0)*vec3(0.47,0.18,0.11)+
       spd*vec3(0.055,0.15,0.19);
    rgb*=1.0-.10*grid;
    if(isSolid){
      rgb=vec3(0.13,0.17,0.20)+0.035*grid;
    }else if(faceNear>0.5){
      // A luminous rim follows the staircase mask and is NOT a normal vector.
      float rim=1.0-smoothstep(0.04,0.13,min(edge.x,edge.y));
      rgb=mix(rgb,vec3(1.0,.75,.20),.68*rim);
      vec2 normal=vec2(maskAt(ij+ivec2(1,0))-maskAt(ij-ivec2(1,0)),
                       maskAt(ij+ivec2(0,1))-maskAt(ij-ivec2(0,1)));
      float nlen=length(normal);
      if(nlen>.5){
        vec2 n=normal/nlen,dr=cellUV-.5;
        float along=dot(dr,n),side=abs(n.x*dr.y-n.y*dr.x);
        bool shaft=along>-.28&&along<.15&&side<.035;
        bool tip=along>=.08&&along<.35&&side<.65*(.35-along);
        if(shaft||tip)rgb=vec3(1.0,.95,.30);
      }
    }
    outColor=vec4(clamp(rgb,0.0,1.0),1.0);return;
  }
  int panel=min(2,int(floor(v_uv.x*3.0)));
  vec2 uv=vec2(fract(v_uv.x*3.0),v_uv.y);
  vec2 xy=clamp(uv*float(textureSize(u_solid,0).x),vec2(0.0),vec2(float(textureSize(u_solid,0).x)-0.001));
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
