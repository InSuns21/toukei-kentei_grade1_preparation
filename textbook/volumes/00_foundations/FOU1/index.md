# FOU1 Fourier級数・直交性・係数計算

Fourier 級数の最初の仕事は、「無限級数がどこで収束するか」を論じることではありません。まず、周期的な波形から **どの周波数がどれだけ含まれているかを積分で取り出す**ことです。

本章では $2\pi$ 周期の実数値関数を中心に、

1. 三角関数が一周期上で直交することを積分で確かめる。
2. その直交性から Fourier 係数を導く。
3. Fourier 部分和が有限次数の三角多項式の中で平均二乗誤差を最小にすることを証明する。
4. 偶奇性と半区間展開で計算量を減らす。
5. $f(x)=x$、矩形波、$|x|$ の係数を手で計算する。
6. 完全性を使わずに Bessel 不等式まで導く。

という順に進みます。

前提は [RA4 Riemann/Darboux積分・FTC](../RA4/index.md) です。本章では区分的連続関数を扱うので、積分は Riemann 積分で足ります。$L^2$ の見方は「二乗積分で誤差を測る」という形で先に使いますが、Lebesgue 積分や Hilbert 空間の一般論を入口の必須前提にはしません。

> **この章の停止線**  
> Fourier 係数を計算できることと、その Fourier 級数が元の関数へ収束することは別問題です。各点収束、跳躍点での左右極限の平均、Gibbs 現象、Fejér 平均、三角関数系の完全性、Parseval 等式、$L^2$ 収束は FOU2 で扱います。本章では、それらを使って係数計算を正当化しません。

---

## 1. 周期波形を有限個の周波数で作る

$2\pi$ 周期とは

$$
f(x+2\pi)=f(x)
$$

がすべての $x$ で成り立つことです。最も単純な周期波形は

$$
1,\quad \cos x,\quad \sin x,\quad \cos 2x,\quad \sin 2x,\ldots
$$

です。これらを有限個だけ足したものを、まず扱います。

<a id="def-fou1-trigonometric-polynomial"></a>
<!-- formal-statement-start -->
> **定義（三角多項式）**  
> 非負整数 $N$ と実数 $A_0,A_1,\ldots,A_N,B_1,\ldots,B_N$ に対し

$$
T_N(x)
=\frac{A_0}{2}
+\sum_{n=1}^{N}\bigl(A_n\cos nx+B_n\sin nx\bigr)
$$

> の形の関数を $N$ 次以下の **三角多項式** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fou1-trigonometric-polynomial -->
**定義の確認**：三つの周波数を重ねる

$$
T(x)=2+3\cos x-\sin 2x+4\cos 3x
$$

は $N=3$ の三角多項式です。定義の記号では

$$
A_0=4,\quad A_1=3,\quad B_2=-1,\quad A_3=4
$$

で、それ以外の係数は0です。各項は $2\pi$ 周期なので、その有限和である $T$ も $2\pi$ 周期です。
<!-- definition-example-end -->

問題は逆向きです。一般の周期関数 $f$ が与えられたとき、$A_n,B_n$ をどう選べば「$n$ 番目の周波数」を取り出せるでしょうか。その答えが直交性です。

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

を一周期で積分します。整数 $k\ne0$ なら

$$
\int_{-\pi}^{\pi}\cos kx\,dx=0,
\qquad
\int_{-\pi}^{\pi}\sin kx\,dx=0
$$

です。

<a id="thm-fou1-trigonometric-orthogonality"></a>
<!-- formal-statement-start -->
> **定理（三角関数系の直交性）**  
> 正整数 $m,n$ に対し

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

> が成り立つ。また

$$
\int_{-\pi}^{\pi}\sin mx\cos nx\,dx=0,
$$

$$
\int_{-\pi}^{\pi}\cos nx\,dx
=\int_{-\pi}^{\pi}\sin nx\,dx=0,
\qquad
\int_{-\pi}^{\pi}1\,dx=2\pi
$$

> である。
<!-- formal-statement-end -->

### 証明の見取り図

$m\ne n$ なら積和公式に現れる周波数 $m-n,m+n$ はどちらも0ではないので、一周期積分で消えます。$m=n$ のときだけ $\cos 0x=1$ が残り、積分値が $\pi$ になります。正弦と余弦の積は奇関数なので0です。

<!-- proof-start -->
### 証明

まず $m\ne n$ とします。積和公式から

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
\cos^2 nx=\frac{1+\cos 2nx}{2}
$$

なので

$$
\int_{-\pi}^{\pi}\cos^2 nx\,dx
=\frac12(2\pi)+0=\pi.
$$

同様に

$$
\sin^2 nx=\frac{1-\cos 2nx}{2}
$$

から積分値は $\pi$ です。$m\ne n$ の $\sin mx\sin nx$ も積和公式で二つの非零周波数の余弦へ分かれるため0です。

最後に $\sin mx\cos nx$ は $x\mapsto-x$ で符号が反転する奇関数なので、対称区間 $[-\pi,\pi]$ 上の積分は0です。$\sin nx$ 自身も奇関数、$\cos nx$ は原始関数 $\sin nx/n$ を端点で評価すれば0です。これで全ての式が従います。
<!-- proof-end -->

直交性の意味は「掛けて積分すれば、狙った周波数以外が消える」です。これが係数公式の出所です。

---

## 3. Fourier係数は直交性で一つずつ抽出する

本章では、$f$ は $[-\pi,\pi]$ 上で区分的連続な実数値関数とします。この仮定なら $f$ と $f^2$ は Riemann 可積分です。

<a id="def-fou1-real-fourier-coefficients"></a>
<!-- formal-statement-start -->
> **定義（実 Fourier 係数）**  
> $[-\pi,\pi]$ 上で区分的連続な実数値関数 $f$ に対し

$$
a_0
:=\frac1\pi\int_{-\pi}^{\pi}f(x)\,dx,
$$

$$
a_n
:=\frac1\pi\int_{-\pi}^{\pi}f(x)\cos nx\,dx,
\qquad n\ge1,
$$

$$
b_n
:=\frac1\pi\int_{-\pi}^{\pi}f(x)\sin nx\,dx,
\qquad n\ge1
$$

> を $f$ の **実 Fourier 係数** という。
<!-- formal-statement-end -->

ここで「級数」を先に等号で書かないことが重要です。係数は積分だけで定義できますが、

$$
\frac{a_0}{2}+\sum_{n=1}^{\infty}(a_n\cos nx+b_n\sin nx)
$$

がどこで $f(x)$ に収束するかは別の定理を必要とします。

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
**定義の確認**：有限三角多項式なら係数を正確に回収できる

$$
f(x)=3+2\cos2x-4\sin3x
$$

とします。定義積分に直交性を使うと

$$
a_0=6,\qquad a_2=2,\qquad b_3=-4
$$

で、その他は0です。したがって $S_3f=f$ です。係数公式は、もともと入っている周波数の振幅をそのまま取り出しています。
<!-- definition-example-end -->

<a id="thm-fou1-coefficient-extraction"></a>
<!-- formal-statement-start -->
> **定理（直交性による Fourier 係数の抽出）**  
> 三角多項式

$$
T_N(x)=\frac{A_0}{2}+\sum_{n=1}^{N}(A_n\cos nx+B_n\sin nx)
$$

> が与えられたとする。このとき

$$
A_0=\frac1\pi\int_{-\pi}^{\pi}T_N(x)\,dx,
$$

$$
A_m=\frac1\pi\int_{-\pi}^{\pi}T_N(x)\cos mx\,dx,
\qquad
B_m=\frac1\pi\int_{-\pi}^{\pi}T_N(x)\sin mx\,dx
$$

> が $1\le m\le N$ で成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$\cos mx$ を掛けると、$A_m\cos^2mx$ 以外の全項が直交性で消えます。残った積分が $A_m\pi$ なので、$\pi$ で割れば $A_m$ です。

<!-- proof-start -->
### 証明

$T_N$ を積分すると、定数項以外は一周期積分で0になるため

$$
\int_{-\pi}^{\pi}T_N(x)\,dx
=\frac{A_0}{2}(2\pi)=A_0\pi.
$$

よって最初の式が従います。

次に $1\le m\le N$ とします。$T_N\cos mx$ を積分すると、定数項、$n\ne m$ の余弦項、すべての正弦項は直交性で0です。したがって

$$
\int_{-\pi}^{\pi}T_N(x)\cos mx\,dx
=A_m\int_{-\pi}^{\pi}\cos^2mx\,dx
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

## 4. なぜ一般の関数にも同じ係数を選ぶのか：有限次数の最小二乗

係数公式は、有限三角多項式から係数を「読む」だけではありません。一般の $f$ を有限個の周波数で近似するときにも、同じ係数が自然に選ばれます。

誤差を

$$
\|f-T\|_2^2
:=\int_{-\pi}^{\pi}|f(x)-T(x)|^2\,dx
$$

で測ります。本章での $\|\cdot\|_2$ はこの二乗積分の記号であり、Hilbert 空間の一般理論は使いません。

<a id="thm-fou1-least-squares"></a>
<!-- formal-statement-start -->
> **定理（Fourier 部分和の有限次数最小二乗性）**  
> $[-\pi,\pi]$ 上で区分的連続な実数値関数 $f$ と非負整数 $N$ を取る。$S_Nf$ を $f$ の $N$ 次 Fourier 部分和とする。このとき任意の $N$ 次以下の実三角多項式 $T_N$ に対して

$$
\int_{-\pi}^{\pi}|f-S_Nf|^2\,dx
\le
\int_{-\pi}^{\pi}|f-T_N|^2\,dx
$$

> が成り立つ。等号が成り立つのは $T_N=S_Nf$ のときに限る。
<!-- formal-statement-end -->

### 証明の見取り図

係数の定義そのものから、誤差 $f-S_Nf$ は $1,\cos x,\sin x,\ldots,\cos Nx,\sin Nx$ の全てと積分の意味で直交します。したがって別の三角多項式へ動かした分は誤差と交差せず、平方誤差に正の量を足すだけです。

<!-- proof-start -->
### 証明

$R_N:=T_N-S_Nf$ と置きます。$R_N$ は $N$ 次以下の三角多項式です。

まず係数の定義と直交性から

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
\int|f-T_N|^2
&=\int\{(f-S_Nf)-R_N\}^2\\
&=\int|f-S_Nf|^2
-2\int(f-S_Nf)R_N
+\int|R_N|^2\\
&=\int|f-S_Nf|^2+\int|R_N|^2.
\end{aligned}
$$

ここで積分区間はすべて $[-\pi,\pi]$ です。最後の項は非負なので不等式が従います。

等号なら $\int|R_N|^2=0$ です。$R_N$ は連続関数なので、ある点で $R_N\ne0$ ならその近傍で $|R_N|^2$ は正となり積分も正になります。したがって $R_N\equiv0$、すなわち $T_N=S_Nf$ です。
<!-- proof-end -->

この結果は「Fourier 級数が収束する」という定理ではありません。固定した $N$ の範囲で、最良の三角多項式を選んだという有限次元の主張です。

---

## 5. 偶関数・奇関数なら半分の係数が消える

対称区間では、偶奇性が計算を大きく簡単にします。

<a id="thm-fou1-parity"></a>
<!-- formal-statement-start -->
> **定理（偶奇性と Fourier 係数）**  
> $[-\pi,\pi]$ 上で区分的連続な実数値関数 $f$ の Fourier 係数を $a_0,a_n,b_n$ とする。
>
> 1. $f$ が偶関数なら、すべての $n\ge1$ で $b_n=0$ であり
>
> $$
> a_0=\frac{2}{\pi}\int_0^\pi f(x)\,dx,
> \qquad
> a_n=\frac{2}{\pi}\int_0^\pi f(x)\cos nx\,dx.
> $$
>
> 2. $f$ が奇関数なら、$a_0=0$ かつすべての $n\ge1$ で $a_n=0$ であり
>
> $$
> b_n=\frac{2}{\pi}\int_0^\pi f(x)\sin nx\,dx.
> $$
<!-- formal-statement-end -->

### 証明の見取り図

偶関数と奇関数の積は奇関数、偶関数どうしまたは奇関数どうしの積は偶関数です。対称区間上では奇関数の積分が0、偶関数の積分は $0$ から $\pi$ の積分の2倍です。

<!-- proof-start -->
### 証明

$f$ が偶関数なら $f(x)\sin nx$ は偶×奇なので奇関数です。したがって

$$
b_n=\frac1\pi\int_{-\pi}^{\pi}f(x)\sin nx\,dx=0.
$$

一方 $f$ と $f\cos nx$ は偶関数なので、対称区間の積分を半区間の2倍にして $a_0,a_n$ の式を得ます。

$f$ が奇関数なら $f$ と $f\cos nx$ は奇関数なので $a_0=a_n=0$ です。$f\sin nx$ は奇×奇で偶関数なので、その積分は $[0,\pi]$ の2倍です。
<!-- proof-end -->

### 例1：$f(x)=x$ は正弦だけ残る

$x$ は奇関数なので $a_0=a_n=0$ です。部分積分により

$$
\begin{aligned}
b_n
&=\frac{2}{\pi}\int_0^\pi x\sin nx\,dx\\
&=\frac{2}{\pi}
\left[
-\frac{x\cos nx}{n}+\frac{\sin nx}{n^2}
\right]_0^\pi\\
&=\frac{2(-1)^{n+1}}{n}.
\end{aligned}
$$

したがって係数から作る形式的な Fourier 級数は

$$
2\sum_{n=1}^{\infty}\frac{(-1)^{n+1}}{n}\sin nx
$$

です。ここではまだ「この級数が各 $x$ で $x$ に等しい」とは主張していません。

### 例2：矩形波では奇数高調波だけ残る

$-\pi<x<\pi$ で

$$
q(x)=
\begin{cases}
-1,&-\pi<x<0,\\
1,&0<x<\pi
\end{cases}
$$

とし、端点と0での値は任意に定めて $2\pi$ 周期に延長します。$q$ は奇関数なので余弦係数は0です。

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

よって矩形波には $1,3,5,\ldots$ 次の奇数高調波だけが残ります。跳躍点で級数が何へ収束するかは FOU2 の問題です。

### 例3：$|x|$ は余弦だけ残る

$f(x)=|x|$ は偶関数なので $b_n=0$ です。

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

したがって偶数 $n$ では $a_n=0$、奇数 $n$ では

$$
a_n=-\frac{4}{\pi n^2}
$$

です。矩形波の係数が $1/n$ で減るのに対し、角を持つ連続波形 $|x|$ では $1/n^2$ で減っています。この減衰と滑らかさの一般関係は後続章で整理します。

---

## 6. 複素表示は実係数を一つの添字へまとめる

整数 $n$ に対し Euler の公式

$$
e^{inx}=\cos nx+i\sin nx
$$

を使います。本章ではこの恒等式を複素表示の記法として使うだけで、複素解析は前提にしません。

<a id="def-fou1-complex-fourier-coefficient"></a>
<!-- formal-statement-start -->
> **定義（複素 Fourier 係数）**  
> $[-\pi,\pi]$ 上で区分的連続な実数値関数 $f$ と整数 $n$ に対し

$$
c_n(f)
:=\frac1{2\pi}\int_{-\pi}^{\pi}f(x)e^{-inx}\,dx
$$

> を $n$ 番目の **複素 Fourier 係数** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fou1-complex-fourier-coefficient -->
**定義の確認**：実係数との対応を積分から出す

$n\ge1$ なら

$$
\begin{aligned}
c_n
&=\frac1{2\pi}\int f(x)(\cos nx-i\sin nx)\,dx\\
&=\frac{a_n-ib_n}{2}.
\end{aligned}
$$

同様に

$$
c_{-n}=\frac{a_n+ib_n}{2},
\qquad
c_0=\frac{a_0}{2}.
$$

したがって実数値 $f$ では $c_{-n}=\overline{c_n}$ です。複素係数は新しい情報を追加するのではなく、正弦・余弦の二組を整数添字一つへまとめています。
<!-- definition-example-end -->

実部分和は

$$
S_Nf(x)=\sum_{n=-N}^{N}c_ne^{inx}
$$

とも書けます。以後の Fourier 変換では、この複素表示が自然になります。

---

## 7. 半区間展開：同じ関数から二種類の周期波形を作れる

実際の境界値問題では、関数が $[0,L]$ 上でしか与えられないことがあります。そのとき $[-L,L]$ へどう延長するかで、使う基底が変わります。

<a id="def-fou1-half-range"></a>
<!-- formal-statement-start -->
> **定義（半区間正弦・余弦係数）**  
> $L>0$ とし、$g$ を $[0,L]$ 上の区分的連続な実数値関数とする。
>
> - $g$ を $[-L,L]$ へ偶延長したときの余弦係数を
>
> $$
> A_0=\frac{2}{L}\int_0^L g(x)\,dx,
> \qquad
> A_n=\frac{2}{L}\int_0^L g(x)\cos\frac{n\pi x}{L}\,dx
> $$
>
> とする。これを **半区間余弦係数** という。
>
> - $g$ を $[-L,L]$ へ奇延長したときの正弦係数を
>
> $$
> B_n=\frac{2}{L}\int_0^L g(x)\sin\frac{n\pi x}{L}\,dx
> $$
>
> とする。これを **半区間正弦係数** という。
<!-- formal-statement-end -->

この二つは同じ級数ではありません。元の $[0,L]$ 上では同じ $g$ を使っていても、区間外へ作った周期波形が違うからです。Dirichlet 境界条件では正弦系、Neumann 境界条件では余弦系が現れることと対応します。

<!-- definition-example-start: def-fou1-half-range -->
**定義の確認**：$g(x)=x$ on $[0,\pi]$

偶延長は $|x|$ なので、半区間余弦係数は

$$
A_0=\pi,
\qquad
A_n=\frac{2}{\pi}\frac{(-1)^n-1}{n^2}.
$$

一方、奇延長は $x$ なので、半区間正弦係数は

$$
B_n=\frac{2(-1)^{n+1}}{n}.
$$

同じ $g(x)=x$ から、偶延長なら余弦だけ、奇延長なら正弦だけという全く異なる係数列が得られました。どちらを使うかは、元の問題が区間端でどの対称性・境界条件を要求するかで決まります。
<!-- definition-example-end -->

---

## 8. Bessel不等式：係数の二乗和は元の二乗積分を超えない

有限部分和の最小二乗性から、完全性を使わずに重要な不等式が得られます。

<a id="thm-fou1-bessel"></a>
<!-- formal-statement-start -->
> **定理（Fourier 係数に対する Bessel 不等式）**  
> $[-\pi,\pi]$ 上で区分的連続な実数値関数 $f$ の Fourier 係数を $a_0,a_n,b_n$ とする。このとき任意の非負整数 $N$ に対して

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

$S_Nf$ は $f$ と同じ低周波係数を持つので、$f-S_Nf$ と $S_Nf$ は直交します。平方誤差を展開すると「元のエネルギー = 部分和の係数エネルギー + 残差エネルギー」となり、残差エネルギーを捨てれば不等式です。

<!-- proof-start -->
### 証明

最小二乗性の証明で確認した通り

$$
\int_{-\pi}^{\pi}(f-S_Nf)S_Nf\,dx=0.
$$

したがって

$$
\int |f|^2
=\int|S_Nf|^2+\int|f-S_Nf|^2
\ge\int|S_Nf|^2.
$$

直交性により $S_Nf$ の二乗積分では交差項が全て消え、

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

二つの式を合わせれば主張を得ます。
<!-- proof-end -->

### 何をまだ言っていないか

Bessel 不等式は「$\le$」です。等号

$$
\frac{a_0^2}{2}+\sum_{n=1}^{\infty}(a_n^2+b_n^2)
=\frac1\pi\int_{-\pi}^{\pi}|f|^2
$$

を得るには、三角関数系で見えない成分が残らないこと、すなわち完全性が必要です。これが Parseval 等式へ進む FOU2 の核心です。

### 例：$f(x)=x$ から有限和の評価を得る

先ほど

$$
b_n=\frac{2(-1)^{n+1}}n,
\qquad a_0=a_n=0
$$

を計算しました。また

$$
\frac1\pi\int_{-\pi}^{\pi}x^2\,dx
=\frac{2\pi^2}{3}.
$$

Bessel 不等式から任意の $N$ について

$$
4\sum_{n=1}^{N}\frac1{n^2}
\le\frac{2\pi^2}{3},
$$

すなわち

$$
\sum_{n=1}^{N}\frac1{n^2}\le\frac{\pi^2}{6}
$$

が従います。ここではまだ無限和が $\pi^2/6$ に**等しい**とは言っていません。等号には Parseval が必要です。

---

## 9. 係数計算の作戦表

Fourier 係数を手計算するときは、次の順に見ると無駄が減ります。

1. **周期と区間を固定する。** $2\pi$ 周期か $2L$ 周期か。
2. **偶奇性を見る。** 偶なら正弦係数、奇なら定数・余弦係数が消える。
3. **区分点で積分を分ける。** 矩形波などは定義区間ごとに積分する。
4. **部分積分の回数を見る。** $x$ なら1回、$x^2$ なら2回が目安になる。
5. **係数の減衰を点検する。** 計算ミスで $1/n$ と $1/n^2$ を取り違えていないかを見る。
6. **収束は別判定とする。** 係数を出しただけで $f=\sum$ と断定しない。

ODE7 で現れた Dirichlet の正弦系と Neumann の余弦系は、ここでは「直交する周波数基底」として係数計算できるようになりました。後続では、これらが本当に十分多くの関数を表せるのかを調べます。

---

## 10. 演習

### Level A

#### A1. 直交性を積和公式から確認する

正整数 $m,n$ に対し、次を積和公式から示してください。

1. $m\ne n$ なら $\int_{-\pi}^{\pi}\cos mx\cos nx\,dx=0$。
2. $m=n$ なら $\int_{-\pi}^{\pi}\cos^2 nx\,dx=\pi$。
3. 任意の $m,n$ で $\int_{-\pi}^{\pi}\sin mx\cos nx\,dx=0$。

- Level: A

<!-- solution-start -->
**詳細解答**

1. 積和公式

$$
\cos mx\cos nx
=\frac12\cos((m-n)x)+\frac12\cos((m+n)x)
$$

を使います。$m\ne n$ なら $m-n\ne0$、また $m+n\ne0$ です。非零整数 $k$ について

$$
\int_{-\pi}^{\pi}\cos kx\,dx
=\left[\frac{\sin kx}{k}\right]_{-\pi}^{\pi}=0
$$

なので、二項とも積分が0です。

2. $m=n$ では

$$
\cos^2 nx=\frac{1+\cos2nx}{2}
$$

です。したがって

$$
\int_{-\pi}^{\pi}\cos^2nx\,dx
=\frac12(2\pi)+\frac12\cdot0=\pi.
$$

3. $\sin mx$ は奇関数、$\cos nx$ は偶関数なので積は奇関数です。よって対称区間上の積分は0です。積和公式を使うなら

$$
\sin mx\cos nx
=\frac12\sin((m+n)x)+\frac12\sin((m-n)x)
$$

で、各正弦の一周期積分が0になることからも従います。
<!-- solution-end -->

#### A2. 有限三角多項式の係数を取り出す

$$
f(x)=3+2\cos2x-4\sin3x
$$

について、定義積分から $a_0,a_n,b_n$ を求め、$S_3f=f$ を確認してください。

- Level: A

<!-- solution-start -->
**詳細解答**

定数項は

$$
a_0=\frac1\pi\int_{-\pi}^{\pi}f(x)\,dx.
$$

余弦・正弦項は一周期積分で0なので

$$
a_0=\frac1\pi\cdot3\cdot2\pi=6.
$$

$a_2$ は

$$
\begin{aligned}
a_2
&=\frac1\pi\int_{-\pi}^{\pi}f(x)\cos2x\,dx\\
&=\frac1\pi\int_{-\pi}^{\pi}2\cos^22x\,dx\\
&=\frac1\pi\cdot2\pi=2.
\end{aligned}
$$

他の余弦係数は直交性により0です。同様に

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

#### A3. 偶奇性だけで消える係数を判定する

次の各関数について、計算を始める前に0と分かる係数をすべて答えてください。その後、残る最初の係数を一つ計算してください。

1. $f(x)=x$。
2. $g(x)=|x|$。

- Level: A

<!-- solution-start -->
**詳細解答**

1. $f(x)=x$ は奇関数です。したがって

$$
a_0=0,\qquad a_n=0\quad(n\ge1).
$$

残るのは $b_n$ です。最初の係数は

$$
\begin{aligned}
b_1
&=\frac{2}{\pi}\int_0^\pi x\sin x\,dx\\
&=\frac{2}{\pi}[-x\cos x+\sin x]_0^\pi\\
&=2.
\end{aligned}
$$

2. $g(x)=|x|$ は偶関数なので

$$
b_n=0\quad(n\ge1).
$$

定数係数は

$$
a_0=\frac{2}{\pi}\int_0^\pi x\,dx=\pi.
$$

偶奇性だけで消えるのは正弦係数であり、余弦係数はさらに積分しないと0かどうか決まりません。
<!-- solution-end -->

#### A4. Bessel不等式から有限 Basel 和を評価する

$f(x)=x$ の係数

$$
b_n=\frac{2(-1)^{n+1}}n,
\qquad a_0=a_n=0
$$

を用い、Bessel 不等式から任意の $N$ について

$$
\sum_{n=1}^{N}\frac1{n^2}\le\frac{\pi^2}{6}
$$

を導いてください。Parseval 等式は使わないでください。

- Level: A

<!-- solution-start -->
**詳細解答**

Bessel 不等式は

$$
\sum_{n=1}^{N}b_n^2
\le\frac1\pi\int_{-\pi}^{\pi}x^2\,dx
$$

となります。左辺は

$$
\sum_{n=1}^{N}b_n^2
=4\sum_{n=1}^{N}\frac1{n^2}.
$$

右辺は

$$
\frac1\pi\int_{-\pi}^{\pi}x^2\,dx
=\frac{2}{\pi}\left[\frac{x^3}{3}\right]_0^\pi
=\frac{2\pi^2}{3}.
$$

したがって

$$
4\sum_{n=1}^{N}\frac1{n^2}
\le\frac{2\pi^2}{3}.
$$

両辺を4で割って

$$
\boxed{\sum_{n=1}^{N}\frac1{n^2}\le\frac{\pi^2}{6}}
$$

を得ます。これは有限和の上界であり、無限和との等号はまだ導いていません。
<!-- solution-end -->

### Level B

#### B1. $x^2$ の Fourier 係数

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

定数係数は

$$
\begin{aligned}
a_0
&=\frac{2}{\pi}\int_0^\pi x^2\,dx\\
&=\frac{2}{\pi}\cdot\frac{\pi^3}{3}
=\frac{2\pi^2}{3}.
\end{aligned}
$$

次に

$$
a_n=\frac{2}{\pi}\int_0^\pi x^2\cos nx\,dx.
$$

1回目の部分積分で $u=x^2$, $dv=\cos nx\,dx$ と置くと

$$
\int_0^\pi x^2\cos nx\,dx
=\left[\frac{x^2\sin nx}{n}\right]_0^\pi
-\frac{2}{n}\int_0^\pi x\sin nx\,dx.
$$

端点で $\sin n\pi=0$ なので最初の境界項は0です。残った積分にもう一度部分積分を使い、$u=x$, $dv=\sin nx\,dx$ とすると

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
=\frac{2\pi(-1)^n}{n^2}.
$$

これを係数式へ戻して

$$
\boxed{a_n=\frac{4(-1)^n}{n^2}}.
$$

よって形式的な Fourier 級数候補は

$$
\frac{\pi^2}{3}+4\sum_{n=1}^{\infty}\frac{(-1)^n}{n^2}\cos nx
$$

です。各点での等号は FOU2 の収束定理を待ちます。
<!-- solution-end -->

#### B2. 同じ $g(x)=x$ から二つの半区間展開を作る

$g(x)=x$ を $0\le x\le\pi$ で考えます。

1. 偶延長に対応する半区間余弦係数 $A_0,A_n$ を求めてください。
2. 奇延長に対応する半区間正弦係数 $B_n$ を求めてください。
3. 二つの係数列が異なる理由を、延長後の関数の形から説明してください。

- Level: B

<!-- solution-start -->
**詳細解答**

$L=\pi$ なので余弦係数は

$$
A_0=\frac{2}{\pi}\int_0^\pi x\,dx=\pi.
$$

$n\ge1$ では

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

正弦係数は

$$
\begin{aligned}
B_n
&=\frac{2}{\pi}\int_0^\pi x\sin nx\,dx\\
&=\frac{2}{\pi}
\left[-\frac{x\cos nx}{n}+\frac{\sin nx}{n^2}\right]_0^\pi\\
&=\frac{2(-1)^{n+1}}n.
\end{aligned}
$$

偶延長すると $[-\pi,\pi]$ 上の関数は $|x|$ になり、左右対称なので余弦だけが残ります。奇延長すると関数は $x$ になり、原点について反対称なので正弦だけが残ります。元の $[0,\pi]$ 上では同じ値でも、延長後の周期波形が違うため係数列も異なります。
<!-- solution-end -->

#### B3. 矩形波の最初の三つの非零高調波

矩形波

$$
q(x)=
\begin{cases}
-1,&-\pi<x<0,\\
1,&0<x<\pi
\end{cases}
$$

を $2\pi$ 周期に延長します。

1. すべての余弦係数が0であることを説明してください。
2. $b_n$ を求め、偶数次高調波が消えることを示してください。
3. $n=1,3,5$ までの部分和 $S_5q$ を書き、$x=\pi/2$ での値を求めてください。

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
&=\frac{2}{\pi}\left[-\frac{\cos nx}{n}\right]_0^\pi\\
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

最初の三つの非零高調波を使うと

$$
S_5q(x)
=\frac4\pi\left(\sin x+\frac13\sin3x+\frac15\sin5x\right).
$$

$x=\pi/2$ では

$$
\sin\frac\pi2=1,
\qquad
\sin\frac{3\pi}{2}=-1,
\qquad
\sin\frac{5\pi}{2}=1
$$

なので

$$
S_5q\left(\frac\pi2\right)
=\frac4\pi\left(1-\frac13+\frac15\right)
=\boxed{\frac{52}{15\pi}}.
$$

これは有限部分和の値です。$N\to\infty$ でどこへ収束するかは本問では使っていません。
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
3. 最初の三つの非零高調波を含む $S_5t$ を書いてください。
4. $S_5t(0)$ と $S_5t(\pi)$ を求め、元の $t(0)=\pi$, $t(\pi)=0$ と比較してください。
5. 矩形波の係数が $1/n$、三角形波の係数が $1/n^2$ で減るという違いを、波形の見た目と結び付けて説明してください。ただし一般定理の証明は不要です。

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

定数 $\pi$ の項は

$$
\pi\int_0^\pi\cos nx\,dx=0
$$

です。したがって

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

よって

$$
a_n=
\begin{cases}
4/(\pi n^2),&n\text{ が奇数},\\
0,&n\text{ が偶数}.
\end{cases}
$$

したがって $n=1,3,5$ までの部分和は

$$
S_5t(x)
=\frac\pi2
+\frac4\pi\left(
\cos x+\frac1{9}\cos3x+\frac1{25}\cos5x
\right).
$$

$x=0$ では全ての余弦が1なので

$$
S_5t(0)
=\frac\pi2+\frac4\pi\left(1+\frac19+\frac1{25}\right).
$$

括弧内は

$$
1+\frac19+\frac1{25}
=\frac{259}{225}
$$

ですから

$$
S_5t(0)=\frac\pi2+\frac{1036}{225\pi}.
$$

これは $t(0)=\pi$ にかなり近い値です。

$x=\pi$ では奇数倍の余弦は全て $-1$ なので

$$
S_5t(\pi)
=\frac\pi2-\frac{1036}{225\pi},
$$

これは $t(\pi)=0$ に近い値です。ここで比較しているのは有限部分和であり、極限を主張してはいません。

矩形波には跳躍があり、係数は $1/n$ 程度で減りました。一方、三角形波は折れ曲がりはあるものの関数自体は連続で、今回の計算では $1/n^2$ まで速く減っています。「波形が滑らかなほど高周波成分が速く小さくなる」という現象が見えていますが、その一般的な微分と係数減衰の定理は後続で条件を付けて扱います。
<!-- solution-end -->

---

## 11. まとめ

本章で閉じたのは、Fourier 級数の**係数計算側**です。

- 一周期上の直交性により、異なる周波数は積分すると消える。
- その直交性から実 Fourier 係数を導出できる。
- Fourier 部分和は、固定次数以下の三角多項式の中で平均二乗誤差を最小にする。
- 偶関数は余弦だけ、奇関数は正弦だけを持つ。
- 半区間余弦級数は偶延長、半区間正弦級数は奇延長に対応する。
- 複素 Fourier 係数は実係数を整数添字一つへまとめる。
- Bessel 不等式は完全性なしで証明できるが、Parseval の等号には完全性が必要である。

次の FOU2 では、いよいよ「計算した級数は元の関数へどう収束するのか」を扱います。そこで各点収束、Dirichlet kernel、Fejér kernel、Gibbs 現象、完全性、Parseval 等式、$L^2$ 収束を区別して閉じます。
