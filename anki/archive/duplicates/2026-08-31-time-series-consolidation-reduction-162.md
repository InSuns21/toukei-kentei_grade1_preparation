---
id: ts-linear-detrend
title: 線形トレンドを推定して除去する
category: applied-common
subcategory: applied-time-series
topic: trend-removal
type: calc_step
difficulty: 2
priority: B
hashtags:
  - トレンド
  - 最小二乗法
  - 定常化
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: トレンド・季節性
archive_reason: duplicate
canonical_card: ts-arima-definition
archive_note: 線形トレンドの最小二乗推定と除去の数値例を、決定論的トレンド・確率的トレンド・季節性で定常化手段を選ぶARIMA canonical
  cardへ統合済み。単純な回帰代入だけの独立カードは残さない。
---
## 問題
$(X_1,X_2,X_3)=(3,5,7)$ に線形トレンド $a+bt$ を当てはめ、トレンド除去後の系列を求めよ。
## 記号・用語
$a$ は切片、$b$ は1時点当たりの増分、$e_t=X_t-(a+bt)$ はトレンド除去後の残差である。
## 使用公式・定理
**最小二乗公式**：
$$\widehat b=\frac{\sum_t(t-\bar t)(X_t-\bar X)}{\sum_t(t-\bar t)^2},\qquad \widehat a=\bar X-\widehat b\bar t.$$
## 一手／方針
時点を説明変数として回帰し、各観測から推定トレンドを引く。
## 答え
推定トレンドは
$$
\widehat X_t=1+2t
$$
であり、トレンド除去後の系列は
$$
(0,0,0)
$$
である。

## 計算例
時点は $(1,2,3)$、観測は $(3,5,7)$ なので
$$
\bar t=\frac{1+2+3}{3}=2,
\qquad
\bar X=\frac{3+5+7}{3}=5.
$$
傾きの分子は
$$
\begin{aligned}
\sum_t(t-\bar t)(X_t-\bar X)
&=(-1)(-2)+0\cdot0+1\cdot2\\
&=4,
\end{aligned}
$$
分母は
$$
\begin{aligned}
\sum_t(t-\bar t)^2
&=(-1)^2+0^2+1^2\\
&=2.
\end{aligned}
$$
したがって
$$
\widehat b=\frac42=2,
$$
$$
\widehat a=\bar X-\widehat b\bar t=5-2\cdot2=1.
$$
推定トレンド値は
$$
(1+2\cdot1,\ 1+2\cdot2,\ 1+2\cdot3)=(3,5,7)
$$
なので、元の観測から引けば
$$
(3,5,7)-(3,5,7)=(0,0,0).
$$

## 注意
トレンド除去後も自己相関や季節性が残っていないかを確認する。

<!-- CARD -->

---
id: ts-software-arima-coefficients
title: ARIMA推定結果の係数表を解釈する
category: applied-common
subcategory: applied-time-series
topic: software-output-interpretation
type: calc_step
difficulty: 3
priority: A
hashtags:
  - ARIMAモデル
  - ソフトウェア出力
  - 係数検定
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ソフトウェアの出力結果の解釈
archive_reason: duplicate
canonical_card: ts-software-residual-diagnostics
archive_note: AR係数のWald検定、近似信頼区間、定常域確認、単位根検定との区別を、Ljung--Box残差診断と一続きで読むソフトウェア出力canonical
  cardへ統合済み。
---
## 問題
ARIMA$(1,0,0)$ の出力が「AR(1)係数 $0.72$、標準誤差 $0.15$」であった。係数の有意性と定常性を判定せよ。
## 記号・用語
$\widehat\phi$ はAR係数の推定値、$\operatorname{SE}(\widehat\phi)$ はその標準誤差である。
## 使用公式・定理
**Wald統計量**：$z=\widehat\phi/\operatorname{SE}(\widehat\phi)$。大標本で両側5%臨界値は $1.96$。AR$(1)$ の定常条件は $|\phi|<1$。
## 一手／方針
係数を標準誤差で割って有意性を判定し、推定係数の絶対値で定常性を確認する。
## 答え
$$z=0.72/0.15=4.8>1.96$$
なので係数0を棄却する。また $|0.72|<1$ なので推定モデルは定常である。
## 計算例
近似95%信頼区間は $0.72\pm1.96(0.15)=(0.426,1.014)$ である。
## 注意
推定値が定常域内でも、信頼区間が1を含むなら単位根の有無は専用検定も含め慎重に判断する。

<!-- CARD -->

---
id: ts-yule-walker-ar2
title: AR(2)のYule–Walker方程式を解く
category: applied-common
subcategory: applied-time-series
topic: yule-walker
type: calc_step
difficulty: 4
priority: A
hashtags:
  - ARIMAモデル
  - Yule-Walker方程式
  - AR2
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ARIMAモデル
archive_reason: duplicate
canonical_card: ts-acf-pacf-identification
archive_note: AR(2)のYule--Walker方程式とrho1=0.6,rho2=0.4からphi1=0.5625,phi2=0.0625を求める数値例を、ACF/PACFモデル同定とPACF導出のcanonical
  cardへ統合済み。
---
## 問題
AR(2)で $\rho(1)=0.6,\rho(2)=0.4$。Yule–Walker方程式から $\phi_1,\phi_2$ を求めよ。
## 記号・用語
$X_t$ は時刻 $t$ の観測、$\varepsilon_t$ は平均0で一定分散のホワイトノイズ、$B$ は $BX_t=X_{t-1}$ を満たすバックシフト演算子である。$\gamma(h)$ と $\rho(h)$ はラグ $h$ の自己共分散と自己相関である。
## 使用公式・定理
$$\rho(1)=\phi_1+\phi_2\rho(1),\quad
\rho(2)=\phi_1\rho(1)+\phi_2.$$
## 一手／方針
与えられた自己相関を2本のYule--Walker方程式へ代入し、連立一次方程式を消去法で解く。
## 答え
$0.6=\phi_1+0.6\phi_2$、$0.4=0.6\phi_1+\phi_2$ を解き
$$\phi_1=0.5625,\qquad\phi_2=0.0625.$$
第1式から $\phi_1=0.6-0.6\phi_2$。これを第2式へ代入すると $0.4=0.36+0.64\phi_2$ なので $\phi_2=0.0625$、さらに $\phi_1=0.5625$ を得る。
## 計算例
第1式から $\phi_1=0.6-0.6\phi_2$ と代入する。
## 注意
標本ACFを代入した解は推定値である。
