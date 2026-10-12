import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import YAML from 'yaml';
const opt=process.argv.indexOf('--base');
const base=opt<0?process.env.TEXTBOOK_BASE_SHA:process.argv[opt+1];
if(!/^[a-f0-9]{40}$/i.test(base||''))throw Error('Need --base SHA');
const ROOT='textbook/volumes/dream_thater';
const beforeIndex=JSON.parse(git('show',base+':textbook/dream-theater-index.json').toString());
const afterIndex=JSON.parse(fs.readFileSync('textbook/dream-theater-index.json','utf8'));
function git(...args){return execFileSync('git',['-c','core.quotepath=false',...args],{maxBuffer:100*1024*1024});}
function courseFor(id){return id.startsWith('F0-')?'F0':(/^[A-Z]+/.exec(id)?.[0]??'');}
const oldLinks=beforeIndex.sections.flatMap(s=>s.paths.map(p=>({cat:s.name,path:p})));
const newLinks=afterIndex.sections.flatMap(s=>s.paths.map(p=>({cat:s.name,path:p})));
if(oldLinks.length!==540||newLinks.length!==542)throw Error('Expected 540 originals and 542 new index paths');
const mappings=[];
for(const entry of oldLinks){
 const oldDir=path.posix.dirname(entry.path),id=path.posix.basename(oldDir);
 const want=ROOT+'/'+entry.cat+'/'+courseFor(id)+'/'+id+'/index.md';
 if(!newLinks.some(e=>e.cat===entry.cat&&e.path===want))throw Error('Missing reordered chapter '+id);
 const metadata=YAML.parse(git('show',base+':'+oldDir+'/chapter.yaml').toString('utf8'));
 if(metadata.id!==id)throw Error('Chapter ID drift '+id);
 mappings.push([oldDir,path.posix.dirname(want)]);
}
const extras=[
 ['textbook/volumes/00_foundations/F0_00CALC_線形代数_院試編入計算演習',ROOT+'/基礎科目/LAX/LAX1','LAX1'],
 ['textbook/volumes/00_foundations/F0_00CALC_複素解析_院試編入計算演習',ROOT+'/解析系/CAX/CAX1','CAX1'],
];
for(const [from,to,id] of extras){
 if(!newLinks.some(e=>e.path===to+'/index.md'))throw Error('Missing extra exercise from index '+id);
 const metadata=YAML.parse(git('show',base+':'+from+'/chapter.yaml').toString('utf8'));
 if(metadata.id!==id)throw Error('Exercise ID drift: '+id);
 mappings.push([from,to]);
}
mappings.sort((a,b)=>b[0].length-a[0].length);
const allOld=git('ls-tree','-r','--name-only',base,'--','textbook/volumes').toString('utf8').split('\n').filter(Boolean);
const allNew=git('ls-files','--',ROOT).toString('utf8').split('\n').filter(Boolean);
const afterSet=new Set(allNew);
const newMap=new Map(), reverse=new Set();
for(const old of allOld){
 const m=mappings.find(([from])=>old.startsWith(from+'/'));
 if(!m)continue;
 const moved=m[1]+old.slice(m[0].length);
 if(newMap.has(old)||reverse.has(moved))throw Error('Mapping collision: '+old);
 newMap.set(old,moved);reverse.add(moved);
 if(!afterSet.has(moved))throw Error('Missing moved file: '+moved);
}
for(const f of allNew)if(!reverse.has(f)&&f!==ROOT+'/AGENTS.md')throw Error('Unexpected new chapter file: '+f);
if(newMap.size<2150)throw Error('Too few files compared: '+newMap.size);

const urlPattern=/\]\(([^)\s]+)\)/g;
function normalize(src){
 let c=src.replace(urlPattern,'](<URL>)').replace(/\[([^\]\n]+)\]\(<URL>\)/g,'$1')
   .replace(/(\b(?:href|src)=["'])([^"'<>]+)(["'])/g,'$1<URL>$3');
 for(const [old,modern] of mappings){
  c=c.split(modern).join('<MOVED:'+old+'>');
  c=c.split(old).join('<MOVED:'+old+'>');
 }
 return c;
}
const textual=/\.(?:md|yaml|yml|json|js|mjs|cjs|ts|tsx|jsx|html|css|scss|txt|py|sh|xml|toml|svg|csv)$/i;
let exact=0,linksOnly=0;
for(const [old,moved] of newMap){
 const a=git('show',base+':'+old), b=fs.readFileSync(moved);
 if(a.equals(b)){exact++;continue;}
 if(!textual.test(moved))throw Error('Changed binary file: '+moved);
 const x=normalize(a.toString('utf8')),y=normalize(b.toString('utf8'));
 if(x!==y){
  const oldLines=x.split('\n'),newLines=y.split('\n');
  const i=oldLines.findIndex((v,j)=>v!==newLines[j]);
  throw Error('Non-link material changed: '+moved+' line '+(i+1)+'\nold: '+oldLines[i]+'\nnew: '+newLines[i]);
 }
 linksOnly++;
}
console.log('Course relocation content proof OK: 542 chapters, '+newMap.size+' files, '+exact+' byte-identical, '+linksOnly+' URL/path-only edits; mathematical text and binary resources preserved.');
