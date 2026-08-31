# Standard 73 ロジスティック回帰・プロビット・2値応答モデル

- 安定ID: `RIKOU-STANDARD-73`
- 80大問 No.: 73
- 演習価値: A
- 難度: A
- 目安時間: 25〜30分
- 電卓: $e^x$ と標準正規分布関数の数値化は不要

## 問題

独立な2値応答 $Y_i\in\{0,1\}$ を考える。説明変数を $x_i$ とし

$$
P(Y_i=1\mid x_i)=p_i,
\qquad
\eta_i=\beta_0+\beta_1x_i
$$

と置く。

まずロジスティック回帰

$$
\log\frac{p_i}{1-p_i}=\eta_i
$$

を考える。

1. $p_i$ を $\eta_i$ で表し、$x$ が1増えたときのオッズ比を求めよ。
2. 2値応答の確率質量関数から尤度、対数尤度、$\beta_0,\beta_1$ に関するスコア方程式を導け。
3. $\widehat\beta_1$ の漸近分散を $v$ とすると、オッズ比推定量 $e^{\widehat\beta_1}$ の漸近分散を Delta 法で求めよ。
4. 次にプロビットモデルを、潜在変数

$$
Z_i=\eta_i+\varepsilon_i,
\qquad
\varepsilon_i\sim N(0,1),
$$

$$
Y_i=\begin{cases}
1,&Z_i>0,\\
0,&Z_i\le0
\end{cases}
$$

で定義する。標準正規累積分布関数を $\Phi$、その密度を $\varphi$ とする。$p_i=P(Y_i=1\mid x_i)$ を求め、連続な $x$ に対する限界効果 $dp_i/dx_i$ を導け。
5. ロジスティック回帰とプロビット回帰について、共通点と係数解釈の違いを説明せよ。また、ロジスティック回帰でオッズ比が一定でも確率差 $p(x+1)-p(x)$ が一定ではない理由を述べよ。

## 詳細解答

### 1. ロジットの逆変換とオッズ比

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
$$

より

$$
p_i(1+e^{\eta_i})=e^{\eta_i}.
$$

従って

$$
\boxed{
p_i=\frac{e^{\eta_i}}{1+e^{\eta_i}}
=\frac1{1+e^{-\eta_i}}
}.
$$

$x$ におけるオッズは

$$
\frac{p(x)}{1-p(x)}
=\exp(\beta_0+\beta_1x).
$$

$x$ を1増やすと

$$
\frac{\exp\{\beta_0+\beta_1(x+1)\}}
{\exp(\beta_0+\beta_1x)}
=e^{\beta_1}.
$$

よって

$$
\boxed{\text{オッズ比}=e^{\beta_1}}.
$$

### 2. 尤度・対数尤度・スコア方程式

$Y_i$ は0または1なので、条件付き確率質量関数は

$$
P(Y_i=y_i\mid x_i)
=p_i^{y_i}(1-p_i)^{1-y_i},
\qquad y_i\in\{0,1\}.
$$

独立性から尤度は

$$
L(\beta_0,\beta_1)
=\prod_{i=1}^n
p_i^{y_i}(1-p_i)^{1-y_i}.
$$

対数尤度は

$$
\ell
=\sum_{i=1}^n
\{y_i\log p_i+(1-y_i)\log(1-p_i)\}.
$$

ロジスティック回帰では

$$
p_i=\frac{e^{\eta_i}}{1+e^{\eta_i}},
\qquad
1-p_i=\frac1{1+e^{\eta_i}}.
$$

従って

$$
\log p_i
=\eta_i-\log(1+e^{\eta_i}),
$$

$$
\log(1-p_i)
=-\log(1+e^{\eta_i}).
$$

代入すると

$$
\boxed{
\ell(\beta_0,\beta_1)
=\sum_{i=1}^n
\{y_i\eta_i-\log(1+e^{\eta_i})\}
}.
$$

ここで

$$
\frac{d}{d\eta_i}\log(1+e^{\eta_i})
=\frac{e^{\eta_i}}{1+e^{\eta_i}}
=p_i
$$

であり

$$
\frac{\partial\eta_i}{\partial\beta_0}=1,
\qquad
\frac{\partial\eta_i}{\partial\beta_1}=x_i.
$$

よって

$$
\boxed{
\frac{\partial\ell}{\partial\beta_0}
=\sum_{i=1}^n(y_i-p_i)
},
$$

$$
\boxed{
\frac{\partial\ell}{\partial\beta_1}
=\sum_{i=1}^nx_i(y_i-p_i)
}.
$$

最尤推定量はこれらを0とするスコア方程式を満たす。設計行列の第 $i$ 行を $(1,x_i)$ と書けば

$$
X^\top(y-p)=0
$$

とまとめられる。

### 3. オッズ比への Delta 法

$$
g(b)=e^b
$$

と置くと

$$
g'(b)=e^b.
$$

$\widehat\beta_1$ の漸近分散が $v$ なら Delta 法から

$$
\operatorname{Avar}\{g(\widehat\beta_1)\}
\approx
\{g'(\beta_1)\}^2v.
$$

従って

$$
\boxed{
\operatorname{Avar}(e^{\widehat\beta_1})
\approx e^{2\beta_1}v
}.
$$

実際の推定では未知の $\beta_1$ を $\widehat\beta_1$ で置き換える。

### 4. プロビットモデルの潜在変数表現

プロビットモデルでは

$$
Y_i=1
$$

となるのは

$$
Z_i=\eta_i+\varepsilon_i>0
$$

のときである。従って

$$
\begin{aligned}
p_i
&=P(Y_i=1\mid x_i)\\
&=P(\eta_i+\varepsilon_i>0)\\
&=P(\varepsilon_i>-\eta_i).
\end{aligned}
$$

標準正規分布は0について対称なので

$$
P(\varepsilon_i>-\eta_i)
=P(\varepsilon_i\le\eta_i)
=\Phi(\eta_i).
$$

したがって

$$
\boxed{
p_i=\Phi(\beta_0+\beta_1x_i)
}.
$$

連続な説明変数 $x_i$ に対する限界効果は連鎖律から

$$
\begin{aligned}
\frac{dp_i}{dx_i}
&=\Phi'(\eta_i)\frac{d\eta_i}{dx_i}\\
&=\varphi(\eta_i)\beta_1.
\end{aligned}
$$

従って

$$
\boxed{
\frac{dp_i}{dx_i}
=\beta_1\varphi(\beta_0+\beta_1x_i)
}.
$$

プロビット係数 $\beta_1$ 自体が確率の一定増分を表すわけではなく、確率への影響は現在の $x_i$、したがって $\eta_i$ に依存する。

### 5. ロジットとプロビットの比較

両者はどちらも

$$
\eta_i=\beta_0+\beta_1x_i
$$

という線形予測子を、0から1の成功確率へ単調に写す2値応答モデルである。

ロジスティック回帰では

$$
p_i=\frac1{1+e^{-\eta_i}}
$$

であり、$\beta_1$ は説明変数が1増えたときの**対数オッズの増分**、$e^{\beta_1}$ はオッズ比として直接解釈できる。

プロビット回帰では

$$
p_i=\Phi(\eta_i)
$$

であり、潜在正規変数の位置をどれだけ動かすかという尺度で係数を解釈する。確率への限界効果は

$$
\beta_1\varphi(\eta_i)
$$

なので、説明変数の位置によって変化する。

ロジスティック回帰でも同様に、$x$ が1増えたときのオッズ比

$$
e^{\beta_1}
$$

は一定だが、成功確率の差

$$
p(x+1)-p(x)
$$

は非線形な逆リンクを通るため $x$ に依存する。したがって「オッズが何倍」と「確率が何ポイント増える」は同じ意味ではない。

## 本番答案

ロジットでは

$$
p_i=\frac{e^{\eta_i}}{1+e^{\eta_i}},
$$

$x$ が1増えたときのオッズ比は $e^{\beta_1}$。

独立性から

$$
L=\prod_i p_i^{y_i}(1-p_i)^{1-y_i},
$$

$$
\ell
=\sum_i\{y_i\eta_i-\log(1+e^{\eta_i})\},
$$

したがって

$$
\frac{\partial\ell}{\partial\beta_0}=\sum_i(y_i-p_i),
\qquad
\frac{\partial\ell}{\partial\beta_1}=\sum_ix_i(y_i-p_i).
$$

$g(b)=e^b$ なので Delta 法より

$$
\operatorname{Avar}(e^{\widehat\beta_1})
\approx e^{2\beta_1}v.
$$

プロビットでは潜在変数 $Z_i=\eta_i+\varepsilon_i$、$\varepsilon_i\sim N(0,1)$ から

$$
p_i=P(Z_i>0)=\Phi(\eta_i),
$$

$$
\frac{dp_i}{dx_i}=\beta_1\varphi(\eta_i).
$$

ロジットは係数を対数オッズ・オッズ比で直接解釈でき、プロビットは潜在正規尺度上の効果として解釈する。どちらも確率への限界効果は説明変数の位置に依存する。

## 採点基準

- ロジット逆変換・オッズ比: 4点
- 尤度・対数尤度・スコア方程式: 6点
- Delta 法: 3点
- 潜在変数からプロビット確率・限界効果を導出: 5点
- 2つのリンクと確率差の解釈: 2点

25分経過時は、ロジットのスコア導出と、プロビットの $P(Z>0)=\Phi(\eta)$ を優先して残す。
