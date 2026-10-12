# SM6 量子統計と量子理想気体

[SM5の古典理想気体](../SM5/index.md#def-sm5-phase-gas)では、連続的な位置と運動量の積分を $N!$ で割る規約を採用しました。この計数では $\rho\lambda_T^3\ll1$ が近似の目安でした。ところが温度を下げると、熱的波長 $\lambda_T$ は大きくなり、粒子を互いに離れた古典的な点として数える方法が破綻します。なぜ同じ質量の粒子でも、ある気体では低エネルギー準位に大量に集まり、別の気体では一準位に一粒子までしか入れないのでしょうか。

量子力学では [QM2のBorn則](../../../解析系/QM/QM2/index.md#axiom-qm2-born-rule)に従って測定確率を扱います。ただし**同種粒子を交換したときの対称性**は、Born則や古典的な $1/N!$ から導くのではなく、量子理論が採用する追加の物理的入力です。整数スピン粒子をBose型、半整数スピン粒子をFermi型として扱う対応の一般的な証明（スピン統計定理）は相対論的量子場理論を要するため、この章では前提にしません。本章で証明するのは、その統計規則を**採用した後**の数え上げと熱力学です。

まず準位を有限個にして全計算を有限和・収束する幾何級数で閉じ、後半で三次元自由粒子の熱力学極限を取ります。量子統計と古典統計の差が消える条件、消えない条件を区別します。

## 1. 同種粒子は「どの粒子か」ではなく「何個いるか」で数える

一粒子の互いに直交する量子状態をモード $j$ と呼び、そのエネルギーを $\varepsilon_j$ とします。縮退した準位でも直交する状態一つずつを別モードに数えます。たとえば同じエネルギー $\varepsilon$ を持つ二つのスピン状態があれば、二モードです。粒子間相互作用がないとき、配置 $\boldsymbol n=(n_j)$ のエネルギーと粒子数はそれぞれ $\sum_j\varepsilon_j n_j$、$\sum_jn_j$ です。

Bose型では各モードの粒子数は $0,1,2,\ldots$、Fermi型では $0,1$ に限ります。この規則は波動関数の交換対称・反対称性の結果に対応しますが、有限モードの統計模型としては次のように明示的に定義できます。個々の粒子へ名前を付け、その並べ替えを別配置として数えることはしません。

<a id="def-sm6-occupation"></a>

<!-- formal-statement-start -->
> **定義（Bose型・Fermi型の有限モード占有模型）**  
> 有限非空集合 $J$、各 $j\in J$ の実数 $\varepsilon_j$、温度 $T>0$、化学ポテンシャル $\mu\in\mathbb R$ を取る。$\beta=(k_{\mathrm B}T)^{-1}$ とする。Bose型の配置空間を $\mathcal N_{\mathrm B}=\mathbb N_0^J$、Fermi型を $\mathcal N_{\mathrm F}=\{0,1\}^J$ とする。配置 $\boldsymbol n$ について

$$
N(\boldsymbol n)=\sum_{j\in J}n_j,\qquad
H(\boldsymbol n)=\sum_{j\in J}\varepsilon_jn_j
$$

> と置く。大分配関数と大正準確率を

$$
\Xi=\sum_{\boldsymbol n\in\mathcal N}
\exp[-\beta(H(\boldsymbol n)-\mu N(\boldsymbol n))],
\qquad
\mathbb P(\boldsymbol n)=
\frac{\exp[-\beta(H-\mu N)]}{\Xi}
$$

> と定める。ただしBose型では $\mu<\min_{j\in J}\varepsilon_j$、Fermi型では任意の実数 $\mu$ を許す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sm6-occupation -->
### 直接例：一つの零エネルギーモード

**定義の確認**：$J=\{0\}$、$\varepsilon_0=0$ とします。Bose型で $\mu<0$ とすれば $q=e^{\beta\mu}\in(0,1)$、配置は $n_0=0,1,2,\ldots$ です。その重みは $1,q,q^2,\ldots$ で、総和は $(1-q)^{-1}$ です。Fermi型では配置が $n_0=0,1$ だけなので、重みは $1,q$、総和は $1+q$。**一つのモードに二粒子を置けるか**という違いだけで、二つの分配関数は変わります。
<!-- definition-example-end -->

Bose型の制約 $\mu<\varepsilon_{\min}$ は数学的に必要です。もしあるモードで $\mu\ge\varepsilon_j$ なら、そのモードの重みの比は1以上となり、$n_j$ についての級数は発散して確率の規格化ができません。Fermi型では和が各モードにつき二項しかないので、その制約はありません。

## 2. 大分配関数をモードごとに因数分解する

[SM4の有限大正準アンサンブル](../SM4/index.md#def-sm4-grand-ensemble)は粒子数の異なる状態へ重みを付けました。ここではBose型でも無限和が現れますが、各モードで収束条件を確かめれば同じ確率の構成ができます。

<a id="prop-sm6-factorization"></a>

<!-- formal-statement-start -->
> **命題（量子理想気体の大分配関数）**  
> [有限モード占有模型](#def-sm6-occupation)の下で $q_j=e^{-\beta(\varepsilon_j-\mu)}$ と置く。Bose型では $0<q_j<1$、Fermi型では $q_j>0$ であり、

$$
\Xi_{\mathrm B}=\prod_{j\in J}\frac1{1-q_j},
\qquad
\Xi_{\mathrm F}=\prod_{j\in J}(1+q_j).
$$

> 各モードの占有数は、大正準確率の下で互いに独立である。
<!-- formal-statement-end -->

### 証明の見取り図

エネルギーと粒子数の両方がモードの和なので、指数を取ると積になります。**収束**を確認してから積と和を入れ替える点が大切です。

<!-- proof-start -->
### 証明

配置 $\boldsymbol n$ の重みは

$$
\exp\left[-\beta\sum_j(\varepsilon_j-\mu)n_j\right]
=\prod_{j\in J}q_j^{n_j}.
$$

$J$ は有限です。Bose型の各モードの和は $0<q_j<1$ より

$$
\sum_{n_j=0}^\infty q_j^{n_j}
=\lim_{M\to\infty}\frac{1-q_j^{M+1}}{1-q_j}
=\frac1{1-q_j}.
$$

非負項の多重和は有限個の収束する幾何級数の積なので、$\Xi_{\mathrm B}$ はそれらの積です。Fermi型は $n_j=0,1$ の二項和なので $\sum q_j^{n_j}=1+q_j$。規格化後の確率は、Bose型で

$$
\mathbb P_{\mathrm B}(\boldsymbol n)
=\prod_j(1-q_j)q_j^{n_j},
$$

Fermi型で

$$
\mathbb P_{\mathrm F}(\boldsymbol n)
=\prod_j\frac{q_j^{n_j}}{1+q_j}
$$

です。右辺が一変数確率質量関数の積であるため、独立性が従います。
<!-- proof-end -->

例えばエネルギー $\varepsilon_1=\varepsilon_2=0$ の二モードなら、Fermi型の固定二粒子配置は $(1,1)$ の一通りだけですが、Bose型では $(2,0),(1,1),(0,2)$ の三通りです。縮退の計数を忘れると、この違いを見失います。

## 3. Bose–Einstein分布とFermi–Dirac分布

[SM4の粒子数揺らぎ](../SM4/index.md#thm-sm4-number-cumulants)と同じく、規格化定数の対数微分で平均・分散を得られます。ここでは一モードの分布を直接足し上げ、微分結果だけに頼らず符号を確認します。

<a id="thm-sm6-occupations"></a>

<!-- formal-statement-start -->
> **定理（Bose–Einstein・Fermi–Dirac占有数と分散）**  
> [有限モード占有模型](#def-sm6-occupation)で、各モードの平均 $\bar n_j=\mathbb E[n_j]$ および分散は、Bose型で

$$
\bar n_j=\frac1{e^{\beta(\varepsilon_j-\mu)}-1},
\qquad
\operatorname{Var}(n_j)=\bar n_j(1+\bar n_j),
$$

> Fermi型で

$$
\bar n_j=\frac1{e^{\beta(\varepsilon_j-\mu)}+1},
\qquad
\operatorname{Var}(n_j)=\bar n_j(1-\bar n_j).
$$

> また独立性により $\mathbb E[N]=\sum_j\bar n_j$、$\operatorname{Var}(N)=\sum_j\operatorname{Var}(n_j)$ が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

Bose型は幾何分布、Fermi型はBernoulli分布です。Bose型では占有数の上限がなく、Fermi型では確率 $\bar n_j$ が1を超えません。

<!-- proof-start -->
### 証明

一モードの $q=q_j\in(0,1)$ に対し、幾何級数を $q$ で微分すると

$$
\sum_{n=1}^{\infty}nq^{n-1}=\frac1{(1-q)^2},
\qquad
\sum_{n=2}^{\infty}n(n-1)q^{n-2}=\frac2{(1-q)^3}.
$$

したがってBose型では

$$
\mathbb E[n]=(1-q)\sum_{n\ge0}nq^n
=\frac q{1-q},
\quad
\mathbb E[n(n-1)]=\frac{2q^2}{(1-q)^2},
$$

$$
\operatorname{Var}(n)
=\mathbb E[n(n-1)]+\mathbb E[n]-(\mathbb E[n])^2
=\frac{q}{(1-q)^2}.
$$

$\bar n=q/(1-q)$ と $1+\bar n=1/(1-q)$ を掛ければBose型の分散式です。Fermi型では

$$
\mathbb P(n=1)=\frac q{1+q},
\qquad
\mathbb P(n=0)=\frac1{1+q}.
$$

$n^2=n$ なので $\bar n=q/(1+q)$、分散は $\bar n-\bar n^2=\bar n(1-\bar n)$。最後に $q=e^{-\beta(\varepsilon-\mu)}$ の逆数を用いてそれぞれの平均式へ直します。異なるモードの共分散は[独立性](#prop-sm6-factorization)から0であり、和の平均・分散公式が従います。
<!-- proof-end -->

**典型的な誤り**：Fermi型の $\bar n_j\le1$ は「エネルギー $\varepsilon$ に最大一粒子」ではありません。同じエネルギーを持つモードが $g$ 個あれば、最大 $g$ 粒子が入ります。またBose型で $\mu\uparrow\varepsilon_{\min}$ とすると最低準位の $\bar n$ は発散しますが、これは有限容積・固定粒子数の気体が無限個の粒子を持つという意味ではありません。化学ポテンシャルを固定する大正準模型での発散です。

<a id="prop-sm6-grand-identities"></a>

<!-- formal-statement-start -->
> **命題（モード和と熱力学微分）**  
> [有限モード量子理想気体](#def-sm6-occupation)について $\beta>0$ と $\mu$ を固定する。$\Xi$ は正で、

$$
\mathbb E[N]=\frac1\beta\partial_\mu\log\Xi,
\qquad
\mathbb E[H]=-\left.\partial_\beta\log\Xi\right|_{z},
\qquad z=e^{\beta\mu},
$$

> が成り立つ。第2式の微分は $z$ 固定、すなわち $\beta\mu$ 固定とする。
<!-- formal-statement-end -->

### 証明の見取り図

[SM4の大分配関数微分](../SM4/index.md#thm-sm4-number-cumulants)の有限系での論法を、各モードでの収束によって延長します。特に $\mu$ 固定と $z$ 固定の違いに注意します。

<!-- proof-start -->
### 証明

$z=e^{\beta\mu}$ として重みは $z^{N}e^{-\beta H}$ です。各モードの因子は $\beta>0$ とBose型の収束条件の範囲で滑らかなので、対数を微分できます。$\partial_\mu(z^{N}e^{-\beta H})=\beta N z^Ne^{-\beta H}$、他方 $z$ を固定した $\beta$ 微分は $-Hz^Ne^{-\beta H}$ を与えます。規格化のため $\Xi$ で割ると、それぞれ $\beta\mathbb E[N]$ と $-\mathbb E[H]$ です。Bose型の項別微分は $q_j<1$ の幾何級数の微分で正当化されます。
<!-- proof-end -->

## 4. 連続準位を持つ三次元量子理想気体

有限準位の式を実際の気体へ移すには、単に準位の和を積分へ置き換えたと書くだけでは不十分です。立方体容器で周期境界条件を課すと、波数が格子点として具体化できます。自由粒子の波動関数 $e^{i\boldsymbol k\cdot\boldsymbol x}$ を用い、異なる波数・スピンを別モードと数えます。周期境界条件は壁の詳細を表すものではなく、体積当たりの極限を簡単にする模型上の選択です。

<a id="def-sm6-periodic-gas"></a>

<!-- formal-statement-start -->
> **定義（三次元周期境界量子理想気体）**  
> $L,m,\hbar,k_{\mathrm B},T>0$、$V=L^3$、整数 $g\ge1$ とする。一粒子モードを $(\boldsymbol\ell,s)\in\mathbb Z^3\times\{1,\ldots,g\}$ とし、波数とエネルギーを

$$
\boldsymbol k_{\ell}=\frac{2\pi}{L}\boldsymbol\ell,
\qquad
\varepsilon_{\ell}=\frac{\hbar^2|\boldsymbol k_{\ell}|^2}{2m}
$$

> とする。各モードの占有数は[有限モード占有模型](#def-sm6-occupation)と同じ統計則に従う。有限 $V$ のBose型は $\mu<0$、Fermi型は任意の $\mu\in\mathbb R$ を取る。熱的波長は

$$
\lambda_T=\frac{h}{\sqrt{2\pi mk_{\mathrm B}T}},
\qquad h=2\pi\hbar
$$

> とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sm6-periodic-gas -->
### 直接例：最小の波数殻

**定義の確認**：$\boldsymbol\ell=(0,0,0)$ のエネルギーは0で、スピン分だけ $g$ 個のモードがあります。$|\boldsymbol\ell|^2=1$ の格子点は $(\pm1,0,0)$ など6個で、それぞれに $g$ 個のモードがあります。この次の殻のエネルギーは $2\pi^2\hbar^2/(mL^2)$。したがって基底モードだけを一つと数えてよいのは $g=1$ のときです。
<!-- definition-example-end -->

有限 $L$ にモードが無限にありますが、$e^{-\beta\varepsilon_\ell}$ の総和は三次元Gaussian格子和として収束します。Fermi型では $\sum_\ell\log(1+ze^{-\beta\varepsilon_\ell})\le z\sum_\ell e^{-\beta\varepsilon_\ell}<\infty$。Bose型の $0<z<1$ では $-\log(1-x)\le x/(1-z)$（$0\le x\le z$）を使って同じ収束性を確認できます。従って全モードにわたる大分配関数の積がこの範囲で収束し、有限値を持ちます。

<a id="prop-sm6-density-of-states"></a>

<!-- formal-statement-start -->
> **命題（三次元自由粒子の状態密度）**  
> [周期境界量子理想気体](#def-sm6-periodic-gas)で $g$ は固定とする。連続で十分速く減衰する放射対称な試験関数 $f(\varepsilon)$ に対し、

$$
\lim_{L\to\infty}\frac gV
\sum_{\boldsymbol\ell\in\mathbb Z^3}
f(\varepsilon_\ell)
=\frac{g}{4\pi^2}
\left(\frac{2m}{\hbar^2}\right)^{3/2}
\int_0^\infty\sqrt{\varepsilon}\,f(\varepsilon)\,d\varepsilon.
$$

> 右辺で $d\varepsilon$ に掛かる係数は単位体積当たりの一粒子状態密度である。
<!-- formal-statement-end -->

### 証明の見取り図

波数格子のセル体積は $(2\pi/L)^3$ です。三次元の波数積分を球殻に直し、最後に $\varepsilon=\hbar^2k^2/(2m)$ へ変換します。

<!-- proof-start -->
### 証明

$F(\boldsymbol k)=f(\hbar^2|\boldsymbol k|^2/(2m))$ と置きます。仮定された減衰の下で格子Riemann和は

$$
\left(\frac{2\pi}{L}\right)^3
\sum_{\ell\in\mathbb Z^3}F(2\pi\ell/L)
\longrightarrow\int_{\mathbb R^3}F(\boldsymbol k)\,d^3k.
$$

これはまず有限半径の球内で通常のRiemann和を取ってから、減衰で球外の和と積分を同時に小さくして得られます。$V=L^3$ で割り、球面積を積分すると

$$
\frac gV\sum_\ell f(\varepsilon_\ell)
\longrightarrow\frac{g}{(2\pi)^3}4\pi
\int_0^\infty k^2 f\!\left(\frac{\hbar^2k^2}{2m}\right)\,dk.
$$

$\varepsilon=\hbar^2k^2/(2m)$ なら $k=\sqrt{2m\varepsilon}/\hbar$、$dk=\sqrt{2m}/(2\hbar\sqrt{\varepsilon})\,d\varepsilon$ なので

$$
k^2\,dk=\frac12\left(\frac{2m}{\hbar^2}\right)^{3/2}
\sqrt{\varepsilon}\,d\varepsilon.
$$

前の係数 $4\pi g/(2\pi)^3=g/(2\pi^2)$ と掛けて結論を得ます。
<!-- proof-end -->

**意味**：状態密度が $\sqrt{\varepsilon}$ に比例するのは三次元の球殻の幾何によります。一粒子の状態数が有限という意味ではありません。正の有限容積でも波数は無限個ですが、熱重みで抑えられるので分配関数は収束します。

## 5. 粒子密度・圧力・古典極限

Bose型の符号を $-$、Fermi型を $+$ とする積分表示で、二種類の気体をまとめて比較できます。積分の分母の符号は占有数の定理と一致するように定義します。

<a id="def-sm6-quantum-integrals"></a>

<!-- formal-statement-start -->
> **定義（Bose積分とFermi積分）**  
> $\nu>0$ とし、Bose型では $0<z\le1$、Fermi型では $z>0$ とする。積分が有限な場合に

$$
B_\nu(z)=\frac1{\Gamma(\nu)}
\int_0^\infty\frac{t^{\nu-1}}{z^{-1}e^t-1}\,dt,
\qquad
F_\nu(z)=\frac1{\Gamma(\nu)}
\int_0^\infty\frac{t^{\nu-1}}{z^{-1}e^t+1}\,dt
$$

> と定める。$B_\nu(1)$ は $\nu>1$ で有限であり、特に $B_{3/2}(1)=\sum_{r=1}^\infty r^{-3/2}$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sm6-quantum-integrals -->
### 直接例：収束条件を確かめる

**定義の確認**：$z<1$ では分母が $t=0$ でも正なので、$\nu>0$ の積分は原点で可積分です。$z=1$ のBose型では $e^t-1\sim t$ より被積分関数は $t^{\nu-2}$ に比例し、$\nu>1$ のときだけ原点で積分できます。無限遠では指数減衰します。$\nu=3/2$ はこの範囲に含まれます。
<!-- definition-example-end -->

<a id="thm-sm6-equations-of-state"></a>

<!-- formal-statement-start -->
> **定理（三次元量子理想気体の状態方程式）**  
> [周期境界模型](#def-sm6-periodic-gas)で $T,m,g$ と $z=e^{\beta\mu}$ を固定して $V=L^3\to\infty$ とする。Bose型は $0<z<1$、Fermi型は $z>0$ とする。粒子数密度 $\rho$ と圧力 $P=\lim_{V\to\infty}(k_{\mathrm B}T/V)\log\Xi$ は、Bose型で

$$
\rho=\frac g{\lambda_T^3}B_{3/2}(z),
\qquad
P=\frac{gk_{\mathrm B}T}{\lambda_T^3}B_{5/2}(z),
$$

> Fermi型で

$$
\rho=\frac g{\lambda_T^3}F_{3/2}(z),
\qquad
P=\frac{gk_{\mathrm B}T}{\lambda_T^3}F_{5/2}(z).
$$

> いずれも単位体積当たりの内部エネルギーは $u=3P/2$ となる。Bose型の $z\uparrow1$ では上式の励起状態密度の極限は有限で、$\rho_{\mathrm c}=gB_{3/2}(1)/\lambda_T^3$ である。
<!-- formal-statement-end -->

### 証明の見取り図

[状態密度](#prop-sm6-density-of-states)へ[占有数](#thm-sm6-occupations)を代入します。圧力の対数積分は部分積分で占有数積分へ戻ります。Bose型の $z=1$ は最初から有限容積の大正準分布に入れず、あくまで $z\uparrow1$ の極限として扱います。

<!-- proof-start -->
### 証明

粒子数の期待値は $\sum_j\bar n_j$ です。$t=\beta\varepsilon$ を状態密度の積分に代入し、$\Gamma(3/2)=\sqrt\pi/2$ と $\lambda_T=h/\sqrt{2\pi m/\beta}$ を使います。係数を一段ずつ整理すると

$$
\frac g{4\pi^2}
\left(\frac{2m}{\hbar^2}\right)^{3/2}
\beta^{-3/2}\Gamma(3/2)
=\frac g{(2\pi\hbar)^3}(2\pi m/\beta)^{3/2}
=\frac g{\lambda_T^3}.
$$

従って $\rho=(g/\lambda_T^3)B_{3/2}(z)$ または $F_{3/2}(z)$。内部エネルギーは積分に $\varepsilon=t/\beta$ をもう一つ掛けるので

$$
u=\frac g{\lambda_T^3}\frac{\Gamma(5/2)}{\Gamma(3/2)}
k_{\mathrm B}T\,B_{5/2}(z)
=\frac{3gk_{\mathrm B}T}{2\lambda_T^3}B_{5/2}(z)
$$

となり、Fermi型も同じ計算です。ここで $\Gamma(5/2)=(3/2)\Gamma(3/2)$ を使いました。

一方[大分配関数の積](#prop-sm6-factorization)により、Bose型の $\log\Xi=-g\sum_\ell\log(1-ze^{-\beta\varepsilon_\ell})$、Fermi型では $g\sum_\ell\log(1+ze^{-\beta\varepsilon_\ell})$ です。$t=\beta\varepsilon$ へ変換した後の圧力の積分は、Bose型で

$$
-\frac g{\lambda_T^3\Gamma(3/2)}
\int_0^\infty t^{1/2}\log(1-ze^{-t})\,dt.
$$

部分積分を行います。$t=0$ と無限遠の境界項は $z<1$ で0になり、

$$
-\int_0^\infty t^{1/2}\log(1-ze^{-t})\,dt
=\frac23\int_0^\infty\frac{t^{3/2}}{z^{-1}e^t-1}\,dt.
$$

$\Gamma(5/2)=(3/2)\Gamma(3/2)$ から係数が $B_{5/2}(z)$ になります。Fermi型では $\log(1+ze^{-t})$ の微分が $-1/(z^{-1}e^t+1)$ なので全く同じ係数で $F_{5/2}(z)$ を得ます。以上で $u=3P/2$ です。

Bose型の $z\uparrow1$ では各占有数積分の被積分関数が非負で単調に増加します。$t\downarrow0$ で $t^{1/2}/(e^t-1)\sim t^{-1/2}$ となり可積分なので、単調収束により $B_{3/2}(z)\uparrow B_{3/2}(1)<\infty$ です。$z=1$ で $1/(e^t-1)=\sum_{r\ge1}e^{-rt}$ と展開して非負項の積分と和を交換すると

$$
B_{3/2}(1)
=\frac1{\Gamma(3/2)}
\sum_{r=1}^\infty\int_0^\infty t^{1/2}e^{-rt}\,dt
=\sum_{r=1}^\infty r^{-3/2}.
$$
<!-- proof-end -->

圧力を定義する極限と、有限容積で壁を動かしたときの機械的な圧力が一致することは、この自由粒子模型ではエネルギーの $L^{-2}$ スケーリングからも導けます。しかし一般の閉じ込めポテンシャルや相互作用系へ、この式を証明なしで流用してはいけません。

<a id="prop-sm6-classical-limit"></a>

<!-- formal-statement-start -->
> **命題（希薄極限と最初の量子補正）**  
> [三次元量子理想気体](#thm-sm6-equations-of-state)で $T,m,g$ を固定し、$x=\rho\lambda_T^3/g\downarrow0$ とする。このとき

$$
\frac{P}{\rho k_{\mathrm B}T}
=
\begin{cases}
1-\dfrac{x}{2^{5/2}}+O(x^2)&\text{Bose型},\\[4pt]
1+\dfrac{x}{2^{5/2}}+O(x^2)&\text{Fermi型}.
\end{cases}
$$

> したがって両統計は $x\to0$ で[SM5の古典理想気体](../SM5/index.md#thm-sm5-ideal-thermodynamics)の状態方程式に近づく。
<!-- formal-statement-end -->

### 証明の見取り図

$z$ が小さいとき占有数の分母を等比級数へ展開します。粒子密度から一度 $z$ を解き直して圧力へ代入するため、**同じ $z$ の式をそのまま比較する**誤りを防げます。

<!-- proof-start -->
### 証明

$0<z<1$ で、指数関数の分母を幾何級数へ展開して積分すると、$\nu>0$ で

$$
B_\nu(z)=\sum_{r=1}^\infty\frac{z^r}{r^\nu}
=z+\frac{z^2}{2^\nu}+O(z^3),
$$

$$
F_\nu(z)=\sum_{r=1}^\infty\frac{(-1)^{r-1}z^r}{r^\nu}
=z-\frac{z^2}{2^\nu}+O(z^3).
$$

余項は $0<z\le1/2$ なら $\sum_{r\ge3}z^r\le2z^3$ で評価できます。符号 $s=+1$ をBose型、$s=-1$ をFermi型と置くと

$$
x=z+s\frac{z^2}{2^{3/2}}+O(z^3),
\quad
z=x-s\frac{x^2}{2^{3/2}}+O(x^3).
$$

後式を $\lambda_T^3P/(gk_{\mathrm B}T)=z+s z^2/2^{5/2}+O(z^3)$ へ代入して

$$
\frac{\lambda_T^3P}{gk_{\mathrm B}T}
=x-sx^2\left(\frac1{2^{3/2}}-\frac1{2^{5/2}}\right)+O(x^3)
=x-s\frac{x^2}{2^{5/2}}+O(x^3).
$$

$x=\rho\lambda_T^3/g$ で割れば結論です。
<!-- proof-end -->

Bose型は同じ密度・温度で古典値より圧力が少し低く、Fermi型は高くなります。これは粒子間の力を入れた結果ではありません。占有可能性という**統計的な相違**だけによるものです。

## 6. Bose凝縮：励起状態が収容できる密度の上限

$z\uparrow1$ で励起状態の密度が有限の $\rho_{\mathrm c}$ に近づくことは、有限温度でのBose–Einstein凝縮の入口です。ここで大切なのは「各有限容積で $z=1$ と置く」ことではなく、**容積ごとに密度を固定するよう $z_L<1$ を選んでから極限を取る**ことです。簡潔さのため $g=1$ とし、基底モードは $\boldsymbol\ell=0$ の一つとします。

<a id="thm-sm6-bose-condensation"></a>

<!-- formal-statement-start -->
> **定理（固定密度の三次元Bose気体の基底占有）**  
> [三次元周期境界模型](#def-sm6-periodic-gas)のBose型で $g=1$、$T,m>0$ を固定する。各 $L>0$ について一意な $z_L\in(0,1)$ を、平均粒子数が $\rho L^3$（$\rho>0$ は固定）となるよう選ぶ。基底モードの平均を $\bar n_{0,L}=z_L/(1-z_L)$、臨界密度を

$$
\rho_{\mathrm c}=\frac{B_{3/2}(1)}{\lambda_T^3}
$$

> とすると、

$$
\lim_{L\to\infty}\frac{\bar n_{0,L}}{L^3}
=\max\{0,\rho-\rho_{\mathrm c}\}.
$$

> 特に $\rho>\rho_{\mathrm c}$ では基底モードの平均占有数が体積に比例して増加する。
<!-- formal-statement-end -->

### 証明の見取り図

基底モードと励起モードの和を分けます。励起密度が $z\uparrow1$ でも有限値に抑えられることを用います。その際、原点近くの格子点をRiemann和の外側へ押し出す議論が必要です。

<!-- proof-start -->
### 証明

有限 $L$ における平均密度を

$$
D_L(z)=\frac1{L^3}\frac z{1-z}
+\frac1{L^3}\sum_{\ell\ne0}
\frac1{z^{-1}\exp[\beta\varepsilon_\ell]-1}
$$

とします。各項は $z$ に関して連続かつ狭義増加し、$D_L(0+)=0$、$D_L(1-)=\infty$ ですから、$D_L(z_L)=\rho$ を満たす $z_L$ は一意です。

励起密度を $E_L(z)$ と記します。固定 $z<1$ では[状態密度のRiemann和](#prop-sm6-density-of-states)により

$$
E_L(z)\longrightarrow \lambda_T^{-3}B_{3/2}(z).
$$

さらに $E_L(1)$ は、ゼロ波数を除けば有限です。波数 $k\ne0$ が小さいとき

$$
\frac1{e^{\beta\hbar^2|k|^2/(2m)}-1}
\le\frac{2m}{\beta\hbar^2|k|^2}
$$

が $e^y-1\ge y$ から従います。波数格子の原点から半径 $\delta$ 以内を、格子間隔 $a=2\pi/L$ の球殻 $ra\le|k|<(r+1)a$ に分割すると、殻内の格子点数は $O((r+1)^2)$。一殻の $L^{-3}$ 倍の寄与は $O(L^{-1})$、殻数は $O(\delta L)$ なので、原点周辺全体の寄与は $O(\delta)$（定数は $m,\beta,\hbar$ のみ）です。原点を除く残りでは通常のRiemann和が通ります。先に $L\to\infty$、次に $\delta\downarrow0$ とすれば

$$
E_L(1)\longrightarrow\rho_{\mathrm c}.
$$

したがって任意の $z_L\in(0,1)$ に対して $E_L(z_L)\le E_L(1)$ が成り立ちます。

$\rho>\rho_{\mathrm c}$ とします。もし部分列上で $z_L\le1-\eta$（$\eta>0$）なら、基底密度は $\bar n_{0,L}/L^3\le(1-\eta)/(\eta L^3)\to0$、励起密度は高々 $\lambda_T^{-3}B_{3/2}(1-\eta)<\rho_{\mathrm c}$ となり、$D_L(z_L)=\rho$ に矛盾します。よって $z_L\to1$。固定 $z<1$ に対して十分大きい $L$ で $z_L\ge z$ なので

$$
\lambda_T^{-3}B_{3/2}(z)
\le\liminf E_L(z_L)
\le\limsup E_L(z_L)\le\rho_{\mathrm c}.
$$

$z\uparrow1$ として $E_L(z_L)\to\rho_{\mathrm c}$ を得ます。$\bar n_{0,L}/L^3=\rho-E_L(z_L)$ なので結論です。

$\rho<\rho_{\mathrm c}$ の場合は、$z_*\in(0,1)$ を $\lambda_T^{-3}B_{3/2}(z_*)=\rho$ と一意に定められます（連続性・狭義単調性を使う）。$z_*-\eta$ と $z_*+\eta$ を使い $D_L$ を挟めば $z_L\to z_*<1$、基底密度は0へ向かいます。$\rho=\rho_{\mathrm c}$ では $E_L(z_L)\le E_L(1)\to\rho_{\mathrm c}$ と、任意の固定 $z<1$ について $z_L\ge z$ が最終的に成り立つことから、同様の上下評価で $E_L(z_L)\to\rho_{\mathrm c}$、基底密度は0です。
<!-- proof-end -->

この定理は大正準模型の**平均占有数**の主張です。単一実現で必ず基底に $\rho-\rho_c$ 個の粒子がいるという断定でも、有限系で真の特異点が生じるという主張でもありません。有限容積の大正準Bose基底占有は幾何分布で、分散は平均の二乗と同程度にもなります。相転移での粒子数揺らぎは、アンサンブルと固定する量を指定せずに比較できません。

## 7. Fermi気体の零温度極限

Fermi型では一モードの占有数に上限があるため、温度を下げると低いエネルギーのモードから埋まります。$T\downarrow0$、化学ポテンシャル $\mu>0$ を固定したとき

$$
\frac1{e^{(\varepsilon-\mu)/(k_{\mathrm B}T)}+1}
\longrightarrow
\begin{cases}1&\varepsilon<\mu,\\
0&\varepsilon>\mu.\end{cases}
$$

$\varepsilon=\mu$ では極限は $1/2$ ですが、連続状態密度の積分では一点の値は結果に影響しません。これはBose型のような一モードへの集積ではなく、波数空間の球の充填です。

<a id="prop-sm6-fermi-ground"></a>

<!-- formal-statement-start -->
> **命題（三次元自由Fermi気体の零温度極限）**  
> [三次元周期境界模型](#def-sm6-periodic-gas)でFermi型、$g\ge1$、粒子密度 $\rho>0$ を固定して熱力学極限の後に $T\downarrow0$ とする。Fermi波数 $k_{\mathrm F}$、Fermiエネルギー $\varepsilon_{\mathrm F}$ は

$$
k_{\mathrm F}=\left(\frac{6\pi^2\rho}{g}\right)^{1/3},
\qquad
\varepsilon_{\mathrm F}=\frac{\hbar^2 k_{\mathrm F}^2}{2m}
$$

> と与えられ、零温度でのエネルギー密度 $u_0$ と圧力 $P_0$ は

$$
u_0=\frac35\rho\varepsilon_{\mathrm F},
\qquad P_0=\frac25\rho\varepsilon_{\mathrm F}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

占有数が波数球の内部で1、外部で0になるので、密度は球の体積、エネルギー密度は球内の $k^2$ の積分です。圧力は同じ自由粒子の関係 $P=2u/3$ から求めます。

<!-- proof-start -->
### 証明

まず、温度 $T>0$ において密度を固定する化学ポテンシャルが、零温度では充填境界のエネルギーへ近づくことを確かめます。熱力学極限のFermi密度を

$
\rho_T(\mu)=\frac{g}{(2\pi)^3}
\int_{\mathbb R^3}
\frac{d^3k}{\exp[(\hbar^2|k|^2/(2m)-\mu)/(k_{\mathrm B}T)]+1}
$

と置きます。各 $T>0$ で $\rho_T(\mu)$ は $\mu$ に関して連続かつ狭義増加し、$\mu\to-\infty$ で0、$\mu\to+\infty$ で無限大へ向かうので、$\rho_T(\mu_T)=\rho$ の解は一意です。任意の固定 $\mu>0$ では、$T\downarrow0$ によって積分の占有因子が球 $|k|<\sqrt{2m\mu}/\hbar$ の指示関数へ収束します。積分は球内の有界領域では有界収束、球外では $T\le T_0$ として十分大きな $k$ に指数減衰の一様上界を取ることで極限と交換できます。この結果、

$
\lim_{T\downarrow0}\rho_T(\mu)
=\frac{g}{6\pi^2}\left(\frac{2m\mu}{\hbar^2}\right)^{3/2}.
$

右辺が $\rho$ となる唯一の正数を $\varepsilon_{\mathrm F}$ と定義します。任意の $0<\delta<\varepsilon_{\mathrm F}$ で、上の極限を $\mu=\varepsilon_{\mathrm F}\pm\delta$ に適用すると、十分小さい $T$ では

$
\rho_T(\varepsilon_{\mathrm F}-\delta)<\rho<
\rho_T(\varepsilon_{\mathrm F}+\delta).
$

$\rho_T$ の狭義単調性により $\varepsilon_{\mathrm F}-\delta<\mu_T<\varepsilon_{\mathrm F}+\delta$。従って $\mu_T\to\varepsilon_{\mathrm F}$ であり、固定密度の零温度極限が本当にFermi球の充填を与えます。

スピン縮退 $g$ を含め、波数積分から

$$
\rho=\frac g{(2\pi)^3}\int_{|k|<k_{\mathrm F}}d^3k
=\frac g{(2\pi)^3}\frac{4\pi k_{\mathrm F}^3}{3}
=\frac{gk_{\mathrm F}^3}{6\pi^2}.
$$

よって指定の $k_{\mathrm F}$ です。エネルギー密度は

$$
\begin{aligned}
u_0
&=\frac g{(2\pi)^3}\int_{|k|<k_{\mathrm F}}
\frac{\hbar^2k^2}{2m}\,d^3k\\
&=\frac{g\hbar^2}{4\pi^2m}
\int_0^{k_{\mathrm F}}k^4\,dk
=\frac{g\hbar^2k_{\mathrm F}^5}{20\pi^2m}.
\end{aligned}
$$

$\rho\varepsilon_{\mathrm F}=g\hbar^2k_{\mathrm F}^5/(12\pi^2m)$ なので $u_0/(\rho\varepsilon_{\mathrm F})=12/20=3/5$。[量子理想気体の状態方程式](#thm-sm6-equations-of-state)の $P=2u/3$ は自由粒子の積分恒等式であり、零温度極限でも球積分が有限なので適用できます。従って $P_0=(2/3)(3/5)\rho\varepsilon_{\mathrm F}$ です。
<!-- proof-end -->

## 8. 演習：占有数から巨視的な式まで

### Level A：一モードと規格化

#### A1. Bose一モードの平均と分散

$0<q<1$ とし $\mathbb P(n)=(1-q)q^n$（$n\ge0$）とする。$q=1/3$ のとき $P(n=0)$、平均、分散を求め、平均が1より小さくても二粒子以上を排除できないことを確認せよ。

- Level: A
- ID: SM6-A1

<!-- solution-start -->
**詳細解答**

$P(n=0)=1-q=2/3$ です。[Bose占有数と分散](#thm-sm6-occupations)の導出から

$$
\mathbb E n=\frac{q}{1-q}=\frac12,\qquad
\operatorname{Var}(n)=\frac{q}{(1-q)^2}=\frac34.
$$

また $P(n\ge2)=\sum_{n=2}^\infty(1-q)q^n=q^2=1/9>0$。平均 $1/2$ は占有数の上限ではありません。
<!-- solution-end -->

#### A2. Fermi一モードとPauli制限

$q=3$ のFermi一モードについて $P(n=0)$、$P(n=1)$、平均、分散を求めよ。同じエネルギーの独立二モードなら平均の合計と最大占有数はどうなるか。

- Level: A
- ID: SM6-A2

<!-- solution-start -->
**詳細解答**

[分配関数の因数分解](#prop-sm6-factorization)では一モードの規格化因子は $1+q=4$ です。従って $P(0)=1/4$、$P(1)=3/4$、

$$
\mathbb E n=\frac34,\qquad
\operatorname{Var}(n)=\frac34\left(1-\frac34\right)=\frac3{16}.
$$

独立で等エネルギーの二モードなら平均の合計は $3/2$、各モードの占有上限が1なので合計の上限は2です。エネルギー準位とモードを区別します。
<!-- solution-end -->

#### A3. BoseとFermiの二モード二粒子配置

異なる二つのモード $a,b$ が同じエネルギー $\varepsilon$ を持つ。固定粒子数 $N=2$ の許容占有配置を両統計で列挙し、固定粒子数分配関数の違いを求めよ。

- Level: A
- ID: SM6-A3

<!-- solution-start -->
**詳細解答**

Bose型の非負整数解 $n_a+n_b=2$ は $(2,0),(1,1),(0,2)$ の三つです。各配置のエネルギーは $2\varepsilon$ なので

$$
Z_{2,\mathrm B}=3e^{-2\beta\varepsilon}.
$$

Fermi型では各 $n_j\in\{0,1\}$ なので $(1,1)$ だけが許され、

$$
Z_{2,\mathrm F}=e^{-2\beta\varepsilon}.
$$

ラベルを付けた粒子の順列を追加計数しないことを[占有模型の定義](#def-sm6-occupation)で確認します。
<!-- solution-end -->

#### A4. 熱的波長と縮退度

固定した質量 $m$ と温度 $T$ で $\lambda_T$ を書き、温度を $T/4$ にしたときの比を求めよ。同じ密度でスピン縮退度 $g$ を2倍にすると希薄度 $x=\rho\lambda_T^3/g$ はどう変わるか。

- Level: A
- ID: SM6-A4

<!-- solution-start -->
**詳細解答**

[周期境界模型](#def-sm6-periodic-gas)の $\lambda_T=h/\sqrt{2\pi mk_{\mathrm B}T}$ から

$$
\frac{\lambda_{T/4}}{\lambda_T}
=\sqrt{\frac{T}{T/4}}=2.
$$

$T,m,\rho$ を固定して $g\mapsto2g$ とすれば

$$
x'=\frac{\rho\lambda_T^3}{2g}=\frac x2.
$$

一方、温度を $T/4$ にすれば $\lambda^3$ は8倍になり、$x$ も8倍になります。二つの操作を同時に行えば $x'=4x$ です。
<!-- solution-end -->

### Level B：揺らぎ・連続極限・極限順序

#### B1. Bose二モードの粒子数揺らぎ

独立なBose二モードの比が $q_1=1/2,q_2=1/4$ とする。総粒子数 $N=n_1+n_2$ の平均と分散を求め、同じ平均のPoisson分布と比較せよ。

- Level: B
- ID: SM6-B1

<!-- solution-start -->
**詳細解答**

[占有数の定理](#thm-sm6-occupations)から各平均は

$$
\bar n_1=\frac{1/2}{1-1/2}=1,\qquad
\bar n_2=\frac{1/4}{1-1/4}=\frac13.
$$

分散は $\bar n_j(1+\bar n_j)$ なので

$$
\operatorname{Var}(n_1)=2,\quad
\operatorname{Var}(n_2)=\frac13\frac43=\frac49.
$$

[独立性](#prop-sm6-factorization)により共分散は0ですから

$$
\mathbb E N=\frac43,\qquad
\operatorname{Var}(N)=2+\frac49=\frac{22}{9}.
$$

同じ平均のPoisson分布の分散は $4/3=12/9$。Bose型のこの例では分散の方が大きく、古典Poisson模型へそのまま置き換えることはできません。
<!-- solution-end -->

#### B2. 希薄な量子気体の第2ビリアル補正

$0<z<1$、$x=\rho\lambda_T^3/g$ とする。$B_{3/2},B_{5/2},F_{3/2},F_{5/2}$ を $z^2$ まで展開し、$P/(\rho k_{\mathrm B}T)$ の $x$ の一次補正を求めよ。符号の物理的意味も述べよ。

- Level: B
- ID: SM6-B2

<!-- solution-start -->
**詳細解答**

[古典極限命題](#prop-sm6-classical-limit)の級数表示を $\nu=3/2,5/2$ へ入れると

$$
B_{3/2}=z+\frac{z^2}{2^{3/2}}+O(z^3),
\quad
B_{5/2}=z+\frac{z^2}{2^{5/2}}+O(z^3),
$$

$$
F_{3/2}=z-\frac{z^2}{2^{3/2}}+O(z^3),
\quad
F_{5/2}=z-\frac{z^2}{2^{5/2}}+O(z^3).
$$

Bose型は $x=z+z^2/2^{3/2}+O(z^3)$ なので $z=x-x^2/2^{3/2}+O(x^3)$。圧力に代入して

$$
\frac{\lambda_T^3P}{gk_{\mathrm B}T}
=x-x^2\left(\frac1{2^{3/2}}-\frac1{2^{5/2}}\right)+O(x^3)
=x-\frac{x^2}{2^{5/2}}+O(x^3).
$$

Fermi型は両方の二次項の符号が逆なので、同じ過程から $x+x^2/2^{5/2}+O(x^3)$。$x$ で割って

$$
\frac P{\rho k_{\mathrm B}T}
=1\mp\frac{x}{2^{5/2}}+O(x^2).
$$

上符号（減少）がBose型、下符号（増加）がFermi型です。相互作用を加えなくても、許容占有数の差が圧力へ現れます。
<!-- solution-end -->

#### B3. 自由粒子の状態密度を二次元と比較する

一粒子エネルギー $\varepsilon=\hbar^2|\boldsymbol k|^2/(2m)$、波数セル体積 $(2\pi/L)^d$、スピン縮退 $g$ とする。$d=2,3$ の単位体積当たり状態密度を求め、二次元で有限温度のBose励起密度が $z\uparrow1$ で発散する理由を示せ。

- Level: B
- ID: SM6-B3

<!-- solution-start -->
**詳細解答**

三次元は[状態密度命題](#prop-sm6-density-of-states)より

$$
D_3(\varepsilon)=\frac g{4\pi^2}
\left(\frac{2m}{\hbar^2}\right)^{3/2}
\sqrt\varepsilon.
$$

二次元の波数円環は $2\pi k\,dk$ です。波数空間の単位面積当たり密度 $g/(2\pi)^2$ と $k\,dk=m\,d\varepsilon/\hbar^2$ から

$$
D_2(\varepsilon)
=\frac g{(2\pi)^2}2\pi\frac m{\hbar^2}
=\frac{gm}{2\pi\hbar^2}.
$$

$z=1$ のBose占有数は $\varepsilon\downarrow0$ で $(e^{\beta\varepsilon}-1)^{-1}\sim(\beta\varepsilon)^{-1}$。二次元では $D_2$ は正の定数なので励起密度積分が原点で $\int_0^\delta d\varepsilon/\varepsilon$ と同様に発散します。三次元では $D_3\propto\sqrt\varepsilon$ が掛かり $\int_0^\delta\varepsilon^{-1/2}d\varepsilon<\infty$ となることが本質的な違いです。
<!-- solution-end -->

#### B4. 零温度Fermi球の圧力

三次元自由Fermi気体でスピン縮退 $g$、密度 $\rho>0$ とする。波数空間を半径 $k_{\mathrm F}$ まで充填し、$k_{\mathrm F}$、エネルギー密度、圧力を自力で導け。

- Level: B
- ID: SM6-B4

<!-- solution-start -->
**詳細解答**

球の体積を使って

$$
\rho=\frac g{(2\pi)^3}\frac{4\pi}{3}k_{\mathrm F}^3
=\frac{gk_{\mathrm F}^3}{6\pi^2},
\quad
k_{\mathrm F}=\left(\frac{6\pi^2\rho}{g}\right)^{1/3}.
$$

さらに球座標でエネルギー密度を積分すると

$$
u_0=\frac g{(2\pi)^3}\frac{\hbar^2}{2m}
4\pi\int_0^{k_{\mathrm F}}k^4\,dk
=\frac{g\hbar^2k_{\mathrm F}^5}{20\pi^2m}.
$$

$\varepsilon_{\mathrm F}=\hbar^2k_{\mathrm F}^2/(2m)$ と比較すれば

$$
u_0=\frac35\rho\varepsilon_{\mathrm F},
\qquad
P_0=\frac23u_0=\frac25\rho\varepsilon_{\mathrm F}.
$$

[零温度極限定理](#prop-sm6-fermi-ground)の条件を満たしています。$T=0$ だからといって圧力が0になるわけではなく、占有制限が有限の運動量を要求します。
<!-- solution-end -->

### Level C：二つの統計・二つの極限をつなぐ

#### C1. Boseの飽和・Fermiの充填・古典領域

質量 $m>0$、熱的波長 $\lambda_T$、縮退度 $g=1$ とする。三次元自由理想気体について次を求めよ。

1. Bose型で励起状態の最大粒子数密度 $\rho_{\mathrm c}(T)$ を積分から求め、$T$ 依存性を示せ。
2. 固定密度 $\rho>\rho_{\mathrm c}(T)$ で熱力学極限を取ると、基底モードの平均密度がいくらになるか。有限容積の $z$ にどの制約があるかも述べよ。
3. Fermi型で $T\downarrow0$ のエネルギー密度と圧力を同じ $\rho$ から求めよ。
4. $x=\rho\lambda_T^3\ll1$ での両統計の圧力を $x$ の一次まで比較し、(2)(3) の低温領域にその展開を無条件で使えない理由を説明せよ。

- Level: C
- ID: SM6-C1

<!-- solution-start -->
**詳細解答**

**(1)**　[状態密度](#prop-sm6-density-of-states)と[Bose分布](#thm-sm6-occupations)を $z\uparrow1$ で用いると

$$
\rho_{\mathrm c}(T)
=\frac{1}{\lambda_T^3\Gamma(3/2)}
\int_0^\infty\frac{t^{1/2}}{e^t-1}\,dt.
$$

$1/(e^t-1)=\sum_{r=1}^\infty e^{-rt}$ と展開し、積分と非負項和を交換すると

$$
\frac1{\Gamma(3/2)}
\sum_{r=1}^\infty\int_0^\infty t^{1/2}e^{-rt}dt
=\sum_{r=1}^\infty r^{-3/2}=B_{3/2}(1).
$$

従って $\rho_{\mathrm c}(T)=B_{3/2}(1)/\lambda_T^3$。$\lambda_T\propto T^{-1/2}$ より $\rho_c(T)\propto T^{3/2}$ です。

**(2)**　有限 $L$ の基底平均は $z_L/(1-z_L)$ なので、必ず $z_L<1$ としなければなりません。平均密度を $\rho$ に合わせて $L\to\infty$ とすると、[固定密度の三次元Bose気体の基底占有](#thm-sm6-bose-condensation)から

$$
\frac{\bar n_{0,L}}{L^3}\longrightarrow
\rho-\rho_{\mathrm c}(T)>0.
$$

このとき $z_L\to1$ ですが、有限 $L$ で先に $z=1$ を代入することはできません。

**(3)**　Fermi型の占有領域は $|\boldsymbol k|\le k_{\mathrm F}$ で、

$$
k_{\mathrm F}=(6\pi^2\rho)^{1/3},
\quad
\varepsilon_{\mathrm F}=\frac{\hbar^2}{2m}(6\pi^2\rho)^{2/3}.
$$

球殻積分で

$$
u_0=\frac{\hbar^2}{4\pi^2m}\frac{k_{\mathrm F}^5}{5}
=\frac35\rho\varepsilon_{\mathrm F},
\quad
P_0=\frac23u_0=\frac25\rho\varepsilon_{\mathrm F}.
$$

この圧力は $T\downarrow0$ でも正です。

**(4)**　[希薄極限命題](#prop-sm6-classical-limit)を $g=1$ として適用すると

$$
P_{\mathrm B}=\rho k_{\mathrm B}T
\left(1-\frac{x}{2^{5/2}}+O(x^2)\right),
$$

$$
P_{\mathrm F}=\rho k_{\mathrm B}T
\left(1+\frac{x}{2^{5/2}}+O(x^2)\right).
$$

低温では $\lambda_T^3\propto T^{-3/2}$ が増大するため、固定 $\rho$ の $x$ は小さくなくなります。したがって $x\ll1$ という展開条件が外れ、Bose凝縮やFermi球の圧力を希薄展開の第一項で説明することはできません。熱力学極限と低温極限の指定順序も明示する必要があります。
<!-- solution-end -->

## 9. 何が古典論から変わったか

古典理想気体では同種粒子の交換に伴う過剰計数を $1/N!$ で補正しました。量子理想気体では、占有数そのものが微視的配置の座標になります。Bose型の一モード占有は幾何分布、Fermi型はBernoulli分布であり、そこから圧力・エネルギー・揺らぎの符号まで変わります。

**希薄領域** $\rho\lambda_T^3/g\ll1$ ではどちらも古典的な $P=\rho k_{\mathrm B}T$ に戻ります。しかしBose型では励起状態の密度上限と基底占有、Fermi型では零温度でも消えない充填圧力が現れます。次章SM7では、粒子の占有規則ではなく**粒子同士の相互作用**を入れ、Ising模型とCurie–Weiss平均場を扱います。
