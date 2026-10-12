# ANT7 非自明零点・明示公式・零点計数

[ANT6の零点不存在定理](../ANT6/index.md#thm-ant6-zeta-line-one)は、$\operatorname{Re}s=1$ に零点がないことを示し、[ANT6の素数定理](../ANT6/index.md#thm-ant6-prime-number-theorem)へつながりました。しかし「零点がない境界」を知ることと、「内部に零点が何個あり、素数の揺らぎへどう寄与するか」を知ることは違います。

本章では次の順で、その隔たりを埋めます。まず関数等式から零点の位置と対称性を確定します。次に偏角原理で高さ $T$ までの零点数を数えます。最後に素数の階段関数を少し平滑化してからMellin反転し、各零点の寄与が**留数として必然的に現れる**ことを証明します。階段関数そのものの古典的な明示公式との違いも明示します。

以下、$\zeta$ はRiemann ζ関数、$\rho=\beta+i\gamma$ は零点、$\log$ は自然対数です。零点は重複度を含めて数えます。

## 1. 臨界帯と完成ζの対称性

[CA12のEuler積](../../../解析系/CA/CA12/index.md#thm-ca12-euler-product)から $\operatorname{Re}s>1$ で $\zeta(s)\ne0$ です。一方、[CA12の関数等式](../../../解析系/CA/CA12/index.md#thm-ca12-functional-equation)は負の実部の零点を制限し、[CA12の自明零点](../../../解析系/CA/CA12/index.md#cor-ca12-trivial-zeros)は $-2,-4,\ldots$ です。[ANT6の定理](../ANT6/index.md#thm-ant6-zeta-line-one)を加えると、残る零点は開いた帯に閉じ込められます。

これからζの零点を探す開いた帯 $0<\operatorname{Re}s<1$ とその中央の直線 $\operatorname{Re}s=1/2$ に注目します。この二つの集合および負の偶数以外の零点の名称を次の定義で定めます。例えば $s=1/2+it$ は中央の直線にありますが、任意の $t$ でζが零になると主張しているわけではありません。

<a id="def-ant7-critical-zeros"></a>

<!-- formal-statement-start -->
> **定義（臨界帯と非自明零点）**  
> Riemann ζ関数の零点 $s$ のうち $s=-2m$（$m=1,2,\ldots$）ではないものを非自明零点という。臨界帯および臨界線をそれぞれ

$$
\mathcal S=\{s\in\mathbb C:0<\operatorname{Re}s<1\},
\qquad
\mathcal L=\{s\in\mathbb C:\operatorname{Re}s=1/2\}
$$

> と置く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ant7-critical-zeros -->
**定義の確認**：$-2$ は[CA12で実際に零点と証明された](../../../解析系/CA/CA12/index.md#cor-ca12-trivial-zeros)点ですが、自明零点なので除きます。$1/2+3i$ は帯と線の双方に属しますが、そこが零点かどうかは別の問題です。したがって「帯に属する」と「零点である」は別々に確認します。
<!-- definition-example-end -->

[CA12で構成したRiemann xi関数](../../../解析系/CA/CA12/index.md#def-ca12-completed-zeta)は

$$
\xi(s)=\frac12s(s-1)\pi^{-s/2}\Gamma(s/2)\zeta(s)
$$

という整関数で、[関数等式](../../../解析系/CA/CA12/index.md#thm-ca12-functional-equation)から $\xi(s)=\xi(1-s)$ です。係数を掛けた理由は、$\zeta$ の $1$ での極と $\Gamma(s/2)$ の $0$ での極を消し、対称性を整関数へ移すためでした。

<a id="thm-ant7-zero-symmetry"></a>

<!-- formal-statement-start -->
> **定理（非自明零点の位置と対称性）**  
> $\zeta$ の非自明零点はすべて $\mathcal S$ に属する。$\xi$ の零点は重複度も含めて非自明零点と一致する。さらに $\rho$ が零点なら、$\overline\rho$、$1-\rho$、$1-\overline\rho$ も同じ重複度の零点である。
<!-- formal-statement-end -->

### 証明の見取り図

負の側は関数等式、右の側はEuler積、境界はANT6で除きます。帯の内部では $\Gamma(s/2)$ や $s(s-1)$ は零にも極にもならず、$\zeta$ と $\xi$ の零点を対応させられます。

<!-- proof-start -->
### 証明

まず $\operatorname{Re}s>1$ には[Euler積](../../../解析系/CA/CA12/index.md#thm-ca12-euler-product)から零点がありません。$\operatorname{Re}s<0$ では

$$
\zeta(s)=2^s\pi^{s-1}\sin(\pi s/2)\Gamma(1-s)\zeta(1-s)
$$

を使います。$1-s$ の実部は $1$ より大きいので $\zeta(1-s)\ne0$、$\Gamma(1-s)$ は有限かつ非零です。従って負の半平面の零点は $\sin(\pi s/2)=0$ に由来する負の偶数だけです。

$\operatorname{Re}s=1$ は[ANT6の零点不存在定理](../ANT6/index.md#thm-ant6-zeta-line-one)で除かれます。$\operatorname{Re}s=0$ の点 $s=it$、$t\ne0$ なら $1-s$ は実部1の非零点です。

[CA12の完成ζの対称性](../../../解析系/CA/CA12/index.md#def-ca12-completed-zeta)から $\xi(it)=\xi(1-it)\ne0$ を得ます。また $s=0$ は[CA12の特殊値](../../../解析系/CA/CA12/index.md#cor-ca12-special-values) $\zeta(0)=-1/2$ により零点ではありません。

帯の内部では $s(s-1)\ne0$、$\Gamma(s/2)$ は有限かつ非零であり、$\pi^{-s/2}\ne0$ です。従って $\xi$ と $\zeta$ の零点およびその位数が一致します。$s=0,1$ に関しては、それぞれの単純極を相殺した結果 $\xi(0)=\xi(1)=1/2$ なので追加の零点はありません。負の偶数では $\zeta$ の単純零点が $\Gamma(s/2)$ の単純極を相殺し、$\xi$ はそこでも非零です。

最後に $\xi(s)=\xi(1-s)$ は位数を保存します。また $\zeta(\overline s)=\overline{\zeta(s)}$ は $\operatorname{Re}s>1$ の実係数級数で成立し、[解析接続の一意性](../../../解析系/CA/CA5/index.md#thm-ca5-continuation-uniqueness)により全平面へ延長されます。これらを順に用いると四点の対称性が得られます。
<!-- proof-end -->

臨界線から外れた零点は左右対称な組になります。この事実**だけ**では、零点がすべて臨界線上にあるとは証明できません。

## 2. 偏角を数に変える――Riemann–von Mangoldtの零点計数

高さ $T>0$ までに零点が何個あるかを知るには、零点の位置を一つずつ求める必要はありません。正則関数の零点の数を閉曲線上の偏角の総変化に移す[偏角原理](../../../解析系/CA/CA4/index.md#thm-ca4-argument-principle)を使います。

<a id="def-ant7-zero-count"></a>

<!-- formal-statement-start -->
> **定義（非自明零点の計数関数）**  
> $T>0$ が零点の虚部と一致しないとき、

$$
N(T)=\sum_{\substack{\zeta(\rho)=0,\ 0<\operatorname{Re}\rho<1\\0<\operatorname{Im}\rho<T}}m_\rho
$$

> とする。$m_\rho$ は零点 $\rho$ の位数である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ant7-zero-count -->
**定義の確認**：単純零点が二点、二重零点が一点、高さ $T$ より下にある場合、その寄与は $1+1+2=4$ です。共役な下半平面の零点は数えません。
<!-- definition-example-end -->


零点数の上界に使うJensenの零点数評価を、ここで必要な形で証明しておきます。未習の一般定理を名前だけで前提にする必要はありません。

<a id="lem-ant7-jensen-disk"></a>

<!-- formal-statement-start -->
> **補題（円板のJensen零点数評価）**  
> $f$ が閉円板 $|z-z_0|\le R$ の近傍で正則であり、$f(z_0)\ne0$、円周上で零点を持たないとする。$0<r<R$ とし、$n(r)$ を $|z-z_0|\le r$ 内の零点数（位数込み）とすれば、

$
n(r)\log(R/r)
\le\log\frac{\max_{|z-z_0|=R}|f(z)|}{|f(z_0)|}.
$
<!-- formal-statement-end -->

### 証明の見取り図

円板内の零点を一次因子として除くと、残りの対数絶対値は調和関数になります。調和平均値性質を使い、各零点の寄与を数えます。

<!-- proof-start -->
### 証明

円板内の零点を $a_1,\ldots,a_m$（重複度込み）とし、$h(z)=f(z)/\prod_{j=1}^m(z-a_j)$ と置きます。$h$ は閉円板の近傍で正則かつ零点を持たないので $\log|h|$ は調和関数です。[調和関数の平均値性質](../../../解析系/CA/CA6/index.md#thm-ca6-harmonic-mean-value-property)から

$
\frac1{2\pi}\int_0^{2\pi}\log|h(z_0+Re^{i\theta})|d\theta
=\log|h(z_0)|.
$

$|a_j-z_0|<R$ に対して、$\log|z_0+Re^{i\theta}-a_j|
=\log R+\operatorname{Re}\log(1-(a_j-z_0)R^{-1}e^{-i\theta})$ です。括弧の対数は $|a_j-z_0|/R<1$ の冪級数で展開でき、各非定数 Fourier 項の平均が零になるため、左辺を平均すると $\log R$ です。$h=f/\prod(z-a_j)$ を代入し直して

$
\frac1{2\pi}\int_0^{2\pi}\log|f(z_0+Re^{i\theta})|d\theta-\log|f(z_0)|
=\sum_{j=1}^m\log\frac{R}{|a_j-z_0|}.
$

左辺は $\log(M_R/|f(z_0)|)$ 以下、右辺の $|a_j-z_0|\le r$ にある各項は $\log(R/r)$ 以上であり、ほかの項も非負です。従って表示した不等式が成立します。
<!-- proof-end -->

計算に先立ち、水平線上での偏角を評価する必要があります。$\zeta(1/2+iT)$ の偏角を $2\to2+iT\to1/2+iT$ の順に連続的に追い、$\pi$ で割った量を $S(T)$ とします。経路に零点がない $T$ に限ります。

<a id="lem-ant7-argument-bound"></a>

<!-- formal-statement-start -->
> **補題（水平区間に沿うζの偏角評価）**  
> $T\ge3$ が $\zeta(\sigma+iT)\ne0$（$1/2\le\sigma\le2$）を満たすとき、上記の偏角の選び方に対して

$$
S(T)=\frac1\pi\arg\zeta(1/2+iT)=O(\log T)
$$

> が成り立つ。定数は $T$ に依存しない。
<!-- formal-statement-end -->

### 証明の見取り図

$\operatorname{Re}\zeta(\sigma+iT)$ が零になる回数をJensenの零点数評価で抑えます。その符号が変わらない区間では、$\zeta$ の偏角は長さ $\pi$ の範囲に留まります。

<!-- proof-start -->
### 証明

$T\ge3$ とし、複素変数 $z$ に対して

$$
f_T(z)=\frac{\zeta(z+iT)+\zeta(z-iT)}2
$$

を考えます。$z=\sigma\in\mathbb R$ なら実係数の対称性により $f_T(\sigma)=\operatorname{Re}\zeta(\sigma+iT)$ です。さらに

$$
f_T(2)=\operatorname{Re}\zeta(2+iT)
\ge1-\sum_{n=2}^\infty n^{-2}=2-\zeta(2)>0
$$

なので $f_T$ は恒等的に零ではありません。

中心2、半径 $7/4$ の円板では $\operatorname{Re}z\ge1/4$ です。$\sigma\ge1/4$ でのDirichlet級数の部分和と積分との比較を $X\asymp T+2$ で用いると、$|z-2|\le7/4$ で

$$
\zeta(z\pm iT)
=\sum_{n\le X}n^{-(z\pm iT)}
+\frac{X^{1-z\mp iT}}{z\pm iT-1}
+O\bigl((1+|z\pm iT|)X^{-\operatorname{Re}z}\bigr).
$$

この式は $\operatorname{Re}z>0$ で、$\sum_{n>X}n^{-s}$ と $\int_X^\infty u^{-s}du$ の差を区間 $[n,n+1]$ ごとに積分して得られます（積分式を最初 $\operatorname{Re}s>1$ で確かめ、正則性で延長する）。従って円板上で $|f_T(z)|\le C(T+2)^A$ と評価でき、例えば固定した $A=3$ で十分です。

[円板の零点数評価](#lem-ant7-jensen-disk)を $f_T$ に、中心2、外半径 $7/4$、内半径 $3/2$ で適用します。$f_T(2)$ は正の定数で下から抑えられるので、内円板の零点数 $n_T$（位数込み）について

$$
n_T\log\frac{7/4}{3/2}
\le\log\frac{\max_{|z-2|=7/4}|f_T(z)|}{|f_T(2)|}
=O(\log T).
$$

従って $n_T=O(\log T)$ です。実線分 $[1/2,2]$ は内円板に含まれ、そこで $\operatorname{Re}\zeta(\sigma+iT)=0$ となる点も高々 $O(\log T)$ 個です。

各零点で分けた区間では $\zeta(\sigma+iT)$ は右または左半平面に留まり、連続偏角の変化は高々 $\pi$ です。始点 $2+iT$ の偏角は[Euler積](../../../解析系/CA/CA12/index.md#thm-ca12-euler-product)によって一様有界なので、全変化は $O(\log T)$ となります。
<!-- proof-end -->

<a id="thm-ant7-riemann-von-mangoldt"></a>

<!-- formal-statement-start -->
> **定理（Riemann–von Mangoldtの零点計数公式）**  
> $T\ge3$ が非自明零点の虚部でないとする。このとき

$$
N(T)
=\frac{T}{2\pi}\log\frac{T}{2\pi}
-\frac{T}{2\pi}+O(\log T).
$$

> さらに $\vartheta(T)=\operatorname{Im}\log\Gamma(1/4+iT/2)-(T/2)\log\pi$ と定め、$\Gamma$ の対数を正実軸から連続に選ぶと、

$$
N(T)=1+\frac{\vartheta(T)}{\pi}+S(T)
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$\xi$ は極を持たず、その零点は非自明零点だけです。長方形の偏角原理と $s\leftrightarrow1-s$ の対称性で、閉曲線の偏角変化を右辺の半分の経路へ集めます。$\Gamma$ の偏角はStirling公式で主項が分かり、残りのζの偏角は先の補題で $O(\log T)$ です。

<!-- proof-start -->
### 証明

**(i) [偏角原理](../../../解析系/CA/CA4/index.md#thm-ca4-argument-principle)を適用する長方形。** 頂点を $-1,2,2+iT,-1+iT$ とする反時計回りの長方形を取ります。[非自明零点の位置と対称性](#thm-ant7-zero-symmetry)から、左右辺には零点がありません。

実軸上にも非自明零点はありません。$0<s<1$ では交代級数 $\eta(s)=\sum_{n\ge1}(-1)^{n-1}n^{-s}>0$、また $1-2^{1-s}<0$ なので $\zeta(s)=\eta(s)/(1-2^{1-s})<0$ です。

実軸のその他の部分ではEuler積と関数等式、$\xi$ の連続性から $\xi(s)>0$ が従います。上辺は $T$ が零点の高さでないという仮定から零点を避けます。

[偏角原理](../../../解析系/CA/CA4/index.md#thm-ca4-argument-principle)により長方形上の $\arg\xi$ の総変化は $2\pi N(T)$ です。対称性

$$
\xi(1-s)=\xi(s),\qquad \xi(\overline s)=\overline{\xi(s)}
$$

から、左辺と上辺左半分の偏角変化は右辺と上辺右半分のそれぞれに等しく、実軸上では偏角変化がありません。従って

$$
\pi N(T)
=\Delta_{\,2\to2+iT\to1/2+iT}\arg\xi(s).
$$

**(ii) 因子ごとに偏角を求める。** 上の経路に沿って

$$
\xi(s)=\tfrac12s(s-1)\pi^{-s/2}\Gamma(s/2)\zeta(s)
$$

の偏角を追います。始点 $s=2$ では各因子は正、終点 $s=1/2+iT$ では

$$
s(s-1)=(1/2+iT)(-1/2+iT)=-T^2-\tfrac14
$$

です。経路上で $s(s-1)$ の偏角は $0$ から $\pi$ に変わります。$\pi^{-s/2}$ の偏角は $-(T/2)\log\pi$、$\Gamma(s/2)$ の偏角は $\operatorname{Im}\log\Gamma(1/4+iT/2)$、$\zeta$ の偏角は $\pi S(T)$ です。ゆえに

$$
\pi N(T)=\pi+\vartheta(T)+\pi S(T),
\qquad
N(T)=1+\frac{\vartheta(T)}\pi+S(T).
$$

**(iii) 主項の計算。** [CA11のStirling公式](../../../解析系/CA/CA11/index.md#thm-ca11-stirling)へ $z=1/4+iT/2$ を代入します。

$$
\log\Gamma(z)
=(z-\tfrac12)\log z-z+\tfrac12\log(2\pi)+O(1/|z|).
$$

$\arg z=\pi/2+O(1/T)$、$\log|z|=\log(T/2)+O(T^{-2})$ から虚部は

$$
\operatorname{Im}\log\Gamma(z)
=\frac T2\log\frac T2-\frac T2-\frac\pi8+O(T^{-1}).
$$

従って

$$
\vartheta(T)
=\frac T2\log\frac{T}{2\pi}-\frac T2-\frac\pi8+O(T^{-1}).
$$

[水平偏角の補題](#lem-ant7-argument-bound)から $S(T)=O(\log T)$ なので、表示した零点計数式が得られます。
<!-- proof-end -->

**意味**：長さ $1$ の窓にいつも同じ個数の零点があるとは述べていません。しかし $N(T)$ の主項は $T\log T$ なので、零点は高さを上げるほど平均的に密になります。

## 3. Hadamard積への必要最小限の接続

零点数の評価から、零点を使った積を形式的な記号ではなく収束する対象にできます。

<a id="prop-ant7-zero-product-convergence"></a>

<!-- formal-statement-start -->
> **命題（零点の二乗逆数和と一次基本因子）**  
> $\rho$ をすべての非自明零点（位数込み）にわたって動かすと

$$
\sum_\rho\frac1{|\rho|^2}<\infty
$$

> が成り立つ。従って $E_1(w)=(1-w)e^w$ を用いた積 $\prod_\rho E_1(s/\rho)$ は、有限部分集合の増大による積として各コンパクト集合上一様収束する。
<!-- formal-statement-end -->

### 証明の見取り図

高さ $2^k$ 付近にある零点は高々 $O(k2^k)$ 個です。一つの項は $O(2^{-2k})$ なので、各層の寄与は $O(k2^{-k})$ に収まります。

<!-- proof-start -->
### 証明

[零点計数公式](#thm-ant7-riemann-von-mangoldt)により $N(U)=O(U\log U)$ です。$\gamma>0$ の零点のうち $2^k\le\gamma<2^{k+1}$ にあるものは高々 $N(2^{k+1}+1)=O(2^k(k+1))$ 個であり、$|\rho|\ge|\gamma|\ge2^k$ です。従ってその層の寄与は

$$
\sum_{2^k\le\gamma<2^{k+1}}\frac1{|\rho|^2}
\le O\left(\frac{2^k(k+1)}{2^{2k}}\right)
=O((k+1)2^{-k}).
$$

$\sum_{k\ge1}(k+1)2^{-k}<\infty$、負の虚部にある零点も共役対称で同じ評価です。高さが有界な零点は整関数 $\xi$ の孤立零点性から有限個です。

最後に $|w|\le1/2$ なら

$$
\log((1-w)e^w)=\log(1-w)+w
=-\sum_{j\ge2}\frac{w^j}{j},
\qquad
|\log E_1(w)|\le C|w|^2.
$$

コンパクト集合上の $s$ に対し、十分高い零点では $|s/\rho|\le1/2$ なので、上の逆数和で対数の和を一様に抑えられます。従って積は局所一様収束します。
<!-- proof-end -->

この収束積はHadamardの因子分解に現れる核です。$\xi(s)$ がこの積に指数因子 $e^{a+bs}$ を掛けたものと一致するところまで進むには、整関数の増大度と因子分解の定理が別途必要です。この章ではその未証明の同一視を後の明示公式の根拠として**使いません**。

## 4. Perron型反転の入口：まず階段を平滑化する

[ζの対数微分とvon Mangoldt級数](../ANT5/index.md#thm-ant5-logarithmic-derivative)は

$$
-\frac{\zeta'(s)}{\zeta(s)}
=\sum_{n\ge1}\frac{\Lambda(n)}{n^s}
\qquad(\operatorname{Re}s>1)
$$

でした。$\sum_{n\le x}\Lambda(n)$ を直接取り出す反転積分は $1/s$ を含み、虚軸方向で絶対収束しません。そこで一度、$n=x$ へ近付くと重みが連続的に零になる関数を使います。

<a id="def-ant7-smoothed-psi"></a>

<!-- formal-statement-start -->
> **定義（一次平滑化したChebyshev和）**  
> $x>1$ に対し

$$
\Psi_1(x)=\sum_{n\le x}\Lambda(n)\left(1-\frac nx\right)
$$

> と置く。$n=x$ での項は重みが零なので、和に含めても結果は変わらない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ant7-smoothed-psi -->
**定義の確認**：$2<x<3$ なら $\Lambda(n)\ne0$ となる $n\le x$ は $n=2$ だけなので、$\Psi_1(x)=\log2\,(1-2/x)$ です。$x=2$ では $\Psi_1(2)=0$ です。跳び目がある $\psi$ と違い、$\Psi_1$ は連続になります。
<!-- definition-example-end -->

<a id="lem-ant7-perron-kernel"></a>

<!-- formal-statement-start -->
> **補題（一次平滑化の反転核）**  
> $c>0$、$y>0$ に対し、通常の広義積分として

$$
\frac1{2\pi i}\int_{c-i\infty}^{c+i\infty}
\frac{y^s}{s(s+1)}\,ds
=
\begin{cases}
1-y^{-1},&y>1,\\
0,&0<y\le1.
\end{cases}
$$

> が成り立つ。被積分関数は縦線上で絶対可積分である。
<!-- formal-statement-end -->

### 証明の見取り図

$y>1$ なら長方形を左へ閉じて $s=0,-1$ の留数を足し、$y<1$ なら右へ閉じます。$y=1$ は連続性で確かめます。

<!-- proof-start -->
### 証明

$|y^{c+it}|=y^c$、$|s(s+1)|\asymp t^2$（$|t|\to\infty$）なので縦線上の積分は絶対収束します。$y>1$ なら左向きの大きい長方形を用い、$y^{\sigma+it}=y^\sigma e^{it\log y}$ が $\sigma\to-\infty$ で減衰するため、移動した辺の積分は零へ近付きます。[留数定理](../../../解析系/CA/CA4/index.md#thm-ca4-residue)で

$$
\operatorname{Res}_{s=0}\frac{y^s}{s(s+1)}=1,\qquad
\operatorname{Res}_{s=-1}\frac{y^s}{s(s+1)}=-y^{-1}.
$$

従って結果は $1-y^{-1}$ です。$0<y<1$ では右へ閉じると極がなく、$y^\sigma\to0$ なので積分は零です。$y=1$ の場合は $1/[s(s+1)]=1/s-1/(s+1)$ を原始関数として直接積分するか、積分の絶対収束に基づく $y$ に関する連続性から $0$ を得ます。
<!-- proof-end -->

<a id="prop-ant7-perron-smoothed"></a>

<!-- formal-statement-start -->
> **命題（平滑化Perron反転）**  
> $x>1$、$c>1$ に対して

$$
\Psi_1(x)=
\frac1{2\pi i}\int_{c-i\infty}^{c+i\infty}
\left(-\frac{\zeta'(s)}{\zeta(s)}\right)
\frac{x^s}{s(s+1)}\,ds
$$

> が成り立ち、積分は絶対収束する。
<!-- formal-statement-end -->

### 証明の見取り図

核へ $y=x/n$ を入れて、絶対収束するDirichlet級数と積分を交換します。

<!-- proof-start -->
### 証明

$|x^{c+it}n^{-c-it}|=x^c n^{-c}$ なので、[ζの対数微分とvon Mangoldt級数](../ANT5/index.md#thm-ant5-logarithmic-derivative)を使うと交換の絶対値は

$$
\sum_{n\ge1}\Lambda(n)n^{-c}\cdot
\frac{x^c}{2\pi}\int_{-\infty}^{\infty}
\frac{dt}{|(c+it)(c+1+it)|}<\infty.
$$

よって和と積分を交換でき、[反転核の補題](#lem-ant7-perron-kernel)の $y=x/n$ によって

$$
\sum_{n\ge1}\Lambda(n)
\frac1{2\pi i}\int_{(c)}
\frac{(x/n)^s}{s(s+1)}ds
=
\sum_{n<x}\Lambda(n)(1-n/x)=\Psi_1(x)
$$

となります。
<!-- proof-end -->

## 5. 零点が素数側に戻る――平滑化した厳密な明示公式

積分路を左へ移すと、$\zeta'/\zeta$ の極、つまりζの零点を横切ります。ただし勝手に横切ると水平辺での積分が残るので、次の技術的な評価を準備します。

<a id="lem-ant7-contour-height"></a>

<!-- formal-statement-start -->
> **補題（積分路を移すための高さの選択）**  
> 固定した実数 $c>1$ に対して、$T_j\to\infty$ を選び、線分 $\{-1/2\le\operatorname{Re}s\le c,\ \operatorname{Im}s=\pm T_j\}$ にζの零点を含まないようにでき、そこで一様に

$$
\left|\frac{\zeta'(s)}{\zeta(s)}\right|
=O((\log T_j)^2)
$$

> が成り立つ。また $\operatorname{Re}s=-1/2$ では $|\zeta'(s)/\zeta(s)|=O(\log(2+|\operatorname{Im}s|))$ である。
<!-- formal-statement-end -->

### 証明の見取り図

局所的な零点数 $O(\log T)$ をJensenの零点数評価で求め、零点から十分離れた水平線を選びます。負の側の縦線は関数等式によって絶対収束域へ写せるので、より簡単に評価できます。

<!-- proof-start -->
### 証明

**(i) 零点の近傍の個数。** $T$ が大きいとき、$\zeta(2+iT+z)$ を $|z|\le R$（固定 $R>c+3$）で考えます。中心では $|\zeta(2+iT)|\ge2-\zeta(2)>0$ です。

$\operatorname{Re}s$ が固定した有界範囲にあれば、[CA12の関数等式](../../../解析系/CA/CA12/index.md#thm-ca12-functional-equation)とDirichlet級数の積分比較から $\zeta(s)$ は $T$ の固定冪で抑えられます。

中心から距離の異なる二円へ[円板の零点数評価](#lem-ant7-jensen-disk)を適用すると、帯 $-1\le\sigma\le c+1$、$T-2\le t\le T+2$ 内の零点数は $O(\log T)$ です。円板内の極 $s=1$ は $T$ が大きいので含まれません。

**(ii) 零点を避ける。** 各区間 $[j,j+1]$ には虚部を持つ零点が $O(\log j)$ 個しかありません。各虚部を中心に幅 $2\delta_j$ の区間を除き、$\delta_j=c_0/\log(j+2)$、$c_0>0$ を十分小さく取ると除外長の合計は $1/2$ 未満です。残りから $T_j$ を選べばすべての零点から距離 $\delta_j$ 以上離れます。

**(iii) 対数微分の評価。** $2+iT_j$ の周りの固定円板で、内円板内の零点 $\rho$（重複度込み）を取り去った正則非零関数の対数を考えます。中心値の下界、外円での $\log|\zeta|=O(\log T_j)$、Jensenで得た零点数 $O(\log T_j)$ を用い、対数の実部へBorel–Carathéodory不等式を適用し、さらにCauchyの微分評価を内側の円板に適用すると

$$
\frac{\zeta'(s)}{\zeta(s)}
=\sum_{\rho\ {\rm in\ inner\ disk}}\frac1{s-\rho}
+O(\log T_j)
$$

が対象水平線上で一様に成立します（重複零点は重複して加算）。各分母は $\delta_j$ 以上、項数は $O(\log T_j)$ なので全体は $O((\log T_j)^2)$ です。下半平面は共役対称で同じです。

**(iv) 左の縦線。** [関数等式](../../../解析系/CA/CA12/index.md#thm-ca12-functional-equation)を対数微分した

$$
\frac{\zeta'}{\zeta}(s)
=\log(2\pi)+\frac\pi2\cot\frac{\pi s}{2}
-\frac{\Gamma'}{\Gamma}(1-s)
-\frac{\zeta'}{\zeta}(1-s)
$$

を $s=-1/2+it$ に使います。$1-s=3/2-it$ では[対数微分Dirichlet級数](../ANT5/index.md#thm-ant5-logarithmic-derivative)が絶対収束し有界です。cot項は $|t|\ge1$ で有界、[Stirling公式](../../../解析系/CA/CA11/index.md#thm-ca11-stirling)の対数微分は $O(\log(2+|t|))$ です。$|t|\le1$ は零点がない固定線分なので有界です。
<!-- proof-end -->

<a id="thm-ant7-smoothed-explicit-formula"></a>

<!-- formal-statement-start -->
> **定理（一次平滑化したvon Mangoldt型明示公式）**  
> $x>1$ に対し、$\rho$ を非自明零点（位数込み）にわたって動かすと

$$
\boxed{\displaystyle
\Psi_1(x)
=\frac x2-\sum_\rho\frac{x^\rho}{\rho(\rho+1)}
-\log(2\pi)+R_1(x)}
$$

> である。ここで零点和は絶対収束し、

$$
R_1(x)=\frac1{2\pi i}
\int_{-1/2-i\infty}^{-1/2+i\infty}
\left(-\frac{\zeta'(s)}{\zeta(s)}\right)
\frac{x^s}{s(s+1)}\,ds,
\qquad R_1(x)=O(x^{-1/2}).
$$

> この主張はRiemann予想を仮定しない。
<!-- formal-statement-end -->

### 証明の見取り図

[平滑化Perron反転](#prop-ant7-perron-smoothed)の縦線を $c>1$ から $-1/2$ へ動かします。横切る極は $s=1,0$ と非自明零点だけです。その留数が順に主項、定数、振動項になります。

<!-- proof-start -->
### 証明

$G_x(s)=(-\zeta'/\zeta)(s)x^s/[s(s+1)]$ とします。$-1/2\le\operatorname{Re}s\le c$ の領域では、[非自明零点の位置](#thm-ant7-zero-symmetry)から横切る零点は非自明零点だけです。$-1$ は領域外なので、核の極は $0$ だけです。

上下の高さを[高さの選択補題](#lem-ant7-contour-height)の $T_j$ とした長方形に[留数定理](../../../解析系/CA/CA4/index.md#thm-ca4-residue)を適用します。水平辺では $|x^s|\le\max(x^c,x^{-1/2})$、$|s(s+1)|\asymp T_j^2$、$|\zeta'/\zeta(s)|=O((\log T_j)^2)$ なので、それぞれの積分は $O((\log T_j)^2/T_j^2)\to0$ です。

**$s=1$ の留数。** [CA12の単純極](../../../解析系/CA/CA12/index.md#thm-ca12-meromorphic-continuation)から

$$
\zeta(s)=\frac1{s-1}+O(1),\qquad
-\frac{\zeta'(s)}{\zeta(s)}
=\frac1{s-1}+O(1),
$$

従って $\operatorname{Res}_{s=1}G_x(s)=x/[1(1+1)]=x/2$ です。

**非自明零点 $\rho$ の留数。** 位数 $m_\rho$ に対し $\zeta(s)=(s-\rho)^{m_\rho}h(s)$、$h(\rho)\ne0$ と書くと

$$
-\frac{\zeta'(s)}{\zeta(s)}
=-\frac{m_\rho}{s-\rho}-\frac{h'(s)}{h(s)}.
$$

従って $\operatorname{Res}_{s=\rho}G_x(s)=-m_\rho x^\rho/[\rho(\rho+1)]$ です。

**$s=0$ の留数。** [CA12の特殊値](../../../解析系/CA/CA12/index.md#cor-ca12-special-values)は $\zeta(0)=-1/2$ を与えます。さらに関数等式を $s=0$ で一次まで展開します。$\zeta(1-s)=-1/s+\gamma+O(s)$、$\Gamma(1-s)=1+\gamma s+O(s^2)$、$\sin(\pi s/2)=\pi s/2+O(s^3)$ なので

$$
\begin{aligned}
\zeta(s)
&=2^s\pi^{s-1}\sin(\pi s/2)\Gamma(1-s)\zeta(1-s)\\
&=-\frac12\bigl(1+s\log(2\pi)\bigr)+O(s^2).
\end{aligned}
$$

従って $\zeta'(0)/\zeta(0)=\log(2\pi)$、すなわち $\operatorname{Res}_{s=0}G_x(s)=-\log(2\pi)$ です。

最後に[零点の二乗逆数和](#prop-ant7-zero-product-convergence)と $|x^\rho|\le x$ より

$$
\sum_\rho\left|\frac{x^\rho}{\rho(\rho+1)}\right|
\le C_x\sum_\rho\frac1{|\rho|^2}<\infty
$$

で、零点和の極限は順序によらず存在します。左の縦線は[対数微分の評価](#lem-ant7-contour-height)から絶対可積分で、

$$
|R_1(x)|\le C x^{-1/2}
\int_{-\infty}^\infty
\frac{\log(2+|t|)}{|(-1/2+it)(1/2+it)|}\,dt
=O(x^{-1/2}).
$$

以上をまとめて公式を得ます。
<!-- proof-end -->

**具体的に何が見えるか。** 一組 $\rho=\beta+i\gamma$、$\overline\rho=\beta-i\gamma$ の寄与は

$$
-\frac{x^\rho}{\rho(\rho+1)}
-\frac{x^{\overline\rho}}{\overline\rho(\overline\rho+1)}
=-2x^\beta\operatorname{Re}
\frac{e^{i\gamma\log x}}{\rho(\rho+1)}.
$$

つまり $\log x$ に関して振動数 $\gamma$ を持ち、大きさの尺度は $x^\beta/|\rho(\rho+1)|$ です。**零点の実部 $\beta$ が主項に対する揺らぎの冪指数を決める**という結び付きが、証明した等式の中に直接現れます。

### 階段関数への鋭い公式との違い

平滑化しない $\psi(x)=\sum_{n\le x}\Lambda(n)$ については、跳び点で左右極限の平均を取った $\psi_0(x)$ を用い、零点を虚部の絶対値順に対称的に足す古典的なvon Mangoldt公式があります：

$$
\psi_0(x)=x-\lim_{T\to\infty}
\sum_{\substack{\rho\\|\operatorname{Im}\rho|<T}}
\frac{x^\rho}{\rho}
-\log(2\pi)-\frac12\log(1-x^{-2})
\qquad(x>1).
$$

ここで最後の対数項は負の偶数の[自明零点](../../../解析系/CA/CA12/index.md#cor-ca12-trivial-zeros)から来ます。**この鋭い公式自体の極限交換と積分路の無限遠での評価は、本章の平滑化公式の証明だけでは済んでいません。** 特に $\sum_\rho |x^\rho/\rho|$ の絶対収束は主張できず、順序を指定しない零点和に置き換えてはいけません。本章の完全に導出済みの主結果は、上の[一次平滑化したvon Mangoldt型明示公式](#thm-ant7-smoothed-explicit-formula)です。

## 6. 演習と詳細解答

証明の式を暗記するより、「境界線の排除」「位数」「偏角の評価」「反転の交換」「残る積分」のどこで条件を使うかを意識してください。

### Level A：対象と核の確認

#### A1. 零点の四点対称
$\rho=1/3+5i$ がζの非自明零点であると仮定する。その対称点を列挙し、どれが上半平面にあるか答えよ。

- Level: A
- ID: ANT7-A1

<!-- solution-start -->
**詳細解答**：[零点の対称性](#thm-ant7-zero-symmetry)を使います。$\overline\rho=1/3-5i$、$1-\rho=2/3-5i$、$1-\overline\rho=2/3+5i$ です。上半平面の零点は $1/3+5i$ と $2/3+5i$ であり、もし一つが位数 $m$ なら残りも同じ位数 $m$ です。なおこの仮定は架空の零点に関する条件付きの問題で、実在の主張ではありません。
<!-- solution-end -->

#### A2. 臨界線上の二次因子
$s=1/2+it$（$t\in\mathbb R$）において $s(s-1)$ を計算し、その偏角を $t>0$ の場合に答えよ。

- Level: A
- ID: ANT7-A2

<!-- solution-start -->
**詳細解答**：

$$
s(s-1)=(1/2+it)(-1/2+it)
=-1/4+it/2-it/2+i^2t^2=-1/4-t^2.
$$

従って値は負の実数です。正の実軸側から上半平面を経由して偏角を連続に選ぶと、$t>0$ の終点における偏角は $\pi$ です。[零点計数定理の証明](#thm-ant7-riemann-von-mangoldt)の定数 $1$ はこの $\pi/\pi$ に由来します。
<!-- solution-end -->

#### A3. 平滑化した和
$2<x<3$、$3<x<4$ のそれぞれで $\Psi_1(x)$ を計算し、$x=3$ の左右極限を比べよ。

- Level: A
- ID: ANT7-A3

<!-- solution-start -->
**詳細解答**：[定義](#def-ant7-smoothed-psi)から $2<x<3$ では $\Psi_1(x)=\log2(1-2/x)$ です。$3<x<4$ では $\Lambda(2)=\log2,\Lambda(3)=\log3$ が加わり、

$$
\Psi_1(x)=\log2(1-2/x)+\log3(1-3/x).
$$

$x\uparrow3$ の左極限は $\log2/3$、$x\downarrow3$ の右極限は $\log2/3+\log3(1-1)=\log2/3$ なので連続です。$\psi$ は $x=3$ で $\log3$ だけ跳びますが、重みが $n=x$ で零になるためこちらは跳びません。
<!-- solution-end -->

#### A4. Perron核の二つの留数
$y=2$ で $y^s/[s(s+1)]$ の $s=0,-1$ における留数を計算し、[反転核](#lem-ant7-perron-kernel)の値を検算せよ。

- Level: A
- ID: ANT7-A4

<!-- solution-start -->
**詳細解答**：$s=0$ では $\lim_{s\to0}y^s/(s+1)=1$、$s=-1$ では $\lim_{s\to-1}y^s/s=-y^{-1}=-1/2$ です。従って和は $1-1/2=1/2$ です。一方、[反転核の結論](#lem-ant7-perron-kernel)へ $y=2$ を代入すると $1-y^{-1}=1/2$ になり一致します。
<!-- solution-end -->

### Level B：零点計数と誤差を結ぶ

#### B1. $\vartheta$ の主項
$z=1/4+iT/2$ にStirling公式を代入して、$\vartheta(T)$ の $T\log T$ 項、$T$ 項、定数項を求めよ。

- Level: B
- ID: ANT7-B1

<!-- solution-start -->
**詳細解答**：[CA11のStirling公式](../../../解析系/CA/CA11/index.md#thm-ca11-stirling)を使い、$z-\frac12=-\frac14+iT/2$ と書きます。$|z|=(T/2)(1+O(T^{-2}))$、$\arg z=\pi/2+O(T^{-1})$ だから

$$
\begin{aligned}
\operatorname{Im}\bigl((z-\tfrac12)\log z-z\bigr)
&=\frac T2\log|z|-\frac14\arg z-\frac T2\\
&=\frac T2\log(T/2)-\frac T2-\frac\pi8+O(T^{-1}).
\end{aligned}
$$

$-(T/2)\log\pi$ を引けば

$$
\vartheta(T)=\frac T2\log(T/2\pi)-\frac T2-\frac\pi8+O(T^{-1}).
$$

従って3項は順に $(T/2)\log(T/2\pi)$、$-T/2$、$-\pi/8$ です。
<!-- solution-end -->

#### B2. 零点の絶対収束
$N(T)=O(T\log T)$ を仮定し、$\sum_\rho|\rho|^{-2}<\infty$ を示せ。さらに $\sum_\rho|\rho|^{-1}$ の収束はこの議論だけでは分からない理由を述べよ。

- Level: B
- ID: ANT7-B2

<!-- solution-start -->
**詳細解答**：$2^k\le|\gamma|<2^{k+1}$ の個数は[零点計数](#thm-ant7-riemann-von-mangoldt)と共役対称性から $O(2^k(k+1))$ です。よって二乗逆数の層寄与は $O((k+1)2^{-k})$ であり和は収束します。一乗逆数では層ごとの上界が $O(k+1)$ にしかならず、級数として総和できません。ここで「上界が発散する」と「元の正項級数が発散する」は異なります。後者をこの上界だけから結論してはいけません。
<!-- solution-end -->

#### B3. 留数と符号
$\rho$ がζの位数 $m$ の零点とし、$G_x(s)=(-\zeta'/\zeta)(s)x^s/[s(s+1)]$ の $\rho$ における留数を求めよ。零点の寄与の負号を説明せよ。

- Level: B
- ID: ANT7-B3

<!-- solution-start -->
**詳細解答**：局所的に $\zeta(s)=(s-\rho)^m h(s)$、$h(\rho)\ne0$ と分解します。対数微分は

$$
\frac{\zeta'}{\zeta}(s)
=\frac m{s-\rho}+\frac{h'}h(s)
$$

なので、$-\zeta'/\zeta$ の留数は $-m$ です。$0<\operatorname{Re}\rho<1$ より $\rho\ne0,-1$ であり、残りの因子 $x^s/[s(s+1)]$ は $\rho$ で正則です。従って留数は $-m x^\rho/[\rho(\rho+1)]$ です。この負号は零点での対数微分の留数が正の位数 $m$ であり、それに最初から負号を付けていることに由来します。
<!-- solution-end -->

#### B4. Jensenの零点数から偏角へ
$f_T(\sigma)=\operatorname{Re}\zeta(\sigma+iT)$ の零点が $[1/2,2]$ に $m$ 個あるとき、経路上にζの零点がない条件の下で $\arg\zeta(\sigma+iT)$ の変化が $O(m+1)$ となる理由を述べよ。

- Level: B
- ID: ANT7-B4

<!-- solution-start -->
**詳細解答**：零点位置で $[1/2,2]$ を高々 $m+1$ 個の開区間に分けます。各区間では $\operatorname{Re}\zeta$ の符号が一定なので、$\zeta(\sigma+iT)$ は原点を除いた左右どちらかの半平面に留まります。

従って各区間の連続偏角の変化は高々 $\pi$ です。接続点でζは零でないため偏角を連続に接続でき、全変化は高々 $(m+1)\pi$ です。[円板のJensen零点数評価](#lem-ant7-jensen-disk)から $m=O(\log T)$ とすると、$S(T)=O(\log T)$ です。
<!-- solution-end -->

### Level C：反転と零点和を統合する

#### C1. 一次平滑化したvon Mangoldt型明示公式の再構成
$G_x(s)$ を $c>1$ から $-1/2$ へ移すときの極を漏れなく列挙し、それぞれの留数を計算して[明示公式](#thm-ant7-smoothed-explicit-formula)を再導出せよ。水平辺と残る縦線の評価にも触れよ。

- Level: C
- ID: ANT7-C1

<!-- solution-start -->
**詳細解答**：まず[平滑化反転](#prop-ant7-perron-smoothed)から $\Psi_1(x)=\frac1{2\pi i}\int_{(c)}G_x(s)ds$ と書きます。矩形内での極は $\zeta$ の単純極 $s=1$、非自明零点 $\rho$、核 $1/[s(s+1)]$ の極 $s=0$ です。$s=-1$ は左端 $-1/2$ より左にあるので含めません。留数は順に

$$
\begin{aligned}
\operatorname{Res}_{s=1}G_x(s)&=\frac x2,\\
\operatorname{Res}_{s=\rho}G_x(s)&=-\frac{m_\rho x^\rho}{\rho(\rho+1)},\\
\operatorname{Res}_{s=0}G_x(s)&=-\frac{\zeta'(0)}{\zeta(0)}=-\log(2\pi).
\end{aligned}
$$

$0$ での値は関数等式の一次展開 $\zeta(s)=-1/2-(s/2)\log(2\pi)+O(s^2)$ から従います。[良い高さの補題](#lem-ant7-contour-height)の $T_j$ では水平辺の積分は $O((\log T_j)^2/T_j^2)$ で消えます。[逆数二乗和](#prop-ant7-zero-product-convergence)により零点の留数和も絶対収束します。残る左縦線では $|x^s|=x^{-1/2}$、$|\zeta'/\zeta(-1/2+it)|=O(\log(2+|t|))$ なので $O(x^{-1/2})$ です。以上で

$$
\Psi_1(x)=\frac x2-\sum_\rho\frac{x^\rho}{\rho(\rho+1)}
-\log(2\pi)+R_1(x)
$$

を再現できます。$\psi(x)$ に重みなしで同じ絶対収束評価を流用してはいけません。
<!-- solution-end -->

#### C2. 条件付き零点情報と誤差
ある $b$、$1/2\le b<1$ に対してすべての非自明零点が $\operatorname{Re}\rho\le b$ を満たすと仮定する。[一次平滑化したvon Mangoldt型明示公式](#thm-ant7-smoothed-explicit-formula)から $\Psi_1(x)=x/2+O(x^b)$ を導け。また、これだけで $\psi(x)=x+O(x^b)$ としてはいけない理由を述べよ。

- Level: C
- ID: ANT7-C2

<!-- solution-start -->
**詳細解答**：$x>1$、$\operatorname{Re}\rho\le b$ より $|x^\rho|=x^{\operatorname{Re}\rho}\le x^b$ です。[零点の二乗逆数和](#prop-ant7-zero-product-convergence)で絶対収束するため

$$
\left|\sum_\rho\frac{x^\rho}{\rho(\rho+1)}\right|
\le x^b\sum_\rho\frac1{|\rho(\rho+1)|}
\le Cx^b.
$$

[明示公式](#thm-ant7-smoothed-explicit-formula)の定数項は $O(1)$、$R_1(x)=O(x^{-1/2})$ なので、$b\ge1/2$ では両方 $O(x^b)$ に吸収できます。従って $\Psi_1(x)=x/2+O(x^b)$ です。ただし $\Psi_1$ は $\psi$ を滑らかに平均したもので、$\Psi_1$ の誤差から $\psi$ の点ごとの誤差を同じ冪で戻すには差分幅を調節するなどの新しい評価が必要です。未証明の逆操作で $\psi(x)=x+O(x^b)$ と断定してはいけません。
<!-- solution-end -->

## 7. 次章への接続

[ANT6の素数定理](../ANT6/index.md#thm-ant6-prime-number-theorem)は境界上の零点不存在から主項を得ました。本章では零点を数え、さらに**平滑化した素数和に対する厳密な零点展開**を得ました。ANT8では、非自明零点が臨界線上にすべて乗るというRiemann予想の正確な主張と、平滑化を外した誤差評価との関係を扱います。今回得た $x^\beta$ という尺度はその入口です。
