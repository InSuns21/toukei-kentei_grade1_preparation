# INV11 反復正則化をいつ止めるか

<!-- definition-example-audit: strict -->

[INV10 の Fréchet 微分](../INV10/index.md#def-inv10-frechet-forward)があれば、候補 $x$ から観測 $F(x)$ がどのように変わるかを計算できます。しかし、真の未知量 $x^\dagger$ は手元にありません。得られるのは雑音のある $y^\delta$ であり、観測への適合を続けすぎれば雑音も再現してしまいます。

本講の問いは「**反復更新をどこまで信用でき、何を観測して止められるか**」です。まず残差を減らす方向を導き、次に非線形性を定量化する条件の下で停止前の更新が誤差を増やさないと証明します。最後に Newton・Gauss–Newton および反復的に正則化する方法との位置関係を整理します。

[INV5 の二乗ノルム Tikhonov 正則化](../INV5/index.md#def-inv5-tikhonov)では正則化パラメータが雑音への適合を制御しました。[INV7 の Morozov の不一致原理](../INV7/index.md#def-inv7-discrepancy)では残差と雑音水準を比較しました。本講では、**反復回数そのもの**が正則化の役割を果たします。

特に断らない限り $X,Y$ は実 Hilbert 空間、$U\subset X$ は開集合、$F:U\to Y$ は $C^1$、真のデータは $y=F(x^\dagger)$、雑音付きデータは $y^\delta\in Y$ で

$$
\|y^\delta-y\|_Y\le\delta
$$

とします。$\delta$ は既知の誤差上界であり、真の誤差との等号は要求しません。

## 1. 観測残差から更新方向を作る

まず近似 $x$ の観測残差を $r^\delta(x)=F(x)-y^\delta$ と書きます。二乗残差の目的関数

$$
\Phi^\delta(x)=\frac12\|F(x)-y^\delta\|_Y^2
$$

を小さくすれば、観測と候補が近づきます。ただし観測が合っても未知量が合うとは限りません。

$x\in U$ を固定し、$x+h\in U$ となる十分小さい $h\in X$ を動かします。[Fréchet 微分](../INV10/index.md#def-inv10-frechet-forward)の定義から、

$$
k(h)=F'(x)h+q(h),\qquad \|q(h)\|_Y=o(\|h\|_X)
$$

と書けます。$F'(x)$ が有界なので $\|k(h)\|_Y=O(\|h\|_X)$ です。従って二乗ノルムを先に展開すると

$$
\begin{aligned}
\Phi^\delta(x+h)-\Phi^\delta(x)
&=\frac12\bigl(\|r^\delta(x)+k(h)\|_Y^2-\|r^\delta(x)\|_Y^2\bigr)\\
&=\langle r^\delta(x),k(h)\rangle_Y+\frac12\|k(h)\|_Y^2.
\end{aligned}
$$

ここで $\langle r^\delta(x),q(h)\rangle_Y=o(\|h\|_X)$、$\|k(h)\|_Y^2=O(\|h\|_X^2)=o(\|h\|_X)$ なので

$$
\begin{aligned}
\Phi^\delta(x+h)-\Phi^\delta(x)
&=\langle r^\delta(x),F'(x)h\rangle_Y+o(\|h\|_X)\\
&=\langle F'(x)^*r^\delta(x),h\rangle_X+o(\|h\|_X).
\end{aligned}
$$

最後の等式の $F'(x)^*:Y\to X$ は、[Hilbert 空間の随伴作用素](../../F0/F0-02C3A/index.md#def-f0-02c3a-hilbert-adjoint)に現れたものと同じく

$$
\langle F'(x)h,v\rangle_Y=\langle h,F'(x)^*v\rangle_X
$$

を満たす有界線形作用素です。したがって、二乗残差の勾配は $F'(x)^*r^\delta(x)$ です。

<a id="def-inv11-landweber"></a>

<!-- formal-statement-start -->
> **定義（非線形 Landweber 反復）**  
> 実 Hilbert 空間 $X,Y$、開集合 $U\subset X$、$C^1$ 写像 $F:U\to Y$、$y^\delta\in Y$、初期点 $x_0^\delta\in U$、歩幅 $\omega>0$ を与える。各更新点が $U$ に属する間、次を満たす列を**非線形 Landweber 反復**という。

$$
x_{n+1}^\delta=x_n^\delta-\omega F'(x_n^\delta)^*
\bigl(F(x_n^\delta)-y^\delta\bigr).
$$

> $F'(x_n^\delta)^*$ は導関数の Hilbert 空間随伴である。途中で $U$ を出れば、以降の反復が定義されるとは限らない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-inv11-landweber -->

**定義の確認**：$X=Y=\mathbb R$、$F(t)=t+t^2/10$、$U=\mathbb R$ とし、$x_0^\delta=0$、$y^\delta=0.53$、$\omega=1/2$ とします。$F'(t)h=(1+t/5)h$ は有界線形で、実数の標準内積では随伴も同じ倍率です。したがって

$$
r^\delta(0)=-0.53,\qquad
x_1^\delta=0-\frac12(1)(-0.53)=0.265.
$$

二乗残差は初期点で $0.53^2/2=0.14045$、更新後では $F(0.265)-0.53=-0.2579775$ より $0.2579775^2/2=0.033276195253125$ です。確かに減少しますが、この一歩の減少だけでは、すべての反復で真の解へ近づくとは主張できません。
<!-- definition-example-end -->

## 2. 非線形性をどう測るか：接線錐条件

[INV10 の線形化](../INV10/index.md#def-inv10-frechet-forward)が保証するのは、一点の近くで剰余が $\|h\|$ より小さくなることでした。反復の解析では、異なる二点の間で生じる剰余を**観測差そのもの**と比較したいのです。この比較条件をここで導入します。

<a id="def-inv11-tangential-cone"></a>

<!-- formal-statement-start -->
> **定義（接線錐条件）**  
> $X,Y$ を実 Hilbert 空間、$V\subset X$ を $F$ の定義域に含まれる集合とし、$F$ は $V$ の各点で Fréchet 微分可能とする。ある $\eta\in[0,1)$ に対し、すべての $x,z\in V$ について

$$
\|F(z)-F(x)-F'(x)(z-x)\|_Y
\le\eta\|F(z)-F(x)\|_Y
$$

> が成り立つとき、$F$ は $V$ 上で定数 $\eta$ の**接線錐条件**を満たすという。ここでは特に $\eta<1/2$ を仮定する定理を扱う。
<!-- formal-statement-end -->

<!-- definition-example-start: def-inv11-tangential-cone -->

**定義の確認**：$V=[-1,1]$、$F(t)=t+t^2/10$ とします。$F'(x)=1+x/5$ なので

$$
F(z)-F(x)-F'(x)(z-x)=\frac{(z-x)^2}{10}.
$$

さらに $x,z\in V$ なら $|z-x|\le2$、$|x+z|\le2$ です。一方で

$$
F(z)-F(x)=(z-x)\left(1+\frac{x+z}{10}\right)
$$

となり、括弧は $4/5$ 以上です。従って

$$
\frac{|F(z)-F(x)-F'(x)(z-x)|}{|F(z)-F(x)|}
\le\frac{|z-x|/10}{4/5}
\le\frac14
$$

です（$z=x$ なら元の不等式の両辺が零）。よって $\eta=1/4$ で条件を満たします。これは微分公式を示すだけでなく、定義が要求する**すべての二点についての条件**を検証しています。

線形写像 $F(x)=Ax$ なら剰余は常に零であり、$\eta=0$ とできます。逆に $F(t)=t^2$ を $0$ を含む区間で考えると、$x=0$、$z\ne0$ について剰余と観測差が等しくなるため、$\eta<1$ の条件は成立しません。微分の存在と接線錐条件は別です。
<!-- definition-example-end -->

## 3. いつ止めるか：雑音水準による残差判定

真の $x^\dagger$ は計算に使えません。そこで手元で計算できる残差 $\|F(x_n^\delta)-y^\delta\|$ が、もともと避けられない雑音の大きさに到達したら止めます。

<a id="def-inv11-discrepancy-stop"></a>

<!-- formal-statement-start -->
> **定義（不一致原理による反復停止）**  
> $\delta>0$ と定数 $\tau>1$ を与え、非線形 Landweber 反復が定義される限り、次を満たす最初の非負整数を停止回数とする。

$$
n_\delta=\min\left\{n\ge0:
\|F(x_n^\delta)-y^\delta\|_Y\le\tau\delta\right\}.
$$

> 条件を満たす整数がなければ $n_\delta$ は定義されない。存在は別の定理で示す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-inv11-discrepancy-stop -->

**定義の確認**：$\delta=0.01$、$\tau=6$ なら閾値は $0.06$ です。先の例では $\|r^\delta(x_0^\delta)\|=0.53>0.06$、さらに $F(0.265)=0.2720225$ なので $\|r^\delta(x_1^\delta)\|=0.2579775>0.06$。少なくとも最初の一歩では止まりません。逆に初期点で残差が $0.05$ なら、更新を始めず $n_\delta=0$ です。
<!-- definition-example-end -->

次の定理は、停止前に限れば、観測を合わせる更新が真の解からの距離も減らすことを示します。重要なのは、停止後まで同じ主張を延長しないことです。

<a id="thm-inv11-noisy-descent-stop"></a>

<!-- formal-statement-start -->
> **定理（接線錐条件の下での誤差減少と有限停止）**  
> $X,Y$ を実 Hilbert 空間、$x^\dagger\in X$、$r>0$ とし、$F$ は開球 $B_r(x^\dagger)$ を含む開集合で $C^1$ とする。$F$ は $B_r(x^\dagger)$ 上で定数 $0\le\eta<1/2$ の[接線錐条件](#def-inv11-tangential-cone)を満たし、すべての $x\in B_r(x^\dagger)$ で $\|F'(x)\|\le L$（$0<L<\infty$）とする。
>
> $y=F(x^\dagger)$、$\|y^\delta-y\|_Y\le\delta$、$\delta>0$、$x_0^\delta\in B_r(x^\dagger)$ とし、歩幅と停止閾値を

$$
0<\omega,\qquad \omega L^2\le1,\qquad
\tau>\frac{2(1+\eta)}{1-2\eta}
$$

> と選ぶ。$c_\tau=1-2\eta-2(1+\eta)/\tau>0$ とおくと、[非線形 Landweber 反復](#def-inv11-landweber)と[停止回数](#def-inv11-discrepancy-stop)は停止まで定義され、$n_\delta$ は有限である。任意の $n<n_\delta$ で

$$
\|x_{n+1}^\delta-x^\dagger\|_X^2
\le \|x_n^\delta-x^\dagger\|_X^2
-\omega c_\tau\|F(x_n^\delta)-y^\delta\|_Y^2
$$

> が成り立ち、停止回数には

$$
n_\delta\le
\frac{\|x_0^\delta-x^\dagger\|_X^2}
{\omega c_\tau\tau^2\delta^2}
$$

> という上界がある。
<!-- formal-statement-end -->

### 証明の見取り図

更新式の距離平方を展開すると、負の内積項と正の歩幅二乗項が現れます。接線錐条件で前者を下から評価し、微分の上界で後者を抑えます。残差が $\tau\delta$ より大きい間は雑音の項を吸収でき、距離平方が毎回ある量だけ減ります。球の外へ出ないことと有限停止が同時に従います。

<!-- proof-start -->
### 証明

$n$ 番目の点が球内にあり、まだ停止していないと仮定します。記号を

$$
e=x_n^\delta-x^\dagger,\quad
d=F(x_n^\delta)-F(x^\dagger),\quad
r_n=F(x_n^\delta)-y^\delta,\quad
A=F'(x_n^\delta)
$$

とおきます。$d-r_n=y^\delta-y$ より $\|d-r_n\|\le\delta$、三角不等式から $\|d\|\le\|r_n\|+\delta$ です。

接線錐条件に $x=x_n^\delta,z=x^\dagger$ を代入すると

$$
\|-d+Ae\|
=\|F(x^\dagger)-F(x_n^\delta)-A(x^\dagger-x_n^\delta)\|
\le\eta\|d\|.
$$

ゆえに $Ae=d+q$、$\|q\|\le\eta\|d\|$ と書けます。内積について

$$
\begin{aligned}
\langle r_n,Ae\rangle_Y
&=\langle r_n,r_n+(y^\delta-y)+q\rangle_Y\\
&\ge\|r_n\|^2-\delta\|r_n\|-\eta\|r_n\|\|d\|\\
&\ge(1-\eta)\|r_n\|^2-(1+\eta)\delta\|r_n\|.
\end{aligned}
$$

次に反復式 $e_{\mathrm{new}}=e-\omega A^*r_n$ の平方を展開し、随伴の定義、$\|A^*r_n\|\le L\|r_n\|$、$\omega L^2\le1$ を順に使うと

$$
\begin{aligned}
\|e_{\mathrm{new}}\|^2
&=\|e\|^2-2\omega\langle r_n,Ae\rangle+\omega^2\|A^*r_n\|^2\\
&\le\|e\|^2-\omega(2-2\eta-\omega L^2)\|r_n\|^2
+2\omega(1+\eta)\delta\|r_n\|\\
&\le\|e\|^2-\omega(1-2\eta)\|r_n\|^2
+2\omega(1+\eta)\delta\|r_n\|.
\end{aligned}
$$

未停止なら $\|r_n\|>\tau\delta$ なので

$$
2(1+\eta)\delta\|r_n\|
<\frac{2(1+\eta)}{\tau}\|r_n\|^2.
$$

これを代入すると定理の減少不等式を得ます。とくに $\|e_{\mathrm{new}}\|\le\|e\|<r$ ですから次点も球内にあります。初期点は球内なので、数学的帰納法により停止前の全更新が正当化されます。

仮に有限回で停止しないなら、任意の $N$ について最初の $N$ 回の減少不等式を足せます。

$$
0\le\|x_N^\delta-x^\dagger\|^2
\le\|x_0^\delta-x^\dagger\|^2
-\omega c_\tau\sum_{n=0}^{N-1}\|r_n\|^2.
$$

すべての $\|r_n\|>\tau\delta$ とすると右辺は
$\|x_0^\delta-x^\dagger\|^2-N\omega c_\tau\tau^2\delta^2$
より小さくなり、大きな $N$ で矛盾します。よって $n_\delta$ は有限です。同じ和を $N=n_\delta$ に適用すると、主張の停止回数上界も得られます。初期点ですでに停止する場合 $n_\delta=0$ で結論は自明です。
<!-- proof-end -->

この定理は「接線錐条件が全空間で成り立つ」とは仮定していません。真の解を中心とする球で開始し、**停止前に限り**その球を出ないことを示しています。ただし未知の $x^\dagger$ を用いる開始条件は、定理の妥当性の仮定であって実装時に直接判定できる条件ではありません。

## 4. 残差の減少と解の精度は同じではない

雑音なしなら、停止閾値を使わずに残差が零へ向かうことを導けます。一方、雑音がある場合には残差が小さくても、未知量の誤差を別途評価する必要があります。

<a id="prop-inv11-noiseless-residual"></a>

<!-- formal-statement-start -->
> **命題（雑音なしの残差収束）**  
> $X,Y$ を実 Hilbert 空間、$x^\dagger\in X$、$r>0$ とする。$F$ は $B_r(x^\dagger)$ を含む開集合上で $C^1$ とする。
>
> $F$ は $B_r(x^\dagger)$ 上で定数 $0\le\eta<1/2$ の[接線錐条件](#def-inv11-tangential-cone)を満たす。また、球内の全点で $\|F'(x)\|\le L$（$0<L<\infty$）とする。
>
> 真のデータ $y=F(x^\dagger)$ を正確に与え、$x_0\in B_r(x^\dagger)$、$\omega>0$、$\omega L^2\le1$ として[非線形 Landweber 反復](#def-inv11-landweber)を行う。
> このとき反復は全回で球内にあり、

$$
\sum_{n=0}^{\infty}\|F(x_n)-y\|_Y^2<\infty,
\qquad
\|F(x_n)-y\|_Y\longrightarrow0
$$

> が成立する。これだけでは $x_n\to x^\dagger$ のノルム収束までは結論できない。
<!-- formal-statement-end -->

### 証明の見取り図

雑音項を零とすると、前定理の平方展開から残差平方に比例した距離減少が得られます。非負の距離平方を下界として和を取ります。

<!-- proof-start -->
### 証明

[有限停止定理の証明](#thm-inv11-noisy-descent-stop)で得た内積評価を、ここでは雑音項を含まない場合について計算し直します。前定理そのものは $\delta>0$ を仮定するため、定理の結論に $\delta=0$ を直接代入するのではありません。$d=r_n=F(x_n)-y$ と置くと

$$
\langle F(x_n)-y,F'(x_n)(x_n-x^\dagger)\rangle
\ge(1-\eta)\|F(x_n)-y\|^2.
$$

歩幅条件を用いた平方展開は

$$
\|x_{n+1}-x^\dagger\|^2
\le\|x_n-x^\dagger\|^2
-\omega(1-2\eta)\|F(x_n)-y\|^2.
$$

右辺の減少項は非負です。したがって各更新点は球内にあり、$N$ 回足すと

$$
\omega(1-2\eta)\sum_{n=0}^{N-1}\|F(x_n)-y\|^2
\le\|x_0-x^\dagger\|^2.
$$

$N\to\infty$ として級数が収束します。非負数列の級数が収束すれば一般項は零へ行くため、残差収束が成立します。ただしこの推論は $\|x_n-x^\dagger\|$ の極限を零とするものではありません。
<!-- proof-end -->

追加で [INV10 の局所二点安定性](../INV10/index.md#thm-inv10-local-stability)のように、同じ球で

$$
\|u-v\|_X\le K\|F(u)-F(v)\|_Y
$$

が成り立つ場合は、停止時に初めて未知量の誤差上界も出ます。

<a id="cor-inv11-stopped-error"></a>

<!-- formal-statement-start -->
> **系（停止残差から復元誤差への変換）**  
> [有限停止定理](#thm-inv11-noisy-descent-stop)の仮定に加え、その球の任意の二点 $u,v$ で $\|u-v\|_X\le K\|F(u)-F(v)\|_Y$（$K>0$）が成り立つとする。このとき

$$
\|x_{n_\delta}^\delta-x^\dagger\|_X
\le K(\tau+1)\delta
$$

> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

観測差は、停止残差とデータ雑音の和に分けます。

<!-- proof-start -->
### 証明

定理により停止点と真の解は同じ球にあります。二点安定性へ $u=x_{n_\delta}^\delta$、$v=x^\dagger$ を代入し、三角不等式と停止条件を用いると

$$
\begin{aligned}
\|x_{n_\delta}^\delta-x^\dagger\|_X
&\le K\|F(x_{n_\delta}^\delta)-F(x^\dagger)\|_Y\\
&\le K\left(\|F(x_{n_\delta}^\delta)-y^\delta\|_Y
+\|y^\delta-y\|_Y\right)\\
&\le K(\tau+1)\delta.
\end{aligned}
$$
<!-- proof-end -->

**ここが停止則の限界です。** 無限次元の不良設定逆問題では、[INV2 の不安定性](../INV2/index.md#thm-inv2-compact-instability)のためこのような一様 $K$ がないことがあります。その場合、停止は十分小さい残差を保証しても、ノルム誤差の同じ速さでの収束まで保証しません。なお本講の接線錐条件と局所初期化だけからも一般の雑音下のノルム収束定理を宣言するものではありません。

### 早く止めないと雑音を解いてしまう

$\ell^2$ の対角線形作用素 $A(x_1,x_2,\ldots)=(x_1,x_2/2,\ldots,x_j/j,\ldots)$ を考えます。真の解を $x^\dagger=0$、雑音付き観測を $y^\delta=\delta e_N$ とし、$x_0=0$、$\omega=1$ で Landweber 反復を行うと、$e_N$ 方向の成分だけが動きます。更新の漸化式は

$$
a_{k+1}=\left(1-\frac1{N^2}\right)a_k+\frac{\delta}{N},
\qquad a_0=0
$$

です。等比級数を足すと

$$
x_k=a_ke_N,\qquad
a_k=\delta N\left[1-\left(1-\frac1{N^2}\right)^k\right].
$$

観測残差の $N$ 成分は $-\delta(1-N^{-2})^k$ ですから $k\to\infty$ で零へ減ります。しかし復元誤差は $\|x_k-x^\dagger\|\to\delta N$ となり、$N$ が大きければ真の解から大きく離れます。線形写像は接線錐条件を $\eta=0$ で満たしますから、原因は**非線形性だけでなく、小さい特異値への雑音の追従**にあります。

ここでは $\tau>1$ として [不一致原理による反復停止](#def-inv11-discrepancy-stop)を使うと、初期残差が $\delta\le\tau\delta$ なので $n_\delta=0$ です。ノイズだけを説明するために更新する必要はありません。

## 5. Newton・Gauss–Newton と反復的正則化

Landweber 法は微分の随伴を掛けるだけです。線形化された方程式を毎回（近似的に）解く方法もあります。ただし、小さな特異値を含む線形化問題を直接解けば不安定性を再び持ち込みます。

まず、開集合 $U\subset\mathbb R^p$ 上の $C^1$ 写像 $F:U\to\mathbb R^m$ を考えます。現在点 $x_n\in U$ で $r_n=F(x_n)-y^\delta$ と置き、標準基底 $e_1,\ldots,e_p$ に関する導関数 $F'(x_n)$ の行列表現を $J_n$ とします。すなわち $J_n$ の第 $j$ 列は $F'(x_n)e_j$ であり、$h=\sum_{j=1}^p h_je_j$ なら

$$
F(x_n+h)-y^\delta=r_n+J_nh+o(\|h\|_2),\qquad
J_nh=\sum_{j=1}^p h_jF'(x_n)e_j.
$$

このため $J_n$ は単に登場する行列ではなく、**観測を線形化したときの入力変位 $h$ から観測差への写像**です。正方かつ可逆なら線形化残差 $r_n+J_nh$ を零にする方向を選べます。観測数 $m$ と未知量の次元 $p$ が異なる場合は、二乗残差 $\psi_n(h)=\|r_n+J_nh\|_2^2/2$ を最小にする方向を選びます。

方向 $v\in\mathbb R^p$ を固定して実数 $s$ を動かすと、内積の展開により

$$
\begin{aligned}
\psi_n(h+sv)-\psi_n(h)
&=s\langle r_n+J_nh,J_nv\rangle
+\frac{s^2}{2}\|J_nv\|_2^2,\\
\left.\frac{d}{ds}\psi_n(h+sv)\right|_{s=0}
&=\langle J_n^\mathsf T(r_n+J_nh),v\rangle.
\end{aligned}
$$

ここで $J_n^\mathsf T$ は、実数の標準内積に関する[随伴](../../F0/F0-02C3A/index.md#def-f0-02c3a-hilbert-adjoint)を行列表示した転置です。微分がすべての $v$ で零となる必要十分条件は、$J_n^\mathsf T(r_n+J_nh)=0$、つまり **正規方程式** $(J_n^\mathsf TJ_n)h=-J_n^\mathsf Tr_n$ です。$J_n$ が列フルランクなら $v\ne0$ で $\|J_nv\|_2^2>0$ なので、目的関数は厳密凸でこの方程式の解が一意の最小点になります。この導出を踏まえて、二つの更新を定義します。

<a id="def-inv11-newton-gn"></a>

<!-- formal-statement-start -->
> **定義（Newton 法と Gauss–Newton 法の局所更新）**  
> $U\subset\mathbb R^p$ を開集合とし、$F:U\to\mathbb R^m$ を $C^1$ 写像、$x_n\in U$ とする。$r_n=F(x_n)-y^\delta$、$J_n$ を標準基底で表した $F'(x_n)\in\mathbb R^{m\times p}$ の行列とする。
>
> $m=p$ かつ $J_n$ が可逆なら、$J_n h_n=-r_n$ を解いて $x_{n+1}=x_n+h_n$ とするものが **Newton 法**である。
>
> 一方、線形化した二乗残差 $\|r_n+J_nh\|_2^2/2$ を最小化し、$J_n$ が列フルランクのとき

$$
(J_n^\mathsf TJ_n)h_n=-J_n^\mathsf Tr_n,\qquad
x_{n+1}=x_n+h_n
$$

> で更新するものをここでの **Gauss–Newton 法**という。列フルランクでなければこの正規方程式の解は一意とは限らない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-inv11-newton-gn -->

**定義の確認**：$F(t)=t^2$、$x_n=1$、$y^\delta=4$ とすれば $r_n=-3$、$J_n=2$ です。Newton 法の式は $2h_n=3$、よって $h_n=3/2$ と $x_{n+1}=5/2$。一次元の Gauss–Newton 正規方程式も $4h_n=6$ となり同じ値です。これは線形化方程式を解くという条件を実際に確認しています。次の点では $F(5/2)=25/4\ne4$ であり、一回で真の非線形方程式を解いたわけではありません。
<!-- definition-example-end -->

正方行列 $J_n$ が可逆なときは、Newton 方向 $h_n=-J_n^{-1}r_n$ が線形化残差を零にするため、Gauss–Newton 方向とも一致します。これに対し $m>p$ などでは一般に $r_n+J_nh=0$ を解けず、Gauss–Newton 法は先に導いた正規方程式で二乗残差を最小化します。

ノイズ下で線形化の逆を直接使う危険を避けるため、[INV5 の二乗ノルム Tikhonov](../INV5/index.md#thm-inv5-tikhonov-minimizer)を毎回の線形化問題へ組み込みます。ここでは罰則の中心を現在点 $x_n$ ではなく**固定した初期点** $x_0$ に置きます。

<a id="def-inv11-irgnm"></a>

<!-- formal-statement-start -->
> **定義（反復的正則化 Gauss–Newton 型更新）**  
> 実 Hilbert 空間 $X,Y$、開集合 $U\subset X$ 上の $C^1$ 写像 $F:U\to Y$、固定した初期点 $x_0\in U$、$\alpha_n>0$ を与える。各 $x_n\in U$ に対して $A_n=F'(x_n)$ とおき、

$$
x_{n+1}=\underset{x\in X}{\operatorname{argmin}}\ 
\left\{\|F(x_n)+A_n(x-x_n)-y^\delta\|_Y^2
+\alpha_n\|x-x_0\|_X^2\right\}
$$

> による更新をここでの**反復的正則化 Gauss–Newton 型更新**という。各線形化問題の最小点は $\alpha_n>0$ のため一意に存在する。ただし次点が $U$ に属すること、反復全体の収束は定義だけから保証されない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-inv11-irgnm -->

**定義の確認**：$F(t)=t$、$x_0=0$、$y^\delta=b$、$\alpha_n=\alpha>0$ とすると、任意の $x_n$ で $F(x_n)+F'(x_n)(x-x_n)=x$ です。目的関数は $(x-b)^2+\alpha x^2$。微分すると $2(x-b)+2\alpha x=0$ なので

$$
x_{n+1}=\frac{b}{1+\alpha}.
$$

二階微分は $2(1+\alpha)>0$ ですから一意の最小点です。$\alpha$ が観測への過度な適合を抑え、$\alpha\downarrow0$ で $b$ へ近づきます。
<!-- definition-example-end -->

一般の Hilbert 空間でも、$z=x-x_0$ を未知量とすれば最小化するのは

$$
\|A_n z-[y^\delta-F(x_n)+A_n(x_n-x_0)]\|_Y^2+\alpha_n\|z\|_X^2
$$

です。[INV5 の正規方程式と一意性](../INV5/index.md#thm-inv5-tikhonov-minimizer)を $A=A_n$、$b=y^\delta-F(x_n)+A_n(x_n-x_0)$ に適用すると

$$
(A_n^*A_n+\alpha_n I)(x_{n+1}-x_0)
=A_n^*\bigl[y^\delta-F(x_n)+A_n(x_n-x_0)\bigr].
$$

各反復の計算可能性はこの式で分かります。ただし $\alpha_n\downarrow0$ とすれば自動的に収束するわけではありません。減衰の速度、初期点、線形化誤差、停止則を同時に扱う必要があります。本講はこの更新の導出までを扱い、一般の大域収束定理は主張しません。

## 6. 演習：残差・更新・停止の役割を再構成する

### Level A：定義と一回の計算を確かめる

<a id="ex-inv11-a01"></a>

### INV11-A01 二乗残差の勾配

- Level: A

$F(t)=t^2$、$\Phi(t)=\frac12(F(t)-3)^2$ とする。$\Phi'(t)$ と $t=2$ での Landweber 更新（$\omega=1/8$）を求めよ。

<!-- solution-start -->
#### 詳細解答

$F'(t)=2t$ です。連鎖律を、外側 $u\mapsto u^2/2$、内側 $u(t)=t^2-3$ に適用すると

$$
\Phi'(t)=u(t)u'(t)=(t^2-3)(2t).
$$

$t=2$ で残差は $4-3=1$、微分は $4$ です。よって更新値は

$$
t_{\mathrm{new}}=2-\frac18(4)(1)=\frac32.
$$

この値では残差は $9/4-3=-3/4$ となり、絶対値は $1$ から $3/4$ に減ります。ただし一回の結果を一般の収束保証と取り違えません。
<!-- solution-end -->

<a id="ex-inv11-a02"></a>

### INV11-A02 接線錐条件を直接評価する

- Level: A

$F(t)=t+t^2/20$ を $V=[-1,1]$ で考える。接線錐条件を満たす $\eta<1/2$ を具体的に求めよ。

<!-- solution-start -->
#### 詳細解答

$F'(x)=1+x/10$ なので、二点の剰余は

$$
F(z)-F(x)-F'(x)(z-x)=\frac{(z-x)^2}{20}.
$$

また

$$
F(z)-F(x)=(z-x)\left(1+\frac{x+z}{20}\right).
$$

$|z-x|\le2$ と $1+(x+z)/20\ge9/10$ から、$z\ne x$ では剰余と観測差の比が

$$
\frac{|z-x|/20}{|1+(x+z)/20|}
\le\frac{2/20}{9/10}=\frac19
$$

以下です。$z=x$ では両辺が零なので、$\eta=1/9<1/2$ を取れます。
<!-- solution-end -->

<a id="ex-inv11-a03"></a>

### INV11-A03 歩幅の条件

- Level: A

ある球で $\|F'(x)\|\le3$、接線錐定数 $\eta=1/5$ とする。$\omega=1/9$ は定理の歩幅条件を満たすか。また停止定数 $\tau=5$ は十分か。

<!-- solution-start -->
#### 詳細解答

$L=3$ に対し $\omega L^2=(1/9)\cdot9=1$ なので歩幅条件は成立します。一方、停止定数の下限は

$$
\frac{2(1+\eta)}{1-2\eta}
=\frac{2(6/5)}{3/5}=4.
$$

$5>4$ なので停止定数も十分です。実際

$$
c_\tau=1-\frac25-\frac{2(6/5)}5
=\frac35-\frac{12}{25}=\frac3{25}>0.
$$
<!-- solution-end -->

<a id="ex-inv11-a04"></a>

### INV11-A04 停止は最初の一回で決まるか

- Level: A

雑音上界 $\delta=0.02$、$\tau=3$ とする。残差列の最初の四つのノルムが $0.24,0.09,0.058,0.04$ だった。停止回数を求め、最後の値も採用する案が不一致原理とどう違うか答えよ。

<!-- solution-start -->
#### 詳細解答

閾値は $\tau\delta=3\cdot0.02=0.06$ です。$0.24>0.06$、$0.09>0.06$、$0.058\le0.06$ だから最初に条件を満たすのは $n=2$ です。$n=3$ の値 $0.04$ はさらに小さいものの、「初めて閾値以下になったら止める」という定義に反します。より小さな残差が復元誤差を小さくする保証もありません。
<!-- solution-end -->

<a id="ex-inv11-a05"></a>

### INV11-A05 残差と未知量の誤差

- Level: A

$F(t)=\varepsilon t$（$0<\varepsilon<1$）、真の解 $t^\dagger=0$、真のデータ $y=0$ とする。候補 $t=1$ の残差を求め、残差から未知量誤差を得る定数の $\varepsilon$ 依存を示せ。

<!-- solution-start -->
#### 詳細解答

観測残差は $|F(1)-0|=\varepsilon$ ですが、未知量誤差は $|1-0|=1$ です。一般の $u,v$ では

$$
|u-v|=\varepsilon^{-1}|F(u)-F(v)|.
$$

従って二点安定性の定数は $K=1/\varepsilon$ と取れます。$\varepsilon\downarrow0$ でこの値が発散するため、「残差が小さい」だけでは一様に小さい未知量誤差を得られません。
<!-- solution-end -->

### Level B：証明と方法の違いを使う

<a id="ex-inv11-b01"></a>

### INV11-B01 線形Landweberの誤差減少を再導出する

- Level: B

$A:X\to Y$ を実 Hilbert 空間間の有界線形作用素、$y=Ax^\dagger$ とする。$0<\omega\|A\|^2\le1$ とし、$x_{n+1}=x_n-\omega A^*(Ax_n-y)$ と更新する。距離平方の減少と残差平方の総和可能性 を示せ。

<!-- solution-start -->
#### 詳細解答

$e_n=x_n-x^\dagger$ なら $Ax_n-y=Ae_n$ です。随伴の定義から

$$
\begin{aligned}
\|e_{n+1}\|^2
&=\|e_n-\omega A^*Ae_n\|^2\\
&=\|e_n\|^2-2\omega\langle Ae_n,Ae_n\rangle
+\omega^2\|A^*Ae_n\|^2\\
&\le\|e_n\|^2-(2\omega-\omega^2\|A\|^2)\|Ae_n\|^2\\
&\le\|e_n\|^2-\omega\|Ae_n\|^2.
\end{aligned}
$$

二行目から三行目には $\|A^*Ae_n\|\le\|A\|\|Ae_n\|$ を使いました。$n=0,\ldots,N-1$ で足すと

$$
\omega\sum_{n=0}^{N-1}\|Ae_n\|^2
\le\|e_0\|^2-\|e_N\|^2\le\|e_0\|^2.
$$

$N\to\infty$ で級数が有限となり、$\|Ax_n-y\|=\|Ae_n\|\to0$ です。$A$ の単射性や下界を仮定していないため、ここでは強い解誤差収束を結論しません。
<!-- solution-end -->

<a id="ex-inv11-b02"></a>

### INV11-B02 有限停止上界を数値で評価する

- Level: B

有限停止定理で $\eta=1/4$、$L=6/5$、$\omega=1/2$、$\tau=6$、$\delta=0.01$、$\|x_0^\delta-x^\dagger\|=1/2$ とする。すべての数値条件を調べ、$n_\delta$ の上界を求めよ。

<!-- solution-start -->
#### 詳細解答

微分上界と歩幅は

$$
\omega L^2=\frac12\frac{36}{25}=\frac{18}{25}<1.
$$

停止定数の下限は $2(5/4)/(1/2)=5$ であり、$\tau=6>5$ です。減少係数は

$$
c_\tau=1-\frac12-\frac{2(5/4)}6
=\frac12-\frac5{12}=\frac1{12}>0.
$$

よって有限停止定理を適用でき、

$$
n_\delta
\le\frac{(1/2)^2}
{(1/2)(1/12)6^2(0.01)^2}
=\frac{1/4}{0.00015}
=\frac{5000}{3}<1667.
$$

整数なので $n_\delta\le1666$ です。これは一般的な最悪の場合の上界であり、実際の反復がこの回数だけ必要という意味ではありません。
<!-- solution-end -->

<a id="ex-inv11-b03"></a>

### INV11-B03 Gauss–Newtonの正規方程式

- Level: B

$J:\mathbb R\to\mathbb R^2$ を $Jh=(h,2h)$、残差を $r=(1,0)$ とする。$\frac12\|r+Jh\|_2^2$ の最小化から Gauss–Newton 方向を計算し、最小性を確認せよ。

<!-- solution-start -->
#### 詳細解答

目的関数は

$$
\psi(h)=\frac12\bigl((1+h)^2+(2h)^2\bigr)
=\frac12(1+2h+5h^2).
$$

微分して $\psi'(h)=1+5h$、$\psi''(h)=5>0$ ですから $h_*=-1/5$ が一意の最小点です。行列表示では $J^\mathsf TJ=1^2+2^2=5$、$J^\mathsf Tr=1$ なので正規方程式 $5h=-1$ と一致します。更新後の線形化残差は $(4/5,-2/5)$ で、$J^\mathsf T(r+Jh_*)=4/5+2(-2/5)=0$ も確認できます。
<!-- solution-end -->

<a id="ex-inv11-b04"></a>

### INV11-B04 正則化中心が違う二つの方法

- Level: B

$F(t)=t$、$y^\delta=b$、$x_0=0$、$\alpha>0$ とする。初期点を固定した [反復的正則化 Gauss–Newton 型更新](#def-inv11-irgnm)と、罰則を $\alpha(x-x_n)^2$ に置き換えた更新をそれぞれ求めよ。後者の更新を $x_n\ne0$ として比較せよ。

<!-- solution-start -->
#### 詳細解答

線形化はどの $x_n$ からでも $F(x_n)+F'(x_n)(x-x_n)=x$ です。初期点中心なら目的関数は $(x-b)^2+\alpha x^2$ で、微分から

$$
x_{n+1}^{\mathrm{fixed}}=\frac b{1+\alpha}.
$$

現在点中心なら $(x-b)^2+\alpha(x-x_n)^2$ を微分して

$$
2(x-b)+2\alpha(x-x_n)=0,\qquad
x_{n+1}^{\mathrm{current}}=\frac{b+\alpha x_n}{1+\alpha}.
$$

差は $\alpha x_n/(1+\alpha)$ です。いずれも正の二次係数 $1+\alpha$ を持つので一意に最小です。前者は固定初期点への罰則、後者は現在点からの移動量への罰則であり、同じ名称で無条件に混同してはいけません。
<!-- solution-end -->

<a id="ex-inv11-b05"></a>

### INV11-B05 小さい特異値方向への雑音の追従

- Level: B

$A=\operatorname{diag}(1,s)$（$0<s<1$）、$x^\dagger=0$、$y^\delta=(0,\delta)$、$x_0=0$、$\omega=1$ とする。Landweber の $k$ 回後の値と残差を求めよ。$s\to0$ のとき回数を増やしすぎる危険を説明せよ。

<!-- solution-start -->
#### 詳細解答

第一成分は初期値と残差が零なので常に零です。第二成分 $a_k$ は

$$
a_{k+1}=a_k-s(sa_k-\delta)=(1-s^2)a_k+s\delta,\qquad a_0=0.
$$

等比和から

$$
a_k=s\delta\sum_{j=0}^{k-1}(1-s^2)^j
=\frac\delta s\bigl(1-(1-s^2)^k\bigr).
$$

残差の第二成分は $sa_k-\delta=-\delta(1-s^2)^k$ です。固定 $s$ で $k\to\infty$ とすると残差は零になりますが、真の解からの距離は $\delta/s$ に近づきます。$s\to0$ でこれは任意に大きくなります。雑音への完全適合は復元精度と同義ではありません。
<!-- solution-end -->

### Level C：非線形反復と停止保証を統合する

<a id="ex-inv11-c01"></a>

### INV11-C01 接線錐条件、Landweber、停止、復元誤差

- Level: C

$X=Y=\mathbb R$、$F(t)=t+t^2/10$、真の解 $t^\dagger=1/2$、$y=F(t^\dagger)$、$\delta=0.01$、$y^\delta=0.53$ とする。$V=[-1,1]$ 内の局所解析を考え、$t_0=0$、$\omega=1/2$、$\tau=6$ とする。ここでは $\delta$ と観測データを固定し、一般の反復記号 $x_n^\delta$ を一次元の $t_n$ と略記する。

(1) 真のデータ、雑音上界、$V$ 上の接線錐定数 $\eta=1/4$ と微分上界 $L=6/5$ を検証せよ。

(2) $t_1,t_2$ と $t_1$ での残差を計算し、最初の二点で停止するか判定せよ。

(3) この設定で停止が有限であることを証明し、停止時に $|t_{n_\delta}-t^\dagger|\le0.0875$ を示せ。

<!-- solution-start -->
#### 詳細解答

**(1)** $y=1/2+(1/2)^2/10=0.525$ です。したがって $|y^\delta-y|=|0.53-0.525|=0.005\le0.01=\delta$。導関数は $F'(t)=1+t/5$ なので、$t\in[-1,1]$ では $4/5\le F'(t)\le6/5$、特に $L=6/5$ です。

二点 $x,z\in[-1,1]$ に対して

$$
F(z)-F(x)-F'(x)(z-x)=\frac{(z-x)^2}{10},
$$

$$
|F(z)-F(x)|
=|z-x|\left|1+\frac{x+z}{10}\right|
\ge\frac45|z-x|.
$$

従って剰余は $|z-x|^2/10\le |z-x|/5\le(1/4)|F(z)-F(x)|$ です。$z=x$ の場合も零同士なので、接線錐定数 $\eta=1/4$ が検証できました。

**(2)** 初期残差は $F(0)-0.53=-0.53$ です。実数では随伴は導関数の乗算と同じなので

$$
t_1=0-\frac12(1)(-0.53)=0.265.
$$

$F(t_1)=0.265+0.265^2/10=0.2720225$、よって

$$
r_1=F(t_1)-y^\delta=-0.2579775.
$$

$F'(t_1)=1+0.265/5=1.053$ より

$$
t_2=0.265-\frac12(1.053)(-0.2579775)
=0.40082515375.
$$

停止閾値は $\tau\delta=0.06$。$|r_0|=0.53$、$|r_1|=0.2579775$ はいずれも閾値より大きいので $n_\delta\ge2$ です。

**(3)** $V=[-1,1]$ 上では接線錐定数 $1/4$ が使えますが、$t^\dagger=1/2$ を中心として $t_0=0$ を内部に含む開球を $V$ 内に取ることはできません（必要な半径は $1/2$ より大きいのに、左端 $0$ までの距離は $1/2$）。そこで適用領域を明示し、その領域で条件を確認し直します。

$W=[-1/4,5/4]$ とおけば、任意の $x,z\in W$ に対して $|z-x|\le3/2$、$|x+z|\le5/2$ であり、

$$
|F(z)-F(x)|\ge\frac34|z-x|,
\qquad
|F(z)-F(x)-F'(x)(z-x)|=\frac{|z-x|^2}{10}.
$$

したがって（$x=z$ も含め）接線錐条件は $\eta=1/5$ で成立します。微分についても $\sup_{t\in W}|F'(t)|=5/4$ です。開球 $B_{2/3}(1/2)=(-1/6,7/6)$ は $W$ に含まれ、初期点 $0$ はこの球内です。そこで [有限停止定理](#thm-inv11-noisy-descent-stop)に $r=2/3$、$\eta=1/5$、$L=5/4$ を代入します。

$$
\omega L^2=\frac12\frac{25}{16}=\frac{25}{32}<1,
\qquad
\frac{2(1+\eta)}{1-2\eta}
=\frac{2(6/5)}{3/5}=4<6=\tau.
$$

よって停止は有限で、停止点もこの球、従って $W$ 内にあります。復元誤差については $u,v\in W$ なら

$$
|F(u)-F(v)|
=|u-v|\left|1+\frac{u+v}{10}\right|
\ge\frac{19}{20}|u-v|
\ge\frac45|u-v|.
$$

ここでは $u+v\ge-1/2$ を使いました。この最後の少し緩い下界でも二点安定性定数 $K=5/4$ が取れます。停止点と真の解に [停止誤差の系](#cor-inv11-stopped-error)を適用すると

$$
|t_{n_\delta}-t^\dagger|
\le\frac54\left(|F(t_{n_\delta})-y^\delta|+|y^\delta-y|\right)
\le\frac54(0.06+0.01)=0.0875.
$$

最初に指定した $V$ 上の接線錐定数だけを形式的に当てはめるのでなく、**初期点を内部に含む球で仮定を再確認**することが核心です。
<!-- solution-end -->

## 7. 次講への接続

ここまでの反復法は、「候補を動かすほど観測に合う」と「動かしすぎると雑音まで説明する」の両方を含みます。次の INV12 では、逆問題の重要な具体例として Radon 変換を導入します。線積分から何が測定されるかを関数空間と Fourier 変換の規約を明示して調べ、INV13 以降の反転・不完全観測へ進みます。
