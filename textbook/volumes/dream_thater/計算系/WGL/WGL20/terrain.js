// WGL20: real LOD1 sample and entirely synthetic DEM / water; no solver.
const scenario='BASE';       // BASE, CS1, CS2, CS3
const zExaggeration=1.5;     // visual multiplier only; never change input elevations
const waterLevelM=32.0;     // invented absolute water surface level in dataset vertical datum
const usePlateau=true;       // false leaves a complete synthetic terrain experiment
const showWater=true;        // transparent water is a hypothetical surface
const gridSteps=4;           // 4x4 cells with 5x5 DEM vertices
if(!['BASE','CS1','CS2','CS3'].includes(scenario)||
   !Number.isFinite(zExaggeration)||zExaggeration<0.1||zExaggeration>5||
   !Number.isFinite(waterLevelM)||waterLevelM<20||waterLevelM>50||
   !Number.isInteger(gridSteps)||gridSteps<2||gridSteps>32)throw new RangeError('unsafe WGL20 settings');
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
const add=(p,kind,color=[0,0,0])=>vertices.push(...p,kind,...color);
const tri=(p,q,r,kind,color)=>{add(p,kind,color);add(q,kind,color);add(r,kind,color)};
const counts={terrain:0,building:0,water:0,diagnostic:0};
const lo=-40,hi=40,delta=(hi-lo)/gridSteps;
for(let j=0;j<gridSteps;j++)for(let i=0;i<gridSteps;i++){
  const x=lo+i*delta,y=lo+j*delta;
  const p=[[x,y],[x+delta,y],[x+delta,y+delta],[x,y+delta]];
  const ground=p.map(([ex,no])=>[ex,no,dem(ex,no)-h0]);
  tri(ground[0],ground[1],ground[2],0);tri(ground[0],ground[2],ground[3],0);
  counts.terrain+=6;
}
if(usePlateau){
  for(let i=0;i<triangles.length;i+=3){
    const get=k=>positions.slice(3*triangles[k],3*triangles[k]+3);
    tri(get(i),get(i+1),get(i+2),1);counts.building+=3;
  }
}
if(showWater){
  for(let j=0;j<gridSteps;j++)for(let i=0;i<gridSteps;i++){
    const x=lo+i*delta,y=lo+j*delta,z=waterLevelM-h0;
    const p=[[x,y,z],[x+delta,y,z],[x+delta,y+delta,z],[x,y+delta,z]];
    if(depth(x+delta/2,y+delta/2)>0){
      tri(p[0],p[1],p[2],2);tri(p[0],p[2],p[3],2);counts.water+=6;
    }
  }
}
// Fixed 12-pixel-high diagnostic band allows independent RGBA8 checking.
// The band is not a geographic object and is rendered without depth testing.
const band=24/canvas.height;
const keys=[[32,96,64],[24,98,210],[172,78,42],[16,24,40]];
for(let i=0;i<4;i++){
  const x0=-1+i*0.5,x1=x0+0.5,y0=-1,y1=-1+band;
  const color=keys[i].map(k=>k/255);
  tri([x0,y0,0],[x1,y0,0],[x1,y1,0],3,color);
  tri([x0,y0,0],[x1,y1,0],[x0,y1,0],3,color);
  counts.diagnostic+=6;
}
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
for(const [loc,len,offset] of [[0,3,0],[1,1,12],[2,3,16]]){
 gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,len,gl.FLOAT,false,28,offset);
}
gl.useProgram(program);
const unit=v=>{const d=Math.hypot(...v);return v.map(x=>x/d)};
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const eye=unit([1,-1,1]),right=unit(cross([0,0,1],eye)),up=unit(cross(eye,right));
const vec3=(name,a)=>{const loc=gl.getUniformLocation(program,name);if(loc===null)throw new Error('missing '+name);gl.uniform3fv(loc,a)};
vec3('u_eye',eye);vec3('u_right',right);vec3('u_up',up);
vec3('u_center',[0,0,7*zExaggeration]);
gl.uniform2f(gl.getUniformLocation(program,'u_extent'),60,45);
gl.uniform1f(gl.getUniformLocation(program,'u_zScale'),zExaggeration);
gl.uniform1i(gl.getUniformLocation(program,'u_attributeMode'),scenario==='CS2'?1:0);
gl.viewport(0,0,canvas.width,canvas.height);
gl.clearColor(16/255,24/255,40/255,1);
gl.clearDepth(1);gl.disable(gl.CULL_FACE);gl.disable(gl.DITHER);
gl.disable(gl.BLEND);gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LESS);
gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
let first=0,drawCalls=0;
const draw=(n)=>{if(n){gl.drawArrays(gl.TRIANGLES,first,n);drawCalls++;}first+=n};
draw(counts.terrain);
if(scenario==='CS2'){
  // Identical geometry, but intentionally partition into eight triangle batches.
  // This demonstrates draw-call cost, not instancing and not a speed guarantee.
  const group=11*3;
  let remaining=counts.building;
  while(remaining>0){const n=Math.min(group,remaining);draw(n);remaining-=n;}
}else draw(counts.building);
if(showWater){
 gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
 gl.depthMask(false);draw(counts.water);gl.depthMask(true);gl.disable(gl.BLEND);
}else draw(0);
gl.disable(gl.DEPTH_TEST);draw(counts.diagnostic);
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
report('DRAW','terrain '+counts.terrain/3+' triangles, official building '+
  counts.building/3+' triangles, water '+counts.water/3+' triangles, '+drawCalls+' calls');
report('WARN','Z exaggeration '+zExaggeration+' changes visual geometry only; not elevation data. Terrain is not measured.');
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
    'void main(){outColor=vec4(v_kind>0.5?1.0/255.0:0.0,0.0,0.0,1.0);}',
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
  set3('u_center',[0,0,7*zExaggeration]);
  gl.uniform2f(gl.getUniformLocation(idProgram,'u_extent'),60,45);
  gl.uniform1f(gl.getUniformLocation(idProgram,'u_zScale'),zExaggeration);
  gl.bindVertexArray(vao);gl.disable(gl.BLEND);gl.enable(gl.DEPTH_TEST);
  gl.depthMask(true);gl.depthFunc(gl.LESS);gl.clearColor(0,0,0,1);
  gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES,0,counts.terrain);
  gl.drawArrays(gl.TRIANGLES,counts.terrain,counts.building);
  gl.bindFramebuffer(gl.FRAMEBUFFER,null);
  const projectPoint=(base)=>{
    const q=[vertices[base],vertices[base+1],
      vertices[base+2]*zExaggeration-7*zExaggeration];
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
    for(let k=0;k<counts.terrain+counts.building;k+=3){
      const a=projectPoint(k*7),bb=projectPoint((k+1)*7),cc=projectPoint((k+2)*7);
      const ax=a[0]/60,ay=a[1]/45,bx=bb[0]/60,by=bb[1]/45,cx=cc[0]/60,cy=cc[1]/45;
      const det=(bx-ax)*(cy-ay)-(by-ay)*(cx-ax);
      if(Math.abs(det)<1e-10)continue;
      const beta=((px-ax)*(cy-ay)-(py-ay)*(cx-ax))/det;
      const gamma=((bx-ax)*(py-ay)-(by-ay)*(px-ax))/det;
      const alpha=1-beta-gamma;
      if(Math.min(alpha,beta,gamma)<-1e-6)continue;
      const z=(alpha*a[2]+beta*bb[2]+gamma*cc[2])/120;
      if(z<closest&&z>=-1&&z<=1){closest=z;cpuId=k<counts.terrain?0:1;}
    }
    return {gpuId:pixel[0],cpuId};
  };
  report('PICK','CS1 click/keyboard selects building ID1, ground/background ID0; edges may differ by rasterization');
  // The temporary ID program/FBO survive only inside this disposable sandbox iframe.
  // On stop/re-run the entire isolated context is destroyed, including these resources.
}
gl.bindVertexArray(null);gl.bindBuffer(gl.ARRAY_BUFFER,null);
gl.deleteBuffer(buffer);gl.deleteVertexArray(vao);gl.deleteProgram(program);
return {checkpoints,pick};
