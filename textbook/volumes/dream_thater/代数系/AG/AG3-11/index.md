# AG3-11 曲線の種数とRiemann–Rochへの入口

[前章の射影空間のねじり層のコホモロジー](../AG3-10/index.md#thm-ag3-10-projective-twist-cohomology)で、$\mathbb P^2$ 上の $\mathcal O(m)$ の群は全て計算できました。しかし、曲線 $C\subset\mathbb P^2$ に制限すると、これまで零だった一次群 $H^1(C,\mathcal O_C)$ が現れることがあります。たとえば射影直線と滑らかな三次曲線はどちらも局所的には一本の線ですが、大域的な正則関数や微分形式の貼り合わせには差があります。

ここではその差を**種数**として数えます。まず曲線を一つの斉次方程式で切り出し、$\mathbb P^2$ の既知のコホモロジーから $C$ の零次・一次群を求めます。次に[随伴公式](../AG2-10/index.md#thm-ag2-10-adjunction)で正則微分形式を数え、最後に Riemann–Roch の形を**直線で切り出した因子について証明**します。任意の因子へ拡張するために何が足りないかも区別します。

以下、$k$ は代数閉体、$S=k[X,Y,Z]$、$P=\mathbb P_k^2$ とします。$F\in S_d$ は $d\ge1$ の非零斉次多項式で、$C=V_+(F)$ は滑らかで幾何学的に整な射影平面曲線であるとします。$\mathcal O_C(m)$ は $\mathcal O_P(m)$ の制限、$h^i(C,\mathcal F)=\dim_kH^i(C,\mathcal F)$ と記します。$S_t=0$（$t<0$）と約束します。

## 1. 貼り合わせの障害を曲線の数にする

[層コホモロジー](../AG3-08/index.md#def-ag3-08-sheaf-cohomology)の $H^0$ は大域切断、$H^1$ は局所切断を大域的に貼り合わせる障害を表しました。曲線の形の複雑さを、座標の選び方に依存せず表すために $\mathcal O_C$ 自身の $H^1$ を調べます。

<a id="def-ag3-11-genus"></a>

<!-- formal-statement-start -->
> **定義（曲線の種数）**  
> $C$ が代数閉体 $k$ 上の滑らかな射影整曲線で、$H^1(C,\mathcal O_C)$ が有限次元であるとき、その種数を

$$
g(C)=\dim_k H^1(C,\mathcal O_C)
$$

> と定める。本章で扱う滑らかな射影平面曲線では有限次元性を具体計算で証明する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag3-11-genus -->
**定義の確認例**：$C$ が射影直線なら、[射影直線のコホモロジー](../AG3-08/index.md#thm-ag3-08-p1-cohomology)へ $m=0$ を代入して $H^1(\mathbb P^1,\mathcal O)=0$ です。従って $g(\mathbb P^1)=0$ です。定義に登場するのはアフィン方程式の次数ではなく、大域的な層の群だという点が重要です。
<!-- definition-example-end -->

種数が座標に依存しないのは、同型な曲線では構造層とそのコホモロジーが対応するからです。一方、次数 $d$ の多項式が与えられただけでは滑らかさは分かりません。特異曲線の「算術種数」とその正規化の種数を無条件に同一視しないようにします。

## 2. 一つの方程式を短完全列へ変換する

$F$ の零点上の切断を理解するには、まず $P$ 上の切断を制限し、$F$ の倍数に当たる部分を除けばよさそうです。しかし**単なるベクトル空間の引き算**だけでなく、局所的な列が正確に短完全であることを確かめます。

<a id="prop-ag3-11-restriction"></a>

<!-- formal-statement-start -->
> **命題（平面曲線の制限完全列）**  
> $k$ を体、$F\in k[X,Y,Z]$ を非零の次数 $d\ge1$ の斉次式、$C=V_+(F)\subset P=\mathbb P_k^2$ とする。包含 $i:C\hookrightarrow P$ と任意の $m\in\mathbb Z$ に対して、層の短完全列

$$
0\longrightarrow\mathcal O_P(m-d)
\xrightarrow{\ \cdot F\ }\mathcal O_P(m)
\longrightarrow i_*\mathcal O_C(m)\longrightarrow0
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

標準アフィンチャートで $F$ を座標の $d$ 乗で割ると普通の多項式 $f$ です。環の $0\to A\xrightarrow{\cdot f}A\to A/(f)\to0$ を、ねじり層の局所基底で書き換えます。非零因子性が左側の単射に必要です。

<!-- proof-start -->
### 証明

$U_X=D_+(X)$ 上で $A=k[y,z]$、$y=Y/X,z=Z/X$ と置き、$f=F(1,y,z)\in A$ とします。$f$ は非零で、$A$ は整域なので $fa=0$ は $a=0$ を意味します。従って

$$
0\longrightarrow A\xrightarrow{\ \cdot f\ }A
\longrightarrow A/(f)\longrightarrow0
$$

> は完全です。$\mathcal O_P(m-d)$ と $\mathcal O_P(m)$ は $U_X$ ではそれぞれ $X^{m-d}$、$X^m$ を局所基底として持ちます。$F=X^df$ なので

$$
F\cdot(aX^{m-d})=(fa)X^m.
$$

> よって基底で表示した最初の写像は $a\mapsto fa$、商は $(A/(f))X^m$ であり、これは $\mathcal O_C(m)$ の切断です。$U_Y,U_Z$ でも同じ計算が成り立ちます。全チャートで局所的に完全な列は層の短完全列であり、結論を得ます。
<!-- proof-end -->

重要なのは $F$ が非零因子であることです。たとえば多項式環の代わりに $A=k[x]/(x^2)$、$f=x$ を使うと、$x\cdot x=0$ なのに $x\ne0$ です。乗法写像は単射でなくなり、同じ証明は成立しません。

## 3. 零次と一次の両方を数える

$P$ は二次元なので、[ねじり層の全コホモロジー](../AG3-10/index.md#thm-ag3-10-projective-twist-cohomology)を $n=2$ で用いると $H^1(P,\mathcal O_P(t))=0$、高次群は $H^2$ だけです。[完全係数対](../AG3-10/index.md#prop-ag3-10-top-pairing)により $H^2(P,\mathcal O_P(t))$ は $S_{-t-3}$ の双対に対応します。

<a id="thm-ag3-11-curve-cohomology"></a>

<!-- formal-statement-start -->
> **定理（平面曲線のねじり層のコホモロジー）**  
> $k$ を代数閉体、$C=V_+(F)\subset\mathbb P_k^2$ を次数 $d\ge1$ の滑らかな射影整曲線、$F\ne0$ とする。任意の $m\in\mathbb Z$ で

$$
h^0(C,\mathcal O_C(m))=\dim S_m-\dim S_{m-d},
$$

$$
h^1(C,\mathcal O_C(m))=\dim S_{d-m-3}-\dim S_{-m-3},
$$

> かつ $H^q(C,\mathcal O_C(m))=0$（$q\ge2$）である。特に右辺は有限である。
<!-- formal-statement-end -->

### 証明の見取り図

[制限完全列](#prop-ag3-11-restriction)にコホモロジーを適用します。零次は斉次式の倍数を引き、一次は二次群の乗法写像の核です。二次群の双対では $F$ の乗法は多項式環の単射になるので、元の二次群の写像が全射と分かります。

<!-- proof-start -->
### 証明

[層コホモロジーの長完全列](../AG3-08/index.md#thm-ag3-08-long-exact)を[制限完全列](#prop-ag3-11-restriction)へ適用し、$P$ 上の一次群が零であることを使うと、零次は

$$
0\to H^0(P,\mathcal O(m-d))
\xrightarrow{\cdot F} H^0(P,\mathcal O(m))
\to H^0(C,\mathcal O_C(m))\to0
$$

> となります。[射影空間の計算](../AG3-10/index.md#thm-ag3-10-projective-twist-cohomology)で二つの項は $S_{m-d},S_m$ です。多項式環は整域なので $F$ の乗法が単射、従って次元の差が $h^0$ です。

同じ長完全列の後半は

$$
0\to H^1(C,\mathcal O_C(m))
\to H^2(P,\mathcal O(m-d))
\xrightarrow{\cdot F}H^2(P,\mathcal O(m))
\to H^2(C,\mathcal O_C(m))\to0.
$$

> ここで[最高次コホモロジーの完全係数対](../AG3-10/index.md#prop-ag3-10-top-pairing)の下で、この中央の写像の双対を調べます。ここで $V^*=\operatorname{Hom}_k(V,k)$ と書きます。二つの有限次元線形双対を次数で表すと

$$
H^2(P,\mathcal O(m))^*\simeq S_{-m-3},
\qquad
H^2(P,\mathcal O(m-d))^*\simeq S_{d-m-3}.
$$

> Laurent 単項式 $X^a$ の係数対は積の $X^{-1}Y^{-1}Z^{-1}$ の係数を読むので、$F$ を最初に掛けることと、双対側で $F$ を掛けることは一致します。すなわち双対写像は

$$
S_{-m-3}\xrightarrow{\cdot F}S_{d-m-3}.
$$

> これは $S$ が整域で $F\ne0$ のため単射です（始域が零の場合も単射）。両側が有限次元なので、元の $H^2$ の写像は全射になります。従って $H^2(C,\mathcal O_C(m))=0$ であり、その核の次元は

$$
h^1(C,\mathcal O_C(m))
=\dim H^2(P,\mathcal O(m-d))-\dim H^2(P,\mathcal O(m))
=\dim S_{d-m-3}-\dim S_{-m-3}.
$$

> 最初の長完全列に $q\ge3$ の項はなく、$P$ 上の高次群も零です。これで全群が決まります。
<!-- proof-end -->

ここでは単射と全射が**反対向き**に対応する点が核心です。二次群上での $F$ の乗法を直接「単射」と思い込むと $H^1(C,\mathcal O_C(m))$ を誤って零にしてしまいます。

例として滑らかな三次曲線 $d=3$ と $m=0$ を代入します。$h^0=\dim S_0-\dim S_{-3}=1$、$h^1=\dim S_0-\dim S_{-3}=1$ です。定数関数しかないのに、貼り合わせの一次障害は一つ残ります。

## 4. 種数公式と正則微分形式

<a id="cor-ag3-11-plane-genus"></a>

<!-- formal-statement-start -->
> **系（滑らかな平面曲線の種数公式）**  
> 代数閉体 $k$ 上の次数 $d\ge1$ の滑らかな射影整平面曲線 $C$ の種数は

$$
g(C)=\frac{(d-1)(d-2)}{2}
$$

> である。
<!-- formal-statement-end -->

### 証明の見取り図

種数は $h^1(C,\mathcal O_C)$ なので、[前定理](#thm-ag3-11-curve-cohomology)へ $m=0$ を入れます。二次形式・三次形式の数を数えるのと同じ組合せ計算です。

<!-- proof-start -->
### 証明

[前定理](#thm-ag3-11-curve-cohomology)で $m=0$ とおくと

$$
g(C)=\dim S_{d-3}-\dim S_{-3}=\dim S_{d-3}.
$$

> $d=1,2$ では $d-3<0$ なので零です。$d\ge3$ では、$X^aY^bZ^c$ の指数が $a+b+c=d-3$ を満たす非負整数解の個数だから

$$
\dim S_{d-3}=\binom{(d-3)+2}{2}
=\binom{d-1}{2}=\frac{(d-1)(d-2)}2.
$$

> $d=1,2$ でも右辺は零となり、全ての $d\ge1$ で成立します。
<!-- proof-end -->


直線と滑らかな二次曲線はいずれも種数 $0$、三次曲線は $1$、四次曲線は $3$、五次曲線は $6$ です。これは滑らかさを外して「どんな $d$ 次式でも幾何学的種数が同じ」と言っているのではありません。

以前[有理微分形式・標準因子](../AG2-08/index.md#def-ag2-08-rational-differential)を局所パラメータで定義しました。正則微分形式の空間は標準束 $\omega_C$ の大域切断 $H^0(C,\omega_C)$ です。これが種数とどう結びつくのでしょうか。

<a id="prop-ag3-11-canonical-sections"></a>

<!-- formal-statement-start -->
> **命題（標準束と正則微分形式の個数）**  
> $k$ を代数閉体、$C\subset\mathbb P_k^2$ を滑らかな次数 $d\ge1$ の射影整平面曲線とする。このとき

$$
\omega_C\simeq\mathcal O_C(d-3),\qquad
h^0(C,\omega_C)=g(C)=\frac{(d-1)(d-2)}2.
$$
<!-- formal-statement-end -->

### 証明の見取り図

[随伴公式](../AG2-10/index.md#thm-ag2-10-adjunction)は平面の標準束 $\mathcal O_P(-3)$ と曲線の法線方向 $\mathcal O_C(d)$ を組み合わせます。大域切断の数は、上で求めた $\mathcal O_C(m)$ の式へ $m=d-3$ を代入するだけです。

<!-- proof-start -->
### 証明

[射影空間の標準束](../AG2-09/index.md#thm-ag2-09-canonical-projective)で $\omega_P\simeq\mathcal O_P(-3)$、[滑らかな超曲面の随伴公式](../AG2-10/index.md#thm-ag2-10-adjunction)で $\omega_C\simeq(\omega_P\otimes\mathcal O_P(d))|_C$ です。従って

$$
\omega_C\simeq
(\mathcal O_P(-3)\otimes\mathcal O_P(d))|_C
\simeq\mathcal O_C(d-3).
$$

> [コホモロジーの定理](#thm-ag3-11-curve-cohomology)へ $m=d-3$ を入れると

$$
h^0(C,\omega_C)=\dim S_{d-3}-\dim S_{-3}=\dim S_{d-3}.
$$

> この値は[種数公式](#cor-ag3-11-plane-genus)の証明で $g(C)$ と一致すると計算済みです。
<!-- proof-end -->

たとえば $d=3$ では $\omega_C\simeq\mathcal O_C$ なので、定数切断 $1$ に対応する零でない正則微分形式が一つ存在します。これは[三次曲線の非消失微分](../AG2-08/index.md#thm-ag2-08-cubic-form)の結果とも整合します。一方、$d=4$ では $\omega_C\simeq\mathcal O_C(1)$ で、$X,Y,Z$ の三つの独立な制限切断が正則微分形式に対応します。

## 5. 次数と切断の差に現れるRiemann–Roch

ここまでは $m$ が任意の整数でした。実際、$m$ を正にすると切断が増えますが、負にすると通常の大域切断は消えます。それでも $H^1$ を加減すれば、**全ての整数 $m$ に対し一つの一次式**が残ります。この仕組みを因子の言葉で書きます。

<a id="def-ag3-11-hyperplane-divisor"></a>

<!-- formal-statement-start -->
> **定義（平面曲線の超平面因子）**  
> $k$ を代数閉体、$C\subset\mathbb P_k^2$ を滑らかな射影整平面曲線とする。$C$ を成分として含まない直線 $L$ と交わる点を重複度込みで数えた因子を $H=L|_C$ とする。その整数倍を $mH$ と書く。これに付随する可逆層は $\mathcal O_C(mH)\simeq\mathcal O_C(m)$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag3-11-hyperplane-divisor -->
**定義の確認例**：$C$ が $d=2$ の滑らかな二次曲線で、$L$ が横断的に二点 $P,Q$ で交わるなら $H=P+Q$ です。二点の重複度はそれぞれ $1$、$\deg H=2$ です。接線の場合は接点の重複度が $2$ で $H=2P$ となります。いずれも $\deg H=2$ で、局所方程式 $L$ により作る可逆層は $\mathcal O_C(1)$ です。
<!-- definition-example-end -->

一般に $\deg H=d$ という事実は、[平面曲線と直線のBézout公式](../AG2-04/index.md#thm-ag2-04-line-bezout)を $C$ と $L$ に適用して従います。$F$ は $L$ を因子に持たないので共通成分はなく、交点重複度の総和が $d\cdot1=d$ です。従って $\deg(mH)=md$ です。

<a id="thm-ag3-11-hyperplane-rr"></a>

<!-- formal-statement-start -->
> **定理（超平面因子に対するRiemann–Roch等式）**  
> $k$ を代数閉体、$C\subset\mathbb P_k^2$ を次数 $d\ge1$ の滑らかな射影整平面曲線、$H$ を超平面因子、$m\in\mathbb Z$ とする。$K_C$ は標準因子とし、$\ell(D)=h^0(C,\mathcal O_C(D))$ と置く。このとき

$$
\ell(mH)-\ell(K_C-mH)
=\deg(mH)+1-g(C)=dm+1-g(C).
$$

> とくに $K_C$ の因子類は $(d-3)H$ に等しく、$h^1(C,\mathcal O_C(m))=\ell(K_C-mH)$ という次元等式も成立する。
<!-- formal-statement-end -->

### 証明の見取り図

前節の $h^1$ は $S_{d-m-3}$ と $S_{-m-3}$ の差でした。[標準束の計算](#prop-ag3-11-canonical-sections)で $K_C-mH\sim(d-3-m)H$ なので、これはちょうど $\ell(K_C-mH)$ の計算式です。二次多項式の個数の差を取ると、$m$ の二乗項が相殺され、次数 $dm$ が残ります。

<!-- proof-start -->
### 証明

[標準因子と標準束](../AG2-08/index.md#thm-ag2-08-canonical-divisor)は $\mathcal O_C(K_C)\simeq\omega_C$ を与えます。[標準束と正則微分形式の個数](#prop-ag3-11-canonical-sections)で $\omega_C\simeq\mathcal O_C(d-3)$ と示しました。よって $K_C\sim(d-3)H$ です。そのため

$$
\ell(K_C-mH)
=h^0(C,\mathcal O_C(d-3-m)).
$$

> [平面曲線のコホモロジー計算](#thm-ag3-11-curve-cohomology)に $m'=d-3-m$ を代入すると

$$
\ell(K_C-mH)
=\dim S_{d-3-m}-\dim S_{-3-m}
=h^1(C,\mathcal O_C(m)).
$$

> この時点で、平面曲線の超平面因子に対する「$H^1$ と正則微分形式の切断の個数の対応」が具体的に確かめられました。

次に層コホモロジー群の交代次元和を求めます。[長完全列](../AG3-08/index.md#thm-ag3-08-long-exact)の交代次元和は短完全列に対し加法的です。また[射影平面のEuler標数](../AG3-10/index.md#cor-ag3-10-euler-characteristic)から、任意の整数 $t$ について

$$
\chi(P,\mathcal O_P(t))=\frac{(t+2)(t+1)}2.
$$

> 制限完全列の両端へそれぞれ $t=m-d,m$ を代入し、$\chi(C,\mathcal O_C(m))=\chi(P,\mathcal O_P(m))-\chi(P,\mathcal O_P(m-d))$ とすると

$$
\begin{aligned}
h^0(C,\mathcal O_C(m))-h^1(C,\mathcal O_C(m))
&=\frac{(m+2)(m+1)-(m-d+2)(m-d+1)}2\\
&=\frac{(m^2+3m+2)-(m^2-2dm+d^2+3m-3d+2)}2\\
&=dm-\frac{(d-1)(d-2)}2+1\\
&=dm+1-g(C).
\end{aligned}
$$

> 二行目で $m^2$ が消えることが、次数という一次の量が現れる理由です。最初の等式 $h^1=\ell(K_C-mH)$ を左辺へ代入し、[平面曲線の超平面因子](#def-ag3-11-hyperplane-divisor)から $\deg(mH)=dm$ とすれば結論です。
<!-- proof-end -->

$d=4$、$m=1$ を入れると $g=3$、$\deg H=4$ なので

$$
\ell(H)-\ell(K_C-H)=4+1-3=2.
$$

> 実際、$\ell(H)=h^0(C,\mathcal O_C(1))=3$、$K_C\sim H$ だから $\ell(K_C-H)=\ell(0)=1$ であり、左辺も $3-1=2$ になります。

## 6. 一般のRiemann–Rochに何が不足するか

一般の滑らかな射影整曲線と**任意の因子** $D$ について目指すのは、同じ形の等式

$$
\ell(D)-\ell(K_C-D)=\deg D+1-g(C)
$$

> です。ただし、これは本章で完全証明した定理の主張範囲ではありません。今回証明したのは、**滑らかな平面曲線で $D=mH$ と書ける場合**です。

何が違うでしょうか。一般の $D$ は、単一の斉次式 $F$ からの短完全列だけでは記述できません。また上の証明では $h^1(C,\mathcal O_C(m))$ と $\ell(K_C-mH)$ の**次元一致**を、射影平面の Laurent 単項式から求めました。一般因子へ進むためには、一般の可逆層 $\mathcal L$ に対し $H^1(C,\mathcal L)$ と $H^0(C,\omega_C\otimes\mathcal L^{-1})$ の双対性（曲線上の Serre 双対性）を構成し、その完全性を証明する必要があります。名前だけを引用して証明済みとはしません。

さらに、**滑らかさ**も意味を持ちます。特異な平面三次曲線の算術種数 $1$ は平面内の制限列から計算できますが、その正規化が射影直線になる場合、正規化の種数は $0$ です。ここで壊れるのは「$\omega_C$ が滑らかな局所パラメータで生成され、通常の正則微分形式の束である」という証明の機構です。特異点を無視して二つの種数を一致させることはできません。

## 7. 演習：種数、双対な次数、制限列を使う

### A1. 射影直線の種数

$C\subset\mathbb P_k^2$ を一本の直線とする。種数を二通りで求めよ。

- Level: A
- ID: AG3-11-A1

<!-- solution-start -->
### 詳細解答

直線は $\mathbb P^1_k$ と同型なので、[射影直線のコホモロジー](../AG3-08/index.md#thm-ag3-08-p1-cohomology)より $h^1(C,\mathcal O_C)=0$ です。別法では $d=1$ を[種数公式](#cor-ag3-11-plane-genus)に代入して

$$
g(C)=\frac{(1-1)(1-2)}2=0
$$

> を得ます。両者が一致し、直線の多項式次数をそのまま種数と呼ぶわけではないことが確かめられます。
<!-- solution-end -->

### A2. 滑らかな二次曲線の標準束

滑らかな平面二次曲線 $C$ の $g(C)$ と $\omega_C$、$h^0(C,\omega_C)$ を求めよ。

- Level: A
- ID: AG3-11-A2

<!-- solution-start -->
### 詳細解答

$d=2$ です。[滑らかな平面曲線の種数公式](#cor-ag3-11-plane-genus)へ代入すると

$$
g(C)=\frac{(2-1)(2-2)}2=0.
$$

> [標準束の命題](#prop-ag3-11-canonical-sections)で $d-3=-1$ を代入すれば $\omega_C\simeq\mathcal O_C(-1)$ です。[コホモロジーの定理](#thm-ag3-11-curve-cohomology)へ $m=-1$ を入れると、$h^0=\dim S_{-1}-\dim S_{-3}=0$。従って正則微分形式は零のみです。
<!-- solution-end -->

### A3. 滑らかな平面三次曲線

滑らかな平面三次曲線 $C$ について $h^0(C,\mathcal O_C)$、$h^1(C,\mathcal O_C)$ と $\omega_C$ を求めよ。

- Level: A
- ID: AG3-11-A3

<!-- solution-start -->
### 詳細解答

$d=3,m=0$ を[コホモロジー定理](#thm-ag3-11-curve-cohomology)へ入れると

$$
h^0=\dim S_0-\dim S_{-3}=1,\qquad
h^1=\dim S_0-\dim S_{-3}=1.
$$

> [随伴公式の結果](#prop-ag3-11-canonical-sections)から $\omega_C\simeq\mathcal O_C(3-3)=\mathcal O_C$ です。よって種数は $1$ で、正則微分形式の空間も一次元です。
<!-- solution-end -->

### A4. 四次曲線と一次切断

滑らかな平面四次曲線 $C$ の種数と $h^0(C,\mathcal O_C(1))$ を求め、一次斉次式の制限が独立である理由を述べよ。

- Level: A
- ID: AG3-11-A4

<!-- solution-start -->
### 詳細解答

$d=4$ から[種数公式](#cor-ag3-11-plane-genus)で $g=(3\cdot2)/2=3$。[コホモロジー定理](#thm-ag3-11-curve-cohomology)では

$$
h^0(C,\mathcal O_C(1))=\dim S_1-\dim S_{-3}=3-0=3.
$$

> 制限写像の核は $F S_{1-4}=F S_{-3}=0$ です。従って $X,Y,Z$ の制限は一次独立で、三次元の全切断空間を張ります。
<!-- solution-end -->

### B1. 四次曲線の二次切断と一次群

滑らかな四次曲線 $C$ に対し、$h^0(C,\mathcal O_C(2))$ と $h^1(C,\mathcal O_C(2))$ を求め、その交代次元和を検算せよ。

- Level: B
- ID: AG3-11-B1

<!-- solution-start -->
### 詳細解答

$d=4,m=2$ です。[コホモロジー定理](#thm-ag3-11-curve-cohomology)で

$$
h^0=\dim S_2-\dim S_{-2}=\binom42-0=6,
$$

$$
h^1=\dim S_{4-2-3}-\dim S_{-2-3}
=\dim S_{-1}-\dim S_{-5}=0.
$$

> したがって $\chi=6$。一方[超平面因子版Riemann–Roch](#thm-ag3-11-hyperplane-rr)で $\deg(2H)=8$、$g=3$ なので $8+1-3=6$ と一致します。
<!-- solution-end -->

### B2. 五次曲線の一次切断は特殊か

滑らかな五次曲線 $C$ について $\ell(H)$、$\ell(K_C-H)$、$\deg H$ を求め、Riemann–Rochの左右を比較せよ。

- Level: B
- ID: AG3-11-B2

<!-- solution-start -->
### 詳細解答

$d=5$、[標準束の命題](#prop-ag3-11-canonical-sections)から $K_C\sim2H$ です。従って $K_C-H\sim H$ となります。[コホモロジー定理](#thm-ag3-11-curve-cohomology)を $m=1$ に適用し、

$$
\ell(H)=\dim S_1-\dim S_{-4}=3,\quad
\ell(K_C-H)=\ell(H)=3.
$$

> 左辺は $3-3=0$。一方[種数公式](#cor-ag3-11-plane-genus)で $g=6$、[超平面因子の次数](#def-ag3-11-hyperplane-divisor)から $\deg H=5$ だから右辺は $5+1-6=0$ です。$h^1(\mathcal O_C(1))=3>0$ なのでこの切断系は特殊です。
<!-- solution-end -->

### B3. 負の超平面因子

滑らかな平面三次曲線 $C$ で $m=-1$ とする。$h^0(C,\mathcal O_C(-1))$ と $h^1(C,\mathcal O_C(-1))$ を求め、その差を次数と照合せよ。

- Level: B
- ID: AG3-11-B3

<!-- solution-start -->
### 詳細解答

$d=3,m=-1$ を[コホモロジー定理](#thm-ag3-11-curve-cohomology)へ代入すると

$$
h^0=\dim S_{-1}-\dim S_{-4}=0,\quad
h^1=\dim S_{3+1-3}-\dim S_{1-3}
=\dim S_1-\dim S_{-2}=3.
$$

> よって $\chi=-3$ です。[種数公式](#cor-ag3-11-plane-genus)から $g=1$、$\deg(-H)=-3$ ですから $\deg(-H)+1-g=-3+1-1=-3$ と一致します。負の因子で切断がなくても、一次群が層の交代次元和に寄与します。
<!-- solution-end -->

### B4. 最高次群の乗法の向き

$F$ が次数 $4$ の非零式、$m=0$ とする。[制限完全列](#prop-ag3-11-restriction)の長完全列に現れる $H^2(P,\mathcal O(-4))\to H^2(P,\mathcal O)$ の双対写像を表示し、その核の次元を求めよ。

- Level: B
- ID: AG3-11-B4

<!-- solution-start -->
### 詳細解答

[完全係数対](../AG3-10/index.md#prop-ag3-10-top-pairing)で $H^2(P,\mathcal O(-4))^*\simeq S_1$、$H^2(P,\mathcal O)^*\simeq S_{-3}=0$ です。従って元の写像の双対は

$$
S_{-3}=0\xrightarrow{\cdot F}S_1.
$$

> 零空間からの写像は単射なので、元の $H^2$ の写像は全射です。その核は[コホモロジー定理](#thm-ag3-11-curve-cohomology)の $H^1(C,\mathcal O_C)$ に等しく、次元は $\dim S_1-\dim S_{-3}=3$ です。「多項式環での $F$ 乗法が単射だから、元の $H^2$ の写像も単射」と取り違えないことが要点です。
<!-- solution-end -->

### C1. 五次曲線の三つの階層を接続する

滑らかな平面五次曲線 $C$ と超平面因子 $H$ について、$g(C)$、$K_C$ の因子類、$h^0(C,\mathcal O_C(2))$、$h^1(C,\mathcal O_C(2))$ を求める。さらに $2H$ のRiemann–Rochを二通りで検算せよ。

- Level: C
- ID: AG3-11-C1

<!-- solution-start -->
### 詳細解答

$d=5$ です。[滑らかな平面曲線の種数公式](#cor-ag3-11-plane-genus)へ代入すると

$$
g(C)=\frac{(5-1)(5-2)}2=6.
$$

> [随伴公式](#prop-ag3-11-canonical-sections)で $K_C\sim(d-3)H=2H$。$m=2$ を[コホモロジーの計算](#thm-ag3-11-curve-cohomology)へ入れると

$$
h^0(C,\mathcal O_C(2))
=\dim S_2-\dim S_{-3}=6,
$$

$$
h^1(C,\mathcal O_C(2))
=\dim S_{5-2-3}-\dim S_{-2-3}
=\dim S_0=1.
$$

> したがって層の交代次元和は $6-1=5$ です。因子側では $K_C-2H\sim0$ なので $\ell(K_C-2H)=\ell(0)=1$。左辺は $6-1=5$。右辺は $\deg(2H)+1-g=2\cdot5+1-6=5$。二つの経路で同じ値を得ました。
<!-- solution-end -->

### C2. 全整数次数で成立する理由

$C$ を次数 $d\ge1$ の滑らかな平面曲線とする。$m$ が負の場合も含め、$h^1(C,\mathcal O_C(m))=h^0(C,\mathcal O_C(d-3-m))$ を示せ。そのうえで、$m$ が十分大きい場合に一次群が消える条件を求めよ。

- Level: C
- ID: AG3-11-C2

<!-- solution-start -->
### 詳細解答

[コホモロジー定理](#thm-ag3-11-curve-cohomology)を $\mathcal O_C(m)$ に適用すると

$$
h^1(C,\mathcal O_C(m))
=\dim S_{d-m-3}-\dim S_{-m-3}.
$$

> 次に同じ定理を $m'=d-3-m$ に適用すると

$$
\begin{aligned}
h^0(C,\mathcal O_C(m'))
&=\dim S_{m'}-\dim S_{m'-d}\\
&=\dim S_{d-3-m}-\dim S_{-3-m}.
\end{aligned}
$$

> 右辺は一致します。この置換は $m$ の符号を仮定しないので全整数で成立します。さらに $m>d-3$、すなわち $m\ge d-2$ なら $d-m-3<0$ かつ $-m-3<0$（$d\ge1$ より $m\ge-1$）なので双方の $S$ は零、$h^1=0$ です。逆に $m=d-3$ では $\dim S_0-\dim S_{-d}=1$ なので、この消滅境界は鋭いことも確認できます。
<!-- solution-end -->

## 8. ここから先

$\mathbb P^2$ の全コホモロジーから、滑らかな平面曲線の種数・正則微分形式・任意の $mH$ の層コホモロジーの交代次元和を導きました。特に「複雑な曲線上の切断を数えるには、**零次だけでなく一次の障害も一緒に数える**」という発想が残ります。次章では平坦性とファイバーを扱い、方程式の係数を変えたときに滑らかさや次元がどう変化するかを考えます。
