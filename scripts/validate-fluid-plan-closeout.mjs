// FLUID1–48 closeout evidence: execute the published Python, not copied kernels.
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import path from 'node:path';

const root=process.cwd();
const course='textbook/volumes/dream_thater/物理系/FLUID';
const manifest=readFileSync('textbook/dream-theater-series/FLUID.yaml','utf8');
const entries=[...manifest.matchAll(/\{ id: (FLUID\d+), path: ([^,]+), status: (\w+), title: /g)];
assert.equal(entries.length,48,'exactly 48 series entries');
const texts=new Map(),anchors=new Map();
let problems=0,labs=0,labRuns=0,selfTests=0,pySources=[];
for(let n=1;n<=48;n++){
  const id='FLUID'+n,entry=entries[n-1];
  assert.equal(entry[1],id,'manifest sequence');
  assert.equal(entry[3],'completed',id+' not completed');
  assert.equal(entry[2],course+'/'+id,'manifest path');
  const dir=entry[2],p=dir+'/index.md';
  const text=readFileSync(p,'utf8'),yaml=readFileSync(dir+'/chapter.yaml','utf8');
  const knowledge=readFileSync(dir+'/knowledge.yaml','utf8');
  texts.set(n,text);
  assert.match(yaml,new RegExp('^id: ["\\x27]?'+id+'["\\x27]?\\s*$','m'));
  assert.match(knowledge,new RegExp('^chapter: '+id+'$','m'));
  const prereqBlock=(yaml.match(/prerequisites:\n((?:  - [^\n]+\n)*)/)||[])[1]||'';
  for(const m of prereqBlock.matchAll(/^  - FLUID(\d+)$/gm)){
    assert.ok(Number(m[1])<n,id+' forward/self prerequisite: FLUID'+m[1]);
  }
  const all=[...text.matchAll(/<a id="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(new Set(all).size,all.length,id+' duplicate anchors');
  anchors.set(n,new Set(all));
  const a=(text.match(/^- Level: A\s*$/gm)||[]).length;
  const b=(text.match(/^- Level: B\s*$/gm)||[]).length;
  const c=(text.match(/^- Level: C\s*$/gm)||[]).length;
  const answers=(text.match(/<!-- solution-start -->/g)||[]).length;
  assert.ok(a>=4&&b>=3&&c>=1,id+' exercise minimum');
  assert.equal(answers,a+b+c,id+' incomplete detailed answers');
  assert.equal((text.match(/<!-- solution-end -->/g)||[]).length,answers,id+' unmatched solutions');
  assert.equal((text.match(/<!-- formal-statement-start -->/g)||[]).length,
    (text.match(/<!-- formal-statement-end -->/g)||[]).length,id+' formal blocks');
  assert.equal((text.match(/^\$\$$/gm)||[]).length%2,0,id+' display math delimiters');
  assert.ok(!text.split('\n').some(l=>l.trim()==='$'),id+' orphan math delimiter');
  problems+=answers;
  const fileMatch=[...text.matchAll(/^# lab-file: ([^\n\r]+)/gm)];
  if(!fileMatch.length)continue;
  assert.equal(fileMatch.length,1,id+' file lab inventory');
  const fenced=[...text.matchAll(/```python-file-lab\s*\n([\s\S]*?)\n```/g)];
  assert.equal(fenced.length,1,id+' executable Markdown fence missing');
  assert.ok(fenced[0][1].includes(fileMatch[0][0]),id+' lab metadata not in fence');
  assert.ok(!text.includes('<!-- python-file-lab -->'),id+' obsolete inert lab marker');
  const sourcePath=fileMatch[0][1].trim(),file=path.resolve(root,sourcePath);
  assert.ok(file.startsWith(path.resolve(root,dir)+path.sep),id+' lab path escape');
  assert.ok(existsSync(file),id+' published Python missing');
  const presets=[...text.matchAll(/^# lab-preset: .*?\|\s*([^\n\r]*)/gm)].map(m=>m[1].trim());
  assert.ok(presets.length>0,id+' no browser preset');
  const src=readFileSync(file,'utf8');
  assert.ok(src.includes('if __name__'),id+' script lacks CLI');
  pySources.push(sourcePath);
  execFileSync('python3',['-B','-m','py_compile',sourcePath],{timeout:15000,stdio:'pipe'});
  const args=presets[0]?presets[0].split(/\s+/):[];
  const stdout=execFileSync('python3',['-B',sourcePath,...args],{
    timeout:60000,maxBuffer:16*1024*1024,encoding:'utf8',
    env:{...process.env,PYTHONDONTWRITEBYTECODE:'1'}
  });
  assert.ok(stdout.trim().length>0,id+' preset returned empty output');
  assert.ok(!stdout.includes('Traceback (most recent call last)'),id+' traceback');
  labRuns++;labs++;
  if(/add_argument\(\s*['"]--self-test['"]/.test(src)){
    const self=execFileSync('python3',['-B',sourcePath,'--self-test'],{
      timeout:60000,maxBuffer:16*1024*1024,encoding:'utf8',
      env:{...process.env,PYTHONDONTWRITEBYTECODE:'1'}
    });
    assert.ok(self.trim(),id+' empty self-test output');selfTests++;
  }
  console.log('PASS '+id+' CLI preset'+(selfTests?'':'')+' — '+path.basename(sourcePath));
}
for(let n=1;n<=48;n++){
  const s=texts.get(n);
  for(const m of s.matchAll(/\]\(\.\.\/FLUID(\d+)\/index\.md#([^)]+)\)/g)){
    const target=Number(m[1]);
    assert.ok(target>=1&&target<n,'forward or invalid intra-course link FLUID'+n+' -> FLUID'+target);
    assert.ok(anchors.get(target)?.has(m[2]),'broken anchor FLUID'+n+' -> FLUID'+target+'#'+m[2]);
  }
}
const toc=readFileSync('textbook/dream-theater-toc/080_物理系/026_fluid-mechanics.md','utf8');
const linked=[...toc.matchAll(/\/FLUID(\d+)\/index\.md\)/g)].map(m=>Number(m[1]));
assert.deepEqual(linked,Array.from({length:48},(_,i)=>i+1),'public contents inventory');
const shock='textbook/volumes/dream_thater/物理系/FLUID/FLUID48/shock_tube_godunov_lab.py';
assert.ok(pySources.includes(shock),'FLUID48 source was not executed');
const run=(...args)=>JSON.parse(execFileSync('python3',['-B',shock,...args],{
  timeout:90000,maxBuffer:16*1024*1024,encoding:'utf8',
  env:{...process.env,PYTHONDONTWRITEBYTECODE:'1'}
}));
const self=run('--self-test');assert.equal(self.self_test,'passed');
const table=run('--study');
assert.deepEqual(table.comparison.map(x=>x.grid),[40,80,160]);
const errors=table.comparison.map(x=>x.density_exact_cell_mean_L1);
assert.ok(errors[2]<errors[1]&&errors[1]<errors[0],'Sod density convergence');
const shockPlot=run('--grid','80','--time','0.15','--cfl','0.45','--plot');
assert.equal(shockPlot.plots.length,3,'density, velocity and pressure plots');
assert.ok(shockPlot.plots.every(p=>p.series.length===2));
assert.ok(Math.abs(shockPlot.p_star-0.303130178050647)<1e-9);
assert.ok(Math.abs(shockPlot.u_star-0.92745262004895)<1e-9);
assert.ok(Math.abs(shockPlot.right_shock_position_exact-0.76282336)<1e-6);
assert.ok(Math.max(...shockPlot.global_balance_residual_rho_m_E.map(Math.abs))<2e-12);
assert.ok(shockPlot.min_density>0&&shockPlot.min_pressure>0);
console.log(JSON.stringify({status:'passed',chapters:48,exercises:problems,
  fileLabs:labs,executedPresets:labRuns,selfTests,shockE1:errors,
  shockBoundaryResidual:shockPlot.global_balance_residual_rho_m_E,
  minRho:shockPlot.min_density,minP:shockPlot.min_pressure},null,2));
