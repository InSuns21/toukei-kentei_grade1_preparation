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
title: 一元配置の対比を定義し標準誤差・t検定まで計算する
category: math-data-analysis
subcategory: math-anova
topic: anova-contrast-canonical
type: formula
difficulty: 2
priority: A
hashtags:
  - 一元配置分散分析
  - 対比
  - 標準誤差
  - t検定
  - 計画比較
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
一元配置分散分析で母平均を $\mu_1,\ldots,\mu_a$ とする。

1. 線形結合 $L=\sum_{i=1}^a c_i\mu_i$ が対比である条件と、その意味を説明せよ。
2. 独立な群平均から作る推定量 $\widehat L=\sum_i c_i\bar Y_{i\cdot}$ の分散と標準誤差を書け。
3. 3群に各5個の観測があり、群平均が $(10,13,15)$、誤差平均平方が $MS_E=4$ だった。対比
$$
L=\mu_1-\frac{\mu_2+\mu_3}{2}
$$
について $H_0:L=0$ を両側5%で検定し、95%信頼区間も求めよ。誤差自由度12のt分布の両側5%臨界値を2.179とする。

## 使用公式・定理
対比の係数は
$$
\sum_{i=1}^a c_i=0
$$
を満たす。これは全ての母平均へ同じ定数 $d$ を加えても
$$
\sum_i c_i(\mu_i+d)=\sum_i c_i\mu_i+d\sum_i c_i=L
$$
となり、共通水準ではなく群間差だけを測ることを意味する。

独立な群平均について
$$
\operatorname{Var}(\bar Y_{i\cdot})=\frac{\sigma^2}{n_i}
$$
なので
$$
\operatorname{Var}(\widehat L)=\sigma^2\sum_i\frac{c_i^2}{n_i}.
$$
$\sigma^2$ を分散分析の誤差平均平方 $MS_E$ で推定すれば
$$
\operatorname{SE}(\widehat L)=\sqrt{MS_E\sum_i\frac{c_i^2}{n_i}}.
$$
帰無仮説 $H_0:L=L_0$ に対して
$$
t=\frac{\widehat L-L_0}{\operatorname{SE}(\widehat L)}
$$
を使い、自由度は分散分析の誤差自由度 $N-a$ である。

## 一手
**係数和0を確認→群平均から対比値を計算→係数二乗を各群サイズで割って標準誤差→t標準化。** 定義・標準誤差・検定を別々に暗記せず、この順で一続きに処理する。

## 答え
数値例の係数は
$$
(c_1,c_2,c_3)=\left(1,-\frac12,-\frac12\right)
$$
であり
$$
1-\frac12-\frac12=0
$$
だから対比である。

推定値は
$$
\widehat L=10-\frac{13+15}{2}=10-14=-4.
$$
標準誤差は
$$
\begin{aligned}
\operatorname{SE}(\widehat L)
&=\sqrt{4\left(\frac{1^2}{5}+\frac{(1/2)^2}{5}+\frac{(1/2)^2}{5}\right)}\\
&=\sqrt{4(0.20+0.05+0.05)}\\
&=\sqrt{1.2}\\
&\approx1.095.
\end{aligned}
$$
よって
$$
t=\frac{-4}{1.095}\approx-3.65.
$$
$|t|=3.65>2.179$ なので5%水準で $H_0:L=0$ を棄却する。

## 計算例
95%信頼区間は
$$
\widehat L\pm2.179\operatorname{SE}(\widehat L)
$$
だから
$$
-4\pm2.179\times1.095\approx-4\pm2.386.
$$
したがって
$$
(-6.386,\,-1.614).
$$
0を含まないため、同じ両側5%検定の棄却結果と一致する。

例えば単純な2群差 $L=\mu_1-\mu_2$ なら係数は $(1,-1)$ で、
$$
\operatorname{SE}(\widehat L)=\sqrt{MS_E\left(\frac1{n_1}+\frac1{n_2}\right)}
$$
となり、共通分散の2群比較の形がそのまま出る。

## 注意
係数和が0でない単なる線形結合は対比ではない。複数の対比をデータを見てから大量に検定すると第1種過誤率が膨らむため、事前に定めた計画対比か、必要に応じて多重比較の補正を用いる。ここでのt分布による正確な有限標本推測は、独立・正規・等分散の一元配置モデルを前提とする。

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
title: テューキー法で同時比較幅を作り有意な群対を判定する
category: math-data-analysis
subcategory: math-anova
topic: tukey-hsd-canonical
type: formula
difficulty: 3
priority: A
hashtags:
  - テューキー法
  - 多重比較
  - Student化範囲分布
  - Tukey-Kramer
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 多重比較
---

## 問題
各観測が独立な正規分布に従い、全群で分散が共通である一元配置を考える。$a$ 群の各標本サイズが共通に $n$、誤差平均平方が $MS_E$、Student化範囲分布の上側臨界値が $q_{a,N-a,\alpha}$ である。

1. テューキーHSD法で群 $i,j$ の平均差を有意とする条件を書け。
2. 3群の標本平均が $(10,13,16)$、$MS_E=4$、各群 $n=4$、臨界値 $q=3.5$ のとき、有意な群対を全て求めよ。
3. 群サイズが等しくない場合のTukey-Kramer法の比較幅も書け。

## 使用公式・定理
テューキー法は、全ての群対比較を同時に行うときの家族内第一種過誤率を $\alpha$ 以下に制御する方法である。

等群サイズ $n$ では比較幅
$$
\mathrm{HSD}=q_{a,N-a,\alpha}\sqrt{\frac{MS_E}{n}}
$$
を作り、
$$
|\bar Y_{i\cdot}-\bar Y_{j\cdot}|>\mathrm{HSD}
$$
なら群 $i,j$ の母平均差を有意とする。

不等群サイズ $n_i,n_j$ ではTukey-Kramer法として
$$
|\bar Y_{i\cdot}-\bar Y_{j\cdot}|
>q_{a,N-a,\alpha}
\sqrt{\frac{MS_E}{2}\left(\frac1{n_i}+\frac1{n_j}\right)}
$$
を用いる。$n_i=n_j=n$ と置けば右辺はHSDへ戻る。

## 一手
**まずStudent化範囲分布の臨界値から「共通の比較幅」を1個作り、その幅と全ての標本平均差を比較する。** 群対ごとに別々の無補正t検定を繰り返さない。

## 答え
等群サイズでは
$$
\mathrm{HSD}=q\sqrt{\frac{MS_E}{n}}
$$
である。数値を代入すると
$$
\mathrm{HSD}
=3.5\sqrt{\frac44}
=3.5.
$$

3つの群対の絶対平均差は
$$
|10-13|=3,
$$
$$
|10-16|=6,
$$
$$
|13-16|=3.
$$
したがって
$$
6>3.5
$$
となる群1–群3だけが有意で、他の2群対は有意でない。

## 計算例
比較幅そのものの意味も数値で確認する。例えば $q=4,MS_E=9,n=9$ なら
$$
\mathrm{HSD}=4\sqrt{\frac99}=4.
$$
よって平均差5は有意、平均差3は有意でない。

また不等群サイズの例として $MS_E=4,q=3.5,n_i=4,n_j=9$ ならTukey-Kramerの比較幅は
$$
\begin{aligned}
3.5\sqrt{\frac42\left(\frac14+\frac19\right)}
&=3.5\sqrt{2\cdot\frac{13}{36}}\\
&=3.5\sqrt{\frac{13}{18}}\\
&\approx2.974.
\end{aligned}
$$
この群対では標本平均差が3なら $3>2.974$ なので有意となる。

## 注意
テューキー法が直接対象とするのは全ての群対比較であり、任意の対比全体を同時に扱うシェッフェ法とは目的が異なる。正確な有限標本手順では、一元配置モデルの独立性・正規性・等分散性を前提とする。境界と等しい場合は採用している棄却域の不等号規約に従う。

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
交互作用が有意なら、AやBの主効果だけを一律に解釈せず、単純主効果やセル平均の構造を確認する。

**反復なし $n=1$ は別扱いである。** このとき
$$
\nu_E=ab(n-1)=0
$$
となり、同じ処理組合せ内の繰返しから純粋誤差を推定できない。したがって交互作用と偶然誤差をデータだけから別々に識別できず、交互作用を独立に検定できない。主効果の検定を行うには、典型的には「交互作用なし」という加法モデルを追加仮定し、交互作用に相当する残差成分を誤差として扱う必要がある。この仮定自体は反復なしデータから検証できない。

例えば $2\times3$ の反復なし配置では全自由度は
$$
2\cdot3-1=5.
$$
Aに1、Bに2を使うと残りは2だが、この2自由度には交互作用 $(2-1)(3-1)=2$ と誤差を分離して割り当てられない。

また不均衡配置では平方和の型や投入順序にも注意する。ここで示した単純な平方和分解とF比は釣合い配置を前提としている。

<!-- CARD -->

---
id: anova-interaction-definition
title: 2×2交互作用を差の差で定義し検定・解釈まで通す
category: math-data-analysis
subcategory: math-anova
topic: interaction-canonical
type: formula
difficulty: 2
priority: S
hashtags:
  - 交互作用
  - 差の差
  - 二元配置分散分析
  - t検定
  - 単純主効果
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 交互作用
---

## 問題
因子AとBが各2水準の二元配置を考える。セル母平均を $\mu_{ij}$ とする。

1. A×B交互作用を「差の差」の対比で表し、0であることの意味を説明せよ。
2. 各セルに $n$ 個の独立な観測があり、誤差は正規分布に従い共通分散 $\sigma^2$ を持つとする。交互作用対比推定量の分散と、$MS_E$ を使った標準誤差を書け。
3. 各セル5反復、セル平均が
$$
\begin{pmatrix}10&12\\14&20\end{pmatrix},
$$
$MS_E=5$ のとき、交互作用なしを両側5%で検定せよ。誤差自由度16のt分布の両側臨界値を2.120とする。
4. 交互作用が有意だった場合、主効果をどう解釈するか述べよ。

## 使用公式・定理
2×2の交互作用は
$$
\Delta_{AB}
=(\mu_{22}-\mu_{12})-(\mu_{21}-\mu_{11})
=\mu_{11}-\mu_{12}-\mu_{21}+\mu_{22}
$$
で表せる。$\Delta_{AB}=0$ なら、Aの効果はBの水準によらず同じで、平均構造は加法的である。

各セル平均が独立で
$$
\operatorname{Var}(\bar Y_{ij})=\frac{\sigma^2}{n}
$$
なら、係数が $(1,-1,-1,1)$ なので
$$
\operatorname{Var}(\widehat\Delta_{AB})
=\frac{4\sigma^2}{n}.
$$
よって
$$
\operatorname{SE}(\widehat\Delta_{AB})
=2\sqrt{\frac{MS_E}{n}}.
$$
交互作用なし $H_0:\Delta_{AB}=0$ に対して
$$
t=\frac{\widehat\Delta_{AB}}{\operatorname{SE}(\widehat\Delta_{AB})}
$$
を使う。2×2交互作用の自由度は1なので、同じ仮説をF検定すれば
$$
F=t^2.
$$

## 一手
**まずセル平均表から「縦差を2本」または「横差を2本」作り、その差をもう一度取る。** これが交互作用対比であり、その後に標準誤差で割って検定する。有意なら平均した主効果だけで終わらず単純主効果を見る。

## 答え
数値例では
$$
\widehat\Delta_{AB}
=10-12-14+20
=4.
$$
同じ値は
$$
(20-12)-(14-10)=8-4=4
$$
と差の差からも得られる。

標準誤差は
$$
\begin{aligned}
\operatorname{SE}(\widehat\Delta_{AB})
&=2\sqrt{\frac55}\\
&=2.
\end{aligned}
$$
したがって
$$
t=\frac42=2.
$$
$|t|=2<2.120$ なので、5%水準では交互作用なしを棄却しない。自由度1の交互作用なので
$$
F=t^2=4
$$
と書いても同じ仮説を検定している。

## 計算例
交互作用が解釈を変える例として、B=1でAの平均差が0、B=2でAの平均差が10だったとする。このときAの平均主効果を5とだけ報告すると、Bの水準による効果差を隠してしまう。

交互作用が有意なら、例えばBの各水準 $j$ を固定して
$$
H_0:\mu_{1j}=\mu_{2j}
$$
というAの単純主効果を調べる。逆にAを固定してBの単純主効果を調べてもよい。複数の単純主効果を検定するときは多重性にも配慮する。

## 注意
交互作用は「線が交差すること」そのものではない。プロファイルが平行でなければ、交差していなくても交互作用はある。交互作用が有意なときは全水準で平均した主効果を一律に解釈しない。ここでの正確なt/F検定は独立・正規・等分散の二元配置モデルを前提とする。

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
title: 共分散分析を平行回帰確認から調整平均まで通す
category: math-data-analysis
subcategory: math-anova
topic: ancova-canonical
type: formula
difficulty: 3
priority: A
hashtags:
  - 共分散分析
  - 共変量
  - 平行回帰
  - 調整平均
  - 部分F検定
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 共分散分析
---

## 問題
処理群を $i=1,\ldots,a$、群内個体を $j$、処理前に測定した連続共変量を $X_{ij}$、応答を $Y_{ij}$ とする共分散分析を考える。

1. 群間で共通の共変量傾きを持つモデルを書け。
2. 共通傾きを仮定してよいかを、群×共変量交互作用を加えたモデルと部分F検定でどう調べるか説明せよ。
3. 3群、総標本数30で、共通傾きモデルの残差平方和が $SSE_R=120$、群×共変量交互作用を2個加えた完全モデルの残差平方和が $SSE_F=100$、完全モデルの誤差自由度が24だった。5%上側臨界値を $F_{2,24}=3.40$ として平行回帰仮定を検討せよ。
4. 群1の $(\bar X_1,\bar Y_1)=(8,15)$、群2の $(\bar X_2,\bar Y_2)=(12,18)$、全体共変量平均が $\bar X=10$、共通傾き推定値が $\widehat\beta=0.5$ のとき、全体平均 $X=10$ へ調整した2群の平均を求めよ。

## 使用公式・定理
共変量を全体平均で中心化した共通傾きモデルは
$$
Y_{ij}=\mu+\alpha_i+\beta(X_{ij}-\bar X_{\cdot\cdot})+\varepsilon_{ij},
$$
$$
\sum_i n_i\alpha_i=0,
\qquad
\varepsilon_{ij}\overset{\mathrm{iid}}\sim N(0,\sigma^2).
$$
このモデルでは、共変量の線形効果を差し引いた同じ $X$ 水準で群を比較する。

ただし共通傾きモデルを使う前に、群ごとの傾きが等しいか確認する。群1を基準群とすれば完全モデルを
$$
Y=\mu+\sum_{r=2}^a\alpha_r\mathbf1\{i=r\}
+\beta X
+\sum_{r=2}^a\gamma_r\mathbf1\{i=r\}X
+\varepsilon
$$
と書ける。ここで
$$
H_0:\gamma_2=\cdots=\gamma_a=0
$$
が平行回帰仮定である。

制約数を $q=a-1$、共通傾きの縮約モデルの残差平方和を $SSE_R$、交互作用を含む完全モデルを $SSE_F$、完全モデルの誤差自由度を $\nu_F$ とすると
$$
F=\frac{(SSE_R-SSE_F)/q}{SSE_F/\nu_F}
$$
を用いる。

平行回帰仮定を棄却しなければ、共通傾きモデルで群 $i$ の平均を共通の共変量水準 $\bar X$ へ移した調整平均は
$$
\bar Y_{i,\mathrm{adj}}
=\bar Y_i-\widehat\beta(\bar X_i-\bar X)
$$
である。

## 一手
**ANCOVAは「いきなり調整平均」ではなく、まず群×共変量交互作用で傾きの平行性を確認し、平行とみなせるなら共通傾きで同じ $X$ 水準へ群平均を移す。** 順序は「傾き確認→共通傾きモデル→調整平均」で固定する。

## 答え
数値例の平行回帰仮定では、追加した群×共変量交互作用は2個なので $q=2$。したがって
$$
\begin{aligned}
F
&=\frac{(120-100)/2}{100/24}\\
&=\frac{10}{25/6}\\
&=2.4.
\end{aligned}
$$
$2.4<3.40$ なので5%水準では平行回帰仮定を棄却しない。よって、この例では共通傾きモデルへ簡約して調整平均を比較できる。

調整平均は群1で
$$
\begin{aligned}
\bar Y_{1,\mathrm{adj}}
&=15-0.5(8-10)\\
&=15+1\\
&=16,
\end{aligned}
$$
群2で
$$
\begin{aligned}
\bar Y_{2,\mathrm{adj}}
&=18-0.5(12-10)\\
&=18-1\\
&=17.
\end{aligned}
$$
未調整の群平均差は
$$
18-15=3
$$
だが、共変量を $X=10$ にそろえた調整後の差は
$$
17-16=1
$$
となる。

## 計算例
共通傾きモデルの意味を直接確認する。例えば
$$
\mu=10,
\qquad
(\alpha_1,\alpha_2)=(-1,1),
\qquad
\beta=0.5,
\qquad
\bar X=10
$$
とする。群1で $X=8$ なら
$$
E[Y\mid i=1,X=8]
=10-1+0.5(8-10)=8,
$$
群2で $X=12$ なら
$$
E[Y\mid i=2,X=12]
=10+1+0.5(12-10)=12.
$$
しかし両群を同じ $X=10$ で比較すると条件付き平均はそれぞれ9と11になる。ANCOVAが比較したいのは、このように共変量水準をそろえた群差である。

## 注意
群×共変量交互作用が有意なら、群差は $X$ の水準によって変わるため、単一の「調整平均差」で全域を代表させない。共変量は原則として処理割付け前に測定された変数を用い、処理後変数を機械的に調整しない。正確な有限標本のF検定では線形性・独立性・正規性・等分散性も前提となる。

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
切片を含む単回帰で $x=x_0$ とすると
$$
h_0=\frac1n+\frac{(x_0-\bar x)^2}{S_{xx}}.
$$
平均応答 $E[Y\mid x_0]$ の推定標準誤差は
$$
s\sqrt{h_0},
$$
新しい1観測の予測標準誤差は
$$
s\sqrt{1+h_0}.
$$
したがって、両側 $100(1-\alpha)\%$ 区間はそれぞれ
$$
\widehat y_0\pm t_{n-2,\alpha/2}s\sqrt{h_0},
$$
$$
\widehat y_0\pm t_{n-2,\alpha/2}s\sqrt{1+h_0}.
$$

同じ結果は重回帰でも行列表記でそのまま成り立つ。切片成分を含む新しい説明変数ベクトルを $\boldsymbol x_0$、計画行列を $X$ とすると
$$
h_0=\boldsymbol x_0^{\mathsf T}(X^{\mathsf T}X)^{-1}\boldsymbol x_0.
$$
よって平均応答の標準誤差は
$$
s\sqrt{\boldsymbol x_0^{\mathsf T}(X^{\mathsf T}X)^{-1}\boldsymbol x_0},
$$
新規1観測の予測標準誤差は
$$
s\sqrt{1+\boldsymbol x_0^{\mathsf T}(X^{\mathsf T}X)^{-1}\boldsymbol x_0}.
$$
予測区間だけ先頭に1が付くのは、新しい観測自身の誤差分散 $\sigma^2$ が追加されるためである。

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
平均応答の信頼区間と新規1観測の予測区間を混同しない。前者は同じ条件での平均を推測し、後者は新しい個体のばらつきまで含むため広い。

単回帰の $h_0=1/n+(x_0-\bar x)^2/S_{xx}$ は、重回帰の $\boldsymbol x_0^{\mathsf T}(X^{\mathsf T}X)^{-1}\boldsymbol x_0$ の特殊形である。観測された説明変数範囲から大きく外れた外挿では、数式上区間を作れても線形モデル自体の妥当性が弱い。

<!-- CARD -->

---
id: reg-multiple-model-matrix
title: 重回帰を計画行列で表し最小二乗推定量・共分散・BLUE性まで導く
category: math-data-analysis
subcategory: math-regression
topic: multiple-regression-design-matrix-canonical
type: strategy
difficulty: 3
priority: S
hashtags:
  - 重回帰
  - 計画行列
  - 最小二乗法
  - 交互作用
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
と表す。$X$ は固定された計画行列とする。

1. $X$ が列フルランクのとき、残差平方和を最小化して最小二乗推定量を導け。
2. $E[\boldsymbol\varepsilon]=\mathbf0$、$\operatorname{Var}(\boldsymbol\varepsilon)=\sigma^2I$ の下で、不偏性と共分散行列を導け。
3. Gauss--Markov定理の主要条件を列挙し、最小二乗推定量が最良線形不偏推定量（BLUE）であることを示せ。誤差の正規性が必要かも答えよ。
4. $X=\begin{pmatrix}1&0\\1&1\\1&2\end{pmatrix}$、$\mathbf y=(1,3,5)^\mathsf T$ で係数を計算せよ。
5. 平均構造
$$
E[Y]=\beta_0+\beta_1x+\beta_2D+\beta_3xD
$$
に対し、観測 $(x,D)=(2,0),(3,1)$ の2件から計画行列を作れ。係数ベクトルの列順は $(\beta_0,\beta_1,\beta_2,\beta_3)$ とする。

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

Gauss--Markov定理の基本条件は、固定された $X\in\mathbb R^{n\times p}$ について
$$
\mathbf y=X\boldsymbol\beta+\boldsymbol\varepsilon,
\qquad E[\boldsymbol\varepsilon]=\mathbf0,
$$
$$
\operatorname{Var}(\boldsymbol\varepsilon)=\sigma^2I_n,
\qquad \sigma^2>0,
$$
かつ $X$ が列フルランクであること。この条件の下で最小二乗推定量は、$\boldsymbol\beta$ の全ての線形不偏推定量の中で共分散行列が最小、すなわちBLUEである。

BLUE性そのものには誤差の正規性は不要である。正規性は有限標本での正確なt検定・F検定などを導くときに追加して使う。

BLUE性を示すには
$$
B=(X^\mathsf TX)^{-1}X^\mathsf T
$$
とおき、任意の線形不偏推定量を $C\mathbf y$ と書く。線形不偏性から
$$
CX=I_p.
$$
一方 $BX=I_p$ なので $D=C-B$ とおけば
$$
DX=0.
$$
このとき交差項が消え
$$
\operatorname{Var}(C\mathbf y)
-\operatorname{Var}(B\mathbf y)
=\sigma^2DD^\mathsf T
$$
となる。$DD^\mathsf T$ は半正定値だから、最小二乗推定量の共分散行列はLoewner順序で最小である。

計画行列は、各観測についてモデル式で各係数に掛かる値を係数ベクトルと同じ順に並べて1行ずつ作る。交互作用項があれば、その観測で積も実際に計算する。

## 一手／方針
**モデル式 → 正規方程式 → 誤差の線形変換 → 不偏性・共分散 → 他の線形不偏推定量との差、の順で読む。**

最小二乗推定量を
$$
\widehat{\boldsymbol\beta}=B\mathbf y,
\qquad
B=(X^\mathsf TX)^{-1}X^\mathsf T
$$
と置くと、不偏性は $BX=I$、BLUE性は任意の競合推定量 $C\mathbf y$ に対して $D=C-B$ と置き $DX=0$ を使うだけで整理できる。

計画行列を作る問題では、まずモデル式から「1観測分の行」を作る。係数ベクトルが $(\beta_0,\beta_1,\beta_2,\beta_3)$ なら、その観測で係数に掛かる $(1,x,D,xD)$ が計画行列の1行になる。

## 答え
最小二乗推定量は
$$
\boxed{
\widehat{\boldsymbol\beta}
=(X^\mathsf TX)^{-1}X^\mathsf T\mathbf y}.
$$
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
&=\boxed{\sigma^2(X^\mathsf TX)^{-1}}.
\end{aligned}
$$

Gauss--Markov定理では、任意の線形不偏推定量 $\widetilde{\boldsymbol\beta}=C\mathbf y$ に対し $CX=I$ である。$B=(X^\mathsf TX)^{-1}X^\mathsf T$、$D=C-B$ と置くと
$$
DX=CX-BX=I-I=0.
$$
よって
$$
BD^\mathsf T
=(X^\mathsf TX)^{-1}X^\mathsf TD^\mathsf T
=0
$$
であり、同様に $DB^\mathsf T=0$ である。したがって
$$
\begin{aligned}
\operatorname{Var}(\widetilde{\boldsymbol\beta})
&=\sigma^2CC^\mathsf T\\
&=\sigma^2(B+D)(B+D)^\mathsf T\\
&=\sigma^2BB^\mathsf T+\sigma^2DD^\mathsf T.
\end{aligned}
$$
つまり
$$
\operatorname{Var}(\widetilde{\boldsymbol\beta})
-\operatorname{Var}(\widehat{\boldsymbol\beta})
=\sigma^2DD^\mathsf T\succeq0.
$$
よって最小二乗推定量はBLUEである。ここまでに正規性は使っていない。

数値例では
$$
X^\mathsf TX=\begin{pmatrix}3&3\\3&5\end{pmatrix},
\qquad
X^\mathsf T\mathbf y=\begin{pmatrix}9\\13\end{pmatrix},
$$
$$
(X^\mathsf TX)^{-1}
=\frac16\begin{pmatrix}5&-3\\-3&3\end{pmatrix},
$$
したがって
$$
\boxed{
\widehat{\boldsymbol\beta}
=\begin{pmatrix}1\\2\end{pmatrix}}.
$$

交互作用モデルでは1行は $(1,x,D,xD)$ なので
$$
(x,D)=(2,0)\Rightarrow(1,2,0,0),
$$
$$
(x,D)=(3,1)\Rightarrow(1,3,1,3).
$$
よって
$$
\boxed{
X=\begin{pmatrix}
1&2&0&0\\
1&3&1&3
\end{pmatrix}}.
$$

## 計算例
最初の数値例では
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

BLUE性の意味を1方向の線形結合で見ると、任意のベクトル $a$ に対して
$$
\operatorname{Var}(a^\mathsf T\widetilde{\boldsymbol\beta})
-\operatorname{Var}(a^\mathsf T\widehat{\boldsymbol\beta})
=\sigma^2a^\mathsf TDD^\mathsf Ta
=\sigma^2\|D^\mathsf Ta\|^2\ge0.
$$
したがって「共分散行列が最小」とは、全ての線形対比方向で最小二乗推定量の分散が他の線形不偏推定量以下という意味である。

交互作用モデルでは $D=0$ なら
$$
E[Y]=\beta_0+\beta_1x,
$$
$D=1$ なら
$$
E[Y]=(\beta_0+\beta_2)+(\beta_1+\beta_3)x.
$$
計画行列を作る操作と群別回帰直線の解釈は同じモデル式を別方向から読んでいる。

## 注意
Gauss--Markov定理で必要なのは線形平均構造、平均0の誤差、共分散 $\sigma^2I$、計画行列の列フルランクであり、誤差の正規性ではない。「正規でないと最小二乗法はBLUEでない」は誤り。

一意な係数推定には $\operatorname{rank}(X)$ が列数に等しいことが必要。不均一分散や相関誤差では $\sigma^2(X^\mathsf TX)^{-1}$ は一般に正しくなく、通常のGauss--Markov条件も崩れる。その場合は一般化最小二乗法や頑健な共分散推定などを検討する。

実際の大規模数値計算では逆行列を明示的に作るよりQR分解などを用いる。計画行列では列順を係数ベクトルの順序と必ず対応させ、交互作用を入れる場合は通常、対応する主効果も残す。

<!-- CARD -->

---
id: reg-hat-matrix-properties
title: ハット行列からレバレッジ・残差分散・標準化残差まで導く
category: math-data-analysis
subcategory: math-regression
topic: regression-leverage-diagnostics-canonical
type: calc_step
difficulty: 4
priority: A
hashtags:
  - 回帰診断
  - ハット行列
  - レバレッジ
  - 残差分散
  - 標準化残差
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
列フルランクの線形回帰
$$
\mathbf y=X\boldsymbol\beta+\boldsymbol\varepsilon,
\qquad
E[\boldsymbol\varepsilon]=\mathbf0,
\qquad
\operatorname{Var}(\boldsymbol\varepsilon)=\sigma^2I
$$
を考える。切片を含み、$X$ の列数を $k$ とする。

1. ハット行列 $H$ を定義し、対称性・冪等性を示せ。
2. 対角要素 $h_{ii}$ がレバレッジであること、$\sum_i h_{ii}=k$ であることを示せ。
3. 残差 $\mathbf e$ の共分散行列と $\operatorname{Var}(e_i)$ を求め、標準化残差を書け。
4. $X=\begin{pmatrix}1&-1\\1&0\\1&1\end{pmatrix}$ で $H$ と各レバレッジを計算せよ。さらに残差が $(1,-2,1)^\mathsf T$、残差標準偏差が $s=2$ のとき標準化残差を求めよ。

## 記号・用語
- ハット行列：観測ベクトルを当てはめ値へ写す射影行列

## 使用公式・定理
最小二乗法の当てはめ値は
$$
\widehat{\mathbf y}=X\widehat{\boldsymbol\beta}
=X(X^\mathsf TX)^{-1}X^\mathsf T\mathbf y
=H\mathbf y,
$$
したがって
$$
H=X(X^\mathsf TX)^{-1}X^\mathsf T.
$$
$X^\mathsf TX$ は対称なので
$$
H^\mathsf T=H,
$$
また
$$
H^2
=X(X^\mathsf TX)^{-1}X^\mathsf TX(X^\mathsf TX)^{-1}X^\mathsf T
=H.
$$
よって $H$ は $\operatorname{col}(X)$ への直交射影行列である。

残差は
$$
\mathbf e=\mathbf y-\widehat{\mathbf y}=(I-H)\mathbf y.
$$
$I-H$ も対称かつ冪等なので
$$
\operatorname{Var}(\mathbf e)
=\sigma^2(I-H).
$$
したがって
$$
\operatorname{Var}(e_i)=\sigma^2(1-h_{ii}).
$$
$\sigma$ を残差標準偏差 $s$ で置き換えた標準化残差を
$$
r_i=\frac{e_i}{s\sqrt{1-h_{ii}}}
$$
とする。

## 一手
**回帰診断の出発点を全部 $H$ に戻す。** 当てはめは $H\mathbf y$、残差は $(I-H)\mathbf y$、レバレッジは $h_{ii}$、残差分散は $1-h_{ii}$ で決まる。

## 答え
ハット行列は対称・冪等で、その固有値は0または1である。列フルランクなら
$$
\operatorname{rank}(H)=k.
$$
対称冪等行列ではトレースはランクに等しいので
$$
\sum_{i=1}^n h_{ii}=\operatorname{tr}(H)=k.
$$
よって平均レバレッジは
$$
\frac1n\sum_i h_{ii}=\frac{k}{n}.
$$

数値例では
$$
X^\mathsf TX=\begin{pmatrix}3&0\\0&2\end{pmatrix},
\qquad
(X^\mathsf TX)^{-1}=\begin{pmatrix}1/3&0\\0&1/2\end{pmatrix}.
$$
したがって
$$
H=
\begin{pmatrix}
5/6&1/3&-1/6\\
1/3&1/3&1/3\\
-1/6&1/3&5/6
\end{pmatrix}.
$$
レバレッジは
$$
(h_{11},h_{22},h_{33})=\left(\frac56,\frac13,\frac56\right),
$$
その和は
$$
\frac56+\frac13+\frac56=2=k
$$
である。

## 計算例
残差 $(1,-2,1)^\mathsf T$、$s=2$ なら、1番目と3番目では
$$
s\sqrt{1-h_{ii}}
=2\sqrt{1-\frac56}
=2\sqrt{\frac16}
\approx0.8165,
$$
よって
$$
r_1=r_3\approx\frac1{0.8165}\approx1.225.
$$
2番目では
$$
s\sqrt{1-h_{22}}
=2\sqrt{\frac23}
\approx1.633,
$$
したがって
$$
r_2\approx\frac{-2}{1.633}\approx-1.225.
$$

生の残差は $(1,-2,1)$ と大きさが違うが、レバレッジによる分散差を補正すると絶対値は同程度になる。高レバレッジ点では
$$
\operatorname{Var}(e_i)=\sigma^2(1-h_{ii})
$$
が小さくなるため、生の残差だけを横並び比較しない。

## 注意
高レバレッジとは説明変数空間で特殊な位置にあることを意味し、それだけで影響点とは限らない。影響度は残差の大きさも合わせてCookの距離などで確認する。

切片を含み係数総数を $k$、標本数を $n$ とすると平均レバレッジは $k/n$ である。探索的な目安として
$$
h_{ii}>\frac{2k}{n}
$$
を高レバレッジ候補とすることがある。例えば $n=20,k=4$ なら目安は $0.40$ なので、$h_{ii}=0.55$ は要確認となる。ただしこれは絶対的な検定基準ではない。

ここでの $r_i=e_i/(s\sqrt{1-h_{ii}})$ は通常の内部標準化残差であり、観測 $i$ を除いて分散を再推定する外部スチューデント化残差とは区別する。

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
title: ダミー変数で群差を表し基準カテゴリを変更する
category: math-data-analysis
subcategory: math-regression
topic: dummy-variable-reference-canonical
type: calc_step
difficulty: 2
priority: A
hashtags:
  - ダミー変数
  - 群比較
  - 回帰係数
  - 基準カテゴリ
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
1. 群Aを $D=0$、群Bを $D=1$ として
$$
Y=\beta_0+\beta_1D+\varepsilon
$$
とする。各群平均を係数で表せ。
2. 3群A・B・CについてAを基準とした回帰係数が、切片10、B係数2、C係数$-1$ だった。Cを基準に取り直したときの切片、A係数、B係数を求めよ。

## 使用公式・定理
0–1ダミー変数では、切片が基準カテゴリの平均、各ダミー係数が「そのカテゴリ平均－基準カテゴリ平均」を表す。

基準カテゴリを変更するときは、**いったん各群平均へ戻し、新しい基準平均との差を取り直す**。基準を変えても各群の当てはめ平均そのものは変わらない。

## 一手／方針
**係数を直接変換しようとせず、まず群平均を復元する。** その後、新しい基準群の平均を切片にし、他群平均との差を新しいダミー係数にする。

## 答え
2群の場合
$$
E[Y\mid D=0]=\beta_0,
$$
$$
E[Y\mid D=1]=\beta_0+\beta_1,
$$
したがって
$$
\beta_1=\mu_B-\mu_A.
$$

3群の例ではA基準の係数から
$$
\mu_A=10,
\qquad
\mu_B=10+2=12,
\qquad
\mu_C=10-1=9.
$$
Cを基準にすると切片は9で、
$$
\text{A係数}=10-9=1,
\qquad
\text{B係数}=12-9=3.
$$
よって
$$
\boxed{\text{切片}=9,\quad \text{A係数}=1,\quad \text{B係数}=3}.
$$

## 計算例
A基準では群平均が $(10,12,9)$、C基準でも
$$
C:9,
\qquad A:9+1=10,
\qquad B:9+3=12
$$
と同じ群平均を再現する。変わるのは係数の表示であって、当てはめ値ではない。

## 注意
切片と全カテゴリ分のダミー変数を同時に入れると完全共線性になるため、通常は1カテゴリを基準として落とす。

係数の数値や符号は基準カテゴリに依存するが、群平均や推定可能な群間差は基準の取り方に依存しない。

<!-- CARD -->

---
id: reg-interaction-dummy-continuous
title: 群と連続変数の交互作用を解釈し傾き差を検定する
category: math-data-analysis
subcategory: math-regression
topic: regression-interaction-canonical
type: calc_step
difficulty: 3
priority: S
hashtags:
  - 交互作用
  - ダミー変数
  - 傾き
  - t検定
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
$$
Y=\beta_0+\beta_1X+\beta_2D+\beta_3XD+\varepsilon,
\qquad D\in\{0,1\}
$$
を考える。

1. $D=0,1$ の回帰直線を書き、$\beta_2,\beta_3$ の意味を説明せよ。
2. $\widehat\beta_1=1.2$、$\widehat\beta_3=-0.5$ のとき両群の傾きを求めよ。
3. $\operatorname{SE}(\widehat\beta_3)=0.2$、誤差自由度20のt分布の両側5%臨界値を2.086とする。$H_0:\beta_3=0$ を検定せよ。

## 使用公式・定理
$D$ を0または1に固定して回帰式を読み分ける。交互作用項 $XD$ の係数 $\beta_3$ は2群の傾き差である。

正規線形モデルで誤差分散を推定する通常の係数検定では
$$
t=\frac{\widehat\beta_3-\beta_{3,0}}
{\operatorname{SE}(\widehat\beta_3)}
$$
を残差自由度のt分布と比較する。標本が大きければt分布は標準正規分布へ近づくので、Wald型の正規近似判定とほぼ一致する。

## 一手／方針
**まず $D=0,1$ を代入して2本の直線を作る。** すると切片差と傾き差が見えるので、交互作用の検定はその傾き差 $\beta_3$ が0かを標準誤差で割って調べればよい。

## 答え
$D=0$ では
$$
E[Y\mid X,D=0]=\beta_0+\beta_1X.
$$
$D=1$ では
$$
E[Y\mid X,D=1]
=(\beta_0+\beta_2)+(\beta_1+\beta_3)X.
$$
したがって $\beta_2$ は $X=0$ における切片差、$\beta_3$ は $D=1$ 群と $D=0$ 群の傾き差である。

数値例では
$$
\text{$D=0$ の傾き}=1.2,
$$
$$
\text{$D=1$ の傾き}=1.2-0.5=0.7.
$$
また
$$
t=\frac{-0.5}{0.2}=-2.5.
$$
$|t|=2.5>2.086$ なので、5%水準で $H_0:\beta_3=0$ を棄却する。すなわち2群の傾きが等しいとはみなしにくい。

## 計算例
大標本で標準正規分布の両側5%臨界値1.96を使っても
$$
|-2.5|>1.96
$$
なので同じ棄却判断になる。これは大標本Wald近似であり、正規線形モデルの有限標本では残差自由度を使うt検定が本流である。

## 注意
$\beta_2$ は一般には「群全体の平均差」ではなく $X=0$ における群差である。$X=0$ が観測範囲から遠い場合は $X$ を中心化すると解釈しやすい。

交互作用があると、一方の変数の効果は他方の変数の値に依存する。主効果だけを単独で一律解釈しない。

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
$R_j^2=0.80$ なら
$$
\operatorname{VIF}_j
=\frac1{1-0.80}
=5.
$$
したがって、他の条件を同じとみなした基準と比べて $\widehat\beta_j$ の分散は5倍に拡大する。

標準誤差は分散の平方根なので、対応する増幅率は
$$
\sqrt{\operatorname{VIF}_j}
=\sqrt5
\approx2.24
$$
倍である。

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
ガウス・マルコフの定理の等分散条件では
$$
\operatorname{Var}(\boldsymbol\varepsilon\mid X)=\sigma^2I
$$
を仮定する。

不均一分散の下でも $E[\boldsymbol\varepsilon\mid X]=\boldsymbol0$ なら最小二乗推定量は不偏であり得るが、通常の
$$
\widehat{\operatorname{Var}}(\widehat{\boldsymbol\beta})
=MS_E(X^{\mathsf T}X)^{-1}
$$
は一般に正しくない。

観測 $i$ の説明変数ベクトルを $x_i$、最小二乗残差を $e_i$ とすると、HC0型の不均一分散頑健分散推定量は
$$
\boxed{
\widehat V_{\mathrm{HC0}}
=(X^{\mathsf T}X)^{-1}
\left(\sum_{i=1}^n e_i^2x_ix_i^{\mathsf T}\right)
(X^{\mathsf T}X)^{-1}}
$$
である。

## 答え
残差対当てはめ値図が右へ行くほど扇状に広がるなら、
$$
\operatorname{Var}(\varepsilon_i\mid X_i)
$$
が一定でない不均一分散を疑う。

条件付き平均0が保たれていれば最小二乗法の係数推定値は不偏であり得るが、等分散を前提とする通常の標準誤差・t検定・F検定は不適切になり得る。

対応は目的によって異なる。平均構造や分散構造に意味があるなら変数変換や重み付き最小二乗を検討し、係数推定は最小二乗法のまま推測だけ頑健化したいならHC型のロバスト標準誤差を使う方法がある。

## 計算例
HC0の式は「外側のパン」
$$
(X^{\mathsf T}X)^{-1}
$$
の間に、観測ごとの残差二乗で重み付けした
$$
\sum_i e_i^2x_ix_i^{\mathsf T}
$$
を挟むサンドイッチ形である。

形式的に全ての $e_i^2$ を共通の $s^2$ へ置き換えると中央は
$$
s^2\sum_i x_ix_i^{\mathsf T}=s^2X^{\mathsf T}X
$$
となるため
$$
(X^{\mathsf T}X)^{-1}
(s^2X^{\mathsf T}X)
(X^{\mathsf T}X)^{-1}
=s^2(X^{\mathsf T}X)^{-1},
$$
となり通常の等分散型分散推定と対応する。

## 注意
係数の不偏性と通常標準誤差の正しさを分けて考える。HC0は最小二乗係数そのものを変更する手法ではなく、主にその分散共分散行列・標準誤差の推定を変更する。

HC0は不均一分散には頑健だが、系列相関やクラスタ内相関まで自動的に解決するわけではない。その場合は相関構造に対応した別の頑健分散推定が必要になる。

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
まず $r_i=2,k=4,h_{ii}=0.5$ なら
$$
D_i=\frac{2^2}{4}\frac{0.5}{1-0.5}=1.
$$

別の観測で $r_i=2,k=4,h_{ii}=0.20$ なら
$$
D_i=\frac{2^2}{4}\frac{0.20}{0.80}=0.25.
$$
探索的な目安として $4/n$ と比較することがあり、$n=40$ なら $4/n=0.10$ なので $D_i=0.25$ は詳しく確認する候補となる。

## 注意
$4/n$ などの閾値は絶対的な検定基準ではない。Cookの距離が大きい観測を機械的に削除せず、入力誤り、測定過程、説明変数空間での位置、観測を除いたときの再推定結果を確認する。

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
