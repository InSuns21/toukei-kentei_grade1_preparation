import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('textbook/volumes');
const START = '<!-- formal-statement-start -->';
const END = '<!-- formal-statement-end -->';
const phraseRe = /(?:といいます|と呼びます|と定義します|という。|と呼ぶ。|と定義する。)/u;
const formalNameRe = /(選択関数|選択公理|可算選択|整列|半順序|全順序|chain|鎖|上界|極大元|コーシー|コンパクト|連続|開集合|閉集合|内点|閉包|境界|ノルム|Banach|可測|測度|単関数|Lebesgue|Hölder|Minkowski|線形写像|核|像|固有|基底|次元|直交|射影|共役|双対|劣微分|接錐|polar|確率|確率変数|独立|分布|期待値|分散|共分散|十分|完備|統計量|推定量|一致|漸近|Brown|martingale|停止時刻|Fourier|Herglotz|Wold)/iu;

function walk(dir) {
  const out=[];
  for (const e of fs.readdirSync(dir,{withFileTypes:true})) {
    const f=path.join(dir,e.name);
    if (e.isDirectory()) out.push(...walk(f));
    else if (e.isFile() && e.name==='index.md') out.push(f);
  }
  return out;
}

const rows=[];
for (const file of walk(ROOT)) {
  const rel=path.relative(process.cwd(),file).replaceAll(path.sep,'/');
  const lines=fs.readFileSync(file,'utf8').split(/\r?\n/);
  let depth=0, fence=false;
  for (let i=0;i<lines.length;i++) {
    const t=lines[i].trim();
    if (/^```/.test(t)) { fence=!fence; continue; }
    if (fence) continue;
    if (t===START) { depth++; continue; }
    if (t===END) { depth=Math.max(0,depth-1); continue; }
    if (depth>0) continue;
    const window=lines.slice(Math.max(0,i-2),Math.min(lines.length,i+3)).join(' ');
    const proseCandidate=phraseRe.test(lines[i]) && formalNameRe.test(window);
    const unlabeledQuote=/^>\s+/.test(lines[i]) && !/^>\s+\*\*(?:定義|定理|命題|補題|系|公理|原理)/u.test(lines[i]) && /(?:公理|定理|命題|補題|定義|存在する|同値)/u.test(window);
    if (proseCandidate || unlabeledQuote) rows.push(`${rel}:${i+1}: ${lines[i].trim()}`);
  }
}
console.log(`CANDIDATES=${rows.length}`);
for (const r of rows) console.log(r);
