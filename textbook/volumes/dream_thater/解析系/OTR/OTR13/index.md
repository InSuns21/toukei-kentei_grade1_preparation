# OTR13 いつ最適結合は凸勾配写像で表せるか

[OTR12 の Rockafellar 型構成](../OTR12/index.md#thm-otr12-rockafellar)により、二次費用で巡回単調な対応関係は凸関数の劣微分に含まれます。しかし、劣微分は一つの出発点に複数の到着点を対応させることがあります。どうすれば「質量を分割する結合」が「各点を一か所へ運ぶ写像」に変わるのでしょうか。

鍵は **$\mu\ll\mathcal L^d$ という条件**です。[測度の絶対連続性](../../../解析系/F0/F0-00P2/index.md#def-f0-00p2-absolute-continuity)により、この条件が成り立てば Lebesgue 零集合に $\mu$ の質量はありません。[OTR12 の凸関数の微分可能性定理](../OTR12/index.md#thm-otr12-convex-ae)は、その零集合の外で劣微分がただ一つの勾配になると教えます。ここで $\mathcal L^d$ は $\mathbb R^d$ の Lebesgue 測度を表します。

本章では、最適結合が本当に劣微分のグラフに載ること、そこで勾配を可測写像にできること、**どの最適結合でも同じ写像になること**を順に証明します。費用は一貫して $c(x,y)=\lVert x-y\rVert^2/2$ とします。一方、[Wasserstein 距離の定義](../OTR8/index.md#def-otr8-wasserstein)の $W_2^2$ には係数 $1/2$ が付きません。

## 1. 凸勾配はなぜ輸送を表せるのか

$d\ge1$ とします。$\mu,\nu\in\mathcal P_2(\mathbb R^d)$ は有限二次モーメントを持つ Borel 確率測度です。[押し出し測度](../OTR1/index.md#def-otr1-transport-map) $T_{\#}\mu=\nu$ は、$\mu$ に従って選んだ点 $x$ を $T(x)$ へ運ぶと到着分布が $\nu$ になるという意味でした。$\mu$-ほとんどすべての点で写像を指定すれば、零集合上の値を変更しても押し出しは変わりません。

例えば $\mu$ を $[0,1]$ 上の一様確率測度とし、$T(x)=2x$ とすると、$0\le t\le2$ に対して

$$
\mu\{x:T(x)\le t\}=\mu([0,t/2])=t/2.
$$

よって $T_{\#}\mu$ は $[0,2]$ 上で密度が一定の確率測度です。さらに $\varphi(x)=x^2$ は凸で、$T(x)=\varphi'(x)$ です。**輸送写像に凸関数の勾配を要求する**のが本章の新しい構造です。

<a id="def-otr13-convex-gradient-map"></a>

<!-- formal-statement-start -->
> **定義（凸勾配輸送写像）**
> $d\ge1$、$\mu,\nu\in\mathcal P_2(\mathbb R^d)$ とする。Borel 可測写像 $T:\mathbb R^d\to\mathbb R^d$ が $T_{\#}\mu=\nu$ を満たし、ある下半連続な真凸関数 $\varphi:\mathbb R^d\to(-\infty,+\infty]$ が存在して、$\varphi$ が $\mu$-ほとんど至る所で微分可能かつ

$$
T(x)=\nabla\varphi(x)\quad\text{$\mu$-ほとんど至る所}
$$

> となるとき、$T$ を $\varphi$ による凸勾配輸送写像という。勾配を定めない点では $T$ の値を任意に Borel 可測に補ってよい。
<!-- formal-statement-end -->

<!-- definition-example-start: def-otr13-convex-gradient-map -->
**定義の確認**。先ほどの $\varphi(x)=x^2$ について、任意の $x,z\in\mathbb R$ で

$$
\varphi(z)-\varphi(x)-2x(z-x)=(z-x)^2\ge0
$$

なので $\varphi$ は有限値・連続・凸で、$\nabla\varphi(x)=2x$ は全点で定義されます。$T(x)=2x$ は Borel 可測で、上の累積確率の計算により $T_{\#}\mu=\nu$ です。凸性・微分可能性・可測性・押し出しという定義の各条件を直接確かめました。
<!-- definition-example-end -->

今の例は凸勾配写像が*あり得る*ことしか示しません。一般の最適結合がそれ以外の仕方で質量を運べないことが、Brenier 定理の内容です。

## 2. 非コンパクト空間で最適な経路を取り出す

[OTR7 の最適支持定理](../OTR7/index.md#thm-otr7-support-optimality)はコンパクト空間・連続費用についての定理です。ここで必要な空間 $\mathbb R^d$ は非コンパクトなので、その定理の仮定を満たしません。代わりに、有限個の近接する経路の割当てを交換し、最適性に反するかどうかを直接調べます。

[結合の支持集合](../OTR7/index.md#def-otr7-support)は、どんな近傍にも正の結合質量がある点の集合です。Borel 確率測度の支持は閉で、全質量を持ちます。$\mathbb R^{2d}$ には可算個の開球からなる基底があるため、支持の補集合は測度 $0$ の基底開球の可算和に含まれるからです。

<a id="lem-otr13-noncompact-cyclic"></a>

<!-- formal-statement-start -->
> **補題（最適結合の非コンパクト二次費用巡回単調性）**
> $d\ge1$、$\mu,\nu\in\mathcal P_2(\mathbb R^d)$ とし、$\pi\in\Pi(\mu,\nu)$ が二次費用の積分を最小化するとする。費用を次で定める。

$$
c(x,y)=\frac12\lVert x-y\rVert^2.
$$

> このとき $\operatorname{supp}\pi$ は $c$-巡回単調である。従って [OTR12 の内積の意味](../OTR12/index.md#def-otr12-cyclic-relation)でも巡回単調である。
<!-- formal-statement-end -->

### 証明の見取り図

もし支持上の有限個の輸送先を巡回交換して費用が下がるなら、各経路の周囲にある正の質量を少し取り出して、到着側だけを巡回して組み直せます。各出発側・到着側の周辺分布を保ったまま、総費用を厳密に減らせるはずです。

<!-- proof-start -->
### 証明

$\Gamma=\operatorname{supp}\pi$ とします。[$c$-巡回単調性の定義](../OTR7/index.md#def-otr7-c-cyclic-monotonicity)に反すると仮定すると、ある $n\ge2$ と $(x_i,y_i)\in\Gamma$（$i=1,\ldots,n$、$y_{n+1}=y_1$）に対して

$$
\Delta:=\sum_{i=1}^n\{c(x_i,y_i)-c(x_i,y_{i+1})\}>0
$$

です。$c$ の連続性により、各 $(x_i,y_i)$ の有界な開直積近傍 $R_i=U_i\times V_i$ を十分小さく選び、任意の $(u_i,v_i)\in R_i$ について

$$
\sum_i\{c(u_i,v_i)-c(u_i,v_{i+1})\}>\Delta/2
$$

とできます。各 $R_i$ は支持の点を含むので $\pi(R_i)>0$ です。重なる近傍がある場合は、異なる中心のものを互いに素に縮め、同一中心が複数回現れたときはその近傍から同じ小質量を複数回取り出すことにします。

具体的に、すべての $i$ について $\pi_i=\varepsilon\pi|_{R_i}/\pi(R_i)$ と置きます。同じ $R_i$ が $k$ 回使われる場合は $k\varepsilon\le\pi(R_i)$ とすればよいので、$\varepsilon>0$ を十分小さく取って $\sum_i\pi_i\le\pi$ とできます。$\pi_i$ の第一・第二周辺測度をそれぞれ $\alpha_i,\beta_i$ とします。どちらも質量 $\varepsilon$ です。

到着側だけを次の組へ回した新しい測度を

$$
q_i=\frac{\alpha_i\otimes\beta_{i+1}}{\varepsilon},
\qquad\beta_{n+1}=\beta_1
$$

とします。$q_i$ の第一周辺は $\alpha_i$、第二周辺は $\beta_{i+1}$ です。従って

$$
\widetilde\pi=\pi-\sum_i\pi_i+\sum_iq_i
$$

は非負で、第一周辺 $\mu$ と第二周辺 $\nu$ をともに保ちます。費用差の評価には、各 $\pi_i/\varepsilon$ から独立に $(u_i,v_i)$ を取ればよいです。元の局所費用の期待値は $\sum_i\int c\,d\pi_i/\varepsilon$、到着側を交換した費用の期待値は $\sum_i\int c\,dq_i/\varepsilon$ です。したがって

$$
\int c\,d\pi-\int c\,d\widetilde\pi
=\sum_i\int c\,d\pi_i-\sum_i\int c\,dq_i
>\varepsilon\Delta/2>0.
$$

これは最適性に反します。よって $\Gamma$ は $c$-巡回単調です。[二次費用と内積の同値](../OTR12/index.md#prop-otr12-quadratic-equivalence)から最後の結論も従います。$\square$
<!-- proof-end -->

重要なのは、近傍が有界なので局所的な費用の積分は有限であり、無限遠での双対ポテンシャルの積分可能性を暗黙に仮定していない点です。$\mu,\nu\in\mathcal P_2$ なら独立結合 $\mu\otimes\nu$ の二次費用も有限なので、最適値は有限です。

## 3. 「ほとんど至る所」を出発測度で読み直す

前の補題と [Rockafellar 型構成](../OTR12/index.md#thm-otr12-rockafellar)により、最適結合の支持をある下半連続真凸関数 $\varphi$ の劣微分グラフへ含められます。ただし $\varphi$ は $+\infty$ を取り得るので、[$\operatorname{int}(\operatorname{dom}\varphi)$ 上の微分可能性](../OTR12/index.md#thm-otr12-convex-ae)を適用するために、$\mu$ がその内部に集中することを確かめます。

<a id="lem-otr13-borel-gradient"></a>

<!-- formal-statement-start -->
> **補題（凸ポテンシャルの微分可能集合と可測勾配）**
> $d\ge1$ とし、$\mu$ を $\mathbb R^d$ 上の Borel 確率測度で $\mu\ll\mathcal L^d$ とする。$\varphi$ は $\mathbb R^d$ 上の下半連続真凸関数とし、その実効定義域を $D$ と書く。

$$
D=\operatorname{dom}\varphi=\{x\in\mathbb R^d:\varphi(x)<+\infty\}.
$$

> $\mu(D)=1$ を仮定する。このとき $\mu(\operatorname{int}D)=1$ であり、$\varphi$ は $\mu$-ほとんど至る所で微分可能である。その勾配を全空間へ Borel 可測に拡張できる。
<!-- formal-statement-end -->

### 証明の見取り図

$D$ は凸集合です。$\mu(D)=1$ と絶対連続性から $D$ は正の Lebesgue 測度を持ち、全次元の内部ができます。凸集合の境界は零集合なので内部以外を捨てられ、内部で OTR12 の定理を使えます。偏微分は差商の極限だから可測性も回復できます。

<!-- proof-start -->
### 証明

**(1) 実効定義域の内部。** $D$ は空でない凸集合で、もし内部が空なら低次元のアフィン部分空間に含まれ Lebesgue 零集合となります。実際、$D$ のアフィン包が $\mathbb R^d$ なら $d+1$ 個のアフィン独立な点を取れて、その凸包の内部が $D$ に含まれるからです。$\mu\ll\mathcal L^d$ と $\mu(D)=1$ より零集合ではないため、$\operatorname{int}D\ne\varnothing$ です。

$a\in\operatorname{int}D$ を固定します。凸集合の閉包 $C=\overline D$ について $\operatorname{int}C=\operatorname{int}D$ です。例えば $a$ の周りの小球が $D$ に含まれ、$z\in C$ と $0<t<1$ に対して、$(1-t)a+tz$ の周りには半径を $(1-t)$ 倍した小球が $D$ に含まれます。従って $C\setminus\operatorname{int}D$ は $C$ の境界です。

この境界の零測度性を確認します。[支持超平面定理](../../../応用系/OPT/OPT2/index.md#thm-opt2-supporting-hyperplane)により、各境界点 $z$ には非零の法線 $v$ を持つ支持超平面があります。

ある座標 $j$ で $v_j\ne0$ なので、$z$ から座標方向 $e_j$ の片側へ進むと $C$ の外へ出ます。従って $z$ は、その直線と $C$ の交わりである区間の端点です。

各座標 $j$ に対し、$e_j$ 方向の直線切断の端点となる境界点全体を $E_j$ とします。$C$ は閉なので、例えば「すべての正整数 $m$ について $z+e_j/m\notin C$」という条件は可算個の開集合の共通部分で記述でき、反対方向も同様です。従って $E_j$ は Borel 集合です。各 $e_j$ 方向の直線切断には高々二つの端点しかありません。

[Fubini の定理](../../../解析系/F0/F0-00D2C/index.md#thm-f0-00d2c-02)を $E_j$ の指示関数に適用すると、$\mathcal L^d(E_j)=0$ です。すべての境界点は $d$ 個の $E_j$ の少なくとも一つに属するため、

$$
\mathcal L^d(\partial C)\le\sum_{j=1}^d\mathcal L^d(E_j)=0.
$$

絶対連続性により $\mu(\operatorname{int}D)=1$ が従います。

**(2) 微分可能性。** 開凸集合 $U=\operatorname{int}D$ 上で $\varphi$ は有限値凸関数なので、[有限値凸関数のほとんど至る所微分可能性](../OTR12/index.md#thm-otr12-convex-ae)により微分不能集合 $N\subset U$ は Lebesgue 零集合です。$\mu\ll\mathcal L^d$ から $\mu(N)=0$ であり、$\mu(U\setminus N)=1$ です。

**(3) 勾配の Borel 可測性。** $U$ 上で $\varphi$ は連続です。各座標方向 $e_j$ に沿う差商

$$
q_{j,n}(x)=n\{\varphi(x+e_j/n)-\varphi(x)\}
$$

は、$x,x+e_j/n\in U$ となる開集合上で連続です。負方向の差商も同様です。正負の差商の極限が存在して一致する集合は Borel です。凸関数では全座標の片側微分が一致すれば [OTR12 の証明](../OTR12/index.md#thm-otr12-convex-ae)により Fréchet 微分可能なので、その共通集合は $U\setminus N$ に一致します。各勾配成分は Borel 関数の極限です。$U\setminus N$ の外で $T(x)=0$ と定めれば、全空間上の Borel 可測な拡張になります。$\square$
<!-- proof-end -->

ここでは「$\varphi$ が全空間で有限」とは仮定していません。$\mu(D)=1$ が欠けると、出発測度が凸関数の無限大領域へ落ちるため、この補題は適用できません。

## 4. 最適結合はただ一つの写像になる

準備がそろいました。出発分布は密度を持ちますが、**到着分布は原子を持ってもかまいません**。二次モーメントが有限であることは費用の存在を、絶対連続性は「凸関数の角が出発質量を持たないこと」を保証します。

<a id="thm-otr13-brenier"></a>

<!-- formal-statement-start -->
> **定理（Brenierの最適写像定理）**
> $d\ge1$、$\mu,\nu\in\mathcal P_2(\mathbb R^d)$ とし、出発測度は $\mu\ll\mathcal L^d$ を満たすとする。二次費用 $c(x,y)=\lVert x-y\rVert^2/2$ の Kantorovich 問題には唯一の最適結合 $\pi_*$ が存在する。さらに下半連続真凸関数 $\varphi:\mathbb R^d\to(-\infty,+\infty]$ と Borel 可測写像 $T:\mathbb R^d\to\mathbb R^d$ が存在し、$\mu$-ほとんど至る所で $\varphi$ は微分可能で、

$$
T=\nabla\varphi,\qquad
T_{\#}\mu=\nu,\qquad
\pi_*=(\operatorname{id},T)_{\#}\mu.
$$

> 従って $T$ は Monge 問題の最小値を達成し、最適輸送写像は $\mu$-ほとんど至る所で一意である。$\varphi$ 自体の全空間上での一意性は主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

1. [OTR3 の存在定理](../OTR3/index.md#thm-otr3-polish)で最適結合 $\pi$ を得る。
2. [非コンパクト巡回単調性補題](#lem-otr13-noncompact-cyclic)と[凸ポテンシャル構成](../OTR12/index.md#thm-otr12-rockafellar)で、$\operatorname{supp}\pi\subset\operatorname{graph}(\partial\varphi)$ とする。
3. [可測勾配補題](#lem-otr13-borel-gradient)と $\mu\ll\mathcal L^d$ により、$\pi$ の質量は勾配のグラフに集中する。
4. 最適結合を二つ仮定して平均を取ると、平均も最適結合です。平均が一つの写像のグラフに集中する以上、元の二つも同じグラフに集中し、結合が一致します。

<!-- proof-start -->
### 証明

**(1) 最適結合の存在。** $\mu,\nu\in\mathcal P_2$ により独立結合は有限費用です。例えば $\lVert x-y\rVert^2\le2\lVert x\rVert^2+2\lVert y\rVert^2$ なので

$$
\int c\,d(\mu\otimes\nu)
\le\int\lVert x\rVert^2d\mu(x)+\int\lVert y\rVert^2d\nu(y)<\infty.
$$

$\mathbb R^d$ は Polish 空間、$c$ は非負連続なので、[Polish空間上の最適結合の存在](../OTR3/index.md#thm-otr3-polish)から有限費用の最適結合 $\pi$ が存在します。

**(2) 劣微分に入れる。** $\Gamma=\operatorname{supp}\pi$ とします。[最適結合の非コンパクト二次費用巡回単調性](#lem-otr13-noncompact-cyclic)により $\Gamma$ は内積について巡回単調です。$\Gamma$ は非空ですから、[Rockafellar 型凸ポテンシャル構成](../OTR12/index.md#thm-otr12-rockafellar)により、下半連続真凸関数 $\varphi$ が存在して

$$
\Gamma\subset\operatorname{graph}(\partial\varphi)
\subset\operatorname{dom}\varphi\times\mathbb R^d
$$

となります。$\pi(\Gamma)=1$ なので、第一周辺が $\mu$ であることから $\mu(\operatorname{dom}\varphi)=1$ です。

**(3) 結合から写像へ。** [可測勾配補題](#lem-otr13-borel-gradient)を $\mu,\varphi$ に使います。$\varphi$ が微分可能な Borel 集合 $E$ が $\mu(E)=1$ を満たし、その上で $\partial\varphi(x)=\{\nabla\varphi(x)\}$ です。勾配を $E$ 外で $0$ に補い、Borel 可測写像 $T$ を定義します。第一周辺が $\mu$ なので $\pi(E\times\mathbb R^d)=1$ であり、$\Gamma\cap(E\times\mathbb R^d)$ 上の $(x,y)$ について

$$
y\in\partial\varphi(x)=\{T(x)\}
$$

です。従って $\pi$ は $\{(x,T(x)):x\in\mathbb R^d\}$ に集中します。任意の有界 Borel 関数 $h:\mathbb R^{2d}\to\mathbb R$ に対し、結合の第一周辺積分を使うと

$$
\int h(x,y)\,d\pi(x,y)
=\int h(x,T(x))\,d\pi(x,y)
=\int h(x,T(x))\,d\mu(x).
$$

よって $\pi=(\operatorname{id},T)_{\#}\mu$ です。第二周辺を取れば $T_{\#}\mu=\nu$ です。[Monge写像のグラフ結合への埋め込み](../OTR2/index.md#prop-otr2-graph)から

$$
\frac12\int\lVert x-T(x)\rVert^2d\mu(x)
=\int c\,d\pi
=\min_{\gamma\in\Pi(\mu,\nu)}\int c\,d\gamma.
$$

任意の Monge 実行可能写像は [Monge写像のグラフ結合への埋め込み](../OTR2/index.md#prop-otr2-graph)により Kantorovich の許容結合を作りますから、$T$ は Monge 問題も最小化します。

**(4) 一意性。** $\pi_1,\pi_2$ が最適結合なら、$\bar\pi=(\pi_1+\pi_2)/2$ も周辺が $\mu,\nu$ であり、費用の線形性から最適です。(2)–(3) を $\bar\pi$ に適用すると、ある Borel 写像 $S$ のグラフ $G_S=\{(x,S(x))\}$ に $\bar\pi$ が全質量を置きます。従って

$$
1=\bar\pi(G_S)=\tfrac12\pi_1(G_S)+\tfrac12\pi_2(G_S),
\qquad0\le\pi_i(G_S)\le1
$$

なので $\pi_1(G_S)=\pi_2(G_S)=1$ です。第一周辺は両方とも $\mu$ ですから、(3) の積分公式により

$$
\pi_1=(\operatorname{id},S)_{\#}\mu=\pi_2.
$$

写像の一意性も示します。最適な二つの Borel 輸送写像 $T_1,T_2$ には最適グラフ結合が対応します。結合の一意性より $\pi_1=\pi_2$ であり、両グラフの共通部分に全質量があるので

$$
\mu\{x:T_1(x)\ne T_2(x)\}=0.
$$

これで存在、結合の一意性、写像の $\mu$-ほとんど至る所での一意性が証明されました。$\square$
<!-- proof-end -->

重要な区別は、**結合 $\pi_*$ は確率測度として一意、写像 $T$ は $\mu$-零集合を除いて一意、凸ポテンシャル $\varphi$ の全空間での値は一般に一意でない**、という三段階です。例えば $\mu$ が小さな領域に集中すると、その外の $\varphi$ の拡張に自由度が残ります。

## 5. 凸関数から費用最小性を数値で証明する

定理は最適写像の存在を保証しますが、具体例で与えられた $T$ が最適かを検算する別の方法も欲しいところです。[OTR12 の双対等号と劣微分](../OTR12/index.md#prop-otr12-dual-subgradient)によれば、凸関数 $\varphi$ とその凸共役 $\varphi^*(y)=\sup_x\{\langle x,y\rangle-\varphi(x)\}$ には Fenchel–Young の不等式が成立します。非コンパクト空間では、そのまま積分して $+\infty-\infty$ を作らないよう、双対関数の可積分性を明示します。

<a id="prop-otr13-dual-certificate"></a>

<!-- formal-statement-start -->
> **命題（可積分な凸双対証明書による最適性）**
> $d\ge1$、$\mu,\nu\in\mathcal P_2(\mathbb R^d)$ とし、下半連続真凸関数 $\varphi$ について、$\mu$-ほとんど至る所で $\varphi$ が微分可能で、Borel 写像 $T=\nabla\varphi$（零集合では可測に補う）が $T_{\#}\mu=\nu$ を満たすとする。次の関数がそれぞれ $\mu,\nu$ について可積分であると仮定する。

$$
f(x)=\frac12\lVert x\rVert^2-\varphi(x),\qquad
g(y)=\frac12\lVert y\rVert^2-\varphi^*(y).
$$

> このとき $(\operatorname{id},T)_{\#}\mu$ は二次費用 $c(x,y)=\lVert x-y\rVert^2/2$ の最適結合である。
<!-- formal-statement-end -->

### 証明の見取り図

Fenchel–Young の不等式で $f(x)+g(y)\le c(x,y)$ を作り、$y=T(x)$ で等号が成立することを使います。二つの関数が可積分なので、その等号を結合の費用へ安全に積分できます。

<!-- proof-start -->
### 証明

[Fenchel–Young の等号条件](../../../応用系/OPT/OPT4/index.md#thm-opt4-fenchel-equality-subgradient)より、任意の $x,y$ で $\varphi(x)+\varphi^*(y)\ge\langle x,y\rangle$ です。二次費用を展開して

$$
c(x,y)-f(x)-g(y)
=\varphi(x)+\varphi^*(y)-\langle x,y\rangle\ge0.
$$

可積分性から任意の結合 $\gamma$ について

$$
\int c\,d\gamma\ge\int f\,d\mu+\int g\,d\nu
$$

が成立します。$\mu$-ほとんどすべての $x$ で $T(x)=\nabla\varphi(x)\in\partial\varphi(x)$ なので Fenchel–Young は $y=T(x)$ で等号です。$\pi_T=(\operatorname{id},T)_{\#}\mu$ とすると

$$
\int c\,d\pi_T=\int f\,d\mu+\int g\,d\nu
$$

となり、全結合に共通な下界を達成します。$\square$
<!-- proof-end -->

### 直接例：二次元の伸長

$\mu$ を $[0,1]^2$ 上の一様確率測度、$A=\operatorname{diag}(2,1)$、$\varphi(x)=\frac12x^TAx=x_1^2+x_2^2/2$ とします。$A$ は対称正定値なので $\varphi$ は凸で、$T(x)=Ax=(2x_1,x_2)$ です。$\nu=T_{\#}\mu$ は $[0,2]\times[0,1]$ 上の一様確率測度です。共役関数は

$$
\varphi^*(y)=\frac12y^TA^{-1}y
=\frac14y_1^2+\frac12y_2^2.
$$

これは $x\mapsto x\cdot y-\frac12x^TAx$ の平方完成、または最大点 $x=A^{-1}y$ への代入で確かめられます。二つの分布の台が有界なので、命題で必要な $f,g$ は可積分です。さらに

$$
c(x,y)-f(x)-g(y)=\frac14(y_1-2x_1)^2+\frac12(y_2-x_2)^2\ge0
$$

で、$y=T(x)$ に限って等号です。従って最適性が費用の直接比較なしで証明されます。最小値も

$$
W_2^2(\mu,\nu)
=\int_{[0,1]^2}\lVert x-Ax\rVert^2\,dx
=\int_0^1x_1^2\,dx_1=\frac13
$$

と計算できました。一般の共分散行列へ進むのが OTR14 の目標です。

## 6. 絶対連続性を外すと何が壊れるのか

$\mu=\delta_0$、$\nu=(\delta_{-1}+\delta_1)/2$ を $\mathbb R$ 上で考えます。$\mu$ は Lebesgue 測度に絶対連続ではありません。許容結合は

$$
\pi=\tfrac12\delta_{(0,-1)}+\tfrac12\delta_{(0,1)}
$$

の一つだけです。なぜなら第一周辺が $\delta_0$ なので出発点は常に $0$、第二周辺で到着側の二点の質量をそれぞれ $1/2$ にしなければならないからです。これは自動的に最適結合で、$W_2^2(\mu,\nu)=1$ です。

ところがどんな写像 $T$ も $T_{\#}\delta_0=\delta_{T(0)}$ という一点測度しか作れず、$\nu$ へ到達できません。この二つの経路は $\varphi(x)=|x|$ の劣微分のグラフ（$\partial\varphi(0)=[-1,1]$）に含まれますが、**出発質量がちょうど角 $x=0$ に集中する**ため、勾配を一意に選べないのです。

絶対連続性は、写像が存在するための必要条件ではありません（例えば $\delta_0\to\delta_1$ なら定数写像があります）。しかし、*すべての*到着分布について本章のような存在・一意性を保証する、明確で強力な十分条件です。

## 7. 演習

### OTR13-A01 一様確率測度の伸長を検算する
- Level: A

$\mu$ を $[0,1]$ 上の一様確率測度、$T(x)=2x$ とする。$T_{\#}\mu$、凸ポテンシャル、$W_2^2$ を求め、最適性の理由を述べよ。

<!-- solution-start -->
### 詳細解答

$0\le t\le2$ で $\mu(T^{-1}(( -\infty,t]))=\mu([0,t/2])=t/2$ ですから、$\nu=T_{\#}\mu$ は密度 $1/2$ を $[0,2]$ に持ちます。$\varphi(x)=x^2$ とすれば $\varphi''(x)=2>0$、$\varphi'(x)=2x=T(x)$ です。$\mu$ は Lebesgue 絶対連続かつ両分布は有限二次モーメントを持つので [Brenier 定理](#thm-otr13-brenier)が適用できます。直接の最適性は[双対証明書の命題](#prop-otr13-dual-certificate)でも確認できます（両台が有界で、$\varphi^*(y)=y^2/4$ は有限）。費用は

$$
W_2^2=\int_0^1(x-2x)^2dx
=\left[x^3/3\right]_0^1=1/3.
$$

<!-- solution-end -->

### OTR13-A02 絶対値の勾配で原子を作る
- Level: A

$\mu$ を $[-1,1]$ 上の一様確率測度、$\varphi(x)=|x|$ とする。凸勾配輸送写像 $T$、到着分布 $\nu$、$W_2^2(\mu,\nu)$ を求めよ。

<!-- solution-start -->
### 詳細解答

$\varphi$ は凸で、$x<0$ では $\varphi'(x)=-1$、$x>0$ では $\varphi'(x)=1$ です。$x=0$ は $\mu$-零集合なので $T(0)$ を $0$ と補います。$\mu([-1,0))=\mu((0,1])=1/2$ より $\nu=(\delta_{-1}+\delta_1)/2$ です。[$\mu\ll\mathcal L^1$ の下での一意性](#thm-otr13-brenier)と[凸双対の証明書](#prop-otr13-dual-certificate)によりこの結合は最適です。後者では $\varphi^*(y)$ は $|y|\le1$ で $0$、それ以外で $+\infty$ ですが、$\nu$ の台では有限なので積分可能です。

$$
\begin{aligned}
W_2^2&=\frac12\int_{-1}^0(x+1)^2dx+\frac12\int_0^1(x-1)^2dx\\
&=\frac12\cdot\frac13+\frac12\cdot\frac13=\frac13.
\end{aligned}
$$

<!-- solution-end -->

### OTR13-A03 原子では分割せざるを得ない
- Level: A

$\mu=\delta_0$、$\nu=(\delta_{-1}+\delta_1)/2$ とする。許容結合をすべて求め、Monge 実行可能写像がないことと $W_2^2$ を示せ。

<!-- solution-start -->
### 詳細解答

第一周辺の制約で $x=0$ にしか質量を置けません。第二周辺の制約で $(0,-1)$ と $(0,1)$ の質量は各 $1/2$ に固定され、結合は $\pi=(\delta_{(0,-1)}+\delta_{(0,1)})/2$ のみです。一方、任意の写像 $T$ は $T_{\#}\mu=\delta_{T(0)}$ しか作れないので $\nu$ への Monge 写像はありません。費用は

$$
W_2^2=\int|x-y|^2d\pi=\frac12|0+1|^2+\frac12|0-1|^2=1.
$$

<!-- solution-end -->

### OTR13-A04 実効定義域の境界を捨てる
- Level: A

$\varphi(x)=x^2/2$（$x\ge0$）、$\varphi(x)=+\infty$（$x<0$）とし、$\mu$ を $[0,1]$ 上の一様確率測度とする。$\operatorname{dom}\varphi$ とその内部、勾配が定まる $\mu$-全測度集合を示せ。

<!-- solution-start -->
### 詳細解答

$D=[0,\infty)$、$\operatorname{int}D=(0,\infty)$ です。$x=0$ は境界ですが $\mathcal L^1(\{0\})=0$ なので、$\mu(\{0\})=0$ です。内部では $\varphi'(x)=x$ であり、$\mu((0,1])=1$ です。$D$ は閉凸集合で、$x=0$ での拡張値も下半連続です。[可測勾配補題](#lem-otr13-borel-gradient)の仮定 $\mu(D)=1$、$\mu\ll\mathcal L^1$ を満たし、境界を除いた全測度集合で微分できます。
<!-- solution-end -->

### OTR13-A05 到着分布に密度は要るか
- Level: A

$\mu$ を $[0,1]$ 上の一様確率測度、$\nu=\delta_2$ とする。凸勾配最適輸送写像を構成し $W_2^2$ を計算せよ。

<!-- solution-start -->
### 詳細解答

$T(x)=2$ と置くと $T_{\#}\mu=\delta_2$ です。$\varphi(x)=2x$ は線形なので凸かつ全点で微分可能で、$\varphi'(x)=2$ です。第二周辺が一点測度なので、任意の結合は $y=2$ に全質量を持つため、$\pi=(\operatorname{id},T)_{\#}\mu$ が唯一の許容結合です。直接計算して

$$
W_2^2=\int_0^1(x-2)^2dx
=\int_0^1(x^2-4x+4)dx=\frac13-2+4=\frac73.
$$

到着測度 $\nu$ は特異ですが定理の仮定に $\nu\ll\mathcal L^1$ はありません。
<!-- solution-end -->

### OTR13-B01 正定値線形写像の双対証明書
- Level: B

$\mu$ を $[0,1]^2$ 上の一様確率測度、$A=\operatorname{diag}(3,2)$、$\nu=A_{\#}\mu$ とする。$\varphi(x)=x^TAx/2$ とその共役、双対制約の余り、$W_2^2$ を導け。

<!-- solution-start -->
### 詳細解答

$A$ の固有値は $3,2>0$ なので $\varphi(x)=3x_1^2/2+x_2^2$ は凸で、$\nabla\varphi(x)=Ax$ です。$x\cdot y-\varphi(x)$ を各座標で平方完成すると

$$
\begin{aligned}
x\cdot y-\varphi(x)
&=-\frac32(x_1-y_1/3)^2+\frac{y_1^2}{6}\\
&\quad-(x_2-y_2/2)^2+\frac{y_2^2}{4}.
\end{aligned}
$$

ゆえに $\varphi^*(y)=y_1^2/6+y_2^2/4$ です。$f(x)=|x|^2/2-\varphi(x)$、$g(y)=|y|^2/2-\varphi^*(y)$ とすると

$$
c(x,y)-f(x)-g(y)
=\frac{(y_1-3x_1)^2}{6}+\frac{(y_2-2x_2)^2}{4}\ge0.
$$

$y=Ax$ で等号となり、台は有界なので両双対関数は可積分です。[命題](#prop-otr13-dual-certificate)で最適です。費用は

$$
W_2^2=\int_{[0,1]^2}\{(2x_1)^2+x_2^2\}\,dx
=4/3+1/3=5/3.
$$

<!-- solution-end -->

### OTR13-B02 平均結合の一意性論法を再構成する
- Level: B

$\mu,\nu\in\mathcal P_2(\mathbb R^d)$、$\mu\ll\mathcal L^d$ とし、最適結合 $\pi_1,\pi_2$ があるとする。$\bar\pi=(\pi_1+\pi_2)/2$ を使って $\pi_1=\pi_2$ を導け。単に「写像だから一意」とは書かないこと。

<!-- solution-start -->
### 詳細解答

$\pi_i$ は同じ二つの周辺分布を持つため、$\bar\pi$ も結合です。最適値を $m$ と書けば $\int c\,d\bar\pi=(m+m)/2=m$ なので $\bar\pi$ も最適です。[Brenier 定理の存在部分](#thm-otr13-brenier)により Borel 写像 $S$ が存在して $\bar\pi=(\operatorname{id},S)_{\#}\mu$ です。そのグラフ $G_S$ は Borel で $\bar\pi(G_S)=1$ なので

$$
\pi_1(G_S)+\pi_2(G_S)=2.
$$

各値は $1$ 以下だから両方 $1$ です。$\pi_i$ は $G_S$ 上で第一周辺 $\mu$ を持つので、任意の Borel 集合 $B\subset\mathbb R^{2d}$ について

$$
\pi_i(B)=\mu\{x:(x,S(x))\in B\}.
$$

右辺は $i$ によらず、$\pi_1=\pi_2$ です。写像 $T_i$ を使う場合も二つのグラフが共通の全測度集合を持つので $T_1=T_2$ が $\mu$-ほとんど至る所で従います。
<!-- solution-end -->

### OTR13-B03 折れ線ポテンシャルと質量の集約
- Level: B

$\mu$ を $[-1,1]$ 上の一様確率測度、$\varphi(x)=\max\{0,x\}$ とする。$T=\varphi'$ の $\mu$-ほとんど至る所での値と到着分布、$W_2^2$ を求めよ。$x=0$ の扱いも説明せよ。

<!-- solution-start -->
### 詳細解答

$\varphi$ は二つのアフィン関数の最大だから凸です。$x<0$ では $\varphi'=0$、$x>0$ では $\varphi'=1$ で、$x=0$ は微分不能ですが $\mu(\{0\})=0$ です。$T(0)=0$ と補って Borel 写像を得ます。従って $\nu=(\delta_0+\delta_1)/2$ です。可積分な双対証明書は $\varphi^*(y)=0$（$0\le y\le1$）、それ以外で $+\infty$ なので $\nu$ の台で有限となり、[命題](#prop-otr13-dual-certificate)により最適です。

$$
\begin{aligned}
W_2^2&=\frac12\int_{-1}^0(x-0)^2dx+\frac12\int_0^1(x-1)^2dx\\
&=\frac12\cdot\frac13+\frac12\cdot\frac13=\frac13.
\end{aligned}
$$

原子が発生したのは到着側であり、出発側の絶対連続性を損ないません。
<!-- solution-end -->

### OTR13-B04 線上の特異分布では勾配が割れる
- Level: B

$U$ を $[0,1]$ 上の一様変数、$S$ を $\{-1,1\}$ 上の独立な等確率変数とする。$\mu$ を $(0,U)\in\mathbb R^2$ の分布、$\nu$ を $(S,U)$ の分布とする。二次費用の最適値を求め、最適結合が Monge 写像によらないことを示せ。

<!-- solution-start -->
### 詳細解答

任意の結合では出発点は $(0,u)$、到着点は $(s,v)$（$s=\pm1$）なので

$$
\lVert(0,u)-(s,v)\rVert^2=s^2+(u-v)^2=1+(u-v)^2\ge1.
$$

従って最適値は $1$ 以上です。$U$ を同じまま保ち、独立な $S$ を割り振った結合は $v=u$ で費用 $1$ を達成するので $W_2^2=1$ です。最適なら $E[(U-V)^2]=0$、従って $U=V$ が確率 $1$ で必要です。到着分布では各 $v$ に対して $s=\pm1$ がそれぞれ条件付き確率 $1/2$ です。しかし Monge 写像 $T(0,u)=(s(u),v(u))$ が最適なら $v(u)=u$ で、固定した $u$ の符号は一つに定まるため、この条件付き分布を再現できません。

$\varphi(x_1,x_2)=|x_1|+x_2^2/2$ は凸で、$\partial\varphi(0,u)=[-1,1]\times\{u\}$ が両方の到着先を含みます。出発測度が直線 $x_1=0$ に集中し $\mu\not\ll\mathcal L^2$ なので、角の集合を捨てられないことが失敗の機構です。
<!-- solution-end -->

### OTR13-C01 非対角線形輸送の理論・計算をつなぐ
- Level: C

$\mu$ を $[0,1]^2$ 上の一様確率測度とし、$A=\begin{pmatrix}2&1\\1&2\end{pmatrix}$、$\nu=A_{\#}\mu$ とする。以下を証明せよ。

1. $\varphi(x)=x^TAx/2$ が凸で、$T(x)=Ax$ は凸勾配輸送写像である。
2. $\varphi^*$ を求め、$f(x)=\lVert x\rVert^2/2-\varphi(x)$ と $g(y)=\lVert y\rVert^2/2-\varphi^*(y)$ が最適性を証明することを示す。
3. $\nu$ の台と密度、$W_2^2(\mu,\nu)$ を計算し、最適写像の一意性を説明する。

<!-- solution-start -->
### 詳細解答

**(1) 凸性・押し出し。** $A$ は対称で $\det(A-\lambda I)=(2-\lambda)^2-1=(\lambda-1)(\lambda-3)$ なので固有値は $1,3>0$ です。よって $h^TAh>0$（$h\ne0$）、$\varphi$ は狭義凸です。成分で $\varphi(x)=x_1^2+x_1x_2+x_2^2$ と展開すると

$$
\nabla\varphi(x)=(2x_1+x_2,\,x_1+2x_2)=Ax.
$$

$T$ は連続で Borel 可測、$\nu$ は $T_{\#}\mu$ と定められているので、[凸勾配輸送写像の定義](#def-otr13-convex-gradient-map)の押し出し条件も満たします。

**(2) 双対証明書。** $A^{-1}=\frac13\begin{pmatrix}2&-1\\-1&2\end{pmatrix}$ です。$x\cdot y-\frac12x^TAx$ の $x$ に関する勾配は $y-Ax$ なので最大点は $x=A^{-1}y$、そこでの値は

$$
\begin{aligned}
\varphi^*(y)
&=(A^{-1}y)^Ty-\frac12(A^{-1}y)^TA(A^{-1}y)\\
&=\frac12y^TA^{-1}y=\frac13(y_1^2-y_1y_2+y_2^2).
\end{aligned}
$$

平方完成で直接確認すると

$$
\begin{aligned}
c(x,y)-f(x)-g(y)
&=\varphi(x)+\varphi^*(y)-x^Ty\\
&=\frac12(y-Ax)^TA^{-1}(y-Ax)\ge0.
\end{aligned}
$$

$A^{-1}$ も正定値で、等号は $y=Ax$ のときに限ります。$\mu$ の台とその像は有界で、$f,g$ は二次多項式なので可積分です。[可積分な双対証明書の命題](#prop-otr13-dual-certificate)を適用し、この輸送が最適と分かります。

**(3) 到着分布・費用。** $A$ は可逆で、$\det A=3$ です。$[0,1]^2$ の線形像は四頂点 $(0,0),(2,1),(1,2),(3,3)$ を持つ平行四辺形 $P$ です。変数変換 $y=Ax$ における Jacobian の絶対値が $3$ なので、$\nu$ は $P$ 上の密度 $1/3$、それ以外で $0$ です。

$x-Ax=(-x_1-x_2,-x_1-x_2)$ なので、積分中の独立な一様座標について $E[X_1^2]=E[X_2^2]=1/3$、$E[X_1X_2]=1/4$ を用いると

$$
\begin{aligned}
W_2^2(\mu,\nu)
&=\int_{[0,1]^2}2(x_1+x_2)^2dx_1dx_2\\
&=2\left(\frac13+2\cdot\frac14+\frac13\right)
=\frac73.
\end{aligned}
$$

$\mu$ は Lebesgue 絶対連続で、両分布の二次モーメントは有界台により有限です。[Brenier 定理](#thm-otr13-brenier)によってこの $T=Ax$ が $\mu$-ほとんど至る所で唯一の最適輸送写像であり、対応する最適結合も唯一です。
<!-- solution-end -->

## 8. まとめと次への接続

- 非コンパクトな Euclid 空間でも、連続二次費用の最適結合は局所的な質量交換により巡回単調な支持を持ちます。
- Rockafellar 型構成でその支持を凸劣微分へ含め、出発測度 $\mu\ll\mathcal L^d$ によって微分不能集合と実効定義域の境界を除くと、最適結合は凸勾配のグラフへ集中します。
- Brenier 定理は最適結合の一意性と、$\mu$-ほとんど至る所での最適写像の一意性を保証します。到着測度の密度は不要です。
- 原子や低次元集合に出発質量がある場合、凸関数の角に質量が集まり、最適結合が写像へならないことがあります。

次の **OTR14** では、この凸勾配構造を Gaussian 分布間の対称正定値線形写像へ適用し、平均ベクトルと共分散行列から $W_2$ を明示計算します。
