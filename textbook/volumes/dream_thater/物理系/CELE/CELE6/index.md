# CELE6 ホモクリニック構造とHamiltonian chaos

<!-- definition-example-audit: strict -->

> **使う結果**：[CELE4の回転系Hamiltonian](../CELE4/index.md#prop-cele4-rotating-equations)、[CELE5の共鳴障害](../CELE5/index.md#prop-cele5-resonance-obstruction)、[INT7の第一帰還写像](../../../幾何系/INT/INT7/index.md#def-int7-return)、[DYN14の双曲線形模型](../../../解析系/DYN/DYN14/index.md#thm-dyn14-eigen-dichotomy)と[DYN13の二枝符号化](../../../解析系/DYN/DYN13/index.md#thm-dyn13-conjugacy)を足場にします。後二者は一般の非線形定理の証明ではありません。

## 1. 保存量の不存在と軌道の行き先は別の問い

前章では、特定の解析的第一積分が存在するための共鳴障害を調べました。では、円制限三体問題でJacobi定数を固定し、[Hill領域](../CELE4/index.md#def-cele4-hill-region)の細い首が開いたとき、粒子は必ず反対側へ移るでしょうか。そうではありません。通過可能性と実際の輸送は区別する必要があります。

二自由度のHamilton流を正則エネルギー面の二次元横断面で観察すると、[Poincaré第一帰還写像](../../../幾何系/INT/INT7/index.md#def-int7-return)が得られます。そこで不安定な周期軌道は双曲固定点となり、その点へ近づく軌道と、そこから遠ざかる軌道の幾何を見ることができます。両者が別の場所で**横断的に再会する**なら、繰り返し引き伸ばされ折り返される複雑な運動が生じます。

本章ではまず定義を丁寧に確認し、周期的に力を受ける振り子を二自由度Hamilton系へ拡張した**計算できる模型**で横断交差を確かめます。Smale–Birkhoffの一般定理の深い証明はこの章の既習結果には含まれないので、適用条件・そこからの論理・証明の射程を明示して用います。最後に制限三体問題で実際に証明するべき条件を整理します。

## 2. 双曲固定点から周期軌道の安定・不安定集合へ

平面の開集合上の $C^2$ 級微分同相 $P$ と、その固定点 $z_*$ を考えます。局所的な[線形双曲模型の固有方向分解](../../../解析系/DYN/DYN14/index.md#thm-dyn14-eigen-dichotomy)では一方向が縮み、他方が伸びます。しかし実際の $P$ は非線形なので、直線でなく曲がった軌道集合が現れます。

<a id="def-cele6-hyperbolic"></a>

<!-- formal-statement-start -->
> **定義（双曲固定点と周期軌道）**  
> $P:U\to P(U)$ を平面開集合の間の $C^2$ 級微分同相とし、$P(z_*)=z_*$ とする。$DP(z_*)$ のいずれの固有値も絶対値が $1$ でないとき、$z_*$ を双曲固定点と呼ぶ。固有値が実数 $\lambda_s,\lambda_u$ で
>
$$
0<|\lambda_s|<1<|\lambda_u|
$$
>
> を満たす場合は鞍型の双曲固定点という。自律Hamilton流の周期軌道が横断面に作る帰還写像の鞍型固定点も、以下で扱う周期軌道の双曲性を表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cele6-hyperbolic -->

**直接例**。$D(x,y)=(2x,y/2)$ は原点を固定し、微分行列は $\operatorname{diag}(2,1/2)$ です。固有値 $2,1/2$ がそれぞれ拡大・収縮を与えます。$(0,y)$ は前方に原点へ、$(x,0)$ は後方に原点へ近づきます。これは[対角模型の安定・不安定方向](../../../解析系/DYN/DYN14/index.md#thm-dyn14-diagonal-directions)の具体例です。

<!-- definition-example-end -->

<a id="def-cele6-stable-unstable"></a>

<!-- formal-statement-start -->
> **定義（安定集合・不安定集合）**  
> $P$ を平面上で両側反復が定義される $C^2$ 級微分同相、$z_*$ をその固定点とする。前方と後方で $z_*$ へ収束する点の集合を、それぞれ
>
$$
W^s(z_*)=\{z:P^n(z)\to z_*\ (n\to+\infty)\},
$$
>
$$
W^u(z_*)=\{z:P^{-n}(z)\to z_*\ (n\to+\infty)\}
$$
>
> とする。局所的に定義した写像では、該当する全反復が定義される点に制限する。これらを安定集合・不安定集合と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cele6-stable-unstable -->

**定義の確認**。上の $D$ では $D^n(x,y)=(2^nx,2^{-n}y)$ です。前方に両成分が零へ収束する必要十分条件は $x=0$、後方では $y=0$ です。よって $W^s(0)=\{(0,y)\}$、$W^u(0)=\{(x,0)\}$。面積保存であっても、一般の点の距離が縮むわけではありません。

<!-- definition-example-end -->

非線形でも滑らかな曲線として局所安定集合が実現するには、別途、**非線形安定多様体定理**が必要です。以下の計算模型で使う次の存在・滑らかなパラメータ依存性は、非線形双曲力学の定理として明示的に仮定します。DYN14の線形計算がその証明を与えるわけではありません。

<a id="ref-cele6-stable-manifold-input"></a>

<!-- formal-statement-start -->
> **外部定理として使用する入力（局所安定多様体定理）**  
> $P_\varepsilon$ を平面の $C^r$ 級微分同相の $C^r$ 級一パラメータ族（$r\ge3$）とし、$\varepsilon=0$ で鞍型双曲固定点 $z_0$ を持つとする。十分小さい $\varepsilon$ で固定点 $z_\varepsilon$ が存続し、$z_\varepsilon$ の局所安定・不安定集合は対応する固有方向に接する $C^{r-1}$ 級曲線となる。適切な局所区間上でこれらの曲線は $\varepsilon$ とともに少なくとも $C^1$ 級に変化する。
<!-- formal-statement-end -->

この外部定理の一般証明にはgraph transformと指数二分性の解析が必要です。本章の独立証明の対象とはせず、**ここが仮定ではなく外部から借りる深い定理である**と区別します。後で再会点があれば、その存在だけを線形固有値から推測せず、交差の横断性を別に検査します。

## 3. ホモクリニック交差はどんな交差か

同一の双曲固定点へ過去にも未来にも近づく軌道を考えます。このとき交差が接するだけか、二本の曲線が異なる接方向で交わるかが決定的です。

<a id="def-cele6-homoclinic"></a>

<!-- formal-statement-start -->
> **定義（ホモクリニック点と横断性）**  
> $P$ を平面 $C^2$ 級微分同相、$z_*$ を鞍型双曲固定点とし、$W^s(z_*),W^u(z_*)$ が一次元 $C^1$ 級曲線として定義される部分で考える。$z\ne z_*$ が
>
$$
z\in W^s(z_*)\cap W^u(z_*)
$$
>
> を満たすとき $z$ をホモクリニック点という。さらに
>
$$
T_zW^s(z_*)+T_zW^u(z_*)=\mathbb R^2
$$
>
> なら横断ホモクリニック点という。二つの接線が一致する場合は横断的でない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cele6-homoclinic -->

**定義の確認**。二つの曲線が局所的に $y=0$ と $y=x$ なら接ベクトル $(1,0),(1,1)$ の行列式は $1$ ですから横断的です。一方 $y=0$ と $y=x^2$ は原点で交わっても接線が同じで、横断ではありません。これらは曲線の**局所形状だけ**の例であって、何らかの写像の安定・不安定多様体だという主張ではありません。

<!-- definition-example-end -->

<a id="prop-cele6-homoclinic-iterate"></a>

<!-- formal-statement-start -->
> **命題（ホモクリニック軌道の反復と横断性の保存）**  
> $P$ を平面 $C^2$ 級微分同相、$z_*$ を鞍型双曲固定点、$z\ne z_*$ を安定・不安定曲線が定義された横断ホモクリニック点とする。任意の整数 $k$ について $P^kz$ は横断ホモクリニック点であり、$P^kz\to z_*$ は $k\to\pm\infty$ の両方向で成立する。
<!-- formal-statement-end -->

### 証明の見取り図

収束は定義から、横断性は微分同相の微分が二つの異なる接方向を二つの異なる接方向へ写すことから出ます。

<!-- proof-start -->
### 証明

$z\in W^s(z_*)$ より $P^{n+k}z\to z_*$ が $n\to+\infty$ で成立します。$z\in W^u(z_*)$ より $P^{-n+k}z\to z_*$ も成立します。従って各 $P^kz$ は両集合に入り、かつ $P^kz\ne z_*$ です（$P$ が単射だからです）。

$P$ は微分同相なので $DP^k_z$ は可逆です。曲線の像の接空間は

$$
T_{P^kz}W^{s/u}(z_*)=DP^k_z(T_zW^{s/u}(z_*))
$$

です。元の二つの接空間の和は $\mathbb R^2$ なので

$$
DP^k_z(T_zW^s+T_zW^u)
=DP^k_z(\mathbb R^2)=\mathbb R^2.
$$

これが各反復点での横断性です。最後の両側収束は安定・不安定集合の定義そのものです。
<!-- proof-end -->

横断点が一つ見つかれば、その反復が固定点の近傍へ両側から無限回戻ります。ただし、**交点が無限個あることだけ**で任意の記号列が実現するとはまだ言えません。次のhorseshoe構成には、拡大・収縮と折り返しを一つの不変集合へ閉じ込める定理が必要です。

## 4. 計算できるHamilton模型：強制振り子の分離曲線

初めから三体の重力場で交差を厳密証明するのは困難です。まず一次摂動を手で積分できる模型を調べ、どこまでが計算、どこからが定理の適用かを分離します。

角度 $q\in\mathbb T=\mathbb R/2\pi\mathbb Z$ と運動量 $p\in\mathbb R$ を用い、無摂動振り子を

$$
H_0(q,p)=\frac{p^2}{2}+\cos q
$$

とします。$q=0,p=0$ はポテンシャルの極大に対応し、Hamilton方程式は

$$
\dot q=p,\qquad \dot p=\sin q.
$$

線形化は $\dot q=p,\ \dot p=q$、従って固有値は $+1,-1$ です。

<a id="prop-cele6-pendulum-separatrix"></a>

<!-- formal-statement-start -->
> **命題（振り子のホモクリニック分離曲線）**  
> $H_0(q,p)=p^2/2+\cos q$ を円周上のHamilton系とする。関数
>
$$
q_0(t)=4\arctan(e^t)\pmod{2\pi},\qquad
p_0(t)=2\operatorname{sech}t
$$
>
> はエネルギー $H_0=1$ の軌道で、$(q_0(t),p_0(t))\to(0,0)$ が $t\to\pm\infty$ の両方で成り立つ。ここで $\operatorname{sech}t=1/\cosh t$ である。$q_0(0)=\pi,\ p_0(0)=2$。
<!-- formal-statement-end -->

### 証明の見取り図

無摂動では、安定枝と不安定枝は同じエネルギー $1$ の分離曲線上で重なります。円周では $q=0$ と $q=2\pi$ が同じ点です。この重なりが周期摂動で割れるかを後で測ります。

<!-- proof-start -->
### 証明

$u=e^t$ とおき、連鎖律で微分すると

$$
\frac{dq_0}{dt}=4\frac{u}{1+u^2}
=\frac{4}{e^{-t}+e^t}=2\operatorname{sech}t=p_0(t).
$$

続いて $\operatorname{sech}'t=-\operatorname{sech}t\tanh t$ なので

$$
\frac{dp_0}{dt}=-2\operatorname{sech}t\tanh t.
$$

四倍角の恒等式、または $q_0/2=2\arctan(e^t)$ から

$$
\sin q_0(t)=-2\operatorname{sech}t\tanh t,\qquad
\cos q_0(t)=1-2\operatorname{sech}^2t
$$

を得ます。よって両Hamilton方程式が成立し、

$$
H_0(q_0,p_0)=2\operatorname{sech}^2t+
1-2\operatorname{sech}^2t=1.
$$

$t\to-\infty$ では $q_0\to0$、$t\to+\infty$ では $q_0\to2\pi\equiv0$、どちらも $p_0\to0$ です。$t=0$ では $4\arctan1=\pi$、$\operatorname{sech}0=1$ です。
<!-- proof-end -->

時間周期的な摂動を加えます。周期の逆数に当たる $\omega>0$ を固定して

$$
H_\varepsilon(q,p,t)=\frac{p^2}{2}+\cos q+
\varepsilon\cos q\cos(\omega t)
$$

とします。$t$ に陽に依存するので、$H_\varepsilon$ 自身は一般には保存しません。ただし位相 $\phi\in\mathbb T$ とその共役作用 $J\in\mathbb R$ を増やせば、自律二自由度Hamiltonian

$$
\mathcal H_\varepsilon(q,p,\phi,J)
=\frac{p^2}{2}+\cos q+
\varepsilon\cos q\cos\phi+\omega J
$$

になります。Hamilton方程式から $\dot\phi=\partial_J\mathcal H_\varepsilon=\omega$ なので、$\phi=\omega t+\phi_0$ です。$\phi=0$ の断面の一周時間は $T=2\pi/\omega$ と固定され、その帰還写像は $(q,p)$ 上の面積保存写像です（[第一帰還写像の面積保存](../../../幾何系/INT/INT7/index.md#prop-int7-return-area)）。

<a id="prop-cele6-hyperbolic-persistence"></a>

<!-- formal-statement-start -->
> **命題（強制振り子の鞍型周期軌道）**  
> $\omega>0$ を固定する。上記の $\mathcal H_\varepsilon$ で $\varepsilon=0$ の周期軌道 $(q,p)=(0,0)$、$\phi=\omega t$ に対応する時間 $T=2\pi/\omega$ 写像の固定点は鞍型で、乗数は $e^T,e^{-T}$ である。十分小さい $|\varepsilon|$ で、この固定点は唯一の近傍固定点として存続し鞍型である。
<!-- formal-statement-end -->

### 証明の見取り図

固定点の存続だけなら陰関数定理で示せます。非線形の安定曲線の存在まで陰関数定理だけで導けるわけではありません。

<!-- proof-start -->
### 証明

$\varepsilon=0$ の $(q,p)=(0,0)$ 周りの変分方程式は

$$
\frac{d}{dt}\binom{\delta q}{\delta p}
=\begin{pmatrix}0&1\\1&0\end{pmatrix}
\binom{\delta q}{\delta p}.
$$

固有ベクトル $(1,1),(1,-1)$ の固有値はそれぞれ $+1,-1$。従って時間 $T$ 写像の微分の固有値は $e^T,e^{-T}$ です。$e^T\ne1$ かつ $e^{-T}\ne1$ だから $D(P_0-\operatorname{id})$ は可逆です。Hamilton方程式の解は初期値・$\varepsilon$ に滑らかに依存するので、陰関数定理を $P_\varepsilon(z)-z=0$ に適用すると $\varepsilon=0$ 近傍で一意の固定点 $z_\varepsilon$ を得ます。微分行列の固有値は小摂動で $e^{\pm T}$ の近くに残るので、一つが単位円内、他方が単位円外です。
<!-- proof-end -->

この模型では実は $q=p=0$ は任意の $\varepsilon$ で厳密解です。$\dot p=(1+\varepsilon\cos\omega t)\sin q$ が零だからです。したがって存続点はそのまま原点で、微分方程式の係数は周期的になります。

## 5. Melnikov積分で枝のずれを測る

摂動がなければ二枝は分離曲線として重なりました。摂動後に $\phi=0$ の断面で二枝が横断交差するかを判定するため、軌道上の**無摂動エネルギー** $H_0$ の変化を計算します。

まず $H_1(q,t)=\cos q\cos(\omega t)$ とおくと、Hamilton方程式を直接代入して

$$
\frac{dH_0}{dt}
=(\partial_qH_0)\dot q+(\partial_pH_0)\dot p
=\varepsilon p\sin q\cos(\omega t).
$$

時刻位相 $\tau$ をずらした無摂動ホモクリニック軌道で一次項を積分するのがMelnikov積分です。

<a id="def-cele6-melnikov"></a>

<!-- formal-statement-start -->
> **定義（この模型のMelnikov関数）**  
> $\omega>0$、$q_0(t)=4\arctan(e^t)$、$p_0(t)=2\operatorname{sech}t$ とする。強制振り子 $H_\varepsilon=H_0+\varepsilon\cos q\cos(\omega t)$ の一次分離量を
>
$$
M(\tau)=\int_{-\infty}^{\infty}
p_0(s)\sin q_0(s)\cos(\omega(s+\tau))\,ds
$$
>
> と定義する。$\tau$ は無摂動軌道が強制位相に対してどれだけずれているかを表す。この積分は被積分関数が指数減衰するため絶対収束する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cele6-melnikov -->

**定義の確認**。$\tau=0$ では $p_0(s)\sin q_0(s)$ は奇関数、$\cos(\omega s)$ は偶関数なので積分は零です。しかしこれは枝が**横断的に**交わる証明ではありません。零点で $M'(\tau)\ne0$ も調べる必要があります。

<!-- definition-example-end -->

<a id="thm-cele6-melnikov-computation"></a>

<!-- formal-statement-start -->
> **定理（強制振り子のMelnikov関数と単純零点）**  
> 上記の模型について
>
$$
M(\tau)=2\omega A(\omega)\sin(\omega\tau),
\qquad
A(\omega)=\int_{-\infty}^{\infty}
\operatorname{sech}^2s\cos(\omega s)\,ds.
$$
>
> $A$ は連続で $A(0)=2$ だから、ある $\omega_0>0$ が存在し、$0<\omega<\omega_0$ なら $M(0)=0$、$M'(0)=2\omega^2 A(\omega)>0$。従って $\tau=0$ は単純零点である。
<!-- formal-statement-end -->

### 証明の見取り図

分離曲線を代入したあと、$\operatorname{sech}^2$ の導関数が現れます。部分積分を一度行えば奇偶性によって $\sin(\omega\tau)$ だけが残ります。特定のFourier積分を既知公式として引用しなくても、**十分小さい正の周波数**では単純零点を証明できます。

<!-- proof-start -->
### 証明

[分離曲線の公式](#prop-cele6-pendulum-separatrix)から

$$
p_0(s)\sin q_0(s)
=-4\operatorname{sech}^2s\tanh s
=2\frac{d}{ds}(\operatorname{sech}^2s)
$$

です。よって積分境界で $\operatorname{sech}^2s\to0$ であることを使い、

$$
\begin{aligned}
M(\tau)
&=2\int_{-\infty}^{\infty}
(\operatorname{sech}^2s)'\cos(\omega(s+\tau))\,ds\\
&=2\omega\int_{-\infty}^{\infty}
\operatorname{sech}^2s\sin(\omega(s+\tau))\,ds.
\end{aligned}
$$

加法公式で正弦を展開します。$\operatorname{sech}^2s\sin(\omega s)$ は奇関数なので積分が消え、偶関数の余弦の項だけが残ります。

$$
M(\tau)=2\omega\sin(\omega\tau)
\int_{-\infty}^{\infty}\operatorname{sech}^2s\cos(\omega s)\,ds.
$$

$|\operatorname{sech}^2s\cos(\omega s)|\le\operatorname{sech}^2s$ で右辺は積分可能です。優収束により $A(\omega)\to A(0)$ が $\omega\to0$ で成立します。さらに

$$
A(0)=\int_{-\infty}^{\infty}\operatorname{sech}^2s\,ds
=[\tanh s]_{-\infty}^{\infty}=2.
$$

従って十分小さい正の $\omega$ では $A(\omega)>0$ です。$\tau$ で微分すると

$$
M'(\tau)=2\omega^2A(\omega)\cos(\omega\tau),
\qquad M'(0)=2\omega^2A(\omega)>0.
$$
<!-- proof-end -->

**単純零点から横断交差へ進むための追加条件**を省略してはいけません。非線形安定多様体定理の滑らかなパラメータ依存性を使って、安定枝・不安定枝が共通の横断面 $q=\pi$ に交わる位置を $p_s(\tau,\varepsilon),p_u(\tau,\varepsilon)$ と表せるとします。$p_s,p_u$ は $\varepsilon=0$ でともに $2$ であり、局所的に

$$
H_0(\pi,p_u)-H_0(\pi,p_s)
=\varepsilon M(\tau)+O(\varepsilon^2)
$$

が $\tau$ に関して $C^1$ 一様に成り立ちます。この展開の一次係数は、安定枝について未来に向かって積分したエネルギー変化に負号を付け、不安定枝について過去から現在まで積分した変化を引き算することで、全実数の[Melnikov積分](#def-cele6-melnikov)となります。無摂動鞍点では $\nabla H_0(0,0)=0$ なので、摂動された周期解の $H_0$ と $1$ の差は一次項を持ちません。

<a id="prop-cele6-melnikov-transversality"></a>

<!-- formal-statement-start -->
> **命題（分離量の単純零点から横断交差へ）**  
> 強制振り子の小摂動で、安定枝と不安定枝の断面位置が $C^1$ 級にパラメータ依存し、上記のエネルギー差の展開が $\tau$ に関して $C^1$ 一様に成立するとする。ある $\tau_*$ で $M(\tau_*)=0$ かつ $M'(\tau_*)\ne0$ なら、十分小さい非零 $\varepsilon$ に対し、$\tau_*$ に近い位相で両枝は横断的に交わる。
<!-- formal-statement-end -->

### 証明の見取り図

エネルギー差を $\varepsilon$ で割ってから陰関数定理を使います。断面上では $p$ が $2$ の近くにあるので、エネルギー差の位相微分が非零であれば二曲線の接線は異なります。

<!-- proof-start -->
### 証明

$D(\tau,\varepsilon)=H_0(\pi,p_u)-H_0(\pi,p_s)$ とおきます。仮定した $C^1$ 一様展開より

$$
\frac{D(\tau,\varepsilon)}{\varepsilon}
=M(\tau)+O(\varepsilon)
$$

が $\tau$ に関して $C^1$ 一様に成り立ちます。$M(\tau_*)=0$、$M'(\tau_*)\ne0$ なので、$\tau_*$ の十分小さい固定区間の両端では $M$ の符号が逆になり、区間内では $M'$ は零になりません。$\varepsilon$ が十分小さければ $D/\varepsilon$ も両端で符号が逆になり、区間内で $\partial_\tau(D/\varepsilon)$ は非零のままです。中間値の定理により一意の零点 $\tau_\varepsilon$ が存在し、$\tau_\varepsilon\to\tau_*$、かつ $\partial_\tau D(\tau_\varepsilon,\varepsilon)\ne0$ です。

$q=\pi$ では $H_0(\pi,p)=p^2/2-1$ です。従って

$$
D=\frac12(p_u^2-p_s^2)
=(p_u-p_s)\frac{p_u+p_s}{2}.
$$

両 $p$ は $2$ に近い正値なので、$D=0$ は $p_u=p_s$ と同値です。交点で $\partial_\tau D$ が非零なら、上式を微分したとき $p_u-p_s=0$ の項が消え、

$$
\partial_\tau D
=p_u(\partial_\tau p_u-\partial_\tau p_s)\ne0.
$$

したがって $(\tau,p_u(\tau))$ と $(\tau,p_s(\tau))$ の接線は異なり横断的に交わります。
<!-- proof-end -->

この命題の結論は単純零点の計算だけでなく、**二枝が存在し一様展開できること**を必要とします。今回の滑らかな強制振り子は非線形安定多様体定理とそのパラメータ依存版の仮定を満たすため、十分小さい $\varepsilon\ne0$、$0<\omega<\omega_0$ で横断ホモクリニック点が得られます。ここで使用した非線形定理の一般証明は本章では扱っていません。

## 6. 横断交差からhorseshoeへ進む論理の境界

ここまでで明示したのは**横断ホモクリニック点の存在**です。そこから任意の二進記号列が現れるという主張は、新しい一般定理です。

<a id="ref-cele6-smale-birkhoff"></a>

<!-- formal-statement-start -->
> **外部定理（Smale–Birkhoffのホモクリニック定理）**  
> $P$ を二次元多様体上の $C^2$ 級微分同相、$z_*$ を鞍型双曲固定点とする。$z_*$ と異なる横断ホモクリニック点が存在すれば、ある整数 $N\ge1$ とコンパクトな $P^N$ 不変の双曲集合 $\Lambda$ が存在し、$P^N|_\Lambda$ は二記号の**両側**全シフトと位相共役になる。
<!-- formal-statement-end -->

この定理は本章では**意図的な黒箱**です。証明には局所安定多様体定理、homoclinic $\lambda$-lemma、細い帯の横断反復、双曲的な入れ子長方形の構成が必要です。DYN13で証明済みなのは、**区間の二枝縮小逆写像から片側全シフトを構成する定理**であり、ここに述べた平面の両側全シフトの結論を証明したものではありません。DYN14はさらに線形の場合だけを扱います。この相違を前提にして、一般定理の仮定・結論だけを借ります。

### 何を仮定として確認したか

1. 強制振り子の時間 $T$ 写像は $C^2$ 級微分同相である。Hamilton流の存在する有界なホモクリニック軌道の近傍に制限する。
2. [鞍型固定点](#prop-cele6-hyperbolic-persistence)は $e^{\pm T}$ から小摂動で存続する。
3. [Melnikov計算](#thm-cele6-melnikov-computation)が単純零点を持ち、[分離曲線の命題](#prop-cele6-melnikov-transversality)と安定多様体の滑らかな依存性から、非固定の横断交点が得られる。

これらが整った後に初めてSmale–Birkhoffの結論を適用します。$P$ の全位相空間がシフトに共役になるのではありません。**一部のコンパクト不変集合 $\Lambda$** で、**ある反復 $P^N$** がシフトと共役になるという結論です。

<a id="prop-cele6-symbolic-consequences"></a>

<!-- formal-statement-start -->
> **命題（二記号horseshoeから導く複雑さ）**  
> コンパクト集合 $\Lambda$ 上の写像 $P^N$ が二記号の両側全シフト $\sigma$ と位相共役であるとする。このとき $\Lambda$ 上の $(P^N)^m$ の固定点は任意の $m\ge1$ についてちょうど $2^m$ 個ある。また $\Lambda$ には任意の長さの指定された有限記号列を実現する軌道があり、異なる無限記号列で区別される非周期軌道もある。
<!-- formal-statement-end -->

### 証明の見取り図

共役は軌道を一対一で対応させ、周期性を保存します。二進列は $m$ 桁を選ぶだけで $m$ 回シフト不変になるので、ちょうど $2^m$ 通りです。

<!-- proof-start -->
### 証明

両側列空間を $\Sigma_2=\{0,1\}^{\mathbb Z}$、共役を $h:\Sigma_2\to\Lambda$ とし、$P^N\circ h=h\circ\sigma$ とします。$m$ 回適用すると

$$
(P^N)^m\circ h=h\circ\sigma^m.
$$

$\sigma^ms=s$ なら $s_{k+m}=s_k$ がすべての $k\in\mathbb Z$ で成立します。その列は $s_0,\ldots,s_{m-1}$ の $m$ 個の二値で一意に決まり、選択肢は $2^m$ 個です。$h$ は全単射なので、対応する固定点も $2^m$ 個です。

指定有限語を両側の任意の列へ拡張し $h$ で写せば、その有限旅程を実現します。また非周期列（例えば非負整数の平方数位置だけを $1$ にする列）を選べば、共役により非周期軌道が得られます。
<!-- proof-end -->

[DYN13の区間horseshoeの周期点構成](../../../解析系/DYN/DYN13/index.md#prop-dyn13-periodic)と似ていますが、ここでは過去と未来の**両側**列を符号化し、帰還写像の一部の不変集合に対する結果です。

## 7. ローブ輸送：面積保存でも混合が起こる

二つの枝が複数回交わると、断面上に安定枝と不安定枝で囲まれた細長い領域ができます。これを**ローブ**と呼んで輸送を追うのがturnstileの考え方です。交差点を番号順に結ぶだけで任意の閉曲線が輸送境界になるわけではないため、単純な状況に限定します。

<a id="def-cele6-lobe"></a>

<!-- formal-statement-start -->
> **定義（単純なローブ）**  
> 面積保存 $C^1$ 微分同相 $P$ の安定・不安定曲線が異なる二つの横断交点 $a,b$ で交わり、その間の安定枝と不安定枝が端点以外で交わらず、一つの単純閉曲線を作るとする。この閉曲線が囲む有界領域をローブ $L$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cele6-lobe -->

**定義の確認**。ある $q\in[a,b]$ の区間で二枝が $p_s(q)<p_u(q)$ の二つのグラフなら、端点では同じ値で内部では大小が厳密です。この間の領域は単純なローブで、面積は正です。片側で再交差してグラフが入れ替わる場合には区間を適切に切ってから定義し直します。

<!-- definition-example-end -->

<a id="prop-cele6-lobe-area"></a>

<!-- formal-statement-start -->
> **命題（ローブ面積の保存とグラフ表示）**  
> $P$ が面積形式 $dq\wedge dp$ を保存し、単純なローブ $L$ が有限面積を持つとする。このとき $\operatorname{area}(P(L))=\operatorname{area}(L)$ である。さらに $L=\{(q,p):a<q<b,\ p_s(q)<p<p_u(q)\}$ と表せる場合、
>
$$
\operatorname{area}(L)=\int_a^b[p_u(q)-p_s(q)]\,dq
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

横切る点集合の面積は保存されても、ローブが移動して占める**場所**は変わります。これがHamilton流での混合と面積保存が両立する理由です。

<!-- proof-start -->
### 証明

[帰還写像の面積保存](../../../幾何系/INT/INT7/index.md#prop-int7-return-area)より $P^*(dq\wedge dp)=dq\wedge dp$ です。変数変換公式を領域 $L$ に適用して

$$
\operatorname{area}(P(L))
=\int_{P(L)}dq\,dp
=\int_L P^*(dq\wedge dp)
=\operatorname{area}(L).
$$

グラフ表示がある場合、垂直な切片の長さは $p_u(q)-p_s(q)$ です。Fubiniの反復積分を用いれば

$$
\operatorname{area}(L)
=\int_a^b\left(\int_{p_s(q)}^{p_u(q)}dp\right)dq
=\int_a^b[p_u(q)-p_s(q)]\,dq.
$$
<!-- proof-end -->

実際の円制限三体問題では、[Jacobi積分](../CELE4/index.md#prop-cele4-jacobi-integral)で定まるエネルギー面、Lagrange点近くの周期軌道、そこでのPoincaré断面と帰還領域を特定します。次にその周期軌道の双曲性と、安定・不安定曲線の**横断交差が実際に存在すること**を証明または検証しなければなりません。**首が開いた**、**周期軌道が不安定**、**数値断面が複雑に見える**、の三事実だけでは横断ホモクリニック点の存在は結論できません。模型のMelnikov計算を、三体問題の未計算の摂動項へそのまま移すこともできません。

## 8. 演習と詳細解答

### Level A

<a id="ex-cele6-a01"></a>
**A1. 線形写像の安定・不安定集合。** $P(x,y)=(3x,y/4)$ の原点に関する安定集合、不安定集合を全整数反復から求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $P^n(x,y)=(3^nx,4^{-n}y)$。$n\to+\infty$ で原点へ収束するには $x=0$ が必要十分で、$n\to-\infty$ では $y=0$ が必要十分です。従って[安定・不安定集合の定義](#def-cele6-stable-unstable)から

$$
W^s(0)=\{(0,y):y\in\mathbb R\},\qquad
W^u(0)=\{(x,0):x\in\mathbb R\}.
$$
<!-- solution-end -->

<a id="ex-cele6-a02"></a>
**A2. 接線の横断性。** 原点を通る二つの $C^1$ 曲線の接ベクトルが $(1,2)$ と $(2,1)$ である。横断か判定し、第二のベクトルが $(2,4)$ ならどうなるか述べよ。

- Level: A

<!-- solution-start -->
**詳細解答。** 二ベクトルを列に持つ行列の行列式は $1\cdot1-2\cdot2=-3\ne0$ なので接空間の和は平面全体です。[横断性の定義](#def-cele6-homoclinic)の接空間条件を満たします。$(2,4)=2(1,2)$ なら行列式は零で、二接線は一致します。交点があるだけでは横断性は言えません。
<!-- solution-end -->

<a id="ex-cele6-a03"></a>
**A3. 分離曲線の中点。** $q_0(t)=4\arctan e^t$、$p_0(t)=2\operatorname{sech}t$ について $t=0$ の位置・運動量・エネルギーを求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $e^0=1$、$\arctan1=\pi/4$ から $q_0(0)=\pi$、$\operatorname{sech}0=1$ から $p_0(0)=2$ です。従って

$$
H_0(\pi,2)=\frac{2^2}{2}+\cos\pi=2-1=1.
$$

これは[分離曲線の命題](#prop-cele6-pendulum-separatrix)で証明した全時刻の保存エネルギーと一致します。
<!-- solution-end -->

<a id="ex-cele6-a04"></a>
**A4. Melnikov関数の奇偶性。** $f(s)=\operatorname{sech}^2s$ とし、$\int_{\mathbb R}f(s)\sin(\omega(s+\tau))\,ds$ を $A(\omega)=\int_{\mathbb R}f(s)\cos(\omega s)\,ds$ で表せ。

- Level: A

<!-- solution-start -->
**詳細解答。** 正弦加法公式を使うと

$$
\sin(\omega(s+\tau))
=\sin(\omega s)\cos(\omega\tau)+
\cos(\omega s)\sin(\omega\tau).
$$

$f$ は偶関数なので第一項の積分は奇関数の積分として零です。第二項の積分は $A(\omega)\sin(\omega\tau)$ です。従って求める値はその積です。[Melnikov関数の計算](#thm-cele6-melnikov-computation)の奇偶性処理を再現できました。
<!-- solution-end -->

<a id="ex-cele6-a05"></a>
**A5. 単純零点の確認。** $M(\tau)=c\sin(\omega\tau)$、$c,\omega>0$ の $\tau=0$ が単純零点であることを確認せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** 直接 $M(0)=c\sin0=0$ です。微分して $M'(\tau)=c\omega\cos(\omega\tau)$、よって $M'(0)=c\omega>0$ です。値が零で導関数が非零なので単純零点です。ただしこれは分離量の展開が成立するという仮定なしにはホモクリニック点の存在を意味しません。
<!-- solution-end -->

### Level B

<a id="ex-cele6-b01"></a>
**B1. 周期写像の乗数。** 線形系 $\dot q=p,\ \dot p=q$ について一般解を固有方向から求め、時間 $T>0$ 写像が双曲鞍型である理由を示せ。

- Level: B

<!-- solution-start -->
**詳細解答。** $v_+=(1,1)$、$v_-=(1,-1)$ は係数行列の固有ベクトルで、固有値はそれぞれ $1,-1$ です。初期ベクトルを $a v_++b v_-$ と分解すると

$$
\binom{q(t)}{p(t)}
=ae^t\binom11+be^{-t}\binom1{-1}.
$$

従って時間 $T$ 写像は $v_+$ に沿い $e^T>1$ 倍、$v_-$ に沿い $0<e^{-T}<1$ 倍です。双方の絶対値が $1$ でないので[双曲鞍型の定義](#def-cele6-hyperbolic)を満たします。固定点存続には $e^{\pm T}-1\ne0$ による陰関数定理を使えます。
<!-- solution-end -->

<a id="ex-cele6-b02"></a>
**B2. 積分の符号を追う。** $H_\varepsilon=H_0+\varepsilon\cos q\cos(\omega t)$ とする。$dH_0/dt$ をHamilton方程式で求め、分離曲線に代入して $M(\tau)$ の部分積分前後を導け。

- Level: B

<!-- solution-start -->
**詳細解答。** $\partial_qH_0=-\sin q$、$\partial_pH_0=p$、$\dot q=p$、$\dot p=\sin q+\varepsilon\sin q\cos(\omega t)$ です。従って

$$
\begin{aligned}
\frac{dH_0}{dt}
&=-\sin q\cdot p+
p(\sin q+\varepsilon\sin q\cos(\omega t))\\
&=\varepsilon p\sin q\cos(\omega t).
\end{aligned}
$$

[分離曲線](#prop-cele6-pendulum-separatrix)に代入して $p_0\sin q_0=-4\operatorname{sech}^2s\tanh s=2(\operatorname{sech}^2s)'$ とする。部分積分では境界項が零なので

$$
M(\tau)=2\int_{\mathbb R}(\operatorname{sech}^2s)'
\cos(\omega(s+\tau))\,ds
=2\omega\int_{\mathbb R}\operatorname{sech}^2s\sin(\omega(s+\tau))\,ds.
$$

これが[Melnikov定理](#thm-cele6-melnikov-computation)の符号を含む式です。
<!-- solution-end -->

<a id="ex-cele6-b03"></a>
**B3. 分離量と横断性。** 二本の曲線 $p_u(\tau,\varepsilon),p_s(\tau,\varepsilon)$ が $p=2$ 付近にあり、$D(\tau,\varepsilon)=H_0(\pi,p_u)-H_0(\pi,p_s)$ とする。ある零点で $\partial_\tau D\ne0$ なら交差が横断的であることを証明せよ。

- Level: B

<!-- solution-start -->
**詳細解答。** $H_0(\pi,p)=p^2/2-1$ なので

$$
D=\frac12(p_u-p_s)(p_u+p_s).
$$

$p_u+p_s$ は $4$ に近く零でないため、$D=0$ は $p_u=p_s$ と同値です。微分して

$$
\partial_\tau D
=\frac12(\partial_\tau p_u-\partial_\tau p_s)(p_u+p_s)
+\frac12(p_u-p_s)(\partial_\tau p_u+\partial_\tau p_s).
$$

交点で第二項は消え、第一項が非零なら $\partial_\tau p_u\ne\partial_\tau p_s$。よって二つのグラフの接線 $(1,\partial_\tau p_u)$、$(1,\partial_\tau p_s)$ は異なり、[横断性の定義](#def-cele6-homoclinic)を満たします。
<!-- solution-end -->

<a id="ex-cele6-b04"></a>
**B4. シフトと周期を混同しない。** ある $P^N|_\Lambda$ が二記号両側全シフトと共役なら、$(P^N)^3$ の固定点数、最小周期が3の点数、および $P$ の固定点数について何が言えるか。

- Level: B

<!-- solution-start -->
**詳細解答。** [二記号horseshoeの命題](#prop-cele6-symbolic-consequences)より $(P^N)^3$ の固定点数は $2^3=8$ です。最小周期1の点は定数列 $000\cdots,111\cdots$ の2点、3の正の約数は1と3だけなので最小周期3の点は $8-2=6$ 点です。一方これらは $P^N$ に対する周期の情報です。$P$ 自身の固定点が8点あるとは言えず、$P$ の周期と $P^N$ の周期を取り違えてはいけません。
<!-- solution-end -->

### Level C

<a id="ex-cele6-c01"></a>
**C1. 強制振り子から輸送とカオスまで。** $H_\varepsilon=p^2/2+\cos q+\varepsilon\cos q\cos(\omega t)$ を考え、$0<\omega<\omega_0$ とする。

1. 自律二自由度Hamiltonianへ拡張し、断面帰還時間を示せ。
2. 無摂動周期点の鞍型乗数を導け。
3. 分離曲線からMelnikov関数を計算し、単純零点を証明せよ。
4. 横断ホモクリニック点からhorseshoeを導く際に、どこで外部定理が要るかを二段階に分けて明記せよ。
5. 面積保存であることと複雑な輸送が両立する理由を示せ。

- Level: C

<!-- solution-start -->
**詳細解答。**

1. 位相 $\phi$ と共役変数 $J$ を加え、$\mathcal H_\varepsilon=p^2/2+\cos q+\varepsilon\cos q\cos\phi+\omega J$ とする。$\dot\phi=\omega>0$ なので $\phi=0$ への第一帰還時間は $T=2\pi/\omega$。二自由度の自律Hamilton流を断面へ制限した写像は[面積保存](../../../幾何系/INT/INT7/index.md#prop-int7-return-area)です。
2. $\varepsilon=0$ で $\dot q=p,\dot p=q$ の変分方程式を解く。固有値 $+1,-1$ に沿った時間 $T$ 乗数は $e^{T},e^{-T}$ なので鞍型です。
3. [分離曲線](#prop-cele6-pendulum-separatrix)上で $p_0\sin q_0=-4\operatorname{sech}^2s\tanh s=2(\operatorname{sech}^2s)'$。部分積分し奇関数を消すと

$$
M(\tau)=2\omega A(\omega)\sin(\omega\tau),\quad
A(\omega)=\int_{\mathbb R}\operatorname{sech}^2s\cos(\omega s)\,ds.
$$

$A(0)=2$ で連続なので十分小さい正の $\omega$ では $A(\omega)>0$、従って $M(0)=0,\ M'(0)=2\omega^2A(\omega)>0$ です。

4. **第1段階**：曲線 $W^s,W^u$ の存在・滑らかな依存性および $D=\varepsilon M+O(\varepsilon^2)$ の $C^1$ 一様展開に、非線形安定多様体定理を用います。この条件を満たして初めて[分離量の単純零点から横断交差への命題](#prop-cele6-melnikov-transversality)を適用できます。**第2段階**：横断交点からコンパクトなhorseshoeを得るには[Smale–Birkhoffの外部定理](#ref-cele6-smale-birkhoff)を使います。DYN14の線形模型だけでもDYN13の区間模型だけでもこの一般定理は証明できません。
5. 断面写像は面積を保存するため、[ローブ面積保存命題](#prop-cele6-lobe-area)から $\operatorname{area}(P(L))=\operatorname{area}(L)$ です。しかし $P(L)$ は元の $L$ と異なる場所へ延びたり、薄い形に変形したりします。**面積が不変**という性質は**位置・形が不変**という主張ではないので、交差による輸送と矛盾しません。
<!-- solution-end -->

## 9. 天体力学へ戻るための点検

[CELE4の共線Lagrange点の不安定性](../CELE4/index.md#thm-cele4-collinear-instability)は、局所で伸びる方向があることを示します。しかし実際の周期軌道へ拡張し、指定したエネルギー面上の断面で双曲的な帰還点を得たうえで、安定・不安定枝の**同じエネルギー面での横断交差**を示す仕事が別に残ります。円制限三体問題ではその検証に解析的近似、精度を制御した数値積分、境界値問題、区間演算などを使う場合があります。単なる数値プロットは厳密な存在証明ではありません。

今回の結論は次のように切り分けられます。強制振り子の**分離曲線とMelnikov関数の式**、単純零点、分離量からの横断判定、符号化後の周期点数・ローブ面積は本文で証明しました。一方、**一般非線形安定多様体定理**と**Smale–Birkhoffの平面horseshoe構成**は本章では外部定理として明示した黒箱です。それらの証明がCELE5やDYN14にあるかのような参照はしません。

次章CELE7では、こうしたカオスの存在と、同じHamiltonianの別領域に残るKAMトーラス・共鳴島とが矛盾しないことを調べます。
