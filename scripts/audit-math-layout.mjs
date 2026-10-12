import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const prefix = 'textbook/volumes/dream_thater/';
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
    if(count>=4&&prose>=95)findings.push({line:start,count,prose,severe:count>=8&&prose>=185,paragraph:s});
    body=[];
  };
  for(const [i,raw] of source.split(/\r?\n/u).entries()){
    const s=raw.trim();
    const m=/^(\x60{3,}|~{3,})/u.exec(s);
    if(m){flush();if(!fence)fence=m[1][0];else if(fence===m[1][0])fence='';continue;}
    if(fence)continue;
    if(s==='$$'){flush();display=!display;continue;}
    if(display||!s||/^#{1,6}\s|^<!--|^<a\s|^\$\$/u.test(s)){flush();continue;}
    // A Markdown table consists of separate cells, not one prose paragraph.
    if(s.startsWith('|')){flush();continue;}
    // Markdown list items and blockquotes are independent units: do not
    // combine unrelated bullets into a fake giant paragraph.
    if(/^(?:\d+[.)]\s|[-*+]\s|>)/u.test(s)){
      flush();
      start=i+1;
      body=[s];
      flush();
      continue;
    }
    if(!body.length)start=i+1;
    body.push(s);
  }
  flush();return findings;
}

// Markdown list layout is structural: a newline alone does not separate two
// "(1) ... (2) ..." items, including inside a formal-statement blockquote.
function scanNumbering(source) {
  const findings=[];
  let fence='', display=false, previous=null, previousManual=null;
  const reset=()=>{previous=null;previousManual=null;};
  const stripInline=(s)=>s
    .replace(/\x60[^\x60\n]*\x60/gu,'')
    .replace(/(?<!\\)\$(?!\$)(?:\\.|[^$\\\n])+(?<!\\)\$(?!\$)/gu,'');
  for (const [i,raw] of source.split(/\r?\n/u).entries()) {
    const trimmed=raw.trim();
    const inside=trimmed.replace(/^>\s?/u,'').trim();
    const m=/^(\x60{3,}|~{3,})/u.exec(inside);
    if(m) {if(!fence)fence=m[1][0];else if(fence===m[1][0])fence='';reset();continue;}
    if(fence)continue;
    if(inside===String.fromCharCode(36).repeat(2)){display=!display;reset();continue;}
    if(display||!inside||/^<!--|^<a\s|^<svg\b|^#{1,6}\s/u.test(inside)){reset();continue;}
    if(/^\|/u.test(inside)){reset();continue;}
    const prose=stripInline(inside);
    const ordinal=[...prose.matchAll(/(?<![\p{L}\p{N}_])(?:\(([1-9]\d?)\)|（([1-9]\d?)）)(?=\s)/gu)];
    // Equation-number references such as "(1) と (2)" are not list items.
    const isListPair=(left,right)=>{
      const before=prose.slice(Math.max(0,left.index-9),left.index);
      const between=prose.slice(left.index+left[0].length,right.index).trim();
      if(/(?:式|条件|不等式)\s*$/u.test(before))return false;
      if(/^(?:では|と|の|なら|より|から|が|に|を|は)/u.test(between))return false;
      if(between.length<3)return false;
      return true;
    };
    if(ordinal.some((m,k)=>k>0&& +(m[1]||m[2])===+(ordinal[k-1][1]||ordinal[k-1][2])+1
        && isListPair(ordinal[k-1],m)))
      findings.push({line:i+1,kind:'multiple inline numbered items',text:raw.trim()});
    const manual=/^\s*(>\s*)?(?:\(([1-9]\d?)\)|（([1-9]\d?)）|([1-9]\d?)\))\s/u.exec(raw);
    if(manual&&previousManual&&Boolean(manual[1])===previousManual.quoted
        && +(manual[2]||manual[3]||manual[4])===previousManual.number+1)
      findings.push({line:i+1,kind:'adjacent handwritten items collapse into one Markdown paragraph',text:raw.trim()});
    previousManual=manual?{quoted:Boolean(manual[1]),number:+(manual[2]||manual[3]||manual[4])}:null;
    const item=/^(\s*)(>\s*)?(\d{1,2})\.\s+\S/u.exec(raw);
    if(item){
      const indent=item[1].length, quoted=Boolean(item[2]), value=+item[3];
      if(previous&&previous.indent===indent&&previous.quoted===quoted&&value!==previous.value+1){
        findings.push({line:i+1,kind:'nonsequential ordered list',text:raw.trim()});
      }
      previous={value,indent,quoted};
    } else if(!/^(?:\s+|>\s+)\S/u.test(raw)) reset();
    else if(!/^\s*>\s+/u.test(raw)&&previous?.quoted)reset();
  }
  return findings;
}


/**
 * A display-math block between two blockquoted ordered items closes the
 * Markdown list; the next blockquote starts numbering from 1 again.
 * Explicit named conditions (e.g. （G1）/（G2）) are the safe alternative.
 */
function scanFragmentedFormalLists(source) {
  const findings=[];
  let inside=false, last=null, displayBetween=false;
  const lines=source.split(/\r?\n/u);
  lines.forEach((raw,i)=>{
    if(/<!-- formal-statement-start -->/u.test(raw)) {
      inside=true;last=null;displayBetween=false;return;
    }
    if(/<!-- formal-statement-end -->/u.test(raw)) {
      inside=false;last=null;displayBetween=false;return;
    }
    if(!inside)return;
    const m=/^>\s*(\d{1,2})\.\s+\S/u.exec(raw);
    if(m){
      const number=+m[1];
      if(last!==null&&displayBetween&&number===last+1) {
        findings.push({line:i+1,kind:'ordered list split by displayed equation',text:raw.trim()});
      }
      last=number;
      displayBetween=false;
      return;
    }
    if(raw.trim()===String.fromCharCode(36).repeat(2)&&last!==null)displayBetween=true;
  });
  return findings;
}

function files() {
  if(!changedOnly)return readdirSync(prefix,{withFileTypes:true}).filter(x=>x.isDirectory()).flatMap(x=>readdirSync(prefix+x.name,{withFileTypes:true}).filter(y=>y.isDirectory()).flatMap(y=>readdirSync(prefix+x.name+'/'+y.name,{withFileTypes:true}).filter(z=>z.isDirectory()).map(z=>prefix+x.name+'/'+y.name+'/'+z.name+'/index.md'))).filter(x=>existsSync(x));
  if(!base)throw Error('missing --base for changed-only');
  const p=spawnSync('git',['-c','core.quotePath=false','diff','--name-only','--diff-filter=ACMR',base+'...HEAD'],{encoding:'utf8'});
  if(p.status!==0)throw Error(p.stderr||'git diff failed');
  return p.stdout.split(/\r?\n/u).filter(x=>/^textbook\/volumes\/dream_thater\/[^/]+\/[^/]+\/[^/]+\/index\.md$/u.test(x));
}
if(process.argv.includes('--self-test')){
  const assert=(ok,m)=>{if(!ok)throw Error(m);};
  assert(countMath('x $a$ y $b$')===2,'inline count');
  const tick=String.fromCharCode(96);
  assert(countMath(tick+'$x$'+tick)===0,'inline code ignored');
  const dense='説明 $a=1$ と $b=2$ と $c=3$ と $d=4$ と $e=5$ と $f=6$ と $g=7$ と $h=8$ を使用する。'.repeat(8);
  assert(scan(dense)[0].severe,'dense detection');
  assert(scan('$$\n'+dense+'\n$$').length===0,'display ignore');
  const f=tick.repeat(3);
  assert(scan(f+'\n'+dense+'\n'+f).length===0,'fence ignore');
  assert(scanNumbering('> 相対性について、(1) 原理A、(2) 原理B。').some(x=>x.kind==='multiple inline numbered items'),'inline pair caught');
  assert(scanNumbering('1. First\n3. Third').some(x=>x.kind==='nonsequential ordered list'),'sequence gap caught');
  assert(scanNumbering('> (1) First\n> (2) Second').some(x=>x.kind==='adjacent handwritten items collapse into one Markdown paragraph'),'adjacent quoted items caught');
  assert(scanNumbering('(1) 導出\n\n'+String.fromCharCode(36).repeat(2)+'\nx=1\n'+String.fromCharCode(36).repeat(2)+'\n\n(2) 検算').length===0,'separate worked solution steps allowed');
  assert(scanNumbering('> **原理**\n>\n> 1. 相対性原理\n> 2. 光速度不変').length===0,'proper quoted ordered list');
  const eq=String.fromCharCode(36).repeat(2);
  const broken=[
    '<!-- formal-statement-start -->',
    '> 1. 第一条件',
    '>',
    eq,
    'x=1',
    eq,
    '>',
    '> 2. 第二条件',
    '<!-- formal-statement-end -->'
  ].join(String.fromCharCode(10));
  assert(scanFragmentedFormalLists(broken).length===1,'math-fragmented formal list caught');
  const safe=[
    '<!-- formal-statement-start -->',
    '> **（G1）第一条件**',
    eq,
    'x=1',
    eq,
    '> **（G2）第二条件**',
    '<!-- formal-statement-end -->'
  ].join(String.fromCharCode(10));
  assert(scanFragmentedFormalLists(safe).length===0,'named axioms stay intact');
  assert(scanNumbering(String.fromCharCode(36).repeat(2)+'\n(1) one (2) two\n'+String.fromCharCode(36).repeat(2)).length===0,'display ignored');
  assert(scanNumbering('\x60(1) one (2) two\x60').length===0,'inline code ignored');
  assert(scanNumbering('f(1) = 2, f(2) = 3').length===0,'function values not item markers');
  assert(scanNumbering('式 (1) より $x$ が増え、式 (2) より $y$ は減ります。').length===0,'equation references ignored');
  assert(scanNumbering('(1) と (2) の違いは添字だけです。').length===0,'named case references ignored');
  assert(scanNumbering('(3) (1) と[前述の定理](#ref)から結論する。(2) により成立。').length===0,'referenced earlier steps not treated as list');
  assert(scanNumbering('**(3)** 証明済み。(1) では $s$、(2) では $t$ を使う。').length===0,'comparisons of earlier cases ignored');
  console.log('Math-layout self-test OK');
}else{
  const target=files(),all=[];
  for(const file of target){for(const v of scan(readFileSync(file,'utf8')))all.push({file,...v});}
  if(process.argv.includes('--review-all')){
    // Full diagnostic inventory for classifying every candidate, not just the first 120.
    // Keep output structured so reviewers can distinguish references from derivations.
    for(const x of all)console.log('REVIEW_JSON '+JSON.stringify(x));
  }
  const numbering=target.flatMap(file=>{const source=readFileSync(file,'utf8');return [...scanNumbering(source),...scanFragmentedFormalLists(source)].map(x=>({file,...x}));});
  let severe=all.filter(x=>x.severe);
  console.log('Numbering layout: '+numbering.length+' violations in '+target.length+' chapters.');
  for (const x of numbering.slice(0,150))console.log('NUMBERING: '+x.file+':'+x.line+' ('+x.kind+') '+x.text.slice(0,130));
  if(numbering.length>150)console.log('... '+(numbering.length-150)+' additional numbering findings');
  console.log('Math layout: '+target.length+' chapters, '+all.length+' review candidates, '+severe.length+' severe.');
  for(const x of [...all.filter(x=>x.severe),...all.filter(x=>!x.severe).slice(0,120)])console.log((x.severe?'ERROR':'WARN')+': '+x.file+':'+x.line+' ('+x.count+' inline spans, '+x.prose+' prose characters)');
  if(all.length>120)console.log('... '+(all.length-120)+' additional candidates');
  // A chapter touched solely to repair Markdown lists must not be blocked by
  // unchanged legacy dense paragraphs. Keep the full inventory visible, but
  // make changed-only strict mode a content-level non-regression check.
  let newSevere=severe;
  let newNumbering=numbering;
  if(changedOnly && base){
    const baseline=new Map();
    for(const file of target){
      const p=spawnSync('git',['show',base+':'+file],{encoding:'utf8'});
      if(p.status!==0){baseline.set(file,null);continue;}
      const prevSevere=scan(p.stdout).filter(x=>x.severe);
      const prevNumbering=[...scanNumbering(p.stdout),...scanFragmentedFormalLists(p.stdout)];
      baseline.set(file,{
        severe:new Map(prevSevere.map(v=>[v.paragraph,(prevSevere.filter(x=>x.paragraph===v.paragraph)).length])),
        numbering:new Map(prevNumbering.map(v=>[v.kind+'\t'+v.text,(prevNumbering.filter(x=>x.kind===v.kind&&x.text===v.text)).length]))
      });
    }
    newSevere=severe.filter(x=>{
      const prior=baseline.get(x.file);
      if(!prior)return true;
      const n=prior.severe.get(x.paragraph)||0;
      if(n){prior.severe.set(x.paragraph,n-1);return false;}
      return true;
    });
    newNumbering=numbering.filter(x=>{
      const prior=baseline.get(x.file);
      if(!prior)return true;
      const key=x.kind+'\t'+x.text;
      const n=prior.numbering.get(key)||0;
      if(n){prior.numbering.set(key,n-1);return false;}
      return true;
    });
    console.log('Changed-only regressions: '+newNumbering.length+' numbering, '+newSevere.length+' severe math-density (legacy findings remain in inventory).');
  }
  if(strict&&(newSevere.length||newNumbering.length))process.exitCode=1;
}
