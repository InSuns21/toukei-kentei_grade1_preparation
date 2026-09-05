# 13A. 計算基礎体力ドリル

ここでは、統計問題の途中で必要になる微積分・線形代数の手計算を反復します。Level A は1技能を5〜10分、Level B は複数の計算を10〜15分でつなぐ構成です。

## 追加公式：手計算でよく使うもの

### 行列式・逆行列

行基本変形と行列式には次の関係があります。

- 2行を入れ替えると行列式の符号が反転する。
- 1行を $c$ 倍すると行列式も $c$ 倍される。
- ある行に別の行の定数倍を加えても行列式は変わらない。
- 三角行列の行列式は対角成分の積である。

正方行列 $A$ で $\det A\ne0$ なら

$$
\boxed{A^{-1}=\frac{\operatorname{adj}(A)}{\det A}}.
$$

### 固有値・対角化

$2\times2$ 行列では

$$
\boxed{
\det(\lambda I-A)
=\lambda^2-\operatorname{tr}(A)\lambda+\det A
}.
$$

また、$A=PDP^{-1}$ と対角化できれば

$$
\boxed{A^k=PD^kP^{-1}}
$$

です。

### 最小二乗の正規方程式

$$
S(\boldsymbol\beta)
=\|\boldsymbol y-X\boldsymbol\beta\|^2
$$

に対して

$$
\operatorname{grad}_{\boldsymbol\beta}S
=-2X^{\mathsf T}\boldsymbol y
+2X^{\mathsf T}X\boldsymbol\beta.
$$

したがって停留条件は

$$
\boxed{X^{\mathsf T}X\widehat{\boldsymbol\beta}=X^{\mathsf T}\boldsymbol y}.
$$

$X$ が列フルランクなら

$$
\boxed{
\widehat{\boldsymbol\beta}
=(X^{\mathsf T}X)^{-1}X^{\mathsf T}\boldsymbol y
}.
$$

### Cholesky（コレスキー）分解

実対称正定値行列 $A$ は、対角成分が正の下三角行列 $L$ によって

$$
\boxed{A=LL^{\mathsf T}}
$$

と分解できます。成分は左上から

$$
\boxed{
\ell_{ii}
=\sqrt{a_{ii}-\sum_{k=1}^{i-1}\ell_{ik}^2}
}
$$

および $j>i$ に対して

$$
\boxed{
\ell_{ji}
=\frac{a_{ji}-\sum_{k=1}^{i-1}\ell_{jk}\ell_{ik}}
{\ell_{ii}}
}
$$

と求められます。

### 整数次数のガンマ型積分

$m=0,1,2,\ldots$、$\beta>0$ なら

$$
\boxed{
\int_0^\infty x^m e^{-\beta x}\,dx
=\frac{m!}{\beta^{m+1}}
}.
$$

---

## F0M-A10 行列積・転置を手で回す

- Level: A
- 目安時間: 7分
- 主題: 行列積と転置

$$
A=
\begin{pmatrix}
1&2&-1\\
0&1&3
\end{pmatrix},
\qquad
B=
\begin{pmatrix}
2&1\\
1&-1\\
0&2
\end{pmatrix}
$$

とする。$AB$、$BA$ を求め、$(AB)^{\mathsf T}=B^{\mathsf T}A^{\mathsf T}$ を数値で確認せよ。

<!-- solution-start -->

### 解答

#### 詳細解答

$A$ は $2\times3$、$B$ は $3\times2$ なので、$AB$ は $2\times2$、$BA$ は $3\times3$ です。

$$
AB
=
\begin{pmatrix}
1\cdot2+2\cdot1-1\cdot0&1\cdot1-2-2\\
0+1+0&0-1+6
\end{pmatrix}
=
\boxed{
\begin{pmatrix}
4&-3\\
1&5
\end{pmatrix}}.
$$

$$
BA
=
\boxed{
\begin{pmatrix}
2&5&1\\
1&1&-4\\
0&2&6
\end{pmatrix}}.
$$

したがって

$$
(AB)^{\mathsf T}
=
\begin{pmatrix}4&1\\-3&5\end{pmatrix}.
$$

一方

$$
B^{\mathsf T}A^{\mathsf T}
=
\begin{pmatrix}4&1\\-3&5\end{pmatrix}
$$

なので転置公式を確認できます。

#### 本番答案

$$
AB=\begin{pmatrix}4&-3\\1&5\end{pmatrix},
\qquad
BA=\begin{pmatrix}2&5&1\\1&1&-4\\0&2&6\end{pmatrix}.
$$

また

$$
(AB)^{\mathsf T}=B^{\mathsf T}A^{\mathsf T}
=\begin{pmatrix}4&1\\-3&5\end{pmatrix}.
$$

#### 採点基準

$AB$ 6点、$BA$ 8点、転置公式の数値確認6点。計20点。

<!-- solution-end -->

## F0M-A11 $3\times3$ 行列の行列式・逆行列

- Level: A
- 目安時間: 9分
- 主題: 行列式と逆行列

$$
M=
\begin{pmatrix}
1&2&0\\
2&1&1\\
0&1&2
\end{pmatrix}
$$

について、$\det M$ と $M^{-1}$ を求めよ。

<!-- solution-start -->

### 解答

#### 詳細解答

第1行で展開すると

$$
\begin{aligned}
\det M
&=1\det\begin{pmatrix}1&1\\1&2\end{pmatrix}
-2\det\begin{pmatrix}2&1\\0&2\end{pmatrix}\\
&=(2-1)-2(4)\\
&=\boxed{-7}.
\end{aligned}
$$

余因子行列は

$$
C=
\begin{pmatrix}
1&-4&2\\
-4&2&-1\\
2&-1&-3
\end{pmatrix}.
$$

$C$ は対称なので $\operatorname{adj}(M)=C$。従って

$$
\boxed{
M^{-1}
=
\begin{pmatrix}
-1/7&4/7&-2/7\\
4/7&-2/7&1/7\\
-2/7&1/7&3/7
\end{pmatrix}}
$$

です。

#### 本番答案

$\det M=-7$。余因子行列を用いて

$$
\boxed{
M^{-1}
=
\begin{pmatrix}
-1/7&4/7&-2/7\\
4/7&-2/7&1/7\\
-2/7&1/7&3/7
\end{pmatrix}}.
$$

#### 採点基準

行列式6点、余因子行列8点、逆行列6点。計20点。

<!-- solution-end -->

## F0M-A12 掃き出し・階数・連立方程式

- Level: A
- 目安時間: 8分
- 主題: 行基本変形と階数

$$
\begin{pmatrix}
1&2&1\\
2&4&2\\
1&1&0
\end{pmatrix}
\begin{pmatrix}x_1\\x_2\\x_3\end{pmatrix}
=
\begin{pmatrix}4\\8\\2\end{pmatrix}
$$

を掃き出し法で解き、係数行列の階数も求めよ。

<!-- solution-start -->

### 解答

#### 詳細解答

拡大係数行列を

$$
\left(
\begin{array}{ccc|c}
1&2&1&4\\
2&4&2&8\\
1&1&0&2
\end{array}
\right)
$$

とします。$R_2\leftarrow R_2-2R_1$、$R_3\leftarrow R_3-R_1$ の後、行を整理すると

$$
\left(
\begin{array}{ccc|c}
1&2&1&4\\
0&1&1&2\\
0&0&0&0
\end{array}
\right).
$$

さらに $R_1\leftarrow R_1-2R_2$ で

$$
\left(
\begin{array}{ccc|c}
1&0&-1&0\\
0&1&1&2\\
0&0&0&0
\end{array}
\right).
$$

非零行が2本なので階数は $2$。$x_3=t$ と置けば

$$
\boxed{(x_1,x_2,x_3)=(t,2-t,t),\qquad t\in\mathbb R}.
$$

#### 本番答案

掃き出し後は

$$
\left(
\begin{array}{ccc|c}
1&0&-1&0\\
0&1&1&2\\
0&0&0&0
\end{array}
\right).
$$

よって $\operatorname{rank}=2$、一般解は

$$
\boxed{(x_1,x_2,x_3)=(t,2-t,t)}.
$$

#### 採点基準

行基本変形10点、階数4点、一般解6点。計20点。

<!-- solution-end -->

## F0M-A13 固有値・固有ベクトル・対角化

- Level: A
- 目安時間: 10分
- 主題: 固有値と対角化

$$
E=
\begin{pmatrix}
4&1\\
2&3
\end{pmatrix}
$$

について、固有値と対応する固有ベクトルを求め、$E=PDP^{-1}$ と対角化せよ。さらに $E^3$ を求めよ。

<!-- solution-start -->

### 解答

#### 詳細解答

特性方程式は

$$
\det(E-\lambda I)
=(4-\lambda)(3-\lambda)-2
=(\lambda-5)(\lambda-2)=0.
$$

したがって固有値は $5,2$ です。

$\lambda=5$ では $-v_1+v_2=0$ なので、固有ベクトルとして

$$
\boldsymbol v_1=(1,1)^{\mathsf T}
$$

を取れます。$\lambda=2$ では $2v_1+v_2=0$ なので

$$
\boldsymbol v_2=(1,-2)^{\mathsf T}
$$

を取れます。従って

$$
P=
\begin{pmatrix}1&1\\1&-2\end{pmatrix},
\qquad
D=
\begin{pmatrix}5&0\\0&2\end{pmatrix},
\qquad
P^{-1}=
\begin{pmatrix}2/3&1/3\\1/3&-1/3\end{pmatrix}.
$$

よって

$$
E^3=PD^3P^{-1}
=\boxed{
\begin{pmatrix}
86&39\\
78&47
\end{pmatrix}}.
$$

#### 本番答案

固有値は $5,2$。対応する固有ベクトルとして $(1,1)^{\mathsf T}$、$(1,-2)^{\mathsf T}$ を取れる。

$$
P=\begin{pmatrix}1&1\\1&-2\end{pmatrix},
\qquad D=\operatorname{diag}(5,2),
\qquad E=PDP^{-1}.
$$

従って

$$
\boxed{E^3=\begin{pmatrix}86&39\\78&47\end{pmatrix}}.
$$

#### 採点基準

固有値6点、固有ベクトル6点、対角化4点、$E^3$ 4点。計20点。

<!-- solution-end -->

## F0M-A14 二次形式・正定値性を二通りで判定する

- Level: A
- 目安時間: 7分
- 主題: 二次形式と正定値性

$$
Q=
\begin{pmatrix}
3&-1\\
-1&2
\end{pmatrix}
$$

とする。$\boldsymbol x=(x,y)^{\mathsf T}$ に対して $\boldsymbol x^{\mathsf T}Q\boldsymbol x$ を展開し、平方完成とシルベスターの判定法の両方で正定値性を確認せよ。

<!-- solution-start -->

### 解答

#### 詳細解答

$$
\boldsymbol x^{\mathsf T}Q\boldsymbol x
=3x^2-2xy+2y^2.
$$

平方完成すると

$$
3x^2-2xy+2y^2
=3\left(x-\frac y3\right)^2+\frac53y^2.
$$

$(x,y)\ne(0,0)$ なら正なので $Q$ は正定値です。

また

$$
\Delta_1=3>0,
\qquad
\Delta_2=\det Q=5>0
$$

なので、シルベスターの判定法からも正定値です。

#### 本番答案

$$
\boldsymbol x^{\mathsf T}Q\boldsymbol x
=3\left(x-\frac y3\right)^2+\frac53y^2>0
$$

は $(x,y)\ne(0,0)$ で成り立つ。また $\Delta_1=3>0$、$\Delta_2=5>0$。従って $\boxed{Q\text{ は正定値}}$。

#### 採点基準

二次形式4点、平方完成8点、シルベスター判定8点。計20点。

<!-- solution-end -->

## F0M-A15 基本微分を連続処理する

- Level: A
- 目安時間: 6分
- 主題: 積・合成関数・べきの微分

次を微分せよ。

1. $f(x)=x^2e^{-3x}$
2. $g(x)=\log(1+x^2)$
3. $h(x)=(1+x)^{-1/2}$

<!-- solution-start -->

### 解答

#### 詳細解答

積の微分と合成関数の微分から

$$
f'(x)=2xe^{-3x}-3x^2e^{-3x}
=\boxed{(2x-3x^2)e^{-3x}}.
$$

また

$$
g'(x)=\frac{1}{1+x^2}\cdot2x
=\boxed{\frac{2x}{1+x^2}},
$$

$$
h'(x)=\boxed{-\frac12(1+x)^{-3/2}}.
$$

#### 本番答案

$$
\boxed{f'(x)=(2x-3x^2)e^{-3x}},
\qquad
\boxed{g'(x)=\frac{2x}{1+x^2}},
\qquad
\boxed{h'(x)=-\frac12(1+x)^{-3/2}}.
$$

#### 採点基準

各小問6点、微分則の適用2点。計20点。

<!-- solution-end -->

## F0M-A16 勾配・ヘッセ行列・停留点

- Level: A
- 目安時間: 9分
- 主題: 多変数微分と極値

$$
g(x,y)=2x^2+xy+3y^2-4x+2y
$$

について、勾配、ヘッセ行列、停留点を求め、その停留点が狭義最小点であることを判定せよ。

<!-- solution-start -->

### 解答

#### 詳細解答

$$
\operatorname{grad}g(x,y)
=
\begin{pmatrix}
4x+y-4\\
x+6y+2
\end{pmatrix},
\qquad
H_g=
\begin{pmatrix}
4&1\\1&6
\end{pmatrix}.
$$

停留条件は

$$
4x+y=4,
\qquad
x+6y=-2.
$$

これを解くと

$$
\boxed{(x,y)=\left(\frac{26}{23},-\frac{12}{23}\right)}.
$$

さらに

$$
4>0,
\qquad
\det H_g=24-1=23>0
$$

なので $H_g$ は正定値です。従ってこの停留点は狭義最小点です。

#### 本番答案

$$
\nabla g=(4x+y-4,\ x+6y+2)^{\mathsf T},
\qquad
H_g=\begin{pmatrix}4&1\\1&6\end{pmatrix}.
$$

$\nabla g=0$ より

$$
\boxed{(x,y)=(26/23,-12/23)}.
$$

$4>0$、$\det H_g=23>0$ なので $H_g$ は正定値。従って狭義最小点。

#### 採点基準

勾配5点、ヘッセ行列4点、停留点6点、極値判定5点。計20点。

<!-- solution-end -->

## F0M-A17 置換積分・部分積分・ガンマ型積分

- Level: A
- 目安時間: 9分
- 主題: 基本積分計算

次を求めよ。

1. $\displaystyle \int_0^1 x(1+x^2)^2\,dx$
2. $\displaystyle \int_0^\infty xe^{-2x}\,dx$
3. $\displaystyle \int_0^\infty x^3e^{-2x}\,dx$

<!-- solution-start -->

### 解答

#### 詳細解答

1. $u=1+x^2$ と置けば $du=2x\,dx$ なので
   $$
   \int_0^1x(1+x^2)^2dx
   =\frac12\int_1^2u^2du
   =\boxed{\frac76}.
   $$
2. 有限区間で部分積分すると
   $$
   \int_0^Rxe^{-2x}dx
   =\left[-\frac x2e^{-2x}\right]_0^R
   +\frac12\int_0^Re^{-2x}dx.
   $$
   $R\to\infty$ として
   $$
   \boxed{\int_0^\infty xe^{-2x}dx=\frac14}.
   $$
3. ガンマ型積分の公式から
   $$
   \boxed{
   \int_0^\infty x^3e^{-2x}dx
   =\frac{3!}{2^4}=\frac38}.
   $$

#### 本番答案

$$
\int_0^1x(1+x^2)^2dx=\boxed{7/6},
\qquad
\int_0^\infty xe^{-2x}dx=\boxed{1/4},
\qquad
\int_0^\infty x^3e^{-2x}dx=\boxed{3/8}.
$$

#### 採点基準

置換積分7点、部分積分7点、ガンマ型積分6点。計20点。

<!-- solution-end -->

## F0M-B08 正規方程式を数値で解く

- Level: B
- 目安時間: 12分
- 主題: 最小二乗法と射影

$$
X=
\begin{pmatrix}
1&0\\
1&1\\
1&2
\end{pmatrix},
\qquad
\boldsymbol y=
\begin{pmatrix}1\\2\\2\end{pmatrix}
$$

とする。$S(\boldsymbol\beta)=\|\boldsymbol y-X\boldsymbol\beta\|^2$ を最小化する $\widehat{\boldsymbol\beta}$ を求めよ。さらに残差 $\boldsymbol r=\boldsymbol y-X\widehat{\boldsymbol\beta}$ を求め、$X^{\mathsf T}\boldsymbol r=\boldsymbol0$ を確認せよ。

<!-- solution-start -->

### 解答

#### 詳細解答

$$
\operatorname{grad}_{\boldsymbol\beta}S
=-2X^{\mathsf T}(\boldsymbol y-X\boldsymbol\beta)
$$

を0と置くと正規方程式

$$
X^{\mathsf T}X\widehat{\boldsymbol\beta}=X^{\mathsf T}\boldsymbol y
$$

を得ます。ここで

$$
X^{\mathsf T}X=
\begin{pmatrix}3&3\\3&5\end{pmatrix},
\qquad
X^{\mathsf T}\boldsymbol y=
\begin{pmatrix}5\\6\end{pmatrix}.
$$

従って

$$
\widehat{\boldsymbol\beta}
=\frac16
\begin{pmatrix}5&-3\\-3&3\end{pmatrix}
\begin{pmatrix}5\\6\end{pmatrix}
=
\boxed{
\begin{pmatrix}7/6\\1/2\end{pmatrix}}.
$$

当てはめ値と残差は

$$
X\widehat{\boldsymbol\beta}
=
\begin{pmatrix}7/6\\5/3\\13/6\end{pmatrix},
\qquad
\boldsymbol r
=
\boxed{
\begin{pmatrix}-1/6\\1/3\\-1/6\end{pmatrix}}.
$$

最後に

$$
X^{\mathsf T}\boldsymbol r
=
\begin{pmatrix}0\\0\end{pmatrix}
$$

となり、残差は $X$ の各列に直交します。

#### 本番答案

正規方程式から

$$
\boxed{\widehat\beta=(7/6,1/2)^{\mathsf T}}.
$$

残差は

$$
\boxed{r=(-1/6,1/3,-1/6)^{\mathsf T}},
\qquad
X^{\mathsf T}r=0.
$$

#### 採点基準

正規方程式5点、行列計算6点、推定量5点、残差と直交性4点。計20点。

<!-- solution-end -->

## F0M-B09 Cholesky（コレスキー）分解を手計算する

- Level: B
- 目安時間: 12分
- 主題: 正定値行列とCholesky分解

$$
A=
\begin{pmatrix}
4&2&0\\
2&5&2\\
0&2&2
\end{pmatrix}
$$

を $A=LL^{\mathsf T}$ と分解せよ。ただし $L$ は対角成分が正の下三角行列とする。

<!-- solution-start -->

### 解答

#### 詳細解答

$$
L=
\begin{pmatrix}
\ell_{11}&0&0\\
\ell_{21}&\ell_{22}&0\\
\ell_{31}&\ell_{32}&\ell_{33}
\end{pmatrix}
$$

と置いて $LL^{\mathsf T}$ の成分を $A$ と比較します。

$$
\ell_{11}^2=4
$$

より $\ell_{11}=2$。次に

$$
2\ell_{21}=2,
\qquad
2\ell_{31}=0
$$

より $\ell_{21}=1,\ell_{31}=0$。

さらに

$$
1^2+\ell_{22}^2=5,
\qquad
1\cdot0+2\ell_{32}=2
$$

から $\ell_{22}=2,\ell_{32}=1$。最後に

$$
0^2+1^2+\ell_{33}^2=2
$$

より $\ell_{33}=1$ です。

したがって

$$
\boxed{
L=
\begin{pmatrix}
2&0&0\\
1&2&0\\
0&1&1
\end{pmatrix}}.
$$

#### 本番答案

成分を左上から比較すると

$$
\ell_{11}=2,
\quad\ell_{21}=1,
\quad\ell_{31}=0,
\quad\ell_{22}=2,
\quad\ell_{32}=1,
\quad\ell_{33}=1.
$$

従って

$$
\boxed{L=\begin{pmatrix}2&0&0\\1&2&0\\0&1&1\end{pmatrix}}.
$$

#### 採点基準

第1列6点、第2列6点、第3列4点、分解の完成4点。計20点。

<!-- solution-end -->

## F0M-B10 ラグランジュ未定乗数法を数値で解く

- Level: B
- 目安時間: 10分
- 主題: 制約付き最適化

制約 $x+y=3$ の下で

$$
f(x,y)=x^2+2y^2
$$

を最小にする $(x,y)$ と最小値を求めよ。

<!-- solution-start -->

### 解答

#### 詳細解答

$g(x,y)=x+y$ とすると

$$
\operatorname{grad}f
=\lambda\operatorname{grad}g
$$

より

$$
2x=\lambda,
\qquad
4y=\lambda.
$$

従って $x=2y$。制約と合わせると

$$
2y+y=3
$$

なので

$$
\boxed{(x,y)=(2,1)}.
$$

このとき

$$
\boxed{f(2,1)=6}.
$$

$f$ のヘッセ行列 $\operatorname{diag}(2,4)$ は正定値なので、この点が制約直線上の最小点です。

#### 本番答案

$2x=\lambda,4y=\lambda$ より $x=2y$。$x+y=3$ と合わせて

$$
\boxed{(x,y)=(2,1)},
\qquad
\boxed{\min f=6}.
$$

#### 採点基準

ラグランジュ方程式7点、連立条件5点、最小点4点、最小値4点。計20点。

<!-- solution-end -->

## F0M-B11 二重積分を線形変数変換する

- Level: B
- 目安時間: 12分
- 主題: 変数変換・逆変換・ヤコビアン

$$
R=\{(x,y):0\le x+y\le2,\ -1\le x-y\le1\}
$$

とする。変数変換

$$
u=x+y,
\qquad
v=x-y
$$

を用いて

$$
\iint_R(x+y)\,dx\,dy
$$

を求めよ。

<!-- solution-start -->

### 解答

#### 詳細解答

加減して逆変換を求めると

$$
x=\frac{u+v}{2},
\qquad
y=\frac{u-v}{2}.
$$

ヤコビアンは

$$
\frac{\partial(x,y)}{\partial(u,v)}
=
\det
\begin{pmatrix}
1/2&1/2\\
1/2&-1/2
\end{pmatrix}
=-\frac12
$$

なので面積倍率は $1/2$ です。

領域は

$$
0\le u\le2,
\qquad
-1\le v\le1
$$

という長方形になります。被積分関数は $u$ なので

$$
\begin{aligned}
\iint_R(x+y)\,dx\,dy
&=\int_0^2\int_{-1}^1\frac u2\,dv\,du\\
&=\int_0^2u\,du\\
&=\boxed{2}.
\end{aligned}
$$

#### 本番答案

逆変換は

$$
x=(u+v)/2,
\qquad y=(u-v)/2,
$$

ヤコビアン絶対値は $1/2$。従って

$$
\iint_R(x+y)dxdy
=\int_0^2\int_{-1}^1\frac u2\,dv\,du
=\boxed{2}.
$$

#### 採点基準

逆変換5点、ヤコビアン5点、領域4点、積分6点。計20点。

<!-- solution-end -->
