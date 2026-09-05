import fs from 'node:fs';

function insertAfterFormal(path, anchor, ids, body) {
  let s = fs.readFileSync(path, 'utf8');
  const marker = `<!-- definition-example-start: ${ids} -->`;
  if (s.includes(marker)) return;
  const a = s.indexOf(`<a id="${anchor}"></a>`);
  if (a < 0) throw new Error(`${path}: anchor not found: ${anchor}`);
  const endToken = '<!-- formal-statement-end -->';
  const e = s.indexOf(endToken, a);
  if (e < 0) throw new Error(`${path}: formal statement end not found after ${anchor}`);
  const pos = e + endToken.length;
  const block = `\n\n${marker}\n**定義の確認**  \n${body}\n<!-- definition-example-end -->`;
  s = s.slice(0, pos) + block + s.slice(pos);
  fs.writeFileSync(path, s, 'utf8');
}

const P202 = 'textbook/volumes/01_probability/P2_02_期待値_分散_共分散_母関数/index.md';
insertAfterFormal(
  P202,
  'def-p2-02-conditional-expectation',
  'def-p2-02-conditional-expectation',
  '例えば $P(Z=0)=P(Z=1)=1/2$ で、$X=2Z+1$ とします。このとき $E[X\\mid Z=0]=1$、$E[X\\mid Z=1]=3$ なので、条件付き期待値は確率変数として $E[X\\mid Z]=2Z+1=X$ です。「$Z=z$ を固定した数値」と「$Z$ の関数としての確率変数」を区別できます。'
);

const I102 = 'textbook/volumes/03_inference/I1_02_推定法と推定量の評価/index.md';
insertAfterFormal(
  I102,
  'def-i1-02-moment-method',
  'def-i1-02-moment-method',
  '$X_1,\\ldots,X_n\\sim U(0,\\theta)$ では $E[X]=\\theta/2$ と $\\bar X$ を等置して $\\hat\\theta_{\\mathrm{MM}}=2\\bar X$ を得ます。母集団モーメントと標本モーメントを等置して母数を解く、という定義そのものの計算です。'
);
insertAfterFormal(
  I102,
  'def-i1-02-least-squares',
  'def-i1-02-least-squares',
  '位置母数モデル $m_i(\\mu)=\\mu$ では $Q(\\mu)=\\sum_i(X_i-\\mu)^2$ です。$Q\'(\\mu)=0$ を解くと $\\hat\\mu=\\bar X$ となり、残差平方和を最小にする値という定義を具体的に確認できます。'
);
insertAfterFormal(
  I102,
  'def-i1-02-mse',
  'def-i1-02-bias, def-i1-02-mse',
  '$E[T]=\\theta+1/n$、$\\operatorname{Var}(T)=2/n$ なら、バイアスは $1/n$、平均二乗誤差は $2/n+1/n^2$ です。不偏性は期待値のずれ、平均二乗誤差は分散とずれを合わせた尺度であることが分かります。'
);
insertAfterFormal(
  I102,
  'def-i1-02-consistency',
  'def-i1-02-consistency',
  '$T_n=\\frac{n}{n+1}\\bar X$ とし $E[X]=\\mu$、$\\operatorname{Var}(X)=\\sigma^2<\\infty$ とします。$T_n-\\mu=\\frac{n}{n+1}(\\bar X-\\mu)-\\frac{\\mu}{n+1}$ で、第1項は大数則、第2項は通常の極限で0へ行くため $T_n\\xrightarrow{p}\\mu$、したがって一致的です。'
);
insertAfterFormal(
  I102,
  'def-i1-02-blue',
  'def-i1-02-blue',
  '独立な不偏測定 $Y_1,Y_2$ の分散がそれぞれ $1,4$ なら、$wY_1+(1-w)Y_2$ の分散を最小にする重みは $w=4/5$ です。線形かつ不偏というクラスの中で分散を最小にする、という BLUE の「最良」を具体化しています。'
);
insertAfterFormal(
  I102,
  'def-i1-02-fisher-information',
  'def-i1-02-fisher-information',
  '$X\\sim N(\\mu,\\sigma^2)$ で $\\sigma^2$ 既知なら、1観測のスコアは $U(\\mu)=(X-\\mu)/\\sigma^2$ です。よって $E[U(\\mu)^2]=\\sigma^2/\\sigma^4=1/\\sigma^2$ となり、フィッシャー情報量の定義を直接計算できます。'
);
insertAfterFormal(
  I102,
  'def-i1-02-efficient-estimator',
  'def-i1-02-efficient-estimator',
  'ベルヌーイ標本では $I_n(p)=n/[p(1-p)]$ なのでクラーメル・ラオ下限は $p(1-p)/n$ です。標本平均 $\\bar X$ は不偏で、その分散も $p(1-p)/n$ だから下限を達成し、本章の意味で有効推定量です。'
);

const L103 = 'textbook/volumes/04_linear_models/L1_03_分散分析/index.md';
insertAfterFormal(
  L103,
  'def-l1-03-main-effect',
  'def-l1-03-main-effect',
  '本文の $2\\times2$ 例では、因子Aの周辺平均が11と16なのでAの主効果は平均的に $16-11=5$、因子Bの周辺平均が10と17なのでBの主効果は $17-10=7$ です。各セルを直接比べるのではなく、他方の因子について平均した周辺平均を比較しています。'
);

const E104 = 'textbook/volumes/05_engineering/E1_04_プロビット_非線形回帰_SVM/index.md';
insertAfterFormal(
  E104,
  'def-e1-04-hinge-loss',
  'def-e1-04-hinge-loss',
  '$yf=1.4,0.6,-0.3$ の3点では hinge損失はそれぞれ $0,0.4,1.3$ です。正しく分類されてもマージン内の点には正の損失が生じ、誤分類点では1を超える損失になることを定義式から確認できます。'
);
