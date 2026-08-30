---
id: asym-are-median-mean
title: 漸近相対効率（標本中央値／平均）を計算する
category: math-estimation
subcategory: math-asymptotic-estimation
topic: are-median-mean
type: calc_step
difficulty: 3
priority: A
hashtags:
  - 漸近相対効率
  - 有効性
  - 標本中央値
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 漸近理論
archive_reason: duplicate
canonical_card: asym-asymptotic-relative-efficiency
coverage_card: asym-asymptotic-relative-efficiency
archive_note: ARE正本へ、正規母集団で標本平均の極限分散sigma^2、標本中央値の極限分散pi
  sigma^2/2、ARE(median,mean)=2/pi≈0.637、n=100・sigma=2の数値比較、ロバスト性注意まで統合済み。
---
## 問題
正規母集団で、標本平均と標本中央値の漸近相対効率を求めよ。

## 記号・用語
- ARE：漸近相対効率（asymptotic relative efficiency）

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$\operatorname{AVar}(\sqrt n\,\overline X)=\sigma^2$、$\operatorname{AVar}(\sqrt n\,\widetilde X)=\pi\sigma^2/2$。

## 答え
極限分散の逆数比を取る。標本中央値の極限分散は $\pi\sigma^2/(2n)$。

## 計算例
$\operatorname{ARE}(\widetilde X,\overline X)=\sigma^2/(\pi\sigma^2/2)=2/\pi\approx0.637$。

## 注意
正規では平均がより効率的。裾が重い分布では逆転しうる。

<!-- CARD -->

---
id: asym-mle-av-normal
title: 最尤推定量の漸近分散を情報量から出す（正規平均）
category: math-estimation
subcategory: math-asymptotic-estimation
topic: mle-av-normal
type: calc_step
difficulty: 3
priority: S
hashtags:
  - 最尤推定
  - フィッシャー情報量（1次元）
  - 漸近分散
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 最尤推定量の漸近正規性
archive_reason: duplicate
canonical_card: asym-mle-asymptotic-normality
coverage_card: asym-mle-asymptotic-normality
archive_note: 最尤推定量の漸近正規性正本へ、既知分散の正規平均で I_1(mu)=1/sigma^2
  を対数尤度から導出し、Avar(Xbar)=sigma^2/n、sigma^2=9,n=100でASE=0.3まで統合済み。
---
## 問題
正規分布 $N(\mu,\sigma^2)$（$\sigma^2$ 既知）の平均の最尤推定量 $\overline X_n$ の漸近分散を情報量から求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$I_1(\mu)=\frac1{\sigma^2},\qquad \operatorname{AVar}(\sqrt n\,\overline X_n)=\sigma^2,\qquad \operatorname{AVar}(\overline X_n)=\frac{\sigma^2}{n}.$$

## 答え
1観測当たりの情報量の逆数を標本サイズで割る。

## 計算例
1観測 $X\sim N(\mu,\sigma^2)$ の対数尤度は
$$\ell_1(\mu;X)=C-\frac{(X-\mu)^2}{2\sigma^2}.$$
よって
$$\ell_1'(\mu)=\frac{X-\mu}{\sigma^2},
\qquad \ell_1''(\mu)=-\frac1{\sigma^2},$$
したがって
$$I_1(\mu)=-E_\mu[\ell_1''(\mu)]=\frac1{\sigma^2}.$$
$\sigma^2=9$ なら
$$\operatorname{Avar}(\overline X_n)
=\frac1{nI_1(\mu)}=\frac9n,$$
漸近標準誤差は $3/\sqrt n$ である。

## 注意
正規母集団では正確にもこの分散になる。
