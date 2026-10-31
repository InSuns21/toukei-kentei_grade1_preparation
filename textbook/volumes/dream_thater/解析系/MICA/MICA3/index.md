# MICA3 波面集合の定義と基本性質

[MICA2の方向別Fourier規則性](../MICA2/index.md#def-mica2-directional-regularity)は、「位置 $x_0$ と非零周波数方向 $\xi_0$ を指定すると、その方向で局所Fourier変換が急減少するか」を判定しました。例えば直線上に集中する分布は、直線に沿う周波数方向では規則的でも、直線に垂直な周波数方向では規則的とは限りません。

これまでの判定を毎回「規則的な方向」として列挙するのは不便です。そこで、**規則的でない位置・方向の組**だけを集めます。この集合を定義すると、特異点の場所への射影、滑らかな関数を掛ける操作、微分による特異性の変化を一つの言葉で追えます。

本講義では $\mathbb R^n$（$n\ge1$）上のスカラー分布 $u\in\mathcal D'(\mathbb R^n)$ を扱います。位置 $x\in\mathbb R^n$ と周波数 $\xi\in\mathbb R^n$ を区別し、Fourier変換は

$$
\widehat{\chi u}(\xi)=\langle u,\chi(x)e^{-ix\cdot\xi}\rangle,
\qquad \chi\in C_c^\infty(\mathbb R^n)
$$

とします。これは[局所Fourier変換の定義](../MICA1/index.md#def-mica1-local-fourier)と同じ符号規約です。座標を固定した $\mathbb R^n$ では $\xi=\sum_j\xi_j\,dx^j$ を点 $x$ の**余ベクトル**と見なせるので、組 $(x,\xi)$ は $T^*\mathbb R^n$ の元です。ここでは $\xi=0$ を除いた部分だけを考えます。一般の座標変換で余ベクトルがどう動くかは MICA5 で証明します。

## 1. 規則的でない組を集める

前講の判定は、$x_0$ の近傍で $1$ となる一つのcutoff $\chi$ と、$\xi_0$ を含む一つの[開錐](../MICA2/index.md#def-mica2-open-cone) $\Gamma$ の存在を要求しました。$\widehat{\chi u}$ がその錐上で**すべての次数**について急減少するなら、$(x_0,\xi_0)$ は規則的です。

今度は、そのような組が存在しない側を記録します。「どのcutoffでも、どの開錐でも失敗する」という否定の量化順序が重要です。

<a id="def-mica3-wavefront"></a>

<!-- formal-statement-start -->
> **定義（波面集合）**
>
> $n\ge1$、$u\in\mathcal D'(\mathbb R^n)$ とする。$u$ の**波面集合**（wavefront set）$WF(u)$ は、$\mathbb R^n\times(\mathbb R^n\setminus\{0\})$ のうち、[MICA2の方向別Fourier規則性](../MICA2/index.md#def-mica2-directional-regularity)を持たない組の集合とする。すなわち

$$
\begin{aligned}
(x_0,\xi_0)\notin WF(u)
\quad\Longleftrightarrow\quad
&\ \exists\chi\in C_c^\infty,\quad \chi=1\ \text{near }x_0,\\
&\ \exists\text{ open cone }\Gamma\ni\xi_0,\quad
\forall N\in\mathbb N_0,\ \exists C_N<\infty:\\
&\ |\widehat{\chi u}(\xi)|\le C_N(1+|\xi|)^{-N}
\quad(\xi\in\Gamma).
\end{aligned}
$$

> と定める。$WF(u)$ には零方向 $(x,0)$ を含めない。
<!-- formal-statement-end -->

定義は補集合の形で書いてあります。したがって $(x_0,\xi_0)\in WF(u)$ を直接示すには、**任意**の許された $\chi$ と $\Gamma$ に対して、少なくとも一つの減衰次数が破れることを示します。反対に、$WF(u)$ の外であることを示すには、条件を満たす $\chi,\Gamma$ を一組具体的に作れば十分です。

<!-- definition-example-start: def-mica3-wavefront -->
### 直接例：点に集中するDirac分布

**定義の確認**。cutoffと開錐の存在条件を、特異点の外と内で別々に確認します。

$a\in\mathbb R^n$ とし、$\langle\delta_a,\varphi\rangle=\varphi(a)$ と定めます。$x_0\ne a$ なら、$a$ を避けた小近傍に台を持ち $x_0$ 近くで $1$ となるcutoff $\chi$ を取れます。このとき $\chi\delta_a=0$ なので、任意の錐においてすべての次数で減衰します。

一方 $x_0=a$ では、任意の $\chi=1$ near $a$ に対して

$$
\widehat{\chi\delta_a}(\xi)
=\chi(a)e^{-ia\cdot\xi}=e^{-ia\cdot\xi},
\qquad |\widehat{\chi\delta_a}(\xi)|=1.
$$

任意の $\xi_0\ne0$ とその開錐 $\Gamma$ に対し、$t\xi_0\in\Gamma$（$t>0$）であり、$t\to\infty$ とすると $N=1$ の右辺 $C_1(1+t|\xi_0|)^{-1}$ は零に向かいます。左辺は $1$ のままなので不可能です。従って定義の両方の方向を確かめて

$$
WF(\delta_a)=\{(a,\xi):\xi\in\mathbb R^n\setminus\{0\}\}
$$

を得ます。位置は一点ですが、その点の**全非零方向**が残っています。
<!-- definition-example-end -->

### 滑らかな関数との対比

$f\in C^\infty(\mathbb R^n)$ が表す分布では、任意の $x_0$ の近くに台を持つcutoff $\chi$ に対し $\chi f\in C_c^\infty$ です。[コンパクト支持超関数のFourier急減少と滑らかさの同値](../MICA1/index.md#thm-mica1-smooth-rapid)からすべての方向で規則的なので $WF(f)=\varnothing$ です。例えば定数関数 $1$ の通常の台は $\mathbb R^n$ 全体ですが、波面集合は空です。台が大きいことと特異性があることは別です。

## 2. 集合としての形と特異支持

波面集合は、周波数ベクトルの長さそのものを記録しません。$\xi$ を正の倍率で伸ばしたとき、ある方向での急減少という条件は変わらないためです。また、規則的な組は近くの位置・方向でも規則的であると[前講で証明](../MICA2/index.md#prop-mica2-regularity-open)しました。この二つから、波面集合の基本的な幾何が決まります。

<a id="prop-mica3-closed-conic"></a>

<!-- formal-statement-start -->
> **命題（波面集合の相対閉性と正の錐性）**
>
> $u\in\mathcal D'(\mathbb R^n)$ に対して $WF(u)$ は $\mathbb R^n\times(\mathbb R^n\setminus\{0\})$ の部分空間位相で閉集合である。また

$$
(x,\xi)\in WF(u),\ t>0
\quad\Longleftrightarrow\quad
(x,t\xi)\in WF(u)
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

規則的な組の集合は開集合なので、その補集合である波面集合は相対閉です。周波数方向を正に拡大しても同じ開錐に属するため、規則性・非規則性のいずれも変わりません。

<!-- proof-start -->
### 証明

$R(u)$ を方向別Fourier規則性を持つ組全体とします。[方向別規則性の開放性](../MICA2/index.md#prop-mica2-regularity-open)により、任意の $(x_0,\xi_0)\in R(u)$ の周りに $V\times\Gamma_0\subset R(u)$ という開近傍があります。したがって $R(u)$ は開、$WF(u)=\bigl(\mathbb R^n\times(\mathbb R^n\setminus\{0\})\bigr)\setminus R(u)$ は相対閉です。

$t>0$ のとき、$\xi\in\Gamma$ と $t\xi\in\Gamma$ は[開錐の定義](../MICA2/index.md#def-mica2-open-cone)により同値です。同じcutoff、同じ錐、同じ評価定数が $(x,\xi)$ と $(x,t\xi)$ の両方の規則性を判定します。これを否定した集合が $WF(u)$ なので錐性も従います。$\square$
<!-- proof-end -->

「相対閉」は零方向を除くことと両立します。例えば $WF(\delta_0)$ の点 $(0,t\xi_0)$ は $t\downarrow0$ で $(0,0)$ に近づきますが、零方向は定義域外です。

### 位置だけに戻す：特異支持

方向を忘れたときに残る「滑らかでない点」を、ここで正式に固定します。[局所滑らかさの意味](../MICA1/index.md#thm-mica1-local-smooth)は、分布が近傍の滑らかな関数と試験関数への作用として一致することでした。

<a id="def-mica3-singular-support"></a>

<!-- formal-statement-start -->
> **定義（特異支持）**
>
> $u\in\mathcal D'(\mathbb R^n)$ の**特異支持** $\operatorname{sing\,supp}u$ とは、$u$ が $C^\infty$ 関数に等しい開近傍を持たない点全体とする。

$$
\operatorname{sing\,supp}u
=\{x\in\mathbb R^n:
\text{どの開近傍でも }u\text{ は }C^\infty\text{ 関数と一致しない}\}.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-mica3-singular-support -->
### 直接例：通常の台とは違う

**定義の確認**。各点に滑らかな近傍が存在するかを確かめます。

$u=1+\delta_0$ とします。$x_0\ne0$ では $\delta_0$ は消えるので $u=1$ は滑らかです。$x_0=0$ で $u$ が滑らかなら、滑らかな $1$ を引いた $\delta_0$ も滑らかですが、これは[局所Fourier判定と滑らかさの同値](../MICA1/index.md#thm-mica1-local-smooth)および前節での $\delta_0$ の計算に反します。従って

$$
\operatorname{sing\,supp}(1+\delta_0)=\{0\},
\qquad
\operatorname{supp}(1+\delta_0)=\mathbb R^n.
$$

台は「消えない点」、特異支持は「滑らかに表せない点」です。
<!-- definition-example-end -->

<a id="thm-mica3-projection"></a>

<!-- formal-statement-start -->
> **定理（波面集合の射影と特異支持）**
>
> $u\in\mathcal D'(\mathbb R^n)$ とし、$\pi(x,\xi)=x$ を位置への射影とする。このとき

$$
\pi(WF(u))=\operatorname{sing\,supp}u.
$$

> 特に $WF(u)=\varnothing$ と $u\in C^\infty(\mathbb R^n)$（分布として滑らかな関数で表せること）は同値である。
<!-- formal-statement-end -->

### 証明の見取り図

ある点のすべての非零方向が規則的であることと、その点の近傍で滑らかであることは、まさに[MICA2の全方向判定](../MICA2/index.md#thm-mica2-all-directions)でした。方向が一つでも残る点が特異支持です。

<!-- proof-start -->
### 証明

$x_0\notin\pi(WF(u))$ は、すべての $\xi_0\ne0$ に対して $(x_0,\xi_0)\notin WF(u)$ と同値です。[波面集合の定義](#def-mica3-wavefront)により、これはすべての非零方向で方向別Fourier規則性が成立することです。[MICA2の全方向判定](../MICA2/index.md#thm-mica2-all-directions)を $x_0$ に適用すると、$u$ が $x_0$ のある開近傍で滑らかなことと同値です。従って

$$
x_0\notin\pi(WF(u))
\quad\Longleftrightarrow\quad
x_0\notin\operatorname{sing\,supp}u.
$$

補集合を取って射影公式を得ます。$WF(u)=\varnothing$ なら射影も空なので全ての点で局所的に滑らかです。各局所表示は重なり上で分布として一致し、二つの滑らかな関数の差が零分布なら連続性から差は各点で零です。従って局所表示は貼り合わさり、一つの大域 $C^\infty$ 関数が $u$ を表します。逆方向は前節の滑らかな例から従います。$\square$
<!-- proof-end -->

この定理は $\pi(WF(u))$ の各点に**少なくとも一つ**非零方向があるという主張です。特異点の上に全方向が載るとは限りません。直線デルタでは直線を横切る方向だけが残ることを、次講と演習で計算します。

## 3. 局所性と足し算

波面集合の定義で使うcutoffは、注目する点の近くでしか元の分布を見ません。したがって同じ近傍で一致する分布は、その点上では同じ波面集合を持ちます。足し算では、個別に選んだcutoffを**共通の小さなcutoff**に取り替える作業が必要です。

<a id="lem-mica3-locality"></a>

<!-- formal-statement-start -->
> **補題（波面集合の局所性）**
>
> $u,v\in\mathcal D'(\mathbb R^n)$ が開集合 $U$ 上で一致するとする。すると

$$
WF(u)\cap\bigl(U\times(\mathbb R^n\setminus\{0\})\bigr)
=WF(v)\cap\bigl(U\times(\mathbb R^n\setminus\{0\})\bigr).
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

任意の $x_0\in U$ と $\xi_0\ne0$ を固定します。$u$ が $(x_0,\xi_0)$ で規則的なら、そのcutoff $\chi_u=1$ が成り立つ開近傍 $V$ と、急減少を満たす開錐 $\Gamma\ni\xi_0$ が存在します。

$U\cap V$ に台を持つ新しいcutoff $\psi=1$ near $x_0$ を選びます。$\xi_0$ を含み、球面上の閉包が $\Gamma$ の内側に入る小錐 $\Gamma'$ を取ります。[cutoffの縮小に対する錐急減少の保存](../MICA2/index.md#thm-mica2-cutoff-stability)により、$\widehat{\psi u}$ は $\Gamma'$ 上で急減少します。

$\operatorname{supp}\psi\subset U$ より $\psi u=\psi v$ なので $v$ も規則的です。$u,v$ を交換すれば逆も成り立ちます。$\square$
<!-- proof-end -->

<a id="prop-mica3-sum"></a>

<!-- formal-statement-start -->
> **命題（和の波面集合の包含）**
>
> $u,v\in\mathcal D'(\mathbb R^n)$ に対して

$$
WF(u+v)\subset WF(u)\cup WF(v).
$$
<!-- formal-statement-end -->

### 証明の見取り図

右辺の外にある位置・方向は、$u,v$ の両方で規則的です。二つのcutoffと錐を共有できるように縮めてから、Fourier変換を足します。

<!-- proof-start -->
### 証明

$(x_0,\xi_0)\notin WF(u)\cup WF(v)$ を固定します。それぞれにcutoff $\chi_u,\chi_v$ と開錐 $\Gamma_u,\Gamma_v$ が存在します。$\Gamma_u\cap\Gamma_v$ は $\xi_0$ を含む開錐なので、球面上の閉包がこの交叉に収まる小錐 $\Gamma'$ を取れます。

次に、$\chi_u=\chi_v=1$ となる $x_0$ の共通開近傍 $U$ に台を持ち、$x_0$ 近くで $1$ となる $\psi$ を選びます。

[cutoffの縮小に対する錐急減少の保存](../MICA2/index.md#thm-mica2-cutoff-stability)をそれぞれに適用すると、$\widehat{\psi u}$ と $\widehat{\psi v}$ は $\Gamma'$ 上で任意次数の急減少を持ちます。Fourier変換の線形性と三角不等式で

$$
|\widehat{\psi(u+v)}(\xi)|
\le(C_{N,u}+C_{N,v})(1+|\xi|)^{-N},
\qquad \xi\in\Gamma'.
$$

よって $(x_0,\xi_0)\notin WF(u+v)$。対偶を取って包含を得ます。$\square$
<!-- proof-end -->

包含は等号とは限りません。例えば $v=-u$ とすれば $WF(u+v)=\varnothing$ ですが、$u=\delta_0$ なら右辺は空でありません。特異性が和によって**相殺する**ことがあります。

## 4. 滑らかな係数を掛ける

分布 $u$ に滑らかな関数 $a$ を掛ける操作は $\langle au,\varphi\rangle=\langle u,a\varphi\rangle$ で定義できます。係数が滑らかなので新たな高周波の特異方向を作らないと期待されます。ただし、$a$ が零になる点では元の特異性を消すことがあります。

<a id="thm-mica3-smooth-multiplier"></a>

<!-- formal-statement-start -->
> **定理（滑らかな係数との積）**
>
> $u\in\mathcal D'(\mathbb R^n)$、$a\in C^\infty(\mathbb R^n)$ に対し

$$
WF(au)\subset WF(u).
$$

> さらに $a(x_0)\ne0$ であれば、すべての $\xi\ne0$ に対して

$$
(x_0,\xi)\in WF(au)
\quad\Longleftrightarrow\quad
(x_0,\xi)\in WF(u)
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$u$ に使ったcutoffが $1$ である領域の内側で $au$ を切り出し、[cutoffの縮小に対する錐急減少の保存](../MICA2/index.md#thm-mica2-cutoff-stability)を使います。$a(x_0)\ne0$ ならその近くで $1/a$ を掛けて戻せるので、逆向きの包含も成り立ちます。

<!-- proof-start -->
### 証明

$(x_0,\xi_0)\notin WF(u)$ とします。[定義](#def-mica3-wavefront)から、$\chi=1$ on $U$ と開錐 $\Gamma\ni\xi_0$ を取り、$\widehat{\chi u}$ が $\Gamma$ 上で急減少するとします。

$\operatorname{supp}\psi\subset U$、$\psi=1$ near $x_0$ の $\psi\in C_c^\infty$ を選び、$\xi_0$ を含み球面上の閉包が $\Gamma$ の内側にある開錐 $\Gamma'$ を取ります。

$a\psi\in C_c^\infty$ で $\operatorname{supp}(a\psi)\subset U$、さらに

$$
\psi(au)=(a\psi)u=(a\psi)(\chi u)
$$

です。[cutoffの縮小に対する錐急減少の保存](../MICA2/index.md#thm-mica2-cutoff-stability)を、元のcutoff $\chi$、新しい関数 $a\psi$、錐 $\Gamma'$ に適用すると $\widehat{\psi(au)}$ が $\Gamma'$ 上で急減少します。$\psi=1$ near $x_0$ なので $(x_0,\xi_0)\notin WF(au)$、第一の包含が得られました。

次に $a(x_0)\ne0$ とします。連続性から $a$ は $x_0$ のある開近傍 $V$ で零になりません。$\rho\in C_c^\infty(V)$ を $x_0$ 近傍で $1$ とし、$b=\rho/a$ を $V$ 外で零として延長すると $b\in C^\infty(\mathbb R^n)$ です。

$ab=1$ near $x_0$ だから、その近くで $u=b(au)$ と一致します。[局所性補題](#lem-mica3-locality)と、今証明した包含を $b$ に適用して

$$
WF(u)|_{x_0}=WF(b(au))|_{x_0}
\subset WF(au)|_{x_0}
\subset WF(u)|_{x_0}
$$

を得ます。ここで $WF(w)|_{x_0}:=\{\xi\ne0:(x_0,\xi)\in WF(w)\}$ です。$\square$
<!-- proof-end -->

### 具体例：係数の零点で特異性が消える

一次元で $a(x)=x$、$u=\delta_0$ とします。任意の試験関数 $\varphi$ に対して

$$
\langle x\delta_0,\varphi\rangle
=\langle\delta_0,x\varphi\rangle=0,
\quad\text{従って }x\delta_0=0.
$$

したがって $WF(x\delta_0)=\varnothing$ ですが、[直接例](#def-mica3-wavefront)により $WF(\delta_0)=\{(0,\xi):\xi\ne0\}$ です。$a(0)=0$ なので定理の逆向きの等号は使えません。

## 5. 微分によって新しい方向は生まれるか

[超関数の微分](../../GPDE/GPDE2/index.md#def-gpde2-distributional-derivative)は滑らかでない分布にも定義されます。コンパクト支持分布の[Fourier微分公式](../MICA1/index.md#prop-mica1-fourier-derivative)は $\partial_{x_j}$ が周波数側で $i\xi_j$ の乗算になることを述べました。多項式を掛けると急減少は任意次数のままですが、cutoffを先に掛けると積の微分から**余分な項**が出ることに注意が必要です。

<a id="thm-mica3-derivative"></a>

<!-- formal-statement-start -->
> **定理（微分による波面集合の非増大）**
>
> $u\in\mathcal D'(\mathbb R^n)$、$j\in\{1,\ldots,n\}$ とすると

$$
WF(\partial_{x_j}u)\subset WF(u).
$$

> 特に多重指数 $\alpha$ に対し $WF(\partial_x^\alpha u)\subset WF(u)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

もとの分布が一つの錐で規則的なら、より小さいcutoff $\psi$ と錐 $\Gamma'$ に対して $\psi u$ だけでなく $(\partial_j\psi)u$ も急減少します。超関数の積の微分公式

$$
\psi\,\partial_j u
=\partial_j(\psi u)-(\partial_j\psi)u
$$

の二項を別々に評価します。

<!-- proof-start -->
### 証明

$(x_0,\xi_0)\notin WF(u)$ を固定し、$\chi=1$ が成り立つ開近傍 $U$ と、$\widehat{\chi u}$ が急減少する開錐 $\Gamma\ni\xi_0$ を取ります。$\psi\in C_c^\infty$ を $\psi=1$ near $x_0$ かつ $\operatorname{supp}\psi\subset U$ とし、球面上の閉包が $\Gamma$ に収まる開錐 $\Gamma'\ni\xi_0$ を選びます。

$\psi$ と $\partial_j\psi$ はいずれも $C_c^\infty$ で台が $U$ に含まれます。[cutoffの縮小に対する錐急減少の保存](../MICA2/index.md#thm-mica2-cutoff-stability)をそれぞれに適用すると、任意の $N\ge0$ に対し

$$
|\widehat{\psi u}(\xi)|\le A_N(1+|\xi|)^{-N},
\qquad
|\widehat{(\partial_j\psi)u}(\xi)|\le B_N(1+|\xi|)^{-N}
\quad(\xi\in\Gamma').
$$

[分布微分の定義](../../GPDE/GPDE2/index.md#def-gpde2-distributional-derivative)から、試験関数への作用を展開して $\partial_j(\psi u)=(\partial_j\psi)u+\psi\,\partial_j u$ が得られます。両辺をFourier変換し、$\psi u$ はコンパクト支持なので[超関数微分のFourier表示](../MICA1/index.md#prop-mica1-fourier-derivative)を適用すると

$$
\widehat{\psi\,\partial_j u}(\xi)
=i\xi_j\,\widehat{\psi u}(\xi)
-\widehat{(\partial_j\psi)u}(\xi).
$$

したがって $|\xi_j|\le1+|\xi|$ を使い、**第一項には次数 $N+1$ の評価を入力**して

$$
|\widehat{\psi\,\partial_j u}(\xi)|
\le(A_{N+1}+B_N)(1+|\xi|)^{-N}
\quad(\xi\in\Gamma')
$$

を得ます。$\psi=1$ near $x_0$ なので $(x_0,\xi_0)\notin WF(\partial_j u)$。これが第一の包含です。多重指数の主張は一階の包含を $|\alpha|$ 回繰り返せば従います。$\square$
<!-- proof-end -->

<a id="cor-mica3-differential-operator"></a>

<!-- formal-statement-start -->
> **系（滑らかな係数の微分作用素）**
>
> 有限次数の微分作用素

$$
P=\sum_{|\alpha|\le m}a_\alpha(x)\partial_x^\alpha,
\qquad a_\alpha\in C^\infty(\mathbb R^n)
$$

> と $u\in\mathcal D'(\mathbb R^n)$ に対して $WF(Pu)\subset WF(u)$ が成り立つ。
<!-- formal-statement-end -->

[微分の定理](#thm-mica3-derivative)から各 $\partial^\alpha u$ の波面集合は $WF(u)$ に含まれ、[滑らかな係数の定理](#thm-mica3-smooth-multiplier)で $a_\alpha$ を掛けても増えません。有限和を取ると[和の命題](#prop-mica3-sum)から結論が従います。

**逆は一般に成り立ちません。** $\mathbb R^2$ の $u=\delta(x_1)$ は $x_2$ に依存しない分布なので $\partial_{x_2}u=0$ ですが、$x_1=0$ の点には特異方向があります。微分作用素がどの方向の特異性を検出できるかという逆向きの問いは、後続の楕円性・特性集合へつながります。

## 6. 演習

### 演習 MICA3-A1：平行移動した点デルタ

- Level: A
- 目安時間: 12分

$a=(2,-1)\in\mathbb R^2$、$u=\delta_a$ とする。$(0,0)$ の上の全非零方向が $WF(u)$ に入らない理由を示し、$a$ の上の方向 $(1,3)$ と $(-1,-3)$ がともに $WF(u)$ に入ることを、cutoffと開錐の量化順序を含めて証明せよ。

<!-- solution-start -->
#### 詳細解答

原点の近傍で $1$ となり、$a$ を含まない小球に台を持つcutoff $\chi$ を選びます。$\chi(a)=0$ なので $\widehat{\chi\delta_a}=0$ です。任意の非零方向の開錐で $C_N=0$ を選べ、$((0,0),\xi)\notin WF(u)$ が分かります。

$a$ の近傍で $1$ となる**任意の**cutoffは $\chi(a)=1$ なので、$\widehat{\chi\delta_a}(\eta)=e^{-ia\cdot\eta}$ で絶対値は $1$ です。

どの開錐 $\Gamma$ が $(1,3)$ を含んでも $t(1,3)\in\Gamma$ で、$N=1$ の評価は

$$
1\le C_1(1+t\sqrt{10})^{-1}
$$

となりますが、$t\to\infty$ で破れます。$(-1,-3)$ でも $\eta=t(-1,-3)$ とするだけで同じ矛盾です。正の拡大のみを使い、二つの向きを同一視していません。[波面集合の定義](#def-mica3-wavefront)により両方とも属します。
<!-- solution-end -->

### 演習 MICA3-A2：正の錐性と零方向

- Level: A
- 目安時間: 10分

ある $u\in\mathcal D'(\mathbb R)$ について $(0,2)\in WF(u)$ とする。$(0,1/5)$ と $(0,-2)$ の所属をそれぞれ判定できるか。また $(0,0)$ を $WF(u)$ の元と呼べるか。理由を述べよ。

<!-- solution-start -->
#### 詳細解答

[正の錐性](#prop-mica3-closed-conic)において $t=1/10>0$ を使うと $(0,1/5)\in WF(u)$ です。一方、$-2=(-1)\cdot2$ は負の倍率なので定理からは所属を判断できません。例えば片方向だけに特異性を持つ分布では正負は異なり得ます。$WF(u)$ は $\xi\ne0$ に限定して定義された集合なので、$(0,0)$ はそもそも所属判定の対象ではなく、元ではありません。相対閉性も零方向の追加を意味しません。
<!-- solution-end -->

### 演習 MICA3-A3：係数の零点と非零点

- Level: A
- 目安時間: 12分

$u=\delta_0\in\mathcal D'(\mathbb R)$、$a(x)=x^2$、$b(x)=2+x^2$ とする。$au$、$bu$ を分布として計算し、それぞれの波面集合を求めよ。

<!-- solution-start -->
#### 詳細解答

任意の $\varphi\in C_c^\infty$ に対し $\langle au,\varphi\rangle=a(0)\varphi(0)=0$ なので $au=0$ です。同様に $\langle bu,\varphi\rangle=b(0)\varphi(0)=2\varphi(0)$ だから $bu=2\delta_0$ です。零分布は滑らかで $WF(au)=\varnothing$。$b(0)=2\ne0$ なので[係数が非零の点での等号](#thm-mica3-smooth-multiplier)を適用でき、[デルタの波面集合](#def-mica3-wavefront)から

$$
WF(bu)=WF(\delta_0)=\{(0,\xi):\xi\ne0\}.
$$

係数が零になる点では非増大という包含しか保証されないことを確認できます。
<!-- solution-end -->

### 演習 MICA3-A4：台・特異支持・波面集合

- Level: A
- 目安時間: 12分

一次元の滑らかな定数分布 $u=1$ と、$v=1+\delta_3$ について、通常の台、特異支持、波面集合をそれぞれ求めよ。滑らかな定数を足しても波面集合が変わらない理由も述べよ。

<!-- solution-start -->
#### 詳細解答

$u=1$ は全点の近くで非零なので $\operatorname{supp}u=\mathbb R$ ですが、滑らかなので $\operatorname{sing\,supp}u=\varnothing$、$WF(u)=\varnothing$ です。$v$ も $3$ から離れた各点の近くでは $1$ なので、$\operatorname{supp}v=\mathbb R$、$\operatorname{sing\,supp}v=\{3\}$ です。

[和の包含](#prop-mica3-sum)と $WF(1)=\varnothing$ から $WF(v)\subset WF(\delta_3)$ です。他方、$\delta_3=v-1$ に同じ包含を使うと $WF(\delta_3)\subset WF(v)\cup WF(-1)=WF(v)$ となります。従って

$$
WF(v)=WF(\delta_3)=\{(3,\xi):\xi\ne0\}.
$$

滑らかな項は単独で特異方向を持たず、加除しても結果は不変です。
<!-- solution-end -->

### 演習 MICA3-B1：局所性と切り出し

- Level: B
- 目安時間: 20分

$u,v\in\mathcal D'(\mathbb R^n)$ が開集合 $U$ 上で一致し、$x_0\in U$ とする。$u$ が $(x_0,\xi_0)$ で方向別規則性を持つと仮定する。$u$ の規則性を示すcutoffが $U$ の外にはみ出す可能性を考慮して、$v$ も同じ位置・方向で規則的と証明せよ。

<!-- solution-start -->
#### 詳細解答

$u$ の規則性から $\chi_u=1$ near $x_0$ と開錐 $\Gamma\ni\xi_0$ が存在し、$\widehat{\chi_u u}$ は $\Gamma$ 上で急減少します。

$\chi_u=1$ が成り立つ開近傍 $V$ を取り、$U\cap V$ の中に台を持ち $x_0$ 近傍で $1$ となる $\psi\in C_c^\infty$ を選びます。$\xi_0$ の開錐 $\Gamma'$ を、球面上の閉包が $\Gamma$ 内に入るよう狭めます。

[cutoffの縮小に対する錐急減少の保存](../MICA2/index.md#thm-mica2-cutoff-stability)は $\operatorname{supp}\psi\subset V$ により適用でき、$\widehat{\psi u}$ は $\Gamma'$ 上で急減少します。また $\operatorname{supp}\psi\subset U$ で $u=v$ だから $\psi u=\psi v$ です。

$\psi=1$ near $x_0$ より、同じ $\psi,\Gamma'$ は $v$ の規則性の定義を満たします。$U$ に最初のcutoff全体が入ると仮定していない点が核心です。
<!-- solution-end -->

### 演習 MICA3-B2：非零係数による局所逆向き

- Level: B
- 目安時間: 20分

$a\in C^\infty(\mathbb R^n)$、$a(x_0)\ne0$、$u\in\mathcal D'(\mathbb R^n)$ とする。$a$ の大域的な逆関数を仮定せずに、$x_0$ の上で $WF(au)$ と $WF(u)$ が等しいことを説明せよ。局所的な逆係数の作り方と適用する二つの基本性質を明示せよ。

<!-- solution-start -->
#### 詳細解答

$a(x_0)\ne0$ と連続性から、$x_0$ の開近傍 $V$ 上で $a$ は零になりません。$\rho\in C_c^\infty(V)$ を $x_0$ 近傍で $1$ として

$$
b(x)=
\begin{cases}
\rho(x)/a(x),&x\in V,\\
0,&x\notin V
\end{cases}
$$

と定めます。$\rho$ の台が $V$ の内部にあるため、境界近くで零となり、$b$ は大域的に滑らかです。$ab=\rho=1$ near $x_0$ なので $u=b(au)$ はその近傍で一致します。[局所性補題](#lem-mica3-locality)により二つの分布は $x_0$ 上で同じ波面方向を持ち、[滑らかな係数の非増大](#thm-mica3-smooth-multiplier)を二度使って

$$
WF(u)|_{x_0}=WF(bau)|_{x_0}
\subset WF(au)|_{x_0}\subset WF(u)|_{x_0}.
$$

よって等号です。$a$ が遠方で零になっても関係しません。
<!-- solution-end -->

### 演習 MICA3-B3：一次微分作用素の波面集合

- Level: B
- 目安時間: 22分

$u\in\mathcal D'(\mathbb R^2)$、$P=(1+x_1^2)\partial_{x_1}+x_2\partial_{x_2}+3$ とする。$WF(Pu)\subset WF(u)$ を導き、$u=\delta(x_1)$ としたとき $\partial_{x_2}u=0$ が成り立つことを試験関数の定義から示せ。

<!-- solution-start -->
#### 詳細解答

[微分非増大定理](#thm-mica3-derivative)で $WF(\partial_{x_j}u)\subset WF(u)$、[滑らかな係数との積](#thm-mica3-smooth-multiplier)で

$$
WF((1+x_1^2)\partial_{x_1}u)\subset WF(u),\qquad
WF(x_2\partial_{x_2}u)\subset WF(u)
$$

が成り立ちます。また $WF(3u)\subset WF(u)$ です。この三項の[有限和の包含](#prop-mica3-sum)を二度適用して $WF(Pu)\subset WF(u)$ を得ます。

$u=\delta(x_1)$ の定義を $\langle u,\varphi\rangle=\int_{\mathbb R}\varphi(0,x_2)\,dx_2$ とすると、任意の $\varphi\in C_c^\infty(\mathbb R^2)$ に対して

$$
\langle\partial_{x_2}u,\varphi\rangle
=-\int_{\mathbb R}\partial_{x_2}\varphi(0,x_2)\,dx_2
=-[\varphi(0,x_2)]_{-\infty}^{\infty}=0.
$$

最後は $\varphi$ のコンパクト支持から従います。従って $\partial_{x_2}u=0$ であり、微分の非増大は等号を保証しません。
<!-- solution-end -->

### 演習 MICA3-B4：和による特異方向の相殺

- Level: B
- 目安時間: 18分

$u=\delta_0$、$v=-\delta_0+f$ を $\mathbb R$ 上の分布とし、$f\in C^\infty(\mathbb R)$ とする。$WF(u)$、$WF(v)$、$WF(u+v)$ を求め、和の包含が厳しくなり得ることを確かめよ。

<!-- solution-start -->
#### 詳細解答

[Dirac分布の直接計算](#def-mica3-wavefront)から $WF(u)=\{(0,\xi):\xi\ne0\}$ です。[和の包含](#prop-mica3-sum)と $WF(f)=\varnothing$ により $WF(v)\subset WF(-\delta_0)$ です。

逆に $-\delta_0=v-f$ に同じ包含を使うと $WF(-\delta_0)\subset WF(v)$ です。$-\delta_0$ は $\delta_0$ のFourier変換を $-1$ 倍するだけなので $WF(-\delta_0)=WF(\delta_0)$、従って $WF(v)=WF(u)$ です。

しかし $u+v=f$ は滑らかなので $WF(u+v)=\varnothing$。右辺 $WF(u)\cup WF(v)$ は空でなく、[和の包含](#prop-mica3-sum)は真の包含です。個別の特異性が一致しても、和では位相・係数による相殺が起こります。
<!-- solution-end -->

### 演習 MICA3-C1：直線デルタと二種類の微分

- Level: C
- 目安時間: 40分

$\mathbb R^2$ 上の $u=\delta(x_1)$ を

$$
\langle u,\varphi\rangle=\int_{\mathbb R}\varphi(0,x_2)\,dx_2
$$

で定める。次を示せ。

1. $WF(u)=\{((0,s),(\xi_1,0)):s\in\mathbb R,\ \xi_1\ne0\}$。
2. $\partial_{x_2}u=0$ だが、$WF(\partial_{x_1}u)=WF(u)$。
3. $x_1u=0$、$x_1\partial_{x_1}u=-u$。この結果が滑らかな係数の定理と矛盾しないことを説明せよ。

<!-- solution-start -->
#### 詳細解答

**（1）位置と方向。** $x_1\ne0$ の点では直線 $x_1=0$ を避けたcutoffを取れるため、波面方向はありません。$x=(0,s)$ では、任意のcutoff $\chi=1$ near $(0,s)$ に対し $g(x_2)=\chi(0,x_2)\in C_c^\infty(\mathbb R)$ は $s$ 近傍で $1$ です。超関数の作用から

$$
\widehat{\chi u}(\xi_1,\xi_2)
=\int g(x_2)e^{-ix_2\xi_2}\,dx_2
=\widehat g(\xi_2).
$$

$\xi_2^0\ne0$ の方向を固定します。その方向を囲む十分小さい開錐では $|\xi_2|\ge c|\xi|$（$c>0$）です。[滑らかな関数のFourier急減少](../MICA1/index.md#thm-mica1-smooth-rapid)から任意の $N$ について

$$
|\widehat g(\xi_2)|
\le B_N(1+|\xi_2|)^{-N}
\le B_N\max(1,c^{-N})(1+|\xi|)^{-N}.
$$

よって非水平方向は規則的です。一方、$g$ は零関数でないため[Fourier反転定理](../../FOU/FOU3/index.md#thm-fou3-inversion)から $\widehat g(\beta)\ne0$ となる $\beta\in\mathbb R$ が存在します。

任意の水平右向きの開錐には、十分大きい $r>0$ に対し $(r,\beta)$ が入ります。同様に水平左向きの開錐には $(-r,\beta)$ が入ります。

それらの列上でFourier変換は $\widehat g(\beta)$ のままで、$N=1$ の急減少に反します。$\chi$ は任意なので両水平方向が残り、示す等式が成立します。

**（2）微分。** $\partial_{x_2}u=0$ は試験関数 $\varphi$ に対する

$$
\langle\partial_{x_2}u,\varphi\rangle
=-\int_{\mathbb R}\partial_{x_2}\varphi(0,x_2)\,dx_2=0
$$

から従います。$\partial_{x_1}u$ について、任意の $\chi=1$ near $(0,s)$ と $g(x_2)=\chi(0,x_2)$、$h(x_2)=\partial_{x_1}\chi(0,x_2)$ に対し、超関数微分の定義を直接使うと

$$
\begin{aligned}
\widehat{\chi\,\partial_{x_1}u}(\xi_1,\xi_2)
&=-\int\partial_{x_1}
  \bigl(\chi(x_1,x_2)e^{-i(x_1\xi_1+x_2\xi_2)}\bigr)_{x_1=0}\,dx_2\\
&=i\xi_1\widehat g(\xi_2)-\widehat h(\xi_2).
\end{aligned}
$$

$\widehat g(\beta)\ne0$ となる固定した $\beta$ を取り、水平右または左向きの列 $(\pm r,\beta)$ で $r\to\infty$ とすると、三角不等式から

$$
|\,i(\pm r)\widehat g(\beta)-\widehat h(\beta)\,|
\ge r|\widehat g(\beta)|-|\widehat h(\beta)|\longrightarrow\infty.
$$

よって水平両方向は波面集合に入ります。他方、[微分の非増大](#thm-mica3-derivative)により $WF(\partial_{x_1}u)\subset WF(u)$ で、（1）でそれ以外の方向はないと分かっています。従って等号です。

**（3）係数。** $\langle x_1u,\varphi\rangle=\int 0\cdot\varphi(0,x_2)\,dx_2=0$ です。積の微分公式で

$$
\partial_{x_1}(x_1u)
=u+x_1\partial_{x_1}u=0
$$

なので $x_1\partial_{x_1}u=-u$ です。$x_1=0$ 上では係数 $x_1$ が零のため、[滑らかな係数の定理](#thm-mica3-smooth-multiplier)は包含しか主張しません。第一の積では方向が消え、第二では残るという違いがあっても矛盾しません。
<!-- solution-end -->

## 7. 何を得たか

位置と方向を同時に記録する $WF(u)$ は、正の錐性を持つ相対閉集合です。位置への射影は特異支持であり、$WF(u)=\varnothing$ は $u$ が滑らかであることと同値です。さらに、局所一致・和・滑らかな乗算・微分は、いずれも波面方向を新しく増やさない操作だと証明しました。ただし、**非増大は等号ではありません**。

次の MICA4 では、点デルタだけでなく Heaviside 関数や超曲面に集中する分布を定義から計算し、波面集合が「特異な場所」だけでなく「残る方向」を本当に識別することを確かめます。
