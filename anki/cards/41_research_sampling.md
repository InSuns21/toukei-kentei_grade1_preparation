---
id: research-experimental-observational
title: 実験研究と観察研究を判別する
category: applied-common
subcategory: applied-research-types
topic: experimental-observational
type: recognition
difficulty: 2
priority: A
hashtags: [実験研究, 観察研究, 介入]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 実験研究・観察研究 }]
---
## 問題
実験研究と観察研究を分ける決定的な基準を述べよ。
## 答え
研究者が処置・曝露を割り付けるのが実験研究、自然に生じた処置・曝露と結果を観察するのが観察研究。無作為割付の有無は実験の質を左右するが、介入の有無が両者を分ける。
## 使用公式・定理
無作為割付は平均的に交絡因子の分布を処置群間で揃え、因果効果の比較を正当化する。
## 計算例
薬を無作為に割り付けるのは実験、診療記録から服薬者を比較するのは観察研究。
## 注意
標本の無作為抽出と処置の無作為割付は目的が異なる。
<!-- CARD -->

---
id: sampling-proportional-allocation
title: 層化抽出の比例配分を計算する
category: applied-common
subcategory: applied-sampling
topic: proportional-allocation
type: calc_step
difficulty: 2
priority: B
hashtags: [層化抽出, 比例配分, 標本配分]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 比例配分 }]
---
## 問題
層サイズが $(N_1,N_2,N_3)=(200,300,500)$、総標本数 $n=100$ の比例配分を求めよ。ここで $N_h$ は層サイズであり、正規分布の記号ではない。
## 答え
$$n_h=n\frac{N_h}{N}.$$
$N=1000$ なので
$$ (n_1,n_2,n_3)=(20,30,50).$$
## 使用公式・定理
比例配分では各層の抽出率 $n_h/N_h$ が共通。
## 計算例
各層の抽出率は0.1。
## 注意
端数が出る場合は合計がnとなるよう整数調整する。
<!-- CARD -->

---
id: sampling-neyman-allocation
title: Neyman配分を導く
category: applied-common
subcategory: applied-sampling
topic: neyman-allocation
type: formula
difficulty: 4
priority: B
hashtags: [層化抽出, Neyman配分, 最適配分]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: Neyman配分 }]
---
## 問題
各単位の調査費用が層間で等しく、有限母集団補正を配分最適化で無視する。固定総標本数nの下で層化平均の分散を最小にする $n_h$ を書け。
## 答え
$$n_h=n\frac{N_hS_h}{\sum_{\ell=1}^HN_\ell S_\ell}.$$
## 使用公式・定理
最小化対象のn依存部分は $\sum_hW_h^2S_h^2/n_h$。Lagrange乗数法で $n_h\propto W_hS_h\propto N_hS_h$。
## 計算例
同じ層サイズなら標準偏差の大きい層へ多く配分する。
## 注意
費用 $c_h$ が異なる最適配分は $n_h\propto N_hS_h/\sqrt{c_h}$。
<!-- CARD -->

---
id: sampling-neyman-numeric
title: Neyman配分を数値で計算する
category: applied-common
subcategory: applied-sampling
topic: neyman-allocation-numeric
type: calc_step
difficulty: 3
priority: B
hashtags: [層化抽出, Neyman配分, 数値計算]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: Neyman配分 }]
---
## 問題
2層で $(N_1,N_2)=(400,600)$、$(S_1,S_2)=(10,20)$、総標本数 $n=100$。Neyman配分を求めよ。ここで $N_h$ は層サイズであり、正規分布の記号ではない。
## 答え
$$N_1S_1=4000,\qquad N_2S_2=12000.$$
したがって
$$n_1=100\frac{4000}{16000}=25,\qquad n_2=75.$$
## 使用公式・定理
$n_h=nN_hS_h/\sum_\ell N_\ell S_\ell$。
## 計算例
比例配分 $(40,60)$ より変動の大きい第2層を厚く抽出する。
## 注意
分散 $S_h^2$ でなく標準偏差 $S_h$ を使う。
<!-- CARD -->

---
id: sampling-cluster-vs-stratified
title: 集落抽出と層化抽出を区別する
category: applied-common
subcategory: applied-sampling
topic: cluster-vs-stratified
type: recognition
difficulty: 2
priority: B
hashtags: [集落抽出, 層化抽出, 標本設計]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 集落抽出 }]
---
## 問題
層化抽出と集落抽出で「群」をどう選ぶか、望ましい群内構成も含めて述べよ。
## 答え
層化抽出は全ての層から単位を抽出し、層内が均質だと効率がよい。集落抽出は一部の集落を選んで集落内単位を調べ、各集落が母集団の縮図のように異質だと効率がよい。
## 使用公式・定理
集落内相関が正なら、同じ集落から多数取る情報の重複が設計効果を大きくする。
## 計算例
地域を全て含め各地域から住民を抽出するのは層化、一部地域を選ぶのは集落抽出。
## 注意
行政区など同じ群を使っても、全群を使うか一部だけ選ぶかで役割が変わる。
<!-- CARD -->

---
id: sampling-one-stage-cluster-mean
title: 等サイズ集落抽出の母平均を推定する
category: applied-common
subcategory: applied-sampling
topic: one-stage-cluster
type: calc_step
difficulty: 3
priority: B
hashtags: [集落抽出, 母平均, 集落合計]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 集落抽出 }]
---
## 問題
G個の集落が各M単位をもち、g集落を単純無作為抽出して全単位を調べる。抽出集落hの合計を $t_h$ として母平均推定量を書け。
## 答え
母集団総単位数はGM。母合計推定量は $(G/g)\sum_{h\in s}t_h$ なので
$$\widehat{\bar Y}
=\frac1{gM}\sum_{h\in s}t_h.$$
## 使用公式・定理
集落を抽出単位とした母合計の拡大推定。
## 計算例
$g=2,M=10$、集落合計が80と120なら推定母平均は10。
## 注意
集落サイズが異なる場合はこの単純平均をそのまま使えない。
<!-- CARD -->

---
id: sampling-two-stage-inclusion
title: 二段階抽出の最終包含確率を計算する
category: applied-common
subcategory: applied-sampling
topic: two-stage-inclusion
type: calc_step
difficulty: 3
priority: B
hashtags: [二段階抽出, 包含確率, 多段抽出]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 二段抽出 }]
---
## 問題
二段階抽出として、G集落からg集落を単純無作為抽出し、選ばれた集落hの $M_h$ 単位から $m_h$ 単位を単純無作為抽出する。単位hiの包含確率を求めよ。
## 答え
$$\pi_{hi}
=P(h\in s_1)P(i\in s_{2h}\mid h\in s_1)
=\frac gG\frac{m_h}{M_h}.$$
## 使用公式・定理
連鎖律 $P(A\cap B)=P(A)P(B\mid A)$。
## 計算例
$g/G=1/5,\ m_h/M_h=1/10$ なら $\pi_{hi}=1/50$。
## 注意
段階ごとの抽出確率を足さずに掛ける。
<!-- CARD -->

---
id: sampling-two-stage-total
title: 二段階抽出の母合計を推定する
category: applied-common
subcategory: applied-sampling
topic: two-stage-total
type: calc_step
difficulty: 4
priority: B
hashtags: [二段階抽出, 母合計, 拡大推定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 二段抽出 }]
---
## 問題
二段階抽出として、第1段でG集落からg集落、第2段で集落hの $M_h$ 単位から $m_h$ 単位を単純無作為抽出する。母合計の不偏推定量を書け。
## 答え
集落合計の推定量を
$$\widehat t_h=\frac{M_h}{m_h}\sum_{i\in s_h}y_{hi}$$
とすると
$$\widehat T=\frac Gg\sum_{h\in s_1}\widehat t_h.$$
## 使用公式・定理
各段階で母合計の拡大推定を順に適用する。
## 計算例
第2段の推定集落合計を、第1段抽出率の逆数G/gで拡大する。
## 注意
分散には第1段と第2段の両方の変動が入る。
<!-- CARD -->

---
id: sampling-systematic-rule
title: 系統抽出の標本を作る
category: applied-common
subcategory: applied-sampling
topic: systematic-sampling
type: calc_step
difficulty: 2
priority: B
hashtags: [系統抽出, 無作為開始点, 抽出間隔]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 系統抽出 }]
---
## 問題
$N=20,n=5$ で抽出間隔が整数の系統抽出を行う。無作為開始点 $r=3$ の標本番号を求めよ。
## 答え
抽出間隔は
$$k=N/n=4.$$
したがって
$$r,r+k,\ldots,r+(n-1)k=(3,7,11,15,19).$$
## 使用公式・定理
$r$ は $1,\ldots,k$ から一様に選ぶ。
## 計算例
各単位の包含確率は $1/k=n/N=1/4$。
## 注意
名簿の並び順に周期性があると偏りや分散増大を招く。
<!-- CARD -->

---
id: sampling-systematic-periodicity
title: 系統抽出の周期性リスクを判定する
category: applied-common
subcategory: applied-sampling
topic: systematic-periodicity
type: recognition
difficulty: 3
priority: B
hashtags: [系統抽出, 周期性, 標本枠]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 系統抽出 }]
---
## 問題
系統抽出で名簿の周期と抽出間隔kが一致すると何が起こるか。対策も述べよ。
## 答え
特定の型の単位ばかり選び、代表性が損なわれることがある。名簿を無作為化する、周期と無関係な順序にする、複数の無作為開始点を使うなどで対処する。
## 使用公式・定理
一つの無作為開始点だけの線形系統抽出では、通常の不偏分散推定量を作れない場合がある。
## 計算例
昼・夜勤務が交互に並び、$k=2$ なら片方だけを選び得る。
## 注意
傾向順に並べることが層化に似た効率改善を生む場合もあり、並び順の効果を確認する。
<!-- CARD -->

---
id: sampling-ht-definition
title: Horvitz–Thompson推定量を書く
category: applied-common
subcategory: applied-sampling
topic: horvitz-thompson
type: formula
difficulty: 3
priority: B
hashtags: [Horvitz-Thompson推定量, 包含確率, 母合計]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: Horvitz–Thompson推定量 }]
---
## 問題
単位iの1次包含確率を $\pi_i>0$ とする。母合計 $T_Y=\sum_{i=1}^Ny_i$ のHorvitz–Thompson推定量を書け。
## 答え
$$\widehat T_{\mathrm{HT}}
=\sum_{i\in s}\frac{y_i}{\pi_i}
=\sum_{i=1}^N\frac{I_i y_i}{\pi_i}.$$
## 使用公式・定理
各観測を包含確率の逆数で拡大する。
## 計算例
等確率 $\pi_i=n/N$ なら $\widehat T_{\mathrm{HT}}=(N/n)\sum_{i\in s}y_i=N\bar y_s$。
## 注意
$\pi_i=0$ の単位があると母合計全体を設計不偏推定できない。
<!-- CARD -->

---
id: sampling-ht-numeric
title: 不等確率のHorvitz–Thompson合計を計算する
category: applied-common
subcategory: applied-sampling
topic: horvitz-thompson-numeric
type: calc_step
difficulty: 2
priority: B
hashtags: [Horvitz-Thompson推定量, 不等確率抽出, 数値計算]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: Horvitz–Thompson推定量 }]
---
## 問題
抽出された2単位の値が $(y_1,y_2)=(10,20)$、包含確率が $(\pi_1,\pi_2)=(0.5,0.25)$。母合計のHT推定値を求めよ。
## 答え
$$\widehat T_{\mathrm{HT}}
=\frac{10}{0.5}+\frac{20}{0.25}
=20+80=100.$$
## 使用公式・定理
$\widehat T_{\mathrm{HT}}=\sum_{i\in s}y_i/\pi_i$。
## 計算例
包含されにくい第2単位の重み $1/\pi_2=4$ が大きい。
## 注意
抽出確率と包含確率が異なる多段設計では、最終包含確率を使う。
<!-- CARD -->

---
id: sampling-ht-unbiased
title: Horvitz–Thompson推定量の不偏性を示す
category: applied-common
subcategory: applied-sampling
topic: horvitz-thompson-unbiased
type: calc_step
difficulty: 3
priority: B
hashtags: [Horvitz-Thompson推定量, 不偏推定, 包含指標]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: Horvitz–Thompson推定量 }]
---
## 問題
$\pi_i>0$ の下でHT母合計推定量が設計不偏であることを示せ。
## 答え
$E_d[I_i]=\pi_i$ より
$$E_d[\widehat T_{\mathrm{HT}}]
=\sum_{i=1}^N\frac{E_d[I_i]y_i}{\pi_i}
=\sum_{i=1}^Ny_i=T_Y.$$
## 使用公式・定理
期待値の線形性だけを使い、包含指標間の独立性は不要。
## 計算例
不等確率抽出でも正しい包含確率で重み付ければ不偏。
## 注意
推定分散には2次包含確率が必要。
<!-- CARD -->

---
id: sampling-ht-variance
title: Horvitz–Thompson推定量の分散を書く
category: applied-common
subcategory: applied-sampling
topic: horvitz-thompson-variance
type: formula
difficulty: 5
priority: B
hashtags: [Horvitz-Thompson推定量, 2次包含確率, 分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: Horvitz–Thompson推定量 }]
---
## 問題
1次包含確率 $\pi_i$、2次包含確率 $\pi_{ij}=P(I_i=I_j=1)$ を用いてHT母合計推定量の分散を書け。$\pi_{ii}=\pi_i$ とする。
## 答え
$$\operatorname{Var}_d(\widehat T_{\mathrm{HT}})
=\sum_{i=1}^N\sum_{j=1}^N
(\pi_{ij}-\pi_i\pi_j)
\frac{y_i}{\pi_i}\frac{y_j}{\pi_j}.$$
## 使用公式・定理
$\operatorname{Cov}(I_i,I_j)=\pi_{ij}-\pi_i\pi_j$。
## 計算例
非復元単純無作為抽出では異なる単位の共分散は負。
## 注意
分散推定には標本内の組について $\pi_{ij}>0$ が必要。
<!-- CARD -->

---
id: sampling-ratio-estimator
title: 既知補助平均を使う比推定量を書く
category: applied-common
subcategory: applied-sampling
topic: ratio-estimator
type: formula
difficulty: 3
priority: B
hashtags: [比推定, 補助変数, 母平均]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 比推定 }]
---
## 問題
補助変数Xの母平均 $\bar X$ が既知で、YとXがおおむね原点を通る比例関係にある。Yの母平均の比推定量を書け。
## 答え
$$\widehat R=\frac{\bar y_s}{\bar x_s},\qquad
\widehat{\bar Y}_R=\widehat R\,\bar X.$$
母合計なら $\widehat T_{Y,R}=\widehat R\,T_X$。
## 使用公式・定理
未知の母比 $R=\bar Y/\bar X$ を標本比で置き換える。
## 計算例
$\bar y_s=12,\bar x_s=8,\bar X=10$ なら推定母平均は15。
## 注意
比推定量は一般に厳密不偏ではない。
<!-- CARD -->

---
id: sampling-ratio-linearization
title: 比推定量の近似分散を書く
category: applied-common
subcategory: applied-sampling
topic: ratio-linearization
type: formula
difficulty: 4
priority: B
hashtags: [比推定, 線形化, 近似分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 比推定 }]
---
## 問題
単純無作為抽出で $R=\bar Y/\bar X$、$e_i=y_i-Rx_i$ とする。比推定母平均の1次近似分散を書け。
## 答え
Taylor展開により
$$\widehat{\bar Y}_R-\bar Y
\approx\bar e_s,$$
したがって
$$\operatorname{Var}_d(\widehat{\bar Y}_R)
\approx(1-f)\frac{S_e^2}{n}.$$
## 使用公式・定理
比 $\bar y_s/\bar x_s$ を $(\bar Y,\bar X)$ の周りで1次Taylor展開する。
## 計算例
YとXが強い比例関係なら残差分散 $S_e^2$ が小さい。
## 注意
実際の分散推定では未知Rを $\widehat R$ で置き換える。
<!-- CARD -->

---
id: sampling-regression-estimator
title: 回帰推定量を補助平均で補正する
category: applied-common
subcategory: applied-sampling
topic: regression-estimator
type: calc_step
difficulty: 3
priority: B
hashtags: [回帰推定, 補助変数, 母平均]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 回帰推定 }]
---
## 問題
補助変数Xの母平均 $\bar X$ が既知で、標本から傾きbを得た。Yの母平均の回帰推定量を書き、$\bar y_s=20,\bar x_s=8,\bar X=10,b=1.5$ で計算せよ。
## 答え
$$\widehat{\bar Y}_{\mathrm{reg}}
=\bar y_s+b(\bar X-\bar x_s).$$
したがって
$$20+1.5(10-8)=23.$$
## 使用公式・定理
標本の補助平均が母補助平均からずれた分を回帰傾きで補正する。
## 計算例
bを固定既知とすれば設計不偏、標本推定すると一般に近似不偏。
## 注意
比推定と異なり切片のある線形関係にも対応しやすい。
<!-- CARD -->

---
id: sampling-design-effect
title: 設計効果を分散比で計算する
category: applied-common
subcategory: applied-sampling
topic: design-effect
type: calc_step
difficulty: 3
priority: B
hashtags: [設計効果, 複雑標本, 分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 設計効果 }]
---
## 問題
複雑標本設計で推定分散が0.018、同じ標本数の単純無作為抽出で0.012と見積もられた。設計効果を求めよ。
## 答え
$$\operatorname{DEFF}
=\frac{\operatorname{Var}_{\mathrm{design}}(\widehat\theta)}
{\operatorname{Var}_{\mathrm{SRS}}(\widehat\theta)}
=\frac{0.018}{0.012}=1.5.$$
## 使用公式・定理
DEFFが1より大きければSRSより分散が大きい。
## 計算例
層化で効率が上がればDEFFが1未満にもなる。
## 注意
比較するSRS分散の標本数と推定対象を揃える。
<!-- CARD -->

---
id: sampling-effective-sample-size
title: 設計効果から有効標本サイズを求める
category: applied-common
subcategory: applied-sampling
topic: effective-sample-size
type: calc_step
difficulty: 2
priority: B
hashtags: [設計効果, 有効標本サイズ, サンプルサイズの設計]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 設計効果 }]
---
## 問題
実標本数 $n=600$、設計効果 $\operatorname{DEFF}=1.5$ のとき、SRS換算の有効標本サイズを求めよ。
## 答え
$$n_{\mathrm{eff}}=\frac{n}{\operatorname{DEFF}}
=\frac{600}{1.5}=400.$$
## 使用公式・定理
分散が標本数におおむね反比例する近似。
## 計算例
SRS 400人と同程度の精度。
## 注意
MCMCの自己相関に基づく有効標本サイズとは文脈が異なる。
<!-- CARD -->

---
id: sampling-nonresponse-bias
title: 非回答バイアスを回答群と非回答群の差で表す
category: applied-common
subcategory: applied-sampling
topic: nonresponse-bias
type: calc_step
difficulty: 3
priority: B
hashtags: [非回答バイアス, 回答率, 調査誤差]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 非回答バイアスとカバレッジ誤差 }]
---
## 問題
回答率をr、回答群平均を $\mu_R$、非回答群平均を $\mu_N$ とする。回答者平均を母平均推定に使うバイアスを表せ。
## 答え
母平均は
$$\mu=r\mu_R+(1-r)\mu_N.$$
したがって回答者平均のバイアスは
$$\mu_R-\mu=(1-r)(\mu_R-\mu_N).$$
## 使用公式・定理
群分けによる全平均の公式。
## 計算例
$r=0.8,\mu_R=10,\mu_N=5$ ならバイアスは $0.2(5)=1$。
## 注意
回答率が高くても群間差が大きければバイアスは無視できない。
<!-- CARD -->

---
id: sampling-nonresponse-weighting
title: 逆回答確率重みで非回答を補正する
category: applied-common
subcategory: applied-sampling
topic: nonresponse-weighting
type: formula
difficulty: 3
priority: B
hashtags: [非回答バイアス, 逆確率重み付け, 調整重み]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 非回答バイアスとカバレッジ誤差 }]
---
## 問題
設計包含確率を $\pi_i$、回答確率を $\rho_i>0$、回答指標を $R_i$ とする。母合計の逆回答確率重み付き推定量を書け。
## 答え
$$\widehat T
=\sum_{i\in s}\frac{R_i y_i}{\pi_i\rho_i}.$$
正しい回答確率モデルの下では、抽出と回答について
$$E\left[\frac{I_iR_i y_i}{\pi_i\rho_i}\right]=y_i.$$
## 使用公式・定理
最終観測確率 $\pi_i\rho_i$ の逆数で重み付ける。
## 計算例
回答しにくい層ほど大きい重みを与える。
## 注意
極端な重みは分散を増やすため、重み調整・トリミングの影響を検討する。
<!-- CARD -->

---
id: sampling-coverage-error
title: カバレッジ誤差を過少・過剰被覆に分ける
category: applied-common
subcategory: applied-sampling
topic: coverage-error
type: recognition
difficulty: 2
priority: B
hashtags: [カバレッジ誤差, 標本枠, 調査誤差]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 非回答バイアスとカバレッジ誤差 }]
---
## 問題
標本枠の過少カバレッジ、過剰カバレッジ、重複を説明せよ。
## 答え
過少カバレッジは目標母集団の単位が枠から欠落、過剰カバレッジは対象外単位が枠に混入、重複は同一単位が複数記載されること。いずれも包含確率と代表性を歪める。
## 使用公式・定理
過少カバレッジで包含確率0の単位は、枠内の設計重みだけでは回復できない。
## 計算例
世帯名簿に新築世帯が未登録なら過少カバレッジ。
## 注意
非回答は枠にあり抽出された後の欠測、過少カバレッジは抽出機会自体がない点で異なる。
<!-- CARD -->

---
id: research-randomization-causal
title: 無作為割付と無作為抽出の役割を区別する
category: applied-common
subcategory: applied-research-types
topic: randomization-sampling
type: recognition
difficulty: 3
priority: A
hashtags: [実験研究, 無作為割付, 無作為抽出]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 実験研究 }]
---
## 問題
無作為割付と母集団からの無作為抽出が、それぞれ何を可能にするか述べよ。
## 答え
無作為割付は処置効果の因果推論を支える。無作為抽出は標本から対象母集団への一般化を支える。片方だけでは他方の目的を自動的には満たさない。
## 使用公式・定理
割付機構は群間比較の帰無分布、抽出設計は包含確率と標本推定量の分散を定める。
## 計算例
ボランティアを無作為割付した実験は内部妥当性が高くても母集団代表性が弱いことがある。
## 注意
randomizationとrandom samplingを同一視しない。
<!-- CARD -->

---
id: research-confounding-definition
title: 交絡因子を因果構造から判定する
category: applied-common
subcategory: applied-research-types
topic: confounding
type: recognition
difficulty: 3
priority: B
hashtags: [観察研究, 交絡, 因果推論]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 観察研究 }]
---
## 問題
曝露Xと結果Yの関係で変数Zが交絡因子となる典型条件を述べよ。
## 答え
Zが曝露Xより前に定まり、Xと結果Yの共通原因（またはその適切な代理変数）で、XからYへの因果経路上の中間変数でも合流点（collider）でもないとき、未調整のX–Y関連を交絡し得る。
## 使用公式・定理
層別、回帰、マッチング、重み付けは観測された交絡因子を調整する代表的方法。
## 計算例
コーヒー摂取と肺疾患の関連に対する喫煙習慣。
## 注意
結果の原因であるだけでは交絡因子とは限らず、曝露との関連も必要。
<!-- CARD -->

---
id: research-cohort-design
title: コホート研究を識別する
category: applied-common
subcategory: applied-research-types
topic: cohort-study
type: recognition
difficulty: 2
priority: B
hashtags: [観察研究, コホート研究, リスク比]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 観察研究 }]
---
## 問題
コホート研究の対象選択、時間方向、直接推定しやすい効果指標を述べよ。
## 答え
結果発生前に曝露群・非曝露群を定めて追跡し、各群の発生率を比較する。累積発生割合を観測できればリスク比
$$RR=\frac{P(Y=1\mid X=1)}{P(Y=1\mid X=0)}$$
を直接推定しやすい。
## 使用公式・定理
前向きでも既存記録を過去から追う後ろ向きコホートでも、選択基準は曝露側。
## 計算例
喫煙者と非喫煙者を追跡して疾患発生を比較する。
## 注意
脱落が曝露・結果と関連すると選択バイアスが生じる。
<!-- CARD -->

---
id: research-case-control-design
title: 症例対照研究のオッズ比を解釈する
category: applied-common
subcategory: applied-research-types
topic: case-control
type: calc_step
difficulty: 3
priority: B
hashtags: [観察研究, 症例対照研究, オッズ比]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 観察研究 }]
---
## 問題
症例の曝露有・無が $(a,c)$、対照の曝露有・無が $(b,d)$ のとき推定可能な曝露オッズ比を書け。
## 答え
$$\widehat{OR}=\frac{a/c}{b/d}=\frac{ad}{bc}.$$
結果の有無で標本数を固定するため、母集団の発生リスクは通常直接推定できない。
## 使用公式・定理
稀な疾患ではオッズ比がリスク比を近似する。
## 計算例
$(a,b,c,d)=(30,20,70,80)$ なら $\widehat{OR}=2400/1400\approx1.71$。
## 注意
対照は曝露の有無で選ばず、症例を生じた基礎集団から選ぶ。
<!-- CARD -->

---
id: research-cross-sectional-design
title: 横断研究の限界を判定する
category: applied-common
subcategory: applied-research-types
topic: cross-sectional
type: recognition
difficulty: 2
priority: B
hashtags: [観察研究, 横断研究, 有病割合]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 調査 }]
---
## 問題
横断研究で直接推定しやすい量と、因果解釈上の主な限界を述べよ。
## 答え
一時点または短期間に曝露と結果を同時測定し、有病割合を推定しやすい。曝露が結果に先行したか分かりにくく、時間順序と逆因果の問題がある。
## 使用公式・定理
有病割合＝調査時点の該当者数／調査対象者数。
## 計算例
健康調査で現在の運動習慣と現在の腰痛を同時に尋ねる。
## 注意
有病割合は発生率と疾病期間の両方に左右される。
<!-- CARD -->

---
id: research-prospective-retrospective
title: 前向き研究と後ろ向き研究を区別する
category: applied-common
subcategory: applied-research-types
topic: prospective-retrospective
type: recognition
difficulty: 2
priority: B
hashtags: [観察研究, 前向き研究, 後ろ向き研究]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 観察研究 }]
---
## 問題
前向き・後ろ向きという分類は何を基準にするか。
## 答え
研究開始時点から将来へデータを収集するのが前向き、既に生じた曝露・結果を記録から遡って調べるのが後ろ向き。介入の有無を表す実験・観察の分類とは別軸。
## 使用公式・定理
時間方向と対象選択基準を分けて記述する。
## 計算例
既存の職歴記録から曝露群を作り、その後の死亡記録を追うのは後ろ向きコホート。
## 注意
後ろ向き研究が全て症例対照研究とは限らない。
<!-- CARD -->

---
id: research-census-sample-survey
title: 全数調査と標本調査を比較する
category: applied-common
subcategory: applied-research-types
topic: census-sample-survey
type: recognition
difficulty: 2
priority: B
hashtags: [調査, 全数調査, 標本調査]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 調査 }]
---
## 問題
全数調査と標本調査の長所・短所を述べよ。
## 答え
全数調査は対象母集団の全単位を調べ、抽出誤差はないが費用・時間・非回答・測定管理の負担が大きい。標本調査は一部を抽出するため抽出誤差があるが、迅速で各単位を丁寧に測定できる。
## 使用公式・定理
総誤差は抽出誤差だけでなく、カバレッジ・非回答・測定・処理誤差を含む。
## 計算例
全数調査でも未回答があれば真値と一致するとは限らない。
## 注意
「全数だから誤差0」と結論しない。
<!-- CARD -->

---
id: research-sampling-nonsampling-error
title: 抽出誤差と非抽出誤差を分類する
category: applied-common
subcategory: applied-research-types
topic: survey-errors
type: recognition
difficulty: 2
priority: B
hashtags: [調査, 抽出誤差, 非抽出誤差]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 調査 }]
---
## 問題
抽出誤差と非抽出誤差を区別し、後者を3つ挙げよ。
## 答え
抽出誤差は母集団の一部だけを無作為抽出することによる変動。非抽出誤差には標本枠のカバレッジ誤差、非回答誤差、測定誤差、入力・集計などの処理誤差がある。
## 使用公式・定理
標本サイズ増加は抽出分散を減らすが、系統的な非抽出バイアスを自動的に減らさない。
## 計算例
誘導的質問による回答の偏りは測定誤差。
## 注意
非抽出誤差は確率標本でも起こる。
<!-- CARD -->

---
id: research-target-frame-sample
title: 目標母集団・標本枠・標本を区別する
category: applied-common
subcategory: applied-research-types
topic: population-frame-sample
type: recognition
difficulty: 2
priority: B
hashtags: [調査, 母集団, 標本枠]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 母集団・標本・標本枠 }]
---
## 問題
目標母集団、調査母集団、標本枠、標本を区別せよ。
## 答え
目標母集団は推論したい全単位、調査母集団は実際に到達可能な単位、標本枠は抽出に使う単位一覧、標本は枠から選ばれた単位。各段階のずれが一般化可能性を損なう。
## 使用公式・定理
枠にない対象は包含確率0となり、設計重みだけでは補正できない。
## 計算例
住民を推論対象に電話帳から抽出すると、非掲載世帯が過少カバレッジ。
## 注意
標本枠は母集団そのものではない。
<!-- CARD -->

---
id: sampling-srs-definition
title: 単純無作為抽出の包含確率を書く
category: applied-common
subcategory: applied-sampling
topic: simple-random-sampling
type: formula
difficulty: 2
priority: A
hashtags: [完全無作為抽出, 単純無作為抽出, 包含確率]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 単純無作為抽出 }]
---
## 問題
大きさNの有限母集団から大きさnを非復元で単純無作為抽出する。各標本、各単位の包含確率を書け。
## 答え
全ての大きさnの標本が等確率で
$$P(s)=\binom Nn^{-1}.$$
各単位iの1次包含確率は
$$\pi_i=P(i\in s)=\frac nN.$$
## 使用公式・定理
iを含む標本数は $\binom{N-1}{n-1}$ なので $\pi_i=\binom{N-1}{n-1}/\binom Nn$。
## 計算例
$N=100,n=10$ なら各単位の包含確率は0.1。
## 注意
完全無作為抽出とも呼ばれる。非復元なので抽出値は独立でない。
<!-- CARD -->

---
id: sampling-srs-pair-inclusion
title: 単純無作為抽出の2次包含確率を求める
category: applied-common
subcategory: applied-sampling
topic: pair-inclusion
type: calc_step
difficulty: 3
priority: B
hashtags: [単純無作為抽出, 2次包含確率, 非復元抽出]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 単純無作為抽出 }]
---
## 問題
大きさNからnを単純無作為抽出するとき、異なる2単位i,jの同時包含確率 $\pi_{ij}$ を求めよ。
## 答え
$$\pi_{ij}
=\frac{\binom{N-2}{n-2}}{\binom Nn}
=\frac{n(n-1)}{N(N-1)}.$$
## 使用公式・定理
i,jを固定した残り $n-2$ 単位を $N-2$ 単位から選ぶ。
## 計算例
$N=10,n=3$ なら $\pi_{ij}=6/90=1/15$。
## 注意
$\pi_{ij}\ne\pi_i\pi_j$ であり、包含指標は負に相関する。
<!-- CARD -->

---
id: sampling-mean-unbiased
title: 標本平均の設計不偏性を示す
category: applied-common
subcategory: applied-sampling
topic: srs-mean-unbiased
type: calc_step
difficulty: 3
priority: A
hashtags: [単純無作為抽出, 母平均, 不偏推定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 母平均の推定と分散 }]
---
## 問題
有限母集団値 $y_1,\ldots,y_N$ から大きさnを単純無作為抽出する。標本平均 $\bar y_s$ が母平均 $\bar Y=N^{-1}\sum_i y_i$ に設計不偏であることを示せ。
## 答え
包含指標を $I_i$ とすると
$$\bar y_s=\frac1n\sum_{i=1}^NI_iy_i.$$
$E_d[I_i]=n/N$ より
$$E_d[\bar y_s]
=\frac1n\sum_i\frac nN y_i
=\bar Y.$$
## 使用公式・定理
抽出設計に関する期待値の線形性。
## 計算例
母集団値は固定し、どの標本が選ばれるかだけを確率変数とする。
## 注意
モデル期待値でなく設計期待値 $E_d$。
<!-- CARD -->

---
id: sampling-fpc-mean-variance
title: 有限母集団補正を含む標本平均の分散を書く
category: applied-common
subcategory: applied-sampling
topic: finite-population-correction
type: formula
difficulty: 3
priority: A
hashtags: [有限母集団補正, 母平均, 分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 有限母集団補正 }]
---
## 問題
$S_Y^2=(N-1)^{-1}\sum_i(y_i-\bar Y)^2$ とする。大きさnの単純無作為非復元抽出における標本平均の分散を書け。
## 答え
抽出率を $f=n/N$ とすると
$$\operatorname{Var}_d(\bar y_s)
=\left(1-\frac nN\right)\frac{S_Y^2}{n}
=(1-f)\frac{S_Y^2}{n}.$$
## 使用公式・定理
$1-f$ が有限母集団補正。復元抽出の分散 $S_Y^2/n$ を小さくする。
## 計算例
$N=100,n=20,S_Y^2=25$ なら分散 $0.8(25)/20=1$。
## 注意
標準誤差の補正係数は $\sqrt{1-f}$。
<!-- CARD -->

---
id: sampling-srs-se-numeric
title: 単純無作為抽出の母平均標準誤差を計算する
category: applied-common
subcategory: applied-sampling
topic: srs-standard-error
type: calc_step
difficulty: 2
priority: B
hashtags: [単純無作為抽出, 標準誤差, 数値計算]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 母平均の推定と分散 }]
---
## 問題
$N=500,n=50$ の単純無作為抽出で標本分散 $s^2=100$ を得た。母平均推定の標準誤差を求めよ。
## 答え
$$\widehat{\operatorname{SE}}(\bar y_s)
=\sqrt{\left(1-\frac{50}{500}\right)\frac{100}{50}}$$
$$=\sqrt{1.8}\approx1.342.$$
## 使用公式・定理
$S_Y^2$ を不偏標本分散 $s^2=(n-1)^{-1}\sum_{i\in s}(y_i-\bar y_s)^2$ で推定する。
## 計算例
有限母集団補正を無視すると $\sqrt2\approx1.414$。
## 注意
抽出率が小さいときだけ有限母集団補正を近似的に1とする。
<!-- CARD -->

---
id: sampling-total-estimator
title: 母合計の推定量と分散を求める
category: applied-common
subcategory: applied-sampling
topic: population-total
type: calc_step
difficulty: 3
priority: B
hashtags: [単純無作為抽出, 母合計, 分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 母合計の推定 }]
---
## 問題
単純無作為抽出で母合計 $T_Y=\sum_i y_i$ を推定する式と分散を書け。
## 答え
$$\widehat T_Y=N\bar y_s,$$
$$\operatorname{Var}_d(\widehat T_Y)
=N^2\left(1-\frac nN\right)\frac{S_Y^2}{n}.$$
## 使用公式・定理
$T_Y=N\bar Y$ と $\widehat T_Y=N\bar y_s$。
## 計算例
$N=100,\bar y_s=8$ なら推定母合計は800。
## 注意
合計推定の標準誤差は平均推定の標準誤差のN倍。
<!-- CARD -->

---
id: sampling-proportion-variance
title: 母比率推定量の分散を導く
category: applied-common
subcategory: applied-sampling
topic: population-proportion
type: calc_step
difficulty: 3
priority: B
hashtags: [単純無作為抽出, 母比率, 有限母集団補正]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 母比率の推定 }]
---
## 問題
有限母集団の属性指標 $y_i\in\{0,1\}$、母比率P、標本比率pについて $\operatorname{Var}_d(p)$ を書け。
## 答え
指標の有限母集団分散は
$$S_Y^2=\frac{N}{N-1}P(1-P).$$
したがって
$$\operatorname{Var}_d(p)
=\left(1-\frac nN\right)\frac{N}{N-1}
\frac{P(1-P)}n.$$
## 使用公式・定理
標本比率は0–1指標の標本平均。
## 計算例
実用的な設計分散推定量は、0–1標本の不偏分散を用いて
$$\widehat{\operatorname{Var}}_d(p)
=\left(1-\frac nN\right)\frac{p(1-p)}{n-1}.$$
$N=1000,n=100,p=0.3$ なら分散は $0.9(0.21)/99\approx0.00191$、標準誤差は約0.0437。
## 注意
大きなNでは $N/(N-1)\approx1$。
<!-- CARD -->

---
id: sampling-mean-sample-size
title: 母平均推定の必要標本数を解く
category: applied-common
subcategory: applied-sampling
topic: mean-sample-size
type: calc_step
difficulty: 3
priority: B
hashtags: [サンプルサイズの設計, 母平均, 有限母集団補正]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 母平均の推定と分散 }]
---
## 問題
母集団サイズN、有限母集団分散の計画値 $S^2$、標準正規分布による臨界値z、許容半幅dから単純無作為抽出の必要標本数を求めよ。
## 答え
$$z^2\left(1-\frac nN\right)\frac{S^2}{n}\le d^2$$
をnについて解くと
$$n\ge\frac{Nz^2S^2}{Nd^2+z^2S^2}.$$
右辺を切り上げる。
## 使用公式・定理
半幅 $d=z\sqrt{\operatorname{Var}(\bar y_s)}$。
## 計算例
Nが非常に大きければ $n\approx z^2S^2/d^2$。
## 注意
非回答を見込むなら最終的な回収率で割って配布数を増やす。
<!-- CARD -->

---
id: sampling-proportion-sample-size
title: 母比率推定の標本数を計算する
category: applied-common
subcategory: applied-sampling
topic: proportion-sample-size
type: calc_step
difficulty: 3
priority: B
hashtags: [サンプルサイズの設計, 母比率, 数値計算]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 母比率の推定 }]
---
## 問題
大きな母集団で標準正規分布による95%区間の半幅を $d=0.05$ 以下にしたい。事前情報がないときの必要標本数を求めよ。
## 答え
比率分散 $P(1-P)$ は $P=0.5$ で最大なので
$$n\ge\frac{1.96^2(0.25)}{0.05^2}
=384.16.$$
したがって385人。
## 使用公式・定理
$n\ge z_{0.975}^2P(1-P)/d^2$。
## 計算例
回収率80%なら配布数は $\lceil385/0.8\rceil=482$。
## 注意
有限母集団が小さい場合は有限母集団補正を使う。
<!-- CARD -->

---
id: sampling-stratified-mean
title: 層化抽出の母平均推定量を書く
category: applied-common
subcategory: applied-sampling
topic: stratified-sampling
type: formula
difficulty: 3
priority: A
hashtags: [層化抽出, 母平均, 層重み]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 層化抽出 }]
---
## 問題
H層の母集団サイズを $N_h$、層標本平均を $\bar y_h$ とする。層化無作為抽出の母平均推定量を書け。ここで $N_h$ は層サイズであり、正規分布の記号ではない。
## 答え
層重み $W_h=N_h/N$ を用いて
$$\widehat{\bar Y}_{\mathrm{st}}
=\sum_{h=1}^HW_h\bar y_h.$$
## 使用公式・定理
母平均の恒等式 $\bar Y=\sum_hW_h\bar Y_h$ に各層の不偏推定量を代入する。
## 計算例
$W=(0.4,0.6)$、層平均 $(10,20)$ なら推定値16。
## 注意
標本配分比 $n_h/n$ でなく母集団構成比 $W_h$ で重み付ける。
<!-- CARD -->

---
id: sampling-stratified-variance
title: 層化平均の分散を計算する
category: applied-common
subcategory: applied-sampling
topic: stratified-variance
type: calc_step
difficulty: 4
priority: B
hashtags: [層化抽出, 分散, 有限母集団補正]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 層化抽出 }]
---
## 問題
各層で独立に $N_h$ から $n_h$ を単純無作為抽出する。層hの有限母集団分散を $S_h^2$ として、層化平均の分散を書け。ここで $N_h$ は層サイズであり、正規分布の記号ではない。
## 答え
$$\operatorname{Var}_d(\widehat{\bar Y}_{\mathrm{st}})
=\sum_{h=1}^HW_h^2
\left(1-\frac{n_h}{N_h}\right)\frac{S_h^2}{n_h}.$$
## 使用公式・定理
各層の標本は独立なので、重み付き和の分散を加える。
## 計算例
層内が均質なら $S_h^2$ が小さく、層化により分散を減らせる。
## 注意
層ごとの有限母集団補正を使う。
<!-- CARD -->
