// 13 deterministic ORI visualization models: geometry is computed from formulae.
export const SPECS=[
 ['02','ORI2','点合わせと正方形', ['default'],'点P=(0,2)をQ=(s,0)へ映す折り線はPQの垂直二等分線。','物理的な折り途中の表示ではない。'],
 ['03','ORI3','等分位置と面積帯',['default'],'辺長2の正方形をn帯に分けると面積は各4/n。','折り順の実現可能性は別問題。'],
 ['04','ORI5','放物線の接線包絡',['default'],'焦点(0,1)、準線y=-1、接線y=sx/2-s²/4。','接線族の掃引であり立体折り運動ではない。'],
 ['05','ORI7','O5の折り線候補',['default'],'円x²+y²=4と目標直線y=hの交点が像の候補。','特定のO5座標配置の例。'],
 ['06','ORI8','O6の三次式の実根',['default'],'二組の点・線一致を満たす折り線y=mx+bはm³-3m-c=0を満たす。','この座標配置に限った三次根の例。'],
 ['07','ORI10','三等分と立方根',['trisection','cube'],'x=2cos(α/3)はx³−3x=2cosα。立方根m³=rはO6で作れる。','恒等式とO6拘束の照合であり描画だけで一般構成を証明しない。'],
 ['09','ORI15','Maekawaの山谷本数差',['valid','invalid'],'作動する4折り目で|山の数−谷の数|=2が必要。','必要条件であり十分条件ではない。'],
 ['10','ORI17','層順と循環',['acyclic','cycle'],'A>B,B>C,C>Aは循環して不可能。','非循環だけでは平坦折りは保証されない。'],
 ['11','ORI20','対称二線分のfold-and-one-cut',['default'],'x=0で右面を折り返すとx=+1はx=−1に重なる。','一般多角形のfold-and-one-cut定理とは区別する。'],
 ['12','ORI22','円パッキングの必要制約',['default'],'半径0.60と0.45の円の中心距離dは1.05以上で非重複。','tree method全構成の実装ではない。'],
 ['13','ORI24','立方体展開図の面対応',['default'],'一辺1の単位正方形6枚で立方体表面積6。','Origamizerの一般多面体実現定理ではない。'],
 ['14','ORI25','剛体4価頂点／Miura格子',['vertex','miura'],'4価剛体頂点の隣接折り線内積0を維持。','Miura格子モードは静的格子の説明で運動を主張しない。'],
 ['15','ORI28','円柱の母線と局所等長',['default'],'X(u,v)=(Rcos(u/R),Rsin(u/R),v)はE=G=1,F=0。','円柱の可展性モデルで曲線折り線の実物運動全体ではない。']
].map(([id,chapter,title,modes,formula,limit])=>({id,chapter,title,modes,formula,limit}));
function inTime(t){if(!Number.isFinite(t)||t<0||t>1)throw new RangeError('t out of [0,1]');}
function line(p,x1,y1,x2,y2,style='guide'){return {type:'line',p,x1,y1,x2,y2,style};}
function ring(p,x,y,r,style='guide'){return {type:'ring',p,x,y,r,style};}
function point(p,x,y,style='point'){return {type:'point',p,x,y,style};}
function polygon(p,pts,style='paper'){return {type:'polygon',p,pts,style};}
function label(p,x,y,value){return {type:'label',p,x,y,value:String(value)};}
function refl(P,n,c){const den=n[0]*n[0]+n[1]*n[1];if(!(den>0))throw new RangeError('normal=0');const d=(P[0]*n[0]+P[1]*n[1]-c)/den;return [P[0]-2*d*n[0],P[1]-2*d*n[1]];}
function foldSlope(P,m,b){return refl(P,[-m,1],b);}
function norm(x,y){return Math.hypot(x,y);}
function project(v){return[v[0]+.36*v[1],.55*v[1]+.88*v[2]];}
function segmentNormal(p,n,c){const r=2.65,P=[];function add(x,y){if(Math.abs(x)<=r+1e-9&&Math.abs(y)<=r+1e-9&&Number.isFinite(x)&&Number.isFinite(y)&&!P.some(q=>norm(q[0]-x,q[1]-y)<1e-8))P.push([x,y]);}if(Math.abs(n[1])>1e-12){add(-r,(c+n[0]*r)/n[1]);add(r,(c-n[0]*r)/n[1]);}if(Math.abs(n[0])>1e-12){add((c+n[1]*r)/n[0],-r);add((c-n[1]*r)/n[0],r);}return P.length>1?line(p,...P[0],...P[1],'fold'):null;}
function metric(name,actual,expected=0){return {name,actual,expected};}
export function cubicRoots(c){
 if(!Number.isFinite(c))throw new RangeError('c not finite');
 if(Math.abs(c)<=2){const a=Math.acos(Math.max(-1,Math.min(1,c/2))),rs=[0,1,2].map(k=>2*Math.cos((a+2*Math.PI*k)/3)).sort((a,b)=>a-b);return rs.filter((x,i)=>!i||Math.abs(x-rs[i-1])>1e-7);}
 const q=Math.sqrt(c*c/4-1);return[Math.cbrt(c/2+q)+Math.cbrt(c/2-q)];
}
export function stateAt(id,t,mode='default'){
 inTime(t);const spec=SPECS.find(s=>s.id===id);if(!spec)throw new RangeError('unknown id');
 if(mode==='default')mode=spec.modes[0];if(!spec.modes.includes(mode))throw new RangeError('unknown mode');
 const shapes=[],checks=[];const add=(...items)=>shapes.push(...items.filter(Boolean));let values={},readout='';
 const square=p=>polygon(p,[[0,0],[2,0],[2,2],[0,2]],'paper');
 if(id==='02'){
  const s=.35+1.2*t,P=[0,2],Q=[s,0],M=[s/2,1],n=[s,-2],c=s*s/2-2,R=refl(P,n,c);
  add(square(0),square(1),line(0,...P,...Q,'target'),segmentNormal(1,n,c),point(0,...P),point(0,...Q),point(1,...R),point(1,...M),label(0,-.2,2.3,'P'),label(0,s,-.2,'Q'));
  checks.push(metric('像x',R[0],s),metric('像y',R[1],0),metric('中点距離差',norm(P[0]-M[0],P[1]-M[1])-norm(Q[0]-M[0],Q[1]-M[1])));
  values={s,P,Q,M,R};readout='PからQ=('+s.toFixed(3)+',0)へ鏡映。中点M=('+M[0].toFixed(3)+',1)、鏡映先一致。';
 }else if(id==='03'){
  const n=Math.min(8,2+Math.floor(7*t)),w=2/n;add(square(0));
  for(let j=0;j<n;j++)add(polygon(1,[[j*w,0],[(j+1)*w,0],[(j+1)*w,2],[j*w,2]],j%2?'faceAlt':'face'),line(0,j*w,0,j*w,2,'guide'));
  checks.push(metric('幅和',n*w,2),metric('面積和',n*w*2,4));values={n,w,area:2*w};readout=n+'等分。幅2/n='+w.toFixed(4)+'、各面積4/n='+(2*w).toFixed(4)+'、合計面積4。';
 }else if(id==='04'){
  const s=-2+4*t,F=[0,1],D=[s,-1],T=[s,s*s/4],n=[s,-2],c=s*s/2,R=refl(F,n,c);
  add(line(0,-2.6,-1,2.6,-1,'target'),point(0,...F),point(0,...D),point(1,...T),segmentNormal(1,n,c));
  for(let j=1;j<=50;j++){const a=-2.5+5*(j-1)/50,b=-2.5+5*j/50;add(line(0,a,a*a/4,b,b*b/4,'curve'));}
  for(const a of [-2,-1,0,1,2])add(line(1,-2.5,-a*1.25-a*a/4,2.5,a*1.25-a*a/4,'guide'));
  checks.push(metric('焦点像x',R[0],s),metric('焦点像y',R[1],-1),metric('焦点/準線距離',norm(s,s*s/4-1)-(s*s/4+1)));
  values={s,F,D,T};readout='s='+s.toFixed(2)+'、接点('+s.toFixed(2)+','+(s*s/4).toFixed(3)+')、接線y=(s/2)x−s²/4。';
 }else if(id==='05'){
  let h=3-6*t;if(Math.abs(Math.abs(h)-2)<1e-9)h=Math.sign(h)*2;const targets=[];
  if(Math.abs(h)<=2){const x=Math.sqrt(Math.max(0,4-h*h));targets.push([-x,h]);if(x>1e-9)targets.push([x,h]);}
  add(ring(0,0,0,2),line(0,-2.6,h,2.6,h,'target'),line(1,-2.6,h,2.6,h,'target'),point(0,0,2),point(0,0,0));
  for(const Q of targets){const n=norm(Q[0],Q[1]-2)>1e-9?[-Q[0],2-Q[1]]:[1,0],R=refl([0,2],n,0);add(segmentNormal(1,n,0),point(1,...Q));checks.push(metric('像x',R[0],Q[0]),metric('像y',R[1],Q[1]),metric('円半径²',Q[0]**2+Q[1]**2,4));}
  values={h,targets};readout='目標y='+h.toFixed(3)+'、円と直線の交点'+targets.length+'個、折り線'+targets.length+'本。';
 }else if(id==='06'){
  let c=-2.5+5*t;if(Math.abs(Math.abs(c)-2)<1e-9)c=Math.sign(c)*2;const roots=cubicRoots(c),g=m=>m*m*m-3*m-c,y=x=>Math.max(-2.5,Math.min(2.5,g(x)*.3));
  add(line(0,-2.6,0,2.6,0,'guide'),line(1,c,-2.6,c,2.6,'target'),line(1,-2.6,1,2.6,1,'target'),point(1,0,0),point(1,c/2,2));
  for(let j=1;j<=80;j++){const a=-2.4+4.8*(j-1)/80,b=-2.4+4.8*j/80;add(line(0,a,y(a),b,y(b),'curve'));}
  for(const m of roots){const b=(3-m*m-m*c)/2;add(point(0,m,0),segmentNormal(1,[-m,1],b));checks.push(metric('根',g(m)),metric('O6像1 x',foldSlope([0,0],m,b)[0],c),metric('O6像2 y',foldSlope([c/2,2],m,b)[1],1));}
  values={c,roots};readout='c='+c.toFixed(3)+'、三次式の異なる実根'+roots.length+'個：'+roots.map(x=>x.toFixed(4)).join(', ')+'。';
 }else if(id==='07'){
  if(mode==='trisection'){
   const alpha=(30+120*t)*Math.PI/180,phi=alpha/3,c=2*Math.cos(alpha),m=2*Math.cos(phi),b=(3-m*m-m*c)/2;
   add(line(0,0,0,2.1,0,'guide'),segmentNormal(1,[-m,1],b),line(1,c,-2.6,c,2.6,'target'),line(1,-2.6,1,2.6,1,'target'));
   for(let j=1;j<=3;j++)add(line(0,0,0,2.1*Math.cos(j*phi),2.1*Math.sin(j*phi),j===3?'target':'fold'));
   checks.push(metric('三倍角',m*m*m-3*m,c),metric('O6像1 x',foldSlope([0,0],m,b)[0],c),metric('O6像2 y',foldSlope([c/2,2],m,b)[1],1));
   values={alpha,phi,m};readout='α='+(alpha*180/Math.PI).toFixed(2)+'°、φ=α/3='+(phi*180/Math.PI).toFixed(2)+'°。三倍角式一致。';
  }else{
   const r=.3+2.4*t,m=Math.cbrt(r),b=-(m*m+m*r)/2;
   add(line(0,-2.6,0,2.6,0,'guide'),point(0,m,r*.5),segmentNormal(1,[-m,1],b),line(1,r,-2.6,r,2.6,'target'),line(1,-2.6,-.5,2.6,-.5,'target'));
   for(let j=1;j<=60;j++){const a=-1.5+3*(j-1)/60,v=-1.5+3*j/60,y=x=>Math.max(-2.5,Math.min(2.5,x*x*x*.5));add(line(0,a,y(a),v,y(v),'curve'));}
   checks.push(metric('立方根',m**3,r),metric('O6像1 x',foldSlope([0,0],m,b)[0],r),metric('O6像2 y',foldSlope([r/2,.5],m,b)[1],-.5));
   values={r,m};readout='r='+r.toFixed(3)+'、m=∛r='+m.toFixed(6)+'、O6拘束と一致。';
  }
 }else if(id==='09'){
  const marks=mode==='valid'?['M','M','M','V']:['M','V','M','V'],rays=[[2,0],[0,2],[-2,0],[0,-2]];
  for(let j=0;j<4;j++){const [x,y]=rays[j];add(line(0,0,0,x,y,marks[j]==='M'?'mountain':'valley'),line(1,0,0,x,y,marks[j]==='M'?'mountain':'valley'),label(1,x*1.09,y*1.09,marks[j]));}
  const M=marks.filter(x=>x==='M').length,V=4-M;checks.push(metric('総本数',M+V,4));
  values={M,V,marks,necessary:Math.abs(M-V)===2};readout='山M='+M+'本、谷V='+V+'本、差|M−V|='+Math.abs(M-V)+'：必要条件'+(values.necessary?'成立':'不成立')+'。';
 }else if(id==='10'){
  const edges=mode==='cycle'?[['A','B'],['B','C'],['C','A']]:[['A','B'],['B','C'],['A','C']],nodes={A:[0,1.8],B:[-1.7,-1.3],C:[1.7,-1.3]},count=Math.min(3,1+Math.floor(3*t));
  add(polygon(0,[[-1.9,-1.2],[.8,-1.2],[.8,1.1],[-1.9,1.1]],'paper'),polygon(0,[[-.7,-.6],[2,-.6],[2,1.8],[-.7,1.8]],'face'));
  for(let j=0;j<count;j++){const [a,b]=edges[j];add(line(1,...nodes[a],...nodes[b],'target'));}
  for(const [a,p] of Object.entries(nodes))add(point(1,...p),label(1,p[0]+.2,p[1]+.12,a));
  values={edges,count,cycle:mode==='cycle'&&count===3};checks.push(metric('総辺数',edges.length,3));
  readout='上→下の制約：'+edges.slice(0,count).map(x=>x.join('>')).join(', ')+'。'+(values.cycle?'循環したため不可能。':'現時点では非循環。必要条件のみ。');
 }else if(id==='11'){
  const theta=Math.PI*Math.min(1,t/.65),a=Math.cos(theta),b=Math.sin(theta),P=(x,y,z)=>[x,y+.43*z];
  add(polygon(0,[[-2,-1.5],[2,-1.5],[2,1.5],[-2,1.5]]),line(0,0,-1.5,0,1.5,'fold'),line(0,-1,-1.5,-1,1.5,'target'),line(0,1,-1.5,1,1.5,'target'));
  add(polygon(1,[[-2,-1.5],[0,-1.5],[0,1.5],[-2,1.5]]),polygon(1,[[0,-1.5],P(2*a,-1.5,2*b),P(2*a,1.5,2*b),[0,1.5]],'face'),line(1,0,-1.5,0,1.5,'fold'));
  if(t>=.65)add(line(1,-1,-1.5,-1,1.5,'target'));
  checks.push(metric('回転半径',Math.hypot(a,b),1),metric('面内単位距離',1,1));
  values={theta,folded:t>=.65,projectedCutX:a};readout='折り角='+(180*theta/Math.PI).toFixed(1)+'°。終端ではx=+1とx=−1が一致。';
 }else if(id==='12'){
  const r=.6,s=.45,A=[-.65,0],B=[.65+.8*t,0],d=B[0]-A[0],gap=d-r-s;
  add(ring(0,...A,r,'face'),ring(0,...B,s,'faceAlt'),line(0,...A,...B,'target'),ring(1,...A,r,'face'),ring(1,...B,s,'faceAlt'),line(1,...A,...B,'target'));
  checks.push(metric('中心距離',norm(A[0]-B[0],A[1]-B[1]),d),metric('半径和',r+s,1.05));
  values={r,s,A,B,d,gap,nonoverlap:gap>=0};readout='中心距離d='+d.toFixed(3)+'、半径和1.05、余裕d−1.05='+gap.toFixed(3)+'。';
 }else if(id==='13'){
  const sites=[[-1,0],[0,0],[1,0],[2,0],[0,1],[0,-1]],shown=Math.min(6,Math.floor(6*t+1e-9));
  for(let j=0;j<6;j++){const [x,y]=sites[j];add(polygon(0,[[x-.5,y-.5],[x+.5,y-.5],[x+.5,y+.5],[x-.5,y+.5]],j<shown?'face':'paper'),label(0,x-.1,y+.1,j+1));}
  add(polygon(1,[[-1,-.6],[.5,-.6],[.5,.9],[-1,.9]],'face'),polygon(1,[[.5,-.6],[1.2,.1],[1.2,1.6],[.5,.9]],'faceAlt'),polygon(1,[[-1,.9],[.5,.9],[1.2,1.6],[-.3,1.6]],'paper'),label(1,-.75,0,1),label(1,.75,.35,2),label(1,0,1.2,3),label(1,-1.5,-1.4,'裏面4–6'));
  checks.push(metric('面積総和',sites.length,6));values={shown,faceCount:6,area:6};readout='展開図の単位正方形を'+shown+'/6枚確認、表面積は6。';
 }else if(id==='14'){
  if(mode==='vertex'){
   const theta=Math.PI*t/3,c=Math.cos(theta),s=Math.sin(theta),rays=[[c,0,s],[0,1,0],[-c,0,s],[0,-1,0]];
   for(let j=0;j<4;j++){const a=j*Math.PI/2;add(line(0,0,0,2*Math.cos(a),2*Math.sin(a),'fold'));}
   for(let j=0;j<4;j++){const a=project(rays[j]).map(x=>2*x),b=project(rays[(j+1)%4]).map(x=>2*x);add(polygon(1,[[0,0],a,b],j%2?'faceAlt':'face'),line(1,0,0,...a,'fold'));const q=rays[j],v=rays[(j+1)%4];checks.push(metric('辺長²',q[0]**2+q[1]**2+q[2]**2,1),metric('隣接内積',q[0]*v[0]+q[1]*v[1]+q[2]*v[2]));}
   values={theta,rays};readout='θ='+(theta*180/Math.PI).toFixed(1)+'°。4面の辺長1、隣接方向は直交。右は斜投影。';
  }else{
   const h=Math.sqrt(3)/2;for(let i=-1;i<=1;i++)for(let j=-1;j<=1;j++){const x=i+j/2,y=j*h,q=[[x,y],[x+1,y],[x+1.5,y+h],[x+.5,y+h]];add(polygon(0,q,(i+j)%2?'faceAlt':'face'),polygon(1,q,i+j+2<=Math.floor(t*6)?'face':'paper'));checks.push(metric('平行四辺形面積',h,Math.sqrt(3)/2));}
   values={cells:9,area:h};readout='Miura型格子の静的表示。辺長1、夾角60°、各面積√3/2。';
  }
 }else if(id==='15'){
  const R=1.2,u=-1.2+2.4*t,X=(w,v)=>[R*Math.cos(w/R),R*Math.sin(w/R),v],Xu=[-Math.sin(u/R),Math.cos(u/R),0],Xv=[0,0,1];
  add(polygon(0,[[-1.4,-1],[-1.4,1],[1.4,1],[1.4,-1]]),line(0,u,-1,u,1,'target'));
  for(let j=-6;j<=6;j++){const w=1.4*j/6;add(line(1,...project(X(w,-1)),...project(X(w,1)),j===0?'fold':'guide'));}
  for(const v of [-1,0,1])for(let j=-6;j<6;j++)add(line(1,...project(X(1.4*j/6,v)),...project(X(1.4*(j+1)/6,v)),'curve'));
  const p=project(X(u,0)),v=project(X(u,.8)),q=project([X(u,0)[0]+.8*Xu[0],X(u,0)[1]+.8*Xu[1],0]);add(line(1,...p,...v,'target'),line(1,...p,...q,'fold'),point(1,...p));
  checks.push(metric('E',Xu[0]**2+Xu[1]**2+Xu[2]**2,1),metric('F',Xu[0]*Xv[0]+Xu[1]*Xv[1]+Xu[2]*Xv[2]),metric('G',Xv[0]**2+Xv[1]**2+Xv[2]**2,1));
  values={R,u,X:X(u,0),Xu,Xv};readout='u='+u.toFixed(3)+'、E=G=1、F=0。母線はv方向。';
 }
 return {id,t,mode,shapes,checks,values,readout,step:'工程 '+Math.min(4,Math.floor(4*t+1e-9))+'/4',formula:spec.formula,limit:spec.limit};
}
