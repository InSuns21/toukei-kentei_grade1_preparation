# NS4 二次元 Navier--Stokes はなぜ大域的に制御できるか

NS3 では、三次元周期 Navier--Stokes に対しても

$$
u\in L^\infty_{\mathrm{loc}}([0,\infty);H)
\cap
L^2_{\mathrm{loc}}([0,\infty);V)
$$

を満たす Leray--Hopf 弱解を全時間で構成できることを証明しました。

しかし、そこから分かったのは「有限エネルギーの弱解が少なくとも一つ存在する」ということだけです。三次元では

$$
\sup_{0\le t\le T}\|\nabla u(t)\|_2
$$

を NS3 の基本エネルギーだけでは制御できず、弱解の一意性もまだ分かりません。

ところが空間次元を二次元にすると、事情が大きく変わります。

本章の中心は

$$
\boxed{
\text{速度 }u
\longrightarrow
\text{渦度 }\omega
\longrightarrow
\text{追加の }L^2\text{ エネルギー}
\longrightarrow
H^1\text{ の大域制御}
}
$$

という一本の流れです。

二次元では、三次元の渦度方程式に現れる「渦伸長」が消えます。その結果、渦度の $L^2$ ノルムについて、速度の基本 $L^2$ エネルギーと同じ型の散逸評価がもう一段上で閉じます。

この追加評価が

- 有限エネルギー弱解の一意性、
- 大域強解、
- 滑らかな初期値に対する大域正則性、

へ進める理由です。

「二次元だから簡単」という言葉で済ませず、**どの項が消え、どのノルムが新たに制御でき、その制御が一意性と正則性へどう使われるか**を式で追います。

---

## 1. 二次元の舞台とスカラー渦度

本章では

$$
\mathbb T^2=(-\pi,\pi]^2
$$

上の周期速度場

$$
u=(u_1,u_2)
$$

を扱います。

NS1、NS2 の三次元周期空間と同様に、平均零・発散零条件

$$
\int_{\mathbb T^2}u(x)\,dx=0,
\qquad
\nabla\cdot u
=
\partial_1u_1+\partial_2u_2
=
0
$$

を課します。

対応する $L^2$ 空間を $H_2$、$H^1$ 空間を $V_2$ と記します。

二次元では回転はベクトルではなく、一つのスカラーで表せます。

速度が局所的にどちら向きへ回転しているかを測る量が渦度です。

<a id="def-ns4-vorticity"></a>

<!-- formal-statement-start -->
> **定義（二次元スカラー渦度）**  
> 十分滑らかな二次元速度場
>
$$
u=(u_1,u_2)
$$
>
> に対して
>
$$
\boxed{
\omega
=
\partial_1u_2-\partial_2u_1
}
$$
>
> を二次元スカラー渦度という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ns4-vorticity -->
**定義の確認**

せん断流

$$
u(x_1,x_2)
=
(\sin x_2,0)
$$

を考えます。

発散は

$$
\nabla\cdot u
=
\partial_1(\sin x_2)+\partial_2 0
=
0
$$

です。

一方、渦度は

$$
\omega
=
\partial_1 0-\partial_2(\sin x_2)
=
-\cos x_2.
$$

速度自身は $x_1$ 方向を向いていますが、$x_2$ によって速さが変わるため、渦度は0ではありません。
<!-- definition-example-end -->

この例は後でも使います。非線形対流項は

$$
(u\cdot\nabla)u
=
\sin x_2\,\partial_1u
=
0
$$

なので、Navier--Stokes はこのモードを粘性で指数減衰させるだけです。

---

## 2. 二次元 Navier--Stokes から渦度方程式を導く

圧力を残した二次元非圧縮 Navier--Stokes 方程式を

$$
\partial_tu
+
(u\cdot\nabla)u
=
-\nabla p
+
\nu\Delta u
+
f,
$$

$$
\nabla\cdot u=0
$$

とします。

ここで

$$
f=(f_1,f_2)
$$

です。

第1成分と第2成分は

$$
\partial_tu_1
+
u_1\partial_1u_1
+
u_2\partial_2u_1
=
-\partial_1p
+
\nu\Delta u_1
+
f_1,
$$

$$
\partial_tu_2
+
u_1\partial_1u_2
+
u_2\partial_2u_2
=
-\partial_2p
+
\nu\Delta u_2
+
f_2.
$$

第2式へ $\partial_1$、第1式へ $\partial_2$ を作用させ、第2式から第1式を引きます。

時間微分は

$$
\partial_t(\partial_1u_2-\partial_2u_1)
=
\partial_t\omega.
$$

圧力項は

$$
-\partial_1\partial_2p
+
\partial_2\partial_1p
=
0
$$

と消えます。

粘性項は微分と Laplace 作用素を交換できるので

$$
\nu\Delta(\partial_1u_2-\partial_2u_1)
=
\nu\Delta\omega.
$$

問題は対流項です。

直接展開すると

$$
\begin{aligned}
&
\partial_1
\left(
u_1\partial_1u_2
+
u_2\partial_2u_2
\right)
-
\partial_2
\left(
u_1\partial_1u_1
+
u_2\partial_2u_1
\right)
\\
&=
u_1\partial_1
(\partial_1u_2-\partial_2u_1)
+
u_2\partial_2
(\partial_1u_2-\partial_2u_1)
\\
&\quad+
(\partial_1u_1)(\partial_1u_2)
+
(\partial_1u_2)(\partial_2u_2)
\\
&\quad-
(\partial_2u_1)(\partial_1u_1)
-
(\partial_2u_2)(\partial_2u_1).
\end{aligned}
$$

最後の4項をまとめると

$$
\begin{aligned}
&
(\partial_1u_1)(\partial_1u_2)
+
(\partial_1u_2)(\partial_2u_2)
\\
&\quad-
(\partial_2u_1)(\partial_1u_1)
-
(\partial_2u_2)(\partial_2u_1)
\\
&=
(\partial_1u_1+\partial_2u_2)
(\partial_1u_2-\partial_2u_1)
\\
&=
(\nabla\cdot u)\omega
=
0.
\end{aligned}
$$

したがって対流項は

$$
u_1\partial_1\omega+u_2\partial_2\omega
=
u\cdot\nabla\omega
$$

だけ残ります。

<a id="prop-ns4-vorticity-equation"></a>

<!-- formal-statement-start -->
> **命題（二次元周期 Navier--Stokes の渦度方程式）**  
> 十分滑らかな二次元周期 Navier--Stokes 解が
>
$$
\nabla\cdot u=0
$$
>
> を満たすとする。スカラー渦度
>
$$
\omega=\partial_1u_2-\partial_2u_1
$$
>
> は
>
$$
\boxed{
\partial_t\omega
+
u\cdot\nabla\omega
=
\nu\Delta\omega
+
\partial_1f_2-\partial_2f_1
}
$$
>
> を満たす。
<!-- formal-statement-end -->

### 何が重要だったか

導出で発散零条件を使った場所は、圧力を消した場所ではありません。

圧力は混合微分の交換で消えました。

発散零条件を使ったのは、対流項を

$$
u\cdot\nabla\omega
$$

だけへ縮約した場所です。

ここに二次元特有の構造が現れています。

---

## 3. 渦度は速度の一階微分をちょうど測る

渦度を制御しても、それが速度の正則性と無関係なら役に立ちません。

二次元の平均零・発散零周期場では、渦度の $L^2$ ノルムは速度の一階微分の $L^2$ ノルムと一致します。

Fourier 係数で直接確認します。

$k=(k_1,k_2)\in\mathbb Z^2\setminus\{0\}$ とし、速度の Fourier 係数を

$$
\widehat u(k)
=
(\widehat u_1(k),\widehat u_2(k))
$$

とします。

発散零条件は

$$
k_1\widehat u_1(k)
+
k_2\widehat u_2(k)
=
0
$$

です。

また渦度の Fourier 係数は

$$
\widehat\omega(k)
=
i
\left(
k_1\widehat u_2(k)
-
k_2\widehat u_1(k)
\right).
$$

ここで

$$
k^\perp=(-k_2,k_1)
$$

と置くと

$$
k^\perp\cdot\widehat u(k)
=
k_1\widehat u_2(k)
-
k_2\widehat u_1(k).
$$

$\widehat u(k)$ は $k$ に直交するので、二次元では $\widehat u(k)$ は $k^\perp$ の方向しか持ちません。

したがって

$$
\boxed{
\widehat u(k)
=
-\frac{i\,k^\perp}{|k|^2}\widehat\omega(k)
}
$$

です。

これは二次元周期版 Biot--Savart 再構成の Fourier 表示です。

<a id="prop-ns4-velocity-vorticity"></a>

<!-- formal-statement-start -->
> **命題（二次元速度--渦度 Fourier 対応）**  
> $u\in V_2$ を平均零・発散零周期速度場とし、
>
$$
\omega=\partial_1u_2-\partial_2u_1
$$
>
> とする。このとき各 $k\ne0$ で
>
$$
\widehat u(k)
=
-\frac{i\,k^\perp}{|k|^2}\widehat\omega(k)
$$
>
> が成り立つ。特に
>
$$
\boxed{
\|\nabla u\|_2
=
\|\omega\|_2
}
$$
>
> である。さらに $u$ が $H^2$ 級なら
>
$$
\boxed{
\|Au\|_2
=
\|\nabla\omega\|_2
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

各非零モードで発散零条件により $\widehat u(k)$ の方向が $k^\perp$ に固定されます。

渦度はその係数へ $|k|$ を一つ掛けた量です。さらに $\nabla\omega$ はもう一つ $|k|$ を掛けます。

<!-- proof-start -->
### 証明

発散零条件から

$$
k\cdot\widehat u(k)=0.
$$

二次元の $k^\perp$ は $k$ に直交し、

$$
|k^\perp|=|k|
$$

なので、ある複素数 $a_k$ を用いて

$$
\widehat u(k)=a_kk^\perp
$$

と書けます。

渦度係数は

$$
\widehat\omega(k)
=
i\,k^\perp\cdot\widehat u(k)
=
i\,a_k|k|^2.
$$

従って

$$
a_k
=
-\frac{i}{|k|^2}\widehat\omega(k),
$$

すなわち

$$
\widehat u(k)
=
-\frac{i\,k^\perp}{|k|^2}\widehat\omega(k).
$$

この式から

$$
|\widehat\omega(k)|^2
=
|k|^2|\widehat u(k)|^2.
$$

Parseval を使えば

$$
\|\omega\|_2^2
=
(2\pi)^2
\sum_{k\ne0}
|\widehat\omega(k)|^2
=
(2\pi)^2
\sum_{k\ne0}
|k|^2|\widehat u(k)|^2
=
\|\nabla u\|_2^2.
$$

また NS1 と同様、発散零周期場上では

$$
Au=-\Delta u.
$$

よって

$$
\|Au\|_2^2
=
(2\pi)^2
\sum_{k\ne0}
|k|^4|\widehat u(k)|^2.
$$

一方

$$
\|\nabla\omega\|_2^2
=
(2\pi)^2
\sum_{k\ne0}
|k|^2|\widehat\omega(k)|^2
=
(2\pi)^2
\sum_{k\ne0}
|k|^4|\widehat u(k)|^2.
$$

従って

$$
\|Au\|_2
=
\|\nabla\omega\|_2.
$$
<!-- proof-end -->

したがって渦度の $L^2$ 制御は、速度の $H^1$ 制御そのものです。

ここが二次元で渦度エネルギーを見る意味です。

---

## 4. 二次元では $L^4$ 評価の指数も有利になる

弱解の一意性には、二つの解の差 $w$ を $L^4$ で評価する必要があります。

三次元の NS2 では

$$
\|w\|_4
\le
C
\|w\|_2^{1/4}
\|\nabla w\|_2^{3/4}
$$

でした。

二次元では指数が変わり、

$$
\|w\|_4
\le
C
\|w\|_2^{1/2}
\|\nabla w\|_2^{1/2}
$$

となります。

この差が一意性の微分不等式を閉じます。

まず $\mathbb R^2$ 上の滑らかなコンパクト台関数 $g$ について、各点で一変数の基本定理を使います。

固定した $y$ に対して

$$
|g(x,y)|^2
=
\left|
\int_{-\infty}^x
\partial_s|g(s,y)|^2\,ds
\right|
\le
2
\int_{\mathbb R}
|g(s,y)|
|\partial_1g(s,y)|
\,ds.
$$

同様に固定した $x$ に対して

$$
|g(x,y)|^2
\le
2
\int_{\mathbb R}
|g(x,t)|
|\partial_2g(x,t)|
\,dt.
$$

二式を掛けて $x,y$ で積分し、Fubini と Cauchy--Schwarz を使うと

$$
\|g\|_4^4
\le
4
\|g\|_2^2
\|\partial_1g\|_2
\|\partial_2g\|_2.
$$

さらに

$$
2ab\le a^2+b^2
$$

から

$$
\|g\|_4^4
\le
2
\|g\|_2^2
\|\nabla g\|_2^2.
$$

周期関数には NS2 と同じく固定カットオフを掛けて $\mathbb R^2$ へ移します。

その際に生じる

$$
\|v\|_2
$$

の低次項は、平均零条件と周期 Poincaré 評価で $\|\nabla v\|_2$ に吸収できます。

<a id="prop-ns4-ladyzhenskaya"></a>

<!-- formal-statement-start -->
> **命題（二次元周期 Ladyzhenskaya 型評価）**  
> 平均零の
>
$$
v\in H^1(\mathbb T^2;\mathbb R^2)
$$
>
> に対して、領域だけに依存する定数 $C>0$ が存在し、
>
$$
\boxed{
\|v\|_{L^4(\mathbb T^2)}^2
\le
C
\|v\|_{L^2(\mathbb T^2)}
\|\nabla v\|_{L^2(\mathbb T^2)}
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

まず $\mathbb R^2$ 上のコンパクト台関数について、直前に導いた

$$
\|g\|_4^4
\le
2\|g\|_2^2\|\nabla g\|_2^2
$$

を使います。周期関数を周期延長し、固定カットオフを掛けてこの不等式へ入れます。カットオフの微分から生じる $L^2$ 項は、平均零の周期 Poincaré 評価で勾配へ吸収します。

<!-- proof-start -->
### 証明

$v$ を $\mathbb R^2$ へ周期延長したものを $\widetilde v$ とします。滑らかな固定カットオフ

$$
\chi\in C_c^\infty(\mathbb R^2)
$$

を

$$
\chi=1
\quad\text{on }[-\pi,\pi]^2,
$$

$$
\operatorname{supp}\chi
\subset
(-2\pi,2\pi)^2
$$

となるように取ります。

$$
g=\chi\widetilde v
$$

と置くと、直前に $\mathbb R^2$ 上で導いた評価から

$$
\|g\|_{L^4(\mathbb R^2)}^2
\le
C
\|g\|_{L^2(\mathbb R^2)}
\|\nabla g\|_{L^2(\mathbb R^2)}.
$$

$\chi=1$ on $[-\pi,\pi]^2$ なので

$$
\|v\|_{L^4(\mathbb T^2)}
\le
\|g\|_{L^4(\mathbb R^2)}.
$$

また $\chi$ の台は有限個の周期セルに含まれるため、周期性から定数 $C_1,C_2>0$ が存在して

$$
\|g\|_{L^2(\mathbb R^2)}
\le
C_1\|v\|_{L^2(\mathbb T^2)}
$$

です。さらに積の微分

$$
\nabla g
=
(\nabla\chi)\widetilde v
+
\chi\nabla\widetilde v
$$

より

$$
\|\nabla g\|_{L^2(\mathbb R^2)}
\le
C_2
\left(
\|v\|_{L^2(\mathbb T^2)}
+
\|\nabla v\|_{L^2(\mathbb T^2)}
\right).
$$

平均零の周期場には NS2 と同じ Fourier 議論で

$$
\|v\|_2
\le
\|\nabla v\|_2
$$

が成り立つので

$$
\|\nabla g\|_2
\le
2C_2\|\nabla v\|_2.
$$

以上を組み合わせると

$$
\begin{aligned}
\|v\|_4^2
&\le
\|g\|_4^2
\\
&\le
C
\|g\|_2
\|\nabla g\|_2
\\
&\le
C'
\|v\|_2
\|\nabla v\|_2.
\end{aligned}
$$

これが求める周期版評価です。
<!-- proof-end -->

### なぜ三次元と違うのか

二乗した形で比べると、

二次元は

$$
\|v\|_4^2
\le
C
\|v\|_2
\|\nabla v\|_2,
$$

三次元は NS2 から

$$
\|v\|_4^2
\le
C
\|v\|_2^{1/2}
\|\nabla v\|_2^{3/2}
$$

です。

二次元では勾配の指数が1で済みます。

一意性証明で Young の不等式を使うと、この指数差が決定的になります。

---

## 5. 渦度の $L^2$ エネルギーは閉じる

無外力の場合から始めます。

渦度方程式は

$$
\partial_t\omega
+
u\cdot\nabla\omega
=
\nu\Delta\omega.
$$

これへ $\omega$ を掛けて積分します。

時間項は

$$
\int
\partial_t\omega\,\omega\,dx
=
\frac12
\frac{d}{dt}
\|\omega\|_2^2.
$$

粘性項は周期部分積分により

$$
\nu\int
\Delta\omega\,\omega\,dx
=
-\nu\|\nabla\omega\|_2^2.
$$

対流項は

$$
\int
(u\cdot\nabla\omega)\omega\,dx
=
\frac12
\int
u\cdot\nabla(\omega^2)\,dx.
$$

さらに周期部分積分すると

$$
\frac12
\int
u\cdot\nabla(\omega^2)\,dx
=
-\frac12
\int
(\nabla\cdot u)\omega^2\,dx
=
0.
$$

したがって

$$
\frac12
\frac{d}{dt}
\|\omega\|_2^2
+
\nu
\|\nabla\omega\|_2^2
=
0.
$$

外力がある場合は

$$
g
=
\partial_1f_2-\partial_2f_1
$$

とすると

$$
\frac12
\frac{d}{dt}
\|\omega\|_2^2
+
\nu
\|\nabla\omega\|_2^2
=
\langle g,\omega\rangle.
$$

右辺は $f$ 自身を微分しなくても、周期部分積分により

$$
\begin{aligned}
\langle g,\omega\rangle
&=
\int
(\partial_1f_2-\partial_2f_1)\omega\,dx
\\
&=
\int
\left(
f_1\partial_2\omega
-
f_2\partial_1\omega
\right)\,dx.
\end{aligned}
$$

従って

$$
|\langle g,\omega\rangle|
\le
\|f\|_2
\|\nabla\omega\|_2.
$$

Young の不等式から

$$
\|f\|_2
\|\nabla\omega\|_2
\le
\frac1{2\nu}\|f\|_2^2
+
\frac\nu2
\|\nabla\omega\|_2^2.
$$

よって

$$
\frac{d}{dt}
\|\omega\|_2^2
+
\nu
\|\nabla\omega\|_2^2
\le
\frac1\nu
\|f\|_2^2.
$$

<a id="thm-ns4-enstrophy"></a>

<!-- formal-statement-start -->
> **定理（二次元渦度エネルギーと大域 H1 評価）**  
> $\nu>0$ とし、十分滑らかな二次元周期 Navier--Stokes 解を考える。初期値
>
$$
u_0\in V_2
$$
>
> と外力
>
$$
f\in L^2(0,T;H_2)
$$
>
> に対して、任意の $t\in[0,T]$ で
>
$$
\boxed{
\|\nabla u(t)\|_2^2
+
\nu
\int_0^t
\|Au(s)\|_2^2\,ds
\le
\|\nabla u_0\|_2^2
+
\frac1\nu
\int_0^t
\|f(s)\|_2^2\,ds
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

渦度エネルギー評価へ、第3節の恒等式

$$
\|\omega\|_2=\|\nabla u\|_2,
\qquad
\|\nabla\omega\|_2=\|Au\|_2
$$

を代入するだけです。

つまり二次元では

$$
\boxed{
u\in
L^\infty(0,T;V_2)
\cap
L^2(0,T;D(A))
}
$$

という一段強い大域評価が得られます。

<!-- proof-start -->
### 証明

上で導いた微分不等式

$$
\frac{d}{dt}
\|\omega\|_2^2
+
\nu
\|\nabla\omega\|_2^2
\le
\frac1\nu
\|f\|_2^2
$$

を $0$ から $t$ まで積分すると

$$
\|\omega(t)\|_2^2
+
\nu
\int_0^t
\|\nabla\omega(s)\|_2^2\,ds
\le
\|\omega_0\|_2^2
+
\frac1\nu
\int_0^t
\|f(s)\|_2^2\,ds.
$$

第3節から

$$
\|\omega(t)\|_2
=
\|\nabla u(t)\|_2,
$$

$$
\|\nabla\omega(t)\|_2
=
\|Au(t)\|_2.
$$

これを代入すれば

$$
\|\nabla u(t)\|_2^2
+
\nu
\int_0^t
\|Au(s)\|_2^2\,ds
\le
\|\nabla u_0\|_2^2
+
\frac1\nu
\int_0^t
\|f(s)\|_2^2\,ds.
$$
<!-- proof-end -->

### 直接例：せん断流

無外力で

$$
u(t,x_1,x_2)
=
e^{-\nu t}
(\sin x_2,0)
$$

とします。

渦度は

$$
\omega(t,x)
=
-e^{-\nu t}\cos x_2.
$$

したがって

$$
\|\omega(t)\|_2^2
=
e^{-2\nu t}\|\omega_0\|_2^2.
$$

また

$$
\|\nabla\omega(t)\|_2^2
=
\|\omega(t)\|_2^2
$$

なので

$$
\frac12
\frac{d}{dt}
\|\omega(t)\|_2^2
+
\nu
\|\nabla\omega(t)\|_2^2
=
0
$$

を等号で確認できます。

---

## 6. なぜこの評価が三次元より強いのか

NS3 の基本エネルギーは二次元でも三次元でも

$$
u\in
L^\infty_tL^2_x
\cap
L^2_tH^1_x
$$

を与えます。

二次元では渦度エネルギーがさらに

$$
u\in
L^\infty_tH^1_x
\cap
L^2_tH^2_x
$$

まで押し上げます。

違いを時間ノルムだけ見ても、

NS3 では

$$
\int_0^T
\|\nabla u(t)\|_2^2\,dt<\infty
$$

だけでした。

NS4 では

$$
\boxed{
\sup_{0\le t\le T}
\|\nabla u(t)\|_2^2
<\infty
}
$$

まで得られます。

強解が有限時間で壊れるなら、典型的には一階以上の微分ノルムが制御不能になる必要があります。

二次元では、その最初の候補である $H^1$ ノルムが渦度エネルギーによって全時間で抑えられます。

これが大域正則性の入口です。

---

## 7. 二次元では Leray--Hopf 弱解も一意になる

NS3 では三次元弱解を少なくとも一つ作りましたが、一意性までは得ませんでした。

二次元では第4節の $L^4$ 評価により差のエネルギー評価が閉じます。

同じ初期値・同じ外力を持つ二つの Leray--Hopf 弱解を

$$
u,\ v
$$

とし、

$$
w=u-v
$$

と置きます。

差の方程式は

$$
\partial_tw
+
\nu Aw
+
B(u,u)-B(v,v)
=
0.
$$

非線形差を

$$
B(u,u)-B(v,v)
=
B(w,u)+B(v,w)
$$

と分解します。

ここで Leray--Hopf 弱解に対して $w$ を試験関数に使う正当化も確認しておきます。二次元 Ladyzhenskaya 型評価から

$$
\|u(t)\|_4^2
\le
C
\|u(t)\|_2
\|\nabla u(t)\|_2.
$$

したがって

$$
\|B(u,u)\|_{V_2^*}
\le
C\|u\|_4^2
\le
C\|u\|_2\|\nabla u\|_2.
$$

Leray--Hopf 条件

$$
u\in L^\infty(0,T;H_2)
\cap
L^2(0,T;V_2)
$$

から右辺は $L^2(0,T)$ に属します。粘性項 $Au$ と外力も $L^2(0,T;V_2^*)$ に入るので

$$
\partial_tu\in L^2(0,T;V_2^*).
$$

同様に $v$ と差 $w=u-v$ についても

$$
w\in L^2(0,T;V_2),
\qquad
\partial_tw\in L^2(0,T;V_2^*)
$$

です。したがって時間方向を Steklov 平均

$$
w_h(t)
=
\frac1h
\int_t^{t+h}w(s)\,ds
$$

で平滑化し、弱形式へ $w_h$ を入れて時間積分した後に $h\downarrow0$ とすれば、差のエネルギー等式を正当化できます。以下の「$w$ と内積を取る」は、この標準的な近似操作を省略せずに言えばこの極限を指します。

$w$ と内積を取ると、NS2 の相殺から

$$
b(v,w,w)=0.
$$

従って

$$
\frac12
\frac{d}{dt}
\|w\|_2^2
+
\nu
\|\nabla w\|_2^2
=
-b(w,u,w).
$$

Hölder の不等式で

$$
|b(w,u,w)|
\le
\|w\|_4^2
\|\nabla u\|_2.
$$

二次元 Ladyzhenskaya 型評価を入れると

$$
|b(w,u,w)|
\le
C
\|w\|_2
\|\nabla w\|_2
\|\nabla u\|_2.
$$

Young の不等式から

$$
C
\|w\|_2
\|\nabla w\|_2
\|\nabla u\|_2
\le
\frac\nu2
\|\nabla w\|_2^2
+
\frac{C^2}{2\nu}
\|\nabla u\|_2^2
\|w\|_2^2.
$$

したがって

$$
\frac{d}{dt}
\|w\|_2^2
\le
\frac{C^2}{\nu}
\|\nabla u\|_2^2
\|w\|_2^2.
$$

NS3 の Leray--Hopf 条件から

$$
\int_0^T
\|\nabla u(t)\|_2^2\,dt
<\infty.
$$

係数が時間積分可能なので、積分因子で直接処理できます。

<a id="thm-ns4-weak-uniqueness"></a>

<!-- formal-statement-start -->
> **定理（二次元 Leray--Hopf 弱解の一意性）**  
> 二次元周期 Navier--Stokes 方程式について、同じ初期値
>
$$
u_0\in H_2
$$
>
> と同じ外力を持つ Leray--Hopf 弱解は高々一つである。
<!-- formal-statement-end -->

### 証明の見取り図

差 $w=u-v$ の $L^2$ エネルギーへ、二次元の

$$
\|w\|_4^2
\le
C
\|w\|_2
\|\nabla w\|_2
$$

を入れます。

すると右辺の係数は

$$
\|\nabla u\|_2^2
$$

になり、Leray--Hopf エネルギーだけで時間積分可能です。

<!-- proof-start -->
### 証明

上で得た不等式を

$$
y(t)=\|w(t)\|_2^2,
$$

$$
a(t)=\frac{C^2}{\nu}\|\nabla u(t)\|_2^2
$$

と書けば

$$
y'(t)\le a(t)y(t)
$$

です。

$a\in L^1(0,T)$ なので

$$
A(t)=\int_0^ta(s)\,ds
$$

は有限です。

積分因子を掛け、

$$
z(t)=e^{-A(t)}y(t)
$$

と置くと

$$
z'(t)
=
e^{-A(t)}
\{y'(t)-a(t)y(t)\}
\le0.
$$

二つの解は同じ初期値を持つので

$$
y(0)=\|u_0-u_0\|_2^2=0.
$$

従って

$$
z(t)\le z(0)=0.
$$

一方 $z(t)\ge0$ なので

$$
z(t)=0.
$$

よって

$$
y(t)=0
$$

であり、

$$
u(t)=v(t)
$$

が全ての時刻で成り立ちます。
<!-- proof-end -->

### 三次元では同じ計算がどう変わるか

三次元の NS2 の評価では

$$
\|w\|_4^2
\le
C
\|w\|_2^{1/2}
\|\nabla w\|_2^{3/2}.
$$

したがって

$$
|b(w,u,w)|
\le
C
\|w\|_2^{1/2}
\|\nabla w\|_2^{3/2}
\|\nabla u\|_2.
$$

Young の不等式で $\|\nabla w\|_2^2$ を吸収すると、残る係数は概ね

$$
\|\nabla u\|_2^4
$$

になります。

しかし Leray--Hopf 条件が与えるのは

$$
\|\nabla u\|_2^2\in L^1(0,T)
$$

までです。

$$
\|\nabla u\|_2^4\in L^1(0,T)
$$

は保証されません。

ここでも二次元と三次元の差が指数として現れます。

---

## 8. 大域強解を Galerkin から作る

一意性だけでなく、初期値が一階微分を持つなら二次元では強解を全時間で作れます。

NS3 と同じ Fourier--Galerkin 近似を

$$
u_m(t)\in H_m
$$

とします。

NS3 の基本エネルギー評価に加え、第5節の渦度計算は Galerkin 解にもそのまま適用できます。

したがって任意の有限 $T$ に対して

$$
\sup_m
\|u_m\|_{L^\infty(0,T;V_2)}
<\infty,
$$

$$
\sup_m
\|Au_m\|_{L^2(0,T;H_2)}
<\infty.
$$

が得られます。

これで空間方向は一段強くなりました。

時間微分も $H_2$ まで上げられることを確認します。

方程式は

$$
\partial_tu_m
=
-\nu Au_m
-
B(u_m,u_m)
+
P_mf.
$$

粘性項と外力は $L^2(0,T;H_2)$ に入ります。

非線形項を調べます。

Hölder により

$$
\|B(u_m,u_m)\|_2
\le
\|u_m\|_4
\|\nabla u_m\|_4.
$$

第4節と Poincaré 評価から

$$
\|u_m\|_4
\le
C
\|u_m\|_{V_2}.
$$

また $\nabla u_m$ の各成分は周期平均が0なので、同じ二次元 $L^4$ 評価を微分へ適用し、

$$
\|\nabla u_m\|_4^2
\le
C
\|\nabla u_m\|_2
\|D^2u_m\|_2.
$$

Fourier 表示から

$$
\|D^2u_m\|_2
\le
C\|Au_m\|_2.
$$

従って

$$
\|\nabla u_m\|_4
\le
C
\|u_m\|_{V_2}^{1/2}
\|Au_m\|_2^{1/2}.
$$

よって

$$
\|B(u_m,u_m)\|_2
\le
C
\|u_m\|_{V_2}^{3/2}
\|Au_m\|_2^{1/2}.
$$

二乗すると

$$
\|B(u_m,u_m)\|_2^2
\le
C
\|u_m\|_{V_2}^3
\|Au_m\|_2.
$$

したがって

$$
\begin{aligned}
\int_0^T
\|B(u_m,u_m)\|_2^2\,dt
&\le
C
\|u_m\|_{L^\infty(0,T;V_2)}^3
\int_0^T
\|Au_m\|_2\,dt
\\
&\le
C
T^{1/2}
\|u_m\|_{L^\infty(0,T;V_2)}^3
\|Au_m\|_{L^2(0,T;H_2)}.
\end{aligned}
$$

右辺は $m$ に依らず有界です。

従って

$$
\partial_tu_m
\text{ は }
L^2(0,T;H_2)
\text{ で一様有界}
$$

です。

NS3 の周期版 Aubin--Lions 型コンパクト性を一段強い空間へ適用すれば、部分列を取り、

$$
u_m\to u
\quad\text{strongly in }L^2(0,T;V_2)
$$

を得られます。

非線形項を極限へ送り、弱収束に対するノルムの liminf 評価で上の $L^\infty_tV_2\cap L^2_tD(A)$ 評価を残せます。

<a id="thm-ns4-global-strong"></a>

<!-- formal-statement-start -->
> **定理（二次元周期 Navier--Stokes の大域強解）**  
> $\nu>0$、
>
$$
u_0\in V_2,
\qquad
f\in L^2_{\mathrm{loc}}([0,\infty);H_2)
$$
>
> とする。このとき二次元周期 Navier--Stokes 方程式には一意な大域解 $u$ が存在し、任意の $T>0$ に対して
>
$$
\boxed{
u\in
L^\infty(0,T;V_2)
\cap
L^2(0,T;D(A))
}
$$
>
> および
>
$$
\boxed{
\partial_tu\in L^2(0,T;H_2)
}
$$
>
> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

存在は NS3 の Galerkin 構成を使い、そこへ二次元渦度エネルギーを追加します。

一意性は第7節ですでに証明済みです。

したがって二次元では「弱解を作る」だけでなく、その解が初期値 $u_0\in V_2$ なら大域強解へ持ち上がります。

<!-- proof-start -->
### 証明

任意の $T>0$ を固定します。

NS3 と同じ Galerkin 系を二次元 Fourier 基底で作ります。有限次元 ODE の局所解は基本 $L^2$ エネルギー評価により $[0,T]$ 全体へ延長できます。

さらに第5節の渦度エネルギーを Galerkin 解へ適用して

$$
\sup_m
\|u_m\|_{L^\infty(0,T;V_2)}
+
\sup_m
\|Au_m\|_{L^2(0,T;H_2)}
<\infty
$$

を得ます。

上で導いた非線形項評価から

$$
\sup_m
\|B(u_m,u_m)\|_{L^2(0,T;H_2)}
<\infty.
$$

方程式

$$
\partial_tu_m
=
-\nu Au_m-B(u_m,u_m)+P_mf
$$

により

$$
\sup_m
\|\partial_tu_m\|_{L^2(0,T;H_2)}
<\infty.
$$

周期 Fourier モードを使う NS3 のコンパクト性証明を、強い空間 $D(A)$、中間空間 $V_2$、弱い空間 $H_2$ に置き換えます。

高周波では

$$
\|(I-Q_K)v\|_{V_2}
\le
\frac1K
\|Av\|_2
$$

が Fourier 係数から従います。

低周波は有限次元で、$\partial_tu_m$ の $L^2_tH_2$ 評価から時間等連続性を得ます。

従って部分列を取って

$$
u_m\to u
\quad\text{strongly in }L^2(0,T;V_2).
$$

この強収束と一様 $L^\infty_tV_2$、$L^2_tD(A)$ 評価を使えば、三重線形項を弱形式で極限へ送れます。

弱収束に対するノルムの liminf 評価により

$$
u\in
L^\infty(0,T;V_2)
\cap
L^2(0,T;D(A)).
$$

極限方程式から

$$
\partial_tu
=
-\nu Au-B(u,u)+f
\in
L^2(0,T;H_2).
$$

第7節の弱解一意性により、この強解は一意です。

$T$ は任意だったので解は全時間へ延長されます。
<!-- proof-end -->

---

## 9. 滑らかなデータでは、なぜさらに滑らかさを失わないのか

大域強解の評価は

$$
u\in
L^\infty_tH^1_x
\cap
L^2_tH^2_x
$$

までです。

「大域正則性」という言葉で滑らかな解を考える場合は、その先の高階微分も有限時間で保たれることを確認する必要があります。

ここで重要なのは、二次元では $H^1$ ノルムが既に大域的に抑えられていることです。

高階微分を取ったときに現れる非線形項は、常に

$$
D^\alpha
\bigl((u\cdot\nabla)u\bigr)
$$

の Leibniz 展開です。

例えば一階微分なら

$$
\partial_j
\bigl((u\cdot\nabla)u\bigr)
=
(\partial_ju\cdot\nabla)u
+
(u\cdot\nabla)\partial_ju.
$$

後者を $\partial_ju$ と内積すると、発散零条件により

$$
\int
(u\cdot\nabla)\partial_ju
\cdot
\partial_ju\,dx
=
0.
$$

したがって高階エネルギーで本当に評価すべきなのは、微分が速度係数側にも掛かった交換項です。

二次元では $H^1$ と $H^2$ の制御から、有限時間区間上で必要な $L^4$ 型積評価を繰り返し使えます。

各段階で最高階の散逸項の半分を Young の不等式で左辺へ吸収し、残りを既に一段下で制御済みのノルムへ落とします。

構造は

$$
\frac{d}{dt}X_m(t)
+
\nu Y_m(t)
\le
a_m(t)X_m(t)
+
F_m(t)
$$

です。

ここで

- $X_m$ は $H^m$ 級のエネルギー、
- $Y_m$ は一階上の散逸、
- $a_m$ は前段階までのノルムから作られ、任意の有限時間区間で積分可能、
- $F_m$ は外力の対応する高階ノルム、

となります。

したがって積分因子を使えば $X_m$ は有限時間で発散しません。

これを $m=1,2,3,\ldots$ と帰納的に繰り返せます。

特に初期値と外力が滑らかなら、任意の有限 $T$ に対して必要な Sobolev ノルムを有限に保てるため、滑らかさは有限時間で失われません。

大事なのは、「粘性があるから自動的に滑らか」ということではありません。

その前に、**非線形項を吸収するための低階ノルムが大域的に制御できている**必要があります。

二次元では第5節の渦度エネルギーがその土台を与えます。

---

## 10. 二次元では渦伸長項そのものが存在しない

ここまでの計算では二次元渦度方程式を直接成分計算しました。

三次元との違いをさらに明確にするため、二次元速度場を三次元へ埋め込みます。

$$
u(x_1,x_2,x_3)
=
(u_1(x_1,x_2),u_2(x_1,x_2),0).
$$

このとき三次元の渦度ベクトルは

$$
\boldsymbol\omega
=
\nabla\times u
=
(0,0,\omega),
$$

ただし

$$
\omega
=
\partial_1u_2-\partial_2u_1.
$$

また全ての量は $x_3$ に依存しないので

$$
\partial_3u=0.
$$

従って

$$
(\boldsymbol\omega\cdot\nabla)u
=
\omega\partial_3u
=
0.
$$

<a id="prop-ns4-no-vortex-stretching"></a>

<!-- formal-statement-start -->
> **命題（二次元では渦伸長項が消える）**  
> 二次元速度場を
>
$$
u=(u_1(x_1,x_2),u_2(x_1,x_2),0)
$$
>
> と三次元へ埋め込むと、
>
$$
\boldsymbol\omega
=
(0,0,\omega)
$$
>
> かつ
>
$$
\partial_3u=0
$$
>
> なので
>
$$
\boxed{
(\boldsymbol\omega\cdot\nabla)u=0
}
$$
>
> である。
<!-- formal-statement-end -->

この0が、本章の全てを支えています。

---

## 11. 三次元では渦度エネルギーに何が残るのか

三次元の滑らかな非圧縮 Navier--Stokes では、渦度ベクトル

$$
\boldsymbol\omega
=
\nabla\times u
$$

は

$$
\partial_t\boldsymbol\omega
+
(u\cdot\nabla)\boldsymbol\omega
=
(\boldsymbol\omega\cdot\nabla)u
+
\nu\Delta\boldsymbol\omega
+
\nabla\times f
$$

を満たします。

この式の本格的な導出は NS7 で扱いますが、本章では二次元との差を見るためにエネルギー式だけ先に比較します。

$\boldsymbol\omega$ と内積を取ると、対流項は二次元と同じく発散零条件で消えます。

しかし

$$
(\boldsymbol\omega\cdot\nabla)u
$$

は残ります。

したがって無外力でも

$$
\frac12
\frac{d}{dt}
\|\boldsymbol\omega\|_2^2
+
\nu
\|\nabla\boldsymbol\omega\|_2^2
=
\int_{\mathbb T^3}
((\boldsymbol\omega\cdot\nabla)u)
\cdot
\boldsymbol\omega
\,dx.
$$

右辺には一般に符号がありません。

二次元なら右辺は正確に0でした。

三次元では、この項を基本 $L^2$ エネルギーだけで一様に吸収できません。

したがって

$$
\boxed{
\text{2D: 渦度エネルギーが閉じる}
}
$$

のに対し、

$$
\boxed{
\text{3D: 渦伸長が渦度エネルギーへ戻ってくる}
}
$$

という差が生じます。

NS5 では、この差を速度の $H^1$ エネルギー側から見直します。三次元でも短時間なら評価できますが、得られる微分不等式が大域上界を与えないことを確認します。

---

## 12. 何が解けたか

二次元では、NS3 の大域弱解存在に対して三つの追加事実が得られました。

第一に、渦度エネルギーから

$$
u\in
L^\infty_tH^1_x
\cap
L^2_tH^2_x
$$

という大域制御が得られます。

第二に、二次元 Ladyzhenskaya 型評価から、Leray--Hopf 弱解の差のエネルギーが閉じ、一意性が得られます。

第三に、初期値が $H^1$ を持てば、Galerkin 近似を一段強いコンパクト性へ持ち上げて大域強解を構成できます。

さらに滑らかな初期値・外力に対しては、高階微分エネルギーを有限時間ごとに繰り返すことで滑らかさを保てます。

要するに

$$
\boxed{
\text{2D}
:
\text{渦伸長なし}
\Rightarrow
\text{渦度 }L^2\text{ 評価}
\Rightarrow
H^1\text{ 大域制御}
\Rightarrow
\text{一意性・大域強解}
}
$$

です。

三次元では最初の矢印のところで

$$
(\boldsymbol\omega\cdot\nabla)u
$$

が残ります。

これが NS5 以降の主題です。

---

## 13. 演習

### Level A

<a id="ex-ns4-a01"></a>
#### NS4-A01 渦度方程式の対流項
- Level: A

二次元速度場 $u=(u_1,u_2)$ に対して

$$
\omega=\partial_1u_2-\partial_2u_1
$$

とする。

$$
\partial_1((u\cdot\nabla)u_2)
-
\partial_2((u\cdot\nabla)u_1)
$$

を展開し、$\nabla\cdot u=0$ のとき

$$
u\cdot\nabla\omega
$$

になることを示せ。

<!-- solution-start -->
#### 詳細解答

まず

$$
(u\cdot\nabla)u_2
=
u_1\partial_1u_2
+
u_2\partial_2u_2,
$$

$$
(u\cdot\nabla)u_1
=
u_1\partial_1u_1
+
u_2\partial_2u_1.
$$

従って差は

$$
\begin{aligned}
&
\partial_1u_1\,\partial_1u_2
+
u_1\partial_{11}u_2
+
\partial_1u_2\,\partial_2u_2
+
u_2\partial_{12}u_2
\\
&\quad-
\partial_2u_1\,\partial_1u_1
-
u_1\partial_{21}u_1
-
\partial_2u_2\,\partial_2u_1
-
u_2\partial_{22}u_1.
\end{aligned}
$$

$u_1,u_2$ を係数に持つ項をまとめると

$$
u_1\partial_1
(\partial_1u_2-\partial_2u_1)
+
u_2\partial_2
(\partial_1u_2-\partial_2u_1)
=
u\cdot\nabla\omega.
$$

残りは

$$
\begin{aligned}
&
(\partial_1u_1)(\partial_1u_2)
+
(\partial_1u_2)(\partial_2u_2)
\\
&\quad-
(\partial_2u_1)(\partial_1u_1)
-
(\partial_2u_2)(\partial_2u_1)
\\
&=
(\partial_1u_1+\partial_2u_2)
(\partial_1u_2-\partial_2u_1)
\\
&=
(\nabla\cdot u)\omega.
\end{aligned}
$$

発散零ならこの項は0なので、結論は

$$
u\cdot\nabla\omega
$$

です。
<!-- solution-end -->

<a id="ex-ns4-a02"></a>
#### NS4-A02 速度--渦度 Fourier 再構成
- Level: A

$k\ne0$ とし、

$$
k\cdot\widehat u(k)=0,
$$

$$
\widehat\omega(k)
=
i(k_1\widehat u_2-k_2\widehat u_1)
$$

を仮定する。

$$
\widehat u(k)
=
-\frac{i\,k^\perp}{|k|^2}
\widehat\omega(k)
$$

を導け。

<!-- solution-start -->
#### 詳細解答

二次元では $k$ に直交する方向は $k^\perp=(-k_2,k_1)$ の一次元だけです。

従って

$$
\widehat u(k)=a_kk^\perp
$$

と書けます。

すると

$$
\widehat\omega(k)
=
i\,k^\perp\cdot\widehat u(k)
=
i\,a_k|k|^2.
$$

従って

$$
a_k
=
-\frac{i}{|k|^2}
\widehat\omega(k).
$$

これを $\widehat u(k)=a_kk^\perp$ へ戻せば

$$
\widehat u(k)
=
-\frac{i\,k^\perp}{|k|^2}
\widehat\omega(k).
$$
<!-- solution-end -->

<a id="ex-ns4-a03"></a>
#### NS4-A03 渦度と $H^1$ ノルム
- Level: A

平均零・発散零の二次元周期場 $u$ について

$$
\|\omega\|_2
=
\|\nabla u\|_2
$$

を Parseval から示せ。

<!-- solution-start -->
#### 詳細解答

A02 から

$$
|\widehat\omega(k)|^2
=
|k|^2|\widehat u(k)|^2.
$$

したがって

$$
\begin{aligned}
\|\omega\|_2^2
&=
(2\pi)^2
\sum_{k\ne0}
|\widehat\omega(k)|^2
\\
&=
(2\pi)^2
\sum_{k\ne0}
|k|^2|\widehat u(k)|^2
\\
&=
\|\nabla u\|_2^2.
\end{aligned}
$$

両辺は非負なので平方根を取れば結論です。
<!-- solution-end -->

<a id="ex-ns4-a04"></a>
#### NS4-A04 渦度エネルギー
- Level: A

無外力二次元渦度方程式

$$
\partial_t\omega
+
u\cdot\nabla\omega
=
\nu\Delta\omega
$$

から

$$
\frac12
\frac{d}{dt}
\|\omega\|_2^2
+
\nu
\|\nabla\omega\|_2^2
=
0
$$

を導け。

<!-- solution-start -->
#### 詳細解答

$\omega$ を掛けて積分します。

時間項は

$$
\int
\partial_t\omega\,\omega
=
\frac12
\frac{d}{dt}
\|\omega\|_2^2.
$$

対流項は

$$
\int
(u\cdot\nabla\omega)\omega
=
\frac12
\int
u\cdot\nabla(\omega^2).
$$

周期部分積分により

$$
\frac12
\int
u\cdot\nabla(\omega^2)
=
-\frac12
\int
(\nabla\cdot u)\omega^2
=
0.
$$

粘性項は

$$
\nu
\int
\Delta\omega\,\omega
=
-\nu
\|\nabla\omega\|_2^2.
$$

従って結論を得ます。
<!-- solution-end -->

<a id="ex-ns4-a05"></a>
#### NS4-A05 二次元では渦伸長が0
- Level: A

二次元速度場を

$$
u=(u_1(x_1,x_2),u_2(x_1,x_2),0)
$$

と三次元へ埋め込む。

三次元渦度 $\boldsymbol\omega=\nabla\times u$ を計算し、

$$
(\boldsymbol\omega\cdot\nabla)u=0
$$

を示せ。

<!-- solution-start -->
#### 詳細解答

$x_3$ 依存がなく $u_3=0$ なので

$$
\boldsymbol\omega
=
\left(
\partial_2u_3-\partial_3u_2,
\partial_3u_1-\partial_1u_3,
\partial_1u_2-\partial_2u_1
\right)
=
(0,0,\omega).
$$

従って

$$
\boldsymbol\omega\cdot\nabla
=
\omega\partial_3.
$$

しかし $u$ は $x_3$ に依存しないため

$$
\partial_3u=0.
$$

よって

$$
(\boldsymbol\omega\cdot\nabla)u
=
\omega\partial_3u
=
0.
$$
<!-- solution-end -->

### Level B

<a id="ex-ns4-b01"></a>
#### NS4-B01 二次元弱解の一意性
- Level: B

同じ初期値・外力を持つ二つの二次元 Leray--Hopf 弱解 $u,v$ を取り、

$$
w=u-v
$$

とする。

二次元 Ladyzhenskaya 型評価を使って

$$
\frac{d}{dt}
\|w\|_2^2
\le
C_\nu
\|\nabla u\|_2^2
\|w\|_2^2
$$

を導き、$w=0$ を示せ。

<!-- solution-start -->
#### 詳細解答

差の方程式は

$$
\partial_tw
+
\nu Aw
+
B(w,u)
+
B(v,w)
=
0.
$$

$w$ と内積を取ります。

NS2 の反対称性から

$$
b(v,w,w)=0.
$$

従って

$$
\frac12
\frac{d}{dt}
\|w\|_2^2
+
\nu
\|\nabla w\|_2^2
=
-b(w,u,w).
$$

Hölder と二次元 Ladyzhenskaya 型評価より

$$
\begin{aligned}
|b(w,u,w)|
&\le
\|w\|_4^2
\|\nabla u\|_2
\\
&\le
C
\|w\|_2
\|\nabla w\|_2
\|\nabla u\|_2.
\end{aligned}
$$

Young の不等式で

$$
|b(w,u,w)|
\le
\frac\nu2
\|\nabla w\|_2^2
+
C_\nu
\|\nabla u\|_2^2
\|w\|_2^2.
$$

左辺へ散逸の半分を戻せば

$$
\frac{d}{dt}
\|w\|_2^2
\le
2C_\nu
\|\nabla u\|_2^2
\|w\|_2^2.
$$

係数は Leray--Hopf 条件から $L^1(0,T)$ です。

$$
A(t)
=
2C_\nu
\int_0^t
\|\nabla u(s)\|_2^2\,ds
$$

と置き、

$$
z(t)
=
e^{-A(t)}
\|w(t)\|_2^2
$$

とすれば

$$
z'(t)\le0.
$$

初期値が同じなので $z(0)=0$ です。

$z\ge0$ でもあるから

$$
z(t)=0,
$$

すなわち

$$
u=v.
$$
<!-- solution-end -->

<a id="ex-ns4-b02"></a>
#### NS4-B02 外力付き大域 $H^1$ 評価
- Level: B

$f\in L^2(0,T;H_2)$ とする。

渦度方程式の外力項を周期部分積分で処理し、

$$
\|\nabla u(t)\|_2^2
+
\nu
\int_0^t
\|Au(s)\|_2^2\,ds
\le
\|\nabla u_0\|_2^2
+
\frac1\nu
\int_0^t
\|f(s)\|_2^2\,ds
$$

を導け。

<!-- solution-start -->
#### 詳細解答

渦度外力は

$$
g=\partial_1f_2-\partial_2f_1.
$$

従って

$$
\begin{aligned}
\langle g,\omega\rangle
&=
\int
(\partial_1f_2-\partial_2f_1)\omega
\\
&=
\int
(f_1\partial_2\omega-f_2\partial_1\omega).
\end{aligned}
$$

よって Cauchy--Schwarz から

$$
|\langle g,\omega\rangle|
\le
\|f\|_2
\|\nabla\omega\|_2.
$$

Young の不等式で

$$
|\langle g,\omega\rangle|
\le
\frac1{2\nu}\|f\|_2^2
+
\frac\nu2
\|\nabla\omega\|_2^2.
$$

渦度エネルギーへ代入すると

$$
\frac{d}{dt}
\|\omega\|_2^2
+
\nu
\|\nabla\omega\|_2^2
\le
\frac1\nu
\|f\|_2^2.
$$

時間積分して

$$
\|\omega(t)\|_2^2
+
\nu
\int_0^t
\|\nabla\omega\|_2^2
\le
\|\omega_0\|_2^2
+
\frac1\nu
\int_0^t
\|f\|_2^2.
$$

最後に

$$
\|\omega\|_2=\|\nabla u\|_2,
\qquad
\|\nabla\omega\|_2=\|Au\|_2
$$

を代入すれば結論です。
<!-- solution-end -->

<a id="ex-ns4-b03"></a>
#### NS4-B03 強解の時間微分
- Level: B

二次元 Galerkin 解が

$$
u_m
\text{ bounded in }
L^\infty(0,T;V_2),
$$

$$
Au_m
\text{ bounded in }
L^2(0,T;H_2)
$$

を満たすとする。

$$
B(u_m,u_m)
\text{ bounded in }
L^2(0,T;H_2)
$$

を示し、

$$
\partial_tu_m
\text{ bounded in }
L^2(0,T;H_2)
$$

を導け。

<!-- solution-start -->
#### 詳細解答

Hölder により

$$
\|B(u_m,u_m)\|_2
\le
\|u_m\|_4
\|\nabla u_m\|_4.
$$

二次元 Ladyzhenskaya 型評価と Poincaré 評価から

$$
\|u_m\|_4
\le
C\|u_m\|_{V_2}.
$$

また $\nabla u_m$ へ同じ評価を適用して

$$
\|\nabla u_m\|_4^2
\le
C
\|\nabla u_m\|_2
\|D^2u_m\|_2.
$$

Fourier 表示から

$$
\|D^2u_m\|_2
\le
C\|Au_m\|_2.
$$

従って

$$
\|B(u_m,u_m)\|_2
\le
C
\|u_m\|_{V_2}^{3/2}
\|Au_m\|_2^{1/2}.
$$

二乗して積分すると

$$
\begin{aligned}
\int_0^T
\|B(u_m,u_m)\|_2^2\,dt
&\le
C
\|u_m\|_{L^\infty V_2}^3
\int_0^T
\|Au_m\|_2\,dt
\\
&\le
C
T^{1/2}
\|u_m\|_{L^\infty V_2}^3
\|Au_m\|_{L^2H_2}.
\end{aligned}
$$

右辺は一様有界です。

方程式

$$
\partial_tu_m
=
-\nu Au_m
-
B(u_m,u_m)
+
P_mf
$$

の右辺三項が全て $L^2(0,T;H_2)$ で一様有界なので、

$$
\partial_tu_m
$$

も同じ空間で一様有界です。
<!-- solution-end -->

<a id="ex-ns4-b04"></a>
#### NS4-B04 二次元と三次元の渦度エネルギーを比較する
- Level: B

三次元渦度方程式

$$
\partial_t\boldsymbol\omega
+
(u\cdot\nabla)\boldsymbol\omega
=
(\boldsymbol\omega\cdot\nabla)u
+
\nu\Delta\boldsymbol\omega
$$

を仮定する。

$\boldsymbol\omega$ と内積を取り、二次元との違いが

$$
\int
((\boldsymbol\omega\cdot\nabla)u)
\cdot
\boldsymbol\omega
$$

だけであることを示せ。

また、この項が一般には符号を持たない理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

$\boldsymbol\omega$ と $L^2$ 内積を取ります。

時間項は

$$
\frac12
\frac{d}{dt}
\|\boldsymbol\omega\|_2^2.
$$

対流項は

$$
\int
(u\cdot\nabla)\boldsymbol\omega
\cdot
\boldsymbol\omega
=
\frac12
\int
u\cdot\nabla
|\boldsymbol\omega|^2
=
0
$$

です。最後は $\nabla\cdot u=0$ と周期部分積分を使いました。

粘性項は

$$
\nu
\int
\Delta\boldsymbol\omega
\cdot
\boldsymbol\omega
=
-\nu
\|\nabla\boldsymbol\omega\|_2^2.
$$

従って

$$
\frac12
\frac{d}{dt}
\|\boldsymbol\omega\|_2^2
+
\nu
\|\nabla\boldsymbol\omega\|_2^2
=
\int
((\boldsymbol\omega\cdot\nabla)u)
\cdot
\boldsymbol\omega.
$$

右辺の被積分関数は、$\nabla u$ が渦度方向を伸ばす点では正、縮める点では負になり得ます。

発散零条件だけから全積分の符号を固定する恒等式はありません。

二次元埋め込みでは

$$
(\boldsymbol\omega\cdot\nabla)u=0
$$

なので、この右辺自体が消えます。
<!-- solution-end -->

### Level C

<a id="ex-ns4-c01"></a>
#### NS4-C01 二次元大域制御の論理を再構成する
- Level: C

二次元周期 Navier--Stokes について、次を一つの論証として再構成せよ。

1. 渦度方程式を導く。
2. 渦度 $L^2$ エネルギーから大域 $H^1$ 評価を得る。
3. 二次元 Ladyzhenskaya 型評価から Leray--Hopf 弱解の一意性を示す。
4. Galerkin 近似を $L^\infty_tV_2\cap L^2_tD(A)$ で一様評価し、大域強解へ持ち上げる。
5. 二次元で渦伸長が消える式を示し、三次元で同じ証明が閉じない理由を説明する。

<!-- solution-start -->
#### 詳細解答

**Step 1：渦度方程式。**

$$
\omega
=
\partial_1u_2-\partial_2u_1
$$

とします。

第2速度方程式へ $\partial_1$、第1速度方程式へ $\partial_2$ を掛けて引きます。

圧力は混合微分の交換で消え、対流項は

$$
u\cdot\nabla\omega
+
(\nabla\cdot u)\omega
$$

になります。

発散零条件から後半が消え、

$$
\partial_t\omega
+
u\cdot\nabla\omega
=
\nu\Delta\omega
+
\partial_1f_2-\partial_2f_1.
$$

**Step 2：渦度エネルギー。**

$\omega$ を掛けて積分します。

対流項は

$$
\int
(u\cdot\nabla\omega)\omega
=
-\frac12
\int
(\nabla\cdot u)\omega^2
=
0.
$$

外力は周期部分積分で

$$
|\langle\operatorname{curl}f,\omega\rangle|
\le
\|f\|_2
\|\nabla\omega\|_2.
$$

Young の不等式から

$$
\frac{d}{dt}
\|\omega\|_2^2
+
\nu
\|\nabla\omega\|_2^2
\le
\frac1\nu
\|f\|_2^2.
$$

Fourier 表示で

$$
\|\omega\|_2=\|\nabla u\|_2,
\qquad
\|\nabla\omega\|_2=\|Au\|_2
$$

なので

$$
u
\text{ is bounded in }
L^\infty(0,T;V_2)
\cap
L^2(0,T;D(A)).
$$

**Step 3：弱解一意性。**

二つの弱解の差を $w=u-v$ とします。

差のエネルギーは

$$
\frac12
\frac{d}{dt}
\|w\|_2^2
+
\nu
\|\nabla w\|_2^2
=
-b(w,u,w).
$$

二次元 Ladyzhenskaya 型評価

$$
\|w\|_4^2
\le
C
\|w\|_2
\|\nabla w\|_2
$$

を使うと

$$
|b(w,u,w)|
\le
C
\|w\|_2
\|\nabla w\|_2
\|\nabla u\|_2.
$$

Young の不等式で

$$
\frac{d}{dt}
\|w\|_2^2
\le
C_\nu
\|\nabla u\|_2^2
\|w\|_2^2.
$$

係数は Leray--Hopf 条件から時間積分可能です。

積分因子を掛け、$w(0)=0$ を使えば

$$
w=0.
$$

従って弱解は一意です。

**Step 4：大域強解。**

NS3 の Galerkin 解へ Step 2 の一様評価を適用すると

$$
u_m
\text{ bounded in }
L^\infty_tV_2\cap L^2_tD(A).
$$

さらに

$$
\|B(u_m,u_m)\|_2
\le
C
\|u_m\|_{V_2}^{3/2}
\|Au_m\|_2^{1/2}
$$

から $B(u_m,u_m)$ は $L^2_tH_2$ で一様有界です。

よって方程式から

$$
\partial_tu_m
\text{ bounded in }
L^2_tH_2.
$$

NS3 の Fourier 低周波・高周波コンパクト性を一段強い三つ組

$$
D(A)\Subset V_2\hookrightarrow H_2
$$

へ適用し、

$$
u_m\to u
\quad\text{strongly in }L^2_tV_2
$$

を得ます。

極限は

$$
u\in
L^\infty_tV_2
\cap
L^2_tD(A),
\qquad
\partial_tu\in L^2_tH_2
$$

を満たす大域強解です。

一意性は Step 3 から従います。

**Step 5：二次元と三次元の差。**

二次元場を三次元へ埋めると

$$
\boldsymbol\omega=(0,0,\omega),
\qquad
\partial_3u=0.
$$

したがって

$$
(\boldsymbol\omega\cdot\nabla)u
=
\omega\partial_3u
=
0.
$$

三次元では一般にこの項が残り、

$$
\frac12
\frac{d}{dt}
\|\boldsymbol\omega\|_2^2
+
\nu
\|\nabla\boldsymbol\omega\|_2^2
=
\int
((\boldsymbol\omega\cdot\nabla)u)
\cdot
\boldsymbol\omega.
$$

右辺は符号を持たず、基本 $L^2$ エネルギーだけでは吸収できません。

従って二次元の論理の核心は

$$
\boxed{
\text{渦伸長なし}
\Rightarrow
\text{渦度エネルギーが閉じる}
\Rightarrow
H^1\text{ が大域制御される}
}
$$

という点です。
<!-- solution-end -->
