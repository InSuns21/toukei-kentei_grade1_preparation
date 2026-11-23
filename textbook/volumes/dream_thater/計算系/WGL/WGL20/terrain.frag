#version 300 es
precision highp float;
in vec3 v_color;
in float v_kind;
in float v_height;
in vec3 v_normal;
in vec3 v_lightClip;
uniform int u_attributeMode;
uniform vec3 u_sunDirection;
uniform sampler2D u_shadowMap;
uniform bool u_showShadows;
out vec4 outColor;
float sunVisibility(){
  if(!u_showShadows)return 1.0;
  vec3 q=v_lightClip*0.5+0.5;
  if(q.x<=0.0||q.x>=1.0||q.y<=0.0||q.y>=1.0||q.z<=0.0||q.z>=1.0)return 1.0;
  vec2 texel=1.0/vec2(textureSize(u_shadowMap,0));
  float visible=0.0;
  for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){
    float depth=texture(u_shadowMap,q.xy+vec2(float(x),float(y))*texel).r;
    visible += q.z-0.0017<=depth?1.0:0.0;
  }
  return visible/9.0;
}
void main(){
  if(v_kind>2.5&&v_kind<3.5){
    outColor=vec4(v_color,1.0); // unlit fixed-byte diagnostic band
    return;
  }
  if(v_kind>1.5&&v_kind<2.5){
    outColor=vec4(0.12,0.53,0.88,0.33); // synthetic water, transparent and unlit
    return;
  }
  vec3 material=v_color;
  if(v_kind<0.5){
    float heightTint=clamp(0.87+0.055*v_height,0.7,1.12);
    material=vec3(0.39,0.62,0.41)*heightTint;
  }else if(v_kind<1.5){
    material=u_attributeMode==1?vec3(0.85,0.42,0.18):vec3(0.87,0.70,0.44);
  }
  vec3 n=normalize(v_normal);
  vec3 sun=normalize(u_sunDirection);
  float lambert=max(dot(n,sun),0.0);
  float brightness=0.47+0.57*lambert;
  float shadow=0.46+0.54*sunVisibility();
  // Painted markings, windows and roads retain enough local contrast to remain readable.
  if(v_kind>5.5)brightness=max(brightness,0.75);
  outColor=vec4(material*brightness*shadow,1.0);
}