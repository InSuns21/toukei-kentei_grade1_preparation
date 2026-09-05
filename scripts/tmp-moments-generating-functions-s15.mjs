import fs from 'node:fs';

const path = 'textbook/volumes/01_probability/P2_02_期待値_分散_共分散_母関数/index.md';
let text = fs.readFileSync(path, 'utf8');

function replaceOnce(needle, replacement, label) {
  if (!text.includes(needle)) throw new Error(`S15 needle not found: ${label}`);
  text = text.replace(needle, () => replacement);
}

if (!text.includes('def-p2-02-expectation')) {
  const needle = `### 2.1 期待値と存在条件\n\n離散型確率変数 $X$ の確率質量関数を $p_X(x)=P(X=x)$ とします。\n\n$$\n\\sum_x |x|p_X(x)<\\infty\n$$\n\nなら\n\n$$\nE[X]=\\sum_x x p_X(x)\n$$\n\nと定義します。\n\n連続型確率変数 $X$ の確率密度関数を $f_X(x)$ とします。\n\n$$\n\\int_{-\\infty}^{\\infty}|x|f_X(x)\\,dx<\\infty\n$$\n\nなら\n\n$$\nE[X]=\\int_{-\\infty}^{\\infty}x f_X(x)\\,dx\n$$\n\nと定義します。正の部分と負の部分がともに無限大となる場合に、形式的な相殺で有限値を作ってはいけません。\n\n一般の実数値関数 $g$ についても、$E[|g(X)|]<\\infty$ なら $E[g(X)]$ を同様に定義します。`;
  const replacement = `### 2.1 期待値と存在条件\n\n<a id="def-p2-02-expectation"></a>\n\n<!-- formal-statement-start -->\n> **定義（期待値）**  \n> 離散型確率変数 $X$ で $\\sum_x|x|p_X(x)<\\infty$ のとき $E[X]=\\sum_x x p_X(x)$、連続型で $\\int_{-\\infty}^{\\infty}|x|f_X(x)\\,dx<\\infty$ のとき $E[X]=\\int_{-\\infty}^{\\infty}x f_X(x)\\,dx$ と定め、$X$ の **期待値** という。一般に $E[|g(X)|]<\\infty$ なら $E[g(X)]$ も同じ考え方で定める。\n<!-- formal-statement-end -->\n\n<!-- definition-example-start: def-p2-02-expectation -->\n**定義の確認**  \n$X\\sim\\operatorname{Bernoulli}(p)$ なら $E[X]=0\\cdot(1-p)+1\\cdot p=p$ です。確率で重み付けした値の平均になっています。\n<!-- definition-example-end -->\n\n絶対可積分性を要求するのは、正の部分と負の部分がともに無限大となる場合に、形式的な相殺で有限値を作らないためです。\n\n### 2.1A モーメント\n\n<a id="def-p2-02-moment"></a>\n\n<!-- formal-statement-start -->\n> **定義（モーメント）**  \n> $r$ を正の整数とする。$E[|X|^r]<\\infty$ のとき $m_r=E[X^r]$ を **$r$ 次モーメント（原点まわりのモーメント）** という。また平均 $\\mu=E[X]$ が存在し $E[|X-\\mu|^r]<\\infty$ なら $\\mu_r=E[(X-\\mu)^r]$ を **$r$ 次中心モーメント** という。\n<!-- formal-statement-end -->\n\n<!-- definition-example-start: def-p2-02-moment -->\n**定義の確認**  \n$X\\sim\\operatorname{Bernoulli}(p)$ では $X^r=X$ $(r\\ge1)$ なので全ての正整数次モーメントは $E[X^r]=p$ です。第2中心モーメントは $E[(X-p)^2]=p(1-p)$ で、これは分散に一致します。\n<!-- definition-example-end -->`;
  replaceOnce(needle, replacement, 'expectation-and-moment');
}

if (!text.includes('def-p2-02-variance-sd')) {
  const needle = `### 2.2 分散・標準偏差\n\n$X$ を実数値確率変数とし、$E[X^2]<\\infty$ とします。このとき\n\n$$\n\\operatorname{Var}(X)=E[(X-E[X])^2],\n\\qquad\n\\operatorname{sd}(X)=\\sqrt{\\operatorname{Var}(X)}\n$$\n\nと定義します。`;
  const replacement = `### 2.2 分散・標準偏差\n\n<a id="def-p2-02-variance-sd"></a>\n\n<!-- formal-statement-start -->\n> **定義（分散・標準偏差）**  \n> $E[X^2]<\\infty$ のとき $\\operatorname{Var}(X)=E[(X-E[X])^2]$ を $X$ の **分散** といい、その非負平方根 $\\operatorname{sd}(X)=\\sqrt{\\operatorname{Var}(X)}$ を **標準偏差** という。分散は平均からの偏差の2乗の平均であり、標準偏差は元の変数と同じ単位をもつ。\n<!-- formal-statement-end -->\n\n<!-- definition-example-start: def-p2-02-variance-sd -->\n**定義の確認**  \n$X\\sim\\operatorname{Bernoulli}(p)$ では $E[X]=p$ なので $\\operatorname{Var}(X)=p(1-p)$、標準偏差は $\\sqrt{p(1-p)}$ です。$p=1/2$ なら分散 $1/4$、標準偏差 $1/2$ です。\n<!-- definition-example-end -->`;
  replaceOnce(needle, replacement, 'variance-sd');
}

if (!text.includes('def-p2-02-covariance-correlation')) {
  const needle = `### 2.3 共分散・相関係数\n\n$X,Y$ を実数値確率変数とし、$E[X^2],E[Y^2]<\\infty$ とします。このとき\n\n$$\n\\operatorname{Cov}(X,Y)\n=E[(X-E[X])(Y-E[Y])]\n$$\n\nと定義します。\n\nさらに $\\operatorname{Var}(X),\\operatorname{Var}(Y)>0$ なら\n\n$$\n\\rho(X,Y)\n=\\frac{\\operatorname{Cov}(X,Y)}\n{\\sqrt{\\operatorname{Var}(X)\\operatorname{Var}(Y)}}\n$$\n\nを相関係数とします。`;
  const replacement = `### 2.3 共分散・相関係数\n\n<a id="def-p2-02-covariance-correlation"></a>\n\n<!-- formal-statement-start -->\n> **定義（共分散・相関係数）**  \n> $E[X^2],E[Y^2]<\\infty$ のとき $\\operatorname{Cov}(X,Y)=E[(X-E[X])(Y-E[Y])]$ を **共分散** という。さらに $\\operatorname{Var}(X),\\operatorname{Var}(Y)>0$ のとき $\\rho(X,Y)=\\operatorname{Cov}(X,Y)/\\sqrt{\\operatorname{Var}(X)\\operatorname{Var}(Y)}$ を **相関係数** という。相関係数は共分散を標準偏差で無次元化した量である。\n<!-- formal-statement-end -->\n\n<!-- definition-example-start: def-p2-02-covariance-correlation -->\n**定義の確認**  \n$E[X]=0$, $\\operatorname{Var}(X)=1$ とし $Y=2X$ とすると、$\\operatorname{Cov}(X,Y)=2$、$\\operatorname{Var}(Y)=4$ なので $\\rho(X,Y)=2/(1\\cdot2)=1$ です。尺度を2倍して共分散が変わっても、完全な正の線形関係という相関は1のままです。\n<!-- definition-example-end -->`;
  replaceOnce(needle, replacement, 'covariance-correlation');
}

if (!text.includes('def-p2-02-pgf')) {
  const needle = `### 2.7 確率母関数\n\n$X$ を $\\mathbb N_0=\\{0,1,2,\\ldots\\}$ 上の確率変数とし、その確率質量関数を\n\n$$\np_X(k)=P(X=k)\n$$\n\nとします。このとき\n\n$$\nG_X(s)=E[s^X]\n=\\sum_{k=0}^{\\infty}p_X(k)s^k\n$$\n\nを $X$ の確率母関数と呼びます。$|s|\\leq1$ では $|s|^X\\leq1$ なので必ず有限で、特に`;
  const replacement = `### 2.7 確率母関数\n\n<a id="def-p2-02-pgf"></a>\n\n<!-- formal-statement-start -->\n> **定義（確率母関数）**  \n> $\\mathbb N_0$ 値確率変数 $X$ に対し、$G_X(s)=E[s^X]=\\sum_{k=0}^{\\infty}P(X=k)s^k$ を $X$ の **確率母関数** という。少なくとも $|s|\\le1$ では有限であり、確率質量をべき級数の係数としてまとめた関数である。\n<!-- formal-statement-end -->\n\n<!-- definition-example-start: def-p2-02-pgf -->\n**定義の確認**  \n$X\\sim\\operatorname{Bernoulli}(p)$ では $G_X(s)=(1-p)s^0+ps^1=1-p+ps$ です。$G_X(1)=1$ となり、係数の和が全確率1であることも確認できます。\n<!-- definition-example-end -->\n\n$|s|\\leq1$ では $|s|^X\\leq1$ なので必ず有限で、特に`;
  replaceOnce(needle, replacement, 'pgf');
}

if (!text.includes('def-p2-02-mgf')) {
  const needle = `### 2.8 モーメント母関数\n\n$X$ を実数値確率変数とし、$t\\in\\mathbb R$ とします。期待値が有限な $t$ に対して\n\n$$\nM_X(t)=E[e^{tX}]\n$$\n\nを $X$ のモーメント母関数と呼びます。$M_X(0)=1$ は常に成り立ちますが、$t\\neq0$ で有限とは限りません。0を含む開区間で有限なら、その区間内でのモーメント母関数は分布を一意に定め、微分からモーメントを取り出せます。`;
  const replacement = `### 2.8 モーメント母関数\n\n<a id="def-p2-02-mgf"></a>\n\n<!-- formal-statement-start -->\n> **定義（モーメント母関数・積率母関数）**  \n> 実確率変数 $X$ に対し、期待値が有限となる $t$ で $M_X(t)=E[e^{tX}]$ を $X$ の **モーメント母関数（積率母関数）** という。$M_X(0)=1$ だが、$t\\ne0$ で常に有限とは限らない。\n<!-- formal-statement-end -->\n\n<!-- definition-example-start: def-p2-02-mgf -->\n**定義の確認**  \n$X\\sim\\operatorname{Bernoulli}(p)$ では $M_X(t)=(1-p)e^0+pe^t=1-p+pe^t$ です。$M_X'(0)=p=E[X]$ となり、後で学ぶ「微分からモーメントを取り出す」性質と一致します。\n<!-- definition-example-end -->\n\n0を含む開区間で有限なら、その区間内でのモーメント母関数は分布を一意に定め、微分からモーメントを取り出せます。`;
  replaceOnce(needle, replacement, 'mgf');
}

fs.writeFileSync(path, text);
