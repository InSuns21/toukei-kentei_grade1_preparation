#version 300 es
precision highp float;
in vec2 v_uv;
uniform sampler2D u_state;
uniform float u_extinction;
uniform float u_emission;
uniform float u_aspect;
out vec4 outColor;
void main(){
 vec2 p=(v_uv-.5)*vec2(max(3.,u_aspect),max(1.,3./u_aspect))+vec2(1.5,.5);
 if(p.x<0.||p.x>=3.||p.y<0.||p.y>=1.){outColor=vec4(.04,.05,.07,1.);return;}
 vec2 uv=vec2(fract(p.x),p.y);
 vec3 q=texture(u_state,uv).rgb;
 vec3 bg=mix(vec3(.22,.27,.34),vec3(.57,.62,.69),mod(floor(uv.x*8.)+floor(uv.y*8.),2.));
 vec3 heatColor=mix(vec3(1.,.12,.015),vec3(1.,.95,.55),clamp(3.*q.g,0.,1.));
 vec3 J=u_emission*q.g*heatColor;
 float sigma=u_extinction*q.b;
 float tr=exp(-sigma);
 float A=sigma>0.0001?(1.-tr)/sigma:1.-sigma*.5;
 vec3 col=p.x<1.?tr*bg+A*J:p.x<2.?J:tr*bg;
 outColor=vec4(clamp(col,0.,1.),1.);
}
