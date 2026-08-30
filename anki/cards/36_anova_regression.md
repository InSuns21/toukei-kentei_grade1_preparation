---
id: anova-oneway-f-statistic
title: 一元配置分散分析をモデルから平方和・自由度・F検定まで通す
category: math-data-analysis
subcategory: math-anova
topic: oneway-anova-canonical
type: formula
difficulty: 2
priority: S
hashtags:
  - 一元配置分散分析
  - 平方和
  - 自由度
  - F検定
  - 分散分析表
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 一元配置分散分析
---

## 問題
$a$ 群の一元配置分散分析を考える。群 $i$ の観測を $Y_{ij}$、群サイズを $n_i$、総標本数を $N=\sum_i n_i$ とする。

1. 固定効果モデルと誤差の仮定を書け。
2. 全平方和・群間平方和・誤差平方和を定義し、平方和分解を書け。
3. 各自由度、平均平方、F統計量を書け。
4. 観測が群ごとに $(1,2)$、$(3,4)$、$(5,6)$ で、自由度 $(2,3)$ のF分布の5%上側臨界値を9.55とする。全群の母平均が等しいか検定せよ。

## 使用公式・定理
固定効果モデルは
$$
Y_{ij}=\mu+\alpha_i+\varepsilon_{ij},
$$
識別のため例えば
$$
\sum_{i=1}^a n_i\alpha_i=0
$$
と置く。誤差には
$$
\varepsilon_{ij}\overset{\mathrm{iid}}\sim N(0,\sigma^2)
$$
を仮定する。したがって正確なF検定では独立性・正規性・等分散性が前提となる。

群平均を $\bar Y_{i\cdot}$、全平均を $\bar Y_{\cdot\cdot}$ とすると
$$
SS_T=\sum_i\sum_j(Y_{ij}-\bar Y_{\cdot\cdot})^2,
$$
$$
SS_A=\sum_i n_i(\bar Y_{i\cdot}-\bar Y_{\cdot\cdot})^2,
$$
$$
SS_E=\sum_i\sum_j(Y_{ij}-\bar Y_{i\cdot})^2,
$$
かつ
$$
SS_T=SS_A+SS_E.
$$

自由度も
$$
N-1=(a-1)+(N-a)
$$
と分解する。したがって
$$
MS_A=\frac{SS_A}{a-1},
\qquad
MS_E=\frac{SS_E}{N-a},
$$
$$
F=\frac{MS_A}{MS_E}.
$$
帰無仮説
$$
H_0:\mu_1=\cdots=\mu_a
$$
の下で
$$
F\sim F_{a-1,N-a}.
$$

## 一手
**群平均と全平均を出したら、平方和→自由度→平均平方→Fの順に表を埋める。** 一元配置分散分析はこれを一つの計算鎖として扱う。

## 答え
モデルは
$$
Y_{ij}=\mu+\alpha_i+\varepsilon_{ij},
\qquad
\varepsilon_{ij}\overset{\mathrm{iid}}\sim N(0,\sigma^2).
$$

一般に
$$
SS_T=SS_A+SS_E,
$$
自由度は
$$
\nu_T=N-1,
\qquad
\nu_A=a-1,
\qquad
\nu_E=N-a.
$$
よって
$$
F=\frac{SS_A/(a-1)}{SS_E/(N-a)}.
$$

数値例では $a=3,N=6$、群平均は
$$
1.5,\ 3.5,\ 5.5,
$$
全平均は
$$
\bar Y_{\cdot\cdot}=3.5.
$$
したがって
$$
SS_A=2\{(1.5-3.5)^2+(3.5-3.5)^2+(5.5-3.5)^2\}=16,
$$
$$
SS_E=3\{(-0.5)^2+(0.5)^2\}=1.5.
$$
自由度は
$$
\nu_A=2,
\qquad
\nu_E=3,
$$
なので
$$
MS_A=\frac{16}{2}=8,
\qquad
MS_E=\frac{1.5}{3}=0.5,
$$
$$
F=\frac8{0.5}=16.
$$
$16>9.55$ より5%水準で $H_0$ を棄却し、少なくとも1群の母平均が異なると判断する。

## 計算例
全平均との差からも平方和分解を確認できる。
$$
\begin{aligned}
SS_T
&=(-2.5)^2+(-1.5)^2+(-0.5)^2\\
&\quad +(0.5)^2+(1.5)^2+(2.5)^2\\
&=17.5.
\end{aligned}
$$
一方
$$
SS_A+SS_E=16+1.5=17.5
$$
で一致する。

分散分析表の中身は
$$
\begin{array}{c|c|c|c|c}
\text{要因}&\text{平方和}&\text{自由度}&\text{平均平方}&F\\ \hline
\text{群間}&16&2&8&16\\
\text{誤差}&1.5&3&0.5&\\
\text{全体}&17.5&5&&
\end{array}
$$
となり、平方和と自由度の両方で
$$
17.5=16+1.5,
\qquad
5=2+3
$$
を確認できる。

## 注意
F検定で棄却して分かるのは「少なくとも1群の平均が異なる」ことまでで、どの群対が異なるかは多重比較などを別途行う。群間平方和では群平均の偏差を必ず群サイズ $n_i$ 倍する。

<!-- CARD -->

---
id: anova-expected-mean-squares
title: 一元配置の期待平均平方を比較する
category: math-data-analysis
subcategory: math-anova
topic: expected-ms
type: calc_step
difficulty: 4
priority: A
hashtags: [期待平均平方, 固定効果, F検定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 一元配置分散分析 }]
---

## 問題
$a$ 群があり、各群に $n$ 個の観測を持つ固定効果モデル $Y_{ij}=\mu+\alpha_i+\varepsilon_{ij}$ を考える。群間平均平方を $MS_A$、誤差平均平方を $MS_E$ とするとき、それぞれの期待値を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

群平均は $\overline Y_{i\cdot}=\mu+\alpha_i+\overline\varepsilon_{i\cdot}$、$\operatorname{Var}(\overline\varepsilon_{i\cdot})=\sigma^2/n$。

## 答え
制約 $\sum_i\alpha_i=0$ の下で
$$E[MS_E]=\sigma^2,$$
$$E[MS_A]=\sigma^2+\frac{n\sum_{i=1}^a\alpha_i^2}{a-1}.$$
したがって $H_0:\alpha_i=0\ (\forall i)$ のときだけ両者の期待値が一致する。

## 計算例
$a=3,n=4,\alpha=(-1,0,1)$ なら
$$\sum_{i=1}^3\alpha_i^2=(-1)^2+0^2+1^2=2.$$
したがって
$$E[MS_A]=\sigma^2+\frac{4\cdot2}{3-1}
=\sigma^2+4,$$
一方 $E[MS_E]=\sigma^2$ である。

## 注意
変量効果モデルの期待平均平方とは形が異なる。

<!-- CARD -->

---
id: anova-contrast-definition
title: 一元配置の対比を定義する
category: math-data-analysis
subcategory: math-anova
topic: contrast
type: formula
difficulty: 2
priority: A
hashtags: [対比, 群平均, 一元配置分散分析]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 一元配置分散分析 }]
---

## 問題
母平均の線形結合 $L=\sum_i c_i\mu_i$ が対比である条件を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

共通の水準を全平均へ加えても対比値は変わらない。

## 答え
$$\sum_{i=1}^a c_i=0$$
を満たすとき対比という。推定量は
$$\widehat L=\sum_i c_i\overline Y_{i\cdot}.$$

## 計算例
3群で群1と群2・3の平均を比べる係数を $(1,-1/2,-1/2)$ とすると
$$1-\frac12-\frac12=0$$
なので対比である。群平均が $(10,13,15)$ なら
$$\widehat L=10-\frac{13}{2}-\frac{15}{2}=-4.$$

## 注意
係数和が0でない単なる線形結合は対比ではない。

<!-- CARD -->

---
id: anova-contrast-se
title: 対比推定量の標準誤差を求める
category: math-data-analysis
subcategory: math-anova
topic: contrast-se
type: formula
difficulty: 3
priority: A
hashtags: [対比, 標準誤差, t検定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 一元配置分散分析 }]
---

## 問題
独立な群平均から作る対比 $\widehat L=\sum_i c_i\overline Y_{i\cdot}$ の標準誤差を書け。

## 記号・用語
- SE：標準誤差（standard error）

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

独立な確率変数の線形結合の分散は分散の係数二乗和。

## 答え
$$\operatorname{Var}(\widehat L)=\sigma^2\sum_i\frac{c_i^2}{n_i}$$
より、$\sigma^2$ を $MS_E$ で置換して
$$\operatorname{SE}(\widehat L)=\sqrt{MS_E\sum_i\frac{c_i^2}{n_i}}.$$

## 計算例
2群差の係数を $(c_1,c_2)=(1,-1)$、$n_1=5,n_2=8,MS_E=4$ とすると
$$\operatorname{SE}(\widehat L)
=\sqrt{4\left(\frac{1^2}{5}+\frac{(-1)^2}{8}\right)}
=\sqrt{1.3}\approx1.140.$$

## 注意
t統計量の自由度は分散分析の誤差自由度 $N-a$。

<!-- CARD -->

---
id: anova-contrast-numeric
title: 計画対比のt検定を数値で行う
category: math-data-analysis
subcategory: math-anova
topic: contrast-numeric
type: calc_step
difficulty: 3
priority: A
hashtags: [計画対比, t検定, 数値計算]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 一元配置分散分析 }]
---

## 問題
各観測が独立な正規分布に従い、全群で分散が共通であるとする。3群に各5個の観測があり、群平均は $(10,13,15)$、誤差平均平方は $MS_E=4$ だった。対比 $L=\mu_1-(\mu_2+\mu_3)/2$ について $H_0:L=0$ を両側5%で検定せよ。誤差自由度12のt分布の両側臨界値を2.179とする。

## 記号・用語
- SE：標準誤差（standard error）

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$t=\widehat L/\operatorname{SE}(\widehat L)\sim t_{N-a}$。

## 答え
$$\widehat L=10-(13+15)/2=-4.$$
$$\operatorname{SE}=\sqrt{4\left(\frac15+\frac{(1/2)^2}{5}+\frac{(1/2)^2}{5}\right)}
=\sqrt{1.2}.$$
したがって
$$t=\frac{-4}{\sqrt{1.2}}\approx-3.65,$$
自由度は $15-3=12$。両側5%点 $t_{12,0.025}=2.179$ より棄却する。

## 計算例
まず係数和は $1-1/2-1/2=0$ なので対比である。推定値は
$$\widehat L=10-\frac{13+15}{2}=-4.$$
標準誤差は
$$\sqrt{4\left(\frac15+\frac{1/4}{5}+\frac{1/4}{5}\right)}
=\sqrt{1.2}\approx1.095.$$
したがって
$$t=\frac{-4}{1.095}\approx-3.65.$$
$|t|=3.65>2.179$ なので $H_0:L=0$ を棄却する。

## 注意
データ確認後に選んだ対比では多重性への配慮が必要。

<!-- CARD -->

---
id: anova-orthogonal-contrasts
title: 直交対比を判定する
category: math-data-analysis
subcategory: math-anova
topic: orthogonal-contrasts
type: recognition
difficulty: 3
priority: A
hashtags: [直交対比, 対比, 平方和]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 一元配置分散分析 }]
---

## 問題
群ごとの標本サイズ $n_i$ が等しくない一元配置を不均衡配置という。2つの対比係数を $c_i,d_i$ とするとき、対応する対比推定量が直交する条件を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

直交性は $\operatorname{Cov}(\widehat L_c,\widehat L_d)=\sigma^2\sum_i c_id_i/n_i=0$ と同値。

## 答え
$$\sum_{i=1}^a\frac{c_id_i}{n_i}=0.$$
群サイズが等しいときは $\sum_i c_id_i=0$ に簡約される。

## 計算例
不均衡な3群で $(n_1,n_2,n_3)=(2,4,8)$ とし
$$c=(1,-1,0),
\qquad d=(1,2,-3)$$
を考える。どちらも係数和が0なので対比であり、重み付き内積は
$$\sum_i\frac{c_id_i}{n_i}
=\frac{1\cdot1}{2}+\frac{(-1)\cdot2}{4}+\frac{0\cdot(-3)}8
=\frac12-\frac12+0=0.$$
したがって不均衡配置でも、この2対比は直交する。

## 注意
等サイズ用の単純な内積条件を不均衡データへ流用しない。

<!-- CARD -->

---
id: anova-tukey-hsd-formula
title: テューキー法の同時比較幅を書く
category: math-data-analysis
subcategory: math-anova
topic: tukey-hsd
type: formula
difficulty: 3
priority: A
hashtags: [テューキー法, 多重比較, Student化範囲分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 多重比較 }]
---

## 問題
各観測が独立な正規分布に従い、全群で分散が共通であるとする。$a$ 群の各標本サイズが共通に $n$、誤差平均平方が $MS_E$ であるとき、Student化範囲分布の上側臨界値 $q_{a,N-a,\alpha}$ を使うテューキーHSD法の棄却条件を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

全群対比較の家族内第一種過誤率を $\alpha$ 以下に制御する。

## 答え
全ての群対について
$$|\overline Y_{i\cdot}-\overline Y_{j\cdot}|>
q_{a,N-a,\alpha}\sqrt{\frac{MS_E}{n}}$$
ならその群対差を有意とする。$q$ はStudent化範囲分布の上側確率点。

## 計算例
$q=4,MS_E=9,n=9$ なら
$$\mathrm{HSD}=q\sqrt{\frac{MS_E}{n}}
=4\sqrt{\frac99}=4.$$
例えば2群の標本平均差が $|15-10|=5$ なら $5>4$ なので有意、$|13-10|=3$ なら $3<4$ なので有意でない。

## 注意
不等群サイズではテューキー・クレーマー法を使う。

<!-- CARD -->

---
id: anova-tukey-numeric
title: テューキー法で有意な群対を選ぶ
category: math-data-analysis
subcategory: math-anova
topic: tukey-numeric
type: calc_step
difficulty: 3
priority: A
hashtags: [テューキー法, 多重比較, 群間差]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 多重比較 }]
---

## 問題
各観測が独立な正規分布に従い、全群で分散が共通であるとする。3群の標本平均が $(10,13,16)$、誤差平均平方が $MS_E=4$、各群の標本サイズが $n=4$ である。テューキー法のStudent化範囲分布の臨界値を $q=3.5$ として、有意な群対を求めよ。

## 記号・用語
- 棄却域：帰無仮説を棄却する統計量・標本結果の集合

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$|\overline Y_i-\overline Y_j|>q\sqrt{MS_E/n}$。

## 答え
$$\mathrm{HSD}=3.5\sqrt{4/4}=3.5.$$
差は $|10-13|=3$、$|10-16|=6$、$|13-16|=3$。3.5を超える群1–群3だけが有意。

## 計算例
同時比較幅は
$$3.5\sqrt{\frac44}=3.5.$$
3つの絶対差は
$$|10-13|=3,
\qquad |10-16|=6,
\qquad |13-16|=3.$$
3.5を超えるのは6だけなので、群1と群3の差だけが有意である。

## 注意
境界と等しい場合の扱いは棄却域の不等号規約に従う。

<!-- CARD -->

---
id: anova-bonferroni-comparisons
title: ボンフェローニ法の比較ごとの水準を決める
category: math-data-analysis
subcategory: math-anova
topic: bonferroni
type: calc_step
difficulty: 2
priority: A
hashtags: [ボンフェローニ法, 多重比較, 第一種過誤]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 多重比較 }]
---

## 問題
両側の計画比較を $m=5$ 個行い、家族内水準を0.05にしたい。各比較の両側t検定の水準と片側裾確率を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

Booleの不等式より $P(\text{1件以上の誤棄却})\le\sum_{j=1}^m\alpha_j$。

## 答え
ボンフェローニ法により各比較の両側水準は
$$\alpha/m=0.05/5=0.01.$$
両側なので各裾は
$$\alpha/(2m)=0.005.$$

## 計算例
各比較の両側水準は
$$\frac{0.05}{5}=0.01,$$
片側裾確率は
$$\frac{0.01}{2}=0.005.$$
例えば誤差自由度が12なら、絶対値を比較する臨界値は $t_{12,0.005}\approx3.055$ となる。

## 注意
比較数が多いと保守的になりやすい。

<!-- CARD -->

---
id: anova-scheffe-bound
title: シェッフェ法の全対比棄却条件を書く
category: math-data-analysis
subcategory: math-anova
topic: scheffe
type: formula
difficulty: 4
priority: A
hashtags: [シェッフェ法, 多重比較, 対比]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 多重比較 }]
---

## 問題
各観測が独立な正規分布に従い、全群で分散が共通である一元配置で、任意の対比 $L=\sum_i c_i\mu_i$ をシェッフェ法で検定する条件を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

群平均の全ての対比を同時に考えて家族内誤差率を制御する。

## 答え
$$\frac{\widehat L^2}{MS_E\sum_i c_i^2/n_i}>
(a-1)F_{a-1,N-a,\alpha}$$
なら棄却する。

## 計算例
$a=4,F_{3,16,0.05}=3.24$ なら棄却境界の右辺は
$$ (a-1)F_{3,16,0.05}=3\times3.24=9.72.$$
$\widehat L=6$、$MS_E=4$、$\sum_i c_i^2/n_i=0.5$ なら左辺は
$$\frac{6^2}{4\cdot0.5}=18.$$
$18>9.72$ なので、この対比について $H_0:L=0$ を棄却する。

## 注意
全群対だけを比べるテューキー法より一般的だが、群対比較には通常より保守的。

<!-- CARD -->

---
id: anova-multiple-comparison-choice
title: 目的から多重比較法を選ぶ
category: math-data-analysis
subcategory: math-anova
topic: multiple-comparison-choice
type: recognition
difficulty: 2
priority: A
hashtags: [多重比較, テューキー法, ボンフェローニ法]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 多重比較 }]
---

## 問題
(a) 全群対、(b) 少数の事前指定比較、(c) データ確認後の任意の対比、に適する方法を選べ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

同時推測の対象集合が広いほど臨界値は一般に厳しくなる。

## 答え
(a) テューキー法、(b) ボンフェローニ法または計画対比、(c) シェッフェ法。

## 計算例
(a) 4群の全 $\binom42=6$ 群対を比べるならテューキー法を使う。
(b) 「対照群対3群」など事前指定した3比較だけなら、ボンフェローニ法または計画対比を使う。
(c) 平均表を見た後に選ぶ任意の対比全体を保護するなら、シェッフェ法を使う。

## 注意
全体F検定を先に通すことだけでは、任意の事後比較の誤差率は自動制御されない。

<!-- CARD -->

---
id: anova-twoway-f-tests
title: 二元配置分散分析をモデルから平方和・自由度・3つのF検定まで通す
category: math-data-analysis
subcategory: math-anova
topic: twoway-anova-canonical
type: formula
difficulty: 3
priority: S
hashtags:
  - 二元配置分散分析
  - 交互作用
  - 平方和
  - 自由度
  - F検定
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 二元配置分散分析
---

## 問題
因子Aが $a$ 水準、因子Bが $b$ 水準、各セルに $n$ 回の反復がある釣合い二元配置固定効果モデルを考える。

1. 交互作用を含むモデルと誤差の仮定を書け。
2. $SS_A,SS_B,SS_{AB},SS_E$ と全平方和の分解を書け。
3. 各自由度と、A・B・交互作用を検定するF統計量を書け。
4. $a=b=n=2$ で、各セルの観測値が
   - A1B1: $(8,10)$
   - A1B2: $(12,14)$
   - A2B1: $(10,12)$
   - A2B2: $(18,20)$
   だった。自由度 $(1,4)$ のF分布の5%上側臨界値を7.71として、A・B・交互作用を検定せよ。

## 使用公式・定理
反復あり固定効果モデルを
$$
Y_{ijk}=\mu+\alpha_i+\beta_j+\gamma_{ij}+\varepsilon_{ijk}
$$
と書く。ここで $\gamma_{ij}$ は交互作用で、例えば識別制約として
$$
\sum_i\alpha_i=0,
\qquad
\sum_j\beta_j=0,
$$
$$
\sum_i\gamma_{ij}=0\ (\forall j),
\qquad
\sum_j\gamma_{ij}=0\ (\forall i)
$$
を置く。誤差は
$$
\varepsilon_{ijk}\overset{\mathrm{iid}}\sim N(0,\sigma^2)
$$
とする。

セル平均を $\bar Y_{ij\cdot}$、Aの周辺平均を $\bar Y_{i\cdot\cdot}$、Bの周辺平均を $\bar Y_{\cdot j\cdot}$、全平均を $\bar Y_{\cdot\cdot\cdot}$ とすると、釣合い配置では
$$
SS_A=bn\sum_i(\bar Y_{i\cdot\cdot}-\bar Y_{\cdot\cdot\cdot})^2,
$$
$$
SS_B=an\sum_j(\bar Y_{\cdot j\cdot}-\bar Y_{\cdot\cdot\cdot})^2,
$$
$$
SS_{AB}=n\sum_i\sum_j
(\bar Y_{ij\cdot}-\bar Y_{i\cdot\cdot}-\bar Y_{\cdot j\cdot}+\bar Y_{\cdot\cdot\cdot})^2,
$$
$$
SS_E=\sum_i\sum_j\sum_k(Y_{ijk}-\bar Y_{ij\cdot})^2.
$$
したがって
$$
SS_T=SS_A+SS_B+SS_{AB}+SS_E.
$$

自由度は
$$
\nu_A=a-1,
\quad
\nu_B=b-1,
\quad
\nu_{AB}=(a-1)(b-1),
$$
$$
\nu_E=ab(n-1),
\qquad
\nu_T=abn-1.
$$
各平均平方を対応する平方和/自由度で作り、
$$
F_A=\frac{MS_A}{MS_E},
\qquad
F_B=\frac{MS_B}{MS_E},
\qquad
F_{AB}=\frac{MS_{AB}}{MS_E}
$$
とする。

## 一手
**全平均→周辺平均→セル平均の順に整理し、A・B・交互作用・誤差へ平方和を分ける。** その後は自由度→平均平方→Fの順で一元配置と同じ流れを使う。

## 答え
数値例ではセル平均は
$$
\begin{pmatrix}
9&13\\
11&19
\end{pmatrix}.
$$
Aの周辺平均は $(11,15)$、Bの周辺平均は $(10,16)$、全平均は13である。

よって
$$
SS_A
=4\{(11-13)^2+(15-13)^2\}
=32,
$$
$$
SS_B
=4\{(10-13)^2+(16-13)^2\}
=72.
$$
交互作用偏差は順に
$$
1,-1,-1,1
$$
なので
$$
SS_{AB}=2(1^2+(-1)^2+(-1)^2+1^2)=8.
$$
各セル内では平均との差が $-1,1$ だから
$$
SS_E=4\{(-1)^2+1^2\}=8.
$$

自由度は
$$
\nu_A=\nu_B=\nu_{AB}=1,
\qquad
\nu_E=4.
$$
したがって
$$
MS_A=32,
\quad
MS_B=72,
\quad
MS_{AB}=8,
\quad
MS_E=2,
$$
$$
F_A=16,
\qquad
F_B=36,
\qquad
F_{AB}=4.
$$
5%上側臨界値7.71と比べると、AとBの主効果は有意、交互作用は有意ではない。

## 計算例
平方和と自由度の加法性も確認する。
$$
SS_T=32+72+8+8=120,
$$
$$
\nu_T=1+1+1+4=7=2\cdot2\cdot2-1.
$$

例えばA1B1の交互作用偏差は
$$
9-11-10+13=1,
$$
A1B2では
$$
13-11-16+13=-1.
$$
つまり交互作用平方和は「セル平均から、A主効果とB主効果だけで説明できる加法部分を引いた残り」を二乗して集めている。

分散分析表は
$$
\begin{array}{c|c|c|c|c}
\text{要因}&\text{平方和}&\text{自由度}&\text{平均平方}&F\\ \hline
A&32&1&32&16\\
B&72&1&72&36\\
AB&8&1&8&4\\
\text{誤差}&8&4&2&\\
\text{全体}&120&7&&
\end{array}
$$
となる。

## 注意
交互作用が有意なら、AやBの主効果だけを一律に解釈せず、単純主効果やセル平均の構造を確認する。反復なし $n=1$ では $\nu_E=ab(n-1)=0$ となり、純粋誤差と交互作用をこの形では分離して検定できない。不均衡配置では平方和の型や投入順序にも注意する。

<!-- CARD -->

---
id: anova-interaction-definition
title: 交互作用を差の差で表す
category: math-data-analysis
subcategory: math-anova
topic: interaction-definition
type: formula
difficulty: 2
priority: S
hashtags: [交互作用, 差の差, 二元配置分散分析]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 交互作用 }]
---

## 問題
2×2母平均 $\mu_{ij}$ の交互作用を1つの対比で表せ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

交互作用は一方の因子効果が他方の因子水準で変化すること。

## 答え
$$\Delta_{AB}=(\mu_{22}-\mu_{12})-(\mu_{21}-\mu_{11})
=\mu_{11}-\mu_{12}-\mu_{21}+\mu_{22}.$$
$\Delta_{AB}=0$ ならA効果はB水準によらず同じで、加法的である。

## 計算例
平均表 $\begin{pmatrix}10&12\\14&20\end{pmatrix}$ なら $(20-12)-(14-10)=4$。

## 注意
線が交差しなくても傾きが異なれば交互作用はある。

<!-- CARD -->

---
id: anova-interaction-contrast-test
title: 2×2交互作用対比をt検定する
category: math-data-analysis
subcategory: math-anova
topic: interaction-test
type: calc_step
difficulty: 4
priority: S
hashtags: [交互作用, 対比, t検定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 交互作用 }]
---

## 問題
独立な正規誤差が共通分散を持つ2×2二元配置で、各セル5反復、セル平均 $\begin{pmatrix}10&12\\14&20\end{pmatrix}$、誤差平均平方 $MS_E=5$ を得た。交互作用なしを両側5%で検定せよ。誤差自由度16のt分布の両側臨界値を2.120とする。

## 記号・用語
- SE：標準誤差（standard error）

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

自由度1の効果では、同じ仮説に対する $F=t^2$。

## 答え
差の差は
$$\widehat\Delta_{AB}=10-12-14+20=4.$$
4セル平均は独立で各分散 $\sigma^2/5$ だから
$$\operatorname{SE}(\widehat\Delta_{AB})=\sqrt{5(1/5+1/5+1/5+1/5)}=2.$$
したがって $t=4/2=2$、また $F=t^2=4$。誤差自由度は $2\cdot2(5-1)=16$。

## 計算例
差の差は
$$\widehat\Delta_{AB}=10-12-14+20=4.$$
各セル平均の推定分散は $MS_E/5=1$ なので
$$\operatorname{SE}(\widehat\Delta_{AB})
=\sqrt{1+1+1+1}=2.$$
したがって
$$t=\frac42=2,
\qquad F=t^2=4.$$
$|t|=2<2.120$ なので、5%水準では交互作用なしを棄却しない。

## 注意
結論まで出すには指定された有意水準と臨界値を使う。

<!-- CARD -->

---
id: anova-interaction-interpretation
title: 有意な交互作用があるとき単純主効果を見る
category: math-data-analysis
subcategory: math-anova
topic: interaction-interpretation
type: strategy
difficulty: 3
priority: A
hashtags: [交互作用, 単純主効果, 主効果]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 交互作用 }]
---

## 問題
A×B交互作用が有意だった。次に何を比較すべきか。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

交互作用があると、全水準で平均した主効果は局所的な効果を隠すことがある。

## 答え
Bの各水準を固定したAの単純主効果、またはAの各水準を固定したBの単純主効果を調べる。例えば
$$H_0:\mu_{1j}=\cdots=\mu_{aj}$$
を各 $j$ で検定する。

## 計算例
B=1ではA差0、B=2ではA差10なら、平均主効果5だけでは構造を表せない。

## 注意
複数の単純主効果検定には多重性調整を考える。

<!-- CARD -->

---
id: anova-no-replication-limitation
title: 反復なし二元配置の限界を説明する
category: math-data-analysis
subcategory: math-anova
topic: twoway-no-replication
type: condition
difficulty: 3
priority: A
hashtags: [二元配置分散分析, 反復なし, 交互作用]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 二元配置分散分析 }]
---

## 問題
各A×Bセルに観測が1個しかない二元配置で、交互作用を独立に検定できない理由を述べよ。

## 記号・用語
- 交絡（ここでの意味）：交互作用と誤差の寄与を観測データから別々に識別できないこと

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

セル内反復が、同じ処理組合せにおける純粋誤差を与える。

## 答え
$n=1$ では純粋誤差自由度
$$ab(n-1)=0$$
となる。残差に見える変動は交互作用と誤差を分離できないため、交互作用なしを仮定して交互作用平方和を誤差として使うほかない。

## 計算例
2×3反復なしなら全自由度5、A:1、B:2、残り2は交互作用と誤差が交絡する。

## 注意
「交互作用なし」はデータから検証できない追加仮定である。

<!-- CARD -->

---
id: anova-randomized-block-model
title: 乱塊法を二元配置加法モデルで表す
category: math-data-analysis
subcategory: math-anova
topic: randomized-block
type: formula
difficulty: 3
priority: A
hashtags: [乱塊法, ブロック, 二元配置分散分析]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 二元配置分散分析 }]
---

## 問題
処理を $i=1,\ldots,a$、ブロックを $j=1,\ldots,b$ とし、各処理・ブロックの組合せに1観測 $Y_{ij}$ がある。処理効果を $\alpha_i$、ブロック効果を $\beta_j$ とする乱塊法の加法モデルと誤差の仮定を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

処理差の検定は $F_A=MS_A/MS_E$。

## 答え
$$Y_{ij}=\mu+\alpha_i+\beta_j+\varepsilon_{ij},$$
$$\sum_i\alpha_i=0,\qquad \sum_j\beta_j=0,$$
$$\varepsilon_{ij}\overset{\mathrm{iid}}\sim N(0,\sigma^2).$$
誤差自由度は $(a-1)(b-1)$。

## 計算例
$a=2,b=3$、$\mu=10$、処理効果 $\alpha=(-1,1)$、ブロック効果 $\beta=(-2,0,2)$ とする。第2処理・第3ブロックの平均は
$$E[Y_{23}]=10+1+2=13.$$
誤差が独立に $N(0,4)$ に従うなら $Y_{23}\sim N(13,4)$ であり、処理×ブロック交互作用はモデルに含めていない。

## 注意
処理×ブロック交互作用がないことを仮定する。

<!-- CARD -->

---
id: anova-ancova-model
title: 共分散分析モデルを書く
category: math-data-analysis
subcategory: math-anova
topic: ancova-model
type: formula
difficulty: 3
priority: A
hashtags: [共分散分析, 共変量, 調整平均]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 共分散分析 }]
---

## 問題
処理群を $i$、群内個体を $j$、処理前に測定した連続変数を共変量 $X_{ij}$、応答を $Y_{ij}$ とする。群ごとの切片差と共通の共変量傾きを持つ共分散分析モデルを書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

共変量の線形効果を差し引いた調整平均を比較する。

## 答え
共変量を全体平均で中心化して
$$Y_{ij}=\mu+\alpha_i+\beta(X_{ij}-\overline X_{\cdot\cdot})+\varepsilon_{ij},
\qquad \sum_i n_i\alpha_i=0,$$
$$\varepsilon_{ij}\overset{\mathrm{iid}}\sim N(0,\sigma^2).$$
処理効果の帰無仮説は $H_0:\alpha_i=0\ (\forall i)$。

## 計算例
$\mu=10$、群効果を $(\alpha_1,\alpha_2)=(-1,1)$、共通傾きを $\beta=0.5$、全体共変量平均を $\overline X_{\cdot\cdot}=10$ とする。$X=8$ の群1個体の条件付き平均は
$$E[Y\mid i=1,X=8]
=10-1+0.5(8-10)=8.$$
$X=12$ の群2個体では
$$E[Y\mid i=2,X=12]
=10+1+0.5(12-10)=12.$$
同じ $X=10$ へそろえた調整平均は群1が9、群2が11である。

## 注意
共変量は原則として処理割付け前に測定された変数を使う。

<!-- CARD -->

---
id: anova-ancova-adjusted-mean
title: 共分散分析の調整平均を計算する
category: math-data-analysis
subcategory: math-anova
topic: ancova-adjusted-mean
type: calc_step
difficulty: 3
priority: A
hashtags: [共分散分析, 調整平均, 共変量]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 共分散分析 }]
---

## 問題
群1の $(\overline X_1,\overline Y_1)=(8,15)$、群2は $(12,18)$、全体 $\overline X=10$、共通傾き $\widehat\beta=0.5$。全体平均Xへ調整した群平均を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

回帰直線に沿って各群平均を共通の共変量値へ移す。

## 答え
$$\overline Y_{i,\mathrm{adj}}=\overline Y_i-\widehat\beta(\overline X_i-\overline X).$$
したがって
$$\overline Y_{1,\mathrm{adj}}=15-0.5(8-10)=16,$$
$$\overline Y_{2,\mathrm{adj}}=18-0.5(12-10)=17.$$
未調整差3は調整後差1になる。

## 計算例
群1は
$$15-0.5(8-10)=15+1=16,$$
群2は
$$18-0.5(12-10)=18-1=17.$$
したがって未調整の群平均差は $18-15=3$ だが、調整後は $17-16=1$ になる。

## 注意
傾きの符号を確認して補正方向を決める。

<!-- CARD -->

---
id: anova-ancova-parallel-slopes
title: 共分散分析の平行回帰仮定を検定する
category: math-data-analysis
subcategory: math-anova
topic: ancova-slope-homogeneity
type: strategy
difficulty: 3
priority: A
hashtags: [共分散分析, 交互作用, 平行回帰]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 共分散分析 }]
---

## 問題
処理群 $i=1,\ldots,a$ と連続共変量 $X$ の共分散分析で、群間で回帰傾きが等しいという平行回帰仮定を、識別可能なモデルと部分F検定でどう検討するか。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

平行回帰仮定は群×共変量交互作用がないこと。

## 答え
群1を基準群として、交互作用を含むモデル
$$Y=\mu+\sum_{r=2}^a\alpha_r\mathbf1\{i=r\}
+\beta X+\sum_{r=2}^a\gamma_r\mathbf1\{i=r\}X+\varepsilon$$
を当て、
$$H_0:\gamma_2=\cdots=\gamma_a=0$$
を部分F検定する。この基準群符号化なら $\beta$ は群1の傾き、$\gamma_r$ は群rと群1の傾き差なので識別可能である。棄却されなければ共通傾きモデルへ簡約する。

## 計算例
3群、総標本数30で、共通傾きモデルの残差平方和が $SSE_R=120$、2個の群×共変量交互作用を加えた完全モデルが $SSE_F=100$、完全モデルの誤差自由度が24とする。正規・独立・等分散誤差の下で
$$F=\frac{(SSE_R-SSE_F)/2}{SSE_F/24}
=\frac{(120-100)/2}{100/24}=2.4.$$
5%臨界値が $F_{2,24,0.05}=3.40$ なら $2.4<3.40$ なので、平行回帰仮定を棄却しない。

## 注意
交互作用が有意なら単一の調整平均差は共変量水準に依存する。

<!-- CARD -->

---
id: anova-fixed-random-effects
title: 固定効果と変量効果を区別する
category: math-data-analysis
subcategory: math-anova
topic: fixed-random-effects
type: recognition
difficulty: 3
priority: A
hashtags: [固定効果, 変量効果, 分散分析]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 固定効果と変量効果（基本） }]
---

## 問題
因子水準が固定効果か変量効果かを、推測対象とモデルで区別せよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

固定効果の対象は個別の $\alpha_i$、変量効果の対象は分散成分 $\sigma_A^2$。

## 答え
選んだ水準そのものの平均差を推測するなら固定効果
$$Y_{ij}=\mu+\alpha_i+\varepsilon_{ij}$$
とする。水準が母集団から無作為抽出され、水準間変動を推測するなら変量効果
$$Y_{ij}=\mu+A_i+\varepsilon_{ij},\qquad A_i\overset{\mathrm{iid}}\sim N(0,\sigma_A^2),$$
$$\varepsilon_{ij}\overset{\mathrm{iid}}\sim N(0,\sigma^2),\qquad
\{A_i\}\text{ と }\{\varepsilon_{ij}\}\text{ は独立}$$
とする。

## 計算例
特定の3薬剤比較は固定効果、製造ロット母集団から抽出した5ロットは変量効果が自然。

## 注意
同じデータ表でも、抽出方法と推測対象によって効果の扱いが変わる。

<!-- CARD -->

---
id: anova-residual-diagnostics
title: 分散分析残差から仮定違反を判定する
category: math-data-analysis
subcategory: math-anova
topic: anova-diagnostics
type: recognition
difficulty: 2
priority: A
hashtags: [残差診断, 等分散, 正規性]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 一元配置分散分析 }]
---

## 問題
分散分析の残差図で確認する代表的な3点を挙げよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

残差は $e_{ij}=Y_{ij}-\widehat Y_{ij}=Y_{ij}-\overline Y_{i\cdot}$。

## 答え
(1) 残差対当てはめ値で分散がほぼ一定、(2) 正規Q–Q図で大きな曲がりがない、(3) 観測順残差で系列的な構造がないことを確認する。

## 計算例
漏斗形なら平均が大きい群ほど分散が大きい疑いがある。

## 注意
検定のP値だけでなく、設計と残差診断を合わせて判断する。

<!-- CARD -->

---
id: anova-regression-equivalence
title: 一元配置分散分析をダミー変数回帰で表す
category: math-data-analysis
subcategory: math-anova
topic: anova-regression-equivalence
type: formula
difficulty: 3
priority: A
hashtags: [一元配置分散分析, ダミー変数, 回帰]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 一元配置分散分析と回帰の同値性 }]
---

## 問題
3群の一元配置モデルを、群1を基準とするダミー変数回帰で表せ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

一元配置のF検定は、群ダミー係数の回帰全体F検定と一致する。

## 答え
群2の指示変数を $D_2$、群3を $D_3$ として
$$Y=\beta_0+\beta_2D_2+\beta_3D_3+\varepsilon.$$
すると
$$\mu_1=\beta_0,\qquad \mu_2=\beta_0+\beta_2,\qquad \mu_3=\beta_0+\beta_3.$$
したがって $H_0:\mu_1=\mu_2=\mu_3$ は $H_0:\beta_2=\beta_3=0$ と同値。

## 計算例
群平均 $(10,13,15)$ なら係数は $(\beta_0,\beta_2,\beta_3)=(10,3,5)$。

## 注意
ダミー変数を全群分と切片の両方入れると完全共線性になる。

<!-- CARD -->

---
id: reg-simple-model-assumptions
title: 単回帰モデルと条件付き分布を書く
category: math-data-analysis
subcategory: math-regression
topic: simple-regression-model
type: formula
difficulty: 2
priority: S
hashtags: [単回帰, 正規線形モデル, 誤差]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 線形単回帰 }]
---

## 問題
説明変数 $x_i$ を固定した単回帰モデルと正規誤差の仮定を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$E[Y_i\mid x_i]=\beta_0+\beta_1x_i$、$\operatorname{Var}(Y_i\mid x_i)=\sigma^2$。

## 答え
$$Y_i=\beta_0+\beta_1x_i+\varepsilon_i,$$
$$\varepsilon_i\overset{\mathrm{iid}}\sim N(0,\sigma^2).$$
したがって
$$Y_i\mid x_i\sim N(\beta_0+\beta_1x_i,\sigma^2)$$
で、異なる観測は独立である。

## 計算例
$\beta_0=2,\beta_1=3,\sigma^2=4$ とする。$x=4$ では
$$E[Y\mid x=4]=2+3\cdot4=14,$$
$$\operatorname{Var}(Y\mid x=4)=4.$$
正規誤差を仮定しているので
$$Y\mid x=4\sim N(14,4).$$

## 注意
線形性はパラメータについての線形性であり、説明変数変換を禁止しない。

<!-- CARD -->

---
id: reg-ols-normal-equations-simple
title: 単回帰を最小二乗推定から当てはめ・残差直交まで通す
category: math-data-analysis
subcategory: math-regression
topic: simple-regression-ols-canonical
type: calc_step
difficulty: 3
priority: S
hashtags:
  - 単回帰
  - 最小二乗法
  - 正規方程式
  - 残差
  - 直交条件
frequency:
  past_exam: 1
  textbook: 0
  independent_problems: 0
  source_confirmations: 1
sources:
  - type: official_syllabus
    topic: 最小二乗推定
  - type: past_exam
    id: MATH-2024-Q1
    topic: 回帰係数の推定・検定・検出力
---

## 問題
切片を含む単回帰
$$
y_i=\beta_0+\beta_1x_i+\varepsilon_i
$$
について、残差平方和を最小にして $\widehat\beta_0,\widehat\beta_1$ を導け。さらに当てはめ値 $\widehat y_i$ と残差 $e_i$ を定義し、正規方程式から残差の2つの直交条件を示せ。

数値例として $(x_i,y_i)=(1,2),(2,3),(3,5)$ を最後まで計算せよ。

## 使用公式・定理
残差平方和を
$$
Q(\beta_0,\beta_1)
=\sum_{i=1}^n(y_i-\beta_0-\beta_1x_i)^2
$$
とする。偏微分して
$$
\frac{\partial Q}{\partial\beta_0}
=-2\sum_i(y_i-\beta_0-\beta_1x_i)=0,
$$
$$
\frac{\partial Q}{\partial\beta_1}
=-2\sum_i x_i(y_i-\beta_0-\beta_1x_i)=0.
$$
ここから
$$
S_{xx}=\sum_i(x_i-\bar x)^2,
\qquad
S_{xy}=\sum_i(x_i-\bar x)(y_i-\bar y)
$$
とおけば
$$
\widehat\beta_1=\frac{S_{xy}}{S_{xx}},
\qquad
\widehat\beta_0=\bar y-\widehat\beta_1\bar x.
$$
当てはめ値と残差は
$$
\widehat y_i=\widehat\beta_0+\widehat\beta_1x_i,
\qquad
e_i=y_i-\widehat y_i.
$$

## 一手
**残差平方和を微分して正規方程式を作る。** その同じ方程式を推定後に読み直すと $\sum e_i=0$ と $\sum x_ie_i=0$ が直ちに出る。

## 答え
正規方程式から
$$
\sum_i e_i=0,
\qquad
\sum_i x_ie_i=0.
$$
すなわち切片を含む最小二乗法では、残差は定数ベクトルと説明変数ベクトルの双方に直交する。

数値例では
$$
\bar x=2,
\qquad
\bar y=\frac{10}{3},
$$
$$
S_{xx}=(-1)^2+0^2+1^2=2,
$$
$$
S_{xy}=(-1)\left(-\frac43\right)+0+1\left(\frac53\right)=3.
$$
よって
$$
\widehat\beta_1=\frac32,
\qquad
\widehat\beta_0=\frac13.
$$

## 計算例
回帰直線は
$$
\widehat y=\frac13+\frac32x.
$$
したがって
$$
(\widehat y_1,\widehat y_2,\widehat y_3)
=\left(\frac{11}{6},\frac{10}{3},\frac{29}{6}\right),
$$
$$
(e_1,e_2,e_3)
=\left(\frac16,-\frac13,\frac16\right).
$$
実際
$$
\sum_i e_i
=\frac16-\frac13+\frac16=0,
$$
$$
\sum_i x_ie_i
=\frac16-\frac23+\frac12=0.
$$
「係数を求める計算」と「残差の直交性」は別公式ではなく、同じ正規方程式の表裏である。

## 注意
$S_{xx}>0$、すなわち全ての $x_i$ が同一でないことが必要。$\sum e_i=0$ は切片を含む回帰の性質であり、切片なし回帰では一般に成立しない。誤差 $\varepsilon_i$ は観測不能な確率変数、残差 $e_i$ は推定後に得る実現値である。

<!-- CARD -->

---
id: reg-sst-decomposition
title: 回帰の平方和分解から決定係数・相関・自由度調整までつなぐ
category: math-data-analysis
subcategory: math-regression
topic: regression-goodness-of-fit-canonical
type: calc_step
difficulty: 3
priority: S
hashtags:
  - 回帰分析
  - 平方和分解
  - 決定係数
  - 相関係数
  - 自由度調整済み決定係数
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 回帰の分散分析
---

## 問題
切片を含む線形回帰で、全平方和・回帰平方和・残差平方和の分解を示し、決定係数を定義せよ。さらに

1. 単回帰では $R^2=r_{xy}^2$ となることを示せ。
2. 説明変数が $p$ 個の自由度調整済み決定係数を書け。
3. $(x,y)=(1,2),(2,3),(3,5)$ で各量を計算せよ。

## 記号・用語
- SSE：残差平方和（sum of squared errors）
- SSR：回帰平方和（regression sum of squares）
- SST：全平方和（total sum of squares）

## 使用公式・定理
$$
SST=\sum_i(y_i-\bar y)^2,
\qquad
SSR=\sum_i(\widehat y_i-\bar y)^2,
\qquad
SSE=\sum_i e_i^2.
$$
切片を含む最小二乗法では残差と当てはめ成分が直交するので
$$
SST=SSR+SSE.
$$
よって
$$
R^2=\frac{SSR}{SST}=1-\frac{SSE}{SST}.
$$
単回帰では
$$
\widehat\beta_1=\frac{S_{xy}}{S_{xx}},
\qquad
SSR=\widehat\beta_1^2S_{xx}=\frac{S_{xy}^2}{S_{xx}},
$$
したがって
$$
R^2=\frac{S_{xy}^2}{S_{xx}S_{yy}}=r_{xy}^2.
$$
説明変数が $p$ 個なら
$$
\bar R^2
=1-\frac{SSE/(n-p-1)}{SST/(n-1)}
=1-(1-R^2)\frac{n-1}{n-p-1}.
$$

## 一手
**まず $y_i-\bar y=(\widehat y_i-\bar y)+e_i$ と分け、交差項が残差直交で0になることを使う。** $R^2$ の各公式はこの平方和分解から出す。

## 答え
数値例では $\bar y=10/3$ なので
$$
SST
=\left(-\frac43\right)^2+\left(-\frac13\right)^2+\left(\frac53\right)^2
=\frac{14}{3}.
$$
前問の残差 $(1/6,-1/3,1/6)$ から
$$
SSE=\frac1{36}+\frac19+\frac1{36}=\frac16.
$$
よって
$$
SSR=SST-SSE
=\frac{14}{3}-\frac16
=\frac92,
$$
$$
R^2=1-\frac{1/6}{14/3}=1-\frac1{28}=\frac{27}{28}\approx0.9643.
$$

## 計算例
この例では
$$
S_{xx}=2,
\qquad
S_{xy}=3,
\qquad
S_{yy}=\frac{14}{3}.
$$
したがって標本相関係数は正で
$$
r_{xy}
=\frac{3}{\sqrt{2(14/3)}},
$$
$$
r_{xy}^2
=\frac9{28/3}
=\frac{27}{28}
=R^2.
$$
また $n=3,p=1$ なので
$$
\bar R^2
=1-\left(1-\frac{27}{28}\right)\frac{2}{1}
=\frac{13}{14}\approx0.9286.
$$
説明変数を増やすと通常の $R^2$ は低下しないが、自由度調整済み決定係数は改善が小さければ低下しうる。

## 注意
$R^2$ が高いことは因果関係やモデル妥当性を保証しない。単回帰では $R^2=r^2$ だが、$R^2$ だけから相関係数の符号は分からない。中心化平方和の分解は切片を含む通常の回帰を前提とする。

<!-- CARD -->

---
id: reg-error-variance-estimator
title: 回帰の誤差分散を不偏推定する
category: math-data-analysis
subcategory: math-regression
topic: error-variance
type: formula
difficulty: 2
priority: S
hashtags: [誤差分散, 残差平方和, 自由度]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 回帰の分散分析 }]
---

## 問題
標本サイズ $n$、切片以外の説明変数が $p$ 個の重回帰で、残差平方和を $SSE=\sum_i e_i^2$ とする。誤差分散 $\sigma^2$ の不偏推定量を書け。

## 記号・用語
- SSE：残差平方和（sum of squared errors）

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

推定する回帰係数は切片を含め $p+1$ 個なので、誤差自由度は $n-p-1$。

## 答え
$$\widehat\sigma^2=MS_E=\frac{SSE}{n-p-1}.$$

## 計算例
$n=30,p=4,SSE=50$ とする。推定する係数は切片を含めて $p+1=5$ 個なので、誤差自由度は
$$n-p-1=30-4-1=25.$$
したがって
$$MS_E=\widehat\sigma^2=\frac{SSE}{n-p-1}
=\frac{50}{25}=2.$$

## 注意
$SSE/n$ は正規最尤推定量だが一般に不偏ではない。

<!-- CARD -->

---
id: reg-slope-t-test
title: 単回帰係数の分散から傾きのt検定・信頼区間まで通す
category: math-data-analysis
subcategory: math-regression
topic: simple-regression-inference-canonical
type: formula
difficulty: 2
priority: S
hashtags:
  - 単回帰
  - 回帰係数
  - 分散
  - t検定
  - 信頼区間
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 線形単回帰
---

## 問題
単回帰
$$
Y_i=\beta_0+\beta_1x_i+\varepsilon_i,
\qquad
\varepsilon_i\overset{\mathrm{iid}}\sim N(0,\sigma^2)
$$
を考え、誤差は正規分布 $N(0,\sigma^2)$ に独立同分布で従うとする。$\widehat\beta_1,\widehat\beta_0$ の分散を書き、$\sigma^2$ 未知のときの傾きのt検定と信頼区間を構成せよ。

数値例として $\widehat\beta_1=2.0$、標準誤差0.5、$n=20$ とする。$H_0:\beta_1=0$ を両側5%で検定し、自由度18のt分布の両側5%臨界値を2.101として95%信頼区間も求めよ。

## 記号・用語
- SE：標準誤差（standard error）

## 使用公式・定理
$$
S_{xx}=\sum_i(x_i-\bar x)^2.
$$
固定された説明変数の下で
$$
\operatorname{Var}(\widehat\beta_1)=\frac{\sigma^2}{S_{xx}},
$$
$$
\operatorname{Var}(\widehat\beta_0)
=\sigma^2\left(\frac1n+\frac{\bar x^2}{S_{xx}}\right).
$$
また
$$
s^2=\frac{SSE}{n-2}
$$
として
$$
\operatorname{SE}(\widehat\beta_1)=\frac{s}{\sqrt{S_{xx}}}.
$$
$H_0:\beta_1=\beta_{1,0}$ の下で
$$
t=\frac{\widehat\beta_1-\beta_{1,0}}
{\operatorname{SE}(\widehat\beta_1)}
\sim t_{n-2}.
$$
$100(1-\alpha)\%$ 信頼区間は
$$
\widehat\beta_1
\pm t_{n-2,1-\alpha/2}\operatorname{SE}(\widehat\beta_1).
$$

## 一手
**係数の分散→$\sigma^2$ を残差平均平方で推定→標準誤差→t標準化、の順に進める。** 検定と信頼区間は同じ標準誤差を使う。

## 答え
数値例では
$$
t=\frac{2.0-0}{0.5}=4.0.
$$
$|4.0|>2.101$ なので5%水準で $H_0$ を棄却する。

95%信頼区間は
$$
2.0\pm2.101\times0.5
=2.0\pm1.0505,
$$
したがって
$$
(0.9495,\ 3.0505).
$$
0を含まないので、同じ両側5%検定の棄却結果と一致する。

## 計算例
係数分散の大きさも数値で確認する。例えば
$$
n=10,\quad \bar x=2,\quad S_{xx}=20,\quad s^2=4
$$
なら
$$
\operatorname{SE}(\widehat\beta_1)
=\sqrt{\frac4{20}}
\approx0.447,
$$
$$
\operatorname{SE}(\widehat\beta_0)
=\sqrt{4\left(\frac1{10}+\frac4{20}\right)}
=\sqrt{1.2}
\approx1.095.
$$
$S_{xx}$ が大きいほど傾き推定の標準誤差は小さくなる。

## 注意
正確なt分布には独立な正規・等分散誤差を仮定する。統計的有意性と傾きの実質的大きさは別問題である。観測範囲を無理に広げて $S_{xx}$ を大きくすることが常に妥当とは限らない。

<!-- CARD -->

---
id: reg-mean-response-ci
title: 平均応答の信頼区間と新規観測の予測区間を同じ式から比較する
category: math-data-analysis
subcategory: math-regression
topic: simple-regression-intervals-canonical
type: formula
difficulty: 3
priority: A
hashtags:
  - 単回帰
  - 平均応答
  - 信頼区間
  - 予測区間
  - レバレッジ
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 線形単回帰
---

## 問題
単回帰で $x=x_0$ における

1. 平均応答 $E[Y\mid x_0]$ の信頼区間
2. 新しい1観測 $Y_{\mathrm{new}}\mid x_0$ の予測区間

を書き、なぜ後者が広いか説明せよ。

$n=10$、$x_0=\bar x$、$\widehat y_0=20$、残差標準偏差 $s=2$、自由度8のt分布の両側5%臨界値を2.306として95%の両区間を求めよ。

## 使用公式・定理
$$
h_0=\frac1n+\frac{(x_0-\bar x)^2}{S_{xx}}.
$$
平均応答の推定標準誤差は
$$
s\sqrt{h_0},
$$
したがって信頼区間は
$$
\widehat y_0\pm t_{n-2,1-\alpha/2}s\sqrt{h_0}.
$$
新しい1観測では新たな誤差分散 $\sigma^2$ が加わるため、予測標準誤差は
$$
s\sqrt{1+h_0},
$$
予測区間は
$$
\widehat y_0\pm t_{n-2,1-\alpha/2}s\sqrt{1+h_0}.
$$

## 一手
**平均そのものを推定するなら $h_0$、新しい個体を予測するなら $1+h_0$。** この「+1」が個体固有の新しい誤差分散である。

## 答え
$x_0=\bar x$ なので
$$
h_0=\frac1{10}=0.1.
$$
平均応答区間の半幅は
$$
2.306\times2\sqrt{0.1}\approx1.459,
$$
よって
$$
(18.541,\ 21.459).
$$

予測区間の半幅は
$$
2.306\times2\sqrt{1.1}\approx4.837,
$$
よって
$$
(15.163,\ 24.837).
$$

## 計算例
両者の標準誤差の比は
$$
\frac{\sqrt{1+h_0}}{\sqrt{h_0}}
=\sqrt{\frac{1.1}{0.1}}
=\sqrt{11}
\approx3.317.
$$
同じ $x_0$、同じt臨界値でも、新しい1観測の予測区間は個体差の分だけ大幅に広い。

また $|x_0-\bar x|$ が大きいほど $h_0$ が増え、平均応答区間も予測区間も広がる。

## 注意
平均応答の信頼区間と新規1観測の予測区間を混同しない。観測された説明変数範囲から大きく外れた外挿では、数式上区間を作れても線形モデル自体の妥当性が弱い。

<!-- CARD -->

---
id: reg-multiple-model-matrix
title: 重回帰を行列で表し最小二乗推定量・不偏性・共分散まで導く
category: math-data-analysis
subcategory: math-regression
topic: multiple-regression-matrix-canonical
type: formula
difficulty: 2
priority: S
hashtags:
  - 重回帰
  - 行列表現
  - 最小二乗法
  - 不偏性
  - 共分散行列
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 線形重回帰
---

## 問題
重回帰モデルを行列で
$$
\mathbf y=X\boldsymbol\beta+\boldsymbol\varepsilon
$$
と表す。$E[\boldsymbol\varepsilon]=\mathbf0$、$\operatorname{Var}(\boldsymbol\varepsilon)=\sigma^2I$ とする。

1. 残差平方和を最小化して最小二乗推定量を導け。
2. 不偏性と共分散行列を導け。
3. $X=\begin{pmatrix}1&0\\1&1\\1&2\end{pmatrix}$、$\mathbf y=(1,3,5)^\mathsf T$ で係数を計算せよ。

## 使用公式・定理
残差平方和は
$$
S(\boldsymbol\beta)
=(\mathbf y-X\boldsymbol\beta)^\mathsf T
(\mathbf y-X\boldsymbol\beta).
$$
勾配を0とすると
$$
-2X^\mathsf T(\mathbf y-X\boldsymbol\beta)=\mathbf0,
$$
すなわち正規方程式
$$
X^\mathsf TX\widehat{\boldsymbol\beta}=X^\mathsf T\mathbf y
$$
を得る。$X$ が列フルランクなら
$$
\widehat{\boldsymbol\beta}
=(X^\mathsf TX)^{-1}X^\mathsf T\mathbf y.
$$
また
$$
\widehat{\boldsymbol\beta}
=\boldsymbol\beta+(X^\mathsf TX)^{-1}X^\mathsf T\boldsymbol\varepsilon.
$$

## 一手
**残差平方和を行列で微分して正規方程式を出し、推定量から真値を引いて誤差の線形変換として読む。** その形から期待値と共分散が一度に出る。

## 答え
$E[\boldsymbol\varepsilon]=\mathbf0$ より
$$
E[\widehat{\boldsymbol\beta}]=\boldsymbol\beta.
$$
また
$$
\begin{aligned}
\operatorname{Var}(\widehat{\boldsymbol\beta})
&=(X^\mathsf TX)^{-1}X^\mathsf T
(\sigma^2I)X(X^\mathsf TX)^{-1}\\
&=\sigma^2(X^\mathsf TX)^{-1}.
\end{aligned}
$$

数値例では
$$
X^\mathsf TX=\begin{pmatrix}3&3\\3&5\end{pmatrix},
\qquad
X^\mathsf T\mathbf y=\begin{pmatrix}9\\13\end{pmatrix}.
$$
逆行列は
$$
(X^\mathsf TX)^{-1}
=\frac16\begin{pmatrix}5&-3\\-3&3\end{pmatrix}.
$$
よって
$$
\widehat{\boldsymbol\beta}
=\frac16
\begin{pmatrix}5&-3\\-3&3\end{pmatrix}
\begin{pmatrix}9\\13\end{pmatrix}
=\begin{pmatrix}1\\2\end{pmatrix}.
$$

## 計算例
この設計では
$$
\widehat y=1+2x
$$
で3点を完全に通る。また係数共分散行列は
$$
\operatorname{Var}(\widehat{\boldsymbol\beta})
=\frac{\sigma^2}{6}
\begin{pmatrix}
5&-3\\
-3&3
\end{pmatrix}.
$$
対角要素が各係数推定量の分散、非対角要素が係数推定量間の共分散である。

## 注意
一意な係数推定には $\operatorname{rank}(X)$ が列数に等しいことが必要。不均一分散や相関誤差では $\sigma^2(X^\mathsf TX)^{-1}$ は一般に正しくない。実際の大規模数値計算では逆行列を明示的に作るよりQR分解などを用いる。

<!-- CARD -->

---
id: reg-hat-matrix-properties
title: ハット行列の性質を示す
category: math-data-analysis
subcategory: math-regression
topic: hat-matrix
type: calc_step
difficulty: 4
priority: A
hashtags: [ハット行列, 射影, 当てはめ値]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 線形重回帰 }]
---

## 問題
列フルランクの計画行列 $\boldsymbol X$ を持つ線形回帰で、観測ベクトルを当てはめ値へ写すハット行列 $\boldsymbol H$ を定義し、対称性と冪等性を示せ。

## 記号・用語
- ハット行列：観測ベクトルを当てはめ値へ写す射影行列

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

対称冪等行列は直交射影行列。

## 答え
$$\widehat Y=HY,\qquad H=X(X^{\mathsf T}X)^{-1}X^{\mathsf T}.$$
$(X^{\mathsf T}X)^{-1}$ は対称なので $H^{\mathsf T}=H$。また
$$H^2=X(X^{\mathsf T}X)^{-1}(X^{\mathsf T}X)(X^{\mathsf T}X)^{-1}X^{\mathsf T}=H.$$

## 計算例
$\boldsymbol X=\begin{pmatrix}1&0\\1&1\\1&2\end{pmatrix}$ なら
$$\boldsymbol H
=\boldsymbol X(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}\boldsymbol X^{\mathsf T}
=\begin{pmatrix}
5/6&1/3&-1/6\\
1/3&1/3&1/3\\
-1/6&1/3&5/6
\end{pmatrix}.$$
行列は対称で、$\boldsymbol H^2=\boldsymbol H$ を直接確認できる。また
$$\operatorname{tr}(\boldsymbol H)=5/6+1/3+5/6=2,$$
これは $\boldsymbol X$ の列数・階数2に等しい。

## 注意
残差生成行列は $I-H$。

<!-- CARD -->

---
id: reg-leverage-meaning
title: レバレッジを定義して平均を求める
category: math-data-analysis
subcategory: math-regression
topic: leverage
type: formula
difficulty: 3
priority: A
hashtags: [レバレッジ, ハット行列, 影響点]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 残差 }]
---

## 問題
標本サイズを $n$、切片以外の説明変数数を $p$ とする列フルランクの線形回帰で、ハット行列の対角要素であるレバレッジ $h_{ii}$ の定義、範囲、全観測での平均を書け。

## 記号・用語
- ハット行列：観測ベクトルを当てはめ値へ写す射影行列
- レバレッジ：説明変数空間での観測の位置を表すハット行列の対角要素

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$\widehat Y_i=\sum_jh_{ij}Y_j$ で、$h_{ii}$ は自身の観測値が当てはめ値へ及ぼす重み。

## 答え
$h_{ii}$ はハット行列 $H$ の第i対角要素で
$$0\le h_{ii}\le1,\qquad \sum_i h_{ii}=\operatorname{tr}(H)=p+1.$$
したがって平均は $(p+1)/n$。

## 計算例
$n=30,p=2$ なら平均レバレッジは3/30=0.1。

## 注意
高レバレッジだけでは影響点とは限らず、残差の大きさも見る。

<!-- CARD -->

---
id: reg-residual-variance-leverage
title: 最小二乗法残差の分散をレバレッジで表す
category: math-data-analysis
subcategory: math-regression
topic: residual-variance
type: calc_step
difficulty: 3
priority: A
hashtags: [残差, レバレッジ, 分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 残差 }]
---

## 問題
線形モデル $\boldsymbol Y=\boldsymbol X\boldsymbol\beta+\boldsymbol\varepsilon$ で $\operatorname{Var}(\boldsymbol\varepsilon)=\sigma^2\boldsymbol I$ とする。ハット行列を $\boldsymbol H$、当てはめ値を $\widehat{\boldsymbol Y}=\boldsymbol H\boldsymbol Y$、残差を $\boldsymbol e=\boldsymbol Y-\widehat{\boldsymbol Y}=(\boldsymbol I-\boldsymbol H)\boldsymbol Y$ と定義する。残差ベクトルの共分散と第 $i$ 残差の分散を求めよ。

## 記号・用語
- レバレッジ：説明変数空間での観測の位置を表すハット行列の対角要素

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$(I-H)^2=I-H$。

## 答え
$$e=(I-H)\varepsilon$$
なので、$I-H$ の対称冪等性より
$$\operatorname{Var}(e)=\sigma^2(I-H),$$
$$\operatorname{Var}(e_i)=\sigma^2(1-h_{ii}).$$

## 計算例
$h_{ii}=0.8$ なら残差分散は $0.2\sigma^2$。

## 注意
生の残差は高レバレッジ点で分散が小さいため、標準化して比較する。

<!-- CARD -->

---
id: reg-studentized-residual
title: 標準化残差を計算する
category: math-data-analysis
subcategory: math-regression
topic: studentized-residual
type: calc_step
difficulty: 3
priority: A
hashtags: [標準化残差, レバレッジ, 外れ値]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 残差 }]
---

## 問題
残差を $e_i$、残差標準偏差を $s$、ハット行列の対角要素であるレバレッジを $h_{ii}$ とする。$e_i=3,s=2,h_{ii}=0.4375$ の内部標準化残差を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$\operatorname{Var}(e_i)=\sigma^2(1-h_{ii})$。

## 答え
$$r_i=\frac{e_i}{s\sqrt{1-h_{ii}}}
=\frac3{2\sqrt{0.5625}}
=\frac3{1.5}=2.$$

## 計算例
$$1-h_{ii}=1-0.4375=0.5625,
\qquad\sqrt{0.5625}=0.75.$$
したがって
$$r_i=\frac3{2\cdot0.75}=2.$$
$|r_i|=2$ なので、応答方向の外れ値候補として確認する。

## 注意
厳密な外れ値検定には当該点を除いて分散推定する外部Student化残差を使う。

<!-- CARD -->

---
id: reg-coefficient-t-multiple
title: 重回帰の個別係数をt検定する
category: math-data-analysis
subcategory: math-regression
topic: coefficient-t
type: formula
difficulty: 3
priority: S
hashtags: [重回帰, 回帰係数, t検定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 線形重回帰 }]
---

## 問題
標本サイズ $n$、切片以外の説明変数数 $p$ の重回帰を考える。固定された列フルランクの計画行列の下で、誤差は独立な正規分布に従い共通分散を持つとする。$s^2=SSE/(n-p-1)$、$\boldsymbol C=(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}$ として、$H_0:\beta_j=\beta_{j,0}$ のt統計量を書け。

## 記号・用語
- SSE：残差平方和（sum of squared errors）

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$\operatorname{Var}(\widehat\beta_j)=\sigma^2C_{jj}$、$s^2=SSE/(n-p-1)$。

## 答え
$C=(X^{\mathsf T}X)^{-1}$ とすると
$$T=\frac{\widehat\beta_j-\beta_{j,0}}{s\sqrt{C_{jj}}}
\sim t_{n-p-1}$$
が帰無仮説下で成り立つ。

## 計算例
$\widehat\beta_j=2$、帰無値0、$s\sqrt{C_{jj}}=0.5$ なら
$$t=\frac{2-0}{0.5}=4.$$
誤差自由度20の両側5%臨界値を2.086とすれば、$|4|>2.086$ なので $H_0:\beta_j=0$ を棄却する。

## 注意
「他の説明変数を固定した条件付き効果」の検定である。

<!-- CARD -->

---
id: reg-overall-f-test
title: 重回帰の全体F検定を平方和と決定係数の両方から計算する
category: math-data-analysis
subcategory: math-regression
topic: overall-f-canonical
type: formula
difficulty: 3
priority: S
hashtags:
  - 重回帰
  - 全体F検定
  - 決定係数
  - 平方和
  - 分散分析
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 回帰の分散分析
---

## 問題
切片と $p$ 個の説明変数を持つ重回帰を考える。標本サイズを $n$ とし、計画行列は列フルランク、誤差は独立な正規分布に従い共通分散 $\sigma^2$ を持つとする。

1. 帰無仮説
$$
H_0:\beta_1=\cdots=\beta_p=0
$$
を検定する全体F統計量を、回帰平方和 $SSR$ と残差平方和 $SSE$ で書け。
2. 同じ統計量を決定係数 $R^2$ だけで表せ。
3. $n=30,p=3,R^2=0.40$、5%上側臨界値を2.98として判定せよ。

## 記号・用語
- SSE：残差平方和（sum of squared errors）
- SSR：回帰平方和（regression sum of squares）

## 使用公式・定理
切片を含む通常の回帰では
$$
SST=SSR+SSE,
\qquad
R^2=\frac{SSR}{SST},
\qquad
1-R^2=\frac{SSE}{SST}.
$$
全体F統計量は
$$
F=\frac{SSR/p}{SSE/(n-p-1)}.
$$
帰無仮説の下で
$$
F\sim F_{p,n-p-1}.
$$
分子・分母をともに $SST$ で割れば
$$
F
=\frac{R^2/p}{(1-R^2)/(n-p-1)}.
$$

## 一手
**平方和のF式をまず書き、$SSR/SST=R^2$ と $SSE/SST=1-R^2$ を代入する。** 「決定係数から求めるF」は別公式ではなく同じ全体F検定の書き換えである。

## 答え
$n=30,p=3,R^2=0.40$ なので
$$
F
=\frac{0.40/3}{0.60/(30-3-1)}
=\frac{0.40/3}{0.60/26}.
$$
分子は
$$
\frac{0.40}{3}\approx0.13333,
$$
分母は
$$
\frac{0.60}{26}\approx0.02308,
$$
よって
$$
F\approx5.78.
$$
$5.78>2.98$ なので5%水準で $H_0$ を棄却し、説明変数全体として有意な線形関係があると判断する。

## 計算例
同じモデルで $SST=200$ とすると
$$
SSR=R^2SST=0.40\times200=80,
$$
$$
SSE=(1-R^2)SST=0.60\times200=120.
$$
平方和表示から計算しても
$$
F
=\frac{80/3}{120/26}
=\frac{26.666\ldots}{4.615\ldots}
\approx5.78,
$$
と一致する。

## 注意
全体F検定で棄却しても、全ての個別係数が有意とは限らない。少なくとも1つの傾き係数が0でないことを示す検定である。また統計的有意性は因果関係を意味しない。正確なF分布による有限標本検定には、固定された列フルランクの計画行列と独立・正規・等分散誤差を仮定する。

<!-- CARD -->

---
id: reg-overall-f-r2
title: R二乗から全体F統計量を計算する
category: math-data-analysis
subcategory: math-regression
topic: overall-f-r2
type: calc_step
difficulty: 3
priority: S
hashtags: [決定係数, F検定, 重回帰]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 回帰の分散分析 }]
---

## 問題
固定された列フルランクの計画行列の下で、誤差が独立な正規分布に従い共通分散を持つ重回帰を考える。標本サイズ $n=30$、切片以外の説明変数数 $p=3$、決定係数 $R^2=0.40$ から全体F統計量を求めよ。

## 記号・用語
- SSE：残差平方和（sum of squared errors）
- SSR：回帰平方和（regression sum of squares）
- SST：全平方和（total sum of squares）

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$SSR=R^2SST$、$SSE=(1-R^2)SST$ を全体F式へ代入する。

## 答え
$$F=\frac{R^2/p}{(1-R^2)/(n-p-1)}
=\frac{0.40/3}{0.60/26}
=\frac{52}{9}\approx5.78.$$
自由度は $(3,26)$。

## 計算例
$$F=\frac{R^2/p}{(1-R^2)/(n-p-1)}
=\frac{0.40/3}{0.60/26}
=\frac{52}{9}\approx5.78.$$
自由度は $(3,26)$。5%臨界値を2.98とすれば $5.78>2.98$ なので、切片以外の係数が全て0という帰無仮説を棄却する。

## 注意
切片を含む通常の $R^2$ を前提とする。

<!-- CARD -->

---
id: reg-partial-f-test
title: 入れ子回帰の部分F検定を数値計算し1係数ならt二乗へつなぐ
category: math-data-analysis
subcategory: math-regression
topic: partial-f-canonical
type: formula
difficulty: 3
priority: S
hashtags:
  - 重回帰
  - 部分F検定
  - 入れ子モデル
  - t検定
  - 平方和
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 回帰の分散分析
---

## 問題
固定された列フルランクの計画行列の下で、誤差が独立な正規分布に従い共通分散を持つ重回帰を考える。説明変数を除いた縮小モデルをR、追加後の完全モデルをFとする。

1. 標本サイズを $n$、完全モデルの切片以外の説明変数数を $p_F$、追加係数数を $q$、両モデルの残差平方和を $SSE_R,SSE_F$ として部分F統計量を書け。
2. $n=30,p_F=4,q=2,SSE_R=100,SSE_F=70$、5%上側臨界値を3.39として判定せよ。
3. $q=1$ のとき、同じ1係数を検定するt統計量との間に $F=t^2$ が成り立つことを示せ。

## 使用公式・定理
入れ子モデルでは、完全モデルは縮小モデルを特殊例として含むため
$$
SSE_R\ge SSE_F.
$$
追加した $q$ 個の係数が全て0という帰無仮説の下で
$$
F
=\frac{(SSE_R-SSE_F)/q}{SSE_F/(n-p_F-1)}
\sim F_{q,n-p_F-1}.
$$
完全モデルの残差平均平方を
$$
MSE_F=\frac{SSE_F}{n-p_F-1}
$$
と書けば、分子は「追加した $q$ 個の係数による残差平方和の減少を1自由度当たりに直した量」である。

$q=1$ で係数 $\beta_j$ だけを追加する場合、同じ帰無仮説 $H_0:\beta_j=0$ に対するt統計量は
$$
t=\frac{\widehat\beta_j}{\operatorname{SE}(\widehat\beta_j)}.
$$
1自由度の追加平方和は
$$
SSE_R-SSE_F
=\frac{\widehat\beta_j^2}{\{(X^\mathsf TX)^{-1}\}_{jj}},
$$
また
$$
\operatorname{SE}(\widehat\beta_j)^2
=MSE_F\{(X^\mathsf TX)^{-1}\}_{jj}.
$$

## 一手
**縮小モデルと完全モデルの残差平方和の差を、追加した自由度 $q$ で割って完全モデルの残差平均平方と比べる。** $q=1$ ならその比は同じ係数のt統計量の二乗になる。

## 答え
数値例では分母自由度は
$$
n-p_F-1=30-4-1=25.
$$
残差平方和の減少は
$$
SSE_R-SSE_F=100-70=30,
$$
その1自由度当たりは
$$
\frac{30}{2}=15.
$$
完全モデルの残差平均平方は
$$
\frac{70}{25}=2.8.
$$
よって
$$
F=\frac{15}{2.8}\approx5.36.
$$
$5.36>3.39$ なので、追加した2係数がともに0という帰無仮説を5%水準で棄却する。

$q=1$ なら
$$
F
=\frac{SSE_R-SSE_F}{MSE_F}
=\frac{\widehat\beta_j^2}
{MSE_F\{(X^\mathsf TX)^{-1}\}_{jj}}
=\left(
\frac{\widehat\beta_j}{\operatorname{SE}(\widehat\beta_j)}
\right)^2
=t^2.
$$

## 計算例
1係数の検定で $t=2.50$ なら
$$
F=t^2=2.50^2=6.25.
$$
したがって両側t検定と、分子自由度1の部分F検定は同じ帰無仮説に対して同じ棄却判断を与える。

一方、先の $q=2$ の例では $F\approx5.36$ は2係数の**同時検定**であり、どちらの係数が重要なのかをこの値だけから特定することはできない。

## 注意
縮小モデルと完全モデルが入れ子でない場合、この残差平方和差による部分F検定は使えない。$q>1$ の部分F検定は係数群の共同有意性を調べるものであり、個々の係数の有意性とは別である。$F=t^2$ がそのまま成り立つのは同じ1係数・同じ誤差分散推定に対する検定である。

<!-- CARD -->

---
id: reg-partial-f-numeric
title: 部分F検定を数値で完遂する
category: math-data-analysis
subcategory: math-regression
topic: partial-f-numeric
type: calc_step
difficulty: 3
priority: S
hashtags: [部分F検定, 重回帰, 棄却判断]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 回帰の分散分析 }]
---

## 問題
固定された列フルランクの計画行列の下で誤差が独立な正規分布に従い、共通分散を持つ重回帰を考える。標本サイズ $n=30$、完全モデルの切片以外の説明変数数 $p_F=4$、縮小モデルの残差平方和 $SSE_R=100$、完全モデルの残差平方和 $SSE_F=70$、追加変数数 $q=2$ である。5%臨界値 $F_{2,25,0.05}=3.39$ として判定せよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

分母自由度は完全モデルの $n-p_F-1=25$。

## 答え
$$F=\frac{(100-70)/2}{70/(30-4-1)}
=\frac{15}{2.8}\approx5.36.$$
$5.36>3.39$ なので、追加した2係数がともに0という帰無仮説を棄却する。

## 計算例
$$SSE_R-SSE_F=100-70=30,$$
$$\frac{SSE_R-SSE_F}{q}=\frac{30}{2}=15,$$
$$\frac{SSE_F}{n-p_F-1}=\frac{70}{25}=2.8.$$
したがって
$$F=15/2.8\approx5.36>3.39,$$
より、追加した2係数がともに0という帰無仮説を棄却する。

## 注意
どちらの追加係数が重要かは個別検定などで別に調べる。

<!-- CARD -->

---
id: reg-f-equals-t-squared
title: 1係数の部分Fとt二乗の一致を示す
category: math-data-analysis
subcategory: math-regression
topic: f-t-equivalence
type: calc_step
difficulty: 4
priority: A
hashtags: [F検定, t検定, 回帰係数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 回帰の分散分析 }]
---

## 問題
正規線形回帰モデルで追加係数が1個だけの部分F検定と、その係数の両側t検定の関係を書け。両検定は同じ完全モデルの誤差分散推定値と自由度を使うものとする。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

自由度1のカイ二乗と標準正規の二乗、対応するtとFの関係。

## 答え
1制約 $H_0:\beta_j=0$ では
$$F_{1,n-p-1}=T_{n-p-1}^2.$$
したがって
$$P(F\ge t_{\mathrm{obs}}^2)=P(|T|\ge|t_{\mathrm{obs}}|)$$
で、両検定のP値と結論は一致する。

## 計算例
$t=-2.5$ なら $F=6.25$。

## 注意
F検定だけでは係数の符号は分からない。

<!-- CARD -->

---
id: reg-multiple-correlation
title: 重相関係数を定義する
category: math-data-analysis
subcategory: math-regression
topic: multiple-correlation
type: formula
difficulty: 2
priority: A
hashtags: [重相関係数, 決定係数, 当てはめ値]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 重相関係数 }]
---

## 問題
重相関係数 $R$ を観測値と当てはめ値の相関で定義し、決定係数との関係を書け。

## 記号・用語
- SSR：回帰平方和（regression sum of squares）
- SST：全平方和（total sum of squares）

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

残差と当てはめ値の直交性により $\operatorname{Cov}(Y,\widehat Y)=\operatorname{Var}(\widehat Y)$。

## 答え
切片を含む最小二乗法で
$$R=\operatorname{Corr}(Y,\widehat Y)\ge0,\qquad R^2=\frac{SSR}{SST}.$$

## 計算例
$R^2=0.64$ なら重相関係数は $R=0.8$。

## 注意
単回帰の標本相関 $r$ と異なり、重相関係数は非負に定義する。

<!-- CARD -->

---
id: reg-dummy-variable
title: 2群差をダミー変数回帰で表す
category: math-data-analysis
subcategory: math-regression
topic: dummy-variable
type: calc_step
difficulty: 2
priority: A
hashtags: [ダミー変数, 群比較, 回帰係数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 線形重回帰 }]
---

## 問題
群Aを $D=0$、群Bを $D=1$ として $Y=\beta_0+\beta_1D+\varepsilon$ とする。各群平均を係数で表せ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

0–1ダミー変数の係数は基準群との差。

## 答え
$$E[Y\mid D=0]=\beta_0,$$
$$E[Y\mid D=1]=\beta_0+\beta_1.$$
したがって
$$\beta_1=\mu_B-\mu_A.$$

## 計算例
$\widehat\beta_0=10,\widehat\beta_1=3$ なら群平均はA:10、B:13。

## 注意
基準群を変えると係数表示は変わるが当てはめ値は変わらない。

<!-- CARD -->

---
id: reg-interaction-dummy-continuous
title: 群と連続変数の交互作用を解釈する
category: math-data-analysis
subcategory: math-regression
topic: regression-interaction
type: formula
difficulty: 3
priority: S
hashtags: [交互作用, ダミー変数, 傾き]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 線形重回帰 }]
---

## 問題
$Y=\beta_0+\beta_1X+\beta_2D+\beta_3XD+\varepsilon$ で、$D=0,1$ の回帰直線を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

積項の係数が効果修飾を表す。

## 答え
$D=0$ では
$$E[Y\mid X,D=0]=\beta_0+\beta_1X.$$
$D=1$ では
$$E[Y\mid X,D=1]=(\beta_0+\beta_2)+(\beta_1+\beta_3)X.$$
したがって $\beta_2$ は $X=0$ での切片差、$\beta_3$ は傾き差。

## 計算例
$\beta_1=2,\beta_3=-0.5$ ならD=1群の傾きは1.5。

## 注意
$X$ を中心化すると $\beta_2$ を代表的なXでの群差として解釈しやすい。

<!-- CARD -->

---
id: reg-polynomial-turning-point
title: 二次回帰の頂点を計算する
category: math-data-analysis
subcategory: math-regression
topic: polynomial-regression
type: calc_step
difficulty: 3
priority: A
hashtags: [二次回帰, 変数変換, 頂点]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 変数変換 }]
---

## 問題
$E[Y\mid X]=\beta_0+\beta_1X+\beta_2X^2$ の頂点を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

二次関数の停留点と二階微分 $2\beta_2$。

## 答え
Xで微分して
$$\frac{d}{dX}E[Y\mid X]=\beta_1+2\beta_2X=0$$
より
$$X^*=-\frac{\beta_1}{2\beta_2}.$$
$\beta_2<0$ なら最大、$\beta_2>0$ なら最小。

## 計算例
$\beta_1=4,\beta_2=-1$ なら最大点は $X^*=2$。

## 注意
$X^*$ が観測範囲外なら実質的解釈を避ける。

<!-- CARD -->

---
id: reg-log-response-interpretation
title: 対数応答回帰の係数を比率で解釈する
category: math-data-analysis
subcategory: math-regression
topic: log-response
type: calc_step
difficulty: 3
priority: A
hashtags: [対数変換, 回帰係数, 乗法効果]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 変数変換 }]
---

## 問題
$\log Y=\beta_0+\beta_1X+\varepsilon$ で、誤差分布がXによらず中央値0である。Xが1増えたときの条件付き中央値の比を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$\log a-log b=\log(a/b)$。

## 答え
条件付き中央値は $\operatorname{Med}(Y\mid X)=\exp(\beta_0+\beta_1X)$ だから
$$\frac{\operatorname{Med}(Y\mid X+1)}{\operatorname{Med}(Y\mid X)}=e^{\beta_1}.$$
したがって百分率変化は
$$100(e^{\beta_1}-1)\%.$$

## 計算例
$\beta_1=0.10$ なら約 $100(e^{0.1}-1)=10.5\%$ 増。

## 注意
誤差分布がXによらず $E[e^\varepsilon]<\infty$ なら条件付き平均の比も $e^{\beta_1}$ だが、平均値そのものの再変換には $E[e^\varepsilon]$ が掛かる。

<!-- CARD -->

---
id: reg-multicollinearity-vif
title: VIFから多重共線性を判定する
category: math-data-analysis
subcategory: math-regression
topic: vif
type: formula
difficulty: 3
priority: A
hashtags: [多重共線性, VIF, 回帰係数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 線形重回帰 }]
---

## 問題
説明変数 $X_j$ を他の説明変数で回帰した決定係数を $R_j^2$ とする。VIFを定義せよ。

## 記号・用語
- VIF：分散拡大係数（variance inflation factor）

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$R_j^2$ が1へ近づくほど $X_j$ の独自変動が少なくなる。

## 答え
$$\operatorname{VIF}_j=\frac1{1-R_j^2}.$$
これは他の説明変数との相関により $\widehat\beta_j$ の分散が何倍に膨らむかを表す。

## 計算例
$R_j^2=0.8$ ならVIFは5。

## 注意
VIFが大きくても予測性能が必ず悪いとは限らないが、個別係数は不安定になる。

<!-- CARD -->

---
id: reg-omitted-variable-bias
title: 欠落変数バイアスの符号を求める
category: math-data-analysis
subcategory: math-regression
topic: omitted-variable-bias
type: calc_step
difficulty: 4
priority: A
hashtags: [欠落変数バイアス, 重回帰, 因果解釈]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 線形重回帰 }]
---

## 問題
真のモデル $Y=\beta_0+\beta_1X+\beta_2Z+\varepsilon$ で $E[\varepsilon\mid X,Z]=0$ とする。Zを除いてYをXだけへ回帰した傾きの確率極限を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

有限二次モーメントと $\operatorname{Var}(X)>0$ の下で、単回帰傾きの確率極限は $\operatorname{Cov}(X,Y)/\operatorname{Var}(X)$。

## 答え
$$\operatorname{plim}\widetilde\beta_1
=\beta_1+\beta_2\frac{\operatorname{Cov}(X,Z)}{\operatorname{Var}(X)}.$$
したがってバイアスの符号は $\beta_2$ と $\operatorname{Cov}(X,Z)$ の符号の積で決まる。

## 計算例
$\beta_2>0$ かつXとZが正相関なら上方バイアス。

## 注意
ZがYに影響しないかXと無相関なら、この形の欠落バイアスは0。

<!-- CARD -->

---
id: reg-heteroskedasticity-pattern
title: 残差図から不均一分散を見抜く
category: math-data-analysis
subcategory: math-regression
topic: heteroskedasticity
type: recognition
difficulty: 2
priority: A
hashtags: [不均一分散, 残差診断, 標準誤差]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 残差 }]
---

## 問題
残差対当てはめ値図が右へ行くほど扇状に広がる。何が疑われ、最小二乗法推定へどう影響するか。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

ガウス・マルコフの定理の等分散条件。

## 答え
$\operatorname{Var}(\varepsilon_i\mid X_i)$ が一定でない不均一分散が疑われる。$E[\varepsilon\mid X]=0$ なら最小二乗法係数は不偏であり得るが、通常の
$$\widehat{\operatorname{Var}}(\widehat\beta)=MS_E(X^{\mathsf T}X)^{-1}$$
は不適切になり、t・F推測が崩れる。

## 計算例
対数変換、重み付き最小二乗、ロバスト標準誤差が候補。

## 注意
係数の不偏性と通常標準誤差の正しさを分けて考える。

<!-- CARD -->

---
id: reg-gauss-markov-theorem
title: ガウス・マルコフの定理の条件と結論を述べる
category: math-data-analysis
subcategory: math-regression
topic: gauss-markov
type: formula
difficulty: 3
priority: A
hashtags: [ガウス・マルコフの定理, BLUE, 最小二乗推定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ガウス・マルコフの定理 }]
---

## 問題
ガウス・マルコフの定理の仮定と、BLUE（最良線形不偏推定量）という結論を述べよ。

## 記号・用語
- BLUE：最良線形不偏推定量

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

任意の線形不偏推定量を $\widetilde\beta=\widehat\beta+CY$ と表すと、$CX=0$ かつ
$$\operatorname{Var}(\widetilde\beta)-\operatorname{Var}(\widehat\beta)=\sigma^2CC^{\mathsf T}\succeq0.$$

## 答え
$X$ が列フルランクで
$$Y=X\beta+\varepsilon,\qquad E[\varepsilon\mid X]=0,\qquad
\operatorname{Var}(\varepsilon\mid X)=\sigma^2I$$
なら、最小二乗推定量 $\widehat\beta$ は線形不偏推定量の中で分散共分散行列が最小、すなわちBLUEである。

## 計算例
ある線形不偏推定量 $\widetilde{\boldsymbol\beta}$ について
$$\operatorname{Var}(\widehat{\boldsymbol\beta})
=\begin{pmatrix}1&0\\0&2\end{pmatrix},
\quad
\operatorname{Var}(\widetilde{\boldsymbol\beta})
=\begin{pmatrix}2&0\\0&5\end{pmatrix}$$
なら、差は
$$\begin{pmatrix}1&0\\0&3\end{pmatrix}\succeq0.$$
したがって各方向で最小二乗推定量の分散が小さい。なお正規性はBLUEの結論には不要で、正確なt・F推測に必要である。

## 注意
不均一分散や相関誤差では通常の最小二乗法がBLUEとは限らない。

<!-- CARD -->

---
id: reg-cooks-distance
title: Cookの距離から影響点を評価する
category: math-data-analysis
subcategory: math-regression
topic: cooks-distance
type: formula
difficulty: 3
priority: A
hashtags: [Cookの距離, 影響点, 残差]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 残差 }]
---

## 問題
切片以外の説明変数数を $p$、切片を含む回帰係数数を $k=p+1$ とする。内部標準化残差とレバレッジを使ったCookの距離の代表式を書け。

## 記号・用語
- レバレッジ：説明変数空間での観測の位置を表すハット行列の対角要素

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

観測iを除いたときの全当てはめ値の変化を尺度化した量。

## 答え
内部標準化残差 $r_i$ とレバレッジ $h_{ii}$ を使うと
$$D_i=\frac{r_i^2}{k}\frac{h_{ii}}{1-h_{ii}}.$$
大きな残差と高いレバレッジを同時に持つ点で大きくなる。

## 計算例
$r_i=2,k=4,h_{ii}=0.5$ なら $D_i=(4/4)(0.5/0.5)=1$。

## 注意
機械的な閾値だけで削除せず、入力誤りや科学的理由を調べる。

<!-- CARD -->

---
id: reg-regression-to-mean
title: 平均への回帰を条件付き期待値で説明する
category: math-data-analysis
subcategory: math-regression
topic: regression-to-mean
type: calc_step
difficulty: 3
priority: A
hashtags: [平均への回帰, 2変量正規分布, 相関]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 平均への回帰（回帰効果） }]
---

## 問題
標準化された2変量正規変数 $(X,Y)$ の相関が $0<\rho<1$ のとき、平均への回帰を式で示せ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

2変量正規分布の条件付き平均：$E[Y\mid X=x]=\mu_Y+\rho(\sigma_Y/\sigma_X)(x-\mu_X)$。

## 答え
$$E[Y\mid X=x]=\rho x.$$
$x>0$ なら
$$0<\rho x<x,$$
なので、Xが平均から極端に大きくてもYの条件付き平均は0へ近い。

## 計算例
$\rho=0.6,x=2$ なら次の測定の条件付き平均は1.2。

## 注意
自然な統計現象であり、介入効果の証拠ではない。

<!-- CARD -->

---
id: reg-model-diagnostics-summary
title: 回帰診断を問題の型から選ぶ
category: math-data-analysis
subcategory: math-regression
topic: diagnostics-summary
type: recognition
difficulty: 2
priority: A
hashtags: [回帰診断, 残差, 影響点]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 残差 }]
---

## 問題
残差対当てはめ値図の (a) 曲線パターン、(b) 扇形、および観測残差の分位点と正規分布の理論分位点を比べる正規Q–Q図の (c) 強い曲がり、さらに (d) 高レバレッジかつ大残差、が示唆する問題を答えよ。

## 記号・用語
- レバレッジ：説明変数空間での観測の位置を表すハット行列の対角要素

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

残差対当てはめ値、正規Q–Q図、レバレッジ、Cookの距離を目的別に使う。

## 答え
(a) 平均構造の非線形性・項の欠落、(b) 不均一分散、(c) 誤差の非正規性・外れ値、(d) 影響点。

## 計算例
(a) 曲線なら平均構造の非線形性を疑い二次項を検討する。
(b) 扇形なら不均一分散を疑い変換・重み付け・ロバスト標準誤差を検討する。
(c) Q–Q図の強い曲がりなら非正規性や外れ値を確認する。
(d) 高レバレッジかつ大残差ならCookの距離などで影響度を調べる。

## 注意
診断結果は原因候補であり、設計・測定過程も確認する。

<!-- CARD -->

---
id: reg-slope-geometric-projection
title: 単回帰係数を直交射影として解釈する
category: math-data-analysis
subcategory: math-regression
topic: slope-geometric-projection
type: calc_step
difficulty: 3
priority: S
hashtags: [回帰係数, 直交射影, 幾何学的解釈]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 回帰係数の幾何学的解釈 }]
---

## 問題
中心化ベクトル $\boldsymbol x_c=(x_i-\overline x)_i$、$\boldsymbol y_c=(Y_i-\overline Y)_i$ を使い、単回帰傾きを射影係数として表せ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

ベクトル $\boldsymbol y$ の非零ベクトル $\boldsymbol x$ 方向への直交射影係数は $(\boldsymbol x^{\mathsf T}\boldsymbol y)/(\boldsymbol x^{\mathsf T}\boldsymbol x)$。

## 答え
$\boldsymbol y_c$ を $\boldsymbol x_c$ が張る直線へ射影すると
$$\widehat{\boldsymbol y}_c=\widehat\beta_1\boldsymbol x_c.$$
残差 $\boldsymbol e=\boldsymbol y_c-\widehat\beta_1\boldsymbol x_c$ が $\boldsymbol x_c$ と直交する条件
$$\boldsymbol x_c^{\mathsf T}\boldsymbol e=0$$
を解けば
$$\widehat\beta_1=
\frac{\boldsymbol x_c^{\mathsf T}\boldsymbol y_c}
{\boldsymbol x_c^{\mathsf T}\boldsymbol x_c}=\frac{S_{xy}}{S_{xx}}.$$

## 計算例
$\boldsymbol x_c=(-1,0,1)$、$\boldsymbol y_c=(-2,0,2)$ なら係数は $4/2=2$、残差は0。

## 注意
切片を含む単回帰なので、両ベクトルを中心化してから射影する。
