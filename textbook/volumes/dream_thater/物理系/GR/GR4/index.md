# GR4 観測者の局所直交枠と測定

<!-- definition-example-audit: strict -->

[GR2の固有時率](../GR2/index.md#prop-gr2-clock-rate)では時計が刻む時間を計量から求め、[GR3の測地線方程式](../GR3/index.md#thm-gr3-stationary-action)では外力を受けない粒子の世界線を選びました。しかし曲線の座標成分を計算するだけでは、**その場にいる人が光を何 Hz と測り、粒子の速度をいくつと報告するか**は決まりません。同じ光でも観測者が違えば測定値が違うからです。

特殊相対論の[SREL3の四元運動量](../../SREL/SREL3/index.md#def-srel3-four-momentum)は慣性系の時間軸と空間軸で成分を分けました。曲がった時空では、全時空を覆う単一の慣性系を要求せず、**観測者のいる一点の接空間に、時計方向と三本の物差し方向を作る**ことにします。これを局所直交枠と呼びます。以下は点ごとの代数であり、離れた点の測定値を比較するには光線の運動などの追加情報が必要です。

時空 $(M,g)$ は時間向き付きの滑らかな四次元Lorentz多様体とし、符号は $(-,+,+,+)$、$c>0$ とします。点 $p$ にいる観測者の未来向き四元速度を $u\in T_pM$ とし、$g(u,u)=-c^2$ とします。$x^0=ct$ の座標と $t$（秒）を使う座標は、例ごとに明示します。丸括弧付き添字 $(a)$ は観測者の枠に沿った成分、ギリシャ添字は座標成分です。

## 1. 一本の時計から三本の空間軸を作る

観測者の四元速度はその人の時計が進む方向を表します。まず $e_{(0)}=u/c$ と置けば、$g(e_{(0)},e_{(0)})=-1$ です。その時間方向と直交するベクトル $X$ の集合

$$
H_u=\{X\in T_pM:g(u,X)=0\}
$$

を、**その瞬間に観測者の時計に直交する空間方向**として使います。[LORG1の「時間的ベクトルの直交補空間は正定値」の補題](../../../幾何系/LORG/LORG1/index.md#lem-lorg1-timelike-orthogonal)から、$H_u$ は三次元で $g$ の制限が正定値です。そこで通常の内積空間と同じ手順で、長さ1の互いに直交する空間軸三本を取れます。軸の向きは一意ではありませんが、時間方向は観測者自身の運動で指定されます。

<a id="def-gr4-observer-frame"></a>

<!-- formal-statement-start -->
> **定義（観測者に付随する局所直交枠）**  
> 四次元時間向き付きLorentz多様体 $(M,g)$ の点 $p$ と未来向き時間的ベクトル $u\in T_pM$、$g(u,u)=-c^2$ を取る。$T_pM$ の順序付き基底 $(e_{(0)},e_{(1)},e_{(2)},e_{(3)})$ が観測者 $u$ の局所直交枠であるとは、次の条件を満たすことをいう。

$$
e_{(0)}=\frac{u}{c},\qquad
g(e_{(a)},e_{(b)})=\eta_{ab},\qquad
(\eta_{ab})=\operatorname{diag}(-1,1,1,1).
$$

> このとき $e_{(1)},e_{(2)},e_{(3)}$ は $u$ に直交する単位空間ベクトルである。定義は点 $p$ での基底について述べており、近傍での平行移動や大域的な枠の存在を要求しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr4-observer-frame -->
**定義の確認**：Minkowskiの静止観測者。座標 $(x^0,x^1,x^2,x^3)=(ct,x,y,z)$ で計量を $g=\operatorname{diag}(-1,1,1,1)$ とし、

$$
u=c\partial_0,\qquad e_{(0)}=\partial_0,\qquad
e_{(i)}=\partial_i\quad (i=1,2,3)
$$

を選びます。$u^0=c>0$ だから未来向きで、$g(u,u)=-c^2$ です。時間軸は $e_{(0)}=u/c$、空間軸との交差内積は零です。また

$$
g(e_{(0)},e_{(0)})=-1,\qquad
g(e_{(i)},e_{(j)})=\delta_{ij}
$$

となります。四本は座標基底なので一次独立で、定義の全条件を満たします。$\partial_0=\partial/\partial(ct)$ としたため、時刻と距離の単位も混ざりません。
<!-- definition-example-end -->

<a id="prop-gr4-frame-existence"></a>

<!-- formal-statement-start -->
> **命題（局所直交枠の存在と空間軸の自由度）**  
> 上の $(M,g)$ と $p,u$ について観測者の局所直交枠は存在する。同じ $u$ に属する二つの枠の空間軸は、ある実直交行列 $R\in O(3)$ による空間軸の取り替えで結ばれる。
<!-- formal-statement-end -->

### 証明の見取り図

時間軸は $u/c$ で固定し、その直交補空間で正定値のGram–Schmidt直交化をします。別の空間基底同士の内積を成分にすれば変換行列の直交性が確かめられます。

<!-- proof-start -->
### 証明

[LORG1の直交補空間の正定値性](../../../幾何系/LORG/LORG1/index.md#lem-lorg1-timelike-orthogonal)を $u$ に適用します。$u\ne0$、$g(u,u)<0$ なので $H_u$ は三次元の正定値内積空間です。任意の基底 $b_1,b_2,b_3$ から

$$
q_1=\frac{b_1}{\sqrt{g(b_1,b_1)}},\qquad
z_2=b_2-g(b_2,q_1)q_1,\qquad
q_2=\frac{z_2}{\sqrt{g(z_2,z_2)}}
$$

を作り、さらに

$$
z_3=b_3-g(b_3,q_1)q_1-g(b_3,q_2)q_2,\qquad
q_3=\frac{z_3}{\sqrt{g(z_3,z_3)}}.
$$

元の三本の一次独立性と正定値性から $z_2,z_3$ は非零で分母は正です。各 $q_i$ は $H_u$ に属し、展開すると $g(q_i,q_j)=\delta_{ij}$。従って $e_{(0)}=u/c,\ e_{(i)}=q_i$ は所要の枠です。

二つの枠の空間軸を $q_i$ と $\widetilde q_i$ とすると、両方とも $H_u$ の基底なので $\widetilde q_i=\sum_jR_{ji}q_j$ と一意に展開できます。両辺の内積から

$$
\delta_{ik}=g(\widetilde q_i,\widetilde q_k)
=\sum_{j,\ell}R_{ji}R_{\ell k}\delta_{j\ell}
=(R^{\mathsf T}R)_{ik}.
$$

従って $R^{\mathsf T}R=I_3$ です。逆に直交行列による取り替えは全条件を保ちます。$\square$
<!-- proof-end -->

**注意。** 局所直交枠は「その点の測定軸」であり、観測者の世界線に沿って軸をどう回転・輸送するかはまだ定めていません。測定の瞬間に必要なのは基底と内積です。点ごとに計量を $\eta$ にできても、全域がMinkowski時空になるとは限りません。

## 2. 座標成分を測定成分に変える

座標基底の $\partial_\mu$ は一般に直交しておらず、$V^\mu$ をそのまま測定値と読めません。枠の各軸にベクトルを射影して得る係数を測定に使います。$V=\sum_aV^{(a)}e_{(a)}$ に両辺の $e_{(b)}$ との内積を取ると、時間軸の内積だけ符号が負になるため

$$
V^{(0)}=-g(V,e_{(0)}),\qquad
V^{(i)}=g(V,e_{(i)}).
$$

座標成分に直す場合は、$e_{(a)}=e_{(a)}^\mu\partial_\mu$ と書き、$g(V,e_{(a)})=g_{\mu\nu}V^\mu e_{(a)}^\nu$ を計算します。この式は「なぜ計量と枠ベクトルを掛けるのか」を示しており、行列をただ暗記する必要はありません。

<a id="def-gr4-measured-components"></a>

<!-- formal-statement-start -->
> **定義（観測者の測定成分・エネルギー・周波数）**  
> 上の局所直交枠に対し、$V\in T_pM$ の測定成分を $V^{(0)}=-g(V,e_{(0)})$ および $V^{(i)}=g(V,e_{(i)})$ と定める。未来向き時間的粒子の四元運動量 $P=mU$（$m>0$、$g(U,U)=-c^2$）について、観測エネルギーと三つの運動量成分を

$$
E_{(u)}=-g(P,u)=cP^{(0)},\qquad
p_{(i)}=g(P,e_{(i)})
$$

> と定める。未来向き非零光的な波数四ベクトル $K$（$g(K,K)=0$）について、角周波数を

$$
\omega_{(u)}=-g(K,u)>0
$$

> と定める。$K$ は位相が無次元となる規約の波数ベクトルで、$\omega$ の単位は $\mathrm{s}^{-1}$ である。光子一個のエネルギーは $E_\gamma=\hbar\omega_{(u)}$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr4-measured-components -->
**定義の確認**：速度 $3c/5$ の粒子。 前節のMinkowski静止枠を用い、四元速度と運動量を

$$
U=\left(\frac{5c}{4},\frac{3c}{4},0,0\right),
\qquad P=mU
$$

とします。[SREL3の四元速度の規格化](../../SREL/SREL3/index.md#thm-srel3-four-velocity)をGRの符号へ換えます。直接計算でも

$$
g(U,U)=-\frac{25c^2}{16}+\frac{9c^2}{16}=-c^2
$$

となり、$U^0>0$ なので未来向きです。成分射影により

$$
P^{(0)}=\frac{5mc}{4},\qquad
p_{(1)}=\frac{3mc}{4},\qquad
p_{(2)}=p_{(3)}=0,
\qquad E_{(u)}=\frac{5mc^2}{4}
$$

を得ます。計量の負号を落として $E=g(P,u)$ と書くと正のエネルギーになりません。

**光の直接例。** 同じ枠で $K=(\omega_0/c,\omega_0/c,0,0)$（$\omega_0>0$）なら $g(K,K)=0$ かつ未来向き・非零です。$-g(K,u)=-g(K,(c,0,0,0))=\omega_0$ となり、周波数の正値性と単位が確認できます。
<!-- definition-example-end -->

<a id="prop-gr4-components-invariant"></a>

<!-- formal-statement-start -->
> **命題（測定値の座標不変性と空間回転）**  
> 点 $p$ のベクトル $P,K,u$ と局所直交枠を固定すると、$-g(P,u)$、$-g(K,u)$、$g(P,e_{(i)})$ は座標の取り替えに依存しない。同じ観測者に対して空間軸だけ直交行列で変更しても、エネルギー・周波数および空間運動量の二乗和 $\sum_i p_{(i)}^2$ は変わらない。
<!-- formal-statement-end -->

### 証明の見取り図

計量による内積は座標変換で不変です。後半は空間三成分の直交変換がEuclid長さを保つことを直接展開します。

<!-- proof-start -->
### 証明

座標 $x^\mu$ を $y^\alpha$ に換えると、$P'^\alpha=(\partial y^\alpha/\partial x^\mu)P^\mu$、$u'^\beta=(\partial y^\beta/\partial x^\nu)u^\nu$、$g'_{\alpha\beta}=(\partial x^\rho/\partial y^\alpha)(\partial x^\sigma/\partial y^\beta)g_{\rho\sigma}$。Jacobi行列とその逆の積は恒等行列なので

$$
g'_{\alpha\beta}P'^\alpha u'^\beta
=g_{\rho\sigma}\delta^\rho_\mu\delta^\sigma_\nu P^\mu u^\nu
=g_{\mu\nu}P^\mu u^\nu.
$$

$P$ を $K$ や $e_{(i)}$ に換えても同じです。[GR2の計量の座標変換則](../GR2/index.md#prop-gr2-coordinate-invariance)をここでは具体的に縮約しました。

空間軸を $\widetilde e_{(i)}=\sum_j R_{ji}e_{(j)}$ とすると $\widetilde p_{(i)}=\sum_jR_{ji}p_{(j)}$。よって

$$
\sum_i\widetilde p_{(i)}^2
=\sum_{i,j,k}R_{ji}R_{ki}p_{(j)}p_{(k)}
=\sum_{j,k}\delta_{jk}p_{(j)}p_{(k)}
=\sum_jp_{(j)}^2.
$$

時間軸 $e_{(0)}=u/c$ は変更していないため、$E_{(u)}$ と $\omega_{(u)}$ は変わりません。$\square$
<!-- proof-end -->

## 3. 粒子の空間速度は、時計と物差しから出る

観測者が測る速度は、粒子の世界線の成分を時間・空間へ分けて得ます。同じ点 $p$ を通過する質量正の粒子の四元速度を $U$ とし、枠へ展開します。二つの未来向き時間的ベクトルの内積は負なので、係数

$$
\gamma_{\mathrm{rel}}=-\frac{g(U,u)}{c^2}>0
$$

を取れます。[LORG1の逆Cauchy–Schwarz不等式](../../../幾何系/LORG/LORG1/index.md#thm-lorg1-reverse-cauchy-schwarz)へ、規格化 $g(U,U)=g(u,u)=-c^2$ を代入すると $\gamma_{\mathrm{rel}}\ge1$ です。空間成分を $U^{(i)}$ と書くと

$$
U=\gamma_{\mathrm{rel}}u+\sum_iU^{(i)}e_{(i)}.
$$

ここで $\gamma_{\mathrm{rel}}$ で割った $v^{(i)}=U^{(i)}/\gamma_{\mathrm{rel}}$ を、観測者が測る三次元速度の成分とします。

<a id="prop-gr4-observer-speed"></a>

<!-- formal-statement-start -->
> **命題（相対Lorentz因子・測定速度・質量殻）**  
> 点 $p$ で正規化された未来向き四元速度 $u,U$ を持つ観測者と質量 $m>0$ の粒子を考え、$u$ の局所直交枠を選ぶ。$\gamma=-g(U,u)/c^2$、$v^{(i)}=g(U,e_{(i)})/\gamma$ とすると

$$
U=\gamma\left(u+\sum_{i=1}^3v^{(i)}e_{(i)}\right),\qquad
\gamma=\frac1{\sqrt{1-|\boldsymbol v|^2/c^2}},
\qquad |\boldsymbol v|<c.
$$

> また測定エネルギー $E$ と空間運動量 $\boldsymbol p$ は

$$
E=\gamma mc^2,\qquad p_{(i)}=\gamma m v^{(i)},\qquad
E^2=m^2c^4+c^2|\boldsymbol p|^2
$$

> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

局所直交枠で四元速度を分解し、自己内積 $-c^2$ に代入するだけで相対速度の上限が現れます。同じ分解に質量 $m$ を掛けるとエネルギー・運動量も得られます。

<!-- proof-start -->
### 証明

定義から $U^{(0)}=-g(U,e_{(0)})=-g(U,u)/c=c\gamma$。従って枠展開は $U=\gamma u+\sum_i\gamma v^{(i)}e_{(i)}$ です。これを自己内積へ入れると、時間・空間の交差項は零で、

$$
\begin{aligned}
-c^2=g(U,U)
&=\gamma^2g(u,u)+\gamma^2\sum_{i,j}v^{(i)}v^{(j)}\delta_{ij}\\
&=\gamma^2(-c^2+|\boldsymbol v|^2).
\end{aligned}
$$

$\gamma\ge1>0$ なので $c^2-|\boldsymbol v|^2=c^2/\gamma^2>0$。ここから $\gamma^2=1/(1-|\boldsymbol v|^2/c^2)$ と正の平方根が出ます。$P=mU$ と [測定量の定義](#def-gr4-measured-components)から $E=-g(mU,u)=\gamma mc^2$、$p_{(i)}=m\gamma v^{(i)}$。最後に

$$
\begin{aligned}
E^2-c^2|\boldsymbol p|^2
&=\gamma^2m^2c^4-\gamma^2m^2c^2|\boldsymbol v|^2\\
&=\gamma^2m^2c^4\left(1-\frac{|\boldsymbol v|^2}{c^2}\right)
=m^2c^4
\end{aligned}
$$

です。$\square$
<!-- proof-end -->

この計算は一点の接空間の計算なので、観測者が加速中か、自由落下中かを問いません。**瞬間的に測るエネルギー**と、**それを持って空間を移動するときのエネルギー変化**は別の問いです。

## 4. 光の向きとDoppler因子

光の周波数だけでなく入射方向も観測者に依存します。未来向きの非零光的 $K$ を枠へ分解すると、時間成分は $K^{(0)}=\omega_{(u)}/c$ です。光的条件 $g(K,K)=0$ を使えば空間成分の大きさはこれと同じになり、光の進行方向は長さ1の三次元ベクトルで表せます。

<a id="prop-gr4-photon-direction"></a>

<!-- formal-statement-start -->
> **命題（局所光線方向と観測周波数）**  
> 時間向き付きLorentz時空の点 $p$ で、未来向き非零光的な $K\in T_pM$ と正規化された未来向き四元速度 $u$ を取る。$u$ の局所直交枠において、$\omega=-g(K,u)>0$ とすると、唯一の単位三ベクトル $\boldsymbol n$ が存在し、

$$
K=\frac{\omega}{c}\left(e_{(0)}+\sum_{i=1}^3n^{(i)}e_{(i)}\right),
\qquad
n^{(i)}=\frac{c\,g(K,e_{(i)})}{\omega},
\qquad \sum_i(n^{(i)})^2=1
$$

> と表せる。$\boldsymbol n$ はその観測者に対する光の進行方向である。
<!-- formal-statement-end -->

### 証明の見取り図

時間係数を周波数から決め、残りの係数を空間軸との内積で決めます。光的条件が空間方向の単位長条件になります。

<!-- proof-start -->
### 証明

枠に関する展開を $K=K^{(0)}e_{(0)}+\sum_iK^{(i)}e_{(i)}$ と書きます。[測定成分の定義](#def-gr4-measured-components)から $K^{(0)}=-g(K,e_{(0)})=\omega/c$、$K^{(i)}=g(K,e_{(i)})$。$K$ は未来向き非零光的で $u$ は未来向き時間的なので $\omega>0$ です。そこで $n^{(i)}=cK^{(i)}/\omega$ と置くと展開式を得ます。さらに

$$
0=g(K,K)=-\frac{\omega^2}{c^2}
+\sum_i(K^{(i)})^2
=\frac{\omega^2}{c^2}\left(-1+\sum_i(n^{(i)})^2\right).
$$

$\omega\ne0$ だから $\sum_i(n^{(i)})^2=1$。枠は基底なので成分は一意です。$\square$
<!-- proof-end -->

<a id="prop-gr4-doppler"></a>

<!-- formal-statement-start -->
> **命題（同一事象での観測者間Doppler公式）**  
> 点 $p$ に未来向き非零光的な $K$ と二人の観測者 $u,w$ がいるとする。$u$ の局所直交枠で光の方向を $\boldsymbol n$、$w$ の相対速度を $\boldsymbol v$（$|\boldsymbol v|<c$）、Lorentz因子を $\gamma=(1-|\boldsymbol v|^2/c^2)^{-1/2}$ とすると、

$$
\omega_{(w)}=\gamma\,\omega_{(u)}
\left(1-\frac{\boldsymbol v\cdot\boldsymbol n}{c}\right)
$$

> が成り立つ。この式は同じ事象での比較であり、離れた観測者間の周波数比には光線の伝播則が別途必要である。
<!-- formal-statement-end -->

### 証明の見取り図

[相対速度による分解](#prop-gr4-observer-speed)を $w$ に、[光線方向による分解](#prop-gr4-photon-direction)を $K$ に適用し、計量で縮約します。

<!-- proof-start -->
### 証明

$u$ の枠で $w=\gamma(u+\sum_iv^{(i)}e_{(i)})$、$K=(\omega_{(u)}/c)(e_{(0)}+\sum_jn^{(j)}e_{(j)})$ です。$u=ce_{(0)}$、$g(e_{(0)},e_{(0)})=-1$、$g(e_{(i)},e_{(j)})=\delta_{ij}$ から

$$
\begin{aligned}
-g(K,w)
&=-\gamma\left[g(K,u)+\sum_i v^{(i)}g(K,e_{(i)})\right]\\
&=-\gamma\left[-\omega_{(u)}+
\frac{\omega_{(u)}}c\sum_i v^{(i)}n^{(i)}\right]\\
&=\gamma\omega_{(u)}
\left(1-\frac{\boldsymbol v\cdot\boldsymbol n}{c}\right).
\end{aligned}
$$

$|\boldsymbol v\cdot\boldsymbol n|\le|\boldsymbol v|<c$ なので右辺は正です。$\square$
<!-- proof-end -->

例えば光と同方向に遠ざかる観測者は $\omega_{(w)}=\gamma\omega_{(u)}(1-v/c)$ と小さく測り、光へ向かう観測者は $\gamma\omega_{(u)}(1+v/c)$ と大きく測ります。この変化は同じ一点でも起きるため、それ自体を重力赤方偏移と呼んではいけません。

## 5. Rindlerの静止観測者と自由落下観測者

[GR3のRindler計量と静止四元加速度](../GR3/index.md#prop-gr3-rindler-motion)を再利用します。ここだけ座標は $(t,x,y,z)$、$t$ の単位は秒として

$$
ds^2=-c^2N(x)^2dt^2+dx^2+dy^2+dz^2,\qquad
N(x)=1+\frac{a_0x}{c^2}>0,\quad a_0>0.
$$

静止する人の固有時は $d\tau=Ndt$ なので $u_{\mathrm S}=N^{-1}\partial_t$。基底を選ぶ際には $\partial_t$ の計量長さが $cN$ であることを用い、

$$
e_{(0)}=\frac1{cN}\partial_t,\qquad
e_{(1)}=\partial_x,\quad e_{(2)}=\partial_y,\quad
e_{(3)}=\partial_z
$$

とします。$g(e_{(0)},e_{(0)})=-1$、空間三軸のGram行列は $I_3$、交差項は零、$e_{(0)}=u_{\mathrm S}/c$。これで静止観測者の局所直交枠を直接確認できました。

光を表すアフィン接ベクトル $K^\mu=dx^\mu/d\lambda$ を波数の単位に規格化し、位相と整合する $k_\mu=g_{\mu\nu}K^\nu$ を用います。$t$ に依存しない計量では、[GR3の光的二次作用の停留条件](../GR3/index.md#prop-gr3-null-affine-action)から

$$
\frac{d}{d\lambda}k_t
=\frac12\partial_tg_{\mu\nu}K^\mu K^\nu=0.
$$

従って $k_t=-\Omega$（$\Omega>0$、角周波数の単位）を光線に沿う定数とできます。右向きの光の光的条件 $g^{\mu\nu}k_\mu k_\nu=0$ は

$$
-\frac{\Omega^2}{c^2N^2}+k_x^2=0
\quad\Longrightarrow\quad
k_x=\frac{\Omega}{cN},\qquad
K^t=\frac{\Omega}{c^2N^2}>0.
$$

局所測定は座標成分 $K^t$ ではなく内積です。

<a id="prop-gr4-rindler-frequency"></a>

<!-- formal-statement-start -->
> **命題（Rindlerの局所周波数と自由落下時のDoppler因子）**  
> 上のRindler領域で $t$ 増加方向の光的アフィン測地線 $K$ を考え、その保存された共変時間成分を $k_t=-\Omega<0$ とする。$x=x_*$ に静止する観測者の測定周波数は

$$
\omega_{\mathrm S}(x_*)=\frac{\Omega}{N(x_*)}.
$$

> 右向き光の通過事象で、静止枠に対し $x$ 負方向へ速さ $v=\beta c$（$0\le\beta<1$）で動く未来向きの自由落下観測者は、その瞬間に

$$
\omega_{\mathrm F}=\frac{\Omega}{N(x_*)}\,
\frac{1+\beta}{\sqrt{1-\beta^2}}
$$

> と測る。自由落下観測者の運動については、その事象を通る測地線の初期速度をこの値に選んだものとする。
<!-- formal-statement-end -->

### 証明の見取り図

静止する人の測定には保存共変成分 $k_t$ を固有時率で割ります。自由落下の人には、それと同じ事象でのDoppler公式を重ねます。

<!-- proof-start -->
### 証明

$u_{\mathrm S}^t=1/N$、$u_{\mathrm S}^x=0$ なので

$$
\omega_{\mathrm S}=-g(K,u_{\mathrm S})
=-k_tu_{\mathrm S}^t
=\frac{\Omega}{N}.
$$

右向き光では $g(K,e_{(1)})=k_x=\Omega/(cN)=\omega_{\mathrm S}/c$。従って[局所光線方向](#prop-gr4-photon-direction)は $n^{(1)}=1$ で他成分が零です。

自由落下観測者の瞬間四元速度を $u_{\mathrm F}=\gamma(u_{\mathrm S}-\beta c e_{(1)})$ と置きます。内積計算で $g(u_{\mathrm F},u_{\mathrm F})=\gamma^2(-c^2+\beta^2c^2)=-c^2$、未来向きであることも確認できます。時間的初速度から[GR3の測地線方程式](../GR3/index.md#thm-gr3-stationary-action)を局所的に解けば、その速度を持つ自由落下世界線が存在します（[LORG4の測地線の局所存在・一意性](../../../幾何系/LORG/LORG4/index.md#prop-lorg4-lorentz-exponential)）。[Doppler公式](#prop-gr4-doppler)へ $v^{(1)}=-\beta c$、$n^{(1)}=1$ を代入して

$$
\omega_{\mathrm F}=\gamma\omega_{\mathrm S}(1+\beta)
=\frac{\Omega(1+\beta)}{N\sqrt{1-\beta^2}}
$$

を得ます。$\square$
<!-- proof-end -->

静止観測者の四元加速度は[GR3の命題](../GR3/index.md#prop-gr3-rindler-motion)によって $a^x=a_0/N\ne0$、自由落下観測者の四元加速度は零です。それでも**二人は同じ事象で異なる周波数を測ります**。さらに異なる $x$ での静止観測者同士なら $\omega_{\mathrm S}(x_2)/\omega_{\mathrm S}(x_1)=N(x_1)/N(x_2)$ ですが、これは同一光線に沿う $k_t$ 保存を用いた別の比較です。Rindler時空そのものは平坦であり、周波数比だけから曲率の存在は推論できません。

## 6. 演習：観測値を座標から切り離す

以下では $g$ の符号は $(-,+,+,+)$。四元速度は $g(u,u)=-c^2$、光的波数四ベクトルは未来向き・非零とします。どの問題でも、使用する局所直交枠を明示してください。

### Level A

<a id="ex-gr4-a01"></a>
#### GR4-A01 Minkowskiの局所直交枠
- Level: A

$(ct,x,y,z)$、$g=\operatorname{diag}(-1,1,1,1)$ に対して、$u=c\partial_0$ と $e_{(a)}=\partial_a$ が局所直交枠をなすことを条件ごとに確認せよ。

<!-- solution-start -->
**詳細解答**。$g(u,u)=c^2g(\partial_0,\partial_0)=-c^2$、$u^0=c>0$ なので未来向きです。$u/c=\partial_0=e_{(0)}$。$g(e_{(0)},e_{(0)})=-1$、$g(e_{(0)},e_{(i)})=0$、$g(e_{(i)},e_{(j)})=\delta_{ij}$ は計量行列の各成分に一致します。四本は座標基底なので一次独立です。従って[局所直交枠の定義](#def-gr4-observer-frame)の全条件を満たします。
<!-- solution-end -->

<a id="ex-gr4-a02"></a>
#### GR4-A02 時間成分の負号
- Level: A

前問の枠で $P=(5mc/4,3mc/4,0,0)$（$m>0$）を測定し、$E$ と $p_{(1)}$ を求めよ。$P$ が未来向き時間的であることも確かめよ。

<!-- solution-start -->
**詳細解答**。$g(P,P)=-(25m^2c^2/16)+(9m^2c^2/16)=-m^2c^2<0$、$P^0>0$ だから未来向き時間的です。[測定成分の定義](#def-gr4-measured-components)を用い $P^{(0)}=-g(P,e_{(0)})=5mc/4$、$p_{(1)}=g(P,e_{(1)})=3mc/4$。従って $E=cP^{(0)}=5mc^2/4>0$。$g(P,u)=-5mc^2/4$ をそのままエネルギーとするのは誤りです。
<!-- solution-end -->

<a id="ex-gr4-a03"></a>
#### GR4-A03 観測者を変えた光の周波数
- Level: A

Minkowski静止枠で $K=(\omega_0/c,\omega_0/c,0,0)$、$w=\gamma(c,v,0,0)$（$0<v<c$、$\gamma=(1-v^2/c^2)^{-1/2}$）とする。$\omega_{(w)}$ を内積から直接求めよ。

<!-- solution-start -->
**詳細解答**。$g(K,K)=-(\omega_0/c)^2+(\omega_0/c)^2=0$、$K^0>0$、$g(w,w)=\gamma^2(-c^2+v^2)=-c^2$ です。観測定義を直接使うと

$$
\begin{aligned}
\omega_{(w)}&=-g(K,w)\\
&=-\left[-(\omega_0/c)(\gamma c)+(\omega_0/c)(\gamma v)\right]\\
&=\gamma\omega_0(1-v/c).
\end{aligned}
$$

これは[同一事象でのDoppler公式](#prop-gr4-doppler)と一致します。
<!-- solution-end -->

<a id="ex-gr4-a04"></a>
#### GR4-A04 光的方向の単位性
- Level: A

$K=(\omega/c)(1,3/5,4/5,0)$、$\omega>0$ をMinkowski静止枠で考える。光的条件、観測周波数、方向ベクトルを求めよ。

<!-- solution-start -->
**詳細解答**。$g(K,K)=(\omega/c)^2[-1+(3/5)^2+(4/5)^2]=0$、$K^0>0$ なので未来向き非零光的です。$u=c\partial_0$ に対して $-g(K,u)=\omega$。各空間軸との内積は $(3\omega/(5c),4\omega/(5c),0)$ だから[光線方向の命題](#prop-gr4-photon-direction)で $\boldsymbol n=(3/5,4/5,0)$、そのノルムは $9/25+16/25=1$ です。
<!-- solution-end -->

<a id="ex-gr4-a05"></a>
#### GR4-A05 空間軸を回しても変わらない量
- Level: A

空間二軸を $\widetilde e_{(1)}=\cos\theta\,e_{(1)}+\sin\theta\,e_{(2)}$、$\widetilde e_{(2)}=-\sin\theta\,e_{(1)}+\cos\theta\,e_{(2)}$ に換える。$p_{(1)}^2+p_{(2)}^2$ が不変であることを示せ。

<!-- solution-start -->
**詳細解答**。$a=p_{(1)},\,b=p_{(2)}$ と書けば、新成分は $\widetilde a=a\cos\theta+b\sin\theta$、$\widetilde b=-a\sin\theta+b\cos\theta$ です。二乗和の交差項は $2ab\cos\theta\sin\theta-2ab\sin\theta\cos\theta=0$、残りは $(a^2+b^2)(\cos^2\theta+\sin^2\theta)=a^2+b^2$。[空間回転不変性の命題](#prop-gr4-components-invariant)を平面回転で直接検算しました。
<!-- solution-end -->

### Level B

<a id="ex-gr4-b01"></a>
#### GR4-B01 エネルギーから測定速度を復元
- Level: B

ある観測者が質量 $m>0$ の粒子について $E=5mc^2/3$、$p_{(1)}=4mc/3$、他の空間運動量零を測った。質量殻、$\gamma$、測定速度を確認せよ。

<!-- solution-start -->
**詳細解答**。$E^2-c^2|\boldsymbol p|^2=(25/9-16/9)m^2c^4=m^2c^4$ で[質量殻の命題](#prop-gr4-observer-speed)に一致します。$E=\gamma mc^2$ より $\gamma=5/3$。$p_{(1)}=\gamma mv^{(1)}$ なので

$$
v^{(1)}=\frac{p_{(1)}}{\gamma m}
=\frac{(4mc/3)}{(5m/3)}=\frac{4c}{5}.
$$

$|v^{(1)}|<c$、さらに $(1-16/25)^{-1/2}=5/3$ で再確認できます。
<!-- solution-end -->

<a id="ex-gr4-b02"></a>
#### GR4-B02 静的計量の直交枠を構成する
- Level: B

$ds^2=-c^2N(x)^2dt^2+A(x)^2dx^2+dy^2+dz^2$（$N,A>0$）で静止観測者の $u$ と局所直交枠を作れ。$x$ 方向の空間ベクトル $Q=Q^x\partial_x$ の測定成分を求めよ。

<!-- solution-start -->
**詳細解答**。静止世界線では $dx=dy=dz=0$ だから $d\tau=Ndt$、よって $u=N^{-1}\partial_t$。時間軸を $e_{(0)}=u/c=(cN)^{-1}\partial_t$ とします。$g_{xx}=A^2$ なので $e_{(1)}=A^{-1}\partial_x$、残りは $e_{(2)}=\partial_y,e_{(3)}=\partial_z$。計量が対角であることから交差項は零、自己内積はそれぞれ $-1,1,1,1$ です。四本は $N,A>0$ により一次独立です。$Q^{(1)}=g(Q,e_{(1)})=A^2Q^x/A=AQ^x$、$Q^{(0)}=0$ です。座標成分 $Q^x$ と物差し成分 $AQ^x$ は一般に異なります。
<!-- solution-end -->

<a id="ex-gr4-b03"></a>
#### GR4-B03 Rindlerの周波数比と局所Doppler
- Level: B

Rindler領域の右向き光で $k_t=-\Omega$ とする。$N(x_1)=1$、$N(x_2)=2$ の二人の静止観測者が測る周波数比を求め、$x_2$ で光と逆向きに $v=3c/5$ で動く観測者が測る周波数も求めよ。

<!-- solution-start -->
**詳細解答**。[Rindler局所周波数の命題](#prop-gr4-rindler-frequency)で静止時計の値は $\omega_1=\Omega$、$\omega_2=\Omega/2$、従って $\omega_2/\omega_1=1/2$ です。$x_2$ で逆向きに動く観測者の相対速度は $v^{(1)}=-3c/5$、因子は $\gamma=(1-9/25)^{-1/2}=5/4$、光の進行方向は $n^{(1)}=1$ です。同一点の[Doppler公式](#prop-gr4-doppler)に代入すると

$$
\omega_{\mathrm move}=\frac54\frac{\Omega}{2}
\left(1+\frac35\right)=\Omega.
$$

静止観測者間の比 $1/2$ と、同一点の運動による因子 $2$ を別々に扱いました。
<!-- solution-end -->

<a id="ex-gr4-b04"></a>
#### GR4-B04 異なる座標で同じ周波数
- Level: B

Minkowskiで $K=(\omega_0/c,\omega_0/c,0,0)$ と $u=(c,0,0,0)$ を取る。線形座標変換 $y^0=x^0,\ y^1=2x^1$ を施し、新座標の計量と成分を用いて同じ $\omega_0$ が得られることを示せ。

<!-- solution-start -->
**詳細解答**。$dx^0=dy^0$、$dx^1=dy^1/2$ なので計量は $g'_{00}=-1,\ g'_{11}=1/4$、他の対角成分 $1$ です。ベクトル成分は $K'=(\omega_0/c,2\omega_0/c,0,0)$、$u'=(c,0,0,0)$。従って

$$
-g'_{\alpha\beta}K'^\alpha u'^\beta
=-[-(\omega_0/c)c]=\omega_0.
$$

さらに $g'(K',K')=-(\omega_0/c)^2+(1/4)(2\omega_0/c)^2=0$。[座標不変性の命題](#prop-gr4-components-invariant)の前提（正則な座標変換・同一ベクトル）も成り立ちます。新座標の $K'^1$ は二倍でも光の周波数は二倍ではありません。
<!-- solution-end -->

### Level C

<a id="ex-gr4-c01"></a>
#### GR4-C01 Rindlerでの時計・測定・自由落下を接続する
- Level: C

$ds^2=-c^2N(x)^2dt^2+dx^2$、$N=1+a_0x/c^2>0$ のRindler領域で、右向きの光的アフィン測地線が $k_t=-\Omega$（$\Omega>0$）を満たすとする。静止観測者の局所直交枠を定め、光の $k_x$ と測定周波数を求めよ。同じ事象で左向きに $v=4c/5$ で動く自由落下観測者の周波数を求めよ。最後に二人の四元加速度の違いと、結果からは曲率非零と判定できない理由を述べよ。

<!-- solution-start -->
**詳細解答**。静止時計では $d\tau=Ndt$、$u_{\mathrm S}=N^{-1}\partial_t$ なので $e_{(0)}=(cN)^{-1}\partial_t$、$e_{(1)}=\partial_x$ です。$g(e_{(0)},e_{(0)})=-1$、$g(e_{(1)},e_{(1)})=1$、交差項零で、局所直交枠の条件を満たします。

光的条件を共変成分で書けば

$$
0=g^{tt}k_t^2+g^{xx}k_x^2
=-\frac{\Omega^2}{c^2N^2}+k_x^2.
$$

右向きなので正の根を選び $k_x=\Omega/(cN)$。時間並進で計量係数が変わらず、[GR3の光的二次作用の停留条件](../GR3/index.md#prop-gr3-null-affine-action)から $dk_t/d\lambda=\tfrac12\partial_tg_{\mu\nu}K^\mu K^\nu=0$ であり、$\Omega$ は同一光線に沿って保存されます。

測定値は $-g(K,u_{\mathrm S})=-k_tu_{\mathrm S}^t=\Omega/N$。$k_x=\Omega/(cN)$ なので右向きの単位方向 $n^{(1)}=ck_x/\omega_{\mathrm S}=1$ です。

左向き観測者の相対速度は $v^{(1)}=-4c/5$、$\gamma=(1-16/25)^{-1/2}=5/3$ です。[局所Doppler公式](#prop-gr4-doppler)で

$$
\omega_{\mathrm F}
=\frac53\frac{\Omega}{N}\left(1+\frac45\right)
=\frac{3\Omega}{N}.
$$

$u_{\mathrm F}=\gamma(u_{\mathrm S}-(4c/5)e_{(1)})$ は $g(u_{\mathrm F},u_{\mathrm F})=-c^2$ で未来向きです。この初速度からの時間的測地線を取るので[GR3の四元加速度の定義](../GR3/index.md#def-gr3-four-acceleration)から自由落下者は $a_{\mathrm F}=0$ です。一方、静止者は[GR3の静止Rindler観測者の命題](../GR3/index.md#prop-gr3-rindler-motion)によって $a_{\mathrm S}^x=a_0/N\ne0$。座標静止と自由落下を混同してはいけません。Rindler計量はMinkowski領域の曲線座標表示なので曲率は零であり、非零Christoffel係数や観測値の違いだけでは曲率非零を示せません。
<!-- solution-end -->

## 7. 次の一歩

計量と観測者の運動があれば、一点での測定値は内積で決まることが分かりました。ただし枠を異なる点へ運ぶとき、近隣の自由落下者が相対的にどう近づき離れるかは、この章の一点の議論だけでは分かりません。次のGR5では、その問いを測地線偏差と潮汐力として扱います。
