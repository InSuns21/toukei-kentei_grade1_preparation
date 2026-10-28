# QFT2 場の対称性・Noether流・エネルギー運動量テンソル

<!-- definition-example-audit: strict -->

[QFT1の場の作用](../QFT1/index.md#def-qft1-action)を停留させると、場の運動方程式が得られました。また自由実スカラー場では、[エネルギー保存](../QFT1/index.md#thm-qft1-energy)を密度の直接微分から確かめました。では、**なぜエネルギーが保存する形になっていたのか**。内部の二成分を回転させる場合には、何が保存されるのでしょうか。

この講義では、作用を変えない連続変換から局所的な保存流を組み立てる方法を導きます。出発点はすべて**古典場**です。量子化後の粒子数演算子、Ward恒等式や量子異常はまだ使いません。

## 1. 規約と「変換しても作用が同じ」の意味

時空は平坦な $3+1$ 次元Minkowski空間、計量は $\eta_{\mu\nu}=\operatorname{diag}(1,-1,-1,-1)$、単位系は $c=\hbar=1$ とします。ギリシア添字は $0,1,2,3$、空間添字 $i,j$ は $1,2,3$、同じ上下の添字は縮約します。導関数の上下も $\eta$ で上げ下げし、$\partial^0=\partial_t$、$\partial^i=-\partial_i$ です。

まず実数値の場 $\phi_a(x)$（$a=1,\ldots,N$）を考え、各成分を $C^2$、密度を一階微分までの $C^2$ 関数とします。コンパクトな時空領域で必要な積分・微分交換が成り立つ場合だけ作用を扱います。境界項を捨てるときには、変換パラメータをコンパクトな台に局所化するか、明示的な境界条件を使います。

変換には二種類あります。

- 時空座標 $x$ を固定したまま、同じ点の場の成分を混ぜる場合。
- **時空並進**：座標にラベルを付け直す受動的記述とは区別し、固定した点で $\phi'(x)=\phi(x-a)$ という新しい配置を作る。

これらに対する作用の変化が零とは、必ずしも**密度が点ごとに厳密に不変**という意味ではありません。密度の変化が全微分 $\partial_\mu K^\mu$ なら、積分後には境界項になります。この違いを保存流の式に残しておきます。

## 2. 内部対称性を二成分場から見る

一成分の実場 $\phi$ に $\phi\mapsto-\phi$ を行うと自由密度は不変ですが、その二つの変換の間を連続に動かす小さなパラメータはありません。一方、同じ質量の二つの実場を用意すると、成分平面上で微小に回転できます。この**連続性**によって変換をパラメータで微分し、流を得られます。

<a id="def-qft2-internal-symmetry"></a>

<!-- formal-statement-start -->
> **定義（場の内部連続対称性と変換の生成子）**  
> $\phi_a\in C^2(\Omega;\mathbb R)$、$\mathcal L(x,\phi_a,\partial_\mu\phi_a)$ を実数値の一階微分密度とする。座標を固定した一パラメータ変換 $\phi_a^\varepsilon(x)$ が $\phi_a^0=\phi_a$ を満たし、$\varepsilon=0$ で微分可能であるとき、

$$
\Delta\phi_a(x)
=\left.\frac{\partial\phi_a^\varepsilon(x)}
{\partial\varepsilon}\right|_{\varepsilon=0}
$$

> を変換の無限小生成子とする。固定した $x$ で生じる密度の一次変化が、ある局所的な四元ベクトル $K^\mu$ によって

$$
\left.\frac{d}{d\varepsilon}
\mathcal L(\phi^\varepsilon,\partial\phi^\varepsilon)
\right|_{\varepsilon=0}
=\partial_\mu K^\mu
$$

> と書けるとき、この変換を（境界項までの）内部連続対称性という。$K^\mu=0$ は密度が一次で厳密に不変な特別の場合である。
<!-- formal-statement-end -->

### 例：二成分の回転で条件を直接確かめる

実場 $\phi_1,\phi_2$ の質量を同じ $m\ge0$ とし、

$$
\mathcal L_2=\frac12\sum_{a=1}^2
\left(\partial_\mu\phi_a\partial^\mu\phi_a
-m^2\phi_a^2\right)
$$

とします。定数角 $\varepsilon$ に対して

$$
\begin{pmatrix}\phi_1^\varepsilon\\\phi_2^\varepsilon\end{pmatrix}
=\begin{pmatrix}
\cos\varepsilon&-\sin\varepsilon\\
\sin\varepsilon&\cos\varepsilon
\end{pmatrix}
\begin{pmatrix}\phi_1\\\phi_2\end{pmatrix}
$$

と回します。行列の転置と自身の積が単位行列なので、場の二乗和は

$$
(\phi_1^\varepsilon)^2+(\phi_2^\varepsilon)^2
=\phi_1^2+\phi_2^2.
$$

$\varepsilon$ が時空に依存しないため $\partial_\mu\phi_a^\varepsilon$ も同じ行列で回転し、縮約した微分の二乗和も不変です。よって $\mathcal L_2^\varepsilon=\mathcal L_2$ で $K^\mu=0$ を選べます。また行列を角度で微分して

$$
\Delta\phi_1=-\phi_2,\qquad
\Delta\phi_2=\phi_1
$$

を得ます。変換の滑らかさ、座標固定、密度不変、生成子の四条件を具体的に確認しました。

## 3. 作用の変分からNoether流を導く

各場の一階微分に共役な係数を

$$
\pi_a^\mu
=\frac{\partial\mathcal L}
{\partial(\partial_\mu\phi_a)}
$$

と記します。ここでの $\pi_a^\mu$ は四方向の導関数に対する係数であり、後に出る正準運動量の時間成分 $\pi_a^0$ だけとは区別します。また場のEuler–Lagrange式の左辺を

$$
\mathcal E_a
=\frac{\partial\mathcal L}{\partial\phi_a}
-\partial_\mu\pi_a^\mu
$$

と書きます。[QFT1の場のEuler–Lagrange方程式](../QFT1/index.md#thm-qft1-field-el)の各成分版で、運動方程式の成立は $\mathcal E_a=0$ です。

対称性の情報は、全微分 $K^\mu$ を差し引いた四元ベクトルとしてまとめます。

<a id="def-qft2-noether-current"></a>

<!-- formal-statement-start -->
> **定義（Noether流）**  
> 一階微分密度 $\mathcal L$ と[内部連続対称性](#def-qft2-internal-symmetry)の生成子 $\Delta\phi_a$、境界項 $K^\mu$ が与えられたとき、Noether流を

$$
j^\mu=\sum_{a=1}^N\pi_a^\mu\Delta\phi_a-K^\mu,
\qquad
\pi_a^\mu
=\frac{\partial\mathcal L}
{\partial(\partial_\mu\phi_a)}
$$

> と定める。$K^\mu$ を別の発散零の項だけ変更した場合には $j^\mu$ 自体も変わるため、流の表現は一意とは限らない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft2-noether-current -->
### 例：質量零実場の定数シフト

**定義の確認**：生成子、密度の一次変化、境界項、流の各要素を直接求めます。

一成分の質量零実場で $\mathcal L=(\partial\phi)^2/2$、$\phi^\varepsilon(x)=\phi(x)+\varepsilon$ を取ります。定数 $\varepsilon$ について $\Delta\phi=1$、$\partial_\mu\phi^\varepsilon=\partial_\mu\phi$ なので $\delta\mathcal L=0$、従って $K^\mu=0$ です。$\pi^\mu=\partial^\mu\phi$ を[Noether流の定義](#def-qft2-noether-current)に代入すると

$$
j^\mu=(\partial^\mu\phi)\cdot1-0=\partial^\mu\phi.
$$

その発散が $\Box\phi$ であり、質量零の運動方程式の下で零になることも確認できます。$m>0$ の質量項を戻すとシフトで密度が変化し、この定数シフトは対称性でなくなります。
<!-- definition-example-end -->

<a id="thm-qft2-noether"></a>

<!-- formal-statement-start -->
> **定理（場のNoether恒等式と保存則）**  
> 開領域 $\Omega\subset\mathbb R^{1,3}$ 上の実場 $\phi_a\in C^2$ と $C^2$ の一階微分密度に対し、固定座標での無限小変換 $\Delta\phi_a$ が滑らかで、密度の一次変化が $\partial_\mu K^\mu$ に等しいとする。場の導関数と変換の微分が交換できるとき、[Noether流](#def-qft2-noether-current)は恒等式

$$
\partial_\mu j^\mu
=-\sum_{a=1}^N\mathcal E_a\,\Delta\phi_a
$$

> を満たす。したがって全成分が場のEuler–Lagrange方程式 $\mathcal E_a=0$ を満たす解の上では

$$
\partial_\mu j^\mu=0
$$

> が成立する。前者は運動方程式を課す前（オフシェル）、後者は解の上（オンシェル）の式である。
<!-- formal-statement-end -->

### 証明の見取り図

密度を変分すると、場そのものの変化と一階微分の変化に分かれます。後者の積の微分を一回戻せば、運動方程式の左辺と四元流の発散に整理されます。

<!-- proof-start -->
### 証明

定義にある固定座標の変換に連鎖律を適用し、$\partial_\mu\Delta\phi_a=\Delta(\partial_\mu\phi_a)$ を使うと、

$$
\begin{aligned}
\delta\mathcal L
&=\sum_a\left[
\frac{\partial\mathcal L}{\partial\phi_a}\Delta\phi_a
+\pi_a^\mu\partial_\mu(\Delta\phi_a)
\right]\\
&=\sum_a\left[
\left(\frac{\partial\mathcal L}{\partial\phi_a}
-\partial_\mu\pi_a^\mu\right)\Delta\phi_a
+\partial_\mu(\pi_a^\mu\Delta\phi_a)
\right]\\
&=\sum_a\mathcal E_a\Delta\phi_a
+\partial_\mu\left(\sum_a\pi_a^\mu\Delta\phi_a\right).
\end{aligned}
$$

第二行は、積の微分

$$
\partial_\mu(\pi_a^\mu\Delta\phi_a)
=(\partial_\mu\pi_a^\mu)\Delta\phi_a
+\pi_a^\mu\partial_\mu\Delta\phi_a
$$

を代入したものです。一方、対称性の仮定は $\delta\mathcal L=\partial_\mu K^\mu$ です。二式を等置して全微分を左辺へ移すと

$$
\partial_\mu
\left(\sum_a\pi_a^\mu\Delta\phi_a-K^\mu\right)
=-\sum_a\mathcal E_a\Delta\phi_a.
$$

括弧はまさに定義した $j^\mu$ であり、運動方程式を使うと右辺が零になります。
<!-- proof-end -->

式の右辺が零になるためには、**単に対称性が存在するだけでなく場の方程式を満たすこと**が必要です。逆に方程式を満たさない任意の試行配置でも、発散がどうずれるかを最初の恒等式が教えます。

## 4. 複素スカラー場で流を実際に計算する

前節の回転を、今度は各成分の運動方程式まで含めて調べます。二つの実場を一つの複素数にまとめると、成分平面の回転は位相を掛ける操作になります。

$$
\psi=\frac{\phi_1+i\phi_2}{\sqrt2},
\qquad
\mathcal L_2
=\partial_\mu\psi^*\partial^\mu\psi-m^2\psi^*\psi.
$$

$\sqrt2$ は実二成分の密度にあった $1/2$ と一致させるための規格化です。回転は $\psi\mapsto e^{i\varepsilon}\psi$、生成子は $\Delta\psi=i\psi$、$\Delta\psi^*=-i\psi^*$ です。これは大域的な $U(1)$ 位相変換であり、局所ゲージ変換とはまだ異なります。

<a id="prop-qft2-u1"></a>

<!-- formal-statement-start -->
> **命題（複素スカラー場のU(1)保存流）**  
> $m\ge0$ とし、$\phi_1,\phi_2\in C^2(\Omega;\mathbb R)$ がそれぞれ $(\Box+m^2)\phi_a=0$ を満たすとする。上の密度 $\mathcal L_2$ と回転 $\psi\mapsto e^{i\varepsilon}\psi$ に対応するNoether流は

$$
j^\mu
=\phi_1\partial^\mu\phi_2-\phi_2\partial^\mu\phi_1
=-i\bigl(\psi^*\partial^\mu\psi
-\psi\partial^\mu\psi^*\bigr)
$$

> であり、$\partial_\mu j^\mu=0$ を満たす。符号は回転の向き $\Delta\phi_1=-\phi_2,\ \Delta\phi_2=\phi_1$ に対応する。
<!-- formal-statement-end -->

### 証明の見取り図

まず各実場の $\pi_a^\mu=\partial^\mu\phi_a$ に生成子を代入します。発散すると、一階微分の交差項が打ち消され、残った二階微分に二つのKlein–Gordon方程式を使えます。

<!-- proof-start -->
### 証明

密度を各場の一階微分で微分すると $\pi_1^\mu=\partial^\mu\phi_1$、$\pi_2^\mu=\partial^\mu\phi_2$ です。回転は密度を厳密に保つので $K^\mu=0$ と選べ、[Noether流の定義](#def-qft2-noether-current)から

$$
\begin{aligned}
j^\mu
&=(\partial^\mu\phi_1)(-\phi_2)
+(\partial^\mu\phi_2)\phi_1\\
&=\phi_1\partial^\mu\phi_2-\phi_2\partial^\mu\phi_1.
\end{aligned}
$$

複素表示では

$$
\begin{aligned}
\psi^*\partial^\mu\psi-\psi\partial^\mu\psi^*
&=\frac12\bigl[
(\phi_1-i\phi_2)(\partial^\mu\phi_1+i\partial^\mu\phi_2)\\
&\hspace{2.4em}-(\phi_1+i\phi_2)(\partial^\mu\phi_1-i\partial^\mu\phi_2)\bigr]\\
&=i(\phi_1\partial^\mu\phi_2-\phi_2\partial^\mu\phi_1).
\end{aligned}
$$

最後に積の微分を各項へ行うと

$$
\begin{aligned}
\partial_\mu j^\mu
&=(\partial_\mu\phi_1)(\partial^\mu\phi_2)
+\phi_1\Box\phi_2\\
&\quad-(\partial_\mu\phi_2)(\partial^\mu\phi_1)
-\phi_2\Box\phi_1\\
&=\phi_1(-m^2\phi_2)-\phi_2(-m^2\phi_1)=0.
\end{aligned}
$$
<!-- proof-end -->

<!-- definition-example-start: def-qft2-internal-symmetry -->
### 例：回転する二成分平面波

**定義の確認**：場の正則性、回転による密度不変性、生成子と運動方程式を検査します。

条件を数値に頼らず一つずつ検証します。$1+1$ 次元で $A>0$、$\omega>0$、$\omega^2=k^2+m^2$、$\theta=\omega t-kx$ と置き、

$$
\phi_1=A\cos\theta,\qquad
\phi_2=A\sin\theta
$$

を選びます。どちらも実数値 $C^\infty$ 場で、二階微分によって $(\Box+m^2)\phi_a=(-\omega^2+k^2+m^2)\phi_a=0$ となります。回転で成分二乗和 $A^2$ が不変なのも直接確認できます。

流の時間成分と空間成分は

$$
\begin{aligned}
j^0&=\phi_1\partial_t\phi_2-\phi_2\partial_t\phi_1
=A^2\omega(\cos^2\theta+\sin^2\theta)=A^2\omega,\\
j^1&=-\phi_1\partial_x\phi_2+\phi_2\partial_x\phi_1
=A^2k.
\end{aligned}
$$

$\partial_\mu j^\mu=0$ は両成分が定数であることからも確認できます。ただし、この平面波を空間全体に置けば積分電荷は発散します。電荷を有限にするには、波束の減衰または有限の周期箱などを別に指定しなければなりません。
<!-- definition-example-end -->

## 5. 局所保存式と保存電荷

「流の発散が零」は、時刻ごとに空間積分した量がいつも有限かつ一定だという主張より弱いものです。有限領域なら流出入が残り、無限領域なら積分の収束と遠方のフラックスが問題になります。

<a id="def-qft2-charge"></a>

<!-- formal-statement-start -->
> **定義（保存電荷）**  
> 時間区間 $I$ と空間領域 $D\subset\mathbb R^3$ 上の $C^1$ 四元流 $j^\mu$ について、$j^0(t,\cdot)$ が $D$ で可積分なら

$$
Q_D(t)=\int_D j^0(t,\boldsymbol x)\,d^3x
$$

> を領域 $D$ の電荷と呼ぶ。$j^\mu$ が局所保存式 $\partial_\mu j^\mu=0$ を満たす場合でも、$Q_D$ の時間的保存には境界を通る空間流束が零であるなどの条件が必要である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft2-charge -->
### 例：周期箱の回転波

**定義の確認**：時間成分の可積分性と、時間変化を決める端点流束の両方を調べます。

一辺 $L$ の $1$ 次元周期箱で、前節の $k=2\pi n/L$（$n\in\mathbb Z$）を取ります。両場は $x=0,L$ で一致し、$j^0=A^2\omega$ は可積分なので

$$
Q_{[0,L]}(t)=\int_0^L A^2\omega\,dx
=LA^2\omega<\infty.
$$

両端の $j^1$ は同じ $A^2k$ で流出入が相殺されます。**局所式、積分の有限性、境界条件**の三つを別々に確認して初めて保存電荷の例になります。
<!-- definition-example-end -->

滑らかな有界領域 $D$、外向き法線 $\boldsymbol n$ に対して、時間微分と積分を交換できれば、[Gauss--Ostrogradskyの発散定理](../../../幾何系/VC/VC4/index.md#thm-vc4-gauss-divergence)を使用して

$$
\begin{aligned}
\frac{dQ_D}{dt}
&=\int_D\partial_t j^0\,d^3x
=-\int_D\sum_{i=1}^3\partial_i j^i\,d^3x\\
&=-\int_{\partial D}\boldsymbol j\cdot\boldsymbol n\,dS.
\end{aligned}
$$

よって孤立した系なら総電荷は一定です。反対に境界から流れ出たなら、局所保存式が正しくても領域内の電荷は減ります。

## 6. 並進対称性からエネルギー運動量へ

今度は二成分回転ではなく、場の配置全体を四方向へ少しずらします。一様な時空では密度の形は変わりませんが、固定した点での値は変わります。その結果、時間並進の流はエネルギー、空間並進の流は運動量を組み立てます。

ここでは一般の実場 $\phi_a$ と、時空座標 $x$ に**明示的には依存しない**一階微分密度 $\mathcal L(\phi,\partial\phi)$ を取ります。「明示的」とは、$\phi(x)$ を固定しても密度の係数に $x$ が現れるという意味です。

<a id="def-qft2-stress"></a>

<!-- formal-statement-start -->
> **定義（正準エネルギー運動量テンソル）**  
> $N$ 成分実場 $\phi_a$ と、座標に明示的に依存しない微分可能な密度 $\mathcal L(\phi,\partial\phi)$ に対し、正準エネルギー運動量テンソルを

$$
T^\mu{}_\nu
=\sum_{a=1}^N\pi_a^\mu\partial_\nu\phi_a
-\delta^\mu{}_\nu\mathcal L,
\qquad
T^{\mu\nu}=\eta^{\nu\rho}T^\mu{}_\rho
$$

> と定義する。第一添字が流れの方向、第二添字が並進の方向に対応する。一般の場では $T^{\mu\nu}$ が対称になるとは限らない。
<!-- formal-statement-end -->

<a id="thm-qft2-translation"></a>

<!-- formal-statement-start -->
> **定理（並進対称性とエネルギー運動量保存）**  
> $\phi_a\in C^2(\Omega)$、$\mathcal L\in C^2$ とし、密度は $x$ に明示的に依存しないとする。能動的並進 $\phi_a'(x)=\phi_a(x-a)$ に対するNoether流は、定数の並進パラメータ $a^\nu$ を用いて $j^\mu=-a^\nu T^\mu{}_\nu$ と書ける。また

$$
\partial_\mu T^\mu{}_\nu
=-\sum_a\mathcal E_a\,\partial_\nu\phi_a
$$

> が成り立つ。従って $\mathcal E_a=0$ となる解では全ての $\nu=0,1,2,3$ について

$$
\partial_\mu T^{\mu\nu}=0
$$

> である。
<!-- formal-statement-end -->

### 証明の見取り図

固定点での並進の生成子が $-\partial_\nu\phi$ となるため、密度の変化も $-a^\nu\partial_\nu\mathcal L$ です。これを全微分の形にし、Noether流へ代入すると $T^\mu{}_\nu$ が出ます。発散の恒等式は添字をすべて残して直接検算します。

<!-- proof-start -->
### 証明

定数 $a^\nu$ の一次までTaylor展開すると、座標を固定した場の変化は

$$
\delta\phi_a=-a^\nu\partial_\nu\phi_a.
$$

密度に明示的座標依存がないので連鎖律から

$$
\delta\mathcal L
=-a^\nu\partial_\nu\mathcal L
=\partial_\mu(-a^\nu\delta^\mu{}_\nu\mathcal L).
$$

従って $K^\mu=-a^\nu\delta^\mu{}_\nu\mathcal L$ を選べます。[Noether流の定義](#def-qft2-noether-current)に $\delta\phi_a$ を代入すると

$$
\begin{aligned}
j^\mu
&=-a^\nu\sum_a\pi_a^\mu\partial_\nu\phi_a
+a^\nu\delta^\mu{}_\nu\mathcal L\\
&=-a^\nu T^\mu{}_\nu.
\end{aligned}
$$

保存式の符号を独立にも確かめます。$T^\mu{}_\nu$ を微分し、積の微分で展開すると

$$
\begin{aligned}
\partial_\mu T^\mu{}_\nu
&=\sum_a\bigl[
(\partial_\mu\pi_a^\mu)\partial_\nu\phi_a
+\pi_a^\mu\partial_\mu\partial_\nu\phi_a
\bigr]-\partial_\nu\mathcal L,\\
\partial_\nu\mathcal L
&=\sum_a\left[
\frac{\partial\mathcal L}{\partial\phi_a}\partial_\nu\phi_a
+\pi_a^\rho\partial_\nu\partial_\rho\phi_a
\right].
\end{aligned}
$$

$C^2$ 場の混合偏微分が交換するので二階微分の項は差し引き零です。残りは

$$
\partial_\mu T^\mu{}_\nu
=\sum_a\left(
\partial_\mu\pi_a^\mu
-\frac{\partial\mathcal L}{\partial\phi_a}\right)
\partial_\nu\phi_a
=-\sum_a\mathcal E_a\partial_\nu\phi_a.
$$

運動方程式を満たせば右辺は零で、定数計量で第二添字を上げても零です。
<!-- proof-end -->

### 6.1 自由実スカラー場の成分を計算する

[QFT1の自由密度](../QFT1/index.md#def-qft1-klein-gordon)と同じ

$$
\mathcal L_{\mathrm{free}}
=\frac12(\partial_t\phi)^2
-\frac12|\nabla\phi|^2-\frac12m^2\phi^2
$$

について $\pi^\mu=\partial^\mu\phi$ だから、

$$
T^{\mu\nu}
=\partial^\mu\phi\,\partial^\nu\phi
-\eta^{\mu\nu}\mathcal L_{\mathrm{free}}.
$$

ここではたまたま対称です。時間・空間成分を符号まで展開すると

$$
\begin{aligned}
T^{00}
&=(\partial_t\phi)^2-\mathcal L_{\mathrm{free}}
=\frac12[(\partial_t\phi)^2+|\nabla\phi|^2+m^2\phi^2],\\
T^{0i}=T^{i0}
&=(\partial_t\phi)(\partial^i\phi)
=-(\partial_t\phi)(\partial_i\phi),\\
T^{ij}
&=(\partial_i\phi)(\partial_j\phi)+\delta^{ij}\mathcal L_{\mathrm{free}}.
\end{aligned}
$$

第一式は[QFT1のエネルギー密度](../QFT1/index.md#def-qft1-energy)と完全に一致します。第二式がエネルギー流束密度です。$T^{0i}$ は運動量の $i$ 成分の密度、$T^{i0}$ はエネルギーが空間 $i$ 方向へ移動する流束に対応します。この自由実場では両者が等しい一方、一般の正準テンソルでは必ずしも等しくありません。

<!-- definition-example-start: def-qft2-stress -->
### 例：右向きの質量零波

**定義の確認**：場から $\pi^\mu$ と密度を求め、テンソルの定義に戻って各成分を計算します。

$1+1$ 次元で $m=0$、$f\in C^2(\mathbb R)$、$\phi(t,x)=f(x-t)$ とします。$\phi_t=-f'(x-t)$、$\phi_x=f'(x-t)$ なので、[$\Box\phi=0$ というKlein–Gordon方程式](../QFT1/index.md#def-qft1-klein-gordon)が直接成立します。この波の密度は $\mathcal L=0$ で、

$$
T^{00}=f'(x-t)^2,\qquad
T^{01}=T^{10}=f'(x-t)^2.
$$

エネルギーが正の $x$ 方向へ運ばれるという符号を確認できました。さらに $f\in C^3$ とすると

$$
\partial_tT^{00}+\partial_xT^{10}
=-2f'f''+2f'f''=0
$$

が点ごとに成立します。$f'$ がコンパクトな台を持てば全エネルギーも有限です。単に見かけ上右へ動く図形だと述べるだけでなく、**方程式・密度・保存式**の三条件を確認した例です。
<!-- definition-example-end -->

### 6.2 全エネルギー・運動量と境界

適切な可積分性の下で固定時刻の量を

$$
P^\nu_D(t)=\int_D T^{0\nu}(t,\boldsymbol x)\,d^3x
$$

と取れば、$P^0_D$ は領域内のエネルギー、$P^i_D$ は空間運動量です。局所保存式と[発散定理](../../../幾何系/VC/VC4/index.md#thm-vc4-gauss-divergence)より

$$
\frac{dP^\nu_D}{dt}
=-\int_{\partial D}T^{i\nu}n_i\,dS.
$$

$D$ が無限空間なら、$R\to\infty$ での各流束の消滅と積分交換が追加条件です。周期箱では向かい合う面の流束が相殺されます。時間並進・空間並進の両方が密度の対称性であっても、**領域だけを切り取れば流出入でその領域の量は変化し得ます**。

## 7. 改良項を足しても局所保存は変わらない

流やテンソルは必ずしも一意ではありません。全微分の項を足しても発散が同じなら、局所保存則は同じ情報を表します。ただし境界電荷やテンソルの対称性・トレースがどうなるかは改めて確認する必要があります。

<a id="def-qft2-improvement"></a>

<!-- formal-statement-start -->
> **定義（改良エネルギー運動量テンソル）**  
> 平坦時空の $C^2$ テンソル $T^{\mu\nu}$ と、$C^3$ のLorentzスカラー関数 $F(x)$、定数 $\xi\in\mathbb R$ に対し

$$
\widetilde T^{\mu\nu}
=T^{\mu\nu}
+\xi\left(\eta^{\mu\nu}\Box-\partial^\mu\partial^\nu\right)F
$$

> を（この形の）改良エネルギー運動量テンソルという。ここで $F$ は例として $\phi^2$ を選べる。導関数の交換が成立する正則性を仮定する。
<!-- formal-statement-end -->

<a id="prop-qft2-improvement"></a>

<!-- formal-statement-start -->
> **命題（改良項の恒等的保存）**  
> 前定義の正則性と一定のMinkowski計量のもとで

$$
\partial_\mu
\left[\left(\eta^{\mu\nu}\Box-\partial^\mu\partial^\nu\right)F\right]=0.
$$

> したがって次の式が、場の運動方程式を使わず成立する。

$$
\partial_\mu\widetilde T^{\mu\nu}
=\partial_\mu T^{\mu\nu}.
$$

> 改良による空間積分値が元と一致するかは境界条件に依存する。
<!-- formal-statement-end -->

### 証明の見取り図

第一項の発散は $\partial^\nu\Box F$、第二項の発散は $\Box\partial^\nu F$ です。平坦な時空で微分を交換できるので、差が零になります。

<!-- proof-start -->
### 証明

$\partial_\mu\eta^{\mu\nu}=0$ と $\partial_\mu\partial^\mu=\Box$ により

$$
\begin{aligned}
\partial_\mu(\eta^{\mu\nu}\Box F)
&=\eta^{\mu\nu}\partial_\mu\Box F
=\partial^\nu\Box F,\\
\partial_\mu(\partial^\mu\partial^\nu F)
&=\Box\partial^\nu F
=\partial^\nu\Box F.
\end{aligned}
$$

二式を引くと零です。これは[並進保存則](#thm-qft2-translation)とは異なり、$\mathcal E_a=0$ を一度も使わない**恒等式**です。
<!-- proof-end -->

<!-- definition-example-start: def-qft2-improvement -->
### 例：質量零場のトレースを調整する

**定義の確認**：改良項に $F=\phi^2$ を代入し、そのトレースと発散が定義どおりの性質を持つことを確認します。

自由実スカラー場で $m=0$、$F=\phi^2$、$\xi=1/6$ と取ります。四次元で計量を縮約すると $\eta_{\mu\nu}\eta^{\mu\nu}=4$、$\eta_{\mu\nu}\partial^\mu\partial^\nu=\Box$ なので改良項のトレースは $3\xi\Box\phi^2$ です。積の微分から

$$
\Box\phi^2
=2\partial_\mu\phi\partial^\mu\phi+2\phi\Box\phi.
$$

一方、正準テンソルのトレースは $T^\mu{}_\mu=-(\partial\phi)^2$ です。$\Box\phi=0$ となる解の上で

$$
\widetilde T^\mu{}_\mu
=-(\partial\phi)^2+\frac12(2(\partial\phi)^2)=0.
$$

**トレース零はオンシェルの結論**であり、改良項の発散零がオフシェルで成立することとは別です。$m>0$ に同じ式を機械的に適用すると質量項が残り、一般にはトレースが零になりません。
<!-- definition-example-end -->

## 8. 対称性を壊せば何が壊れるか

質量が等しい二成分場に、外から固定した実定数 $h$ を与え、

$$
\mathcal L_h=\mathcal L_2+h\phi_1
$$

と変更します。$h$ は変分しません。質量項や運動項は回転で不変ですが、外部源の項は無限小回転で $\delta(h\phi_1)=-h\phi_2$ となります。定数の $h$ でも**内部回転対称性は破れます**。

[$j^\mu$ の式](#prop-qft2-u1)は同じままですが、Euler–Lagrange方程式は

$$
(\Box+m^2)\phi_1=h,\qquad
(\Box+m^2)\phi_2=0
$$

になるため

$$
\partial_\mu j^\mu
=\phi_1\Box\phi_2-\phi_2\Box\phi_1
=-h\phi_2.
$$

一般に零ではありません。外部源が各成分を区別することが、元の保存則の証明にあった「密度変化は全微分」という仮定を壊しました。一方、$h$ が時空に依存しない限り、**並進対称性は残る**ので、変更された密度について定義し直したエネルギー運動量テンソルは保存されます。異なる対称性に対する保存則をまとめて失ったと判断してはいけません。

## 9. 演習：流・テンソル・境界を再構成する

### 演習 QFT2-A1：内部回転の微小形

$1+1$ 次元、実場二成分 $\phi_1,\phi_2\in C^2$ と同じ質量 $m\ge0$ を取り、密度を

$$
\mathcal L=\frac12\sum_{a=1}^2
(\partial_\mu\phi_a\partial^\mu\phi_a-m^2\phi_a^2)
$$

とする。定数角 $\varepsilon$ で $(\phi_1,\phi_2)$ を反時計回りに回転したとき、生成子 $\Delta\phi_a$ を求め、密度の一次変化が零であることを各項の微分から確認せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

回転行列を $\varepsilon=0$ で微分すると $\Delta\phi_1=-\phi_2$、$\Delta\phi_2=\phi_1$ です。場の値の二乗和の一次変化は

$$
\delta(\phi_1^2+\phi_2^2)
=2\phi_1(-\phi_2)+2\phi_2\phi_1=0.
$$

パラメータが定数なので $\partial_\mu\Delta\phi_1=-\partial_\mu\phi_2$、$\partial_\mu\Delta\phi_2=\partial_\mu\phi_1$ です。従って運動項の一次変化も

$$
2\partial_\mu\phi_1(-\partial^\mu\phi_2)
+2\partial_\mu\phi_2\partial^\mu\phi_1=0.
$$

両項が個別に零なので $\delta\mathcal L=0$、$K^\mu=0$ とできます。
<!-- solution-end -->

### 演習 QFT2-A2：電流の符号

$1+1$ 次元で $\phi_1=A\cos(\omega t-kx)$、$\phi_2=A\sin(\omega t-kx)$（実定数 $A,\omega,k$）とする。回転の生成子は $\Delta\phi_1=-\phi_2,\ \Delta\phi_2=\phi_1$ とする。$j^0,j^1$ を計算し、$\omega^2=k^2+m^2$ なら各場がKlein–Gordon方程式を満たすことも確認せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$\theta=\omega t-kx$ と置くと

$$
\begin{array}{ll}
\partial_t\phi_1=-A\omega\sin\theta,&
\partial_t\phi_2=A\omega\cos\theta,\\
\partial_x\phi_1=Ak\sin\theta,&
\partial_x\phi_2=-Ak\cos\theta.
\end{array}
$$

[$j^\mu$ の式](#prop-qft2-u1)で $\partial^1=-\partial_x$ に注意すると

$$
j^0=A^2\omega(\cos^2\theta+\sin^2\theta)=A^2\omega,
\qquad
j^1=A^2k.
$$

$\Box\phi_a=(-\omega^2+k^2)\phi_a$ なので、質量殻条件の下では $(\Box+m^2)\phi_a=0$ です。流の符号を $j^1=-A^2k$ としてしまうと、上添字を上げる符号を忘れています。
<!-- solution-end -->

### 演習 QFT2-A3：エネルギー流の向き

$1+1$ 次元の質量零自由実場 $\phi(t,x)=f(x-t)$ に対して、$f\in C^3$ とする。$T^{00}$、$T^{10}$ と $\partial_tT^{00}+\partial_xT^{10}$ を求めよ。また $f'$ の台がコンパクトならエネルギーが有限であることを示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$u=x-t$ と置くと $\phi_t=-f'(u)$、$\phi_x=f'(u)$、$\phi_{tt}=f''(u)$、$\phi_{xx}=f''(u)$ なので $\Box\phi=0$ です。自由場の $\mathcal L=(\phi_t^2-\phi_x^2)/2=0$ から

$$
T^{00}=\phi_t^2=f'(u)^2,\qquad
T^{10}=-(\phi_x)(\phi_t)=f'(u)^2.
$$

両式を微分すると

$$
\partial_tT^{00}=-2f'f'',\qquad
\partial_xT^{10}=2f'f'',
$$

で和は零です。$f'$ がコンパクトな台を持つ連続関数なら、その二乗は有界かつコンパクトな台を持つので空間積分は有限です。
<!-- solution-end -->

### 演習 QFT2-A4：改良項の発散

平坦な $3+1$ 次元時空で $F\in C^3$ とし、$I^{\mu\nu}=(\eta^{\mu\nu}\Box-\partial^\mu\partial^\nu)F$ とする。場の方程式は使わず $\partial_\mu I^{\mu\nu}=0$ を示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

計量が定数なので

$$
\partial_\mu I^{\mu\nu}
=\eta^{\mu\nu}\partial_\mu\Box F
-\partial_\mu\partial^\mu\partial^\nu F
=\partial^\nu\Box F-\Box\partial^\nu F.
$$

$F\in C^3$ のため三階偏微分の順序を交換でき、二項は等しいので差は零です。$F$ が解であることや $\Box F=0$ は必要ありません。
<!-- solution-end -->

### 演習 QFT2-B1：位置依存の回転角を使うNoetherの導出

二成分自由実場 $\phi_1,\phi_2$ の密度 $\mathcal L_2$ に対し、コンパクトな台を持つ滑らかな関数 $\alpha(x)$ を用いて $\delta\phi_1=-\alpha\phi_2,\ \delta\phi_2=\alpha\phi_1$ とする。$\delta\mathcal L_2=(\partial_\mu\alpha)j^\mu$ を直接示し、オンシェルで $\partial_\mu j^\mu=0$ が従う理由を、作用の変分と部分積分から説明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

局所角では導関数に $\partial_\mu\alpha$ の項が現れます。

$$
\begin{aligned}
\partial_\mu\delta\phi_1
&=-(\partial_\mu\alpha)\phi_2-\alpha\partial_\mu\phi_2,\\
\partial_\mu\delta\phi_2
&=(\partial_\mu\alpha)\phi_1+\alpha\partial_\mu\phi_1.
\end{aligned}
$$

密度の一次変化を展開すると

$$
\begin{aligned}
\delta\mathcal L_2
&=\partial^\mu\phi_1\,\partial_\mu\delta\phi_1
+\partial^\mu\phi_2\,\partial_\mu\delta\phi_2
-m^2(\phi_1\delta\phi_1+\phi_2\delta\phi_2)\\
&=\alpha[-\partial^\mu\phi_1\partial_\mu\phi_2
+\partial^\mu\phi_2\partial_\mu\phi_1
+m^2\phi_1\phi_2-m^2\phi_2\phi_1]\\
&\quad+(\partial_\mu\alpha)
[-\phi_2\partial^\mu\phi_1+\phi_1\partial^\mu\phi_2]\\
&=(\partial_\mu\alpha)j^\mu.
\end{aligned}
$$

局所変換は一般には対称変換でありませんが、オンシェルでコンパクト台の任意の場の変分を取れば [QFT1の場のEuler–Lagrange方程式](../QFT1/index.md#thm-qft1-field-el)により $\delta S=0$ です。その一方

$$
\delta S=\int_\Omega(\partial_\mu\alpha)j^\mu\,d^4x
=-\int_\Omega\alpha\,\partial_\mu j^\mu\,d^4x.
$$

$\alpha$ の台が内部にあるため境界項が消え、任意の $\alpha$ に対する積分が零なら $\partial_\mu j^\mu=0$ です。これは局所角を**対称性だと仮定した**のではなく、定数角の対称性から流を特定する計算法です。
<!-- solution-end -->

### 演習 QFT2-B2：一般のポテンシャルと並進保存

$1+1$ 次元で実場 $\phi\in C^2$、$V\in C^2(\mathbb R)$ とし、$\mathcal L=\frac12\partial_\mu\phi\partial^\mu\phi-V(\phi)$ とする。Euler–Lagrange方程式、$T^\mu{}_\nu$、$\partial_\mu T^\mu{}_\nu$ の順で求め、解の上で保存することを示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$\partial\mathcal L/\partial\phi=-V'(\phi)$、$\pi^\mu=\partial^\mu\phi$ なので

$$
\mathcal E=-V'(\phi)-\Box\phi
$$

です。停留条件は $\Box\phi+V'(\phi)=0$ となります。[正準テンソル](#def-qft2-stress)は

$$
T^\mu{}_\nu
=\partial^\mu\phi\,\partial_\nu\phi
-\delta^\mu{}_\nu
\left(\frac12\partial_\rho\phi\partial^\rho\phi-V(\phi)\right).
$$

第一項を微分して

$$
\begin{aligned}
\partial_\mu T^\mu{}_\nu
&=(\Box\phi)\partial_\nu\phi
+(\partial^\mu\phi)\partial_\mu\partial_\nu\phi
-\partial_\nu\mathcal L,\\
\partial_\nu\mathcal L
&=(\partial^\rho\phi)\partial_\nu\partial_\rho\phi
-V'(\phi)\partial_\nu\phi.
\end{aligned}
$$

混合微分が可換なので二つの二階微分項は消え、

$$
\partial_\mu T^\mu{}_\nu
=[\Box\phi+V'(\phi)]\partial_\nu\phi.
$$

場の方程式を代入して零です。$V$ が $x$ に明示的に依存しないことが、$\partial_\nu\mathcal L$ の第二式で重要です。
<!-- solution-end -->

### 演習 QFT2-B3：外部源による一つの保存則の破れ

二成分自由場の密度に定数の外部源 $h\phi_1$ を加えたものとする。二つのEuler–Lagrange方程式を導き、回転流 $j^\mu=\phi_1\partial^\mu\phi_2-\phi_2\partial^\mu\phi_1$ の発散を求めよ。$h$ が時間・空間に依存しない場合に並進保存則まで破れるか判断せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

密度を $\mathcal L_h=\mathcal L_2+h\phi_1$ とすると

$$
\begin{aligned}
\mathcal E_1&=-m^2\phi_1+h-\Box\phi_1,\\
\mathcal E_2&=-m^2\phi_2-\Box\phi_2.
\end{aligned}
$$

従って解では $\Box\phi_1=-m^2\phi_1+h$、$\Box\phi_2=-m^2\phi_2$ です。流を直接発散させ、一次微分の交差項を消すと

$$
\begin{aligned}
\partial_\mu j^\mu
&=\phi_1\Box\phi_2-\phi_2\Box\phi_1\\
&=-m^2\phi_1\phi_2+m^2\phi_2\phi_1-h\phi_2=-h\phi_2.
\end{aligned}
$$

回転対称性は壊れますが $h$ は定数であり、$\mathcal L_h$ に明示的な $x$ はありません。従って**変更後の**テンソル $T^\mu{}_\nu[\mathcal L_h]$ には[並進保存定理](#thm-qft2-translation)を適用でき、オンシェルで $\partial_\mu T^\mu{}_\nu=0$ です。
<!-- solution-end -->

### 演習 QFT2-B4：局所保存と領域保存を区別する

$1+1$ 次元で $C^1$ 流 $j^\mu(t,x)$ が $\partial_t j^0+\partial_x j^1=0$ を満たすとする。$Q(t)=\int_a^b j^0(t,x)\,dx$ を定め、時間微分と積分を交換できるとする。$dQ/dt$ を求め、$j^1(t,a)=j^1(t,b)$ のときに $Q$ が一定になることを証明せよ。さらに $j^0=c$、$j^1=d$（定数）なら何が起きるか。

- Level: B

<!-- solution-start -->
#### 詳細解答

仮定した正則性と積分交換によって

$$
\frac{dQ}{dt}
=\int_a^b\partial_tj^0\,dx
=-\int_a^b\partial_xj^1\,dx
=j^1(t,a)-j^1(t,b).
$$

端点の流束が一致する場合、右辺は零なので $Q(t)$ は一定です。$j^0=c,j^1=d$ の場合は局所式も $0+0=0$ であり、$Q=c(b-a)$ で定数です。ただし $d$ が零でなくても、左端から入る量と右端から出る量が同量であれば領域の正味の電荷は不変です。
<!-- solution-end -->

### 演習 QFT2-C1：周期箱の複素場と四元運動量

$1+1$ 次元の長さ $L>0$ の周期箱で、$m\ge0$、$A>0$、整数 $n$ を取り、$k=2\pi n/L$、$\omega=\sqrt{k^2+m^2}>0$ とする。二つの実場を

$$
\phi_1=A\cos(\omega t-kx),\qquad
\phi_2=A\sin(\omega t-kx)
$$

と置き、密度は $\mathcal L_2=\frac12\sum_{a=1}^2(\partial_\mu\phi_a\partial^\mu\phi_a-m^2\phi_a^2)$ とする。

1. 各場の方程式と周期境界条件を確認せよ。
2. $U(1)$ 電荷 $Q=\int_0^Lj^0dx$ を計算せよ。
3. $T^{00},T^{01}$ を計算し、$E=\int_0^L T^{00}dx$、$P=\int_0^LT^{01}dx$ を求めよ。
4. $E=\omega Q$、$P=kQ$ を確認し、無限直線上の平面波で同じ**総量**をそのまま有限の値だと見なせない理由を説明せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

**(1)** $\theta=\omega t-kx$ とすると $\Box\cos\theta=(-\omega^2+k^2)\cos\theta$、$\Box\sin\theta=(-\omega^2+k^2)\sin\theta$ です。$\omega^2=k^2+m^2$ より各場は $(\Box+m^2)\phi_a=0$ を満たします。$kL=2\pi n$ だから $\theta(t,x+L)=\theta(t,x)-2\pi n$ であり、両場とその空間微分は周期的です。

**(2)** 時間微分は $\partial_t\phi_1=-A\omega\sin\theta$、$\partial_t\phi_2=A\omega\cos\theta$ です。[U(1)流](#prop-qft2-u1)へ代入すると

$$
j^0=A^2\omega(\cos^2\theta+\sin^2\theta)=A^2\omega.
$$

従って $Q=LA^2\omega$ です。

**(3)** 空間微分は $\partial_x\phi_1=Ak\sin\theta$、$\partial_x\phi_2=-Ak\cos\theta$ なので

$$
\sum_a(\partial_t\phi_a)^2=A^2\omega^2,\quad
\sum_a(\partial_x\phi_a)^2=A^2k^2,\quad
\sum_a\phi_a^2=A^2.
$$

これらを $\mathcal L_2$ へ代入すると

$$
\mathcal L_2=\frac{A^2}{2}(\omega^2-k^2-m^2)=0.
$$

各場の[正準テンソル](#def-qft2-stress)を足し合わせ、

$$
\begin{aligned}
T^{00}&=\sum_a(\partial_t\phi_a)^2-\mathcal L_2=A^2\omega^2,\\
T^{01}&=-\sum_a(\partial_t\phi_a)(\partial_x\phi_a)\\
&=-[(-A\omega\sin\theta)(Ak\sin\theta)
+(A\omega\cos\theta)(-Ak\cos\theta)]\\
&=A^2\omega k.
\end{aligned}
$$

積分して $E=LA^2\omega^2$、$P=LA^2\omega k$ です。

**(4)** $Q=LA^2\omega$ なので $E=\omega Q$、$P=kQ$ が成立します。これは古典場の波形についての等式であり、まだ量子粒子の個数ではありません。$A\ne0$ の同じ平面波を無限直線へ延ばすと $j^0,T^{00}$ は空間に一定の非零値を持ち、総量の空間積分が発散します。周期箱が有限性を与えています。
<!-- solution-end -->

### 演習 QFT2-C2：改良テンソルのトレースと積分電荷

$3+1$ 次元の質量零自由実場 $\phi\in C^3(\mathbb R^{1,3})$ が $\Box\phi=0$ を満たすとする。正準テンソル $T^{\mu\nu}=\partial^\mu\phi\partial^\nu\phi-\eta^{\mu\nu}(\partial\phi)^2/2$ に対し、

$$
\widetilde T^{\mu\nu}
=T^{\mu\nu}
+\frac16(\eta^{\mu\nu}\Box-\partial^\mu\partial^\nu)\phi^2
$$

を取る。

1. $T^\mu{}_\mu$ と $\widetilde T^\mu{}_\mu$ を計算し、どこで運動方程式を使うか明示せよ。
2. 固定時刻の改良エネルギー密度と元の差 $\widetilde T^{00}-T^{00}$ を空間Laplacianで表せ。
3. 半径 $R$ の球で積分したエネルギー差を境界積分に変え、$R\to\infty$ で二つのエネルギーが等しいための十分条件を述べよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

**(1)** 略記 $(\partial\phi)^2=\partial_\mu\phi\partial^\mu\phi$ を使います。計量の縮約は $\eta_{\mu\nu}\eta^{\mu\nu}=4$ だから

$$
T^\mu{}_\mu
=(\partial\phi)^2-4\frac12(\partial\phi)^2
=-(\partial\phi)^2.
$$

改良項のトレースでは $4\Box\phi^2-\Box\phi^2=3\Box\phi^2$ なので

$$
\widetilde T^\mu{}_\mu
=-(\partial\phi)^2+\frac12\Box\phi^2.
$$

積の微分から $\Box\phi^2=2(\partial\phi)^2+2\phi\Box\phi$ が成り立ち、

$$
\widetilde T^\mu{}_\mu
=\phi\Box\phi=0.
$$

最終行だけでオンシェル条件 $\Box\phi=0$ を使いました。

**(2)** $\eta^{00}=1$、$\partial^0=\partial_t$、$\Box=\partial_t^2-\Delta$ より

$$
\widetilde T^{00}-T^{00}
=\frac16(\Box-\partial_t^2)\phi^2
=-\frac16\Delta\phi^2.
$$

**(3)** $\phi^2$ が十分滑らかなので、球 $B_R$ に[発散定理](../../../幾何系/VC/VC4/index.md#thm-vc4-gauss-divergence)を適用すると

$$
\int_{B_R}(\widetilde T^{00}-T^{00})\,d^3x
=-\frac16\int_{\partial B_R}
\nabla(\phi^2)\cdot\boldsymbol n\,dS.
$$

両エネルギーの極限が存在し、この球面積分が $R\to\infty$ で零へ収束することは総エネルギー一致の十分条件です。例えば $\phi$ が各時刻で空間的コンパクト台を持つなら、大きい $R$ で境界積分は厳密に零です。**局所保存が等しいことだけでは、境界条件なしに積分電荷の一致は結論できません**。
<!-- solution-end -->

## 10. 次の講義へ

古典場の連続対称性から流を導き、解の上で保存する理由、保存電荷に必要な境界条件、エネルギー・運動量と改良項をつなぎました。特に、Noether流を得る論理と「空間積分した総量が有限で保存する」論理は別段階です。

次はKlein–Gordon解をFourierモードへ分解し、正・負振動数と初期データを調べます。その準備として、流の時間成分が場の時間微分とどう関係するか、場の量子化でどの表現を選ぶ必要があるかを考えていきます。

参考：David Tong, [*Quantum Field Theory*, §1.3](https://www.damtp.cam.ac.uk/user/tong/qft/qft.pdf)（古典場のNoether定理と正準エネルギー運動量テンソル）。本講の導出・演習は独自に記述しました。
