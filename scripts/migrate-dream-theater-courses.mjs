/**
 * One-off Git-tracked migration: category / course-series ID / chapter ID.
 * Canonical index is kept in existing order. Only two supplementary exercise
 * chapters outside the published index are added (LAX1, CAX1).
 */
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import YAML from 'yaml';

const ROOT='textbook/volumes/dream_thater';
const INDEX='textbook/dream-theater-index.json';
const FACADE='textbook/dream-theater.md';
const SERIES='textbook/dream-theater-series';
const apply=process.argv.includes('--apply');
const check=process.argv.includes('--check');
if(apply===check)throw Error('Select exactly one of --apply or --check');
const read=p=>fs.readFileSync(p,'utf8');
const write=(p,t)=>fs.writeFileSync(p,t,'utf8');
const exists=p=>fs.existsSync(p);
const git=(...a)=>execFileSync('git',a,{encoding:'utf8',maxBuffer:120*1024*1024});
const tracked=()=>git('ls-files','-z').split('\0').filter(Boolean);
function seriesId(id){
 if(/^F0-/.test(id))return 'F0';
 const match=/^[A-Z]+/.exec(id);
 if(!match)throw Error('No course series ID for '+id);
 return match[0];
}
const extras=[
 {id:'LAX1',category:'基礎科目',course:'LAX',source:'textbook/volumes/00_foundations/F0_00CALC_線形代数_院試編入計算演習',insertAfter:'LA6'},
 {id:'CAX1',category:'解析系',course:'CAX',source:'textbook/volumes/00_foundations/F0_00CALC_複素解析_院試編入計算演習',insertAfter:'CA4'},
];
const index=JSON.parse(read(INDEX));
const owners=new Map(),moves=new Map(),originalIndex=new Map();
let indexCount=0;
for(const section of index.sections){
 if(!Array.isArray(section.paths))throw Error('Invalid index section');
 for(const href of section.paths){
  const oldDir=path.posix.dirname(href),id=path.posix.basename(oldDir);
  const course=seriesId(id);
  const target=ROOT+'/'+section.name+'/'+course+'/'+id;
  if(href!==ROOT+'/'+section.name+'/'+id+'/index.md'&&href!==target+'/index.md')
    throw Error('Invalid source index location: '+href);
  if(owners.has(id))throw Error('Duplicate published ID '+id);
  owners.set(id,{category:section.name,course,target,source:oldDir});
  originalIndex.set(id,href);
  if(oldDir!==target)moves.set(oldDir,target);
  const yaml=YAML.parse(read(oldDir+'/chapter.yaml'));
  if(yaml?.id!==id)throw Error('ID mismatch in '+oldDir);
  indexCount++;
 }
}
if(indexCount<500)throw Error('Unexpectedly few published chapters');
for(const e of extras){
 const target=ROOT+'/'+e.category+'/'+e.course+'/'+e.id;
 const source=exists(e.source)?e.source:target;
 if(!exists(source+'/chapter.yaml')||YAML.parse(read(source+'/chapter.yaml')).id!==e.id)throw Error('Exercise metadata mismatch: '+e.id);
 if(owners.has(e.id)){
  const existing=owners.get(e.id);
  if(existing.category!==e.category||existing.course!==e.course||existing.target!==target)
    throw Error('Conflicting indexed exercise '+e.id);
 }else owners.set(e.id,{category:e.category,course:e.course,target,source,extra:true});
 if(source!==target)moves.set(source,target);
}
const planFiles=fs.readdirSync(SERIES).filter(f=>f.endsWith('.yaml'));
for(const name of planFiles){
 const spec=YAML.parse(read(SERIES+'/'+name));
 const categories=[...new Set(spec.chapters.map(c=>owners.get(c.id)?.category).filter(Boolean))];
 if(categories.length!==1)throw Error('Unresolved series category in '+name+': '+categories);
 for(const chapter of spec.chapters){
  const owner=owners.get(chapter.id);
  if(owner&&(owner.category!==categories[0]||owner.course!==seriesId(chapter.id)))
    throw Error('Course/category mismatch in '+name+': '+chapter.id);
 }
}
const table=[...moves].sort((a,b)=>b[0].length-a[0].length);
function mappedPath(p){
 for(const [from,to] of table)if(p===from||p.startsWith(from+'/'))return to+p.slice(from.length);
 return p;
}
function rewriteHref(href,oldFile,newFile){
 if(!href||/^(?:https?:|mailto:|tel:|data:|javascript:|#|\/)/i.test(href))return href;
 if(href.startsWith('textbook/')||href.startsWith('pages/')||href.startsWith('references/')||
    href.startsWith('anki/')||href.startsWith('statistical-mathematics/')||href.startsWith('applied-rikou-80/'))
    return mappedPath(href);
 const cut=href.search(/[?#]/);
 const main=cut<0?href:href.slice(0,cut);
 const trailing=cut<0?'':href.slice(cut);
 if(!/^(?:\.\.?\/)/.test(main))return href;
 const oldResolved=path.posix.normalize(path.posix.join(path.posix.dirname(oldFile),main));
 const newResolved=mappedPath(oldResolved);
 let rel=path.posix.relative(path.posix.dirname(newFile),newResolved)||'.';
 if(!rel.startsWith('.'))rel='./'+rel;
 return rel+trailing;
}
function rewriteText(raw,oldFile,newFile){
 // Link matcher starts at the ]( boundary; mathematical brackets in labels are supported.
 let text=raw.replace(/\]\(([^)\s]+)\)/g,(_,href)=>']('+rewriteHref(href,oldFile,newFile)+')');
 text=text.replace(/(\b(?:src|href)=["'])([^"'<>]+)(["'])/g,(all,one,href,end)=>one+rewriteHref(href,oldFile,newFile)+end);
 for(const [from,to] of table)text=text.split(from).join(to);
 return text;
}
const TEXT=/\.(?:md|yaml|yml|json|mjs|cjs|js|ts|tsx|jsx|html|css|scss|txt|py|sh|xml|svg|toml|csv)$/i;
function skip(p){
 return p.startsWith('node_modules/')||p.startsWith('_site/')||p.startsWith('dist/')||
 p.endsWith('package-lock.json')||
 p.startsWith('scripts/migrate-dream-theater-courses.mjs')||
 p.startsWith('scripts/verify-dream-theater-course-relocation.mjs');
}
if(apply){
 const origins=new Map(tracked().map(file=>[mappedPath(file),file]));
 for(const [src,dest] of moves){
  if(exists(dest))throw Error('Destination collision: '+dest);
  fs.mkdirSync(path.posix.dirname(dest),{recursive:true});
  git('mv','--',src,dest);
 }
 for(const name of planFiles){
  const file=SERIES+'/'+name;
  let body=read(file);
  const spec=YAML.parse(body);
  const cat=spec.chapters.map(ch=>owners.get(ch.id)?.category).find(Boolean);
  for(const chapter of spec.chapters){
   const dest=ROOT+'/'+cat+'/'+seriesId(chapter.id)+'/'+chapter.id;
   const prior=chapter.path;
   if(!body.includes('path: '+prior))throw Error('Cannot find series path '+name+'/'+chapter.id);
   body=body.replace('path: '+prior,'path: '+dest);
  }
  write(file,body);
 }
 for(const section of index.sections)section.paths=section.paths.map(p=>mappedPath(path.posix.dirname(p))+'/index.md');
 for(const e of extras){
  const sec=index.sections.find(s=>s.name===e.category);
  const after=sec.paths.findIndex(href=>path.posix.basename(path.posix.dirname(href))===e.insertAfter);
  if(after<0)throw Error('Missing chapter preceding exercise: '+e.insertAfter);
  sec.paths.splice(after+1,0,ROOT+'/'+e.category+'/'+e.course+'/'+e.id+'/index.md');
 }
 write(INDEX,JSON.stringify(index,null,2)+'\n');
 let facade=read(FACADE);
 // These exercise links were already present in the public facade but were
 // intentionally absent from the canonical index. Reuse one index entry only.
 facade=facade.split('\n').filter(line=>!extras.some(e=>line.includes('('+e.source+'/index.md)'))).join('\n');
 for(const e of extras){
  const previous=originalIndex.get(e.insertAfter);
  const re=facade.split('\n');
  const idx=re.findIndex(line=>line.includes('('+previous+')'));
  if(idx<0)throw Error('Facade insertion failed for '+e.id);
  const title=read(owners.get(e.id).target+'/index.md').match(/^#\s+([^\n]+)/m)?.[1]?.trim();
  if(!title)throw Error('Missing exercise H1 '+e.id);
  const line=re[idx].replace(/^\s*\d+\./,String(Number(re[idx].match(/^\s*(\d+)\./)?.[1]??0)+1)+'.').replace(/\[[^\]]*\]\([^)]*\)/,'['+title+']('+e.source+'/index.md)');
  re.splice(idx+1,0,line);
  facade=re.join('\n');
 }
 write(FACADE,facade);
 let rewrites=0;
 for(const file of tracked()){
  if(!TEXT.test(file)||skip(file)||!exists(file)||!fs.statSync(file).isFile())continue;
  const original=origins.get(file)||file;
  const raw=read(file),next=rewriteText(raw,original,file);
  if(raw!==next){write(file,next);rewrites++;}
 }
 console.log('Course-layer relocation applied: '+moves.size+' chapter directories, '+rewrites+' text-file rewrites');
}
const final=JSON.parse(read(INDEX));
const errors=[],indexed=new Set(),counts=new Map();
for(const s of final.sections)for(const href of s.paths){
 const dir=path.posix.dirname(href),id=path.posix.basename(dir),course=seriesId(id);
 const target=ROOT+'/'+s.name+'/'+course+'/'+id+'/index.md';
 if(href!==target)errors.push('Invalid index: '+href);
 if(!exists(href)||!exists(dir+'/chapter.yaml'))errors.push('Missing page/metadata: '+href);
 if(indexed.has(id))errors.push('Duplicate index ID '+id);
 indexed.add(id);counts.set(s.name,(counts.get(s.name)||0)+1);
}
for(const e of extras)if(!indexed.has(e.id))errors.push('Exercise missing from public index: '+e.id);
// The initial relocation inventoried 542 chapters. Later completed chapters
// are intentionally added to the published index, so preserve the floor,
// while the checks above continue to enforce unique IDs and existing files.
if(indexed.size<542)errors.push('Expected at least 542 canonical entries; got '+indexed.size);
for(const name of planFiles){
 const spec=YAML.parse(read(SERIES+'/'+name));
 const cat=[...new Set(spec.chapters.map(c=>owners.get(c.id)?.category).filter(Boolean))];
 for(const ch of spec.chapters){
  const expected=ROOT+'/'+cat[0]+'/'+seriesId(ch.id)+'/'+ch.id;
  if(ch.path!==expected)errors.push('Invalid series chapter path: '+name+'/'+ch.id);
  if(ch.status==='completed'&&!exists(expected+'/chapter.yaml'))errors.push('Missing completed series chapter: '+ch.id);
 }
}
for(const section of final.sections){
 const base=ROOT+'/'+section.name;
 for(const entry of fs.readdirSync(base,{withFileTypes:true}).filter(x=>x.isDirectory())){
  const rel=base+'/'+entry.name;
  if(exists(rel+'/chapter.yaml')||exists(rel+'/index.md'))errors.push('Flat chapter remains at '+rel);
  for(const chapter of fs.readdirSync(rel,{withFileTypes:true}).filter(x=>x.isDirectory())){
   const dest=rel+'/'+chapter.name+'/index.md';
   if(exists(dest)&&!section.paths.includes(dest))errors.push('Orphan chapter: '+dest);
  }
 }
}
if(errors.length)throw Error('Layout invalid:\n'+errors.slice(0,80).join('\n'));
console.log('Course-layer layout OK: '+indexed.size+' chapters, '+planFiles.length+' series manifests, '+final.sections.length+' categories; exercises LAX1 and CAX1 included.');
