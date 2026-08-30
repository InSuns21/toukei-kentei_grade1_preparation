---
id: engdesign-randomization-permutation
title: 完全無作為化の割付表を作る
category: applied-engineering
subcategory: engineering-design
topic: randomization
type: calc_step
difficulty: 1
priority: B
hashtags:
  - 実験の計画と実施
  - 無作為化
  - 割付
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 実験の計画と実施
archive_reason: duplicate
canonical_card: design-fisher-three-principles
archive_note: 乱数順の先頭3単位をAへ割り付けるだけの操作は、無作為化の目的と実施を扱うフィッシャー3原則正本に対して独立検索単位にならない。
---
## 問題
実験単位1〜6へ処置A、Bを各3単位割り付ける。乱数順が $(4,1,6,2,5,3)$ のとき、先頭3単位をAとする割付を答えよ。
## 記号・用語
完全無作為化は制約した処置数を保ちながら全実験単位へ無作為に割り付ける。
## 使用公式・定理
乱数による置換の先頭から必要数を各処置へ割り当てる。
## 一手／方針
並びの先頭3個と残り3個を分ける。
## 答え
Aは単位4、1、6、Bは単位2、5、3である。
## 計算例
割付後は実施順も無作為化し、時間トレンドとの交絡を避ける。
## 注意
都合のよい順序へ事後変更すると無作為化の根拠を失う。

<!-- CARD -->

---
id: engdesign-subsampling-variance
title: 実験単位内の複数測定が平均分散をどれだけ減らすか計算する
category: applied-engineering
subcategory: engineering-design
topic: subsampling-variance
type: calc_step
difficulty: 2
priority: B
hashtags:
  - 実験の計画と実施
  - 反復
  - 疑似反復
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 実験の計画と実施
archive_reason: duplicate
canonical_card: design-fisher-three-principles
archive_note: 実験単位内の複数測定を独立反復と数えない点、技術的反復は独立な誤差自由度を増やさない点はフィッシャー3原則正本へ統合済み。専用の分散数値例は独立カードにしない。
---
## 問題
独立な装置効果 $U_i$ と測定誤差 $\varepsilon_{ij}$ による変量切片模型 $Y_{ij}=\mu+U_i+\varepsilon_{ij}$ を考える。各処置に装置を $n=4$ 台割り付け、各装置で $m=5$ 回測定する。$E[U_i]=E[\varepsilon_{ij}]=0$、$\operatorname{Var}(U_i)=\tau^2=9$、$\operatorname{Var}(\varepsilon_{ij})=\sigma^2=16$ のとき、処置平均の分散を求めよ。
## 記号・用語
装置平均は共通装置効果と$m$回の測定誤差平均からなる。
## 使用公式・定理
装置平均の分散は $\tau^2+\sigma^2/m$、n台の処置平均は $(\tau^2+\sigma^2/m)/n$。
## 一手／方針
まず装置内平均で測定誤差だけを$m$分の1にし、装置数nで全体を割る。
## 答え
$$\operatorname{Var}(\overline Y)=\frac{9+16/5}{4}=\frac{12.2}{4}=3.05.$$
## 計算例
$m$ を無限に増やしても分散下限は $\tau^2/n=9/4=2.25$ である。
## 注意
装置間変動が大きい場合、装置内測定数より独立装置数を増やす方が有効である。
