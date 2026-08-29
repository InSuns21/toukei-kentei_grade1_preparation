---
id: ms-info-criterion-likelihood
title: 情報量規準が最大化対数尤度で比較することを確認する
category: math-estimation
subcategory: math-model-selection
topic: info-criterion-likelihood
type: formula
difficulty: 1
priority: C
hashtags:
  - 情報量規準AIC
  - ベイズ情報量規準
  - 尤度
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: モデル評価基準
archive_reason: reference_only
canonical_card: ms-bic-numeric-comparison
archive_note: AIC/BICが最大化対数尤度と母数数を使うというメタ説明は、AIC/BICの数値比較カードから直ちに読める。独立した試験moveではない。
---
## 問題
AICやBICが、異なるモデル間で何を共通の尺度として比較しているか答えよ。
## 答え
どちらも同一データの最大化対数尤度（あてはめの良さ）を基底とし、母数数のペナルティを加える。
## 使用公式・定理
比較対象は $\ell(\widehat\theta)=\sum_{i=1}^n\log f(X_i;\widehat\theta)$ と $k$ のみ。
## 計算例
母数数の異なる正規線形モデル同士を比べるとき、残差分散が小さい（対数尤度が大きい）ほど良いが、複雑さで減点する。
## 注意
尤度の定義（密度の積）が同一標本で正当であることが前提。
