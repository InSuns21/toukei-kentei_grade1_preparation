# Standard 72 Poisson回帰・対数リンク

- 安定ID: `RIKOU-STANDARD-72`
- 80大問 No.: 72
- 演習価値: A
- 難度: A
- 目安時間: 25〜30分
- 電卓: $e^x$ の数値化不要

## 問題

独立な

$$
Y_i\sim\operatorname{Poisson}(\mu_i)
$$

に対し

$$
\log\mu_i=\beta_0+\beta_1x_i
$$

とする。

1. 対数尤度を定数項を除いて書け。
2. $\beta$ のスコア方程式を行列表現で書け。
3. $\beta_1$ の解釈を率比で述べよ。
4. exposure $t_i$ が異なるときoffsetをどう入れるか。
5. 過分散があるとPoisson標準誤差が過小になる理由を述べよ。

## 詳細解答

### 1. Poisson分布から対数尤度を作る

Poisson分布の確率質量関数は

$$
P(Y_i=y_i)
=\frac{e^{-\mu_i}\mu_i^{y_i}}{y_i!}.
$$

観測は独立なので尤度は

$$
L(\beta)
=\prod_i
\frac{e^{-\mu_i}\mu_i^{y_i}}{y_i!}.
$$

対数を取ると

$$
\ell(\beta)
=\sum_i
\{-\mu_i+y_i\log\mu_i-\log(y_i!)\}.
$$

ここで

$$
\eta_i=\beta_0+\beta_1x_i
$$

と置けば、対数リンクより

$$
\mu_i=e^{\eta_i}.
$$

したがって $\beta$ に依存しない $-\log(y_i!)$ を定数項として除けば

$$
\boxed{
\ell(\beta)
=\sum_i\{y_i\eta_i-e^{\eta_i}\}+C
}.
$$

設計ベクトルを

$$
\mathbf x_i=
\begin{pmatrix}
1\\x_i
\end{pmatrix},
\qquad
\beta=
\begin{pmatrix}
\beta_0\\\beta_1
\end{pmatrix}
$$

とすれば

$$
\eta_i=\mathbf x_i^\top\beta.
$$

### 2. スコア方程式

第1問の対数尤度を $\beta$ で微分する。

各 $i$ について

$$
\frac{\partial}{\partial\beta}
(y_i\mathbf x_i^\top\beta)
=y_i\mathbf x_i,
$$

また連鎖律より

$$
\frac{\partial}{\partial\beta}
 e^{\mathbf x_i^\top\beta}
=e^{\mathbf x_i^\top\beta}\mathbf x_i
=\mu_i\mathbf x_i.
$$

従ってスコアベクトルは

$$
\begin{aligned}
U(\beta)
&=\frac{\partial\ell(\beta)}{\partial\beta}\\
&=\sum_i(y_i-\mu_i)\mathbf x_i.
\end{aligned}
$$

設計行列を $X$、観測ベクトルを $y$、平均ベクトルを $\mu$ と書けば

$$
\boxed{
U(\beta)=X^\top(y-\mu)
}.
$$

最尤推定量は

$$
\boxed{X^\top(y-\mu)=0}
$$

を満たす。ただし $\mu_i=e^{\mathbf x_i^\top\beta}$ なので一般には非線形方程式であり、閉形式では解けない。

### 3. $\beta_1$ の率比としての解釈

説明変数を $x$ から $x+1$ へ1単位増やす。

$x$ のとき

$$
\mu(x)=e^{\beta_0+\beta_1x}.
$$

$x+1$ のとき

$$
\mu(x+1)
=e^{\beta_0+\beta_1(x+1)}.
$$

両者の比を取ると

$$
\begin{aligned}
\frac{\mu(x+1)}{\mu(x)}
&=e^{\beta_1}.
\end{aligned}
$$

したがって

$$
\boxed{e^{\beta_1}}
$$

は説明変数が1増えたときの平均発生件数の倍率、すなわち率比である。

$\beta_1$ 自体を「平均が $\beta_1$ 増える」と解釈してはいけない。対数リンクなので、元の平均尺度では加法ではなく乗法効果になる。

### 4. exposure が異なる場合の offset

観測時間や人口などの exposure を $t_i>0$ とし、単位 exposure 当たりの平均率を

$$
r_i=e^{\beta_0+\beta_1x_i}
$$

とする。

総期待件数は

$$
\mu_i=t_ir_i
$$

だから

$$
\mu_i=t_ie^{\beta_0+\beta_1x_i}.
$$

対数を取ると

$$
\boxed{
\log\mu_i
=\log t_i+\beta_0+\beta_1x_i
}.
$$

ここで $\log t_i$ はデータから既知であり、その係数は1に固定される。これを offset と呼ぶ。

### 5. 過分散と標準誤差

Poisson回帰ではモデル上

$$
E[Y_i]=\mu_i,
\qquad
\operatorname{Var}(Y_i)=\mu_i
$$

と仮定する。

スコアの分散やフィッシャー情報量はこの分散構造を前提に計算される。例えば

$$
I(\beta)
=X^\top W X,
$$

ここで

$$
W=\operatorname{diag}(\mu_1,\ldots,\mu_n).
$$

最尤推定量の標準誤差は概ね

$$
I(\widehat\beta)^{-1}
$$

から作る。

しかし実データで

$$
\operatorname{Var}(Y_i)>\mu_i
$$

という過分散があると、実際のスコアのばらつきはPoissonモデルが想定するより大きい。Poisson分散をそのまま使うと、データの変動を小さく見積もるため

$$
\boxed{\text{標準誤差を過小評価しやすい}}
$$

ことになる。その結果、検定統計量が過大になり、有意差を出しすぎる危険がある。

## 本番答案

Poisson分布より

$$
\ell(\beta)
=\sum_i\{-\mu_i+y_i\log\mu_i-\log(y_i!)\}.
$$

$\eta_i=\mathbf x_i^\top\beta$, $\mu_i=e^{\eta_i}$ より

$$
\ell(\beta)
=\sum_i\{y_i\mathbf x_i^\top\beta-e^{\mathbf x_i^\top\beta}\}+C.
$$

微分して

$$
U(\beta)
=\sum_i(y_i-\mu_i)\mathbf x_i
=X^\top(y-\mu),
$$

したがってスコア方程式は

$$
X^\top(y-\mu)=0.
$$

また

$$
\frac{\mu(x+1)}{\mu(x)}=e^{\beta_1}
$$

なので $e^{\beta_1}$ は1単位増加あたりの平均率比。

exposure $t_i$ があるときは

$$
\log\mu_i
=\log t_i+\beta_0+\beta_1x_i
$$

として $\log t_i$ を係数1固定の offset にする。

Poissonモデルは $\operatorname{Var}(Y_i)=\mu_i$ を仮定するため、実際に過分散があると標準誤差を過小評価する。

## 採点基準

- Poisson確率質量関数から対数尤度: 5点
- 連鎖律を含むスコア方程式: 5点
- $e^{\beta_1}$ の率比解釈: 4点
- exposure と offset: 3点
- 過分散と標準誤差の関係: 3点

25分経過時は $U(\beta)=X^\top(y-\mu)$ を確保する。
