# Advanced 12 2成分Poisson混合・期待値最大化法

- 旧No.: 61
- 層: Advanced
- 演習価値: A
- 難度: S
- 目安時間: 30分
- 手計算監査: ◎・修正済（収束までの反復計算不要）

## 問題

Poisson 分布の確率質量関数を

$$
p(x\mid\lambda)
=\frac{e^{-\lambda}\lambda^x}{x!},
\qquad x=0,1,2,\ldots,
\qquad \lambda>0
$$

とする。独立観測 $x_1,\ldots,x_n$ が2成分混合分布

$$
f(x)
=\pi p(x\mid\lambda_1)
+(1-\pi)p(x\mid\lambda_2),
\qquad0<\pi<1
$$

から得られた。潜在変数 $Z_i\in\{0,1\}$ を「観測 $i$ が成分1から生じたこと」の指標とする。

1. 完全データ $(x_i,Z_i)$ の尤度と対数尤度を書け。
2. 期待値計算ステップにおける責任度 $r_i=E[Z_i\mid x_i]$ を Bayes 則から求めよ。
3. 最大化ステップでの $\pi,\lambda_1,\lambda_2$ の更新式を、偏微分と方程式の整理を示して導け。
4. 数値反復を手で最後まで行う必要がない理由と、ラベル交換を説明せよ。

## 詳細解答

### 1. 完全データ尤度と対数尤度

$Z_i=1$ なら観測 $x_i$ は成分1から生じ、$Z_i=0$ なら成分2から生じる。したがって、完全データ $(x_i,Z_i)$ の確率を1つの式で

$$
\{\pi p(x_i\mid\lambda_1)\}^{Z_i}
\{(1-\pi)p(x_i\mid\lambda_2)\}^{1-Z_i}
$$

と書ける。

独立性から完全データ尤度は

$$
L_c(\pi,\lambda_1,\lambda_2)
=\prod_{i=1}^n
\{\pi p(x_i\mid\lambda_1)\}^{Z_i}
\{(1-\pi)p(x_i\mid\lambda_2)\}^{1-Z_i}.
$$

Poisson 分布の確率質量関数を代入すると

$$
\begin{aligned}
L_c
&=\prod_{i=1}^n
\left\{
\pi\frac{e^{-\lambda_1}\lambda_1^{x_i}}{x_i!}
\right\}^{Z_i}
\left\{
(1-\pi)\frac{e^{-\lambda_2}\lambda_2^{x_i}}{x_i!}
\right\}^{1-Z_i}.
\end{aligned}
$$

対数を取ると

$$
\begin{aligned}
\ell_c
&=\sum_{i=1}^n Z_i
\{\log\pi-\lambda_1+x_i\log\lambda_1-\log(x_i!)\}\\
&\quad+\sum_{i=1}^n(1-Z_i)
\{\log(1-\pi)-\lambda_2+x_i\log\lambda_2-\log(x_i!)\}.
\end{aligned}
$$

$Z_i+(1-Z_i)=1$ なので、$-\log(x_i!)$ の部分をまとめると

$$
-\sum_{i=1}^n\log(x_i!)
$$

となる。この項は $\pi,\lambda_1,\lambda_2$ を含まず、最大化には影響しない。したがって、この確認をした後で母数に依存しない項を省けば

$$
\boxed{
\ell_c
=\sum_{i=1}^n\left[
Z_i\{\log\pi-\lambda_1+x_i\log\lambda_1\}
+(1-Z_i)\{\log(1-\pi)-\lambda_2+x_i\log\lambda_2\}
\right]+C
}.
$$

### 2. 期待値計算ステップ：責任度

$Z_i$ は0-1変数なので

$$
E[Z_i\mid x_i]
=P(Z_i=1\mid x_i).
$$

ここで

$$
P(Z_i=1)=\pi,
\qquad
P(Z_i=0)=1-\pi,
$$

また

$$
P(x_i\mid Z_i=1)=p(x_i\mid\lambda_1),
$$

$$
P(x_i\mid Z_i=0)=p(x_i\mid\lambda_2).
$$

したがって Bayes 則より

$$
\begin{aligned}
r_i
&=P(Z_i=1\mid x_i)\\
&=\frac{P(Z_i=1)P(x_i\mid Z_i=1)}
{P(Z_i=1)P(x_i\mid Z_i=1)+P(Z_i=0)P(x_i\mid Z_i=0)}\\
&=\boxed{
\frac{\pi p(x_i\mid\lambda_1)}
{\pi p(x_i\mid\lambda_1)+(1-\pi)p(x_i\mid\lambda_2)}
}.
\end{aligned}
$$

実際の反復では、右辺の $\pi,\lambda_1,\lambda_2$ に現在の反復値を入れる。

### 3. 最大化ステップ：更新式を偏微分から導く

期待値計算ステップでは、観測された $x$ の下で完全データ対数尤度の条件付き期待値を取る。$Z_i$ を含む部分は

$$
E[Z_i\mid x_i]=r_i,
\qquad
E[1-Z_i\mid x_i]=1-r_i
$$

に置き換わるので、母数に依存する部分は

$$
Q(\pi,\lambda_1,\lambda_2)
=\sum_{i=1}^n\left[
r_i\{\log\pi-\lambda_1+x_i\log\lambda_1\}
+(1-r_i)\{\log(1-\pi)-\lambda_2+x_i\log\lambda_2\}
\right]
$$

となる。最大化ステップでは、この $Q$ を各母数について最大化する。

#### $\pi$ の更新

$\pi$ を含む項だけ抜き出すと

$$
Q_\pi
=\sum_{i=1}^n
\{r_i\log\pi+(1-r_i)\log(1-\pi)\}.
$$

偏微分すると

$$
\frac{\partial Q}{\partial\pi}
=\sum_{i=1}^n
\left\{
\frac{r_i}{\pi}
-\frac{1-r_i}{1-\pi}
\right\}.
$$

これを0と置き、分母を払う。

$$
\sum_i r_i(1-\pi)
-\sum_i(1-r_i)\pi=0.
$$

展開すると

$$
\sum_i r_i
-\pi\sum_i r_i
-\pi\sum_i(1-r_i)=0.
$$

括弧内は

$$
\sum_i r_i+\sum_i(1-r_i)=n
$$

なので

$$
\sum_i r_i-n\pi=0.
$$

したがって

$$
\boxed{
\pi^{\mathrm{new}}=\frac1n\sum_{i=1}^n r_i
}.
$$

#### $\lambda_1$ の更新

$\lambda_1$ を含む項は

$$
Q_{\lambda_1}
=\sum_i r_i(-\lambda_1+x_i\log\lambda_1).
$$

偏微分すると

$$
\frac{\partial Q}{\partial\lambda_1}
=-\sum_i r_i
+\frac1{\lambda_1}\sum_i r_ix_i.
$$

0と置いて

$$
-\sum_i r_i
+\frac1{\lambda_1}\sum_i r_ix_i=0.
$$

両辺に $\lambda_1$ を掛けると

$$
-\lambda_1\sum_i r_i+\sum_i r_ix_i=0,
$$

したがって

$$
\boxed{
\lambda_1^{\mathrm{new}}
=\frac{\sum_i r_ix_i}{\sum_i r_i}
}.
$$

#### $\lambda_2$ の更新

同様に

$$
Q_{\lambda_2}
=\sum_i(1-r_i)(-\lambda_2+x_i\log\lambda_2)
$$

だから

$$
\frac{\partial Q}{\partial\lambda_2}
=-\sum_i(1-r_i)
+\frac1{\lambda_2}\sum_i(1-r_i)x_i.
$$

0と置いて両辺に $\lambda_2$ を掛けると

$$
-\lambda_2\sum_i(1-r_i)
+\sum_i(1-r_i)x_i=0.
$$

よって

$$
\boxed{
\lambda_2^{\mathrm{new}}
=\frac{\sum_i(1-r_i)x_i}{\sum_i(1-r_i)}
}.
$$

各変数について2階微分は負である。例えば

$$
\frac{\partial^2Q}{\partial\lambda_1^2}
=-\frac{1}{\lambda_1^2}\sum_i r_ix_i\le0
$$

であり、通常の非退化な場合には上の停留点が最大点になる。

### 4. 反復とラベル交換

期待値最大化法では、期待値計算ステップで責任度を計算し、最大化ステップで母数を更新する操作を収束まで繰り返す。収束まで何十回も数値反復する作業は計算機向きであり、手計算試験で評価すべき主題は責任度と更新式を導けることにある。

また成分ラベルを入れ替えた

$$
(\pi,\lambda_1,\lambda_2)
\quad\text{と}\quad
(1-\pi,\lambda_2,\lambda_1)
$$

は同じ混合分布を表す。この非識別性をラベル交換という。必要なら

$$
\lambda_1<\lambda_2
$$

などの識別規約を置いてラベルを固定する。

## 本番答案

Poisson 分布の確率質量関数を代入すると、完全データ尤度は

$$
L_c
=\prod_i
\left\{\pi\frac{e^{-\lambda_1}\lambda_1^{x_i}}{x_i!}\right\}^{Z_i}
\left\{(1-\pi)\frac{e^{-\lambda_2}\lambda_2^{x_i}}{x_i!}\right\}^{1-Z_i}.
$$

したがって、母数に依存しない $-\sum_i\log(x_i!)$ を分離した上で

$$
\ell_c
=\sum_i[Z_i\{\log\pi-\lambda_1+x_i\log\lambda_1\}
+(1-Z_i)\{\log(1-\pi)-\lambda_2+x_i\log\lambda_2\}]+C.
$$

Bayes則より

$$
r_i
=\frac{\pi p(x_i\mid\lambda_1)}
{\pi p(x_i\mid\lambda_1)+(1-\pi)p(x_i\mid\lambda_2)}.
$$

条件付き期待値を取ると $Z_i$ は $r_i$ に置き換わる。$Q$ を各母数で偏微分して0と置けば

$$
\pi^{\mathrm{new}}=\frac1n\sum_i r_i,
$$

$$
\lambda_1^{\mathrm{new}}
=\frac{\sum_i r_ix_i}{\sum_i r_i},
\qquad
\lambda_2^{\mathrm{new}}
=\frac{\sum_i(1-r_i)x_i}{\sum_i(1-r_i)}.
$$

ラベルを交換した $(\pi,\lambda_1,\lambda_2)$ と $(1-\pi,\lambda_2,\lambda_1)$ は同じ混合分布を表す。

## 採点基準

- 確率質量関数から完全データ尤度・対数尤度を作る: 5点
- Bayes則から責任度を導く: 5点
- 最大化ステップの3つの偏微分と方程式整理: 8点
- 反復計算とラベル交換の説明: 2点
