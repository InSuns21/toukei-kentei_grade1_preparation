#version 300 es
precision highp float;
precision highp sampler2D;
uniform sampler2D u_state;
uniform int u_stage; // 0: advance grid; 1: fixed 4x4 probes; 2: 4x4 live; 3: full-grid color
uniform float u_rate;
uniform vec2 u_targetSize;
uniform ivec2 u_gridSize; // real numeric grid, independent of display pixels
out vec4 outColor;
float cellAt(ivec2 p) {
  ivec2 q = clamp(p, ivec2(0), u_gridSize - ivec2(1));
  return texelFetch(u_state, q, 0).r;
}
void main() {
  ivec2 p = u_stage == 0 ? ivec2(gl_FragCoord.xy) :
      ivec2(clamp(floor(gl_FragCoord.xy * vec2(u_gridSize) / u_targetSize),
                  vec2(0.0), vec2(u_gridSize - ivec2(1)))));
  if(u_stage == 2 || u_stage == 3){
    float side = min(u_targetSize.x,u_targetSize.y);
    vec2 lower = 0.5*(u_targetSize-vec2(side));
    vec2 local=gl_FragCoord.xy-lower;
    if(any(lessThan(local,vec2(0.0))) ||
       any(greaterThanEqual(local,vec2(side)))){
      outColor=vec4(0.035,0.05,0.085,1.0);
      return;
    }
    p=ivec2(clamp(floor(local*vec2(u_gridSize)/side),vec2(0.0),vec2(u_gridSize - ivec2(1))));
  }
  float center = cellAt(p);
  if (u_stage == 0) {
    float laplace = cellAt(p + ivec2(1,0)) + cellAt(p + ivec2(-1,0))
                  + cellAt(p + ivec2(0,1)) + cellAt(p + ivec2(0,-1))
                  - 4.0 * center;
    float nextValue = center + u_rate * laplace;
    outColor = vec4(nextValue, 0.0, 0.0, 1.0);
  } else if (u_stage == 3) {
    // Fixed value scale: sqrt(q) makes low concentration visible without changing the state.
    float shade = sqrt(clamp(center, 0.0, 1.0));
    vec3 deep = vec3(0.035, 0.10, 0.18);
    vec3 aqua = vec3(0.20, 0.76, 0.72);
    vec3 gold = vec3(1.0, 0.86, 0.35);
    outColor = vec4(shade < 0.5 ? mix(deep, aqua, 2.0 * shade)
      : mix(aqua, gold, 2.0 * shade - 1.0), 1.0);
  } else {
    float value = clamp(center, 0.0, 1.0);
    outColor = vec4(value, 0.2, 1.0-value, 1.0);
  }
}
