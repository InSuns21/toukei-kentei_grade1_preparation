# Core 05 標準化重回帰・相関行列からの推定

- 安定ID: `RIKOU-CORE-05`
- 80大問 No.: 36
- 演習価値: S
- 難度: B
- 目安時間: 20〜25分
- 電卓: 四則演算・平方根までで完結

## 問題

$Y,X_1,X_2$ はすべて平均0、分散1に標準化されている。相関係数が

$$
r_{12}=0.5,\qquad r_{Y1}=0.7,\qquad r_{Y2}=0.6
$$

である。

1. 標準化偏回帰係数 $b_1,b_2$ を求めよ。
2. 重相関係数の二乗 $R^2$ を求めよ。
3. $X_1=1$, $X_2=-0.5$ の個体に対する標準化予測値を求めよ。
4. $X_2$ を固定したときの $Y$ と $X_1$ の偏相関係数を求めよ。
5. $X_1$ を $X_2$ で回帰したときの決定係数を用いて $X_1$ の分散拡大係数を求めよ。また、$r_{12}$ が1に近づくと偏回帰係数の推定が不安定になる理由を説明せよ。

## 詳細解答

### 1. 偏回帰係数を正規方程式から求める

標準化回帰式を

$$
\hat Y=b_1X_1+b_2X_2
$$

とする。通常最小二乗法では残差

$$
e=Y-b_1X_1-b_2X_2
$$

が各説明変数と直交するので

$$
E[X_1e]=0,\qquad E[X_2e]=0.
$$

標準化により $E[X_1^2]=E[X_2^2]=1$、また積の期待値は相関係数に等しい。したがって

$$
\begin{aligned}
0&=E[X_1Y]-b_1E[X_1^2]-b_2E[X_1X_2]\\
&=0.7-b_1-0.5b_2,\\
0&=E[X_2Y]-b_1E[X_1X_2]-b_2E[X_2^2]\\
&=0.6-0.5b_1-b_2.
\end{aligned}
$$

すなわち

$$
\begin{pmatrix}1&0.5\\0.5&1\end{pmatrix}
\begin{pmatrix}b_1\\b_2\end{pmatrix}
=
\begin{pmatrix}0.7\\0.6\end{pmatrix}.
$$

ここで

$$
R_{XX}^{-1}
=\frac1{1-0.5^2}
\begin{pmatrix}1&-0.5\\-0.5&1\end{pmatrix}
=\frac1{0.75}
\begin{pmatrix}1&-0.5\\-0.5&1\end{pmatrix}.
$$

従って

$$
\begin{aligned}
b_1&=\frac{0.7-0.5\cdot0.6}{0.75}=\boxed{\frac8{15}},\\
b_2&=\frac{0.6-0.5\cdot0.7}{0.75}=\boxed{\frac13}.
\end{aligned}
$$

つまり $b=R_{XX}^{-1}r_{XY}$ は暗記公式として先に置いたのではなく、標準化された正規方程式から得られる。

### 2. 決定係数

標準化されているので $\operatorname{Var}(Y)=1$。また通常最小二乗法では予測値と残差が直交するから

$$
\operatorname{Var}(Y)
=\operatorname{Var}(\hat Y)+\operatorname{Var}(e).
$$

よって

$$
R^2=\frac{\operatorname{Var}(\hat Y)}{\operatorname{Var}(Y)}
=\operatorname{Var}(\hat Y).
$$

$$
\begin{aligned}
\operatorname{Var}(\hat Y)
&=b_1\operatorname{Cov}(\hat Y,X_1)+b_2\operatorname{Cov}(\hat Y,X_2).
\end{aligned}
$$

正規方程式から $\operatorname{Cov}(\hat Y,X_j)=\operatorname{Cov}(Y,X_j)$ なので

$$
\begin{aligned}
R^2
&=b_1r_{Y1}+b_2r_{Y2}\\
&=0.7\frac8{15}+0.6\frac13\\
&=\boxed{\frac{43}{75}}.
\end{aligned}
$$

### 3. 予測値

切片は0なので

$$
\hat Y
=\frac8{15}\cdot1+\frac13\left(-\frac12\right)
=\frac8{15}-\frac16
=\boxed{\frac{11}{30}}.
$$

### 4. 偏相関

$X_1$ から $X_2$ の線形成分を除いた残差を

$$
X_1^*=X_1-r_{12}X_2
$$

とし、$Y$ から $X_2$ の線形成分を除いた残差を

$$
Y^*=Y-r_{Y2}X_2
$$

とする。標準化されているので

$$
\begin{aligned}
\operatorname{Cov}(Y^*,X_1^*)
&=r_{Y1}-r_{Y2}r_{12},\\
\operatorname{Var}(Y^*)&=1-r_{Y2}^2,\\
\operatorname{Var}(X_1^*)&=1-r_{12}^2.
\end{aligned}
$$

したがって残差同士の相関、すなわち偏相関は

$$
\begin{aligned}
r_{Y1\cdot2}
&=\frac{r_{Y1}-r_{Y2}r_{12}}
{\sqrt{(1-r_{Y2}^2)(1-r_{12}^2)}}\\
&=\frac{0.7-0.6\cdot0.5}{\sqrt{(1-0.6^2)(1-0.5^2)}}\\
&=\boxed{\frac{0.4}{\sqrt{0.48}}}.
\end{aligned}
$$

### 5. 分散拡大係数と多重共線性

説明変数が $X_2$ だけなら、標準化単回帰の決定係数は

$$
R_1^2=r_{12}^2=0.25.
$$

$X_1$ のうち他の説明変数で説明できない残差分散は $1-R_1^2$ だから、偏回帰係数の分散はこの残差分散の逆数に比例する。従って分散拡大係数は

$$
\boxed{
\operatorname{VIF}_1
=\frac1{1-R_1^2}
=\frac1{0.75}
=\frac43
}.
$$

$r_{12}\to1$ では $1-r_{12}^2\to0$ となり、正規方程式の係数行列 $R_{XX}$ が特異行列へ近づく。逆行列の成分が大きくなるため、相関のわずかな標本変動が $b_1,b_2$ を大きく動かし、標準誤差も増大する。

## 本番答案

残差と各説明変数の直交条件から

$$
b_1+0.5b_2=0.7,
\qquad
0.5b_1+b_2=0.6,
$$

よって

$$
b_1=8/15,\qquad b_2=1/3.
$$

正規方程式の直交性から

$$
R^2=b_1r_{Y1}+b_2r_{Y2}=43/75,
\qquad
\hat Y=11/30.
$$

また $X_2$ をそれぞれから残差化して

$$
r_{Y1\cdot2}
=\frac{r_{Y1}-r_{Y2}r_{12}}
{\sqrt{(1-r_{Y2}^2)(1-r_{12}^2)}}
=\frac{0.4}{\sqrt{0.48}}.
$$

$$
\operatorname{VIF}_1=\frac1{1-r_{12}^2}=\frac43.
$$

$r_{12}\to1$ では $\det R_{XX}=1-r_{12}^2\to0$ となり、逆行列が不安定になる。

## 採点基準

- (1) 正規方程式の導出と回帰係数: 6点
- (2) $R^2$ の導出: 3点
- (3) 予測値: 2点
- (4) 残差化から偏相関を導出: 4点
- (5) 分散拡大係数と不安定性: 5点

20分経過時でも、少なくとも正規方程式2本と $1-r_{12}^2$ が分母に現れる理由を答案に残す。
