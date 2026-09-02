import fs from 'node:fs';
import path from 'node:path';

const ROOTS = ['textbook/volumes', 'applied-rikou-80', 'statistical-mathematics'];
const START = '<!-- formal-statement-start -->';
const typeMap = new Map([
  ['定義','def'],['定理','thm'],['命題','prop'],['補題','lem'],['系','cor'],['公理','axiom'],['原理','principle'],
]);
const anchorRe = /^\s*<a\s+id=["']((?:def|thm|prop|lem|cor|axiom|principle|ref)-[a-z0-9][a-z0-9-]*)["']\s*><\/a>\s*$/iu;
const declarationRe = /(?:\*\*|^#{2,6}\s+(?:\d+(?:\.\d+)*(?:[.)．])?\s*)?(定義|定理|命題|補題|系|公理|原理)(?:[（(：]|\*\*|$)/u;

function walk(dir){
  if(!fs.existsSync(dir)) return [];
  const out=[];
  for(const e of fs.readdirSync(dir,{withFileTypes:true})){
    const f=path.join(dir,e.name);
    if(e.isDirectory()) out.push(...walk(f));
    else if(e.isFile() && e.name.endsWith('.md')) out.push(f);
  }
  return out;
}
function pageSlug(lines,file){
  for(const line of lines){
    const m=/^#\s+([A-Za-z][A-Za-z0-9-]*)\b/.exec(line);
    if(m) return m[1].toLowerCase();
  }
  const base=path.basename(path.dirname(file));
  const m=/^([A-Za-z0-9_-]+)/.exec(base);
  return (m?.[1] || 'page').replaceAll('_','-').toLowerCase();
}

let inserted=0, filesTouched=0, panels=0;
for(const root of ROOTS){
  for(const file of walk(path.resolve(root))){
    let lines=fs.readFileSync(file,'utf8').split(/\r?\n/);
    const slug=pageSlug(lines,file);
    const used=new Set();
    for(const line of lines){ const m=anchorRe.exec(line); if(m) used.add(m[1]); }
    const counters=new Map();
    let touched=false;
    for(let i=0;i<lines.length;i++){
      if(lines[i].trim()!==START) continue;
      panels++;
      let type='thm';
      for(let j=i+1;j<Math.min(lines.length,i+15);j++){
        if(lines[j].trim()==='<!-- formal-statement-end -->') break;
        const m=declarationRe.exec(lines[j]);
        if(m){ type=typeMap.get(m[1]) || 'thm'; break; }
      }
      let existing=null;
      for(let j=Math.max(0,i-8);j<i;j++){
        const m=anchorRe.exec(lines[j]);
        if(m) existing=m[1];
      }
      if(existing) continue;
      let n=(counters.get(type)||0)+1;
      counters.set(type,n);
      let id=`${type}-${slug}-${String(n).padStart(2,'0')}`;
      while(used.has(id)){
        n++; counters.set(type,n); id=`${type}-${slug}-${String(n).padStart(2,'0')}`;
      }
      used.add(id);
      lines.splice(i,0,`<a id="${id}"></a>`,` `);
      i+=2;
      inserted++; touched=true;
    }
    if(touched){
      fs.writeFileSync(file,`${lines.join('\n').replace(/\n+$/,'')}\n`);
      filesTouched++;
    }
  }
}
console.log(`formal panels=${panels}, anchors inserted=${inserted}, files touched=${filesTouched}`);
