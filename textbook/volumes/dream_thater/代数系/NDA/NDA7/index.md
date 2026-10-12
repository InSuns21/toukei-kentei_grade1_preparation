# NDA7 Thue–Siegel–Rothの定理

[Liouvilleの近似下界](../NDA6/index.md#thm-nda6-liouville-bound)から、次数$d$の代数的無理数$\alpha$への有理近似は分母の$d$乗より速くはなれません。一方、[Dirichlet近似の普遍下界](../NDA5/index.md#thm-nda5-dirichlet-lower-bound)によって、すべての無理数へ指数2の近似は無限に存在します。$d\ge3$では、指数2と$d$の間に大きな隔たりがあります。これは代数的数の性質でしょうか、それともLiouvilleの方法の限界でしょうか。

この章の中心結果は、代数的無理数の有理近似の限界が次数によらず**指数2**であることを示します。その完全証明には、多変数補助多項式を作り、高さ（係数の大きさ）と零点多重度を同時に制御する議論が必要です。まず定理の量化と帰結を確認し、後半で変数別の次数に基づく重み付け・補助多項式・有理点における非消滅性をつなぎ、主定理の核心証明を閉じます。

## 1. Rothの定理の正確な主張

次数3の$\sqrt[3]2$について、Liouvilleの評価は指数3の下界です。例えば指数$5/2$で良い近似が無限にあることを、そこからは否定できません。以下で述べる結果は、どんなに小さい正の余裕を設けても、その余裕を超える近似は有限個になると主張します。

<a id="thm-nda7-roth"></a>

<!-- formal-statement-start -->
> **定理（Thue–Siegel–Rothの定理：実数の場合）**  
> $\alpha\in\mathbb R\setminus\mathbb Q$を$\mathbb Q$上代数的な無理数とする。任意の実数$\varepsilon>0$に対し、既約な整数組$p\in\mathbb Z$、$q\in\mathbb Z_{>0}$で次を満たす有理数$p/q$は有限個しかない。

$$
\left|\alpha-\frac pq\right|<\frac1{q^{2+\varepsilon}}.
$$
<!-- formal-statement-end -->

**量化の順序**：$\alpha$を固定し、次に任意の$\varepsilon>0$を指定します。例外となる有理数の個数は$\alpha,\varepsilon$に依存して構いません。これは「ある$\varepsilon>0$で有限」と比べてはるかに強い主張です。なお指数2そのものでは[Dirichlet近似](../NDA5/index.md#thm-nda5-dirichlet-lower-bound)により無限個あり、正の$\varepsilon$を完全に取り除くことはできません。

主定理の完全証明は、第6〜8節の補助理論を用いて第9節で与えます。先に定理の帰結を証明し、なぜ補助理論が必要かを確認します。

## 2. 有限例外から定数付き下界へ

有限個の例外を除いて誤差が$q^{-s}$以上なら、例外を一つずつ吸収する正の定数$c$を作れます。この操作は$\varepsilon$を固定した後に行い、定数が$\varepsilon$に依存することを保持します。

<a id="lem-nda7-finite-to-uniform"></a>

<!-- formal-statement-start -->
> **補題（有限例外から一様下界を作る）**  
> 無理数$\alpha$と実数$s>0$を固定する。$|\alpha-p/q|<q^{-s}$を満たす既約有理数$p/q$が有限個なら、定数$c>0$が存在し、すべての整数$p$と正整数$q$について次が成立する。

$$
\left|\alpha-\frac pq\right|\ge\frac c{q^s}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

例外では誤差に$q^s$を掛けた正の数を記録し、有限個の最小値を採ります。非例外では定数1で評価できます。非既約分数は約分後の分母が元の分母以下であることを使います。

<!-- proof-start -->
### 証明

例外となる既約分数の有限集合を$E$と置きます。$\alpha$は無理数なので、$p/q\in E$について$|\alpha-p/q|>0$です。そこで

$$
c=\min\left(\{1\}\cup
\left\{q^s\left|\alpha-\frac pq\right|:\frac pq\in E\right\}\right)
$$

と定めます。右辺は空でない有限集合の正の要素の最小値なので$c>0$です。例外の既約分数では定義から$q^s|\alpha-p/q|\ge c$です。非例外の既約分数では$|\alpha-p/q|\ge q^{-s}\ge cq^{-s}$です。

任意の整数$p$と正整数$q$を取ります。$p/q$を$a/b$へ約分すると$1\le b\le q$です。既約分数への評価を用いると、$s>0$ゆえ

$$
\left|\alpha-\frac pq\right|
=\left|\alpha-\frac ab\right|
\ge cb^{-s}\ge cq^{-s}.
$$

これで全整数組に対して成立しました。
<!-- proof-end -->

逆向きは**一般には主張できません**。$|\alpha-p/q|\ge(1/10)q^{-s}$がすべての分数に成り立っても、その誤差が$(1/10)q^{-s}$と$q^{-s}$の間にある分数が無限個存在する可能性は残るからです。この補題はあくまで「有限例外 $\Rightarrow$ 一様下界」です。

<a id="cor-nda7-roth-uniform"></a>

<!-- formal-statement-start -->
> **系（Rothの定数付き下界）**  
> $\alpha\in\mathbb R\setminus\mathbb Q$が代数的無理数なら、任意の$\varepsilon>0$に対して$c(\alpha,\varepsilon)>0$が存在し、すべての$p\in\mathbb Z$と$q\in\mathbb Z_{>0}$について次が成り立つ。

$$
\left|\alpha-\frac pq\right|
\ge\frac{c(\alpha,\varepsilon)}{q^{2+\varepsilon}}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[Thue–Siegel–Rothの定理](#thm-nda7-roth)を固定した$\alpha,\varepsilon$に適用し、[有限例外から一様下界を作る補題](#lem-nda7-finite-to-uniform)で$s=2+\varepsilon$を代入します。補題の$c$を$c(\alpha,\varepsilon)$と書けば結論です。定数を$\varepsilon$に一様に選んだとは主張していません。
<!-- proof-end -->

## 3. 無理性指数が2になるまで

<a id="thm-nda7-algebraic-exponent"></a>

<!-- formal-statement-start -->
> **定理（代数的無理数の無理性指数）**  
> $\alpha\in\mathbb R\setminus\mathbb Q$が$\mathbb Q$上代数的なら、[無理性指数](../NDA5/index.md#def-nda5-irrationality-exponent)は次の値を取る。

$$
\mu(\alpha)=2.
$$
<!-- formal-statement-end -->

### 証明の見取り図

下界はDirichletです。上界は無理性指数の上限の定義を使います。$\mu(\alpha)>2$なら指数2より大きい許容指数を一つ選べるため、Rothの有限性と衝突します。

<!-- proof-start -->
### 証明

$\alpha$が無理数なので[普遍下界](../NDA5/index.md#thm-nda5-dirichlet-lower-bound)から$\mu(\alpha)\ge2$です。

逆に$\mu(\alpha)>2$と仮定します。$\mu(\alpha)$が有限なら$2<\nu<\mu(\alpha)$を、無限なら$\nu=3$を選びます。[無理性指数の定義](../NDA5/index.md#def-nda5-irrationality-exponent)で許される指数の上限が$\mu(\alpha)$なので、ある許容指数$\lambda>\nu$が存在します。従って

$$
\left|\alpha-\frac pq\right|<q^{-\lambda}
$$

を満たす相異なる既約分数が無限個存在します。$q=1$では$|\alpha-p|<1$となる整数$p$は有限個なので、分母$q\ge2$のものも無限個です。各々について

$$
\left|\alpha-\frac pq\right|
<q^{-\lambda}<q^{-\nu}
=q^{-(2+\varepsilon)},\qquad \varepsilon=\nu-2>0.
$$

しかし[Thue–Siegel–Rothの定理](#thm-nda7-roth)によれば、この$\varepsilon$について上の近似は有限個しかありません。矛盾により$\mu(\alpha)\le2$であり、下界と合わせて等号が従います。
<!-- proof-end -->

[Liouville数の無理性指数は無限大](../NDA6/index.md#prop-nda6-liouville-exponent)ですが、代数的無理数では上の定理により2です。ただし逆に無理性指数2の実数が代数的だという結論は得られません。

## 4. 補助多項式の前提：小さい整数係数の非零解

Rothの証明では、非常に多くの係数を持つ多項式へ線形条件を課します。条件より未知係数が多いだけなら非零有理解は得られますが、分数への代入値の評価には整数係数の**大きさ**も必要です。まず鳩の巣原理で整数解の大きさを制御します。

<a id="lem-nda7-integer-kernel"></a>

<!-- formal-statement-start -->
> **補題（整数線形方程式の箱詰め補題）**  
> $1\le M<N$と$H\ge1$を満たす整数$M,N,H$を取る。整数行列$A\in\mathbb Z^{M\times N}$の各成分が絶対値$H$以下なら、非零ベクトル$x\in\mathbb Z^N$が存在して$Ax=0$となる。さらに

$$
K=\left\lfloor(2NH+1)^{M/(N-M)}\right\rfloor+1
$$

> と置けば、各成分の絶対値が$K$以下の$x$を選べる。
<!-- formal-statement-end -->

### 証明の見取り図

$0$から$K$までの各整数を成分に持つ入力は$(K+1)^N$個あります。その像$Ax$の候補は$(2NHK+1)^M$個以下です。前者の個数が多いので、差が非零で核に入る二つの入力を見つけます。

<!-- proof-start -->
### 証明

$S=\{0,\ldots,K\}^N$を考えます。$v\in S$について各行$j$の値は

$$
|(Av)_j|
=\left|\sum_{i=1}^Na_{ji}v_i\right|
\le\sum_{i=1}^N|a_{ji}|\,|v_i|
\le NHK.
$$

よって像$Av$の整数ベクトルは高々$(2NHK+1)^M$通りです。$K>(2NH+1)^{M/(N-M)}$かつ$K\ge1$より

$$
(2NHK+1)^M
\le((2NH+1)K)^M
<K^{N-M}K^M
=K^N<(K+1)^N.
$$

$|S|=(K+1)^N$は像の候補数より大きいので、鳩の巣原理を集合$S$から有限個の像への写像に適用します。すると異なる$u,v\in S$で$Au=Av$となります。$x=u-v$と取れば

$$
x\ne0,\qquad Ax=0,\qquad |x_i|\le K
$$

が成り立ちます。
<!-- proof-end -->

例えば$A=\begin{pmatrix}1&1&1\\1&2&3\end{pmatrix}$では$x=(1,-2,1)^\mathsf T$が非零整数解で、二つの行に代入するとそれぞれ$1-2+1=0$、$1-4+3=0$です。

## 5. 高さ・展開係数・消滅条件

整数係数多項式では、係数の最大絶対値を**高さ**として測ります。この量が大きすぎると、後で「非常に近い有理数へ代入したら値が小さい」と証明するときに失敗します。

<a id="def-nda7-polynomial-height"></a>

<!-- formal-statement-start -->
> **定義（多項式の高さ）**  
> 整数$m\ge1$と零でない多項式
>
> $$P(\boldsymbol X)=\sum_{\boldsymbol j}c_{\boldsymbol j}\prod_{i=1}^mX_i^{j_i}
> \in\mathbb Z[X_1,\ldots,X_m]$$
>
> に対し、次を定める。

$$
H(P)=\max_{\boldsymbol j}|c_{\boldsymbol j}|.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-nda7-polynomial-height -->
**定義の確認**：$P(X,Y)=2X^2-5XY+3Y^2+1$なら$H(P)=5$です。また非零整数係数多項式では$H(P)\ge1$です。
<!-- definition-example-end -->

多項式がある点でどれほど高い次数まで零になるか調べるため、その点の周りの展開係数を扱います。

<a id="def-nda7-taylor-coefficient"></a>

<!-- formal-statement-start -->
> **定義（多変数多項式の展開係数）**  
> $P\in\mathbb Q[X,Y]$に対し、次の有限展開での$U^jV^k$の係数を$P_{[j,k]}(X,Y)$と記す。

$$
P(X+U,Y+V)=\sum_{j,k\ge0}P_{[j,k]}(X,Y)U^jV^k.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-nda7-taylor-coefficient -->
**定義の確認**：$P(X,Y)=X^2-XY$なら

$$
P(X+U,Y+V)
=X^2-XY+(2X-Y)U-XV+U^2-UV.
$$

従って$P_{[1,0]}=2X-Y$、$P_{[0,1]}=-X$、$P_{[1,1]}=-1$です。
<!-- definition-example-end -->

<a id="lem-nda7-vanishing-polynomial"></a>

<!-- formal-statement-start -->
> **補題（代数的な点での高次消滅条件）**  
> $\alpha$を$\mathbb Q$上次数$d\ge2$の代数的無理数とする。整数$D\ge4d$、$t=\lfloor D/(4d)\rfloor$に対し、非零多項式$P\in\mathbb Z[X,Y]$で各変数の次数が高々$D$、かつ$j+k<t$となるすべての非負整数$j,k$について次を満たすものが存在する。

$$
P_{[j,k]}(\alpha,\alpha)=0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

未知係数は$(D+1)^2$個です。一つの展開係数が代数的拡大$\mathbb Q(\alpha)$で零である条件は、最大$d$個の有理係数一次方程式へ変換できます。条件数が未知数より少ないことを数えます。

<!-- proof-start -->
### 証明

$$
P(X,Y)=\sum_{a=0}^D\sum_{b=0}^Dc_{ab}X^aY^b
$$

の$(D+1)^2$個の$c_{ab}$を未知有理数とします。二項展開より

$$
P_{[j,k]}(\alpha,\alpha)
=\sum_{a=j}^D\sum_{b=k}^D
c_{ab}\binom aj\binom bk\,\alpha^{a+b-j-k}.
$$

[最小多項式の存在と次数](../../FLD/FLD1/index.md#thm-fld1-minimal-polynomial)から、$\mathbb Q(\alpha)$は$1,\alpha,\ldots,\alpha^{d-1}$を$\mathbb Q$基底とします。その基底に上式の各冪を表せば、一つの$P_{[j,k]}(\alpha,\alpha)=0$は高々$d$個の有理係数斉次一次方程式になります。

$j+k<t$となる非負整数組は$1+2+\cdots+t=t(t+1)/2$個です。従って条件は高々$R=dt(t+1)/2$個です。$D\ge4d$から$t\le D/(4d)$、$t+1\le D/(2d)$なので

$$
R\le\frac d2\left(\frac D{2d}\right)^2
=\frac{D^2}{8d}<(D+1)^2.
$$

未知係数の数より条件数が少ないため、非零有理解が存在します。すべての係数に共通分母を掛ければ零でない整数係数多項式が得られます。
<!-- proof-end -->

ただし$P(X,Y)=(X-Y)^t$もこの消滅条件を満たし、$P(x,x)=0$がすべての$x$で成立します。「消滅する補助多項式が存在する」だけでは、有理数を代入したときの**非零の値**の下界を使えません。

完全証明には、次の論理をさらに閉じる必要があります。

1. 多変数多項式の係数を同時に整数化し、[箱詰め補題](#lem-nda7-integer-kernel)で高さの上界を得る。
2. 変数ごとに異なる次数を取り、近似分数の分母を急速に増やして選ぶ。
3. 有理点での消滅次数を上から制限する補題を証明し、選んだ点で多項式が高次まで消え続けないことを示す。
4. 最初に非零となる展開係数の、整数性による下界と近似誤差による上界を比較し矛盾させる。

ここまでの2変数の例ではまだ不足します。第6節で規格化した指数を導入し、第7節で係数の大きさを制御する構成、第8節で有理点での非消滅を保証する補題、第9節で主定理を順に証明します。参考として[A. Milojevic, *An elementary approach to Roth's theorem* (2022)](https://aleksa-milojevic.github.io/expository/roth.pdf)に完全な証明があります。

## 6. 次数で規格化した零点の指数

第5節の2変数の消滅条件を一般の$m$変数へ広げます。各変数の次数が異なる場合、単に導関数の総次数を数えても、分母が急速に増える近似を公平に比較できません。そこで各偏微分の回数を、その変数に割り当てた次数で割って足します。

非負整数の多重添字を$\boldsymbol\mu=(\mu_1,\ldots,\mu_m)$と書きます。多項式$P(\boldsymbol X)$について、$P(\boldsymbol X+\boldsymbol U)$の$\boldsymbol U^{\boldsymbol\mu}$の係数を$P_{[\boldsymbol\mu]}(\boldsymbol X)$と書きます。これは第5節の[展開係数](#def-nda7-taylor-coefficient)の$m$変数版で、

$$
P_{[\boldsymbol\mu]}(\boldsymbol X)
=\frac{1}{\mu_1!\cdots\mu_m!}
\frac{\partial^{|\boldsymbol\mu|}P}
{\partial X_1^{\mu_1}\cdots\partial X_m^{\mu_m}}(\boldsymbol X)
$$

です。係数は二項係数で表されるため、$P$が整数係数なら$P_{[\boldsymbol\mu]}$も整数係数です。

<a id="def-nda7-weighted-index"></a>

<!-- formal-statement-start -->
> **定義（規格化した零点の指数）**  
> $\boldsymbol d=(d_1,\ldots,d_m)\in\mathbb Z_{>0}^m$、点$\boldsymbol\xi=(\xi_1,\ldots,\xi_m)\in\mathbb R^m$、零でない多項式$P\in\mathbb R[X_1,\ldots,X_m]$について、
>
> $$\operatorname{ind}(P;\boldsymbol d,\boldsymbol\xi)
> =\min_{\boldsymbol\mu:\,P_{[\boldsymbol\mu]}(\boldsymbol\xi)\ne0}
> \sum_{i=1}^m\frac{\mu_i}{d_i}$$
>
> と定める。最小値を取る添字は有限個で存在する。各変数の次数が$d_i$以下なら、この指数は$0$以上$m$以下である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-nda7-weighted-index -->
**定義の確認**：$P(X,Y)=(X-a)^2(Y-b)$、$\boldsymbol d=(4,2)$、$\boldsymbol\xi=(a,b)$とすると

$$
P(a+U,b+V)=U^2V
$$

なので、非零の展開係数に対応する唯一の添字は$(2,1)$であり、

$$
\operatorname{ind}(P;(4,2),(a,b))
=\frac24+\frac12=1.
$$

同じ多項式でも、点を$(a,b+1)$に替えると展開に$U^2$の項が生じるため、指数は$2/4=1/2$へ下がります。
<!-- definition-example-end -->

<a id="lem-nda7-index-rules"></a>

<!-- formal-statement-start -->
> **補題（指数の演算則）**  
> 正の整数列$\boldsymbol d$と点$\boldsymbol\xi$を固定する。零でない多項式$P,Q$について、$P+Q\ne0$の場合
>
> $$\operatorname{ind}(P+Q)\ge
> \min\{\operatorname{ind}(P),\operatorname{ind}(Q)\},$$
>
> また
>
> $$\operatorname{ind}(PQ)=\operatorname{ind}(P)+\operatorname{ind}(Q)$$
>
> が成立する。非負整数の多重添字$\boldsymbol\nu$について$P_{[\boldsymbol\nu]}\ne0$なら
>
> $$\operatorname{ind}(P_{[\boldsymbol\nu]})
> \ge\operatorname{ind}(P)-\sum_i\nu_i/d_i.$$
>
> すべての指数は同じ$(\boldsymbol d,\boldsymbol\xi)$について計算する。
<!-- formal-statement-end -->

### 証明の見取り図

点$\boldsymbol\xi$を原点へ移し、非零の単項式の重み$\sum_i\mu_i/d_i$を比較します。積の最小重みは、最小重みを持つ多項式部分同士の積で決まります。この積は零多項式にならないので、打消しは起こりません。

<!-- proof-start -->
### 証明

$P(\boldsymbol\xi+\boldsymbol U)=\sum a_{\boldsymbol\mu}\boldsymbol U^{\boldsymbol\mu}$とします。非零の係数を持つ項の最小重みが$\operatorname{ind}(P)$です。和では元の二多項式にない重みの低い項は新しく生じないので、最初の不等式が成立します。

$P$の最小重み$t_P$の項だけを集めた多項式を$P_0$、$Q$のそれを$Q_0$とします。どちらも零多項式ではありません。多項式環$\mathbb R[\boldsymbol U]$には零因子がないので$P_0Q_0\ne0$です。積の重みが$t_P+t_Q$より小さい項は存在せず、ちょうどその重みの部分が$P_0Q_0$なので、積の等号を得ます。

最後に、$\boldsymbol U^{\boldsymbol\mu}$を$\boldsymbol\nu$回微分して階乗で規格化したとき、残る指数は$\boldsymbol\mu-\boldsymbol\nu$です。残る項の重みは

$$
\sum_i\frac{\mu_i-\nu_i}{d_i}
=\sum_i\frac{\mu_i}{d_i}-\sum_i\frac{\nu_i}{d_i}.
$$

元の各非零項の重みは$\operatorname{ind}(P)$以上ですから、微分後の指数も補題の下界以上です。
<!-- proof-end -->

## 7. 高さを制御した補助多項式を作る

ここから$\alpha$を次数$r\ge2$の**実代数的整数**とします。この条件の下では最小多項式が首係数1の整数係数多項式となり、$\alpha$の高い冪を整数係数で低い冪へ戻せます。一般の代数的数へ戻す手順は第9節で証明します。

まず、整数解の[箱詰め補題](#lem-nda7-integer-kernel)を、消滅条件を課す連立一次方程式へ実際に適用します。

<a id="lem-nda7-auxiliary-polynomial"></a>

<!-- formal-statement-start -->
> **補題（高さ付き補助多項式）**  
> $\alpha\in\mathbb R$を次数$r\ge2$の代数的整数とする。$0<\eta<1/4$、整数$m\ge16r/\eta^2$を固定する。$\alpha$のみに依存する定数$C_\alpha>0$が存在し、任意の正整数$d_1,\ldots,d_m$について零でない
>
> $$P\in\mathbb Z[X_1,\ldots,X_m]$$
>
> が存在して、各変数の次数$\deg_{X_i}P\le d_i$、および
>
> $$\operatorname{ind}(P;\boldsymbol d,
> (\alpha,\ldots,\alpha))
> \ge m\left(\frac12-\eta\right),$$
>
> $$H(P)\le 2^{C_\alpha\sum_{i=1}^m d_i}$$
>
> を同時に満たす。
<!-- formal-statement-end -->

### 証明の見取り図

未知係数は$\prod_i(d_i+1)$個あります。消滅条件一つは、$\mathbb Q(\alpha)$での等式を$r$個以下の有理数上の条件へ分けたものです。全添字の平均的な規格化次数は$m/2$なので、それより$m\eta$以上小さい添字は、平方偏差の和を数えるだけで少数だと分かります。最後に整数係数への変換と箱詰め補題で高さを抑えます。

<!-- proof-start -->
### 証明

$S=\sum_i d_i$、$N=\prod_i(d_i+1)$と置き、

$$
P(\boldsymbol X)=
\sum_{0\le j_i\le d_i}
c_{\boldsymbol j}\prod_i X_i^{j_i}
$$

の$N$個の係数$c_{\boldsymbol j}$を未知整数とします。指数を$t=m(1/2-\eta)$以上にするには、

$$
\sum_i\frac{\mu_i}{d_i}<t
$$

であるすべての多重添字について$P_{[\boldsymbol\mu]}(\alpha,\ldots,\alpha)=0$とすれば十分です。

まず添字数を評価します。直積集合

$$
\mathcal J=\{0,\ldots,d_1\}\times\cdots\times\{0,\ldots,d_m\},
\qquad |\mathcal J|=N
$$

の各添字$\boldsymbol u=(u_1,\ldots,u_m)$に対して$z(\boldsymbol u)=\sum_i u_i/d_i$と置きます。次の有限和は、$1+\cdots+d=d(d+1)/2$および$1^2+\cdots+d^2=d(d+1)(2d+1)/6$を代入して確かめられます。

$$
\frac1{d_i+1}\sum_{u=0}^{d_i}\frac u{d_i}
=\frac12,
$$

$$
\frac1{d_i+1}\sum_{u=0}^{d_i}
\left(\frac u{d_i}-\frac12\right)^2
=\frac{d_i+2}{12d_i}\le\frac14.
$$

ここで全添字上での二乗偏差を展開します。

$$
\left(z(\boldsymbol u)-\frac m2\right)^2
=\sum_i\left(\frac{u_i}{d_i}-\frac12\right)^2
+2\sum_{i<j}\left(\frac{u_i}{d_i}-\frac12\right)
\left(\frac{u_j}{d_j}-\frac12\right).
$$

両辺を$\mathcal J$にわたり足して$N$で割ると、$i\ne j$の積の平均は直積構造により一変数平均の積となり、どちらの一変数平均も零だから交差項は消えます。従って

$$
\frac1N\sum_{\boldsymbol u\in\mathcal J}
\left(z(\boldsymbol u)-\frac m2\right)^2
=\sum_i\frac{d_i+2}{12d_i}\le\frac m4.
$$

$z(\boldsymbol u)<t=m(1/2-\eta)$の添字では二乗偏差が$m^2\eta^2$より大きいので、上式の非負項のうち条件を満たすものだけを足し上げると

$$
\frac{\#\{\boldsymbol u\in\mathcal J:z(\boldsymbol u)<t\}}{N}
\le\frac{1}{4m\eta^2}
$$

を得ます。確率分布の定理を使わず、有限個の整数の和だけから導きました。

$\alpha$の首係数1の最小多項式を$f(T)=T^r+a_{r-1}T^{r-1}+\cdots+a_0$とします。[最小多項式の基底表示](../../FLD/FLD1/index.md#thm-fld1-minimal-polynomial)により$1,\alpha,\ldots,\alpha^{r-1}$は$\mathbb Q(\alpha)$の$\mathbb Q$基底です。また

$$
\alpha^r=-\sum_{\ell=0}^{r-1}a_\ell\alpha^\ell
$$

の右辺は整数係数です。$A=2+r(1+\max_\ell|a_\ell|)$と取ると、上式を繰り返し代入する帰納法により、$\alpha^k$の基底表示の各整数係数の絶対値は$A^k$以下となります（$k=0,\ldots,r-1$から開始し、乗算ごとに係数の最大絶対値が高々$r(1+\max|a_\ell|)$倍になる）。

$P_{[\boldsymbol\mu]}$の式では

$$
P_{[\boldsymbol\mu]}(\alpha,\ldots,\alpha)
=\sum_{\boldsymbol j\ge\boldsymbol\mu}
c_{\boldsymbol j}
\prod_i\binom{j_i}{\mu_i}\,
\alpha^{\sum_i(j_i-\mu_i)}.
$$

二項係数の積は高々$2^S$であり、冪は$S$以下です。従って基底の$r$成分に分けた各消滅条件は、係数絶対値が高々$T=(2A)^S$の**整数係数斉次一次方程式**になります。

各添字から高々$r$本の方程式が出るので、方程式の総数$M$は

$$
M\le\frac{rN}{4m\eta^2}\le\frac N{64}<N
$$

です。[整数線形方程式の箱詰め補題](#lem-nda7-integer-kernel)をこの$M$行$N$列の係数行列へ適用します。$M=0$なら$c_{\boldsymbol0}=1$などの非零解を取ればよいので、以下は$M\ge1$とします。非零整数解が存在し、全係数の絶対値は

$$
\max_{\boldsymbol j}|c_{\boldsymbol j}|
\le\left\lfloor(2NT+1)^{M/(N-M)}\right\rfloor+1
$$

以下です。$N\le 2^S$、$T=(2A)^S$、$M/(N-M)\le1/63$であり、$S\ge1$なので

$$
2NT+1\le3(4A)^S\le(12A)^S.
$$

従って定数$C_\alpha=3+\log_2(12A)$を採れば

$$
H(P)\le 2^{C_\alpha S}
$$

です。$M$本の方程式が成立するため所定の展開係数がすべて零となり、指数の下界も確保されました。
<!-- proof-end -->

**条件数を$d$回掛けるだけでは足りません。** 大きな次数$d_i$にわたって高い指数を確保し、同時に係数が$2^{C_\alpha S}$程度であることが、後の矛盾式で必要です。

## 8. Rothの補題：有理点で高次消滅できない

前節の$P$は代数的な点$(\alpha,\ldots,\alpha)$で多くの展開係数を消します。しかし有理点においても消滅し続ける可能性は、[対角線上で零になる例](#lem-nda7-vanishing-polynomial)が示しています。異なる変数へ割り当てた次数を**急激に小さく**し、有理数の分母は逆に十分大きく取ることで、この問題を解決します。

<a id="lem-nda7-generalized-wronskian"></a>

<!-- formal-statement-start -->
> **補題（多項式の線形独立性と一般化Wronskian）**  
> 体$\mathbb Q$上一次独立な多項式$F_0,\ldots,F_s\in\mathbb Q[X_1,\ldots,X_n]$に対し、各$|\boldsymbol\mu_j|\le j$を満たす非負多重添字$\boldsymbol\mu_0,\ldots,\boldsymbol\mu_s$が存在して
>
> $$\det\bigl((F_k)_{[\boldsymbol\mu_j]}\bigr)_{0\le j,k\le s}\ne0$$
>
> が多項式として成立する。
<!-- formal-statement-end -->

### 証明の見取り図

変数を$X_i=T^{B^{i-1}}$へ置き換え、すべての単項式の指数を異なる整数へ符号化します。すると一変数の一次独立な多項式に変わり、導関数を並べた行列式が零多項式でないことを利用できます。微分方程式の定理は使わず、多項式の一次独立性だけで証明します。置換後の微分を連鎖律で元の多変数微分へ戻します。

<!-- proof-start -->
### 証明

$B$を全$F_j$の各変数次数より大きい整数とします。各単項式$\prod_iX_i^{k_i}$は置換によって$T^{\sum_i k_iB^{i-1}}$に移ります。$0\le k_i<B$の整数の$B$進表示の一意性からこの写像は単項式上単射です。ゆえに

$$
G_j(T)=F_j(T,T^B,\ldots,T^{B^{n-1}})
$$

は$\mathbb Q[T]$で一次独立です。

一次独立な一変数多項式に可逆な定数係数の列基本変形を行うと、$T=0$における最小非零次数が互いに異なる多項式$G'_j$を得ます。その次数を相異なる整数$b_j$、最低次係数を$a_j\ne0$とすると、通常のWronskian

$$
W(T)=\det\bigl((d/dT)^iG'_j(T)\bigr)_{0\le i,j\le s}
$$

の最低次項の係数は

$$
\left(\prod_j a_j\right)
\det\bigl((b_j)_i\bigr)_{0\le i,j\le s},
\qquad (b)_i=b(b-1)\cdots(b-i+1).
$$

$(b)_i$は$b$の次数$i$の首係数1の多項式なので、右の行列式は相異なる$b_j$のVandermonde行列式$\prod_{j<k}(b_k-b_j)\ne0$です。元の$G_j$へ戻す列基本変形はWronskianを非零定数倍するだけです。従って$W$は恒等的に零ではありません。

一方、連鎖律を$i$回使うと$(d/dT)^iG_j$は$|\boldsymbol\mu|\le i$の$(F_j)_{[\boldsymbol\mu]}$を置換点$(T,T^B,\ldots)$で評価したものの多項式係数線形結合です。行列式を行ごとに展開すれば、もしすべての$|\boldsymbol\mu_j|\le j$に対応する多変数行列式が零多項式なら$W(T)$も恒等的に零となり矛盾します。
<!-- proof-end -->

次に証明するのは、有理点での高次消滅を禁じる核心の補題です。ここでは先の箱詰め補題と異なり、有理点で**最初に非零になる展開係数の規格化次数**を上から制限します。

<a id="lem-nda7-roth-index"></a>

<!-- formal-statement-start -->
> **補題（Rothの補題）**  
> 整数$m\ge1$、実数$\sigma$、正整数列$\boldsymbol d$、非零の整数係数多項式$P$、既約有理数の列$p_i/q_i$を取る。各々の条件は次のとおりとする。

$$
0<\sigma\le\frac12,\quad
\boldsymbol d=(d_1,\ldots,d_m),\quad
P\in\mathbb Z[X_1,\ldots,X_m].
$$

> 各変数について$\deg_{X_i}P\le d_i$である。また各$i$で$p_i\in\mathbb Z$、$q_i>0$は互いに素とする。さらに、
>
> **（R1）** 各$i<m$で$d_{i+1}\le\sigma d_i$、
>
> **（R2）** 各$i$で
>
> $$q_i^{d_i}\ge
> 2^{16m d_1/\sigma}\,H(P)^{1/\sigma}$$
>
> を仮定する。このとき$\boldsymbol\rho=(p_1/q_1,\ldots,p_m/q_m)$における指数は
>
> $$\operatorname{ind}(P;\boldsymbol d,\boldsymbol\rho)
> \le2m\,\sigma^{\,1/2^{m-1}}$$
>
> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

一変数なら、有理根の高い重複度は$(qX-p)$が何度も割り切ることを意味し、首係数の大きさが分母の冪以上になって高さと矛盾します。多変数では$P$を「最初の$m-1$変数」と「最後の1変数」の積の和へ最小個数で分けます。二組の一次独立性から作る一般化Wronskianが非零になり、元の$P$の高い指数がそのWronskianへ移る下界と、変数を一つ減らす帰納法による上界が衝突します。

<!-- proof-start -->
### 証明

**（1）指数と高さの基本評価。** [指数の演算則](#lem-nda7-index-rules)は積と偏微分に適用できます。また$D_P=\sum_i\deg_{X_i}P$とし、整数係数多項式の高さを係数の最大絶対値で定義すると、二つの多項式の係数を畳み込むことから

$$
H(AB)\le2^{D_A+D_B}H(A)H(B)
$$

が成立します。実際、各係数の和に現れる積の候補は高々$\prod_i(\deg_i A+1)(\deg_i B+1)\le2^{D_A+D_B}$個です。規格化偏微分について二項係数の積は$2^{\sum d_i}$以下なので、

$$
H(P_{[\boldsymbol\mu]})\le2^{\sum_i d_i}H(P).
$$

**（2）$m=1$。** 有理点$p/q$で$P$が$k$次の零点を持つなら$(X-p/q)^k$が$\mathbb Q[X]$で$P$を割ります。整数係数で割り切れることを確認します。整数係数多項式$A(X)=a_nX^n+\cdots+a_0$が$p/q$を根に持つなら

$$
a_np^n+qa_{n-1}p^{n-1}+\cdots+q^na_0=0.
$$

右辺の後ろの項はすべて$q$の倍数なので$q\mid a_np^n$です。$\gcd(p,q)=1$より$q\mid a_n$となります。$a_n/q$は整数ですから、

$$
A(X)-\frac{a_n}{q}X^{n-1}(qX-p)
$$

は最高次項が消えた整数係数多項式で、依然$p/q$を根に持ちます。次数に関する帰納法で$(qX-p)\mid A(X)$が$\mathbb Z[X]$で成り立つことが示されます。$(X-p/q)^k$が$P$を割り切るとき、この除算を$k$回繰り返して

$$
P(X)=(qX-p)^kB(X),\qquad B(X)\in\mathbb Z[X]
$$

を得ます。$P$の首係数は$q^k$の倍数ですから$H(P)\ge q^k$です。（R2）から

$$
q^{d_1}\ge H(P)^{1/\sigma}\ge q^{k/\sigma}.
$$

$q>1$なので$k/d_1\le\sigma$です。$q=1$は（R2）の右辺が$2$より大きいため不可能です。これは求める$2\sigma$より強い評価です。

**（3）分離階数と整数係数分解。** $m\ge2$について$P$を$X_m$の多項式として見て、係数多項式を列ベクトルに並べます。その整数係数行列の階数を$s+1$とします。整数行列の列が生成する$\mathbb Z$加群には$\mathbb Z$基底を選べます。これは最初の座標の整数全体が作るイデアルの正の生成元を選び、それを持つ列を一つ取って第一座標を消去し、残る座標について帰納法を行えば示せます。

この基底に各列を整数係数で表すことにより

$$
P(\boldsymbol X',X_m)=\sum_{j=0}^sF_j(\boldsymbol X')G_j(X_m),
\qquad \boldsymbol X'=(X_1,\ldots,X_{m-1}),
$$

を得ます。$F_j,G_j$はともに整数係数で、各組が$\mathbb Q$上一次独立です。$s\le d_m$であり、変数別次数はそれぞれ$\deg_iF_j\le d_i$、$\deg G_j\le d_m$です。

$F_0,\ldots,F_s$へ[第8節前半で作った非零行列式の構成](#lem-nda7-generalized-wronskian)を適用します。$|\boldsymbol\mu_j|\le j$である多重添字を取り、

$$
U(\boldsymbol X')
=\det\bigl((F_k)_{[\boldsymbol\mu_j]}\bigr)_{j,k=0}^s
\ne0
$$

を得ます。同じ非消滅の補題を一変数多項式の組$G_0,\ldots,G_s$に適用すると

$$
V(X_m)
=\det\bigl((G_k)_{[i]}\bigr)_{i,k=0}^s
\ne0
$$

です。規格化微分は和・積に対して線形であり、変数群が異なるため、[行列式の乗法性](../../../基礎科目/LA/LA3C/index.md#thm-la3c-det-multiplicative)を有限行列に適用すると

$$
W(\boldsymbol X)=U(\boldsymbol X')V(X_m)
=\det\bigl(P_{[(\boldsymbol\mu_j,i)]}(\boldsymbol X)\bigr)_{j,i=0}^s
\ne0.
$$

**（4）$W$の高さ。** 変数ごとの次数の和$S=\sum_i d_i$は、（R1）および$\sigma\le1/2$から

$$
S\le d_1(1+\sigma+\cdots+\sigma^{m-1})\le2d_1.
$$

各行列要素の高さは$2^S H(P)$以下で、行列式の各積は$s+1$個の多項式の積です。（1）の高さの積評価を順に使い、$(s+1)!\le2^{(s+1)d_1}$（$s\le d_1$）を使えば

$$
H(W)\le(s+1)!\,2^{2S(s+1)}H(P)^{s+1}
\le2^{5d_1(s+1)}H(P)^{s+1}
\le2^{6d_1(s+1)}H(P)^{s+1}.
$$

$U$と$V$は異なる変数を使う整数係数多項式なので、積の各係数は一対の係数の積です。従って$H(W)=H(U)H(V)$、かつ$H(U),H(V)\ge1$より

$$
H(U)\le H(W),\qquad H(V)\le H(W).
$$

**（5）$W$の指数の下界。** $t=\operatorname{ind}(P;\boldsymbol d,\boldsymbol\rho)$と書きます。[指数の微分則](#lem-nda7-index-rules)、$|\boldsymbol\mu_j|\le s\le d_m$および$d_m/d_{m-1}\le\sigma$より、恒等的に零でない行列要素について次を得ます。零の要素を含む行列式の置換項は零なので、以下の指数評価では非零要素のみを扱います。

$$
\operatorname{ind}\bigl(P_{[(\boldsymbol\mu_j,i)]}\bigr)
\ge t-\frac{|\boldsymbol\mu_j|}{d_{m-1}}-\frac{i}{d_m}
\ge t-\sigma-\frac{i}{d_m}.
$$

非零多項式の指数は零以上なので、さらに

$$
\operatorname{ind}\bigl(P_{[(\boldsymbol\mu_j,i)]}\bigr)
\ge\max\left(t-\frac{i}{d_m},0\right)-\sigma
$$

と書けます。行列式を置換の和へ展開し、[積・和の指数則](#lem-nda7-index-rules)を用いると

$$
\operatorname{ind}(W)\ge
\sum_{i=0}^s\max\left(t-\frac{i}{d_m},0\right)-(s+1)\sigma.
$$

$s\le d_m$なので、$s\ge1$では$i/d_m\le i/s$です。関数$f_t(x)=\max(t-x,0)$について、任意の$a,b\in[0,1]$と$0\le\theta\le1$に対し
$$
f_t((1-\theta)a+\theta b)
\le (1-\theta)f_t(a)+\theta f_t(b)
$$
が成り立ちます。これは$t-((1-\theta)a+\theta b)$が$t-a,t-b$の加重平均であり、それぞれの正の部分を取った値の加重平均以下になることから直接確かめられます。$s\ge1$について、この不等式を各小区間の両端点へ適用して積分すると、各区間の積分は端点値の平均以下です。すなわち

$$
\int_0^1 f_t(x)\,dx
\le\frac1s\left(
\frac{f_t(0)+f_t(1)}2+
\sum_{i=1}^{s-1}f_t(i/s)\right).
$$

また各内点で$f_t(i/s)\le(1-i/s)f_t(0)+(i/s)f_t(1)$だから、内点値の和は高々$(s-1)(f_t(0)+f_t(1))/2$です。従って上の台形平均は、$s+1$個の等間隔点の単純平均以下であり、

$$
\sum_{i=0}^s f_t(i/s)
\ge(s+1)\int_0^1f_t(x)\,dx.
$$

$0\le t\le1$なら積分は$t^2/2$、$t\ge1$なら$t-1/2\ge t/2$です。$s=0$の場合には和が$t\ge\min(t,t^2)/2$となります。従っていずれの場合も

$$
\operatorname{ind}(W)
\ge\frac{s+1}{2}\min(t,t^2)-(s+1)\sigma.
$$

**（6）$W$の指数の上界。** 各$F_j,G_j$の次数制限と行列式の構造から、

$$
\deg_{X_i}U\le(s+1)d_i\ (i<m),\qquad
\deg_{X_m}V\le(s+1)d_m.
$$

$\boldsymbol d'=(s+1)(d_1,\ldots,d_m)$と置きます。（R1）は$\boldsymbol d'$でも成立します。さらに（R2）を$s+1$乗し、（4）の高さ上界を使うと

$$
q_i^{d'_i}
\ge2^{16m d'_1/\sigma}H(P)^{(s+1)/\sigma}
\ge2^{16(m-1)d'_1/\sigma}H(U)^{1/\sigma}
$$

が$i<m$に対して成立します。二番目の不等式は$16m\ge16(m-1)+6$を使っています。$V$についても

$$
q_m^{d'_m}\ge2^{16d'_m/\sigma}H(V)^{1/\sigma}
$$

が同じ理由で成立します。

変数が一つ少ない$U$へ帰納法を適用し、一変数の$V$へ（2）を適用すると、

$$
\operatorname{ind}(U;(d'_1,\ldots,d'_{m-1}),\boldsymbol\rho')
\le2(m-1)\sigma^{1/2^{m-2}},
$$

$$
\operatorname{ind}(V;d'_m,p_m/q_m)\le\sigma.
$$

[積の指数則](#lem-nda7-index-rules)から、もとの次数列に戻す際に指数は$s+1$倍になるので

$$
\operatorname{ind}(W;\boldsymbol d,\boldsymbol\rho)
\le(s+1)\left(2(m-1)\sigma^{1/2^{m-2}}+\sigma\right).
$$

**（7）上下界の結合。** （5）と（6）より

$$
\frac12\min(t,t^2)-\sigma
\le2(m-1)\sigma^{1/2^{m-2}}+\sigma,
$$

したがって$0<\sigma\le1$から

$$
\min(t,t^2)\le4m\,\sigma^{1/2^{m-2}}.
$$

各変数の次数が$d_i$以下なので$0\le t\le m$です。このとき$t^2\le m\min(t,t^2)$が成り立ちます（$t\le1$では等号、$t\ge1$では$t^2\le mt$）。従って

$$
t^2\le4m^2\sigma^{1/2^{m-2}},
\qquad
t\le2m\,\sigma^{1/2^{m-1}}.
$$

これで$m$に関する帰納法が閉じました。
<!-- proof-end -->

ここで重要なのは、（R2）が**有理点の分母と補助多項式の高さを同時に比較している**ことです。多変数にしただけで自動的に指数2が出たのではありません。

## 9. 有理近似の分母を増大させて指数2を示す

いよいよ[主定理](#thm-nda7-roth)へ戻ります。良すぎる有理近似が無限個あると仮定し、分母を急増させて$m$個選びます。その分母に反比例する次数を選ぶと、「有理値を分母で払えば非零整数」という下界と、$\alpha$での高い消滅から出る上界が食い違います。

<!-- proof-start -->
### 証明

**（1）代数的整数への帰着。** まず$\alpha$が次数$r\ge2$の実代数的整数の場合を証明します。最後に一般の代数的無理数へ戻します。

$\delta>0$を任意に固定し、次の不等式を満たす$0<\eta<1/12$を選びます。

$$
(2+\delta)\left(\frac12-3\eta\right)>1.
$$

左辺は$\eta\downarrow0$で$1+\delta/2>1$へ収束するので、選択可能です。整数$m\ge16r/\eta^2$を固定し、さらに

$$
\sigma=\eta^{\,2^{m-1}},\qquad
M=\left\lceil\frac2\sigma\right\rceil
$$

と置きます。すると[Rothの補題](#lem-nda7-roth-index)の指数上界は$2m\sigma^{1/2^{m-1}}=2m\eta$となります。

[高さ付き補助多項式](#lem-nda7-auxiliary-polynomial)の定数を$C_\alpha$と書きます。後で数値を固定するため、$B_\alpha=4+\log_2(\max\{2,|\alpha|\})+C_\alpha$と置きます。

**（2）良すぎる近似を$m$個選ぶ。** 背理法により

$$
\left|\alpha-\frac pq\right|<q^{-(2+\delta)}
$$

を満たす相異なる既約有理数が無限個存在するとします。$q$が有界なら$p$も$\alpha$の近くの有界な整数しか取れないので、分母は非有界です。

$L$を後で十分大きく選ぶ数とし、分母$q_1,\ldots,q_m$が

$$
\log_2 q_1\ge L,\qquad
\log_2 q_{i+1}\ge M\log_2 q_i
$$

となる相異なる良い近似$p_i/q_i$を順に選びます。無限個の分母は非有界なので毎回次を選べます。以下、これらの分数を固定し、$D$をその後で任意に大きくする正整数とします。

各変数の次数を

$$
d_i=\left\lceil\frac{D}{\log_2q_i}\right\rceil
$$

と定めます。$D$を大きくすればすべて正で、$d_i\to\infty$です。天井関数の定義から

$$
D\le d_i\log_2q_i<D+\log_2q_i,
$$

$$
S=\sum_i d_i\le
D\sum_i\frac1{\log_2q_i}+m
\le\frac{2D}{L}+m,
$$

$$
d_1\le\frac DL+1.
$$

ここで$M\ge2$なので、分母の対数の逆数は比$1/M$以下の等比級数で評価しました。

さらに$M\ge2/\sigma$から

$$
\frac{d_{i+1}}{d_i}
\le\frac{D/\log_2q_{i+1}+1}
{D/\log_2q_i}
\le\frac1M+\frac{\log_2q_i}{D}
<\sigma
$$

が$D$を十分大きくすると成立します。従って[Rothの補題](#lem-nda7-roth-index)の（R1）を満たします。

**（3）補助多項式を有理点で評価する。** [高さ付き補助多項式](#lem-nda7-auxiliary-polynomial)を$\eta,m,\boldsymbol d$で適用すると、非零整数係数多項式$P$で

$$
\deg_iP\le d_i,\quad H(P)\le2^{C_\alpha S},\quad
\operatorname{ind}(P;\boldsymbol d,(\alpha,\ldots,\alpha))
\ge m\left(\frac12-\eta\right)
$$

を満たすものがあります。[Rothの補題](#lem-nda7-roth-index)の（R2）の右辺の底2対数は

$$
\frac{16m d_1}{\sigma}+\frac{\log_2H(P)}{\sigma}
\le\frac{16m}{\sigma}\left(\frac DL+1\right)
+\frac{C_\alpha}{\sigma}\left(\frac{2D}{L}+m\right).
$$

$L$は$\alpha,\delta,\eta,m,\sigma$に依存して自由に大きく選べます。あらかじめ

$$
\frac{16m+2C_\alpha}{\sigma L}<\frac12
$$

となるよう選んでおけば、$D$をさらに十分大きくしたとき上式は$D$以下になります。一方$d_i\log_2 q_i\ge D$ですから、

$$
q_i^{d_i}\ge2^D
\ge2^{16m d_1/\sigma}H(P)^{1/\sigma}
$$

となり（R2）も満たします。

[Rothの補題](#lem-nda7-roth-index)から、$\boldsymbol\rho=(p_1/q_1,\ldots,p_m/q_m)$で最初に非零になる展開係数の添字$\boldsymbol\nu$を選べて、

$$
Q=P_{[\boldsymbol\nu]}\ne0,\qquad
Q(\boldsymbol\rho)\ne0,\qquad
\sum_i\frac{\nu_i}{d_i}\le2m\eta
$$

となります。[指数の微分則](#lem-nda7-index-rules)から

$$
\operatorname{ind}(Q;\boldsymbol d,
(\alpha,\ldots,\alpha))
\ge m\left(\frac12-\eta\right)-2m\eta
=m\left(\frac12-3\eta\right).
$$

また整数係数の規格化微分を使ったので、$Q$も整数係数です。二項係数の評価から

$$
H(Q)\le2^S H(P)\le2^{(C_\alpha+1)S}.
$$

**（4）有理値の下界。** 各変数の次数が$d_i$以下の整数係数多項式$Q$について

$$
\left(\prod_iq_i^{d_i}\right)Q(p_1/q_1,\ldots,p_m/q_m)
$$

は整数です。左辺は非零なので絶対値が1以上です。従って

$$
|Q(\boldsymbol\rho)|
\ge\prod_iq_i^{-d_i}
>2^{-mD-\sum_i\log_2q_i}.
$$

**（5）高次消滅からの上界。** $\boldsymbol\rho$は$\alpha$へ良く近似しているので、$\boldsymbol\Delta=(p_1/q_1-\alpha,\ldots,p_m/q_m-\alpha)$とすると

$$
|\Delta_i|<q_i^{-(2+\delta)}.
$$

$Q$を$(\alpha,\ldots,\alpha)$の周りで有限Taylor展開します。指数の下界から、係数が非零の項は必ず

$$
\sum_i\frac{\mu_i}{d_i}\ge
m\left(\frac12-3\eta\right)
$$

を満たします。各項について$d_i\log_2q_i\ge D$なので

$$
\prod_i|\Delta_i|^{\mu_i}
\le2^{-(2+\delta)\sum_i\mu_i\log_2q_i}
\le2^{-(2+\delta)D\sum_i\mu_i/d_i}
\le2^{-(2+\delta)Dm(1/2-3\eta)}.
$$

残る係数を評価します。$A_\alpha=\max\{2,|\alpha|\}$と置くと、展開係数$Q_{[\boldsymbol\mu]}(\alpha,\ldots,\alpha)$は高々$\prod_i(d_i+1)\le2^S$個の単項式の和です。それぞれの二項係数の積は$2^S$以下、$\alpha$の冪の絶対値は$A_\alpha^S$以下、整数係数は$H(Q)$以下なので

$$
|Q_{[\boldsymbol\mu]}(\alpha,\ldots,\alpha)|
\le2^S\cdot2^S A_\alpha^S H(Q)
\le2^{(C_\alpha+3+\log_2A_\alpha)S}.
$$

Taylor展開の項数も高々$2^S$なので

$$
|Q(\boldsymbol\rho)|
\le2^{B_\alpha S}\,
2^{-(2+\delta)Dm(1/2-3\eta)}.
$$

**（6）矛盾。** （4）の下界と（5）の上界を合わせて底2対数を取ると

$$
mD+\sum_i\log_2q_i
>(2+\delta)Dm\left(\frac12-3\eta\right)
-B_\alpha S.
$$

前に得た$S\le2D/L+m$を代入して$D$で割り、**$p_i/q_i$と$L$は固定したまま**$D\to\infty$とすると、

$$
m\ge(2+\delta)m\left(\frac12-3\eta\right)
-\frac{2B_\alpha}{L}.
$$

最初に選んだ$\eta$により

$$
\kappa=(2+\delta)\left(\frac12-3\eta\right)-1>0
$$

です。$L$は（3）の条件に加えて$2B_\alpha/L<m\kappa$も満たすよう選べました。すると直前の不等式は$m\ge m+m\kappa-2B_\alpha/L>m$となって矛盾します。代数的整数$\alpha$に対する有限性が証明されました。

**（7）一般の代数的無理数。** $\alpha$の整数係数最小多項式を$f(T)=a_rT^r+\cdots+a_0$（$a_r\ne0$）とします。$b=|a_r|\ge1$、$\beta=b\alpha$とすると

$$
b^{r-1}f(T/b)
$$

は首係数$\operatorname{sgn}(a_r)$の整数係数多項式です。必要なら全体に$-1$を掛ければ、$\beta$は首係数1の整数係数多項式の根、すなわち代数的整数です。

$\alpha$へ指数$2+\delta$の既約近似$p/q$が無限個あると仮定すると、$\beta$へ相異なる近似$bp/q$が無限個あります。これらを約分した分母を$q'\le q$とすると、

$$
\left|\beta-\frac{bp}{q}\right|
=b\left|\alpha-\frac pq\right|
<bq^{-(2+\delta)}.
$$

無限個の異なる近似の分母$q$は非有界であり、$q$が十分大きければ$b<q^{\delta/2}$です。その場合

$$
\left|\beta-\frac{bp}{q}\right|
<q^{-(2+\delta/2)}
\le(q')^{-(2+\delta/2)}.
$$

$\beta$へ相異なる既約近似が無限個得られますが、代数的整数$\beta$に適用した先ほどの結論（指数$2+\delta/2$）と矛盾します。従って一般の代数的無理数についても[Rothの定理](#thm-nda7-roth)が成立します。
<!-- proof-end -->

この証明が扱うのは**有限性**であり、指定した$\alpha,\delta$について「例外が何個あるか」まで計算するものではありません。分母を任意に大きく選ぶ背理法と、十分大きい次数$D$の存在による論証だからです。

## 10. Thue・Siegel・Rothの改良

Thueは代数的次数$d$に対して$d/2+1+\varepsilon$型の制限を導きました。Siegel・Dysonによる改良を経て、Rothが1955年に次数に依存しない指数$2+\varepsilon$を達成しました。これは下界の定数だけを改善したのではなく、**指数から次数への依存を除いた**点が決定的です。[Dirichlet近似](../NDA5/index.md#thm-nda5-dirichlet-lower-bound)は指数2では無限個の近似を与えるため、この意味でRothの指数は最良です。

## 11. 演習と詳細解答

### Level A：量化と整数線形代数

**NDA7-A1（固定分母の近似は有限）**  
無理数$\alpha$と$s>0$を固定します。$1\le q\le Q$かつ$|\alpha-p/q|<q^{-s}$となる整数組$p,q$が有限個であることを証明してください。

- Level: A

<!-- solution-start -->
**詳細解答**

$q\ge1$だから$q^{-s}\le1$です。不等式から$|\alpha-p/q|<1$であり、

$$
q(\alpha-1)<p<q(\alpha+1)
$$

となります。各$q$には有界区間内の整数$p$が有限個しかなく、$q$自体も$1,\ldots,Q$の有限個です。
<!-- solution-end -->

**NDA7-A2（指数を変更すると何が変わるか）**  
Rothの定理を$\varepsilon=1/3$として適用した場合、指数はいくつですか。その結果だけから$\varepsilon=1/4$の場合の有限性が導けるか判定してください。

- Level: A

<!-- solution-start -->
**詳細解答**

指数は$2+1/3=7/3$です。$2+1/4=9/4<7/3$なので$q>1$では

$$
q^{-7/3}<q^{-9/4}.
$$

後者の誤差条件はより緩く、該当分数が増え得ます。$\varepsilon=1/3$の有限性だけでは後者を保証できません。Rothの定理を$\varepsilon=1/4$でもう一度適用します。
<!-- solution-end -->

**NDA7-A3（指数2は有限にならない）**  
無理数$\alpha$について$|\alpha-p/q|<q^{-2}$となる相異なる既約分数が無限にある根拠を示してください。

- Level: A

<!-- solution-start -->
**詳細解答**

[収束分数から得られるDirichlet近似](../NDA5/index.md#thm-nda5-dirichlet-lower-bound)は相異なる既約分数$p_n/q_n$を無限に与え、各々について

$$
\left|\alpha-\frac{p_n}{q_n}\right|<\frac1{q_n^2}
$$

を保証します。従ってRothの定理の有限性を$\varepsilon=0$まで延長することはできません。
<!-- solution-end -->

**NDA7-A4（非零整数解を構成する）**  
$A=\begin{pmatrix}1&1&1\\1&2&3\end{pmatrix}$に対し$Ax=0$となる非零整数ベクトルを求めてください。

- Level: A

<!-- solution-start -->
**詳細解答**

$x_1+x_2+x_3=0$から$x_1=-x_2-x_3$です。これを第二行へ代入すると

$$
-x_2-x_3+2x_2+3x_3=x_2+2x_3=0.
$$

$x_3=1$と選べば$x_2=-2$、$x_1=1$です。実際$1-2+1=0$、$1-4+3=0$となるので$x=(1,-2,1)^\mathsf T$です。
<!-- solution-end -->

**NDA7-A5（高さと展開係数）**  
$P(X,Y)=3X^2-4XY+2Y^2$に対して$H(P)$と$P_{[1,1]}$を求めてください。

- Level: A

<!-- solution-start -->
**詳細解答**

[高さの定義](#def-nda7-polynomial-height)より$H(P)=\max\{3,4,2\}=4$です。$P(X+U,Y+V)$の$UV$項は$-4(X+U)(Y+V)$だけから出るため、その係数は$-4$です。従って$P_{[1,1]}=-4$です。
<!-- solution-end -->

### Level B：証明をつなぐ

**NDA7-B1（非既約分数までの一様下界）**  
無理数$\alpha$と$s>0$に対し、$|\alpha-a/b|<b^{-s}$を満たす既約分数が有限個とします。すべての整数$p$、正整数$q$で$|\alpha-p/q|\ge cq^{-s}$となる正の定数$c$を具体的に構成してください。

- Level: B

<!-- solution-start -->
**詳細解答**

有限の例外集合$E$に対し

$$
c=\min\left(\{1\}\cup
\left\{b^s\left|\alpha-\frac ab\right|:\frac ab\in E\right\}\right)
$$

と取ります。$\alpha$は無理数なので各値は正です。既約$a/b$について、例外では$c$の定義から、非例外では$c\le1$から$|\alpha-a/b|\ge cb^{-s}$です。任意の$p/q$を$a/b$に約分すると$b\le q$なので

$$
\left|\alpha-\frac pq\right|
=\left|\alpha-\frac ab\right|
\ge cb^{-s}\ge cq^{-s}.
$$
<!-- solution-end -->

**NDA7-B2（次数4でも指数2）**  
次数4の代数的無理数$\alpha$について、Liouvilleの下界とDirichlet近似だけから分かる無理性指数の範囲を求め、Rothの定理を使ったときの結論を証明してください。

- Level: B

<!-- solution-start -->
**詳細解答**

[Liouvilleの近似下界](../NDA6/index.md#thm-nda6-liouville-bound)と[普遍下界](../NDA5/index.md#thm-nda5-dirichlet-lower-bound)から$2\le\mu(\alpha)\le4$です。

もし$\mu(\alpha)>2$なら$2<\nu<\mu(\alpha)$を選べます（$\mu=\infty$なら$\nu=3$）。上限の定義から$\nu$より大きい許容指数が存在するので、指数$\nu$の既約近似は無限個あります。$\varepsilon=\nu-2>0$で[Thue–Siegel–Rothの定理](#thm-nda7-roth)に反します。従って$\mu(\alpha)\le2$であり、Dirichletの下界から$\mu(\alpha)=2$です。
<!-- solution-end -->

**NDA7-B3（消滅だけでは足りない）**  
整数$t\ge1$と$P(X,Y)=(X-Y)^t$を考えます。任意の実数$\alpha$について$j+k<t$なら$P_{[j,k]}(\alpha,\alpha)=0$となることを示し、なぜこれだけではRothの証明にならないか述べてください。

- Level: B

<!-- solution-start -->
**詳細解答**

$$
P(\alpha+U,\alpha+V)
=(U-V)^t
=\sum_{j=0}^t\binom tj(-1)^{t-j}U^jV^{t-j}.
$$

各項の添字の和は$t$なので$j+k<t$の展開係数は零です。しかし$P(x,x)=0$がすべての$x$で成り立ちます。消滅条件だけでは、近似分数から作る有理点で多項式の値が非零であることを保証できません。そこで有理点での零点多重度の上界と高さの制御が必要になります。
<!-- solution-end -->


**NDA7-B4（規格化した指数の積）**  
$P(X,Y)=(X-a)^2(Y-b)$、$R(X,Y)=(X-a)(Y-b)^2$、次数列$(d_1,d_2)=(6,4)$を考えます。点$(a,b)$での$P,R,PR$の指数を計算して、[指数の積の公式](#lem-nda7-index-rules)を直接検証してください。

- Level: B

<!-- solution-start -->
**詳細解答**

点$(a,b)$へ平行移動して$X=a+U,Y=b+V$と書くと、

$$
P(a+U,b+V)=U^2V,\qquad
R(a+U,b+V)=UV^2,
$$

$$
(PR)(a+U,b+V)=U^3V^3.
$$

各々の最小重みは

$$
\operatorname{ind}(P)=\frac26+\frac14=\frac7{12},\quad
\operatorname{ind}(R)=\frac16+\frac24=\frac23,
$$

$$
\operatorname{ind}(PR)=\frac36+\frac34=\frac54.
$$

右辺の和は$7/12+2/3=7/12+8/12=15/12=5/4$なので、積の指数は個々の指数の和です。
<!-- solution-end -->

**NDA7-B5（消滅条件の有限平均による計数）**  
長さ16の各$0,1$列$\boldsymbol u$について$z(\boldsymbol u)=\sum_{i=1}^{16}u_i$と置きます。全$2^{16}$個の列における$z$の算術平均および平均二乗偏差を求めてください。続いて、$z<4$となる列の割合の上界を出し、実際の組合せ数と比較してください。

- Level: B

<!-- solution-start -->
**詳細解答**

各座標について0と1がちょうど半数ずつ現れるので、算術平均は$16\cdot(1/2)=8$です。各座標の中心化した値は$u_i-1/2=\pm1/2$で、二乗は常に$1/4$です。異なる二座標の積の全列平均は、片方の座標を反転させた列と対を作ると相殺されて零です。従って

$$
\frac{1}{2^{16}}\sum_{\boldsymbol u\in\{0,1\}^{16}}
\bigl(z(\boldsymbol u)-8\bigr)^2
=16\cdot\frac14=4.
$$

$z<4$なら$|z-8|>4$です。全$2^{16}$個の列について二乗偏差の平均が4だから、この集合の割合は$4/4^2=1/4$以下です。実際の列の個数は

$$
\sum_{k=0}^{3}\binom{16}{k}
=1+16+120+560=697,
$$

であり、割合は$697/65536<1/4$です。二乗平均の上界が粗くても、未知係数より線形条件を少なくする目的には十分です。
<!-- solution-end -->

**NDA7-B6（多変数一般化Wronskianの直接計算）**  
$F_0(X,Y)=1$、$F_1(X,Y)=X$、$F_2(X,Y)=Y$を考えます。多重添字$\boldsymbol\mu_0=(0,0)$、$\boldsymbol\mu_1=(1,0)$、$\boldsymbol\mu_2=(0,1)$は$|\boldsymbol\mu_j|\le j$を満たします。これらによる展開係数の行列を作り、行列式が零でないことを検証してください。

- Level: B

<!-- solution-start -->
**詳細解答**

第0行は$F_0,F_1,F_2$そのものです。第1行は$X$による一次の規格化偏微分で、$1,X,Y$に対して順に$0,1,0$となります。第2行は$Y$による一次の規格化偏微分で、順に$0,0,1$です。よって

$$
\bigl((F_k)_{[\boldsymbol\mu_j]}\bigr)_{0\le j,k\le2}
=\begin{pmatrix}
1&X&Y\\
0&1&0\\
0&0&1
\end{pmatrix}.
$$

上三角行列なので行列式は対角成分の積$1$です。従って零多項式ではなく、[一般化Wronskianの補題](#lem-nda7-generalized-wronskian)の結論がこの例で直接成立します。
<!-- solution-end -->

### Level C：整数方程式への接続

**NDA7-C1（三次Thue型方程式の有限性）**  
$\alpha=\sqrt[3]2$とします。[Rothの定理](#thm-nda7-roth)を使い、整数$p$、正整数$q$で$p^3-2q^3=\pm1$となる組は有限個であることを示してください。次の因数分解を使って構いません。

$$
p^3-2q^3=(p-\alpha q)(p^2+\alpha pq+\alpha^2q^2).
$$

- Level: C

<!-- solution-start -->
**詳細解答**

$\alpha$は三次の代数的無理数です。第二因子を平方完成すると

$$
p^2+\alpha pq+\alpha^2q^2
=\left(p+\frac{\alpha q}{2}\right)^2
+\frac{3\alpha^2q^2}{4}
\ge\frac{3\alpha^2q^2}{4}>0.
$$

$|p^3-2q^3|=1$のとき、積の因数分解により

$$
1=|p-\alpha q|
(p^2+\alpha pq+\alpha^2q^2)
\ge|p-\alpha q|\frac{3\alpha^2q^2}{4}.
$$

従って$C=4/(3\alpha^2)>0$とすると

$$
\left|\alpha-\frac pq\right|
=\frac{|p-\alpha q|}{q}
\le\frac{C}{q^3}.
$$

$q>C^2$なら$C/q^3<q^{-5/2}$なので、指数$2+1/2$のRoth近似が得られます。もし$\gcd(p,q)>1$ならその立方が$p^3-2q^3=\pm1$を割るため不可能であり、分数$p/q$は既約です。[Rothの定理](#thm-nda7-roth)を$\varepsilon=1/2$で適用すると$q>C^2$の解に対応する既約分数は有限個です。

残る$q\le C^2$は有限個の正整数です。各$q$に対し$p^3=2q^3+1$または$p^3=2q^3-1$を満たす整数$p$は高々2個なので、残りの解も有限です。
<!-- solution-end -->


**NDA7-C2（Rothの最後の指数矛盾を再構成する）**  
$\delta>0$を固定し、$0<\eta<1/12$が

$$
(2+\delta)\left(\frac12-3\eta\right)>1
$$

を満たすとします。定数$B>0$、整数$m\ge1$に対し、ある十分大きい$L>0$で

$$
mD\ge(2+\delta)Dm\left(\frac12-3\eta\right)
-B\left(\frac{2D}{L}+m\right)-C_0
$$

が、固定した$C_0\ge0$と任意に大きい$D$について成立すると仮定します。矛盾を導いてください。また$\eta$を選べることを$\delta$から具体的に確かめてください。

- Level: C

<!-- solution-start -->
**詳細解答**

まず

$$
\kappa=(2+\delta)\left(\frac12-3\eta\right)-1>0
$$

と置きます。$L$は十分大きく取れるので、例えば$2B/L<m\kappa$を満たすよう選べます。仮定の不等式を$D$で割ると

$$
m\ge m(1+\kappa)-\frac{2B}{L}-\frac{Bm+C_0}{D}.
$$

$D\to\infty$で最後の項は零に収束します。従って$m\ge m(1+\kappa)-2B/L>m$となり矛盾します。

$\eta$の存在を直接調べるため、必要な不等式を整理します。

$$
(2+\delta)\left(\frac12-3\eta\right)>1
\iff
\frac{\delta}{2}>3(2+\delta)\eta
\iff
\eta<\frac{\delta}{6(2+\delta)}.
$$

従って

$$
\eta=\min\left\{\frac1{24},
\frac{\delta}{12(2+\delta)}\right\}
$$

と取れば、$\eta>0$、$\eta<1/12$であり、最後の上界も厳密に満たします。これが第9節の主定理の完全証明で使ったパラメータ選択の意味です。
<!-- solution-end -->

## 12. 到達点と次の学修

[上で証明したRothの定理](#thm-nda7-roth)を使えば、代数的無理数の無理性指数は2となり、三次の整数方程式の有限性まで導けます。証明の入口にある整数線形方程式の補題と、代数的な点で展開係数を消す多項式の存在も証明しました。

本章では[高さ付き補助多項式](#lem-nda7-auxiliary-polynomial)と[有理点での指数上界](#lem-nda7-roth-index)を組み合わせて主定理を証明しました。各定数が小さいかではなく、$D\to\infty$で残る指数不等式が$1$を超えることが矛盾の本質です。
