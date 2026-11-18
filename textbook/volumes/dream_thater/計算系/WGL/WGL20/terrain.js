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
draw(counts.terrain);draw(counts.building);
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
report('DRAW','terrain '+counts.terrain/3+' triangles, official building '+
  counts.building/3+' triangles, water '+counts.water/3+' triangles, '+drawCalls+' calls');
report('WARN','Z exaggeration '+zExaggeration+' changes visual geometry only; not elevation data. Terrain is not measured.');
report('ATTR','official sample measuredHeight='+data.source.heightAttributeM+
  ' m; usage code in original GML; absent municipality/year are not guessed');
const checkpoints={firstLocal:positions.slice(0,3),vertices:positions.length/3,
  triangles:triangles.length/3,waterLevelM,groundAtOriginM:dem(0,0),
  depthAtOriginM:depth(0,0),zExaggeration,drawCalls};
gl.bindVertexArray(null);gl.bindBuffer(gl.ARRAY_BUFFER,null);
gl.deleteBuffer(buffer);gl.deleteVertexArray(vao);gl.deleteProgram(program);
return {checkpoints};
