# MIR1-12 Frobenius法と対数周期

<!-- definition-example-audit: strict -->

## 1. 四重の指標根から何を作りたいか

[quinticのPicard–Fuchs作用素](../MIR1-10/index.md#thm-mir1-10-quintic-pf)を

$$
\mathcal L=\theta^4-5z(5\theta+1)(5\theta+2)(5\theta+3)(5\theta+4),
\qquad \theta=z\frac{d}{dz}
$$

と置く。[原点の指標根](../MIR1-10/index.md#prop-mir1-10-regular-singular)は四重の0だが、[原点で正則な規格化解](../MIR1-11/index.md#thm-mir1-11-regular-period)は

$$
\omega_0(z)=\sum_{d=0}^\infty a_dz^d,\qquad a_d=\frac{(5d)!}{(d!)^5}
$$

の定数倍しかない。[正則係数の漸化式](../MIR1-10/index.md#prop-mir1-10-coefficient-recurrence)が $a_0$ 以外を一意に決めるためである。四階方程式のほかの三解は、単にTaylor係数を別に選ぶ方法では得られない。

[ODE6のFrobenius級数](../../../解析系/ODE/ODE6/index.md#def-ode6-frobenius-series)は、実の正軸上で先頭指数を選ぶ方法だった。ここでは複素変数 $z$ に拡張し、指数を指標根に固定する前に補助パラメータ $\rho$ として動かす。$\rho$ が任意のときはまだ微分方程式の解とは限らず、その残差を次節で調べる。

指数を $\rho$ だけずらした $z^{d+\rho}$ を考えると、$z$ を固定した $\rho$ 微分で $\operatorname{Log}z$ が生じる。この仕組みを使って四本の**Frobenius局所解**を作ろう。ただし対数は多価だから、$R=1/3125$、$0<\delta<R$ を取り

$$
U_\delta=\{z:0<|z|<\delta,\ -\pi<\arg z<\pi\},
\qquad \operatorname{Log}z=\log|z|+i\arg z
$$

を固定する。以下 $z^\rho=e^{\rho\operatorname{Log}z}$ である。$z=0$ は [Dwork族の退化境界](../MIR1-06/index.md#prop-mir1-06-z-discriminant)であり、領域に入れない。

## 2. パラメータを動かすと残差が四次になる

ここで微分する変数を区別する。$\theta=z\,d/dz$ は **$\rho$ を固定して $z$ で微分する** 演算子であり、$\partial_\rho=\partial/\partial\rho$ は **$z$ を固定して $\rho$ で微分する** 演算子である。係数 $c_d(\rho)$ は $\rho$ のみの関数なので、後に現れる $c_d'(\rho)$ および $c_d^{(k)}(\rho)$ は、いずれも $\rho$ に関する通常の一階・$k$ 階導関数を表す。

$z^{d+\rho}$ に $\theta$ を作用させると

$$
\theta z^{d+\rho}
=z\frac{d}{dz}e^{(d+\rho)\operatorname{Log}z}
=(d+\rho)z^{d+\rho}
$$

になる。係数にも $\rho$ を入れ、$d\ge1$ について相殺を起こしたい。そこで、$|\rho|<1/2$ で

$$
c_0(\rho)=1,\qquad
c_d(\rho)=\prod_{k=1}^d
\frac{5\prod_{j=1}^4(5(k-1+\rho)+j)}{(k+\rho)^4}
\quad(d\ge1)
$$

と置く。この範囲では $k+\rho\ne0$ である。

<a id="def-mir1-12-frobenius-family"></a>

<!-- formal-statement-start -->
> **定義（Frobeniusパラメータ族）**
>
> $0<\delta<1/3125$、$z\in U_\delta$、$|\rho|<1/2$ とし、上の係数を使う。固定した対数分枝に関するFrobeniusパラメータ族は次の級数である。

$$
F(\rho,z)=z^\rho\sum_{d=0}^\infty c_d(\rho)z^d.
$$

> 収束とパラメータ微分の正当化は続く定理で証明する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mir1-12-frobenius-family -->

**定義の確認**。 $d=1$ の場合は

$$
c_1(\rho)=\frac{5(5\rho+1)(5\rho+2)(5\rho+3)(5\rho+4)}{(1+\rho)^4}.
$$

分母は $|\rho|<1/2$ で零にならず、$c_1(0)=5\cdot1\cdot2\cdot3\cdot4=120$。さらに定義の係数が既習の正則周期と**全次数で**一致することを確かめる。第1節の $a_d=(5d)!/(d!)^5$ に対し、$d\ge1$ では

$$
\begin{aligned}
\frac{c_d(0)}{c_{d-1}(0)}
&=\frac{5\prod_{j=1}^4(5(d-1)+j)}{d^4}\\
&=\frac{\prod_{j=1}^5(5(d-1)+j)}{d^5}\\
&=\frac{(5d)!}{(5d-5)!}\frac{((d-1)!)^5}{(d!)^5}
=\frac{a_d}{a_{d-1}}.
\end{aligned}
$$

$c_0(0)=a_0=1$ だから帰納的に $c_d(0)=a_d$ となる。これにより $F(0,z)$ は[原点で正則な規格化解](../MIR1-11/index.md#thm-mir1-11-regular-period)そのもので、冒頭は $1+120z+\cdots$ となる。

<!-- definition-example-end -->

<a id="thm-mir1-12-residual"></a>

<!-- formal-statement-start -->
> **定理（Frobenius族の残差公式）**
>
> $\mathcal L=\theta^4-5z\prod_{j=1}^4(5\theta+j)$ と上記の $F$ を考える。$F$ は $|\rho|<1/2$ と $z\in U_\delta$ について局所一様収束して両変数で正則であり、

$$
\boxed{\mathcal L F(\rho,z)=\rho^4z^\rho}
$$

> が成り立つ。従って $k=0,1,2,3$ のそれぞれについて $\partial_\rho^kF(0,z)$ は $\mathcal L y=0$ の解である。
<!-- formal-statement-end -->

### 証明の見取り図

$\theta z^{d+\rho}=(d+\rho)z^{d+\rho}$ なので、正の次数の係数は隣接項と相殺する。最初の項だけが $\rho^4z^\rho$ として残る。

<!-- proof-start -->
### 証明

係数の定義から

$$
(d+\rho)^4c_d(\rho)
=5\prod_{j=1}^4(5(d-1+\rho)+j)c_{d-1}(\rho)
\qquad(d\ge1).
$$

$\theta^4F$ の $z^{d+\rho}$ 係数は左辺、$5z\prod(5\theta+j)F$ の係数は右辺で、打ち消し合う。$d=0$ に対応する右辺の項は存在しないので $\rho^4c_0(\rho)z^\rho=\rho^4z^\rho$ だけが残る。

無限級数についても確かめる。任意の $0<\varepsilon<1/2$ で $|\rho|\le\varepsilon$ とすると

$$
r_d(\rho):=\frac{5\prod_{j=1}^4(5(d-1+\rho)+j)}{(d+\rho)^4}
\longrightarrow3125
$$

が $\rho$ に関して一様である。ここで $r_d$ は、係数が零になる場合にも定義されている。定義式に戻れば次の関係が成立する。

$$
c_d(\rho)=r_d(\rho)c_{d-1}(\rho).
$$

任意の $r<R$ に対して $3125r<q<1$ を選ぶ。十分大きな $d$ と $|z|\le r$ では、次の一様な評価が成立する。

$$
|c_d(\rho)z^d|
\le q|c_{d-1}(\rho)z^{d-1}|.
$$

従って尾部を幾何級数で一様に抑えられる。切断領域のコンパクト集合上では $z^\rho$ も有界なので、$F$ は局所一様な正則関数列の極限である。

各点のまわりで、閉包が $U_\delta$ 内に入る小さな $z$ 円板と、$|\rho|<1/2$ 内に入る $\rho$ 円板を取れる。そこでの一様収束とCauchyの積分公式から、$z$ に関する四階までの微分も、$\rho$ に関する三階までの微分も、級数と交換できる。特に $\theta^4$ と $\prod_{j=1}^4(5\theta+j)$ は項別に作用させてよい。以上より、形式的な項の相殺は正則関数の等式である。

$\mathcal L$ は $\rho$ に依存しないから

$$
\mathcal L\left(\left.\partial_\rho^k F\right|_{\rho=0}\right)
=\left.\partial_\rho^k(\rho^4e^{\rho\operatorname{Log}z})\right|_{\rho=0}=0
\quad(0\le k\le3).
$$

最後の等号は右辺に $\rho^0,\rho^1,\rho^2,\rho^3$ の項がないためである。$\square$
<!-- proof-end -->

**うまくいかない方法。** 係数を $c_d(0)$ に固定して $z^\rho\omega_0(z)$ とすると、$d=1$ の係数の残差は

$$
120(1+\rho)^4-5\prod_{j=1}^4(5\rho+j)
$$

となり、一般の $\rho$ で零ではない。指数と係数を**同時に**動かすことが必要である。

## 3. 対数解を四本作り、独立性を証明する

ここでいう**基本解系**は、[ODE2の解空間・基本解系の定義](../../../解析系/ODE/ODE2/index.md#def-ode2-solution-space)を複素数値解へ拡張したもので、同次四階方程式の解空間の基底をなす四関数を指す。

$k=0,1,2,3$ に対し $y_k=(\partial_\rho^kF)(0,z)/k!$ と置く。次の正則補正を先に用意する。

$$
A_0(z)=\omega_0(z),\qquad
A_k(z)=\sum_{d=1}^\infty\frac{c_d^{(k)}(0)}{k!}z^d
\quad(k=1,2,3).
$$

$c_0$ は $\rho$ に依存しないので $A_k(0)=0$ である。

<a id="thm-mir1-12-log-basis"></a>

<!-- formal-statement-start -->
> **定理（四本の対数局所解と基本解系）**
>
> $\mathcal L=\theta^4-5z\prod_{j=1}^4(5\theta+j)$、$z\in U_\delta$、固定分枝 $L=\operatorname{Log}z$ とする。次の四関数は $\mathcal L y=0$ の解であり、$U_\delta$ 上の基本解系をなす。各 $A_k$ は $|z|<1/3125$ で正則である。

$$
\begin{aligned}
y_0&=\omega_0,\\
y_1&=\omega_0 L+A_1,\\
y_2&=\tfrac12\omega_0 L^2+A_1L+A_2,\\
y_3&=\tfrac16\omega_0 L^3+\tfrac12A_1L^2+A_2L+A_3.
\end{aligned}
$$

> 基本解系とは、四本が線形独立であり、この領域のすべての解が定数係数線形結合で表せることをいう。
<!-- formal-statement-end -->

### 証明の見取り図

積の微分で対数べきの係数を導く。独立性は、正の実数 $x\downarrow0$ で $\log x$ の次数が $0,1,2,3$ と異なることから従う。

<!-- proof-start -->
### 証明

$F=e^{\rho L}C(\rho,z)$、$C=\sum c_d(\rho)z^d$ と置く。$z$ は固定しているので $L=\operatorname{Log}z$ は $\rho$ 微分では定数であり、積の微分則を $k$ 回用いると

$$
\partial_\rho^kF
=e^{\rho L}\sum_{j=0}^k\binom{k}{j}L^{k-j}\partial_\rho^jC.
$$

両辺を $k!$ で割り、$\binom{k}{j}/k!=1/((k-j)!j!)$ を使うと

$$
\left.\frac1{k!}\partial_\rho^kF\right|_{\rho=0}
=\sum_{j=0}^k\frac{L^{k-j}}{(k-j)!}
\left.\frac1{j!}\partial_\rho^jC\right|_{\rho=0}.
$$

$C(0,z)=\omega_0$ と $\partial_\rho^jC(0,z)/j!=A_j$（$j\ge1$）を代入すると四式が得られる。[残差公式](#thm-mir1-12-residual)により全て方程式の解である。

$x\downarrow0$ を正の実軸上で考える。$\omega_0(x)=1+O(x)$、$A_j(x)=O(x)$ であり、固定された整数 $m$ に対し $x|\log x|^m\to0$。従って

$$
y_k(x)=\frac{(\log x)^k}{k!}+o(1)
\qquad (k=0,1,2,3).
$$

$\sum_{k=0}^3b_ky_k=0$ という関係があるとする。$b_m\ne0$ となる最大の添字を $m$ として $(\log x)^m$ で割り、$x\downarrow0$ とすれば $0=b_m/m!$ となり矛盾する。よって線形独立である。

$\theta^4$ に含まれる最高階微分項の係数は $z^4$、$5z\prod(5\theta+j)$ のそれは $3125z^5$ であり、差は

$$
z^4(1-3125z)\ne0\qquad(z\in U_\delta).
$$

したがってこの領域の各点は通常点である。ここでは最高階係数で割った後の各係数が正則である。[高階線形初期値問題の存在・一意性](../../../解析系/ODE/ODE2/index.md#thm-ode2-linear-ivp)のPicard反復は複素係数の正則な方程式にも局所的に適用できる。具体的には、正則係数の積分を小円板内の線分に沿って行えば、Picard反復の収束評価は実数の場合と変わらず、極限は正則関数となる。初期値 $y(z_0),y'(z_0),y''(z_0),y'''(z_0)$ の四つの複素数を任意に指定でき、一意性がある。このため初期データ写像

$$
E_{z_0}(y)=\bigl(y(z_0),y'(z_0),y''(z_0),y'''(z_0)\bigr)\in\mathbb C^4
$$

は複素線形全単射となる。これは[ODE2の斉次解空間の次元定理](../../../解析系/ODE/ODE2/index.md#thm-ode2-solution-space-dim)と同じ論証を正則な複素方程式に適用したもので、局所解空間は複素四次元である。従って四本の独立解が全局所解を張る。$U_\delta$ は単連結なので、同じ式による解析接続が領域全体で一致する。$\square$
<!-- proof-end -->

**一次係数の直接例。** 定義した有理式を $\rho=0$ でTaylor展開すると

$$
c_1(\rho)=120+770\rho+575\rho^2-1150\rho^3+O(\rho^4).
$$

従って $A_1(z)=770z+O(z^2)$、$A_2(z)=575z+O(z^2)$、$A_3(z)=-1150z+O(z^2)$。$y_2$ の対数一次項は $A_1L$、対数を含まない項は $A_2$ である。$y_3$ では係数 $1/6$ と $1/2$ の違いも見落とせない。

## 4. 調和数で第一対数補正を再計算する

係数を毎回有理式として展開する代わりに、積を対数微分する。$d\ge1$ で $a_d=c_d(0)>0$、調和数を $H_n=\sum_{k=1}^n 1/k$ とする。$1,\ldots,5d$ のうち5の倍数以外の逆数和は $H_{5d}-H_d/5$ である。

<a id="prop-mir1-12-harmonic"></a>

<!-- formal-statement-start -->
> **命題（対数解の第一正則補正）**
>
> $\omega_0=\sum_{d\ge0}a_dz^d$、$a_d=(5d)!/(d!)^5$ とする。$|z|<1/3125$ 上で、第一の正則補正は次の収束級数となる。

$$
\boxed{A_1(z)=5\sum_{d=1}^\infty a_d(H_{5d}-H_d)z^d
=770z+810225z^2+O(z^3).}
$$
<!-- formal-statement-end -->

### 証明の見取り図

各因子の対数微分は逆数になる。5の倍数の寄与を全体から引き、係数に戻す。

<!-- proof-start -->
### 証明

$$
\begin{aligned}
\frac{c_d'(0)}{c_d(0)}
&=\sum_{k=1}^d\left(
5\sum_{j=1}^4\frac1{5(k-1)+j}-\frac4k\right)\\
&=5\left(H_{5d}-\frac{H_d}{5}\right)-4H_d
=5(H_{5d}-H_d).
\end{aligned}
$$

従って $c_d'(0)=5a_d(H_{5d}-H_d)$。$d=1$ で $H_5=137/60$、$H_1=1$ だから $5\cdot120\cdot77/60=770$。$d=2$ で $H_{10}=7381/2520$、$H_2=3/2$ だから

$$
5\cdot113400\left(\frac{7381}{2520}-\frac32\right)
=5\cdot113400\frac{3601}{2520}=810225.
$$

[残差公式の収束証明](#thm-mir1-12-residual)によって微分と和を交換できるため、級数としても等式が成り立つ。$\square$
<!-- proof-end -->

## 5. 周期比はどこで、どの規格化で定義できるか

$\omega_0(0)=1$ と正則性から十分小さな $0<\delta_0<R$ について $|\omega_0(z)-1|<1/2$（$|z|<\delta_0$）とできる。このとき $|\omega_0(z)|>1/2$ であり、比の分母が消えない。

<a id="def-mir1-12-period-ratio"></a>

<!-- formal-statement-start -->
> **定義（規格化した局所周期比）**
>
> $0<|z|<\delta_0$ の切断領域で、$y_0=\omega_0$、$y_1=\omega_0\operatorname{Log}z+A_1$ とする。局所周期比は

$$
T(z)=\frac{y_1(z)}{y_0(z)}
=\operatorname{Log}z+\frac{A_1(z)}{\omega_0(z)}
$$

> である。対数分枝を固定し、$y_0(0)=1$、$A_1(0)=0$、対数の係数が $y_0$ という規格化を採用する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mir1-12-period-ratio -->

**定義の確認**。 $\omega_0=1+120z+113400z^2+\cdots$、$A_1=770z+810225z^2+\cdots$ なので、$h=A_1/\omega_0=h_1z+h_2z^2+\cdots$ と置く。$\omega_0h=A_1$ を係数比較すると $h_1=770$、$h_2+120h_1=810225$ となる。分母が非零であること、分枝が固定されていることを確認してから割った。

<!-- definition-example-end -->

<a id="prop-mir1-12-ratio-branch"></a>

<!-- formal-statement-start -->
> **命題（周期比の展開と対数の分枝）**
>
> 上記の領域と規格化では次が成り立つ。

$$
\boxed{T(z)=\operatorname{Log}z+770z+717825z^2+O(z^3).}
$$

> 原点を正向きに一周する解析接続は $T\mapsto T+2\pi i$ を与える。一方、$y_1$ を $y_1+c y_0$ に選び直せば、比は $T+c$ になる。
<!-- formal-statement-end -->

### 証明の見取り図

係数比較と対数の一周の増分を別々に検算する。正則補正そのものは一価である。

<!-- proof-start -->
### 証明

上記の係数比較から $h_2=810225-120\cdot770=717825$ を得る。$h=A_1/\omega_0$ は原点まで正則に延長されるから一価であり、原点を正向きに一周すると $\operatorname{Log}z$ だけが $2\pi i$ 増える。ゆえに $T$ の増分は $2\pi i$。また $(y_1+cy_0)/y_0=T+c$ は $\omega_0\ne0$ 上で恒等的に成立する。$\square$
<!-- proof-end -->

局所Frobenius解の選択と、幾何学的な**積分周期基底**の選択は区別しよう。[留数で実際の周期を作った結果](../MIR1-11/index.md#prop-mir1-11-torus-period)が与えるのは一つの規格化された正則周期である。ほかの三解をどの整数サイクルに対応させるかは今回の局所計算からは決まらない。$2\pi i$ による除算や周期の線形結合を無断で「唯一の鏡像座標」と呼んではならない。

## 6. 演習と詳細解答

### Level A：一つずつ確認する

<a id="ex-mir1-12-a01"></a>
#### MIR1-12-A01 指数をずらした項
- Level: A

$\theta z^{d+\rho}$ と $\theta^4z^\rho$ を計算し、$F=z^\rho\sum c_dz^d$ の $d=0$ の残差が消えない理由を説明せよ。

<!-- solution-start -->
**詳細解答。** $z^{d+\rho}=e^{(d+\rho)\operatorname{Log}z}$ を微分すると $(d+\rho)z^{d+\rho-1}$。従って $\theta z^{d+\rho}=(d+\rho)z^{d+\rho}$、特に $\theta^4z^\rho=\rho^4z^\rho$ である。$5z\prod(5\theta+j)F$ は各項の $z$ の次数を一つ上げるので $z^\rho$ 項を作らない。$c_0=1$ なら $\rho^4z^\rho$ が残る。
<!-- solution-end -->

<a id="ex-mir1-12-a02"></a>
#### MIR1-12-A02 一次係数の微分
- Level: A

$c_1(\rho)=5\prod_{j=1}^4(5\rho+j)/(1+\rho)^4$ から $c_1(0),c_1'(0)$ を求めよ。

<!-- solution-start -->
**詳細解答。** $c_1(0)=5\cdot24=120$。$\rho$ による対数微分では、分子の四因子と分母の四乗からそれぞれ逆数の項が生じる。

$$
\frac{c_1'(0)}{c_1(0)}
=5(1+1/2+1/3+1/4)-4
=125/12-4=77/12.
$$

従って

$$
c_1'(0)=120\cdot\frac{77}{12}=770.
$$

$c_1(0)$ は $\omega_0$ の一次係数、$c_1'(0)$ は $A_1$ の一次係数である。
<!-- solution-end -->

<a id="ex-mir1-12-a03"></a>
#### MIR1-12-A03 二回微分と対数係数
- Level: A

$F=e^{\rho L}C(\rho,z)$、$L=\operatorname{Log}z$ として $y_2=\partial_\rho^2F(0,z)/2!$ を導け。

<!-- solution-start -->
**詳細解答。** $\partial_\rho(e^{\rho L}C)=e^{\rho L}(LC+C')$。再び微分すると $e^{\rho L}(L^2C+2LC'+C'')$。$\rho=0$ では $C=\omega_0$、$C'=A_1$、$C''/2=A_2$ だから

$$
y_2=\omega_0L^2/2+A_1L+A_2.
$$

中間の係数2と外側の $2!$ により $A_1L$ の係数は1となる。
<!-- solution-end -->

<a id="ex-mir1-12-a04"></a>
#### MIR1-12-A04 分母と分枝の条件
- Level: A

$\omega_0(0)=1$ から、原点近くで $T=y_1/\omega_0$ の分母が消えない理由を示せ。$z=0$ を含めない理由も答えよ。

<!-- solution-start -->
**詳細解答。** 連続性から $|z|<\delta_0$ で $|\omega_0(z)-1|<1/2$ と取れる。ゆえに $|\omega_0(z)|\ge1-|\omega_0(z)-1|>1/2$ となり割り算が可能である。一方 $\operatorname{Log}z$ は $z=0$ では定義されず、$z\to0$ で有界でもない。切断領域を選んで対数分枝を固定しなければ $T$ は一価にならない。
<!-- solution-end -->

### Level B：証明を組み合わせる

<a id="ex-mir1-12-b01"></a>
#### MIR1-12-B01 係数比から一様収束へ
- Level: B

$|\rho|\le\varepsilon<1/2$ で $c_d(\rho)=r_d(\rho)c_{d-1}(\rho)$ を満たす有理因子 $r_d(\rho)$ が一様に3125へ収束するとする。任意の $r<1/3125$ で $\sum c_d(\rho)z^d$ が $|z|\le r$ 上一様絶対収束することを説明し、$\rho$ 微分の交換を正当化せよ。

<!-- solution-start -->
**詳細解答。** $3125r<q<1$ と取る。$r_d(\rho)$ は係数の零点でも定義される有理因子であり、商 $c_d/c_{d-1}$ とは無条件に書かない。

一様極限から十分大きな $N$ が存在し、$d\ge N$ と $|z|\le r$ では

$$
|c_d(\rho)z^d|\le q|c_{d-1}(\rho)z^{d-1}|
$$

が成り立つ。有限個の係数は $\rho$ のコンパクト円板上有界なので、尾部は $M\sum_{j\ge0}q^j$ で抑えられ、一様絶対収束する。

さらに $\varepsilon<\varepsilon'<1/2$ として、少し大きな $\rho$ 円板上でも同じ評価を得る。内側の円板でCauchyの積分公式を適用し、積分と級数の和を交換すれば、各階の $\rho$ 微分について項別微分が正当化される。
<!-- solution-end -->

<a id="ex-mir1-12-b02"></a>
#### MIR1-12-B02 調和数で二次係数を計算
- Level: B

$c_d'(0)$ を調和数で表し、$A_1$ の $z^2$ 係数を検算せよ。

<!-- solution-start -->
**詳細解答。** [Frobenius族の係数](#def-mir1-12-frobenius-family)の対数微分は

$$
\frac{c_d'(0)}{c_d(0)}
=5\left(H_{5d}-\frac{H_d}{5}\right)-4H_d
=5(H_{5d}-H_d).
$$

$d=2$ では $a_2=113400$、$H_{10}-H_2=7381/2520-3/2=3601/2520$ だから

$$
c_2'(0)=5\cdot113400\cdot3601/2520
=225\cdot3601=810225.
$$

これが $A_1$ の二次係数である。
<!-- solution-end -->

<a id="ex-mir1-12-b03"></a>
#### MIR1-12-B03 基本解系の独立性
- Level: B

$y_k(x)=(\log x)^k/k!+o(1)$（$x\downarrow0$、$0\le k\le3$）を用い、線形独立性を証明せよ。さらに方程式の最高階係数を計算せよ。

<!-- solution-start -->
**詳細解答。** $\sum_{k=0}^3b_ky_k=0$ と仮定し、$b_m\ne0$ となる最大の $m$ を取る。両辺を $(\log x)^m$ で割り、$x\downarrow0$ とすると、$k<m$ では $(\log x)^{k-m}\to0$ で、誤差項も $o(1)/(\log x)^m\to0$ となる。従って

$$
0=\lim_{x\downarrow0}\sum_{k=0}^m
b_k\frac{y_k(x)}{(\log x)^m}
=\frac{b_m}{m!},
$$

となり矛盾する。最高階微分の係数は、$\theta=z\,d/dz$ の四回の積から $z^4$、$5z\prod_{j=1}^4(5\theta+j)$ から $5z\cdot5^4z^4=3125z^5$ なので、

$$
p_4(z)=z^4-3125z^5=z^4(1-3125z)\ne0
\qquad(0<|z|<R).
$$

この領域の各点は四階方程式の通常点であり、[高階線形初期値問題の存在・一意性](../../../解析系/ODE/ODE2/index.md#thm-ode2-linear-ivp)を前述の複素正則係数の場合へ拡張すれば解空間は四次元となる。四本の独立解は基本解系をなす。
<!-- solution-end -->

<a id="ex-mir1-12-b04"></a>
#### MIR1-12-B04 解の変更と解析接続
- Level: B

$T=y_1/y_0$ とする。(i) $z=0$ の周りを正向きに一周したとき、(ii) $y_1$ を $y_1+3y_0$ に取り替えたときの $T$ の変化を求め、違いを述べよ。

<!-- solution-start -->
**詳細解答。** (i) では $\operatorname{Log}z\mapsto\operatorname{Log}z+2\pi i$、$A_1/\omega_0$ は一価なので $T\mapsto T+2\pi i$。(ii) では $(y_1+3y_0)/y_0=T+3$。(i) は同じ多価解の解析接続で、反時計回り一周に対応する固定増分である。(ii) は解を別の定数係数線形結合へ選び直す任意の自由度であり、一周に限ったものではない。$A_1(0)=0$ の規格化は後者を固定するが前者を消さない。
<!-- solution-end -->

### Level C：局所解と周期比の総合

<a id="ex-mir1-12-c01"></a>
#### MIR1-12-C01 Frobenius法の全計算
- Level: C

次の四階作用素を考える。

$$
\mathcal L=\theta^4-5z\prod_{j=1}^4(5\theta+j).
$$

$c_0(\rho)=1$ から $F=z^\rho\sum c_d(\rho)z^d$ を構成し、以下を順に示せ。

1. 係数漸化式と残差を求める。
2. 四本の対数解が基本解系である理由を示す。
3. 周期比 $T=y_1/y_0$ の $z^2$ までの正則補正を計算する。
4. 原点を一周したときの周期比の変化を求める。

使用する領域と規格化を明示せよ。

<!-- solution-start -->
**詳細解答。** $0<\delta<R=1/3125$ の負の実軸を除く領域で $\operatorname{Log}z$ を選ぶ。$\theta z^{d+\rho}=(d+\rho)z^{d+\rho}$ なので $d\ge1$ では

$$
(d+\rho)^4c_d(\rho)
=5\prod_{j=1}^4(5(d-1+\rho)+j)c_{d-1}(\rho).
$$

これを順に解くと [係数の積表示](#def-mir1-12-frobenius-family)になる。隣接係数を結ぶ有理因子 $r_d(\rho)$ は $\rho$ のコンパクト円板上で一様に3125へ収束するので $|z|<R$ 内で級数と $\rho$ 微分は局所一様収束する。$d\ge1$ の項は相殺し $d=0$ の項だけ残って $\mathcal L F=\rho^4z^\rho$。従って $y_k=\partial_\rho^kF(0,z)/k!$（$0\le k\le3$）は解である。

$F=e^{\rho L}C$ を積で微分すると

$$
\begin{aligned}
y_0&=\omega_0,\\
y_1&=\omega_0L+A_1,\\
y_2&=\omega_0L^2/2+A_1L+A_2,\\
y_3&=\omega_0L^3/6+A_1L^2/2+A_2L+A_3,
\end{aligned}
\qquad L=\operatorname{Log}z.
$$

$c_0=1$ なので $\omega_0(0)=1$、$A_j(0)=0$、従って $y_k(x)=(\log x)^k/k!+o(1)$。最大の対数次数で割る極限により四本は線形独立。最高階係数は $z^4(1-3125z)\ne0$ なので四階方程式の解空間を張る。

$A_1=5\sum_{d\ge1}a_d(H_{5d}-H_d)z^d=770z+810225z^2+\cdots$ であり、[正則周期](../MIR1-11/index.md#thm-mir1-11-regular-period)は $\omega_0=1+120z+113400z^2+\cdots$。$A_1/\omega_0=h_1z+h_2z^2+\cdots$ として掛け算すると $h_1=770$、$h_2+120h_1=810225$、よって $h_2=717825$。$\omega_0(0)=1$ なので十分小さい円板で分母が消えず

$$
T(z)=\operatorname{Log}z+770z+717825z^2+O(z^3).
$$

正向き一周では $\operatorname{Log}z$ のみ $2\pi i$ 増え、$T\mapsto T+2\pi i$。この構成は局所Frobenius基底の規格化であって積分周期格子を指定していない。
<!-- solution-end -->

## 7. 次講へ

四重の指標根から四本の局所解を構成できた。対数の分枝の変化は各解の解析接続に作用する。次講 **MIR1-13「大複素構造極限と最大単冪モノドロミー」** では、四本全体への作用を行列として計算し、「最大単冪」が意味する条件を検証する。

**参考文献**：[Cox–Katz, *Mirror Symmetry and Algebraic Geometry*](https://doi.org/10.1090/surv/068)、[Horiほか, *Mirror Symmetry*](https://www.claymath.org/resource/mirror-symmetry/)、[Candelasほか（1991）](https://www.staff.science.uu.nl/~beuke106/HypergeometricFunctions/COGP.pdf)。本講の係数、局所解、規格化と解析接続の計算は本文で示した。
