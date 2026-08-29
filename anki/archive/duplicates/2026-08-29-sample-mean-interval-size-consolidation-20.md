---
id: samp-xbar-unbiased
title: 標本平均の不偏性と期待値
category: math-distributions
subcategory: math-sampling-distributions
topic: xbar-expectation
type: calc_step
difficulty: 1
priority: A
hashtags:
  - 標本平均
  - 不偏性
  - 期待値
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 標本分布
archive_reason: duplicate
canonical_card: samp-xbar-normal-distribution
archive_note: 強化済み標本平均canonicalへ期待値の線形性によるE[xbar]=muと不偏性を吸収済み。
---
## 問題
$X_1,\ldots,X_n$ を平均 $\mu$、分散 $\sigma^2$ の独立同分布標本（分布は正規でなくてもよい） とする。$E[\overline X]$ を求めよ（分散の導出は独立和の分散のカードで扱う）。

## 答え
$E[\overline X]=\mu.$

## 使用公式・定理
期待値の線形性から
$E[\overline X]=\frac1n\sum_iE[X_i]=\frac{n\mu}{n}=\mu.$

## 計算例
$n=20,\mu=5$ では $E[\overline X]=5$。

## 一手
各観測値の期待値を $n$ 個足して $n$ で割れば $\mu$。標本平均は $\mu$ の不偏推定量。

## 注意
不偏性 $E[\overline X]=\mu$ は母集団分布によらない。分散 $\sigma^2/n$ は独立和の分散カードで扱う。

<!-- CARD -->

---
id: samp-iid-sum-variance
title: 独立和の分散と標本平均
category: math-distributions
subcategory: math-sampling-distributions
topic: iid-sum-variance
type: calc_step
difficulty: 1
priority: A
hashtags:
  - 独立和
  - 分散
  - 標本平均
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 標本分布
archive_reason: duplicate
canonical_card: samp-xbar-normal-distribution
archive_note: 強化済み標本平均canonicalへ独立和の分散n sigma^2とVar(xbar)=sigma^2/n、標準誤差を吸収済み。
---
## 問題
$X_i$ が独立同分布で分散 $\sigma^2$ のとき、$T=\sum_{i=1}^nX_i$ の分散と、標本平均 $\overline X=T/n$ の分散を求めよ。

## 答え
$$\operatorname{Var}(T)=n\sigma^2,\qquad \operatorname{Var}(\overline X)=\frac{\sigma^2}{n}.$$

## 使用公式・定理
独立なら $\operatorname{Var}(\sum_iX_i)=\sum_i\operatorname{Var}(X_i)$。$\operatorname{Var}(aX)=a^2\operatorname{Var}(X)$。

## 計算例
$\sigma=3,n=16$ なら $\operatorname{Var}(T)=144$、$\operatorname{SD}(\overline X)=3/4$。

## 一手
和の分散は $n\sigma^2$、標本平均の標準偏差は $\sigma/\sqrt n$。定数倍 $c$ の分散は $c^2$ 倍。

## 注意
標準偏差には $\sqrt n$ が入る。

<!-- CARD -->

---
id: samp-ci-mean-t
title: 母平均の信頼区間（分散未知）
category: math-distributions
subcategory: math-sampling-distributions
topic: ci-mean-t
type: calc_step
difficulty: 2
priority: S
hashtags:
  - 信頼区間
  - 母平均
  - t分布
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: t分布
archive_reason: duplicate
canonical_card: ci-t-interval-pivot
archive_note: 母分散未知の正規平均t区間は区間推定canonicalにピボット構成・正規性依存・数値例まで詳細に実装済み。
---
## 問題
$X_1,\ldots,X_n\overset{\mathrm{i.i.d.}}{\sim}$ 正規分布 $N(\mu,\sigma^2)$、$\sigma^2$ 未知とする。$\mu$ の信頼係数 $1-\alpha$ の信頼区間を、不偏標本分散 $S^2$ と $t$ 分布の上側分位点 $t_{n-1,\alpha/2}$ で示せ。

## 答え
$\overline X\pm t_{n-1,\alpha/2}\,\frac{S}{\sqrt n}.$

## 使用公式・定理
$\dfrac{\overline X-\mu}{S/\sqrt n}\sim t_{n-1}$ から
$$P\left(-t_{n-1,\alpha/2}\le\frac{\overline X-\mu}{S/\sqrt n}\le t_{n-1,\alpha/2}\right)=1-\alpha.$$
ここで $c=t_{n-1,\alpha/2}S/\sqrt n>0$ と置くと
$$-c\le\overline X-\mu\le c$$
$$\Longleftrightarrow\quad \overline X-c\le\mu\le\overline X+c,$$
となり、答えの区間を得る。

## 計算例
$n=16,\overline x=10,S=2,\alpha=0.05$ では $t_{15,0.025}\approx2.131$ で区間は $10\pm2.131\times\frac{2}{4}=[8.93,11.07]$。

## 一手
裾の分位点 $t_{n-1,\alpha/2}$ を標準誤差 $S/\sqrt n$ にかける。

## 注意
$\sigma$ 既知なら $z_{\alpha/2}$ を使う。自由度は $n-1$。

<!-- CARD -->

---
id: samp-ci-variance-chisq
title: 母分散の信頼区間（カイ二乗分布）
category: math-distributions
subcategory: math-sampling-distributions
topic: ci-variance-chisq
type: calc_step
difficulty: 2
priority: A
hashtags:
  - 信頼区間
  - 母分散
  - カイ二乗分布
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: カイ二乗分布
archive_reason: duplicate
canonical_card: ci-variance-chi-derivation
archive_note: 母分散のカイ二乗信頼区間は区間推定canonicalに不等式反転と非対称性まで詳細に実装済み。
---
## 問題
正規分布 $N(\mu,\sigma^2)$ からの独立同分布標本 $X_1,\ldots,X_n$ で不偏標本分散を $S^2$ とする。$\sigma^2$ の信頼係数 $1-\alpha$ の信頼区間を示せ。

## 答え
$$\left[\frac{(n-1)S^2}{\chi^2_{n-1,\alpha/2}},\ \frac{(n-1)S^2}{\chi^2_{n-1,1-\alpha/2}}\right].$$

## 使用公式・定理
$\dfrac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1}$ を使う。$\chi^2$ は非対称なので上下の分位点が異なる。
上側確率で定義した分位点を使うと
$$P\left(\chi^2_{n-1,1-\alpha/2}
\le\frac{(n-1)S^2}{\sigma^2}
\le\chi^2_{n-1,\alpha/2}\right)=1-\alpha.$$ 
全て正なので逆数を取って不等号を反転し、$(n-1)S^2$ を掛けると
$$P\left(
\frac{(n-1)S^2}{\chi^2_{n-1,\alpha/2}}
\le\sigma^2\le
\frac{(n-1)S^2}{\chi^2_{n-1,1-\alpha/2}}
\right)=1-\alpha.$$ 

## 計算例
$n=10,S^2=4,\alpha=0.05$ では $\chi^2_{9,0.975}\approx2.700$、$\chi^2_{9,0.025}\approx19.023$ で区間は $[36/19.023,\ 36/2.700]=[1.89,13.33]$。

## 一手
上側端点は下側分位点 $\chi^2_{n-1,1-\alpha/2}$ で割り、下側端点は上側分位点 $\chi^2_{n-1,\alpha/2}$ で割る。

## 注意
$\chi^2$ は非対称なので両側でも分位点が異なる。

<!-- CARD -->

---
id: samp-sample-size-mean
title: 平均の区間推定での標本サイズ設計
category: math-distributions
subcategory: math-sampling-distributions
topic: sample-size-mean
type: calc_step
difficulty: 3
priority: B
hashtags:
  - 標本サイズ
  - 区間推定
  - 誤差
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 標本分布
archive_reason: duplicate
canonical_card: ci-sample-size-for-width
archive_note: 強化済み標本サイズcanonicalへ母平均の半幅制約からnを解いて切り上げる手順と数値例を吸収済み。
---
## 問題
母標準偏差 $\sigma$ 既知、目標の半幅（許容誤差）を $d$、信頼係数を $1-\alpha$ とする。母平均の区間推定に必要な標本サイズ $n$ を求めよ。

## 答え
$$n=\left(\frac{z_{\alpha/2}\,\sigma}{d}\right)^2,$$
必要な $n$ は整数なので切り上げる。

## 使用公式・定理
区間の半幅は $z_{\alpha/2}\sigma/\sqrt n$。これを $d$ 以下にする。
$$\frac{z_{\alpha/2}\sigma}{\sqrt n}\le d
\quad\Longleftrightarrow\quad
\sqrt n\ge\frac{z_{\alpha/2}\sigma}{d}
\quad\Longleftrightarrow\quad
n\ge\left(\frac{z_{\alpha/2}\sigma}{d}\right)^2.$$ 

## 計算例
$\sigma=10,d=2,\alpha=0.05$ では $z_{0.025}\approx1.96$ で $n=(1.96\times10/2)^2=96.04\approx97$。

## 一手
半幅の式を $n$ について解き、切り上げる。

## 注意
$\sigma$ 未知なら $t$ 分布で反復する必要がある。

<!-- CARD -->

---
id: samp-sample-size-proportion
title: 母比率の区間推定での標本サイズ
category: math-distributions
subcategory: math-sampling-distributions
topic: sample-size-proportion
type: calc_step
difficulty: 3
priority: B
hashtags:
  - 標本サイズ
  - 母比率
  - 信頼区間
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 標本分布
archive_reason: duplicate
canonical_card: ci-sample-size-for-width
archive_note: 強化済み標本サイズcanonicalへ母比率の設計式、p未知時の最悪ケースp=1/2、数値例を吸収済み。
---
## 問題
母比率 $p$ を誤差 $d$ 以内・信頼係数 $1-\alpha$ で推定したい。必要標本サイズ $n$ の式を、$p$ 既知の場合と未知の場合で示せ。

## 答え
$p$ の予備値 $p_0$ があれば
$$n=\frac{z_{\alpha/2}^2\,p_0(1-p_0)}{d^2}.$$
情報がなければ最悪ケース $p=1/2$ を使い
$$n=\frac{z_{\alpha/2}^2}{4d^2}.$$

## 使用公式・定理
標本比率の標準誤差は $\sqrt{p(1-p)/n}$。$p(1-p)$ は $p=1/2$ で最大 $1/4$。

## 計算例
$\alpha=0.05,d=0.03$ なら $n=(1.96^2)/(4\times0.03^2)\approx1068$。

## 一手
$p=1/2$ は分散最大で安全側。事前情報があれば実際の $p$ を使う。

## 注意
$p$ が0や1に近いと正規近似の前提が弱くなる。
