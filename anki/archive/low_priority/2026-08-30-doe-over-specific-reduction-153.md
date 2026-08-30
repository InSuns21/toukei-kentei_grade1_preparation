---
id: engdesign-latin-square-treatment-mean
title: ラテン方格の処置平均を配置から集計する
category: applied-engineering
subcategory: engineering-design
topic: latin-square-calculation
type: calc_step
difficulty: 2
priority: B
hashtags:
  - ブロック化
  - ラテン方格法
  - 処置平均
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ブロック化
archive_reason: low_priority
archive_note: ラテン方格配置から3観測を拾って平均するだけの計算は、ブロック化の理解に追加する独立技能が乏しいため隔離する。
---
## 問題
3×3ラテン方格で処置Aがセル $(1,1),(2,2),(3,3)$ に配置され、応答が8、11、14であった。Aの処置平均を求めよ。
## 記号・用語
処置平均は行や列の位置ではなく、同じ処置記号が置かれたセルを集計する。
## 使用公式・定理
$k(i,j)$ をセル $(i,j)$ に割り付けた処置記号とすると、$\overline Y_A=p^{-1}\sum_{(i,j):k(i,j)=A}Y_{ij}$。
## 一手／方針
Aが現れる3セルだけを足して3で割る。
## 答え
$\overline Y_A=(8+11+14)/3=11$。
## 計算例
行平均や対角平均と一致するのはこの配置例だけで、一般には処置記号を追って集計する。
## 注意
ラテン方格の処置割付は標準方格を無作為に行・列・処置ラベル置換して作る。
