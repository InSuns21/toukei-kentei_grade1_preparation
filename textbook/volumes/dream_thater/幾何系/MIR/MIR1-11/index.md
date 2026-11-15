# MIR1-11 正則周期と超幾何級数

<!-- definition-example-audit: strict -->

## 1. 方程式の正則解と実際の周期は同じか

[前講のPicard–Fuchs作用素](../MIR1-10/index.md#thm-mir1-10-quintic-pf)は、Dwork型quinticの対角群不変部分の周期を消す。

$$
\mathcal L=\theta^4-5z(5\theta+1)(5\theta+2)(5\theta+3)(5\theta+4),
\quad\theta=z\frac{d}{dz},\quad z=(5\psi)^{-5}.
$$

しかし、微分方程式だけでは「どの解が幾何学的な周期か」は決まらない。まず $z=0$ で値1の正則解を構成し、最後に実際の積分と一致することを確かめる。

[族の判別式](../MIR1-06/index.md#prop-mir1-06-z-discriminant)から、$z=0$ は $\psi=\infty$ の退化境界であって滑らかなファイバーそのものではない。「原点での値」は、周囲からの正則延長の値である。

## 2. 階乗係数を漸化式から導く

[前講の係数漸化式](../MIR1-10/index.md#prop-mir1-10-coefficient-recurrence)は $\omega=\sum_{d\ge0}a_dz^d$ に対して

$$
d^4a_d=5(5d-4)(5d-3)(5d-2)(5d-1)a_{d-1}\quad(d\ge1)
$$

である。$d=0$ では $0=0$ しか得られないので $a_0$ は自由であり、ここでは1に固定する。

<a id="thm-mir1-11-regular-period"></a>

<!-- formal-statement-start -->
> **定理（原点で正則な規格化解）**
>
> $\theta=z\,d/dz$、$\mathcal L=\theta^4-5z\prod_{j=1}^4(5\theta+j)$ とする。$z=0$ に正則で $\omega(0)=1$ を満たす $\mathcal L\omega=0$ の解は局所的にただ一つ存在し、次の級数で与えられる。

$$
\boxed{\omega_0(z)=\sum_{d=0}^\infty\frac{(5d)!}{(d!)^5}z^d},
\qquad |z|<\frac1{3125}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

階乗係数の隣接比が漸化式に一致することを確認する。比の極限から収束を証明して初めて、形式計算を実際の正則関数の方程式にできる。

<!-- proof-start -->
### 証明

$b_d=(5d)!/(d!)^5$ と置く。$b_0=1$ であり、$d\ge1$ では

$$
\begin{aligned}
\frac{b_d}{b_{d-1}}
&=\frac{(5d)!}{(5d-5)!}\frac{((d-1)!)^5}{(d!)^5}\\
&=\frac{(5d)(5d-1)(5d-2)(5d-3)(5d-4)}{d^5}\\
&=\frac{5(5d-4)(5d-3)(5d-2)(5d-1)}{d^4}.
\end{aligned}
$$

よって $b_d$ は漸化式を満たす。$d^4\ne0$ なので $a_0=1$ から帰納的に $a_d=b_d$ が強制される。さらに

$$
\lim_{d\to\infty}\frac{b_d}{b_{d-1}}
=5\prod_{j=1}^4\lim_{d\to\infty}\frac{5d-5+j}{d}
=3125.
$$

比の判定法より級数は $|z|<1/3125$ の任意の閉小円板で一様絶対収束し、そこで項別微分できる。[係数漸化式](../MIR1-10/index.md#prop-mir1-10-coefficient-recurrence)から $\mathcal L\omega_0=0$ が正則関数として成立する。別の原点正則解も $a_0=1$ なら全Taylor係数が一致するため、正則関数の一致定理により局所的に同じ解となる。$\square$
<!-- proof-end -->

最初の項は

$$
\omega_0(z)=1+120z+113400z^2+168168000z^3+305540235000z^4+\cdots.
$$

例えば $a_2=10!/(2!)^5=3628800/32=113400$ である。[原点の指標根](../MIR1-10/index.md#prop-mir1-10-regular-singular)は四重の0だが、正則Taylor級数の自由度は $a_0$ の一つしかない。残りの局所解で必要となる対数項は次講で扱う。

## 3. 上昇階乗と超幾何級数

係数を $(5d)!$ のまま扱うより、連続積の組合せを使うと方程式の形が読み取りやすい。複素数 $\alpha$ と整数 $d\ge0$ に対し、$(\alpha)_0=1$、$d\ge1$ なら

$$
(\alpha)_d=\alpha(\alpha+1)\cdots(\alpha+d-1)
$$

という積を**上昇階乗**と呼ぶ。これは $\alpha$ の多項式であり、Gamma関数を前提にせず定義できる。隣接係数比が次数の有理式となる級数を記述する代表的な形が、一般化超幾何級数である。

<a id="def-mir1-11-hypergeometric"></a>

<!-- formal-statement-start -->
> **定義（本講の一般化超幾何級数）**
>
> $\alpha_1,\ldots,\alpha_4\in\mathbb C$、$\beta_1,\ldots,\beta_3\in\mathbb C\setminus\{0,-1,-2,\ldots\}$ とする。右辺が収束する範囲で、次の和を一般化超幾何級数と呼び、記号 $\;{}_4F_3$ で表す。

$$
{}_4F_3\left(\begin{matrix}\alpha_1,\alpha_2,\alpha_3,\alpha_4\\
\beta_1,\beta_2,\beta_3\end{matrix};x\right)
=\sum_{d=0}^\infty
\frac{(\alpha_1)_d(\alpha_2)_d(\alpha_3)_d(\alpha_4)_d}
{(\beta_1)_d(\beta_2)_d(\beta_3)_d}\frac{x^d}{d!}.
$$

> 分母パラメータの条件により $(\beta_j)_d\ne0$ であり、解析接続はこの定義に含めない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mir1-11-hypergeometric -->

**定義の直接例。** $\alpha_j=j/5$（$j=1,2,3,4$）、$\beta_1=\beta_2=\beta_3=1$ とすると $(1)_d=d!$ で、定義の分母が零にならない。$d=0$ の項は1、$d=1$ の項は

$$
\frac{(1/5)(2/5)(3/5)(4/5)}{1\cdot1\cdot1}x
=\frac{24}{625}x.
$$

$x=3125z$ なら $120z$ となり、正則解の一次係数と一致する。

<!-- definition-example-end -->

<a id="prop-mir1-11-hypergeometric"></a>

<!-- formal-statement-start -->
> **命題（quintic正則解の超幾何表示）**
>
> $|z|<1/3125$ において、先の正則解は次の収束級数と一致する。

$$
\boxed{\omega_0(z)={}_4F_3\left(
\begin{matrix}1/5,2/5,3/5,4/5\\1,1,1\end{matrix};3125z\right)}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$1,\ldots,5d$ を5で割った余りにより並べ、五つの上昇階乗のうち $(1)_d=d!$ を相殺すると四つの分子因子が残る。

<!-- proof-start -->
### 証明

$$
\begin{aligned}
(5d)!
&=\prod_{k=0}^{d-1}\prod_{j=1}^{5}(5k+j)
=5^{5d}\prod_{j=1}^5\prod_{k=0}^{d-1}(k+j/5)\\
&=3125^d(1/5)_d(2/5)_d(3/5)_d(4/5)_d(1)_d.
\end{aligned}
$$

$(1)_d=d!$ を使えば

$$
\frac{(5d)!}{(d!)^5}
=3125^d\frac{(1/5)_d(2/5)_d(3/5)_d(4/5)_d}{(d!)^4}.
$$

定義の $\beta_1=\beta_2=\beta_3=1$ は分母に $(d!)^3$、末尾の $1/d!$ がもう一つを与える。従って係数がすべて一致し、収束円板上の正則関数として同じである。$\square$
<!-- proof-end -->

$3125z$ という引数は単なる略記ではない。[前講の正則特異点](../MIR1-10/index.md#prop-mir1-10-regular-singular)の $z=1/3125$ を、超幾何変数 $x=3125z$ では $x=1$ に移すためである。

## 4. 収束円板の境界では何が起こるか

比の判定法だけでは $|z|=1/3125$ 上の収束を判定できない。ここで Stirling の公式 $n!\sim\sqrt{2\pi n}(n/e)^n$ を使う（$u_n\sim v_n$ は $u_n/v_n\to1$ の意味）。

<a id="prop-mir1-11-boundary"></a>

<!-- formal-statement-start -->
> **命題（境界での収束と導関数の発散）**
>
> $a_d=(5d)!/(d!)^5$、$R=1/3125$ とする。$\sum_{d\ge0}a_dz^d$ は $|z|=R$ でも絶対収束するが、実数 $r\uparrow R$ に対して $\omega_0'(r)\to+\infty$ となる。従って $z=R$ を含む開近傍へ正則延長できない。
<!-- formal-statement-end -->

### 証明の見取り図

Stirling の平方根因子まで残すと $a_dR^d$ は $d^{-2}$ に比例し、一回微分した係数は $d^{-1}$ 型になる。

<!-- proof-start -->
### 証明

$$
\begin{aligned}
a_d&\sim
\frac{\sqrt{10\pi d}(5d/e)^{5d}}
{(2\pi d)^{5/2}(d/e)^{5d}}
=\frac{\sqrt5}{4\pi^2}\frac{3125^d}{d^2}.
\end{aligned}
$$

従って $a_dR^d\sim\sqrt5/(4\pi^2d^2)$ で境界上も絶対収束する。一方、$0\le r<R$ では項別微分により

$$
\omega_0'(r)=\sum_{d=1}^\infty d a_dr^{d-1}.
$$

各項は非負であり、$r\uparrow R$ とすると $d a_dR^{d-1}\sim3125\sqrt5/(4\pi^2d)$ に近づく。各有限部分和を下界として先に $r\uparrow R$、次に項数を増やせば調和級数の発散から $\omega_0'(r)\to+\infty$。もし $R$ の近傍に正則延長が存在すれば導関数がそこで有限となり矛盾する。$\square$
<!-- proof-end -->

**注意。** 境界で級数の値が有限でも正則延長はできない。また、微分方程式の特異点だからといって全ての個別解が発散するわけでもない。
