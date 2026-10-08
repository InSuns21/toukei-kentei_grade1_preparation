# MQ3 量子調和振動子

[古典的な振動](../MECH5/index.md)では、質量 $m$ の粒子をばね定数 $k$ の復元力で閉じ込めると、角振動数 $\omega=\sqrt{k/m}$ の単振動が生じました。[Hamiltonian 形式](../AMECH5/index.md)ではそのエネルギーを運動量 $p$ と位置 $q$ から書けます。量子化の候補を立てる段階と、**その作用素の定義域・自己共役性・全スペクトルを証明する段階**は区別しなければなりません。

[MQ1](../MQ1/index.md)の有界ポテンシャル摂動定理は、$x^2$ のように無限遠で増大するポテンシャルにはそのまま適用できません。また [MQ2](../MQ2/index.md)の変分原理は最低エネルギーの下限・上界を与えますが、励起準位がすべて求まるわけではありません。この章では、Gaussian から状態を一つずつ作り、さらに**それ以外のスペクトルが存在しないこと**まで示します。

## 1. 古典 Hamiltonian を作用素にする

$m>0$ を質量、$\omega>0$ を角振動数、$\hbar>0$ を換算 Planck 定数とします。古典 Hamiltonian は

$$
H_{\mathrm{cl}}(q,p)=\frac{p^2}{2m}+\frac12m\omega^2q^2
$$

です。一次元 Hilbert 空間 $\mathcal H=L^2(\mathbb R,dx)$ 上で、位置 $Q\psi=x\psi$ と運動量 $P\psi=-i\hbar\psi'$ を考えます。これらの自己共役な最大実現は [QM5](../QM5/index.md)で構成しました。$\mathcal S(\mathbb R)$ は滑らかで各導関数が多項式の逆冪より速く減少する Schwartz 空間です。

形式的な候補は

$$
H_{\mathrm{diff}}\psi(x)
=-\frac{\hbar^2}{2m}\psi''(x)+\frac12m\omega^2x^2\psi(x),
\qquad\psi\in\mathcal S(\mathbb R).
$$

両項はそれぞれ自己共役な作用素から来ていますが、**非有界自己共役作用素の和が自動的に自己共役になるわけではありません**。ここではまず $\mathcal S$ 上の対称作用素として出発し、後でその閉包を特定します。

### 長さとエネルギーを無次元にする

長さ $\ell=\sqrt{\hbar/(m\omega)}$ と無次元座標 $y=x/\ell$ を導入します。波動関数の単位も変わるため、単に $x$ を $y$ と書き換えてはいけません。

<a id="def-mq3-unitary-scaling"></a>

<!-- formal-statement-start -->
> **定義（調和振動子のユニタリ無次元化）**  
> $m,\omega,\hbar>0$、$\ell=\sqrt{\hbar/(m\omega)}$ に対し、
>
> $$
> (U\psi)(y)=\sqrt{\ell}\,\psi(\ell y)
> $$
>
> を $U:L^2(\mathbb R,dx)\to L^2(\mathbb R,dy)$ と定める。$U$ はユニタリであり、$\mathcal S$ 上で
>
> $$
> UH_{\mathrm{diff}}U^{-1}=\hbar\omega\,h_{\mathrm{diff}},
> \qquad h_{\mathrm{diff}}=\frac12\left(-\frac{d^2}{dy^2}+y^2\right).
> $$
<!-- formal-statement-end -->

<!-- definition-example-start: def-mq3-unitary-scaling -->
**定義の確認** 変数変換 $x=\ell y$、$dx=\ell\,dy$ から

$$
\|U\psi\|_{L^2(dy)}^2
=\int_{\mathbb R}\ell|\psi(\ell y)|^2dy
=\int_{\mathbb R}|\psi(x)|^2dx.
$$

逆作用は $(U^{-1}f)(x)=\ell^{-1/2}f(x/\ell)$ です。$U^{-1}f(x)=\ell^{-1/2}f(y)$ を二回微分すると、$\frac{d^2}{dx^2}U^{-1}f=\ell^{-5/2}f''(y)$ なので、

$$
\begin{aligned}
UH_{\mathrm{diff}}U^{-1}f(y)
&=-\frac{\hbar^2}{2m\ell^2}f''(y)
+\frac{m\omega^2\ell^2}{2}y^2f(y)\\
&=\frac{\hbar\omega}{2}\bigl(-f''(y)+y^2f(y)\bigr).
\end{aligned}
$$

ここで $\hbar^2/(m\ell^2)=\hbar\omega$、$m\omega^2\ell^2=\hbar\omega$ を一つずつ代入しました。
<!-- definition-example-end -->

以降、第2～6節では $L^2(\mathbb R,dy)$ に移り、無次元の $h_{\mathrm{diff}}$ を解析します。最後に $U^{-1}$ で物理量へ戻します。

## 2. 生成・消滅演算子と正準交換関係

$-d^2/dy^2+y^2$ を直接解く代わりに、一階微分作用素の積として書けないでしょうか。Schwartz 空間上の微分と $y$ の掛け算は再び Schwartz 空間に入るため、この領域なら繰り返し演算できます。

<a id="def-mq3-ladder-operators"></a>

<!-- formal-statement-start -->
> **定義（消滅演算子と生成演算子）**  
> $\mathcal S(\mathbb R)$ 上に
>
> $$
> af=\frac1{\sqrt2}(yf+f'),\qquad
> a^\dagger f=\frac1{\sqrt2}(yf-f')
> $$
>
> を定める。ここで $a^\dagger$ は $\mathcal S$ 上の形式的随伴を表し、最大閉作用素としての随伴を無条件に同一視する記号ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mq3-ladder-operators -->
**定義の確認** $g(y)=e^{-y^2/2}$ は Schwartz 関数で、$g'(y)=-yg(y)$ です。従って

$$
ag=\frac{yg-yg}{\sqrt2}=0,\qquad
a^\dagger g=\frac{yg+yg}{\sqrt2}=\sqrt2\,yg.
$$

両出力は多項式と Gaussian の積なので $\mathcal S$ に属します。積分の境界項が消えるため、$f,g\in\mathcal S$ なら部分積分により $\langle af,g\rangle=\langle f,a^\dagger g\rangle$ です（内積は第2変数に線形）。この恒等式は共通領域上のものです。
<!-- definition-example-end -->

<a id="prop-mq3-ccr-factorization"></a>

<!-- formal-statement-start -->
> **命題（交換関係と Hamiltonian の因数分解）**  
> $\mathcal S(\mathbb R)$ 上で
>
> $$
> [a,a^\dagger]=aa^\dagger-a^\dagger a=I,\qquad
> h_{\mathrm{diff}}=a^\dagger a+\frac12I
> $$
>
> が成立する。また $[h_{\mathrm{diff}},a]=-a$、$[h_{\mathrm{diff}},a^\dagger]=a^\dagger$ が同じ領域上で成立する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$f\in\mathcal S$ に対し積の微分 $(yf)'=f+yf'$ を使うと、

$$
\begin{aligned}
2a^\dagger af
&=(y-\partial_y)(yf+f')\\
&=y^2f+yf'-(f+yf')-f''\\
&=(y^2-1)f-f'',\\
2aa^\dagger f
&=(y+\partial_y)(yf-f')\\
&=y^2f-yf'+(f+yf')-f''\\
&=(y^2+1)f-f''.
\end{aligned}
$$

差を取ると $[a,a^\dagger]f=f$、最初の式を二で割り $I/2$ を加えると $h_{\mathrm{diff}}f=(-f''+y^2f)/2$ を得ます。$N=a^\dagger a$ と置き、

$$
\begin{aligned}
[N,a]&=a^\dagger a^2-aa^\dagger a
=a^\dagger a^2-(a^\dagger a+I)a=-a,\\
[N,a^\dagger]&=a^\dagger aa^\dagger-(a^\dagger)^2a
=a^\dagger(a^\dagger a+I)-(a^\dagger)^2a=a^\dagger.
\end{aligned}
$$

従って $h_{\mathrm{diff}}=N+I/2$ に対しても同じ交換子が成り立ちます。全ての積は $\mathcal S$ を共通不変領域として計算しています。$\square$
<!-- proof-end -->

$a^\dagger a$ は非負な二次形式を持ちます。実際、$f\in\mathcal S$ について

$$
\langle f,h_{\mathrm{diff}}f\rangle
=\langle af,af\rangle+\frac12\|f\|^2
\ge\frac12\|f\|^2.
$$

これは [MQ2 の変分原理](../MQ2/index.md#thm-mq2-variational-bottom)で期待する下界です。ただし自己共役な閉包を構成する前に、これだけから全スペクトルを語ることはしません。

## 3. 最低エネルギーは Gaussian から始まる

下界 $1/2$ が実際に達成されるには $af=0$ であれば十分です。一次微分方程式

$$
af=0\quad\Longleftrightarrow\quad f'+yf=0
\quad\Longleftrightarrow\quad
\frac{d}{dy}\left(e^{y^2/2}f(y)\right)=0
$$

を解くと $f(y)=Ce^{-y^2/2}$ です。複素係数 $C$ の絶対値を $\|f\|=1$ となるよう定めます。

<a id="prop-mq3-ground-state"></a>

<!-- formal-statement-start -->
> **命題（規格化された最低状態）**  
> $\phi_0(y)=\pi^{-1/4}e^{-y^2/2}\in\mathcal S$ は $\|\phi_0\|=1$、$a\phi_0=0$、$h_{\mathrm{diff}}\phi_0=\frac12\phi_0$ を満たす。さらに $\mathcal S$ 上で $af=0$ の解は $\phi_0$ の定数倍に限られる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

Gaussian 積分を $I=\int_{\mathbb R}e^{-y^2}dy$ と置いて二乗すると、Tonelli の定理で

$$
I^2=\iint_{\mathbb R^2}e^{-(y^2+z^2)}dy\,dz
=\int_0^{2\pi}\!\int_0^\infty e^{-r^2}r\,dr\,d\theta
=2\pi\left[-\frac12e^{-r^2}\right]_0^\infty=\pi.
$$

よって $I=\sqrt\pi$、$\|\phi_0\|^2=\pi^{-1/2}I=1$ です。また $\phi_0'=-y\phi_0$ から $a\phi_0=0$。因数分解に代入して

$$
h_{\mathrm{diff}}\phi_0
=\left(a^\dagger a+\frac12I\right)\phi_0
=\frac12\phi_0.
$$

最後に $af=0$ の方程式を $e^{y^2/2}$ 倍して微分すると定数関数になるので、滑らかな解は $Ce^{-y^2/2}$ のみです。$\square$
<!-- proof-end -->

**意味**：古典的には振幅ゼロで静止してエネルギー $0$ にできますが、この量子系の最低エネルギーは $0$ ではありません。$P$ と $Q$ が交換しないため、同時に位置と運動量を確定して零エネルギーにすることはできません。ただし、この物理的解釈と数学的な下界証明は分けて考えます。

## 4. 演算子を上げ下げして全固有関数を作る

$\phi_0$ に $a^\dagger$ を作用させると新たな固有関数が得られます。正規化係数を落とすと高い準位ほどノルムが変わるので、交換関係を使って一段ずつ追います。

<a id="thm-mq3-ladder"></a>

<!-- formal-statement-start -->
> **定理（ladder 構成）**  
> $\phi_0=\pi^{-1/4}e^{-y^2/2}$ とし、整数 $n\ge0$ に対して
>
> $$
> \phi_n=\frac{(a^\dagger)^n}{\sqrt{n!}}\phi_0
> $$
>
> と定める。各 $\phi_n\in\mathcal S$ であり、
>
> $$
> a\phi_n=\sqrt n\,\phi_{n-1}\ (n\ge1),\quad
> a^\dagger\phi_n=\sqrt{n+1}\,\phi_{n+1},\quad
> h_{\mathrm{diff}}\phi_n=\left(n+\frac12\right)\phi_n
> $$
>
> を満たす。$\|\phi_n\|=1$ かつ $n\ne k$ なら $\langle\phi_n,\phi_k\rangle=0$ である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$a^\dagger$ は $\mathcal S$ を保ち、$\phi_0\in\mathcal S$ なので全 $\phi_n$ が $\mathcal S$ に入ります。まず $[a,a^\dagger]=I$ から帰納法で

$$
a(a^\dagger)^n=(a^\dagger)^n a+n(a^\dagger)^{n-1}
$$

を導きます。$n=1$ は交換関係そのものです。$n$ で成立するとき

$$
\begin{aligned}
a(a^\dagger)^{n+1}
&=\bigl((a^\dagger)^na+n(a^\dagger)^{n-1}\bigr)a^\dagger\\
&=(a^\dagger)^n(a^\dagger a+I)+n(a^\dagger)^n\\
&=(a^\dagger)^{n+1}a+(n+1)(a^\dagger)^n.
\end{aligned}
$$

$\phi_0$ に作用させ、$a\phi_0=0$ を使うと

$$
a\phi_n=\frac{n}{\sqrt{n!}}(a^\dagger)^{n-1}\phi_0
=\sqrt n\,\phi_{n-1}.
$$

定義から $a^\dagger\phi_n=\sqrt{n+1}\phi_{n+1}$ です。従って

$$
a^\dagger a\phi_n
=a^\dagger(\sqrt n\,\phi_{n-1})
=n\phi_n,\qquad
h_{\mathrm{diff}}\phi_n=(n+1/2)\phi_n.
$$

ノルムを証明します。Schwartz 関数上の随伴関係と $aa^\dagger=a^\dagger a+I$ から

$$
\|\phi_{n+1}\|^2
=\frac1{n+1}\|a^\dagger\phi_n\|^2
=\frac1{n+1}\langle\phi_n,aa^\dagger\phi_n\rangle
=\frac{n+1}{n+1}\|\phi_n\|^2.
$$

$\|\phi_0\|=1$ より全て $1$ です。$h_{\mathrm{diff}}$ は $\mathcal S$ 上対称なので、$n\ne k$ に対して

$$
(n+1/2)\langle\phi_k,\phi_n\rangle
=\langle\phi_k,h_{\mathrm{diff}}\phi_n\rangle
=\langle h_{\mathrm{diff}}\phi_k,\phi_n\rangle
=(k+1/2)\langle\phi_k,\phi_n\rangle.
$$

$n-k\ne0$ であるから内積は $0$ です。$\square$
<!-- proof-end -->

### Hermite 多項式を実際に書く

$\phi_n$ は Gaussian と多項式の積です。多項式部分を抜き出すと、なぜ各段で次数が一つ増えるかが見えます。

<a id="def-mq3-hermite-polynomial"></a>

<!-- formal-statement-start -->
> **定義（Hermite 多項式と Hermite 関数）**  
> 整数 $n\ge0$ について
>
> $$
> \mathsf H_n(y)=(-1)^n e^{y^2}\frac{d^n}{dy^n}e^{-y^2},
> \qquad
> \phi_n(y)=\frac{\mathsf H_n(y)e^{-y^2/2}}{\pi^{1/4}\sqrt{2^nn!}}
> $$
>
> と書く。ここで $\mathsf H_n$ は物理学者の Hermite 多項式であり、$\phi_n$ は規格化 Hermite 関数である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mq3-hermite-polynomial -->
**定義の確認** $n=0$ では $\mathsf H_0=1$。$n=1$ では $-(e^{-y^2})'e^{y^2}=2y$ です。$n=2$ は

$$
(e^{-y^2})''=(-2+4y^2)e^{-y^2},\qquad
\mathsf H_2=4y^2-2.
$$

従って

$$
\phi_1(y)=\sqrt2\,y\phi_0(y),\qquad
\phi_2(y)=\frac{2y^2-1}{\sqrt2}\,\phi_0(y).
$$

特に $\phi_1$ は奇関数、$\phi_2$ は偶関数です。
<!-- definition-example-end -->

<a id="prop-mq3-hermite-formula"></a>

<!-- formal-statement-start -->
> **命題（ladder 構成と Rodrigues 公式の一致）**  
> 上の $\mathsf H_n$ は次数 $n$、最高次係数 $2^n$ の多項式であり、
>
> $$
> \mathsf H_{n+1}=2y\mathsf H_n-\mathsf H_n',
> \qquad
> (a^\dagger)^n\phi_0=2^{-n/2}\mathsf H_n\phi_0
> $$
>
> が成立する。従って二つの $\phi_n$ の表示は一致する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$g=e^{-y^2}$、$D=d/dy$ と書くと、$\mathsf H_n=(-1)^n g^{-1}D^ng$ です。$g'=-2yg$ と Leibniz 則を用いて

$$
\begin{aligned}
\mathsf H_n'
&=(-1)^n\left(2yg^{-1}D^ng+g^{-1}D^{n+1}g\right)\\
&=2y\mathsf H_n-\mathsf H_{n+1}.
\end{aligned}
$$

従って $\mathsf H_{n+1}=2y\mathsf H_n-\mathsf H_n'$。$\mathsf H_0=1$ からの帰納法で最高次係数は各段 $2$ 倍され、次数は $n$ です。一方、任意の多項式 $p$ に

$$
a^\dagger(p\phi_0)
=\frac1{\sqrt2}\left(yp\phi_0-p'\phi_0-p\phi_0'\right)
=\frac{(2yp-p')\phi_0}{\sqrt2}
$$

なので $p=\mathsf H_n$ と置き、上の漸化式から
$(a^\dagger)^{n+1}\phi_0=2^{-(n+1)/2}\mathsf H_{n+1}\phi_0$ が従います。基底 $n=0$ も成立し帰納法が閉じます。$\square$
<!-- proof-end -->

## 5. 完全性：作った状態だけで空間を張るか

ここまでで**無限個の互いに直交する固有関数**を作りました。しかし、それらの直交補空間に別の固有関数や連続スペクトルが隠れていないかは未解決です。この節はその隙間を埋めます。

<a id="thm-mq3-hermite-complete"></a>

<!-- formal-statement-start -->
> **定理（Hermite 関数の完全性）**  
> $\{\phi_n:n=0,1,2,\ldots\}$ は $L^2(\mathbb R,dy)$ の完全正規直交系である。すなわち $f\in L^2$ が全 $n\ge0$ で $\langle\phi_n,f\rangle=0$ を満たすなら $f=0$ である。
<!-- formal-statement-end -->

証明の要点は、「全ての多項式と Gaussian の積」に直交する関数から、Fourier 変換の全ての微分係数が零になる関数を作ることです。

<!-- proof-start -->
### 証明

前命題で $\mathsf H_n$ は次数 $n$、最高次係数 $2^n\ne0$ でした。従って $n=0,\ldots,N$ の $\mathsf H_n$ は次数 $N$ 以下の多項式空間の基底です。全 $\phi_n$ に直交する $f$ は、任意の整数 $k\ge0$ に対し

$$
\int_{\mathbb R}y^k e^{-y^2/2}f(y)\,dy=0
$$

を満たします。複素共役をどちらに置いても、実数値の $\phi_n$ への直交を共役に取り直せば同じ結論です。

$g(y)=e^{-y^2/2}f(y)$ と置きます。[Cauchy–Schwarz](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz) によって任意の $R\ge0$、整数 $k\ge0$ に

$$
\int |y|^k e^{R|y|}|g(y)|\,dy
\le\|f\|_2\left(\int |y|^{2k}e^{-y^2+2R|y|}dy\right)^{1/2}<\infty.
$$

実際 $-y^2+2R|y|=-(|y|-R)^2+R^2$ で、任意の多項式を掛けても積分可能です。そこで複素数 $z$ に対して

$$
F(z)=\int_{\mathbb R}e^{-izy}g(y)\,dy
$$

を定めると、$z$ の有界領域で指数関数とその全ての $z$ 微分が上の積分可能な関数で支配されます。従って積分の下で微分できて $F$ は整関数であり、

$$
F^{(k)}(0)=\int_{\mathbb R}(-iy)^kg(y)\,dy=0
\qquad(k=0,1,2,\ldots).
$$

正則関数の Taylor 展開から $F(z)=0$ が全 $z\in\mathbb C$ で成立します。特に実数周波数上で $F=0$ です。$g\in L^1(\mathbb R)$ に対する Fourier 変換の一意性（[FOU4 の Fourier 理論](../FOU4/index.md)）から $g=0$ がほとんど至る所で成立します。$e^{-y^2/2}>0$ は全ての実数 $y$ で零でないため $f=0$ です。

先ほど証明した正規直交性と合わせ、$\{\phi_n\}$ は完全正規直交系です。$\square$
<!-- proof-end -->

**完全性と自己共役性は別々の主張**です。完全正規直交系ができたので、次に「固有値を対角に掛ける最大作用素」を作り、最初の微分式と一致することを証明します。

## 6. 自己共役 Hamiltonian と全スペクトル

<a id="thm-mq3-selfadjoint-spectrum"></a>

<!-- formal-statement-start -->
> **定理（量子調和振動子の自己共役性と全スペクトル）**  
> $m,\omega,\hbar>0$ とし、$H_{\mathrm{diff}}= -\hbar^2 d^2/(2m\,dx^2)+m\omega^2x^2/2$ を $\mathcal S(\mathbb R)$ 上に定める。この対称作用素は本質的自己共役であり、その閉包 $H$ の定義域は、$\psi_n=U^{-1}\phi_n$ として
>
> $$
> D(H)=\left\{\psi=\sum_{n=0}^\infty c_n\psi_n:
> \sum_{n=0}^\infty\left[\hbar\omega\left(n+\frac12\right)\right]^2|c_n|^2<\infty\right\}
> $$
>
> である。この定義域上で $H\psi=\sum_{n=0}^\infty \hbar\omega(n+\frac12)c_n\psi_n$ となり、
>
> $$
> \sigma(H)=\sigma_{\mathrm p}(H)
> =\left\{\hbar\omega\left(n+\frac12\right):n=0,1,2,\ldots\right\},
> \qquad \sigma_{\mathrm{ess}}(H)=\varnothing.
> $$
>
> 各固有値は重複度 $1$ であり、$(H-iI)^{-1}$ はコンパクトである。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $\phi_n$ が完全正規直交系であることから、

$$
W:L^2(\mathbb R,dy)\longrightarrow\ell^2(\mathbb N_0),
\qquad (Wf)_n=\langle\phi_n,f\rangle
$$

はユニタリです（内積は第2変数線形）。$\lambda_n=n+1/2$ と置き、$\ell^2$ 上に

$$
D(M_\lambda)=\{c\in\ell^2:(\lambda_nc_n)_n\in\ell^2\},
\qquad(M_\lambda c)_n=\lambda_nc_n
$$

を定めます。$\lambda_n$ は全て実数なので、この最大対角作用素は自己共役です。確認のため随伴を直接取ります。$d\in D(M_\lambda^*)$ ならある $b\in\ell^2$ が存在し、有限台の任意の $c$ について

$$
\langle M_\lambda c,d\rangle=\langle c,b\rangle.
$$

$c=e_n$ を代入すると $b_n=\lambda_nd_n$ となります。$b\in\ell^2$ なので $(\lambda_nd_n)\in\ell^2$、すなわち $d\in D(M_\lambda)$ です。逆包含は対称性から従うため $M_\lambda^*=M_\lambda$ です。ここで $h=W^{-1}M_\lambda W$ は自己共役です。

次に元の微分作用素との一致を示します。任意の $f\in\mathcal S$ について $h_{\mathrm{diff}}f\in\mathcal S\subset L^2$ です。部分積分の境界項は Schwartz 性で消えるので、

$$
\langle\phi_n,h_{\mathrm{diff}}f\rangle
=\langle h_{\mathrm{diff}}\phi_n,f\rangle
=\lambda_n\langle\phi_n,f\rangle.
$$

Parseval の等式により

$$
\sum_{n=0}^\infty \lambda_n^2|\langle\phi_n,f\rangle|^2
=\sum_{n=0}^\infty|\langle\phi_n,h_{\mathrm{diff}}f\rangle|^2
=\|h_{\mathrm{diff}}f\|_2^2<\infty.
$$

よって $f\in D(h)$、$hf=h_{\mathrm{diff}}f$ です。逆に、任意の $f\in D(h)$ の部分和 $f_N=\sum_{n=0}^N\langle\phi_n,f\rangle\phi_n$ は $\mathcal S$ に属し、

$$
\|f-f_N\|_2^2+\|h(f-f_N)\|_2^2
=\sum_{n>N}(1+\lambda_n^2)|\langle\phi_n,f\rangle|^2
\longrightarrow0
$$

となります。従って $\mathcal S$ は $h$ の core です。$h_{\mathrm{diff}}\subset h$ と core 性から $\overline{h_{\mathrm{diff}}}=h$ が従い、本質的自己共役性を得ます。物理単位へ戻すと $H=\hbar\omega U^{-1}hU$ で、定理の作用素定義域と作用式になります。

スペクトルを調べます。$z\notin\{\lambda_n\}$ なら、この集合は離散的で無限遠へ逃げるため $d=\inf_n|\lambda_n-z|>0$ です。$\ell^2$ 上で $(R_zb)_n=b_n/(\lambda_n-z)$ と定めると $\|R_z\|\le1/d$、さらに

$$
\frac{\lambda_n}{\lambda_n-z}=1+\frac{z}{\lambda_n-z}
$$

は $n$ に関して有界なので $R_zb\in D(M_\lambda)$ です。$(M_\lambda-z)R_zb=b$ と $R_z(M_\lambda-z)c=c$ が成立し、$z$ はレゾルベントに属します。一方、各 $\lambda_n$ は $\phi_n$ の固有値でスペクトルに入ります。他にスペクトルはありません。異なる $\lambda_n$ は異なるため、固有空間は $\phi_n$ の一次元です。

最後に $(M_\lambda-i)^{-1}$ は対角成分 $(\lambda_n-i)^{-1}$ を持ち、$n\to\infty$ で零に収束します。$n\le N$ の成分のみ残した有限ランク作用素 $R_N$ に対し

$$
\|(M_\lambda-i)^{-1}-R_N\|
=\sup_{n>N}\frac1{|\lambda_n-i|}
\longrightarrow0.
$$

従ってレゾルベントはコンパクトです。全固有値は孤立し一次元なので [本質スペクトルの定義](../MQ1/index.md#def-mq1-essential-spectrum)から $\sigma_{\mathrm{ess}}(H)=\varnothing$ です。$\square$
<!-- proof-end -->

### 基底状態と二次形式を同じ計算で確認する

上の固有展開から $\psi=\sum c_n\psi_n\in D(H)$ なら

$$
\begin{aligned}
\langle\psi,H\psi\rangle
&=\hbar\omega\sum_{n\ge0}\left(n+\frac12\right)|c_n|^2\\
&=\frac12\hbar\omega\|\psi\|^2
+\hbar\omega\sum_{n\ge1}n|c_n|^2
\ge\frac12\hbar\omega\|\psi\|^2.
\end{aligned}
$$

等号は $c_n=0$（$n\ge1$）の場合に限ります。従って [MQ2 の最小化状態と固有状態](../MQ2/index.md#thm-mq2-ground-minimizer)により、$\psi_0$ は位相因子を除いて唯一の規格化基底状態です。形式定義域は、同じスペクトル関数計算から

$$
Q(H)=\left\{\sum c_n\psi_n:
\sum_{n\ge0}\hbar\omega(n+1/2)|c_n|^2<\infty\right\}
$$

です。**形式定義域と作用素定義域では固有値の重みが一次と二次で異なります**。

### Schrödinger 方程式からの直接解との比較

$h_{\mathrm{diff}}f=\varepsilon f$ を滑らかな関数について書くと

$$
-f''+y^2f=2\varepsilon f.
$$

$f=e^{-y^2/2}p$ と置き、積を二回微分すると

$$
f'=e^{-y^2/2}(p'-yp),\quad
f''=e^{-y^2/2}\bigl(p''-2yp'+(y^2-1)p\bigr).
$$

代入して Gaussian 因子で割ると

$$
p''-2yp'+(2\varepsilon-1)p=0.
$$

$p=\sum_{k=0}^\infty c_ky^k$ を代入し、各 $y^k$ の係数を比較すれば

$$
(k+2)(k+1)c_{k+2}+(2\varepsilon-1-2k)c_k=0,
\qquad
c_{k+2}=\frac{2k+1-2\varepsilon}{(k+2)(k+1)}c_k.
$$

特に次数 $n$ の非零多項式解を望むなら、その最高次 $c_n\ne0$ に対して $2\varepsilon-1-2n=0$、すなわち $\varepsilon=n+1/2$ が必要です。このとき Rodrigues 公式の $\mathsf H_n$ が実際に解を与えます。**級数が打ち切れないだけで $L^2$ 解が存在しない、とここで飛躍してはいけません**。その排除を確実にするのが、上で証明した完全性・自己共役性・レゾルベントの構成です。

### 物理単位と時間発展

$\psi_n(x)=\ell^{-1/2}\phi_n(x/\ell)$ なので、例えば

$$
\psi_0(x)=\frac1{\pi^{1/4}\sqrt\ell}\exp\left(-\frac{x^2}{2\ell^2}\right),\quad
\psi_1(x)=\frac{\sqrt2\,x}{\ell}\psi_0(x).
$$

エネルギーは $E_n=\hbar\omega(n+1/2)$、隣接準位の間隔は $E_{n+1}-E_n=\hbar\omega$ です。Stone の定理による [Schrödinger 時間発展](../QM7/index.md)から、有限個の固有関数の重ね合わせ $\Psi(0)=\sum_{n=0}^N c_n\psi_n$ は

$$
\Psi(t)=e^{-itH/\hbar}\Psi(0)
=\sum_{n=0}^N c_ne^{-i\omega(n+1/2)t}\psi_n
$$

となります。単一準位は全体位相しか変化せず、重ね合わせでは準位間の**相対位相**が時間とともに変わります。

## 7. 演習

### Level A

### A1. 無次元化の係数を追う

$m,\omega,\hbar>0$ とし、$\ell=\sqrt{\hbar/(m\omega)}$、$(U\psi)(y)=\sqrt\ell\,\psi(\ell y)$ とする。$U^{-1}$ を求め、$U(-\hbar^2d^2/(2m\,dx^2)+m\omega^2x^2/2)U^{-1}$ を $\mathcal S$ 上で計算せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$y=x/\ell$ を逆代入すると $(U^{-1}f)(x)=\ell^{-1/2}f(x/\ell)$ です。$\int\ell|\psi(\ell y)|^2dy=\int|\psi(x)|^2dx$ なので $U$ は等長で、逆作用も全空間上に定義されるからユニタリです。$f\in\mathcal S$ に対し

$$
\frac{d}{dx}U^{-1}f=\ell^{-3/2}f'(x/\ell),\qquad
\frac{d^2}{dx^2}U^{-1}f=\ell^{-5/2}f''(x/\ell).
$$

従って

$$
UH_{\mathrm{diff}}U^{-1}f
=-\frac{\hbar^2}{2m\ell^2}f''+\frac12m\omega^2\ell^2y^2f
=\frac{\hbar\omega}{2}(-f''+y^2f).
$$

最後の等号では $\ell^2=\hbar/(m\omega)$ を両係数へ別々に代入しました。
<!-- solution-end -->

### A2. 交換関係を微分から確かめる

$f\in\mathcal S(\mathbb R)$ に対し $a=(y+\partial_y)/\sqrt2$、$a^\dagger=(y-\partial_y)/\sqrt2$ とする。$[a,a^\dagger]f=f$ を展開で証明せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

積の微分 $(yf)'=f+yf'$ を使って

$$
\begin{aligned}
2aa^\dagger f&=(y+\partial_y)(yf-f')
=y^2f-yf'+f+yf'-f''=(y^2+1)f-f'',\\
2a^\dagger af&=(y-\partial_y)(yf+f')
=y^2f+yf'-f-yf'-f''=(y^2-1)f-f''.
\end{aligned}
$$

両者の差を取ると $2(aa^\dagger-a^\dagger a)f=2f$ なので $[a,a^\dagger]f=f$ です。$f\in\mathcal S$ によって両積が定義されることも確認できます。
<!-- solution-end -->

### A3. 最低状態を微分方程式から求める

$a=(y+\partial_y)/\sqrt2$ とする。$af=0$ の滑らかな $L^2(\mathbb R)$ 解を求め、規格化せよ。また $h_{\mathrm{diff}}=a^\dagger a+1/2$ を使ってエネルギーを求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$af=0$ は $f'+yf=0$ です。積の微分から $(e^{y^2/2}f)'=e^{y^2/2}(f'+yf)=0$ なので $f=Ce^{-y^2/2}$。ノルムは $\|f\|^2=|C|^2\int e^{-y^2}dy=|C|^2\sqrt\pi$ です。$C=\pi^{-1/4}$ と選ぶと $\|f\|=1$。そして

$$
h_{\mathrm{diff}}f
=a^\dagger(af)+\frac12f
=a^\dagger0+\frac12f=\frac12f.
$$

よって無次元エネルギーは $1/2$、物理的には $\hbar\omega/2$ です。
<!-- solution-end -->

### A4. 最初の三つの波動関数

規格化した $\phi_0=\pi^{-1/4}e^{-y^2/2}$ に $a^\dagger=(y-\partial_y)/\sqrt2$ を作用させ、$\phi_1=a^\dagger\phi_0$ と $\phi_2=(a^\dagger)^2\phi_0/\sqrt2$ を求めよ。$\phi_2$ のノルムを Gaussian 積分で検算せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$\phi_0'=-y\phi_0$ なので

$$
\phi_1=(y\phi_0-\phi_0')/\sqrt2=\sqrt2\,y\phi_0.
$$

次に $\phi_1'=\sqrt2(\phi_0+y\phi_0')=\sqrt2(1-y^2)\phi_0$。従って

$$
a^\dagger\phi_1
=\frac1{\sqrt2}\bigl(y\sqrt2y\phi_0-\sqrt2(1-y^2)\phi_0\bigr)
=(2y^2-1)\phi_0,
$$

ゆえに $\phi_2=(2y^2-1)\phi_0/\sqrt2$ です。部分積分で $I_{2j}=\int y^{2j}e^{-y^2}dy$ と置くと

$$
I_0=\sqrt\pi,\quad
I_2=\frac12I_0,\quad
I_4=\frac32I_2=\frac34\sqrt\pi.
$$

これらを代入して

$$
\|\phi_2\|^2=\frac1{2\sqrt\pi}\int(4y^4-4y^2+1)e^{-y^2}dy
=\frac12\left(4\cdot\frac34-4\cdot\frac12+1\right)=1.
$$
<!-- solution-end -->

### Level B

### B1. 基底状態の位置・運動量分散

$m,\omega,\hbar>0$、$\ell^2=\hbar/(m\omega)$、$\psi_0(x)=\pi^{-1/4}\ell^{-1/2}e^{-x^2/(2\ell^2)}$ とする。$Q\psi=x\psi$、$P\psi=-i\hbar\psi'$ に対して $\langle Q\rangle,\langle P\rangle,\langle Q^2\rangle,\langle P^2\rangle$ を計算し、運動・位置エネルギーの期待値を比較せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$|\psi_0|^2=(\sqrt\pi\ell)^{-1}e^{-x^2/\ell^2}$ は偶関数なので $\langle Q\rangle=0$。$\psi_0'=-x\psi_0/\ell^2$ は奇関数で $\langle P\rangle=-i\hbar\int\psi_0\psi_0'dx=0$ です。$y=x/\ell$ と置換し、$\int y^2e^{-y^2}dy=\sqrt\pi/2$ から

$$
\langle Q^2\rangle
=\frac1{\sqrt\pi\ell}\int x^2e^{-x^2/\ell^2}dx
=\frac{\ell^2}{\sqrt\pi}\int y^2e^{-y^2}dy
=\frac{\ell^2}{2}.
$$

$\psi_0''=(x^2/\ell^4-1/\ell^2)\psi_0$ なので、$P^2\psi_0=-\hbar^2\psi_0''$ を使うと

$$
\begin{aligned}
\langle P^2\rangle
&=-\hbar^2\int\psi_0\psi_0''dx\\
&=\hbar^2\left(\frac1{\ell^2}\|\psi_0\|^2-\frac1{\ell^4}\langle Q^2\rangle\right)
=\hbar^2\left(\frac1{\ell^2}-\frac1{2\ell^2}\right)
=\frac{\hbar^2}{2\ell^2}.
\end{aligned}
$$

従って運動項は $\langle P^2/(2m)\rangle=\hbar^2/(4m\ell^2)=\hbar\omega/4$、位置項は $m\omega^2\langle Q^2\rangle/2=m\omega^2\ell^2/4=\hbar\omega/4$。両者の和は $\hbar\omega/2$ です。また $\Delta Q\,\Delta P=(\ell/\sqrt2)(\hbar/(\sqrt2\ell))=\hbar/2$ で、不確定性関係の等号例です。
<!-- solution-end -->

### B2. 二準位の重ね合わせと時間発展

$H\psi_n=E_n\psi_n$、$E_n=\hbar\omega(n+1/2)$、$\{\psi_n\}$ は正規直交とする。初期状態 $\Psi(0)=(\psi_0+\psi_2)/\sqrt2$ について、$\Psi(t)$、エネルギー期待値と分散を求め、$\Psi(t)$ が一般には単一の定常固有状態でないことを説明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

各固有ベクトル上で $e^{-itH/\hbar}\psi_n=e^{-itE_n/\hbar}\psi_n$ なので

$$
\Psi(t)=\frac1{\sqrt2}
\left(e^{-i\omega t/2}\psi_0+e^{-5i\omega t/2}\psi_2\right).
$$

$E_0=\hbar\omega/2$、$E_2=5\hbar\omega/2$ であり、直交性により交差内積は零です。従って

$$
\langle H\rangle
=\frac12(E_0+E_2)=\frac32\hbar\omega,\qquad
\langle H^2\rangle
=\frac12(E_0^2+E_2^2)=\frac{13}{4}(\hbar\omega)^2.
$$

分散は

$$
(\Delta H)^2=\langle H^2\rangle-\langle H\rangle^2
=\left(\frac{13}4-\frac94\right)(\hbar\omega)^2
=(\hbar\omega)^2.
$$

二つの係数の比は $e^{-2i\omega t}$ と時間で変わるので、全体位相一つでは表せません。各エネルギーの測定確率 $1/2$ は一定でも、位置測定には相対位相による干渉が生じます。
<!-- solution-end -->

### B3. 微分方程式の多項式解を探す

$h_{\mathrm{diff}}f=\varepsilon f$、$f=e^{-y^2/2}p(y)$ と置く。$p$ が二次多項式で最高次係数が零でないと仮定し、$\varepsilon$ と $p$ の形を導け。規格化した固有関数を示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

積の微分で $f''=e^{-y^2/2}(p''-2yp'+(y^2-1)p)$ となるので、元の式に代入して $p''-2yp'+(2\varepsilon-1)p=0$。$p=Ay^2+By+C$、$A\ne0$ とすると $p'=2Ay+B$、$p''=2A$ なので、

$$
2A-2y(2Ay+B)+(2\varepsilon-1)(Ay^2+By+C)=0.
$$

係数比較より

$$
A(2\varepsilon-5)=0,\qquad
B(2\varepsilon-3)=0,\qquad
2A+(2\varepsilon-1)C=0.
$$

$A\ne0$ より $\varepsilon=5/2$。第二式から $B=0$、第三式から $2A+4C=0$、従って $C=-A/2$ です。$A=2$ と取れば $p=2y^2-1$。本文 A4 の積分で $\|(2y^2-1)\phi_0\|^2=2$ なので

$$
f(y)=\frac{2y^2-1}{\sqrt2\,\pi^{1/4}}e^{-y^2/2}
$$

が規格化固有関数です。多項式解が存在することと、それ以外の $L^2$ 解を排除することは別で、後者には完全性と自己共役性が必要です。
<!-- solution-end -->

### B4. 形式定義域と作用素定義域の違い

調和振動子の固有系 $\{\psi_n\}_{n\ge0}$ と $E_n=\hbar\omega(n+1/2)$ が与えられているとする。$C>0$ を $C^{-2}=\sum_{n=0}^\infty(n+1)^{-3}$ で定め、

$$
\Psi=C\sum_{n=0}^\infty\frac{\psi_n}{(n+1)^{3/2}}
$$

と置く。$\|\Psi\|=1$ を確認し、$\Psi\in Q(H)$ だが $\Psi\notin D(H)$ であることを比較判定法で示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$\sum(n+1)^{-3}$ は収束する正の級数なので $C$ が定義でき、Parseval により

$$
\|\Psi\|^2=C^2\sum_{n=0}^\infty(n+1)^{-3}=1.
$$

[MQ2 の閉形式](../MQ2/index.md#def-mq2-closed-form)と本文の固有展開により、$Q(H)$ に属する条件は $\sum E_n|c_n|^2<\infty$ です。この $\Psi$ では

$$
\sum E_n|c_n|^2
=C^2\hbar\omega\sum_{n=0}^\infty\frac{n+1/2}{(n+1)^3}
\le C^2\hbar\omega\sum_{n=0}^\infty\frac1{(n+1)^2}<\infty.
$$

一方 $D(H)$ に属するには $\sum E_n^2|c_n|^2<\infty$ が必要ですが、

$$
\sum E_n^2|c_n|^2
=C^2(\hbar\omega)^2\sum_{n=0}^\infty\frac{(n+1/2)^2}{(n+1)^3}
\ge\frac{C^2(\hbar\omega)^2}{4}\sum_{n=0}^\infty\frac1{n+1}
=\infty,
$$

ここで $n+1/2\ge(n+1)/2$ を使いました。従って形式期待値は有限ですが $H\Psi$ を $L^2$ のベクトルとして定義できません。
<!-- solution-end -->

### Level C

### C1. 自己共役性・固有状態・時間発展を結び付ける

$L^2(\mathbb R,dx)$ 上の $\mathcal S$ に $H_{\mathrm{diff}}=-\hbar^2d^2/(2m\,dx^2)+m\omega^2x^2/2$、$m,\omega,\hbar>0$ を考える。

1. $\ell^2=\hbar/(m\omega)$ で無次元化し、$h_{\mathrm{diff}}=a^\dagger a+1/2$ を導け。
2. $a\phi_0=0$ から規格化 $\psi_0(x)$ を求め、物理エネルギーの最小値を示せ。
3. $\phi_n=(a^\dagger)^n\phi_0/\sqrt{n!}$ の固有値・ノルムを示し、**それらだけでスペクトルが尽くされる**と結論するのに追加で何を証明すべきか述べよ。
4. 追加の完全性の証明を使い、$H=\overline{H_{\mathrm{diff}}}$ の定義域、全スペクトルと本質スペクトルを書け。
5. $\Psi(0)=(\psi_0+\psi_1)/\sqrt2$ を時間発展させ、エネルギー期待値と測定確率を求めよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

(1) $(Uf)(y)=\sqrt\ell f(\ell y)$ とし、$(U^{-1}f)(x)=\ell^{-1/2}f(x/\ell)$ を二回微分すると

$$
UH_{\mathrm{diff}}U^{-1}
=-\frac{\hbar^2}{2m\ell^2}\partial_y^2
+\frac12m\omega^2\ell^2y^2
=\frac{\hbar\omega}2(-\partial_y^2+y^2).
$$

$a=(y+\partial_y)/\sqrt2$、$a^\dagger=(y-\partial_y)/\sqrt2$ の積は

$$
a^\dagger af=\tfrac12(y^2f-f-f'')
$$

なので $h_{\mathrm{diff}}=a^\dagger a+1/2$ です。

(2) $af=0$ は $f'+yf=0$、従って $f=Ce^{-y^2/2}$。$\int e^{-y^2}dy=\sqrt\pi$ から $C=\pi^{-1/4}$ を取ります。逆変換すると

$$
\psi_0(x)=\pi^{-1/4}\ell^{-1/2}e^{-x^2/(2\ell^2)}.
$$

$\langle f,h_{\mathrm{diff}}f\rangle=\|af\|^2+\frac12\|f\|^2\ge\frac12\|f\|^2$ で $\phi_0$ が等号を達成し、自己共役な閉包にもこの下界が引き継がれます。従って $E_0=\hbar\omega/2$ です。

(3) $[a,a^\dagger]=I$ を反復すると $a(a^\dagger)^n=(a^\dagger)^na+n(a^\dagger)^{n-1}$。$a\phi_0=0$ を代入して $a\phi_n=\sqrt n\phi_{n-1}$、$a^\dagger\phi_n=\sqrt{n+1}\phi_{n+1}$ です。よって $a^\dagger a\phi_n=n\phi_n$ と

$$
H\psi_n=\hbar\omega\left(n+\tfrac12\right)\psi_n.
$$

随伴関係を使い $\|\phi_{n+1}\|^2=(n+1)^{-1}\langle\phi_n,aa^\dagger\phi_n\rangle=\|\phi_n\|^2$ であり、初項は $1$ なので全て規格化されています。ただし、構成した系の**完全性**がなければ、直交補空間に別のスペクトルが残る可能性があります。

(4) 本文の Hermite 完全性定理では、全 $\phi_n$ に直交する $f$ について $g=e^{-y^2/2}f$ の Fourier 変換 $F(z)=\int e^{-izy}g(y)dy$ の全ての導関数が $F^{(k)}(0)=(-i)^k\int y^kg(y)dy=0$ となるため、整関数 $F$ は恒等的に零となり、Fourier 一意性で $f=0$ と証明しました。この完全性から $H$ は $\psi_n$ 基底で実対角乗算へユニタリ同値です。従って

$$
D(H)=\left\{\sum c_n\psi_n:
\sum [\hbar\omega(n+1/2)]^2|c_n|^2<\infty\right\}.
$$

有限部分和は Schwartz に属し $\sum_{n>N}(1+E_n^2)|c_n|^2\to0$ なので $\mathcal S$ は core、閉包は自己共役です。また $z$ が固有値列の外なら $(E_n-z)^{-1}$ は有界で $\frac{E_n}{E_n-z}$ も有界、対角逆作用素が存在します。従って

$$
\sigma(H)=\{\,\hbar\omega(n+\tfrac12):n\ge0\,\},\qquad
\sigma_{\mathrm{ess}}(H)=\varnothing.
$$

固有値は一重で孤立しています。

(5) $E_0=\hbar\omega/2$、$E_1=3\hbar\omega/2$ を用いると

$$
\Psi(t)=\frac1{\sqrt2}
\left(e^{-i\omega t/2}\psi_0+e^{-3i\omega t/2}\psi_1\right).
$$

直交性により $\|\Psi(t)\|=1$、各固有値を測る確率は $|1/\sqrt2|^2=1/2$ です。期待値は

$$
\langle H\rangle=\frac12(E_0+E_1)
=\frac12\left(\frac12+\frac32\right)\hbar\omega
=\hbar\omega.
$$

ユニタリな時間発展は各係数の絶対値を変えないため、エネルギー分布と平均値は時間に依存しません。
<!-- solution-end -->

## 8. 何が分かったか

調和振動子の量子化では、古典 Hamiltonian を形式的に演算子へ置き換えるだけでは不十分です。Schwartz 空間上での因数分解と ladder 構成から $\phi_n$ と $E_n$ を求め、Hermite 関数の完全性、対角作用素の自己共役性、core の稠密性、レゾルベントの構成を順に確認して初めて**全スペクトル**が確定しました。

調和振動子は純離散スペクトルを持つ一方、[MQ1 の自由粒子](../MQ1/index.md#thm-mq1-free-spectrum)は連続スペクトルだけを持ちます。次の MQ4 では、中心力と Coulomb ポテンシャルによって、束縛準位と連続スペクトルが共存する模型を調べます。
