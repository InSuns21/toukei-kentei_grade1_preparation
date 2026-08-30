---
id: design-defining-relation
title: 生成式から定義関係を求める
category: applied-common
subcategory: applied-design
topic: defining-relation
type: calc_step
difficulty: 3
priority: B
hashtags:
  - 一部実施要因計画
  - 定義関係
  - 生成式
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 部分実施要因計画
archive_reason: duplicate
canonical_card: design-fraction-generator
archive_note: 生成式からI=の定義関係へ直す操作は、一部実施計画を生成子から構成するcanonical cardへ統合済み。
---
## 問題
$2^{4-1}$ 計画の生成式が $D=ABC$ のとき定義関係を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

±1列は二乗すると恒等列Iになる。

## 答え
両辺へDを掛け、$D^2=I$ を用いると
$$I=ABCD.$$

## 計算例
この定義語の最短文字数は4なのでresolution IV。

## 注意
複数生成子がある場合は生成子同士の積も定義関係へ含める。

<!-- CARD -->

---
id: design-fraction-run-saving
title: 一部実施計画の実験点削減数を計算する
category: applied-common
subcategory: applied-design
topic: fractional-run-count
type: calc_step
difficulty: 2
priority: B
hashtags:
  - 一部実施要因計画
  - 実験点数
  - 効率
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 部分実施要因計画
archive_reason: duplicate
canonical_card: design-fraction-generator
archive_note: p個の独立生成子に対する実験点数2^(k-p)と削減率はcanonical cardへ統合済み。
---
## 問題
6因子2水準の完全要因計画と $2^{6-2}$ の1/4実施計画の実験点数を比較せよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

p個の独立生成子を使う $2^{k-p}$ 計画は完全計画の $1/2^p$。

## 答え
完全計画は
$$2^6=64\text{ 点},$$
1/4実施は
$$2^{6-2}=16\text{ 点}.$$
48点、75%を削減する。

## 計算例
反復2回なら実験単位数は32。

## 注意
削減と引き換えに効果間のaliasが生じる。

<!-- CARD -->

---
id: engdesign-fractional-run-table
title: 生成式から一部実施計画の実験表を作る
category: applied-engineering
subcategory: engineering-design
topic: fractional-factorial-table
type: calc_step
difficulty: 2
priority: B
hashtags:
  - 交絡法
  - 一部実施要因計画
  - 実験表
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 交絡法
archive_reason: duplicate
canonical_card: design-fraction-generator
archive_note: C=ABから半実施の符号列と4実施を作る計算はcanonical cardと完全に重複するため統合済み。
---
## 問題
A、Bの4組 $(--),(+-),(-+),(++)$ に対し $C=AB$ として $2^{3-1}$ 計画のC列を作れ。
## 記号・用語
各行のC符号はA符号とB符号の積である。
## 使用公式・定理
$(-)(-)=+$、$(+)(-)=-$、$(-)(+)=-$、$(+)(+)=+$。
## 一手／方針
各行でA列とB列を掛ける。
## 答え
C列は $(+,-,-,+)$。
## 計算例
採用する4実施は $(--+),(+--),(-+-),(+++)$。
## 注意
生成式の符号を反転した $C=-AB$ は補完するもう一方の半実施になる。

<!-- CARD -->

---
id: engdesign-two-generator-defining-group
title: 2個の生成子から完全な定義対比群を作る
category: applied-engineering
subcategory: engineering-design
topic: multiple-generators
type: calc_step
difficulty: 2
priority: B
hashtags:
  - 交絡法
  - 一部実施要因計画
  - 定義関係
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 交絡法
archive_reason: duplicate
canonical_card: design-fraction-generator
archive_note: D=AB,E=ACからI=ABD=ACE=BCDEを作る複数生成子の定義対比群はcanonical cardへ統合済み。
---
## 問題
$2^{5-2}$ 計画で生成式 $D=AB$、$E=AC$ を使う。完全な定義対比群を求めよ。
## 記号・用語
独立生成子2個から、それぞれの定義語と両者の積を作る。
## 使用公式・定理
$D=AB$ から $I=ABD$、$E=AC$ から $I=ACE$。定義語同士も掛ける。
## 一手／方針
$ABD\cdot ACE$ で同じ文字を消す。
## 答え
$(ABD)(ACE)=BCDE$ より
$$I=ABD=ACE=BCDE.$$
## 計算例
定義対比群の語数は $2^2=4$ である。
## 注意
生成子が独立であることを確認し、積で得られる語を落とさない。

<!-- CARD -->

---
id: design-resolution-levels
title: 一部実施計画のresolutionを解釈する
category: applied-common
subcategory: applied-design
topic: fractional-resolution
type: recognition
difficulty: 4
priority: B
hashtags:
  - 一部実施要因計画
  - resolution
  - alias
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 部分実施要因計画
archive_reason: duplicate
canonical_card: design-alias-structure
archive_note: 解像度III・IV・Vと低次効果の別名関係は、別名構造から解像度と推定可能性を判定するcanonical cardへ統合済み。
---
## 問題
resolution III、IV、V計画で主効果と2因子交互作用の主なalias関係を述べよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

resolutionは定義関係中の非恒等語の最短文字数。

## 答え
IIIでは主効果が2因子交互作用とalias。IVでは主効果は2因子交互作用とaliasしないが、2因子同士がalias。Vでは主効果は4因子以上、2因子交互作用は3因子以上とaliasする。

## 計算例
$I=ABCD$ はresolution IV。

## 注意
高次交互作用が無視できるという効果の疎性を利用する。

<!-- CARD -->

---
id: engdesign-alias-estimability-choice
title: 別名構造から推定可能な効果を選ぶ
category: applied-engineering
subcategory: engineering-design
topic: alias-estimability
type: calc_step
difficulty: 2
priority: B
hashtags:
  - 交絡法
  - 別名構造
  - 一部実施要因計画
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 交絡法
archive_reason: duplicate
canonical_card: design-alias-structure
archive_note: 高次交互作用を無視する仮定の下での推定可能性判定はcanonical cardへ統合済み。
---
## 問題
定義関係 $I=ABCD$ の半実施で、3因子以上の交互作用を無視する。A、AB、ACのうち単独で推定できる効果を答えよ。
## 記号・用語
無視できない次数の効果同士が別名なら単独推定できない。
## 使用公式・定理
A=BCD、AB=CD、AC=BD。
## 一手／方針
各別名相手が無視対象の3因子以上か、残す2因子以下かを判定する。
## 答え
Aは3因子BCDと別名なので仮定の下で単独推定できる。ABはCD、ACはBDという2因子交互作用同士の別名なので単独推定できない。
## 計算例
解像度IV計画では主効果は2因子交互作用から分離されるが、2因子交互作用同士は混ざる。
## 注意
高次交互作用無視は効果の疎性に基づく仮定であり、データだけでは検証しきれない。

<!-- CARD -->

---
id: engdesign-wordlength-aberration
title: 定義語の長さから2計画の交絡の強さを比較する
category: applied-engineering
subcategory: engineering-design
topic: wordlength-pattern
type: recognition
difficulty: 2
priority: B
hashtags:
  - 交絡法
  - 解像度
  - 定義関係
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 交絡法
archive_reason: duplicate
canonical_card: design-alias-structure
archive_note: 定義語長から解像度を比較し、同解像度では最小アベレーションを考える判断までcanonical cardへ統合済み。
---
## 問題
計画1の定義語が $ABD,ACE,BCDE$、計画2が $ABCD,ABCE,DE$ である。各解像度を求め、主効果推定に適する方を選べ。
## 記号・用語
解像度は最短定義語長で、短い語ほど低次効果の交絡が強い。
## 使用公式・定理
各計画の定義語の文字数の最小値を取る。
## 一手／方針
計画1は長さ3、3、4、計画2は4、4、2である。
## 答え
計画1は解像度III、計画2は解像度II。主効果同士の交絡を避ける点では計画1が適する。
## 計算例
計画1の語長パターンは $A_3=2,A_4=1$ である。
## 注意
同じ解像度なら短い定義語の個数が少ない最小アベレーション計画を比較する。
