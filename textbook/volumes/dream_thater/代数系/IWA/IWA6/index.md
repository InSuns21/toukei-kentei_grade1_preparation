# IWA6 Weierstrass準備・特徴イデアル

[IWA5の構造定理](../IWA5/index.md#thm-iwa5-structure)は、有限生成torsion岩澤加群を素元の冪で記述しました。しかし「素元」とだけ書いても、どの元が素元で、何を数えればよいか分かりません。

本講の問いは、**無限に続く冪級数を有限次数の多項式へ整理し、加群の大きさを二つの整数で測れるか**です。[IWA3の冪級数表示](../IWA3/index.md#thm-iwa3-power-series-isomorphism)により、素数 $p$ と位相的生成元 $\gamma$ を固定すると

$$
R=\Lambda=\mathbb Z_p[[\Gamma]]\simeq\mathbb Z_p[[T]],
\qquad T=\gamma-1
$$

です。$R$ は整域であり、[IWA3の単元判定](../IWA3/index.md#prop-iwa3-augmentation)から、定数項が $p$ 進単元であることが $R$ の単元であることと同値です。以下では $p=2$ も含めた任意の素数を扱います。

## 1. 冪級数を二つの指数で測る

$p$ 進整数 $a\ne0$ の $p$ 進付値 $v_p(a)$ は $a=p^k u$（$u\in\mathbb Z_p^\times$）の指数 $k$ です。$v_p(0)=\infty$ と約束します。非零冪級数 $f(T)=\sum_{i\ge0}a_iT^i$ には、すべての係数に共通する $p$ の最大冪が一意に存在します。実際、有限値 $v_p(a_i)$ の集合は空でない非負整数の集合なので最小値があります。

$a_i$ のうち最初にその最小付値を達成する添字も一意に定まります。これを後に多項式の次数として読み替えます。

<a id="def-iwa6-orders"></a>

<!-- formal-statement-start -->
> **定義（係数付値とWeierstrass次数）**  
> $0\ne f=\sum_{i\ge0}a_iT^i\in R$ に対し、
>
> $$
> \mu(f)=\min_{i\ge0}v_p(a_i),\qquad
> d(f)=\min\{i\ge0:v_p(a_i)=\mu(f)\}
> $$
>
> と定める。$f=p^{\mu(f)}f_0$、$f_0=\sum_{i\ge0}b_iT^i$ と書くと、$d=d(f)$ に対して

$$
b_i\in p\mathbb Z_p\ (0\le i<d),\qquad
b_d\in\mathbb Z_p^\times
$$

> が成り立つ。零冪級数には $\mu,d$ を定義しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-iwa6-orders -->
**定義の確認。** $p=3$、$f=9(1+T)(T^2+3T+3)$ とします。積を展開すると

$$
f=9(T^3+4T^2+6T+3).
$$

係数の付値は定数項から順に $3,3,2,2$（$9\cdot6$ の付値は $3$）なので、$\mu(f)=2$、$d(f)=2$ です。$f/9\bmod3=T^2(1+T)$ も最初の非零次数が $2$ であることを示します。
<!-- definition-example-end -->

単元 $u$ は $u\bmod p$ の定数項が零でないので $\mu(u)=d(u)=0$ です。一方 $T$ は $\mu(T)=0$、$d(T)=1$、$p$ は $\mu(p)=1$、$d(p)=0$ です。$p$ で割る回数と多項式の次数を混同してはいけません。

<a id="prop-iwa6-order-additivity"></a>

<!-- formal-statement-start -->
> **命題（積での指数の加法性）**  
> $0\ne f,g\in R$ に対して
>
> $$
> \mu(fg)=\mu(f)+\mu(g),\qquad
> d(fg)=d(f)+d(g).
> $$
<!-- formal-statement-end -->

### 証明の見取り図

共通の $p$ 冪を取り除き、法 $p$ の冪級数環 $\mathbb F_p[[T]]$ で最初に非零になる係数を掛けます。

<!-- proof-start -->
### 証明

$f=p^a f_0$、$g=p^b g_0$ として $f_0,g_0$ の少なくとも一つの係数は単元とします。$\overline f_0,\overline g_0\in\mathbb F_p[[T]]$ は非零です。$\mathbb F_p[[T]]$ では非零級数の最低次数係数の積が非零なので $\overline f_0\overline g_0\ne0$。したがって $f_0g_0$ は $p$ で割り切れず、$\mu(fg)=a+b$ です。

$d(f)=r$、$d(g)=s$ とすると、$\overline f_0=T^r u(T)$、$\overline g_0=T^s v(T)$ で $u(0),v(0)\ne0$ です。積は $T^{r+s}u(T)v(T)$ となり、最低次数は $r+s$。従って $d(fg)=r+s$ です。
<!-- proof-end -->

## 2. distinguished多項式はどこが特別か

一般の冪級数を有限個の係数だけで扱うには、最高次係数が $1$ で、それ以下は $p$ の倍数という多項式を使います。この形なら法 $p$ でただの $T^d$ になります。

<a id="def-iwa6-distinguished"></a>

<!-- formal-statement-start -->
> **定義（distinguished多項式）**  
> 非負整数 $d$ に対し
>
> $$
> W(T)=T^d+c_{d-1}T^{d-1}+\cdots+c_0
> \quad(c_i\in p\mathbb Z_p)
> $$
>
> を次数 $d$ の **distinguished多項式**（Weierstrass多項式）という。$d=0$ では $W=1$ と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-iwa6-distinguished -->
**定義の確認。** $p=3$ のとき $W=T^2+3T+3$ は最高次係数が $1$、低次係数が $3$ の倍数なので次数 $2$ のdistinguished多項式です。$W\bmod3=T^2$ です。一方 $T^2+T+3$ は $T$ の係数が $3$ の倍数でないため該当しません。$T+3$ は次数 $1$ の例です。
<!-- definition-example-end -->

まず割り算を証明します。これは準備定理の核心であり、証明の途中で「収束」をただの形式的な極限として扱わないことが重要です。係数を $p^n$ で一斉に割り切れる差ができることを使います。

任意の $h\in R$ を

$$
h=L_d(h)+T^d H_d(h),\qquad
L_d(h)=\sum_{i<d}h_iT^i,\quad
H_d(h)=\sum_{j\ge0}h_{d+j}T^j
$$

と一意に分けます。$L_d$ は低次数部分、$H_d$ は高次数部分を $d$ だけずらしたものです。$d=0$ なら $L_0=0$、$H_0$ は恒等写像です。両作用素は $p^nR$ を $p^nR$ に送ります。

<a id="thm-iwa6-division"></a>

<!-- formal-statement-start -->
> **定理（Weierstrass除法）**  
> $f=\sum_{i\ge0}f_iT^i\in R$ が $d(f)=d$、$\mu(f)=0$ を満たすとする。任意の $g\in R$ に対して、一意な $q\in R$ と $r\in\mathbb Z_p[T]$、$\deg r<d$（$r=0$ も許す）が存在し、
>
> $$
> g=qf+r
> $$
>
> と表せる。
<!-- formal-statement-end -->

### 証明の見取り図

$f$ を $T^d$ に単元を掛けた部分と、$p$ の倍数の低次多項式に分けます。商 $q$ を近似する操作は、誤差を毎回少なくとも $p$ 倍だけ小さくします。

<!-- proof-start -->
### 証明

$f_d\in\mathbb Z_p^\times$、$f_i\in p\mathbb Z_p$（$i<d$）ですから、

$$
f=T^d a(T)+p b(T),\qquad
a(T)=\sum_{j\ge0}f_{d+j}T^j\in R^\times,\quad
b(T)=\sum_{i<d}\frac{f_i}{p}T^i
$$

と書けます。$a$ の定数項は $f_d$ なので単元です。

$g=qf+r$ の高次係数を比較すると

$$
q=a^{-1}H_d(g-pbq)
$$

が必要です。$q_0=0$ と置き、

$$
q_{n+1}=a^{-1}H_d(g-pbq_n)\qquad(n\ge0)
$$

を定めます。$q_1-q_0\in R=p^0R$ です。$q_n-q_{n-1}\in p^{n-1}R$ なら、$H_d$ が $p$ 冪の整除性を保つため、

$$
q_{n+1}-q_n
=-p\,a^{-1}H_d\bigl(b(q_n-q_{n-1})\bigr)\in p^nR.
$$

従って各係数の $p$ 進精度が段階ごとに一つずつ上がり、級数 $q=q_0+\sum_{n\ge0}(q_{n+1}-q_n)$ は $R$ に収束します。ここで $R$ の $p$ 進完備性は、$\mathbb Z_p$ の完備性に基づき、差が一様に $p^nR$ に入る係数列を極限に取れることです。極限に移ると商の方程式が成立します。

$r=L_d(g-pbq)$ と定めます。すると

$$
g-pbq=T^dH_d(g-pbq)+L_d(g-pbq)
=T^daq+r=qf+r
$$

であり、$r$ は次数 $d$ 未満です。

一意性は、$qf+r=0$ なら法 $p$ で $\overline q\,T^d\overline a+\overline r=0$ となることから示します。次数 $d$ 未満の $\overline r$ と $T^d$ 以上の項を比べると両方零で、$\overline a$ が単元なので $\overline q=0$ です。ゆえに $q,r$ は係数ごとに $p$ で割れます。元の等式を $p$ で割って同じ議論を繰り返すと $q,r\in\bigcap_{n\ge0}p^nR=0$ です。二つの表示の差に適用すれば一意性が従います。
<!-- proof-end -->

**小さな割り算。** $p=3$、$f=T+3$、$g=T^2$ とすれば

$$
T^2=(T-3)(T+3)+9
$$

です。余り $9$ は定数なので $\deg r<1$ を満たします。[除法定理](#thm-iwa6-division)によりこの商と余りは唯一です。係数環が $\mathbb Z_3$ であっても、余りが常に零とは限りません。

## 3. 無限級数から有限多項式へ

$f$ が非零であれば、先に $p^{\mu(f)}$ を取り除くと除法定理を適用できます。これにより無限級数の本質を有限次数のdistinguished多項式へ移せます。

<a id="thm-iwa6-preparation"></a>

<!-- formal-statement-start -->
> **定理（Weierstrass準備定理）**  
> 素数 $p$ と $R=\mathbb Z_p[[T]]$ を固定する。非零元 $f\in R$ は一意に
>
> $$
> f(T)=p^{\mu}U(T)W(T)
> $$
>
> と表せる。ただし $\mu\ge0$、$U\in R^\times$、$W\in\mathbb Z_p[T]$ はdistinguished多項式である。しかも $\mu=\mu(f)$、$\deg W=d(f)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

[除法定理](#thm-iwa6-division)で $T^d$ を $f_0=f/p^\mu$ で割ります。商が単元、余りが $p$ の倍数と分かれば、式を解くだけで準備できます。

<!-- proof-start -->
### 証明

$\mu=\mu(f)$、$f_0=p^{-\mu}f$、$d=d(f)$ とし、[除法定理](#thm-iwa6-division)から

$$
T^d=q f_0+r,\qquad \deg r<d
$$

を取ります。法 $p$ では $f_0=T^d\overline a$、$\overline a\in\mathbb F_p[[T]]^\times$ なので、次数 $d$ 未満の $\overline r$ は零であり、

$$
T^d=\overline q\,T^d\overline a
\quad\Longrightarrow\quad \overline q=\overline a^{-1}.
$$

したがって $q$ の定数項は $p$ 進単元で $q\in R^\times$、$r\in p\mathbb Z_p[T]$ です。$W=T^d-r$ はdistinguished多項式、$U=q^{-1}$ と置けば $f=p^\mu UW$ が得られます。

一意性について、[積で指数を足す公式](#prop-iwa6-order-additivity)と $\mu(U)=d(U)=0$、$\mu(W)=0$、$d(W)=\deg W$ を使えば、どの表示でも $\mu$ と $\deg W$ が一意です。二つの表示 $f_0=UW=U'W'$ があるなら $W'=(U/U')W$ です。[除法定理](#thm-iwa6-division)で $W'$ を $W$ で割ると、右辺は余り $0$、一方、両者が次数 $d$ のモニック多項式なので

$$
W'=1\cdot W+(W'-W),\qquad \deg(W'-W)<d
$$

も余りを持つ表示です。除法の一意性により $W'-W=0$、次いで $U=U'$ です。$d=0$ の場合も $W=W'=1$ で成立します。
<!-- proof-end -->

**準備の計算例。** $p=3$、

$$
f=9(1+T)(T+3)(T^2+3T+3)
$$

では $1+T$ が単元、二つの多項式の積はモニックかつ法 $3$ で $T^3$ に等しいためdistinguishedです。よって

$$
\mu(f)=2,\qquad d(f)=3,\qquad
U=1+T,\quad W=(T+3)(T^2+3T+3).
$$

単元を任意に $W$ へ吸収することはできません。$W$ にモニック・distinguishedの条件を課したため一意です。
## 4. 既約因子を多項式として見分ける

[IWA5の構造定理](../IWA5/index.md#thm-iwa5-structure)は既約元を使います。既約とは非単元で、二つの非単元の積に分けられないことです。準備定理によって $p$ 以外の既約因子は、単元倍を除きdistinguished多項式として見つかります。

<a id="prop-iwa6-prime-factors"></a>

<!-- formal-statement-start -->
> **命題（岩澤代数の既約因子）**  
> $R=\mathbb Z_p[[T]]$ の非零非単元は有限個の既約元の積に分解され、その既約因子は同伴を除いて次のいずれかである。
>
> 1. $p$。
> 2. $\mathbb Z_p[T]$ で既約な、正次数のdistinguished多項式 $P(T)$。
>
> これらは $R$ で素元であり、分解は順序と同伴を除いて一意である。特に $R$ は一意分解整域である。
<!-- formal-statement-end -->

### 証明の見取り図

まず準備定理から多項式へ移し、モニック多項式を次数を下げながら因数分解します。最後に、多項式の既約性と冪級数環での素元性を割り算でつなぎます。

<!-- proof-start -->
### 証明

非零 $f$ は[準備定理](#thm-iwa6-preparation)により $p^\mu UW$ です。$p$ は $R/(p)=\mathbb F_p[[T]]$ が整域なので素元です。

$W$ はモニックなdistinguished多項式です。$\mathbb Z_p[T]$ で二つの正次数の多項式に分かれるなら、最高次係数の積が $1$ なので各因子を単元定数で割ってモニックにできます。法 $p$ の積が $T^{\deg W}$ であるため、$\mathbb F_p[T]$ で各因子は $T$ の冪であり、各モニック因子もdistinguishedです。次数を厳密に下げていけば、正次数の既約distinguished因子で止まります。

逆に $P$ が既約distinguished多項式で、$P=ab$ が $R$ 内で非単元同士の積だとします。[指数の加法性](#prop-iwa6-order-additivity)から $\mu(a)=\mu(b)=0$ で、$d(a),d(b)\ge1$。準備定理で $a=U_aW_a$、$b=U_bW_b$ として $P=U_aU_bW_aW_b$ です。[準備表示の一意性](#thm-iwa6-preparation)により $P=W_aW_b$ となり、多項式としての既約性と矛盾します。

さらに $P$ が素元であることを示します。$\mathbb Z_p$ は $p$ 冪で付値を測れる離散付値環です。係数を一斉に $p$ で割れない多項式を原始多項式と呼ぶと、原始多項式の積も原始的です（法 $p$ の積が非零）。これがGaussの補題のこの場合の理由です。$\mathbb Q_p[T]$ で因数分解できると仮定すると、各因子の係数を $p$ の冪で調整して原始的な $\mathbb Z_p[T]$ 多項式にでき、その積は $P$ の単元定数倍になります。Gaussの補題（原始性が積で保たれること）により、これは $\mathbb Z_p[T]$ における非自明な因数分解を与えます。従ってモニックで既約な $P\in\mathbb Z_p[T]$ は $\mathbb Q_p[T]$ でも既約です。$\mathbb Q_p[T]/(P)$ は体です。

[除法定理](#thm-iwa6-division)により、$R/(P)$ の任意の元はただ一つの次数 $\deg P$ 未満の多項式で表されます。同じことは $\mathbb Z_p[T]/(P)$ のモニック多項式除法でも成立するので、

$$
R/(P)\simeq\mathbb Z_p[T]/(P)
\hookrightarrow\mathbb Q_p[T]/(P)
$$

です。右辺は体だから左辺は整域、すなわち $P$ は $R$ で素元です。すべての既約因子が素元なので、ある因子が二つの積のどちらかを割るという議論を繰り返すと既約分解の一意性が従います。
<!-- proof-end -->

**既約性を判定する直接例。** $p=3$、$P=T^2+3T+3$ が可約なら、上の証明から正次数のdistinguished多項式二つの積に分かれます。両者の定数項は $3$ の倍数なので、積の定数項は $9$ の倍数です。しかし $P(0)=3$ は $9$ の倍数でありません。従って $P$ は既約です。これは定数項の付値が $1$ の場合のEisenstein型判定の中身です。

**有限ランクの意味。** $W$ が次数 $d$ のdistinguished多項式なら、[除法定理](#thm-iwa6-division)により

$$
R/(W)\simeq\mathbb Z_p\oplus\mathbb Z_p T\oplus\cdots\oplus\mathbb Z_p T^{d-1}
$$

が $\mathbb Z_p$ 加群として成立します。右辺の等号は基底 $1,T,\ldots,T^{d-1}$ による表示です。従ってこの商は階数 $d$ の自由 $\mathbb Z_p$ 加群です。例えば $T^2+3T+3=0$ の商では $T^2=-3T-3$ と還元できます。一方 $R/(p)=\mathbb F_p[[T]]$ は $\mathbb Z_p$ 上の有限生成加群ではありません。

## 5. 特徴イデアルと $\mu,\lambda$

有限生成torsion $R$ 加群 $M$ には、[IWA5の構造定理](../IWA5/index.md#thm-iwa5-structure)によって、有限な核と余核をもつ写像から

$$
M\dashrightarrow
\bigoplus_i R/(p^{a_i})
\ \oplus\
\bigoplus_j R/(P_j(T)^{b_j})
$$

という分類が得られます。ここで $a_i,b_j$ は正整数、$P_j$ は正次数の既約distinguished多項式であり、同じ $P_j$ が繰り返されても構いません。$\dashrightarrow$ は擬同型を示す記号で、実際の同型を意味しません。

各既約因子の冪の数を掛け合わせれば、同じ分類データを一つのイデアルに格納できます。「イデアル $(h)$」とは $h$ のすべての $R$ 倍の集合であり、単元倍しても変わりません。

<a id="def-iwa6-characteristic"></a>

<!-- formal-statement-start -->
> **定義（特徴イデアルと岩澤不変量）**  
> $M$ を有限生成torsion $R=\mathbb Z_p[[T]]$ 加群とし、上記の[IWA5の構造定理](../IWA5/index.md#thm-iwa5-structure)における既約因子と指数を取る。その **特徴イデアル** と **岩澤不変量** を
>
> $$
> \operatorname{char}_R(M)=
> \left(p^{\sum_i a_i}\prod_jP_j(T)^{b_j}\right),\qquad
> \mu(M)=\sum_i a_i,\quad
> \lambda(M)=\sum_j b_j\deg P_j
> $$
>
> と定める。空積は $1$ とするので、$M=0$ または有限な $M$ の特徴イデアルは $(1)=R$、$\mu(M)=\lambda(M)=0$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-iwa6-characteristic -->
**定義の確認。** $M=R/(p^2)\oplus R/(T+3)^2\oplus R/(T^2+3T+3)$（$p=3$）は既約因子の商の直和です。$T+3$ と前節の二次多項式はいずれも既約distinguishedです。従って

$$
\operatorname{char}_R(M)=\bigl(3^2(T+3)^2(T^2+3T+3)\bigr),
\qquad \mu(M)=2,\quad \lambda(M)=2\cdot1+1\cdot2=4.
$$

この値は $M$ の集合としての元の個数ではありません。
<!-- definition-example-end -->

<a id="prop-iwa6-characteristic-invariance"></a>

<!-- formal-statement-start -->
> **命題（特徴イデアルの一意性と擬同型不変性）**  
> 有限生成torsion $R$ 加群の特徴イデアルおよび $\mu,\lambda$ は構造定理の表示の選択によらない。擬同型な二つの有限生成torsion加群ではこれらが一致する。
<!-- formal-statement-end -->

### 証明の見取り図

一つの高さ1素イデアル $(Q)$ で局所化すると、$Q$ 以外の因子は単元になります。残る加群の長さを数えます。

<!-- proof-start -->
### 証明

[岩澤代数の既約因子](#prop-iwa6-prime-factors)により高さ1素元 $Q$ は $p$ または既約distinguished多項式に取れます。$R_{(Q)}$ は、各非零元を $Q$ の冪と $Q$ で割れない元との積に書け、後者を局所化で逆元にできるので、$Q$ を一様化元とする離散付値環です。

$R/(Q^e)$ を局所化すると $R_{(Q)}/(Q^e)$ となり、

$$
(Q^0)/(Q^e)\supset(Q^1)/(Q^e)\supset\cdots
\supset(Q^e)/(Q^e)=0
$$

の各隣接商は剰余体 $R_{(Q)}/(Q)$ と同型です。従って長さは $e$。一方 $Q'$ が $Q$ と非同伴なら $R/(Q'^e)$ は $(Q)$ で局所化すると零です。よって

$$
\ell_{R_{(Q)}}(M_{(Q)})
=\sum_{\text{因子 }Q_i\sim Q}e_i
$$

です。[IWA5の擬同型の局所判定](../IWA5/index.md#prop-iwa5-local-pseudoiso)により、擬同型は各高さ1で同型になるので左辺は不変です。すべての $Q$ で指数が一致するため、[一意分解](#prop-iwa6-prime-factors)により特徴イデアルも、そこから読む二つの不変量も一致します。
<!-- proof-end -->

<a id="prop-iwa6-exact-additivity"></a>

<!-- formal-statement-start -->
> **命題（短完全列での特徴イデアルの乗法性）**  
> 有限生成torsion $R$ 加群の短完全列
>
> $$
> 0\longrightarrow A\longrightarrow B\longrightarrow C\longrightarrow0
> $$
>
> に対して
>
> $$
> \operatorname{char}_R(B)
> =\operatorname{char}_R(A)\operatorname{char}_R(C),\quad
> \mu(B)=\mu(A)+\mu(C),\quad
> \lambda(B)=\lambda(A)+\lambda(C).
> $$
<!-- formal-statement-end -->

### 証明の見取り図

完全列を各 $(Q)$ で局所化し、離散付値環上の有限長加群の長さの加法性を使います。

<!-- proof-start -->
### 証明

局所化は完全なので、任意の高さ1素元 $Q$ に対し

$$
0\longrightarrow A_{(Q)}\longrightarrow B_{(Q)}
\longrightarrow C_{(Q)}\longrightarrow0
$$

が完全です。各局所化は[構造定理](../IWA5/index.md#thm-iwa5-structure)により有限長であり、長さの加法性から

$$
\ell(B_{(Q)})=\ell(A_{(Q)})+\ell(C_{(Q)}).
$$

[前命題](#prop-iwa6-characteristic-invariance)で左辺は特徴イデアルの $Q$ 因子の指数です。すべての $Q$ で指数が加法的なので主イデアルの積の等式が成立します。$Q=p$ の指数を集めれば $\mu$、それ以外の $Q$ の次数で重みを付ければ $\lambda$ の加法性が得られます。
<!-- proof-end -->

**有限部分は消える。** [IWA5の擬零と有限性](../IWA5/index.md#prop-iwa5-pseudonull-finite)により、有限 $R$ 加群は高さ1のすべての局所化で零です。従って $F=R/(p,T)\simeq\mathbb F_p$ は

$$
\operatorname{char}_R(F)=R,\qquad
\operatorname{char}_R(M\oplus F)=\operatorname{char}_R(M)
$$

を満たします。ただし $F$ は $pF=0$ なので、「$\mu(M)=0$ なら $M$ の $p$-torsion元が一つもない」という解釈は誤りです。

**擬同型で本当に同じ値になる例。** [IWA5の剰余写像](../IWA5/index.md#prop-iwa5-residue-pseudoiso)は

$$
R/(pT)\longrightarrow R/(p)\oplus R/(T)
$$

で、核が零、余核が $R/(p,T)$ です。[擬同型不変性](#prop-iwa6-characteristic-invariance)から双方の特徴イデアルは $(pT)$、$\mu=1,\lambda=1$ です。同型ではありません。

## 6. 次講の「類数成長」へ進む前の境界

$\mu$ と $\lambda$ は特徴イデアルから読み取れる整数ですが、**有限層の類群の位数が直ちに分かるわけではありません**。有限層では

$$
\omega_n(T)=(1+T)^{p^n}-1
$$

という関係式が現れます。[IWA3の有限群環の表示](../IWA3/index.md#prop-iwa3-finite-presentation)から、これは $\gamma^{p^n}-1$ に相当します。$M/\omega_nM$ が有限かどうかも加群ごとに確認しなければなりません。

例えば $M=R/(T)\simeq\mathbb Z_p$ では $\omega_n(0)=0$ なので $M/\omega_n M\simeq\mathbb Z_p$ は無限です。にもかかわらず $\mu(M)=0,\lambda(M)=1$ は定義できます。

一方 $p$ が奇素数で $M=R/(T+p)\simeq\mathbb Z_p$ とすると $T$ は $-p$ として作用するので、

$$
M/\omega_n M\simeq
\mathbb Z_p/\bigl((1-p)^{p^n}-1\bigr),\qquad
v_p\bigl((1-p)^{p^n}-1\bigr)=n+1.
$$

最後の付値は $v_p((1-p)-1)=1$ から始め、$x=1+p^su$（$s\ge1$、$u$ は単元）なら二項展開で $v_p(x^p-1)=s+1$ と帰納すれば確かめられます。従って有限な商の位数は $p^{n+1}$ です。$\lambda=1$ が指数の一次項に現れる仕組みを、一つの加群で観察できました。

**IWA7では**、実際の類群逆極限が有限生成torsionであるための算術的入力、有限層との比較（control）、および十分大きな $n$ での

$$
v_p(h_n)=\lambda n+\mu p^n+\nu
$$

の成立条件を区別します。本講で証明したのは環論と加群の分類不変量までであり、この算術的な成長公式を一般に証明したものではありません。

## 7. 演習：準備・分解・有限層をつなぐ

### A1. 二つの指数を係数から読む

$p=3$、$f=9(1+T)(T^2+3T+3)$ とする。係数を展開し $\mu(f),d(f)$ を求めよ。$1+T$ が単元である理由も述べよ。

- Level: A
- ID: IWA6-A1

<!-- solution-start -->
**詳細解答。** 積は $(1+T)(T^2+3T+3)=T^3+4T^2+6T+3$ です。よって $f=9T^3+36T^2+54T+27$ で、係数の $3$ 進付値は順に $2,2,3,3$（高次数から）です。最小値は $2$、それを初めて達成する次数は $2$ なので $\mu(f)=2,d(f)=2$。[単元判定](../IWA3/index.md#prop-iwa3-augmentation)から $1+T$ の定数項 $1$ が単元なので、$1+T$ は $R$ の単元です。
<!-- solution-end -->

### A2. distinguishedの条件を一つずつ判定する

$p=3$ で $W_1=T^3+6T+3$、$W_2=T^3+T+3$、$W_3=2T^2+3$ のどれがdistinguished多項式か、最高次係数と低次係数を確認して判定せよ。

- Level: A
- ID: IWA6-A2

<!-- solution-start -->
**詳細解答。** [定義](#def-iwa6-distinguished)では最高次係数が $1$、それより下の全係数が $3$ の倍数です。$W_1$ は最高次係数 $1$、$T^2$ の係数 $0$、$T$ の係数 $6$、定数項 $3$ がすべて $3$ の倍数なので該当します。$W_2$ は $T$ の係数 $1$ が倍数でないので該当しません。$W_3$ は最高次係数が $2$ であり、$2$ は $3$ 進単元ですが「係数が $1$」というモニック条件を満たさないため該当しません。
<!-- solution-end -->

### A3. 割り算の余りを検算する

$p=3$、$f=T+3$、$g=T^2$ とする。$g=qf+r$、$\deg r<1$ を満たす $q,r$ を求め、唯一性の根拠を述べよ。

- Level: A
- ID: IWA6-A3

<!-- solution-start -->
**詳細解答。** $(T-3)(T+3)=T^2-9$ より $q=T-3,r=9$ です。$r$ は定数なので条件を満たします。$f\bmod3=T$、すなわち $\mu(f)=0,d(f)=1$ ですから[除法定理](#thm-iwa6-division)の仮定が成立し、別の商と余りは存在しません。
<!-- solution-end -->

### A4. 二次多項式の商で行列を作る

$p=3$、$W=T^2+3T+3$ とする。$R/(W)$ の $\mathbb Z_3$ 基底を示し、この基底で $T$ を掛ける作用の行列を求め、その行列式を検算せよ。

- Level: A
- ID: IWA6-A4

<!-- solution-start -->
**詳細解答。** [除法定理](#thm-iwa6-division)でどの冪級数も一意に $a+bT$（$a,b\in\mathbb Z_3$）へ還元できるので基底は $(1,T)$ です。$T\cdot1=T$、$T\cdot T=T^2=-3-3T$ より二つの基底像を列に並べて

$$
[T]_{(1,T)}=\begin{pmatrix}0&-3\\1&-3\end{pmatrix},
\qquad \det[T]_{(1,T)}=0\cdot(-3)-(-3)\cdot1=3.
$$

実際に行列から直接計算すると

$$
\det(XI-[T]_{(1,T)})=
\det\begin{pmatrix}X&3\\-1&X+3\end{pmatrix}
=X(X+3)+3=X^2+3X+3=W(X)
$$

となり、作用の関係式と一致します。
<!-- solution-end -->

### A5. 特徴イデアルと二つの整数

$M=R/(p^2)\oplus R/(T^3)$ の特徴イデアル、$\mu(M),\lambda(M)$ を求めよ。$R/(p,T)$ を追加した場合も考えよ。

- Level: A
- ID: IWA6-A5

<!-- solution-start -->
**詳細解答。** $p$ と $T$ は[既約因子命題](#prop-iwa6-prime-factors)の異なる素元です。したがって[定義](#def-iwa6-characteristic)から $\operatorname{char}_R(M)=(p^2T^3)$、$\mu(M)=2$、$\lambda(M)=3\deg T=3$ です。$R/(p,T)\simeq\mathbb F_p$ は有限なので特徴イデアルは $R$ です。[短完全列での乗法性](#prop-iwa6-exact-additivity)を直和に適用すれば追加後も $(p^2T^3)$ であり、二つの指数も不変です。
<!-- solution-end -->

### B1. 定数項だけから既約性を証明する

$p$ を任意の素数とし $P=T^2+pT+p$ とする。$P$ が $R$ で既約であることを、distinguishedな因子へ分解できるかどうかで証明せよ。

- Level: B
- ID: IWA6-B1

<!-- solution-start -->
**詳細解答。** $P$ は法 $p$ で $T^2$ なので次数 $2$ のdistinguished多項式です。仮に $P=ab$ と $R$ の非単元で分解できたとします。$\mu(P)=0,d(P)=2$ なので[指数の加法性](#prop-iwa6-order-additivity)から $\mu(a)=\mu(b)=0$、$d(a),d(b)\ge1$ かつ和は $2$。[準備定理](#thm-iwa6-preparation)とその一意性により、$P$ は二つの次数 $1$ のdistinguished多項式の積になります。各定数項は $p$ の倍数であるため、積の定数項は $p^2$ の倍数です。しかし $P(0)=p$ は $p^2$ の倍数ではなく矛盾します。よって $P$ は既約です。
<!-- solution-end -->

### B2. 余核が有限でも特徴イデアルは同じ

写像 $R/(pT)\to R/(p)\oplus R/(T)$ を剰余類への二つの写像で定める。核と余核を求め、特徴イデアルと $\mu,\lambda$ を両辺で比べよ。

- Level: B
- ID: IWA6-B2

<!-- solution-start -->
**詳細解答。** 元 $x$ が両方の商で零となる条件は $x\in(p)\cap(T)$ です。$p,T$ は互いに非同伴の素元なので、$x=p a=T b$ なら $p$ が $b$ を割ることから $x\in(pT)$。したがって $(p)\cap(T)=(pT)$、核は零です。対

$$
(a\bmod p,\ b\bmod T)
$$

が同じ $x$ に由来する必要十分条件は $a-b\in(p)+(T)$ です。よって余核は $R/(p,T)\simeq\mathbb F_p$ です。従って[IWA5の擬同型の定義](../IWA5/index.md#def-iwa5-pseudoisomorphism)を満たし、[擬同型不変性](#prop-iwa6-characteristic-invariance)から双方の特徴イデアルは $(pT)$、$\mu=1,\lambda=1$ です。
<!-- solution-end -->

### B3. 同じ $\lambda$ でも有限層の商は違う

$p$ を奇素数、$\omega_n=(1+T)^{p^n}-1$ とする。$M_0=R/(T)$、$M_1=R/(T+p)$ の両方について $\mu,\lambda$ を求め、$M_i/\omega_nM_i$ の有限性と有限なら位数を調べよ。

- Level: B
- ID: IWA6-B3

<!-- solution-start -->
**詳細解答。** $T$ と $T+p$ は次数 $1$ の既約distinguished多項式であるから、どちらも $\mu=0,\lambda=1$ です。$M_0\simeq\mathbb Z_p$ において $T=0$ と置くと $\omega_n=0$ であり、商は無限な $\mathbb Z_p$ です。$M_1\simeq\mathbb Z_p$ では $T=-p$ ですから商は $\mathbb Z_p/((1-p)^{p^n}-1)$ です。

$x=1+p^s u$（$s\ge1$、$u\in\mathbb Z_p^\times$）に対して二項展開

$$
x^p-1=p^{s+1}u+
\sum_{k=2}^{p-1}\binom pk p^{sk}u^k+p^{sp}u^p
$$

では、$p$ が奇素数なので第2項以降の付値は $s+2$ 以上です。従って $v_p(x^p-1)=s+1$。$x=1-p$ から $n$ 回繰り返して $v_p((1-p)^{p^n}-1)=n+1$。従って $M_1/\omega_nM_1$ は位数 $p^{n+1}$ の有限群です。二つの $\lambda$ が等しいだけでは有限性は決まりません。
<!-- solution-end -->

### B4. 短完全列で積の公式を確かめる

$P=T+p$ とし、$R/(P)\xrightarrow{\cdot p}R/(pP)\to R/(p)$ の自然な列に両端の零を加える。この列が短完全であることを証明し、特徴イデアルの乗法性を直接検算せよ。

- Level: B
- ID: IWA6-B4

<!-- solution-start -->
**詳細解答。** 左の写像は $x+(P)\mapsto px+(pP)$ です。もし $px\in(pP)$ なら、整域 $R$ で $p$ を消去して $x\in(P)$ なので単射です。右の写像は $x+(pP)\mapsto x+(p)$ で、$pP\subset(p)$ なので定義でき、全射です。右の核は $(p)/(pP)$ であり、ちょうど左の写像の像です。従って

$$
0\longrightarrow R/(P)\xrightarrow{\cdot p}R/(pP)
\longrightarrow R/(p)\longrightarrow0
$$

は完全です。[特徴イデアルの定義](#def-iwa6-characteristic)で三項はそれぞれ $(P),(pP),(p)$ だから $(pP)=(P)(p)$ です。$\mu$ は $0+1=1$、$\lambda$ は $1+0=1$ となり、[短完全列の命題](#prop-iwa6-exact-additivity)を具体的に確認できました。
<!-- solution-end -->

### C1. 準備から擬同型まで一続きで分類する

$p=3$ とし、

$$
f=3^2(1+T)(T+3)(T^2+3T+3),\qquad
M=R/(f)\oplus R/(3,T)
$$

とする。

1. $f$ のWeierstrass準備表示と $\mu(f),d(f)$ を求めよ。
2. 現れる既約因子とその指数を証明付きで列挙せよ。
3. $\operatorname{char}_R(M)$、$\mu(M),\lambda(M)$ を計算し、有限な直和因子が何を変えるか述べよ。
4. $E=R/(3^2)\oplus R/(T+3)\oplus R/(T^2+3T+3)$ への自然な剰余写像 $R/(f)\to E$ が擬同型であることを、核と高さ1での局所化から説明せよ。

- Level: C
- ID: IWA6-C1

<!-- solution-start -->
**詳細解答。** 1. $1+T$ は定数項が単元なので $R^\times$ の元です。$W=(T+3)(T^2+3T+3)$ はモニックで、法 $3$ では $T^3$ になります。[準備定理](#thm-iwa6-preparation)の一意性から

$$
f=3^2U W,\quad U=1+T,\quad \mu(f)=2,\quad d(f)=3.
$$

2. $3$ は $R/(3)=\mathbb F_3[[T]]$ が整域なので素元です。$T+3$ は次数 $1$ のdistinguished多項式であり、非単元二つには分解できません。$T^2+3T+3$ は、もし二つの正次数のdistinguished因子に分かれれば定数項が $9$ で割れるはずですが、定数項は $3$ なので既約です（[B1と同じ判定](#prop-iwa6-prime-factors)）。これらは次数または係数の違いで互いに非同伴です。

3. $R/(3,T)\simeq\mathbb F_3$ は有限ですから、その特徴イデアルは $(1)$ です。従って

$$
\operatorname{char}_R(M)
=\bigl(3^2(T+3)(T^2+3T+3)\bigr),
\quad\mu(M)=2,\quad\lambda(M)=1+2=3.
$$

有限な直和因子は加群としての同型型を変えますが、特徴イデアルと二つの不変量を変えません。

4. 単元 $1+T$ は商イデアルを変えないので $(f)=(3^2(T+3)(T^2+3T+3))$ です。異なる素元を $q_1=3,q_2=T+3,q_3=T^2+3T+3$ とすると、一意分解性から

$$
(q_1^2)\cap(q_2)\cap(q_3)=(q_1^2q_2q_3).
$$

実際、交わりに属する元の素因数分解は三つの必要な指数をすべて含むので積で割り切れます。従って剰余写像の核は零です。高さ1の任意の素イデアル $(Q)$ で局所化すると、$Q$ が三つの素元のいずれかに同伴な場合は対応する一成分だけが残り、それ以外の場合はすべて零です。よって局所化後の写像はすべて同型です。[IWA5の局所判定](../IWA5/index.md#prop-iwa5-local-pseudoiso)から余核は擬零であり、[IWA5の擬零と有限性](../IWA5/index.md#prop-iwa5-pseudonull-finite)から有限です。したがってこの写像は擬同型です。なお $R/(3,T)$ の直和まで含めた $M\to E$ も、有限部分を零に送れば有限な核と余核を持つ擬同型になります。
<!-- solution-end -->

## 8. 参考文献と次講

- [Romyar Sharifi, *Iwasawa Theory*, Chapter 2: Module theory](https://math.ucla.edu/~sharifi/notes/iwasawa-ch02.html) — Weierstrass準備、岩澤加群、特徴イデアル。
- Lawrence C. Washington, *Introduction to Cyclotomic Fields*, 2nd ed., Chapter 13 — 岩澤代数と類数成長の標準的な背景。

次の **IWA7「類数成長公式と $\mu$ 不変量の役割」** では、どの算術的仮定の下で類群の逆極限を有限生成torsion加群とみなし、その $\mu,\lambda$ が有限層の類数に現れるのかを証明します。
