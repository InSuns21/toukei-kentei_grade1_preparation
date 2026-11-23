// WGL20: real LOD1 sample and entirely synthetic DEM / water; no solver.
const scenario='BASE';       // BASE, CS1, CS2, CS3
const zExaggeration=1.5;     // visual multiplier only; never change input elevations
const waterLevelM=32.0;     // invented absolute water surface level in dataset vertical datum
const usePlateau=true;       // false leaves a complete synthetic terrain experiment
const showWater=true;        // transparent water is a hypothetical surface
const gridSteps=4;           // 4x4 DEM cells; synthetic 240 m district
const cameraAzimuthDeg=40;   // 0 east, 90 north; orbit angle in degrees
const cameraElevationDeg=47; // view elevation, degrees
const sunAzimuthDeg=235;     // light source bearing from east toward north, degrees
const showShadows=true;      // a depth-only directional light pass
const showContext=true;      // surrounding buildings are invented, NEVER PLATEAU data
if(!['BASE','CS1','CS2','CS3'].includes(scenario)||
   !Number.isFinite(zExaggeration)||zExaggeration<0.1||zExaggeration>5||
   !Number.isFinite(waterLevelM)||waterLevelM<20||waterLevelM>50||
   !Number.isInteger(gridSteps)||gridSteps<2||gridSteps>32||
   !Number.isFinite(cameraAzimuthDeg)||Math.abs(cameraAzimuthDeg)>360||
   !Number.isFinite(cameraElevationDeg)||cameraElevationDeg<18||cameraElevationDeg>85||
   !Number.isFinite(sunAzimuthDeg)||Math.abs(sunAzimuthDeg)>360)throw new RangeError('unsafe WGL20 settings');
const data=settings.snapshot;
if(!data||data.schema!=='wgl20-offline-mesh-v1'||
   data.source.declaredCrs!=='EPSG:6697'||
   !Array.isArray(data.mesh.vertices)||!Array.isArray(data.mesh.triangles)||
   data.mesh.vertices.length>12000||data.mesh.triangles.length>30000)
  throw new Error('PLATEAU static snapshot is absent or malformed; cannot claim real-data comparison');
const [lat0,lon0,h0]=data.coordinate.originLatLonH;
const positions=data.mesh.vertices,triangles=data.mesh.triangles;
const dem=(x,y)=>h0+0.02*x-0.01*y; // synthetic ground elevation in metres
const depth=(x,y)=>Math.max(0,waterLevelM-dem(x,y)); // not stored as a terrain height
const vertices=[];
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const subtract=(a,b)=>a.map((v,i)=>v-b[i]);
const norm=v=>{const l=Math.hypot(...v);return l>1e-12?v.map(x=>x/l):[0,0,1];};
const add=(p,kind,color,normal)=>vertices.push(...p,kind,...color,...normal);
const tri=(p,q,r,kind,color=[1,1,1])=>{
  const n=norm(cross(subtract(q,p),subtract(r,p)));
  add(p,kind,color,n);add(q,kind,color,n);add(r,kind,color,n);
};
const quad=(a,b,c,d,kind,color)=>{tri(a,b,c,kind,color);tri(a,c,d,kind,color);};
const counts={terrain:0,roads:0,context:0,building:0,water:0,diagnostic:0};
const lo=-120,hi=120,delta=(hi-lo)/gridSteps;
const zGround=(x,y)=>dem(x,y)-h0;
for(let j=0;j<gridSteps;j++)for(let i=0;i<gridSteps;i++){
  const x=lo+i*delta,y=lo+j*delta;
  const p=[[x,y],[x+delta,y],[x+delta,y+delta],[x,y+delta]];
  const ground=p.map(([ex,no])=>[ex,no,zGround(ex,no)]);
  quad(...ground,0,[0.39,0.62,0.41]);
}
counts.terrain=vertices.length/10;
// Asphalt follows the same synthetic DEM plane; pale interrupted lane markings
// give the official 50 m wide sample an immediately readable urban scale.
const surface=(x0,y0,x1,y1,kind,color,offset)=>{
  const z=(x,y)=>zGround(x,y)+offset;
  quad([x0,y0,z(x0,y0)],[x1,y0,z(x1,y0)],
       [x1,y1,z(x1,y1)],[x0,y1,z(x0,y1)],kind,color);
};
for(const a of [-45,45]){
  surface(a-5,lo,a+5,hi,4,[0.28,0.33,0.38],0.07);
  surface(lo,a-5,hi,a+5,4,[0.28,0.33,0.38],0.07);
  for(let q=-113;q<115;q+=24){
    if(Math.abs(q+45)<14||Math.abs(q-45)<14)continue;
    surface(a-0.35,q,a+0.35,q+8,7,[0.93,0.92,0.75],0.09);
    surface(q,a-0.35,q+8,a+0.35,7,[0.93,0.92,0.75],0.09);
  }
}
counts.roads=vertices.length/10-counts.terrain;
// All of these simple footprint extrusions are synthetic context, NOT extra PLATEAU
// buildings. The untouched real LOD1 mesh is rendered separately below.
const blocks=[
  [-83,-82,13,12,16],[-83,-7,12,11,10],[-83,82,13,13,20],
  [-8,-83,14,11,12],[12,83,12,12,17],
  [83,-83,14,13,12],[83,0,12,14,22],[82,82,13,13,15]
];
if(showContext)blocks.forEach(([cx,cy,hx,hy,height],id)=>{
  const x0=cx-hx,x1=cx+hx,y0=cy-hy,y1=cy+hy;
  const base=zGround(cx,cy),top=base+height;
  const wall=[[0.74,0.76,0.74],[0.82,0.72,0.62],[0.67,0.77,0.84]][id%3];
  const roof=[0.84,0.87,0.86];
  quad([x0,y0,base],[x1,y0,base],[x1,y0,top],[x0,y0,top],5,wall);
  quad([x1,y1,base],[x0,y1,base],[x0,y1,top],[x1,y1,top],5,wall);
  quad([x0,y1,base],[x0,y0,base],[x0,y0,top],[x0,y1,top],5,wall);
  quad([x1,y0,base],[x1,y1,base],[x1,y1,top],[x1,y0,top],5,wall);
  quad([x0,y0,top],[x1,y0,top],[x1,y1,top],[x0,y1,top],5,roof);
  const floors=Math.max(2,Math.floor(height/3.6));
  const windowColor=id%2?[0.19,0.33,0.46]:[0.23,0.39,0.47];
  for(let fl=0;fl<floors;fl++)for(let col=0;col<3;col++){
    const zz=base+1.8+fl*3.4;
    if(zz+1.25>=top)continue;
    const xx=x0+(col+0.55)*(x1-x0)/3,xx2=xx+(x1-x0)/6;
    quad([xx,y0-0.09,zz],[xx2,y0-0.09,zz],
         [xx2,y0-0.09,zz+1.35],[xx,y0-0.09,zz+1.35],6,windowColor);
    const yy=y0+(col+0.55)*(y1-y0)/3,yy2=yy+(y1-y0)/6;
    quad([x1+0.09,yy,zz],[x1+0.09,yy2,zz],
         [x1+0.09,yy2,zz+1.35],[x1+0.09,yy,zz+1.35],6,windowColor);
  }
});
counts.context=vertices.length/10-counts.terrain-counts.roads;
if(usePlateau){
  for(let i=0;i<triangles.length;i+=3){
    const get=k=>positions.slice(3*triangles[k],3*triangles[k]+3);
    tri(get(i),get(i+1),get(i+2),1,[0.87,0.70,0.44]);
  }
}
counts.building=vertices.length/10-counts.terrain-counts.roads-counts.context;
// Clip each water triangle against W-G >= 0. Dry high ground remains visible.
// All geometry stays in the DEM's horizontal coordinates; only draw Z is exaggerated.
const clipWet=polygon=>{
  const out=[];
  for(let k=0;k<polygon.length;k++){
    const a=polygon[k],b=polygon[(k+1)%polygon.length];
    const da=waterLevelM-dem(...a),db=waterLevelM-dem(...b);
    if(da>=0)out.push(a);
    if((da>0&&db<0)||(da<0&&db>0)){
      const t=da/(da-db);out.push([a[0]+t*(b[0]-a[0]),a[1]+t*(b[1]-a[1])]);
    }
  }
  return out;
};
if(showWater){
  for(let j=0;j<gridSteps;j++)for(let i=0;i<gridSteps;i++){
    const x=lo+i*delta,y=lo+j*delta;
    const cells=[[[x,y],[x+delta,y],[x+delta,y+delta]],
                 [[x,y],[x+delta,y+delta],[x,y+delta]]];
    for(const cell of cells){
      const poly=clipWet(cell);
      const z=waterLevelM-h0+0.035;
      for(let k=1;k+1<poly.length;k++){
        const v=p=>[p[0],p[1],z];
        tri(v(poly[0]),v(poly[k]),v(poly[k+1]),2,[0.12,0.53,0.88]);
      }
    }
  }
}
counts.water=vertices.length/10-counts.terrain-counts.roads-counts.context-counts.building;
// Four fixed RGBA8 probes are screen-space pixels, never geographical objects.
const band=24/canvas.height;
const keys=[[32,96,64],[24,98,210],[172,78,42],[16,24,40]];
for(let i=0;i<4;i++){
  const x0=-1+i*0.5,x1=x0+0.5,y0=-1,y1=-1+band;
  const color=keys[i].map(k=>k/255);
  quad([x0,y0,0],[x1,y0,0],[x1,y1,0],[x0,y1,0],3,color);
}
counts.diagnostic=vertices.length/10-counts.terrain-counts.roads-counts.context-counts.building-counts.water;
const shader=(type,src,stage)=>{
 const s=gl.createShader(type);if(!s)throw new Error(stage+' allocation');
 gl.shaderSource(s,src);gl.compileShader(s);
 if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){
   const msg=gl.getShaderInfoLog(s)||'compilation failed';
   gl.deleteShader(s);throw new Error(stage+': '+msg);
 }return s;
};
const vs=shader(gl.VERTEX_SHADER,vertexSource,'VERTEX');
const fs=shader(gl.FRAGMENT_SHADER,fragmentSource,'FRAGMENT');
const program=gl.createProgram();
gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);
if(!gl.getProgramParameter(program,gl.LINK_STATUS))
  throw new Error('LINK: '+(gl.getProgramInfoLog(program)||'link failure'));
gl.deleteShader(vs);gl.deleteShader(fs);
const vao=gl.createVertexArray(),buffer=gl.createBuffer();
if(!vao||!buffer)throw new Error('GPU vertex allocation');
gl.bindVertexArray(vao);gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertices),gl.STATIC_DRAW);
for(const [loc,len,offset] of [[0,3,0],[1,1,12],[2,3,16],[3,3,28]]){
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc,len,gl.FLOAT,false,40,offset);
}
const toRadians=d=>d*Math.PI/180;
const sunDirection=norm([
  Math.cos(toRadians(sunAzimuthDeg))*Math.cos(toRadians(52)),
  Math.sin(toRadians(sunAzimuthDeg))*Math.cos(toRadians(52)),
  Math.sin(toRadians(52))
]);
const lightRight=norm(cross([0,0,1],sunDirection));
const lightUp=norm(cross(sunDirection,lightRight));
const VIEW_X=155,VIEW_Y=118;
const center=[0,0,7*zExaggeration];
let azimuth=cameraAzimuthDeg,elevation=cameraElevationDeg;
let eye,right,up;
const camera=()=>{
  const az=toRadians(azimuth),el=toRadians(elevation);
  eye=norm([Math.cos(az)*Math.cos(el),Math.sin(az)*Math.cos(el),Math.sin(el)]);
  right=norm(cross([0,0,1],eye));
  up=norm(cross(eye,right));
};
camera();
// The light's depth texture uses actual opaque scene triangles, not a fake
// painted ellipse or a second hand-authored representation of the buildings.
const shadowVS=[
 '#version 300 es','precision highp float;',
 'layout(location=0) in vec3 a_position;',
 'uniform vec3 u_center,u_lightRight,u_lightUp,u_lightEye;',
 'uniform float u_zScale;',
 'void main(){vec3 q=vec3(a_position.xy,a_position.z*u_zScale)-u_center;',
 'gl_Position=vec4(dot(q,u_lightRight)/140.0,dot(q,u_lightUp)/140.0,',
 '-dot(q,u_lightEye)/160.0,1.0);}'
].join('\n');
const shadowFS='#version 300 es\nprecision highp float;\nvoid main(){}';
const sv=shader(gl.VERTEX_SHADER,shadowVS,'SHADOW_VERTEX');
const sf=shader(gl.FRAGMENT_SHADER,shadowFS,'SHADOW_FRAGMENT');
const shadowProgram=gl.createProgram();
gl.attachShader(shadowProgram,sv);gl.attachShader(shadowProgram,sf);
gl.linkProgram(shadowProgram);
if(!gl.getProgramParameter(shadowProgram,gl.LINK_STATUS))
  throw new Error('SHADOW_LINK: '+gl.getProgramInfoLog(shadowProgram));
gl.deleteShader(sv);gl.deleteShader(sf);
const SHADOW_SIZE=1024;
const shadowTexture=gl.createTexture(),shadowFbo=gl.createFramebuffer();
if(!shadowTexture||!shadowFbo)throw new Error('shadow map allocation');
gl.bindTexture(gl.TEXTURE_2D,shadowTexture);
gl.texImage2D(gl.TEXTURE_2D,0,gl.DEPTH_COMPONENT16,SHADOW_SIZE,SHADOW_SIZE,0,
              gl.DEPTH_COMPONENT,gl.UNSIGNED_SHORT,null);
gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
gl.bindFramebuffer(gl.FRAMEBUFFER,shadowFbo);
gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.TEXTURE_2D,shadowTexture,0);
gl.drawBuffers([gl.NONE]);gl.readBuffer(gl.NONE);
if(gl.checkFramebufferStatus(gl.FRAMEBUFFER)!==gl.FRAMEBUFFER_COMPLETE)
  throw new Error('shadow framebuffer incomplete');
const uniform3=(p,k,v)=>{
  const loc=gl.getUniformLocation(p,k);
  if(loc!==null)gl.uniform3fv(loc,v);
};
gl.bindVertexArray(vao);
gl.disable(gl.DITHER);
gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LESS);
gl.disable(gl.CULL_FACE);
gl.disable(gl.BLEND);
gl.useProgram(shadowProgram);
uniform3(shadowProgram,'u_center',center);
uniform3(shadowProgram,'u_lightRight',lightRight);
uniform3(shadowProgram,'u_lightUp',lightUp);
uniform3(shadowProgram,'u_lightEye',sunDirection);
gl.uniform1f(gl.getUniformLocation(shadowProgram,'u_zScale'),zExaggeration);
gl.viewport(0,0,SHADOW_SIZE,SHADOW_SIZE);
gl.clearDepth(1);gl.clear(gl.DEPTH_BUFFER_BIT);
const opaqueVertices=counts.terrain+counts.roads+counts.context+counts.building;
gl.drawArrays(gl.TRIANGLES,0,opaqueVertices);
gl.bindFramebuffer(gl.FRAMEBUFFER,null);
gl.drawBuffers([gl.BACK]);gl.readBuffer(gl.BACK);
gl.useProgram(program);
uniform3(program,'u_lightRight',lightRight);
uniform3(program,'u_lightUp',lightUp);
uniform3(program,'u_lightEye',sunDirection);
uniform3(program,'u_center',center);
uniform3(program,'u_sunDirection',sunDirection);
gl.uniform2f(gl.getUniformLocation(program,'u_extent'),VIEW_X,VIEW_Y);
gl.uniform1f(gl.getUniformLocation(program,'u_zScale'),zExaggeration);
gl.uniform1i(gl.getUniformLocation(program,'u_attributeMode'),scenario==='CS2'?1:0);
gl.uniform1i(gl.getUniformLocation(program,'u_showShadows'),showShadows?1:0);
gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,shadowTexture);
gl.uniform1i(gl.getUniformLocation(program,'u_shadowMap'),0);
let drawCalls=0;
function drawScene(){
  gl.bindFramebuffer(gl.FRAMEBUFFER,null);
  gl.viewport(0,0,canvas.width,canvas.height);
  gl.bindVertexArray(vao);gl.useProgram(program);
  uniform3(program,'u_eye',eye);
  uniform3(program,'u_right',right);
  uniform3(program,'u_up',up);
  gl.clearColor(0.76,0.85,0.91,1);
  gl.clearDepth(1);gl.depthMask(true);gl.disable(gl.DITHER);
  gl.disable(gl.BLEND);gl.enable(gl.DEPTH_TEST);
  gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
  let offset=0;drawCalls=0;
  const draw=n=>{if(n){gl.drawArrays(gl.TRIANGLES,offset,n);drawCalls++;}offset+=n;};
  draw(counts.terrain);draw(counts.roads);draw(counts.context);
  if(scenario==='CS2'){
    let left=counts.building;
    while(left>0){const n=Math.min(33,left);draw(n);left-=n;}
  }else draw(counts.building);
  if(showWater){
    gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
    gl.depthMask(false);draw(counts.water);gl.depthMask(true);gl.disable(gl.BLEND);
  }else draw(0);
  gl.disable(gl.DEPTH_TEST);draw(counts.diagnostic);
}
drawScene();
const err=gl.getError();if(err!==gl.NO_ERROR)throw new Error('GL 0x'+err.toString(16));
report('DATA','official PLATEAU sample building id '+data.source.gmlId+
  '; EPSG:6697 latitude/longitude/vertical height; LOD1 '+(positions.length/3)+' vertices');
report('COORD','origin latitude '+lat0+', longitude '+lon0+', height '+h0+' m; x=east y=north z=up (m)');
report('HEIGHT','DEM and water grid entirely synthetic; water surface '+waterLevelM+
  ' m, ground at origin '+dem(0,0).toFixed(6)+' m, depth '+depth(0,0).toFixed(6)+' m');
report('DEPTH','at (10,-20) ground '+dem(10,-20).toFixed(6)+
  ' m / depth '+depth(10,-20).toFixed(6)+
  ' m; at (-20,10) ground '+dem(-20,10).toFixed(6)+
  ' m / depth '+depth(-20,10).toFixed(6)+' m');
report('DRAW','synthetic terrain '+counts.terrain/3+' triangles, synthetic context '+blocks.length+' buildings ('+counts.context/3+' triangles), official PLATEAU 1 building ('+counts.building/3+' triangles), clipped water '+counts.water/3+' triangles, '+drawCalls+' screen draw calls + 1 shadow pass');
report('WARN','Synthetic streets and '+(showContext?blocks.length:0)+' synthetic surrounding buildings; only the original LOD1 building is from PLATEAU. Z exaggeration '+zExaggeration+' changes the picture, not depth.');
report('ATTR','official sample measuredHeight='+data.source.heightAttributeM+
  ' m; usage code in original GML; absent municipality/year are not guessed');
const checkpoints={firstLocal:positions.slice(0,3),vertices:positions.length/3,
  triangles:triangles.length/3,waterLevelM,groundAtOriginM:dem(0,0),
  depthAtOriginM:depth(0,0),groundAtTestM:dem(10,-20),
  depthAtTestM:depth(10,-20),groundAtWestM:dem(-20,10),
  depthAtWestM:depth(-20,10),zExaggeration,drawCalls};
// CS1: an independent solid-object ID pass into RGBA8 plus a CPU triangle-ray check.
// Transparent hypothetical water and the diagnostic strip are deliberately excluded.
let pick;
if(scenario==='CS1'){
  const idFrag=shader(gl.FRAGMENT_SHADER,
    '#version 300 es\nprecision highp float;in float v_kind;out vec4 outColor;'+
    'void main(){float id=v_kind>0.5&&v_kind<1.5?1.0:(v_kind>4.5&&v_kind<6.5?2.0:0.0);outColor=vec4(id/255.0,0.0,0.0,1.0);}',
    'PICK_FRAGMENT');
  const idVert=shader(gl.VERTEX_SHADER,vertexSource,'PICK_VERTEX');
  const idProgram=gl.createProgram();
  gl.attachShader(idProgram,idVert);gl.attachShader(idProgram,idFrag);gl.linkProgram(idProgram);
  if(!gl.getProgramParameter(idProgram,gl.LINK_STATUS))
    throw new Error('PICK_LINK: '+gl.getProgramInfoLog(idProgram));
  gl.deleteShader(idFrag);gl.deleteShader(idVert);
  const idTex=gl.createTexture(),idFbo=gl.createFramebuffer(),depthRbo=gl.createRenderbuffer();
  if(!idTex||!idFbo||!depthRbo)throw new Error('ID buffer allocation failed');
  gl.bindTexture(gl.TEXTURE_2D,idTex);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
  gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA8,canvas.width,canvas.height,0,gl.RGBA,gl.UNSIGNED_BYTE,null);
  gl.bindRenderbuffer(gl.RENDERBUFFER,depthRbo);
  gl.renderbufferStorage(gl.RENDERBUFFER,gl.DEPTH_COMPONENT16,canvas.width,canvas.height);
  gl.bindFramebuffer(gl.FRAMEBUFFER,idFbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,idTex,0);
  gl.framebufferRenderbuffer(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.RENDERBUFFER,depthRbo);
  if(gl.checkFramebufferStatus(gl.FRAMEBUFFER)!==gl.FRAMEBUFFER_COMPLETE)
    throw new Error('CS1 ID FBO incomplete');
  gl.useProgram(idProgram);
  const set3=(key,v)=>gl.uniform3fv(gl.getUniformLocation(idProgram,key),v);
  set3('u_eye',eye);set3('u_right',right);set3('u_up',up);
  set3('u_center',center);
  gl.uniform2f(gl.getUniformLocation(idProgram,'u_extent'),VIEW_X,VIEW_Y);
  gl.uniform1f(gl.getUniformLocation(idProgram,'u_zScale'),zExaggeration);
  gl.bindVertexArray(vao);gl.disable(gl.BLEND);gl.enable(gl.DEPTH_TEST);
  gl.depthMask(true);gl.depthFunc(gl.LESS);gl.clearColor(0,0,0,1);
  gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES,0,opaqueVertices);
  gl.bindFramebuffer(gl.FRAMEBUFFER,null);
  const projectPoint=(base)=>{
    const q=[vertices[base],vertices[base+1],
      vertices[base+2]*zExaggeration-center[2]];
    return [q[0]*right[0]+q[1]*right[1]+q[2]*right[2],
            q[0]*up[0]+q[1]*up[1]+q[2]*up[2],
            -(q[0]*eye[0]+q[1]*eye[1]+q[2]*eye[2])];
  };
  pick=(x,y)=>{
    if(!Number.isInteger(x)||!Number.isInteger(y)||x<0||y<0||
       x>=canvas.width||y>=canvas.height)throw new RangeError('pick pixel');
    gl.bindFramebuffer(gl.FRAMEBUFFER,idFbo);
    const pixel=new Uint8Array(4);
    gl.readPixels(x,y,1,1,gl.RGBA,gl.UNSIGNED_BYTE,pixel);
    gl.bindFramebuffer(gl.FRAMEBUFFER,null);
    const px=2*(x+0.5)/canvas.width-1,py=2*(y+0.5)/canvas.height-1;
    let closest=Infinity,cpuId=0;
    for(let k=0;k<opaqueVertices;k+=3){
      const a=projectPoint(k*10),bb=projectPoint((k+1)*10),cc=projectPoint((k+2)*10);
      const ax=a[0]/VIEW_X,ay=a[1]/VIEW_Y,bx=bb[0]/VIEW_X,by=bb[1]/VIEW_Y,cx=cc[0]/VIEW_X,cy=cc[1]/VIEW_Y;
      const det=(bx-ax)*(cy-ay)-(by-ay)*(cx-ax);
      if(Math.abs(det)<1e-10)continue;
      const beta=((px-ax)*(cy-ay)-(py-ay)*(cx-ax))/det;
      const gamma=((bx-ax)*(py-ay)-(by-ay)*(px-ax))/det;
      const alpha=1-beta-gamma;
      if(Math.min(alpha,beta,gamma)<-1e-6)continue;
      const z=(alpha*a[2]+beta*bb[2]+gamma*cc[2])/190;
      const kind=vertices[k*10+3];
      if(z<closest&&z>=-1&&z<=1){closest=z;cpuId=kind===1?1:(kind>=5&&kind<7?2:0);}
    }
    return {gpuId:pixel[0],cpuId};
  };
  report('PICK','CS1 ID0 ground/road/background, ID1 official PLATEAU building, ID2 synthetic surrounding buildings; rasterized boundary pixels may differ');
  // The temporary ID program/FBO survive only inside this disposable sandbox iframe.
  // On stop/re-run the entire isolated context is destroyed, including these resources.
}
// Mouse drag and keyboard rotate the *same* WebGL meshes without changing
// the input geodesy or water depth. CS1 retains the fixed ID-buffer camera.
if(scenario!=='CS1'){
  let last=null,scheduled=false;
  const redraw=()=>{
    if(scheduled)return;scheduled=true;
    requestAnimationFrame(()=>{scheduled=false;camera();drawScene();});
  };
  canvas.tabIndex=0;
  canvas.setAttribute('aria-label','街区3D。ドラッグで回転、矢印キーで回転、+と-で拡大せず視点高度を変更');
  canvas.style.touchAction='none';canvas.style.cursor='grab';
  canvas.addEventListener('pointerdown',e=>{
    if(e.button!==0)return;
    last=[e.clientX,e.clientY];canvas.focus();
    canvas.setPointerCapture(e.pointerId);canvas.style.cursor='grabbing';
  });
  canvas.addEventListener('pointermove',e=>{
    if(!last)return;
    azimuth+=(e.clientX-last[0])*0.45;
    elevation=Math.max(18,Math.min(85,elevation-(e.clientY-last[1])*0.35));
    last=[e.clientX,e.clientY];redraw();
  });
  const stopDrag=()=>{last=null;canvas.style.cursor='grab';};
  canvas.addEventListener('pointerup',stopDrag);
  canvas.addEventListener('pointercancel',stopDrag);
  canvas.addEventListener('keydown',e=>{
    if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home'].includes(e.key))return;
    e.preventDefault();
    if(e.key==='Home'){azimuth=cameraAzimuthDeg;elevation=cameraElevationDeg;}
    if(e.key==='ArrowLeft')azimuth-=8;
    if(e.key==='ArrowRight')azimuth+=8;
    if(e.key==='ArrowUp')elevation=Math.min(85,elevation+5);
    if(e.key==='ArrowDown')elevation=Math.max(18,elevation-5);
    redraw();
  });
}
const legend=document.createElement('div');
legend.setAttribute('role','note');
legend.textContent='黄土色：実在のPLATEAU建物1棟 ／ 灰・白：合成建物8棟 ／ 道路・緑地・青い水面：合成。ドラッグ／矢印で視点を回転';
legend.style.cssText='position:fixed;top:7px;left:8px;right:8px;padding:5px 8px;'+
 'background:rgba(15,23,42,.82);color:white;font:12px/1.5 sans-serif;'+
 'pointer-events:none;text-align:center;max-width:880px;margin:auto;';
document.body.append(legend);
gl.bindVertexArray(null);gl.bindBuffer(gl.ARRAY_BUFFER,null);
window.addEventListener('pagehide',()=>{
  gl.deleteBuffer(buffer);gl.deleteVertexArray(vao);gl.deleteProgram(program);
  gl.deleteProgram(shadowProgram);gl.deleteTexture(shadowTexture);gl.deleteFramebuffer(shadowFbo);
},{once:true});
return {checkpoints,pick};
