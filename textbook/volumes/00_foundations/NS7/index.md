# NS7 正則性判定・渦伸長・何が特異点を防ぐのか

NS6 では、三次元 Navier--Stokes 方程式の尺度変換から

$$
\frac{2}{q}+\frac{3}{p}=1
$$

という時空間臨界線を導きました。しかし、尺度が合っていることと「そのノルムが有限なら解が壊れない」ことは別です。

NS5 では最大強解が有限時刻で止まるなら

$$
\sup_{t<T_{\max}}\|\nabla u(t)\|_2=\infty
$$

となることを示しました。そこで本章では、より観測しやすい速度の時空間ノルムから、この $H^1$ 発散を防ぐ方法を作ります。

もう一つの主役は渦度です。二次元では渦度 $L^2$ エネルギーが閉じましたが、三次元では

$$
(\omega\cdot\nabla)u
$$

という渦伸長項が残ります。本章では、この項がどこから出て、どの評価があれば抑えられるのかを式で追います。

本章の流れは

$$
\boxed{
\text{臨界指数}
\longrightarrow
\text{Prodi--Serrin 型評価}
\longrightarrow
H^1\text{ 延長}
\longrightarrow
\text{三次元渦度方程式}
\longrightarrow
\text{渦伸長}
\longrightarrow
\text{正則性問題の読み替え}
}
$$

です。

---

## 1. 本章で証明する Prodi--Serrin 型条件

主証明の舞台は NS5 と同じ三次元トーラス $\mathbb T^3$ とします。周期領域なら、NS5 で構成した最大強解・Stokes 作用素・延長判定をそのまま使えるからです。

NS6 の全空間 $\mathbb R^3$ の scaling で現れた指数関係は、周期領域でも非線形項評価の指数として同じ形で現れます。

端点 $p=3$ は後で分離します。まず

$$
3<p\le\infty
$$

を考えます。

<a id="def-ns7-prodi-serrin-pair"></a>

<!-- formal-statement-start -->
> **定義（本章の Prodi--Serrin 指数対）**  
> $3<p\le\infty$、$2\le q\le\infty$ が
>
$$
\frac{2}{q}+\frac{3}{p}\le1
$$
>
> を満たすとき、本章では $(p,q)$ を Prodi--Serrin 指数対と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ns7-prodi-serrin-pair -->
**定義の確認**

臨界線上の時間指数を、$3<p<\infty$ では

$
q_c(p)
=
\frac{2p}{p-3}
$

と置き、$p=\infty$ では

$
q_c(\infty):=2
$

と置きます。

たとえば

$$
(p,q)=(6,4),\qquad (\infty,2)
$$

はいずれも

$$
\frac2q+\frac3p=1
$$

を満たします。

一方

$$
(p,q)=(4,6)
$$

では

$$
\frac26+\frac34
=
\frac{13}{12}
>
1
$$

なので、本章の条件には入りません。

また $(3,\infty)$ は尺度臨界ですが、定義では $p>3$ を要求しているため含めません。これは単なる書き忘れではなく、第5節で見るように主証明の Young の不等式が端点で退化するためです。
<!-- definition-example-end -->

---

## 2. 非線形項を $L^p$-$L^r$-$L^2$ に分解する

三次元周期 Navier--Stokes の最大強解 $u$ を考えます。NS5 と同じく $Au=-\Delta u$ とみなせる発散零・平均零場です。

$H^1$ エネルギー式は

$$
\frac12\frac{d}{dt}\|\nabla u\|_2^2
+
\nu\|Au\|_2^2
=
-b(u,u,Au)
+
(f,Au)
$$

でした。

今回は NS5 の

$$
\|u\|_6\|\nabla u\|_3\|Au\|_2
$$

という固定指数ではなく、任意の $p>3$ に合わせて Hölder の指数を選びます。

$$
\frac1p+\frac1r+\frac12=1
$$

となる $r$ は

$$
\frac1r
=
\frac12-\frac1p
$$

すなわち

$$
r=\frac{2p}{p-2}
$$

です。

したがって Hölder の不等式から

$$
|b(u,u,Au)|
\le
\|u\|_p
\|\nabla u\|_r
\|Au\|_2.
$$

ここでまず $3<p<\infty$ とすると

$
2<r<6
$

です。よって $\|\nabla u\|_r$ を $L^2$ と $L^6$ の間で補間できます。$p=\infty$ の場合は $r=2$ となるため、補間を使わず第3節の末尾で直接評価します。

---

## 3. 補間指数を手で決める

$\theta$ を

$$
\frac1r
=
\frac{1-\theta}{2}
+
\frac{\theta}{6}
$$

で決めます。

左辺へ

$$
\frac1r=\frac12-\frac1p
$$

を代入すると

$$
\frac12-\frac1p
=
\frac12-\frac{\theta}{3}.
$$

従って

$$
\theta=\frac3p.
$$

この補間を公式名だけで使わず、Hölder の不等式から確認します。$g=\nabla u$ とし、

$$
|g|^r
=
|g|^{r(1-\theta)}
|g|^{r\theta}
$$

と分けます。

指数

$$
a=\frac{2}{r(1-\theta)},
\qquad
b=\frac{6}{r\theta}
$$

を取ると

$$
\frac1a+\frac1b
=
\frac{r(1-\theta)}2
+
\frac{r\theta}{6}
=
1.
$$

従って Hölder の不等式より

$$
\begin{aligned}
\|g\|_r^r
&=
\int
|g|^{r(1-\theta)}
|g|^{r\theta}
\\
&\le
\left(
\int |g|^2
\right)^{r(1-\theta)/2}
\left(
\int |g|^6
\right)^{r\theta/6}.
\end{aligned}
$$

$r$ 乗根を取れば

$$
\|\nabla u\|_r
\le
\|\nabla u\|_2^{1-\theta}
\|\nabla u\|_6^\theta.
$$

NS5 で確認した周期 Sobolev 評価と Fourier 表示から

$$
\|\nabla u\|_6
\le
C\|Au\|_2
$$

なので

$$
\boxed{
\|\nabla u\|_r
\le
C
\|\nabla u\|_2^{1-3/p}
\|Au\|_2^{3/p}.
}
$$

これを非線形項へ代入すると

$$
\begin{aligned}
|b(u,u,Au)|
&\le
\|u\|_p
\|\nabla u\|_r
\|Au\|_2
\\
&\le
C
\|u\|_p
\|\nabla u\|_2^{1-3/p}
\|Au\|_2^{1+3/p}.
\end{aligned}
$$

$p=\infty$ では Hölder の不等式から直接

$
|b(u,u,Au)|
\le
\|u\|_\infty
\|\nabla u\|_2
\|Au\|_2.
$

これは $3/p=0$ と読んだ一般形

$
C_p
\|u\|_p
\|\nabla u\|_2^{1-3/p}
\|Au\|_2^{1+3/p}
$

と一致します。

<a id="prop-ns7-prodi-serrin-nonlinear"></a>

<!-- formal-statement-start -->
> **命題（Prodi--Serrin 型非線形項評価）**  
> $3<p\le\infty$ とし、
>
$$
r=\frac{2p}{p-2}.
$$
>
> 三次元周期発散零場 $u\in D(A)$ に対して、定数 $C_p>0$ が存在し
>
$$
\boxed{
|b(u,u,Au)|
\le
C_p
\|u\|_p
\|\nabla u\|_2^{1-3/p}
\|Au\|_2^{1+3/p}
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

この式の指数は偶然ではありません。次節で Young の不等式を使うと、NS6 の臨界時間指数

$$
q_c(p)=\frac{2p}{p-3}
$$

がそのまま現れます。

---

## 4. Young の不等式から臨界時間指数を取り出す

記号を短くするため

$$
\theta=\frac3p
$$

と置きます。$p>3$ なので

$$
0\le\theta<1.
$$

非線形項は

$$
C
\|u\|_p
\|\nabla u\|_2^{1-\theta}
\|Au\|_2^{1+\theta}
$$

です。

Young の不等式で $\|Au\|_2^2$ を作るため、共役指数を

$$
m=\frac{2}{1+\theta},
\qquad
m'=\frac{2}{1-\theta}
$$

と選びます。

実際、

$$
\frac1m+\frac1{m'}
=
\frac{1+\theta}{2}
+
\frac{1-\theta}{2}
=
1
$$

であり、

$$
\left(
\|Au\|_2^{1+\theta}
\right)^m
=
\|Au\|_2^2.
$$

もう一方は

$$
\left(
\|u\|_p
\|\nabla u\|_2^{1-\theta}
\right)^{m'}
=
\|u\|_p^{2/(1-\theta)}
\|\nabla u\|_2^2.
$$

しかも $3<p<\infty$ なら

$
\frac{2}{1-\theta}
=
\frac{2}{1-3/p}
=
\frac{2p}{p-3}
=
q_c(p).
$

$p=\infty$ では $\theta=0$ なので、同じ Young の不等式を共役指数 $2,2$ で使い、

$
\|u\|_\infty
\|\nabla u\|_2
\|Au\|_2
\le
\frac{\nu}{4}\|Au\|_2^2
+
C_\nu
\|u\|_\infty^2
\|\nabla u\|_2^2.
$

ここでも時間指数は $q_c(\infty)=2$ です。

従って、任意の $\nu>0$ に対して

$$
|b(u,u,Au)|
\le
\frac{\nu}{4}\|Au\|_2^2
+
C_{\nu,p}
\|u\|_p^{q_c(p)}
\|\nabla u\|_2^2.
$$

外力項も

$$
|(f,Au)|
\le
\frac{\nu}{4}\|Au\|_2^2
+
\frac1\nu\|f\|_2^2
$$

と評価できます。

したがって

$$
y(t)=\|\nabla u(t)\|_2^2
$$

と置けば

$$
\boxed{
y'(t)
\le
C_{\nu,p}
\|u(t)\|_p^{q_c(p)}
y(t)
+
\frac{2}{\nu}\|f(t)\|_2^2.
}
$$

NS5 の

$$
y'\le Cy^3+g
$$

と比べると決定的な違いがあります。右辺の非線形部分が $y^3$ ではなく

$$
a(t)y(t)
$$

という線形型になりました。係数

$$
a(t)=C_{\nu,p}\|u(t)\|_p^{q_c(p)}
$$

が時間積分可能なら、Grönwall の不等式で $y$ を制御できます。

---

## 5. Prodi--Serrin 型延長判定

$(p,q)$ が本章の Prodi--Serrin 指数対なら

$$
\frac2q+\frac3p\le1.
$$

これは

$$
q\ge q_c(p)
$$

と同値です。

有限時間区間 $[0,T]$ では、$q\ge q_c$ なら Hölder の不等式により

$$
L^q(0,T)
\subset
L^{q_c}(0,T)
$$

です。実際

$$
\begin{aligned}
\int_0^T
\|u(t)\|_p^{q_c}\,dt
&\le
\left(
\int_0^T
\|u(t)\|_p^q\,dt
\right)^{q_c/q}
T^{1-q_c/q}.
\end{aligned}
$$

右辺は有限です。

<a id="thm-ns7-prodi-serrin-continuation"></a>

<!-- formal-statement-start -->
> **定理（三次元周期 Navier--Stokes の Prodi--Serrin 型延長判定）**  
> $\nu>0$、
>
$$
u_0\in V,
\qquad
f\in L^2_{\mathrm{loc}}([0,\infty);H)
$$
>
> とし、$u$ を NS5 の最大強解、$T_{\max}$ をその最大存在時間とする。  
> $3<p\le\infty$ と $q$ が
>
$$
\frac2q+\frac3p\le1
$$
>
> を満たすとする。もし $T<T_{\max}$ に対して
>
$$
u\in L^q(0,T;L^p(\mathbb T^3))
$$
>
> なら
>
$$
\sup_{0\le t\le T}\|\nabla u(t)\|_2<\infty.
$$
>
> 特に $T_{\max}<\infty$ なら
>
$$
\boxed{
\|u\|_{L^q(0,T_{\max};L^p)}=\infty
}
$$
>
> でなければならない。
<!-- formal-statement-end -->

### 証明の見取り図

第4節で $H^1$ エネルギーを

$$
y'(t)\le a(t)y(t)+g(t)
$$

へ変形しました。Prodi--Serrin 条件は $a\in L^1(0,T)$ を保証します。そこで積分因子または Grönwall の不等式を使えば $y$ が有限に保たれ、NS5 の延長判定へ接続できます。

<!-- proof-start -->
### 証明

第4節の評価から

$$
y'(t)
\le
a(t)y(t)+g(t),
$$

ただし

$$
a(t)
=
C_{\nu,p}
\|u(t)\|_p^{q_c},
\qquad
q_c=q_c(p),
$$

$$
g(t)
=
\frac2\nu\|f(t)\|_2^2
$$

です。

仮定

$$
\frac2q+\frac3p\le1
$$

から $q\ge q_c$ です。従って前節の時間 Hölder 評価より

$$
\int_0^T a(t)\,dt<\infty.
$$

また

$$
f\in L^2(0,T;H)
$$

なので

$$
\int_0^T g(t)\,dt<\infty.
$$

Grönwall の不等式を適用すると

$$
y(t)
\le
\exp\left(
\int_0^t a(s)\,ds
\right)
\left[
y(0)
+
\int_0^t g(s)\,ds
\right].
$$

右辺は $0\le t\le T$ で一様に有限です。従って

$$
\sup_{0\le t\le T}\|\nabla u(t)\|_2<\infty.
$$

次に $T_{\max}<\infty$ と仮定します。もし

$$
u\in L^q(0,T_{\max};L^p)
$$

なら、同じ評価を $T<T_{\max}$ に適用した上界は $T\uparrow T_{\max}$ でも有限のままです。従って

$$
\sup_{t<T_{\max}}\|\nabla u(t)\|_2<\infty.
$$

これは NS5 の[延長判定](../NS5/index.md#thm-ns5-blowup-alternative)に反します。

よって有限最大時刻では

$$
\|u\|_{L^q(0,T_{\max};L^p)}=\infty
$$

が必要です。
<!-- proof-end -->

これで NS6 の臨界線が、単なる次元解析ではなく実際の正則性判定へ変わりました。

---

## 6. なぜ端点 $(p,q)=(3,\infty)$ を同じ証明へ押し込めないのか

$p=3$ では

$$
\theta=\frac3p=1.
$$

第3節の評価は形式的に

$$
|b(u,u,Au)|
\le
C
\|u\|_3
\|Au\|_2^2
$$

となります。

ここでは Young の不等式で

$$
\frac{\nu}{4}\|Au\|_2^2
+
C\|u\|_3^{q_c}\|\nabla u\|_2^2
$$

へ分ける操作ができません。実際

$$
q_c(p)=\frac{2p}{p-3}
$$

は $p\downarrow3$ で $\infty$ へ発散し、第4節の共役指数 $m'=2/(1-\theta)$ も $\infty$ になります。

残る式は

$$
\frac12y'
+
\left(
\nu-C\|u\|_3
\right)
\|Au\|_2^2
\le
(f,Au)
$$

という形です。

従って、この単純な $H^1$ エネルギー法だけで吸収できるのは、たとえば

$$
C\|u\|_3<\nu
$$

という小ささがある場合です。

一方、全空間 $\mathbb R^3$ の端点

$$
u\in L^\infty_tL^3_x
$$

から正則性を得る深い端点理論が知られています。しかしその証明には本章のエネルギー法を大きく越える道具が必要です。本章では黒箱として使わず、

> **臨界端点は scaling だけ見れば自然だが、代表的なエネルギー証明はそこでちょうど退化する**

という事実までを学習対象にします。

---

## 7. 三次元渦度を定義する

ここからは渦伸長を見ます。十分滑らかな三次元速度場

$$
u=(u_1,u_2,u_3)
$$

を考えます。

<a id="def-ns7-vorticity"></a>

<!-- formal-statement-start -->
> **定義（三次元渦度）**  
> 十分滑らかな三次元速度場 $u$ に対して
>
$$
\boxed{
\omega
=
\nabla\times u
}
$$
>
> すなわち
>
$$
\omega
=
\left(
\partial_2u_3-\partial_3u_2,\,
\partial_3u_1-\partial_1u_3,\,
\partial_1u_2-\partial_2u_1
\right)
$$
>
> を渦度という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ns7-vorticity -->
**定義の確認**

周期せん断流

$$
u(x_1,x_2,x_3)
=
(\sin x_2,0,0)
$$

では

$$
\nabla\cdot u=0
$$

であり、

$$
\omega
=
(0,0,-\cos x_2).
$$

速度は $x_1$ 方向だけを向いていても、横方向 $x_2$ に速度差があるため渦度は0ではありません。
<!-- definition-example-end -->

渦度は常に

$$
\nabla\cdot\omega
=
\nabla\cdot(\nabla\times u)
=
0
$$

を満たします。

---

## 8. 対流項の curl を途中式から導く

三次元 Navier--Stokes 方程式

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
\qquad
\nabla\cdot u=0
$$

へ curl を作用させます。

圧力は

$$
\nabla\times\nabla p=0
$$

なので消えます。時間微分と Laplace 作用素は curl と交換できるため

$$
\partial_t\omega
+
\nabla\times((u\cdot\nabla)u)
=
\nu\Delta\omega
+
\nabla\times f.
$$

残るのは

$$
\nabla\times((u\cdot\nabla)u)
$$

です。

まず、成分計算から

$$
(u\cdot\nabla)u
=
\nabla\left(\frac{|u|^2}{2}\right)
-
u\times\omega
$$

を確認します。

交代記号 $\varepsilon_{ijk}$ を使うと

$$
[u\times\omega]_i
=
\varepsilon_{ijk}u_j\omega_k.
$$

さらに

$$
\omega_k
=
\varepsilon_{k\ell m}\partial_\ell u_m
$$

なので

$$
\begin{aligned}
[u\times\omega]_i
&=
\varepsilon_{ijk}
\varepsilon_{k\ell m}
u_j\partial_\ell u_m
\\
&=
(\delta_{i\ell}\delta_{jm}
-
\delta_{im}\delta_{j\ell})
u_j\partial_\ell u_m
\\
&=
u_m\partial_i u_m
-
u_j\partial_j u_i
\\
&=
\partial_i\left(\frac{|u|^2}{2}\right)
-
[(u\cdot\nabla)u]_i.
\end{aligned}
$$

従って上のベクトル恒等式が得られます。

次に

$$
\nabla\times(u\times\omega)
$$

を同じく成分で計算します。

$$
\begin{aligned}
[\nabla\times(u\times\omega)]_i
&=
\varepsilon_{ijk}
\partial_j
\left(
\varepsilon_{k\ell m}u_\ell\omega_m
\right)
\\
&=
(\delta_{i\ell}\delta_{jm}
-
\delta_{im}\delta_{j\ell})
\partial_j(u_\ell\omega_m)
\\
&=
\partial_m(u_i\omega_m)
-
\partial_\ell(u_\ell\omega_i)
\\
&=
(\omega\cdot\nabla)u_i
+
u_i\nabla\cdot\omega
-
\omega_i\nabla\cdot u
-
(u\cdot\nabla)\omega_i.
\end{aligned}
$$

ここで

$$
\nabla\cdot u=0,
\qquad
\nabla\cdot\omega=0
$$

なので

$$
\nabla\times(u\times\omega)
=
(\omega\cdot\nabla)u
-
(u\cdot\nabla)\omega.
$$

また勾配の curl は0なので

$$
\begin{aligned}
\nabla\times((u\cdot\nabla)u)
&=
-\nabla\times(u\times\omega)
\\
&=
(u\cdot\nabla)\omega
-
(\omega\cdot\nabla)u.
\end{aligned}
$$

<a id="prop-ns7-vorticity-equation"></a>

<!-- formal-statement-start -->
> **命題（三次元 Navier--Stokes の渦度方程式）**  
> 十分滑らかな非圧縮 Navier--Stokes 解 $u$ と渦度 $\omega=\nabla\times u$ に対して
>
$$
\boxed{
\partial_t\omega
+
(u\cdot\nabla)\omega
=
(\omega\cdot\nabla)u
+
\nu\Delta\omega
+
\nabla\times f
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

二次元と違うのは右辺の

$$
(\omega\cdot\nabla)u
$$

です。これが渦伸長項です。

---

## 9. 二次元ではなぜ渦伸長が消えるのか

二次元速度場を三次元へ

$$
u(x_1,x_2,x_3)
=
(u_1(x_1,x_2),u_2(x_1,x_2),0)
$$

と埋め込みます。

渦度は

$$
\omega
=
(0,0,\omega_3)
$$

であり、速度は $x_3$ に依存しないので

$$
\partial_3u=0.
$$

従って

$$
(\omega\cdot\nabla)u
=
\omega_3\partial_3u
=
0.
$$

これが NS4 の渦度 $L^2$ エネルギーが閉じた理由です。

三次元では $\omega$ が空間内の任意方向を向けるため、その方向に速度勾配があれば

$$
(\omega\cdot\nabla)u
$$

は一般に消えません。

---

## 10. 渦伸長が渦度エネルギーへ入る場所

まず外力なし

$$
f=0
$$

とします。渦度方程式と $\omega$ の $L^2$ 内積を取ると

$$
\frac12\frac{d}{dt}\|\omega\|_2^2
+
\int
(u\cdot\nabla)\omega\cdot\omega\,dx
=
\int
(\omega\cdot\nabla)u\cdot\omega\,dx
-
\nu\|\nabla\omega\|_2^2.
$$

輸送項は

$$
\begin{aligned}
\int
(u\cdot\nabla)\omega\cdot\omega\,dx
&=
\frac12
\int
u\cdot\nabla|\omega|^2\,dx
\\
&=
-\frac12
\int
(\nabla\cdot u)|\omega|^2\,dx
\\
&=
0
\end{aligned}
$$

です。

したがって

$$
\boxed{
\frac12\frac{d}{dt}\|\omega\|_2^2
+
\nu\|\nabla\omega\|_2^2
=
\int
(\omega\cdot\nabla)u\cdot\omega\,dx.
}
$$

<a id="prop-ns7-vortex-stretching-energy"></a>

<!-- formal-statement-start -->
> **命題（三次元渦度エネルギーと渦伸長）**  
> 外力なしの十分滑らかな三次元周期 Navier--Stokes 解に対して
>
$$
\frac12\frac{d}{dt}\|\omega\|_2^2
+
\nu\|\nabla\omega\|_2^2
=
\int_{\mathbb T^3}
(\omega\cdot\nabla)u\cdot\omega\,dx
$$
>
> が成り立つ。特に
>
$$
\left|
\int
(\omega\cdot\nabla)u\cdot\omega\,dx
\right|
\le
\|\nabla u\|_\infty
\|\omega\|_2^2.
$$
<!-- formal-statement-end -->

二次元では右辺が0でした。三次元では

$$
\|\nabla u\|_\infty\|\omega\|_2^2
$$

が残ります。

ここが「粘性が渦度を散逸させる一方、渦伸長が渦度を増幅しうる」という競争を数式にした場所です。

---

## 11. 渦伸長は速度勾配の対称部分だけを見る

速度勾配を

$$
\nabla u
=
S+R,
$$

$$
S
=
\frac12
\left(
\nabla u+(\nabla u)^{\mathsf T}
\right),
\qquad
R
=
\frac12
\left(
\nabla u-(\nabla u)^{\mathsf T}
\right)
$$

と対称部分と反対称部分へ分けます。

反対称行列 $R$ について任意のベクトル $z$ は

$$
z^{\mathsf T}Rz=0
$$

を満たします。実際

$$
z^{\mathsf T}Rz
=
(z^{\mathsf T}Rz)^{\mathsf T}
=
z^{\mathsf T}R^{\mathsf T}z
=
-z^{\mathsf T}Rz
$$

なので0です。

従って

$$
(\omega\cdot\nabla)u\cdot\omega
=
\omega^{\mathsf T}(\nabla u)\omega
=
\omega^{\mathsf T}S\omega.
$$

つまり渦度の大きさを直接増減させるのは、局所的な剛体回転を表す反対称部分ではなく、伸び縮みを表す対称部分です。

**局所的な具体例**

全空間上の局所モデルとして

$$
u(x)
=
(ax_1-\Omega x_2,\,
\Omega x_1+bx_2,\,
cx_3),
$$

$$
a+b+c=0
$$

を考えます。これは

$$
\nabla\cdot u=a+b+c=0
$$

です。

渦度は

$$
\omega=(0,0,2\Omega)
$$

であり、

$$
(\omega\cdot\nabla)u
=
2\Omega\,\partial_3u
=
(0,0,2\Omega c).
$$

従って

$$
(\omega\cdot\nabla)u\cdot\omega
=
4\Omega^2c.
$$

$c>0$ なら渦度方向の伸長が正、$c<0$ なら圧縮が負として現れます。

この affine 場は有限エネルギー周期解の例ではありません。渦伸長項の点ごとの幾何を切り出す局所モデルです。

---

## 12. 速度勾配の時間積分が有限なら延長できる

第10節の評価から

$$
\frac{d}{dt}\|\omega\|_2^2
\le
2\|\nabla u\|_\infty
\|\omega\|_2^2.
$$

従って Grönwall の不等式より

$$
\|\omega(t)\|_2^2
\le
\|\omega(0)\|_2^2
\exp\left(
2\int_0^t
\|\nabla u(s)\|_\infty\,ds
\right).
$$

周期発散零場では Fourier 表示から

$$
\|\nabla u\|_2^2
=
\|\nabla\times u\|_2^2
+
\|\nabla\cdot u\|_2^2
=
\|\omega\|_2^2.
$$

従って $\omega$ の $L^2$ 上界は $H^1$ 上界です。

<a id="thm-ns7-gradient-continuation"></a>

<!-- formal-statement-start -->
> **定理（速度勾配による尺度臨界延長判定）**  
> 外力なし三次元周期 Navier--Stokes の最大強解 $u$ の最大存在時間を $T_{\max}$ とする。もし
>
$$
\int_0^{T_{\max}}
\|\nabla u(t)\|_\infty\,dt
<
\infty
$$
>
> なら $T_{\max}$ は有限ではありえない。従って
>
$$
\boxed{
T_{\max}<\infty
\Longrightarrow
\int_0^{T_{\max}}
\|\nabla u(t)\|_\infty\,dt
=
\infty.
}
$$
<!-- formal-statement-end -->

### 証明の見取り図

渦度エネルギーに Grönwall の不等式を使い、$\|\omega\|_2=\|\nabla u\|_2$ から NS5 の $H^1$ 延長判定へ戻します。

<!-- proof-start -->
### 証明

仮定から

$$
\int_0^{T_{\max}}
\|\nabla u(t)\|_\infty\,dt
<
\infty.
$$

第10節の渦度エネルギー評価へ Grönwall の不等式を適用すると

$$
\sup_{t<T_{\max}}\|\omega(t)\|_2<\infty.
$$

発散零条件より

$$
\|\nabla u(t)\|_2=\|\omega(t)\|_2
$$

なので

$$
\sup_{t<T_{\max}}\|\nabla u(t)\|_2<\infty.
$$

NS5 の延長判定により、この状態で有限最大存在時間を持つことはできません。
<!-- proof-end -->

この条件は scaling に対しても臨界です。実際

$$
\nabla u_\lambda(x,t)
=
\lambda^2
(\nabla u)(\lambda x,\lambda^2t)
$$

なので

$$
\|\nabla u_\lambda(t)\|_\infty
=
\lambda^2
\|\nabla u(\lambda^2t)\|_\infty.
$$

時間変数 $s=\lambda^2t$ を使うと

$$
\int
\|\nabla u_\lambda(t)\|_\infty\,dt
=
\int
\|\nabla u(s)\|_\infty\,ds.
$$

---

## 13. Leray--Hopf 弱解と Prodi--Serrin 条件

NS3 では Leray--Hopf 弱解が大域的に存在することを示し、NS5 では強解が存在する間は弱解と一致する弱--強一意性を証明しました。

これらを第5節の延長判定と組み合わせます。

<a id="cor-ns7-prodi-serrin-weak-strong"></a>

<!-- formal-statement-start -->
> **系（Prodi--Serrin 条件下の弱--強一致）**  
> $u_0\in V$、$f\in L^2(0,T;H)$ とし、$v$ を同じ初期値・外力を持つ Leray--Hopf 弱解とする。  
> ある $3<p\le\infty$、$q$ について
>
$$
\frac2q+\frac3p\le1
$$
>
> かつ
>
$$
v\in L^q(0,T;L^p(\mathbb T^3))
$$
>
> が成り立つとする。このとき NS5 の局所強解は時刻 $T$ まで延長し、$v$ と一致する。特に $v$ は $[0,T]$ 上で強解として一意である。
<!-- formal-statement-end -->

### 証明の見取り図

同じ初期値から最大強解 $u$ を作ります。弱--強一意性により、強解が存在する間は $u=v$ です。したがって $v$ の Prodi--Serrin ノルム有限性は $u$ にも引き継がれ、第5節の延長判定で強解を $T$ まで伸ばせます。

<!-- proof-start -->
### 証明

NS5 の局所強解を $u$、最大存在時間を $T_{\max}$ とします。

NS5 の[弱--強一意性](../NS5/index.md#thm-ns5-weak-strong-uniqueness)から

$$
u(t)=v(t)
$$

が

$$
0\le t<\min\{T,T_{\max}\}
$$

で成り立ちます。

反対に

$$
T_{\max}\le T
$$

と仮定します。すると $u=v$ なので

$$
\|u\|_{L^q(0,T_{\max};L^p)}
\le
\|v\|_{L^q(0,T;L^p)}
<
\infty.
$$

これは第5節の Prodi--Serrin 型延長判定に反します。

従って

$$
T_{\max}>T.
$$

よって $u$ は $[0,T]$ 上の強解です。再び弱--強一意性により

$$
u=v
$$

が $[0,T]$ 全体で成り立ちます。

さらに任意の Leray--Hopf 弱解はこの強解と一致するので、同じデータに対して一意です。
<!-- proof-end -->

この系は

> 「大域弱解が存在する」

と

> 「その弱解が正則で一意である」

の間を埋める典型的な橋です。

---

## 14. 正則性問題を「何が発散しなければならないか」に読み替える

本章までで、有限時間特異点がもし存在するなら、少なくとも次の量は有限のままではいられないことが分かりました。

最大存在時間 $T_{\max}<\infty$ なら、

$$
\sup_{t<T_{\max}}\|\nabla u(t)\|_2=\infty,
$$

任意の本章の Prodi--Serrin 指数対 $(p,q)$ に対して

$$
\|u\|_{L^q(0,T_{\max};L^p)}=\infty,
$$

さらに無外力なら

$$
\int_0^{T_{\max}}
\|\nabla u(t)\|_\infty\,dt
=
\infty.
$$

です。

つまり三次元大域正則性問題は、

> これらの尺度臨界またはそれより強い量が、滑らかな初期データから有限時間で発散することを本当に許すのか

という問いへ読み替えられます。

NS8 では、この解析上の問いを Clay Mathematics Institute の公式問題文へ接続し、「何を証明すればミレニアム問題の statement を満たすのか」を正確に読みます。

---

## 15. 発展補足：似ているが別の三つの結果

本章の結果と混同しやすいものを整理します。

### 15.1 $L^\infty_tL^3_x$ 端点

NS6 の scaling では $(p,q)=(3,\infty)$ が臨界端点です。しかし第6節で見たように、本章の単純な $H^1$ エネルギー法はそこで退化します。

全空間 $\mathbb R^3$ では、この端点を扱う深い正則性理論があります。その証明にはここまで扱っていない局所正則性や後方一意性などの道具が必要なので、本章では結果の位置付けだけを述べます。

### 15.2 Beale--Kato--Majda 型判定

渦度の $L^\infty$ 時間積分を使う判定は、渦伸長と強く関係します。ただし

$$
\|\nabla u\|_\infty
$$

を

$$
\|\omega\|_\infty
$$

だけで単純に一様評価することはできず、特異積分・対数型評価など追加の調和解析が必要です。

従って本章では

$
\int\|\nabla u\|_\infty\,dt
$

による直接判定までを完全証明し、BKM 型理論そのものの導出には立ち入りません。

### 15.3 Caffarelli--Kohn--Nirenberg 部分正則性

部分正則性は「弱解の特異点集合がどれほど小さいか」を調べる理論です。

本章の

$$
\text{あるノルムが有限なら特異点が起きない}
$$

という continuation criterion とは問いの向きが異なります。完全証明には別の局所エネルギー理論が必要なので、ここでは部分正則性の完全証明には進みません。

---

# 演習

## Level A

<a id="ex-ns7-a01"></a>
### A1. 臨界時間指数を計算する

$p=4,6$ について

$
q_c(p)=\frac{2p}{p-3}
$

を計算し、$q_c(\infty)=2$ と合わせて、

$$
\frac2{q_c}+\frac3p=1
$$

を確認せよ。

- Level: A

<!-- solution-start -->
### 詳細解答

$p=4$ では

$$
q_c(4)=\frac8{1}=8.
$$

従って

$$
\frac28+\frac34
=
\frac14+\frac34
=
1.
$$

$p=6$ では

$$
q_c(6)=\frac{12}{3}=4,
$$

なので

$$
\frac24+\frac36
=
\frac12+\frac12
=
1.
$$

$p=\infty$ では一般式へ無限大を代入するのではなく、第1節の定義どおり

$
q_c(\infty)=2
$

です。

従って

$$
\frac22+0=1.
$$

よって代表的な臨界対は

$$
(4,8),\qquad(6,4),\qquad(\infty,2)
$$

です。
<!-- solution-end -->

<a id="ex-ns7-a02"></a>
### A2. 補間指数を導く

$p>3$、

$$
r=\frac{2p}{p-2}
$$

とする。

$$
\frac1r
=
\frac{1-\theta}{2}
+
\frac{\theta}{6}
$$

を満たす $\theta$ が $3/p$ であることを示せ。

- Level: A

<!-- solution-start -->
### 詳細解答

$r$ の定義から

$$
\frac1r
=
\frac{p-2}{2p}
=
\frac12-\frac1p.
$$

一方

$$
\frac{1-\theta}{2}+\frac{\theta}{6}
=
\frac12-\frac{\theta}{2}+\frac{\theta}{6}
=
\frac12-\frac{\theta}{3}.
$$

両者を等しくすると

$$
\frac12-\frac1p
=
\frac12-\frac{\theta}{3}.
$$

従って

$$
\frac1p=\frac{\theta}{3},
$$

すなわち

$$
\boxed{\theta=\frac3p}.
$$
<!-- solution-end -->

<a id="ex-ns7-a03"></a>
### A3. 二次元埋め込みで渦伸長が消えることを確認する

$$
u=(u_1(x_1,x_2),u_2(x_1,x_2),0)
$$

とし、

$$
\omega=\nabla\times u
$$

を計算して

$$
(\omega\cdot\nabla)u=0
$$

を示せ。

- Level: A

<!-- solution-start -->
### 詳細解答

$u_3=0$ かつ $\partial_3u=0$ なので

$$
\omega_1
=
\partial_2u_3-\partial_3u_2
=
0,
$$

$$
\omega_2
=
\partial_3u_1-\partial_1u_3
=
0,
$$

$$
\omega_3
=
\partial_1u_2-\partial_2u_1.
$$

従って

$$
\omega=(0,0,\omega_3).
$$

よって

$$
\begin{aligned}
(\omega\cdot\nabla)u
&=
\omega_1\partial_1u
+
\omega_2\partial_2u
+
\omega_3\partial_3u
\\
&=
0+0+\omega_3\cdot0
\\
&=
0.
\end{aligned}
$$

これが二次元渦度エネルギーで渦伸長項が消える理由です。
<!-- solution-end -->

<a id="ex-ns7-a04"></a>
### A4. affine 場の渦伸長を計算する

$$
u(x)
=
(ax_1-\Omega x_2,\,
\Omega x_1+bx_2,\,
cx_3),
\qquad
a+b+c=0
$$

とする。

1. $\nabla\cdot u=0$ を確認せよ。
2. $\omega=\nabla\times u$ を求めよ。
3. $(\omega\cdot\nabla)u\cdot\omega$ を求めよ。

- Level: A

<!-- solution-start -->
### 詳細解答

発散は

$$
\nabla\cdot u
=
a+b+c
=
0.
$$

curl を計算すると

$$
\omega_1
=
\partial_2(cx_3)-\partial_3(\Omega x_1+bx_2)
=
0,
$$

$$
\omega_2
=
\partial_3(ax_1-\Omega x_2)-\partial_1(cx_3)
=
0,
$$

$$
\omega_3
=
\partial_1(\Omega x_1+bx_2)
-
\partial_2(ax_1-\Omega x_2)
=
\Omega-(-\Omega)
=
2\Omega.
$$

従って

$$
\omega=(0,0,2\Omega).
$$

次に

$$
(\omega\cdot\nabla)u
=
2\Omega\,\partial_3u
=
(0,0,2\Omega c).
$$

よって

$$
(\omega\cdot\nabla)u\cdot\omega
=
(0,0,2\Omega c)\cdot(0,0,2\Omega)
=
\boxed{4\Omega^2c}.
$$

$c>0$ なら正、$c<0$ なら負です。
<!-- solution-end -->

<a id="ex-ns7-a05"></a>
### A5. 速度勾配判定の scaling を確認する

全空間 scaling

$$
u_\lambda(x,t)
=
\lambda u(\lambda x,\lambda^2t)
$$

に対して

$$
\int_0^{T/\lambda^2}
\|\nabla u_\lambda(t)\|_\infty\,dt
=
\int_0^T
\|\nabla u(s)\|_\infty\,ds
$$

を示せ。

- Level: A

<!-- solution-start -->
### 詳細解答

空間微分を一回取ると

$$
\nabla u_\lambda(x,t)
=
\lambda^2
(\nabla u)(\lambda x,\lambda^2t).
$$

従って

$$
\|\nabla u_\lambda(t)\|_\infty
=
\lambda^2
\|\nabla u(\lambda^2t)\|_\infty.
$$

よって

$$
\int_0^{T/\lambda^2}
\|\nabla u_\lambda(t)\|_\infty\,dt
=
\int_0^{T/\lambda^2}
\lambda^2
\|\nabla u(\lambda^2t)\|_\infty\,dt.
$$

ここで

$$
s=\lambda^2t,
\qquad
ds=\lambda^2dt
$$

と変数変換すると

$$
\boxed{
\int_0^{T/\lambda^2}
\|\nabla u_\lambda(t)\|_\infty\,dt
=
\int_0^T
\|\nabla u(s)\|_\infty\,ds
}.
$$

従ってこの時間積分量は尺度臨界です。
<!-- solution-end -->

## Level B

<a id="ex-ns7-b01"></a>
### B1. $p=6$ の Prodi--Serrin 評価を最初から作る

$p=6$ とする。Hölder、$L^2$-$L^6$ 補間、周期 Sobolev 評価を使って

$$
|b(u,u,Au)|
\le
C
\|u\|_6
\|\nabla u\|_2^{1/2}
\|Au\|_2^{3/2}
$$

を導き、Young の不等式から

$$
|b(u,u,Au)|
\le
\frac{\nu}{4}\|Au\|_2^2
+
C_\nu
\|u\|_6^4
\|\nabla u\|_2^2
$$

を示せ。

- Level: B

<!-- solution-start -->
### 詳細解答

$p=6$ なら

$$
r=\frac{2p}{p-2}
=
\frac{12}{4}
=
3.
$$

従って Hölder の不等式から

$$
|b(u,u,Au)|
\le
\|u\|_6
\|\nabla u\|_3
\|Au\|_2.
$$

$L^3$ は $L^2$ と $L^6$ の中間なので

$$
\|\nabla u\|_3
\le
\|\nabla u\|_2^{1/2}
\|\nabla u\|_6^{1/2}.
$$

周期 Sobolev 評価より

$$
\|\nabla u\|_6
\le
C\|Au\|_2.
$$

したがって

$$
|b(u,u,Au)|
\le
C
\|u\|_6
\|\nabla u\|_2^{1/2}
\|Au\|_2^{3/2}.
$$

ここで

$$
X=\|Au\|_2^{3/2},
\qquad
Y=C\|u\|_6\|\nabla u\|_2^{1/2}.
$$

共役指数 $4/3$ と $4$ を使うと

$$
X^{4/3}=\|Au\|_2^2,
$$

$$
Y^4
=
C^4
\|u\|_6^4
\|\nabla u\|_2^2.
$$

係数付き Young の不等式から

$$
\boxed{
|b(u,u,Au)|
\le
\frac{\nu}{4}\|Au\|_2^2
+
C_\nu
\|u\|_6^4
\|\nabla u\|_2^2
}.
$$

ここで時間指数4が、臨界関係

$$
\frac24+\frac36=1
$$

と一致しています。
<!-- solution-end -->

<a id="ex-ns7-b02"></a>
### B2. 一般 $p>3$ で時間係数が積分可能になることを示す

$3<p\le\infty$ とし

$
q_c=
\begin{cases}
\dfrac{2p}{p-3}, & 3<p<\infty,\\
2, & p=\infty
\end{cases}
$

とする。$q\ge q_c$ かつ

$$
u\in L^q(0,T;L^p)
$$

なら

$$
\|u(t)\|_p^{q_c}\in L^1(0,T)
$$

を示せ。

- Level: B

<!-- solution-start -->
### 詳細解答

$q=q_c$ なら定義そのものから

$$
\int_0^T
\|u(t)\|_p^{q_c}\,dt
<
\infty.
$$

$q>q_c$ の場合は

$$
\|u(t)\|_p^{q_c}
=
\left(
\|u(t)\|_p^q
\right)^{q_c/q}
\cdot1
$$

と書きます。

Hölder の共役指数

$$
\frac{q}{q_c},
\qquad
\frac{q}{q-q_c}
$$

を使うと

$$
\begin{aligned}
\int_0^T
\|u(t)\|_p^{q_c}\,dt
&\le
\left(
\int_0^T
\|u(t)\|_p^q\,dt
\right)^{q_c/q}
\left(
\int_0^T1\,dt
\right)^{1-q_c/q}
\\
&=
\|u\|_{L^q_tL^p_x}^{q_c}
T^{1-q_c/q}
<
\infty.
\end{aligned}
$$

従って

$$
\boxed{
\|u(t)\|_p^{q_c}\in L^1(0,T)
}.
$$
<!-- solution-end -->

<a id="ex-ns7-b03"></a>
### B3. 渦度エネルギーから速度勾配判定を再構成する

外力なしの三次元周期強解について

$$
\frac12\frac{d}{dt}\|\omega\|_2^2
+
\nu\|\nabla\omega\|_2^2
=
\int
(\omega\cdot\nabla)u\cdot\omega\,dx
$$

から

$$
\int_0^T\|\nabla u(t)\|_\infty\,dt<\infty
$$

なら

$$
\sup_{0\le t\le T}\|\nabla u(t)\|_2<\infty
$$

を示せ。

- Level: B

<!-- solution-start -->
### 詳細解答

右辺を絶対値評価すると

$$
\begin{aligned}
\left|
\int
(\omega\cdot\nabla)u\cdot\omega\,dx
\right|
&\le
\int
|\omega|\,|\nabla u|\,|\omega|\,dx
\\
&\le
\|\nabla u\|_\infty
\|\omega\|_2^2.
\end{aligned}
$$

従って散逸項を落として

$$
\frac{d}{dt}\|\omega\|_2^2
\le
2\|\nabla u\|_\infty
\|\omega\|_2^2.
$$

Grönwall の不等式から

$$
\|\omega(t)\|_2^2
\le
\|\omega(0)\|_2^2
\exp\left(
2\int_0^t
\|\nabla u(s)\|_\infty\,ds
\right).
$$

仮定により指数は $0\le t\le T$ で有限なので

$$
\sup_{0\le t\le T}\|\omega(t)\|_2<\infty.
$$

周期発散零場では

$$
\|\nabla u\|_2=\|\omega\|_2
$$

だから

$$
\boxed{
\sup_{0\le t\le T}\|\nabla u(t)\|_2<\infty
}.
$$
<!-- solution-end -->

<a id="ex-ns7-b04"></a>
### B4. 端点 $p=3$ で主証明が退化する箇所を特定する

$p=3$ としたとき、第3節と第4節のどの指数が退化するかを計算し、

$$
|b(u,u,Au)|
\le
C\|u\|_3\|Au\|_2^2
$$

からは $\|u\|_{L^\infty_tL^3_x}<\infty$ だけで粘性項を必ず吸収できない理由を説明せよ。

- Level: B

<!-- solution-start -->
### 詳細解答

$p=3$ では

$$
\theta=\frac3p=1.
$$

従って

$$
m=\frac{2}{1+\theta}=1,
$$

$$
m'=\frac{2}{1-\theta}=\infty.
$$

また

$$
q_c(p)=\frac{2p}{p-3}
$$

は分母が0になり、有限指数として定義できません。

非線形項評価は

$$
|b(u,u,Au)|
\le
C\|u\|_3\|Au\|_2^2
$$

となります。

$H^1$ エネルギーへ入れると

$$
\frac12y'
+
\nu\|Au\|_2^2
\le
C\|u\|_3\|Au\|_2^2
+\cdots
$$

なので

$$
\frac12y'
+
(\nu-C\|u\|_3)\|Au\|_2^2
\le
\cdots.
$$

$\|u\|_3$ が有限であっても

$$
C\|u\|_3<\nu
$$

とは限りません。従って粘性項の正の係数を保証できません。

つまり

$$
\|u\|_{L^\infty_tL^3_x}<\infty
$$

は scaling 上は自然でも、本章の単純な吸収法だけでは一般の有限値を処理できません。
<!-- solution-end -->

## Level C

<a id="ex-ns7-c01"></a>
### C1. 弱解・強解・正則性判定を一つにつなぐ

$u_0\in V$、$f\in L^2(0,T;H)$ とする。$v$ を NS3 で得られる Leray--Hopf 弱解とし、ある $3<p\le\infty$、$q$ について

$$
\frac2q+\frac3p\le1,
\qquad
v\in L^q(0,T;L^p)
$$

を仮定する。

次を示せ。

1. NS5 の最大強解 $u$ は少なくとも時刻 $T$ まで存在する。
2. $u=v$ が $[0,T]$ で成り立つ。
3. 同じ初期値・外力を持つ任意の Leray--Hopf 弱解 $w$ も $u$ と一致する。
4. 以上が「大域弱解の存在」だけより何を強く言っているか説明せよ。

- Level: C

<!-- solution-start -->
### 詳細解答

まず NS5 の局所強解を $u$ とし、最大存在時間を $T_{\max}$ とします。

### 1. 最大強解が $T$ まで存在すること

弱--強一意性により、強解が存在する区間では

$$
u=v
$$

です。

反対に

$$
T_{\max}\le T
$$

と仮定します。すると

$$
\|u\|_{L^q(0,T_{\max};L^p)}
=
\|v\|_{L^q(0,T_{\max};L^p)}
\le
\|v\|_{L^q(0,T;L^p)}
<
\infty.
$$

しかし Prodi--Serrin 型延長判定は、有限最大時刻ならこのノルムが無限大でなければならないと主張します。

矛盾です。

従って

$$
T_{\max}>T.
$$

### 2. $u=v$ の一致

$u$ は $[0,T]$ 全体で強解として存在します。NS5 の弱--強一意性を $[0,T]$ へ適用して

$$
\boxed{u=v}
$$

を得ます。

### 3. 任意の Leray--Hopf 弱解との一致

別の Leray--Hopf 弱解 $w$ を取ります。

$u$ は $[0,T]$ 上の強解なので、再び弱--強一意性から

$$
\boxed{w=u}
$$

です。

従って

$$
w=u=v.
$$

### 4. 何が強くなったか

NS3 の大域存在だけでは、

- 弱解が一意か、
- 滑らかな強解として存在し続けるか、
- 有限時間特異点が起こらないか

は分かりませんでした。

ここでは追加条件

$$
v\in L^q_tL^p_x,
\qquad
\frac2q+\frac3p\le1,
\qquad
p>3
$$

により、

$$
\boxed{
\text{弱解の存在}
\longrightarrow
\text{強解への持ち上げ}
\longrightarrow
\text{一意性}
}
$$

まで進みました。

正則性判定とは、「弱解が存在するか」ではなく「どの追加量が有限なら弱解が特異化せず強解として続くか」を答える定理です。
<!-- solution-end -->

---

## まとめ

本章で得た中心結果は三つです。

第一に、$3<p\le\infty$ では

$$
\frac2q+\frac3p\le1
$$

という NS6 の scaling と一致する時空間条件が、実際に $H^1$ エネルギーを線形 Grönwall 型へ変えます。

第二に、三次元渦度方程式には

$$
(\omega\cdot\nabla)u
$$

が残り、

$$
\frac12\frac{d}{dt}\|\omega\|_2^2
+
\nu\|\nabla\omega\|_2^2
=
\int
(\omega\cdot\nabla)u\cdot\omega\,dx
$$

となります。二次元で消えていた項が、三次元では渦度増幅の入口になります。

第三に、もし有限時間特異点があるなら

$$
L^q_tL^p_x
$$

の Prodi--Serrin 量や

$$
\int\|\nabla u\|_\infty\,dt
$$

のような臨界量は有限のままではいられません。

次の NS8 では、これらの解析的な構図を踏まえて Clay Mathematics Institute の公式 statement を読み、「Navier--Stokes 問題を解く」とは正確に何を証明することなのかを整理します。
