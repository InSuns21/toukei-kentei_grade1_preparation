# GEO12 幾何学 XII

[GEO11](../GEO11/index.md) では、Euclid 空間に埋め込まれた超曲面について、超曲面上の計量データだけから内在曲率が読み取れることを見ました。そこで残る問いは明確です。

**長さや角度を測るために、そもそも周囲の Euclid 空間は必要なのでしょうか。**

答えは「不要」です。滑らかな多様体 $M$ の各接空間 $T_pM$ に内積を直接入れ、それが点 $p$ とともに滑らかに変化すると要求すれば、曲線の長さ、二点間の距離、体積、勾配、発散、Laplacian を全て多様体の内部だけで構成できます。

本章の流れは

$$
\text{Riemann 計量}
\longrightarrow
\text{flat・sharp と Riemannian 勾配}
\longrightarrow
\text{Riemann 長・曲線エネルギー}
\longrightarrow
\text{Riemann 距離}
\longrightarrow
\text{体積・発散・Laplace--Beltrami}
$$

です。

Riemann 曲率そのものはまだ扱いません。接続は GEO13、測地線は GEO14、曲率テンソルは GEO16 で構成します。本章では、それら全ての土台となる「測る仕組み」を完成させます。

---

## 1. 接空間ごとに内積を入れる

滑らかな $n$ 次元多様体 $M$ を考えます。

各点 $p\in M$ で接空間 $T_pM$ は $n$ 次元実ベクトル空間です。ここへ内積

$$
g_p:T_pM\times T_pM\to\mathbb R
$$

を入れます。

点ごとに勝手な内積を選ぶだけでは微分幾何になりません。座標で係数を見たとき、それらが滑らかな関数になっていることが必要です。

<a id="def-geo12-riemannian-metric"></a>
<!-- formal-statement-start -->
> **定義（Riemann 計量・Riemann 多様体）**  
> 滑らかな多様体 $M$ 上の滑らかな対称 $(0,2)$ テンソル場 $g$ が、各点 $p\in M$ で
>
$$
g_p(v,v)>0
\qquad
(v\in T_pM,\ v\ne0)
$$
>
> を満たすとき、$g$ を **Riemann 計量**という。
>
> Riemann 計量 $g$ を備えた対 $(M,g)$ を **Riemann 多様体**という。
>
> $v\in T_pM$ の計量ノルムを
>
$$
|v|_g:=\sqrt{g_p(v,v)}
$$
>
> と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo12-riemannian-metric -->
**定義の確認**

$\mathbb R^n$ で

$$
g
=
(dx^1)^2+\cdots+(dx^n)^2
$$

と置きます。接ベクトル

$$
v=\sum_i v^i\frac{\partial}{\partial x^i}
$$

に対して

$$
g(v,v)=\sum_i(v^i)^2.
$$

$v\ne0$ なら少なくとも一つの $v^i$ が非零なので

$$
g(v,v)>0.
$$

係数は全て定数だから滑らかです。従ってこれは Riemann 計量です。

二次元で

$$
g=e^{2\phi(x,y)}(dx^2+dy^2)
$$

と置いても、$e^{2\phi}>0$ なので各点で正定値です。従って任意の滑らかな $\phi$ に対して Riemann 計量になります。
<!-- definition-example-end -->

### 座標では正定値行列になる

局所座標

$$
(x^1,\dots,x^n)
$$

を取ります。座標基底を

$$
\partial_i:=\frac{\partial}{\partial x^i}
$$

と書き、

$$
g_{ij}:=g(\partial_i,\partial_j)
$$

と置きます。

すると

$$
g
=
\sum_{i,j=1}^n
g_{ij}\,dx^i\otimes dx^j.
$$

行列

$$
G=(g_{ij})
$$

は各点で実対称正定値です。

別の座標 $(y^1,\dots,y^n)$ を取り、

$$
A^i{}_a
=
\frac{\partial x^i}{\partial y^a}
$$

とすると

$$
\frac{\partial}{\partial y^a}
=
A^i{}_a\partial_i.
$$

従って新しい係数は

$$
\widetilde g_{ab}
=
A^i{}_aA^j{}_b g_{ij}.
$$

行列では

$$
\boxed{
\widetilde G=A^{\mathsf T}GA
}
$$

です。

これは単なる座標変換則です。$g$ そのものは座標に依存しません。

### 例：極座標で Euclid 計量を見る

平面で

$$
x=r\cos\theta,
\qquad
y=r\sin\theta
$$

とします。

微分すると

$$
dx=\cos\theta\,dr-r\sin\theta\,d\theta,
$$

$$
dy=\sin\theta\,dr+r\cos\theta\,d\theta.
$$

従って

$$
dx^2+dy^2
=
dr^2+r^2d\theta^2.
$$

同じ Euclid 計量でも、極座標では

$$
G=
\begin{pmatrix}
1&0\\
0&r^2
\end{pmatrix}
$$

と見えます。

---

## 2. Riemann 計量は常に存在する

Riemann 計量は特殊な多様体だけが持つ追加構造ではありません。滑らかな多様体なら必ず少なくとも一つ持ちます。

局所座標があれば、その座標近傍だけでは Euclid 内積を引き戻して局所計量を作れます。問題は、それらを重なり上でどう貼り合わせるかです。

ここで [GEO4 の 1 の分割](../GEO4/index.md#thm-geo4-partition-of-unity) を使います。

<a id="thm-geo12-metric-existence"></a>
<!-- formal-statement-start -->
> **定理（Riemann 計量の存在）**  
> 任意の滑らかな多様体 $M$ は Riemann 計量を持つ。
<!-- formal-statement-end -->

### 証明の見取り図

座標近傍ごとに Euclid 計量を引き戻し、1 の分割の係数で加重平均します。

正定値行列の正の加重和は正定値です。1 の分割では各点で少なくとも一つの係数が正なので、貼り合わせ後も正定値性が失われません。

<!-- proof-start -->
### 証明

$M$ の座標近傍による開被覆

$$
\{U_\alpha\}_{\alpha\in A}
$$

を取ります。各 $U_\alpha$ に座標

$$
x_\alpha=(x_\alpha^1,\dots,x_\alpha^n)
$$

を選びます。

$U_\alpha$ 上で

$$
h_\alpha
:=
\sum_{i=1}^n
dx_\alpha^i\otimes dx_\alpha^i
$$

と置きます。

任意の

$$
0\ne v\in T_pM,
\qquad
p\in U_\alpha
$$

について

$$
h_{\alpha,p}(v,v)
=
\sum_i
\bigl(dx_\alpha^i(v)\bigr)^2.
$$

座標微分は $T_pM$ と $\mathbb R^n$ の同型なので、$v\ne0$ なら全ての $dx_\alpha^i(v)$ が同時に0にはなりません。従って

$$
h_{\alpha,p}(v,v)>0.
$$

よって $h_\alpha$ は $U_\alpha$ 上の Riemann 計量です。

[GEO4 の定理](../GEO4/index.md#thm-geo4-partition-of-unity) により、この被覆に従属する滑らかな 1 の分割

$$
\{\varphi_\alpha\}
$$

を取れます。

各 $\varphi_\alpha h_\alpha$ は $U_\alpha$ の外で0として延長します。従属性

$$
\operatorname{supp}\varphi_\alpha\subset U_\alpha
$$

により、この延長は滑らかです。

局所有限性から

$$
g
:=
\sum_\alpha
\varphi_\alpha h_\alpha
$$

は各点の近くで有限和となり、滑らかな対称 $(0,2)$ テンソル場です。

残るのは正定値性です。

$p\in M$ と

$$
0\ne v\in T_pM
$$

を固定します。1 の分割なので

$$
\sum_\alpha\varphi_\alpha(p)=1,
\qquad
\varphi_\alpha(p)\ge0.
$$

従って少なくとも一つの $\alpha_0$ で

$$
\varphi_{\alpha_0}(p)>0.
$$

各 $h_\alpha$ は正定値なので

$$
h_{\alpha,p}(v,v)>0
$$

です。よって

$$
g_p(v,v)
=
\sum_\alpha
\varphi_\alpha(p)h_{\alpha,p}(v,v)
\ge
\varphi_{\alpha_0}(p)
h_{\alpha_0,p}(v,v)
>0.
$$

従って $g$ は Riemann 計量です。$\square$
<!-- proof-end -->

この証明でパラコンパクト性が間接的に効いています。GEO4 で [滑らかな多様体はパラコンパクト](../GEO4/index.md#thm-geo4-manifold-paracompact) であることから 1 の分割を構成したため、局所内積を大域的に貼れました。

---

## 3. 計量でベクトルと余ベクトルを往復する

Riemann 計量はベクトル同士を内積できます。

一つのベクトル $v$ を固定すると

$$
w\longmapsto g(v,w)
$$

は $w$ に関する線形形式です。従って $v$ から余ベクトルが作れます。

<a id="def-geo12-musical"></a>
<!-- formal-statement-start -->
> **定義（flat・sharp 同型）**  
> Riemann 多様体 $(M,g)$ と $p\in M$ に対し、
>
$$
\flat_p:T_pM\to T_p^*M,
\qquad
v^\flat:=g_p(v,\cdot)
$$
>
> と定める。
>
> $g_p$ は正定値なので $\flat_p$ は線形同型である。その逆を
>
$$
\sharp_p:T_p^*M\to T_pM,
\qquad
\alpha\longmapsto\alpha^\sharp
$$
>
> と書く。
>
> これらを **flat・sharp 同型**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo12-musical -->
**定義の確認**

座標で

$$
v=v^i\partial_i
$$

とすると

$$
v^\flat
=
g_{ij}v^i\,dx^j.
$$

逆行列を

$$
G^{-1}=(g^{ij})
$$

とします。

$$
\alpha=\alpha_jdx^j
$$

なら

$$
\alpha^\sharp
=
g^{ij}\alpha_j\partial_i.
$$

実際、

$$
g_{ki}g^{ij}\alpha_j
=
\delta_k^j\alpha_j
=
\alpha_k,
$$

なので

$$
(\alpha^\sharp)^\flat=\alpha.
$$
<!-- definition-example-end -->

なぜ $\flat_p$ が単射かも確認しておきます。

$$
v^\flat=0
$$

なら、特に $w=v$ を代入して

$$
g_p(v,v)=0.
$$

正定値性から

$$
v=0.
$$

有限次元で

$$
\dim T_pM=\dim T_p^*M=n
$$

だから単射な線形写像 $\flat_p$ は同型です。

---

## 4. Riemannian 勾配は「微分をベクトルへ戻したもの」

実数値滑らかな関数

$$
f:M\to\mathbb R
$$

の微分

$$
df_p\in T_p^*M
$$

は、接ベクトル $v$ に方向微分 $df_p(v)$ を対応させます。

計量があれば sharp 同型でこの余ベクトルをベクトルへ戻せます。

<a id="def-geo12-gradient"></a>
<!-- formal-statement-start -->
> **定義（Riemannian 勾配）**  
> Riemann 多様体 $(M,g)$ 上の滑らかな関数 $f$ に対し、
>
$$
\operatorname{grad}_g f
:=
(df)^\sharp
$$
>
> を $f$ の **Riemannian 勾配**という。
>
> 同値に、任意のベクトル場 $X$ に対して
>
$$
\boxed{
g(\operatorname{grad}_g f,X)=df(X)=Xf
}
$$
>
> を満たす唯一のベクトル場である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo12-gradient -->
**定義の確認**

共形計量

$$
g=e^{2\phi}(dx^2+dy^2)
$$

では

$$
G^{-1}
=
e^{-2\phi}
\begin{pmatrix}
1&0\\
0&1
\end{pmatrix}.
$$

$$
df=f_x\,dx+f_y\,dy
$$

だから

$$
\operatorname{grad}_g f
=
e^{-2\phi}
\left(
f_x\frac{\partial}{\partial x}
+
f_y\frac{\partial}{\partial y}
\right).
$$

実際、任意の

$$
X=a\partial_x+b\partial_y
$$

に対して

$$
g(\operatorname{grad}_g f,X)
=
f_xa+f_yb
=
Xf.
$$
<!-- definition-example-end -->

<a id="prop-geo12-gradient-coordinate"></a>
<!-- formal-statement-start -->
> **命題（Riemannian 勾配の座標表示）**  
> 局所座標で
>
$$
g=g_{ij}\,dx^i\otimes dx^j,
\qquad
G^{-1}=(g^{ij})
$$
>
> とする。このとき
>
$$
\boxed{
\operatorname{grad}_g f
=
g^{ij}\partial_j f\,\partial_i
}
$$
>
> である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$$
\operatorname{grad}_g f
=
a^i\partial_i
$$

と書きます。

定義から各座標ベクトル $\partial_k$ に対して

$$
g(\operatorname{grad}_g f,\partial_k)
=
df(\partial_k)
=
\partial_k f.
$$

左辺は

$$
g(a^i\partial_i,\partial_k)
=
a^i g_{ik}.
$$

従って

$$
g_{ki}a^i=\partial_kf.
$$

両辺に $g^{\ell k}$ を掛けて $k$ について和を取ると

$$
a^\ell
=
g^{\ell k}\partial_kf.
$$

よって

$$
\operatorname{grad}_g f
=
g^{ij}\partial_j f\,\partial_i.
$$

$\square$
<!-- proof-end -->

標準 Euclid 計量では

$$
g^{ij}=\delta^{ij}
$$

なので

$$
\operatorname{grad}_g f
=
\sum_i
\partial_i f\,\partial_i.
$$

これは [VC1 の勾配](../VC1/index.md#def-vc1-gradient)そのものです。

---

## 5. 曲線の長さと曲線エネルギー

Riemann 計量があれば、曲線の各時刻で速度ベクトルの大きさを測れます。

区分的 $C^1$ 曲線

$$
\gamma:[a,b]\to M
$$

を考えます。

<a id="def-geo12-length-energy"></a>
<!-- formal-statement-start -->
> **定義（曲線の Riemann 長とエネルギー）**  
> Riemann 多様体 $(M,g)$ 上の区分的 $C^1$ 曲線 $\gamma:[a,b]\to M$ に対し、
>
$$
L_g(\gamma)
:=
\int_a^b
|\dot\gamma(t)|_g\,dt
$$
>
> を $\gamma$ の **Riemann 長**という。
>
> また
>
$$
E_g(\gamma)
:=
\frac12
\int_a^b
|\dot\gamma(t)|_g^2\,dt
$$
>
> を $\gamma$ の **曲線エネルギー**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo12-length-energy -->
**定義の確認**

極座標で Euclid 計量は

$$
g=dr^2+r^2d\theta^2
$$

です。

半径 $R$ の円を

$$
\gamma(t)=(R,t),
\qquad
0\le t\le2\pi
$$

と書きます。

$$
\dot\gamma=\partial_\theta
$$

なので

$$
|\dot\gamma|_g
=
\sqrt{g_{\theta\theta}}
=
R.
$$

従って

$$
L_g(\gamma)
=
\int_0^{2\pi}R\,dt
=
2\pi R.
$$

また

$$
E_g(\gamma)
=
\frac12
\int_0^{2\pi}R^2\,dt
=
\pi R^2.
$$
<!-- definition-example-end -->

<a id="prop-geo12-length-reparam"></a>
<!-- formal-statement-start -->
> **命題（Riemann 長の再パラメータ不変性）**  
> $\gamma:[a,b]\to M$ を区分的 $C^1$ 曲線とし、
>
$$
\varphi:[c,d]\to[a,b]
$$
>
> を $C^1$ 微分同相とする。このとき
>
$$
\boxed{
L_g(\gamma\circ\varphi)=L_g(\gamma)
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

連鎖律から

$$
\frac{d}{ds}
(\gamma\circ\varphi)(s)
=
\dot\gamma(\varphi(s))
\varphi'(s).
$$

従って計量ノルムの斉次性より

$$
\left|
\frac{d}{ds}
(\gamma\circ\varphi)(s)
\right|_g
=
|\varphi'(s)|
\,|\dot\gamma(\varphi(s))|_g.
$$

よって

$$
L_g(\gamma\circ\varphi)
=
\int_c^d
|\varphi'(s)|
|\dot\gamma(\varphi(s))|_g\,ds.
$$

$\varphi$ が増加なら通常の変数変換で

$$
L_g(\gamma\circ\varphi)
=
\int_a^b
|\dot\gamma(t)|_g\,dt.
$$

$\varphi$ が減少なら積分端点が逆転しますが、$|\varphi'|=-\varphi'$ がその符号を打ち消し、同じ結果になります。

従って

$$
L_g(\gamma\circ\varphi)=L_g(\gamma).
$$

$\square$
<!-- proof-end -->

長さは曲線を「どの速さでたどるか」に依存しません。

一方、曲線エネルギーはパラメータに依存します。その代わり、一定速度でたどるときに最小になります。

<a id="prop-geo12-length-energy"></a>
<!-- formal-statement-start -->
> **命題（長さとエネルギーの不等式）**  
> 区分的 $C^1$ 曲線 $\gamma:[a,b]\to M$ に対して
>
$$
\boxed{
L_g(\gamma)^2
\le
2(b-a)E_g(\gamma)
}
$$
>
> が成り立つ。
>
> $\gamma$ が $C^1$ なら等号成立は
>
$$
|\dot\gamma(t)|_g
$$
>
> が一定であることと同値である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

関数

$$
v(t):=|\dot\gamma(t)|_g
$$

に Cauchy--Schwarz の不等式を適用します。

$$
\left(
\int_a^b v(t)\,dt
\right)^2
\le
\left(
\int_a^b1^2\,dt
\right)
\left(
\int_a^bv(t)^2\,dt
\right).
$$

左辺は

$$
L_g(\gamma)^2,
$$

第一因子は

$$
b-a,
$$

第二因子は

$$
2E_g(\gamma)
$$

です。従って

$$
L_g(\gamma)^2
\le
2(b-a)E_g(\gamma).
$$

Cauchy--Schwarz の等号条件から、$v$ が定数関数1の定数倍であるとき、すなわち速度

$$
|\dot\gamma(t)|_g
$$

が一定のときに限り等号です。$\square$
<!-- proof-end -->

この不等式は GEO14 の測地線論で再び使います。

---

## 6. Riemann 長から二点間の距離を作る

以下では $M$ を連結な Riemann 多様体とします。

まず、任意の二点を区分的滑らかな曲線で結べることを確認します。

点 $p\in M$ を固定し、$p$ から区分的滑らかな曲線で到達できる点全体を $A$ とします。

$q\in A$ を取ります。$q$ の座標近傍の中に、$q$ を中心とする小さい座標球を取れば、その球の各点は座標上の線分で $q$ と結べます。従ってその小球は $A$ に含まれ、$A$ は開です。

一方 $q\notin A$ についても同じ議論をすると、$q$ の十分小さい座標球内の点が $A$ に入るなら、その点から $q$ への座標線分をつなぐことで $q\in A$ となって矛盾します。従って $M\setminus A$ も開です。

$M$ は連結で $A$ は空でない開閉集合なので

$$
A=M.
$$

従って任意の二点は区分的滑らかな曲線で結べ、長さの下限を取れます。

<a id="def-geo12-distance"></a>
<!-- formal-statement-start -->
> **定義（Riemann 距離）**  
> 連結な Riemann 多様体 $(M,g)$ と $p,q\in M$ に対し、
>
$$
d_g(p,q)
:=
\inf_\gamma L_g(\gamma)
$$
>
> と定める。
>
> ここで下限は、$p$ と $q$ を結ぶ全ての区分的 $C^1$ 曲線
>
$$
\gamma:[a,b]\to M
$$
>
> にわたって取る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo12-distance -->
**定義の確認**

標準 Euclid 計量を持つ $\mathbb R^n$ では、線分

$$
\gamma(t)=p+t(q-p),
\qquad
0\le t\le1
$$

の長さは

$$
L(\gamma)=|q-p|.
$$

従って

$$
d_g(p,q)\le|q-p|.
$$

逆に任意の曲線について

$$
q-p
=
\int_a^b\dot\gamma(t)\,dt
$$

だから三角不等式より

$$
|q-p|
\le
\int_a^b|\dot\gamma(t)|\,dt
=
L(\gamma).
$$

全ての曲線について成り立つので

$$
|q-p|\le d_g(p,q).
$$

したがって

$$
d_g(p,q)=|q-p|.
$$
<!-- definition-example-end -->

<a id="thm-geo12-distance-metric"></a>
<!-- formal-statement-start -->
> **定理（Riemann 距離は距離である）**  
> 連結な Riemann 多様体 $(M,g)$ 上で $d_g$ は
>
> 1. $d_g(p,q)\ge0$、
> 2. $d_g(p,q)=0$ なら $p=q$、
> 3. $d_g(p,q)=d_g(q,p)$、
> 4. $d_g(p,r)\le d_g(p,q)+d_g(q,r)$
>
> を満たす。
>
> 従って $d_g$ は $M$ 上の距離である。
<!-- formal-statement-end -->

### 証明の見取り図

非負性・対称性・三角不等式は Riemann 長から直接従います。

本質は

$$
p\ne q
\quad\Longrightarrow\quad
d_g(p,q)>0
$$

です。局所座標の小閉球上では、正定値行列 $G(x)$ の最小固有値が正の定数で下から押さえられます。そのため曲線が座標上で一定距離を進むには、Riemann 長も一定量以上必要です。

<!-- proof-start -->
### 証明

非負性は長さの定義から明らかです。

曲線 $\gamma$ の向きを逆にした曲線を $\bar\gamma$ とすると、再パラメータ不変性から

$$
L_g(\bar\gamma)=L_g(\gamma).
$$

従って

$$
d_g(p,q)=d_g(q,p).
$$

次に $p,q,r\in M$ とします。

$p$ から $q$ への曲線 $\gamma_1$ と、$q$ から $r$ への曲線 $\gamma_2$ をつなぐと

$$
L_g(\gamma_1*\gamma_2)
=
L_g(\gamma_1)+L_g(\gamma_2).
$$

任意の $\varepsilon>0$ に対し

$$
L_g(\gamma_1)
<
d_g(p,q)+\frac\varepsilon2,
$$

$$
L_g(\gamma_2)
<
d_g(q,r)+\frac\varepsilon2
$$

となる曲線を取れば

$$
d_g(p,r)
\le
d_g(p,q)+d_g(q,r)+\varepsilon.
$$

$\varepsilon\downarrow0$ として

$$
d_g(p,r)
\le
d_g(p,q)+d_g(q,r).
$$

最後に点の分離を示します。

$p\ne q$ とします。$p$ を含む座標近傍 $(U,x)$ を取り、

$$
x(p)=0
$$

となるよう平行移動しておきます。

十分小さい $r>0$ を取り、

$$
\overline{B(0,r)}
\subset x(U)
$$

とします。

集合

$$
K:=x^{-1}(\overline{B(0,r)})
$$

はコンパクトです。

座標表示の計量行列を

$$
G(z)=(g_{ij}(z))
$$

とします。各 $z\in K$ で $G(z)$ は正定値です。

単位球面

$$
S^{n-1}
=
\{\xi\in\mathbb R^n:|\xi|=1\}
$$

上の連続関数

$$
(z,\xi)\longmapsto \xi^{\mathsf T}G(z)\xi
$$

を $K\times S^{n-1}$ 上で考えると、コンパクト性により最小値

$$
m>0
$$

を持ちます。

従って任意の $z\in K$ と $\xi\in\mathbb R^n$ に対して

$$
\xi^{\mathsf T}G(z)\xi
\ge
m|\xi|^2.
$$

まず $q\in K$ とします。

$p$ から $q$ への曲線 $\gamma$ が $K$ 内にとどまるなら、

$$
|\dot\gamma|_g
\ge
\sqrt m
\left|
\frac{d}{dt}(x\circ\gamma)
\right|.
$$

従って

$$
L_g(\gamma)
\ge
\sqrt m
\int
\left|
\frac{d}{dt}(x\circ\gamma)
\right|dt
\ge
\sqrt m\,|x(q)-x(p)|.
$$

右辺は $p\ne q$ なら正です。

$\gamma$ が途中で $K$ を出るなら、最初に $\partial K$ に達する時刻までの部分曲線だけで

$$
L_g(\gamma)
\ge
\sqrt m\,r.
$$

従ってこの場合も正の下限があります。

$q\notin K$ の場合は、任意の $p$ から $q$ への曲線が $K$ を出るので

$$
L_g(\gamma)\ge\sqrt m\,r.
$$

以上から $p\ne q$ なら全ての結合曲線の長さがある正数で下から押さえられ、

$$
d_g(p,q)>0.
$$

従って $d_g$ は距離です。$\square$
<!-- proof-end -->

---

## 7. Riemann 距離は元の多様体位相を変えない

Riemann 計量を入れたことで新しい距離 $d_g$ が生まれました。

しかし元々 $M$ は位相多様体として位相を持っています。この二つが別物では困ります。

実際には一致します。

<a id="thm-geo12-distance-topology"></a>
<!-- formal-statement-start -->
> **定理（Riemann 距離が多様体位相を誘導する）**  
> 連結な Riemann 多様体 $(M,g)$ では、距離 $d_g$ が定める距離位相は、$M$ の元の多様体位相と一致する。
<!-- formal-statement-end -->

### 証明の見取り図

局所座標の小閉球では、計量行列の固有値を

$$
0<m\le M<\infty
$$

で挟めます。

すると座標内の曲線について

$$
\sqrt m\,L_{\mathrm{Euc}}
\le
L_g
\le
\sqrt M\,L_{\mathrm{Euc}}
$$

です。

この局所的な長さ比較から、座標の小球と $d_g$ の小球が互いに含み合うことを示します。

<!-- proof-start -->
### 証明

$p\in M$ を固定し、座標近傍 $(U,x)$ を取り、

$$
x(p)=0
$$

とします。

十分小さい $R>0$ を取り、

$$
\overline{B(0,R)}
\subset x(U)
$$

とします。

前定理と同じコンパクト性の議論により、ある

$$
0<m\le M<\infty
$$

が存在して、全ての $z\in x^{-1}(\overline{B(0,R)})$ と $\xi\in\mathbb R^n$ に対して

$$
m|\xi|^2
\le
\xi^{\mathsf T}G(z)\xi
\le
M|\xi|^2
$$

となります。

### 1. 多様体の近傍の中に $d_g$ 球を入れる

$W$ を $p$ の任意の多様体位相での開近傍とします。

$R$ をさらに小さくして

$$
x^{-1}(\overline{B(0,R)})
\subset W
$$

とできます。

$q\notin x^{-1}(B(0,R))$ とします。$p$ から $q$ への任意の曲線は、座標球の境界

$$
|x|=R
$$

へ一度は達します。

その最初の到達時刻まででは

$$
L_g
\ge
\sqrt m\,L_{\mathrm{Euc}}
\ge
\sqrt m\,R.
$$

従って

$$
d_g(p,q)\ge\sqrt m\,R.
$$

よって

$$
B_{d_g}\left(p,\frac{\sqrt m\,R}{2}\right)
\subset
x^{-1}(B(0,R))
\subset W.
$$

したがって多様体位相の任意の開集合は $d_g$ 位相でも開です。

### 2. $d_g$ 球の中に座標近傍を入れる

今度は $\varepsilon>0$ を取ります。

$$
0<\rho<R
$$

かつ

$$
\sqrt M\,\rho<\varepsilon
$$

となるよう $\rho$ を選びます。

$q\in x^{-1}(B(0,\rho))$ とします。

座標上の線分

$$
c(t)=t\,x(q),
\qquad
0\le t\le1
$$

は $B(0,R)$ 内に入っています。

これを $M$ へ戻した曲線

$$
\gamma(t)=x^{-1}(c(t))
$$

で $p$ と $q$ を結びます。

上からの評価により

$$
L_g(\gamma)
\le
\sqrt M\,L_{\mathrm{Euc}}(c)
=
\sqrt M\,|x(q)|
<
\sqrt M\,\rho
<
\varepsilon.
$$

従って

$$
d_g(p,q)<\varepsilon.
$$

つまり

$$
x^{-1}(B(0,\rho))
\subset
B_{d_g}(p,\varepsilon).
$$

よって $d_g$ 位相の任意の開集合は多様体位相でも開です。

両方向の包含が示されたので、二つの位相は一致します。$\square$
<!-- proof-end -->

この定理は重要です。

Riemann 計量は多様体に新しい「長さ」を追加しますが、どの集合を開集合とみなすかという局所的な位相構造までは変えません。

---

## 8. 計量そのものを保つ写像

位相空間では同相写像、滑らかな多様体では微分同相写像が構造を保つ写像でした。

Riemann 幾何では、さらに計量まで保つ写像を考えます。

<a id="def-geo12-isometry"></a>
<!-- formal-statement-start -->
> **定義（Riemann 等長写像）**  
> Riemann 多様体 $(M,g)$ と $(N,h)$ の間の微分同相写像
>
$$
F:M\to N
$$
>
> が
>
$$
\boxed{
F^*h=g
}
$$
>
> を満たすとき、$F$ を **Riemann 等長写像**という。
>
> 点ごとには
>
$$
h_{F(p)}(dF_pv,dF_pw)
=
g_p(v,w)
$$
>
> が全ての $p\in M$ と $v,w\in T_pM$ に対して成り立つことと同値である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo12-isometry -->
**定義の確認**

標準 Euclid 計量を持つ $\mathbb R^n$ で、直交行列 $Q$ と定ベクトル $a$ に対し

$$
F(x)=Qx+a
$$

とします。

$$
dF_x(v)=Qv
$$

であり、$Q^{\mathsf T}Q=I$ なので

$$
\langle dF_x(v),dF_x(w)\rangle
=
v^{\mathsf T}Q^{\mathsf T}Qw
=
v^{\mathsf T}w.
$$

従って

$$
F^*g_{\mathrm{Euc}}=g_{\mathrm{Euc}}.
$$

よって Euclid の剛体運動は Riemann 等長写像です。
<!-- definition-example-end -->

<a id="prop-geo12-isometry-distance"></a>
<!-- formal-statement-start -->
> **命題（Riemann 等長写像は長さと距離を保存する）**  
> $F:(M,g)\to(N,h)$ を Riemann 等長写像とする。
>
> 任意の区分的 $C^1$ 曲線 $\gamma$ に対して
>
$$
\boxed{
L_h(F\circ\gamma)=L_g(\gamma)
}
$$
>
> であり、任意の $p,q\in M$ に対して
>
$$
\boxed{
d_h(F(p),F(q))=d_g(p,q)
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

連鎖律から

$$
\frac{d}{dt}(F\circ\gamma)
=
dF_{\gamma(t)}(\dot\gamma(t)).
$$

等長性により

$$
\left|
dF_{\gamma(t)}(\dot\gamma(t))
\right|_h^2
=
h(dF\dot\gamma,dF\dot\gamma)
=
g(\dot\gamma,\dot\gamma).
$$

従って

$$
\left|
\frac{d}{dt}(F\circ\gamma)
\right|_h
=
|\dot\gamma|_g.
$$

積分して

$$
L_h(F\circ\gamma)=L_g(\gamma).
$$

$p$ と $q$ を結ぶ全ての曲線 $\gamma$ を $F$ で送れば、$F(p)$ と $F(q)$ を結ぶ曲線が得られるので

$$
d_h(F(p),F(q))
\le
d_g(p,q).
$$

逆写像 $F^{-1}$ も Riemann 等長写像です。同じ議論を $F^{-1}$ に適用すると

$$
d_g(p,q)
\le
d_h(F(p),F(q)).
$$

従って等号です。$\square$
<!-- proof-end -->

---

## 9. 計量は体積も決める

ここから [GEO8 の向きと最高次形式](../GEO8/index.md#def-geo8-orientation-form) を使います。

$(M,g)$ を向き付けられた $n$ 次元 Riemann 多様体とします。

各点で正の $g$-正規直交基底を取ったとき、その基底で値1を取る最高次形式が自然に定まります。

<a id="def-geo12-volume"></a>
<!-- formal-statement-start -->
> **定義（Riemann 体積形式）**  
> 向き付けられた $n$ 次元 Riemann 多様体 $(M,g)$ に対し、各点 $p$ で任意の正の $g_p$-正規直交基底
>
$$
(e_1,\dots,e_n)
$$
>
> に対して
>
$$
\operatorname{vol}_g(e_1,\dots,e_n)=1
$$
>
> を満たす正の $n$ 形式 $\operatorname{vol}_g$ を **Riemann 体積形式**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo12-volume -->
**定義の確認**

標準向きの $\mathbb R^n$ と Euclid 計量では、標準基底

$$
(\partial_1,\dots,\partial_n)
$$

が正の正規直交基底です。

従って

$$
\operatorname{vol}_g
=
dx^1\wedge\cdots\wedge dx^n.
$$

極座標の平面では

$$
G=
\begin{pmatrix}
1&0\\
0&r^2
\end{pmatrix},
$$

したがって後の座標公式から

$$
\operatorname{vol}_g
=
r\,dr\wedge d\theta.
$$

これは通常の極座標面積要素です。
<!-- definition-example-end -->

<a id="prop-geo12-volume-coordinate"></a>
<!-- formal-statement-start -->
> **命題（Riemann 体積形式の座標表示）**  
> 向きと整合する局所座標 $(x^1,\dots,x^n)$ で
>
$$
G=(g_{ij})
$$
>
> とすると、
>
$$
\boxed{
\operatorname{vol}_g
=
\sqrt{\det G}\,
dx^1\wedge\cdots\wedge dx^n
}
$$
>
> である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず座標基底

$$
(\partial_1,\dots,\partial_n)
$$

の Gram 行列は $G$ です。

正規直交基底 $(e_1,\dots,e_n)$ を座標基底から

$$
(e_1,\dots,e_n)
=
(\partial_1,\dots,\partial_n)A
$$

で得るとします。

正規直交性は

$$
A^{\mathsf T}GA=I
$$

を意味します。

行列式を取ると

$$
(\det A)^2\det G=1.
$$

正の基底同士なので

$$
\det A>0,
$$

従って

$$
\det A=\frac1{\sqrt{\det G}}.
$$

ある正の最高次形式を

$$
\omega
=
c\,
dx^1\wedge\cdots\wedge dx^n
$$

と書きます。

$(e_1,\dots,e_n)$ に入れると

$$
\omega(e_1,\dots,e_n)
=
c\det A
=
\frac{c}{\sqrt{\det G}}.
$$

これが1になるためには

$$
c=\sqrt{\det G}.
$$

従って

$$
\operatorname{vol}_g
=
\sqrt{\det G}\,
dx^1\wedge\cdots\wedge dx^n.
$$

この式が座標変換に対して整合することも直接確認できます。

向きを保つ座標変換 $x=x(y)$ の Jacobi 行列を

$$
A=\frac{\partial x}{\partial y}
$$

とすると

$$
G_y=A^{\mathsf T}G_xA.
$$

従って

$$
\sqrt{\det G_y}
=
(\det A)\sqrt{\det G_x}.
$$

一方

$$
dx^1\wedge\cdots\wedge dx^n
=
(\det A)
dy^1\wedge\cdots\wedge dy^n.
$$

よって両座標表示は同じ最高次形式を表します。$\square$
<!-- proof-end -->

向きを選ばない場合でも

$$
\sqrt{\det G}\,|dx^1\cdots dx^n|
$$

は座標変換の絶対 Jacobi 行列式で変換するので、自然な体積要素を与えます。向き付けられた場合には、それが上の体積形式と一致します。

---

## 10. 発散と Laplace--Beltrami 作用素

Euclid 空間では [VC1](../VC1/index.md) で

$$
\nabla f,
\qquad
\operatorname{div}X,
\qquad
\Delta f
$$

を定義しました。

Riemann 多様体では、勾配はすでに

$$
\operatorname{grad}_g f=(df)^\sharp
$$

として得ています。

発散は「体積がベクトル場の流れでどれだけ膨張するか」で定義できます。

<a id="def-geo12-div-laplacian"></a>
<!-- formal-statement-start -->
> **定義（Riemannian 発散と Laplace--Beltrami 作用素）**  
> 向き付けられた Riemann 多様体 $(M,g)$ と滑らかなベクトル場 $X$ に対し、
>
$$
\mathcal L_X\operatorname{vol}_g
=
(\operatorname{div}_gX)\operatorname{vol}_g
$$
>
> を満たす一意な滑らかな関数 $\operatorname{div}_gX$ を **Riemannian 発散**という。
>
> 滑らかな関数 $f$ に対し、
>
$$
\boxed{
\Delta_g f
:=
\operatorname{div}_g(\operatorname{grad}_g f)
}
$$
>
> を **Laplace--Beltrami 作用素**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geo12-div-laplacian -->
**定義の確認**

標準 Euclid 計量では

$$
\operatorname{vol}_g
=
dx^1\wedge\cdots\wedge dx^n.
$$

ベクトル場

$$
X=\sum_i X^i\partial_i
$$

に対して後の公式は

$$
\operatorname{div}_gX
=
\sum_i\partial_iX^i.
$$

これは [VC1 の発散](../VC1/index.md#def-vc1-divergence)です。

また

$$
\operatorname{grad}_g f
=
\sum_i\partial_i f\,\partial_i
$$

なので

$$
\Delta_gf
=
\sum_i\partial_i^2f,
$$

すなわち [VC1 のスカラー・ラプラシアン](../VC1/index.md#def-vc1-laplacian)を回収します。
<!-- definition-example-end -->

<a id="prop-geo12-div-laplacian-coordinate"></a>
<!-- formal-statement-start -->
> **命題（Riemannian 発散と Laplace--Beltrami の座標表示）**  
> 向きと整合する局所座標で
>
$$
G=(g_{ij}),
\qquad
|g|:=\det G,
\qquad
X=X^i\partial_i
$$
>
> とする。このとき
>
$$
\boxed{
\operatorname{div}_gX
=
\frac1{\sqrt{|g|}}
\partial_i
\left(
\sqrt{|g|}\,X^i
\right)
}
$$
>
> である。
>
> 従って
>
$$
\boxed{
\Delta_gf
=
\frac1{\sqrt{|g|}}
\partial_i
\left(
\sqrt{|g|}\,
g^{ij}\partial_jf
\right)
}
$$
>
> である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

局所的に

$$
\mu
:=
\operatorname{vol}_g
=
\rho\,
dx^1\wedge\cdots\wedge dx^n,
\qquad
\rho:=\sqrt{|g|}.
$$

[GEO7 の Cartan の公式](../GEO7/index.md#thm-geo7-cartan-formula)から

$$
\mathcal L_X\mu
=
d(\iota_X\mu)+\iota_X(d\mu).
$$

$\mu$ は $n$ 次形式なので、$n$ 次元多様体上では

$$
d\mu=0.
$$

従って

$$
\mathcal L_X\mu=d(\iota_X\mu).
$$

内部積を計算すると

$$
\iota_X\mu
=
\rho
\sum_{i=1}^n
(-1)^{i-1}
X^i
dx^1\wedge\cdots
\wedge\widehat{dx^i}\wedge\cdots
\wedge dx^n.
$$

外微分を取ります。

$i$ 番目の項では、$dx^i$ 以外の $dx^k$ を含む微分成分は外積で同じ1形式が重なって0になります。従って残るのは

$$
\partial_i(\rho X^i)\,dx^i
$$

だけです。

符号 $(-1)^{i-1}$ は $dx^i$ を第 $i$ 位置から先頭へ移す符号とちょうど打ち消し合い、

$$
d(\iota_X\mu)
=
\left[
\sum_i
\partial_i(\rho X^i)
\right]
dx^1\wedge\cdots\wedge dx^n.
$$

一方、発散の定義から

$$
\mathcal L_X\mu
=
(\operatorname{div}_gX)\rho
dx^1\wedge\cdots\wedge dx^n.
$$

従って

$$
\operatorname{div}_gX
=
\frac1\rho
\partial_i(\rho X^i).
$$

$\rho=\sqrt{|g|}$ を戻せば

$$
\operatorname{div}_gX
=
\frac1{\sqrt{|g|}}
\partial_i
\left(
\sqrt{|g|}X^i
\right).
$$

次に

$$
\operatorname{grad}_g f
=
g^{ij}\partial_jf\,\partial_i
$$

だから

$$
X^i=g^{ij}\partial_jf
$$

を代入し、

$$
\Delta_gf
=
\frac1{\sqrt{|g|}}
\partial_i
\left(
\sqrt{|g|}\,
g^{ij}\partial_jf
\right).
$$

$\square$
<!-- proof-end -->

### 例：共形計量

二次元で

$$
g=e^{2\phi}(dx^2+dy^2)
$$

なら

$$
|g|=e^{4\phi},
\qquad
\sqrt{|g|}=e^{2\phi},
$$

$$
g^{ij}
=
e^{-2\phi}\delta^{ij}.
$$

従って

$$
\sqrt{|g|}\,g^{ij}
=
\delta^{ij}.
$$

よって

$$
\Delta_gf
=
e^{-2\phi}
(f_{xx}+f_{yy}).
$$

二次元では共形因子がこの単純な形で外へ出ます。

---

## 11. 演習

### Level A

<a id="ex-geo12-a01"></a>
#### GEO12-A01 極座標の計量・体積・勾配
- Level: A

平面の極座標

$$
x=r\cos\theta,
\qquad
y=r\sin\theta
$$

で Euclid 計量を考える。

1. 計量行列 $G$ を求めよ。
2. $\operatorname{vol}_g$ を求めよ。
3. 関数 $f=f(r,\theta)$ の $\operatorname{grad}_g f$ を求めよ。

<!-- solution-start -->
**解答**

1. すでに

   $$
   dx^2+dy^2
   =
   dr^2+r^2d\theta^2
   $$

   なので

   $$
   G
   =
   \begin{pmatrix}
   1&0\\
   0&r^2
   \end{pmatrix}.
   $$

2. 行列式は

   $$
   \det G=r^2.
   $$

   $r>0$ の領域では

   $$
   \sqrt{\det G}=r.
   $$

   従って

   $$
   \operatorname{vol}_g
   =
   r\,dr\wedge d\theta.
   $$

3. 逆行列は

   $$
   G^{-1}
   =
   \begin{pmatrix}
   1&0\\
   0&r^{-2}
   \end{pmatrix}.
   $$

   よって

   $$
   \operatorname{grad}_g f
   =
   f_r\partial_r
   +
   \frac1{r^2}f_\theta\partial_\theta.
   $$

   $\partial_\theta$ 自体の長さは $r$ なので、係数が $1/r^2$ になることに注意します。
<!-- solution-end -->

<a id="ex-geo12-a02"></a>
#### GEO12-A02 flat・sharp の直接計算
- Level: A

二次元計量

$$
g
=
4\,dx\otimes dx
+
dx\otimes dy
+
dy\otimes dx
+
dy\otimes dy
$$

を

$$
G=
\begin{pmatrix}
4&1\\
1&1
\end{pmatrix}
$$

と解釈する。

1. $v=2\partial_x-\partial_y$ の $v^\flat$ を求めよ。
2. $\alpha=3dx+2dy$ の $\alpha^\sharp$ を求めよ。
3. $(\alpha^\sharp)^\flat=\alpha$ を確認せよ。

<!-- solution-start -->
**解答**

1. 成分ベクトルは

   $$
   [v]
   =
   \begin{pmatrix}
   2\\-1
   \end{pmatrix}.
   $$

   flat は $G[v]$ だから

   $$
   G[v]
   =
   \begin{pmatrix}
   4&1\\
   1&1
   \end{pmatrix}
   \begin{pmatrix}
   2\\-1
   \end{pmatrix}
   =
   \begin{pmatrix}
   7\\1
   \end{pmatrix}.
   $$

   従って

   $$
   v^\flat=7dx+dy.
   $$

2. 逆行列は

   $$
   G^{-1}
   =
   \frac13
   \begin{pmatrix}
   1&-1\\
   -1&4
   \end{pmatrix}.
   $$

   従って

   $$
   [\alpha^\sharp]
   =
   G^{-1}
   \begin{pmatrix}
   3\\2
   \end{pmatrix}
   =
   \frac13
   \begin{pmatrix}
   1\\5
   \end{pmatrix}.
   $$

   よって

   $$
   \alpha^\sharp
   =
   \frac13\partial_x
   +
   \frac53\partial_y.
   $$

3. 再び $G$ を掛けると

   $$
   G
   \frac13
   \begin{pmatrix}
   1\\5
   \end{pmatrix}
   =
   \frac13
   \begin{pmatrix}
   9\\6
   \end{pmatrix}
   =
   \begin{pmatrix}
   3\\2
   \end{pmatrix}.
   $$

   従って

   $$
   (\alpha^\sharp)^\flat
   =
   3dx+2dy
   =
   \alpha.
   $$
<!-- solution-end -->

<a id="ex-geo12-a03"></a>
#### GEO12-A03 同じ円を異なる速さでたどる
- Level: A

標準 Euclid 平面で半径 $R$ の円を

$$
\gamma(t)
=
(R\cos t,R\sin t),
\qquad
0\le t\le2\pi
$$

と

$$
\widetilde\gamma(s)
=
(R\cos s^2,R\sin s^2),
\qquad
0\le s\le\sqrt{2\pi}
$$

で表す。

1. 両曲線の長さを求めよ。
2. 両曲線の曲線エネルギーを求めよ。
3. 長さは一致するが曲線エネルギーは一致しないことを確認せよ。

<!-- solution-start -->
**解答**

1. $\gamma$ では

   $$
   \dot\gamma(t)
   =
   (-R\sin t,R\cos t)
   $$

   なので

   $$
   |\dot\gamma|=R.
   $$

   よって

   $$
   L(\gamma)
   =
   \int_0^{2\pi}R\,dt
   =
   2\pi R.
   $$

   一方

   $$
   \widetilde\gamma'(s)
   =
   2sR(-\sin s^2,\cos s^2),
   $$

   だから

   $$
   |\widetilde\gamma'(s)|=2sR.
   $$

   よって

   $$
   L(\widetilde\gamma)
   =
   \int_0^{\sqrt{2\pi}}2sR\,ds
   =
   2\pi R.
   $$

2. $\gamma$ の曲線エネルギーは

   $$
   E(\gamma)
   =
   \frac12
   \int_0^{2\pi}R^2\,dt
   =
   \pi R^2.
   $$

   $\widetilde\gamma$ では

   $$
   E(\widetilde\gamma)
   =
   \frac12
   \int_0^{\sqrt{2\pi}}
   4s^2R^2\,ds.
   $$

   従って

   $$
   E(\widetilde\gamma)
   =
   2R^2
   \left[
   \frac{s^3}{3}
   \right]_0^{\sqrt{2\pi}}
   =
   \frac{2R^2}{3}(2\pi)^{3/2}.
   $$

3. 長さはどちらも $2\pi R$ ですが、曲線エネルギーは異なります。

   これは長さが再パラメータ不変である一方、曲線エネルギーは速度配分に依存することの具体例です。
<!-- solution-end -->

<a id="ex-geo12-a04"></a>
#### GEO12-A04 対角計量の体積
- Level: A

$$
g
=
a(x,y)^2dx^2+b(x,y)^2dy^2,
\qquad
a,b>0
$$

とする。

1. $\operatorname{vol}_g$ を求めよ。
2. $X=P\partial_x+Q\partial_y$ に対する $\operatorname{div}_gX$ を求めよ。

<!-- solution-start -->
**解答**

1. 計量行列は

   $$
   G
   =
   \begin{pmatrix}
   a^2&0\\
   0&b^2
   \end{pmatrix}.
   $$

   従って

   $$
   \det G=a^2b^2,
   \qquad
   \sqrt{\det G}=ab.
   $$

   よって

   $$
   \operatorname{vol}_g
   =
   ab\,dx\wedge dy.
   $$

2. 座標公式から

   $$
   \operatorname{div}_gX
   =
   \frac1{ab}
   \left[
   \partial_x(abP)
   +
   \partial_y(abQ)
   \right].
   $$
<!-- solution-end -->

### Level B

<a id="ex-geo12-b01"></a>
#### GEO12-B01 1 の分割による計量の貼り合わせ
- Level: B

同じ開集合上に二つの Riemann 計量 $g_1,g_2$ があり、滑らかな関数

$$
0\le\varphi\le1
$$

を取る。

$$
g
=
\varphi g_1+(1-\varphi)g_2
$$

と置く。

1. $g$ が滑らかな対称 $(0,2)$ テンソル場であることを示せ。
2. $g$ が正定値であることを示せ。
3. なぜこの計算が Riemann 計量存在定理の局所モデルになっているか説明せよ。

<!-- solution-start -->
**解答**

1. $g_1,g_2$ は滑らかな対称 $(0,2)$ テンソル場です。$\varphi$ と $1-\varphi$ は滑らかな関数なので、その関数倍も滑らかな対称 $(0,2)$ テンソル場です。

   和も同じ型なので $g$ は滑らかな対称 $(0,2)$ テンソル場です。

2. $v\ne0$ とします。

   $g_1,g_2$ は正定値なので

   $$
   g_1(v,v)>0,
   \qquad
   g_2(v,v)>0.
   $$

   また

   $$
   \varphi\ge0,
   \qquad
   1-\varphi\ge0,
   $$

   かつ二つの係数の和は1です。

   従って

   $$
   g(v,v)
   =
   \varphi g_1(v,v)
   +
   (1-\varphi)g_2(v,v)
   >0.
   $$

   よって $g$ は正定値です。

3. 一般の存在定理では、各座標近傍上の局所計量 $h_\alpha$ を 1 の分割 $\varphi_\alpha$ で

   $$
   g=\sum_\alpha\varphi_\alpha h_\alpha
   $$

   と混ぜました。

   この問題は項が二つだけの同じ構造です。重要なのは「係数が非負で和が1」であるため正定値性が保たれる点です。
<!-- solution-end -->

<a id="ex-geo12-b02"></a>
#### GEO12-B02 局所比較から距離を評価する
- Level: B

座標近傍 $U$ 上で計量行列 $G(x)$ が

$$
m|\xi|^2
\le
\xi^{\mathsf T}G(x)\xi
\le
M|\xi|^2
$$

を全ての $x\in U$ と $\xi\in\mathbb R^n$ について満たすとする。

$U$ 内にとどまる区分的 $C^1$ 曲線 $\gamma$ について

$$
\sqrt m\,L_{\mathrm{Euc}}(x\circ\gamma)
\le
L_g(\gamma)
\le
\sqrt M\,L_{\mathrm{Euc}}(x\circ\gamma)
$$

を示せ。

<!-- solution-start -->
**解答**

座標速度を

$$
\xi(t)
=
\frac{d}{dt}(x\circ\gamma)(t)
$$

とします。

Riemann 速度の二乗は

$$
|\dot\gamma(t)|_g^2
=
\xi(t)^{\mathsf T}G(x(\gamma(t)))\xi(t).
$$

仮定から

$$
m|\xi(t)|^2
\le
|\dot\gamma(t)|_g^2
\le
M|\xi(t)|^2.
$$

全て非負なので平方根を取り、

$$
\sqrt m\,|\xi(t)|
\le
|\dot\gamma(t)|_g
\le
\sqrt M\,|\xi(t)|.
$$

これを積分すると

$$
\sqrt m
\int|\xi(t)|\,dt
\le
\int|\dot\gamma(t)|_g\,dt
\le
\sqrt M
\int|\xi(t)|\,dt.
$$

すなわち

$$
\sqrt m\,L_{\mathrm{Euc}}(x\circ\gamma)
\le
L_g(\gamma)
\le
\sqrt M\,L_{\mathrm{Euc}}(x\circ\gamma).
$$

この評価が、Riemann 距離と座標上の Euclid 距離が局所的に同じ位相を作る理由です。
<!-- solution-end -->

<a id="ex-geo12-b03"></a>
#### GEO12-B03 計量を変えた恒等写像
- Level: B

同じ多様体 $M$ 上に二つの Riemann 計量 $g,h$ があり、

$$
h=c^2g,
\qquad
c>0
$$

とする。

1. 任意の曲線 $\gamma$ について $L_h(\gamma)=cL_g(\gamma)$ を示せ。
2. $d_h=cd_g$ を示せ。
3. 恒等写像
   $$
   \operatorname{id}_M:(M,g)\to(M,h)
   $$
   が Riemann 等長写像となるのはいつか。

<!-- solution-start -->
**解答**

1. 任意の接ベクトル $v$ について

   $$
   |v|_h
   =
   \sqrt{h(v,v)}
   =
   \sqrt{c^2g(v,v)}
   =
   c|v|_g.
   $$

   従って

   $$
   L_h(\gamma)
   =
   \int c|\dot\gamma|_g\,dt
   =
   cL_g(\gamma).
   $$

2. $p,q$ を結ぶ曲線全体で下限を取ると

   $$
   d_h(p,q)
   =
   \inf_\gamma L_h(\gamma)
   =
   \inf_\gamma cL_g(\gamma)
   =
   cd_g(p,q).
   $$

3. 恒等写像の微分も恒等写像なので、等長条件は

   $$
   h(v,w)=g(v,w)
   $$

   です。

   $h=c^2g$ だから、これは全ての $v,w$ について

   $$
   c^2g(v,w)=g(v,w)
   $$

   を要求します。

   正定値計量は零ではないので

   $$
   c^2=1.
   $$

   $c>0$ だから

   $$
   c=1
   $$

   のときに限ります。
<!-- solution-end -->

### Level C

<a id="ex-geo12-c01"></a>
#### GEO12-C01 warped 型計量を一括計算する
- Level: C

二次元多様体の局所座標 $(u,v)$ で

$$
g
=
du^2+f(u)^2dv^2,
\qquad
f(u)>0
$$

とする。

1. $G^{-1}$ と $\operatorname{vol}_g$ を求めよ。
2. 関数 $\psi(u,v)$ の $\operatorname{grad}_g\psi$ を求めよ。
3. ベクトル場
   $$
   X=A(u,v)\partial_u+B(u,v)\partial_v
   $$
   の $\operatorname{div}_gX$ を求めよ。
4. $\Delta_g\psi$ を求めよ。
5. $f(u)=u$ とすると極座標の Euclid Laplacian が回収されることを示せ。

<!-- solution-start -->
**解答**

1. 計量行列は

   $$
   G
   =
   \begin{pmatrix}
   1&0\\
   0&f^2
   \end{pmatrix}.
   $$

   従って

   $$
   G^{-1}
   =
   \begin{pmatrix}
   1&0\\
   0&f^{-2}
   \end{pmatrix}.
   $$

   行列式は

   $$
   |g|=f^2.
   $$

   $f>0$ なので

   $$
   \sqrt{|g|}=f.
   $$

   よって

   $$
   \operatorname{vol}_g
   =
   f\,du\wedge dv.
   $$

2. 勾配の座標公式から

   $$
   \operatorname{grad}_g\psi
   =
   \psi_u\partial_u
   +
   \frac1{f^2}\psi_v\partial_v.
   $$

3. 発散公式から

   $$
   \operatorname{div}_gX
   =
   \frac1f
   \left[
   \partial_u(fA)
   +
   \partial_v(fB)
   \right].
   $$

   $f$ は $u$ だけの関数なので

   $$
   \partial_v(fB)=fB_v.
   $$

   従って

   $$
   \operatorname{div}_gX
   =
   A_u+\frac{f'}fA+B_v.
   $$

4. $X=\operatorname{grad}_g\psi$ として

   $$
   A=\psi_u,
   \qquad
   B=\frac1{f^2}\psi_v
   $$

   を代入します。

   $$
   \Delta_g\psi
   =
   \frac1f
   \left[
   \partial_u(f\psi_u)
   +
   \partial_v\left(
   \frac1f\psi_v
   \right)
   \right].
   $$

   $f$ は $v$ に依存しないので

   $$
   \Delta_g\psi
   =
   \psi_{uu}
   +
   \frac{f'}f\psi_u
   +
   \frac1{f^2}\psi_{vv}.
   $$

5. $f(u)=u$ とすると

   $$
   \Delta_g\psi
   =
   \psi_{uu}
   +
   \frac1u\psi_u
   +
   \frac1{u^2}\psi_{vv}.
   $$

   $u=r,\ v=\theta$ と読み替えれば

   $$
   \boxed{
   \Delta\psi
   =
   \psi_{rr}
   +
   \frac1r\psi_r
   +
   \frac1{r^2}\psi_{\theta\theta}
   }
   $$

   であり、極座標での Euclid Laplacian を回収します。

   重要なのは、この公式を座標変換で暗記したのではなく、

   $$
   g
   \longrightarrow
   \operatorname{vol}_g,\ \operatorname{grad}_g
   \longrightarrow
   \operatorname{div}_g
   \longrightarrow
   \Delta_g
   $$

   と内在的に導いたことです。
<!-- solution-end -->

---

## 12. 何を得たか

本章では、滑らかな多様体に

$$
g_p:T_pM\times T_pM\to\mathbb R
$$

という正定値内積を滑らかに与えるだけで、

$$
|v|_g,
\qquad
L_g(\gamma),
\qquad
E_g(\gamma),
\qquad
d_g(p,q),
\qquad
\operatorname{vol}_g,
\qquad
\operatorname{grad}_g,
\qquad
\operatorname{div}_g,
\qquad
\Delta_g
$$

を全て構成しました。

特に

$$
d_g
$$

は単なる補助量ではなく、元の多様体位相を正確に再現します。

一方、まだ「ベクトルを別の点へ運ぶ方法」はありません。異なる接空間

$$
T_pM,
\qquad
T_qM
$$

のベクトルを直接引き算することも、ベクトル場を接方向へ微分することも、現段階では定義されていません。

次の GEO13 では、この欠落を埋める **アフィン接続** と **Levi-Civita 接続** を構成し、平行移動と共変微分へ進みます。
