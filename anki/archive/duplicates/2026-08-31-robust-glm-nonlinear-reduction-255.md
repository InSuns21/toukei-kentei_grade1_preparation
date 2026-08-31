---
id: enginf-robust-sandwich-se
title: 不均一分散頑健分散のサンドイッチ形を読む
category: applied-engineering
subcategory: engineering-linear-inference
topic: robust-covariance
type: recognition
difficulty: 3
priority: A
hashtags:
  - 線形モデル
  - 不均一分散
  - サンドイッチ分散
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 線形モデル
archive_reason: duplicate
canonical_card: reg-heteroskedasticity-pattern
coverage_card: reg-heteroskedasticity-pattern
archive_note: HC0不均一分散頑健分散のサンドイッチ形、通常の等分散分散推定との対応、OLS係数自体は変えず主に標準誤差を頑健化することを
  reg-heteroskedasticity-pattern へ吸収済み。不均一分散と系列・クラスタ相関を区別する注意も正本に保持した。
---
## 問題
最小二乗法のHC0分散推定量を書き、どの仮定を緩和するか答えよ。
## 記号・用語
$x_i^{\mathsf T}$ は計画行列の第 $i$ 行、$e_i$ は最小二乗法残差である。
## 使用公式・定理
$$\widehat V_{\mathrm{HC0}}=(X^{\mathsf T}X)^{-1}
\left(\sum_{i=1}^ne_i^2x_ix_i^{\mathsf T}\right)(X^{\mathsf T}X)^{-1}.$$
## 一手／方針
外側のパンと中央の肉に分けて、通常の最小二乗法分散との違いを見る。
## 答え
誤差の独立性と条件付き平均0を保ちながら、$\operatorname{Var}(\varepsilon_i\mid X)=\sigma_i^2$ の不均一分散を許す。
## 計算例
全 $e_i^2$ を共通 $s^2$ で置けば通常の $s^2(X^{\mathsf T}X)^{-1}$ に対応する。
## 注意
係数推定値自体は最小二乗法のままで、主に標準誤差が変わる。

<!-- CARD -->

---
id: enginf-glm-deviance-residual-output
title: 一般化線形モデル適合度出力から残差逸脱度を判定する
category: applied-engineering
subcategory: engineering-linear-inference
topic: glm-goodness-of-fit
type: recognition
difficulty: 2
priority: A
hashtags:
  - 一般化線形モデル
  - 残差逸脱度
  - ソフトウェア出力
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 一般化線形モデル
archive_reason: duplicate
canonical_card: glm-deviance-definition
coverage_card: glm-deviance-definition
archive_note: 残差逸脱度42・残差自由度40から比1.05を粗い大標本診断として読む数値例を glm-deviance-definition
  へ吸収済み。deviance/dfを機械的合否基準にせず、Pearson X_P^2/df による分散診断と区別する注意も正本に統合した。
---
## 問題
残差逸脱度42.0、残差自由度40の一般化線形モデル出力をどう読むか。
## 記号・用語
残差逸脱度は当てはめモデルと飽和モデルの対数尤度差の2倍である。
## 使用公式・定理
モデルが適切で大標本なら、残差逸脱度は目安として残差自由度と同程度になる。
## 一手／方針
逸脱度と自由度の比を計算し、著しい乖離がないかを見る。
## 答え
$$42/40=1.05.$$
1に近く、この出力だけから著しい不適合や過分散は示されない。
## 計算例
同じ自由度で逸脱度120なら比3で、モデル不足を疑う。
## 注意
この比だけで適合を保証せず、残差パターンも確認する。

<!-- CARD -->

---
id: enginf-nonlinear-gradient-se
title: 非線形回帰の勾配から近似標準誤差を求める
category: applied-engineering
subcategory: engineering-linear-inference
topic: nonlinear-regression
type: calc_step
difficulty: 3
priority: B
hashtags:
  - 線形化
  - デルタ法
  - 非線形回帰
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 線形結合の分布
archive_reason: duplicate
canonical_card: glm-nonlinear-regression-gradient
coverage_card: glm-nonlinear-regression-gradient
archive_note: 非線形関数 g(theta_hat) のデルタ法分散 grad(g)^T V_hat grad(g)、g=beta1
  exp(-beta2 x) の数値例、共分散交差項の注意を Gauss--Newton の局所線形化を扱う
  glm-nonlinear-regression-gradient へ統合済み。同じ一次線形化を更新と推測に使う技能として正本化した。
---
## 問題
$g(\beta_1,\beta_2)=\beta_1e^{-\beta_2x}$、$x=2$、$\widehat\beta=(10,0.5)$、$\widehat V=\operatorname{diag}(1,0.01)$ とする。$g(\widehat\beta)$ の近似標準誤差を求めよ。
## 記号・用語
$\nabla g$ は係数に関する勾配ベクトルである。
## 使用公式・定理
デルタ法により $\operatorname{Var}\{g(\widehat\beta)\}\approx\nabla g^{\mathsf T}\widehat V\nabla g$。
## 一手／方針
予測関数を各係数で偏微分し、推定値を代入する。
## 答え
$$\nabla g=(e^{-1},-2\cdot10e^{-1})^{\mathsf T},$$
$$\widehat{\operatorname{Var}}(g)=e^{-2}+0.01(20e^{-1})^2=5e^{-2},$$
よって $SE=\sqrt5/e\approx0.823$。
## 計算例
点予測は $10e^{-1}\approx3.679$。
## 注意
共分散が非零なら交差項も二次形式に含める。
