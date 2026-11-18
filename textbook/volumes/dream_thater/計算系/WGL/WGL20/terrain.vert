#version 300 es
precision highp float;
layout(location=0) in vec3 a_position;
layout(location=1) in float a_kind;
layout(location=2) in vec3 a_color;
uniform vec3 u_right;
uniform vec3 u_up;
uniform vec3 u_eye;
uniform vec3 u_center;
uniform vec2 u_extent;
uniform float u_zScale;
out vec3 v_color;
out float v_kind;
out float v_height;
void main(){
  v_kind=a_kind;v_color=a_color;v_height=a_position.z;
  if(a_kind>2.5){
    gl_Position=vec4(a_position.xy,0.0,1.0); // diagnostic 2D strip, not geographic geometry
  }else{
    vec3 q=vec3(a_position.xy,a_position.z*u_zScale)-u_center;
    gl_Position=vec4(dot(q,u_right)/u_extent.x,
                     dot(q,u_up)/u_extent.y,-dot(q,u_eye)/120.0,1.0);
  }
}
