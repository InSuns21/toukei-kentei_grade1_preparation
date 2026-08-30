---
id: enginf-linear-model-dimensions
title: 線形モデルの行列次元を確認する
category: applied-engineering
subcategory: engineering-linear-inference
topic: linear-model
type: recognition
difficulty: 1
priority: S
hashtags:
  - 線形モデル
  - 行列
  - 次元
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 線形モデル
archive_reason: duplicate
canonical_card: reg-multiple-model-matrix
archive_note: Y=X beta+epsilon の行列表記と各次元を確認する同一論点。数理側の重回帰行列表記を正本にする。
---
## 問題
$n$ 観測、切片を含む $k$ 係数の線形モデル $\boldsymbol Y=\boldsymbol X\boldsymbol\beta+\boldsymbol\varepsilon$ で、各行列・ベクトルの次元を答えよ。
## 記号・用語
$n$ は観測数、$k$ は推定する回帰係数の総数である。
## 使用公式・定理
行列積 $AB$ は、$A$ の列数と $B$ の行数が一致するとき定義される。
## 一手／方針
右辺の積が左辺と同じ $n\times1$ になるよう逆算する。
## 答え
$$\boldsymbol Y:n\times1,\quad \boldsymbol X:n\times k,\quad
\boldsymbol\beta:k\times1,\quad \boldsymbol\varepsilon:n\times1.$$
## 計算例
$\boldsymbol X^{\mathsf T}\boldsymbol X$ は $k\times k$、$\boldsymbol X^{\mathsf T}\boldsymbol Y$ は $k\times1$ である。
## 注意
切片を含むとき、説明変数の本数が $k-1$ でも係数総数は $k$ である。

<!-- CARD -->

---
id: enginf-ols-matrix-numeric
title: 行列公式で最小二乗推定量を計算する
category: applied-engineering
subcategory: engineering-linear-inference
topic: ols-estimation
type: calc_step
difficulty: 2
priority: S
hashtags:
  - 線形モデル
  - 最小二乗法
  - 行列計算
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 線形モデル
archive_reason: duplicate
canonical_card: reg-multiple-model-matrix
archive_note: (X^T X)^{-1}X^T Y を2次行列で計算するだけ。数理側の導出カードにも同型の2x2数値例がある。
---
## 問題
$\boldsymbol X^{\mathsf T}\boldsymbol X=\begin{pmatrix}4&2\\2&2\end{pmatrix}$、$\boldsymbol X^{\mathsf T}\boldsymbol Y=(10,8)^{\mathsf T}$ のとき、$\widehat{\boldsymbol\beta}$ を求めよ。
## 記号・用語
$\widehat{\boldsymbol\beta}$ は残差平方和を最小にする最小二乗推定量である。
## 使用公式・定理
列フルランクなら
$$\widehat{\boldsymbol\beta}=(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}\boldsymbol X^{\mathsf T}\boldsymbol Y.$$
## 一手／方針
2次正方行列の逆行列を求め、右からベクトルを掛ける。
## 答え
$$ (\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}
=\frac14\begin{pmatrix}2&-2\\-2&4\end{pmatrix},$$
$$\widehat{\boldsymbol\beta}=\frac14\binom{20-16}{-20+32}=\binom13.$$
## 計算例
正規方程式へ戻すと $(4+6,2+6)^{\mathsf T}=(10,8)^{\mathsf T}$。
## 注意
逆行列は $\boldsymbol X$ ではなく $\boldsymbol X^{\mathsf T}\boldsymbol X$ に対して取る。

<!-- CARD -->

---
id: enginf-coefficient-confidence-interval
title: 回帰係数の信頼区間をソフトウェア出力から求める
category: applied-engineering
subcategory: engineering-linear-inference
topic: coefficient-ci
type: calc_step
difficulty: 1
priority: S
hashtags:
  - 線形モデル
  - 信頼区間
  - ソフトウェア出力
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 線形モデル
archive_reason: duplicate
canonical_card: reg-slope-t-test
archive_note: 推定係数±t臨界値×SEという同じ区間構成。一般の係数でも傾きでも解法moveは同一。
---
## 問題
回帰出力で係数推定値1.8、標準誤差0.5、残差自由度12であった。95%信頼区間を求めよ。$t_{12,0.025}=2.179$ とする。
## 記号・用語
$t_{\nu,\alpha}$ は自由度 $\nu$ のt分布の上側 $\alpha$ 点である。
## 使用公式・定理
$$\widehat\beta_j\pm t_{n-k,\alpha/2}\operatorname{SE}(\widehat\beta_j).$$
## 一手／方針
標準誤差に臨界値を掛け、推定値の両側へ加減する。
## 答え
$$1.8\pm2.179(0.5)=1.8\pm1.0895,$$
よって $(0.711,2.890)$。
## 計算例
区間が0を含まないため、5%両側検定で係数0を棄却する。
## 注意
標準誤差を分散と取り違えて平方根を重ねない。

<!-- CARD -->

---
id: enginf-regression-anova-output
title: 回帰分散分析出力の欠損欄を埋める
category: applied-engineering
subcategory: engineering-linear-inference
topic: regression-anova
type: calc_step
difficulty: 2
priority: S
hashtags:
  - 線形モデル
  - 分散分析表
  - ソフトウェア出力
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 線形モデル
archive_reason: duplicate
canonical_card: reg-overall-f-test
archive_note: SSR・SSEからMSR・MSE・Fを作る操作は重回帰の全体F検定と同一。R2計算はreg-r-squared側で保持する。
---
## 問題
回帰自由度3、残差自由度16、$SSR=120$、$SSE=80$ の回帰分散分析表について、$MSR,MSE,F,R^2$ を求めよ。
## 記号・用語
$SSR$ は回帰平方和、$SSE$ は残差平方和、$SST=SSR+SSE$ は全平方和である。
## 使用公式・定理
$MSR=SSR/df_R$、$MSE=SSE/df_E$、$F=MSR/MSE$、$R^2=SSR/SST$。
## 一手／方針
各平方和を対応する自由度で割ってからF比を作る。
## 答え
$$MSR=120/3=40,\quad MSE=80/16=5,$$
$$F=40/5=8,\quad R^2=120/(120+80)=0.60.$$
## 計算例
観測数は全自由度 $3+16=19$ に1を足して $n=20$。
## 注意
$R^2$ の分母は $SSE$ ではなく $SST$ である。

<!-- CARD -->

---
id: engproc-ar2-root-stability
title: AR(2)工程モデルの定常性を根で判定する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: ar2-stationarity
type: calc_step
difficulty: 3
priority: A
hashtags:
  - 自己回帰過程
  - AR2モデル
  - 定常性
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 自己回帰過程
archive_reason: duplicate
canonical_card: ts-ar-causality-check
archive_note: AR(2)多項式の根を解き、全て単位円外か判定する同一操作。因果性と定常因果解の条件はこの設定では同じ根条件を使う。
---
## 問題
$X_t=0.4X_{t-1}+0.2X_{t-2}+\varepsilon_t$ は定常か、AR多項式の根で判定せよ。
## 記号・用語
AR多項式は $\phi(z)=1-0.4z-0.2z^2$。
## 使用公式・定理
すべての根の絶対値が1より大きければ因果的定常解をもつ。
## 一手／方針
二次方程式を解き、2根の絶対値を比較する。
## 答え
$$0.2z^2+0.4z-1=0,$$
$$z=\frac{-0.4\pm\sqrt{0.96}}{0.4}\approx1.449,-3.449.$$
両方の絶対値が1を超えるので定常。
## 計算例
係数和 $0.6<1$ もこの例では安定性と整合する。
## 注意
一般のAR(2)で係数の絶対値だけを個別に見る判定は不十分。

<!-- CARD -->

---
id: engproc-random-walk-difference-data
title: 累積工程系列を差分して増分へ戻す
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: differencing-random-walk
type: calc_step
difficulty: 1
priority: A
hashtags:
  - 時系列解析
  - ランダムウォーク
  - 差分
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ランダムウォーク
archive_reason: duplicate
canonical_card: ts-difference-random-walk
archive_note: 累積系列を1階差分してランダムウォークの増分へ戻す同じ操作。common側はARIMA(0,1,0)まで接続するため情報量が多い。
---
## 問題
累積系列 $(X_0,X_1,X_2,X_3)=(10,12,11,15)$ の1階差分を求め、ランダムウォークの増分として解釈せよ。
## 記号・用語
$\Delta X_t=X_t-X_{t-1}$ は1階差分である。
## 使用公式・定理
ランダムウォーク $X_t=X_{t-1}+\varepsilon_t$ では $\Delta X_t=\varepsilon_t$。
## 一手／方針
隣接する累積値を後の値から前の値を引く。
## 答え
$$\Delta X_1=2,\qquad \Delta X_2=-1,\qquad \Delta X_3=4.$$
したがって観測された増分列は $(2,-1,4)$。
## 計算例
増分を累積すると $10+2-1+4=15$ に戻る。
## 注意
差分後の平均が0とは限らず、ドリフトが残る場合がある。

<!-- CARD -->

---
id: engproc-random-walk-drift-calibration
title: ドリフト付きランダムウォークの平均と分散を計算する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: random-walk-drift
type: calc_step
difficulty: 2
priority: A
hashtags:
  - ランダムウォーク
  - ドリフト
  - センサー誤差
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ランダムウォーク
archive_reason: duplicate
canonical_card: stoch-random-walk-mean-variance
archive_note: 独立増分の和について平均をn倍・分散をn倍する同一move。工学側には吸収確率・平均吸収時間など別論点を残す。
---
## 問題
センサーの累積誤差を $X_n=\sum_{k=1}^n\xi_k$ とし、増分は独立同分布で $E[\xi_k]=0.02$、$\operatorname{Var}(\xi_k)=0.09$ とする。50時点後の平均と標準偏差を求めよ。
## 記号・用語
$X_n$ は累積誤差、$\xi_k$ は1時点ごとの誤差増分、$\operatorname{SD}(X_n)=\sqrt{\operatorname{Var}(X_n)}$ は標準偏差である。
## 使用公式・定理
独立な和について $E[X_n]=nE[\xi_1]$、$\operatorname{Var}(X_n)=n\operatorname{Var}(\xi_1)$。
## 一手／方針
平均は増分平均を50倍し、分散は増分分散を50倍してから平方根を取る。
## 答え
$$E[X_{50}]=50(0.02)=1,$$
$$\operatorname{Var}(X_{50})=50(0.09)=4.5,\qquad \operatorname{SD}(X_{50})=\sqrt{4.5}\approx2.121.$$
## 計算例
ドリフト補正後 $X_n-0.02n$ の平均は0になる。
## 注意
標準偏差を50倍せず、分散を50倍する。
