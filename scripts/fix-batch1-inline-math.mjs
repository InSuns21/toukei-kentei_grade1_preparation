import fs from 'node:fs';

const edits = [
  {
    path: 'textbook/volumes/03_inference/I3_03_正規母集団_適合度_ノンパラメトリック検定/index.md',
    from: '> $P(A=a\\mid\\text{周辺和})\n> =\\binom Ka\\binom{N-K}{n_1-a}/\\binom N{n_1}$',
    to: '> $P(A=a\\mid\\text{周辺和})=\\binom Ka\\binom{N-K}{n_1-a}/\\binom N{n_1}$',
  },
  {
    path: 'textbook/volumes/03_inference/I4_01_ベイズ推定_事後分布_予測分布/index.md',
    from: '> $X_j^{(t+1)}\n> \\sim\n> \\pi(x_j\\mid X_1^{(t+1)},\\ldots,X_{j-1}^{(t+1)},X_{j+1}^{(t)},\\ldots,X_d^{(t)})$',
    to: '> $X_j^{(t+1)}\\sim\\pi(x_j\\mid X_1^{(t+1)},\\ldots,X_{j-1}^{(t+1)},X_{j+1}^{(t)},\\ldots,X_d^{(t)})$',
  },
  {
    path: 'textbook/volumes/04_linear_models/L1_03_分散分析/index.md',
    from: '> $Y_{ij}\n> =\n> \\mu+\\tau_i+\\beta(X_{ij}-\\bar X_{\\cdot\\cdot})+\\varepsilon_{ij}$',
    to: '> $Y_{ij}=\\mu+\\tau_i+\\beta(X_{ij}-\\bar X_{\\cdot\\cdot})+\\varepsilon_{ij}$',
  },
  {
    path: 'textbook/volumes/05_engineering/E1_04_プロビット_非線形回帰_SVM/index.md',
    from: '> $Y_i^*=x_i^\\mathsf T\\beta+\\varepsilon_i,\\qquad\n> \\varepsilon_i\\sim N(0,\\sigma^2)$',
    to: '> $Y_i^*=x_i^\\mathsf T\\beta+\\varepsilon_i,\\qquad \\varepsilon_i\\sim N(0,\\sigma^2)$',
  },
];

for (const edit of edits) {
  const before = fs.readFileSync(edit.path, 'utf8');
  if (before.includes(edit.to)) continue;
  const count = before.split(edit.from).length - 1;
  if (count !== 1) throw new Error(`${edit.path}: expected replacement source once, got ${count}`);
  fs.writeFileSync(edit.path, before.replace(edit.from, edit.to), 'utf8');
}
