import fs from 'node:fs';
import path from 'node:path';

const root = 'applied-rikou-80';
let changed = 0;

for (const file of walk(root)) {
  if (!file.endsWith('.md')) continue;
  const source = fs.readFileSync(file, 'utf8');
  let text = source;

  // 公式シラバスが英字で掲載する表記は、その表記へ戻す。
  text = text.replaceAll('マルコフ連鎖モンテカルロ法', 'MCMC');
  text = text.replaceAll('自己回帰和分移動平均', 'ARIMA');

  // 時系列モデルの標準記号は教材本文でも許容する。
  text = text.replaceAll('自己回帰移動平均', 'ARMA');
  text = text.replace(/自己回帰\((\d+)\)/g, 'AR($1)');
  text = text.replace(/移動平均\((\d+)\)/g, 'MA($1)');
  text = text.replaceAll('自己回帰・移動平均モデル', 'AR・MAモデル');
  text = text.replaceAll('自己回帰側', 'AR側');
  text = text.replaceAll('自己回帰特性多項式', 'AR特性多項式');

  if (text !== source) {
    fs.writeFileSync(file, text, 'utf8');
    changed += 1;
  }
}

console.log(`${changed} files updated to syllabus-aligned terminology.`);

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}
