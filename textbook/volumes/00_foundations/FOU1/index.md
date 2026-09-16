# FOU1 Fourier級数・係数計算

Fourier 解析の入口で最初に行うのは、無限和の極限判定ではありません。周期的な波形から、**どの周波数がどれだけ含まれているかを一周期積分で取り出すこと**です。

本章では $2\pi$ 周期の実数値の波形を中心に、次の順で進みます。

1. $1,\cos nx,\sin nx$ を掛け合わせて一周期積分し、異なる周波数が消えることを直接計算する。
2. その消去則から周波数ごとの係数公式を導く。
3. 係数から作る有限和が、固定次数の候補の中で平均二乗誤差を最小にすることを証明する。
4. 左右の対称性を使って不要な係数を消す。
5. 半区間だけで与えられたデータから二種類の係数列を作る。
6. $x$、矩形波、$|x|$、$x^2$、三角形波の係数を手計算する。
7. 無限段階の理論を使わず、有限個の係数に対するエネルギー上界を証明する。

前提は [RA4 Riemann/Darboux積分・FTC](../RA4/index.md) です。本章の計算は区分ごとの Riemann 積分と有限和だけで閉じます。Lebesgue 積分や Hilbert 空間の一般論は前提にしません。

> **この章の停止線**  
> 係数を計算できることと、次数を無限に増やした極限を確定することは別問題です。本章では有限次数の係数計算と近似までを閉じます。極限の意味、跳びを含む波形での極限、平均化、無限個の係数を使う等式は FOU2 で扱います。

---

## 1. 有限個の周波数を重ねる

$2\pi$ 周期とは

$$
f(x+2\pi)=f(x)
$$

がすべての $x$ で成り立つことです。まずは

$$
1,\quad \cos x,\quad \sin x,\quad \cos2x,\quad \sin2x,\ldots
$$

を有限個だけ重ねます。

<a id="def-fou1-trigonometric-polynomial"></a>
<!-- formal-statement-start -->
> **定義（三角多項式）**  
> 非負整数 $N$ と実数 $A_0,A_1,\ldots,A_N,B_1,\ldots,B_N$ に対し

$$
T_N(x)=\frac{A_0}{2}+\sum_{n=1}^{N}\bigl(A_n\cos nx+B_n\sin nx\bigr)
$$

> と書けるものを $N$ 次以下の **三角多項式** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fou1-trigonometric-polynomial -->
**定義の確認**：

$$
T(x)=2+3\cos x-\sin2x+4\cos3x
$$

は3次以下です。定義の記号では

$$
A_0=4,\qquad A_1=3,\qquad B_2=-1,\qquad A_3=4
$$

で、それ以外の係数は0です。各項が $2\pi$ 周期なので、その有限和も $2\pi$ 周期です。
<!-- definition-example-end -->

係数を取り出すには、狙った周波数だけを残す積分公式が必要です。

---

## 2. 一周期積分で異なる周波数を消す

積和公式

$$
\cos mx\cos nx=\frac12\{\cos((m-n)x)+\cos((m+n)x)\},
$$

$$
\sin mx\sin nx=\frac12\{\cos((m-n)x)-\cos((m+n)x)\},
$$

$$
\sin mx\cos nx=\frac12\{\sin((m+n)x)+\sin((m-n)x)\}
$$

を使います。非零整数 $k$ なら

$$
\int_{-\pi}^{\pi}\cos kx\,dx=0,
\qquad
\int_{-\pi}^{\pi}\sin kx\,dx=0
$$

です。

<a id="thm-fou1-frequency-cancellation"></a>
<!-- formal-statement-start -->
> **定理（正弦・余弦の一周期積分消去則）**  
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

> さらに、正整数 $n$ に対して次が成り立つ。

$$
\int_{-\pi}^{\pi}\cos nx\,dx
=\int_{-\pi}^{\pi}\sin nx\,dx=0,
\qquad
\int_{-\pi}^{\pi}1\,dx=2\pi.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$m\ne n$ なら積和公式に現れる $m-n,m+n$ は非零です。したがって両方とも一周期積分で消えます。$m=n$ のときだけ定数項が残ります。

<!-- proof-start -->
### 証明

$m\ne n$ のとき

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
\int_{-\pi}^{\pi}\cos^2nx\,dx=\frac12(2\pi)+0=\pi.
$$

同様に

$$
\sin^2nx=\frac{1-\cos2nx}{2}
$$

から

$$
\int_{-\pi}^{\pi}\sin^2nx\,dx=\pi.
$$

$m\ne n$ の $\sin mx\sin nx$ も積和公式で二つの非零周波数へ分かれるので0です。また $\sin mx\cos nx$ は奇関数なので対称区間上の積分は0です。

最後に

$$
\int_{-\pi}^{\pi}\cos nx\,dx
=\left[\frac{\sin nx}{n}\right]_{-\pi}^{\pi}=0,
$$

$\sin nx$ の積分も対称性から0です。定数1の積分は区間長 $2\pi$ です。
<!-- proof-end -->

---

## 3. 周波数ごとの係数を定める

以下、$f$ は $[-\pi,\pi]$ の各小区間で連続であり、有限個の区分点だけを持つものとします。この仮定なら $f$ と $f^2$ の Riemann 積分が使えます。

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

> を **実 Fourier 係数** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fou1-real-fourier-coefficients -->
**定義の確認**：

$$
f(x)=3+2\cos2x-4\sin3x
$$

とします。[正弦・余弦の一周期積分消去則](#thm-fou1-frequency-cancellation)から

$$
a_0=6,\qquad a_2=2,\qquad b_3=-4
$$

で、それ以外は0です。積分が周波数ごとの振幅を回収しています。
<!-- definition-example-end -->

<a id="def-fou1-finite-sum"></a>
<!-- formal-statement-start -->
> **定義（N次 Fourier 有限和）**  
> 上で定めた係数を用い、非負整数 $N$ に対して

$$
S_Nf(x):=\frac{a_0}{2}+\sum_{n=1}^{N}(a_n\cos nx+b_n\sin nx)
$$

> を **N次 Fourier 有限和** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fou1-finite-sum -->
**定義の確認**：上の $f$ では

$$
S_1f(x)=3,
\qquad
S_2f(x)=3+2\cos2x,
$$

$$
S_3f(x)=3+2\cos2x-4\sin3x=f(x).
$$

次数を上げると、使う周波数が増えていきます。この確認には有限和しか使っていません。
<!-- definition-example-end -->

<a id="thm-fou1-coefficient-extraction"></a>
<!-- formal-statement-start -->
> **定理（一周期積分による Fourier 係数の抽出）**  
> 次の有限和を考える。

$$
T_N(x)=\frac{A_0}{2}+\sum_{n=1}^{N}(A_n\cos nx+B_n\sin nx).
$$

> $1\le m\le N$ なら

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

$\cos mx$ を掛けると $A_m\cos^2mx$ だけが残り、$\sin mx$ を掛けると $B_m\sin^2mx$ だけが残ります。

<!-- proof-start -->
### 証明

そのまま積分すると、[正弦・余弦の一周期積分消去則](#thm-fou1-frequency-cancellation)により定数項以外は消えるので

$$
\int_{-\pi}^{\pi}T_N(x)\,dx=A_0\pi.
$$

次に $T_N\cos mx$ を積分すると

$$
\int_{-\pi}^{\pi}T_N(x)\cos mx\,dx=A_m\pi.
$$

同様に

$$
\int_{-\pi}^{\pi}T_N(x)\sin mx\,dx=B_m\pi.
$$

それぞれ $\pi$ で割ればよいことが分かります。
<!-- proof-end -->

---

## 4. なぜこの係数で有限近似するのか

誤差を

$$
E(T):=\int_{-\pi}^{\pi}|f(x)-T(x)|^2\,dx
$$

で測ります。必要なのは平方の展開と一周期積分だけです。

<a id="thm-fou1-least-squares"></a>
<!-- formal-statement-start -->
> **定理（Fourier有限和の固定次数最小二乗性）**  
> $S_Nf$ を上で定めた有限和とする。$N$ 次以下の三角多項式 $T_N$ に対して

$$
\int_{-\pi}^{\pi}|f-S_Nf|^2\,dx
\le
\int_{-\pi}^{\pi}|f-T_N|^2\,dx
$$

> が成り立つ。等号が成り立つのは $T_N=S_Nf$ のときに限る。
<!-- formal-statement-end -->

### 証明の見取り図

$f-S_Nf$ は、$1,\cos mx,\sin mx$ のうち $m\le N$ のものを掛けて積分すると0になります。このため、別の候補へ動かした差との交差項が消えます。

<!-- proof-start -->
### 証明

$R_N:=T_N-S_Nf$ と置きます。係数の定義と[正弦・余弦の一周期積分消去則](#thm-fou1-frequency-cancellation)から

$$
\int_{-\pi}^{\pi}(f-S_Nf)\,dx=0,
$$

$$
\int_{-\pi}^{\pi}(f-S_Nf)\cos mx\,dx=0,
\qquad
\int_{-\pi}^{\pi}(f-S_Nf)\sin mx\,dx=0
$$

が $1\le m\le N$ で成り立ちます。$R_N$ はこれらの有限線形結合なので

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

最後の項は非負です。等号なら $\int|R_N|^2=0$ です。$R_N$ は連続なので、ある点で $R_N\ne0$ ならその近くでも $|R_N|^2$ は正となり、積分が正になるため矛盾します。よって $R_N\equiv0$ です。
<!-- proof-end -->

この証明は固定した有限次数だけで完結しています。

---

## 5. 左右の対称性で係数を消す

<a id="thm-fou1-parity"></a>
<!-- formal-statement-start -->
> **定理（偶奇対称性による Fourier 係数の消失則）**  
> $f(-x)=f(x)$ が成り立つ場合、$b_n=0$ であり

$$
a_0=\frac{2}{\pi}\int_0^\pi f(x)\,dx,
\qquad
a_n=\frac{2}{\pi}\int_0^\pi f(x)\cos nx\,dx.
$$

> $f(-x)=-f(x)$ が成り立つ場合、$a_0=a_n=0$ であり

$$
b_n=\frac{2}{\pi}\int_0^\pi f(x)\sin nx\,dx.
$$
<!-- formal-statement-end -->

### 証明の見取り図

左右で同じ値を取る場合、$f(x)\sin nx$ は左右で符号が反転します。左右で符号が反転する場合は、$f(x)$ と $f(x)\cos nx$ が左右で符号反転します。対称区間で対応する積分が打ち消し合います。

<!-- proof-start -->
### 証明

$f(-x)=f(x)$ とします。$\sin(-nx)=-\sin nx$ なので

$$
f(-x)\sin(-nx)=-f(x)\sin nx.
$$

よって

$$
b_n=\frac1\pi\int_{-\pi}^{\pi}f(x)\sin nx\,dx=0.
$$

また $f(x)$ と $f(x)\cos nx$ は左右で同じ値を取るので

$$
\int_{-\pi}^{\pi}f(x)\,dx=2\int_0^\pi f(x)\,dx,
$$

$$
\int_{-\pi}^{\pi}f(x)\cos nx\,dx=2\int_0^\pi f(x)\cos nx\,dx.
$$

次に $f(-x)=-f(x)$ とします。このとき $f(x)$ と $f(x)\cos nx$ は左右で符号反転するので $a_0=a_n=0$ です。一方 $f(x)\sin nx$ は左右で同じ値を取るので

$$
\int_{-\pi}^{\pi}f(x)\sin nx\,dx=2\int_0^\pi f(x)\sin nx\,dx.
$$

以上で主張を得ます。
<!-- proof-end -->

### 例1：$f(x)=x$

$f(-x)=-f(x)$ なので $a_0=a_n=0$ です。部分積分により

$$
\begin{aligned}
b_n
&=\frac{2}{\pi}\int_0^\pi x\sin nx\,dx\\
&=\frac{2}{\pi}
\left[-\frac{x\cos nx}{n}+\frac{\sin nx}{n^2}\right]_0^\pi\\
&=\frac{2(-1)^{n+1}}n.
\end{aligned}
$$

この係数列から無限和の候補を作れますが、それがどこで $f$ の値に一致するかは本章では主張しません。

### 例2：矩形波

$-\pi<x<\pi$ で

$$
q(x)=
\begin{cases}
-1,&-\pi<x<0,\\
1,&0<x<\pi
\end{cases}
$$

とし、$2\pi$ 周期に延長します。$q(-x)=-q(x)$ なので $a_0=a_n=0$ です。

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

したがって $1,3,5,\ldots$ 次だけが残ります。跳びの位置で次数を増やした極限がどうなるかは FOU2 へ送ります。

### 例3：$f(x)=|x|$

$f(-x)=f(x)$ なので $b_n=0$ です。

$$
a_0=\frac{2}{\pi}\int_0^\pi x\,dx=\pi.
$$

さらに

$$
\begin{aligned}
a_n
&=\frac{2}{\pi}\int_0^\pi x\cos nx\,dx\\
&=\frac{2}{\pi}
\left[\frac{x\sin nx}{n}+\frac{\cos nx}{n^2}\right]_0^\pi\\
&=\frac{2}{\pi}\frac{(-1)^n-1}{n^2}.
\end{aligned}
$$

よって偶数 $n$ では0、奇数 $n$ では

$$
a_n=-\frac{4}{\pi n^2}
$$

です。矩形波では $1/n$、ここでは $1/n^2$ が現れました。高い周波数の係数の減り方を一般化するには追加条件が必要なので、ここでは計算結果の比較に留めます。

---

## 6. 複素指数で一本化する

Euler の公式

$$
e^{inx}=\cos nx+i\sin nx
$$

を使うと、正弦側と余弦側の係数を整数添字一つにまとめられます。ここではこの恒等式だけを使います。

<a id="def-fou1-complex-exponential-coefficient"></a>
<!-- formal-statement-start -->
> **定義（複素指数係数）**  
> 整数 $n$ に対して

$$
c_n(f):=\frac1{2\pi}\int_{-\pi}^{\pi}f(x)e^{-inx}\,dx
$$

> を **複素指数係数** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fou1-complex-exponential-coefficient -->
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

$f$ が実数値なら $c_{-n}=\overline{c_n}$ です。また

$$
S_Nf(x)=\sum_{n=-N}^{N}c_ne^{inx}
$$

と書けます。
<!-- definition-example-end -->

これは新しい周波数を導入したのではなく、実表示の二系列を一つに整理しただけです。

---

## 7. 半区間から二種類の係数列を作る

$[0,L]$ 上の値しか与えられていないとき、$[-L,L]$ へ左右同符号で延ばす方法と、左右反対符号で延ばす方法があります。

<a id="def-fou1-half-range"></a>
<!-- formal-statement-start -->
> **定義（半区間正弦・余弦係数）**  
> $L>0$ とし、$g$ は $[0,L]$ で区分ごとに連続であるとする。次を定める。

$$
A_0=\frac{2}{L}\int_0^L g(x)\,dx,
$$

$$
A_n=\frac{2}{L}\int_0^L g(x)\cos\frac{n\pi x}{L}\,dx,
$$

$$
B_n=\frac{2}{L}\int_0^L g(x)\sin\frac{n\pi x}{L}\,dx.
$$

> $A_0,A_n$ を **半区間余弦係数**、$B_n$ を **半区間正弦係数** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fou1-half-range -->
**定義の確認**：$g(x)=x$、$0\le x\le\pi$ とする。

左右同符号で延ばすと $|x|$ になるため

$$
A_0=\pi,
\qquad
A_n=\frac{2}{\pi}\frac{(-1)^n-1}{n^2}.
$$

左右反対符号で延ばすと $x$ になるため

$$
B_n=\frac{2(-1)^{n+1}}n.
$$

元の半区間上の値は同じでも、延長後の周期波形が違うので係数列も異なります。
<!-- definition-example-end -->

端点では

$$
\sin\frac{n\pi\cdot0}{L}=\sin(n\pi)=0,
$$

また

$$
\frac{d}{dx}\cos\frac{n\pi x}{L}
=-\frac{n\pi}{L}\sin\frac{n\pi x}{L}
$$

も $x=0,L$ で0です。この違いは後の微分方程式でも役立ちますが、本章では対称延長と係数計算だけを確定します。

---

## 8. 有限個の係数のエネルギー上限

固定次数の最小二乗性から、有限段階だけで重要な評価が得られます。

<a id="thm-fou1-finite-energy-bound"></a>
<!-- formal-statement-start -->
> **定理（Fourier係数の有限エネルギー不等式）**  
> 非負整数 $N$ に対して

$$
\boxed{
\frac{a_0^2}{2}+\sum_{n=1}^{N}(a_n^2+b_n^2)
\le
\frac1\pi\int_{-\pi}^{\pi}|f(x)|^2\,dx
}
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

[Fourier有限和の固定次数最小二乗性](#thm-fou1-least-squares)の証明で得た交差項0を使い、$|f|^2$ を有限近似の二乗と残差の二乗へ分けます。

<!-- proof-start -->
### 証明

[Fourier有限和の固定次数最小二乗性](#thm-fou1-least-squares)の証明から

$$
\int_{-\pi}^{\pi}(f-S_Nf)S_Nf\,dx=0.
$$

よって

$$
\int_{-\pi}^{\pi}|f|^2\,dx
=
\int_{-\pi}^{\pi}|S_Nf|^2\,dx
+
\int_{-\pi}^{\pi}|f-S_Nf|^2\,dx
\ge
\int_{-\pi}^{\pi}|S_Nf|^2\,dx.
$$

さらに[正弦・余弦の一周期積分消去則](#thm-fou1-frequency-cancellation)を使うと、$|S_Nf|^2$ を展開した交差項は消えます。したがって

$$
\begin{aligned}
\frac1\pi\int_{-\pi}^{\pi}|S_Nf|^2\,dx
&=\frac{a_0^2}{4}\frac{2\pi}{\pi}
+\sum_{n=1}^{N}\left(a_n^2\frac{\pi}{\pi}+b_n^2\frac{\pi}{\pi}\right)\\
&=\frac{a_0^2}{2}+\sum_{n=1}^{N}(a_n^2+b_n^2).
\end{aligned}
$$

二つの式を合わせれば主張を得ます。
<!-- proof-end -->

この評価は有限 $N$ に対する不等式です。無限個の係数を使った等式へ進むには、残差が極限で消えることを別途示す必要があります。それは FOU2 の課題です。

### 例：$f(x)=x$

すでに

$$
b_n=\frac{2(-1)^{n+1}}n,
\qquad a_0=a_n=0
$$

を得ています。また

$$
\frac1\pi\int_{-\pi}^{\pi}x^2\,dx=\frac{2\pi^2}{3}.
$$

したがって[Fourier係数の有限エネルギー不等式](#thm-fou1-finite-energy-bound)から

$$
4\sum_{n=1}^{N}\frac1{n^2}\le\frac{2\pi^2}{3},
$$

すなわち

$$
\sum_{n=1}^{N}\frac1{n^2}\le\frac{\pi^2}{6}
$$

を得ます。ここでは無限和との等号を使っていません。

---

## 9. 係数計算の作戦表

実際の計算では次の順に進めます。

1. **周期と積分区間を固定する。** $2\pi$ 周期か $2L$ 周期かを最初に確定する。
2. **左右の対称性を見る。** 対称性だけで0になる係数を先に消す。
3. **区分点で積分を分ける。** 矩形波のような波形は定義区間ごとに積分する。
4. **部分積分の回数を見積もる。** $x$ なら1回、$x^2$ なら2回が基本になる。
5. **有限和へ戻して確認する。** どの周波数が残ったかを見る。
6. **極限との等号は保留する。** 係数が求まったことと次数を増やす議論を分ける。

---

## 10. 演習

### Level A

#### A1. 一周期積分で周波数を消す

正整数 $m,n$ に対し、積和公式から次を示してください。

1. $m\ne n$ なら $\int_{-\pi}^{\pi}\cos mx\cos nx\,dx=0$。
2. $m=n$ なら $\int_{-\pi}^{\pi}\cos^2nx\,dx=\pi$。
3. $\int_{-\pi}^{\pi}\sin mx\cos nx\,dx=0$。

- Level: A

<!-- solution-start -->
**詳細解答**

1. 積和公式より

$$
\cos mx\cos nx
=\frac12\cos((m-n)x)+\frac12\cos((m+n)x).
$$

$m\ne n$ なら $m-n$ と $m+n$ はともに非零です。非零整数 $k$ に対して

$$
\int_{-\pi}^{\pi}\cos kx\,dx
=\left[\frac{\sin kx}{k}\right]_{-\pi}^{\pi}=0
$$

なので二項とも消えます。

2. 

$$
\cos^2nx=\frac{1+\cos2nx}{2}
$$

を積分すると

$$
\int_{-\pi}^{\pi}\cos^2nx\,dx=\pi.
$$

3. $\sin mx\cos nx$ は左右で符号が反転するため、対称区間上の積分は0です。
<!-- solution-end -->

#### A2. 有限和から係数を回収する

$$
f(x)=3+2\cos2x-4\sin3x
$$

について定義積分から $a_0,a_n,b_n$ を求め、$S_3f=f$ を確認してください。

- Level: A

<!-- solution-start -->
**詳細解答**

まず

$$
a_0=\frac1\pi\int_{-\pi}^{\pi}f(x)\,dx=6
$$

です。次に消去則から

$$
\begin{aligned}
a_2
&=\frac1\pi\int_{-\pi}^{\pi}f(x)\cos2x\,dx\\
&=\frac1\pi\int_{-\pi}^{\pi}2\cos^22x\,dx=2.
\end{aligned}
$$

他の余弦側の係数は0です。同様に

$$
\begin{aligned}
b_3
&=\frac1\pi\int_{-\pi}^{\pi}f(x)\sin3x\,dx\\
&=\frac1\pi\int_{-\pi}^{\pi}(-4)\sin^23x\,dx=-4,
\end{aligned}
$$

他の正弦側は0です。したがって

$$
S_3f(x)=3+2\cos2x-4\sin3x=f(x).
$$
<!-- solution-end -->

#### A3. 左右の対称性を使う

1. $f(x)=x$ について0になる係数を判定し、$b_1$ を求めてください。
2. $g(x)=|x|$ について0になる係数を判定し、$a_0$ を求めてください。

- Level: A

<!-- solution-start -->
**詳細解答**

1. $f(-x)=-f(x)$ なので $a_0=a_n=0$ です。

$$
\begin{aligned}
b_1
&=\frac{2}{\pi}\int_0^\pi x\sin x\,dx\\
&=\frac{2}{\pi}[-x\cos x+\sin x]_0^\pi=2.
\end{aligned}
$$

2. $g(-x)=g(x)$ なので $b_n=0$ です。また

$$
a_0=\frac{2}{\pi}\int_0^\pi x\,dx=\pi.
$$
<!-- solution-end -->

#### A4. 有限エネルギー評価を使う

$f(x)=x$ の係数

$$
b_n=\frac{2(-1)^{n+1}}n,
\qquad a_0=a_n=0
$$

を用い、任意の $N$ について

$$
\sum_{n=1}^{N}\frac1{n^2}\le\frac{\pi^2}{6}
$$

を導いてください。無限和の等号は使わないでください。

- Level: A

<!-- solution-start -->
**詳細解答**

[Fourier係数の有限エネルギー不等式](#thm-fou1-finite-energy-bound)から

$$
\sum_{n=1}^{N}b_n^2\le\frac1\pi\int_{-\pi}^{\pi}x^2\,dx.
$$

左辺は

$$
4\sum_{n=1}^{N}\frac1{n^2},
$$

右辺は

$$
\frac{2}{\pi}\int_0^\pi x^2\,dx=\frac{2\pi^2}{3}.
$$

したがって

$$
4\sum_{n=1}^{N}\frac1{n^2}\le\frac{2\pi^2}{3},
$$

両辺を4で割れば

$$
\boxed{\sum_{n=1}^{N}\frac1{n^2}\le\frac{\pi^2}{6}}
$$

を得ます。
<!-- solution-end -->

### Level B

#### B1. $x^2$ の係数

$f(x)=x^2$ を $[-\pi,\pi]$ 上で考えます。

1. 0になる係数を対称性から判定してください。
2. $a_0$ を求めてください。
3. 部分積分を省略せず

$$
a_n=\frac{4(-1)^n}{n^2}
$$

を導いてください。

- Level: B

<!-- solution-start -->
**詳細解答**

$f(-x)=f(x)$ なので $b_n=0$ です。また

$$
a_0=\frac{2}{\pi}\int_0^\pi x^2\,dx=\frac{2\pi^2}{3}.
$$

$n\ge1$ では

$$
a_n=\frac{2}{\pi}\int_0^\pi x^2\cos nx\,dx.
$$

$u=x^2$, $dv=\cos nx\,dx$ として

$$
\int_0^\pi x^2\cos nx\,dx
=-\frac{2}{n}\int_0^\pi x\sin nx\,dx
$$

です。さらに

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
\int_0^\pi x^2\cos nx\,dx=\frac{2\pi(-1)^n}{n^2}
$$

となり

$$
\boxed{a_n=\frac{4(-1)^n}{n^2}}
$$

を得ます。
<!-- solution-end -->

#### B2. 同じ半区間データから二種類の係数を作る

$g(x)=x$、$0\le x\le\pi$ とします。

1. $A_0,A_n$ を求めてください。
2. $B_n$ を求めてください。
3. 二つの係数列が異なる理由を延長後の形から説明してください。

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
&=\frac{2}{\pi}\left[\frac{x\sin nx}{n}+\frac{\cos nx}{n^2}\right]_0^\pi\\
&=\frac{2}{\pi}\frac{(-1)^n-1}{n^2}.
\end{aligned}
$$

一方

$$
\begin{aligned}
B_n
&=\frac{2}{\pi}\int_0^\pi x\sin nx\,dx\\
&=\frac{2(-1)^{n+1}}n.
\end{aligned}
$$

左右同符号で延ばした形は $|x|$、左右反対符号で延ばした形は $x$ です。半区間の値が同じでも、延長後の周期波形が違うため係数列も変わります。
<!-- solution-end -->

#### B3. 矩形波の最初の三つの非零周波数

$$
q(x)=
\begin{cases}
-1,&-\pi<x<0,\\
1,&0<x<\pi
\end{cases}
$$

を $2\pi$ 周期に延長します。

1. $a_0,a_n$ が0であることを説明してください。
2. $b_n$ を求め、偶数 $n$ で0になることを示してください。
3. $S_5q$ を書き、$x=\pi/2$ での値を求めてください。

- Level: B

<!-- solution-start -->
**詳細解答**

$q(-x)=-q(x)$ なので

$$
a_0=a_n=0.
$$

正弦側は

$$
\begin{aligned}
b_n
&=\frac{2}{\pi}\int_0^\pi\sin nx\,dx\\
&=\frac{2}{\pi n}\{1-(-1)^n\}\\
&=
\begin{cases}
4/(\pi n),&n\text{ が奇数},\\
0,&n\text{ が偶数}.
\end{cases}
\end{aligned}
$$

したがって

$$
S_5q(x)=\frac4\pi\left(\sin x+\frac13\sin3x+\frac15\sin5x\right).
$$

$x=\pi/2$ では $1,-1,1$ の順なので

$$
S_5q\left(\frac\pi2\right)
=\frac4\pi\left(1-\frac13+\frac15\right)
=\boxed{\frac{52}{15\pi}}.
$$
<!-- solution-end -->

### Level C

#### C1. 三角形波を分解する

$[-\pi,\pi]$ で

$$
t(x)=\pi-|x|
$$

とし、$2\pi$ 周期に延長します。

1. 0になる係数を対称性から判定してください。
2. $a_0$ と $a_n$ を計算し、偶数 $n$ では0、奇数 $n$ では

$$
a_n=\frac{4}{\pi n^2}
$$

となることを示してください。
3. $S_5t$ を書いてください。
4. $S_5t(0)$ と $S_5t(\pi)$ を求め、$t(0)=\pi$, $t(\pi)=0$ と比較してください。
5. 矩形波では $1/n$、この波形では $1/n^2$ が現れる違いを形と結び付けて説明してください。ただし一般定理の証明は不要です。

- Level: C

<!-- solution-start -->
**詳細解答**

$t(-x)=t(x)$ なので $b_n=0$ です。

$$
\begin{aligned}
a_0
&=\frac{2}{\pi}\int_0^\pi(\pi-x)\,dx
=\pi.
\end{aligned}
$$

$n\ge1$ では

$$
a_n=\frac{2}{\pi}\int_0^\pi(\pi-x)\cos nx\,dx.
$$

定数部分の積分は0なので

$$
\begin{aligned}
a_n
&=-\frac{2}{\pi}\int_0^\pi x\cos nx\,dx\\
&=\frac{2}{\pi}\frac{1-(-1)^n}{n^2}\\
&=
\begin{cases}
4/(\pi n^2),&n\text{ が奇数},\\
0,&n\text{ が偶数}.
\end{cases}
\end{aligned}
$$

したがって

$$
S_5t(x)=\frac\pi2+\frac4\pi\left(\cos x+\frac1{9}\cos3x+\frac1{25}\cos5x\right).
$$

$x=0$ では

$$
S_5t(0)=\frac\pi2+\frac{1036}{225\pi},
$$

$x=\pi$ では

$$
S_5t(\pi)=\frac\pi2-\frac{1036}{225\pi}.
$$

それぞれ $\pi$ と0への有限次数近似です。

矩形波には跳びがあり、係数に $1/n$ が現れました。一方、この波形は折れ曲がりを持つものの値は連続で、係数に $1/n^2$ が現れました。ここから高い周波数がより速く小さくなる傾向を観察できますが、一般化には追加仮定が必要です。
<!-- solution-end -->

---

## 11. まとめ

本章では、RA4 の積分だけを前提に有限次数の Fourier 理論を閉じました。

- 正弦・余弦を一周期積分すると異なる整数周波数が消えることを直接証明した。
- その消去則から係数公式を導いた。
- 係数から作る有限和が固定次数で平均二乗誤差を最小にすることを証明した。
- 左右の対称性により、計算前から0と分かる係数を判定した。
- 複素指数表示で正弦側・余弦側を一本化した。
- 半区間のデータから二種類の対称延長と係数列を作った。
- 有限個の係数の二乗和が元の二乗積分を超えないことを証明した。
- $x$、矩形波、$|x|$、$x^2$、三角形波を手計算した。

FOU2 では次数を増やした極限を扱います。FOU1 の定義・定理・証明は、旧 FA1 や旧 Fourier 本文を前提としていません。
