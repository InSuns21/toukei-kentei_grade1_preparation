# 計算基礎体力 — 統計検定1級のための微積・線形代数

このページは、**高校数学の基本事項は使え、大学初年度の微積分・線形代数を一度履修したが、手計算の手順はかなり忘れている**読者向けの再起動ページです。

概念そのものが初見だったり、「なぜその式を使うのか」が分からなかったりする場合は、先に [F0-00 統計検定1級のための数学速習](../F0_00_統計検定1級のための数学速習/index.md) を読んでください。ここでは理論をもう一度講義するのではなく、統計問題の途中で必要になる計算を紙上で止まらず処理できる状態へ戻します。

## 0. まず診断する

次を紙で計算してください。公式を思い出すために数分考えるのは構いませんが、計算の開始方法が出てこなければ対応ドリルへ進みます。

| 診断 | できなければ |
|---|---|
| $x^2e^{-3x}$ と $\log(1+x^2)$ を微分する | F0M-A15 |
| $\int_0^1x(1+x^2)^2\,dx$ を置換積分する | F0M-A17 |
| $2\times3$ 行列と $3\times2$ 行列の積のサイズを即答する | F0M-A10 |
| $3\times3$ 行列を掃き出して逆行列を求める | F0M-A11, A12 |
| $2\times2$ 行列の固有値・固有ベクトルを求める | F0M-A13 |
| 二変数二次関数の勾配とヘッセ行列を書く | F0M-A16 |
| 二次形式の正定値性を判定する | F0M-A14 |
| 二変数の線形変換で逆変換・領域・ヤコビアンをそろえる | F0M-B11 |

全部できるなら、このページを最初から通読する必要はありません。統計の通常章へ進み、必要になった計算だけ戻って確認します。

## 1. 計算を起動する順番

公式を眺めて止まる代わりに、最初の一手を固定します。

| 計算 | 最初の一手 |
|---|---|
| 積・合成関数の微分 | 「積か」「外側と内側は何か」を先に分ける |
| 置換積分 | 内側の式を $u$ と置き、$du$ が被積分関数に現れるか見る |
| 部分積分 | 微分すると簡単になる側を $u$ にする |
| 行列積 | まずサイズを書き、内側の次元が一致するか確認する |
| 行列式 | 小さい行列は展開、大きめなら行基本変形で三角化する |
| 逆行列 | $[A\mid I]$ を作り、左側を $I$ まで掃き出す |
| 連立方程式・階数 | 拡大係数行列を書き、ピボットの本数を見る |
| 固有値 | $\det(A-\lambda I)=0$ を作る |
| 固有ベクトル | 各 $\lambda$ について $(A-\lambda I)v=0$ を解く |
| 正定値性 | 二次式を展開し、平方完成・固有値・首座小行列式のうち短い方法を選ぶ |
| 勾配・ヘッセ行列 | 成分ごとに1階偏微分、さらにもう1回偏微分する |
| ヤコビアン | 逆変換と変換後の範囲を先に出し、最後に偏微分行列の行列式を取る |

---

## 2. 大学初年度計算の再起動

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
AB=
\begin{pmatrix}
4&-3\\
1&5
\end{pmatrix},
\qquad
BA=
\begin{pmatrix}
2&5&1\\
1&1&-4\\
0&2&6
\end{pmatrix}.
$$

したがって

$$
(AB)^{\mathsf T}
=
\begin{pmatrix}4&1\\-3&5\end{pmatrix}.
$$

一方、直接掛けても

$$
B^{\mathsf T}A^{\mathsf T}
=
\begin{pmatrix}4&1\\-3&5\end{pmatrix}
$$

となります。

#### 本番答案

$$
AB=\begin{pmatrix}4&-3\\1&5\end{pmatrix},
\qquad
BA=\begin{pmatrix}2&5&1\\1&1&-4\\0&2&6\end{pmatrix},
$$

$$
(AB)^{\mathsf T}=B^{\mathsf T}A^{\mathsf T}
=\begin{pmatrix}4&1\\-3&5\end{pmatrix}.
$$

#### 採点基準

$AB$ 6点、$BA$ 8点、転置公式の数値確認6点。計20点。

<!-- solution-end -->

## F0M-A11 $3\times3$ 行列の行列式・逆行列

- Level: A
- 目安時間: 10分
- 主題: 行列式と逆行列

$$
M=
\begin{pmatrix}
1&2&0\\
2&1&1\\
0&1&2
\end{pmatrix}
$$

について、$\det M$ と $M^{-1}$ を求めよ。逆行列は掃き出し法で求めよ。

<!-- solution-start -->

### 解答

#### 詳細解答

まず

$$
R_2\leftarrow R_2-2R_1
$$

とすると

$$
\det M
=
\det
\begin{pmatrix}
1&2&0\\
0&-3&1\\
0&1&2
\end{pmatrix}.
$$

さらに $R_3\leftarrow R_3+\frac13R_2$ として三角化すれば

$$
\det M=1\cdot(-3)\cdot\frac73=\boxed{-7}.
$$

逆行列は

$$
\left(
\begin{array}{ccc|ccc}
1&2&0&1&0&0\\
2&1&1&0&1&0\\
0&1&2&0&0&1
\end{array}
\right)
$$

から始めます。$R_2\leftarrow R_2-2R_1$ の後に $R_2$ と $R_3$ を入れ替えると

$$
\left(
\begin{array}{ccc|ccc}
1&2&0&1&0&0\\
0&1&2&0&0&1\\
0&-3&1&-2&1&0
\end{array}
\right).
$$

$R_1\leftarrow R_1-2R_2$、$R_3\leftarrow R_3+3R_2$ で

$$
\left(
\begin{array}{ccc|ccc}
1&0&-4&1&0&-2\\
0&1&2&0&0&1\\
0&0&7&-2&1&3
\end{array}
\right).
$$

第3行を7で割り、第1・第2行の第3列を消すと

$$
\left(
\begin{array}{ccc|ccc}
1&0&0&-1/7&4/7&-2/7\\
0&1&0&4/7&-2/7&1/7\\
0&0&1&-2/7&1/7&3/7
\end{array}
\right).
$$

よって

$$
\boxed{
M^{-1}=
\begin{pmatrix}
-1/7&4/7&-2/7\\
4/7&-2/7&1/7\\
-2/7&1/7&3/7
\end{pmatrix}}
$$

です。

#### 本番答案

$\det M=-7$。$[M\mid I]$ を掃き出して

$$
\boxed{
M^{-1}=
\begin{pmatrix}
-1/7&4/7&-2/7\\
4/7&-2/7&1/7\\
-2/7&1/7&3/7
\end{pmatrix}}.
$$

#### 採点基準

行列式6点、掃き出し8点、逆行列6点。計20点。

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

拡大係数行列に $R_2\leftarrow R_2-2R_1$、$R_3\leftarrow R_3-R_1$ を行い、整理すると

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

非零行が2本なので階数は2です。$x_3=t$ と置けば

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

よって $\operatorname{rank}=2$、一般解は $\boxed{(t,2-t,t)}$。

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

固有値は $5,2$ です。$\lambda=5$ では $-v_1+v_2=0$、$\lambda=2$ では $2v_1+v_2=0$ なので

$$
v_1=(1,1)^{\mathsf T},
\qquad
v_2=(1,-2)^{\mathsf T}
$$

を取れます。したがって

$$
P=
\begin{pmatrix}1&1\\1&-2\end{pmatrix},
\qquad
D=\begin{pmatrix}5&0\\0&2\end{pmatrix},
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

固有値は $5,2$、対応する固有ベクトルとして $(1,1)^{\mathsf T},(1,-2)^{\mathsf T}$ を取れる。上の $P,D$ により $E=PDP^{-1}$。従って

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

とする。$x=(x,y)^{\mathsf T}$ に対して $x^{\mathsf T}Qx$ を展開し、平方完成とシルベスターの判定法の両方で正定値性を確認せよ。

<!-- solution-start -->

### 解答

#### 詳細解答

$$
x^{\mathsf T}Qx=3x^2-2xy+2y^2
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
x^{\mathsf T}Qx
=3\left(x-\frac y3\right)^2+\frac53y^2>0
$$

は $(x,y)\ne(0,0)$ で成り立つ。また $\Delta_1=3>0,\Delta_2=5>0$。従って $\boxed{Q\text{ は正定値}}$。

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
=\boxed{(2x-3x^2)e^{-3x}},
$$

$$
g'(x)=\frac{1}{1+x^2}\cdot2x
=\boxed{\frac{2x}{1+x^2}},
$$

$$
h'(x)=\boxed{-\frac12(1+x)^{-3/2}}.
$$

#### 本番答案

$$
\boxed{f'(x)=(2x-3x^2)e^{-3x}},\qquad
\boxed{g'(x)=\frac{2x}{1+x^2}},\qquad
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
\nabla g(x,y)=
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

$\nabla g=0$ を解くと

$$
\boxed{(x,y)=\left(\frac{26}{23},-\frac{12}{23}\right)}.
$$

さらに

$$
4>0,
\qquad
\det H_g=23>0
$$

なので $H_g$ は正定値です。従ってこの停留点は狭義最小点です。

#### 本番答案

$$
\nabla g=(4x+y-4,\ x+6y+2)^{\mathsf T},
\qquad
H_g=\begin{pmatrix}4&1\\1&6\end{pmatrix}.
$$

$\nabla g=0$ より $(x,y)=(26/23,-12/23)$。$4>0,\det H_g=23>0$ なので狭義最小点。

#### 採点基準

勾配5点、ヘッセ行列4点、停留点6点、極値判定5点。計20点。

<!-- solution-end -->

## F0M-A17 置換積分・部分積分・ガンマ型積分

- Level: A
- 目安時間: 9分
- 主題: 基本積分計算

次を求めよ。

1. $\displaystyle \int_0^1x(1+x^2)^2\,dx$
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
2. 有限区間 $[0,R]$ で部分積分すると
   $$
   \int_0^Rxe^{-2x}dx
   =\left[-\frac x2e^{-2x}\right]_0^R
   +\frac12\int_0^Re^{-2x}dx.
   $$
   $R\to\infty$ として $\boxed{1/4}$。
3. $t=2x$ と置くと
   $$
   \int_0^\infty x^3e^{-2x}dx
   =\frac1{16}\int_0^\infty t^3e^{-t}dt
   =\frac{\Gamma(4)}{16}
   =\boxed{\frac38}.
   $$

#### 本番答案

$$
\boxed{\frac76},\qquad
\boxed{\frac14},\qquad
\boxed{\frac38}.
$$

#### 採点基準

置換積分7点、部分積分7点、ガンマ型積分6点。計20点。

<!-- solution-end -->

---

## 3. 統計へつなぐ計算

以下は単なる大学1年計算より一段先です。関連する概念を F0-00 で確認した後、統計の式を手で動かす練習として使います。

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
y=
\begin{pmatrix}1\\2\\2\end{pmatrix}
$$

とする。$S(\beta)=\|y-X\beta\|^2$ を最小化する $\widehat\beta$ を求めよ。さらに残差 $r=y-X\widehat\beta$ を求め、$X^{\mathsf T}r=0$ を確認せよ。

<!-- solution-start -->

### 解答

#### 詳細解答

$$
\nabla_\beta S=-2X^{\mathsf T}(y-X\beta)
$$

を0と置くと

$$
X^{\mathsf T}X\widehat\beta=X^{\mathsf T}y.
$$

ここで

$$
X^{\mathsf T}X=
\begin{pmatrix}3&3\\3&5\end{pmatrix},
\qquad
X^{\mathsf T}y=\begin{pmatrix}5\\6\end{pmatrix}.
$$

従って

$$
\boxed{\widehat\beta=\begin{pmatrix}7/6\\1/2\end{pmatrix}}.
$$

残差は

$$
\boxed{r=\begin{pmatrix}-1/6\\1/3\\-1/6\end{pmatrix}},
$$

実際に $X^{\mathsf T}r=(0,0)^{\mathsf T}$ です。

#### 本番答案

$$
\boxed{\widehat\beta=(7/6,1/2)^{\mathsf T}},
\qquad
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

と置き、$LL^{\mathsf T}=A$ の成分を左上から比較します。

$$
\ell_{11}^2=4\Rightarrow\ell_{11}=2,
$$

$$
2\ell_{21}=2,\quad2\ell_{31}=0
\Rightarrow\ell_{21}=1,\ \ell_{31}=0,
$$

$$
1+\ell_{22}^2=5\Rightarrow\ell_{22}=2,
$$

$$
2\ell_{32}=2\Rightarrow\ell_{32}=1,
$$

$$
1+\ell_{33}^2=2\Rightarrow\ell_{33}=1.
$$

従って

$$
\boxed{
L=\begin{pmatrix}
2&0&0\\
1&2&0\\
0&1&1
\end{pmatrix}}.
$$

#### 本番答案

成分を左上から比較して

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

$g(x,y)=x+y$ として

$$
\nabla f=\lambda\nabla g
$$

を使うと

$$
2x=\lambda,
\qquad
4y=\lambda.
$$

よって $x=2y$。制約 $x+y=3$ と合わせて

$$
\boxed{(x,y)=(2,1)}.
$$

最小値は

$$
\boxed{f(2,1)=6}.
$$

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

加減すると

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
=-\frac12,
$$

したがって面積倍率は $1/2$ です。領域は

$$
0\le u\le2,
\qquad
-1\le v\le1
$$

という長方形になり、被積分関数 $x+y$ は $u$ です。よって

$$
\begin{aligned}
\iint_R(x+y)\,dx\,dy
&=\int_0^2\int_{-1}^1\frac u2\,dv\,du\\
&=\int_0^2u\,du\\
&=\boxed{2}.
\end{aligned}
$$

#### 本番答案

逆変換は $x=(u+v)/2,y=(u-v)/2$、ヤコビアン絶対値は $1/2$。従って

$$
\int_0^2\int_{-1}^1\frac u2\,dv\,du
=\boxed{2}.
$$

#### 採点基準

逆変換5点、ヤコビアン5点、領域4点、積分6点。計20点。

<!-- solution-end -->

---

## 4. 終了チェック

次が止まらなければ、大学初年度の計算技能は統計検定1級の学習を進めるには十分に再起動しています。

- [ ] 積・合成関数を含む基本微分を連続して処理できる。
- [ ] 置換積分と部分積分のどちらを使うか決められる。
- [ ] 行列積のサイズを先に確認できる。
- [ ] $3\times3$ 程度の行列を掃き出し、階数・連立方程式・逆行列を処理できる。
- [ ] $2\times2$ 行列なら固有値から固有ベクトルまで計算できる。
- [ ] 二次形式を展開し、正定値性を判定できる。
- [ ] 勾配・ヘッセ行列を成分から作れる。
- [ ] 変数変換で「逆変換・領域・ヤコビアン」をセットで出せる。

ここまでできたら [F0-00 数学速習](../F0_00_統計検定1級のための数学速習/index.md) または通常の確率・推測の章へ戻ります。
