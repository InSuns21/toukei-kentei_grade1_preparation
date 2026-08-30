# L2-01 一般化線形モデル

通常の線形回帰は、応答が連続量で誤差分散が一定という状況に適しています。しかし合否のような0/1データや、一定時間内の故障件数のような計数データでは、その仮定は自然ではありません。一般化線形モデル（GLM）は「応答の分布」「平均と説明変数を結ぶ関数」「線形予測子」の三つを分けることで、線形回帰を二項・Poissonなどへ拡張します。

本章は [通常教材の執筆スタイルガイド](../../../style-guide.md)、[共通演習規約](../../../../EXERCISE_GUIDELINES.md)、[共通記号ガイド](../../../../references/notation-guide.md)、[共通用語ガイド](../../../../references/terminology-guide.md)、[分布・記号ガイド](../../../../references/distribution-notation-guide.md) に従います。

## この章で解けるようになる問題

- GLMの三要素を区別する。
- Bernoulli応答にロジットリンクを適用してロジスティック回帰を書く。
- Poisson応答に対数リンクを適用してPoisson回帰を書く。
- 回帰係数をオッズ比・率比として解釈する。
- 対数尤度、スコア方程式を立てる。
- devianceの意味を飽和モデルとの差として説明する。

## 公式出題範囲との対応

| 範囲 | 本章の内容 |
|---|---|
| 一般化線形モデル | 分布、リンク関数、線形予測子 |
| ロジスティック回帰 | Bernoulli/二項 + logit |
| Poisson回帰 | Poisson + log |
| 最尤推定 | 対数尤度、スコア |

## 前提知識チェック

1. P3-01: Bernoulli、二項、Poisson分布。
2. I1-01: 尤度と最尤推定。本章でも必要式を再掲する。
3. L1-02: 線形予測子 $\boldsymbol x_i^{\mathsf T}\boldsymbol\beta$。

---

## 1. 導入

0/1応答を通常の直線
$$E[Y\mid x]=\beta_0+\beta_1x$$
で表すと、予測確率が0未満や1超になることがある。そこで確率 $p$ そのものではなく
$$
\log\frac{p}{1-p}
$$
を直線にする。これがロジスティック回帰である。

計数 $Y$ では平均 $\mu$ は正でなければならないので
$$\log\mu=\beta_0+\beta_1x$$
と置く。これがPoisson回帰である。

## 2. 定義と記号

GLMは次の三要素からなる。

1. **確率成分**: $Y_i$ の分布を指数型分布族から選ぶ。
2. **線形予測子**: $\eta_i=\boldsymbol x_i^{\mathsf T}\boldsymbol\beta$。
3. **リンク関数**: $g(\mu_i)=\eta_i$、ただし $\mu_i=E[Y_i\mid\boldsymbol x_i]$。

正規分布では恒等リンク $g(\mu)=\mu$、Bernoulliではロジットリンク、Poissonでは対数リンクが代表的である。

## 3. 定理・公式と導出

### 3.1 ロジスティック回帰

$Y_i\sim\operatorname{Bernoulli}(p_i)$ とし
$$
\log\frac{p_i}{1-p_i}=\eta_i=\boldsymbol x_i^{\mathsf T}\boldsymbol\beta.
$$
両辺から $p_i$ を解くと
$$
p_i=\frac{e^{\eta_i}}{1+e^{\eta_i}}.
$$
対数尤度は
$$
\ell(\boldsymbol\beta)
=\sum_i\left\{Y_i\eta_i-\log(1+e^{\eta_i})\right\}.
$$
微分すると
$$
\frac{\partial\ell}{\partial\boldsymbol\beta}
=\sum_i\boldsymbol x_i(Y_i-p_i)
=\boldsymbol X^{\mathsf T}(\boldsymbol Y-\boldsymbol p).
$$
一般には閉じた形で解けないためNewton法や反復再重み付き最小二乗法で数値的に解く。

説明変数 $x_j$ が1増えるとオッズは
$$
\frac{p/(1-p)\text{ at }x_j+1}{p/(1-p)\text{ at }x_j}=e^{\beta_j}
$$
倍になる。したがって $e^{\beta_j}$ はオッズ比である。

### 3.2 Poisson回帰

$Y_i\sim\operatorname{Poisson}(\mu_i)$、
$$
\log\mu_i=\eta_i=\boldsymbol x_i^{\mathsf T}\boldsymbol\beta
$$
とする。よって
$$\mu_i=e^{\eta_i}>0.$$
対数尤度は定数項を除いて
$$
\ell(\boldsymbol\beta)
=\sum_i\{Y_i\eta_i-e^{\eta_i}\}.
$$
スコアは
$$
\frac{\partial\ell}{\partial\boldsymbol\beta}
=\sum_i\boldsymbol x_i(Y_i-\mu_i).
$$
$x_j$ が1増えると平均発生率は $e^{\beta_j}$ 倍になる。

観測時間 $t_i$ が異なる場合は
$$
\log\mu_i=\log t_i+\boldsymbol x_i^{\mathsf T}\boldsymbol\beta
$$
とし、$\log t_i$ を係数1で固定したoffsetとして扱う。

### 3.3 指数型分布族と平均・分散

代表的なGLMでは密度または確率関数を
$$
f(y;\theta,\phi)
=\exp\left\{\frac{y\theta-b(\theta)}{a(\phi)}+c(y,\phi)\right\}
$$
と書ける。このとき
$$
E[Y]=b'(\theta),\qquad
\operatorname{Var}(Y)=a(\phi)b''(\theta).
$$
正準リンクは $g(\mu)=\theta$ となるリンクで、Bernoulliのlogit、Poissonのlogがその例である。

### 3.4 deviance

飽和モデルは各観測の平均を個別に自由に合わせるモデルである。候補モデルの最大対数尤度を $\ell(\hat\beta)$、飽和モデルを $\ell_{sat}$ とすると
$$
D=2\{\ell_{sat}-\ell(\hat\beta)\}
$$
をdevianceと呼ぶ。小さいほど飽和モデルに近い。入れ子モデル間ではdeviance差が尤度比検定統計量となる。

## 4. 典型例題

ロジスティック回帰
$$
\log\frac{p}{1-p}=-2+0.7x
$$
で $x$ が1増えるとオッズは $e^{0.7}$ 倍になる。$x=2$ では
$$
\eta=-0.6,\qquad p=\frac{e^{-0.6}}{1+e^{-0.6}}\approx0.354.
$$
「係数0.7だから確率が0.7増える」ではない。

## 5. 演習

### L2-01-A01 ロジットから確率へ

- Level: A
- 目安時間: 6分
- 主題: ロジスティック回帰
- 使用技術: 逆リンク

$\log\{p/(1-p)\}=-1+0.5x$ とする。$x=2$ のときの $p$ を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$x=2$ では $\eta=0$。したがって
$$p=\frac{e^0}{1+e^0}=\frac12.$$

##### 本番答案

$\eta=-1+0.5\times2=0$ より $p=1/2$。

##### 採点基準

- 線形予測子: 8点
- 逆リンク: 12点

<!-- solution-end -->

### L2-01-B01 Poisson回帰の率比

- Level: B
- 目安時間: 10分
- 主題: Poisson回帰
- 使用技術: 係数解釈

$\log\mu=1+0.2x$ とする。$x$ が3増えたとき平均発生率は何倍になるか。

<!-- solution-start -->

#### 解答

##### 詳細解答

対数平均の差は $0.2\times3=0.6$ なので、平均の比は
$$e^{0.6}.$$

##### 本番答案

$\mu(x+3)/\mu(x)=e^{0.6}$。

##### 採点基準

- 対数差: 8点
- 指数変換: 12点

<!-- solution-end -->

## 6. 本番ドリル

### L2-01-C01 Bernoulli GLMの尤度

独立な $Y_i\sim\operatorname{Bernoulli}(p_i)$ に対し
$$\log\frac{p_i}{1-p_i}=\beta_0+\beta_1x_i$$
とする。(1) $p_i$ を $\eta_i$ で表せ。(2) 対数尤度を導け。(3) $\beta_1$ のスコア方程式を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

(1)
$$p_i=\frac{e^{\eta_i}}{1+e^{\eta_i}}.$$
Bernoulli尤度 $p_i^{Y_i}(1-p_i)^{1-Y_i}$ に代入すると
$$
\ell=\sum_i\{Y_i\eta_i-\log(1+e^{\eta_i})\}.
$$
$\partial\eta_i/\partial\beta_1=x_i$ より
$$
\frac{\partial\ell}{\partial\beta_1}=\sum_i x_i(Y_i-p_i)=0.
$$

##### 本番答案

$p_i=e^{\eta_i}/(1+e^{\eta_i})$、$\ell=\sum[Y_i\eta_i-\log(1+e^{\eta_i})]$、スコアは $\sum x_i(Y_i-p_i)$。

##### 採点基準

- 逆リンク: 5点
- 尤度: 9点
- スコア: 6点

<!-- solution-end -->

## 7. 過去問との対応

理工学の「一般化線形モデル」を直接担当する。ロジスティック回帰とPoisson回帰は、分布を選ぶ理由、リンク関数の意味、係数解釈、尤度の構成まで一続きで問われうる。

## 8. 章末チェック

- GLMの三要素を混同せず説明できる。
- logitとlogリンクを逆変換できる。
- ロジスティック係数をオッズ比、Poisson係数を率比として読める。
- 対数尤度とスコアを分布の確率関数から導ける。
