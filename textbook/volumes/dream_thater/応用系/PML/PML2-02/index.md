# PML2-02 forwardとinverseはどこで問題が変わるか

## 1. 方程式を解けることと、原因を推定できること

前講の[Dirichlet Poisson問題の解の構成](../PML2-01/index.md#thm-pml2-01-construction)では、右辺 $f$ を与えれば零境界条件の解 $u_f$ を構成できた。では、解の一部だけを測定して、未知の右辺を言い当てられるだろうか。

以下でプライム $u'$、$u''$ は空間変数 $x$ に関する一階・二階微分を表し、パラメータ $a,b$ に関する微分ではない。

例えば $-u''=2a$、$u(0)=u(1)=0$ なら、定数 $a$ を決めると $u(x)=a x(1-x)$ が決まる。逆に中央の値 $u(1/2)$ が分かれば $a=4u(1/2)$ と戻せる。しかし右辺にもう一つ未知数があると、中央一点の観測では見分けられない例が現れる。

この講義では、**順問題（forward problem）**を「未知の係数・外力などを指定して状態を求める問題」、**逆問題（inverse problem）**を「状態の観測から未知の係数・外力などを推定する問題」として区別する。一般の[観測写像と逆問題](../../../解析系/INV/INV1/index.md#def-inv1-forward-map)と[識別可能性](../../../解析系/INV/INV1/index.md#def-inv1-identifiability)は既習とし、ここではPDEの方程式、境界条件、観測位置を一つの計算で結ぶ。

## 2. パラメータから状態、状態から観測へ

本講の状態とはPDEを満たす関数 $u$、パラメータとはその右辺を指定する有限個の実数 $\theta$、観測とは指定点での関数値を集めた有限次元ベクトルである。観測を行う前に、状態が存在し一意である必要がある。

<a id="def-pml2-02-pipeline"></a>

<!-- formal-statement-start -->
> **定義（Poisson方程式のパラメータ・状態・観測の連鎖）**  
> 正整数 $d,m$、許容パラメータ集合 $\Theta\subset\mathbb R^d$、各 $\theta\in\Theta$ で指定される $f_\theta\in L^2(0,1)$、互いに異なるとは限らない内部観測点 $x_1,\ldots,x_m\in(0,1)$ を固定する。$u_\theta\in H_0^1(0,1)$ を
>
> $-u_\theta''=f_\theta$、$u_\theta(0)=u_\theta(1)=0$
>
> のエネルギー弱解とし、観測写像 $\mathcal G:\Theta\to\mathbb R^m$ を

$$
\mathcal G(\theta)=\bigl(u_\theta(x_1),\ldots,u_\theta(x_m)\bigr)
$$

> と定める。点の値は一次元の $H_0^1$ 関数の連続な代表元で評価する。
<!-- formal-statement-end -->

[Dirichlet Poisson問題の存在・一意性・安定性](../PML2-01/index.md#thm-pml2-01-energy)により、各 $f_\theta$ に対応する弱解は一意である。また[区間上の $H_0^1$ の零トレース表示](../../../解析系/GPDE/GPDE4/index.md#thm-gpde4-h01-trace-kernel-interval)によって、各解には連続な代表元がある。したがって上の点観測は意味を持つ。合成の順序は

$$
\theta\ \longmapsto\ f_\theta\ \longmapsto\ u_\theta\ \longmapsto\ \mathcal G(\theta)
$$

であり、**順問題は左から右へ進む**。逆問題は、観測ベクトル $y$ から $\mathcal G(\theta)=y$ を満たす $\theta$ を求める方向に進む。ただし途中の矢印を逆にできるとは限らない。

<!-- definition-example-start: def-pml2-02-pipeline -->
**定義の確認**。 $\Theta=\mathbb R$、$f_a(x)=2a$、観測点 $x_1=1/2$ を選ぶ。$f_a$ は定数なので $L^2(0,1)$ に属する。$u_a(x)=a x(1-x)$ は端点で零、$-u_a''=2a$ であり、[古典解はエネルギー弱解になる](../PML2-01/index.md#prop-pml2-01-classical-weak)により指定した弱解である。一意性から他の状態はない。点評価を実行すると

$$
\mathcal G(a)=u_a(1/2)=a/4.
$$

$\Theta$、データ $f_a$、解の空間と境界、観測点と観測値を一つずつ確かめた。
<!-- definition-example-end -->

**観測ノイズ。** 実測値は一般に $\mathcal G(\theta^\ast)$ そのものではない。真のパラメータ $\theta^\ast$ と観測誤差ベクトル $\eta\in\mathbb R^m$ に対し

$$
y^\delta=\mathcal G(\theta^\ast)+\eta,\qquad
\|\eta\|_2\le\delta
$$

と書く。ここで $\delta\ge0$ は測定誤差の大きさの上限であって、PDEの数値離散化誤差を含めた数字とは限らない。誤差を入れる場所は**状態の後、観測の段階**である。

## 3. 二つの未知数を持つ解を手で構成する

右辺に定数成分と位置依存成分を設ける。任意の $(a,b)\in\mathbb R^2$ について

$$
f_{a,b}(x)=2a+(6x-3)b
$$

とし、零Dirichlet Poisson問題 $-u''=f_{a,b}$ を解く。まず

$$
p(x)=x(1-x),\qquad
q(x)=x(1-x)(x-1/2)
$$

を作る。これはどちらも端点値が零になるように選んだ基底関数である。展開・微分すると

$$
\begin{aligned}
p(x)&=x-x^2,& -p''(x)&=2,\\
q(x)&=-x^3+\frac32x^2-\frac12x,&
-q''(x)&=6x-3.
\end{aligned}
$

さらに $0<x<1$ で $p(x)>0$ である。もし $cp+dq\equiv0$ なら、$p$ で割って $c+d(x-1/2)=0$ が全ての $x\in(0,1)$ で成り立つ。異なる二点での式を引けば $d=0$、従って $c=0$。よって $p,q$ は一次独立であり、その張る二次元の関数空間の基底を成す。

線形性により、候補

$
u_{a,b}(x)=a p(x)+b q(x)
$$

は

$$
-u_{a,b}''=2a+(6x-3)b=f_{a,b},\qquad
u_{a,b}(0)=u_{a,b}(1)=0
$$

を満たす。多項式は $C^2([0,1])$ に属するから古典解であり、[古典解はエネルギー弱解になる](../PML2-01/index.md#prop-pml2-01-classical-weak)と[弱解の一意性](../PML2-01/index.md#thm-pml2-01-energy)によって**この関数が定義された状態そのもの**である。

ここでは $\theta=(a,b)$ はPDEの右辺を動かす未知数である。PDEの最高階微分の係数を未知とする問題は別の逆問題であり、後のPML2-21で扱う。一般のPDE係数同定の条件を、この簡単な外力同定から主張するわけではない。

## 4. 一点では見分けられない、二点なら見分けられる

[INV1の識別可能性の定義](../../../解析系/INV/INV1/index.md#def-inv1-identifiability)を今のPDEへ適用する。すなわち許容集合 $\Theta=\mathbb R^2$ で、異なる $(a,b)$ が必ず異なる観測を生むかを調べる。

まず中央一点 $x=1/2$ では $p(1/2)=1/4$、$q(1/2)=0$ なので、

$$
\mathcal G_1(a,b)=u_{a,b}(1/2)=a/4.
$$

<a id="prop-pml2-02-single-point"></a>

<!-- formal-statement-start -->
> **命題（中央一点観測による非識別）**  
> $\Theta=\mathbb R^2$、$f_{a,b}=2a+(6x-3)b$、零Dirichlet境界条件、観測 $\mathcal G_1(a,b)=u_{a,b}(1/2)$ とする。順問題の解は各 $(a,b)$ で一意だが、$\mathcal G_1$ は単射でない。具体的に、任意の $a,b,t\in\mathbb R$ について

$$
\mathcal G_1(a,b)=\mathcal G_1(a,b+t)
$$

> が成り立つ。
<!-- formal-statement-end -->

**証明の見取り図。** 右辺と解には $b$ が現れるのに、中央では $q(1/2)=0$ となる。観測操作により $b$ 方向の情報が消える。

<!-- proof-start -->
### 証明

先に導いた状態 $u_{a,b}=ap+bq$ を中央で評価すると

$$
u_{a,b+t}(1/2)-u_{a,b}(1/2)=tq(1/2)
=t(1/2)(1-1/2)(1/2-1/2)=0.
$$

$t\ne0$ を選べば $(a,b+t)\ne(a,b)$ なのに観測は一致する。よって[識別可能性](../../../解析系/INV/INV1/index.md#def-inv1-identifiability)を欠く。一方、異なる $b$ は $f_{a,b+t}-f_{a,b}=t(6x-3)$ だけ右辺を変える。壊れているのは前講の順問題の一意性ではなく、点観測からパラメータへ戻る写像の単射性である。
<!-- proof-end -->

次に中央 $x_1=1/2$ と左寄り $x_2=1/4$ で観測する。§2の[パラメータ・状態・観測の連鎖](#def-pml2-02-pipeline)に従い、この二点での観測を $\mathcal G_2$ と書く。$u_{a,b}=ap+bq$ を各点で評価する操作は線形だから

$
\mathcal G_2(a,b)=a\mathcal G_2(1,0)+b\mathcal G_2(0,1),
$

$
\mathcal G_2(1,0)=\begin{pmatrix}1/4\\3/16\end{pmatrix},\qquad
\mathcal G_2(0,1)=\begin{pmatrix}0\\-3/64\end{pmatrix}.
$

この二つの列はパラメータ空間 $\mathbb R^2$ の標準基底 $(1,0)$、$(0,1)$ の像であり、任意の $(a,b)$ の観測はその線形結合になる。従って

$
\begin{pmatrix}y_1\\y_2\end{pmatrix}
=
\underbrace{\begin{pmatrix}
1/4&0\\
3/16&-3/64
\end{pmatrix}}_{A}
\begin{pmatrix}a\\b\end{pmatrix}.
$$

この**観測行列**は、パラメータ空間の標準基底 $(1,0)$、$(0,1)$ を、それぞれ二つの観測値へ送ったベクトルを列に並べたものだ。したがって行列の核が零であることと、上で述べた観測の識別可能性が同値になる。これは一般の[有限次元線形逆問題の三条件](../../../解析系/INV/INV1/index.md#thm-inv1-finite-linear)を、このPDEの解空間から導出した具体的表示で適用する場面である。

<a id="thm-pml2-02-two-point"></a>

<!-- formal-statement-start -->
> **定理（二点観測による外力パラメータの厳密復元）**  
> $a,b\in\mathbb R$、$-u''=2a+(6x-3)b$、$u(0)=u(1)=0$ とする。$y_1=u(1/2)$、$y_2=u(1/4)$ を誤差なく観測したとき、パラメータ $(a,b)$ は一意に決まり、次で復元される。

$$
a=4y_1,\qquad b=16y_1-\frac{64}{3}y_2.
$$
<!-- formal-statement-end -->

**証明の見取り図。** 最初の観測値から $a$ を先に求め、次に二番目の観測値から $b$ を解く。観測行列の行列式も非零になり、見分けるのに必要な情報が揃う。

<!-- proof-start -->
### 証明

先ほどの基底関数の値を代入すると、二つの観測方程式は

$$
y_1=\frac a4,\qquad
y_2=\frac{3a}{16}-\frac{3b}{64}.
$$

第一式から $a=4y_1$。第二式を整理する前にこの値を代入し、

$$
\frac{3b}{64}=\frac{3(4y_1)}{16}-y_2
=\frac34y_1-y_2.
$$

従って $b=16y_1-(64/3)y_2$。これがどんな $y\in\mathbb R^2$ にもただ一つの $(a,b)$ を与えるので、存在・一意性ともに示された。行列から確認しても

$$
\det A=\frac14\left(-\frac3{64}\right)-0=-\frac3{256}\ne0
$$

であり、[有限次元線形逆問題の三条件](../../../解析系/INV/INV1/index.md#thm-inv1-finite-linear)の可逆性条件と一致する。
<!-- proof-end -->

**復元の直接例。** $(a,b)=(2,-1)$ なら $(y_1,y_2)=(1/2,27/64)$。定理へ代入すると

$$
a=4(1/2)=2,\qquad
b=16(1/2)-\frac{64}{3}\frac{27}{64}
=8-9=-1.
$$

観測点・解の形・観測行列・復元式が同じ方程式の中で結び付いた。

## 5. ノイズがあると何が変わるか

ノイズ付き観測 $y^\delta=y+\eta$ から同じ復元式を計算すると、復元誤差 $\Delta a=\widehat a-a$、$\Delta b=\widehat b-b$ は

$$
\Delta a=4\eta_1,\qquad
\Delta b=16\eta_1-\frac{64}{3}\eta_2.
$$

例えば $|\eta_1|,|\eta_2|\le\delta$ なら

$$
|\Delta a|\le4\delta,\qquad
|\Delta b|\le\left(16+\frac{64}{3}\right)\delta
=\frac{112}{3}\delta.
$$

誤差は有限の係数で増幅される。二点観測の行列が固定される限り、逆問題も有限次元では安定である。これは[INV1の誤差増幅評価](../../../解析系/INV/INV1/index.md#thm-inv1-noise-amplification)と矛盾しない。ただし増幅率は観測点の配置に依存する。

中央 $x_1=1/2$ を保ち、第二点を $x_2=1/2+\varepsilon$ と動かす。ただし $0<|\varepsilon|<1/2$ とする。基底の値は

$$
p(x_2)=\frac14-\varepsilon^2,\qquad
q(x_2)=\left(\frac14-\varepsilon^2\right)\varepsilon.
$$

<a id="prop-pml2-02-placement"></a>

<!-- formal-statement-start -->
> **命題（観測点が接近したときの逆問題の誤差増幅）**  
> 上の二パラメータPoisson模型で $x_1=1/2$、$x_2=1/2+\varepsilon$、$0<|\varepsilon|<1/2$ を観測点とする。この二点観測は各固定 $\varepsilon$ について識別可能である。しかし第一観測の誤差を零、第二観測の誤差を $\eta_2$ とすると、復元した $b$ の誤差は

$$
\Delta b=\frac{\eta_2}{(\frac14-\varepsilon^2)\varepsilon}.
$$

> 特に $0<|\varepsilon|\le1/4$ では

$$
|\Delta b|\ge\frac{4|\eta_2|}{|\varepsilon|}.
$$

> よって観測点間隔が零に近づくと、第二観測の誤差を一定に保った場合の $b$ の復元誤差は発散する。
<!-- formal-statement-end -->

**証明の見取り図。** 中央は $a$ だけを観測する。もう一方が中央に近づくと、$b$ に掛かる係数 $q(x_2)$ が零へ近づき、それで割って復元する際に誤差が大きくなる。

<!-- proof-start -->
### 証明

観測行列は

$$
A_\varepsilon=
\begin{pmatrix}
1/4&0\\
1/4-\varepsilon^2&(\frac14-\varepsilon^2)\varepsilon
\end{pmatrix}.
$$

行列式は $(1/4)(1/4-\varepsilon^2)\varepsilon$。仮定 $0<|\varepsilon|<1/2$ から $\varepsilon\ne0$ かつ $1/4-\varepsilon^2>0$ であり、行列は可逆である。

$\eta_1=0$ なら $a=4y_1$ は変わらない。第二式の差を取ると

$$
\eta_2=(\tfrac14-\varepsilon^2)\Delta a+
(\tfrac14-\varepsilon^2)\varepsilon\Delta b
=(\tfrac14-\varepsilon^2)\varepsilon\Delta b.
$$

従って表示した復元誤差式を得る。$|\varepsilon|\le1/4$ では

$$
0<\tfrac14-\varepsilon^2\le\tfrac14,
\qquad
\frac1{|(\frac14-\varepsilon^2)\varepsilon|}
\ge\frac4{|\varepsilon|}.
$$

$\eta_2\ne0$ を固定して $\varepsilon\to0$ とすれば $|\Delta b|\to\infty$。$\varepsilon=0$ ではそもそも二観測は同じ点となり、単射性が失われる。
<!-- proof-end -->

**重要な区別。** [前講の順問題の安定性](../PML2-01/index.md#thm-pml2-01-energy)は、$f$ が変わったとき解 $u$ がどれほど変わるかの評価である。今の評価は、観測値が変わったとき原因 $(a,b)$ がどれほど変わるかを問う。同じ「安定」という言葉でも写像の向きとノルムが違う。順問題の安定性だけで逆問題の安定性は保証されない。

## 6. 観測が足りないときの正則化は何を選ぶか

一点観測 $y=a/4$ からは $b$ が見えなかった。推定の目的を明示する一つの方法は、観測への適合度に加えてパラメータの大きさを罰することである。ここでの**二乗正則化**は、観測とのずれにパラメータの大きさを罰する項を加え、データだけでは決まらない方向の値を選ぶ方法である。まず有限次元の式を直接解いて、その効果を確かめる。

正則化係数 $\lambda>0$ を固定し、

$$
J_\lambda(a,b)=\left(\frac a4-y\right)^2+\lambda(a^2+b^2)
$$

を最小化する。第一項は観測誤差の二乗、第二項は解の選択規則である。どちらも非負で、$b$ は第一項に現れない。

<a id="prop-pml2-02-regularized"></a>

<!-- formal-statement-start -->
> **命題（一点観測の二乗正則化が選ぶ値）**  
> $y\in\mathbb R$、$\lambda>0$ とする。上の $J_\lambda:\mathbb R^2\to\mathbb R$ の最小化解は一意で、

$$
(\widehat a_\lambda,\widehat b_\lambda)
=\left(\frac{4y}{1+16\lambda},0\right)
$$

> となる。真のパラメータが $(a^\ast,b^\ast)$ で観測ノイズが無い場合（$y=a^\ast/4$）、$\widehat a_\lambda=a^\ast/(1+16\lambda)$ であり、$\widehat b_\lambda=0$ は $b^\ast$ を一般には復元しない。
<!-- formal-statement-end -->

**証明の見取り図。** $b$ 方向の誤差項は $\lambda b^2$ だけなので最小値は $b=0$。$a$ について平方完成または一階微分で最小値を求める。

<!-- proof-start -->
### 証明

$J_\lambda$ の $b$ 依存部分は $\lambda b^2$ で、$\lambda>0$ により唯一の最小化点は $b=0$。残る関数を $j_\lambda(a)=(a/4-y)^2+\lambda a^2$ と置く。以下の $j_\lambda'(a)$ と $j_\lambda''(a)$ は **パラメータ $a$ に関する** 微分であり、§3の $p''(x),q''(x)$ の空間変数 $x$ に関する微分とは異なる。微分すると

$$
j_\lambda'(a)=2\left(\frac a4-y\right)\frac14+2\lambda a
=\left(\frac18+2\lambda\right)a-\frac y2,
$$

$$
j_\lambda''(a)=\frac18+2\lambda>0.
$$

従って唯一の停留点が大域最小値を取り、

$$
\widehat a_\lambda
=\frac{y/2}{1/8+2\lambda}
=\frac{4y}{1+16\lambda}.
$$

ノイズのない $y=a^\ast/4$ を代入すると $\widehat a_\lambda=a^\ast/(1+16\lambda)$。$b$ は観測に入らないため、観測値だけでは $b^\ast$ と $0$ を識別できない。正則化は解を選んだのであって失われた情報を測定したわけではない。
<!-- proof-end -->

**解釈。** 正則化の選択と物理的な真値の同定は区別する。$\lambda\to0$ としても $b$ の復元値は常に $0$ であり、真値が $b^\ast\ne0$ ならその差は残る。正則化の目的・ノイズの仮定・観測設計を同時に報告する必要がある。

## 7. 何を固定して forward と inverse を比較するか

この章の例から、問題の仕様を次のように読み分けられる。

| 項目 | 順問題 | 逆問題 |
| --- | --- | --- |
| 既知 | $(a,b)$、方程式、境界条件 | 方程式の形、境界条件、観測点と実測値 |
| 未知 | 関数 $u_{a,b}$ | $(a,b)$、および必要なら状態 |
| 必要な成立条件 | 状態の存在・一意性・連続依存 | 観測からの識別性・復元の安定性・ノイズモデル |
| 失敗の例 | 境界条件を欠くと状態が一意でない | 中央一点で $b$ が見えない、二点が接近すると誤差増幅 |
| 検査する誤差 | PDE残差・境界残差・解誤差 | 観測残差・パラメータ誤差・観測誤差の増幅 |

データをよく再現するだけでは、未知パラメータが正しく推定できたとはいえない。一点観測では、全ての $b$ に対して観測残差は零にできる。同時に、十分な観測があってもノイズに対する復元の精度は別途点検する。

## 8. 演習

<a id="ex-pml2-02-a01"></a>
### PML2-02-A01：順問題の一意解
- Level: A

$-u''=4$、$u(0)=u(1)=0$ の古典解を求め、前講のどの結果からその一意性が分かるか答えよ。

<!-- solution-start -->
**詳細解答。** $u''=-4$ を二回積分すると $u(x)=-2x^2+cx+d$。$u(0)=0$ より $d=0$、$u(1)=0$ より $c=2$ で、

$$
u(x)=2x(1-x).
$$

これは多項式なので $C^2$ に属し、$-u''=4$ と端点条件を満たす。[Dirichlet Poisson問題の存在・一意性・安定性](../PML2-01/index.md#thm-pml2-01-energy)と[古典解はエネルギー弱解になる](../PML2-01/index.md#prop-pml2-01-classical-weak)から、他の古典解も同じ弱解に等しく、解は一意である。
<!-- solution-end -->

<a id="ex-pml2-02-a02"></a>
### PML2-02-A02：一点の観測写像
- Level: A

$f_a(x)=2a$、零Dirichlet境界、観測点 $x=1/4$ のとき $\mathcal G(a)$ を求めよ。観測 $y=3/8$ から $a$ を復元せよ。

<!-- solution-start -->
**詳細解答。** $u_a(x)=ax(1-x)$ なので、観測点へ代入すると

$$
\mathcal G(a)=a\frac14\left(1-\frac14\right)=\frac{3a}{16}.
$$

$3a/16=3/8$ に $16/3$ を掛けて $a=2$。未知数が一つで観測係数 $3/16\ne0$ のため復元できる。
<!-- solution-end -->

<a id="ex-pml2-02-a03"></a>
### PML2-02-A03：観測が消す方向
- Level: A

$f_{a,b}=2a+(6x-3)b$ の零Dirichlet解を中央 $x=1/2$ だけで測る。$(a,b)=(1,2)$ と異なるが同じ観測を生む組を一つ挙げ、右辺は異なることを示せ。

<!-- solution-start -->
**詳細解答。** 例えば $(1,3)$ を取る。$u_{a,b}=ap+bq$ と $q(1/2)=0$ から、どちらも中央の値は $1/4$ で一致する。一方、右辺の差は

$$
f_{1,3}(x)-f_{1,2}(x)=(6x-3)(3-2)=6x-3,
$$

これは恒等的に零ではない。[一点観測の非識別命題](#prop-pml2-02-single-point)の $t=1$ に相当する。
<!-- solution-end -->

<a id="ex-pml2-02-a04"></a>
### PML2-02-A04：二点からの復元
- Level: A

中央と左四分点で $(y_1,y_2)=(1/2,27/64)$ を誤差なく測定した。$(a,b)$ を求め、右辺 $f_{a,b}$ を記せ。

<!-- solution-start -->
**詳細解答。** [二点復元定理](#thm-pml2-02-two-point)の観測点条件に一致するので、

$$
a=4(1/2)=2,\qquad
b=16(1/2)-\frac{64}{3}\frac{27}{64}=8-9=-1.
$$

右辺に戻せば

$$
f_{2,-1}(x)=4-(6x-3)=7-6x.
$$

復元値から $u_{2,-1}(1/2)=1/2$、$u_{2,-1}(1/4)=3(2)/16-3(-1)/64=27/64$ と再確認できる。
<!-- solution-end -->

<a id="ex-pml2-02-a05"></a>
### PML2-02-A05：観測ノイズの伝播
- Level: A

二点観測を $(y_1+\eta_1,y_2+\eta_2)$ に置き換える。$\eta_1=0$、$\eta_2=3/640$ のとき復元した $(a,b)$ の変化量を求めよ。

<!-- solution-start -->
**詳細解答。** 復元式の差を取ると

$$
\Delta a=4\eta_1=0,\qquad
\Delta b=16\eta_1-\frac{64}{3}\eta_2
=-\frac{64}{3}\frac3{640}=-\frac1{10}.
$$

小さい第二点の誤差が $b$ の推定に $64/3$ 倍で伝播する。符号は観測行列の $b$ 成分が負であることによる。
<!-- solution-end -->

<a id="ex-pml2-02-b01"></a>
### PML2-02-B01：解空間と観測行列を結ぶ
- Level: B

$p=x(1-x)$、$q=x(1-x)(x-1/2)$ を使い、$u=ap+bq$ が $-u''=2a+(6x-3)b$ の零Dirichlet古典解であることを微分から示せ。続いて $x_1=1/2$、$x_2=1/4$ における観測行列を、基底パラメータ $(1,0)$、$(0,1)$ の像から求めよ。

<!-- solution-start -->
**詳細解答。** $p=x-x^2$ だから $p''=-2$。$q=-x^3+(3/2)x^2-(1/2)x$ だから $q'=-3x^2+3x-1/2$、$q''=-6x+3$。従って

$$
-(ap+bq)''=-a(-2)-b(-6x+3)=2a+(6x-3)b.
$$

$p,q$ はともに $x=0,1$ で零、多項式なので $C^2$ に属する。[古典解の定義](../PML2-01/index.md#def-pml2-01-classical)に合う。$(a,b)=(1,0)$ では観測列 $(p(1/2),p(1/4))^\mathsf T=(1/4,3/16)^\mathsf T$。$(0,1)$ では $(q(1/2),q(1/4))^\mathsf T=(0,-3/64)^\mathsf T$。各列が標準基底の像だから

$$
A=\begin{pmatrix}1/4&0\\3/16&-3/64\end{pmatrix}.
$$

行列は仮定したパラメータ空間 $\mathbb R^2$ の標準基底で表した[観測写像](../../../解析系/INV/INV1/index.md#def-inv1-forward-map)である。
<!-- solution-end -->

<a id="ex-pml2-02-b02"></a>
### PML2-02-B02：観測位置を右側に変える
- Level: B

$u_{a,b}=ap+bq$ の観測点を $1/2$ と $3/4$ に変える。観測行列、行列式、$(a,b)$ の復元式を求めよ。左側の $1/4$ の場合と $b$ の符号が変わる理由も述べよ。

<!-- solution-start -->
**詳細解答。** $p(3/4)=(3/4)(1/4)=3/16$、$q(3/4)=p(3/4)(3/4-1/2)=3/64$。よって

$$
\begin{pmatrix}y_1\\y_2\end{pmatrix}
=\begin{pmatrix}1/4&0\\3/16&3/64\end{pmatrix}
\begin{pmatrix}a\\b\end{pmatrix},
\qquad
\det A=\frac3{256}\ne0.
$$

$y_1=a/4$ より $a=4y_1$。第二式から $3b/64=y_2-3a/16=y_2-3y_1/4$ なので、

$$
b=\frac{64}{3}y_2-16y_1.
$$

$q=x(1-x)(x-1/2)$ は中央をまたいで符号が変わる。右四分点の $q$ は $3/64$、左四分点では $-3/64$ だから、観測行列の第二列と復元式の符号が逆になる。
<!-- solution-end -->

<a id="ex-pml2-02-b03"></a>
### PML2-02-B03：二点が近づくとき
- Level: B

観測点が $1/2$ と $1/2+\varepsilon$、$0<|\varepsilon|<1/2$ であるとする。（1）観測行列とその行列式を求めよ。（2）第一観測にはノイズを入れず、第二観測に一定の $\eta_2\ne0$ を加えたとき、$\varepsilon\to0$ で $b$ の誤差がどうなるか示せ。

<!-- solution-start -->
**詳細解答。** $p(1/2+\varepsilon)=(1/2+\varepsilon)(1/2-\varepsilon)=1/4-\varepsilon^2$、$q(1/2+\varepsilon)=(1/4-\varepsilon^2)\varepsilon$。従って

$$
A_\varepsilon=\begin{pmatrix}
1/4&0\\
1/4-\varepsilon^2&(\frac14-\varepsilon^2)\varepsilon
\end{pmatrix},
\qquad
\det A_\varepsilon=\frac14(\frac14-\varepsilon^2)\varepsilon.
$$

指定範囲では行列式は非零である。第一観測の誤差が零なら $\Delta a=0$。第二式の誤差だけを引き算すると

$$
\eta_2=(\tfrac14-\varepsilon^2)\varepsilon\Delta b,
\qquad
|\Delta b|=\frac{|\eta_2|}{(\frac14-\varepsilon^2)|\varepsilon|}.
$$

分母の第一因子は $1/4$ に収束し、$|\varepsilon|\to0$ なので誤差は発散する。[観測位置の命題](#prop-pml2-02-placement)が示すのは、各固定 $\varepsilon$ の可逆性と一様に良い条件付けが別物ということである。
<!-- solution-end -->

<a id="ex-pml2-02-b04"></a>
### PML2-02-B04：正則化が作る偏り
- Level: B

中央一点でノイズなしに $y=1/4$ を測定した。真値は $(a^\ast,b^\ast)=(1,2)$ とする。$\lambda=1/16$ の二乗正則化 $J_\lambda$ を最小化し、観測残差、真値からの差を求めよ。なぜ解が一意でも真値を同定できないか説明せよ。

<!-- solution-start -->
**詳細解答。** [一点観測の正則化命題](#prop-pml2-02-regularized)に $y=1/4$、$\lambda=1/16$ を代入すると

$$
\widehat a=\frac{4(1/4)}{1+16(1/16)}=\frac12,
\qquad
\widehat b=0.
$$

観測モデルは $\mathcal G_1(a,b)=a/4$ なので残差は $\widehat a/4-y=1/8-1/4=-1/8$。真値との差は $(\widehat a-a^\ast,\widehat b-b^\ast)=(-1/2,-2)$。$\lambda>0$ による厳密凸性が最小化解を一意にしても、データは $b$ を一切含まない。データから区別できない $b$ を正則化が $0$ に選んだだけで、真の $2$ が推定できたわけではない。
<!-- solution-end -->

<a id="ex-pml2-02-c01"></a>
### PML2-02-C01：順問題・識別性・ノイズ・正則化の総合
- Level: C

右辺 $f_{a,b}=2a+(6x-3)b$、零Dirichlet境界、観測点 $x_1=1/2$、$x_2=1/4$ とし、真値 $(a^\ast,b^\ast)=(1,2)$ とする。

1. 状態関数と誤差のない観測ベクトルを求め、順問題の一意性を根拠付きで述べよ。
2. 第一観測のノイズは $0$、第二観測に $3/640$ を加える。二点復元値、パラメータ誤差、復元した右辺と真の右辺との差を求めよ。
3. 第二観測を捨てて中央一点だけを使うと、ノイズが零でもなぜ $b^\ast=2$ を同定できないか。$\lambda=1/16$ の $J_\lambda$ による復元値も求めよ。

<!-- solution-start -->
**詳細解答。**

**（1）状態と観測。** $p=x(1-x)$、$q=x(1-x)(x-1/2)$ の二階微分は $-p''=2$、$-q''=6x-3$ なので、

$$
u^\ast(x)=p(x)+2q(x),\qquad
-u^{\ast\prime\prime}=2+2(6x-3),\qquad
u^\ast(0)=u^\ast(1)=0.
$$

多項式なので $C^2$ に属する。[古典解はエネルギー弱解になる](../PML2-01/index.md#prop-pml2-01-classical-weak)と[存在・一意性](../PML2-01/index.md#thm-pml2-01-energy)より、これが一意の弱解である。基底の値を使うと

$$
y_1^\ast=1/4+2(0)=1/4,\qquad
y_2^\ast=3/16+2(-3/64)=3/16-3/32=3/32.
$$

**（2）二点復元と誤差。** ノイズ付き観測は $(1/4,\,3/32+3/640)$。[二点復元定理](#thm-pml2-02-two-point)に適用すると

$$
\widehat a=4(1/4)=1,
$$

$$
\begin{aligned}
\widehat b
&=16(1/4)-\frac{64}{3}\left(\frac3{32}+\frac3{640}\right)\\
&=4-2-\frac{64}{640}
=2-\frac1{10}=\frac{19}{10}.
\end{aligned}
$$

したがって $(\Delta a,\Delta b)=(0,-1/10)$。右辺の差は

$$
f_{\widehat a,\widehat b}(x)-f_{a^\ast,b^\ast}(x)
=2\Delta a+(6x-3)\Delta b
=-\frac1{10}(6x-3).
$$

観測ノイズの値をそのまま右辺の誤差と見なせないことが分かる。

**（3）観測不足と正則化。** 中央一点の値は $a/4$ で、$b$ に依存しない。[非識別命題](#prop-pml2-02-single-point)により $(1,2)$ と $(1,0)$ は同じ $1/4$ を生む。従って真の $b^\ast$ を観測だけから選べない。[正則化命題](#prop-pml2-02-regularized)を $y=1/4$、$\lambda=1/16$ へ適用すると

$$
(\widehat a,\widehat b)=\left(\frac{4(1/4)}{1+16/16},0\right)
=(1/2,0).
$$

最小化解の一意性と、物理的な未知パラメータの識別可能性は異なる。前者は正則化による選択規則の効果であり、後者は観測写像の情報量の性質である。
<!-- solution-end -->

## 9. 次の講へ

順問題の解が一意でも、逆問題は観測場所とパラメータ化で非識別になり得る。識別できてもノイズが増幅される場合があり、正則化は情報の欠損を自動的に埋めない。PML2-03ではまず古典的な離散数値解法を使い、PDEの状態を**実際にどう計算するか**を学ぶ。この章では連続な状態の正確な式を使ったが、数値計算では離散化誤差も別に加わる。
