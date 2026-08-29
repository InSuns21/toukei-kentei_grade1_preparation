---
id: ci-normal-mean-known
title: 正規平均・分散既知の信頼区間
category: math-estimation
subcategory: math-interval-estimation
topic: normal-mean-known-variance
type: formula
difficulty: 2
priority: S
hashtags:
  - 信頼区間
  - 正規分布
  - 母平均
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
archive_note: ピボット構成canonicalを標準正規の確率不等式→muについて反転→数値95%区間まで補強したため、既知分散z区間の公式再生カードは独立保持しない。
---
## 問題
独立同分布標本 $X_1,\ldots,X_n$ が正規分布 $N(\mu,\sigma^2)$ に従い、$\sigma^2$ 既知とする。$\mu$ の信頼係数 $1-\alpha$ の信頼区間を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$\dfrac{\overline X-\mu}{\sigma/\sqrt n}\sim N(0,1)$ をピボット量とする。$z_{\alpha/2}$ は標準正規分布の上側 $\alpha/2$ 点。

## 答え
$$\left[\overline X-z_{\alpha/2}\frac{\sigma}{\sqrt n},\ \overline X+z_{\alpha/2}\frac{\sigma}{\sqrt n}\right].$$

## 計算例
標準誤差は $\sigma/\sqrt n$；信頼係数 $0.95$ なら $z_{0.025}=1.96$ をかける。

## 注意
$\sigma$ 未知なら $t$ 区間へ切り替える。

<!-- CARD -->

---
id: ci-t-vs-z
title: 既知分散と未知分散の区間の違いを比較する
category: math-estimation
subcategory: math-interval-estimation
topic: t-vs-z
type: recognition
difficulty: 2
priority: S
hashtags:
  - t区間
  - z区間
  - 比較
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 区間推定
archive_reason: duplicate
canonical_card: ci-t-interval-pivot
archive_note: 補強済みt区間canonicalが、未知分散でtを使う理由、既知分散ならz、大標本でt→zまで注意欄に含むため、比較説明だけのカードは重複。
---
## 問題
分散既知（z区間）と未知（t区間）の母平均信頼区間の違いを述べよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

既知：$\overline X\pm z_{\alpha/2}\sigma/\sqrt n$。未知：$\overline X\pm t_{n-1,\alpha/2}S/\sqrt n$。

## 答え
既知なら標準誤差 $\sigma/\sqrt n$ に $z_{\alpha/2}$ をかけ、未知なら不偏分散 $S$ で推定して $t_{n-1,\alpha/2}$ を用いる。

## 計算例
$n$ が大きいと $t_{n-1,\alpha/2}\approx z_{\alpha/2}$ となり両者は近づく。

## 注意
同じ標準誤差の数値を用いるなら $t_{n-1,\alpha/2}>z_{\alpha/2}$ なので $t$ 区間の半幅が大きい。ただし実際には $S$ と $\sigma$ も異なるため、得られた個々の区間幅を無条件には比較できない。

<!-- CARD -->

---
id: ci-asymptotic-def
title: 漸近信頼区間の定義
category: math-estimation
subcategory: math-interval-estimation
topic: asymptotic-ci-def
type: formula
difficulty: 3
priority: S
hashtags:
  - 漸近信頼区間
  - 区間推定
  - 大標本
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 区間推定
archive_reason: duplicate
canonical_card: ci-asymptotic-mle
archive_note: MLE漸近区間canonicalへ被覆確率がn→∞で1-alphaへ収束する定義を吸収し、Poissonで情報量→SE→端点まで計算するため、定義だけのカードは不要。
---
## 問題
漸近信頼区間とは何か。定義を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$\lim_{n\to\infty}P_\theta(\theta\in I_n)=1-\alpha$ となる $I_n$ を漸近 $1-\alpha$ 信頼区間という。

## 答え
標本サイズ $n\to\infty$ で被覆確率が $1-\alpha$ に近づく区間をいう。有限標本では近似的に成り立つ。

## 計算例
正規近似や最尤推定量の漸近正規性に基づく区間が典型例。

## 注意
有限 $n$ では被覆確率が $1-\alpha$ からずれることがある。

<!-- CARD -->

---
id: ci-length-confidence-tradeoff
title: 信頼係数と区間幅のトレードオフ
category: math-estimation
subcategory: math-interval-estimation
topic: length-confidence-tradeoff
type: recognition
difficulty: 2
priority: S
hashtags:
  - 区間幅
  - 信頼係数
  - トレードオフ
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 区間推定
archive_reason: duplicate
canonical_card: ci-sample-size-for-width
archive_note: 標本サイズ設計canonicalに90%と95%を同じ幅で比較し、必要nが44から62へ増える数値例を追加した。信頼係数↑なら幅↑という説明だけを独立カードにしない。
---
## 問題
信頼係数を上げると区間幅はどうなるか。理由を述べよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

半幅 $\propto z_{\alpha/2}$。$z_{0.05}=1.645$、$z_{0.025}=1.96$ のように $\alpha$ 減少で増大。

## 答え
信頼係数を大きくする（$\alpha$ を小さくする）と、分位点 $z_{\alpha/2}$ が大きくなり区間は広くなる。

## 計算例
$0.90$ 区間より $0.95$ 区間の方が広い。

## 注意
精度（狭さ）と信頼（被覆）はトレードオフの関係。
