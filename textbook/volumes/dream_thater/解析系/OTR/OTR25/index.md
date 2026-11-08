# OTR25 離散OTを安定して近似するには

前講までに、[離散輸送の線形計画](../OTR4/index.md#def-otr4-finite-primal)では行・列の質量を保ちつつ費用を最小化すること、[有限双対](../OTR5/index.md#def-otr5-finite-dual)で下界を与えられることを学びました。しかし、大きい輸送行列を線形計画として厳密に解くのは計算上重く、解が疎な境界にあると滑らかな反復も扱いにくくなります。各セルの質量を少しだけ広げる項を加えると、正の行列を交互に拡大縮小する算法が現れます。

今回の中心問いは「**正則化によって何を近似しているのか、反復はなぜ収束し、極小の数値をどう扱うのか**」です。対象は有限個の点だけです。[OTR22のJKO反復](../OTR22/index.md#def-otr22-jko-step)は確率測度の時間発展を一歩ずつ最小化する仕組みであり、以下で使う「結合エントロピー」は輸送行列そのものを滑らかにする項です。二つを同じエントロピーと読み替えません。

## 1. 運ぶ量を広げる正則化

出発側の確率ベクトル $a=(a_1,\ldots,a_n)$、到着側の $b=(b_1,\ldots,b_m)$ はすべての成分が**厳密に正**、それぞれの和が1とします。費用行列 $C=(C_{ij})$ は有限実数成分を持ち、$\varepsilon>0$ は費用と同じ単位を持つ正則化パラメータです。[輸送多面体](../OTR4/index.md#def-otr4-transport-polytope)は

$$
U(a,b)=\left\{P\in[0,\infty)^{n\times m}:\ \sum_jP_{ij}=a_i,\ \sum_iP_{ij}=b_j\right\}
$$

です。$P_{ij}$ は出発点 $i$ から到着点 $j$ へ流れる**総質量の割合**で、$\sum_{ij}P_{ij}=1$ です。$0\log0=0$ と連続的に約束し、$H(P)=-\sum_{ij}P_{ij}\log P_{ij}$ を結合のShannonエントロピーと呼びます。無次元の $H$ は、質量を一つのセルへ集中させるより、複数のセルへ広げると大きくなります。

<a id="def-otr25-entropic-primal"></a>

<!-- formal-statement-start -->
> **定義（有限OTの結合エントロピー正則化）**  
> $n,m\ge1$、$a_i,b_j>0$、$\sum_i a_i=\sum_jb_j=1$、$C\in\mathbb R^{n\times m}$、$\varepsilon>0$ とする。$P\in U(a,b)$ に対して

$$
F_\varepsilon(P)=\sum_{i,j}C_{ij}P_{ij}
+\varepsilon\sum_{i,j}P_{ij}(\log P_{ij}-1)
=\langle C,P\rangle-\varepsilon H(P)-\varepsilon
$$

> と置く。$F_\varepsilon$ を $U(a,b)$ で最小化する問題を結合エントロピー正則化OTと呼ぶ。$\varepsilon=0$ の問題は通常の離散OTであり、ここでは別に扱う。
<!-- formal-statement-end -->

最後の $-\varepsilon$ は $\sum P_{ij}=1$ のため最小化解を変えませんが、微分を $\partial [p(\log p-1)]/\partial p=\log p$ と簡単にします。最小値の数値を比較するときはこの定数も含めてください。

<!-- definition-example-start: def-otr25-entropic-primal -->
**定義の確認**：正則化目的の直接例。$a=b=(1/2,1/2)$、$C_{11}=C_{22}=0$、$C_{12}=C_{21}=1$ では

$$
P(x)=\begin{pmatrix}x&1/2-x\\1/2-x&x\end{pmatrix},\qquad 0\le x\le1/2.
$$

非負性と両方向の周辺条件が成り立つので、全ての $P(x)$ が $U(a,b)$ に入ります。輸送費用は $1-2x$ です。正則化では内点での導関数が

$$
\frac{dF_\varepsilon(P(x))}{dx}
=-2+2\varepsilon\log\frac{x}{1/2-x}
$$

となり、唯一の停留点は

$$
x_\varepsilon=\frac{1}{2(1+e^{-1/\varepsilon})},\qquad
\frac12-x_\varepsilon=\frac{1}{2(1+e^{1/\varepsilon})}.
$$

$\varepsilon=1$ では対角が約 $0.365529$、非対角が約 $0.134471$。通常のOTなら対角に $1/2$、非対角に0を置きますが、正則化解は各セルに正の量を置きます。この違いを一般の場合にも証明します。
<!-- definition-example-end -->

## 2. 最小解が内側にただ一つある理由

存在だけなら、[輸送多面体のコンパクト性](../OTR4/index.md#prop-otr4-compact)で足ります。強い結論は、**ゼロのセルを少しだけ埋めるとエントロピー項が有利になる**ことです。

<a id="thm-otr25-positive-unique"></a>

<!-- formal-statement-start -->
> **定理（正則化結合の存在・正値性・一意性）**  
> $a\in(0,1]^n$、$b\in(0,1]^m$ は各々総和1、$C\in\mathbb R^{n\times m}$、$\varepsilon>0$ とする。[正則化OT](#def-otr25-entropic-primal)は唯一の最小化解 $P^\varepsilon\in U(a,b)$ を持ち、すべての $i,j$ に対して $P^\varepsilon_{ij}>0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

独立結合 $Q_{ij}=a_ib_j$ は全セルが正で、両周辺を満たします。もし最小解に0があれば $P$ と $Q$ を少量混ぜます。ゼロのセルでは $t\log t$ が負の方向へ強く効くため、境界上で最小になれません。内点ではエントロピーの厳密凸性が一意性を与えます。

<!-- proof-start -->
### 証明

$Q_{ij}=a_ib_j$ は正で、$\sum_jQ_{ij}=a_i\sum_jb_j=a_i$、$\sum_iQ_{ij}=b_j$ なので $U(a,b)$ は非空です。各 $P_{ij}$ は $0\le P_{ij}\le1$ を満たし、$U(a,b)$ は線形等式・閉不等式の交わりですから、閉かつ有界です。$p(\log p-1)$ を $p=0$ で0に連続拡張した $F_\varepsilon$ は連続で、最小値を取ります。

最小解 $P$ に $P_{i_0j_0}=0$ があると仮定し、$P(t)=(1-t)P+tQ$（$0<t<1$）を作ります。線形制約と非負性により $P(t)\in U(a,b)$ です。$P_{ij}=0$ のセルでは

$$
P_{ij}(t)(\log P_{ij}(t)-1)=tQ_{ij}\log t
+tQ_{ij}(\log Q_{ij}-1).
$$

一方、$P_{ij}>0$ のセルでは上の関数は微分可能なので $t=0$ からの変化は $O(t)$、費用項の変化も $O(t)$ です。$Z=\{(i,j):P_{ij}=0\}$ とすると

$$
F_\varepsilon(P(t))-F_\varepsilon(P)
=\varepsilon t\log t\sum_{(i,j)\in Z}Q_{ij}+O(t).
$$

$Z$ は非空で、$Q_{ij}>0$ だから $\sum_ZQ_{ij}>0$ です。$t\downarrow0$ で $\log t\to-\infty$ なので右辺は十分小さい正の $t$ で負になり、最小性に反します。従って全セル正です。

$h(p)=p(\log p-1)$ は $p>0$ で $h''(p)=1/p>0$、$p=0$ を含む区間でも厳密凸です。$F_\varepsilon$ は正の係数 $\varepsilon$ を掛けた厳密凸関数と線形関数の和なので、異なる $P,R\in U(a,b)$ に対する中点の値は両端平均より厳密に小さくなります。最小解が二つあることはできません。$\square$
<!-- proof-end -->

注意：$a_i=0$ ならその行は全部0になるので、正値性は偽です。ゼロ周辺を除いて縮小した行列でこの定理を使えます。$\varepsilon=0$ では、前節の対角輸送のように境界解が現れます。

## 3. 双対から行列スケーリングへ

通常の[有限LP双対](../OTR5/index.md#def-otr5-finite-dual)では $f_i+g_j\le C_{ij}$ という**硬い制約**を置きました。正則化するとその制約の代わりに、違反量を指数関数で罰する滑らかな双対が現れます。

$f\in\mathbb R^n$、$g\in\mathbb R^m$ を各行・列に付ける実数の双対ポテンシャルと呼びます。この章では $f_i,g_j$ に大小制約を課さず、費用との差から正の行列を作ります。

<a id="def-otr25-dual-scaling"></a>

<!-- formal-statement-start -->
> **定義（正則化双対とスケーリング因子）**  
> $a_i,b_j>0$、$\sum_i a_i=\sum_jb_j=1$、$C_{ij}\in\mathbb R$、$\varepsilon>0$ とする。実数ベクトル $f,g$ の双対目的関数と、正の核行列 $K$・正のスケーリング因子 $u,v$ を

$$
\begin{aligned}
D_\varepsilon(f,g)&=\sum_i a_if_i+\sum_jb_jg_j
-\varepsilon\sum_{ij}\exp\frac{f_i+g_j-C_{ij}}\varepsilon,\\
K_{ij}&=e^{-C_{ij}/\varepsilon},\quad
u_i=e^{f_i/\varepsilon},\quad v_j=e^{g_j/\varepsilon}
\end{aligned}
$$

> と定める。$P_{ij}=u_iK_{ij}v_j$ を指数形の結合と呼ぶ。
<!-- formal-statement-end -->

指数形は単に行列を定義した段階では $U(a,b)$ に入るとは限りません。行・列の質量が一致したとき初めて輸送結合になります。また $f_i\mapsto f_i+c$、$g_j\mapsto g_j-c$ は、総質量が両方1なので $D_\varepsilon$ と $P$ を変えません。ポテンシャルの値自体は一意ではなくても、結合が一意であることと両立します。

<!-- definition-example-start: def-otr25-dual-scaling -->
**定義の確認**：双対スケーリングの直接例。$C_{ij}=0$ で正の周辺 $a,b$ を取ります。$f_i=\varepsilon\log a_i$、$g_j=\varepsilon\log b_j$ を指数形へ代入すると

$$
u_i=a_i,\qquad v_j=b_j,\qquad K_{ij}=1,\qquad P_{ij}=a_ib_j.
$$

全セル正で、$\sum_jP_{ij}=a_i$、$\sum_iP_{ij}=b_j$ です。さらに双対値は

$$
D_\varepsilon(f,g)=\varepsilon\sum_i a_i\log a_i
+\varepsilon\sum_jb_j\log b_j-\varepsilon
=F_\varepsilon(P).
$$

最後の等号は $\log(a_ib_j)=\log a_i+\log b_j$ と総質量1から直接計算できます。定義した指数行列が両周辺を満たし、主・双対の値が実際に一致する例です。
<!-- definition-example-end -->

<a id="thm-otr25-duality"></a>

<!-- formal-statement-start -->
> **定理（正則化双対と指数形の最適性条件）**  
> $n,m\ge1$、$a_i,b_j>0$、$\sum a_i=\sum b_j=1$、$C\in\mathbb R^{n\times m}$、$\varepsilon>0$ とする。最小化問題 $\min_{P\in U(a,b)}F_\varepsilon(P)$ と最大化問題 $\max_{f,g}D_\varepsilon(f,g)$ は等しい有限の最適値を持ち、双対最大化解が存在する。両者が最適であることと

$$
P_{ij}=\exp\frac{f_i+g_j-C_{ij}}{\varepsilon},
\qquad \sum_jP_{ij}=a_i,\quad\sum_iP_{ij}=b_j
$$

> が成立することは同値である。この $P$ は[一意な正則化解](#thm-otr25-positive-unique)である。
<!-- formal-statement-end -->

### 証明の見取り図

一セルずつ $p(\log p-1)$ と指数関数の不等式を作り、全セルで足すと弱双対が出ます。最小解は全セル正なので、周辺制約を保つ任意の微小変化に対して微分が0です。この条件から $C_{ij}+\varepsilon\log P_{ij}$ が「行ごとの値＋列ごとの値」になると確かめます。

<!-- proof-start -->
### 証明

$p\ge0$ と $z\in\mathbb R$ に対して

$$
\varepsilon p(\log p-1)+\varepsilon e^{z/\varepsilon}\ge pz
$$

を示します。$p>0$ なら左辺から右辺を引いた関数の $p$ 微分は $\varepsilon\log p-z$、二階微分は $\varepsilon/p>0$ です。唯一の最小点 $p=e^{z/\varepsilon}$ で差は0となり、$p=0$ でも不等式は成り立ちます。$z=f_i+g_j-C_{ij}$ を各セルへ代入して足し、$P\in U(a,b)$ の行・列の和を使うと

$$
F_\varepsilon(P)-D_\varepsilon(f,g)
=\sum_{ij}\left[\varepsilon P_{ij}(\log P_{ij}-1)
+\varepsilon e^{z_{ij}/\varepsilon}-P_{ij}z_{ij}\right]\ge0.
$$

ここでは $\sum_{ij}f_iP_{ij}=\sum_i f_ia_i$ などを使いました。等号はすべてのセルで $P_{ij}=e^{z_{ij}/\varepsilon}$ のとき、かつそのときに限られます。

[正値の最小解](#thm-otr25-positive-unique) $P^\varepsilon$ について $M_{ij}=C_{ij}+\varepsilon\log P^\varepsilon_{ij}$ と置きます。異なる二行・二列があるなら、四セルに $+t,-t,-t,+t$ を加える変更は行和・列和を保ちます。全セル正なので十分小さな正負の $t$ が許され、停留条件は

$$
M_{ij}-M_{i1}-M_{1j}+M_{11}=0.
$$

よって $f_i=M_{i1}$、$g_j=M_{1j}-M_{11}$ とすれば $M_{ij}=f_i+g_j$ です。$n=1$ または $m=1$ でも同じ式はそのまま成り立ちます。すなわち $P^\varepsilon_{ij}=e^{(f_i+g_j-C_{ij})/\varepsilon}$ となり、不等式が等号を取ります。従って $f,g$ は双対最適解で、強双対性も成立します。逆に等号成立する実行可能な $P$ と $f,g$ は弱双対とこの等しい最適値から共に最適です。$\square$
<!-- proof-end -->

輸送費用がどのセルでも0である場合でさえ、正則化が独立結合を唯一の解として選ぶことが分かりました。

## 4. 交互に周辺を合わせれば本当に収束するか

指数形 $P_{ij}=u_iK_{ij}v_j$ の行和は $u_i\sum_jK_{ij}v_j$ です。そこで $v$ を固定して

$$
u_i\leftarrow\frac{a_i}{\sum_jK_{ij}v_j},\qquad
v_j\leftarrow\frac{b_j}{\sum_iK_{ij}u_i}
$$

を交互に繰り返すと、前半で全行和を、後半で全列和を正確に合わせられます。この反復が **Sinkhorn法** です。片側を合わせた直後にもう片側がずれる場合があるため、停止するには両側の残差を測ります。

<a id="def-otr25-residual-lse"></a>

<!-- formal-statement-start -->
> **定義（周辺残差とlog-sum-exp）**  
> 各成分が0以上の $n\times m$ 行列 $P$、確率ベクトル $a,b$ に対して、行和 $r_i(P)=\sum_jP_{ij}$、列和 $c_j(P)=\sum_iP_{ij}$ とし、周辺残差を

$$
R_\infty(P)=\max\left\{
\max_i|r_i(P)-a_i|,\ \max_j|c_j(P)-b_j|
\right\}
$$

> と定める。また有限の実数 $z_1,\ldots,z_N$ に対するlog-sum-expを

$$
\operatorname{LSE}(z_1,\ldots,z_N)
=z_*+\log\sum_{k=1}^Ne^{z_k-z_*},\quad z_*=\max_k z_k
$$

> と定める。この値は厳密な実数計算では $\log\sum_k e^{z_k}$ と等しい。
<!-- formal-statement-end -->

<!-- definition-example-start: def-otr25-residual-lse -->
**定義の確認**：残差の直接計算。$K=\left(\begin{smallmatrix}2&1\\1&2\end{smallmatrix}\right)$、$a=(3/4,1/4)$、$b=(1/2,1/2)$、初期 $v=(1,1)$ とします。行スケーリングは $u=(1/4,1/12)$ なので

$$
Q'=\begin{pmatrix}1/2&1/4\\1/12&1/6\end{pmatrix}.
$$

行和は $(3/4,1/4)$、列和は $(7/12,5/12)$。列をそれぞれ $6/7,6/5$ 倍すると

$$
Q''=\begin{pmatrix}3/7&3/10\\1/14&1/5\end{pmatrix}.
$$

列和は確かに $(1/2,1/2)$ に揃いますが、行和は $(51/70,19/70)$ となり、$R_\infty(Q'')=3/140$ です。**列が正確でも輸送多面体にはまだ入っていない**点を確認してください。

log-sum-expについても正の入力 $z_1=\log2$、$z_2=\log3$ を使うと、最大値は $\log3$ なので

$$
\operatorname{LSE}(\log2,\log3)
=\log3+\log(2/3+1)=\log5.
$$

定義式と、指数の和に対数を取った値が直接一致します。
<!-- definition-example-end -->

<a id="thm-otr25-sinkhorn-convergence"></a>

<!-- formal-statement-start -->
> **定理（Sinkhorn交互スケーリングの収束）**  
> $a_i,b_j>0$、各々の総和は1、$K\in(0,\infty)^{n\times m}$ とする。任意の正の列スケーリング $v^{(0)}$ から上記の行更新と列更新を繰り返し、列更新直後に次の行列を作る。

$$
P^{(t)}=\operatorname{diag}(u^{(t)})K\operatorname{diag}(v^{(t)}).
$$

> この列の周辺残差は0へ収束し、$a,b$ を周辺に持つ唯一の正のスケーリング行列へ成分ごとに収束する。特に $K_{ij}=e^{-C_{ij}/\varepsilon}$ なら、その極限は[正則化OTの唯一の最適結合](#thm-otr25-duality)である。
<!-- formal-statement-end -->

### 証明の見取り図

行和を合わせる操作は、正の行列に対する「一般化KL距離」を最も減らす行方向の射影になっています。列方向にも同じ恒等式が成立し、ずれを測るKLの和は有限でなければなりません。極限で両周辺が一致し、なおかつ正のスケーリング形を保つことから一意な結合に到達します。

<!-- proof-start -->
### 証明

まず[双対定理](#thm-otr25-duality)の $C_{ij}=-\log K_{ij}$、$\varepsilon=1$ を適用し、両周辺 $a,b$ を持つ正のスケーリング行列 $P^*$ が存在し一意と分かります。正の行列 $X,Y$ に対して一般化KL距離

$$
\mathcal D(X\Vert Y)=\sum_{ij}\left[X_{ij}\log\frac{X_{ij}}{Y_{ij}}-X_{ij}+Y_{ij}\right]\ge0
$$

を考えます。各セルの非負性は $s\log s-s+1\ge0$ を $s=X_{ij}/Y_{ij}$ に適用したものです。

任意の正の行列 $Q$ の行和を $r_i=\sum_jQ_{ij}$ とし、$Q'_{ij}=a_iQ_{ij}/r_i$ と置きます。$Q'$ の行和は $a_i$ です。両方の距離の差を展開し、$\sum_jP^*_{ij}=a_i$ を代入すると

$$
\begin{aligned}
\mathcal D(P^*\Vert Q)-\mathcal D(P^*\Vert Q')
&=\sum_i\left[a_i\log\frac{a_i}{r_i}-a_i+r_i\right]
=:\mathcal D(a\Vert r)\ge0.
\end{aligned}
$$

列を $b_j/c_j$ 倍する場合も同様に差は $\mathcal D(b\Vert c)$ です。初期行列 $Q^0=\operatorname{diag}(1)K\operatorname{diag}(v^{(0)})$ から交互に射影すれば、$\mathcal D(P^*\Vert Q)$ は非負のまま減少し、**各操作で減った量の総和は有限**です。従って連続する行・列の射影で現れる $\mathcal D(a\Vert r)$、$\mathcal D(b\Vert c)$ はともに0へ向かいます。射影直後の反対側の周辺も0へ近づくことを確認します。列更新前の列和 $c_j\to b_j>0$ なので $b_j/c_j\to1$ であり、直前に正確だった行和の変更量は

$$
\left|\sum_jQ'_{ij}\frac{b_j}{c_j}-a_i\right|
\le a_i\max_j\left|\frac{b_j}{c_j}-1\right|\longrightarrow0.
$$

よって列更新直後の行列も $R_\infty\to0$ です。

次に極限が境界へ逃げないことを示します。$k_-=\min_{ij}K_{ij}>0$、$k_+=\max_{ij}K_{ij}$ とし、列更新前の正の $v$ の和を $V$ とします。行更新後の $u_i=a_i/(Kv)_i$ に対して

$$
\frac{a_i}{k_+V}\le u_i\le\frac{a_i}{k_-V},
\qquad\frac{u_i}{\sum_lu_l}\ge a_i\frac{k_-}{k_+}.
$$

列更新直後のセルは

$$
P_{ij}=b_j\frac{u_iK_{ij}}{\sum_lu_lK_{lj}}
\ge a_ib_j\left(\frac{k_-}{k_+}\right)^2>0.
$$

また列和が $b_j$ なので $P_{ij}\le b_j\le1$ です。従って列更新直後の行列列は全成分が共通の正の閉区間に入り、収束部分列を持ちます。その極限 $\bar P$ は正で、残差の極限が0なので $U(a,b)$ に入ります。各反復の積の表示から

$$
\frac{P_{ij}P_{kl}}{P_{il}P_{kj}}
=\frac{K_{ij}K_{kl}}{K_{il}K_{kj}}
$$

が成り立ち、正の極限でも保たれます。$M_{ij}=\log(\bar P_{ij}/K_{ij})$ と置けば $M_{ij}-M_{i1}-M_{1j}+M_{11}=0$ ですから $M_{ij}=\alpha_i+\beta_j$ と書け、$\bar P_{ij}=e^{\alpha_i}K_{ij}e^{\beta_j}$ です。この正の実行可能スケーリング形は[双対定理](#thm-otr25-duality)から唯一の $P^*$ に等しくなります。どの収束部分列も同じ極限なので全列が $P^*$ へ収束します。$\square$
<!-- proof-end -->

この証明は **$K$ の全成分が正**であることを使っています。禁止経路を $C_{ij}=+\infty$ として $K_{ij}=0$ にした場合、存在するスケーリングも収束も別条件を調べ直さなくてはなりません。また有限精度計算で $e^{-C_{ij}/\varepsilon}$ が0へ丸められた場合は、数学上の「正値」とコンピュータ上の0を混同しないでください。

## 5. 小さい $\varepsilon$ に耐えるlog-domain計算

例えば $C_{12}=1000$、$\varepsilon=10^{-2}$ だと $e^{-C_{12}/\varepsilon}=e^{-100000}$ は倍精度では0へアンダーフローします。核 $K$ を直接作って割り算すると、ゼロ除算やNaNが生じかねません。指数形の双対変数を**対数のまま**更新するのが対策です。

$u_i=e^{f_i/\varepsilon}$、$v_j=e^{g_j/\varepsilon}$ をSinkhornの行更新へ代入し、対数を取れば

$$
\begin{aligned}
f_i&\leftarrow\varepsilon\left[\log a_i-
\operatorname{LSE}_{j}\left(\frac{g_j-C_{ij}}{\varepsilon}\right)\right],\\
g_j&\leftarrow\varepsilon\left[\log b_j-
\operatorname{LSE}_{i}\left(\frac{f_i-C_{ij}}{\varepsilon}\right)\right].
\end{aligned}
$$

LSEの最大値 $z_*$ を先に引けば各 $e^{z_k-z_*}\le1$ で、巨大な正の指数も避けられます。各回の $f_1$ を0にするゲージ変換 $f\leftarrow f-f_1$、$g\leftarrow g+f_1$ は結合を変えません。

実行できるNode.js実装：[sinkhorn.js](./sinkhorn.js) と [数値テスト](./sinkhorn.test.js)。リポジトリのルートから次を実行できます。

```bash
node textbook/volumes/dream_thater/解析系/OTR/OTR25/sinkhorn.js
node --test textbook/volumes/dream_thater/解析系/OTR/OTR25/sinkhorn.test.js
```

最初の対称 $2\times2$ 例では行列の各成分は約 $0.365529,0.134471$、周辺残差は $10^{-10}$ 以下になるはずです。別例として $a=(0.2,0.5,0.3)$、$b=(0.6,0.4)$、$C=\left(\begin{smallmatrix}0&2\\1&0\\3&1\end{smallmatrix}\right)$、$\varepsilon=0.3$ の非対称行列でも両周辺をテストします。実装は $a_i,b_j>0$、有限費用を入力条件として検査し、$R_\infty\le10^{-10}$ または最大反復回数で止まります。上限到達時は `converged: false` となり、精度を満たしたことにはなりません。

**数値証明書の注意**。$P$ が周辺条件を満たすとき、[双対の不等式](#thm-otr25-duality)から $F_\varepsilon(P)-D_\varepsilon(f,g)\ge0$ が下界と上界の差になります。しかし反復途中で $r\ne a$ または $c\ne b$ なら、出力した $P$ は**主問題の実行可能解ではありません**。この差が小さくても最適性証明にならないので、残差と反復回数を必ず併記します。浮動小数点で指数表示した極小セルが0へ丸められても、行列の質量保存を実測して判断します。

## 6. 正則化を取り除けば元のOTに戻るか

$\varepsilon\to0$ は連続時間のJKO極限 $\tau\to0$ とは別の極限です。ここでは行列サイズ $n,m$ と $a,b,C$ を**固定**します。$p_{ij}\in[0,1]$ の総和が1なら $0\le H(P)\le\log(nm)$ です。後者は、[KL非負性のセルごとの証明](#thm-otr25-sinkhorn-convergence)を一様分布 $Q_{ij}=1/(nm)$ に適用し、$\sum_{ij}P_{ij}\log(P_{ij}/Q_{ij})=\log(nm)-H(P)\ge0$ と計算して得られます（$P_{ij}=0$ の項は0）。

<a id="prop-otr25-zero-limit"></a>

<!-- formal-statement-start -->
> **命題（正則化ゼロ極限と最大エントロピー選択）**  
> $a_i,b_j>0$、$\sum_i a_i=\sum_jb_j=1$、有限の $C\in\mathbb R^{n\times m}$ を固定する。通常の輸送費用最小値を $L_0=\min_{P\in U(a,b)}\langle C,P\rangle$ とし、$P^\varepsilon$ を[正則化解](#thm-otr25-positive-unique)とする。このとき

$$
0\le\langle C,P^\varepsilon\rangle-L_0\le\varepsilon\log(nm).
$$

> $\varepsilon\downarrow0$ で $P^\varepsilon$ は、通常の費用最小解の集合の中で $H(P)$ が最大の**唯一の結合**に成分ごとに収束する。通常の費用最小解が唯一なら、それに収束する。
<!-- formal-statement-end -->

### 証明の見取り図

正則化解と任意の通常最適解を競争相手として比較すると、費用差は高々 $\varepsilon$ 倍のエントロピー差です。コンパクトな輸送多面体で部分列極限を取ると、まず費用最適性、次に最大エントロピー性が分かります。

<!-- proof-start -->
### 証明

通常の最適解 $P^0\in U(a,b)$ は[多面体のコンパクト性](../OTR4/index.md#prop-otr4-compact)から存在します。$F_\varepsilon(P^\varepsilon)\le F_\varepsilon(P^0)$ から、共通の定数 $-\varepsilon$ を消して整理すると

$$
0\le\langle C,P^\varepsilon\rangle-L_0
\le\varepsilon\bigl(H(P^\varepsilon)-H(P^0)\bigr)
\le\varepsilon\log(nm).
$$

最初の不等号は $L_0$ の定義です。任意の $\varepsilon_k\downarrow0$ に対し、$U(a,b)$ がコンパクトなので $P^{\varepsilon_k}$ は収束部分列を持ちます。費用は連続なので上の評価からその極限 $\bar P$ は通常費用 $L_0$ を達成します。

さらに同じ不等式で $\langle C,P^\varepsilon\rangle-L_0\ge0$ を使うと、**任意の**通常最適解 $Q$ について $H(P^\varepsilon)\ge H(Q)$ です。$H$ は $0\log0=0$ の規約で連続なので、極限でも $H(\bar P)\ge H(Q)$ となります。通常最適解の集合は線形関数の最小値面で凸です。一方 $-p\log p$ は $[0,1]$ で厳密凹ですから、$H$ の最大化解はその凸集合上で唯一です。任意の部分列極限はこの同じ最大エントロピー解へ一致するため、列全体が収束します。$\square$
<!-- proof-end -->

ここでの $\varepsilon\log(nm)$ は**輸送費用の誤差上界**であり、$P^\varepsilon$ と通常最適解の行列ノルム誤差を直接保証しません。また、一般の行列計算で有限回反復している場合には、これに加えて周辺残差・停止誤差があります。$\varepsilon$ を下げるほど対数計算の必要性と反復回数の両方に注意が必要です。

## 7. 演習：正則化・双対・数値残差を自力で検算する

### OTR25-A01 対称2×2の正則化解
- Level: A

$a=b=(1/2,1/2)$、$C=\left(\begin{smallmatrix}0&2\\2&0\end{smallmatrix}\right)$、$\varepsilon=2$ とする。許容結合 $P(x)$ を書き、正則化解の対角・非対角成分を求めよ。

<!-- solution-start -->
**詳細解答**。行・列条件から $P(x)=\left(\begin{smallmatrix}x&1/2-x\\1/2-x&x\end{smallmatrix}\right)$、$0\le x\le1/2$ です。費用は $4(1/2-x)=2-4x$ で、エントロピー項の微分は $2\varepsilon\log(x/(1/2-x))$ です。停留条件 $-4+4\log(x/(1/2-x))=0$ から $x/(1/2-x)=e$、ゆえに $x=e/[2(1+e)]$、非対角は $1/[2(1+e)]$ です。二階微分 $2\varepsilon(1/x+1/(1/2-x))>0$ により唯一の最小解と分かります。
<!-- solution-end -->

### OTR25-A02 正の競争相手を構成する
- Level: A

$a=(1/3,2/3)$、$b=(1/4,3/4)$ とする。独立結合を求め、正値性・両周辺条件を全て確認せよ。

<!-- solution-start -->
**詳細解答**。$Q_{ij}=a_ib_j$ から $Q=\left(\begin{smallmatrix}1/12&1/4\\1/6&1/2\end{smallmatrix}\right)$ です。4成分すべて正です。行和は $1/12+1/4=1/3$ と $1/6+1/2=2/3$、列和は $1/12+1/6=1/4$ と $1/4+1/2=3/4$ です。従って $Q\in U(a,b)$ であり、[正値性定理](#thm-otr25-positive-unique)で境界から内点へ混ぜる競争相手になります。
<!-- solution-end -->

### OTR25-A03 双対ポテンシャルのゲージ
- Level: A

$f_i'=f_i+c$、$g_j'=g_j-c$、$c\in\mathbb R$ とする。指数形の結合と双対目的関数が変わらないことを、総質量の条件を使い示せ。

<!-- solution-start -->
**詳細解答**。指数の分子は $f_i'+g_j'-C_{ij}=f_i+c+g_j-c-C_{ij}=f_i+g_j-C_{ij}$ なので $P$ は変わりません。双対の一次項の変化は $c\sum_i a_i-c\sum_jb_j=c-c=0$ です。指数項は各セルで不変なので $D_\varepsilon(f',g')=D_\varepsilon(f,g)$ です。
<!-- solution-end -->

### OTR25-A04 片側だけを合わせた残差
- Level: A

$K=\left(\begin{smallmatrix}2&1\\1&2\end{smallmatrix}\right)$、$a=(3/4,1/4)$、$b=(1/2,1/2)$、初期 $v=(1,1)$ で、行と列を一回ずつスケーリングせよ。列更新直後の $R_\infty$ を求めよ。

<!-- solution-start -->
**詳細解答**。$(Kv)=(3,3)$ なので $u=(1/4,1/12)$、行更新直後は $Q'=\left(\begin{smallmatrix}1/2&1/4\\1/12&1/6\end{smallmatrix}\right)$ です。列和は $(7/12,5/12)$ で、目標が各 $1/2$ なので列倍率は $(6/7,6/5)$。従って $Q''=\left(\begin{smallmatrix}3/7&3/10\\1/14&1/5\end{smallmatrix}\right)$ です。列和は $(1/2,1/2)$、行和は $(51/70,19/70)$。行の目標との差は $|51/70-3/4|=3/140$、$|19/70-1/4|=3/140$ だから $R_\infty(Q'')=3/140$ です。
<!-- solution-end -->

### OTR25-A05 極端な値のlog-sum-exp
- Level: A

$z_1=-1000$、$z_2=-1001$ について、直接 $e^{z_1}+e^{z_2}$ を計算せず $\log(e^{z_1}+e^{z_2})$ を求めよ。なぜこの表現が安定か説明せよ。

<!-- solution-start -->
**詳細解答**。最大値 $z_*=-1000$ を引いて $\operatorname{LSE}(z_1,z_2)=-1000+\log(1+e^{-1})$、約 $-999.686738$ です。直接指数を計算する場合、両項が浮動小数点の最小正数を下回り、和が0へ丸められて対数が $-\infty$ となり得ます。最大値を引けば指数の引数は0と$-1$なので数値として表現でき、対数の前に $-1000$ を戻せます。
<!-- solution-end -->

### OTR25-B01 一セルのFenchel不等式を復元する
- Level: B

$\varepsilon>0$、$p\ge0$、$z\in\mathbb R$ に対して $\varepsilon p(\log p-1)+\varepsilon e^{z/\varepsilon}\ge pz$ を証明し、等号条件を求めよ。これを輸送問題の双対下界へ接続せよ。

<!-- solution-start -->
**詳細解答**。$p>0$ とし $G(p)=\varepsilon p(\log p-1)-pz+\varepsilon e^{z/\varepsilon}$ と置きます。$G'(p)=\varepsilon\log p-z$、$G''(p)=\varepsilon/p>0$ で、停留点は $p=e^{z/\varepsilon}$。ここで $G=\varepsilon e^{z/\varepsilon}-\varepsilon e^{z/\varepsilon}=0$ です。$p=0$ なら $G(0)=\varepsilon e^{z/\varepsilon}>0$ です。各セルに $z_{ij}=f_i+g_j-C_{ij}$ を代入して足し、$\sum_jP_{ij}=a_i$、$\sum_iP_{ij}=b_j$ を用いると $F_\varepsilon(P)-D_\varepsilon(f,g)\ge0$ です。等号は各セルで $P_{ij}=e^{(f_i+g_j-C_{ij})/\varepsilon}$ のときに限ります。
<!-- solution-end -->

### OTR25-B02 KL射影の差の式を導く
- Level: B

正の行列 $P^*$ の行和が $a$ で、正の $Q$ の行和を $r$ とする。$Q'_{ij}=a_iQ_{ij}/r_i$ を定め、一般化KL距離 $\mathcal D$ について $\mathcal D(P^*\Vert Q)-\mathcal D(P^*\Vert Q')=\mathcal D(a\Vert r)$ を導け。

<!-- solution-start -->
**詳細解答**。差を定義から書くと、$P^*\log(P^*/Q)$ の $P^*$ を含む部分と $-P^*$ は相殺し、$\sum_{ij}[P^*_{ij}\log(Q'_{ij}/Q_{ij})+Q_{ij}-Q'_{ij}]$ となります。$Q'_{ij}/Q_{ij}=a_i/r_i$ なので第1項の和は $\sum_i a_i\log(a_i/r_i)$ です。後半は $\sum_i(r_i-a_i)$。合わせて $\sum_i[a_i\log(a_i/r_i)-a_i+r_i]=\mathcal D(a\Vert r)$ です。各項は非負で、行和がすでに $a$ に一致していれば差が0です。
<!-- solution-end -->

### OTR25-B03 費用誤差と計画誤差を区別する
- Level: B

$n=m=2$、$\varepsilon=0.2$ の正則化解に対し、通常OTの費用からの差の普遍上界を求めよ。その上界が行列各成分の誤差ではない理由を説明せよ。

<!-- solution-start -->
**詳細解答**。[ゼロ極限の命題](#prop-otr25-zero-limit)に $nm=4$ を代入して $0\le\langle C,P^{0.2}\rangle-L_0\le0.2\log4\approx0.277259$ です。この評価は線形関数 $\langle C,P\rangle$ の値についてだけのものです。例えば $C$ の全成分が同じ0なら、全ての実行可能な $P$ の費用は同じですが、その行列成分は異なり得ます。よって費用差0から任意の通常最適結合との成分差0は導けません。
<!-- solution-end -->

### OTR25-B04 JKOと結合正則化を取り違えない
- Level: B

$\mu^k$ を確率測度とするJKO一歩と、本章の有限結合正則化の最適化変数、係数、極限をそれぞれ書き分けよ。$\tau=\varepsilon$ と置いたら同じ算法になるか答えよ。

<!-- solution-start -->
**詳細解答**。[JKO一歩](../OTR22/index.md#def-otr22-jko-step)の変数は次時刻の測度 $\mu^{k+1}$ で、最小化する目的は次の量です。

$$
\mathcal F(\mu)+\frac{W_2^2(\mu,\mu^k)}{2\tau}.
$$

$\tau$ は時間刻みで、連続時間極限は $\tau\downarrow0$ です。

これに対して、本章の変数は固定した二つの周辺 $a,b$ を持つ結合行列 $P$ で、目的は

$$
\langle C,P\rangle+\varepsilon\sum_{ij}P_{ij}(\log P_{ij}-1)
$$

です。$\varepsilon$ は行列正則化の強さで、固定した有限問題の $\varepsilon\downarrow0$ は通常の最適輸送費用へ近づく極限です。変数、拘束条件、目的関数が異なるため、数値として $\tau=\varepsilon$ にしても同じ算法にはなりません。
<!-- solution-end -->

### OTR25-C01 反復の収束を積み上げる
- Level: C

$n,m\ge2$、$K_{ij}>0$、$a_i,b_j>0$ の下で、Sinkhorn反復が収束する証明を次の順で自力再構成せよ。(i)一般化KLの減少、(ii)残差の消滅、(iii)正の極限の存在、(iv)スケーリング形と一意性。$K$ に0がある場合にどの推論が使えなくなるかも述べよ。

<!-- solution-start -->
**詳細解答**。

(i) 目標スケーリング $P^*>0$ は[正則化双対定理](#thm-otr25-duality)で $C_{ij}=-\log K_{ij}$、$\varepsilon=1$ として存在します。行射影 $Q'_{ij}=a_iQ_{ij}/r_i$ について[KLの差の式](#thm-otr25-sinkhorn-convergence)を展開すると

$$
\mathcal D(P^*\Vert Q)-\mathcal D(P^*\Vert Q')=\mathcal D(a\Vert r)\ge0.
$$

列射影も同じです。

(ii) 全射影での減少量の和が初期 $\mathcal D(P^*\Vert Q^0)$ 以下なので、行・列の各KL減少は0へ向かいます。$a,b$ は正だから、KLが0へ行く各周辺の成分は所定の周辺へ近づきます。列を合わせた直後の行については、列倍率 $b_j/c_j\to1$ と直前の行和 $a_i$ より

$$
|r_i^{\rm after}-a_i|\le a_i\max_j|b_j/c_j-1|\longrightarrow0
$$

です。

(iii) $k_-=\min_{ij}K_{ij}>0$、$k_+=\max_{ij}K_{ij}$ を用い、行更新の $u_i=a_i/(Kv)_i$ から次を得ます。

$$
\frac{u_i}{\sum_lu_l}\ge a_i\frac{k_-}{k_+},\qquad
P_{ij}=b_j\frac{u_iK_{ij}}{\sum_lu_lK_{lj}}
\ge a_ib_j\left(\frac{k_-}{k_+}\right)^2>0.
$$

各成分は列和により $P_{ij}\le b_j$ だから、正の極限部分列が存在します。

(iv) 極限の四セル比は次のように保たれます。

$$
\frac{P_{ij}P_{kl}}{P_{il}P_{kj}}
=\frac{K_{ij}K_{kl}}{K_{il}K_{kj}}.
$$

対数にして $\log(P_{ij}/K_{ij})=\alpha_i+\beta_j$ を得ます。正の実行可能スケーリングは[双対定理](#thm-otr25-duality)で一意なので、全ての部分列極限が一致し、全反復が収束します。$K_{ij}=0$ を許すと $k_->0$ の評価も対数の四セル比も使えず、可解性・支持の連結条件を別途要します。
<!-- solution-end -->

### OTR25-C02 費用が同じとき選ばれる結合
- Level: C

$a_i,b_j>0$、$C_{ij}=0$ の有限輸送を考える。(i) 通常OTの最適解集合、(ii) すべての $\varepsilon>0$ に共通する正則化最適解、(iii) $\varepsilon\downarrow0$ の極限を求め、エントロピー最大化の一意性を直接証明せよ。

<!-- solution-start -->
**詳細解答**。(i) 任意の $P\in U(a,b)$ に対して $\langle C,P\rangle=0$ なので、通常OTの最適解集合は $U(a,b)$ 全体です。(ii) 独立結合 $Q_{ij}=a_ib_j$ は正で両周辺を持ちます。任意の $P\in U(a,b)$ に対してKL距離を展開すると

$$
\begin{aligned}
\sum_{ij}P_{ij}\log\frac{P_{ij}}{a_ib_j}
&=\sum_{ij}P_{ij}\log P_{ij}
-\sum_i a_i\log a_i-\sum_jb_j\log b_j\\
&=-H(P)+H(a)+H(b)\ge0.
\end{aligned}
$$

> この不等式は $s\log s-s+1\ge0$ を各セルで $Q_{ij}$ 倍して足すと得られ、等号は全セルで $P_{ij}=Q_{ij}$ のときに限ります。よって $H(P)\le H(a)+H(b)=H(Q)$ で等号は $P=Q$ の場合だけです。$C=0$ なので $F_\varepsilon=-\varepsilon H(P)-\varepsilon$ を最小化する解は、すべての $\varepsilon>0$ で $Q$ です。(iii) 列は初めから一定なので $\varepsilon\downarrow0$ でも $P^\varepsilon=Q$ へ収束します。通常OTの最適解が非一意でも最大エントロピー選択は一意であることが直接確かめられます。
<!-- solution-end -->

## 8. 何を保証し、何を数値実験へ残すか

- 正の周辺と有限費用なら、正則化された輸送行列は全セル正で一意です。正則化双対とSinkhornの交互スケーリングはこの解を特徴付けます。
- 行・列の残差が0へ収束することを証明しましたが、任意の $\varepsilon$・行列サイズで**決まった反復回数以内**に指定精度へ達するとは主張していません。
- log-domainは指数計算のオーバーフロー・アンダーフローを抑えますが、再構成した最終 $P$ の極小成分が浮動小数点で0になることまで防ぐものではありません。
- 固定した有限問題では輸送費用の偏差が高々 $\varepsilon\log(nm)$ です。この理論的な正則化誤差と、有限回計算の周辺残差・演算誤差は別に報告する必要があります。

次のOTR26では、今回の実装を出発点に、離散primal/dual、一次元の分位点公式、Gaussianの $W_2$、保存則と散逸の数値結果を同じ条件で照合します。
