---
id: data-anova-decomposition
title: 一元配置分散分析の平方和を分解する
category: math-data-analysis
subcategory: math-anova
topic: sums-of-squares
type: expansion
difficulty: 2
priority: S
hashtags:
  - 分散分析
  - 平方和
  - 分散分析
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 分散分析
archive_reason: duplicate
canonical_card: anova-oneway-f-statistic
archive_note: 一元配置ANOVAの平方和分解はモデル、自由度、F統計量、数値検算まで含むcanonical cardへ完全包含されている。
---
## 問題
観測 $y_{ij}$ の全平方和を群間平方和と群内平方和へ分解せよ。
## 答え
$y_{ij}-\overline y=(y_{ij}-\overline y_i)+(\overline y_i-\overline y)$ と分ける。
## 使用公式・定理
一元配置の平方和分解は
$$SS_T=SS_B+SS_W.$$
## 計算例
交差項は各群で $\sum_j(y_{ij}-\overline y_i)=0$ だから消え、
$$\sum_{i,j}(y_{ij}-\overline y)^2=\sum_i n_i(\overline y_i-\overline y)^2+\sum_{i,j}(y_{ij}-\overline y_i)^2.$$
数値例 $y_1=(1,3)$、$y_2=(2,4)$ では $\overline y=2.5$、群平均は $2,3$ である。
$$SS_T=5,\qquad SS_B=1,\qquad SS_W=4,$$
よって $5=1+4$ と確認できる。
## 重要な一手
群平均を足して引く。

<!-- CARD -->

---
id: data-bootstrap-mean
title: ブートストラップで標準誤差を推定する
category: math-data-analysis
subcategory: math-simulation
topic: bootstrap
type: strategy
difficulty: 2
priority: B
hashtags:
  - ブートストラップ
  - シミュレーション
  - 標準誤差
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ブートストラップ
archive_reason: duplicate
canonical_card: boot-empirical-distribution
archive_note: 経験分布から復元抽出し同じ統計量を再計算して標準誤差を求める一連の操作をcanonical cardへ統合済み。
---
## 問題
標本 $x=(1,2,3)$ から標本平均の標準誤差をブートストラップで推定する手順は？
## 方針
経験分布からサイズ3の復元抽出を繰り返し、再標本平均の標準偏差を取る。
## 使用公式・定理
ブートストラップ標準誤差は、再標本統計量 $T^{*(1)},\ldots,T^{*(B)}$ の標本標準偏差
$$\widehat{\operatorname{se}}_{\mathrm{boot}}=\sqrt{\frac1{B-1}\sum_{b=1}^B(T^{*(b)}-\overline T^*)^2}.$$
## 計算例
再標本 $(1,1,3),(2,3,3),(1,2,2)$ の平均は $5/3,8/3,5/3$。実際には多数回 $B$ 反復し、
$$\widehat{\mathrm{se}}_{\mathrm{boot}}=\sqrt{\frac1{B-1}\sum_{b=1}^B(\overline x^{*(b)}-\overline{\overline x^*})^2}.$$
この3反復では平均の平均が $2$ だから
$$\begin{aligned}\widehat{\mathrm{se}}_{\mathrm{boot}}&=\sqrt{\frac{(5/3-2)^2+(8/3-2)^2+(5/3-2)^2}{3-1}}\\&=\sqrt{\frac{1/9+4/9+1/9}{2}}\\&=\sqrt{\frac13}.\end{aligned}$$
これは手順確認用の粗い値であり、実用上は十分大きい $B$ を使う。
## 注意
元標本から非復元抽出しない。

<!-- CARD -->

---
id: multi-pca-eigen
title: 最大分散方向を固有ベクトルで求める
category: applied-engineering
subcategory: engineering-multivariate
topic: principal-component
type: strategy
difficulty: 3
priority: A
hashtags:
  - 主成分分析
  - 固有値
  - Rayleigh商
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 固有値と固有ベクトル
archive_reason: duplicate
canonical_card: mv-pca-variance-max
archive_note: 最大分散方向から固有値問題を導く内容は、共分散・相関行列の選択、寄与率、主成分得点まで含むPCA canonical cardへ包含されている。
---
## 問題
$\boldsymbol\Sigma=\begin{pmatrix}2&1\\1&2\end{pmatrix}$ の第1主成分方向を求めよ。
## 方針
$\|\boldsymbol a\|=1$ の下で $\boldsymbol a^{\mathsf T}\boldsymbol\Sigma\boldsymbol a$ を最大化するので、最大固有値の固有ベクトルを取る。
## 使用公式・定理
Rayleigh商の最大化：対称行列 $\boldsymbol\Sigma$ に対し
$$\max_{\boldsymbol a^{\mathsf T}\boldsymbol a=1}\boldsymbol a^{\mathsf T}\boldsymbol\Sigma\boldsymbol a=\lambda_{\max}.$$
## 計算例
まず特性方程式を解く。
$$\begin{aligned}0&=\det(\boldsymbol\Sigma-\lambda\boldsymbol I_2)\\&=\det\begin{pmatrix}2-\lambda&1\\1&2-\lambda\end{pmatrix}\\&=(2-\lambda)^2-1\\&=(\lambda-3)(\lambda-1).\end{aligned}$$
よって固有値は $3,1$。最大固有値 $3$ について
$$\begin{pmatrix}-1&1\\1&-1\end{pmatrix}\begin{pmatrix}a_1\\a_2\end{pmatrix}=\boldsymbol0$$
から $a_1=a_2$。長さを1に正規化して
$$\boldsymbol a=\frac1{\sqrt2}(1,1)^{\mathsf T}.$$
## 注意
固有ベクトルの符号反転は同じ主成分方向を表す。

<!-- CARD -->

---
id: process-ar1-stationary
title: AR(1)過程の定常分散を解く
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: ar1
type: strategy
difficulty: 3
priority: A
hashtags:
  - AR
  - 時系列解析
  - 定常性
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: AR・MA・ARIMA
archive_reason: duplicate
canonical_card: ts-ar1-acf
archive_note: AR(1)定常分散の導出は定常平均・分散・自己相関を一続きで導くcanonical cardへ包含されている。
---
## 問題
$X_t=0.5X_{t-1}+\varepsilon_t$、$E[\varepsilon_t]=0$、$\operatorname{Var}(\varepsilon_t)=3$ で、革新は過去と独立である。弱定常分散を求めよ。
## 方針
両辺の分散を取り、定常性 $\operatorname{Var}(X_t)=\operatorname{Var}(X_{t-1})$ を使う。
## 使用公式・定理
$X_t=\phi X_{t-1}+\varepsilon_t$、$|\phi|<1$、革新分散 $\sigma_\varepsilon^2$ なら
$$\gamma(0)=\frac{\sigma_\varepsilon^2}{1-\phi^2}.$$
## 計算例
$$\begin{aligned}\gamma(0)&=0.5^2\gamma(0)+3,\\{}(1-0.25)\gamma(0)&=3,\\{}\gamma(0)&=3/0.75=4.\end{aligned}$$
## 注意
弱定常解の条件は $|0.5|<1$ である。

<!-- CARD -->

---
id: boot-bias-corrected-estimator
title: ブートストラップのバイアス補正値を求める
category: math-data-analysis
subcategory: math-simulation
topic: bootstrap-bias-correction
type: calc_step
difficulty: 2
priority: C
hashtags:
  - ブートストラップ
  - バイアス補正
  - 推定量
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ブートストラップ
archive_reason: duplicate
canonical_card: boot-bias-estimate
archive_note: バイアス推定値から補正推定値まで同じ2量で連続計算するcanonical cardへ統合済み。
---
## 問題
$\widehat\theta=10,\ \bar\theta^*=10.6$ のとき、1次のブートストラップ・バイアス補正値を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

補正推定量＝元の推定量－推定バイアス。

## 答え
推定バイアスは0.6なので
$$\widehat\theta_{\mathrm{bc}}
=\widehat\theta-(\bar\theta^*-\widehat\theta)
=2\widehat\theta-\bar\theta^*
=9.4.$$

## 計算例
元の推定値を下方へ0.6補正する。

## 注意
バイアス補正により分散や平均二乗誤差が必ず減るとは限らない。

<!-- CARD -->

---
id: boot-basic-ci
title: ブートストラップの基本区間（basic区間）を計算する
category: math-data-analysis
subcategory: math-simulation
topic: bootstrap-basic-interval
type: calc_step
difficulty: 3
priority: C
hashtags:
  - ブートストラップ
  - 基本区間
  - 区間推定
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: Percentile区間
archive_reason: duplicate
canonical_card: boot-percentile-ci
archive_note: 同一のブートストラップ分位点からパーセンタイル区間とbasic区間を比較計算するcanonical cardへ統合済み。
---
## 問題
$\widehat\theta=2.5$、ブートストラップ分位点が $q_{0.025}^*=0.8,\ q_{0.975}^*=3.4$ のとき95%基本区間（basic区間）を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$\widehat\theta^*-\widehat\theta$ の分布で $\widehat\theta-\theta$ を近似し、分位点を反転する。

## 答え
$$[2\widehat\theta-q_{0.975}^*,\,2\widehat\theta-q_{0.025}^*]
=[5-3.4,\,5-0.8]=[1.6,4.2].$$

## 計算例
パーセンタイル区間 $[0.8,3.4]$ とは異なる。

## 注意
上下の分位点の順序が反転する。

<!-- CARD -->

---
id: jackknife-standard-error
title: ジャックナイフ法の標準誤差を計算する
category: math-data-analysis
subcategory: math-simulation
topic: jackknife-standard-error
type: calc_step
difficulty: 3
priority: C
hashtags:
  - ジャックナイフ法
  - 標準誤差
  - 数値計算
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ブートストラップ
archive_reason: duplicate
canonical_card: jackknife-leave-one-out
archive_note: delete-one推定値の生成から専用係数を使うジャックナイフ標準誤差までcanonical cardへ統合済み。
---
## 問題
$n=3$ の1個抜き推定値が $(4,3.5,1.5)$ で平均が3である。ジャックナイフ法の標準誤差を求めよ。

## 記号・用語
- SE：標準誤差（standard error）

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

ジャックナイフ法の分散係数は $(n-1)/n$。

## 答え
$$\widehat{\operatorname{SE}}_{\mathrm{jack}}
=\sqrt{\frac{n-1}{n}\sum_{i=1}^n
(\widehat\theta_{(-i)}-\bar\theta_{(-\cdot)})^2}.$$
したがって
$$\sqrt{\frac23\{1^2+0.5^2+(-1.5)^2\}}
=\sqrt{\frac73}\approx1.528.$$

## 計算例
偏差平方和は3.5。

## 注意
通常の標本分散の係数 $1/(n-1)$ と混同しない。
