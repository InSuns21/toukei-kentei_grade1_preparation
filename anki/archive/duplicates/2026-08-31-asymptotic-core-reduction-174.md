---
id: asym-slutsky-example
title: Slutskyの定理で確率収束する分母を置き換える
category: math-estimation
subcategory: math-asymptotic-estimation
topic: slutsky-ratio-example
type: calc_step
difficulty: 3
priority: A
hashtags:
  - Slutskyの定理
  - 分布収束
  - 確率収束
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 収束の概念
archive_reason: duplicate
canonical_card: asym-slutsky
coverage_card: asym-slutsky
archive_note: Slutskyの和・積・商とN(0,4)を2で割る数値例まで正本へ統合済み。
---
## 問題
$X_n$ は正規分布 $N(0,4)$ へ分布収束し、$Y_n\xrightarrow{p}2$ とする。$X_n/Y_n$ の極限分布を求めよ。

## 記号・用語
- $\xrightarrow{d}$：分布収束

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

Slutskyの定理：$X_n\xrightarrow{d}X$、$Y_n\xrightarrow{p}c$ で $c\ne0$ なら
$$\frac{X_n}{Y_n}\xrightarrow{d}\frac Xc.$$

## 答え
$X\sim N(0,4)$ を定数2で割るので、極限分布は $N(0,1)$ である。

## 計算例
$X\sim N(0,4)$ なら $X/2$ の分散は
$$\operatorname{Var}\left(\frac X2\right)
=\frac1{2^2}\operatorname{Var}(X)=\frac44=1.$$
したがって
$$\frac{X_n}{Y_n}\xrightarrow{d}\frac X2\sim N(0,1).$$

## 注意
$Y_n$ の極限が0なら、除算にこの形のSlutskyの定理は使えない。

<!-- CARD -->

---
id: engasym-slutsky-studentization
title: Slutskyの定理で未知分散の標準化を正当化する
category: applied-engineering
subcategory: engineering-asymptotics
topic: slutsky-theorem
type: calc_step
difficulty: 2
priority: S
hashtags:
  - 漸近理論
  - Slutskyの定理
  - 標準化
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 中心極限定理
archive_reason: duplicate
canonical_card: asym-slutsky
coverage_card: asym-slutsky
archive_note: S_n^2の一致性からS_n/sigma→p1を作り、未知分散でstudentizeした平均が標準正規極限を持つ導出まで正本へ統合済み。
---
## 問題
$\sqrt n(\widehat\theta-\theta)/\sigma\xrightarrow{d}N(0,1)$、$\widehat\sigma\xrightarrow{p}\sigma>0$ のとき、$\sigma$ を $\widehat\sigma$ で置換できることを示せ。（ここで $N$ は正規分布を表す。）
## 記号・用語
Slutskyの定理は分布収束する量と確率収束する量の和・積・商の極限を与える。
## 使用公式・定理
$A_n\xrightarrow{d}A$、$B_n\xrightarrow{p}b$ なら $A_n/B_n\xrightarrow{d}A/b$（$b\ne0$）。
## 一手／方針
統計量を既知分散標準化と分散比の積へ分ける。
## 答え
$$\frac{\sqrt n(\widehat\theta-\theta)}{\widehat\sigma}
=\frac{\sqrt n(\widehat\theta-\theta)}{\sigma}\frac{\sigma}{\widehat\sigma}
\xrightarrow{d}N(0,1)\cdot1=N(0,1).$$
## 計算例
標本平均の中心極限定理で母標準偏差を一致推定量へ置換する根拠になる。
## 注意
$\widehat\sigma$ が0でないことが高確率で保証される必要がある。

<!-- CARD -->

---
id: engasym-continuous-mapping-plugin
title: 連続写像定理でプラグイン推定量の一致性を示す
category: applied-engineering
subcategory: engineering-asymptotics
topic: continuous-mapping
type: calc_step
difficulty: 2
priority: A
hashtags:
  - 一致性
  - 連続写像定理
  - プラグイン推定
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 一致性
archive_reason: duplicate
canonical_card: asym-continuous-mapping
coverage_card: asym-continuous-mapping
archive_note: 確率収束版の連続写像定理、p_hat(1-p_hat)の一致性、p_hat=0.36・n=400で標準誤差0.024のプラグイン例まで正本へ統合済み。
---
## 問題
$\widehat\theta_n\xrightarrow{p}\theta$ で、$g$ が $\theta$ で連続なら、$g(\widehat\theta_n)$ の収束先を答えよ。
## 記号・用語
プラグイン推定量は未知母数をその推定量へ置換して作る量である。
## 使用公式・定理
連続写像定理：$X_n\xrightarrow{p}X$ かつ $g$ が連続なら $g(X_n)\xrightarrow{p}g(X)$。
## 一手／方針
推定対象の関数が真値で連続かを確認する。
## 答え
$$g(\widehat\theta_n)\xrightarrow{p}g(\theta).$$
## 計算例
$\widehat\lambda\xrightarrow{p}\lambda>0$ なら $e^{-\widehat\lambda t}\xrightarrow{p}e^{-\lambda t}$。
## 注意
不連続点ではこの結論を直接使えない。

<!-- CARD -->

---
id: engasym-score-wald-lr-equivalence
title: Wald・Score・尤度比検定の漸近的関係を答える
category: applied-engineering
subcategory: engineering-asymptotics
topic: asymptotic-tests
type: recognition
difficulty: 3
priority: S
hashtags:
  - 漸近理論
  - Wald検定
  - 尤度比検定
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 最尤推定量の漸近正規性
archive_reason: duplicate
canonical_card: test-lr-wald-score-comparison
coverage_card: test-lr-wald-score-comparison
archive_note: 尤度比・ワルド型・スコア型の評価点、共通chi-square極限、統計量差o_p(1)、有限標本差、境界母数の非正則性まで検定正本へ統合済み。
---
## 問題
正則な1次元モデルで、Wald・Score・尤度比検定の帰無仮説下の漸近分布と違いを答えよ。
## 記号・用語
Waldは非制約推定値、Scoreは帰無値でのスコア、尤度比は制約・非制約尤度を使う。
## 使用公式・定理
正則条件下では3統計量はいずれも帰無仮説下で漸近的に $\chi_1^2$ に従い、局所的に同等である。
## 一手／方針
計算に必要な推定点の違いと共通の極限分布を分けて整理する。
## 答え
3検定は大標本で同じ一次漸近結論を与えるが、有限標本値は異なる。Scoreは制約下推定だけ、Waldは非制約推定、尤度比は両方を必要とする。
## 計算例
一般化線形モデルの係数検定ではソフトウェアがWald $z$ と逸脱度差を別々に表示することがある。
## 注意
境界母数ではカイ二乗極限が変わり得る。
