import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import YAML from 'yaml';

// Strict, content-preserving audit of the 8-category one-time relocation.
// Reuses the indexed before/after position, never infers IDs from folder names.
const base=process.argv[process.argv.indexOf('--base')+1]||process.env.TEXTBOOK_BASE_SHA;
if (!/^[a-f0-9]{40}$/i.test(base||'')) throw Error('Supply --base SHA');
const indexPath='textbook/dream-theater-index.json';
const oldRoot='textbook/volumes/00_foundations/';
const newRoot='textbook/volumes/dream_thater/';
function git(...args){return execFileSync('git',['-c','core.quotepath=false',...args],{maxBuffer:100*1024*1024});}
const oldIndex=JSON.parse(git('show',base+':'+indexPath).toString());
const newIndex=JSON.parse(fs.readFileSync(indexPath,'utf8'));
const oldItems=oldIndex.sections.flatMap(s=>s.paths.map(p=>({cat:s.name,p})));
const newItems=newIndex.sections.flatMap(s=>s.paths.map(p=>({cat:s.name,p})));
if(oldItems.length!==newItems.length||oldItems.length<500)throw Error('Unexpected index count');
const mapping=new Map(),ids=new Set();
for(let k=0;k<oldItems.length;k++){
 const a=oldItems[k],b=newItems[k];
 if(a.cat!==b.cat||!a.p.startsWith(oldRoot)||!b.p.startsWith(newRoot+b.cat+'/'))throw Error('Index category/order drift: '+k);
 const oldDir=path.posix.dirname(a.p),newDir=path.posix.dirname(b.p);
 const metadata=YAML.parse(git('show',base+':'+oldDir+'/chapter.yaml').toString());
 if(path.posix.basename(newDir)!==metadata.id||ids.has(metadata.id))throw Error('Destination ID drift: '+metadata.id);
 ids.add(metadata.id);mapping.set(oldDir,newDir);
}
const ordered=[...mapping].sort((a,b)=>b[0].length-a[0].length);
const beforeFiles=git('ls-tree','-r','--name-only',base,'--',oldRoot).toString().split('\n').filter(Boolean);
const afterFiles=git('ls-files','--',newRoot).toString().split('\n').filter(Boolean);
const oldToNew=new Map();
for(const old of beforeFiles){
 for(const [src,dest] of ordered){
  if(old.startsWith(src+'/')){oldToNew.set(old,dest+old.slice(src.length));break;}
 }
}
if(oldToNew.size<1000)throw Error('Suspiciously few lecture files: '+oldToNew.size);
const afterSet=new Set(afterFiles);
for(const [old,dest] of oldToNew)if(!afterSet.has(dest))throw Error('Missing relocated file: '+dest);
for(const dest of afterFiles)if(![...oldToNew.values()].includes(dest)&&!dest.endsWith('/AGENTS.md'))throw Error('Unexpected file in category tree: '+dest);

function normalize(source) {
 let text=source.replace(/(!?\[[^\]\n]*\]\()([^\s)]+)(\))/g,'$1<URL>$3')
   .replace(/(\b(?:href|src)=["'])([^"'<>]+)(["'])/g,'$1<URL>$3');
 // Normalize moved path strings only; other mathematical content is sacrosanct.
 for(const [old,modern] of ordered){
  text=text.split(modern).join('<MOVED:'+old+'>');
  text=text.split(old).join('<MOVED:'+old+'>');
 }
 return text;
}
const normalizeExt=/\.(?:md|yaml|yml|json|js|mjs|ts|html|css|xml|svg|txt|py|csv|sh)$/i;
let exact=0,linkOnly=0,checked=0;
for (const [old,dest] of oldToNew) {
 const before=git('show',base+':'+old);
 const after=fs.readFileSync(dest);
 if (before.equals(after)){exact++;checked++;continue;}
 if (!normalizeExt.test(dest))throw Error('Binary resource modified: '+dest);
 const normalizedBefore=normalize(before.toString('utf8'));
 const normalizedAfter=normalize(after.toString('utf8'));
 if(normalizedBefore!==normalizedAfter){
  const x=normalizedBefore.split('\n'),y=normalizedAfter.split('\n');
  const at=x.findIndex((line,i)=>line!==y[i]);
  throw Error('Non-link/content change in relocated file: '+dest+' line '+(at+1)+'\nold: '+x[at]+'\nnew: '+y[at]);
 }
 linkOnly++;checked++;
}
if(new Set(newItems.map(x=>x.p)).size!==newItems.length)throw Error('Duplicate index entries');
if(checked!==oldToNew.size)throw Error('Coverage mismatch');
console.log('Migration content proof OK: '+oldItems.length+' chapters; '+checked+' lecture files; '+exact+' byte-exact; '+linkOnly+' URL/path-only edits; all non-link mathematical text and binary assets preserved.');
