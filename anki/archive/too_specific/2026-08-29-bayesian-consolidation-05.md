---
id: bayes-factor-improper-prior
title: improper事前分布でベイズファクターが使えない理由を示す
category: math-data-analysis
subcategory: math-bayesian-methods
topic: bayes-factor-improper
type: recognition
difficulty: 3
priority: B
hashtags:
  - ベイズ統計
  - ベイズファクター
  - improper-prior
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 無情報事前分布（基本）
archive_reason: too_specific
canonical_card: bayes-factor-discrete-numeric
archive_note: improper事前で任意定数が周辺尤度比に残る注意はcanonicalへ吸収済み。600枚枠では独立カードにしない。
---
## 問題
$\pi_k(\theta_k)\propto c_kh_k(\theta_k)$ がimproperなとき、通常のベイズファクターを定義できない理由を述べよ。

## 記号・用語
- 事前分布：データ観測前の母数に関する不確実性を表す分布
- 事後分布：事前分布を尤度で更新した、データ観測後の母数分布
- 周辺尤度：尤度を事前分布で平均し、母数を積分消去したデータの確率
- ベイズファクター：2モデルの周辺尤度の比

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

単一モデルの事後分布では定数が正規化で消えても、モデル間比では消えない。

## 答え
各周辺尤度は
$$m_k(x)=c_k\int f_k(x\mid\theta_k)h_k(\theta_k)\,d\theta_k$$
となり、任意定数 $c_1/c_0$ が $BF_{10}$ に残るため値が一意でない。

## 計算例
モデル比較にはproperな事前分布を用いるのが基本。

## 注意
推定でproperな事後分布が得られることとベイズファクターが定義できることは別。

<!-- CARD -->

---
id: bayes-factor-beta-binomial
title: 点帰無対ベータ事前のベイズファクターを計算する
category: math-data-analysis
subcategory: math-bayesian-methods
topic: bayes-factor-beta-binomial
type: calc_step
difficulty: 4
priority: B
hashtags:
  - ベイズ統計
  - ベイズファクター
  - ベータ–二項
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ベイズファクター（基本）
archive_reason: too_specific
canonical_card: bayes-factor-discrete-numeric
archive_note: 点帰無対Beta事前の周辺尤度積分はBayes factor一般moveの分布固有派生。600枚デッキでは周辺尤度を積分する原理と数値比較を優先する。
---
## 問題
$X\sim\operatorname{Bin}(n,p)$。$M_0:p=p_0$、$M_1:p\sim\operatorname{Beta}(a,b)$ とする。$BF_{10}$ を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

Beta関数 $B(a,b)=\int_0^1p^{a-1}(1-p)^{b-1}\,dp$。

## 答え
$$m_0(x)=\binom nxp_0^x(1-p_0)^{n-x},$$
$$m_1(x)=\binom nx\frac{B(a+x,b+n-x)}{B(a,b)}.$$
したがって
$$BF_{10}=
\frac{B(a+x,b+n-x)}
{B(a,b)p_0^x(1-p_0)^{n-x}}.$$

## 計算例
二項係数は分子・分母で相殺される。

## 注意
モデル $M_1$ 内でpを積分し、最尤値を代入しない。
