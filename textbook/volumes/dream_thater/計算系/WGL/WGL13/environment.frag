#version 300 es
precision highp float;
precision highp int;
precision highp samplerCube;
uniform samplerCube u_env;      // exact 2x2 direction probes (texture unit 0)
uniform samplerCube u_scene;    // generated six-face scenery (texture unit 1)
uniform vec2 u_resolution;
uniform float u_yaw;
uniform float u_fresnelF0;
uniform int u_showScene;
uniform int u_showSeams;
uniform vec2 u_selectedPoint;   // position on the front hemisphere, radius <= 1
uniform vec3 u_probeDirections[12];
uniform int u_probe;
out vec4 outColor;

vec3 rotateY(vec3 d,float angle) {
  float c=cos(angle),s=sin(angle);
  return vec3(c*d.x+s*d.z,d.y,-s*d.x+c*d.z);
}
float schlick(float cosine,float f0) {
  float t=1.0-clamp(cosine,0.0,1.0);
  return f0+(1.0-f0)*pow(t,5.0);
}
vec4 sampleEnvironment(vec3 d) {
  // Both scenes use the same face-selection rule and the same shader pipeline.
  return u_showScene==1 ? textureLod(u_scene,normalize(d),0.0) :
    textureLod(u_env,normalize(d),0.0);
}
int faceIndex(vec3 d) {
  vec3 a=abs(d);
  if (a.x>a.y && a.x>a.z) return d.x>=0.0 ? 0 : 1;
  if (a.y>a.z) return d.y>=0.0 ? 2 : 3;
  return d.z>=0.0 ? 4 : 5;
}
vec3 faceDirection(int face,vec2 st) {
  // Inverse of the six OpenGL cube-face s/t direction conventions.
  float s=2.0*st.x-1.0,t=2.0*st.y-1.0;
  if(face==0) return normalize(vec3(1.0,-t,-s));
  if(face==1) return normalize(vec3(-1.0,-t,s));
  if(face==2) return normalize(vec3(s,1.0,t));
  if(face==3) return normalize(vec3(s,-1.0,-t));
  if(face==4) return normalize(vec3(s,-t,1.0));
  return normalize(vec3(-s,-t,-1.0));
}
int netFace(ivec2 cell) {
  // Unfolded cross:      +Y
  //                  -X  +Z  +X  -Z
  //                      -Y
  if(all(equal(cell,ivec2(1,2)))) return 2;
  if(all(equal(cell,ivec2(0,1)))) return 1;
  if(all(equal(cell,ivec2(1,1)))) return 4;
  if(all(equal(cell,ivec2(2,1)))) return 0;
  if(all(equal(cell,ivec2(3,1)))) return 5;
  if(all(equal(cell,ivec2(1,0)))) return 3;
  return -1;
}
vec3 frontNormal(vec2 uv) {
  return normalize(vec3(uv,sqrt(max(0.0,1.0-dot(uv,uv)))));
}
void main() {
  if(u_probe==1) {
    int k=clamp(int(floor(gl_FragCoord.x)),0,11);
    // Raw RGBA8 samples: neither environment yaw nor material mixing applied.
    outColor=textureLod(u_env,normalize(u_probeDirections[k]),0.0);
    return;
  }

  vec2 pixel=gl_FragCoord.xy;
  float split=u_resolution.x*0.64;
  vec2 center=vec2(split*0.5,u_resolution.y*0.5);
  float radius=min(split*0.45,u_resolution.y*0.43);
  vec3 chosen=rotateY(reflect(vec3(0.0,0.0,-1.0),
    frontNormal(clamp(u_selectedPoint,-0.99,0.99))),u_yaw);
  int chosenFace=faceIndex(chosen);

  if(pixel.x>=split) {
    // The net is drawn by sampling the *same* cube texture as the sphere.
    float tile=min((u_resolution.x-split-18.0)/4.0,(u_resolution.y-32.0)/3.0);
    tile=max(1.0,tile);
    vec2 origin=vec2(split+(u_resolution.x-split-tile*4.0)*0.5,
                     (u_resolution.y-tile*3.0)*0.5);
    vec2 grid=(pixel-origin)/tile;
    ivec2 cell=ivec2(floor(grid));
    int face=netFace(cell);
    if(face<0 || grid.x<0.0 || grid.y<0.0 || grid.x>=4.0 || grid.y>=3.0) {
      outColor=vec4(0.065,0.083,0.105,1.0);
      return;
    }
    vec2 st=fract(grid);
    vec3 color=sampleEnvironment(faceDirection(face,st)).rgb;
    float border=min(min(st.x,1.0-st.x),min(st.y,1.0-st.y));
    if(border < 2.0/tile)
      color=face==chosenFace ? vec3(1.0,0.78,0.20) : vec3(0.55,0.63,0.72);
    outColor=vec4(color,1.0);
    return;
  }

  // A large orthographically viewed reflective hemisphere.
  vec2 q=(pixel-center)/radius;
  float r2=dot(q,q);
  if(r2>1.0) {
    vec3 ray=normalize(vec3((pixel-center)/min(split,u_resolution.y),0.8));
    vec3 bg=sampleEnvironment(rotateY(ray,u_yaw)).rgb*0.38;
    outColor=vec4(mix(vec3(0.035,0.052,0.075),bg,0.65),1.0);
    return;
  }
  vec3 n=frontNormal(q);
  vec3 v=vec3(0.0,0.0,1.0);
  vec3 reflection=reflect(-v,n);
  vec3 direction=rotateY(reflection,u_yaw);
  vec3 reflected=sampleEnvironment(direction).rgb;
  float f=schlick(dot(n,v),u_fresnelF0);
  vec3 color=mix(vec3(0.08,0.10,0.12),reflected,f);

  // Crossing a major-axis boundary changes the cube face used for sampling.
  vec3 a=abs(direction);
  float maxA=max(a.x,max(a.y,a.z));
  float midA=a.x+a.y+a.z-maxA-min(a.x,min(a.y,a.z));
  if(u_showSeams==1 && maxA-midA<0.025)
    color=mix(color,vec3(0.10,0.95,0.91),0.92);
  // Selected point and sphere silhouette remain legible without colour cues.
  float marker=length(q-u_selectedPoint);
  if(marker>0.012 && marker<0.021) color=vec3(1.0);
  if(r2>0.985) color=mix(color,vec3(0.85),0.65);
  outColor=vec4(color,1.0);
}
