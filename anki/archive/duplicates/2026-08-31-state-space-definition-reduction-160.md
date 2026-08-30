---
id: ts-state-space-definition
title: 線形ガウス状態空間モデルを定義する
category: applied-common
subcategory: applied-time-series
topic: state-space-definition
type: formula
difficulty: 2
priority: A
hashtags:
  - 状態空間モデル
  - カルマンフィルタ
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 状態空間モデル
archive_reason: duplicate
canonical_card: ts-kalman-update
archive_note: 線形ガウス状態空間モデルの状態方程式・観測方程式、状態雑音Qと観測雑音Hの役割、局所水準モデルの位置付けを、予測→観測更新まで一続きで解くKalman
  canonical cardへ統合済み。定義だけの独立カードは残さない。
---
## 問題
正規分布を用いる線形ガウス状態空間モデルの状態方程式と観測方程式を書け。
## 記号・用語
$\boldsymbol\alpha_t$ は潜在状態、$\boldsymbol y_t$ は観測、$\boldsymbol\eta_t\sim N(\boldsymbol0,Q)$ は状態雑音、$\boldsymbol\varepsilon_t\sim N(\boldsymbol0,H)$ は観測雑音である。
## 使用公式・定理
**定義（状態空間モデル）**：
$$\boldsymbol\alpha_t=T\boldsymbol\alpha_{t-1}+\boldsymbol\eta_t,\qquad \boldsymbol y_t=Z\boldsymbol\alpha_t+\boldsymbol\varepsilon_t,$$
初期状態と2種類の雑音は互いに独立とする。
## 一手／方針
時間発展を状態方程式、状態から観測への対応を観測方程式に分ける。
## 答え
潜在状態の推移と観測生成を2本の線形式で表すモデルである。
## 計算例
局所水準モデルは $\alpha_t=\alpha_{t-1}+\eta_t$、$y_t=\alpha_t+\varepsilon_t$ であり、$T=Z=1$ である。
## 注意
$Q$ と $H$ はそれぞれ状態雑音と観測雑音の分散共分散行列である。
