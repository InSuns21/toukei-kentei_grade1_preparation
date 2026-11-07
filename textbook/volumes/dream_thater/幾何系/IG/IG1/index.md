# IG1 統計モデルと接空間

確率分布を一つ決めれば、各事象がどれくらい起こりやすいかを計算できます。しかし統計では、分布を一つだけでなく、パラメータを変えて連続的に動かします。たとえば硬貨の表の確率を $p$ から $p+h$ へ変えると、分布はどの方向へ、どれくらい変わるでしょうか。

[統計モデル](../../../解析系/F0/F0-00P7/index.md#def-f0-00p7-statistical-model)と[スコア関数](../../../解析系/F0/F0-00P7/index.md#def-f0-00p7-score)は既習です。一方、[接ベクトル・接空間](../../GEO/GEO2/index.md#def-geo2-tangent-derivation)は幾何学で学びました。本章では、この二つを接続します。

1. まず有限個の結果をもつ分布を点として並べ、可能な一次変化を成分和 $0$ のベクトルで表します。
2. 分布をパラメータで表示し、その接方向をスコアという確率変数で表現します。
3. 座標の取り替えで何が保たれるか、また分布族を多様体と見なすには何が不足するかを調べます。
4. 最後に連続分布へ進み、微分と積分の交換が必要になる位置を明確にします。

本章では接空間の意味を確定します。接方向の内積を Fisher--Rao 計量として構成するのは IG2、KL divergence から計量を導くのは IG3 です。

<!-- definition-example-audit: strict -->

---

## 1. 分布の点を集めると、どんな空間になるか

標本空間が $\mathcal X=\{1,\ldots,m\}$ のとき、確率質量関数は

$$
p=(p_1,\ldots,p_m),
\qquad p_i=P(X=i),
\qquad \sum_{i=1}^m p_i=1
$$

という実数ベクトルです。ここで $X$ は $\mathcal X$ を値に取る確率変数です。$m=3$ なら $(1/2,1/3,1/6)$ は分布ですが、$(1/2,1/3,1/3)$ は和が $1$ でないので分布ではありません。

まず各結果の確率が **正** である分布だけを集めます。正であれば対数を取りやすく、少しパラメータを動かしても各確率が正に留まるので、境界の問題をいったん切り離せます。こうしてできる空間を次で定義します。

<a id="def-ig1-positive-simplex"></a>
<!-- formal-statement-start -->
> **定義（正の有限確率単体）**
> 整数 $m\ge2$ に対し、
>
$$
\Delta_{m-1}^{\circ}
=\left\{p\in\mathbb R^m:
p_i>0\ (i=1,\ldots,m),\quad
\sum_{i=1}^m p_i=1\right\}
$$
>
> を **正の有限確率単体**という。成分 $p_i\ge0$ を許す閉じた確率単体と区別する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ig1-positive-simplex -->
**定義の確認**

結果が3通りある次の確率分布を考えます。

$$
p=\left(\frac12,\frac13,\frac16\right)
$$

の各成分は正であり、$\frac12+\frac13+\frac16=1$ なので $p\in\Delta_2^\circ$ です。一方、$(1/2,1/2,0)$ は成分和が $1$ でも最後の成分が $0$ なので、閉じた単体には属しますが $\Delta_2^\circ$ には属しません。
<!-- definition-example-end -->

「$m$ 個の確率なのに $m-1$ 次元」という点を確認しましょう。最初の $m-1$ 成分を $q_i=p_i$ と置くと、最後の成分は正規化から

$$
p_m=1-\sum_{i=1}^{m-1}q_i
$$

と決まります。従って座標 $q=(q_1,\ldots,q_{m-1})$ が動ける領域は

$$
U=\left\{q\in\mathbb R^{m-1}:
q_i>0,\quad \sum_{i=1}^{m-1}q_i<1\right\}.
$$

$U$ は $\mathbb R^{m-1}$ の開集合であり、

$$
q\longmapsto
\left(q_1,\ldots,q_{m-1},
1-\sum_{i=1}^{m-1}q_i\right)
$$

は滑らかで、逆写像は最初の $m-1$ 成分を取り出すだけです。よって $\Delta_{m-1}^\circ$ は $m-1$ 次元の滑らかな多様体です。これは[滑らかな多様体の定義](../../GEO/GEO1/index.md#def-geo1-smooth-structure)の具体例です。

---

## 2. 確率の一次変化には一つの制約がある

点 $p$ から、確率の総和を $1$ に保ったまま動ける方向を考えます。曲線 $t\mapsto p(t)$ が常に確率分布なら $\sum_i p_i(t)=1$ ですから、その微分の成分和は $0$ になるはずです。この条件が接空間を完全に特徴付けます。

<a id="thm-ig1-simplex-tangent"></a>
<!-- formal-statement-start -->
> **定理（正の有限確率単体の接空間）**
> $m\ge2$、$p\in\Delta_{m-1}^\circ$ とする。$\Delta_{m-1}^\circ$ を上記の滑らかな多様体と見たとき、周囲の $\mathbb R^m$ の速度ベクトルとの同一視によって
>
$$
T_p\Delta_{m-1}^\circ
=\left\{v\in\mathbb R^m:\sum_{i=1}^m v_i=0\right\}.
$$
>
> この空間の次元は $m-1$ である。
<!-- formal-statement-end -->

**証明の見取り図**：曲線の速度が右辺に入ることを正規化条件の微分から示し、逆に成分和が $0$ の任意のベクトルが実際に確率分布の曲線の速度になることを示します。[曲線による接ベクトルの表示](../../GEO/GEO2/index.md#thm-geo2-curve-derivation-equivalence)を用います。

<!-- proof-start -->
### 証明

$p(0)=p$ を満たす滑らかな曲線 $p(t)\in\Delta_{m-1}^\circ$ を取ります。全ての小さい $t$ について

$$
\sum_{i=1}^m p_i(t)=1
$$

なので、有限和を項別微分して

$$
0=\frac{d}{dt}\sum_{i=1}^m p_i(t)\bigg|_{t=0}
=\sum_{i=1}^m \dot p_i(0).
$$

従って曲線の速度は必ず右辺に入ります。

逆に $v\in\mathbb R^m$ が $\sum_i v_i=0$ を満たすとします。$p_i>0$ なので、$v_i\ne0$ の成分について

$$
\varepsilon
=\frac12\min_{i:v_i\ne0}\frac{p_i}{|v_i|}>0
$$

と取れます（$v=0$ なら任意の $\varepsilon>0$ を取る）。$|t|<\varepsilon$ では $p_i+tv_i>0$ が全成分で成り立ち、かつ

$$
\sum_i(p_i+tv_i)=1+t\sum_i v_i=1.
$$

よって $p(t)=p+tv$ は正の確率単体内の曲線で、$\dot p(0)=v$ です。両側の包含が示されました。

最後に $v_m=-\sum_{i=1}^{m-1}v_i$ によって $v_1,\ldots,v_{m-1}$ を自由に選べるため、次元は $m-1$ です。
<!-- proof-end -->

**直接例**：$p=(1/2,1/3,1/6)$ において $v=(1,-2,1)$ は成分和が $0$ です。$|t|<1/12$ とすれば

$$
p(t)=\left(\frac12+t,\frac13-2t,\frac16+t\right)
$$

の3成分はすべて正で和は $1$ のままなので、実際に接方向になります。一方 $v=(1,0,0)$ は和が $1$ になり、正規化を保つ曲線の速度にはなれません。

---

## 3. パラメータを動かす方向と、確率の動く方向

[統計モデルの定義](../../../解析系/F0/F0-00P7/index.md#def-f0-00p7-statistical-model)は確率測度の族を与えます。ただし分布の集合そのものと、その集合に付けた座標 $\theta$ は区別する必要があります。同じ分布に二つの $\theta$ が対応する場合もあるからです。

有限標本空間に限り、正の確率単体への滑らかな写像として表示したものを考えます。ここでは単射性や微分の階数を、定義の段階では要求しません。

<a id="def-ig1-finite-parametrization"></a>
<!-- formal-statement-start -->
> **定義（統計モデルの有限正パラメータ表示）**
> $\Theta\subseteq\mathbb R^d$ を非空開集合、$m\ge2$ とする。各成分 $p_i:\Theta\to(0,1)$ が滑らかで、全 $\theta\in\Theta$ について $\sum_{i=1}^m p_i(\theta)=1$ を満たす写像
>
$$
P:\Theta\to\Delta_{m-1}^\circ,\qquad
P(\theta)=(p_1(\theta),\ldots,p_m(\theta))
$$
>
> を統計モデルの **有限正パラメータ表示**という。対応する分布族は $\{P(\theta):\theta\in\Theta\}$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ig1-finite-parametrization -->
**定義の確認**

**Bernoulli 族**を考えます。

$\Theta=(0,1)$、$\mathcal X=\{0,1\}$ とし、

$$
P(t)=(1-t,t)
$$

とします。ここでは結果のラベルを $0,1$ とし、確率ベクトルの成分もこの順に並べています（一般の定義の $1,\ldots,m$ というラベルを付け替えただけです）。$t\in(0,1)$ なら両成分は正で、和は $1$ です。各成分は $t$ の滑らかな関数なので、上の定義を満たします。ここでは $t$ は表が出る確率に当たります。
<!-- definition-example-end -->

以下、$\theta=(\theta^1,\ldots,\theta^d)$、$u=(u^1,\ldots,u^d)$ と書きます。$\partial_j=\partial/\partial\theta^j$ は、他のパラメータ成分を固定して $\theta^j$ だけを微分する記号です。方向 $u$ は、補助変数 $s$ で $\theta$ を $\theta+su$ へ動かす向きを表します。$s$ は各座標（Bernoulli 族の $t$ など）とは別の曲線変数です。[多変数の連鎖律](../../GEO/GEO2/index.md#thm-geo2-composition-differential)で

$$
\left.\frac{d}{ds}p_i(\theta+su)\right|_{s=0}
=\sum_{j=1}^d u^j\frac{\partial p_i}{\partial\theta^j}(\theta)
$$

となります。この各成分をまとめた分布の速度が[滑らかな写像の微分](../../GEO/GEO2/index.md#def-geo2-differential) $dP_\theta(u)$ です。一方、以前学んだ対数確率の微分はスコアでした。多変数では各座標方向のスコアを並べます。

<a id="def-ig1-directional-score"></a>
<!-- formal-statement-start -->
> **定義（パラメータ方向の接速度・方向スコア）**
> 有限正パラメータ表示 $P:\Theta\to\Delta_{m-1}^\circ$、点 $\theta\in\Theta$、方向 $u\in\mathbb R^d$ に対して、
>
$$
v_{\theta,u}(i)
=\sum_{j=1}^d u^j\partial_j p_i(\theta)
$$
>
> を分布の **接速度**、各結果 $i\in\mathcal X$ に対する
>
$$
S_j(i;\theta)
=\partial_j\log p_i(\theta),\qquad
S_u(i;\theta)
=\sum_{j=1}^d u^j S_j(i;\theta)
$$
>
> を座標スコアと **方向スコア**という。$S_u(X;\theta)$ は $X\sim P(\theta)$ に対する確率変数である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ig1-directional-score -->
**定義の確認**

$P(t)=(1-t,t)$ の方向 $u=1$ では、確率ベクトルの微分は $(-1,1)$ です。これが定義した接速度です。一方、各結果の対数確率を同じ $t$ で微分すると

$$
S_1(0;t)=\frac{d}{dt}\log(1-t)=-\frac1{1-t},
\qquad
S_1(1;t)=\frac{d}{dt}\log t=\frac1t.
$$

方向 $u=1$ のスコアはこの二値の関数であり、$u$ 倍すれば一般の方向スコアになります。接速度の各成分とスコアの各値が別の対象であることを具体的に確かめました。
<!-- definition-example-end -->

接速度 $v_{\theta,u}$ は確率の増減を表す $m$ 成分ベクトル、方向スコア $S_u$ は **各結果における相対的な増減率**を表す関数です。両者の関係を、次の定理で確かめます。

<a id="thm-ig1-finite-score-velocity"></a>
<!-- formal-statement-start -->
> **定理（有限モデルのスコアと接速度の対応）**
> $P:\Theta\to\Delta_{m-1}^\circ$ が有限正パラメータ表示なら、全 $\theta\in\Theta$、$u\in\mathbb R^d$、$i=1,\ldots,m$ について
>
$$
v_{\theta,u}(i)=p_i(\theta)S_u(i;\theta),
\qquad
\sum_i v_{\theta,u}(i)=0,
$$
>
> さらに $X\sim P(\theta)$ に対して
>
$$
E_\theta[S_u(X;\theta)]=0.
$$
>
> 逆に、この $P(\theta)$ における任意の接速度 $v$ は $S(i)=v_i/p_i(\theta)$ と一意に対応し、その $S$ の平均は $0$ になる。ただし、任意の接速度が特定の低次元部分モデル $P(\Theta)$ の方向から来るとは限らない。
<!-- formal-statement-end -->

**証明の見取り図**：対数微分を確率の微分へ戻し、正規化の微分を使います。正規化が「スコアの平均が0」という確率的性質に変わるのが要点です。

<!-- proof-start -->
### 証明

$p_i(\theta)>0$ なので対数の連鎖律から

$$
\partial_j\log p_i(\theta)
=\frac{\partial_jp_i(\theta)}{p_i(\theta)}
$$

です。従って各 $i$ で

$$
p_i(\theta)S_u(i;\theta)
=p_i(\theta)\sum_j u^j\frac{\partial_jp_i(\theta)}{p_i(\theta)}
=\sum_j u^j\partial_jp_i(\theta)
=v_{\theta,u}(i).
$$

有限和の正規化 $\sum_i p_i(\theta)=1$ を各 $\theta^j$ で微分すれば $\sum_i\partial_jp_i(\theta)=0$。よって

$$
\sum_i v_{\theta,u}(i)
=\sum_j u^j\sum_i\partial_jp_i(\theta)=0.
$$

また有限標本空間では[期待値の定義](../../../解析系/F0/F0-00P2A/index.md#def-f0-00p2a-expectation)に従って確率で重み付けした和を取り、

$$
E_\theta[S_u(X;\theta)]
=\sum_i p_i(\theta)S_u(i;\theta)
=\sum_i v_{\theta,u}(i)=0.
$$

逆向きは[単体の接空間の定理](#thm-ig1-simplex-tangent)から、$\sum_i v_i=0$ の任意の $v$ に対して $S(i)=v_i/p_i$ が定義でき、

$$
\sum_i p_i S(i)=\sum_i v_i=0
$$

であることから従います。全ての $p_i$ が正なので、この割り算は一意です。ただし $dP_\theta$ の像が $T_p\Delta_{m-1}^\circ$ 全体とは限らないことに注意します。
<!-- proof-end -->

### Bernoulli 族で何が動くか

$P(t)=(1-t,t)$ において方向 $u\in\mathbb R$ を与えると

$$
v_{t,u}=(-u,u),\qquad
S_u(0;t)=-\frac{u}{1-t},\qquad
S_u(1;t)=\frac{u}{t}.
$$

つまり $t$ を増やせば結果 $1$ の確率は増え、結果 $0$ の確率は同じ量だけ減ります。その相対変化率は、もともとの確率で割るため結果によって異なります。

$$
E_t[S_u]=
(1-t)\left(-\frac{u}{1-t}\right)
+t\frac{u}{t}=-u+u=0.
$$

### 3値カテゴリカル族では二つの独立した方向がある

$a>0$、$b>0$、$a+b<1$ に対し、$c=1-a-b$ として

$$
P(a,b)=(a,b,c).
$$

このとき

$$
\partial_aP=(1,0,-1),\qquad
\partial_bP=(0,1,-1),
$$

であり、座標スコアはそれぞれ

$$
S_a=\left(\frac1a,0,-\frac1c\right),
\qquad
S_b=\left(0,\frac1b,-\frac1c\right).
$$

接速度の第一・第二成分を見れば $(1,0,-1)$ と $(0,1,-1)$ は一次独立です。また平均を直接取ると

$$
E_{a,b}[S_a]=a\frac1a+c\left(-\frac1c\right)=0,
\quad
E_{a,b}[S_b]=b\frac1b+c\left(-\frac1c\right)=0.
$$

この例では二つのパラメータ方向が、同じ分布の二つの独立した接方向を作ります。

---

## 4. 座標を取り替えても、分布の方向は同じ

Bernoulli 族の $t$ を、その対数オッズ

$$
\eta=\log\frac{t}{1-t},\qquad
t=\frac{e^\eta}{1+e^\eta}
$$

で表すこともできます。$t$ と $\eta$ は同じ分布を別の数字で呼んでいるだけです。座標スコアの数値は変わりますが、同じ分布の曲線を追えば接速度は変わりません。

<a id="thm-ig1-coordinate-change"></a>
<!-- formal-statement-start -->
> **定理（スコアと接速度の座標変換則）**
> $P:\Theta\subseteq\mathbb R^d\to\Delta_{m-1}^\circ$ を有限正パラメータ表示、$h:H\to\Theta$ を開集合間の滑らかな局所微分同相写像とする。新座標を $\eta\in H$、旧座標を $\theta=h(\eta)$ とし、
>
$$
J_{ja}(\eta)=\frac{\partial\theta^j}{\partial\eta^a}
$$
>
> と置く。$\widetilde P=P\circ h$ のスコアと各座標方向の接速度は
>
$$
\widetilde S_a(i;\eta)
=\sum_{j=1}^d J_{ja}(\eta)S_j(i;\theta),
$$
>
$$
\partial_{\eta^a}\widetilde p_i(\eta)
=\sum_{j=1}^dJ_{ja}(\eta)\partial_{\theta^j}p_i(\theta)
$$
>
> を満たす。新座標の方向 $w$ に対し旧座標の方向を $u=Jw$ とすれば、$\widetilde v_{\eta,w}=v_{\theta,u}$ かつ $\widetilde S_w=S_u$ である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\widetilde p_i(\eta)=p_i(h(\eta))$ へ[多様体上の連鎖律](../../GEO/GEO2/index.md#thm-geo2-composition-differential)を座標表示で適用します。各 $a$ に対し

$$
\partial_{\eta^a}\widetilde p_i
=\sum_j(\partial_{\theta^j}p_i)(\theta)
\frac{\partial\theta^j}{\partial\eta^a}.
$$

さらに $\widetilde p_i>0$ なのでこの式を $\widetilde p_i=p_i(\theta)$ で割って

$$
\widetilde S_a(i;\eta)
=\frac{\partial_{\eta^a}\widetilde p_i}{\widetilde p_i}
=\sum_j J_{ja}\frac{\partial_{\theta^j}p_i}{p_i}
=\sum_jJ_{ja}S_j(i;\theta)
$$

を得ます。方向 $w$ に沿って和を取ると

$$
\widetilde v_{\eta,w}(i)
=\sum_a w^a\sum_jJ_{ja}\partial_jp_i
=\sum_j\left(\sum_a J_{ja}w^a\right)\partial_jp_i
=v_{\theta,Jw}(i).
$$

スコアについても同じ有限和の順序交換により $\widetilde S_w=S_{Jw}$ です。局所微分同相という仮定は $J$ が可逆で、両座標が互いに方向を一意に表すために必要です。
<!-- proof-end -->

**直接検算（Bernoulli の対数オッズ）**

$$
\frac{dt}{d\eta}
=\frac{e^\eta}{(1+e^\eta)^2}
=t(1-t).
$$

旧座標で結果 $0,1$ のスコアを一つの確率変数としてまとめると、$X=0$ と $X=1$ を代入してそれぞれ $-1/(1-t)$、$1/t$ になる $S_t(X)=(X-t)/[t(1-t)]$ です。よって新座標のスコアは

$$
S_\eta(X)
=\frac{dt}{d\eta}S_t(X)
=X-t.
$$

さらに $\partial_\eta P=(-t(1-t),t(1-t))=(dt/d\eta)\partial_tP$ です。スコアの式だけでなく、元の確率ベクトルの速度も連鎖律と一致します。

---

## 5. いつ「分布の滑らかな多様体」と呼べるか

ここまでは $P$ が滑らかであることだけを仮定しました。しかし $P(\theta)$ が異なる $\theta$ で同じ分布を与えたり、ある方向で全く分布が動かなくなったりすると、パラメータの $d$ 次元をそのまま分布の次元とは呼べません。

この区別には GEO3 の[はめ込み](../../GEO/GEO3/index.md#def-geo3-immersion-submersion)と[埋め込み](../../GEO/GEO3/index.md#def-geo3-embedding)を使います。有限正単体では、確率ベクトルの微分の階数を直接計算できます。

なぜ行列で判定できるのでしょうか。パラメータ空間の標準基底 $e_j$（第 $j$ 成分だけが $1$）を動かすと、上の方向微分の式に $u=e_j$ を代入して

$$
dP_\theta(e_j)=(\partial_jp_1(\theta),\ldots,\partial_jp_m(\theta))
$$

を得ます。すなわち $m\times d$ 行列 $(\partial_jp_i)_{i,j}$ の第 $j$ 列は $dP_\theta(e_j)$ です。[微分の座標表示](../../GEO/GEO2/index.md#thm-geo2-differential-coordinate)と同じく、この列の一次独立性は、$dP_\theta$ が零でないパラメータ方向を零の接方向へ潰さないことと同値です。

<a id="prop-ig1-immersion-criterion"></a>
<!-- formal-statement-start -->
> **命題（有限モデルの浸入性判定）**
> $P:\Theta\subseteq\mathbb R^d\to\Delta_{m-1}^\circ$ を有限正パラメータ表示とし、$\theta\in\Theta$ を固定する。次の条件は同値である。
>
> 1. $dP_\theta:\mathbb R^d\to T_{P(\theta)}\Delta_{m-1}^\circ$ が単射である。
> 2. $m\times d$ の微分行列 $(\partial_j p_i(\theta))_{i,j}$ の列が一次独立である。
> 3. $u\in\mathbb R^d$ が $S_u(i;\theta)=0$ を全ての結果 $i$ で満たすなら $u=0$ である。
>
> これらが各点で成立するとき $P$ ははめ込み（immersion）であり、必ず $d\le m-1$ である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$dP_\theta(u)$ の第 $i$ 成分は $\sum_j u^j\partial_jp_i$ です。従って $dP_\theta(u)=0$ と行列の列の線形結合 $\sum_j u^j(\partial_jp_i)_{i}=0$ は同じ条件です。核が $\{0\}$ であることは列の一次独立性と同値なので、条件1と2が同値です。

また[有限モデルの接速度・スコア対応](#thm-ig1-finite-score-velocity)により

$$
(dP_\theta(u))_i=p_i(\theta)S_u(i;\theta).
$$

全ての $p_i(\theta)$ が正なので、左辺が全成分で $0$ であることと $S_u$ が全結果で $0$ であることは同値です。よって条件1と3も同値です。

最後に $dP_\theta$ の像は[単体の接空間](#thm-ig1-simplex-tangent)という $m-1$ 次元空間に入るため、単射なら $d\le m-1$ です。
<!-- proof-end -->

### 単射であっても、はめ込みとは限らない

以下の1変数の例では $P'(t)=dP(t)/dt=\partial_tP(t)$ と書き、パラメータ $t$ を動かした速度を表します。

$\Theta=(-1,1)$、$X\in\{0,1\}$ とし、

$$
P(t)=\left(\frac12-\frac{t^3}{4},\frac12+\frac{t^3}{4}\right).
$$

各確率は $1/4$ より大きく $3/4$ より小さく、成分和は $1$ です。$t\mapsto t^3$ は単射なので異なる $t$ は異なる分布を与えます。しかし

$$
P'(t)=\left(-\frac{3t^2}{4},\frac{3t^2}{4}\right),
\qquad P'(0)=(0,0).
$$

従って $t=0$ で微分は階数 $0$ となり、はめ込みではありません。分布の集合は Bernoulli 単体の一部分として滑らかですが、指定した $t$ は $0$ の近くで正則な座標として働きません。単射性だけでは座標の正則性を保証できない例です。

### はめ込みでも、同じ分布を繰り返すことがある

$0<\varepsilon<1/(3\sqrt2)$ とし、$\Theta=\mathbb R$ から3値分布へ

$$
P(t)=\left(
\frac13+\varepsilon\cos t,\
\frac13+\varepsilon\sin t,\
\frac13-\varepsilon(\cos t+\sin t)
\right)
$$

とします。第三成分は $1/3-\varepsilon\sqrt2>0$ で、第一・第二成分も正、和は $1$ です。微分は

$$
P'(t)=\varepsilon(-\sin t,\cos t,\sin t-\cos t)
$$

で、$\sin t$ と $\cos t$ が同時に $0$ になることはないので微分は常に非零です。よって1次元のはめ込みです。一方、$P(t+2\pi)=P(t)$ であり大域的には単射ではありません。

[はめ込みの局所標準形](../../GEO/GEO3/index.md#cor-geo3-immersion-normal-form)により、はめ込みは各点の近くでは正則な局所座標表示を与えます。しかし大域的にパラメータと分布を1対1に対応させるには、単射性などを別に確認する必要があります。さらに**埋め込み**と呼ぶには、像の部分空間位相とパラメータ空間の位相が整合する条件も必要です。単射なはめ込みというだけでは一般に埋め込みとは限りません。

---

## 6. 連続分布では微分を積分の中へ移せるか

有限標本空間の証明では、微分するのは有限和でした。連続分布のモデルを

$$
P_\theta(dx)=p_\theta(x)\,\mu(dx)
$$

と表すと、正規化は $\int p_\theta\,d\mu=1$ です。[共通の支配測度をもつモデル](../../../解析系/F0/F0-00P7/index.md#def-f0-00p7-dominated-model)という既習の設定を使います。

連続分布では「正規化を微分する」ために条件が要ります。ここでは幾何で接方向を追うのに十分な一組の仮定を明示します。有限モデルの滑らかさと同様、全ての支配モデルが自動的にこの条件を満たすわけではありません。

<a id="def-ig1-geometric-regularity"></a>
<!-- formal-statement-start -->
> **定義（幾何学的正則支配モデル）**
> $\Theta\subseteq\mathbb R^d$ を開集合、$\mu$ を標本空間 $(\mathcal X,\mathcal A)$ 上の $\sigma$ 有限測度とする。$\{P_\theta:\theta\in\Theta\}$ が密度 $p_\theta=dP_\theta/d\mu$ を持ち、次を満たすとする。
>
> **（R1）共通台**：$\theta$ に依存しない可測集合 $S\subseteq\mathcal X$ があり、全 $\theta$ で $p_\theta>0$ が $S$ 上 $\mu$ ほとんど至る所、かつ $p_\theta=0$ が $S$ の外で $\mu$ ほとんど至る所成立する。密度のバージョンは整合的に選ぶ。
>
> **（R2）微分可能性**：$\theta\mapsto p_\theta$ は $L^1(\mu)$ 値の連続微分可能写像とする。偏微分 $\partial_jp_\theta\in L^1(\mu)$ は $S$ 上で対数微分との積として表せる。
>
$$
\partial_jp_\theta(x)
=p_\theta(x)\partial_j\log p_\theta(x)
\quad(\mu\text{ ほとんど至る所の }x\in S).
$$
>
> **（R3）二乗可積分性**：座標スコア $S_j(x;\theta)=\partial_j\log p_\theta(x)$ は $L^2(P_\theta)$ に属する。
>
> このとき本章ではこれを **幾何学的正則支配モデル**という。分布族自体が多様体になると結論するための単射性・浸入性等はこの定義に含めない。
<!-- formal-statement-end -->

条件2の $L^1$ 微分可能性は、差商の $L^1$ 収束を意味します。つまり、各座標方向 $e_j$ に対し

$$
\lim_{h\to0}
\int\left|
\frac{p_{\theta+he_j}-p_\theta}{h}-\partial_jp_\theta
\right|\,d\mu=0.
$$

従って積分と極限を交換できるだけの強さがあります。条件3はスコアの二乗平均が有限であることを保証しますが、単独で微分と積分の交換を保証するものではありません。

<!-- definition-example-start: def-ig1-geometric-regularity -->
**定義の確認**

**分散1の正規位置族**で調べます。

$\mathcal X=\mathbb R$、$\mu$ を Lebesgue 測度、$\Theta=\mathbb R$ とし、

$$
p_\theta(x)=\frac{1}{\sqrt{2\pi}}
\exp\left(-\frac{(x-\theta)^2}{2}\right).
$$

全ての $\theta$ で $S=\mathbb R$ が共通の正の台です。微分すると

$$
\partial_\theta p_\theta(x)=(x-\theta)p_\theta(x),
\qquad S_\theta(x)=x-\theta.
$$

任意の固定 $\theta_0$ の周りの有界区間で、$p_\theta$ とその微分は可積分な Gaussian 型の関数 $C(1+|x|)\exp(-x^2/4)$ で同時に支配されます（定数 $C$ は区間に依存してよい）。差商に平均値の定理を適用し、この支配関数と[優収束定理](../../../解析系/F0/F0-00D2B/index.md#thm-f0-00d2b-01)を使うと $L^1$ 微分可能性が従います。さらに $X\sim N(\theta,1)$ なら

$$
E_\theta[(X-\theta)^2]=1<\infty
$$

なので条件3も満たします。単に「正規分布だから正則」と置くのではなく、共通台・交換・二乗積分をそれぞれ確認しました。
<!-- definition-example-end -->

<a id="thm-ig1-regular-score-mean"></a>
<!-- formal-statement-start -->
> **定理（正則支配モデルのスコア平均0）**
> 上記の幾何学的正則支配モデルにおいて、各 $\theta\in\Theta$、$j=1,\ldots,d$ について
>
$$
\int_{\mathcal X}\partial_jp_\theta\,d\mu=0,
\qquad E_\theta[S_j(X;\theta)]=0.
$$
>
> 従って任意の方向 $u\in\mathbb R^d$ に対して $S_u=\sum_j u^jS_j$ は二乗可積分で平均0である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

全ての $\theta$ で $\int p_\theta\,d\mu=1$ です。$L^1$ 微分可能性により、積分の線形写像 $f\mapsto\int f\,d\mu$ を差商の極限へ通せます。具体的には

$$
\left|
\int\frac{p_{\theta+he_j}-p_\theta}{h}\,d\mu
-\int\partial_jp_\theta\,d\mu
\right|
\le\left\|
\frac{p_{\theta+he_j}-p_\theta}{h}
-\partial_jp_\theta
\right\|_{L^1(\mu)}
\longrightarrow0.
$$

左辺で差商を積分した項は、正規化によって全ての小さい $h$ で $(1-1)/h=0$ です。従って $\int\partial_jp_\theta\,d\mu=0$。

条件1・2から $S$ 上で $\partial_jp_\theta=p_\theta S_j$、$S$ の外では密度と $L^1$ 微分が $0$ です。条件3と [Cauchy--Schwarz の不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)により

$$
E_\theta[|S_j|]
\le \sqrt{E_\theta[S_j^2]}<\infty
$$

なので期待値が定義でき、

$$
E_\theta[S_j]
=\int_S S_jp_\theta\,d\mu
=\int_{\mathcal X}\partial_jp_\theta\,d\mu=0.
$$

最後に $d$ は有限なので $S_u$ は $L^2(P_\theta)$ の有限線形結合であり、期待値の線形性から $E_\theta[S_u]=\sum_j u^jE_\theta[S_j]=0$ です。
<!-- proof-end -->

これは既習の[スコア恒等式](../../../解析系/F0/F0-00P7/index.md#thm-f0-00p7-score-identity)を多次元パラメータの方向微分として使う際の、十分条件を明示したものです。一般の連続分布で得られる接方向は $L^1$ の密度の一次変化と、$L^2(P_\theta)$ のスコアで表せますが、**それだけで分布族が有限次元多様体へ埋め込まれたとはいえません**。

### 共通台が動くと、どこで証明が壊れるか

$\theta>0$ で区間 $(0,\theta)$ 上に一定密度を持つ分布

$$
p_\theta(x)=\frac1\theta\boldsymbol{1}_{(0,\theta)}(x)
$$

を考えます。区間内部の $x$ を固定して微分した対数密度は $-1/\theta$ なので、これをそのまま積分すると

$$
\int_0^\theta\left(-\frac1\theta\right)\frac1\theta\,dx
=-\frac1\theta\ne0.
$$

本当の正規化は $\int_0^\theta dx/\theta=1$ で、その微分には**動く上端の境界項**が必要です。

$$
\frac{d}{d\theta}\int_0^\theta\frac1\theta\,dx
=-\frac1{\theta^2}\theta+\frac1\theta=0.
$$

この族は共通の正の台を持たず、密度の差商も端点近傍で $L^1$ 収束しません。端点が移動する幅 $|h|$ の区間に大きさ約 $1/(\theta|h|)$ の差商が載るためです。従って[正則支配モデルの定理](#thm-ig1-regular-score-mean)を適用できず、スコア平均0の結論もこの計算では成立しません。

---

## 7. 演習

### IG1-A01 正の確率単体で動ける方向

3値分布 $p=(1/2,1/3,1/6)$ を考える。

1. $v=(2,-1,-1)$ が $T_p\Delta_2^\circ$ に属することを示せ。
2. $p(t)=p+tv$ が正の確率単体に属する $t$ の開区間を求めよ。
3. $w=(0,1,0)$ が接方向でない理由を述べよ。

- Level: A
- 狙い: 正規化の微分と正値制約を分けて検証する

<!-- solution-start -->
**詳細解答**

1. 成分和は $2-1-1=0$ なので、[接空間の定理](#thm-ig1-simplex-tangent)から接方向です。
2. 成分は $(1/2+2t,1/3-t,1/6-t)$ となります。正値条件を成分ごとに解くと

   $$
   t>-\frac14,\qquad t<\frac13,\qquad t<\frac16.
   $$

   和は常に $1+t(2-1-1)=1$ です。従って求める区間は $-1/4<t<1/6$ です。
3. $0+1+0=1\ne0$ なので、曲線 $p+tw$ の成分和は $1+t$ になり、$t\ne0$ では確率分布でなくなります。
<!-- solution-end -->

### IG1-A02 Bernoulli の方向スコア

$X\in\{0,1\}$ の Bernoulli モデルを $P_t(X=1)=t$、$P_t(X=0)=1-t$、$0<t<1$ とする。$t=1/4$ においてパラメータ方向 $u=2$ を取る。

1. 接速度 $v_{t,u}$ と方向スコア $S_u(0;t),S_u(1;t)$ を計算せよ。
2. $E_t[S_u]$ を確率質量による和から求めよ。

- Level: A
- 狙い: 確率の変化量と相対変化率の違いを計算する

<!-- solution-start -->
**詳細解答**

1. $P(t)=(1-t,t)$ なので、1変数の偏微分 $\partial_tP=dP/dt=(-1,1)$ です。方向 $u=2$ を掛けて

   $$
   v_{1/4,2}=(-2,2).
   $$

   [有限モデルのスコアと接速度の対応](#thm-ig1-finite-score-velocity)から $S_u(i)=v_i/p_i$ です。$p_0=3/4$、$p_1=1/4$ を代入すると

   $$
   S_u(0;1/4)=-\frac{2}{3/4}=-\frac83,
   \qquad
   S_u(1;1/4)=\frac{2}{1/4}=8.
   $$

2. 期待値をそれぞれの確率で重み付けして

   $$
   E_{1/4}[S_u]
   =\frac34\left(-\frac83\right)
   +\frac14(8)=-2+2=0.
   $$

   これは接速度の成分和が0であることにも対応しています。
<!-- solution-end -->

### IG1-A03 カテゴリカル分布の二方向

3値分布を $P(a,b)=(a,b,1-a-b)$、$a,b>0$、$a+b<1$ とする。点 $(a,b)=(1/2,1/3)$、方向 $u=(1,-1)$ に対する接速度と方向スコアを求め、スコア平均が0となることを確かめよ。

- Level: A
- 狙い: 偏微分の線形結合で方向微分を構成する

<!-- solution-start -->
**詳細解答**

基底方向は $\partial_aP=(1,0,-1)$ と $\partial_bP=(0,1,-1)$ なので

$$
v_{\theta,u}=\partial_aP-\partial_bP=(1,-1,0).
$$

点での分布は $(1/2,1/3,1/6)$ です。成分ごとに正の確率で割って

$$
S_u=\left(\frac{1}{1/2},\frac{-1}{1/3},\frac{0}{1/6}\right)
=(2,-3,0).
$$

従って

$$
E_\theta[S_u]=\frac12(2)+\frac13(-3)+\frac16(0)=1-1=0.
$$
<!-- solution-end -->

### IG1-A04 正規位置族のスコア

$X$ の密度を $\mu$ に関して

$$
p_\theta(x)=(2\pi)^{-1/2}\exp(-(x-\theta)^2/2),
\quad x\in\mathbb R,\quad\theta\in\mathbb R
$$

とする。ここで $\mu$ は Lebesgue 測度、$X\sim N(\theta,1)$ である。

1. スコア $S_\theta(x)$ を求めよ。
2. $E_\theta[S_\theta(X)]$ と $E_\theta[S_\theta(X)^2]$ を計算し、正則性のどの条件に関わるか述べよ。

- Level: A
- 狙い: 共通台を持つ連続分布でスコアの一次・二次平均を確かめる

<!-- solution-start -->
**詳細解答**

1. 対数密度は

   $$
   \log p_\theta(x)=-\frac12\log(2\pi)-\frac12(x-\theta)^2.
   $$

   ここで $\partial_\theta[-(x-\theta)^2/2]=x-\theta$ なので $S_\theta(x)=x-\theta$ です。
2. $X$ は平均 $\theta$、分散 $1$ なので

   $$
   E_\theta[S_\theta(X)]=E_\theta[X-\theta]=\theta-\theta=0,
   $$

   $$
   E_\theta[S_\theta(X)^2]
   =E_\theta[(X-\theta)^2]=\operatorname{Var}_\theta(X)=1.
   $$

   二乗平均が有限なので $S_\theta\in L^2(P_\theta)$ です。加えて全ての $\theta$ で正の台は $\mathbb R$ と共通です。正規化の微分と積分の交換は、本文で確認した微分密度の可積分な支配により正当化されます。
<!-- solution-end -->

### IG1-B01 対数オッズで座標を取り替える

Bernoulli 分布 $P_t(X=1)=t$、$P_t(X=0)=1-t$、$0<t<1$ に対して $\eta=\log(t/(1-t))$ と置く。

1. $t$ を $\eta$ で表し、$dt/d\eta$ を求めよ。
2. $t$ 座標と $\eta$ 座標のスコアをそれぞれ求め、連鎖律で結び付けよ。
3. $\eta$ 方向 $w=1$ の接速度を、両座標から計算して一致を示せ。

- Level: B
- 狙い: 座標の取り替えでスコア成分は変わっても接方向は一致することを証明する

<!-- solution-start -->
**詳細解答**

1. $e^\eta=t/(1-t)$ より $(1+e^\eta)t=e^\eta$ なので

   $$
   t=\frac{e^\eta}{1+e^\eta}.
   $$

   商の微分則で

   $$
   \frac{dt}{d\eta}
   =\frac{e^\eta(1+e^\eta)-e^{2\eta}}{(1+e^\eta)^2}
   =\frac{e^\eta}{(1+e^\eta)^2}
   =t(1-t)>0.
   $$

   従ってこの座標の取り替えは局所的にも大域的にも可逆です。
2. $t$ 座標では

   $$
   S_t(X)=\frac{X}{t}-\frac{1-X}{1-t}
   =\frac{X-t}{t(1-t)}.
   $$

   対数密度 $\ell_\eta(X)=X\log t(\eta)+(1-X)\log(1-t(\eta))$ を $\eta$ で微分すれば

   $$
   S_\eta(X)=\frac{dt}{d\eta}
   \left(\frac Xt-\frac{1-X}{1-t}\right)
   =t(1-t)S_t(X)=X-t.
   $$

3. $\eta$ を速度1で動かすと、旧座標の速度は $u=dt/d\eta=t(1-t)$ です。従って

   $$
   \partial_\eta P
   =(-t(1-t),t(1-t))
   =u(-1,1)
   =u\,\partial_tP.
   $$

   新座標のスコアでも $p_iS_\eta(i)$ を計算すると同じ二成分になります。
<!-- solution-end -->

### IG1-B02 識別可能性と浸入性を見分ける

次の二つの有限正モデルについて、確率の正値性、パラメータ表示の単射性、はめ込みかどうかをそれぞれ判定せよ。

1. $\Theta=(-1,1)$、$P(t)=(1/2-t^3/4,1/2+t^3/4)$。
2. $\Theta=\mathbb R$、$0<\varepsilon<1/(3\sqrt2)$ とし、$P(t)=(1/3+\varepsilon\cos t,\,1/3+\varepsilon\sin t,\,1/3-\varepsilon(\cos t+\sin t))$。

- Level: B
- 狙い: 大域単射と局所の微分階数を別々に検証する

<!-- solution-start -->
**詳細解答**

1. $|t|<1$ では $-1<t^3<1$ なので両確率は $1/4$ と $3/4$ の間にあり、和は1です。第二成分が $1/2+t^3/4$ で単調増加なので $P$ は単射です。しかし

   $$
   P'(t)=\frac{3t^2}{4}(-1,1)
   $$

   であり、$t=0$ において微分が零写像です。従って全点でのはめ込み条件を満たしません。ここで失われているのは単射性ではなく微分の階数です。
2. $\cos t,\sin t\in[-1,1]$、$|\cos t+\sin t|\le\sqrt2$ より、第三成分は $1/3-\varepsilon\sqrt2>0$、第一・第二成分も $1/3-\varepsilon>0$ です。和は1です。

   $$
   P'(t)=\varepsilon(-\sin t,\cos t,\sin t-\cos t).
   $$

   もしこのベクトルが零なら $\sin t=0$ かつ $\cos t=0$ となりますが、$\sin^2t+\cos^2t=1$ に反します。従って各点で階数1のはめ込みです。一方 $P(t+2\pi)=P(t)$ なので単射ではありません。局所的な方向が失われないことと、大域的に同じ分布を繰り返さないことは別条件です。
<!-- solution-end -->

### IG1-B03 制約をもつ三値モデル

$0<t<1$ に対し3値確率分布 $P(t)=(t/2,t/2,1-t)$ を考える。

1. 正の有限確率単体に入ることを確認せよ。
2. 接速度とスコアを求め、スコア平均0を確かめよ。
3. この1次元モデルが正の単体へのはめ込みであることを示し、単体全体の接方向 $(1,-1,0)$ がこのモデルの接方向でないことを説明せよ。

- Level: B
- 狙い: 統計モデルの接空間と周囲の単体の接空間を区別する

<!-- solution-start -->
**詳細解答**

1. $0<t<1$ なので $t/2>0$、$1-t>0$ で、$t/2+t/2+1-t=1$ です。
2. $P'(t)=(1/2,1/2,-1)$ です。方向1に対するスコアを $P'(t)_i/p_i(t)$ から求めると

   $$
   S_t=\left(\frac{1/2}{t/2},\frac{1/2}{t/2},-\frac1{1-t}\right)
   =\left(\frac1t,\frac1t,-\frac1{1-t}\right).
   $$

   したがって

   $$
   E_t[S_t]
   =\frac t2\frac1t+\frac t2\frac1t
   +(1-t)\left(-\frac1{1-t}\right)
   =\frac12+\frac12-1=0.
   $$

3. $P'(t)\ne0$ だから[有限モデルの浸入性判定](#prop-ig1-immersion-criterion)により $dP_t$ は1次元空間から単体の接空間への単射で、はめ込みです。その像は

   $$
   \operatorname{im}dP_t
   =\{c(1/2,1/2,-1):c\in\mathbb R\}.
   $$

   $(1,-1,0)$ は成分和が0なので単体の接方向ですが、像のどのベクトルも第一成分と第二成分が等しいため、この像には属しません。分布全体では動ける方向が、制約 $p_1=p_2$ を保つ部分モデルでは許されない例です。
<!-- solution-end -->

### IG1-C01 Softmax 座標は3値単体の正則な座標か

3値分布の2変数モデルを、$(\alpha,\beta)\in\mathbb R^2$ について

$$
Z=1+e^\alpha+e^\beta,\qquad
P(\alpha,\beta)=\left(\frac{e^\alpha}{Z},\frac{e^\beta}{Z},\frac1Z\right)
=(p_1,p_2,p_3)
$$

とする。

1. 正の有限確率単体への写像であることを示し、任意の $p\in\Delta_2^\circ$ から $(\alpha,\beta)$ を復元せよ。
2. 座標スコア $S_\alpha,S_\beta$ を3つの結果ごとに求め、平均0を確かめよ。
3. $(\alpha,\beta)\mapsto(p_1,p_2)$ の Jacobi 行列の行列式を求め、$P$ が全点ではめ込みであることを示せ。
4. この例でパラメータ空間と正の確率単体の間に滑らかな一対一対応が成り立つ理由を説明せよ。

- Level: C
- 狙い: スコア・Jacobi 行列・座標の可逆性を一つの模型で結び付ける

<!-- solution-start -->
**詳細解答**

1. $e^\alpha,e^\beta,1$ は正なので $p_i>0$ で、$p_1+p_2+p_3=(e^\alpha+e^\beta+1)/Z=1$ です。逆に正の分布 $p$ に対し

   $$
   \frac{p_1}{p_3}=e^\alpha,\qquad
   \frac{p_2}{p_3}=e^\beta
   $$

   だから

   $$
   \alpha=\log\frac{p_1}{p_3},\qquad
   \beta=\log\frac{p_2}{p_3}.
   $$

   各比は正で対数が定義できます。これを元の式に代入すると $Z=1/p_3$ となり確かに全ての $p_i$ が復元されます。
2. $\partial_\alpha\log Z=e^\alpha/Z=p_1$、$\partial_\beta\log Z=p_2$ です。各結果の対数確率は

   $$
   \log p_1=\alpha-\log Z,\quad
   \log p_2=\beta-\log Z,\quad
   \log p_3=-\log Z.
   $$

   よって

   $$
   S_\alpha=(1-p_1,-p_1,-p_1),\qquad
   S_\beta=(-p_2,1-p_2,-p_2).
   $$

   期待値をそれぞれの確率で重み付けすると

   $$
   E[S_\alpha]=p_1(1-p_1)-(p_2+p_3)p_1
   =p_1-p_1(p_1+p_2+p_3)=0,
   $$

   $$
   E[S_\beta]=p_2(1-p_2)-(p_1+p_3)p_2=0.
   $$

3. $p_1=e^\alpha/Z$ を商の微分則で偏微分すると $\partial_\alpha p_1=p_1(1-p_1)$、$\partial_\beta p_1=-p_1p_2$ です。同じ方法で $\partial_\alpha p_2=-p_1p_2$、$\partial_\beta p_2=p_2(1-p_2)$ なので

   $$
   J=\begin{pmatrix}
   p_1(1-p_1)&-p_1p_2\\
   -p_1p_2&p_2(1-p_2)
   \end{pmatrix}.
   $$

   行列式は

   $$
   \det J=p_1p_2[(1-p_1)(1-p_2)-p_1p_2]
   =p_1p_2(1-p_1-p_2)=p_1p_2p_3>0.
   $$

   §1 で構成した $\Delta_2^\circ$ の座標 $q=(p_1,p_2)$ では、$p_3=1-p_1-p_2$ と決まります。従って $J$ はこの座標で表した写像 $(\alpha,\beta)\mapsto(p_1,p_2)$ の微分行列で、列は各パラメータ方向の接速度の最初の2成分です。上の行列式が非零なので、その2列は一次独立です。第三成分の速度は前2成分の和の負として決まり、全3成分の速度も一次独立です。よって[有限モデルの浸入性判定](#prop-ig1-immersion-criterion)（および[微分の座標表示](../../GEO/GEO2/index.md#thm-geo2-differential-coordinate)）から $P$ は全点ではめ込みとなります。
4. 1で与えた逆写像は、全ての $p_i>0$ の上で比と対数を合成した滑らかな関数です。$P$ 自身も滑らかで、逆写像との合成はいずれも恒等写像です。したがって $P:\mathbb R^2\to\Delta_2^\circ$ は微分同相写像であり、単なる単射やはめ込みより強い結論が成り立ちます。
<!-- solution-end -->

---

## 8. 次の講義への橋

この章で得たのは、**確率分布の微小な変化を接速度として、またスコアとして読める**という対応です。有限モデルでは

$$
v(i)=p_iS(i),\qquad \sum_i v(i)=0,\qquad E_p[S]=0
$$

が出発点となります。連続分布では、共通台と積分・微分の交換を正当化する条件が必要でした。

次の IG2 では、平均0のスコア $S_u,S_w$ から

$$
g_\theta(u,w)=E_\theta[S_u(X;\theta)S_w(X;\theta)]
$$

という内積の候補を作ります。その際、いま確認した「接方向が零になる場合」と「座標を変えた場合」の二つが、計量の正定値性と座標不変性を判断する鍵になります。
