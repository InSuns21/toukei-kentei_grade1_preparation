# L2-01 一般化線形モデル

通常の線形回帰では、応答の条件付き平均を説明変数の線形結合で表し、誤差分散が一定であるモデルを扱いました。しかし、合否のような0/1応答や、一定時間内の故障件数のような計数応答では、応答の取り得る範囲と分散の構造が正規線形モデルに合いません。一般化線形モデルでは、応答分布・線形予測子・リンク関数を分けて考え、二項データやポアソン計数データを回帰へ組み込みます。

本章は [通常教材の執筆スタイルガイド](../../../style-guide.md)、[共通演習規約](../../../../EXERCISE_GUIDELINES.md)、[共通記号ガイド](../../../../references/notation-guide.md)、[共通用語ガイド](../../../../references/terminology-guide.md)、[分布・記号ガイド](../../../../references/distribution-notation-guide.md) に従います。

## この章で解けるようになる問題

- 一般化線形モデルの三要素を区別する。
- ベルヌーイ応答のロジスティック回帰を確率関数から構成する。
- ポアソン回帰を確率関数から構成する。
- ロジスティック回帰係数をオッズ比として解釈する。
- ポアソン回帰係数を平均件数比・発生率比として解釈する。
- 観測時間が異なる計数データでオフセットを使う。
- 指数型分布族から平均・分散の式を導く。
- スコア方程式とヘッセ行列を導き、閉形式解がない理由を説明する。
- 逸脱度を飽和モデルとの差として計算する。
- 入れ子モデル間の逸脱度差を大標本の尤度比検定として使う条件を説明する。

## 公式出題範囲との対応

| 範囲 | 本章の内容 |
|---|---|
| 一般化線形モデル | 確率成分、線形予測子、リンク関数 |
| ロジスティック回帰 | ベルヌーイ・二項応答、ロジットリンク、オッズ比 |
| ポアソン回帰 | ポアソン応答、対数リンク、発生率比、オフセット |
| 最尤推定 | 尤度、対数尤度、スコア、ヘッセ行列 |
| モデル評価 | 逸脱度、入れ子モデルの逸脱度差 |

## 前提知識チェック

1. P3-01: ベルヌーイ分布、二項分布、ポアソン分布の確率質量関数。
2. L1-02: 線形予測子 $\boldsymbol x_i^{\mathsf T}\boldsymbol\beta$ と行列表現。
3. P2-02: 期待値、分散、微分によるモーメント計算。
4. F0-00: 対数・指数関数の微分、ヘッセ行列、ニュートン法の基本形。

---

## 1. 一般化線形モデルの三要素

観測 $i$ の説明変数ベクトルを $\boldsymbol x_i$、応答を $Y_i$ とします。一般化線形モデルでは次の三つを指定します。

1. **応答分布**: $Y_i$ がどの分布に従うか。
2. **線形予測子**:
   $$
   \eta_i=\boldsymbol x_i^{\mathsf T}\boldsymbol\beta.
   $$
3. **リンク関数**: 条件付き平均
   $$
   \mu_i=E[Y_i\mid\boldsymbol x_i]
   $$
   と線形予測子を
   $$
   g(\mu_i)=\eta_i
   $$
   で結ぶ関数。

正規応答では恒等リンク $g(\mu)=\mu$ を使えば通常の線形回帰になります。ベルヌーイ応答では平均が確率なので $0<\mu<1$、ポアソン応答では平均が正なので $\mu>0$ という制約があります。リンク関数は、こうした制約を持つ平均を実数全体を動ける線形予測子へ写します。

## 2. ロジスティック回帰

### 2.1 0/1応答とロジットリンク

$Y_i\in\{0,1\}$ とし、
$$
P(Y_i=1\mid\boldsymbol x_i)=p_i,
\qquad
P(Y_i=0\mid\boldsymbol x_i)=1-p_i
$$
とします。したがって
$$
Y_i\mid\boldsymbol x_i\sim\operatorname{Bernoulli}(p_i).
$$

確率 $p_i$ をそのまま線形予測子にすると、予測値が0未満や1超になる可能性があります。そこでオッズ
$$
\frac{p_i}{1-p_i}
$$
の対数を
$$
\log\frac{p_i}{1-p_i}
=\eta_i
=\boldsymbol x_i^{\mathsf T}\boldsymbol\beta
$$
と置きます。このリンクをロジットリンクと呼びます。

$p_i$ を解くと
$$
\begin{aligned}
\log\frac{p_i}{1-p_i}&=\eta_i,\\
\frac{p_i}{1-p_i}&=e^{\eta_i},\\
p_i&=e^{\eta_i}(1-p_i),\\
p_i(1+e^{\eta_i})&=e^{\eta_i},
\end{aligned}
$$
したがって
$$
\boxed{
p_i=\frac{e^{\eta_i}}{1+e^{\eta_i}}
=\frac1{1+e^{-\eta_i}}
}.
$$
この形なら任意の実数 $\eta_i$ に対して $0<p_i<1$ です。

### 2.2 係数はオッズ比で読む

説明変数 $x_j$ 以外を固定し、$x_j$ を1増やすと線形予測子は $\beta_j$ 増えます。したがってオッズは
$$
\frac{p/(1-p)\text{ at }x_j+1}
{p/(1-p)\text{ at }x_j}
=e^{\beta_j}
$$
倍になります。

例えば $\beta_j=\log2$ なら、$x_j$ が1増えるとオッズは2倍です。**確率が2倍、あるいは確率が $\log2$ だけ増えるという意味ではありません。** 確率の変化量は元の確率に依存します。

## 3. ベルヌーイ尤度からスコアを導く

ベルヌーイ確率質量関数は、$y_i\in\{0,1\}$ に対して
$$
P(Y_i=y_i)
=p_i^{y_i}(1-p_i)^{1-y_i}
$$
です。独立な $n$ 観測の尤度は
$$
L(\boldsymbol\beta)
=\prod_{i=1}^n
p_i^{y_i}(1-p_i)^{1-y_i}.
$$
対数を取ると
$$
\ell(\boldsymbol\beta)
=\sum_{i=1}^n
\{y_i\log p_i+(1-y_i)\log(1-p_i)\}.
$$
ロジスティック回帰では
$$
\log p_i=\eta_i-\log(1+e^{\eta_i}),
$$
$$
\log(1-p_i)=-\log(1+e^{\eta_i}).
$$
したがって
$$
\boxed{
\ell(\boldsymbol\beta)
=\sum_{i=1}^n
\{y_i\eta_i-\log(1+e^{\eta_i})\}
}.
$$

$\eta_i=\boldsymbol x_i^{\mathsf T}\boldsymbol\beta$ なので
$$
\frac{\partial\eta_i}{\partial\boldsymbol\beta}
=\boldsymbol x_i.
$$
また
$$
\frac{d}{d\eta_i}\log(1+e^{\eta_i})
=\frac{e^{\eta_i}}{1+e^{\eta_i}}
=p_i.
$$
よってスコアは
$$
\boxed{
\frac{\partial\ell}{\partial\boldsymbol\beta}
=\sum_{i=1}^n\boldsymbol x_i(y_i-p_i)
=\boldsymbol X^{\mathsf T}(\boldsymbol y-\boldsymbol p)
}.
$$

さらに
$$
\frac{dp_i}{d\eta_i}=p_i(1-p_i)
$$
なのでヘッセ行列は
$$
\frac{\partial^2\ell}{\partial\boldsymbol\beta\partial\boldsymbol\beta^{\mathsf T}}
=-\sum_{i=1}^np_i(1-p_i)\boldsymbol x_i\boldsymbol x_i^{\mathsf T}
=-\boldsymbol X^{\mathsf T}\boldsymbol W\boldsymbol X,
$$
$$
\boldsymbol W=\operatorname{diag}\{p_i(1-p_i)\}.
$$
一般にスコア方程式
$$
\boldsymbol X^{\mathsf T}(\boldsymbol y-\boldsymbol p)=\boldsymbol0
$$
は $\boldsymbol\beta$ について線形ではないので、通常の最小二乗法のような単純な閉形式解は得られません。

## 4. ポアソン回帰

### 4.1 件数の平均を正に保つ

観測 $i$ の計数応答を
$$
Y_i\mid\boldsymbol x_i\sim\operatorname{Poisson}(\mu_i),
\qquad \mu_i>0
$$
とします。対数リンク
$$
\log\mu_i
=\eta_i
=\boldsymbol x_i^{\mathsf T}\boldsymbol\beta
$$
を使えば
$$
\boxed{\mu_i=e^{\eta_i}>0}.
$$

説明変数 $x_j$ を1増やすと
$$
\frac{\mu(x_j+1)}{\mu(x_j)}=e^{\beta_j}.
$$
したがって $e^{\beta_j}$ は平均件数の比です。同じ観測時間を比較しているなら発生率比としても読めます。

### 4.2 ポアソン確率質量関数から尤度を作る

ポアソン確率質量関数は
$$
P(Y_i=y_i)
=\frac{e^{-\mu_i}\mu_i^{y_i}}{y_i!},
\qquad y_i=0,1,2,\ldots
$$
です。独立観測の尤度は
$$
L(\boldsymbol\beta)
=\prod_{i=1}^n
\frac{e^{-\mu_i}\mu_i^{y_i}}{y_i!}.
$$
対数尤度は
$$
\ell(\boldsymbol\beta)
=\sum_{i=1}^n
\{-\mu_i+y_i\log\mu_i-\log(y_i!)\}.
$$
ここで $\mu_i=e^{\eta_i}$、$\log\mu_i=\eta_i$ を代入すると
$$
\ell(\boldsymbol\beta)
=\sum_{i=1}^n
\{-e^{\eta_i}+y_i\eta_i-\log(y_i!)\}.
$$
$-\log(y_i!)$ は観測値だけで決まり未知母数を含まないため、**ここまで完全な式を書いた後なら**最大化や微分では省いてよい項です。

微分すると
$$
\boxed{
\frac{\partial\ell}{\partial\boldsymbol\beta}
=\sum_i\boldsymbol x_i(y_i-\mu_i)
=\boldsymbol X^{\mathsf T}(\boldsymbol y-\boldsymbol\mu)
}.
$$
ヘッセ行列は
$$
\frac{\partial^2\ell}{\partial\boldsymbol\beta\partial\boldsymbol\beta^{\mathsf T}}
=-\sum_i\mu_i\boldsymbol x_i\boldsymbol x_i^{\mathsf T}.
$$

## 5. 観測時間が違うときのオフセット

故障件数や事故件数では、観測時間が2倍なら平均件数も概ね2倍になります。観測時間を $t_i>0$、単位時間あたり発生率を $\lambda_i$ とし
$$
Y_i\sim\operatorname{Poisson}(t_i\lambda_i)
$$
とします。

発生率に対して
$$
\log\lambda_i=\boldsymbol x_i^{\mathsf T}\boldsymbol\beta
$$
と置くと
$$
\log\mu_i
=\log(t_i\lambda_i)
=\log t_i+\boldsymbol x_i^{\mathsf T}\boldsymbol\beta.
$$
$\log t_i$ は係数を推定せず1に固定して線形予測子へ加える既知項です。この項をオフセットと呼びます。

オフセットを入れることで「件数そのもの」ではなく「曝露時間を調整した発生率」を比較できます。

## 6. 指数型分布族と平均・分散

一般化線形モデルで使われる代表的な分布は、確率質量関数または確率密度関数を
$$
f(y;\theta,\phi)
=\exp\left\{
\frac{y\theta-b(\theta)}{a(\phi)}+c(y,\phi)
\right\}
$$
と書けます。$\theta$ を自然母数、$\phi$ を分散に関わる母数とします。

この式が正規化されているので
$$
\int f(y;\theta,\phi)\,dy=1
$$
または離散型なら対応する和が1です。$\theta$ で微分すると
$$
0=\int
\frac{y-b'(\theta)}{a(\phi)}
f(y;\theta,\phi)\,dy.
$$
したがって
$$
\boxed{E[Y]=b'(\theta)}.
$$

もう一度微分すると
$$
\boxed{
\operatorname{Var}(Y)=a(\phi)b''(\theta)
}.
$$

自然母数 $\theta$ をそのまま線形予測子にするリンクを正準リンクと呼びます。ベルヌーイ分布ではロジットリンク、ポアソン分布では対数リンクが正準リンクです。

## 7. 逸脱度

飽和モデルは、各観測に個別の平均を割り当てて観測値へ最大限合わせるモデルです。候補モデルの最大対数尤度を $\ell(\hat{\boldsymbol\beta})$、飽和モデルの最大対数尤度を $\ell_{\mathrm{sat}}$ とすると
$$
\boxed{
D=2\{\ell_{\mathrm{sat}}-\ell(\hat{\boldsymbol\beta})\}
}
$$
を逸脱度と呼びます。値が小さいほど飽和モデルに近い当てはまりです。

### 7.1 ポアソン回帰の逸脱度

ポアソン観測では、飽和モデルは $\hat\mu_i=y_i$ とします。$y_i=0$ の項では $0\log0$ を0と約束すると
$$
D
=2\sum_i
\left[
y_i\log\frac{y_i}{\hat\mu_i}
-(y_i-\hat\mu_i)
\right].
$$

### 7.2 ベルヌーイ回帰の逸脱度

$y_i\in\{0,1\}$ のベルヌーイ観測では飽和モデルの各観測の確率は観測値そのものに一致します。したがって
$$
D
=2\sum_i\left[
y_i\log\frac{y_i}{\hat p_i}
+(1-y_i)\log\frac{1-y_i}{1-\hat p_i}
\right]
$$
です。$0\log0$ は0とします。

## 8. 入れ子モデルの逸脱度差

小さいモデルが大きいモデルの係数の一部を0などに固定して得られるとき、二つを入れ子モデルといいます。大きいモデルの最大対数尤度を $\ell_1$、小さいモデルを $\ell_0$ とすると
$$
D_0-D_1
=2(\ell_1-\ell_0)
$$
は尤度比検定統計量です。

標本数が十分大きく、母数が境界上にないなど通常の正則条件が成り立つとき、帰無仮説のもとで
$$
D_0-D_1
\overset{\text{近似}}{\sim}\chi_q^2
$$
となります。ここで $q$ は大きいモデルで追加された独立な母数の数です。

---

## 9. 演習：問題の直後に解答

### Level A：基礎部品

#### L2-01-A01 三要素を分類する
- level: A
- minutes: 6
- topics: 一般化線形モデル
- techniques: 構造理解
- calculation_load: low

二項応答のモデル
$$
Y_i\sim\operatorname{Bernoulli}(p_i),
\qquad
\log\frac{p_i}{1-p_i}=\beta_0+\beta_1x_i
$$
を考える。応答分布、線形予測子、リンク関数をそれぞれ答えよ。

<!-- solution-start -->
##### 解答
###### 詳細解答
応答分布はベルヌーイ分布。線形予測子は
$$\eta_i=\beta_0+\beta_1x_i.$$
リンク関数は
$$g(p)=\log\{p/(1-p)\}$$
である。
###### 本番答案
ベルヌーイ分布、$\eta_i=\beta_0+\beta_1x_i$、ロジットリンク $g(p)=\log\{p/(1-p)\}$。
###### 採点基準
分布6点、線形予測子6点、リンク8点。合計20点。
<!-- solution-end -->

#### L2-01-A02 ロジットを確率へ戻す
- level: A
- minutes: 7
- topics: ロジスティック回帰
- techniques: 逆リンク
- calculation_load: low

$$
\log\frac p{1-p}=-2+0.5x
$$
とする。$x=4$ のときの $p$ を求めよ。

<!-- solution-start -->
##### 解答
###### 詳細解答
$x=4$ では線形予測子は
$$\eta=-2+0.5\cdot4=0.$$
したがって
$$p=\frac{e^0}{1+e^0}=\frac12.$$
###### 本番答案
$\eta=0$ より $p=1/2$。
###### 採点基準
線形予測子8点、逆リンク8点、結論4点。合計20点。
<!-- solution-end -->

#### L2-01-A03 オッズ比を読む
- level: A
- minutes: 7
- topics: ロジスティック回帰
- techniques: 係数解釈
- calculation_load: low

ロジスティック回帰である説明変数の係数が $\beta=\log3$ である。その他の説明変数を固定してその説明変数を1増やしたとき、オッズは何倍になるか。また「成功確率が3倍になる」と言ってよいか。

<!-- solution-start -->
##### 解答
###### 詳細解答
オッズ比は
$$e^{\beta}=e^{\log3}=3.$$
したがってオッズが3倍になる。確率は $p=\text{odds}/(1+\text{odds})$ という非線形変換を通るため、成功確率が3倍になるとは一般に言えない。
###### 本番答案
オッズは3倍。確率そのものが3倍という意味ではない。
###### 採点基準
指数変換8点、オッズ比4点、確率との区別8点。合計20点。
<!-- solution-end -->

#### L2-01-A04 ポアソン回帰のオフセット
- level: A
- minutes: 8
- topics: ポアソン回帰
- techniques: オフセット
- calculation_load: low

単位時間あたり発生率を
$$\log\lambda_i=\beta_0+\beta_1x_i$$
とし、観測時間を $t_i$、平均件数を $\mu_i=t_i\lambda_i$ とする。$\log\mu_i$ を表し、オフセットを答えよ。

<!-- solution-start -->
##### 解答
###### 詳細解答
$$
\log\mu_i
=\log(t_i\lambda_i)
=\log t_i+\log\lambda_i
=\log t_i+\beta_0+\beta_1x_i.
$$
したがってオフセットは $\log t_i$。
###### 本番答案
$\log\mu_i=\log t_i+\beta_0+\beta_1x_i$、オフセットは $\log t_i$。
###### 採点基準
積の対数8点、線形予測子6点、オフセット6点。合計20点。
<!-- solution-end -->

### Level B：尤度と係数解釈

#### L2-01-B01 ベルヌーイ尤度からスコアを導く
- level: B
- minutes: 15
- topics: ロジスティック回帰, 尤度
- techniques: 対数尤度, 微分
- calculation_load: high

独立な $Y_i\in\{0,1\}$ が
$$
P(Y_i=y_i)=p_i^{y_i}(1-p_i)^{1-y_i}
$$
に従い、
$$
\log\frac{p_i}{1-p_i}=\eta_i=\boldsymbol x_i^{\mathsf T}\boldsymbol\beta
$$
とする。

1. 尤度と対数尤度を書け。
2. $p_i=e^{\eta_i}/(1+e^{\eta_i})$ を代入して対数尤度を整理せよ。
3. スコア $\partial\ell/\partial\boldsymbol\beta$ を導け。

<!-- solution-start -->
##### 解答
###### 詳細解答
独立性から
$$L=\prod_i p_i^{y_i}(1-p_i)^{1-y_i}.$$
よって
$$\ell=\sum_i\{y_i\log p_i+(1-y_i)\log(1-p_i)\}.$$
ロジスティック形では
$$\log p_i=\eta_i-\log(1+e^{\eta_i}),$$
$$\log(1-p_i)=-\log(1+e^{\eta_i}),$$
なので
$$\ell=\sum_i\{y_i\eta_i-\log(1+e^{\eta_i})\}.$$
$\partial\eta_i/\partial\beta=\boldsymbol x_i$、$d\log(1+e^{\eta_i})/d\eta_i=p_i$ より
$$
\frac{\partial\ell}{\partial\boldsymbol\beta}
=\sum_i\boldsymbol x_i(y_i-p_i).
$$
###### 本番答案
$$L=\prod p_i^{y_i}(1-p_i)^{1-y_i},$$
$$\ell=\sum\{y_i\eta_i-\log(1+e^{\eta_i})\},$$
$$\partial\ell/\partial\beta=\sum x_i(y_i-p_i).$$
###### 採点基準
尤度5点、対数尤度5点、ロジット代入4点、微分6点。合計20点。
<!-- solution-end -->

#### L2-01-B02 ポアソン尤度からスコアを導く
- level: B
- minutes: 15
- topics: ポアソン回帰, 尤度
- techniques: 対数尤度, 微分
- calculation_load: high

独立な $Y_i$ が
$$
P(Y_i=y_i)=\frac{e^{-\mu_i}\mu_i^{y_i}}{y_i!}
$$
に従い、
$$\log\mu_i=\eta_i=\boldsymbol x_i^{\mathsf T}\boldsymbol\beta$$
とする。

1. 尤度と完全な対数尤度を書け。
2. 未知母数を含まない項を特定せよ。
3. スコアを導け。

<!-- solution-start -->
##### 解答
###### 詳細解答
$$L=\prod_i e^{-\mu_i}\mu_i^{y_i}/y_i!.$$
したがって
$$\ell=\sum_i\{-\mu_i+y_i\log\mu_i-\log(y_i!)\}.$$
$-\log(y_i!)$ は観測値だけで決まり未知母数を含まない。
$\mu_i=e^{\eta_i}$ を使えば
$$\ell=\sum_i\{-e^{\eta_i}+y_i\eta_i-\log(y_i!)\}.$$
微分して
$$
\frac{\partial\ell}{\partial\boldsymbol\beta}
=\sum_i\boldsymbol x_i(y_i-e^{\eta_i})
=\sum_i\boldsymbol x_i(y_i-\mu_i).
$$
###### 本番答案
完全な対数尤度は $\sum[-\mu_i+y_i\log\mu_i-\log(y_i!)]$。最後の項は母数を含まない。スコアは $\sum x_i(y_i-\mu_i)$。
###### 採点基準
尤度4点、完全な対数尤度6点、定数項の特定4点、スコア6点。合計20点。
<!-- solution-end -->

#### L2-01-B03 指数型分布族の平均を導く
- level: B
- minutes: 14
- topics: 指数型分布族
- techniques: 正規化, 微分
- calculation_load: high

確率密度関数または確率質量関数が
$$
f(y;\theta,\phi)=\exp\left\{\frac{y\theta-b(\theta)}{a(\phi)}+c(y,\phi)\right\}
$$
と書け、和または積分が1に正規化されているとする。正規化式を $\theta$ で微分して $E[Y]=b'(\theta)$ を示せ。

<!-- solution-start -->
##### 解答
###### 詳細解答
連続型なら
$$\int f(y;\theta,\phi)dy=1.$$
両辺を $\theta$ で微分すると
$$
0=\int \frac{\partial f}{\partial\theta}dy.
$$
指数関数の微分より
$$
\frac{\partial f}{\partial\theta}
=f(y;\theta,\phi)\frac{y-b'(\theta)}{a(\phi)}.
$$
したがって
$$
0=\frac1{a(\phi)}\{E[Y]-b'(\theta)\}.
$$
$a(\phi)\ne0$ なので
$$E[Y]=b'(\theta).$$
離散型では積分を和に置き換えて同じ計算をする。
###### 本番答案
正規化式を微分し、$\partial f/\partial\theta=f\{y-b'(\theta)\}/a(\phi)$ を代入すると $E[Y]-b'(\theta)=0$。
###### 採点基準
正規化4点、微分6点、積分内への代入6点、結論4点。合計20点。
<!-- solution-end -->

#### L2-01-B04 ポアソン逸脱度の1観測
- level: B
- minutes: 10
- topics: 逸脱度
- techniques: 尤度差
- calculation_load: medium

ポアソン観測 $y=4$ に対し、候補モデルの推定平均が $\hat\mu=2$ である。1観測分のポアソン逸脱度
$$
d=2\left[y\log\frac y{\hat\mu}-(y-\hat\mu)\right]
$$
を求めよ。

<!-- solution-start -->
##### 解答
###### 詳細解答
$$
d=2\left[4\log(4/2)-(4-2)\right]
=2(4\log2-2)
=8\log2-4.
$$
###### 本番答案
$d=8\log2-4$。
###### 採点基準
比4点、対数項6点、差項4点、結論6点。合計20点。
<!-- solution-end -->

### Level C：本番標準

#### L2-01-C01 ロジスティック回帰の予測とオッズ比
- level: C
- minutes: 22
- topics: ロジスティック回帰
- techniques: 逆リンク, オッズ比
- calculation_load: medium

モデル
$$
\log\frac{p}{1-p}=-3+0.8x_1-0.5x_2
$$
を考える。

1. $(x_1,x_2)=(2,0)$ の線形予測子と成功確率を求めよ。
2. $x_2$ を固定し $x_1$ を1増やしたときのオッズ比を求めよ。
3. $x_1$ を固定し $x_2$ を1増やしたときのオッズ比を求めよ。
4. $x_1$ の係数0.8を「確率が0.8増える」と解釈できない理由を説明せよ。

<!-- solution-start -->
##### 解答
###### 詳細解答
(1)
$$\eta=-3+0.8\cdot2=-1.4.$$
したがって
$$p=\frac{e^{-1.4}}{1+e^{-1.4}}\approx0.198.$$

(2) $x_1$ を1増やすとオッズは
$$e^{0.8}\approx2.23$$
倍。

(3) $x_2$ を1増やすとオッズは
$$e^{-0.5}\approx0.607$$
倍。

(4) 係数は確率ではなく対数オッズの変化量である。確率への変換 $p=e^\eta/(1+e^\eta)$ は非線形なので、同じ0.8の変化でも元の $\eta$ によって確率変化量が異なる。
###### 本番答案
$\eta=-1.4,p\approx0.198$。$x_1$ のオッズ比 $e^{0.8}\approx2.23$、$x_2$ は $e^{-0.5}\approx0.607$。係数は対数オッズ差であり確率差ではない。
###### 採点基準
予測6点、各オッズ比4点ずつ、解釈6点。合計20点。
<!-- solution-end -->

#### L2-01-C02 観測時間を調整したポアソン回帰
- level: C
- minutes: 22
- topics: ポアソン回帰, オフセット
- techniques: 発生率比, 期待件数
- calculation_load: medium

故障件数 $Y_i$ について
$$
Y_i\sim\operatorname{Poisson}(\mu_i),
$$
$$
\log\mu_i=\log t_i+\beta_0+\beta_1x_i
$$
とする。$\beta_0=\log2$、$\beta_1=\log1.5$ とする。

1. $x=0,t=3$ の平均故障件数を求めよ。
2. 同じ観測時間で $x$ を0から1へ変えると平均件数は何倍か。
3. $x=1,t=4$ の平均故障件数を求めよ。
4. $\log t_i$ を推定対象の回帰係数にしない理由を説明せよ。

<!-- solution-start -->
##### 解答
###### 詳細解答
発生率は
$$\lambda(x)=e^{\beta_0+\beta_1x}=2(1.5)^x.$$
(1) $x=0$ では単位時間あたり2なので
$$\mu=3\cdot2=6.$$
(2) $x$ を1増やすと率は $e^{\beta_1}=1.5$ 倍で、同じ観測時間なら平均件数も1.5倍。
(3) $x=1$ では率3なので
$$\mu=4\cdot3=12.$$
(4) 観測時間が2倍なら、同じ発生率のもとで平均件数も理論上2倍になる。この比例関係は既知なので $\log t_i$ の係数を1に固定する。
###### 本番答案
平均件数6、$x$ の1増加で1.5倍、$x=1,t=4$ では12。$\log t_i$ は既知の曝露量比例を係数1で調整するオフセット。
###### 採点基準
(1)5点、率比5点、(3)5点、オフセット解釈5点。合計20点。
<!-- solution-end -->

#### L2-01-C03 ロジスティック回帰のヘッセ行列
- level: C
- minutes: 24
- topics: 最尤推定, ロジスティック回帰
- techniques: 二階微分, 行列表現
- calculation_load: high

ロジスティック回帰の対数尤度
$$
\ell(\boldsymbol\beta)
=\sum_i\{y_i\eta_i-\log(1+e^{\eta_i})\},
\qquad
\eta_i=\boldsymbol x_i^{\mathsf T}\boldsymbol\beta
$$
を考える。

1. $dp_i/d\eta_i=p_i(1-p_i)$ を示せ。ただし $p_i=e^{\eta_i}/(1+e^{\eta_i})$。
2. ヘッセ行列が
$$
-\sum_i p_i(1-p_i)\boldsymbol x_i\boldsymbol x_i^{\mathsf T}
$$
となることを示せ。
3. 任意のベクトル $\boldsymbol a$ に対してヘッセ行列の二次形式が非正であることを示し、対数尤度の形について説明せよ。

<!-- solution-start -->
##### 解答
###### 詳細解答
(1)
$$
p_i=\frac{e^{\eta_i}}{1+e^{\eta_i}}
$$
を商の微分で微分すると
$$
\frac{dp_i}{d\eta_i}
=\frac{e^{\eta_i}(1+e^{\eta_i})-e^{2\eta_i}}{(1+e^{\eta_i})^2}
=\frac{e^{\eta_i}}{(1+e^{\eta_i})^2}
=p_i(1-p_i).
$$

スコアは
$$U(\beta)=\sum x_i(y_i-p_i).$$
さらに微分して
$$
\frac{\partial U}{\partial\beta^{\mathsf T}}
=-\sum_i p_i(1-p_i)x_ix_i^{\mathsf T}.
$$

任意の $a$ について
$$
\boldsymbol a^{\mathsf T}
\frac{\partial^2\ell}{\partial\beta\partial\beta^{\mathsf T}}
\boldsymbol a
=-\sum_i p_i(1-p_i)(\boldsymbol a^{\mathsf T}\boldsymbol x_i)^2\le0.
$$
したがって対数尤度は凹関数である。設計行列などの条件が十分なら最大点は一意になる。
###### 本番答案
$dp/d\eta=p(1-p)$。よってヘッセ行列は $-X^{\mathsf T}WX$。二次形式は $-\sum p_i(1-p_i)(a^{\mathsf T}x_i)^2\le0$ なので対数尤度は凹。
###### 採点基準
一階微分6点、ヘッセ行列6点、二次形式6点、解釈2点。合計20点。
<!-- solution-end -->

#### L2-01-C04 入れ子モデルの逸脱度差
- level: C
- minutes: 18
- topics: 逸脱度, 尤度比検定
- techniques: カイ二乗近似
- calculation_load: medium

大きい一般化線形モデルは係数を6個、小さい入れ子モデルは係数を4個持つ。最大対数尤度がそれぞれ
$$\ell_1=-120.5,\qquad\ell_0=-125.2$$
であった。

1. 逸脱度差 $D_0-D_1=2(\ell_1-\ell_0)$ を求めよ。
2. 帰無仮説のもとで使う近似カイ二乗分布の自由度を求めよ。
3. この近似を使うために必要な条件を二つ挙げよ。

<!-- solution-start -->
##### 解答
###### 詳細解答
$$D_0-D_1=2\{-120.5-(-125.2)\}=2(4.7)=9.4.$$
追加母数は $6-4=2$ 個なので、通常の正則条件と大標本のもとでは
$$D_0-D_1\approx\chi^2_2.$$
必要条件として、二モデルが入れ子であること、大標本で通常の尤度比検定の正則条件が成り立つこと、例えば真の母数が境界上にないことなどがある。
###### 本番答案
逸脱度差9.4、自由度2。入れ子モデルであり、大標本・正則条件が必要。
###### 採点基準
計算8点、自由度4点、条件8点。合計20点。
<!-- solution-end -->

#### L2-01-C05 ポアソン回帰の逸脱度を計算する
- level: C
- minutes: 24
- topics: ポアソン回帰, 逸脱度
- techniques: 対数計算
- calculation_load: high

3観測について観測件数と候補モデルの推定平均が
$$
(y_1,y_2,y_3)=(0,3,5),
$$
$$
(\hat\mu_1,\hat\mu_2,\hat\mu_3)=(1,2,4)
$$
である。ポアソン逸脱度
$$
D=2\sum_i\left[
y_i\log\frac{y_i}{\hat\mu_i}-(y_i-\hat\mu_i)
\right]
$$
を計算せよ。ただし $0\log0=0$ とする。

<!-- solution-start -->
##### 解答
###### 詳細解答
$i=1$ では
$$0-(0-1)=1.$$
$i=2$ では
$$3\log(3/2)-(3-2)=3\log(3/2)-1.$$
$i=3$ では
$$5\log(5/4)-(5-4)=5\log(5/4)-1.$$
和は
$$1+3\log(3/2)-1+5\log(5/4)-1
=3\log(3/2)+5\log(5/4)-1.$$
したがって
$$
D=2\{3\log(3/2)+5\log(5/4)-1\}.
$$
###### 本番答案
$$D=2\{3\log(3/2)+5\log(5/4)-1\}.$$
###### 採点基準
0件項6点、3件項4点、5件項4点、和と2倍6点。合計20点。
<!-- solution-end -->

### Level D：発展

#### L2-01-D01 ニュートン法から反復再重み付き最小二乗法へ
- level: D
- minutes: 35
- topics: ロジスティック回帰, 数値最適化
- techniques: ニュートン法, 行列代数
- calculation_load: high

ロジスティック回帰でスコアとヘッセ行列が
$$
\boldsymbol U(\boldsymbol\beta)
=\boldsymbol X^{\mathsf T}(\boldsymbol y-\boldsymbol p),
$$
$$
\boldsymbol H(\boldsymbol\beta)
=-\boldsymbol X^{\mathsf T}\boldsymbol W\boldsymbol X,
\qquad
\boldsymbol W=\operatorname{diag}\{p_i(1-p_i)\}
$$
であるとする。

1. 最大化のニュートン更新
$$
\boldsymbol\beta^{\mathrm{new}}
=\boldsymbol\beta^{\mathrm{old}}
-\boldsymbol H^{-1}\boldsymbol U
$$
へ代入して更新式を求めよ。
2. $\boldsymbol\eta=\boldsymbol X\boldsymbol\beta$ とし、作業応答
$$
\boldsymbol z
=\boldsymbol\eta+
\boldsymbol W^{-1}(\boldsymbol y-\boldsymbol p)
$$
を定義する。更新式が
$$
\boldsymbol\beta^{\mathrm{new}}
=(\boldsymbol X^{\mathsf T}\boldsymbol W\boldsymbol X)^{-1}
\boldsymbol X^{\mathsf T}\boldsymbol W\boldsymbol z
$$
と書けることを示せ。
3. この形が「重み付き最小二乗を繰り返す」と読める理由を説明せよ。

<!-- solution-start -->
##### 解答
###### 詳細解答
ニュートン更新へ代入すると
$$
\begin{aligned}
\beta^{new}
&=\beta^{old}
-(-X^{\mathsf T}WX)^{-1}X^{\mathsf T}(y-p)\\
&=\beta^{old}
+(X^{\mathsf T}WX)^{-1}X^{\mathsf T}(y-p).
\end{aligned}
$$
両辺に同値な形を作ると
$$
\begin{aligned}
\beta^{new}
&=(X^{\mathsf T}WX)^{-1}
\{X^{\mathsf T}WX\beta^{old}+X^{\mathsf T}(y-p)\}\\
&=(X^{\mathsf T}WX)^{-1}X^{\mathsf T}W
\{X\beta^{old}+W^{-1}(y-p)\}\\
&=(X^{\mathsf T}WX)^{-1}X^{\mathsf T}Wz.
\end{aligned}
$$
右辺は、作業応答 $z$ を設計行列 $X$ へ、重み行列 $W$ を用いて重み付き最小二乗回帰した係数と同じ形である。$p$ と $W$ は現在の $\beta$ に依存するため、更新のたびに作り直して繰り返す。
###### 本番答案
ニュートン更新は
$$\beta^{new}=\beta^{old}+(X^{\mathsf T}WX)^{-1}X^{\mathsf T}(y-p).$$
$z=X\beta^{old}+W^{-1}(y-p)$ を代入整理すると
$$\beta^{new}=(X^{\mathsf T}WX)^{-1}X^{\mathsf T}Wz.$$
よって各反復で重み付き最小二乗を解く形になる。
###### 採点基準
ニュートン代入6点、行列整理8点、作業応答代入4点、解釈2点。合計20点。
<!-- solution-end -->

## 10. 30分ドリル

### L2-01-DRILL-01 ロジスティック回帰とポアソン回帰を比較する

次の二つのモデルを考える。

**モデルA：0/1応答**
$$
Y_i\sim\operatorname{Bernoulli}(p_i),
\qquad
\log\frac{p_i}{1-p_i}=-1+0.6x_i.
$$

**モデルB：故障件数**
$$
Z_i\sim\operatorname{Poisson}(\mu_i),
\qquad
\log\mu_i=\log t_i+0.4+0.3x_i.
$$

1. モデルAで $x=0$ と $x=2$ の成功確率を求めよ。
2. モデルAで $x$ が1増えたときのオッズ比を求めよ。
3. モデルAのベルヌーイ確率質量関数から、1観測の対数尤度を $y,\eta$ で表せ。
4. モデルBで $x=1,t=5$ の平均故障件数を求めよ。
5. モデルBで $x$ が2増えたときの発生率比を求めよ。
6. モデルBで観測時間を2倍にすると、説明変数を固定した平均件数は何倍になるか。
7. モデルAの小さいモデルと大きいモデルの逸脱度が42.0と36.5で、追加母数が2個なら、逸脱度差と大標本近似で使う分布を答えよ。
8. 二つのモデルでリンク関数が必要になる理由を、それぞれ応答平均の取り得る範囲と結び付けて説明せよ。

<!-- solution-start -->
##### 解答
###### 詳細解答
モデルAで $x=0$ なら $\eta=-1$ なので
$$p(0)=\frac{e^{-1}}{1+e^{-1}}=\frac1{1+e}.$$
$x=2$ なら $\eta=-1+1.2=0.2$ なので
$$p(2)=\frac{e^{0.2}}{1+e^{0.2}}.$$
$x$ の1増加によるオッズ比は
$$e^{0.6}.$$

1観測のベルヌーイ対数尤度は
$$
\ell_i=y\log p+(1-y)\log(1-p)
=y\eta-\log(1+e^\eta).
$$

モデルBでは
$$
\mu=5\exp(0.4+0.3)
=5e^{0.7}.
$$
$x$ が2増えると発生率比は
$$e^{0.3\cdot2}=e^{0.6}.$$
観測時間が2倍ならオフセット $\log t$ が $\log2$ 増えるので平均件数は2倍。

逸脱度差は
$$42.0-36.5=5.5.$$
追加母数2個なので、入れ子モデル・大標本・正則条件のもとで
$$5.5\approx\chi^2_2$$
として検定する。

ベルヌーイ平均は成功確率なので $(0,1)$ に入る必要があり、ロジットリンクで実数の線形予測子と結ぶ。ポアソン平均は正である必要があり、対数リンクで実数の線形予測子と結ぶ。
###### 本番答案
モデルA：$p(0)=1/(1+e)$、$p(2)=e^{0.2}/(1+e^{0.2})$、オッズ比 $e^{0.6}$、1観測対数尤度 $y\eta-\log(1+e^\eta)$。

モデルB：$x=1,t=5$ で $\mu=5e^{0.7}$、$x$ が2増えると率比 $e^{0.6}$、観測時間2倍で平均件数2倍。

逸脱度差5.5、追加自由度2なので大標本では $\chi^2_2$ 近似。ロジットは確率を $(0,1)$ に、対数リンクは平均件数を正に保つ。
###### 採点基準
Aの確率15点、オッズ比10点、Aの尤度15点、Bの平均15点、率比10点、オフセット10点、逸脱度差15点、リンクの意味10点。合計100点。
<!-- solution-end -->

## 11. 本番での確認点

- 一般化線形モデルでは「分布・線形予測子・リンク関数」を別々に確認する。
- 尤度問題では、確率質量関数から完全な尤度・対数尤度を書いてから母数を含まない項を省く。
- ロジスティック回帰係数は対数オッズ差、指数を取るとオッズ比。
- ポアソン回帰係数は対数平均件数差、指数を取ると平均件数比・発生率比。
- 観測時間が異なる場合は $\log t_i$ をオフセットとして入れる。
- 逸脱度差のカイ二乗近似は、大標本・入れ子モデル・通常の正則条件を前提とする。
