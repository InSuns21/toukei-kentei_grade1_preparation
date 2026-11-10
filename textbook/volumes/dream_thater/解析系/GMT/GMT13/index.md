# GMT13 整流可能集合上のarea formula

<!-- definition-example-audit: strict -->

[GMT11のarea formula](../GMT11/index.md#thm-gmt11-area-formula)は、$\mathbb R^m$ から出発した Lipschitz 写像の面積を重複度と結びました。[GMT12の可算整流可能集合](../GMT12/index.md#def-gmt12-countably-rectifiable)では、最初から空間内に置かれた曲線や曲面を、可算枚のパラメータ片で覆えるようにしました。しかし曲面上の関数を積分するたび、どのパラメータを選ぶかで公式が変わっては困ります。

本講義の問いは「**集合自体の接方向に沿って測った倍率**だけで、面積と重複度を結べるか」です。滑らかなグラフでは接方向を微分で得られます。一般の可算整流可能集合でも、ほとんど至る所で同じ構成を行い、別々の表示が重なっても結果が一致することを証明します。

以下、$1\le m\le d$、$E\subset\mathbb R^d$ は $\mathcal H^m$-可測な可算 $m$-整流可能集合とします。$\mathcal H^m$ は [MT8の直径による非正規化 Hausdorff 測度](../../MT/MT8/index.md#def-mt8-hausdorff-measure)、$\mathcal L^m$ は $m$ 次元 Lebesgue 測度です。[GMT10の比例定数](../GMT10/index.md#lem-gmt10-hausdorff-normalization)を

$$
c_m=\mathcal H^m([0,1]^m),\qquad
\mathcal H^m\big|_{\mathbb R^m}=c_m\mathcal L^m
$$

と書きます。$m=1$ では $c_1=1$ ですが、一般の $m$ では $c_m$ を勝手に $1$ としません。「$E$ 上のほとんど至る所（almost everywhere; a.e.）」は **$\mathcal H^m$ に関して**という意味です。

## 1. 曲面を一枚ずつ、重ならない部分へ切る

直線と放物線が交わる点では接方向が二つあります。しかし一点は $\mathcal H^1$-零です。面積公式に必要なのはすべての点の一意性ではなく、測度零の例外を除いた一意性です。

ここで **双Lipschitz片**とは、$A\subset\mathbb R^m$ 上の Lipschitz 写像 $\phi:A\to\mathbb R^d$ が一対一であり、その逆写像 $\phi^{-1}:\phi(A)\to A$ も Lipschitz である部分をいいます。パラメータの二点間距離が像で潰れないため、接方向を読み取るのに便利です。

<a id="lem-gmt13-bilipschitz-pieces"></a>

<!-- formal-statement-start -->
> **補題（可算双Lipschitz片への分割）**
> $E\subset\mathbb R^d$ が $\mathcal H^m$-可測かつ可算 $m$-整流可能ならば、互いに素な Borel 集合 $E_i\subset\mathbb R^d$ と、Borel 集合 $A_i\subset\mathbb R^m$ への双Lipschitzな写像 $\phi_i:A_i\to E_i$ が可算個存在し、
$$
\mathcal H^m\left(E\setminus\bigcup_iE_i\right)=0
$$
> となる。$E$ 自体が Borel でない場合も、$E$ を零集合を除いた Borel 代表へ置き換えて同じ結論を得る。各 $\phi_i$ は $\mathbb R^m$ 上の Lipschitz 写像の制限として取れる。
<!-- formal-statement-end -->

### 証明の見取り図

可算整流可能性で与えられた写像を、微分が full-rank の部分と rank 欠損部分に分けます。後者の像は零測度です。前者は [GMT11のarea formula の証明](../GMT11/index.md#thm-gmt11-area-formula)に登場した二点差分評価で、可算枚の双Lipschitz片に分割できます。最後に像の重複を順に取り除きます。

<!-- proof-start -->
### 証明

[可算整流可能性](../GMT12/index.md#def-gmt12-countably-rectifiable)から Lipschitz 写像 $h_j:\mathbb R^m\to\mathbb R^d$ があり、$E$ の $\mathcal H^m$-ほとんどすべての点が $\bigcup_jh_j(\mathbb R^m)$ に入ります。

$h_j$ は [Rademacherの定理](../GMT9/index.md#thm-gmt9-rademacher)で $\mathcal L^m$-a.e.微分可能です。その微分の rank が $m$ 未満の部分の像は [rank欠損集合の像の補題](../GMT11/index.md#lem-gmt11-critical-image)により $\mathcal H^m$-零、微分不能集合の像も [零集合保存](../GMT11/index.md#lem-gmt11-lipschitz-null-image)で零です。

full-rank な点 $a$ では最小特異値 $s(Dh_j(a))>0$ です。整数 $q$ により $s(Dh_j(a))\ge1/q$ を固定し、微分行列を固定の $A$ へ $\varepsilon$-近似できる部分と、微分誤差が $\varepsilon|b-a|$ 以下になる半径を固定します。同じ小立方体内の二点 $u,v$ について、[GMT11の可算分割の議論](../GMT11/index.md#thm-gmt11-area-formula)に従い

$$
|h_j(v)-h_j(u)-A(v-u)|\le2\varepsilon|v-u|
$$

とできます。$s(A)\ge1/(2q)$ と $4q\varepsilon<1/2$ から

$$
\frac{1}{4q}|v-u|\le |h_j(v)-h_j(u)|\le L_j|v-u|
$$

です。したがってその部分では $h_j$ も逆写像も Lipschitz です。全 $j,q,A,\varepsilon$ と小立方体を可算に選べば、full-rank 点を被覆できます。

各部分を Lebesgue 零集合を除いて可算枚のコンパクト集合へ縮めます。この操作とその像で失うのは、上記の[零集合保存](../GMT11/index.md#lem-gmt11-lipschitz-null-image)により $\mathcal H^m$-零集合だけです。コンパクト像は Borel であり、順に先行する像を差し引くと互いに素な Borel 像片ができます。対応するパラメータ集合も Borel で、双Lipschitz性を保持します。

$E$ が Borel なら各像片をさらに $E$ と交わらせます。一般の $\mathcal H^m$-可測な $E$ は [GMT12の$\sigma$有限性](../GMT12/index.md#prop-gmt12-stability)と Hausdorff 測度の正則性により零集合を除いた Borel 代表を持つため、同じ議論ができます。$\square$
<!-- proof-end -->

この分割により、集合を「一回だけ」数える準備ができました。なお元の $h_j$ は像同士が重なってもよく、重なりが公式でどのように処理されるかは後で区別します。

## 2. 接方向と接Jacobianをどう定義するか

例えば $\phi(t)=(t,t^2)$ で表される放物線では、$\phi'(t)=(1,2t)$ の張る直線が接方向です。一般のパラメータ表示 $\phi:A\subset\mathbb R^m\to\mathbb R^d$ でも、微分行列の列が張る $m$ 次元部分空間を考えます。ここで $A$ は開集合とは限りません。$A$ の Lebesgue 密度1の点では、$A$ 上の値から一次近似の微分が一意に定まります。

**密度1と微分の準備**：$A\subset\mathbb R^m$ が Borel で $a$ が $A$ の密度1の点なら、任意の方向 $v$ と $t_k\downarrow0$ に対し、$a_k\in A$ を選んで $(a_k-a)/t_k\to v$ とできます。実際、$B(a+t_kv,\epsilon t_k)$ がすべて $A$ と交わらないなら $a$ の近傍内の $A$ の欠損割合は $\epsilon$ に応じた正の下界を持ち、密度1に反します。$\epsilon\downarrow0$ を使えば主張が従います。この事実により、$A$ 上で等しい二つの Lipschitz 拡張の微分は密度1の点で一致します。

<a id="def-gmt13-tangent-plane"></a>

<!-- formal-statement-start -->
> **定義（整流可能集合の接m平面）**
> 双Lipschitz片 $E_i=\phi_i(A_i)$ を考える。
> $a\in A_i$ が密度1の点で、$\phi_i$ は $a$ で微分可能とし、微分の rank は $m$ とする。
> このとき $x=\phi_i(a)$ における **接$m$平面**を
$$
T_xE:=\operatorname{im}D\phi_i(a)\subset\mathbb R^d
$$
> と定める。ここで平面とは原点を通る $m$ 次元線形部分空間を指し、点 $x$ を通るアフィン接平面は $x+T_xE$ である。未定義の零測度部分では任意の値を割り当ててよい。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gmt13-tangent-plane -->
### 直接例：斜めの直線と放物線

**定義の確認**：両方について、パラメータ表示の双Lipschitz性、密度1の点、微分の rank を確かめ、その微分像が接平面になることを検証します。

$E=\{(t,2t):t\in[-1,1]\}$ には $\phi(t)=(t,2t)$ を使えます。$|\phi(s)-\phi(t)|=\sqrt5|s-t|$ なので双Lipschitzで、$D\phi=(1,2)^{\mathsf T}$ は rank 1 です。区間内部の各点は密度1だから、接方向は $T_{(t,2t)}E=\operatorname{span}(1,2)$ です。

放物線 $P=\{(t,t^2):-1\le t\le1\}$ では $\psi(t)=(t,t^2)$ は第一座標から逆を回収でき、$|\psi(s)-\psi(t)|\le\sqrt5|s-t|$ かつ $|s-t|\le|\psi(s)-\psi(t)|$ です。$D\psi(t)=(1,2t)^{\mathsf T}$ が rank 1 なので、区間内部で $T_{(t,t^2)}P=\operatorname{span}(1,2t)$ となります。端点は二点であり $\mathcal H^1$-零です。
<!-- definition-example-end -->

次に、曲面上の関数 $F:E\to\mathbb R^n$（$n\ge m$）の微分を定めます。パラメータから合成した $F\circ\phi_i$ の変化率を、曲面の接方向に沿う変化率へ戻す操作です。$F\circ\phi_i$ は $A_i$ 上だけで Lipschitz ですが、各座標を Lipschitz のまま全空間へ延長できます（第5節で式を与えます）。密度1の点での微分は延長によらず一致します。

<a id="def-gmt13-tangential-jacobian"></a>

<!-- formal-statement-start -->
> **定義（接微分と接Jacobian）**
> $E$ は $\mathcal H^m$-可測な可算 $m$-整流可能集合、$F:E\to\mathbb R^n$ は Lipschitz とし、$n\ge m$ とする。
> $x=\phi_i(a)$ で接平面が定まり、合成 $F\circ\phi_i$ の微分も密度1の点 $a$ で存在するとする。
> **接微分** $D^E F(x):T_xE\to\mathbb R^n$ を
$$
D^E F(x)\big(D\phi_i(a)v\big):=D(F\circ\phi_i)(a)v
\quad(v\in\mathbb R^m)
$$
> で定める。$T_xE$ の任意の正規直交基底 $u_1,\dots,u_m$ に対し、その像を列に持つ行列を $C$ と置く。**接$m$次元Jacobian**は
$$
J^E_mF(x):=\sqrt{\det(C^{\mathsf T}C)}\ge0
$$
> とする。零測度の未定義点には $J^E_mF=0$ を割り当てる。
<!-- formal-statement-end -->

ここで $D\phi_i(a)$ が rank $m$ なので、同じ接方向のベクトルを作る $v$ は一意です。したがって最初の式は $T_xE$ 上の線形写像を定めます。[Gram行列式の直交不変性](../GMT10/index.md#thm-gmt10-gram-invariance)により $C$ の正規直交基底を取り替えても値は不変です。

<!-- definition-example-start: def-gmt13-tangential-jacobian -->
### 直接例：傾いた線分から水平軸への射影

**定義の確認**：双Lipschitzな表示の微分を接方向の正規直交基底へ変換し、接微分が線形かつその Gram 行列式から Jacobian を計算できることを確かめます。

先ほどの $E=\{(t,2t):-1\le t\le1\}$ と $F(x,y)=x$ を用います。$u=(1,2)/\sqrt5$ は接方向の単位ベクトルで、$D^EF(u)=1/\sqrt5$ です。従って $C$ は $1\times1$ 行列 $(1/\sqrt5)$、

$$
J^E_1F=\sqrt{C^{\mathsf T}C}=\frac1{\sqrt5}.
$$

一方 $\mathcal H^1(E)=2\sqrt5$ なので $\int_EJ^E_1F\,d\mathcal H^1=2$ です。射影した区間 $[-1,1]$ の長さと一致します。斜めの線分の長さを、そのまま射影像の長さと取り違えないための倍率です。
<!-- definition-example-end -->

## 3. 表示を取り替えても接方向と微分は同じか

上の定義はパラメータ $\phi_i$ を使いました。別の表示 $\psi_j$ を選んだ場合に結果が違うなら「集合上」の量になりません。重なりが正の $\mathcal H^m$ 測度を持つ点では、両表示の接方向が同じであることを示します。

<a id="lem-gmt13-chart-independence"></a>

<!-- formal-statement-start -->
> **補題（接平面と接微分のパラメータ表示からの独立性）**
> $A,B\subset\mathbb R^m$ は Borel 集合とし、$\phi:A\to\mathbb R^d$ と $\psi:B\to\mathbb R^d$ は双Lipschitzとする。
> どちらも全空間への Lipschitz拡張を持つと仮定する。
> 二つの像の交わり $S=\phi(A)\cap\psi(B)$ の $\mathcal H^m$-ほとんどすべての点 $x=\phi(a)=\psi(b)$ では
$$
\operatorname{im}D\phi(a)=\operatorname{im}D\psi(b)
$$
> が成り立つ。さらに $F$ が両像の和集合で Lipschitz なら、両表示から定めた $D^EF(x)$ はこの共通の接$m$平面上で一致する。
<!-- formal-statement-end -->

### 証明の見取り図

交わりのパラメータ逆像で、ほとんどの点は密度1です。そこで任意の方向へ小さく動く点列を交わりの内部から選び、二つのパラメータの一次近似を比較します。

<!-- proof-start -->
### 証明

$A_S=\phi^{-1}(S)$、$B_S=\psi^{-1}(S)$ と置きます。双Lipschitz性によって、[Lipschitz像の零集合保存](../GMT11/index.md#lem-gmt11-lipschitz-null-image)を写像と逆写像の両方に使えます。[高次元Lebesgue微分定理](../../HA/HA1/index.md#thm-ha1-differentiation)を各逆像に適用すると、$S$ のほとんどすべての点に対応する $a,b$ は、それぞれの集合の Lebesgue 密度1の点です。

Lipschitz拡張 $\phi,\psi$ および合成 $F\circ\phi,F\circ\psi$ の各座標の延長は、[Rademacherの定理](../GMT9/index.md#thm-gmt9-rademacher)によりそれらの点で微分可能です。双Lipschitzの下界を密度1の点へ向かう差商に適用すれば、$D\phi(a)$ と $D\psi(b)$ はともに単射、従って rank $m$ です。

$v\in\mathbb R^m$ を任意に取り、$t_k\downarrow0$ に対して $a_k\in A_S$ を $(a_k-a)/t_k\to v$ と選びます。$x_k=\phi(a_k)\in S$ とおき $b_k=\psi^{-1}(x_k)\in B_S$ とすると、$\psi^{-1}$ の Lipschitz性から

$$
|b_k-b|\le C|x_k-x|\le CL\,|a_k-a|=O(t_k).
$$

有界列 $(b_k-b)/t_k$ の部分列を選び、極限を $w$ とします。微分の定義を両表示に適用すると

$$
\frac{x_k-x}{t_k}\longrightarrow D\phi(a)v,
\qquad
\frac{x_k-x}{t_k}\longrightarrow D\psi(b)w.
$$

ゆえに $D\phi(a)v=D\psi(b)w$ で、$\operatorname{im}D\phi(a)\subset\operatorname{im}D\psi(b)$ です。$\phi,\psi$ を交換して逆包含を得ます。次に $F(x_k)-F(x)$ を $t_k$ で割ると同じ方法により

$$
D(F\circ\phi)(a)v=D(F\circ\psi)(b)w.
$$

これは同一の接方向のベクトルに接微分が同じ値を与えるということです。密度1の点の零集合を除いた議論なので、主張は $S$ の $\mathcal H^m$-a.e.で成り立ちます。$\square$
<!-- proof-end -->

可算個のチャートを選んでいるので、チャートの各組について例外零集合を除外しても、その和集合は零測度です。したがって $T_xE$ と $D^EF(x)$ は $\mathcal H^m$-a.e.でパラメータ表示に依存しません。

## 4. 接Jacobianは普通のJacobianとどうつながるか

パラメータ側で [GMT11のarea formula](../GMT11/index.md#thm-gmt11-area-formula)を使うため、合成 $F\circ\phi$ の $m$ 次元Jacobianを求めます。$D\phi$ の長さの倍率と、接方向に沿った $F$ の倍率とが積になるのが核心です。

<a id="lem-gmt13-jacobian-chain"></a>

<!-- formal-statement-start -->
> **補題（接Jacobianの連鎖式）**
> $\phi:A\subset\mathbb R^m\to E\subset\mathbb R^d$ は双Lipschitzなチャート、$F:E\to\mathbb R^n$ は Lipschitz とし、$n\ge m$ とする。
> $a$ は両写像の微分が定まる密度1の点で、$D\phi(a)$ は rank $m$ と仮定する。このとき
$$
J_m(F\circ\phi)(a)=J^E_mF(\phi(a))\,J_m\phi(a)
$$
> が成り立つ。左辺と右辺の $J_m$ は [GMT10の幾何的Jacobian](../GMT10/index.md#def-gmt10-geometric-jacobian)である。
<!-- formal-statement-end -->

### 証明の見取り図

接$m$平面の正規直交基底を列に並べた行列 $U$ を挟み、$D\phi=UB$ と分解します。$B$ は可逆 $m\times m$ 行列です。

<!-- proof-start -->
### 証明

$U$ を $d\times m$ 行列とし、$U^{\mathsf T}U=I_m$、$\operatorname{im}U=T_{\phi(a)}E$ とします。$B=U^{\mathsf T}D\phi(a)$ と置くと $D\phi(a)=UB$ です。rank が $m$ なので $B$ は可逆で、

$$
(D\phi)^{\mathsf T}D\phi
=B^{\mathsf T}U^{\mathsf T}UB=B^{\mathsf T}B,
\quad J_m\phi=|\det B|.
$$

$C$ を $D^EF(\phi(a))u_1,\dots,D^EF(\phi(a))u_m$ を列に持つ $n\times m$ 行列とします。接微分の定義から $D(F\circ\phi)(a)=CB$ であり、

$$
\begin{aligned}
J_m(F\circ\phi)^2
&=\det\big((CB)^{\mathsf T}(CB)\big)\\
&=\det(B^{\mathsf T}C^{\mathsf T}CB)\\
&=(\det B)^2\det(C^{\mathsf T}C)\\
&=(J_m\phi)^2(J^E_mF)^2.
\end{aligned}
$$

両辺は非負なので平方根を取れば結論です。$C$ が rank 欠損でも行列式は $0$ として同じ計算が成立します。$\square$
<!-- proof-end -->

## 5. 整流可能集合全体で面積を数える

これでパラメータを消去できます。$F:E\to\mathbb R^n$ が同じ像点へ二度到達すれば、その点は重複して数えます。曲面 $E$ 自身の枚数を、パラメータの枚数と混同しないように **互いに素なチャート像** を用います。

<a id="thm-gmt13-rectifiable-area"></a>

<!-- formal-statement-start -->
> **定理（整流可能集合上のarea formula）**
> 整数 $1\le m\le\min(d,n)$ を固定する。
> $E\subset\mathbb R^d$ は $\mathcal H^m$-可測で可算 $m$-整流可能、$F:E\to\mathbb R^n$ は Lipschitz とする。
> 非負の $\mathcal H^m$-可測関数 $g:E\to[0,\infty]$ に対して
$$
\int_E g(x)J^E_mF(x)\,d\mathcal H^m(x)
=\int_{\mathbb R^n}\left(\sum_{\substack{x\in E\\F(x)=y}}g(x)\right)d\mathcal H^m(y).
$$
> 空の和は $0$、無限個の非負項の和は有限部分和の上限で定める。
> 右辺の被積分関数は Hausdorff 測度の完備化について可測で、等式は無限大も許す。
> 特に $g\equiv1$ では重複度 $N(F,E,y)=\#\{x\in E:F(x)=y\}$ が現れる。
<!-- formal-statement-end -->

### 証明の見取り図

[可算双Lipschitz分割](#lem-gmt13-bilipschitz-pieces)で $E$ の零測度部分を除き、片 $E_i$ を一回ずつ積分します。[GMT11の重み付き面積公式](../GMT11/index.md#cor-gmt11-weighted-area)を $\phi_i$ と $F\circ\phi_i$ に二回用い、[連鎖式](#lem-gmt13-jacobian-chain)で Jacobian を置き換えます。二回現れる $c_m$ は消えます。

<!-- proof-start -->
### 証明

最初に $g$ を非負 Borel 関数として証明します。$E$ が Borel でない場合は零測度部分を除いた Borel 代表を使い、最後に $\mathcal H^m$ の完備化で元の集合へ戻します。

[分割補題](#lem-gmt13-bilipschitz-pieces)によって互いに素な $E_i=\phi_i(A_i)$ を取り、$E\setminus\bigcup_iE_i$ は $\mathcal H^m$-零とします。$\phi_i$ は全空間の Lipschitz 写像の制限です。$F\circ\phi_i$ は $A_i$ 上で Lipschitz で、座標ごとに例えば

$$
\widetilde F_{i,k}(u)=\inf_{a\in A_i}
\big(F_k(\phi_i(a))+L_i|u-a|\big)
$$

で $\mathbb R^m$ に延長できます。ここで $L_i$ は $F\circ\phi_i$ の Lipschitz 定数です（$A_i=\varnothing$ の片は捨てます）。三角不等式によりこの延長は $A_i$ 上で元の値に一致し、各座標が $L_i$-Lipschitz なのでベクトル値の延長も Lipschitz です。密度1の点では導関数は $A_i$ 上の値で一意に決まります。

まず [重み付きarea formula](../GMT11/index.md#cor-gmt11-weighted-area)をチャート $\phi_i$ に、重み $a\mapsto g(\phi_i(a))J^E_mF(\phi_i(a))$ で適用します。各関数は Borel 代表を取り、微分可能点の外を零にしてよいので、

$$
\int_{E_i}g(x)J^E_mF(x)\,d\mathcal H^m(x)
=c_m\int_{A_i}g(\phi_i(a))J^E_mF(\phi_i(a))J_m\phi_i(a)\,da.
$$

[接Jacobianの連鎖式](#lem-gmt13-jacobian-chain)を代入すると右辺は

$$
c_m\int_{A_i}g(\phi_i(a))J_m\widetilde F_i(a)\,da.
$$

これに再度 [GMT11の重み付きarea formula](../GMT11/index.md#cor-gmt11-weighted-area)を $\widetilde F_i$ と重み $g\circ\phi_i$ へ適用すれば

$$
\int_{E_i}gJ^E_mF\,d\mathcal H^m
=\int_{\mathbb R^n}\sum_{\substack{x\in E_i\\F(x)=y}}g(x)\,d\mathcal H^m(y)
$$

となります。両方の面積公式に同じ $c_m$ があるため相殺されています。$E_i$ は互いに素なので、$i$ について [単調収束定理](../../F0/F0-00D2B/index.md#ref-limit-integral-exchange)で和を取ると、右辺では同じ $x$ を二回数えず、異なる $x$ が同じ $y$ へ写る場合だけ重複します。

残余集合 $Z=E\setminus\bigcup_iE_i$ は $\mathcal H^m(Z)=0$ で、$F$ の Lipschitz性から [零集合保存](../GMT11/index.md#lem-gmt11-lipschitz-null-image)の被覆評価と同じ理由で $\mathcal H^m(F(Z))=0$ です。左辺の積分への寄与は零、右辺も $F(Z)$ の外では重複を追加しないので零です。

非負 $\mathcal H^m$-可測な $g$ は、$\mathcal H^m|_E$ が [GMT12の$\sigma$有限性](../GMT12/index.md#prop-gmt12-stability)を持つため、Borel 関数と零集合を除いて一致させられます。上と同じ零集合保存で像側の寄与も変わりません。よって主張の全範囲で成立します。$\square$
<!-- proof-end -->

**何が変わったか**：GMT11ではパラメータ側に $c_m\int J_m\,d\mathcal L^m$ がありました。今回は $E$ 上の $d\mathcal H^m$ を直接使い、パラメータの倍率は接Jacobianへ吸収されました。式に $c_m$ をもう一度掛けると二重計上です。

## 6. 滑らかな曲面積分と重なりの具体計算

グラフ $S=\{(u,h(u)):u\in U\}\subset\mathbb R^{m+k}$（$U\subset\mathbb R^m$ は Borel、$h$ はその近傍で $C^1$）を考えます。局所的に $Dh$ が有界な領域へ切れば、$\Phi(u)=(u,h(u))$ は双Lipschitzです。$D\Phi$ の列は $(e_j,\partial_jh)$ なので、内積を並べると $I_m+(Dh)^{\mathsf T}Dh$ となります。

<a id="cor-gmt13-c1-change"></a>

<!-- formal-statement-start -->
> **系（C1グラフの面積・変数変換）**
> $U\subset\mathbb R^m$ を Borel、$h$ を $U$ の開近傍で $C^1$ とし、$S=\{(u,h(u)):u\in U\}$ とする。$g:S\to[0,\infty]$ を $\mathcal H^m$-可測とすると、
$$
\int_Sg(x)\,d\mathcal H^m(x)
=c_m\int_Ug(u,h(u))\sqrt{\det(I_m+(Dh(u))^{\mathsf T}Dh(u))}\,du.
$$
> 特に $U$ が有界で $Dh$ も有界なら右辺は通常の滑らかなグラフの面積積分に $c_m$ を掛けたものと一致する。
<!-- formal-statement-end -->

### 証明の見取り図

$\Phi$ の第一座標が $u$ なので重複はありません。$S$ の上の恒等写像に対して接Jacobianは $1$ です。

<!-- proof-start -->
### 証明

$U$ の各点を含む、閉包が $h$ の定義された開集合に入る小立方体を可算個選び、その内部を互いに素な Borel 部分へ分けます。各立方体の凸包上で $Dh$ が有界だから平均値の定理で $\Phi$ は Lipschitz であり、第一座標により逆も Lipschitz です。[GMT12の$C^1$グラフ構成](../GMT12/index.md#prop-gmt12-c1-graphs)と同じ分割です。[GMT11の重み付きarea formula](../GMT11/index.md#cor-gmt11-weighted-area)を $\Phi$ に適用し、

$$
D\Phi=\begin{pmatrix}I_m\\Dh\end{pmatrix},\quad
(D\Phi)^{\mathsf T}D\Phi=I_m+(Dh)^{\mathsf T}Dh
$$

を代入すれば、各部分で公式が得られます。互いに素な Borel 分割にしてから単調収束で $U$ 全体へ広げます。恒等写像 $\mathrm{id}_S$ の接微分は接$m$平面上の恒等なので $J^S_m\mathrm{id}_S=1$、従ってこれは [整流可能集合上の公式](#thm-gmt13-rectifiable-area)とも一致します。$\square$
<!-- proof-end -->

### 傾いた平面の射影と非正規化係数

$S=\{(u,v,au+bv):(u,v)\in[0,1]^2\}\subset\mathbb R^3$ を $F(x,y,z)=(x,y)$ で射影します。$\Phi(u,v)=(u,v,au+bv)$ に対し

$$
J_2\Phi=\sqrt{\det\begin{pmatrix}1+a^2&ab\\ab&1+b^2\end{pmatrix}}
=\sqrt{1+a^2+b^2}.
$$

$F\circ\Phi(u,v)=(u,v)$ なので、その $J_2$ は $1$ です。[連鎖式](#lem-gmt13-jacobian-chain)より

$$
J^S_2F=\frac1{\sqrt{1+a^2+b^2}},\quad
\int_SJ^S_2F\,d\mathcal H^2=c_2.
$$

右辺でも $F(S)=[0,1]^2$ の各点の重複度は $1$ なので $\mathcal H^2([0,1]^2)=c_2$ です。どちら側にも $c_2$ を「追加」する必要はありません。

### 二枚の曲面が同じ影を落とす

$S_0=[0,1]^2\times\{0\}$、$S_1=[0,1]^2\times\{1\}$、$E=S_0\cup S_1$ とし、$F(x,y,z)=(x,y)$ とします。各面の接平面は水平で $J^E_2F=1$ です。したがって

$$
\int_EJ^E_2F\,d\mathcal H^2=2c_2.
$$

像の内側では $N(F,E,(u,v))=2$ なので右辺も $2\mathcal H^2([0,1]^2)=2c_2$ です。パラメータの枚数を増やしたのではなく、**異なる二点**が同じ像点へ到達したため二回数えます。

## 7. 注意：可算整流可能性と集合全体の近似接平面は別の主張

ここで構成したのは、**可算個のパラメータ片に沿った $\mathcal H^m$-a.e.接平面**です。これだけで、$E$ 全体の球内測度が局所有限であるとか、球の中の大部分がその平面の近くに集まるという円錐密度条件まで成立するわけではありません。

例えば $E=\mathbb R\times\mathbb Q\subset\mathbb R^2$ は可算個の水平直線の和集合なので可算 $1$-整流可能です。各直線片の接方向は水平ですが、任意の点を中心とする任意の開球の内部に、正の長さを持つ水平直線片が無限個あります。したがって $\mathcal H^1(E\cap B(x,r))=\infty$ です。水平接方向を固定しても、円錐外にある別の直線片の $\mathcal H^1$ 測度を $o(r)$ と評価できません。

集合全体を局所有限測度のもとで近似接平面と密度から特徴づける理論は後の GMT15 で扱います。本章の公式にはその未証明な理論を仮定しません。

## 8. 演習（全問詳細解答付き）

### Level A：接方向・倍率・重複を手計算する

<a id="ex-gmt13-a1"></a>

**A1. 直線の接射影**
- Level: A
- 問題: $S=\{(t,3t):0\le t\le2\}\subset\mathbb R^2$ と $F(x,y)=x$ について、接方向、$J^S_1F$、$\int_SJ^S_1F\,d\mathcal H^1$ を求めよ。

<!-- solution-start -->
**詳細解答**

$\phi(t)=(t,3t)$ は $D\phi=(1,3)^{\mathsf T}$、$J_1\phi=\sqrt{10}$ です。内部の点で接方向は $\operatorname{span}(1,3)$、単位方向 $u=(1,3)/\sqrt{10}$ へ $D^SF$ を作用させると $1/\sqrt{10}$ なので、[接微分と接Jacobian](#def-gmt13-tangential-jacobian)の定義から $J^S_1F=1/\sqrt{10}$ です。$\mathcal H^1(S)=2\sqrt{10}$ だから積分は $2$ です。$F(S)=[0,2]$ で重複度 $1$、右辺も $2$ です。
<!-- solution-end -->

<a id="ex-gmt13-a2"></a>

**A2. 放物線の水平射影**
- Level: A
- 問題: $P=\{(t,t^2):0\le t\le1\}$ 上の $F(x,y)=x$ の接Jacobianを $t$ で表し、面積公式の両辺を求めよ。

<!-- solution-start -->
**詳細解答**

$\phi'(t)=(1,2t)$ で $J_1\phi=\sqrt{1+4t^2}$ です。接方向の単位ベクトル $u=(1,2t)/\sqrt{1+4t^2}$ について $D^PF(u)=1/\sqrt{1+4t^2}$ なので

$$
\int_PJ^P_1F\,d\mathcal H^1
=\int_0^1\frac{\sqrt{1+4t^2}}{\sqrt{1+4t^2}}\,dt=1.
$$

像は $[0,1]$、重複度は $1$ なので右辺も $1$ です。[C1グラフの面積・変数変換](#cor-gmt13-c1-change)を使うと左辺の相殺が直接見えます。
<!-- solution-end -->

<a id="ex-gmt13-a3"></a>

**A3. 二枚のシート**
- Level: A
- 問題: $E=([0,2]\times\{0\})\cup([0,2]\times\{1\})$ と $F(x,y)=x$ で、$J^E_1F$ と $N(F,E,z)$ を求め、両辺を計算せよ。

<!-- solution-start -->
**詳細解答**

各水平線分は接方向 $(1,0)$ で、$J^E_1F=1$ です。線分一本の長さは $2$、二本は互いに素なので左辺は $2+2=4$ です。$z\in[0,2]$ の逆像は $(z,0),(z,1)$ の二点で、区間外にはありません。従って $N=2$ を $[0,2]$ 上に持ち、右辺は $2\times2=4$ です。
<!-- solution-end -->

<a id="ex-gmt13-a4"></a>

**A4. 角を持つ曲線**
- Level: A
- 問題: $E=([0,1]\times\{0\})\cup(\{0\}\times[0,1])$、$F(x,y)=x+y$ の接Jacobianと重複度を調べよ。原点での接方向は一意である必要があるか。

<!-- solution-start -->
**詳細解答**

各軸上の開線分では、接方向の単位ベクトルは $(1,0)$ または $(0,1)$ です。いずれも $F(x,y)=x+y$ の接微分は単位ベクトルを $1$ へ送るため、$J^E_1F=1$ です。

各線分の長さは $1$ で、交点は一点の零測度集合なので左辺は $1+1=2$ です。$0<z\le1$ では逆像は二点 $(z,0),(0,z)$、$z=0$ では原点一つなので、右辺も

$$
\int_0^1 2\,dz=2
$$

となります。原点の接方向は一意ではありませんが、[整流可能集合上のarea formula](#thm-gmt13-rectifiable-area)は零測度の点での一意性を要求しません。
<!-- solution-end -->

<a id="ex-gmt13-a5"></a>

**A5. 零測度の付着物**
- Level: A
- 問題: $S=[0,1]\times\{0\}$、$Z=\mathbb Q^2\cap[0,1]^2$、$E=S\cup Z$、$F(x,y)=x$ とする。$\mathcal H^1$ による面積公式に $Z$ が影響しないことを説明せよ。

<!-- solution-start -->
**詳細解答**

$Z$ は可算集合なので $\mathcal H^1(Z)=0$、$F(Z)=\mathbb Q\cap[0,1]$ も可算で $\mathcal H^1$-零です。$S$ の接方向は水平で $J^E_1F=1$ が $\mathcal H^1$-a.e.成立し、左辺は $\mathcal H^1(S)=1$ です。像の点 $z\in[0,1]\setminus\mathbb Q$ では逆像が $(z,0)$ 一つですが、有理数の $z$ では $Z$ からさらに複数の逆像があります。その差は像側の零測度集合に限定されるため、右辺の積分も $1$ です。点ごとの重複度が必ず一致するという主張ではありません。
<!-- solution-end -->

### Level B：定理の機構と仮定を問い直す

<a id="ex-gmt13-b1"></a>

**B1. 重なった二つの直線パラメータ**
- Level: B
- 問題: $S=\{(t,2t):|t|<1\}$ に対して $\phi(t)=(t,2t)$ と $\psi(s)=(2s,4s)$（$|s|<1/2$）を考える。接方向と接微分 $F(x,y)=x-y$ が表示によらないことを、$D\phi,D\psi$ を用いて示せ。

<!-- solution-start -->
**詳細解答**

$D\phi=(1,2)^{\mathsf T}$、$D\psi=(2,4)^{\mathsf T}=2D\phi$ なので、両方の像は $\operatorname{span}(1,2)$ です。$F\circ\phi(t)=-t$ から導関数は $-1$、$F\circ\psi(s)=-2s$ から導関数は $-2$ です。一つの接方向のベクトル $v=\alpha(1,2)$ は $D\phi(\alpha)$ とも $D\psi(\alpha/2)$ とも表せるので、両表示の[接微分と接Jacobian](#def-gmt13-tangential-jacobian)の定義から $D^SF(v)=-\alpha=(-2)(\alpha/2)$ です。よって接Jacobianも $1/\sqrt5$ と一致します。
<!-- solution-end -->

<a id="ex-gmt13-b2"></a>

**B2. 一般のC1グラフと座標射影**
- Level: B
- 問題: $h:[0,1]^2\to\mathbb R$ が開近傍で $C^1$、$S=\{(u,v,h(u,v)):(u,v)\in[0,1]^2\}$、$\pi(x,y,z)=(x,y)$ とする。$J^S_2\pi$ と $\int_SJ^S_2\pi\,d\mathcal H^2$ を求めよ。

<!-- solution-start -->
**詳細解答**

$\Phi(u,v)=(u,v,h(u,v))$ とすると

$$
D\Phi=\begin{pmatrix}1&0\\0&1\\h_u&h_v\end{pmatrix},\quad
(D\Phi)^{\mathsf T}D\Phi=
\begin{pmatrix}1+h_u^2&h_uh_v\\h_uh_v&1+h_v^2\end{pmatrix}.
$$

行列式は $(1+h_u^2)(1+h_v^2)-(h_uh_v)^2=1+h_u^2+h_v^2$ です。一方 $D(\pi\circ\Phi)=I_2$ なので [連鎖式](#lem-gmt13-jacobian-chain)から

$$
J^S_2\pi=\frac1{\sqrt{1+h_u^2+h_v^2}}.
$$

[グラフ面積の系](#cor-gmt13-c1-change)を適用して $\int_SJ^S_2\pi\,d\mathcal H^2=c_2\int_{[0,1]^2}1\,du\,dv=c_2$ です。像上の重複度が1であることとも整合します。
<!-- solution-end -->

<a id="ex-gmt13-b3"></a>

**B3. 局所有限性がない整流可能集合**
- Level: B
- 問題: $E=\mathbb R\times\mathbb Q$ が可算1-整流可能なのに、各 $x\in E$、$r>0$ で $\mathcal H^1(E\cap B(x,r))=\infty$ となることを証明せよ。またその事実から何を結論してはいけないか。

<!-- solution-start -->
**詳細解答**

有理数を $\mathbb Q=\{q_1,q_2,\dots\}$ と列挙すると、$E$ は水平直線の可算和です。各直線は $t\mapsto(t,q_j)$ の Lipschitz 像なので、[可算整流可能性](../GMT12/index.md#def-gmt12-countably-rectifiable)の定義を満たします。

$x=(a,q)$ と $r>0$ を固定します。区間 $(q-r/2,q+r/2)$ には、互いに異なる有理数が無限個あります。その高さの水平直線と $B(x,r)$ の交わりは、長さが少なくとも $\sqrt3r$ の線分です。これらは互いに素なので、任意の自然数 $N$ について

$$
\mathcal H^1(E\cap B(x,r))\ge N\sqrt3r.
$$

$N$ を無限大へ動かせば、球内の測度は無限大です。

各線の接方向は水平ですが、集合全体の局所有限な長さや球内の円錐密度条件を結論することはできません。後者を評価するには別の仮定が要ります。
<!-- solution-end -->

<a id="ex-gmt13-b4"></a>

**B4. 接Jacobianの行列式の相殺**
- Level: B
- 問題: $U$ を $d\times m$ の正規直交列行列、$B$ を可逆な $m\times m$ 行列、$C$ を $n\times m$ 行列とする。$A=UB$ と置き、$J_m(A)=|\det B|$ と $J_m(CB)=J_m(C)|\det B|$ を Gram 行列式から示せ。

<!-- solution-start -->
**詳細解答**

$U^{\mathsf T}U=I_m$ だから $A^{\mathsf T}A=B^{\mathsf T}B$、その行列式は $(\det B)^2$ です。$J_m(A)$ は非負平方根なので $|\det B|$ となります。次に $(CB)^{\mathsf T}CB=B^{\mathsf T}(C^{\mathsf T}C)B$ であり、行列式の積の性質により $\det((CB)^{\mathsf T}CB)=(\det B)^2\det(C^{\mathsf T}C)$ です。両辺の非負平方根から $J_m(CB)=|\det B|J_m(C)$ です。$C$ が rank 欠損のときも両辺は $0$ で成立します。
<!-- solution-end -->

### Level C：接方向・重複・重みを一つにつなぐ

<a id="ex-gmt13-c1"></a>

**C1. 二枚の折り返し放物線**
- Level: C
- 問題: $S_j=\{(t,t^2,j):-1\le t\le1\}\subset\mathbb R^3$（$j=0,1$）、$E=S_0\cup S_1$、$F(x,y,z)=x^2$ とする。各片の接方向と接Jacobianを求め、重複度による面積公式の両辺を計算せよ。さらに重み $g(x,y,z)=1+z$ の場合を検算し、端点や折り返し点の寄与も説明せよ。

<!-- solution-start -->
**詳細解答**

**(1)** $\phi_j(t)=(t,t^2,j)$ は第一座標で逆を回収できる双Lipschitz写像です。$D\phi_j(t)=(1,2t,0)^{\mathsf T}$ で、$T_{\phi_j(t)}E=\operatorname{span}(1,2t,0)$、$J_1\phi_j(t)=\sqrt{1+4t^2}$ です。合成は $F\circ\phi_j(t)=t^2$ なので $D(F\circ\phi_j)(t)=2t$ です。[連鎖式](#lem-gmt13-jacobian-chain)により

$$
J^E_1F(\phi_j(t))=\frac{|2t|}{\sqrt{1+4t^2}}.
$$

**(2)** $0<s<1$ なら $t=\sqrt s$ と $t=-\sqrt s$ が各 $j$ で一つずつあるので、四つの異なる点が逆像となり $N(F,E,s)=4$ です。$s=0$ では $t=0$ が二点、$s=1$ では $t=\pm1$ が各片にあって四点、それ以外は零です。右辺は $\int_0^14\,ds=4$ です。左辺は各片で [グラフ面積の系](#cor-gmt13-c1-change)を用いると

$$
\begin{aligned}
\int_EJ^E_1F\,d\mathcal H^1
&=\sum_{j=0}^1\int_{-1}^1
\frac{2|t|}{\sqrt{1+4t^2}}\sqrt{1+4t^2}\,dt\\
&=2\left(2\int_0^1 2t\,dt\right)=4.
\end{aligned}
$$

**(3)** $g=1$ が $S_0$ 上、$g=2$ が $S_1$ 上で成り立ちます。左辺は各片の上の積分 $2$ に重みを掛けて $2+2\cdot2=6$ です。像側では $0<s<1$ の四点の重みの和は $1+1+2+2=6$ なので $\int_0^16\,ds=6$ です。$s=0,1$ は $\mathcal H^1$-零の点であり、微分が $0$ になる折り返し点も積分値に余計な寄与を生みません。
<!-- solution-end -->

## 9. 次へ：面積から値ごとの逆像の測度へ

この講義では、整流可能集合の上でも接方向に沿った Jacobian と重複度で面積を測れるようになりました。次の GMT14 では、$\mathbb R^d$ から次元の低い空間への写像を考えます。そのときは「点の逆像を数える」のではなく「**同じ値を取る点の集合の $(d-m)$ 次元測度を積分する**」coarea formula が必要になります。
