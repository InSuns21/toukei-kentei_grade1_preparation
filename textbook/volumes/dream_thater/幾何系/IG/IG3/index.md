# IG3 Divergence と局所幾何

[IG2 の Fisher--Rao 計量](../IG2/index.md#def-ig2-fisher-rao-metric)は、分布を動かす一つの方向の長さを与えました。一方、統計では「二つの分布がどれほど異なるか」を、向きのある量で比較することもあります。たとえば分布 $P$ を $Q$ で近似する損失と、$Q$ を $P$ で近似する損失は、一般に一致しません。

そこで、二点を比べる非対称な量の一方の点を少しずつ動かしてみます。二点が一致する場所では一次の変化が消え、最初の有意な項に Fisher 計量が現れます。この章では、有限の正確率モデルでその理由を検算し、正則な連続モデルへ移るための追加仮定を分離します。さらに一般の divergence が計量を生む条件と、$f$-divergence の二次近似を調べます。

<!-- definition-example-audit: strict -->

---

## 1. 分布間の隔たりには向きがある

分布 $P$ を基準として $Q$ の対数確率を評価すると、[カルバック・ライブラー情報量の定義](../../../解析系/F0/F0-00P7A/index.md#def-f0-00p7a-kl)により、共通支配測度 $\mu$ に関する密度 $p,q$ に対して

$$
D_{\mathrm{KL}}(P\Vert Q)
=\int p(x)\log\frac{p(x)}{q(x)}\,d\mu(x)
$$

を得ます。以下ではこれを **KL divergence** と呼び、特に断らなければ自然対数を使います。有限標本空間 $\mathcal X=\{1,\ldots,m\}$ の正の分布 $p=(p_x)$、$q=(q_x)$ なら積分は有限和

$$
D_{\mathrm{KL}}(p\Vert q)
=\sum_{x=1}^m p_x\log\frac{p_x}{q_x}
$$

です。この式で分母が $q_x$ なのは、**第1引数 $p$ の下で**対数比を平均するからです。

一般の分布では $p=0$ の点の被積分項を0と解釈します。$P\not\ll Q$ なら KL divergence を $+\infty$ と定め、$P\ll Q$ でも積分が発散すれば $+\infty$ とします。実際、$t=p/q$ に対して $-t\log t\le1/e$ を使えば被積分項の負の部分は積分可能なので、値が $-\infty$ になることはありません。

正の有限分布について、$\log t\le t-1$ を $t=q_x/p_x$ に代入すると

$$
\begin{aligned}
D_{\mathrm{KL}}(p\Vert q)
&=-\sum_xp_x\log\frac{q_x}{p_x}\\
&\ge\sum_xp_x\left(1-\frac{q_x}{p_x}\right)
=\sum_x(p_x-q_x)=0.
\end{aligned}
$$

$\log t=t-1$ の等号は $t=1$ に限るため、正の有限分布では $D_{\mathrm{KL}}(p\Vert q)=0$ と $p=q$ が同値です。連続モデルでも同じ考え方で非負性が従いますが、等号を密度のほとんど至る所での一致と解釈します。

### Bernoulli 族では入れ替えると変わる

$X\in\{0,1\}$、$P_p(X=1)=p$、$0<p<1$ とします。$P_p$ と $P_q$ の KL divergence は

$$
K(p,q)=p\log\frac pq+(1-p)\log\frac{1-p}{1-q}.
$$

たとえば $p=1/5$、$q=1/2$ なら

$$
K(1/5,1/2)=\frac15\log\frac25+\frac45\log\frac85,
$$

$$
K(1/2,1/5)=\frac12\log\frac52+\frac12\log\frac58
=\frac12\log\frac{25}{16}.
$$

両者はそれぞれ約 $0.193$、$0.223$ で異なります。KL divergence は非負で対角線上で0ですが、対称な距離でも三角不等式を備えた距離でもありません。その非対称性が、次の局所計算でどこまで残るかを調べます。

---

## 2. 二点を近づけると Fisher 計量が現れる

まず[IG1 の正の有限確率モデル](../IG1/index.md#def-ig1-finite-parametrization) $\theta\mapsto p(\theta)$ を考えます。$\Theta\subset\mathbb R^d$ は開集合、全 $p_x(\theta)>0$、各 $p_x$ は $C^2$ とします。$\delta\in\mathbb R^d$ を十分小さくして $\theta+\delta\in\Theta$ とします。

第1引数を固定し、第2引数を動かす関数

$$
F_\theta(\eta)
=D_{\mathrm{KL}}(p(\theta)\Vert p(\eta))
=\sum_xp_x(\theta)[\log p_x(\theta)-\log p_x(\eta)]
$$

を作ります。$\eta=\theta$ は最小点なので一次微分は0のはずです。実際に微分することが、二次項の係数を見つける最短の道です。

ここでは $\theta$ を固定し、第2引数 $\eta=(\eta^1,\ldots,\eta^d)$ だけを動かします。$\partial_{\eta^i}$ は $\eta^i$ に関する偏微分です。[IG1 で導入した座標偏微分](../IG1/index.md#def-ig1-directional-score)で表した $\partial_i p_x(\theta)$ や $\partial_{ij}\log p_x(\theta)$ は、同じパラメータの関数を対角線で評価したものです。具体的な対応は

$$
\left.\partial_{\eta^i}\log p_x(\eta)\right|_{\eta=\theta}
=\partial_i\log p_x(\theta)
$$

であり、左辺では $\theta$ を固定したまま微分してから対角線へ戻します。

<a id="thm-ig3-kl-fisher-hessian"></a>
<!-- formal-statement-start -->
> **定理（KL divergence の二次近似と Fisher 計量）**  
> $\Theta\subset\mathbb R^d$ を開集合とし、$p:\Theta\to\Delta_{m-1}^{\circ}$ を $C^2$ の有限正パラメータ表示とする。$G(\theta)$ を [Fisher 情報行列](../IG2/index.md#def-ig2-fisher-information) とすると、固定した $\theta\in\Theta$ に対して

$$
D_{\mathrm{KL}}(p(\theta)\Vert p(\theta+\delta))
=\frac12\delta^{\mathsf T}G(\theta)\delta
+o(\|\delta\|^2)
\qquad(\delta\to0).
$$

> 特に、$\eta$ に関する定数項は0、一次項は0、$\eta=\theta$ での二階微分行列は $G(\theta)$ である。$p$ が浸入ならこの二次形式は正定値である。
<!-- formal-statement-end -->

**証明の見取り図**：最初に $F_\theta(\theta)=0$ を確認し、$\partial_{\eta^i}F_\theta$ を計算します。二階微分は対数確率の Hessian の期待値となります。$\sum_xp_x=1$ を二回微分すると、対数 Hessian の期待値がスコア積の期待値へ置き換わります。

<!-- proof-start -->
### 証明

全ての $p_x$ は正の $C^2$ 関数なので $\ell_x(\eta)=\log p_x(\eta)$ も $C^2$ です。有限和は自由に微分でき、$F_\theta(\theta)=\sum_xp_x(\theta)\log1=0$ です。第2引数で微分すると

$$
\partial_{\eta^i}F_\theta(\eta)
=-\sum_xp_x(\theta)\partial_{\eta^i}\ell_x(\eta).
$$

対角線 $\eta=\theta$ では $p_x\partial_i\ell_x=\partial_i p_x$ だから

$$
\partial_{\eta^i}F_\theta(\theta)
=-\sum_x\partial_i p_x(\theta)
=-\partial_i\sum_xp_x(\theta)=0.
$$

続いて

$$
\partial_{\eta^j}\partial_{\eta^i}F_\theta(\theta)
=-\sum_xp_x(\theta)\partial_{ij}\ell_x(\theta).
$$

ここで積の微分を一段ずつ行うと

$$
\partial_{ij}p_x
=\partial_j(p_x\partial_i\ell_x)
=(\partial_jp_x)\partial_i\ell_x+p_x\partial_{ij}\ell_x
=p_x(\partial_j\ell_x\partial_i\ell_x+\partial_{ij}\ell_x).
$$

成分ごとに和を取り、$\partial_{ij}\sum_xp_x=0$ を使えば

$$
-\sum_xp_x\partial_{ij}\ell_x
=\sum_xp_x(\partial_i\ell_x)(\partial_j\ell_x)
=g_{ij}(\theta).
$$

したがって $F_\theta$ の $\eta=\theta$ における Hessian は $G(\theta)$ です。$F_\theta$ は $C^2$ なので、二次の Taylor 展開（展開点 $\eta=\theta$、評価点 $\eta=\theta+\delta$）から

$$
F_\theta(\theta+\delta)
=F_\theta(\theta)+\sum_i\partial_iF_\theta(\theta)\delta^i
+\frac12\sum_{i,j}\partial_{ij}F_\theta(\theta)\delta^i\delta^j
+o(\|\delta\|^2)
=\frac12\sum_{i,j}g_{ij}(\theta)\delta^i\delta^j
+o(\|\delta\|^2).
$$

浸入の場合の正定値性は [IG2 の非退化条件](../IG2/index.md#thm-ig2-positive-definiteness)から従います。
<!-- proof-end -->

この定理の2次項は $\delta$ の向きを反転しても同じです。KL divergence の非対称性は**2次項には現れません**。さらに三階まで滑らかなら差は3次以降に現れ得ますが、$C^2$ だけでは3次の係数も、その次数の剰余評価も主張できません。

### 定義の数字で確かめる：Bernoulli 族

$0<p<1$、$p+\delta\in(0,1)$ として

$$
K(p,p+\delta)
=-p\log\left(1+\frac\delta p\right)
-(1-p)\log\left(1-\frac\delta{1-p}\right).
$$

$\log(1+t)=t-t^2/2+o(t^2)$ をそれぞれ $t=\delta/p$、$t=-\delta/(1-p)$ に適用すると

$$
\begin{aligned}
K(p,p+\delta)
&=-p\left(\frac\delta p-\frac{\delta^2}{2p^2}\right)
-(1-p)\left(-\frac\delta{1-p}-\frac{\delta^2}{2(1-p)^2}\right)
+o(\delta^2)\\
&=(-\delta+\delta)
+\frac{\delta^2}{2}\left(\frac1p+\frac1{1-p}\right)+o(\delta^2)\\
&=\frac{\delta^2}{2p(1-p)}+o(\delta^2).
\end{aligned}
$$

係数は [Bernoulli 族の Fisher 情報量](../IG2/index.md#def-ig2-fisher-information)の半分です。$p=1/2$ なら $K(1/2,1/2+\delta)=2\delta^2+o(\delta^2)$ です。

### 連続モデルでは何を追加するか

[IG1 の幾何学的正則支配モデル](../IG1/index.md#def-ig1-geometric-regularity)では、一階の微分と積分の交換とスコアの二乗可積分性を仮定しました。それだけでは **二階の対数微分を積分できること** や、KL divergence を第2引数で二回微分できることは保証されません。

共通の正の台を持つ密度 $p(x;\theta)$ が $\theta$ に関して $C^2$ で、さらに各固定 $\theta$ の近傍で次を仮定します。

1. $\partial_i p$、$\partial_{ij}p$ を $\mu$ 積分と交換でき、$\int\partial_i p\,d\mu=\int\partial_{ij}p\,d\mu=0$ である。
2. $p_\theta(x)\partial_{\eta^i}\log p_\eta(x)$ と $p_\theta(x)\partial_{\eta^i\eta^j}\log p_\eta(x)$ は、$\eta$ が $\theta$ の近傍を動く間、積分可能な関数で一様に支配される。
3. スコアの各積は $P_\theta$ の下で可積分で、$F_\theta(\eta)=D_{\mathrm{KL}}(P_\theta\Vert P_\eta)$ は近傍で有限・$C^2$ である。

このとき有限和を積分に置き換えた同じ計算が使えます。特に

$$
\begin{aligned}
0&=\int\partial_{ij}p_\theta\,d\mu\\
&=E_\theta[\partial_{ij}\ell_\theta+S_iS_j],\\
\partial_{\eta^i\eta^j}F_\theta(\theta)
&=-E_\theta[\partial_{ij}\ell_\theta]
=E_\theta[S_iS_j].
\end{aligned}
$$

正規位置族など共通台で Gaussian 型の支配関数を作れるモデルは、この条件を検証できる代表例です。逆に台が変わるモデルには、後で扱うように別の注意が必要です。

---

## 3. 特定の距離関数を離れ、一般の divergence を見る

KL divergence に限らず、二点が一致すると0になり、離れると非負になる滑らかな関数を考えます。ここでは「距離」とは呼びません。非対称でも三角不等式がなくてもよいからです。[IG2 で導入した二方向の内積の行列表示](../IG2/index.md#def-ig2-fisher-information)にならい、二点の関数の混合微分から双線形形式を作ります。

二つの点 $\theta=(\theta^1,\ldots,\theta^d)$、$\eta=(\eta^1,\ldots,\eta^d)$ を独立に動かすため、微分を

$$
\partial_i=\frac{\partial}{\partial\theta^i},
\qquad \partial'_j=\frac{\partial}{\partial\eta^j}
$$

と書き分けます。第1引数の微分では $\eta$ を、第2引数の微分では $\theta$ を固定します。

<a id="def-ig3-smooth-divergence"></a>
<!-- formal-statement-start -->
> **定義（滑らかな局所 divergence）**  
> $\Theta\subset\mathbb R^d$ を開集合とする。$\Theta\times\Theta$ 上の非負関数 $D(\theta,\eta)$ が $D(\theta,\theta)=0$ を満たし、対角線の近傍で $C^2$ 級なら、ここでは **滑らかな局所 divergence** と呼ぶ。第1引数の微分を $\partial_i$、第2引数の微分を $\partial'_j$ と書く。対角線上で定まる双線形形式の成分を

$$
g^D_{ij}(\theta)
=-\left.\partial_i\partial'_jD(\theta,\eta)\right|_{\eta=\theta}
$$

> と置く。正定値である場合には $D$ が **局所計量を誘導する** という。
<!-- formal-statement-end -->

この成分から方向 $u=(u^i)$、$v=(v^j)$ に対する双線形形式を作る手順は、[IG2 の Fisher 情報行列と二方向の内積](../IG2/index.md#def-ig2-fisher-information)と同じです。標準座標基底 $e_i,e_j$ の値が $g^D_{ij}$ であり、任意の方向では

$$
B^D_\theta(u,v)=\sum_{i,j=1}^d u^i g^D_{ij}(\theta)v^j,
\qquad G^D(\theta)=(g^D_{ij}(\theta))_{i,j=1}^d
$$

となります。ここで正定値とは、全ての $u\ne0$ に対し $B^D_\theta(u,u)>0$ となることです。したがって、定義の確認では $D$ の非負性・対角線上の零・$C^2$ 性に加え、この二次形式の正定値性を調べます。

なぜ「混合微分」に負号を付けるのでしょうか。単純な関数 $D(\theta,\eta)=\tfrac12(\theta-\eta)^2$ では

$$
\partial_\theta\partial_\eta D=-1,
\qquad g^D=1>0
$$

となり、対角線からのずれの正の二乗係数が現れます。一方 $D=(\theta-\eta)^4$ は非負かつ対角線以外で正ですが、混合二階微分は対角線で0です。**divergence であるだけでは正定値な計量は保証されません**。

<!-- definition-example-start: def-ig3-smooth-divergence -->
**定義の確認**

$\Theta=\mathbb R$、$D(\theta,\eta)=(\theta-\eta)^2/2$ を考えます。任意の二点で非負、対角線では0、二変数の多項式なので $C^2$ です。一変数ずつなので $\partial'_\eta=\partial/\partial\eta$、$\partial_\theta=\partial/\partial\theta$ と書きます。第2引数で微分してから第1引数で微分すると

$$
\partial'_\eta D=\eta-\theta,
\qquad \partial_\theta\partial'_\eta D=-1,
\qquad g^D=1.
$$

したがって任意の非零方向 $u$ で $B^D_\theta(u,u)=u^2>0$ となり、定義の全条件を満たします。
<!-- definition-example-end -->

<a id="thm-ig3-mixed-hessian"></a>
<!-- formal-statement-start -->
> **定理（divergence の混合二階微分と局所計量）**  
> $\Theta\subset\mathbb R^d$ 上の滑らかな局所 divergence $D$ に対し、$g^D$ は対称・半正定値であり、

$$
g^D_{ij}(\theta)
=\left.\partial'_i\partial'_jD(\theta,\eta)\right|_{\eta=\theta}.
$$

> さらに $D(\theta,\eta)=D_{\mathrm{KL}}(p(\theta)\Vert p(\eta))$ で、有限正 $C^2$ モデル（または第2節の連続モデルの追加仮定）の下では $g^D=G$ である。$p$ が浸入なら有限モデルの $g^D$ は正定値となる。
<!-- formal-statement-end -->

**証明の見取り図**：対角線上は第2引数を動かしたときの最小点なので第1微分が0です。この恒等式を、対角線上で両引数を同時に動かして微分すると、混合 Hessian と第2引数の Hessian が符号を変えて等しくなります。

<!-- proof-start -->
### 証明

固定した $\theta$ で $\eta\mapsto D(\theta,\eta)$ は $\eta=\theta$ に局所最小値0を持つため、各 $j$ で $\partial'_jD(\theta,\theta)=0$ です。この関数を $\theta^i$ で微分し、対角写像 $\theta\mapsto(\theta,\theta)$ の連鎖律を用いると

$$
0=\frac{d}{d\theta^i}\bigl[\partial'_jD(\theta,\theta)\bigr]
=\left.(\partial_i\partial'_jD+\partial'_i\partial'_jD)\right|_{\eta=\theta}.
$$

よって $g^D_{ij}=\partial'_i\partial'_jD|_{\eta=\theta}$ です。二階連続微分可能性より $i,j$ の交換ができ、$g^D$ は対称です。また任意の $u\in\mathbb R^d$ について $t\mapsto D(\theta,\theta+tu)$ の $t=0$ は最小点なので

$$
0\le\left.\frac{d^2}{dt^2}D(\theta,\theta+tu)\right|_{t=0}
=\sum_{i,j}u^iu^jg^D_{ij}(\theta).
$$

KL の場合は[KL 二次近似の定理](#thm-ig3-kl-fisher-hessian)で求めた第2引数の Hessian が $G$ なので一致し、浸入の場合の正定値性は[IG2 の非退化条件](../IG2/index.md#thm-ig2-positive-definiteness)から従います。
<!-- proof-end -->

### 座標を替えても同じ二次形式になる

局所微分同相 $\theta=\psi(u)$ を用い、$\widetilde D(u,v)=D(\psi(u),\psi(v))$ と置きます。$u,v$ はそれぞれ旧座標の $\theta,\eta$ に対応し、混合微分の際には片方を固定します。そのため第1引数を $u^a$ で、第2引数を $v^b$ で一度ずつ微分しても、二階の $\psi$ に由来する余分な項は出ません。$J^i{}_a(u)=\partial\psi^i(u)/\partial u^a$ と書けば

$$
\begin{aligned}
-\left.\partial_{u^a}\partial_{v^b}\widetilde D(u,v)\right|_{v=u}
&=-\sum_{i,j}J^i{}_a(u)J^j{}_b(u)
\left.\partial_i\partial'_jD(\theta,\eta)\right|_{\eta=\theta}\\
&=\sum_{i,j}J^i{}_a g^D_{ij}J^j{}_b.
\end{aligned}
$$

これは [IG2 の計量変換則](../IG2/index.md#thm-ig2-coordinate-invariance)と同じ形の $\widetilde G^D=J^{\mathsf T}G^DJ$ です。ここで $G^D$ は一般の divergence から作った行列であり、KL divergence の場合に限って Fisher 行列 $G$ と一致します。二点の比較という見方から始めても、局所的には座標に依存しない二次形式が得られました。

---

## 4. 別の divergence でも Fisher 計量が出るか

有限正分布 $p,q$ に対し、確率比 $p_x/q_x$ に関数 $f$ を適用して $q_x$ で平均する操作を考えます。KL divergence の場合は $f(t)=t\log t$ です。ただしこの $f$ の導関数は $f'(1)=1$ なので、局所計算では1次の線形項を引いて正規化すると便利です。

<a id="def-ig3-f-divergence"></a>
<!-- formal-statement-start -->
> **定義（有限正分布の f-divergence）**  
> $m\ge2$、$p,q\in\Delta_{m-1}^{\circ}$、$f:(0,\infty)\to\mathbb R$ を[凸関数](../../../応用系/OPT/OPT1/index.md#def-opt1-convex-function)で $f(1)=0$ を満たすものとする。**f-divergence** を

$$
D_f(p\Vert q)=\sum_{x=1}^m q_x f\left(\frac{p_x}{q_x}\right)
$$

> と定義する。$f$ が1の近傍で微分可能なら、$f(t)$ を $f(t)-f'(1)(t-1)$ に置き換えても $D_f$ は変わらない。以後の二次近似では $f'(1)=0$ に正規化する。
<!-- formal-statement-end -->

ここで非負性を確かめましょう。[凸関数の定義](../../../応用系/OPT/OPT1/index.md#def-opt1-convex-function)を二点の凸結合に適用し、有限個の項へ帰納的に繰り返します。重み $q_x>0$、比 $r_x=p_x/q_x>0$ に対し、最後の一項を除いた重みの和と加重平均を

$$
s=1-q_m>0,
\qquad
\bar r=\frac{\sum_{x<m}q_xr_x}{s}
$$

と置きます。二点の凸性から

$$
f\left(\sum_xq_xr_x\right)
=f(s\bar r+q_mr_m)
\le sf(\bar r)+q_mf(r_m)
\le\sum_xq_xf(r_x)
$$

となります。最後の不等式は、$m-1$ 個の重み $q_x/s$ に帰納法の仮定を適用したものです。よって

$$
D_f(p\Vert q)\ge f\left(\sum_xq_x\frac{p_x}{q_x}\right)
=f(1)=0.
$$

また線形項を除いても $\sum_x q_x(p_x/q_x-1)=\sum_x(p_x-q_x)=0$ なので同じ値です。KL では $f(t)=t\log t-(t-1)$ とすれば $f(1)=f'(1)=0$、$f''(1)=1$ です。

<!-- definition-example-start: def-ig3-f-divergence -->
**定義の確認**

$f(t)=(t-1)^2/2$ は $f''(t)=1>0$ なので[OPT1 の二階微分による凸性判定](../../../応用系/OPT/OPT1/index.md#thm-opt1-hessian-convexity)から $(0,\infty)$ 上で凸です。また $f(1)=f'(1)=0$、$f''(1)=1$ です。

$p=(1/2,1/2)$、$q=(1/2+h,1/2-h)$（$|h|<1/2$）は、両方とも各成分が正で、和が1です。定義に代入すると

$$
\begin{aligned}
D_f(p\Vert q)
&=\frac12\sum_x\frac{(p_x-q_x)^2}{q_x}\\
&=\frac{h^2}{2}\left(\frac1{1/2+h}+\frac1{1/2-h}\right)
=\frac{2h^2}{1-4h^2}\ge0.
\end{aligned}
$$

$h=0$ のときだけ0で、$h\to0$ では $D_f=2h^2+O(h^4)$ です。
<!-- definition-example-end -->

<a id="thm-ig3-f-divergence-fisher"></a>
<!-- formal-statement-start -->
> **定理（f-divergence の局所 Fisher 近似）**  
> $\Theta\subset\mathbb R^d$ を開集合、$p:\Theta\to\Delta_{m-1}^{\circ}$ を $C^2$ の有限正パラメータ表示とする。$f:(0,\infty)\to\mathbb R$ は凸で、1の近傍で $C^2$、$f(1)=f'(1)=0$、$f''(1)>0$ とする。このとき

$$
D_f(p(\theta)\Vert p(\theta+\delta))
=\frac{f''(1)}2\delta^{\mathsf T}G(\theta)\delta
+o(\|\delta\|^2).
$$

> 特に $f''(1)=1$ なら KL divergence と同じ二次項となる。
<!-- formal-statement-end -->

**証明の見取り図**：第2引数の各確率を動かすとき、比 $r_x=p_x(\theta)/p_x(\eta)$ を同時に動かします。$q f(p/q)$ を $q$ で二回微分すると $f''$ だけが残り、分母 $q$ が Fisher 行列の分母になります。

<!-- proof-start -->
### 証明

$p_x=p_x(\theta)$ を固定し、$q_x=p_x(\eta)$ を変数として $h_x(q)=q f(p_x/q)$ と置きます。$r=p_x/q$ とすれば $dr/dq=-r/q$ なので

$$
\frac{dh_x}{dq}=f(r)-rf'(r),
\qquad
\frac{d^2h_x}{dq^2}
=\bigl[-rf''(r)\bigr]\left(-\frac rq\right)
=\frac{r^2}{q}f''(r).
$$

対角線 $\eta=\theta$ では $q_x=p_x$、$r=1$ なので $h'_x(p_x)=f(1)-f'(1)=0$、$h''_x(p_x)=f''(1)/p_x$ です。合成関数 $h_x(p_x(\eta))$ を二回偏微分すると

$$
\begin{aligned}
\partial_{\eta^i\eta^j}D_f
&=\sum_x\left[
h_x''(q_x)(\partial_iq_x)(\partial_jq_x)
+h_x'(q_x)\partial_{ij}q_x\right],\\
\left.\partial_{\eta^i\eta^j}D_f\right|_{\eta=\theta}
&=f''(1)\sum_x\frac{\partial_i p_x(\theta)\partial_j p_x(\theta)}{p_x(\theta)}
=f''(1)g_{ij}(\theta).
\end{aligned}
$$

定数項は $\sum_xp_xf(1)=0$、一次項は $\sum_xh'_x(p_x)\partial_i p_x=0$ です。$C^2$ の Taylor 展開（第2引数 $\eta$、展開点 $\theta$）で結論を得ます。
<!-- proof-end -->

この近似は局所的な話です。$f''(1)$ が等しくても、離れた二つの分布を比較する値は一般に一致しません。また $f''(1)=0$ なら二次項が消えるので、正定値計量を得るには追加の条件が必要です。

---

## 5. 局所展開が壊れるとき

### 正規位置族：二次近似が厳密な等式になる

$X\sim N(\mu,\sigma^2)$、分散 $\sigma^2>0$ を固定し、$\mu\in\mathbb R$ を動かします。正規密度の比は

$$
\log\frac{p_\mu(x)}{p_\nu(x)}
=\frac{(x-\nu)^2-(x-\mu)^2}{2\sigma^2}
=\frac{2x(\mu-\nu)+\nu^2-\mu^2}{2\sigma^2}.
$$

$P_\mu$ の下で $E_\mu[X]=\mu$ を代入すると

$$
\begin{aligned}
D_{\mathrm{KL}}(P_\mu\Vert P_\nu)
&=\frac{2\mu(\mu-\nu)+\nu^2-\mu^2}{2\sigma^2}\\
&=\frac{(\mu-\nu)^2}{2\sigma^2}.
\end{aligned}
$$

これは $\nu=\mu+\delta$ に対して $G_{\mu\mu}=1/\sigma^2$ と一致し、余剰項が完全に0です。[IG2 の正規位置尺度族の計算](../IG2/index.md#prop-ig2-normal-information)を分散固定で制限したものです。

### 台が動く：一次項さえ消えない

$\theta>0$ に対し $P_\theta$ を区間 $[0,\theta]$ 上で密度が一定の分布とすると、その Lebesgue 密度は $p_\theta(x)=1/\theta$（$0\le x\le\theta$）で、外では0です。$h>0$ なら $P_\theta\ll P_{\theta+h}$ で

$$
D_{\mathrm{KL}}(P_\theta\Vert P_{\theta+h})
=\int_0^\theta\frac1\theta\log\frac{1/\theta}{1/(\theta+h)}\,dx
=\log\left(1+\frac h\theta\right)
=\frac h\theta+O(h^2).
$$

一方 $-\theta<h<0$ なら $P_\theta$ は $P_{\theta+h}$ の台の外へ正の確率を持つので、$D_{\mathrm{KL}}(P_\theta\Vert P_{\theta+h})=+\infty$ です。つまり対角線の両側で有限な $C^2$ 関数になりません。

台の内側だけで対数密度を形式的に微分するとスコアは $-1/\theta$ で、その平均も $-1/\theta$ です。[IG1 のスコア平均0定理](../IG1/index.md#thm-ig1-regular-score-mean)が使えないのは、微分時に動く端点から境界項が出るためです。したがって二次近似の定理の「共通の正の台」と「微分積分交換」を取り除けません。

---

## 6. 演習：隔たりから局所計量へ

### IG3-A01 有限 KL の非負性と等号

$m\ge2$ とし、$p=(p_x)_{x=1}^m$、$q=(q_x)_{x=1}^m$ は各成分が正で和が1の確率分布とする。$\log t\le t-1$ を使い $D_{\mathrm{KL}}(p\Vert q)\ge0$ を証明し、等号条件を求めよ。

- Level: A
- 狙い: 定義域・正規化・対数の等号条件を一度に確認する

<!-- solution-start -->
**詳細解答**

全 $p_x,q_x>0$ なので $q_x/p_x$ は正であり、指定された不等式を各成分で適用できます。

$$
-p_x\log(q_x/p_x)\ge p_x-q_x.
$$

和を取れば $D_{\mathrm{KL}}(p\Vert q)\ge\sum_x(p_x-q_x)=1-1=0$ です。対数の不等式の等号は $q_x/p_x=1$ のときだけです。全 $p_x$ が正で、各成分の差が非負なので、和の等号は全成分 $p_x=q_x$ と同値です。
<!-- solution-end -->

### IG3-A02 Bernoulli の向きと数値

$P_p$ を $P_p(X=1)=p$、$P_p(X=0)=1-p$（$0<p<1$）の Bernoulli 分布とする。$p=1/4$、$q=1/2$ に対して $D_{\mathrm{KL}}(P_p\Vert P_q)$ と $D_{\mathrm{KL}}(P_q\Vert P_p)$ を計算し、等しくないことを示せ。

- Level: A
- 狙い: 第1引数の確率で平均する向きを明示する

<!-- solution-start -->
**詳細解答**

定義から、第1引数が $p=1/4$ のとき

$$
D_{\mathrm{KL}}(P_{1/4}\Vert P_{1/2})
=\frac14\log\frac{1/4}{1/2}+\frac34\log\frac{3/4}{1/2}
=\frac14\log\frac12+\frac34\log\frac32.
$$

逆向きでは重みも入れ替わるので

$$
D_{\mathrm{KL}}(P_{1/2}\Vert P_{1/4})
=\frac12\log\frac{1/2}{1/4}+\frac12\log\frac{1/2}{3/4}
=\frac12\log\frac43.
$$

数値はそれぞれ約 $0.1308$、$0.1438$ であり一致しません。分子・分母を入れ替えるだけではなく、積分する基準分布も変わることに注意します。
<!-- solution-end -->

### IG3-A03 $f$-divergence の線形項

$p,q\in\Delta_{m-1}^{\circ}$ とし、$f(t)=t\log t$、$\widehat f(t)=f(t)-(t-1)$ とする。$\widehat f(1)=\widehat f'(1)=0$ を確認し、$D_{\widehat f}(p\Vert q)=D_{\mathrm{KL}}(p\Vert q)$ を示せ。

- Level: A
- 狙い: 正規化によって divergence の値が変わらない理由を確かめる

<!-- solution-start -->
**詳細解答**

$f(1)=0$、$f'(t)=\log t+1$ なので $f'(1)=1$ です。よって $\widehat f(1)=0$、$\widehat f'(1)=1-1=0$。定義を展開すると

$$
\begin{aligned}
D_{\widehat f}(p\Vert q)
&=\sum_xq_x\left[\frac{p_x}{q_x}\log\frac{p_x}{q_x}-\left(\frac{p_x}{q_x}-1\right)\right]\\
&=\sum_xp_x\log\frac{p_x}{q_x}-\sum_x(p_x-q_x)\\
&=D_{\mathrm{KL}}(p\Vert q).
\end{aligned}
$$

最後の項が0なのは二つの分布がそれぞれ正規化されているためです。
<!-- solution-end -->

### IG3-A04 台の移動で何が失われるか

$\theta>0$、$P_\theta$ を $[0,\theta]$ 上で密度 $1/\theta$ を持つ分布とする。$h\in(-\theta,\infty)$ に対して $D_{\mathrm{KL}}(P_\theta\Vert P_{\theta+h})$ を $h>0$ と $h<0$ に分けて求め、$h=0$ で二次の Taylor 展開ができない理由を述べよ。

- Level: A
- 狙い: 絶対連続性・台・境界項を区別する

<!-- solution-start -->
**詳細解答**

$h>0$ なら小さい方の区間 $[0,\theta]$ 上では密度比が $(\theta+h)/\theta$ で一定なので

$$
D_{\mathrm{KL}}(P_\theta\Vert P_{\theta+h})
=\int_0^\theta\frac1\theta\log\frac{\theta+h}{\theta}\,dx
=\log(1+h/\theta).
$$

$-\theta<h<0$ なら $(\theta+h,\theta]$ に $P_\theta$ は正の確率を与えるのに $P_{\theta+h}$ は0を与えます。したがって $P_\theta\not\ll P_{\theta+h}$ で KL は $+\infty$ です。$h=0$ の値は0ですが、左右を含む近傍で有限・連続ですらないため、二階微分や Taylor 展開を適用できません。密度の台がパラメータで動くことが、正規化の項別微分を壊します。
<!-- solution-end -->

### IG3-B01 Bernoulli の定数・一次・二次項

$P_p(X=1)=p$、$P_p(X=0)=1-p$、$0<p<1$ とする。$q=p+h\in(0,1)$ と置き、$K(p,q)=D_{\mathrm{KL}}(P_p\Vert P_q)$ の $q$ に関する一階・二階微分を求めて $K(p,p+h)$ を二次まで展開せよ。また Fisher 情報量と照合せよ。

- Level: B
- 狙い: 正規化条件と二階 Taylor 展開の対応を自力再現する

<!-- solution-start -->
**詳細解答**

有限正確率なので $K(p,q)=p\log(p/q)+(1-p)\log((1-p)/(1-q))$ は $q\in(0,1)$ で滑らかです。固定した $p$ に対して

$$
\partial_qK(p,q)=-\frac pq+\frac{1-p}{1-q}
=\frac{q-p}{q(1-q)}.
$$

よって $\partial_qK(p,p)=0$ で、$K(p,p)=0$ です。二回微分して

$$
\partial_{qq}K(p,q)=\frac p{q^2}+\frac{1-p}{(1-q)^2},
\quad
\partial_{qq}K(p,p)=\frac1p+\frac1{1-p}=\frac1{p(1-p)}.
$$

一変数 Taylor 展開を $q=p$ で2次まで適用すると

$$
K(p,p+h)=0+0\cdot h+\frac12\frac{h^2}{p(1-p)}+o(h^2).
$$

一方、[Fisher 情報行列の定義](../IG2/index.md#def-ig2-fisher-information)で使うスコアは $S_p(1)=1/p$、$S_p(0)=-1/(1-p)$ であり、その二乗平均は

$$
G(p)=p\frac1{p^2}+(1-p)\frac1{(1-p)^2}=\frac1{p(1-p)},
$$

なので係数は $G(p)/2$ と一致します。
<!-- solution-end -->

### IG3-B02 正規位置族と混合 Hessian

$P_\mu=N(\mu,\sigma^2)$、$\mu\in\mathbb R$、分散 $\sigma^2>0$ は固定とする。Lebesgue 密度から $D(\mu,\nu)=D_{\mathrm{KL}}(P_\mu\Vert P_\nu)$ を求め、$-\partial_\mu\partial_\nu D$ と Fisher 情報量が一致することを直接確認せよ。

- Level: B
- 狙い: 連続モデルの積分・微分と混合二階微分を照合する

<!-- solution-start -->
**詳細解答**

正規密度は $p_\mu(x)=(2\pi\sigma^2)^{-1/2}\exp(-(x-\mu)^2/(2\sigma^2))$ です。対数比を引き算して

$$
\log\frac{p_\mu(x)}{p_\nu(x)}
=\frac{(x-\nu)^2-(x-\mu)^2}{2\sigma^2}.
$$

$P_\mu$ の下で $E[X]=\mu$、$E[(X-\mu)^2]=\sigma^2$ を使えば

$$
\begin{aligned}
D(\mu,\nu)
&=\frac{E_\mu[(X-\nu)^2]-E_\mu[(X-\mu)^2]}{2\sigma^2}\\
&=\frac{\sigma^2+(\mu-\nu)^2-\sigma^2}{2\sigma^2}
=\frac{(\mu-\nu)^2}{2\sigma^2}.
\end{aligned}
$$

第1引数は $\mu$、第2引数は $\nu$ なので、順に偏微分すると

$$
\partial_\nu D=\frac{\nu-\mu}{\sigma^2},
\qquad -\partial_\mu\partial_\nu D=\frac1{\sigma^2}.
$$

一方、[Fisher 情報行列の定義](../IG2/index.md#def-ig2-fisher-information)に従うスコアは $S_\mu=(X-\mu)/\sigma^2$ です。その二乗平均は

$$
E_\mu[S_\mu^2]=\frac{E_\mu[(X-\mu)^2]}{\sigma^4}=\frac1{\sigma^2}
$$

なので一致します。共通台 $\mathbb R$、Gaussian 型の可積分支配、有限モーメントがあるため、ここでの微分・期待値操作も許されます。
<!-- solution-end -->

### IG3-B03 $f$-divergence の局所係数

$P_p$ は Bernoulli 分布（$P_p(X=1)=p$、$0<p<1$）とする。$f(t)=(t-1)^2/2$ から $D_f(P_p\Vert P_q)$ を直接求め、$q=p+h$ で二次まで展開せよ。また $p=1/2$ での厳密式を求め、$f''(1)$ と Fisher 情報量の係数を照合せよ。

- Level: B
- 狙い: 一般定理の係数を確率質量関数から確認する

<!-- solution-start -->
**詳細解答**

定義の有限和から

$$
\begin{aligned}
D_f(P_p\Vert P_q)
&=\frac12\left[q\left(\frac pq-1\right)^2
+(1-q)\left(\frac{1-p}{1-q}-1\right)^2\right]\\
&=\frac12\left[\frac{(p-q)^2}{q}+\frac{(q-p)^2}{1-q}\right]
=\frac{(p-q)^2}{2q(1-q)}.
\end{aligned}
$$

$q=p+h$ に代入して

$$
D_f(P_p\Vert P_{p+h})
=\frac{h^2}{2(p+h)(1-p-h)}
=\frac{h^2}{2p(1-p)}+o(h^2),
$$

となります。$p=1/2$ では $D_f=h^2/[2(1/4-h^2)]=2h^2/(1-4h^2)$ です。$f''(1)=1$ で、[Fisher 情報行列の定義](../IG2/index.md#def-ig2-fisher-information)から $G(p)=1/[p(1-p)]$ なので二次項は $f''(1)G(p)h^2/2$ と一致します。
<!-- solution-end -->

### IG3-C01 三値モデルの二次項と非対称な三次項

$p=(a,b,c)$、$a,b,c>0$、$a+b+c=1$ とし、$h,k$ は十分小さい実数とする。$\delta=(h,k,-h-k)$、$q=p+\delta$ とする。

1. $q$ が正の確率分布である条件を示し、$D_{\mathrm{KL}}(p\Vert q)$ を $\|(h,k)\|^3$ の項まで展開せよ。
2. $D_{\mathrm{KL}}(q\Vert p)$ を同じ次数まで展開し、二次項は一致し、三次項は一般に異なることを示せ。
3. 座標 $(a,b)$ における Fisher 行列を直接求め、二次項が $\tfrac12(h,k)G(a,b)(h,k)^{\mathsf T}$ であると検算せよ。

- Level: C
- 狙い: 確率単体の接方向・Fisher 計量・KL の向き・余剰項を一つにつなぐ

<!-- solution-start -->
**詳細解答**

1. $\delta_1+\delta_2+\delta_3=h+k-(h+k)=0$ なので $q$ の成分和は1です。各 $p_i+\delta_i>0$、つまり $a+h>0$、$b+k>0$、$c-h-k>0$ なら正の確率分布になります。固定した $a,b,c>0$ の下では、十分小さい $h,k$ でこれらが成り立ちます。各 $t_i=\delta_i/p_i$ に対して $\log(1+t_i)=t_i-t_i^2/2+t_i^3/3+O(t_i^4)$ と展開すると

   $$
   \begin{aligned}
   D_{\mathrm{KL}}(p\Vert q)
   &=-\sum_i p_i\log(1+t_i)\\
   &=-\sum_i\delta_i+\frac12\sum_i\frac{\delta_i^2}{p_i}
   -\frac13\sum_i\frac{\delta_i^3}{p_i^2}+O(\|(h,k)\|^4)\\
   &=\frac12\left(\frac{h^2}a+\frac{k^2}b+\frac{(h+k)^2}c\right)
   -\frac13\left(\frac{h^3}{a^2}+\frac{k^3}{b^2}-\frac{(h+k)^3}{c^2}\right)
   +O(\|(h,k)\|^4).
   \end{aligned}
   $$

   一次項が消えるのは接方向の成分和が0だからです。$p_i$ は固定の正数なので、各 $t_i=O(\|(h,k)\|)$ から和の剰余も表示した次数となります。

2. 逆向きでは重みが $q_i=p_i+\delta_i$ に変わるため

   $$
   \begin{aligned}
   D_{\mathrm{KL}}(q\Vert p)
   &=\sum_i(p_i+\delta_i)\log(1+t_i)\\
   &=\sum_i p_i(1+t_i)\left(t_i-\frac{t_i^2}2+\frac{t_i^3}3\right)
     +O(\|(h,k)\|^4)\\
   &=\sum_i\delta_i+\frac12\sum_i\frac{\delta_i^2}{p_i}
     -\frac16\sum_i\frac{\delta_i^3}{p_i^2}+O(\|(h,k)\|^4).
   \end{aligned}
   $$

   $\sum_i\delta_i=0$ を使うと二次項は1と一致しますが、三次項の係数は $-1/3$ ではなく $-1/6$ です。例えば $a=b=c=1/3$、$h=k=t\ne0$ では $\sum_i\delta_i^3/p_i^2=9(t^3+t^3-8t^3)=-54t^3\ne0$ なので差が実際に現れます。

3. パラメータ $(a,b)$ に対して $p=(a,b,1-a-b)$ です。パラメータの標準基底 $(1,0)$、$(0,1)$ を微分 $dp$ で写した二本の接速度は

   $$
   \partial_a p=(1,0,-1),\qquad \partial_b p=(0,1,-1)
   $$

   です。$a,b,c>0$ のため[単体からの Fisher 引き戻し](../IG2/index.md#thm-ig2-simplex-pullback)を適用できます。具体的に

   $$
   g_{aa}=\sum_i\frac{(\partial_a p_i)^2}{p_i}=\frac1a+\frac1c,
   \quad g_{ab}=\sum_i\frac{(\partial_a p_i)(\partial_b p_i)}{p_i}=\frac1c,
   \quad g_{bb}=\frac1b+\frac1c.
   $$

   よって、対称な二方向の内積を座標行列にまとめると

   $$
   G(a,b)=\begin{pmatrix}
   1/a+1/c&1/c\\
   1/c&1/b+1/c
   \end{pmatrix}.
   $$

   これを $(h,k)$ に挟むと

   $$
   (h,k)G(a,b)(h,k)^{\mathsf T}
   =h^2\left(\frac1a+\frac1c\right)+\frac{2hk}c
   +k^2\left(\frac1b+\frac1c\right)
   =\frac{h^2}a+\frac{k^2}b+\frac{(h+k)^2}c.
   $$

   よって1・2の二次項はともにこの二次形式の半分です。非対称な divergence の最初の局所項が対称な計量を与えることを、具体的な2次元モデルで確認できました。
<!-- solution-end -->

---

## 7. 何が分かったか

- KL divergence の第2引数を対角線近くで動かすと、定数・一次項が消え、二次項は Fisher 計量の半分になる。
- 一般の滑らかな非負 divergence の混合二階微分は対称・半正定値な形式を生み、正定値性には追加の非退化条件が要る。
- 正規化された $f$-divergence の二次係数は $f''(1)G/2$ となる。台の移動、積分交換の失敗、非正則な境界ではこの結論をそのまま使えない。

次の IG4 では、特別な分布族のパラメータ表示を調べます。divergence の三階微分を統計モデルの接続へ結び付けるのは IG7 で扱います。
