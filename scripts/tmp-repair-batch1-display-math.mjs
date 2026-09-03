import fs from 'node:fs';

const files = [
  'textbook/volumes/00_foundations/F0_00F_線形写像_固有空間_スペクトル定理_SVD/index.md',
  'textbook/volumes/05_engineering/E2_01_markov連鎖/index.md',
];
for (const file of files) {
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  let formal = false;
  let fixed = 0;
  for (let i = 0; i < lines.length; i += 1) {
    if (lines[i].trim() === '<!-- formal-statement-start -->') formal = true;
    else if (lines[i].trim() === '<!-- formal-statement-end -->') formal = false;
    else if (formal && lines[i].trim() === '$') {
      lines[i] = '$$';
      fixed += 1;
    }
  }
  let text = lines.join('\n');
  text = text.replace('という確率変数があるとします。<a id="def-e2-01-stochastic-process"></a>', 'という確率変数があるとします。\n\n<a id="def-e2-01-stochastic-process"></a>');
  fs.writeFileSync(file, text);
  console.log(`${file}: repaired ${fixed} display-math delimiter line(s)`);
}
