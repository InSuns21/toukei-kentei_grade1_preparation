---
id: ci-coverage-frequentist
title: 被覆確率の頻度主義的妥当性を確認する
category: math-estimation
subcategory: math-interval-estimation
topic: coverage-interpretation
type: recognition
difficulty: 2
priority: S
hashtags:
  - 被覆確率
  - 頻度主義
  - 区間推定
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 区間推定
archive_reason: duplicate
canonical_card: ci-coverage-probability
archive_note: 被覆確率の定義カード自体が「母数は固定・確率を担うのは区間」「95%は反復手順の被覆」を既に説明している。解釈だけの別カードは同じretrievalを反復する。
---
## 問題
「信頼係数 $0.95$ の区間に真値が入る確率は $0.95$」という言い方の誤りを指摘し、正しい解釈を述べよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

固定された $\theta$ に対し $P_\theta(\theta\in I(X))=1-\alpha$。得られた区間は実現値であり確率変数ではない。

## 答え
信頼係数は「手順」の性質であり、得られた一つの区間についての確率ではない。

## 計算例
$100$ 回同じ実験を繰り返して区間を作れば、被覆確率 $0.95$ なら約 $95$ 個が真値を含む。

## 注意
ベイズの信用区間（credible interval）とは意味が異なる。

<!-- CARD -->

---
id: ci-pivot-definition
title: ピボット量（pivotal quantity）の定義
category: math-estimation
subcategory: math-interval-estimation
topic: pivot-definition
type: formula
difficulty: 3
priority: A
hashtags:
  - ピボット量
  - 区間推定
  - 信頼区間の構成
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 区間推定
archive_reason: duplicate
canonical_card: ci-pivot-construction
archive_note: 構成カードはピボット量の母数非依存性を使い、確率不等式を未知母数について実際に解いて正規平均区間まで導く。定義だけを独立カードにしない。
---
## 問題
ピボット量とは何か。定義を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$Q(X,\theta)$ の分布が $\theta$ によらず一定。これを用いて $P(a\le Q\le b)=1-\alpha$ を $\theta$ について解き区間を得る。

## 答え
標本 $X$ と未知パラメータ $\theta$ の関数 $Q(X,\theta)$ のうち、その分布が未知パラメータに依存しないものをいう。

## 計算例
正規平均 $\mu$ で $\sigma$ 既知なら $Q=(\overline X-\mu)/(\sigma/\sqrt n)\sim N(0,1)$ がピボット量。

## 注意
ピボット量は推定量（分布が $\theta$ に依存しうる）とは異なる。

<!-- CARD -->

---
id: ci-test-duality
title: 信頼区間と検定の双対性
category: math-estimation
subcategory: math-interval-estimation
topic: ci-test-duality
type: recognition
difficulty: 3
priority: S
hashtags:
  - 双対性
  - 信頼区間
  - 仮説検定
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 区間推定
archive_reason: duplicate
canonical_card: ci-duality-acceptance
archive_note: 受容域を未知母数について反転して信頼区間を得る証明カードが双対性の定義そのものを具体化しているため、認識カードを別に持たない。
---
## 問題
信頼区間と仮説検定の双対性を述べよ。

## 記号・用語
- 棄却域：帰無仮説を棄却する統計量・標本結果の集合

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$CI_{1-\alpha}(x)=\{\theta_0: \text{観測 }x\text{ で }H_0:\theta=\theta_0\text{ を棄却しない}\}.$$

## 答え
水準 $\alpha$ の検定で棄却されない $\theta$ の集合が、ちょうど信頼係数 $1-\alpha$ の信頼区間になる。

## 計算例
棄却域の補集合（受容域）が $1-\alpha$ 区間に対応する。

## 注意
双対性が成り立つのは「受容域が連結で両側・片側と対応」する標準的な場合。
