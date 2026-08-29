---
id: test-z-rejection
title: 両側Z検定の棄却域を作る
category: math-testing
subcategory: math-testing-foundations
topic: z-test
type: strategy
difficulty: 2
priority: S
hashtags:
  - 検定
  - 棄却域
  - 正規分布（ガウス分布）
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 正規母集団の検定
archive_reason: duplicate
canonical_card: test-normal-z-known-formula
archive_note: 既知分散の正規母平均に対してZ統計量を作り棄却域と比較する同一操作。後発canonicalは両側検定の式と数値計算まで明示している。
---
## 問題
$X_i$ は独立同分布に正規分布 $N(\mu,4)$ に従い、$n=100$ とする。$H_0:\mu=10$ 対 $H_1:\mu\ne10$ を有意水準5%で検定する。$\overline x=10.5$ の結論は？
## 方針
帰無仮説の平均で中心化し、既知の標準誤差で割る。
## 使用公式・定理
$H_0$ の下で $Z=(\overline X-10)/(2/\sqrt{100})\sim N(0,1)$。両側5%の棄却域は $|Z|>1.96$。
## 計算例
$$Z=\frac{10.5-10}{2/10}=\frac{0.5}{0.2}=2.5.$$
$2.5>1.96$ だから $H_0$ を棄却する。
## 注意
対立仮説が両側なので両端へ2.5%ずつ配る。

<!-- CARD -->

---
id: test-likelihood-ratio
title: 尤度比検定統計量を制約付き最尤推定から作る
category: math-testing
subcategory: math-test-derivation
topic: likelihood-ratio-test
type: strategy
difficulty: 3
priority: S
hashtags:
  - 尤度比検定
  - 最尤推定
  - 漸近分布
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 尤度比検定
archive_reason: duplicate
canonical_card: test-lr-deviance-statistic
archive_note: -2 log Lambda = 2{ell(unrestricted)-ell(restricted)}
  を作る同一の尤度比統計量。後発canonicalへ統合する。
---
## 問題
無制約の最大対数尤度が $-40$、帰無仮説の制約下で $-42$ である。制約数1の尤度比検定統計量を求めよ。
## 方針
制約下と無制約の最大対数尤度の差を $-2$ 倍する。
## 使用公式・定理
正則条件の下で、検定統計量はカイ二乗分布へ収束し、
$$-2\log\Lambda=2\{\ell(\widehat\theta)-\ell(\widetilde\theta)\}\xrightarrow{d}\chi^2_r.$$
## 計算例
$$-2\log\Lambda=2\{-40-(-42)\}=2\cdot2=4.$$
自由度は制約数 $r=1$。
## 注意
制約下の最大尤度は無制約より大きくならない。

<!-- CARD -->

---
id: multi-conditional-normal
title: 2変量正規分布の条件付き平均を求める
category: applied-engineering
subcategory: engineering-multivariate
topic: conditional-normal
type: formula
difficulty: 3
priority: S
hashtags:
  - 多変量正規分布
  - 条件付き分布
  - 回帰分析
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 多変量正規分布
archive_reason: duplicate
canonical_card: engmv-conditional-normal-numeric
archive_note: 2変量正規の条件付き平均を求めるpilot版は、条件付き平均・分散・数値例まで扱う後発canonicalに完全包含される。
---
## 問題
$(X,Y)^{\mathsf T}$ は平均 $(0,1)^{\mathsf T}$、分散 $\operatorname{Var}(X)=4$, $\operatorname{Var}(Y)=9$、共分散3の2変量正規分布に従う。$Y=4$ の条件付き平均を求めよ。
## 答え
平均からのずれへ回帰係数 $\operatorname{Cov}(X,Y)/\operatorname{Var}(Y)$ を掛ける。
## 使用公式・定理
$$E[X\mid Y=y]=\mu_X+\frac{\sigma_{XY}}{\sigma_Y^2}(y-\mu_Y).$$
## 計算例
$$\begin{aligned}E[X\mid Y=4]&=0+\frac39(4-1)\\&=\frac13\cdot3=1.\end{aligned}$$
## 注意
分母は $Y$ の分散である。

<!-- CARD -->

---
id: process-stationary-markov
title: 2状態マルコフ連鎖の定常分布を解く
category: applied-common
subcategory: applied-stochastic-processes
topic: stationary-distribution
type: strategy
difficulty: 2
priority: A
hashtags:
  - マルコフ連鎖
  - 定常分布
  - 連立方程式
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: マルコフ連鎖
archive_reason: duplicate
canonical_card: stoch-three-state-stationary
archive_note: 定常分布を pi^T P=pi^T と総和1から求める同一操作。3状態の具体計算を持つ後発canonicalへ統合する。
---
## 問題
$\boldsymbol P=\begin{pmatrix}0.8&0.2\\0.3&0.7\end{pmatrix}$ の定常分布 $\boldsymbol\pi$ を求めよ。
## 方針
$\boldsymbol\pi^{\mathsf T}\boldsymbol P=\boldsymbol\pi^{\mathsf T}$ と確率和1を同時に解く。
## 使用公式・定理
$$\boldsymbol\pi^{\mathsf T}\boldsymbol P=\boldsymbol\pi^{\mathsf T},\qquad \pi_1+\pi_2=1.$$
## 計算例
第1成分から $\pi_1=0.8\pi_1+0.3\pi_2$、すなわち $0.2\pi_1=0.3\pi_2$。よって $\pi_1:\pi_2=3:2$ なので
$$\boldsymbol\pi=(3/5,2/5)^{\mathsf T}.$$
## 注意
行ベクトル規約か列ベクトル規約かを式で明示する。

<!-- CARD -->

---
id: process-ma1-autocovariance
title: MA(1)過程の自己共分散を求める
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: ma1
type: calc_step
difficulty: 3
priority: A
hashtags:
  - MA
  - 自己共分散
  - 時系列解析
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: MA過程
archive_reason: duplicate
canonical_card: engproc-ma1-autocovariance-numeric
archive_note: MA(1)の自己共分散 gamma(0), gamma(1), gamma(h>=2)
  を求める同一例。後発canonicalは同じ計算に加えて自己相関まで接続している。
---
## 問題
$X_t=\varepsilon_t+0.5\varepsilon_{t-1}$、革新は平均0、分散4で互いに無相関とする。$\gamma(0),\gamma(1)$ を求めよ。
## 答え
同じ時点の革新が重なる項だけを残す。
## 使用公式・定理
$$\gamma(h)=\operatorname{Cov}(X_t,X_{t-h}).$$
## 計算例
$$\begin{aligned}\gamma(0)&=\operatorname{Var}(\varepsilon_t)+0.5^2\operatorname{Var}(\varepsilon_{t-1})=4+1=5,\\\gamma(1)&=\operatorname{Cov}(\varepsilon_t+0.5\varepsilon_{t-1},\varepsilon_{t-1}+0.5\varepsilon_{t-2})\\&=0.5\operatorname{Var}(\varepsilon_{t-1})=2.\end{aligned}$$
## 注意
$|h|>1$ では重なる革新がなく $\gamma(h)=0$。

<!-- CARD -->

---
id: model-poisson-glm
title: ポアソン回帰係数を平均比で読む
category: applied-common
subcategory: applied-multivariate
topic: poisson-regression
type: recognition
difficulty: 2
priority: A
hashtags:
  - 一般化線形モデル
  - ポアソン回帰
  - 平均比
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 一般化線形モデル
archive_reason: duplicate
canonical_card: glm-poisson-mean-ratio
archive_note: Poisson回帰のlog linkで係数差をexpして平均比として読む同一操作。後発canonicalの数値例へ統合する。
---
## 問題
$Y\mid x$ はポアソン分布 $\operatorname{Poisson}(\mu(x))$ に従い、$\log\mu(x)=\beta_0+0.4x$ とする。$x$ が2増えたとき条件付き平均は何倍か。
## 答え
対数平均の差を取り、指数化する。
## 使用公式・定理
$$\frac{\mu(x+c)}{\mu(x)}=e^{c\beta_1}.$$
## 計算例
$$\begin{aligned}\log\frac{\mu(x+2)}{\mu(x)}&=0.4(x+2)-0.4x=0.8,\\\frac{\mu(x+2)}{\mu(x)}&=e^{0.8}\approx2.23.\end{aligned}$$
## 注意
加法効果でなく乗法効果である。
