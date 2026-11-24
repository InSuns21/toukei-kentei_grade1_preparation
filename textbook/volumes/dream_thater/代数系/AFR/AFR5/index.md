# AFR5 Eisenstein級数と関数等式

前講では、Maass形式の非零周波数に現れる高さ方向の関数を求めました。しかし定数項を消さない保型関数も重要です。高さのべき $y^s$ を群の作用で移したものを足し合わせると、離散的な格子和から連続的なパラメータ $s$ を持つ固有関数が得られます。本講の目標は、この和を収束する半平面で作り、その横方向の平均と振動を計算して、元の和が収束しない領域にまで関数を延ばすことです。

<!-- definition-example-audit: strict -->

## 1. 高さを群で移して足す

$z=x+iy$、$y>0$ とします。整数 $c,d$ の最大公約数が1である組を原始的な組とします。Bézoutの等式で $ad-bc=1$ となる整数 $a,b$ が取れます。[実特殊線形群の上半平面への作用](../AFR1/index.md#def-afr1-real-group)により、この行列で移した点の高さは $y/|cz+d|^2$ です。同じ下段を持つ行列は同じ高さを与えます。下段を符号反転しても高さは変わらないので、全ての原始的な組を数えるときは2で割ります。

<a id="def-afr5-eisenstein"></a>
<!-- formal-statement-start -->
> **定義（非正則Eisenstein級数）**  
> 上半平面の点 $z=x+iy$ と複素数 $s$（$\Re s>1$）に対し、全モジュラー群の重さ0の級数を

$$
E(z,s)=\frac12\sum_{\substack{c,d\in\mathbb Z\\\gcd(c,d)=1}}
\frac{y^s}{|cz+d|^{2s}}
$$

> とする。正の実数の複素べきは実対数で定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-afr5-eisenstein -->
**定義の確認。** $z=i,s=2$ では各項は $(c^2+d^2)^{-2}$ です。$(0,\pm1),(\pm1,0)$ の4組の寄与は合計2、$(\pm1,\pm1)$ の4組の寄与は $4/(2\cdot4)=1/2$ です。原始的でない $(2,0)$ は含めません。$\max(|c|,|d|)=k$ の整数組は高々 $8k$ 個、各項は $k^{-4}$ 以下なので、全体の絶対値の和は $4\sum_{k\ge1}k^{-3}$ 以下です。確かに定義条件を満たす有限値が得られ、$E(i,2)>5/2$ です。
<!-- definition-example-end -->

原始的という条件を外した格子和を考えると、正の整数倍に当たる寄与が [Riemann ζ 関数](../../../解析系/CA/CA12/index.md#def-ca12-riemann-zeta) にまとまります。これが正規化の第一段階です。

<a id="thm-afr5-convergence"></a>
<!-- formal-statement-start -->
> **定理（Eisenstein級数の収束と固有方程式）**  
> $\Re s>1$ において $E(z,s)$ は局所一様絶対収束し、$s$ に関して正則、$z$ に関して滑らかである。任意の $\gamma\in SL_2(\mathbb Z)$ について

$$
E(\gamma z,s)=E(z,s),\qquad
\Delta_{\mathbb H} E(z,s)=s(1-s)E(z,s).
$$

> また次の格子和表示が成立する。

$$
\zeta(2s)E(z,s)=\frac12\sum_{(c,d)\ne(0,0)}
\left(\frac{y}{|cz+d|^2}\right)^s.
$$
<!-- formal-statement-end -->

### 証明の見取り図

格子を正方形の殻に分けて収束を確認し、群の作用が原始的な組を並べ替えることを使います。固有方程式は [双曲Laplace作用素の群作用との可換性](../AFR2/index.md#thm-afr2-laplacian-equivariance) により、高さのべきの二階微分に帰着します。

<!-- proof-start -->
### 証明

$z$ のコンパクト集合上では、$|cz+d|^2=(cx+d)^2+c^2y^2$ は $c^2+d^2$ の定数倍で上下から抑えられます。実際 $c=(cy)/y$、$d=(cx+d)-x(cy)/y$ であり、$x,1/y$ が有界です。$s$ のコンパクト集合で $\Re s\ge1+\epsilon$ とすれば、定数 $C$ により各項は $C k^{-2-2\epsilon}$ 以下です。殻の個数 $8k$ を掛けた和は収束します。各項は $s$ の整関数なので局所一様収束から正則です。

$z$ 微分について、二次形式 $Q=|cz+d|^2$ の一階・二階偏微分は $O(k^2)$、それ以上は0です。$Q\ge C_0k^2$ なので、任意の固定階の $Q^{-s}$ の微分は、$Q^{-s}$ に $s$ の多項式と $Q$ の微分を $Q$ で割った有界因子を掛けた和です。$y^s$ の微分もコンパクト集合上で有界なので、各固定階の微分級数にも同じ収束評価が使えます。

$\gamma=\begin{pmatrix}a&b\\p&q\end{pmatrix}$ に対し、虚部の式を代入すると

$$
\frac{\Im(\gamma z)}{|c\gamma z+d|^2}
=\frac{y}{|(ca+dp)z+(cb+dq)|^2}.
$$

右から $\gamma$ を掛ける写像は整数逆行列を持つので原始的な組を全単射で移します。絶対収束により並べ替えても値が同じです。

各原始的な組に対し、それを下段とする行列 $h$ を選びます。[双曲Laplace作用素](../AFR2/index.md#def-afr2-laplacian) は $-y^2(\partial_x^2+\partial_y^2)$ ですから、

$$
\Delta_{\mathbb H}y^s=-s(s-1)y^s.
$$

[群作用との可換性](../AFR2/index.md#thm-afr2-laplacian-equivariance) を $y^s$ と $h$ に適用し、二階微分級数の局所一様収束により和を取ると固有方程式になります。

最後に任意の非零整数組を一意に $(c,d)=k(c_0,d_0)$（$k=\gcd(|c|,|d|)>0$、原始的な組 $(c_0,d_0)$）と書きます。項は $k^{-2s}$ 倍になり、絶対収束から $k$ の和を先に取ると $\zeta(2s)$ が現れます。
<!-- proof-end -->


絶対収束域が本当に $\Re s>1$ であることも確認します。$s=1$ で全格子和が発散するのは、殻の $8k$ 個の各項が $Ck^{-2}$ 以上だからです。非負項の総和なので、原始的な組とその正整数倍に分ける操作は発散時にも拡張実数値の等式を与えます。倍率の和 $\sum_{k\ge1}k^{-2}$ は有限かつ正です。もし原始的な組の和が有限なら全格子和も有限となり矛盾します。$\Re s<1$ でも、十分大きい殻では $y/|cz+d|^2<1$ なので各項の絶対値は $s=1$ の項以上です。従って元の級数が絶対収束するのは $\Re s>1$ に限られます。

例えば $s=2$ では固有値は $-2$ です。これは二乗可積分な自己共役作用素の非負性と矛盾しません。後で見るように、この関数の定数項には $y^2$ が残り、二乗可積分ではないからです。

## 2. Mellin積分と完成形

[Gamma 関数](../../../解析系/CA/CA11/index.md#def-ca11-gamma-function) の積分で、$A>0$、$\Re s>0$ として変数を $u=At$ と置くと、

$$
\int_0^\infty e^{-At}t^{s-1}dt=A^{-s}\Gamma(s).
$$

このように正の変数の積分を複素べきで重み付けする操作はMellin変換の基本例です。$A=\pi|cz+d|^2/y$ を入れると格子和のべきが指数関数になります。CA12の [完成 zeta 因子](../../../解析系/CA/CA12/index.md#def-ca12-completed-zeta) を $\Lambda(w)=\pi^{-w/2}\Gamma(w/2)\zeta(w)$ と書きます。これを使って級数も正規化します。

<a id="def-afr5-completed"></a>
<!-- formal-statement-start -->
> **定義（完成Eisenstein級数）**  
> $z=x+iy$（$y>0$）、$\Re s>1$ で、完成形を

$$
E^*(z,s)=\Lambda(2s)E(z,s)
$$

> とする。ここで $\Lambda(w)$ は上記の完成 zeta 因子である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-afr5-completed -->
**定義の確認。** $s=2$ では $\Gamma(2)=1$ なので $\Lambda(4)=\pi^{-2}\zeta(4)>0$ です。前節の有限な正の値 $E(i,2)$ にこの有限係数を掛けると、完成形は $\pi^{-2}\zeta(4)E(i,2)>5\zeta(4)/(2\pi^2)$ です。$s$ の実部の条件も満たしています。
<!-- definition-example-end -->

<a id="thm-afr5-mellin"></a>
<!-- formal-statement-start -->
> **定理（格子和のMellin表示）**  
> $\Re s>1$、$z=x+iy$（$y>0$）で

$$
E^*(z,s)=\frac12\sum_{(c,d)\ne(0,0)}
\int_0^\infty e^{-\pi t|cz+d|^2/y}t^{s-1}dt.
$$

> 右辺は絶対収束し、和と積分を交換できる。
<!-- formal-statement-end -->

指数関数に直すと、横方向の周期化のFourier係数をGauss積分で計算できます。

<!-- proof-start -->
### 証明

上の変数変換により、各積分は $\Gamma(s)\pi^{-s}(y/|cz+d|^2)^s$ です。絶対値を先に取った積分の総和は、$\sigma=\Re s$ として

$$
\Gamma(\sigma)\pi^{-\sigma}
\sum_{(c,d)\ne(0,0)}(y/|cz+d|^2)^\sigma.
$$

[収束と格子和表示](#thm-afr5-convergence) によって有限です。よって絶対可積分性を根拠に交換ができます。格子和表示に $\pi^{-s}\Gamma(s)$ を掛けると左辺が得られます。
<!-- proof-end -->

## 3. 横方向の平均と振動

整数 $n$ に対するFourier係数を $b_n(y,s)=\int_0^1E^*(x+iy,s)e^{-2\pi inx}dx$ とします。$n=0$ は振動がない平均、$n\ne0$ は高さとともに減衰する振動を表します。正整数 $m$ に対し $\sigma_w(m)=\sum_{d\mid m,\ d>0}d^w$ と略記します。前講の [変形Bessel関数 K](../AFR4/index.md#def-afr4-k-bessel) がここで具体的な係数とともに現れます。

<a id="thm-afr5-fourier"></a>
<!-- formal-statement-start -->
> **定理（完成Eisenstein級数のFourier展開）**  
> $\Re s>1$、$z=x+iy$（$y>0$）において

$$
b_0(y,s)=\Lambda(2s)y^s+\Lambda(2s-1)y^{1-s},
$$

$$
b_n(y,s)=2\sqrt y\,|n|^{s-1/2}
\sigma_{1-2s}(|n|)K_{s-1/2}(2\pi|n|y)
\quad(n\ne0).
$$

> ここで $K_\nu$ は変形Bessel関数、$\sigma_w(m)$ は正の約数の $w$ 乗の和である。
> 級数 $E^*(z,s)=\sum_{n\in\mathbb Z}b_n(y,s)e^{2\pi inx}$ は局所一様絶対収束する。
<!-- formal-statement-end -->

### 証明の見取り図

下段が $c=0$ の格子点を先に分けると $y^s$ の項が現れます。$c\ne0$ では $d$ の和を周期化したGauss関数に変えます。Fourier係数では $c$ が $n$ を割る場合だけ寄与が残るため、最後に約数の和になります。平均については全ての $c$ が寄与します。

<!-- proof-start -->
### 証明

[格子和のMellin表示](#thm-afr5-mellin) で $c=0$ の項は

$$
\frac12\sum_{d\ne0}\pi^{-s}\Gamma(s)y^s|d|^{-2s}
=\Lambda(2s)y^s
$$

です。$c\ne0$ の部分では $(c,d)$ と $(-c,-d)$ を対にして $c\ge1$ の和とします。$t>0$ で

$$
P_t(u)=\sum_{d\in\mathbb Z}e^{-\pi t(d+u)^2/y}
$$

を考えます。各固定 $t,y$ で微分級数も一様収束する周期1の関数です。整数 $k$ に対して区間を $v=d+u$ と置いてつなぐと、その係数は

$$
\int_0^1 P_t(u)e^{-2\pi iku}du
=\int_{\mathbb R}e^{-\pi tv^2/y}e^{-2\pi ikv}dv.
$$

[Gauss 関数の Fourier 変換](../../../解析系/FOU/FOU3/index.md#lem-fou3-gaussian-transform) に $a=\pi t/y$、$\xi=2\pi k$ を入れると

$$
\int_{\mathbb R}e^{-\pi tv^2/y}e^{-2\pi ikv}dv
=\sqrt{y/t}\,e^{-\pi y k^2/t}.
$$

この係数は絶対可和で、[周期関数のFourier展開](../../../解析系/FOU/FOU2/index.md#thm-fou2-dirichlet-convergence) により $P_t$ に戻ります。$u=cx$ と置くと $e^{2\pi ikcx}$ が現れますから、$x$ に関する周波数 $n$ は $kc=n$ のときだけ寄与します。

Mellin表示の $c\ge1$ 部分は $\sum_{c\ge1}\int_0^\infty t^{s-1}e^{-\pi c^2yt}P_t(cx)dt$ です。$x\in[0,1]$ 上で格子和の絶対値積分の上界が一様に有限なので、$x$ の積分と $c,t,d$ の和・積分を交換できます。各 $t,c$ で上のFourier係数を使い、

$$
b_n(y,s)-\mathbf1_{n=0}\Lambda(2s)y^s
=\sqrt y\sum_{\substack{c\ge1\\c\mid n}}
\int_0^\infty t^{s-3/2}
e^{-\pi c^2yt-\pi y(n/c)^2/t}dt
$$

となります。ここで $c\mid0$ は全ての正整数 $c$ を意味します。

$n=0$ では $v=\pi c^2yt$ と置くと積分は $(\pi c^2y)^{-(s-1/2)}\Gamma(s-1/2)$ です。したがって

$$
\begin{aligned}
b_0-\Lambda(2s)y^s
&=\sqrt y(\pi y)^{1/2-s}\Gamma(s-1/2)
\sum_{c\ge1}c^{1-2s}\\
&=\Lambda(2s-1)y^{1-s}.
\end{aligned}
$$

$n\ne0$ のときは $A=\pi c^2 y$、$B=\pi y(n/c)^2$、$\nu=s-1/2$ と置きます。$t=\sqrt{B/A}e^v$ により $At+B/t=2\sqrt{AB}\cosh v$、$dt=t\,dv$ です。[Kの積分表示](../AFR4/index.md#def-afr4-k-bessel) と正負の $v$ の対称化により、

$$
\begin{aligned}
\int_0^\infty t^{\nu-1}e^{-At-B/t}dt
&=(B/A)^{\nu/2}\int_{\mathbb R}e^{-2\sqrt{AB}\cosh v+\nu v}dv\\
&=2(B/A)^{\nu/2}K_\nu(2\sqrt{AB}).
\end{aligned}
$$

$B/A=n^2/c^4$、$2\sqrt{AB}=2\pi |n|y$ を代入すると

$$
b_n=2\sqrt y\,|n|^\nu
K_\nu(2\pi |n|y)\sum_{c\mid |n|}c^{-2\nu}.
$$

これが求める係数です。収束について、$s$ を任意のコンパクト集合に取り $|\Re\nu|\le M$、$y\ge y_0>0$ とします。$T=2\pi |n|y\ge T_0=2\pi y_0$ に対し

$$
|K_\nu(T)|\le e^{-T/2}
\int_0^\infty e^{-(T_0/2)\cosh v+Mv}dv.
$$

積分は $\cosh v\ge e^v/2$ により有限です。約数は高々 $|n|$ 個で各べきも $|n|$ の固定べきで抑えられるので、$y$ がコンパクト区間内なら $b_n$ は $C|n|^{1+3M}e^{-\pi|n|y_0}$ 以下です。絶対一様収束し、滑らかな周期関数のFourier係数と一致するので元の関数に戻ります。
<!-- proof-end -->

完成形を元の正規化に戻すと、平均は

$$
\int_0^1E(x+iy,s)dx=y^s+\phi(s)y^{1-s},
\qquad \phi(s)=\frac{\Lambda(2s-1)}{\Lambda(2s)}.
$$

$\phi$ は高さのもう一方のべきがどれだけ混ざるかを表す係数です。実数 $s=2$ では $\Lambda(3)/\Lambda(4)=\pi\zeta(3)/(2\zeta(4))$ です（$\Gamma(3/2)=\sqrt\pi/2$）。平均は $y^2+\phi(2)y^{-1}$ になります。Cauchy–Schwarzの不等式で $\int_0^1|E|^2dx\ge|\int_0^1 E dx|^2\ge y^4$ なので、カスプにおける面積積分 $\int_1^\infty y^4 y^{-2}dy$ は発散します。

## 4. 元の収束域を越える

級数の元の定義は $\Re s>1$ でしたが、Fourier展開の非零係数はさらに広い領域で意味を持ちます。定数項に現れる $\Lambda$ の極だけを追えば解析接続が可能です。

<a id="thm-afr5-functional"></a>
<!-- formal-statement-start -->
> **定理（Eisenstein級数の解析接続と関数等式）**  
> 固定した上半平面の点 $z$ について、$E^*(z,s)$ は $s$ の全平面に有理型に延長し、$s=0,1$ のみに単純極を持つ。留数はそれぞれ $-1/2,1/2$ である。また

$$
E^*(z,s)=E^*(z,1-s).
$$

> 元の級数も有理型に延長する。$\phi(s)=\Lambda(2s-1)/\Lambda(2s)$ とすれば、次の等式が有理型関数として成立する。

$$
E(z,s)=\phi(s)E(z,1-s),
\qquad \phi(s)\phi(1-s)=1.
$$
<!-- formal-statement-end -->

### 証明の見取り図

非零係数ではBessel関数の次数の符号反転と約数の組替えが互いに打ち消し合います。定数項の二つのべきは [Riemann ζ 関数の関数等式](../../../解析系/CA/CA12/index.md#thm-ca12-functional-equation) によって交換されます。

<!-- proof-start -->
### 証明

[完成Eisenstein級数のFourier展開](#thm-afr5-fourier) の非零係数の積分は、任意のコンパクトな次数の集合で指数的に減衰する可積分関数に支配されます。次数について微分しても $v^j$ の因子が加わるだけで積分可能なので、$K_\nu(T)$ は $\nu$ の整関数です。約数和と $|n|^{s-1/2}$ も整関数であり、前節の評価は $s$ の任意のコンパクト集合に適用できるので非零周波数の和は整関数です。

[完成 zeta 因子の解析接続](../../../解析系/CA/CA12/index.md#thm-ca12-meromorphic-continuation) によれば $\Lambda(w)$ は $w=0,1$ に留数 $-1,1$ の単純極だけを持ちます。よって定数項の極候補は $s=0,1/2,1$ です。$s=1/2$ の二項の主要部は

$$
\frac{y^s}{2(s-1/2)}-\frac{y^{1-s}}{2(s-1/2)}.
$$

$y^{1/2+h}-y^{1/2-h}=2h\sqrt y\log y+O(h^3)$ なのでこの極は消えます。$s=0$ では第一項だけが留数 $-1/2$ を、$s=1$ では第二項だけが留数 $1/2$ を持ちます。これで有理型延長が得られます。

$z$ についても任意のコンパクト集合で非零係数の微分級数が収束します。$x$ 微分は $2\pi in$ を、$y$ 微分は $\sqrt y$ の微分または $-2\pi|n|\cosh v$ を積分内に生じさせます。任意の固定階では $|n|$ の固定べきと $\cosh^j v$ が加わるだけで、前節の支配積分に $\cosh^j v$ を掛けても有限です。従って $z$ 微分後も $s$ の有理型関数を得ます。[収束域での保型性と固有方程式](#thm-afr5-convergence) は、両辺を $s$ の有理型関数とみて一致の定理で延長できます。正則なパラメータでは、解析接続後の関数も同じ保型性と固有方程式を満たします。

[完成 zeta 因子の対称性](../../../解析系/CA/CA12/index.md#thm-ca12-functional-equation) を $w=2s$ と $w=2s-1$ に適用すると

$$
\Lambda(2s)=\Lambda(1-2s),\qquad
\Lambda(2s-1)=\Lambda(2-2s).
$$

従って $s$ を $1-s$ に置き換えると定数項の二項が交換されます。非零係数では $m=|n|$ とし、正の約数の置換 $d\mapsto m/d$ を使うと

$$
\sigma_{2s-1}(m)=m^{2s-1}\sigma_{1-2s}(m).
$$

従って $m^{1/2-s}\sigma_{2s-1}(m)=m^{s-1/2}\sigma_{1-2s}(m)$ です。[Kの積分表示](../AFR4/index.md#def-afr4-k-bessel) で $\cosh$ が偶関数であることから $K_{1/2-s}=K_{s-1/2}$ です。全係数が一致します。

$\Lambda(2s)$ は恒等的に0ではないので $E^*/\Lambda(2s)$ は有理型関数で、元の領域では定義した $E$ と一致します。完成形の等式を割り戻すと

$$
E(z,s)=\frac{\Lambda(2-2s)}{\Lambda(2s)}E(z,1-s)
=\frac{\Lambda(2s-1)}{\Lambda(2s)}E(z,1-s).
$$

さらに $\phi(1-s)=\Lambda(1-2s)/\Lambda(2-2s)=1/\phi(s)$ です。零点や極を含む場合には、点ごとの商ではなく有理型関数の等式と解釈します。
<!-- proof-end -->

例えば $s=1$ で $E$ の留数は $1/(2\Lambda(2))=3/\pi$ です。[ゼータ関数の標準特殊値](../../../解析系/CA/CA12/index.md#cor-ca12-special-values) の $\zeta(2)=\pi^2/6$ と $\Gamma(1)=1$ を用いました。留数は $z$ に依存しない定数です。

また $s=1/2+ir$（$r$ は実数）では $1-s=\bar s$ です。最初の収束域で複素共役が $s$ の共役に対応し、解析接続後も同じです。$\phi$ が有限かつ非零の点では $\phi(s)\overline{\phi(s)}=1$ となります。高さの二つの波の振幅比の絶対値が1になる理由です。ここから連続スペクトルの厳密な分解へ進むには、積分分解の理論が別に必要です。

## 5. 演習

<a id="ex-afr5-a1"></a>
### AFR5-A1 原始的な組

$E(i,3)$ における $(0,\pm1),(\pm1,0),(\pm1,\pm1)$ の寄与の和を求め、$(2,2)$ が含まれない理由を述べよ。

- Level: A
- ID: AFR5-A1

<!-- solution-start -->
**詳細解答。** [級数の定義](#def-afr5-eisenstein) で $|ci+d|^2=c^2+d^2$ です。最初の4組は各 $1/2$、次の4組は各 $1/(2\cdot2^3)$ なので合計 $2+1/4=9/4$ です。$(2,2)$ は最大公約数2のため原始的ではありません。
<!-- solution-end -->

<a id="ex-afr5-a2"></a>
### AFR5-A2 固有値

$s=1/2+ir$（$r\in\mathbb R$）のとき $s(1-s)$ を求め、$s=3$ の値と比較せよ。

- Level: A
- ID: AFR5-A2

<!-- solution-start -->
**詳細解答。** $1-s=1/2-ir$ なので積は $1/4+r^2$、非負です。$s=3$ の積は $3(-2)=-6$ です。[固有方程式](#thm-afr5-convergence) はまず $\Re s>1$ で証明したもので、前者の点では元の級数の収束を主張していません。固有値の式の対称性を確認した計算です。
<!-- solution-end -->

<a id="ex-afr5-a3"></a>
### AFR5-A3 Mellin変換

$\int_0^\infty t^2 e^{-5t}dt$ を求めよ。積分の絶対収束も確認せよ。

- Level: A
- ID: AFR5-A3

<!-- solution-start -->
**詳細解答。** $u=5t$ と置くと $t^2dt=u^2du/125$ です。$u^2e^{-u}$ は原点付近で可積分、無限遠で指数減衰します。部分積分で $\int_0^\infty u^2 e^{-u}du=2\int_0^\infty u e^{-u}du=2\int_0^\infty e^{-u}du=2$ です。各境界項は0。従って $2/125$ となります。
<!-- solution-end -->

<a id="ex-afr5-a4"></a>
### AFR5-A4 約数と周波数

$n=6$、$s=2$ のとき非零Fourier係数の約数和を求めよ。負の周波数 $-6$ との関係を述べよ。

- Level: A
- ID: AFR5-A4

<!-- solution-start -->
**詳細解答。** [Fourier展開](#thm-afr5-fourier) では $1-2s=-3$ です。正の約数は $1,2,3,6$ なので

$$
\sigma_{-3}(6)=1+\frac18+\frac1{27}+\frac1{216}
=\frac{252}{216}=\frac76.
$$

他の因子は $|n|$ に依存するので $b_{-6}=b_6$ です。両項の和は $2b_6\cos(12\pi x)$ となります。
<!-- solution-end -->

<a id="ex-afr5-b1"></a>
### AFR5-B1 格子和の発散境界

$z=i$、実数 $s\le1$ で原始性を外した格子和が発散することを、正方形の殻を用いて示せ。さらに $s=1$ で倍率の和を利用し、原始的な和の絶対収束域を確定せよ。

- Level: B
- ID: AFR5-B1

<!-- solution-start -->
**詳細解答。** $\max(|c|,|d|)=k$ の殻には $(2k+1)^2-(2k-1)^2=8k$ 個の点があり、$k^2\le c^2+d^2\le2k^2$ です。$0\le s\le1$ では各項は $(2k^2)^{-s}$ 以上、$s<0$ では $k^{-2s}$ 以上です。いずれも殻の和は正定数倍の $k^{1-2s}$ 以上で、$1-2s\ge-1$ なので発散します。原始的な組は部分集合なので、この下界をそのまま使えません。しかし $s=1$ では各組を正整数倍に分け、非負項の和を取ると全格子和は原始的な和の $\sum_{k\ge1}k^{-2}$ 倍です。この倍率は有限なので原始的な和も発散します。$s$ の実部が1以下なら、$z=i$ では $c^2+d^2\ge1$ なので絶対値は $s=1$ の項以上です。[収束定理](#thm-afr5-convergence) の十分条件と合わせ、絶対収束域は $\Re s>1$ です。
<!-- solution-end -->

<a id="ex-afr5-b2"></a>
### AFR5-B2 平均の直接計算

$s=2$ で、$c\ge1$ に対する $\sum_{d\in\mathbb Z}y^2/((cx+d)^2+c^2y^2)^2$ の $x\in[0,1]$ での積分を求め、$E$ の定数項を導け。

- Level: B
- ID: AFR5-B2

<!-- solution-start -->
**詳細解答。** $v=cx+d$ と置くと $dx=dv/c$、積分区間は $[d,d+c]$ になります。各実数は端点を除きちょうど $c$ 個の区間に入るため、

$$
\frac{y^2}{c}\sum_d\int_d^{d+c}(v^2+c^2y^2)^{-2}dv
=y^2\int_{\mathbb R}(v^2+c^2y^2)^{-2}dv.
$$

非負性で交換できます。$v=cy\tan\theta$ と置くと右辺は

$$
y^2(cy)^{-3}\int_{-\pi/2}^{\pi/2}\cos^2\theta d\theta
=\frac{\pi}{2c^3y}.
$$

ここで $\cos^2\theta=(1+\cos2\theta)/2$ を積分しました。[格子和表示](#thm-afr5-convergence) では $c=0$ の寄与が $\zeta(4)y^2$、正負の $c$ は2で割る操作と相殺します。正の $c$ の寄与を足すと $\pi\zeta(3)/(2y)$。$\zeta(4)$ で割れば平均は $y^2+\pi\zeta(3)/(2\zeta(4)y)$ です。
<!-- solution-end -->

<a id="ex-afr5-b3"></a>
### AFR5-B3 中心での極の相殺

$\Lambda(1+u)=1/u+A+O(u)$ と書く。関数等式を用いて、$s=1/2$ における完成形の定数項を $A,y$ で表せ。

- Level: B
- ID: AFR5-B3

<!-- solution-start -->
**詳細解答。** [完成 zeta 因子の対称性](../../../解析系/CA/CA12/index.md#thm-ca12-functional-equation) より $\Lambda(u)=\Lambda(1-u)=-1/u+A+O(u)$ です。$s=1/2+h$ とし、[定数項の式](#thm-afr5-fourier) に代入します。

$$
\begin{aligned}
b_0&=(1/(2h)+A+O(h))\sqrt y\,e^{h\log y}\\
&\quad+(-1/(2h)+A+O(h))\sqrt y\,e^{-h\log y}.
\end{aligned}
$$

$e^{\pm h\log y}=1\pm h\log y+O(h^2)$ なので、二項の $1/h$ は相殺し、各々から $\sqrt y(\log y)/2$ が出ます。極限は $\sqrt y(2A+\log y)$ です。
<!-- solution-end -->

<a id="ex-afr5-c1"></a>
### AFR5-C1 非零周波数の対称性と中心線

$m$ を正整数とする。$d\mapsto m/d$ を用いて $\sigma_{-w}(m)=m^{-w}\sigma_w(m)$ を示せ。次に $b_n(y,1-s)=b_n(y,s)$ を導け。最後に $s=1/2+ir$ で $\phi(s)$ が有限かつ非零なら絶対値が1であることを示せ。

- Level: C
- ID: AFR5-C1

<!-- solution-start -->
**詳細解答。** 正の約数を $e=m/d$ と書き直すと

$$
\sigma_{-w}(m)=\sum_{e\mid m}(m/e)^{-w}
=m^{-w}\sum_{e\mid m}e^w.
$$

$w=1-2s$ を代入すると $\sigma_{2s-1}(m)=m^{2s-1}\sigma_{1-2s}(m)$。$m=|n|$ として [Fourier係数の式](#thm-afr5-fourier) の右辺で $s$ を $1-s$ にすると、

$$
2\sqrt y\,m^{1/2-s}m^{2s-1}\sigma_{1-2s}(m)
K_{1/2-s}(2\pi my)
$$

となります。指数の和は $s-1/2$、[Kの積分表示](../AFR4/index.md#def-afr4-k-bessel) から次数の符号反転で値が変わらないので元の係数に一致します。

[関数等式](#thm-afr5-functional) で $\phi(s)\phi(1-s)=1$ です。最初の絶対収束域で $\overline{\Lambda(w)}=\Lambda(\bar w)$ が成立することはGamma積分とゼータ級数の複素共役から従い、解析接続の一意性で全域に延長します。従って $\phi(\bar s)=\overline{\phi(s)}$。中心線では $1-s=\bar s$ なので $|\phi(s)|^2=1$ です。極や零点があるかどうかを判定せず、その点で両方の値が定まる場合について結論を得ました。
<!-- solution-end -->

## 6. 次の講義へ

本講では、保型性・固有方程式・定数項・関数等式が同一の格子和から得られました。AFR6では、このような保型関数にHecke作用素を適用し、スペクトルと算術的な固有値の接続を調べます。

## 参考文献

- H. Iwaniec, *Spectral Methods of Automorphic Forms*, 2nd ed., AMS, 2002.
- D. Bump, *Automorphic Forms and Representations*, Cambridge University Press, 1997.
