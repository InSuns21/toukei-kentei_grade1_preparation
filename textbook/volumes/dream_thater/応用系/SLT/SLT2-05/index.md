# SLT2-05 高次元ランダム行列評価

前章では、Gaussian 設計の[最小ノルム推定の期待リスク](../SLT2-04/index.md#thm-slt2-04-exact-risk)を逆 Gram 行列の跡から厳密に計算した。しかし期待値だけでは、一回の訓練で得た設計行列の最小特異値が十分大きいかは分からない。逆に、共分散が高確率で母共分散に近いと分かっても、まれな悪い標本まで平均した逆行列の期待値が有限とは限らない。

この章の問いは、**ランダムな設計行列の固有値を、どの仮定・確率・次元の範囲で評価できるか**である。[HDP7 の共分散集中](../../../解析系/HDP/HDP7/index.md#thm-hdp7-isotropic-covariance)と[HDP8 の行列 Bernstein 不等式](../../../解析系/HDP/HDP8/index.md#thm-hdp8-matrix-bernstein)を線形予測へ適用し、最後に比例漸近と有限標本保証を分離する。

ここでは次の順に考える。

1. 共分散行列の誤差を特異値と逆 Gram 行列の評価に翻訳する。
2. sub-Gaussian 行と有界行について、異なる高確率評価を得る。
3. Gaussian 例で、平均的な二乗誤差と最悪方向の誤差の違いを確かめる。
4. $p/n\to\gamma$ の期待リスクを有限標本公式から導き、保証の範囲を比較する。

## 1. 共分散の誤差が特異値を支配する

標本数を $n$、特徴数を $p$ とする。設計行列 $X\in\mathbb R^{n\times p}$ の第 $i$ 行を $x_i^{\mathsf T}$ と書く。行ベクトルの平均が零で、母共分散が $I_p$ なら、訓練入力の経験二次モーメントは

$$
G_p=\frac1nX^{\mathsf T}X=\frac1n\sum_{i=1}^n x_ix_i^{\mathsf T}
$$

である。この $p\times p$ 行列は、方向 $u$ に沿う訓練入力の平均二乗 $u^{\mathsf T}G_pu=n^{-1}\|Xu\|_2^2$ を表す。すべての単位方向でこれが $1$ に近ければ、特定方向の信号が訓練で極端に縮むことを避けられる。

対称行列の[作用素ノルムと固有値順序](../../../解析系/HDP/HDP8/index.md#def-hdp8-loewner)を使い、$G_p$ が $I_p$ から $\eta$ 以内にある事象を考える。後で確率を付けるため、まず行列が固定された場合を定義する。

<a id="def-slt2-05-gram-event"></a>

<!-- formal-statement-start -->
> **定義（正規化 Gram 行列とスペクトル良好事象）**
> $n,p\ge1$、$X\in\mathbb R^{n\times p}$、$0<\eta<1$ とする。$G_p=X^{\mathsf T}X/n$ とおき、$X$ が確率行列なら
>
$$
> \mathcal E_{n,p}(\eta)
> =\{\|G_p-I_p\|_{\mathrm{op}}\le\eta\}
$$
>
> をスペクトル良好事象という。固定行列については、このノルム不等式の成否を判定する。$p>n$ 側で行の Gram 行列を使うときは、$H_n=XX^{\mathsf T}/p$ と
$$
> \mathcal F_{n,p}(\eta)
> =\{\|H_n-I_n\|_{\mathrm{op}}\le\eta\}
$$
> を区別する。$G_p$ の分母 $n$ は行の本数、$H_n$ の分母 $p$ は列の本数である。独立性はこの定義には不要であり、後の集中不等式を適用するときに別途仮定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt2-05-gram-event -->
**定義の確認**（列側）。$n=3,p=2$、$X$ の第1行を $(\sqrt3,0)$、第2行を $(0,\sqrt{3/2})$、第3行を $(0,0)$ とする。$G_2$ は3本の行 $x_i^{\mathsf T}$ から $3^{-1}\sum_i x_ix_i^{\mathsf T}$ として作るので、

$$
G_2=\begin{pmatrix}1&0\\0&1/2\end{pmatrix},\qquad
G_2-I_2=\begin{pmatrix}0&0\\0&-1/2\end{pmatrix}.
$$

単位ベクトル $u=(u_1,u_2)^{\mathsf T}$ に対して、定義のノルムは

$$
\|(G_2-I_2)u\|_2=|u_2|/2\le1/2
$$

であり、$u=(0,1)^{\mathsf T}$ で等号となる。従って $\|G_2-I_2\|_{\mathrm{op}}=1/2$、この固定行列は $\eta=1/2$ で定義の不等式を満たす（確率行列の実現値なら $\mathcal E_{3,2}(1/2)$ に入る）。$X^{\mathsf T}X$ の固有値は $3$ と $3/2$ であり、[特異値分解](../../../基礎科目/F0/F0-00F2/index.md#thm-f0-00f2-svd)によって $X$ の正の特異値は $\sqrt3$ と $\sqrt{3/2}$ になる。

**定義の確認**（行側）。$n=2,p=3$ で次の行列を考える。$H_2$ は3本の列 $c_j$ の二次モーメントだから

$$
X=\sqrt3\begin{pmatrix}1&0&0\\0&1&0\end{pmatrix},\qquad
H_2=\frac13\sum_{j=1}^3c_jc_j^{\mathsf T}=I_2.
$$

従って $\|H_2-I_2\|_{\mathrm{op}}=0$ で行側の不等式を満たす。一方、$G_3=\operatorname{diag}(3/2,3/2,0)$ は零固有値を持ち、$\|G_3-I_3\|_{\mathrm{op}}=1$ となる。二つの Gram 行列を用いる場合の成否が異なる具体例である。
<!-- definition-example-end -->

<a id="lem-slt2-05-spectral-bridge"></a>

<!-- formal-statement-start -->
> **補題（Gram 誤差から特異値・逆跡への橋渡し）**
> $X\in\mathbb R^{n\times p}$、$0<\eta<1$ とする。
>
> (i) $\|X^{\mathsf T}X/n-I_p\|_{\mathrm{op}}\le\eta$ なら $p\le n$、$X$ は列フルランクで、全 $p$ 個の特異値は
$$
> \sqrt{n(1-\eta)}\le\sigma_j(X)\le\sqrt{n(1+\eta)},
$$
$$
> \frac{p}{n(1+\eta)}\le
> \operatorname{tr}((X^{\mathsf T}X)^{-1})
> \le\frac{p}{n(1-\eta)}.
$$
>
> (ii) $\|XX^{\mathsf T}/p-I_n\|_{\mathrm{op}}\le\eta$ なら $n\le p$、$X$ は行フルランクで、全 $n$ 個の正の特異値は
$$
> \sqrt{p(1-\eta)}\le\sigma_j(X)\le\sqrt{p(1+\eta)},
$$
$$
> \frac{n}{p(1+\eta)}\le
> \operatorname{tr}((XX^{\mathsf T})^{-1})
> \le\frac{n}{p(1-\eta)}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

[特異値分解](../../../基礎科目/F0/F0-00F2/index.md#thm-f0-00f2-svd)で Gram 行列の固有値は特異値の二乗になる。作用素ノルムが $\eta$ 以下という条件は、全固有値が $1-\eta$ と $1+\eta$ の間にあることと同値である。

<!-- proof-start -->
### 証明

(i) $G_p$ は対称であり、単位固有ベクトル $u$、固有値 $\lambda$ に対し

$$
|\lambda-1|=|u^{\mathsf T}(G_p-I_p)u|
\le\|G_p-I_p\|_{\mathrm{op}}\le\eta.
$$

従って全固有値が $[1-\eta,1+\eta]$ に属する。$1-\eta>0$ なので $G_p$ は可逆、$\operatorname{rank}X=p$ であり $p\le n$。[特異値分解](../../../基礎科目/F0/F0-00F2/index.md#thm-f0-00f2-svd) $X=U\Sigma V^{\mathsf T}$ から $G_p=V(\Sigma^{\mathsf T}\Sigma/n)V^{\mathsf T}$ だから、固有値は $\sigma_j(X)^2/n$ である。各固有値の逆数を取れば

$$
\frac1{n(1+\eta)}\le\frac1{\sigma_j(X)^2}
\le\frac1{n(1-\eta)}.
$$

$p$ 項を足すと跡の式が出る。(ii) では $XX^{\mathsf T}/p$ に同じ議論を適用する。今度は $\operatorname{rank}X=n$ だから $n\le p$ で、$XX^{\mathsf T}$ の正固有値が $\sigma_j(X)^2$ である。$\square$
<!-- proof-end -->

この補題は**決定論的**である。確率の議論は、「$\mathcal E$ または $\mathcal F$ がどれくらい起こるか」にだけ必要となる。一方 $n<p$ なら $G_p$ の階数は高々 $n$ で零固有値が必ずあり、

$$
\|G_p-I_p\|_{\mathrm{op}}\ge1
$$

なので $\mathcal E_{n,p}(\eta)$ は起こり得ない。この障害は確率分布に関係ない。

## 2. sub-Gaussian 設計に対する非漸近保証

[HDP7 の等方性](../../../解析系/HDP/HDP7/index.md#def-hdp7-isotropy)は $Ex_i=0$、$E[x_ix_i^{\mathsf T}]=I_p$ という条件である。さらに、[全方向 sub-Gaussian 条件](../../../解析系/HDP/HDP7/index.md#def-hdp7-subgaussian-vector)を、$\psi_2$ ノルムで一つの $K$ に抑える。これは各座標の分布だけを見る条件より強い。$n,p$ が変わる系列では $K$ が次元とともに発散しないことも重要になる。

<a id="thm-slt2-05-subgaussian-spectrum"></a>

<!-- formal-statement-start -->
> **定理（sub-Gaussian 設計の特異値と逆 Gram 跡）**
> $0<\delta<1$、$n,p\ge1$、$K>0$ とし、$X\in\mathbb R^{n\times p}$ の行 $x_i^{\mathsf T}$ は独立同分布で $Ex_i=0$、$E[x_ix_i^{\mathsf T}]=I_p$、
$$
> \sup_{\|u\|_2=1}\|u^{\mathsf T}x_i\|_{\psi_2}\le K
$$
> を満たすとする。$L_p=p\log9+\log(2/\delta)$、
$$
> \eta_p=16K^2\max\left\{\sqrt{L_p/n},L_p/n\right\}
$$
> とおく。確率 $1-\delta$ 以上で $\|X^{\mathsf T}X/n-I_p\|_{\mathrm{op}}\le\eta_p$。特に $\eta_p<1$ なら、同じ確率で[補題](#lem-slt2-05-spectral-bridge) (i) の特異値・逆跡の上下界が $\eta=\eta_p$ で成立する。
>
> また、**成分がすべて独立**で同じ平均零・分散1の sub-Gaussian 分布を持ち、列ベクトルに対する一様尺度も $K$ 以下なら、$L_n=n\log9+\log(2/\delta)$、
$$
> \eta_n=16K^2\max\left\{\sqrt{L_n/p},L_n/p\right\}
$$
> に対して確率 $1-\delta$ 以上で $\|XX^{\mathsf T}/p-I_n\|_{\mathrm{op}}\le\eta_n$。$\eta_n<1$ なら同じ確率で補題 (ii) の評価が使える。
<!-- formal-statement-end -->

### 証明の見取り図

行を $p$ 次元の独立標本とみれば [HDP7 の共分散集中](../../../解析系/HDP/HDP7/index.md#thm-hdp7-isotropic-covariance)がそのまま使える。行側の逆 Gram 行列が欲しいときは列を $n$ 次元の独立標本と見る。ただし行が独立同分布（independent and identically distributed; iid）でも、列まで iid とは限らない。

<!-- proof-start -->
### 証明

各 $x_i\in\mathbb R^p$ に HDP7 の定理を $d=p$、標本数 $n$、信頼度 $\delta$ として適用する。平均零なので、そこでの経験二次モーメントは

$$
\widehat\Sigma_0=\frac1n\sum_{i=1}^n x_ix_i^{\mathsf T}
=\frac1nX^{\mathsf T}X.
$$

同定した $d$ と標本数を HDP7 の $16K^2\max\{\sqrt{L/n},L/n\}$ に代入すると、最初の確率評価になる。$\eta_p<1$ の場合、[Gram からの橋渡し](#lem-slt2-05-spectral-bridge) (i) はこの同一成功事象の上で成立する。

列側では、第 $j$ 列 $c_j\in\mathbb R^n$ を一つの標本とする。追加仮定で $c_1,\ldots,c_p$ は iid、平均零、共分散 $I_n$ で全方向の $\psi_2$ 尺度は $K$ 以下である。[同じ HDP7 の定理](../../../解析系/HDP/HDP7/index.md#thm-hdp7-isotropic-covariance)に $d=n$、標本数 $p$ を代入すれば $p^{-1}\sum_jc_jc_j^{\mathsf T}=XX^{\mathsf T}/p$ に対する評価を得る。最後に補題 (ii) を使う。$\square$
<!-- proof-end -->

例えば各成分が独立な標準正規変数なら、[HDP7 の Gaussian 積分計算](../../../解析系/HDP/HDP7/index.md#def-hdp7-covariance-adapted)から $K=\sqrt{8/3}$ を使える。独立な Rademacher 成分でも HDP7 の直接例から $K=\sqrt8$ が使える。いずれの $K$ も $n,p$ に依存しない。

### 2.1 この定理の強さと限界

$\eta_p<1$ には、この定理の定数では $n$ が $K^4(p+\log(1/\delta))$ より十分大きいことが必要である。これは分布に広く通用する**保守的な標本数の制約**であり、例えば $p/n=1/2$ の Gaussian 行列で逆行列が存在しないという意味ではない。実際 Gaussian 行列なら $p\le n$ で列フルランクが確率1であることを前章で示した。

比例 $p/n$ が固定されても、小さい定数とは限らない $\|G_p-I_p\|_{\mathrm{op}}$ を $0$ へ収束させる主張はここから出ない。まして $p/n\to1$ での最小固有値の精密分布も得ていない。一方この上界は**各有限の $n,p$ で**信頼度 $1-\delta$ を指定できる強みがある。

条件付きの予測誤差にも直ちに使える。固定された $X$ が列フルランク、$Y=X\beta_\star+\varepsilon$、$E[\varepsilon\mid X]=0$、$E[\varepsilon\varepsilon^{\mathsf T}\mid X]=\tau^2I_n$ とする。推定量を $\widehat\beta=X^\dagger Y$ とおけば、[前章の条件付きリスク計算](../SLT2-04/index.md#thm-slt2-04-exact-risk)により

$$
E_{\varepsilon}\bigl[\|\widehat\beta-\beta_\star\|_2^2\mid X\bigr]
=\tau^2\operatorname{tr}((X^{\mathsf T}X)^{-1}).
$$

従って $\mathcal E_{n,p}(\eta)$ 上では $\tau^2p/[n(1+\eta)]$ と $\tau^2p/[n(1-\eta)]$ の間にある。$p>n$ の行フルランク時には、特徴空間の行空間への直交射影を

$$
P_X=X^{\mathsf T}(XX^{\mathsf T})^{-1}X
$$

と置く。[前章のリスク分解](../SLT2-04/index.md#thm-slt2-04-exact-risk)により、核方向の偏り $\|(I_p-P_X)\beta_\star\|_2^2$ と雑音分散の項を分けられる。$\mathcal F_{n,p}(\eta)$ 上では、その雑音項を

$$
\frac{\tau^2n}{p(1+\eta)}\le
E_\varepsilon\bigl[\|\widehat\beta-P_X\beta_\star\|_2^2\mid X\bigr]
\le\frac{\tau^2n}{p(1-\eta)}
$$

と挟める。**良好事象上の条件付き界を、そのまま全標本についての期待リスク界へ移してはいけない。**

## 3. 有界設計に対する別の評価

Gaussian の行長には確定的な上限がない。一方、入力ノルムが常に上限 $B$ 以下のデータなら、[独立有界対称行列に対する行列Bernstein不等式](../../../解析系/HDP/HDP8/index.md#thm-hdp8-matrix-bernstein)を使う方法がある。この方法は $\psi_2$ を仮定しないが、行の長さ $B$ が大きいと上界も悪くなる。

<a id="prop-slt2-05-bounded-design"></a>

<!-- formal-statement-start -->
> **命題（有界設計の標本二次モーメント評価）**
> 独立同分布な $x_1,\ldots,x_n\in\mathbb R^p$ が $Ex_i=0$、$E[x_ix_i^{\mathsf T}]=\Sigma$、$\|x_i\|_2\le B$（$B>0$）を確率1で満たすとする。$G_p=n^{-1}\sum_ix_ix_i^{\mathsf T}$、$0<\delta<1$、$u=\log(2p/\delta)$ とすると、確率 $1-\delta$ 以上で
$$
> \|G_p-\Sigma\|_{\mathrm{op}}
> \le\sqrt{\frac{2B^2\|\Sigma\|_{\mathrm{op}}u}{n}}
> +\frac{2B^2u}{3n}.
$$
> 特に $\Sigma=I_p$ で右辺が $\eta<1$ なら、同じ確率で[Gram の補題](#lem-slt2-05-spectral-bridge) (i) の結論を得る。
<!-- formal-statement-end -->

### 証明の見取り図

各標本の行列 $A_i=x_ix_i^{\mathsf T}-\Sigma$ は平均零である。$A_i$ の作用素ノルムと行列分散代理量を計算し、行列 Bernstein の指数を $u$ 以上にする偏差値を選ぶ。

<!-- proof-start -->
### 証明

任意の単位 $v$ で $0\le v^{\mathsf T}x_ix_i^{\mathsf T}v=(v^{\mathsf T}x_i)^2\le B^2$。また $\Sigma=E[x_ix_i^{\mathsf T}]$ なので $0\preceq\Sigma\preceq B^2I_p$ である。よって $-B^2I_p\preceq A_i\preceq B^2I_p$、$\|A_i\|_{\mathrm{op}}\le B^2$。二乗を展開し、$E[x_ix_i^{\mathsf T}]=\Sigma$ を使うと

$$
EA_i^2=E[(x_ix_i^{\mathsf T})^2]-\Sigma^2
=E[\|x_i\|_2^2x_ix_i^{\mathsf T}]-\Sigma^2
\preceq B^2\Sigma.
$$

従って [行列分散代理量](../../../解析系/HDP/HDP8/index.md#def-hdp8-variance-proxy)は $v=\|\sum_iEA_i^2\|_{\mathrm{op}}\le nB^2\|\Sigma\|_{\mathrm{op}}$。[行列 Bernstein](../../../解析系/HDP/HDP8/index.md#thm-hdp8-matrix-bernstein) に $R=B^2$、$t=n\varepsilon$ を代入すると

$$
P(\|G_p-\Sigma\|_{\mathrm{op}}\ge\varepsilon)
\le2p\exp\left[-\frac{n\varepsilon^2}{2(B^2\|\Sigma\|_{\mathrm{op}}+B^2\varepsilon/3)}\right].
$$

$a=\sqrt{2nB^2\|\Sigma\|_{\mathrm{op}}u}$、$b=2B^2u/3$、$t=a+b$ とおく。$t^2=a^2+2ab+b^2$ と

$$
2u(v+B^2t/3)\le a^2+(2B^2u/3)(a+b)=a^2+ab+b^2
$$

を比べれば $t^2\ge2u(v+B^2t/3)$。従って $\varepsilon=t/n$ とした失敗確率は $2pe^{-u}=\delta$ 以下である。$\square$
<!-- proof-end -->

独立な Rademacher 成分を持つ $x_i\in\{-1,1\}^p$ では $\Sigma=I_p$、$B^2=p$ であり、右辺は

$$
\sqrt{\frac{2p\log(2p/\delta)}n}
+\frac{2p\log(2p/\delta)}{3n}.
$$

これは HDP7 経由の $p+\log(1/\delta)$ に対して $\log p$ を余分に持つ粗い評価である。しかし有界性という別の仮定から直接導けることに意味がある。有限の Rademacher 行列は正の確率で階数落ちする（例えば全行が同一になる事象は正の確率を持つ）。そのため **Gaussian 行列の逆 Gram 期待値公式を Rademacher 設計へ移植することはできない**。

## 4. 平均的誤差と最悪方向の誤差

高次元では「大多数の方向の平均」と「最大の誤差方向」を分ける必要がある。Gaussian 行列では、スペクトルの極限分布を使わなくても、Gram 行列全体の要素二乗誤差を計算できる。

<a id="prop-slt2-05-gaussian-frobenius"></a>

<!-- formal-statement-start -->
> **命題（Gaussian Gram 行列の二乗平均誤差）**
> $X\in\mathbb R^{n\times p}$ の全成分は独立な標準正規変数とし、$G_p=X^{\mathsf T}X/n$ とする。行列成分の二乗和で定義する Frobenius ノルム $\|A\|_F^2=\sum_{j,k}A_{jk}^2$ について
$$
> E\|G_p-I_p\|_F^2=\frac{p(p+1)}n,\qquad
> E\left(\frac{\operatorname{tr}G_p}{p}\right)=1,\qquad
> \operatorname{Var}\left(\frac{\operatorname{tr}G_p}{p}\right)=\frac2{np}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

対角成分は標準正規の二乗の平均、非対角成分は独立な標準正規の積の平均となる。対角・非対角の個数がそれぞれ $p$、$p(p-1)$ であることを使う。

<!-- proof-start -->
### 証明

$G_{jj}=n^{-1}\sum_iX_{ij}^2$。標準正規 $Z$ は $EZ^2=1$。密度 $\phi(z)=(2\pi)^{-1/2}e^{-z^2/2}$ に対し $\phi'(z)=-z\phi(z)$ なので、部分積分と $|z|^3\phi(z)\to0$ から

$$
EZ^4=-\int_{\mathbb R}z^3\phi'(z)\,dz
=3\int_{\mathbb R}z^2\phi(z)\,dz=3.
$$

よって $\operatorname{Var}(Z^2)=3-1=2$。行方向の独立性から $E(G_{jj}-1)^2=2/n$。$j\ne k$ では $G_{jk}=n^{-1}\sum_iX_{ij}X_{ik}$ で各積の平均は0、分散は $E X_{ij}^2 E X_{ik}^2=1$。従って $EG_{jk}^2=1/n$ であり

$$
E\|G_p-I_p\|_F^2
=\sum_{j=1}^p\frac2n+\sum_{j\ne k}\frac1n
=\frac{2p+p(p-1)}n=\frac{p(p+1)}n.
$$

$\operatorname{tr}G_p/p=(np)^{-1}\sum_{i,j}X_{ij}^2$ は $np$ 個の独立な二乗の平均なので、期待値は1、分散は $np\cdot2/(np)^2=2/(np)$ である。$\square$
<!-- proof-end -->

実対称な $G_p$ の固有値を $\lambda_1,\ldots,\lambda_p$ とすると、直交対角化により

$$
\|G_p-I_p\|_F^2=\sum_{j=1}^p(\lambda_j-1)^2.
$$

例えば $p/n\to\gamma>0$ なら

$$
\frac1pE\|G_p-I_p\|_F^2=\frac{p+1}{n}\longrightarrow\gamma>0.
$$

つまり **固有値ごとの平均二乗のずれの期待値は零にならない**。一方、全固有値の平均の分散は

$$
\operatorname{Var}(\operatorname{tr}G_p/p)=\frac2{np}\longrightarrow0
$$

なので、その平均は $1$ へ確率収束する。この事実だけで作用素ノルムの確率収束を否定することはできないが、少なくとも「平均が正しいから全方向も正しい」という推論には根拠がない。この違いは過剰パラメータ領域の理解に不可欠である。

## 5. 有限標本と比例漸近を切り分ける

固定 $p$ で $n$ を増やす場合には、各特徴について情報が増える。他方 $n$ を増やすと同時に $p$ も同じ比率で増やす場合には、新たな特徴も増え続ける。この二つを同じ「大標本」と呼ばないために、比率を固定する極限を明示する。

<a id="def-slt2-05-proportional-regime"></a>

<!-- formal-statement-start -->
> **定義（比例高次元漸近）**
> 正整数列 $n\to\infty$、$p=p_n\to\infty$ が $p_n/n\to\gamma\in(0,\infty)$ を満たすとき、比例高次元漸近という。$\gamma=1$ は補間閾値、$0<\gamma<1$ は特徴数の少ない側、$\gamma>1$ は特徴数の多い側である。$p$ を固定して $n\to\infty$ とする極限は $p/n\to0$ であり、この定義の $\gamma>0$ とは別に扱う。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt2-05-proportional-regime -->
**定義の確認**。$p_n=\lfloor n/2\rfloor$ なら $p_n\to\infty$ で $p_n/n\to1/2$。実際 $0\le n/2-p_n<1$ なので $0\le1/2-p_n/n<1/n\to0$。一方 $p_n=3$ では $p_n/n\to0$ だが $p_n\to\infty$ でないので比例高次元漸近ではない。
<!-- definition-example-end -->

非漸近の[高確率評価](#thm-slt2-05-subgaussian-spectrum)は各有限行列に関する。一方、前章の[Gaussian 設計での正確な期待リスク](../SLT2-04/index.md#thm-slt2-04-exact-risk)を使えば、比例漸近での期待値の極限を**別の論理として**直接計算できる。一般の行列固有値の極限分布を仮定する必要はない。

<a id="thm-slt2-05-proportional-risk"></a>

<!-- formal-statement-start -->
> **定理（Gaussian 最小ノルム推定の比例漸近期待リスク）**
> $n,p_n\to\infty$、$p_n/n\to\gamma\in(0,1)\cup(1,\infty)$ とし、各 $n$ で $X_n\in\mathbb R^{n\times p_n}$ の成分は独立 $N(0,1)$ とする。$Y_n=X_n\beta_{\star,n}+\varepsilon_n$、$\beta_{\star,n}\in\mathbb R^{p_n}$ は固定、$\varepsilon_n$ は $X_n$ と独立で平均零・共分散 $\tau^2I_n$（$\tau^2>0$ は $n$ に依存しない）とする。$\widehat\beta_n=X_n^\dagger Y_n$ とおき、独立な新規入力 $N(0,I_{p_n})$ に対する信号予測リスクを $L_{n,p_n}=E\|\widehat\beta_n-\beta_{\star,n}\|_2^2$ とする。
>
> (i) $0<\gamma<1$ なら
$$
> L_{n,p_n}\longrightarrow\tau^2\frac{\gamma}{1-\gamma}.
$$
>
> (ii) $\gamma>1$、さらに $\|\beta_{\star,n}\|_2^2\to b^2<\infty$ なら
$$
> L_{n,p_n}\longrightarrow
> \left(1-\frac1\gamma\right)b^2+\frac{\tau^2}{\gamma-1}.
$$
>
> これは**期待リスクの極限**であって、各標本のリスクのほとんど確実な収束や、任意の非 Gaussian 設計に対する主張ではない。
<!-- formal-statement-end -->

### 証明の見取り図

$\gamma\ne1$ なら十分大きい $n$ で $n-p_n-1$ または $p_n-n-1$ が正になる。前章の有限標本公式をそのまま $n$ で割り、比率の極限を取る。

<!-- proof-start -->
### 証明

(i) $p_n/n\to\gamma<1$ より、$n-p_n-1=n(1-p_n/n-1/n)>0$ が十分大きい $n$ で成立する。[最小ノルム推定の補間前後の正確な期待リスク](../SLT2-04/index.md#thm-slt2-04-exact-risk)から

$$
L_{n,p_n}=\tau^2\frac{p_n}{n-p_n-1}
=\tau^2\frac{p_n/n}{1-p_n/n-1/n}.
$$

分子は $\gamma$、分母は $1-\gamma>0$ に収束するので (i) を得る。(ii) では $p_n-n-1=n(p_n/n-1-1/n)>0$ が十分大きい $n$ で成立し、同じ公式から

$$
\begin{aligned}
L_{n,p_n}
&=\left(1-\frac{n}{p_n}\right)\|\beta_{\star,n}\|_2^2
+\tau^2\frac{n}{p_n-n-1}\\
&=\left(1-\frac1{p_n/n}\right)\|\beta_{\star,n}\|_2^2
+\frac{\tau^2}{p_n/n-1-1/n}.
\end{aligned}
$$

$p_n/n\to\gamma>1$ とノルムの仮定を各項へ使えば (ii) となる。$\square$
<!-- proof-end -->

例えば $\tau^2=1$、$b^2=4$ とする。$\gamma=1/2$ の極限リスクと $\gamma=2$ の極限リスクは、それぞれ

$$
\frac{1/2}{1-1/2}=1,\qquad
\left(1-\frac12\right)4+\frac1{2-1}=2+1=3.
$$

後者は核方向の偏り $2$ と雑音分散 $1$ の和である。$\gamma$ が左右から $1$ に近付くと雑音項は大きくなる。

ただし **$\gamma=1$ を上の定理へ代入してはいけない**。その近傍は、$p=n-1,n,n+1$ で期待値が無限大になるという[有限標本の発散条件](../SLT2-04/index.md#lem-slt2-04-gram-inverse)を個別に読む必要がある。

$p$ を固定して $n\to\infty$ とするなら、十分大きな $n$ で $L_{n,p}=\tau^2p/(n-p-1)\to0$ である。したがって「$n$ を増やせばリスクは零になる」は、**次元を固定した場合**には正しくても、$p/n\to\gamma>0$ では一般に正しくない。

### 5.1 何が言えて、何はまだ言えないか

| 問い | ここで得た結論 | 必要な条件と注意 |
| --- | --- | --- |
| 一回の設計で全方向が安定か | [sub-Gaussian 共分散の高確率界](#thm-slt2-05-subgaussian-spectrum) | iid、全方向の $\psi_2$ 尺度、$\eta<1$。十分条件は粗い |
| 入力が有界ならどうか | [行列 Bernstein 型界](#prop-slt2-05-bounded-design) | iid、$\|x_i\|\le B$、二次モーメント。$\log p$ の余分な因子が残り得る |
| Gaussian 設計の期待リスクはどうなるか | [比例漸近公式](#thm-slt2-05-proportional-risk) | 等方 Gaussian、$\gamma\ne1$、雑音・信号ノルム条件。期待値の極限のみ |
| スペクトル全体が $I_p$ へ近付くか | [Frobenius 二乗平均](#prop-slt2-05-gaussian-frobenius)は平均とのずれを示す | $p/n\to\gamma>0$ では全固有値の平均と平均二乗偏差を分ける。$\gamma>1$ は階数による確定的障害もある |

より精密な比例漸近の特異値端点や固有値分布の法則を証明するには、ここで使った共分散の粗い集中評価とは別のランダム行列論が必要である。予測に効くのは固有値の位置だけでなく、その**逆数の積分・期待値が有限か**という点である。次章では、逆数の代わりに学習時間に応じたスペクトルフィルタが現れる勾配流を扱う。

## 演習

### SLT2-05-A01 Gram 行列の条件を直接確認する
- Level: A
- 目安時間: 10分

$n=3,p=2$、$X=\begin{pmatrix}\sqrt3&0\\0&\sqrt{3/2}\\0&0\end{pmatrix}$ とする。$G_p$、$\mathcal E_{3,2}(1/2)$ の成否、$\operatorname{tr}((X^{\mathsf T}X)^{-1})$ を計算せよ。

<!-- solution-start -->
#### 詳細解答

$X^{\mathsf T}X=\operatorname{diag}(3,3/2)$ なので、$G_2=\operatorname{diag}(1,1/2)$、$G_2-I_2=\operatorname{diag}(0,-1/2)$ である。単位方向の最大伸長率は $1/2$ だから、定義のノルム不等式を満たす。逆行列とその跡は

$$
(X^{\mathsf T}X)^{-1}=\operatorname{diag}(1/3,2/3),\qquad
\operatorname{tr}((X^{\mathsf T}X)^{-1})=1.
$$

[Gram の補題](#lem-slt2-05-spectral-bridge) (i) の上下界も代入して確認できる。

$$
\frac{2}{3(1+1/2)}=\frac49\le1\le\frac43
=\frac{2}{3(1-1/2)}.
$$

<!-- solution-end -->

### SLT2-05-A02 階数による障害
- Level: A
- 目安時間: 10分

$n=2,p=3$、$X=\sqrt3\begin{pmatrix}1&0&0\\0&1&0\end{pmatrix}$ とする。$G_p$ と $H_n$ を計算し、$\|G_p-I_p\|_{\mathrm{op}}\ge1$ なのに $H_n=I_n$ となる理由を述べよ。

<!-- solution-start -->
#### 詳細解答

$X^{\mathsf T}X=\operatorname{diag}(3,3,0)$ より $G_p=\operatorname{diag}(3/2,3/2,0)$。従って $G_p-I_3=\operatorname{diag}(1/2,1/2,-1)$ でノルムは $1$。他方 $XX^{\mathsf T}=3I_2$、$H_n=XX^{\mathsf T}/3=I_2$。$X$ の核には $e_3$ があり、$G_p$ はその方向の二乗長を測れないが、$X$ の二本の行は互いに直交して非零なので、行 Gram 行列には零固有値がない。

<!-- solution-end -->

### SLT2-05-A03 必要標本数と信頼度
- Level: A
- 目安時間: 12分

[sub-Gaussian 設計の定理](#thm-slt2-05-subgaussian-spectrum)の $L_p=p\log9+\log(2/\delta)$ を使う。$0<\varepsilon<1$ のとき $n\ge256K^4L_p/\varepsilon^2$ なら、なぜ $\eta_p\le\varepsilon$ になるか示せ。

<!-- solution-start -->
#### 詳細解答

[HDP7 の等方性](../../../解析系/HDP/HDP7/index.md#def-hdp7-isotropy)により、単位方向 $u$ に対する $Y=u^{\mathsf T}x_i$ は $EY^2=1$ である。指数関数の接線不等式

$$
e^z\ge e^a(1+z-a)
$$

に $z=Y^2/K^2$、$a=EY^2/K^2$ を代入して期待値を取ると

$$
2\ge Ee^{Y^2/K^2}\ge e^{EY^2/K^2}=e^{1/K^2},
\qquad K^2\ge\frac1{\log2}>1.
$$

標本数条件を変形すると

$$
\sqrt{\frac{L_p}{n}}\le\frac{\varepsilon}{16K^2}<1,
\qquad \frac{L_p}{n}\le\sqrt{\frac{L_p}{n}}.
$$

ゆえに最大値は平方根側であり、$\eta_p=16K^2\sqrt{L_p/n}\le\varepsilon$。これは $p,\delta,K,\varepsilon$ を固定して指定した有限標本の条件である。

<!-- solution-end -->

### SLT2-05-A04 Gaussian の二乗平均
- Level: A
- 目安時間: 10分

$n=4,p=2$ で、全成分が独立な標準正規分布に従う Gaussian 設計について、$E\|G_p-I_p\|_F^2$ と $\operatorname{Var}(\operatorname{tr}G_p/p)$ を求めよ。

<!-- solution-start -->
#### 詳細解答

[Gaussian Gram の命題](#prop-slt2-05-gaussian-frobenius)の成分計算を使う。対角二項の二乗誤差はそれぞれ $2/n=1/2$、非対角二項はそれぞれ $1/n=1/4$ なので

$$
E\|G_2-I_2\|_F^2=2\cdot\frac12+2\cdot\frac14=\frac32.
$$

跡を $p$ で割った量は $np=8$ 個の独立な標準正規二乗の平均であり、分散は $8\cdot2/8^2=1/4$ となる。

<!-- solution-end -->

### SLT2-05-A05 比例リスクの数値計算
- Level: A
- 目安時間: 10分

[Gaussian 比例漸近モデル](#thm-slt2-05-proportional-risk)で $\tau^2=1$、$\|\beta_{\star,n}\|_2^2\to4$ とする。$\gamma=1/2$ と $\gamma=2$ での信号予測リスクの極限を求め、雑音と偏りを区別せよ。

<!-- solution-start -->
#### 詳細解答

[比例漸近定理](#thm-slt2-05-proportional-risk)より、$\gamma=1/2<1$ では列フルランクのため偏りがなく、雑音項だけが残る。$\gamma=2>1$ では核方向の偏りと雑音項をそれぞれ計算して

$$
\begin{aligned}
\gamma=1/2 &: \quad \lim_{n\to\infty}L_{n,p_n}=\frac{1/2}{1-1/2}=1,\\
\gamma=2 &: \quad \lim_{n\to\infty}L_{n,p_n}=\left(1-\frac12\right)4+\frac1{2-1}=2+1=3.
\end{aligned}
$$

<!-- solution-end -->

### SLT2-05-B01 有界設計の二種の上界
- Level: B
- 目安時間: 20分

独立な Rademacher 成分を持つ $x_i\in\{-1,1\}^p$ を考える。$\delta=1/10$ とし、[有界設計の命題](#prop-slt2-05-bounded-design)から $\|G_p-I_p\|_{\mathrm{op}}$ の高確率上界を求めよ。また HDP7 の定理との次元依存の違いを述べよ。

<!-- solution-start -->
#### 詳細解答

各座標の期待値は0、分散は1、異なる座標の積の期待値は0だから $\Sigma=I_p$。全標本で $\|x_i\|_2^2=p$ なので $B^2=p$、$u=\log(2p/\delta)=\log(20p)$。命題に代入し、確率 $9/10$ 以上で

$$
\|G_p-I_p\|_{\mathrm{op}}
\le\sqrt{\frac{2p\log(20p)}n}
+\frac{2p\log(20p)}{3n}.
$$

一方、[HDP7 の符号ベクトルの検証](../../../解析系/HDP/HDP7/index.md#def-hdp7-subgaussian-vector)では次元に依存しない $K=\sqrt8$ が使えるため、定理の $L_p=p\log9+\log20$ となり、$p\log p$ ではなく $p$ に比例する項が現れる。両者は上界であり、実際の誤差がその大きさに等しいとは言えない。

<!-- solution-end -->

### SLT2-05-B02 条件付き雑音リスクの評価
- Level: B
- 目安時間: 22分

$X\in\mathbb R^{n\times p}$ を固定し、固定係数 $\beta_\star\in\mathbb R^p$ と平均零の雑音 $\varepsilon$ による観測モデルを

$$
Y=X\beta_\star+\varepsilon,\qquad
E[\varepsilon\mid X]=0,\qquad
E[\varepsilon\varepsilon^{\mathsf T}\mid X]=\tau^2I_n\quad(\tau^2>0)
$$

とする。推定量は $\widehat\beta=X^\dagger Y$ とし、$0<\eta<1$ とする。

1. $p<n$、$\|G_p-I_p\|_{\mathrm{op}}\le\eta$ のとき、係数リスクを上下から挟め。
2. $p>n$、$\|H_n-I_n\|_{\mathrm{op}}\le\eta$ のとき、最小ノルム補間解の雑音由来の係数リスクを上下から挟め。

<!-- solution-start -->
#### 詳細解答

(i) 列フルランクの場合の[最小ノルム解の表示](../SLT2-02/index.md#thm-slt2-02-minimum-norm)に $Y=X\beta_\star+\varepsilon$ を代入すると $\widehat\beta-\beta_\star=(X^{\mathsf T}X)^{-1}X^{\mathsf T}\varepsilon$。$A=(X^{\mathsf T}X)^{-1}X^{\mathsf T}$ とおくと、$AA^{\mathsf T}=(X^{\mathsf T}X)^{-1}$ なので

$$
E_\varepsilon\|A\varepsilon\|_2^2
=\operatorname{tr}(A E_\varepsilon[\varepsilon\varepsilon^{\mathsf T}]A^{\mathsf T})
=\tau^2\operatorname{tr}((X^{\mathsf T}X)^{-1}).
$$

従って [Gram の補題](#lem-slt2-05-spectral-bridge) (i) より

$$
\frac{\tau^2p}{n(1+\eta)}\le
E_\varepsilon\|\widehat\beta-\beta_\star\|_2^2
\le\frac{\tau^2p}{n(1-\eta)}.
$$

(ii) 雑音に由来する項は $X^{\mathsf T}(XX^{\mathsf T})^{-1}\varepsilon$。$A_{\mathrm{row}}=X^{\mathsf T}(XX^{\mathsf T})^{-1}$ とすれば $A_{\mathrm{row}}^{\mathsf T}A_{\mathrm{row}}=(XX^{\mathsf T})^{-1}$ であり、(i) と同様に $E_\varepsilon\|A_{\mathrm{row}}\varepsilon\|_2^2=\tau^2\operatorname{tr}((XX^{\mathsf T})^{-1})$ となる。[Gram の補題](#lem-slt2-05-spectral-bridge) (ii) により

$$
\frac{\tau^2n}{p(1+\eta)}\le
E_\varepsilon\|A_{\mathrm{row}}\varepsilon\|_2^2
\le\frac{\tau^2n}{p(1-\eta)}.
$$

全係数リスクでは、$P_X=X^{\mathsf T}(XX^{\mathsf T})^{-1}X$ を行空間への直交射影とすると $\widehat\beta-\beta_\star=-(I_p-P_X)\beta_\star+A_{\mathrm{row}}\varepsilon$ である。前者は $\ker X$、後者は行空間に属して直交するため、偏り $\|(I_p-P_X)\beta_\star\|_2^2$ を上の雑音リスクに加える。良好事象の外側については、これらの式だけから平均を抑えられない。

<!-- solution-end -->

### SLT2-05-B03 固定次元と比例次元の違い
- Level: B
- 目安時間: 16分

Gaussian 設計、$\tau^2>0$ について、(i) $p=3$ を固定して $n\to\infty$ とする場合、(ii) $p_n=\lfloor n/3\rfloor$ とする場合の $L_{n,p}$ の極限を計算せよ。

<!-- solution-start -->
#### 詳細解答

(i) 十分大きい $n$ では $n>4$ となる。[SLT2-04 の期待リスク定理](../SLT2-04/index.md#thm-slt2-04-exact-risk)の補間前の式から

$$
L_{n,3}=\frac{3\tau^2}{n-4}\longrightarrow0.
$$

(ii) $p_n=\lfloor n/3\rfloor$ は十分大きな $n$ で正整数であり、$p_n/n\to1/3$、$p_n\to\infty$ を満たす。[比例漸近定理](#thm-slt2-05-proportional-risk) (i) から

$$
L_{n,p_n}\longrightarrow\tau^2\frac{1/3}{1-1/3}=\frac{\tau^2}{2}.
$$

次元を同時に増やすと、リスクは一般に消えない。

<!-- solution-end -->

### SLT2-05-B04 Rademacher の逆行列を無条件に使えるか
- Level: B
- 目安時間: 16分

$n=p=2$ で $X$ の4成分が独立な Rademacher 変数とする。$X$ が特異になる確率を計算し、Gaussian 設計の期待逆跡公式をこの模型へそのまま使えない理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

第1行は任意の $(\pm1,\pm1)$。第2行が第1行と同じか符号反転した行であれば行は一次従属である。第2行の4通りのうち2通りが該当するから

$$
P(\operatorname{rank}X<2)=\frac24=\frac12.
$$

この事象では $XX^{\mathsf T}$ も $X^{\mathsf T}X$ も逆行列を持たない。Gaussian 設計では連続分布によってフルランクが確率1となる一方、Rademacher 行列にはその保証がない。擬似逆を定義しても、通常逆行列に対する[前章の期待逆跡公式](../SLT2-04/index.md#lem-slt2-04-gram-inverse)を流用する根拠にはならない。

<!-- solution-end -->

### SLT2-05-C01 保証の種類を一つの模型で整理する
- Level: C
- 目安時間: 35分

各 $n$ で Gaussian 等方設計 $X_n\in\mathbb R^{n\times p_n}$、雑音分散 $\tau^2>0$、$\|\beta_{\star,n}\|_2^2\to b^2<\infty$ とする。(i) $p_n/n\to\gamma\in(0,1)$、(ii) $p_n/n\to\gamma>1$ の期待信号リスクを導け。(iii) $p_n=n$ では期待リスクに何が起こるか。(iv) 同じ模型の $\operatorname{tr}G_p/p$ が確率収束することから $\|G_p-I_p\|_{\mathrm{op}}\to0$ を結論してよいか。根拠をそれぞれ挙げよ。

<!-- solution-start -->
#### 詳細解答

(i) $\gamma<1$ なら十分大きい $n$ で $n-p_n-1>0$。[前章の有限標本リスク公式](../SLT2-04/index.md#thm-slt2-04-exact-risk)の分子・分母を $n$ で割ると

$$
L_{n,p_n}=\tau^2\frac{p_n/n}{1-p_n/n-1/n}
\longrightarrow\tau^2\frac\gamma{1-\gamma}.
$$

(ii) $\gamma>1$ では $p_n-n-1>0$。核方向への信号の射影から来る偏りと、独立雑音を増幅する逆 Gram 跡を分けて

$$
L_{n,p_n}=
\left(1-\frac1{p_n/n}\right)\|\beta_{\star,n}\|_2^2
+\frac{\tau^2}{p_n/n-1-1/n}
\longrightarrow\left(1-\frac1\gamma\right)b^2
+\frac{\tau^2}{\gamma-1}.
$$

(iii) 各 $n$ で $p_n=n$ なら[Gaussian Gram 逆跡の補題](../SLT2-04/index.md#lem-slt2-04-gram-inverse)により逆跡の期待値は $+\infty$。$\tau^2>0$ なので $L_{n,n}=+\infty$ である。これは「行列が確率1で特異」という意味ではない。逆行列は確率1で存在するが、その大きさの平均が発散する。

(iv) [Gaussian Gram行列の二乗平均誤差](#prop-slt2-05-gaussian-frobenius)から

$$
\operatorname{Var}(\operatorname{tr}G_p/p)=\frac2{np}\longrightarrow0.
$$

従って [Chebyshev の不等式](../../../解析系/F0/F0-00P2A/index.md#thm-f0-00p2a-chebyshev)から $\operatorname{tr}G_p/p\to1$ は確率収束する。一方、固有値の平均二乗偏差の期待値は

$$
\frac1pE\|G_p-I_p\|_F^2=\frac{p+1}{n}\longrightarrow\gamma>0.
$$

さらに $\gamma>1$ では十分大きな $n$ で $p>n$ なので、階数から **確率1で**

$$
\|G_p-I_p\|_{\mathrm{op}}\ge1.
$$

従って少なくとも $\gamma>1$ では作用素ノルム収束は不可能で、跡の平均だけから全方向の安定性は結論できない。$0<\gamma<1$ についても跡の平均の収束だけでは作用素ノルム収束を証明できない。
<!-- solution-end -->
