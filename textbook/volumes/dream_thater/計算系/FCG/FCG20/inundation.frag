#version 300 es
precision highp float;
uniform sampler2D u_field;
in vec2 uv;
out vec4 color;
void main(){
 float panel=min(2.,floor(uv.x*3.));
 vec2 local=vec2(fract(uv.x*3.),uv.y);
 vec4 s=texture(u_field,local);
 float h=clamp(s.g/2.,0.,1.),v=clamp(length(s.ba)/3.,0.,1.);
 vec3 dry=mix(vec3(.22,.16,.10),vec3(.83,.69,.43),clamp(s.r/3.25,0.,1.));
 vec3 water=mix(vec3(.08,.30,.48),vec3(.35,.85,1.),h);
 vec3 c=panel<1.?(s.g>.001?water:dry):panel<2.?mix(vec3(.04,.08,.12),vec3(.35,.85,1.),h):mix(vec3(.05,.08,.12),vec3(1.,.65,.16),v);
 if(local.x<.003||local.x>.997)c=vec3(.85);
 color=vec4(c,1.);
}
