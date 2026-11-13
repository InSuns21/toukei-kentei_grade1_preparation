# RBD16 姿勢の数値積分と保存量の監査

<!-- definition-example-audit: strict -->

[RBD7 の Newton–Euler 方程式](../RBD7/index.md#thm-rbd7-newton-euler)は角速度の時間発展を、[RBD3 の角速度と姿勢の関係](../RBD3/index.md#prop-rbd3-angular-conjugacy)は物体の向きの時間発展を定めます。しかし、微分方程式が正しくても、計算機上で一歩ずつ進めた行列が回転でなくなったり、外力がないのに回転エネルギーが増えたりします。「それらしい回り方」が描けることは数値解の検証にはなりません。

ここでは**同じ初期値問題を異なる数値更新法で解き、回転行列の幾何学的条件と力学的収支を別々に監査する**方法を学びます。無トルクの場合と外トルクを与えた場合を区別します。姿勢は物体系の成分を空間系へ移す能動回転 $R$、四元数はスカラー先頭の Hamilton積、角速度は物体系 $\omega_b$ という [RBD5 の規約](../RBD5/index.md#thm-rbd5-attitude-ode)を一貫して使用します。

## 1. 運動方程式と監査する量を一つにする

質量が一定で、重心まわりの物体系慣性テンソル $J_b$ が時間一定・対称正定値の剛体を考えます。実数の時間区間 $0\le t\le T$ で、姿勢 $R(t)\in SO(3)$、物体角速度 $\omega_b(t)\in\mathbb R^3$、重心まわりの物体系外トルク $\tau_b(t,R,\omega_b)$ を用います。$\widehat v$ は $\widehat v x=v\times x$ を満たす反対称行列で、[RBD3 の定義](../RBD3/index.md#def-rbd3-angular-velocity)に従います。

[RBD7 の Euler 方程式](../RBD7/index.md#thm-rbd7-newton-euler)と [RBD3 の姿勢微分式](../RBD3/index.md#prop-rbd3-angular-conjugacy)を連結すると、初期値問題は

$$
\boxed{\dot R=R\widehat{\omega}_b,\qquad
\dot\omega_b=J_b^{-1}\{\tau_b-\omega_b\times(J_b\omega_b)\}}
$$

です。$J_b$ の正定値性により逆行列が存在します。初期値 $R(0)=R_0\in SO(3)$ と $\omega_b(0)=\omega_0$ を与えます。局所 Lipschitz 条件を満たすトルクと有界な軌道を仮定すれば、通常の常微分方程式の理論で数値積分する区間上の解を扱えます。無トルクでは $\tau_b=0$ です。

[ODE4 の保存量の定義](../../../解析系/ODE/ODE4/index.md#def-ode4-first-integral)を踏まえ、運動の途中で値を変えない量を保存量と呼びます。ここでは**運動方程式が満たすべき物理的関係**と、**姿勢の表示が満たすべき幾何学的関係**を別の検査量にします。行列の Frobenius ノルム $\lVert A\rVert_F=\sqrt{\sum_{i,j}A_{ij}^2}$ は各成分の平方を足した長さです。時刻 $t$ までにトルクがした仕事を $W(t)$、空間系の角力積を $K_s(t)$ と呼びます。これらは実際の時間積分であって、一般には零ではありません。

<a id="def-rbd16-diagnostics"></a>

<!-- formal-statement-start -->
### 定義（姿勢と力学の数値監査量）

$J_b$ は三次元の時間一定・対称正定値行列、$R(0)\in SO(3)$ とする。角速度 $\omega_b$、外トルク $\tau_b$ に対し

$$
E=\frac12\omega_b^{\mathsf T}J_b\omega_b,\qquad
L_s=RJ_b\omega_b,\qquad
W(t)=\int_0^t\tau_b(u)\cdot\omega_b(u)\,du,
$$

$$
K_s(t)=\int_0^tR(u)\tau_b(u)\,du
$$

をそれぞれ回転運動エネルギー、空間角運動量、回転仕事、空間角力積とする。数値的に求めた $R,\omega_b$ の診断量として

$$
\epsilon_{\rm orth}=\lVert R^{\mathsf T}R-I_3\rVert_F,\quad
\epsilon_{\rm det}=|\det R-1|,
$$

$$
\mathcal B_E=E(t)-E(0)-W(t),\qquad
\mathcal B_L=L_s(t)-L_s(0)-K_s(t)
$$

を定義する。無トルクなら $W=K_s=0$、したがって $E-E(0)$ と $L_s-L_s(0)$ が直接の保存量残差となる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-rbd16-diagnostics -->
### 直接例：主軸回転の四つの監査量

**定義の確認**：$J_b=\operatorname{diag}(2,3,4)$、$R_0=I_3$、$\omega_0=e_3$、$\tau_b=0$ とします。$J_b\omega_0=4e_3$ で、そのベクトルと $\omega_0$ のベクトル積は零です。したがって $\omega_b(t)=e_3$ が Euler 方程式を満たし、$R(t)=R_z(t)$ は [RBD2 の回転行列](../RBD2/index.md#thm-rbd2-rodrigues)です。$R_z(t)e_3=e_3$ なので

$$
E(t)=\frac12(1)(4)=2,\quad L_s(t)=4e_3,\quad W=0,\quad K_s=0.
$$

さらに $R_z(t)^{\mathsf T}R_z(t)=I_3$、$\det R_z(t)=1$ だから $\epsilon_{\rm orth}=\epsilon_{\rm det}=0$、$\mathcal B_E=0$、$\mathcal B_L=0$ です。**幾何・エネルギー・角運動量をそれぞれ元の定義へ戻って確認**しました。ここで $2+3\ge4$ であり、主慣性値は [RBD6 の三角不等式](../RBD6/index.md#prop-rbd6-inertia-triangle)にも反しません。
<!-- definition-example-end -->

## 2. なぜこの収支が正しいか

保存量を監査するには、まず**連続時間の真の方程式**について何が保存されるかを証明しなければなりません。外トルクのある場合に $E(t)=E(0)$ を要求するのは、数値誤差ではなく物理法則の取り違えです。

<a id="thm-rbd16-work-impulse"></a>

<!-- formal-statement-start -->
### 定理（Euler方程式における仕事と角力積の収支）

$J_b$ は対称正定値・時間一定、$R(t)\in SO(3)$、$\omega_b(t)$ は $C^1$ 級、$\tau_b(t)$ は連続とする。$R,\omega_b$ が本講 §1 の連結した運動方程式を満たすなら

$$
\boxed{\frac{dE}{dt}=\tau_b\cdot\omega_b,\qquad
\frac{dL_s}{dt}=R\tau_b.}
$$

従って任意の $t\in[0,T]$ で $\mathcal B_E=0$、$\mathcal B_L=0$ となる。特に $\tau_b=0$ なら $E$、**空間ベクトル $L_s$ 自身**、その長さ $\lVert L_s\rVert$ は一定である。
<!-- formal-statement-end -->

### 証明の見取り図

[RBD7 の Euler 方程式](../RBD7/index.md#thm-rbd7-newton-euler)をエネルギーでは $\omega_b$ と内積し、角運動量では [RBD3 の回転基底の微分](../RBD3/index.md#prop-rbd3-angular-conjugacy)に代入します。外積の内積が零になる場所を確認しましょう。

<!-- proof-start -->
### 証明

$J_b=J_b^{\mathsf T}$ は一定なので積の微分は

$$
\frac{dE}{dt}
=\frac12\{\dot\omega_b^{\mathsf T}J_b\omega_b+
\omega_b^{\mathsf T}J_b\dot\omega_b\}
=\omega_b\cdot(J_b\dot\omega_b).
$$

Euler 方程式の $J_b\dot\omega_b=\tau_b-\omega_b\times(J_b\omega_b)$ を代入すると

$$
\frac{dE}{dt}
=\omega_b\cdot\tau_b-
\underbrace{\omega_b\cdot(\omega_b\times J_b\omega_b)}_{0}
=\omega_b\cdot\tau_b.
$$

角運動量は $L_s=RJ_b\omega_b$ であり、$R$ も時間依存するから

$$
\begin{aligned}
\frac{dL_s}{dt}
&=\dot R J_b\omega_b+RJ_b\dot\omega_b\\
&=R\{\widehat{\omega}_bJ_b\omega_b+J_b\dot\omega_b\}\\
&=R\{\omega_b\times(J_b\omega_b)+\tau_b-\omega_b\times(J_b\omega_b)\}\\
&=R\tau_b.
\end{aligned}
$$

二式を $0$ から $t$ まで積分すると定義中の $W,K_s$ がそれぞれ現れ、$\mathcal B_E=0,\ \mathcal B_L=0$ となります。$\tau_b=0$ なら $\dot L_s=0$ であり、$\frac d{dt}\lVert L_s\rVert^2=2L_s\cdot\dot L_s=0$ です。逆に、一般の外トルクでは $E$ や $\lVert L_s\rVert$ の保存は帰結しません。
<!-- proof-end -->

空間トルクは $\tau_s=R\tau_b$、空間角速度は $\omega_s=R\omega_b$ です。$R$ が直交行列なので $\tau_s\cdot\omega_s=\tau_b\cdot\omega_b$ となり、仕事率はどちらの座標系で計算しても同じです。**角力積は空間系ベクトルを積分**し、物体系の $\tau_b$ をそのまま時間積分して $L_s$ の変化にしてはいけません。

## 3. 陽的 Euler 更新の落とし穴

一段の長さを $h>0$、時刻を $t_n=nh$、数値状態を $(R_n,\omega_n)$ と書きます。陽的 Euler 更新は右辺をステップの始点で評価して

$$
f(t,R,\omega)=J_b^{-1}\{\tau_b(t,R,\omega)-\omega\times(J_b\omega)\},
$$

$$
R_{n+1}=R_n(I_3+h\widehat{\omega}_n),\qquad
\omega_{n+1}=\omega_n+h f(t_n,R_n,\omega_n)
$$

と進めます。連続時間で $R^{\mathsf T}R=I_3$ だからといって、離散後も同じとは限りません。

<a id="prop-rbd16-euler-orthogonality"></a>

<!-- formal-statement-start -->
### 命題（行列Euler更新の直交性破れ）

$R_n\in SO(3)$、$\omega_n\in\mathbb R^3$、$h>0$ に対する行列 Euler の一段更新 $R_{n+1}=R_n(I_3+h\widehat{\omega}_n)$ では

$$
\boxed{R_{n+1}^{\mathsf T}R_{n+1}
=I_3+h^2(\lVert\omega_n\rVert^2I_3-\omega_n\omega_n^{\mathsf T}),}
$$

$$
\boxed{\det R_{n+1}=1+h^2\lVert\omega_n\rVert^2.}
$$

従って $\omega_n\ne0$ なら $R_{n+1}\notin SO(3)$ であり、一段後の直交残差は $\sqrt2 h^2\lVert\omega_n\rVert^2$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

反対称性とベクトル三重積から $\widehat\omega^2=\omega\omega^{\mathsf T}-\lVert\omega\rVert^2I_3$ を得ます。行列式は $\omega$ 方向と直交二次元平面での作用を分けて計算します。

<!-- proof-start -->
### 証明

$A=\widehat{\omega}_n$ とします。$A^{\mathsf T}=-A$、$R_n^{\mathsf T}R_n=I_3$ なので

$$
\begin{aligned}
R_{n+1}^{\mathsf T}R_{n+1}
&=(I_3+hA)^{\mathsf T}(I_3+hA)\\
&=I_3+h(A+A^{\mathsf T})+h^2A^{\mathsf T}A\\
&=I_3-h^2A^2.
\end{aligned}
$$

任意の $x$ に $A^2x=\omega_n\times(\omega_n\times x)
=\omega_n(\omega_n\cdot x)-\lVert\omega_n\rVert^2x$ を適用すると第一式です。$\omega_n\ne0$ で単位ベクトル $u=\omega_n/\lVert\omega_n\rVert$ とその垂直な直交二方向を基底に取ると、$A$ は $u$ 方向で零、直交平面で

$$
\begin{pmatrix}0&-\lVert\omega_n\rVert\\
\lVert\omega_n\rVert&0\end{pmatrix}
$$

となります。よって $\det(I_3+hA)=1+h^2\lVert\omega_n\rVert^2$ です。$\omega_n=0$ でも式は成立します。残差行列は $u$ 方向に固有値 $0$、垂直二方向にともに $h^2\lVert\omega_n\rVert^2$ を持つので、Frobenius ノルムは $\sqrt{0^2+2h^4\lVert\omega_n\rVert^4}=\sqrt2h^2\lVert\omega_n\rVert^2$ です。
<!-- proof-end -->

**直接計算**として $R_0=I_3$、$\omega_0=e_3$、$h=0.1$ を代入すると

$$
R_1=\begin{pmatrix}1&-0.1&0\\0.1&1&0\\0&0&1\end{pmatrix},
\quad
R_1^{\mathsf T}R_1=\operatorname{diag}(1.01,1.01,1),
\quad \det R_1=1.01.
$$

これはまさに回転のつもりで $x,y$ 方向を $1.01$ 倍の二乗長に伸ばしています。時間刻みを小さくすると欠陥は小さくなりますが、**一段あたりの小さい誤差が、何段も反復して消えるわけではありません**。

## 4. 姿勢を回転として保つ更新

行列に微小増分を足す代わりに、毎段の変化自体を正しい回転として構成できます。[RBD5 の単位四元数による姿勢](../RBD5/index.md#def-rbd5-attitude)では $\lVert q\rVert=1$ を保てば $R(q)\in SO(3)$ です。別の方法として、[RBD2 の Rodrigues 公式](../RBD2/index.md#thm-rbd2-rodrigues)から反対称行列の指数を計算できます。

同じ時刻の $\omega_n$ を使っても、四元数更新には**ノルム修正**が、指数更新には**有限回転そのもの**が現れます。角速度側も高精度にするには、始点の傾きだけでなく中点を用いる工夫が必要です。

<a id="def-rbd16-updates"></a>

<!-- formal-statement-start -->
### 定義（姿勢の三種類の一段更新）

前節の初期値問題について $h>0$ とする。以下を区別する。

1. **行列 Euler 更新**：角速度と姿勢を

$
\omega_{n+1}=\omega_n+hf(t_n,R_n,\omega_n),\qquad
R_{n+1}=R_n(I_3+h\widehat{\omega}_n)
$

と更新する。

2. **正規化四元数 Euler 更新**：$q_n$ を $R(q_n)=R_n$ を満たす単位四元数とする。[RBD5 の単位四元数と物体角速度の時間発展](../RBD5/index.md#thm-rbd5-attitude-ode)に基づき、

$
\widetilde q_{n+1}=q_n+\frac h2q_n\otimes(0,\omega_n),\qquad
q_{n+1}=\frac{\widetilde q_{n+1}}{\lVert\widetilde q_{n+1}\rVert}
$

とし、角速度は上記の Euler 更新と同じ式で計算する。

3. **指数中点更新**：角速度の中点近似と中点姿勢を

$
\omega_{n+1/2}=\omega_n+\frac h2f(t_n,R_n,\omega_n),\qquad
R_{n+1/2}=R_n\exp\left(\frac h2\widehat{\omega}_n\right)
$

で定める。外トルクが姿勢に依存する場合もこの $R_{n+1/2}$ を用い、

$
\begin{aligned}
\omega_{n+1}&=\omega_n+h f(t_n+h/2,R_{n+1/2},\omega_{n+1/2}),\\
R_{n+1}&=R_n\exp\left(h\widehat{\omega}_{n+1/2}\right)
\end{aligned}
$

と更新する。

指数は $a=h\lVert v\rVert$ とし、$v\ne0$ について

$
\exp(h\widehat v)
=I_3+\frac{\sin a}{\lVert v\rVert}\widehat v
+\frac{1-\cos a}{\lVert v\rVert^2}\widehat v^2
$

で計算する。$v=0$ では $\exp(h\widehat v)=I_3$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-rbd16-updates -->
### 直接例：同じ $z$ 軸回転を一段進める

**各更新条件を検算**します。$R_0=I_3$、$q_0=(1,0)$、$\omega_0=e_3$、$h=0.2$、$J_b=\operatorname{diag}(2,3,4)$、$\tau_b=0$ とします。Euler 方程式の右辺は $\omega_0\times J_b\omega_0=0$ だから、始点と中点で角速度は $e_3$ のままです。

行列 Euler は $I_3+0.2\widehat e_3$ で、直交性を失います。四元数 Euler の未正規化値は $(1,0.1e_3)$、ノルム二乗は $1.01$、従って $q_1=(1,0.1e_3)/\sqrt{1.01}$ は長さ1です。指数中点法は Rodrigues 公式により $R_1=R_z(0.2)$ となり、正しい回転です。四元数の回転角は $2\arctan(0.1)$ で $0.2$ よりわずかに小さく、**単位ノルムだけでは位相誤差が消えない**と分かります。
<!-- definition-example-end -->

<a id="thm-rbd16-geometry-preservation"></a>

<!-- formal-statement-start -->
### 定理（四元数正規化と指数更新の姿勢保存）

$R_n\in SO(3)$、$\lVert q_n\rVert=1$、$h>0$ とし、$\omega_n,\omega_{n+1/2}$ は有限な三次元実ベクトルとする。前節の正規化四元数更新と指数更新はそれぞれ

$
\lVert q_{n+1}\rVert=1,\qquad R(q_{n+1})\in SO(3),
$

$
R_{n+1}=R_n\exp(h\widehat{\omega}_{n+1/2})\in SO(3)
$

を満たす。ただし、これは**姿勢幾何の保存**であり、離散エネルギーや離散角運動量の厳密保存を意味しない。
<!-- formal-statement-end -->

### 証明の見取り図

四元数ではノルム乗法性で更新前の長さを計算し、指数では反対称行列の指数が直交行列かつ行列式1であることを Rodrigues 公式から示します。

<!-- proof-start -->
### 証明

[RBD5 のノルムの乗法性](../RBD5/index.md#prop-rbd5-norm-product)により、$q_n$ と $q_n\otimes(0,\omega_n)$ の実四次元内積は零です。実際、$q_n^*\otimes(q_n\otimes(0,\omega_n))=(0,\omega_n)$ のスカラー成分は零です。ゆえに

$$
\lVert\widetilde q_{n+1}\rVert^2
=\lVert q_n\rVert^2+\frac{h^2}4\lVert q_n\otimes(0,\omega_n)\rVert^2
=1+\frac{h^2}4\lVert\omega_n\rVert^2>0.
$$

零でないから正規化が定義でき、長さ1となります。[RBD5 の単位四元数の回転公式と軸角表示](../RBD5/index.md#thm-rbd5-rodrigues)により $R(q_{n+1})$ は直交・行列式1です。

指数更新では $\Omega=\widehat{\omega}_{n+1/2}$ は反対称なので、$S(t)=\exp(t\Omega)$ の微分は $\dot S=S\Omega$ です。積の微分より

$$
\frac d{dt}(S^{\mathsf T}S)
=\Omega^{\mathsf T}S^{\mathsf T}S+S^{\mathsf T}S\Omega.
$$

$S(0)=I_3$ のもとで $S^{\mathsf T}S=I_3$ はこの方程式を満たし、成分ごとの線形初期値問題の一意性から全 $t$ で成立します。行列式は連続で $+1$ または $-1$ しか取れず、初期値が $+1$ だから常に $+1$。従って $R_nS(h)\in SO(3)$ です。この証明に力学的な $E,L_s$ の条件は現れないため、それらの離散保存までは主張できません。
<!-- proof-end -->

## 5. 刻み幅半減で数値解を試す

数値解の**収束次数**とは、同じ初期値と同じ最終時刻 $T$ で刻み幅 $h$ を小さくしたとき、厳密解との差がおおむね $h^p$ に比例する場合の指数 $p$ です。刻み幅半減で誤差はおおむね $2^p$ 分の1になります。ただし極めて小さい $h$ では丸め誤差、長い時刻では力学的感度が優勢になることもあります。

行列 Euler は一段更新の Taylor 展開で $R(t+h)=R(t)+h\dot R(t)+O(h^2)$ を近似し、角速度 Euler も同じ精度です。正規化四元数 Euler は、未正規化量の長さが $1+O(h^2)$ なので元の Euler 更新を $O(h^2)$ だけ変え、大域一位のままです。指数中点法では $R$ と $\omega$ の両方について $h^2$ の項まで一致します。

<a id="prop-rbd16-convergence"></a>

<!-- formal-statement-start -->
### 命題（滑らかな軌道での刻み幅収束次数）

有限区間 $[0,T]$ で厳密解が必要な次数まで滑らかであり、$J_b$ は正定値、トルクを含む初期値問題の右辺関数とその必要な導関数が解の近傍で有界・局所 Lipschitz とする。十分小さい一定刻み幅 $h=T/N$ を用い、数値解が同じ有界近傍にとどまるとき、行列 Euler 更新および正規化四元数 Euler 更新の状態誤差は一般に $O(h)$、指数中点法は $O(h^2)$ である。ここで四元数の誤差は $q$ と $-q$ を同じ姿勢とみなす。軌道依存の定数は $T$ に依存し、任意の長時間で一様とは限らない。
<!-- formal-statement-end -->

### 証明の見取り図

一段の局所誤差を Taylor 展開で求めます。初期値を同じにし、各段で生じる誤差に数値更新の Lipschitz 増幅を掛けた漸化式を合計すると、大域で一つ次数が下がります。

<!-- proof-start -->
### 証明

$\Omega(t)=\widehat{\omega_b(t)}$ とすると、$\dot R=R\Omega$ をもう一度微分して $\ddot R=R(\Omega^2+\dot\Omega)$ です。よって

$$
R(t+h)=R(t)\{I_3+h\Omega+\tfrac12h^2(\Omega^2+\dot\Omega)\}+O(h^3).
$$

一方 $\omega_{n+1/2}=\omega(t)+\frac h2\dot\omega(t)+O(h^2)$ なので

$$
\begin{aligned}
\exp(h\widehat{\omega}_{n+1/2})
&=I_3+h\Omega+\tfrac12h^2\dot\Omega+\tfrac12h^2\Omega^2+O(h^3).
\end{aligned}
$$

これは $R$ の厳密展開と二次まで一致します。外トルクが $R,t$ に依存する場合、定義中の中点状態 $R_{n+1/2}$ と中点時刻を使えば、角速度の右辺についても

$$
\omega(t+h)=\omega(t)+hf(t,R,\omega)
+\frac{h^2}{2}\frac d{dt}f(t,R(t),\omega(t))+O(h^3)
$$

の二次の係数まで一致します。従って指数中点更新の局所誤差は $O(h^3)$。Euler 更新の局所誤差は $O(h^2)$ であり、四元数の正規化係数
$\{1+h^2\lVert\omega\rVert^2/4\}^{-1/2}=1+O(h^2)$
はこの次数を変えません。

局所誤差上界を $Ch^{p+1}$、一段写像の状態誤差増幅を $1+Kh$ とすると、最初の誤差 $e_0=0$ から

$$
e_{n+1}\le(1+Kh)e_n+Ch^{p+1}
$$

です。これを $N=T/h$ 段まで展開すると $e_N\le Ch^{p+1}\sum_{j=0}^{N-1}(1+Kh)^j$。$K>0$ の場合、等比和は $\{(1+Kh)^N-1\}/(Kh)$、かつ $(1+Kh)^N\le e^{KT}$ だから $e_N\le C(e^{KT}-1)h^p/K$ です。$K=0$ なら $e_N\le CTh^p$。局所誤差が $O(h^{p+1})$ なら大域 $O(h^p)$ と結論できます。
<!-- proof-end -->

**試験手順**：固定した $T$ で $h,\ h/2,\ h/4$ の3本を、**同じ物理的初期値**から積分します。姿勢が回転行列である法同士の比較では $\lVert R_h(T)-R_{\mathrm{ref}}(T)\rVert_F$ を使い、参照解を十分細かい $h/16$ などで求めます。四元数は $\min(\lVert q_h-q_{\rm ref}\rVert,\lVert q_h+q_{\rm ref}\rVert)$ を使い、符号の二重性を誤差として数えません。行列 Euler の結果が $SO(3)$ を離れる場合も、行列差は定義できますが、回転角の公式をそのまま使ってはいけません。

中間軸近くでは [RBD9 の不安定性](../RBD9/index.md#thm-rbd9-intermediate-nonlinear-instability)によって小さな初期偏差が速く増大します。そのため長時間の軌道が大きく違うことを、直ちに「積分器が壊れた」とも「保存量が保証するから正しい」とも判定できません。比較区間を固定し、刻み幅を半減して診断量と軌道の両方を確かめます。

## 6. 保存量を誤った停止条件にしない

数値積分の仕事・角力積は、例えば各段で始点と終点の平均を用いて近似できます。

$$
\Delta W_n\approx\frac h2(\tau_{b,n}\cdot\omega_n+\tau_{b,n+1}\cdot\omega_{n+1}),
$$

$$
\Delta K_{s,n}\approx\frac h2(R_n\tau_{b,n}+R_{n+1}\tau_{b,n+1}).
$$

これらも離散化誤差を持ち、積分器と同じ精度とは限りません。監査時には $R_n$ が正しい回転かどうか、仕事・角力積に数値積分誤差がないかを分けて見る必要があります。収支残差は、すべての手法で数学的に厳密な零になることを意味しません。

- **無トルク**：$\epsilon_{\rm orth}$、$\epsilon_{\rm det}$、$E-E_0$、$L_s-L_{s,0}$、$\lVert L_s\rVert-\lVert L_{s,0}\rVert$ をそれぞれ確認する。角運動量の**長さだけ**が合っていても空間ベクトルの向きが誤っている可能性がある。
- **外トルクあり**：$E-E_0$ や $L_s-L_{s,0}$ を零へ強制しない。代わりに $\mathcal B_E=E-E_0-W$、$\mathcal B_L=L_s-L_{s,0}-K_s$ を使う。非零の仕事・角力積は物理的な変化である。
- **停止・警告**：非有限値、姿勢の幾何学的破綻、相対収支残差が指定許容値を超えるときは、壊れた点を画面外へ飛ばさず停止する。規模の異なる初期値には $\max(1,|E_0|)$ や $\max(1,\lVert L_{s,0}\rVert)$ のような明示した尺度を使う。許容値は物理法則ではなく用途に応じた数値精度の要求である。

### ODE に基づく操作実験

[姿勢の数値積分・監査プレイヤーを開く](https://insuns21.github.io/toukei-kentei_grade1_preparation/textbook/volumes/dream_thater/物理系/RBD/RBD16/assets/attitude-audit.html)

プレイヤーでは、実際の結合初期値問題を使って行列 Euler・正規化四元数 Euler・指数中点を切り替え、刻み幅、無トルク／物体系一定トルク、主軸／中間軸の初期角速度を指定します。再生、停止、一段送り、リセットに対応し、描画間隔は物理積分刻みと独立です。画面上の姿勢の軸表示に加え、数値の直交性・行列式・エネルギー・角運動量収支を確認します。**再生すること自体を正しさの検査としない**ため、同じ初期値・時刻で刻み幅半減を比較する操作を勧めます。JavaScriptを使わない場合も、上の厳密主軸回転例、陽的 Euler の一段行列、以下の全演習・解答から同じ結論を確認できます。

## 演習

## Level A

### 問題 A1：連結した初期値問題

$J_b=\operatorname{diag}(2,3,4)$、$\omega_b=(a,b,c)$、$\tau_b=(\tau_1,\tau_2,\tau_3)$ とする。$f=J_b^{-1}(\tau_b-\omega_b\times J_b\omega_b)$ を三成分に展開し、$R(0)=I_3$ のときの $\dot R(0)$ を $a,b,c$ で書け。

- Level: A

<!-- solution-start -->
### 詳細解答

$J_b\omega_b=(2a,3b,4c)$ なのでベクトル積は

$$
\omega_b\times J_b\omega_b
=(4bc-3bc,\;2ac-4ac,\;3ab-2ab)
=(bc,-2ac,ab).
$$

よって

$$
\dot\omega_b=\left(\frac{\tau_1-bc}{2},\;
\frac{\tau_2+2ac}{3},\;
\frac{\tau_3-ab}{4}\right).
$$

[RBD3 の姿勢微分](../RBD3/index.md#prop-rbd3-angular-conjugacy)に $R(0)=I_3$ を代入すると

$$
\dot R(0)=\widehat{\omega}_0
=\begin{pmatrix}0&-c&b\\c&0&-a\\-b&a&0\end{pmatrix}.
$$

角速度の微分と姿勢の微分は異なる方程式ですが、同じ $\omega_b$ で結合します。
<!-- solution-end -->

### 問題 A2：Euler の一段で何が壊れるか

$R_0=I_3,\ \omega_0=2e_3,\ h=0.1$ とする。行列 Euler で $R_1$ を求め、$R_1^{\mathsf T}R_1-I_3$、$\det R_1$、$\epsilon_{\rm orth}$ を求めよ。

- Level: A

<!-- solution-start -->
### 詳細解答

$h\omega_0=0.2e_3$ なので

$$
R_1=\begin{pmatrix}1&-0.2&0\\0.2&1&0\\0&0&1\end{pmatrix}.
$$

二本の列の二乗長は $1+0.2^2=1.04$、内積は $-0.2+0.2=0$。従って

$$
R_1^{\mathsf T}R_1-I_3=\operatorname{diag}(0.04,0.04,0),
\quad \det R_1=1+0.2^2=1.04,
$$

$$
\epsilon_{\rm orth}=\sqrt{0.04^2+0.04^2}
=0.04\sqrt2.
$$

[一段の直交性破れの命題](#prop-rbd16-euler-orthogonality)でも $\sqrt2h^2\lVert\omega_0\rVert^2=\sqrt2(0.01)(4)$ です。
<!-- solution-end -->

### 問題 A3：四元数を正規化する

$q_0=(1,0)$、$\omega_0=2e_3$、$h=0.1$ とする。四元数 Euler の未正規化値、ノルム、正規化値を計算し、$q_1$ と $-q_1$ の姿勢を比較せよ。

- Level: A

<!-- solution-start -->
### 詳細解答

[四元数の時間発展](../RBD5/index.md#thm-rbd5-attitude-ode)から

$$
\widetilde q_1=(1,0)+\frac{0.1}{2}(0,2e_3)
=(1,0.1e_3),\qquad
\lVert\widetilde q_1\rVert=\sqrt{1+0.1^2}=\sqrt{1.01}.
$$

従って $q_1=(1,0.1e_3)/\sqrt{1.01}$ で $\lVert q_1\rVert^2=(1+0.01)/1.01=1$ です。[RBD5 の二重性](../RBD5/index.md#thm-rbd5-double-cover)により $R(-q_1)=R(q_1)$。符号が反転しても姿勢の跳びはありません。
<!-- solution-end -->

### 問題 A4：トルクのある仕事率

$J_b=\operatorname{diag}(2,3,4)$、$\omega_b=e_3$、物体系の外トルク $\tau_b=e_3$ の瞬間を考える。$\dot E$ と $\dot L_s$ を求めよ。$R=R_z(\theta)$ としてよい。

- Level: A

<!-- solution-start -->
### 詳細解答

[仕事・角力積の定理](#thm-rbd16-work-impulse)の条件を満たすとき $\dot E=\tau_b\cdot\omega_b=e_3\cdot e_3=1$ です。$R_z(\theta)e_3=e_3$ なので $\dot L_s=R\tau_b=e_3$ です。外トルクが非零で、しかも角速度と平行だから仕事率も非零です。エネルギーを一定とする検査は誤りになります。
<!-- solution-end -->

### 問題 A5：正しい保存量を選ぶ

無トルクの数値計算と、$\tau_b=e_3$ を与えた計算について、$E-E_0$、$E-E_0-W$、$L_s-L_{s,0}$、$L_s-L_{s,0}-K_s$ のどれを零と比較すべきか答え、理由を述べよ。

- Level: A

<!-- solution-start -->
### 詳細解答

無トルクなら $\tau_b=0$ より定義から $W=0$、$K_s=0$。従って両組の式はそれぞれ一致し、$E-E_0=0$、$L_s-L_{s,0}=0$ を監査します。外トルクがある場合は[収支の定理](#thm-rbd16-work-impulse)の積分形が $E-E_0=W$、$L_s-L_{s,0}=K_s$ だから、残差 $E-E_0-W$ と $L_s-L_{s,0}-K_s$ を零と比較します。$\tau_b=e_3$ だけから $W$ や $K_s$ が常に零とはいえません。ベクトル $K_s$ は $\int R\tau_b\,dt$ として空間系で計算します。
<!-- solution-end -->

## Level B

### 問題 B1：刻み幅半減で次数を推定する

同じ最終時刻・同じ初期値で、数値状態と十分高精度な参照状態の誤差が $h=0.2,0.1,0.05$ に対し、それぞれ $0.080,0.021,0.0052$ であった。半減比と推定次数を求め、どの次数に近いか答えよ。

- Level: B

<!-- solution-start -->
### 詳細解答

最初の比は $0.080/0.021\approx3.81$、次は $0.021/0.0052\approx4.04$ です。$h^p/(h/2)^p=2^p$ だから

$$
p_1=\frac{\log(3.81)}{\log2}\approx1.93,\qquad
p_2=\frac{\log(4.04)}{\log2}\approx2.01.
$$

二次収束に近い結果です。ただし有限の3点から手法全体の定理を証明したわけではありません。[収束次数の命題](#prop-rbd16-convergence)の滑らかさと有界性、参照解の精度、固定した $T$ を確かめます。
<!-- solution-end -->

### 問題 B2：指数中点法が二次の姿勢項を再現する

$\tau_b$ を含む滑らかな方程式のある時刻で $\omega_b=\omega$、$\dot\omega_b=a$ とする。$\omega_{1/2}=\omega+\frac h2 a+O(h^2)$ を用い、指数中点法の姿勢更新が $R(t+h)$ の二次項まで一致することを示せ。

- Level: B

<!-- solution-start -->
### 詳細解答

$\Omega=\widehat\omega,\ A=\widehat a$ と置きます。姿勢の微分は $\dot R=R\Omega$、二階微分は積の微分で $\ddot R=R(\Omega^2+A)$ となります。従って厳密解は

$$
R(t+h)=R(t)\{I_3+h\Omega+\tfrac12h^2(\Omega^2+A)\}+O(h^3).
$$

一方 $\widehat\omega_{1/2}=\Omega+\frac h2A+O(h^2)$ だから、行列の指数関数 $\exp(X)=I_3+X+X^2/2+O(\lVert X\rVert^3)$ の定数・一次・二次項は

$$
\exp(h\widehat\omega_{1/2})
=I_3+h\Omega+\frac{h^2}{2}A
+\frac{h^2}{2}\Omega^2+O(h^3).
$$

右から $R(t)$ ではなく**左から** $R(t)$ を掛けると上の厳密式と一致します。これは物体系角速度に対し $\dot R=R\widehat\omega_b$ とした規約に依存します。
<!-- solution-end -->

### 問題 B3：外トルク下で「保存量」が増える正しい例

$J_b=\operatorname{diag}(2,3,4)$、$\omega_0=e_3$、$R_0=I_3$、$\tau_b=e_3$ を時間一定で加える。$h=0.1$ 後の $\omega_1,E_1,L_{s,1}$ と、台形則で計算した $W_1,K_{s,1}$ を求めて収支を検算せよ。姿勢はこの場合の厳密な $z$ 軸回転としてよい。

- Level: B

<!-- solution-start -->
### 詳細解答

角速度が $e_3$ 方向なので $\omega\times J_b\omega=0$ が成り立ち続けます。角速度の第三成分は $4\dot\omega_3=1$、従って $\omega_3(t)=1+t/4$。$t=0.1$ では $\omega_1=1.025e_3$ です（$\omega_1$ は第1ステップのベクトルを表します）。エネルギーと空間角運動量は

$$
E_0=2,\quad E_1=\frac12(4)(1.025)^2=2.10125,\quad
L_{s,0}=4e_3,\quad L_{s,1}=4(1.025)e_3=4.1e_3.
$$

回転が $z$ 軸まわりなので $R(t)e_3=e_3$。仕事の台形則は

$$
W_1=\frac{0.1}{2}\{(1)(1)+(1)(1.025)\}
=0.10125,
$$

角力積の台形則は $K_{s,1}=\frac{0.1}{2}(e_3+e_3)=0.1e_3$ です。したがって

$$
E_1-E_0-W_1=0,\quad
L_{s,1}-L_{s,0}-K_{s,1}
=(4.1-4-0.1)e_3=0.
$$

仕事率は時刻に関して一次関数なので、この例では台形則も厳密です。エネルギーの増加 $0.10125$ を無トルクの数値ドリフトと誤認してはいけません。
<!-- solution-end -->

### 問題 B4：中間軸近傍での小誤差の成長

$J_b=\operatorname{diag}(2,3,4)$、無トルクで中間軸まわりの回転 $\omega=(0,\Omega,0)$（$\Omega\ne0$）を考える。小さい摂動 $\omega=(x,\Omega,z)$ の線形化から $x$ の二階方程式を導き、数値計算の刻み幅判定で注意すべき点を述べよ。

- Level: B

<!-- solution-start -->
### 詳細解答

問題 A1 で導いた成分式を $\tau_b=0$ にして、$xz$ といった摂動の二次項を除きます。すると

$$
\dot x=-\frac12\Omega z,\qquad
\dot z=-\frac14\Omega x,\qquad \dot\Omega=O(xz).
$$

$\Omega$ を一次近似で定数として第一式を微分し、第二式を代入すると

$$
\ddot x=-\frac12\Omega\dot z
=-\frac12\Omega\left(-\frac14\Omega x\right)
=\frac{\Omega^2}{8}x.
$$

一般解は $x=Ae^{|\Omega|t/\sqrt8}+Be^{-|\Omega|t/\sqrt8}$ で、非零の増大成分があり得ます。[RBD9 の中間軸不安定性](../RBD9/index.md#thm-rbd9-intermediate-nonlinear-instability)と一致します。数値解の初期誤差・刻み誤差も増幅されるので、長い時間の見た目の一致だけを要求せず、**同じ最終時刻を定めて** $h,h/2,h/4$ の収束と収支残差を監査します。
<!-- solution-end -->

## Level C

### 問題 C1：姿勢が壊れてもエネルギー監査だけは合格し得る

$J_b=\operatorname{diag}(2,3,4)$、$R_0=I_3$、$\omega_0=e_3$、$\tau_b=0$、$h=0.2$ とし、$T=0.4$ まで2段進める。

1. 行列 Euler の $R_2$、$R_2^{\mathsf T}R_2$、$\det R_2$ を計算せよ。
2. $E_2$、$L_{s,2}$ を計算し、これらの一致だけで姿勢が正しいとはいえない理由を述べよ。
3. 指数中点法の $R_2$ と正規化四元数 Euler 法の合計回転角を求め、厳密解との違いを記せ。
4. 正規化四元数 Euler 法で $h=0.1$ に半減したときの合計回転角と、刻み幅半減の誤差比を考察せよ。

- Level: C

<!-- solution-start -->
### 詳細解答

**1. 行列 Euler の幾何学。** 主軸回転では Euler 方程式右辺が零で $\omega_n=e_3$ のままです。一段行列を $A=I_3+0.2\widehat e_3$ とすると $R_2=A^2$。二次元回転部分を実際に掛け算して

$$
R_2=\begin{pmatrix}
1-0.2^2&-2(0.2)&0\\
2(0.2)&1-0.2^2&0\\
0&0&1
\end{pmatrix}
=\begin{pmatrix}0.96&-0.4&0\\0.4&0.96&0\\0&0&1\end{pmatrix}.
$$

第一・第二列の二乗長は $0.96^2+0.4^2=0.9216+0.16=1.0816$、内積は零です。従って

$$
R_2^{\mathsf T}R_2=\operatorname{diag}(1.0816,1.0816,1),\quad
\det R_2=1.0816,
$$

$\epsilon_{\rm orth}=0.0816\sqrt2$、$\epsilon_{\rm det}=0.0816$ となります。二段後の行列は $SO(3)$ に属しません。

**2. 収支だけでは不十分。** $\omega_2=e_3$ だから $E_2=\frac12e_3^{\mathsf T}J_be_3=2=E_0$。また $R_2e_3=e_3$ なので $L_{s,2}=R_2J_be_3=4e_3=L_{s,0}$ です。エネルギーと空間角運動量が完全に一致していても、二つの基底列の長さは $\sqrt{1.0816}\ne1$ です。幾何学的な検査なしでは偽陽性になります。

**3. 姿勢を保つ更新。** 指数中点法では $\omega_{n+1/2}=e_3$ が厳密なので、各段で $\exp(0.2\widehat e_3)=R_z(0.2)$、二段後は $z$ 軸回転の加法性 $R_z(0.2)R_z(0.2)=R_z(0.4)$ から $R_2=R_z(0.4)$ で厳密です。正規化四元数 Euler は一段の半角に $\arctan(h/2)=\arctan(0.1)$ を持つので、二段の合計角は

$$
\theta_{h=0.2}=4\arctan(0.1)\approx0.39867461.
$$

厳密な角は $0.4$ だから、位相の差は約 $0.00132539$。単位ノルムは保ちますが厳密な位相にはなりません。

**4. 半減時の特別な次数。** $h=0.1$ なら $T=0.4$ に4段必要で、一段の回転角は $2\arctan(0.05)$ です。

$$
\theta_{h=0.1}=8\arctan(0.05)\approx0.399666\ldots.
$$

角度差は約 $0.000333\ldots$、前の約 $0.001325$ との比は約 $3.98$ です。この**一定軸・一定角速度だけの特例**では $\arctan z=z-z^3/3+O(z^5)$ から一段の角度誤差が $O(h^3)$、全 $T/h$ 段で $O(h^2)$ となります。[一般の収束次数の命題](#prop-rbd16-convergence)は、角速度が変化する場合の正規化四元数 Euler 更新には通常一位と主張しており、この特殊な二位と矛盾しません。

最後に、もしソフトウェアが直交誤差の停止限界を $0.05$ と定めていれば、行列 Euler の二段後の $\epsilon_{\rm orth}=0.0816\sqrt2\approx0.1154$ は限界超過です。エネルギーだけを確認せず、姿勢・収支の両方を確認して停止します。
<!-- solution-end -->

## 学びの確認

正しい連続時間の方程式を導くこと、回転として正しい離散姿勢を作ること、有限刻みで保存量・仕事・角力積の収支を検査することは**別々の仕事**です。無トルクでエネルギーが変わらない計算でも回転行列が壊れる場合があり、外トルクがある計算でエネルギーが変わるのはむしろ正しい場合があります。同じ初期値・同じ終時刻で刻み幅を半減し、幾何学的残差と力学的収支を別々に読むことが、剛体運動を数値実験へつなぐ基礎になります。
