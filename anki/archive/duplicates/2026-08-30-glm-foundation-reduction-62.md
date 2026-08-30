---
id: glm-exponential-family
title: 1母数指数型分布族の形を書く
category: applied-common
subcategory: applied-multivariate
topic: exponential-family
type: formula
difficulty: 3
priority: B
hashtags:
  - 一般化線形モデル
  - 指数型分布族
  - 自然母数
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 指数型分布族
archive_reason: duplicate
canonical_card: glm-three-components
archive_note: 指数型分布族の標準形、自然母数、平均・分散の導出を一般化線形モデル正本へ統合済み。
---
## 問題
一般化線形モデルで使う指数型分布族の密度・確率質量関数の標準形を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$\theta$ は自然母数、$\phi$ は分散母数。

## 答え
$$f(y;\theta,\phi)=\exp\left\{\frac{y\theta-b(\theta)}{a(\phi)}+c(y,\phi)\right\}.$$
$$E[Y]=b'(\theta),\qquad \operatorname{Var}(Y)=a(\phi)b''(\theta).$$

## 計算例
ポアソン分布では $\theta=\log\mu,b(\theta)=e^\theta,a(\phi)=1$。

## 注意
分布ごとに台を確認する。

<!-- CARD -->

---
id: glm-canonical-links
title: 代表的一般化線形モデルの正準リンクを対応させる
category: applied-common
subcategory: applied-multivariate
topic: canonical-link
type: recognition
difficulty: 2
priority: B
hashtags:
  - 一般化線形モデル
  - 正準リンク
  - リンク関数
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 正準リンク
archive_reason: duplicate
canonical_card: glm-three-components
archive_note: 正準リンクの定義と正規・二項・ポアソンの対応を一般化線形モデル正本へ統合済み。
---
## 問題
正規分布、二項分布、ポアソン分布の正準リンクを答えよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

正準リンクは $g(\mu)=\theta$ として線形予測子を自然母数へ一致させる。

## 答え
正規分布は恒等リンク $g(\mu)=\mu$、二項分布はlogitリンク $g(p)=\log\{p/(1-p)\}$、ポアソン分布は対数リンク $g(\mu)=\log\mu$。

## 計算例
ガンマ分布の正準リンクは逆数型。

## 注意
正準リンク以外も使用できる。
