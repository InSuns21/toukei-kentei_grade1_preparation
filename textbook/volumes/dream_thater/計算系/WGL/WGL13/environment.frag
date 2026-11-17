#version 300 es
precision highp float;
precision highp int;
precision highp samplerCube;
uniform samplerCube u_env;
uniform vec2 u_resolution;
uniform float u_yaw;
uniform float u_fresnelF0;
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
void main() {
  if (u_probe==1) {
    int k=clamp(int(floor(gl_FragCoord.x)),0,11);
    // Sampling a fixed mip level avoids undefined implicit derivatives in this branch.
    outColor=textureLod(u_env,normalize(u_probeDirections[k]),0.0);
    return;
  }
  vec2 p=(2.0*gl_FragCoord.xy-u_resolution)/min(u_resolution.x,u_resolution.y);
  float rr=dot(p,p);
  if(rr>=0.72*0.72) {
    // Show +Z face behind the sphere; not a physical skybox projection.
    outColor=textureLod(u_env,rotateY(vec3(p.x,p.y,1.0),u_yaw),0.0);
    return;
  }
  // Unit normal on the front hemisphere, orthographic view towards +Z.
  vec2 q=p/0.72;
  vec3 n=normalize(vec3(q,sqrt(max(0.0,1.0-dot(q,q)))));
  vec3 v=vec3(0.0,0.0,1.0); // surface -> eye
  vec3 incoming=-v;        // eye -> surface
  vec3 reflection=incoming-2.0*dot(n,incoming)*n;
  vec3 direction=rotateY(reflection,u_yaw);
  vec3 reflected=textureLod(u_env,normalize(direction),0.0).rgb;
  float f=schlick(max(dot(n,v),0.0),u_fresnelF0);
  // Illustrative single-direction reflection; not a GGX prefiltered environment integral.
  outColor=vec4(mix(vec3(0.08,0.10,0.12),reflected,f),1.0);
}
