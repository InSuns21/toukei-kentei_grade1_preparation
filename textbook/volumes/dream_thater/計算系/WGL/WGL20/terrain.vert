#version 300 es
precision highp float;
layout(location=0) in vec3 a_position;
layout(location=1) in float a_kind;
layout(location=2) in vec3 a_color;
layout(location=3) in vec3 a_normal;
uniform vec3 u_right;
uniform vec3 u_up;
uniform vec3 u_eye;
uniform vec3 u_center;
uniform vec2 u_extent;
uniform float u_zScale;
uniform vec3 u_lightRight;
uniform vec3 u_lightUp;
uniform vec3 u_lightEye;
out vec3 v_color;
out float v_kind;
out float v_height;
out vec3 v_normal;
out vec3 v_lightClip;
void main(){
  v_kind=a_kind;
  v_color=a_color;
  v_height=a_position.z;
  v_normal=normalize(vec3(a_normal.xy,a_normal.z/u_zScale));
  if(a_kind>2.5&&a_kind<3.5){
    gl_Position=vec4(a_position.xy,0.0,1.0); // RGBA8 diagnostic strip in clip space
    v_lightClip=vec3(0.0);
  }else{
    vec3 q=vec3(a_position.xy,a_position.z*u_zScale)-u_center;
    gl_Position=vec4(dot(q,u_right)/u_extent.x,
                     dot(q,u_up)/u_extent.y,-dot(q,u_eye)/190.0,1.0);
    v_lightClip=vec3(dot(q,u_lightRight)/140.0,
                     dot(q,u_lightUp)/140.0,-dot(q,u_lightEye)/160.0);
  }
}