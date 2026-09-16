# FOU1 Fourier級数・直交性・係数計算

Fourier 級数の入口では、いきなり無限級数の収束を論じる必要はありません。最初に身につけるべき操作は、周期的な波形から **どの周波数がどれだけ含まれているかを積分で取り出すこと** です。

本章では $2\pi$ 周期の実数値関数を中心に、次の一本道を作ります。

1. 三角関数を一周期で掛け合わせて積分し、異なる周波数が消えることを証明する。
2. その性質から実 Fourier 係数を導出する。
3. 有限次数の Fourier 近似が平均二乗誤差を最小にすることを証明する。
4. 偶奇性と半区間展開を使って係数計算を短くする。
5. $f(x)=x$、矩形波、$|x|$、三角形波の係数を実際に計算する。
6. 完全性を仮定せず、Fourier 係数に対する有限次数のエネルギー評価まで導く。

前提は [RA4 Riemann/Darboux積分・FTC](../RA4/index.md) です。本章では区分的連続関数を扱うため、積分は Riemann 積分で足ります。Lebesgue 積分や Hilbert 空間の一般論を入口の必須前提にはしません。

> **この章の停止線**  
> Fourier 係数を計算できることと、その係数から作った無限級数が元の関数へ収束することは別問題です。本章は係数計算と有限次数近似までを閉じ、収束判定・Gibbs 現象・平均化・三角関数系の完全性・Parseval 等式・$L^2$ 収束は FOU2 に送ります。

---

## 1. 有限個の周波数を重ねる

$2\pi$ 周期とは

$$
f(x+2\pi)=f(x)
$$

がすべての $x$ で成り立つことです。基本的な周期波形

$$
1,\quad \cos x,\quad \sin x,\quad \cos 2x,\quad \sin 2x,\ldots
$$

を有限個だけ重ねたものから始めます。

<a id="def-fou1-trigonometric-polynomial"></a>
<!-- formal-statement-start -->
> **定義（三角多項式）**  
> 非負整数 $N$ と実数 $A_0,A_1,\ldots,A_N,B_1,\ldots,B_N$ に対し、次の形の関数を $N$ 次以下の **三角多項式** という。

$$
T_N(x)
=\frac{A_0}{2}
+\sum_{n=1}^{N}\bigl(A_n\cos nx+B_n\sin nx\bigr).
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-fou1-trigonometric-polynomial -->
**定義の確認**：

$$
T(x)=2+3\cos x-\sin 2x+4\cos 3x
$$

は3次以下の三角多項式です。定義の記号では

$$
A_0=4,\qquad A_1=3,\qquad B_2=-1,\qquad A_3=4
$$

で、それ以外の係数は0です。各項が $2\pi$ 周期なので、その有限和も $2\pi$ 周期です。
<!-- definition-example-end -->

一般の周期関数 $f$ が与えられたとき、各周波数の係数をどう取り出すか。その鍵が次節です。

---

## 2. 一周期積分すると異なる周波数は消える

積和公式

$$
\cos mx\cos nx
=\frac12\{\cos((m-n)x)+\cos((m+n)x)\},
$$

$$
\sin mx\sin nx
=\frac12\{\cos((m-n)x)-\cos((m+n)x)\},
$$

$$
\sin mx\cos nx
=\frac12\{\sin((m+n)x)+\sin((m-n)x)\}
$$

を使います。非零整数 $k$ なら

$$
\int_{-\pi}^{\pi}\cos kx\,dx=0,
\qquad
\int_{-\pi}^{\pi}\sin kx\,dx=0
$$

です。

<a id="thm-fou1-trigonometric-orthogonality"></a>
<!-- formal-statement-start -->
> **定理（三角関数系の直交性）**  
> 正整数 $m,n$ に対して次が成り立つ。

$$
\int_{-\pi}^{\pi}\cos mx\cos nx\,dx
=
\begin{cases}
\pi,&m=n,\\
0,&m\ne n,
\end{cases}
$$

$$
\int_{-\pi}^{\pi}\sin mx\sin nx\,dx
=
\begin{cases}
\pi,&m=n,\\
0,&m\ne n,
\end{cases}
$$

$$
\int_{-\pi}^{\pi}\sin mx\cos nx\,dx=0.
$$

> さらに

$$
\int_{-\pi}^{\pi}\cos nx\,dx
=\int_{-\pi}^{\pi}\sin nx\,dx=0,
\qquad
\int_{-\pi}^{\pi}1\,dx=2\pi.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$m\ne n$ なら積和公式に現れる周波数 $m-n,m+n$ はどちらも0ではありません。そのため一周期積分で消えます。$m=n$ の場合だけ $\cos0x=1$ が残ります。

<!-- proof-start -->
### 証明

$m\ne n$ とすると

$$
\begin{aligned}
\int_{-\pi}^{\pi}\cos mx\cos nx\,dx
&=\frac12\int_{-\pi}^{\pi}\cos((m-n)x)\,dx\\
&\quad+\frac12\int_{-\pi}^{\pi}\cos((m+n)x)\,dx\\
&=0.
\end{aligned}
$$

$m=n$ なら

$$
\cos^2nx=\frac{1+\cos2nx}{2}
$$

より

$$
\int_{-\pi}^{\pi}\cos^2nx\,dx
=\frac12(2\pi)+0=\pi.
$$

同様に

$$
\sin^2nx=\frac{1-\cos2nx}{2}
$$

なので

$$
\int_{-\pi}^{\pi}\sin^2nx\,dx=\pi.
$$

$m\ne n$ の $\sin mx\sin nx$ も積和公式で二つの非零周波数の余弦に分かれるため積分は0です。また $\sin mx\cos nx$ は奇関数なので対称区間上の積分は0です。

最後に

$$
\int_{-\pi}^{\pi}\cos nx\,dx
=\left[\frac{\sin nx}{n}\right]_{-\pi}^{\pi}=0
$$

であり、$\sin nx$ は奇関数なので積分は0です。定数関数1の積分は区間長 $2\pi$ です。
<!-- proof-end -->

この定理の実用的な意味は、「狙った周波数を掛けて一周期積分すると、それ以外の周波数が消える」ということです。

---

## 3. Fourier係数を積分で取り出す

以下、$f$ は $[-\pi,\pi]$ 上で区分的連続な実数値関数とします。この仮定なら $f$ と $f^2$ は Riemann 可積分です。

<a id="def-fou1-real-fourier-coefficients"></a>
<!-- formal-statement-start -->
> **定義（実 Fourier 係数）**  
> $f$ に対して

$$
a_0:=\frac1\pi\int_{-\pi}^{\pi}f(x)\,dx,
$$

$$
a_n:=\frac1\pi\int_{-\pi}^{\pi}f(x)\cos nx\,dx,
\qquad n\ge1,
$$

$$
b_n:=\frac1\pi\int_{-\pi}^{\pi}f(x)\sin nx\,dx,
\qquad n\ge1
$$

> を $f$ の **実 Fourier 係数** という。
<!-- formal-statement-end -->

<a id="def-fou1-fourier-partial-sum"></a>
<!-- formal-statement-start -->
> **定義（Fourier 部分和）**  
> $f$ の実 Fourier 係数を $a_0,a_n,b_n$ とする。非負整数 $N$ に対し

$$
S_Nf(x)
:=\frac{a_0}{2}
+\sum_{n=1}^{N}(a_n\cos nx+b_n\sin nx)
$$

> を $N$ 次 **Fourier 部分和** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fou1-real-fourier-coefficients -->
**定義の確認**：

$$
f(x)=3+2\cos2x-4\sin3x
$$

とします。直前の定理を使うと

$$
a_0=6,\qquad a_2=2,\qquad b_3=-4
$$

で、それ以外の係数は0です。したがって $S_3f=f$ です。
<!-- definition-example-end -->

ここでは係数と有限和だけを定義しています。

$$
\frac{a_0}{2}+\sum_{n=1}^{\infty}(a_n\cos nx+b_n\sin nx)
$$

がどこで $f$ に一致するかは、まだ何も仮定していません。

<a id="thm-fou1-coefficient-extraction"></a>
<!-- formal-statement-start -->
> **定理（直交性による Fourier 係数の抽出）**  
> 三角多項式

$$
T_N(x)=\frac{A_0}{2}+\sum_{n=1}^{N}(A_n\cos nx+B_n\sin nx)
$$

> に対して、$1\le m\le N$ なら

$$
A_0=\frac1\pi\int_{-\pi}^{\pi}T_N(x)\,dx,
$$

$$
A_m=\frac1\pi\int_{-\pi}^{\pi}T_N(x)\cos mx\,dx,
$$

$$
B_m=\frac1\pi\int_{-\pi}^{\pi}T_N(x)\sin mx\,dx
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$\cos mx$ を掛ければ $A_m\cos^2mx$ 以外の項が消え、$\sin mx$ を掛ければ $B_m\sin^2mx$ 以外の項が消えます。

<!-- proof-start -->
### 証明

$T_N$ をそのまま積分すると定数項以外が消えるため

$$
\int_{-\pi}^{\pi}T_N(x)\,dx
=\frac{A_0}{2}(2\pi)=A_0\pi.
$$

次に $T_N\cos mx$ を積分すると、三角関数系の直交性から $A_m\cos^2mx$ だけが残ります。したがって

$$
\int_{-\pi}^{\pi}T_N(x)\cos mx\,dx
=A_m\pi.
$$

同様に

$$
\int_{-\pi}^{\pi}T_N(x)\sin mx\,dx
=B_m\pi.
$$

それぞれ $\pi$ で割れば主張を得ます。
<!-- proof-end -->

---

## 4. なぜ同じ係数を一般の関数にも使うのか

有限次数の近似誤差を

$$
E(T):=\int_{-\pi}^{\pi}|f(x)-T(x)|^2\,dx
$$

で測ります。ここで使うのは二乗積分の展開だけです。

<a id="thm-fou1-least-squares"></a>
<!-- formal-statement-start -->
> **定理（Fourier 部分和の有限次数最小二乗性）**  
> $S_Nf$ を $f$ の $N$ 次 Fourier 部分和とする。任意の $N$ 次以下の実三角多項式 $T_N$ に対して

$$
\int_{-\pi}^{\pi}|f-S_Nf|^2\,dx
\le
\int_{-\pi}^{\pi}|f-T_N|^2\,dx
$$

> が成り立つ。等号が成り立つのは $T_N=S_Nf$ のときに限る。
<!-- formal-statement-end -->

### 証明の見取り図

$S_Nf$ は $f$ と同じ低周波の係数を持つため、誤差 $f-S_Nf$ に $1,\cos mx,\sin mx$ を掛けて積分すると0になります。したがって別の三角多項式へ動かした量は交差項を作らず、平方誤差へ非負量を加えるだけです。

<!-- proof-start -->
### 証明

$R_N:=T_N-S_Nf$ と置きます。係数の定義と三角関数系の直交性から

$$
\int_{-\pi}^{\pi}(f-S_Nf)\,dx=0,
$$

$$
\int_{-\pi}^{\pi}(f-S_Nf)\cos mx\,dx=0,
\qquad
\int_{-\pi}^{\pi}(f-S_Nf)\sin mx\,dx=0
$$

が $1\le m\le N$ で成り立ちます。$R_N$ はこれらの関数の有限線形結合なので

$$
\int_{-\pi}^{\pi}(f-S_Nf)R_N\,dx=0.
$$

一方

$$
f-T_N=(f-S_Nf)-R_N
$$

ですから

$$
\begin{aligned}
\int_{-\pi}^{\pi}|f-T_N|^2\,dx
&=\int_{-\pi}^{\pi}|f-S_Nf|^2\,dx\\
&\quad-2\int_{-\pi}^{\pi}(f-S_Nf)R_N\,dx\\
&\quad+\int_{-\pi}^{\pi}|R_N|^2\,dx\\
&=\int_{-\pi}^{\pi}|f-S_Nf|^2\,dx
+\int_{-\pi}^{\pi}|R_N|^2\,dx.
\end{aligned}
$$

最後の項は非負なので不等式が従います。

等号なら $\int|R_N|^2=0$ です。$R_N$ は連続です。もしある点で $R_N\ne0$ なら、その近傍でも $|R_N|$ は正の下界を持つので二乗積分は正になります。したがって $R_N\equiv0$、すなわち $T_N=S_Nf$ です。
<!-- proof-end -->

ここで示したのは、固定した有限個の係数の中で最良の近似を選んだという主張です。無限級数の収束は使っていません。

---

## 5. 偶関数・奇関数なら計算は半分になる

<a id="thm-fou1-parity"></a>
<!-- formal-statement-start -->
> **定理（偶奇性と Fourier 係数）**  
> $f$ の Fourier 係数を $a_0,a_n,b_n$ とする。$f$ が偶関数なら $b_n=0$ であり、

$$
a_0=\frac{2}{\pi}\int_0^\pi f(x)\,dx,
\qquad
a_n=\frac{2}{\pi}\int_0^\pi f(x)\cos nx\,dx.
$$

> $f$ が奇関数なら $a_0=a_n=0$ であり、

$$
b_n=\frac{2}{\pi}\int_0^\pi f(x)\sin nx\,dx.
$$
<!-- formal-statement-end -->

### 証明の見取り図

偶関数と奇関数の積は奇関数、偶関数どうしまたは奇関数どうしの積は偶関数です。対称区間上では奇関数の積分が0になり、偶関数の積分は半区間積分の2倍になります。

<!-- proof-start -->
### 証明

$f$ が偶関数なら $f(x)\sin nx$ は奇関数なので

$$
b_n=\frac1\pi\int_{-\pi}^{\pi}f(x)\sin nx\,dx=0.
$$

一方、$f$ と $f\cos nx$ は偶関数なので

$$
\int_{-\pi}^{\pi}f(x)\,dx=2\int_0^\pi f(x)\,dx,
$$

$$
\int_{-\pi}^{\pi}f(x)\cos nx\,dx
=2\int_0^\pi f(x)\cos nx\,dx.
$$

これで偶関数の場合の式を得ます。

$f$ が奇関数なら $f$ と $f\cos nx$ は奇関数なので $a_0=a_n=0$ です。$f\sin nx$ は偶関数なので

$$
\int_{-\pi}^{\pi}f(x)\sin nx\,dx
=2\int_0^\pi f(x)\sin nx\,dx.
$$

これで奇関数の場合も従います。
<!-- proof-end -->

### 例1：$f(x)=x$

$x$ は奇関数なので $a_0=a_n=0$ です。部分積分すると

$$
\begin{aligned}
b_n
&=\frac{2}{\pi}\int_0^\pi x\sin nx\,dx\\
&=\frac{2}{\pi}
\left[-\frac{x\cos nx}{n}+\frac{\sin nx}{n^2}\right]_0^\pi\\
&=\frac{2(-1)^{n+1}}{n}.
\end{aligned}
$$

係数から作る無限級数の候補は

$$
2\sum_{n=1}^{\infty}\frac{(-1)^{n+1}}{n}\sin nx
$$

ですが、ここではまだ $f(x)$ との等号を主張しません。

### 例2：矩形波

$-\pi<x<\pi$ で

$$
q(x)=
\begin{cases}
-1,&-\pi<x<0,\\
1,&0<x<\pi
\end{cases}
$$

とし、$2\pi$ 周期に延長します。$q$ は奇関数なので余弦係数は0です。

$$
\begin{aligned}
b_n
&=\frac{2}{\pi}\int_0^\pi\sin nx\,dx\\
&=\frac{2}{\pi n}\{1-(-1)^n\}\\
&=
\begin{cases}
\dfrac{4}{\pi n},&n\text{ が奇数},\\
0,&n\text{ が偶数}.
\end{cases}
\end{aligned}
$$

したがって奇数次の周波数だけが残ります。

### 例3：$f(x)=|x|$

$|x|$ は偶関数なので $b_n=0$ です。

$$
a_0=\frac{2}{\pi}\int_0^\pi x\,dx=\pi.
$$

また

$$
\begin{aligned}
a_n
&=\frac{2}{\pi}\int_0^\pi x\cos nx\,dx\\
&=\frac{2}{\pi}
\left[
\frac{x\sin nx}{n}+\frac{\cos nx}{n^2}
\right]_0^\pi\\
&=\frac{2}{\pi}\frac{(-1)^n-1}{n^2}.
\end{aligned}
$$

よって偶数 $n$ では $a_n=0$、奇数 $n$ では

$$
a_n=-\frac{4}{\pi n^2}
$$

です。矩形波では $1/n$、$|x|$ では $1/n^2$ が現れました。波形の滑らかさと係数減衰の一般論は、後続で条件を付けて扱います。

---

## 6. 複素Fourier係数

Euler の公式

$$
e^{inx}=\cos nx+i\sin nx
$$

を使うと、正弦係数と余弦係数を整数添字一つにまとめられます。本章ではこの恒等式だけを使い、複素解析の定理は使いません。

<a id="def-fou1-complex-fourier-coefficient"></a>
<!-- formal-statement-start -->
> **定義（複素 Fourier 係数）**  
> 整数 $n$ に対し

$$
c_n(f):=\frac1{2\pi}\int_{-\pi}^{\pi}f(x)e^{-inx}\,dx
$$

> を $n$ 番目の **複素 Fourier 係数** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fou1-complex-fourier-coefficient -->
**定義の確認**：$n\ge1$ なら

$$
\begin{aligned}
c_n
&=\frac1{2\pi}\int_{-\pi}^{\pi}f(x)(\cos nx-i\sin nx)\,dx\\
&=\frac{a_n-ib_n}{2}.
\end{aligned}
$$

同様に

$$
c_{-n}=\frac{a_n+ib_n}{2},
\qquad
c_0=\frac{a_0}{2}.
$$

実数値 $f$ では $c_{-n}=\overline{c_n}$ です。
<!-- definition-example-end -->

したがって有限和は

$$
S_Nf(x)=\sum_{n=-N}^{N}c_ne^{inx}
$$

とも書けます。

---

## 7. 半区間正弦・余弦係数

関数が $[0,L]$ 上でだけ与えられていても、$[-L,L]$ へ偶対称に延ばすか、奇対称に延ばすかで二種類の係数列を作れます。

<a id="def-fou1-half-range"></a>
<!-- formal-statement-start -->
> **定義（半区間正弦・余弦係数）**  
> $L>0$ とし、$g$ を $[0,L]$ 上の区分的連続な実数値関数とする。偶延長に対応する係数を

$$
A_0=\frac{2}{L}\int_0^L g(x)\,dx,
$$

$$
A_n=\frac{2}{L}\int_0^L g(x)\cos\frac{n\pi x}{L}\,dx
$$

> とし、奇延長に対応する係数を

$$
B_n=\frac{2}{L}\int_0^L g(x)\sin\frac{n\pi x}{L}\,dx
$$

> とする。$A_0,A_n$ を半区間余弦係数、$B_n$ を半区間正弦係数という。
<!-- formal-statement-end -->

同じ $g$ から二種類の係数が得られるのは、区間外に作る周期波形が違うからです。端点で関数値を0にそろえたい場合には正弦系、端点で導関数を0にそろえたい場合には余弦系が自然に現れることの入口にもなります。

<!-- definition-example-start: def-fou1-half-range -->
**定義の確認**：$g(x)=x$ on $[0,\pi]$

偶延長は $|x|$ なので

$$
A_0=\pi,
\qquad
A_n=\frac{2}{\pi}\frac{(-1)^n-1}{n^2}.
$$

奇延長は $x$ なので

$$
B_n=\frac{2(-1)^{n+1}}{n}.
$$

同じ $g(x)=x$ でも、偶延長なら余弦だけ、奇延長なら正弦だけになります。
<!-- definition-example-end -->

---

## 8. Fourier係数に対するBessel不等式

有限次数最小二乗性から、完全性を使わずに係数の二乗和を評価できます。

<a id="thm-fou1-bessel"></a>
<!-- formal-statement-start -->
> **定理（Fourier 係数に対する Bessel 不等式）**  
> $f$ の Fourier 係数を $a_0,a_n,b_n$ とする。任意の非負整数 $N$ に対して

$$
\boxed{
\frac{a_0^2}{2}
+\sum_{n=1}^{N}(a_n^2+b_n^2)
\le
\frac1\pi\int_{-\pi}^{\pi}|f(x)|^2\,dx
}
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$f-S_Nf$ と $S_Nf$ の積分交差項は0です。そのため元の二乗積分は、有限 Fourier 近似が持つ二乗積分と残差の二乗積分に分かれます。

<!-- proof-start -->
### 証明

前節の最小二乗性の証明から

$$
\int_{-\pi}^{\pi}(f-S_Nf)S_Nf\,dx=0.
$$

したがって

$$
\int_{-\pi}^{\pi}|f|^2\,dx
=
\int_{-\pi}^{\pi}|S_Nf|^2\,dx
+
\int_{-\pi}^{\pi}|f-S_Nf|^2\,dx
\ge
\int_{-\pi}^{\pi}|S_Nf|^2\,dx.
$$

一方、三角関数系の直交性により交差項が消えるので

$$
\begin{aligned}
\frac1\pi\int_{-\pi}^{\pi}|S_Nf|^2\,dx
&=\frac{a_0^2}{4}\frac{2\pi}{\pi}
+\sum_{n=1}^{N}
\left(
 a_n^2\frac{\pi}{\pi}
+b_n^2\frac{\pi}{\pi}
\right)\\
&=\frac{a_0^2}{2}+\sum_{n=1}^{N}(a_n^2+b_n^2).
\end{aligned}
$$

二つを合わせれば主張を得ます。
<!-- proof-end -->

この不等式は有限 $N$ についての「$\le$」です。無限和で等号を得るには、三角関数系で見えない成分が残らないことを別途示す必要があります。それが FOU2 で Parseval 等式へ進むときの核心です。

### 例：$f(x)=x$ から有限和を評価する

すでに

$$
b_n=\frac{2(-1)^{n+1}}n,
\qquad a_0=a_n=0
$$

を得ています。また

$$
\frac1\pi\int_{-\pi}^{\pi}x^2\,dx
=\frac{2\pi^2}{3}.
$$

したがって Fourier 係数に対する Bessel 不等式から

$$
4\sum_{n=1}^{N}\frac1{n^2}
\le\frac{2\pi^2}{3},
$$

すなわち

$$
\sum_{n=1}^{N}\frac1{n^2}\le\frac{\pi^2}{6}
$$

を得ます。ここでは無限和との等号は使っていません。

---

## 9. 係数計算の手順

Fourier 係数を手計算するときは、次の順に確認します。

1. 周期と積分区間を固定する。
2. 偶奇性を見て、最初から0になる係数を消す。
3. 区分的な波形なら区分点で積分を分ける。
4. 多項式が掛かるなら部分積分を必要回数だけ行う。
5. 得られた係数を有限 Fourier 近似へ戻し、周波数の残り方を確認する。
6. 無限級数との等号は、収束定理を得るまで保留する。

---

## 10. 演習

### Level A

#### A1. 三角関数系の直交性を積和公式から確認する

正整数 $m,n$ に対し、次を示してください。

1. $m\ne n$ なら $\int_{-\pi}^{\pi}\cos mx\cos nx\,dx=0$。
2. $m=n$ なら $\int_{-\pi}^{\pi}\cos^2nx\,dx=\pi$。
3. 任意の $m,n$ で $\int_{-\pi}^{\pi}\sin mx\cos nx\,dx=0$。

- Level: A

<!-- solution-start -->
**詳細解答**

1. 積和公式から

$$
\cos mx\cos nx
=\frac12\cos((m-n)x)+\frac12\cos((m+n)x).
$$

$m\ne n$ なら $m-n\ne0$、また $m+n\ne0$ です。非零整数 $k$ について

$$
\int_{-\pi}^{\pi}\cos kx\,dx
=\left[\frac{\sin kx}{k}\right]_{-\pi}^{\pi}=0
$$

なので、二項とも積分が0です。

2. 恒等式

$$
\cos^2nx=\frac{1+\cos2nx}{2}
$$

を積分して

$$
\int_{-\pi}^{\pi}\cos^2nx\,dx
=\frac12(2\pi)+0=\pi.
$$

3. $\sin mx$ は奇関数、$\cos nx$ は偶関数なので積は奇関数です。したがって対称区間上の積分は0です。
<!-- solution-end -->

#### A2. 有限三角多項式の係数を回収する

$$
f(x)=3+2\cos2x-4\sin3x
$$

について、定義積分から $a_0,a_n,b_n$ を求め、$S_3f=f$ を確認してください。

- Level: A

<!-- solution-start -->
**詳細解答**

定数係数は

$$
a_0=\frac1\pi\int_{-\pi}^{\pi}f(x)\,dx.
$$

余弦項・正弦項は一周期積分で0なので

$$
a_0=\frac1\pi\cdot3\cdot2\pi=6.
$$

次に

$$
\begin{aligned}
a_2
&=\frac1\pi\int_{-\pi}^{\pi}f(x)\cos2x\,dx\\
&=\frac1\pi\int_{-\pi}^{\pi}2\cos^22x\,dx\\
&=2.
\end{aligned}
$$

他の余弦係数は0です。同様に

$$
\begin{aligned}
b_3
&=\frac1\pi\int_{-\pi}^{\pi}f(x)\sin3x\,dx\\
&=\frac1\pi\int_{-\pi}^{\pi}(-4)\sin^23x\,dx\\
&=-4,
\end{aligned}
$$

で、他の正弦係数は0です。したがって

$$
S_3f(x)=\frac62+2\cos2x-4\sin3x=f(x).
$$
<!-- solution-end -->

#### A3. 偶奇性から消える係数を先に判定する

次の各関数について、0と分かる係数を答え、その後に残る最初の係数を一つ計算してください。

1. $f(x)=x$。
2. $g(x)=|x|$。

- Level: A

<!-- solution-start -->
**詳細解答**

1. $x$ は奇関数なので

$$
a_0=0,\qquad a_n=0\quad(n\ge1).
$$

残る最初の正弦係数は

$$
\begin{aligned}
b_1
&=\frac{2}{\pi}\int_0^\pi x\sin x\,dx\\
&=\frac{2}{\pi}[-x\cos x+\sin x]_0^\pi\\
&=2.
\end{aligned}
$$

2. $|x|$ は偶関数なので

$$
b_n=0\quad(n\ge1).
$$

定数係数は

$$
a_0=\frac{2}{\pi}\int_0^\pi x\,dx=\pi.
$$

偶奇性だけで消えるのは正弦係数で、余弦係数は積分して判定します。
<!-- solution-end -->

#### A4. Fourier係数に対するBessel不等式を使う

$f(x)=x$ の係数

$$
b_n=\frac{2(-1)^{n+1}}n,
\qquad a_0=a_n=0
$$

を用い、任意の $N$ について

$$
\sum_{n=1}^{N}\frac1{n^2}\le\frac{\pi^2}{6}
$$

を導いてください。Parseval 等式は使わないでください。

- Level: A

<!-- solution-start -->
**詳細解答**

Fourier 係数に対する Bessel 不等式から

$$
\sum_{n=1}^{N}b_n^2
\le\frac1\pi\int_{-\pi}^{\pi}x^2\,dx.
$$

左辺は

$$
\sum_{n=1}^{N}b_n^2
=4\sum_{n=1}^{N}\frac1{n^2}.
$$

右辺は

$$
\frac1\pi\int_{-\pi}^{\pi}x^2\,dx
=\frac{2}{\pi}\int_0^\pi x^2\,dx
=\frac{2\pi^2}{3}.
$$

したがって

$$
4\sum_{n=1}^{N}\frac1{n^2}
\le\frac{2\pi^2}{3}.
$$

両辺を4で割れば

$$
\boxed{\sum_{n=1}^{N}\frac1{n^2}\le\frac{\pi^2}{6}}
$$

です。有限和の上界だけを使っており、無限和の値は仮定していません。
<!-- solution-end -->

### Level B

#### B1. $x^2$ のFourier係数

$f(x)=x^2$ を $[-\pi,\pi]$ 上で考えます。

1. 偶奇性から消える係数を答えてください。
2. $a_0$ を求めてください。
3. 部分積分を省略せず、$n\ge1$ に対して

$$
a_n=\frac{4(-1)^n}{n^2}
$$

を導いてください。

- Level: B

<!-- solution-start -->
**詳細解答**

$x^2$ は偶関数なので

$$
b_n=0\quad(n\ge1).
$$

また

$$
\begin{aligned}
a_0
&=\frac{2}{\pi}\int_0^\pi x^2\,dx\\
&=\frac{2\pi^2}{3}.
\end{aligned}
$$

$n\ge1$ では

$$
a_n=\frac{2}{\pi}\int_0^\pi x^2\cos nx\,dx.
$$

$u=x^2$, $dv=\cos nx\,dx$ として部分積分すると

$$
\int_0^\pi x^2\cos nx\,dx
=\left[\frac{x^2\sin nx}{n}\right]_0^\pi
-\frac{2}{n}\int_0^\pi x\sin nx\,dx.
$$

最初の境界項は0です。残る積分に $u=x$, $dv=\sin nx\,dx$ を使うと

$$
\begin{aligned}
\int_0^\pi x\sin nx\,dx
&=\left[-\frac{x\cos nx}{n}\right]_0^\pi
+\frac1n\int_0^\pi\cos nx\,dx\\
&=-\frac{\pi(-1)^n}{n}.
\end{aligned}
$$

したがって

$$
\int_0^\pi x^2\cos nx\,dx
=\frac{2\pi(-1)^n}{n^2}
$$

であり、

$$
\boxed{a_n=\frac{4(-1)^n}{n^2}}
$$

を得ます。
<!-- solution-end -->

#### B2. 同じ関数から二つの半区間係数を作る

$g(x)=x$ を $0\le x\le\pi$ で考えます。

1. 偶延長に対応する $A_0,A_n$ を求めてください。
2. 奇延長に対応する $B_n$ を求めてください。
3. 二つの係数列が異なる理由を説明してください。

- Level: B

<!-- solution-start -->
**詳細解答**

$L=\pi$ なので

$$
A_0=\frac{2}{\pi}\int_0^\pi x\,dx=\pi.
$$

また

$$
\begin{aligned}
A_n
&=\frac{2}{\pi}\int_0^\pi x\cos nx\,dx\\
&=\frac{2}{\pi}
\left[
\frac{x\sin nx}{n}+\frac{\cos nx}{n^2}
\right]_0^\pi\\
&=\frac{2}{\pi}\frac{(-1)^n-1}{n^2}.
\end{aligned}
$$

したがって偶数 $n$ では0、奇数 $n$ では $-4/(\pi n^2)$ です。

一方

$$
\begin{aligned}
B_n
&=\frac{2}{\pi}\int_0^\pi x\sin nx\,dx\\
&=\frac{2}{\pi}
\left[-\frac{x\cos nx}{n}+\frac{\sin nx}{n^2}\right]_0^\pi\\
&=\frac{2(-1)^{n+1}}n.
\end{aligned}
$$

偶延長すると $[-\pi,\pi]$ 上では $|x|$、奇延長すると $x$ になります。区間外へ作った周期波形が違うため、同じ $[0,\pi]$ 上の関数から異なる係数列が得られます。
<!-- solution-end -->

#### B3. 矩形波の最初の三つの非零周波数

矩形波

$$
q(x)=
\begin{cases}
-1,&-\pi<x<0,\\
1,&0<x<\pi
\end{cases}
$$

を $2\pi$ 周期に延長します。

1. 余弦係数がすべて0であることを説明してください。
2. $b_n$ を求め、偶数次が消えることを示してください。
3. $n=1,3,5$ を使う $S_5q$ を書き、$x=\pi/2$ での値を求めてください。

- Level: B

<!-- solution-start -->
**詳細解答**

$q$ は奇関数なので

$$
a_0=0,\qquad a_n=0.
$$

正弦係数は

$$
\begin{aligned}
b_n
&=\frac{2}{\pi}\int_0^\pi\sin nx\,dx\\
&=\frac{2}{\pi n}\{1-(-1)^n\}.
\end{aligned}
$$

よって

$$
b_n=
\begin{cases}
4/(\pi n),&n\text{ が奇数},\\
0,&n\text{ が偶数}.
\end{cases}
$$

したがって

$$
S_5q(x)
=\frac4\pi\left(\sin x+\frac13\sin3x+\frac15\sin5x\right).
$$

$x=\pi/2$ では

$$
\sin\frac\pi2=1,\qquad
\sin\frac{3\pi}{2}=-1,\qquad
\sin\frac{5\pi}{2}=1.
$$

よって

$$
S_5q\left(\frac\pi2\right)
=\frac4\pi\left(1-\frac13+\frac15\right)
=\boxed{\frac{52}{15\pi}}.
$$
<!-- solution-end -->

### Level C

#### C1. 三角形波を周波数成分へ分解する

$[-\pi,\pi]$ で

$$
t(x)=\pi-|x|
$$

とし、$2\pi$ 周期に延長します。

1. 偶奇性から消える係数を答えてください。
2. $a_0$ と $a_n$ を計算し、偶数 $n$ では $a_n=0$、奇数 $n$ では

$$
a_n=\frac{4}{\pi n^2}
$$

となることを示してください。
3. 最初の三つの非零周波数を含む $S_5t$ を書いてください。
4. $S_5t(0)$ と $S_5t(\pi)$ を求め、元の $t(0)=\pi$, $t(\pi)=0$ と比較してください。
5. 矩形波では係数に $1/n$、三角形波では $1/n^2$ が現れる違いを、波形の形と結び付けて説明してください。

- Level: C

<!-- solution-start -->
**詳細解答**

$t(x)=\pi-|x|$ は偶関数なので

$$
b_n=0\quad(n\ge1).
$$

定数係数は

$$
\begin{aligned}
a_0
&=\frac{2}{\pi}\int_0^\pi(\pi-x)\,dx\\
&=\frac{2}{\pi}
\left[\pi x-\frac{x^2}{2}\right]_0^\pi\\
&=\pi.
\end{aligned}
$$

$n\ge1$ について

$$
a_n=\frac{2}{\pi}\int_0^\pi(\pi-x)\cos nx\,dx.
$$

定数部分は

$$
\pi\int_0^\pi\cos nx\,dx=0
$$

なので

$$
\begin{aligned}
a_n
&=-\frac{2}{\pi}\int_0^\pi x\cos nx\,dx\\
&=-\frac{2}{\pi}
\left[
\frac{x\sin nx}{n}+\frac{\cos nx}{n^2}
\right]_0^\pi\\
&=\frac{2}{\pi}\frac{1-(-1)^n}{n^2}.
\end{aligned}
$$

したがって

$$
a_n=
\begin{cases}
4/(\pi n^2),&n\text{ が奇数},\\
0,&n\text{ が偶数}.
\end{cases}
$$

よって

$$
S_5t(x)
=\frac\pi2
+\frac4\pi\left(
\cos x+\frac1{9}\cos3x+\frac1{25}\cos5x
\right).
$$

$x=0$ ではすべての余弦が1なので

$$
S_5t(0)
=\frac\pi2+\frac4\pi\left(1+\frac19+\frac1{25}\right)
=\frac\pi2+\frac{1036}{225\pi}.
$$

$x=\pi$ では奇数倍の余弦がすべて $-1$ なので

$$
S_5t(\pi)
=\frac\pi2-\frac{1036}{225\pi}.
$$

前者は $t(0)=\pi$、後者は $t(\pi)=0$ に近い有限近似値です。

矩形波には跳びがあり、今回の計算では係数に $1/n$ が現れました。三角形波は折れ曲がりを持つものの関数自体は連続で、係数には $1/n^2$ が現れました。少なくともこの二例では、より滑らかな波形ほど高い周波数の係数が速く小さくなる様子が見えます。一般化するには追加条件が必要なので、本問では二例の比較までに留めます。
<!-- solution-end -->

---

## 11. まとめ

本章で閉じたのは Fourier 級数の **係数計算側** です。

- 三角関数系の直交性を一周期積分から証明した。
- その性質から実 Fourier 係数を抽出した。
- Fourier 部分和が固定次数で平均二乗誤差を最小にすることを証明した。
- 偶奇性により不要な係数を先に消せることを示した。
- 複素 Fourier 係数で正弦・余弦の二系列を整数添字一つへまとめた。
- 偶延長・奇延長から半区間余弦係数・正弦係数を作った。
- Fourier 係数に対する Bessel 不等式を、完全性を使わず有限和の計算だけで証明した。
- $x$、矩形波、$|x|$、$x^2$、三角形波について係数を手計算した。

次の FOU2 では、「計算した無限級数が元の関数へどの意味で収束するのか」を扱います。そこでは収束の種類を区別し、Gibbs 現象、平均化、三角関数系の完全性、Parseval 等式へ進みます。
