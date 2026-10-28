# QFT4 実スカラー場のFock空間と正準量子化

<!-- definition-example-audit: strict -->

[QFT3の正負振動数分解](../QFT3/index.md#def-qft3-frequency)は、古典Klein–Gordon場を運動量ごとの振動子として理解する方法でした。しかし古典振動子の振幅は数であり、励起を重ねて「粒子が零個、一個、二個」と数える状態空間はまだありません。[QM8の共通不変領域上の正準交換関係](../../../解析系/QM/QM8/index.md#def-qm8-ccr-common-domain)を使えば、振幅を作用素へ置き換えるときに何を検査すべきかが分かります。

この講義では、まず対称な多粒子波動関数から状態空間を作り、その上で粒子を一個ずつ増減させる作用を**実際に定義**します。交換関係を計算したあと、試験関数を掛けた場の作用素、等時刻交換関係、粒子数、真空、正規順序まで導きます。点ごとの場は便利な計算記号ですが、作用素を定義するのは試験関数で積分した後です。また自由真空を選ぶFock表現の構成であり、無限自由度の全ての正準交換関係の表現がこれと同値だという主張ではありません。

本章を通じて $3+1$ 次元、$\eta=\operatorname{diag}(1,-1,-1,-1)$、$c=\hbar=1$、**質量 $m>0$ の自由な実スカラー場**を考えます。質量を正に固定するのは、運動量原点の因子 $1/\sqrt{\omega_{\boldsymbol p}}$ を滑らかに保ち、共通のSchwartz領域で全計算を閉じるためです。質量零の場合の赤外問題、複素スカラー場、局所的可換性と二点関数は後の学習で別途扱います。

## 1. 一個の振動子から任意粒子数へ

古典解の周波数を $\omega_{\boldsymbol p}=\sqrt{|\boldsymbol p|^2+m^2}$ とします。[QFT3の空間Fourier規格化](../QFT3/index.md#thm-qft3-cauchy)と合わせて

$$
d\mu(\boldsymbol p)=\frac{d^3p}{(2\pi)^3},\qquad
\mathfrak h=L^2(\mathbb R^3,d\mu),\qquad
\langle f,g\rangle_{\mathfrak h}
=\int f(\boldsymbol p)\overline{g(\boldsymbol p)}\,d\mu(\boldsymbol p)
$$

と置きます。$\mathfrak h$ は一粒子の波束を表す複素Hilbert空間で、内積は**第1変数について線形**という[QM5の規約](../../../解析系/QM/QM5/index.md#def-qm5-unbounded-adjoint)を採用します。波束 $f$ のノルム二乗は $\int|f|^2d\mu$ です。

区別できない二つのボース粒子を入れ替えても波動関数は変わりません。例えば一粒子波束 $f,g$ から二粒子波束を作るなら、$f(\boldsymbol p_1)g(\boldsymbol p_2)$ だけでなく、二つの引数を交換した項も必要です。$n$ 粒子では積測度 $d\mu(\boldsymbol p_1)\cdots d\mu(\boldsymbol p_n)$ でノルムを測り、各引数の置換で変わらない部分空間を取ります。これが次の対称テンソル積の具体的な関数表示であり、その空間を粒子数ごとに直和します。

<a id="def-qft4-fock-space"></a>

<!-- formal-statement-start -->
> **定義（ボースFock空間と有限粒子領域）**
> $\mathfrak h=L^2(\mathbb R^3,d\mu)$ とし、$n\ge1$ に対して $\mathfrak h^{\otimes_s n}$ を、積測度 $d\mu^{\otimes n}$ に関して二乗可積分で、$\mathbb R^{3n}$ 上の任意の粒子変数交換に不変な関数のHilbert空間とする。零粒子空間を $\mathfrak h^{\otimes_s0}=\mathbb C$ とし、ボースFock空間を次のHilbert直和で定義する。

$$
\mathcal F_s(\mathfrak h)
=\bigoplus_{n=0}^{\infty}\mathfrak h^{\otimes_s n},
\quad
\|\Psi\|^2=\sum_{n=0}^{\infty}\|\Psi_n\|^2.
$$

> $\Psi=(\Psi_0,\Psi_1,\ldots)$ の有限個の成分だけが非零で、それぞれが対称Schwartz関数（$n=0$ は複素数）であるベクトル全体を $\mathcal D_{\mathcal S}$ とする。$\Omega=(1,0,0,\ldots)$ を真空ベクトルとする。
<!-- formal-statement-end -->

$\mathcal D_{\mathcal S}$ は各粒子数のSchwartz関数の稠密性と、直和の末尾を切り捨てる近似からFock空間に稠密です。ただし「有限粒子」だけでは後のエネルギー作用素の定義域を保証しません。そこで粒子数と波束の滑らかさの**両方**を制限した $\mathcal D_{\mathcal S}$ を共通領域とします。

<!-- definition-example-start: def-qft4-fock-space -->
### 例：二粒子状態が対称であること

**定義の確認**：粒子交換の不変性とSchwartz級を具体的に検査します。

$f,g\in\mathcal S(\mathbb R^3)$ に対し

$$
\Psi_2(\boldsymbol p,\boldsymbol q)
=\frac{f(\boldsymbol p)g(\boldsymbol q)
+g(\boldsymbol p)f(\boldsymbol q)}{\sqrt2}
$$

を取ります。引数を交換しても二項が入れ替わるだけで同じです。積・和はSchwartz級なので $\Psi_2\in\mathfrak h^{\otimes_s2}$ かつ $\mathcal D_{\mathcal S}$ に属します。ノルムは一般には $\|f\|^2\|g\|^2+|\langle f,g\rangle|^2$ であり、$1$ とは限りません。$f,g$ が直交する単位波束なら $1$ です。
<!-- definition-example-end -->

## 2. 生成・消滅演算子を波動関数に作用させる

粒子を一個付け加える際は「どのスロットに入れたか」で結果が変わらないよう、全ての位置に対称化して足します。取り去る際は、一つの粒子変数を波束 $f$ と内積で縮約します。ここで角度付き帽子 $\widehat{\boldsymbol p_j}$ は**その変数を引数列から省く**ことを意味し、Fourier変換の帽子とは異なります。

<a id="def-qft4-ladder-operators"></a>

<!-- formal-statement-start -->
> **定義（生成・消滅演算子）**
> $f\in\mathcal S(\mathbb R^3;\mathbb C)$、$\Psi\in\mathcal D_{\mathcal S}$ とする。粒子数 $n\ge0$ に対し、消滅演算子 $a(f)$ と生成演算子 $a^\dagger(f)$ を次の成分で定義する。

$$
\begin{aligned}
(a(f)\Psi)_n(\boldsymbol p_1,\ldots,\boldsymbol p_n)
&=\sqrt{n+1}\int d\mu(\boldsymbol q)\,
\overline{f(\boldsymbol q)}\,
\Psi_{n+1}(\boldsymbol q,\boldsymbol p_1,\ldots,\boldsymbol p_n),\\
(a^\dagger(f)\Psi)_n(\boldsymbol p_1,\ldots,\boldsymbol p_n)
&=\frac1{\sqrt n}\sum_{j=1}^n
f(\boldsymbol p_j)\Psi_{n-1}
(\boldsymbol p_1,\ldots,\widehat{\boldsymbol p_j},\ldots,\boldsymbol p_n)
\quad(n\ge1),\\
(a^\dagger(f)\Psi)_0&=0.
\end{aligned}
$$

> $a(f)$ は $f$ について反線形、$a^\dagger(f)$ は線形であり、いずれも $\mathcal D_{\mathcal S}$ を自身へ写す。記号 $\dagger$ はこの共通領域上での内積による随伴関係を示す。
<!-- formal-statement-end -->

生成で $n$ 個のスロットを足すため、係数は $1/\sqrt n$ です。これは一つ少ない粒子数から新しい波束を付け足し、対称化して規格化する操作に相当します。

消滅と生成が互いに随伴であることも定義から確認できます。生成側の内積では、対称性によってスロットごとの $n$ 個の積分が等しくなります。係数と合わせて $n/\sqrt n=\sqrt n$ となり、消滅側の積分に一致します。従って $f,\Psi,\Xi$ がSchwartz級の有限粒子ベクトルに属するとき、

$$
\langle a^\dagger(f)\Psi,\Xi\rangle_{\mathcal F}
=\langle\Psi,a(f)\Xi\rangle_{\mathcal F}.
$$

これは[QM5の随伴の定義](../../../解析系/QM/QM5/index.md#def-qm5-unbounded-adjoint)を共通領域上で確かめたものであり、閉作用素の最大定義域まで同一と主張していません。

<!-- definition-example-start: def-qft4-ladder-operators -->
### 例：真空から一個、さらに二個

**定義の確認**：粒子成分への作用式を零粒子ベクトルから順に適用します。

定義式に $\Omega_0=1$、$\Omega_n=0$（$n\ge1$）を代入すると

$$
a(f)\Omega=0,\qquad
(a^\dagger(f)\Omega)_1(\boldsymbol p)=f(\boldsymbol p).
$$

二度生成すると

$$
(a^\dagger(g)a^\dagger(f)\Omega)_2
(\boldsymbol p,\boldsymbol q)
=\frac{g(\boldsymbol p)f(\boldsymbol q)
+f(\boldsymbol p)g(\boldsymbol q)}{\sqrt2}.
$$

真空から作った一粒子状態のノルムは $\|f\|$ です。同じ単位波束 $f$ を二度入れた状態は $\sqrt2 f\otimes f$ となるため、規格化には $a^\dagger(f)^2\Omega/\sqrt2$ が必要です。
<!-- definition-example-end -->

## 3. 交換関係は定義から計算する

記号 $[A,B]=AB-BA$ を交換子とします。非有界作用素については積が共に定義される領域を指定しなければなりません。[QM8のCCRの定義](../../../解析系/QM/QM8/index.md#def-qm8-ccr-common-domain)に従い、以下は全て $\mathcal D_{\mathcal S}$ 上の等式です。

<a id="thm-qft4-fock-ccr"></a>

<!-- formal-statement-start -->
> **定理（Fock生成・消滅演算子の交換関係）**
> $m>0$、$\mathfrak h=L^2(\mathbb R^3,d\mu)$ とし、上の $\mathcal D_{\mathcal S}$ で $f,g\in\mathcal S(\mathbb R^3)$ に対応する生成・消滅演算子を定義する。この共通不変領域上で次が成立する。

$$
\begin{aligned}
[a(f),a^\dagger(g)]&=\langle g,f\rangle_{\mathfrak h}I,\\
[a(f),a(g)]&=0,\\
[a^\dagger(f),a^\dagger(g)]&=0.
\end{aligned}
$$
<!-- formal-statement-end -->

### 証明の見取り図

$a(f)a^\dagger(g)$ では、生成で増えた新しい粒子を直後の消滅で取り去る項が一つだけ現れます。それ以外は「もともといた粒子を先に取り去り、別の粒子を生成する」操作と相殺します。この残り一項が内積です。

<!-- proof-start -->
### 証明

$\Psi\in\mathcal D_{\mathcal S}$ の $n$ 粒子成分を固定します。生成の式を消滅の式へ代入すると、生成直後に追加した変数を取り去る $j=1$ の項と、残りの $j=2,\ldots,n+1$ の項に分かれます。

$$
\begin{aligned}
&(a(f)a^\dagger(g)\Psi)_n(\boldsymbol p_1,\ldots,\boldsymbol p_n)\\
&=\int d\mu(\boldsymbol q)\,\overline{f(\boldsymbol q)}
\left[g(\boldsymbol q)\Psi_n(\boldsymbol p_1,\ldots,\boldsymbol p_n)
+\sum_{j=1}^{n}g(\boldsymbol p_j)
\Psi_n(\boldsymbol q,\boldsymbol p_1,\ldots,\widehat{\boldsymbol p_j},\ldots,\boldsymbol p_n)
\right].
\end{aligned}
$$

第1項は $\int g\overline f\,d\mu\,\Psi_n=\langle g,f\rangle\Psi_n$ です。第2項は、$a(f)$ を先に施した $n-1$ 粒子成分に $a^\dagger(g)$ を施した式と一致します（係数は $\sqrt n\cdot1/\sqrt n=1$）。差を取れば第1式が従います。

消滅同士の積は二つの変数を $f,g$ と順に縮約する二重積分です。積分順序を変え、対称波動関数の二変数を交換すると同じ式です。Schwartz級とCauchy–Schwarzにより積分交換は正当化できます。生成同士は、二つの波束を全スロットに対称化した和であり、$f,g$ の順を交換しても変わりません。よって残り二式も成立します。
<!-- proof-end -->

**なぜ内積の順が $\langle g,f\rangle$ なのか。** 内積の第1変数を線形に取ったので $a(f)$ は反線形です。$[a(f),a^\dagger(g)]$ は $g$ に線形、$f$ に反線形でなければならず、この順番が整合します。物理学の第2変数線形の教科書では内積の引数が逆に見えることがあります。

## 4. 点でなく試験関数で場を作る

[QFT3の古典的smearing](../QFT3/index.md#def-qft3-smearing)では $\phi$ を積分して複素数を得ました。量子場では同じ位置に**作用素**を置きます。まず実数値の時空Schwartz関数 $F\in\mathcal S(\mathbb R^4;\mathbb R)$ を選び、その正振動数の質量殻上のFourier成分を一粒子波束として使います。

ここでは $d^4x=dt\,d^3x$、$x=(t,\boldsymbol x)$ とし、$\widetilde F(E,\boldsymbol p)=\int d^4x\,F(t,\boldsymbol x)e^{iEt-i\boldsymbol p\cdot\boldsymbol x}$ と約束します。$E$ は時間周波数の変数であり、$\partial_t$ は空間位置を固定した偏微分です。

<a id="def-qft4-smeared-field"></a>

<!-- formal-statement-start -->
> **定義（実自由量子場のsmearing）**
> $m>0$、$F\in\mathcal S(\mathbb R^4;\mathbb R)$ とする。$\omega_{\boldsymbol p}=\sqrt{|\boldsymbol p|^2+m^2}$ に対し、一粒子波束 $u_F\in\mathfrak h$ と場の作用素 $\Phi(F)$ を次で定める。

$$
u_F(\boldsymbol p)=\frac{\widetilde F(\omega_{\boldsymbol p},\boldsymbol p)}{\sqrt{2\omega_{\boldsymbol p}}},
\qquad
\Phi(F)=a(u_F)+a^\dagger(u_F)
\quad\text{on }\mathcal D_{\mathcal S}.
$$

> $F$ が実数値のとき $\Phi(F)$ は対称作用素である。複素試験関数に対しては実部と虚部から複素線形に延長する。
<!-- formal-statement-end -->

$m>0$ なので $\omega_{\boldsymbol p}\ge m$ です。$\widetilde F$ はSchwartz級で、$\boldsymbol p\mapsto(\omega_{\boldsymbol p},\boldsymbol p)$ は全階微分可能、導関数は高々多項式増大です。この対応に沿って制限し $1/\sqrt{2\omega}$ を掛けても運動量側でSchwartz級です。よって[本章の生成・消滅演算子の定義](#def-qft4-ladder-operators)が使えます。$F$ の実線形性と $a$ の反線形性を組み合わせた $\Phi(F)$ は実線形です。対称性は二演算子の随伴関係から従います。

複素試験関数に延長する際は、反線形の $a$ に対して**同じ $u_F$ をそのまま入れる式ではない**点に注意します。$F=F_1+iF_2$（$F_1,F_2$ は実数値）なら、$u_F=u_{F_1}+iu_{F_2}$、$u_{\overline F}=u_{F_1}-iu_{F_2}$ なので

$$
\Phi_{\mathbb C}(F)
=\Phi(F_1)+i\Phi(F_2)
=a(u_{\overline F})+a^\dagger(u_F).
$$

この式では $a(u_{\overline F})=a(u_{F_1})+ia(u_{F_2})$ となり、複素線形性と実試験関数での対称性が両立します。以下の $\Phi(F)$ は実関数では元の定義、複素関数ではこの延長を意味します。

<!-- definition-example-start: def-qft4-smeared-field -->
### 例：真空を一粒子波束へ写す

**定義の確認**：二つの演算子の真空への作用と、得られた波束の二乗可積分性を調べます。

$F$ を実Schwartz関数とすると $a(u_F)\Omega=0$ であり、

$$
\Phi(F)\Omega=a^\dagger(u_F)\Omega,
\qquad
\|\Phi(F)\Omega\|^2
=\int\frac{d^3p}{(2\pi)^3}
\frac{|\widetilde F(\omega_{\boldsymbol p},\boldsymbol p)|^2}
{2\omega_{\boldsymbol p}}.
$$

積分が有限なのは $m>0$ とSchwartz減衰によります。場をかけると粒子が「正確に一個」生まれるのは真空に作用させた場合であり、一般状態では消滅の項も働きます。$u_F=0$ となる非零試験関数もあるので、$F\ne0$ だけから一粒子状態が非零とは結論できません。
<!-- definition-example-end -->

次に、試験関数 $F$ に作用素 $\Phi(F)$ を対応させ、固定した共通領域の二つのベクトルで挟んだ行列要素が試験関数について連続な分布になるかを調べます。[QFT3の緩増加超関数の定義](../QFT3/index.md#def-qft3-tempered)を数値から作用素の行列要素へ拡張する考え方です。**弱い方程式**は、点で微分する代わりに試験関数に微分作用素 $P$ を移し、$\Phi(PF)=0$ を確認するものです。

<a id="prop-qft4-operator-distribution"></a>

<!-- formal-statement-start -->
> **命題（作用素値分布と弱いKlein–Gordon方程式）**
> $m>0$ の上の実自由量子場について、任意の $\Psi,\Xi\in\mathcal D_{\mathcal S}$ に対し、$F\mapsto\langle\Phi(F)\Psi,\Xi\rangle$ は時空Schwartz空間上の連続な実線形汎関数であり、複素線形に延長できる。また $P=\partial_t^2-\Delta+m^2$ とすれば、任意の実Schwartz関数 $F$ について次が成り立つ。

$$
\Phi(PF)=0\quad\text{on }\mathcal D_{\mathcal S}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

一粒子波束 $u_F$ のノルムを試験関数のSchwartz半ノルムで抑えます。生成・消滅の粒子数係数は固定した有限粒子ベクトルでは有界です。方程式については、質量殻上ではFourier変換後の係数が零になることを使います。

<!-- proof-start -->
### 証明

以下の評価だけで使う $N$ を、$(N\Psi)_n=n\Psi_n$ と各粒子数成分をその粒子数倍する作用素とします。第6節でエネルギーと合わせて正式に定義します。粒子数 $n$ の成分にCauchy–Schwarzを使うと

$$
\|a(f)\Psi\|\le\|f\|\|N^{1/2}\Psi\|,
\qquad
\|a^\dagger(f)\Psi\|\le\|f\|\|(N+I)^{1/2}\Psi\|
$$

です。有限粒子領域上では右辺は有限です。最初の評価は消滅の積分へのCauchy–Schwarzから、二つ目は $\|a^\dagger(f)\Psi\|^2=\|a(f)\Psi\|^2+\|f\|^2\|\Psi\|^2$ を[本章の交換関係](#thm-qft4-fock-ccr)と随伴性から得て従います。

$F$ のSchwartz性から、任意の $k$ に対してある定数 $C_k(F)$ があり

$$
|\widetilde F(E,\boldsymbol p)|
\le C_k(F)(1+|E|+|\boldsymbol p|)^{-k}.
$$

$C_k$ は有限個のSchwartz半ノルムで制御できます。$\omega_{\boldsymbol p}\ge m$ を使い $k\ge3$ とすれば

$$
\|u_F\|^2
\le\frac{C_k(F)^2}{2m}
\int\frac{d^3p}{(2\pi)^3}(1+|\boldsymbol p|)^{-2k}
<\infty.
$$

従って $F\mapsto u_F$ はSchwartz位相から $\mathfrak h$ への連続写像です。上の作用素評価を固定した $\Psi,\Xi$ に適用すれば、行列要素の連続性が出ます。

次に積分内で $PF$ を部分積分すると（Schwartz減衰により境界項は零）、

$$
\widetilde{PF}(E,\boldsymbol p)
=(-E^2+|\boldsymbol p|^2+m^2)\widetilde F(E,\boldsymbol p).
$$

$E=\omega_{\boldsymbol p}$ では括弧は $-\omega_{\boldsymbol p}^2+|\boldsymbol p|^2+m^2=0$ です。よって $u_{PF}=0$、$\Phi(PF)=a(0)+a^\dagger(0)=0$ が共通領域で成立します。
<!-- proof-end -->

この命題は**共通領域上の作用素値分布**を構成したものであり、任意の時空点 $x$ に作用素 $\Phi(x)$ を定義したものではありません。例えば $\Phi(x)$ の直後に $\Phi(x)$ を掛ける操作は、smearingのない分布の積なのでここから自動的には正当化されません。

## 5. 等時刻交換関係を回復する

形式的な場の表示は、生成・消滅を運動量でラベルした記号 $a(\boldsymbol p)$、$a^\dagger(\boldsymbol p)$ を使って

$$
\Phi(t,\boldsymbol x)\sim
\int d\mu(\boldsymbol p)\frac1{\sqrt{2\omega_{\boldsymbol p}}}
\left(a(\boldsymbol p)e^{-i\omega_{\boldsymbol p}t+i\boldsymbol p\cdot\boldsymbol x}
+a^\dagger(\boldsymbol p)e^{i\omega_{\boldsymbol p}t-i\boldsymbol p\cdot\boldsymbol x}\right)
$$

と書けます。これは $a(\boldsymbol p)$ 自身を各点の作用素と主張する式ではなく、直前の $\Phi(F)$ を得るための**積分核の略記**です。これを時刻固定で空間Schwartz関数 $h$ によって積分する操作は、以下の正確な定義で扱います。$\Phi_t(h)$ の下付き $t$ は**空間変数を積分した後に残る時刻パラメータ**を表し、$\partial_t\Phi_t(h)$ は $h$ を固定してこの族を時刻で微分する意味です。

[QFT1の自由場のエネルギー構成](../QFT1/index.md#def-qft1-energy)では、ラグランジアン密度の時間微分変数での偏微分から古典的な共役運動量 $\pi=\partial\mathcal L_{\mathrm{free}}/\partial(\partial_t\phi)=\partial_t\phi$ を得ました。したがって量子化後もこの**時間微分**に対応する作用素を $\Pi_t$ と呼びます。

$h\in\mathcal S(\mathbb R^3;\mathbb R)$ として、[QFT3のFourier変換](../QFT3/index.md#thm-qft3-cauchy)による $\widehat h(\boldsymbol p)=\int h(\boldsymbol x)e^{-i\boldsymbol p\cdot\boldsymbol x}d^3x$ を使い、

$$
u_{t,h}(\boldsymbol p)
=\frac{e^{i\omega_{\boldsymbol p}t}\widehat h(\boldsymbol p)}{\sqrt{2\omega_{\boldsymbol p}}},
\qquad
v_{t,h}(\boldsymbol p)=i\omega_{\boldsymbol p}u_{t,h}(\boldsymbol p)
$$

と置きます。$u_{t,h}$ は場の正振動数の係数、$v_{t,h}$ はその時間微分による係数に対応します。

<a id="def-qft4-equal-time-fields"></a>

<!-- formal-statement-start -->
> **定義（等時刻の場と共役運動量）**
> $m>0$、$t\in\mathbb R$、$h\in\mathcal S(\mathbb R^3;\mathbb R)$ とする。上記のSchwartz波束 $u_{t,h},v_{t,h}$ を用い、共通不変領域 $\mathcal D_{\mathcal S}$ で

$$
\Phi_t(h)=a(u_{t,h})+a^\dagger(u_{t,h}),
\qquad
\Pi_t(h)=a(v_{t,h})+a^\dagger(v_{t,h})
$$

> と定める。$\Pi_t$ は自由場の時間微分 $\partial_t\Phi$ を空間でsmearingした共役運動量である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft4-equal-time-fields -->
### 例：時間微分の符号を両成分で確かめる

**定義の確認**：共役運動量が場の時間微分になる条件を、正負の指数因子に分けて確認します。

$\overline{u_{t,h}}$ が形式的な消滅係数なので、その時間微分は $-i\omega_{\boldsymbol p}\overline{u_{t,h}}$ です。一方、生成係数 $u_{t,h}$ の微分は $+i\omega_{\boldsymbol p}u_{t,h}$。消滅演算子の反線形性から $a(i\omega u)=\overline i\,a(\omega u)=-i\,a(\omega u)$ となり、定義した $\Pi_t(h)$ は両方の時間微分と一致します。係数の $i$ を共通のプラスで置くのは誤りです。

この対応は形式的な指数の微分だけでなく、$\mathcal D_{\mathcal S}$ 上のベクトル値微分としても成り立ちます。実数 $s\ne0$ に対し、$h$ を固定すると

$$
\frac{u_{t+s,h}-u_{t,h}}s
=\int_0^1 i\omega_{\boldsymbol p}
\frac{e^{i\omega_{\boldsymbol p}(t+\theta s)}\widehat h(\boldsymbol p)}
{\sqrt{2\omega_{\boldsymbol p}}}\,d\theta
\longrightarrow v_{t,h}
\qquad(s\to0).
$$

$m>0$ の下では各運動量微分後も積分内の因子が高々多項式増大なので、Schwartz減衰によって極限は一粒子ノルムでも成立します。第4節の[生成・消滅演算子のノルム評価](#prop-qft4-operator-distribution)を固定した $\Psi\in\mathcal D_{\mathcal S}$ に適用すれば、$t$ についての**実変数の微分**として

$$
\frac{d}{dt}\bigl(\Phi_t(h)\Psi\bigr)
=a(v_{t,h})\Psi+a^\dagger(v_{t,h})\Psi
=\Pi_t(h)\Psi
$$

がFock空間のノルムで成り立ちます。$\partial_t\Phi_t$ はこの意味での表記であり、点ごとの非有界作用素 $\Phi(t,\boldsymbol x)$ の存在を仮定していません。
<!-- definition-example-end -->

<a id="thm-qft4-equal-time-ccr"></a>

<!-- formal-statement-start -->
> **定理（自由実スカラー場の等時刻正準交換関係）**
> $m>0$、$t\in\mathbb R$、実Schwartz関数 $h,k\in\mathcal S(\mathbb R^3;\mathbb R)$ とする。上で定義した $\Phi_t,\Pi_t$ は $\mathcal D_{\mathcal S}$ 上で次を満たす。

$$
\begin{aligned}
[\Phi_t(h),\Phi_t(k)]&=0,\\
[\Pi_t(h),\Pi_t(k)]&=0,\\
[\Phi_t(h),\Pi_t(k)]
&=i\left(\int_{\mathbb R^3}h(\boldsymbol x)k(\boldsymbol x)\,d^3x\right)I.
\end{aligned}
$$
<!-- formal-statement-end -->

### 証明の見取り図

第3節の交換関係から、交換子は一粒子内積二つの差です。同時刻では実試験関数のFourier変換の現実条件とParseval等式により、場同士・運動量同士の差は消え、混合交換子だけが空間内積として残ります。

<!-- proof-start -->
### 証明

以後 $u_h=u_{t,h}$、$v_k=v_{t,k}$ と略記します。[Fock交換関係](#thm-qft4-fock-ccr)から

$$
[\Phi_t(h),\Pi_t(k)]
=\langle v_k,u_h\rangle-\langle u_h,v_k\rangle.
$$

$v_k=i\omega u_k$ を代入し、第1変数線形内積で虚数単位の共役を確認すると

$$
\begin{aligned}
\langle v_k,u_h\rangle-\langle u_h,v_k\rangle
&=i\int d\mu(\boldsymbol p)\,\omega_{\boldsymbol p}
\left[u_k\overline{u_h}+u_h\overline{u_k}\right]\\
&=\frac{i}{2}\int d\mu(\boldsymbol p)
\left[\widehat k\overline{\widehat h}
+\widehat h\overline{\widehat k}\right].
\end{aligned}
$$

ここでは時間因子 $e^{\pm i\omega t}$ が打ち消されています。実 $h,k$ について[FOU4のParseval内積等式](../../../解析系/FOU/FOU4/index.md#thm-fou4-parseval)を三つの空間座標に適用すると、両積分はどちらも $\int hk\,d^3x$ に等しいので混合交換子の式が出ます。

場同士は

$$
[\Phi_t(h),\Phi_t(k)]
=\langle u_k,u_h\rangle-\langle u_h,u_k\rangle.
$$

実関数の現実条件 $\widehat h(-\boldsymbol p)=\overline{\widehat h(\boldsymbol p)}$ と $\omega_{-\boldsymbol p}=\omega_{\boldsymbol p}$ により、内積 $\int\widehat k\overline{\widehat h}/(2\omega)\,d\mu$ は実数です（$\boldsymbol p\mapsto-\boldsymbol p$ で自分の複素共役に等しい）。従って差が零。$v$ 同士の内積でも重みが $\omega/2$ に変わるだけで同じ偶関数性があり、差は零です。
<!-- proof-end -->

等時刻式の右辺を形式的に $i\delta^3(\boldsymbol x-\boldsymbol y)$ と書くのは、全ての実 $h,k$ を掛けて積分したときにこの定理の式を与える、という**分布の意味**です。$\delta^3(0)$ を数値として扱う意味ではありません。

## 6. 粒子数、エネルギーと真空

生成・消滅が何を「一個」と数えるかは粒子数作用素で確かめられます。また古典場の正のエネルギーに対応する一粒子のエネルギーは $\omega_{\boldsymbol p}$ であり、多粒子では各粒子の和になります。**正規順序**とは生成演算子を消滅演算子の左に置き、交換で現れる定数項を自由Hamiltonianから取り除く規約です。まずその作用を $H_0$ として定義し、第7節で有限モードの元のエネルギー式と比較して差を検算します。

<a id="def-qft4-number-hamiltonian"></a>

<!-- formal-statement-start -->
> **定義（粒子数作用素と正規順序Hamiltonian）**
> $m>0$、$\Psi\in\mathcal D_{\mathcal S}$ とする。粒子数作用素 $N$ と自由な正規順序Hamiltonian $H_0$ を各 $n$ 粒子成分上で

$$
\begin{aligned}
(N\Psi)_n(\boldsymbol p_1,\ldots,\boldsymbol p_n)
&=n\Psi_n(\boldsymbol p_1,\ldots,\boldsymbol p_n),\\
(H_0\Psi)_n(\boldsymbol p_1,\ldots,\boldsymbol p_n)
&=\left(\sum_{j=1}^n\omega_{\boldsymbol p_j}\right)
\Psi_n(\boldsymbol p_1,\ldots,\boldsymbol p_n).
\end{aligned}
$$

> $n=0$ では和を零とする。いずれも $\mathcal D_{\mathcal S}$ を保つ対称な非負作用素である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft4-number-hamiltonian -->
### 例：零粒子・一粒子・二粒子のエネルギー

**定義の確認**：粒子数ごとの乗算則と、エネルギー和の各項を直接適用します。

$N\Omega=H_0\Omega=0$ です。一粒子波束 $f$ に対して $Nf=f$、$(H_0f)(\boldsymbol p)=\omega_{\boldsymbol p}f(\boldsymbol p)$。二粒子波束には

$$
(H_0\Psi)_2(\boldsymbol p,\boldsymbol q)
=(\omega_{\boldsymbol p}+\omega_{\boldsymbol q})\Psi_2(\boldsymbol p,\boldsymbol q)
$$

が作用します。$H_0$ は正ですが、どんな波束も質量 $m$ のちょうど整数倍のエネルギーを持つ、という意味ではありません。波束は様々な運動量を重ねているからです。
<!-- definition-example-end -->

<a id="prop-qft4-number-energy-commutators"></a>

<!-- formal-statement-start -->
> **命題（粒子数とエネルギーの生成交換子）**
> $m>0$、$f\in\mathcal S(\mathbb R^3;\mathbb C)$ とする。上の共通不変領域 $\mathcal D_{\mathcal S}$ 上で

$$
\begin{aligned}
[N,a^\dagger(f)]&=a^\dagger(f),
&[N,a(f)]&=-a(f),\\
[H_0,a^\dagger(f)]&=a^\dagger(\omega f),
&[H_0,a(f)]&=-a(\omega f)
\end{aligned}
$$

> が成立する。ただし $(\omega f)(\boldsymbol p)=\omega_{\boldsymbol p}f(\boldsymbol p)$ とする。
<!-- formal-statement-end -->

### 証明の見取り図

生成前は $n-1$ 個、生成後は $n$ 個なので、粒子数の差は一個です。エネルギーでは追加した変数の $\omega_{\boldsymbol p_j}$ だけが差として残ります。

<!-- proof-start -->
### 証明

生成の式で $n\ge1$ とすると、$Na^\dagger(f)$ には $n/\sqrt n$、$a^\dagger(f)N$ には $(n-1)/\sqrt n$ が掛かり、差は元の生成式です。同じ計算で消滅前後の粒子数は $n+1$ と $n$ なので、$[N,a(f)]=-a(f)$ です。

$H_0$ と生成の差を各 $n$ 粒子成分に書けば

$$
\begin{aligned}
&([H_0,a^\dagger(f)]\Psi)_n\\
&=\frac1{\sqrt n}\sum_{j=1}^n
\left[\sum_{r=1}^n\omega_{\boldsymbol p_r}
-\sum_{r\ne j}\omega_{\boldsymbol p_r}\right]
f(\boldsymbol p_j)\Psi_{n-1}(\widehat{\boldsymbol p_j})\\
&=\frac1{\sqrt n}\sum_{j=1}^n
\omega_{\boldsymbol p_j}f(\boldsymbol p_j)\Psi_{n-1}(\widehat{\boldsymbol p_j})
=(a^\dagger(\omega f)\Psi)_n.
\end{aligned}
$$

消滅の場合、$a(f)H_0$ の積分内のエネルギー和には取り去る $\boldsymbol q$ の $\omega_{\boldsymbol q}$ が余分に一個含まれます。差 $H_0a(f)-a(f)H_0$ は $-\sqrt{n+1}\int\omega_{\boldsymbol q}\overline{f(\boldsymbol q)}\Psi_{n+1}(\boldsymbol q,\ldots)d\mu$ で、$-a(\omega f)$ です。$\omega f$ は $m>0$ でSchwartz級を保ち、全ての式は共通領域で定義されます。
<!-- proof-end -->

## 7. 正規順序と零点エネルギーの意味

一つの調和振動子のエネルギーには、粒子が零個でも $\omega/2$ が残ります。無限個の運動量モードへ素朴に足すと、全ての $\omega/2$ の和は発散します。何を引いたか曖昧にしないため、まず**体積もモード数も有限**な周期箱と運動量カットオフを置いて確認します。

一辺 $L>0$ の周期箱で $\boldsymbol p=2\pi\boldsymbol n/L$（$\boldsymbol n\in\mathbb Z^3$）、$|\boldsymbol p|\le\Lambda$ の有限集合 $K_{L,\Lambda}$ を使います。実場では $\boldsymbol p$ と $-\boldsymbol p$ のFourier係数は複素共役なので、両者を**独立な複素座標**と数えてはいけません。各非零の対 $\{\boldsymbol p,-\boldsymbol p\}$ から一方を取った集合を $K_+$ とし、実直交規格化モードを

$$
e_0(\boldsymbol x)=L^{-3/2},\qquad
e_{\boldsymbol p,c}(\boldsymbol x)=\sqrt{\frac2{L^3}}\cos(\boldsymbol p\cdot\boldsymbol x),\qquad
e_{\boldsymbol p,s}(\boldsymbol x)=\sqrt{\frac2{L^3}}\sin(\boldsymbol p\cdot\boldsymbol x)
\quad(\boldsymbol p\in K_+)
$$

と取ります。実場とその共役運動量を $\phi=\sum_\alpha q_\alpha e_\alpha$、$\pi=\sum_\alpha\pi_\alpha e_\alpha$ と展開すると、周期積分での直交性から

$$
\int_{[0,L]^3}e_\alpha e_\beta\,d^3x=\delta_{\alpha\beta},\qquad
\int_{[0,L]^3}(\nabla e_\alpha\cdot\nabla e_\beta+m^2e_\alpha e_\beta)\,d^3x
=\omega_{\boldsymbol p(\alpha)}^2\delta_{\alpha\beta}.
$$

従って[QFT1の自由場のエネルギー密度](../QFT1/index.md#def-qft1-energy)を箱で積分すれば

$$
H=\frac12\sum_\alpha
\left(\pi_\alpha^2+\omega_{\boldsymbol p(\alpha)}^2q_\alpha^2\right).
$$

$\alpha$ は零モードまたは各余弦・正弦モードを走り、総数は $|K_{L,\Lambda}|$ です。そこでこの**実モードのラベル**を便宜的に $\boldsymbol p\in K_{L,\Lambda}$ と付け直します。各調和振動子に生成・消滅演算子 $b_{\boldsymbol p},b^\dagger_{\boldsymbol p}$ を対応させ、$[b_{\boldsymbol p},b^\dagger_{\boldsymbol q}]=\delta_{\boldsymbol p\boldsymbol q}$、$n_{\boldsymbol p}=b^\dagger_{\boldsymbol p}b_{\boldsymbol p}$ と置きます。この再ラベルは実場の $\pm\boldsymbol p$ の関係を捨てて独立自由度を倍にする操作ではありません。

<a id="prop-qft4-normal-order"></a>

<!-- formal-statement-start -->
> **命題（有限モードの正規順序と零点エネルギー）**
> $m>0$、$L,\Lambda>0$、有限モード集合 $K_{L,\Lambda}$ に対し、各モードの正準交換関係が成立するとする。形式的な自由振動子Hamiltonianとその正規順序形は

$$
\begin{aligned}
H_{L,\Lambda}^{\mathrm{bare}}
&=\sum_{\boldsymbol p\in K_{L,\Lambda}}
\omega_{\boldsymbol p}\left(b^\dagger_{\boldsymbol p}b_{\boldsymbol p}+\frac12I\right),\\
:H_{L,\Lambda}^{\mathrm{bare}}:
&=\sum_{\boldsymbol p\in K_{L,\Lambda}}
\omega_{\boldsymbol p}b^\dagger_{\boldsymbol p}b_{\boldsymbol p}
\end{aligned}
$$

> であり、両者の差は $\frac12\sum_{\boldsymbol p\in K_{L,\Lambda}}\omega_{\boldsymbol p}I$ である。$L$ を固定して $\Lambda\to\infty$ とすると、この差の係数は発散する。
<!-- formal-statement-end -->

### 証明の見取り図

一モードで $bb^\dagger=b^\dagger b+I$ を使って対称な二次式の生成演算子を左へ並べ替えます。正規順序ではその交換から出る定数項を除きます。カットオフを外した発散は、少なくとも無限個のモードが各 $m/2$ 以上寄与することから分かります。

<!-- proof-start -->
### 証明

各モードの正準座標を

$$
q_{\boldsymbol p}=\frac{b_{\boldsymbol p}+b^\dagger_{\boldsymbol p}}{\sqrt{2\omega_{\boldsymbol p}}},
\qquad
\pi_{\boldsymbol p}=-i\sqrt{\frac{\omega_{\boldsymbol p}}2}
(b_{\boldsymbol p}-b^\dagger_{\boldsymbol p})
$$

とすると、一モードの $\frac12(\pi_{\boldsymbol p}^2+\omega_{\boldsymbol p}^2q_{\boldsymbol p}^2)$ の中で $b^2$ と $(b^\dagger)^2$ は互いに打ち消し、残りは

$$
\frac{\omega_{\boldsymbol p}}2
(bb^\dagger+b^\dagger b)
=\omega_{\boldsymbol p}\left(b^\dagger b+\frac12I\right)
$$

となります。全モードを足し、生成を消滅より左に置く正規順序で $\omega/2$ の定数を除けば主張の式です。$K_{L,\Lambda}$ は $\Lambda\to\infty$ で無限個の格子点を含み、各 $\omega_{\boldsymbol p}\ge m>0$ だから

$$
\frac12\sum_{\boldsymbol p\in K_{L,\Lambda}}
\omega_{\boldsymbol p}
\ge\frac m2|K_{L,\Lambda}|\longrightarrow\infty.
$$

この発散は項ごとに正なので、通常の級数として有限値に収束することはありません。
<!-- proof-end -->

連続運動量の[本章の正規順序Hamiltonian](#def-qft4-number-hamiltonian) $H_0$ は、この有限モードの正規順序和に対応する構成です。真空エネルギーを零に**定義し直した**のであって、裸の零点エネルギーの無限和が有限であると示したわけではありません。重力へ結合した真空エネルギーや境界条件を変えたときの差は、この差し引きだけでは自動的に解決しません。

## 8. 演習

全問題で $m>0$、内積は第1変数線形、演算子の積・交換子は $\mathcal D_{\mathcal S}$ 上で考えるものとします。波束と試験関数は必要な変数についてSchwartz級とします。

### Level A：定義と規格化を手で確かめる

### 演習 QFT4-A1：対称二粒子波束のノルム

$f,g\in\mathcal S(\mathbb R^3;\mathbb C)\subset\mathfrak h$ を単位波束とし、$\Psi_2=(f\otimes g+g\otimes f)/\sqrt2$ とする。$\|\Psi_2\|^2$ を求め、$f=g$ の場合の規格化を述べよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

二乗を展開すると対角項は各 $\|f\|^2\|g\|^2/2=1/2$ です。交差項は

$$
\langle f\otimes g,g\otimes f\rangle
=\langle f,g\rangle\langle g,f\rangle
=|\langle f,g\rangle|^2.
$$

よって $\|\Psi_2\|^2=1+|\langle f,g\rangle|^2$ です。$f=g$ ならノルム二乗は $2$ なので、[生成・消滅演算子](#def-qft4-ladder-operators)の生成の式から単位状態は $f\otimes f=(a^\dagger(f))^2\Omega/\sqrt2$ となります。
<!-- solution-end -->

### 演習 QFT4-A2：一粒子状態への消滅作用

$f,g\in\mathcal S(\mathbb R^3)$ とし、$a(f)a^\dagger(g)\Omega$ を計算せよ。なぜ複素数が内積の引数 $g,f$ の順になるか説明せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[生成・消滅演算子の定義](#def-qft4-ladder-operators)から $a^\dagger(g)\Omega$ の一粒子成分は $g(\boldsymbol q)$ です。消滅の式に $n=0$ を使うと

$$
(a(f)a^\dagger(g)\Omega)_0
=\int\overline{f(\boldsymbol q)}g(\boldsymbol q)d\mu(\boldsymbol q)
=\langle g,f\rangle.
$$

他成分は零です。$a(f)$ は $f$ に反線形で、$a^\dagger(g)$ は $g$ に線形です。第1変数線形の内積では $\langle g,f\rangle$ が同じ線形性を持ちます。
<!-- solution-end -->

### 演習 QFT4-A3：真空に場を作用させる

実数値 $F\in\mathcal S(\mathbb R^4)$ に対し $u_F=\widetilde F(\omega,\boldsymbol p)/\sqrt{2\omega}$ とする。$\Phi(F)\Omega$ の粒子数とノルムを求め、$F\ne0$ でも結果が零となる条件を述べよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[実自由場のsmearingの定義](#def-qft4-smeared-field)で $a(u_F)\Omega=0$、生成の一粒子成分は $u_F$ です。従って粒子数は（非零なら）一個で

$$
\|\Phi(F)\Omega\|^2
=\|u_F\|^2
=\int d\mu(\boldsymbol p)
\frac{|\widetilde F(\omega_{\boldsymbol p},\boldsymbol p)|^2}{2\omega_{\boldsymbol p}}.
$$

結果が零である必要十分条件は $u_F=0$ が $d\mu$ についてほとんど至る所で成立することです。例えば $F=PG$（$G$ は実Schwartz、$P=\partial_t^2-\Delta+m^2$）なら質量殻上のFourier係数が零で、そのような非零 $F$ も取れます。
<!-- solution-end -->

### 演習 QFT4-A4：有限モードの零点エネルギー

周波数 $\omega_1=2$、$\omega_2=3$ の二つの独立な振動子があり、$H^{\mathrm{bare}}=\sum_{j=1}^2\omega_j(b_j^\dagger b_j+I/2)$ とする。真空と、第一モードに一個、第二モードに二個の粒子がいる状態の裸エネルギーおよび正規順序エネルギーを求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[有限モードの正規順序の式](#prop-qft4-normal-order)を使います。真空では両方の $b_j^\dagger b_j$ の固有値が零なので、裸エネルギーは $(2+3)/2=5/2$、正規順序では零です。粒子数 $(n_1,n_2)=(1,2)$ では

$$
H^{\mathrm{bare}}=2\left(1+\frac12\right)
+3\left(2+\frac12\right)=\frac{21}{2},
\qquad
:H:=2\cdot1+3\cdot2=8.
$$

差は状態に依らず $5/2$ です。正規順序は励起エネルギー $8$ を消してしまう操作ではありません。
<!-- solution-end -->

### 演習 QFT4-A5：粒子数を増減する交換子

$f\in\mathcal S(\mathbb R^3)$、$\Psi$ が $n$ 粒子成分のみ持つ有限粒子状態とする。$[N,a^\dagger(f)]\Psi$、$[N,a(f)]\Psi$ を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[生成・消滅演算子の定義](#def-qft4-ladder-operators)より $a^\dagger(f)\Psi$ は $n+1$ 粒子成分のみ、$a(f)\Psi$ は $n-1$ 粒子成分のみ（$n=0$ なら零）です。[粒子数作用素の定義](#def-qft4-number-hamiltonian)を作用させると

$$
\begin{aligned}
(Na^\dagger(f)-a^\dagger(f)N)\Psi
&=((n+1)-n)a^\dagger(f)\Psi,\\
(Na(f)-a(f)N)\Psi
&=((n-1)-n)a(f)\Psi.
\end{aligned}
$$

結論はそれぞれ $a^\dagger(f)\Psi$、$-a(f)\Psi$ です。$n=0$ では消滅結果が零なので後者も成立します。
<!-- solution-end -->

### Level B：複数の定義を接続する

### 演習 QFT4-B1：等時刻交換関係を再導出する

実Schwartz関数 $h,k$ と $t\in\mathbb R$ について、$u_{t,h}=e^{i\omega t}\widehat h/\sqrt{2\omega}$、$v_{t,k}=i\omega u_{t,k}$ とする。[本章のFock交換関係](#thm-qft4-fock-ccr)を用い $[\Phi_t(h),\Pi_t(k)]$ を計算し、$t$ に依存しないことを示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

消滅同士・生成同士は交換するので、残るのは

$$
\begin{aligned}
[\Phi_t(h),\Pi_t(k)]
&=[a(u_h),a^\dagger(v_k)]
+[a^\dagger(u_h),a(v_k)]\\
&=\langle v_k,u_h\rangle-\langle u_h,v_k\rangle.
\end{aligned}
$$

$v_k=i\omega u_k$ を代入し、$\overline{i\omega u_k}=-i\omega\overline{u_k}$ を確認すると

$$
[\Phi_t(h),\Pi_t(k)]
=\frac i2\int d\mu(\boldsymbol p)
\left[\widehat k\overline{\widehat h}+\widehat h\overline{\widehat k}\right]I.
$$

時刻に依存する指数因子は $e^{i\omega t}e^{-i\omega t}=1$ と相殺します。[FOU4のParseval内積等式](../../../解析系/FOU/FOU4/index.md#thm-fou4-parseval)を三座標に適用すると実関数の各積分は $\int hk\,d^3x$ なので、答えは $i\int hk\,d^3x\,I$ です。
<!-- solution-end -->

### 演習 QFT4-B2：波束のエネルギーと交換子

規格化されたSchwartz波束 $f$ に対して $|f\rangle=a^\dagger(f)\Omega$ とする。$\langle H_0f,f\rangle$（第1変数線形内積）を求め、$[H_0,a^\dagger(f)]\Omega$ がその計算と整合することを示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[粒子数作用素と正規順序Hamiltonian](#def-qft4-number-hamiltonian)の定義より一粒子成分では $H_0f=\omega f$、$\|f\|=1$ なので

$$
\langle H_0f,f\rangle
=\int\omega_{\boldsymbol p}|f(\boldsymbol p)|^2d\mu(\boldsymbol p)
\ge m.
$$

また $H_0\Omega=0$ だから

$$
[H_0,a^\dagger(f)]\Omega
=H_0a^\dagger(f)\Omega
=a^\dagger(\omega f)\Omega.
$$

右辺の一粒子成分は $\omega f$ であり、左辺のエネルギー作用と一致します。質量 $m$ はエネルギーの下界ですが、$\omega_{\boldsymbol p}=m$ となるのは測度零の $\boldsymbol p=0$ のみです。従って規格化された非零の $L^2$ 波束では期待値は実際には常に $m$ より大きくなります。
<!-- solution-end -->

### 演習 QFT4-B3：作用素値の弱方程式

実Schwartz関数 $G(t,\boldsymbol x)$ を取り、$F=(\partial_t^2-\Delta+m^2)G$ とする。$u_F=0$ をFourier変換から示し、$\Phi(F)\Omega$ のノルムと、一般の有限粒子ベクトルへの $\Phi(F)$ の作用を決定せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

Schwartz減衰で境界項が消えるため

$$
\widetilde F(E,\boldsymbol p)
=(-E^2+|\boldsymbol p|^2+m^2)\widetilde G(E,\boldsymbol p).
$$

$E=\omega_{\boldsymbol p}$ を代入すると係数は $-\omega^2+|\boldsymbol p|^2+m^2=0$。従って $u_F=0$、

$$
\Phi(F)=a(0)+a^\dagger(0)=0
\quad\text{on }\mathcal D_{\mathcal S}.
$$

特に真空への作用は零、ノルム二乗も零です。ただしこれは $F$ が必ず零関数であることを意味しません。実際、非零の $G$ を適切に選べば $PG$ も非零です。
<!-- solution-end -->

### 演習 QFT4-B4：非直交波束を二度生成する

単位Schwartz波束 $f,g$ について $\langle f,g\rangle=c$ とする。$a(f)a^\dagger(g)a^\dagger(f)\Omega$ を計算し、$f=g$ で係数が二倍になる理由を説明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$a(f)\Omega=0$ と[交換関係](#thm-qft4-fock-ccr)を用い、左から一つずつ交換すると

$$
\begin{aligned}
a(f)a^\dagger(g)a^\dagger(f)\Omega
&=\left(a^\dagger(g)a(f)+\langle g,f\rangle I\right)
a^\dagger(f)\Omega\\
&=a^\dagger(g)\left(a^\dagger(f)a(f)+\|f\|^2I\right)\Omega
+\langle g,f\rangle a^\dagger(f)\Omega\\
&=a^\dagger(g)\Omega+\overline c\,a^\dagger(f)\Omega.
\end{aligned}
$$

ここで $\langle g,f\rangle=\overline c$ です。$f=g$ なら $c=1$ で同じ一粒子状態が二回現れ、結果は $2a^\dagger(f)\Omega$ です。二粒子状態を取り去る候補が二つあることに対応します。
<!-- solution-end -->

### Level C：場・粒子・正規化を統合する

### 演習 QFT4-C1：Fock真空での場の検算

$m>0$ とし、実Schwartz関数 $F,G\in\mathcal S(\mathbb R^4)$、実空間Schwartz関数 $h,k$ を用いる。$u_F=\widetilde F(\omega,\boldsymbol p)/\sqrt{2\omega}$ とし、$\Phi(F)=a(u_F)+a^\dagger(u_F)$ とする。

1. 真空での二点の積 $\langle\Phi(F)\Phi(G)\Omega,\Omega\rangle$ を $u_F,u_G$ で表せ（この章では時間順序化しない）。
2. 積の順を交換した差を求め、真空行列要素と演算子交換子が一致することを確かめよ。
3. 時刻零の $\Phi_0(h),\Pi_0(k)$ で同じ計算を行い、$i\int hk$ を復元せよ。
4. $G$ を $PG_0$（$G_0$ は実Schwartz）に置き換えるとどうなるか説明せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

**(1)** $a(u_G)\Omega=0$ なので $\Phi(G)\Omega=a^\dagger(u_G)\Omega$ です。$\Phi(F)$ を掛けたとき零粒子成分を作るのは $a(u_F)$ だけです。[生成・消滅演算子の定義](#def-qft4-ladder-operators)から

$$
\langle\Phi(F)\Phi(G)\Omega,\Omega\rangle
=\langle u_G,u_F\rangle_{\mathfrak h}.
$$

右辺は $\int d\mu\,\widetilde G(\omega,p)\overline{\widetilde F(\omega,p)}/(2\omega)$ で有限です。

**(2)** 演算子の順を反転した期待値は $\langle u_F,u_G\rangle$ なので差は

$$
\langle u_G,u_F\rangle-\langle u_F,u_G\rangle.
$$

一方[交換関係](#thm-qft4-fock-ccr)で $[\Phi(F),\Phi(G)]$ を展開すると、消滅・生成の混合項だけが残り、同じ差のスカラー倍の恒等作用素となります。従って真空期待値と全有限粒子領域上の交換子は整合します。

**(3)** $u_h=\widehat h/\sqrt{2\omega}$、$v_k=i\omega\widehat k/\sqrt{2\omega}$ として、(2) と同じ展開から

$$
\begin{aligned}
[\Phi_0(h),\Pi_0(k)]
&=\langle v_k,u_h\rangle-\langle u_h,v_k\rangle\\
&=\frac i2\int d\mu\,
(\widehat k\overline{\widehat h}+\widehat h\overline{\widehat k})I\\
&=i\int_{\mathbb R^3}h(\boldsymbol x)k(\boldsymbol x)d^3x\,I.
\end{aligned}
$$

ここで最終段階に実関数への[FOU4のParseval内積等式](../../../解析系/FOU/FOU4/index.md#thm-fou4-parseval)を三座標に適用しました。$\omega$ が分母と分子で消えることが重要です。

**(4)** $G=PG_0$ の質量殻上のFourier変換は零なので $u_G=0$。従って $\Phi(G)=0$、(1)の二点量・(2)の交換子のいずれも零になります。これは場が自由Klein–Gordon方程式を試験関数の意味で満たすことと一致します。
<!-- solution-end -->

## 9. まとめと次の問い

- 対称多粒子波束のHilbert直和がFock空間であり、真空と有限粒子稠密領域を同時に指定する。
- 生成・消滅演算子の交換子は粒子変数の対称化から導出できる。等式が成り立つ**領域**も不可欠である。
- 実自由場はSchwartz試験関数を通して定義する作用素値分布で、質量殻上の波束に対応する。
- 等時刻の正準交換関係はFourier規格化と実関数の現実条件から再現される。
- 正規順序Hamiltonianの真空エネルギーは零に取れるが、裸の零点エネルギーの発散を有限値として計算したわけではない。

次は真空の二点関数を計算して、場同士の交換子が時空的分離でどう振る舞うかを調べます。**等時刻**の正準交換関係だけから、任意の空間的分離での局所的可換性を証明したことにはなりません。
