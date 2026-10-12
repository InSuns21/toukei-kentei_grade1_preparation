# SG6 Ruelle確率カスケードとParisi変分原理

## 1. 「階層がある」から「階層の重みを計算する」へ

[SG5の閾値階層](../SG5/index.md#prop-sg5-threshold-partitions)では、overlapの超距離性が成立すれば、類似度が高いレプリカを集める同値類が入れ子になると分かった。しかし、この事実だけでは、各小集団がGibbs測度の何割を担うか、あるいは[SK圧力の極限](../SG3/index.md#thm-sg3-pressure-limit)の数値をどう求めるかは分からない。

目標は二つある。まず、枝分かれする集団の**ランダムな重み**を具体的に生成する。次に、その重みを持つ試行系とSK系をGaussian補間で結び、圧力を評価する。前者がRuelle確率カスケード（RPC）、後者から得る式がParisi汎関数である。ここでは有限段の構成とGuerraの上界を詳細に証明する。一方、上界が実際に等号になるという深い下界定理は、証明の境界を明記して原論文につなぐ。

以下、$\beta\ge0$ は逆温度、$h\in\mathbb R$ は外場で、圧力は $\frac1N\mathbb E\log Z_N$ とする。熱力学自由エネルギー $-\beta^{-1}p$ と混同しない。SK Gaussian場には[対角項を含む等価表示](../SG3/index.md#prop-sg3-representation)を用い、

$$
\mathbb E H_N(\sigma)H_N(\tau)=\frac N2R(\sigma,\tau)^2,\qquad
R(\sigma,\tau)=\frac1N\sum_{i=1}^N\sigma_i\tau_i
$$

とする。標準の非対角SK表示との差は独立な配置共通Gaussian項なので、期待対数圧力には影響しない。

## 2. まず一段のランダム重みを作る

有限個の固定重みでは階層の揺らぎを表せない。そこで、$0<m<1$ とし、正の半直線上のPoisson点列 $(u_j)_{j\ge1}$ を強度 $m u^{-1-m}\,du$ で生成する。無限小の点は無数に存在するが、その総和は有限である。大きい点は有限個しかなく、小さい点の総和の期待値は有限だからである。

<a id="def-sg6-poisson-weights"></a>

<!-- formal-statement-start -->
> **定義（Poisson–Dirichlet型の確率重み）**  
> $0<m<1$ とし、上のPoisson点列の総和を $S=\sum_j u_j$ とする。降順に並べた
> $v_j=u_j/S$ を一段の確率重みとする。ほとんど確実に $S\in(0,\infty)$、$\sum_jv_j=1$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sg6-poisson-weights -->
### 具体例：正規化と共有度

**定義の確認**： 例えば確定的な点を $8,2,1$ の三つだけに切り詰めて考えると、正規化後の重みは $8/11,2/11,1/11$ となる。これはPoisson点列そのものの標本ではないが、正規化の操作を示す。独立な二標本が同じ枝に入る条件付き確率は

$$
\frac{8^2+2^2+1^2}{11^2}=\frac{69}{121}
$$

となる。本物のRPCでは点が無限個であり、この量自身もランダムになる。

$m=1/2$ で実際のPoisson点列を見よう。$0<u\le1$ の点の総和の期待値と、$u>1$ の点数の期待値は、それぞれ

$$
\int_0^1u\cdot\frac12u^{-3/2}du=1,
\qquad
\int_1^\infty\frac12u^{-3/2}du=1
$$

である。したがって大きい点は有限個、微小点の総和は有限で、正規化の分母はほとんど確実に有限かつ正である。
<!-- definition-example-end -->

<a id="lem-sg6-poisson-tilt"></a>

<!-- formal-statement-start -->
> **補題（Poisson重みの独立指数傾斜）**  
> $0<m<1$ とする。Poisson点列 $(u_j)$ に対し独立同分布な実数マーク $(Y_j)$ を付け、$\mathbb E e^{mY_1}<\infty$ とする。このとき
>
$$
\mathbb E\log\sum_jv_je^{Y_j}
=\frac1m\log\mathbb E e^{mY_1}.
$$
>
> 右辺の期待値はマークの分布について取り、左辺の期待値はPoisson点列とマークの両方について取る。
<!-- formal-statement-end -->

### 証明の見取り図

点 $u_j$ を $u_je^{Y_j}$ に変えると、Poisson強度は一定倍される。総和の対数の期待値の差だけを計算すればよい。これは一段のRPCの計算エンジンとなる。

<!-- proof-start -->
### 証明

マーク付きPoisson過程の写像を使う。$w=ue^y$ と変数変換すると、$u=we^{-y}$、$du=e^{-y}dw$ だから、固定した $y$ について

$$
m u^{-1-m}\,du
=m(we^{-y})^{-1-m}e^{-y}\,dw
=e^{my}m w^{-1-m}\,dw.
$$

マークについて平均すると、$(u_je^{Y_j})$ は強度 $c m w^{-1-m}dw$ のPoisson過程と同じ法則を持つ。ただし $c=\mathbb Ee^{mY_1}$ である。元のPoisson点列を一斉に $c^{1/m}$ 倍しても同じ強度となるので

$$
\sum_j u_je^{Y_j}\ \stackrel d=\ c^{1/m}S.
$$

$S$ の対数は可積分である。実際、Poisson過程の指数型期待値 $\mathbb Ee^{-tS}=\exp(-\Gamma(1-m)t^m)$ から正負の十分小さい冪モーメントが有限となり、$|\log S|$ はそれらで支配できる。従って

$$
\mathbb E\log\frac{\sum_j u_je^{Y_j}}S
=\mathbb E\log(c^{1/m}S)-\mathbb E\log S
=\frac{\log c}{m}.
$$

左辺の比は $\sum_jv_je^{Y_j}$ である。これで示された。
<!-- proof-end -->

**計算例。** $Y=aZ$、$Z\sim N(0,1)$ なら $\mathbb Ee^{mY}=e^{m^2a^2/2}$ である。よって傾斜後の期待対数正規化定数は $ma^2/2$ となる。$m$ が小さいほど、少数の大きな枝が支配的になる。

## 3. 多段のRuelle確率カスケード

一段で重みを作れたので、各枝からさらに枝を伸ばす。有限段のParisiパラメータを

$$
0=q_0\le q_1\le\cdots\le q_k\le q_{k+1}=1,
\qquad
0=m_0<m_1<\cdots<m_k<1
$$

と固定する。$q$ はoverlapの水準、$m$ は枝の重みの指数で、同じ役割の変数ではない。$k\ge1$ とする。

<a id="def-sg6-rpc"></a>

<!-- formal-statement-start -->
> **定義（有限段Ruelle確率カスケード）**  
> 深さ $k$ の根付き木を考える。深さ $\ell-1$ の各節点から伸びる子に、互いに独立なPoisson点列を付ける。その強度は

$$
m_\ell u^{-1-m_\ell}\,du,\qquad \ell=1,\ldots,k
$$

> である。葉 $\alpha=(\alpha_1,\ldots,\alpha_k)$ の非正規化重みを、根から葉までの点の積 $w_\alpha$ とし、
>
$$
v_\alpha=\frac{w_\alpha}{\sum_{\gamma}w_\gamma}
$$
>
> と置く。葉二つの最後に共通する節点の深さを $d(\alpha,\gamma)$ とし、異なる葉のoverlapを $Q_{\alpha\gamma}=q_{d(\alpha,\gamma)+1}$、同じ葉のoverlapを $Q_{\alpha\alpha}=1$ とする。これを有限段RPCと呼ぶ。
<!-- formal-statement-end -->

$m_1<\cdots<m_k$ の順序が総質量の有限性を保証する。例えば深さ二では、子側の総質量は指数 $m_2$ の安定分布を持ち、その $m_1$ 次モーメントが有限であるため、親側のPoisson積の総和は有限となる。この考えを下段から繰り返す。

<!-- definition-example-start: def-sg6-rpc -->
### 二段の直接例

**定義の確認**： 木の共通祖先の深さと、$q$ の水準を実際に対応させる。

$k=2$ で $q_1=0$、$q_2=1/3$、$q_3=1$ とする。異なる第1枝にいる葉のoverlapは $0$、同じ第1枝だが異なる第2枝なら $1/3$、同じ葉なら $1$ である。三つの葉 $\alpha=(1,1)$、$\gamma=(1,2)$、$\delta=(2,1)$ について

$$
(Q_{\alpha\gamma},Q_{\alpha\delta},Q_{\gamma\delta})
=(1/3,0,0)
$$

となる。最小の値が二度現れるので、[SG5の超距離不等式](../SG5/index.md#def-sg5-ultrametric)を満たす。ここではoverlapだけでなく、各葉に確率重み $v_\alpha$ も付いている。
<!-- definition-example-end -->

<a id="prop-sg6-rpc-hierarchy"></a>

<!-- formal-statement-start -->
> **命題（RPCの階層性と二標本のoverlap）**  
> 上記の有限段RPCから条件付き独立に二つの葉を抽出する。木上の $Q$ は各標本ごとにultrametricである。また無条件のoverlap分布は
>
$$
\mathbb P(Q_{12}=q_\ell)=m_\ell-m_{\ell-1}
\quad(1\le\ell\le k),\qquad
\mathbb P(Q_{12}=1)=1-m_k
$$
>
> である。ただし同じ $q$ 値が重なる場合は対応する質量を足し合わせる。
<!-- formal-statement-end -->

### 証明の見取り図

最初に枝分かれした水準が三標本の最小overlapを決める。二標本分布については、一段Poisson正規化重みの二乗和の期待値 $\mathbb E\sum_jv_j^2=1-m$ を出し、木の階層へ適用する。

<!-- proof-start -->
### 証明

三つの葉を取る。最初の枝分かれが起きる深さまで三つの道は共通であり、その後、少なくとも一つの葉が他の葉と離れる。離れた葉と残り二つとの最終共通深さは等しいので、三辺のoverlapの最小値は少なくとも二回現れる。従って[ultrametricの定義](../SG5/index.md#def-sg5-ultrametric)を満たす。

一段Poisson過程の総質量 $S$ について $\mathbb Ee^{-tS}=\exp(-\Gamma(1-m)t^m)$ である。また $S^{-2}=\int_0^\infty t e^{-tS}dt$ を用いる。Poisson点を一つ選んだとき、残りの点過程は元の点過程と同じ法則を持つ。この1点挿入による期待値の展開から

$$
\mathbb E\sum_j\frac{u_j^2}{S^2}
=\int_0^\infty t e^{-\Gamma(1-m)t^m}
\left(\int_0^\infty m u^{1-m}e^{-tu}du\right)dt.
$$

内側の積分は $m\Gamma(2-m)t^{m-2}$ だから、$s=\Gamma(1-m)t^m$ に変数変換すると

$$
\frac{m\Gamma(2-m)}{m\Gamma(1-m)}
\int_0^\infty e^{-s}ds
=\frac{\Gamma(2-m)}{\Gamma(1-m)}=1-m.
$$

深さ $\ell$ で切った木の非正規化節点重みを調べる。深さ $\ell-1$ の親 $v$ の重み $W_v$ を固定すると、子の重み $W_vu_{v,j}$ は変数変換 $x=W_vu$ により強度 $m_\ell W_v^{m_\ell}x^{-1-m_\ell}dx$ のPoisson過程となる。親ごとの過程を重ねると、深さ $\ell$ の全節点重みは条件付きで強度

$$
m_\ell\left(\sum_{|v|=\ell-1}W_v^{m_\ell}\right)x^{-1-m_\ell}dx
$$

のPoisson過程である。括弧内はほとんど確実に有限である。$\ell=1$ では親が根一つだから1となり、$\ell>1$ では前段の指数が $m_{\ell-1}<m_\ell$ なので、強度 $x^{-1-m_{\ell-1}}$ の過程の $m_\ell$ 次冪の和が有限であることを帰納的に使える。

最終段まで葉を生成したあと、深さ $\ell$ の節点 $v$ が持つ葉重みの総和は $W_vT_v$ と書ける。ここで $T_v$ はその下の独立な子木の総質量である。指数の順序 $m_\ell<m_{\ell+1}$ により、$\ell<k$ なら $\mathbb ET_v^{m_\ell}<\infty$ となる。最下段 $\ell=k$ では $T_v=1$ とする。

$T_v$ は深さ $\ell$ の節点ごとに独立同分布であり、節点重みと独立である。親の重みを固定した条件の下で、$x=W_vu_{v,j}T_{v,j}$ と写像すると、Poisson強度の係数は $\mathbb ET_v^{m_\ell}$ 倍される。従って葉質量を接頭辞ごとに合算した点過程の条件付き強度は

$$
m_\ell\left(\sum_{|v|=\ell-1}W_v^{m_\ell}\right)
\mathbb ET_v^{m_\ell}\,x^{-1-m_\ell}\,dx
$$

である。この強度の係数は点の大きさ $x$ に依存せず、全点の一様な伸縮に対応する。従って正規化後の接頭辞重みは指数 $m_\ell$ のPoisson–Dirichlet型になる。

ここで二標本が深さ $\ell$ まで同じ枝をたどる確率は $1-m_\ell$ である。従って

$$
\mathbb P(d(\alpha^1,\alpha^2)\ge\ell)=1-m_\ell
$$

である。隣り合う累積確率の差を取ると、$q_\ell$ の確率は $m_\ell-m_{\ell-1}$、対角値 $1$ の確率は $1-m_k$ となる。
<!-- proof-end -->

ここでの有限段RPCは、[GG恒等式](../SG5/index.md#def-sg5-gg)と超距離性を持つ極限Gibbs測度の階層を理解する具体モデルである。ただし、任意の有限サイズSKのGibbs重みがこの木と同一である、という主張ではない。

## 4. カスケードを積分するとParisi汎関数が現れる

RPCは階層構造を与えたが、圧力を数値として評価するには、葉に付けたGaussian場も積分しなければならない。$Z_1,\ldots,Z_{k+1}$ を独立な標準正規変数とし、下から順に指数平均する方法を用いる。

<a id="def-sg6-parisi-functional"></a>

<!-- formal-statement-start -->
> **定義（有限段Parisi汎関数）**  
> $\beta\ge0$、$h\in\mathbb R$、上記の $q_\ell,m_\ell$ に対して
>
$$
X_{k+1}=\log\cosh\left(h+\beta\sum_{\ell=1}^{k+1}
\sqrt{q_\ell-q_{\ell-1}}Z_\ell\right)
$$
>
> と置く。$\ell=k,k-1,\ldots,1$ の順に、$Z_1,\ldots,Z_\ell$ を固定した条件付き平均により
>
$$
X_\ell=\frac1{m_\ell}\log
\mathbb E_{Z_{\ell+1}}\exp(m_\ell X_{\ell+1}),
\qquad X_0=\mathbb E_{Z_1}X_1
$$
>
> と定める。このとき有限段Parisi汎関数は
>
$$
\mathcal P_k(\beta,h;q,m)
=\log2+X_0-\frac{\beta^2}{4}
\sum_{\ell=1}^k m_\ell(q_{\ell+1}^2-q_\ell^2)
$$
>
> である。
<!-- formal-statement-end -->

$X_{\ell}$ は未積分の $Z_1,\ldots,Z_\ell$ の関数である。$X_0$ は定数である。$m_\ell$ が零へ近づく境界では $(1/m)\log\mathbb Ee^{mX}\to\mathbb EX$ と連続に延長する。

<!-- definition-example-start: def-sg6-parisi-functional -->
### 一段のRS極限を直接計算する

**定義の確認**： $X_1$ の条件付き指数平均と $X_0$ の最後の平均を別々に計算する。

$k=1$、$q_1=q$、$q_2=1$ とする。$m_1=m\uparrow1$ では

$$
X_1\longrightarrow\log\mathbb E_{Z_2}
\cosh(h+\beta\sqrt q Z_1+\beta\sqrt{1-q}Z_2).
$$

正規変数の指数モーメントと $\cosh x=(e^x+e^{-x})/2$ により

$$
\mathbb E_{Z_2}\cosh(a+bZ_2)=e^{b^2/2}\cosh a.
$$

したがって $X_0\to\mathbb E\log\cosh(h+\beta\sqrt qZ)+\frac{\beta^2}{2}(1-q)$ となり、

$$
\mathcal P_{\rm RS}(q)
=\log2+\mathbb E\log\cosh(h+\beta\sqrt q Z)
+\frac{\beta^2}{4}(1-q)^2.
$$

これは[SG4のRS試行圧力](../SG4/index.md#def-sg4-rs-functional)と一致する。特に $q=h=0$ なら $\log2+\beta^2/4$ である。**符号検算**：補正項の係数を誤って $\beta^2/2$ とすると、$(1-q)^2$ が得られない。
<!-- definition-example-end -->

<a id="prop-sg6-rpc-recursion"></a>

<!-- formal-statement-start -->
> **命題（RPCのGaussian積分と再帰式）**  
> 有限段RPCの葉 $\alpha$ ごとに、各サイト $i$ 独立な中心Gaussian場 $z_i(\alpha)$ を置き、
>
$$
\mathbb Ez_i(\alpha)z_j(\gamma)
=\delta_{ij}Q_{\alpha\gamma}
$$
>
> とする。この場とRPC重みは独立とする。任意の整数 $N\ge1$ について
>
$$
\frac1N\mathbb E\log\left[
\sum_\alpha v_\alpha\prod_{i=1}^N
2\cosh(h+\beta z_i(\alpha))\right]
=\log2+X_0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

根に共通な分散 $q_1$ のGaussian増分、深さ $\ell$ の各枝に独立な分散 $q_{\ell+1}-q_\ell$ の増分を置く。この構成の共分散は $Q_{\alpha\gamma}$ になる。最下段の子について[Poisson重みの独立指数傾斜](#lem-sg6-poisson-tilt)を使い、葉から根へ繰り返す。

<!-- proof-start -->
### 証明

各サイトで独立に、根の変数 $\sqrt{q_1}Z_{i,1}$、深さ $\ell$ の各節点に $\sqrt{q_{\ell+1}-q_\ell}Z_{i,\ell+1,\text{節点}}$ を付けて、葉への道に沿って和を取る。同じ葉の分散は $q_1+\sum_{\ell=1}^k(q_{\ell+1}-q_\ell)=1$、異なる葉の共分散は共通祖先までの増分和 $q_{d+1}$ であり、指定通りである。

$k=1$ なら、根のGaussian増分 $(Z_{i,1})_{i\le N}$ を固定する。枝のマークを

$$
Y_\alpha=\sum_{i=1}^N\log\cosh
(h+\beta\sqrt{q_1}Z_{i,1}+
\beta\sqrt{1-q_1}Z_{i,2,\alpha})
$$

と置く。枝ごとの $Y_\alpha$ は条件付き独立同分布なので、[Poisson重みの独立指数傾斜](#lem-sg6-poisson-tilt)を条件付きで適用し、

$$
\mathbb E\left[\log\sum_\alpha v_\alpha e^{Y_\alpha}
\mid (Z_{i,1})_{i\le N}\right]
=\frac1{m_1}\log\mathbb E
\left[e^{m_1\sum_i\log\cosh(\cdots)}
\mid (Z_{i,1})_{i\le N}\right].
$$

右辺のGaussianはサイトごとに独立だから、対数の中の期待値が積に分かれ、右辺は $\sum_i X_1(Z_{i,1})$ となる。根のGaussianも平均すると $NX_0$。先に分離した $2^N$ が $N\log2$ を与える。

多段で注意するのは、子木の総質量が上段のPoisson点の**ランダムなマーク**になることである。$k=2$ でこれを計算する。根のGaussian $(Z_{i,1})_{i\le N}$ を固定し、第1枝を $a$、その子を $b$ と書く。子のPoisson点を $u_{a,b}$、その総質量を $S_a=\sum_bu_{a,b}$ とし、葉のマークを

$$
F_{a,b}=\sum_{i=1}^N\log\cosh\!\left(
h+\beta\sqrt{q_1}Z_{i,1}
+\beta\sqrt{q_2-q_1}Z_{i,2,a}
+\beta\sqrt{1-q_2}Z_{i,3,a,b}\right)
$$

とする。第1枝のGaussianも固定すれば、子のマークは独立同分布であり、[Poisson重みの独立指数傾斜の写像計算](#lem-sg6-poisson-tilt)から

$$
c_a=\mathbb E_{Z_3}e^{m_2F_{a,b}}
=\exp\!\left(m_2\sum_{i=1}^N
X_2(Z_{i,1},Z_{i,2,a})\right).
$$

従って子の総和は次の分布等式を満たす。

$$
\sum_bu_{a,b}e^{F_{a,b}}
\ \stackrel d=\ c_a^{1/m_2}S_a
=S_a\exp\!\left(\sum_iX_2(Z_{i,1},Z_{i,2,a})\right).
$$

ここで右辺の $S_a$ は、同じ分布の独立な子木総質量として取り直してよい。元の分母の $S_a$ と同時に等置するのではなく、**分子・分母の期待対数を別々に計算する**。$S_a$ は指数 $m_2$ のPoisson総質量である。$S_a=S_a^{\le1}+S_a^{>1}$ と分ける。$0<p<1$ なら非負の $x,y$ について $(x+y)^p\le x^p+y^p$、$x^p\le1+x$ である。この二つの不等式を $p=m_1$ に用いると

$$
\mathbb ES_a^{m_1}
\le 1+\mathbb ES_a^{\le1}
+\mathbb E\sum_{u_{a,b}>1}u_{a,b}^{m_1}
=1+\frac{m_2}{1-m_2}
+\frac{m_2}{m_2-m_1}<\infty
$$

となる。第1枝のPoisson点を $u_a$ とすると、根のGaussianを固定した条件で、上段の独立標識写像とPoisson総質量の伸縮則により

$$
\mathbb E\log\sum_a u_a\sum_bu_{a,b}e^{F_{a,b}}
-\mathbb E\log\sum_a u_aS_a
=\frac1{m_1}\log
\frac{\mathbb E_{S,Z_2}
\left[S^{m_1}\exp\!\left(m_1\sum_i
X_2(Z_{i,1},Z_{i,2})\right)\right]}
{\mathbb ES^{m_1}}.
$$

$S$ と $Z_2$ は独立であり、サイトごとの $Z_{i,2}$ も独立なので、分子は積に分かれる。従って上式は

$$
\sum_{i=1}^N\frac1{m_1}\log
\mathbb E_{Z_2}e^{m_1X_2(Z_{i,1},Z_2)}
=\sum_{i=1}^NX_1(Z_{i,1})
$$

となる。

二段ではこれで再帰式を得た。一般の $k$ でも下段のPoisson点を先にGaussianマークで写し、その子木総質量の $m_{\ell}$ 次モーメントが有限であること（$m_{\ell}<m_{\ell+1}$）を使い、上段の分子・分母の期待対数の差を取る。同じ計算を葉から根へ順に反復すれば $X_k,X_{k-1},\ldots,X_1$ が現れ、根のGaussianの平均が $NX_0$、分離した $2^N$ が $N\log2$ を与える。
<!-- proof-end -->

## 5. Guerra補間：平方の残差が上界を作る

[SG2のGaussian補間恒等式](../SG2/index.md#thm-sg2-interpolation)を、スピン配置 $\sigma$ とRPCの葉 $\alpha$ の組へ適用する。Gaussian場の共分散を正確に設計すると、微分は負の平方になる。

<a id="thm-sg6-guerra-bound"></a>

<!-- formal-statement-start -->
> **定理（有限段Guerra補間の和公式と上界）**  
> [対角項付きSK場](../SG3/index.md#prop-sg3-representation) $H_N$、任意の有限段RPC、独立なGaussian場 $z_i(\alpha)$ と $y(\alpha)$ を取り、
>
$$
\mathbb Ez_i(\alpha)z_j(\gamma)=\delta_{ij}Q_{\alpha\gamma},
\qquad \mathbb Ey(\alpha)y(\gamma)=\frac12Q_{\alpha\gamma}^2.
$$
>
> $H_N,z,y$ は互いに独立、RPC重みとも独立とする。$t\in[0,1]$ で
>
$$
\mathcal H_t(\sigma,\alpha)=\sqrt t H_N(\sigma)
+\sqrt{1-t}\sum_{i=1}^N z_i(\alpha)\sigma_i
+\sqrt{tN}\,y(\alpha)
$$
>
> とし、$\langle\cdot\rangle_t$ は重み $v_\alpha\exp(\beta\mathcal H_t+h\sum_i\sigma_i)$ のGibbs平均（同じ無秩序で二レプリカを抽出）とする。このとき
>
$$
p_N(\beta,h)=\mathcal P_k(\beta,h;q,m)
-\frac{\beta^2}{4}\int_0^1
\mathbb E\left\langle
(R(\sigma^1,\sigma^2)-Q_{\alpha^1\alpha^2})^2
\right\rangle_t\,dt.
$$
>
> 従って全 $N\ge1$ に対して $p_N(\beta,h)\le\mathcal P_k(\beta,h;q,m)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

まず $t=0$ はスピン和をサイトごとに分離でき、[RPC再帰命題](#prop-sg6-rpc-recursion)で $\log2+X_0$ になる。$t=1$ ではSKの分配関数と $y$ のカスケード分配関数が積へ分かれ、後者はParisi汎関数の補正項を生む。途中の導関数は、共分散の差が平方完成するため非正になる。

<!-- proof-start -->
### 証明

正規化対数分配関数を

$$
\phi_N(t)=\frac1N\mathbb E\log
\sum_\alpha v_\alpha\sum_{\sigma\in\{-1,1\}^N}
\exp\left(\beta\mathcal H_t(\sigma,\alpha)
+h\sum_{i=1}^N\sigma_i\right)
$$

と書く。$t=0$ では $\sigma$ ごとに足すと $\prod_i2\cosh(h+\beta z_i(\alpha))$ を得るので、[RPCのGaussian積分と再帰式](#prop-sg6-rpc-recursion)から

$$
\phi_N(0)=\log2+X_0.
$$

$t=1$ では指数が $\beta H_N(\sigma)+h\sum_i\sigma_i+\beta\sqrt N y(\alpha)$ に分離する。従って

$$
\phi_N(1)=p_N(\beta,h)+\frac1N\mathbb E\log
\sum_\alpha v_\alpha e^{\beta\sqrt N y(\alpha)}.
$$

$y$ は根に共通な分散 $q_1^2/2$ と、深さ $\ell$ の分散 $(q_{\ell+1}^2-q_\ell^2)/2$ の独立Gaussian増分の和として構成できる。根の項は平均対数へ寄与しない。各深さで[Poisson重みの独立指数傾斜](#lem-sg6-poisson-tilt)を $Y=\beta\sqrt{N(q_{\ell+1}^2-q_\ell^2)/2}\,Z$ に適用すると

$$
\frac1{m_\ell}\log\mathbb Ee^{m_\ell Y}
=\frac{\beta^2N}{4}m_\ell(q_{\ell+1}^2-q_\ell^2).
$$

下段から加算して

$$
\phi_N(1)=p_N(\beta,h)
+\frac{\beta^2}{4}\sum_{\ell=1}^k
m_\ell(q_{\ell+1}^2-q_\ell^2).
$$

次に $a=(\sigma,\alpha)$、$b=(\tau,\gamma)$ と書く。$t=1$ 側の共分散と $t=0$ 側の共分散はそれぞれ

$$
C_1(a,b)=\frac N2R(\sigma,\tau)^2+\frac N2Q_{\alpha\gamma}^2,
\qquad
C_0(a,b)=N R(\sigma,\tau)Q_{\alpha\gamma}.
$$

ゆえに

$$
C_1(a,b)-C_0(a,b)=\frac N2
(R(\sigma,\tau)-Q_{\alpha\gamma})^2.
$$

同じ状態 $a=b$ では $R(\sigma,\sigma)=1$ と $Q_{\alpha\alpha}=1$ なので共分散差は零。[Gaussian補間微分の式](../SG2/index.md#thm-sg2-interpolation)で、対角項と二レプリカ項を分離すると

$$
\phi_N'(t)=\frac{\beta^2}{2N}\mathbb E
\left\langle (C_1-C_0)(a,a)
-(C_1-C_0)(a^1,a^2)\right\rangle_t
=-\frac{\beta^2}{4}\mathbb E
\left\langle(R_{12}-Q_{\alpha^1\alpha^2})^2\right\rangle_t.
$$

右辺は非正である。端点について基本定理 $\phi_N(1)-\phi_N(0)=\int_0^1\phi_N'(t)dt$ を使い、二つの端点式を代入して $p_N$ を解けば主張の和公式になる。$\sqrt t$ の微分は内部区間で行い、端点はGaussian積分の連続性で極限を取る。Poisson和は正規化後に有限であり、最初に葉を有限個へ制限し、Gaussian積分と単調近似・可積分性により極限を戻せる。
<!-- proof-end -->

### ここまでで何が証明されたか

非負な平方誤差を落とすと上界になる。逆に上界が等号になるには、適切な試行overlapとの残差を極限で消す必要があり、単にカスケードがultrametricだという理由では足りない。$h=0$、$q_1=0$、$m_1\uparrow1$ の極限では $\mathcal P=\log2+\beta^2/4$ となり、[SG4の高温圧力](../SG4/index.md#thm-sg4-high-temperature)と整合する。

## 6. 変分原理の「上界」から「等号」へ

有限段の試行パラメータをすべて動かせば

$$
p_N(\beta,h)\le
\inf_{\substack{k,q,m\\0=q_0\le\cdots\le q_{k+1}=1\\
0=m_0<m_1<\cdots<m_k<1}}\mathcal P_k(\beta,h;q,m)
$$

となる。上界を最適化するという操作だけでは、最適値に一致する下界は導けない。

<a id="thm-sg6-parisi-principle"></a>

<!-- formal-statement-start -->
> **定理（SK模型のParisi変分原理：研究級の外部定理）**  
> 独立な標準Gaussian結合を持つSK模型で、$\beta\ge0$、$h\in\mathbb R$ を固定する。quenched圧力の熱力学極限は存在し、上で定義した有限段Parisi汎関数の全試行パラメータについて
>
$$
\lim_{N\to\infty}p_N(\beta,h)
=\inf_{k,q,m}\mathcal P_k(\beta,h;q,m)
$$
>
> が成立する。等値の $q_\ell$ や境界値の $m_\ell$ は極限として許しても同じ下限を与える。
<!-- formal-statement-end -->

この定理はM. Talagrand, *The Parisi formula*, Annals of Mathematics **163** (2006), 221–263, [原論文](https://annals.math.princeton.edu/2006/163-1/p04) による。上界の核心は[この章のGuerra補間定理](#thm-sg6-guerra-bound)で閉じた。反対側の下界には、overlap構造の制御、摂動、極限Gibbs測度の表現など、有限段補間だけでは出てこない解析が必要である。[SG5のPanchenko定理](../SG5/index.md#thm-sg5-panchenko)は極限overlapの超距離性を与えるが、単独でParisi等式を証明するものではない。

**証明の境界。** 本章はParisi等式全体の完全証明を提示したとは主張しない。厳密に再現可能なのは有限段のPoisson構成・再帰計算・Guerra上界である。Parisi等式の下界部分はTalagrandの研究級定理を明示的に使用する。後続のdiluted模型では同じ平方誤差の符号が直ちに使えないため、この区別が特に重要となる。

## 演習問題

### Level A：カスケードの仕組みを確認する

**SG6-A1：一段Poisson傾斜。** $m=1/2$、$Y=aZ$、$Z\sim N(0,1)$ とする。$\mathbb E\log\sum_jv_je^{Y_j}$ を求めよ。

- Level: A

<!-- solution-start -->
### 詳細解答

[Poisson重みの独立指数傾斜](#lem-sg6-poisson-tilt)へ $m=1/2$ を代入する。正規変数の指数モーメントは $\mathbb Ee^{m aZ}=\exp(m^2a^2/2)$ だから

$$
\frac1m\log\mathbb Ee^{maZ}
=\frac1m\frac{m^2a^2}{2}
=\frac{ma^2}{2}=\frac{a^2}{4}.
$$

重みの各実現で $\sum_jv_j=1$ でも、指数傾斜後の対数平均は一般に零ではない。
<!-- solution-end -->

**SG6-A2：二段overlap。** $k=2$、$(q_1,q_2,q_3)=(0,1/4,1)$ とする。葉 $(1,1),(1,3),(2,1)$ の三つの相互overlapを求め、超距離不等式を確認せよ。

- Level: A

<!-- solution-start -->
### 詳細解答

第1・第2葉は最初の枝を共有し、第2枝で分かれるので深さ1まで共通、$Q=q_2=1/4$。第3葉は第1枝から異なるので他の二葉との共通深さは0であり、それぞれ $Q=q_1=0$。従って三辺は $(1/4,0,0)$ である。[超距離性](../SG5/index.md#def-sg5-ultrametric)の条件を三辺について確認すると、$1/4\ge\min(0,0)=0$ と $0\ge\min(1/4,0)=0$（残りも同じ）が成り立つ。
<!-- solution-end -->

**SG6-A3：Parisi補正項。** $k=2$、$(q_1,q_2,q_3)=(0,1/2,1)$、$(m_1,m_2)=(1/3,2/3)$ とする。$\sum_{\ell=1}^2m_\ell(q_{\ell+1}^2-q_\ell^2)$ を求めよ。

- Level: A

<!-- solution-start -->
### 詳細解答

$\ell=1$ の寄与は $(1/3)((1/2)^2-0)=1/12$、$\ell=2$ の寄与は $(2/3)(1-(1/2)^2)=(2/3)(3/4)=1/2$。和は $1/12+1/2=7/12$ である。したがって[有限段Parisi汎関数](#def-sg6-parisi-functional)の補正として引く値は $7\beta^2/48$。
<!-- solution-end -->

**SG6-A4：平方完成。** 任意の $r,s\in[-1,1]$ について $\frac12r^2+\frac12s^2-rs\ge0$ を示し、$r=s$ の場合の値を述べよ。

- Level: A

<!-- solution-start -->
### 詳細解答

$$
\frac12r^2+\frac12s^2-rs
=\frac12(r^2-2rs+s^2)
=\frac12(r-s)^2\ge0.
$$

$r=s$ なら零であり、逆に実数の平方は零のときに限り $r=s$ である。Guerra補間では $r=R_{12}$、$s=Q_{\alpha^1\alpha^2}$ と置く。
<!-- solution-end -->

### Level B：定理を別の設定で再構成する

**SG6-B1：二標本が同じ枝に入る確率。** 一段Poisson重み $v_j$ に対して $\mathbb E\sum_jv_j^2=1-m$ をLaplace積分から再導出せよ。$m=1/4$ の値も求めよ。

- Level: B

<!-- solution-start -->
### 詳細解答

$S=\sum_j u_j$ とすると、$S^{-2}=\int_0^\infty te^{-tS}dt$ である。Poisson点の1点挿入による期待値を展開する。選択された点 $u$ を除く点群は元のPoisson過程と同じ法則を持つので

$$
\mathbb E\sum_jv_j^2
=\int_0^\infty t\,\mathbb Ee^{-tS}
\int_0^\infty m u^{1-m}e^{-tu}du\,dt.
$$

内側は $m\Gamma(2-m)t^{m-2}$、指数型期待値 $\mathbb Ee^{-tS}$ は $\exp[-\Gamma(1-m)t^m]$。ゆえに

$$
m\Gamma(2-m)\int_0^\infty
t^{m-1}e^{-\Gamma(1-m)t^m}dt.
$$

$s=\Gamma(1-m)t^m$ とおくと $m t^{m-1}dt=ds/\Gamma(1-m)$ なので値は $\Gamma(2-m)/\Gamma(1-m)=1-m$。$m=1/4$ なら $3/4$ である。
<!-- solution-end -->

**SG6-B2：RS試行式の極限。** $k=1$、$q_1=q$ で $m_1\uparrow1$ の極限を取り、$\mathcal P_{\rm RS}(q)$ を求めよ。特に $q=h=0$ の値を検算せよ。

- Level: B

<!-- solution-start -->
### 詳細解答

[Parisi汎関数の定義](#def-sg6-parisi-functional)では

$$
X_1=\frac1m\log\mathbb E_{Z_2}
\cosh^m(h+\beta\sqrt qZ_1+\beta\sqrt{1-q}Z_2).
$$

$\cosh$ のGaussian指数モーメントは有限なので $m\uparrow1$ で収束が成り立つ。$a=h+\beta\sqrt qZ_1$、$b=\beta\sqrt{1-q}$ と置き、$\cosh(a+bZ)=(e^{a+bZ}+e^{-a-bZ})/2$ から $\mathbb E\cosh(a+bZ)=e^{b^2/2}\cosh a$ を得る。従って

$$
X_0\to\mathbb E\log\cosh(h+\beta\sqrt qZ)
+\frac{\beta^2}{2}(1-q).
$$

補正は $\beta^2(1-q^2)/4$ なので

$$
\mathcal P_{\rm RS}(q)=\log2+
\mathbb E\log\cosh(h+\beta\sqrt qZ)
+\frac{\beta^2}{4}\{2(1-q)-(1-q^2)\}.
$$

中括弧は $1-2q+q^2=(1-q)^2$。$q=h=0$ では $\log\cosh0=0$ より $\log2+\beta^2/4$。
<!-- solution-end -->

**SG6-B3：Guerra補間の端点と微分。** $C_1=\frac N2(R^2+Q^2)$、$C_0=NRQ$、$R_{aa}=Q_{aa}=1$ から、$\phi_N'(t)$ を導き、なぜ符号が決まるのか説明せよ。

- Level: B

<!-- solution-start -->
### 詳細解答

まず共分散差を計算すると

$$
C_1-C_0=\frac N2(R^2-2RQ+Q^2)
=\frac N2(R-Q)^2.
$$

自己状態では $R=Q=1$ なので差は零となる。[SG2のGaussian補間微分公式](../SG2/index.md#thm-sg2-interpolation)は、対角差から二レプリカ差を引き $\beta^2/(2N)$ を掛ける形である。従って

$$
\phi_N'(t)=\frac{\beta^2}{2N}\mathbb E
\left[0-\left\langle\frac N2(R_{12}-Q_{12})^2\right\rangle_t\right]
=-\frac{\beta^2}{4}\mathbb E\langle(R_{12}-Q_{12})^2\rangle_t\le0.
$$

$\beta^2\ge0$、Gibbs重みは非負、平方も非負なので符号が確定する。単に「補間だから上界」という説明ではなく、この平方完成が必要である。
<!-- solution-end -->

### Level C：RPCと変分原理の接続

**SG6-C1：一段の和公式から変分上界まで。** $k=1$、$0\le q\le1$、$0<m<1$ とする。(a) RPCの $z$ 場と $y$ 場を共有成分・枝固有成分へ分解せよ。(b) $t=0$ と $t=1$ の圧力を計算せよ。(c) Guerraの和公式と上界を得よ。(d) その上界だけでParisi変分原理の等号を結論できるか答えよ。

- Level: C

<!-- solution-start -->
### 詳細解答

(a) 二つの異なる枝の $Q$ は $q$、同じ枝では $1$ である。サイト $i$ について独立標準正規変数 $A_i,B_{i,\alpha}$ を取り、

$$
z_i(\alpha)=\sqrt qA_i+\sqrt{1-q}B_{i,\alpha}
$$

と置く。異枝の共分散は $q$、同枝の分散は $q+(1-q)=1$。同様に独立な $U,V_\alpha$ で

$$
y(\alpha)=\frac q{\sqrt2}U+
\sqrt{\frac{1-q^2}{2}}V_\alpha
$$

と置けば共分散は異枝で $q^2/2$、同枝で $1/2$ となる。

(b) $t=0$ のスピン和は $\prod_i2\cosh(h+\beta z_i(\alpha))$ である。根の $(A_i)$ を固定し、枝のマークは独立である。そこで[Poisson重みの独立指数傾斜](#lem-sg6-poisson-tilt)を使うと

$$
\phi_N(0)=\log2+\mathbb E_A\left[
\frac1m\log\mathbb E_B\cosh^m
(h+\beta\sqrt qA+\beta\sqrt{1-q}B)\right].
$$

$t=1$ ではスピン和と葉の和が分離する。$y$ の共通成分 $qU/\sqrt2$ は平均対数で零、枝固有成分は[Poisson重みの独立指数傾斜](#lem-sg6-poisson-tilt)より

$$
\frac1N\mathbb E\log\sum_\alpha v_\alpha
e^{\beta\sqrt Ny(\alpha)}
=\frac{\beta^2m}{4}(1-q^2).
$$

したがって $\phi_N(1)=p_N+\beta^2m(1-q^2)/4$。

(c) [Guerra補間定理](#thm-sg6-guerra-bound)の共分散差は $N(R-Q)^2/2$ なので、その微分は $-\beta^2\mathbb E\langle(R-Q)^2\rangle_t/4$。積分して

$$
p_N=\log2+\mathbb E_A\frac1m\log
\mathbb E_B\cosh^m(h+\beta\sqrt qA+\beta\sqrt{1-q}B)
-\frac{\beta^2m}{4}(1-q^2)
-\frac{\beta^2}{4}\int_0^1\mathbb E\langle(R_{12}-Q_{12})^2\rangle_tdt.
$$

最後の積分は非負なので、最初の三項すなわち $\mathcal P_1$ が上界である。

(d) 結論できない。平方残差を捨てたのは片側評価だからである。等号の下界は[Parisi変分原理](#thm-sg6-parisi-principle)という別の研究級結果であり、適切なoverlap構造を示す議論が必要となる。
<!-- solution-end -->

## 参考文献

- F. Guerra, *Broken Replica Symmetry Bounds in the Mean Field Spin Glass Model* (2002), [arXiv:cond-mat/0205123](https://arxiv.org/abs/cond-mat/0205123). Guerra補間の原論文。
- M. Talagrand, *The Parisi formula*, Annals of Mathematics **163** (2006), 221–263, [原論文](https://annals.math.princeton.edu/2006/163-1/p04). Parisi等式の厳密証明。
- D. Panchenko, *The Parisi formula for mixed p-spin models*, Annals of Probability **42** (2014), 946–958, [原稿](https://arxiv.org/abs/1112.4409). 混合$p$-spin模型への拡張。
