# GMT34 高次元tubeの交差とbush法による次元下界

<!-- definition-example-audit: strict -->

## 1. 平面の対数評価をそのまま高次元に移せるか

[GMT33のCórdoba型評価](../GMT33/index.md#thm-gmt33-cordoba)は、方向を分離した平面tubeについて、二管の交差を角度で抑え、重複度の二乗積分から合併面積の下界を得ました。ところが $d\ge3$ では方向は円周上の一列ではなく球面上に広がります。二管だけの交差を数えれば十分なのでしょうか。

本講では、まずその方法を高次元へ移して弱い下界を計算します。次に、**小さな合併体積ならどこかで多数の管が重なる**という事実を逆手に取り、一点近くに集中する管を少し離れた場所で数え直します。これが **bush法** の核心です。最後に、中心の一点ではなく一本の管に多数が集まる **hairbrush配置** を考え、次の改良に必要な幾何を見ます。

以下、$d\ge2$ を固定し、$0<\delta<\delta_d$ を十分小さい数とします。$|x|$ はEuclidノルム、$|E|$ は $d$ 次元Lebesgue測度、$\omega_k$ は $k$ 次元単位球体積（$\omega_0=1$）です。$c_d,C_d$ は $d$ にのみ依存する正定数で、行ごとに変わってよいものとします。管と重複度は[GMT32の定義](../GMT32/index.md#def-gmt32-tube)に従い、

$$
T_\delta(a,v)=\{x:\operatorname{dist}(x,\{a+tv:0\le t\le1\})<\delta\},
\qquad m(x)=\sum_{j=1}^N\mathbf1_{T_j}(x)
$$

とします。$v\in S^{d-1}$ は単位ベクトルです。以下の方向は、必要に応じて北極 $e_d=(0,\ldots,0,1)$ の周囲の固定した球面帽 $\{v:v\cdot e_d\ge3/4\}$ から選びます。この帽内では互いに正反対を向く二方向は現れません。

## 2. 高次元で二管が交わる体積

二直線の方向 $v,w$ が平行でなければ、両者の張る平面 $P=\operatorname{span}\{v,w\}$ を取れます。平面に直交する残りの $d-2$ 方向は、交差体積へ半径 $\delta$ の小さな球断面として寄与します。平面内では[前講の二帯交差](../GMT33/index.md#lem-gmt33-two-tubes)と同じ行列式が現れます。

<a id="lem-gmt34-two-tubes"></a>

<!-- formal-statement-start -->
> **補題（高次元二tubeの交差体積）**  
> $d\ge2$、$0<\delta<1$ とする。任意の二つの長さ1・半径$\delta$のtube $T_\delta(a,v),T_\delta(b,w)\subset\mathbb R^d$ について、二つの無向直線方向の鋭角を $0<\alpha\le\pi/2$ とすると

$$
|T_\delta(a,v)\cap T_\delta(b,w)|
\le \min\left\{
(\omega_{d-1}+\omega_d)\delta^{d-1},
\frac{4\omega_{d-2}\delta^d}{\sin\alpha}
\right\}.
$$

> $\alpha=0$ の場合は第一項だけが常に成り立つ。上界は管の位置に依存しない。
<!-- formal-statement-end -->

**具体例：三次元の直交管。** 原点中心で $x_1$ 軸・$x_2$ 軸に沿う線分を選びます。両管に属する点 $(x_1,x_2,x_3)$ は $x_1^2+x_3^2<\delta^2$ と $x_2^2+x_3^2<\delta^2$ を満たすので、$|x_3|<\delta$ での断面積は $4(\delta^2-x_3^2)$ です。$0<\delta<1/8$ なら線分の端の影響はなく、

$$
|T_1\cap T_2|
=\int_{-\delta}^{\delta}4(\delta^2-t^2)\,dt
=\frac{16}{3}\delta^3.
$$

補題の上界は $4\omega_1\delta^3=8\delta^3$ です。二つの数字が一致する必要はありません。後者は円断面を一辺 $2\delta$ の帯へ広げた上界だからです。

### 証明の見取り図

方向の張る二次元平面へ直交射影すると、二管に共通する点の平面成分は幅 $2\delta$ の二帯の交差に入ります。直交補空間の成分は一方の線分の直交成分から距離 $\delta$ 未満なので、その断面体積は $\omega_{d-2}\delta^{d-2}$ 以下です。両者を掛けます。

<!-- proof-start -->
### 証明

$P=\operatorname{span}\{v,w\}$ とし、直交分解 $x=y+z$、$y\in P$、$z\in P^\perp$ を用います。$a=a_P+a_\perp$ と分けます。$x$ が第一tubeに入れば、ある $0\le t\le1$ について

$$
|x-a-tv|^2
=|y-a_P-tv|^2+|z-a_\perp|^2<\delta^2.
$$

したがって $\operatorname{dist}(y,a_P+\mathbb Rv)<\delta$、$|z-a_\perp|<\delta$ です。第二tubeについても同様に $y$ は $b_P+\mathbb Rw$ から距離 $\delta$ 未満です。$P$ 内で二直線に対する単位法線を行に並べる行列の行列式の絶対値は $\sin\alpha$ です。[二帯交差の行列式計算](../GMT33/index.md#lem-gmt33-two-tubes)を、ここでは $P$ 内の座標に適用して

$$
\mathcal L^2\{y:\operatorname{dist}(y,a_P+\mathbb Rv)<\delta,\
\operatorname{dist}(y,b_P+\mathbb Rw)<\delta\}
=\frac{4\delta^2}{\sin\alpha}
$$

を得ます。各 $y$ の上の $z$ の集合は半径$\delta$の $(d-2)$ 次元球に含まれます。$d=2$ なら $P^\perp=\{0\}$ で、その断面の零次元体積を1とします。Fubiniの定理により

$$
|T_\delta(a,v)\cap T_\delta(b,w)|
\le\frac{4\delta^2}{\sin\alpha}\,
\omega_{d-2}\delta^{d-2}
=\frac{4\omega_{d-2}\delta^d}{\sin\alpha}.
$$

他方、[管体積の公式](../GMT32/index.md#prop-gmt32-tube-volume)から $|T_\delta(a,v)|=\omega_{d-1}\delta^{d-1}+\omega_d\delta^d$。$\delta<1$ であることと交差が一方の管に含まれることから第一項の上界も従います。$\square$
<!-- proof-end -->

## 3. 球面上の方向は調和級数より多い

平面では一つの方向から角度 $r$ 以内にある $\delta$-分離方向は、おおむね $r/\delta$ 個でした。$d$ 次元空間の球面では約 $(r/\delta)^{d-1}$ 個に増えます。以下で、球面帽内の単位方向 $v_i$ が $|v_i-v_j|\ge\delta$（$i\ne j$）を満たすとします。[GMT32の方向数の球殻評価](../GMT32/index.md#lem-gmt32-direction-count)と同じ体積比較を局所的に行います。

<a id="lem-gmt34-angular-shell"></a>

<!-- formal-statement-start -->
> **補題（高次元方向の逆角度和）**  
> $d\ge3$、$0<\delta<\delta_d$ とする。北極を中心とする球面帽 $\{v\in S^{d-1}:v\cdot e_d\ge3/4\}$ 内の $\delta$-分離方向集合 $V=\{v_1,\ldots,v_N\}$ について、固定した $i$ に対して

$$
\sum_{j\ne i}\frac1{\sin\alpha_{ij}}
\le C_d\delta^{-(d-1)},
\qquad
\alpha_{ij}=\arccos(v_i\cdot v_j)\in(0,\pi/2).
$$

> ここで $\alpha_{ij}$ は二方向の鋭角である。定数 $C_d$ は $N$ と配置に依存しない。
<!-- formal-statement-end -->

**例：$d=3$ での球面輪。** 固定方向から距離が $r$ 程度の方向は高々 $C(r/\delta)^2$ 個で、一組の交差評価に現れる $1/\sin\alpha$ は $C/r$ 程度です。したがって半径 $r$ の輪の寄与は高々 $Cr/\delta^2$。$r=\delta,2\delta,4\delta,\ldots,1$ と倍にする輪の和は最後の輪が支配して $C\delta^{-2}$ となり、平面の $C\delta^{-1}\log(1/\delta)$ とは違います。

### 証明の見取り図

球面上の短い距離 $r$ ごとに輪を作ります。$\delta$ だけ離れた方向の周囲には互いに交わらない小球を置けるため、輪に入る方向数を球殻体積で抑えます。各輪で「本数×角度逆数」を評価してから足します。

<!-- proof-start -->
### 証明

球面帽の二方向が張る角を $\alpha$ とすると、$|v-w|=2\sin(\alpha/2)$ です。帽の半径は $\arccos(3/4)$ なので二方向の角は $2\arccos(3/4)<\pi/2$。したがって $r=|v-w|$ に対し $\sin\alpha\ge c r$ となります。

$i$ を固定し、$r_k=2^k\delta$、$k\ge0$ の輪

$$
A_k=\{j\ne i:r_k\le|v_j-v_i|<2r_k\}
$$

を考えます。各 $v_j$ を中心とする半径 $\delta/3$ のEuclid球は互いに交わりません。輪の中心は半径 $2r_k$ の球内にあるため、これらの小球は $S^{d-1}$ の厚さ $\delta/3$ の近傍と $B(v_i,3r_k)$ の共通部分に入ります。その体積は $C_dr_k^{d-1}\delta$ 以下で、小球一つの体積は $c_d\delta^d$ です。よって

$$
\#A_k\le C_d(r_k/\delta)^{d-1}
=C_d2^{k(d-1)}.
$$

これは $r_k\ge\delta$ かつ $r_k$ が固定定数以下の範囲での球面局所座標による球殻体積比較です。最外側の $r_k\asymp1$ も定数を広げれば同じ評価です。角度と弦長の比較を代入すると

$$
\sum_{j\ne i}\frac1{\sin\alpha_{ij}}
\le C_d\sum_{0\le k\le K}\frac{\#A_k}{2^k\delta}
\le C_d\delta^{-1}\sum_{k=0}^K2^{k(d-2)}.
$$

最大の $K$ は $2^K\delta\le2$ を満たすので $2^K\le2/\delta$。$d\ge3$ では比 $2^{d-2}>1$ の有限等比級数であり、

$$
\sum_{k=0}^K2^{k(d-2)}
=\frac{2^{(K+1)(d-2)}-1}{2^{d-2}-1}
\le C_d\delta^{-(d-2)}.
$$

従って求める上界は $C_d\delta^{-(d-1)}$ です。$\square$
<!-- proof-end -->

**二乗積分では何が失われるか。** 帽内で $N\asymp_d\delta^{-(d-1)}$ 本のtubeを選び、その位置は任意とします。[重複度の二乗積分公式](../GMT32/index.md#prop-gmt32-tube-volume)、[交差補題](#lem-gmt34-two-tubes)、[方向和補題](#lem-gmt34-angular-shell)から、$d\ge3$ に対して

$$
\begin{aligned}
\int m(x)^2\,dx
&=\sum_i|T_i|+\sum_{i\ne j}|T_i\cap T_j|\\
&\le C_dN\delta^{d-1}
+C_dN\delta^d\delta^{-(d-1)}\\
&\le C_d(1+\delta^{-(d-2)})
\le C_d'\delta^{-(d-2)}.
\end{aligned}
$$

一方、$\int m=N(\omega_{d-1}\delta^{d-1}+\omega_d\delta^d)\ge c_d$ です。Cauchy--Schwarzから

$$
|U_\delta|\ge\frac{(\int m)^2}{\int m^2}
\ge c_d\delta^{d-2}.
$$

[近傍体積とMinkowski次元の関係](../GMT32/index.md#lem-gmt32-neighborhood-cover)では、これは高次元でも次元下界 $2$ を与えるにとどまります。方向の輪が多いため、平面の対数損失をそのまま移すことはできません。

## 4. 一点に集まる管を、離れた位置で見直す

二管の交差をすべて足す代わりに、合併体積が小さいと仮定しましょう。管体積の総和はほぼ1なので、積分の平均から**ある一点を通る管が非常に多い**ことが分かります。その点の近くでは管が混み合っていても、一定距離だけ進めば方向差によって横に広がります。

そこで、ある点 $x$ を通るtubeの集まりを「bush（茂み）」として扱います。実際の管は $x$ を正確に軸上に含む必要はなく、厚さ$\delta$以内を通れば十分です。

<a id="def-gmt34-bush"></a>

<!-- formal-statement-start -->
> **定義（tubeのbush）**  
> $d\ge2$、$0<\delta<1$ とする。$x\in\mathbb R^d$ と有限個の長さ1・半径$\delta$のtube $T_1,\ldots,T_N$ に対し、

$$
\mathcal B(x)=\{T_i:x\in T_i\},
\qquad L(x)=\#\mathcal B(x)
$$

> をそれぞれ $x$ におけるbushとその本数という。したがって $L(x)=m(x)$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt34-bush -->
### 直接確認：交差する二本と離れた一本

$\mathbb R^3$ で原点中心の水平tube $T_1$ と鉛直tube $T_2$ を取り、第三のtube $T_3$ は原点から距離2以上離して置きます。$0<\delta<1/8$ とすると $0\in T_1\cap T_2$、$0\notin T_3$ なので $\mathcal B(0)=\{T_1,T_2\}$、$L(0)=m(0)=2$ です。原点から距離が1以上の点をとり、三管のどれにも入らなければ $\mathcal B(x)=\varnothing$、$L(x)=0$ です。

**定義の確認**：点が各tubeの距離$\delta$未満の領域に入るかを確認した上で集合を列挙し、指示関数の和と本数の一致も計算しました。
<!-- definition-example-end -->

次の補題は、**bushの根元では重なっても、離れた小円柱片は一度に高々定数本しか重ならない**ことを保証します。方向は球面帽内で弦長$\delta$以上離れているものとします。

<a id="lem-gmt34-bush-packing"></a>

<!-- formal-statement-start -->
> **補題（bushの外側での体積下界）**  
> $d\ge2$ とする。球面帽 $\{v:v\cdot e_d\ge3/4\}$ 内で $|v_i-v_j|\ge\delta$ の単位方向を持つ長さ1・半径$\delta$のtube $T_i$ を有限個選ぶ。$\delta>0$ が十分小さく、ある $x\in\mathbb R^d$ がそのうち $L\ge1$ 本に含まれるとする。このとき、その $L$ 本の合併体積は

$$
\left|\bigcup_{T_i\in\mathcal B(x)}T_i\right|
\ge c_d L\delta^{d-1}.
$$

> 定数 $c_d>0$ は位置、方向の配置、本数、$\delta$ に依存しない。
<!-- formal-statement-end -->

**直接例：三次元で根元から離れる。** 原点を通り北極の近くを向く二本のtubeの軸は原点で交差します。原点から距離 $1/4$ の切片では中心間距離は $2(1/4)\sin(\alpha/2)$、角 $\alpha$ が $\delta$ 程度なら横幅も $\delta$ 程度です。方向が $\delta$ ずつ離れていれば、そこに半径 $C\delta$ の小さな角帽へ入る本数は一定個以下です。**この「離れた場所で有限重複」が、平面の二管交差の総和と違う計数原理です。**

### 証明の見取り図

各tubeについて $x$ に最も近い線分上の点 $p_i$ を取り、線分の長い方の端へ $1/8$ から $1/4$ だけ進んだ細い円柱片 $B_i$ を切り出します。その体積は $c_d\delta^{d-1}$。一つの点 $y$ が $B_i$ に入るなら $(y-x)/|y-x|$ は方向 $\pm v_i$ から $C\delta$ 以内です。方向の分離性より、一つの点へ重なる片は高々 $C_d$ 個です。

<!-- proof-start -->
### 証明

$x\in T_i$ なら、線分 $L_i=\{a_i+tv_i:0\le t\le1\}$ 上に最近点 $p_i=a_i+t_iv_i$ が存在し、$|p_i-x|<\delta$ です。$t_i\le1/2$ なら $\sigma_i=+1$、$t_i>1/2$ なら $\sigma_i=-1$ とします。いずれの場合も $p_i+\sigma_i s v_i$ は $1/8\le s\le1/4$ で線分上にあります。

次の小円柱片を作ります。

$$
B_i=\{p_i+\sigma_i s v_i+z:
1/8<s<1/4,\ z\cdot v_i=0,\ |z|<\delta/8\}.
$$

$B_i$ は $T_i$ に含まれ、その体積は

$$
|B_i|=\frac18\omega_{d-1}\left(\frac\delta8\right)^{d-1}
=c_d'\delta^{d-1}.
$$

$y\in B_i$ なら $y-x=\sigma_i s v_i+(p_i-x)+z$ ですから

$$
|(y-x)-\sigma_i s v_i|
\le|p_i-x|+|z|<\frac98\delta.
$$

$\delta$ を例えば $1/1000$ 以下とすれば $|y-x|\ge1/8-9\delta/8>1/10$。単位ベクトルに正規化する差を三角不等式で見積もると

$$
\left|\frac{y-x}{|y-x|}-\sigma_i v_i\right|
\le\frac{2\cdot(9\delta/8)}{|y-x|}
\le C\delta.
$$

したがって、もし $y$ が複数の $B_i$ に属するなら、それらの符号付き方向 $\sigma_i v_i$ は一つの球面上の角帽（半径 $C\delta$）に入ります。正の符号の方向は $e_d$ との内積が $3/4$ 以上、負の符号の方向は $-3/4$ 以下なので、十分小さい$\delta$では同じ小角帽に正負が混在しません。同じ符号の方向は $\delta$-分離です。半径 $\delta/3$ のEuclid球を各方向へ置くと互いに交わらず、それらは半径 $(C+1)\delta$ の球に含まれます。体積を比較すれば、一つの $y$ に対応する $i$ は高々 $C_d$ 個です。

従って、各 $y$ について $\sum_{T_i\in\mathcal B(x)}\mathbf1_{B_i}(y)\le C_d$。これを積分すると

$$
L c_d'\delta^{d-1}
=\sum_{T_i\in\mathcal B(x)}|B_i|
\le C_d\left|\bigcup_{T_i\in\mathcal B(x)}B_i\right|
\le C_d\left|\bigcup_{T_i\in\mathcal B(x)}T_i\right|.
$$

定数を $c_d=c_d'/C_d$ と選べば結論です。$\square$
<!-- proof-end -->

## 5. bush法の古典的下界

方向の確保には[GMT32の分離方向数補題](../GMT32/index.md#lem-gmt32-direction-count)を使います。固定した北極帽内に $\delta$-分離方向を $N\ge c_d\delta^{-(d-1)}$ 個取れます。上からも $N\le C_d\delta^{-(d-1)}$ とできるよう、最大分離集合を選びます。例えば $d=3$ で帽内の二座標に間隔 $C\delta$ の格子を取り、各格子点を $v=(u_1,u_2,\sqrt{1-u_1^2-u_2^2})$ に持ち上げれば、$N\asymp\delta^{-2}$ が具体的に実現します。

<a id="thm-gmt34-bush"></a>

<!-- formal-statement-start -->
> **定理（bush法による高次元tube合併体積下界）**  
> $d\ge2$ とし、$0<\delta<\delta_d$ とする。球面帽 $\{v:v\cdot e_d\ge3/4\}$ 内に、$N$ 個の$\delta$-分離方向を選び、各方向に長さ1・半径$\delta$のtubeを一本ずつ**位置は任意に**配置する。ただし

$$
c_d\delta^{-(d-1)}\le N\le C_d\delta^{-(d-1)}
$$

> を満たすとする。このとき合併 $U_\delta$ は

$$
|U_\delta|\ge c_d'\delta^{(d-1)/2}.
$$

> 右辺の定数はtubeの位置には依存しない。
<!-- formal-statement-end -->

### 証明の見取り図

$V=|U_\delta|$ とおきます。管体積の和は一定以上なので、平均から $m(x)\ge c_d/V$ となる点 $x$ が存在します。この $m(x)$ 本に[外側での体積下界](#lem-gmt34-bush-packing)を適用すれば $V\ge c_d\delta^{d-1}m(x)$。二式を合わせて $V^2\ge c_d\delta^{d-1}$ です。

<!-- proof-start -->
### 証明

各tubeは開で有限体積なので、合併体積 $V=|U_\delta|$ は正かつ有限です。[管体積の公式](../GMT32/index.md#prop-gmt32-tube-volume)と $N\ge c_d\delta^{-(d-1)}$ より

$$
\int_{\mathbb R^d}m(x)\,dx
=N(\omega_{d-1}\delta^{d-1}+\omega_d\delta^d)
\ge c_d\omega_{d-1}=:a_d>0.
$$

$m=0$ は $U_\delta$ の外で成立します。もしすべての $x\in U_\delta$ で $m(x)<a_d/V$ なら $\int m<a_d$ となり矛盾するので、ある $x\in U_\delta$ で

$$
L=m(x)\ge \frac{a_d}{V}
$$

です。この $x$ を含む $L$ 本はまさしく[定義したbush](#def-gmt34-bush)であり、球面帽内の方向分離を引き継ぎます。[bushの体積補題](#lem-gmt34-bush-packing)を適用すると

$$
V\ge\left|\bigcup_{T_i\in\mathcal B(x)}T_i\right|
\ge b_dL\delta^{d-1}
\ge\frac{a_db_d}{V}\delta^{d-1}.
$$

$V>0$ を掛けて平方根を取ると

$$
V^2\ge a_db_d\delta^{d-1},
\qquad V\ge\sqrt{a_db_d}\,\delta^{(d-1)/2}.
$$

ここには二管交差の総和を抑える仮定も、tubeが同じ点を軸として通るという仮定もありません。$\square$
<!-- proof-end -->

**指数の確認。** $d=3$ なら $|U_\delta|\gtrsim\delta^1$、$d=4$ なら $\gtrsim\delta^{3/2}$。二乗積分だけの $\delta^{d-2}$ に比べ、$d\ge4$ で改善しています。$d=2$ の $\delta^{1/2}$ は[前講の対数下界](../GMT33/index.md#thm-gmt33-cordoba)より弱いので、bush法を平面の最良の計算と取り違えないでください。

## 6. Besicovitch集合のMinkowski次元

高次元でも、すべての無向方向に長さ1の線分を含む有界集合を考えます。いま証明したのは有限本のtubeについての**配置に依らない**下界なので、線分を選んだ場所がばらばらでも使えます。

<a id="cor-gmt34-kakeya-minkowski"></a>

<!-- formal-statement-start -->
> **系（古典的bush下界）**  
> $d\ge2$ とし、有界集合 $K\subset\mathbb R^d$ がすべての無向方向に長さ1の線分を含むとする。このとき

$$
\underline{\dim}_{\mathrm M}K
\ge\frac{d+1}{2},
\qquad
\overline{\dim}_{\mathrm M}K
\ge\frac{d+1}{2}.
$$

> この主張だけではHausdorff次元について同じ下界を証明したことにはならない。
<!-- formal-statement-end -->

### 証明の見取り図

各尺度で北極帽内の $\delta$-分離方向を取り、$K$ に含まれる線分を一本ずつ選びます。管の合併は $K_\delta$ に含まれるため、近傍体積に定理の下界が移ります。その対数を $\log\delta<0$ で割る際は不等号の向きに注意します。

<!-- proof-start -->
### 証明

$\delta$ が十分小さいとき、北極帽から $N\asymp_d\delta^{-(d-1)}$ 個の $\delta$-分離方向 $v_j$ を選びます。仮定より各方向に $K$ の長さ1線分 $L_j$ が存在し、$T_j=(L_j)_\delta\subset K_\delta$ です。従って[合併体積定理](#thm-gmt34-bush)から

$$
|K_\delta|\ge\left|\bigcup_jT_j\right|
\ge c_d\delta^{(d-1)/2}.
$$

$K$ は有界なので $K_\delta$ も共通の有界球に入り、$|K_\delta|\le C_K$ です。両辺の対数を取れば

$$
\log c_d+\frac{d-1}{2}\log\delta
\le\log|K_\delta|\le\log C_K.
$$

$\log\delta<0$ で割ると

$$
\frac{\log C_K}{\log\delta}
\le\frac{\log|K_\delta|}{\log\delta}
\le\frac{d-1}{2}+\frac{\log c_d}{\log\delta}.
$$

従ってこの比の $\limsup$ と $\liminf$ はともに $(d-1)/2$ 以下です。[近傍体積による上下Minkowski次元の公式](../GMT32/index.md#lem-gmt32-neighborhood-cover)に代入すると、上・下とも $d-(d-1)/2=(d+1)/2$ 以上です。$\square$
<!-- proof-end -->

**含意の範囲。** ここでの下界はMinkowski次元です。[Hausdorff次元とMinkowski次元の比較](../GMT32/index.md#thm-gmt32-dimension-comparison)は、Hausdorff次元の**上から**Minkowski次元を抑える向きです。従ってこの結果からHausdorff次元の同じ下界を演繹してはいけません。実際、稠密可算集合は箱次元が高くてもHausdorff次元は0になれます。

## 7. 一本を柄とするhairbrush：次の難しさ

bushは「一点 $x$ の近くを通る管」で構成しました。今度は一本の中心管 $T_0$ を固定し、それと交わる管を大量に集めた状態を考えます。これを**hairbrush（刷毛）配置**と呼びます。中心管が「柄」、交わる他の管が「毛」の役割を果たします。交点が柄のあちこちに散るため、bushのように一つの $x$ を共有しないことが重要です。

<a id="def-gmt34-hairbrush"></a>

<!-- formal-statement-start -->
> **定義（一本のtubeに付随するhairbrush）**  
> $d\ge2$、$0<\delta<1$ とし、長さ1・半径$\delta$のtube $T_0,T_1,\ldots,T_M\subset\mathbb R^d$ を取る。$T_0$ に付随するhairbrushを

$$
\mathcal H(T_0)=\{T_i:1\le i\le M,\ T_i\cap T_0\ne\varnothing\}
$$

> とする。定義上、$\mathcal H(T_0)$ の各管は同じ点を通る必要はない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt34-hairbrush -->
### 直接確認：柄の異なる位置で交わる二本

$\mathbb R^3$ で柄 $T_0$ を $x_1$ 軸上の単位線分を中心とするtubeとし、$T_1$ を $x_2$ 軸に平行な線分で柄の $x_1=-1/4$ 付近を通るもの、$T_2$ を $x_3$ 軸に平行な線分で柄の $x_1=1/4$ 付近を通るものとします。$0<\delta<1/16$ では $T_1\cap T_0$ と $T_2\cap T_0$ はともに空でありません。一方、$T_1$ の中心線と $T_2$ の中心線の $x_1$ 座標は $1/2$ 異なるので $T_1\cap T_2=\varnothing$ です。

**定義の確認**：$\mathcal H(T_0)=\{T_1,T_2\}$ であり、各毛が柄に交わるという条件を個別に検査しました。同時に毛同士が共通の根元を必要としないことも確かめました。
<!-- definition-example-end -->

**二種類の集中は違う。** bushでは全ての毛が同じ点の近傍を通るので、そこから固定距離離れた切片で重なりを抑えられました。hairbrushでは毛の根元が柄に沿って動きます。各毛の切片を同じ中心の球面へ投影できず、bush補題を直接使うことはできません。Wolff型のhairbrush法では、この「柄上の位置」と「毛の方向」の双方を制御して、より強い下界を目指します。この講義で完全に導いた指数は上の $(d+1)/2$ であり、hairbrushという名前だけを根拠により強い結論を付け足すことはしません。

## 8. 演習：配置を数え直して指数を出す

各問で $0<\delta<1/1000$、$d\ge2$ とし、tubeは[GMT32の定義](../GMT32/index.md#def-gmt32-tube)の長さ1・半径$\delta$です。別途指定がなければ $|E|$ はLebesgue体積、$m$ は重複度関数です。

### Level A：一つずつ確かめる

<a id="ex-gmt34-a01"></a>

**A01　三次元の直交二管**

- Level: A
- 問題: $\mathbb R^3$ の原点を中心とし、$x_1$ 軸と $x_2$ 軸を方向とする二本のtubeの交差体積を断面積分で求めよ。[交差補題](#lem-gmt34-two-tubes)の上界とも比較せよ。

<!-- solution-start -->
#### 詳細解答

両管に同時に入る点の条件は $x_2^2+x_3^2<\delta^2$ と $x_1^2+x_3^2<\delta^2$ です。これらから $|x_1|,|x_2|<\delta$ なので $\delta<1/2$ の下で線分端部を考える必要はありません。$x_3=t$ を固定すると

$$
-\sqrt{\delta^2-t^2}<x_1,x_2<\sqrt{\delta^2-t^2},
$$

よって断面積 $4(\delta^2-t^2)$ を $-\delta$ から $\delta$ まで積分します。

$$
\int_{-\delta}^{\delta}4(\delta^2-t^2)\,dt
=4\left(2\delta^3-\frac23\delta^3\right)
=\frac{16}{3}\delta^3.
$$

一方 $\omega_1=2,\sin(\pi/2)=1$ なので補題は $8\delta^3$。$16/3<8$ で矛盾しません。
<!-- solution-end -->

<a id="ex-gmt34-a02"></a>

**A02　球面の輪で何本数えられるか**

- Level: A
- 問題: $\mathbb R^4$ で $\delta$-分離方向を固定方向から距離 $r=2^k\delta$ 以上 $2r$ 未満の輪に配置する。輪の本数上界と、交差評価に現れる角度逆数の和の寄与を求めよ。$r\le1$ とする。

<!-- solution-start -->
#### 詳細解答

球面の次元は $d-1=3$。中心間距離$\delta$の分離により、[方向数の体積比較](#lem-gmt34-angular-shell)から本数は

$$
\#A_k\le C_4(r/\delta)^3=C_4\,2^{3k}.
$$

この輪では $\sin\alpha\ge c_4r$ なので、一本あたり $\sin\alpha$ の逆数は高々 $C_4/r$。合計は

$$
\sum_{j\in A_k}\frac1{\sin\alpha_{ij}}
\le C_4\,2^{3k}\frac1{2^k\delta}
=C_4\delta^{-1}2^{2k}.
$$

$r$ の小さい輪が主役になるのではなく、$k$ の大きい輪が支配します。
<!-- solution-end -->

<a id="ex-gmt34-a03"></a>

**A03　bushの定義と重複度**

- Level: A
- 問題: 点 $x$ が五本のtubeのうち $T_1,T_3,T_4$ にだけ属するとする。$\mathcal B(x)$、$L(x)$、$m(x)$ を求め、$\sum_i\mathbf1_{T_i}(x)$ と照合せよ。

<!-- solution-start -->
#### 詳細解答

[定義](#def-gmt34-bush)により $\mathcal B(x)=\{T_1,T_3,T_4\}$、従って $L(x)=3$ です。指示関数は順に $(1,0,1,1,0)$ なので

$$
m(x)=\sum_{i=1}^5\mathbf1_{T_i}(x)=1+0+1+1+0=3=L(x).
$$

管が何本あるかではなく、実際に点 $x$ を覆う管を数えています。
<!-- solution-end -->

<a id="ex-gmt34-a04"></a>

**A04　円柱片の体積**

- Level: A
- 問題: $\mathbb R^3$ で長さ $1/8$、半径 $\delta/8$ の円柱片 $B$ の体積を計算せよ。$B$ が長さ1のtubeに収まる条件を説明せよ。

<!-- solution-start -->
#### 詳細解答

直交断面は二次元円板なので体積は

$$
|B|=\frac18\omega_2(\delta/8)^2
=\frac18\pi\frac{\delta^2}{64}
=\frac{\pi}{512}\delta^2.
$$

中心軸の区間が元の単位線分内にあり、断面半径 $\delta/8<\delta$ なら各点の線分への距離は $\delta/8$ 未満で、$B\subset T_\delta$ です。これは[bushの体積補題](#lem-gmt34-bush-packing)で使う包含そのものです。
<!-- solution-end -->

<a id="ex-gmt34-a05"></a>

**A05　指数の比較**

- Level: A
- 問題: $d=3,4,5$ について二乗積分の下界 $|U|\gtrsim\delta^{d-2}$ とbush法の下界 $|U|\gtrsim\delta^{(d-1)/2}$ の指数をそれぞれ求め、$\delta\downarrow0$ でどちらが強いかを比較せよ。

<!-- solution-start -->
#### 詳細解答

$d=3$ では $(d-2,(d-1)/2)=(1,1)$ で一致、$d=4$ では $(2,3/2)$、$d=5$ では $(3,2)$ です。$0<\delta<1$ なら指数が小さい方の $\delta$ の冪が大きい下界になります。従って $d=4,5$ でbush法が強く、$d=3$ では指数上同じです。
<!-- solution-end -->

### Level B：幾何と計数を証明する

<a id="ex-gmt34-b01"></a>

**B01　二乗積分の限界を再計算する**

- Level: B
- 問題: $d=4$ で球面帽の $\delta$-分離方向 $N\asymp\delta^{-3}$ 個に一本ずつtubeを置く。[二tubeの交差](#lem-gmt34-two-tubes)と[方向和](#lem-gmt34-angular-shell)を使い $\int m^2\lesssim\delta^{-2}$ と $|U|\gtrsim\delta^2$ を順に示せ。

<!-- solution-start -->
#### 詳細解答

管体積は [公式](../GMT32/index.md#prop-gmt32-tube-volume)より $A=\omega_3\delta^3+\omega_4\delta^4\asymp\delta^3$。したがって対角項は $NA\lesssim\delta^{-3}\delta^3=1$ です。非対角項は

$$
\sum_{i\ne j}|T_i\cap T_j|
\le C\delta^4\sum_i\sum_{j\ne i}\frac1{\sin\alpha_{ij}}
\le C\delta^4 N\delta^{-3}
\le C\delta^{-2}.
$$

よって $\int m^2\le C(1+\delta^{-2})\le C'\delta^{-2}$ です。一方 $\int m=NA\gtrsim1$。[合併体積のCauchy--Schwarz下界](../GMT32/index.md#prop-gmt32-tube-volume)を代入すると $|U|\ge(\int m)^2/\int m^2\ge c\delta^2$。この計算だけでは四次元の次元下界は $4-2=2$ です。
<!-- solution-end -->

<a id="ex-gmt34-b02"></a>

**B02　外側で有限重複になる理由**

- Level: B
- 問題: $\delta$-分離した方向 $v_1,\ldots,v_L$ に対し、各方向の符号 $\sigma_i\in\{-1,1\}$ を取り、$\sigma_i v_i$ が正負の離れた二つの球面帽にあるとする。$y$ がそのうち複数の円柱片 $B_i$ に属し、$|(y-x)/|y-x|-\sigma_i v_i|\le C\delta$ なら、その本数が $\delta$ に依らず有界であることを球の体積比較で示せ。

<!-- solution-start -->
#### 詳細解答

$u=(y-x)/|y-x|$ とおくと、該当する符号付き方向はすべて $B(u,C\delta)$ に入ります。正負の球面帽は正の定数だけ離れているため、十分小さい$\delta$では同時に入れません。同じ符号で符号を戻しても中心間距離は$\delta$以上です。中心 $\sigma_i v_i$ の半径 $\delta/3$ のEuclid球は互いに交わらず、全部 $B(u,(C+1)\delta)$ に含まれます。$d$ 次元の球体積から

$$
L_y\,\omega_d(\delta/3)^d
\le\omega_d((C+1)\delta)^d,
\qquad L_y\le[3(C+1)]^d.
$$

これが[bushの体積補題](#lem-gmt34-bush-packing)の重複度を一定にする部分です。
<!-- solution-end -->

<a id="ex-gmt34-b03"></a>

**B03　hairbrushとbushは一致しない**

- Level: B
- 問題: $\mathbb R^3$ の $x_1$ 軸に沿うtube $T_0$ と、$x_2$ 方向に向かうtube $T_1,T_2$ を考える。$T_1$ は柄の $x_1=-1/4$、$T_2$ は柄の $x_1=1/4$ で交わり、各中心線上のそれらの点を中点とする。$0<\delta<1/16$ とするとき、$\mathcal H(T_0)$ と $T_1\cap T_2$ を求めよ。なぜ一本のbushにまとまらないか説明せよ。

<!-- solution-start -->
#### 詳細解答

$T_1,T_2$ はそれぞれ柄の中心線上の異なる点を通るので、[hairbrushの定義](#def-gmt34-hairbrush)から $\mathcal H(T_0)=\{T_1,T_2\}$ です。二つの毛の軸は $x_1$ 座標が $1/2$ 異なる平行直線です。軸間距離は $1/2>2\delta$ なので、半径$\delta$のtubeは交わらず $T_1\cap T_2=\varnothing$。従って両方を含む $\mathcal B(x)$ はどの $x$ にも存在せず、一点での[bushの定義](#def-gmt34-bush)によるまとめ方はできません。
<!-- solution-end -->

<a id="ex-gmt34-b04"></a>

**B04　線分の途中から外側の円柱片を作る**

- Level: B
- 問題: 単位線分 $L=\{a+tv:0\le t\le1\}$、$x$ と最近点 $p=a+t_0v$ が $|x-p|<\delta$ を満たすとする。$t_0\in[0,1]$ のどこにあっても、$p$ から一方向へ $1/4$ 進む部分線分が $L$ に入ることを示せ。さらに半径$\delta/8$の円柱片の全点が $T_\delta(a,v)$ に入ることを証明せよ。

<!-- solution-start -->
#### 詳細解答

$t_0\le1/2$ なら $1-t_0\ge1/2$ であり、$t_0+s\le1/2+1/4=3/4<1$。したがって $p+sv$ は $1/8\le s\le1/4$ で線分内です。$t_0>1/2$ なら $t_0\ge1/2$ で、$t_0-s\ge1/2-1/4=1/4>0$。従って $p-sv$ が線分内です。選んだ中心点を $q$ とすると、$z\cdot v=0$, $|z|<\delta/8$ の各点 $q+z$ は $\operatorname{dist}(q+z,L)\le|z|<\delta/8<\delta$。よって円柱片はtubeに入ります。$x$ が軸の中心にあるという仮定は不要です。
<!-- solution-end -->

### Level C：主要定理を最初から導く

<a id="ex-gmt34-c01"></a>

**C01　任意位置の高次元tubeから次元下界へ**

- Level: C
- 問題: $d\ge3$、$0<\delta<\delta_d$ とし、固定球面帽内の$\delta$-分離方向を $N\asymp_d\delta^{-(d-1)}$ 個選んで、任意位置に長さ1・半径$\delta$のtube $T_i$ を置く。$U=\bigcup_iT_i$、$V=|U|$、$m=\sum_i\mathbf1_{T_i}$ とする。(1) $\int m\gtrsim_d1$ から $m(x)\gtrsim_d1/V$ の点が存在することを示せ。(2) 各該当tubeの線分上で $x$ に近い点から長い方の端へ円柱片を作り、$V\gtrsim_d\delta^{d-1}m(x)$ を示せ。(3) $V$ の下界を導き、これを有界な全方向線分集合 $K$ の上下Minkowski次元に適用せよ。(4) 同じ結論をHausdorff次元についても導いたと言えるか。

<!-- solution-start -->
#### 詳細解答

**(1) 一次積分と平均。** [管体積の公式](../GMT32/index.md#prop-gmt32-tube-volume)より

$$
\int m=\sum_i|T_i|
=N(\omega_{d-1}\delta^{d-1}+\omega_d\delta^d)
\ge a_d>0.
$$

$U$ の外では $m=0$。もし $U$ 内の全点で $m<a_d/V$ なら積分は $a_d$ より小さく矛盾します。よってある $x$ に対し $L=m(x)\ge a_d/V$ です。

**(2) 外側の円柱片。** $x$ を含む各tubeの線分最近点を $p_i=a_i+t_iv_i$ とし、$t_i\le1/2$ なら正、そうでなければ負の方向へ $1/8<s<1/4$ 進めます。各点の周囲に断面半径$\delta/8$を持つ $B_i\subset T_i$ を取ると

$$
|B_i|=\frac{\omega_{d-1}}{8^d}\delta^{d-1}.
$$

$y\in B_i$ なら $y-x$ は $\sigma_i s v_i$ から高々 $9\delta/8$ ずれるので、$|y-x|>1/10$ を用いてその単位方向は $\sigma_i v_i$ から $C\delta$ 以内です。方向分離と正負の帽の分離により各 $y$ に重なる $B_i$ は高々 $C_d$ 個。従って

$$
V\ge|\bigcup B_i|
\ge C_d^{-1}\sum_i|B_i|
=b_dL\delta^{d-1}
=b_d m(x)\delta^{d-1}.
$$

ここで使ったのは[外側の体積補題](#lem-gmt34-bush-packing)と同じ方向の球詰めです。

**(3) 指数。** (1)、(2) を合わせると

$$
V\ge b_d\delta^{d-1}\frac{a_d}{V},
\qquad
V^2\ge a_db_d\delta^{d-1},
\qquad
V\ge\sqrt{a_db_d}\,\delta^{(d-1)/2}.
$$

有界な全方向線分集合 $K$ について、各尺度で同じ方向を選び直してtubeを $K_\delta$ に含めれば $|K_\delta|\ge c_d\delta^{(d-1)/2}$ です。両辺の対数を取り $\log\delta<0$ で割ると $\limsup_{\delta\downarrow0}\log|K_\delta|/\log\delta\le(d-1)/2$。また $\liminf$ も同じ上界です。[近傍体積と次元の公式](../GMT32/index.md#lem-gmt32-neighborhood-cover)によって上下Minkowski次元はいずれも $(d+1)/2$ 以上です。

**(4) 論理の射程。** [比較定理](../GMT32/index.md#thm-gmt32-dimension-comparison)が与えるのは $\dim_{\mathrm H}K\le\underline{\dim}_{\mathrm M}K$ の向きであり、Minkowski次元の下界からHausdorff次元の下界は従いません。
<!-- solution-end -->

## 9. 次講へ：管の集合から最大作用素へ

高次元では管の対ごとの交差をいくら足しても、集中の仕方を十分に制御できませんでした。bush法は一点での集中を捉え、$\delta$ に依らない有限重複を取り戻しました。一方、hairbrushでは「柄のどこで交わるか」という追加の自由度が残ります。

次講GMT35では、tubeごとの平均値を方向の関数として束ねるKakeya最大作用素を定義し、**作用素の不等式からtube合併体積や集合の次元下界へ進む向き**を、指数と損失を明示して扱います。
