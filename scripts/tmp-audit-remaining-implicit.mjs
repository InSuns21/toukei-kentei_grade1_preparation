import fs from 'node:fs';
const baseline='scripts/implicit-formal-baseline.txt';
for (const line of fs.readFileSync(baseline,'utf8').split(/\r?\n/).filter(Boolean)) {
  const [file, heading, term]=line.split('\t');
  const lines=fs.readFileSync(file,'utf8').split(/\r?\n/);
  const hits=[];
  lines.forEach((s,i)=>{ if(s.includes(term)) hits.push(i); });
  console.log(`\n===== ${file} | ${heading} | ${term} | hits=${hits.map(i=>i+1).join(',')} =====`);
  const seen=new Set();
  for (const hit of hits) {
    const a=Math.max(0,hit-12), b=Math.min(lines.length,hit+13);
    const key=`${a}:${b}`; if(seen.has(key)) continue; seen.add(key);
    for(let i=a;i<b;i++) console.log(`${String(i+1).padStart(4,' ')} ${lines[i]}`);
    console.log('---');
  }
}
