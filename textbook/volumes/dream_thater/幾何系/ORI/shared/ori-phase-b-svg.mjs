// Stateless SVG renderer; authored points are internal, never arbitrary user HTML.
const S=52,X=[190,570],Y=215;
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function xy(p,x,y){return[(X[p]+S*x).toFixed(2),(Y-S*y).toFixed(2)];}
function itemMarkup(sh,poster){
 const c={guide:'#a2afb9',fold:'#195d83',target:'#ab4f2b',curve:'#814d88',mountain:'#195d83',valley:'#ae512f',face:'#a9dce8',faceAlt:'#f3d5a9',paper:'#eff4f6',point:'#204156',order:'#684e87'};
 const kind=sh.style||'guide',stroke=c[kind]||c.guide;
 const dash=kind==='fold'?'9 5':kind==='mountain'?'11 4':kind==='valley'?'2 6':kind==='guide'?'4 6':'';
 const sw=kind==='target'?3:kind==='curve'?2.4:kind==='guide'?1.5:2.2;
 const style='stroke="'+stroke+'" stroke-width="'+sw+'"'+(dash?' stroke-dasharray="'+dash+'"':'')+(kind==='order'?' marker-end="url(#ori-b-order-arrow)"':'');
 if(sh.type==='line'){
  // Clip the actual line geometry to the painted panel, rather than relying on
  // a clipPath alone: SVG lint also measures raw segment coordinates.
  const a=xy(sh.p,sh.x1,sh.y1).map(Number),b=xy(sh.p,sh.x2,sh.y2).map(Number);
  const x0=sh.p?406:26,x1=sh.p?734:354,y0=90,y1=381;
  const d=[b[0]-a[0],b[1]-a[1]];
  let lo=0,hi=1;
  for(const [p,q] of [[-d[0],a[0]-x0],[d[0],x1-a[0]],[-d[1],a[1]-y0],[d[1],y1-a[1]]]){
   if(Math.abs(p)<1e-10){if(q<0)return '';continue;}
   const r=q/p;
   if(p<0)lo=Math.max(lo,r);else hi=Math.min(hi,r);
   if(lo>hi)return '';
  }
  const u=[(a[0]+lo*d[0]).toFixed(2),(a[1]+lo*d[1]).toFixed(2)];
  const v=[(a[0]+hi*d[0]).toFixed(2),(a[1]+hi*d[1]).toFixed(2)];
  return '<line x1="'+u[0]+'" y1="'+u[1]+'" x2="'+v[0]+'" y2="'+v[1]+'" '+style+'/>';
 }
 if(sh.type==='ring'||sh.type==='point'){const a=xy(sh.p,sh.x,sh.y);return '<circle cx="'+a[0]+'" cy="'+a[1]+'" r="'+(sh.type==='point'?5.5:(sh.r*S).toFixed(2))+'" fill="'+(sh.type==='point'?c.point:'none')+'" '+style+'/>';}
 if(sh.type==='polygon'){const pts=sh.pts.map(v=>xy(sh.p,...v).join(',')).join(' ');return '<polygon points="'+pts+'" fill="'+(c[kind]||c.paper)+'" fill-opacity="'+(kind==='paper'?'.48':'.57')+'" '+style+'/>';}
 if(sh.type==='label'&&!poster){const a=xy(sh.p,sh.x,sh.y);return '<text x="'+a[0]+'" y="'+a[1]+'" font-family="system-ui,sans-serif" font-size="15" fill="#243c4f">'+esc(sh.value)+'</text>';}
 return '';
}
export function svgFrame(state,poster=false){
 const head=[
 '<defs><marker id="ori-b-order-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0 0 L6 3 L0 6" fill="none" stroke="#684e87" stroke-width="1.5"/></marker><clipPath id="ori-b-left"><rect x="24" y="89" width="332" height="294"/></clipPath><clipPath id="ori-b-right"><rect x="404" y="89" width="332" height="294"/></clipPath></defs>',
 '<rect x="2" y="2" width="756" height="426" rx="12" fill="#f8fbfd" stroke="#8ca3b3"/>',
 '<rect x="22" y="86" width="336" height="300" rx="8" fill="#fff" stroke="#a8b9c4"/>',
 '<rect x="402" y="86" width="336" height="300" rx="8" fill="#fff" stroke="#a8b9c4"/>',
 '<text x="26" y="39" font-size="20" font-weight="700" font-family="system-ui,sans-serif" fill="#243c4f">ORI-V'+state.id+'　'+esc(state.title||'数理状態の可視化')+'</text>',
 '<text x="35" y="73" font-size="17" font-family="system-ui,sans-serif" fill="#243c4f">元の条件・入力</text>',
 '<text x="418" y="73" font-size="17" font-family="system-ui,sans-serif" fill="#243c4f">対応先・検算</text>'
 ];
 for(let p=0;p<2;p++){
  const pieces=['<line x1="'+(X[p]-140)+'" y1="'+Y+'" x2="'+(X[p]+140)+'" y2="'+Y+'" stroke="#d3dce3"/>','<line x1="'+X[p]+'" y1="96" x2="'+X[p]+'" y2="376" stroke="#d3dce3"/>'];
  pieces.push(...state.shapes.filter(s=>s.p===p).map(s=>itemMarkup(s,poster)));
  head.push('<g clip-path="url(#ori-b-'+(p?'right':'left')+')">'+pieces.join('')+'</g>');
 }
 const guide=state.id==='09'?'山M：長破線　谷V：点線（数字と区別して読む）':
  state.id==='14'?'剛体モード＝立体投影　格子モード＝静的強調表示':
  '実線：対象・像　破線：折り線・補助線。投影図は実際の長さを表さない';
 head.push('<text x="27" y="412" font-family="system-ui,sans-serif" font-size="16" fill="#284356">'+esc(guide)+'</text>');
 return head.join('\n');
}
export function posterSvg(state,title){
 const rendered={...state,title};
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 430" role="img" aria-labelledby="title desc" data-layout-lint="strict">\n'+
  '<title id="title">'+esc(title)+'</title>\n<desc id="desc">'+esc(state.formula+' '+state.readout+' '+state.limit)+'</desc>\n'+svgFrame(rendered,true)+'\n</svg>\n';
}
