---
id: engqc-p-chart-baseline-estimation
title: 群別データからp管理図の基準不適合品率を推定する
category: applied-engineering
subcategory: engineering-quality
topic: p-chart-baseline-estimation
type: calc_step
difficulty: 1
priority: S
hashtags:
  - 管理図
  - p管理図
  - 基準値推定
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 管理図
archive_reason: duplicate
canonical_card: engqc-control-chart-selection
archive_note: Phase Iの基準不適合品率推定からp管理図限界までcanonical cardへ統合済み。
---
## 問題
Phase Iで群サイズ $(80,120,100)$、不適合品数 $(4,9,7)$ を得た。$p$ 管理図の基準不適合品率 $\overline p$ を求めよ。
## 記号・用語
$d_i,n_i$ は第 $i$ 群の不適合品数と検査数である。Phase Iは過去データから管理基準を作る段階である。
## 使用公式・定理
$$\overline p=\frac{\sum_i d_i}{\sum_i n_i}.$$
## 一手／方針
群率の単純平均ではなく、全不適合品数を全検査数で割る。
## 答え
$$\overline p=\frac{4+9+7}{80+120+100}=\frac{20}{300}=0.0667.$$
## 計算例
各群の中心線は同じ0.0667だが、管理限界の幅は各 $n_i$ に応じて変える。
## 注意
特殊原因が疑われる群を除くときは、原因確認後に基準値を再推定する。

<!-- CARD -->

---
id: engqc-p-chart-constant-n
title: 標本数一定のp管理図限界を計算する
category: applied-engineering
subcategory: engineering-quality
topic: p-chart
type: calc_step
difficulty: 2
priority: S
hashtags:
  - 管理図
  - p管理図
  - 不適合品率
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 管理図
archive_reason: duplicate
canonical_card: engqc-control-chart-selection
archive_note: p管理図の3シグマ限界と数値計算は、管理図選択を含むcanonical cardへ統合済み。
---
## 問題
基準不適合品率 $\overline p=0.04$、各群 $n=200$ のp管理図の3シグマ限界を求めよ。
## 記号・用語
p管理図は群ごとの不適合品率 $\widehat p_i=X_i/n_i$ を監視する。$SE$ は標準誤差、$CL,UCL,LCL$ は中心線、上側管理限界、下側管理限界である。
## 使用公式・定理
$$UCL=\overline p+3\sqrt{\frac{\overline p(1-\overline p)}n},\qquad
LCL=\max\left\{0,\overline p-3\sqrt{\frac{\overline p(1-\overline p)}n}\right\}.$$
## 一手／方針
二項比率の標準偏差を求めて3倍する。
## 答え
$SE=\sqrt{0.04(0.96)/200}\approx0.01386$ より、$UCL\approx0.0816$、$CL=0.04$、$LCL=0$。
## 計算例
200個中18不適合なら0.09で管理限界外。
## 注意
負の下方限界は0へ切り上げる。3シグマ限界は二項分布の正規近似であり、期待度数が小さいときは正確限界を検討する。

<!-- CARD -->

---
id: engqc-p-chart-varying-n
title: 標本数が異なるp管理図限界を計算する
category: applied-engineering
subcategory: engineering-quality
topic: p-chart-varying-size
type: calc_step
difficulty: 2
priority: A
hashtags:
  - 管理図
  - p管理図
  - 標本数
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 管理図
archive_reason: duplicate
canonical_card: engqc-control-chart-selection
archive_note: 標本数可変時の群別p管理図限界はcanonical cardへ統合済み。
---
## 問題
$\overline p=0.05$ で、ある群の標本数が $n_i=100$ のとき、その群専用の3シグマ限界を求めよ。
## 記号・用語
標本数が変わるp管理図では管理限界も群ごとに変わる。$SE$ は標準誤差、$CL,UCL,LCL$ は中心線、上側管理限界、下側管理限界である。
## 使用公式・定理
$$UCL_i=\overline p+3\sqrt{\frac{\overline p(1-\overline p)}{n_i}},\qquad LCL_i=\max\left\{0,\overline p-3\sqrt{\frac{\overline p(1-\overline p)}{n_i}}\right\}.$$
## 一手／方針
全体の平均標本数ではなく当該群の $n_i$ を代入する。
## 答え
$SE=\sqrt{0.05(0.95)/100}\approx0.02179$ より、$UCL\approx0.1154$、$LCL=0$。
## 計算例
$n_i=400$ なら限界幅は半分になる。
## 注意
標本数が小さい群ほど管理限界は広い。これは二項分布の正規近似による限界で、低率・小標本では正確限界を検討する。

<!-- CARD -->

---
id: engqc-np-chart
title: np管理図の管理限界を計算する
category: applied-engineering
subcategory: engineering-quality
topic: np-chart
type: calc_step
difficulty: 2
priority: A
hashtags:
  - 管理図
  - np管理図
  - 不適合品数
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 管理図
archive_reason: duplicate
canonical_card: engqc-control-chart-selection
archive_note: 標本数一定の不適合品数をnp管理図で扱う判断と限界計算をcanonical cardへ統合済み。
---
## 問題
各群 $n=100$、基準不適合品率 $p_0=0.08$ のnp管理図限界を求めよ。
## 記号・用語
np管理図は標本数が一定のとき不適合品数 $X_i$ を監視する。$CL,UCL,LCL$ は中心線、上側管理限界、下側管理限界である。
## 使用公式・定理
$CL=np_0$、$UCL=np_0+3\sqrt{np_0(1-p_0)}$、$LCL=\max\{0,np_0-3\sqrt{np_0(1-p_0)}\}$。
## 一手／方針
二項分布の平均と標準偏差を使う。
## 答え
$CL=8$、$\sqrt{100(0.08)(0.92)}\approx2.713$ より $UCL\approx16.14$、$LCL=0$。
## 計算例
整数データでは17個以上を上方異常と判定する。
## 注意
標本数が変動する場合はp管理図を使う。3シグマ限界は二項分布の正規近似で、期待度数が小さいときは正確限界を検討する。

<!-- CARD -->

---
id: engqc-c-chart
title: c管理図の管理限界を計算する
category: applied-engineering
subcategory: engineering-quality
topic: c-chart
type: calc_step
difficulty: 1
priority: A
hashtags:
  - 管理図
  - c管理図
  - 不適合数
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 管理図
archive_reason: duplicate
canonical_card: engqc-control-chart-selection
archive_note: 検査機会一定の不適合数に対するc管理図の選択と限界計算をcanonical cardへ統合済み。
---
## 問題
検査単位当たりの平均不適合数が $\overline c=9$ のc管理図限界を求めよ。
## 記号・用語
c管理図は検査機会数が一定の単位に生じた不適合数を監視する。$CL,UCL,LCL$ は中心線、上側管理限界、下側管理限界である。
## 使用公式・定理
ポアソン分布モデルでは平均と分散がともに $\overline c$ なので、正規近似による3シグマ限界は $CL=\overline c$、$UCL=\overline c+3\sqrt{\overline c}$、$LCL=\max\{0,\overline c-3\sqrt{\overline c}\}$。
## 一手／方針
平均の平方根を標準偏差として使う。
## 答え
$\sqrt9=3$ より、$UCL=18$、$CL=9$、$LCL=0$。
## 計算例
不適合数19は上方管理限界外。
## 注意
1製品を不適合品か否かで数えるp・np管理図と、不適合箇所を数えるc管理図を区別する。平均不適合数が小さいと3シグマ正規近似は粗い。

<!-- CARD -->

---
id: engqc-u-chart
title: u管理図の可変検査量限界を計算する
category: applied-engineering
subcategory: engineering-quality
topic: u-chart
type: calc_step
difficulty: 2
priority: A
hashtags:
  - 管理図
  - u管理図
  - 単位当たり不適合数
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 管理図
archive_reason: duplicate
canonical_card: engqc-control-chart-selection
archive_note: 検査量可変の単位当たり不適合数に対するu管理図の選択と限界計算をcanonical cardへ統合済み。
---
## 問題
平均単位当たり不適合数 $\overline u=0.5$、群 $i$ の検査量 $n_i=25$ のu管理図限界を求めよ。
## 記号・用語
$u_i=c_i/n_i$ は単位当たり不適合数で、検査量が群ごとに異なる場合に使う。$CL,UCL,LCL$ は中心線、上側管理限界、下側管理限界である。
## 使用公式・定理
$$UCL_i=\overline u+3\sqrt{\overline u/n_i},\qquad LCL_i=\max\{0,\overline u-3\sqrt{\overline u/n_i}\}.$$
## 一手／方針
当該群の検査量で平均を割って標準偏差を作る。
## 答え
$\sqrt{0.5/25}\approx0.1414$ より、$UCL\approx0.9243$、$LCL\approx0.0757$。
## 計算例
$c_i=25$ なら $u_i=1.0$ で上方異常。
## 注意
検査量一定ならc管理図でも表現できる。不適合数が少ない場合は3シグマ正規近似の精度に注意する。
