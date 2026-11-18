#version 300 es
precision highp float;
in vec3 v_color;
in float v_kind;
in float v_height;
uniform int u_attributeMode;
out vec4 outColor;
void main(){
  if(v_kind<0.5){
    float shade=clamp(0.75+0.07*v_height,0.5,1.0);
    outColor=vec4(vec3(0.25,0.55,0.31)*shade,1.0); // synthetic DEM
  }else if(v_kind<1.5){
    outColor=vec4(u_attributeMode==1 ? vec3(0.68,0.28,0.13) : vec3(0.77,0.49,0.21),1.0);
  }else if(v_kind<2.5){
    outColor=vec4(0.08,0.40,0.87,0.48); // hypothetical water surface, not a forecast
  }else{
    outColor=vec4(v_color,1.0); // fixed GPU pixel diagnostics
  }
}
