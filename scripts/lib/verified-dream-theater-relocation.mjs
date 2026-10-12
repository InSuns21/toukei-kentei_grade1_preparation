import fs from 'node:fs';
import {execFileSync} from 'node:child_process';

// Pure relocation is verified against the old source tree before permitting
// changed-content-only gates to defer to baseline audits. This never exempts
// ordinary new/modified lectures, and never applies to main/nightly full runs.
export function verifiedMassRelocation() {
  if(process.env.GITHUB_EVENT_NAME !== 'pull_request')return false;
  let base=process.env.PR_COMPARISON_SHA||process.env.TEXTBOOK_BASE_SHA||process.env.DREAM_THEATER_BASE_SHA;
  try{
    if(!/^[0-9a-f]{40}$/i.test(base||'')){
      base=execFileSync('git',['merge-base','origin/main','HEAD'],{encoding:'utf8'}).trim();
    }
    const index=JSON.parse(fs.readFileSync('textbook/dream-theater-index.json','utf8'));
    if(index.sections.reduce((n,s)=>n+s.paths.length,0)<500)return false;
    const previous=JSON.parse(execFileSync('git',['show',base+':textbook/dream-theater-index.json'],{encoding:'utf8'}));
    const oldFirst=previous.sections[0]?.paths?.[0]??'';
    const script=oldFirst.split('/').length===6
      ? 'scripts/verify-dream-theater-course-relocation.mjs'
      : 'scripts/verify-dream-theater-category-relocation.mjs';
    const checked=execFileSync(process.execPath,
      [script,'--base',base],
      {encoding:'utf8',maxBuffer:10*1024*1024});
    return checked.includes('Migration content proof OK:')||checked.includes('Course relocation content proof OK:');
  }catch{return false;}
}
