import fs from 'node:fs';

const path = 'textbook/volumes/02_distributions/P3_03_多変量分布_条件付き分布/index.md';
let text = fs.readFileSync(path, 'utf8');

function replaceOnce(needle, replacement, label) {
  if (!text.includes(needle)) throw new Error(`S14 needle not found: ${label}`);
  text = text.replace(needle, () => replacement);
}

if (!text.includes('def-p3-03-random-vector')) {
  const needle = `### 2.1 確率ベクトルは「確率変数を縦に並べたもの」\n\n2つの確率変数$X,Y$をまとめて\n$$\n\\boldsymbol X=\n\\begin{pmatrix}X\\\\Y\\end{pmatrix}\n$$\nと書きます。これを確率ベクトルといいます。\n\n平均も同じ順番に並べて\n$$\nE[\\boldsymbol X]\n=\n\\begin{pmatrix}E[X]\\\\E[Y]\\end{pmatrix}\n$$\nと書きます。たとえば$E[X]=1$, $E[Y]=2$なら、平均ベクトルは$(1,2)^{\\mathsf T}$です。`;
  const replacement = `### 2.1 確率ベクトルは「確率変数を縦に並べたもの」\n\n<a id="def-p3-03-random-vector"></a>\n\n<!-- formal-statement-start -->\n> **定義（確率ベクトル）**  \n> 同じ確率空間上の確率変数 $X_1,\\ldots,X_p$ を縦に並べた $\\boldsymbol X=(X_1,\\ldots,X_p)^{\\mathsf T}$ を **確率ベクトル** という。各標本点に対して $\\mathbb R^p$ の1点を対応させる確率変数のベクトル版である。\n<!-- formal-statement-end -->\n\n<!-- definition-example-start: def-p3-03-random-vector -->\n**定義の確認**  \n2つの測定値を確率変数 $X,Y$ とすれば $\\boldsymbol X=(X,Y)^{\\mathsf T}$ は2変量の確率ベクトルです。観測1回ごとに $(X,Y)$ という値の組が1点得られます。\n<!-- definition-example-end -->\n\n<a id="def-p3-03-mean-vector"></a>\n\n<!-- formal-statement-start -->\n> **定義（平均ベクトル）**  \n> 各成分の期待値が有限な確率ベクトル $\\boldsymbol X=(X_1,\\ldots,X_p)^{\\mathsf T}$ に対し、$\\boldsymbol\\mu=E[\\boldsymbol X]=(E[X_1],\\ldots,E[X_p])^{\\mathsf T}$ を **平均ベクトル** という。\n<!-- formal-statement-end -->\n\n<!-- definition-example-start: def-p3-03-mean-vector -->\n**定義の確認**  \n$E[X]=1$, $E[Y]=2$ なら、$\\boldsymbol X=(X,Y)^{\\mathsf T}$ の平均ベクトルは $\\boldsymbol\\mu=(1,2)^{\\mathsf T}$ です。成分の順番は確率ベクトルの順番と一致します。\n<!-- definition-example-end -->`;
  replaceOnce(needle, replacement, 'random-vector-and-mean-vector');
}

if (!text.includes('def-p3-03-covariance-matrix')) {
  const needle = `### 2.2 分散共分散行列は「分散と共分散の表」\n\n$X,Y$の分散と共分散を1つの行列にまとめると`;
  const replacement = `### 2.2 分散共分散行列は「分散と共分散の表」\n\n<a id="def-p3-03-covariance-matrix"></a>\n\n<!-- formal-statement-start -->\n> **定義（分散共分散行列）**  \n> 平均ベクトル $\\boldsymbol\\mu$ をもつ $p$ 変量確率ベクトル $\\boldsymbol X$ に対し、$\\Sigma=E[(\\boldsymbol X-\\boldsymbol\\mu)(\\boldsymbol X-\\boldsymbol\\mu)^{\\mathsf T}]$ を **分散共分散行列** という。$(i,j)$ 成分は $\\operatorname{Cov}(X_i,X_j)$ で、対角成分は各成分の分散である。\n<!-- formal-statement-end -->\n\n<!-- definition-example-start: def-p3-03-covariance-matrix -->\n**定義の確認**  \n$\\operatorname{Var}(X)=4$, $\\operatorname{Var}(Y)=9$, $\\operatorname{Cov}(X,Y)=3$ なら $\\Sigma=\\begin{pmatrix}4&3\\\\3&9\\end{pmatrix}$ です。対角に分散、非対角に共分散が入っています。\n<!-- definition-example-end -->\n\n$X,Y$の分散と共分散を1つの行列にまとめると`;
  replaceOnce(needle, replacement, 'covariance-matrix');
}

if (!text.includes('def-p3-03-correlation-matrix')) {
  const needle = `したがって相関行列は\n$$\nR=\n\\begin{pmatrix}1&1/2\\\\1/2&1\\end{pmatrix}\n$$\nです。`;
  const replacement = `<a id="def-p3-03-correlation-matrix"></a>\n\n<!-- formal-statement-start -->\n> **定義（相関行列）**  \n> 各成分の分散が正である確率ベクトルについて、$(i,j)$ 成分を $\\operatorname{Corr}(X_i,X_j)$ とする行列を **相関行列** という。$D=\\operatorname{diag}(\\sigma_1^2,\\ldots,\\sigma_p^2)$ とすれば $R=D^{-1/2}\\Sigma D^{-1/2}$ で、対角成分は全て1である。\n<!-- formal-statement-end -->\n\n<!-- definition-example-start: def-p3-03-correlation-matrix -->\n**定義の確認**  \n$\\Sigma=\\begin{pmatrix}4&3\\\\3&9\\end{pmatrix}$ では標準偏差が2と3なので、非対角成分は $3/(2\\cdot3)=1/2$ です。したがって $R=\\begin{pmatrix}1&1/2\\\\1/2&1\\end{pmatrix}$ となります。\n<!-- definition-example-end -->`;
  replaceOnce(needle, replacement, 'correlation-matrix');
}

if (!text.includes('def-p3-03-multivariate-normal')) {
  const needle = `### 2.3 多変量正規分布は「正規分布をまとめたもの」\n\n2変量正規分布を`;
  const replacement = `### 2.3 多変量正規分布は「正規分布をまとめたもの」\n\n<a id="def-p3-03-multivariate-normal"></a>\n\n<!-- formal-statement-start -->\n> **定義（多変量正規分布）**  \n> $p$ 変量確率ベクトル $\\boldsymbol X$ について、任意の $\\boldsymbol a\\in\\mathbb R^p$ に対する線形結合 $\\boldsymbol a^{\\mathsf T}\\boldsymbol X$ が1変量正規分布（分散0の退化分布を含む）に従うとき、$\\boldsymbol X$ は **多変量正規分布** に従うという。平均ベクトル $\\boldsymbol\\mu$、分散共分散行列 $\\Sigma$ を用いて $N_p(\\boldsymbol\\mu,\\Sigma)$ と書く。\n<!-- formal-statement-end -->\n\n<!-- definition-example-start: def-p3-03-multivariate-normal -->\n**定義の確認**  \n独立な標準正規変数 $Z_1,Z_2$ を並べた $\\boldsymbol Z=(Z_1,Z_2)^{\\mathsf T}$ では、任意の $a,b$ に対して $aZ_1+bZ_2$ は正規分布です。したがって $\\boldsymbol Z\\sim N_2(\\boldsymbol0,I_2)$ です。\n<!-- definition-example-end -->\n\n2変量正規分布を`;
  replaceOnce(needle, replacement, 'multivariate-normal');
}

if (!text.includes('def-p3-03-conditional-distribution')) {
  const needle = `### 2.4 条件付き分布は「$X=x$と分かった後の$Y$の分布」\n\nたとえば身長$X$と体重$Y$を同時に考えているとき、「身長が$x$だと分かった人だけに絞った体重の分布」が$Y\\mid(X=x)$です。`;
  const replacement = `### 2.4 条件付き分布は「$X=x$と分かった後の$Y$の分布」\n\n<a id="def-p3-03-conditional-distribution"></a>\n\n<!-- formal-statement-start -->\n> **定義（条件付き分布）**  \n> 一方の確率変数 $X$ の値を $x$ に固定したという条件のもとでの他方の確率変数 $Y$ の確率法則を、$Y\\mid(X=x)$ の **条件付き分布** という。離散型で $P(X=x)>0$ なら $P(Y=y\\mid X=x)=p_{X,Y}(x,y)/p_X(x)$、連続型で $f_X(x)>0$ なら条件付き密度は $f_{Y\\mid X}(y\\mid x)=f_{X,Y}(x,y)/f_X(x)$ で与えられる。\n<!-- formal-statement-end -->\n\n<!-- definition-example-start: def-p3-03-conditional-distribution -->\n**定義の確認**  \n独立な2回の公平な硬貨投げを0・1で表す $X,Y$ では、$P(Y=1\\mid X=1)=(1/4)/(1/2)=1/2$ です。したがって $X=1$ と条件付けても $Y$ の条件付き分布はベルヌーイ $1/2$ のままです。\n<!-- definition-example-end -->\n\nたとえば身長$X$と体重$Y$を同時に考えているとき、「身長が$x$だと分かった人だけに絞った体重の分布」が$Y\\mid(X=x)$です。`;
  replaceOnce(needle, replacement, 'conditional-distribution');
}

if (!text.includes('def-p3-03-partial-correlation')) {
  const needle = `### 2.5 偏相関は「第3の変数の影響を除いた後の相関」\n\n$X_1$と$X_2$の相関が高くても、両方が$X_3$と強く関係しているために相関して見えることがあります。`;
  const replacement = `### 2.5 偏相関は「第3の変数の影響を除いた後の相関」\n\n<a id="def-p3-03-partial-correlation"></a>\n\n<!-- formal-statement-start -->\n> **定義（偏相関係数）**  \n> $X_1,X_2$ から第3の変数 $X_3$ で線形に説明できる部分をそれぞれ取り除いた残差を $R_1,R_2$ とするとき、$\\operatorname{Corr}(R_1,R_2)$ を **$X_3$ を調整した $X_1,X_2$ の偏相関係数** といい、$\\rho_{12\\cdot3}$ と書く。\n<!-- formal-statement-end -->\n\n<!-- definition-example-start: def-p3-03-partial-correlation -->\n**定義の確認**  \n標準化済みの3変数で $\\rho_{12}=\\rho_{13}=\\rho_{23}=1/2$ なら、後で導く公式から $\\rho_{12\\cdot3}=(1/2-1/4)/(3/4)=1/3$ です。元の相関 $1/2$ より小さくなり、$X_3$ を介して共通していた線形な動きを除いた相関になっています。\n<!-- definition-example-end -->\n\n$X_1$と$X_2$の相関が高くても、両方が$X_3$と強く関係しているために相関して見えることがあります。`;
  replaceOnce(needle, replacement, 'partial-correlation');
}

fs.writeFileSync(path, text);
