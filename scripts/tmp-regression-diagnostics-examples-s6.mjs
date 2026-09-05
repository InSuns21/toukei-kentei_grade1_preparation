import fs from 'node:fs';

const path = 'textbook/volumes/04_linear_models/L1_04_回帰診断_一般化最小二乗_正則化/index.md';
let text = fs.readFileSync(path, 'utf8');

function replaceOnce(oldText, newText, label) {
  const count = text.split(oldText).length - 1;
  if (count === 1) {
    text = text.replace(oldText, () => newText);
    return;
  }
  if (text.includes(newText)) return;
  throw new Error(`${label}: expected exactly one target, found ${count}`);
}

replaceOnce(
`<!-- formal-statement-end -->

$X$ の列数を $p$ とすると、$H$ は階数 $p$ の射影行列なので`,
`<!-- formal-statement-end -->

<!-- definition-example-start: def-l1-04-leverage -->
**定義の確認**  
切片を含む単回帰で $n=10$ なら $p=2$ なので、$\\sum_i h_{ii}=2$、平均レバレッジは $2/10=0.2$ です。例えば $h_{ii}=0.6$ の点は平均よりかなり大きく、説明変数空間で端にある候補と読めます。
<!-- definition-example-end -->

$X$ の列数を $p$ とすると、$H$ は階数 $p$ の射影行列なので`,
'L1-04 leverage definition example'
);

replaceOnce(
`<!-- formal-statement-end -->

![一般化最小二乗法の白色化](./figures/gls-whitening.svg)`,
`<!-- formal-statement-end -->

<!-- definition-example-start: def-l1-04-whitening -->
**定義の確認**  
$\\Omega=\\operatorname{diag}(4,1)$ なら $L=\\operatorname{diag}(2,1)$ と取れます。$L^{-1}=\\operatorname{diag}(1/2,1)$ を掛けると、分散が4だった第1成分も分散1へそろい、変換後の共分散は $\\sigma^2 I$ になります。
<!-- definition-example-end -->

![一般化最小二乗法の白色化](./figures/gls-whitening.svg)`,
'L1-04 whitening definition example'
);

fs.writeFileSync(path, text, 'utf8');
