import {readFile,writeFile,mkdir} from 'node:fs/promises';
import assert from 'node:assert/strict';
import path from 'node:path';
import YAML from 'yaml';
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
  if(!subject)continue;
  for(const match of line.matchAll(/\]\((textbook\/volumes\/[^)]+\/index\.md)\)/g)){
   if(!valid.has(match[1]))continue;
   found.push(match[1]);
   subject.chapters.push({id:id(match[1]),path:match[1]});
  }
 }
 if(paths.length!==found.length||found.some((p,i)=>p!==paths[i]))throw Error('Index and facade not synchronized');
 return subjects;
}
// Resolve the full direct/transitive prerequisites before publishing a reading order.
function resolvePrerequisites(chosen,completed,chapters,unpublished){
 const visiting=new Set(),result=[];
 function visit(ch,planned){
  if(completed.has(ch.path))return;
  if(visiting.has(ch.id))throw Error('Circular prerequisite: '+[...visiting,ch.id].join(' -> '));
  const meta=chapters.get(ch.id);
  if(!meta)throw Error('No chapter metadata for '+ch.id);
  visiting.add(ch.id);
  for(const prerequisite of meta.prerequisites){
   const prior=chapters.get(prerequisite);
   if(!prior){unpublished.add(prerequisite+'（必要とする章：'+ch.id+'）');continue;}
   visit(prior,false);
  }
  visiting.delete(ch.id);
  completed.add(ch.path);
  result.push({...ch,planned});
 }
 for(const ch of chosen)visit(ch,true);
 return result;
}
function electivePrerequisites(chosen,completed,chapters,unpublished){
 const self=new Set(chosen.map(ch=>ch.id)),unseen=new Set(),visited=new Set();
 function visit(id){
  if(visited.has(id))return;
  visited.add(id);
  const ch=chapters.get(id);
  if(!ch){unpublished.add(id+'（発展科目）');return;}
  for(const prerequisite of ch.prerequisites){
   const prior=chapters.get(prerequisite);
   if(!prior){unpublished.add(prerequisite+'（必要とする章：'+id+'）');continue;}
   if(!self.has(prerequisite)&&!completed.has(prior.path))unseen.add(prerequisite);
   visit(prerequisite);
  }
 }
 for(const ch of chosen)visit(ch.id);
 return [...unseen].map(id=>chapters.get(id));
}
function render(config,subjects,titles,chapters){
 if(config.version!==1||!config.courses?.length)throw Error('Invalid courses config');
 const seenIds=new Set(),pages=[];
 const home=['# DREAM THEATER 学習コース','','全体の通読ではなく、目的別の読順を選べます。',
 'リンク・見出し・公開章数はデプロイ時に自動更新されます。コースの必修終点は固定し、追加章は任意へ移します。','',
 '| コース | 推奨章数 | 内容 |','| --- | ---: | --- |'];
 for(const c of config.courses){
  if(!/^[a-z][a-z0-9-]*$/.test(c.id)||seenIds.has(c.id))throw Error('Duplicate/bad course ID '+c.id);
  seenIds.add(c.id);
  if(!c.title||!c.description||!c.stages?.length||!Array.isArray(c.electives))throw Error('Incomplete course '+c.id);
  const visited=new Set(),required=new Set(),optional=[],unpublished=new Set();
  const page=['# '+c.title,'',link('← コース一覧',base+'.md')+' ・ '+link('科目別目次','textbook/dream-theater.md'),'',
  c.description,'','> 章の直接・間接の前提は chapter.yaml から検査し、未履修の前提章を読順に自動挿入します。','> 「前提補講」は必修範囲の不足を埋める章です。発展・任意の科目には別途前提が必要な場合があります。',''];
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
    const ordered=resolvePrerequisites(chosen,required,chapters,unpublished);
    const added=ordered.filter(ch=>!ch.planned).length;
    page.push('### '+sub.title+'（'+ordered.length+'章'+(added?'・前提補講'+added+'章':'')+'）','');
    if(!ordered.length)page.push('必要な章は既に前の段階で学びました。');
    for(const [j,ch] of ordered.entries()){
     if(!titles.has(ch.path))throw Error('Missing title '+ch.path);
     page.push((j+1)+'. '+(ch.planned?'':'**前提補講** ')+link(titles.get(ch.path),ch.path));
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
   const needed=electivePrerequisites(group.chapters,required,chapters,unpublished);
   if(needed.length){
    page.push('**この発展科目に進む前の未履修前提：'+needed.length+'章。** 例：'+
      needed.slice(0,8).map(ch=>link(titles.get(ch.path),ch.path)).join('、')+
      (needed.length>8?' ほか'+(needed.length-8)+'章':'')+'。','');
   }
   for(const [i,ch] of group.chapters.entries()){
    if(!titles.has(ch.path))throw Error('Missing optional chapter '+ch.path);
    page.push((i+1)+'. '+link(titles.get(ch.path),ch.path));
   }
   page.push('');
  }
  if(c.upcoming!==undefined){
   if(!Array.isArray(c.upcoming))throw Error('Invalid upcoming list in '+c.id);
   const futurePrefixes=new Set();
   page.push('## 今後の専門ルート（未公開・部分公開）','',
    'これらの専門科目は現行の必修範囲に含まれません。公開済みの本文がある章のみ自動で表示し、未公開の科目を履修済みとみなさないようにします。','');
   for(const future of c.upcoming){
    if(!future.title||!/^[A-Z][A-Z0-9-]{1,15}$/.test(future.prefix)||futurePrefixes.has(future.prefix)){
     throw Error('Invalid/duplicate upcoming series in '+c.id);
    }
    futurePrefixes.add(future.prefix);
    const published=[...chapters.values()].filter(ch=>ch.id.startsWith(future.prefix)&&
      /^[0-9-]/.test(ch.id.slice(future.prefix.length)));
    page.push('### '+future.title+' — '+(published.length?'一部公開（'+published.length+'章）':'未公開'),'');
    if(!published.length){
     page.push('この専門科目は計画段階です。公開されている講義本文はまだありません。','');
    }else{
     page.push('公開済みの章だけを表示しています。科目全体の完了や前提充足を意味しません。','');
     for(const ch of published){
      if(!titles.has(ch.path))throw Error('Missing future chapter H1: '+ch.path);
      page.push('- '+link(titles.get(ch.path),ch.path));
     }
     page.push('');
    }
   }
  }
  if(unpublished.size)page.push('## 公開索引外の前提','',
   '次の前提IDは公開索引の章に対応していません。自動で学習済みとみなさず、対象章の前提一覧を確認してください。','',
   ...[...unpublished].sort().map(x=>'- '+x),'');
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
 const chapters=new Map([
  ['A',{id:'A',path:a,prerequisites:[]}],
  ['B',{id:'B',path:b,prerequisites:['A']}],
  ['D',{id:'D',path:d,prerequisites:['B']}]
 ]);
 cfg.courses[0].upcoming=[{title:'計画中の講義',prefix:'BHT'}];
 const first=render(cfg,parse(head,[a,b]),titles,chapters).pages[0];
 assert.match(first.content,/計画中の講義 — 未公開/);
 assert.equal(first.required,2);
 const added=render(cfg,parse(head+'\n3. [d]('+d+')',[a,b,d]),titles,chapters).pages[0];
 assert.equal(added.required,2);
 assert.match(added.content,/発展・任意[\s\S]*D/);
 const futurePath=p('BHT1');
 const futureSource=head+'\n3. [BHT1]('+futurePath+')';
 const futureTitles=new Map([...titles,[futurePath,'BHT1 予告講義']]);
 const futureChapters=new Map([...chapters,['BHT1',{id:'BHT1',path:futurePath,prerequisites:['B']}]]);
 const future=render(cfg,parse(futureSource,[a,b,futurePath]),futureTitles,futureChapters).pages[0];
 assert.match(future.content,/計画中の講義 — 一部公開（1章）/);
 assert.match(future.content,/BHT1 予告講義/);
 assert.equal(future.required,2);
 assert.throws(()=>parse(head,[b,a]),/not synchronized/);
 assert.throws(()=>render({...cfg,courses:[{...cfg.courses[0],stages:[{title:'x',parts:[{subject:'x',through:'Z'}]}]}]},parse(head,[a,b]),titles,chapters),/milestone/);
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
 const chapters=new Map(await Promise.all(paths.map(async p=>{
  const metadata=YAML.parse(await readFile(p.replace(/index\.md$/,'chapter.yaml'),'utf8'));
  if(metadata.id!==id(p))throw Error('Chapter ID mismatch '+p);
  if(!Array.isArray(metadata.prerequisites||[]))throw Error('Invalid prerequisites '+p);
  return [metadata.id,{id:metadata.id,path:p,prerequisites:metadata.prerequisites||[]}];
 })));
 if(chapters.size!==paths.length)throw Error('Duplicate chapter IDs in public index');
 const generated=render(JSON.parse(rawConfig),subjects,titles,chapters);
 if(mode==='write'){
  await mkdir(path.join('_site',base),{recursive:true});
  await writeFile(path.join('_site',base+'.md'),generated.home);
  for(const c of generated.pages)await writeFile(path.join('_site',base,c.id+'.md'),c.content);
 }
 console.log('Courses '+mode+': '+generated.pages.length+' courses and '+paths.length+' published chapters');
}
