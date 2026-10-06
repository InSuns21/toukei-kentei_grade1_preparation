# OA2 可換 Banach 環と Gelfand 変換

<!-- definition-example-audit: strict -->

> **既出概念**：[OA1 の単位的 Banach 環](../OA1/index.md#def-oa1-unital-invertible)、[Banach 環のスペクトル](../OA1/index.md#def-oa1-spectrum)、[スペクトルの非空性・コンパクト性](../OA1/index.md#thm-oa1-spectrum-compact-nonempty)、[閉両側イデアルと商 Banach 環](../OA1/index.md#prop-oa1-quotient-banach-algebra)、[FA3 の弱*位相](../FA3/index.md#def-fa3-weak-star-topology)、[FA4 の Banach–Alaoglu](../FA4/index.md#thm-fa4-banach-alaoglu)、[Zorn の補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn)を使います。

OA1 では、元 $a$ のスペクトルを

$$
\sigma_A(a)
=
\{\lambda\in\mathbb C:\lambda1-a\text{ が可逆でない}\}
$$

と定義しました。この定義は一般の Banach 環で動きますが、まだ「スペクトルの各点を何が検出しているのか」は見えていません。

可換な場合には、環全体を複素数へ写す特別な観測器を使えます。加法だけでなく積まで保つ写像

$$
\varphi:A\to\mathbb C
$$

があれば、抽象的な元 $a$ は複素数 $\varphi(a)$ になります。しかも、全てのそのような観測器を集めると、$a$ のスペクトル全体を復元できます。

本章の流れは次です。

~~~
可換 Banach 環
  ↓
積を保つ複素数値の観測器 character
  ↓
character の核は極大イデアル
  ↑
Gelfand--Mazur と Zorn の補題
  ↓
character 空間 Δ(A)
  ↓ 弱*位相
コンパクト Hausdorff 空間
  ↓
a を関数 φ↦φ(a) に変える Gelfand 変換
  ↓
σ_A(a)=â(Δ(A))
~~~

最終的には「抽象的な元を、コンパクト空間上の連続関数として見る」という視点へ到達します。ただし一般の可換 Banach 環では、この変換が元を完全に区別するとは限りません。その失敗例まで確認してから、次章の $C^*$-環へ進みます。

---

## 1. 可換 Banach 環

OA1 の Banach 環では積 $ab$ と $ba$ が一致するとは限りません。本章では、まず積が可換な場合に限定します。

<a id="def-oa2-commutative-banach-algebra"></a>

<!-- formal-statement-start -->
### 定義（可換複素単位的 Banach 環）

複素単位的 Banach 環 $A$ が全ての $a,b\in A$ に対して

$$
ab=ba
$$

を満たすとき、$A$ を **可換複素単位的 Banach 環**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-oa2-commutative-banach-algebra -->

**定義の確認**

### 直接例：$C(K)$

$K$ を非空コンパクト Hausdorff 空間とし、$C(K)$ を複素数値連続関数全体とします。積を点ごとに

$$
(fg)(x)=f(x)g(x)
$$

とすれば

$$
(fg)(x)=(gf)(x)
$$

なので $fg=gf$ です。

一様ノルム

$$
\|f\|_\infty=\max_{x\in K}|f(x)|
$$

について $C(K)$ は Banach 空間であり、

$$
\|fg\|_\infty
\le
\|f\|_\infty\|g\|_\infty
$$

です。定数関数 $1$ が単位元なので、$C(K)$ は可換複素単位的 Banach 環です。

<!-- definition-example-end -->

有限次元では

$$
\mathbb C^n
$$

に成分ごとの積

$$
(z_1,\dots,z_n)(w_1,\dots,w_n)
=
(z_1w_1,\dots,z_nw_n)
$$

を入れたものも基本例です。

---

## 2. character：積まで保つ複素数値の観測器

線形汎関数は加法とスカラー倍を保ちます。本章ではさらに積も保つものだけを選びます。

<a id="def-oa2-character"></a>

<!-- formal-statement-start -->
### 定義（character）

$A$ を可換複素単位的 Banach 環とする。写像

$$
\varphi:A\to\mathbb C
$$

が非零の複素線形写像であり、全ての $a,b\in A$ に対して

$$
\varphi(ab)=\varphi(a)\varphi(b)
$$

を満たすとき、$\varphi$ を $A$ の **character** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-oa2-character -->

**定義の確認**

### 直接例：点評価

$A=C(K)$、$x\in K$ とします。

$$
\varepsilon_x:C(K)\to\mathbb C,
\qquad
\varepsilon_x(f)=f(x)
$$

と置きます。$f,g\in C(K)$、$\alpha,\beta\in\mathbb C$ に対して

$$
\varepsilon_x(\alpha f+\beta g)
=
\alpha f(x)+\beta g(x)
=
\alpha\varepsilon_x(f)+\beta\varepsilon_x(g),
$$

また

$$
\varepsilon_x(fg)
=
f(x)g(x)
=
\varepsilon_x(f)\varepsilon_x(g)
$$

です。さらに

$$
\varepsilon_x(1)=1
$$

なので零写像ではありません。従って $\varepsilon_x$ は character です。

<!-- definition-example-end -->

定義では連続性を仮定していません。ところが Banach 環では、積を保つという条件だけで連続性まで自動的に出ます。

<a id="prop-oa2-character-continuity-spectrum"></a>

<!-- formal-statement-start -->
### 命題（character の自動連続性・ノルム1・スペクトル値性）

$A$ を可換複素単位的 Banach 環、$\varphi$ を $A$ の character とする。このとき

$$
\varphi(1)=1
$$

であり、任意の $a\in A$ に対して

$$
\boxed{
\varphi(a)\in\sigma_A(a)
}
$$

が成り立つ。

さらに $\varphi$ は連続線形汎関数で、

$$
\boxed{
\|\varphi\|=1
}
$$

である。
<!-- formal-statement-end -->

### 証明の見取り図

まず $\varphi(1)$ は

$$
\varphi(1)^2=\varphi(1)
$$

を満たすので $0$ か $1$ です。零写像でないことから $1$ が残ります。

次に $\lambda=\varphi(a)$ と置き、もし $\lambda1-a$ が可逆なら、character を逆元との積へ適用したとき $1=0$ が出て矛盾します。従って $\lambda$ はスペクトルに入り、OA1 のスペクトル評価から連続性が従います。

<!-- proof-start -->
### 証明

乗法性から

$$
\varphi(1)
=
\varphi(1\cdot1)
=
\varphi(1)^2.
$$

複素数 $z$ が $z=z^2$ を満たすなら $z=0$ または $z=1$ です。

もし $\varphi(1)=0$ なら、任意の $a\in A$ について

$$
\varphi(a)
=
\varphi(1a)
=
\varphi(1)\varphi(a)
=
0
$$

となり、$\varphi$ が零写像でないという仮定に反します。従って

$$
\varphi(1)=1.
$$

次に $a\in A$ を固定し、

$$
\lambda=\varphi(a)
$$

と置きます。反対に $\lambda1-a$ が可逆だと仮定し、その逆元を $b$ とします。すると

$$
(\lambda1-a)b=1.
$$

character を適用すると

$$
\varphi(\lambda1-a)\varphi(b)=\varphi(1)=1.
$$

ところが線形性と $\varphi(1)=1$ から

$$
\varphi(\lambda1-a)
=
\lambda-\varphi(a)
=
0.
$$

左辺は $0$ となり矛盾です。従って $\lambda1-a$ は可逆でなく、

$$
\varphi(a)\in\sigma_A(a).
$$

OA1 の[スペクトルのノルム円板評価](../OA1/index.md#thm-oa1-spectrum-compact-nonempty)より

$$
|\varphi(a)|
\le
\|a\|.
$$

従って $\varphi$ は有界線形汎関数で、

$$
\|\varphi\|\le1.
$$

一方

$$
|\varphi(1)|=1,
\qquad
\|1\|=1
$$

なので

$$
\|\varphi\|
\ge
\frac{|\varphi(1)|}{\|1\|}
=
1.
$$

よって

$$
\|\varphi\|=1.
$$

$\square$
<!-- proof-end -->

ここで重要なのは、**character を定義するとき連続性を仮定する必要がない**ことです。Banach 環のスペクトル論が連続性を強制します。

---

## 3. イデアルと極大イデアル

character の核を調べると、単なる部分空間より強い構造が現れます。

<a id="def-oa2-maximal-ideal"></a>

<!-- formal-statement-start -->
### 定義（イデアル・極大イデアル）

$A$ を可換複素単位的 Banach 環とする。線形部分空間 $I\subset A$ が

$$
a\in A,\quad x\in I
\quad\Longrightarrow\quad
ax\in I
$$

を満たすとき、$I$ を $A$ の **イデアル**という。

$I\ne A$ であるイデアルを真のイデアルという。

真のイデアル $M$ が、任意のイデアル $J$ について

$$
M\subset J\subset A
$$

なら

$$
J=M
\quad\text{または}\quad
J=A
$$

を満たすとき、$M$ を **極大イデアル**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-oa2-maximal-ideal -->

**定義の確認**

### 直接例：一点で消える関数

$A=C(K)$、$x\in K$ とし、

$$
M_x
=
\{f\in C(K):f(x)=0\}
$$

と置きます。

$f,g\in M_x$ と $\alpha,\beta\in\mathbb C$ に対して

$$
(\alpha f+\beta g)(x)=0
$$

なので $M_x$ は線形部分空間です。また $h\in C(K)$ と $f\in M_x$ なら

$$
(hf)(x)=h(x)f(x)=0
$$

なので $hf\in M_x$ です。

さらに $1(x)=1$ なので $1\notin M_x$、従って $M_x$ は真のイデアルです。

実は

$$
M_x=\ker\varepsilon_x
$$

であり、後で character の核は必ず極大イデアルであることを証明します。

<!-- definition-example-end -->

OA1 では閉両側イデアルを先に扱いました。本章では「極大」という代数的条件から、閉性が後から従うことを示します。

<a id="prop-oa2-maximal-ideal-closed"></a>

<!-- formal-statement-start -->
### 命題（極大イデアルは閉である）

$A$ を可換複素単位的 Banach 環、$M$ を極大イデアルとする。このとき $M$ はノルム位相で閉である。
<!-- formal-statement-end -->

### 証明の見取り図

閉包 $\overline M$ もイデアルです。極大性から $\overline M=M$ または $\overline M=A$ です。

もし $\overline M=A$ なら $1$ に十分近い $m\in M$ が取れます。OA1 の [Banach 環の Neumann 級数](../OA1/index.md#lem-oa1-neumann-series)により、その $m$ は可逆になります。しかし真のイデアルは可逆元を含めません。

<!-- proof-start -->
### 証明

積の連続性から $\overline M$ はイデアルです。実際 $x_n\in M$、$x_n\to x$、$a\in A$ なら

$$
ax_n\to ax
$$

であり、各 $ax_n\in M$ なので $ax\in\overline M$ です。

従って

$$
M\subset\overline M\subset A.
$$

$M$ は極大なので

$$
\overline M=M
$$

または

$$
\overline M=A
$$

です。

後者を仮定します。すると $1\in\overline M$ なので、ある $m\in M$ が存在して

$$
\|1-m\|<1
$$

となります。

OA1 の[Banach 環の Neumann 級数](../OA1/index.md#lem-oa1-neumann-series)を $x=1-m$ に適用すると

$$
m=1-(1-m)
$$

は可逆です。

$m^{-1}\in A$ かつ $m\in M$ なので、イデアル性から

$$
1=m^{-1}m\in M.
$$

すると任意の $a\in A$ について $a=a1\in M$ となり $M=A$ です。これは $M$ が真のイデアルであることに反します。

従って $\overline M=A$ は不可能で、

$$
\overline M=M.
$$

つまり $M$ は閉です。$\square$
<!-- proof-end -->

次に「極大イデアルが必要なら本当に取れるのか」を確認します。

<a id="lem-oa2-maximal-ideal-extension"></a>

<!-- formal-statement-start -->
### 補題（真のイデアルは極大イデアルへ延長できる）

$A$ を可換複素単位的 Banach 環、$I\subsetneq A$ を真のイデアルとする。このとき

$$
I\subset M
$$

を満たす極大イデアル $M$ が存在する。
<!-- formal-statement-end -->

### 証明の見取り図

$I$ を含む真のイデアル全体を包含関係で並べ、[Zorn の補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn)を使います。

核心は、鎖の合併が再び真のイデアルになることです。合併に $1$ が入るなら、鎖のどれか一つに $1$ が入ってしまいます。

<!-- proof-start -->
### 証明

候補集合を

$$
\mathcal P
=
\{J:I\subset J\subsetneq A,\ J\text{ はイデアル}\}
$$

とし、包含関係で順序付けます。$I\in\mathcal P$ なので $\mathcal P$ は非空です。

$\mathcal C\subset\mathcal P$ を鎖とします。

$\mathcal C=\varnothing$ なら $I$ が上界です。以下 $\mathcal C\ne\varnothing$ とします。

$$
U
=
\bigcup_{J\in\mathcal C}J
$$

と置きます。

まず $U$ が線形部分空間であることを確認します。$x,y\in U$ なら、ある $J_x,J_y\in\mathcal C$ が存在して

$$
x\in J_x,
\qquad
y\in J_y.
$$

$\mathcal C$ は鎖なので、例えば $J_x\subset J_y$ とできます。このとき $x,y\in J_y$ だから

$$
\alpha x+\beta y\in J_y\subset U.
$$

また $a\in A$、$x\in U$ なら、ある $J\in\mathcal C$ について $x\in J$ であり、

$$
ax\in J\subset U.
$$

従って $U$ はイデアルです。

全ての $J\in\mathcal C$ は $I$ を含むので $I\subset U$ です。

最後に $U\ne A$ を示します。もし $U=A$ なら $1\in U$ なので、ある $J\in\mathcal C$ に $1\in J$ となります。すると $J=A$ であり、$J\in\mathcal P$ が真のイデアルであることに反します。

従って $U\in\mathcal P$ であり、$U$ は鎖 $\mathcal C$ の上界です。

[Zorn の補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn)より $\mathcal P$ に極大元 $M$ が存在します。これは $I$ を含む極大イデアルです。$\square$
<!-- proof-end -->

---

## 4. Gelfand--Mazur：Banach 可除代数は複素数しかない

極大イデアル $M$ で商を取ると、商 $A/M$ では「非零元は全て可逆」という状況が現れます。そのとき Banach 構造が非常に強く働きます。

<a id="def-oa2-division-banach-algebra"></a>

<!-- formal-statement-start -->
### 定義（複素 Banach 可除代数）

複素単位的 Banach 環 $B$ の全ての非零元が可逆であるとき、$B$ を **複素 Banach 可除代数**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-oa2-division-banach-algebra -->

**定義の確認**

### 直接例：$\mathbb C$

通常の絶対値ノルムを持つ $\mathbb C$ は複素単位的 Banach 環です。

$z\ne0$ なら

$$
z^{-1}=\frac1z
$$

が存在するので、全ての非零元は可逆です。従って $\mathbb C$ は複素 Banach 可除代数です。

<!-- definition-example-end -->

驚くべきことに、複素数体上ではこれ以外の Banach 可除代数はありません。

<a id="thm-oa2-gelfand-mazur"></a>

<!-- formal-statement-start -->
### 定理（Gelfand--Mazur）

$B$ を複素単位的 Banach 可除代数とする。このとき任意の $b\in B$ に対して、ある唯一の $\lambda\in\mathbb C$ が存在し

$$
b=\lambda1
$$

となる。

従って写像

$$
\mathbb C\to B,
\qquad
\lambda\mapsto\lambda1
$$

は単位元を保つ等長な代数同型である。
<!-- formal-statement-end -->

### 証明の見取り図

$b\in B$ を一つ取ります。OA1 により $\sigma_B(b)$ は空ではありません。

$\lambda\in\sigma_B(b)$ を取ると $\lambda1-b$ は非可逆です。一方 $B$ では「非零なら可逆」なので、非可逆であるためには

$$
\lambda1-b=0
$$

しかありません。

<!-- proof-start -->
### 証明

$b\in B$ を固定します。

OA1 の[スペクトルの非空性](../OA1/index.md#thm-oa1-spectrum-compact-nonempty)より

$$
\sigma_B(b)\ne\varnothing.
$$

従ってある $\lambda\in\mathbb C$ が存在して

$$
\lambda\in\sigma_B(b)
$$

となります。

スペクトルの定義から $\lambda1-b$ は可逆ではありません。

$B$ は可除代数なので、非零元は全て可逆です。従って $\lambda1-b$ が非可逆であるためには

$$
\lambda1-b=0
$$

でなければならず、

$$
b=\lambda1
$$

です。

一意性も確認します。もし

$$
\lambda1=\mu1
$$

なら

$$
(\lambda-\mu)1=0.
$$

$\|1\|=1$ なので $1\ne0$ であり、従って $\lambda-\mu=0$、すなわち $\lambda=\mu$ です。

最後に

$$
\|\lambda1\|
=
|\lambda|\,\|1\|
=
|\lambda|
$$

なので $\lambda\mapsto\lambda1$ は等長です。$\square$
<!-- proof-end -->

この定理は、極大イデアルによる商を「実は $\mathbb C$ そのもの」と読むための鍵です。

---

## 5. character と極大イデアルは同じ情報を持つ

まず character から極大イデアルを作ります。

$\varphi$ が character なら

$$
\ker\varphi
=
\{a\in A:\varphi(a)=0\}
$$

はイデアルです。実際 $x\in\ker\varphi$、$a\in A$ なら

$$
\varphi(ax)=\varphi(a)\varphi(x)=0.
$$

さらに $\varphi(1)=1$ なので $1\notin\ker\varphi$ であり、真のイデアルです。

逆向きでは極大イデアル $M$ から商 $A/M$ を作ります。

<a id="thm-oa2-character-maximal-ideal"></a>

<!-- formal-statement-start -->
### 定理（character と極大イデアルの対応）

$A$ を可換複素単位的 Banach 環とする。

1. 任意の character $\varphi$ に対して $\ker\varphi$ は極大イデアルである。
2. 任意の極大イデアル $M$ に対して、ただ一つの character $\varphi_M$ が存在して

$$
\ker\varphi_M=M
$$

となる。

従って

$$
\varphi\longmapsto\ker\varphi
$$

は character 全体と極大イデアル全体の一対一対応を与える。
<!-- formal-statement-end -->

### 証明の見取り図

character の核が極大であることは、核より大きいイデアルに $\varphi(a)\ne0$ の元が一つ入れば、そこから $1$ を作れることで示します。

逆向きでは極大イデアル $M$ が閉であることを使い、OA1 の商 Banach 環 $A/M$ を作ります。極大性から $A/M$ の全ての非零元が可逆になり、Gelfand--Mazur によって $A/M\cong\mathbb C$ です。

<!-- proof-start -->
### 証明

#### 1. character の核は極大

$\varphi$ を character とし、

$$
M=\ker\varphi
$$

と置きます。

$J$ を

$$
M\subsetneq J\subset A
$$

を満たすイデアルとします。$M\subsetneq J$ なので、ある $a\in J$ が存在して

$$
a\notin M.
$$

従って

$$
\varphi(a)\ne0.
$$

一方

$$
a-\varphi(a)1
$$

に character を適用すると

$$
\varphi(a-\varphi(a)1)
=
\varphi(a)-\varphi(a)\varphi(1)
=
0.
$$

よって

$$
a-\varphi(a)1\in M\subset J.
$$

$a\in J$ なので差を取り、

$$
\varphi(a)1
=
a-(a-\varphi(a)1)
\in J.
$$

$\varphi(a)\ne0$ だからスカラー倍して

$$
1\in J.
$$

従って $J=A$ です。よって $M$ は極大イデアルです。

#### 2. 極大イデアルから character を作る

$M$ を極大イデアルとします。[極大イデアルは閉](#prop-oa2-maximal-ideal-closed)なので、OA1 の[商 Banach 環](../OA1/index.md#prop-oa1-quotient-banach-algebra)を使えます。

$$
A/M
$$

は可換複素単位的 Banach 環です。

$a+M\ne0+M$ とします。これは $a\notin M$ を意味します。

$M$ と $a$ が生成するイデアルは $M$ より真に大きいので、極大性から $A$ 全体です。可換性により

$$
M+Aa=A.
$$

従ってある $m\in M$ と $b\in A$ が存在して

$$
m+ba=1.
$$

商へ移すと

$$
(b+M)(a+M)
=
ba+M
=
1+M.
$$

可換なので逆順の積も同じです。従って $a+M$ は可逆です。

よって $A/M$ は複素 Banach 可除代数です。[Gelfand--Mazur](#thm-oa2-gelfand-mazur)より、各 $a\in A$ に対して一意な複素数 $\lambda$ が存在して

$$
a+M=\lambda(1+M)
$$

となります。

この $\lambda$ を

$$
\varphi_M(a)=\lambda
$$

と定めます。

商での加法・スカラー倍・積を比較すれば

$$
\varphi_M(a+b)=\varphi_M(a)+\varphi_M(b),
$$

$$
\varphi_M(\alpha a)=\alpha\varphi_M(a),
$$

$$
\varphi_M(ab)=\varphi_M(a)\varphi_M(b)
$$

が従います。また

$$
\varphi_M(1)=1
$$

なので非零です。従って $\varphi_M$ は character です。

さらに

$$
\varphi_M(a)=0
\quad\Longleftrightarrow\quad
a+M=0+M
\quad\Longleftrightarrow\quad
a\in M,
$$

よって

$$
\ker\varphi_M=M.
$$

最後に同じ核 $M$ を持つ character $\psi$ があれば、$a-\psi(a)1\in M$ なので

$$
a+M=\psi(a)(1+M).
$$

複素数係数の一意性から

$$
\psi(a)=\varphi_M(a)
$$

です。従って character は一意です。$\square$
<!-- proof-end -->

この定理と[極大イデアルへの延長](#lem-oa2-maximal-ideal-extension)を $I=\{0\}$ に適用すると、character が少なくとも一つ存在することも分かります。

---

## 6. character 空間と Gelfand 位相

character を一つだけ見るのではなく、全部を一つの空間として扱います。

<a id="def-oa2-character-space-gelfand-topology"></a>

<!-- formal-statement-start -->
### 定義（character 空間・Gelfand 位相）

$A$ を可換複素単位的 Banach 環とする。$A$ の character 全体を

$$
\Delta(A)
$$

と書き、**character 空間**という。

各 character は連続でノルム1なので

$$
\Delta(A)\subset A^*
$$

とみなせる。

$A^*$ の弱*位相

$$
\sigma(A^*,A)
$$

を $\Delta(A)$ に制限して得られる部分空間位相を **Gelfand 位相**という。
<!-- formal-statement-end -->

言い換えると、Gelfand 位相は全ての $a\in A$ について評価写像

$$
\Delta(A)\to\mathbb C,
\qquad
\varphi\mapsto\varphi(a)
$$

を連続にする位相です。

<!-- definition-example-start: def-oa2-character-space-gelfand-topology -->

**定義の確認**

### 直接例：$\mathbb C^2$

$$
A=\mathbb C^2
$$

に成分ごとの積を入れます。

$$
e_1=(1,0),
\qquad
e_2=(0,1)
$$

とすると

$$
e_1^2=e_1,
\qquad
e_2^2=e_2,
\qquad
e_1+e_2=1.
$$

character $\varphi$ に対して

$$
\varphi(e_j)^2=\varphi(e_j)
$$

なので $\varphi(e_j)$ は $0$ または $1$ です。また

$$
\varphi(e_1)+\varphi(e_2)=\varphi(1)=1
$$

だから、ちょうど一方が $1$ です。

従って character は

$$
\varepsilon_1(z_1,z_2)=z_1,
\qquad
\varepsilon_2(z_1,z_2)=z_2
$$

の二つだけです。

さらに

$$
U_1
=
\{\varphi\in\Delta(A):|\varphi(e_1)-1|<1/2\}
$$

は弱*開集合の $\Delta(A)$ への制限であり、

$$
U_1=\{\varepsilon_1\}.
$$

$e_2$ を使って

$
U_2
=
\{\varphi\in\Delta(A):|\varphi(e_2)-1|<1/2\}
=
\{\varepsilon_2\}
$

も開です。従って $\Delta(\mathbb C^2)$ は2点離散空間です。

<!-- definition-example-end -->

無限次元でも character 空間は非常によい位相空間になります。

<a id="thm-oa2-character-space-compact"></a>

<!-- formal-statement-start -->
### 定理（character 空間はコンパクト Hausdorff）

$A$ を可換複素単位的 Banach 環とする。Gelfand 位相を入れた

$$
\Delta(A)
$$

は非空なコンパクト Hausdorff 空間である。
<!-- formal-statement-end -->

### 証明の見取り図

全 character はノルム1なので、$\Delta(A)$ は $A^*$ の閉単位球に入ります。

FA4 の Banach–Alaoglu により閉単位球は弱*コンパクトです。そこで $\Delta(A)$ が弱*閉であることを示します。character のネットの弱*極限では、各 $a$ で値が収束するため、乗法性も極限へ移ります。

Hausdorff 性は、異なる二つの character をある $a\in A$ の値で分離すれば直接示せます。

<!-- proof-start -->
### 証明

[character のノルム1](#prop-oa2-character-continuity-spectrum)より

$$
\Delta(A)\subset B_{A^*}
=
\{\psi\in A^*:\|\psi\|\le1\}.
$$

FA4 の[Banach–Alaoglu](../FA4/index.md#thm-fa4-banach-alaoglu)により $B_{A^*}$ は弱*コンパクトです。

$\Delta(A)$ が $B_{A^*}$ の弱*閉集合であることを示します。

$(\varphi_\alpha)$ を $\Delta(A)$ のネットとし、弱*位相で

$$
\varphi_\alpha\overset{*}{\rightharpoonup}\psi
$$

とします。$\psi\in B_{A^*}$ です。

弱*収束の定義から任意の $a\in A$ に対して

$$
\varphi_\alpha(a)\to\psi(a).
$$

特に

$$
\psi(1)
=
\lim_\alpha\varphi_\alpha(1)
=
1,
$$

なので $\psi$ は零写像ではありません。

また任意の $a,b\in A$ について

$$
\psi(ab)
=
\lim_\alpha\varphi_\alpha(ab).
$$

各 $\varphi_\alpha$ は乗法的なので

$$
\varphi_\alpha(ab)
=
\varphi_\alpha(a)\varphi_\alpha(b).
$$

複素数の積は連続だから

$$
\lim_\alpha
\varphi_\alpha(a)\varphi_\alpha(b)
=
\psi(a)\psi(b).
$$

従って

$$
\psi(ab)=\psi(a)\psi(b).
$$

$\psi$ は $A^*$ の元なので既に複素線形です。よって $\psi$ は character です。

従って $\Delta(A)$ は $B_{A^*}$ の弱*閉集合です。コンパクト空間の閉部分集合なので $\Delta(A)$ はコンパクトです。

非空性は前節で確認しました。

最後に Hausdorff 性を示します。$\varphi,\psi\in\Delta(A)$、$\varphi\ne\psi$ とします。ある $a\in A$ が存在して

$$
\varphi(a)\ne\psi(a).
$$

複素平面で $\varphi(a)$ と $\psi(a)$ を含む互いに素な開円板 $D_\varphi,D_\psi$ を取ります。評価写像

$$
\chi_a:\Delta(A)\to\mathbb C,
\qquad
\chi_a(\eta)=\eta(a)
$$

は Gelfand 位相の定義により連続です。

従って

$$
\chi_a^{-1}(D_\varphi),
\qquad
\chi_a^{-1}(D_\psi)
$$

は互いに素な開近傍で、それぞれ $\varphi,\psi$ を含みます。よって $\Delta(A)$ は Hausdorff です。$\square$
<!-- proof-end -->

---

## 7. Gelfand 変換：元を character 空間上の関数へ変える

ここまでで $\Delta(A)$ がコンパクト Hausdorff 空間になりました。そこで $a\in A$ を固定し、各 character が $a$ に返す複素数を並べます。

<a id="def-oa2-gelfand-transform"></a>

<!-- formal-statement-start -->
### 定義（Gelfand 変換）

$A$ を可換複素単位的 Banach 環とする。各 $a\in A$ に対して

$$
\widehat a:\Delta(A)\to\mathbb C
$$

を

$$
\boxed{
\widehat a(\varphi)=\varphi(a)
}
$$

で定める。

Gelfand 位相の定義により $\widehat a$ は連続である。

写像

$$
\Gamma:A\to C(\Delta(A)),
\qquad
\Gamma(a)=\widehat a
$$

を **Gelfand 変換**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-oa2-gelfand-transform -->

**定義の確認**

### 直接例：$\mathbb C^2$

前節で

$$
\Delta(\mathbb C^2)
=
\{\varepsilon_1,\varepsilon_2\}
$$

でした。

$a=(a_1,a_2)$ に対して

$$
\widehat a(\varepsilon_1)=a_1,
\qquad
\widehat a(\varepsilon_2)=a_2.
$$

従って Gelfand 変換は、$(a_1,a_2)$ を2点空間上で値 $a_1,a_2$ を取る関数へ写しています。

<!-- definition-example-end -->

Gelfand 変換は、加法や積を壊しません。

<a id="prop-oa2-gelfand-transform-homomorphism"></a>

<!-- formal-statement-start -->
### 命題（Gelfand 変換は縮小的な単位的代数準同型）

$A$ を可換複素単位的 Banach 環とする。任意の $a,b\in A$、$\alpha,\beta\in\mathbb C$ に対して

$$
\widehat{\alpha a+\beta b}
=
\alpha\widehat a+\beta\widehat b,
$$

$$
\widehat{ab}
=
\widehat a\,\widehat b,
$$

$$
\widehat1=1
$$

が成り立つ。

さらに

$$
\boxed{
\|\widehat a\|_\infty\le\|a\|
}
$$

である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\varphi\in\Delta(A)$ を任意に取ります。線形性から

$$
\widehat{\alpha a+\beta b}(\varphi)
=
\varphi(\alpha a+\beta b)
=
\alpha\varphi(a)+\beta\varphi(b)
=
\alpha\widehat a(\varphi)+\beta\widehat b(\varphi).
$$

乗法性から

$$
\widehat{ab}(\varphi)
=
\varphi(ab)
=
\varphi(a)\varphi(b)
=
\widehat a(\varphi)\widehat b(\varphi).
$$

また

$$
\widehat1(\varphi)
=
\varphi(1)
=
1.
$$

従って $\Gamma$ は単位的代数準同型です。

さらに全 character はノルム1なので

$$
|\widehat a(\varphi)|
=
|\varphi(a)|
\le
\|a\|.
$$

$\varphi\in\Delta(A)$ について上限を取れば

$$
\|\widehat a\|_\infty
\le
\|a\|.
$$

$\square$
<!-- proof-end -->

この段階では、Gelfand 変換が単射であるとはまだ言っていません。次のスペクトル表示は常に成り立ちますが、「異なる元を必ず異なる関数へ送る」ためには追加構造が必要です。

---

## 8. スペクトルは全 character の値として復元できる

character の値がスペクトルに入ることは既に証明しました。難しいのは逆向きです。

$\lambda\in\sigma_A(a)$ なら

$$
\lambda1-a
$$

は可逆ではありません。可換環では、この元が生成するイデアルを極大イデアルまで拡張し、その極大イデアルに対応する character を使えます。

<a id="thm-oa2-spectrum-character"></a>

<!-- formal-statement-start -->
### 定理（可換 Banach 環のスペクトルの character 表示）

$A$ を可換複素単位的 Banach 環、$a\in A$ とする。このとき

$$
\boxed{
\sigma_A(a)
=
\{\varphi(a):\varphi\in\Delta(A)\}
=
\widehat a(\Delta(A)).
}
$$
<!-- formal-statement-end -->

### 証明の見取り図

一方の包含

$$
\widehat a(\Delta(A))\subset\sigma_A(a)
$$

は [character のスペクトル値性](#prop-oa2-character-continuity-spectrum)です。

逆向きでは $\lambda\in\sigma_A(a)$ を取り、

$$
x=\lambda1-a
$$

と置きます。$x$ が生成するイデアル $Ax$ は真です。もし $1\in Ax$ なら $bx=1$ となり、可換性から $x$ は可逆になってしまうからです。

そこで $Ax$ を極大イデアル $M$ へ延長し、$M=\ker\varphi$ となる character を取ります。

<!-- proof-start -->
### 証明

まず $\varphi\in\Delta(A)$ とします。[character のスペクトル値性](#prop-oa2-character-continuity-spectrum)から

$$
\varphi(a)\in\sigma_A(a).
$$

従って

$$
\widehat a(\Delta(A))
\subset
\sigma_A(a).
$$

逆に

$$
\lambda\in\sigma_A(a)
$$

とします。

$$
x=\lambda1-a
$$

と置きます。スペクトルの定義より $x$ は可逆ではありません。

$x$ が生成するイデアル

$$
Ax=\{bx:b\in A\}
$$

を考えます。

もし $Ax=A$ なら $1\in Ax$ なので、ある $b\in A$ が存在して

$$
bx=1
$$

となります。$A$ は可換なので

$$
xb=bx=1.
$$

従って $x$ は可逆です。これは矛盾です。

よって $Ax$ は真のイデアルです。

[極大イデアルへの延長補題](#lem-oa2-maximal-ideal-extension)により、ある極大イデアル $M$ が存在して

$$
Ax\subset M
$$

となります。

[character と極大イデアルの対応](#thm-oa2-character-maximal-ideal)により、ある character $\varphi$ が存在して

$$
M=\ker\varphi.
$$

$x\in Ax\subset M$ なので

$$
\varphi(x)=0.
$$

$x=\lambda1-a$ と $\varphi(1)=1$ を代入すると

$$
0
=
\varphi(\lambda1-a)
=
\lambda-\varphi(a).
$$

従って

$$
\lambda=\varphi(a)=\widehat a(\varphi).
$$

よって

$$
\sigma_A(a)
\subset
\widehat a(\Delta(A)).
$$

二つの包含を合わせて

$$
\sigma_A(a)
=
\widehat a(\Delta(A)).
$$

$\square$
<!-- proof-end -->

OA1 ではスペクトルを「非可逆になる $\lambda$」として見ました。可換な場合には同じ集合を

> 全ての multiplicative な複素数値観測器が $a$ に返す値

として読み替えられます。

<a id="cor-oa2-gelfand-spectral-radius"></a>

<!-- formal-statement-start -->
### 系（Gelfand 変換の一様ノルムはスペクトル半径）

$A$ を可換複素単位的 Banach 環、$a\in A$ とする。このとき

$$
\boxed{
\|\widehat a\|_\infty
=
r_A(a).
}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

character 空間 $\Delta(A)$ はコンパクトで、$\widehat a$ は連続なので

$$
\widehat a(\Delta(A))
$$

もコンパクトです。

前定理から

$$
\widehat a(\Delta(A))
=
\sigma_A(a).
$$

従って

$$
\begin{aligned}
\|\widehat a\|_\infty
&=
\max_{\varphi\in\Delta(A)}|\widehat a(\varphi)|\\
&=
\max_{\lambda\in\sigma_A(a)}|\lambda|\\
&=
r_A(a).
\end{aligned}
$$

$\square$
<!-- proof-end -->

ここで

$$
r_A(a)\le\|a\|
$$

なので、前節の縮小評価も回収できます。

---

## 9. 基本例 $C(K)$：点評価が抽象理論を具体化する

$A=C(K)$ では各 $x\in K$ が character

$$
\varepsilon_x(f)=f(x)
$$

を与えました。

従って Gelfand 変換された関数 $\widehat f$ は少なくとも評価 character 上で

$$
\widehat f(\varepsilon_x)
=
f(x)
$$

を満たします。

つまり元の関数 $f$ の値は、そのまま Gelfand 変換の値として再現されます。

特に

$$
K=[0,1]
$$

では、実は character は点評価しかありません。ここは抽象定理を具体例で確かめておきます。

### $C([0,1])$ の極大イデアルは一点で消える関数全体

$M$ を $C([0,1])$ の極大イデアルとします。

反対に、各 $x\in[0,1]$ に対して $f_x\in M$ が存在し

$$
f_x(x)\ne0
$$

だと仮定します。

連続性から各 $x$ の近傍 $U_x$ が存在して、$U_x$ 上で $f_x$ は零になりません。$[0,1]$ はコンパクトなので、有限個

$$
x_1,\dots,x_n
$$

を選んで

$$
[0,1]
=
U_{x_1}\cup\cdots\cup U_{x_n}
$$

とできます。

$$
g
=
\sum_{j=1}^{n}|f_{x_j}|^2
$$

と置きます。

各 $f_{x_j}\in M$ であり、$\overline{f_{x_j}}\in C([0,1])$ なので

$$
|f_{x_j}|^2
=
f_{x_j}\overline{f_{x_j}}
\in M.
$$

従って $g\in M$ です。

一方、各 $t\in[0,1]$ では少なくとも一つの $f_{x_j}(t)$ が非零なので

$$
g(t)>0.
$$

コンパクト性により

$$
m=\min_{t\in[0,1]}g(t)>0.
$$

従って $1/g\in C([0,1])$ であり、$g$ は可逆です。

しかし真のイデアル $M$ が可逆元 $g$ を含めば

$$
1=g^{-1}g\in M
$$

となり矛盾です。

従ってある $x_0\in[0,1]$ が存在して

$$
f(x_0)=0
\qquad
\text{for all }f\in M.
$$

つまり

$$
M\subset M_{x_0}.
$$

$M$ は極大で $M_{x_0}$ は真のイデアルなので

$$
M=M_{x_0}.
$$

character $\varphi$ に対して $M=\ker\varphi$ とすれば、ある $x_0$ について

$$
\ker\varphi=M_{x_0}.
$$

任意の $f\in C([0,1])$ について

$$
f-f(x_0)1\in M_{x_0}=\ker\varphi
$$

だから

$$
\varphi(f)=f(x_0).
$$

従って

$$
\boxed{
\varphi=\varepsilon_{x_0}.
}
$$

さらに座標関数 $u(t)=t$ を使えば

$$
\varepsilon_x(u)=x
$$

なので異なる点は異なる character を与えます。

したがって

$$
\Delta(C([0,1]))
$$

は点評価を通して $[0,1]$ そのものとして読めます。

---

## 10. 一般の可換 Banach 環では Gelfand 変換が元を潰すことがある

$C(K)$ の例だけを見ると、Gelfand 変換はいつでも元を完全に復元するように見えます。しかし一般の可換 Banach 環ではそうではありません。

ベクトル空間

$$
A=\mathbb C^2
$$

に、通常の成分積ではなく

$$
(\alpha,\beta)(\gamma,\delta)
=
(\alpha\gamma,\alpha\delta+\beta\gamma)
$$

という積を入れます。

ノルムを

$$
\|(\alpha,\beta)\|
=
|\alpha|+|\beta|
$$

とします。積について

$$
\begin{aligned}
\|(\alpha,\beta)(\gamma,\delta)\|
&=
|\alpha\gamma|
+
|\alpha\delta+\beta\gamma|\\
&\le
|\alpha||\gamma|
+
|\alpha||\delta|
+
|\beta||\gamma|\\
&\le
(|\alpha|+|\beta|)(|\gamma|+|\delta|)
\end{aligned}
$$

なので Banach 環です。有限次元だから完備で、単位元は

$$
1=(1,0)
$$

です。積は可換です。

$$
\varepsilon=(0,1)
$$

と置くと

$$
\varepsilon^2=(0,0).
$$

従って $\varepsilon$ は非零の冪零元です。

character $\varphi$ に対して

$$
\varphi(\varepsilon)^2
=
\varphi(\varepsilon^2)
=
0
$$

なので

$$
\varphi(\varepsilon)=0.
$$

また任意の $(\alpha,\beta)$ は

$$
(\alpha,\beta)
=
\alpha1+\beta\varepsilon
$$

だから

$$
\varphi(\alpha,\beta)
=
\alpha.
$$

従って character は一つしかなく、

$$
\Delta(A)=\{\varphi\},
\qquad
\varphi(\alpha,\beta)=\alpha.
$$

特に

$$
\widehat\varepsilon=0
$$

ですが

$$
\varepsilon\ne0.
$$

よって Gelfand 変換は単射ではありません。

さらにスペクトルも直接計算できます。$\lambda\ne0$ なら

$
(\lambda1-\varepsilon)
\left(
\lambda^{-1}1+\lambda^{-2}\varepsilon
\right)
=
1
$

です。逆順の積も同じなので、$\lambda1-\varepsilon$ は可逆です。一方 $\varepsilon^2=0$ かつ $\varepsilon\ne0$ なので $\varepsilon$ 自身は可逆ではありません。従って

$
\sigma_A(\varepsilon)=\{0\}.
$

したがって

$
r_A(\varepsilon)=0
$

ですが

$$
\|\varepsilon\|=1.
$$

本章の

$$
\|\widehat a\|_\infty=r_A(a)
$$

は正しい一方で、一般には

$$
r_A(a)=\|a\|
$$

ではありません。

この差を埋める追加構造が、次章から導入する随伴と $C^*$-恒等式です。

---

# 演習

## Level A

### A1. 点評価 character

- Level: A

$K$ を非空コンパクト Hausdorff 空間、$x\in K$ とする。

$$
\varepsilon_x(f)=f(x)
$$

で定まる $\varepsilon_x:C(K)\to\mathbb C$ について、次を示せ。

1. $\varepsilon_x$ は character である。
2. $\|\varepsilon_x\|=1$ である。
3. 任意の $f\in C(K)$ について

$$
f(x)\in\sigma_{C(K)}(f)
$$

である。

<!-- solution-start -->
### 詳細解答

#### 1. character であること

$f,g\in C(K)$、$\alpha,\beta\in\mathbb C$ に対して

$$
\varepsilon_x(\alpha f+\beta g)
=
\alpha f(x)+\beta g(x)
=
\alpha\varepsilon_x(f)+\beta\varepsilon_x(g)
$$

なので複素線形です。

また

$$
\varepsilon_x(fg)
=
(fg)(x)
=
f(x)g(x)
=
\varepsilon_x(f)\varepsilon_x(g)
$$

なので乗法的です。

さらに

$$
\varepsilon_x(1)=1
$$

だから零写像ではありません。従って character です。

#### 2. ノルム

任意の $f$ に対して

$$
|\varepsilon_x(f)|
=
|f(x)|
\le
\|f\|_\infty
$$

なので

$$
\|\varepsilon_x\|\le1.
$$

定数関数 $1$ を使えば

$$
\|1\|_\infty=1,
\qquad
|\varepsilon_x(1)|=1
$$

だから

$$
\|\varepsilon_x\|\ge1.
$$

従って

$$
\|\varepsilon_x\|=1.
$$

#### 3. スペクトル

character のスペクトル値性を使えば直ちに

$$
\varepsilon_x(f)=f(x)\in\sigma_{C(K)}(f).
$$

直接確認するなら、もし $f(x)1-f$ が可逆なら、その逆元 $g$ に対して

$$
(f(x)-f(x))g(x)=1
$$

すなわち $0=1$ となり矛盾です。

従って $f(x)1-f$ は可逆でなく、

$$
f(x)\in\sigma_{C(K)}(f).
$$
<!-- solution-end -->

### A2. $\mathbb C^n$ の character を分類する

- Level: A

$$
A=\mathbb C^n
$$

に成分ごとの積を入れる。$A$ の character は

$$
\varepsilon_j(z_1,\dots,z_n)=z_j
\qquad
(j=1,\dots,n)
$$

だけであることを示せ。

<!-- solution-start -->
### 詳細解答

標準基底を

$$
e_j=(0,\dots,0,1,0,\dots,0)
$$

とします。

成分積では

$$
e_j^2=e_j.
$$

character $\varphi$ を取ると

$$
\varphi(e_j)^2
=
\varphi(e_j^2)
=
\varphi(e_j).
$$

従って

$$
\varphi(e_j)\in\{0,1\}.
$$

また

$$
1=e_1+\cdots+e_n
$$

なので

$$
1
=
\varphi(1)
=
\sum_{j=1}^{n}\varphi(e_j).
$$

各項は $0$ または $1$ なので、ちょうど一つの添字 $j_0$ について

$$
\varphi(e_{j_0})=1
$$

であり、それ以外では $0$ です。

任意の $z=(z_1,\dots,z_n)$ は

$$
z=\sum_{j=1}^{n}z_je_j
$$

だから

$$
\varphi(z)
=
\sum_{j=1}^{n}z_j\varphi(e_j)
=
z_{j_0}.
$$

従って

$$
\varphi=\varepsilon_{j_0}.
$$

逆に各 $\varepsilon_j$ は座標評価なので複素線形であり、成分ごとの積に対して

$
\varepsilon_j(zw)=z_jw_j=\varepsilon_j(z)\varepsilon_j(w)
$

を満たします。また $\varepsilon_j(1)=1$ なので非零です。従って各 $\varepsilon_j$ は character です。

よって

$$
\Delta(\mathbb C^n)
=
\{\varepsilon_1,\dots,\varepsilon_n\}.
$$
<!-- solution-end -->

### A3. 一点で消える関数と商

- Level: A

$A=C([0,1])$、$x_0\in[0,1]$ とし、

$$
M_{x_0}
=
\{f\in A:f(x_0)=0\}
$$

とする。

1. $M_{x_0}$ が閉極大イデアルであることを示せ。
2. 写像

$$
T:A/M_{x_0}\to\mathbb C,
\qquad
T(f+M_{x_0})=f(x_0)
$$

が well-defined な単位的代数同型であることを示せ。

<!-- solution-start -->
### 詳細解答

#### 1. 閉極大イデアル

$M_{x_0}$ がイデアルで真であることは本文で確認しました。

閉性は点評価

$$
\varepsilon_{x_0}:A\to\mathbb C
$$

が連続で

$$
M_{x_0}=\ker\varepsilon_{x_0}
$$

だから従います。

極大性を直接示します。

$J$ を

$$
M_{x_0}\subsetneq J
$$

を満たすイデアルとします。ある $f\in J$ が存在して

$$
f(x_0)\ne0.
$$

$$
g=f-f(x_0)1
$$

と置くと

$$
g(x_0)=0
$$

なので $g\in M_{x_0}\subset J$ です。

従って

$$
f(x_0)1=f-g\in J.
$$

$f(x_0)\ne0$ なので $1\in J$、よって $J=A$ です。

従って $M_{x_0}$ は極大です。

#### 2. 商から $\mathbb C$ への写像

まず well-defined 性を確認します。

$$
f+M_{x_0}=g+M_{x_0}
$$

なら

$$
f-g\in M_{x_0},
$$

従って

$$
f(x_0)-g(x_0)=0.
$$

よって $f(x_0)=g(x_0)$ で、$T$ は代表元によらず定まります。

加法・スカラー倍・積について

$$
T((f+M)+(g+M))
=
(f+g)(x_0)
=
f(x_0)+g(x_0),
$$

$$
T((f+M)(g+M))
=
(fg)(x_0)
=
f(x_0)g(x_0)
$$

なので代数準同型です。

定数関数 $\lambda1$ を使えば

$$
T(\lambda1+M_{x_0})=\lambda
$$

なので全射です。

また

$$
T(f+M_{x_0})=0
$$

なら $f(x_0)=0$、すなわち $f\in M_{x_0}$ なので

$$
f+M_{x_0}=0+M_{x_0}.
$$

従って単射です。

さらに

$$
T(1+M_{x_0})=1.
$$

よって $T$ は単位的代数同型です。
<!-- solution-end -->

### A4. 多項式は Gelfand 変換と可換する

- Level: A

$A$ を可換複素単位的 Banach 環、$a\in A$ とし、

$$
p(z)=c_0+c_1z+\cdots+c_mz^m
$$

を複素係数多項式とする。

$$
\boxed{
\widehat{p(a)}
=
p\circ\widehat a
}
$$

を示せ。

<!-- solution-start -->
### 詳細解答

任意の $\varphi\in\Delta(A)$ を取ります。

Gelfand 変換の定義から

$$
\widehat{p(a)}(\varphi)
=
\varphi(p(a)).
$$

多項式を展開すると

$$
p(a)
=
c_01+c_1a+\cdots+c_ma^m.
$$

character は線形で乗法的なので

$$
\varphi(a^k)
=
\varphi(a)^k.
$$

従って

$$
\begin{aligned}
\varphi(p(a))
&=
c_0+c_1\varphi(a)+\cdots+c_m\varphi(a)^m\\
&=
p(\varphi(a)).
\end{aligned}
$$

また

$$
\varphi(a)=\widehat a(\varphi)
$$

だから

$$
\widehat{p(a)}(\varphi)
=
p(\widehat a(\varphi)).
$$

任意の $\varphi$ で成り立つので

$$
\widehat{p(a)}
=
p\circ\widehat a.
$$
<!-- solution-end -->

## Level B

### B1. Gelfand--Mazur をスペクトルから再構成する

- Level: B

$B$ を複素単位的 Banach 可除代数とする。OA1 のスペクトル非空性だけを用いて、任意の $b\in B$ が

$$
b=\lambda1
$$

と一意に表されることを証明せよ。

<!-- solution-start -->
### 詳細解答

$b\in B$ を固定します。

OA1 が [FA5 の複素 Banach 空間上のスペクトル非空性](../FA5/index.md#thm-fa5-spectrum-nonempty)から導いたスペクトル非空性により

$$
\sigma_B(b)\ne\varnothing.
$$

従って

$$
\lambda\in\sigma_B(b)
$$

となる複素数 $\lambda$ を一つ取れます。

スペクトルの定義により

$$
\lambda1-b
$$

は可逆ではありません。

ところが $B$ は可除代数なので、非零元は全て可逆です。従って $\lambda1-b$ は非零ではあり得ず、

$$
\lambda1-b=0.
$$

よって

$$
b=\lambda1.
$$

一意性は

$$
\lambda1=\mu1
$$

なら

$$
(\lambda-\mu)1=0
$$

であり、$1\ne0$ だから $\lambda=\mu$ と分かります。

したがって $B$ の元は全て一意なスカラー倍 $\lambda1$ です。
<!-- solution-end -->

### B2. $\mathbb C^n$ の極大イデアル

- Level: B

$A=\mathbb C^n$ に成分ごとの積を入れる。

1. 各 $j$ について

$$
M_j
=
\{z\in\mathbb C^n:z_j=0\}
$$

が極大イデアルであることを示せ。
2. $A$ の極大イデアルは $M_1,\dots,M_n$ だけであることを、character との対応を用いて示せ。

<!-- solution-start -->
### 詳細解答

#### 1. $M_j$ は極大

座標 character

$$
\varepsilon_j(z)=z_j
$$

を考えます。

その核は

$$
\ker\varepsilon_j=M_j.
$$

本文の [character と極大イデアルの対応](#thm-oa2-character-maximal-ideal)から、character の核は極大イデアルです。従って $M_j$ は極大です。

#### 2. 他にないこと

$M$ を任意の極大イデアルとします。

対応定理により、ある character $\varphi$ が存在して

$$
M=\ker\varphi.
$$

A2 で $\mathbb C^n$ の character は座標評価

$$
\varepsilon_1,\dots,\varepsilon_n
$$

だけと示しました。

従ってある $j$ について

$$
\varphi=\varepsilon_j.
$$

よって

$$
M
=
\ker\varepsilon_j
=
M_j.
$$

従って極大イデアルはちょうど

$$
M_1,\dots,M_n
$$

です。
<!-- solution-end -->

### B3. character 空間の弱*閉性

- Level: B

$A$ を可換複素単位的 Banach 環とする。ネット

$$
(\varphi_\alpha)\subset\Delta(A)
$$

が $A^*$ の弱*位相で $\psi\in A^*$ へ収束するとする。

1. $\psi(1)=1$ を示せ。
2. 任意の $a,b\in A$ について

$$
\psi(ab)=\psi(a)\psi(b)
$$

を示せ。
3. $\psi\in\Delta(A)$ を結論し、$\Delta(A)$ が弱*閉であることを説明せよ。

<!-- solution-start -->
### 詳細解答

弱*収束とは、各 $a\in A$ を固定したとき

$$
\varphi_\alpha(a)\to\psi(a)
$$

となることです。

#### 1. 単位元

全ての $\alpha$ について

$$
\varphi_\alpha(1)=1.
$$

従って

$$
\psi(1)
=
\lim_\alpha\varphi_\alpha(1)
=
1.
$$

特に $\psi$ は零写像ではありません。

#### 2. 乗法性

任意の $a,b\in A$ に対して

$$
\varphi_\alpha(ab)
=
\varphi_\alpha(a)\varphi_\alpha(b).
$$

弱*収束から

$$
\varphi_\alpha(ab)\to\psi(ab),
$$

$$
\varphi_\alpha(a)\to\psi(a),
\qquad
\varphi_\alpha(b)\to\psi(b).
$$

複素数の積は連続なので

$$
\varphi_\alpha(a)\varphi_\alpha(b)
\to
\psi(a)\psi(b).
$$

同じネットの極限を比較して

$$
\psi(ab)
=
\psi(a)\psi(b).
$$

#### 3. character

$\psi\in A^*$ なので $\psi$ は連続複素線形汎関数です。1と2により非零かつ乗法的です。

従って

$$
\psi\in\Delta(A).
$$

つまり $\Delta(A)$ の任意の弱*収束ネットの極限は再び $\Delta(A)$ に入ります。

弱*位相は Hausdorff なので、この性質から $\Delta(A)$ は弱*閉です。本文ではさらに $B_{A^*}$ の閉部分集合として Banach–Alaoglu を適用し、コンパクト性を得ました。
<!-- solution-end -->

### B4. character 表示から多項式スペクトル写像を導く

- Level: B

$A$ を可換複素単位的 Banach 環、$a\in A$、$p$ を複素係数多項式とする。本章のスペクトルの character 表示を用いて

$$
\boxed{
\sigma_A(p(a))
=
p(\sigma_A(a))
}
$$

を示せ。

<!-- solution-start -->
### 詳細解答

本章のスペクトル表示から

$$
\sigma_A(p(a))
=
\{\varphi(p(a)):\varphi\in\Delta(A)\}.
$$

A4 で示したように

$$
\varphi(p(a))
=
p(\varphi(a)).
$$

従って

$$
\sigma_A(p(a))
=
\{p(\varphi(a)):\varphi\in\Delta(A)\}.
$$

集合の像として書けば

$$
\sigma_A(p(a))
=
p(\{\varphi(a):\varphi\in\Delta(A)\}).
$$

もう一度スペクトル表示を $a$ に適用すると

$$
\{\varphi(a):\varphi\in\Delta(A)\}
=
\sigma_A(a).
$$

よって

$$
\boxed{
\sigma_A(p(a))
=
p(\sigma_A(a)).
}
$$

OA1 では左正則表現を通して FA5 の多項式スペクトル写像定理を再利用しました。本問では、可換性がある場合には character 表示から同じ結果を直接回収できることが分かります。
<!-- solution-end -->

## Level C

### C1. 商 Banach 環の character 空間

- Level: C

$A$ を可換複素単位的 Banach 環、$I\subsetneq A$ を閉イデアルとする。標準商写像を

$$
q:A\to A/I
$$

とする。

$$
F:\Delta(A/I)\to\Delta(A),
\qquad
F(\psi)=\psi\circ q
$$

を考える。

1. $F(\psi)$ が character であり、

$$
I\subset\ker F(\psi)
$$

となることを示せ。
2. 集合

$$
h(I)
=
\{\varphi\in\Delta(A):I\subset\ker\varphi\}
$$

に対して、$F$ が $\Delta(A/I)$ から $h(I)$ への全単射であることを示せ。
3. $F$ が Gelfand 位相について同相写像であることを示せ。
4. $a\in A$ に対して

$$
\sigma_{A/I}(a+I)
=
\{\varphi(a):\varphi\in h(I)\}
$$

を示せ。

<!-- solution-start -->
### 詳細解答

#### 1. 合成は character

$\psi\in\Delta(A/I)$ とします。

$q$ は複素線形で積と単位元を保ち、$\psi$ も複素線形で乗法的です。従って合成

$$
F(\psi)=\psi\circ q
$$

も複素線形で乗法的です。

また

$$
F(\psi)(1)
=
\psi(q(1))
=
\psi(1+I)
=
1
$$

なので非零です。従って $F(\psi)$ は character です。

$x\in I$ なら

$$
q(x)=0+I
$$

なので

$$
F(\psi)(x)
=
\psi(0+I)
=
0.
$$

従って

$$
I\subset\ker F(\psi).
$$

よって

$$
F(\Delta(A/I))
\subset h(I).
$$

#### 2. 全単射

まず単射を示します。

$$
F(\psi_1)=F(\psi_2)
$$

とします。任意の $a+I\in A/I$ に対して

$$
\psi_1(a+I)
=
F(\psi_1)(a)
=
F(\psi_2)(a)
=
\psi_2(a+I).
$$

従って $\psi_1=\psi_2$ です。

次に全射を示します。

$\varphi\in h(I)$ とします。つまり

$$
I\subset\ker\varphi.
$$

$$
\psi_\varphi:A/I\to\mathbb C
$$

を

$$
\psi_\varphi(a+I)=\varphi(a)
$$

で定めます。

well-defined 性を確認します。

$$
a+I=b+I
$$

なら $a-b\in I\subset\ker\varphi$ なので

$$
\varphi(a)=\varphi(b).
$$

従って定義は代表元によりません。

$\varphi$ の線形性と乗法性から $\psi_\varphi$ も線形で乗法的です。また

$$
\psi_\varphi(1+I)=\varphi(1)=1.
$$

従って $\psi_\varphi\in\Delta(A/I)$ です。

さらに

$$
F(\psi_\varphi)(a)
=
\psi_\varphi(a+I)
=
\varphi(a).
$$

従って

$$
F(\psi_\varphi)=\varphi.
$$

よって $F$ は $h(I)$ への全射です。

以上から $F$ は

$$
\Delta(A/I)\to h(I)
$$

の全単射です。

#### 3. 同相性

Gelfand 位相は各元での評価を連続にする位相です。

$\Delta(A/I)$ 上の評価

$$
\psi\mapsto\psi(a+I)
$$

を考えます。$F$ の像側では

$$
F(\psi)(a)
=
(\psi\circ q)(a)
=
\psi(a+I).
$$

従って $F$ を通した各評価は連続です。よって $F$ は連続です。

逆写像についても、$\varphi\in h(I)$ に対応する $\psi_\varphi$ は

$$
\psi_\varphi(a+I)=\varphi(a)
$$

なので、$A/I$ の各元での評価は $h(I)$ 上の $A$ の元での評価そのものです。従って逆写像も連続です。

よって $F$ は同相写像です。

#### 4. 商でのスペクトル

本章のスペクトル character 表示を $A/I$ の元 $a+I$ に適用すると

$$
\sigma_{A/I}(a+I)
=
\{\psi(a+I):\psi\in\Delta(A/I)\}.
$$

2で $\Delta(A/I)$ と $h(I)$ が対応し、その対応では

$$
\psi(a+I)
=
F(\psi)(a).
$$

従って

$$
\sigma_{A/I}(a+I)
=
\{\varphi(a):\varphi\in h(I)\}.
$$

これが求める式です。

商を取ると、$I$ を消す character だけが残ります。従って OA1 で見た

$$
\sigma_{A/I}(a+I)\subset\sigma_A(a)
$$

は、character の集合を

$$
\Delta(A)
\quad\text{から}\quad
h(I)
$$

へ絞ることとして理解できます。
<!-- solution-end -->

---

## まとめ

本章では、可換 Banach 環のスペクトルを「可逆性の失敗」だけでなく、character の値として読み直しました。

$$
\text{character }\varphi
\quad\Longleftrightarrow\quad
\text{極大イデアル }\ker\varphi
$$

の対応を作る鍵は、

- 極大イデアルが閉であること
- Zorn の補題で極大イデアルまで延長できること
- 商 $A/M$ が Banach 可除代数になること
- Gelfand--Mazur により $A/M\cong\mathbb C$ となること

でした。

さらに character 全体を

$$
\Delta(A)
$$

と集め、弱*位相を入れるとコンパクト Hausdorff 空間になります。その上で

$$
a\longmapsto\widehat a,
\qquad
\widehat a(\varphi)=\varphi(a)
$$

とすれば、抽象的な元を連続関数へ変換できます。

中心結果は

$$
\boxed{
\sigma_A(a)=\widehat a(\Delta(A))
}
$$

および

$$
\boxed{
\|\widehat a\|_\infty=r_A(a)
}
$$

です。

ただし一般の可換 Banach 環では、冪零元のように全 character から見えない元があり、Gelfand 変換は単射とは限りません。

次章では随伴演算と

$$
\|a^*a\|=\|a\|^2
$$

という $C^*$-恒等式を導入し、このスペクトル論がどのように強化されるかを調べます。
