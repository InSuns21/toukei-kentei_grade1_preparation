---
id: engasym-delta-odds-ratio
title: 2×2表の対数オッズ比の標準誤差を求める
category: applied-engineering
subcategory: engineering-asymptotics
topic: delta-odds-ratio
type: calc_step
difficulty: 2
priority: A
hashtags:
  - デルタ法
  - オッズ比
  - 漸近分散
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: デルタ法
archive_reason: duplicate
canonical_card: cat-log-odds-ratio-ci
coverage_card: cat-log-odds-ratio-ci
archive_note: 2×2表のオッズ比を対数尺度へ移し、SE(log OR)=sqrt(1/a+1/b+1/c+1/d)
  を使って正規近似区間を作り指数変換で戻す判断単位は分割表側の正本と同一。正本はデルタ法として明示し、OR=1を基準とする解釈まで扱うためengineering側専用カードは重複。
---
## 問題
2×2表のセル度数が $a=40,b=20,c=10,d=30$ のとき、$\log\widehat{OR}$ の近似標準誤差を求めよ。
## 記号・用語
$\widehat{OR}=ad/(bc)$ は標本オッズ比である。
## 使用公式・定理
$$\operatorname{SE}(\log\widehat{OR})\approx\sqrt{1/a+1/b+1/c+1/d}.$$
## 一手／方針
4セルの逆数を足して平方根を取る。
## 答え
$$SE=\sqrt{1/40+1/20+1/10+1/30}
=\sqrt{0.20833}\approx0.456.$$
## 計算例
$\widehat{OR}=6$、$\log\widehat{OR}\approx1.792$。
## 注意
セル度数が小さい場合は正規近似の精度に注意する。
