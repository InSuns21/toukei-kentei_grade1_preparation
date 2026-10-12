# ANT8 Riemann予想と誤差項・一般L関数への橋

[ANT6の素数定理](../ANT6/index.md#thm-ant6-psi-asymptotic)では $\psi(x)\sim x$ を得ました。[ANT7の明示公式](../ANT7/index.md#thm-ant7-smoothed-explicit-formula)では、主項からのずれに零点 $\rho=\beta+i\gamma$ が $x^\beta$ の大きさで現れることを見ました。しかし **零点が「ない範囲」をどれほど広く取れるか** と **素数の誤差をどれほど小さくできるか** は、なお別の問いです。

本章はその二つの問いを接続します。まず零点がすべて臨界線上にあるという仮説を厳密に記述し、平滑化した素数和から点ごとの誤差を取り出す際に失われる冪指数まで計算します。次に定量的な零点不存在領域から、無条件で得られる素数定理の誤差を導きます。最後にDirichlet L関数・一般L関数へ何が移り、何が未証明のまま残るかを整理します。

以下 $x\ge2$、$s=\sigma+it$、$\rho=\beta+i\gamma$ とし、零点は重複度込みで数えます。$\Lambda(n)$ と $\psi(x)=\sum_{n\le x}\Lambda(n)$ は[NT8の定義](../../NT/NT8/index.md#def-nt8-von-mangoldt)および[NT8の総和関数](../../NT/NT8/index.md#def-nt8-chebyshev-psi)を使います。

## 1. Riemann予想は何を追加で主張するか

[ANT7の非自明零点の位置と対称性](../ANT7/index.md#thm-ant7-zero-symmetry)から、零点は $0<\beta<1$ にあり、$\beta$ と $1-\beta$ が同時に現れます。この対称性は両者が $1/2$ と等しいことを意味しません。そこで、すべての零点が中央にあるという追加の主張を区別します。

<a id="def-ant8-rh"></a>

<!-- formal-statement-start -->
> **定義（Riemann予想）**  
> Riemann ζ関数のすべての非自明零点 $\rho$ が

$$
\operatorname{Re}\rho=\frac12
$$

> を満たす、という未解決の主張を **Riemann予想（RH）** という。零点の位数について単純であることは主張しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ant8-rh -->
**定義の確認**：$\rho=1/2+i\gamma$ が零点なら条件を満たしますが、$1/2+i\gamma$ が任意の $\gamma$ で零点になるという意味ではありません。他方、仮に $\rho=2/3+5i$ が零点なら[四点対称性](../ANT7/index.md#thm-ant7-zero-symmetry)によって $1/3+5i$ も零点となり、RHに反します。これは仮定上の反例であり、そのような零点の存在を主張しません。
<!-- definition-example-end -->

RHと「$\sigma=1$ に零点がない」は同じ強さではありません。後者は[ANT6で証明済み](../ANT6/index.md#thm-ant6-zeta-line-one)ですが、前者をそこから結論することはできません。

## 2. 平滑化の代償を数値で測る

[ANT7の一次平滑化和](../ANT7/index.md#def-ant7-smoothed-psi)は
$$
\Psi_1(x)=\sum_{n<x}\Lambda(n)(1-n/x)
$$
でした。各 $n<x$ について $1-n/x=x^{-1}\int_n^x dt$ であり、有限和と積分を入れ替えると
$$
F(x):=x\Psi_1(x)=\sum_{n<x}\Lambda(n)(x-n)
=\int_1^x\psi(t)\,dt.
$$
これが平滑化を外すための出発点です。$\Lambda(n)\ge0$ より $\psi$ は非減少なので、$0<h<x-1$ に対して
$$
\frac{F(x)-F(x-h)}h\le\psi(x)\le
\frac{F(x+h)-F(x)}h. \tag{2.1}
$$
この不等式は跳び点でも成り立ちます。左右に積分した区間での大小をそのまま比較すればよいからです。

<a id="lem-ant8-unsmoothing"></a>

<!-- formal-statement-start -->
> **補題（非減少和の差分による平滑化の解除）**  
> $\psi:[1,\infty)\to[0,\infty)$ は非減少、$F(x)=\int_1^x\psi(t)\,dt$ とする。ある $1\le\alpha<2$ に対して

$$
F(x)=\frac{x^2}{2}+O(x^\alpha)
$$

> なら

$$
\psi(x)=x+O\!\left(x^{\alpha/2}\right).
$$

> さらに、ある $a>0$ について $F(x)=x^2/2+O(x^2e^{-a\sqrt{\log x}})$ なら、ある $b>0$ について $\psi(x)=x+O(xe^{-b\sqrt{\log x}})$ である。
<!-- formal-statement-end -->

### 証明の見取り図

式 (2.1) の前後差分を取ります。主項は $x\pm h/2$、誤差は $O(x^\alpha/h)$ になります。従って $h$ と $x^\alpha/h$ を同程度にすることが肝心です。

<!-- proof-start -->
### 証明

$x$ を十分大きく取り $0<h\le x/2$ とします。$E(y)=F(y)-y^2/2$ と置けば、仮定と $x/2\le y\le3x/2$ より $|E(y)|\le Cx^\alpha$ です。(2.1) の右辺は
$$
\frac{F(x+h)-F(x)}h=x+\frac h2+\frac{E(x+h)-E(x)}h
=x+\frac h2+O(x^\alpha/h).
$$
左辺も
$$
\frac{F(x)-F(x-h)}h=x-\frac h2+O(x^\alpha/h).
$$
従って $|\psi(x)-x|\le C'(h+x^\alpha/h)$ です。$h=x^{\alpha/2}$ と選ぶと $\alpha/2<1$ なので $h\le x/2$ を満たし、最初の結論を得ます。

指数型の仮定では、$y\in[x/2,3x/2]$ に対し $\sqrt{\log y}=\sqrt{\log x}+O((\log x)^{-1/2})$ なので、一様に $E(y)=O(x^2e^{-a\sqrt{\log x}})$（定数の調整を許す）です。$h=xe^{-(a/2)\sqrt{\log x}}$ を選ぶと
$$
h+\frac{x^2e^{-a\sqrt{\log x}}}{h}
=2xe^{-(a/2)\sqrt{\log x}},
$$
となり $b=a/2$ とできることが分かります。
<!-- proof-end -->

<a id="prop-ant8-rh-smoothing"></a>

<!-- formal-statement-start -->
> **命題（RHから得られる平滑化誤差と点ごとの誤差）**  
> RHを仮定すると、$x\ge2$ に対して

$$
\Psi_1(x)=\frac x2+O(x^{1/2}),
\qquad
\psi(x)=x+O(x^{3/4})
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

この命題での $3/4$ はRHの最善の結論ではなく、**一次平滑化と単調性だけを使ったときの指数**です。古典的なより鋭い評価は、鋭い反転公式の切断誤差を制御する追加の論証を必要とします。

<!-- proof-start -->
### 証明

[ANT7の零点逆数二乗和](../ANT7/index.md#prop-ant7-zero-product-convergence)と[平滑化明示公式](../ANT7/index.md#thm-ant7-smoothed-explicit-formula)を用います。RHではすべての $\rho$ に対し $|x^\rho|=x^{1/2}$ なので
$$
\left|\sum_\rho\frac{x^\rho}{\rho(\rho+1)}\right|
\le x^{1/2}\sum_\rho\frac1{|\rho(\rho+1)|}
=O(x^{1/2}).
$$
明示公式の定数項と $R_1(x)=O(x^{-1/2})$ を吸収すると $\Psi_1(x)=x/2+O(x^{1/2})$ です。従って $F(x)=x\Psi_1(x)=x^2/2+O(x^{3/2})$。直前の[平滑化解除の補題](#lem-ant8-unsmoothing)で $\alpha=3/2$ と置くと $\psi(x)=x+O(x^{3/4})$ を得ます。
<!-- proof-end -->

**誤りやすい飛躍**：$\Psi_1(x)=x/2+O(x^{1/2})$ から直接 $\psi(x)=x+O(x^{1/2})$ と「微分」してはいけません。$O$ 記号の誤差は微分可能とは限らず、$\psi$ 自身も跳びます。

## 3. 逆向き：素数の誤差が零点を押し返す

誤差評価から零点不存在を導く方向は、すでに[ANT5の「ψの冪誤差から導く零点不存在」定理](../ANT5/index.md#thm-ant5-error-zero-free)で証明しました。ここではその**既出結果を援用**してRHの十分条件を得ます。

再利用する論理を確認します。誤差を $E(u)=\psi(u)-u=O(u^\theta)$ と書くと、[ANT5のMellin型積分表示](../ANT5/index.md#thm-ant5-mellin-psi)から
$$
-\frac{\zeta'(s)}{\zeta(s)}
=\frac{s}{s-1}+s\int_1^\infty E(u)u^{-s-1}\,du
$$
です。$\sigma>\theta$ のとき右側の積分は、被積分関数の絶対値を $Cu^{\theta-\sigma-1}$ で抑えられるので正則です。一方、位数 $m$ の零点 $s=\rho$ があると $-\zeta'/\zeta$ は留数 $-m$ の極を持ちます。従って $\beta>\theta$ に零点はありません。この積分交換・正則延長・極との矛盾の完全な証明は[ANT5の定理](../ANT5/index.md#thm-ant5-error-zero-free)にあります。

<a id="cor-ant8-strong-error-rh"></a>

<!-- formal-statement-start -->
> **系（十分鋭い誤差評価はRHを導く）**  
> すべての $\varepsilon>0$ について

$$
\psi(x)=x+O_\varepsilon(x^{1/2+\varepsilon})
$$

> が成り立つならRHは正しい。特に $\psi(x)=x+O(x^{1/2}(\log x)^K)$ がある固定 $K\ge0$ について成立すればRHは正しい。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

任意の $\beta>1/2$ に対し $0<\varepsilon<\min(\beta-1/2,1/2)$ を選ぶと、[直前の定理](../ANT5/index.md#thm-ant5-error-zero-free)から $\beta$ を実部とする零点は存在しません。従って全非自明零点の実部は $1/2$ 以下です。[ANT7の対称性](../ANT7/index.md#thm-ant7-zero-symmetry)によれば $\beta<1/2$ の零点があれば $1-\beta>1/2$ にも零点があるため、結局 $\beta=1/2$ です。

後半は $\log^K x=O_\varepsilon(x^\varepsilon)$ を使います。この評価は $y=\log x$ と置くと $y^Ke^{-\varepsilon y}$ が $y\to\infty$ で有界となることから従います。
<!-- proof-end -->

古典的には、RHと **$\psi(x)=x+O(x^{1/2}(\log x)^2)$** が同値であることが知られています。本章で**証明した**のは、そのうち誤差からRHへの向きと、RHからは一次平滑化だけで得られる $3/4$ の評価までです。逆向きの鋭い誤差評価を得るには、切断Perron積分の端点・零点近傍での誤差管理が別に必要です。「同値は知られている」と「本章で証明した」は区別します。

## 4. 零点不存在領域は高さとともに細くなる

[ANT6の境界上での零点不存在](../ANT6/index.md#thm-ant6-zeta-line-one)は、各有限の高さ区間では連続性によって少し左へ広げられます。しかしその幅が高さに依らず一定とは言えません。定量的な主張では幅を $t$ の式として記述します。

<a id="def-ant8-log-region"></a>

<!-- formal-statement-start -->
> **定義（対数型零点不存在領域）**  
> ある定数 $c>0$ について、$\zeta$ が

$$
\sigma\ge1-\frac{c}{\log(|t|+3)}
$$

> の中に零点を持たないとき、ζは **対数型零点不存在領域** を持つという。$s=1$ の単純極は零点ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ant8-log-region -->
**定義の確認**：$|t|=e^{10}-3$ では幅は $c/10$、$|t|=e^{20}-3$ では $c/20$ です。高さが大きいほど $\sigma=1$ の左に保証できる距離が半分になります。固定幅 $\sigma>1-c$ を全高さで保証したという意味ではありません。
<!-- definition-example-end -->

### 零点付近の対数微分を評価する

$\zeta'/\zeta$ は零点に近付くほど大きくなります。そこで零点の主要項を先に明示的に取り除き、残りを固定円板上の複素解析で抑えます。

<a id="lem-ant8-local-log-derivative"></a>

<!-- formal-statement-start -->
> **補題（ζの局所対数微分の零点表示）**  
> $|t|\ge3$、$1<\sigma\le2$、$s=\sigma+it$ とする。ある絶対定数 $C>0$ が存在して

$$
\frac{\zeta'(s)}{\zeta(s)}
=\sum_{\substack{\rho\\|\operatorname{Im}\rho-t|\le1}}
\frac1{s-\rho}+O(\log(|t|+3))
$$

> が成立する。和は非自明零点を重複度込みで数え、誤差定数は $\sigma,t$ に一様である。
<!-- formal-statement-end -->

### 証明の見取り図

[ANT7のJensen零点数評価](../ANT7/index.md#lem-ant7-jensen-disk)で、中心 $2+it$ の大きさ一定の円板に零点が $O(\log|t|)$ 個しかないことを示します。零点因子を割り去った関数には正則な対数が存在し、その微分を円板上で $O(\log|t|)$ と評価します。

<!-- proof-start -->
### 証明

まず $|t|\ge10$ とし、$s_0=2+it$ と置きます。円板 $|s-s_0|\le6$ はζの唯一の極 $s=1$ を含みません。この固定幅の領域で、[CA12の関数等式](../../../解析系/CA/CA12/index.md#thm-ca12-functional-equation)と右半平面のDirichlet級数の比較から、ある定数 $B$ について
$$
\max_{|s-s_0|\le6}|\zeta(s)|\ll(|t|+3)^B
$$
が成り立ちます（[ANT7の局所零点評価の準備](../ANT7/index.md#lem-ant7-contour-height)と同じ固定幅多項式評価です）。一方、絶対収束級数から
$$
|\zeta(s_0)|\ge1-\sum_{n\ge2}n^{-2}
=2-\zeta(2)>0.
$$
[Jensenの円板零点数評価](../ANT7/index.md#lem-ant7-jensen-disk)を半径 $5$ と $6$ に適用すると、$|s-s_0|\le5$ にある零点の数 $m$ は重複度込みで $O(\log(|t|+3))$ です。

その零点を $\rho_1,\ldots,\rho_m$ として
$$
g(s)=\zeta(s)\prod_{j=1}^m\frac{s_0-\rho_j}{s-\rho_j}
$$
と置きます。零点の位数分だけ極を打ち消しているので $g$ は $|s-s_0|<6$ で正則であり、$|s-s_0|<5$ で零になりません。$|s-s_0|=6$ では $|s-\rho_j|\ge1$、$|s_0-\rho_j|\le5$ なので
$$
|g(s)|\le|\zeta(s)|\,5^m
\ll(|t|+3)^{B+C_0\log5}.
$$
[最大値原理](../../../解析系/CA/CA3/index.md#thm-ca3-maximum-modulus)により同じ上界が内側の円板にも成り立ちます。また $g(s_0)=\zeta(s_0)$ なので $\log|g(s_0)|\ge\log(2-\zeta(2))$ です。

半径 $5$ の円板で零でない $g$ には正則な対数 $H=\log g$ が存在します。上の最大値評価から、定数 $C_1$ を適切に大きく取って

$$
\operatorname{Re}H(s)=\log|g(s)|
\le M,\qquad M=C_1\log(|t|+3)
$$

とします。中心との差、および実部の上界との差をそれぞれ

$$
K(s)=H(s)-H(s_0),\qquad
A=M-\operatorname{Re}H(s_0)\ge0
$$

と置きます。すると $\operatorname{Re}K(s)\le A$ なので
$$
w(s)=\frac{K(s)}{2A-K(s)}
$$
を考えます。まず分母と分子の差は

$$
|2A-K|^2-|K|^2
=4A(A-\operatorname{Re}K)\ge0
$$

です。従って $|w(s)|\le1$ です。また $K(s_0)=0$ だから $w(s_0)=0$ となります。

$A=0$ なら実部が最大値に達するため、[最大値原理](../../../解析系/CA/CA3/index.md#thm-ca3-maximum-modulus)により $H$ は定数です。以下 $A>0$ とします。

半径 $4$ の円板に[Schwarzの補題](../../../解析系/CA/CA6/index.md#thm-ca6-schwarz-lemma)を適用します。中心 $s_0$ で $w(s_0)=0$ であり $|w|\le1$ だから、$|s-s_0|\le3$ では

$$
|w(s)|\le\frac34.
$$

これを $K=2Aw/(1+w)$ へ代入すると
$$
|H(s)-H(s_0)|
=\left|\frac{2Aw(s)}{1+w(s)}\right|
\le6A=O(\log(|t|+3)).
$$
$H$ のCauchy微分評価を半径 $1$ の小円へ適用すれば、$|s-s_0|\le2$ で $|H'(s)|=O(\log(|t|+3))$ です（小円は $|u-s_0|\le3$ の範囲に収まります）。$g'/g=H'$ だから
$$
\frac{\zeta'(s)}{\zeta(s)}
=\sum_{j=1}^m\frac1{s-\rho_j}+O(\log(|t|+3))
\qquad(|s-s_0|\le2).
$$
目標の $s=\sigma+it$ は $|s-s_0|\le1$ です。この和から $|\operatorname{Im}\rho_j-t|>1$ の項を取り除いても、各分母の絶対値は $1$ より大きく、そのような項は $m=O(\log|t|)$ 個なので、誤差に吸収できます。逆に $|\operatorname{Im}\rho-t|\le1$ の非自明零点は $0<\operatorname{Re}\rho<1$ だから $|\rho-s_0|\le\sqrt5<5$ であり、初めの和に含まれています。

$3\le|t|<10$ では、[ANT6の境界上の零点不存在](../ANT6/index.md#thm-ant6-zeta-line-one)と[零点の孤立性](../../../解析系/CA/CA3/index.md#thm-ca3-isolated-zeros-identity)から、この高さ範囲の $\sigma\in[1,2]$ 上で対数微分は有界です。有限個の零点についても $\beta<1$ なので、上の零点和は有界です。定数を大きくすれば同じ形の評価が成り立ちます。
<!-- proof-end -->

<a id="thm-ant8-classical-zero-free"></a>

<!-- formal-statement-start -->
> **定理（ζの古典的な対数型零点不存在領域）**  
> ある絶対定数 $c>0$ が存在し、ζのすべての非自明零点 $\rho=\beta+i\gamma$ は

$$
\beta\le1-\frac{c}{\log(|\gamma|+3)}
$$

> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

[ANT6の三項正値不等式](../ANT6/index.md#lem-ant6-positive-zeta)を対数微分した形で使います。$\rho=\beta+i\gamma$ が右端に近過ぎると、$-\zeta'/\zeta$ に $-1/(\sigma-\beta)$ が現れ、実軸での $3/(\sigma-1)$ と競合します。残りの零点とGamma因子の寄与は、[ANT7の円板零点数評価](../ANT7/index.md#lem-ant7-jensen-disk)と局所対数微分評価で $O(\log|\gamma|)$ に抑えます。

<!-- proof-start -->
### 証明

まず[局所対数微分の補題](#lem-ant8-local-log-derivative)の実部を取ります。$|t|\ge3$、$1<\sigma\le2$ なら、[ANT7の零点の位置](../ANT7/index.md#thm-ant7-zero-symmetry)より $\sigma-\operatorname{Re}\rho>0$ であり、
$$
\operatorname{Re}\!\left(-\frac{\zeta'(\sigma+it)}
{\zeta(\sigma+it)}\right)
\le C\log(|t|+3)
-\!\!\sum_{\substack{\rho\\|\operatorname{Im}\rho-t|\le1}}
\frac{\sigma-\operatorname{Re}\rho}
{(\sigma-\operatorname{Re}\rho)^2+(t-\operatorname{Im}\rho)^2}. \tag{4.1}
$$
零点の項はすべて非負なので、右側で一部を残し他を捨てると上界が得られます。

いま $\rho_0=\beta+i\gamma$ を零点、$|\gamma|\ge3$ とし、$v=1-\beta>0$、$\delta>0$、$\sigma=1+\delta\le2$ とします。[ζの対数微分とvon Mangoldt級数](../ANT5/index.md#thm-ant5-logarithmic-derivative)のEuler積表示を出発点にします。各素数冪に対し $3+4\cos u+\cos2u=2(1+\cos u)^2\ge0$ であるため、係数の非負性から
$$
0\le3A(\sigma)+4\operatorname{Re}A(\sigma+i\gamma)
+\operatorname{Re}A(\sigma+2i\gamma),\quad
A(s)=-\frac{\zeta'(s)}{\zeta(s)}.
$$
$s=1$ の単純極から $A(1+\delta)=\delta^{-1}+O(1)$ です。(4.1) で $t=\gamma$ とすれば $\rho_0$ 自身が零点和へ入り
$$
\operatorname{Re}A(1+\delta+i\gamma)
\le C\log(|\gamma|+3)-\frac1{\delta+v}.
$$
また $t=2\gamma$ で零点和を捨てると
$\operatorname{Re}A(1+\delta+2i\gamma)\le C\log(2|\gamma|+3)$ です。合わせて
$$
0\le \frac3\delta-\frac4{\delta+v}
+C_1\log(|\gamma|+3). \tag{4.2}
$$
$L=\log(|\gamma|+3)$、$\delta=d/L$ と選び、もし $v\le d/(10L)=\delta/10$ なら
$$
\frac3\delta-\frac4{\delta+v}
\le\frac3\delta-\frac{40}{11\delta}
=-\frac7{11\delta}.
$$
従って (4.2) の右辺は $L(-7/(11d)+C_1)$ 以下です。$d>0$ を $7/(11d)>C_1$ となるよう十分小さく選べば矛盾します。ゆえに $v>d/(10L)$ です。

$|\gamma|<3$ の零点については、[ANT6の零点不存在](../ANT6/index.md#thm-ant6-zeta-line-one)と $s=1$ の極、$\zeta$ の有理型性・[零点の孤立性](../../../解析系/CA/CA3/index.md#thm-ca3-isolated-zeros-identity)を使います。$0<\beta<1$ で $|\gamma|\le3$ の零点は有限個なので、それぞれの $1-\beta$ の最小値は正です。この有限個に合わせて $c$ をさらに小さくすれば結論が全零点に及びます。
<!-- proof-end -->

ここでは **定数 $c$ の数値的最適化** はしていません。零点の具体的な位置の数値計算とも独立の定理です。

## 5. 零点のいない細い帯から素数の誤差へ

定量的な零点不存在は、[ANT7の平滑化明示公式](../ANT7/index.md#thm-ant7-smoothed-explicit-formula)の零点和へ直接代入できます。ただし虚部 $\gamma$ は無限に大きくなるので、小さい高さと大きい高さを分けます。

<a id="thm-ant8-unconditional-error"></a>

<!-- formal-statement-start -->
> **定理（対数型零点不存在からの素数定理の誤差）**  
> ある定数 $b>0$ が存在し、$x\ge3$ に対して

$$
\Psi_1(x)=\frac x2+O(xe^{-b\sqrt{\log x}}),
\qquad
\psi(x)=x+O(xe^{-b\sqrt{\log x}})
$$

> が成り立つ。二つの式の $b$ は必要なら小さく取り直してよい。
<!-- formal-statement-end -->

### 証明の見取り図

$T=\exp(\sqrt{\log x})$ で零点和を分割します。$|\gamma|\le T$ では $\beta$ の上界を、$|\gamma|>T$ では分母の $|\rho|^{-2}$ を使います。平滑化を外す最後の一歩には[差分補題](#lem-ant8-unsmoothing)が必要です。

<!-- proof-start -->
### 証明

$L=\log x$、$T=e^{\sqrt L}$ とします。[ANT7の零点計数](../ANT7/index.md#thm-ant7-riemann-von-mangoldt)から、$U\ge2$ に対し $N(U)=O(U\log U)$ です。従って二進分割で
$$
\sum_{|\gamma|>T}\frac1{|\rho(\rho+1)|}
\ll\sum_{j\ge0}\frac{N(2^{j+1}T)}{(2^jT)^2}
\ll\frac{\log T+1}{T}. \tag{5.1}
$$
[ζの古典的な対数型零点不存在領域](#thm-ant8-classical-zero-free)より $|\gamma|\le T$ では
$$
\beta\le1-\frac{c}{\log(T+3)},
\qquad
|x^\rho|=x^\beta
\le x\exp\!\left(-\frac{cL}{\log(T+3)}\right).
$$
$L$ が十分大きければ $\log(T+3)\le2\sqrt L$ なので、$\beta$ の寄与の総和は[逆数二乗和](../ANT7/index.md#prop-ant7-zero-product-convergence)により
$$
\sum_{|\gamma|\le T}\left|\frac{x^\rho}{\rho(\rho+1)}\right|
\ll xe^{-(c/2)\sqrt L}.
$$
高い零点には $|x^\rho|\le x$ を用い、(5.1) により
$$
\sum_{|\gamma|>T}\left|\frac{x^\rho}{\rho(\rho+1)}\right|
\ll x(1+\sqrt L)e^{-\sqrt L}.
$$
$x$ が大きければ多項式因子 $1+\sqrt L$ は $e^{\sqrt L/2}$ に吸収できます。従ってある $a>0$ に対し全零点和は $O(xe^{-a\sqrt L})$ です。[平滑化明示公式](../ANT7/index.md#thm-ant7-smoothed-explicit-formula)の定数 $-\log(2\pi)$ と $O(x^{-1/2})$ の残積分もこの上界に吸収されるので
$$
F(x)=x\Psi_1(x)=\frac{x^2}2+O(x^2e^{-a\sqrt L}).
$$
[差分補題](#lem-ant8-unsmoothing)の指数型の部分に適用して $\psi(x)=x+O(xe^{-(a/2)\sqrt L})$ を得ます。両式に共通の小さい $b$ を採用すればよいことが分かります。
<!-- proof-end -->

この結論はRHを仮定しません。一方RHを仮定しても、第2節の一次平滑化解除だけでは $\psi$ の指数を $3/4$ までしか下げられません。「無条件だが指数 $1$ に小さい因子を掛ける評価」と「条件付きで指数 $3/4$ の評価」は、適用する $x$ の範囲と誤差の性質が異なります。

## 6. 一般L関数への橋：どこまで同じ議論が動くか

Euler積から係数を読み、解析接続・関数等式で零点を制御する、という流れはζだけに固有ではありません。ただし「Euler積があるからRHと同じ議論を全部使える」とは言えません。特に極の有無、Gamma因子、導手、零点の対称性が変わります。

<a id="def-ant8-grh"></a>

<!-- formal-statement-start -->
> **定義（Dirichlet L関数に対する一般化Riemann予想）**  
> 法 $q\ge2$ の原始Dirichlet文字 $\chi$ に対応する[Dirichlet L関数](../ANT3/index.md#def-ant3-l-function)について、臨界帯 $0<\operatorname{Re}s<1$ 内のすべての零点が $\operatorname{Re}s=1/2$ にあるという未解決の主張を、Dirichlet L関数に対する **一般化Riemann予想（GRH）** という。通常のGRHはこれをすべての原始文字（およびζに対応する自明な場合）に課す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ant8-grh -->
**定義の確認**：法 $4$ の実原始文字 $\chi_4$ では
$$
L(s,\chi_4)=1-\frac1{3^s}+\frac1{5^s}-\frac1{7^s}+\cdots
$$
です。[ANT3の原始文字の判定](../ANT3/index.md#def-ant3-primitive)からこの文字は原始です。GRHはこの関数の **臨界帯の零点** の実部を指定しますが、正の奇数すべてが素数であるという主張ではありません。
<!-- definition-example-end -->

<a id="prop-ant8-character-log-derivative"></a>

<!-- formal-statement-start -->
> **命題（文字付きvon Mangoldt級数）**  
> 法 $q\ge2$ の任意のDirichlet文字 $\chi$ と $\operatorname{Re}s>1$ に対して

$$
-\frac{L'(s,\chi)}{L(s,\chi)}
=\sum_{n\ge1}\frac{\chi(n)\Lambda(n)}{n^s}
$$

> が絶対収束の等式として成立する。
<!-- formal-statement-end -->

### 証明の見取り図

[ANT3のL関数のEuler積](../ANT3/index.md#thm-ant3-l-euler)で素数ごとの対数を取り、項別微分します。ζの場合との違いは素数冪に $\chi(p)^k=\chi(p^k)$ が付く点だけです。

<!-- proof-start -->
### 証明

$\sigma>1$ では[ANT3のEuler積](../ANT3/index.md#thm-ant3-l-euler)が絶対収束・非零であり、$\lvert\chi(p)\rvert\le1$ より
$$
\log L(s,\chi)=\sum_p\sum_{k\ge1}\frac{\chi(p)^k}{kp^{ks}}
$$
と正則な対数を選べます。各 $\sigma\ge1+\eta$ では微分後の絶対値和が
$$
\sum_p\sum_{k\ge1}\frac{(\log p)|\chi(p)|^k}{p^{k\sigma}}
\le\sum_{n\ge1}\frac{\Lambda(n)}{n^{1+\eta}}<\infty
$$
で一様に収束します。従って項別微分でき、
$$
-\frac{L'}L(s,\chi)
=\sum_p\sum_{k\ge1}\frac{\chi(p)^k\log p}{p^{ks}}
=\sum_{n\ge1}\frac{\chi(n)\Lambda(n)}{n^s}
$$
です。最後の等号は、$\Lambda(n)$ が $n=p^k$ にだけ $\log p$ を与えることと文字の完全乗法性によります。
<!-- proof-end -->

<a id="prop-ant8-induced-l-factor"></a>

<!-- formal-statement-start -->
> **命題（誘導文字による有限Euler因子）**  
> 法 $q$ のDirichlet文字 $\chi$ が導手 $f\mid q$ の原始文字 $\chi^\ast$ から誘導されるなら、$\operatorname{Re}s>1$ で

$$
L(s,\chi)=L(s,\chi^\ast)
\prod_{\substack{p\mid q\\p\nmid f}}(1-\chi^\ast(p)p^{-s})
$$

> が成立する。この等式は双方が有理型に延長された領域で恒等的に成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[誘導文字の定義](../ANT3/index.md#def-ant3-primitive)から、素数 $p\nmid q$ では

$$
\chi(p)=\chi^\ast(p)
$$

が成り立ちます。一方、$p\mid q$ なら $\chi(p)=0$ なので、$L(s,\chi)$ のEuler因子は $1$ です。

右辺の $L(s,\chi^\ast)$ でも $p\mid f$ の素数に対応するEuler因子は $1$ です。残る $p\mid q$、$p\nmid f$ の素数については、余分な因子

$$
(1-\chi^\ast(p)p^{-s})^{-1}
$$

が存在します。命題の有限積は、まさにこの余分な因子を打ち消します。

[Dirichlet L関数のEuler積](../ANT3/index.md#thm-ant3-l-euler)により、$\sigma>1$ では両辺が一致します。その後は[恒等定理](../../../解析系/CA/CA3/index.md#thm-ca3-isolated-zeros-identity)で有理型接続上の等式が従います。
<!-- proof-end -->

**例**：法 $4$ の主文字は法 $1$ の文字から誘導されるため
$$
L(s,\chi_{0,4})=\zeta(s)(1-2^{-s}).
$$
右半平面では $1-2^{-s}$ は零になりませんが、解析接続後は有限Euler因子自身の零点が生じ得ます。**非原始文字を原始文字と同じ完成L関数として扱わない**理由はここにあります。

### 共通する四つの構造と、未証明の境界

| 構造 | ζ | 原始Dirichlet L関数 | さらなる例 |
|---|---|---|---|
| Dirichlet級数 | 係数 $1$ | 係数 $\chi(n)$ | modular form のFourier係数 |
| Euler積 | 各素数に一因子 | 各素数に文字値の一因子 | 一般には複数の局所因子 |
| 解析接続 | [CA12で証明済み](../../../解析系/CA/CA12/index.md#thm-ca12-meromorphic-continuation) | [ANT3で $\sigma>0$ まで証明](../ANT3/index.md#thm-ant3-l-continuation) | 個別の深い定理が必要 |
| 関数等式 | [CA12の関数等式](../../../解析系/CA/CA12/index.md#thm-ca12-functional-equation) | 原始文字のGauss和・Gamma因子を伴う | 重み・導手・Gamma因子が変化 |

原始Dirichlet文字の偶奇を $\chi(-1)=(-1)^a$（$a=0$ または $1$）で表すと、完成L関数には
$$
\Lambda(s,\chi)=\left(\frac q\pi\right)^{(s+a)/2}
\Gamma\!\left(\frac{s+a}{2}\right)L(s,\chi)
$$
という形が現れます。原始文字の場合の関数等式
$$
\Lambda(s,\chi)
=\frac{i^{-a}\tau(\chi)}{\sqrt q}\,
\Lambda(1-s,\overline\chi)
$$
は[ANT3のGauss和](../ANT3/index.md#def-ant3-gauss-sum)と関係します。ただし **この表示を本文で導出したことにはしません**。証明にはPoisson和公式・Theta変換などの追加の議論が必要です。$\overline\chi$ が現れるため、個々の複素文字の零点対称性もζの場合の $\rho\mapsto1-\rho$ を無条件にコピーできません。

modular form のL関数では、素数ごとの局所因子にHecke固有値などの係数が入り、解析接続と関数等式の証明も別に必要になります。**GRHは定義であって証明ではありません。** 本章で完全に導出したのは文字付き対数微分と誘導文字の有限因子までです。

## 7. 演習と詳細解答

各問では「どの前提を使ったか」と「平滑化から戻すとき何を失うか」を明示してください。

### Level A：定義と直接計算

#### A1. 臨界線と架空の零点
$\rho=2/5+7i$ が非自明零点だと仮定する。四点対称性から得られる点を書き、RHとの関係を述べよ。

- Level: A
- ID: ANT8-A1

<!-- solution-start -->
**詳細解答**：[ANT7の対称性](../ANT7/index.md#thm-ant7-zero-symmetry)から
$$
2/5+7i,\quad2/5-7i,\quad3/5+7i,\quad3/5-7i
$$
が零点になります。実部が $1/2$ ではないので、この仮定が実際に成立すれば[RHの定義](#def-ant8-rh)に反します。点の実在は一切証明していません。
<!-- solution-end -->

#### A2. 平滑化和の積分表示
$2<x<3$ で $F(x)=\int_1^x\psi(t)dt$ を計算し、$x\Psi_1(x)$ と比較せよ。

- Level: A
- ID: ANT8-A2

<!-- solution-start -->
**詳細解答**：$1\le t<2$ では $\psi(t)=0$、$2\le t<3$ では $\psi(t)=\log2$ なので
$$
\int_1^x\psi(t)\,dt=\int_2^x\log2\,dt=(x-2)\log2.
$$
[ANT7の平滑化和](../ANT7/index.md#def-ant7-smoothed-psi)は $\Psi_1(x)=\log2(1-2/x)$ です。これに $x$ を掛けると $(x-2)\log2$ となり一致します。
<!-- solution-end -->

#### A3. 対数型領域の幅
$|t|+3=e^{12}$ と $|t|+3=e^{24}$ で、$\sigma=1$ から零点不存在境界までの幅を比較せよ。

- Level: A
- ID: ANT8-A3

<!-- solution-start -->
**詳細解答**：[定義](#def-ant8-log-region)から幅は $c/\log(|t|+3)$ です。前者が $c/12$、後者が $c/24$ で、後者は前者の半分です。高さが増すと保証できる幅は小さくなるので、固定幅 $c/12$ が全高さで使えるわけではありません。
<!-- solution-end -->

#### A4. 法4のL関数
法4の主文字 $\chi_{0,4}$ について $\operatorname{Re}s>1$ で $L(s,\chi_{0,4})$ をζで表せ。

- Level: A
- ID: ANT8-A4

<!-- solution-start -->
**詳細解答**：[ANT3の主文字](../ANT3/index.md#def-ant3-principal)は偶数で $0$、奇数で $1$ なので
$$
L(s,\chi_{0,4})=\sum_{\substack{n\ge1\\n\text{ odd}}}n^{-s}
=\sum_{n\ge1}n^{-s}-\sum_{m\ge1}(2m)^{-s}
=(1-2^{-s})\zeta(s).
$$
$\sigma>1$ では両級数が絶対収束するので差を取れます。[誘導文字の命題](#prop-ant8-induced-l-factor)の特例です。
<!-- solution-end -->

### Level B：誤差と解析接続

#### B1. 差分幅の最適化
$F(x)=x^2/2+O(x^{8/5})$、$\psi$ は非減少とする。$\psi(x)-x$ の上界と幅 $h$ を求めよ。

- Level: B
- ID: ANT8-B1

<!-- solution-start -->
**詳細解答**：[差分不等式](#lem-ant8-unsmoothing)で $|\psi(x)-x|\ll h+x^{8/5}/h$ です。二項を等しくするため $h^2=x^{8/5}$、すなわち $h=x^{4/5}$ と選びます。$h/x=x^{-1/5}\to0$ なので $h\le x/2$ の条件を満たし、
$$
\psi(x)=x+O(x^{4/5})
$$
を得ます。$8/5$ をそのまま $\psi$ の誤差指数に使うのは適切ではありません。
<!-- solution-end -->

#### B2. 誤差から半平面の非零性
$\psi(x)=x+O(x^{2/3})$ を仮定したときの $-\zeta'/\zeta$ の解析接続可能な半平面と、排除できる零点を答えよ。

- Level: B
- ID: ANT8-B2

<!-- solution-start -->
**詳細解答**：[誤差から零点不存在への定理](../ANT5/index.md#thm-ant5-error-zero-free)の積分を $E(u)=O(u^{2/3})$ に対して使います。
$$
\left|\int_1^\infty E(u)u^{-s-1}du\right|
\le C\int_1^\infty u^{2/3-\sigma-1}du
=\frac C{\sigma-2/3}\qquad(\sigma>2/3).
$$
従って $s=1$ を除いて正則であり、$\beta>2/3$ の零点は存在しません。[ANT7の対称性](../ANT7/index.md#thm-ant7-zero-symmetry)から $\beta<1/3$ も存在しません。よって全非自明零点は $1/3\le\beta\le2/3$ に限られます。端点 $\beta=2/3$ はこの議論だけでは排除していません。
<!-- solution-end -->

#### B3. 対数型領域から小さい零点和
$L=\log x$、$T=e^{\sqrt L}$ とし、$|\gamma|\le T$ の零点について
$$
\sum_{|\gamma|\le T}\frac{|x^\rho|}{|\rho(\rho+1)|}
\ll xe^{-c'\sqrt L}
$$
を示せ。定数 $c'>0$ は変更してよい。

- Level: B
- ID: ANT8-B3

<!-- solution-start -->
**詳細解答**：[ζの古典的な対数型零点不存在領域](#thm-ant8-classical-zero-free)から
$$
\beta\le1-\frac c{\log(T+3)},\quad
|x^\rho|=x^\beta\le
x\exp\!\left(-\frac{cL}{\log(T+3)}\right).
$$
大きい $x$ では $\log(T+3)\le2\sqrt L$ なので $\exp(-cL/\log(T+3))\le e^{-(c/2)\sqrt L}$ です。[ANT7の逆数二乗和](../ANT7/index.md#prop-ant7-zero-product-convergence)により分母の和は $x,T$ に依らず有界です。従って $c'=c/2$ を取れます。
<!-- solution-end -->

#### B4. 一般L関数の対数微分
法4の非主文字 $\chi_4$ に対し、$\chi_4(3)=-1$ を用いて $-\!L'(s,\chi_4)/L(s,\chi_4)$ の $n=3,9$ の項を求めよ。

- Level: B
- ID: ANT8-B4

<!-- solution-start -->
**詳細解答**：[文字付き対数微分](#prop-ant8-character-log-derivative)から $n=p^k$ の項は $\chi_4(p)^k(\log p)p^{-ks}$ です。$\chi_4(3)=-1$ なので $n=3$ は $-(\log3)3^{-s}$、$n=9=3^2$ は $+(\log3)9^{-s}$ です。$\Lambda(9)=\log3$ であって $2\log3$ ではありません。両項を合わせると
$$
-(\log3)3^{-s}+(\log3)9^{-s}
$$
となります。
<!-- solution-end -->

### Level C：一つの論証へつなぐ

#### C1. RHから一次平滑化を経て素数誤差まで
RHを仮定し、[一次平滑化したvon Mangoldt型明示公式](../ANT7/index.md#thm-ant7-smoothed-explicit-formula)から $\psi(x)=x+O(x^{3/4})$ を、中間の積分表示・差分幅を明示して導け。また同じ手段で $O(x^{1/2})$ と断定できない理由を述べよ。

- Level: C
- ID: ANT8-C1

<!-- solution-start -->
**詳細解答**：RHでは $\beta=1/2$ なので[ANT7の零点逆数二乗和](../ANT7/index.md#prop-ant7-zero-product-convergence)によって
$$
\sum_\rho\left|\frac{x^\rho}{\rho(\rho+1)}\right|
\le x^{1/2}\sum_\rho\frac1{|\rho(\rho+1)|}
=O(x^{1/2}).
$$
よって $\Psi_1(x)=x/2+O(x^{1/2})$、$F(x)=x\Psi_1(x)=x^2/2+O(x^{3/2})$ です。定義から
$$
F(x)=\sum_{n<x}\Lambda(n)(x-n)=\int_1^x\psi(t)dt.
$$
$\psi$ は非減少なので $0<h<x/2$ に対して
$$
\frac{F(x)-F(x-h)}h\le\psi(x)\le\frac{F(x+h)-F(x)}h.
$$
左右の差分を計算すると主項は $x\pm h/2$、誤差は $O(x^{3/2}/h)$ です。$h=x^{3/4}$ と選べば
$$
|\psi(x)-x|\ll x^{3/4}+x^{3/2-3/4}
=O(x^{3/4}).
$$
ここから誤差の指数をさらに $1/2$ に下げるには、一次平滑化の情報だけでは足りません。$F$ の $O(x^{3/2})$ をそのまま微分することは許されず、切断反転の別の評価が必要です。
<!-- solution-end -->

## 8. 到達点

[ANT6の素数定理](../ANT6/index.md#thm-ant6-psi-asymptotic)は零点が境界にないことから主項を導きました。ANT7と本章では、零点の位置に関する **定量的な幅** が $\psi(x)-x$ の誤差をどのように左右するかを、平滑化と単調性の誤差まで含めて導きました。

Riemann予想は未解決です。本章での条件付き主張を、無条件の素数分布の定理やGRHの証明へ読み替えてはいけません。Dirichlet L関数へ移る際には、文字・導手・Gamma因子・関数等式という追加の構造を確認する必要があります。
