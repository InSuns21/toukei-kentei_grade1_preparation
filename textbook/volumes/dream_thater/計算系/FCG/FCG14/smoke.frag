#version 300 es
precision highp float;
in vec2 v_uv;
uniform sampler2D u_smoke;
uniform sampler2D u_heat;
uniform sampler2D u_velocity;
uniform float u_aspect;
out vec4 outColor;
void main(){
 // Fit two square physical domains inside the available drawing buffer.
 vec2 p=(v_uv-.5)*vec2(max(2.,u_aspect),max(1.,2./u_aspect))+vec2(1.,.5);
 if(p.x<0.||p.x>=2.||p.y<0.||p.y>=1.){outColor=vec4(.04,.05,.07,1.);return;}
 bool heat=p.x>=1.;vec2 uv=vec2(fract(p.x),p.y);
 float q=texture(u_smoke,uv).r,t=texture(u_heat,uv).r;
 vec3 bg=vec3(.035,.045,.065);
 vec3 color=heat?mix(bg,vec3(1.,.72,.24),sqrt(t)):mix(bg,vec3(.91,.94,.98),sqrt(q));
 // Sparse velocity arrows on the temperature view only; lengths scale with speed.
 if(heat){
   vec2 cell=floor(uv*12.),center=(cell+.5)/12.;
   vec2 velocity=texture(u_velocity,center).rg*2.-1.;
   float speed=length(velocity);
   if(speed>.025){
     vec2 d=velocity/speed,local=(uv-center)*12.;
     float along=dot(local,d),across=abs(dot(local,vec2(-d.y,d.x)));
     float tip=min(.36,speed*.65);
     if((along>=-tip&&along<=tip&&across<.022)||(along>=tip-.12&&along<=tip&&abs(across-(tip-along))<.022))color=vec3(.85,.95,1.);
   }
 }
 if(abs(uv.x)<.004||abs(uv.x-1.)<.004||uv.y<.004||uv.y>.996)color=vec3(.44,.48,.53);
 if(abs(length(uv-vec2(.44,.12))-.085)<.004)color=vec3(.8,.8,.8);
 outColor=vec4(color,1.);
}
