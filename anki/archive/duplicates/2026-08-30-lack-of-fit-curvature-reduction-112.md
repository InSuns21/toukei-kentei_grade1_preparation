---
id: engdesign-centerpoint-curvature
title: 中心点反復から曲率平方和を計算する
category: applied-engineering
subcategory: engineering-design
topic: centerpoint-curvature
type: calc_step
difficulty: 2
priority: B
hashtags:
  - 実験の計画と実施
  - 中心点
  - 曲率
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 実験の計画と実施
archive_reason: duplicate
canonical_card: engdesign-lack-of-fit-decomposition
archive_note: 中心点の曲率平方和、中心点反復による純粋誤差、残差の適合不足分解とF検定までcanonical
  cardへ統合済み。個別二次項の識別には追加設計が必要という注意も保持した。
---
## 問題
2水準要因計画の隅点観測数が $n_F=8$ で平均10、中心点観測数が $n_C=3$ で平均13である。曲率平方和を求めよ。
## 記号・用語
中心点は全因子を符号0にした条件で、隅点平均との差が一次モデルの曲率を捉える。
## 使用公式・定理
$$SS_{\mathrm{curv}}=\frac{n_Fn_C}{n_F+n_C}(\overline Y_F-\overline Y_C)^2.$$
## 一手／方針
観測数の調和的な係数へ平均差の二乗を掛ける。
## 答え
$$SS_{\mathrm{curv}}=\frac{8\cdot3}{11}(10-13)^2=\frac{216}{11}\approx19.64.$$
## 計算例
中心点反復の純粋誤差と比較して一次応答面の不足を検定する。
## 注意
曲率が有意でも、どの二次項が原因かは追加の軸点などなしには識別できない。
