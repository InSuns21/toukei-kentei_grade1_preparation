---
id: eng-capability-index
title: 工程能力指数を規格幅と工程幅から求める
category: engineering
subcategory: quality
topic: process-capability
type: formula
difficulty: 1
priority: B
hashtags: [工程能力, 品質管理, Cp]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 工程能力指数 }]
---
## 問題
上側規格 $USL=16$、下側規格 $LSL=4$、工程標準偏差 $\sigma=2$ のとき $C_p$ を求めよ。
## 答え
$$C_p=\frac{USL-LSL}{6\sigma}.$$
## 使用公式・定理
安定した正規工程の自然変動幅を $6\sigma$ とすると
$$C_p=\frac{\text{規格幅}}{\text{工程幅}}=\frac{USL-LSL}{6\sigma}.$$
## 計算例
$$C_p=\frac{16-4}{6\cdot2}=1.$$
## 注意
$C_p$ は工程平均の偏りを反映しない。偏りには $C_{pk}$ を使う。

<!-- CARD -->
---
id: eng-series-reliability
title: 直列系の信頼度を積で求める
category: engineering
subcategory: reliability
topic: series-system
type: formula
difficulty: 1
priority: B
hashtags: [信頼性, 直列系, 独立]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 信頼性 }]
---
## 問題
独立な2部品の時刻 $t$ での信頼度が $0.9,0.8$ である。両方が動作して初めて動く直列系の信頼度は？
## 答え
直列系の生存は全成分の生存の共通部分である。
## 使用公式・定理
成分寿命が独立な直列系では
$$R_{\mathrm{series}}(t)=P(T_1>t,\ldots,T_m>t)=\prod_{i=1}^mR_i(t).$$
## 計算例
$$R_{\mathrm{series}}(t)=0.9\cdot0.8=0.72.$$
## 注意
積への分解には部品寿命の独立性が必要である。

<!-- CARD -->
---
id: eng-blocking
title: ブロック化で誤差分散を減らす条件を見抜く
category: engineering
subcategory: design
topic: randomized-block-design
type: strategy
difficulty: 2
priority: B
hashtags: [実験計画, ブロック化, 変動要因]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ブロック化 }]
---
## 問題
4処理を、日ごとの環境差が大きい実験で比較したい。日をどう扱うか。
## 方針
日をブロックとし、各日内で4処理を無作為化する。
## 使用公式・定理
乱塊法の加法モデルは
$$Y_{ij}=\mu+\tau_i+\beta_j+\varepsilon_{ij},\qquad \sum_i\tau_i=\sum_j\beta_j=0.$$
## 計算例
$y_{ij}=\mu+\tau_i+\beta_j+\varepsilon_{ij}$ と置けば、日差 $\beta_j$ を残差から分離できる。
各ブロック内に全処理を1回ずつ割り付ける。
## 注意
処理とブロックの交互作用を推定しない加法モデルであることを確認する。
