# TRN1 代数的整数と有限生成加群の判定

[FLD1の代数的元](../../FLD/FLD1/index.md#def-fld1-algebraic-element)は、有理数係数の多項式を零にする数でした。例えば $\sqrt2$ も $1/2$ も代数的です。しかし、後で「零でない整数の絶対値は1以上」という離散性を利用するには、単に代数的であるだけでは足りません。$1/2$ を整数のように扱えば、その冪 $2^{-n}$ は零でないまま0へ近づいてしまいます。

ここで区別したいのは、**整数係数かつ最高次係数1の多項式**を満たすかどうかです。この条件を満たす数を以下で定義します。さらに、定義だけではこの性質が和や積について保たれることは見通せません。そこで、有限個の数の整数係数線形結合をまとめた集合に「その数を掛けても外へ出ない」という条件を課し、行列式から最高次係数1の整数多項式を取り出します。

本章の到達点は、この整数性の直接判定、有限生成加群の必要十分条件、和・差・積の閉性を、それぞれ使った仮定とともに証明できることです。この整数性が後のTRN2で跡・ノルムを普通の整数へ落とす土台になります。

## 1. 「代数的」と「整数的」は違う

$\overline{\mathbb Q}$ は複素数のうち $\mathbb Q$ 上代数的なもの全体、すなわちある非零多項式 $f\in\mathbb Q[T]$ の根となる数の集合とします。$\mathbb Z[T]$ は整数係数多項式全体です。

整数係数多項式のうち、最高次係数が1となる条件に名前を付けます。次数 $d\ge1$ の場合は次の形です。

$$
P(T)=T^d+c_{d-1}T^{d-1}+\cdots+c_1T+c_0,
\qquad c_j\in\mathbb Z.
$$

<a id="def-trn1-monic-polynomial"></a>

<!-- formal-statement-start -->
> **定義（モニック多項式）**  
> 係数環を $\mathbb Z$ とする非零多項式 $P\in\mathbb Z[T]$ が**モニック**であるとは、その最高次係数が1であることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-trn1-monic-polynomial -->
**定義の確認**

例えば $T^2-2$ と $T^2-T-1$ はいずれも係数が整数で最高次係数が1だからモニックです。一方、$2T-1$ の最高次係数は2なのでモニックではありません。定数多項式 $1$ も最高次係数が1であるためモニックですが、次に導入する整数性の関係式は次数 $d\ge1$ とします。
<!-- definition-example-end -->

<a id="def-trn1-algebraic-integer"></a>

<!-- formal-statement-start -->
> **定義（代数的整数）**  
> 複素数 $\alpha$ が**代数的整数**であるとは、ある整数 $d\ge1$ と $c_0,\dots,c_{d-1}\in\mathbb Z$ が存在して

$$
\alpha^d+c_{d-1}\alpha^{d-1}+\cdots+c_1\alpha+c_0=0
$$

> を満たすことをいう。代数的整数全体を $\mathcal O_{\overline{\mathbb Q}}$ と記す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-trn1-algebraic-integer -->
**定義の確認**

具体的な多項式を代入して確かめます。

$\alpha=\sqrt2$ には $P(T)=T^2-2$ があり、係数はすべて整数、最高次係数は1、$P(\sqrt2)=2-2=0$ です。よって $\sqrt2$ は代数的整数です。

$\varphi=(1+\sqrt5)/2$ では $\varphi^2=\varphi+1$ を確かめます。実際、

$$
\varphi^2
=\frac{(1+\sqrt5)^2}{4}
=\frac{6+2\sqrt5}{4}
=\frac{3+\sqrt5}{2}
=\varphi+1.
$$

したがって $P(T)=T^2-T-1\in\mathbb Z[T]$ はモニックかつ $P(\varphi)=0$ であり、$\varphi$ も代数的整数です。$\varphi$ 自身の表示には分母2がありますが、それだけでは判定できません。

反対に、$1/2$ は $2T-1\in\mathbb Z[T]$ の根であるため代数的ですが、この多項式はモニックではありません。「別のモニック多項式も存在しない」ことは次節で証明します。
<!-- definition-example-end -->

## 2. 有理数の場合にはいつもの整数に戻る

まず、代数的整数という名称が普通の整数と矛盾しないことを証明します。分母を払うだけでなく、**最高次係数が1**であることを最後に使います。

<a id="prop-trn1-rational-integers"></a>

<!-- formal-statement-start -->
> **命題（有理な代数的整数の特徴づけ）**  
> 有理数 $r\in\mathbb Q$ について、$r$ が代数的整数であることと $r\in\mathbb Z$ は同値である。
<!-- formal-statement-end -->

### 証明の見取り図

整数 $m$ には $T-m$ を使えます。逆方向では有理数 $a/b$ を既約分数で書き、モニック多項式へ代入して $b\mid a^d$ を導きます。分母と分子が互いに素なので $b=1$ となります。

<!-- proof-start -->
### 証明

$m\in\mathbb Z$ なら $T-m\in\mathbb Z[T]$ はモニックであり、$m$ を根に持ちます。よって $m$ は代数的整数です。

逆に、代数的整数 $r=a/b$ を $a\in\mathbb Z$, $b\in\mathbb Z_{>0}$, $\gcd(|a|,b)=1$ と書きます。[代数的整数の定義](#def-trn1-algebraic-integer)から

$$
(a/b)^d+c_{d-1}(a/b)^{d-1}
+\cdots+c_1(a/b)+c_0=0
$$

となる整数係数があります。両辺に $b^d$ を掛けると

$$
a^d+c_{d-1}a^{d-1}b+\cdots+c_1ab^{d-1}+c_0b^d=0.
$$

右の第2項以降はすべて $b$ の倍数なので

$$
a^d=-b\bigl(c_{d-1}a^{d-1}+\cdots+c_1ab^{d-2}+c_0b^{d-1}\bigr).
$$

従って $b\mid a^d$ です。一方 $\gcd(|a|,b)=1$ なので $\gcd(|a|^d,b)=1$ です。$a=0$ の場合も既約性から直ちに $b=1$ です。いずれも $b$ が1以外の正整数にはなれず、$r=a\in\mathbb Z$ を得ます。
<!-- proof-end -->

この命題により、$1/2$ が代数的整数でないことも確定しました。$2T-1$ の最高次係数を「分母を払って1にする」には係数を $1/2$ 倍する必要があり、整数係数という条件が壊れるのです。

## 3. 掛け算に対して安定な有限生成 $\mathbb Z$ 加群

数 $\alpha$ の整数性を直接、多項式を探して示す代わりに、$\alpha$ を掛けたときの動きを有限個の生成元で記述したくなります。

複素数 $u_1,\dots,u_r$ が与えられたとき、

$$
M=\mathbb Zu_1+\cdots+\mathbb Zu_r
=\left\{\sum_{j=1}^r n_ju_j:n_j\in\mathbb Z\right\}
$$

は、足し算と符号反転について閉じています。これは[生成系・有限生成加群の定義](../../MOD/MOD1/index.md#def-mod1-generating-set)で係数環を $R=\mathbb Z$ とした場合です。「加群」はここでは整数倍と加減算を許す集合という意味であり、$u_j$ の一次独立性は要求しません。$1\in M$ は数1が上の整数係数線形結合で表せるという条件です。

<a id="def-trn1-stable-module"></a>

<!-- formal-statement-start -->
> **定義（乗法に安定な有限生成加群）**  
> $\alpha\in\mathbb C$ と、$M=\sum_{j=1}^{r}\mathbb Zu_j\subseteq\mathbb C$（$r\ge1$）を取る。$M$ が **$\alpha$ の乗法で安定**とは、すべての $m\in M$ について $\alpha m\in M$、すなわち $\alpha M\subseteq M$ であることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-trn1-stable-module -->
**定義の確認**

$\sqrt2$ を掛けても出ていかない集合を作ります。

$M=\mathbb Z+\mathbb Z\sqrt2$ と置くと $1\in M$ です。任意の $m=a+b\sqrt2\in M$ に対し

$$
\sqrt2\,m
=\sqrt2(a+b\sqrt2)
=2b+a\sqrt2\in M
$$

となり、整数係数 $2b,a$ がそのまま使えます。したがって $\sqrt2M\subseteq M$ です。この確認は、たまたま $1$ と $\sqrt2$ に掛けた場合だけでなく、**任意の元**に対する条件を確認しています。
<!-- definition-example-end -->

ここで、生成元を $u_1,\ldots,u_r$ とし、各 $i$ に対して整数 $a_{ij}$ を選んで

$$
\alpha u_i=\sum_{j=1}^r a_{ij}u_j
\qquad(1\le i\le r)
$$

と表せたとします。縦ベクトル $u=(u_1,\ldots,u_r)^{\mathsf T}$、整数行列 $A=(a_{ij})\in M_r(\mathbb Z)$ とすれば、この $r$ 本の式は

$$
\alpha u=Au
$$

と一つにまとめられます。**ここで $u$ は抽象的な基底ベクトルではなく、複素数を並べた列**です。[加群の基底の定義](../../MOD/MOD1/index.md#def-mod1-free-module-basis)が要求する表示の一意性は仮定していません。生成元同士が整数係数の関係を持っていても、各成分の等式そのものは成立します。$1\in M$ があるので、後で $P(\alpha)u_i=0$ が分かれば $P(\alpha)=0$ まで進めます。

例えば先ほどの $M=\mathbb Z+\mathbb Z\sqrt2$ に $u=(1,\sqrt2)^{\mathsf T}$ を選べば

$$
\sqrt2
\begin{pmatrix}1\\ \sqrt2\end{pmatrix}
=
\begin{pmatrix}0&1\\2&0\end{pmatrix}
\begin{pmatrix}1\\\sqrt2\end{pmatrix}.
$$

この行列は、生成元へ $\sqrt2$ を掛けた結果を整数係数で表したものです。行列式はまだ定義の条件ではありません。次節で、この表示からモニック多項式を作るために使います。

## 4. 有限生成加群による整数性の必要十分条件

<a id="thm-trn1-integrality-criterion"></a>

<!-- formal-statement-start -->
> **定理（有限生成加群による代数的整数の判定）**  
> 任意の $\alpha\in\mathbb C$ について次の2条件は同値である。
>
> 1. $\alpha$ は代数的整数である。
> 2. $1\in M$、$\alpha M\subseteq M$ を満たす有限生成 $\mathbb Z$ 加群 $M\subseteq\mathbb C$ が存在する。
<!-- formal-statement-end -->

### 証明の見取り図

モニックな関係式があれば $1,\alpha,\ldots,\alpha^{d-1}$ の整数線形結合で安定な集合ができます。逆方向では前節の整数行列 $A$ に対して $\det(TI-A)$ を作ります。[多項式行列の余因子行列の恒等式](../../../基礎科目/LA/LA4/index.md#lem-la4-adjugate-identity)を代入することで、**生成元が基底でなくても**全生成元がその多項式で消えます。

<!-- proof-start -->
### 証明

**(1) から (2)。** $\alpha$ を根にもつモニック多項式を

$$
P(T)=T^d+c_{d-1}T^{d-1}+\cdots+c_0
\quad(c_j\in\mathbb Z)
$$

とします。そこで

$$
M=\mathbb Z+\mathbb Z\alpha+\cdots+\mathbb Z\alpha^{d-1}
$$

と置きます。$M$ は有限生成で $1\in M$ です。$d\ge2$ のとき生成元 $1,\alpha,\ldots,\alpha^{d-2}$ に $\alpha$ を掛ければ次の生成元になります（$d=1$ のときこの部分は空です）。最後の生成元 $\alpha^{d-1}$ については

$$
\alpha\alpha^{d-1}=\alpha^d
=-c_{d-1}\alpha^{d-1}-\cdots-c_1\alpha-c_0\in M.
$$

任意の $m=\sum_{j=0}^{d-1}n_j\alpha^j$ について

$$
\alpha m=\sum_{j=0}^{d-1}n_j(\alpha^{j+1})\in M
$$

となるため、$\alpha M\subseteq M$ が示されます。

**(2) から (1)。** $M=\sum_{i=1}^r\mathbb Zu_i$ を条件を満たす生成表示とします。$\alpha u_i\in M$ より整数 $a_{ij}$ を選び、$\alpha u_i=\sum_ja_{ij}u_j$ と書けます。$A=(a_{ij})\in M_r(\mathbb Z)$ とし、$u=(u_i)^{\mathsf T}$ とすると

$$
(\alpha I_r-A)u=0.
$$

多項式行列 $B(T)=TI_r-A$ を考えます。その行列式

$$
P(T)=\det(TI_r-A)
$$

の係数は整数です。実際、[行列式のLeibniz公式](../../../基礎科目/LA/LA3B/index.md#def-la3b-matrix-determinant)の各項は $\mathbb Z[T]$ の多項式であり、恒等置換の対角積が $T^r$ の係数1を与え、他の置換の積の次数は $r$ 未満です。従って $P(T)\in\mathbb Z[T]$ は次数 $r$ のモニック多項式です。

[多項式行列の余因子行列の恒等式](../../../基礎科目/LA/LA4/index.md#lem-la4-adjugate-identity)は $\mathbb C[T]$ 上の行列に適用できます。ただし参照先で直接示されているのは $B\operatorname{adj}(B)=\det(B)I_r$ の向きです。ここでは $B(T)u=0$ に**左から**掛けるため、積の順序を逆にした等式が必要です。

まず同じ補題を転置行列 $B(T)^{\mathsf T}$ に適用します。[行列式の転置不変性](../../../基礎科目/LA/LA3B/index.md#thm-la3b-det-transpose)の証明は Leibniz 公式に基づくため、成分が $\mathbb C[T]$ の場合も同じく成り立ちます。従って

$
B(T)^{\mathsf T}\operatorname{adj}(B(T)^{\mathsf T})
=\det(B(T)^{\mathsf T})I_r
=P(T)I_r.
$

両辺を転置すると、積の順序が反転して

$
\operatorname{adj}(B(T)^{\mathsf T})^{\mathsf T}B(T)
=P(T)I_r.
$

余因子は小行列式から定義され、小行列を転置しても行列式は変わりません。ゆえに $\operatorname{adj}(B(T)^{\mathsf T})^{\mathsf T}=\operatorname{adj}(B(T))$ となり、求める向き

$
\operatorname{adj}(B(T))B(T)=P(T)I_r
$

が得られます。生成元の独立性や行列 $B(\alpha)$ の可逆性は一切用いていません。

各成分を $T=\alpha$ で評価し、$(\alpha I_r-A)u=0$ に左から掛けると

$$
P(\alpha)u
=\operatorname{adj}(\alpha I_r-A)(\alpha I_r-A)u=0.
$$

よって各生成元 $u_i$ について $P(\alpha)u_i=0$ です。条件 $1\in M$ から、ある整数 $n_i$ について $1=\sum_i n_iu_i$ ですから

$$
P(\alpha)=P(\alpha)\cdot1
=\sum_i n_iP(\alpha)u_i=0.
$$

$P$ は整数係数モニックなので、$\alpha$ は[代数的整数の定義](#def-trn1-algebraic-integer)を満たします。
<!-- proof-end -->

### なぜ「生成系」と「基底」を分けるのか

$M=\mathbb Z+\mathbb Z\sqrt2+\mathbb Z(1+\sqrt2)$ としても、同じ集合を生成します。しかし3つの生成元には $(1+\sqrt2)-1-\sqrt2=0$ という関係があります。そのため、これらを独立な座標軸とみなして「基底上の線形写像」の行列表現と言い切ることはできません。

上の証明が使ったのは、各生成元に対して整数係数の**等式が一本ずつ成り立つ**こと、余因子行列を掛けられること、そして $1$ が整数線形結合に含まれることだけです。行列 $A$ の選択も一意とは限りませんが、どれを選んでも $P(\alpha)=0$ が成立します。

## 5. 加法と乗法で整数性が保たれる

モニック多項式を個別に探すだけでは、$\alpha+\beta$ や $\alpha\beta$ に対する多項式は見つけづらい場合があります。そこで二つの関係式に現れる冪を並べ、**両方を掛けても外へ出ない**有限生成加群を作ります。

<a id="thm-trn1-integral-ring"></a>

<!-- formal-statement-start -->
> **定理（代数的整数の和・差・積）**  
> $\alpha,\beta\in\mathbb C$ が代数的整数なら、$\alpha+\beta$、$\alpha-\beta$、$\alpha\beta$ も代数的整数である。従って代数的整数全体 $\mathcal O_{\overline{\mathbb Q}}$ は $0,1$ を含み、加減算と乗算について閉じる。
<!-- formal-statement-end -->

### 証明の見取り図

$\alpha,\beta$ に対するモニック関係式の次数を $d,e$ とします。$1,\alpha,\ldots,\alpha^{d-1}$ と $1,\beta,\ldots,\beta^{e-1}$ を掛け合わせた $de$ 個の元で $M$ を生成すると、$\alpha M$ と $\beta M$ がともに $M$ に含まれます。そこから $(\alpha\pm\beta)M,\alpha\beta M\subseteq M$ を直接確認して前節の判定を使います。

<!-- proof-start -->
### 証明

それぞれ次数 $d,e\ge1$ のモニック関係式を

$$
\alpha^d=-\sum_{i=0}^{d-1}c_i\alpha^i,
\qquad
\beta^e=-\sum_{j=0}^{e-1}b_j\beta^j
$$

と書きます。ただし $c_i,b_j\in\mathbb Z$ です。集合

$$
M=\sum_{0\le i<d}\sum_{0\le j<e}\mathbb Z\,\alpha^i\beta^j
$$

を考えます。$de$ 個以下の元で生成され、$i=j=0$ により $1\in M$ です。

生成元 $\alpha^i\beta^j$ に $\alpha$ を掛けると、$i<d-1$ なら $\alpha^{i+1}\beta^j$ は既存の生成元です。$i=d-1$ なら

$$
\alpha(\alpha^{d-1}\beta^j)
=\alpha^d\beta^j
=-\sum_{k=0}^{d-1}c_k\alpha^k\beta^j\in M.
$$

整数係数の和へ拡張すれば $\alpha M\subseteq M$ です。同じく $\beta$ に掛けた場合は $j=e-1$ のとき

$$
\beta(\alpha^i\beta^{e-1})
=\alpha^i\beta^e
=-\sum_{\ell=0}^{e-1}b_\ell\alpha^i\beta^\ell\in M
$$

となり、$\beta M\subseteq M$ です。

任意の $m\in M$ に対し、$\alpha m,\beta m$ はともに $M$ に属します。$M$ は加減算で閉じているので

$$
(\alpha+\beta)m=\alpha m+\beta m\in M,\qquad
(\alpha-\beta)m=\alpha m-\beta m\in M.
$$

また $\beta m\in M$ にもう一度 $\alpha$ を掛けて

$$
(\alpha\beta)m=\alpha(\beta m)\in M
$$

です。従って3つの数はそれぞれ[有限生成加群による整数性の判定](#thm-trn1-integrality-criterion)の2番目の条件を満たし、代数的整数です。最後に $0,1$ は $T,T-1$ の根だから代数的整数であり、結論を得ます。
<!-- proof-end -->

同じ論法を繰り返せば、代数的整数を整数係数の多項式に代入して得られる数も代数的整数です。ただし、**逆数では閉じません**。例えば $2$ は代数的整数ですが $2^{-1}=1/2$ は違います。ここで示したのは「環」の閉性であり、「体」の閉性ではありません。

## 6. 定義を判定へ変換する練習

### 例1：$\sqrt2$ の乗法行列と多項式

第3節の生成系 $u=(1,\sqrt2)^{\mathsf T}$ と行列 $A$ は

$$
A=\begin{pmatrix}0&1\\2&0\end{pmatrix},\qquad
\det(TI_2-A)
=\det\begin{pmatrix}T&-1\\-2&T\end{pmatrix}
=T^2-2.
$$

なぜこの行列式が有効かは[判定定理](#thm-trn1-integrality-criterion)で証明済みです。$P(\sqrt2)=0$ となり、直接のモニック多項式判定と一致します。

### 例2：$\varphi=(1+\sqrt5)/2$

$M=\mathbb Z+\mathbb Z\varphi$ とすれば $1\in M$ です。$\varphi^2=1+\varphi$ を使い、

$$
\varphi(a+b\varphi)
=\varphi a+b(\varphi+1)
=b+(a+b)\varphi\in M
$$

が任意の整数 $a,b$ で成立します。従って $\varphi M\subseteq M$ です。対応する整数行列は

$$
A=\begin{pmatrix}0&1\\1&1\end{pmatrix},\qquad
\det(TI_2-A)=T^2-T-1.
$$

分母2が見えるから非整数的という推論は誤りです。どの条件を確認したかを追うと、$\varphi$ が整数係数モニック多項式の根である理由が明確になります。

### 例3：$1/2$ では何が壊れるか

$\alpha=1/2$ は有理数ですが普通の整数ではないので、[有理な代数的整数の特徴づけ](#prop-trn1-rational-integers)から整数係数モニックの関係式はありません。もし $1\in M$、$(1/2)M\subseteq M$ を満たす有限生成 $\mathbb Z$ 加群が存在したら、[判定定理](#thm-trn1-integrality-criterion)からその関係式が得られて矛盾します。従ってそのような $M$ もありません。

## 7. 演習：整数性と有限生成の橋渡し

### Level A：定義と具体行列

**TRN1-A1（モニックかどうか）**  
$3$、$\sqrt3$、$1/3$ について、代数的か、代数的整数かを判定し、使用した多項式または定理を示してください。

- Level: A

<!-- solution-start -->
**詳細解答**

$3$ は $T-3\in\mathbb Z[T]$ の根、$\sqrt3$ は $T^2-3\in\mathbb Z[T]$ の根であり、両方の多項式は最高次係数が1なので二数は代数的整数です。$1/3$ は $3T-1\in\mathbb Z[T]$ の根だから代数的です。一方、既約な有理数 $1/3$ は通常の整数でないため、[有理な代数的整数の特徴づけ](#prop-trn1-rational-integers)により代数的整数ではありません。
<!-- solution-end -->

**TRN1-A2（$\sqrt3$ の生成加群）**  
$M=\mathbb Z+\mathbb Z\sqrt3$ が $1$ を含み、$\sqrt3M\subseteq M$ を満たすことをすべての元に対して示してください。生成系 $(1,\sqrt3)$ での整数行列を作ってください。

- Level: A

<!-- solution-start -->
**詳細解答**

$1=1+0\sqrt3\in M$ です。任意の $m=a+b\sqrt3$（$a,b\in\mathbb Z$）について

$$
\sqrt3m=a\sqrt3+3b=3b+a\sqrt3\in M.
$$

生成元への乗法は $\sqrt3\cdot1=\sqrt3$、$\sqrt3\cdot\sqrt3=3$ なので

$$
A=\begin{pmatrix}0&1\\3&0\end{pmatrix},\qquad
\sqrt3\begin{pmatrix}1\\\sqrt3\end{pmatrix}
=A\begin{pmatrix}1\\\sqrt3\end{pmatrix}.
$$

両条件が成り立つため[判定定理](#thm-trn1-integrality-criterion)が適用できます。
<!-- solution-end -->

**TRN1-A3（分母が見える数）**  
$\varphi=(1+\sqrt5)/2$ について、$\varphi^2-\varphi-1=0$ を計算で確認し、$M=\mathbb Z+\mathbb Z\varphi$ が乗法で安定な理由をすべての元について示してください。

- Level: A

<!-- solution-start -->
**詳細解答**

$(1+\sqrt5)^2=6+2\sqrt5$ より

$$
\varphi^2=\frac{6+2\sqrt5}{4}
=\frac{3+\sqrt5}{2}
=\varphi+1.
$$

従って $\varphi^2-\varphi-1=0$ であり、$T^2-T-1$ は整数係数モニックです。また $1\in M$、$a,b\in\mathbb Z$ なら

$$
\varphi(a+b\varphi)
=a\varphi+b(\varphi+1)
=b+(a+b)\varphi\in M.
$$

従って $\varphi M\subseteq M$ です。二通りの判定はともに代数的整数を与えます。
<!-- solution-end -->

**TRN1-A4（行列式の算出）**  
$A=\bigl(\begin{smallmatrix}0&1\\2&1\end{smallmatrix}\bigr)$ と $u=(1,\theta)^{\mathsf T}$ が $\theta u=Au$ を満たすとします。$\theta$ を消すモニック多項式を求めてください。

- Level: A

<!-- solution-start -->
**詳細解答**

$\theta u=Au$ の第1成分は $\theta=\theta$、第2成分は $\theta^2=2+\theta$ です。従って $\theta^2-\theta-2=0$ です。行列式からも

$$
\det(TI_2-A)
=\det\begin{pmatrix}T&-1\\-2&T-1\end{pmatrix}
=T(T-1)-2=T^2-T-2
$$

と分かります。整数係数で最高次係数1なので $\theta$ は代数的整数です。$u_1=1$ であることが $P(\theta)u_1=0$ から $P(\theta)=0$ を取り出す鍵です。
<!-- solution-end -->

### Level B：証明を組み立てる

**TRN1-B1（有理数の分母）**  
既約分数 $a/b$（$b>0$）がある次数 $d\ge1$ の整数係数モニック多項式の根だとします。$b\mid a^d$ を導き、$b=1$ を示してください。最高次係数が $2$ の場合には同じ議論ができない理由も示してください。

- Level: B

<!-- solution-start -->
**詳細解答**

$a/b$ を $T^d+c_{d-1}T^{d-1}+\cdots+c_0$ に代入し、$b^d$ を掛けると

$$
a^d+c_{d-1}a^{d-1}b+\cdots+c_0b^d=0.
$$

第2項以降がすべて $b$ で割り切れるので $b\mid a^d$ です。$\gcd(|a|,b)=1$ より $a$ と $b$ に共通の素因子はなく、$a^d$ と $b$ にも共通の素因子はありません。従って $b=1$ です。

最高次係数が2なら最初の項は $2a^d$ となり、結論は $b\mid2a^d$ にしかなりません。例えば $2T-1$ に $a=1,b=2$ を代入すると $2a-b=0$ ですが $b=1$ ではありません。モニック性こそが分母を禁じています。
<!-- solution-end -->

**TRN1-B2（生成元が基底でない場合）**  
$\alpha=\sqrt2$、$u=(1,\sqrt2,1+\sqrt2)^{\mathsf T}$ とします。整数行列 $A$ を一つ選んで $\alpha u=Au$ を示し、$\det(TI_3-A)$ を求め、そこから $\alpha$ の整数性を証明してください。

- Level: B

<!-- solution-start -->
**詳細解答**

$\sqrt2\cdot1=\sqrt2$、$\sqrt2\cdot\sqrt2=2$、$\sqrt2(1+\sqrt2)=2+\sqrt2$ より

$$
A=\begin{pmatrix}
0&1&0\\
2&0&0\\
2&1&0
\end{pmatrix},
\qquad \sqrt2\,u=Au.
$$

$TI_3-A$ は第3列の上2成分が0であるため、[Laplace 展開](../../../基礎科目/LA/LA3C/index.md#thm-la3c-laplace-expansion)を第3列に適用でき、

$$
\det(TI_3-A)
=\det\begin{pmatrix}
T&-1&0\\-2&T&0\\-2&-1&T
\end{pmatrix}
=T\det\begin{pmatrix}T&-1\\-2&T\end{pmatrix}
=T(T^2-2).
$$

この多項式は整数係数モニックで、$P(\sqrt2)=\sqrt2(2-2)=0$ です。$u_3-u_1-u_2=0$ という従属関係がありますが、[判定定理](#thm-trn1-integrality-criterion)は生成元の独立性を仮定していません。$1=u_1$ を含むことも確認済みです。
<!-- solution-end -->

**TRN1-B3（整数係数多項式を代入する）**  
$\alpha,\beta$ が代数的整数のとき、$2\alpha^2-3\alpha\beta+\beta^3-5$ が代数的整数であることを示してください。$\alpha$ と $\beta$ の多項式関係の次数を $d,e$ として、使う加群の生成元も書いてください。

- Level: B

<!-- solution-start -->
**詳細解答**

$\alpha^d=-\sum_{i<d}c_i\alpha^i$、$\beta^e=-\sum_{j<e}b_j\beta^j$ を満たすので

$$
M=\sum_{0\le i<d,\ 0\le j<e}\mathbb Z\alpha^i\beta^j
$$

を取ります。$1=\alpha^0\beta^0\in M$ であり、最高次数の冪は上の関係式で低次の整数線形結合に直せます。従って $\alpha M\subseteq M$、$\beta M\subseteq M$ です。この包含を反復すると $\alpha^2M,\alpha\beta M,\beta^3M\subseteq M$。任意の $m\in M$ について

$$
(2\alpha^2-3\alpha\beta+\beta^3-5)m
=2\alpha^2m-3\alpha\beta m+\beta^3m-5m\in M.
$$

この $M$ は有限生成で $1\in M$ です。さらに上で示した乗法安定性から[有限生成加群による代数的整数の判定](#thm-trn1-integrality-criterion)を適用でき、題意の数は代数的整数です。
<!-- solution-end -->

### Level C：別の数に方法を移す

**TRN1-C1（$\sqrt2+\sqrt3$ の整数性）**  
$\gamma=\sqrt2+\sqrt3$ とします。$M=\mathbb Z+\mathbb Z\sqrt2+\mathbb Z\sqrt3+\mathbb Z\sqrt6$ について、(i) $\gamma M\subseteq M$ をすべての生成元に対して確かめ、(ii) $\gamma$ の乗法行列を作り、(iii) $\gamma$ が整数係数モニック多項式 $T^4-10T^2+1$ の根であることを直接にも確かめてください。「生成元が基底かどうか」の確認が整数性判定に必要かも答えてください。

- Level: C

<!-- solution-start -->
**詳細解答**

$M$ は4つの元で生成され $1\in M$ です。$\gamma$ を各生成元に掛けると

$$
\begin{aligned}
\gamma\cdot1&=\sqrt2+\sqrt3,\\
\gamma\cdot\sqrt2&=2+\sqrt6,\\
\gamma\cdot\sqrt3&=3+\sqrt6,\\
\gamma\cdot\sqrt6&=3\sqrt2+2\sqrt3.
\end{aligned}
$$

いずれも4つの生成元の整数係数線形結合です。任意の $m=a+b\sqrt2+c\sqrt3+d\sqrt6$ はこれらの整数線形結合なので $\gamma m\in M$ です。従って (i) が成立し、[有限生成加群の判定](#thm-trn1-integrality-criterion)だけでも整数性が分かります。

生成元の縦ベクトル $u=(1,\sqrt2,\sqrt3,\sqrt6)^{\mathsf T}$ に対して

$$
A=\begin{pmatrix}
0&1&1&0\\
2&0&0&1\\
3&0&0&1\\
0&3&2&0
\end{pmatrix},
\qquad \gamma u=Au.
$$

が (ii) の行列です。さらに直接計算すれば

$$
\gamma^2=(\sqrt2+\sqrt3)^2=5+2\sqrt6,
\quad
(\gamma^2-5)^2=24.
$$

両辺を展開すると

$$
\gamma^4-10\gamma^2+25=24,
\quad
\gamma^4-10\gamma^2+1=0.
$$

$T^4-10T^2+1$ は整数係数モニックであり、(iii) が成立します。念のため (ii) の行列を用いて、[Laplace 展開](../../../基礎科目/LA/LA3C/index.md#thm-la3c-laplace-expansion)でも照合できます。$TI_4-A$ の第1行は $(T,-1,-1,0)$ で、対応する最初の3つの小行列式は順に $T(T^2-5)$、$-2(T^2+1)$、$3(T^2-1)$ です。よって

$
\begin{aligned}
\det(TI_4-A)
&=T\cdot T(T^2-5)-2(T^2+1)-3(T^2-1)\\
&=T^4-10T^2+1.
\end{aligned}
$

この照合とは独立に、(iii) は直前の $\gamma^2$ の計算から成立しています。加群判定に必要なのは整数係数の生成表示・$1\in M$・乗法安定性だけで、生成元の独立性や基底性は必要ありません。
<!-- solution-end -->

## 8. 次章への接続

本章では、代数的整数の和・積を作っても整数性を失わないことを示しました。しかし $\sqrt2$ のような代数的整数自身の絶対値は1以上とは限りません。例えば $(\sqrt5-1)/2$ は代数的整数ですが $0<(\sqrt5-1)/2<1$ です。

次章TRN2では、この種の数を共役にわたって足したり掛けたりすることで、**通常の整数**を取り出す条件を調べます。そこで必要になるのは、共役の有限性、跡・ノルム、非零性を別々に確認することです。
