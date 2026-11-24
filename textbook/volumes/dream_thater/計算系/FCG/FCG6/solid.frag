#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 v_uv;
uniform sampler2D u_dye,u_div,u_speed,u_solid;
uniform int u_viewMode;
uniform float u_aspect;
uniform sampler2D u_live,u_trace;
uniform int u_field,u_arrows;

out vec4 outColor;
float maskAt(ivec2 a){
  ivec2 c=clamp(a,ivec2(0),textureSize(u_solid,0)-ivec2(1));
  return texelFetch(u_solid,c,0).r>0.5?1.0:0.0;
}
void main(){
  // u_viewMode=0 is the unmodified 3-panel R8 static pixel oracle.
  // u_viewMode=1 is a larger square view of the SAME NxN MAC state.
  if(u_viewMode==1){
    // Square physical domain; no stretched velocities on wide/tall canvases.
    vec2 uv=(v_uv-0.5)*vec2(max(1.0,u_aspect),max(1.0,1.0/u_aspect))+0.5;
    if(any(lessThan(uv,vec2(0)))||any(greaterThanEqual(uv,vec2(1)))){
      outColor=vec4(.035,.06,.09,1);return;
    }
    float N=float(textureSize(u_solid,0).x);
    vec2 xy=uv*N;
    ivec2 ij=ivec2(floor(xy));
    vec2 cell=fract(xy);
    float d=texture(u_dye,uv).r;
    float sp=texture(u_speed,uv).r;
    float div=texelFetch(u_div,ij,0).r;
    vec4 live=texelFetch(u_live,ij,0);
    float pressure=2.0*live.b-1.0;
    vec3 rgb=mix(vec3(.035,.10,.16),vec3(.10,.66,.88),sqrt(d));
    rgb=mix(rgb,vec3(1.,.84,.35),d*d);
    if(u_field==1)rgb=mix(vec3(.05,.11,.18),vec3(.97,.80,.22),sqrt(sp));
    if(u_field==2)rgb=mix(vec3(.87,.88,.84),pressure<0.0?vec3(.13,.39,.83):vec3(.87,.29,.07),abs(pressure));
    if(u_field==3)rgb=mix(vec3(.04,.10,.14),vec3(.98,.27,.16),sqrt(div));
    if(maskAt(ij)>0.5){
      // Hatching distinguishes solid from fluid even in grayscale.
      float stripe=step(.5,fract((xy.x+xy.y)*.38));
      outColor=vec4(mix(vec3(.19,.21,.24),vec3(.30,.32,.35),stripe),1);return;
    }
    float trace=texture(u_trace,uv).r;
    if(u_field==0||u_field==1)rgb=mix(rgb,vec3(.95,.98,1.),trace*.88);
    // One arrow per 4x4 group; sample the actual MAC cell-centre velocity.
    if(u_arrows==1){
      vec2 base=floor(xy/4.0)*4.0+vec2(2.0);
      ivec2 c=ivec2(clamp(base,vec2(0),vec2(N-1.0)));
      vec2 v=(texelFetch(u_live,c,0).rg*255.0-128.0)/127.0;
      float speed=length(v);
      if(maskAt(c)<.5&&speed>.015){
        vec2 n=v/speed,r=xy-base;
        float along=dot(r,n),across=abs(r.x*n.y-r.y*n.x);
        float len=.45+1.15*min(speed*2.0,1.0);
        bool shaft=along>-.40&&along<len-.22&&across<.09;
        bool tip=along>=len-.42&&along<len&&across<.55*(len-along);
        if(shaft||tip)rgb=vec3(.98,.98,.98);
      }
    }
    // Highlight only the actual fluid-solid interface faces.
    bool edge=(cell.x<.10&&maskAt(ij-ivec2(1,0))>.5)||
      (cell.x>.90&&maskAt(ij+ivec2(1,0))>.5)||
      (cell.y<.10&&maskAt(ij-ivec2(0,1))>.5)||
      (cell.y>.90&&maskAt(ij+ivec2(0,1))>.5);
    if(edge)rgb=vec3(1.,.64,.16);
    outColor=vec4(rgb,1.0);return;
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
