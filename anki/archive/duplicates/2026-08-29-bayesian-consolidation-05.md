---
id: bayes-normal-normal-numeric
title: 正規–正規更新を数値で計算する
category: math-data-analysis
subcategory: math-bayesian-methods
topic: normal-normal-numeric
type: calc_step
difficulty: 3
priority: B
hashtags:
  - ベイズ統計
  - 正規分布
  - 数値計算
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 正規–正規モデル
archive_reason: duplicate
canonical_card: bayes-normal-normal-update
archive_note: 正規–正規canonical側を平方完成の途中式と同じ数値例まで補強したため、数値代入だけの別カードは同一moveの反復となる。
---
## 問題
事前分布が正規分布 $\mu\sim N(0,4)$、既知の $\sigma^2=9$、$n=9,\bar x=3$ のとき事後分布を求めよ。

## 記号・用語
- 事前分布：データ観測前の母数に関する不確実性を表す分布
- 事後分布：事前分布を尤度で更新した、データ観測後の母数分布

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$X_i\mid\mu\overset{iid}{\sim}N(\mu,\sigma^2)$、$\mu\sim N(m_0,s_0^2)$ で $\sigma^2$ が既知なら、事後分布は $N(m_n,s_n^2)$ で
$$\frac1{s_n^2}=\frac1{s_0^2}+\frac n{\sigma^2},\qquad
m_n=s_n^2\left(\frac{m_0}{s_0^2}+\frac{n\overline X}{\sigma^2}\right).$$
第1式は「事後精度＝事前精度＋データ精度」を表す。

## 答え
事後精度は
$$\frac14+\frac9{9}=\frac54,$$
したがって $s_n^2=4/5$。事後平均は
$$m_n=\frac45\left(\frac0{4}+\frac{9(3)}9\right)
=\frac{12}{5}=2.4.$$
よって $\mu\mid\boldsymbol x\sim N(2.4,0.8)$。

## 計算例
事前平均0へ標本平均3が縮小される。

## 注意
第2母数は標準偏差でなく分散。

<!-- CARD -->

---
id: bayes-normal-precision-update
title: 正規平均を精度表記で更新する
category: math-data-analysis
subcategory: math-bayesian-methods
topic: normal-precision
type: calc_step
difficulty: 3
priority: B
hashtags:
  - ベイズ統計
  - 精度
  - 正規分布
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 正規–正規モデル
archive_reason: duplicate
canonical_card: bayes-normal-normal-update
archive_note: 事後精度=事前精度+データ精度は補強済みcanonicalの注意と導出に吸収した。分散表記と精度表記を別カードにしない。
---
## 問題
事前精度を $\tau_0$、1観測当たりの既知精度を $\tau$ とするNormal–Normalモデルの事後精度と事後平均を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

精度は分散の逆数：$\tau_0=1/s_0^2,\ \tau=1/\sigma^2$。

## 答え
$$\tau_n=\tau_0+n\tau,$$
$$m_n=\frac{\tau_0m_0+n\tau\bar x}{\tau_0+n\tau}.$$

## 計算例
$\tau_0=2,n\tau=8$ なら事前平均の重み0.2、標本平均の重み0.8。

## 注意
精度と分散を同じ式内で混在させない。

<!-- CARD -->

---
id: bayes-factor-definition
title: ベイズファクターを周辺尤度比で定義する
category: math-data-analysis
subcategory: math-bayesian-methods
topic: bayes-factor
type: formula
difficulty: 3
priority: A
hashtags:
  - ベイズ統計
  - ベイズファクター
  - 周辺尤度
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ベイズファクター（基本）
archive_reason: duplicate
canonical_card: bayes-factor-discrete-numeric
archive_note: 周辺尤度の積分定義、BFの比、事後オッズへの更新を数値canonicalへ吸収済み。定義だけを独立カードにしない。
---
## 問題
モデル $M_1,M_0$ のベイズファクター $BF_{10}$ を定義せよ。

## 記号・用語
- 事前分布：データ観測前の母数に関する不確実性を表す分布
- ベイズファクター：2モデルの周辺尤度の比

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$\frac{P(M_1\mid x)}{P(M_0\mid x)}
=BF_{10}\frac{P(M_1)}{P(M_0)}.$$
通常のベイズファクターでは、各モデル内の事前分布がproperであることを要する。

## 答え
$$BF_{10}=\frac{m_1(x)}{m_0(x)},\qquad
m_k(x)=\int f_k(x\mid\theta_k)\pi_k(\theta_k)\,d\theta_k.$$

## 計算例
$BF_{10}=5$ はデータが $M_0$ より $M_1$ の下で5倍予測されやすいことを表す。

## 注意
ベイズファクターは事後確率そのものではない。

<!-- CARD -->

---
id: bayes-factor-prior-sensitivity
title: ベイズファクターの事前分布依存性を判断する
category: math-data-analysis
subcategory: math-bayesian-methods
topic: bayes-factor-prior-sensitivity
type: recognition
difficulty: 3
priority: B
hashtags:
  - ベイズ統計
  - ベイズファクター
  - 事前感度
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ベイズファクター（基本）
archive_reason: duplicate
canonical_card: bayes-factor-discrete-numeric
archive_note: ベイズファクターの事前尺度感度はcanonicalの注意へ吸収済み。独立した認識カードとして増殖させない。
---
## 問題
複合モデル側の事前分布を極端に拡散させるとベイズファクターがどうなり得るか説明せよ。

## 記号・用語
- 事前分布：データ観測前の母数に関する不確実性を表す分布
- 周辺尤度：尤度を事前分布で平均し、母数を積分消去したデータの確率
- ベイズファクター：2モデルの周辺尤度の比

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

ベイズファクターは適合度だけでなく事前分布による複雑さの罰則を含む。

## 答え
周辺尤度
$$m_1(x)=\int f_1(x\mid\theta)\pi_1(\theta)\,d\theta$$
は事前分布全体で尤度を平均する。観測と整合しない広い領域へ事前質量を置くと平均が薄まり、複雑なモデルに不利になり得る。

## 計算例
異なる妥当な事前尺度でベイズファクターを再計算する感度分析を行う。

## 注意
事後推定が頑健でもベイズファクターは事前尺度に敏感なことがある。

<!-- CARD -->

---
id: bayes-posterior-odds
title: 事後オッズをベイズファクターで更新する
category: math-data-analysis
subcategory: math-bayesian-methods
topic: posterior-odds
type: calc_step
difficulty: 2
priority: A
hashtags:
  - ベイズ統計
  - 事後オッズ
  - ベイズファクター
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ベイズファクター（基本）
archive_reason: duplicate
canonical_card: bayes-factor-discrete-numeric
archive_note: 事後オッズ=BF×事前オッズは数値canonicalで式から事後確率まで実際に計算するため重複。
---
## 問題
$H_1$ 対 $H_0$ の事前オッズが $1:4$、ベイズファクター $BF_{10}=6$ のとき事後オッズと事後確率を求めよ。

## 記号・用語
- ベイズファクター：2モデルの周辺尤度の比

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

事後オッズ＝ベイズファクター×事前オッズ。

## 答え
$$\frac{P(H_1\mid x)}{P(H_0\mid x)}
=BF_{10}\frac{P(H_1)}{P(H_0)}
=6\cdot\frac14=\frac32.$$
よって $P(H_1\mid x)=3/(3+2)=0.6$。

## 計算例
$BF_{10}>1$ でも事前オッズが極端なら事後で $H_1$ が優勢とは限らない。

## 注意
$BF_{10}$ と $BF_{01}=1/BF_{10}$ の向きを確認する。
