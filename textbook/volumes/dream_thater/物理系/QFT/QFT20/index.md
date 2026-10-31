# QFT20 Euclid化・Wick回転と反射陽性

<!-- definition-example-audit: strict -->

[QFT19の有限次元Gaussian生成公式](../QFT19/index.md#thm-qft19-gaussian)では、正定値の二次形式から収束する積分と二点関数を得ました。一方、[QFT6のFeynman二点分布](../QFT6/index.md#def-qft6-feynman-two-point)は振動する実時間の量で、その分母には $i\varepsilon$ 処方があります。振動積分を減衰積分へ直せれば計算は楽になりますが、複素積分の経路は極をまたいで勝手に変形できません。

この講義の中心問いは、**いつ実時間の相関関数をEuclid時間で計算でき、得られたEuclid相関関数から物理的な実時間理論へ戻るには何が必要か**です。自由スカラー場の一つの運動量モードから始め、[複素解析で学んだ解析接続](../../../解析系/CA/CA5/index.md#def-ca5-analytic-continuation-along-path)を時間変数に応用する際の条件、積分路の障害、Euclid二点核を導きます。さらに、時間を反射して得る二次形式が非負になるかを調べます。

時空は $3+1$ 次元、計量は $\eta=\operatorname{diag}(1,-1,-1,-1)$、$m>0$、$\hbar=c=1$ とします。空間運動量 $\boldsymbol p$ に対する正の振動数を $\omega_{\boldsymbol p}=\sqrt{|\boldsymbol p|^2+m^2}$ と書きます。Fourier規約は [QFT6の規約](../QFT6/index.md#def-qft6-feynman-two-point)と合わせ、実時間では $e^{-ip^0t+i\boldsymbol p\cdot\boldsymbol x}$ を用います。全ての連続場の式はまず自由場の分布として扱い、必要に応じて有限個の空間Fourierモードへ切り詰めます。

## 1. 実時間の振動を虚時間の減衰へ変える

古典的な実スカラー場の作用は [QFT1のスカラー場作用](../QFT1/index.md#def-qft1-action)から

$$
S_M[\phi]=\frac12\int_{\mathbb R^{1+3}}
\left[(\partial_t\phi)^2-|\nabla\phi|^2-m^2\phi^2\right]dt\,d^3x
$$

です。ここで添字 $M$ はMinkowskiを表します。時間を $t=-i\tau$ と置き、$\phi_E(\tau,\boldsymbol x)=\phi(-i\tau,\boldsymbol x)$ と書くことを考えます。これは任意の実時間の関数を複素時間へ延長できるという主張ではありません。まず**解析的な関数に対する代入**として計算し、場の理論へ適用するための条件は後で確認します。

微分の連鎖律と微小時間の変換は

$$
\partial_t\phi=i\partial_\tau\phi_E,
\qquad dt=-i\,d\tau.
$$

したがって $iS_M$ の指数の符号は変わり、実変数で正の二次形式が現れます。

<a id="def-qft20-euclidean-action"></a>

<!-- formal-statement-start -->
> **定義（自由スカラー場のEuclid作用）**
> $m>0$、実数値の滑らかな場 $\phi_E(\tau,\boldsymbol x)$ が十分速く減衰する場合、Euclid作用を

$$
S_E[\phi_E]=\frac12\int_{\mathbb R^4}
\left[(\partial_\tau\phi_E)^2+|\nabla\phi_E|^2+m^2\phi_E^2\right]d\tau\,d^3x
$$

> と定義する。形式的な時間代入 $t=-i\tau$ で端点や境界項を支障なく変形できる場合に $iS_M[\phi]=-S_E[\phi_E]$ と書く。$S_E\ge0$ は実場についての性質であり、無限次元の積分測度の存在を主張するものではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft20-euclidean-action -->
### 例：一つの振動子で三つの符号を確認する

**定義の確認**：空間体積を1に規格化した一つの実モード $q(t)$ の作用を

$$
S_M[q]=\frac12\int(\dot q^2-\omega^2q^2)\,dt,
\qquad \omega>0
$$

とします。$q_E(\tau)=q(-i\tau)$ への代入では $\dot q=i q_E'$ なので

$$
\begin{aligned}
iS_M
&=\frac{i}{2}\int\bigl[-(q_E')^2-\omega^2q_E^2\bigr](-i\,d\tau)\\
&=-\frac12\int\bigl[(q_E')^2+\omega^2q_E^2\bigr]d\tau=-S_E.
\end{aligned}
$$

質量 $\omega^2>0$ により、実の $q_E$ について両項が非負です。$\omega^2<0$ なら一定モードが負の方向を作り、Euclid積分が収束するという保証はなくなります。
<!-- definition-example-end -->

ただし有限体積・有限個の自由度に切り詰めた場でも、**時間方向を連続に保てば自由度は無限個**です。[QFT19の有限格子模型](../QFT19/index.md#def-qft19-lattice-functional)のように全方向を離散化して正定値行列を作った場合の有限次元Gaussian積分と、形式記号 $\mathcal D\phi_E$ を使う連続場の積分は区別します。また、ゲージ場やフェルミオンへ同じ正定値性を無条件に移してはいけません。

## 2. 自由二点関数を虚時間で計算する

相関関数の解析接続は「$t$ に $-i\tau$ を代入する」という略記よりも、一つの振動数の**時間順序二点核**で確認すると安全です。[QFT6のFeynman二点分布](../QFT6/index.md#def-qft6-feynman-two-point)を空間Fourier変換すると、固定した $\omega=\omega_{\boldsymbol p}>0$ について

$$
D_F(t,\boldsymbol p)
=\int_{\mathbb R}\frac{dp^0}{2\pi}
\frac{i\,e^{-ip^0t}}{(p^0)^2-\omega^2+i0}
=\frac{e^{-i\omega|t|}}{2\omega}
$$

となります。最後の等号は $i0$ が正・負の極をそれぞれ下・上の半平面へ避けることを用いる分布的境界値です。$t>0$ なら下側の正エネルギー極、$t<0$ なら上側の負エネルギー極が寄与します。

いま $t>0$ について $e^{-i\omega t}$ を得る正則関数 $z\mapsto e^{-\omega z}$ を考えます。$\operatorname{Re}z>0$ では減衰し、$z=\epsilon+it$ とすれば実時間へ、$z=\tau>0$ とすればEuclid時間へつながります。負の実時間には $z=\epsilon-it$ を用います。**時間順序の二つの場合を合わせる**ことが重要です。

<a id="def-qft20-schwinger-two-point"></a>

<!-- formal-statement-start -->
> **定義（自由場のEuclid二点関数）**
> $m>0$、$\omega_{\boldsymbol p}=\sqrt{|\boldsymbol p|^2+m^2}$ に対し、Euclid時間差 $\tau\in\mathbb R$ と空間運動量 $\boldsymbol p\in\mathbb R^3$ の自由スカラー場の二点核（Schwinger二点関数）を

$$
C_E(\tau,\boldsymbol p)
=\frac{e^{-\omega_{\boldsymbol p}|\tau|}}{2\omega_{\boldsymbol p}}
$$

> と定義する。位置空間では空間Fourier逆変換を分布として解釈する。$\tau\ne0$ の値は通常の関数であるが、同一点極限を無条件に有限値としない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft20-schwinger-two-point -->
### 例：質量2、零空間運動量

**定義の確認**：$m=2$、$\boldsymbol p=0$ なら $\omega=2$ なので $C_E(\tau,0)=e^{-2|\tau|}/4$ です。$\tau=0$ では $1/4$、$\tau=1$ では $e^{-2}/4$ です。負の $\tau$ も同じ値となり、時間交換に対して対称です。この指数減衰は実時間の $e^{-2i|t|}/4$ の振動と対照的です。
<!-- definition-example-end -->

<a id="thm-qft20-euclidean-kernel"></a>

<!-- formal-statement-start -->
> **定理（Euclid自由共分散と時間順序境界値）**
> $m>0$、固定した $\boldsymbol p$ の $\omega=\omega_{\boldsymbol p}>0$ について、上記の $C_E$ は緩増加分布として

$$
\left(-\partial_\tau^2+\omega^2\right)C_E(\tau,\boldsymbol p)=\delta(\tau),
\qquad
C_E(\tau,\boldsymbol p)=\int_{\mathbb R}\frac{dp_4}{2\pi}
\frac{e^{ip_4\tau}}{p_4^2+\omega^2}
$$

> を満たす。また $F_\omega(z)=e^{-\omega z}/(2\omega)$ は右半平面 $\operatorname{Re}z>0$ で正則であり、$t>0$ のとき $F_\omega(\epsilon+it)$、$t<0$ のとき $F_\omega(\epsilon-it)$ の $\epsilon\downarrow0$ での境界値は共に $D_F(t,\boldsymbol p)=e^{-i\omega|t|}/(2\omega)$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

指数関数を $\tau>0$ と $\tau<0$ で微分すれば、零以外で斉次方程式を満たします。零での**一階微分の跳び**がデルタ源を作ります。Fourier変換はこの微分方程式を $p_4^2+\omega^2$ の乗法へ変えます。実時間の二つの符号は正則関数の境界の取り方で復元します。

<!-- proof-start -->
### 証明

$\tau>0$ で $C_E=e^{-\omega\tau}/(2\omega)$、$\tau<0$ で $C_E=e^{\omega\tau}/(2\omega)$ です。両側で $C_E''=\omega^2C_E$ ですが、一階微分は

$$
C_E'(0+)=-\frac12,\qquad C_E'(0-)=+\frac12,
\qquad C_E'(0+)-C_E'(0-)=-1
$$

という跳びを持ちます。連続な区分的 $C^2$ 関数の分布二階微分では、この跳びが $-\delta(\tau)$ を加えるので

$$
C_E''=\omega^2C_E-\delta(\tau),
\qquad (-\partial_\tau^2+\omega^2)C_E=\delta(\tau).
$$

Fourier変換の規約 $\widehat C_E(p_4)=\int e^{-ip_4\tau}C_E(\tau)d\tau$ を使えば、微分の変換は $\widehat{-C_E''}=p_4^2\widehat C_E$ です。従って $(p_4^2+\omega^2)\widehat C_E=1$、すなわち $\widehat C_E=1/(p_4^2+\omega^2)$ です。逆変換で表示公式が出ます。積分は $\omega>0$ により絶対収束します。

$F_\omega$ は指数関数なので正則です。$t>0$ なら

$$
\lim_{\epsilon\downarrow0}F_\omega(\epsilon+it)
=\frac{e^{-i\omega t}}{2\omega};
$$

$t<0$ なら $-t>0$ なので

$$
\lim_{\epsilon\downarrow0}F_\omega(\epsilon-it)
=\frac{e^{i\omega t}}{2\omega}.
$$

二つを合わせると $e^{-i\omega|t|}/(2\omega)$ です。これは固定した自由モードでの解析接続であって、任意の相互作用の分布が同じ手順で接続できることは示していません。
<!-- proof-end -->

この核は [QFT19のGaussian二点公式](../QFT19/index.md#thm-qft19-gaussian)の連続版に対応します。ただし $(-\partial_\tau^2-\Delta+m^2)^{-1}$ は無限次元作用素の逆核であり、全時空点での有限な数ではありません。有限の空間モードと有限個の時刻に制限すれば、$C_E$ は正定値の共分散行列を与えます。ここで共分散の意味は、[確率変数の共分散](../../../解析系/F0/F0-00P3/index.md#def-f0-00p3-covariance-uncorrelated)を場の線形測定に適用したものです。

## 3. Wick回転を積分路で実施するための条件

実時間の振動積分が複素エネルギー $p^0$ の積分で与えられる場合、「$p^0=ip_4$ と代入する」は実軸の経路を虚軸へ回す操作を含みます。複素関数に極・分岐・特異点があれば、通過する領域と無限遠の弧を調べないと等号にはできません。そこで、回転する領域に極がないことと、無限遠の弧の積分が消えることを次の定義で明示します。

<a id="def-qft20-contour-wick"></a>

<!-- formal-statement-start -->
> **定義（積分路によるWick回転）**
> 複素変数 $z$ の有理型関数 $f$ に対し、正の実半直線 $[0,\infty)$ 上の積分を正の虚半直線 $i[0,\infty)$ 上の積分へ変える操作を考える。回転する第一象限に極がなく、四分円 $|z|=R$ 上の積分が $R\to\infty$ で零になり、両半直線の積分が定まるとき、Cauchyの積分定理によって

$$
\int_0^\infty f(x)\,dx
=i\int_0^\infty f(iy)\,dy
$$

> が成り立つ。この条件が満たされる場合の経路変形を積分路によるWick回転という。実軸全体には上下半平面の別々の回転と極の $i0$ 配置が必要である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft20-contour-wick -->
### 例：極を避けられる四分円

**定義の確認**：$a>0$ として $f(z)=1/(z+ia)^2$ を選びます。極は $-ia$ にあり第一象限にはありません。大きな半径 $R$ の四分円では $|f(z)|=O(R^{-2})$、弧の長さは $\pi R/2$ なので弧の積分は $O(R^{-1})$ で零です。両半直線でも絶対収束します。この場合は定義の等式を使えます。単に $z=iy$ という代数的置換だけで正当化したわけではありません。
<!-- definition-example-end -->

<a id="prop-qft20-crossed-pole"></a>

<!-- formal-statement-start -->
> **命題（極を横断する回転の補正項）**
> $a,b,c>0$、$z_0=a+ib$ とし、$f(z)=1/[(z-z_0)(z+ic)]$ とする。この $f$ は実半直線と正の虚半直線上に極を持たず、四分円弧の寄与は零になるが、第一象限内に単純極 $z_0$ を持つ。このとき

$$
\int_0^\infty f(x)\,dx-i\int_0^\infty f(iy)\,dy
=\frac{2\pi i}{z_0+ic}\ne0.
$$

> 従って極の位置を調べずにWick回転の等号を使用することはできない。
<!-- formal-statement-end -->

### 証明の見取り図

実軸を右へ進み、四分円を反時計回りに通り、虚軸を下へ戻る閉曲線を取ります。第一象限の極を囲むため、[CA4の留数定理](../../../解析系/CA/CA4/index.md#thm-ca4-residue)によってその留数が残ります。

<!-- proof-start -->
### 証明

$R>|z_0|$ の四分円経路を $0\to R\to iR\to0$ と反時計回りに進みます。$f(z)=O(R^{-2})$ なので弧積分は $R\to\infty$ で零です。虚軸の戻りの向きは $z=iy$、$y:R\to0$ だから

$$
\int_{iR}^{0}f(z)\,dz
=-i\int_0^R f(iy)\,dy.
$$

第一象限の極は $z_0=a+ib$ 一つで、もう一つの極 $-ic$ は外側です。留数は

$$
\operatorname*{Res}_{z=z_0}f(z)
=\lim_{z\to z_0}\frac{1}{z+ic}
=\frac1{z_0+ic}.
$$

[CA4の留数定理](../../../解析系/CA/CA4/index.md#thm-ca4-residue)で閉曲線積分が $2\pi i/(z_0+ic)$ に等しいので、弧を消して主張が出ます。
<!-- proof-end -->

この反例は $i\varepsilon$ 処方の重要性を際立たせます。自由場の分母 $[(p^0)^2-\omega^2+i0]^{-1}$ では二つの極の位置と、時間因子 $e^{-ip^0t}$ が弧で減衰する方向を合わせて判断します。複数の外部エネルギーがあるループ図には閾値・pinch特異性が生じ得るため、**一つの自由モードで成功した回転を全振幅へ無条件に一般化しません**。

## 4. Euclid相関関数の正値性と反射陽性は違う

Euclid共分散のFourier変換 $1/(p_4^2+\omega^2)$ は正です。従って有限個の試験関数 $f_j$ に対する行列 $\langle f_i,C_E f_j\rangle$ は正半定値です。しかし、これは実時間へ戻して**正のノルムを持つHilbert空間**が作れることと同じ条件ではありません。

その違いを測るため、Euclid時間 $\tau=0$ を鏡として正の時刻を負へ反転する写像 $\theta(\tau,\boldsymbol x)=(-\tau,\boldsymbol x)$ を考えます。正の時刻に台を持つ関数や場の多項式 $F$ の鏡像を複素共役とともに $\Theta F$ と書きます。正の時刻の情報からノルム二乗に相当する量を作るのが狙いです。

<a id="def-qft20-reflection-positivity"></a>

<!-- formal-statement-start -->
> **定義（反射陽性）**
> $\tau$ に関して反射対称なEuclid確率模型があり、$\tau>0$ に台を持つ場の有限次多項式汎関数の空間を $\mathcal A_+$ とする。$\Theta$ を「時刻反射 $\tau\mapsto-\tau$ と係数の複素共役」を組み合わせた反線形写像とする。任意の $F\in\mathcal A_+$ に対し

$$
\langle(\Theta F)F\rangle_E\ge0
$$

> が成り立つとき、模型は反射陽性を持つという。特に平均零の実Gaussian模型で $F=\phi(f)$、$\operatorname{supp}f\subset\{\tau>0\}$ の場合は、二点核 $C_E$ による二次形式

$$
Q(f)=\int_{\tau,\sigma>0}d\tau\,d\sigma\,d^3x\,d^3y\;
\overline{f(\tau,\boldsymbol x)}
C_E(-\tau-\sigma,\boldsymbol x-\boldsymbol y)
f(\sigma,\boldsymbol y)
$$

> が非負であることを必要条件とする。積分は滑らかなコンパクト台の試験関数に対する分布の作用として解釈する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft20-reflection-positivity -->
### 例：一つの振動数で時刻を二つ選ぶ

**定義の確認**：固定した $\omega>0$ の $C_E(\tau)=e^{-\omega|\tau|}/(2\omega)$ を用い、正の時刻 $\tau_1,\tau_2$ に線形結合 $F=c_1q(\tau_1)+c_2q(\tau_2)$ を置くと、その反射二次形式は

$$
\begin{aligned}
Q(F)&=\sum_{j,k=1}^2\overline{c_j}c_k
\frac{e^{-\omega(\tau_j+\tau_k)}}{2\omega}\\
&=\frac1{2\omega}
\left|c_1e^{-\omega\tau_1}+c_2e^{-\omega\tau_2}\right|^2\ge0.
\end{aligned}
$$

ここでは反射した時刻 $-\tau_j$ と元の時刻 $\tau_k$ の差の絶対値が $\tau_j+\tau_k$ になることが、単なる共分散の正値性と異なる点です。
<!-- definition-example-end -->

<a id="thm-qft20-free-reflection"></a>

<!-- formal-statement-start -->
> **定理（自由スカラー二点核の反射二次形式）**
> $m>0$ の自由Euclid二点核 $C_E$ を取り、$f\in C_c^\infty((0,\infty)\times\mathbb R^3;\mathbb C)$ とする。空間Fourier変換を次で定める。

$$
\widehat f(\tau,\boldsymbol p)
=\int_{\mathbb R^3}e^{-i\boldsymbol p\cdot\boldsymbol x}
f(\tau,\boldsymbol x)\,d^3x.
$$

> このとき反射二次形式は次の非負量に等しい。

$$
Q(f)=\int_{\mathbb R^3}\frac{d^3p}{(2\pi)^3}
\frac1{2\omega_{\boldsymbol p}}
\left|\int_0^\infty e^{-\omega_{\boldsymbol p}\tau}
\widehat f(\tau,\boldsymbol p)\,d\tau\right|^2\ge0.
$$

> この等式は少なくとも自由場の線形汎関数についての反射陽性を示す。一般の相互作用模型や任意の多項式汎関数の反射陽性までをこの等式だけで証明したものではない。
<!-- formal-statement-end -->

### 証明の見取り図

反射する時間差は必ず $-\tau-\sigma$ なので、指数核が $e^{-\omega\tau}e^{-\omega\sigma}$ と分離します。空間Fourier変換の積分をまとめると、残りが一つの絶対値二乗です。

<!-- proof-start -->
### 証明

位置空間の共分散をFourier逆変換して、$\tau,\sigma>0$ なら $|-\tau-\sigma|=\tau+\sigma$ を用います。

$$
\begin{aligned}
C_E(-\tau-\sigma,\boldsymbol x-\boldsymbol y)
&=\int\frac{d^3p}{(2\pi)^3}
e^{i\boldsymbol p\cdot(\boldsymbol x-\boldsymbol y)}
\frac{e^{-\omega_{\boldsymbol p}(\tau+\sigma)}}{2\omega_{\boldsymbol p}},\\
Q(f)&=\int\frac{d^3p}{(2\pi)^3}\frac1{2\omega_{\boldsymbol p}}
\left(\int_0^\infty e^{-\omega_{\boldsymbol p}\tau}
\overline{\widehat f(\tau,\boldsymbol p)}d\tau\right)
\left(\int_0^\infty e^{-\omega_{\boldsymbol p}\sigma}
\widehat f(\sigma,\boldsymbol p)d\sigma\right).
\end{aligned}
$$

第一の括弧は第二の複素共役なので絶対値二乗です。$m>0$ より $\omega_{\boldsymbol p}\ge m$、$f$ は滑らかなコンパクト台なのでFourier変換は急減少し、積分交換と収束を正当化できます。積分値は非負です。
<!-- proof-end -->

固定した有限個の空間モードでGaussian測度を構成すれば、[QFT19のボースGaussianのWick対合公式](../QFT19/index.md#thm-qft19-boson-wick)を使って高次の多項式にも反射陽性を拡張できます。正の時刻の線形汎関数をWick正規順序した単項式については、その反射内積が二点形式 $Q$ の成分の積の和となり、各次数で非負なGram行列を作るからです。ここでは自由模型の構造の見取り図として述べ、無限次元の一般的な構成・再構成定理の証明を装いません。

<a id="prop-qft20-positive-not-reflection"></a>

<!-- formal-statement-start -->
> **命題（共分散が正でも反射陽性とは限らない）**
> 一次元Euclid時間上で次の偶関数を共分散候補とする。

$$
K(\tau)=\frac14e^{-2|\tau|}-\frac1{10}e^{-|\tau|}.
$$

> このFourier変換は全ての $p_4\in\mathbb R$ で正なので $K$ は通常の正定値共分散を定める。一方、正の時刻の線形汎関数に対する反射二次形式は負になり得るため、反射陽性を満たさない。
<!-- formal-statement-end -->

### 証明の見取り図

Fourier側では二つの正の分母を通分し、分子が正であることを確かめます。しかし、反射二次形式では $K(\tau+\sigma)$ が現れ、遅く減衰する**負の項**が大きな正時刻で勝ちます。

<!-- proof-start -->
### 証明

[Euclid共分散のFourier公式](#thm-qft20-euclidean-kernel)を各指数項へ適用すると

$$
\begin{aligned}
\widehat K(p_4)
&=\frac1{p_4^2+4}-\frac{1/5}{p_4^2+1}\\
&=\frac{(4/5)p_4^2+1/5}{(p_4^2+4)(p_4^2+1)}>0.
\end{aligned}
$$

したがって任意のSchwartz関数 $g$ に対し、Parsevalの公式で

$$
\int d\tau\,d\sigma\,\overline{g(\tau)}K(\tau-\sigma)g(\sigma)
=\int\frac{dp_4}{2\pi}\widehat K(p_4)|\widehat g(p_4)|^2\ge0.
$$

一方、$K(4)=e^{-8}/4-e^{-4}/10<0$ です。実際 $e^{-8}/4<e^{-4}/10$ は $e^4>5/2$ と同値で成立します。$\tau=2$ に集中する滑らかな非負の試験関数 $f_\delta$ を $\int f_\delta=1$ として取ると、連続性によって

$$
\lim_{\delta\downarrow0}\int_{0}^{\infty}\int_0^\infty
f_\delta(\tau)K(\tau+\sigma)f_\delta(\sigma)
\,d\tau\,d\sigma=K(4)<0.
$$

従って十分小さい $\delta$ で反射二次形式は負です。正定値共分散であることだけでは反射陽性を保証しません。
<!-- proof-end -->

## 5. Schwinger関数から実時間理論へ何が必要か

自由場では前節の計算で反射二次形式の正値性を直接示せました。一般の相互作用理論では、二点関数だけでなく全ての $n$ 点Schwinger関数 $S_n$ を整合的に扱います。これは $n$ 個のEuclid時空点 $x_1,\ldots,x_n$ について、形式的には

$$
S_n(x_1,\ldots,x_n)
=\langle\phi_E(x_1)\cdots\phi_E(x_n)\rangle_E
$$

と書く多点分布です。時間反射に加えてEuclid対称性、置換対称性、適切な正則性・増大度などを検査する必要があります。これらは**単に全ての積分が収束することより強い条件**です。

<a id="def-qft20-os-data"></a>

<!-- formal-statement-start -->
> **定義（再構成を目指すEuclid相関関数のデータ）**
> Euclid空間上の対称な超関数族 $\{S_n\}_{n\ge0}$（$S_0=1$）を考える。これが物理的な実時間理論の候補となるかを調べる際には、少なくとも (i) Euclid移動・回転に関する共変性、(ii) 同種のボース場の引数の置換対称性、(iii) 試験関数上での適切な連続性・増大度、(iv) 正時刻に台を持つ多項式汎関数に対する反射陽性を検査する。この一組を本講義では再構成のためのEuclidデータと呼ぶ。これらの列挙だけで一般のOsterwalder–Schrader再構成定理を証明したものではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft20-os-data -->
### 例：自由二点核が満たす検査と、未検査の部分

**定義の確認**：$C_E$ は $(-\Delta_E+m^2)^{-1}$ の核なのでFourier表示は $1/(p_4^2+|\boldsymbol p|^2+m^2)$ であり、Euclid回転によって分母は変わりません。$C_E(x-y)=C_E(y-x)$ も成り立ちます。[反射二次形式の定理](#thm-qft20-free-reflection)で、線形汎関数についての(iv)も検査しました。$S_4$ などは [QFT19のWick対合](../QFT19/index.md#thm-qft19-boson-wick)によって構成できますが、これらを示しただけで任意の相互作用模型の全公理を満たしたとは言えません。
<!-- definition-example-end -->

Osterwalder–Schraderの再構成の考え方は、正時刻汎関数に $\langle\Theta F\,G\rangle_E$ という半正定値の内積を入れ、零ノルムの元を割って完成したHilbert空間を得ることです。時間の正方向への平行移動はこの空間上で収縮作用素となり、適切な公理の下で非負のHamiltonianへ接続されます。**反射陽性が欠けると、この「ノルム二乗」から負の値が出て、物理的Hilbert空間への道筋が壊れます。** 一般の再構成定理は正則性・対称性その他の公理も要し、その証明は別の数理QFTの課題です。

ここで区別したいのは次の三段階です。

1. **有限次元のGaussian積分**：正定値行列なら通常の測度積分として厳密に定義できる。
2. **ここで計算した自由場の二点核**：Wick展開・反射陽性を、分布とcutoffに注意して具体的に確かめられる。
3. **相互作用を含む実時間の量子場**：Euclid形式の計算式や摂動展開だけで存在・一意性・ユニタリ性が保証されるわけではない。

この区別は、次に連結関数・1PI有効作用やループの正則化を扱う際、計算上の形式操作と数学的な存在命題を混同しないための基礎になります。

## 6. 演習：符号・解析接続・反射の検算

以下で特に断らない限り $m>0$、$\omega>0$ とし、全ての複素積分には経路の向きと極の位置を明記してください。

### 演習 QFT20-A1：虚時間作用の符号

- Level: A
- 問題：$S_M[q]=\frac12\int(\dot q^2-9q^2)dt$ とする。$t=-i\tau$ と置いて $iS_M=-S_E$ を導き、$S_E$ の式と非負性の理由を書け。$\dot q$ と $dt$ の変換をそれぞれ示せ。

<!-- solution-start -->
**詳細解答**

$q_E(\tau)=q(-i\tau)$ とすれば連鎖律により $\dot q=i q_E'$、また $dt=-i\,d\tau$ です。従って

$$
\begin{aligned}
iS_M&=\frac i2\int\bigl[(iq_E')^2-9q_E^2\bigr](-i\,d\tau)\\
&=-\frac12\int\bigl[(q_E')^2+9q_E^2\bigr]d\tau=-S_E.
\end{aligned}
$$

実数値の $q_E$ であれば各平方が非負なので $S_E\ge0$ です。複素時間への延長が許され、積分経路と端点を変形できるという条件の下での形式計算です。
<!-- solution-end -->

### 演習 QFT20-A2：零時刻での跳び

- Level: A
- 問題：$C(\tau)=e^{-3|\tau|}/6$ を $\tau>0$ と $\tau<0$ で二階微分し、$(-\partial_\tau^2+9)C=\delta(\tau)$ を分布として証明せよ。

<!-- solution-start -->
**詳細解答**

$\tau>0$ で $C'=-(1/2)e^{-3\tau}$、$\tau<0$ で $C'=(1/2)e^{3\tau}$ です。従って $C'(0+)=-1/2$、$C'(0-)=+1/2$、跳びは $-1$ です。零以外では $C''=9C$、零での跳びによる分布微分を加えると

$$
C''=9C+[C'(0+)-C'(0-)]\delta=9C-\delta.
$$

よって $(-\partial_\tau^2+9)C=\delta$ です。値 $C(0+)=C(0-)=1/6$ は連続なので、$\delta'$ 項はありません。
<!-- solution-end -->

### 演習 QFT20-A3：二点核のEuclid Fourier変換

- Level: A
- 問題：$\omega>0$ とし、$C(\tau)=e^{-\omega|\tau|}/(2\omega)$ のFourier変換 $\widehat C(p_4)=\int_{\mathbb R}e^{-ip_4\tau}C(\tau)d\tau$ を二つの半直線に分けて積分し、$1/(p_4^2+\omega^2)$ を示せ。

<!-- solution-start -->
**詳細解答**

$\tau>0$ と $\tau<0$ の積分を後者で $s=-\tau$ として書き換えると

$$
\begin{aligned}
\widehat C(p_4)
&=\frac1{2\omega}\left[
\int_0^\infty e^{-(\omega+ip_4)\tau}d\tau
+\int_0^\infty e^{-(\omega-ip_4)s}ds\right]\\
&=\frac1{2\omega}\left(
\frac1{\omega+ip_4}+\frac1{\omega-ip_4}\right)\\
&=\frac1{2\omega}\frac{2\omega}{\omega^2+p_4^2}
=\frac1{p_4^2+\omega^2}.
\end{aligned}
$$

$\operatorname{Re}(\omega\pm ip_4)=\omega>0$ だから両積分は収束します。
<!-- solution-end -->

### 演習 QFT20-A4：一モードの反射陽性

- Level: A
- 問題：$\omega=1$、$\tau_1=1$、$\tau_2=2$ とし、$F=q(\tau_1)-2q(\tau_2)$ に対する反射二次形式を $C(\tau)=e^{-|\tau|}/2$ で計算して非負性を示せ。

<!-- solution-start -->
**詳細解答**

反射で時間差は $-(\tau_j+\tau_k)$ なので $Q(F)=\sum_{j,k}c_jc_k C(\tau_j+\tau_k)$、$c=(1,-2)$ です。各項を展開すると

$$
\begin{aligned}
Q(F)&=\tfrac12e^{-2}-2e^{-3}+2e^{-4}\\
&=\frac12(e^{-1}-2e^{-2})^2\ge0.
\end{aligned}
$$

負の交差項はありますが絶対値二乗の一部です。$C(\tau_1-\tau_2)$ を使うのは反射を落とした誤りです。
<!-- solution-end -->

### 演習 QFT20-A5：零モードの赤外条件

- Level: A
- 問題：空間運動量が零のモードについて $C_E(\tau,0)=e^{-m|\tau|}/(2m)$ とする。$m\downarrow0$ のとき $C_E(0,0)$ と $C_E(\tau,0)$（固定 $\tau$）はどうなるか。なぜ本章で $m>0$ としたか説明せよ。

<!-- solution-start -->
**詳細解答**

$C_E(0,0)=1/(2m)\to\infty$ です。固定した $\tau$ について $e^{-m|\tau|}=1-m|\tau|+O(m^2)$ だから

$$
C_E(\tau,0)=\frac1{2m}-\frac{|\tau|}{2}+O(m),
$$

と発散します。$m>0$ は固定運動量で $\omega\ge m$ を保証し、時間方向の減衰と逆作用素の零モードの問題を避けます。質量零の場すべてが存在しないという結論ではなく、この特定の零空間運動量の扱いには別の赤外条件が必要です。
<!-- solution-end -->

### 演習 QFT20-B1：極のある四分円

- Level: B
- 問題：$f(z)=1/[(z-(1+i))(z+i)]$ に対し、正の実半直線と正の虚半直線の積分の差 $I_R-iI_I$ を求めよ。四分円の向き、弧の評価、留数を説明せよ。

<!-- solution-start -->
**詳細解答**

第一象限の極は $z_0=1+i$、下側の極は $-i$ です。$0\to R\to iR\to0$ の反時計回りの四分円を考えると、$|f(z)|=O(R^{-2})$、弧長 $O(R)$ より弧積分は $O(R^{-1})\to0$ です。虚軸の戻りは $-iI_I$ です。留数は

$$
\operatorname*{Res}_{z=1+i} f(z)
=\frac1{(1+i)+i}=\frac1{1+2i}.
$$

よって

$$
I_R-iI_I=\frac{2\pi i}{1+2i}
=\frac{2\pi(2+i)}5.
$$

極が領域内にあるため、単純なWick回転の等号 $I_R=iI_I$ は破れます。
<!-- solution-end -->

### 演習 QFT20-B2：複素時間の両側境界

- Level: B
- 問題：$F_\omega(z)=e^{-\omega z}/(2\omega)$、$\omega>0$ とする。$t=2$、$t=-2$ それぞれについて、$z=\epsilon+it$ と $z=\epsilon-it$ のうち適切なものを選び、$D_F(t)=e^{-i\omega|t|}/(2\omega)$ に戻ることを示せ。負の時刻で誤った選択をすると何が変わるか。

<!-- solution-start -->
**詳細解答**

$t=2>0$ は $z=\epsilon+2i$ を使い、

$$
\lim_{\epsilon\downarrow0}F_\omega(\epsilon+2i)
=e^{-2i\omega}/(2\omega).
$$

$t=-2<0$ は $z=\epsilon-it=\epsilon+2i$ を使い、同じ $e^{-2i\omega}/(2\omega)$ を得ます。$t<0$ でも $z=\epsilon+it$ と誤って選ぶと $e^{+2i\omega}/(2\omega)$ となり、負時刻の時間順序を逆にしてしまいます。境界の選択は $|t|$ を作る二つの場合に対応します。
<!-- solution-end -->

### 演習 QFT20-B3：正定値性と反射陽性の分離

- Level: B
- 問題：$K(\tau)=e^{-2|\tau|}/4-e^{-|\tau|}/10$ に対し、次を示せ。

  1. Fourier変換がすべての実 $p_4$ で正であること。
  2. $K(4)<0$ であること。
  3. Fourier変換の正値性だけでは反射陽性が従わない理由。

<!-- solution-start -->
**詳細解答**

この章の[Euclid自由共分散と時間順序境界値](#thm-qft20-euclidean-kernel)のFourier表示より

$$
\widehat K(p_4)=\frac1{p_4^2+4}-\frac{1/5}{p_4^2+1}
=\frac{(4/5)p_4^2+1/5}{(p_4^2+4)(p_4^2+1)}>0.
$$

よって $K(\tau-\sigma)$ は通常の正定値共分散です。しかし反射二次形式は $K(\tau+\sigma)$ を使います。$K(4)=e^{-8}/4-e^{-4}/10<0$ は $e^4>5/2$ から従います。正の時刻 $\tau=2$ 近くの試験関数で反射二次形式を $K(4)$ に近づけられるため、反射陽性は失敗します。二つの正値性は異なる行列を検査しています。
<!-- solution-end -->

### 演習 QFT20-B4：有限個の反射行列

- Level: B
- 問題：$\omega>0$、$\tau_1,\ldots,\tau_n>0$ とする。$M_{jk}=e^{-\omega(\tau_j+\tau_k)}/(2\omega)$ の階数を求め、全ての複素係数 $c_j$ に対して $\sum_{j,k}\overline{c_j}M_{jk}c_k\ge0$ を証明せよ。$n\ge2$ なら正定値でなく半正定値にとどまる理由も述べよ。

<!-- solution-start -->
**詳細解答**

$v_j=e^{-\omega\tau_j}/\sqrt{2\omega}$ と置くと $M_{jk}=v_jv_k$ です。全成分 $v_j>0$ なので $M=vv^*$ は階数1です。また

$$
\sum_{j,k}\overline{c_j}M_{jk}c_k
=\left|\sum_kv_kc_k\right|^2\ge0.
$$

$n\ge2$ では $v^*c=0$ を満たす非零ベクトルが存在し、その $c$ で二次形式が零となります。この零ノルム方向を割るという操作が再構成のHilbert空間の考え方につながります。
<!-- solution-end -->

### 演習 QFT20-C1：Euclid二点関数から物理的な境界値まで

- Level: C
- 問題：$\omega>0$ の実スカラー一モードについて、次を出発点から導け。

  1. Euclid作用 $S_E[q]=\frac12\int[(q')^2+\omega^2q^2]d\tau$ から変分で作用素 $L=-\partial_\tau^2+\omega^2$ を得る。
  2. 両端で減衰する $LC=\delta$ の解を定め、跳び条件で係数を固定する。
  3. Fourier変換し $(p_4^2+\omega^2)^{-1}$ を得る。
  4. 任意の有限個の正時刻における反射二次形式の非負性を示す。
  5. 解析接続で実時間Feynman核を再現し、一般の相互作用模型へは何を追加で検査すべきか説明する。

<!-- solution-start -->
**詳細解答**

**(1) 変分と境界項。** コンパクト台の変分 $q\mapsto q+s h$ を取ると

$$
\left.\frac{d}{ds}S_E[q+sh]\right|_{s=0}
=\int(q'h'+\omega^2qh)d\tau
=\int(-q''+\omega^2q)h\,d\tau.
$$

二つ目の等式は $\int q'h'=[q'h]_{-\infty}^{\infty}-\int q''h$ で境界項が零になることを使いました。よって $L=-\partial_\tau^2+\omega^2$ です。

**(2) 逆核の係数。** $\tau\ne0$ では $LC=0$、両端で減衰する解は $\tau>0$ で $Ae^{-\omega\tau}$、$\tau<0$ で $Be^{\omega\tau}$ です。$C$ の跳びがあると $\delta'$ が生じるので連続性を要し、$A=B$ です。$LC=\delta$ のためには $C'(0+)-C'(0-)=-1$ が必要です。これは $-\omega A-\omega A=-2\omega A=-1$ なので $A=1/(2\omega)$ です。

$$
C(\tau)=\frac{e^{-\omega|\tau|}}{2\omega}.
$$

**(3) Fourier変換。** 二つの半直線で直接積分すれば

$$
\widehat C(p_4)=\frac1{2\omega}
\left(\frac1{\omega+ip_4}+\frac1{\omega-ip_4}\right)
=\frac1{p_4^2+\omega^2}.
$$

**(4) 反射二次形式。** $\tau_j>0$ と複素数 $c_j$ について

$$
\begin{aligned}
\sum_{j,k}\overline{c_j}c_k C(-\tau_j-\tau_k)
&=\frac1{2\omega}\sum_{j,k}\overline{c_j}c_k
e^{-\omega\tau_j}e^{-\omega\tau_k}\\
&=\frac1{2\omega}\left|\sum_kc_ke^{-\omega\tau_k}\right|^2\ge0.
\end{aligned}
$$

**(5) 実時間への復帰と適用範囲。** $F_\omega(z)=e^{-\omega z}/(2\omega)$ は右半平面で正則で、$t>0$ には $z=\epsilon+it$、$t<0$ には $z=\epsilon-it$ の境界値を取ります。$\epsilon\downarrow0$ で

$$
D_F(t)=\frac{e^{-i\omega|t|}}{2\omega}
$$

となり、[QFT6のFeynman処方](../QFT6/index.md#def-qft6-feynman-two-point)と一致します。相互作用理論では全 $n$ 点Schwinger関数の対称性・正則性・反射陽性、複素積分の極や切断、正則化と極限を追加で検査しなければなりません。有限モードの成功は一般の再構成定理の証明ではありません。
<!-- solution-end -->

## 7. まとめと次の問い

自由場ではEuclid作用の正の二次形式から $C_E(\tau,\boldsymbol p)=e^{-\omega_{\boldsymbol p}|\tau|}/(2\omega_{\boldsymbol p})$ が現れ、複素時間の境界値でFeynman核に戻ります。しかしこの対応には時間順序、極の配置、積分路の無限遠、解析接続の存在が関わります。反射陽性はEuclid相関関数から正のノルムを復元するための独立した条件であり、Fourier変換が正であるだけでは代用できません。

次は生成汎関数から連結Green関数を取り出し、Legendre変換で1粒子既約（1PI）有効作用を導入します。そこでも形式的な汎関数微分と、正則化後に意味を持つ計算とを区別します。
