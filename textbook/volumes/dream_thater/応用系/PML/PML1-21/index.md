# PML1-21 データから動力学を同定すると何が失われるか

## 1. 軌道を見ただけで運動方程式が分かるか

[一段数値更新写像](../PML1-20/index.md#def-pml1-20-one-step)を使えば、既知の運動方程式から軌道を計算できる。ここでは逆向きに、観測した状態や速度から運動方程式を推定したい。

たとえば実数値の状態 $x(t)$ が、時刻に依存しない微分方程式

$$
\dot x(t)=f(x(t))
$$

に従うとする。上の点は時間 $t$ に関する微分を表す。[自律的な微分方程式](../../../解析系/ODE/ODE4/index.md#def-ode4-nonlinear-autonomous-system)では、右辺 $f$ は時刻そのものには依存しない。未知の $f$ を有限のデータから探すことが今回の課題である。

一つの軌道の上で $f$ を正確に知っても、**軌道が通らなかった状態での $f$ は直接には分からない**。さらに実際の観測には、標本時刻の離散化と測定誤差がある。以下では次を分けて調べる。

1. どの関数の組合せを候補に入れたか（モデル化）。
2. どこで観測したか（[識別可能性](../../../解析系/INV/INV1/index.md#def-inv1-identifiability)）。
3. 微分と最小二乗推定にどれだけ誤差が入るか（推定）。
4. 観測点で合っているモデルが、新しい点や長時間でも合うか（予測）。

## 2. SINDy：有限個の候補関数から右辺を作る

未知関数を何の制限もなく探す代わりに、既知の候補関数を有限個選ぶ。例として $x$ と $x^2$ を選べば、未知の二係数だけを推定すればよい。この発想が SINDy（Sparse Identification of Nonlinear Dynamics、疎な非線形動力学の同定）の有限辞書版である。

<a id="def-pml1-21-library"></a>

<!-- formal-statement-start -->
> **定義（有限辞書によるベクトル場の模型）**  
> 状態領域 $D\subset\mathbb R^d$ 上の既知の実数値関数 $\phi_1,\ldots,\phi_p:D\to\mathbb R$ と係数行列 $\Xi=(\xi_{jk})\in\mathbb R^{p\times d}$ を与える。列ベクトル

$$
\phi(x)=\begin{pmatrix}\phi_1(x)\\\vdots\\\phi_p(x)\end{pmatrix}
$$

> を辞書ベクトルとし、近似ベクトル場を

$$
f_\Xi(x)=\Xi^{\mathsf T}\phi(x)\in\mathbb R^d
$$

> とする。非零係数が少ない行列を選ぶとき、辞書表示を疎であるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml1-21-library -->
**定義の確認**。 $d=1$、$D=\mathbb R$、$\phi_1(x)=x$、$\phi_2(x)=x^2$、$\Xi=(-1,0)^{\mathsf T}$ とすると、二つの辞書関数はともに $D$ 上で定義され、$\Xi$ は $2\times1$ 行列である。実際に

$$
f_\Xi(x)=(-1,0)
\begin{pmatrix}x\\x^2\end{pmatrix}=-x
$$

となり、二係数のうち非零は一つである。
<!-- definition-example-end -->

状態 $x_i\in D$ と、その位置で測った速度 $y_i\in\mathbb R^d$ を $i=1,\ldots,N$ について与える。辞書を各観測点で評価し、その値を行へ並べると、係数を掛けた結果が予測速度になる。この対応を先に確認してから行列で書く。

<a id="def-pml1-21-design"></a>

<!-- formal-statement-start -->
> **定義（辞書行列・速度残差・疎同定）**  
> $N$ 個の状態 $x_i\in D\subset\mathbb R^d$ と速度観測 $y_i\in\mathbb R^d$、辞書関数 $\phi_j:D\to\mathbb R$（$j=1,\ldots,p$）を与える。$N\times p$ 行列 $\Theta$ と $N\times d$ 行列 $Y$ を

$$
\Theta_{ij}=\phi_j(x_i),\qquad Y_{ik}=(y_i)_k
$$

> で定める。係数 $\Xi\in\mathbb R^{p\times d}$ の残差は $\Theta\Xi-Y$、最小二乗損失は $\|\Theta\Xi-Y\|_F^2$ である。$\|\Xi\|_0$ を非零成分数として、例えば

$$
\min_{\Xi\in\mathbb R^{p\times d}}
\bigl\{\|\Theta\Xi-Y\|_F^2+\lambda\|\Xi\|_0\bigr\},
\qquad\lambda\ge0
$$

> を有限辞書の疎同定問題とする。$\lambda=0$ は通常の最小二乗である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml1-21-design -->
**定義の確認**。 $d=1$、$\phi(x)=(x,x^2)^{\mathsf T}$、観測状態 $(-1,1)$、速度 $(1,-1)$ とする。標本 $x=-1$ では辞書は $(-1,1)$、$x=1$ では $(1,1)$ なので

$$
\Theta=\begin{pmatrix}-1&1\\1&1\end{pmatrix},
\qquad Y=\begin{pmatrix}1\\-1\end{pmatrix}.
$$

$\Xi=(-1,0)^{\mathsf T}$ を代入すると $\Theta\Xi=Y$ で残差ゼロ、かつ $\|\Xi\|_0=1$。$\lambda=0$ に対して損失の最小値 $0$ を達成する。$\lambda>0$ では残差と非零係数数の両方を比較するので、この代入だけから最適解とは判定しない。
<!-- definition-example-end -->

$\lambda>0$ を入れる理由は、観測点にだけ適合する多数の項を避けたいからである。ただし、疎なモデルが真の方程式と一致する保証はない。特に真の右辺が辞書の線形結合で書けるかどうかは、データの量とは別の問題である。

## 3. 何を観測すれば係数が一意になるか

まず $\lambda=0$、速度が正確に分かっている場合を考える。各係数を区別するには、辞書行列の列が独立でなければならない。これは「候補関数が互いに異なる」という条件よりも強い。観測した**点の上で**それらを区別できる必要がある。

<a id="thm-pml1-21-full-rank"></a>

<!-- formal-statement-start -->
> **定理（有限辞書の最小二乗係数の一意性）**  
> $\Theta\in\mathbb R^{N\times p}$ と $Y\in\mathbb R^{N\times d}$ を与え、$\Xi$ に関する $\|\Theta\Xi-Y\|_F^2$ を最小化する。$\operatorname{rank}\Theta=p$ なら最小化解は一意であり、

$$
\widehat\Xi=(\Theta^{\mathsf T}\Theta)^{-1}\Theta^{\mathsf T}Y
$$

> に等しい。逆に $\operatorname{rank}\Theta<p$ なら最小化解は存在するが、一意ではない。特に観測が $Y=\Theta\Xi_\ast$ を正確に満たせば、推定係数は $\Xi_\ast$ と一致する。これは十分条件であり、係数一致に観測誤差ゼロが必須という意味ではない。
<!-- formal-statement-end -->

**証明の見取り図。** 残差平方を係数方向へ動かして正規方程式を導く。行列 $\Theta^{\mathsf T}\Theta$ の二次形式は $\|\Theta v\|_2^2$ であり、核の有無が一意性を決める。

<!-- proof-start -->
### 証明

$Y$ の各列を $y$、対応する $\Xi$ の列を $\xi$ と書く。目的関数を成分で展開すると

$$
\begin{aligned}
\|\Theta\xi-y\|_2^2
&=(\Theta\xi-y)^{\mathsf T}(\Theta\xi-y)\\
&=\xi^{\mathsf T}\Theta^{\mathsf T}\Theta\xi
 -2\xi^{\mathsf T}\Theta^{\mathsf T}y+y^{\mathsf T}y.
\end{aligned}
$$

$\xi$ の各成分で微分すると $\nabla_\xi=2\Theta^{\mathsf T}\Theta\xi-2\Theta^{\mathsf T}y$。従って停留点は正規方程式 $\Theta^{\mathsf T}\Theta\xi=\Theta^{\mathsf T}y$ を満たす。

$\operatorname{rank}\Theta=p$ なら、任意の非零 $v\in\mathbb R^p$ で

$$
v^{\mathsf T}\Theta^{\mathsf T}\Theta v=\|\Theta v\|_2^2>0.
$$

よって $\Theta^{\mathsf T}\Theta$ は正定値かつ可逆で、上記の解が唯一の最小点となる。各列に適用して行列式を得る。

$\operatorname{rank}\Theta<p$ の場合、$\Theta v=0$ を満たす非零 $v$ がある。有限次元の列空間への直交射影によって最小二乗解 $\xi_0$ が存在し、$\Theta(\xi_0+tv)=\Theta\xi_0$ が全 $t\in\mathbb R$ で成立するため非一意となる。複数列の場合も一つの列をこの方向にずらせる。

最後に $Y=\Theta\Xi_\ast$ かつ列フルランクなら、上の一意性により $\widehat\Xi=\Xi_\ast$ となる。
<!-- proof-end -->

**二点で解け、一点では解けない例。** 前節の $\Theta$ の行列式は $(-1)\cdot1-1\cdot1=-2\ne0$ なので、$x$ 項と $x^2$ 項を区別できる。もし $x=1$ でしか速度 $-1$ を観測しなければ、得られる式は $\xi_1+\xi_2=-1$ だけで、$(-1,0)$ と $(0,-1)$ の双方が一致する。観測点を同じ $x=1$ に何回増やしても行の線形独立性は増えない。

<a id="prop-pml1-21-conditioning"></a>

<!-- formal-statement-start -->
> **命題（係数誤差と辞書行列の条件）**  
> $\Theta\in\mathbb R^{N\times p}$ が列フルランクで、単一出力の観測 $y=\Theta\xi_\ast+e$ を与える。通常の最小二乗推定量 $\widehat\xi$ について

$$
\widehat\xi-\xi_\ast
=(\Theta^{\mathsf T}\Theta)^{-1}\Theta^{\mathsf T}e,
\qquad
\|\widehat\xi-\xi_\ast\|_2
\le\frac{\|e\|_2}{\sigma_{\min}(\Theta)}
$$

> が成立する。$\sigma_{\min}(\Theta)>0$ は $\Theta$ の最小特異値である。
<!-- formal-statement-end -->

**証明の見取り図。** 正規方程式へ観測式を入れ、係数差を取り出す。直交する特異ベクトル方向のうち、最も小さく写される方向で誤差が最大に増幅する。

<!-- proof-start -->
### 証明

[最小二乗係数の公式](#thm-pml1-21-full-rank)に $y=\Theta\xi_\ast+e$ を代入すると

$$
\widehat\xi
=(\Theta^{\mathsf T}\Theta)^{-1}
 \Theta^{\mathsf T}(\Theta\xi_\ast+e)
=\xi_\ast+(\Theta^{\mathsf T}\Theta)^{-1}\Theta^{\mathsf T}e.
$$

実数行列の特異値分解を $\Theta=U\Sigma V^{\mathsf T}$（列フルランク）と書くと、上式の誤差作用素は $V\Sigma^{-1}U^{\mathsf T}$ で、その作用素ノルムは $1/\sigma_{\min}(\Theta)$。従ってノルム不等式から主張を得る。
<!-- proof-end -->

行列が可逆でも、二列がほぼ同じ観測値を返せば最小特異値は小さくなる。**一意であることと、雑音に安定であることは別**である。また $\lambda>0$ の疎同定では正規方程式だけで最適化できず、係数をゼロにすることによる偏りも生じる。

## 4. 速度を観測できないとき：差分微分の代償

位置だけを一定間隔で観測し、中央差分で速度を作る場合を調べる。$x(t)$ を一変数の滑らかな軌道とし、刻み幅 $h>0$ に対して

$$
D_hx(t)=\frac{x(t+h)-x(t-h)}{2h}
$$

を計算する。測定誤差があると、分子の二つの測定値の誤差も $2h$ で割られる。

<a id="prop-pml1-21-difference-error"></a>

<!-- formal-statement-start -->
> **命題（中央差分の切断誤差と観測誤差）**  
> $x\in C^3([t-h,t+h])$、$|x^{(3)}(s)|\le M$ とする。観測値 $z_\pm=x(t\pm h)+\eta_\pm$ が $|\eta_\pm|\le\delta$ を満たすとき、

$$
\left|\frac{z_+-z_-}{2h}-x'(t)\right|
\le\frac{Mh^2}{6}+\frac{\delta}{h}
$$

> が成り立つ。$M,\delta\ge0$、$h>0$ とする。
<!-- formal-statement-end -->

**証明の見取り図。** $t$ を中心に左右の Taylor 展開を作り、二次項を引き算で相殺する。残る三次の項と二つの観測誤差を別々に抑える。

<!-- proof-start -->
### 証明

Taylor の定理を点 $t$、次数 $2$、評価点 $t+h$ と $t-h$ に適用すると、それぞれ区間内の点 $c_+,c_-$ が存在して

$$
\begin{aligned}
x(t+h)&=x(t)+hx'(t)+\frac{h^2}{2}x''(t)
 +\frac{h^3}{6}x^{(3)}(c_+),\\
x(t-h)&=x(t)-hx'(t)+\frac{h^2}{2}x''(t)
 -\frac{h^3}{6}x^{(3)}(c_-).
\end{aligned}
$$

差を $2h$ で割ると

$$
D_hx(t)-x'(t)
=\frac{h^2}{12}\bigl(x^{(3)}(c_+)+x^{(3)}(c_-)\bigr),
$$

よって絶対値は $Mh^2/6$ 以下である。一方、観測値による差分と $D_hx(t)$ の差は $(\eta_+-\eta_-)/(2h)$ で、絶対値は $(|\eta_+|+|\eta_-|)/(2h)\le\delta/h$。三角不等式で二つを足す。
<!-- proof-end -->

$h$ を小さくすると $Mh^2/6$ は減るが $\delta/h$ は増える。たとえば $x(t)=t^3$、$t=0$ の切断誤差は $h^2$（$M=6$）であり、誤差を $\eta_+=\delta,\eta_-=-\delta$ とすると差分は $h^2+\delta/h$ となる。この例では二つの誤差が実際に加算される。

## 5. Koopman：状態でなく観測関数の時間変化を見る

SINDy がベクトル場 $f$ の係数を推定するのに対し、Koopman の考え方は、状態から読める量（観測関数）が時間発展でどう変わるかに注目する。先に [一段数値更新写像](../PML1-20/index.md#def-pml1-20-one-step) と同じ形の状態写像 $F:D\to D$ を与える。これは正確な時間 $h$ の流れでも、実際に採用した離散更新でもよいが、どちらを選んだかは区別する。

<a id="def-pml1-21-koopman"></a>

<!-- formal-statement-start -->
> **定義（状態写像に対する Koopman 作用素）**  
> 集合 $D$ 上の写像 $F:D\to D$ を固定し、$D$ 上の実数値関数全体を考える。関数 $g:D\to\mathbb R$ へ

$$
(K_Fg)(x)=g(F(x)),\qquad x\in D
$$

> を対応させる写像 $K_F$ を Koopman 作用素という。$K_F$ は関数 $g$ に関して線形である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml1-21-koopman -->
**定義の確認**。 $D=\mathbb R$、$F(x)=ax$（$a\in\mathbb R$）、$g_1(x)=1$、$g_2(x)=x$ とする。$F(D)\subset D$ が成立し、

$$
K_Fg_1(x)=1,\qquad K_Fg_2(x)=ax.
$$

任意の実数 $b,c$ で $K_F(bg_1+cg_2)(x)=b+cax=bK_Fg_1(x)+cK_Fg_2(x)$ と直接確かめられる。
<!-- definition-example-end -->

有限辞書が時間発展後にも同じ関数の張る空間に戻るなら、無限に多い観測関数を扱う代わりに行列を使える。何を行列の列とするかを確認するため、辞書の各成分 $\phi_j(F(x))$ を、元の $\phi_\ell(x)$ の線形結合として表す。

<a id="def-pml1-21-koopman-matrix"></a>

<!-- formal-statement-start -->
> **定義（Koopman 不変な有限辞書と近似行列）**  
> $F:D\to D$ と線形独立な辞書関数 $\phi_1,\ldots,\phi_p:D\to\mathbb R$ を与える。辞書の張る関数空間 $V$ が $K_FV\subset V$ を満たすとき、$V$ を Koopman 不変という。この場合、ただ一つの行列 $B\in\mathbb R^{p\times p}$ が存在して

$$
\phi(F(x))^{\mathsf T}=\phi(x)^{\mathsf T}B
\qquad(x\in D)
$$

> を満たす。$N$ 個の観測対 $(x_i,x_i^+)$ だけを使う場合は、$N\times p$ 行列

$$
\Theta_{ij}=\phi_j(x_i),\qquad
Z_{ij}=\phi_j(x_i^+)
$$

> に対する $\|\Theta B-Z\|_F^2$ の最小二乗解を有限データによる Koopman 行列近似とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml1-21-koopman-matrix -->
**定義の確認**。 $F(x)=ax$、$\phi(x)=(1,x)^{\mathsf T}$ なら

$$
\phi(F(x))^{\mathsf T}=(1,ax)
=(1,x)\begin{pmatrix}1&0\\0&a\end{pmatrix}.
$$

従って $B=\operatorname{diag}(1,a)$ がすべての $x\in\mathbb R$ で成立し、$V=\operatorname{span}\{1,x\}$ は不変である。観測行列が列フルランクなら、観測対からもこの $B$ を一意に復元できる。
<!-- definition-example-end -->

<a id="prop-pml1-21-koopman-closure"></a>

<!-- formal-statement-start -->
> **命題（有限辞書の閉包判定と有限標本の限界）**  
> $F:D\to D$ と線形独立な $\phi_1,\ldots,\phi_p$ に対し、$V=\operatorname{span}\{\phi_j\}$ が Koopman 不変であるための必要十分条件は、各 $\phi_j\circ F$ が $V$ に属することである。有限の観測対で $\Theta B=Z$ が成立しても、この条件が $D$ 全体で成立するとは限らない。
<!-- formal-statement-end -->

**証明の見取り図。** 関数の線形結合に $K_F$ を適用して必要十分性を確認する。後半は有限点では一致するが、点の外では異なる二つの写像を作る。

<!-- proof-start -->
### 証明

$V$ が不変なら、各基底関数 $\phi_j\in V$ に $K_F$ を適用した $\phi_j\circ F$ も $V$ に属する。逆に全 $j$ で $\phi_j\circ F\in V$ なら、任意の $g=\sum_jc_j\phi_j\in V$ に対し

$$
K_Fg=\sum_jc_j(\phi_j\circ F)\in V
$$

なので不変である。

有限標本については $D=\mathbb R$、$F(x)=x^2$、$V=\operatorname{span}\{1,x\}$ とする。標本 $x=0,1$ では $F(x)=x$ なので $B=I_2$ が $\Theta B=Z$ を満たし、さらに $\Theta=\begin{pmatrix}1&0\\1&1\end{pmatrix}$ はフルランクである。しかし $\phi_2\circ F=x^2$ は $V$ に属さない。実際、$x=2$ では行列 $B=I_2$ による予測は $2$、真の像は $4$ となる。
<!-- proof-end -->

連続時間の $\dot x=-x$ を**正確に**時間 $h>0$ 進めた写像は $F_h(x)=e^{-h}x$ なので、先ほどの不変辞書では $B_h=\operatorname{diag}(1,e^{-h})$ となる。一方、陽的 Euler の刻み $h$ では $F_h^{\mathrm E}(x)=(1-h)x$ で $B_h^{\mathrm E}=\operatorname{diag}(1,1-h)$。同じ辞書でも**何の時間発展を推定するか**で係数が違う。[離散更新と連続保存の区別](../PML1-20/index.md#prop-pml1-20-explicit-drift)と同様の注意が必要である。

## 6. 係数が合っても軌道はどこでずれるか

モデルの右辺 $\widehat f$ が真の $f$ に近いことと、予測軌道 $\widehat x(t)$ が真の $x(t)$ に近いことをつなぐには、動力学の安定性が必要である。以下の評価は、二つの軌道が同じ領域に留まり、そこで真のベクトル場の変化率を抑えられる場合に限って成立する。

<a id="prop-pml1-21-trajectory-bound"></a>

<!-- formal-statement-start -->
> **命題（ベクトル場誤差から有限時間の軌道誤差へ）**  
> $D\subset\mathbb R^d$ と $T>0$、連続関数 $f,\widehat f:D\to\mathbb R^d$ を与える。$f$ が $D$ 上で Lipschitz 定数 $L\ge0$ を持ち、$\|f(z)-\widehat f(z)\|_2\le\varepsilon$ が全 $z\in D$ で成立するとする。$C^1$ 軌道 $x,\widehat x:[0,T]\to D$ が

$$
\dot x=f(x),\quad\dot{\widehat x}=\widehat f(\widehat x),
\quad x(0)=\widehat x(0)
$$

> を満たすなら、$0\le t\le T$ に対して

$$
\|x(t)-\widehat x(t)\|_2
\le
\begin{cases}
\varepsilon(e^{Lt}-1)/L,&L>0,\\
\varepsilon t,&L=0.
\end{cases}
$$
<!-- formal-statement-end -->

**証明の見取り図。** 誤差を微分すると、状態の違いによる $L$ 倍とモデルの違いによる $\varepsilon$ に分かれる。積分因子 $e^{-Lt}$ で誤差の増幅を取り除く。

<!-- proof-start -->
### 証明

$e(t)=x(t)-\widehat x(t)$ と置き、右辺に $f(\widehat x)$ を加減すると

$$
\begin{aligned}
\|e'(t)\|_2
&=\|f(x(t))-\widehat f(\widehat x(t))\|_2\\
&\le\|f(x(t))-f(\widehat x(t))\|_2
 +\|f(\widehat x(t))-\widehat f(\widehat x(t))\|_2\\
&\le L\|e(t)\|_2+\varepsilon.
\end{aligned}
$$

$u(t)=\|e(t)\|_2$ は絶対連続で、ほとんどすべての $t$ で $u'(t)\le\|e'(t)\|_2$。$u(0)=0$ だから積分因子を掛けて

$$
\frac d{dt}\bigl(e^{-Lt}u(t)\bigr)
\le\varepsilon e^{-Lt}.
$$

$0$ から $t$ まで積分すれば $e^{-Lt}u(t)\le\varepsilon\int_0^te^{-Ls}\,ds$ となる。$L>0$ では積分は $(1-e^{-Lt})/L$、$L=0$ では $t$ なので、主張を得る。
<!-- proof-end -->

この結果は **$D$ 全体での一様なモデル誤差**を要求する。訓練点で $\Theta\Xi=Y$ という等式が成立するだけでは、未観測点の $\varepsilon$ を制御できない。

## 7. 観測点の一致は保存則を証明しない

[HNN のエネルギー保存定理](../PML1-18/index.md#thm-pml1-18-energy)は、右辺が $J\nabla H$ の反対称構造を持つことから成立した。有限辞書による推定値は、観測誤差ゼロであってもこの構造を持つとは限らない。

具体的に、状態を $(q,p)\in\mathbb R^2$ とし、真の調和振動子の右辺を $f(q,p)=(p,-q)$、エネルギーを $H(q,p)=(q^2+p^2)/2$ とする。未知の $\alpha\in\mathbb R$ に対して候補を

$$
f_\alpha(q,p)=(p,\,-q+\alpha(q^2-1))
$$

と置く。観測状態を $q=1$ と $q=-1$ に限れば、どの $p$ でも $f_\alpha=f$ なので、どの $\alpha$ も速度観測に完全に一致する。しかし任意のモデル軌道上で

$$
\begin{aligned}
\frac{dH}{dt}
&=q\dot q+p\dot p\\
&=qp+p\{-q+\alpha(q^2-1)\}
=\alpha p(q^2-1).
\end{aligned}
$$

$\alpha\ne0$ なら $p(q^2-1)\ne0$ となる状態で元の $H$ は保存されない。観測点の一致から、未観測点の動力学や物理的構造は回復できない。

データを増やす方法と、モデルに対称性・保存構造を組み込む方法は異なる。次の PML1-22 では、同一データと初期値で通常の NN、HNN、LNN を比べ、構造の利点と近似の欠点を検証する。

## 8. 手元で再現する小さな同定実験

次の Python では、$x=-1,0,1$ の速度データ $y=-x$ から、辞書 $(x,x^2)$ の最小二乗係数を計算する。外部ライブラリを使わず $2\times2$ の正規方程式を解く。次に同じ辞書を $x=1$ だけで観測した場合の非一意性も表示する。

~~~python
xs = [-1.0, 0.0, 1.0]
ys = [-x for x in xs]
rows = [(x, x*x) for x in xs]
g11 = sum(a*a for a, b in rows)
g12 = sum(a*b for a, b in rows)
g22 = sum(b*b for a, b in rows)
r1 = sum(a*y for (a, b), y in zip(rows, ys))
r2 = sum(b*y for (a, b), y in zip(rows, ys))
det = g11*g22 - g12*g12
assert det > 0
xi1 = (g22*r1 - g12*r2)/det
xi2 = (-g12*r1 + g11*r2)/det
print("normal", (g11, g12, g22), (r1, r2))
print("coefficients", (xi1, xi2))
print("residuals", [a*xi1+b*xi2-y for (a, b), y in zip(rows, ys)])
print("single-point alternatives",
      [(-1.0, 0.0), (0.0, -1.0)])
print("off-sample predictions at x=2",
      [-1.0*2, -1.0*4])
~~~

期待される係数は $(-1,0)$、正規方程式の左辺行列は $\operatorname{diag}(2,2)$、残差はすべてゼロである。一点だけでは二つの別モデルが同じ観測値を与えるが、$x=2$ での速度予測は $-2$ と $-4$ に分かれる。

## 9. 演習 Level A

<a id="ex-pml1-21-a01"></a>

### PML1-21-A01 辞書行列を自分で組む
- Level: A

一次元状態の辞書を $\phi(x)=(1,x,x^2)^{\mathsf T}$ とし、状態 $x_1=-1,x_2=2$、速度 $y_1=3,y_2=-3$ を観測した。$\Theta,Y$ の寸法と成分を求めよ。$\Xi=(1,-2,0)^{\mathsf T}$ の残差を計算せよ。

<!-- solution-start -->
#### 詳細解答

辞書は三成分、観測は二点なので $\Theta$ は $2\times3$、$Y$ は $2\times1$。各行を $\phi(x_i)^{\mathsf T}$ として

$$
\Theta=\begin{pmatrix}1&-1&1\\1&2&4\end{pmatrix},
\quad Y=\begin{pmatrix}3\\-3\end{pmatrix}.
$$

乗算すると $\Theta\Xi=(1+2,\;1-4)^{\mathsf T}=(3,-3)^{\mathsf T}$。従って残差 $\Theta\Xi-Y=(0,0)^{\mathsf T}$、二乗損失 $0$ である。$\Theta$ の列数が行数より大きいので、この結果だけで係数は一意とは言えない。
<!-- solution-end -->

<a id="ex-pml1-21-a02"></a>

### PML1-21-A02 一点の速度は係数を分けない
- Level: A

辞書 $\phi(x)=(x,x^2)^{\mathsf T}$ で、状態 $x=2$ の速度 $y=6$ だけを測った。すべての零残差係数を一つの実数パラメータで表し、異なる二解を挙げよ。

<!-- solution-start -->
#### 詳細解答

行列の一行は $(2,4)$ だから条件は $2\xi_1+4\xi_2=6$。$\xi_2=s$ と置くと $\xi_1=3-2s$ であり、

$$
\Xi=(3-2s,s)^{\mathsf T},\qquad s\in\mathbb R.
$$

$s=0$ なら $(3,0)^{\mathsf T}$、$s=1$ なら $(1,1)^{\mathsf T}$ で、どちらも観測値 $6$ を返す。辞書行列は $1\times2$ で列フルランクにならない。
<!-- solution-end -->

<a id="ex-pml1-21-a03"></a>

### PML1-21-A03 中央差分の二つの誤差
- Level: A

$x(t)=t^3$ を $t=0$ で微分したい。$h>0$ とし、左右の位置にそれぞれ $\delta,-\delta$（$\delta\ge0$）の測定誤差がある。中央差分推定値、真の微分、絶対誤差を求めよ。

<!-- solution-start -->
#### 詳細解答

観測値は $z_+=h^3+\delta$ と $z_-=-h^3-\delta$。中央差分は

$$
\frac{z_+-z_-}{2h}
=\frac{2h^3+2\delta}{2h}=h^2+\frac{\delta}{h}.
$$

一方 $x'(t)=3t^2$ なので $x'(0)=0$。従って絶対誤差は $h^2+\delta/h$ となる。[中央差分誤差の命題](#prop-pml1-21-difference-error)に $M=6$ を入れた上界と一致する。
<!-- solution-end -->

<a id="ex-pml1-21-a04"></a>

### PML1-21-A04 線形写像の Koopman 行列
- Level: A

$F(x)=-2x$、辞書 $\phi(x)=(1,x)^{\mathsf T}$ とする。$K_F1$、$K_Fx$、辞書の行列 $B$ と、その二乗 $B^2$ を求めよ。

<!-- solution-start -->
#### 詳細解答

定義から $(K_F1)(x)=1(F(x))=1$、$(K_Fx)(x)=F(x)=-2x$。従って

$$
(1,F(x))=(1,x)
\begin{pmatrix}1&0\\0&-2\end{pmatrix},
\quad
B=\begin{pmatrix}1&0\\0&-2\end{pmatrix}.
$$

二回の時間更新では $F(F(x))=4x$ なので、行列も $B^2=\operatorname{diag}(1,4)$。これは $K_F^2g(x)=g(F(F(x)))$ と一致する。
<!-- solution-end -->

<a id="ex-pml1-21-a05"></a>

### PML1-21-A05 観測点と保存量
- Level: A

状態 $(q,p)\in\mathbb R^2$ に対し $H=(q^2+p^2)/2$、モデル $f_\alpha=(p,-q+\alpha(q^2-1))$ とする。$q=1,-1$ で $f_\alpha$ が $f_0$ と等しいことを確認し、$(q,p)=(0,1)$ における $dH/dt$ を求めよ。

<!-- solution-start -->
#### 詳細解答

$q=\pm1$ では $q^2-1=0$ なので第二成分はともに $-q$。エネルギーの連鎖律により

$$
\frac{dH}{dt}=q p+p[-q+\alpha(q^2-1)]
=\alpha p(q^2-1).
$$

$(q,p)=(0,1)$ では $dH/dt=-\alpha$。よって $\alpha\ne0$ ならこの点で保存則が破れる。観測点での速度一致が、領域全体での構造一致を含意しない。
<!-- solution-end -->

## 10. 演習 Level B

<a id="ex-pml1-21-b01"></a>

### PML1-21-B01 二点から回復し、雑音の影響も計算する
- Level: B

一次元辞書 $(x,x^2)$ を用い、状態 $(-1,1)$ で速度 $(1,-1+\eta)$（$\eta\in\mathbb R$）を観測した。最小二乗係数を求め、真の $f_\ast(x)=-x$ との差を $x=2$ で求めよ。二点の残差ゼロから真の関数一致を結論できるか。

<!-- solution-start -->
#### 詳細解答

辞書行列は $\Theta=\begin{pmatrix}-1&1\\1&1\end{pmatrix}$、その行列式は $-2\ne0$。係数を $(a,b)^{\mathsf T}$ とすると

$$
-a+b=1,\qquad a+b=-1+\eta.
$$

二式を加えて $2b=\eta$、差を取って $2a=-2+\eta$ なので

$$
a=-1+\frac{\eta}{2},\qquad b=\frac{\eta}{2}.
$$

二点とも正確に補間するため残差はゼロ。一方 $x=2$ では

$$
f_{\widehat\Xi}(2)
=2a+4b=-2+3\eta,\qquad f_\ast(2)=-2.
$$

誤差は $3\eta$。$\eta\ne0$ なら未観測点で異なるし、$\eta=0$ でも辞書に入っていない別の関数が観測二点に一致する可能性は残る。
<!-- solution-end -->

<a id="ex-pml1-21-b02"></a>

### PML1-21-B02 差分刻みの最適な釣合い
- Level: B

$M>0,\delta>0$ が既知として、中央差分の誤差上界 $E(h)=Mh^2/6+\delta/h$（$h>0$）を最小化する刻み幅と、そのときの上界を導け。

<!-- solution-start -->
#### 詳細解答

微分すると

$$
E'(h)=\frac{M}{3}h-\frac{\delta}{h^2}.
$$

$E'(h)=0$ は $Mh^3/3=\delta$ と同値なので、唯一の正の停留点は $h_\ast=(3\delta/M)^{1/3}$。二階微分は $E''(h)=M/3+2\delta/h^3>0$ であり、$h\downarrow0$ と $h\to\infty$ で $E(h)\to\infty$ だから全域での一意な最小点である。停留点の関係 $\delta/h_\ast=Mh_\ast^2/3$ を代入すれば

$$
E(h_\ast)=\frac{Mh_\ast^2}{6}+\frac{Mh_\ast^2}{3}
=\frac{M}{2}\left(\frac{3\delta}{M}\right)^{2/3}.
$$

雑音が正のとき $h$ を無制限に小さくするのは最適でない。
<!-- solution-end -->

<a id="ex-pml1-21-b03"></a>

### PML1-21-B03 Koopman の閉包と標本上の一致
- Level: B

$F(x)=x^2$、$D=\mathbb R$、$V=\operatorname{span}\{1,x\}$ とする。観測対を $(0,0),(1,1)$ としたとき、観測上の行列 $B$ を求めよ。$V$ が Koopman 不変か判定し、$x=2$ での行列予測と真の写像を比較せよ。

<!-- solution-start -->
#### 詳細解答

$\phi(x)=(1,x)^{\mathsf T}$ で

$$
\Theta=\begin{pmatrix}1&0\\1&1\end{pmatrix},
\quad Z=\begin{pmatrix}1&0\\1&1\end{pmatrix}.
$$

$\det\Theta=1$ なので $\Theta B=Z$ の唯一解は $B=I_2$。しかし $K_Fx=x^2$。もし $x^2=a+bx$ が全実数で成り立つなら、$x=0$ から $a=0$、$x=1$ から $b=1$、$x=2$ から $4=2$ となり矛盾する。よって $K_FV\not\subset V$ である。行列の $x=2$ での予測は $2$、真の $F(2)$ は $4$。標本上の閉包と関数空間上の閉包は異なる。
<!-- solution-end -->

<a id="ex-pml1-21-b04"></a>

### PML1-21-B04 一様な右辺誤差と軌道誤差
- Level: B

真の常微分方程式 $\dot x=-x$、モデル $\dot{\widehat x}=-\widehat x+\varepsilon$（$\varepsilon>0$）に同じ初期値 $x(0)=\widehat x(0)=a$ を与える。両解とその差を求め、[軌道誤差評価](#prop-pml1-21-trajectory-bound)の上界と比較せよ。

<!-- solution-start -->
#### 詳細解答

真の解は $x(t)=ae^{-t}$。モデル式を $\widehat x'+\widehat x=\varepsilon$ とし、両辺に $e^t$ を掛けると

$$
\frac{d}{dt}(e^t\widehat x(t))=\varepsilon e^t.
$$

$0$ から $t$ まで積分して $e^t\widehat x(t)-a=\varepsilon(e^t-1)$、ゆえに

$$
\widehat x(t)=ae^{-t}+\varepsilon(1-e^{-t}).
$$

従って $|\widehat x(t)-x(t)|=\varepsilon(1-e^{-t})$。真の $f(x)=-x$ は $L=1$ の Lipschitz 条件を満たし、全実数で $|f-\widehat f|=\varepsilon$。評価命題の上界は $\varepsilon(e^t-1)$ なので、$t\ge0$ に対して $\varepsilon(1-e^{-t})\le\varepsilon(e^t-1)$ と整合する。一般の上界は、この安定な例では鋭くない。
<!-- solution-end -->

## 11. 演習 Level C

<a id="ex-pml1-21-c01"></a>

### PML1-21-C01 同定・識別性・作用素・予測を一続きに判定する
- Level: C

真の一次元系を $\dot x=-x$ とし、SINDy の辞書は $\phi(x)=(x,x^2)^{\mathsf T}$ とする。位置 $x=-1,1$ における速度の観測値はそれぞれ $1,-1+\eta$（$\eta$ は既知の実数）とする。別に離散観測対 $(x,x^+)=(0,0),(1,a)$（$0<a<1$）がある。次に答えよ。

1. SINDy の係数を求め、$x=2$ での真の速度とのずれを示せ。
2. 同じ辞書で $x=1$ の速度観測しかなければ係数を一意に同定できないことを示せ。
3. 離散観測対に辞書 $(1,x)$ を用いるとき、Koopman 近似行列を求めよ。得られた行列から全実数上の真の写像が決まるか、反例を与えよ。
4. 離散観測が真の連続系を間隔 $h>0$ で正確に標本化したものだと**追加仮定**した場合、$a$ と $h$ の関係を求め、陽的 Euler 法の係数と比較せよ。
5. なぜ速度残差、係数誤差、未観測点の予測誤差、時間積分誤差が異なる検査なのかまとめよ。

<!-- solution-start -->
#### 詳細解答

**(1)** 辞書行列と速度列は

$$
\Theta=\begin{pmatrix}-1&1\\1&1\end{pmatrix},
\qquad Y=\begin{pmatrix}1\\-1+\eta\end{pmatrix}.
$$

$\det\Theta=-2$ なので、$\Theta(a_1,a_2)^{\mathsf T}=Y$ は一意。連立式 $-a_1+a_2=1$、$a_1+a_2=-1+\eta$ を加減して

$$
a_1=-1+\eta/2,\qquad a_2=\eta/2.
$$

従って $f_{\widehat\Xi}(2)=2a_1+4a_2=-2+3\eta$。真の $f_\ast(2)=-2$ との差は $3\eta$。訓練速度残差はゼロだが、$\eta\ne0$ なら真の係数 $(-1,0)$ からずれる。

**(2)** 一点 $x=1$ なら $a_1+a_2=-1+\eta$ しか分からない。任意の $s\in\mathbb R$ について $(a_1,a_2)=(-1+\eta-s,s)$ が一致し、観測行列の階数は $1<2$。他方、二点の場合は階数 $2$ で一意である。観測点の配置が識別性を変える。

**(3)** $\psi(x)=(1,x)^{\mathsf T}$ を使うと

$$
\Theta_K=\begin{pmatrix}1&0\\1&1\end{pmatrix},
\quad Z_K=\begin{pmatrix}1&0\\1&a\end{pmatrix}.
$$

$\Theta_K$ は可逆なので $\Theta_K B=Z_K$ を解けば $B=\operatorname{diag}(1,a)$。しかし $F_1(x)=ax$ と $F_2(x)=ax+c\,x(x-1)$ は任意の $c\ne0$ に対して $x=0,1$ の観測対に一致する一方、$x=2$ では $2a$ と $2a+2c$ を返す。したがって有限標本だけでは全実数上の真の写像は決まらない。

**(4)** 真の $\dot x=-x$ は積分因子 $e^t$ を用いて $\frac d{dt}(e^t x)=0$ を満たす。よって $x(t+h)=e^{-h}x(t)$ となり、$a=e^{-h}$。陽的 Euler 法を同じ微分方程式に刻み $h$ で使うと $x^+=(1-h)x$ だから係数は $1-h$。一般に $e^{-h}\ne1-h$（$h>0$）。これらは連続系の正確な時間発展と数値一段写像の差である。

**(5)** (1) では残差ゼロでも雑音 $\eta$ によって係数誤差と未観測点の誤差が生じた。(2) ではデータ不足で係数自体が一意にならなかった。(3) は有限辞書の観測上の適合が全域の Koopman 不変性を示さない反例である。(4) の $e^{-h}$ と $1-h$ の差は同じ運動方程式でも積分法によって生じる。従って少なくともこれら四種類を別々に報告する。
<!-- solution-end -->

## 12. 次の講義へ

有限辞書は同定問題を行列計算にするが、列フルランクでなければ係数の一意性を得られない。列フルランクでも微分推定誤差・辞書の表現不足・訓練点外での誤差は残る。Koopman の有限行列が観測点で合っても、辞書の関数空間が本当に閉じているとは限らない。次の PML1-22 では、物理構造を固定する学習器が、これらの欠点をどの条件で減らすかを同一条件で比較する。
