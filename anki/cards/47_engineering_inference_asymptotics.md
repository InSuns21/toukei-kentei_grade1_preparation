---
id: engasym-method-moments-consistency
title: モーメント法推定量の一致性を示す
category: applied-engineering
subcategory: engineering-asymptotics
topic: method-of-moments-consistency
type: calc_step
difficulty: 2
priority: A
hashtags: [一致性, モーメント法, 大数の法則]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 一致性 }]
---
## 問題
$E_\theta[X]=m(\theta)$、$\widehat\theta=m^{-1}(\overline X)$ とする。$m^{-1}$ が真値近傍で連続なら一致性を示せ。
## 記号・用語
モーメント法は標本モーメントと理論モーメントを等置する推定法である。
## 使用公式・定理
大数の法則と連続写像定理を使う。
## 一手／方針
まず $\overline X$ の収束先を求め、その後に逆関数を作用させる。
## 答え
$$\overline X\xrightarrow{p}m(\theta),$$
$$\widehat\theta=m^{-1}(\overline X)\xrightarrow{p}m^{-1}\{m(\theta)\}=\theta.$$
## 計算例
指数分布の平均が $1/\lambda$ なら $\widehat\lambda=1/\overline X$ は一致する。
## 注意
$m$ が一対一でないと母数を一意に識別できない。

<!-- CARD -->

---
id: engasym-estimating-equation-linearization
title: 推定方程式をTaylor展開して漸近分布を導く
category: applied-engineering
subcategory: engineering-asymptotics
topic: estimating-equation
type: calc_step
difficulty: 4
priority: S
hashtags: [漸近分散, 推定方程式, Taylor展開]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 漸近分散 }]
---
## 問題
$0=\Psi_n(\widehat\theta)$ を $\theta_0$ の周りで一次展開し、$\widehat\theta-\theta_0$ の近似式を示せ。
## 記号・用語
$\Psi_n'(\theta)$ は推定方程式の母数微分である。
## 使用公式・定理
Taylor展開：
$$\Psi_n(\widehat\theta)=\Psi_n(\theta_0)+\Psi_n'(\theta_0)(\widehat\theta-\theta_0)+o_p(|\widehat\theta-\theta_0|).$$
## 一手／方針
左辺を0と置き、一次項について解く。
## 答え
$$\widehat\theta-\theta_0\approx-[\Psi_n'(\theta_0)]^{-1}\Psi_n(\theta_0).$$
## 計算例
スコア方程式では微分が負の観測情報量となり、最尤推定量の漸近分散へつながる。
## 注意
多次元では微分はJacobian行列となり、可逆性が必要である。

<!-- CARD -->

---
id: engasym-sandwich-m-estimator
title: M推定量のサンドイッチ漸近分散を再生する
category: applied-engineering
subcategory: engineering-asymptotics
topic: m-estimator-sandwich
type: recognition
difficulty: 4
priority: B
hashtags: [漸近分散, M推定量, サンドイッチ分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 漸近分散 }]
---
## 問題
$n^{-1}\sum_i\psi(X_i,\widehat\theta)=0$ で定義される1次元M推定量の漸近分散を書け。
## 記号・用語
$A=E[-\partial\psi(X,\theta_0)/\partial\theta]$、$B=E[\psi(X,\theta_0)^2]$ とする。
## 使用公式・定理
正則条件と $A\ne0$ のもとでM推定量は漸近正規となる。
## 一手／方針
推定方程式の傾きの逆数を左右から掛けるサンドイッチ形で覚える。
## 答え
$$\sqrt n(\widehat\theta-\theta_0)\xrightarrow{d}N(0,A^{-2}B),$$
したがって $\operatorname{Avar}(\widehat\theta)=A^{-2}B/n$。
## 計算例
正しく指定された最尤法では情報等式により $A=B=I_1(\theta_0)$ となる。
## 注意
多次元では $A^{-1}B(A^{-1})^{\mathsf T}$。

<!-- CARD -->

---
id: engasym-local-alternative-power
title: 局所対立仮説下のWald統計量のずれを読む
category: applied-engineering
subcategory: engineering-asymptotics
topic: local-alternatives
type: calc_step
difficulty: 4
priority: B
hashtags: [漸近理論, 局所対立仮説, 検出力]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 最尤推定量の漸近正規性 }]
---
## 問題
$\sqrt n(\widehat\theta-\theta_n)/\sigma\xrightarrow{d}N(0,1)$、局所対立仮説 $\theta_n=\theta_0+h/\sqrt n$ のとき、$Z_n=\sqrt n(\widehat\theta-\theta_0)/\sigma$ の極限分布を求めよ。（ここで $N$ は正規分布を表す。）
## 記号・用語
局所対立仮説は真値と帰無値の差が $n^{-1/2}$ 級で縮む系列である。
## 使用公式・定理
$Z_n=\sqrt n(\widehat\theta-\theta_n)/\sigma+\sqrt n(\theta_n-\theta_0)/\sigma$。
## 一手／方針
推定誤差と局所的な真値のずれを分離する。
## 答え
第2項は $h/\sigma$ なので
$$Z_n\xrightarrow{d}N(h/\sigma,1).$$
## 計算例
$h/\sigma=1$ なら片側5%検定の極限検出力は $1-\Phi(1.645-1)\approx0.259$。
## 注意
固定対立仮説では検出力は通常1へ収束するため、局所対立は検定比較に使う。

<!-- CARD -->

---
id: engasym-delta-risk-ratio
title: 2比率のリスク比の標準誤差をデルタ法で求める
category: applied-engineering
subcategory: engineering-asymptotics
topic: delta-risk-ratio
type: calc_step
difficulty: 3
priority: A
hashtags: [デルタ法, リスク比, 漸近分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: デルタ法 }]
---
## 問題
独立2群で $x_1/n_1=20/100$、$x_0/n_0=10/100$ である。$\log RR$ の近似標準誤差を求めよ。
## 記号・用語
$RR=\widehat p_1/\widehat p_0$ はリスク比である。
## 使用公式・定理
独立二項標本では
$$\operatorname{SE}(\log RR)\approx\sqrt{\frac1{x_1}-\frac1{n_1}+\frac1{x_0}-\frac1{n_0}}.$$
## 一手／方針
各群の事象数と標本数を公式へ代入する。
## 答え
$$SE=\sqrt{1/20-1/100+1/10-1/100}=\sqrt{0.13}\approx0.361.$$
## 計算例
$RR=2$、$\log RR\approx0.693$。
## 注意
事象数0の群があるとこの近似式は直接使えない。

<!-- CARD -->

---
id: enginf-robust-sandwich-se
title: 不均一分散頑健分散のサンドイッチ形を読む
category: applied-engineering
subcategory: engineering-linear-inference
topic: robust-covariance
type: recognition
difficulty: 3
priority: A
hashtags: [線形モデル, 不均一分散, サンドイッチ分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 線形モデル }]
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
id: enginf-logistic-wald-output
title: ロジスティック回帰出力をWald検定する
category: applied-engineering
subcategory: engineering-linear-inference
topic: glm-wald-test
type: calc_step
difficulty: 2
priority: S
hashtags: [一般化線形モデル, Wald検定, ソフトウェア出力]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 一般化線形モデル }]
---
## 問題
係数推定値0.80、標準誤差0.25のロジスティック回帰出力について、$H_0:\beta=0$ のWald統計量と5%両側判定を求めよ。
## 記号・用語
Wald統計量は推定値と帰無値との差を推定標準誤差で標準化した量である。
## 使用公式・定理
大標本で $Z=(\widehat\beta-\beta_0)/\operatorname{SE}(\widehat\beta)\dot\sim N(0,1)$。
## 一手／方針
係数を標準誤差で割り、絶対値を1.96と比較する。
## 答え
$$Z=0.80/0.25=3.2.$$
$3.2>1.96$ なので5%水準で棄却する。
## 計算例
近似95%信頼区間は $0.80\pm1.96(0.25)=(0.31,1.29)$。
## 注意
小標本や完全分離ではWald近似が不安定になり得る。

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
hashtags: [一般化線形モデル, 残差逸脱度, ソフトウェア出力]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 一般化線形モデル }]
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
id: enginf-glm-wald-joint
title: 一般化線形モデルの複数係数をWald検定する
category: applied-engineering
subcategory: engineering-linear-inference
topic: glm-joint-wald
type: calc_step
difficulty: 3
priority: A
hashtags: [一般化線形モデル, 線形制約, Wald検定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 線形制約 }]
---
## 問題
2係数について $R\widehat\beta-r=(1,2)^{\mathsf T}$、この制約差の推定分散共分散行列 $R\widehat V R^{\mathsf T}$ が $\operatorname{diag}(0.25,1)$ である。Wald統計量を求めよ。
## 記号・用語
$R\beta=r$ は同時に課す2本の線形制約である。
## 使用公式・定理
$$W=(R\widehat\beta-r)^{\mathsf T}[R\widehat V R^{\mathsf T}]^{-1}(R\widehat\beta-r)\dot\sim\chi_q^2.$$
## 一手／方針
対角分散行列の逆行列を作り、標準化平方を足す。
## 答え
$$W=1^2/0.25+2^2/1=4+4=8.$$
## 計算例
$\chi^2_{2,0.05}=5.991$ より大きく、5%水準で同時制約を棄却する。
## 注意
線形正規モデルの有限標本F検定と異なり、一般化線形モデルでは通常大標本カイ二乗近似を使う。

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
hashtags: [線形化, デルタ法, 非線形回帰]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 線形結合の分布 }]
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

<!-- CARD -->

---
id: enginf-coefficient-output-engineering
title: 回帰係数出力を工程効果として解釈する
category: applied-engineering
subcategory: engineering-linear-inference
topic: regression-output-interpretation
type: recognition
difficulty: 2
priority: S
hashtags: [線形モデル, 係数解釈, ソフトウェア出力]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 線形モデル }]
---
## 問題
強度を応答、温度と処理法ダミーを説明変数とする回帰で、温度係数が $-0.40$、処理法係数が3.2であった。交互作用なしとして解釈せよ。
## 記号・用語
ダミー係数は基準処理法との差、連続変数係数は他変数を固定した1単位変化の平均差である。
## 使用公式・定理
$E[Y\mid x,d]=\beta_0+\beta_1x+\beta_2d$。
## 一手／方針
各係数について「他を固定」を付けて単位と比較群を明示する。
## 答え
温度が1単位高いと平均強度は0.40低い。温度が同じなら、処理法1は基準処理法より平均強度が3.2高い。
## 計算例
温度が5単位高く処理法1なら、基準条件との差は $-0.40(5)+3.2=1.2$。
## 注意
観察研究では係数を直ちに因果効果と断定しない。

<!-- CARD -->

---
id: enginf-estimability-linear-function
title: 線形関数の推定可能性を判定する
category: applied-engineering
subcategory: engineering-linear-inference
topic: estimability
type: recognition
difficulty: 4
priority: B
hashtags: [線形モデル, 推定可能性, 線形結合]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 線形結合の分布 }]
---
## 問題
階数落ちした線形モデル $E[Y]=X\beta$ で、$c^{\mathsf T}\beta$ が推定可能である条件を答えよ。
## 記号・用語
推定可能とは、期待値が $c^{\mathsf T}\beta$ に等しい観測の線形結合が存在すること。
## 使用公式・定理
$c^{\mathsf T}\beta$ が推定可能である必要十分条件は、$c$ が $X$ の行空間に属すること、すなわちある $a$ があり $c=X^{\mathsf T}a$ となること。
## 一手／方針
観測の線形結合 $a^{\mathsf T}Y$ の期待値を計算する。
## 答え
$$E[a^{\mathsf T}Y]=a^{\mathsf T}X\beta=(X^{\mathsf T}a)^{\mathsf T}\beta.$$
したがって $X^{\mathsf T}a=c$ を満たす $a$ が存在するとき推定可能。
## 計算例
過剰パラメータ化した一元配置でも群平均差は推定可能である。
## 注意
個々のパラメータが一意でなくても、特定の対比は推定可能なことがある。

<!-- CARD -->

---
id: enginf-restricted-least-squares
title: 等式制約付き最小二乗推定量を計算する
category: applied-engineering
subcategory: engineering-linear-inference
topic: restricted-least-squares
type: calc_step
difficulty: 4
priority: B
hashtags: [線形制約, 制約付き推定, 最小二乗法]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 線形制約 }]
---
## 問題
非制約最小二乗法が $\widehat\beta=(3,1)^{\mathsf T}$、$(X^{\mathsf T}X)^{-1}=I$ で、制約 $\beta_1+\beta_2=2$ を課す。制約付き推定量を求めよ。
## 記号・用語
$R=(1,1)$、$r=2$ として制約を $R\beta=r$ と書く。
## 使用公式・定理
$$\widehat\beta_R=\widehat\beta-(X^{\mathsf T}X)^{-1}R^{\mathsf T}
[R(X^{\mathsf T}X)^{-1}R^{\mathsf T}]^{-1}(R\widehat\beta-r).$$
## 一手／方針
制約違反量を、制約方向へ射影して差し引く。
## 答え
$R\widehat\beta-r=4-2=2$、$RR^{\mathsf T}=2$ より
$$\widehat\beta_R=\binom31-\binom11\frac12(2)=\binom20.$$
## 計算例
$2+0=2$ で制約を満たす。
## 注意
制約が真なら分散低下が期待できるが、誤った制約はバイアスを生む。

<!-- CARD -->

---
id: enginf-normal-equations-orthogonality
title: 正規方程式から残差の直交性を示す
category: applied-engineering
subcategory: engineering-linear-inference
topic: normal-equations
type: calc_step
difficulty: 2
priority: S
hashtags: [線形モデル, 正規方程式, 残差]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 線形モデル }]
---
## 問題
残差 $\boldsymbol e=\boldsymbol Y-\boldsymbol X\widehat{\boldsymbol\beta}$ が計画行列の各列と直交することを示せ。
## 記号・用語
直交とは内積が0、すなわち $\boldsymbol X^{\mathsf T}\boldsymbol e=\boldsymbol0$ であること。
## 使用公式・定理
残差平方和 $S(\boldsymbol b)=\|\boldsymbol Y-\boldsymbol X\boldsymbol b\|^2$ の勾配は $-2\boldsymbol X^{\mathsf T}(\boldsymbol Y-\boldsymbol X\boldsymbol b)$。
## 一手／方針
最小点で勾配を0と置き、残差の定義を代入する。
## 答え
$$\frac{\partial S}{\partial\boldsymbol b}\bigg|_{\widehat{\boldsymbol\beta}}
=-2\boldsymbol X^{\mathsf T}(\boldsymbol Y-\boldsymbol X\widehat{\boldsymbol\beta})=\boldsymbol0,$$
よって $\boldsymbol X^{\mathsf T}\boldsymbol e=\boldsymbol0$。
## 計算例
切片列が含まれれば $\boldsymbol1^{\mathsf T}\boldsymbol e=\sum_i e_i=0$。
## 注意
直交する相手は一般に応答 $\boldsymbol Y$ ではなく、$\boldsymbol X$ の列空間である。
