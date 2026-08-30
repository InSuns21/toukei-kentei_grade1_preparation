---
id: engasym-lln-sensor-average
title: 大数の法則でセンサー平均の収束先を判定する
category: applied-engineering
subcategory: engineering-asymptotics
topic: law-of-large-numbers
type: recognition
difficulty: 1
priority: S
hashtags:
  - 大数の法則
  - 一致性
  - 標本平均
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 大数の法則
archive_reason: duplicate
canonical_card: asym-wlln
coverage_card: asym-wlln
archive_note: センサー誤差という文脈以外は、独立同分布・有限平均から標本平均が母平均へ確率収束する弱大数の法則そのもの。一般側正本へ吸収する。
---
## 問題
独立同分布なセンサー誤差 $X_i$ が $E|X_i|<\infty$、$E[X_i]=\mu$ を満たす。標本平均の確率極限を答えよ。
## 記号・用語
確率収束 $\overline X_n\xrightarrow{p}\mu$ は、任意の $\varepsilon>0$ で $P(|\overline X_n-\mu|>\varepsilon)\to0$ を意味する。
## 使用公式・定理
弱大数の法則：独立同分布で平均が有限なら $\overline X_n\xrightarrow{p}\mu$。
## 一手／方針
独立同分布と有限平均を確認して定理を直接適用する。
## 答え
$$\operatorname{plim}_{n\to\infty}\overline X_n=\mu.$$
## 計算例
誤差平均が0なら、多数回平均は確率的に0へ近づく。
## 注意
大数の法則は有限標本で平均が真値に等しいとは主張しない。

<!-- CARD -->

---
id: engasym-consistency-from-mse
title: 平均二乗誤差から一致性を示す
category: applied-engineering
subcategory: engineering-asymptotics
topic: consistency
type: calc_step
difficulty: 2
priority: S
hashtags:
  - 一致性
  - 平均二乗誤差
  - Markovの不等式
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 一致性
archive_reason: duplicate
canonical_card: asym-convergence-ms
coverage_card: asym-convergence-ms
archive_note: 平均二乗収束の正本へ、MSE→0からMarkovの不等式で P(|T_n-theta|>epsilon)
  を0へ押さえる一致性証明、MSEのバイアス・分散分解、数値例まで統合済み。
---
## 問題
$E[(\widehat\theta_n-\theta)^2]\to0$ なら $\widehat\theta_n$ が一致推定量であることを示せ。
## 記号・用語
一致性は $\widehat\theta_n\xrightarrow{p}\theta$ をいう。
## 使用公式・定理
Markovの不等式を非負変数 $(\widehat\theta_n-\theta)^2$ に適用すると
$$P(|\widehat\theta_n-\theta|>\varepsilon)\le\frac{E[(\widehat\theta_n-\theta)^2]}{\varepsilon^2}.$$
## 一手／方針
確率収束の外側確率を平均二乗誤差で上から押さえる。
## 答え
右辺は任意の $\varepsilon>0$ で0へ収束するため、$\widehat\theta_n\xrightarrow{p}\theta$。
## 計算例
不偏で分散が $1/n$ なら平均二乗誤差も $1/n\to0$ なので一致する。
## 注意
平均二乗誤差が0へ行くことは一致性の十分条件であり、常に必要条件ではない。

<!-- CARD -->

---
id: asym-ms-conv-prob
title: 平均二乗収束が確率収束を含意することを確認する
category: math-estimation
subcategory: math-asymptotic-estimation
topic: qm-implies-p
type: proof_step
difficulty: 2
priority: A
hashtags:
  - 平均二乗収束
  - 確率収束
  - チェビシェフの不等式
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 収束の概念
archive_reason: duplicate
canonical_card: asym-convergence-ms
coverage_card: asym-convergence-ms
archive_note: 平均二乗収束が確率収束を含意する証明専用カード。強化済み正本 asym-convergence-ms が同じMarkov不等式の証明と数値例を包含する。
---
## 問題
$X_n\xrightarrow{qm}\theta$ なら $X_n\xrightarrow{p}\theta$ となることを示せ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$P(|X_n-\theta|>\varepsilon)\le\frac{E[(X_n-\theta)^2]}{\varepsilon^2}.$$

## 答え
Markov（Chebyshev）不等式を二乗平均に適用する。

## 計算例
$E[(X_n-\theta)^2]=1/n$ とする。$\varepsilon=0.1,n=400$ では
$$P(|X_n-\theta|>0.1)
\le\frac{E[(X_n-\theta)^2]}{0.1^2}
=\frac{1/400}{0.01}=0.25.$$
一般の $n$ では上界が $100/n\to0$ なので $X_n\xrightarrow{p}\theta$ である。

## 注意
平均二乗収束の直接な含意である。

<!-- CARD -->

---
id: asym-mle-av-binomial
title: 最尤推定量の漸近分散を情報量から出す（ベルヌーイ）
category: math-estimation
subcategory: math-asymptotic-estimation
topic: mle-av-binomial
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
archive_note: ベルヌーイ標本の情報量 I_1(p)=1/[p(1-p)] と Avar(p_hat)=p(1-p)/n
  の導出は、最尤推定量の漸近正規性正本のベルヌーイ計算例ですでに導出済み。
---
## 問題
ベルヌーイ標本の最尤推定量 $\widehat p$ の漸近分散をフィッシャー情報量（1次元）から求めよ。

## 記号・用語
- フィッシャー情報量（1次元）：スコアの分散。正則条件下では対数尤度の負の2階微分の期待値に等しい

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$I_1(p)=\frac1{p(1-p)},\qquad \operatorname{AVar}(\sqrt n\,\widehat p)=p(1-p),\qquad \operatorname{AVar}(\widehat p)=\frac{p(1-p)}{n}.$$

## 答え
漸近分散は1観測当たりの情報量の逆数を標本サイズで割ったもの。

## 計算例
1観測 $X\sim\operatorname{Bernoulli}(p)$ の対数尤度は
$$\ell_1(p;X)=X\log p+(1-X)\log(1-p).$$
2回微分して
$$\ell_1''(p)=-\frac X{p^2}-\frac{1-X}{(1-p)^2}.$$
$E_p[X]=p$ を代入すると
$$I_1(p)=-E_p[\ell_1''(p)]
=\frac p{p^2}+\frac{1-p}{(1-p)^2}
=\frac1p+\frac1{1-p}
=\frac1{p(1-p)}.$$
したがって $p=0.5$ では
$$\operatorname{Avar}(\widehat p)
=\frac1{nI_1(0.5)}=\frac{0.25}{n},$$
漸近標準誤差は $0.5/\sqrt n$ である。

## 注意
標本比率の中心極限定理の分散と一致する。
