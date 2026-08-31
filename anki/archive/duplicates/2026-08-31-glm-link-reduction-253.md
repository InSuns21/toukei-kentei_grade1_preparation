---
id: enginf-glm-link-selection
title: 応答分布と標準リンクを対応させる
category: applied-engineering
subcategory: engineering-linear-inference
topic: glm-link-functions
type: recognition
difficulty: 1
priority: S
hashtags:
  - 一般化線形モデル
  - リンク関数
  - 分布
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 一般化線形モデル
archive_reason: duplicate
canonical_card: glm-three-components
coverage_card: glm-three-components
archive_note: 正規・二項・ポアソン応答の代表的な正準リンク（恒等・ロジット・対数）を対応させ、標準リンク以外も選択可能であることは
  glm-three-components
  が指数型分布族・自然母数・正準リンクの導出とともに既に扱っている。工学側カードは同対応表だけを切り出した特殊版である。
---
## 問題
正規・二項・ポアソン応答に対する代表的な標準リンクを答えよ。
## 記号・用語
リンク関数 $g$ は条件付き平均 $\mu$ と線形予測子 $\eta=X\beta$ を $g(\mu)=\eta$ で結ぶ。
## 使用公式・定理
代表的な正準リンクは、正規で恒等、二項でロジット、ポアソンで対数である。
## 一手／方針
平均の取り得る範囲を実数全体へ写す変換を対応させる。
## 答え
$$\text{正規}:g(\mu)=\mu,\quad
\text{二項}:g(p)=\log\frac p{1-p},\quad
\text{ポアソン}:g(\mu)=\log\mu.$$
## 計算例
ロジットと対数リンクは、それぞれ確率を $(0,1)$、平均を $(0,\infty)$ に保つ。
## 注意
標準リンク以外も選べるため、分布だけからリンクが一意に決まるわけではない。
