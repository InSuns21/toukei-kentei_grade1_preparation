#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 v_uv;
uniform sampler2D u_numeric;
uniform sampler2D u_exact;
// 0: original cell-color audit; 1: reconstructed observation.
uniform bool u_observe;
out vec4 outColor;
const float errorGain=5.0;
vec3 fields(ivec2 p){
  ivec2 n=textureSize(u_numeric,0);
  if(any(lessThan(p,ivec2(0)))||any(greaterThanEqual(p,n)))return vec3(0.0);
  float q=texelFetch(u_numeric,p,0).r;
  float e=texelFetch(u_exact,p,0).r;
  return vec3(q,e,abs(q-e));
}
vec3 reconstruct(vec2 uv){
  vec2 a=uv*vec2(textureSize(u_numeric,0))-0.5;
  ivec2 p=ivec2(floor(a));vec2 f=fract(a);
  return mix(mix(fields(p),fields(p+ivec2(1,0)),f.x),
             mix(fields(p+ivec2(0,1)),fields(p+ivec2(1,1)),f.x),f.y);
}
// Ordered lightness; low concentrations remain visible against the dark field.
vec3 dyeColor(float q){
  vec3 low=vec3(0.025,0.065,0.105),mid=vec3(0.08,0.55,0.64);
  vec3 high=vec3(1.0,0.95,0.74);
  return q<0.45?mix(low,mid,q/0.45):mix(mid,high,(q-0.45)/0.55);
}
vec3 errorColor(float e){
  vec3 low=vec3(0.025,0.065,0.105),mid=vec3(0.76,0.22,0.12);
  vec3 high=vec3(1.0,0.95,0.74);
  return e<0.5?mix(low,mid,2.0*e):mix(mid,high,2.0*e-1.0);
}
void main(){
  bool left=v_uv.x<0.5;
  vec2 cellUv=vec2(fract(v_uv.x*2.0),v_uv.y);
  ivec2 gridSize=textureSize(u_numeric,0);
  ivec2 cell=ivec2(clamp(floor(cellUv*vec2(gridSize)),vec2(0.0),vec2(gridSize-1)));
  vec3 raw=fields(cell);
  if(!u_observe){
    if(left)outColor=vec4(raw.x,0.15,1.0-raw.x,1.0);
    else outColor=vec4(min(1.0,errorGain*raw.z),0.08,0.1,1.0);
    return;
  }
  // Reconstruct the actual R8 samples, including the absolute CELL errors.
  // Interpolating the signed differences first would hide cancellation.
  vec3 f=reconstruct(cellUv);
  vec3 color=left?dyeColor(f.x):errorColor(min(1.0,errorGain*f.z));
  // A dashed half-maximum contour of the sampled exact field on the dye panel.
  // The line is a guide, not an additional concentration.
  float w=max(fwidth(f.y),0.0001);
  float contour=1.0-smoothstep(0.65*w,1.65*w,abs(f.y-0.5));
  float dash=step(0.35,fract(55.0*(cellUv.x+cellUv.y)));
  if(left)color=mix(color,vec3(0.91,0.96,1.0),0.88*contour*dash);
  // A two-pixel separator between the fields, independent of grid resolution.
  if(abs(v_uv.x-0.5)<fwidth(v_uv.x))color=vec3(0.29,0.36,0.43);
  outColor=vec4(color,1.0);
}
