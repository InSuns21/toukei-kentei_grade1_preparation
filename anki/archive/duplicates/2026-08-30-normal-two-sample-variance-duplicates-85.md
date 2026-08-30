---
id: test-pooled-two-sample-t-numeric
title: 等分散2標本t検定を数値で完遂する
category: math-testing
subcategory: math-normal-tests
topic: pooled-t-numeric
type: calc_step
difficulty: 3
priority: A
hashtags:
  - 2標本t検定
  - 等分散
  - t検定
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 複数の平均に関する検定
archive_reason: duplicate
canonical_card: test-pooled-two-sample-t
archive_note: 等分散2標本t検定の結合分散、統計量、自由度、数値判定はcanonical cardへ統合済み。
---
## 問題
独立な正規2群で $n_X=n_Y=10,\overline x=12,\overline y=10,s_X^2=4,s_Y^2=6$。等分散を仮定して平均差0を検定する統計量を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

両側5%では $|T|>t_{18,0.025}\approx2.101$ なら棄却。

## 一手
結合分散を先に計算してから標準誤差へ代入する。

## 答え
$$S_p^2=\frac{9\cdot4+9\cdot6}{18}=5,$$
$$T=\frac{2}{\sqrt5\sqrt{1/10+1/10}}=\frac2{1}=2,$$
自由度18。

## 計算例
$2<2.101$ なので5%では棄却しない。

<!-- CARD -->

---
id: test-welch-two-sample-numeric
title: Welch検定の統計量と近似自由度を計算する
category: math-testing
subcategory: math-normal-tests
topic: welch-numeric
type: calc_step
difficulty: 3
priority: A
hashtags:
  - Welch検定
  - 不等分散
  - 自由度
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 複数の平均に関する検定
archive_reason: duplicate
canonical_card: test-welch-two-sample-formula
archive_note: Welch統計量とWelch–Satterthwaite自由度の数値計算はcanonical cardへ統合済み。
---
## 問題
$n_X=10,n_Y=20,\overline x=15,\overline y=12,s_X^2=25,s_Y^2=20$ のWelch統計量と自由度を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

Welch–Satterthwaite近似を用いる。

## 答え
標準誤差は $\sqrt{25/10+20/20}=\sqrt{3.5}$。よって
$$T_W=\frac3{\sqrt{3.5}}\approx1.604.$$
自由度は
$$\nu=\frac{3.5^2}{2.5^2/9+1^2/19}
=\frac{12.25}{0.7471}\approx16.40.$$

## 計算例
両側5%点は約2.11なので棄却しない。

## 注意
分散の大きい小標本群が自由度を大きく減らす。

<!-- CARD -->

---
id: test-normal-variance-chisquare-numeric
title: 正規母分散の両側カイ二乗検定を計算する
category: math-testing
subcategory: math-normal-tests
topic: variance-chisquare-numeric
type: calc_step
difficulty: 3
priority: S
hashtags:
  - 正規分布
  - カイ二乗検定
  - 両側検定
frequency:
  past_exam: 1
  textbook: 0
  independent_problems: 0
  source_confirmations: 1
sources:
  - type: official_syllabus
    topic: 平均値と分散に関する検定
  - type: past_exam
    id: MATH-2018-Q1
    topic: カイ二乗分布・母標準偏差
archive_reason: duplicate
canonical_card: test-normal-variance-chisquare
archive_note: 正規母分散の両側カイ二乗検定の数値計算と臨界値判定はcanonical cardへ統合済み。
---
## 問題
正規標本で $n=16,s^2=9$。$H_0:\sigma^2=4$ を両側5%で検定せよ。下側2.5%点を6.262、上側2.5%点を27.488とする。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

自由度15のカイ二乗分布で中央95%区間 $[6.262,27.488]$ の外側を棄却する。

## 答え
$$Q=\frac{15\cdot9}{4}=33.75.$$
$33.75>27.488$ なので帰無仮説を棄却する。

## 計算例
観測分散が帰無値より大きく、上側で棄却された。

## 注意
正本の $\chi^2_{\nu,\gamma}$ は上側 $\gamma$ 点だが、問題文が下側点と明記した数値はそのまま使う。

<!-- CARD -->

---
id: test-normal-variance-one-sided
title: 正規母分散の片側検定で裾を選ぶ
category: math-testing
subcategory: math-normal-tests
topic: variance-one-sided
type: recognition
difficulty: 2
priority: S
hashtags:
  - 母分散
  - カイ二乗検定
  - 片側検定
frequency:
  past_exam: 1
  textbook: 0
  independent_problems: 0
  source_confirmations: 1
sources:
  - type: official_syllabus
    topic: 平均値と分散に関する検定
  - type: past_exam
    id: MATH-2018-Q1
    topic: カイ二乗分布・母標準偏差
archive_reason: duplicate
canonical_card: test-normal-variance-chisquare
archive_note: 母分散の大小による上側・下側棄却方向と上側点記法はcanonical cardへ統合済み。
---
## 問題
$Q=(n-1)S^2/\sigma_0^2$ とする。$H_1:\sigma^2>\sigma_0^2$ と $H_1:\sigma^2<\sigma_0^2$ の棄却域をそれぞれ書け。

## 記号・用語
- 棄却域：帰無仮説を棄却する統計量・標本結果の集合

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$S^2$ が大きいほど $Q$ は大きくなるため、対立仮説の向きと裾が一致する。

## 答え
大分散対立では $Q>\chi^2_{n-1,\alpha}$。小分散対立では
$$Q<\chi^2_{n-1,1-\alpha}.$$

## 計算例
上側5%点が30、下側5%点が10なら、大分散対立は $Q>30$、小分散対立は $Q<10$。

## 注意
上側点記法では下側5%点の添字が $1-0.05=0.95$ になる。

<!-- CARD -->

---
id: test-normal-variance-ratio-numeric
title: 2正規母分散比の片側F検定を計算する
category: math-testing
subcategory: math-normal-tests
topic: variance-ratio-numeric
type: calc_step
difficulty: 3
priority: S
hashtags:
  - F検定
  - 等分散
  - 片側検定
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
canonical_card: test-normal-variance-ratio-f
archive_note: 2正規母分散比の片側F統計量、自由度、数値判定はcanonical cardへ統合済み。
---
## 問題
独立な正規2標本で $n_X=11,n_Y=16,s_X^2=12,s_Y^2=3$。$H_0:\sigma_X^2=\sigma_Y^2$ 対 $H_1:\sigma_X^2>\sigma_Y^2$ を検定する統計量を求めよ。

## 記号・用語
- 棄却域：帰無仮説を棄却する統計量・標本結果の集合

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

右片側棄却域は $F>F_{10,15,\alpha}$。ここで添字 $\alpha$ は上側確率。

## 一手
大きいと予想する分散を分子に置くと右片側で処理できる。

## 答え
$$F=\frac{12}{3}=4,\qquad (\nu_1,\nu_2)=(10,15).$$

## 計算例
上側5%点を2.54とすれば $4>2.54$ なので棄却する。

<!-- CARD -->

---
id: test-f-reciprocal-quantile
title: F分布の逆数関係で下側臨界値を求める
category: math-testing
subcategory: math-normal-tests
topic: f-reciprocal
type: formula
difficulty: 3
priority: S
hashtags:
  - F分布
  - F検定
  - 分位点
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
canonical_card: test-normal-variance-ratio-f
archive_note: F分布の逆数関係と自由度交換、両側検定の下側臨界値はcanonical cardへ統合済み。
---
## 問題
$F\sim F_{\nu_1,\nu_2}$ の下側 $\alpha$ 点を、上側点記法 $F_{\nu_2,\nu_1,\alpha}$ で表せ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

F分布の逆数では分子・分母自由度が入れ替わる。

## 答え
$1/F\sim F_{\nu_2,\nu_1}$ なので、下側 $\alpha$ 点は
$$\frac1{F_{\nu_2,\nu_1,\alpha}}.$$

## 計算例
両側検定の下側臨界値は $1/F_{\nu_2,\nu_1,\alpha/2}$、上側臨界値は $F_{\nu_1,\nu_2,\alpha/2}$。

## 注意
単純に上側点の逆数を取り、自由度を入れ替え忘れない。
