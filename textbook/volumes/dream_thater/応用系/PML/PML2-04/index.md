# PML2-04 計算された値の何を「誤差」と呼ぶか

## 1. どの値を、何と、どこで比較しているのか

[前講の差分法と有限要素法](../PML2-03/index.md#def-pml2-03-fd)は、同じPoisson問題を有限個の数へ置き換えた。真の解と格子点で完全一致する数値解があっても、区間内の折れ線は真の曲線と異なった。この違いを定量的に扱うには、先に「何を比較するか」を固定する必要がある。

本講でも

$$
-u''(x)=f(x)\quad(0<x<1),\qquad u(0)=u(1)=0
$$

を用いる。等間隔格子は $n\ge2$、$h=1/n$、$x_j=jh$（$0\le j\le n$）とし、差分行列 $A_h=-D_h^2$ は内部点 $j=1,\ldots,n-1$ に作用する。端点の近似値と真値は零に固定する。$u$ は比較の基準となる正確な解で、数値計算の中で常に利用できるとは限らない。

ここで $u'(x)=du/dx$ と $u''(x)=d^2u/dx^2$ は位置 $x$ に関する微分であり、後で使う $u^{(4)}=d^4u/dx^4$ も同じ変数で微分する。一方、[前講で定義した三点差分](../PML2-03/index.md#def-pml2-03-fd)の $D_h^2$ は格子点列へ作用する差分演算子で、$h$ に関する微分ではない。

まず二つの値の差を「誤差」と呼ぶとしても、対象が格子点列か連続関数かで数値は変わる。ノルムとは差の大きさを一つの非負実数で測る規則である。有限列の最大絶対値と、区間上の関数の二乗積分を、本講で使う測定規約として導入する。

<a id="def-pml2-04-error-metrics"></a>

<!-- formal-statement-start -->
> **定義（誤差の測定対象とノルム）**  
> $u$ を連続な真の解、$z=(z_0,\ldots,z_n)$ を端点零の格子点近似、$v$ を連続関数近似とする。格子点最大誤差、関数の $L^2$ 誤差、エネルギー半ノルム誤差をそれぞれ

$$
E_{\rm grid}(u,z)=\max_{0\le j\le n}|u(x_j)-z_j|,
$$

$$
E_{L^2}(u,v)=\left(\int_0^1|u(x)-v(x)|^2\,dx\right)^{1/2},
\qquad
E_{\rm en}(u,v)=\left(\int_0^1|u'(x)-v'(x)|^2\,dx\right)^{1/2}
$$

> と定める。後二者は $u,v\in H^1(0,1)$ で定義し、最後は差の導関数の半ノルムである。格子列 $w$ の最大ノルムを $\|w\|_{\infty,h}=\max_{1\le j\le n-1}|w_j|$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml2-04-error-metrics -->
**定義の確認**。 $u(x)=x(1-x)$、$n=2$ では、[定数外力の節点一致と区間内誤差](../PML2-03/index.md#thm-pml2-03-quadratic)から、格子点列 $z_j=u(x_j)$ と区分一次Galerkin解 $u_h$ がある。端点と中央点を直接比較すると $E_{\rm grid}(u,z)=0$。

この例は $f=2$、零端点、区分一次要素、厳密荷重積分という前講の定理の仮定を満たし、$u_h$ は $u$ の節点補間（各区間の弦）である。各区間 $[x_j,x_{j+1}]$ で $t=x-x_j\in[0,h]$ と置けば、曲線と弦の差は $u-u_h=t(h-t)$、その $x$ に関する導関数の差は $u'-u_h'=h-2t$。よって

$$
\begin{aligned}
E_{L^2}(u,u_h)^2
&=n\int_0^h t^2(h-t)^2\,dt
=n\frac{h^5}{30}=\frac{h^4}{30},\\
E_{\rm en}(u,u_h)^2
&=n\int_0^h(h-2t)^2\,dt
=n\frac{h^3}{3}=\frac{h^2}{3}.
\end{aligned}
$$

平方根を取れば $E_{L^2}(u,u_h)=h^2/\sqrt{30}=1/(4\sqrt{30})$、$E_{\rm en}(u,u_h)=h/\sqrt3=1/(2\sqrt3)$ となる。格子上では節点一致を判定し、連続関数については差を積分して判定した。

> 最初は格子列、残りは連続関数を比較した。同じ計算結果でも測定対象の違いで誤差が零と非零に分かれる。
<!-- definition-example-end -->

関数の $L^2$ 誤差やエネルギー半ノルムは、[連続弱形式とエネルギー評価](../PML2-01/index.md#thm-pml2-01-energy)で用いたものと同じである。どの測定規約を選んだかを記載せずに「誤差が小さい」とだけ報告してはいけない。

## 2. 計算のどの段階でずれるのか

差分方程式を計算機で解く過程には、真の関数を格子上の方程式へ置き換える段階、入力データを作る段階、連立方程式を有限精度・有限反復で解く段階がある。これらに対応する量を分ける。

正しい右辺の格子列を $b_j=f(x_j)$、実際に入力した右辺を $\widehat b_j$ とする。$u^I_j=u(x_j)$ は真値を格子に並べた列であり、理想的な差分解 $z$、入力を変更した差分解 $\widehat z$、実際の計算値 $\widetilde z$ を

$$
A_h z=b,\qquad A_h\widehat z=\widehat b,\qquad
\widetilde z_0=\widetilde z_n=0
$$

で区別する。$A_h$ は[差分解の一意性の議論](../PML2-03/index.md#prop-pml2-03-dmp)の前に示された二乗和によって可逆なので、$z$ と $\widehat z$ は一意に存在する。

ここで **局所切断誤差**は真値を差分方程式に代入したときのずれ、**計算残差**は計算結果を入力済みの方程式に戻したときのずれである。この二つを一緒にせず定義する。

<a id="def-pml2-04-residual"></a>

<!-- formal-statement-start -->
> **定義（局所切断誤差と計算残差）**  
> $f\in C([0,1])$ の零Dirichlet Poisson問題に古典解 $u\in C^2([0,1])$ があるとする。端点を零に固定した $u^I$ と $\widetilde z$ に対し、内部格子点で

$$
\tau=A_hu^I-b,\qquad
\rho=\widehat b-A_h\widetilde z
$$

> をそれぞれ **局所切断誤差列** と **計算残差列** と呼ぶ。$\widehat b-b$ は入力データの誤差列であり、$\rho$ は真の右辺 $b$ ではなく実際の入力 $\widehat b$ に対する残差である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml2-04-residual -->
**定義の確認**。 $f=2$、$u=x(1-x)$、$n=2$ なら $u^I_1=1/4$、$A_h$ の唯一の成分は $8$。正しい入力を $\widehat b_1=b_1=2$ とし、計算を途中で止めた値を $\widetilde z_1=0$ とすると

$$
\tau_1=8\cdot\frac14-2=0,\qquad
\rho_1=2-8\cdot0=2.
$$

> 真値が格子方程式を満たす（切断誤差零）ことと、未解決の数値計算が方程式を満たす（計算残差零）ことは別条件である。双方をそれぞれの式に代入して確認した。
<!-- definition-example-end -->

この定義は、差分法の **切断誤差**を近似値との直接の差ではなく、真値を離散方程式へ代入した**方程式のずれ**として表す。単位も解の単位と同じとは限らない。

## 3. 三種類のずれを一つの誤差予算へ

次は恒等式を得る。差の途中へ理想的な差分解と、入力誤差付きの理想差分解を足して引く。まず式だけ眺めると、何を小さくすべきか分かる。

<a id="thm-pml2-04-error-budget"></a>

<!-- formal-statement-start -->
> **定理（右辺誤差と計算残差を含む三項誤差分解）**  
> $n\ge2$ の零Dirichlet三点差分行列 $A_h$ と、端点零の格子列 $u^I$、$z$、$\widehat z$、$\widetilde z$ が上記の定義を満たすとする。内部格子点の列について

$$
u^I-\widetilde z
=A_h^{-1}\tau
+A_h^{-1}(b-\widehat b)
+A_h^{-1}\rho.
$$

> したがって、$A_h^{-1}$ が最大ノルムで $\|A_h^{-1}g\|_{\infty,h}\le M_h\|g\|_{\infty,h}$ を満たす場合、

$$
\|u^I-\widetilde z\|_{\infty,h}
\le M_h\bigl(\|\tau\|_{\infty,h}
+\|b-\widehat b\|_{\infty,h}
+\|\rho\|_{\infty,h}\bigr).
$$

<!-- formal-statement-end -->

### 証明の見取り図

三項は順に、方程式を格子へ置き換えたことによるずれ、右辺データのずれ、連立方程式を解ききらなかったずれである。誤差を足し算した等号と、**大きさ**を足す三角不等式を区別する。

<!-- proof-start -->
### 証明

真値と理想離散解の差は、$A_hz=b$ と[切断誤差の定義](#def-pml2-04-residual)より

$$
A_h(u^I-z)=A_hu^I-b=\tau,
\qquad u^I-z=A_h^{-1}\tau.
$$

入力を変えた効果は

$$
A_h(z-\widehat z)=b-\widehat b,
\qquad z-\widehat z=A_h^{-1}(b-\widehat b).
$$

最後に計算残差から

$$
A_h(\widehat z-\widetilde z)
=\widehat b-A_h\widetilde z=\rho,
\qquad
\widehat z-\widetilde z=A_h^{-1}\rho.
$$

これら三式を加えると中間列 $z,\widehat z$ は相殺し、第一の等号になる。最大ノルムの三角不等式を用い、各項に仮定した逆行列評価を適用すると第二の不等式を得る。
<!-- proof-end -->

**等号の各項は符号を持つ。** そのため、異なる誤差がたまたま打ち消し合うことがある。誤差上界は保証を与えるが、測定値が三つの上界の和に等しくなるとは言わない。

## 4. 整合性と安定性は何をつないでいるか

前節の不等式で鍵になるのは、切断誤差が細かい格子で減ることと、逆行列がその誤差を増幅しすぎないことの**二つ**である。前者を整合性、後者を安定性と呼ぶ。格子を細かくすると格子上の近似値と真値の最大差が零へ近づく、という判定も用意する。この章では任意のPDEについてではなく、固定した零Dirichlet三点差分法・最大ノルムという設定に限定して定義する。

ここから格子幅を変えて比較するため、§2 の右辺列 $b$ を $b_h$、理想差分解 $z$ を $z_h$ と書く。下付き添字 $h$ は格子幅への依存を示し、微分を意味しない。$b_h=(f(x_1),\ldots,f(x_{n-1}))$ であり、$h=1/n$ が変わると列の長さ $n-1$ も変わる。

<a id="def-pml2-04-consistency-stability"></a>

<!-- formal-statement-start -->
> **定義（差分法の整合性と安定性）**  
> $h=1/n$、$n\ge2$ の零Dirichlet三点差分行列 $A_h$ と $b_h=(f(x_j))_{j=1}^{n-1}$ を考える。
>
> **整合性**：固定した十分滑らかな古典解 $u$ に対し、次が成り立つこと。

$$
\|A_hu^I-b_h\|_{\infty,h}\to0\qquad(h\to0).
$$

> **最大ノルムでの一様安定性**：各 $A_h$ が可逆で、格子幅に依存しない定数 $M$ が存在し、任意の内部格子列 $g$ について次が成り立つこと。

$$
\|A_h^{-1}g\|_{\infty,h}\le M\|g\|_{\infty,h}.
$$

> **格子点収束**：正しい入力 $b_h$ の理想差分解について、次が成り立つこと。

$$
z_h=A_h^{-1}b_h,\qquad
\|u^I-z_h\|_{\infty,h}\to0\qquad(h\to0).
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml2-04-consistency-stability -->
**定義の確認**。 $u=x(1-x)$ と $f=2$ なら、二次式の二階差分はどの格子でも厳密なので $\tau=0$、整合性が成立する。また任意の内部列 $g$ に対し、$A_hw=g$ を満たす $w$ と障壁関数 $a_j=x_j(1-x_j)/2$ を比較する。一次式と二次式の差分を計算すると

$$
D_h^2(x)=0,\qquad D_h^2(x^2)=2,\qquad
A_ha=-D_h^2\left(\frac{x-x^2}{2}\right)=1.
$$

また $0\le x_j(1-x_j)\le1/4$ から $0\le a_j\le1/8$ となる。$G=\|g\|_{\infty,h}$ とすれば $A_h(Ga\pm w)=G\pm g\ge0$。よって[離散最大値原理](../PML2-03/index.md#prop-pml2-03-dmp)から

$$
|w_j|\le Ga_j\le\frac G8,\qquad
\|A_h^{-1}g\|_{\infty,h}\le\frac18\|g\|_{\infty,h}.
$$

可逆性も、端点零の格子列 $w$ に対して三点差分を展開し、隣接する積をまとめることで確認できる。

$$
h\sum_{j=1}^{n-1}w_j(A_hw)_j
=\frac1h\sum_{j=1}^{n}(w_j-w_{j-1})^2.
$$

$A_hw=0$ なら右辺が零だから隣接差はすべて零となり、$w_0=0$ から $w=0$。$A_h$ は $(n-1)\times(n-1)$ の正方行列で核が零なので可逆である。

> 定義の全右辺・格子幅に依存しない安定定数も確認した。二次解では実際に $z_h=u^I$ なので格子点収束も成立する。
<!-- definition-example-end -->

この差分法は安定定数 $M=1/8$ を持つ。$u\in C^4([0,1])$ の場合、[前講のTaylor剰余評価](../PML2-03/index.md#thm-pml2-03-fd-error)から

$$
\|\tau\|_{\infty,h}\le\frac{h^2}{12}\|u^{(4)}\|_\infty
$$

だから、整合性は二次の速さで成立する。ここでの「二次」は格子幅を半分にすると上界が概ね四分の一になるという意味である。

<a id="thm-pml2-04-convergence"></a>

<!-- formal-statement-start -->
> **定理（整合性と安定性による二次精度の誤差評価）**  
> $f\in C([0,1])$ の零Dirichlet Poisson問題に $u\in C^4([0,1])$ の古典解があるとする。$n\ge2$ の等間隔三点差分法に、任意の入力列 $\widehat b$ と端点零の計算値 $\widetilde z$ を用い、$\rho=\widehat b-A_h\widetilde z$ とする。このとき

$$
\|u^I-\widetilde z\|_{\infty,h}
\le\frac{h^2}{96}\|u^{(4)}\|_\infty
+\frac18\|b-\widehat b\|_{\infty,h}
+\frac18\|\rho\|_{\infty,h}.
$$

> 特に $\widehat b=b$、$\rho=0$ なら理想差分解は二次精度で格子点収束する。さらに入力誤差と残差の最大ノルムが $h\to0$ で零に向かえば、計算値も格子点収束する。
<!-- formal-statement-end -->

### 証明の見取り図

[前講の離散最大値原理](../PML2-03/index.md#prop-pml2-03-dmp)で残差から解への増幅を固定し、[Taylor剰余による局所切断誤差](../PML2-03/index.md#thm-pml2-03-fd-error)を代入する。逆作用素を評価しないまま切断誤差だけを小さくしても、全体の誤差評価は完成しない。

<!-- proof-start -->
### 証明

$A_h$ の可逆性は[前講の離散エネルギー計算](../PML2-03/index.md#prop-pml2-03-dmp)の前に示したとおり。$u\in C^4$ より、各内部点 $x_j$ の両側 $x_j\pm h$ でのTaylor展開の偶数次を足すと

$$
u(x_j+h)-2u(x_j)+u(x_j-h)
=h^2u''(x_j)+R_++R_-,
$$

$$
|R_+|+|R_-|
\le\frac{h^4}{12}\|u^{(4)}\|_\infty.
$$

$-u''=f$ と $A_h=-D_h^2$ を代入して $\|\tau\|_{\infty,h}\le h^2\|u^{(4)}\|_\infty/12$ を得る。

次に $a_j=x_j(1-x_j)/2$ と置くと $A_ha=1$、$0\le a_j\le1/8$ である。任意の $g$ に対する $A_hw=g$ を考え、$G=\|g\|_{\infty,h}$ とすると $A_h(Ga\pm w)=G\pm g\ge0$。端点が零なので[離散最大値原理](../PML2-03/index.md#prop-pml2-03-dmp)より $\|w\|_{\infty,h}\le G/8$。この $M=1/8$ を[三項誤差分解](#thm-pml2-04-error-budget)へ代入して

$$
\begin{aligned}
\|u^I-\widetilde z\|_{\infty,h}
&\le\frac18\left(\frac{h^2}{12}\|u^{(4)}\|_\infty
+\|b-\widehat b\|_{\infty,h}+\|\rho\|_{\infty,h}\right)\\
&=\frac{h^2}{96}\|u^{(4)}\|_\infty
+\frac18\|b-\widehat b\|_{\infty,h}
+\frac18\|\rho\|_{\infty,h}.
\end{aligned}
$$

$u$ は固定しているので $\|u^{(4)}\|_\infty$ は $h$ に依存しない。各右辺項が零へ向かう場合に収束が従う。
<!-- proof-end -->

**境界・ノルム・正則性が必要な理由。** 最大値原理は端点が零だから適用できた。$u\in C^4$ はTaylor剰余を二次で評価する条件である。結論は格子点上の最大誤差であり、区間内の補間関数の $L^2$ 誤差を自動的に評価したものではない。

**安定性を失う反例。** 実数方程式 $\varepsilon x=\varepsilon$（$0<\varepsilon<1$）の真の解は $x=1$ だが、計算値 $\widetilde x=0$ の残差は $\varepsilon$。$\varepsilon\to0$ で残差は零へ向かうのに解の誤差は常に $1$ である。逆写像の増幅率が $1/\varepsilon$ と発散し、上の証明で使った **格子幅に独立な安定定数**に相当するものが失われたからである。

## 5. 格子点と関数の誤差は直交することがある

差分の三項分解は点列に関するものだった。有限要素法では、真解 $u$、有限要素空間内の厳密なGalerkin解 $u_h$、連立方程式を途中で止めた区分一次関数 $\widetilde u_h\in V_h$ を比べよう。$\widetilde u_h$ に境界条件を組み込んでいるとする。

[前講のGalerkin直交性](../PML2-03/index.md#thm-pml2-03-best)は、$u-u_h$ の導関数が有限要素空間の導関数に直交すると示した。後者の $u_h-\widetilde u_h$ も有限要素空間にある。この二つが直交するため、大きさの和による一般の上界より強い等式を得る。

<a id="prop-pml2-04-galerkin-error"></a>

<!-- formal-statement-start -->
> **命題（Galerkin解と計算値のエネルギー誤差直交分解）**  
> $f\in L^2(0,1)$、$u\in H_0^1(0,1)$ を零Dirichlet Poisson問題の弱解とし、$u_h\in V_h\subset H_0^1(0,1)$ を厳密荷重積分を用いる区分一次Galerkin解とする。任意の $\widetilde u_h\in V_h$ に対し

$$
\|(u-\widetilde u_h)'\|_2^2
=\|(u-u_h)'\|_2^2+\|(u_h-\widetilde u_h)'\|_2^2.
$$

> 第1項は空間 $V_h$ に制限したことによる離散化誤差、第2項は同じ空間内でGalerkin方程式を解ききらなかった計算誤差である。
<!-- formal-statement-end -->

### 証明の見取り図

二つの誤差の和を二乗展開すると交差項が出る。その交差項が零である理由は「別々に小さい」からではなく、Galerkinの試験空間に属するという条件から従う。

<!-- proof-start -->
### 証明

分解 $u-\widetilde u_h=(u-u_h)+(u_h-\widetilde u_h)$ を微分して二乗積分すると

$$
\begin{aligned}
\|(u-\widetilde u_h)'\|_2^2
&=\|(u-u_h)'\|_2^2+\|(u_h-\widetilde u_h)'\|_2^2\\
&\quad+2\int_0^1(u'-u_h')(u_h'-\widetilde u_h')\,dx.
\end{aligned}
$$

$\widetilde u_h,u_h\in V_h$ なので $v_h=u_h-\widetilde u_h\in V_h$。[Galerkin直交性](../PML2-03/index.md#thm-pml2-03-best)をこの $v_h$ に適用すると交差積分は零。残る二項が結論である。
<!-- proof-end -->

例えば $f=2$、$u=x(1-x)$、$n=2$ のとき $u_h=(1/4)\phi_1$ である。[前講の区間内誤差計算](../PML2-03/index.md#thm-pml2-03-quadratic)より離散化のエネルギー誤差二乗は $h^2/3=1/12$。$\widetilde u_h=0$ と置くと、$\phi_1'=2$（左半分）、$-2$（右半分）だから

$$
\|(u_h-\widetilde u_h)'\|_2^2
=\left(\frac14\right)^2\int_0^1|\phi_1'|^2dx
=\frac1{16}\cdot4=\frac14.
$$

合計は $1/12+1/4=1/3$。実際 $\|u'\|_2^2=\int_0^1(1-2x)^2dx=1/3$ と一致する。これは**エネルギー半ノルム**での直交分解であり、点wise誤差や一般の $L^2$ 誤差について同じ等式を断言していない。

## 6. 近似・最適化・統計の誤差を重ねて考える

学習器を使うと、離散方程式だけでなく「使える関数の集合」「反復最適化」「有限データ」の三段階が増える。各段階のずれを同じ名前で呼ばないよう、単純な模型で確かめる。

**近似（表現）誤差。** 真の解を $u=x(1-x)$ とし、近似関数の候補を $v_\theta(x)=\theta x(1-x)$ に限る。もし $\theta\in[0,1/2]$ しか使えなければ、最適な係数は $1/2$ であり、

$$
\inf_{0\le\theta\le1/2}\|u-v_\theta\|_{L^2}
=\frac12\left(\int_0^1x^2(1-x)^2dx\right)^{1/2}
=\frac1{2\sqrt{30}}>0.
$$

積分は $x^2-2x^3+x^4$ を積分して $1/3-1/2+1/5=1/30$。最適化をどれだけ正確にしても、候補集合に真解がなければこのずれは残る。

**最適化誤差。** $\theta\in[0,2]$ とし、真の係数を $1$、目的関数を $L(\theta)=(\theta-1)^2$ とする。最小値は $L(1)=0$。途中の係数 $\widetilde\theta=1+\eta\in[0,2]$ なら目的関数の最小値からのずれは $\eta^2$、関数誤差は

$$
\|u-v_{\widetilde\theta}\|_{L^2}
=\frac{|\eta|}{\sqrt{30}}
=\frac{\sqrt{L(\widetilde\theta)-\min L}}{\sqrt{30}}.
$$

この対応は**この二次目的関数で直接証明したもの**である。一般のニューラルネットワーク損失の小ささを、同じ式で解誤差に換算できるわけではない。

**統計誤差。** 真の外力が定数 $c$ であるとして、独立な観測 $Y_1,\ldots,Y_m$ が $\mathbb E Y_i=c$、$\mathrm{Var}(Y_i)=\sigma^2<\infty$ を満たすとする。推定値 $\widehat c=m^{-1}\sum_iY_i$ を右辺に使う。平均の差 $\delta=\widehat c-c$ には

$$
\mathbb E\delta=0,\qquad
\mathbb E\delta^2
=\frac1{m^2}\sum_{i=1}^m\mathrm{Var}(Y_i)
=\frac{\sigma^2}{m}
$$

が成立する。異なる $i$ の共分散が零なのは独立性による。正しい右辺 $c$ に対する解を $u$、標本平均 $\widehat c$ に対する解を $\widehat u$ として $e=\widehat u-u$ と置くと、$-e''=\delta$、$e(0)=e(1)=0$。位置 $x$ で二回積分すれば

$$
e'(x)=-\delta x+C_1,\qquad
e(x)=-\frac{\delta x^2}{2}+C_1x+C_0.
$$

$e(0)=0$ より $C_0=0$、$e(1)=0$ より $C_1=\delta/2$ だから $e(x)=\delta x(1-x)/2$。従って中央点の二乗誤差期待値は

$$
\mathbb E|e(1/2)|^2=\frac{\mathbb E\delta^2}{64}
=\frac{\sigma^2}{64m}.
$$

これは確率的な入力推定の誤差であり、格子幅 $h$ とは別の量である。サンプルを追加せず格子だけ細かくしてもこの期待二乗誤差は消えない。

**モデル誤差と数値積分誤差。** 真の現象が $-u''=f_{\rm true}$ なのに $f_{\rm model}$ を用いるなら、その差は入力モデルの誤差である。有限要素法で $\int f\phi_i$ を数値求積に置き換えると、厳密荷重とのずれがさらに生じる。どちらも数値ソルバの残差を零にしただけでは消えない。統計誤差、モデル誤差、離散化誤差、最適化誤差が互いに排反の分類とは限らないため、比較の基準解と実装の段階を明示する。

## 7. 右辺摂動と離散化誤差が相殺する例

$u(x)=x-x^4$、$f(x)=12x^2$ は零Dirichlet条件を満たす。前講では四次式に対する二階差分を計算し、[理想差分解の明示式](../PML2-03/index.md#thm-pml2-03-quadratic)の直後で

$$
z_j=u(x_j)-h^2x_j(1-x_j)
$$

を得た。ここで右辺全点に同じ定数 $\delta$ を加え、厳密に差分方程式を解いたとする。$q(x)=x(1-x)/2$ は $-D_h^2q=1$ を満たすため、

$$
\widehat z_j=z_j+\delta q(x_j)
=u(x_j)-\left(h^2-\frac{\delta}{2}\right)x_j(1-x_j).
$$

$\delta=2h^2$ と選べば、**右辺データが誤っていても**格子点誤差は零になる。これはデータを間違える方がよいという結論ではなく、異なる誤差の符号が一時的に相殺した例である。異なる $f$、格子、境界や評価ノルムでも通用する保証にはならない。

小残差の反例とこの相殺例は別の教訓を与える。相殺例では安定性は保たれているが実測誤差の内訳は見えない。一方、$\varepsilon x=\varepsilon$ の例は逆作用素の安定性を失ったため、残差だけから解誤差を制御できない。

## 8. Pythonで格子・入力・残差を独立に動かす

[標準Pythonソース：三点差分の誤差予算](poisson_error_budget.py)は、$n=4,8,16$ で三重対角系を直接解き、四次真解との節点最大誤差を調べる。同時に、右辺全点へ一定値 $\delta$ を加え、さらに意図的な計算残差 $\rho$ を残して解を比較する。格子幅、データ誤差、計算残差の三つのつまみを別々に変えられる。

設定は $u=x-x^4$、$f=12x^2$、端点零、格子幅 $h=1/n$、右辺摂動を全内部点で定数 $\delta$、残差を全内部点で定数 $\rho$ とする。解析式は

$$
u(x_j)-\widetilde z_j
=\left(h^2-\frac{\delta}{2}+\frac{\rho}{2}\right)x_j(1-x_j).
$$

以下を見比べる。

1. $\delta=\rho=0$ なら節点最大誤差は $h^2/4$（偶数分割）となり、$n$ を倍にすると四分の一になる。
2. $\delta$ を固定して格子を細かくしても、データ誤差のため真解への収束が止まりうる。
3. $\rho$ を固定した場合も、計算残差の項が残る。
4. $\delta=2h^2$、$\rho=0$ の例では誤差が相殺する。

このコードは Python の標準ライブラリのみを使用し、三重対角消去法で差分方程式を解く。解ベクトルを使って残差を再計算し、各誤差の解析式との一致を検査する。実行時間の速度比較は、測定環境を固定していないため本実験の結論には使わない。

## 9. 演習

<a id="ex-pml2-04-a01"></a>

### PML2-04-A01：小格子の切断誤差と計算残差
- Level: A

$f=2$、$u=x(1-x)$、$n=2$、$\widehat b=b$、$\widetilde z_1=0$ とする。$\tau_1,\rho_1,E_{\rm grid}(u,\widetilde z)$ を求めよ。

<!-- solution-start -->
**詳細解答。** $h=1/2$、端点は零、内部の差分係数は $A_h=2/h^2=8$。真値は $u(1/2)=1/4$ だから

$$
\tau_1=8\cdot\frac14-2=0,\qquad
\rho_1=2-8\cdot0=2.
$$

誤差は $|1/4-0|=1/4$。安定性の上界は $(1/8)|\rho_1|=1/4$ で、今回は等号となる。切断誤差零でも未解決の計算誤差は残る。
<!-- solution-end -->

<a id="ex-pml2-04-a02"></a>

### PML2-04-A02：四次式の節点最大誤差
- Level: A

$u=x-x^4$、$f=12x^2$、$n=4$ で正確な差分解 $z$ を用いる。$x_2=1/2$ における $u-z$ と全格子での最大絶対誤差を求めよ。

<!-- solution-start -->
**詳細解答。** $h=1/4$。[前講の四次式の差分計算](../PML2-03/index.md#thm-pml2-03-quadratic)では $D_h^2(x^4)=12x_j^2+2h^2$ なので、

$$
A_h(u^I-z)=2h^2\mathbf1
=A_h\bigl(h^2x_j(1-x_j)\bigr).
$$

右辺最後の $A_h$ は格子列 $h^2x_j(1-x_j)$ へ作用する。差分解の一意性から $u(x_j)-z_j=h^2x_j(1-x_j)$。中央では

$$
u(1/2)=\frac12-\frac1{16}=\frac7{16},\qquad
u(1/2)-z_2=\frac1{16}\cdot\frac14=\frac1{64}.
$$

$x(1-x)=1/4-(x-1/2)^2$ は $[0,1]$ で中央最大なので $E_{\rm grid}=1/64$。したがって $z_2=7/16-1/64=27/64$ でも検算できる。
<!-- solution-end -->

<a id="ex-pml2-04-a03"></a>

### PML2-04-A03：観測平均による右辺誤差
- Level: A

独立な $m$ 個の観測が平均 $c$、分散 $9$ を持つ。右辺を標本平均 $\widehat c$ で置き換えるとき、Poisson解の中央点の二乗誤差の期待値を求めよ。

<!-- solution-start -->
**詳細解答。** $\delta=\widehat c-c$ とすると、観測の独立性と分散 $9$ から $\mathbb E\delta=0$、$\mathbb E\delta^2=9/m$。推定右辺による解を $\widehat u$、真の右辺による解を $u$ とし、$e=\widehat u-u$ と置く。$-e''=\delta$、$e(0)=e(1)=0$ を位置 $x$ で積分すると

$$
e'(x)=-\delta x+C_1,\qquad
e(x)=-\frac{\delta x^2}{2}+C_1x+C_0.
$$

端点条件から $C_0=0$、$C_1=\delta/2$、従って $e(x)=\delta x(1-x)/2$。中央では $e(1/2)=\delta/8$ だから

$$
\mathbb E[e(1/2)^2]=\frac1{64}\mathbb E\delta^2
=\frac9{64m}.
$$

これは有限標本による右辺の推定誤差であり、格子点数とは独立に算定した。
<!-- solution-end -->

<a id="ex-pml2-04-a04"></a>

### PML2-04-A04：有限要素の二種類の誤差
- Level: A

$f=2$、$n=2$、$\widetilde u_h=0$ とする。厳密なGalerkin解 $u_h=(1/4)\phi_1$ について、$\|(u-u_h)'\|_2^2$ と $\|(u_h-\widetilde u_h)'\|_2^2$ を計算せよ。

<!-- solution-start -->
**詳細解答。** [定数外力の有限要素誤差](../PML2-03/index.md#thm-pml2-03-quadratic)で $h=1/2$ を代入すると、前者は $h^2/3=1/12$。帽子関数 $\phi_1$ の傾きは二つの半区間で $2,-2$ なので

$$
\int_0^1|\phi_1'|^2dx
=4\cdot\frac12+4\cdot\frac12=4,\qquad
\|(u_h-\widetilde u_h)'\|_2^2
=\frac1{16}\cdot4=\frac14.
$$

合計は $1/3$。[直交分解](#prop-pml2-04-galerkin-error)に従い $\|u'\|_2^2=\int_0^1(1-2x)^2dx=1/3$ と一致する。
<!-- solution-end -->

<a id="ex-pml2-04-a05"></a>

### PML2-04-A05：一つの「低損失」を二つの視点から読む
- Level: A

$u=x(1-x)$、$v_\theta=\theta x(1-x)$、$\theta\in[0,1/2]$ とし、$L(\theta)=(\theta-1)^2$ を最小化する。最適化誤差が零でも残る $L^2$ 誤差を求め、分類名を述べよ。

<!-- solution-start -->
**詳細解答。** $\theta\in[0,1/2]$ では $L'(\theta)=2(\theta-1)<0$ なので最小点は $\theta=1/2$、最適化不足は零。一方

$$
\|u-v_{1/2}\|_{L^2}^2
=\frac14\int_0^1x^2(1-x)^2dx
=\frac14\left(\frac13-\frac12+\frac15\right)
=\frac1{120}.
$$

したがって誤差は $1/(2\sqrt{30})$ であり、候補集合の**表現（近似）誤差**である。
<!-- solution-end -->

<a id="ex-pml2-04-b01"></a>

### PML2-04-B01：右辺が一定量だけ違うときの安定定数
- Level: B

任意の偶数 $n\ge2$ に対し、右辺の全内部値を $b_j+\delta$ に変えた理想差分解 $\widehat z$ と、正しい理想差分解 $z$ の差を求め、最大ノルム安定定数 $1/8$ が改善できないことを示せ。

<!-- solution-start -->
**詳細解答。** $q_j=x_j(1-x_j)/2$ と置く。二次式だから $A_hq=1$、端点は零である。よって

$$
A_h(\widehat z-z)=\delta\mathbf1=A_h(\delta q).
$$

$A_h$ は可逆なので $\widehat z_j-z_j=\delta q_j$。偶数 $n$ では中央の $x_{n/2}=1/2$ が格子にあり、

$$
\|\widehat z-z\|_{\infty,h}
=|\delta|\max_j\frac{x_j(1-x_j)}2=\frac{|\delta|}{8}.
$$

入力の最大ノルムは $|\delta|$ だから逆写像の比は $1/8$。全右辺を対象とする安定定数はこれより小さくできない。
<!-- solution-end -->

<a id="ex-pml2-04-b02"></a>

### PML2-04-B02：誤差相殺と三角不等式
- Level: B

$u=x-x^4$、$n=4$、$f=12x^2$ とする。$\widehat b=b+\delta\mathbf1$、$\rho=0$ で $\delta=2h^2$ とする。三項誤差の各項を求め、真の格子点誤差が零でも上界が正となる理由を説明せよ。

<!-- solution-start -->
**詳細解答。** $h^2=1/16$、$\delta=1/8$。[切断誤差の定義](#def-pml2-04-residual)と[前講の四次式の二階差分](../PML2-03/index.md#thm-pml2-03-quadratic)から $\tau=2h^2\mathbf1$ である。$A_h(x_j(1-x_j))=2$ と $A_h$ の可逆性を用い、

$$
A_h(u^I-z)=\tau=A_h\bigl(h^2x_j(1-x_j)\bigr)
$$

より $u^I_j-z_j=h^2x_j(1-x_j)$。右辺変更による差は

$$
z_j-\widehat z_j=-\frac\delta2 x_j(1-x_j)
=-h^2x_j(1-x_j).
$$

計算は厳密なので $\widehat z-\widetilde z=0$。全点で三項の符号付き和は零。中央点では各項の絶対値が $1/64$ だから、三角不等式の上界 $1/64+1/64=1/32$ は正である。個別原因が相殺しても、原因自体が消えたわけではない。
<!-- solution-end -->

<a id="ex-pml2-04-b03"></a>

### PML2-04-B03：有限要素のエネルギー直交性を再構成
- Level: B

$f\in L^2(0,1)$ とし、弱解 $u$、厳密Galerkin解 $u_h$、任意の $\widetilde u_h\in V_h$ に対してエネルギー誤差の平方分解を最初から導け。どこで $\widetilde u_h\in V_h$ が必要かも答えよ。

<!-- solution-start -->
**詳細解答。** $V_h\subset H_0^1(0,1)$ なので、[連続弱形式](../PML2-01/index.md#def-pml2-01-weak)と[Galerkin解の定義](../PML2-03/index.md#def-pml2-03-fem)を同じ $v_h\in V_h$ に適用できる。

$$
\int_0^1u'v_h'\,dx
=\int_0^1fv_h\,dx
=\int_0^1u_h'v_h'\,dx.
$$

両端を引いて

$$
\int_0^1(u'-u_h')v_h'\,dx=0.
$$

$\widetilde u_h\in V_h$ なので $v_h=u_h-\widetilde u_h$ を試験関数に選べる。二項分解を二乗して

$$
\begin{aligned}
\|(u-\widetilde u_h)'\|_2^2
&=\|(u-u_h)'\|_2^2+\|(u_h-\widetilde u_h)'\|_2^2\\
&\quad+2\int_0^1(u'-u_h')(u_h'-\widetilde u_h')\,dx.
\end{aligned}
$$

交差項は直交性により零。$\widetilde u_h$ が $V_h$ に属さない場合はこの試験関数の選択ができず、交差項の零は導けない。
<!-- solution-end -->

<a id="ex-pml2-04-b04"></a>

### PML2-04-B04：小残差で大きな誤差になる理由
- Level: B

$0<\varepsilon<1$ とし、方程式 $\varepsilon x=\varepsilon$ の近似値を $0$ とする。残差と解誤差を求め、なぜ「残差が小さいほど解も近い」と推論できないのか、安定定数で説明せよ。

<!-- solution-start -->
**詳細解答。** $\varepsilon>0$ なので真の解は方程式の両辺を $\varepsilon$ で割った $x=1$ である。計算値 $\widetilde x=0$ に対し

$$
r=\varepsilon-\varepsilon\widetilde x=\varepsilon,\qquad
|x-\widetilde x|=|1-0|=1.
$$

残差の定義を差の式へ戻すと $\varepsilon(x-\widetilde x)=r$ であり、$\varepsilon\ne0$ だから

$$
|x-\widetilde x|=\frac1{\varepsilon}|r|.
$$

$\varepsilon\to0^+$ で残差は零へ向かうが、逆作用素の増幅率 $1/\varepsilon$ は発散する。[Poisson差分の一様安定性](#def-pml2-04-consistency-stability)では格子幅に依存しない $1/8$ が存在したのに対し、この例では一様な定数を選べない。従って小残差だけから小解誤差を導くことはできない。
<!-- solution-end -->

<a id="ex-pml2-04-c01"></a>

### PML2-04-C01：離散化・入力・計算の総合誤差
- Level: C

$u=x-x^4$、$f=12x^2$、$n=4$、$h=1/4$、端点零の三点差分とする。入力 $\widehat b_j=f(x_j)+\delta$ に対して計算値 $\widetilde z$ の残差が全内部点で $\rho_j=\rho$ だったとする。

1. $u(x_j)-\widetilde z_j$ を $h,\delta,\rho,x_j$ で表せ。
2. $\delta=1/8$、$\rho=1/16$ とした場合の中央点の誤差と最大格子点誤差を求めよ。
3. その値を[三項誤差分解](#thm-pml2-04-error-budget)と[誤差評価定理](#thm-pml2-04-convergence)で別々に検算し、上界と実測誤差が異なる理由を説明せよ。

<!-- solution-start -->
**詳細解答。** まず四次解の差分は $D_h^2(x^4)=12x_j^2+2h^2$ なので

$$
A_hu^I=b+2h^2\mathbf1,\qquad
A_h(u^I-z)=2h^2\mathbf1.
$$

$q_j=x_j(1-x_j)/2$ と置くと、二次式の差分により $A_hq=\mathbf1$、端点は $q_0=q_n=0$。したがって $A_h(2h^2q)=2h^2\mathbf1$。$A_h$ の可逆性から

$$
u^I_j-z_j=2h^2q_j=h^2x_j(1-x_j).
$$

さらに $\widehat b=b+\delta\mathbf1$ と $\rho=\widehat b-A_h\widetilde z$ にそれぞれ代入すれば

$$
A_h(z+\delta q)=\widehat b,\qquad
A_h(\widehat z-\rho q)=\widehat b-\rho\mathbf1.
$$

ゆえに $A_h$ の一意性から $\widehat z=z+\delta q$、$\widetilde z=\widehat z-\rho q$ となる。

従って全内部点について

$$
u(x_j)-\widetilde z_j
=\left(h^2-\frac{\delta}{2}+\frac{\rho}{2}\right)x_j(1-x_j).
$$

指定値では $h^2=1/16$、$\delta/2=1/16$、$\rho/2=1/32$。係数は $1/32$ となる。最大値は中央の $x_2=1/2$ で取り、

$$
E_{\rm grid}=\frac1{32}\cdot\frac14=\frac1{128},
\qquad u(1/2)=\frac7{16},\quad
\widetilde z_2=\frac7{16}-\frac1{128}=\frac{55}{128}.
$$

[三項分解](#thm-pml2-04-error-budget)の中央点の符号付き各項は、それぞれ $1/64$、$-1/64$、$1/128$。和は $1/128$ となる。絶対値を先に取って足すと $1/64+1/64+1/128=5/128$ である。

[誤差評価定理](#thm-pml2-04-convergence)の右辺は、$u^{(4)}=-24$ より

$$
\frac{h^2}{96}\|u^{(4)}\|_\infty+\frac{|\delta|}{8}
+\frac{|\rho|}{8}
=\frac{1/16}{4}+\frac{1/8}{8}+\frac{1/16}{8}
=\frac5{128}.
$$

したがって $1/128\le5/128$ を確かめられる。上界が大きいのは、実際には離散化項と入力項が符号付きで相殺するのに、三角不等式では各項の絶対値を加えるためである。
<!-- solution-end -->

## 10. 次の講義への橋渡し

本講では「どの誤差を測り、何に対して保証するか」を確定した。次は、学習に使うPDEの数値データをどの格子・時刻・パラメータで作り、訓練とは別の検証条件をどう確保するかを扱う。解析解での検算がある場合と、真値を直接得られない場合の検査計画も区別する。
