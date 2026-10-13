# AG3-14 射影曲線と超曲面の総合演習

## 1. 一つの方程式から何を読み取るか

射影曲線の種数・正則微分形式、射影空間の層コホモロジー、局所環の交叉重複度、平坦な族をそれぞれ学びました。しかし、具体的な斉次方程式を与えられたとき、どの道具をどう組み合わせればよいのでしょうか。四次の「平面曲線」の種数3と四次の「射影曲面」の $h^2(\mathcal O)$ が異なるように、次元とコホモロジーの次数を確認しないまま公式を代入するのは危険です。

この章の基礎体は $k=\mathbb C$ とします。射影空間は $\mathbb P^n=\mathbb P^n_k$、$h^i(X,\mathcal F)=\dim_kH^i(X,\mathcal F)$ と書きます。平面曲線と射影3空間内の超曲面を比べ、交点が接するときの長さ、係数を動かしたときの平坦性と特異性まで結び付けます。既出の主要定理はその証明を繰り返すのではなく、具体的な入力値と中間計算を示して適用します。

## 2. 射影3空間の超曲面を数える

平面曲線では[制限完全列](../AG3-11/index.md#prop-ag3-11-restriction)を使いました。射影3空間内でも、零でない次数 $d>0$ の斉次式 $F$ と $X=V_+(F)$ から
$$
0\longrightarrow\mathcal O_{\mathbb P^3}(-d)
\xrightarrow{\cdot F}\mathcal O_{\mathbb P^3}
\longrightarrow i_*\mathcal O_X\longrightarrow0
$$
を得ます。左側は局所環で非零式 $F$ を掛ける単射であり、右側の商は局所的に $F=0$ 上の正則関数です。ここで $\mathbb P^2$ の最高次群 $H^2$ が、$\mathbb P^3$ では $H^3$ に変わる点が重要です。

<a id="thm-ag3-14-surface-cohomology"></a>

<!-- formal-statement-start -->
> **定理（射影3空間の超曲面の構造層コホモロジー）**  
> 体 $k$ 上、零でない斉次式 $F\in k[X_0,X_1,X_2,X_3]$ の次数を $d\ge1$ とし、$X=V_+(F)\subset\mathbb P^3_k$ とする。このとき

$$
h^0(X,\mathcal O_X)=1,\qquad h^1(X,\mathcal O_X)=0,
$$

$$
h^2(X,\mathcal O_X)=
\begin{cases}
0 &(1\le d\le3),\\
\binom{d-1}{3} &(d\ge4).
\end{cases}
$$

> 特に $\chi(X,\mathcal O_X)=1+h^2(X,\mathcal O_X)$ である。さらに $X$ が滑らかなら、

$$
K_X\simeq\mathcal O_X(d-4),\qquad
h^0(X,K_X)=h^2(X,\mathcal O_X).
$$
<!-- formal-statement-end -->

### 証明の見取り図

[射影空間のねじり層のコホモロジー](../AG3-10/index.md#thm-ag3-10-projective-twist-cohomology)を上の完全列に適用します。$H^1,H^2$ が消えることから $X$ の $H^2$ が射影空間の $H^3(\mathcal O(-d))$ へ移ります。滑らかな場合には[随伴公式](../AG2-10/index.md#thm-ag2-10-adjunction)で標準束を特定し、切断数を別の完全列で計算します。

<!-- proof-start -->
### 証明

$P=\mathbb P^3_k$ と置きます。[射影空間の計算](../AG3-10/index.md#thm-ag3-10-projective-twist-cohomology)から、任意の $m\in\mathbb Z$ について
$$
H^1(P,\mathcal O_P(m))=H^2(P,\mathcal O_P(m))=0
$$
です。$d>0$ なので $H^0(P,\mathcal O_P(-d))=0$、$H^0(P,\mathcal O_P)=k$ です。長完全列の冒頭は
$$
0\to0\to k\to H^0(X,\mathcal O_X)\to0
$$
となり $h^0=1$ です。さらに
$$
H^1(P,\mathcal O_P)\to H^1(X,\mathcal O_X)
\to H^2(P,\mathcal O_P(-d))
$$
の両端が零なので $h^1=0$ です。続く部分
$$
H^2(P,\mathcal O_P)\to H^2(X,\mathcal O_X)
\to H^3(P,\mathcal O_P(-d))
\to H^3(P,\mathcal O_P)
$$
でも両端が零なので、中央は同型となります。$d\le3$ の場合は右側の $H^3$ が零です。$d\ge4$ なら、全変数に負指数を持つ単項式
$$
X_0^{-1-a_0}X_1^{-1-a_1}X_2^{-1-a_2}X_3^{-1-a_3},
\qquad a_i\ge0,\quad \sum_{i=0}^3a_i=d-4
$$
が基底です。組の数は $\binom{d-1}{3}$ であり、前半が従います。

$X$ が滑らかなら[随伴公式](../AG2-10/index.md#thm-ag2-10-adjunction)に $n=3$ を代入して $K_X\simeq\mathcal O_X(d-4)$ です。制限列を $d-4$ 回ねじると
$$
0\to\mathcal O_P(-4)\to\mathcal O_P(d-4)
\to i_*\mathcal O_X(d-4)\to0.
$$
$H^0(P,\mathcal O_P(-4))=H^1(P,\mathcal O_P(-4))=0$ により
$$
H^0(X,K_X)\simeq H^0(P,\mathcal O_P(d-4)).
$$
$d\le3$ では零、$d\ge4$ では次数 $d-4$ の4変数斉次式の次元 $\binom{d-1}{3}$ となり、先ほどの $h^2$ と一致します。
<!-- proof-end -->

直接例として $X_0^4+X_1^4+X_2^4+X_3^4=0$ は滑らかです。偏微分 $4X_i^3$ が全て零になる射影点はないからです。$d=4$ を代入すると $K_X\simeq\mathcal O_X$、$(h^0,h^1,h^2)=(1,0,1)$。一方で滑らかな平面四次**曲線**の種数は3です。両者は矛盾しません。

## 3. 係数を動かしても平坦か

[平坦加群](../AG3-12/index.md#def-ag3-12-flat-module)の条件は、代数的な族を比較する際に最初に確認するべき条件です。$t$ を変数とする斉次式を使えば、次の十分条件を実際に証明できます。

<a id="prop-ag3-14-primitive-flat"></a>

<!-- formal-statement-start -->
> **命題（原始的斉次方程式の1パラメータ族は平坦）**  
> $k$ を体、$A=k[t]$、$n\ge1$ とする。$F\in A[X_0,\ldots,X_n]$ は $X_i$ に関して次数 $d\ge1$ の斉次多項式で、その係数の最大公約因子が $A$ の単元であるとする。このとき射

$$
\operatorname{Proj}\bigl(A[X_0,\ldots,X_n]/(F)\bigr)
\longrightarrow \operatorname{Spec} A
$$

> は平坦である。
<!-- formal-statement-end -->

### 証明の見取り図

係数が共通因子を持たなければ、商環には $t$ に関するねじれがありません。[PID上の平坦性判定](../AG3-12/index.md#thm-ag3-12-pid-flat)で平坦性を得たあと、射影標準開の次数零成分へ移します。

<!-- proof-start -->
### 証明

$R=A[X_0,\ldots,X_n]$ と $B=R/(F)$ はそれぞれ次数付き環です。$A$ はPID、$R$ は一意分解整域です。非零の $a(t)\in A$ に対して $a[G]=0$ が $B$ で成り立つとすると、ある $H\in R$ について $aG=FH$ です。$a$ の既約因子 $p(t)$ が $F$ を割るなら $F$ の全係数を割ってしまい、原始性に反します。従って $\gcd(a,F)=1$ であり、$F\mid aG$ から $F\mid G$ が従います。ゆえに $[G]=0$、つまり $B$ は $A$ 上ねじれなしです。

[PID上の判定](../AG3-12/index.md#thm-ag3-12-pid-flat)から $B$ は $A$-平坦で、局所化 $B_{X_i}$ も平坦です。射影標準開 $D_+(X_i)$ の座標環は $(B_{X_i})_0$。次数付き分解
$$
B_{X_i}=\bigoplus_{m\in\mathbb Z}(B_{X_i})_m
$$
により $(B_{X_i})_0$ は平坦加群の直和因子です。任意の $A$-加群の単射へテンソル積を取るとき、全次数で単射なら次数零でも単射となるため、これは平坦です。標準開が相対Projを覆うので、射は平坦です。
<!-- proof-end -->

係数の共通因子がある $F=tX_0$ では、$t[X_0]=0$ というねじれが生じます。とくに $D_+(X_0)$ では $t=0$ が強制され、基底上で平坦ではありません。方程式が一つだけという情報から平坦性は結論できないのです。

## 4. 曲線、局所交叉重複度、曲面の対比

平面曲線 $C\subset\mathbb P^2$ が零でない次数 $d$ の斉次式で定まるとき、[曲線のコホモロジー公式](../AG3-11/index.md#thm-ag3-11-curve-cohomology)は $S_m=k[X,Y,Z]_m$（$m<0$ なら $S_m=0$）を用いて
$$
h^0(C,\mathcal O_C(m))=\dim S_m-\dim S_{m-d},
$$
$$
h^1(C,\mathcal O_C(m))=\dim S_{d-m-3}-\dim S_{-m-3}
$$
と書けます。$m\ge0$ なら $\dim S_m=\binom{m+2}{2}$。曲線 $C$ が滑らかなら、[滑らかな平面曲線の種数公式](../AG3-11/index.md#cor-ag3-11-plane-genus)へ次数 $d$ を代入して $g=(d-1)(d-2)/2$ を得ます。

例えば平面四次曲線で $m=1$ とすると $(h^0,h^1)=(3,1)$、$m=2$ では $(6,0)$ です。他方、射影3空間の四次曲面は[超曲面の構造層コホモロジー](#thm-ag3-14-surface-cohomology)へ $d=4$ を代入して $h^2(\mathcal O_X)=1$ です。「四次」の文字だけを見て値を移してはいけません。

[局所交叉重複度](../AG3-13/index.md#def-ag3-13-local-intersection)はコホモロジーではなく局所商環の長さです。例えば $C:Y^2Z-X^3+XZ^2=0$ と $L:Z=0$ は $P=[0:1:0]$ だけで交わります。$Y=1$ の局所座標 $x=X/Y,z=Z/Y$ では
$$
k[x,z]_{(x,z)}/(z-x^3+xz^2,z)
\simeq k[x]_{(x)}/(x^3).
$$
基底 $1,x,x^2$ から重複度は3です。これは[直線に対するBézout公式](../AG2-04/index.md#thm-ag2-04-line-bezout)の総和3と一致します。集合としての交点が一つでも、重複度が1とは限りません。

## 5. 総合演習と詳細解答

以下では次元、次数、滑らかさの仮定を毎回照合します。

### A1. 四次平面曲線の種数と標準束

$C:X^4+Y^4+Z^4=0\subset\mathbb P^2_{\mathbb C}$ の滑らかさを判定し、種数 $g(C)$ と標準束 $K_C$ を求めよ。

- Level: A
- ID: AG3-14-A1

<!-- solution-start -->
### 詳細解答

偏微分は $4X^3,4Y^3,4Z^3$ です。標数が0なので全て零なら $X=Y=Z=0$ となり射影点ではありません。従って滑らかです。[種数公式](../AG3-11/index.md#cor-ag3-11-plane-genus)へ $d=4$ を代入し
$$
g(C)=\frac{(4-1)(4-2)}2=3.
$$
[随伴公式](../AG2-10/index.md#thm-ag2-10-adjunction)では平面曲線の $K_C$ は $\mathcal O_C(d-3)$ なので、$K_C\simeq\mathcal O_C(1)$ です。これは曲線の $H^1(\mathcal O_C)$ が3次元という結論であり、四次曲面の $H^2$ と同じ数ではありません。
<!-- solution-end -->

### A2. 四次曲線で次数を変えて切断を数える

A1の $C$ について $m=1,2$ に対し $h^0(C,\mathcal O_C(m))$、$h^1(C,\mathcal O_C(m))$ および $\chi(C,\mathcal O_C(m))$ を求めよ。

- Level: A
- ID: AG3-14-A2

<!-- solution-start -->
### 詳細解答

[平面曲線のコホモロジー定理](../AG3-11/index.md#thm-ag3-11-curve-cohomology)へ $d=4$ を入れます。$m=1$ では
$$
h^0=\dim S_1-\dim S_{-3}=3,\quad
h^1=\dim S_{4-1-3}-\dim S_{-1-3}
=\dim S_0=1.
$$
従って $\chi=3-1=2$。$m=2$ では
$$
h^0=\dim S_2-\dim S_{-2}=6,\quad
h^1=\dim S_{-1}-\dim S_{-5}=0
$$
で $\chi=6$ です。[超平面因子のRiemann–Roch等式](../AG3-11/index.md#thm-ag3-11-hyperplane-rr)へ $\deg H=4,g=3$ を代入すると、$m=1,2$ で $m\deg H+1-g=2,6$ となり一致します。
<!-- solution-end -->

### A3. 四次曲面の三つの群

$X:X_0^4+X_1^4+X_2^4+X_3^4=0\subset\mathbb P^3_{\mathbb C}$ について、$K_X$、$h^0(\mathcal O_X)$、$h^1(\mathcal O_X)$、$h^2(\mathcal O_X)$、$\chi(\mathcal O_X)$ を求めよ。

- Level: A
- ID: AG3-14-A3

<!-- solution-start -->
### 詳細解答

偏微分 $4X_i^3$ が全て零となる射影点はないので $X$ は滑らかです。[超曲面の構造層定理](#thm-ag3-14-surface-cohomology)に $d=4$ を代入すると
$$
(h^0,h^1,h^2)=\left(1,0,\binom33\right)=(1,0,1).
$$
標準束は $K_X\simeq\mathcal O_X(4-4)=\mathcal O_X$、Euler標数は $1-0+1=2$ です。A1の平面曲線とは、同じ「四次」でも異なる次元の対象です。
<!-- solution-end -->

### A4. 無限遠直線と三次曲線

$C:Y^2Z-X^3+XZ^2=0$ と $L:Z=0$ を $\mathbb P^2_{\mathbb C}$ 内で考える。集合としての交点と局所交叉重複度を求めよ。

- Level: A
- ID: AG3-14-A4

<!-- solution-start -->
### 詳細解答

$Z=0$ を代入すると $-X^3=0$ なので唯一の交点は $P=[0:1:0]$ です。$Y=1$ で $x=X/Y,z=Z/Y$ と置くと二つの方程式は $z-x^3+xz^2=0,z=0$。[局所交叉重複度の定義](../AG3-13/index.md#def-ag3-13-local-intersection)へ入れると
$$
I_P(C,L)
=\dim_{\mathbb C}\mathbb C[x,z]_{(x,z)}/(z-x^3+xz^2,z)
=\dim_{\mathbb C}\mathbb C[x]_{(x)}/(x^3)=3.
$$
最後の環の基底は $1,x,x^2$ です。[直線Bézout公式](../AG2-04/index.md#thm-ag2-04-line-bezout)の次数3に一致します。
<!-- solution-end -->

### B1. 五次平面曲線の特殊な切断

$C:X^5+Y^5+Z^5=0\subset\mathbb P^2_{\mathbb C}$ の滑らかさを確認し、$g(C)$、$K_C$、$h^0(C,\mathcal O_C(2))$、$h^1(C,\mathcal O_C(2))$ を計算してEuler標数を検算せよ。

- Level: B
- ID: AG3-14-B1

<!-- solution-start -->
### 詳細解答

偏微分は $5X^4,5Y^4,5Z^4$ なので、同時零の射影点はなく滑らかです。[種数公式](../AG3-11/index.md#cor-ag3-11-plane-genus)から $g=4\cdot3/2=6$、[随伴公式](../AG2-10/index.md#thm-ag2-10-adjunction)から $K_C\simeq\mathcal O_C(5-3)=\mathcal O_C(2)$ です。

[コホモロジー公式](../AG3-11/index.md#thm-ag3-11-curve-cohomology)で $d=5,m=2$ とすると
$$
h^0=\dim S_2-\dim S_{-3}=6,\qquad
h^1=\dim S_0-\dim S_{-5}=1.
$$
よって $\chi=6-1=5$。[超平面因子のRiemann–Roch等式](../AG3-11/index.md#thm-ag3-11-hyperplane-rr)では $\deg(2H)+1-g=2\cdot5+1-6=5$ で一致します。$K_C=2H$ のため $h^1=1$ が残ることを、切断数の計算と結び付けて理解します。
<!-- solution-end -->

### B2. 五次曲面の異なる最高次群

$X:X_0^5+X_1^5+X_2^5+X_3^5=0\subset\mathbb P^3_{\mathbb C}$ とする。$K_X$、$h^2(\mathcal O_X)$ および $h^i(\mathcal O_X(1))$（$i=0,1,2$）を求めよ。

- Level: B
- ID: AG3-14-B2

<!-- solution-start -->
### 詳細解答

偏微分は $5X_i^4$ なので $X$ は滑らかです。[構造層のコホモロジー定理](#thm-ag3-14-surface-cohomology)へ $d=5$ を入れて
$$
K_X\simeq\mathcal O_X(1),\qquad
h^2(\mathcal O_X)=\binom43=4.
$$
ねじり層の制限列は
$$
0\to\mathcal O_{\mathbb P^3}(-4)
\xrightarrow{\cdot F}\mathcal O_{\mathbb P^3}(1)
\to i_*\mathcal O_X(1)\to0
$$
です。[射影空間のねじり層のコホモロジー](../AG3-10/index.md#thm-ag3-10-projective-twist-cohomology)より $H^0(\mathcal O(-4))=H^1(\mathcal O(-4))=0$、$h^0(\mathcal O(1))=4$ だから $h^0(\mathcal O_X(1))=4$ です。また
$$
H^1(\mathcal O_X(1))\simeq H^2(\mathbb P^3,\mathcal O(-4))=0
$$
であり、$H^2(\mathbb P^3,\mathcal O(1))=H^3(\mathbb P^3,\mathcal O(1))=0$ から
$$
H^2(\mathcal O_X(1))
\simeq H^3(\mathbb P^3,\mathcal O(-4))\simeq\mathbb C.
$$
つまり $(h^0,h^1,h^2)$ は $(4,0,1)$ で、$\chi(\mathcal O_X(1))=5$。$h^2(\mathcal O_X)=4$ と $h^2(\mathcal O_X(1))=1$ を同一視しません。
<!-- solution-end -->

### B3. 平坦でも特異になる三次曲線族

$\mathbb P^2_{\mathbb C}\times\mathbb A^1_{\mathbb C}$ 上の斉次式
$$
F_t=Y^2Z-X^3+XZ^2+tZ^3
$$
による曲線族が平坦であることを示し、特異になる $t$ を全て求めよ。各ファイバーの $h^1(\mathcal O)$ も計算せよ。

- Level: B
- ID: AG3-14-B3

<!-- solution-start -->
### 詳細解答

$-X^3$ の係数は $-1$ なので、$F_t$ の係数は $\mathbb C[t]$ で共通非単元因子を持ちません。[原始的方程式の平坦性命題](#prop-ag3-14-primitive-flat)を $n=2,d=3$ へ適用すると射影族は平坦です。

$Z=0$ では $-X^3=0$ から $[0:1:0]$ のみが曲線上にあります。この点の偏微分 $F_Z=Y^2+2XZ+3tZ^2$ は1であり、どの $t$ でも滑らかです。$Z=1$ の座標で
$$
f_t(x,y)=y^2-x^3+x+t
$$
と置くと、特異点では $f_t=0$ と偏微分 $(f_t)_x=-3x^2+1=0$、$(f_t)_y=2y=0$ が必要です。後二式から $y=0,x^2=1/3$。このとき $x^3=x/3$ なので $f_t=2x/3+t$ となり
$$
t=-\frac{2x}{3},\qquad t^2=\frac4{27}.
$$
逆に $x=\pm1/\sqrt3$ と $t=-2x/3$ を選べば全式を満たすので、この二値が特異ファイバーの全てです。

各 $t$ で $F_t$ は零でない三次斉次式です。[制限完全列](../AG3-11/index.md#prop-ag3-11-restriction)を $m=0$ で用いると
$$
H^1(C_t,\mathcal O_{C_t})
\simeq H^2(\mathbb P^2,\mathcal O(-3)).
$$
[射影空間の計算](../AG3-10/index.md#thm-ag3-10-projective-twist-cohomology)により右辺は1次元なので全ファイバーで $h^1=1$ です。特異ファイバーでこの値を滑らかな曲線の幾何学的種数と呼んではいけません。
<!-- solution-end -->

### B4. 接する二次曲線と直線

$C:YZ-X^2=0$ と $L:Y=0$ を $\mathbb P^2_{\mathbb C}$ 内で考える。$C$ の滑らかさ、$C\cap L$ の集合としての交点と局所交叉重複度を求めよ。

- Level: B
- ID: AG3-14-B4

<!-- solution-start -->
### 詳細解答

$F_X=-2X,F_Y=Z,F_Z=Y$ の同時零は射影点にならないため、$C$ は滑らかです。$Y=0$ を代入すると $X^2=0$ で、唯一の交点は $P=[0:0:1]$ です。$Z=1$ の局所座標 $x=X/Z,y=Y/Z$ では方程式は $y-x^2=0,y=0$。従って[局所交叉重複度](../AG3-13/index.md#def-ag3-13-local-intersection)は
$$
I_P(C,L)=\dim_k k[x,y]_{(x,y)}/(y-x^2,y)
=\dim_k k[x]_{(x)}/(x^2)=2.
$$
基底は $1,x$ です。[直線Bézout公式](../AG2-04/index.md#thm-ag2-04-line-bezout)の総和は $\deg C=2$ で一致します。一つの幾何学的交点を二度数えるのは、直線への制限式に重根があるからです。
<!-- solution-end -->

### C1. 三次曲線の全体と局所

$C:Y^2Z-X^3+XZ^2=0$ と $L:Z=0$ を $\mathbb P^2_{\mathbb C}$ 内で考える。(i) $C$ の滑らかさと種数を証明し、$K_C$、$h^0(\mathcal O_C)$、$h^1(\mathcal O_C)$ を求めよ。(ii) $C\cap L$ の局所交叉重複度の総和を求め、次数と照合せよ。

- Level: C
- ID: AG3-14-C1

<!-- solution-start -->
### 詳細解答

無限遠 $Z=0$ では $-X^3=0$ で、曲線上の点は $P=[0:1:0]$ だけです。そこで $F_Z=Y^2+2XZ=1$ だから非特異です。$Z=1$ では $f=y^2-x^3+x$。特異点が存在すれば
$$
f=0,\qquad 2y=0,\qquad -3x^2+1=0
$$
を同時に満たします。最後の二式から $y=0,x^2=1/3$ で、$f=-x/3+x=2x/3=0$ となるのは $x=0$ の場合だけです。これは $x^2=1/3$ に矛盾し、$C$ は滑らかです。

[種数公式](../AG3-11/index.md#cor-ag3-11-plane-genus)へ $d=3$ を代入すると $g=1$。[随伴公式](../AG2-10/index.md#thm-ag2-10-adjunction)で $K_C\simeq\mathcal O_C(3-3)=\mathcal O_C$。[曲線のコホモロジー公式](../AG3-11/index.md#thm-ag3-11-curve-cohomology)へ $d=3,m=0$ を入れると
$$
h^0=\dim S_0-\dim S_{-3}=1,\qquad
h^1=\dim S_0-\dim S_{-3}=1.
$$
次に直線上の制限は $-X^3=0$ なので交点は $P$ のみです。$Y=1$ の局所座標 $x=X/Y,z=Z/Y$ を使い
$$
I_P(C,L)=\dim_k k[x,z]_{(x,z)}/(z-x^3+xz^2,z)
=\dim_k k[x]_{(x)}/(x^3)=3
$$
と求めます。最後の商の基底は $1,x,x^2$。[直線Bézout公式](../AG2-04/index.md#thm-ag2-04-line-bezout)の $\deg C=3$ と一致しますが、集合としての交点は一つです。
<!-- solution-end -->

### C2. 特異化する四次曲面族

$k=\mathbb C$、$X_t\subset\mathbb P^3_k$ を
$$
X_0^4+X_1^4+X_2^4+tX_3^4=0
$$
で定める。$\mathbb A^1_k$ 上の平坦性を証明し、$t=0$ と $t\ne0$ の滑らかさを判定せよ。全ての $t$ に対して $h^i(X_t,\mathcal O_{X_t})$（$i=0,1,2$）を求め、滑らかなファイバーの標準束も計算せよ。

- Level: C
- ID: AG3-14-C2

<!-- solution-start -->
### 詳細解答

$X_0^4$ の係数は1なので、斉次式の係数は $k[t]$ 上で互いに素です。[原始的斉次方程式の平坦性命題](#prop-ag3-14-primitive-flat)へ $n=3,d=4$ を代入して、この射影超曲面族は平坦です。

$t\ne0$ では偏微分
$$
4X_0^3,\quad4X_1^3,\quad4X_2^3,\quad4tX_3^3
$$
が同時に零となる射影点は存在せず滑らかです。$t=0$ では $P=[0:0:0:1]$ で方程式も全偏微分も零になるため特異です。また偏微分が同時に零なら $X_0=X_1=X_2=0$ なので特異点は $P$ だけです。

全ファイバーで $F_t$ は零でない次数4の斉次式なので、滑らかさを仮定しない[構造層コホモロジー定理](#thm-ag3-14-surface-cohomology)の前半から
$$
h^0(X_t,\mathcal O_{X_t})=1,\qquad
h^1(X_t,\mathcal O_{X_t})=0,\qquad
h^2(X_t,\mathcal O_{X_t})=\binom33=1.
$$
各ファイバーには
$$
0\to\mathcal O_{\mathbb P^3}(-4)\xrightarrow{\cdot F_t}
\mathcal O_{\mathbb P^3}\to i_{t*}\mathcal O_{X_t}\to0
$$
があり、$F_t\ne0$ だから左の単射性が保たれることが根拠です。$t\ne0$ で滑らかであることを確認したので、[滑らかな射影超曲面の随伴公式](../AG2-10/index.md#thm-ag2-10-adjunction)を適用し
$$
K_{X_t}\simeq\mathcal O_{X_t}(4-4)=\mathcal O_{X_t}.
$$
$t=0$ は特異なので、この**滑らかな超曲面**を仮定した公式をそのまま使ったとは主張しません。構造層の群が一定でも滑らかさは失われ得る、という違いがこの問題の核心です。
<!-- solution-end -->

## 6. 結び

斉次方程式から (1) 制限完全列、(2) 随伴公式、(3) 局所商環の長さ、(4) 係数付き環の平坦性をそれぞれ取り出せるようになりました。曲線と曲面、コホモロジーの次数、滑らかさを必要とする結論を区別することが、複数の計算を接続する鍵です。

一般因子のRiemann–Roch、一般の交叉積、Grothendieck双対、任意の変形障害群はこの章で証明していません。これらが後続の理論で必要になる場合は、ここで扱った具体的な局所長・完全列から、追加の理論を導入する必要があります。
