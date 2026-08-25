# Standard 73 ロジスティック回帰・オッズ比・デルタ法

- 安定ID: `RIKOU-STANDARD-73`
- 80大問 No.: 73
- 演習価値: A
- 難度: A
- 目安時間: 25〜30分
- 電卓: $e^x$ の数値化不要

## 問題

独立な2値応答 $Y_i\in\{0,1\}$ について

$$
P(Y_i=1\mid x_i)=p_i,
\qquad
P(Y_i=0\mid x_i)=1-p_i,
$$

$$
\log\frac{p_i}{1-p_i}=\beta_0+\beta_1x_i
$$

とする。

1. $\eta_i=\beta_0+\beta_1x_i$ と置き、$p_i$ を $\eta_i$ で表せ。
2. $x$ が1増えたときのオッズ比を求めよ。
3. 2値応答の確率質量関数から尤度、対数尤度、$\beta_0,\beta_1$ に関するスコア方程式を導け。
4. $\widehat\beta_1$ の漸近分散を $v$ とすると、オッズ比推定量 $e^{\widehat\beta_1}$ の漸近分散をデルタ法で求めよ。
5. 確率差とオッズ比の違いを説明せよ。

## 詳細解答

### 1. ロジットから成功確率を解く

$$
\log\frac{p_i}{1-p_i}=\eta_i
$$

の両辺を指数化すると

$$
\frac{p_i}{1-p_i}=e^{\eta_i}.
$$

したがって

$$
p_i=e^{\eta_i}(1-p_i)
=e^{\eta_i}-e^{\eta_i}p_i.
$$

$p_i$ を左辺に集めると

$$
p_i(1+e^{\eta_i})=e^{\eta_i},
$$

よって

$$
\boxed{
p_i=\frac{e^{\eta_i}}{1+e^{\eta_i}}
=\frac{1}{1+e^{-\eta_i}}
}.
$$

### 2. オッズ比

$x$ におけるオッズは

$$
\frac{p(x)}{1-p(x)}
=\exp(\beta_0+\beta_1x).
$$

$x$ を1増やしたときのオッズとの比は

$$
\begin{aligned}
\frac{\exp\{\beta_0+\beta_1(x+1)\}}
{\exp(\beta_0+\beta_1x)}
&=\exp(\beta_1).
\end{aligned}
$$

したがって

$$
\boxed{\text{オッズ比}=e^{\beta_1}}.
$$

### 3. 確率質量関数から尤度とスコアを導く

$Y_i$ は0または1なので、その条件付き確率質量関数は1つの式で

$$
P(Y_i=y_i\mid x_i)
=p_i^{y_i}(1-p_i)^{1-y_i},
\qquad y_i\in\{0,1\}
$$

と書ける。観測値 $y_1,\ldots,y_n$ を固定し、これを未知母数 $\beta_0,\beta_1$ の関数として見ると、独立性から尤度は

$$
L(\beta_0,\beta_1)
=\prod_{i=1}^n
p_i^{y_i}(1-p_i)^{1-y_i}.
$$

対数を取ると

$$
\ell(\beta_0,\beta_1)
=\sum_{i=1}^n
\{y_i\log p_i+(1-y_i)\log(1-p_i)\}.
$$

ここで

$$
p_i=\frac{e^{\eta_i}}{1+e^{\eta_i}},
\qquad
1-p_i=\frac{1}{1+e^{\eta_i}}
$$

なので

$$
\log p_i
=\eta_i-\log(1+e^{\eta_i}),
$$

$$
\log(1-p_i)
=-\log(1+e^{\eta_i}).
$$

したがって各項は

$$
\begin{aligned}
y_i\log p_i+(1-y_i)\log(1-p_i)
&=y_i\eta_i-y_i\log(1+e^{\eta_i})\\
&\quad-(1-y_i)\log(1+e^{\eta_i})\\
&=y_i\eta_i-\log(1+e^{\eta_i}).
\end{aligned}
$$

よって対数尤度は

$$
\boxed{
\ell(\beta_0,\beta_1)
=\sum_{i=1}^n
\{y_i\eta_i-\log(1+e^{\eta_i})\}
}.
$$

次に微分する。まず

$$
\frac{d}{d\eta_i}\log(1+e^{\eta_i})
=\frac{e^{\eta_i}}{1+e^{\eta_i}}
=p_i.
$$

また

$$
\frac{\partial\eta_i}{\partial\beta_0}=1,
\qquad
\frac{\partial\eta_i}{\partial\beta_1}=x_i.
$$

したがって連鎖律から

$$
\begin{aligned}
\frac{\partial\ell}{\partial\beta_0}
&=\sum_{i=1}^n(y_i-p_i),\\
\frac{\partial\ell}{\partial\beta_1}
&=\sum_{i=1}^nx_i(y_i-p_i).
\end{aligned}
$$

最尤推定量はこれらを0とする連立方程式、すなわち

$$
\boxed{
\sum_{i=1}^n(y_i-p_i)=0,
\qquad
\sum_{i=1}^nx_i(y_i-p_i)=0
}
$$

を満たす。設計行列の第 $i$ 行を $(1,x_i)$ とすれば、まとめて

$$
\boxed{X^\top(y-p)=0}
$$

と書ける。一般にはこの方程式を $\beta_0,\beta_1$ について初等的な閉形式では解けないため、数値反復を使う。

### 4. オッズ比推定量へのデルタ法

$g(b)=e^b$ と置くと

$$
g'(b)=e^b.
$$

$\widehat\beta_1$ の漸近分散が $v$ なら、デルタ法により

$$
\operatorname{Avar}\{g(\widehat\beta_1)\}
\approx
\{g'(\beta_1)\}^2v.
$$

したがって

$$
\boxed{
\operatorname{Avar}(e^{\widehat\beta_1})
\approx e^{2\beta_1}v
}.
$$

実際に標準誤差を推定するときは未知の $\beta_1$ を $\widehat\beta_1$ で置き換え、$e^{2\widehat\beta_1}v$ を用いる。

### 5. 確率差との違い

オッズ比 $e^{\beta_1}$ は、説明変数が1増えたときに**オッズが何倍になるか**を表す。一方、成功確率の差

$$
p(x+1)-p(x)
$$

は $x$、$\beta_0$、$\beta_1$ に依存する。したがって同じオッズ比でも、もとの成功確率が異なれば確率の増減幅は異なる。

## 本番答案

$\eta_i=\beta_0+\beta_1x_i$ とすると

$$
p_i=\frac{e^{\eta_i}}{1+e^{\eta_i}}.
$$

オッズは $e^{\eta_i}$ なので、$x$ が1増えたときのオッズ比は $e^{\beta_1}$。

独立性から

$$
L=\prod_i p_i^{y_i}(1-p_i)^{1-y_i},
$$

よって

$$
\ell
=\sum_i\{y_i\eta_i-\log(1+e^{\eta_i})\}.
$$

$\partial\log(1+e^{\eta_i})/\partial\eta_i=p_i$ だから

$$
\frac{\partial\ell}{\partial\beta_0}=\sum_i(y_i-p_i),
\qquad
\frac{\partial\ell}{\partial\beta_1}=\sum_ix_i(y_i-p_i),
$$

すなわちスコア方程式は $X^\top(y-p)=0$。

$g(b)=e^b$, $g'(b)=e^b$ なのでデルタ法から

$$
\operatorname{Avar}(e^{\widehat\beta_1})
\approx e^{2\beta_1}v.
$$

オッズ比はオッズの乗法効果、確率差はベース確率にも依存する加法的な確率変化である。

## 採点基準

- 逆リンクの導出: 4点
- オッズ比の導出: 4点
- 確率質量関数から尤度・対数尤度・スコア方程式: 6点
- デルタ法: 4点
- 確率差との解釈比較: 2点

25分経過時は指数の数値化をせず記号式で完答する。
