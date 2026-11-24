# AFR7 保型L関数・Rankin型積分の初例

前講では、素数ごとのHecke固有値から整数全体のFourier係数を復元しました。では、無限個の係数を一つの複素関数にまとめると何が見えるでしょうか。素因数分解は積の形を、保型形式の高さ方向の積分は解析的な形を与えます。さらに二つの係数を掛け合わせた級数を、曲面上の積分から取り出します。

<!-- definition-example-audit: strict -->

## 1. Hecke係数を複素関数にする

以下、$\mathbb H$ は[上半平面](../../MF/MF1/index.md#def-mf1-upper-half-plane)、$\Gamma=SL_2(\mathbb Z)$ は[整数モジュラー群](../../MF/MF1/index.md#def-mf1-modular-group)です。

$z=x+iy$（$x\in\mathbb R,\ y>0$）と書きます。$u$ は非零の[重さ0のMaassカスプ形式](../AFR3/index.md#def-afr3-maass-cusp)で、全ての[重さ0の素数Hecke作用素](../AFR6/index.md#def-afr6-hecke) $T_p$ の共通固有関数とします。すなわち各素数 $p$ について同じ $u$ が $T_pu=\eta_pu$ を満たし、$\eta_p$ はその作用素の固有値です。

Laplace固有値 $\lambda$ は[エネルギー実現の自己共役性と非負性](../AFR3/index.md#thm-afr3-self-adjoint)から $\lambda\ge0$ です。

$\nu^2=1/4-\lambda$ とします。二つの平方根のどちらを選んでも、[変形Bessel関数 K](../AFR4/index.md#def-afr4-k-bessel)の積分表示で $\cosh(-\nu v)=\cosh(\nu v)$ なので $K_{-\nu}=K_\nu$ です。$\rho(n)$ は次の展開の整数周波数 $n\ne0$ に対応する係数です。

[Maass形式の非零周波数展開](../AFR4/index.md#thm-afr4-maass-expansion)では

$$
u(x+iy)=\sum_{n\ne0}\rho(n)\sqrt y K_\nu(2\pi|n|y)e^{2\pi inx}.
$$

$K_\nu$ は[変形Bessel関数 K](../AFR4/index.md#def-afr4-k-bessel)です。定数項はカスプ条件で消えています。[カスプ固有空間の同時対角化と係数の漸化式](../AFR6/index.md#thm-afr6-joint)から、$\rho(\epsilon)\ne0$ となる符号 $\epsilon=\pm1$ を選び、$c(n)=\rho(\epsilon n)/\rho(\epsilon)$（$n\ge1$）とすると

$$
c(1)=1,\quad c(p)=\eta_p,\quad
c(p^{r+1})=\eta_p c(p^r)-c(p^{r-1}),
$$

$$
c(mn)=c(m)c(n)\qquad(\gcd(m,n)=1).
$$

ここで $m,n$ は正整数、$p$ は素数です。$\gcd(m,n)=1$ は互いに素であることを表し、漸化式は整数 $r\ge1$ で使います。

複素変数を $s=\sigma+i\tau$（$\sigma,\tau\in\mathbb R$）と書きます。正の実数 $a$ のべきは $a^s=\exp(s\log a)$ なので $|a^s|=a^\sigma$ です。係数を $n^{-s}$ で重み付けして足す形は、[Riemann ζ 関数](../../../解析系/CA/CA12/index.md#def-ca12-riemann-zeta)の係数1を $c(n)$ に取り替えたものです。このような $\sum a_n n^{-s}$ の形の級数をDirichlet級数と呼びます。実部 $\sigma=\Re s$ を大きくするほど大きな添字が抑えられます。

ただし、係数の漸化式だけでは無限級数の収束は分かりません。ここでは保型性から係数を評価します。

<a id="thm-afr7-coefficient-bound"></a>
<!-- formal-statement-start -->
> **定理（Maassカスプ形式の係数の多項式評価）**  
> 全モジュラー群の重さ0のMaassカスプ形式 $u$ の非零Fourier係数を $\rho(n)$ とする。ある定数 $C>0$ が存在し、全ての非零整数 $n$ に対し

$$
|\rho(n)|\le C\sqrt{|n|}
$$

> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

一つの基本領域上での有界性を保型性で上半平面全体に運びます。周波数 $n$ に対し高さを $1/|n|$ に比例させるとBessel関数の引数が一定になるので、係数だけを比較できます。

<!-- proof-start -->
### 証明

[標準基本領域](../../MF/MF1/index.md#def-mf1-standard-domain)では $|x|\le1/2$、$x^2+y^2\ge1$ なので $y^2\ge1-x^2\ge3/4$ です。高さを $Y\ge1$ で切った部分は $\sqrt3/2\le y\le Y$ の閉有界集合です。

連続な $u$ はそこで有界です。

[定数項を除いたカスプでの指数減衰](../AFR4/index.md#thm-afr4-cusp-decay)により残りの高さでも有界です。

[標準基本領域の定理](../../MF/MF1/index.md#thm-mf1-fundamental-domain)と $\Gamma$ 不変性から、全ての $z\in\mathbb H$ に対し $|u(z)|\le M$ となる $M$ が存在します。

[Kの無限遠での漸近形](../AFR4/index.md#thm-afr4-k-asymptotic)から十分大きい実数 $T>0$ で $K_\nu(T)\ne0$ です。各 $n\ne0$ に対し $y_n=T/(2\pi|n|)>0$ と置きます。[Maass形式の非零周波数展開](../AFR4/index.md#thm-afr4-maass-expansion)の一様収束により、横方向の積分から

$$
\int_0^1 u(x+iy_n)e^{-2\pi inx}dx
=\rho(n)\sqrt{y_n}K_\nu(T).
$$

左辺の絶対値は $M$ 以下なので

$$
|\rho(n)|\le
\frac{M\sqrt{2\pi}}{\sqrt T\,|K_\nu(T)|}\sqrt{|n|}.
$$

定数は $n$ に依存しません。
<!-- proof-end -->

したがって、正規化された係数にも $|c(n)|\le C_1\sqrt n$ が成り立ちます。$\sigma>3/2$ では $\sum n^{1/2-\sigma}$ が収束するので、以下の定義が可能です。

<a id="def-afr7-l-function"></a>
<!-- formal-statement-start -->
> **定義（Maass形式の保型L関数）**  
> $u$ を全モジュラー群の非零の重さ0のMaassカスプ形式で、全素数Hecke作用素の共通固有関数とする。$\rho(n)$ を非零周波数展開の係数とし、$\rho(\epsilon)\ne0$ となる符号 $\epsilon\in\{1,-1\}$ を選ぶ。正整数 $n$ に対して $c(n)=\rho(\epsilon n)/\rho(\epsilon)$ と置く。複素数 $s$ の実部が $\Re s>3/2$ を満たすとき

$$
L(s,u)=\sum_{n=1}^\infty c(n)n^{-s}
$$

> と定める。正の実数の複素べきは実対数で定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-afr7-l-function -->
**定義の確認**。第1節で仮定した非零共通固有カスプ形式を入力とし、$s=2$ とします。個別の固有値の数値を仮定せず、入力条件から級数が定まることを確かめます。

[係数の漸化式](../AFR6/index.md#thm-afr6-joint)の保証で非零側の符号を選べます。$\rho(\epsilon)\ne0$ なので正規化が可能であり、$c(1)=1$ です。$2>3/2$ で、[係数の多項式評価](#thm-afr7-coefficient-bound)を $C_1=C/|\rho(\epsilon)|$ として使うと

$$
\sum_{n\ge1}|c(n)n^{-2}|
\le C_1\sum_{n\ge1}n^{-3/2}<\infty.
$$

従って定義の無限和は収束します。最初の四項を得るには、固有方程式から得た[係数の漸化式](../AFR6/index.md#thm-afr6-joint)で $c(n)$ を求め、各々に $n^{-2}$ を掛けます。

$$
1+\frac{\eta_2}{4}+\frac{\eta_3}{9}
+\frac{\eta_2^2-1}{16}.
$$

実際 $c(1)=1$、$c(2)=\eta_2$、$c(3)=\eta_3$、$c(4)=\eta_2c(2)-c(1)$ です。残りの絶対値は $C_1\int_4^\infty x^{-3/2}dx=C_1$ 以下であり、無限和は確かに有限値を定めます。
<!-- definition-example-end -->

反対側の符号も非零なら、その正規化係数は同じ初期値1と同じ素数冪漸化式を持ちます。素因数分解と乗法性から全ての $c(n)$ が一致します。片側の初期係数が零の場合は、[Maass形式のHecke係数公式](../AFR6/index.md#thm-afr6-coefficient)を固有方程式に適用した

$$
\rho(pm)=\eta_p\rho(m)-\rho(m/p)
$$

を使います。整数でない添字の係数を零と約束すると、$|pm|>|m|$ なので絶対値についての帰納法でその側の全係数が零です。従って符号選択で $L$ は変わりません。

## 2. 一つの素数から全ての整数へ

前講の形式的冪級数の恒等式を、収束する関数の等式に変えます。Euler積とは素数ごとの因子を掛け合わせた積です。有限個の素数の積では、それらだけを素因数に持つ整数が出現します。

<a id="thm-afr7-euler"></a>
<!-- formal-statement-start -->
> **定理（Maass保型L関数のEuler積）**  
> 全モジュラー群の非零の重さ0のMaassカスプ形式 $u$ を全素数Hecke作用素の共通固有関数とし、その固有値を $\eta_p$ とする。[Maass形式の保型L関数](#def-afr7-l-function) $L(s,u)$ は $\Re s>3/2$ で正則であり

$$
L(s,u)=\prod_p
\frac{1}{1-\eta_p p^{-s}+p^{-2s}}
$$

> が成立する。積は素数を昇順に取る有限個の素数にわたる積の極限であり、各分母は非零である。
<!-- formal-statement-end -->

### 証明の見取り図

素数冪を集めた局所級数に漸化式を掛けます。その積を有限個の素数について展開し、絶対収束で極限へ進みます。

<!-- proof-start -->
### 証明

コンパクト集合上で $\Re s\ge3/2+\delta$ とすれば、各項は $C_1 n^{-1-\delta}$ 以下です。[正則関数列の局所一様極限定理](../../../解析系/CA/CA7/index.md#thm-ca7-holomorphic-locally-uniform-limit)により $L$ は正則です。

$p$ を固定し、$X=p^{-s}$、$c_r=c(p^r)$ とします。[係数の多項式評価](#thm-afr7-coefficient-bound)により $\sum |c_rX^r|\le C_1\sum (p^{1/2-\sigma})^r<\infty$ です。有限多項式を掛けると

$$
(1-\eta_p X+X^2)\sum_{r\ge0}c_rX^r
=c_0+(c_1-\eta_pc_0)X+
\sum_{r\ge2}(c_r-\eta_pc_{r-1}+c_{r-2})X^r.
$$

[係数の漸化式](../AFR6/index.md#thm-afr6-joint)により定数項は1、他は0です。左辺が1なので分母は非零で、局所級数は分母の逆数です。

有限素数集合 $P$ について、絶対収束する級数の積を展開し、乗法性を用いると

$$
\prod_{p\in P}\sum_{r\ge0}c(p^r)p^{-rs}
=\sum_{\substack{n\ge1\\p\mid n\Rightarrow p\in P}}c(n)n^{-s}.
$$

$P$ を $p\le B$ の全素数としたとき、右辺に含まれない整数は必ず $n>B$ です。従って $L$ との差の絶対値は $C_1\sum_{n>B} n^{1/2-\sigma}\to0$ です。また $\sum_p|\sum_{r\ge1}c(p^r)p^{-rs}|\le\sum_{n\ge2}|c(n)|n^{-\sigma}<\infty$ なので局所因子から1を引いた量も絶対総和可能です。
<!-- proof-end -->

たとえば $\eta_2=1$ と仮定した局所係数の計算模型では $c(4)=0$、$c(8)=-1$、$c(16)=-1$ です。局所因子 $1/(1-X+X^2)$ の冪級数は $1+X-X^3-X^4+\cdots$ となり、係数の規則が目に見える形になります。この固有値を持つ実際のカスプ形式の存在は仮定しません。

## 3. 高さ方向のMellin積分

正の変数の関数を $y^{s-1}$ で重み付けして積分するMellin変換は、引数の拡大 $y\mapsto ny$ を係数 $n^{-s}$ に変換します。これがFourier展開とDirichlet級数を結ぶ理由です。核の積分には[Gamma関数](../../../解析系/CA/CA11/index.md#def-ca11-gamma-function) $\Gamma(w)$ を使います。引数を持つ $\Gamma(w)$ は、第1節で群を表した $\Gamma$ とは別の記号です。

片側の周波数だけを集めた高さ方向の関数を

$$
h(y)=\sum_{n\ge1}c(n)K_\nu(2\pi ny)
$$

と置きます。これは $u$ の選んだ符号の非零周波数部分を $x=0$ で評価し、$\rho(\epsilon)\sqrt y$ で割ったものです。各 $y>0$ では係数評価とBessel関数の指数減衰により絶対収束します。$h$ 自身の保型性は要求しません。

<a id="thm-afr7-mellin"></a>
<!-- formal-statement-start -->
> **定理（Maass保型L関数のMellin表示）**  
> 全モジュラー群の非零の重さ0のMaassカスプ形式 $u$ を全素数Hecke作用素の共通固有関数とし、Laplace固有値を $\lambda\ge0$、$\nu^2=1/4-\lambda$ とする。[Maass形式の保型L関数](#def-afr7-l-function)の正規化係数 $c(n)$ により

$$
h(y)=\sum_{n\ge1}c(n)K_\nu(2\pi ny)\quad(y>0)
$$

> と置く。$\Re s>3/2$ なら

$$
\int_0^\infty h(y)y^{s-1}dy
=\frac{\Gamma((s+\nu)/2)\Gamma((s-\nu)/2)}
{4\pi^s}L(s,u).
$$

> 左辺は絶対収束する。
<!-- formal-statement-end -->

### 証明の見取り図

各項の変数を $t=2\pi ny$ と置けば $n^{-s}$ が現れます。残るBessel積分はGamma積分の積へ変換します。積分の順序を変える前に絶対可積分性を確認します。

<!-- proof-start -->
### 証明

$\lambda\ge0$ が実数なので $\nu$ は実数または純虚数で、$a=|\Re\nu|\le1/2$ です。

[変形Bessel関数 K](../AFR4/index.md#def-afr4-k-bessel)の積分表示から $|\cosh(\nu v)|\le e^{av}$、$\cosh v\ge e^v/2$ です。

$0<t\le1$ では $e^{av}\le e^v$ と緩く評価して

$$
|K_\nu(t)|\le\int_0^\infty e^{-te^v/2}e^v dv
=\frac2t e^{-t/2}.
$$

最後は $w=e^v$ と置きました。$dw/dv=e^v>0$ なので積分区間は $[1,\infty)$ に移り、$e^v\,dv=dw$ は置換積分の微分因子を表します。大きな $t$ では[Kの無限遠での漸近形](../AFR4/index.md#thm-afr4-k-asymptotic)により指数減衰します。よって $\sigma>3/2$ に対し $J_\sigma=\int_0^\infty |K_\nu(t)|t^{\sigma-1}dt<\infty$ です。

各項の絶対値を先に積分します。$n$ を固定して $t=2\pi ny$ と置けば、$dt/dy=2\pi n>0$ なので正の半直線を可逆に写します。置換積分の因子は

$$
y^{s-1}dy=(2\pi n)^{-s}t^{s-1}dt
$$

です。実数 $\sigma$ でも同じ式が成立するので、

$$
\sum_{n\ge1}|c(n)|\int_0^\infty
|K_\nu(2\pi ny)|y^{\sigma-1}dy
=(2\pi)^{-\sigma}J_\sigma
\sum_{n\ge1}|c(n)|n^{-\sigma}<\infty.
$$

[係数の多項式評価](#thm-afr7-coefficient-bound)で最後の収束が従います。[Fubiniの定理](../../../解析系/F0/F0-00D2C/index.md#thm-f0-00d2c-02)を整数の数え上げ測度と高さのLebesgue測度に適用します。複素数値の各項は実部・虚部とも絶対可積分なので、それぞれに同定理を適用できます。$J(s)=\int_0^\infty K_\nu(t)t^{s-1}dt$ と書くと

$$
\int_0^\infty h(y)y^{s-1}dy
=\sum_{n\ge1}c(n)(2\pi n)^{-s}J(s)
=(2\pi)^{-s}L(s,u)J(s).
$$

[Gamma関数](../../../解析系/CA/CA11/index.md#def-ca11-gamma-function)の積分を使います。$A=(s+\nu)/2$、$B=(s-\nu)/2$ と置くと $\Re A,\Re B>0$ なので

$$
\Gamma(A)\Gamma(B)=
\int_0^\infty\int_0^\infty e^{-r-q}r^{A-1}q^{B-1}dr\,dq.
$$

絶対可積分性は $\Gamma(\Re A)\Gamma(\Re B)<\infty$ で確認できます。$r=(t/2)e^v,\ q=(t/2)e^{-v}$（$t>0,v\in\mathbb R$）と変換します。逆写像は $t=2\sqrt{rq},v=\frac12\log(r/q)$ です。この写像は両方向とも滑らかです。二変数の積分の面積因子を求めるため、[AFR2で用いた実Jacobian行列](../AFR2/index.md#prop-afr2-metric-invariance)と同様に、座標写像を $\Psi(t,v)=(r,q)$ と書き、入力 $(t,v)$ の順、出力 $(r,q)$ の順に微分を並べます。$t$ で微分するときは $v$ を固定し、$v$ で微分するときは $t$ を固定します。

$$
D\Psi(t,v)
=\begin{pmatrix}
\partial r/\partial t & \partial r/\partial v\\
\partial q/\partial t & \partial q/\partial v
\end{pmatrix}
=\begin{pmatrix}r/t&r\\ q/t&-q\end{pmatrix}.
$$

$r q=t^2/4$ より行列式は

$$
-\frac{2rq}{t}=-\frac t2\ne0.
$$

従って変数変換におけるJacobian（行列式）の絶対値は $|\det D\Psi(t,v)|=t/2$ であり、面積要素は $dr\,dq=(t/2)dt\,dv$ です。さらに $A+B=s,\ A-B=\nu$ だから

$$
r+q=t\cosh v,\qquad
r^{A-1}q^{B-1}\frac t2=2^{1-s}t^{s-1}e^{\nu v}.
$$

$v$ の正負を合わせ、[変形Bessel関数 K](../AFR4/index.md#def-afr4-k-bessel)の定義を使うと

$$
\int_{\mathbb R}e^{-t\cosh v}e^{\nu v}dv
=\int_0^\infty e^{-t\cosh v}(e^{\nu v}+e^{-\nu v})dv
=2K_\nu(t).
$$

絶対可積分性と可逆な変数変換により積分順序を選べるので、

$$
\Gamma(A)\Gamma(B)=2^{2-s}\int_0^\infty K_\nu(t)t^{s-1}dt
=2^{2-s}J(s).
$$これを $(2\pi)^{-s}L(s,u)J(s)$ に代入すると $2^{s-2}(2\pi)^{-s}=1/(4\pi^s)$ となり結論を得ます。
<!-- proof-end -->

積分の核だけを $\nu=1/2,s=5/2$ で検算しましょう。[変形Bessel関数 K の定義例](../AFR4/index.md#def-afr4-k-bessel)の $K_{1/2}(t)=\sqrt{\pi/(2t)}e^{-t}$ から

$$
J(5/2)=\sqrt{\pi/2}\int_0^\infty te^{-t}dt
=\sqrt{\pi/2}.
$$

積分は部分積分で1になります。一方、[Gamma関数の漸化式](../../../解析系/CA/CA11/index.md#thm-ca11-functional-equation)と[反射公式](../../../解析系/CA/CA11/index.md#thm-ca11-reflection)の半整数での値から $\Gamma(3/2)=\Gamma(1/2)/2=\sqrt\pi/2$、$\Gamma(1)=1$ です。先ほどのGamma積分の公式も $2^{1/2}\Gamma(3/2)\Gamma(1)=\sqrt{\pi/2}$ となり一致します。これは核の計算であって、$\lambda=0$ の非零カスプ形式の存在を意味しません。

## 4. Rankin型積分：二乗した係数を取り出す

今度は一つのFourier係数ではなく、その絶対値の二乗を集めます。これには横方向の振動が直交するという性質が使えます。しかし高さ方向の積分だけでは、基本領域の形が長方形でないため横方向に一周期を積分できません。[非正則Eisenstein級数](../AFR5/index.md#def-afr5-eisenstein)を掛けることで、基本領域の積分を帯全体の積分へ展開できます。この操作を unfolding（展開）といいます。

$\mathcal F$ は標準基本領域、$d\mu=dx\,dy/y^2$ は[双曲面積要素](../AFR2/index.md#prop-afr2-metric-invariance)です。

<a id="thm-afr7-rankin"></a>
<!-- formal-statement-start -->
> **定理（Maass形式のRankin型積分）**  
> 全モジュラー群の非零の重さ0のMaassカスプ形式 $u$ を全素数Hecke作用素の共通固有関数とし、Laplace固有値を $\lambda\ge0$、$\nu^2=1/4-\lambda$ とする。$c(n)$ は[Maass形式の保型L関数](#def-afr7-l-function)の正規化係数、$\mathcal F$ は標準基本領域、$d\mu=dx\,dy/y^2$ とする。$\Re s>1$ で次の積分と級数は絶対収束し、

$$
\int_{\mathcal F}|u(z)|^2E(z,s)d\mu(z)
=\frac{|\rho(1)|^2+|\rho(-1)|^2}{(2\pi)^s}
R_\nu(s)\sum_{n\ge1}|c(n)|^2 n^{-s},
$$

$$
R_\nu(s)=\int_0^\infty |K_\nu(t)|^2 t^{s-1}dt
$$

> が成立する。ここで $\rho(n)$ は $u$ の非零Fourier係数、$E(z,s)$ は全モジュラー群の非正則Eisenstein級数である。
<!-- formal-statement-end -->

### 証明の見取り図

Eisenstein級数は平行移動で同一視した群要素ごとの高さの和です。各項の積分領域を移動すると一周期の帯が得られます。横方向の二乗積分は異なる周波数の積を消し、高さ方向の置換は $n^{-s}$ を生みます。

<!-- proof-start -->
### 証明

$\Gamma_\infty$ を $\pm\begin{pmatrix}1&k\\0&1\end{pmatrix}$（$k\in\mathbb Z$）全体とします。

この部分群は整数平行移動 $z\mapsto z+k$ として作用します。$\Gamma_\infty\backslash\Gamma$ は左剰余類 $\Gamma_\infty\gamma$ の集合を表し、左からこの部分群の元を掛けて移り合う行列を同一視します。

整数の原始的な組 $(c,d)$ とは $\gcd(c,d)=1$ を満たす組です。Bezoutの等式で $ad-bc=1$ となる整数 $a,b$ が取れるので、$(c,d)$ は整数モジュラー群の行列の下段にできます。

同じ下段を持つ二行列の上段の差を $(a'-a,b'-b)$ とすると $(a'-a)d-(b'-b)c=0$ です。

$c,d$ は互いに素なので差は $(c,d)$ の整数倍です（片方が0なら他方が $\pm1$ なので同様）。

従ってある整数 $k$ で $(a',b')=(a+kc,b+kd)$ と書けます。これは

$$
\begin{pmatrix}1&k\\0&1\end{pmatrix}
\begin{pmatrix}a&b\\c&d\end{pmatrix}
=\begin{pmatrix}a+kc&b+kd\\c&d\end{pmatrix}
$$

なので、同じ左剰余類に属することを意味します。

符号も $\Gamma_\infty$ に吸収されます。

逆に左からこの部分群を掛ければ下段は符号以外変わりません。

[虚部公式](../../MF/MF1/index.md#thm-mf1-imaginary-action)と[Eisenstein級数の定義](../AFR5/index.md#def-afr5-eisenstein)から

$$
E(z,s)=\sum_{\gamma\in\Gamma_\infty\backslash\Gamma}
(\Im\gamma z)^s.
$$

[基本領域の定理](../../MF/MF1/index.md#thm-mf1-fundamental-domain)により $\gamma\mathcal F$ を左剰余類ごとに集めると、$\Gamma_\infty$ での同一視の下で帯 $0\le x<1,y>0$ を重複なく覆います（境界の零面積集合を除く）。実際、任意の点はある群要素で $\mathcal F$ へ移されます。重複があるとすると、内部点 $z,z'\in\mathcal F^\circ$ と $\delta\in\Gamma_\infty$ について $\gamma z=\delta\gamma' z'$ です。従って

$$
z'=(\gamma')^{-1}\delta^{-1}\gamma z.
$$

基本領域の内部での一意性は $z'=z$ だけでなく $(\gamma')^{-1}\delta^{-1}\gamma=\pm I$ も保証します。$\pm I\in\Gamma_\infty$ なので $\gamma$ と $\gamma'$ は同じ左剰余類です。

まず実数 $\sigma=\Re s>1$ を使い、非負の項に[Tonelliの定理](../../../解析系/F0/F0-00D2C/index.md#thm-tonelli)を適用します。$w=\gamma z$ とすると[双曲面積要素の群不変性](../AFR2/index.md#prop-afr2-metric-invariance)と $u$ の保型性から

$$
\int_{\mathcal F}|u|^2 E(z,\sigma)d\mu
=\sum_{\gamma}\int_{\gamma\mathcal F}
|u(w)|^2(\Im w)^\sigma d\mu(w)
$$

$$
=\int_0^\infty\int_0^1 |u(x+iy)|^2 y^{\sigma-2}dx\,dy.
$$

この帯上の積分は有限です。

$0<y\le1$ では[係数の多項式評価の証明](#thm-afr7-coefficient-bound)で得た全域での有界性 $|u|\le M$ から、上界は $M^2/(\sigma-1)$ です。

十分大きな高さでは[定数項を除いたカスプでの指数減衰](../AFR4/index.md#thm-afr4-cusp-decay)から $|u|\le D e^{-2\pi(y-Y)}$ であり、残りの有限な高さの区間も有界です。

よって複素 $s$ の場合にも $|(\Im\gamma z)^s|=(\Im\gamma z)^\sigma$ を用いて絶対可積分性を確認でき、実部と虚部にそれぞれ[Fubiniの定理](../../../解析系/F0/F0-00D2C/index.md#thm-f0-00d2c-02)を適用して同じ展開が成立します。

固定した $y$ では[Maass形式の非零周波数展開](../AFR4/index.md#thm-afr4-maass-expansion)が絶対かつ一様に収束します。$b_n(y)=\rho(n)\sqrt y K_\nu(2\pi|n|y)$ と置きます。$0<|n|\le N$ の項を取った有限部分和を $u_N$ と書けば、複素共役を取って

$$
|u_N(x+iy)|^2
=\sum_{0<|n|,|m|\le N}b_n(y)\overline{b_m(y)}e^{2\pi i(n-m)x}.
$$

横方向の積分では $n=m$ の場合は1、$n\ne m$ の場合は $(e^{2\pi i(n-m)}-1)/(2\pi i(n-m))=0$ となります。一様収束で極限を取ると

$$
\int_0^1|u(x+iy)|^2dx
=y\sum_{n\ne0}|\rho(n)|^2|K_\nu(2\pi|n|y)|^2.
$$

実数 $\sigma>1$ について再び[Tonelliの定理](../../../解析系/F0/F0-00D2C/index.md#thm-tonelli)を適用します。二乗積分の因子 $y$ と帯上の測度の重み $y^{\sigma-2}$ を掛けると $y^{\sigma-1}$ です。$n\ne0$ を固定して $t=2\pi|n|y$ と置けば $dt/dy=2\pi|n|>0$ なので

$$
y^{\sigma-1}dy=(2\pi|n|)^{-\sigma}t^{\sigma-1}dt.
$$

これを各項に使うと

$$
\int_0^\infty\int_0^1 |u|^2 y^{\sigma-2}dx\,dy
=(2\pi)^{-\sigma}R_\nu(\sigma)
\sum_{n\ne0}|\rho(n)|^2|n|^{-\sigma}.
$$

左辺が有限であり、少なくとも一つの $\rho(n)$ が非零です。$R_\nu(\sigma)>0$ は[Kの無限遠での漸近形](../AFR4/index.md#thm-afr4-k-asymptotic)によって核が恒等的に零でないことから従います。従って核積分も係数級数も有限です。この非負積分の有限性が複素 $s$ での和積分交換を正当化します。

最後に[係数の漸化式](../AFR6/index.md#thm-afr6-joint)により $\rho(\pm n)=\rho(\pm1)c(n)$ が成立します。片側の初期値が零のときもその側の全係数が零なので同じ式が使えます。正負の添字をまとめれば結論です。
<!-- proof-end -->

$R_\nu$ は無限素点の情報を運ぶ核積分、係数の二乗の級数は整数の算術的情報です。定理は両者が一つの曲面積分から得られることを示しました。一般の二つの保型表現の積L関数や、その解析接続は後の講義で扱います。

この二乗係数の結果は、単独のL関数についても最初の評価を改善します。$\sigma>1$ なら有限和の[Cauchy–Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)を、$|c(n)|n^{-\sigma/2}$ と $n^{-\sigma/2}$ に適用して

$$
\sum_{n\le N}|c(n)|n^{-\sigma}
\le
\left(\sum_{n\le N}|c(n)|^2n^{-\sigma}\right)^{1/2}
\left(\sum_{n\le N}n^{-\sigma}\right)^{1/2}.
$$

[Maass形式のRankin型積分](#thm-afr7-rankin)と $\sigma>1$ により右辺は $N$ に依存せず有界です。左辺は非負項の部分和なので極限が存在します。これで単独のL関数も $\Re s>1$ で絶対収束すると分かりました。第2節の有限素数積の議論もこの絶対収束を使って同じ半平面に広がります。ただし収束域外への解析接続を元の級数の収束と混同してはいけません。

## 5. 演習と詳細解答

<a id="ex-afr7-a1"></a>
#### AFR7-A1 係数から級数へ

- Level: A

乗法的な係数の計算模型で $\eta_2=2,\eta_3=-1$ とする。$c(4),c(6),c(9)$ と $L$ の対応する項を求めよ。

<!-- solution-start -->
**詳細解答**

[係数の漸化式](../AFR6/index.md#thm-afr6-joint)の初期値は $c(1)=1,c(2)=2,c(3)=-1$ です。

よって $c(4)=2\cdot2-1=3$、$c(9)=(-1)(-1)-1=0$。

2と3は互いに素なので $c(6)=2(-1)=-2$ です。

[L関数の定義](#def-afr7-l-function)に対応する三項は $3\cdot4^{-s},-2\cdot6^{-s},0$ となります。

これは係数法則の模型です。
<!-- solution-end -->

<a id="ex-afr7-a2"></a>
#### AFR7-A2 打ち切り誤差

- Level: A

$|c(n)|\le C\sqrt n$、$\Re s=5/2$ とする。最初の $N$ 項を残した打ち切り前後の級数の値の差の絶対値の上界を求めよ。

<!-- solution-start -->
**詳細解答**

$|n^{-s}|=n^{-5/2}$ なので各項は $Cn^{-2}$ 以下です。$x^{-2}$ は減少するため $n\ge N+1$ に対して $n^{-2}\le\int_{n-1}^n x^{-2}dx$。従って

$$
\left|\sum_{n>N}c(n)n^{-s}\right|
\le C\int_N^\infty x^{-2}dx=\frac CN.
$$

$N\to\infty$ で誤差は0へ収束します。
<!-- solution-end -->

<a id="ex-afr7-a3"></a>
#### AFR7-A3 Mellin積分の尺度

- Level: A

$a>0,\Re s>0$ のとき $\int_0^\infty e^{-ay}y^{s-1}dy$ を求め、$a=3,s=2$ で評価せよ。

<!-- solution-start -->
**詳細解答**

$a>0$ を固定して $t=ay$ とすれば $dt/dy=a>0$ で、正の半直線への可逆な置換です。従って $y^{s-1}dy=(t/a)^{s-1}dt/a=a^{-s}t^{s-1}dt$ となります。[Gamma関数](../../../解析系/CA/CA11/index.md#def-ca11-gamma-function)の積分により

$$
\int_0^\infty e^{-ay}y^{s-1}dy=a^{-s}\Gamma(s).
$$

絶対値を積分しても $a^{-\Re s}\Gamma(\Re s)<\infty$ です。$a=3,s=2$ では[Gamma関数の漸化式](../../../解析系/CA/CA11/index.md#thm-ca11-functional-equation)から $\Gamma(2)=\Gamma(1)=1$ なので $3^{-2}\Gamma(2)=1/9$。
<!-- solution-end -->

<a id="ex-afr7-a4"></a>
#### AFR7-A4 横方向の直交性

- Level: A

$x\in[0,1]$ に対し $f(x)=2e^{2\pi ix}+(1+i)e^{-2\pi ix}$ とする。$\int_0^1|f(x)|^2dx$ を求めよ。

<!-- solution-start -->
**詳細解答**

積を展開すると

$$
|f(x)|^2=4+2+2(1-i)e^{4\pi ix}
+2(1+i)e^{-4\pi ix}.
$$

最後の二項の積分は $(e^{\pm4\pi i}-1)/(\pm4\pi i)=0$ によって消えるので、積分値は6です。正負の周波数は別々に二乗の寄与を持ちます。
<!-- solution-end -->

<a id="ex-afr7-b1"></a>
#### AFR7-B1 局所因子と重根

- Level: B

$\eta_p=2$ の係数模型で $c(p^r)=r+1$ を示し、$|X|<1$ で局所級数を求めよ。形式的な恒等式が収束域外で級数の和を与えないことも説明せよ。

<!-- solution-start -->
**詳細解答**

初期値は $c(1)=1,c(p)=2$。[係数の漸化式](../AFR6/index.md#thm-afr6-joint)に $c(p^r)=r+1,c(p^{r-1})=r$ を代入すると $c(p^{r+1})=2(r+1)-r=r+2$ です。帰納法で全ての $r\ge0$ に成立します。

$|X|<1$ なら $\sum(r+1)|X|^r$ は比の極限が $|X|$ なので収束します。

有限多項式 $(1-X)^2$ を掛けた級数は定数項1、一次係数 $2-2=0$、$r\ge2$ の係数 $(r+1)-2r+(r-1)=0$ です。

よって和は $(1-X)^{-2}$。

$X=2$ なら右辺の有理式は1ですが、級数の項 $(r+1)2^r$ は0にすら近づきません。
<!-- solution-end -->

<a id="ex-afr7-b2"></a>
#### AFR7-B2 係数評価の高さ選択

- Level: B

$|u(z)|\le 10$ とし、固定した $T>0$ で $|K_\nu(T)|=1/5$ と仮定する。Fourier係数 $\rho(-m)$（$m\ge1$）の上界を導け。高さを一定に固定すると同じ多項式評価が得られない理由も説明せよ。

<!-- solution-start -->
**詳細解答**

[Maass形式の非零周波数展開](../AFR4/index.md#thm-afr4-maass-expansion)に対し $y=T/(2\pi m)$ と置けば、

$$
\rho(-m)\sqrt{T/(2\pi m)}K_\nu(T)
=\int_0^1u(x+iy)e^{2\pi imx}dx.
$$

右辺の絶対値は10以下です。従って

$$
|\rho(-m)|\le50\sqrt{2\pi m/T}.
$$

固定高さ $y_0$ では引数 $2\pi m y_0$ が増え、[Kの無限遠での漸近形](../AFR4/index.md#thm-afr4-k-asymptotic)で分母が指数的に小さくなります。その逆数からは指数的に大きい上界しか得られません。
<!-- solution-end -->

<a id="ex-afr7-b3"></a>
#### AFR7-B3 Bessel核と二乗積分

- Level: B

核の模型として $\nu=1/2$ を取る。$R_{1/2}(s)$ を $\Re s>1$ で計算し、$s=2$ の値を求めよ。

<!-- solution-start -->
**詳細解答**

[変形Bessel関数 K の定義例](../AFR4/index.md#def-afr4-k-bessel)により $|K_{1/2}(t)|^2=\pi e^{-2t}/(2t)$ です。[Rankin型積分の核](#thm-afr7-rankin)へ代入すると

$$
R_{1/2}(s)=\frac\pi2\int_0^\infty e^{-2t}t^{s-2}dt
=\frac{\pi\Gamma(s-1)}{2^s}.
$$

二番目の等号は $q=2t$ と置く変数変換です。$dq/dt=2>0$ なので $t^{s-2}dt=2^{1-s}q^{s-2}dq$ となり、[Gamma関数](../../../解析系/CA/CA11/index.md#def-ca11-gamma-function)を使いました。

$\Re(s-1)>0$ なので絶対収束し、$s=2$ で $\pi/4$ です。

$s=1$ では原点で $t^{-1}$ の積分が発散します。
<!-- solution-end -->

<a id="ex-afr7-c1"></a>
#### AFR7-C1 Rankin型積分と平均的評価

- Level: C

$u$ を本章の非零共通固有カスプ形式とし、$A=|\rho(1)|^2+|\rho(-1)|^2$ とする。実数 $\sigma>1$ を固定する。

(1) 帯上の積分の小さい高さの部分が有限となる理由を示せ。

(2) $I(\sigma)=\int_{\mathcal F}|u(z)|^2E(z,\sigma)d\mu$ を用いて、$\sum_{n\le N}|c(n)|^2$ の上界を得よ。

(3) (2) の結果から任意の実数 $\delta>0$ に対して $\sum_{n\le N}|c(n)|^2\le C_\delta N^{1+\delta}$ となることを示せ。

<!-- solution-start -->
**詳細解答**

(1) [係数の多項式評価](#thm-afr7-coefficient-bound)の証明で得た $|u|\le M$ を使うと

$$
\int_0^1\int_0^1 |u(x+iy)|^2y^{\sigma-2}dx\,dy
\le M^2\int_0^1y^{\sigma-2}dy
=\frac{M^2}{\sigma-1}.
$$

$\sigma>1$ が原点での収束を保証します。この評価は $\sigma=1$ では使えません。

(2) [Maass形式のRankin型積分](#thm-afr7-rankin)により

$$
\sum_{n\ge1}|c(n)|^2n^{-\sigma}
=\frac{(2\pi)^\sigma I(\sigma)}{A R_\nu(\sigma)}
=:D_\sigma.
$$

$A>0$ は[係数の漸化式](../AFR6/index.md#thm-afr6-joint)の非零側の存在、$R_\nu(\sigma)>0$ は核が零関数でないことによります。$D_\sigma$ は有限な非負実数です。$n\le N$ では $n^\sigma\le N^\sigma$ なので

$$
\sum_{n\le N}|c(n)|^2
=\sum_{n\le N}n^\sigma |c(n)|^2n^{-\sigma}
\le N^\sigma D_\sigma.
$$

(3) $\sigma=1+\delta$ と選べば許された収束域に入り、$C_\delta=D_{1+\delta}$ として結論を得ます。$C_\delta$ は $\delta$ に依存するので、この議論だけで $\delta=0$ とすることはできません。
<!-- solution-end -->

## 6. 次の講義へ

本講では、実変数の保型形式から有限素数のEuler因子と無限素点の積分が同時に現れることを見ました。次講は有理数の全ての素点を一つの空間にまとめるアデールと、乗法逆元を持つアデール（イデール）を学びます。

## 参考文献

- Henryk Iwaniec, *Spectral Methods of Automorphic Forms*, 2nd ed., AMS, 2002.
- Daniel Bump, *Automorphic Forms and Representations*, Cambridge University Press, 1997.
- Dorian Goldfeld, *Automorphic Forms and L-Functions for the Group GL(n,R)*, Cambridge University Press, 2006.
