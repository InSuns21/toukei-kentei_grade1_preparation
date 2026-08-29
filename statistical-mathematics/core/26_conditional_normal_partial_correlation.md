# Core 08 条件付き正規・偏相関・条件付き独立

- 旧No.: 26
- 演習価値: S
- 難度: S
- 目安時間: 30分
- 手計算監査: ◎

## 問題

$(X,Y,Z)^T$ は平均0、分散共分散行列

$$
\Sigma=
\begin{pmatrix}
1&1/2&1/2\\
1/2&1&1/4\\
1/2&1/4&1
\end{pmatrix}
$$

の3変量正規分布に従う。

1. $(Y,Z)\mid X=x$ の平均ベクトルを求めよ。
2. 条件付き分散共分散行列を求めよ。
3. $Y$ と $Z$ は $X$ を条件として独立か。
4. 偏相関係数 $\rho_{YZ\cdot X}$ を求めよ。

## 詳細解答

条件付き正規分布の公式を丸ごと置く代わりに、$X$ で説明できる線形成分を $Y,Z$ から引く残差化を使って導く。

### 1. 条件付き平均

$Y$ から $aX$ を引いた

$$
R_Y=Y-aX
$$

を考える。$R_Y$ を $X$ と無相関にするには

$$
\begin{aligned}
\operatorname{Cov}(R_Y,X)
&=\operatorname{Cov}(Y,X)-a\operatorname{Var}(X)\\
&=\frac12-a
\end{aligned}
$$

を0にすればよい。従って $a=1/2$ で

$$
R_Y=Y-\frac12X.
$$

同様に

$$
R_Z=Z-\frac12X
$$

とすれば

$$
\operatorname{Cov}(R_Z,X)=0.
$$

$(X,R_Y,R_Z)$ は元の正規ベクトルの線形変換なので同時正規である。正規ベクトルでは無相関な成分は独立だから

$$
X\perp(R_Y,R_Z).
$$

従って

$$
Y=\frac12X+R_Y,
\qquad
Z=\frac12X+R_Z
$$

に $X=x$ を条件付けると、残差の平均は0のままなので

$$
E[Y\mid X=x]=\frac x2,
$$

$$
E[Z\mid X=x]=\frac x2.
$$

よって

$$
\boxed{
E\left[
\begin{pmatrix}Y\\Z\end{pmatrix}
\middle|X=x
\right]
=
\begin{pmatrix}x/2\\x/2\end{pmatrix}
}.
$$

### 2. 条件付き分散共分散行列

$X=x$ を固定すると確率的に変動するのは $R_Y,R_Z$ だけなので、条件付き共分散は残差の共分散に等しい。

まず

$$
\begin{aligned}
\operatorname{Var}(R_Y)
&=\operatorname{Var}\left(Y-\frac12X\right)\\
&=1+\frac14-2\cdot\frac12\cdot\frac12\\
&=\frac34.
\end{aligned}
$$

同様に

$$
\operatorname{Var}(R_Z)=\frac34.
$$

残差間共分散は

$$
\begin{aligned}
\operatorname{Cov}(R_Y,R_Z)
&=\operatorname{Cov}\left(Y-\frac12X,Z-\frac12X\right)\\
&=\operatorname{Cov}(Y,Z)
-\frac12\operatorname{Cov}(Y,X)\\
&\quad-\frac12\operatorname{Cov}(X,Z)
+\frac14\operatorname{Var}(X)\\
&=\frac14-\frac14-\frac14+\frac14\\
&=0.
\end{aligned}
$$

従って

$$
\boxed{
\operatorname{Cov}
\left(
\begin{pmatrix}Y\\Z\end{pmatrix}
\middle|X
\right)
=
\begin{pmatrix}
3/4&0\\
0&3/4
\end{pmatrix}
}.
$$

同じ結果を、条件付き正規分布のブロック行列公式でも確認する。$W=(Y,Z)^T$ と置けば

$$
\Sigma_{W\mid X}
=\Sigma_{WW}
-\Sigma_{WX}\Sigma_{XX}^{-1}\Sigma_{XW}.
$$

ここで

$$
\Sigma_{WW}
=\begin{pmatrix}1&1/4\\1/4&1\end{pmatrix},
\qquad
\Sigma_{WX}
=\begin{pmatrix}1/2\\1/2\end{pmatrix},
\qquad
\Sigma_{XX}=1.
$$

したがって数値を省略せず代入すると

$$
\begin{aligned}
\Sigma_{W\mid X}
&=
\begin{pmatrix}1&1/4\\1/4&1\end{pmatrix}
-
\begin{pmatrix}1/2\\1/2\end{pmatrix}
(1)^{-1}
\begin{pmatrix}1/2&1/2\end{pmatrix}\\
&=
\begin{pmatrix}1&1/4\\1/4&1\end{pmatrix}
-
\begin{pmatrix}1/4&1/4\\1/4&1/4\end{pmatrix}\\
&=
\begin{pmatrix}3/4&0\\0&3/4\end{pmatrix}.
\end{aligned}
$$

残差化による導出とSchur補による計算が一致している。Schur補の定義は通常教材 F0-01「統計のための微積分・線形代数・答案記法」を共通正本とする。

### 3. 条件付き独立

$X=x$ の下でも $(Y,Z)$ は2変量正規分布である。第2問で条件付き共分散が0と分かったので

$$
\boxed{Y\perp Z\mid X}.
$$

ここで重要なのは「共分散0だから一般に独立」ではないこと。**条件付き分布が同時正規**だからこそ、条件付き無相関から条件付き独立が従う。

### 4. 偏相関係数

偏相関係数 $\rho_{YZ\cdot X}$ は、$Y,Z$ からそれぞれ $X$ の線形効果を除いた残差

$$
R_Y=Y-\frac12X,
\qquad
R_Z=Z-\frac12X
$$

の相関係数である。

従って

$$
\begin{aligned}
\rho_{YZ\cdot X}
&=\frac{\operatorname{Cov}(R_Y,R_Z)}
{\sqrt{\operatorname{Var}(R_Y)\operatorname{Var}(R_Z)}}\\
&=\frac0{\sqrt{(3/4)(3/4)}}\\
&=\boxed{0}.
\end{aligned}
$$

元の周辺共分散は $\operatorname{Cov}(Y,Z)=1/4$ で正だが、その全てが共通変数 $X$ を介した線形関係で説明され、$X$ を固定すると残差相関が消える例である。

## 本番答案

$$
R_Y=Y-\frac12X,
\qquad
R_Z=Z-\frac12X
$$

と置くと

$$
\operatorname{Cov}(R_Y,X)
=\operatorname{Cov}(R_Z,X)=0.
$$

元が多変量正規なので $(R_Y,R_Z)$ は $X$ と独立。従って

$$
E[(Y,Z)^T\mid X=x]=(x/2,x/2)^T.
$$

また

$$
\operatorname{Var}(R_Y)
=\operatorname{Var}(R_Z)=3/4,
$$

$$
\operatorname{Cov}(R_Y,R_Z)
=1/4-1/4-1/4+1/4=0.
$$

よって条件付き分散共分散行列は

$$
\begin{pmatrix}3/4&0\\0&3/4\end{pmatrix}.
$$

条件付き分布も正規なので $Y\perp Z\mid X$。偏相関は残差相関だから

$$
\rho_{YZ\cdot X}=0.
$$

## 採点基準

- $X$ に対する残差化係数と条件付き平均: 5点
- 残差分散・残差共分散から条件付き共分散を導出: 7点
- 同時正規性を根拠に条件付き独立を結論: 4点
- 偏相関を残差相関として計算・解釈: 4点
