---
id: test-null-alternative-definition
title: 帰無仮説と対立仮説を母数空間で表す
category: math-testing
subcategory: math-testing-foundations
topic: hypotheses
type: formula
difficulty: 1
priority: A
hashtags: [仮説, 帰無仮説, 対立仮説]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 仮説 }]
---

## 問題
母数空間が $\Theta$ のとき、帰無仮説と対立仮説を集合で定義せよ。また正規分布 $N(\mu,1)$ の平均について両側検定を表せ。

## 記号・用語
- 母数空間：母数が取り得る値をすべて集めた集合
- $\Theta_0$：帰無仮説が指定する母数値の集合
- $\Theta_1$：対立仮説が指定する母数値の集合

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

検定は標本から $H_0$ を棄却するか否かを決める決定問題である。

## 一手
先に母数空間を二分すると、過誤確率の「どの母数の下か」が明確になる。

## 答え
互いに素で $\Theta=\Theta_0\cup\Theta_1$ を満たす部分集合 $\Theta_0,\Theta_1$ を用いて
$$H_0:\theta\in\Theta_0,\qquad H_1:\theta\in\Theta_1$$
と表す。両側検定 $H_0:\mu=0$ 対 $H_1:\mu\ne0$ では $\Theta_0=\{0\}$、$\Theta_1=\mathbb R\setminus\{0\}$。

## 計算例
$\mu=2$ は $\Theta_1$ に属するため、この母数値の下で棄却確率を計算すれば検出力になる。
<!-- CARD -->

---
id: test-simple-composite-hypotheses
title: 単純仮説と複合仮説を判定する
category: math-testing
subcategory: math-testing-foundations
topic: simple-composite
type: recognition
difficulty: 1
priority: A
hashtags: [仮説, 単純仮説, 複合仮説]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 仮説 }]
---

## 問題
$X_i\overset{iid}{\sim}\operatorname{Bernoulli}(p)$ とし、$S=\sum_{i=1}^{10}X_i$ とする。(a) $H_0:p=0.5$、(b) $H_0:p\le0.5$ は単純仮説か複合仮説か。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

単純仮説は標本分布を一意に定め、複合仮説は複数の標本分布を許す。

## 答え
(a) は分布を一意に定めるので単純仮説、(b) は複数の $p$ を含むので複合仮説。

## 計算例
$n=10$ のとき (a) では $P(S=3)=\binom{10}{3}0.5^{10}$ と一意に計算できるが、(b) では $p$ ごとに値が異なる。

## 注意
片側か両側かと、単純か複合かは別の分類である。
<!-- CARD -->

---
id: test-statistic-definition
title: 検定統計量の条件を確認する
category: math-testing
subcategory: math-testing-foundations
topic: test-statistic
type: formula
difficulty: 1
priority: A
hashtags: [検定統計量, 統計量, 帰無分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 検定統計量 }]
---

## 問題
検定統計量とは何か。正規平均の分散既知検定で用いる統計量を挙げよ。

## 記号・用語
- 棄却域：帰無仮説を棄却する統計量・標本結果の集合
- 検出力：対立仮説が真のとき帰無仮説を棄却する確率

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

棄却域やP値は検定統計量の帰無分布から決める。

## 答え
検定統計量は標本だけの関数で、未知母数を未推定のまま含めない。帰無仮説 $H_0:\mu=\mu_0$ の下では
$$Z=\frac{\overline X-\mu_0}{\sigma/\sqrt n}\sim N(0,1).$$

## 計算例
$\overline x=5.4,\mu_0=5,\sigma=2,n=100$ なら $z=(5.4-5)/(2/10)=2$。

## 注意
対立仮説下の分布は検出力計算に使い、臨界値の決定には帰無分布を使う。
<!-- CARD -->

---
id: test-critical-region-size
title: 棄却域と検定のサイズを区別する
category: math-testing
subcategory: math-testing-foundations
topic: rejection-region-size
type: formula
difficulty: 2
priority: A
hashtags: [棄却域, 有意水準, サイズ]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 棄却域 }]
---

## 問題
棄却域 $R$ と検定のサイズを定義せよ。

## 記号・用語
- 棄却域：帰無仮説を棄却する統計量・標本結果の集合

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

複合帰無仮説では、第一種過誤確率の帰無母数全体での上限を取る。

## 一手
「有意水準」と「実際のサイズ」は一致せず、サイズが有意水準未満でもよい。

## 答え
観測標本が $R$ に入れば $H_0$ を棄却する。検定のサイズは
$$\sup_{\theta\in\Theta_0}P_\theta(X\in R)$$
である。これが $\alpha$ 以下なら有意水準 $\alpha$ の検定。

## 計算例
$H_0:p\le0.5$、$X\sim\operatorname{Binomial}(10,p)$、$R=\{X=10\}$ なら、上限は境界 $p=0.5$ で $0.5^{10}\approx0.000977$。
<!-- CARD -->

---
id: test-type-errors-definition
title: 第一種・第二種過誤を条件付き確率で表す
category: math-testing
subcategory: math-testing-foundations
topic: type-errors
type: formula
difficulty: 1
priority: A
hashtags: [第一種の過誤, 第二種の過誤, 検出力]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 第一種の過誤 }]
---

## 問題
棄却域を $R$ とするとき、第一種・第二種過誤を確率で表せ。

## 記号・用語
- 棄却域：帰無仮説を棄却する統計量・標本結果の集合
- 検出力：対立仮説が真のとき帰無仮説を棄却する確率

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

第一種過誤は真の $H_0$ を棄却、第二種過誤は偽の $H_0$ を棄却しない誤り。

## 答え
$$\alpha(\theta)=P_\theta(X\in R)\quad(\theta\in\Theta_0),$$
$$\beta(\theta)=P_\theta(X\notin R)\quad(\theta\in\Theta_1).$$
対立母数 $\theta$ での検出力は $1-\beta(\theta)$。

## 計算例
$H_1$ 下で棄却確率が $0.8$ なら第二種過誤確率は $1-0.8=0.2$。

## 注意
$\alpha$ を小さくすると、標本サイズ固定では一般に $\beta$ が大きくなる。
<!-- CARD -->

---
id: test-level-versus-size
title: 有意水準とサイズの違いを数値で確認する
category: math-testing
subcategory: math-testing-foundations
topic: level-size
type: calc_step
difficulty: 2
priority: A
hashtags: [有意水準, サイズ, 離散分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 有意水準 }]
---

## 問題
$X\sim\operatorname{Binomial}(10,0.5)$ で $X\ge9$ のとき棄却する。この検定は有意水準5%か。サイズも求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

有意水準 $\alpha$ はサイズの上限であり、離散分布では等号にならないことが多い。

## 一手
離散検定では臨界値候補を1つずつ動かして帰無確率を確認する。

## 答え
$$P_{0.5}(X\ge9)=\frac{\binom{10}{9}+\binom{10}{10}}{2^{10}}=\frac{11}{1024}\approx0.01074.$$
よってサイズは約1.07%で、5%以下だから有意水準5%の検定である。

## 計算例
$X\ge8$ まで広げると確率は $(45+10+1)/1024\approx0.0547$ で5%を超える。
<!-- CARD -->

---
id: test-pvalue-definition
title: P値を観測値以上に極端な確率として定義する
category: math-testing
subcategory: math-testing-foundations
topic: p-value
type: formula
difficulty: 2
priority: S
hashtags: [P値, 帰無分布, 極端さ]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: P値 }]
---

## 問題
検定統計量 $T$ は大きいほど $H_1$ を支持する。観測値 $t_{\rm obs}$ のP値を定義せよ。

## 記号・用語
- $\Phi$：標準正規分布の累積分布関数

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$p\text{値}\le\alpha$ と $H_0$ を有意水準 $\alpha$ で棄却することは、連続な標準的検定では同値。

## 答え
単純帰無仮説なら
$$p\text{値}=P_{H_0}(T\ge t_{\rm obs}).$$
これは、観測値以上に対立仮説寄りの値が帰無仮説下で出る確率。

## 計算例
$T\sim N(0,1)$、$t_{\rm obs}=1.645$ の右片側P値は $1-\Phi(1.645)\approx0.05$。

## 注意
P値は $H_0$ が正しい確率でも、結果が偶然である確率でもない。
<!-- CARD -->

---
id: test-pvalue-two-sided
title: 両側P値を対称な帰無分布で計算する
category: math-testing
subcategory: math-testing-foundations
topic: p-value-two-sided
type: calc_step
difficulty: 2
priority: S
hashtags: [P値, 両側検定, 標準正規分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: P値 }]
---

## 問題
帰無仮説下で標準正規分布に従う $Z\sim N(0,1)$、観測値 $z=2.10$ の両側P値を求めよ。

## 記号・用語
- $\Phi$：標準正規分布の累積分布関数

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

対称な連続帰無分布で両側の極端さを $|Z|$ で測ると、P値は $2P(Z\ge|z_{\rm obs}|)$。

## 答え
対称性より
$$p=2P(Z\ge|2.10|)=2\{1-\Phi(2.10)\}\approx2(0.0179)=0.0358.$$

## 計算例
有意水準5%では $0.0358<0.05$ なので棄却し、1%では棄却しない。

## 注意
非対称な離散分布では「片側P値の2倍」が適切とは限らない。
<!-- CARD -->

---
id: test-pvalue-smallest-level
title: P値を棄却可能な最小有意水準として理解する
category: math-testing
subcategory: math-testing-foundations
topic: p-value-level
type: recognition
difficulty: 2
priority: S
hashtags: [P値, 有意水準, 棄却]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: P値 }]
---

## 問題
P値が $0.032$ だった。この結果を有意水準1%、5%、10%でどう判断するか。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

P値は、観測結果で $H_0$ を棄却できる有意水準の下限と解釈できる。

## 答え
$0.032>0.01$ なので1%では棄却しない。$0.032<0.05<0.10$ なので5%と10%では棄却する。

## 計算例
棄却する有意水準の集合は $[0.032,1]$（境界の扱いを $p\le\alpha$ とする場合）。

## 注意
「棄却しない」は $H_0$ を採択して真と証明することではない。
<!-- CARD -->

---
id: test-power-function-definition
title: 検出力関数を母数ごとの棄却確率として定義する
category: math-testing
subcategory: math-testing-foundations
topic: power-function
type: formula
difficulty: 2
priority: S
hashtags: [検出力（検定力）, 検出力曲線, 棄却確率]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 検出力（検定力） }]
---

## 問題
検定関数 $\phi(X)\in\{0,1\}$（1なら棄却）の検出力関数を定義せよ。

## 記号・用語
- 検出力：対立仮説が真のとき帰無仮説を棄却する確率

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

第二種過誤確率は $\beta(\theta)=1-\pi(\theta)$（$\theta\in\Theta_1$）。

## 一手
検出力曲線は横軸を母数、縦軸を棄却確率にして読む。

## 答え
$$\pi(\theta)=E_\theta[\phi(X)]=P_\theta(\text{$H_0$を棄却}).$$
$\theta\in\Theta_0$ では第一種過誤確率、$\theta\in\Theta_1$ では検出力を表す。

## 計算例
$\pi(1)=0.85$ なら、真の母数が1のとき第二種過誤確率は $0.15$。
<!-- CARD -->

---
id: test-power-normal-one-sided
title: 正規平均の右片側検定の検出力を導く
category: math-testing
subcategory: math-testing-foundations
topic: power-normal
type: calc_step
difficulty: 3
priority: S
hashtags: [検出力（検定力）, 検出力曲線, 正規分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 検出力曲線 }]
---

## 問題
正規分布に従う $X_i\overset{iid}{\sim}N(\mu,\sigma^2)$ について、$\sigma$ は既知とする。$H_0:\mu=\mu_0$ 対 $H_1:\mu>\mu_0$ の有意水準 $\alpha$ 検定の検出力を求めよ。

## 記号・用語
- 検出力：対立仮説が真のとき帰無仮説を棄却する確率
- $\Phi$：標準正規分布の累積分布関数
- $z_q$：$P(Z>z_q)=q$ を満たす標準正規分布の上側 $q$ 点

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$\overline X\sim N(\mu,\sigma^2/n)$ として棄却点を標準化する。

## 一手
臨界値は $H_0$ 下、検出力は真の $\mu$ 下で計算する。

## 答え
棄却条件は $\overline X>\mu_0+z_{\alpha}\sigma/\sqrt n$。真の平均が $\mu$ のとき
$$\pi(\mu)=1-\Phi\left(z_{\alpha}-\frac{\sqrt n(\mu-\mu_0)}\sigma\right).$$

## 計算例
$\alpha=0.05,n=25,\sigma=2,\mu_0=0,\mu=1$ なら
$$\pi(1)=1-\Phi(1.645-2.5)=\Phi(0.855)\approx0.804.$$
<!-- CARD -->

---
id: test-sample-size-power-z
title: 所望の検出力から正規平均検定の標本サイズを逆算する
category: math-testing
subcategory: math-testing-foundations
topic: sample-size-power
type: calc_step
difficulty: 3
priority: A
hashtags: [検出力（検定力）, 標本サイズ, 正規分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 検出力（検定力） }]
---

## 問題
分散既知の正規平均の右片側検定で、差 $\delta=\mu_1-\mu_0>0$ を有意水準 $\alpha$、検出力 $1-\beta$ で検出するための標本サイズを求めよ。

## 記号・用語
- 検出力：対立仮説が真のとき帰無仮説を棄却する確率
- $\Phi$：標準正規分布の累積分布関数
- $z_q$：$P(Z>z_q)=q$ を満たす標準正規分布の上側 $q$ 点

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$1-\beta=1-\Phi\left(z_{\alpha}-\frac{\sqrt n\delta}{\sigma}\right).$$

## 答え
検出力を少なくとも $1-\beta$ にする条件は
$$1-\Phi\left(z_\alpha-\frac{\sqrt n\delta}{\sigma}\right)
\ge 1-\beta,$$
すなわち
$$\Phi\left(z_\alpha-\frac{\sqrt n\delta}{\sigma}\right)\le\beta.$$
$z_\beta$ は上側 $\beta$ 点なので $\Phi^{-1}(\beta)=-z_\beta$。したがって
$$z_\alpha-\frac{\sqrt n\delta}{\sigma}\le -z_\beta
\iff \frac{\sqrt n\delta}{\sigma}\ge z_\alpha+z_\beta.$$
両辺を正の数 $\sigma/\delta$ 倍して二乗すると
$$n\ge\left\{\frac{(z_{\alpha}+z_{\beta})\sigma}{\delta}\right\}^2.$$

## 計算例
$\alpha=0.05,1-\beta=0.8,\sigma=2,\delta=1$ なら
$$n\ge\{(1.645+0.842)2\}^2\approx24.74,$$
よって切り上げて $n=25$。

## 注意
標本サイズは最後に必ず整数へ切り上げる。
<!-- CARD -->

---
id: test-one-two-sided-critical-values
title: 片側検定と両側検定の臨界値を使い分ける
category: math-testing
subcategory: math-testing-foundations
topic: one-two-sided
type: recognition
difficulty: 2
priority: A
hashtags: [片側検定, 両側検定, 棄却域]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 棄却域 }]
---

## 問題
標準正規分布に従う $Z\sim N(0,1)$ を帰無分布とする有意水準5%検定の棄却域を、右片側と両側でそれぞれ書け。

## 記号・用語
- 棄却域：帰無仮説を棄却する統計量・標本結果の集合

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

両側では第一種過誤確率 $\alpha$ を左右に $\alpha/2$ ずつ配分する。

## 答え
右片側は $Z>z_{0.05}=1.645$。両側は $|Z|>z_{0.025}=1.96$。

## 計算例
$z=1.80$ は右片側5%では棄却するが、両側5%では棄却しない。

## 注意
データを見た後で片側・両側を選ぶと有意水準を保てない。
<!-- CARD -->

---
id: test-randomized-boundary
title: 離散検定で境界無作為化確率を求める
category: math-testing
subcategory: math-testing-foundations
topic: randomized-test
type: calc_step
difficulty: 4
priority: A
hashtags: [無作為化検定, 有意水準, 二項分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 有意水準 }]
---

## 問題
$X\sim\operatorname{Binomial}(10,0.5)$。$X\ge9$ なら必ず棄却し、$X=8$ なら確率 $\gamma$ で棄却してサイズを0.05にする。$\gamma$ を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

離散分布で厳密なサイズを作るには、臨界点で確率的に棄却する。

## 答え
$$P(X\ge9)+\gamma P(X=8)=0.05.$$
したがって
$$\frac{11}{1024}+\gamma\frac{45}{1024}=0.05,\qquad
\gamma=\frac{51.2-11}{45}\approx0.8933.$$

## 計算例
$0\le\gamma\le1$ なので実行可能。棄却確率は $11/1024+0.8933(45/1024)\approx0.05$。

## 注意
通常の実務では非無作為化検定を使うことが多いが、最強力検定の理論では重要。
<!-- CARD -->

---
id: test-unbiased-definition
title: 不偏検定を検出力関数で定義する
category: math-testing
subcategory: math-testing-foundations
topic: unbiased-test
type: formula
difficulty: 3
priority: A
hashtags: [不偏検定, 検出力（検定力）, 有意水準]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 検出力（検定力） }]
---

## 問題
有意水準 $\alpha$ の不偏検定を検出力関数 $\pi(\theta)$ で定義せよ。

## 記号・用語
- 検出力：対立仮説が真のとき帰無仮説を棄却する確率

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

サイズがちょうど $\alpha$ の場合、対立仮説上で $\pi(\theta)\ge\alpha$ が不偏性の中心条件。

## 答え
$$\pi(\theta)\le\alpha\quad(\theta\in\Theta_0),\qquad
\pi(\theta)\ge\alpha\quad(\theta\in\Theta_1).$$
すなわち、どの対立母数でも帰無母数より棄却しにくくならない検定。

## 計算例
ある検定で $\pi(\theta_1)=0.03<0.05$ となる対立母数があれば、有意水準5%の不偏検定ではない。

## 注意
推定量の不偏性 $E[T]=\theta$ とは異なる概念である。
<!-- CARD -->

---
id: test-consistency-definition
title: 一致検定を漸近検出力で定義する
category: math-testing
subcategory: math-testing-foundations
topic: consistent-test
type: formula
difficulty: 3
priority: A
hashtags: [一致検定, 検出力（検定力）, 漸近理論]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 検出力（検定力） }]
---

## 問題
検定列 $\phi_n$ が一致検定であるとはどういうことか。

## 記号・用語
- 検出力：対立仮説が真のとき帰無仮説を棄却する確率
- $\Phi$：標準正規分布の累積分布関数

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

一致性は固定した対立仮説の下で標本サイズを増やしたときの検出力極限で定義する。

## 答え
任意の固定対立母数 $\theta\in\Theta_1$ に対して
$$P_\theta(\phi_n=1)\to1\qquad(n\to\infty)$$
となること。

## 計算例
$\pi_n(\theta)=1-\Phi(1.645-\sqrt n\delta/\sigma)$、$\delta>0$ なら、括弧内が $-\infty$ へ行くため $\pi_n(\theta)\to1$。

## 注意
$\delta$ が $1/\sqrt n$ の速さで0へ近づく局所対立では、検出力は1に収束しないことがある。
<!-- CARD -->

---
id: test-ci-duality
title: 信頼区間と両側検定の双対性を使う
category: math-testing
subcategory: math-testing-foundations
topic: confidence-test-duality
type: calc_step
difficulty: 2
priority: A
hashtags: [仮説検定, 信頼区間, 双対性]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 仮説 }]
---

## 問題
$\mu$ の95%信頼区間が $(1.2,2.8)$ だった。両側検定 $H_0:\mu=1$ と $H_0:\mu=2$ を有意水準5%でどう判断するか。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

同じピボット量から作る両側有意水準 $\alpha$ 検定は、$1-\alpha$ 信頼区間に帰無値が含まれないとき棄却する。

## 答え
$1$ は区間外なので $H_0:\mu=1$ を棄却する。$2$ は区間内なので $H_0:\mu=2$ を棄却しない。

## 計算例
区間 $(1.2,2.8)$ に含まれる帰無値全体が、棄却されない母数値の集合である。

## 注意
片側検定には対応する片側信頼限界を用いる。
<!-- CARD -->

---
id: test-function-randomized-definition
title: 検定関数で無作為化検定を表す
category: math-testing
subcategory: math-testing-foundations
topic: test-function
type: formula
difficulty: 3
priority: A
hashtags: [検定関数, 無作為化検定, 検出力（検定力）]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 検定統計量 }]
---

## 問題
検定関数 $\phi(x)$ の値と意味を述べ、非無作為化検定との関係を説明せよ。

## 記号・用語
- 検出力：対立仮説が真のとき帰無仮説を棄却する確率

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

検出力関数は
$$\pi(\theta)=E_\theta[\phi(X)].$$

## 一手
離散分布の境界で $0<\phi(x)<1$ を許すとサイズを厳密に調整できる。

## 答え
$0\le\phi(x)\le1$ とし、標本 $x$ を観測したとき確率 $\phi(x)$ で棄却する。非無作為化検定では $\phi(x)=\boldsymbol1_R(x)$。

## 計算例
$P_\theta(X=0)=0.4,P_\theta(X=1)=0.6$、$\phi(0)=0,\phi(1)=1/2$ なら $\pi(\theta)=0.3$。
<!-- CARD -->

---
id: test-composite-null-pvalue
title: 複合帰無仮説のP値を上限確率で作る
category: math-testing
subcategory: math-testing-foundations
topic: composite-null-pvalue
type: calc_step
difficulty: 3
priority: S
hashtags: [P値, 複合仮説, 有意水準]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: P値 }]
---

## 問題
$H_0:\theta\in\Theta_0$ で、統計量 $T$ が大きいほど対立仮説寄りである。妥当なP値の基本形を述べよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

帰無仮説上で上限を取れば、各 $\theta\in\Theta_0$ に対して第一種過誤を制御できる。

## 答え
$$p(x)=\sup_{\theta\in\Theta_0}P_\theta(T\ge T(x)).$$
帰無母数のうち、観測値以上に極端となる確率を最大にするものを使う。

## 計算例
$H_0:p\le0.5$、$X\sim\operatorname{Binomial}(n,p)$、右片側なら尾確率は $p$ とともに増えるので上限は $p=0.5$ で取る。

## 注意
都合のよい帰無母数を1つ選ぶのではなく、最も棄却しにくい帰無母数を使う。
<!-- CARD -->

---
id: test-discrete-pvalue-conservative
title: 離散分布のP値が一様分布にならない理由を確認する
category: math-testing
subcategory: math-testing-foundations
topic: discrete-pvalue
type: calc_step
difficulty: 3
priority: A
hashtags: [P値, 離散分布, 保守性]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: P値 }]
---

## 問題
$X\sim\operatorname{Bernoulli}(1/2)$ の右片側P値を $p(X)=P_{1/2}(\widetilde X\ge X)$ とする。ただし $\widetilde X$ は帰無分布に従う独立な比較用確率変数である。P値の分布を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

妥当なP値は $P_{H_0}(p\le u)\le u$ を満たす。一様分布になる必要はない。

## 答え
$X=0$ なら $p=1$、$X=1$ なら $p=1/2$。したがって
$$P(p=1)=P(p=1/2)=1/2.$$

## 計算例
$u=0.6$ なら $P(p\le0.6)=1/2\le0.6$。$u=0.4$ なら確率は0。

## 注意
連続な帰無分布では標準条件の下で一様分布になるが、離散P値は一般に保守的。
<!-- CARD -->

---
id: test-power-curve-reading
title: 検出力曲線からサイズと第二種過誤を読み取る
category: math-testing
subcategory: math-testing-foundations
topic: power-curve
type: recognition
difficulty: 2
priority: S
hashtags: [検出力曲線, 第二種の過誤, 有意水準]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 検出力曲線 }]
---

## 問題
$H_0:\theta\le0$ 対 $H_1:\theta>0$ の検出力曲線は $\theta$ の非減少関数で、$\pi(0)=0.05,\pi(1)=0.70,\pi(2)=0.95$ を満たす。サイズと各対立母数での第二種過誤を答えよ。

## 記号・用語
- 検出力：対立仮説が真のとき帰無仮説を棄却する確率

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$\text{size}=\sup_{\theta\in\Theta_0}\pi(\theta),\qquad \beta(\theta)=1-\pi(\theta).$$

## 答え
サイズは帰無境界で $0.05$。第二種過誤は $\beta(1)=0.30$、$\beta(2)=0.05$。

## 計算例
$\theta=2$ は帰無境界から遠いため、$\theta=1$ より検出力が高い。

## 注意
右片側検定の検出力曲線が常に単調とは限らず、単調尤度比などの構造が根拠になる。
<!-- CARD -->

---
id: test-standardized-effect-power
title: 検出力が標準化効果量で決まることを確認する
category: math-testing
subcategory: math-testing-foundations
topic: standardized-effect
type: calc_step
difficulty: 2
priority: A
hashtags: [検出力（検定力）, 効果量, 標本サイズ]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 検出力（検定力） }]
---

## 問題
正規平均の右片側検定で、検出力を支配する標準化効果量を示せ。

## 記号・用語
- 検出力：対立仮説が真のとき帰無仮説を棄却する確率
- $\Phi$：標準正規分布の累積分布関数

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

同じ有意水準なら検出力は $\sqrt n d$ が大きいほど高い。

## 一手
効果量が半分になると、同じ検出力には標本サイズが4倍必要。

## 答え
検出力
$$1-\Phi\left(z_{\alpha}-\frac{\sqrt n(\mu-\mu_0)}\sigma\right)$$
は $d=(\mu-\mu_0)/\sigma$ を用いると $1-\Phi(z_{\alpha}-\sqrt n d)$。

## 計算例
$d=0.5,n=16$ と $d=0.25,n=64$ はともに $\sqrt n d=2$ なので同じ検出力。
<!-- CARD -->

---
id: test-familywise-error
title: 多重検定の家族内第一種過誤率を計算する
category: math-testing
subcategory: math-testing-foundations
topic: multiple-testing
type: calc_step
difficulty: 2
priority: A
hashtags: [多重検定, 第一種の過誤, 家族内誤差率]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 第一種の過誤 }]
---

## 問題
独立な真の帰無仮説を20個、それぞれ有意水準5%で検定する。少なくとも1個を誤って棄却する確率を求めよ。

## 記号・用語
- FWER：家族内誤り率（family-wise error rate）

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

独立なら $m$ 検定の家族内第一種過誤率は $1-(1-\alpha)^m$。

## 答え
誤棄却が1個もない確率は $0.95^{20}$ だから
$$\operatorname{FWER}=1-0.95^{20}\approx0.642.$$

## 計算例
個別5%でも、20個まとめると約64.2%まで膨らむ。

## 注意
検定間に依存がある場合、この等式は使えない。
<!-- CARD -->

---
id: test-bonferroni-threshold
title: Bonferroni法で多重検定の閾値を決める
category: math-testing
subcategory: math-testing-foundations
topic: bonferroni
type: calc_step
difficulty: 2
priority: A
hashtags: [多重検定, Bonferroni, 有意水準]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 有意水準 }]
---

## 問題
10個の仮説を家族内有意水準0.05で検定する。Bonferroni法の個別有意水準を求め、P値 $0.003,0.008$ の判断をせよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

Booleの不等式より
$$P(\text{1個以上の誤棄却})\le\sum_{j=1}^{m}\alpha_j.$$

## 答え
個別閾値は $0.05/10=0.005$。したがって $0.003$ は棄却し、$0.008$ は棄却しない。

## 計算例
$\alpha_j=0.005$ を10個に配れば上限は $10(0.005)=0.05$。

## 注意
Bonferroni法は検定間の独立性を仮定しない。
<!-- CARD -->

---
id: test-data-dependent-sidedness
title: データを見て検定方向を選ぶ誤りを計算する
category: math-testing
subcategory: math-testing-foundations
topic: data-snooping
type: pitfall
difficulty: 3
priority: A
hashtags: [片側検定, 第一種の過誤, 多重性]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 第一種の過誤 }]
---

## 問題
標準正規分布に従う $Z\sim N(0,1)$ を見て、符号に応じて右または左の5%片側検定を選ぶと、実際の第一種過誤確率はいくらか。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

検定方向はデータを見る前に定める。事後選択は2つの片側検定を実行したことになる。

## 答え
棄却条件は $Z>1.645$ または $Z<-1.645$、すなわち $|Z|>1.645$。よって
$$P(|Z|>1.645)=2(0.05)=0.10.$$

## 計算例
名目5%でも実際は10%となり、有意水準を保たない。

## 注意
方向が事前に定まらないなら、最初から両側5%の臨界値1.96を使う。
<!-- CARD -->

---
id: test-np-lemma-statement
title: ネイマン・ピアソンの基本定理を再生する
category: math-testing
subcategory: math-test-derivation
topic: neyman-pearson-lemma
type: theorem
difficulty: 3
priority: S
hashtags: [ネイマン・ピアソンの基本定理, 最強力検定, 尤度比]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ネイマン・ピアソンの基本定理 }]
---

## 問題
単純仮説 $H_0:\theta=\theta_0$ 対 $H_1:\theta=\theta_1$ に対するネイマン・ピアソンの基本定理を述べよ。

## 記号・用語
- 棄却域：帰無仮説を棄却する統計量・標本結果の集合

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

ある $k\ge0$ に対し $f(x;\theta_1)>k f(x;\theta_0)$ なら棄却し、境界では必要に応じて無作為化する。

## 答え
尤度比
$$\frac{f(x;\theta_1)}{f(x;\theta_0)}$$
が大きい標本点から棄却域に入れ、閾値と境界無作為化を選んでサイズを $\alpha$ にする検定は、有意水準 $\alpha$ の全ての検定の中で最強力である。

## 計算例
尤度比が統計量 $T$ の単調増加関数なら、棄却域は $T>c$ の形になる。

## 注意
直接保証されるのは単純仮説同士での最強力性。
<!-- CARD -->

---
id: test-np-normal-mean
title: ネイマン・ピアソンの基本定理で正規平均の棄却域を導く
category: math-testing
subcategory: math-test-derivation
topic: np-normal-mean
type: calc_step
difficulty: 3
priority: S
hashtags: [ネイマン・ピアソンの基本定理, 正規分布, 最強力検定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ネイマン・ピアソンの基本定理 }]
---

## 問題
正規分布に従う $X_i\overset{iid}{\sim}N(\mu,\sigma^2)$ について、$\sigma^2$ は既知、$\mu_1>\mu_0$ とする。$H_0:\mu=\mu_0$ 対 $H_1:\mu=\mu_1$ の最強力検定を導け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

ネイマン・ピアソンの基本定理と $\overline X\sim N(\mu_0,\sigma^2/n)$。

## 一手
尤度比のうち標本に依存する項だけを残し、単調方向を判定する。

## 答え
対数尤度比は定数項を除いて
$$\log\frac{L(\mu_1)}{L(\mu_0)}
=\frac{\mu_1-\mu_0}{\sigma^2}\sum_iX_i
-\frac{n(\mu_1^2-\mu_0^2)}{2\sigma^2}.$$
$\mu_1-\mu_0>0$ なので $\overline X$ の単調増加関数。したがって $\overline X>c$ で棄却する。

## 計算例
サイズ $\alpha$ には $c=\mu_0+z_{\alpha}\sigma/\sqrt n$ とする。
<!-- CARD -->

---
id: test-np-exponential-rate
title: 指数分布の率に対する最強力検定を導く
category: math-testing
subcategory: math-test-derivation
topic: np-exponential
type: calc_step
difficulty: 3
priority: A
hashtags: [ネイマン・ピアソンの基本定理, 指数分布, 最強力検定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 最強力検定 }]
---

## 問題
$X_i\overset{iid}{\sim}\operatorname{Exp}(\lambda)$、密度 $\lambda e^{-\lambda x}$（$x>0$）、$\lambda_1>\lambda_0$ とする。$H_0:\lambda=\lambda_0$ 対 $H_1:\lambda=\lambda_1$ の棄却方向を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

率が大きいほど平均 $1/\lambda$ が小さいため、小さい観測和が対立仮説を支持する。

## 答え
$$\frac{L(\lambda_1)}{L(\lambda_0)}
=\left(\frac{\lambda_1}{\lambda_0}\right)^n
\exp\left[-(\lambda_1-\lambda_0)\sum_iX_i\right].$$
$\lambda_1-\lambda_0>0$ なので、尤度比は $\sum X_i$ の減少関数。よって $\sum X_i<c$ で棄却する。

## 計算例
$2\lambda_0\sum_iX_i\sim\chi^2_{2n}$ より、$\chi^2_{\nu,\gamma}$ を上側 $\gamma$ 点とする正本の記法では、左側確率が $\alpha$ となる臨界値は $c=\chi^2_{2n,1-\alpha}/(2\lambda_0)$。

## 注意
指数分布を平均母数で表す場合は棄却方向が逆になる。
<!-- CARD -->

---
id: test-most-powerful-definition
title: 最強力検定を検出力の比較で定義する
category: math-testing
subcategory: math-test-derivation
topic: most-powerful
type: formula
difficulty: 2
priority: A
hashtags: [最強力検定, 検出力（検定力）, 有意水準]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 最強力検定 }]
---

## 問題
単純対立仮説 $\theta=\theta_1$ に対する有意水準 $\alpha$ の最強力検定を定義せよ。

## 記号・用語
- 検出力：対立仮説が真のとき帰無仮説を棄却する確率

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

最強力性は指定された対立母数 $\theta_1$ での検出力最大化である。

## 答え
有意水準 $\alpha$ 以下の任意の検定 $\psi$ に対して
$$E_{\theta_1}[\phi(X)]\ge E_{\theta_1}[\psi(X)]$$
を満たす検定 $\phi$。

## 計算例
検定AとBの検出力が $0.82,0.75$ でサイズがともに0.05なら、この2つの間ではAが強力。

## 注意
1つの対立母数で最強力でも、別の対立母数で最強力とは限らない。
<!-- CARD -->

---
id: test-monotone-likelihood-ratio
title: 単調尤度比の定義を統計量で確認する
category: math-testing
subcategory: math-test-derivation
topic: monotone-likelihood-ratio
type: formula
difficulty: 3
priority: A
hashtags: [単調尤度比, 尤度比, 検定統計量]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 尤度比による棄却域の導出 }]
---

## 問題
統計量 $T(X)$ に関する単調尤度比性を定義せよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

単調尤度比は、すべての片側対立に共通する棄却方向を与える。

## 答え
$\theta_2>\theta_1$ のとき
$$\frac{f(x;\theta_2)}{f(x;\theta_1)}$$
が $T(x)$ の非減少関数なら、分布族は $T$ に関して単調尤度比をもつ。

## 計算例
二項分布では尤度比の隣接比が $p_2(1-p_1)/[p_1(1-p_2)]>1$ なので $T=X$ に関して単調増加。

## 注意
「尤度が母数について単調」ではなく、2母数値の尤度比が統計量について単調という性質。
<!-- CARD -->

---
id: test-karlin-rubin-principle
title: Karlin–Rubin型の考え方で一様最強力検定検定を得る
category: math-testing
subcategory: math-test-derivation
topic: karlin-rubin
type: theorem
difficulty: 4
priority: A
hashtags: [一様最強力検定, 単調尤度比, Karlin-Rubin]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: Karlin–Rubin型の考え方 }]
---

## 問題
$T$ に関して単調尤度比をもつ1母数分布族で、$H_0:\theta\le\theta_0$ 対 $H_1:\theta>\theta_0$ の一様最強力検定検定の形を述べよ。

## 記号・用語
- 一様最強力検定：一様最強力（uniformly most powerful）

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

単調尤度比性により、各単純対立に対するNeyman–Pearson検定の棄却方向が一致する。

## 一手
複合帰無仮説のサイズは通常、単調性から境界 $\theta_0$ で最大になる。

## 答え
$$T>c$$
で棄却し、境界 $\theta=\theta_0$ でサイズ $\alpha$ となるよう $c$ を決める。この検定は全ての $\theta>\theta_0$ に対して一様最強力。

## 計算例
連続分布なら $P_{\theta_0}(T>c)=\alpha$。離散分布なら必要に応じ境界無作為化を使う。
<!-- CARD -->

---
id: test-ump-binomial-one-sided
title: 二項分布の右片側一様最強力検定検定を構成する
category: math-testing
subcategory: math-test-derivation
topic: ump-binomial
type: calc_step
difficulty: 3
priority: A
hashtags: [一様最強力検定, 二項分布, 単調尤度比]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 一様最強力検定 }]
---

## 問題
$X\sim\operatorname{Binomial}(20,p)$ で $H_0:p\le0.3$ 対 $H_1:p>0.3$ を考える。一様最強力検定検定の棄却方向と臨界値の決め方を述べよ。

## 記号・用語
- 一様最強力検定：一様最強力（uniformly most powerful）
- 棄却域：帰無仮説を棄却する統計量・標本結果の集合

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

Karlin–Rubin型の定理により、この境界無作為化を含む右片側検定は全ての $p>0.3$ に対して一様最強力検定。

## 答え
二項分布は $X$ に関して単調尤度比をもつ。整数 $c$ と $0\le\gamma\le1$ を
$$P_{0.3}(X>c)+\gamma P_{0.3}(X=c)=\alpha$$
となるよう選び、$X>c$ なら必ず棄却し、$X=c$ なら確率 $\gamma$ で棄却する。

## 計算例
$\alpha=0.05$ では
$$P_{0.3}(X\ge10)\approx0.04796\le0.05,\qquad
P_{0.3}(X\ge9)\approx0.11333>0.05.$$
したがって $X\ge10$ なら必ず棄却し、$X=9$ なら確率
$$\gamma=\frac{0.05-P_{0.3}(X\ge10)}{P_{0.3}(X=9)}
\approx0.03118$$
で棄却すれば、サイズが厳密に0.05の一様最強力検定検定となる。なお、非無作為化検定に限定する場合の棄却域は $\{X\ge10\}$ である。

## 注意
臨界値計算は帰無境界 $p=0.3$ で行う。
<!-- CARD -->

---
id: test-ump-normal-one-sided
title: 正規平均の右片側検定が一様最強力検定であることを示す
category: math-testing
subcategory: math-test-derivation
topic: ump-normal
type: calc_step
difficulty: 3
priority: A
hashtags: [一様最強力検定, 正規分布, 単調尤度比]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 一様最強力検定 }]
---

## 問題
正規分布に従う $X_i\overset{iid}{\sim}N(\mu,\sigma^2)$ について、$\sigma^2$ は既知とする。$H_0:\mu\le\mu_0$ 対 $H_1:\mu>\mu_0$ の一様最強力検定検定を示せ。

## 記号・用語
- 一様最強力検定：一様最強力（uniformly most powerful）
- 棄却域：帰無仮説を棄却する統計量・標本結果の集合

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

Karlin–Rubin型の定理と、帰無境界で $\overline X\sim N(\mu_0,\sigma^2/n)$。

## 一手
単純対立ごとの最強力検定が同じ棄却域の形になることを確認する。

## 答え
$\mu_2>\mu_1$ の尤度比は $\sum X_i$ の単調増加関数なので、$\overline X$ に関して単調尤度比をもつ。したがって
$$\overline X>\mu_0+z_{\alpha}\frac\sigma{\sqrt n}$$
で棄却する検定が一様最強力検定。

## 計算例
$\alpha=0.05,n=100,\sigma=2$ なら臨界点は $\mu_0+1.645(0.2)=\mu_0+0.329$。
<!-- CARD -->

---
id: test-no-ump-two-sided
title: 両側対立で一様最強力検定検定が一般に存在しない理由を説明する
category: math-testing
subcategory: math-test-derivation
topic: no-ump-two-sided
type: recognition
difficulty: 3
priority: A
hashtags: [一様最強力検定, 両側検定, 最強力検定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 両側検定で一様最強力検定が存在しない例 }]
---

## 問題
正規平均について $H_0:\mu=0$ 対 $H_1:\mu\ne0$ で一様最強力検定検定が一般に存在しない理由を述べよ。

## 記号・用語
- 一様最強力検定：一様最強力（uniformly most powerful）
- 棄却域：帰無仮説を棄却する統計量・標本結果の集合
- 検出力：対立仮説が真のとき帰無仮説を棄却する確率

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

Neyman–Pearsonの基本定理が与える棄却方向が対立母数の符号で逆転する。

## 答え
$\mu_1>0$ に対する最強力検定は大きい $\overline X$ で棄却し、$\mu_1<0$ に対する最強力検定は小さい $\overline X$ で棄却する。両方向で同時に最強力となる1つの棄却域は作れない。

## 計算例
サイズ5%を右尾だけに配れば正方向に強いが負方向の検出力が低く、左右2.5%ずつならどちらの単純対立にも最強力ではない。

## 注意
不偏検定などクラスを制限すれば、一様最強力不偏検定が存在する場合がある。
<!-- CARD -->

---
id: test-likelihood-ratio-ordering
title: 単純仮説の尤度比で標本点を並べる
category: math-testing
subcategory: math-test-derivation
topic: likelihood-ratio-ordering
type: calc_step
difficulty: 3
priority: A
hashtags: [尤度比検定, ネイマン・ピアソンの基本定理, 棄却域]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 尤度比による棄却域の導出 }]
---

## 問題
標本空間が $\{a,b,c\}$ で、$H_0,H_1$ 下の確率がそれぞれ $(0.6,0.3,0.1)$、$(0.1,0.3,0.6)$ である。尤度比順序を求めよ。

## 記号・用語
- 棄却域：帰無仮説を棄却する統計量・標本結果の集合
- 検出力：対立仮説が真のとき帰無仮説を棄却する確率

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

単純仮説同士では $f_1(x)/f_0(x)$ が大きい標本点ほど対立仮説を強く支持する。

## 答え
$$\frac{f_1}{f_0}(a)=\frac16,\qquad
\frac{f_1}{f_0}(b)=1,\qquad
\frac{f_1}{f_0}(c)=6.$$
したがって $c,b,a$ の順に棄却域へ入れる。

## 計算例
サイズ0.1なら $R=\{c\}$ で、検出力は $P_1(c)=0.6$。

## 注意
尤度比の分子と分母を逆にした場合は並べる方向も逆になる。
<!-- CARD -->

---
id: test-glrt-definition
title: 一般化尤度比検定の統計量を定義する
category: math-testing
subcategory: math-test-derivation
topic: generalized-likelihood-ratio
type: formula
difficulty: 3
priority: S
hashtags: [尤度比検定, 一般化尤度比, 最尤推定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 尤度比検定 }]
---

## 問題
$H_0:\theta\in\Theta_0$ 対 $H_1:\theta\in\Theta\setminus\Theta_0$ の一般化尤度比統計量を定義せよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

分子は帰無仮説の制約付き最大尤度、分母は制約なし最大尤度。

## 答え
$$\Lambda(x)=\frac{\sup_{\theta\in\Theta_0}L(\theta;x)}{\sup_{\theta\in\Theta}L(\theta;x)},qquad0\le\Lambda(x)\le1.$$
$\Lambda$ が小さいとき $H_0$ を棄却する。

## 計算例
制約付き最大尤度が0.02、制約なし最大尤度が0.05なら $\Lambda=0.4$。

## 注意
最大化した尤度の比であり、母数推定値そのものの比ではない。
<!-- CARD -->

---
id: test-glrt-normal-mean-known-variance
title: 正規平均の一般化尤度比統計量を導く
category: math-testing
subcategory: math-test-derivation
topic: glrt-normal-mean
type: calc_step
difficulty: 3
priority: S
hashtags: [尤度比検定, 正規分布, 両側検定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 尤度比検定 }]
---

## 問題
正規分布に従う $X_i\overset{iid}{\sim}N(\mu,\sigma^2)$ について、$\sigma^2$ は既知として、$H_0:\mu=\mu_0$ の一般化尤度比統計量を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$\sum_i(X_i-\mu_0)^2
=\sum_i(X_i-\overline X)^2+n(\overline X-\mu_0)^2.$$

## 一手
分子と分母の対数尤度差を取り、共通の残差平方和を消す。

## 答え
制約なし最尤推定量は $\widehat\mu=\overline X$。平方完成により
$$-2\log\Lambda
=\frac{n(\overline X-\mu_0)^2}{\sigma^2}=Z^2.$$
したがって $|Z|$ が大きいとき棄却する。

## 計算例
$n=25,\sigma=2,\overline x-\mu_0=1$ なら $-2\log\Lambda=25/4=6.25$。
<!-- CARD -->

---
id: test-glrt-normal-variance-known-mean
title: 正規分散の一般化尤度比統計量を組み立てる
category: math-testing
subcategory: math-test-derivation
topic: glrt-normal-variance
type: calc_step
difficulty: 4
priority: A
hashtags: [尤度比検定, 正規分布, 分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 尤度比検定 }]
---

## 問題
正規分布に従う $X_i\overset{iid}{\sim}N(\mu,\tau)$ について、$\mu$ は既知、分散母数は $\tau>0$ とし、$H_0:\tau=\tau_0$ を検定する。$Q=\sum_i(X_i-\mu)^2$ を用いて $\Lambda$ を表せ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

正規分布の尤度は $\tau^{-n/2}\exp\{-Q/(2\tau)\}$ に比例する。

## 答え
制約なし最尤推定量は $\widehat\tau=Q/n$。したがって
$$\Lambda
=\frac{\tau_0^{-n/2}\exp\{-Q/(2\tau_0)\}}
{(Q/n)^{-n/2}\exp(-n/2)}
=\left(\frac{Q}{n\tau_0}\right)^{n/2}
\exp\left(\frac n2-\frac{Q}{2\tau_0}\right).$$

## 計算例
$Q=n\tau_0$ なら $\Lambda=1$。そこから小さくても大きくても $\Lambda$ は減少するため両側棄却となる。

## 注意
分散の検定では単に $Q$ が大きい場合だけでなく、小さすぎる場合も帰無仮説に反する。
<!-- CARD -->

---
id: test-lr-deviance-statistic
title: 尤度比を逸脱度統計量へ変換する
category: math-testing
subcategory: math-test-derivation
topic: lr-deviance
type: formula
difficulty: 3
priority: S
hashtags: [尤度比検定, 逸脱度, Wilksの定理]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 尤度比検定統計量 }]
---

## 問題
$0<\Lambda\le1$ をなぜ $-2\log\Lambda$ に変換するのか。棄却方向も述べよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$-\log x$ は $0<x\le1$ で非負かつ減少する $x$ に対して増加する。

## 答え
$\Lambda$ が小さいほど帰無仮説に反するため、単調変換
$$D=-2\log\Lambda\ge0$$
を使えば、$D$ が大きいとき棄却となる。正則条件下でカイ二乗近似が使える。

## 計算例
$\Lambda=0.2$ なら $D=-2\log0.2\approx3.219$。

## 注意
係数2は対数尤度の2次近似をカイ二乗分布へ対応させる。
<!-- CARD -->

---
id: test-wilks-theorem
title: Wilksの定理で尤度比検定の自由度を決める
category: math-testing
subcategory: math-test-derivation
topic: wilks-theorem
type: theorem
difficulty: 4
priority: A
hashtags: [Wilksの定理, 尤度比検定, カイ二乗分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 尤度比検定統計量 }]
---

## 問題
正則な一般化尤度比検定に対するWilksの定理を述べよ。

## 記号・用語
- 母数空間：母数が取り得る値をすべて集めた集合
- $\xrightarrow{d}$：分布収束

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

自由度は独立な制約の個数、すなわち次元差 $p-q$。

## 答え
全母数空間の次元を $p$、帰無仮説の制約下の次元を $q$ とすると、帰無仮説下で
$$-2\log\Lambda\xrightarrow{d}\chi^2_{p-q}.$$

## 計算例
3母数モデルで独立な2制約を課すなら $p-q=2$ で、極限分布は $\chi^2_2$。

## 注意
有限標本で厳密にカイ二乗分布に従うという定理ではない。
<!-- CARD -->

---
id: test-wilks-restriction-rank
title: 制約の階数からWilks統計量の自由度を数える
category: math-testing
subcategory: math-test-derivation
topic: wilks-degrees-freedom
type: calc_step
difficulty: 3
priority: A
hashtags: [Wilksの定理, 自由度, 制約]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 尤度比検定統計量 }]
---

## 問題
$\theta=(\theta_1,\theta_2,\theta_3,\theta_4)$ に対し $H_0:\theta_1=0,\ \theta_2=\theta_3$ を課す。Wilks近似の自由度を求めよ。

## 記号・用語
- $\xrightarrow{d}$：分布収束

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

滑らかな制約 $r(\theta)=0$ のJacobianの階数が独立制約数となる。

## 答え
独立な制約は2本なので、全空間4次元、制約空間2次元。したがって
$$-2\log\Lambda\xrightarrow{d}\chi^2_2.$$

## 計算例
$\theta_4$ は自由、$\theta_2=\theta_3$ は1個の自由母数を残すため、帰無空間は2次元。

## 注意
式の本数ではなく、線形従属を除いた独立制約数を数える。
<!-- CARD -->

---
id: test-wilks-boundary-failure
title: 母数境界でWilksの定理を使えない場合を判定する
category: math-testing
subcategory: math-test-derivation
topic: wilks-boundary
type: condition
difficulty: 4
priority: A
hashtags: [Wilksの定理, 境界, 正則性条件]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 尤度比検定統計量 }]
---

## 問題
分散成分 $\tau\ge0$ について $H_0:\tau=0$ を検定するとき、通常のWilksの定理をそのまま使えるか。

## 記号・用語
- 母数空間：母数が取り得る値をすべて集めた集合

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

Wilksの定理は真の母数が母数空間の内点で、情報行列が非退化などの正則条件を要する。

## 答え
使えない。帰無値0は母数空間 $[0,\infty)$ の内部ではなく境界にあり、通常の正則条件を破る。

## 計算例
単純に制約数1として $\chi^2_1$ を使うのではなく、問題固有の混合カイ二乗分布などを確認する。

## 注意
境界、識別不能、混合モデル、小標本はWilks近似の典型的注意点。
<!-- CARD -->

---
id: test-wald-general
title: ワルド型検定統計量を一般形で書く
category: math-testing
subcategory: math-test-derivation
topic: wald-test
type: formula
difficulty: 3
priority: S
hashtags: [ワルド型検定, 漸近正規性, 標準誤差]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ワルド型検定 }]
---

## 問題
$\widehat\theta$ が漸近正規であるとき、$H_0:\theta=\theta_0$ の1次元Wald統計量を書け。

## 記号・用語
- SE：標準誤差（standard error）
- $\xrightarrow{d}$：分布収束

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

最尤推定量なら標準誤差は観測情報量または期待情報量の逆数から推定する。

## 答え
$$Z_W=\frac{\widehat\theta-\theta_0}{\widehat{\operatorname{SE}}(\widehat\theta)},qquad
W=Z_W^2.$$
帰無仮説下で $Z_W\xrightarrow{d}N(0,1)$、$W\xrightarrow{d}\chi^2_1$。

## 計算例
$\widehat\theta=1.4,\theta_0=1,\widehat{\operatorname{SE}}=0.2$ なら $Z_W=2$、$W=4$。

## 注意
Wald検定は推定値で分散を評価するため、境界近くや強い非線形変換で不安定になりうる。
<!-- CARD -->

---
id: test-wald-bernoulli-numeric
title: ベルヌーイ母数のWald検定を数値計算する
category: math-testing
subcategory: math-test-derivation
topic: wald-bernoulli
type: calc_step
difficulty: 3
priority: S
hashtags: [ワルド型検定, ベルヌーイ分布, P値]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ワルド型検定 }]
---

## 問題
$X_i\overset{iid}{\sim}\operatorname{Bernoulli}(p)$、$n=100$、成功数60。$H_0:p=0.5$ のWald統計量を求めよ。

## 記号・用語
- $\Phi$：標準正規分布の累積分布関数

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$Z_W=\frac{\widehat p-p_0}{\sqrt{\widehat p(1-\widehat p)/n}}.$$

## 答え
$\widehat p=0.6$、推定標準誤差は
$$\sqrt{\frac{\widehat p(1-\widehat p)}n}=\sqrt{\frac{0.24}{100}}\approx0.0490.$$
したがって $Z_W=(0.6-0.5)/0.0490\approx2.041$。

## 計算例
両側P値は $2\{1-\Phi(2.041)\}\approx0.041$ で、5%では棄却する。

## 注意
分母に帰無値 $p_0$ を使う統計量はScore型であり、Wald型と区別する。
<!-- CARD -->

---
id: test-score-general
title: スコア型検定統計量を帰無値で構成する
category: math-testing
subcategory: math-test-derivation
topic: score-test
type: formula
difficulty: 3
priority: A
hashtags: [スコア型検定, スコア関数, フィッシャー情報量（1次元）]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: スコア型検定 }]
---

## 問題
1次元母数の $H_0:\theta=\theta_0$ に対するScore統計量を書け。

## 記号・用語
- $\xrightarrow{d}$：分布収束

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

帰無値でスコアと情報量を評価するため、制約なし最尤推定量を計算しなくてもよい場合がある。

## 答え
スコア $U_n(\theta)=\partial\ell_n(\theta)/\partial\theta$ を用いて
$$S=\frac{U_n(\theta_0)^2}{I_n(\theta_0)}\xrightarrow{d}\chi^2_1.$$
符号付きなら $Z_S=U_n(\theta_0)/\sqrt{I_n(\theta_0)}\xrightarrow{d}N(0,1)$。

## 計算例
$U_n(\theta_0)=6,I_n(\theta_0)=9$ なら $Z_S=2$、$S=4$。

## 注意
分母はスコアの帰無仮説下の分散である。
<!-- CARD -->

---
id: test-score-bernoulli-numeric
title: ベルヌーイ母数のScore検定を数値計算する
category: math-testing
subcategory: math-test-derivation
topic: score-bernoulli
type: calc_step
difficulty: 3
priority: A
hashtags: [スコア型検定, ベルヌーイ分布, P値]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: スコア型検定 }]
---

## 問題
$X_i\overset{iid}{\sim}\operatorname{Bernoulli}(p)$、$n=100$、成功数60。$H_0:p=0.5$ のScore統計量を求めよ。

## 記号・用語
- $\Phi$：標準正規分布の累積分布関数

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

ベルヌーイ分布では $I_n(p_0)=n/[p_0(1-p_0)]$ を用いると同じ式を得る。

## 一手
Score型では標準誤差を帰無値 $p_0$ で評価する。

## 答え
$$Z_S=\frac{\widehat p-p_0}{\sqrt{p_0(1-p_0)/n}}
=\frac{0.6-0.5}{\sqrt{0.25/100}}=2.$$

## 計算例
両側P値は $2\{1-\Phi(2)\}\approx0.0455$。
<!-- CARD -->

---
id: test-lr-bernoulli-numeric
title: ベルヌーイ母数の尤度比検定統計量を数値計算する
category: math-testing
subcategory: math-test-derivation
topic: lr-bernoulli
type: calc_step
difficulty: 3
priority: S
hashtags: [尤度比検定, ベルヌーイ分布, 逸脱度]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 尤度比検定 }]
---

## 問題
$n=100$ のベルヌーイ標本で成功数60。$H_0:p=0.5$ の $-2\log\Lambda$ を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

二項対数尤度差は
$$2\{x\log(\widehat p/p_0)+(n-x)\log[(1-\widehat p)/(1-p_0)]\}.$$

## 答え
$\widehat p=0.6$ なので
$$-2\log\Lambda
=2\left[60\log\frac{0.6}{0.5}+40\log\frac{0.4}{0.5}\right]
\approx4.027.$$

## 計算例
$\chi^2_1$ の5%点3.841より大きいため、漸近5%検定では棄却する。

## 注意
$0\log0$ が現れる場合は極限値0として扱う。
<!-- CARD -->

---
id: test-lr-wald-score-comparison
title: 尤度比・Wald・Score検定の評価点を比較する
category: math-testing
subcategory: math-test-derivation
topic: asymptotic-test-equivalence
type: recognition
difficulty: 3
priority: S
hashtags: [尤度比検定, ワルド型検定, スコア型検定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 尤度比・Wald・Scoreの漸近同値 }]
---

## 問題
尤度比・Wald・Score検定が何を比較し、どの点で曲率を評価するか整理せよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

正則条件下で3統計量は帰無仮説下に同じカイ二乗極限分布をもち、差は $o_p(1)$。

## 答え
尤度比は制約付き・制約なし最大対数尤度の差、Waldは $\widehat\theta$ と帰無集合の距離を推定値側の分散で標準化、Scoreは帰無値での対数尤度の傾きを帰無情報量で標準化する。

## 計算例
ベルヌーイ例 $n=100,x=60,p_0=0.5$ では、尤度比 $\approx4.027$、Wald $\approx4.167$、Score $=4$ と近い。

## 注意
有限標本では一致せず、境界や弱い識別では差が大きくなりうる。
<!-- CARD -->

---
id: test-local-alternative-power
title: 局所対立仮説で漸近検出力を求める
category: math-testing
subcategory: math-test-derivation
topic: local-alternatives
type: calc_step
difficulty: 4
priority: A
hashtags: [検出力関数, 局所対立, 漸近理論]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 検出力関数の計算 }]
---

## 問題
正規分布に従う $X_i\overset{iid}{\sim}N(\mu,1)$ について、右片側Z検定で局所対立 $\mu_n=h/\sqrt n$ を考える。漸近検出力を求めよ。

## 記号・用語
- 検出力：対立仮説が真のとき帰無仮説を棄却する確率
- $\Phi$：標準正規分布の累積分布関数

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$1/\sqrt n$ の局所対立では標準化後の平均移動が有限値 $h$ に残る。

## 答え
$Z=\sqrt n\overline X$ は $\mu_n$ の下で $N(h,1)$。棄却条件 $Z>z_{\alpha}$ より
$$\pi(h)=1-\Phi(z_{\alpha}-h).$$

## 計算例
$\alpha=0.05,h=1$ なら $\pi(1)=1-\Phi(0.645)\approx0.259$。

## 注意
固定対立 $\mu>0$ なら検出力は1へ収束するが、局所対立では非退化な極限となる。
<!-- CARD -->

---
id: test-power-binomial-exact
title: 二項検定の検出力を正確に計算する
category: math-testing
subcategory: math-test-derivation
topic: exact-power-binomial
type: calc_step
difficulty: 3
priority: S
hashtags: [検出力関数, 二項分布, 正確検定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 検出力関数の計算 }]
---

## 問題
$X\sim\operatorname{Binomial}(10,p)$ で $X\ge8$ のとき棄却する。$p=0.7$ での検出力を求めよ。

## 記号・用語
- 棄却域：帰無仮説を棄却する統計量・標本結果の集合
- 検出力：対立仮説が真のとき帰無仮説を棄却する確率

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

検出力は対立母数の下で棄却域に入る確率。

## 答え
$$\pi(0.7)=P_{0.7}(X\ge8)
=\sum_{x=8}^{10}\binom{10}{x}0.7^x0.3^{10-x}.$$
各項を計算すると
$$45(0.7)^8(0.3)^2+10(0.7)^9(0.3)+(0.7)^{10}\approx0.383.$$

## 計算例
第二種過誤確率は $1-0.383=0.617$。

## 注意
臨界値を決めるときの $p_0$ と、検出力を評価する $p=0.7$ を混同しない。
<!-- CARD -->

---
id: test-profile-likelihood-nuisance
title: 局外母数をプロファイル尤度で消去する
category: math-testing
subcategory: math-test-derivation
topic: profile-likelihood
type: strategy
difficulty: 4
priority: A
hashtags: [尤度比検定, 局外母数, プロファイル尤度]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 一般化尤度比検定GLRT }]
---

## 問題
母数が $(\psi,\lambda)$ で、$\psi$ を検定対象、$\lambda$ を局外母数とする。プロファイル尤度を定義せよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

局外母数は分子では帰無制約下、分母では制約なしでそれぞれ最大化する。

## 答え
各 $\psi$ を固定して $\lambda$ について最大化し、
$$L_p(\psi)=\sup_\lambda L(\psi,\lambda)$$
とする。$H_0:\psi=\psi_0$ の一般化尤度比は
$$\Lambda=\frac{L_p(\psi_0)}{\sup_\psi L_p(\psi)}.$$

## 計算例
$L_p(\psi_0)=4$、$\sup_\psi L_p(\psi)=10$ なら $\Lambda=0.4$、$-2\log\Lambda\approx1.833$。

## 注意
局外母数を同じ任意値に固定して尤度比を取ってはいけない。
<!-- CARD -->

---
id: test-lr-pvalue-chi-square
title: 尤度比統計量から漸近P値を求める
category: math-testing
subcategory: math-test-derivation
topic: lr-pvalue
type: calc_step
difficulty: 3
priority: S
hashtags: [尤度比検定, P値, カイ二乗分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 尤度比検定統計量 }]
---

## 問題
独立制約2個の一般化尤度比検定で $-2\log\Lambda=7.0$ を得た。Wilks近似によるP値を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$p=P(\chi^2_r\ge d_{\rm obs}),$$
ここで $r$ は独立制約数。

## 答え
帰無仮説下の近似分布は $\chi^2_2$。自由度2では上側確率が $e^{-x/2}$ なので
$$p=P(\chi^2_2\ge7)=e^{-7/2}\approx0.0302.$$

## 計算例
$0.0302<0.05$ なので5%では棄却し、1%では棄却しない。

## 注意
自由度を全母数の個数とせず、帰無空間との次元差にする。
<!-- CARD -->

---
id: test-score-observed-expected-information
title: Score検定で期待情報量と観測情報量を区別する
category: math-testing
subcategory: math-test-derivation
topic: score-information
type: recognition
difficulty: 3
priority: A
hashtags: [スコア型検定, フィッシャー情報量（1次元）, 観測情報量]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: スコア型検定 }]
---

## 問題
期待情報量 $I_n(\theta)$ と観測情報量 $J_n(\theta)$ を定義し、Score検定での役割を述べよ。

## 記号・用語
- $\xrightarrow{d}$：分布収束

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$U_n(\theta_0)/\sqrt{I_n(\theta_0)}\xrightarrow{d}N(0,1).$$

## 答え
$$I_n(\theta)=E_\theta[-\ell_n''(\theta)],qquad
J_n(\theta)=-\ell_n''(\theta).$$
Score統計量の分母には帰無値で評価した情報量を用い、正則条件下ではどちらも漸近的に同等に使える。

## 計算例
$U_n=4,I_n=4,J_n=5$ なら期待情報量版は $Z=2$、観測情報量版は $4/\sqrt5\approx1.789$ で、有限標本では異なる。

## 注意
どちらを使ったかを答案で明示する。
<!-- CARD -->
