---
id: engdesign-split-plot-randomization
title: 分割法を2段階無作為化から誤差自由度まで解く
category: applied-engineering
subcategory: engineering-design
topic: split-plot-workflow-canonical
type: strategy
difficulty: 3
priority: A
hashtags:
  - 実験計画法
  - 分割法
  - 無作為化
  - 誤差項
  - 自由度
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 実験の計画と実施
archive_reason: duplicate
canonical_card: design-split-plot-error-strata
coverage_card: design-split-plot-error-strata
archive_note: 一般側の分割法正本を2段階無作為化・一次/二次実験単位・AとB/ABの誤差層・平衡計画の自由度分解まで拡張済み。r=4,a=3,b=2で自由度3,2,6,1,2,9、合計23を確認する同一数値例まで統合したため独立カード不要。
---
## 問題
反復ブロック数 $r=4$ の実験で、温度Aは炉運転単位でしか変更できず $a=3$ 水準、材料Bは各炉運転内の試験片ごとに変更でき $b=2$ 水準である。
1. 一次実験単位と二次実験単位を特定し、適切な2段階無作為化を説明せよ。
2. A、B、ABを検定するときに使う誤差項を区別せよ。
3. ブロック、A、一次誤差、B、AB、二次誤差の自由度を求め、全自由度と一致することを確認せよ。

## 記号・用語
分割法では、変更困難因子Aを受ける大きな単位を**一次実験単位（whole plot）**、その内部で変更容易因子Bを受ける小さな単位を**二次実験単位（subplot）**と呼ぶ。無作為化が2段階なので、Aに対する一次誤差とB・ABに対する二次誤差が生じる。

## 使用公式・定理
各ブロック内にAの $a$ 水準を一次単位へ無作為化し、各一次単位内でBの $b$ 水準を二次単位へ無作為化する。

平衡な分割法では自由度は
$$
df_{\mathrm{block}}=r-1,
\qquad df_A=a-1,
$$
$$
df_{E_A}=(r-1)(a-1),
$$
$$
df_B=b-1,
\qquad df_{AB}=(a-1)(b-1),
$$
$$
df_{E_B}=a(r-1)(b-1).
$$
全観測数は $rab$ なので全自由度は $rab-1$ である。Aは一次誤差 $E_A$、BとABは二次誤差 $E_B$ を分母にして検定する。

## 一手／方針
**まず「どの因子をどの単位で無作為化したか」を読む。** その階層が分かれば、Aには一次単位間の誤差、BとABには一次単位内の誤差を対応させられる。自由度公式を先に暗記しない。

## 答え
1. 炉運転が一次実験単位、各炉運転内の試験片が二次実験単位である。各ブロック内で温度Aを炉運転へ無作為化し、次に各炉運転内で材料Bを試験片へ無作為化する。

2. Aは一次誤差 $E_A$ で検定する。BとABは二次誤差 $E_B$ で検定する。同じ誤差平均平方を3つすべてへ使ってはいけない。

3. $r=4,a=3,b=2$ より
$$
df_{\mathrm{block}}=3,\qquad df_A=2,
$$
$$
df_{E_A}=3\cdot2=6,
$$
$$
df_B=1,\qquad df_{AB}=2\cdot1=2,
$$
$$
df_{E_B}=3\cdot3\cdot1=9.
$$
合計は
$$
3+2+6+1+2+9=23.
$$
一方、全観測数は $4\cdot3\cdot2=24$ なので全自由度は $24-1=23$ となり一致する。

## 計算例
Aを2水準、Bを3水準、反復ブロックを5個とすると、一次誤差自由度は
$$
(5-1)(2-1)=4,
$$
二次誤差自由度は
$$
2(5-1)(3-1)=16.
$$
Bの測定数が多くても、Aの実質的な反復数は一次実験単位数で決まる。

## 注意
分割法で最重要なのは「試験片が多いからAの標本サイズも大きい」と誤認しないこと。Aの独立な反復は炉運転などの一次実験単位である。欠測・不釣合い・より複雑な無作為化では単純な自由度分解が崩れるため、混合モデルとして扱うのが自然である。

<!-- CARD -->

---
id: engdesign-nested-df
title: 入れ子型因子の自由度を計算する
category: applied-engineering
subcategory: engineering-design
topic: nested-design
type: calc_step
difficulty: 3
priority: B
hashtags:
  - 実験の計画と実施
  - 入れ子型計画
  - 自由度
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 実験の計画と実施
archive_reason: duplicate
canonical_card: design-twoway-crossed-nested
coverage_card: design-twoway-crossed-nested
archive_note: 一般側の交差/入れ子判別正本へ df_A=a-1、df_B(A)=a(b-1)
  を統合済み。3工場×各4台の工場固有機械でA自由度2、B(A)自由度9、合計11=12-1となる同一例まで含むため完全重複。
---
## 問題
工場Aが3水準、各工場内に異なる機械Bが4台ずつある入れ子型計画で、AとB(A)の自由度を求めよ。
## 記号・用語
B(A)は機械水準が工場間で共有されず、工場内に入れ子になっていることを表す。
## 使用公式・定理
Aの自由度は $a-1$、B(A)は $a(b-1)$。
## 一手／方針
$a=3,b=4$ を各式へ代入する。
## 答え
Aは2、B(A)は $3(4-1)=9$ 自由度。
## 計算例
機械総数12の自由度11は、工場間2と工場内機械9へ分かれる。
## 注意
同じ4機種を全工場で使う交差因子なら入れ子型ではない。
