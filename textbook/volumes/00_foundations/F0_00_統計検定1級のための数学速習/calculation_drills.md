# 13A. 計算基礎体力ドリル

ここでは、統計の問題を解く途中で止まりやすい微積分・線形代数の手計算を反復します。整数と小さな分数を中心にし、Level A は1つの計算技能を5〜10分、Level B は複数の計算を10〜15分でつなぐ構成です。

最初は途中式を丁寧に書き、慣れてきたら「行列積の次元確認 → 計算」「微分則の選択 → 微分」「変数変換 → 逆変換 → ヤコビアン」のように、計算の起動手順まで短くします。

## 追加公式：手計算でよく使うもの

### 行列式と行基本変形

行列式では、行基本変形に対して次が成り立ちます。

- 2行を入れ替えると行列式の符号が反転する。
- 1行を $c$ 倍すると行列式も $c$ 倍される。
- ある行に別の行の定数倍を加えても行列式は変わらない。
- 三角行列の行列式は対角成分の積である。

したがって、$3\times3$ 以上では余因子展開だけでなく、行基本変形で三角形へ持っていく方法も有効です。

$A$ が正方行列で $\det A\ne0$ なら

$$
\boxed{
A^{-1}=\frac{\operatorname{adj}(A)}{\det A}
}
$$

です。ただし、数値計算では $[A\mid I]$ を掃き出して $[I\mid A^{-1}]$ にする方が速い場合もあります。

### $2\times2$ 行列の固有値計算

$2\times2$ 行列では

$$
\boxed{
\det(\lambda I-A)
=\lambda^2-\operatorname{tr}(A)\lambda+\det A
}
$$

が使えます。

対角化可能な行列で

$$
A=PDP^{-1}
$$

と書ければ、正整数 $k$ に対して

$$
\boxed{A^k=PD^kP^{-1}}
$$

です。行列を何度も掛ける代わりに、対角成分を $k$ 乗します。

### 最小二乗の正規方程式

$X\in\mathbb R^{n\times p}$、$\boldsymbol y\in\mathbb R^n$ とし

$$
S(\boldsymbol\beta)
=\|\boldsymbol y-X\boldsymbol\beta\|^2
$$

を最小化します。勾配は

$$
\operatorname{grad}_{\boldsymbol\beta}S
=-2X^{\mathsf T}\boldsymbol y
+2X^{\mathsf T}X\boldsymbol\beta
$$

なので、停留条件から

$$
\boxed{X^{\mathsf T}X\widehat{\boldsymbol\beta}=X^{\mathsf T}\boldsymbol y}
$$

を得ます。$X$ が列フルランクなら

$$
\boxed{
\widehat{\boldsymbol\beta}
=(X^{\mathsf T}X)^{-1}X^{\mathsf T}\boldsymbol y
}
$$

です。

### Cholesky（コレスキー）分解

実対称正定値行列 $A$ は、対角成分が正の下三角行列 $L$ を用いて

$$
\boxed{A=LL^{\mathsf T}}
$$

と分解できます。成分を左上から順に求めると

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

です。

### 整数次数のガンマ型積分

$m=0,1,2,\ldots$、$\beta>0$ なら

$$
\boxed{
\int_0^\infty x^m e^{-\beta x}\,dx
=\frac{m!}{\beta^{m+1}}
}
$$

です。$t=\beta x$ と置換してガンマ関数へ直すか、部分積分を繰り返して求められます。

---

## F0M-A10 行列積・転置を手で回す

- Level: A
- 目安時間: 7分
- 主題: 行列積と転置

次の行列を考える。

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
\end{pmatrix}.
$$

$AB$、$BA$ を求め、$(AB)^{\mathsf T}=B^{\mathsf T}A^{\mathsf T}$ を数値で確認せよ。

<!-- solution-start -->

### 解答

#### 詳細解答

$A$ は $2\times3$、$B$ は $3\times2$ なので、$AB$ は $2\times2$、$BA$ は $3\times3$ です。

まず

$$
AB
=
\begin{pmatrix}
1\cdot2+2\cdot1+(-1)\cdot0
&1\cdot1+2\cdot(-1)+(-1)\cdot2\\
0\cdot2+1\cdot1+3\cdot0
&0\cdot1+1\cdot(-1)+3\cdot2
\end{pmatrix}
=
\boxed{
\begin{pmatrix}
4&-3\\
1&5
\end{pmatrix}}
$$

です。

次に

$$
BA
=
\begin{pmatrix}
2&1\\
1&-1\\
0&2
\end{pmatrix}
\begin{pmatrix}
1&2&-1\\
0&1&3
\end{pmatrix}
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
\begin{pmatrix}
4&1\\
-3&5
\end{pmatrix}.
$$

一方

$$
B^{\mathsf T}A^{\mathsf T}
=
\begin{pmatrix}
2&1&0\\
1&-1&2
\end{pmatrix}
\begin{pmatrix}
1&0\\
2&1\\
-1&3
\end{pmatrix}
=
\begin{pmatrix}
4&1\\
-3&5
\end{pmatrix}.
$$

よって $(AB)^{\mathsf T}=B^{\mathsf T}A^{\mathsf T}$ を確認できます。

#### 本番答案

$$
AB=\begin{pmatrix}4&-3\\1&5\end{pmatrix},
\qquad
BA=\begin{pmatrix}2&5&1\\1&1&-4\\0&2&6\end{pmatrix}.
$$

また

$$
(AB)^{\mathsf T}
=B^{\mathsf T}A^{\mathsf T}
=\begin{pmatrix}4&1\\-3&5\end{pmatrix}.
$$

#### 採点基準

$AB$ の計算6点、$BA$ の計算8点、転置公式の数値確認6点。計20点。

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

について、$\det M$ を求め、逆行列 $M^{-1}$ を求めよ。

<!-- solution-start -->

### 解答

#### 詳細解答

第1行で余因子展開すると

$$
\begin{aligned}
\det M
&=1\cdot
\det\begin{pmatrix}1&1\\1&2\end{pmatrix}
-2\cdot
\det\begin{pmatrix}2&1\\0&2\end{pmatrix}\\
&=1(2-1)-2(4-0)\\
&=\boxed{-7}.
\end{aligned}
$$

$\det M\ne0$ なので逆行列が存在します。

余因子行列は

$$
C=
\begin{pmatrix}
1&-4&2\\
-4&2&-1\\
2&-1&-3
\end{pmatrix}.
$$

この行列は対称なので $\operatorname{adj}(M)=C^{\mathsf T}=C$ です。したがって

$$
M^{-1}
=\frac1{-7}
\begin{pmatrix}
1&-4&2\\
-4&2&-1\\
2&-1&-3
\end{pmatrix}
=
\boxed{
\begin{pmatrix}
-1/7&4/7&-2/7\\
4/7&-2/7&1/7\\
-2/7&1/7&3/7
\end{pmatrix}}
$$

です。

#### 本番答案

$\det M=1(2-1)-2(4)=-7$。余因子行列は

$$
\begin{pmatrix}1&-4&2\\-4&2&-1\\2&-1&-3\end{pmatrix}
$$

なので

$$
M^{-1}
=\boxed{
\begin{pmatrix}
-1/7&4/7&-2/7\\
4/7&-2/7&1/7\\
-2/7&1/7&3/7
\end{pmatrix}}.
$$

#### 採点基準

行列式6点、可逆性の確認2点、余因子行列6点、逆行列6点。計20点。

<!-- solution-end -->

## F0M-A12 掃き出し・階数・連立方程式

- Level: A
- 目安時間: 8分
- 主題: 行基本変形と階数

連立方程式

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

拡大係数行列から始めます。

$$
\left(
\begin{array}{ccc|c}
1&2&1&4\\
2&4&2&8\\
1&1&0&2
\end{array}
\right).
$$

$R_2\leftarrow R_2-2R_1$、$R_3\leftarrow R_3-R_1$ とすると

$$
\left(
\begin{array}{ccc|c}
1&2&1&4\\
0&0&0&0\\
0&-1&-1&-2
\end{array}
\right).
$$

第2行と第3行を入れ替え、さらに第2行を $-1$ 倍すると

$$
\left(
\begin{array}{ccc|c}
1&2&1&4\\
0&1&1&2\\
0&0&0&0
\end{array}
\right).
$$

$R_1\leftarrow R_1-2R_2$ により

$$
\left(
\begin{array}{ccc|c}
1&0&-1&0\\
0&1&1&2\\
0&0&0&0
\end{array}
\right).
$$

非零行は2本なので係数行列の階数は

$$
\boxed{2}
$$

です。$x_3=t$ と置けば

$$
x_1-x_3=0,
\qquad
x_2+x_3=2
$$

なので

$$
\boxed{
(x_1,x_2,x_3)=(t,2-t,t),\qquad t\in\mathbb R
}
$$

となります。

#### 本番答案

掃き出すと

$$
\left(
\begin{array}{ccc|c}
1&0&-1&0\\
0&1&1&2\\
0&0&0&0
\end{array}
\right).
$$

よって階数は2。$x_3=t$ とすれば

$$
\boxed{(x_1,x_2,x_3)=(t,2-t,t)}.
$$

#### 採点基準

拡大係数行列の設定4点、行基本変形8点、階数判定3点、一般解5点。計20点。

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
\begin{aligned}
\det(E-\lambda I)
&=(4-\lambda)(3-\lambda)-2\\
&=\lambda^2-7\lambda+10\\
&=(\lambda-5)(\lambda-2)=0.
\end{aligned}
$$

したがって固有値は $5,2$ です。

$\lambda=5$ では

$$
(E-5I)\boldsymbol v
=
\begin{pmatrix}-1&1\\2&-2\end{pmatrix}
\boldsymbol v=\boldsymbol0
$$

なので、例えば

$$
\boldsymbol v_1=egin{pmatrix}1\\1\end{pmatrix}.
$$

$\lambda=2$ では

$$
(E-2I)\boldsymbol v
=
\begin{pmatrix}2&1\\2&1\end{pmatrix}
\boldsymbol v=\boldsymbol0
$$

なので、例えば

$$
\boldsymbol v_2=egin{pmatrix}1\\-2\end{pmatrix}.
$$

よって

$$
P=
\begin{pmatrix}
1&1\\
1&-2
\end{pmatrix},
\qquad
D=
\begin{pmatrix}
5&0\\
0&2
\end{pmatrix}.
$$

$\det P=-3$ だから

$$
P^{-1}
=
\begin{pmatrix}
2/3&1/3\\
1/3&-1/3
\end{pmatrix}.
$$

したがって

$$
E^3=PD^3P^{-1}
=
\begin{pmatrix}
1&1\\1&-2
\end{pmatrix}
\begin{pmatrix}
125&0\\0&8
\end{pmatrix}
\begin{pmatrix}
2/3&1/3\\1/3&-1/3
\end{pmatrix}
=
\boxed{
\begin{pmatrix}
86&39\\
78&47
\end{pmatrix}}.
$$

#### 本番答案

特性方程式は $(\lambda-5)(\lambda-2)=0$。固有ベクトルとして

$$
\lambda=5:\ (1,1)^{\mathsf T},
\qquad
\lambda=2:\ (1,-2)^{\mathsf T}
$$

を取れる。したがって

$$
P=\begin{pmatrix}1&1\\1&-2\end{pmatrix},
\quad
D=\operatorname{diag}(5,2),
\quad
E=PDP^{-1}.
$$

よって

$$
E^3=PD^3P^{-1}
=\boxed{\begin{pmatrix}86&39\\78&47\end{pmatrix}}.
$$

#### 採点基準

固有値6点、固有ベクトル6点、対角化4点、$E^3$ の計算4点。計20点。

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

とする。$\boldsymbol x=(x,y)^{\mathsf T}$ に対して $\boldsymbol x^{\mathsf T}Q\boldsymbol x$ を展開し、平方完成とシルベスターの判定法の両方で $Q$ が正定値であることを確認せよ。

<!-- solution-start -->

### 解答

#### 詳細解答

二次形式を展開すると

$$
\boldsymbol x^{\mathsf T}Q\boldsymbol x
=3x^2-2xy+2y^2.
$$

$x$ について平方完成すると

$$
\begin{aligned}
3x^2-2xy+2y^2
&=3\left(x-\frac y3\right)^2
+2y^2-\frac{y^2}{3}\\
&=3\left(x-\frac y3\right)^2
+\frac53y^2.
\end{aligned}
$$

したがって $(x,y)\ne(0,0)$ ならこの値は正であり、$Q$ は正定値です。

一方、首座小行列式は

$$
\Delta_1=3>0,
\qquad
\Delta_2=\det Q=6-1=5>0.
$$

よってシルベスターの判定法からも正定値です。

#### 本番答案

$$
x^{\mathsf T}Qx=3x^2-2xy+2y^2
=3\left(x-\frac y3\right)^2+\frac53y^2>0
$$

for $(x,y)\ne(0,0)$。また $\Delta_1=3>0,\det Q=5>0$。従って $\boxed{Q\text{ は正定値}}$。

#### 採点基準

二次形式の展開4点、平方完成7点、平方完成からの判定3点、首座小行列式とシルベスター判定6点。計20点。

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

1. 積の微分と合成関数の微分を使うと
   $$
   \begin{aligned}
   f'(x)
   &=2xe^{-3x}+x^2(-3)e^{-3x}\\
   &=\boxed{(2x-3x^2)e^{-3x}}.
   \end{aligned}
   $$
2. $u=1+x^2$ と見れば
   $$
   g'(x)
   =\frac1{1+x^2}\cdot2x
   =\boxed{\frac{2x}{1+x^2}}.
   $$
3. べきの微分と合成関数の微分から
   $$
   h'(x)
   =\boxed{-\frac12(1+x)^{-3/2}}.
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

各小問6点、微分則の適用が明示されていること2点。計20点。

<!-- solution-end -->

## F0M-A16 勾配・ヘッセ行列・停留点

- Level: A
- 目安時間: 9分
- 主題: 多変数微分と極値

$$
g(x,y)=2x^2+xy+3y^2-4x+2y
$$

について、勾配とヘッセ行列を求め、停留点を求めよ。さらに、その停留点が狭義最小点であることを判定せよ。

<!-- solution-start -->

### 解答

#### 詳細解答

偏微分すると

$$
\frac{\partial g}{\partial x}=4x+y-4,
\qquad
\frac{\partial g}{\partial y}=x+6y+2.
$$

したがって

$$
\operatorname{grad}g(x,y)
=
\boxed{
\begin{pmatrix}
4x+y-4\\
x+6y+2
\end{pmatrix}}
$$

です。さらに

$$
H_g
=
\boxed{
\begin{pmatrix}
4&1\\
1&6
\end{pmatrix}}.
$$

停留点では

$$
4x+y=4,
\qquad
x+6y=-2.
$$

第1式から $y=4-4x$ として第2式へ代入すると

$$
x+6(4-4x)=-2
$$

より

$$
-23x=-26,
\qquad
x=\frac{26}{23}.
$$

したがって

$$
y=4-4\cdot\frac{26}{23}
=-\frac{12}{23}.
$$

ヘッセ行列は

$$
4>0,
\qquad
\det H_g=24-1=23>0
$$

なので正定値です。従って停留点

$$
\boxed{
\left(\frac{26}{23},-\frac{12}{23}\right)
}
$$

は狭義最小点です。

#### 本番答案

$$
\nabla g=(4x+y-4,\ x+6y+2)^{\mathsf T},
\qquad
H_g=\begin{pmatrix}4&1\\1&6\end{pmatrix}.
$$

$\nabla g=0$ を解くと

$$
\boxed{(x,y)=\left(26/23,-12/23\right)}.
$$

$4>0$、$\det H_g=23>0$ より $H_g$ は正定値なので、この点は狭義最小点。

#### 採点基準

勾配5点、ヘッセ行列4点、連立方程式の解法6点、正定値性による極値判定5点。計20点。

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

1. $u=1+x^2$ と置くと $du=2x\,dx$、$x=0,1$ に対応して $u=1,2$ なので
   $$
   \begin{aligned}
   \int_0^1 x(1+x^2)^2dx
   &=\frac12\int_1^2u^2du\\
   &=\frac12\left[\frac{u^3}{3}\right]_1^2\\
   &=\boxed{\frac76}.
   \end{aligned}
   $$
2. まず $R<\infty$ で部分積分します。
   $$
   \begin{aligned}
   \int_0^R xe^{-2x}dx
   &=\left[-\frac x2e^{-2x}\right]_0^R
   +\frac12\int_0^Re^{-2x}dx.
   \end{aligned}
   $$
   $R\to\infty$ とすると $Re^{-2R}\to0$ なので
   $$
   \int_0^\infty xe^{-2x}dx
   =\frac12\cdot\frac12
   =\boxed{\frac14}.
   $$
3. ガンマ型積分の公式で $m=3,\beta=2$ とすると
   $$
   \int_0^\infty x^3e^{-2x}dx
   =\frac{3!}{2^4}
   =\boxed{\frac38}.
   $$

#### 本番答案

$$
\int_0^1x(1+x^2)^2dx
=\frac12\int_1^2u^2du
=\boxed{\frac76},
$$

$$
\int_0^\infty xe^{-2x}dx
=\boxed{\frac14},
\qquad
\int_0^\infty x^3e^{-2x}dx
=\frac{3!}{2^4}
=\boxed{\frac38}.
$$

#### 採点基準

置換積分7点、部分積分7点、ガンマ型積分6点。計20点。

<!-- solution-end -->

## F0M-B08 正規方程式を数値で解く

- Level: B
- 目安時間: 12分
- 主題: 最小二乗法と射影

説明変数を1つ持つ切片付き線形モデルを考え、計画行列と観測ベクトルを

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

とする。残差平方和

$$
S(\boldsymbol\beta)
=\|\boldsymbol y-X\boldsymbol\beta\|^2
$$

を最小化する $\widehat{\boldsymbol\beta}$ を求めよ。また残差 $\boldsymbol r=\boldsymbol y-X\widehat{\boldsymbol\beta}$ を求め、$X^{\mathsf T}\boldsymbol r=\boldsymbol0$ を確認せよ。

<!-- solution-start -->

### 解答

#### 詳細解答

残差平方和を微分すると

$$
\operatorname{grad}_{\boldsymbol\beta}S
=-2X^{\mathsf T}(\boldsymbol y-X\boldsymbol\beta).
$$

これを0と置いて

$$
X^{\mathsf T}X\widehat{\boldsymbol\beta}
=X^{\mathsf T}\boldsymbol y
$$

という正規方程式を得ます。

数値を計算すると

$$
X^{\mathsf T}X
=
\begin{pmatrix}
3&3\\
3&5
\end{pmatrix},
\qquad
X^{\mathsf T}\boldsymbol y
=
\begin{pmatrix}5\\6\end{pmatrix}.
$$

$\det(X^{\mathsf T}X)=15-9=6$ なので

$$
(X^{\mathsf T}X)^{-1}
=\frac16
\begin{pmatrix}
5&-3\\
-3&3
\end{pmatrix}.
$$

したがって

$$
\begin{aligned}
\widehat{\boldsymbol\beta}
&=(X^{\mathsf T}X)^{-1}X^{\mathsf T}\boldsymbol y\\
&=\frac16
\begin{pmatrix}
5&-3\\
-3&3
\end{pmatrix}
\begin{pmatrix}5\\6\end{pmatrix}\\
&=
\boxed{
\begin{pmatrix}
7/6\\1/2
\end{pmatrix}}.
\end{aligned}
$$

当てはめ値は

$$
X\widehat{\boldsymbol\beta}
=
\begin{pmatrix}
7/6\\5/3\\13/6
\end{pmatrix}
$$

なので、残差は

$$
\boldsymbol r
=
\begin{pmatrix}
1\\2\\2
\end{pmatrix}
-
\begin{pmatrix}
7/6\\5/3\\13/6
\end{pmatrix}
=
\boxed{
\begin{pmatrix}
-1/6\\1/3\\-1/6
\end{pmatrix}}.
$$

最後に

$$
X^{\mathsf T}\boldsymbol r
=
\begin{pmatrix}
1&1&1\\
0&1&2
\end{pmatrix}
\begin{pmatrix}
-1/6\\1/3\\-1/6
\end{pmatrix}
=
\begin{pmatrix}0\\0\end{pmatrix}.
$$

したがって残差は $X$ の各列に直交します。

#### 本番答案

$\nabla S=-2X^{\mathsf T}(y-X\beta)=0$ より

$$
X^{\mathsf T}X\widehat\beta=X^{\mathsf T}y.
$$

$$
X^{\mathsf T}X=\begin{pmatrix}3&3\\3&5\end{pmatrix},
\quad
X^{\mathsf T}y=\begin{pmatrix}5\\6\end{pmatrix}
$$

なので

$$
\boxed{\widehat\beta=(7/6,1/2)^{\mathsf T}}.
$$

残差は

$$
\boxed{r=(-1/6,1/3,-1/6)^{\mathsf T}},
$$

かつ $X^{\mathsf T}r=0$。

#### 採点基準

正規方程式の導出5点、$X^{\mathsf T}X$ と $X^{\mathsf T}y$ の計算5点、推定量5点、残差と直交性5点。計20点。

<!-- solution-end -->

## F0M-B09 Cholesky（コレスキー）分解を手計算する

- Level: B
- 目安時間: 12分
- 主題: 正定値行列とCholesky分解

実対称行列

$$
A=
\begin{pmatrix}
4&2&0\\
2&5&2\\
0&2&2
\end{pmatrix}
$$

を

$$
A=LL^{\mathsf T},
\qquad
L=
\begin{pmatrix}
\ell_{11}&0&0\\
\ell_{21}&\ell_{22}&0\\
\ell_{31}&\ell_{32}&\ell_{33}
\end{pmatrix}
$$

と分解せよ。ただし $L$ の対角成分は正とする。

<!-- solution-start -->

### 解答

#### 詳細解答

積を計算すると

$$
LL^{\mathsf T}
=
\begin{pmatrix}
\ell_{11}^2
&\ell_{11}\ell_{21}
&\ell_{11}\ell_{31}\\
\ell_{11}\ell_{21}
&\ell_{21}^2+\ell_{22}^2
&\ell_{21}\ell_{31}+\ell_{22}\ell_{32}\\
\ell_{11}\ell_{31}
&\ell_{21}\ell_{31}+\ell_{22}\ell_{32}
&\ell_{31}^2+\ell_{32}^2+\ell_{33}^2
\end{pmatrix}.
$$

左上から $A$ の成分と一致させます。

$$
\ell_{11}^2=4
$$

で対角成分を正とするので $\ell_{11}=2$。次に

$$
2\ell_{21}=2,
\qquad
2\ell_{31}=0
$$

より

$$
\ell_{21}=1,
\qquad
\ell_{31}=0.
$$

さらに

$$
1^2+\ell_{22}^2=5
$$

から $\ell_{22}=2$、

$$
1\cdot0+2\ell_{32}=2
$$

から $\ell_{32}=1$ です。最後に

$$
0^2+1^2+\ell_{33}^2=2
$$

より $\ell_{33}=1$。

したがって

$$
\boxed{
L=
\begin{pmatrix}
2&0&0\\
1&2&0\\
0&1&1
\end{pmatrix}}
$$

です。

#### 本番答案

$A=LL^{\mathsf T}$ の成分を左上から比較すると

$$
\ell_{11}=2,
\quad
\ell_{21}=1,
\quad
\ell_{31}=0,
\quad
\ell_{22}=2,
\quad
\ell_{32}=1,
\quad
\ell_{33}=1.
$$

よって

$$
\boxed{
L=\begin{pmatrix}2&0&0\\1&2&0\\0&1&1\end{pmatrix}}
$$

である。

#### 採点基準

$LL^{\mathsf T}$ の成分表示5点、第1列の決定5点、第2列の決定5点、最終対角成分と分解の完成5点。計20点。

<!-- solution-end -->

## F0M-B10 ラグランジュ未定乗数法を数値で解く

- Level: B
- 目安時間: 10分
- 主題: 制約付き最適化

制約

$$
x+y=3
$$

の下で

$$
f(x,y)=x^2+2y^2
$$

を最小にする $(x,y)$ と最小値を求めよ。

<!-- solution-start -->

### 解答

#### 詳細解答

制約関数を

$$
g(x,y)=x+y
$$

とすると、ラグランジュ未定乗数法より

$$
\operatorname{grad}f
=\lambda\operatorname{grad}g
$$

です。各勾配は

$$
\operatorname{grad}f
=\begin{pmatrix}2x\\4y\end{pmatrix},
\qquad
\operatorname{grad}g
=\begin{pmatrix}1\\1\end{pmatrix}
$$

なので

$$
2x=\lambda,
\qquad
4y=\lambda.
$$

従って $2x=4y$、すなわち $x=2y$。制約 $x+y=3$ と合わせると

$$
2y+y=3
$$

より

$$
\boxed{x=2,\qquad y=1}.
$$

このとき

$$
f(2,1)=2^2+2\cdot1^2=\boxed{6}.
$$

$f$ のヘッセ行列は $\operatorname{diag}(2,4)$ で正定値なので、制約直線上でもこの停留点が最小点です。

#### 本番答案

$\nabla f=(2x,4y)^{\mathsf T}$、$\nabla g=(1,1)^{\mathsf T}$ より

$$
2x=\lambda,
\qquad
4y=\lambda.
$$

したがって $x=2y$。$x+y=3$ と合わせて

$$
\boxed{(x,y)=(2,1)},
\qquad
\boxed{\min f=6}.
$$

#### 採点基準

ラグランジュ方程式6点、連立条件の整理5点、最小点5点、最小値4点。計20点。

<!-- solution-end -->

## F0M-B11 二重積分を線形変数変換する

- Level: B
- 目安時間: 12分
- 主題: 変数変換・逆変換・ヤコビアン

領域

$$
R=\{(x,y):0\le x+y\le2,\ -1\le x-y\le1\}
$$

上の積分

$$
\iint_R(x+y)\,dx\,dy
$$

を、

$$
u=x+y,
\qquad
v=x-y
$$

と変数変換して求めよ。

<!-- solution-start -->

### 解答

#### 詳細解答

まず逆変換を求めます。$u=x+y$、$v=x-y$ を加減すると

$$
\boxed{
x=\frac{u+v}{2},
\qquad
y=\frac{u-v}{2}
}.
$$

ヤコビアンは

$$
\begin{aligned}
\frac{\partial(x,y)}{\partial(u,v)}
&=
\det
\begin{pmatrix}
1/2&1/2\\
1/2&-1/2
\end{pmatrix}\\
&=-\frac12.
\end{aligned}
$$

したがって面積倍率は $1/2$ です。

もとの領域の不等式は、そのまま

$$
0\le u\le2,
\qquad
-1\le v\le1
$$

となるので、$uv$ 平面では長方形です。また被積分関数 $x+y$ は $u$ になります。従って

$$
\begin{aligned}
\iint_R(x+y)\,dx\,dy
&=\int_0^2\int_{-1}^{1}
 u\cdot\frac12\,dv\,du\\
&=\int_0^2u\,du\\
&=\left[\frac{u^2}{2}\right]_0^2\\
&=\boxed{2}.
\end{aligned}
$$

#### 本番答案

逆変換は

$$
x=(u+v)/2,
\qquad
y=(u-v)/2,
$$

ヤコビアン絶対値は $1/2$。領域は $0\le u\le2,-1\le v\le1$ なので

$$
\iint_R(x+y)dxdy
=\int_0^2\int_{-1}^1\frac u2\,dv\,du
=\boxed{2}.
$$

#### 採点基準

逆変換5点、ヤコビアン5点、変換後の領域4点、積分の立式と計算6点。計20点。

<!-- solution-end -->
