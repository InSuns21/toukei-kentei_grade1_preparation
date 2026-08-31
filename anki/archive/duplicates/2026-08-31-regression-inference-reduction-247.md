---
id: enginf-extra-sum-squares
title: 縮小モデルと完全モデルから追加平方和を求める
category: applied-engineering
subcategory: engineering-linear-inference
topic: nested-model-f-test
type: calc_step
difficulty: 2
priority: S
hashtags:
  - 線形制約
  - 追加平方和
  - F検定
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 線形制約
archive_reason: duplicate
canonical_card: reg-partial-f-test
coverage_card: reg-partial-f-test
archive_note: 縮小モデルと完全モデルの残差平方和差を q 自由度で割り、完全モデルのMSEで標準化する部分F検定は
  reg-partial-f-test が一般形・数値例・q=1でF=t^2まで扱う。工学側は同じ式への別数値代入のみ。
---
## 問題
縮小モデルの $SSE_R=140$、完全モデルの $SSE_F=100$、追加係数数 $q=2$、完全モデルの残差自由度20とする。部分F統計量を求めよ。
## 記号・用語
縮小モデルは帰無仮説の制約を課したモデル、完全モデルは制約を外したモデルである。
## 使用公式・定理
$$F=\frac{(SSE_R-SSE_F)/q}{SSE_F/(n-k_F)}.$$
## 一手／方針
減少した残差平方和を係数1個当たりにし、完全モデルの残差平均平方で割る。
## 答え
$$F=\frac{(140-100)/2}{100/20}=\frac{20}{5}=4.$$
## 計算例
$F_{2,20,0.05}\approx3.49$ より大きいので、追加した2係数はまとめて有意である。
## 注意
分母には完全モデルの $SSE_F$ と残差自由度を使う。

<!-- CARD -->

---
id: enginf-overall-regression-f
title: 決定係数から回帰全体のF統計量を求める
category: applied-engineering
subcategory: engineering-linear-inference
topic: overall-f-test
type: calc_step
difficulty: 2
priority: A
hashtags:
  - 線形モデル
  - F検定
  - 決定係数
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
coverage_card: reg-overall-f-test
archive_note: R^2 から全傾き0を検定する F={R^2/p}/{(1-R^2)/(n-p-1)} は reg-overall-f-test
  が平方和表示とR^2表示の両方から導出・計算する正本。工学側は数値代入のみ。
---
## 問題
観測数 $n=30$、説明変数3個、$R^2=0.45$ の切片付き回帰で、全傾き0を検定するF統計量を求めよ。
## 記号・用語
説明変数数を $p=3$ とし、係数総数は切片を含めて $p+1$。
## 使用公式・定理
$$F=\frac{R^2/p}{(1-R^2)/(n-p-1)}.$$
## 一手／方針
説明された変動と説明されない変動を、それぞれの自由度で割って比を取る。
## 答え
$$F=\frac{0.45/3}{0.55/26}=\frac{0.15}{0.0211538}\approx7.09.$$
## 計算例
分子自由度3、分母自由度26のF分布と比較する。
## 注意
ここでの $p$ は切片を除く説明変数数である。

<!-- CARD -->

---
id: enginf-mean-response-ci
title: 平均応答の信頼区間を計算する
category: applied-engineering
subcategory: engineering-linear-inference
topic: mean-response-ci
type: calc_step
difficulty: 3
priority: A
hashtags:
  - 線形モデル
  - 平均応答
  - 信頼区間
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 線形結合の分布
archive_reason: duplicate
canonical_card: reg-mean-response-ci
coverage_card: reg-mean-response-ci
archive_note: 平均応答の信頼区間は reg-mean-response-ci の正本へ重回帰の一般行列表記 x0^T(X^TX)^(-1)x0
  まで吸収済み。工学側は h0=0.09 の数値代入だけで独自技能は残らない。
---
## 問題
点 $x_0$ での予測平均が50、$s=4$、$x_0^{\mathsf T}(X^{\mathsf T}X)^{-1}x_0=0.09$、$t_{20,0.025}=2.086$ とする。平均応答の95%信頼区間を求めよ。
## 記号・用語
$x_0$ は切片成分を含む新しい説明変数ベクトルである。
## 使用公式・定理
平均応答の標準誤差は $s\sqrt{x_0^{\mathsf T}(X^{\mathsf T}X)^{-1}x_0}$。
## 一手／方針
二次形式の平方根に残差標準偏差を掛ける。
## 答え
$$SE=4\sqrt{0.09}=1.2,$$
$$50\pm2.086(1.2)=50\pm2.503,$$
よって $(47.50,52.50)$。
## 計算例
これは同じ条件での多数個体の平均を推測する区間である。
## 注意
新しい1観測の予測区間に必要な先頭の1は入れない。

<!-- CARD -->

---
id: enginf-new-observation-pi
title: 新しい観測値の予測区間を計算する
category: applied-engineering
subcategory: engineering-linear-inference
topic: prediction-interval
type: calc_step
difficulty: 3
priority: S
hashtags:
  - 線形モデル
  - 予測区間
  - 線形結合の分布
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 線形結合の分布
archive_reason: duplicate
canonical_card: reg-mean-response-ci
coverage_card: reg-mean-response-ci
archive_note: 新規1観測の予測区間 s sqrt(1+x0^T(X^TX)^(-1)x0) と平均応答CIとの違いは
  reg-mean-response-ci が単回帰・重回帰の両表記で一体的に扱う。工学側は同公式への数値代入のみ。
---
## 問題
点 $x_0$ での予測平均が50、残差標準偏差 $s=4$、$x_0^{\mathsf T}(X^{\mathsf T}X)^{-1}x_0=0.09$、$t_{20,0.025}=2.086$ とする。新しい1観測の95%予測区間を求めよ。
## 記号・用語
予測誤差には平均推定の不確実性と新しい誤差の分散が含まれる。
## 使用公式・定理
新観測の標準誤差は
$$s\sqrt{1+x_0^{\mathsf T}(X^{\mathsf T}X)^{-1}x_0}.$$
## 一手／方針
二次形式へ1を加えてから平方根を取る。
## 答え
$$SE_{\mathrm{pred}}=4\sqrt{1.09}\approx4.176,$$
$$50\pm2.086(4.176)\approx50\pm8.711,$$
よって $(41.29,58.71)$。
## 計算例
平均応答区間 $(47.50,52.50)$ より広い。
## 注意
平均応答の信頼区間と新観測の予測区間を答案で明確に区別する。

<!-- CARD -->

---
id: enginf-leverage-numeric
title: ハット行列からレバレッジを判定する
category: applied-engineering
subcategory: engineering-linear-inference
topic: leverage
type: calc_step
difficulty: 2
priority: A
hashtags:
  - 線形モデル
  - レバレッジ
  - 回帰診断
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 線形モデル
archive_reason: duplicate
canonical_card: reg-hat-matrix-properties
coverage_card: reg-hat-matrix-properties
archive_note: ハット行列対角要素、sum h_ii=k、平均 k/n は reg-hat-matrix-properties
  が導出済み。工学側固有だった探索的目安 h_ii>2k/n と n=20,k=4,h=0.55 の判定も正本の注意へ吸収済み。
---
## 問題
$n=20$、係数総数 $k=4$ の回帰で、観測 $i$ のレバレッジが $h_{ii}=0.55$ である。目安 $2k/n$ で高レバレッジか判定せよ。
## 記号・用語
$h_{ii}$ はハット行列 $H=X(X^{\mathsf T}X)^{-1}X^{\mathsf T}$ の第 $i$ 対角成分である。
## 使用公式・定理
$\sum_i h_{ii}=k$。実務上の高レバレッジ目安として $h_{ii}>2k/n$ を使うことがある。
## 一手／方針
係数総数から閾値を計算し、観測値と比較する。
## 答え
$$2k/n=2(4)/20=0.40.$$
$0.55>0.40$ なので高レバレッジ候補である。
## 計算例
平均レバレッジは $k/n=0.20$。
## 注意
レバレッジが高いだけでは応答方向の外れ値とは限らない。

<!-- CARD -->

---
id: enginf-studentized-residual
title: 内的スチューデント化残差を計算する
category: applied-engineering
subcategory: engineering-linear-inference
topic: studentized-residual
type: calc_step
difficulty: 2
priority: A
hashtags:
  - 線形モデル
  - 残差診断
  - スチューデント化残差
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 線形モデル
archive_reason: duplicate
canonical_card: reg-hat-matrix-properties
coverage_card: reg-hat-matrix-properties
archive_note: 内部標準化残差 r_i=e_i/{s sqrt(1-h_ii)} は reg-hat-matrix-properties が残差分散
  Var(e_i)=sigma^2(1-h_ii) から導出し、数値計算と外部スチューデント化残差との区別まで保持する。工学側は単純数値例のみ。
---
## 問題
残差 $e_i=3$、残差標準偏差 $s=2$、レバレッジ $h_{ii}=0.36$ のとき、内的スチューデント化残差を求めよ。
## 記号・用語
内的スチューデント化残差は、全観測から推定した $s$ で残差を標準化した量である。
## 使用公式・定理
$$r_i=\frac{e_i}{s\sqrt{1-h_{ii}}}.$$
## 一手／方針
残差分散がレバレッジにより $1-h_{ii}$ 倍になることを補正する。
## 答え
$$r_i=\frac3{2\sqrt{0.64}}=\frac3{1.6}=1.875.$$
## 計算例
単純な $e_i/s=1.5$ より大きくなる。
## 注意
外的スチューデント化残差は観測 $i$ を除いて推定した分散を使う別の量である。

<!-- CARD -->

---
id: enginf-cooks-distance
title: Cookの距離を数値計算する
category: applied-engineering
subcategory: engineering-linear-inference
topic: cooks-distance
type: calc_step
difficulty: 3
priority: A
hashtags:
  - 線形モデル
  - Cookの距離
  - 影響診断
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 線形モデル
archive_reason: duplicate
canonical_card: reg-cooks-distance
coverage_card: reg-cooks-distance
archive_note: Cookの距離 D_i=(r_i^2/k) h_ii/(1-h_ii) は reg-cooks-distance
  と完全に同一。工学側の r=2,k=4,h=0.20 -> D=0.25 と探索的目安 4/n も正本へ吸収済み。
---
## 問題
係数総数 $k=4$、内的スチューデント化残差 $r_i=2$、レバレッジ $h_{ii}=0.20$ のときCookの距離を求めよ。
## 記号・用語
Cookの距離 $D_i$ は観測 $i$ を除くことによる当てはめ全体の変化を測る。
## 使用公式・定理
$$D_i=\frac{r_i^2}{k}\frac{h_{ii}}{1-h_{ii}}.$$
## 一手／方針
標準化残差の大きさとレバレッジの倍率を掛ける。
## 答え
$$D_i=\frac{2^2}{4}\frac{0.20}{0.80}=1\cdot0.25=0.25.$$
## 計算例
目安 $4/n$ を使い $n=40$ なら、$0.25>0.10$ なので要確認である。
## 注意
閾値は絶対的な検定基準ではなく、元データと再推定結果も確認する。
