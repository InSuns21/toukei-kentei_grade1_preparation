import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

// Reader-facing prose can depend on a chapter even when its chapter.yaml
// prerequisites do not reach that chapter. This auditor produces a human-review
// queue, NOT an instruction to add every detected dependency.
const root=process.cwd();
const full=process.argv.includes('--all');
const strict=process.argv.includes('--strict');
const paths=JSON.parse(fs.readFileSync('textbook/dream-theater-index.json','utf8')).sections.flatMap(s=>s.paths);
const indexed=new Set(paths);
const records=new Map(), byPath=new Map();
const file=(p)=>fs.readFileSync(path.join(root,p),'utf8');
const norm=(p)=>p.split(path.sep).join('/');
function deps(value,loc){
 if(!Array.isArray(value)||value.some(v=>typeof v!=='string'||!v.trim()))throw Error(loc+': bad prerequisites');
 return [...new Set(value)];
}
for(const vol of fs.readdirSync('textbook/volumes',{withFileTypes:true}).filter(x=>x.isDirectory())){
 const dir='textbook/volumes/'+vol.name;
 for(const item of fs.readdirSync(dir,{withFileTypes:true}).filter(x=>x.isDirectory())){
  const cp=dir+'/'+item.name+'/chapter.yaml';
  if(!fs.existsSync(cp))continue;
  const obj=YAML.parse(file(cp))??{};
  if(!obj.id)continue;
  const rec={id:String(obj.id),title:String(obj.title??''),prereqs:deps(obj.prerequisites??[],cp),yaml:cp,md:dir+'/'+item.name+'/index.md',knowledge:dir+'/'+item.name+'/knowledge.yaml'};
  byPath.set(rec.md,rec);
  const arr=records.get(rec.id)??[];arr.push(rec);records.set(rec.id,arr);
 }
}
const chapters=new Map();
for(const [id,arr] of records){
 const listed=arr.filter(r=>indexed.has(r.md));
 if(arr.length>1&&listed.length!==1)throw Error('ambiguous chapter: '+id);
 chapters.set(id,listed[0]??arr[0]);
}
const memo=new Map();
function closure(id,visiting=new Set()){
 if(memo.has(id))return memo.get(id);
 if(visiting.has(id))throw Error('prerequisite cycle: '+id);
 visiting.add(id);
 const seen=new Set();
 for(const pre of chapters.get(id)?.prereqs??[]){
  seen.add(pre);
  for(const ancestor of closure(pre,visiting))seen.add(ancestor);
 }
 visiting.delete(id);memo.set(id,seen);return seen;
}
function reasoning(text){
 return /(?:を(?:使|用い|利用|適用|援用)|に(?:依存|基づ|従い)|から(?:導|得|従|借)|の(?:定理|補題|結果|定義|公式|構成|証明|議論)|で(?:証明|示し|示す|得た|導い|導入|定義|学んだ|扱った))/u.test(text);
}
function forward(text){
 return /(?:後続|次章|次節|次の章|この先|将来|今後|後で|予告|で扱います|で扱う|で学びます|への接続|と比較|との対比|参考として|へ進みます)/u.test(text);
}
function resolve(source,link){
 if(/^(?:https?:|mailto:|#|\/)/iu.test(link))return null;
 const bare=link.split(/[?#]/,1)[0];
 return bare.startsWith('textbook/')?path.posix.normalize(bare):path.posix.normalize(path.posix.join(path.posix.dirname(source),bare));
}
function selfTest(){
 const assert=(ok)=>{if(!ok)throw Error('self-test failed')};
 assert(reasoning('QM6の定理を使う'));
 assert(!reasoning('QM6を紹介する'));
 assert(forward('次章で扱います'));
 assert(resolve('textbook/volumes/00_foundations/MQ1/index.md','../QM6/index.md')==='textbook/volumes/00_foundations/QM6/index.md');
 console.log('Narrative prerequisite audit self-test passed');
}
if(process.argv.includes('--self-test')){selfTest();process.exit(0);}
const found=[];let metadataDrift=0,missingKnowledge=0;
for(const md of paths){
 const page=byPath.get(md);
 if(!page)throw Error('no chapter metadata '+md);
 const reach=closure(page.id);
 const overview=/ロードマップ|学習案内|シリーズ概観|科目案内/u.test(page.title)||/^F0-00R[0-9]/u.test(page.id);
 if(fs.existsSync(page.knowledge)){
  const known=deps((YAML.parse(file(page.knowledge))??{}).prerequisites??[],page.knowledge);
  if(known.slice().sort().join('|')!==page.prereqs.slice().sort().join('|')){
   found.push({kind:'metadata-drift',source:page.id,target:'',line:1,md:page.yaml,excerpt:'chapter.yaml='+page.prereqs.join(',')+' / knowledge.yaml='+known.join(',')});metadataDrift++;
  }
 }else missingKnowledge++;
 if(!fs.existsSync(md))continue;
 let fenced=false,comment=false;
 const lines=file(md).split(/\r?\n/u);
 for(let i=0;i<lines.length;i++){
  const ln=lines[i];
  if(/^\s*(?:\x60{3,}|~{3,})/u.test(ln)){fenced=!fenced;continue;}
  if(ln.includes('<!--'))comment=true;
  if(comment){if(ln.includes('-->'))comment=false;continue;}
  if(fenced||ln.trim().startsWith('$$'))continue;
  for(const match of ln.matchAll(/\[([^\]]+)\]\(([^)\s]+)(?:\s+[^)]*)?\)/gu)){
   const to=byPath.get(resolve(md,match[2]));
   if(!to||to.id===page.id)continue;
   // If the cited later chapter already depends on this chapter, it is a
   // forward application, never a prerequisite of its own ancestor.
   if(closure(to.id).has(page.id)||overview)continue;
   const left=ln.slice(Math.max(0,match.index-90),match.index).split(/[。！？]/u).at(-1);
   const right=ln.slice(match.index+match[0].length,match.index+match[0].length+110).split(/[。！？]/u)[0];
   const context=left+' '+match[1]+' '+right;
   if(!reasoning(context)||forward(context))continue;
   if(page.prereqs.includes(to.id))continue;
   found.push({kind:reach.has(to.id)?'transitive':'unreachable',source:page.id,target:to.id,line:i+1,md,excerpt:ln.trim().replace(/\s+/gu,' ').slice(0,200)});
  }
 }
}
const count={unreachable:0,transitive:0,'metadata-drift':0};
for(const item of found)count[item.kind]++;
found.sort((a,b)=>({unreachable:0,'metadata-drift':1,transitive:2}[a.kind]-{unreachable:0,'metadata-drift':1,transitive:2}[b.kind])||a.source.localeCompare(b.source)||a.line-b.line);
console.log('DREAM THEATER prose prerequisite audit: '+paths.length+' indexed chapters, '+JSON.stringify(count)+', missing knowledge.yaml='+missingKnowledge);
for(const item of (full?found:found.filter(x=>x.kind!=='transitive')).slice(0,full?found.length:100))console.log('['+item.kind+'] '+item.source+' -> '+item.target+' '+item.md+':'+item.line+' '+item.excerpt);
if(!full)console.log('Transitive uses are counted but intentionally omitted from default review queue; run with --all to inspect.');
if(strict&&(count.unreachable||count['metadata-drift']))process.exitCode=1;
