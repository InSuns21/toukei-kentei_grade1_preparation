# ANF8 Dedekindゼータと解析類数公式

[ANF6 のイデアル類群](../ANF6/index.md#def-anf6-ideal-class-group)は、整数環のイデアルがいくつの類に分かれるかを測りました。[ANF7 の単数定理](../ANF7/index.md#thm-anf7-dirichlet-unit)は、同じ主イデアルの生成元を取り替える自由度を有限個の基本単数で記述します。

これらは別々の結果に見えます。しかし「ノルムが $X$ 以下の整イデアルは何個あるか」を数えると、類の個数と単数の対数格子の体積が同時に現れます。その個数の漸近係数こそが Dedekind ゼータ関数の $s=1$ における留数です。

本講では、有限なイデアル類群と単数格子から格子点を数え、解析類数公式を証明します。特に**複素埋め込みの係数、単数の有限位数部分、レギュレータの規格化**を最後まで追います。

## 1. 整イデアルの数え上げを関数にする

以下、$K/\mathbb Q$ を次数 $n\geq1$ の数体、$A=\mathcal O_K$ を整数環とします。実埋め込み数を $r_1$、複素共役組数を $r_2$ とすると $n=r_1+2r_2$ です。判別式を $D_K$、イデアル類群の位数を $h_K$、1の冪根群の位数を $w_K=|\mu(K)|$ とします。[レギュレータ](../ANF7/index.md#def-anf7-regulator)を $R_K$ とし、単数の自由階数0のときも $R_K=1$ とします。

非零整イデアル $\mathfrak a$ の絶対ノルムは [ANF4 の定義](../ANF4/index.md#def-anf4-ideal-norm)により $N\mathfrak a=|A/\mathfrak a|$ で、正の整数です。元ではなく**非零整イデアル全部**を数える級数を考えます。

<a id="def-anf8-dedekind-zeta"></a>

<!-- formal-statement-start -->
> **定義（Dedekindゼータ関数）**  
> $K$ の Dedekind ゼータ関数を、複素数 $s$ の実部 $\Re(s)>1$ に対して

$$
\zeta_K(s)=\sum_{\substack{\mathfrak a\subseteq A\\
\mathfrak a\ne(0)}}\frac1{(N\mathfrak a)^s}
$$

> と定める。ここで和は非零**整**イデアルにわたる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-anf8-dedekind-zeta -->
**定義の確認**　$K=\mathbb Q$ のとき $A=\mathbb Z$ で、非零整イデアルは正整数 $m$ により一意に $m\mathbb Z$ と書けます。そのノルムは $m$ なので

$$
\zeta_{\mathbb Q}(s)=\sum_{m=1}^{\infty}m^{-s}=\zeta(s).
$$

> 同じイデアルを生成する $m$ と $-m$ を二度数えないことが重要です。
<!-- definition-example-end -->

各類ごとに数えたくなります。そのため [イデアル類群の定義](../ANF6/index.md#def-anf6-ideal-class-group)に従い、$C\in\mathrm{Cl}(K)$ を一つ固定します。

<a id="def-anf8-partial-zeta"></a>

<!-- formal-statement-start -->
> **定義（部分ゼータ関数と類別計数）**  
> イデアル類 $C$ に属する非零整イデアルについて、$\Re(s)>1$ で

$$
\zeta_C(s)=\sum_{[\mathfrak b]=C}(N\mathfrak b)^{-s},
\qquad
A_C(X)=\#\{\mathfrak b\subseteq A:
\mathfrak b\ne(0),\ [\mathfrak b]=C,\ N\mathfrak b\leq X\}
$$

> と置く（$X\geq1$）。全体の計数関数を $A_K(X)=\sum_C A_C(X)$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-anf8-partial-zeta -->
**定義の確認**　$\mathbb Q$ の類群は自明なので唯一の類 $C$ に対して $A_C(X)=\lfloor X\rfloor$ です。また [ANF6 の計算](../ANF6/index.md#thm-anf6-q-sqrt-minus-five-class-group)で $\mathbb Q(\sqrt{-5})$ の類群は2元と分かっています。この体のゼータ級数は2つの部分ゼータ級数の和になります。
<!-- definition-example-end -->

## 2. 素イデアルの Euler 積

整数の素因数分解に相当するのが、[Dedekind環でのイデアル分解](../ANF3/index.md#thm-anf3-ideal-factorization)です。これによって、ゼータ関数の級数を各素イデアルでの幾何級数に分離できます。

<a id="prop-anf8-euler-product"></a>

<!-- formal-statement-start -->
> **命題（Euler積と絶対収束）**  
> 任意の数体 $K/\mathbb Q$ と $\Re(s)>1$ に対し、Dedekindゼータ関数は絶対収束し、

$$
\zeta_K(s)=\prod_{\mathfrak p\ne(0)}
\left(1-(N\mathfrak p)^{-s}\right)^{-1}
$$

> が成り立つ。積は $A$ の非零素イデアルにわたる。
<!-- formal-statement-end -->

### 証明の見取り図

各有理素数 $p$ の上の素イデアルは高々 $n$ 個です。しかもそのノルムは $p^{f}$（$f\geq1$）なので、絶対値を取った Euler 積は普通の $\zeta(\Re(s))^n$ で上から抑えられます。収束を先に確保してから一意分解で展開します。

<!-- proof-start -->
### 証明

$\sigma=\Re(s)>1$ とします。[ANF4 の次数公式](../ANF4/index.md#thm-anf4-fundamental-identity)によると、$pA=\prod_{j=1}^{g_p}\mathfrak p_j^{e_j}$ で $g_p\leq n$、$N\mathfrak p_j=p^{f_j}$、各 $f_j\geq1$ です。したがって

$$
\prod_{\mathfrak p\mid p}
(1-(N\mathfrak p)^{-\sigma})^{-1}
=\prod_{j=1}^{g_p}(1-p^{-f_j\sigma})^{-1}
\leq(1-p^{-\sigma})^{-n}.
$$

> 右辺をすべての $p$ で掛けると $\zeta(\sigma)^n<\infty$ です。実際、$\sum_{m\geq1}m^{-\sigma}$ は積分比較で収束し、その有限な Euler 部分積はこの級数以下です。従って左辺の非負項展開も有限な和へ収束します。

有限個の素イデアルについて各因子を幾何級数展開すると、積はそれらを素因子とする整イデアルの $(N\mathfrak a)^{-s}$ の総和になります。[素イデアル分解の存在と一意性](../ANF3/index.md#thm-anf3-ideal-factorization)により重複・欠落はありません。絶対収束により素イデアル全体へ極限を移し、式を得ます。
<!-- proof-end -->

各 $p$ における局所因子は、分解型が異なると変わります。たとえば $K=\mathbb Q(i)$ では、[二次体の素数分解](../ANF4/index.md#thm-anf4-quadratic-splitting)から $p=2$ は分岐し、奇素数 $p\equiv1\pmod4$ は分裂、$p\equiv3\pmod4$ は惰性です。したがって対応する局所因子はそれぞれ

$$
(1-2^{-s})^{-1},\qquad
(1-p^{-s})^{-2},\qquad
(1-p^{-2s})^{-1}.
$$

> 惰性の場合に $p^{-s}$ でなく $p^{-2s}$ が現れるのは、素イデアルの絶対ノルムが $p^2$ だからです。

## 3. 単数で割って、類ごとのイデアルを元へ戻す

単数 $u\in U_K$ を掛けても主イデアル $(u\alpha)=(\alpha)$ は変わりません。そこで **生成元の重複を単数で割る**操作が必要です。このとき [ANF7 の対数格子](../ANF7/index.md#def-anf7-log-embedding)が有限な基本領域を与えます。

$V=\mathbb R^{r_1}\times\mathbb C^{r_2}$ を実次元 $n$ の Euclid 空間とし、[Minkowski埋め込み](../ANF5/index.md#def-anf5-minkowski-embedding)で $K$ を $V$ に入れます。$m=r_1+r_2$、重みを $w_i=1$（実座標）、$w_i=2$（複素座標）とすると $\sum_i w_i=n$ です。$z=(z_1,\dots,z_m)\in V$ の全座標が非零なら

$$
t_i(z)=|z_i|^{w_i},\qquad
Q(z)=\prod_{i=1}^{m}t_i(z),\qquad
y_i(z)=\log t_i(z)
$$

> とします。体の元 $0\ne\alpha\in K$ に対しては、[埋め込みノルム公式](../ANF2/index.md#thm-anf2-embedding-formulas)から $Q(j(\alpha))=|N_{K/\mathbb Q}(\alpha)|$ です。

単に $y_i$ を取ると、元の大きさを変えたとき和も変化します。大きさの共通成分を取り除き、単数による移動だけを見えるようにします。

<a id="def-anf8-centered-log"></a>

<!-- formal-statement-start -->
> **定義（中心化対数座標）**  
> $H=\{x\in\mathbb R^m:\sum_i x_i=0\}$ とする。全座標非零の $z\in V$ について、中心化対数座標 $x(z)\in H$ を

$$
x_i(z)=y_i(z)-\frac{w_i}{n}\log Q(z)
$$

> で定める。$m=1$ の場合は $H=\{0\}$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-anf8-centered-log -->
**定義の確認**　$K=\mathbb Q(\sqrt2)$ で $\alpha=1+\sqrt2$ とすると、二つの実埋め込みの絶対値は $\varepsilon=1+\sqrt2$ と $\varepsilon^{-1}$ で $Q=1$ です。従って

$$
x(j(\alpha))=(\log\varepsilon,-\log\varepsilon)\in H.
$$

> また $K=\mathbb Q(i)$ では $m=1,w_1=n=2$ なので任意の $z\in\mathbb C^\times$ に対し $x_1(z)=\log|z|^2-\log|z|^2=0$ です。これは単数の自由階数が0の状況に一致します。
<!-- definition-example-end -->

座標を同じ正数 $\lambda$ 倍すると $Q(\lambda z)=\lambda^nQ(z)$ なので

$$
x_i(\lambda z)=y_i(z)+w_i\log\lambda
-\frac{w_i}{n}(\log Q(z)+n\log\lambda)=x_i(z).
$$

> 一方、単数 $u$ を掛けると $|N(u)|=1$ より $x(j(u\alpha))=x(j(\alpha))+L(u)$ となります。ここで $L$ は [重み付き対数写像](../ANF7/index.md#def-anf7-log-embedding)です。

[Dirichletの単数定理](../ANF7/index.md#thm-anf7-dirichlet-unit)により $\Gamma=L(U_K)$ は $H$ の階数 $m-1$ の全格子です。基本単数の対数ベクトルを辺とする半開の基本平行多面体 $P\subset H$ を固定し、$m=1$ のときは $P=\{0\}$ とします。各 $x\in H$ は $\Gamma$ による平行移動でちょうど一度 $P$ に入ります。

<a id="lem-anf8-class-generator-orbits"></a>

<!-- formal-statement-start -->
> **補題（類のイデアルと単数軌道）**  
> $C\in\mathrm{Cl}(K)$ を固定し、$[\mathfrak a]=C^{-1}$ を満たす非零整イデアル $\mathfrak a$ を選ぶ。$[\mathfrak b]=C$ である非零整イデアル $\mathfrak b$ と、非零元 $\alpha\in\mathfrak a$ の単数群による軌道は

$$
\mathfrak b=(\alpha)\mathfrak a^{-1}
$$

> によって一対一に対応し、$N\mathfrak b=|N_{K/\mathbb Q}(\alpha)|/N\mathfrak a$ が成り立つ。さらに $x(j(\alpha))\in P$ という条件で軌道を規格化すると、各 $\mathfrak b$ に対応する $\alpha$ はちょうど $w_K$ 個ある。
<!-- formal-statement-end -->

### 証明の見取り図

類の積が自明なら $\mathfrak b\mathfrak a$ は主イデアルです。$\mathfrak b$ が整イデアルなのでその生成元は $\mathfrak a$ に入ります。異なる生成元は単数倍であり、対数基本領域は自由部分を除くので、最後に有限群 $\mu(K)$ の位数だけ残ります。

<!-- proof-start -->
### 証明

$[\mathfrak b][\mathfrak a]=1$ なので $\mathfrak b\mathfrak a=(\alpha)$ と書けます。$\mathfrak b\subseteq A$ より $(\alpha)=\mathfrak b\mathfrak a\subseteq\mathfrak a$、従って $\alpha\in\mathfrak a\setminus\{0\}$ です。

逆に $0\ne\alpha\in\mathfrak a$ なら $(\alpha)\subseteq\mathfrak a$ です。[可逆分数イデアルの積](../ANF3/index.md#thm-anf3-ideal-factorization)により $(\alpha)\mathfrak a^{-1}\subseteq A$ は整イデアルで、その類は $C$ です。絶対ノルムの乗法性と[主イデアルのノルム公式](../ANF4/index.md#def-anf4-ideal-norm)からノルムの等式が従います。

二つの生成元が同じ $\mathfrak b\mathfrak a$ を生成する必要十分条件は $\beta=u\alpha$（$u\in U_K$）です。[単数定理の核の記述](../ANF7/index.md#lem-anf7-kernel-discrete)では $\ker L=\mu(K)$ です。$x(j(u\alpha))=x(j(\alpha))+L(u)$ であり、$P$ は $\Gamma$ の半開基本領域だから、$\Gamma$ の移動量は規格化によりただ一つに定まります。その移動量の逆像の単数は $\mu(K)$ の一つの剰余類で、要素数は $w_K$ です。
<!-- proof-end -->

## 4. 基本領域の体積と格子点計数

なぜ留数に $2^{r_1}(2\pi)^{r_2}$ と $R_K$ が現れるのでしょうか。実座標では符号が2通り、複素座標では偏角が1周 $2\pi$ あります。重み付き対数の Jacobian を計算すると、残りがちょうどレギュレータになります。

全座標非零で $0<Q(z)\leq1$、$x(z)\in P$ を満たす $z\in V$ の集合を $\Omega_P$ とします。零点も含めた閉包は有界です。実際、$x_i$ が有界なら

$$
|z_i|=\exp(x_i/w_i)Q(z)^{1/n}
$$

> なので全座標が $Q(z)^{1/n}$ に比例して有界で、$Q(z)\downarrow0$ では原点へ近づきます。

<a id="lem-anf8-region-volume"></a>

<!-- formal-statement-start -->
> **補題（単数基本領域の体積）**  
> 上の半開基本領域 $P$ に対し、$V$ の通常の $n$ 次元 Lebesgue 体積で

$$
\operatorname{vol}(\Omega_P)
=2^{r_1}\pi^{r_2}R_K
$$

> が成り立つ。$m=1$ の場合にも $R_K=1$ として同じ式を用いる。
<!-- formal-statement-end -->

### 証明の見取り図

各実座標を絶対値へ、各複素座標を半径の二乗へ変えます。すると体積要素は $2^{r_1}\pi^{r_2}\prod dt_i$ になり、$y_i=\log t_i$ へ移すと $e^{\sum y_i}$ が付くことに注目します。

<!-- proof-start -->
### 証明

実座標の正負二通りは $2\,d|z_i|=2\,dt_i$ を与えます。複素座標では極座標 $z_j=\rho_j e^{i\theta_j}$ を取り、角度積分は

$$
\int_0^{2\pi}\rho_j\,d\theta_j\,d\rho_j
=2\pi\rho_j\,d\rho_j=\pi\,d(\rho_j^2)=\pi\,dt_j
$$

> です。よって体積要素は $2^{r_1}\pi^{r_2}\prod_{i=1}^m dt_i$ です。$t_i=e^{y_i}$ と置くと

$$
\prod_i dt_i=e^{\sum_i y_i}\prod_i dy_i.
$$

> $T=\sum_i y_i=\log Q(z)$、$x_i=y_i-(w_i/n)T$ と置き、$x_m=-\sum_{i<m}x_i$ を消去すると

$$
y_i=x_i+\frac{w_i}{n}T\quad(i<m),\qquad
y_m=-\sum_{i<m}x_i+\frac{w_m}{n}T.
$$

> この線形変換の Jacobian の絶対値は $\sum_i w_i/n=1$ です（第1〜第 $m-1$ 行を最後の行へ足すと確認できます）。従って

$$
\operatorname{vol}(\Omega_P)
=2^{r_1}\pi^{r_2}
\int_{x\in P}\int_{-\infty}^{0}e^T\,dT\,
dx_1\cdots dx_{m-1}.
$$

> 内側の積分は1です。[レギュレータの定義と不変性](../ANF7/index.md#prop-anf7-regulator-invariance)より、$H$ を $x_1,\ldots,x_{m-1}$ で表したときの $P$ の座標体積は $R_K$ です。$m=1$ では空次元体積を1と解釈し、結論はそのまま成立します。
<!-- proof-end -->

次に解析へ進む前に、格子点個数と体積を比較します。必要なのは「滑らかな境界を持つ有界な領域を大きく拡大すると、体積に比例する主項が出る」という具体的な形です。

<a id="lem-anf8-lattice-count"></a>

<!-- formal-statement-start -->
> **補題（境界が Lipschitz な領域の格子点計数）**  
> $\Lambda\subset\mathbb R^n$ を全階数格子、$\Omega\subset\mathbb R^n$ を有界領域とする。境界が有限個の有界な $(n-1)$ 次元パラメータ領域からの Lipschitz 写像で覆えるなら、$t\geq1$ に対して

$$
\#(\Lambda\cap t\Omega)
=\frac{\operatorname{vol}(\Omega)}{\operatorname{covol}(\Lambda)}t^n
+O_{\Lambda,\Omega}(t^{n-1})
$$

> が成り立つ。境界上の点を含めるか除くかによる差も誤差項に吸収される（$n=1$ のとき誤差は $O(1)$）。
<!-- formal-statement-end -->

### 証明の見取り図

格子を線形変換で $\mathbb Z^n$ に直し、一辺 $t^{-1}$ の小立方体で領域を覆います。境界と交わらない立方体は点数と体積が一致し、境界に触れる立方体は $O(t^{n-1})$ 個です。

<!-- proof-start -->
### 証明

格子基底を列とする可逆実行列 $B$ を取って $\Lambda=B\mathbb Z^n$ とします。$B^{-1}\Omega$ の境界も有限個の Lipschitz 写像で覆えるので、$\Lambda=\mathbb Z^n$ の場合を証明すれば十分です。体積は $|\det B|^{-1}=\operatorname{covol}(\Lambda)^{-1}$ 倍されます。

各 $k\in\mathbb Z^n$ に対応する単位立方体 $k+[0,1)^n$ を $t\Omega$ へ重ねます。立方体が境界に触れなければ、内部で完全に包含されるか、まったく交わらないかのいずれかです。したがって格子点数と体積の差の絶対値は、境界に触れる立方体の個数の定数倍で抑えられます。

Lipschitz 定数が $M$ の写像 $f:[0,1]^{n-1}\to\mathbb R^n$ の定義域を一辺 $1/t$ の小箱へ分割すると箱数は $O(t^{n-1})$ です。各小箱の像の直径は高々 $M\sqrt{n-1}/t$、拡大像 $tf(\text{小箱})$ の直径は一様有界です。従って各拡大像に触れる単位立方体も一様有限個で、総数は $O(t^{n-1})$ です。有限個の写像・有界パラメータ領域について足し合わせれば主張を得ます。

$n=1$ では境界は有限個の点で覆えるという条件から境界と交わる単位区間は $O(1)$ 個です。
<!-- proof-end -->

$\Omega_P$ にもこの補題を使えます。理由を確認しておきます。$P$ の閉包は有限個の面をもつコンパクトな平行多面体です。$Q(z)=1$ の切断面を $x\in\overline P$、実座標の符号、複素座標の偏角で書くと、各座標の絶対値は $\exp(x_i/w_i)$ です。有限個のコンパクトなパラメータ箱で滑らかに記述できます。その表面から半径 $0\leq\lambda\leq1$ だけ縮めた領域が $\overline{\Omega_P}$ であり、境界は外側の面と $P$ の各境界面の円錐状の部分の有限和です。写像 $(\lambda,x,\theta)\mapsto\lambda z(x,\theta)$ はコンパクトなパラメータ領域上 Lipschitz なので補題の仮定を満たします。半開境界の選択は主項を変えません。

## 5. 類ごとに主項を取り出す

<a id="thm-anf8-ideal-count-asymptotic"></a>

<!-- formal-statement-start -->
> **定理（各イデアル類の計数漸近式）**  
> $K/\mathbb Q$ を次数 $n$ の数体とし、$C\in\mathrm{Cl}(K)$ を任意のイデアル類とする。$X\to\infty$ において

$$
A_C(X)=c_KX+O_{K,C}(X^{1-1/n}),
\qquad
c_K=\frac{2^{r_1}(2\pi)^{r_2}R_K}
{w_K\sqrt{|D_K|}}
$$

> が成り立つ。$n=1$ では誤差を $O(1)$ と読む。**主項係数は類 $C$ に依存しない**。
<!-- formal-statement-end -->

### 証明の見取り図

[類のイデアルと元の対応](#lem-anf8-class-generator-orbits)により、$\mathfrak a$ の元を基本領域内で数えればよい。[ANF5 のイデアル格子の共体積](../ANF5/index.md#thm-anf5-ideal-covolume)で割り、$\mathfrak a$ のノルムが打ち消し合うのを確認します。

<!-- proof-start -->
### 証明

$[\mathfrak a]=C^{-1}$ の非零整イデアル $\mathfrak a$ を一つ固定します。[類の単数軌道の補題](#lem-anf8-class-generator-orbits)と中心化対数の拡大不変性より

$$
w_K A_C(X)
=\#\{0\ne\alpha\in\mathfrak a:
|N(\alpha)|\leq XN\mathfrak a,\ x(j(\alpha))\in P\}.
$$

> $t=(XN\mathfrak a)^{1/n}$ とすると、右辺の集合は格子 $j(\mathfrak a)$ の $t\Omega_P$ 内の点（原点を除く）と一致します。$n\geq1$ について [格子点計数補題](#lem-anf8-lattice-count)を適用して

$$
w_K A_C(X)
=\frac{\operatorname{vol}(\Omega_P)}
{\operatorname{covol}(j(\mathfrak a))}
XN\mathfrak a+O_{\mathfrak a,P}(X^{1-1/n}).
$$

> [イデアル格子の共体積公式](../ANF5/index.md#thm-anf5-ideal-covolume)は

$$
\operatorname{covol}(j(\mathfrak a))
=2^{-r_2}\sqrt{|D_K|}\,N\mathfrak a
$$

> です。また [基本領域の体積補題](#lem-anf8-region-volume)から $\operatorname{vol}(\Omega_P)=2^{r_1}\pi^{r_2}R_K$ です。これらを代入すると

$$
\frac{2^{r_1}\pi^{r_2}R_K}
{2^{-r_2}\sqrt{|D_K|}N\mathfrak a}
XN\mathfrak a
=\frac{2^{r_1}(2\pi)^{r_2}R_K}
{\sqrt{|D_K|}}X.
$$

> 最後に $\mu(K)$ の要素数 $w_K$ で割って結論を得ます。$\mathfrak a$ は固定したまま $X\to\infty$ としたので、誤差定数が $C$ に依存することは許されますが、主項係数には依存しません。
<!-- proof-end -->

**なぜ $w_K$ で割るか。** 対数写像の核は根付き単数群 $\mu(K)$ です。対数基本領域で除けるのは自由部分だけで、各イデアルには根付き単数の数だけ生成元が残ります。$R_K$ を定義しただけではこの分母は出ません。

## 6. 解析類数公式

イデアル類は [ANF6 の有限性定理](../ANF6/index.md#thm-anf6-minkowski-class-bound)によりちょうど $h_K$ 個あります。従って上の類別漸近式を足すと

$$
A_K(X)=h_Kc_KX+O_K(X^{1-1/n}).
$$

> 次にこの「個数の主項」を級数の「極の係数」へ変換します。使うのは有限和の部分和変形から得られる部分積分です。

任意の $Y\geq1$ と $\Re(s)>1$ について、$A_K(x)$ が $x$ 以下のノルムのイデアルを数えることから

$$
\sum_{N\mathfrak a\leq Y}(N\mathfrak a)^{-s}
=A_K(Y)Y^{-s}
+s\int_1^Y A_K(x)x^{-s-1}\,dx
$$

> です。各イデアルについて $m^{-s}=Y^{-s}+s\int_m^Y x^{-s-1}\,dx$ を足すことで直接検算できます。$A_K(Y)=O(Y)$ なので $\Re(s)>1$ で $Y\to\infty$ とすると端の項は消え、

$$
\zeta_K(s)=s\int_1^\infty A_K(x)x^{-s-1}\,dx
$$

> を得ます。これで留数の導出に必要な準備が整いました。

<a id="thm-anf8-analytic-class-number-formula"></a>

<!-- formal-statement-start -->
> **定理（解析類数公式）**  
> 任意の数体 $K/\mathbb Q$ に対し、Dedekind ゼータ関数 $\zeta_K(s)$ は $s=1$ の近傍へ有理型に延長され、そこで位数1の極をもち、その留数は

$$
\boxed{\displaystyle
\operatorname*{Res}_{s=1}\zeta_K(s)
=\frac{2^{r_1}(2\pi)^{r_2}h_KR_K}
{w_K\sqrt{|D_K|}}}
$$

> である。ここで $r_1,r_2,h_K,R_K,w_K,D_K$ は本講冒頭で定めたものとする。
<!-- formal-statement-end -->

### 証明の見取り図

先ほどの $A_K(X)=\kappa_KX+O(X^{1-1/n})$ を積分表示へ代入します。主項の積分が $s/(s-1)$ を与え、誤差の積分は $s=1$ の周辺で正則になるため、主項の係数がそのまま留数となります。

<!-- proof-start -->
### 証明

$\kappa_K=h_Kc_K$ と書き、$E(x)=A_K(x)-\kappa_Kx$ とします。[各類の計数漸近式](#thm-anf8-ideal-count-asymptotic)を有限個の類について足すと

$$
E(x)=O_K(x^{1-1/n})
$$

> です。$\Re(s)>1$ では部分積分による表示から

$$
\zeta_K(s)
=s\int_1^\infty(\kappa_Kx+E(x))x^{-s-1}\,dx
=\frac{\kappa_Ks}{s-1}
+s\int_1^\infty E(x)x^{-s-1}\,dx.
$$

> 右辺第2項の被積分関数は、$x\geq1$ において定数倍の $x^{-\Re(s)-1/n}$ で抑えられます。この積分は $\Re(s)>1-1/n$ で収束します。さらに同領域のコンパクト集合上で $\log^k x$ を掛けた導関数の積分も一様収束するので、第2項はその半平面で正則です。従って右辺が $\zeta_K$ の $s=1$ 近傍への有理型延長を与えます。

$$
\frac{\kappa_Ks}{s-1}
=\frac{\kappa_K}{s-1}+\kappa_K
$$

> より留数は $\kappa_K$ です。$h_K\geq1$、$R_K>0$、$w_K\geq1$、$D_K\ne0$ なので $\kappa_K>0$ で、極は実際に1位です。最後に $c_K$ の式を代入すると提示した公式になります。
<!-- proof-end -->

この証明は $s=1$ 近傍での有理型延長と留数を与えました。ゼータ関数の全複素平面への延長・関数等式はここでは用いておらず、別の解析的問題です。

## 7. $\mathbb Q$ と二次体で係数を検算する

### $\mathbb Q$

$r_1=1,r_2=0,h_K=1,w_K=2,D_K=1,R_K=1$ なので公式は

$$
\operatorname*{Res}_{s=1}\zeta_{\mathbb Q}(s)
=\frac{2}{2}=1.
$$

> 実際、$\zeta_{\mathbb Q}(s)=\sum_{m\geq1}m^{-s}$ で $\lfloor X\rfloor=X+O(1)$ ですから、積分表示からも留数1が出ます。

### 虚二次体 $\mathbb Q(i)$

整数環は $\mathbb Z[i]$、判別式 $D_K=-4$、署名 $(r_1,r_2)=(0,1)$ です。[ANF6 の類数1判定](../ANF6/index.md#cor-anf6-class-number-one)から $h_K=1$、[ANF7 の単数の計算](../ANF7/index.md#def-anf7-unit-group)から $U_K=\{\pm1,\pm i\}$、従って $w_K=4$、$R_K=1$ です。よって

$$
\operatorname*{Res}_{s=1}\zeta_{\mathbb Q(i)}(s)
=\frac{2\pi}{4\cdot2}=\frac{\pi}{4}.
$$

> これは独立にも検算できます。[二次体の分解](../ANF4/index.md#thm-anf4-quadratic-splitting)に従い、$\chi_{-4}(m)$ を「$m\equiv1\pmod4$ なら1、$m\equiv3\pmod4$ なら $-1$、偶数なら0」と定めると、$\Re(s)>1$ で Euler 因子を照合して

$$
\zeta_{\mathbb Q(i)}(s)=\zeta(s)L(s,\chi_{-4}),
\qquad
L(s,\chi_{-4})=\sum_{k=0}^\infty
\big((4k+1)^{-s}-(4k+3)^{-s}\big).
$$

> $s\downarrow1$ において $L(s,\chi_{-4})$ は交代級数 $\sum_{k\geq0}(-1)^k/(2k+1)$ に収束します。交代級数の剰余は先頭項の大きさ以下なので $s\geq1$ に一様で、有限部分和ごとの連続性と合わせて極限交換できます。さらに $\arctan x=\int_0^x(1+t^2)^{-1}\,dt$ を $0\leq x<1$ で等比級数展開し $x\uparrow1$ とすると、この級数の和は $\pi/4$ です。$\zeta(s)$ の留数が1であるため、独立に同じ係数を得ます。

### 他の二次体での係数の役割

$K=\mathbb Q(\sqrt{-5})$ では [ANF6 の類群計算](../ANF6/index.md#thm-anf6-q-sqrt-minus-five-class-group)から $h_K=2$、$D_K=-20$、$r_2=1$、$w_K=2$、$R_K=1$ なので

$$
\operatorname*{Res}_{s=1}\zeta_K(s)
=\frac{2\pi\cdot2}{2\sqrt{20}}=\frac{\pi}{\sqrt5}.
$$

> ここでは虚二次体の単数の自由階数は0でも、類数2が主項を2倍にします。一方、実二次体 $\mathbb Q(\sqrt2)$ は $r_1=2,r_2=0,D_K=8,h_K=1,w_K=2$ で、[ANF7 の基本単数](../ANF7/index.md#def-anf7-regulator)から $R_K=\log(1+\sqrt2)$。よって留数は $\log(1+\sqrt2)/\sqrt2$ です。この場合は自由部分の大きさを表すレギュレータが係数に入ります。

## 8. 演習：Euler積・基本領域・留数を再構成する

### A1. $\mathbb Q$ の計数関数

$K=\mathbb Q$ について $A_K(X)$ を求め、$\zeta_K(s)$ の $s=1$ の留数を計数関数から導け。

- Level: A
- ID: ANF8-A1

<!-- solution-start -->
**詳細解答**　$\mathbb Z$ の非零整イデアルは $m\mathbb Z$（$m\geq1$）だけで、ノルムは $m$ です。従って $A_K(X)=\lfloor X\rfloor=X+E(X)$、$-1<E(X)\leq0$ です。本文の部分積分公式から

$$
\zeta_K(s)=\frac{s}{s-1}
+s\int_1^\infty E(x)x^{-s-1}\,dx.
$$

> $E(x)$ は有界で、第2項は $\Re(s)>0$ で正則です。第1項は $1/(s-1)+1$ なので留数は1です。
<!-- solution-end -->

### A2. 惰性素数の Euler 因子

$K=\mathbb Q(i)$ で $p\equiv3\pmod4$ とする。$pA$ が素イデアルのままであるとき、なぜ局所因子が $(1-p^{-2s})^{-1}$ か説明せよ。

- Level: A
- ID: ANF8-A2

<!-- solution-start -->
**詳細解答**　[二次体の分解の判定](../ANF4/index.md#thm-anf4-quadratic-splitting)で $p$ は惰性なので $pA=\mathfrak p$、剰余次数は $f=2$ です。[素イデアルノルム](../ANF4/index.md#lem-anf4-prime-power-norm)から $N\mathfrak p=p^f=p^2$ です。[Euler積](#prop-anf8-euler-product)の局所因子は

$$
\sum_{k=0}^\infty(N\mathfrak p)^{-ks}
=\sum_{k=0}^\infty p^{-2ks}
=(1-p^{-2s})^{-1}.
$$

> $pA$ が素であってもノルムは $p$ とは限りません。
<!-- solution-end -->

### A3. 公式の各数値を埋める

$K=\mathbb Q(i)$ と $\mathbb Q(\sqrt{-5})$ について、それぞれ $(r_1,r_2,D_K,h_K,w_K,R_K)$ を列挙し解析類数公式の右辺を計算せよ。

- Level: A
- ID: ANF8-A3

<!-- solution-start -->
**詳細解答**　$K=\mathbb Q(i)$ では $(0,1,-4,1,4,1)$ です。[ANF6 の類数1判定](../ANF6/index.md#cor-anf6-class-number-one)と $a^2+b^2=1$ による単数列挙を用いました。[解析類数公式](#thm-anf8-analytic-class-number-formula)に代入して $2\pi/(4\sqrt4)=\pi/4$ です。

$K=\mathbb Q(\sqrt{-5})$ では $(0,1,-20,2,2,1)$ です。[類群の計算](../ANF6/index.md#thm-anf6-q-sqrt-minus-five-class-group)で $h_K=2$。単数はノルム方程式 $a^2+5b^2=1$ より $\pm1$ の2個だけです。したがって $2\pi\cdot2/(2\sqrt{20})=\pi/\sqrt5$ です。
<!-- solution-end -->

### A4. 中心化対数の拡大不変性

重み $w_i$ の和が $n$ であるとする。任意の $\lambda>0$ と全座標非零の $z\in V$ について $x(\lambda z)=x(z)$ を導け。

- Level: A
- ID: ANF8-A4

<!-- solution-start -->
**詳細解答**　[中心化対数の定義](#def-anf8-centered-log)に代入します。$t_i(\lambda z)=\lambda^{w_i}t_i(z)$ なので $y_i(\lambda z)=y_i(z)+w_i\log\lambda$。また $Q(\lambda z)=\lambda^{\sum_iw_i}Q(z)=\lambda^nQ(z)$ です。従って

$$
x_i(\lambda z)
=y_i(z)+w_i\log\lambda
-\frac{w_i}{n}(\log Q(z)+n\log\lambda)
=x_i(z).
$$

> 任意の座標 $i$ で成り立つのでベクトルとして一致します。
<!-- solution-end -->

### A5. 元のノルムとイデアルのノルム

非零整イデアル $\mathfrak a$、$0\ne\alpha\in\mathfrak a$ に対して $\mathfrak b=(\alpha)\mathfrak a^{-1}$ は整イデアルであること、$N\mathfrak b=|N_{K/\mathbb Q}(\alpha)|/N\mathfrak a$ を確かめよ。

- Level: A
- ID: ANF8-A5

<!-- solution-start -->
**詳細解答**　$\alpha\in\mathfrak a$ から $(\alpha)\subseteq\mathfrak a$ です。Dedekind環のイデアルが可逆であることを [ANF3 の分解定理](../ANF3/index.md#thm-anf3-ideal-factorization)で使い、$\mathfrak a^{-1}$ を掛ければ $(\alpha)\mathfrak a^{-1}\subseteq A$ です。非零であるため非零整イデアルになります。

両辺に $\mathfrak a$ を掛けると $\mathfrak a\mathfrak b=(\alpha)$ です。絶対ノルムの乗法性から $(N\mathfrak a)(N\mathfrak b)=N((\alpha))=|N_{K/\mathbb Q}(\alpha)|$。$N\mathfrak a>0$ で割って結論を得ます。
<!-- solution-end -->

### B1. Gauss整数格子から $\pi/4$ を得る

$K=\mathbb Q(i)$ とする。基本領域の条件が全ての非零 $z\in\mathbb C$ に自動的に成り立つことを確認し、円板の格子点計数から $A_K(X)=(\pi/4)X+O(\sqrt X)$ を導け。

- Level: B
- ID: ANF8-B1

<!-- solution-start -->
**詳細解答**　$K$ は実埋め込み0、複素共役組1なので $m=1,n=2,w_1=2$ です。[中心化対数](#def-anf8-centered-log)は $x_1(z)=0$、$H=P=\{0\}$ です。$Q(z)=|z|^2$ なので $\Omega_P=\{z:0<|z|\leq1\}$ となり、体積は $\pi$ です。

$\mathbb Z[i]\cong\mathbb Z^2$ は共体積1の格子です。$X^{1/2}\Omega_P$ に入る非零格子点は面積 $\pi X$、境界誤差 $O(\sqrt X)$ により $\pi X+O(\sqrt X)$ 個です。単数 $\{\pm1,\pm i\}$ は4個で、非零元 $\alpha$ と $u\alpha$ は同じ主イデアルを生成します。類数が1なので全ての非零整イデアルが主であり、4で割ると

$$
A_K(X)=\frac14(\pi X+O(\sqrt X))
=\frac{\pi}{4}X+O(\sqrt X).
$$

> 単に円板の面積を答えると $w_K=4$ を落とします。
<!-- solution-end -->

### B2. 変数変換の Jacobian

$m\geq2$、$w_i>0$、$\sum_iw_i=n$ とする。$y_i=x_i+(w_i/n)T$、$x_m=-\sum_{i<m}x_i$ の Jacobian の絶対値が1であることを行基本変形で示せ。

- Level: B
- ID: ANF8-B2

<!-- solution-start -->
**詳細解答**　変数の順を $(x_1,\ldots,x_{m-1},T)$ とします。Jacobian は $m\times m$ 行列で、上の $m-1$ 行はそれぞれ $x_i$ の列に1、他の $x$ の列に0、最後の列に $w_i/n$ を持ちます。最後の行は $x$ の各列に $-1$、最後の列に $w_m/n$ を持ちます。

上の $m-1$ 行の和を最後の行へ加えると、最後の行は $(0,\ldots,0,\sum_iw_i/n)=(0,\ldots,0,1)$ になります。行列式は上左の単位行列の行列式1と最後の成分1の積です。従って絶対値は1であり、[体積計算](#lem-anf8-region-volume)の変数変換に余計な係数は付きません。
<!-- solution-end -->

### B3. 計数の誤差から正則性へ

$A(X)=\kappa X+O(X^\theta)$（$0\leq\theta<1$）が成り立ち、Dirichlet級数 $F(s)=\sum_{m\geq1}a_mm^{-s}$ の係数は非負、$A(X)=\sum_{m\leq X}a_m$ とする。$F$ の $s=1$ 近傍への延長と留数を導け。

- Level: B
- ID: ANF8-B3

<!-- solution-start -->
**詳細解答**　非負係数なので $\Re(s)>1$ で部分積分を正当化し、

$$
F(s)=s\int_1^\infty A(x)x^{-s-1}\,dx.
$$

> $E(x)=A(x)-\kappa x$ と置くと

$$
F(s)=\frac{\kappa s}{s-1}
+s\int_1^\infty E(x)x^{-s-1}\,dx.
$$

> $|E(x)x^{-s-1}|\leq Cx^{\theta-\Re(s)-1}$ であり、指数が $-1$ より小さいための条件は $\Re(s)>\theta$ です。$\log^k x$ を掛けたものも同じ開半平面内のコンパクト集合で積分可能なので、誤差項は $\Re(s)>\theta$ に正則に延長します。$\kappa s/(s-1)=\kappa/(s-1)+\kappa$ だから留数は $\kappa$ です。$\kappa>0$ なら極は1位です。
<!-- solution-end -->

### B4. 境界格子点の誤差を説明する

$\Omega\subset\mathbb R^2$ が有界で、その境界が有限個の長さ有限な Lipschitz 曲線で覆えるとする。$\#(\mathbb Z^2\cap t\Omega)=t^2\operatorname{area}(\Omega)+O(t)$ を、単位正方形を使って説明せよ。

- Level: B
- ID: ANF8-B4

<!-- solution-start -->
**詳細解答**　$\mathbb Z^2$ の格子点 $k$ に半開単位正方形 $k+[0,1)^2$ を対応させます。$t\Omega$ の境界と交わらない正方形は内外が一定なので、格子点数と面積の差は境界と交わる正方形だけで生じます。

境界を覆う各 Lipschitz 曲線を長さ $O(1/t)$ のパラメータ区間へ $O(t)$ 個に分割します。曲線を $t$ 倍したとき各部分像の直径は一様に有界ですから、そこに触れる単位正方形も一様に高々定数個です。曲線は有限本なので境界と交わる正方形は $O(t)$ 個。各正方形の面積は1で誤差は定数以下だから、全誤差は $O(t)$ です。これは [一般の格子点計数補題](#lem-anf8-lattice-count)の二次元版です。
<!-- solution-end -->

### C1. $\mathbb Q(i)$ を二つの経路で計数する

$K=\mathbb Q(i)$ とする。次の問いを一続きで解け。

1. 有理素数の分解型から $\zeta_K(s)=\zeta(s)L(s,\chi_{-4})$（$\Re(s)>1$）を示せ。
2. $L(1,\chi_{-4})=\pi/4$ を級数または積分で導け。
3. 単数、判別式、類数から [解析類数公式](#thm-anf8-analytic-class-number-formula)の右辺を計算し、1・2と一致させよ。
4. 格子点による独立の漸近式を示し、なぜ複素座標に $\pi$ が、分母に4が出るか説明せよ。

- Level: C
- ID: ANF8-C1

<!-- solution-start -->
**詳細解答**　まず [ANF4 の二次体分解判定](../ANF4/index.md#thm-anf4-quadratic-splitting)により $p=2$ は分岐、$p\equiv1\pmod4$ は分裂、$p\equiv3\pmod4$ は惰性です。一方 $\chi_{-4}$ を本文のように定めたとき、$\zeta(s)L(s,\chi_{-4})$ の $p$ 因子は

$$
(1-p^{-s})^{-1}(1-\chi_{-4}(p)p^{-s})^{-1}.
$$

> $p=2$ では $\chi=0$ で $(1-2^{-s})^{-1}$、$p\equiv1$ では $(1-p^{-s})^{-2}$、$p\equiv3$ では $(1-p^{-s})^{-1}(1+p^{-s})^{-1}=(1-p^{-2s})^{-1}$ です。いずれも [Dedekindの Euler積](#prop-anf8-euler-product)の対応因子に一致します。$\Re(s)>1$ の絶対収束から積全体が一致します。

次に

$$
L(s,\chi_{-4})=\sum_{k=0}^\infty
\left((4k+1)^{-s}-(4k+3)^{-s}\right)
=\sum_{j=0}^\infty(-1)^j(2j+1)^{-s}
$$

> です。$s\geq1$ で項の絶対値は単調減少し、交代級数の残差は高々 $(2N+1)^{-1}$ なので $s\downarrow1$ の極限を級数内へ移せます。また $0\leq x<1$ で

$$
\int_0^x\frac{dt}{1+t^2}
=\sum_{j=0}^\infty\frac{(-1)^jx^{2j+1}}{2j+1}
=\arctan x.
$$

> $x\uparrow1$ とすると左辺は $\pi/4$ へ収束し、右辺は交代級数の一様な剰余評価により $\sum_j(-1)^j/(2j+1)$ に収束します。従って $L(1,\chi_{-4})=\pi/4$。$\zeta(s)$ の留数は1なので $\zeta_K$ の留数も $\pi/4$ です。

代数的な側では $r_1=0,r_2=1$、$D_K=-4$、$h_K=1$、$R_K=1$ です。また $N(a+bi)=a^2+b^2$ が1となる整数解は $\pm1,\pm i$ なので $w_K=4$。[解析類数公式](#thm-anf8-analytic-class-number-formula)へ代入すると

$$
\frac{(2\pi)^1\cdot1\cdot1}{4\sqrt4}
=\frac{2\pi}{8}=\frac{\pi}{4},
$$

> となり一致します。

最後に $\mathbb Z[i]$ の元 $\alpha=a+bi$ で $|N\alpha|=a^2+b^2\leq X$ は半径 $\sqrt X$ の円板内の非零格子点なので $\pi X+O(\sqrt X)$ 個です。整数環は類数1なので全イデアルは主イデアルであり、その生成元は4個の単数倍でちょうど4重に数えられています。従って $A_K(X)=\frac{\pi}{4}X+O(\sqrt X)$ です。円板の面積が複素座標の $\pi$、単数4個による重複除去が分母4を説明します。Euler積の経路と格子点の経路が同じ留数に到達しました。
<!-- solution-end -->

## 9. 次講への橋

本講では、数体の**大域的な**全イデアルをノルムで数え、$s=1$ における Dedekind ゼータ関数の留数を得ました。[解析類数公式](#thm-anf8-analytic-class-number-formula)はイデアル類群と単数群を、一つの解析的係数へ結び付けます。

次の ANF9 では、素イデアルを一つ選んでその近くの算術を詳しく調べます。付値・局所化・完備化は、「すべての素数を同時に見る」本講とは対照的に、一つの素点を拡大して観察する道具になります。

参考：J. S. Milne, *Algebraic Number Theory*（Dedekind zeta functions / class number formula）、Neukirch, *Algebraic Number Theory*（analytic class number formula）。本講の級数・格子点・演習は既習のイデアル分解、単数定理、共体積公式から導出しました。
