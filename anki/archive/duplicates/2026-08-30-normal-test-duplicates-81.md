---
id: test-normal-z-one-sided-numeric
title: 正規平均の右片側Z検定を数値で完遂する
category: math-testing
subcategory: math-normal-tests
topic: normal-z-one-sided
type: calc_step
difficulty: 2
priority: A
hashtags:
  - 正規分布
  - Z検定
  - 片側検定
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 平均値と分散に関する検定
archive_reason: duplicate
canonical_card: test-normal-z-known-formula
archive_note: 右片側Z検定の方向判定・数値計算・P値は、右・左・両側を一続きに扱うZ検定canonical cardへ統合済み。
---
## 問題
正規分布 $N(\mu,9)$ から $n=36$、$\overline x=11.2$ を得た。$H_0:\mu=10$ 対 $H_1:\mu>10$ を5%で検定せよ。

## 記号・用語
- 棄却域：帰無仮説を棄却する統計量・標本結果の集合
- $\Phi$：標準正規分布の累積分布関数

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

右片側棄却域は $Z>z_\alpha$。

## 一手
対立仮説の向きから上側・下側を先に決める。

## 答え
$$Z=\frac{11.2-10}{3/\sqrt{36}}=\frac{1.2}{0.5}=2.4.$$
$z_{0.05}=1.645$ より $2.4>1.645$ なので棄却する。

## 計算例
右片側P値は $1-\Phi(2.4)\approx0.0082$ で、同じ結論を得る。

<!-- CARD -->

---
id: test-normal-z-left-sided
title: 正規平均の左片側Z検定で符号を判断する
category: math-testing
subcategory: math-normal-tests
topic: normal-z-left-sided
type: calc_step
difficulty: 2
priority: A
hashtags:
  - 正規分布
  - Z検定
  - 片側検定
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 平均値と分散に関する検定
archive_reason: duplicate
canonical_card: test-normal-z-known-formula
archive_note: 左片側Z検定の臨界方向・符号判断・数値例・P値はZ検定canonical cardへ統合済み。
---
## 問題
正規分布 $N(\mu,4)$ から $n=25$、$\overline x=4.4$。$H_0:\mu=5$ 対 $H_1:\mu<5$ を5%で検定せよ。

## 記号・用語
- $\Phi$：標準正規分布の累積分布関数

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

左片側P値は $\Phi(z_{\rm obs})$。

## 答え
$$Z=\frac{4.4-5}{2/5}=-1.5.$$
左側臨界値は $-z_{0.05}=-1.645$。$-1.5>-1.645$ なので棄却しない。

## 計算例
$p=\Phi(-1.5)\approx0.0668>0.05$。

## 注意
左片側で $|Z|$ を取らない。

<!-- CARD -->

---
id: test-normal-z-two-sided-pvalue
title: 正規平均Z検定の両側P値を計算する
category: math-testing
subcategory: math-normal-tests
topic: normal-z-pvalue
type: calc_step
difficulty: 2
priority: A
hashtags:
  - 正規分布
  - Z検定
  - P値
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 平均値と分散に関する検定
archive_reason: duplicate
canonical_card: test-normal-z-known-formula
archive_note: 両側Z検定のP値計算と有意水準による判定はZ検定canonical cardへ統合済み。
---
## 問題
正規平均の両側Z検定で $z_{\rm obs}=-2.30$ を得た。P値と5%での結論を求めよ。

## 記号・用語
- $\Phi$：標準正規分布の累積分布関数

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

標準正規分布の対称性より両側P値は $2\{1-\Phi(|z_{\rm obs}|)\}$。

## 答え
$$p=2P(Z\ge2.30)=2\{1-\Phi(2.30)\}\approx2(0.0107)=0.0214.$$
よって5%で帰無仮説を棄却する。

## 計算例
1%では $0.0214>0.01$ なので棄却しない。

## 注意
両側P値は片側P値の2倍だが、1を超える場合は1を上限とする。

<!-- CARD -->

---
id: test-normal-t-numeric
title: 1標本t検定を標本要約量から計算する
category: math-testing
subcategory: math-normal-tests
topic: one-sample-t-numeric
type: calc_step
difficulty: 2
priority: A
hashtags:
  - 正規分布
  - t検定
  - P値
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 平均値と分散に関する検定
archive_reason: duplicate
canonical_card: test-normal-t-pivot
archive_note: 1標本t検定の標準誤差・自由度・数値判定・P値は導出を含むcanonical cardへ統合済み。
---
## 問題
正規分布から $n=16,\overline x=52,s=4$。$H_0:\mu=50$ 対 $H_1:\mu\ne50$ を5%で検定せよ。$t_{15,0.025}=2.131$ とする。

## 記号・用語
- 棄却域：帰無仮説を棄却する統計量・標本結果の集合

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

両側棄却域は $|T|>t_{n-1,\alpha/2}$。

## 一手
標準誤差は $s/\sqrt n=1$、自由度は $n-1=15$。

## 答え
$$T=\frac{52-50}{4/\sqrt{16}}=2.$$
$|2|<2.131$ なので棄却しない。

## 計算例
P値は約0.064で5%より大きい。

<!-- CARD -->

---
id: test-normal-t-assumptions
title: 1標本t検定の適用条件を判定する
category: math-testing
subcategory: math-normal-tests
topic: t-test-assumptions
type: condition
difficulty: 2
priority: A
hashtags:
  - t検定
  - 正規分布
  - 適用条件
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 平均値と分散に関する検定
archive_reason: duplicate
canonical_card: test-normal-t-pivot
archive_note: 1標本t検定が有限標本で正確となる正規性条件と小標本・外れ値への注意はcanonical cardへ統合済み。
---
## 問題
1標本t検定が有限標本で正確となる条件を述べ、強い外れ値がある小標本での注意を答えよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

標本平均と標本分散の独立性は正規分布に特有で、正確なt分布導出に使う。

## 答え
観測が独立同分布で、母集団が正規分布 $N(\mu,\sigma^2)$ に従うこと。小標本で強い歪みや外れ値があるとt統計量の帰無分布が崩れうる。

## 計算例
$n=8$ で1点だけ極端に大きい場合、平均と標準偏差の双方が強く影響されるため、データ確認や頑健な方法を検討する。

## 注意
大標本での近似的頑健性と、小標本での正確性を区別する。

<!-- CARD -->

---
id: test-paired-t-numeric
title: 対応のあるt検定を差の要約量から計算する
category: math-testing
subcategory: math-normal-tests
topic: paired-t-numeric
type: calc_step
difficulty: 2
priority: A
hashtags:
  - 対応のあるt検定
  - t検定
  - P値
frequency:
  past_exam: 1
  textbook: 0
  independent_problems: 0
  source_confirmations: 1
sources:
  - type: official_syllabus
    topic: 平均値と分散に関する検定
  - type: past_exam
    id: MATH-2014-Q4
    topic: F分布・二標本比較
archive_reason: duplicate
canonical_card: test-paired-t-construction
archive_note: 対応のあるt検定は差への帰着から統計量計算・自由度・方向判定までcanonical cardへ統合済み。
---
## 問題
差を「後－前」と定義し、$n=12,\overline d=3,s_D=4$ を得た。$H_0:\mu_D=0$ 対 $H_1:\mu_D>0$ を検定する統計量を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

右片側P値は $P(t_{11}\ge2.598)$。

## 答え
$$T=\frac{3}{4/\sqrt{12}}=\frac{3\sqrt{12}}4\approx2.598,$$
自由度は11。

## 計算例
$t_{11,0.025}\approx2.201$ より、少なくとも片側2.5%水準では棄却でき、片側5%でも棄却する。

## 注意
差の向きを逆にすると統計量の符号と対立仮説の向きがともに逆になる。
