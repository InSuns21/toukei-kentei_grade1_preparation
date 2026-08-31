---
id: test-chi-square-fit
title: 適合度検定の自由度を数える
category: math-testing
subcategory: math-various-tests
topic: chi-square-goodness-fit
type: pitfall
difficulty: 2
priority: A
hashtags:
  - 適合度の検定
  - カイ二乗
  - 自由度
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 適合度の検定
archive_reason: duplicate
canonical_card: samp-multinomial-cell-counts
coverage_card: samp-multinomial-cell-counts
archive_note: 多項標本の正本にPearson適合度統計量、既知確率なら自由度k-1、同じデータから帰無モデルの内部母数をr個推定した場合はk-1-r、旧カードと同じk=5,r=1ならdf=3の数値例まで統合済み。旧単発カードは不要。
---
## 問題
$k=5$ 区分の正則で識別可能な帰無モデルで、各区分確率は正、期待度数は標本サイズとともに増えるとする。内部母数を最尤法で1個推定したときの自由度は？
## 答え
区分確率の和が1という制約と、推定した母数の個数を引く。
## 使用公式・定理
母数を $r$ 個推定したPearson適合度統計量は、条件の下でカイ二乗分布へ収束し、
$$\sum_{j=1}^k\frac{(O_j-E_j)^2}{E_j}\xrightarrow{d}\chi^2_{k-1-r}.$$
## 計算例
$$\mathrm{df}=k-1-r=5-1-1=3.$$
## 注意
機械的に $k-1$ としない。期待度数が小さすぎる区分は統合も検討する。

<!-- CARD -->

---
id: dist-bivariate-normal-definition
title: 二変量正規分布の定義とパラメータ
category: math-distributions
subcategory: math-continuous-distributions
topic: bivariate-normal-definition
type: recognition
difficulty: 2
priority: S
hashtags:
  - 二変量正規分布
  - 同時密度
  - 相関係数
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 多変量正規分布
archive_reason: duplicate
canonical_card: dist-multivariate-normal-density
coverage_card: dist-multivariate-normal-density
archive_note: 一般p次元多変量正規密度の正本に、二変量の分散共分散行列、sigma1・sigma2・rho表示、行列式、逆行列、展開した密度、|rho|<1の非退化条件、|rho|=1の退化まで統合済み。二変量だけの旧定義カードは完全な特殊ケース。
---
## 問題
$(X,Y)$ を平均 $\boldsymbol\mu=(\mu_1,\mu_2)$、分散 $\sigma_1^2,\sigma_2^2$、相関係数 $\rho$ の二変量正規分布に従うとする。密度関数とパラメータ条件を書け。

## 答え
$\sigma_1,\sigma_2>0,\ -1<\rho<1$ のとき
$$f_{X,Y}(x,y)=\frac{1}{2\pi\sigma_1\sigma_2\sqrt{1-\rho^2}}\exp\left\{-\frac{1}{2(1-\rho^2)}\left(\frac{(x-\mu_1)^2}{\sigma_1^2}-2\rho\frac{(x-\mu_1)(y-\mu_2)}{\sigma_1\sigma_2}+\frac{(y-\mu_2)^2}{\sigma_2^2}\right)\right\}.$$

## 使用公式・定理
5個のパラメータ $(\mu_1,\mu_2,\sigma_1^2,\sigma_2^2,\rho)$ で指定される。分散共分散行列は
$$\boldsymbol\Sigma=
\begin{pmatrix}\sigma_1^2&\rho\sigma_1\sigma_2\\
\rho\sigma_1\sigma_2&\sigma_2^2\end{pmatrix},$$
$$|\boldsymbol\Sigma|=\sigma_1^2\sigma_2^2(1-\rho^2),$$
$$\boldsymbol\Sigma^{-1}=\frac1{1-\rho^2}
\begin{pmatrix}
1/\sigma_1^2&-\rho/(\sigma_1\sigma_2)\\
-\rho/(\sigma_1\sigma_2)&1/\sigma_2^2
\end{pmatrix}.$$ 
多変量正規密度
$$f(\boldsymbol x)=\frac{
\exp\{-\tfrac12(\boldsymbol x-\boldsymbol\mu)^{\mathsf T}
\boldsymbol\Sigma^{-1}(\boldsymbol x-\boldsymbol\mu)\}}
{2\pi|\boldsymbol\Sigma|^{1/2}}$$
へ代入すると答えの式になる。

## 計算例
$\mu_1=\mu_2=0,\sigma_1=\sigma_2=1,\rho=0$ なら標準二変量正規になり、密度は $f=\frac1{2\pi}\exp\{-\frac{x^2+y^2}{2}\}$。

## 一手
相関係数 $\rho$ は分散共分散行列の非対角項を $\sigma_1\sigma_2$ で正規化したもの。$\rho=0$ と独立が一致するのはこの場合だけ。

## 注意
正定値性のため $\lvert\rho\rvert<1$ が要る。$\lvert\rho\rvert=1$ では退化（超平面上に分布）する。

<!-- CARD -->

---
id: dist-normal-sum
published: true
title: 独立な正規分布の和の分布を求める
category: math-distributions
subcategory: math-continuous-distributions
topic: normal-sum
type: theorem
difficulty: 2
priority: S
hashtags:
  - 正規分布（ガウス分布）
  - 和
  - 統計的独立
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 正規分布（ガウス分布）
archive_reason: duplicate
canonical_card: prob-linear-combination-normal
coverage_card: prob-linear-combination-normal
archive_note: 多変量正規分布の一般線形結合a^T XがN(a^T mu,a^T Sigma
  a)に従う正本が、独立正規変数の和を共分散0の特殊ケースとして完全包含している。旧カードのsum a_i X_iの平均・分散公式は正本から直接得られる。
---
## 問題
独立な正規分布 $X_i\sim N(\mu_i,\sigma_i^2)$ $(i=1,\ldots,n)$ について $\sum_i a_iX_i$ の分布を答えよ。
## 答え
$$\sum_{i=1}^na_iX_i\sim N\left(\sum_{i=1}^na_i\mu_i,\sum_{i=1}^na_i^2\sigma_i^2\right).$$
## 使用公式・定理
独立なら和の分散は分散の和であり、正規分布は線形結合で閉じている。
## 計算例
正規分布 $X\sim N(1,4),Y\sim N(3,9)$ 独立なら $X-2Y$ は
$$N(1-6,4+4\times9)=N(-5,40).$$
## 一手
係数を平均には1乗、分散には2乗で入れる。
## 注意
独立性がないと分散に $2a_ia_j\operatorname{Cov}(X_i,X_j)$ が加わる。
