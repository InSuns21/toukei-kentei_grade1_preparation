---
id: samp-chisq-mean-var-indep
title: 標本平均と標本分散の独立性
category: math-distributions
subcategory: math-sampling-distributions
topic: chi-square-independence-mean-var
type: theorem
difficulty: 3
priority: A
hashtags:
  - 標本平均
  - 標本分散
  - 独立性
  - 正規標本
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 標本分布
archive_reason: duplicate
canonical_card: samp-cochran-theorem
archive_note: 強化済みCochran
  canonicalへ平方和の直交分解、(n-1)S^2/sigma^2~chi^2_{n-1}、標本平均と標本分散の独立性、t統計量への接続まで吸収済み。
---
## 問題
$X_1,\ldots,X_n\overset{\mathrm{i.i.d.}}{\sim}$ 正規分布 $N(\mu,\sigma^2)$ のとき、標本平均 $\overline X$ と不偏標本分散 $S^2$ は独立か。また帰結として $\dfrac{(n-1)S^2}{\sigma^2}$ の分布はどうなるか。

## なぜ
正規標本では、標準化した平方和が
$$
\sum_{i=1}^n\left(\frac{X_i-\mu}{\sigma}\right)^2
=\frac{n(\overline X-\mu)^2}{\sigma^2}
+\frac{(n-1)S^2}{\sigma^2}
$$
と「平均方向」と「平均から直交する残差方向」に分解できる。Cochranの定理より、この2項は独立で、それぞれ自由度1と $n-1$ のカイ二乗分布に従う。したがって $\overline X$ と $S^2$ も独立になる。

## 答え
正規母集団では $\overline X$ と $S^2$ は独立である。これにより
$$\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1},\qquad \overline X\perp S^2.$$

## 使用公式・定理
直交変換（Helmert変換など）で平均に対応する第1成分と残差平方和が分離される。標準正規の直交変換は標準正規を保つ。

## 計算例
$n=5$, 母分散 $\sigma^2=4$ の正規標本で、不偏標本分散が $S^2=6$ だったとする。分散に対応するカイ二乗統計量は
$$
\begin{aligned}
Q
&=\frac{(n-1)S^2}{\sigma^2}\\
&=\frac{(5-1)\cdot6}{4}\\
&=6.
\end{aligned}
$$
帰無モデルの下で
$$
Q\sim\chi^2_{5-1}=\chi^2_4
$$
なので、観測値 $q=6$ を $\chi^2_4$ の分位点と比較して分散の検定・区間推定へ進める。また正規性により $\overline X\perp S^2$ なので、平均側と分散側を独立に組み合わせて t 統計量を作れる。

## 一手
正規標本で「標本平均と標本分散」が同時に出たら、Cochran分解により
$$
\overline X\perp S^2,
\qquad
\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1}
$$
を同時に発火させる。自由度 $n-1$ は平均方向を1本使った残りの次元である。

## 注意
非正規では一般に独立でない。この独立性がt分布・F分布の構成に必要。
