# GEO14 幾何学 XIV

<!-- definition-example-audit: strict -->

[GEO13](../GEO13/index.md) では、Riemann 計量から Levi-Civita 接続を一意に構成し、曲線に沿う共変微分と平行移動まで整えました。本章では、その接続に対して

$$
\frac{D\dot\gamma}{dt}=0
$$

という条件を課した曲線を調べます。

Euclid 空間では、この条件を満たす曲線は直線です。一般の Riemann 多様体では、同じ条件から「局所的な直線」に相当する曲線が定まり、その初期位置・初期速度を使って接空間の線形構造を多様体の局所幾何へ移せます。

本章では、

$$
\text{自己平行な曲線}
\longrightarrow
\text{初期速度から時刻1の点への写像}
\longrightarrow
\text{基点中心の局所座標}
\longrightarrow
\text{放射方向と角方向の直交性}
\longrightarrow
\text{局所最短性}
$$

という順に進みます。

最後に、任意の十分近い二点を一意な最短曲線で結べる近傍まで構成します。GEO15 の Hopf--Rinow の定理では、本章の局所結果を大域へ押し広げます。

---

## 1. 速度ベクトル自身を平行に運ぶ

$(M,g)$ を Riemann 多様体とし、$\nabla$ をその Levi-Civita 接続とします。

滑らかな曲線

$$
\gamma:I\to M
$$

に対し、速度ベクトル場

$$
\dot\gamma(t)\in T_{\gamma(t)}M
$$

は曲線に沿うベクトル場です。

[GEO13 の曲線に沿う共変微分](../GEO13/index.md#def-geo13-curve-covariant-derivative)を使えば、

$$
\frac{D\dot\gamma}{dt}
$$

を定義できます。

<a id="def-geo14-geodesic"></a>
<!-- formal-statement-start -->
> **定義（測地線）**  
> Riemann 多様体 $(M,g)$ 上の滑らかな曲線
>
$$
\gamma:I\to M
$$
>
> が
>
$$
\boxed{
\frac{D\dot\gamma}{dt}=0
}
$$
>
> を満たすとき、$\gamma$ を **測地線**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo14-geodesic -->
**定義の確認**

Euclid 空間 $\mathbb R^n$ の標準計量では Levi-Civita 接続は標準接続であり、Cartesian 座標では Christoffel 係数が0です。

従って

$$
\frac{D\dot\gamma}{dt}
=
\ddot\gamma^k\partial_k.
$$

測地線条件は

$$
\ddot\gamma^k=0
$$

です。

よって

$$
\gamma(t)=p+tv
$$

という直線が測地線であり、逆に全ての測地線はこの形です。
<!-- definition-example-end -->

測地線は「曲がって見えない曲線」ではありません。一般の座標では Christoffel 係数が現れ、座標成分は二階微分0にはなりません。

---

## 2. 座標表示は二階の非線形 ODE

局所座標

$$
(x^1,\dots,x^n)
$$

を取り、

$$
\gamma(t)
=
(\gamma^1(t),\dots,\gamma^n(t))
$$

と書きます。

速度は

$$
\dot\gamma
=
\dot\gamma^i\partial_i.
$$

GEO13 の曲線に沿う共変微分の座標公式を $\dot\gamma$ 自身へ適用すると、

$$
\frac{D\dot\gamma}{dt}
=
\left(
\ddot\gamma^k
+
\Gamma^k_{ij}(\gamma(t))
\dot\gamma^i\dot\gamma^j
\right)\partial_k.
$$

従って次を得ます。

<a id="prop-geo14-geodesic-equation"></a>
<!-- formal-statement-start -->
> **命題（測地線方程式）**  
> Riemann 多様体 $(M,g)$ の局所座標において、滑らかな曲線 $\gamma$ が測地線であることと、
>
$$
\boxed{
\ddot\gamma^k
+
\Gamma^k_{ij}(\gamma(t))
\dot\gamma^i\dot\gamma^j
=
0,
\qquad
k=1,\dots,n
}
$$
>
> を満たすことは同値である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[共変微分の座標公式](../GEO13/index.md#prop-geo13-coordinate-formula)より

$$
\frac{D\dot\gamma}{dt}
=
\left[
\frac{d\dot\gamma^k}{dt}
+
\Gamma^k_{ij}(\gamma(t))
\dot\gamma^i\dot\gamma^j
\right]\partial_k.
$$

$$
\frac{d\dot\gamma^k}{dt}
=
\ddot\gamma^k
$$

なので、

$$
\frac{D\dot\gamma}{dt}=0
$$

であることは、各座標成分について

$$
\ddot\gamma^k
+
\Gamma^k_{ij}
\dot\gamma^i\dot\gamma^j
=
0
$$

であることと同値です。$\square$
<!-- proof-end -->

### 例：Euclid 平面を極座標で見る

Euclid 計量

$$
ds^2=dr^2+r^2d\theta^2
$$

では、GEO13 で求めた Christoffel 係数

$$
\Gamma^r_{\theta\theta}=-r,
$$

$$
\Gamma^\theta_{r\theta}
=
\Gamma^\theta_{\theta r}
=
\frac1r
$$

から

$$
\ddot r-r\dot\theta^2=0,
$$

$$
\ddot\theta+\frac2r\dot r\dot\theta=0
$$

を得ます。

Cartesian 座標では直線なのに、極座標成分では非線形方程式になります。測地線という概念自体は座標に依存しません。

---

## 3. 初期位置と初期速度が測地線を決める

測地線方程式を一次の系へ直します。

$$
v^k=\dot\gamma^k
$$

と置くと、

$$
\dot\gamma^k=v^k,
$$

$$
\dot v^k
=
-\Gamma^k_{ij}(\gamma)v^iv^j.
$$

これは局所的に

$$
(\gamma,v)\in\mathbb R^{2n}
$$

を未知関数とする滑らかな自律 ODE です。

<a id="thm-geo14-geodesic-existence"></a>
<!-- formal-statement-start -->
> **定理（測地線の局所存在・一意性と初期値への滑らかな依存）**  
> Riemann 多様体 $(M,g)$、点 $p\in M$、接ベクトル $v\in T_pM$ に対し、ある $\varepsilon>0$ と一意な測地線
>
$$
\gamma_v:(-\varepsilon,\varepsilon)\to M
$$
>
> が存在して
>
$$
\gamma_v(0)=p,
\qquad
\dot\gamma_v(0)=v
$$
>
> を満たす。
>
> さらに、初期値 $(p,v)$ の十分小さい近傍では、解 $\gamma_v(t)$ は $t$ と初期値に滑らかに依存する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$p$ を含む座標近傍を取り、測地線方程式を

$$
\dot x^k=v^k,
$$

$$
\dot v^k
=
-\Gamma^k_{ij}(x)v^iv^j
$$

と書きます。

右辺

$$
F(x,v)
=
\left(
v^k,
-\Gamma^k_{ij}(x)v^iv^j
\right)
$$

は滑らかです。

従って [Picard--Lindelöf の局所存在・一意性](../ODE1/index.md#thm-ode1-picard-lindelof)を $\mathbb R^{2n}$ の自律系へ適用でき、初期値

$$
(x(0),v(0))
=
(x(p),v)
$$

に対する局所解が一意に存在します。

座標の逆写像で戻せば、$M$ 上の測地線が得られます。

座標を変えて別に解を構成しても、重なりでは同じ初期値を持つ同じ二階 ODE の解です。一意性により一致するので、構成は座標の選択に依存しません。

また、この一次系は滑らかな自律系なので、[自律系の解の初期値への滑らかな依存](../GEO5/index.md#lem-geo5-smooth-dependence)を $(x,v)$ に適用できます。よって測地線は時間と初期位置・初期速度に滑らかに依存します。$\square$
<!-- proof-end -->

ここで ODE4 を prerequisite にしている理由が現れます。測地線方程式は一般に非線形な二階 ODE であり、一次の非線形自律系へ変換して扱います。

---

## 4. 速度の長さは保存される

Levi-Civita 接続は計量と両立します。

従って測地線では速度の長さが保存されます。

<a id="prop-geo14-constant-speed"></a>
<!-- formal-statement-start -->
> **命題（測地線の速さは一定）**  
> 測地線 $\gamma:I\to M$ に対して
>
$$
g(\dot\gamma,\dot\gamma)
$$
>
> は $t$ に依らず一定である。
>
> 特に、非定数測地線は一定速で進む。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

GEO13 の計量両立性より

$$
\frac{d}{dt}
g(\dot\gamma,\dot\gamma)
=
g\left(
\frac{D\dot\gamma}{dt},
\dot\gamma
\right)
+
g\left(
\dot\gamma,
\frac{D\dot\gamma}{dt}
\right).
$$

$g$ は対称なので

$$
\frac{d}{dt}
g(\dot\gamma,\dot\gamma)
=
2g\left(
\frac{D\dot\gamma}{dt},
\dot\gamma
\right).
$$

測地線では

$$
\frac{D\dot\gamma}{dt}=0
$$

だから

$$
\frac{d}{dt}
g(\dot\gamma,\dot\gamma)=0.
$$

従って速さ

$$
|\dot\gamma|
=
\sqrt{g(\dot\gamma,\dot\gamma)}
$$

は一定です。$\square$
<!-- proof-end -->

この事実から、初期速度 $v$ の測地線は存在する限り速さ $|v|$ で進みます。

---

## 5. パラメータを線形に変えても測地線

<a id="prop-geo14-affine-reparam"></a>
<!-- formal-statement-start -->
> **命題（測地線のアフィン再パラメータ化）**  
> $\gamma:I\to M$ を測地線とし、
>
$$
\phi(s)=as+b,
\qquad
a\ne0
$$
>
> とする。
>
> $\phi(J)\subset I$ を満たす区間 $J$ 上で
>
$$
\widetilde\gamma(s)
=
\gamma(\phi(s))
$$
>
> と置けば、$\widetilde\gamma$ も測地線である。
>
> 特に、初期速度 $v$ の測地線 $\gamma_v$ に対し、
>
$$
\gamma_{av}(t)
=
\gamma_v(at)
$$
>
> が両辺の定義される範囲で成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$$
\frac{d\widetilde\gamma}{ds}
=
a\dot\gamma.
$$

$a$ は定数なので、曲線に沿う共変微分の線形性から

$$
\frac{D}{ds}
\frac{d\widetilde\gamma}{ds}
=
a^2
\frac{D\dot\gamma}{dt}.
$$

$\gamma$ は測地線だから右辺は0です。従って $\widetilde\gamma$ も測地線です。

第二の主張では

$$
t\longmapsto\gamma_v(at)
$$

は時刻0で $p$ を通り、初期速度は

$$
a\dot\gamma_v(0)=av
$$

です。測地線の初期値問題の一意性から

$$
\gamma_{av}(t)
=
\gamma_v(at)
$$

です。$\square$
<!-- proof-end -->

### 反例：非線形な再パラメータ化

Euclid 直線

$$
\gamma(t)=(t,0)
$$

は測地線です。

しかし

$$
\widetilde\gamma(s)
=
\gamma(s^2)
=
(s^2,0)
$$

では

$$
\widetilde\gamma''(s)=(2,0)\ne0.
$$

従って $\widetilde\gamma$ は測地線ではありません。

失われた仮定は

$$
\phi''(s)=0
$$

です。一般の再パラメータ化では加速度に

$$
\phi''(s)\dot\gamma
$$

という接線方向の項が現れます。

---

## 6. 初期速度を時刻1の点へ送る

固定した点 $p\in M$ を考えます。

初期値

$$
\gamma_v(0)=p,
\qquad
\dot\gamma_v(0)=v
$$

を持つ測地線を $\gamma_v$ とします。

すべての $v$ について時刻1まで存在するとは限りません。そこで

$$
\mathcal D_p
=
\left\{
v\in T_pM
\mathrel{}\middle|\mathrel{}
\gamma_v(t)
\text{ が }0\le t\le1\text{ で存在する}
\right\}
$$

と置きます。

局所存在と初期値への連続依存により、$\mathcal D_p$ は $0\in T_pM$ を含む開集合です。

<a id="def-geo14-exponential-map"></a>
<!-- formal-statement-start -->
> **定義（指数写像）**  
> $p\in M$ に対し、
>
$$
\mathcal D_p
=
\left\{
v\in T_pM
\mathrel{}\middle|\mathrel{}
\gamma_v
\text{ が少なくとも }[0,1]\text{ 上で存在する}
\right\}
$$
>
> とする。
>
> **指数写像**
>
$$
\boxed{
\exp_p:\mathcal D_p\to M
}
$$
>
> を
>
$$
\boxed{
\exp_p(v)=\gamma_v(1)
}
$$
>
> で定義する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo14-exponential-map -->
**定義の確認**

Euclid 空間では

$$
\gamma_v(t)=p+tv.
$$

従って

$$
\exp_p(v)
=
p+v.
$$

つまり Euclid 空間では指数写像は「接空間のベクトルをそのまま平行移動して点へ足す」写像です。

一般の多様体では、指数写像がこの加法の代役をします。
<!-- definition-example-end -->

アフィン再パラメータ化から、$tv\in\mathcal D_p$ の範囲で

$$
\boxed{
\exp_p(tv)=\gamma_v(t)
}
$$

です。

この式は以後の基本公式です。

<a id="prop-geo14-exp-smooth-origin"></a>
<!-- formal-statement-start -->
> **命題（指数写像の滑らかさと原点での微分）**  
> $\exp_p$ は $\mathcal D_p$ 上で滑らかであり、
>
$$
\boxed{
(d\exp_p)_0
=
\operatorname{id}_{T_pM}
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

測地線は初期値 $(p,v)$ と時間 $t$ に滑らかに依存するので、

$$
v\longmapsto\gamma_v(1)
$$

は滑らかです。従って $\exp_p$ は滑らかです。

次に $w\in T_pM$ を取ります。

曲線

$$
c(s)=sw
$$

を $T_pM$ 内で考えると、

$$
\exp_p(c(s))
=
\exp_p(sw)
=
\gamma_w(s).
$$

従って

$$
\begin{aligned}
(d\exp_p)_0(w)
&=
\left.
\frac{d}{ds}
\right|_{s=0}
\exp_p(sw)
\\
&=
\dot\gamma_w(0)
\\
&=
w.
\end{aligned}
$$

任意の $w$ について成り立つので

$$
(d\exp_p)_0
=
\operatorname{id}_{T_pM}.
$$

$\square$
<!-- proof-end -->

この等式と[逆関数定理](../RA6A/index.md#thm-ra6a-inverse-function)から、基点を中心とする特別な局所座標を作れます。

---

## 7. 指数写像から局所座標を作る

$(d\exp_p)_0$ は可逆です。

従って [逆関数定理](../RA6A/index.md#thm-ra6a-inverse-function)により、$0\in T_pM$ の十分小さい開近傍 $U_0$ と $p\in M$ の開近傍 $U$ を取って

$$
\exp_p:U_0\to U
$$

を微分同相にできます。

<a id="def-geo14-normal-neighborhood"></a>
<!-- formal-statement-start -->
> **定義（正規近傍）**  
> $p\in M$ に対し、$0\in T_pM$ の星型開近傍 $U_0$ があり、
>
$$
\exp_p:U_0\to U
$$
>
> が微分同相となるとき、$U$ を $p$ の **正規近傍**という。
>
> 特に、ある $r>0$ に対して
>
$$
B_r(0)\subset T_pM
$$
>
> 上で $\exp_p$ が微分同相なら、
>
$$
\exp_p(B_r(0))
$$
>
> を **正規球**と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo14-normal-neighborhood -->
**定義の確認**

Euclid 空間では

$$
\exp_p(v)=p+v
$$

です。

従って任意の $r>0$ について

$$
\exp_p:B_r(0)\to B_r(p)
$$

は微分同相です。

つまり Euclid 空間の通常の球は、そのまま正規球です。
<!-- definition-example-end -->

<a id="def-geo14-radial-geodesic"></a>
<!-- formal-statement-start -->
> **定義（放射測地線）**  
> $p\in M$ と $v\in T_pM$ を取り、$tv\in\mathcal D_p$ となる区間で
>
$
\gamma_v(t)=\exp_p(tv)
$
>
> と置く。この形の測地線を、$p$ を基点とする **放射測地線**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo14-radial-geodesic -->
**定義の確認**

Euclid 空間では

$
\exp_p(tv)=p+tv.
$

従って放射測地線は、基点 $p$ から初期方向 $v$ へ出る通常の直線です。
<!-- definition-example-end -->

$T_pM$ の正規直交基底

$$
e_1,\dots,e_n
$$

を選びます。

正規近傍 $U$ の各点 $q$ に対して

$$
\exp_p^{-1}(q)
=
x^ie_i
$$

と一意に書けます。

<a id="def-geo14-normal-coordinates"></a>
<!-- formal-statement-start -->
> **定義（正規座標）**  
> $p\in M$ の正規近傍 $U$ と $T_pM$ の正規直交基底
>
$$
e_1,\dots,e_n
$$
>
> を選ぶ。
>
> 各 $q\in U$ について
>
$$
\exp_p^{-1}(q)
=
x^i(q)e_i
$$
>
> と書いたとき、
>
$$
(x^1,\dots,x^n)
$$
>
> を $p$ を中心とする **正規座標**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo14-normal-coordinates -->
**定義の確認**

Euclid 空間で $e_1,\dots,e_n$ を通常の正規直交基底とすると

$$
\exp_p^{-1}(q)=q-p.
$$

従って正規座標は

$$
x^i(q)=q^i-p^i
$$

です。

基点 $p$ は座標原点に移り、放射測地線は

$$
x(t)=ta
$$

という直線になります。
<!-- definition-example-end -->

---

## 8. 正規座標では Christoffel 係数が基点で消える

正規座標で

$$
q=\exp_p(a^ie_i)
$$

とします。

放射測地線は

$$
\gamma(t)=\exp_p(ta^ie_i)
$$

なので、その座標表示は

$$
x^i(\gamma(t))=ta^i.
$$

従って

$$
\dot x^i=a^i,
\qquad
\ddot x^i=0.
$$

<a id="thm-geo14-normal-coordinate-properties"></a>
<!-- formal-statement-start -->
> **定理（正規座標の基点での基本性質）**  
> $p$ を中心とする正規座標 $(x^1,\dots,x^n)$ を取る。
>
> このとき
>
$$
\boxed{
g_{ij}(p)=\delta_{ij}
}
$$
>
> かつ
>
$$
\boxed{
\Gamma^k_{ij}(p)=0
}
$$
>
> である。
>
> さらに
>
$$
\boxed{
\partial_\ell g_{ij}(p)=0
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず正規座標は $T_pM$ の正規直交基底から作ったので、

$$
\left.
\frac{\partial}{\partial x^i}
\right|_p
=
e_i.
$$

従って

$$
g_{ij}(p)
=
g_p(e_i,e_j)
=
\delta_{ij}.
$$

次に任意の

$$
a=(a^1,\dots,a^n)
$$

を取り、

$$
\gamma(t)=\exp_p(ta^ie_i)
$$

とします。

正規座標で

$$
x^i(\gamma(t))=ta^i
$$

だから

$$
\ddot x^k=0.
$$

測地線方程式を $t=0$ で評価すると

$$
\Gamma^k_{ij}(p)a^ia^j=0.
$$

これは全ての $a$ について成立します。

Levi-Civita 接続は捩率0なので

$$
\Gamma^k_{ij}
=
\Gamma^k_{ji}.
$$

従って固定した $k$ について

$$
B_k(a,b)
=
\Gamma^k_{ij}(p)a^ib^j
$$

は対称双線形形式です。

$$
B_k(a,a)=0
$$

が全ての $a$ で成り立つので、偏極恒等式

$$
2B_k(a,b)
=
B_k(a+b,a+b)-B_k(a,a)-B_k(b,b)
$$

から

$$
B_k(a,b)=0.
$$

よって

$$
\Gamma^k_{ij}(p)=0.
$$

最後に計量両立性の座標表示

$$
\partial_\ell g_{ij}
=
\Gamma^m_{\ell i}g_{mj}
+
\Gamma^m_{\ell j}g_{im}
$$

を $p$ で評価すると、全 Christoffel 係数が0なので

$$
\partial_\ell g_{ij}(p)=0.
$$

$\square$
<!-- proof-end -->

重要なのは、正規座標で計量が近傍全体で Euclid 計量になるわけではないことです。

基点で

$$
g_{ij}=\delta_{ij},
\qquad
\partial_\ell g_{ij}=0
$$

まで消えますが、二階微分以降には曲率情報が残ります。曲率そのものは GEO16 で扱います。

---

## 9. 放射方向と角方向は直交する

ここまでに作った局所座標を距離へ結び付ける核心は、放射方向と角方向の直交性です。

$p\in M$ を固定し、

$$
v,w\in T_pM
$$

を取り、必要な範囲で指数写像が定義されているとします。

<a id="thm-geo14-gauss-lemma"></a>
<!-- formal-statement-start -->
> **定理（Gauss の補題）**  
> $p\in M$ とし、$v\in\mathcal D_p$ を取る。
>
> $v$ の近傍で $\exp_p$ が定義されているとする。
>
> 任意の $w\in T_pM$ に対して
>
$$
\boxed{
g_{\exp_p(v)}
\left(
(d\exp_p)_v(v),
(d\exp_p)_v(w)
\right)
=
g_p(v,w)
}
$$
>
> が成り立つ。
>
> 特に
>
$$
g_p(v,w)=0
$$
>
> なら、指数写像で送った放射方向と角方向も直交する。
<!-- formal-statement-end -->

### 証明の見取り図

$v$ を $v+sw$ と少し動かし、その各初期速度から出る測地線を並べます。

$$
F(s,t)
=
\exp_p\bigl(t(v+sw)\bigr)
$$

と置きます。

$t$ 方向は測地線方向、$s$ 方向は初期速度を変えた変分方向です。

Levi-Civita 接続の

- 計量両立性
- 捩率0

を使うと、

$$
\frac{d}{dt}
g\left(
\frac{\partial F}{\partial s},
\frac{\partial F}{\partial t}
\right)
$$

を初期速度の内積へ変換できます。

<!-- proof-start -->
### 証明

$$
F(s,t)
=
\exp_p\bigl(t(v+sw)\bigr)
$$

と置きます。

$$
T
=
\frac{\partial F}{\partial t},
\qquad
J
=
\frac{\partial F}{\partial s}
$$

と書きます。

固定した $s$ に対し

$$
t\longmapsto F(s,t)
$$

は初期速度 $v+sw$ の測地線なので

$$
\frac{D T}{dt}=0.
$$

一方、二変数写像の座標ベクトル場 $\partial_s,\partial_t$ は可換し、Levi-Civita 接続は捩率0です。

従って

$$
\frac{D J}{dt}
=
\frac{D T}{ds}.
$$

計量両立性から

$$
\begin{aligned}
\frac{d}{dt}g(J,T)
&=
g\left(
\frac{DJ}{dt},
T
\right)
+
g\left(
J,
\frac{DT}{dt}
\right)
\\
&=
g\left(
\frac{DT}{ds},
T
\right).
\end{aligned}
$$

再び計量両立性を使うと

$$
g\left(
\frac{DT}{ds},
T
\right)
=
\frac12
\frac{\partial}{\partial s}
g(T,T).
$$

固定した $s$ に対する $t$ 曲線は測地線なので、第4節より速さは一定です。

初期時刻では

$$
T(s,0)=v+sw.
$$

従って全ての $t$ について

$$
g(T,T)
=
g_p(v+sw,v+sw).
$$

よって

$$
\frac12
\frac{\partial}{\partial s}
g(T,T)
=
g_p(v+sw,w).
$$

$s=0$ で評価すると

$$
\frac{d}{dt}
g(J,T)
=
g_p(v,w).
$$

また

$$
F(s,0)=p
$$

は $s$ に依らないので

$$
J(0)=0.
$$

従って積分して

$$
g(J(t),T(t))
=
t\,g_p(v,w).
$$

$t=1$ では

$$
J(1)
=
(d\exp_p)_v(w),
$$

$$
T(1)
=
(d\exp_p)_v(v).
$$

したがって

$$
g_{\exp_p(v)}
\left(
(d\exp_p)_v(w),
(d\exp_p)_v(v)
\right)
=
g_p(v,w).
$$

内積の対称性から主張の順序に直せます。$\square$
<!-- proof-end -->

この証明では、捩率0が

$$
\frac{DJ}{dt}
=
\frac{DT}{ds}
$$

を保証し、計量両立性が微分を内積の外へ出す役割を担っています。

Levi-Civita 接続の二つの特徴が、ここで同時に働きます。

---

## 10. 放射測地線は正規球内で最短

[Gauss の補題](#thm-geo14-gauss-lemma)を長さ評価へ使います。

$p$ を中心とする正規球

$$
U=\exp_p(B_R(0))
$$

を取り、

$$
q=\exp_p(v),
\qquad
|v|<R
$$

とします。

放射測地線

$$
\gamma(t)=\exp_p(tv),
\qquad
0\le t\le1
$$

の長さは、速さが $|v|$ で一定なので

$$
L(\gamma)=|v|.
$$

<a id="thm-geo14-radial-minimizing"></a>
<!-- formal-statement-start -->
> **定理（正規球内の放射測地線の最短性）**  
> $U=\exp_p(B_R(0))$ を $p$ の正規球とする。
>
> $q=\exp_p(v)\in U$ とし、
>
$$
\gamma(t)=\exp_p(tv),
\qquad
0\le t\le1
$$
>
> とする。
>
> $p$ から $q$ へ至り、$U$ 内に含まれる任意の区分的 $C^1$ 曲線 $\alpha$ に対して
>
$$
\boxed{
L(\alpha)\ge |v|
=
L(\gamma)
}
$$
>
> が成り立つ。
>
> 等号が成り立つなら、向きを保つ再パラメータ化を除いて $\alpha$ は放射測地線である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\alpha:[0,1]\to U$ とし、

$$
\alpha(0)=p,
\qquad
\alpha(1)=q
$$

とします。

$\exp_p$ は $B_R(0)$ から $U$ への微分同相なので、

$$
\beta(s)
=
\exp_p^{-1}(\alpha(s))
$$

と置けます。

$p$ に対応する $s=0$ 以外では、必要なら有限個の区間へ分けて

$$
\beta(s)=r(s)u(s),
$$

$$
r(s)=|\beta(s)|,
\qquad
|u(s)|=1
$$

と書きます。

微分すると

$$
\dot\beta
=
\dot r\,u+r\dot u.
$$

$|u|=1$ なので

$$
g_p(u,\dot u)=0.
$$

指数写像で送ると

$$
\dot\alpha
=
(d\exp_p)_{\beta}
\left(
\dot r\,u+r\dot u
\right).
$$

[Gauss の補題](#thm-geo14-gauss-lemma)により、放射成分

$$
(d\exp_p)_\beta(u)
$$

と角成分

$$
(d\exp_p)_\beta(r\dot u)
$$

は直交します。

さらに [Gauss の補題](#thm-geo14-gauss-lemma)を $v=\beta=ru$ と $w=u$ に適用すると

$$
g\left(
(d\exp_p)_\beta(ru),
(d\exp_p)_\beta(u)
\right)
=
g_p(ru,u)=r.
$$

左辺の第一因子は $r(d\exp_p)_\beta(u)$ なので、$r>0$ では

$$
\left|
(d\exp_p)_\beta(u)
\right|=1.
$$

従って二つの成分が直交するため

$$
|\dot\alpha|^2
=
\dot r^2
+
\left|
(d\exp_p)_\beta(r\dot u)
\right|^2
\ge
\dot r^2.
$$

よって

$$
|\dot\alpha|
\ge
|\dot r|.
$$

積分すると

$$
L(\alpha)
=
\int_0^1|\dot\alpha(s)|\,ds
\ge
\int_0^1|\dot r(s)|\,ds.
$$

さらに

$$
\int_0^1|\dot r(s)|\,ds
\ge
|r(1)-r(0)|.
$$

$$
r(0)=0,
\qquad
r(1)=|v|
$$

なので

$$
L(\alpha)\ge|v|.
$$

放射測地線 $\gamma$ は長さ $|v|$ だから最短です。

等号が成り立つには、まず

$$
(d\exp_p)_\beta(r\dot u)=0
$$

がほとんど至る所で必要です。

$\exp_p$ は正規球上で微分同相なのでその微分は可逆であり、

$$
r\dot u=0.
$$

$r>0$ の区間では

$$
\dot u=0.
$$

従って角方向は一定です。

さらに

$$
\int|\dot r|=r(1)-r(0)
$$

には $r$ が減少しないことが必要です。

したがって $\alpha$ は一定方向の放射線を向きを保ってたどる曲線であり、放射測地線の再パラメータ化です。$\square$
<!-- proof-end -->

---

## 11. 測地線は局所的に距離を実現する

前節は「競合曲線も正規球内にある」と仮定しました。

しかし基点から十分短い測地線なら、正規球から外へ出る競合曲線の方がむしろ長くなります。

<a id="cor-geo14-local-minimizing"></a>
<!-- formal-statement-start -->
> **系（測地線の局所最短性）**  
> 任意の測地線
>
$$
\gamma:I\to M
$$
>
> と任意の
>
$$
t_0\in I
$$
>
> に対し、ある $\delta>0$ が存在して、$|t-t_0|<\delta$ なら
>
$$
\boxed{
d\bigl(\gamma(t_0),\gamma(t)\bigr)
=
L\bigl(\gamma|_{[t_0,t]}\bigr)
}
$$
>
> が成り立つ。向きが逆の場合は区間を入れ替えて読む。
>
> 従って測地線は各点の近くで長さ最小である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$$
q=\gamma(t_0)
$$

とします。

$q$ を中心とする正規球

$$
U=\exp_q(B_R(0))
$$

を一つ取ります。

$\gamma$ は連続で $\gamma(t_0)=q$ なので、$\delta>0$ を十分小さく取れば

$$
\gamma(t)\in\exp_q(B_{R/2}(0))
$$

が $|t-t_0|<\delta$ で成り立ちます。

そのような $t$ を固定し、

$$
y=\gamma(t)=\exp_q(v),
\qquad
|v|<\frac R2
$$

と書きます。

$q$ から $y$ への任意の区分的 $C^1$ 曲線 $\alpha$ を取ります。

$\alpha$ が $U$ 内に留まるなら、[正規球内の放射測地線の最短性](#thm-geo14-radial-minimizing)から

$$
L(\alpha)\ge|v|.
$$

次に $\alpha$ が $U$ を出るとします。

最初の退出時刻を $s_*$ とし、その直前では

$$
\beta(s)
=
\exp_q^{-1}(\alpha(s))
$$

が定義されます。

もしある $\varepsilon>0$ に対して退出直前まで

$$
|\beta(s)|\le R-\varepsilon
$$

なら、$\beta(s)$ はコンパクト集合

$$
\overline{B_{R-\varepsilon}(0)}
$$

に留まります。

部分列を取れば退出点の極限も $\exp_q(B_R(0))=U$ に属することになり、最初の退出という事実に反します。

従って

$$
|\beta(s)|\to R
\qquad
(s\uparrow s_*).
$$

前節の長さ評価を $[0,s]$ に適用してから $s\uparrow s_*$ とすると、

$$
L(\alpha|_{[0,s_*]})
\ge
R.
$$

したがって

$$
L(\alpha)\ge R>|v|.
$$

よって、全ての競合曲線に対して

$$
L(\alpha)\ge|v|.
$$

一方、$\gamma|_{[t_0,t]}$ は初期速度 $v$ を適切にアフィン再パラメータ化した放射測地線であり、その長さは $|v|$ です。

従って

$$
d(q,y)
=
|v|
=
L\bigl(\gamma|_{[t_0,t]}\bigr).
$$

$\square$
<!-- proof-end -->

ここで重要なのは、「測地線だから全区間で最短」ではないことです。

測地線はまず **局所的**に最短です。大域的にいつまで最短でいられるかは、GEO15 の完備性・cut locus の入口と GEO17 の共役点へつながります。

---

## 12. 正規座標では半径がそのまま距離になる

<a id="cor-geo14-normal-distance"></a>
<!-- formal-statement-start -->
> **系（正規球での基点からの距離）**  
> $U=\exp_p(B_R(0))$ を正規球とする。
>
> $q=\exp_p(v)\in U$ とする。
>
> このとき
>
$$
\boxed{
d(p,q)=|v|
}
$$
>
> である。
>
> 正規座標
>
$$
v=x^ie_i
$$
>
> を使えば
>
$$
\boxed{
d(p,q)
=
\sqrt{(x^1)^2+\cdots+(x^n)^2}
}
$$
>
> となる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

放射測地線

$
\gamma(t)=\exp_p(tv),
\qquad
0\le t\le1
$

の長さは

$
L(\gamma)=|v|.
$

従って

$
d(p,q)\le|v|.
$

逆向きの不等式を示します。

$p$ から $q$ への任意の区分的 $C^1$ 曲線 $\alpha$ を取ります。

$\alpha$ が $U$ 内に留まるなら、[正規球内の放射測地線の最短性](#thm-geo14-radial-minimizing)から

$
L(\alpha)\ge|v|.
$

$\alpha$ が $U$ を出るなら、第11節の最初の退出の議論をそのまま使えます。

すなわち、退出直前の逆像

$
\exp_p^{-1}(\alpha(s))
$

のノルムは $R$ へ近づくので、退出までの長さだけで

$
L(\alpha)\ge R.
$

$q\in U$ だから

$
|v|<R.
$

従ってこの場合も

$
L(\alpha)>|v|.
$

全ての競合曲線について

$
L(\alpha)\ge|v|
$

なので

$
d(p,q)=|v|.
$

正規座標では

$
v=x^ie_i
$

で $e_i$ が正規直交基底だから

$
|v|^2
=
\sum_i(x^i)^2.
$

よって

$
d(p,q)
=
\sqrt{\sum_i(x^i)^2}.
$

$\square$
<!-- proof-end -->

正規座標の半径は、単なる座標半径ではなく、基点からの Riemann 距離そのものです。

---

## 13. 近い二点を一意な最短測地線で結ぶ

正規近傍は「固定した基点 $p$ から各点へ一意な短い測地線が出る」近傍です。

GEO15 では、近傍内の任意の二点を直接結びたいので、固定基点の条件よりもう一段強い概念を使います。

<a id="def-geo14-convex-normal-neighborhood"></a>
<!-- formal-statement-start -->
> **定義（凸正規近傍）**  
> 開集合 $U\subset M$ が **凸正規近傍**であるとは、任意の
>
$$
x,y\in U
$$
>
> に対して、$x$ から $y$ へ至る一意な測地線
>
$$
\gamma_{x,y}:[0,1]\to U
$$
>
> が存在し、しかも
>
$$
L(\gamma_{x,y})=d(x,y)
$$
>
> を満たすことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo14-convex-normal-neighborhood -->
**定義の確認**

Euclid 空間の開球

$$
B_r(p)
$$

を取ります。

任意の $x,y\in B_r(p)$ に対して線分

$$
\gamma(t)=(1-t)x+ty
$$

は球の凸性から全て $B_r(p)$ 内に入ります。

Euclid 測地線は直線であり、線分の長さは

$$
|y-x|.
$$

三角不等式から任意の競合曲線の長さは $|y-x|$ 以上なので、この線分は一意な最短測地線です。

従って Euclid の開球は凸正規近傍です。
<!-- definition-example-end -->

<a id="thm-geo14-convex-normal-existence"></a>
<!-- formal-statement-start -->
> **定理（凸正規近傍の局所存在）**  
> 任意の Riemann 多様体 $(M,g)$ と任意の点 $p\in M$ に対して、$p$ を含む凸正規近傍が存在する。
<!-- formal-statement-end -->

### 証明の見取り図

基点を固定した $\exp_p$ だけでは、$p$ から他点への測地線しか同時には扱えません。

そこで

$$
(x,v)
\longmapsto
\bigl(x,\exp_x(v)\bigr)
$$

を零切断の近くで反転し、近い二点 $(x,y)$ に対する初速度 $V(x,y)$ を同時に作ります。

さらに正規座標で

$$
\rho(q)^2
=
\sum_i (x^i(q))^2
$$

を考えます。基点では Christoffel 係数が0なので、十分小さい近傍では $\rho^2$ が測地線に沿って厳密凸になります。これが「端点が小球内なら、その短い測地線も小球内」という閉じ込めを与えます。

<!-- proof-start -->
### 証明

まず、[自律系の解の初期値への滑らかな依存](../GEO5/index.md#lem-geo5-smooth-dependence)から、TM の零切断近くで

$$
E(v)
=
\left(
\pi(v),
\exp_{\pi(v)}(v)
\right)
$$

は滑らかです。

$0_p\in T_pM$ で

$$
T_{0_p}TM
\cong
T_pM\oplus T_pM
$$

と分解し、基点方向を $\xi$、繊維方向を $\eta$ とします。

第一成分について

$$
d\pi_{0_p}(\xi,\eta)=\xi.
$$

第二成分は、零速度で基点を $\xi$ だけ動かした寄与 $\xi$ と、

$$
(d\exp_p)_0(\eta)=\eta
$$

を足して

$$
dE_{0_p}(\xi,\eta)
=
(\xi,\xi+\eta).
$$

この線形写像は

$$
(a,b)\longmapsto(a,b-a)
$$

を逆写像に持ちます。

従って [逆関数定理](../RA6A/index.md#thm-ra6a-inverse-function)により、$0_p$ の開近傍 $\mathcal W\subset TM$ と $(p,p)$ の開近傍 $\mathcal O\subset M\times M$ を取って

$$
E:\mathcal W\to\mathcal O
$$

を微分同相にできます。

よって $(x,y)\in\mathcal O$ に対し、一意な小さい接ベクトル

$$
V(x,y)\in T_xM
$$

が滑らかに定まり、

$$
y=\exp_x(V(x,y)).
$$

対応する短い測地線は

$$
\gamma_{x,y}(t)
=
\exp_x\bigl(tV(x,y)\bigr).
$$

次に、この短い測地線を一つの小球へ閉じ込めます。

$p$ を中心とする正規座標

$$
(z^1,\dots,z^n)
$$

を取り、

$$
r(q)^2
=
\sum_{k=1}^n(z^k(q))^2
$$

と置きます。

この座標で測地線 $\sigma$ を

$$
z(t)=(z^1(t),\dots,z^n(t))
$$

と書くと、

$$
\ddot z^k
=
-\Gamma^k_{ij}(z)\dot z^i\dot z^j.
$$

従って

$$
\begin{aligned}
\frac{d^2}{dt^2}r(\sigma(t))^2
&=
2\sum_i(\dot z^i)^2
+
2\sum_k z^k\ddot z^k
\\
&=
2|\dot z|_{\mathrm E}^2
-
2z^k\Gamma^k_{ij}(z)\dot z^i\dot z^j.
\end{aligned}
$$

正規座標では

$$
\Gamma^k_{ij}(p)=0.
$$

Christoffel 係数は連続なので、座標球を十分小さく取れば、その球内で全ての $z$ と $\dot z$ に対し

$$
\left|
2z^k\Gamma^k_{ij}(z)\dot z^i\dot z^j
\right|
\le
|\dot z|_{\mathrm E}^2
$$

となります。

従って非定数測地線では

$$
\frac{d^2}{dt^2}r(\sigma(t))^2
\ge
|\dot z|_{\mathrm E}^2
>
0.
$$

つまり $r^2$ は、その小さい座標球内に留まる測地線に沿って厳密凸です。

ここから近傍を一度に縮めます。

$\mathcal W$ は $0_p$ の近傍なので、$p$ の十分小さい座標球 $B$ の閉包上で、ある $a>0$ を選び、

$$
\{v\in T_xM:|v|_g\le a\}
\subset\mathcal W
$$

が全ての $x\in\overline B$ について成り立つようにできます。

また $E^{-1}$ の連続性と

$$
V(p,p)=0
$$

から、さらに小さい同心座標球 $U\Subset B$ を取り、任意の $x,y\in U$ について

$$
|V(x,y)|_g<\frac a2
$$

とできます。

$U$ をさらに縮め、$U\times U\subset\mathcal O$ とし、かつ全ての短い測地線 $\gamma_{x,y}$ が先ほど $r^2$ の凸性を確保した座標球内に入るようにします。これは

$$
\gamma_{p,p}(t)=p
$$

と写像

$$
(x,y,t)\longmapsto\gamma_{x,y}(t)
$$

の連続性、および $[0,1]$ のコンパクト性から可能です。

$x,y\in U$ とします。

関数

$$
t\longmapsto r(\gamma_{x,y}(t))^2
$$

は凸であり、端点では $U$ の半径より小さい値を取ります。

凸関数は区間内部で端点値の最大値を超えないので、

$$
\gamma_{x,y}([0,1])\subset U.
$$

これで短い測地線が $U$ 内に閉じ込められました。

最後に最短性を示します。

固定した $x\in U$ に対し、$E$ の単射性から

$$
\exp_x:
B_a(0)\subset T_xM
\longrightarrow
\exp_x(B_a(0))
$$

は微分同相です。

$y\in U$ に対応する初速度は

$$
V(x,y)\in B_{a/2}(0).
$$

$x$ から $y$ へ至る任意の区分的 $C^1$ 曲線 $\alpha$ を取ります。

$\alpha$ が $\exp_x(B_a(0))$ 内に留まるなら、[正規球内の放射測地線の最短性](#thm-geo14-radial-minimizing)から

$$
L(\alpha)\ge|V(x,y)|_g.
$$

$\alpha$ が $\exp_x(B_a(0))$ を出るなら、第11節と同じ最初の退出の議論により、退出までの長さだけで

$$
L(\alpha)\ge a.
$$

一方、

$$
L(\gamma_{x,y})
=
|V(x,y)|_g
<
\frac a2.
$$

従ってこの場合も $\alpha$ は $\gamma_{x,y}$ より短くなれません。

よって

$$
d(x,y)
=
L(\gamma_{x,y}).
$$

等号を満たす別の曲線があれば正規球内の等号条件から同じ放射測地線の再パラメータ化であり、$[0,1]$ 上の測地線としては $\gamma_{x,y}$ と一致します。

従って $U$ は凸正規近傍です。$\square$
<!-- proof-end -->

この証明では、

1. 端点写像 $E$ の局所可逆性で二点間の短い測地線を作り、
2. 正規座標の二乗半径の凸性でその測地線を同じ小球へ閉じ込め、
3. [Gauss の補題](#thm-geo14-gauss-lemma)で大域的な競合曲線より短いことを示しました。

この三段階が、GEO15 で局所結果を大域へ延ばすための土台になります。

---

## 14. 大域では何が壊れるか

正規座標も指数写像も本質的に局所構造です。

平坦な円柱

$$
M=S^1\times\mathbb R
$$

に積計量を入れます。

角度を $\theta$、高さを $z$ とすれば局所的には

$$
ds^2=d\theta^2+dz^2.
$$

従って測地線は局所座標で

$$
\theta(t)=\theta_0+at,
$$

$$
z(t)=z_0+bt
$$

です。

指数写像は

$$
\exp_{(\theta_0,z_0)}(a,b)
=
(\theta_0+a \bmod 2\pi,\ z_0+b).
$$

したがって

$$
(a,b)
$$

と

$$
(a+2\pi,b)
$$

は異なる接ベクトルですが、同じ点へ送られます。

つまり

$$
\exp_p
$$

は局所微分同相でも、大域的には単射である必要がありません。

また、円周方向の長い測地線は途中から最短ではなくなります。

GEO15 ではこの現象を、

- 測地完備性
- 距離完備性
- 最小測地線
- cut point / cut locus

の入口として整理します。

---

## 15. 演習

### Level A

<a id="ex-geo14-a01"></a>
#### GEO14-A01 Euclid 空間の測地線と指数写像
- Level: A

$\mathbb R^n$ に標準 Euclid 計量を入れる。

1. 測地線方程式を求めよ。
2. 初期条件
   $$
   \gamma(0)=p,
   \qquad
   \dot\gamma(0)=v
   $$
   を満たす測地線を求めよ。
3. $\exp_p(v)$ を求めよ。
4. 正規座標が通常の平行移動座標になることを示せ。

<!-- solution-start -->
**解答**

1. Cartesian 座標では

   $$
   \Gamma^k_{ij}=0.
   $$

   従って測地線方程式は

   $$
   \ddot\gamma^k=0.
   $$

2. 一回積分して

   $$
   \dot\gamma^k(t)=v^k.
   $$

   さらに積分して

   $$
   \gamma^k(t)=p^k+tv^k.
   $$

   よって

   $$
   \gamma(t)=p+tv.
   $$

3. 指数写像の定義から

   $$
   \exp_p(v)=\gamma_v(1)=p+v.
   $$

4. 正規直交基底 $e_i$ に対して

   $$
   q=\exp_p(x^ie_i)=p+x^ie_i.
   $$

   従って

   $$
   x^i(q)
   $$

   は $q-p$ の $e_i$ 成分です。

   これは通常の Euclid 座標を原点だけ $p$ へ移したものです。
<!-- solution-end -->

<a id="ex-geo14-a02"></a>
#### GEO14-A02 極座標での Euclid 測地線
- Level: A

Euclid 平面の極座標計量

$$
ds^2=dr^2+r^2d\theta^2
$$

を考える。

1. 測地線方程式を求めよ。
2. $\theta(t)\equiv\theta_0$ が一定なら、$r(t)=at+b$ が測地線になることを示せ。
3. $r(t)\equiv R>0$ の円周運動が非定数測地線にならないことを示せ。

<!-- solution-start -->
**解答**

1. 非零な Christoffel 係数は

   $$
   \Gamma^r_{\theta\theta}=-r,
   $$

   $$
   \Gamma^\theta_{r\theta}
   =
   \Gamma^\theta_{\theta r}
   =
   \frac1r.
   $$

   従って

   $$
   \ddot r-r\dot\theta^2=0,
   $$

   $$
   \ddot\theta
   +
   \frac2r\dot r\dot\theta
   =
   0.
   $$

2. $\theta=\theta_0$ なら

   $$
   \dot\theta=\ddot\theta=0.
   $$

   第二式は自動的に成立し、第一式は

   $$
   \ddot r=0
   $$

   になります。

   従って

   $$
   r(t)=at+b
   $$

   です。

   これは原点を通る Euclid 直線の極座標表示です。

3. $r=R$ が一定なら

   $$
   \dot r=\ddot r=0.
   $$

   第一式は

   $$
   -R\dot\theta^2=0.
   $$

   $R>0$ なので

   $$
   \dot\theta=0.
   $$

   従って非定数の円周運動は測地線ではありません。
<!-- solution-end -->

<a id="ex-geo14-a03"></a>
#### GEO14-A03 球面の赤道と経線
- Level: A

半径 $R$ の球面の座標

$$
(u,v)
$$

で計量を

$$
ds^2
=
R^2du^2
+
R^2\sin^2u\,dv^2
$$

とする。

1. 非零な Christoffel 係数を求めよ。
2. $v=v_0$ が一定で $u(t)=at+b$ の曲線が測地線であることを示せ。
3. $u=\pi/2$ が一定で $v(t)=at+b$ の曲線が測地線であることを示せ。

<!-- solution-start -->
**解答**

1. 計量係数は

   $$
   g_{11}=R^2,
   \qquad
   g_{22}=R^2\sin^2u.
   $$

   $$
   \partial_u g_{22}
   =
   2R^2\sin u\cos u.
   $$

   従って

   $$
   \Gamma^u_{vv}
   =
   -\sin u\cos u,
   $$

   $$
   \Gamma^v_{uv}
   =
   \Gamma^v_{vu}
   =
   \cot u.
   $$

2. 測地線方程式は

   $$
   \ddot u
   -
   \sin u\cos u\,\dot v^2
   =
   0,
   $$

   $$
   \ddot v
   +
   2\cot u\,\dot u\dot v
   =
   0.
   $$

   $v=v_0$ なら

   $$
   \dot v=\ddot v=0.
   $$

   従って第一式は

   $$
   \ddot u=0
   $$

   となり、

   $$
   u(t)=at+b
   $$

   は測地線です。

3. $u=\pi/2$ では

   $$
   \dot u=\ddot u=0,
   \qquad
   \cos u=0.
   $$

   第一式は0です。

   第二式では

   $$
   \cot(\pi/2)=0
   $$

   なので

   $$
   \ddot v=0.
   $$

   従って

   $$
   v(t)=at+b
   $$

   は測地線です。

   前者は経線、後者は赤道に対応します。
<!-- solution-end -->

<a id="ex-geo14-a04"></a>
#### GEO14-A04 正規座標の基点
- Level: A

$p$ を中心とする正規座標で、

$$
\Gamma^k_{ij}(p)=0
$$

が全ての $i,j,k$ について成り立つことを、放射測地線

$$
x(t)=ta
$$

から示せ。

さらに

$$
\partial_\ell g_{ij}(p)=0
$$

を導け。

<!-- solution-start -->
**解答**

任意の

$$
a=(a^1,\dots,a^n)
$$

に対して

$$
x^i(t)=ta^i
$$

は放射測地線です。

従って

$$
\dot x^i=a^i,
\qquad
\ddot x^k=0.
$$

測地線方程式を $t=0$ で評価すると

$$
\Gamma^k_{ij}(p)a^ia^j=0.
$$

Levi-Civita 接続は捩率0だから

$$
\Gamma^k_{ij}(p)=\Gamma^k_{ji}(p).
$$

固定した $k$ に対し

$$
B_k(a,b)
=
\Gamma^k_{ij}(p)a^ib^j
$$

は対称双線形形式で、

$$
B_k(a,a)=0
$$

が全ての $a$ で成立します。

偏極恒等式より

$$
B_k(a,b)=0
$$

なので

$$
\Gamma^k_{ij}(p)=0.
$$

計量両立性の座標式

$$
\partial_\ell g_{ij}
=
\Gamma^m_{\ell i}g_{mj}
+
\Gamma^m_{\ell j}g_{im}
$$

へ $p$ を代入すると、

$$
\partial_\ell g_{ij}(p)=0.
$$
<!-- solution-end -->

### Level B

<a id="ex-geo14-b01"></a>
#### GEO14-B01 一定速と非線形再パラメータ化
- Level: B

$\gamma$ を非定数測地線とする。

1. $|\dot\gamma|$ が一定であることを証明せよ。
2. $\widetilde\gamma(s)=\gamma(as+b)$ が測地線であることを示せ。
3. Euclid 直線を $\phi(s)=s^2$ で再パラメータ化すると一般には測地線でなくなることを示し、どの項が原因か説明せよ。

<!-- solution-start -->
**解答**

1. 計量両立性から

   $$
   \frac{d}{dt}
   g(\dot\gamma,\dot\gamma)
   =
   2g\left(
   \frac{D\dot\gamma}{dt},
   \dot\gamma
   \right).
   $$

   測地線では

   $$
   \frac{D\dot\gamma}{dt}=0
   $$

   なので

   $$
   \frac{d}{dt}
   g(\dot\gamma,\dot\gamma)=0.
   $$

   従って $|\dot\gamma|$ は一定です。

2. $\widetilde\gamma(s)=\gamma(as+b)$ なら

   $$
   \frac{d\widetilde\gamma}{ds}
   =
   a\dot\gamma.
   $$

   $a$ は定数なので

   $$
   \frac{D}{ds}
   \frac{d\widetilde\gamma}{ds}
   =
   a^2
   \frac{D\dot\gamma}{dt}
   =
   0.
   $$

   従って $\widetilde\gamma$ も測地線です。

3. $\mathbb R^2$ の直線

   $$
   \gamma(t)=(t,0)
   $$

   を取ります。

   $$
   \widetilde\gamma(s)
   =
   (s^2,0)
   $$

   なので

   $$
   \widetilde\gamma''(s)=(2,0)\ne0.
   $$

   一般の $\phi$ では

   $$
   \frac{D}{ds}
   \frac{d}{ds}\gamma(\phi(s))
   =
   \phi'(s)^2
   \frac{D\dot\gamma}{dt}
   +
   \phi''(s)\dot\gamma.
   $$

   第一項は測地線条件で消えますが、

   $$
   \phi''(s)\dot\gamma
   $$

   は残ります。

   アフィン再パラメータ化では $\phi''=0$ なので、この余分な項が消えます。
<!-- solution-end -->

<a id="ex-geo14-b02"></a>
#### GEO14-B02 上半平面計量の鉛直測地線
- Level: B

上半平面

$$
H=\{(x,y)\in\mathbb R^2:y>0\}
$$

に

$$
ds^2
=
\frac{dx^2+dy^2}{y^2}
$$

を入れる。

1. 次の Christoffel 係数を確認せよ。
   $$
   \Gamma^x_{xy}
   =
   \Gamma^x_{yx}
   =
   -\frac1y,
   $$
   $$
   \Gamma^y_{xx}
   =
   \frac1y,
   \qquad
   \Gamma^y_{yy}
   =
   -\frac1y.
   $$
2. $x(t)\equiv x_0$ の測地線方程式を解け。
3. その速さが一定であることを直接確認せよ。

<!-- solution-start -->
**解答**

1. 計量係数は

   $$
   g_{xx}=g_{yy}=y^{-2},
   \qquad
   g_{xy}=0.
   $$

   逆行列は

   $$
   g^{xx}=g^{yy}=y^2.
   $$

   $x$ 微分は0で、

   $$
   \partial_y g_{xx}
   =
   \partial_y g_{yy}
   =
   -2y^{-3}.
   $$

   [Levi-Civita 接続の Christoffel 係数公式](../GEO13/index.md#prop-geo13-levi-civita-christoffel)から

   $$
   \Gamma^x_{xy}
   =
   \frac12g^{xx}\partial_y g_{xx}
   =
   \frac12y^2(-2y^{-3})
   =
   -\frac1y.
   $$

   対称性から

   $$
   \Gamma^x_{yx}
   =
   -\frac1y.
   $$

   また

   $$
   \Gamma^y_{xx}
   =
   -\frac12g^{yy}\partial_y g_{xx}
   =
   \frac1y,
   $$

   $$
   \Gamma^y_{yy}
   =
   \frac12g^{yy}\partial_y g_{yy}
   =
   -\frac1y.
   $$

2. $x(t)=x_0$ なら

   $$
   \dot x=\ddot x=0.
   $$

   $y$ 方程式は

   $$
   \ddot y
   -
   \frac{\dot y^2}{y}
   =
   0.
   $$

   $y>0$ なので

   $$
   u=\log y
   $$

   と置くと

   $$
   \dot u=\frac{\dot y}{y},
   $$

   $$
   \ddot u
   =
   \frac{y\ddot y-\dot y^2}{y^2}.
   $$

   元の方程式から

   $$
   y\ddot y-\dot y^2=0
   $$

   なので

   $$
   \ddot u=0.
   $$

   従って

   $$
   u(t)=ct+d,
   $$

   $$
   y(t)=Ae^{ct},
   \qquad
   A=e^d>0.
   $$

3. 速さの二乗は

   $$
   |\dot\gamma|^2
   =
   \frac{\dot x^2+\dot y^2}{y^2}
   =
   \frac{c^2A^2e^{2ct}}{A^2e^{2ct}}
   =
   c^2.
   $$

   確かに一定です。
<!-- solution-end -->

<a id="ex-geo14-b03"></a>
#### GEO14-B03 Gauss の補題から最短性へ
- Level: B

$p$ を中心とする正規球で曲線

$$
\alpha(s)
=
\exp_p(r(s)u(s)),
$$

$$
|u(s)|=1
$$

を考える。

1. $g_p(u,\dot u)=0$ を示せ。
2. [Gauss の補題](#thm-geo14-gauss-lemma)から
   $$
   |\dot\alpha|^2
   =
   \dot r^2
   +
   \left|
   (d\exp_p)_{ru}(r\dot u)
   \right|^2
   $$
   を導け。
3. $L(\alpha)\ge|r(1)-r(0)|$ を示せ。
4. $r(0)=0$、$r(1)=R_0$ のとき、放射測地線が最短であることを示せ。

<!-- solution-start -->
**解答**

1. $|u|^2=g_p(u,u)=1$ を微分すると

   $$
   0
   =
   \frac{d}{ds}g_p(u,u)
   =
   2g_p(u,\dot u).
   $$

   従って

   $$
   g_p(u,\dot u)=0.
   $$

2. 接空間内で

   $$
   \frac{d}{ds}(ru)
   =
   \dot r\,u+r\dot u.
   $$

   従って

   $$
   \dot\alpha
   =
   (d\exp_p)_{ru}
   (\dot r\,u+r\dot u).
   $$

   [Gauss の補題](#thm-geo14-gauss-lemma)より、$u$ 方向と $r\dot u$ 方向の像は直交します。

   また

   $$
   \left|
   (d\exp_p)_{ru}(u)
   \right|=1.
   $$

   よって二つの成分の直交性から

   $$
   |\dot\alpha|^2
   =
   \dot r^2
   +
   \left|
   (d\exp_p)_{ru}(r\dot u)
   \right|^2.
   $$

3. 第二項は非負なので

   $$
   |\dot\alpha|
   \ge
   |\dot r|.
   $$

   従って

   $$
   L(\alpha)
   =
   \int_0^1|\dot\alpha|\,ds
   \ge
   \int_0^1|\dot r|\,ds.
   $$

   三角不等式から

   $$
   \int_0^1|\dot r|\,ds
   \ge
   \left|
   \int_0^1\dot r\,ds
   \right|
   =
   |r(1)-r(0)|.
   $$

4. $r(0)=0$、$r(1)=R_0$ なら

   $$
   L(\alpha)\ge R_0.
   $$

   一方、

   $$
   \gamma(t)=\exp_p(tR_0u_0)
   $$

   は速さ $R_0$ の測地線なので

   $$
   L(\gamma)=R_0.
   $$

   従って放射測地線が最短です。
<!-- solution-end -->

### Level C

<a id="ex-geo14-c01"></a>
#### GEO14-C01 回転対称計量と保存量
- Level: C

二次元 Riemann 計量

$$
ds^2
=
du^2+f(u)^2\,dv^2,
\qquad
f(u)>0
$$

を考える。

1. 測地線方程式が
   $$
   \ddot u
   -
   f(u)f'(u)\dot v^2
   =
   0,
   $$
   $$
   \ddot v
   +
   2\frac{f'(u)}{f(u)}
   \dot u\dot v
   =
   0
   $$
   となることを示せ。
2. 第二式から
   $$
   \boxed{
   f(u)^2\dot v=C
   }
   $$
   が保存されることを示せ。
3. 一定速条件
   $$
   \dot u^2+f(u)^2\dot v^2=E
   $$
   と合わせて
   $$
   \dot u^2
   +
   \frac{C^2}{f(u)^2}
   =
   E
   $$
   を導け。
4. 球面型
   $$
   f(u)=R\sin\frac uR
   $$
   では、$f$ が小さくなる極付近へ近づく測地線ほど、$C\ne0$ の場合に $\dot u$ がどのように制約されるか説明せよ。

<!-- solution-start -->
**解答**

1. 計量係数は

   $$
   g_{uu}=1,
   \qquad
   g_{vv}=f^2,
   \qquad
   g_{uv}=0.
   $$

   非零な Christoffel 係数は

   $$
   \Gamma^u_{vv}
   =
   -ff',
   $$

   $$
   \Gamma^v_{uv}
   =
   \Gamma^v_{vu}
   =
   \frac{f'}f.
   $$

   従って測地線方程式は

   $$
   \ddot u
   +
   \Gamma^u_{vv}\dot v^2
   =
   0,
   $$

   すなわち

   $$
   \ddot u
   -
   ff'\dot v^2
   =
   0,
   $$

   および

   $$
   \ddot v
   +
   2\Gamma^v_{uv}\dot u\dot v
   =
   0,
   $$

   すなわち

   $$
   \ddot v
   +
   2\frac{f'}f\dot u\dot v
   =
   0.
   $$

2. 第二式に $f^2$ を掛けます。

   $$
   f^2\ddot v
   +
   2ff'\dot u\dot v
   =
   0.
   $$

   一方、

   $$
   \frac{d}{dt}
   \left(
   f(u)^2\dot v
   \right)
   =
   2f(u)f'(u)\dot u\dot v
   +
   f(u)^2\ddot v.
   $$

   したがって

   $$
   \frac{d}{dt}
   \left(
   f(u)^2\dot v
   \right)
   =
   0.
   $$

   よってある定数 $C$ が存在して

   $$
   f(u)^2\dot v=C.
   $$

3. 測地線の速さは一定なので、ある定数 $E\ge0$ に対して

   $$
   \dot u^2+f(u)^2\dot v^2=E.
   $$

   保存量から

   $$
   \dot v
   =
   \frac{C}{f(u)^2}.
   $$

   これを代入すると

   $$
   \dot u^2
   +
   f(u)^2
   \frac{C^2}{f(u)^4}
   =
   E.
   $$

   従って

   $$
   \boxed{
   \dot u^2
   +
   \frac{C^2}{f(u)^2}
   =
   E
   }.
   $$

4. 球面型では

   $$
   f(u)=R\sin\frac uR.
   $$

   極へ近づくと $f(u)\to0$ です。

   $C\ne0$ なら

   $$
   \frac{C^2}{f(u)^2}
   \to\infty.
   $$

   しかし左辺は定数 $E$ に等しくなければならないので、$f(u)$ が

   $$
   |f(u)|<\frac{|C|}{\sqrt E}
   $$

   となる領域へは入れません。

   したがって角方向の保存量 $C$ を持つ測地線は、極へ無制限に近づけません。

   $C=0$ の場合だけ

   $$
   \dot v=0
   $$

   となり、経線型の測地線として極へ到達できます。
<!-- solution-end -->

---

## 16. 次に進む

本章では Levi-Civita 接続から測地線を定義し、

$$
\ddot\gamma^k
+
\Gamma^k_{ij}\dot\gamma^i\dot\gamma^j
=
0
$$

という非線形 ODE を得ました。

初期位置と初期速度から測地線が一意に定まり、その初期速度を時刻1まで進める写像として

$$
\exp_p:T_pM\supset\mathcal D_p\to M
$$

を構成しました。

原点では

$$
(d\exp_p)_0=\operatorname{id}
$$

なので、指数写像は局所的に微分同相です。

これにより正規座標を作ると、

$$
g_{ij}(p)=\delta_{ij},
$$

$$
\Gamma^k_{ij}(p)=0,
$$

$$
\partial_\ell g_{ij}(p)=0
$$

が成立します。

さらに [Gauss の補題](#thm-geo14-gauss-lemma)から放射方向と角方向の直交性を導き、

$$
L(\alpha)\ge L(\text{放射測地線})
$$

を証明しました。

つまり測地線は一般の多様体上で **局所的に距離を実現する直線**です。

次の GEO15 では、

$$
\text{局所測地線}
\longrightarrow
\text{大域測地線}
$$

へ進み、

- 測地完備性
- 距離完備性
- 任意の二点を結ぶ最小測地線
- Hopf--Rinow の定理
- cut point / cut locus の入口

を扱います。
