# QINF27 スタビライザー・CSS符号

## 1. 一つずつ書いた回復を、可換な検査へまとめる

[QINF25の3量子ビット反復符号](../QINF25/index.md#def-qinf25-bit-code)では、二つのパリティを測ると「どの量子ビットが反転したか」が分かりました。[QINF26のKnill–Laflamme条件](../QINF26/index.md#thm-qinf26-kl)では、誤りの組が完全訂正可能かを射影で判定しました。しかし多数の量子ビットに対して誤りごとの行列を全部書くのは非効率です。

ここで、**符号語を変えずに検査できる可換なPauli作用素**を少数選びます。検査の固有値だけから誤りの種類を絞り込み、符号空間の次元まで計算できるのがスタビライザーの考え方です。さらに $X$ 型と $Z$ 型の検査を分ければ、古典二元線形符号の検査行列で量子符号を構成できます。

以下、$n\ge1$ とし、物理系は $\mathcal H=(\mathbb C^2)^{\otimes n}$ です。$I,X,Y,Z$ は一量子ビットのPauli行列で、$X_j,Z_j$ は第 $j$ 量子ビットだけに作用します。演算子の積は右から作用し、二元ベクトルの和と内積は断りがなければ $\mathbb F_2=\{0,1\}$ で計算します。

## 2. Pauli作用素の交換を0と1で計算する

一つの量子ビットでは $XZ=-ZX$、$Y=iXZ$、$X^2=Z^2=I$ です。各量子ビットの $X$ の有無と $Z$ の有無をそれぞれ二元ベクトル $a,b\in\mathbb F_2^n$ に記録します。

<a id="def-qinf27-pauli"></a>

<!-- formal-statement-start -->
> **定義（多量子ビットPauli群）**
> $a,b\in\mathbb F_2^n$ に対し、テンソル積の作用素を

$$
X^a=\prod_{j=1}^n X_j^{a_j},\qquad
Z^b=\prod_{j=1}^n Z_j^{b_j}
$$

> と定める。次の集合を $n$ 量子ビットPauli群 $\mathcal P_n$ とする。

$$
\mathcal P_n=\{\,i^\ell X^a Z^b:
\ell\in\{0,1,2,3\},\ a,b\in\mathbb F_2^n\,\}.
$$
<!-- formal-statement-end -->

位相 $i^\ell$ を含むのは、例えば $XZ=-iY$ のような積でも集合を閉じるためです。同じ $(a,b)$ でも全体位相が違う作用素は群の別の元です。非自明なPauli作用素（$a$ または $b$ が非零）はトレース0です。一量子ビットで $\operatorname{Tr}X=\operatorname{Tr}Y=\operatorname{Tr}Z=0$、テンソル積のトレースが各因子のトレースの積となるためです。

<!-- definition-example-start: def-qinf27-pauli -->
**定義の確認**。$n=2$ で $a=(1,0),b=(0,1)$ なら $X^aZ^b=X_1Z_2$。両因子は異なる場所に作用するので可換です。一方 $a=b=(1,0)$ なら $iX^aZ^b=Y_1$ で、定義に含まれます。また $(X_1Z_2)^2=I$ ですが、$(X_1Z_1)^2=-I$ です。位相を無視してすべてのPauli作用素がHermitianとするのは誤りです。
<!-- definition-example-end -->

<a id="prop-qinf27-commutation"></a>

<!-- formal-statement-start -->
> **命題（Pauli作用素の二値可換性）**
> $a,b,a',b'\in\mathbb F_2^n$ とし、$A=X^aZ^b,\ B=X^{a'}Z^{b'}$ とする。このとき

$$
AB=(-1)^{a\cdot b'+b\cdot a'}BA.
$$

> 特に二つが可換であることと $a\cdot b'+b\cdot a'=0$ は同値である。全体位相 $i^\ell$ を付けてもこの可換性は変わらない。
<!-- formal-statement-end -->

### 証明の見取り図

同じ量子ビットで $Z_jX_j=-X_jZ_j$ を一度入れ替えるごとに符号が反転します。異なる量子ビットにまたがる因子は最初から可換です。

<!-- proof-start -->
### 証明

各量子ビットで $Z_j^{b_j}X_j^{a_j'}=(-1)^{b_ja_j'}X_j^{a_j'}Z_j^{b_j}$ なので

$$
AB=(-1)^{b\cdot a'}X^{a+a'}Z^{b+b'}.
$$

同じ計算を逆順で行うと

$$
BA=(-1)^{b'\cdot a}X^{a+a'}Z^{b+b'}.
$$

二つの係数の比は $(-1)^{b\cdot a'+b'\cdot a}$ です。二元数では加減算が同じなので主張が従います。位相因子は積の両順序で同じ係数を与え、交換の符号へ寄与しません。
<!-- proof-end -->

## 3. 同時に+1となる空間が符号になる

反復符号の $|000\rangle,|111\rangle$ はともに $Z_1Z_2$ と $Z_2Z_3$ の固有値 $+1$ の状態です。この二つを測定しても、符号語の振幅は測れません。一般にも、このような共通の $+1$ 固有空間を符号にします。

<a id="def-qinf27-stabilizer"></a>

<!-- formal-statement-start -->
> **定義（スタビライザー符号）**
> $g_1,\ldots,g_r\in\mathcal P_n$ をHermitianで $g_j^2=I$ の互いに可換な作用素とし、これらが生成する群を $S=\langle g_1,\ldots,g_r\rangle$ とする。$-I\notin S$ とし、各生成元は独立、すなわち積 $\prod_jg_j^{u_j}=I$ が成立するのは $u=0$ のときだけとする。符号空間を

$$
\mathcal C(S)=\{\,|\psi\rangle\in\mathcal H:
g_j|\psi\rangle=|\psi\rangle\ (j=1,\ldots,r)\,\}
$$

> と定める。$S$ をスタビライザー群、$g_j$ を検査生成元と呼ぶ。
<!-- formal-statement-end -->

$-I$ を含めてしまうと $-|\psi\rangle=|\psi\rangle$ を満たすのは零ベクトルだけです。また独立性がないと検査数 $r$ をそのまま次元式に使えません。可換性・$-I$ の排除・独立性は別々の条件です。

<!-- definition-example-start: def-qinf27-stabilizer -->
**定義の確認**。$n=3$ とし $g_1=Z_1Z_2,\ g_2=Z_2Z_3$ とします。どちらもHermitianで二乗が $I$、互いに可換です。生成される群は

$$
S=\{I,Z_1Z_2,Z_2Z_3,Z_1Z_3\}.
$$

四つは異なる作用素なので $-I$ を含まず、非自明な生成元の積が $I$ にもなりません。$Z_j|x_1x_2x_3\rangle=(-1)^{x_j}|x_1x_2x_3\rangle$ から、二つの固有値がともに+1である条件は $x_1=x_2=x_3$。従って $\mathcal C(S)=\operatorname{span}\{|000\rangle,|111\rangle\}$ で、[反復符号](../QINF25/index.md#def-qinf25-bit-code)と一致します。
<!-- definition-example-end -->

<a id="thm-qinf27-dimension"></a>

<!-- formal-statement-start -->
> **定理（スタビライザー射影と符号次元）**
> [スタビライザー符号](#def-qinf27-stabilizer)の $n$ 量子ビット上の独立生成元が $r$ 個なら、その符号空間への直交射影と次元は

$$
P=\prod_{j=1}^r\frac{I+g_j}{2}
=\frac1{2^r}\sum_{s\in S}s,\qquad
\dim\mathcal C(S)=2^{n-r}.
$$

> 従って $k=n-r$ 個の論理量子ビットを格納する。
<!-- formal-statement-end -->

### 証明の見取り図

Hermitianな二値検査 $g_j$ の $+1$ 固有空間への射影は $(I+g_j)/2$。可換な検査の射影を掛けると共通空間への射影になります。最後は射影の階数がトレースに等しいことを使います。

<!-- proof-start -->
### 証明

$g_j^\dagger=g_j$、$g_j^2=I$ なので $P_j=(I+g_j)/2$ は $P_j^\dagger=P_j$ と $P_j^2=P_j$ を満たします。$g_j$ は可換なので $P_j$ も可換です。したがって $P=\prod_jP_j$ はHermitianで $P^2=P$、その像はすべての $P_j$ の像の共通部分、つまり $\mathcal C(S)$ です。

積を展開すれば

$$
P=2^{-r}\sum_{u\in\mathbb F_2^r}
g_1^{u_1}\cdots g_r^{u_r}.
$$

生成元の独立性によりこの $2^r$ 項は $S$ の異なる元を一度ずつ走ります。$-I\notin S$ なので単位元以外はすべて非自明なPauli作用素でトレース0です。よって

$$
\operatorname{rank}P=\operatorname{Tr}P
=2^{-r}\operatorname{Tr}I
=2^{-r}2^n=2^{n-r}.
$$

ここでは $\dim\mathcal H=2^n$ を用いました。独立な検査は一個ごとに符号空間の次元を半分にする、という解釈が得られます。
<!-- proof-end -->

反復符号は $n=3,r=2$ なので $2^{3-2}=2$ 次元です。$P=(I+Z_1Z_2)(I+Z_2Z_3)/4$ を計算すれば $|000\rangle,|111\rangle$ だけを残す[パリティ射影](../QINF25/index.md#prop-qinf25-projectors)が得られます。

## 4. syndromeが区別するのは誤りであり論理状態ではない

任意のPauli誤り $E$ と検査元 $g_j$ は、[二値可換性](#prop-qinf27-commutation)によって可換か反可換です。符号語 $|\psi\rangle$ は $g_j|\psi\rangle=|\psi\rangle$ なので

$$
g_jE|\psi\rangle=(-1)^{s_j(E)}E|\psi\rangle
$$

となります。この $s_j(E)\in\{0,1\}$ は検査結果 $+1,-1$ をそれぞれ $0,1$ に記録したものです。論理状態の係数はここに現れません。

<a id="def-qinf27-syndrome"></a>

<!-- formal-statement-start -->
> **定義（Pauli syndromeと正規化群）**
> スタビライザー群 $S=\langle g_1,\ldots,g_r\rangle$ とPauli作用素 $E\in\mathcal P_n$ に対し、各 $g_jE=(-1)^{s_j(E)}Eg_j$ で定まる $s(E)=(s_1(E),\ldots,s_r(E))\in\mathbb F_2^r$ をsyndromeと呼ぶ。全検査と可換なPauli作用素の集合をここでは正規化群 $N(S)$ と書く。

$$
N(S)=\{E\in\mathcal P_n: Eg=gE\ \text{for every }g\in S\}.
$$

> すなわち $E\in N(S)$ と $s(E)=0$ は同値である。
<!-- formal-statement-end -->

通常の群論の正規化群の定義は $ESE^\dagger=S$ ですが、Pauli作用素の共役は各群元の符号しか変えません。$-I\notin S$ なので集合として保存するにはすべてと可換でなければならず、上の表現と一致します。

<!-- definition-example-start: def-qinf27-syndrome -->
**定義の確認**。反復符号の検査 $g_1=Z_1Z_2,g_2=Z_2Z_3$ に対して

$$
s(I)=(0,0),\quad s(X_1)=(1,0),\quad
s(X_2)=(1,1),\quad s(X_3)=(0,1).
$$

$X_2$ は両検査と反可換なので二つの結果が $-1$ です。一方 $Z_1$ は両検査と可換で $s(Z_1)=0$ ですが、$|000\rangle$ と $|111\rangle$ にそれぞれ $+1,-1$ を掛けます。**syndrome 0でも無害とは限りません**。
<!-- definition-example-end -->

syndrome $s\in\mathbb F_2^r$ への同時射影は、$g_j$ の固有値 $(-1)^{s_j}$ を選ぶことで

$$
\Pi_s=\prod_{j=1}^r\frac{I+(-1)^{s_j}g_j}{2}.
$$

各 $j$ の二つの射影の和が $I$、積が0なので $\Pi_s\Pi_t=\delta_{st}\Pi_s$ かつ $\sum_s\Pi_s=I$。さらに $E P$ は $\Pi_{s(E)}$ の像に入ります。

<a id="thm-qinf27-pauli-correction"></a>

<!-- formal-statement-start -->
> **定理（Pauli誤りの完全訂正判定）**
> $n$ 量子ビットのスタビライザー $S$、符号射影 $P\ne0$、有限なPauli誤り集合 $\mathcal E\subset\mathcal P_n$ を取る。$\mathcal Z=\{i^\ell I:\ell=0,1,2,3\}$ を位相群とする。誤り集合 $\mathcal E$ がKnill–Laflamme条件を満たすための必要十分条件は、すべての $E,F\in\mathcal E$ について

$$
E^\dagger F\notin N(S)\quad\text{または}\quad
E^\dagger F\in\mathcal Z S
$$

> が成立することである。従って同じsyndromeの誤り同士は、符号上で全体位相を除き同じ作用をしなければならない。
<!-- formal-statement-end -->

### 証明の見取り図

二つの誤りのsyndromeが違えば、積 $E^\dagger F$ はどれかの検査と反可換なので、符号空間に射影した積は0です。syndromeが同じ場合は検査で区別できず、論理状態を変えない作用だけが許されます。後者を[Knill–Laflamme条件](../QINF26/index.md#thm-qinf26-kl)と照合します。

<!-- proof-start -->
### 証明

$U=E^\dagger F$ とおきます。Pauli作用素の積はPauli群に属します。もし $U$ がある $g_j$ と反可換なら $g_jP=P$ と $Pg_j=P$ から

$$
PUP=Pg_jUP=-PUg_jP=-PUP
$$

なので $PUP=0$ です。逆に $U=\omega s$（$\omega\in\mathcal Z,\ s\in S$）なら $sP=P$ より $PUP=\omega P$ です。いずれも[Knill–Laflamme条件](../QINF26/index.md#def-qinf26-kl-matrix)のスカラー条件を満たします。

残る場合、$U\in N(S)\setminus\mathcal ZS$ とします。$U$ は $S$ と可換なので $U$ は符号空間を保ち、符号空間上ではユニタリです。一方、[射影公式](#thm-qinf27-dimension)から

$$
\operatorname{Tr}(PU)
=|S|^{-1}\sum_{s\in S}\operatorname{Tr}(sU)=0.
$$

最後の等号は $sU$ がすべて単位行列の位相倍ではないPauli作用素だからです。仮に $PUP=cP$ なら、符号空間でユニタリなので $|c|=1$、従って $\operatorname{Tr}(PU)=c\dim\mathcal C\ne0$ となり矛盾します。この場合は条件を満たせません。全対についての同値が示されました。

さらに条件が成り立つなら、各実現syndrome $s$ から代表誤り $E_s\in\mathcal E$ を一つ選びます。同じsyndromeの $E$ は $E_s^\dagger E=\omega g$（$g\in S$）なので、符号語上で $E_s^\dagger E|\psi\rangle=\omega|\psi\rangle$ です。測定 $\{\Pi_s\}$ の結果 $s$ に応じてユニタリ $E_s^\dagger$ を適用すれば、任意の符号語が位相を除き元に戻ります。現れないsyndromeには任意のユニタリを割り当てても、Kraus作用素 $K_s=E_s^\dagger\Pi_s$ が

$$
\sum_sK_s^\dagger K_s=\sum_s\Pi_s=I
$$

を満たすので、全物理空間上のCPTP回復です。各枝の位相は密度演算子で消え、誤りの線形包にも[訂正可能性が拡張](../QINF26/index.md#prop-qinf26-error-span)されます。
<!-- proof-end -->

この条件を誤解しないために反復符号へ戻ります。$X_1$ と $X_2$ は異なるsyndromeなので区別できます。一方 $I$ と $Z_1$ は同じsyndromeなのに $Z_1\notin\mathcal ZS$ です。検査で両者を区別できないまま、$|+_L\rangle$ と $|-_L\rangle$ を同時に戻す回復はありません。失われる仮定は「同じ検査結果の誤りが論理的に等価」という条件です。

## 5. CSS符号：二種類の誤りを二種類の検査で扱う

Pauli作用素を $X^aZ^b$ と書くと、$a$ はビット反転、$b$ は位相反転を記録します。そこで検査も「$X$ だけからなる行」と「$Z$ だけからなる行」に分けます。検査行列 $H_X,H_Z$ は各行を二値ベクトルで持ち、行が一つのPauli検査に対応します。ここで $\operatorname{row}H$ は行空間、$\ker H$ は $Hv=0$ を満たす列ベクトル全体です。

<a id="def-qinf27-css"></a>

<!-- formal-statement-start -->
> **定義（CSS符号）**
> $H_X\in\mathbb F_2^{r_X\times n}$ と $H_Z\in\mathbb F_2^{r_Z\times n}$ はそれぞれ行が一次独立であり、

$$
H_XH_Z^{\mathsf T}=0
$$

> を満たすとする。$H_X$ の各行 $h$ から $X^h$、$H_Z$ の各行 $z$ から $Z^z$ を検査生成元として作るスタビライザー符号をCSS符号という。
<!-- formal-statement-end -->

この積が0なのは、[Pauliの可換条件](#prop-qinf27-commutation)で $X^h$ と $Z^z$ の可換性が $h\cdot z=0$ と同値だからです。同種の検査は自動的に可換です。$X$ 型と $Z$ 型の非自明な積が $-I$ になることはありません。行の独立性から生成元も独立なので、[次元公式](#thm-qinf27-dimension)より格納できる論理量子ビット数は

$$
k=n-r_X-r_Z.
$$

<!-- definition-example-start: def-qinf27-css -->
**定義の確認**。$n=4$、$H_X=H_Z=(1\ 1\ 1\ 1)$ とします。各行は非零なので独立であり、内積は $1+1+1+1=0$（$\mathbb F_2$）です。検査は $XXXX$ と $ZZZZ$ で、重なる四箇所で反可換符号が四回現れるため可換です。両者ともHermitianで二乗は $I$、生成される群は $\{I,XXXX,ZZZZ,YYYY\}$（$XXXX\cdot ZZZZ=YYYY$）となり、$-I$ を含みません。符号次元は $2^{4-2}=4$、つまり $k=2$ です。ただし、この事実だけでは単一誤りをすべて**訂正**できるとは言えません。
<!-- definition-example-end -->

<a id="thm-qinf27-css-basis"></a>

<!-- formal-statement-start -->
> **定理（CSS構成と論理基底）**
> 上のCSS符号で、二元線形空間 $C_1=\ker H_Z$、$C_2=\operatorname{row}H_X$ とする。このとき $C_2\subset C_1$ であり、商集合 $C_1/C_2$ の各剰余類から代表元 $u$ を一つ選ぶと

$$
|u+C_2\rangle
=\frac1{\sqrt{|C_2|}}\sum_{v\in C_2}|u+v\rangle
$$

> はCSS符号の正規直交基底となる。基底の数は $2^{\dim C_1-\dim C_2}=2^{n-r_Z-r_X}$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$Z$ 型検査は計算基底に位相を掛けるので、許されるビット列は $\ker H_Z$ です。$X$ 型検査はビット列を足し算で移動させるので、同じ剰余類内で振幅を一様にすれば固定されます。

<!-- proof-start -->
### 証明

$H_XH_Z^{\mathsf T}=0$ を転置すると $H_ZH_X^{\mathsf T}=0$ なので、$H_X$ の各行は $C_1=\ker H_Z$ に入り、$C_2\subset C_1$ です。$u\in C_1,v\in C_2$ なら $H_Z(u+v)=0$。従って各 $Z$ 型検査 $Z^z$ は $|u+v\rangle$ に位相 $(-1)^{z\cdot(u+v)}=1$ を掛けます。

一方、$h\in C_2$ から作る $X^h$ は $|u+v\rangle$ を $|u+v+h\rangle$ に送ります。$v\mapsto v+h$ は $C_2$ 上の置換なので、和全体は不変です。よって $|u+C_2\rangle$ はすべての検査で固定されます。

各 $u+C_2$ に属する $|u+v\rangle$ は互いに異なる直交計算基底であり、各項の係数は $|C_2|^{-1/2}$ なのでノルムは1です。異なる剰余類は交わらないので内積0。$\dim C_1=n-r_Z$、$\dim C_2=r_X$ で、剰余類数は $|C_1|/|C_2|=2^{n-r_Z-r_X}$。これは[スタビライザー次元](#thm-qinf27-dimension)と一致するので、得た正規直交族は符号空間を張ります。
<!-- proof-end -->

誤り $E=i^\ell X^aZ^b$ の検査結果は[二値可換性](#prop-qinf27-commutation)を各行に適用すると

$$
s_X(E)=H_Xb,\qquad s_Z(E)=H_Za.
$$

$X$ 誤りは $Z$ 型検査で、$Z$ 誤りは $X$ 型検査で検出します。$Y_j=iX_jZ_j$ は両方のsyndromeに現れます。**二つの古典検査行列を並べただけでなく、直交条件によって同時に量子測定できる**ことがCSS構成の核心です。

## 6. 7量子ビットSteane符号の距離3を証明する

代表例として、次の $3\times7$ 二元行列を使います。各列は非零で互いに異なる3ビット列です。

$$
H=\begin{pmatrix}
1&1&1&1&0&0&0\\
1&1&0&0&1&1&0\\
1&0&1&0&1&0&1
\end{pmatrix},
\qquad H_X=H_Z=H.
$$

各行の1の個数は4、異なる二行が同時に1となる列は2個なので $HH^{\mathsf T}=0$ です。3行は一次独立（例えば第4,6,7列を見れば各行を単独で取り出せる）です。従って $r_X=r_Z=3$、$k=7-3-3=1$ で、符号は2次元になります。

具体的な論理基底を得るには、$C_2=\operatorname{row}H$ が3次元、$C_1=\ker H$ が4次元であることを使います。全1ベクトル $\mathbf1=(1,\ldots,1)$ は $H\mathbf1^{\mathsf T}=0$（各行の重み4）ですが、$C_2$ の非零元はすべて重み4なので $\mathbf1\notin C_2$ です。従って[CSS論理基底](#thm-qinf27-css-basis)は

$$
|0_L\rangle=\frac1{\sqrt8}\sum_{v\in C_2}|v\rangle,
\qquad
|1_L\rangle=\frac1{\sqrt8}\sum_{v\in C_2}|v+\mathbf1\rangle.
$$

ここで「重み」とはベクトルの1の個数です。$C_2$ の非零元が重み4であることは、行の重み4、異なる行の重なり2から、二行の和の重みが $4+4-2\cdot2=4$ と分かり、三行の和も具体的に $(1,0,0,1,0,1,1)$ で重み4、と確かめられます。

単に符号の次元だけでは誤り耐性を測れません。符号空間を保ちながら論理状態を変えるPauli作用素がどれほど小さい重みで存在するかを調べます。

<a id="def-qinf27-distance"></a>

<!-- formal-statement-start -->
> **定義（スタビライザー符号の距離）**
> 非自明な論理Pauli作用素の集合 $N(S)\setminus\mathcal ZS$ が空でないスタビライザー符号に対して、その距離を

$$
d=\min_{E\in N(S)\setminus\mathcal ZS}\operatorname{wt}(E)
$$

> と定める。$\operatorname{wt}(E)$ は $E$ が恒等作用素の位相倍でない局所因子の個数である。$n$ 物理量子ビット、$k$ 論理量子ビット、距離 $d$ の符号を $[[n,k,d]]$ と表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qinf27-distance -->
**定義の確認**。3量子ビット反復符号では $Z_1\in N(S)$ ですが $Z_1\notin\mathcal ZS$ です。重み1の非自明な論理作用が実際にあるため $d\le1$。非恒等Pauliの重みは最低1なので $d=1$ です。従ってこの符号は $[[3,1,1]]$ であり、[単一ビット反転に限る訂正](../QINF25/index.md#thm-qinf25-single-correction)と「任意の単一Pauli誤り」の訂正とを区別する必要があります。
<!-- definition-example-end -->

<a id="prop-qinf27-steane"></a>

<!-- formal-statement-start -->
> **命題（Steane符号の距離と単一誤り訂正）**
> 上記の $H_X=H_Z=H$ から構成されるCSS符号は $[[7,1,3]]$ である。誤り集合

$$
\mathcal E=\{I\}\cup\{X_j,Y_j,Z_j:1\le j\le7\}
$$

> はKnill–Laflamme条件を満たす。従って任意の単一量子ビットPauli誤り、およびそれらの線形結合をKraus作用素にもつCPTP雑音を完全訂正できる。
<!-- formal-statement-end -->

### 証明の見取り図

列が全て非零かつ異なることから、重み1・2の二元ベクトルは $H$ の核に入りません。他方、3列の和が0となる組があり、対応する重み3のPauli作用素は全検査と可換ですが、スタビライザー自体には入りません。これで距離が3と決まります。

<!-- proof-start -->
### 証明

Pauli作用素を $E=i^\ell X^aZ^b$ と書くと、[CSS syndrome式](#def-qinf27-css)から、$E\in N(S)$ の条件は $Ha=0$ かつ $Hb=0$ です。非零の列が一つだけなら $He_j\ne0$、異なる二列の和も0ではないので、$\ker H$ に重み1または2の非零ベクトルはありません。従って重み1または2の非恒等Pauliが全検査と可換になることはありません。ゆえに $d\ge3$。

他方、列2・3・5はそれぞれ $(1,1,0)^{\mathsf T},(1,0,1)^{\mathsf T},(0,1,1)^{\mathsf T}$ なので、その和は0です。従って $a=e_2+e_3+e_5$ について $Ha=0$、$X^a=X_2X_3X_5$ は全検査と可換です。しかし $a$ は重み3で、$\operatorname{row}H$ の非零元は重み4です。従って $X^a\notin\mathcal ZS$ であり $d\le3$。両方から $d=3$ です。

任意の異なる $E,F\in\mathcal E$ について、$E^\dagger F$ は重み高々2の非自明なPauli作用素です（$E=F$ の場合だけ $I$）。上で示したように重み1または2の非恒等Pauliは正規化群に入らないため、[Pauli誤り訂正判定](#thm-qinf27-pauli-correction)を満たします。

21個の単一非恒等誤りのsyndromeも直接確認できます。$j$ 番目の検査列を $h_j=He_j$ と書くと、二種類の結果は

$$
s(X_j)=(0,h_j),\qquad
s(Z_j)=(h_j,0),\qquad
s(Y_j)=(h_j,h_j).
$$

列 $h_j$ がすべて異なる非零値なので、21個の組は互いに異なり、恒等誤りの $(0,0)$ とも異なります。

syndromeを測定して $I,X_j,Y_j,Z_j$ の対応する逆作用を施せば回復できます。Kraus作用素がこの集合の線形包にある場合も[線形包の訂正可能性](../QINF26/index.md#prop-qinf26-error-span)が保証します。
<!-- proof-end -->

7量子ビットで1量子ビットを保持する代わりに、任意の1量子ビットの $X,Y,Z$ の誤りを訂正できました。これが4量子ビットのCSS例と違う点です。4量子ビット例では $X_1$ と $X_2$ が同じsyndromeですが、$X_1X_2$ はスタビライザーでなく、論理作用を区別できません。検出と訂正の差がここにあります。

## 7. 演習：検査行列から回復まで自分で構成する

<a id="ex-qinf27-a01"></a>

### 演習 A1：Pauliの交換符号

- Level: A
- 問題: 2量子ビットで $A=X_1Z_2$、$B=Z_1X_2$、$C=Z_1Z_2$ とする。各作用素の $(a,b)$ を書き、$A$ と $B$、$A$ と $C$ の可換性を二値内積で判定せよ。

<!-- solution-start -->
**詳細解答。** $A$ は $a=(1,0),b=(0,1)$、$B$ は $a'=(0,1),b'=(1,0)$、$C$ は $a''=(0,0),b''=(1,1)$ です。[二値可換性](#prop-qinf27-commutation)から $A,B$ の指数は

$$
a\cdot b'+b\cdot a'=1+1=0\pmod2
$$

なので可換です。$A,C$ の指数は $a\cdot b''+b\cdot a''=1+0=1$ なので $AC=-CA$。異なる二箇所で反可換なら符号が二回反転して可換になることも確認できます。
<!-- solution-end -->

<a id="ex-qinf27-a02"></a>

### 演習 A2：二量子ビットの射影

- Level: A
- 問題: $S=\langle Z_1Z_2\rangle$ に対する射影 $P$ と符号基底を求めよ。$X_1$ と $Z_1$ のsyndromeを求め、どちらが符号空間を保つか述べよ。

<!-- solution-start -->
**詳細解答。** $Z_1Z_2$ はHermitianで二乗が $I$、生成群は $\{I,Z_1Z_2\}$ で $-I$ を含みません。[射影公式](#thm-qinf27-dimension)により

$$
P=\tfrac12(I+Z_1Z_2)
=|00\rangle\langle00|+|11\rangle\langle11|.
$$

符号基底は $|00\rangle,|11\rangle$ で次元2です。$X_1$ は検査と反可換でsyndrome 1、$Z_1$ は可換でsyndrome 0。従って $Z_1$ は符号空間を保ちますが、$|00\rangle$ と $|11\rangle$ には異なる符号を掛けるため、符号上で恒等とは限りません。
<!-- solution-end -->

<a id="ex-qinf27-a03"></a>

### 演習 A3：三量子ビットのsyndrome表

- Level: A
- 問題: $g_1=Z_1Z_2,g_2=Z_2Z_3$ について $I,X_1,X_2,X_3,Z_1$ のsyndromeを求めよ。$\{I,X_1,X_2,X_3\}$ は訂正可能か、$\{I,Z_1\}$ はどうか。

<!-- solution-start -->
**詳細解答。** 一つの $X_j$ は、$j$ を含む $Z$ 検査だけと反可換です。従って

$$
\begin{array}{c|ccccc}
E&I&X_1&X_2&X_3&Z_1\\ \hline
s(E)&00&10&11&01&00
\end{array}
$$

となります。前の4誤りはsyndromeがすべて異なり、[Pauli判定](#thm-qinf27-pauli-correction)を満たします。$I,Z_1$ はsyndrome 00で衝突し、$Z_1$ は $|000\rangle$ と $|111\rangle$ に異なる位相を掛けるため $\mathcal ZS$ に属さず、訂正不能です。
<!-- solution-end -->

<a id="ex-qinf27-a04"></a>

### 演習 A4：4量子ビットCSSの次元と検出

- Level: A
- 問題: $H_X=H_Z=(1\ 1\ 1\ 1)$ がCSS条件を満たすこと、符号次元、$X_1,Z_1,Y_1,X_2$ の二種類のsyndromeを求めよ。

<!-- solution-start -->
**詳細解答。** 行内積は $4=0$（二元数）なので $H_XH_Z^{\mathsf T}=0$。どちらの検査行も非零で独立です。従って $k=4-1-1=2$、次元は4です。[CSS syndrome](#def-qinf27-css)の順序を $(s_X,s_Z)$ とすると

$$
s(X_1)=(0,1),\quad s(Z_1)=(1,0),\quad
s(Y_1)=(1,1),\quad s(X_2)=(0,1).
$$

非恒等の単一Pauli作用素はいずれも非零syndromeなので検出できますが、$X_1$ と $X_2$ は区別できません。これだけで訂正できるとは結論できません。
<!-- solution-end -->

<a id="ex-qinf27-b01"></a>

### 演習 B1：Steaneの6検査を点検する

- Level: B
- 問題: 本文の $H$ について $HH^{\mathsf T}=0$ と $\operatorname{rank}H=3$ を行ごとの計算で確かめよ。Steane符号の物理量子ビット数と論理量子ビット数を答え、$X_5,Z_5,Y_5$ のsyndromeを求めよ。

<!-- solution-start -->
**詳細解答。** 行を $h_1,h_2,h_3$ とします。自己内積は重み4なので $h_j\cdot h_j=0$、異なる行の共通1の場所は $(1,2),(1,3),(1,5)$ のそれぞれ2箇所なので $h_j\cdot h_k=0$ です。第4列は $(1,0,0)^{\mathsf T}$、第6列は $(0,1,0)^{\mathsf T}$、第7列は $(0,0,1)^{\mathsf T}$ なので行は独立です。従って $n=7,k=7-3-3=1$。第5列は $He_5=(0,1,1)^{\mathsf T}$ であるから

$$
s(X_5)=(000,011),\quad
s(Z_5)=(011,000),\quad
s(Y_5)=(011,011).
$$

二つの3ビット列を取り違えないよう、$X$ 誤りは $Z$ 検査で検出することも確認します。
<!-- solution-end -->

<a id="ex-qinf27-b02"></a>

### 演習 B2：CSS論理基底を直接検算する

- Level: B
- 問題: Steane符号の $C_2=\operatorname{row}H$ と $\mathbf1=(1,\ldots,1)$ を用い、本文の $|0_L\rangle,|1_L\rangle$ が正規直交であり、すべての $X$ 型・$Z$ 型検査に対して固有値+1を持つことを確かめよ。$X^{\mathbf1}$ は論理基底をどう変えるか。

<!-- solution-start -->
**詳細解答。** $C_2$ は3次元なので異なる $v$ が8個あり、各基底状態の振幅は $1/\sqrt8$。$C_2$ と $\mathbf1+C_2$ は $\mathbf1\notin C_2$ により交わりません。従って

$$
\langle0_L|0_L\rangle=\langle1_L|1_L\rangle=8/8=1,
\qquad \langle0_L|1_L\rangle=0.
$$

各 $v\in C_2$ で $Hv=0$、また $H\mathbf1^{\mathsf T}=0$ なので、各 $Z$ 行 $z$ は $z\cdot v=z\cdot(v+\mathbf1)=0$ を満たし、作用は+1です。各 $X$ 行 $h\in C_2$ の作用は $v\mapsto v+h$ という8項の置換なので和を変えません。最後に

$$
X^{\mathbf1}|0_L\rangle
=8^{-1/2}\sum_{v\in C_2}|v+\mathbf1\rangle=|1_L\rangle
$$

で、同じ作用をもう一度施すと $|0_L\rangle$ に戻ります。これは全検査と可換でも論理情報を動かす作用の例です。
<!-- solution-end -->

<a id="ex-qinf27-b03"></a>

### 演習 B3：syndromeからKnill–Laflamme行列へ

- Level: B
- 問題: 3量子ビット反復符号の射影を $P$ とし、誤り集合 $\{I,X_1,X_2,X_3\}$ について $PE_i^\dagger E_jP$ を全て計算せよ。重み2の $X_iX_j$ がなぜ射影後に0になるかを検査生成元で説明せよ。

<!-- solution-start -->
**詳細解答。** $i=j$ の場合は $E_i^\dagger E_i=I$ なので $PE_i^\dagger E_iP=P$。$I$ と $X_j$ の組では $X_j$ が少なくとも一つの $Z$ 検査と反可換です。異なる $i,j$ の $X_iX_j$ も、例えば $X_1X_2$ は $Z_2Z_3$ と反可換、$X_1X_3$ は $Z_1Z_2$ と反可換、$X_2X_3$ は $Z_1Z_2$ と反可換です。このような積 $U$ について

$$
PUP=PgUP=-PUgP=-PUP=0.
$$

従って係数行列は $C=I_4$ です。これは[Knill–Laflammeのスカラー条件](../QINF26/index.md#def-qinf26-kl-matrix)を満たし、異なるsyndrome空間への分離による回復を保証します。
<!-- solution-end -->

<a id="ex-qinf27-b04"></a>

### 演習 B4：検出だけでは訂正にならない

- Level: B
- 問題: $S=\langle XXXX,ZZZZ\rangle$ の4量子ビットCSS符号について、$X_1X_2\in N(S)\setminus\mathcal ZS$ を示せ。$P X_1^\dagger X_2P$ がスカラー倍の $P$ でないことを説明し、全単一Pauli誤りが検出可能なのに訂正不能である理由を述べよ。

<!-- solution-start -->
**詳細解答。** $X_1X_2$ は $XXXX$ と同種で可換、$ZZZZ$ とは二箇所で反可換符号が出るので可換です。従って $N(S)$ に入ります。しかし $S$ の元は $I,XXXX,ZZZZ,YYYY$ の4つだけで、重み2の $X_1X_2$ はその位相倍ではありません。[Pauli誤り訂正判定](#thm-qinf27-pauli-correction)の証明により、符号空間に制限した $X_1X_2$ はトレース0のユニタリであり、$PX_1X_2P$ はスカラー倍の $P$ になりません。

非恒等の単一Pauliは全て検査の少なくとも一つと反可換なのでsyndromeが非零で検出できます。しかし $s(X_1)=s(X_2)=(0,1)$ で区別がつかず、二つの誤りの積は無害なスタビライザーではなく論理作用です。検出の条件 $PEP=0$ と、二つの誤りを同時訂正する条件 $PE_i^\dagger E_jP=c_{ij}P$ は異なるのです。
<!-- solution-end -->

<a id="ex-qinf27-c01"></a>

### 演習 C1：Steane符号で連続的な誤りも回復する

- Level: C
- 問題: 本文の $H$ を用いたSteane符号で、(a) 21個の単一Pauli誤りと $I$ のsyndromeが相異なること、(b) $\mathcal E=\{I,X_1,\ldots,X_7,Z_1,\ldots,Z_7,Y_1,\ldots,Y_7\}$ のKnill–Laflamme行列が $I_{22}$ であることを示せ。(c) $U=\cos\theta I+i\sin\theta X_2$ を物理系に作用させた後、syndrome測定と代表誤りの逆作用によって任意の符号密度演算子 $\rho$ が戻ることを示せ。$\theta\in\mathbb R$ とする。

<!-- solution-start -->
**詳細解答。** (a) 行列 $H$ の第1〜7列は順に $111,110,101,100,011,010,001$ で、非零の3ビット列をすべて一度ずつ取ります。[CSS syndrome式](#def-qinf27-css)より

$$
s(I)=(000,000),\quad
s(X_j)=(000,He_j),\quad
s(Z_j)=(He_j,000),\quad
s(Y_j)=(He_j,He_j).
$$

どの成分が非零かで $X,Z,Y$ が識別され、同じ種類では $He_j$ の違いで位置が識別されます。従って22個のsyndromeは相異なります。

(b) $E_i^\dagger E_i=I$ なので対角項は $P$。$i\ne j$ の場合は $E_i^\dagger E_j$ のsyndromeが $s(E_i)+s(E_j)\ne0$ となります。どれかの検査と反可換なので $PE_i^\dagger E_jP=0$。従って（未正規化の誤り集合に対する）[Knill–Laflamme行列](../QINF26/index.md#def-qinf26-kl-matrix)は $I_{22}$ です。Kraus作用素として使うときの確率重みは別に正規化する必要があります。

(c) $X_2^\dagger=X_2$、$X_2^2=I$ なので

$$
U^\dagger U
=(\cos\theta I-i\sin\theta X_2)
(\cos\theta I+i\sin\theta X_2)=I.
$$

任意の符号語 $|\psi\rangle$ に対して $U|\psi\rangle=\cos\theta|\psi\rangle+i\sin\theta X_2|\psi\rangle$ となります。$I$ と $X_2$ のsyndromeは $(000,000)$ と $(000,110)$ で異なるので、測定はそれぞれの成分を確率 $\cos^2\theta$、$\sin^2\theta$ で選びます。前者では $I$、後者では $X_2^\dagger=X_2$ を適用し、各枝の条件付き密度演算子は $\rho$ に戻ります。任意の $\rho=P\rho P$ でも線形性から

$$
\mathcal R(U\rho U^\dagger)
=\cos^2\theta\,\rho+\sin^2\theta\,X_2(X_2\rho X_2)X_2
=\rho.
$$

ユニタリ雑音には $\rho X_2$ と $X_2\rho$ の交差項が含まれますが、異なるsyndrome射影の間にあるため測定で消えます。これは確率的なPauli混合だけでなく、訂正可能な誤りの**コヒーレントな線形結合**も回復できる例です。
<!-- solution-end -->

## 8. 次へ：どこを失ったかが分かる場合

本講では、未知のPauli誤りに対して検査結果から適切な逆作用を選びました。次講では「失われた量子ビットの位置がすでに分かっている」消失雑音を扱います。位置情報の有無によって訂正条件はどう変わるでしょうか。
