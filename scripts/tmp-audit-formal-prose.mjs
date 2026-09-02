import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('textbook/volumes');
const START = '<!-- formal-statement-start -->';
const END = '<!-- formal-statement-end -->';
const boldDefinitionRe = /\*\*([^*]{1,60})\*\*\s*と(?:いいます|呼びます|定義します)/u;

function walk(dir) {
  const out=[];
  for (const e of fs.readdirSync(dir,{withFileTypes:true})) {
    const f=path.join(dir,e.name);
    if (e.isDirectory()) out.push(...walk(f));
    else if (e.isFile() && e.name==='index.md') out.push(f);
  }
  return out;
}

const definitions=[];
const quotes=[];
const perFile=new Map();
for (const file of walk(ROOT)) {
  const rel=path.relative(process.cwd(),file).replaceAll(path.sep,'/');
  const lines=fs.readFileSync(file,'utf8').split(/\r?\n/);
  let depth=0, fence=false;
  let currentHeading='';
  for (let i=0;i<lines.length;i++) {
    const line=lines[i];
    const t=line.trim();
    if (/^```/.test(t)) { fence=!fence; continue; }
    if (fence) continue;
    if (/^#{2,6}\s+/.test(line)) currentHeading=t;
    if (t===START) { depth++; continue; }
    if (t===END) { depth=Math.max(0,depth-1); continue; }
    if (depth>0) continue;

    const b=boldDefinitionRe.exec(line);
    if (b) {
      const term=b[1].trim();
      if (!/^(?:ZFC|Schwartz超関数|distribution)$/iu.test(term)) {
        definitions.push(`${rel}:${i+1}: [${currentHeading}] TERM=${term} :: ${line.trim()}`);
        perFile.set(rel,(perFile.get(rel)||0)+1);
      }
    }

    if (/^>\s+/.test(line) && !/^>\s+\*\*(?:定義|定理|命題|補題|系|公理|原理)/u.test(line)) {
      const headingFormal=/(?:公理|定理|補題|命題|原理)(?:\s|$|[（(])/u.test(currentHeading);
      const assertion=/(?:存在する|同値である|成り立つ|拡張できる|持つ。|である。)/u.test(line);
      if (headingFormal && assertion) {
        quotes.push(`${rel}:${i+1}: [${currentHeading}] ${line.trim()}`);
        perFile.set(rel,(perFile.get(rel)||0)+1);
      }
    }
  }
}

console.log(`BOLD_DEFINITION_CANDIDATES=${definitions.length}`);
for (const r of definitions) console.log(r);
console.log(`\nUNLABELED_FORMAL_QUOTES=${quotes.length}`);
for (const r of quotes) console.log(r);
console.log('\nCOUNTS_BY_FILE');
for (const [file,n] of [...perFile].sort((a,b)=>b[1]-a[1] || a[0].localeCompare(b[0]))) console.log(`${n}\t${file}`);
