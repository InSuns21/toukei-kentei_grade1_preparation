import {readFile,writeFile,mkdir} from 'node:fs/promises';
import assert from 'node:assert/strict';
import path from 'node:path';
const base='textbook/dream-theater-courses';
const mode=process.argv.includes('--self-test')?'test':process.argv.includes('--write')?'write':'check';
const id=p=>path.posix.basename(path.posix.dirname(p));
const link=(s,p)=>'['+s.replaceAll('[','［').replaceAll(']','］')+']('+p+')';
function parse(facade,paths){
 const subjects=new Map(),valid=new Set(paths),found=[];
 let key=null,subject=null;
 for(const line of facade.split(/\r?\n/).map(x=>x.trim())){
  let m=line.match(/^<a id="([^"]+)"><\/a>$/);
  if(m){key=m[1];continue;}
  if(/^##\s/.test(line)){subject=null;key=null;continue;}
  m=line.match(/^###\s+(.+)$/);
  if(m){if(!key||subjects.has(key))throw Error('Missing/duplicate subject anchor '+line);
   subject={title:m[1],chapters:[]};subjects.set(key,subject);key=null;continue;}
  if(!subject||!/^\d+\.\s/.test(line))continue;
  m=line.match(/\]\((textbook\/volumes\/[^)]+\/index\.md)\)/);
  if(m&&valid.has(m[1])){found.push(m[1]);subject.chapters.push({id:id(m[1]),path:m[1]});}
 }
 if(paths.length!==found.length||found.some((p,i)=>p!==paths[i]))throw Error('Index and facade not synchronized');
 return subjects;
}
function render(config,subjects,titles){
 if(config.version!==1||!config.courses?.length)throw Error('Invalid courses config');
 const seenIds=new Set(),pages=[];
 const home=['# DREAM THEATER 学習コース','','全体の通読ではなく、目的別の読順を選べます。',
 'リンク・見出し・公開章数はデプロイ時に自動更新されます。コースの必修終点は固定し、追加章は任意へ移します。','',
 '| コース | 推奨章数 | 内容 |','| --- | ---: | --- |'];
 for(const c of config.courses){
  if(!/^[a-z][a-z0-9-]*$/.test(c.id)||seenIds.has(c.id))throw Error('Duplicate/bad course ID '+c.id);
  seenIds.add(c.id);
  if(!c.title||!c.description||!c.stages?.length||!Array.isArray(c.electives))throw Error('Incomplete course '+c.id);
  const visited=new Set(),required=new Set(),optional=[];
  const page=['# '+c.title,'',link('← コース一覧',base+'.md')+' ・ '+link('科目別目次','textbook/dream-theater.md'),'',
  c.description,'','> 各章の厳密な prerequisite は章の前提情報に従ってください。コースは学習用の推奨順です。',''];
  for(const [i,stage] of c.stages.entries()){
   if(!stage.title||!stage.parts?.length)throw Error('Empty stage '+c.id);
   page.push('## '+(i+1)+'. '+stage.title,'');
   for(const part of stage.parts){
    if(visited.has(part.subject))throw Error('Repeated subject '+part.subject);
    visited.add(part.subject);
    const sub=subjects.get(part.subject);
    if(!sub)throw Error('Unknown subject '+part.subject);
    const end=sub.chapters.findIndex(ch=>ch.id===part.through);
    if(end<0)throw Error('Missing milestone '+part.through+' in '+part.subject);
    const chosen=sub.chapters.slice(0,end+1),more=sub.chapters.slice(end+1);
    page.push('### '+sub.title+'（'+chosen.length+'章）','');
    for(const [j,ch] of chosen.entries()){
     if(required.has(ch.path)||!titles.has(ch.path))throw Error('Repeated/missing chapter '+ch.path);
     required.add(ch.path);page.push((j+1)+'. '+link(titles.get(ch.path),ch.path));
    }
    page.push('');
    if(more.length)optional.push({title:sub.title+'：到達地点より先',chapters:more});
   }
  }
  for(const elective of c.electives){
   if(visited.has(elective))throw Error('Elective repeated '+elective);
   visited.add(elective);
   const sub=subjects.get(elective);
   if(!sub)throw Error('Unknown elective '+elective);
   if(sub.chapters.length)optional.push({title:sub.title,chapters:sub.chapters});
  }
  page.push('## 発展・任意の章','',
    '到達地点の後に公開された章や発展科目は、次回のデプロイで自動的にここへ反映されます。','');
  if(!optional.length)page.push('現在は公開済みの追加章がありません。','');
  for(const group of optional){
   page.push('### '+group.title+'（'+group.chapters.length+'章）','');
   for(const [i,ch] of group.chapters.entries()){
    if(!titles.has(ch.path))throw Error('Missing optional chapter '+ch.path);
    page.push((i+1)+'. '+link(titles.get(ch.path),ch.path));
   }
   page.push('');
  }
  pages.push({id:c.id,content:page.join('\n')+'\n',required:required.size});
  home.push('| '+link(c.title,base+'/'+c.id+'.md')+' | '+required.size+' | '+c.description+' |');
 }
 home.push('','## 全体資料','',
  '- '+link('科目別の全体目次','textbook/dream-theater.md'),
  '- '+link('従来の全体読順','textbook/dream-theater-standard-math-core.md'),'');
 return {home:home.join('\n')+'\n',pages};
}
function test(){
 const p=x=>'textbook/volumes/dream_thater/基礎科目/X/'+x+'/index.md';
 const a=p('A'),b=p('B'),d=p('D');
 const head=['## x','<a id="x"></a>','### X','1. [a]('+a+')','2. [b]('+b+')'].join('\n');
 const cfg={version:1,courses:[{id:'test',title:'Test',description:'Test',stages:[{title:'Start',parts:[{subject:'x',through:'B'}]}],electives:[]}]};
 const titles=new Map([[a,'A'],[b,'B'],[d,'D']]);
 const first=render(cfg,parse(head,[a,b]),titles).pages[0];
 assert.equal(first.required,2);
 const added=render(cfg,parse(head+'\n3. [d]('+d+')',[a,b,d]),titles).pages[0];
 assert.equal(added.required,2);
 assert.match(added.content,/発展・任意[\s\S]*D/);
 assert.throws(()=>parse(head,[b,a]),/not synchronized/);
 assert.throws(()=>render({...cfg,courses:[{...cfg.courses[0],stages:[{title:'x',parts:[{subject:'x',through:'Z'}]}]}]},parse(head,[a,b]),titles),/milestone/);
 console.log('Course self-test OK');
}
if(mode==='test')test();
else{
 const [rawIndex,facade,rawConfig]=await Promise.all([
  readFile('textbook/dream-theater-index.json','utf8'),
  readFile('textbook/dream-theater.md','utf8'),
  readFile('textbook/dream-theater-courses.json','utf8')]);
 const paths=JSON.parse(rawIndex).sections.flatMap(s=>s.paths);
 const subjects=parse(facade,paths);
 const titles=new Map(await Promise.all(paths.map(async p=>{
  const match=(await readFile(p,'utf8')).match(/^#\s+(.+)\s*$/m);
  if(!match)throw Error('Missing H1 '+p);
  return [p,match[1].trim().replaceAll(String.fromCharCode(96),'')];
 })));
 const generated=render(JSON.parse(rawConfig),subjects,titles);
 if(mode==='write'){
  await mkdir(path.join('_site',base),{recursive:true});
  await writeFile(path.join('_site',base+'.md'),generated.home);
  for(const c of generated.pages)await writeFile(path.join('_site',base,c.id+'.md'),c.content);
 }
 console.log('Courses '+mode+': '+generated.pages.length+' courses and '+paths.length+' published chapters');
}
