# QFT9 相互作用描像・Dyson級数・Wickの定理

<!-- definition-example-audit: strict -->

[QFT4の自由スカラー場とHamiltonian](../QFT4/index.md#def-qft4-number-hamiltonian)は粒子数を数え、[QFT6のFeynman二点分布](../QFT6/index.md#def-qft6-feynman-two-point)は時間順序を付けた二点の真空相関を与えました。[QFT8のDirac伝播関数](../QFT8/index.md#thm-qft8-propagator)では、フェルミオンの順序交換に負号が必要だと分かりました。しかし相互作用があると、自由Hamiltonianだけでは粒子を増減させる過程を計算できません。

この章の中心問いは、**自由場の二点関数だけを道具として、相互作用の有限次数の量子計算をどう組み立てるか**です。まず自由な時間発展と相互作用による変化を分け、次に時間順序を保って展開します。その各項の多数の場を二点関数へ分解するのがWickの定理です。最後に真空だけで閉じた寄与の規格化まで追います。

時空はMinkowski空間 $\mathbb R^{1,3}$、計量 $\eta=\operatorname{diag}(1,-1,-1,-1)$、$c=\hbar=1$、スカラー・Dirac自由場の質量は $m>0$ とします。

自由真空を $\Omega$、実スカラー場を $\phi_I(x)$、Dirac場を $\psi_I(x)$ と書きます。

自由真空期待値の $\langle\Omega,A\Omega\rangle$ は物理学のブラ・ケット式を略記したもので、[QFT8の第1変数線形の内積規約](../QFT8/index.md#def-qft8-fermion-fock)では $\langle A\Omega,\Omega\rangle$ を意味します。

作用素値分布を点で掛けた式は、**有限体積・有限モードの正則化を施した演算式、または相異なる点を[試験関数で積分（smearing）](../QFT4/index.md#def-qft4-smeared-field)した摂動計算の略記**です。同一点での積・カットオフを外した積の存在は、この記法だけからは従いません。

## 1. 自由発展と相互作用を分ける

非相対論の量子論でも、時間発展の全てを状態に持たせるSchrödinger描像と、全てを演算子に持たせるHeisenberg描像の間で自由に移れます。場の摂動論では、**計算済みの自由場だけを演算子として動かし**、残りの相互作用による状態変化を別に扱うと有利です。

まず有限次元Hilbert空間上で、自己共役な時間非依存の自由Hamiltonian $H_0$ と、連続な自己共役行列 $V(t)$ を考えます。全Hamiltonianは $H_S(t)=H_0+V(t)$、Schrödinger発展 $U_S(t,t_0)$ は

$$
i\frac{\partial}{\partial t}U_S(t,t_0)
=H_S(t)U_S(t,t_0),\qquad U_S(t_0,t_0)=I
$$

を満たすものとします。基準時刻 $t_0$ を固定し、$\partial_t=\partial/\partial t$ は第一引数 $t$ だけの微分を表します（$t_0$ は動かしません）。ここで自由発展 $e^{-iH_0(t-t_0)}$ を取り出します。

<a id="def-qft9-interaction-picture"></a>

<!-- formal-statement-start -->
> **定義（相互作用描像と相互作用Hamiltonian）**
> 有限次元Hilbert空間上の自己共役な時間非依存行列 $H_0$、連続な自己共役行列 $V(t)$、$H_S(t)=H_0+V(t)$ によるSchrödinger発展 $U_S(t,t_0)$ を取る。基準時刻 $t_0$ を固定し、相互作用描像の発展、相互作用Hamiltonian、Schrödinger描像の時刻非依存演算子 $A_S$ に対応する自由演算子を

$$
\begin{aligned}
U_I(t,t_0)&=e^{iH_0(t-t_0)}U_S(t,t_0),\\
H_I(t)&=e^{iH_0(t-t_0)}V(t)e^{-iH_0(t-t_0)},\\
A_I(t)&=e^{iH_0(t-t_0)}A_Se^{-iH_0(t-t_0)}
\end{aligned}
$$

> と定義する。状態は $\Psi_I(t)=U_I(t,t_0)\Psi_S(t_0)$ とし、相互作用を除けば $U_I=I$ となる。
<!-- formal-statement-end -->

この定義では $H_I(t)$ の自由変換と、実際に状態を動かす $U_I$ は別物です。たとえば実定数 $\lambda$ に対し $V(t)=\lambda A_S$ のとき、$A_S$ が $H_0$ と可換なら $H_I(t)=\lambda A_S$ は一定ですが、可換でなければ自由回転のため時刻依存します。

<!-- definition-example-start: def-qft9-interaction-picture -->
### 例：二準位系で自由回転を確かめる

**定義の確認**：[QFT7で用いたPauli行列](../QFT7/index.md#def-qft7-clifford)を $\sigma_x=\sigma^1$、$\sigma_y=\sigma^2$、$\sigma_z=\sigma^3$ と書き直します。$\omega,\lambda\in\mathbb R$、$t_0=0$、$H_0=\omega\sigma_z/2$、$V=\lambda\sigma_x$ とします。

標準基底 $e_+=(1,0)^{\mathsf T}$、$e_-=(0,1)^{\mathsf T}$ では $\sigma_ze_\pm=\pm e_\pm$、$\sigma_xe_+=e_-$、$\sigma_xe_-=e_+$ です。従ってこの基底は $H_0$ の固有基底で、自由指数は各固有値 $\pm\omega/2$ を指数化した対角行列です。定義の共役 $e^{iH_0t}Ve^{-iH_0t}$ を実際に掛けると

$$
e^{iH_0t}=
\begin{pmatrix}e^{i\omega t/2}&0\\0&e^{-i\omega t/2}\end{pmatrix},
\qquad
H_I(t)=\lambda
\begin{pmatrix}
0&e^{i\omega t/2}e^{i\omega t/2}\\
e^{-i\omega t/2}e^{-i\omega t/2}&0
\end{pmatrix}
=\lambda\begin{pmatrix}0&e^{i\omega t}\\e^{-i\omega t}&0\end{pmatrix}
$$

となります。非対角成分は複素共役なので $H_I(t)^\dagger=H_I(t)$、また $t=0$ で $H_I(0)=V$ です。$A_S=\sigma_x$ と選べば、定義した自由演算子にも同じ共役計算を適用でき、$\lambda$ の値と無関係に

$$
A_I(t)=\begin{pmatrix}0&e^{i\omega t}\\e^{-i\omega t}&0\end{pmatrix}
$$

と求まります。これは $H_I(t)=\lambda A_I(t)$ とも整合します。

残る発展の定義も、一定の全Hamiltonian $H_0+V$ から

$$
U_I(t,0)=e^{iH_0t}e^{-i(H_0+V)t},\qquad
U_I(0,0)=I,\qquad
V=0\ \Longrightarrow\ U_I(t,0)=I
$$

と確かめられます。さらに $\sigma_y$ の非対角成分 $\mp i$ を使うと

$$
H_I(t)=\lambda\bigl(\cos(\omega t)\sigma_x-\sin(\omega t)\sigma_y\bigr)
$$

となり、自由回転がどの演算子をどの基底で表しているかも分かります。**元の相互作用が時刻非依存でも、その自由回転は一般に時刻依存する**のです。
<!-- definition-example-end -->

<a id="thm-qft9-interaction-evolution"></a>

<!-- formal-statement-start -->
> **定理（相互作用描像の発展方程式）**
> 有限次元Hilbert空間、自己共役な $H_0$ と連続な自己共役 $V(t)$ を仮定する。[相互作用描像](#def-qft9-interaction-picture)で定義した $U_I(t,t_0)$ は初期値 $I$ とともに

$$
i\partial_tU_I(t,t_0)=H_I(t)U_I(t,t_0)
$$

> を満たす。従って全ての有限時刻で $U_I(t,t_0)^\dagger U_I(t,t_0)=I$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$U_I$ は全発展の左から自由発展の逆を掛けたものです。積の微分では $H_0$ に由来する二項が相殺され、$V(t)$ だけが残ります。生成子が自己共役ならノルムは変わりません。

<!-- proof-start -->
### 証明

定義に積の微分を使うと

$$
\begin{aligned}
i\partial_tU_I
&=-H_0e^{iH_0(t-t_0)}U_S
+e^{iH_0(t-t_0)}(H_0+V(t))U_S\\
&=e^{iH_0(t-t_0)}V(t)U_S\\
&=e^{iH_0(t-t_0)}V(t)e^{-iH_0(t-t_0)}U_I
=H_I(t)U_I.
\end{aligned}
$$

$H_I(t)^\dagger=H_I(t)$ なので $\partial_tU_I=-iH_IU_I$ と $\partial_tU_I^\dagger=iU_I^\dagger H_I$ です。従って

$$
\partial_t(U_I^\dagger U_I)
=iU_I^\dagger H_IU_I-iU_I^\dagger H_IU_I=0.
$$

初期値 $U_I(t_0,t_0)=I$ より $U_I^\dagger U_I=I$ です。有限次元ではこれはユニタリ性を意味します。
<!-- proof-end -->

自由場の摂動論では、[QFT4の有限粒子領域](../QFT4/index.md#def-qft4-fock-space)に自由演算子を置き、典型例として空間積分した正規順序多項式 $V_I(t)$ を使います。この $V_I(t)$ は非有界になり得るため、直前の有限次元定理を**無条件に**作用素値分布へ移してはいけません。本章ではDyson展開を有限次数の行列要素・smearingされた自由真空相関の計算規則として用い、完全な相互作用時間発展の存在は主張しません。

## 2. 時刻の順序を保ったDyson展開

[相互作用描像の発展方程式](#thm-qft9-interaction-evolution)を一回積分すれば、$t\ge t_0$ で

$$
U_I(t,t_0)=I-i\int_{t_0}^{t}H_I(s)U_I(s,t_0)\,ds
$$

です。右辺の $U_I$ にこの式をもう一度代入すると、後から作用する演算子の時刻が左に並びます。異なる時刻の $H_I$ が可換とは限らないので、積の順序を落とした通常の指数関数ではありません。

ここで「偶演算子」は時間順序の並べ替えにフェルミオン特有の負号を付けない演算子（ボース場やフェルミオン奇演算子の偶数個からなる相互作用など）を指します。奇演算子を並べ替える場合の規則は[QFT8の時間順序の定義](../QFT8/index.md#def-qft8-timeorder)に従い、第4節で改めて扱います。

<a id="def-qft9-dyson"></a>

<!-- formal-statement-start -->
> **定義（時間順序積とDyson級数）**
> 偶演算子 $A_1(t_1),\ldots,A_n(t_n)$ の時間順序積 $T[A_1(t_1)\cdots A_n(t_n)]$ は、時刻の大きい演算子を左に置いた積とする。同時刻の値は積分において測度零なので、ここでは相異なる時刻で定義する。有限次元で連続な自己共役 $H_I(t)$ に対し、Dyson級数を

$$
U_I(t,t_0)=\sum_{n=0}^{\infty}
\frac{(-i)^n}{n!}
\int_{t_0}^{t}dt_1\cdots\int_{t_0}^{t}dt_n\,
T[H_I(t_1)\cdots H_I(t_n)]
$$

> と呼ぶ。$n=0$ の項は $I$ とする。相互作用する場の計算では右辺を結合定数ごとの**形式的摂動級数**として用いる。
<!-- formal-statement-end -->

時間順序は「順列を全て足してから $n!$ で割る」操作です。その意味を二項で直接確認します。$t_1>t_2$ の領域では $T[H_1H_2]=H_1H_2$、反対側では $H_2H_1$ です。各領域で変数名を交換すると同じ積分になるので二等分が消えます。

<!-- definition-example-start: def-qft9-dyson -->
### 例：二つの時間領域と係数 $1/2!$

**定義の確認**：$\theta(u)$ は[QFT6の時刻切替係数](../QFT6/index.md#def-qft6-retarded-advanced)で、$u>0$ で1、$u<0$ で0です。相異なる時刻の時間順序積は

$$
T[H_I(t_1)H_I(t_2)]
=\theta(t_1-t_2)H_I(t_1)H_I(t_2)
+\theta(t_2-t_1)H_I(t_2)H_I(t_1).
$$

第二項の積分で $t_1$ と $t_2$ を入れ替えれば

$$
\frac12\int_{t_0}^{t}dt_1dt_2\,T[H_I(t_1)H_I(t_2)]
=\int_{t_0}^{t}dt_1\int_{t_0}^{t_1}dt_2\,
H_I(t_1)H_I(t_2).
$$

各時刻領域を一回ずつ数えており、$1/2!$ は積の一つを半分にする因子ではありません。
<!-- definition-example-end -->

<a id="thm-qft9-dyson-order"></a>

<!-- formal-statement-start -->
> **定理（Dyson展開の時間順序表示と二次ユニタリ性）**
> $t_0\le t$、有限次元Hilbert空間上の連続な自己共役 $H_I(s)$ を仮定する。相互作用発展の $n$ 次項は

$$
U^{(n)}=(-i)^n
\int_{t_0<t_n<\cdots<t_1<t}
dt_1\cdots dt_n\,H_I(t_1)\cdots H_I(t_n)
$$

> で与えられ、これは[Dyson級数](#def-qft9-dyson)の $n!$ 付き時間順序積に一致する。$U^{(0)}=I$ とし、次数を明示するため $H_I$ を $\varepsilon H_I$（実パラメータ $\varepsilon\to0$）へ置き換えると、二次までの積は

$$
(I+\varepsilon U^{(1)}+\varepsilon^2U^{(2)})^\dagger
(I+\varepsilon U^{(1)}+\varepsilon^2U^{(2)})=I+O(\varepsilon^3).
$$

> 有界な行列の場合、Dyson級数は有限区間上でノルム収束する。
<!-- formal-statement-end -->

### 証明の見取り図

反復積分は $t_1>t_2>\cdots>t_n$ の一つの単体を選びます。時間順序積は立方体を $n!$ 個の同形な単体へ分け、その一つずつの積を同じ順に並べます。二次ユニタリ性には正方形を二つの三角形へ分けるだけで足ります。

<!-- proof-start -->
### 証明

積分方程式を $n$ 回反復すると

$$
U^{(1)}=-i\int_{t_0}^{t}dt_1\,H_I(t_1),\qquad
U^{(2)}=(-i)^2\int_{t_0}^{t}dt_1\int_{t_0}^{t_1}dt_2\,
H_I(t_1)H_I(t_2)
$$

となり、三次では二次項の右側へもう一つ時刻積分を挿入して

$$
U^{(3)}=i\int_{t_0}^{t}dt_1
\int_{t_0}^{t_1}dt_2
\int_{t_0}^{t_2}dt_3\,
H_I(t_1)H_I(t_2)H_I(t_3)
$$

です。係数は $(-i)^3=i$、順序は $t_0<t_3<t_2<t_1<t$ です。一般の単体の各置換領域は変数の入替えにより同じ順序積分へ移るので、立方体上の時間順序積の積分は単体積分の $n!$ 倍です。$M=\sup_{s\in[t_0,t]}\|H_I(s)\|$ と置くと

$$
\|U^{(n)}\|\le\frac{(M|t-t_0|)^n}{n!}
$$

ですから指数級数に優越されて収束します。

次に $U_1=U^{(1)}$、$U_2=U^{(2)}$ と置きます。自己共役性から $U_1^\dagger=-U_1$ です。また

$$
\begin{aligned}
U_2&=-\int_{t_1>t_2}H_I(t_1)H_I(t_2)\,dt_1dt_2,\\
U_2^\dagger&=-\int_{t_1>t_2}H_I(t_2)H_I(t_1)\,dt_1dt_2
=-\int_{t_2>t_1}H_I(t_1)H_I(t_2)\,dt_1dt_2,\\
U_1^\dagger U_1&=\int_{[t_0,t]^2}
H_I(t_1)H_I(t_2)\,dt_1dt_2.
\end{aligned}
$$

よって $U_2+U_2^\dagger+U_1^\dagger U_1=0$ です。$H_I\mapsto\varepsilon H_I$ では $U_1$ が $\varepsilon$ 倍、$U_2$ が $\varepsilon^2$ 倍になり、積を二次まで展開すると一次も二次も相殺します。交差項 $U_1^\dagger U_2$ は $\varepsilon^3$、$U_2^\dagger U_2$ は $\varepsilon^4$ なので、残差は $O(\varepsilon^3)$ です。
<!-- proof-end -->

### 例：順序を捨てると交換子を見失う

短い時間区間 $[0,a]$ で $H_I=A$、続く $[a,2a]$ で $H_I=B$ とする二段の模型を考えます。時間順序から正しい発展は $e^{-iaB}e^{-iaA}$ です。一方、単純な指数 $e^{-ia(A+B)}$ の二次項には $-(a^2/2)(AB+BA)$ が入りますが、正しい積には $-a^2BA$ が入ります。差は

$$
e^{-iaB}e^{-iaA}-e^{-ia(A+B)}
=\frac{a^2}{2}[A,B]+O(a^3)
$$

です。非可換な場合、二次で既に差が現れます。段差のある $H_I$ は定理の連続性仮定から外れますが、区分的連続な行列の各区間をつないだこの例では指数関数の積として直接計算できます。

## 3. ボース場の時間順序積を二点関数へ分解する

Dysonの各項に例えば四次の場を含む相互作用を代入すると、場の積が何個も現れます。自由場では[QFT4の生成・消滅演算子の交換関係](../QFT4/index.md#thm-qft4-fock-ccr)から交差交換子が数（$c$-number）になるので、それを使って場を正規順序へ並べ替えられます。このとき出る二点の数が、[QFT6のFeynman二点分布](../QFT6/index.md#def-qft6-feynman-two-point)です。

[QFT4で導入した正規順序](../QFT4/index.md#prop-qft4-normal-order)では全ての生成演算子を消滅演算子の左に並べます。$\phi_I(x)=\phi^-(x)+\phi^+(x)$ と分け、$\phi^-$ は生成部分、$\phi^+$ は消滅部分とします。$:\!\phi_1\cdots\phi_n\!:$ はその並べ替え後の積を表し、交換時の数項は**加えません**。真空に関して、非自明な正規順序積の期待値は零です。

<a id="def-qft9-boson-contraction"></a>

<!-- formal-statement-start -->
> **定義（自由場のWick収縮）**
> 自由な実スカラー場 $\phi_i=\phi_I(x_i)$ を相異なる時空点で、または適切にsmearingして考える。二つの場のWick収縮を

$$
\operatorname{Contr}(\phi_i,\phi_j)
:=\langle\Omega,T[\phi_i\phi_j]\Omega\rangle
=D_F(x_i-x_j)
$$

> と定義する。$D_F$ は[スカラーFeynman二点分布](../QFT6/index.md#def-qft6-feynman-two-point)である。部分収縮は選んだ二つをこの数で置き換え、残る場を正規順序へ置いたものとする。
<!-- formal-statement-end -->

表示上の弧の記号を使わず、以下では単に「組 $(i,j)$ を収縮する」と書きます。$D_F$ は演算子でなく数値分布であり、残りの演算子と交換できます。二点だけなら

$$
T[\phi_i\phi_j]=:\!\phi_i\phi_j\!:+D_F(x_i-x_j)I
$$

です。これは真空期待値を取れば定義を直接検算できます。$i=j$ を含む同一点での $D_F(0)$ は一般に有限数ではなく、無断で代入してはいけません。

<!-- definition-example-start: def-qft9-boson-contraction -->
### 例：一つの振動子で収縮を確認する

**定義の確認**：$[a,a^\dagger]=1$、$a\Omega=0$ とし、$q(t)=(ae^{-i\omega t}+a^\dagger e^{i\omega t})/\sqrt{2\omega}$ とします。$t>s$ なら

$$
\langle\Omega,q(t)q(s)\Omega\rangle
=\frac1{2\omega}\langle\Omega,aa^\dagger\Omega\rangle
e^{-i\omega(t-s)}
=\frac{e^{-i\omega(t-s)}}{2\omega}.
$$

$s>t$ では時間順序を逆にして同じ計算を行うので、収縮は $e^{-i\omega|t-s|}/(2\omega)$ です。$q(t)q(s)$ で $a(t)a^\dagger(s)$ を正規順序へ入れ替える際に現れる $[a(t),a^\dagger(s)]$ が、まさにこの数です。場では運動量ごとにこれを積分して $D_F$ を得ます。
<!-- definition-example-end -->

全ての場の添字を余りなく二個ずつに分割した組の集合を「完全対合」と呼びます。$n$ が奇数なら完全対合は作れません。これに対し一部だけを組にするものを部分収縮と呼び、残る場は正規順序積になります。

<a id="thm-qft9-boson-wick"></a>

<!-- formal-statement-start -->
> **定理（ボース自由場のWickの定理）**
> 自由なボースFock真空と[正準交換関係](../QFT4/index.md#thm-qft4-fock-ccr)を仮定し、相異なる時空点の場を有限モードで正則化するか、意味のあるsmearingと行列要素で考える。このとき $n$ 個の自由場の時間順序積は、互いに重ならない零個以上の二点組の全ての選び方について、各組を[Wick収縮](#def-qft9-boson-contraction)し、非収縮の場を正規順序へ置いた項の和である。特に偶数個の真空期待値は全完全対合の収縮積の和、奇数個の期待値は零である。
<!-- formal-statement-end -->

### 証明の見取り図

時刻順に並んだ自由場を一個ずつ右側へ追加する際、左にある消滅部分を右の生成部分の向こうへ動かします。交換すると二点の数が一つ生まれます。新しい場が収縮しない場合と、先行する一つと収縮する場合を全て数えれば、全ての重なりのない組がちょうど一回出ます。

<!-- proof-start -->
### 証明

まず有限個の自由振動子の線形結合としての場に対して証明します。時刻の大きいものを左に並べて $\phi_1\cdots\phi_n$ と書き、各 $\phi_j=\phi_j^-+\phi_j^+$ とします。[QFT4のCCR](../QFT4/index.md#thm-qft4-fock-ccr)から生成部分同士・消滅部分同士は可換で、

$$
[\phi_i^+,\phi_j^-]
=\langle\Omega,\phi_i\phi_j\Omega\rangle I
\qquad(i<j\text{ は時刻の降順})
$$

です。例えば二個では

$$
\phi_i\phi_j
=:\!\phi_i\phi_j\!:+[\phi_i^+,\phi_j^-]
$$

となります。ここで添字順序を入れ替えて時刻順にした場合は、交換子の値も時間順序二点関数へ入れ替わるため、いずれも $D_F$ です。

$n$ 個で収縮の和が得られると仮定し、一つの場 $\phi_{n+1}$ を追加します。各項の正規順序積を再び並べるとき、$\phi_{n+1}$ は収縮されずその積に残るか、既存の未収縮の一つ $\phi_j$ と交換子を一回出して収縮されます。交換子は数なので、他の部分の並べ替えを変えません。新しい場を含まない既存の組と、組 $(j,n+1)$ を含む組が重複なく全て得られ、帰納法が閉じます。

真空期待値を取ると、未収縮の場が一つでも残る正規順序積は期待値零です。従って全ての場を対にする完全収縮だけが残ります。奇数個には完全対合が存在しません。
<!-- proof-end -->

### 例：四つの自由スカラー場は三つの組合せ

二点値を $D_{ij}=D_F(x_i-x_j)$ と略します。定理の真空期待値において、最初の場1の相手は2、3、4のどれかです。残る二つは一意に対になるので

$$
\langle\Omega,T[\phi_1\phi_2\phi_3\phi_4]\Omega\rangle
=D_{12}D_{34}+D_{13}D_{24}+D_{14}D_{23}.
$$

四点関数は二点関数の**積三項**であって、四点の新しい独立な自由真空相関を導入する必要はありません。ただし積が分布として定義できる領域と、点の衝突における問題を区別します。

### 例：正規順序二次積二つの係数 $1,4,2$

異なる二点 $x,y$ に $X=\phi_I(x)$、$Y=\phi_I(y)$、$D=D_F(x-y)$ を置きます。各頂点内の自己収縮を除くと、二つの $X$ と二つの $Y$ の間で選べる収縮数は0、1、2です。

$$
\begin{aligned}
T[:\!X^2\!::\!Y^2\!:]
={}&:\!X^2Y^2\!:
+\binom21\binom21 D:\!XY\!:
+\binom22\binom22\,2! D^2I\\
={}&:\!X^2Y^2\!:+4D:\!XY\!:+2D^2I.
\end{aligned}
$$

一組だけの係数は $2\times2=4$ 通り、二組では二つの $X$ を二つの $Y$ に割り当てる $2!=2$ 通りです。これは収縮の数え上げであり、Feynman図の対称因子を丸暗記する必要はありません。

## 4. フェルミオンでは順序交換が符号を変える

スカラー場の二点収縮だけでは、[QFT8の正準反交換関係](../QFT8/index.md#thm-qft8-car)を持つDirac場を扱えません。$\psi$ と $\bar\psi$ は粒子・反粒子の生成消滅を含む奇演算子で、[QFT8のフェルミオン時間順序](../QFT8/index.md#def-qft8-timeorder)では交換する度に負号が付きます。また残る場の「正規順序」は[QFT8のフェルミオン正規順序](../QFT8/index.md#def-qft8-observables)に従い、生成を左へ移す際の負号を保持し、反交換子の数項を足しません。ボース場の「全ての組を加える」という規則に、**組を作るための置換符号**を追加します。

<a id="def-qft9-fermion-contraction"></a>

<!-- formal-statement-start -->
> **定義（フェルミオンのWick収縮）**
> [自由Dirac場](../QFT8/index.md#def-qft8-field)を同じ自由真空 $\Omega$ 上で考え、$F_i$ を $\psi_\alpha(x)$ または $\bar\psi_\beta(y)$ の成分とする。奇演算子の時間順序積は、時刻順に並べる置換の符号を掛ける。二点の収縮は

$$
\operatorname{Contr}(F_i,F_j)
:=\langle\Omega,T[F_iF_j]\Omega\rangle
$$

> とし、特に

$$
\operatorname{Contr}(\psi_\alpha(x),\bar\psi_\beta(y))
=S_{F,\alpha\beta}(x-y),\qquad
\operatorname{Contr}(\bar\psi_\beta(y),\psi_\alpha(x))
=-S_{F,\alpha\beta}(x-y)
$$

> である。二つの $\psi$ 同士または二つの $\bar\psi$ 同士の収縮は自由Dirac真空では零である。$S_F$ は[Dirac時間順序二点分布](../QFT8/index.md#thm-qft8-propagator)である。
<!-- formal-statement-end -->

第二の式は異なる独立な物理法則ではありません。時間順序積で二つの奇演算子のラベルを交換したとき $T[\bar\psi\psi]=-T[\psi\bar\psi]$ となることから従います。例えば有限モードのCARを仮定しても、同じ順序反転を実際に確認できます。

<!-- definition-example-start: def-qft9-fermion-contraction -->
### 例：一モードでマイナスを作る

**定義の確認**：$\{c,c^\dagger\}=1$、$c\Omega=0$ とし、$F_1=c$、$F_2=c^\dagger$ を奇演算子とします。$F_1$ が後の時刻にある積の期待値は

$$
\langle\Omega,F_1F_2\Omega\rangle
=\langle\Omega,cc^\dagger\Omega\rangle=1.
$$

ラベルを逆にして同じ二時刻を時間順序すると、$T[F_2F_1]=-F_1F_2$ ですから期待値は $-1$ になります。**時間順序の符号**と、同一時刻での $\{c,c^\dagger\}=1$ は別に判定しています。
<!-- definition-example-end -->

ここで「奇置換数」は、二つの奇演算子を隣同士で交換する操作を何回行うかという数え方です。符号にはその回数の偶奇だけが効きます。例えば四個の列の第1・第4因子を組にするには、間の二因子を横切って二回交換します。

<a id="thm-qft9-fermion-wick"></a>

<!-- formal-statement-start -->
> **定理（フェルミオンのWickの定理と置換符号）**
> 有限個の[CARモード](../QFT8/index.md#thm-qft8-car)から構成した自由Fock真空と、その線形結合である奇演算子 $F_1,\ldots,F_n$ を仮定する。奇演算子の時間順序積は、互いに重ならない二点組の全ての選択にわたる、[フェルミオンのWick収縮](#def-qft9-fermion-contraction)と残りの正規順序積の和である。ただし各項には、収縮する組を隣同士に持って来て元の順序から作るときの奇置換数に応じた $(-1)^{\text{奇置換数}}$ を掛ける。完全収縮した偶数個の真空期待値は、この符号付きの対合和となる。
<!-- formal-statement-end -->

### 証明の見取り図

ボース場の証明で交換子を出していた操作を、CARによる反交換に置き換えます。ある消滅部分を生成部分に通すたびに負号が一つ生じ、最後の反交換子は二点の数になります。したがって二点組の「組合せ」だけでは足りず、その組を隣接させるため何個の奇演算子を横切ったかも数えます。

<!-- proof-start -->
### 証明

まず[QFT8のCAR](../QFT8/index.md#thm-qft8-car)の一組 $c,c^\dagger$ では $cc^\dagger=-c^\dagger c+\{c,c^\dagger\}$ です。各 $F_i=F_i^-+F_i^+$ の上付き $-$ を生成部分、$+$ を消滅部分として分けると、二つの線形結合の消滅部分 $F_i^+$ と生成部分 $F_j^-$ に対しても

$$
F_i^+F_j^-=-F_j^-F_i^++\{F_i^+,F_j^-\}
$$

です。CAR右端は単位演算子の数倍で、真空期待値の二点収縮に一致します。生成部分同士・消滅部分同士を逆順にする際もCARの零により負号だけが残ります。

時刻順に $F_1,\ldots,F_n$ を並べ、$n$ 個での展開を仮定します。$F_{n+1}$ を正規順序積に挿入する過程では、先に並んだ未収縮の各奇演算子を横切る度に $-1$ を掛けます。挿入した演算子が誰とも収縮しなければ、そのまま正規順序積の一因子となります。いずれか一つと収縮する場合は、その相手に到達するまでの横断数に対応する符号とCARの数項を残します。従って、新しい演算子を含む組・含まない組が全てちょうど一回現れ、符号は元の積から当該二点組を隣に移す必要な交換回数の奇数・偶数と一致します。$n=2$ は上のCAR計算ですから帰納法が成立します。

完全収縮の符号を独立に検算するには、既に時刻順に並べた $2r$ 個について、最初の $F_1$ の相手を $F_j$（$j\ge2$）と選びます。$F_j$ を $F_1$ の直後へ動かすには $j-2$ 回の奇演算子交換が必要です。完全収縮の和を $W$ と書けば、この数え上げは再帰式

$$
W(F_1,\ldots,F_{2r})
=\sum_{j=2}^{2r}(-1)^{j-2}
\operatorname{Contr}(F_1,F_j)
W(F_2,\ldots,\widehat{F_j},\ldots,F_{2r}),
\quad W(\varnothing)=1
$$

を与えます。真空期待値では未収縮の正規順序積が消えるため、この完全収縮の符号付き和だけが残ります。
<!-- proof-end -->

### 例：Dirac四点関数の相対負号

$\psi_a=\psi_{\alpha}(x)$、$\bar\psi_b=\bar\psi_{\beta}(y)$、$\psi_c=\psi_\gamma(z)$、$\bar\psi_d=\bar\psi_\delta(w)$ とし、添字を含めて $S_{ab}=\langle T\psi_a\bar\psi_b\rangle_0$ と略します。完全収縮には二つの非零な組があり、

$$
\begin{aligned}
\langle T[\psi_a\bar\psi_b\psi_c\bar\psi_d]\rangle_0
&= \operatorname{Contr}(\psi_a,\bar\psi_b)
\operatorname{Contr}(\psi_c,\bar\psi_d)\\
&\quad+\operatorname{Contr}(\psi_a,\bar\psi_d)
\operatorname{Contr}(\bar\psi_b,\psi_c)\\
&=S_{ab}S_{cd}-S_{ad}S_{cb}.
\end{aligned}
$$

二行目の第二項の収縮 $\operatorname{Contr}(\bar\psi_b,\psi_c)=-S_{cb}$ が負号を与えます。$(a,d)$ と $(b,c)$ の組は入れ子で、ラベルを元の順序で隣接させる追加の奇置換は偶数です。結果を $+S_{ad}S_{cb}$ としてしまうと、CARの符号を消してしまいます。これは同じ粒子の交換による相対マイナスの最小の計算です。

## 5. 真空規格化と相互作用の有限次数

Wick展開を相互作用へ使う最初の模型として、実スカラー場の正規順序四次相互作用を選びます。相互作用密度は $\lambda:\!\phi_I(x)^4\!:/4!$ とし、$\lambda$ は実結合定数です。外部関数 $g\in C_c^\infty(\mathbb R^4;\mathbb R)$ は、実数値・滑らか・コンパクト台を持つ切替関数で、相互作用を有限の時空領域だけでオンにします。自由場を有限モードに正則化して各次数の真空期待値を計算し、その後に連続極限の問題を別途考えます。

たとえば

$$
V_g(t)=\frac{\lambda}{4!}\int_{\mathbb R^3}d^3y\,
g(t,\boldsymbol y):\!\phi_I(t,\boldsymbol y)^4\!:
$$

です。積分の意味は正則化した段階で固定します。$\mathcal S_g=T\exp(-i\int V_g(t)\,dt)$ はDyson級数を短く記す**形式記号**であり、無限時間の物理的S行列が既に構成されたという意味ではありません。

真空だけの相互作用寄与まで一緒に数えると、外部の場を何も含まない収縮が相関関数に混入します。その自由真空の規格化を保つため、分母で真空期待値を割ります。

<a id="def-qft9-vacuum-normalization"></a>

<!-- formal-statement-start -->
> **定義（真空規格化した摂動相関関数）**
> 自由場の外部演算子 $O=T[\phi_I(x_1)\cdots\phi_I(x_r)]$ と、コンパクトに支持された切替関数 $g$ を取る。有限モード正則化の下で、真空規格化した摂動相関関数を形式級数

$$
G_g(x_1,\ldots,x_r)
:=\frac{\langle\Omega,T[\phi_I(x_1)\cdots\phi_I(x_r)\mathcal S_g]\Omega\rangle}
{\langle\Omega,\mathcal S_g\Omega\rangle},
\qquad
\mathcal S_g=T\exp\left(-i\int V_g(t)\,dt\right)
$$

> で定義する。分母の定数項は $1$ なので、結合定数 $\lambda$ に関する形式的逆数が存在する。各外部点は相異なるか、smearingされたものとする。
<!-- formal-statement-end -->

この比は、断熱極限 $g\to1$、無限体積極限、UVカットオフ除去の**後**に存在することを主張しません。これらの極限や相互作用する真空の構成には追加の議論が必要です。

<!-- definition-example-start: def-qft9-vacuum-normalization -->
### 例：零次と一次で分母を検算する

**定義の確認**：$\lambda=0$ では $\mathcal S_g=I$、分母は $\langle\Omega,\Omega\rangle=1$ で、$G_g$ は自由真空相関へ戻ります。一次では[QFT4で確認した正規順序](../QFT4/index.md#prop-qft4-normal-order)の真空期待値が零なので

$$
\langle\Omega,\mathcal S_g\Omega\rangle
=1-\frac{i\lambda}{4!}\int d^4y\,g(y)
\langle\Omega,:\!\phi_I(y)^4\!:\Omega\rangle
+O(\lambda^2)
=1+O(\lambda^2).
$$

この検算は一次の真空寄与が無いことを示しますが、二次以降に真空寄与が全くないとは言っていません。
<!-- definition-example-end -->

<a id="prop-qft9-vacuum-bubbles"></a>

<!-- formal-statement-start -->
> **命題（真空bubbleの摂動的相殺）**
> 自由Fock真空、コンパクト台の切替関数、有限モード正則化の下で、[真空規格化した摂動相関関数](#def-qft9-vacuum-normalization)を $\lambda$ の各有限次数に展開する。分子のWick完全収縮のうち、外部場に結ばれていない収縮成分だけからなる寄与は分母の展開と相殺する。一方、外部場を含む成分同士が互いに連結である必要はない。
<!-- formal-statement-end -->

### 証明の見取り図

$n$ 個の相互作用点のうち、外部場と関係のない点を $k$ 個選ぶ方法は $\binom nk$ 通りです。Dysonの $1/n!$ と合わせると $1/k!$ と $1/(n-k)!$ に分かれ、真空だけの収縮和が外部場付きの収縮和から因子として外れます。

<!-- proof-start -->
### 証明

有限正則化の各有限次数では、[ボース自由場のWickの定理](#thm-qft9-boson-wick)により完全収縮の有限和を取れます。各項の収縮グラフを、外部場に接する成分と、外部場から分離した真空成分に分割します。後者に属する相互作用点が $k$ 個、前者に属する点が $n-k$ 個なら、ラベル付きの点の選び方は $\binom nk$ 通りです。

$$
\frac1{n!}\binom nk=\frac1{k!(n-k)!}.
$$

$g$ の積分と局所相互作用の係数も二種類の点の間で積へ分かれるので、$k$ にわたる真空収縮和は $\langle\Omega,\mathcal S_g\Omega\rangle$ の級数そのものです。外部場に接する各成分だけの級数を $C_g$ と書けば、形式的に分子 $=C_g\langle\Omega,\mathcal S_g\Omega\rangle$ です。分母の定数項が1なので形式級数として割り算でき、$G_g=C_g$ が従います。

ここで $C_g$ に二つ以上の外部場付き連結成分が残っても、それらは真空成分ではないため割り算では消えません。
<!-- proof-end -->

### 例：四次相互作用の一次四外線と二次真空bubble

相異なる四つの外部点 $x_1,\ldots,x_4$ に対する一次項では、正規順序頂点 $:\!\phi(y)^4\!:$ の四つの因子を四外線へ一対一に割り当てます。割当は $4!$ 通りであり、相互作用の分母 $4!$ と相殺します。全四外線が頂点へ結ばれる一次寄与は

$$
-i\lambda\int d^4y\,g(y)\prod_{j=1}^{4}D_F(x_j-y).
$$

他方、外線なしの二次項は、二つの正規順序頂点 $y,z$ の間を四組で結ぶ $4!$ 通りの完全収縮です。よって

$$
\begin{aligned}
\langle\Omega,\mathcal S_g\Omega\rangle
&=1+\frac{(-i\lambda)^2}{2!(4!)^2}
\int d^4y\,d^4z\,g(y)g(z)\,4!D_F(y-z)^4
+O(\lambda^3)\\
&=1-\frac{\lambda^2}{48}
\int d^4y\,d^4z\,g(y)g(z)D_F(y-z)^4
+O(\lambda^3).
\end{aligned}
$$

この二次項は零ではありませんが、[命題](#prop-qft9-vacuum-bubbles)に従い相関関数の分母で消えます。$D_F(y-z)^4$ は四次元の連続場で点の衝突 $y=z$ を含むため、**この式は正則化なしに有限な積分だと読めません**。カットオフを外すための正則化・くりこみは後続で学びます。

## 6. 演習：順序・符号・収縮係数を自力で再構成する

有限次元行列に関する問題では定理の条件の下で計算します。自由場の問題では有限モードでの演算式、または各点をsmearingした形式的な摂動係数として扱い、点の衝突による積の存在は仮定しません。$\Omega$ は自由真空、$D_{ij}=D_F(x_i-x_j)$、$S_{ab}=\langle T\psi_a\bar\psi_b\rangle_0$ とします。

### Level A：一つの操作を正確に確認する

### 演習 QFT9-A1：相互作用描像の微分

$H_0=\operatorname{diag}(1,-1)$、$V=\lambda\begin{pmatrix}0&1\\1&0\end{pmatrix}$、$\lambda\in\mathbb R$、$t_0=0$ とする。$H_I(t)$ とその時間微分 $\partial_tH_I(t)$ を求め、自己共役性と $\partial_tH_I=i[H_0,H_I]$ を確認せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

自由発展は $e^{iH_0t}=\operatorname{diag}(e^{it},e^{-it})$ です。[相互作用描像の定義](#def-qft9-interaction-picture)に行列を代入して

$$
H_I(t)
=\begin{pmatrix}e^{it}&0\\0&e^{-it}\end{pmatrix}
\lambda\begin{pmatrix}0&1\\1&0\end{pmatrix}
\begin{pmatrix}e^{-it}&0\\0&e^{it}\end{pmatrix}
=\lambda\begin{pmatrix}0&e^{2it}\\e^{-2it}&0\end{pmatrix}.
$$

非対角成分は複素共役なので $H_I(t)^\dagger=H_I(t)$ です。$t=0$ では元の $V$ に戻ります。$H_0$ は時刻に依存せず、$\partial_t$ は $t$ だけを動かします。従って

$$
\begin{aligned}
\partial_tH_I(t)
&=2i\lambda\begin{pmatrix}0&e^{2it}\\-e^{-2it}&0\end{pmatrix},\\
[H_0,H_I(t)]
&=2\lambda\begin{pmatrix}0&e^{2it}\\-e^{-2it}&0\end{pmatrix}.
\end{aligned}
$$

これは $\partial_tH_I=i[H_0,H_I]$ と一致します。実際、定義の $e^{iH_0t}Ve^{-iH_0t}$ を積の微分で扱っても、$\partial_tH_I=iH_0H_I-iH_IH_0$ です。
<!-- solution-end -->

### 演習 QFT9-A2：二次Dyson積分の二領域

$H_I(t)=H$ を一定の自己共役行列、$t_0=0$、$t=T>0$ とする。Dysonの一次・二次項を計算し、$e^{-iHT}$ の二次までと一致することを確かめよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[Dysonの時間順序表示](#thm-qft9-dyson-order)で時刻依存がないため、積分の領域だけが残ります。

$$
U^{(1)}=-i\int_0^TH\,dt_1=-iTH,
\qquad
U^{(2)}=-\int_0^Tdt_1\int_0^{t_1}dt_2\,H^2
=-\frac{T^2}{2}H^2.
$$

二重積分は $\int_0^T t_1dt_1=T^2/2$ です。従って $I+U^{(1)}+U^{(2)}=I-iTH-(T^2/2)H^2$ で、べき級数 $\sum_{n=0}^\infty(-iTH)^n/n!$ の二次までと一致します。
<!-- solution-end -->

### 演習 QFT9-A3：自由スカラー四点の完全収縮

異なる四点の自由スカラー場 $\phi_j$ に対し、$\langle T\phi_1\phi_2\phi_3\phi_4\rangle_0$ を二点関数 $D_{ij}$ で表せ。組が三通りである理由も述べよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[ボース自由場のWickの定理](#thm-qft9-boson-wick)で真空期待値が残るのは完全収縮だけです。まず場1の相手を2、3、4から選び、残り二個を組にします。

$$
\{(1,2),(3,4)\},\quad
\{(1,3),(2,4)\},\quad
\{(1,4),(2,3)\}.
$$

よって

$$
\langle T\phi_1\phi_2\phi_3\phi_4\rangle_0
=D_{12}D_{34}+D_{13}D_{24}+D_{14}D_{23}.
$$

同じ対合を左右の順序で二回数える必要はありません。ボース場の収縮には追加の置換負号もありません。
<!-- solution-end -->

### 演習 QFT9-A4：二つの正規順序二次積

$X=\phi_I(x)$、$Y=\phi_I(y)$、$x\ne y$ とする。$T[:\!X^2\!::\!Y^2\!:]$ のうち、頂点間の収縮が0、1、2組の各係数を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

同じ頂点内の自己収縮は正規順序によって禁止されています。[Wickの定理](#thm-qft9-boson-wick)で0組なら係数1、1組なら $X$ の二個から一個、$Y$ の二個から一個で $\binom21^2=4$ です。2組なら双方の二個を全て選び、二個の対応を $2!=2$ 通りで取るので

$$
T[:\!X^2\!::\!Y^2\!:]
=:\!X^2Y^2\!:+4D_F(x-y):\!XY\!:+2D_F(x-y)^2I.
$$

無収縮の項の場も必ず正規順序であり、時間順序積をそのまま残すのではありません。
<!-- solution-end -->

### 演習 QFT9-A5：フェルミオン二点の順序反転

自由Dirac場の成分について $\langle T\psi_a\bar\psi_b\rangle_0=S_{ab}$ とする。$\langle T\bar\psi_b\psi_a\rangle_0$ と、$\langle T\psi_a\psi_c\rangle_0$ を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[フェルミオンの時間順序](#def-qft9-fermion-contraction)は奇演算子二つの交換に負号を付けるので

$$
\langle T\bar\psi_b\psi_a\rangle_0
=-\langle T\psi_a\bar\psi_b\rangle_0=-S_{ab}.
$$

また自由Dirac場の $\psi$ は粒子の消滅と反粒子の生成を含み、二つの $\psi$ の真空期待値では生成・消滅の対応が作れません。従って $\langle T\psi_a\psi_c\rangle_0=0$ です。電荷を保存する自由真空であることが後者の零に対応します。
<!-- solution-end -->

### Level B：二つ以上の仕組みをつなぐ

### 演習 QFT9-B1：二次ユニタリ性を積分領域から示す

$H_I(s)=H_I(s)^\dagger$ を $[0,T]$ 上の連続な有限次元行列とする。$U_1=-i\int_0^TH_I(s)ds$、$U_2=-\int_{0<s_2<s_1<T}H_I(s_1)H_I(s_2)\,ds_1ds_2$ と置く。$U_1+U_1^\dagger=0$、$U_2+U_2^\dagger+U_1^\dagger U_1=0$ を示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

自己共役性と積分の随伴を交換できる有限次元の仮定から

$$
U_1^\dagger=i\int_0^TH_I(s)ds=-U_1.
$$

次に積の随伴では順序が逆転します。従って

$$
\begin{aligned}
U_2^\dagger
&=-\int_{0<s_2<s_1<T}H_I(s_2)H_I(s_1)\,ds_1ds_2\\
&=-\int_{0<s_1<s_2<T}H_I(s_1)H_I(s_2)\,ds_1ds_2.
\end{aligned}
$$

一方、$(-i)^*=i$ なので

$$
U_1^\dagger U_1
=\int_0^Tds_1\int_0^Tds_2\,H_I(s_1)H_I(s_2).
$$

正方形 $[0,T]^2$ は $s_1>s_2$ と $s_2>s_1$ の二つの三角形に分かれ、対角線は測度零です。前の二つの負の三角積分と最後の正の正方形積分が相殺するので、二次の係数は零です。これは[Dyson展開の定理](#thm-qft9-dyson-order)の二次検算です。
<!-- solution-end -->

### 演習 QFT9-B2：非可換な二段の相互作用

$H_I(t)=A$（$0<t<a$）、$H_I(t)=B$（$a<t<2a$）、$A=\alpha\sigma_x$、$B=\beta\sigma_y$、$\alpha,\beta\in\mathbb R$ とする。時間順序発展と $e^{-ia(A+B)}$ を二次まで比較し、差を行列で示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

二つの区間で発展を続けて作用させるため、後の $B$ が左です。

$$
U_I(2a,0)=e^{-iaB}e^{-iaA}.
$$

二次までそれぞれ展開し、積の順序を保つと

$$
U_I=I-ia(A+B)-\frac{a^2}{2}(A^2+B^2)-a^2BA+O(a^3).
$$

一方、単純指数の展開は

$$
e^{-ia(A+B)}
=I-ia(A+B)-\frac{a^2}{2}(A^2+AB+BA+B^2)+O(a^3).
$$

従って差は $a^2[A,B]/2$ です。Pauli行列の積を直接計算すると

$$
\sigma_x\sigma_y=i\sigma_z,\qquad
\sigma_y\sigma_x=-i\sigma_z,\qquad
[A,B]=2i\alpha\beta\sigma_z.
$$

よって

$$
U_I(2a,0)-e^{-ia(A+B)}
=ia^2\alpha\beta\sigma_z+O(a^3).
$$

$\alpha\beta=0$ ならこの差は消えます。非可換な相互作用で時刻順序が必要な理由を、具体行列で確認しました。
<!-- solution-end -->

### 演習 QFT9-B3：異なる次数の正規順序単項式

二つの異なる点の実自由場を $X=\phi_I(x)$、$Y=\phi_I(y)$、$D=D_F(x-y)$ とする。$T[:\!X^3\!::\!Y^2\!:]$ をWick展開し、各項の係数を数え上げよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

各頂点の内部では正規順序を既に取っているので、$X$ と $Y$ の間だけを収縮します。一組の収縮は $X$ の三つから一つ、$Y$ の二つから一つ選ぶため $\binom31\binom21=6$ 通りです。二組なら三つの $X$ から二つ、二つの $Y$ から二つを選び、対応を $2!$ 通り取るため $\binom32\binom22\,2!=6$ 通りです。

$$
\begin{aligned}
T[:\!X^3\!::\!Y^2\!:]
&=:\!X^3Y^2\!:
+6D:\!X^2Y\!:
+6D^2:\!X\!:.
\end{aligned}
$$

三組目は $Y$ の因子が二つしかないため不可能です。右辺の最後には未収縮の $X$ が一つ残りますから、真空期待値を取ると三項とも零です。総因子数が5個の奇数であることとも整合します。
<!-- solution-end -->

### 演習 QFT9-B4：Dirac四点の二つの収縮

自由Dirac真空で $F_1=\psi_a$、$F_2=\bar\psi_b$、$F_3=\psi_c$、$F_4=\bar\psi_d$ とする。全完全収縮を書き、$\langle T[F_1F_2F_3F_4]\rangle_0$ を $S_{ab},S_{cd},S_{ad},S_{cb}$ で表せ。なぜ交差項に負号が付くか説明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[フェルミオンWickの定理](#thm-qft9-fermion-wick)で、同種二つの $\psi$ 同士、同種二つの $\bar\psi$ 同士の収縮は零です。従って候補は

$$
\{(1,2),(3,4)\},\qquad
\{(1,4),(2,3)\}
$$

の二つだけです。前者は $S_{ab}S_{cd}$ です。後者で、原順序の中の $(2,3)$ の収縮は

$$
\operatorname{Contr}(F_2,F_3)
=\langle T\bar\psi_b\psi_c\rangle_0=-S_{cb}
$$

です。外側の $(1,4)$ の収縮は $S_{ad}$ です。二組は入れ子で、その並べ替えには余分な奇置換が偶数回しかありません。よって

$$
\langle T\psi_a\bar\psi_b\psi_c\bar\psi_d\rangle_0
=S_{ab}S_{cd}-S_{ad}S_{cb}.
$$

$F_2F_3$ をボース場のように $F_3F_2$ へ負号なしに交換してしまうと、誤った正符号になります。
<!-- solution-end -->

### Level C：相互作用の外線と真空項を統合する

### 演習 QFT9-C1：四次相互作用の一次四外線と二次真空項

質量 $m>0$ の実自由場の有限モード正則化を考え、実数値の $g\in C_c^\infty(\mathbb R^4;\mathbb R)$ と実 $\lambda$ に対し

$$
\mathcal S_g=T\exp\left(
-\frac{i\lambda}{4!}\int d^4y\,g(y):\!\phi_I(y)^4\!:
\right)
$$

を形式級数とする。相異なる外部点 $x_1,\ldots,x_4$ について以下を示せ。

1. $\langle\mathcal S_g\rangle_0$ の $\lambda$ 一次項は零である。
2. $\langle T[\prod_{j=1}^4\phi_I(x_j)\mathcal S_g]\rangle_0$ の一次項を計算し、正規順序頂点に接続する四外線の係数を求めよ。
3. $\langle\mathcal S_g\rangle_0$ の $\lambda^2$ 項を計算し、その寄与が規格化相関関数ではどのように消えるか説明せよ。
4. カットオフを外した四次元の場で、計算した二次積分を自動的に有限数と見なせない理由を述べよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

**(1) 一次の真空期待値。** Dyson展開は

$$
\mathcal S_g
=I-\frac{i\lambda}{4!}\int d^4y\,g(y):\!\phi_I(y)^4\!:
+O(\lambda^2)
$$

です。自由真空は[正規順序積](../QFT4/index.md#prop-qft4-normal-order)に対し $\langle:\!\phi_I(y)^4\!:\rangle_0=0$ を与えるので

$$
\langle\mathcal S_g\rangle_0=1+O(\lambda^2).
$$

**(2) 四外線の一次係数。** 外部の場は四個、頂点の場も四個です。頂点内は正規順序のため自己収縮できず、全ての頂点因子を外部の四場へ一対一に結びます。外部1の相手には4通り、外部2には残り3通り、外部3には2通り、外部4には1通りあり、総数は $4\cdot3\cdot2\cdot1=4!$ です。各割当に対し、[ボース自由場のWickの定理](#thm-qft9-boson-wick)で

$$
\langle T[\phi_I(x_1)\cdots\phi_I(x_4):\!\phi_I(y)^4\!:]\rangle_0
=4!\prod_{j=1}^{4}D_F(x_j-y).
$$

よって一次係数は

$$
-\frac{i\lambda}{4!}\int d^4y\,g(y)\,4!\prod_{j=1}^{4}D_F(x_j-y)
=-i\lambda\int d^4y\,g(y)\prod_{j=1}^{4}D_F(x_j-y).
$$

自由四点相関という零次の寄与も別にありますが、ここでは一次係数だけを計算しました。

**(3) 二次の真空寄与と規格化。** 分母の二次は

$$
\frac{(-i\lambda)^2}{2!(4!)^2}
\int d^4y\,d^4z\,g(y)g(z)
\langle T[:\!\phi_I(y)^4\!::\!\phi_I(z)^4\!:]\rangle_0.
$$

真空期待値では全八場を対にする必要があります。頂点内の自己収縮は禁止されるので、$y$ の四場と $z$ の四場を全単射で対応させる $4!$ 通りだけが残ります。つまり期待値は $4!D_F(y-z)^4$ です。従って分母は

$$
1-\frac{\lambda^2}{2\cdot4!}\int d^4y\,d^4z\,
g(y)g(z)D_F(y-z)^4+O(\lambda^3)
=1-\frac{\lambda^2}{48}\int g(y)g(z)D_F(y-z)^4\,d^4y\,d^4z
+O(\lambda^3).
$$

この二次積分全体を $b_2$ と書くと、形式的逆数は $(1+\lambda^2b_2+\cdots)^{-1}=1-\lambda^2b_2+\cdots$ です。分子の零次自由四点相関に、同じ真空bubbleを独立に掛けた $\lambda^2b_2$ の項は、この逆数による $-\lambda^2b_2$ の項で相殺します。他の次数でも[真空bubbleの相殺](#prop-qft9-vacuum-bubbles)が同様に働きます。外線がつながる収縮まで消すわけではありません。

**(4) 正則化の役割。** $D_F$ は[分布としてのFeynman二点核](../QFT6/index.md#def-qft6-feynman-two-point)であり、$D_F(y-z)^4$ は $y=z$ での特異な分布の積です。異なる点で普通の関数のように計算できたとしても、対角を含む四次元積分の定義と有限性は従いません。有限モードの核でまず計算した後、そのカットオフ除去には積の拡張・正則化・くりこみ条件が必要です。
<!-- solution-end -->

## 7. まとめ：自由場のデータから摂動項へ

- 相互作用描像では、自由発展を演算子側に持たせ、状態を $i\partial_tU_I=H_IU_I$ で進めます。有限次元行列でこの分解とユニタリ性を証明し、非有界場への無条件拡張は避けました。
- Dyson級数は時刻の順序を保つ単体積分です。$1/n!$ は $n!$ 個の時間順序領域を数える係数であり、非可換な発展を通常の指数関数へ置き換えることはできません。
- ボース自由場のWickの定理は、CCRから二点収縮の全対合を導きます。例えば四点真空関数には三組の完全収縮があり、二つの正規順序二次頂点の間の係数は $1,4,2$ です。
- Dirac場ではCARにより奇演算子を交換するたび負号が付きます。四点真空関数は $S_{ab}S_{cd}-S_{ad}S_{cb}$ となります。
- 真空規格化は外線に接続しないbubbleだけを摂動的に相殺します。ここでの収縮計算は正則化された有限次数のもので、連続理論の相互作用・無限時間の散乱行列を自動的に構成したことにはなりません。

次の段階では、こうして得た四次・三次の局所相互作用の収縮を運動量空間に移し、頂点規則、対称因子、連結性を具体的な図式と照合します。
