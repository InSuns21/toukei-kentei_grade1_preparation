# TRN14 Lindemann–Weierstrass完成・代数的係数版

[TRN12の共役有限積](../TRN12/index.md#prop-trn12-rational-symmetric-reduction)は、もし相異なる代数的指数の間に有理係数の関係があれば、対称な整数係数の指数関係が生じると示しました。[TRN13の共役ノルムの下界](../TRN13/index.md#thm-trn13-arithmetic-norm)と[複素積分の上界](../TRN13/index.md#thm-trn13-uniform-error)は、その対称な関係が長くは維持できないことを示します。本章ではこの両端を接続し、さらに係数が有理数ではなく**任意の代数的数**の場合へ拡張します。

ここには注意すべき論理の溝があります。有理係数で一次独立な数が、一般に代数的係数でも一次独立とは限りません。例えば $1,\sqrt2$ は $\mathbb Q$ 上一次独立でも、$(-\sqrt2)\cdot1+1\cdot\sqrt2=0$ です。必要なのは、一次独立性をそのまま係数拡大することではなく、指数の有理一次独立性から**指数関数値の代数的独立性**へ進み、係数だけを共役で動かす多項式ノルムを使うことです。

## 1. 有理係数版を矛盾まで閉じる

最初の到達点は、相異なる代数的数 $\alpha_j$ の指数関数値が有理数係数で一次独立であるという主張です。ここで「相異なる」は $\alpha_j$ 同士の条件であり、$\mathbb Q$ 上一次独立という強い条件は要求しません。

<a id="thm-trn14-rational-lw"></a>

<!-- formal-statement-start -->
> **定理（Lindemann–Weierstrassの有理係数版）**  
> $m\ge1$、$\alpha_1,\ldots,\alpha_m\in\overline{\mathbb Q}$ が互いに相異なるとする。$a_1,\ldots,a_m\in\mathbb Q$ に対し

$$
\sum_{j=1}^m a_je^{\alpha_j}=0
$$

> ならば $a_1=\cdots=a_m=0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

零でない係数だけに整理した関係を仮定し、共通分母を払います。[TRN12の対称化](../TRN12/index.md#prop-trn12-rational-symmetric-reduction)で得た指数集合を固定し、[TRN13の算術下界](../TRN13/index.md#thm-trn13-arithmetic-norm)と[解析上界](../TRN13/index.md#thm-trn13-uniform-error)を**同じ素数**に対して適用します。素数を選ぶより前に、除外整数と誤差定数を固定することが鍵です。

<!-- proof-start -->
### 証明

逆に零でない係数があると仮定します。係数0の項を削除して指数の相異なる有限集合を残し、全係数の分母の最小公倍数を掛けます。こうして $a_j\in\mathbb Z\setminus\{0\}$ としたまま指数関係を得ます。$m=1$ の場合は $a_1e^{\alpha_1}\ne0$（複素指数関数は零を取らない）で直ちに矛盾するので、以下 $m\ge2$ としてよいです。

[対称化命題](../TRN12/index.md#prop-trn12-rational-symmetric-reduction)をこの関係に適用します。有限Galois拡大 $K/\mathbb Q$、$G=\operatorname{Gal}(K/\mathbb Q)$、有限集合 $T\subset K$、整数 $c_t$ が得られ、

$$
0\in T,\quad |T|\ge2,\quad c_0>0,\quad
c_t\in\mathbb Z\setminus\{0\},
$$

$$
\sigma(T)=T,\quad c_{\sigma(t)}=c_t,\qquad
\sum_{t\in T}c_te^t=0.
$$

[共通分母消去](../TRN2/index.md#lem-trn2-denominator-clearing)により $Dt$ がすべて代数的整数になる正整数 $D$ を固定します。以後 $K,T,c_t,D$ は変化させません。[TRN13の構成](../TRN13/index.md#def-trn13-indexed-auxiliary)を特別点 $a=0$ に適用します。$\Delta_0=\prod_{t\ne0}(0-Dt)\ne0$ とおくと、[非零整数の定理](../TRN13/index.md#thm-trn13-arithmetic-norm)の除外整数は

$$
E_0=c_0D\,N_{K/\mathbb Q}(\Delta_0)
\in\mathbb Z\setminus\{0\}.
$$

$E_0$ の素因子は有限個です。任意の素数 $p\nmid E_0$ について同定理は

$$
B_{p,0}=N_{K/\mathbb Q}(A_{p,0})
\in\mathbb Z\setminus\{0\},
\qquad 1\le |B_{p,0}|
$$

を与えます。一方、[一様誤差上界](../TRN13/index.md#thm-trn13-uniform-error)は、$d=[K:\mathbb Q]$ および $p$ と無関係な $B\ge1,C>0$ を用いて

$$
|B_{p,0}|
\le\left(\frac{CB^p}{(p-1)!}\right)^d
$$

を与えます。$v_p=B^p/(p-1)!$ と置けば

$$
\frac{v_{p+1}}{v_p}=\frac Bp
$$

です。$p\ge2B$ となる整数以降は $v_{p+1}\le v_p/2$ なので $v_p\to0$。従って十分大きい整数 $p$ では $(Cv_p)^d<1$ です。素数は無限にあり、有限個の $E_0$ の素因子を除いても任意に大きい素数が残ります。そのうち上の不等式も満たす $p$ を選ぶと

$$
1\le |B_{p,0}|
\le (Cv_p)^d<1
$$

となり矛盾します。従って零でない有理係数の関係は存在しません。$\square$
<!-- proof-end -->

### この定理が言わないこと

有理係数版は、例えば $e^0=1$ と $e^1=e$ の間に零でない**有理一次関係**がないことを保証します。しかし係数 $-e$ は代数的数でないため、この例そのものは係数拡大の可否を判定しません。また、有理一次独立性だけから任意の代数的係数に対する結論を導くのは、冒頭の $1,\sqrt2$ の反例が示すように論理的に誤りです。次は、より強い多項式関係の不存在を作ります。

## 2. 指数の一次独立性から値の代数的独立性へ

$\gamma_1,\ldots,\gamma_r$ が $\mathbb Q$ 上一次独立であるとは、有理数 $q_i$ に対する $\sum_iq_i\gamma_i=0$ が全 $q_i=0$ を強制することです。指数関数では単項式の積が指数の和になります。これを利用すると、異なる単項式を異なる指数へ対応させられます。

そこで複数の数を非零多項式へ代入しても値が0にならない性質を考えます。一次独立性が禁じるのは次数1の関係ですが、ここでは次数に制限なく多項式による関係を禁じます。この考えは、[代数的独立の一般的な定義](../../AG/AG1-06/index.md#def-ag1-06-algebraic-independence)を数の族に適用するものです。一般の定義の評価写像で $A=\mathbb C$、係数体 $k=L$ と置きます。具体的には、係数を変えずに変数へ $y_i$ を代入する写像

$
\operatorname{ev}_y:L[Y_1,\ldots,Y_r]\longrightarrow\mathbb C,
\qquad P\longmapsto P(y_1,\ldots,y_r)
$

を考えます。この写像の核は $\{P\in L[Y_1,\ldots,Y_r]:P(y)=0\}$ です。従って、評価写像が単射であることと、**0以外のどの多項式も代入で0にならないこと**が同値です。次の定義ではこの同値な判定条件を用います。

<a id="def-trn14-algebraic-independence"></a>

<!-- formal-statement-start -->
> **定義（体上の代数的独立性）**  
> 部分体 $L\subset\mathbb C$ と数 $y_1,\ldots,y_r\in\mathbb C$ を取る。$y_1,\ldots,y_r$ が $L$ 上**代数的独立**であるとは、各添字ベクトル $\nu=(\nu_1,\ldots,\nu_r)\in\mathbb Z_{\ge0}^r$ のうち有限個だけを用いた非零多項式

$$
P(Y_1,\ldots,Y_r)
=\sum_{\nu}b_\nu Y_1^{\nu_1}\cdots Y_r^{\nu_r}
\in L[Y_1,\ldots,Y_r]\setminus\{0\}
$$

> がすべて $P(y_1,\ldots,y_r)\ne0$ を満たすことである。ここで「非零」とは少なくとも一つの係数 $b_\nu$ が0でないことを意味する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-trn14-algebraic-independence -->
**定義の確認**：一次独立との相違

$y_1=2$ とすると、$Y_1-2\in\mathbb Q[Y_1]$ は係数1が非零で、$P(2)=0$ です。よって $2$ は $\mathbb Q$ 上代数的独立ではありません。一方、$\gamma$ が非零なら $\gamma$ 一つの族は $\mathbb Q$ 上一次独立です。例えば $\gamma=1$ に対して $q\gamma=0$ は $q=0$ だけを許します。この二つの定義がまったく異なる条件を検査していることが分かります。

**成立する直接例**として $y_1=e$ を $\mathbb Q$ 上で確認します。任意の非零多項式 $P(Y)=\sum_{k\in S}b_kY^k\in\mathbb Q[Y]$ を取り、$S\subset\mathbb Z_{\ge0}$ は非零係数だけの有限非空集合とします。代入すると

$
P(e)=\sum_{k\in S}b_ke^k.
$

添字 $k$ は相異なる代数的数（整数）で、$b_k$ はすべて非零有理数です。[有理係数版の定理](#thm-trn14-rational-lw)により、この和は0にはなりません。$P$ を任意に取ったので、定義の「すべての非零多項式」という量化条件まで確認でき、$e$ は $\mathbb Q$ 上代数的独立です。
<!-- definition-example-end -->

<a id="thm-trn14-exp-algebraic-independent-q"></a>

<!-- formal-statement-start -->
> **定理（有理一次独立な代数的指数の像の代数的独立性）**  
> $r\ge1$、$\gamma_1,\ldots,\gamma_r\in\overline{\mathbb Q}$ が $\mathbb Q$ 上一次独立であるとする。このとき

$$
e^{\gamma_1},\ldots,e^{\gamma_r}
$$

> は $\mathbb Q$ 上代数的独立である。
<!-- formal-statement-end -->

### 証明の見取り図

多項式の各単項式 $Y^\nu$ を代入すると $e^{\sum_i\nu_i\gamma_i}$ になります。異なる指数ベクトル $\nu\ne\mu$ から同じ指数が出たとすると、整数係数の一次関係 $\sum_i(\nu_i-\mu_i)\gamma_i=0$ が生じるので仮定に反します。したがって[有理係数版](#thm-trn14-rational-lw)を項ごとに適用できます。

<!-- proof-start -->
### 証明

$P=\sum_{\nu\in S}b_\nu Y_1^{\nu_1}\cdots Y_r^{\nu_r}\in\mathbb Q[Y_1,\ldots,Y_r]\setminus\{0\}$ を取り、$S$ は係数 $b_\nu\ne0$ の添字ベクトルだけからなる有限非空集合とします。$y_i=e^{\gamma_i}$ とおきます。[複素指数関数の基本性質](../../../解析系/CA/CA1/index.md#thm-ca1-complex-exponential)から

$$
\prod_{i=1}^r y_i^{\nu_i}
=\prod_{i=1}^r e^{\nu_i\gamma_i}
=e^{\lambda_\nu},
\qquad \lambda_\nu:=\sum_{i=1}^r\nu_i\gamma_i.
$$

$\nu\ne\mu$ で $\lambda_\nu=\lambda_\mu$ と仮定すると

$$
0=\lambda_\nu-\lambda_\mu
=\sum_{i=1}^r(\nu_i-\mu_i)\gamma_i.
$$

整数は有理数なので $\mathbb Q$ 上の一次独立性から各 $\nu_i-\mu_i=0$ が従い、$\nu=\mu$ となって矛盾します。各 $\lambda_\nu$ は代数的数です。したがって相異なる代数的指数への[有理係数版](#thm-trn14-rational-lw)を適用して

$$
P(y_1,\ldots,y_r)
=\sum_{\nu\in S}b_\nu e^{\lambda_\nu}\ne0
$$

を得ます。$P$ は任意の非零多項式だったので、定義通り代数的独立です。$\square$
<!-- proof-end -->

### 例：多項式の単項式と指数の対応

$\gamma_1=1$、$\gamma_2=\sqrt2$ は $\mathbb Q$ 上一次独立です。実際 $q_1+q_2\sqrt2=0$ で $q_2\ne0$ なら $\sqrt2=-q_1/q_2$ が有理数となってしまうからです。$P(Y_1,Y_2)=3Y_1^2Y_2-5Y_2^3+7$ を代入すると

$$
P(e,e^{\sqrt2})
=3e^{2+\sqrt2}-5e^{3\sqrt2}+7e^0.
$$

指数ベクトルは $(2,1),(0,3),(0,0)$ で異なります。$2+\sqrt2=3\sqrt2$ なら $\sqrt2=1$、$2+\sqrt2=0$ なら $\sqrt2=-2$ と矛盾します。一般のベクトルに対しても同じ一次独立性の議論が働き、[有理係数版](#thm-trn14-rational-lw)はこの値が0でないことを保証します。

逆に $\gamma_1=1,\gamma_2=2$ は一次従属で、$e^{\gamma_2}=(e^{\gamma_1})^2$ なので $Y_2-Y_1^2$ が消えます。指数の一次独立性は飾りではありません。

## 3. 多項式ノルムで係数体を拡大する

前節の定理は $\mathbb Q$ 係数の多項式を禁止しました。しかし最終目標には代数的係数が必要です。各係数は有限個なので、それらを同時に含む有限Galois拡大 $K/\mathbb Q$ を選べます。この $K$ のGalois群により、**多項式の係数だけ**を共役に取り、全共役を掛けると有理係数の非零多項式ができます。

多項式の共役を定義する際、変数は動かさないことを確認します。$P=\sum_\nu b_\nu Y^\nu$ に対し、$\sigma(P)=\sum_\nu\sigma(b_\nu)Y^\nu$ です。代入値 $y_i$ が $K$ に属する必要はなく、$\sigma(y_i)$ という記号はこの操作に登場しません。

<a id="lem-trn14-polynomial-norm"></a>

<!-- formal-statement-start -->
> **補題（係数体の有限共役積）**  
> $r\ge1$、$K/\mathbb Q$ が有限Galois拡大、$G=\operatorname{Gal}(K/\mathbb Q)$ とする。非零多項式 $P\in K[Y_1,\ldots,Y_r]$ に対して

$$
N_K(P):=\prod_{\sigma\in G}\sigma(P)
\in\mathbb Q[Y_1,\ldots,Y_r]\setminus\{0\}
$$

> となる。さらに任意の $(y_1,\ldots,y_r)\in\mathbb C^r$ について、$P(y_1,\ldots,y_r)=0$ なら $N_K(P)(y_1,\ldots,y_r)=0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

積の**非零性**、係数の**有理性**、代入後の**消失**は別々に確認します。非零性には多項式環が整域であること、有理性にはGalois群の固定体が $\mathbb Q$ であること、消失には恒等自己同型の因子が0であることを使います。

<!-- proof-start -->
### 証明

各 $\sigma$ は $K$ の体自己同型なので、$P$ に0でない係数 $b_\nu$ があれば $\sigma(b_\nu)\ne0$ です。従って $\sigma(P)\ne0$ です。また $K[Y_1,\ldots,Y_r]$ は整域です。これを確かめるには、$r=1$ では二つの非零多項式の最高次係数の積が0にならず、$r$ 変数では $K[Y_1,\ldots,Y_{r-1}]$ を係数環とする一変数多項式へ帰納すればよいです。よって有限個の非零多項式の積 $N_K(P)$ も非零です。

$\tau\in G$ が $N_K(P)$ の係数へ作用すると、係数共役が積を保つため

$$
\tau(N_K(P))
=\prod_{\sigma\in G}(\tau\sigma)(P)
=\prod_{\rho\in G}\rho(P)
=N_K(P).
$$

二つ目の等号で $\sigma\mapsto\tau\sigma$ が $G$ の置換であることを使いました。従って各係数は固定体 $K^G$ に属し、[有限Galois理論の基本定理](../../FLD/FLD4/index.md#thm-fld4-fundamental-galois)から $K^G=\mathbb Q$ です。よって $N_K(P)\in\mathbb Q[Y_1,\ldots,Y_r]$ です。

最後に代入写像は積を保つので

$$
N_K(P)(y)
=\prod_{\sigma\in G}\sigma(P)(y).
$$

右辺のうち $\sigma=\mathrm{id}$ の因子は $P(y)=0$ であるため、積全体が0です。他の因子の値を計算する必要はありません。$\square$
<!-- proof-end -->

**具体例：二次体で係数を消す**

$K=\mathbb Q(\sqrt2)$、$P(Y)=Y-\sqrt2$ とします。非自明な共役 $\sigma$ は $\sqrt2$ を $-\sqrt2$ に替え、$Y$ はそのままです。従って

$$
N_K(P)=(Y-\sqrt2)(Y+\sqrt2)=Y^2-2
\in\mathbb Q[Y]\setminus\{0\}.
$$

$y=\sqrt2$ なら $P(y)=0$、$N_K(P)(y)=0$ も成り立ちます。一方、$y=e$ に $\sigma$ を作用させる必要はありません。あくまで係数の共役である点を区別します。

<a id="thm-trn14-exp-algebraic-independent-qbar"></a>

<!-- formal-statement-start -->
> **定理（代数的係数に対する代数的独立性）**  
> $r\ge1$、$\gamma_1,\ldots,\gamma_r\in\overline{\mathbb Q}$ が $\mathbb Q$ 上一次独立なら、$e^{\gamma_1},\ldots,e^{\gamma_r}$ は $\overline{\mathbb Q}$ 上代数的独立である。
<!-- formal-statement-end -->

### 証明の見取り図

代数的係数の多項式が0になると仮定し、係数を含む有限Galois拡大を取り、その多項式ノルムを作ります。これは非零の有理係数多項式なのに同じ点で0になるので、前節の代数的独立性に反します。

<!-- proof-start -->
### 証明

$y_i=e^{\gamma_i}$ とします。もし非零 $P=\sum_{\nu\in S}b_\nu Y^\nu\in\overline{\mathbb Q}[Y_1,\ldots,Y_r]$ が $P(y)=0$ を満たすなら、有限個の代数的係数 $b_\nu$ をすべて含む有限Galois拡大 $K/\mathbb Q$ を選べます。具体的には各 $b_\nu$ の有理係数最小多項式の分解体を合成した体を $K$ とします。$P\in K[Y_1,\ldots,Y_r]\setminus\{0\}$ です。

[係数体の有限共役積](#lem-trn14-polynomial-norm)を適用すると

$$
Q(Y)=N_K(P)(Y)
\in\mathbb Q[Y_1,\ldots,Y_r]\setminus\{0\},
\qquad Q(y)=0
$$

が得られます。しかし $y_1,\ldots,y_r$ は[有理係数での代数的独立性](#thm-trn14-exp-algebraic-independent-q)を満たすので、非零の有理係数多項式 $Q$ は $Q(y)\ne0$ のはずです。矛盾します。$\square$
<!-- proof-end -->

ここでは $e^{\gamma_i}$ の数論的な共役を扱っていません。多項式 $P$ の係数についてのみ共役を取り、**同じ点** $y=(e^{\gamma_1},\ldots,e^{\gamma_r})$ へすべての因子を代入しました。

## 4. 一般の相異なる代数的指数を整数ベクトルで表す

最後は、最初から指数 $\alpha_j$ が有理一次独立である必要はないことを処理します。有限集合 $\{\alpha_j\}$ の $\mathbb Q$ 線形包は有限次元ですから、その基底を選び、分母を一度に払えば整数係数の指数ベクトルで表せます。

<a id="lem-trn14-integer-coordinates"></a>

<!-- formal-statement-start -->
> **補題（有限個の代数的指数の整数座標）**  
> 互いに相異なる $\alpha_1,\ldots,\alpha_m\in\overline{\mathbb Q}$（$m\ge1$）を取る。全てが0の場合は $r=0$ とする。それ以外の場合、$r\ge1$ と、$\mathbb Q$ 上一次独立な $\gamma_1,\ldots,\gamma_r\in\overline{\mathbb Q}$ および相異なるベクトル $n_j=(n_{j1},\ldots,n_{jr})\in\mathbb Z^r$ を選んで

$$
\alpha_j=\sum_{i=1}^r n_{ji}\gamma_i
\qquad(j=1,\ldots,m)
$$

> と表せる。
<!-- formal-statement-end -->

### 証明の見取り図

有理基底による座標は最初は有理数です。全座標の分母の公倍数 $L$ で基底を割れば、座標は整数になります。基底を非零有理数倍しても一次独立性は変わりません。

<!-- proof-start -->
### 証明

$V=\operatorname{span}_{\mathbb Q}\{\alpha_1,\ldots,\alpha_m\}$ とします。$V=\{0\}$ のとき相異なる指数は一つしかなく、$m=1,\alpha_1=0$ です。この場合 $r=0$ の空和で表せます。

$V\ne\{0\}$ のとき、有限次元 $\mathbb Q$ ベクトル空間 $V$ の基底 $\beta_1,\ldots,\beta_r$ を取ります。$V$ は代数的数の有理線形結合で構成されるので、各 $\beta_i$ も代数的です。各 $\alpha_j$ の唯一の基底表示を

$$
\alpha_j=\sum_{i=1}^r q_{ji}\beta_i,
\qquad q_{ji}\in\mathbb Q
$$

とします。有限個の $q_{ji}$ を既約分数で書き、分母の公倍数 $L\in\mathbb Z_{>0}$ を取れば $n_{ji}=Lq_{ji}\in\mathbb Z$ です。$\gamma_i=\beta_i/L$ と置くと

$$
\sum_i n_{ji}\gamma_i
=\sum_i (Lq_{ji})(\beta_i/L)
=\alpha_j.
$$

もし $\sum_i h_i\gamma_i=0$（$h_i\in\mathbb Q$）なら $\sum_i(h_i/L)\beta_i=0$ なので $h_i=0$ となります。また $n_j=n_k$ なら表示から $\alpha_j=\alpha_k$ です。元の指数は相異なるのでベクトルも相異なります。$\square$
<!-- proof-end -->

### 例：分母を払うと指数ベクトルが見える

$\alpha_1=0,\ \alpha_2=1/2,\ \alpha_3=\sqrt2/3$ を考えます。基底を $\beta_1=1,\ \beta_2=\sqrt2$ とすれば、座標は $(0,0),(1/2,0),(0,1/3)$ です。$L=6$ として $\gamma_1=1/6,\ \gamma_2=\sqrt2/6$ と置けば

$$
(n_1,n_2,n_3)=((0,0),(3,0),(0,2)).
$$

$\gamma_1,\gamma_2$ は $\mathbb Q$ 上一次独立です。$y_1=e^{\gamma_1}$、$y_2=e^{\gamma_2}$ により、指数関数値は $1,y_1^3,y_2^2$ です。整数ベクトルが異なるので、この三つは異なる単項式に対応します。各 $\alpha_j$ の値 $e^{\alpha_j}$ 自体が代数的であるとは主張していません。

<a id="thm-trn14-lindemann-weierstrass"></a>

<!-- formal-statement-start -->
> **定理（Lindemann–Weierstrassの定理：代数的係数版）**  
> $m\ge1$、$\alpha_1,\ldots,\alpha_m\in\overline{\mathbb Q}$ は互いに相異なるとする。このとき $e^{\alpha_1},\ldots,e^{\alpha_m}$ は $\overline{\mathbb Q}$ 上一次独立である。すなわち $\beta_1,\ldots,\beta_m\in\overline{\mathbb Q}$ について

$$
\sum_{j=1}^m\beta_je^{\alpha_j}=0
\quad\Longrightarrow\quad
\beta_1=\cdots=\beta_m=0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

[整数座標の補題](#lem-trn14-integer-coordinates)で $e^{\alpha_j}$ を、代数的独立な値 $y_i=e^{\gamma_i}$ のLaurent単項式（負整数冪も許す単項式）として表します。有限個の負冪を共通の単項式で払えば、零関係は非零の**通常の多項式**関係になります。異なる指数ベクトルから異なる単項式が生じるため、多項式は非零です。

<!-- proof-start -->
### 証明

仮に $\sum_j\beta_je^{\alpha_j}=0$ で、少なくとも一つの $\beta_j$ が非零とします。指数 $\alpha_j$ は相異なるので、[整数座標の補題](#lem-trn14-integer-coordinates)から $\mathbb Q$ 上一次独立な代数的数 $\gamma_i$ と、互いに相異なる整数ベクトル $n_j$ を選べます。

$r=0$ の場合は $m=1,\alpha_1=0$ であり、関係式は $\beta_1e^0=\beta_1=0$ となるので、非零係数の仮定に反します。従って $r\ge1$ とします。

$y_i=e^{\gamma_i}$ とおけば、[複素指数関数の基本性質](../../../解析系/CA/CA1/index.md#thm-ca1-complex-exponential)と $e^{-\gamma_i}e^{\gamma_i}=1$ から、負冪も含めて

$$
e^{\alpha_j}
=e^{\sum_i n_{ji}\gamma_i}
=\prod_{i=1}^r y_i^{n_{ji}},
\qquad y_i\ne0.
$$

$M_i=\max\{0,-n_{1i},\ldots,-n_{mi}\}\in\mathbb Z_{\ge0}$ と置きます。元の関係式に非零な $\prod_i y_i^{M_i}$ を掛けると

$$
0=\sum_{j=1}^m\beta_j
\prod_{i=1}^r y_i^{n_{ji}+M_i}
=P(y_1,\ldots,y_r),
$$

$$
P(Y_1,\ldots,Y_r)
:=\sum_{j=1}^m\beta_j
\prod_{i=1}^r Y_i^{n_{ji}+M_i}
\in\overline{\mathbb Q}[Y_1,\ldots,Y_r].
$$

すべての指数 $n_{ji}+M_i$ は非負整数なので $P$ は通常の多項式です。また $n_j\ne n_k$ なら $n_j+M\ne n_k+M$ で、各項は異なる単項式です。従って係数の相殺は起こらず、少なくとも一つの $\beta_j\ne0$ から $P\ne0$ です。しかし[代数的係数上の代数的独立性](#thm-trn14-exp-algebraic-independent-qbar)により $P(y)\ne0$ のはずで、矛盾します。$\square$
<!-- proof-end -->

### 負冪を払う小さな例

$\alpha_1=-\gamma,\ \alpha_2=0,\ \alpha_3=2\gamma$（$0\ne\gamma\in\overline{\mathbb Q}$）の関係を仮定すると、$y=e^\gamma\ne0$ として

$$
\beta_1y^{-1}+\beta_2+\beta_3y^2=0
$$

です。最小の指数が $-1$ なので $y$ を掛け、

$$
\beta_1+\beta_2y+\beta_3y^3=0
$$

に直します。指数 $0,1,3$ は相異なるので、多項式 $\beta_1+\beta_2Y+\beta_3Y^3$ は、係数が少なくとも一つ非零なら非零です。ここで使う[代数的独立性](#thm-trn14-exp-algebraic-independent-qbar)は $\gamma\ne0$、すなわち一つの指数 $\gamma$ の有理一次独立性を必要とします。

## 5. 帰結と仮定の境界

一般の定理は、前に得た結果をまとめて導けます。ただし対数は枝を指定せず、「$e^w=a$ を満たす値」という条件で述べるのが最も正確です。

<a id="cor-trn14-transcendental-exponentials"></a>

<!-- formal-statement-start -->
> **系（非零代数的指数の像と円周率）**  
> (i) $\alpha\in\overline{\mathbb Q}\setminus\{0\}$ なら $e^\alpha$ は超越数である。  
> (ii) 円周率 $\pi$ は超越数である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

(i) [代数的係数版](#thm-trn14-lindemann-weierstrass)を相異なる指数 $0,\alpha$ に適用します。もし $e^\alpha=b\in\overline{\mathbb Q}$ なら

$$
(-b)e^0+1\cdot e^\alpha=0
$$

は二つの係数のうち1が非零である代数的係数関係となり矛盾します。

(ii) [複素指数関数の基本性質](../../../解析系/CA/CA1/index.md#thm-ca1-complex-exponential)のEuler表示を実数の円周率に適用すると

$$
e^{i\pi}=\cos\pi+i\sin\pi=-1
$$

です。もし $\pi$ が代数的なら、代数的な $i$ との積も代数的です。また $\pi>0$ よりこの積は零ではないので

$$
i\pi\in\overline{\mathbb Q}\setminus\{0\}.
$$

従って (i) は $e^{i\pi}$ が超越数であることを要求します。一方、実際の値 $-1$ は有理数なので矛盾します。この帰結は[TRN11の円周率の超越性](../TRN11/index.md#cor-trn11-pi-transcendental)を別経路で再確認します。$\square$
<!-- proof-end -->

<a id="cor-trn14-algebraic-logarithms"></a>

<!-- formal-statement-start -->
> **系（代数的数の複素対数値）**  
> $a\in\overline{\mathbb Q}\setminus\{0,1\}$ とし、$w\in\mathbb C$ が $e^w=a$ を満たすとする。このとき、どの対数の枝から得た $w$ であっても $w$ は超越数である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$e^0=1\ne a$ なので $w\ne0$ です。仮に $w\in\overline{\mathbb Q}$ なら、[前の系](#cor-trn14-transcendental-exponentials)の (i) により $e^w$ は超越数です。しかし $e^w=a$ は代数的数なので矛盾します。$a=0$ は複素指数関数が零を取らず対数値を持ちません。$a=1$ では $w=0$ が代数的な反例です。$\square$
<!-- proof-end -->

この二系は[TRN11の既出の帰結](../TRN11/index.md#cor-trn11-algebraic-logarithms)とも整合します。重要な追加成果は、$r$ 個の $\mathbb Q$ 上一次独立な代数的指数の像が、[代数的係数上でも多項式関係を持たない](#thm-trn14-exp-algebraic-independent-qbar)という強い主張です。相異なる指数の**線形**独立性と、基底を選んだときの**代数的**独立性は、異なる量化条件のもとで使い分けます。

## 6. 演習

### Level A：定義と指数ベクトルを確認する

**TRN14-A1（代数的独立性の定義）**  
$y_1=\sqrt2,\ y_2=3$ とする。$y_1,y_2$ が $\mathbb Q$ 上代数的独立でないことを、非零多項式二つでそれぞれ確認せよ。また $1,\sqrt2$ が $\mathbb Q$ 上一次独立であることを示せ。

- Level: A

<!-- solution-start -->
**詳細解答**

$P_1(Y_1,Y_2)=Y_1^2-2$ は $Y_1^2$ の係数が1なので非零で、$P_1(\sqrt2,3)=2-2=0$ です。$P_2(Y_1,Y_2)=Y_2-3$ も非零で、代入値は $3-3=0$ です。一つでも非零多項式が0になれば[定義](#def-trn14-algebraic-independence)は失われます。一次独立性については $q_1+q_2\sqrt2=0$（$q_i\in\mathbb Q$）とし、$q_2\ne0$ なら $\sqrt2=-q_1/q_2\in\mathbb Q$ となる矛盾が生じます。従って $q_2=0$、さらに $q_1=0$ です。
<!-- solution-end -->

**TRN14-A2（単項式を指数へ戻す）**  
$\gamma_1=1,\gamma_2=\sqrt2$ とし、$P(Y_1,Y_2)=4Y_1Y_2^2-2Y_1^3+5$ とする。$P(e^{\gamma_1},e^{\gamma_2})$ を三項の指数和にし、指数の相異性を検査せよ。

- Level: A

<!-- solution-start -->
**詳細解答**

[加法公式](../../../解析系/CA/CA1/index.md#thm-ca1-complex-exponential)により $Y_1Y_2^2$ の値は $e^{1+2\sqrt2}$、$Y_1^3$ は $e^3$、定数項は $e^0$ です。よって

$$
P(e,e^{\sqrt2})=4e^{1+2\sqrt2}-2e^3+5e^0.
$$

指数が等しいとすれば $1+2\sqrt2=3$ は $\sqrt2=1$、$1+2\sqrt2=0$ は $\sqrt2=-1/2$、$3=0$ は偽となり、すべて矛盾します。[有理係数版](#thm-trn14-rational-lw)を適用でき、この値は非零です。
<!-- solution-end -->

**TRN14-A3（二指数の整数座標）**  
$\alpha_1=1/2,\alpha_2=\sqrt2/3$ を一つの有理一次独立な基底で整数座標表示し、対応する指数単項式を記せ。

- Level: A

<!-- solution-start -->
**詳細解答**

$\beta_1=1,\beta_2=\sqrt2$ を基底に取れば $\alpha_1=(1/2)\beta_1+0\beta_2$、$\alpha_2=0\beta_1+(1/3)\beta_2$ です。分母の公倍数 $L=6$ を選び $\gamma_1=1/6,\gamma_2=\sqrt2/6$ とすると

$$
\alpha_1=3\gamma_1+0\gamma_2,\qquad
\alpha_2=0\gamma_1+2\gamma_2.
$$

$\gamma_1,\gamma_2$ は $\mathbb Q$ 上一次独立で、$y_i=e^{\gamma_i}$ と置けば $e^{\alpha_1}=y_1^3$、$e^{\alpha_2}=y_2^2$ です。ベクトル $(3,0)$ と $(0,2)$ は異なります。
<!-- solution-end -->

**TRN14-A4（負冪の共通除去）**  
$\alpha_1=-2\gamma_1+\gamma_2$、$\alpha_2=\gamma_1-3\gamma_2$、$\alpha_3=0$ とし、$y_i=e^{\gamma_i}$ とする。$\sum_{j=1}^3b_je^{\alpha_j}$ をLaurent多項式とみなし、全負冪を除去する最小の非負座標ベクトル $M$ と通常の多項式を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答**

指数ベクトルは $(-2,1),(1,-3),(0,0)$ です。第一座標の最小値は $-2$、第二座標の最小値は $-3$ なので $M=(2,3)$ です。各ベクトルへ加えると $(0,4),(3,0),(2,3)$ となり、

$$
y_1^2y_2^3\sum_{j=1}^3b_je^{\alpha_j}
=b_1y_2^4+b_2y_1^3+b_3y_1^2y_2^3.
$$

従って $P(Y_1,Y_2)=b_1Y_2^4+b_2Y_1^3+b_3Y_1^2Y_2^3$ です。もし少なくとも一つの $b_j$ が非零なら、三つの単項式が相異なるため $P$ は非零です。
<!-- solution-end -->

### Level B：係数の共役と論理の橋を作る

**TRN14-B1（二次体の多項式ノルム）**  
$K=\mathbb Q(\sqrt2)$、$P(Y)=Y^2+\sqrt2Y+1$ とする。$N_K(P)$ を計算し、$P(y)=0$ なら $N_K(P)(y)=0$ を説明せよ。

- Level: B

<!-- solution-start -->
**詳細解答**

非自明な共役では $\sqrt2$ が $-\sqrt2$ に替わり、$\sigma(P)(Y)=Y^2-\sqrt2Y+1$ です。従って

$$
\begin{aligned}
N_K(P)(Y)
&=(Y^2+\sqrt2Y+1)(Y^2-\sqrt2Y+1)\\
&=(Y^2+1)^2-2Y^2\\
&=Y^4+1.
\end{aligned}
$$

最高次係数が1で非零、有理係数です。$P(y)=0$ なら $N_K(P)(y)=P(y)\sigma(P)(y)=0$ となります。$y$ を共役で動かしていない点が重要です。
<!-- solution-end -->

**TRN14-B2（係数拡大に必要な仮定）**  
数 $y_1,\ldots,y_r$ が $\mathbb Q$ 上代数的独立であるとする。非零 $P\in\mathbb Q(\sqrt3)[Y_1,\ldots,Y_r]$ に対して $P(y)=0$ と仮定し、積 $P(Y)\sigma(P)(Y)$ を用いた矛盾を示せ。

- Level: B

<!-- solution-start -->
**詳細解答**

$K=\mathbb Q(\sqrt3)$、$\sigma(\sqrt3)=-\sqrt3$ とします。非零な $P$ の少なくとも一つの係数 $b_\nu$ は非零なので $\sigma(b_\nu)\ne0$、従って $\sigma(P)\ne0$ です。多項式環 $K[Y_1,\ldots,Y_r]$ は整域だから $Q=P\sigma(P)\ne0$ です。$\sigma(Q)=\sigma(P)P=Q$ より係数は $K^\sigma=\mathbb Q$ に属します。一方 $Q(y)=P(y)\sigma(P)(y)=0$ です。これは $y_i$ の $\mathbb Q$ 上代数的独立性に反します。
<!-- solution-end -->

**TRN14-B3（有理係数版の素数選択）**  
[TRN13の記号](../TRN13/index.md#thm-trn13-arithmetic-norm)で $E_0\in\mathbb Z\setminus\{0\}$、$B\ge1,C>0,d\ge1$ を固定する。十分大きい素数 $p$ で $p\nmid E_0$ かつ $(CB^p/(p-1)!)^d<1$ を同時に満たせることを示せ。

- Level: B

<!-- solution-start -->
**詳細解答**

$v_k=B^k/(k-1)!$ と置くと $v_{k+1}/v_k=B/k$ です。整数 $k\ge\max\{2,\lceil 2B\rceil\}$ なら比は $1/2$ 以下なので、その後は幾何級数型に減少して $v_k\to0$ です。従って整数 $N$ を選び、全 $k\ge N$ で $Cv_k<1$ とできます。$E_0$ の相異なる素因子は有限個であり、素数は無限にあるので、$p\ge N$ かつ $p\nmid E_0$ の素数を選べます。その $p$ について $d\ge1$ より $(Cv_p)^d<1$ です。除外整数を $p$ の後で定義してはいけません。
<!-- solution-end -->

**TRN14-B4（一次独立と代数的独立の非同値）**  
$\gamma_1=1,\gamma_2=2$ が $\mathbb Q$ 上一次従属であること、および $e^{\gamma_1},e^{\gamma_2}$ が $\mathbb Q$ 上代数的従属であることを直接示せ。また $e,e^2$ に対して[有理係数版](#thm-trn14-rational-lw)が禁じる関係と禁じない関係を区別せよ。

- Level: B

<!-- solution-start -->
**詳細解答**

$(-2)\gamma_1+1\gamma_2=-2+2=0$ は非自明な有理一次関係です。[複素指数関数の基本性質](../../../解析系/CA/CA1/index.md#thm-ca1-complex-exponential)により $e^2=e\cdot e$ なので

$$
P(Y_1,Y_2)=Y_2-Y_1^2
$$

は非零の有理係数多項式で、$P(e,e^2)=0$ です。従って代数的には従属です。しかし指数 $1,2$ は相異なるため、有理係数版は $a_1e+a_2e^2=0$ なら $a_1=a_2=0$ と主張します。$e^2-e\cdot e=0$ は係数が一定の有理数からなる**一次**関係ではないので矛盾しません。
<!-- solution-end -->

### Level C：すべての段階を接続する

**TRN14-C1（一般係数版を三指数で組み立てる）**  
$\alpha_1=-1/2,\ \alpha_2=\sqrt2/3,\ \alpha_3=1/2$ とし、$\beta_j\in\overline{\mathbb Q}$ とする。$\sum_{j=1}^3\beta_je^{\alpha_j}=0$ が全 $\beta_j=0$ を強制することを、整数座標、負冪除去、係数体ノルムを用いて証明せよ。

- Level: C

<!-- solution-start -->
**詳細解答**

$\gamma_1=1/6,\gamma_2=\sqrt2/6$ とすれば、整数ベクトルは

$$
n_1=(-3,0),\quad n_2=(0,2),\quad n_3=(3,0).
$$

$\gamma_1,\gamma_2$ は $\mathbb Q$ 上一次独立です。$y_i=e^{\gamma_i}\ne0$ とすると、仮定の関係は

$$
\beta_1y_1^{-3}+\beta_2y_2^2+\beta_3y_1^3=0.
$$

$y_1^3$ を掛け、$P(Y_1,Y_2)=\beta_1+\beta_2Y_1^3Y_2^2+\beta_3Y_1^6$ と置きます。三つの添字ベクトル $(0,0),(3,2),(6,0)$ は異なるので、もし非零の $\beta_j$ があれば $P$ は非零多項式です。係数を含む有限Galois拡大 $K$ を選び、[係数体の共役積](#lem-trn14-polynomial-norm)により

$$
Q=\prod_{\sigma\in\operatorname{Gal}(K/\mathbb Q)}\sigma(P)
\in\mathbb Q[Y_1,Y_2]\setminus\{0\}
$$

を作ります。恒等自己同型の因子は $P(y_1,y_2)=0$ なので $Q(y_1,y_2)=0$ です。一方、[有理一次独立な代数的指数の像の代数的独立性](#thm-trn14-exp-algebraic-independent-q)から $y_1,y_2$ は $\mathbb Q$ 上代数的独立であり、$Q(y)\ne0$ のはずです。矛盾するため $\beta_1=\beta_2=\beta_3=0$ です。
<!-- solution-end -->

**TRN14-C2（証明の条件を逆向きに検査する）**  
(a) 相異なる指数の条件を捨てたときに一般係数版が偽になる反例を示せ。(b) 有理係数の一次独立性のみから代数的係数版へ飛ぶ議論の反例を示せ。(c) $a\in\overline{\mathbb Q}\setminus\{0,1\}$ と $e^w=a$ を満たす $w$ について、枝を固定しなくても $w$ が超越的である理由を示せ。

- Level: C

<!-- solution-start -->
**詳細解答**

(a) $\alpha_1=\alpha_2=0$ とすれば、$\beta_1=1,\beta_2=-1$ は零でない係数なのに $e^0-e^0=0$ です。整数座標にした際に指数ベクトルが重複し、二つの単項式が相殺するため、[主定理の証明](#thm-trn14-lindemann-weierstrass)の非零多項式性が崩れます。

(b) $1,\sqrt2$ は有理一次独立ですが、$(-\sqrt2)\cdot1+1\cdot\sqrt2=0$ は代数的係数の非自明な関係です。一次独立性そのものは係数体拡大に保たれません。本章では[より強い代数的独立性](#thm-trn14-exp-algebraic-independent-q)を先に証明し、[多項式ノルム](#lem-trn14-polynomial-norm)で係数体を拡大しました。

(c) $e^0=1\ne a$ より $w\ne0$ です。もし $w$ が代数的なら[超越性の系](#cor-trn14-transcendental-exponentials)から $e^w$ は超越的ですが、$a$ は代数的なので矛盾します。別の枝の値でも $e^w=a$ を満たす点と $w\ne0$ は変わらず、証明は同じです。$a=1$ では $w=0$ が反例、$a=0$ はそもそも指数関数の値として実現しないので除外されています。
<!-- solution-end -->

## 7. 証明の接続図

[有理指数関係の対称化](../TRN12/index.md#prop-trn12-rational-symmetric-reduction)から[算術下界](../TRN13/index.md#thm-trn13-arithmetic-norm)と[解析上界](../TRN13/index.md#thm-trn13-uniform-error)を対立させて、有理係数版を確立しました。次に、指数の一次独立性は単項式の相異性を保証し、指数関数値の有理係数上の代数的独立性を生みます。係数共役の多項式ノルムがこの独立性を代数的係数へ運び、最後に整数指数ベクトルと負冪除去が任意の相異なる指数へ戻します。

この順路では、係数体のGalois自己同型を指数関数値へ作用させる操作は一度も必要ありません。代数的整数の共役と指数関数の解析評価を混同しないことが、初章から最終章までの一貫した証明原則です。
