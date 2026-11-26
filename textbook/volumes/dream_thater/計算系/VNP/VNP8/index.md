# VNP8 D：F₂行列rank、transversal pair、平均D(r)の劣加法性

前講では [priceのCAT(0)完備化](../VNP7/index.md#thm-vnp7-price-completion) により、計算資源に由来する距離に四辺形の幾何を適用できるようになりました。今回は行列を点とする有限集合を選びます。行列の差の階数ごとに距離を平均すると、個々の距離が非対称な配置でも、増加率に普遍的な制約が生まれます。

一次資料：Claude (Anthropic), [VP ≠ VNP over every field, v1](https://hexagonmath.org/2611.00954v1), Appendix D.1 および D.2 の Step 1–2（pp.29–30）。原著の主定理の研究講読であり、本講ではこの部分の紙面の証明を展開します。

直接前提：[VNP7](../VNP7/index.md)、[VNP3](../VNP3/index.md)、[NPCG6](../../../幾何系/NPCG/NPCG6/index.md)。

## 1. 二元体の行列と独立な方向

$\mathbb F_2=\{0,1\}$ は和と積を2で割った余りで計算する[体](../../../代数系/RNG/RNG1/index.md#def-rng1-zero-divisor-domain-field)です。特に $1+1=0$ なので $-W=W$ です。正整数 $\mu$ を固定し、$\mu$ 行 $\mu$ 列の行列全体を $M=\operatorname{Mat}_\mu(\mathbb F_2)$ と書きます。$|M|$ は集合 $M$ の要素数であり、各成分が2通りなので $|M|=2^{\mu^2}$ です。[price](../VNP3/index.md#def-vnp3-price) を定める体 $K$ は別に固定します。$K$ の標数が2である必要はありません。

列ベクトルは $\mathbb F_2^\mu$ の元、行ベクトルはその転置として扱います。上付き $\mathsf T$ は転置、$\langle v_1,\ldots,v_m\rangle$ は $\mathbb F_2$ 係数による[線形包](../../../代数系/FLD/FLD0/index.md#def-fld0-span-over-field)（全線形結合の集合）です。行列 $W$ の列空間 $C(W)$ は列ベクトルの張る部分空間、行空間 $R(W)$ は行ベクトルの張る部分空間です。標準基底 $e_j$ の第 $j$ 成分だけが1であることから、$We_j$ は第 $j$ 列です。任意の $x=\sum_j x_je_j$ について

$$
Wx=\sum_{j=1}^{\mu}x_jWe_j.
$$

従って $C(W)$ は線形写像 $x\mapsto Wx$ の像です。階数 $\operatorname{rk}W$ はこの像の[次元](../../../代数系/FLD/FLD0/index.md#def-fld0-dimension-over-field)です。行空間の次元もこれに一致することは次の分解で確認できます。

$r=\operatorname{rk}W$ とします。$r=0$ なら全列が零なので $W=0$ です。以下 $r>0$ とします。列空間から基底となる $r$ 本の列を選んで並べた行列を $U$（$\mu\times r$）、各列のその基底での座標を並べた行列を $V$（$r\times\mu$）とします。$U_{\cdot h}$ を $U$ の第 $h$ 列、$V_{hj}$ を第 $h$ 行第 $j$ 列の成分と書けば、

$$
We_j=\sum_{h=1}^r U_{\cdot h}V_{hj},
\qquad W=UV
$$

です。基底に選んだ列に対応する $V$ の列は $\mathbb F_2^r$ の標準基底です。従って行の一次結合 $\lambda^{\mathsf T}V=0$ をその $r$ 列で評価すると各係数 $\lambda_h=0$ となり、$V$ の行は独立です。

[基底延長](../../../代数系/FLD/FLD0/index.md#thm-fld0-steinitz-basis-extension-over-field) により $U$ の列を $\mathbb F_2^\mu$ の基底に延長できます。その基底で最初の $r$ 座標を取り出す線形写像の行列を $L$（$r\times\mu$）とすれば $LU=I_r$（$I_r$ は $r$ 次単位行列）です。従って

$$
V=I_r V=LUV=LW.
$$

$W=UV$ は $W$ の各行が $V$ の行の線形結合であることを、$V=LW$ は逆の包含を示します。従って $R(W)=R(V)$ で、その次元も $r$ です。

二つの行列の階数を足しても、和の階数になるとは限りません。例えば $W+W=0$ です。そこで列の方向だけでなく行の方向も独立に取ります。ここで部分空間の和が直和とは、各部分空間から一つずつ選んだベクトルの和が零になるのはすべて零のときだけ、という条件です。これは以下では列と行のそれぞれについて課す条件であり、行列同士の一次独立性だけとは異なります。

<a id="def-vnp8-transversal"></a>

<!-- formal-statement-start -->
> **定義（横断的な行列族）**
>
> $M$ の行列族 $W_1,\ldots,W_k$（$k\ge1$）について、列空間の和と行空間の和がともに直和、すなわち
>
> 各 $c_h\in C(W_h)$ の和が零なら全 $c_h=0$、かつ各 $v_h\in R(W_h)$ の和が零なら全 $v_h=0$ であるとき、横断的（transversal）という。$k=2$ の場合を横断対という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vnp8-transversal -->
**定義の確認**：$\mu=2$ とし、$E_{ij}$ を $(i,j)$ 成分だけが1の行列とします。$W=E_{11},W'=E_{22}$ なら列空間はそれぞれ第一・第二標準基底の張る直線、行空間もそれぞれ第一・第二標準行ベクトルの張る直線です。列について $\alpha e_1+\beta e_2=(\alpha,\beta)^{\mathsf T}=0$ なら $\alpha=\beta=0$、行についても $\gamma e_1^{\mathsf T}+\eta e_2^{\mathsf T}=(\gamma,\eta)=0$ なら $\gamma=\eta=0$ です（係数はすべて $\mathbb F_2$）。定義の二条件を満たすので横断対です。和は $I_2$ です。ここで $W'$ は二番目の行列の名前であり、微分を表しません。

対照的に $E_{11},E_{12}$ の行空間は独立ですが、列空間はともに第一標準基底の直線です。和の列も第一標準基底の倍数だけなので階数は1です。行空間だけの独立性では足りません。
<!-- definition-example-end -->

<a id="lem-vnp8-transversal-rank"></a>

<!-- formal-statement-start -->
> **補題（横断和の階数加法性）**
>
> $M$ の横断的な行列族 $W_1,\ldots,W_k$ に対し、
 
$$
\operatorname{rk}\left(\sum_{h=1}^k W_h\right)
=\sum_{h=1}^k\operatorname{rk}W_h\le\mu
$$

> が成立する。逆に任意の階数 $r$ の行列は、$r>0$ なら $r$ 個の横断的な階数1行列の和に分解できる。
<!-- formal-statement-end -->

列と行の直和条件を、積の左側の単射性と右側の全射性にそれぞれ変換します。

<!-- proof-start -->
### 証明

$r_h=\operatorname{rk}W_h$ とし、階数0の項は除きます（全項が零なら結論は直ちに成立）。先の基底分解で $W_h=U_hV_h$ と書きます。$\rho=\sum_h r_h$ と置き、横に連結した $U=[U_1\ \cdots\ U_k]$ と縦に連結した $V$ を作ると、$U$ は $\mu\times\rho$、$V$ は $\rho\times\mu$ で、

$$
UV=\sum_h U_hV_h=\sum_h W_h.
$$

列空間の直和条件により $U$ の全列は独立です。実際、列の一次結合が零なら各ブロックの寄与が零で、その内部の基底の係数もすべて零です。従って $\rho\le\mu$、$U:\mathbb F_2^\rho\to\mathbb F_2^\mu$ は単射です。行空間の直和条件と $R(V_h)=R(W_h)$ から $V$ の全行も独立です。もし $V$ の像が $\mathbb F_2^\rho$ の真部分空間なら、その像の基底を延長して、追加した基底の一つに1、他の基底に0を割り当てる非零線形写像 $\mathbb F_2^\rho\to\mathbb F_2$ を取れます。その標準基底での行列を行ベクトル $\lambda^{\mathsf T}$ と書きます。像上で零なので $\lambda^{\mathsf T}V=0$ となりますが、これは行の一次独立性に反します。従って $V:\mathbb F_2^\mu\to\mathbb F_2^\rho$ は全射です。よって

$$
\operatorname{im}(UV)=U(\operatorname{im}V)=U(\mathbb F_2^\rho).
$$

$U$ の単射性からこの像の次元は $\rho$ です。

逆方向では階数 $r$ の行列を $W=UV$ と分解し、$U$ の第 $h$ 列を $u_h$、$V$ の第 $h$ 行を $v_h^{\mathsf T}$ と書きます。

$$
W=\sum_{h=1}^r u_hv_h^{\mathsf T}.
$$

各 $u_h,v_h$ は非零です。外積 $u_hv_h^{\mathsf T}$ の $(p,q)$ 成分は $(u_h)_p(v_h)_q$ であり、第 $q$ 列は $(v_h)_qu_h$、第 $p$ 行は $(u_h)_pv_h^{\mathsf T}$ です。少なくとも一つの列と一つの行は非零なので、列空間は $u_h$ の直線、行空間は $v_h^{\mathsf T}$ の直線で階数1です。各ベクトル族は独立なので両方の直和条件を満たします。
<!-- proof-end -->

## 2. 階数ごとの一様平均

$M_r=\{W\in M:\operatorname{rk}W=r\}$ とします。$0\le r\le\mu$ なら、最初の $r$ 個の対角成分だけ1の行列があるので $M_r$ は非空です。[priceの保存則](../VNP3/index.md#thm-vnp3-price-laws) によれば price は[擬距離](../../../幾何系/NPCG/NPCG1/index.md#def-npcg1-pseudometric)（異なる点間でも零になり得る距離）です。距離そのものは行列の差だけでは決まらないかもしれません。階数 $r$ を固定し、出発点 $a\in M$ と差 $W\in M_r$ を独立に一様選択して二乗距離の平均を取ります。その非負平方根を $D(r)$ と書きます。

<a id="def-vnp8-rank-average"></a>

<!-- formal-statement-start -->
> **定義（階数別二乗平均距離）**
>
> 体 $K$ に関する [price](../VNP3/index.md#def-vnp3-price) $d$ を $M$ 上に取る。整数 $0\le r\le\mu$ に対し

$$
D(r)=\left(\frac{1}{|M||M_r|}
\sum_{a\in M}\sum_{W\in M_r}d(a,a+W)^2\right)^{1/2}
$$

> と定める。平方根は非負のものを取る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vnp8-rank-average -->
**定義の確認**：$\mu=1$ のとき $M=\{0,1\}$、$M_0=\{0\}$、$M_1=\{1\}$。二点上のpriceを $d(0,1)=c\ge0$ とすると、[priceの保存則](../VNP3/index.md#thm-vnp3-price-laws) による対称性と対角零から

$$
D(0)^2=(0+0)/2=0,\qquad
D(1)^2=(c^2+c^2)/2=c^2.
$$

従って $D(0)=0,D(1)=c$。零priceでは $c=0$ です。一般の $\mu$ でも $M_0=\{0\}$ なので $D(0)=0$ です。
<!-- definition-example-end -->

一様な横断対から平均を取るため、各階数の行列が偏らず現れる理由を確認します。可逆行列（逆行列を持つ行列）の集合を $G=\mathrm{GL}_\mu(\mathbb F_2)$ と書きます。有限集合上の一様分布は各要素に同じ確率を与えます。周辺分布とは、組を選んだ後で一つの成分または和だけを取り出したときの分布です。

<a id="lem-vnp8-uniform-transversal"></a>

<!-- formal-statement-start -->
> **補題（横断対の階数別一様性）**
>
> 非負整数 $i,j$ が $i+j\le\mu$ を満たすとする。階数がそれぞれ $i,j$ である横断対の有限集合から $(W,W')$ を一様に選ぶ。このとき $W,W',W+W'$ の周辺分布はそれぞれ $M_i,M_j,M_{i+j}$ 上の一様分布である。
<!-- formal-statement-end -->

この補題は三つの量が独立であるとは主張しません。必要なのは各量の分布だけです。

<!-- proof-start -->
### 証明

横断対の集合を $\mathcal T_{i,j}$ と書きます。最初の $i$ 個と次の $j$ 個の対角成分にそれぞれ1を置けば、列・行とも異なる座標部分空間なので横断対が存在します。$i=0$ または $j=0$ でも零行列を用いればよいです。

$P,Q\in G$ について、$(W,W')$ を $(PWQ,PW'Q)$ に送ります。$Q$ が全射なので $\{WQx:x\in\mathbb F_2^\mu\}=\{Wy:y\in\mathbb F_2^\mu\}$、つまり $C(WQ)=C(W)$ です。従って $C(PWQ)=P C(W)$。行については $z^{\mathsf T}P$ が全行ベクトルを動くので $R(PW)=R(W)$、右乗算により $R(PWQ)=R(W)Q$ です。可逆線形写像は直和条件を保存します。逆写像は左右から $P^{-1},Q^{-1}$ を掛ける操作なので、これは $\mathcal T_{i,j}$ の置換です。

階数 $r$ のどの行列も、可逆な行基本変形・列基本変形で対角形 $\operatorname{diag}(I_r,0)$（左上が $I_r$、残りが零の $\mu$ 次行列）へ移せます。非零成分を行・列の交換で左上に置くと、その成分は1です。第一列の他の1を第一行の加算で消し、第一行の他の1を第一列の加算で消すと、

$$
\begin{pmatrix}1&0\\0&A_1\end{pmatrix}
$$

になります。交換と加算は逆操作があるため階数を保存し、この形では列空間が第一座標の直線と残りの列空間の直和なので $\operatorname{rk}A_1=r-1$ です。残りの小行列で繰り返し、階数が零になれば終了します。$r=0$ の場合は初めから零行列です。

従って任意の $A,B\in M_r$ に対し $P_A A Q_A=P_B B Q_B=\operatorname{diag}(I_r,0)$ となる可逆行列があり、

$$
B=P_B^{-1}P_A A Q_A Q_B^{-1}.
$$

$P=P_B^{-1}P_A$、$Q=Q_A Q_B^{-1}$ とすれば $PAQ=B$ です。

第一成分 $W=A$ を持つ横断対の集合は、この置換により $W=B$ を持つ集合へ全単射で移ります。従って各 $A\in M_i$ の出現回数は等しく、総数が $|\mathcal T_{i,j}|$ なので確率は $1/|M_i|$ です。第二成分でも同じ置換を使えば確率は $1/|M_j|$ です。

[横断和の階数加法性](#lem-vnp8-transversal-rank) により $W+W'\in M_{i+j}$ です。和の値が $A$ の横断対は、$PAQ=B$ を満たす置換により和の値が $B$ の横断対に移ります。実際 $PWQ+PW'Q=P(W+W')Q$。従って和の値の確率も $1/|M_{i+j}|$ です。
<!-- proof-end -->

例えば $\mu=2,i=j=1$ では $E_{11}$ と $E_{22}$ は横断対です。$W+W'=I_2$ で階数2ですが、$W$ と $W'$ を独立に一様選択すると $W=W'$ が正の確率で起こり、和が零になるため同じ分布にはなりません。

## 3. 四辺形を平均する

一つの横断対と出発点 $a$ から、次の順で四点を取ります。

$$
a,\quad a+W,\quad a+W+W',\quad a+W'.
$$

二元体なので、四辺の差は順に $W,W',W,W'$、二本の対角線の差はどちらも $W+W'$ です。例えば $(a+W')-(a+W)=W'+W$ となります。この一致は標数2であることに依存します。

<a id="thm-vnp8-rank-subadditive"></a>

<!-- formal-statement-start -->
> **定理（階数別二乗平均距離の劣加法性）**
>
> $\mu\ge1$ とし、体 $K$ に関する任意のprice $d$ を $M$ 上に取る。階数別二乗平均距離 $D$ に対し、非負整数 $i,j$ が $i+j\le\mu$ を満たせば

$$
D(i+j)^2\le D(i)^2+D(j)^2
$$

> が成立する。特に $0\le r\le\mu$ で

$$
D(r)\le\sqrt r\,D(1)
$$

> である。
<!-- formal-statement-end -->

証明の核心は、[CAT(0)空間](../../../幾何系/NPCG/NPCG3/index.md#def-npcg3-cat-zero) の [四辺形不等式と中点の差](../../../幾何系/NPCG/NPCG6/index.md#thm-npcg6-quadrilateral) で二本の対角線の平方和を四辺の平方和以下に抑え、その各項の周辺分布を調べることです。通常の三角不等式で得る $rD(1)$ よりも小さい上界を得ます。

<!-- proof-start -->
### 証明

[VNP7のpriceのCAT(0)完備化](../VNP7/index.md#thm-vnp7-price-completion) により $M$ の各点を完備CAT(0)空間へ距離を保存するように送れます。異なる行列の像が同じでも四点の不等式は適用できます。[四辺形不等式と中点の差](../../../幾何系/NPCG/NPCG6/index.md#thm-npcg6-quadrilateral) を上の順の四点に適用し、非負の中点補正項を捨てると

$$
\begin{aligned}
&d(a,a+W+W')^2+d(a+W,a+W')^2\\
&\le d(a,a+W)^2+d(a+W,a+W+W')^2\\
&\quad+d(a+W+W',a+W')^2+d(a+W',a)^2 .
\end{aligned}
$$

$a$ を $M$ 上で一様に、横断対とは独立に選びます。横断対の値を固定しても、$a$ に固定行列を足す操作は $M$ の置換なので、$a+W$ および $a+W'$ は条件付きで一様です。従って例えば $a+W$ と $W+W'$ の組の分布は、$M$ と $M_{i+j}$ の一様分布の積です。実際、任意の $b\in M,H\in M_{i+j}$ について

$$
\Pr(a+W=b,\ W+W'=H)
=\frac1{|M|}\Pr(W+W'=H)
=\frac1{|M||M_{i+j}|}.
$$

最後は [横断対の階数別一様性](#lem-vnp8-uniform-transversal) によります。

[階数別二乗平均距離](#def-vnp8-rank-average) の定義から、左辺の第一項は差が $W+W'$ なので平均 $D(i+j)^2$。第二項は始点 $a+W$、差が $W+W'$ なので同じ平均です。右辺は順に始点と差の組を $(a,W),(a+W,W'),(a+W',W),(a,W')$ に取れます（必要な項は距離の対称性で順を交換します）。よって平均は順に $D(i)^2,D(j)^2,D(i)^2,D(j)^2$。

以上から

$$
2D(i+j)^2\le2D(i)^2+2D(j)^2.
$$

2で割れば劣加法性です。$D(0)=0$ であり、$r\ge1$ について $i=r-1,j=1$ を適用して帰納的に $D(r)^2\le rD(1)^2$。非負の平方根を取れば結論です。
<!-- proof-end -->

この評価は個々の行列対の距離を $\sqrt r D(1)$ 以下とする主張ではありません。例えば $\mu\ge2$ で二点の非零priceを [priceの保存則](../VNP3/index.md#thm-vnp3-price-laws) により引き戻し、零行列だけを片側、他の行列をもう片側の点に送ります。二点間距離を $c>0$ とすれば固定した階数1の差 $W$ に対し、$a=0$ または $a=W$ の二通りだけ距離が $c$ となり、他は零です。従って $D(1)^2=2c^2/|M|<c^2$ であり、点ごとの上界にはなりません。

標数2を使わないと対角線の差は $W+W'$ と $W'-W$ に分かれます。例えば $\mathbb F_3$ で $W=E_{11},W'=E_{22}$ なら二つは異なる行列です。ここで示した同一差による議論はそのままでは使えません（別の対称性で平均を扱える場合はあります）。

## 4. 上界に近づくprice

次講では普遍上界を一様に改善できるか否かを調べます。まず上界が任意に近く達成されるとき、実際に等号を達成するpriceを作ります。有限集合であることが重要です。

<a id="thm-vnp8-extremal-price"></a>

<!-- formal-statement-start -->
> **命題（階数別平均の上界を達成するprice）**
>
> $\mu\ge2$ とする。体 $K$ を固定し、任意の実数 $1\le s<\sqrt\mu$ に対し $M$ 上に $D(\mu)>sD(1)$ を満たすpriceが存在すると仮定する。
> このとき $M$ 上に全階数 $0\le r\le\mu$ で

$$
D(r)^2=r
$$

> を満たすpriceが存在する。
<!-- formal-statement-end -->

まず $D(1)$ を1に規格化（距離全体を同じ正数で割ること）し、有限個の距離を一様有界にして極限を取ります。最後に階数 $r$ と $\mu-r$ への分割で各階数の等号を取り出します。

<!-- proof-start -->
### 証明

[階数別二乗平均距離](#def-vnp8-rank-average) の階数1での分母を $N=|M||M_1|$ と置きます。階数1の差 $W$ の各項 $d(a,a+W)^2$ は非負であり、全項の和が $ND(1)^2$ なので

$$
d(a,a+W)\le\sqrt N D(1).
$$

任意の $a,b\in M$ について $b-a$ の階数を $r$ とします。$r>0$ なら [横断和の階数加法性](#lem-vnp8-transversal-rank) の分解により $b-a=\sum_{h=1}^r W_h$（各階数1）。$a_h=a+\sum_{t=1}^h W_t$、$a_0=a$ と置けば $a_r=b$、隣接点の差は階数1です。[priceの保存則](../VNP3/index.md#thm-vnp3-price-laws) により $d$ は擬距離です。隣接点間の距離を足すと

$$
d(a,b)\le\sum_{h=1}^r d(a_{h-1},a_h)
\le\mu\sqrt N D(1).
$$

$r=0$ なら対角零です。従って $D(1)=0$ の場合は全距離が零で、仮定の厳密不等式は成立しません。

$s_n=\sqrt\mu-(\sqrt\mu-1)/(n+1)$（$n\ge1$）と選ぶと $1\le s_n<\sqrt\mu$ かつ $s_n\to\sqrt\mu$。仮定を各 $s_n$ に適用しprice $d_n$ を選びます。ここで $D_n$ は $d_n$ から計算する階数別二乗平均距離です。それぞれ $D_n(1)>0$ なので、規格化する前の値を $c_n=D_n(1)$ として $\widetilde d_n=d_n/c_n$ と置きます。この距離から計算する平均を $\widetilde D_n$ とすると、有限和の各項が $1/c_n^2$ 倍されるため $\widetilde D_n(r)=D_n(r)/c_n$ です。[priceの保存則](../VNP3/index.md#thm-vnp3-price-laws) によって規格化後もpriceです。以下では $\widetilde d_n,\widetilde D_n$ を改めて $d_n,D_n$ と書き、$D_n(1)=1,D_n(\mu)>s_n$ とします。

すべての点対座標が区間 $[0,\mu\sqrt N]$ に入ります。点対は有限個なので一座標ずつ有界実数列から収束部分列を取り、有限回繰り返せば全座標で同時に収束する部分列が得られます。極限 $d_*$ は [priceの保存則](../VNP3/index.md#thm-vnp3-price-laws) によりpriceです。有限和と平方根の連続性により $D_*(1)=1,D_*(\mu)\ge\sqrt\mu$。一方 [階数別二乗平均距離の劣加法性](#thm-vnp8-rank-subadditive) から $D_*(r)^2\le r$ です。

任意の $r$ で同じ定理を $i=r,j=\mu-r$ に適用すると

$$
\mu\le D_*(\mu)^2
\le D_*(r)^2+D_*(\mu-r)^2
\le r+(\mu-r)=\mu.
$$

従ってすべて等号です。二つの非負の不足分 $r-D_*(r)^2$ と $\mu-r-D_*(\mu-r)^2$ の和が零なので、各不足分は零です。結論 $D_*(r)^2=r$ を得ます。
<!-- proof-end -->

平均が等号でも、各行列対の距離が階数の平方根に等しいことはまだ示していません。ただし第3節の証明で平均した四辺形不等式の余りは各項が非負です。等号のpriceではその有限平均が零になるため、各横断対・出発点における余りも零となります。次講ではこの情報を出発点に個々の距離を決定します。

## 5. 演習

### A1. 二元体の階数

- Level: A
- ID: VNP8-A1

$\mu=2$ で

$$
W=\begin{pmatrix}1&1\\0&0\end{pmatrix},
\qquad W'=\begin{pmatrix}0&0\\1&0\end{pmatrix}
$$

とする。横断対か判定し、和の階数を求めよ。

<!-- solution-start -->
**詳細解答**：$C(W)=\langle(1,0)^{\mathsf T}\rangle$、$C(W')=\langle(0,1)^{\mathsf T}\rangle$。$\alpha(1,0)^{\mathsf T}+\beta(0,1)^{\mathsf T}=(\alpha,\beta)^{\mathsf T}=0$ なら両係数は零なので、二つの列方向は独立です。行空間は $\langle(1,1)\rangle$ と $\langle(1,0)\rangle$ で、係数 $\alpha,\beta\in\mathbb F_2$ に対し $\alpha(1,1)+\beta(1,0)=(\alpha+\beta,\alpha)=0$ なら $\alpha=\beta=0$。よって [横断的な行列族](#def-vnp8-transversal) の両条件を満たします。[横断和の階数加法性](#lem-vnp8-transversal-rank) で階数は2。直接にも $W+W'=\begin{pmatrix}1&1\\1&0\end{pmatrix}$ は第二行を第一行に足して $\begin{pmatrix}0&1\\1&0\end{pmatrix}$ となり二つのピボットを持ちます。
<!-- solution-end -->

### A2. 平均の母集団

- Level: A
- ID: VNP8-A2

$\mu=2$ で階数0,1,2の行列の個数を求め、$D(1)^2$ の平均の分母を求めよ。

<!-- solution-start -->
**詳細解答**：全行列数は $2^4=16$、階数0は零行列1個です。階数1の行列は非零列 $u$ と非零行 $v^{\mathsf T}$ の積で、各3通り。二元体では非零のスカラーが1だけなので、列空間の唯一の非零ベクトルが $u$ を決め、各列が零か $u$ かで $v$ も決まります。従って重複なく9個です。残りは $16-1-9=6$ 個で階数2。[階数別二乗平均距離](#def-vnp8-rank-average) の分母は $16\cdot9=144$ です。
<!-- solution-end -->

### A3. 差を取る向き

- Level: A
- ID: VNP8-A3

$\mu=2,a=E_{12},W=E_{11},W'=E_{22}$ とする。四点を書き、二本の対角線の差を計算せよ。

<!-- solution-start -->
**詳細解答**：順に
$$
\begin{pmatrix}0&1\\0&0\end{pmatrix},\
\begin{pmatrix}1&1\\0&0\end{pmatrix},\
\begin{pmatrix}1&1\\0&1\end{pmatrix},\
\begin{pmatrix}0&1\\0&1\end{pmatrix}.
$$
第三点から第一点を引くと対角成分だけ1の $I_2$、第四点から第二点を引いても二元体では $-1=1$、右上は $1-1=0$ なので $I_2$。両者は階数2です。
<!-- solution-end -->

### A4. 増加率

- Level: A
- ID: VNP8-A4

$\mu=8,D(1)=3,D(3)=4$ のpriceで $D(6),D(8)$ の上界を求めよ。$D(6)$ の評価も $D(8)$ に利用せよ。

<!-- solution-start -->
**詳細解答**：[階数別二乗平均距離の劣加法性](#thm-vnp8-rank-subadditive) を $3+3=6$ に使うと $D(6)^2\le16+16=32$、従って $D(6)\le4\sqrt2$。$2$ には一般上界から $D(2)^2\le2\cdot9=18$。$6+2=8$ に適用すると $D(8)^2\le32+18=50$、従って $D(8)\le5\sqrt2$。一般上界だけなら $3\sqrt8$ なので改善されています。
<!-- solution-end -->

### B1. 横断対の数

- Level: B
- ID: VNP8-B1

$\mu=2,i=j=1$ とする。固定した階数1行列 $W=uv^{\mathsf T}$ に対し、横断的な $W'=xy^{\mathsf T}$ の個数を求めよ。和が固定した可逆行列となる横断対の個数も求めよ。

<!-- solution-start -->
**詳細解答**：非零ベクトルは3個。列の直和条件は $x\ne u$、行の直和条件は $y\ne v$ と同値です。各2通りで外積の表示は一意なので4個です。演習A2で数えたように $W$ は9通り、順序付き横断対は36個。[横断対の階数別一様性](#lem-vnp8-uniform-transversal) により和は6個の可逆行列に同じ回数ずつ現れます。従って各 $36/6=6$ 個です。独立選択の全81対とは異なる点に注意します。
<!-- solution-end -->

### B2. 条件付き一様性

- Level: B
- ID: VNP8-B2

非負整数 $i,j$ は $i+j\le\mu$ を満たすとする。$a$ を $M$ 上で一様に選び、$a$ とは独立に $(W,W')$ を横断対の集合 $\mathcal T_{i,j}$ 上で一様に選ぶ。二つの成分 $W,W'$ 自体の独立性は仮定しない。$a+W'$ と $W$ が独立であることを確率の式で示し、$d(a+W',a+W'+W)^2$ の期待値を求めよ。

<!-- solution-start -->
**詳細解答**：$b\in M,A\in M_i$ とする。横断対の値 $(A,B)$ を固定すれば、$a+ B=b$ は $a=b-B$ という一つの値に対応するので確率 $1/|M|$ です。従って
$$
\begin{aligned}
\Pr(a+W'=b,W=A)
&=\sum_{B:(A,B)\in\mathcal T_{i,j}}
\frac{\Pr(W=A,W'=B)}{|M|}\\
&=\frac{\Pr(W=A)}{|M|}
=\frac1{|M||M_i|}.
\end{aligned}
$$
最後は [横断対の階数別一様性](#lem-vnp8-uniform-transversal) です。従って組は積一様であり、期待値は [階数別二乗平均距離](#def-vnp8-rank-average) の定義により $D(i)^2$ です。
<!-- solution-end -->

### B3. 幾何の仮定を外す

- Level: B
- ID: VNP8-B3

$\mu=2$ で $\delta(a,b)=\operatorname{rk}(b-a)$ と置く。この距離が三角不等式を満たすことを示し、第2節と同じ平均式を $\delta$ に適用した値 $D_\delta(r)$ に二乗劣加法性が成立するか調べよ。

<!-- solution-start -->
**詳細解答**：任意の行列 $A,B$ について $(A+B)x=Ax+Bx$ なので像は $C(A)+C(B)$ に含まれ、階数は $\operatorname{rk}A+\operatorname{rk}B$ 以下です。$c-a=(c-b)+(b-a)$ とすれば三角不等式。対称性は負号で階数が変わらないこと、零距離は階数0の行列が零行列のみであることから従います。差の階数 $r$ の全組で距離は $r$ なので、[階数別二乗平均距離](#def-vnp8-rank-average) と同じ平均式を $\delta$ に用いた値は $D_\delta(r)^2=r^2$ です。ここでは price かどうかをこれから判定するため、$D_\delta$ と区別します。$i=j=1$ では左辺4、右辺2で成立しません。

四点 $0,E_{11},I_2,E_{22}$ の四辺はすべて距離1、両対角線は距離2なので四辺の平方和4に対し対角線の平方和8です。[四辺形不等式](../../../幾何系/NPCG/NPCG6/index.md#thm-npcg6-quadrilateral) に反します。従ってこの距離は [priceのCAT(0)完備化](../VNP7/index.md#thm-vnp7-price-completion) が保証するpriceではありません。
<!-- solution-end -->

### C1. 近似等号から全ての階数へ

- Level: C
- ID: VNP8-C1

$\mu=5$ のprice列で $D_n(1)=1$、$D_n(5)^2\ge5-1/n$ とする。各階数の不足分を評価せよ。極限priceで全横断四辺形の対角線の平方和と四辺の平方和が等しいことを示せ。

<!-- solution-start -->
**詳細解答**：[階数別二乗平均距離の劣加法性](#thm-vnp8-rank-subadditive) から $D_n(r)^2\le r$。$r+(5-r)=5$ に適用すると
$$
5-1/n\le D_n(r)^2+D_n(5-r)^2
\le D_n(r)^2+5-r.
$$
従って $r-1/n\le D_n(r)^2\le r$。両端の階数0,5も含みます。

[階数別平均の上界を達成するprice](#thm-vnp8-extremal-price) の証明の一様上界を用いると、全距離は $5\sqrt{|M||M_1|}$ 以下です。有限個の座標で共通収束部分列を選び、[priceの保存則](../VNP3/index.md#thm-vnp3-price-laws) によって極限もpriceになります。有限和の連続性で $D_*(r)^2=r$ です。

$i,j$ を非負整数、$i+j\le5$ と固定します。階数 $i,j$ の横断対と $a\in M$ に対し四辺の平方和から対角線の平方和を引いた値を $H(a,W,W')$ と置きます。第3節と同じく $a$ と横断対を独立に一様に選び、$E H$ はその有限分布での期待値を表すものとします。[priceのCAT(0)完備化](../VNP7/index.md#thm-vnp7-price-completion) によって極限priceをCAT(0)空間に実現できます。その空間で [四辺形不等式と中点の差](../../../幾何系/NPCG/NPCG6/index.md#thm-npcg6-quadrilateral) を適用すると $H\ge0$ です。第3節の平均計算により

$$
E H=2D_*(i)^2+2D_*(j)^2-2D_*(i+j)^2
=2i+2j-2(i+j)=0.
$$

有限一様分布は全組に正の確率を与えます。もし一組でも $H>0$ ならその項の確率を掛けた正の値が平均に寄与するので矛盾します。従って全組で $H=0$。これは各四辺形の等号であって、まだ各距離そのものの値を確定するものではありません。
<!-- solution-end -->

## 6. 次の講への接続

行列差の階数別平均は $\sqrt r$ の増加率を超えられず、普遍上界を改善できなければ等号のpriceを得られます。次講では四辺形の等号が各行列対の距離に及ぼす制約を調べ、Euclid立方体の構成と二つの場合分けに進みます。
