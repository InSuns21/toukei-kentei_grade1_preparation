# Core 34 2変量正規・条件付き分布・Markov構造

- 旧No.: 27
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

$|\rho|<1$ とし、$(X_0,X_1,X_2)$ が平均0、分散共分散行列

$$
\Sigma=
\begin{pmatrix}
1&\rho&\rho^2\\
\rho&1&\rho\\
\rho^2&\rho&1
\end{pmatrix}
$$

の3変量正規分布に従う。

1. $X_2\mid X_1=x$ の分布を求めよ。
2. $\operatorname{Cov}(X_0,X_2\mid X_1)$ を求めよ。
3. $X_0\perp X_2\mid X_1$ を示せ。
4. この共分散構造がGaussian Markov連鎖 $X_0\to X_1\to X_2$ に対応することを説明せよ。

## 詳細解答

### 1. $X_2\mid X_1=x$ の分布

$X_2$ から $X_1$ の線形成分を引いた残差

$$
R_2=X_2-aX_1
$$

を考える。$X_1$ と無相関にするには

$$
\begin{aligned}
\operatorname{Cov}(R_2,X_1)
&=\operatorname{Cov}(X_2,X_1)-a\operatorname{Var}(X_1)\\
&=\rho-a
\end{aligned}
$$

を0にすればよいので

$$
a=\rho.
$$

従って

$$
R_2=X_2-\rho X_1.
$$

$(R_2,X_1)$ は正規ベクトルの線形変換で同時正規、かつ無相関なので独立である。

残差分散は

$$
\begin{aligned}
\operatorname{Var}(R_2)
&=\operatorname{Var}(X_2-\rho X_1)\\
&=1+\rho^2-2\rho^2\\
&=1-\rho^2.
\end{aligned}
$$

したがって

$$
R_2\sim N(0,1-\rho^2),
\qquad R_2\perp X_1.
$$

$$
X_2=\rho X_1+R_2
$$

だから $X_1=x$ と条件付けると

$$
\boxed{
X_2\mid X_1=x
\sim N(\rho x,1-\rho^2)
}.
$$

### 2. 条件付き共分散

同様に $X_0$ から $X_1$ の線形成分を除いた残差を

$$
R_0=X_0-\rho X_1
$$

とする。$(R_0,R_2)$ は $X_1$ と独立である。

$X_1=x$ を固定した後の変動は

$$
X_0=\rho x+R_0,
\qquad
X_2=\rho x+R_2
$$

の残差部分だけなので

$$
\operatorname{Cov}(X_0,X_2\mid X_1)
=\operatorname{Cov}(R_0,R_2).
$$

これを展開すると

$$
\begin{aligned}
\operatorname{Cov}(R_0,R_2)
&=\operatorname{Cov}(X_0-\rho X_1,X_2-\rho X_1)\\
&=\operatorname{Cov}(X_0,X_2)
-\rho\operatorname{Cov}(X_0,X_1)\\
&\quad-\rho\operatorname{Cov}(X_1,X_2)
+\rho^2\operatorname{Var}(X_1)\\
&=\rho^2-\rho^2-\rho^2+\rho^2\\
&=0.
\end{aligned}
$$

従って

$$
\boxed{
\operatorname{Cov}(X_0,X_2\mid X_1)=0
}.
$$

### 3. 条件付き独立

$X_1=x$ の下で $(X_0,X_2)$ は2変量正規分布である。第2問でその条件付き共分散が0だから、正規分布の性質より

$$
\boxed{X_0\perp X_2\mid X_1}.
$$

周辺では

$$
\operatorname{Cov}(X_0,X_2)=\rho^2
$$

で一般に0ではないが、中間変数 $X_1$ を固定すると依存が消える。

### 4. Markov構造の意味

Markov連鎖

$$
X_0\to X_1\to X_2
$$

の条件付き独立による表現は

$$
X_2\perp X_0\mid X_1
$$

である。

第3問でこれを示したので、本共分散構造はGaussian Markov連鎖に対応する。

条件付き独立は条件付き密度の因数分解

$$
f(x_0,x_2\mid x_1)
=f(x_0\mid x_1)f(x_2\mid x_1)
$$

を意味する。従って同時密度は

$$
\begin{aligned}
f(x_0,x_1,x_2)
&=f(x_1)f(x_0,x_2\mid x_1)\\
&=f(x_1)f(x_0\mid x_1)f(x_2\mid x_1).
\end{aligned}
$$

同値に

$$
f(x_0,x_1,x_2)
=f(x_0)f(x_1\mid x_0)f(x_2\mid x_1).
$$

つまり $X_1$ を知った後では、$X_2$ の条件付き分布にさらに $X_0$ を追加しても変わらない。これが「現在 $X_1$ が過去 $X_0$ と未来 $X_2$ を遮断する」というMarkov性である。

## 本番答案

$$
R_2=X_2-\rho X_1
$$

と置くと

$$
\operatorname{Cov}(R_2,X_1)=\rho-\rho=0.
$$

同時正規性より $R_2\perp X_1$ で

$$
\operatorname{Var}(R_2)=1-\rho^2.
$$

従って

$$
X_2\mid X_1=x\sim N(\rho x,1-\rho^2).
$$

また

$$
R_0=X_0-\rho X_1
$$

と置けば

$$
\operatorname{Cov}(R_0,R_2)
=\rho^2-\rho^2-\rho^2+\rho^2=0.
$$

よって

$$
\operatorname{Cov}(X_0,X_2\mid X_1)=0.
$$

条件付き分布は2変量正規なので

$$
X_0\perp X_2\mid X_1.
$$

これは $X_0\to X_1\to X_2$ のMarkov条件そのものである。

## 採点基準

- 残差化から条件付き正規分布を導出: 6点
- 条件付き共分散を残差共分散として展開: 6点
- 同時正規性を根拠とする条件付き独立: 4点
- Markov条件と密度因数分解の説明: 4点
