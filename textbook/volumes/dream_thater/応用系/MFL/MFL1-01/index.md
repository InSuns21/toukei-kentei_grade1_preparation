# MFL1-01 多様体仮説・観測標本の数学模型

<!-- definition-example-audit: strict -->

## 1. 点群に「低次元の形」があるとは何か

画像の画素数が多いことは、画像の変化を指定する自由度も同じだけ多いことを意味しない。例えば半径 $R$ の円周上の点は二つの座標 $(x,y)$ で保存されるが、円を一周する角度一つで位置を指定できる。一方、有限個の点を眺めるだけでは、その点が本当に円上で生成されたかまでは分からない。

本章の問いは、**観測座標の数と、データを生成する幾何の次元とをどう区別するか**、さらに**観測のランダムさやノイズを何として仮定するか**である。近傍探索や接空間推定の算法に入る前に、何が真の対象で何が観測値かを固定する。

既習の[埋め込み部分多様体](../../../幾何系/GEO/GEO3/index.md#def-geo3-embedded-submanifold)を、Euclid 空間の中の滑らかな「形」として使う。[Riemann 計量と体積](../../../幾何系/GEO/GEO12/index.md#def-geo12-volume)は、埋め込みから誘導されるものを使う。確率側では[確率変数の分布](../../../解析系/F0/F0-00P1/index.md#def-f0-00p1-law)と[独立な確率変数](../../../解析系/F0/F0-00P3/index.md#def-f0-00p3-independent-random-variables)を既知とする。

### 三つの次元を取り違えない

観測値を格納する Euclid 空間の次元を $D$、滑らかな形の各点に必要な局所座標の数を $d$、学習者が作る低次元表現の座標数を $m$ とする。$m$ は推定方法の設計値であり、$d$ と一致する保証はない。

<a id="def-mfl1-01-dimensions"></a>

<!-- formal-statement-start -->
> **定義（観測次元・内在次元・表現次元）**  
> 整数 $D>d\ge1$、$m\ge1$ をとり、$M\subset\mathbb R^D$ を $d$ 次元の滑らかな埋め込み部分多様体とする。$D$ を観測空間の次元、$d$ を $M$ の内在次元と呼ぶ。任意の写像 $f:M\to\mathbb R^m$ の値を表現として使うとき、$m$ を表現次元と呼ぶ。$f$ は単射とも距離保存とも仮定しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl1-01-dimensions -->
**定義の確認**（円）。$M=S^1=\{(x,y)\in\mathbb R^2:x^2+y^2=1\}$ は $D=2$ の中の $d=1$ 次元部分多様体である。[正則値定理](../../../幾何系/GEO/GEO3/index.md#thm-geo3-regular-value)をレベル集合を定める関数 $H(x,y)=x^2+y^2$、値 $1$ に使う。$\nabla H=(2x,2y)$ は $S^1$ 上で零でないので $1$ は正則値で、次元は $2-1=1$ となる。

$f(x,y)=x$ とすれば $m=1$ だが、$f(0,1)=f(0,-1)=0$ で単射でない。**$m=d$ だけでは円の形を潰さず表せない**ことを、この二点が直接示す。
<!-- definition-example-end -->

## 2. 真の点と観測の確率模型

幾何の仮定だけでは、円周のどこから点が集まるかは指定されない。例えば同じ円であっても、右側に多く標本が出る場合と一様に出る場合とでは、有限標本の近傍距離は違う。そこで体積に対する確率密度を明示する。

埋め込みが誘導する内積は、接ベクトル $u,v\in T_xM$ に対する通常の Euclid 内積 $u\cdot v$ である。

局所座標領域 $U\subset\mathbb R^d$ から $M$ への滑らかなパラメータ表示を $F:U\to M$ とする。$t=(t^1,\ldots,t^d)$ の第 $a$ 成分で微分した座標接ベクトルを $\partial_aF=\partial F/\partial t^a$ と書く。このベクトル同士の Euclid 内積が、誘導計量を座標基底で表した行列の $(a,b)$ 成分である。[Riemann 体積形式の座標表示](../../../幾何系/GEO/GEO12/index.md#prop-geo12-volume-coordinate)から

$$
g_{ab}=\partial_aF\cdot\partial_bF,\qquad
dV_g=\sqrt{\det(g_{ab})}\,dt^1\cdots dt^d.
$$

と得られる。$F$ が局所的な埋め込みなので $\partial_1F,\ldots,\partial_dF$ は一次独立であり、$(g_{ab})$ はそれらの Gram 行列として正定値となる。したがって $\sqrt{\det(g_{ab})}$ は局所座標の小直方体を多様体上の $d$ 次元体積へ換算する正の係数である。これは周囲の $D$ 次元体積ではない。座標を替えても絶対 Jacobian を含めて同じ積分となるため、$dV_g$ を向きによらない正の体積測度として使う。

<a id="def-mfl1-01-clean-sample"></a>

<!-- formal-statement-start -->
> **定義（多様体上の独立同分布標本模型）**  
> $D>d\ge1$、$n\ge1$ とし、$M\subset\mathbb R^D$ を空でないコンパクトな境界なしの滑らかな $d$ 次元埋め込み部分多様体とする。誘導計量の体積測度を $dV_g$、非負で可測な関数 $p:M\to[0,\infty)$ を密度として、次を要求する。

$$
\int_M p(x)\,dV_g(x)=1,\qquad
P_X(A)=\int_{A\cap M}p(x)\,dV_g(x)
$$

> ここで $A\subseteq\mathbb R^D$ は Borel 集合とする。$X_1,\ldots,X_n$ が相互に独立で、各 $X_i$ の分布が $P_X$ であるとき、$(X_i)_{i=1}^n$ を真の点の独立同分布標本と呼ぶ。$M,p,D,d,n$ を模型の成分とする。$p$ が正であることや $M$ が連結であることは、この定義だけでは要求しない。
<!-- formal-statement-end -->

**$P_X$ は「点をどこから引くか」という母集団分布**であり、$X_1,\dots,X_n$ の散布図はその一回の標本である。[独立性と積分布の関係](../../../解析系/F0/F0-00P3/index.md#thm-f0-00p3-independence-product-law)に従い、各標本が同じ領域 $A$ に入る確率を $q=P_X(A)$ とすると、その全員が $A$ を避ける確率は $(1-q)^n$ となる。この計算を第4節で証明する。

<!-- definition-example-start: def-mfl1-01-clean-sample -->
**定義の確認**（半径 $R$ の円）。$R>0$、$F(\theta)=(R\cos\theta,R\sin\theta)$ とし、$0\le\theta<2\pi$ とする。一変数の場合の $F'(\theta)=dF/d\theta$ は、上の $\partial_1F$ と同じ接ベクトルである。したがって

$$
F'(\theta)=(-R\sin\theta,R\cos\theta),\qquad
g_{\theta\theta}=F'(\theta)\cdot F'(\theta)=R^2,\qquad
dV_g=\sqrt{R^2}\,d\theta=R\,d\theta.
$$

角度 $0$ と $2\pi$ は同じ点なので、この表示は継ぎ目を除いて局所座標として使い、全周の積分では重複する端点を二度数えない。円はコンパクト、境界なし、正則な一次元部分多様体であり、$D=2,d=1$ を満たす。

一様密度 $p=1/(2\pi R)$ を置けば

$$
\int_{S_R^1}p\,dV_g
=\int_0^{2\pi}\frac{1}{2\pi R}\,R\,d\theta=1.
$$

$\Theta_i$ を $[0,2\pi)$ 上で独立な一様角度とし $X_i=F(\Theta_i)$ とすれば、各 $X_i$ の分布は上記の $P_X$ と一致し、独立性も角度からの写像によって保たれる。したがって定義のすべての条件を直接満たす。
<!-- definition-example-end -->

### 同じ次元でも密度は違う

半径1の円で $p(F(\theta))=(1+\tfrac12\cos\theta)/(2\pi)$ とすれば、$\tfrac1{4\pi}\le p\le\tfrac3{4\pi}$ であり、積分は $1$ である。右半円 $-\pi/2<\theta<\pi/2$ の確率は

$$
\int_{-\pi/2}^{\pi/2}\frac{1+\frac12\cos\theta}{2\pi}\,d\theta
=\frac12+\frac1{2\pi}>\frac12.
$$

点が右に密集しても、真の $M$ と内在次元 $d$ は一様標本の場合と同じである。**サンプルの多さを曲率や次元の証拠と即断しない**ための最小例になる。

## 3. 円ではなくトーラスなら何が変わるか

円を二つ組み合わせると、二つの独立な角度で点を指定できる。立体的に描くドーナツ形をいったん離れ、次の $\mathbb R^4$ に入った積トーラスなら計量と確率を手計算できる。

$$
F(\theta,\varphi)=(\cos\theta,\sin\theta,\cos\varphi,\sin\varphi),
\quad (\theta,\varphi)\in[0,2\pi)^2.
$$

それぞれの角度について $2\pi$ の整数倍だけ異なる値を同一視して得る $S^1\times S^1$ の埋め込みである。ここでは $F_\theta=\partial F/\partial\theta$、$F_\varphi=\partial F/\partial\varphi$ と略記する。これらは上の $\partial_aF$ に対応し、具体的には

$$
F_\theta=(-\sin\theta,\cos\theta,0,0),\qquad
F_\varphi=(0,0,-\sin\varphi,\cos\varphi).
$$

両者は互いに直交し、どちらも長さ1なので、内積から作った Gram 行列と体積は

$$
(g_{ab})=\begin{pmatrix}1&0\\0&1\end{pmatrix},\qquad
\sqrt{\det g}=1,\qquad \operatorname{Vol}(M)=4\pi^2.
$$

ゆえに $p=1/(4\pi^2)$ は正規化され、二つの独立一様角度から $X_i=F(\Theta_i,\Phi_i)$ を作れば、$D=4,d=2$ の独立同分布標本模型を得る。出力側で $m=2$ の表現を選んだとしても、$[0,2\pi)^2$ の端点を単純な平面座標とみなすと周期境界が裂ける。局所自由度と大域的な埋め込みの存在を混同しないことが大切である。

## 4. 標本が「真の形」を覆うには

分布が $M$ 上にあっても、有限個の標本がすべての場所を通るわけではない。そもそも母集団はどの点の周りに正の確率を残しているのか。これを次で定義し、潜在多様体と一致する条件を調べる。

<a id="def-mfl1-01-support"></a>

<!-- formal-statement-start -->
> **定義（分布の支持集合）**  
> $P$ を $\mathbb R^D$ 上の Borel 確率測度とする。その支持集合を

$$
\operatorname{supp}(P)=
\{x\in\mathbb R^D:\ P(B_r(x))>0\ \text{for every }r>0\}
$$

> と定義する。$B_r(x)=\{y\in\mathbb R^D:\|y-x\|<r\}$ は開球である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl1-01-support -->
**定義の確認**。確率1で原点に一致する $X=0\in\mathbb R^2$ を考える。原点を中心とする任意の開球には $P(X=0)=1$ の確率がある。一方 $x\ne0$ に対して半径 $\|x\|/2$ の球には原点が入らず確率0である。よって $\operatorname{supp}(P_X)=\{0\}$。これは一点分布の支持であり、上の滑らかな多様体標本模型を満たすという主張ではない。
<!-- definition-example-end -->

<a id="prop-mfl1-01-support-equals-manifold"></a>

<!-- formal-statement-start -->
> **命題（正の密度をもつ真の分布の支持）**  
> [多様体標本模型](#def-mfl1-01-clean-sample)の $M$ が空でないコンパクトな境界なしの滑らかな $d$ 次元埋め込み部分多様体で $d\ge1$ とし、ある $c>0$ について $p(x)\ge c$ が $dV_g$ ほとんど至る所で成り立つとする。このとき

$$
\operatorname{supp}(P_X)=M.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$M$ はコンパクトだから閉集合であり、外側の点には確率0の小球がある。内側の点の小球は $M$ の非空な開部分を含む。局所座標で体積密度が正なので、そこには正の体積があり、密度の下界から正の確率を得る。

<!-- proof-start -->
### 証明

$x\notin M$ とする。コンパクト集合 $M$ は $\mathbb R^D$ で閉なので、ある $r>0$ で $B_r(x)\cap M=\varnothing$。定義の積分から $P_X(B_r(x))=0$、したがって $x\notin\operatorname{supp}(P_X)$。

逆に $x\in M$、$r>0$ とする。$B_r(x)\cap M$ は $M$ の空でない開近傍である。

[埋め込み部分多様体の局所座標](../../../幾何系/GEO/GEO3/index.md#def-geo3-embedded-submanifold)を $x$ の周りで選ぶ。その座標像の中に、閉包ごと座標領域に含まれる $\mathbb R^d$ の小開球 $U$ をとれる。対応する多様体の部分集合は $B_r(x)\cap M$ に含まれる。

誘導計量行列 $g(u)$ は各点で正定値かつ連続である。よって $U$ の閉包上で $\sqrt{\det g(u)}$ は正の下界 $a>0$ を持つ。

したがって $M$ の対応部分を $V$ と書けば、[体積座標公式](../../../幾何系/GEO/GEO12/index.md#prop-geo12-volume-coordinate)から

$$
P_X(B_r(x))\ge\int_Vp\,dV_g
\ge c\int_U\sqrt{\det g(u)}\,du
\ge ca\operatorname{Leb}_d(U)>0.
$$

任意の $r>0$ で正なので $x\in\operatorname{supp}(P_X)$。両方向を合わせて等式が示された。$\square$
<!-- proof-end -->

下界がなければ、$M$ の一部で $p=0$ となり、そこの小球が確率0になることがある。例えば円の左半分だけに密度を置けば、観測の支持は円全体とは限らない。

<a id="prop-mfl1-01-missing-region"></a>

<!-- formal-statement-start -->
> **命題（独立標本が領域を外す確率）**  
> [多様体標本模型](#def-mfl1-01-clean-sample)で、Borel 集合 $A\subseteq\mathbb R^D$ の確率を $q=P_X(A)\in[0,1]$ とする。$X_1,\ldots,X_n$ が相互に独立同分布なら、

$$
P(X_i\notin A\ \text{for all }1\le i\le n)=(1-q)^n.
$$
<!-- formal-statement-end -->

### 証明の見取り図

各点が $A$ の外に出る確率は $1-q$。[相互独立性](../../../解析系/F0/F0-00P3/index.md#def-f0-00p3-pairwise-mutual-independence)が、それらを掛け算できる根拠になる。

<!-- proof-start -->
### 証明

$E_i=\{X_i\notin A\}$ と置くと、同分布性から $P(E_i)=1-P_X(A)=1-q$。$E_i$ は $X_i$ のみで決まる事象なので、[相互独立性](../../../解析系/F0/F0-00P3/index.md#def-f0-00p3-pairwise-mutual-independence)により

$$
P\left(\bigcap_{i=1}^nE_i\right)=\prod_{i=1}^nP(E_i)
=\prod_{i=1}^n(1-q)=(1-q)^n.
$$

標本の従属性を許すと積へ分ける段階が成立しない。$\square$
<!-- proof-end -->

一様円周の全周の $1/4$ にあたる弧を $A$ とすれば $q=1/4$。$n=1$ では欠落確率 $3/4$、$n=4$ でも $(3/4)^4=81/256$ である。有限点群を見て穴があるように見えても、真の多様体に穴があるとは断定できない。

## 5. ノイズを足すと支持は何になるか

実測データには位置決定誤差が含まれる。ここで真の点 $X_i$ と観測 $Y_i$ を分ける。ノイズの分布を明示しないまま、観測点も元の $M$ に乗ると扱うことはできない。

<a id="def-mfl1-01-noisy-observation"></a>

<!-- formal-statement-start -->
> **定義（加法観測ノイズ模型）**  
> [多様体標本模型](#def-mfl1-01-clean-sample)の $X_1,\ldots,X_n\in\mathbb R^D$ に対し、$\mathbb R^D$ 値のノイズ変数 $\xi_1,\ldots,\xi_n$ を指定して

$$
Y_i=X_i+\xi_i,\qquad 1\le i\le n
$$

> を観測値とする。ノイズが真の標本と独立か、異なる $i$ 間で独立か、平均が零か、どの大きさかは**追加仮定**であり、この等式だけからは従わない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl1-01-noisy-observation -->
**定義の確認**。$\Theta_i$ を相互独立な $[0,2\pi)$ 上の一様角度とし、真の点 $X_i=(\cos\Theta_i,\sin\Theta_i)$、ノイズ $\xi_i=(a,0)$（一定、$a\ne0$）をとる。このとき $Y_i=(a+\cos\Theta_i,\sin\Theta_i)$。真の点列は前節の一様円周模型を満たし、和は $\mathbb R^2$ で定義され、観測分布は中心 $(a,0)$ の円に載る。このノイズは確率変数として退化分布だが、真の点から独立である。**非零ノイズが必ず観測を二次元全体へ広げるわけではない**。
<!-- definition-example-end -->

これと対照的に、正の分散を持つ等方 Gaussian（正規）ノイズを足すと、どんな小さい分散でも観測分布の支持が周囲の空間全体に広がる。ここで $\xi\sim N(0,\sigma^2I_D)$ は、$D$ 次元ベクトル $\xi=(\xi_1,\ldots,\xi_D)$ の成分が互いに独立で、各成分が平均 $0$、分散 $\sigma^2>0$ の正規分布に従うという記法である。$I_D$ は $D$ 次単位行列を表す。従って

$$
E[\xi_j]=0,\qquad
E[\xi_j\xi_k]=\begin{cases}\sigma^2&(j=k),\\0&(j\ne k)\end{cases}
$$

が成り立つ。これは、対角成分には分散が入り、独立な異なる成分間の共分散は零になるという意味である。

<a id="prop-mfl1-01-gaussian-support"></a>

<!-- formal-statement-start -->
> **命題（独立 Gaussian ノイズ後の支持）**  
> $X$ を $\mathbb R^D$ 値の任意の確率変数とする。$X$ と独立な $\xi\sim N(0,\sigma^2I_D)$、$\sigma>0$ をとり、$Y=X+\xi$ とする。このとき

$$
\operatorname{supp}(P_Y)=\mathbb R^D.
$$
<!-- formal-statement-end -->

### 証明の見取り図

Gaussian 密度は空間のすべての点で正である。$X=x$ の位置にどこへ中心を移しても、任意の非空開球へ入る条件付き確率が正になる。$x$ に関して平均しても正の値が残る。

<!-- proof-start -->
### 証明

任意の $y\in\mathbb R^D$ と $r>0$ を固定する。ノイズ密度

$$
\phi_\sigma(z)=(2\pi\sigma^2)^{-D/2}
\exp\left(-\frac{\|z\|^2}{2\sigma^2}\right)
$$

はすべての $z\in\mathbb R^D$ で厳密に正である。独立性から、$X=x$ を固定して計算した $Y=x+\xi$ が $B_r(y)$ に入る確率は

$$
h(x)=\int_{B_r(y)}\phi_\sigma(z-x)\,dz>0.
$$

積分領域は正の Euclid 体積を持ち、被積分関数は正なので不等号が成立する。[期待値の定義](../../../解析系/F0/F0-00P2A/index.md#def-f0-00p2a-expectation)で $X$ の分布について平均し、独立な和の分布を積分すれば

$$
P_Y(B_r(y))=E[h(X)]>0.
$$

最後の不等号は、正の可測関数 $h(X)$ が確率1で正なら期待値も正であることによる。$y,r$ は任意なので[支持集合の定義](#def-mfl1-01-support)から結論を得る。$\square$
<!-- proof-end -->

この命題が言うのは**観測分布の支持**であって、「真の低次元 $M$ が存在しない」ということではない。$\sigma$ が小さければ多くの点は $M$ の近くに集まるが、支持という数学的な性質は $\sigma=0$ と $\sigma>0$ の間で不連続に変わる。

### 共分散の階数も内在次元ではない

[共分散の定義](../../../解析系/F0/F0-00P3/index.md#def-f0-00p3-covariance-uncorrelated)を $D$ 次元確率ベクトル $Z=(Z_1,\ldots,Z_D)$ に成分ごとに適用する。$Z$ に有限二次モーメントがあれば、分散共分散行列は

$$
\operatorname{Cov}(Z)=E[(Z-E[Z])(Z-E[Z])^{\mathsf T}],\qquad
[\operatorname{Cov}(Z)]_{jk}=\operatorname{Cov}(Z_j,Z_k)
$$

である。従って任意の方向 $v\in\mathbb R^D$ について $v^{\mathsf T}\operatorname{Cov}(Z)v=\operatorname{Var}(v^{\mathsf T}Z)\ge0$。行列の正定値性を調べることは、すべての非零方向の分散が正かを調べることに対応する。

<a id="prop-mfl1-01-noisy-covariance"></a>

<!-- formal-statement-start -->
> **命題（等方ノイズ後の共分散）**  
> $X\in\mathbb R^D$ が有限の二次モーメントを持ち、$\xi\sim N(0,\sigma^2I_D)$、$\sigma>0$ が $X$ と独立なら、$Y=X+\xi$ に対し

$$
\operatorname{Cov}(Y)=\operatorname{Cov}(X)+\sigma^2I_D
$$

> であり、$\operatorname{Cov}(Y)$ は正定値で階数 $D$ を持つ。これは $M$ の内在次元 $d$ を表すという主張ではない。
<!-- formal-statement-end -->

### 証明の見取り図

中心化した和の二次形式を展開する。独立性とノイズ平均0で交差項が消え、$\sigma^2I_D$ はすべての非零方向に正の分散を足す。

<!-- proof-start -->
### 証明

$\mu=E[X]$ と置けば $E[Y]=\mu$。中心化した外積を展開すると

$$
\begin{aligned}
(Y-\mu)(Y-\mu)^{\mathsf T}
&=(X-\mu)(X-\mu)^{\mathsf T}+\xi\xi^{\mathsf T}\\
&\quad +(X-\mu)\xi^{\mathsf T}+\xi(X-\mu)^{\mathsf T}.
\end{aligned}
$$

[独立な確率変数の期待値因数分解](../../../解析系/F0/F0-00P3/index.md#thm-f0-00p3-expectation-factorization)を各成分 $X_j-\mu_j$ と $\xi_k$ に適用する。有限二次モーメントにより積は可積分で、独立性と $E[\xi]=0$ から

$$
E[(X_j-\mu_j)\xi_k]=E[X_j-\mu_j]E[\xi_k]=0
$$

となるので、交差項の行列期待値はともに零行列である。また先の正規ノイズの成分ごとの二次モーメントから $E[\xi\xi^{\mathsf T}]=\sigma^2I_D$。よって主張の共分散の式が得られる。任意の $v\ne0$ に対し

$$
v^{\mathsf T}\operatorname{Cov}(Y)v
=\operatorname{Var}(v^{\mathsf T}X)+\sigma^2\|v\|^2>0.
$$

したがって正定値であり、核が $\{0\}$ だから階数は $D$。$\square$
<!-- proof-end -->

しかもノイズがなくても、一様円周では $E[X]=0$、$\operatorname{Cov}(X)=\frac12I_2$ となり階数は2である。**大域的な共分散の階数 $\ne$ 局所的な内在次元**。後続の局所主成分分析（local principal component analysis; local PCA）がなぜ「局所」を必要とするのかも、この例から予想できる。

## 6. 何を学べて、何はまだ言えないか

本章では、真の $M$、その上の密度 $p$、独立標本 $X_i$、観測ノイズ $\xi_i$、観測 $Y_i$ を別の対象として扱った。次に見たいのは $Y_i$ しかない状況で、接方向・距離・密度などのどの性質をどんな仮定から回復できるかである。

- 真の $M$ が滑らかでも、交差線のような集合は交点で滑らかな埋め込み部分多様体とは限らない。
- $p$ の下界がなければ、真の $M$ の一部に標本が来る保証はない。
- 観測ノイズを足すと、$Y_i\in M$ という等式すら失われうる。
- $m=d$ は表現の情報保存を保証しない。$D,d,m,n$、密度とノイズの条件を個別に記録する必要がある。

これらは失敗談ではなく、推定定理が**どの仮定を必要とするか**を考えるための基礎である。

## 演習

### MFL1-01-A01 円の三つの次元
- Level: A
- 目安時間: 12分

$R=2$ の円 $M=\{(x,y):x^2+y^2=4\}\subset\mathbb R^2$ と $f(x,y)=x$ を考える。(1) $D,d,m$ を求めよ。(2) $f$ が単射でないことを明示的な二点で示せ。(3) 一様密度 $p$ を体積測度に関して求めよ。

<!-- solution-start -->
#### 詳細解答

(1) 周囲の座標は2個なので $D=2$。[正則値定理](../../../幾何系/GEO/GEO3/index.md#thm-geo3-regular-value)を $x^2+y^2=4$ に用いると勾配 $(2x,2y)\ne0$ で余次元1だから $d=1$。$f$ の値域は $\mathbb R$ なので $m=1$。

(2) $(0,2)$ と $(0,-2)$ は相異なる $M$ の点だが、両方の $f$ 値は0。よって単射でない。

(3) $F(\theta)=(2\cos\theta,2\sin\theta)$ の速度の長さは2であり、$dV_g=2d\theta$。全長 $\int_0^{2\pi}2d\theta=4\pi$ なので、定数密度を $c$ とすれば $4\pi c=1$。従って $p=1/(4\pi)$。
<!-- solution-end -->

### MFL1-01-A02 積トーラスの正規化
- Level: A
- 目安時間: 15分

$F(\theta,\varphi)=(\cos\theta,\sin\theta,\cos\varphi,\sin\varphi)$ で与える積トーラスについて、二本の座標接ベクトル・計量行列・体積要素を計算し、$D,d$ と一様密度を答えよ。

<!-- solution-start -->
#### 詳細解答

偏微分すると $F_\theta=(-\sin\theta,\cos\theta,0,0)$、$F_\varphi=(0,0,-\sin\varphi,\cos\varphi)$。内積は $F_\theta\cdot F_\theta=1$、$F_\varphi\cdot F_\varphi=1$、$F_\theta\cdot F_\varphi=0$。したがって $g=I_2$、$\sqrt{\det g}=1$。角度領域の面積は $(2\pi)^2=4\pi^2$ であり、$D=4,d=2$。定数 $p$ の正規化条件 $1=p\int_0^{2\pi}\int_0^{2\pi}d\theta d\varphi$ から $p=1/(4\pi^2)$。
<!-- solution-end -->

### MFL1-01-A03 非一様な円周密度
- Level: A
- 目安時間: 15分

単位円で角度 $\theta\in[-\pi,\pi)$ に対し $p(\theta)=(1+a\cos\theta)/(2\pi)$ とする。(1) $p$ が全角度で非負かつ正規化される $a$ の範囲を求めよ。(2) $a=1/2$ のとき右半円 $|\theta|<\pi/2$ の確率を求めよ。

<!-- solution-start -->
#### 詳細解答

(1) $\min_\theta(1+a\cos\theta)=1-|a|$ であり、非負性は $|a|\le1$ と同値。単位円の体積要素は $d\theta$ なので、$\int_{-\pi}^{\pi}p\,d\theta=(2\pi+a[\sin\theta]_{-\pi}^{\pi})/(2\pi)=1$。したがって $-1\le a\le1$。なお支持を全円とする十分条件 $p\ge c>0$ は $|a|<1$ の場合である。

(2) $a=1/2$ を代入して

$$
P(|\Theta|<\pi/2)
=\frac1{2\pi}\left([\theta]_{-\pi/2}^{\pi/2}+\frac12[\sin\theta]_{-\pi/2}^{\pi/2}\right)
=\frac{\pi+1}{2\pi}.
$$

これは $1/2+1/(2\pi)$ で、一様密度の $1/2$ より大きい。
<!-- solution-end -->

### MFL1-01-A04 定数ノイズは何を動かすか
- Level: A
- 目安時間: 12分

$X=(\cos\Theta,\sin\Theta)$、$\Theta$ は一様角度、$\xi=(0,3)$ とする。観測値 $Y=X+\xi$ の支持集合を求め、元の単位円と一致するか、観測の支持が $\mathbb R^2$ 全体になるかを判定せよ。

<!-- solution-start -->
#### 詳細解答

$Y=(\cos\Theta,3+\sin\Theta)$ だから $(Y_1)^2+(Y_2-3)^2=1$。どの点も中心 $(0,3)$ の円上にある。一様角度は任意の非空弧に正の確率を与えるので、その円上の任意の点の開球は正の確率を持つ。円の外の点の十分小さい開球には確率がない。よって[支持の定義](#def-mfl1-01-support)から支持は中心 $(0,3)$ の円全体である。中心 $(0,0)$ の元の円とは異なり、$\mathbb R^2$ 全体でもない。
<!-- solution-end -->

### MFL1-01-B01 弧の欠落と独立性
- Level: B
- 目安時間: 20分

単位円を四つの互いに重ならない等長弧へ分け、一様角度から $n$ 点を独立抽出する。

1. 指定弧が空になる確率を求めよ。
2. 四つの弧の少なくとも一つが空になる確率の上界を和事象評価で示せ。
3. 独立抽出の代わりに一つの角度を $n$ 回複製した場合、1 の答えはどう変わるか。

<!-- solution-start -->
#### 詳細解答

(1) 一つの弧へ入る確率は $q=(2\pi/4)/(2\pi)=1/4$。各抽出が弧を外す確率は $3/4$ であり、[欠落確率の命題](#prop-mfl1-01-missing-region)で $(3/4)^n$。

(2) 四つの弧がそれぞれ空になる事象を $E_j$ と書く。[可算劣加法性](../../../解析系/F0/F0-00P2A/index.md#thm-f0-00p2a-union-bound)から、有限和の場合として

$$
P(E_1\cup E_2\cup E_3\cup E_4)
\le\sum_{j=1}^{4}P(E_j)=4(3/4)^n.
$$

確率は1以下なので $\min\{1,4(3/4)^n\}$ と書いてもよい。$E_j$ 同士は独立とは限らず、その仮定は不要。

(3) すべて $X_i=X_1$ なら、指定弧が空になることは $X_1$ が弧を外すことと同じ。従って確率は $3/4$ のまま。積の公式が崩れる理由は標本間の独立性がないことである。
<!-- solution-end -->

### MFL1-01-B02 全階数でも内在次元は1
- Level: B
- 目安時間: 20分

$X=(\cos\Theta,\sin\Theta)$、$\Theta$ は $[0,2\pi)$ で一様、$\xi\sim N(0,\sigma^2I_2)$ が独立、$\sigma>0$ とする。(1) $E[X]$ と $\operatorname{Cov}(X)$ を求めよ。(2) $Y=X+\xi$ の共分散固有値を求めよ。(3) 固有値が二つとも正というだけでは $d=2$ と結論できない理由を述べよ。

<!-- solution-start -->
#### 詳細解答

(1) $E[\cos\Theta]=E[\sin\Theta]=0$。また

$$
E[\cos^2\Theta]=E[\sin^2\Theta]=\frac12,
\quad E[\cos\Theta\sin\Theta]=0
$$

は $\cos^2\theta=(1+\cos2\theta)/2$、$\sin^2\theta=(1-\cos2\theta)/2$、$\sin\theta\cos\theta=\sin2\theta/2$ を $0$ から $2\pi$ まで積分して得る。従って $E[X]=0$、$\operatorname{Cov}(X)=I_2/2$。

(2) [共分散の命題](#prop-mfl1-01-noisy-covariance)から $\operatorname{Cov}(Y)=(1/2+\sigma^2)I_2$。二つの固有値はともに $1/2+\sigma^2>0$。

(3) 真の $X$ は円周という一次元部分多様体上にあり $d=1$ だが、共分散行列はノイズを加える前から階数2である。共分散は周囲の座標方向への**大域的**な広がりを測るので、各点での局所自由度の数を直接示すものではない。
<!-- solution-end -->

### MFL1-01-B03 支持集合の仮定を外す
- Level: B
- 目安時間: 18分

単位円 $M=S^1$ で、$p(F(\theta))=1/\pi$（$-\pi/2<\theta<\pi/2$）、それ以外では0、とする。

1. 確率密度として正規化されているか。
2. $P_X$ の支持集合を求めよ。
3. [支持一致の命題](#prop-mfl1-01-support-equals-manifold)のどの仮定が使えなくなったか述べよ。

<!-- solution-start -->
#### 詳細解答

(1) 非負であり、単位円上 $dV_g=d\theta$ なので $\int_Mp\,dV_g=\int_{-\pi/2}^{\pi/2}(1/\pi)\,d\theta=1$。

(2) 右開半円では密度が $1/\pi>0$ なので、任意の点の小球は正の確率を持ち支持に入る。端点 $(0,1),(0,-1)$ も、どんな小球も右半円の短い弧と交わり正の確率を持つので支持に入る。左開半円の任意の点には右閉半円と交わらない十分小さな球があり、その確率は0。よって支持は $\{(x,y)\in S^1:x\ge0\}$ である。

(3) $p$ は左半円で0なので $p\ge c>0$ を全 $M$ のほとんど至る所で満たす $c$ が存在しない。命題の証明にある $\int_Vp\ge c\operatorname{Vol}(V)>0$ が左側の開領域で使えない。
<!-- solution-end -->

### MFL1-01-C01 観測分布だけでは真の円を同定できない
- Level: C
- 目安時間: 35分

$a>2$、$X_i=(\cos\Theta_i,\sin\Theta_i)$ とし、$\Theta_i$ は相互独立な一様角度とする。次の二つの模型を比較する。

- 模型 A：真の多様体 $M_A=S^1$、密度は一様、$\xi_i=(a,0)$、$Y_i=X_i+\xi_i$。
- 模型 B：真の多様体 $M_B=\{(x,y):(x-a)^2+y^2=1\}$、真の点 $X'_i=(a+\cos\Theta_i,\sin\Theta_i)$、ノイズ $\xi'_i=0$、$Y'_i=X'_i$。

1. 両方が[多様体標本模型](#def-mfl1-01-clean-sample)と[加法ノイズ模型](#def-mfl1-01-noisy-observation)を満たすことを検証せよ。
2. 任意の標本数 $n$ について、観測の同時分布が一致することを示せ。
3. それぞれの真の分布の支持と観測分布の支持を求め、何が観測だけから識別不能か説明せよ。
4. 模型 A のノイズを独立な $N(0,\sigma^2I_2)$ に変更したとき観測の支持がどう変わるか答えよ。

<!-- solution-start -->
#### 詳細解答

(1) $M_A,M_B$ はそれぞれ円を平行移動したコンパクトで境界のない一次元埋め込み部分多様体。周囲の次元は $D=2$、内在次元は $d=1$。どちらも角度表示の速度長が1で弧長測度 $d\theta$ を持ち、密度 $1/(2\pi)$ は積分1。$\Theta_i$ の独立性から両真の点列は独立同分布である。ノイズはどちらも一定ベクトルで、各 $Y_i=X_i+\xi_i$ の和が定義され、全ての条件を満たす。

(2) 同じ角度列を使った結合を考えると、すべての $i$ で

$$
Y_i=(a+\cos\Theta_i,\sin\Theta_i)=Y'_i.
$$

よって標本ベクトル $(Y_1,\ldots,Y_n)$ と $(Y'_1,\ldots,Y'_n)$ がこの結合では確率1で一致する。任意の Borel 集合の事象確率が等しくなるので同時分布も等しい。単一標本だけでなく任意の $n$ でも区別できない。

(3) [支持一致の命題](#prop-mfl1-01-support-equals-manifold)を、それぞれの正の一様密度に適用すれば $\operatorname{supp}(P_X)=M_A$、$\operatorname{supp}(P_{X'})=M_B$。観測は両方とも $M_B$ 上で一様だから $\operatorname{supp}(P_Y)=\operatorname{supp}(P_{Y'})=M_B$。$a>2$ なので二つの真の円は異なり、交わらない。ノイズの中心が未知なら、観測分布だけから真の中心や $M$ の位置は一意に決められない。

(4) 変更後のノイズは $\sigma>0$ の独立 Gaussian なので、[独立Gaussianノイズ後の支持](#prop-mfl1-01-gaussian-support)により $\operatorname{supp}(P_Y)=\mathbb R^2$。元の $M_A$ が一次元である事実とは矛盾しない。
<!-- solution-end -->

## 次に進む

本章で $D,d,m$、$M,p$、$X_i,Y_i$ を区別できるようになった。次章 MFL1-02 では、空間内の直線距離と多様体に沿う距離、接方向がどこまで異なるかを局所展開で調べる。有限標本からそれらを推定できるかは、さらにノイズと近傍の仮定を要する別の問いである。
