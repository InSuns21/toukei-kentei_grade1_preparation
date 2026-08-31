---
id: enginf-vif-numeric
title: 補助回帰から分散拡大係数を計算する
category: applied-engineering
subcategory: engineering-linear-inference
topic: multicollinearity
type: calc_step
difficulty: 2
priority: A
hashtags:
  - 線形モデル
  - 多重共線性
  - 分散拡大係数
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 線形モデル
archive_reason: duplicate
canonical_card: reg-multicollinearity-vif
coverage_card: reg-multicollinearity-vif
archive_note: 補助回帰の R_j^2=0.80 から VIF=1/(1-R_j^2)=5 を求める操作は common
  正本と数値例まで同一。工学側にあった標準誤差の増幅率 sqrt(VIF)=sqrt(5) も正本へ吸収済み。
---
## 問題
説明変数 $X_j$ を他の説明変数へ回帰した決定係数が $R_j^2=0.80$ である。分散拡大係数を求めよ。
## 記号・用語
分散拡大係数（variance inflation factor; VIF）は多重共線性による係数分散の増幅度を表す。
## 使用公式・定理
$$\operatorname{VIF}_j=\frac1{1-R_j^2}.$$
## 一手／方針
補助回帰で説明されなかった割合の逆数を取る。
## 答え
$$\operatorname{VIF}_j=\frac1{1-0.80}=5.$$
## 計算例
標準誤差は直交計画の場合の $\sqrt5\approx2.24$ 倍に拡大する。
## 注意
VIFが大きくても予測精度が必ず低いとは限らず、個別係数解釈への影響が中心である。

<!-- CARD -->

---
id: enginf-wls-two-weights
title: 重み付き最小二乗法を2点で計算する
category: applied-engineering
subcategory: engineering-linear-inference
topic: weighted-least-squares
type: calc_step
difficulty: 2
priority: A
hashtags:
  - 線形モデル
  - 重み付き最小二乗法
  - 不均一分散
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 線形モデル
archive_reason: duplicate
canonical_card: reg-gls-estimator
coverage_card: reg-gls-estimator
archive_note: 分散の逆数を重みとするWLSは、GLS正本で Omega
  が対角の特殊形として導出済み。正本には逆分散重みの数値例もあり、2観測の数値だけを変えた工学側カードに独自の操作は残らない。
---
## 問題
共通平均 $\mu$ を、独立な $Y_1=10,Y_2=14$ から推定する。分散がそれぞれ1と4のときWLS推定値を求めよ。
## 記号・用語
WLSは分散の逆数を重みとして残差平方和を最小化する方法である。
## 使用公式・定理
共通平均のWLS推定量は
$$\widehat\mu=\frac{\sum_iw_iY_i}{\sum_iw_i},\qquad w_i=1/\sigma_i^2.$$
## 一手／方針
精度の高い観測へ大きい逆分散重みを与える。
## 答え
$w_1=1,w_2=1/4$ より
$$\widehat\mu=\frac{10+(1/4)14}{1+1/4}=\frac{13.5}{1.25}=10.8.$$
## 計算例
単純平均12より、分散が小さい観測10へ近い。
## 注意
重みを標準偏差の逆数ではなく分散の逆数とする。

<!-- CARD -->

---
id: enginf-adjusted-r2-output
title: 自由度調整済み決定係数を計算する
category: applied-engineering
subcategory: engineering-linear-inference
topic: adjusted-r-squared
type: calc_step
difficulty: 2
priority: A
hashtags:
  - 線形モデル
  - 自由度調整済み決定係数
  - モデル比較
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 線形モデル
archive_reason: duplicate
canonical_card: reg-sst-decomposition
coverage_card: reg-sst-decomposition
archive_note: 自由度調整済み決定係数 1-(1-R^2)(n-1)/(n-p-1) の計算は reg-sst-decomposition
  が決定係数・平方和分解と一続きで既に扱い、数値計算と説明変数追加時の解釈も保持している。工学側は同公式への数値代入のみ。
---
## 問題
$n=25$、説明変数数 $p=4$、$R^2=0.60$ の切片付き回帰で、自由度調整済み決定係数を求めよ。
## 記号・用語
$p$ は切片を除く説明変数数である。
## 使用公式・定理
$$\bar R^2=1-(1-R^2)\frac{n-1}{n-p-1}.$$
## 一手／方針
未説明割合を自由度比で膨らませて1から引く。
## 答え
$$\bar R^2=1-0.40\frac{24}{20}=1-0.48=0.52.$$
## 計算例
$R^2=0.60$ より小さく、説明変数数への罰則が入る。
## 注意
説明変数追加で $R^2$ は下がらないが、$\bar R^2$ は下がることがある。
