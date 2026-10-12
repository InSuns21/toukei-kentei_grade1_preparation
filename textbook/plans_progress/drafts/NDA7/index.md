# NDA7 Thue–Siegel–Rothの定理

[Liouvilleの近似下界](../../../volumes/dream_thater/代数系/NDA/NDA6/index.md#thm-nda6-liouville-bound)から、次数$d$の代数的無理数$\alpha$への有理近似は分母の$d$乗より速くはなれません。一方、[Dirichlet近似の普遍下界](../../../volumes/dream_thater/代数系/NDA/NDA5/index.md#thm-nda5-dirichlet-lower-bound)によって、すべての無理数へ指数2の近似は無限に存在します。$d\ge3$では、指数2と$d$の間に大きな隔たりがあります。これは代数的数の性質でしょうか、それともLiouvilleの方法の限界でしょうか。

Rothの定理は、代数的無理数の無理性指数が次数によらず**ちょうど2**であることを示します。その完全証明には、多変数補助多項式を作り、高さ（係数の大きさ）と零点多重度を同時に制御する議論が必要です。以下ではまず定理の意味と量化、厳密に証明できる帰結、そして補助多項式を構成するための線形代数を扱います。主定理そのものは第5節に示す未証明の補助理論を必要とします。

## 1. Rothの定理の正確な主張

次数3の$\sqrt[3]2$について、Liouvilleの評価は指数3の下界です。例えば指数$5/2$で良い近似が無限にあることを、そこからは否定できません。Rothの定理は、どんなに小さい正の余裕を設けても、その余裕を超える近似は有限個になると主張します。

<a id="thm-nda7-roth"></a>

<!-- formal-statement-start -->
> **定理（Thue–Siegel–Rothの定理：実数の場合）**  
> $\alpha\in\mathbb R\setminus\mathbb Q$を$\mathbb Q$上代数的な無理数とする。任意の実数$\varepsilon>0$に対し、既約な整数組$p\in\mathbb Z$、$q\in\mathbb Z_{>0}$で次を満たす有理数$p/q$は有限個しかない。

$$
\left|\alpha-\frac pq\right|<\frac1{q^{2+\varepsilon}}.
$$
<!-- formal-statement-end -->

**量化の順序**：$\alpha$を固定し、次に任意の$\varepsilon>0$を指定します。例外となる有理数の個数は$\alpha,\varepsilon$に依存して構いません。これは「ある$\varepsilon>0$で有限」と比べてはるかに強い主張です。なお指数2そのものでは[Dirichlet近似](../../../volumes/dream_thater/代数系/NDA/NDA5/index.md#thm-nda5-dirichlet-lower-bound)により無限個あり、正の$\varepsilon$を完全に取り除くことはできません。

この主定理の完全証明はまだここにはありません。以下の帰結は「Rothの定理を仮定した系」として、使用条件と途中式を独立に確かめます。

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
> $\alpha\in\mathbb R\setminus\mathbb Q$が$\mathbb Q$上代数的なら、[無理性指数](../../../volumes/dream_thater/代数系/NDA/NDA5/index.md#def-nda5-irrationality-exponent)は次の値を取る。

$$
\mu(\alpha)=2.
$$
<!-- formal-statement-end -->

### 証明の見取り図

下界はDirichletです。上界は無理性指数の上限の定義を使います。$\mu(\alpha)>2$なら指数2より大きい許容指数を一つ選べるため、Rothの有限性と衝突します。

<!-- proof-start -->
### 証明

$\alpha$が無理数なので[普遍下界](../../../volumes/dream_thater/代数系/NDA/NDA5/index.md#thm-nda5-dirichlet-lower-bound)から$\mu(\alpha)\ge2$です。

逆に$\mu(\alpha)>2$と仮定します。$\mu(\alpha)$が有限なら$2<\nu<\mu(\alpha)$を、無限なら$\nu=3$を選びます。[無理性指数の定義](../../../volumes/dream_thater/代数系/NDA/NDA5/index.md#def-nda5-irrationality-exponent)で許される指数の上限が$\mu(\alpha)$なので、ある許容指数$\lambda>\nu$が存在します。従って

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

[Liouville数の無理性指数は無限大](../../../volumes/dream_thater/代数系/NDA/NDA6/index.md#prop-nda6-liouville-exponent)ですが、代数的無理数では上の定理により2です。ただし逆に無理性指数2の実数が代数的だという結論は得られません。

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

$|S|=(K+1)^N$だから鳩の巣原理により異なる$u,v\in S$で$Au=Av$となります。$x=u-v$と取れば

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
> 零でない$P(X,Y)=\sum_{i,j}c_{ij}X^iY^j\in\mathbb Z[X,Y]$に対して次を定める。

$$
H(P)=\max_{i,j}|c_{ij}|.
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

[最小多項式の存在と次数](../../../volumes/dream_thater/代数系/FLD/FLD1/index.md#thm-fld1-minimal-polynomial)から、$\mathbb Q(\alpha)$は$1,\alpha,\ldots,\alpha^{d-1}$を$\mathbb Q$基底とします。その基底に上式の各冪を表せば、一つの$P_{[j,k]}(\alpha,\alpha)=0$は高々$d$個の有理係数斉次一次方程式になります。

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
3. Rothの補題で、選んだ有理点における多項式の零点多重度が高すぎないことを証明する。
4. 最初に非零となる展開係数の、整数性による下界と近似誤差による上界を比較し矛盾させる。

**現段階で証明したのは、第1段階の整数線形代数的入口と消滅条件の存在までです。** 高さを伴う補助多項式の構成、Rothの補題、その最終評価は上の道筋の説明であり、主定理の証明ではありません。参考として[A. Milojevic, *An elementary approach to Roth's theorem* (2022)](https://aleksa-milojevic.github.io/expository/roth.pdf)に完全な証明があります。

## 6. Thue・Siegel・Rothの改良

Thueは代数的次数$d$に対して$d/2+1+\varepsilon$型の制限を導きました。Siegel・Dysonの仕事を経て、Rothが1955年に次数に依存しない指数$2+\varepsilon$を達成しました。これは下界の定数だけを改善したのではなく、**指数から次数への依存を除いた**点が決定的です。[Dirichlet近似](../../../volumes/dream_thater/代数系/NDA/NDA5/index.md#thm-nda5-dirichlet-lower-bound)は指数2では無限個の近似を与えるため、この意味でRothの指数は最良です。

## 7. 演習と詳細解答

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

[収束分数から得られるDirichlet近似](../../../volumes/dream_thater/代数系/NDA/NDA5/index.md#thm-nda5-dirichlet-lower-bound)は相異なる既約分数$p_n/q_n$を無限に与え、各々について

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

[Liouvilleの近似下界](../../../volumes/dream_thater/代数系/NDA/NDA6/index.md#thm-nda6-liouville-bound)と[普遍下界](../../../volumes/dream_thater/代数系/NDA/NDA5/index.md#thm-nda5-dirichlet-lower-bound)から$2\le\mu(\alpha)\le4$です。

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

### Level C：整数方程式への接続

**NDA7-C1（三次Thue型方程式の有限性）**  
$\alpha=\sqrt[3]2$とします。Rothの定理を使い、整数$p$、正整数$q$で$p^3-2q^3=\pm1$となる組は有限個であることを示してください。次の因数分解を使って構いません。

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

## 8. 到達点と次の学修

Rothの定理を認めれば、代数的無理数の無理性指数は2となり、三次の整数方程式の有限性まで導けます。証明の入口にある整数線形方程式の補題と、代数的な点で展開係数を消す多項式の存在も証明しました。

しかし**Rothの補題、高さ付き補助多項式、最終矛盾は未証明**です。この三点を閉じなければRothの主定理を本章の証明済み結果とは扱えません。
