# PDE7 固有関数展開・Green表現・三類型の統合

PDE3 から PDE6 まででは、熱方程式・波動方程式・Laplace / Poisson 方程式を、それぞれ最大原理、エネルギー法、変数分離、Fourier 変換、Green 表現から調べました。個々の計算はかなり違って見えます。しかし空間微分の部分だけを取り出すと、同じ骨格が何度も現れています。

本章では新しい大定理を増やすのではなく、これまでの解法を

$$
\text{空間作用素}
\longrightarrow
\text{固有モード / Fourier 周波数}
\longrightarrow
\text{モードごとの ODE または代数方程式}
$$

という一つの図にまとめます。

有界区間では [ODE7 の Sturm--Liouville 固有関数](../ODE7/index.md#def-ode7-eigenpair) が離散モードを与え、実数全体では [FOU3 の Fourier 変換](../FOU3/index.md#def-fou3-fourier-transform) が連続周波数を与えます。PDE6 の [Green 表現公式](../PDE6/index.md#thm-pde6-green-representation) は、同じ空間作用素を「逆作用素の kernel」として見る側です。

この章の中心問いは次の四つです。

1. なぜ固有関数展開をすると PDE がモードごとに分離するのか。
2. 熱・波動・Poisson では、同じ固有値がなぜ異なる時間応答・定常応答を生むのか。
3. Fourier 変換の連続周波数と、有界区間の離散固有モードはどこまで同じものなのか。
4. Green 関数に現れる「逆作用」は、固有モード側では何をしているのか。

一般の自己共役作用素のスペクトル定理、弱微分、Sobolev 空間、弱解は使いません。有限モードでは計算を完全に閉じ、無限級数・Fourier 積分については前章までで正当化した古典解の範囲だけを使います。

---

## 1. 空間微分を一つの作用素として見る

まず固定端区間 $0<x<L$ を考えます。空間作用素として

$$
A=-\frac{d^2}{dx^2}
$$

を取り、Dirichlet 条件

$$
u(t,0)=u(t,L)=0
$$

を課します。

[ODE7 の標準固有値計算](../ODE7/index.md#def-ode7-eigenpair)から、

$$
\phi_n(x)
=
\sin\frac{n\pi x}{L},
\qquad
\lambda_n
=
\left(\frac{n\pi}{L}\right)^2,
\qquad
n=1,2,\ldots
$$

は

$$
A\phi_n=\lambda_n\phi_n
$$

を満たします。

つまり二階微分は、固有関数に作用すると「関数の形を変えず、定数 $\lambda_n$ を掛ける」だけになります。この単純化が、変数分離法の中心です。

たとえば

$$
u(t,x)
=
a_1(t)\phi_1(x)+a_2(t)\phi_2(x)
$$

なら

$$
Au
=
\lambda_1a_1(t)\phi_1(x)
+
\lambda_2a_2(t)\phi_2(x).
$$

空間変数についての微分が、係数 $\lambda_n$ の掛け算へ変わりました。

---

## 2. 有限モードなら対角化はただの線形代数である

<a id="prop-pde7-modal-diagonalization"></a>
<!-- formal-statement-start -->
> **命題（有限固有モードによる PDE の対角化）**  
> 線形空間作用素 $A$ に対し、非零関数 $\phi_1,\ldots,\phi_N$ が互いに直交し、

$$
A\phi_n=\lambda_n\phi_n
\qquad
(n=1,\ldots,N)
$$

> を満たすとする。係数関数 $a_n(t)$ を用いて

$$
u(t,x)
=
\sum_{n=1}^N a_n(t)\phi_n(x)
$$

> と置けば、

$$
Au(t,x)
=
\sum_{n=1}^N
\lambda_n a_n(t)\phi_n(x)
$$

> である。さらに $u_t$ または $u_{tt}$ が存在すれば、時間微分は各係数へだけ作用する。
<!-- formal-statement-end -->

この命題では無限級数の項別微分は一切ありません。有限和なので、線形性だけで全てが正当化されます。

### 証明の見取り図

各項へ $A$ を作用させ、固有値方程式 $A\phi_n=\lambda_n\phi_n$ を使うだけです。時間微分についても $\phi_n$ は $t$ に依存しないので、$a_n$ だけを微分します。

<!-- proof-start -->
### 証明

$A$ の線形性から

$$
\begin{aligned}
Au
&=
A\left(
\sum_{n=1}^N a_n(t)\phi_n
\right)\\
&=
\sum_{n=1}^N
a_n(t)A\phi_n\\
&=
\sum_{n=1}^N
\lambda_n a_n(t)\phi_n.
\end{aligned}
$$

また有限和なので

$$
u_t
=
\sum_{n=1}^N
a_n'(t)\phi_n,
$$

$$
u_{tt}
=
\sum_{n=1}^N
a_n''(t)\phi_n
$$

も項別に計算できます。
<!-- proof-end -->

重要なのは、変数分離法が「うまい積の形を思いつく技法」だけではないことです。固有関数を座標軸として選ぶと、空間作用素が対角化されるため、PDE 全体が独立した低次元問題へ分裂します。

---

## 3. 同じ固有値が、三類型では別の応答を生む

<a id="prop-pde7-three-type-mode-laws"></a>
<!-- formal-statement-start -->
> **命題（三類型のモード方程式）**  
> 前節と同じ有限固有モード $\phi_n$ を使い、$\kappa>0$, $c>0$ とする。
>
> 1. 放物型のモデル
>
> $$u_t+\kappa Au=0$$
>
> では各係数は
>
> $$a_n'+\kappa\lambda_n a_n=0$$
>
> を満たす。
>
> 2. 双曲型のモデル
>
> $$u_{tt}+c^2Au=0$$
>
> では各係数は
>
> $$a_n''+c^2\lambda_n a_n=0$$
>
> を満たす。
>
> 3. 楕円型・定常問題のモデル
>
> $$Au=f,\qquad
> f=\sum_{n=1}^N f_n\phi_n$$
>
> では各係数は
>
> $$\lambda_n a_n=f_n$$
>
> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

[有限モード対角化](#prop-pde7-modal-diagonalization)をそれぞれの方程式へ代入します。互いに直交する非零関数の有限線形結合が0なら各係数が0なので、モードごとに独立した方程式が得られます。

<!-- proof-start -->
### 証明

放物型では

$$
u_t+\kappa Au
=
\sum_{n=1}^N
\left(
a_n'+\kappa\lambda_n a_n
\right)\phi_n.
$$

これが恒等的に0なので、各 $n$ について

$$
a_n'+\kappa\lambda_n a_n=0.
$$

双曲型でも同様に有限和を代入すると

$$
u_{tt}+c^2Au
=
\sum_{n=1}^N
\left(
a_n''+c^2\lambda_n a_n
\right)\phi_n,
$$

したがって

$$
a_n''+c^2\lambda_n a_n=0.
$$

定常問題では

$$
Au-f
=
\sum_{n=1}^N
(\lambda_na_n-f_n)\phi_n.
$$

よって各係数について

$$
\lambda_na_n=f_n
$$

です。
<!-- proof-end -->

この一行ずつの違いが、三類型の性質をかなり説明します。

- 熱方程式では $\lambda_n$ が大きいほど指数減衰が速い。
- 波動方程式では $\lambda_n$ が大きいほど角振動数が高い。
- Poisson 型では $\lambda_n$ が大きいほど応答係数 $1/\lambda_n$ が小さい。
- $\lambda_n=0$ があると、定常問題では「割れない」ため可解条件が生じる。

---

## 4. 熱方程式：固有値は減衰率になる

[PDE3](../PDE3/index.md#prop-pde3-finite-sine)の固定端熱方程式

$$
u_t=\kappa u_{xx}
$$

は

$$
u_t+\kappa Au=0
$$

です。

単一モード

$$
u(t,x)
=
a_n(t)\sin\frac{n\pi x}{L}
$$

を入れると

$$
a_n'
+
\kappa
\left(
\frac{n\pi}{L}
\right)^2
a_n
=
0.
$$

従って

$$
a_n(t)
=
a_n(0)
\exp\left[
-\kappa
\left(
\frac{n\pi}{L}
\right)^2t
\right].
$$

高周波モードほど $n^2$ に比例して速く消えます。

たとえば初期値が

$$
u(0,x)
=
\sin\frac{\pi x}{L}
+
\sin\frac{5\pi x}{L}
$$

なら

$$
u(t,x)
=
e^{-\kappa(\pi/L)^2t}
\sin\frac{\pi x}{L}
+
e^{-25\kappa(\pi/L)^2t}
\sin\frac{5\pi x}{L}.
$$

第5モードは第1モードの25倍の減衰率を持ちます。PDE3 で見た「平滑化」は、モード側では高周波が先に失われることとして見えます。

---

## 5. 波動方程式：固有値は振動数になる

[PDE4](../PDE4/index.md#prop-pde4-finite-sine)の固定端波動方程式

$$
u_{tt}=c^2u_{xx}
$$

は

$$
u_{tt}+c^2Au=0
$$

です。

第 $n$ モードでは

$$
a_n''
+
c^2\lambda_n a_n
=
0.
$$

したがって角振動数は

$$
\omega_n
=
c\sqrt{\lambda_n}
=
\frac{cn\pi}{L}
$$

で、

$$
a_n(t)
=
A_n\cos\omega_nt
+
B_n\sin\omega_nt.
$$

熱方程式とは違い、理想的な固定端波動方程式では高周波だから速く消えることはありません。各モードは自分の振動数で振動し続けます。

同じ $\lambda_n$ が

$$
e^{-\kappa\lambda_nt}
$$

と

$$
\cos(c\sqrt{\lambda_n}t),\quad
\sin(c\sqrt{\lambda_n}t)
$$

という全く違う応答を生みます。この差は空間作用素の違いではなく、時間微分が一階か二階かに由来します。

---

## 6. Poisson 型：固有値は「逆作用」の分母になる

定常問題

$$
Au=f
$$

では時間変数がありません。

$f$ が有限固有モード

$$
f
=
\sum_{n=1}^Nf_n\phi_n
$$

で書け、全ての $\lambda_n>0$ なら、

$$
u
=
\sum_{n=1}^N
\frac{f_n}{\lambda_n}\phi_n
$$

です。

固定端区間なら

$$
\lambda_n
=
\left(
\frac{n\pi}{L}
\right)^2,
$$

なので高周波成分ほど

$$
\frac1{\lambda_n}
=
\left(
\frac{L}{n\pi}
\right)^2
$$

だけ弱くなります。

これは Green 関数で内部源を積分することの、固有モード版です。Green 表現が「源から解を作る積分作用素」なら、固有関数展開ではその作用素が各モードへ $1/\lambda_n$ を掛けています。

---

## 7. 有界区間の離散モードと全空間の連続周波数

有界区間では境界条件が許される空間振動を離散化します。

$$
\lambda_n
=
\left(\frac{n\pi}{L}\right)^2,
\qquad
n=1,2,\ldots
$$

一方、実数全体には端点がありません。[FOU3 の微分公式](../FOU3/index.md#thm-fou3-derivative-rule)を十分滑らかな関数へ二回使うと、

$$
-\partial_{xx}
\quad\longleftrightarrow\quad
\xi^2
$$

となり、$\xi\in\mathbb R$ が連続的な「固有値パラメータ」の役割をします。

対応は

$$
\text{有界区間}
\quad
n=1,2,\ldots
\quad\leftrightarrow\quad
\text{実数全体}
\quad
\xi\in\mathbb R
$$

です。

熱方程式なら

$$
\partial_t\widehat u
=
-\kappa\xi^2\widehat u,
$$

よって

$$
\widehat u(t,\xi)
=
e^{-\kappa\xi^2t}
\widehat f(\xi).
$$

これは離散モードの

$$
a_n(t)
=
e^{-\kappa\lambda_nt}a_n(0)
$$

で $\lambda_n$ を $\xi^2$ に置き換えた形です。

波動方程式も

$$
\partial_{tt}\widehat u
+
c^2\xi^2\widehat u
=
0
$$

となり、周波数ごとの調和振動子になります。PDE4 の [Fourier 表示と d'Alembert 公式の一致](../PDE4/index.md#prop-pde4-fourier-dalembert) は、この連続モード分解を物理空間へ戻した結果です。

つまり Fourier 級数と Fourier 変換は、PDE から見ると

$$
\text{離散対角化}
\quad\text{と}\quad
\text{連続対角化}
$$

の二つの姿です。

---

## 8. Green表現を固有モード側から読む

PDE6 では [Dirichlet Green 関数](../PDE6/index.md#def-pde6-green-function)を使い、Poisson 方程式の解を内部源と境界データの積分で表しました。

まず境界値0の定常問題だけに集中します。

有限区間の内積を

$$
\langle f,g\rangle
=
\int_0^L f(y)g(y)\,dy
$$

とします。

<a id="prop-pde7-green-spectral-kernel"></a>
<!-- formal-statement-start -->
> **命題（有限モード Green kernel）**  
> $\phi_1,\ldots,\phi_N$ を $[0,L]$ 上の互いに直交する実数値固有関数とし、

$$
A\phi_n=\lambda_n\phi_n,
\qquad
\lambda_n>0
$$

> とする。さらに

$$
\|\phi_n\|^2
=
\int_0^L\phi_n(y)^2\,dy
$$

> と置き、

$$
G_N(x,y)
=
\sum_{n=1}^N
\frac{
\phi_n(x)\phi_n(y)
}{
\lambda_n\|\phi_n\|^2
}
$$

> とする。有限モードの右辺

$$
f(x)
=
\sum_{n=1}^N f_n\phi_n(x)
$$

> に対し、

$$
u(x)
=
\int_0^L
G_N(x,y)f(y)\,dy
$$

> と置けば

$$
u(x)
=
\sum_{n=1}^N
\frac{f_n}{\lambda_n}\phi_n(x)
$$

> となり、従って $Au=f$ を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

$G_N$ を積分へ代入すると二重和が現れます。直交性によって $m\ne n$ の交差項が全て消え、$n=m$ の項だけが $\|\phi_n\|^2$ を生みます。残る係数がちょうど $f_n/\lambda_n$ です。

<!-- proof-start -->
### 証明

$f(y)=\sum_{m=1}^Nf_m\phi_m(y)$ を代入すると、

$$
\begin{aligned}
u(x)
&=
\int_0^L
\left[
\sum_{n=1}^N
\frac{
\phi_n(x)\phi_n(y)
}{
\lambda_n\|\phi_n\|^2
}
\right]
\left[
\sum_{m=1}^N
f_m\phi_m(y)
\right]
dy\\
&=
\sum_{n=1}^N
\sum_{m=1}^N
\frac{
f_m\phi_n(x)
}{
\lambda_n\|\phi_n\|^2
}
\int_0^L
\phi_n(y)\phi_m(y)\,dy.
\end{aligned}
$$

直交性から $m\ne n$ の積分は0で、$m=n$ では

$$
\int_0^L\phi_n(y)^2\,dy
=
\|\phi_n\|^2.
$$

したがって

$$
u(x)
=
\sum_{n=1}^N
\frac{f_n}{\lambda_n}\phi_n(x).
$$

[有限モード対角化](#prop-pde7-modal-diagonalization)を使えば

$$
Au
=
\sum_{n=1}^N
f_n\phi_n
=
f.
$$
<!-- proof-end -->

この命題は Green kernel の「秘密」をかなり露骨に見せています。

$$
\boxed{
\text{Green kernel}
=
\text{各固有モードを }1/\lambda_n\text{ 倍する逆作用素}
}
$$

PDE6 の二次元 Green 関数は境界条件まで埋め込んだ幾何的な構成でした。ここでは同じ逆作用を固有モードの座標で見ています。

---

## 9. Dirichlet正弦モードでは kernel を具体的に書ける

固定端区間では

$$
\phi_n(x)
=
\sin\frac{n\pi x}{L},
$$

$$
\|\phi_n\|^2
=
\int_0^L
\sin^2\frac{n\pi x}{L}\,dx
=
\frac L2.
$$

従って有限モード Green kernel は

$$
G_N(x,y)
=
\frac2L
\sum_{n=1}^N
\frac{
\sin(n\pi x/L)\sin(n\pi y/L)
}{
(n\pi/L)^2
}.
$$

係数の $1/n^2$ は偶然ではありません。二階微分作用素の固有値が $n^2$ で増えるため、その逆作用素は $1/n^2$ を掛けます。

無限和へ進むには収束の正当化が必要です。本章では「固有関数なら何でも無条件に完全展開できる」とは置きません。区間の正弦級数については FOU2 の [点ごとの収束定理](../FOU2/index.md#thm-fou2-dirichlet-convergence)と [Parseval・完全性](../FOU2/index.md#thm-fou2-parseval)、PDE3/PDE4 で用いた滑らかさ条件の範囲を使います。

---

## 10. 零固有値はNeumann問題の整合条件として現れる

Dirichlet 条件では $\lambda_n>0$ でした。しかし Neumann 条件

$$
u_x(0)=u_x(L)=0
$$

では定数関数

$$
\phi_0(x)=1
$$

が

$$
A\phi_0=0
$$

を満たします。

<a id="prop-pde7-neumann-zero-mode"></a>
<!-- formal-statement-start -->
> **命題（Neumann 零モードと可解条件）**  
> $A=-d^2/dx^2$ を $[0,L]$ 上で考え、Neumann 条件 $u'(0)=u'(L)=0$ を課す。方程式

$$
Au=f
$$

> が $C^2$ 級解を持つなら、

$$
\int_0^L f(x)\,dx=0
$$

> が必要である。これは定数固有関数 $\phi_0=1$ に対応する零モード係数が0でなければならないことと同値である。さらに解が一つ存在すれば、任意定数を加えても解である。
<!-- formal-statement-end -->

### 証明の見取り図

一方では方程式を積分して微積分学の基本定理を使います。もう一方では零モードに対する係数方程式 $0\cdot a_0=f_0$ を読みます。同じ条件が二つの言葉で現れます。

<!-- proof-start -->
### 証明

$Au=f$ は

$$
-u''=f
$$

です。両辺を $[0,L]$ で積分すると

$$
\int_0^L f(x)\,dx
=
-\int_0^L u''(x)\,dx
=
-u'(L)+u'(0).
$$

Neumann 条件から右辺は0なので

$$
\int_0^L f(x)\,dx=0.
$$

一方、定数固有関数 $\phi_0=1$ に沿う係数は、定数倍を除けば

$$
f_0
\propto
\int_0^L f(x)\,dx.
$$

零固有値 $\lambda_0=0$ に対するモード方程式は

$$
0\cdot a_0=f_0
$$

なので、可解には $f_0=0$ が必要です。

また $Au=f$ を満たす $u$ に定数 $C$ を加えても

$$
A(u+C)=Au=f
$$

であり、Neumann 条件も変わりません。
<!-- proof-end -->

これは PDE6 の [Neumann 整合条件と定数を除く一意性](../PDE6/index.md#cor-pde6-neumann)の一次元版です。

境界積分法では

$$
\int_\Omega f
+
\int_{\partial\Omega}g
=
0
$$

という総量条件として現れ、固有関数法では

$$
\text{零固有値では }1/\lambda\text{ が使えない}
$$

という形で現れます。同じ障害を二つの座標系で見ています。

---

## 11. 三類型を一枚に並べる

ここまでの対応をまとめると次のようになります。

| 類型 | 代表式 | モード係数 | 主要な挙動 | これまでの一意性機構 |
|---|---|---|---|---|
| 放物型 | $u_t+\kappa Au=0$ | $a_n'+\kappa\lambda_na_n=0$ | $e^{-\kappa\lambda_nt}$ で減衰 | PDE3 最大原理・比較原理 |
| 双曲型 | $u_{tt}+c^2Au=0$ | $a_n''+c^2\lambda_na_n=0$ | 角振動数 $c\sqrt{\lambda_n}$ で振動 | PDE4 エネルギー保存 |
| 楕円型・定常 | $Au=f$ | $\lambda_na_n=f_n$ | $1/\lambda_n$ で源を反転 | PDE5 最大原理、PDE6 Green エネルギー |

この表で重要なのは、モード分解が一意性証明を置き換えるわけではないことです。

モード展開で候補解を構成しても、

- 級数が本当に収束するか。
- 項別微分してよいか。
- 境界条件へ収束するか。
- その候補が唯一か。

は別に確認する必要があります。

PDE3 では最大原理、PDE4 ではエネルギー法、PDE5 では強最大原理、PDE6 では Green の第一恒等式がその役割を担いました。

つまり標準的な解法は

$$
\boxed{
\text{構成}
+
\text{正当化}
+
\text{一意性}
}
$$

の三点セットです。

---

## 12. Green表現と固有関数展開は競合する解法ではない

同じ Poisson 問題

$$
-\Delta u=f
$$

を考えます。

Green 関数側では、境界値0なら概念的に

$$
u(x)
=
\int_\Omega
G(x,y)f(y)\,dy
$$

です。

固有モード側では、もし境界条件込みの固有関数族が十分に使え、

$$
f
=
\sum_n f_n\phi_n,
\qquad
-\Delta\phi_n=\lambda_n\phi_n,
$$

なら形式的には

$$
u
=
\sum_n
\frac{f_n}{\lambda_n}\phi_n.
$$

有限モードでは [Green kernel 命題](#prop-pde7-green-spectral-kernel)が両者の一致を完全に示しました。無限次元で一般にこの図を閉じるには、固有関数の完全性、作用素の定義域、収束、逆作用素の有界性などが必要です。

それらを一般論として扱うのは、関数解析と Encore III の役目です。本章ではそこを先取りしません。

---

## 13. 変数分離法を読み直す

PDE3--PDE5 で使った変数分離

$$
u(t,x)=T(t)X(x)
$$

は、一つの固有モードを探す操作でした。

例えば熱方程式では

$$
T'X
=
\kappa TX'',
$$

従って

$$
\frac{T'}{\kappa T}
=
\frac{X''}{X}
=
-\lambda.
$$

空間側は

$$
-X''=\lambda X,
$$

時間側は

$$
T'+\kappa\lambda T=0.
$$

最初に積の形を仮定する見方と、最初から固有関数基底へ展開する見方は、同じ構造の局所版と全体版です。

一つの積

$$
T_n(t)\phi_n(x)
$$

を見つけ、

$$
\sum_n T_n(t)\phi_n(x)
$$

へ重ね合わせる。これが線形 PDE における変数分離法と Fourier / 固有関数展開の関係です。

---

## 14. どこから先がEncore IIIなのか

ここまでの標準コアでは、古典微分が存在する十分滑らかな解を扱ってきました。

しかし実際の PDE では、

- 初期値が連続ですらない。
- 境界が滑らかでない。
- 解の二階微分が通常の関数として存在しない。
- エネルギーは有限だが点wise微分は持てない。
- 一般領域で固有関数展開を厳密に正当化したい。

という状況が普通に現れます。

そのためには

$$
\text{distribution}
\longrightarrow
\text{弱微分}
\longrightarrow
\text{Sobolev 空間}
\longrightarrow
\text{弱形式}
\longrightarrow
\text{弱解}
$$

という別の言語が必要です。

PDE7 の役割は、その言語を先取りすることではありません。古典解の標準 PDE が

$$
\text{型分類}
+
\text{特性曲線 / 最大原理 / エネルギー}
+
\text{Fourier / 固有関数}
+
\text{Green 表現}
$$

まで一つの体系としてつながっていることを確認し、Encore III へ渡すことです。

---

# 演習

## PDE7-A01 熱方程式の単一モードを対角化する

- Level: A
- 目安時間: 10分

$0<x<L$ で

$$
u_t=\kappa u_{xx},
\qquad
u(t,0)=u(t,L)=0
$$

とする。初期値が

$$
u(0,x)
=
3\sin\frac{2\pi x}{L}
$$

のとき解を求め、振幅が時刻 $t$ で何倍になるか答えよ。

<!-- solution-start -->
### 詳細解答

空間固有関数

$$
\phi_2(x)
=
\sin\frac{2\pi x}{L}
$$

に対し

$$
-\phi_2''
=
\left(
\frac{2\pi}{L}
\right)^2
\phi_2.
$$

したがって

$$
u(t,x)=a_2(t)\phi_2(x)
$$

と置くと、熱方程式は

$$
a_2'
+
\kappa
\left(
\frac{2\pi}{L}
\right)^2
a_2
=
0
$$

になります。

初期値から

$$
a_2(0)=3.
$$

よって

$$
a_2(t)
=
3
\exp\left[
-\kappa
\left(
\frac{2\pi}{L}
\right)^2t
\right].
$$

従って

$$
\boxed{
u(t,x)
=
3
\exp\left[
-\frac{4\kappa\pi^2}{L^2}t
\right]
\sin\frac{2\pi x}{L}
}
$$

です。

初期振幅3に対する振幅比は

$$
\boxed{
\exp\left(
-\frac{4\kappa\pi^2}{L^2}t
\right)
}
$$

です。
<!-- solution-end -->

## PDE7-A02 波動方程式の単一モードを解く

- Level: A
- 目安時間: 12分

$0<x<L$ で

$$
u_{tt}=c^2u_{xx},
\qquad
u(t,0)=u(t,L)=0
$$

とする。

$$
u(0,x)=0,
\qquad
u_t(0,x)
=
V\sin\frac{3\pi x}{L}
$$

のとき解を求めよ。

<!-- solution-start -->
### 詳細解答

第3固有モード

$$
\phi_3(x)
=
\sin\frac{3\pi x}{L}
$$

の固有値は

$$
\lambda_3
=
\left(
\frac{3\pi}{L}
\right)^2.
$$

$$
u(t,x)=a_3(t)\phi_3(x)
$$

と置けば

$$
a_3''
+
c^2\lambda_3a_3
=
0.
$$

角振動数を

$$
\omega_3
=
c\sqrt{\lambda_3}
=
\frac{3c\pi}{L}
$$

とすると

$$
a_3(t)
=
A\cos\omega_3t
+
B\sin\omega_3t.
$$

初期変位が0なので

$$
A=0.
$$

また

$$
a_3'(0)
=
B\omega_3
=
V,
$$

従って

$$
B
=
\frac{V}{\omega_3}
=
\frac{VL}{3c\pi}.
$$

ゆえに

$$
\boxed{
u(t,x)
=
\frac{VL}{3c\pi}
\sin\left(
\frac{3c\pi}{L}t
\right)
\sin\frac{3\pi x}{L}
}
$$

です。
<!-- solution-end -->

## PDE7-A03 Poisson型問題を二つの固有モードで解く

- Level: A
- 目安時間: 12分

$0<x<L$ で

$$
-u''(x)
=
\sin\frac{\pi x}{L}
+
4\sin\frac{2\pi x}{L},
$$

$$
u(0)=u(L)=0
$$

とする。固有関数展開だけで $u$ を求めよ。

<!-- solution-start -->
### 詳細解答

Dirichlet 固有関数は

$$
\phi_n(x)
=
\sin\frac{n\pi x}{L},
$$

固有値は

$$
\lambda_n
=
\left(
\frac{n\pi}{L}
\right)^2.
$$

右辺の係数は

$$
f_1=1,
\qquad
f_2=4.
$$

定常モード方程式

$$
\lambda_na_n=f_n
$$

から

$$
a_1
=
\frac1{\lambda_1}
=
\frac{L^2}{\pi^2},
$$

$$
a_2
=
\frac4{\lambda_2}
=
\frac4{(2\pi/L)^2}
=
\frac{L^2}{\pi^2}.
$$

したがって

$$
\boxed{
u(x)
=
\frac{L^2}{\pi^2}
\left(
\sin\frac{\pi x}{L}
+
\sin\frac{2\pi x}{L}
\right)
}
$$

です。

直接二回微分すれば元の右辺へ戻り、両端では各正弦項が0なので境界条件も満たします。
<!-- solution-end -->

## PDE7-A04 全空間熱方程式の連続周波数版を読む

- Level: A
- 目安時間: 12分

十分滑らかな初期値 $f$ に対する実数全体上の熱方程式

$$
u_t=\kappa u_{xx},
\qquad
u(0,x)=f(x)
$$

を空間 Fourier 変換するとする。

1. $\widehat u$ が満たす ODE を書け。
2. その解を求めよ。
3. 有界区間の固有モード公式との対応を説明せよ。

<!-- solution-start -->
### 詳細解答

1. Fourier 変換では二階微分が

$$
\widehat{u_{xx}}
=
-\xi^2\widehat u
$$

へ移るので、

$$
\partial_t\widehat u
=
-\kappa\xi^2\widehat u.
$$

2. $\xi$ を固定すると一階線形 ODE です。

$$
\widehat u(t,\xi)
=
C(\xi)e^{-\kappa\xi^2t}.
$$

初期値から

$$
C(\xi)
=
\widehat f(\xi).
$$

したがって

$$
\boxed{
\widehat u(t,\xi)
=
e^{-\kappa\xi^2t}\widehat f(\xi)
}
$$

です。

3. 有界区間では

$$
a_n(t)
=
e^{-\kappa\lambda_nt}a_n(0)
$$

でした。

対応は

$$
\lambda_n
\longleftrightarrow
\xi^2
$$

です。離散番号 $n$ が連続変数 $\xi$ に置き換わっています。
<!-- solution-end -->

## PDE7-B01 同じ初期形を熱と波で進めて比較する

- Level: B
- 目安時間: 18分

$L=\pi$ とし、

$$
f(x)
=
2\sin x+\sin4x
$$

を考える。

1. 熱方程式 $u_t=u_{xx}$、斉次 Dirichlet 条件、初期値 $f$ の解を求めよ。
2. 波動方程式 $v_{tt}=v_{xx}$、斉次 Dirichlet 条件、初期変位 $f$、初速度0の解を求めよ。
3. 第1モードと第4モードの時間挙動の違いを比較せよ。

<!-- solution-start -->
### 詳細解答

$L=\pi$ では

$$
\phi_n(x)=\sin nx,
\qquad
\lambda_n=n^2.
$$

1. 熱方程式では各モードが $e^{-n^2t}$ 倍されるので

$$
\boxed{
u(t,x)
=
2e^{-t}\sin x
+
e^{-16t}\sin4x
}
$$

です。

2. 波動方程式では初速度0なので各モードは $\cos(nt)$ で進みます。

$$
\boxed{
v(t,x)
=
2\cos t\sin x
+
\cos4t\sin4x
}
$$

です。

3. 熱方程式では第4モードの減衰率は16、第1モードは1です。したがって高周波の第4モードは急速に消えます。

波動方程式では第4モードは第1モードの4倍の角振動数で振動しますが、振幅そのものは減衰しません。

同じ空間固有値 $\lambda_n$ が、熱では減衰率、波では角振動数の二乗を決めています。
<!-- solution-end -->

## PDE7-B02 有限モードGreen kernelを直接使う

- Level: B
- 目安時間: 22分

$L=\pi$ とし、

$$
\phi_1(x)=\sin x,
\qquad
\phi_2(x)=\sin2x.
$$

$A=-d^2/dx^2$ とする。

1. $\lambda_1,\lambda_2$ と $\|\phi_1\|^2,\|\phi_2\|^2$ を求めよ。
2. $N=2$ の有限モード Green kernel $G_2(x,y)$ を書け。
3. $f(y)=3\sin y+8\sin2y$ に対して

$$
u(x)
=
\int_0^\pi G_2(x,y)f(y)\,dy
$$

を計算せよ。
4. $-u''=f$ を確認せよ。

<!-- solution-start -->
### 詳細解答

1. 固有値は

$$
\lambda_1=1,
\qquad
\lambda_2=4.
$$

また

$$
\int_0^\pi\sin^2ny\,dy
=
\frac\pi2
$$

なので

$$
\|\phi_1\|^2
=
\|\phi_2\|^2
=
\frac\pi2.
$$

2. 定義式から

$$
\begin{aligned}
G_2(x,y)
&=
\frac{\sin x\sin y}{1\cdot(\pi/2)}
+
\frac{\sin2x\sin2y}{4\cdot(\pi/2)}\\
&=
\frac2\pi\sin x\sin y
+
\frac1{2\pi}\sin2x\sin2y.
\end{aligned}
$$

3. 積分すると

$$
\begin{aligned}
u(x)
&=
\int_0^\pi
\left(
\frac2\pi\sin x\sin y
+
\frac1{2\pi}\sin2x\sin2y
\right)
(3\sin y+8\sin2y)\,dy.
\end{aligned}
$$

直交性により交差項は0です。

第一モードは

$$
\frac2\pi\sin x
\cdot
3
\int_0^\pi\sin^2y\,dy
=
\frac2\pi\sin x\cdot3\cdot\frac\pi2
=
3\sin x.
$$

第二モードは

$$
\frac1{2\pi}\sin2x
\cdot
8
\int_0^\pi\sin^22y\,dy
=
\frac1{2\pi}\sin2x\cdot8\cdot\frac\pi2
=
2\sin2x.
$$

従って

$$
\boxed{
u(x)=3\sin x+2\sin2x
}
$$

です。

4. 二回微分すると

$$
-u''
=
3\sin x
+
2\cdot4\sin2x
=
3\sin x+8\sin2x
=
f.
$$

Green kernel が各右辺係数を固有値で割っていることが直接確認できました。
<!-- solution-end -->

## PDE7-B03 Neumann零モードから整合条件を読み取る

- Level: B
- 目安時間: 18分

$0<x<\pi$ で

$$
-u''(x)=1+\cos x,
$$

$$
u'(0)=u'(\pi)=0
$$

を考える。

1. この問題に解が存在しないことを積分から示せ。
2. Neumann 固有関数の零モードから同じ結論を説明せよ。
3. 右辺を $\cos x$ だけに変えた場合、一つの解を求め、一般解が定数分だけ不定になることを確認せよ。

<!-- solution-start -->
### 詳細解答

1. 方程式を積分すると

$$
\int_0^\pi(1+\cos x)\,dx
=
\pi.
$$

一方、もし解が存在すれば

$$
\int_0^\pi(-u'')\,dx
=
-u'(\pi)+u'(0)
=
0.
$$

両者が一致しないので解は存在しません。

2. Neumann 問題では定数関数が零固有値の固有関数です。右辺の定数成分1は零モードに沿う非零成分です。

零モードの係数方程式は

$$
0\cdot a_0=f_0
$$

ですから、$f_0\ne0$ では解けません。

3. 右辺が $\cos x$ なら

$$
-u''=\cos x.
$$

$$
u(x)=\cos x
$$

とすれば

$$
u''=-\cos x,
$$

よって方程式を満たします。

また

$$
u'(x)=-\sin x
$$

なので

$$
u'(0)=u'(\pi)=0.
$$

任意の定数 $C$ に対して

$$
u(x)=\cos x+C
$$

も同じ方程式と境界条件を満たします。零モードの係数 $a_0$ は方程式で決まらないためです。
<!-- solution-end -->

## PDE7-C01 三類型とGreen表現を一つのデータで統合する

- Level: C
- 目安時間: 35分

$0<x<\pi$、Dirichlet 固有関数

$$
\phi_n(x)=\sin nx
$$

を使う。空間データ

$$
f(x)
=
2\sin x+3\sin2x
$$

について次を行え。

1. 熱方程式

$$
u_t=u_{xx},
\qquad
u(0,x)=f(x)
$$

の解を求めよ。

2. 波動方程式

$$
v_{tt}=v_{xx},
\qquad
v(0,x)=f(x),
\qquad
v_t(0,x)=0
$$

の解を求めよ。

3. Poisson 型境界値問題

$$
-w''=f,
\qquad
w(0)=w(\pi)=0
$$

の解を求めよ。

4. 3つの答えで固有値 $\lambda_1=1$, $\lambda_2=4$ がそれぞれどのように現れるか整理せよ。

5. $N=2$ の Green kernel

$$
G_2(x,y)
=
\frac2\pi
\left[
\sin x\sin y
+
\frac14\sin2x\sin2y
\right]
$$

を使うと、3. の $w$ が積分表示

$$
w(x)
=
\int_0^\pi G_2(x,y)f(y)\,dy
$$

から得られることを確認せよ。

<!-- solution-start -->
### 詳細解答

1. 熱方程式では第 $n$ モードは $e^{-n^2t}$ 倍されます。

したがって

$$
\boxed{
u(t,x)
=
2e^{-t}\sin x
+
3e^{-4t}\sin2x
}
$$

です。

2. 波動方程式では初速度0なので第 $n$ モードは $\cos(nt)$ 倍されます。

したがって

$$
\boxed{
v(t,x)
=
2\cos t\sin x
+
3\cos2t\sin2x
}
$$

です。

3. Poisson 型では各係数を固有値で割ります。

第1モードは

$$
\frac2{\lambda_1}=2,
$$

第2モードは

$$
\frac3{\lambda_2}
=
\frac34.
$$

したがって

$$
\boxed{
w(x)
=
2\sin x
+
\frac34\sin2x
}
$$

です。

直接計算すると

$$
-w''
=
2\sin x
+
\frac34\cdot4\sin2x
=
2\sin x+3\sin2x
=
f.
$$

4. 固有値の使われ方は

$$
\begin{array}{c|c}
\text{方程式} & \text{第 }n\text{ モードの応答}\\
\hline
\text{熱} & e^{-\lambda_nt}\\
\text{波動} & \cos(\sqrt{\lambda_n}t)\quad(c=1)\\
\text{Poisson} & 1/\lambda_n
\end{array}
$$

です。

同じ空間作用素 $A=-d^2/dx^2$ を使っていても、時間微分の型または定常問題であることにより応答法則が変わります。

5. 与えられた kernel と $f$ を積分します。

$$
\begin{aligned}
w(x)
&=
\frac2\pi
\int_0^\pi
\left[
\sin x\sin y
+
\frac14\sin2x\sin2y
\right]
\left[
2\sin y+3\sin2y
\right]dy.
\end{aligned}
$$

直交性から

$$
\int_0^\pi\sin y\sin2y\,dy=0.
$$

また

$$
\int_0^\pi\sin^2y\,dy
=
\int_0^\pi\sin^22y\,dy
=
\frac\pi2.
$$

従って第一モードは

$$
\frac2\pi
\sin x
\cdot2\cdot\frac\pi2
=
2\sin x,
$$

第二モードは

$$
\frac2\pi
\cdot\frac14
\sin2x
\cdot3\cdot\frac\pi2
=
\frac34\sin2x.
$$

よって

$$
w(x)
=
2\sin x+\frac34\sin2x
$$

となり、3. の固有関数法と一致します。

この問題では

$$
\text{固有関数展開}
\quad\text{と}\quad
\text{Green kernel 積分}
$$

が同じ逆作用を別の形で表していることを直接確認できました。
<!-- solution-end -->

---

## 15. 章末チェック

- 有限固有モード展開で空間作用素が対角化されることを線形性から導ける。
- 熱方程式の各モードが $e^{-\kappa\lambda_nt}$ で減衰することを説明できる。
- 波動方程式の各モードが角振動数 $c\sqrt{\lambda_n}$ で振動することを説明できる。
- 定常問題 $Au=f$ が各モードで $\lambda_na_n=f_n$ になることを説明できる。
- 有界区間の離散固有値 $\lambda_n$ と全空間 Fourier 変換の $\xi^2$ を対応させられる。
- 有限モード Green kernel を構成し、係数 $1/\lambda_n$ の意味を積分計算で確認できる。
- Neumann 零モードから可解条件と定数不定性を導ける。
- PDE3--PDE6 の構成法と一意性法を混同せず、「構成 + 正当化 + 一意性」で整理できる。
- 一般スペクトル定理・弱解・Sobolev 空間が必要になる地点を説明できる。

これで Encore II の新しい ODE・FOU・PDE 三系列は、ODE7 の Sturm--Liouville、FOU1--FOU5 の離散・連続 Fourier 解析、PDE1--PDE7 の三類型と Green 表現まで一つの流れとして閉じます。次の Encore III では、古典微分では扱えない解へ進むため、distribution・弱微分・Sobolev 空間・弱形式を導入します。
