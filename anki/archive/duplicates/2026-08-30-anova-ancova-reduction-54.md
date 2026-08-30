---
id: anova-ancova-adjusted-mean
title: 共分散分析の調整平均を計算する
category: math-data-analysis
subcategory: math-anova
topic: ancova-adjusted-mean
type: calc_step
difficulty: 3
priority: A
hashtags:
  - 共分散分析
  - 調整平均
  - 共変量
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 共分散分析
archive_reason: duplicate
canonical_card: anova-ancova-model
archive_note: 共通傾きモデルの確認後に調整平均を計算する数値例を、ANCOVAの正本へ統合済み。
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
hashtags:
  - 共分散分析
  - 交互作用
  - 平行回帰
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 共分散分析
archive_reason: duplicate
canonical_card: anova-ancova-model
archive_note: 群×共変量交互作用を追加した完全モデルとの部分F検定による平行回帰確認を、ANCOVAの正本へ統合済み。
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
