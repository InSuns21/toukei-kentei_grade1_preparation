---
id: reg-overall-f-r2
title: R二乗から全体F統計量を計算する
category: math-data-analysis
subcategory: math-regression
topic: overall-f-r2
type: calc_step
difficulty: 3
priority: S
hashtags:
  - 決定係数
  - F検定
  - 重回帰
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 回帰の分散分析
archive_reason: duplicate
canonical_card: reg-overall-f-test
archive_note: 決定係数から全体F統計量を求める式を、平方和表示との同値性・数値判定まで含む正本へ統合済み。
---
## 問題
固定された列フルランクの計画行列の下で、誤差が独立な正規分布に従い共通分散を持つ重回帰を考える。標本サイズ $n=30$、切片以外の説明変数数 $p=3$、決定係数 $R^2=0.40$ から全体F統計量を求めよ。

## 記号・用語
- SSE：残差平方和（sum of squared errors）
- SSR：回帰平方和（regression sum of squares）
- SST：全平方和（total sum of squares）

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$SSR=R^2SST$、$SSE=(1-R^2)SST$ を全体F式へ代入する。

## 答え
$$F=\frac{R^2/p}{(1-R^2)/(n-p-1)}
=\frac{0.40/3}{0.60/26}
=\frac{52}{9}\approx5.78.$$
自由度は $(3,26)$。

## 計算例
$$F=\frac{R^2/p}{(1-R^2)/(n-p-1)}
=\frac{0.40/3}{0.60/26}
=\frac{52}{9}\approx5.78.$$
自由度は $(3,26)$。5%臨界値を2.98とすれば $5.78>2.98$ なので、切片以外の係数が全て0という帰無仮説を棄却する。

## 注意
切片を含む通常の $R^2$ を前提とする。

<!-- CARD -->

---
id: reg-partial-f-numeric
title: 部分F検定を数値で完遂する
category: math-data-analysis
subcategory: math-regression
topic: partial-f-numeric
type: calc_step
difficulty: 3
priority: S
hashtags:
  - 部分F検定
  - 重回帰
  - 棄却判断
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 回帰の分散分析
archive_reason: duplicate
canonical_card: reg-partial-f-test
archive_note: 入れ子モデルの部分F検定の数値計算と臨界値判定を一般式の正本へ統合済み。
---
## 問題
固定された列フルランクの計画行列の下で誤差が独立な正規分布に従い、共通分散を持つ重回帰を考える。標本サイズ $n=30$、完全モデルの切片以外の説明変数数 $p_F=4$、縮小モデルの残差平方和 $SSE_R=100$、完全モデルの残差平方和 $SSE_F=70$、追加変数数 $q=2$ である。5%臨界値 $F_{2,25,0.05}=3.39$ として判定せよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

分母自由度は完全モデルの $n-p_F-1=25$。

## 答え
$$F=\frac{(100-70)/2}{70/(30-4-1)}
=\frac{15}{2.8}\approx5.36.$$
$5.36>3.39$ なので、追加した2係数がともに0という帰無仮説を棄却する。

## 計算例
$$SSE_R-SSE_F=100-70=30,$$
$$\frac{SSE_R-SSE_F}{q}=\frac{30}{2}=15,$$
$$\frac{SSE_F}{n-p_F-1}=\frac{70}{25}=2.8.$$
したがって
$$F=15/2.8\approx5.36>3.39,$$
より、追加した2係数がともに0という帰無仮説を棄却する。

## 注意
どちらの追加係数が重要かは個別検定などで別に調べる。

<!-- CARD -->

---
id: reg-f-equals-t-squared
title: 1係数の部分Fとt二乗の一致を示す
category: math-data-analysis
subcategory: math-regression
topic: f-t-equivalence
type: calc_step
difficulty: 4
priority: A
hashtags:
  - F検定
  - t検定
  - 回帰係数
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 回帰の分散分析
archive_reason: duplicate
canonical_card: reg-partial-f-test
archive_note: 1係数追加時に部分F統計量が同じ係数のt統計量の二乗に一致する導出を正本へ統合済み。
---
## 問題
正規線形回帰モデルで追加係数が1個だけの部分F検定と、その係数の両側t検定の関係を書け。両検定は同じ完全モデルの誤差分散推定値と自由度を使うものとする。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

自由度1のカイ二乗と標準正規の二乗、対応するtとFの関係。

## 答え
1制約 $H_0:\beta_j=0$ では
$$F_{1,n-p-1}=T_{n-p-1}^2.$$
したがって
$$P(F\ge t_{\mathrm{obs}}^2)=P(|T|\ge|t_{\mathrm{obs}}|)$$
で、両検定のP値と結論は一致する。

## 計算例
$t=-2.5$ なら $F=6.25$。

## 注意
F検定だけでは係数の符号は分からない。
