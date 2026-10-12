# HDP8 非可換モーメント母関数と行列Bernstein

[HDP2のBernstein不等式](../HDP2/index.md#thm-hdp2-bernstein)は独立な実数値変数の和を扱い、[HDP7の標本共分散評価](../HDP7/index.md#thm-hdp7-isotropic-covariance)は球面の有限netを通じて行列の作用素ノルムへ進みました。しかし行列の成分を別々に集中させると、方向をそろえて測る作用素ノルムの構造を失います。行列の固有値そのものへ指数Markov法を適用できないでしょうか。

問題は行列積が一般には交換しないことです。例えば

$$
A=\begin{pmatrix}1&0\\0&-1\end{pmatrix},
\qquad
B=\begin{pmatrix}0&1\\1&0\end{pmatrix},
\qquad AB=-BA
$$

では、$e^Ae^B$ は対称ですらありませんが $e^{A+B}$ は対称です。したがって $e^{A+B}=e^Ae^B$ と分解して期待値を掛けることはできません。この章では「固有値をトレースに変換する」「非可換な和の指数積分を比較する」「一項ずつ上から評価する」の順に、行列Hoeffding不等式と行列Bernstein不等式を証明します。

## 1. 固有値と半正定値順序を準備する

対象はまず実対称 $d\times d$ 行列です。対称行列 $H$ が半正定値なら $H\succeq0$ と書き、$A\preceq B$ は $B-A\succeq0$ の意味とします。各固有値を $\lambda_j(H)$ とすると、[行列指数](../../ODE/ODE3/index.md#def-ode3-matrix-exponential)・トレースは

$$
e^H=U\operatorname{diag}(e^{\lambda_1(H)},\ldots,e^{\lambda_d(H)})U^{\mathsf T},
\qquad
\operatorname{tr}e^H=\sum_{j=1}^d e^{\lambda_j(H)}
$$

です。ただし $U$ は直交行列で、$H=U\operatorname{diag}(\lambda_j(H))U^{\mathsf T}$ としました。対称行列の作用素ノルムは最大絶対固有値 $\|H\|_{\mathrm{op}}=\max_j|\lambda_j(H)|$ です。

行列対数 $\log C$ は正定値行列 $C\succ0$ の正固有値へ対数を適用したものです。任意の対称 $H$ で $e^H\succ0$ なので、$\log(e^H)=H$ が成立します。

<a id="def-hdp8-loewner"></a>

<!-- formal-statement-start -->
> **定義（Loewner順序と行列指数モーメント）**  
> 同じ大きさの実対称行列 $A,B$ について $A\preceq B$ は、すべての $u\in\mathbb R^d$ に対し $u^{\mathsf T}(B-A)u\ge0$ を満たすことをいう。実対称確率行列 $X$ の $E e^{\theta X}$ が成分ごとに有限であるとき、これをパラメータ $\theta\in\mathbb R$ における行列指数モーメントと呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hdp8-loewner -->
**定義の確認**。 $X=\operatorname{diag}(R,-R)$ とし、$P(R=1)=P(R=-1)=1/2$ とします。$EX=0$、$X^2=I_2$ であり、

$$
Ee^{\theta X}
=\operatorname{diag}\left(\frac{e^\theta+e^{-\theta}}2,
\frac{e^\theta+e^{-\theta}}2\right)
=\cosh(\theta)I_2.
$$

$\cosh\theta\ge1$ だから $I_2\preceq Ee^{\theta X}$ です。一般の $X$ でも $e^{\theta X}\succ0$ なので、その期待値は正定値になります。実際、$u\ne0$ なら $E[u^{\mathsf T}e^{\theta X}u]>0$ です。
<!-- definition-example-end -->

**成分ごとの大小関係とは異なる。** 例えば全成分が正の行列でも、

$
B=\begin{pmatrix}1&2\\2&1\end{pmatrix},
\qquad u=\begin{pmatrix}1\\-1\end{pmatrix},
\qquad u^{\mathsf T}Bu=-2<0
$

となります。従って $0\preceq B$ とはいえません。Loewner順序を判断するときは、成分の符号でなく**すべての二次形式の符号**を確認します。

確率のイベントへ接続するには、最大固有値が大きいとトレース指数も大きいことを使います。

<a id="lem-hdp8-trace-laplace"></a>

<!-- formal-statement-start -->
> **補題（トレース指数による固有値の指数Markov評価）**  
> $S$ を実対称確率行列とし、$E\operatorname{tr}e^{\theta S}<\infty$ とする。任意の $\theta>0$ と実数 $t$ について
>
$$
P(\lambda_{\max}(S)\ge t)
\le e^{-\theta t}E\operatorname{tr}e^{\theta S}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

[指数Markov法](../HDP1/index.md#prop-hdp1-exponential-markov)を、行列そのものではなく非負実数値変数 $\operatorname{tr}e^{\theta S}$ へ適用します。ここに入る $d$ 個の固有値の寄与が、最終的な前置係数 $d$ の由来です。

<!-- proof-start -->
### 証明

各実現値で最大固有値 $\lambda_{\max}(S)$ はいずれかの $\lambda_j(S)$ です。従って

$$
e^{\theta\lambda_{\max}(S)}
\le\sum_{j=1}^d e^{\theta\lambda_j(S)}
=\operatorname{tr}e^{\theta S}.
$$

よって次の事象包含が成立します。

$$
\{\lambda_{\max}(S)\ge t\}
\subseteq \{\operatorname{tr}e^{\theta S}\ge e^{\theta t}\}.
$$

ここで非負変数 $\operatorname{tr}e^{\theta S}$ に[Markovの不等式](../../F0/F0-00P2A/index.md#thm-f0-00p2a-markov)を適用すると

$$
P(\lambda_{\max}(S)\ge t)
\le P(\operatorname{tr}e^{\theta S}\ge e^{\theta t})
\le e^{-\theta t}E\operatorname{tr}e^{\theta S}.
$$
<!-- proof-end -->

## 2. 非可換な和の指数モーメント

独立な実対称確率行列 $X_1,\ldots,X_n$ を考えます。一般には $\operatorname{tr}e^{\sum_i\theta X_i}$ を独立性だけで積に直せません。これを解決する核心は、正定値行列 $C$ を変数とする関数 $\operatorname{tr}\exp(H+\log C)$ の凹性です。

<a id="thm-hdp8-lieb-concavity"></a>

<!-- formal-statement-start -->
> **定理（Liebの凹性定理：本章で使用する形）**  
> $H$ を固定された実対称 $d\times d$ 行列とする。正定値実対称行列 $C\succ0$ 上の実数値関数
>
$$
C\longmapsto\operatorname{tr}\exp(H+\log C)
$$
>
> は凹関数である。すなわち正定値 $C_1,C_2$ と $0\le s\le1$ に対して、その値は $sC_1+(1-s)C_2$ で両端の値を重み $s$ と $1-s$ で平均した値以上になる。
<!-- formal-statement-end -->

**証明の扱いと境界**。この凹性は非可換行列解析の深い結果であり、本章では**明示的に外部定理として使用し、その証明自体は主張しません**。この定理を仮定した後の条件付き期待値の取り方、指数モーメント評価、最適化、応用は以下で証明します。スカラーでの凹性だけから非可換行列に対する結論を推論しているわけではありません。原証明と非可換Laplace法の典拠は [J. A. Tropp, User-Friendly Tail Bounds for Sums of Random Matrices, §§3, 6](https://doi.org/10.1007/s10208-011-9099-z) を参照してください。ここを独立に証明するには別途Lieb凹性の理論が必要です。

例えば $d=1$ なら $\exp(H+\log C)=e^H C$ と線形ですが、$d>1$ では可換でない場合に単なる等式へ還元できません。この違いが定理の実質です。

<a id="lem-hdp8-noncommutative-mgf"></a>

<!-- formal-statement-start -->
> **補題（独立行列和の非可換指数モーメント評価）**  
> $X_1,\ldots,X_n$ を独立な実対称 $d\times d$ 確率行列とし、固定した $\theta\in\mathbb R$ に対して $M_i=E e^{\theta X_i}$ の成分が有限とする。さらに以下のトレース指数の期待値が有限とする。このとき
>
$$
E\operatorname{tr}\exp\left(\theta\sum_{i=1}^n X_i\right)
\le\operatorname{tr}\exp\left(\sum_{i=1}^n\log M_i\right).
$$
<!-- formal-statement-end -->

### 証明の見取り図

まず最後の行列だけを条件付きで平均します。[Liebの凹性定理](#thm-hdp8-lieb-concavity)を凹関数に対する期待値評価として使うと、ランダムな $\theta X_n$ を決定論的な $\log M_n$ に置換できます。同じ操作を後ろから繰り返します。これは「行列指数が積に分かれる」という誤った操作の代替です。

<!-- proof-start -->
### 証明

$M_i\succ0$ です。例えば $u\ne0$ なら $u^{\mathsf T}M_i u=E[u^{\mathsf T}e^{\theta X_i}u]>0$ なので対数が定義できます。$H=\theta\sum_{i=1}^{n-1}X_i$ を固定した実現値とします。独立性から $H$ と $X_n$ は独立です。ここで $C=e^{\theta X_n}$ は正定値で $\log C=\theta X_n$ です。[Liebの凹性定理](#thm-hdp8-lieb-concavity)の凹性により、期待値を関数の内側へ移すと

$$
\begin{aligned}
E_{X_n}\operatorname{tr}e^{H+\theta X_n}
&=E_{X_n}\operatorname{tr}e^{H+\log(e^{\theta X_n})}\\
&\le\operatorname{tr}e^{H+\log(E_{X_n}e^{\theta X_n})}\\
&=\operatorname{tr}e^{H+\log M_n}.
\end{aligned}
$$

次に $X_{n-1}$ を平均するときには $H'=\theta\sum_{i=1}^{n-2}X_i+\log M_n$ を固定します。同じ議論により $\theta X_{n-1}$ が $\log M_{n-1}$ へ置換されます。これを $n$ 回繰り返すと右辺は

$$
\operatorname{tr}\exp(\log M_1+\cdots+\log M_n)
$$

となります。指数の中の和の順序を替える必要はなく、非可換な積への分解も行っていません。
<!-- proof-end -->

行列対数を上から評価するとき、スカラーの $\log$ が単調というだけでは不十分です。ここで必要な作用素版を示します。

<a id="lem-hdp8-log-order"></a>

<!-- formal-statement-start -->
> **補題（行列対数の順序単調性）**  
> 同じ大きさの正定値実対称行列 $0\prec A\preceq B$ に対して $\log A\preceq\log B$ が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$t\ge0$ とすると $0\prec A+tI\preceq B+tI$ です。$C=(A+tI)^{-1/2}(B+tI)(A+tI)^{-1/2}\succeq I$ とおきます。$C$ の全固有値は $1$ 以上なので、逆数を取って $C^{-1}\preceq I$ が従います。ここで逆行列の積の順序を反転させると

$
C^{-1}=(A+tI)^{1/2}(B+tI)^{-1}(A+tI)^{1/2}\preceq I.
$

両辺を $(A+tI)^{-1/2}$ で[合同変換](../../../基礎科目/LA/LA6/index.md#def-la6-congruence)して戻せば

$$
(B+tI)^{-1}\preceq(A+tI)^{-1}.
$$

正数 $x$ の積分表示

$$
\log x=\int_0^\infty\left(\frac1{1+t}-\frac1{x+t}\right)\,dt
$$

は、$T>0$ までの積分を実行すれば確かめられます。実際、

$
\begin{aligned}
\int_0^T\left(\frac1{1+t}-\frac1{x+t}\right)\,dt
&=\bigl[\log(1+t)-\log(x+t)\bigr]_0^T\\
&=\log(1+T)-\log(x+T)+\log x.
\end{aligned}
$

ここで $\log(1+T)-\log(x+T)=\log\{(1+T)/(x+T)\}\to0$ なので、$T\to\infty$ で所望の表示を得ます。この計算をそれぞれの正定値行列の固有値へ適用すると

$$
\log B-\log A
=\int_0^\infty\{(A+tI)^{-1}-(B+tI)^{-1}\}\,dt
\succeq0.
$$
<!-- proof-end -->

<a id="thm-hdp8-master-tail"></a>

<!-- formal-statement-start -->
> **定理（行列Laplace法の基本尾部評価）**  
> [非可換指数モーメント補題](#lem-hdp8-noncommutative-mgf)の仮定の下、任意の $\theta>0$、$t\in\mathbb R$ について
>
$$
P\left(\lambda_{\max}\left(\sum_iX_i\right)\ge t\right)
\le e^{-\theta t}
\operatorname{tr}\exp\left(\sum_i\log E e^{\theta X_i}\right).
$$
>
> 特に各 $\log Ee^{\theta X_i}\preceq g_i(\theta)A_i$（$A_i\succeq0$ は確定行列）なら、$V=\sum_i g_i(\theta)A_i$ として右辺は $d\exp\{-\theta t+\lambda_{\max}(V)\}$ 以下である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[トレース指数による固有値の評価](#lem-hdp8-trace-laplace)と[非可換指数モーメント補題](#lem-hdp8-noncommutative-mgf)をこの順に適用して第一式を得ます。第二式は $\sum_i\log Ee^{\theta X_i}\preceq V$ から従います。対称行列 $C\preceq V$ ならRayleigh商により $\lambda_{\max}(C)\le\lambda_{\max}(V)$ なので

$$
\operatorname{tr}e^C
=\sum_{j=1}^d e^{\lambda_j(C)}
\le d e^{\lambda_{\max}(C)}
\le d e^{\lambda_{\max}(V)}.
$$

一般には $e^C\preceq e^V$ を使っていません。行列指数関数をLoewner順序に関する単調関数と誤認しないことが重要です。
<!-- proof-end -->

## 3. 行列Bernstein不等式を導く

各加数は平均零ですが、固有値の上限と二乗の期待値は残ります。その二乗行列を足して得る確定行列の最大固有値が、スカラーの分散和に対応します。

<a id="def-hdp8-variance-proxy"></a>

<!-- formal-statement-start -->
> **定義（行列分散代理量）**  
> 独立な平均零の実対称確率行列 $X_i\in\mathbb R^{d\times d}$ について、二次モーメントが有限なら
>
$$
W=\sum_{i=1}^n E[X_i^2]\succeq0,\qquad
v=\|W\|_{\mathrm{op}}=\lambda_{\max}(W)
$$
>
> と置き、$v$ を行列分散代理量という。$X_i^2=X_iX_i$ は半正定値である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hdp8-variance-proxy -->
**定義の確認**。 独立な符号 $R_i$ を取り $X_i=\operatorname{diag}(R_i,0)$ とすると $EX_i=0$、$X_i^2=\operatorname{diag}(1,0)$ です。このとき $W=\operatorname{diag}(n,0)$、$v=n$ です。トレース $\operatorname{tr}W=n$ と最大固有値 $v=n$ はこの例では一致しますが、$X_i=\operatorname{diag}(R_i,-R_i)$ なら $W=nI_2$、$\operatorname{tr}W=2n$、$v=n$ となり異なります。
<!-- definition-example-end -->

<a id="lem-hdp8-bernstein-mgf"></a>

<!-- formal-statement-start -->
> **補題（有界な平均零対称行列の指数モーメント）**  
> 実対称確率行列 $X$ が $EX=0$、$\|X\|_{\mathrm{op}}\le R$ を確率一で満たすとする。$R>0$、$\theta\ge0$ として
>
$$
Ee^{\theta X}
\preceq\exp\left(g_R(\theta)EX^2\right),
\qquad
\log Ee^{\theta X}\preceq g_R(\theta)EX^2,
$$
>
> ただし $g_R(\theta)=(e^{\theta R}-\theta R-1)/R^2$ である。
<!-- formal-statement-end -->

### 証明の見取り図

実数 $x\le R$ に対する指数関数の二次余りを積分で書き、上端 $R$ で押さえます。固有値へ適用すれば行列不等式が得られ、平均零で一次項が消えます。[行列対数の順序単調性](#lem-hdp8-log-order)で対数に移します。

<!-- proof-start -->
### 証明

実数 $x$ について $f(s)=e^{s\theta x}$ と置くと、$f'(s)=\theta x e^{s\theta x}$、$f''(s)=\theta^2x^2 e^{s\theta x}$ です。$f(1)=f(0)+f'(0)+\int_0^1(1-s)f''(s)\,ds$ を直接積分して

$$
e^{\theta x}
=1+\theta x+\theta^2x^2\int_0^1(1-s)e^{s\theta x}\,ds.
$$

$x\le R$、$\theta\ge0$ なら $e^{s\theta x}\le e^{s\theta R}$ です。両辺の余りの係数を比較し

$$
e^{\theta x}
\le1+\theta x+g_R(\theta)x^2,
\quad
\theta^2\int_0^1(1-s)e^{s\theta R}\,ds
=\frac{e^{\theta R}-\theta R-1}{R^2}.
$$

$X=U\operatorname{diag}(\lambda_j)U^{\mathsf T}$ の各 $\lambda_j\le R$ に適用し、$U$ で戻すと $e^{\theta X}\preceq I+\theta X+g_R(\theta)X^2$ です。期待値を取り $EX=0$ を用いて

$$
Ee^{\theta X}\preceq I+g_R(\theta)EX^2
\preceq e^{g_R(\theta)EX^2}.
$$

最後は $EX^2\succeq0$ の非負固有値 $z$ について $1+z\le e^z$ を使いました。両辺は正定値なので[行列対数の順序単調性](#lem-hdp8-log-order)により対数を取れます。右辺の対数は $g_R(\theta)EX^2$ です。
<!-- proof-end -->

<a id="thm-hdp8-matrix-bernstein"></a>

<!-- formal-statement-start -->
> **定理（独立有界対称行列に対する行列Bernstein不等式）**  
> $d,n\ge1$、$R>0$ とする。実対称 $d\times d$ 確率行列 $X_1,\ldots,X_n$ は独立で、$EX_i=0$、$\|X_i\|_{\mathrm{op}}\le R$ が確率一で成立するとする。[行列分散代理量](#def-hdp8-variance-proxy) $v=\|\sum_i EX_i^2\|_{\mathrm{op}}$ に対し、すべての $t>0$ で
>
$$
P\left(\lambda_{\max}\left(\sum_iX_i\right)\ge t\right)
\le d\exp\left[-\frac{t^2}{2(v+Rt/3)}\right],
$$
>
$$
P\left(\left\|\sum_iX_i\right\|_{\mathrm{op}}\ge t\right)
\le2d\exp\left[-\frac{t^2}{2(v+Rt/3)}\right].
$$
>
> $v=0$ なら $\sum_iX_i=0$ が確率一であり、これらの右辺は単なる（非鋭い）上界と解釈する。
<!-- formal-statement-end -->

### 証明の見取り図

[各加数の指数モーメント補題](#lem-hdp8-bernstein-mgf)を[行列Laplace法](#thm-hdp8-master-tail)へ代入します。得られた上界で $\theta$ を選ぶと、スカラーBernsteinと同じ二次・一次の二領域が現れます。負の固有値側へは $-X_i$ を同じ条件で適用します。

<!-- proof-start -->
### 証明

$v>0$ の場合を先に扱います。[行列Laplace法](#thm-hdp8-master-tail)で $\log Ee^{\theta X_i}\preceq g_R(\theta)EX_i^2$ と置くと

$$
\begin{aligned}
P(\lambda_{\max}(\sum_iX_i)\ge t)
&\le e^{-\theta t}\operatorname{tr}e^{\sum_i\log Ee^{\theta X_i}}\\
&\le d\exp\{-\theta t+g_R(\theta)v\}.
\end{aligned}
$$

$0\le x<3$ で $e^x-x-1=\sum_{k=2}^\infty x^k/k!$ と $k!\ge2\cdot3^{k-2}$ を使うと

$$
e^x-x-1
\le\frac{x^2}2\sum_{j=0}^\infty(x/3)^j
=\frac{x^2}{2(1-x/3)}.
$$

従って $0<\theta<3/R$ では

$$
g_R(\theta)
\le\frac{\theta^2}{2(1-\theta R/3)},
\qquad
P(\lambda_{\max}(\sum_iX_i)\ge t)
\le d\exp\left[-\theta t+\frac{v\theta^2}{2(1-\theta R/3)}\right].
$$

$\theta=t/(v+Rt/3)$ を選ぶと $\theta R/3=(Rt/3)/(v+Rt/3)<1$ で許された範囲にあります。また

$$
1-\frac{\theta R}{3}=\frac{v}{v+Rt/3},
$$

ゆえに指数は

$$
-\frac{t^2}{v+Rt/3}
+\frac{v}{2}\frac{t^2}{(v+Rt/3)^2}\frac{v+Rt/3}{v}
=-\frac{t^2}{2(v+Rt/3)}.
$$

これで片側評価が得られます。$-X_i$ も独立・平均零・$\|-X_i\|_{\mathrm{op}}\le R$ を満たし、$(-X_i)^2=X_i^2$ なので分散代理量は同じです。

$$
\{\|\sum_iX_i\|_{\mathrm{op}}\ge t\}
=\{\lambda_{\max}(\sum_iX_i)\ge t\}
\cup\{\lambda_{\max}(-\sum_iX_i)\ge t\}
$$

へ[和集合の劣加法性](../../F0/F0-00P2A/index.md#thm-f0-00p2a-union-bound)を適用すると $2d$ の係数が得られます。$v=0$ なら $\operatorname{tr}\sum_i EX_i^2=0$ で、非負変数 $\|X_i\|_{\mathrm F}^2=\operatorname{tr}X_i^2$ の期待値がすべて零です。従って各 $X_i=0$ が確率一であり、この場合も結論は成立します。
<!-- proof-end -->

**分散依存と二領域**。$t\ll v/R$ なら指数は概ね $-t^2/(2v)$、$t\gg v/R$ なら概ね $-3t/(2R)$ です。$v$ は $\sum_i\|EX_i^2\|_{\mathrm{op}}$ ではなく、**足してから作用素ノルム**を取ります。異なる方向へ分散が分布すると、両者の差は大きくなります。

## 4. 行列Hoeffding不等式との関係

Bernsteinの評価は二乗行列の情報を使います。二乗モーメントを計算しづらくても、各行列の固有値が既知の区間に入るなら直接Hoeffding型の評価を得られます。

<a id="thm-hdp8-matrix-hoeffding"></a>

<!-- formal-statement-start -->
> **定理（区間有界な独立対称行列の行列Hoeffding不等式）**  
> $X_1,\ldots,X_n$ は独立な実対称 $d\times d$ 確率行列で $EX_i=0$ とする。確定実数 $a_i\le0\le b_i$ があり、確率一で $a_iI_d\preceq X_i\preceq b_iI_d$ とする。$L=\sum_i(b_i-a_i)^2>0$ とおけば、すべての $t>0$ に対し
>
$$
P\left(\left\|\sum_iX_i\right\|_{\mathrm{op}}\ge t\right)
\le2d\exp\left(-\frac{2t^2}{L}\right).
$$
<!-- formal-statement-end -->

### 証明の見取り図

指数関数の割線評価を各固有値へ適用すると、行列の期待値は区間の両端を取る**スカラー二点分布**の指数モーメントで上から押さえられます。そこで[スカラーHoeffdingの補題](../HDP1/index.md#lem-hdp1-hoeffding)がそのまま役立ちます。

<!-- proof-start -->
### 証明

$b_i>a_i$ の加数を考えます。$a_i\le x\le b_i$ では指数関数の凸性から

$$
e^{\theta x}
\le\frac{b_i-x}{b_i-a_i}e^{\theta a_i}
+\frac{x-a_i}{b_i-a_i}e^{\theta b_i}.
$$

スペクトル分解で各固有値へ適用し、期待値を取って $EX_i=0$ とすると

$$
Ee^{\theta X_i}
\preceq\left\{\frac{b_i}{b_i-a_i}e^{\theta a_i}
+\frac{-a_i}{b_i-a_i}e^{\theta b_i}\right\}I_d.
$$

右辺の括弧は $P(Y_i=a_i)=b_i/(b_i-a_i)$、$P(Y_i=b_i)=-a_i/(b_i-a_i)$ とする実数値変数 $Y_i$ の $Ee^{\theta Y_i}$ です。確率は非負で和が $1$、$EY_i=0$、台は $[a_i,b_i]$ です。[区間有界な平均零変数の指数モーメント補題](../HDP1/index.md#lem-hdp1-hoeffding)を $Y_i$ に適用すると

$$
Ee^{\theta X_i}
\preceq e^{\theta^2(b_i-a_i)^2/8}I_d,
\quad
\log Ee^{\theta X_i}
\preceq\frac{\theta^2(b_i-a_i)^2}{8}I_d,
$$

後者は[行列対数の順序単調性](#lem-hdp8-log-order)によります。$a_i=b_i$ なら $EX_i=0$ によって $X_i=0$ なので同じ式が成立します。[行列Laplace法](#thm-hdp8-master-tail)から

$$
P(\lambda_{\max}(\sum_iX_i)\ge t)
\le d\exp(-\theta t+\theta^2L/8).
$$

$\theta=4t/L>0$ を代入すると指数は $-4t^2/L+16t^2/(8L)=-2t^2/L$ です。$-X_i$ は区間 $[-b_i,-a_i]$ にあり幅が同じなので、下側も合わせて結論を得ます。
<!-- proof-end -->

## 5. 長方形行列への拡張と標本共分散

実対称でない $p\times q$ 行列の特異値にも同じ方法を使うため、対称な大きな行列へ埋め込みます。これを自己共役拡張（dilation）と呼びます。

<a id="def-hdp8-dilation"></a>

<!-- formal-statement-start -->
> **定義（長方形行列の自己共役拡張）**  
> $p,q\ge1$、$Z\in\mathbb R^{p\times q}$ に対して
>
$$
\mathcal D(Z)=\begin{pmatrix}0&Z\\Z^{\mathsf T}&0\end{pmatrix}
\in\mathbb R^{(p+q)\times(p+q)}
$$
>
> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hdp8-dilation -->
**定義の確認**。$Z=(a,b)^{\mathsf T}\in\mathbb R^{2\times1}$ なら $\mathcal D(Z)$ は $3\times3$ の対称行列で、

$
\mathcal D(Z)=\begin{pmatrix}0&0&a\\0&0&b\\a&b&0\end{pmatrix},
\qquad
\mathcal D(Z)^2=\operatorname{diag}(ZZ^{\mathsf T},Z^{\mathsf T}Z).
$

$r=\sqrt{a^2+b^2}>0$ なら、直接掛け算すると $(a,b,r)^{\mathsf T}$ と $(a,b,-r)^{\mathsf T}$ は、それぞれ固有値 $r$ と $-r$ の固有ベクトルです。また $(-b,a,0)^{\mathsf T}$ は固有値 $0$ の固有ベクトルです。よって固有値は $r,-r,0$、作用素ノルムは $r=\|Z\|_{\mathrm{op}}$ です。$r=0$ なら $\mathcal D(Z)=0$ なので同じノルムの等式が成り立ちます。
<!-- definition-example-end -->

<a id="cor-hdp8-rectangular-bernstein"></a>

<!-- formal-statement-start -->
> **系（長方形行列のBernstein不等式）**  
> $Z_1,\ldots,Z_n\in\mathbb R^{p\times q}$ が独立で $EZ_i=0$、$\|Z_i\|_{\mathrm{op}}\le R$ を確率一で満たすとする。$R>0$、
>
$$
v_{\mathrm{rec}}=\max\left\{
\left\|\sum_iE[Z_iZ_i^{\mathsf T}]\right\|_{\mathrm{op}},
\left\|\sum_iE[Z_i^{\mathsf T}Z_i]\right\|_{\mathrm{op}}\right\}
$$
>
> とおけば、すべての $t>0$ に対し
>
$$
P\left(\left\|\sum_iZ_i\right\|_{\mathrm{op}}\ge t\right)
\le(p+q)\exp\left[-\frac{t^2}{2(v_{\mathrm{rec}}+Rt/3)}\right].
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$Y_i=\mathcal D(Z_i)$ とおくと、独立性・平均零・$\|Y_i\|_{\mathrm{op}}\le R$ が成り立ちます。また

$$
Y_i^2=
\begin{pmatrix}Z_iZ_i^{\mathsf T}&0\\0&Z_i^{\mathsf T}Z_i\end{pmatrix},
\quad
\left\|\sum_iEY_i^2\right\|_{\mathrm{op}}=v_{\mathrm{rec}}.
$$

ここで $Z=\sum_iZ_i$ に[実行列の特異値分解](../../../基礎科目/F0/F0-00F2/index.md#thm-f0-00f2-svd)を適用します。$Z=U\Sigma V^{\mathsf T}$（$U\in\mathbb R^{p\times p}$、$V\in\mathbb R^{q\times q}$ は直交行列）なら、ブロック対角の直交行列 $Q=\operatorname{diag}(U,V)$ により

$
Q^{\mathsf T}\mathcal D(Z)Q
=\begin{pmatrix}0&\Sigma\\\Sigma^{\mathsf T}&0\end{pmatrix}.
$

正の特異値 $\sigma_j$ に対応する左右の標準基底ベクトルを $e_j^{(p)},e_j^{(q)}$ と書くと、右辺に $(e_j^{(p)},\pm e_j^{(q)})^{\mathsf T}/\sqrt2$ を掛けた結果は、そのベクトルの $\pm\sigma_j$ 倍です。残る零特異値の方向は固有値 $0$ になります。したがって $\mathcal D(Z)$ の固有値は正負の特異値の組と零であり、

$
\lambda_{\max}\left(\sum_iY_i\right)
=\lambda_{\max}(\mathcal D(Z))
=\|Z\|_{\mathrm{op}}
=\left\|\sum_iZ_i\right\|_{\mathrm{op}}.
$

$Z=0$ の場合は両辺が $0$ です。よって[行列Bernsteinの片側評価](#thm-hdp8-matrix-bernstein)を次元 $p+q$ の $Y_i$ へ適用すると、**両側の係数 $2(p+q)$ ではなく** $(p+q)$ が得られます。
<!-- proof-end -->

もう一つの利用例は、有界なベクトルから作った標本共分散です。$X_i\in\mathbb R^d$ が独立同分布、$EX_i=0$、$\|X_i\|_2\le L$（$L>0$）、$\Sigma=E[X_iX_i^{\mathsf T}]$ とします。$Y_i=X_iX_i^{\mathsf T}-\Sigma$ には

$$
-L^2I_d\preceq Y_i\preceq L^2I_d,\qquad
EY_i^2=E[\|X_i\|_2^2X_iX_i^{\mathsf T}]-\Sigma^2
\preceq L^2\Sigma.
$$

前者は $0\preceq X_iX_i^{\mathsf T}\preceq L^2I$ と $0\preceq\Sigma\preceq L^2I$ から従い、後者は二乗を展開して期待値を取ると交差項が各 $\Sigma^2$ になることによります。従って $v\le nL^2\|\Sigma\|_{\mathrm{op}}$ です。[行列Bernstein不等式](#thm-hdp8-matrix-bernstein)に $t=n\varepsilon$ を入れると

$$
P\left(\left\|\frac1n\sum_iX_iX_i^{\mathsf T}-\Sigma\right\|_{\mathrm{op}}\ge\varepsilon\right)
\le2d\exp\left[-\frac{n\varepsilon^2}
{2(L^2\|\Sigma\|_{\mathrm{op}}+L^2\varepsilon/3)}\right].
$$

この評価は有界性を仮定したもので、[HDP7のsub-Gaussian条件](../HDP7/index.md#def-hdp7-subgaussian-vector)と同じ仮定ではありません。有限netを使う証明と行列Laplace法は、異なる入力条件・定数・次元依存で比較すべき二つの道具です。

## 6. 仮定を外したとき何が壊れるか

**非可換指数を積に分ける誤り**。冒頭の $A,B$ に対し、$e^Ae^B$ は一般には非対称で、対称な $e^{A+B}$ と等しくありません。必要なのは[非可換指数モーメント補題](#lem-hdp8-noncommutative-mgf)のトレース比較であり、偽の積公式ではありません。

**独立性を外す誤り**。$d=1$、$X_i=R$（全て同じ符号変数）なら一つ一つは平均零で $|X_i|\le1$、$EX_i^2=1$ ですが、和は $nR$ です。$t=n/2$ で $P(\sum_iX_i\ge t)=1/2$ は $n$ とともに減りません。一方、独立だと誤認して[行列Bernstein不等式](#thm-hdp8-matrix-bernstein)の片側式へ $v=n,R=1$ を入れると $e^{-3n/28}$ となり、十分大きい $n$ で $1/2$ 未満になります。失われたのは条件付きJensenで $X_i$ を一つずつ平均できる独立性です。

**有界性を外す誤り**。$d=1$、平均零で二次モーメントが有限でも、裾がべき型の変数は $Ee^{\theta X}$ が正の $\theta$ で発散し得ます。証明の[有界行列指数モーメント補題](#lem-hdp8-bernstein-mgf)を適用できないので、同じ $R$ を置くことはできません。非有界な変数に別のモーメント条件を課す場合は、その条件から適切な行列指数モーメント評価を作り直す必要があります。

## 7. 演習：作用素順序から応用まで

**Level A：定義と最小例**

### A1. 2次元符号行列の分散代理量

独立なRademacher変数 $R_1,\ldots,R_n$ について $X_i=\operatorname{diag}(R_i,-R_i)$ とする。$EX_i$、$EX_i^2$、$v$ と $\|\sum_iX_i\|_{\mathrm{op}}$ を求めよ。

- Level: A
- ID: HDP8-A1

<!-- solution-start -->
**詳細解答**　$ER_i=0$、$R_i^2=1$ なので $EX_i=0$、$EX_i^2=I_2$ です。従って $W=\sum_iEX_i^2=nI_2$、$v=n$ です。$T=\sum_iR_i$ とすると $\sum_iX_i=\operatorname{diag}(T,-T)$ で固有値は $T,-T$、ゆえに $\|\sum_iX_i\|_{\mathrm{op}}=|T|$ です。
<!-- solution-end -->

### A2. トレース指数の閾値

対称な $2\times2$ 行列 $H$ の固有値が $3,-1$ である。$\operatorname{tr}e^{\theta H}$ を求め、$\theta>0$ について $e^{3\theta}\le\operatorname{tr}e^{\theta H}\le2e^{3\theta}$ を確認せよ。

- Level: A
- ID: HDP8-A2

<!-- solution-start -->
**詳細解答**　直交対角化により $\operatorname{tr}e^{\theta H}=e^{3\theta}+e^{-\theta}$ です。第一不等式は $e^{-\theta}>0$ より、第二は $-\theta\le3\theta$ から $e^{-\theta}\le e^{3\theta}$ により従います。ここで使ったのは固有値ごとのスカラー指数の単調性であって、行列指数のLoewner単調性ではありません。
<!-- solution-end -->

### A3. 区間条件と負側

$EX=0$ を満たす実対称確率行列に対し $-2I_d\preceq X\preceq3I_d$ とする。$-X$ の区間と幅を求め、[行列Hoeffding不等式](#thm-hdp8-matrix-hoeffding)を独立な $n$ 個のこの型の行列へ適用せよ。

- Level: A
- ID: HDP8-A3

<!-- solution-start -->
**詳細解答**　$-3I_d\preceq-X\preceq2I_d$ なので両側とも区間幅は $5$ です。各加数が独立なら $L=\sum_i(3-(-2))^2=25n$ です。[行列Hoeffding不等式](#thm-hdp8-matrix-hoeffding)の $t>0$ に対し $P(\|\sum_iX_i\|_{\mathrm{op}}\ge t)\le2d e^{-2t^2/(25n)}$ です。$n$ 個の行列の独立性が必要です。
<!-- solution-end -->

### A4. 長方形拡張の二乗

$Z=(a,b)^{\mathsf T}\in\mathbb R^{2\times1}$ について $\mathcal D(Z)$ と $\mathcal D(Z)^2$ を成分で書き、最大固有値を求めよ。

- Level: A
- ID: HDP8-A4

<!-- solution-start -->
**詳細解答**　定義から

$$
\mathcal D(Z)=\begin{pmatrix}0&0&a\\0&0&b\\a&b&0\end{pmatrix},
\qquad
\mathcal D(Z)^2=\begin{pmatrix}a^2&ab&0\\ab&b^2&0\\0&0&a^2+b^2\end{pmatrix}.
$$

$\mathcal D(Z)$ の固有値を直接確認します。$\det(\mathcal D(Z)-\lambda I)$ を第一行に沿って展開すると

$
\begin{aligned}
\det(\mathcal D(Z)-\lambda I)
&=(-\lambda)(\lambda^2-b^2)+\lambda a^2\\
&=-\lambda(\lambda^2-a^2-b^2).
\end{aligned}
$

したがって固有値は $0,\pm\sqrt{a^2+b^2}$ であり、最大固有値は $\sqrt{a^2+b^2}=\|Z\|_{\mathrm{op}}$ です。
<!-- solution-end -->

### A5. 分散ゼロをどう扱うか

平均零の実対称確率行列 $X_i$ の独立な有限列について $\sum_i EX_i^2=0$ とする。各 $X_i=0$ が確率一であることを、二乗行列の対角和から示せ。

- Level: A
- ID: HDP8-A5

<!-- solution-start -->
**詳細解答**　$\operatorname{tr}EX_i^2=E\operatorname{tr}X_i^2=E\|X_i\|_{\mathrm F}^2\ge0$ です。和の期待値が $\operatorname{tr}0=0$ なので各 $E\|X_i\|_{\mathrm F}^2=0$ です。非負確率変数で期待値零なら確率一で零となるため $\|X_i\|_{\mathrm F}^2=0$、従って各 $X_i=0$ です。独立性はこの退化結論自体には不要です。
<!-- solution-end -->

**Level B：証明機構を組み立てる**

### B1. 行列指数の二次余り

$EX=0$、$\|X\|_{\mathrm{op}}\le R$（$R>0$）の実対称確率行列について、$Ee^{\theta X}\preceq I+g_R(\theta)EX^2$ を $\theta\ge0$ で出発点から導け。

- Level: B
- ID: HDP8-B1

<!-- solution-start -->
**詳細解答**　任意の $x\in[-R,R]$ に対し微積分の二回積分で $e^{\theta x}-1-\theta x=\theta^2x^2\int_0^1(1-s)e^{s\theta x}ds$ です。$e^{s\theta x}\le e^{s\theta R}$ なので積分係数は

$$
\theta^2\int_0^1(1-s)e^{s\theta R}ds
=\frac{e^{\theta R}-1-\theta R}{R^2}=g_R(\theta).
$$

$X=U\operatorname{diag}(\lambda_j)U^{\mathsf T}$ の各固有値 $\lambda_j\in[-R,R]$ にスカラーで得た評価を当てはめ、同じ $U$ で戻すと $e^{\theta X}\preceq I+\theta X+g_R(\theta)X^2$ です。$EX=0$ より期待値を取ると要求された式です。指数積分の有限性は $\|X\|_{\mathrm{op}}\le R$ で保証されます。
<!-- solution-end -->

### B2. 行列Hoeffdingの二点分布

平均零の $d\times d$ 対称確率行列 $X$ に対し $-aI\preceq X\preceq bI$（$a,b>0$）とする。区間の割線評価で $Ee^{\theta X}\preceq e^{\theta^2(a+b)^2/8}I$ を導け。

- Level: B
- ID: HDP8-B2

<!-- solution-start -->
**詳細解答**　凸性から各固有値 $-a\le x\le b$ に対し $e^{\theta x}\le\frac{b-x}{a+b}e^{-a\theta}+\frac{x+a}{a+b}e^{b\theta}$ です。対角化で行列へ移し、$EX=0$ を用いて

$$
Ee^{\theta X}\preceq\left(\frac b{a+b}e^{-a\theta}+\frac a{a+b}e^{b\theta}\right)I.
$$

$P(Y=-a)=b/(a+b)$、$P(Y=b)=a/(a+b)$ と置けば $EY=-ab/(a+b)+ab/(a+b)=0$ です。$Y$ の台は $[-a,b]$ なので[Hoeffdingの補題](../HDP1/index.md#lem-hdp1-hoeffding)より括弧は $Ee^{\theta Y}\le e^{\theta^2(a+b)^2/8}$ です。
<!-- solution-end -->

### B3. 有界な標本共分散

独立同分布な $X_i\in\mathbb R^d$ が $EX_i=0$、$\|X_i\|_2\le L$ を満たすとする。$\Sigma=EX_iX_i^{\mathsf T}$、$Y_i=X_iX_i^{\mathsf T}-\Sigma$ として $EY_i^2\preceq L^2\Sigma$ を展開から示し、$P(\|\frac1n\sum_iY_i\|_{\mathrm{op}}\ge\varepsilon)$ の上界を書け。

- Level: B
- ID: HDP8-B3

<!-- solution-start -->
**詳細解答**　$A_i=X_iX_i^{\mathsf T}$ とおくと $A_i^2=\|X_i\|_2^2A_i\preceq L^2A_i$ です。また

$$
\begin{aligned}
E(A_i-\Sigma)^2
&=E(A_i^2-A_i\Sigma-\Sigma A_i+\Sigma^2)\\
&=EA_i^2-(EA_i)\Sigma-\Sigma(EA_i)+\Sigma^2\\
&=EA_i^2-\Sigma^2\preceq L^2\Sigma.
\end{aligned}
$$

$0\preceq A_i,\Sigma\preceq L^2I$ から $\|Y_i\|_{\mathrm{op}}\le L^2$ であり、$v\le nL^2\|\Sigma\|_{\mathrm{op}}$ です。[行列Bernstein不等式](#thm-hdp8-matrix-bernstein)へ $t=n\varepsilon$ を代入して

$$
P\left(\left\|\frac1n\sum_iY_i\right\|_{\mathrm{op}}\ge\varepsilon\right)
\le2d\exp\left[-\frac{n\varepsilon^2}{2(L^2\|\Sigma\|_{\mathrm{op}}+L^2\varepsilon/3)}\right].
$$
<!-- solution-end -->

### B4. 長方形行列の分散方向

独立なRademacher変数 $R_i$ に対し $Z_i=(R_i,0)^{\mathsf T}\in\mathbb R^{2\times1}$ とする。$v_{\mathrm{rec}}$、拡張の次元と片側Bernstein評価を計算せよ。

- Level: B
- ID: HDP8-B4

<!-- solution-start -->
**詳細解答**　$EZ_i=0$、$\|Z_i\|_{\mathrm{op}}=1$ です。$EZ_iZ_i^{\mathsf T}=\operatorname{diag}(1,0)$、$EZ_i^{\mathsf T}Z_i=(1)$ なので、各々を $n$ 個足した作用素ノルムはともに $n$ です。従って $v_{\mathrm{rec}}=n$、拡張は $3\times3$ です。[長方形行列のBernstein系](#cor-hdp8-rectangular-bernstein)を使えば

$$
P\left(\left\|\sum_iZ_i\right\|_{\mathrm{op}}\ge t\right)
\le3\exp\left(-\frac{t^2}{2(n+t/3)}\right).
$$

実際の左辺は $P(|\sum_iR_i|\ge t)$ です。両側評価に機械的に $2(p+q)=6$ を使う必要はありません。
<!-- solution-end -->

**Level C：組合せと反例**

### C1. 信頼度から偏差閾値を逆算する

独立な平均零の実対称 $d\times d$ 確率行列 $X_i$ が $\|X_i\|_{\mathrm{op}}\le R$（$R>0$）を確率一で満たし、$v=\|\sum_iEX_i^2\|_{\mathrm{op}}>0$ とする。$0<\delta<1$、$u=\log(2d/\delta)$ に対し

$$
P\left(\left\|\sum_iX_i\right\|_{\mathrm{op}}>
\sqrt{2vu}+\frac{2Ru}3\right)\le\delta
$$

を示せ。単に定理を引用するだけでなく、閾値の代数確認を記せ。

- Level: C
- ID: HDP8-C1

<!-- solution-start -->
**詳細解答**　$a=\sqrt{2vu}$、$b=2Ru/3$、$t=a+b>0$ と置きます。$a^2=2vu$ です。分母の式を展開すると

$$
2u(v+Rt/3)
=2uv+bt
=a^2+ab+b^2,
$$

一方

$$
t^2=(a+b)^2=a^2+2ab+b^2.
$$

差は $ab\ge0$ なので $t^2/[2(v+Rt/3)]\ge u$ です。[行列Bernstein不等式](#thm-hdp8-matrix-bernstein)へこの $t$ を代入すると失敗確率は $2d e^{-u}=\delta$ 以下です。$\{\,\|\sum_iX_i\|>t\,\}\subseteq\{\,\|\sum_iX_i\|\ge t\,\}$ なので設問が従います。$v=0$ の場合は行列和が零で別途自明です。
<!-- solution-end -->

### C2. 完全従属の反例と証明の破綻点

一つのRademacher変数 $R$ を使って $d=1$ の確率行列 $X_1=\cdots=X_n=(R)$ を作る。$v$、$R$ に相当する一項の上限、$t=n/2$ における上側尾部確率を求め、独立と誤認したときの行列Bernstein上界がなぜ一般に破綻するかを示せ。

- Level: C
- ID: HDP8-C2

<!-- solution-start -->
**詳細解答**　各行列は平均零、二乗が $(1)$ なので $W=(n)$、$v=n$、各作用素ノルムは $1$ です。しかし和は $(nR)$ であり、

$$
P\left(\lambda_{\max}\left(\sum_iX_i\right)\ge n/2\right)
=P(R=1)=\frac12.
$$

独立性を誤って仮定すると片側[行列Bernstein評価](#thm-hdp8-matrix-bernstein)は

$$
\exp\left[-\frac{(n/2)^2}{2(n+n/6)}\right]
=\exp(-3n/28).
$$

$n>28\log2/3$ なら右辺は $1/2$ より小さく、実際の確率と矛盾します。破綻した箇所は[非可換指数モーメント補題](#lem-hdp8-noncommutative-mgf)の条件付き平均です。$X_i$ は全て同じ $R$ を含むので、$X_n$ の条件付き分布は先行する $X_i$ と独立ではなく、$E_{X_n}e^{\theta X_n}$ を確定行列として外へ置けません。
<!-- solution-end -->

## 8. 使い分けと次章への橋

この章の対象は独立な**有界**行列であり、[HDP2のスカラーBernstein](../HDP2/index.md#thm-hdp2-bernstein)の行列版です。独立性を満たさない場合や、非有界なGaussian型二次形式を扱う場合には追加の構造が必要です。次のHDP9では、二次形式を線形和へ無理に分解するのではなく、Hanson–Wright型の仮定と証明機構を調べます。

本章で深い入力として残したのは[Liebの凹性定理](#thm-hdp8-lieb-concavity)そのものの証明です。逆に、その適用に伴う条件付き期待値の順序、行列対数の順序、行列指数モーメントの各上界、Bernsteinの指数の最適化と全演習は、この章内で再計算できるように展開しました。
