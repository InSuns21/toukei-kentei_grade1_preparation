# QFT40 標準模型のカイラルゲージ異常・三角係数と相殺条件

[QFT35の標準模型の表現表](../QFT35/index.md#def-qft35-representation)は、どのフェルミオンがどのゲージ場に結合するかを決めました。[QFT39の軸性Ward恒等式](../QFT39/index.md#thm-qft39-axial-ward-anomaly)では、古典作用が対称でも量子測度にJacobianが現れ得ることを確かめました。前講の軸性回転は**大域的な物理的対称性**でした。今度は局所ゲージ変換そのものに異常が残るかを問います。局所ゲージ対称性は同じ物理状態の冗長な記述を結ぶため、その破れを単に「新しい相互作用」として受け入れることはできません。

本講では、一ループ・摂動論における**局所ゲージ異常**の群論係数を導き、一世代の標準模型のフェルミオンがなぜ巧妙に相殺するかを、分数の超電荷まで計算します。異常係数をゼロにする検査と、全ての量子効果・大域的な整合性を証明することは区別します。

時空は四次元Minkowski空間、計量は $\eta=\operatorname{diag}(-1,1,1,1)$、$\hbar=c=1$ とします。摂動論の三角図または熱核計算では、[QFT20のEuclid化](../QFT20/index.md#def-qft20-euclidean-action)と[QFT39のEuclid正則化](../QFT39/index.md#def-qft39-regulated-jacobian)を使います。ゲージ群は局所Lie代数の段階で $SU(3)_c\times SU(2)_L\times U(1)_Y$ とし、$Q=T_3+Y$ は[超電荷の規約](../QFT35/index.md#def-qft35-hypercharge)に従います。$\operatorname{tr}_{\mathbf N}(t^at^b)=\delta^{ab}/2$ と正規化し、以下の異常検査ではフェルミオンを質量零として扱います。Higgs質量を持つ物理的な低エネルギー状態の記述と、ゲージ対称性の量子整合性を検査する紫外のカイラル場の一覧は別です。

## 1. 右巻き場をなぜ左巻きで数えるのか

一つの四成分Dirac場を左・右に分けるには[カイラリティ射影](../QFT32/index.md#def-qft32-chirality) $P_{L,R}=(1\mp\gamma^5)/2$ を使います。右巻きWeyl場の**電荷共役**とは、複素共役した内部表現に属する左巻き場として同じ自由度を言い直したものです。内部群の表現行列が $U_R$ なら共役場の行列は $U_R^*$ であり、$U(1)$ 位相 $e^{iY\beta}$ は $e^{-iY\beta}$ に変わります。新しい独立粒子を一つ増やす操作ではありません。

左巻きになることは、[QFT32の電荷共役スピノル](../QFT32/index.md#def-qft32-majorana)から直接確かめられます。Weyl表示で右成分だけを持つ $\Psi=(0,\xi_R)^T$ に電荷共役を施すと、スピノル添字に作用する $\varepsilon=i\sigma^2$ により

$$
\Psi^c=
\begin{pmatrix}\varepsilon\xi_R^*\\0\end{pmatrix},
\qquad P_L\Psi^c=\Psi^c.
$$

となります。内部群の $U_R$ はスピノル添字に作用しないので、$\xi_R\mapsto U_R\xi_R$ の下で $\varepsilon\xi_R^*\mapsto U_R^*(\varepsilon\xi_R^*)$ です。したがって「左巻きへの移行」と「内部表現の複素共役」は同じ電荷共役操作の二つの側面です。

<a id="def-qft40-left-handed-list"></a>

<!-- formal-statement-start -->
> **定義（異常計算のための左巻き場一覧）**
> 四次元のカイラルゲージ理論で、左巻きWeyl場 $\chi_L$ の内部群表現を $R$、右巻きWeyl場 $\xi_R$ の表現を $S$ とする。異常係数を数えるときは $\chi_L$ を $R$ のまま、$\xi_R$ を電荷共役した左巻き場 $\xi_R^c$ として**共役表現** $\overline S$ で数える。$U(1)$ 電荷 $Y$ は右巻き場を共役にすると $-Y$ に変わる。以下では全ての場をこの左巻き一覧で数える。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft40-left-handed-list -->
### 例：右巻き上クォークの三色を確認する

**定義の確認**： [QFT35の積群表示](../QFT35/index.md#def-qft35-representation)で $u_R$ は $(\mathbf3,\mathbf1)_{2/3}$ です。色変換を $u_R^a\mapsto (U_3)^a{}_b u_R^b$ と書くと、共役した左巻き場は $(u_R^c)^a\mapsto (U_3^*)^a{}_b (u_R^c)^b$、超電荷の位相は $e^{-2i\beta/3}$ です。従って $u_R^c$ は $(\overline{\mathbf3},\mathbf1)_{-2/3}$ に属します。色成分は三つのままで、右巻き場を元の一覧と共役一覧の両方へ加算してはいけません。
<!-- definition-example-end -->

一世代のフェルミオン全体は次の五種類です。色・弱成分数はスピノル成分数を**含まない**ので、同じ場を二度足しません。

| 左巻きとして数える場 | $(SU(3),SU(2))_Y$ | 色数 $d_3$ | 弱成分数 $d_2$ |
| --- | --- | ---: | ---: |
| $Q_L=(u_L,d_L)$ | $(\mathbf3,\mathbf2)_{1/6}$ | 3 | 2 |
| $u_R^c$ | $(\overline{\mathbf3},\mathbf1)_{-2/3}$ | 3 | 1 |
| $d_R^c$ | $(\overline{\mathbf3},\mathbf1)_{1/3}$ | 3 | 1 |
| $L_L=(\nu_L,e_L)$ | $(\mathbf1,\mathbf2)_{-1/2}$ | 1 | 2 |
| $e_R^c$ | $(\mathbf1,\mathbf1)_{1}$ | 1 | 1 |

ここでは[QFT35の最小標準模型](../QFT35/index.md#def-qft35-representation)と同様、独立な右巻きニュートリノを含めません。もし $(\mathbf1,\mathbf1)_0$ を加えても、以下の摂動的ゲージ異常の係数は変わりません。

## 2. 測度の異常から三つの生成子の跡へ

古典作用の局所対称性を検査するだけなら、[QFT35の共変微分](../QFT35/index.md#def-qft35-product-derivative)で十分でした。しかしフェルミオンの積分を行うと、[QFT19のBerezin測度](../QFT19/index.md#def-qft19-berezin)が変数変換の逆行列式を受けます。右と左を同じ表現で含むベクトル型Dirac場ではゲージ測度の異常が相殺しますが、片方だけのWeyl場には一般に相殺相手がいません。

まず有限次元の行列の問題として群論係数を定義します。$T^A$ は、特定の左巻き場の内部表現空間に作用する**Hermitian生成子**です。$A,B,C$ はゲージ群のLie代数基底の添字（$SU(3)$ の8個、$SU(2)$ の3個、$U(1)$ の1個）を動き、時空添字ではありません。$U(1)$ の生成子は当該場の $YI$ とします。

<a id="def-qft40-cubic-anomaly-tensor"></a>

<!-- formal-statement-start -->
> **定義（三角異常の対称三次跡）**
> 有限次元ユニタリ表現 $R$ に属する左巻きWeyl場について、生成子 $T_R^A$ により

$$
d_R^{ABC}=\operatorname{tr}_R\!\left(T_R^A\{T_R^B,T_R^C\}\right),
\qquad \{X,Y\}=XY+YX
$$

> と定める。複数の左巻き場の一覧 $\mathscr F_L$ の**三角異常テンソル**を

$$
\mathscr D^{ABC}=\sum_{f\in\mathscr F_L}d_{R_f}^{ABC}
$$

> とする。各跡は色・弱などの全内部添字を含み、同一表現が他因子の多重度を持てばその次元を掛ける。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft40-cubic-anomaly-tensor -->
### 例：一つの $U(1)$ では電荷の三乗になる

**定義の確認**：一成分の左巻き場の $U(1)$ 電荷を $q$ とすれば生成子は $T=q$ なので、$\{q,q\}=2q^2$、従って $d^{YYY}=2q^3$ です。電荷 $1$ の左巻き場と電荷 $-1$ の左巻き場なら $2(1)^3+2(-1)^3=0$。一方、電荷 $(1,1,-2)$ の三場は和が零でも $2(1+1-8)=-12$ です。**電荷の一次和をゼロにしただけでは三次異常を消せません。**
<!-- definition-example-end -->

<a id="prop-qft40-triangle-factor"></a>

<!-- formal-statement-start -->
> **命題（一ループ局所異常の群論係数）**
> 四次元の質量零Weyl場が滑らかな外部ゲージ場に結合する摂動論を考え、三角図の局所的・パリティ奇の寄与を扱う。ベクトル型の接触項を適切に区別した一ループ局所ゲージWard恒等式の異常候補は、ゲージ生成子の添字について $\mathscr D^{ABC}$ に比例する。従って、全ての $\mathscr D^{ABC}=0$ なら**一ループの摂動的三角ゲージ異常は相殺**する。逆に非零の独立な係数があれば、その三角異常を全て消すことはできない。これは大域ゲージ異常、非摂動的存在、任意ループ次数の全ての整合性を保証する主張ではない。
<!-- formal-statement-end -->

### 証明の見取り図

[QFT39のFujikawa熱核](../QFT39/index.md#thm-qft39-fujikawa-abelian)の核心は、カイラリティ行列と四つの $\gamma$ 行列の跡が反対称テンソルを作り、背景曲率が**二回**現れることでした。ゲージ変換の生成子 $T^A$ を同じ局所トレースへ挿入すると、曲率の二つの生成子 $T^B,T^C$ が加わります。曲率二つの時空添字対を交換しても積が変わらないため、内部係数は反交換子になります。共変異常と、有効作用の変分として定義する整合的異常とでは局所係数や接触項の配分が異なりますが、相殺を決めるこの対称三次跡は共通です。

<!-- proof-start -->
### 証明

四次元Euclidで $\nabla_\mu=\partial_\mu+iA_\mu^AT^A$、$\mathcal D_E=\gamma_E^\mu\nabla_\mu$ と置き、$F_{\mu\nu}=F_{\mu\nu}^AT^A$ を $[\nabla_\mu,\nabla_\nu]=iF_{\mu\nu}$ で定めます。ここで $\mu,\nu=1,\ldots,4$ はEuclidの時空添字で、$A$ は第2節冒頭の内部生成子添字です。[QFT39のEuclid規約と熱核計算](../QFT39/index.md#thm-qft39-fujikawa-abelian)に従い、$\Gamma_5=\gamma_E^1\gamma_E^2\gamma_E^3\gamma_E^4$（Minkowskiの $\gamma^5$ と記法を区別）を用います。同じ二乗計算より

$$
\mathcal D_E^2=\nabla_\mu\nabla_\mu+
\frac{i}{4}[\gamma_E^\mu,\gamma_E^\nu]F_{\mu\nu}.
$$

熱核は $K=-\mathcal D_E^2$ に対する $e^{-K/M^2}$ です。$B=(i/4)[\gamma_E^\mu,\gamma_E^\nu]F_{\mu\nu}$ と置くと、局所短時間展開で $\Gamma_5$ を挿入した跡のうち、$B$ を零回または一回選ぶ項はClifford行列の個数が足りず消えます。最初に残る候補は $B^2/(2M^4)$ であり、

$$
\frac{B^2}{2M^4}
=-\frac{1}{32M^4}
[\gamma_E^\mu,\gamma_E^\nu]
[\gamma_E^\rho,\gamma_E^\sigma]
F_{\mu\nu}^BF_{\rho\sigma}^C T^BT^C
$$

です。$\Gamma_5$ を含むスピノル跡は

$$
\operatorname{tr}_{\rm spin}\!\left(
\Gamma_5[\gamma_E^\mu,\gamma_E^\nu]
[\gamma_E^\rho,\gamma_E^\sigma]\right)
\propto\varepsilon^{\mu\nu\rho\sigma}
$$

であり、運動量積分は

$$
\int_{\mathbb R^4}\frac{d^4p}{(2\pi)^4}e^{-p^2/M^2}
=\frac{M^4}{16\pi^2}.
$$

よってパリティ奇の局所項の群論部分は、零でない共通の数値係数を除き、

$$
\varepsilon^{\mu\nu\rho\sigma}
F_{\mu\nu}^BF_{\rho\sigma}^C
\operatorname{tr}_R(T^AT^BT^C).
$$

$(\mu,\nu,B)\leftrightarrow(\rho,\sigma,C)$ で $\varepsilon$ の符号は変わらず、二つの実数の曲率成分も交換するため、最後の跡は

$$
\frac12\operatorname{tr}_R\bigl(T^A(T^BT^C+T^CT^B)\bigr)
=\frac12d_R^{ABC}
$$

に置き換わります。右巻きWeyl場ではカイラリティ射影の符号が反転します。右巻きの代わりに共役左巻き場を数えたとき、$\overline T^A=-(T^A)^*$ なので、対称三次跡は元の表現の負になります。独立なフェルミオンの一ループ寄与は足し算であり、結果は $\mathscr D^{ABC}$ に比例します。

ここで熱核の共変形の局所係数を、そのまま整合的ゲージ変分の係数と同一視してはいけません。三角図の三つの外線の対称化と接触項の取り方で両者の係数は異なります。この命題は、どちらの異常でも**対称三次跡が零なら相殺する**という判定を述べています。
<!-- proof-end -->

## 3. 積群ではどの異常を検査するか

$SU(N)$ の非自明な基本生成子は跡が零なので、一つの非可換生成子と二つの $U(1)$ 生成子を挿入すると $\operatorname{tr}(T^aY^2)=Y^2\operatorname{tr}(T^a)=0$ です。色 $SU(3)$ と弱 $SU(2)$ の生成子を一つずつ混ぜても、どちらかの因子の生成子の跡が零なので候補は消えます。

残る独立な種類を列挙します。$T(\mathbf N)=T(\overline{\mathbf N})=1/2$ を $\operatorname{tr}_R(t^at^b)=T(R)\delta^{ab}$ で定義します。

積表現 $R_3\otimes R_2$ で色生成子は $t_{R_3}^a\otimes I_{R_2}$、超電荷生成子は $Y I_{R_3}\otimes I_{R_2}$ です。[QFT35のテンソル積表示](../QFT35/index.md#def-qft35-representation)と、有限行列の跡 $\operatorname{tr}(X\otimes Z)=\operatorname{tr}X\,\operatorname{tr}Z$ から

$$
\begin{aligned}
\operatorname{tr}_{R_3\otimes R_2}
\bigl((t^a\otimes I)(t^b\otimes I)(YI\otimes I)\bigr)
&=Y\operatorname{tr}_{R_3}(t^at^b)\operatorname{tr}_{R_2}(I)\\
&=d_2\,Y\,T(R_3)\delta^{ab},\\
\operatorname{tr}_{R_3\otimes R_2}((YI)^3)&=d_3d_2Y^3.
\end{aligned}
$$

弱生成子二つのときは色・弱を入れ替えます。反交換子による共通因子 $2$ は零判定を変えないので、以下の縮約係数では除きます。

| 三角図のゲージ脚 | 検算する縮約係数（一世代） |
| --- | --- |
| $SU(3)_c^3$ | $\sum_f d_2(f)\,d_{R_3(f)}^{abc}$ |
| $SU(2)_L^3$ | $\sum_f d_3(f)\,d_{R_2(f)}^{IJK}$ |
| $SU(3)_c^2U(1)_Y$ | $\sum_f d_2(f)Y_fT(R_3(f))$ |
| $SU(2)_L^2U(1)_Y$ | $\sum_f d_3(f)Y_fT(R_2(f))$ |
| $U(1)_Y^3$ | $\sum_f d_3(f)d_2(f)Y_f^3$ |

色・弱一重項の $T$ と $d^{abc}$ は零としました。さらに曲がった背景での**混合重力–超電荷異常**には $\sum_f d_3(f)d_2(f)Y_f$ の検査があります。これは三つのゲージ脚の三角図とは違い、二つの重力脚を含むため、本講では群論係数だけを確かめます。

<a id="prop-qft40-nonabelian-cubic"></a>

<!-- formal-statement-start -->
> **命題（基本・反基本と弱二重項の三次跡）**
> $SU(3)$ の基本表示の生成子 $t^a$ をHermitianとし、規格化を次のように固定する。反基本表示の対称三次跡は基本表示の負となる。

$$
\operatorname{tr}(t^at^b)=\frac{\delta^{ab}}2,\qquad
d_{\overline{\mathbf3}}^{abc}=-d_{\mathbf3}^{abc}.
$$

> また、$SU(2)$ の基本二重項で $t^I=\sigma^I/2$ とすると、全ての $I,J,K\in\{1,2,3\}$ について次が成り立つ。

$$
d_{\mathbf2}^{IJK}=0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

反基本では生成子がマイナス複素共役になるので、三次積のマイナスが残ります。弱二重項ではPauli行列の反交換子が恒等行列になるため、最後の生成子の跡が消えます。

<!-- proof-start -->
### 証明

反基本において $\overline t^a=-(t^a)^*$ です。元の $t^a$ はHermitianなので $\operatorname{tr}(t^a\{t^b,t^c\})$ は実数です。実際、複素共役すると $\operatorname{tr}(\{t^b,t^c\}t^a)$ となり、跡の巡回性で元に戻ります。従って

$$
\begin{aligned}
d_{\overline{\mathbf3}}^{abc}
&=\operatorname{tr}\left((-t^a)^*\{(-t^b)^*,(-t^c)^*\}\right)\\
&=-\left[\operatorname{tr}(t^a\{t^b,t^c\})\right]^*
=-d_{\mathbf3}^{abc}.
\end{aligned}
$$

$SU(2)$ では $\{\sigma^J,\sigma^K\}=2\delta^{JK}I_2$ なので $\{t^J,t^K\}=\delta^{JK}I_2/2$。これを定義へ入れると

$$
d_{\mathbf2}^{IJK}
=\frac{\delta^{JK}}2\operatorname{tr}\frac{\sigma^I}{2}=0
$$

です。最後の等号は全てのPauli行列が跡零であることによります。
<!-- proof-end -->

## 4. 標準模型の一世代が相殺する理由

<a id="thm-qft40-standard-model-cancellation"></a>

<!-- formal-statement-start -->
> **定理（最小標準模型の一世代の摂動的ゲージ異常相殺）**
> 第1節の五種類の左巻きWeyl場を、表に記した $SU(3)_c\times SU(2)_L\times U(1)_Y$ 表現にそれぞれ一個ずつ取る。三角異常テンソルを[第2節の定義](#def-qft40-cubic-anomaly-tensor)とすると、全てのゲージ添字 $A,B,C$ に対して $\mathscr D^{ABC}=0$ となる。さらに混合重力–$U(1)_Y$ 異常の電荷一次和も零である。従ってこの一世代について一ループの**摂動的局所ゲージ異常候補**は相殺する。ただし大域異常や理論全体の量子構成はこの定理の結論ではない。
<!-- formal-statement-end -->

### 証明の見取り図

非可換三次では「色の基本二個と反基本二個」、$SU(2)$ ではPauli行列の跡零を使います。混合二種類と超電荷三次は**色数・弱成分数を掛けた後**に有理数として加算します。Higgsはスカラーなのでカイラルフェルミオンの三角異常には加えません。

<!-- proof-start -->
### 証明

第1節の一覧で、$Q_L$ は**弱二重項なので色基本が二個**、$u_R^c,d_R^c$ は色反基本がそれぞれ一個です。[三次跡の命題](#prop-qft40-nonabelian-cubic)より

$$
\mathscr D_{SU(3)^3}^{abc}
=2d_{\mathbf3}^{abc}+d_{\overline{\mathbf3}}^{abc}
+d_{\overline{\mathbf3}}^{abc}
=(2-1-1)d_{\mathbf3}^{abc}=0.
$$

$SU(2)^3$ は各二重項ごとに $d_{\mathbf2}^{IJK}=0$。従って三色の $Q_L$ と一色の $L_L$ の各寄与も零です。

二つの色脚と一つの超電荷脚では、色の基本・反基本の二次指数はいずれも $1/2$ です。弱多重度を含めて

$$
\begin{aligned}
C_{33Y}
&=2\frac16\frac12
+\left(-\frac23\right)\frac12
+\frac13\frac12\\
&=\frac16-\frac13+\frac16=0.
\end{aligned}
$$

二つの弱脚と一つの超電荷脚では、$Q_L$ の三色を掛けます。

$$
C_{22Y}=3\frac16\frac12+\left(-\frac12\right)\frac12
=\frac14-\frac14=0.
$$

超電荷の三次係数では、色と弱の両方の成分を数えるので

$$
\begin{aligned}
C_{YYY}
&=6\left(\frac16\right)^3
+3\left(-\frac23\right)^3
+3\left(\frac13\right)^3
+2\left(-\frac12\right)^3+1^3\\
&=\frac1{36}-\frac89+\frac19-\frac14+1\\
&=\frac{1-32+4-9+36}{36}=0.
\end{aligned}
$$

混合重力–超電荷の一次和も、同じ多重度から

$$
C_{\mathrm{grav\,grav}\,Y}
=6\frac16+3\left(-\frac23\right)
+3\frac13+2\left(-\frac12\right)+1
=1-2+1-1+1=0.
$$

これ以外の混合三角係数は、別の単純因子の単独生成子の跡零または $SU(3)$、$SU(2)$ の単純性によって消えます。従って[三角係数の命題](#prop-qft40-triangle-factor)の零条件が満たされます。
<!-- proof-end -->

### 何が「奇跡」で何が計算なのか

古典的なゲージ不変性は各場の運動項について[QFT35の共変性定理](../QFT35/index.md#thm-qft35-kinetic-covariance)で確認できました。しかしそこで五種類の超電荷を任意に変えても、表現を作れる場合があります。量子論で三次係数まで相殺させるには、互いに異なる場の電荷が上の有理数等式を満たさなければなりません。例えば $e_R^c$ を除くと $C_{YYY}=-1$、一次和も $-1$ になり、局所異常を残します。**一つの種だけ見れば異常があり、世代全体を足すと消える**のが主眼です。

## 5. 相殺しても残る問い

三世代は同じゲージ表現の繰り返しなので、[QFT37の世代基底変換](../QFT37/index.md#thm-qft37-ckm-current)でCKM行列が現れても、有限次元跡の基底不変性 $\operatorname{tr}(U^{-1}XU)=\operatorname{tr}X$ は変わりません。各世代の零を足せばやはり零です。これは質量行列の対角化を三角異常の新しい寄与として重複して数えない、という意味でもあります。

ただし $SU(2)$ には、Lie代数の微小変換の三角図では見えない**大域ゲージ異常**が知られています。四次元で基本二重項の左巻きWeyl場の個数が奇数だと、特定の大きなゲージ変換でフェルミオン行列式の符号が変わる（[Wittenの $SU(2)$ 異常](https://doi.org/10.1016/0370-2693(82)90728-6)）という別の結果です。最小標準模型では $Q_L$ の色三個と $L_L$ の一個で**一世代あたり四二重項**なので、この既知の偶奇条件に反しません。ただしこの偶奇定理の証明にはここで扱わない大域トポロジーとDirac作用素のスペクトル流が必要です。本講はその定理を証明したとは主張しません。

また、混合重力–$U(1)$ 係数の零は湾曲背景で生じ得る局所異常の**必要な群論検査**であり、一般の曲がった時空上の量子場の構成を済ませたことにはなりません。ゲージ異常相殺は[QFT39の大域軸性異常](../QFT39/index.md#thm-qft39-axial-ward-anomaly)が消えることも意味しません。大域軸性回転と冗長なゲージ変換には別々のWard恒等式があります。

## 6. 演習：場を一つずつ数えて相殺を検算する

以下は、示した公式を丸暗記する問題ではなく、左巻きの数え直し・表現の跡・有理数の加算を別設定でもできるかを問います。全問で $T(\mathbf3)=T(\overline{\mathbf3})=T(\mathbf2)=1/2$ とします。

### 演習 QFT40-A1：右巻きの共役表現

- Level: A
- 問題：$SU(3)\times U(1)$ の右巻きWeyl場 $\xi_R$ が $(\mathbf3)_{-1/3}$ に属し、$\xi_R\mapsto e^{-i\beta/3}U_3\xi_R$ と変換する。共役左巻き場 $\xi_R^c$ の表現と $U(1)$ 電荷を書き、色成分の数を述べよ。

<!-- solution-start -->
### 詳細解答

$\xi_R^c$ の変換行列は $e^{+i\beta/3}U_3^*$ です。$U_3^*$ は反基本の行列なので $\xi_R^c:(\overline{\mathbf3})_{+1/3}$。色成分は $3$ 個であり、共役をとっても成分数は $6$ 個にはなりません。右巻きと共役左巻きを両方数えると、同じ自由度を二回加えてしまいます。
<!-- solution-end -->

### 演習 QFT40-A2：一次和と三次和

- Level: A
- 問題：$U(1)$ の左巻きWeyl場三つが電荷 $1,1,-2$ を持つ。一次和と三次和をそれぞれ求め、どちらの零が三角ゲージ異常の検査になるか述べよ。

<!-- solution-start -->
### 詳細解答

一次和は $1+1-2=0$。三次和は $1^3+1^3+(-2)^3=1+1-8=-6$ です。[対称三次跡](#def-qft40-cubic-anomaly-tensor)は一成分の場では $2Y^3$ なので全体では $-12$。三角ゲージ異常に関する零条件は**三次和**であり、この模型は不合格です。一次和の零だけからカイラルゲージ理論の局所整合性は従いません。
<!-- solution-end -->

### 演習 QFT40-A3：弱二重項の混合異常

- Level: A
- 問題：左巻きの弱二重項が三色分あり超電荷 $1/6$、別に無色の弱二重項が一つあり超電荷 $-1/2$ とする。$SU(2)^2U(1)$ の縮約係数を求めよ。

<!-- solution-start -->
### 詳細解答

各基本二重項の二次指数は $T(\mathbf2)=1/2$ です。三色側は $3(1/6)(1/2)=1/4$、無色側は $1(-1/2)(1/2)=-1/4$。足して $C_{22Y}=0$ です。二重項の**成分数2**を二次指数に追加で掛けるのは誤りです。弱添字の跡は既に $T(\mathbf2)$ に含まれます。
<!-- solution-end -->

### 演習 QFT40-A4：色の混合異常

- Level: A
- 問題：左巻き場 $Q_L:(\mathbf3,\mathbf2)_{1/6}$ と $u_R^c:(\overline{\mathbf3},\mathbf1)_{-2/3}$ と $d_R^c:(\overline{\mathbf3},\mathbf1)_{1/3}$ の $SU(3)^2U(1)$ 係数を求めよ。

<!-- solution-start -->
### 詳細解答

色の二次指数は基本・反基本とも $1/2$、$Q_L$ だけは弱二重項なので二倍です。従って

$$
C_{33Y}=2\frac16\frac12-\frac23\frac12+\frac13\frac12
=\frac16-\frac13+\frac16=0.
$$

反基本への変換は**超電荷を反転**しますが、二次指数自体を負にはしません。三次跡の符号反転とは区別します。
<!-- solution-end -->

### 演習 QFT40-A5：色の三次跡

- Level: A
- 問題：$d_{\overline{\mathbf3}}^{abc}=-d_{\mathbf3}^{abc}$ を用い、第A4問の三種類が $SU(3)^3$ に与える対称三次跡の和を計算せよ。

<!-- solution-start -->
### 詳細解答

$Q_L$ は弱二成分それぞれが色基本なので $2d_{\mathbf3}^{abc}$、$u_R^c$ と $d_R^c$ はそれぞれ $-d_{\mathbf3}^{abc}$ です。合計は $(2-1-1)d_{\mathbf3}^{abc}=0$。$SU(3)^2U(1)$ で使った二次指数 $T(\overline{\mathbf3})=+1/2$ を、誤って三次の符号に流用してはいけません。
<!-- solution-end -->

### 演習 QFT40-B1：超電荷三次の全成分計算

- Level: B
- 問題：第1節の五種類の左巻き場について、色数・弱成分数を掛けた $U(1)_Y^3$ の縮約係数を一行ずつ計算し、総和を通分して検証せよ。

<!-- solution-start -->
### 詳細解答

各場の寄与は順に $Q_L:6(1/6)^3=1/36$、$u_R^c:3(-2/3)^3=-8/9$、$d_R^c:3(1/3)^3=1/9$、$L_L:2(-1/2)^3=-1/4$、$e_R^c:1^3=1$ です。分母36に揃えると

$$
C_{YYY}=\frac{1-32+4-9+36}{36}=\frac0{36}=0.
$$

右巻き場を正の $2/3$、負の $-1/3$、負の $-1$ のまま加えると、共役化による符号反転を落とすことになります。$Q_L$ の多重度6も不可欠です。
<!-- solution-end -->

### 演習 QFT40-B2：三次異常と混合重力異常を区別する

- Level: B
- 問題：左巻きWeyl場の $U(1)$ 電荷が $(1,1,-2)$ の場合と $(1,-1)$ の場合について、$\sum_fY_f$ と $\sum_fY_f^3$ を比較せよ。前者が後者と異なる結論になる理由を述べよ。

<!-- solution-start -->
### 詳細解答

$(1,1,-2)$ では $\sum Y=0$ ですが $\sum Y^3=1+1-8=-6$。$(1,-1)$ では $\sum Y=1-1=0$、$\sum Y^3=1-1=0$。前者では混合重力–$U(1)$ の群論係数だけが零で、三角ゲージ異常は残ります。後者は反対電荷のベクトル型の組として両係数が相殺します。線形の制約と三次の制約は独立なので、一次の打消しを三次に流用できません。
<!-- solution-end -->

### 演習 QFT40-B3：$SU(2)^3$ と二重項の偶奇

- Level: B
- 問題：最小標準模型の一世代に含まれる $SU(2)$ 基本二重項を色多重度付きで数え、(i) 摂動的三次係数、(ii) 既知のWitten偶奇条件についての判定を述べよ。両者は同じ証明か。

<!-- solution-start -->
### 詳細解答

$Q_L$ は三色で三個の二重項、$L_L$ は一個なので計四個です。(i) Pauli行列より $\{t^J,t^K\}=\delta^{JK}I_2/2$、従って各二重項で $\operatorname{tr}(t^I\{t^J,t^K\})=(\delta^{JK}/2)\operatorname{tr}t^I=0$。四個の和も零です。(ii) 二重項数 $4$ は偶数で既知のWitten条件に反しません。ただし(ii)は大きなゲージ変換に関する外部の非摂動的結果を**適用**したのであって、(i)の有限行列の跡計算で(ii)を証明したわけではありません。
<!-- solution-end -->

### 演習 QFT40-B4：Dirac対と大域軸性異常

- Level: B
- 問題：同じ $U(1)$ 電荷 $q\ne0$ の左巻き・右巻きWeyl場一つずつから質量零Dirac場を作る。ゲージ異常の三次和と、背景曲率が非零の場合の大域軸性異常が同じ意味で消えるかを判定せよ。

<!-- solution-start -->
### 詳細解答

ゲージ異常の一覧では左巻き電荷 $q$ と、右巻きの共役左巻き電荷 $-q$ を数えるので $C_{YYY}=q^3+(-q)^3=0$ です。しかし大域軸性回転は、元のDirac場の左右成分を**逆方向**に回します。[QFT39の熱核係数](../QFT39/index.md#thm-qft39-fujikawa-abelian)のJacobianでは $\psi$ と $\bar\psi$ の両方から同符号の寄与が加わり、曲率の $\varepsilon FF$ が非零なら軸性Ward恒等式の異常項は一般に非零です。従ってゲージ異常の相殺と大域軸性電流の保存は別の条件です。
<!-- solution-end -->

### 演習 QFT40-C1：一世代の全異常検査を最初から

- Level: C
- 問題：四次元の左巻きWeyl場を $(\mathbf3,\mathbf2)_{1/6}$、$(\overline{\mathbf3},\mathbf1)_{-2/3}$、$(\overline{\mathbf3},\mathbf1)_{1/3}$、$(\mathbf1,\mathbf2)_{-1/2}$、$(\mathbf1,\mathbf1)_{1}$ に一つずつ置く。$T(\mathbf3)=T(\overline{\mathbf3})=T(\mathbf2)=1/2$、$d_{\overline{\mathbf3}}=-d_{\mathbf3}$、$d_{\mathbf2}=0$ を使って、(i) $SU(3)^3$ と $SU(2)^3$、(ii) $SU(3)^2U(1)$ と $SU(2)^2U(1)$、(iii) $U(1)^3$、(iv) 混合重力–$U(1)$ の群論係数を検算せよ。最後にこの検算だけでは未解決の整合性問題を一つ示せ。

<!-- solution-start -->
### 詳細解答

1. (i) 色三次では弱多重度を数えて $(2-1-1)d_{\mathbf3}=0$。弱三次では $\mathbf2$ の対称三次跡がそれぞれ零なので、三色の $Q_L$ と $L_L$ の和も零です。これは生成子の数に依存せず全成分で成立します。
2. (ii) 色二次には弱二重項の2を掛け、$(2/6-2/3+1/3)/2=(1/3-2/3+1/3)/2=0$。弱二次には色三個を掛け、$(3/6-1/2)/2=(1/2-1/2)/2=0$ です。基本・反基本の二次指数はいずれも正です。
3. (iii) 超電荷三次は各場の内部成分数が $(6,3,3,2,1)$ なので

$$
6/216-3(8/27)+3/27-2/8+1
=1/36-8/9+1/9-1/4+1=0.
$$

4. (iv) 一次和は $6/6-3(2/3)+3(1/3)-2(1/2)+1=1-2+1-1+1=0$。単独の非可換生成子の跡は零なので、この他の混合ゲージ三角係数は残りません。

以上から[三角係数の命題](#prop-qft40-triangle-factor)によって一ループの摂動的局所ゲージ異常候補は相殺します。しかし大きなゲージ変換に関するWitten異常は三次跡からは判定できません。今回は四二重項なので既知の偶奇条件には反しないものの、一般の場合の証明には大域的な情報が要ります。
<!-- solution-end -->

## 7. まとめと次の問い

- 右巻きWeyl場は共役左巻き表現で数えると、ゲージ異常の符号を一つの跡の和へまとめられます。
- 一ループ局所三角異常の群論的な零条件は、三つの生成子の**対称三次跡**です。$SU(3)^3$、$SU(2)^3$、$SU(3)^2U(1)$、$SU(2)^2U(1)$、$U(1)^3$ を調べます。
- 最小標準模型では色・弱多重度と超電荷を全部数えると、各係数は一世代ごとに零になります。
- 摂動的局所ゲージ異常の相殺は、大域異常や非摂動的理論構成の証明ではありません。

次は、相殺が成り立った非可換色ゲージ理論を物理的な強相互作用へ接続し、QCDの色・頂点・走る結合と摂動論の限界を調べます。
