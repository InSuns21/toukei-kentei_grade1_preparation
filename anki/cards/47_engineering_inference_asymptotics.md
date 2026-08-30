---
id: enginf-interaction-design-matrix
title: ダミー変数と交互作用項を含む計画行列を作る
category: applied-engineering
subcategory: engineering-linear-inference
topic: interaction-design-matrix
type: calc_step
difficulty: 2
priority: S
hashtags: [線形モデル, ダミー変数, 交互作用項]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 線形モデル }]
---
## 問題
$E[Y]=\beta_0+\beta_1x+\beta_2D+\beta_3xD$ で、観測 $(x,D)=(2,0),(3,1)$ に対応する計画行列を作れ。
## 記号・用語
$D\in\{0,1\}$ は処理法ダミー、$xD$ は連続変数と処理法の交互作用項である。
## 使用公式・定理
計画行列の各行は係数 $(\beta_0,\beta_1,\beta_2,\beta_3)$ に掛かる値 $(1,x,D,xD)$。
## 一手／方針
各観測で積 $xD$ を計算して列順に並べる。
## 答え
$$X=\begin{pmatrix}1&2&0&0\\1&3&1&3\end{pmatrix}.$$
## 計算例
$D=0$ では平均 $\beta_0+\beta_1x$、$D=1$ では $(\beta_0+\beta_2)+(\beta_1+\beta_3)x$。
## 注意
交互作用を入れるときは通常、対応する主効果も残す。

<!-- CARD -->

---
id: enginf-interaction-slope-test
title: 交互作用係数から群別傾きの差を判定する
category: applied-engineering
subcategory: engineering-linear-inference
topic: interaction-coefficient
type: calc_step
difficulty: 2
priority: S
hashtags: [線形モデル, 交互作用項, Wald検定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 線形モデル }]
---
## 問題
$E[Y]=\beta_0+\beta_1x+\beta_2D+\beta_3xD$ の出力で $\widehat\beta_1=1.2$、$\widehat\beta_3=-0.5$、$\operatorname{SE}(\widehat\beta_3)=0.2$ である。群別傾きと交互作用のWald判定を求めよ。
## 記号・用語
$\beta_3$ は $D=1$ 群と基準群 $D=0$ の傾きの差である。
## 使用公式・定理
$D=0$ の傾きは $\beta_1$、$D=1$ は $\beta_1+\beta_3$。帰無仮説 $H_0:\beta_3=0$ のもとで
$$Z=\frac{\widehat\beta_3}{\operatorname{SE}(\widehat\beta_3)}\dot\sim N(0,1),$$
5%両側検定では $|Z|>1.96$ なら棄却する。
## 一手／方針
群別に $D$ を代入し、傾き差を標準化する。
## 答え
傾きは $D=0$ で1.2、$D=1$ で $1.2-0.5=0.7$。$Z=-0.5/0.2=-2.5$ なので5%両側で交互作用なしを棄却する。
## 計算例
処理法1では $x$ の効果が基準群より0.5小さい。
## 注意
$\beta_2$ は $x=0$ における群差であり、傾き差ではない。

<!-- CARD -->

---
id: enginf-dummy-reference-contrast
title: 基準カテゴリを変えたダミー係数を換算する
category: applied-engineering
subcategory: engineering-linear-inference
topic: dummy-variable
type: calc_step
difficulty: 2
priority: A
hashtags: [線形モデル, ダミー変数, 線形対比]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 線形対比 }]
---
## 問題
3処理A・B・CでAを基準とした係数が切片10、B係数2、C係数$-1$ である。Cを基準とした切片、A係数、B係数を求めよ。
## 記号・用語
基準カテゴリの係数は0と置き、他の係数は基準平均との差である。
## 使用公式・定理
群平均を先に復元し、新しい基準平均との差を作る。
## 一手／方針
$\mu_A,\mu_B,\mu_C$ を求めてからCを引く。
## 答え
群平均は $(10,12,9)$。したがってC基準では切片9、A係数 $10-9=1$、B係数 $12-9=3$。
## 計算例
基準を変えても当てはめ群平均は変わらない。
## 注意
係数値は基準カテゴリに依存するが、推定可能な群間差は不変である。

<!-- CARD -->

---
id: enginf-glm-three-components
title: 一般化線形モデルの3要素をモデル式から識別する
category: applied-engineering
subcategory: engineering-linear-inference
topic: glm-components
type: recognition
difficulty: 2
priority: A
hashtags: [一般化線形モデル, リンク関数, 線形予測子]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 一般化線形モデル }]
---
## 問題
$Y_i\mid x_i\sim\operatorname{Poisson}(\mu_i)$、$\log\mu_i=\beta_0+\beta_1x_i$ について、一般化線形モデルの3要素を答えよ。
## 記号・用語
3要素は確率成分、系統成分、リンク関数である。
## 使用公式・定理
確率成分は応答の指数型分布族、系統成分は線形予測子 $\eta_i=x_i^{\mathsf T}\beta$、リンクは $g(\mu_i)=\eta_i$。
## 一手／方針
分布、右辺の線形式、平均と線形式を結ぶ変換を切り分ける。
## 答え
確率成分はポアソン分布、系統成分は $\eta_i=\beta_0+\beta_1x_i$、リンク関数は $g(\mu)=\log\mu$。
## 計算例
二項ロジットモデルなら確率成分は二項分布、リンクはロジット。
## 注意
リンク関数は応答そのものではなく条件付き平均へ作用する。

<!-- CARD -->

---
id: enginf-exponential-family-mean-variance
title: 指数型分布族から平均と分散を微分で求める
category: applied-engineering
subcategory: engineering-linear-inference
topic: exponential-family
type: calc_step
difficulty: 3
priority: B
hashtags: [一般化線形モデル, 指数型分布族, 分散関数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 一般化線形モデル }]
---
## 問題
$f(y;\theta,\phi)=\exp[\{y\theta-b(\theta)\}/a(\phi)+c(y,\phi)]$ の平均と分散を $b$ の微分で表せ。
## 記号・用語
$\theta$ は正準母数、$\phi$ は分散母数、$b$ は累積母関数に対応する関数である。
## 使用公式・定理
対数正規化条件を $\theta$ で1回・2回微分する。
## 一手／方針
スコアの期待値0と、その分散または2階微分を使う。
## 答え
$$E[Y]=b'(\theta),\qquad \operatorname{Var}(Y)=a(\phi)b''(\theta).$$
## 計算例
ポアソン分布では $b(\theta)=e^\theta$、$a(\phi)=1$ なので平均と分散はいずれも $e^\theta$。
## 注意
$a(\phi)$ の規約は分布族の表現により異なるため密度式と一緒に読む。

<!-- CARD -->

---
id: enginf-binomial-glm-loglikelihood
title: 二項一般化線形モデルの対数尤度を書く
category: applied-engineering
subcategory: engineering-linear-inference
topic: binomial-glm-likelihood
type: calc_step
difficulty: 3
priority: B
hashtags: [一般化線形モデル, 二項分布, 対数尤度]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 一般化線形モデル }]
---
## 問題
観測間で独立に $Y_i\sim\operatorname{Binomial}(m_i,p_i)$、$\operatorname{logit}(p_i)=x_i^{\mathsf T}\beta$ とする。$\beta$ に依存する対数尤度を書け。
## 記号・用語
$m_i$ は試行数、$Y_i$ は成功数、$\eta_i=x_i^{\mathsf T}\beta$ は線形予測子である。
## 使用公式・定理
$p_i=e^{\eta_i}/(1+e^{\eta_i})$、$\log(1-p_i)=-\log(1+e^{\eta_i})$。
## 一手／方針
二項対数尤度へロジットの逆変換を代入する。
## 答え
定数項を除き
$$\ell(\beta)=\sum_i\left[Y_i\eta_i-m_i\log(1+e^{\eta_i})\right].$$
## 計算例
微分するとスコアは $\sum_i x_i(Y_i-m_ip_i)$。
## 注意
ベルヌーイデータは $m_i=1$ の特別な場合である。

<!-- CARD -->

---
id: engasym-empirical-cdf-point
title: 経験分布関数の一点での漸近分布を求める
category: applied-engineering
subcategory: engineering-asymptotics
topic: empirical-cdf
type: calc_step
difficulty: 2
priority: A
hashtags: [中心極限定理, 経験分布関数, 漸近分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 中心極限定理 }]
---
## 問題
固定した $x$ で経験分布関数 $F_n(x)$ の漸近分布を求めよ。
## 記号・用語
$F_n(x)=n^{-1}\sum_{i=1}^n\boldsymbol1_{\{X_i\le x\}}$、$F(x)=P(X_i\le x)$。
## 使用公式・定理
指示変数は成功確率 $F(x)$ のベルヌーイ変数なので標本平均の中心極限定理を使う。
## 一手／方針
経験分布関数をベルヌーイ標本平均と見なす。
## 答え
$$\sqrt n\{F_n(x)-F(x)\}\xrightarrow{d}
N(0,F(x)\{1-F(x)\}).$$
## 計算例
$F(x)=0.5,n=100$ なら $F_n(x)$ の近似標準誤差は0.05。
## 注意
これは固定した一点の結果で、関数全体の一様収束とは別である。

<!-- CARD -->

---
id: engasym-sample-quantile-variance
title: 標本分位点の漸近分散を計算する
category: applied-engineering
subcategory: engineering-asymptotics
topic: sample-quantile
type: calc_step
difficulty: 4
priority: B
hashtags: [漸近分散, 標本分位点, デルタ法]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 漸近分散 }]
---
## 問題
独立同分布な連続標本について、$p$ 分位点 $q_p$ の近傍で分布関数 $F$ が微分可能、密度 $f$ が連続かつ $f(q_p)>0$ とする。標本 $p$ 分位点 $\widehat q_p$ の漸近分散を答えよ。
## 記号・用語
$F(q_p)=p$、$\widehat q_p$ は経験分布に基づく標本分位点である。
## 使用公式・定理
分位点の漸近正規性：
$$\sqrt n(\widehat q_p-q_p)\xrightarrow{d}N\left(0,\frac{p(1-p)}{f(q_p)^2}\right).$$
## 一手／方針
経験分布の分散 $p(1-p)$ を逆関数の微分 $1/f(q_p)$ で変換する。
## 答え
近似分散は
$$\operatorname{Avar}(\widehat q_p)=\frac{p(1-p)}{n f(q_p)^2}.$$
## 計算例
中央値なら $p=1/2$ なので $1/\{4nf(q_{1/2})^2\}$。
## 注意
$f(q_p)=0$ では通常の $\sqrt n$ 漸近正規性を使えない。

<!-- CARD -->

---
id: engasym-sample-variance-normal
title: 正規標本の標本分散の漸近分布を求める
category: applied-engineering
subcategory: engineering-asymptotics
topic: sample-variance-asymptotics
type: calc_step
difficulty: 3
priority: A
hashtags: [中心極限定理, 標本分散, 漸近分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 漸近分散 }]
---
## 問題
$X_i\overset{\mathrm{iid}}\sim N(\mu,\sigma^2)$ の不偏標本分散 $S^2$ の漸近分布を求めよ。（ここで $N$ は正規分布を表す。）
## 記号・用語
$S^2=(n-1)^{-1}\sum_i(X_i-\overline X)^2$。
## 使用公式・定理
正規標本では $(n-1)S^2/\sigma^2\sim\chi^2_{n-1}$、また $U_\nu\sim\chi_\nu^2$ なら $(U_\nu-\nu)/\sqrt{2\nu}\xrightarrow{d}N(0,1)$。
## 一手／方針
カイ二乗変数の平均 $n-1$ と分散 $2(n-1)$ で標準化する。
## 答え
$$\frac{(n-1)S^2/\sigma^2-(n-1)}{\sqrt{2(n-1)}}
=\frac{\sqrt{n-1}(S^2-\sigma^2)}{\sqrt2\,\sigma^2}\xrightarrow{d}N(0,1).$$
$\sqrt n/\sqrt{n-1}\to1$ とSlutskyの定理より
$$\sqrt n(S^2-\sigma^2)\xrightarrow{d}N(0,2\sigma^4).$$
## 計算例
$n=100,\widehat\sigma^2=9$ ならプラグイン標準誤差は $\sqrt{2(9^2)/100}\approx1.273$。
## 注意
非正規分布では漸近分散に第4中心モーメントが現れる。

<!-- CARD -->

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
id: engasym-asymptotic-bias-mse
title: 漸近バイアスを含む近似平均二乗誤差を計算する
category: applied-engineering
subcategory: engineering-asymptotics
topic: asymptotic-mse
type: calc_step
difficulty: 3
priority: B
hashtags: [漸近分散, バイアス, 平均二乗誤差]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 漸近分散 }]
---
## 問題
$E[\widehat\theta_n]-\theta\approx b/n$、$\operatorname{Var}(\widehat\theta_n)\approx V/n$ とする。1次近似平均二乗誤差を書け。
## 記号・用語
平均二乗誤差は分散とバイアス平方の和である。
## 使用公式・定理
$$\operatorname{MSE}(\widehat\theta)=\operatorname{Var}(\widehat\theta)+\operatorname{Bias}(\widehat\theta)^2.$$
## 一手／方針
与えられた次数をそのまま代入し、$n^{-1}$ と $n^{-2}$ を区別する。
## 答え
$$\operatorname{MSE}(\widehat\theta_n)\approx\frac Vn+\frac{b^2}{n^2}.$$
## 計算例
大標本では通常 $V/n$ が主要項となる。
## 注意
バイアスが $n^{-1/2}$ 級ならバイアス平方も分散と同じ $n^{-1}$ 級になる。

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
id: engasym-multivariate-linear-combination
title: 多変量漸近正規分布から線形結合を取り出す
category: applied-engineering
subcategory: engineering-asymptotics
topic: multivariate-asymptotic-normality
type: calc_step
difficulty: 2
priority: A
hashtags: [漸近分散, 線形結合の分布, 多変量正規分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 漸近分散 }]
---
## 問題
$\sqrt n(\widehat\beta-\beta)\xrightarrow{d}N_2(0,\Sigma)$、$\Sigma=\begin{pmatrix}4&1\\1&9\end{pmatrix}$ とする。$\widehat\beta_1-\widehat\beta_2$ の漸近分散定数を求めよ。（ここで $N$ は正規分布を表す。）
## 記号・用語
漸近分散定数は実際の近似分散に現れる $1/n$ より前の係数である。
## 使用公式・定理
線形結合 $a^{\mathsf T}\widehat\beta$ の漸近分散定数は $a^{\mathsf T}\Sigma a$。
## 一手／方針
$a=(1,-1)^{\mathsf T}$ を二次形式へ代入する。
## 答え
$$a^{\mathsf T}\Sigma a=4+9-2(1)=11.$$
したがって近似分散は $11/n$。
## 計算例
和なら $a=(1,1)$ で分散定数は $4+9+2=15$。
## 注意
差の分散では共分散項の符号が負になる。

<!-- CARD -->

---
id: engasym-sample-size-mean-precision
title: 漸近信頼区間の幅から必要標本数を求める
category: applied-engineering
subcategory: engineering-asymptotics
topic: asymptotic-sample-size
type: calc_step
difficulty: 2
priority: S
hashtags: [中心極限定理, 標本数設計, 信頼区間]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 中心極限定理 }]
---
## 問題
標準偏差が約12の工程平均を、95%信頼区間の半幅3以内で推定したい。正規近似で必要な最小標本数を求めよ。
## 記号・用語
半幅 $E$ は点推定値から信頼区間端点までの距離である。
## 使用公式・定理
母平均の正規近似区間の半幅は $E=z_{0.025}\sigma/\sqrt n$。
## 一手／方針
$n$ について解き、最後に切り上げる。
## 答え
$$n\ge\left(\frac{1.96(12)}3\right)^2=61.4656.$$
したがって最小標本数は $n=62$。
## 計算例
$n=61$ へ切り捨てると目標半幅をわずかに超える。
## 注意
事前の標準偏差12が不確かなら余裕を持たせる。

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
id: engasym-clt-sum-probability
title: 中心極限定理で合計値の超過確率を近似する
category: applied-engineering
subcategory: engineering-asymptotics
topic: central-limit-theorem
type: calc_step
difficulty: 2
priority: S
hashtags: [中心極限定理, 正規近似, 合計]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 中心極限定理 }]
---
## 問題
独立同分布な部品重量の平均が10、分散が4である。100個の合計が1030を超える確率を正規近似せよ。
## 記号・用語
$S_n=\sum_{i=1}^nX_i$ とする。
## 使用公式・定理
中心極限定理により
$$\frac{S_n-n\mu}{\sigma\sqrt n}\xrightarrow{d}N(0,1).$$
## 一手／方針
合計の平均 $n\mu$ と標準偏差 $\sigma\sqrt n$ で標準化する。
## 答え
$$z=\frac{1030-1000}{2\sqrt{100}}=1.5,$$
$$P(S_{100}>1030)\approx1-\Phi(1.5)\approx0.0668.$$
## 計算例
閾値1020なら $z=1$ で超過確率は約0.1587。
## 注意
元分布が連続か不明なので連続性補正はここでは行っていない。

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
id: engasym-delta-odds-ratio
title: 2×2表の対数オッズ比の標準誤差を求める
category: applied-engineering
subcategory: engineering-asymptotics
topic: delta-odds-ratio
type: calc_step
difficulty: 2
priority: A
hashtags: [デルタ法, オッズ比, 漸近分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: デルタ法 }]
---
## 問題
2×2表のセル度数が $a=40,b=20,c=10,d=30$ のとき、$\log\widehat{OR}$ の近似標準誤差を求めよ。
## 記号・用語
$\widehat{OR}=ad/(bc)$ は標本オッズ比である。
## 使用公式・定理
$$\operatorname{SE}(\log\widehat{OR})\approx\sqrt{1/a+1/b+1/c+1/d}.$$
## 一手／方針
4セルの逆数を足して平方根を取る。
## 答え
$$SE=\sqrt{1/40+1/20+1/10+1/30}
=\sqrt{0.20833}\approx0.456.$$
## 計算例
$\widehat{OR}=6$、$\log\widehat{OR}\approx1.792$。
## 注意
セル度数が小さい場合は正規近似の精度に注意する。

<!-- CARD -->

---
id: engasym-wald-ci-generic
title: 漸近正規推定量からWald信頼区間を作る
category: applied-engineering
subcategory: engineering-asymptotics
topic: wald-confidence-interval
type: calc_step
difficulty: 1
priority: S
hashtags: [漸近分散, Wald信頼区間, 最尤推定量]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 漸近分散 }]
---
## 問題
$\widehat\theta=2.5$、推定漸近標準誤差0.4のとき、95% Wald信頼区間を求めよ。
## 記号・用語
Wald区間は推定量の近似正規性を用いる区間である。
## 使用公式・定理
$$\widehat\theta\pm z_{0.025}\widehat{\operatorname{SE}}(\widehat\theta),\qquad z_{0.025}=1.96.$$
## 一手／方針
標準誤差に1.96を掛けて推定値へ加減する。
## 答え
$$2.5\pm1.96(0.4)=2.5\pm0.784,$$
よって $(1.716,3.284)$。
## 計算例
帰無値0は区間外なので5%両側Wald検定では棄却する。
## 注意
母数空間の境界を区間が越える場合は変換区間や尤度区間も検討する。

<!-- CARD -->

---
id: enginf-vif-numeric
title: 補助回帰から分散拡大係数を計算する
category: applied-engineering
subcategory: engineering-linear-inference
topic: multicollinearity
type: calc_step
difficulty: 2
priority: A
hashtags: [線形モデル, 多重共線性, 分散拡大係数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 線形モデル }]
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
hashtags: [線形モデル, 重み付き最小二乗法, 不均一分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 線形モデル }]
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
id: enginf-gls-whitening
title: 一般化最小二乗法を白色化変換として説明する
category: applied-engineering
subcategory: engineering-linear-inference
topic: generalized-least-squares
type: calc_step
difficulty: 3
priority: A
hashtags: [線形モデル, 一般化最小二乗法, 白色化]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 線形モデル }]
---
## 問題
$\operatorname{Var}(\varepsilon)=\sigma^2\Omega$ で、$C^{\mathsf T}C=\Omega^{-1}$ とする。一般化最小二乗法（generalized least squares; GLS）が変換後最小二乗法になることを示せ。
## 記号・用語
$\Omega$ は既知の正定値な誤差分散共分散構造（尺度行列）、$C$ は白色化行列である。
## 使用公式・定理
モデル左から $C$ を掛けると $CY=CX\beta+C\varepsilon$。
## 一手／方針
変換後誤差の分散を計算し、最小二乗法公式を戻す。
## 答え
$$\operatorname{Var}(C\varepsilon)=\sigma^2C\Omega C^{\mathsf T}=\sigma^2I,$$
したがって
$$\widehat\beta_{\mathrm{GLS}}=(X^{\mathsf T}\Omega^{-1}X)^{-1}X^{\mathsf T}\Omega^{-1}Y.$$
## 計算例
$\Omega$ が対角なら一般化最小二乗法は逆分散重みのWLSになる。
## 注意
$\Omega$ の推定誤差がある場合は有限標本分布が変わり得る。

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
id: enginf-logistic-irls-one-step
title: ロジスティック回帰のIRLS作業応答を計算する
category: applied-engineering
subcategory: engineering-linear-inference
topic: glm-irls
type: calc_step
difficulty: 4
priority: B
hashtags: [一般化線形モデル, IRLS, 推定計算]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 一般化線形モデル }]
---
## 問題
二項ロジットモデルの1観測で $y=1$、現在の $\eta=0$ とする。反復再重み付き最小二乗法（iteratively reweighted least squares; IRLS）の作業応答 $z$ と重み $w$ を求めよ。
## 記号・用語
$\mu=p$ は条件付き平均、$z$ は線形化した作業応答、$w$ は各反復で用いる重みである。
## 使用公式・定理
ロジットリンクでは
$$z=\eta+\frac{y-p}{p(1-p)},\qquad w=p(1-p).$$
## 一手／方針
$\eta=0$ から $p=0.5$ を求めて代入する。
## 答え
$$p=0.5,\qquad z=0+\frac{1-0.5}{0.25}=2,\qquad w=0.25.$$
## 計算例
$y=0$ なら同じ重みで $z=-2$。
## 注意
一般の二項試行数付きデータでは重みに試行数が掛かる。

<!-- CARD -->

---
id: enginf-poisson-mean
title: ポアソン回帰から期待件数を計算する
category: applied-engineering
subcategory: engineering-linear-inference
topic: poisson-regression
type: calc_step
difficulty: 1
priority: S
hashtags: [一般化線形モデル, ポアソン回帰, 期待件数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 一般化線形モデル }]
---
## 問題
$\log\mu=1.2+0.3x$ のポアソン回帰で $x=2$ の期待件数を求めよ。
## 記号・用語
$\mu=E[Y\mid x]$ は条件付き期待件数、対数リンクは $\log\mu=\eta$ である。
## 使用公式・定理
逆リンクは $\mu=e^\eta$。
## 一手／方針
線形予測子を求めて指数を取る。
## 答え
$$\eta=1.2+0.3(2)=1.8,\qquad \mu=e^{1.8}\approx6.05.$$
## 計算例
$x$ が1増えると期待件数は $e^{0.3}\approx1.35$ 倍。
## 注意
ポアソン回帰では条件付き分散も基本モデル上は $\mu$ である。

<!-- CARD -->

---
id: enginf-poisson-offset-rate
title: オフセット付きポアソン回帰で発生率を扱う
category: applied-engineering
subcategory: engineering-linear-inference
topic: poisson-offset
type: calc_step
difficulty: 2
priority: S
hashtags: [一般化線形モデル, ポアソン回帰, オフセット]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 一般化線形モデル }]
---
## 問題
$\log E[Y]=\log t+\beta_0$、$\beta_0=\log0.02$、曝露時間 $t=500$ のとき期待故障数を求めよ。
## 記号・用語
$\log t$ は係数を1に固定したオフセット、$e^{\beta_0}$ は単位曝露当たりの発生率である。
## 使用公式・定理
$E[Y]=t\exp(\beta_0)$。
## 一手／方針
率0.02に曝露時間を掛ける。
## 答え
$$E[Y]=500(0.02)=10.$$
## 計算例
曝露時間が1000なら期待故障数20となる。
## 注意
オフセットの係数は推定せず1に固定する。

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
id: enginf-glm-link-selection
title: 応答分布と標準リンクを対応させる
category: applied-engineering
subcategory: engineering-linear-inference
topic: glm-link-functions
type: recognition
difficulty: 1
priority: S
hashtags: [一般化線形モデル, リンク関数, 分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 一般化線形モデル }]
---
## 問題
正規・二項・ポアソン応答に対する代表的な標準リンクを答えよ。
## 記号・用語
リンク関数 $g$ は条件付き平均 $\mu$ と線形予測子 $\eta=X\beta$ を $g(\mu)=\eta$ で結ぶ。
## 使用公式・定理
代表的な正準リンクは、正規で恒等、二項でロジット、ポアソンで対数である。
## 一手／方針
平均の取り得る範囲を実数全体へ写す変換を対応させる。
## 答え
$$\text{正規}:g(\mu)=\mu,\quad
\text{二項}:g(p)=\log\frac p{1-p},\quad
\text{ポアソン}:g(\mu)=\log\mu.$$
## 計算例
ロジットと対数リンクは、それぞれ確率を $(0,1)$、平均を $(0,\infty)$ に保つ。
## 注意
標準リンク以外も選べるため、分布だけからリンクが一意に決まるわけではない。

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
id: enginf-adjusted-r2-output
title: 自由度調整済み決定係数を計算する
category: applied-engineering
subcategory: engineering-linear-inference
topic: adjusted-r-squared
type: calc_step
difficulty: 2
priority: A
hashtags: [線形モデル, 自由度調整済み決定係数, モデル比較]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 線形モデル }]
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

<!-- CARD -->

---
id: enginf-ols-unbiased-condition
title: 最小二乗法の不偏性を条件付き期待値から導く
category: applied-engineering
subcategory: engineering-linear-inference
topic: ols-unbiasedness
type: calc_step
difficulty: 2
priority: S
hashtags: [線形モデル, 不偏性, 外生性]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 線形モデル }]
---
## 問題
$\boldsymbol X$ が列フルランクで、$E[\boldsymbol\varepsilon\mid\boldsymbol X]=\boldsymbol0$ のもとで、最小二乗法が条件付き不偏であることを示せ。
## 記号・用語
条件付き不偏とは $E[\widehat{\boldsymbol\beta}\mid\boldsymbol X]=\boldsymbol\beta$ をいう。
## 使用公式・定理
$\boldsymbol Y=\boldsymbol X\boldsymbol\beta+\boldsymbol\varepsilon$ と最小二乗法公式を用いる。
## 一手／方針
応答モデルを最小二乗法公式へ代入し、誤差項を分離する。
## 答え
$$\widehat{\boldsymbol\beta}
=\boldsymbol\beta+(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}\boldsymbol X^{\mathsf T}\boldsymbol\varepsilon,$$
したがって
$$E[\widehat{\boldsymbol\beta}\mid\boldsymbol X]
=\boldsymbol\beta+(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}\boldsymbol X^{\mathsf T}E[\boldsymbol\varepsilon\mid\boldsymbol X]
=\boldsymbol\beta.$$
## 計算例
説明変数と誤差が相関すると最後の項が0にならず、欠落変数バイアスなどが生じ得る。
## 注意
等分散性は不偏性には不要であり、分散公式やBLUE性に必要である。

<!-- CARD -->

---
id: enginf-ols-covariance-matrix
title: 最小二乗法の分散共分散行列を導く
category: applied-engineering
subcategory: engineering-linear-inference
topic: ols-covariance
type: calc_step
difficulty: 3
priority: S
hashtags: [線形モデル, 分散共分散行列, 最小二乗法]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 線形モデル }]
---
## 問題
$\boldsymbol X$ が列フルランクで、$\operatorname{Var}(\boldsymbol\varepsilon\mid\boldsymbol X)=\sigma^2\boldsymbol I_n$ のもとで、最小二乗法の条件付き分散を導け。
## 記号・用語
$\boldsymbol I_n$ は $n$ 次単位行列、$\sigma^2$ は誤差分散である。
## 使用公式・定理
$\operatorname{Var}(A\boldsymbol Z)=A\operatorname{Var}(\boldsymbol Z)A^{\mathsf T}$。
## 一手／方針
最小二乗法の確率部分を $A\boldsymbol\varepsilon$ と見て線形変換の分散公式を使う。
## 答え
$$\operatorname{Var}(\widehat{\boldsymbol\beta}\mid\boldsymbol X)
=(X^{\mathsf T}X)^{-1}X^{\mathsf T}(\sigma^2I_n)X(X^{\mathsf T}X)^{-1}$$
$$=\sigma^2(X^{\mathsf T}X)^{-1}.$$
## 計算例
$\sigma^2$ を $s^2=SSE/(n-k)$ で置換すると推定分散共分散行列になる。
## 注意
不均一分散では中央の $\sigma^2I_n$ が成立せず、サンドイッチ型分散などを使う。

<!-- CARD -->

---
id: enginf-gauss-markov-comparison
title: Gauss--Markov定理で線形推定量を比較する
category: applied-engineering
subcategory: engineering-linear-inference
topic: gauss-markov
type: recognition
difficulty: 2
priority: A
hashtags: [線形モデル, Gauss-Markov定理, BLUE]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 線形モデル }]
---
## 問題
固定された列フルランク計画、$E[\varepsilon\mid X]=0$、$\operatorname{Var}(\varepsilon\mid X)=\sigma^2I$ のもとで、最小二乗法と他の線形不偏推定量をどう比較できるか。
## 記号・用語
BLUEは最良線形不偏推定量（best linear unbiased estimator）の略である。
## 使用公式・定理
Gauss--Markov定理：任意の線形不偏推定量 $\widetilde\beta$ に対し、$\operatorname{Var}(\widetilde\beta)-\operatorname{Var}(\widehat\beta_{\mathrm{LS}})$ は半正定値。
## 一手／方針
「最良」が分散共分散行列の差の半正定値性を意味すると読む。
## 答え
最小二乗法は線形不偏推定量のクラスでBLUEであり、任意の係数ベクトル $a$ について
$$\operatorname{Var}(a^{\mathsf T}\widetilde\beta)\ge
\operatorname{Var}(a^{\mathsf T}\widehat\beta_{\mathrm{LS}}).$$
## 計算例
誤差の正規性はBLUE性には不要だが、有限標本の $t,F$ 分布には必要である。
## 注意
非線形推定量を含む全推定量の中で最小分散という主張ではない。

<!-- CARD -->

---
id: enginf-linear-combination-normal
title: 回帰係数の線形結合の分布を求める
category: applied-engineering
subcategory: engineering-linear-inference
topic: linear-combination-distribution
type: calc_step
difficulty: 2
priority: S
hashtags: [線形結合の分布, 正規分布, 回帰係数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 線形結合の分布 }]
---
## 問題
多変量正規分布 $\widehat{\boldsymbol\beta}\sim N_k(\boldsymbol\beta,\sigma^2C)$ のとき、$L=\boldsymbol a^{\mathsf T}\widehat{\boldsymbol\beta}$ の分布を求めよ。
## 記号・用語
$\boldsymbol a$ は既知の $k\times1$ 係数ベクトル、$C$ は既知の分散構造行列である。
## 使用公式・定理
多変量正規ベクトルの線形結合は1変量正規分布に従う。
## 一手／方針
平均には $a^{\mathsf T}$ を掛け、分散には二次形式 $a^{\mathsf T}(\sigma^2C)a$ を作る。
## 答え
$$L\sim N\left(\boldsymbol a^{\mathsf T}\boldsymbol\beta,
\sigma^2\boldsymbol a^{\mathsf T}C\boldsymbol a\right).$$
## 計算例
$a=(1,-1)^{\mathsf T}$ なら $L=\widehat\beta_1-\widehat\beta_2$ は係数差の推定量である。
## 注意
分散は $a^{\mathsf T}Ca$ であり、成分分散の単純和とは限らない。

<!-- CARD -->

---
id: enginf-contrast-estimate-se
title: 線形対比の推定値と標準誤差を計算する
category: applied-engineering
subcategory: engineering-linear-inference
topic: linear-contrast
type: calc_step
difficulty: 2
priority: S
hashtags: [線形対比, 標準誤差, 線形モデル]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 線形対比 }]
---
## 問題
$\widehat\beta=(10,3,5)^{\mathsf T}$、推定分散共分散行列が $\widehat V=\operatorname{diag}(1,0.25,0.36)$ である。$c=(0,1,-1)^{\mathsf T}$ の対比を求めよ。
## 記号・用語
線形対比は、群効果などに掛ける係数の和が0となる線形結合である。
## 使用公式・定理
推定値は $\widehat L=c^{\mathsf T}\widehat\beta$、標準誤差は $\operatorname{SE}(\widehat L)=\sqrt{c^{\mathsf T}\widehat Vc}$。
## 一手／方針
係数差を作り、その分散を二次形式で求める。
## 答え
$$\widehat L=3-5=-2,$$
$$\operatorname{SE}(\widehat L)=\sqrt{0.25+0.36}=\sqrt{0.61}\approx0.781.$$
## 計算例
共分散が0.10なら分散は $0.25+0.36-2(0.10)=0.41$ となる。
## 注意
切片の係数0も含めてベクトルの次元を揃える。

<!-- CARD -->

---
id: enginf-contrast-t-test
title: 線形対比をt検定する
category: applied-engineering
subcategory: engineering-linear-inference
topic: contrast-test
type: calc_step
difficulty: 2
priority: S
hashtags: [線形対比, t検定, 線形制約]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 線形対比 }]
---
## 問題
$H_0:c^{\mathsf T}\beta=0$ に対し、$c^{\mathsf T}\widehat\beta=-2$、標準誤差0.781、残差自由度20とする。検定統計量と5%両側判定を求めよ。
## 記号・用語
残差自由度は誤差分散推定に使う自由度である。
## 使用公式・定理
正規線形モデルのもとで
$$T=\frac{c^{\mathsf T}\widehat\beta-c^{\mathsf T}\beta_0}{\operatorname{SE}(c^{\mathsf T}\widehat\beta)}\sim t_{20}.$$
## 一手／方針
帰無値0からの差を標準誤差で割り、$t_{20,0.025}=2.086$ と比較する。
## 答え
$$T=\frac{-2}{0.781}\approx-2.56.$$
$|T|=2.56>2.086$ なので5%水準で $H_0$ を棄却する。
## 計算例
係数差の95%信頼区間は $-2\pm2.086(0.781)\approx(-3.63,-0.37)$。
## 注意
片側検定なら臨界値と棄却方向が変わる。

<!-- CARD -->

---
id: enginf-extra-sum-squares
title: 縮小モデルと完全モデルから追加平方和を求める
category: applied-engineering
subcategory: engineering-linear-inference
topic: nested-model-f-test
type: calc_step
difficulty: 2
priority: S
hashtags: [線形制約, 追加平方和, F検定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 線形制約 }]
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
hashtags: [線形モデル, F検定, 決定係数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 線形モデル }]
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
hashtags: [線形モデル, 平均応答, 信頼区間]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 線形結合の分布 }]
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
hashtags: [線形モデル, 予測区間, 線形結合の分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 線形結合の分布 }]
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
hashtags: [線形モデル, レバレッジ, 回帰診断]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 線形モデル }]
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
hashtags: [線形モデル, 残差診断, スチューデント化残差]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 線形モデル }]
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
hashtags: [線形モデル, Cookの距離, 影響診断]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 線形モデル }]
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
