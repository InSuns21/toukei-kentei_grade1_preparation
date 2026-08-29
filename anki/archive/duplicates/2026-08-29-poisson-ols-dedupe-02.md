---
id: reg-ols-simple-formula
title: 単回帰の最小二乗推定量を再生する
category: math-data-analysis
subcategory: math-regression
topic: simple-ols-formula
type: formula
difficulty: 2
priority: S
hashtags:
  - 単回帰
  - 最小二乗推定
  - 傾き
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 最小二乗推定
archive_reason: duplicate
canonical_card: reg-ols-normal-equations-simple
archive_note: 傾き・切片公式は正規方程式を解く導出カードの結論そのもの。公式単独暗記を残さず、導出から再生するカードをcanonicalにする。
---
## 問題
切片あり単回帰で、$S_{xx}=\sum_i(x_i-\overline x)^2$、$S_{xy}=\sum_i(x_i-\overline x)(Y_i-\overline Y)$ とする。傾きと切片の最小二乗推定量を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

正規方程式を中心化して解く。

## 答え
$$S_{xx}=\sum_i(x_i-\overline x)^2,\qquad S_{xy}=\sum_i(x_i-\overline x)(Y_i-\overline Y),$$
$$\widehat\beta_1=\frac{S_{xy}}{S_{xx}},\qquad
\widehat\beta_0=\overline Y-\widehat\beta_1\overline x.$$

## 計算例
$\overline x=3,\overline Y=10,S_{xy}=12,S_{xx}=6$ なら
$$\widehat\beta_1=\frac{12}{6}=2,$$
$$\widehat\beta_0=10-2\cdot3=4.$$
したがって当てはめた回帰直線は $\widehat Y=4+2x$ である。

## 注意
傾きの分母は $\sum x_i^2$ ではなく中心化平方和。

<!-- CARD -->

---
id: engproc-poisson-failure-count
title: 一定故障率から期間内故障件数を計算する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: poisson-failure-count
type: calc_step
difficulty: 2
priority: A
hashtags:
  - ポアソン過程
  - 故障件数
  - 信頼性
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ポアソン過程
archive_reason: duplicate
canonical_card: stoch-poisson-count-numeric
archive_note: N(t)~Poisson(lambda t) として区間内件数確率を計算する同一操作。工学側はNHPPや曝露時間MLEなど固有論点を残す。
---
## 問題
設備の故障が1日当たり率0.2のポアソン過程に従う。10日間に故障が2件以下である確率を求めよ。
## 記号・用語
$N(t)$ は期間 $t$ までの故障件数、平均は $\lambda t$ である。
## 使用公式・定理
$N(t)\sim\operatorname{Poisson}(\lambda t)$、$P(N=k)=e^{-m}m^k/k!$。
## 一手／方針
平均件数 $m=0.2\cdot10$ を求め、$k=0,1,2$ の確率を足す。
## 答え
$$P(N(10)\le2)=e^{-2}\left(1+2+\frac{2^2}{2}\right)=5e^{-2}\approx0.6767.$$
## 計算例
3件以上の確率は $1-5e^{-2}\approx0.3233$。
## 注意
「2件以下」には0件と1件も含む。

<!-- CARD -->

---
id: engproc-poisson-thinning-defects
title: ポアソン欠陥流を種類別に分割する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: poisson-thinning
type: calc_step
difficulty: 2
priority: B
hashtags:
  - ポアソン過程
  - 間引き
  - 欠陥分類
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ポアソン過程
archive_reason: duplicate
canonical_card: stoch-poisson-thinning
archive_note: 各到着を独立確率pで分類して率をp lambdaへ落とす同じ間引き操作。
---
## 問題
欠陥が率12/時のポアソン過程で発生し、各欠陥は独立に確率0.25で重大欠陥である。2時間の重大欠陥数の分布を求めよ。
## 記号・用語
独立間引きでは各到着を他と独立に分類する。
## 使用公式・定理
率 $\lambda$ のポアソン過程を確率 $p$ で残すと、率 $p\lambda$ のポアソン過程になる。
## 一手／方針
重大欠陥率を求め、観測時間2を掛ける。
## 答え
重大欠陥率は $12(0.25)=3$/時。したがって
$$N_{\mathrm{major}}(2)\sim\operatorname{Poisson}(6).$$
## 計算例
軽微欠陥数は平均 $12(0.75)2=18$ のポアソン分布。
## 注意
独立分類の下では2種類の計数過程も独立である。

<!-- CARD -->

---
id: engproc-poisson-superposition-machines
title: 複数設備の故障過程を重ね合わせる
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: poisson-superposition
type: calc_step
difficulty: 2
priority: B
hashtags:
  - ポアソン過程
  - 重ね合わせ
  - 故障過程
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ポアソン過程
archive_reason: duplicate
canonical_card: stoch-poisson-superposition
archive_note: 独立ポアソン過程を重ねて率を加算する同一定理・同一計算。
---
## 問題
独立な3台の設備の故障率がそれぞれ $0.1,0.2,0.3$/日である。全設備を合わせた5日間の故障数の分布を求めよ。
## 記号・用語
重ね合わせは複数の計数過程の到着を一つにまとめる操作である。
## 使用公式・定理
独立なポアソン過程の重ね合わせは率の和をもつポアソン過程である。
## 一手／方針
3つの故障率を足し、期間5日を掛ける。
## 答え
合計率は $0.1+0.2+0.3=0.6$/日なので
$$N(5)\sim\operatorname{Poisson}(3).$$
## 計算例
5日間の無故障確率は $e^{-3}$。
## 注意
設備間の故障過程の独立性が必要である。

<!-- CARD -->

---
id: engproc-compound-poisson-cost
title: 複合ポアソン過程の総費用の平均と分散を計算する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: compound-poisson-cost
type: calc_step
difficulty: 3
priority: B
hashtags:
  - ポアソン過程
  - 複合ポアソン過程
  - 総費用
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ポアソン過程
archive_reason: duplicate
canonical_card: stoch-compound-poisson-moments
archive_note: 複合ポアソン和の平均lambda muと分散lambda(sigma^2+mu^2)を求める同一moveの数値設定版。
---
## 問題
1か月の故障数 $N\sim\operatorname{Poisson}(4)$、各修理費 $Y_i$ は独立同分布で $E[Y_i]=3$、$\operatorname{Var}(Y_i)=5$、かつ $N$ と独立である。総費用 $S=\sum_{i=1}^NY_i$ の平均と分散を求めよ。
## 記号・用語
空和は $N=0$ のとき0とする。
## 使用公式・定理
複合ポアソン和では $E[S]=\lambda E[Y]$、$\operatorname{Var}(S)=\lambda E[Y^2]=\lambda\{\operatorname{Var}(Y)+E[Y]^2\}$。
## 一手／方針
修理費の二次モーメントを計算してポアソン率を掛ける。
## 答え
$$E[S]=4\cdot3=12,$$
$$\operatorname{Var}(S)=4(5+3^2)=56.$$
## 計算例
標準偏差は $\sqrt{56}\approx7.48$。
## 注意
$\lambda\operatorname{Var}(Y)=20$ だけでは件数変動の寄与を落としている。

<!-- CARD -->

---
id: process-poisson-wait
title: ポアソン過程の待ち時間を指数分布へ結び付ける
category: applied-common
subcategory: applied-stochastic-processes
topic: waiting-time
type: recognition
difficulty: 2
priority: S
hashtags:
  - ポアソン過程
  - 指数分布
  - 待ち時間
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ポアソン過程
archive_reason: duplicate
canonical_card: stoch-poisson-arrival-gamma
archive_note: 最初の到着時刻が指数分布になる議論は、第k到着時刻Gamma(k,lambda)のk=1。一般カードをcanonicalにする。
---
## 問題
率 $\lambda=2$ のポアソン過程で、最初の到着時刻 $T_1$ が1を超える確率を求めよ。
## 答え
$T_1>t$ は時刻 $t$ まで到着が0回という事象である。
## 使用公式・定理
率 $\lambda$ のポアソン過程では、計数 $N(t)$ はポアソン分布 $\operatorname{Poisson}(\lambda t)$ に従うので
$$P(T_1>t)=P(N(t)=0)=e^{-\lambda t}.$$
## 計算例
$$P(T_1>1)=P(N(1)=0)=e^{-2}.$$
したがって $T_1$ の台は $t>0$、密度は $2e^{-2t}$。
## 注意
指数分布のrateと平均 $1/\lambda$ を混同しない。
