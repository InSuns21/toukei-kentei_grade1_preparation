# QFT49 応力テンソルの改良・Ward恒等式・接触項と共形保存流

<!-- definition-example-audit: strict -->

[QFT48のスカラー一次場と二点関数](../QFT48/index.md#thm-qft48-primary-two-point)は、共形変換のもとで相関関数がどのような形を許されるかを示しました。しかし、**なぜ量子場の対称性が相関関数の微分方程式になるのか**はまだ説明していません。[QFT2の並進保存則](../QFT2/index.md#thm-qft2-translation)は古典的な場の解の上で成り立ちます。今回はその局所化を経路積分へ持ち込み、場の挿入点で生じるデルタ分布を検算します。

## 1. 舞台と、Euclid作用から生まれるテンソル

舞台は整数 $d\ge3$ の平坦Euclid空間 $\mathbb R^d$。座標 $x=(x^1,\ldots,x^d)$、$|x|^2=\sum_\mu(x^\mu)^2$、$\partial^2=\sum_\mu\partial_\mu^2$ とし、重複する添字は $1,\ldots,d$ で和を取ります。実時間の計量符号は物理系の統一規約 $(-,+,+,+)$ ですが、ここでは正定値の $\delta_{\mu\nu}$ を使い、Minkowskiテンソルを記号だけでWick回転しません。

質量零の実スカラー場について [QFT20のEuclid作用](../QFT20/index.md#def-qft20-euclidean-action) の質量を零にした

$$
S_E[\phi]=\frac12\int_{\mathbb R^d}\partial_\rho\phi\,\partial_\rho\phi\,d^dx,
\qquad \frac{\delta S_E}{\delta\phi}=-\partial^2\phi
$$

を考えます。部分積分の際は変分をコンパクト台に限定します。点での $\phi(x)$ やその積は一般化場なので、以下の古典的な積の式を量子相関関数に使うときは、滑らかな正則化と合成演算子のくりこみを経た分布として解釈します。

局所的な並進を $\delta_\varepsilon\phi(x)=-\varepsilon^\nu(x)\partial_\nu\phi(x)$ と書き、まず $\varepsilon$ は滑らかなコンパクト台のベクトル場とします。一様な並進なら作用は変わりませんが、$\varepsilon$ が場所によって違えば、どこからどこへ運動量が流れたかが作用の一次変分に現れます。

<a id="def-qft49-euclidean-stress"></a>

<!-- formal-statement-start -->
> **定義（Euclid自由スカラー場の応力テンソル）**  
> $d\ge3$、実 $C^2$ 場 $\phi$、密度 $\mathcal L_E=\tfrac12\partial_\rho\phi\,\partial_\rho\phi$ に対し、Euclidの対称応力テンソルを次で定義する。

$$
T_{\mu\nu}
=\partial_\mu\phi\,\partial_\nu\phi
-\delta_{\mu\nu}\mathcal L_E.
$$

> 添字はEuclid計量 $\delta_{\mu\nu}$ で上げ下げする。量子相関関数内では適切に定義した合成演算子を表すものとする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft49-euclidean-stress -->
**定義の確認** $d=4$、$\phi(x)=a x^1$ なら $\partial_\mu\phi=a\delta_{\mu1}$、$\mathcal L_E=a^2/2$ です。従って $T_{11}=a^2/2$、$T_{22}=T_{33}=T_{44}=-a^2/2$、非対角成分は零です。二つの勾配の積を交換できるので $T_{\mu\nu}=T_{\nu\mu}$、各成分は定数だから $\partial_\mu T_{\mu\nu}=0$ です。これは無限全空間の有限作用解ではなく、局所式を試す例です。
<!-- definition-example-end -->

<a id="prop-qft49-stress-divergence"></a>

<!-- formal-statement-start -->
> **命題（Euclid応力テンソルの発散恒等式）**  
> $d\ge3$ の開集合上の $C^3$ 実場 $\phi$ に対して、上の $T_{\mu\nu}$ は

$$
\partial_\mu T_{\mu\nu}
=(\partial^2\phi)\partial_\nu\phi
=-\frac{\delta S_E}{\delta\phi}\partial_\nu\phi
$$

> を満たす。ゆえに自由場方程式 $\partial^2\phi=0$ の古典解上では保存する。またコンパクト台の $\varepsilon$ に対し

$$
\delta_\varepsilon S_E
=-\int_{\mathbb R^d}
(\partial_\mu\varepsilon^\nu)T_{\mu\nu}\,d^dx
$$

> である。
<!-- formal-statement-end -->

### 証明の見取り図

発散では二階微分が二種類現れます。一方は場の方程式、もう一方は $\mathcal L_E$ の微分と相殺します。局所並進の変分でも、密度の移流部分は全微分へ移し、$\partial_\mu\varepsilon^\nu$ の係数だけを取り出します。

<!-- proof-start -->
### 証明

積の微分と二階偏微分の交換から

$$
\begin{aligned}
\partial_\mu T_{\mu\nu}
&=(\partial^2\phi)\partial_\nu\phi
+(\partial_\mu\phi)\partial_\mu\partial_\nu\phi
-\frac12\partial_\nu(\partial_\rho\phi\,\partial_\rho\phi)\\
&=(\partial^2\phi)\partial_\nu\phi
+(\partial_\mu\phi)\partial_\nu\partial_\mu\phi
-(\partial_\rho\phi)\partial_\nu\partial_\rho\phi\\
&=(\partial^2\phi)\partial_\nu\phi.
\end{aligned}
$$

変分については

$$
\begin{aligned}
\delta_\varepsilon\mathcal L_E
&=\partial_\mu\phi\,\partial_\mu(-\varepsilon^\nu\partial_\nu\phi)\\
&=-(\partial_\mu\varepsilon^\nu)\partial_\mu\phi\,\partial_\nu\phi
-\varepsilon^\nu\partial_\nu\mathcal L_E\\
&=-(\partial_\mu\varepsilon^\nu)T_{\mu\nu}
-\partial_\mu(\varepsilon^\mu\mathcal L_E).
\end{aligned}
$$

最後の全微分はコンパクト台の変分で積分すると消えます。$\delta S_E/\delta\phi=-\partial^2\phi$ は一度部分積分して得るので、発散の第二の表示も従います。
<!-- proof-end -->

## 2. 保存したまま、トレースを消す改良

「保存する」と「共形変換の生成子になる」は同じではありません。上のテンソルのトレースは

$$
T_{\mu\mu}
=\left(1-\frac d2\right)(\partial_\rho\phi)^2
$$

で、質量零でも一般には零ではありません。そこで [QFT2の改良項の恒等的保存](../QFT2/index.md#prop-qft2-improvement) に対応する、発散が恒等的に零の二階微分項を加えます。

<a id="def-qft49-improved-stress"></a>

<!-- formal-statement-start -->
> **定義（Euclidの改良応力テンソル）**  
> $d\ge3$、$C^3$ 実場 $\phi$、[Euclid自由スカラー場の応力テンソル](#def-qft49-euclidean-stress) $T_{\mu\nu}$、定数 $\xi\in\mathbb R$ に対し

$$
\Theta_{\mu\nu}
=T_{\mu\nu}
+\xi(\delta_{\mu\nu}\partial^2-\partial_\mu\partial_\nu)\phi^2
$$

> を改良応力テンソルという。特に $\xi_d=(d-2)/(4(d-1))$ を共形改良係数とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft49-improved-stress -->
**定義の確認** $d=4$ なら $\xi_4=1/6$。$\phi=a x^1$ では $\partial^2\phi^2=2a^2$、$\partial_\mu\partial_\nu\phi^2=2a^2\delta_{\mu1}\delta_{\nu1}$ です。従って改良項は $\xi_4(2a^2\delta_{\mu\nu}-2a^2\delta_{\mu1}\delta_{\nu1})$ で、$\Theta_{11}=a^2/2$、$\Theta_{22}=\Theta_{33}=\Theta_{44}=-a^2/6$。トレースは $a^2/2-3a^2/6=0$、全成分が定数で発散も零です。共形改良係数が単なるラベルではなくトレースを変えることを直接確かめました。
<!-- definition-example-end -->

<a id="thm-qft49-improvement-trace"></a>

<!-- formal-statement-start -->
> **定理（改良テンソルの保存とトレース）**  
> $d\ge3$、$\phi\in C^4$ とし、[改良テンソルの定義](#def-qft49-improved-stress)で $\xi=\xi_d=(d-2)/(4(d-1))$ を用いる。このとき

$$
\partial_\mu\Theta_{\mu\nu}
=(\partial^2\phi)\partial_\nu\phi,
\qquad
\Theta_{\mu\mu}
=\frac{d-2}{2}\phi\,\partial^2\phi.
$$

> 特に $\partial^2\phi=0$ の古典解上で、$\Theta$ は対称・保存・トレース零となる。これは一般の相互作用する量子場理論でトレース異常が存在しないと主張するものではない。
<!-- formal-statement-end -->

### 証明の見取り図

改良項の発散では $\partial_\nu\partial^2\phi^2$ が両側に現れて打ち消し合います。トレースでは $\partial^2\phi^2=2(\partial\phi)^2+2\phi\partial^2\phi$ を使い、$\xi_d$ の値で勾配二乗の係数を零にします。

<!-- proof-start -->
### 証明

滑らかな場では偏微分が交換するため

$$
\partial_\mu(\delta_{\mu\nu}\partial^2-\partial_\mu\partial_\nu)\phi^2
=\partial_\nu\partial^2\phi^2-\partial^2\partial_\nu\phi^2=0.
$$

よって発散式は [Euclid応力テンソルの発散恒等式](#prop-qft49-stress-divergence) から従います。トレースを全添字について取ると

$$
\begin{aligned}
\Theta_{\mu\mu}
&=\left(1-\frac d2\right)(\partial_\rho\phi)^2
+\xi_d(d-1)\partial^2(\phi^2)\\
&=\left(1-\frac d2+2\xi_d(d-1)\right)(\partial_\rho\phi)^2
+2\xi_d(d-1)\phi\partial^2\phi.
\end{aligned}
$$

$2\xi_d(d-1)=(d-2)/2$ を代入すると第一係数は $1-d/2+(d-2)/2=0$。第二係数だけが残り、表示式を得ます。
<!-- proof-end -->

**境界と量子補正への注意。** 上の改良項は局所発散を変えませんが、境界のある領域で積分電荷を比較すると境界項が残ることがあります。また合成場 $\phi^2$ の同一点極限は正則化・引き算を要します。以下では、並進対称な正則化の下でWard恒等式を保つくりこみを選び、接触項の形を明示します。

## 3. 保存則の右辺がデルタ分布になる理由

古典解なら $\partial_\mu T_{\mu\nu}=0$ でした。ところが相関関数 $\langle T_{\mu\nu}(x)\phi(y)\rangle$ では、積分する場の配置は古典解だけではありません。さらに、局所並進をすると観測点 $y$ の場も変化します。この変化は $x=y$ に集中するため、保存則の右辺に**接触項**が生じます。

<a id="def-qft49-contact-term"></a>

<!-- formal-statement-start -->
> **定義（Ward恒等式の接触項）**  
> 相異なる挿入点 $x_1,\ldots,x_n$ における局所場の積 $F=\prod_{i=1}^n\phi(x_i)$ を考える。相関関数における分布恒等式の右辺に現れる $\delta^{(d)}(x-x_i)$ やその導関数のように、挿入点 $x=x_i$ に支持がある項を接触項という。ここで

$$
\int d^dx\,f(x)\delta^{(d)}(x-a)=f(a)
$$

> は任意のコンパクト台の滑らかな試験関数 $f$ に対する分布の定義である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft49-contact-term -->
**定義の確認** $d=3$、$a\in\mathbb R^3$、$f(x)=\exp(-|x|^2)$ にコンパクト台の切断関数を掛け、$a$ の近傍では切断関数を $1$ とすると、$\int f(x)\delta^{(3)}(x-a)d^3x=e^{-|a|^2}$。一方 $f$ の支持が $a$ を含まなければ積分は零です。従って接触項は「$x\ne a$ では零だが、積分すると消えない」項です。
<!-- definition-example-end -->

<a id="thm-qft49-translation-ward"></a>

<!-- formal-statement-start -->
> **定理（局所並進Ward恒等式）**  
> $d\ge3$ の並進不変な質量零自由Euclid Gaussian場を考え、$F=\prod_{i=1}^n\phi(x_i)$ の点 $x_i$ は互いに異なるとする。局所並進に関する測度・正則化が対称性を保ち、[Euclid応力テンソル](#def-qft49-euclidean-stress) $T_{\mu\nu}$ の合成演算子を対応するWard恒等式が成り立つよう定義したとする。このとき分布として

$$
\partial_\mu\langle T_{\mu\nu}(x)F\rangle
=-\sum_{i=1}^n\delta^{(d)}(x-x_i)
\partial_{x_i^\nu}\langle F\rangle.
$$

> $T$ を共形改良した $\Theta$ に取り替えても同じ等式が成立する。これは挿入点の外側での保存則と、挿入点に集中する接触項を同時に表す。複合演算子やスピンを持つ挿入では追加の局所変換項が必要になることがある。
<!-- formal-statement-end -->

### 証明の見取り図

場の積分変数を微小な局所並進で置き換え、作用の変分と観測量の変分を等置します。作用側には $\partial_\mu\varepsilon^\nu T_{\mu\nu}$ が、観測量側には各点の $\varepsilon^\nu(x_i)\partial_{x_i^\nu}$ が現れます。試験関数 $\varepsilon$ の任意性から分布恒等式を得ます。

<!-- proof-start -->
### 証明

まずUV cutoffや有限格子などで積分を正則化し、局所変換のJacobianが規格化後の期待値に異常を残さず、連続極限でWard恒等式が存在すると仮定します。$Z^{-1}\int D\phi\,F[\phi]e^{-S_E[\phi]}$ に対する積分変数の変更より、一次の変分は

$$
0=\langle\delta_\varepsilon F\rangle
-\langle F\,\delta_\varepsilon S_E\rangle.
$$

各挿入点では $\delta_\varepsilon\phi(x_i)=-\varepsilon^\nu(x_i)\partial_{x_i^\nu}\phi(x_i)$ なので

$$
\langle\delta_\varepsilon F\rangle
=-\sum_i\varepsilon^\nu(x_i)
\partial_{x_i^\nu}\langle F\rangle.
$$

[応力テンソルの局所変分式](#prop-qft49-stress-divergence)を作用に代入し、$\varepsilon$ の台の外からの境界項がないことを用いると

$$
0=-\sum_i\varepsilon^\nu(x_i)\partial_{x_i^\nu}\langle F\rangle
+\int d^dx\,(\partial_\mu\varepsilon^\nu(x))
\langle T_{\mu\nu}(x)F\rangle.
$$

第二項を分布の意味で部分積分すると

$$
\int d^dx\,\varepsilon^\nu(x)
\left[
\partial_\mu\langle T_{\mu\nu}(x)F\rangle
+\sum_i\delta^{(d)}(x-x_i)
\partial_{x_i^\nu}\langle F\rangle
\right]=0.
$$

任意のコンパクト台の $\varepsilon$ に対して成立するので角括弧が零分布です。[改良テンソルの発散](#thm-qft49-improvement-trace)は元と等しいため、$\Theta$ にも同じ結果が従います。
<!-- proof-end -->

**検算：二点関数。** [QFT48の質量零二点核](../QFT48/index.md#thm-qft48-massless-kernel)を $G(y,z)=C_d|y-z|^{2-d}$ とすると

$$
\partial_{y^\nu}G=-(d-2)C_d\frac{(y-z)_\nu}{|y-z|^d},
\qquad
\partial_{z^\nu}G=-\partial_{y^\nu}G.
$$

両挿入点を含む試験関数 $\varepsilon^\nu(x)=a^\nu$（作用させる場所の近傍で一定、遠方で滑らかに零へ切る）で積分すれば、接触項の和は $-a^\nu(\partial_{y^\nu}+\partial_{z^\nu})G=0$。全体の並進不変性と一致します。接触項を一つずつ零にしてよいわけではありません。

## 4. トレースから拡大縮小・共形Ward恒等式へ

テンソルにベクトル場 $\varepsilon^\nu$ を掛けた流 $J_\mu=\Theta_{\mu\nu}\varepsilon^\nu$ を作ると、局所的には

$$
\partial_\mu J_\mu
=\varepsilon^\nu\partial_\mu\Theta_{\mu\nu}
+\Theta_{\mu\nu}\partial_\mu\varepsilon^\nu.
$$

$\Theta$ が対称なので、第二項は $\partial_\mu\varepsilon_\nu+\partial_\nu\varepsilon_\mu$ の対称部分だけに依存します。[QFT48の共形写像](../QFT48/index.md#def-qft48-conformal-map)の無限小形を次で表します。

<a id="def-qft49-conformal-killing"></a>

<!-- formal-statement-start -->
> **定義（平坦Euclid空間の共形Killingベクトル場）**  
> $d\ge3$ の開集合上の $C^1$ ベクトル場 $\varepsilon$ が

$$
\partial_\mu\varepsilon_\nu+\partial_\nu\varepsilon_\mu
=2\sigma(x)\delta_{\mu\nu},
\qquad
\sigma(x)=\frac1d\partial_\rho\varepsilon^\rho
$$

> を満たすとき、共形Killingベクトル場という。$\sigma$ は無限小の局所尺度変化率である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft49-conformal-killing -->
**定義の確認** 拡大縮小 $\varepsilon^\nu=x^\nu$ では $\partial_\mu\varepsilon_\nu=\delta_{\mu\nu}$、発散は $d$ なので $\sigma=1$。両辺は $2\delta_{\mu\nu}$ で一致します。定ベクトル $a^\nu$ による並進では微分も $\sigma$ も零です。さらに $b$ を定ベクトルとして $\varepsilon^\nu=2(b\cdot x)x^\nu-|x|^2b^\nu$ と置くと、$\partial_\mu\varepsilon_\nu+\partial_\nu\varepsilon_\mu=4(b\cdot x)\delta_{\mu\nu}$、$\sigma=2b\cdot x$ です。三つとも定義の全ての等式を確かめました。
<!-- definition-example-end -->

<a id="thm-qft49-conformal-current"></a>

<!-- formal-statement-start -->
> **定理（共形保存流とスカラー一次場のWard恒等式）**  
> $d\ge3$ の質量零自由Euclidスカラー場で、$\Theta_{\mu\nu}$ を[共形改良テンソル](#def-qft49-improved-stress)、$\varepsilon$ を[共形Killingベクトル場](#def-qft49-conformal-killing)とする。古典的な自由場方程式が成り立つ領域では $J_\mu=\Theta_{\mu\nu}\varepsilon^\nu$ は保存する。
>
> さらに平坦空間の共形対称真空とWard恒等式を保つ正則化の下、相異なる点の自由基本スカラー場 $F=\prod_i\phi(x_i)$ の相関関数 $G=\langle F\rangle$ に対して、挿入点・接触項を含めた流の分布恒等式は

$$
\partial_\mu\langle J_\mu(x)F\rangle
=-\sum_i\delta^{(d)}(x-x_i)
\left[
\varepsilon^\nu(x_i)\partial_{x_i^\nu}
+\Delta_\phi\sigma(x_i)
\right]G,
\qquad
\Delta_\phi=\frac{d-2}{2}.
$$

> 特に境界からの流束が零なら、右辺を積分して大域的共形Ward恒等式を得る。

$$
\sum_i\left[\varepsilon(x_i)\cdot\partial_{x_i}
+\Delta_\phi\sigma(x_i)\right]G=0.
$$

> 局所恒等式には改良テンソルのトレースから来る接触項が含まれる。
<!-- formal-statement-end -->

### 証明の見取り図

共形Killing方程式は $\Theta_{\mu\nu}\partial_\mu\varepsilon^\nu=\sigma\Theta_{\mu\mu}$ を与えます。改良テンソルのトレースは自由場方程式に比例するため、挿入点以外では消えます。挿入点ではSchwinger–Dysonの積分変数変換により、移動による微分項とスケーリング次元に比例するデルタ項が残ります。

<!-- proof-start -->
### 証明

$\Theta_{\mu\nu}=\Theta_{\nu\mu}$ なので、[共形Killing方程式](#def-qft49-conformal-killing)を使い

$$
\Theta_{\mu\nu}\partial_\mu\varepsilon^\nu
=\frac12\Theta_{\mu\nu}
(\partial_\mu\varepsilon_\nu+\partial_\nu\varepsilon_\mu)
=\sigma\Theta_{\mu\mu}.
$$

ゆえに

$$
\partial_\mu J_\mu
=\varepsilon^\nu\partial_\mu\Theta_{\mu\nu}
+\sigma\Theta_{\mu\mu}.
$$

[改良テンソルの定理](#thm-qft49-improvement-trace)の二つの右辺は $\partial^2\phi$ に比例するので古典解上で零です。

次に正則化した自由Gaussian積分を考えます。[QFT19の有限次元Gaussian積分](../QFT19/index.md#thm-qft19-gaussian)で使った積分変数の部分積分を各格子変数に適用し、連続極限が存在する場合に移るか、形式的に $\int D\phi\,\delta(F e^{-S_E})/\delta\phi=0$ を積分すると、局所的なSchwinger–Dyson恒等式

$$
\left\langle\frac{\delta S_E}{\delta\phi(x)}F\right\rangle
=\sum_i\delta^{(d)}(x-x_i)
\left\langle\prod_{j\ne i}\phi(x_j)\right\rangle
$$

を得ます。トレースの古典式は

$$
\Theta_{\mu\mu}
=\Delta_\phi\phi\,\partial^2\phi
=-\Delta_\phi\phi\,\frac{\delta S_E}{\delta\phi}.
$$

正規順序化で同一点の自己接触を差し引き、$F$ の各 $\phi(x_i)$ に関する汎関数微分だけを残すと

$$
\langle\Theta_{\mu\mu}(x)F\rangle
=-\Delta_\phi\sum_i\delta^{(d)}(x-x_i)G.
$$

この式は正則化・合成演算子の定義に依存する接触項の主張であり、相異なる点での点wise積の等式ではありません。上の式と [局所並進Ward恒等式](#thm-qft49-translation-ward)を $\partial_\mu\langle J_\mu F\rangle$ に代入すると、$\delta(x-x_i)$ が掛かった滑らかな $\varepsilon,\sigma$ はそれぞれ $\varepsilon(x_i),\sigma(x_i)$ へ評価され、表示した恒等式を得ます。

最後に、全空間での積分を流束零の正則化・境界条件により正当化できるとき、左辺の積分は零です。従って右辺の挿入点での和も零になります。
<!-- proof-end -->

**直接照合：二点関数の尺度則。** [QFT48の自由質量零核](../QFT48/index.md#thm-qft48-massless-kernel)による $G(x,y)=C_d|x-y|^{-2\Delta_\phi}$ に対し、拡大縮小 $\varepsilon(x)=x$ の場合

$$
\begin{aligned}
(x\cdot\partial_x+y\cdot\partial_y)G
&=(x-y)\cdot\partial_{x-y}G\\
&=-2\Delta_\phi G,
\end{aligned}
$$

であり、$\sigma=1$ による $+2\Delta_\phi G$ と相殺します。特殊共形変換 $\varepsilon(x)=2(b\cdot x)x-b|x|^2$ では

$$
[\varepsilon(x)-\varepsilon(y)]\cdot(x-y)
=(b\cdot(x+y))|x-y|^2
$$

を展開して確かめられるため、移動項は $-2\Delta_\phi(b\cdot(x+y))G$。$\sigma(x)+\sigma(y)=2b\cdot(x+y)$ による項と再び相殺します。

## 5. どこまでが対称性だけから従うか

- **接触項を落とすと間違う。** $\partial_\mu\langle\Theta_{\mu\nu}(x)F\rangle=0$ は挿入点を避けた領域では正しい一方、分布として全空間で零とは限りません。
- **質量項を加えると共形性は破れる。** $S_E$ に $m^2\phi^2/2$ を加えると、同じ改良係数でも方程式 $\partial^2\phi=m^2\phi$ を代入したトレースに $m^2\phi^2$ が残ります。固定質量の [QFT48の尺度則の破れ](../QFT48/index.md#thm-qft48-massless-kernel)とも整合します。
- **一般の複合演算子には固有の次元が必要。** 今回の $\Delta_\phi=(d-2)/2$ は自由基本場の値です。相互作用理論では異常次元、演算子の混合、局所カウンタータームがあり得ます。スピンを持つ場の共形変換には回転生成子も現れます。
- **トレース異常と曲がった背景は別問題。** 古典的にトレース零でも、一般の量子理論のくりこみや曲率の下でトレース異常が出ることがあります。二次元の中心電荷や $T(z)T(w)$ の特異項は後続章で導きます。今回の平坦自由場の局所恒等式だけで一般の異常消失を証明していません。
- **無限大からの流束は仮定。** 特に $\varepsilon\sim x$ や $\varepsilon\sim x^2$ はコンパクト台ではありません。大域的Ward恒等式へ移る際は、挿入点を小球で避け、遠方の境界流束が消えることを相関関数ごとに確認します。

## 演習：保存則を分布の等式まで運ぶ

### 演習 QFT49-A1：テンソルの成分

- Level: A
- 問題: $d=3$、$\phi(x)=a x^1+b x^2$ とする。$T_{11},T_{22},T_{33},T_{12}$ と $\partial_\mu T_{\mu\nu}$ を求めよ。

<!-- solution-start -->
**詳細解答。** $\partial\phi=(a,b,0)$、$(\partial\phi)^2=a^2+b^2$ なので

$$
T_{11}=\frac{a^2-b^2}{2},\quad
T_{22}=\frac{b^2-a^2}{2},\quad
T_{33}=-\frac{a^2+b^2}{2},\quad T_{12}=ab.
$$

各成分は定数だから発散は零です。また $\partial^2\phi=0$ を [発散恒等式](#prop-qft49-stress-divergence)へ代入しても全ての $\nu$ について零になります。
<!-- solution-end -->

### 演習 QFT49-A2：改良項の発散

- Level: A
- 問題: $C^4$ 関数 $h$ について $I_{\mu\nu}=\delta_{\mu\nu}\partial^2h-\partial_\mu\partial_\nu h$ とする。$\partial_\mu I_{\mu\nu}$ と $I_{\mu\mu}$ を計算せよ。

<!-- solution-start -->
**詳細解答。** $\delta_{\mu\nu}$ は定数なので

$$
\partial_\mu I_{\mu\nu}
=\partial_\nu\partial^2h-\partial^2\partial_\nu h=0.
$$

二階偏微分は滑らかさの仮定で交換できます。一方 $\delta_{\mu\mu}=d$ より

$$
I_{\mu\mu}=d\partial^2h-\partial^2h=(d-1)\partial^2h.
$$

発散が零でもトレースは一般に零ではなく、改良に使える理由がここにあります。
<!-- solution-end -->

### 演習 QFT49-A3：四次元の共形改良係数

- Level: A
- 問題: $d=4$ で $\Theta_{\mu\nu}=T_{\mu\nu}+\xi(\delta_{\mu\nu}\partial^2-\partial_\mu\partial_\nu)\phi^2$ とする。$\partial^2\phi=0$ の解上でトレースを零にする $\xi$ を求めよ。

<!-- solution-start -->
**詳細解答。** $\partial^2\phi^2=2(\partial\phi)^2+2\phi\partial^2\phi=2(\partial\phi)^2$ です。従って

$$
\Theta_{\mu\mu}
=(1-4/2)(\partial\phi)^2+3\xi\,2(\partial\phi)^2
=(-1+6\xi)(\partial\phi)^2.
$$

全ての調和場について零にするには $-1+6\xi=0$、すなわち $\xi=1/6$。これは一般式 $(d-2)/(4(d-1))$ に $d=4$ を代入した値と一致します。
<!-- solution-end -->

### 演習 QFT49-A4：接触項の試験関数積分

- Level: A
- 問題: $H_\nu(x)=-\delta^{(d)}(x-y)A_\nu-\delta^{(d)}(x-z)B_\nu$ とする。コンパクト台の $f$ との積分を求め、$f$ が両点の近傍で一定 $1$、かつ $B_\nu=-A_\nu$ のときの値を求めよ。

<!-- solution-start -->
**詳細解答。** [接触項の定義](#def-qft49-contact-term)で使ったデルタ分布の作用から

$$
\int d^dx\,f(x)H_\nu(x)=-f(y)A_\nu-f(z)B_\nu.
$$

$f(y)=f(z)=1$ かつ $B_\nu=-A_\nu$ なら値は $-A_\nu+A_\nu=0$ です。一つずつの接触項が零なのではなく、二つの総和が相殺しています。
<!-- solution-end -->

### 演習 QFT49-A5：共形Killing方程式

- Level: A
- 問題: $\varepsilon^\nu(x)=\omega^\nu{}_\rho x^\rho$、$\omega_{\mu\nu}=-\omega_{\nu\mu}$ が共形Killing方程式を満たすことを検算せよ。また $\varepsilon=x$ の場合と比較せよ。

<!-- solution-start -->
**詳細解答。** $\partial_\mu\varepsilon_\nu=\omega_{\nu\mu}$、$\partial_\nu\varepsilon_\mu=\omega_{\mu\nu}$ なので和は零です。発散 $\partial_\rho\varepsilon^\rho=\omega^\rho{}_\rho=0$ より $\sigma=0$、両辺が零で一致します。これは回転です。$\varepsilon=x$ なら微分の対称部分は $2\delta_{\mu\nu}$、$\sigma=1$ で局所的な拡大縮小になります。
<!-- solution-end -->

### 演習 QFT49-B1：局所並進での作用変分を再導出する

- Level: B
- 問題: $S_E=\frac12\int(\partial\phi)^2$、$\delta\phi=-\varepsilon^\nu\partial_\nu\phi$ を用いて、$\delta S_E=-\int(\partial_\mu\varepsilon^\nu)T_{\mu\nu}$ を導け。$\varepsilon$ が定数のときなぜ零かを述べよ。

<!-- solution-start -->
**詳細解答。** 変分を微分の内へ入れ、

$$
\begin{aligned}
\delta S_E
&=-\int d^dx\,\partial_\mu\phi
\big[(\partial_\mu\varepsilon^\nu)\partial_\nu\phi
+\varepsilon^\nu\partial_\mu\partial_\nu\phi\big]\\
&=-\int d^dx\,(\partial_\mu\varepsilon^\nu)\partial_\mu\phi\partial_\nu\phi
-\int d^dx\,\varepsilon^\nu\partial_\nu\mathcal L_E.
\end{aligned}
$$

後者を部分積分すると $\int(\partial_\nu\varepsilon^\nu)\mathcal L_E$ となり、合わせて $-\int(\partial_\mu\varepsilon^\nu)(\partial_\mu\phi\partial_\nu\phi-\delta_{\mu\nu}\mathcal L_E)$ です。$\varepsilon$ が定数ならその微分は零で、境界流束がない限り作用は一様並進で不変です。
<!-- solution-end -->

### 演習 QFT49-B2：二点関数の局所Wardと大域Ward

- Level: B
- 問題: $G(y,z)=C_d|y-z|^{2-d}$ とし、翻訳Ward恒等式の右辺を明示せよ。$y\ne z$ で、$x$ が両挿入点と異なるときの値と、両点を囲む積分の値を比較せよ。

<!-- solution-start -->
**詳細解答。** $r=y-z$ と置くと

$$
\partial_{y^\nu}G=(2-d)C_dr_\nu|r|^{-d},
\qquad
\partial_{z^\nu}G=-(2-d)C_dr_\nu|r|^{-d}.
$$

従って [局所並進Ward恒等式](#thm-qft49-translation-ward) の右辺は

$$
-(2-d)C_dr_\nu|r|^{-d}
[\delta^{(d)}(x-y)-\delta^{(d)}(x-z)].
$$

$x\ne y,z$ では零ですが、$y$ または $z$ の近傍を試験関数で切り出すと非零です。両点を含む定数試験関数で積分すれば括弧の積分は $1-1=0$ となり、全体の並進不変性を表します。
<!-- solution-end -->

### 演習 QFT49-B3：特殊共形変換と二点相関

- Level: B
- 問題: $\varepsilon(x)=2(b\cdot x)x-|x|^2b$ について、$\sigma(x)$ を求め、$\varepsilon(x)-\varepsilon(y)$ と $x-y$ の内積を整理せよ。$G(x,y)=C|x-y|^{-2\Delta}$ が一次場の大域Ward恒等式を満たすことを確認せよ。

<!-- solution-start -->
**詳細解答。** 成分微分から

$$
\partial_\mu\varepsilon^\mu
=2d(b\cdot x)+2(b\cdot x)-2(b\cdot x)
=2d(b\cdot x),
$$

よって $\sigma(x)=2b\cdot x$。$r=x-y$ とすると

$$
\begin{aligned}
[\varepsilon(x)-\varepsilon(y)]\cdot r
&=2[(b\cdot x)x-(b\cdot y)y]\cdot r
-(|x|^2-|y|^2)b\cdot r\\
&=(b\cdot(x+y))|r|^2.
\end{aligned}
$$

最後の等号は $x=y+r$ と置いて展開すれば、$2(b\cdot y)|r|^2+(b\cdot r)|r|^2$ になります。$\partial_rG=-2\Delta\,rG/|r|^2$ なので、並進微分部分は $-2\Delta(b\cdot(x+y))G$。次元項は $\Delta(\sigma(x)+\sigma(y))G=2\Delta(b\cdot(x+y))G$ で相殺します。
<!-- solution-end -->

### 演習 QFT49-B4：質量項によるトレース破れ

- Level: B
- 問題: $S_m=\frac12\int[(\partial\phi)^2+m^2\phi^2]$ で、$m>0$、$\xi=\xi_d$ の改良項を同じように加える。自由場方程式を使ってオンシェル・トレースを求めよ。固定した $m$ の理論が拡大縮小不変ではない理由を説明せよ。

<!-- solution-start -->
**詳細解答。** 質量項を含むEuclidテンソルのトレースは

$$
T_{\mu\mu}=(1-d/2)(\partial\phi)^2-\frac d2m^2\phi^2.
$$

改良項のトレースは $\xi_d(d-1)\partial^2\phi^2$。一般恒等式 $\partial^2\phi^2=2(\partial\phi)^2+2\phi\partial^2\phi$ を代入し、勾配二乗が消える $\xi_d$ を使うと

$$
\Theta_{\mu\mu}
=\frac{d-2}{2}\phi\partial^2\phi-\frac d2m^2\phi^2.
$$

場の方程式は $-\partial^2\phi+m^2\phi=0$ なので $\partial^2\phi=m^2\phi$。従って $\Theta_{\mu\mu}=((d-2)/2-d/2)m^2\phi^2=-m^2\phi^2$。これは一般には零でなく、固定質量が $m^{-1}$ の長さ尺度を導入するためです。
<!-- solution-end -->

### 演習 QFT49-C1：自由場二点関数と保存・トレース・共形Wardを統合する

- Level: C
- 問題: $d=4$ の質量零自由Euclid実スカラー場で $G(y,z)=1/(4\pi^2|y-z|^2)$、$y\ne z$ とする。
  1. $\xi_4$、$\Theta_{\mu\mu}$、$\partial_\mu\Theta_{\mu\nu}$ をオフシェルで計算せよ。
  2. $\partial_\mu\langle\Theta_{\mu\nu}(x)\phi(y)\phi(z)\rangle$ の接触項を具体的な $y-z$ の式にせよ。
  3. 拡大縮小の大域Ward恒等式を確認せよ。
  4. これらが一般の相互作用CFTのトレース異常の消失を意味しない理由を述べよ。

<!-- solution-start -->
**詳細解答。** (1) [改良テンソルの定理](#thm-qft49-improvement-trace)に $d=4$ を代入すると

$$
\xi_4=\frac{2}{4\cdot3}=\frac16,\qquad
\Theta_{\mu\mu}=\phi\partial^2\phi,\qquad
\partial_\mu\Theta_{\mu\nu}=(\partial^2\phi)\partial_\nu\phi.
$$

従って自由方程式 $\partial^2\phi=0$ の古典解ではトレース・発散とも零です。ただし相関関数内では接触項が残ります。

(2) $r=y-z$ とおくと、微分を一回実行して

$$
\partial_{y^\nu}G
=-\frac{2r_\nu}{4\pi^2|r|^4}
=-\frac{r_\nu}{2\pi^2|r|^4},
\quad
\partial_{z^\nu}G
=+\frac{r_\nu}{2\pi^2|r|^4}.
$$

従って [局所並進Ward恒等式](#thm-qft49-translation-ward)の右辺は

$$
\frac{r_\nu}{2\pi^2|r|^4}
[\delta^{(4)}(x-y)-\delta^{(4)}(x-z)].
$$

$x\ne y,z$ では零ですが、$y,z$ それぞれに集中した非零の分布です。

(3) $G$ は $r$ だけに依存するので

$$
(y\cdot\partial_y+z\cdot\partial_z)G
=r\cdot\partial_rG=-2G.
$$

自由場次元は $\Delta_\phi=(4-2)/2=1$。二挿入の次元和は $2$ なので、$\big(y\cdot\partial_y+z\cdot\partial_z+2\big)G=0$ が成り立ちます。

(4) 今回の計算は平坦空間の自由Gaussian場と対称性を保つ合成演算子の定義を前提にしています。一般の相互作用理論では尺度依存する結合・異常次元・くりこみ、曲がった背景では曲率に関係するトレース異常が起こり得ます。二点関数でWard恒等式を確かめただけで、それらの項の不在や全相関関数の共形不変性は結論できません。
<!-- solution-end -->

## この章で確認したこと

- Euclid応力テンソルは局所並進の作用変分から現れ、古典的には発散が場の方程式に比例する。
- 共形改良項は発散を変えず、$d\ge3$ の質量零自由場ではオンシェルでトレースを零にする。
- 量子相関関数内の保存則は、挿入点にデルタ分布の接触項を持つ局所Ward恒等式になる。
- 対称・保存・トレース零の改良テンソルと共形Killing方程式から、基本スカラー場の拡大縮小・特殊共形Ward恒等式が得られる。
- 境界流束、合成演算子、量子異常の条件を確認せず、一般の相互作用理論へ公式を無条件に拡張しない。
