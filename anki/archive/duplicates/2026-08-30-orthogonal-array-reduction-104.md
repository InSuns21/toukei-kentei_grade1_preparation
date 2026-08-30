---
id: design-orthogonality-check
title: ±1列の内積で直交性を確認する
category: applied-common
subcategory: applied-design
topic: orthogonality-check
type: calc_step
difficulty: 2
priority: B
hashtags:
  - 直交表
  - 内積
  - 直交性
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 直交表の基本
archive_reason: duplicate
canonical_card: design-orthogonal-array-basic
archive_note: ±1列の内積による直交性確認は、直交表workflowの数値例としてcanonical cardへ統合済み。
---
## 問題
列 $A=(-1,-1,+1,+1)$、$B=(-1,+1,-1,+1)$ の内積を計算し、直交性を判定せよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

誤差が互いに無相関・等分散の通常の線形モデルでは、バランスした±1符号化の列の内積が0なら、対応する最小二乗推定量は無相関。

## 答え
$$A^{\mathsf T}B
=(+1)+(-1)+(-1)+(+1)=0.$$
よってAとBは直交する。

## 計算例
各列自身の平方和は4。

## 注意
欠測や不均衡があると直交性が崩れ得る。

<!-- CARD -->

---
id: design-balanced-orthogonality
title: バランス計画で平方和が分離できる理由を述べる
category: applied-common
subcategory: applied-design
topic: balanced-orthogonality
type: recognition
difficulty: 3
priority: B
hashtags:
  - 直交性
  - バランス計画
  - 平方和
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 直交表の基本
archive_reason: duplicate
canonical_card: design-orthogonal-array-basic
archive_note: X^T Xの交差項が0となり平方和を分離できる理由はcanonical cardへ統合済み。
---
## 問題
バランスした直交計画で各効果の平方和を他効果と独立に計算しやすい理由を述べよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$\boldsymbol X^{\mathsf T}\boldsymbol X$$
が効果ブロックごとに対角またはブロック対角になる。

## 答え
計画行列の異なる効果列が直交し、正規方程式の交差項が0になるため、各係数推定が他の効果の有無に影響されず、全平方和が効果ごとの成分へ加法分解される。

## 計算例
完全な2水準要因計画では全主効果・交互作用の±1列が直交。

## 注意
不均衡データでは平方和の型により結果が変わり得る。

<!-- CARD -->

---
id: engdesign-oa-l4-assignment
title: L4直交表へ3つの2水準因子を割り付ける
category: applied-engineering
subcategory: engineering-design
topic: orthogonal-array-l4
type: calc_step
difficulty: 2
priority: B
hashtags:
  - 直交表
  - L4直交表
  - 因子割付
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 直交表
archive_reason: duplicate
canonical_card: design-orthogonal-array-basic
archive_note: L4の列積から交互作用列を作る操作はcanonical cardへ統合済み。
---
## 問題
L4直交表の列1、2が $(-,-,+,+)$、$(-,+,-,+)$ である。列3を列1×列2として作れ。
## 記号・用語
2水準直交表では各列が2回ずつ$-$と$+$を持ち、異なる列の水準組合せが均等に現れる。
## 使用公式・定理
交互作用列は対応する因子列の符号積で作る。
## 一手／方針
4行で列1と列2の符号を掛ける。
## 答え
列3は $(+,-,-,+)$。
## 計算例
列1=A、列2=Bなら列3=ABであり、Cを列3へ置くとCとABが別名になる。
## 注意
主効果だけを割り付けても、重要交互作用との列競合を事前に確認する。

<!-- CARD -->

---
id: engdesign-oa-column-df
title: 直交表へ割り付けられる因子の自由度を確認する
category: applied-engineering
subcategory: engineering-design
topic: orthogonal-array-degrees-freedom
type: calc_step
difficulty: 2
priority: B
hashtags:
  - 直交表
  - 自由度
  - 因子割付
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 直交表
archive_reason: duplicate
canonical_card: design-orthogonal-array-basic
archive_note: L8の全自由度・割付自由度・残り自由度の確認はcanonical cardへ統合済み。
---
## 問題
8実施のL8直交表は7本の2水準列を持つ。2水準因子A、B、Cと交互作用AB、ACを割り付けたとき、使用自由度と残り列数を求めよ。
## 記号・用語
2水準因子または2因子交互作用は各1自由度を使う。
## 使用公式・定理
全自由度は $N-1=7$、割付自由度は各効果自由度の和である。
## 一手／方針
割り付けた5効果を数え、7から引く。
## 答え
使用自由度は5、未使用列は2本である。
## 計算例
未使用2自由度を誤差へ使っても、独立な純粋誤差反復があるとは限らない。
## 注意
列数だけでなく線点図や列積を使い、主効果と重要交互作用の競合を避ける。

<!-- CARD -->

---
id: engdesign-oa-level-effect
title: 直交表の水準平均から因子効果を求める
category: applied-engineering
subcategory: engineering-design
topic: orthogonal-array-effect
type: calc_step
difficulty: 2
priority: B
hashtags:
  - 直交表
  - 水準平均
  - 因子効果
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 直交表
archive_reason: duplicate
canonical_card: design-orthogonal-array-basic
archive_note: 水準平均差から2水準因子効果を計算する手順はcanonical cardへ統合済み。
---
## 問題
L4直交表で因子Aの低水準の応答が8、10、高水準が13、15である。A効果を求めよ。
## 記号・用語
直交表の釣合いにより、他列の水準はAの各水準内で均等に現れる。
## 使用公式・定理
2水準因子効果は高水準平均−低水準平均である。
## 一手／方針
各水準の2観測を平均して差を取る。
## 答え
低水準平均9、高水準平均14よりA効果は5。
## 計算例
総平均11.5からの効果符号化では低水準$-2.5$、高水準$+2.5$。
## 注意
A列が別の重要効果と別名なら、この差は両効果の混合である。

<!-- CARD -->

---
id: engdesign-oa-interaction-conflict
title: 直交表の交互作用列競合を判定する
category: applied-engineering
subcategory: engineering-design
topic: orthogonal-array-interaction
type: recognition
difficulty: 3
priority: B
hashtags:
  - 直交表
  - 交互作用
  - 列競合
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 直交表
archive_reason: duplicate
canonical_card: design-orthogonal-array-basic
archive_note: C主効果とAB交互作用が同じ列に載る場合の識別不能判定はcanonical cardへ統合済み。
---
## 問題
L4直交表で列3=列1×列2である。Aを列1、Bを列2、Cを列3へ割り付けたとき識別できない効果を答えよ。
## 記号・用語
同一列へ載る効果は観測応答から別々に推定できない。
## 使用公式・定理
AB交互作用列はA列×B列、すなわち列3である。
## 一手／方針
ABが使う列とCの割付列を比較する。
## 答え
C主効果とAB交互作用が同じ列にあり、別々には識別できない。
## 計算例
ABが重要ならCを別の計画へ移すか、実施を追加して別名を解く。
## 注意
交互作用を無視する仮定は、工程知識や追加実験で検討する。
