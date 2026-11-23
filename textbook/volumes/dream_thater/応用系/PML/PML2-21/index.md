# PML2-21 PDEパラメータを学習すると識別性は保てるか

## 1. 方程式を満たす解と、未知係数を言い当てること

[PML2-20の物理制約付き作用素損失](../PML2-20/index.md#def-pml2-20-operator-loss)では、解関数の近似がPDEを満たすかを測った。しかし、方程式の係数そのものを学習する場合、**物理残差が零だから未知係数も正しい**とは限らない。方程式も観測も満たす別の係数が存在するかもしれない。

[INV1の識別可能性](../../../解析系/INV/INV1/index.md#def-inv1-identifiability)は、異なる許容パラメータが異なる観測を与える、という観測写像の単射性である。[PML2-02のパラメータ・状態・観測の連鎖](../PML2-02/index.md#def-pml2-02-pipeline)に沿って、今回は外力ではなく**PDEの最高階微分に掛かる係数**を未知とする。学習法の良し悪しと、そもそも観測で区別できるかを切り分ける。

区間 $0<x<1$ の境界値問題

$$
-(\kappa u'(x))'=a,\qquad u(0)=u(1)=0
$$

を考える。$\kappa>0$ は一様な拡散・伝導係数、$a\in\mathbb R$ は一定の外力の大きさである。プライムは空間変数 $x$ についての微分を意味する。係数を正に取るのは、零Dirichlet問題の一意性と、後に用いる逆数 $1/\kappa$ を保証するためである。

$\kappa$ が空間に依存しないので $-(\kappa u')'=-\kappa u''$。端点で零となる

$$
\phi(x)=\frac{x(1-x)}2,\qquad \phi'(x)=\frac{1-2x}{2},\qquad \phi''(x)=-1
$$

を使うと、解は

$$
u_{\kappa,a}(x)=\frac a\kappa\phi(x)
$$

となる。実際 $-\kappa u_{\kappa,a}''=-\kappa(a/\kappa)(-1)=a$、両端値も零である。一意性については、同じ境界値問題の二解の差 $w$ が $-\kappa w''=0$、$w(0)=w(1)=0$ を満たせば $w''=0$、$w(x)=Ax+B$ で、$B=0,A=0$ となる。従ってこの式は**唯一の古典解**である。[零Dirichlet Poisson問題の一意性](../PML2-01/index.md#thm-pml2-01-energy)とも整合する。

この講のすべての観測では、内部位置で状態 $u$ の値を測るものとする。実測値に誤差があっても、PDEの右辺が正しいという**模型の仮定**と、観測が正確であることとは別の条件である。

## 2. どの情報を固定するかで識別性は変わる

観測点の集合 $X=(x_1,\ldots,x_m)$ は $m\ge1$ 個の点（重複可）からなり、$0\le x_j\le1$ とする。各パラメータで解を作った後に値を測るので、係数から観測への写像は

$$
\mathcal G_{a,X}(\kappa)
=\bigl(u_{\kappa,a}(x_1),\ldots,u_{\kappa,a}(x_m)\bigr).
$$

ここでは外力 $a$ を事前に**既知として固定**する場合と、外力も未知として扱う場合を分ける。これは単に変数を増やしたかどうかではなく、観測写像の定義域が変わることを意味する。

<a id="def-pml2-21-identification"></a>

<!-- formal-statement-start -->
> **定義（係数同定の観測写像と構造的識別可能性）**  
> $\kappa>0$ と $a\in\mathbb R$ について、唯一の解 $u_{\kappa,a}\in C^2([0,1])$ は次を満たす。

$$
-\kappa u_{\kappa,a}''=a,\qquad u_{\kappa,a}(0)=u_{\kappa,a}(1)=0.
$$

> $m\ge1$ 個の観測点の列 $X=(x_1,\ldots,x_m)\in[0,1]^m$ と既知外力 $a$ を固定する。
>
> $\mathcal G_{a,X}:(0,\infty)\to\mathbb R^m$ を $\mathcal G_{a,X}(\kappa)=(u_{\kappa,a}(x_j))_{j=1}^m$ と定義する。この写像が単射なら、係数 $\kappa$ は指定した外力と観測設計の下で**構造的に識別可能**という。
>
> 外力も未知の場合は、許容集合 $(0,\infty)\times\mathbb R$ 上で $\mathcal H_X(\kappa,a)=(u_{\kappa,a}(x_j))_{j=1}^m$ と定める。組 $(\kappa,a)$ の識別可能性は、この別の写像 $\mathcal H_X$ の単射性で判定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml2-21-identification -->
**定義の確認。** $a=1$、$X=(1/2)$ なら $\phi(1/2)=1/8$ なので $\mathcal G_{1,X}(\kappa)=1/(8\kappa)$。定義域の任意の $\kappa_1,\kappa_2>0$ について $1/(8\kappa_1)=1/(8\kappa_2)$ なら両辺の分母を払って $\kappa_1=\kappa_2$。したがって単射である。一方、外力も未知なら $\mathcal H_X(2,1)=\mathcal H_X(4,2)=1/16$ となり、この二組は区別できない。解の存在・一意性、観測点、許容パラメータ、写像の単射性をそれぞれ確認した。
<!-- definition-example-end -->

**構造的識別可能性と推定精度は違う。** 単射でも、近接する観測値が大きく異なる係数へ戻るなら、少量の雑音で推定は不安定になる。さらに正則化や事前情報で一つの値を選べても、観測写像そのものが単射に変わったわけではない。この区別は[逆問題の三条件](../../../解析系/INV/INV1/index.md#def-inv1-hadamard)のうち、とくに一意性と安定性を分けて考えることに対応する。

## 3. 既知の非零外力なら内部観測で係数を復元できる

<a id="thm-pml2-21-known-source"></a>

<!-- formal-statement-start -->
> **定理（既知外力と内部一点からの係数の一意な復元）**  
> 正の係数 $\kappa$ と既知の非零外力 $a$ に対して次の問題を考える。

$$
-\kappa u''(x)=a,\qquad u(0)=u(1)=0.
$$

> 内部点 $x_0\in(0,1)$ で正確な値 $y=u(x_0)$ を測定すると、係数 $\kappa$ は一意に決まり、
>
> $$
> \kappa=\frac{a\phi(x_0)}{y},\qquad
> \phi(x)=\frac{x(1-x)}2
> $$
>
> で復元される。ここで $y\ne0$ であり、$y$ と $a$ の符号は一致する。
<!-- formal-statement-end -->

**証明の見取り図。** 解の一意な形へ観測位置を代入し、$a\ne0$ と内部点で $\phi(x_0)>0$ を使って分母が零でないことを確かめる。

<!-- proof-start -->
### 証明

第1節で求めた解 $u_{\kappa,a}=(a/\kappa)\phi$ は、任意の $\kappa>0$ でPDEと境界条件を満たし唯一である。$0<x_0<1$ だから $x_0(1-x_0)>0$、従って $\phi(x_0)>0$。観測値は

$$
y=\frac a\kappa\phi(x_0).
$$

$a\ne0$、$\kappa>0$、$\phi(x_0)>0$ より $y\ne0$。両辺に $\kappa$ を掛けて $\kappa y=a\phi(x_0)$、さらに $y$ で割って表示式を得る。もし $\kappa_1,\kappa_2$ が同じ観測を与えれば、双方ともこの式と一致するので $\kappa_1=\kappa_2$。逆に指定した模型から生成された観測には真の $\kappa$ を代入できるので存在も満たす。
<!-- proof-end -->

**具体例。** $a=1$、$x_0=1/2$、観測 $y=1/16$ なら $\kappa=(1/8)/(1/16)=2$。復元した解は $u=\phi/2$ で $-\kappa u''=-2(-1/2)=1$、境界で零、中央値は $1/16$ と検算できる。

<a id="prop-pml2-21-vanishing-data"></a>

<!-- formal-statement-start -->
> **命題（零外力または端点だけの観測では識別できない）**  
> $\kappa>0$、$a\in\mathbb R$ について次の零境界問題を考える。

$$
-\kappa u''(x)=a,\qquad u(0)=u(1)=0.
$$

> (i) 外力が既知の $a=0$、または (ii) 外力は任意で観測点が端点 $0,1$ のみの場合、異なる任意の正の係数は同じ観測を与える。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$(i)$ $a=0$ なら $u_{\kappa,0}=(0/\kappa)\phi=0$ で、どの点で何回測っても観測ベクトルは零となる。$(ii)$ $\phi(0)=\phi(1)=0$ だから、すべての $\kappa,a$ で端点観測は零である。どちらも $\kappa_1\ne\kappa_2$ を自由に選べるので観測写像は単射ではない。
<!-- proof-end -->

破れたのは順問題の一意性ではなく、**観測から係数を区別する情報**である。内部点と非零の既知外力という仮定には、代数的に明確な役割がある。

## 4. PINNで解と係数を同時に学習するとどうなるか

学習器の出力を $u_c(x)=c\phi(x)$ とする。ここで $c\in\mathbb R$ は解の形を決める訓練パラメータで、物理係数 $\kappa>0$ とは別である。$\phi(0)=\phi(1)=0$ によって境界条件は常に正確に満たされる。

既知外力 $a$ に対する[強形式残差](../PML2-06/index.md#def-pml2-06-strong-residual)を代入すると

$$
r_{\kappa,c}(x)=-\kappa u_c''(x)-a
=-\kappa c(-1)-a=\kappa c-a.
$$

この一成分模型では残差が $x$ に依存しない。したがって内部の任意の一点で課した残差は、今回は全区間の残差と一致する。一般のニューラルネットについて有限点の残差零を連続残差零とみなせないことは[PML2-12の反例](../PML2-12/index.md#thm-pml2-12-invisible)に注意する。

<a id="def-pml2-21-joint-loss"></a>

<!-- formal-statement-start -->
> **定義（状態とPDE係数の同時推定損失）**  
> 既知の $a\in\mathbb R$、$m\ge1$、位置 $x_j\in[0,1]$、観測値 $y_j\in\mathbb R$、物理重み $\lambda>0$ を固定する。状態候補 $u_c=c\phi$、係数候補 $\kappa>0$ に対し、
>
> $$
> J_\lambda(c,\kappa)=
> \frac1m\sum_{j=1}^m\left(c\phi(x_j)-y_j\right)^2
> +\lambda(\kappa c-a)^2
> $$
>
> を状態・係数の同時推定損失と呼ぶ。第一項は観測への適合、第二項はPDE残差の二乗である。境界値は候補の構成により厳密に零である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml2-21-joint-loss -->
**定義の確認。** $a=1$、$m=1$、$x_1=1/2$、$y_1=1/16$、$c=1/2$、$\kappa=2$ とする。$u_c\in C^2([0,1])$、$\kappa>0$、$\lambda>0$ という条件を満たす。データ項は $(c/8-1/16)^2=(1/16-1/16)^2=0$、物理項は $\lambda(2\cdot1/2-1)^2=0$、境界も零なので $J_\lambda=0$。$c$ の値をただ観測に合わせるだけでなく、$\kappa c=a$ も別に確認した。
<!-- definition-example-end -->

<a id="thm-pml2-21-joint-unique"></a>

<!-- formal-statement-start -->
> **定理（既知外力の同時学習で零損失解は一意）**  
> 既知の非零外力 $a$ と正の損失重み $\lambda>0$ を固定する。少なくとも一つの観測点は $(0,1)$ に属する。
>
> 真の係数 $\kappa_*>0$ から生成した解 $u_*=(a/\kappa_*)\phi$ を正確に観測する。
>
> $c\in\mathbb R$、$\kappa>0$ に対し、前節の $J_\lambda(c,\kappa)$ を最小化すると零損失組は唯一であり、
>
> $$
> (c,\kappa)=\left(\frac a{\kappa_*},\kappa_*\right)
> $$
>
> である。
<!-- formal-statement-end -->

**証明の見取り図。** 非負な二つの平方和がともに零であるための条件を分ける。内部観測が $c$ を決め、既知の非零外力と残差が $\kappa$ を決める。

<!-- proof-start -->
### 証明

真の組 $c_*=a/\kappa_*$、$\kappa=\kappa_*$ なら、$c_*\phi(x_j)=y_j$ が全 $j$ で成立し、$\kappa_*c_*-a=0$ なので $J_\lambda=0$。各項は非負であり零が最小値である。

逆に $J_\lambda(c,\kappa)=0$ と仮定する。$\lambda>0$ と非負性により各観測誤差が零かつ $\kappa c-a=0$。内部点 $x_j$ を一つ選ぶと $\phi(x_j)>0$ で、

$$
c\phi(x_j)=y_j=\frac a{\kappa_*}\phi(x_j)
\quad\Longrightarrow\quad c=\frac a{\kappa_*}\ne0.
$$

次に $\kappa c=a$ にこの値を代入し、$\kappa(a/\kappa_*)=a$。$a\ne0$ で割って $\kappa=\kappa_*$。従って零損失組は唯一である。
<!-- proof-end -->

$\lambda$ が大きければ識別可能になる、という主張ではない。**既知外力・内部観測・正確な模型**という条件が単射性を作っており、$\lambda>0$ は方程式の条件を損失に確実に含めるための条件である。[複合損失での重みの役割](../PML2-09/index.md#prop-pml2-09-scale-weight)と区別する。

## 5. 外力も未知なら、物理残差零でも係数は定まらない

観測が識別できない例を、学習器の表現力不足に帰すことはできない。今回の候補族は正解を厳密に表現できるが、それでも未知量の**同時スケーリング**が残る。

<a id="prop-pml2-21-scaling"></a>

<!-- formal-statement-start -->
> **命題（外力と伝導係数の同時スケーリングによる非識別）**  
> $\kappa>0$、$a\in\mathbb R$ をともに未知とする $-\kappa u''=a$、$u(0)=u(1)=0$ について、任意の $t>0$ に対し
>
> $$
> u_{t\kappa,ta}(x)=u_{\kappa,a}(x)\quad(0\le x\le1)
> $$
>
> が成り立つ。従って解を全区間で正確に観測しても $(\kappa,a)$ は一般に一意に定まらない。状態候補 $u_c=c\phi$ と同時学習で $(c,\kappa,a)$ を未知とすると、真の組から生成された雑音なしデータについて、$t$ を変えた異なる組はいずれもデータ残差・物理残差が零である。
<!-- formal-statement-end -->

**証明の見取り図。** 観測が決めるのは $a/\kappa$ であって分子・分母それぞれではない。変換で残差も零に保たれるか確認する。

<!-- proof-start -->
### 証明

真の解の式に $(t\kappa,ta)$ を代入すると

$$
u_{t\kappa,ta}(x)=\frac{ta}{t\kappa}\phi(x)
=\frac a\kappa\phi(x)=u_{\kappa,a}(x).
$$

$t\ne1$ なら $t\kappa\ne\kappa$ で二つの未知組は異なるが、すべての位置の状態値が同じなので任意の観測点集合で区別不能である。候補 $c=a/\kappa$ を固定したまま $(\kappa,a)$ を $(t\kappa,ta)$ にすると、物理残差は

$$
(t\kappa)c-ta=t(\kappa c-a)=0.
$$

観測項は $c\phi(x_j)$ だけで決まり不変、境界値も不変だから全損失は零のままである。この変換が任意の $t>0$ について成立し、少なくとも係数が変わるため、零損失解は一意でない。
<!-- proof-end -->

**直接比較。** $(\kappa,a)=(2,1)$ と $(4,2)$ ではともに $u=\phi/2$。物理残差を計算しても、$2(1/2)-1=0$ と $4(1/2)-2=0$ になる。観測点を増やしたり、空間格子を細かくしたりしても、同じ解全体が観測される限りこの不定性は消えない。ここで失ったのは第3・4節で仮定した**外力が既知**という条件であり、残差最小化のアルゴリズムではない。

## 6. 識別できても、ノイズの影響を抑えられるか

外力を既知の $a=1$ に戻し、正の係数の逆数 $s=1/\kappa>0$ を未知量に取る。観測方程式は $s$ に関して線形になり、

$$
y_j=p_js_*+\varepsilon_j,\qquad
p_j=\phi(x_j),\quad s_*=\frac1{\kappa_*},\quad
Q=\sum_{j=1}^m p_j^2
$$

となる。$\varepsilon_j$ は観測雑音である。$Q$ は**観測点が内部に一つでもあれば正**で、端点だけなら零である。これは線形観測写像 $s\mapsto(p_1s,\ldots,p_ms)$ の一列の係数ベクトル $p$ の二乗長に等しい。列の長さが零でないことと単射性が同値であるのは[有限次元線形逆問題の条件](../../../解析系/INV/INV1/index.md#thm-inv1-finite-linear)の一次元の場合であり、ここでは直接導出する。

<a id="thm-pml2-21-noise"></a>

<!-- formal-statement-start -->
> **定理（逆係数の最小二乗推定と雑音増幅）**  
> 外力を既知の $a=1$ とし、真の係数を $\kappa_*>0$ とする。
>
> $m\ge1$ 個の観測点 $x_j\in[0,1]$ を固定し、次の量を定める。

$$
p_j=\frac{x_j(1-x_j)}2,\qquad Q=\sum_{j=1}^mp_j^2,\qquad s_*=\frac1{\kappa_*}.
$$

> $Q>0$ とし、観測を $y_j=p_js_*+\varepsilon_j$ とする。$s\in\mathbb R$ 上の最小二乗目的関数は

$$
F(s)=\sum_{j=1}^m(p_js-y_j)^2.
$$

> この関数の唯一の最小点と誤差は次を満たす。
>
> $$
> \widehat s=\frac{\sum_jp_jy_j}{Q},
> \qquad
> \widehat s-s_*=\frac{\sum_jp_j\varepsilon_j}{Q},
> \qquad
> |\widehat s-s_*|\le\frac{\|\varepsilon\|_2}{\sqrt Q}.
> $$
>
> もし $\widehat s>0$ ならこれは正の係数を仮定した $s>0$ 上でも最小解で、$\widehat\kappa=1/\widehat s$ と復元できる。さらに $|\widehat s-s_*|\le s_*/2$ なら
>
> $$
> |\widehat\kappa-\kappa_*|
> \le \frac{2|\widehat s-s_*|}{s_*^2}.
> $$
>
> 雑音が独立で平均零、共通分散 $\sigma^2$ なら $\operatorname{Var}(\widehat s)=\sigma^2/Q$ である。
<!-- formal-statement-end -->

**証明の見取り図。** 正規方程式を展開し、誤差式へ既知の $y_j$ の生成式を代入する。係数に戻す際の分母の正値性を別に確認する。

<!-- proof-start -->
### 証明

$F(s)=\sum_j(p_j^2s^2-2p_jy_js+y_j^2)$ だから

$$
F'(s)=2Qs-2\sum_jp_jy_j,\qquad F''(s)=2Q>0.
$$

従って全実数上の一意な最小点は $F'(s)=0$ の解 $\widehat s=\sum_jp_jy_j/Q$ である。$y_j=p_js_*+\varepsilon_j$ を分子に代入すると

$$
\sum_jp_jy_j=Q s_*+\sum_jp_j\varepsilon_j,
$$

よって誤差式が従う。Cauchy–Schwarzの不等式により

$$
\left|\sum_jp_j\varepsilon_j\right|
\le\left(\sum_jp_j^2\right)^{1/2}
\left(\sum_j\varepsilon_j^2\right)^{1/2}
=\sqrt Q\,\|\varepsilon\|_2,
$$

なので誤差の上界を得る。$\widehat s>0$ なら全実数上の最小点は許容集合 $(0,\infty)$ にも含まれる。一方 $\widehat s\le0$ の場合は正の係数へ単純に逆数変換してはならない。

追加仮定 $|\widehat s-s_*|\le s_*/2$ より $\widehat s\ge s_*/2>0$ であり、

$$
|\widehat\kappa-\kappa_*|
=\left|\frac1{\widehat s}-\frac1{s_*}\right|
=\frac{|\widehat s-s_*|}{\widehat s\,s_*}
\le\frac{2|\widehat s-s_*|}{s_*^2}.
$$

最後に独立・平均零・分散 $\sigma^2$ を用い、

$$
\operatorname{Var}(\widehat s)
=\operatorname{Var}\left(\frac1Q\sum_jp_j\varepsilon_j\right)
=\frac1{Q^2}\sum_jp_j^2\sigma^2
=\frac{\sigma^2}{Q}.
$$

独立性は交差共分散を零にする箇所で使用した。
<!-- proof-end -->

**位置の選び方。** $\phi(x)=1/8-(x-1/2)^2/2$ なので $0\le p_j\le1/8$ で、最大は中央 $x=1/2$。同じ測定回数・同じ雑音分散を仮定したこの一係数模型では、中央へ置くほど $Q$ が大きく、$\sigma^2/Q$ が小さくなる。端点付近では $p_j\to0$ なので、構造的には識別可能でも雑音に敏感となる。一般の空間変動係数や複数パラメータには、別の観測設計が必要である。

## 7. 正則化は何を決め、何を保証しないか

小さい $Q$ で推定値が大きく揺れるとき、逆係数 $s$ に既知の基準値 $s_0\in\mathbb R$ を与え、そこからのずれに罰則を課す。$\alpha>0$ の重み付き二乗項を追加することを、ここでは**二乗正則化**と呼ぶ。事前値への近さという追加情報で解を選ぶ方法であって、観測に新しい情報が生じたことを意味しない。

<a id="prop-pml2-21-regularization"></a>

<!-- formal-statement-start -->
> **命題（二乗正則化の解とバイアス）**  
> $m\ge1$、$p_j\in\mathbb R$、$Q=\sum_jp_j^2\ge0$、$\alpha>0$、$s_0\in\mathbb R$ とし、
>
> $$
> F_\alpha(s)=\sum_{j=1}^m(p_js-y_j)^2+\alpha(s-s_0)^2
> $$
>
> を $s\in\mathbb R$ 上で最小化する。唯一の最小点は
>
> $$
> \widehat s_\alpha
> =\frac{\sum_jp_jy_j+\alpha s_0}{Q+\alpha}.
> $$
>
> $y_j=p_js_*+\varepsilon_j$ のとき
>
> $$
> \widehat s_\alpha-s_*
> =\frac{\sum_jp_j\varepsilon_j+\alpha(s_0-s_*)}{Q+\alpha}.
> $$
>
> もし $Q=0$ なら $\widehat s_\alpha=s_0$ で、データから $s_*$ を識別したことにはならない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$F_\alpha$ を微分して

$$
F_\alpha'(s)=2Qs-2\sum_jp_jy_j+2\alpha(s-s_0),\qquad
F_\alpha''(s)=2(Q+\alpha)>0.
$$

導関数を零と置けば $(Q+\alpha)s=\sum_jp_jy_j+\alpha s_0$ だから最初の式が得られる。雑音模型を代入すると分子は $Qs_*+\sum_jp_j\varepsilon_j+\alpha s_0$ であり、これから $(Q+\alpha)s_*$ を引いて第二式となる。$Q=0$ ならすべての $p_j=0$ なので和は零、結果は $s_0$。このとき $\widehat s_\alpha$ が正になるかは $s_0$ に依存する。
<!-- proof-end -->

**正則化で消えないもの。** 雑音零でも $s_0\ne s_*$ なら誤差 $\alpha(s_0-s_*)/(Q+\alpha)$ が残る。外力と係数の同時スケーリングのような構造的非識別では、正則化は**許容される組の中から一組を好む**だけで、真の係数を示したことにはならない。

## 8. 雑音ありデータで物理残差零を達成しても誤差は残る

第4節の同時損失に $a=1$、中央の一観測を使う。真値を $\kappa_*=2$、$c_*=1/2$ とすれば、真の中央値は $y_*=c_*/8=1/16$ である。ここに測定誤差 $\varepsilon=1/32$ が乗って $y^\delta=3/32$ となったとしよう。

データ項を零にするには $c/8=3/32$、すなわち $c=3/4$ とする。物理項も零にするには $\kappa c=1$、すなわち $\kappa=4/3$ とする。こうすると

$$
J_\lambda(3/4,4/3)
=\left(\frac{3/4}{8}-\frac3{32}\right)^2+
\lambda\left(\frac43\frac34-1\right)^2=0
$$

が**任意の $\lambda>0$** で成り立つ。それでも $\kappa=4/3\ne2$、解関数も $(3/4)\phi\ne(1/2)\phi$ である。これは構造的識別可能性が壊れたのではなく、**ノイズ付き観測を厳密に当てて真値からずれた**例である。物理残差は正しい模型の別の係数・別の解に対しても零になり得る。

学習に使った観測と、未知係数の真値を比較する独立な検証資料を区別することは、[入力単位の完全ホールドアウト評価](../PML2-20/index.md#def-pml2-20-holdout)の考え方ともつながる。現実には外力の校正誤差、境界条件の誤り、離散化誤差も追加されるので、データ項・物理項・係数誤差を混同しない。

## 9. 外力の差を既知にする二実験では何が回復するか

同じ未知係数 $\kappa>0$ について二回実験し、外力の絶対値 $a_1$ は未知でも、二回目との差 $a_2-a_1=1$ だけは校正済みとする。観測位置を同一の内部点 $x_0$ とする。各実験の観測は

$$
y_1=\frac{a_1}{\kappa}\phi(x_0),\qquad
y_2=\frac{a_1+1}{\kappa}\phi(x_0).
$$

両者を引けば未知 $a_1$ が消え、差 $y_2-y_1=\phi(x_0)/\kappa>0$ は既知外力 $1$ の場合と同じになる。

<a id="thm-pml2-21-two-loads"></a>

<!-- formal-statement-start -->
> **定理（既知の外力差を持つ二実験からの同時復元）**  
> 共通係数は $\kappa>0$、未知外力は $a_1\in\mathbb R$、二回目の外力は $a_2=a_1+1$ とする。
>
> 各 $i=1,2$ について、次の零境界問題を解く。

$$
-\kappa u_i''(x)=a_i,\qquad u_i(0)=u_i(1)=0.
$$

> 共通の内部点 $x_0\in(0,1)$ で正確な値 $y_i=u_i(x_0)$ を測ると、$(\kappa,a_1)$ は一意に復元でき、
>
> $$
> d=y_2-y_1>0,\qquad
> \kappa=\frac{\phi(x_0)}d,\qquad
> a_1=\frac{y_1}{d}
> $$
>
> となる。ただし $\phi(x_0)=x_0(1-x_0)/2$ である。
<!-- formal-statement-end -->

**証明の見取り図。** 二実験の差を取ることで未知外力の基準値を消す。得られた一係数問題を先に解き、残りの外力を戻す。

<!-- proof-start -->
### 証明

第1節の唯一解を二つの外力にそれぞれ適用すると、

$$
y_2-y_1
=\frac{a_2-a_1}{\kappa}\phi(x_0)
=\frac1\kappa\phi(x_0)=d.
$$

$x_0$ は内部点なので $\phi(x_0)>0$、かつ $\kappa>0$ なので $d>0$。両辺を $\kappa$ 倍して $\kappa d=\phi(x_0)$、よって $\kappa=\phi(x_0)/d$。第一実験に戻り $y_1=a_1\phi(x_0)/\kappa=a_1d$ から $a_1=y_1/d$。どの許容組も同じ二つの観測から同じ値に戻るため、観測写像は単射である。
<!-- proof-end -->

**確認とノイズ。** $\kappa=2,a_1=1,a_2=2,x_0=1/2$ なら $y_1=1/16$、$y_2=1/8$、差 $d=1/16$。復元式から $\kappa=(1/8)/(1/16)=2$、$a_1=(1/16)/(1/16)=1$ と戻る。

各観測に誤差 $e_i$ があり $|e_i|\le\delta$ なら、差の誤差は $|e_2-e_1|\le2\delta$。真の差を $d>0$ として $\delta\le d/4$ なら測定差 $\widehat d=d+e_2-e_1\ge d/2>0$ だから

$$
|\widehat\kappa-\kappa|
=\phi(x_0)\left|\frac1{\widehat d}-\frac1d\right|
=\frac{\phi(x_0)|e_2-e_1|}{d\,\widehat d}
\le\frac{4\phi(x_0)\delta}{d^2}.
$$

外力差の校正によって**構造的な非識別**は消えるが、$d$ が小さければ雑音が増幅されることまで消えるわけではない。

## 10. 演習と詳細解答

### Level A：方程式・識別条件を確認する

<a id="ex-pml2-21-a01"></a>

**問題 PML2-21-A01**
- Level: A
- $\kappa=3$、$a=2$、$-3u''=2$、$u(0)=u(1)=0$ の唯一解を構成し、二階微分と境界条件を検算せよ。

<!-- solution-start -->
**詳細解答。** $\phi=x(1-x)/2$ で $\phi''=-1$、両端値は零。候補 $u=(2/3)\phi=x(1-x)/3$ なら $u''=-2/3$、従って $-3u''=2$、端点も零である。二解の差 $w$ は $w''=0$、$w(0)=w(1)=0$ を満たし、一次式 $w=Ax+B$ の係数は $A=B=0$。よって唯一解である。
<!-- solution-end -->

<a id="ex-pml2-21-a02"></a>

**問題 PML2-21-A02**
- Level: A
- 既知外力 $a=2$、内部観測 $x_0=1/4$、$y=3/32$ から $\kappa$ を復元し、生成した解を観測位置へ代入して検算せよ。

<!-- solution-start -->
**詳細解答。** $\phi(1/4)=(1/4)(3/4)/2=3/32$。[内部一点復元の定理](#thm-pml2-21-known-source)の仮定 $a\ne0$ と $x_0\in(0,1)$ が成立し、$\kappa=a\phi(x_0)/y=2(3/32)/(3/32)=2$。解は $u=(2/2)\phi=\phi$ で、$u(1/4)=3/32$、$-2u''=-2(-1)=2$、両端で零となる。
<!-- solution-end -->

<a id="ex-pml2-21-a03"></a>

**問題 PML2-21-A03**
- Level: A
- 既知外力 $a=0$ の場合と、任意の外力で端点 $0,1$ だけを観測する場合について、$\kappa=1$ と $\kappa=5$ を区別できるか、解の式を用いて判定せよ。

<!-- solution-start -->
**詳細解答。** $a=0$ なら $u_{\kappa,0}(x)=0$ で $\kappa=1,5$ のいずれも全区間で零、区別できない。端点のみなら $u_{\kappa,a}(0)=(a/\kappa)\phi(0)=0$、$u_{\kappa,a}(1)=(a/\kappa)\phi(1)=0$ なので、どちらの係数も観測対 $(0,0)$ を与える。これは[非識別の命題](#prop-pml2-21-vanishing-data)の二つの失敗条件を別々に確かめるものだ。
<!-- solution-end -->

<a id="ex-pml2-21-a04"></a>

**問題 PML2-21-A04**
- Level: A
- $a=1$、$\lambda=2$、中央の観測 $y=1/16$ を使う同時損失 $J_\lambda(c,\kappa)$ を書き、$(c,\kappa)=(1/2,2)$ と $(1/4,4)$ の値を求めよ。

<!-- solution-start -->
**詳細解答。** $\phi(1/2)=1/8$ だから $J_2(c,\kappa)=(c/8-1/16)^2+2(\kappa c-1)^2$。$(1/2,2)$ では両括弧が零なので $J_2=0$。$(1/4,4)$ では物理残差 $4(1/4)-1=0$、データ誤差 $1/32-1/16=-1/32$。従って $J_2=1/1024>0$。方程式を満たすだけでは観測への適合を保証しない。
<!-- solution-end -->

<a id="ex-pml2-21-a05"></a>

**問題 PML2-21-A05**
- Level: A
- $x_1=1/4$、$x_2=1/2$ のとき $p_1,p_2,Q=p_1^2+p_2^2$ を求め、端点 $x_1=0,x_2=1$ の場合と比べよ。

<!-- solution-start -->
**詳細解答。** $p_1=\phi(1/4)=3/32$、$p_2=\phi(1/2)=1/8=4/32$。従って $Q=(3/32)^2+(4/32)^2=(9+16)/1024=25/1024>0$。端点だけなら $p_1=p_2=0$ で $Q=0$。前者では $s\mapsto(p_1s,p_2s)$ が単射で、後者ではすべての $s$ が零ベクトルへ写る。
<!-- solution-end -->

### Level B：雑音・正則化・同時学習の限界

<a id="ex-pml2-21-b01"></a>

**問題 PML2-21-B01**
- Level: B
- $\kappa=2,a=1$ と $\kappa=4,a=2$ について、零境界問題の全解と物理残差が一致することを示せ。任意個の内部観測を追加しても二組を識別できない理由を述べよ。

<!-- solution-start -->
**詳細解答。** 両組の比は $a/\kappa=1/2$ なので $u=\phi/2$。その二階微分は $u''=-1/2$ で、前者の残差は $-2(-1/2)-1=0$、後者の残差は $-4(-1/2)-2=0$。いずれも $u(0)=u(1)=0$。どの内部点でも同じ関数値を返すため、観測点の数を増やしても情報は変わらない。[スケーリングの命題](#prop-pml2-21-scaling)の $t=2$ が作用しており、既知外力という仮定が欠落している。
<!-- solution-end -->

<a id="ex-pml2-21-b02"></a>

**問題 PML2-21-B02**
- Level: B
- 真の係数 $\kappa_*=2$、既知外力 $1$ のとき、中央の真値 $1/16$ に雑音 $1/32$ が加わった観測で $J_\lambda(c,\kappa)$ を零にする組を求めよ。真の係数との誤差も計算し、零物理残差から真値が言えない理由を区別せよ。

<!-- solution-start -->
**詳細解答。** 観測は $y^\delta=1/16+1/32=3/32$。データ残差 $c/8-y^\delta=0$ は $c=8(3/32)=3/4$ を要求する。既知外力 $1$ の物理残差 $\kappa c-1=0$ は $\kappa=1/c=4/3$ を要求し、$\kappa>0$ も満たす。従って任意の $\lambda>0$ で $J_\lambda=0$、しかし $\kappa-\kappa_*=4/3-2=-2/3$。構造的な単射性は残るが、入力データに雑音があるため推定が真値から偏った。重みを増やすだけでは観測誤差を元に戻せない。
<!-- solution-end -->

<a id="ex-pml2-21-b03"></a>

**問題 PML2-21-B03**
- Level: B
- $a=1$、$x_1=1/4,x_2=1/2$、真の $s_*=1/2$ とし、雑音 $\varepsilon_1=1/64$、$\varepsilon_2=-1/64$ を加えた二観測から最小二乗推定 $\widehat s$ と $\widehat\kappa$ を求めよ。

<!-- solution-start -->
**詳細解答。** $p_1=3/32,p_2=4/32$、$Q=25/1024$。観測は $y_j=p_js_*+\varepsilon_j$。誤差式の分子を先に求めると

$$
\sum_jp_j\varepsilon_j
=\frac3{32}\frac1{64}+\frac4{32}\left(-\frac1{64}\right)
=-\frac1{2048}.
$$

よって $\widehat s-s_*=(-1/2048)/(25/1024)=-1/50$。$\widehat s=1/2-1/50=12/25>0$、$\widehat\kappa=25/12$。真の $\kappa_*=2$ に対し $\widehat\kappa-\kappa_*=1/12$。観測に加えた二つの雑音が単純に平均されるのではなく、$p_j$ で重み付けされることが分かる。
<!-- solution-end -->

<a id="ex-pml2-21-b04"></a>

**問題 PML2-21-B04**
- Level: B
- 雑音なしで $s_*=1/2$、$Q=25/1024$ の観測がある。事前値 $s_0=1$、正則化重み $\alpha=Q$ としたとき、$\widehat s_\alpha$、$\widehat\kappa_\alpha$ と推定誤差を求めよ。また $Q=0$ に変えるとどうなるか述べよ。

<!-- solution-start -->
**詳細解答。** 雑音なしだから $\sum_jp_jy_j=Qs_*=Q/2$。分子 $Q/2+\alpha s_0=Q/2+Q=3Q/2$、分母 $Q+\alpha=2Q$ なので $\widehat s_\alpha=3/4$、$\widehat\kappa_\alpha=4/3$。逆係数の誤差は $3/4-1/2=1/4$、係数の誤差は $4/3-2=-2/3$。雑音がなくても $s_0\ne s_*$ によるバイアスが残る。$Q=0$ のとき $\alpha>0$ なので $\widehat s_\alpha=s_0=1$、$\widehat\kappa_\alpha=1$ となるが、観測は係数を全く区別しない。
<!-- solution-end -->

### Level C：追加実験による識別性と安定性

<a id="ex-pml2-21-c01"></a>

**問題 PML2-21-C01**
- Level: C
- 共通の $\kappa>0$ と未知の $a_1\in\mathbb R$ を使う二実験 $-\kappa u_1''=a_1$、$-\kappa u_2''=a_1+h$（既知の $h>0$）、零Dirichlet境界を考える。共通の内部点 $x_0$ で正確な観測 $y_1,y_2$ を得たとき、$(\kappa,a_1)$ を一意に求めよ。さらに $|e_i|\le\delta$ の雑音を付けた観測から係数を復元する際、真の差 $d=y_2-y_1>0$ に対し $\delta\le d/4$ なら係数誤差が $4h\phi(x_0)\delta/d^2$ 以下であることを証明せよ。$h$ を既知とする仮定を外すとどうなるかも述べよ。

<!-- solution-start -->
**詳細解答。** 一意解は $u_1=(a_1/\kappa)\phi$、$u_2=((a_1+h)/\kappa)\phi$ であり、共通の内部点では $\phi_0=\phi(x_0)>0$。差を取れば

$$
d=y_2-y_1=\frac{(a_1+h)-a_1}{\kappa}\phi_0
=\frac{h\phi_0}{\kappa}>0.
$$

従って $\kappa=h\phi_0/d$、さらに $y_1=(a_1/\kappa)\phi_0$ を用いて $a_1=\kappa y_1/\phi_0=hy_1/d$。この復元式は二観測から一意に定まり、許容組の単射性が従う。

雑音を入れると $\widehat d=(y_2+e_2)-(y_1+e_1)=d+(e_2-e_1)$。三角不等式により $|e_2-e_1|\le|e_2|+|e_1|\le2\delta$。$\delta\le d/4$ なら $\widehat d\ge d-2\delta\ge d/2>0$ なので $\widehat\kappa=h\phi_0/\widehat d$ は正かつ定義できる。よって

$$
\begin{aligned}
|\widehat\kappa-\kappa|
&=h\phi_0\left|\frac1{\widehat d}-\frac1d\right|\\
&=\frac{h\phi_0|e_2-e_1|}{d\,\widehat d}\\
&\le\frac{h\phi_0(2\delta)}{d(d/2)}
=\frac{4h\phi_0\delta}{d^2}.
\end{aligned}
$$

$h$ まで未知なら任意の $t>0$ について $(\kappa,a_1,h)\mapsto(t\kappa,ta_1,th)$ が二つの解をどちらも変えない。つまり観測写像が単射でなくなり、既知の外力差という識別の根拠が失われる。
<!-- solution-end -->

## 11. 何を区別して評価するか

同じ零Dirichletの簡単なPDEでも、既知外力 $a\ne0$ と内部観測があれば係数を一意に求められる。他方、外力も未知なら $(\kappa,a)\mapsto(t\kappa,ta)$ の曖昧さがあり、**全空間での解の観測と物理残差零を同時に満たしても**消えない。

観測点の配置は誤差増幅の大きさに関係し、正則化は安定化と引き換えに事前値へのバイアスを入れる。学習損失、モデルの識別可能性、ノイズに対する安定性、真の係数誤差は別々に報告する。次講では、係数を目的関数で調整するとき、**数値ソルバの内部で何を微分するか**を調べる。
