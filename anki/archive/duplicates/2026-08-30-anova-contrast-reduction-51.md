---
id: anova-contrast-se
title: 対比推定量の標準誤差を求める
category: math-data-analysis
subcategory: math-anova
topic: contrast-se
type: formula
difficulty: 3
priority: A
hashtags:
  - 対比
  - 標準誤差
  - t検定
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 一元配置分散分析
archive_reason: duplicate
canonical_card: anova-contrast-definition
archive_note: 対比推定量の分散・標準誤差を、対比の定義からt検定まで通す正本へ統合済み。
---
## 問題
独立な群平均から作る対比 $\widehat L=\sum_i c_i\overline Y_{i\cdot}$ の標準誤差を書け。

## 記号・用語
- SE：標準誤差（standard error）

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

独立な確率変数の線形結合の分散は分散の係数二乗和。

## 答え
$$\operatorname{Var}(\widehat L)=\sigma^2\sum_i\frac{c_i^2}{n_i}$$
より、$\sigma^2$ を $MS_E$ で置換して
$$\operatorname{SE}(\widehat L)=\sqrt{MS_E\sum_i\frac{c_i^2}{n_i}}.$$

## 計算例
2群差の係数を $(c_1,c_2)=(1,-1)$、$n_1=5,n_2=8,MS_E=4$ とすると
$$\operatorname{SE}(\widehat L)
=\sqrt{4\left(\frac{1^2}{5}+\frac{(-1)^2}{8}\right)}
=\sqrt{1.3}\approx1.140.$$

## 注意
t統計量の自由度は分散分析の誤差自由度 $N-a$。

<!-- CARD -->

---
id: anova-contrast-numeric
title: 計画対比のt検定を数値で行う
category: math-data-analysis
subcategory: math-anova
topic: contrast-numeric
type: calc_step
difficulty: 3
priority: A
hashtags:
  - 計画対比
  - t検定
  - 数値計算
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 一元配置分散分析
archive_reason: duplicate
canonical_card: anova-contrast-definition
archive_note: 計画対比の数値t検定と信頼区間を、係数和0・標準誤差の導出を含む正本へ統合済み。
---
## 問題
各観測が独立な正規分布に従い、全群で分散が共通であるとする。3群に各5個の観測があり、群平均は $(10,13,15)$、誤差平均平方は $MS_E=4$ だった。対比 $L=\mu_1-(\mu_2+\mu_3)/2$ について $H_0:L=0$ を両側5%で検定せよ。誤差自由度12のt分布の両側臨界値を2.179とする。

## 記号・用語
- SE：標準誤差（standard error）

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$t=\widehat L/\operatorname{SE}(\widehat L)\sim t_{N-a}$。

## 答え
$$\widehat L=10-(13+15)/2=-4.$$
$$\operatorname{SE}=\sqrt{4\left(\frac15+\frac{(1/2)^2}{5}+\frac{(1/2)^2}{5}\right)}
=\sqrt{1.2}.$$
したがって
$$t=\frac{-4}{\sqrt{1.2}}\approx-3.65,$$
自由度は $15-3=12$。両側5%点 $t_{12,0.025}=2.179$ より棄却する。

## 計算例
まず係数和は $1-1/2-1/2=0$ なので対比である。推定値は
$$\widehat L=10-\frac{13+15}{2}=-4.$$
標準誤差は
$$\sqrt{4\left(\frac15+\frac{1/4}{5}+\frac{1/4}{5}\right)}
=\sqrt{1.2}\approx1.095.$$
したがって
$$t=\frac{-4}{1.095}\approx-3.65.$$
$|t|=3.65>2.179$ なので $H_0:L=0$ を棄却する。

## 注意
データ確認後に選んだ対比では多重性への配慮が必要。
