// FCG9: the FCG8 horizontal-shear, cell-centred semi-Lagrange model.
// The same Float64 samples generate the displayed contour and side mesh.
const N=12;
const steps=0;
const heightM=0.2;
const mode='face';
if(!Number.isInteger(N)||N<12||N>96||!Number.isInteger(steps)||steps<0||steps>24||
   !Number.isFinite(heightM)||heightM<0.1||heightM>0.4||!['wire','face','gradient'].includes(mode))
  throw RangeError('N=12..96, steps=0..24, heightM=0.1..0.4, wire/face/gradient');
const h=1/N,dt=0.04,shear=0.6,radius=0.18;
const id=(i,j)=>i+N*j,point=k=>[(k%N+0.5)*h,(Math.floor(k/N)+0.5)*h];
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const initial=()=>Float64Array.from({length:N*N},(_,k)=>{
  const [x,y]=point(k);return Math.hypot(x-0.5,y-0.5)-radius;
});
function advect(field){
  // FCG8's backward characteristic keeps y fixed, so its bilinear
  // interpolation reduces to one-dimensional linear interpolation per row.
  const next=new Float64Array(field.length);
  for(let j=0;j<N;j++)for(let i=0;i<N;i++){
    const x=clamp(i-dt*shear*((j+0.5)*h-0.5)/h,0,N-1);
    const k=Math.floor(x),s=x-k;
    next[id(i,j)]=(1-s)*field[id(k,j)]+s*field[id(Math.min(k+1,N-1),j)];
  }
  return next;
}
function extract(field){
  const phi=Float64Array.from(field,v=>v===0?1e-12:v);
  const vertices=[],segments=[],cache=new Map();
  let saddles=0,ties=0;
  function gradient(k){
    const i=k%N,j=Math.floor(k/N),l=Math.max(0,i-1),r=Math.min(N-1,i+1),
      b=Math.max(0,j-1),t=Math.min(N-1,j+1);
    return [(phi[id(r,j)]-phi[id(l,j)])/((r-l)*h),
      (phi[id(i,t)]-phi[id(i,b)])/((t-b)*h)];
  }
  function vertex(i,j){
    const a=Math.min(i,j),b=Math.max(i,j),key=a+':'+b;
    if(cache.has(key))return cache.get(key);
    const s=-phi[a]/(phi[b]-phi[a]),p=point(a),q=point(b),g=gradient(a),k=gradient(b);
    const index=vertices.length;
    vertices.push({p:p.map((x,d)=>x+s*(q[d]-x)),g:g.map((x,d)=>x+s*(k[d]-x)),edge:[a,b]});
    cache.set(key,index);return index;
  }
  for(let j=0;j<N-1;j++)for(let i=0;i<N-1;i++){
    const k=[id(i,j),id(i+1,j),id(i+1,j+1),id(i,j+1)],v=k.map(i=>phi[i]);
    const crossed=[0,1,2,3].filter(e=>(v[e]<0)!==(v[(e+1)%4]<0));
    let pairs=[];
    if(crossed.length===2)pairs=[crossed];
    if(crossed.length===4){
      saddles++;const Q=v[0]*v[2]-v[1]*v[3];if(Q===0)ties++;
      pairs=Q>=0?[[0,1],[2,3]]:[[0,3],[1,2]];
    }
    for(let [a,b] of pairs){
      // CCW cell boundary crosses from negative to positive at start.
      if(v[a]>0)[a,b]=[b,a];
      segments.push([vertex(k[a],k[(a+1)%4]),vertex(k[b],k[(b+1)%4])]);
    }
  }
  const degree=new Array(vertices.length).fill(0);
  let perimeter=0;
  for(const [a,b] of segments){
    degree[a]++;degree[b]++;
    const p=vertices[a].p,q=vertices[b].p;
    perimeter+=Math.hypot(q[0]-p[0],q[1]-p[1]);
  }
  return {vertices,segments,degree,perimeter,saddles,ties};
}
const compile=(type,src)=>{
  const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);
  if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));
  return s;
};
const program=gl.createProgram(),vs=compile(gl.VERTEX_SHADER,vertexSource),fs=compile(gl.FRAGMENT_SHADER,fragmentSource);
gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);
if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program));
gl.deleteShader(vs);gl.deleteShader(fs);gl.useProgram(program);
const loc=name=>{const x=gl.getUniformLocation(program,name);if(x===null)throw Error('missing '+name);return x;};
const uView=loc('u_view'),uAspect=loc('u_aspect'),uHeight=loc('u_height'),
  uColor=loc('u_color'),uLit=loc('u_lit');
const vao=gl.createVertexArray(),buffer=gl.createBuffer();gl.bindVertexArray(vao);gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
gl.enableVertexAttribArray(0);gl.vertexAttribPointer(0,3,gl.FLOAT,false,24,0);
gl.enableVertexAttribArray(1);gl.vertexAttribPointer(1,3,gl.FLOAT,false,24,12);
gl.disable(gl.DITHER);gl.disable(gl.BLEND);gl.disable(gl.CULL_FACE);
const add=(arr,p,z=0,n=[0,0,1])=>arr.push(p[0],p[1],z,...n);
const rgb=(r,g,b)=>[r/255,g/255,b/255];
function draw(data,primitive,color,lit=false){
  if(!data.length)return;
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.DYNAMIC_DRAW);
  gl.uniform3fv(uColor,color);gl.uniform1i(uLit,lit?1:0);gl.drawArrays(primitive,0,data.length/6);
}
function panels(){
  const w=canvas.width,h=canvas.height;
  if(w>=h){const a=Math.floor(w/2);return [[0,0,a,h],[a,0,w-a,h]];}
  const a=Math.floor(h/2);return [[0,a,w,h-a],[0,0,w,a]];
}
function viewport(box,view){
  gl.viewport(...box);gl.uniform1i(uView,view);
  gl.uniform1f(uAspect,box[2]/box[3]);gl.uniform1f(uHeight,heightM);
}
function build(field,mesh){
  const grid=[],inside=[],outside=[],outline=[],wire=[],solid=[];
  const first=h/2,last=1-h/2;
  for(let i=0;i<N;i++){
    const x=(i+0.5)*h;
    add(grid,[x,first]);add(grid,[x,last]);add(grid,[first,x]);add(grid,[last,x]);
  }
  if(N<=24)for(let k=0;k<field.length;k++)add(field[k]<0?inside:outside,point(k));
  for(const [a,b] of mesh.segments){
    const va=mesh.vertices[a],vb=mesh.vertices[b],p=va.p,q=vb.p,
      dx=q[0]-p[0],dy=q[1]-p[1],len=Math.hypot(dx,dy);
    if(!(len>0))continue;
    const normal=[dy/len,-dx/len,0],thick=0.004;
    const offset=[normal[0]*thick,normal[1]*thick];
    const pa=p.map((v,i)=>v+offset[i]),pb=p.map((v,i)=>v-offset[i]),
      qa=q.map((v,i)=>v+offset[i]),qb=q.map((v,i)=>v-offset[i]);
    for(const v of [pa,pb,qb,pa,qb,qa])add(outline,v);
    const norm=v=>{
      if(mode!=='gradient')return normal;
      const l=Math.hypot(...v.g);return l>1e-12?[v.g[0]/l,v.g[1]/l,0]:normal;
    };
    for(const [v,z] of [[va,0],[vb,0],[vb,heightM],[va,0],[vb,heightM],[va,heightM]])
      add(solid,v.p,z,norm(v));
    for(const [v,z] of [[va,0],[vb,0],[vb,0],[vb,heightM],[vb,heightM],[va,heightM],
                         [va,heightM],[va,0],[va,0],[vb,heightM]])add(wire,v.p,z);
  }
  return {grid,inside,outside,outline,wire,solid};
}
let field=initial(),current=0;
for(;current<steps;current++)field=advect(field);
function render(){
  const mesh=extract(field),b=build(field,mesh),[left,right]=panels();
  gl.viewport(0,0,canvas.width,canvas.height);
  gl.clearColor(17/255,24/255,39/255,1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
  gl.disable(gl.DEPTH_TEST);viewport(left,0);
  draw(b.grid,gl.LINES,rgb(53,68,90));draw(b.outline,gl.TRIANGLES,rgb(255,218,100));
  draw(b.inside,gl.POINTS,rgb(70,175,210));draw(b.outside,gl.POINTS,rgb(100,112,130));
  viewport(right,1);
  if(mode==='wire')draw(b.wire,gl.LINES,rgb(126,211,250));
  else{gl.enable(gl.DEPTH_TEST);draw(b.solid,gl.TRIANGLES,rgb(51,158,224),true);gl.disable(gl.DEPTH_TEST);}
  return mesh;
}
const mesh=render();
let residual=0;for(const {p:[x,y]} of mesh.vertices)
  residual=Math.max(residual,Math.abs(Math.hypot(x-shear*current*dt*(y-0.5)-0.5,y-0.5)-radius));
report('CONTOUR','N='+N+' cell centres/side; step='+current+', t='+(current*dt).toFixed(2)+' s; vertices='+mesh.vertices.length+', segments='+mesh.segments.length);
report('TOPOLOGY','degree != 2: '+mesh.degree.filter(v=>v!==2).length+'; saddle cells='+mesh.saddles+', ties='+mesh.ties);
report('GEOMETRY','perimeter='+mesh.perimeter.toFixed(6)+' m; side area='+(heightM*mesh.perimeter).toFixed(6)+' m²; triangles='+2*mesh.segments.length);
report('ERROR','max inverse-shear radial residual='+residual.toExponential(4)+' m (not physical distance after shear)');
report('DISPLAY','grid/contour then extruded side; '+mode+'; H='+heightM+' m; open top/bottom');

 // Advance the same editable computation; the first frame remains the audit snapshot.
let liveValue=steps,playing=false,timer=null;
function emit(){canvas.dispatchEvent(new CustomEvent('fcg-time-progress',{detail:{value:liveValue,playing}}));}
function cancel(){if(timer!==null)clearTimeout(timer);timer=null;playing=false;}
function advanceLive(value){if(value<current){field=initial();current=0;}for(;current<value;current++)field=advect(field);render();liveValue=value;}
function pause(){cancel();emit();}
function next(){return Math.min(24,Math.round((liveValue+1)*1e8)/1e8);}
function tick(){
 timer=null;if(!playing)return;
 try{advanceLive(next());if(liveValue>=24)cancel();emit();if(playing)timer=setTimeout(tick,40);}
 catch(error){cancel();canvas.dispatchEvent(new CustomEvent('fcg-time-failure',{detail:String(error?.message||error)}));}
}
function play(){if(playing)return;if(liveValue>=24)advanceLive(0);playing=true;emit();timer=setTimeout(tick,40);}
function step(){cancel();advanceLive(next());emit();}
function reset(){cancel();advanceLive(0);emit();}
canvas.addEventListener?.('webglcontextlost',cancel);
return {play,pause,step,reset,mesh,field,extract};

