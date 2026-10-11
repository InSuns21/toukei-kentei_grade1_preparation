import { readFileSync, readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const prefix = 'textbook/volumes/00_foundations/';
const changedOnly = process.argv.includes('--changed-only');
const strict = process.argv.includes('--strict');
const opt = (name) => {const i=process.argv.indexOf(name);return i<0?'':process.argv[i+1];};
const base = opt('--base') || process.env.TEXTBOOK_BASE_SHA || '';

function countMath(s) {
  // Inline code is literal Markdown, not reader-facing mathematical notation.
  const prose = s.replace(/\x60[^\x60\n]*\x60/gu, '');
  return (prose.match(/(?<!\\)\$(?!\$)(?:\\.|[^$\\\n])+(?<!\\)\$(?!\$)/gu)||[]).length;
}
function scan(source) {
  const findings=[];let body=[], start=0, display=false, fence='';
  const flush=()=>{
    if(!body.length)return;
    const s=body.join(' ');
    const count=countMath(s);
    const prose=s.replace(/(?<!\\)\$(?!\$)(?:\\.|[^$\\\n])+(?<!\\)\$(?!\$)/gu,'').replace(/<[^>]*>/gu,'').length;
    if(count>=4&&prose>=95)findings.push({line:start,count,prose,severe:count>=8&&prose>=185});
    body=[];
  };
  for(const [i,raw] of source.split(/\r?\n/u).entries()){
    const s=raw.trim();
    const m=/^(\x60{3,}|~{3,})/u.exec(s);
    if(m){flush();if(!fence)fence=m[1][0];else if(fence===m[1][0])fence='';continue;}
    if(fence)continue;
    if(s==='$$'){flush();display=!display;continue;}
    if(display||!s||/^#{1,6}\s|^<!--|^<a\s|^\$\$/u.test(s)){flush();continue;}
    if(!body.length)start=i+1;
    body.push(s);
  }
  flush();return findings;
}
function files() {
  if(!changedOnly)return readdirSync(prefix,{withFileTypes:true}).filter(x=>x.isDirectory()).map(x=>prefix+x.name+'/index.md').filter(x=>{try{readFileSync(x);return true;}catch{return false;}});
  if(!base)throw Error('missing --base for changed-only');
  const p=spawnSync('git',['diff','--name-only','--diff-filter=ACMR',base+'...HEAD'],{encoding:'utf8'});
  if(p.status!==0)throw Error(p.stderr||'git diff failed');
  return p.stdout.split(/\r?\n/u).filter(x=>/^textbook\/volumes\/00_foundations\/[^/]+\/index\.md$/u.test(x));
}
if(process.argv.includes('--self-test')){
  const assert=(ok,m)=>{if(!ok)throw Error(m);};
  assert(countMath('x $a$ y $b$')===2,'inline count');
  const tick=String.fromCharCode(96);
  assert(countMath(tick+'$x$'+tick)===0,'inline code ignored');
  const dense='説明 $a=1$ と $b=2$ と $c=3$ と $d=4$ と $e=5$ と $f=6$ と $g=7$ と $h=8$ を使用する。'.repeat(4);
  assert(scan(dense)[0].severe,'dense detection');
  assert(scan('$$\n'+dense+'\n$$').length===0,'display ignore');
  const f=tick.repeat(3);
  assert(scan(f+'\n'+dense+'\n'+f).length===0,'fence ignore');
  console.log('Math-layout self-test OK');
}else{
  const target=files(),all=[];
  for(const file of target){for(const v of scan(readFileSync(file,'utf8')))all.push({file,...v});}
  let severe=all.filter(x=>x.severe);
  console.log('Math layout: '+target.length+' chapters, '+all.length+' review candidates, '+severe.length+' severe.');
  for(const x of all.slice(0,120))console.log((x.severe?'ERROR':'WARN')+': '+x.file+':'+x.line+' ('+x.count+' inline spans, '+x.prose+' prose characters)');
  if(all.length>120)console.log('... '+(all.length-120)+' additional candidates');
  if(strict&&severe.length)process.exitCode=1;
}
