---
id: prob-mixed-cdf
title: 点質量と連続部分を持つ累積分布関数を作る
category: math-probability
subcategory: math-distribution-functions
topic: mixed-distribution-cdf
type: calc_step
difficulty: 2
priority: S
hashtags:
  - 混合分布
  - 累積分布関数
  - 点質量
frequency:
  past_exam: 1
  textbook: 0
  independent_problems: 0
  source_confirmations: 1
sources:
  - type: official_syllabus
    topic: 確率分布
  - type: past_exam
    id: MATH-2024-Q4
    topic: 経験分布・混合分布
archive_reason: duplicate
canonical_card: prob-cdf-from-density
coverage_card: prob-cdf-from-density
archive_note: 累積分布関数の正本へ、離散の確率質量の総和・連続密度の積分・点質量と連続部分が共存する混合分布を統合済み。旧カードのP(Y=0)=1/2と(0,1)上の連続部分の例も同じ正本で明示しているため独立カードは不要。
---
## 問題
$P(X=0)=1/2$ で、残りの確率 $1/2$ は区間 $(0,1)$ 上に一定の密度で分布する。$F_X(x)$ を求めよ。

## 答え
$x=0$ の跳びと、$(0,1)$ 上の連続な増加を分けて足す。

## 使用公式・定理
点質量と密度が共存するとき
$$F_X(x)=\sum_{u\le x}P(X=u)+\int_{-\infty}^x f_{\mathrm{cont}}(u)\,du.$$

## 計算例
連続部分の密度は $(0,1)$ で $1/2$ だから
$$F_X(x)=\begin{cases}0&(x<0),\\1/2&(x=0),\\1/2+x/2&(0<x<1),\\1&(x\ge1).\end{cases}$$

## 一手
混合分布では、跳びと密度の積分を別々に数える。

## 注意
累積分布関数を微分するだけでは点 $0$ の確率質量を回収できない。

<!-- CARD -->

---
id: dist-weak-law-sample-mean
title: 大数の弱法則を標本平均の確率収束として読む
category: math-probability
subcategory: math-limit-approximations
topic: weak-law-sample-mean
type: recognition
difficulty: 1
priority: S
hashtags:
  - 大数の弱法則
  - 標本平均
  - 確率収束
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 大数の弱法則
archive_reason: duplicate
canonical_card: dist-weak-law-chebyshev
coverage_card: dist-weak-law-chebyshev
archive_note: 弱法則の正本へ確率収束の定義 P(|Xbar_n-mu|>=epsilon)->0
  を明示し、さらにVar(Xbar_n)=sigma^2/nとChebyshevの不等式から同じ結論を導出する流れまで統合済み。結論だけを問う旧カードは不要。
---
## 問題
独立同分布な確率変数列が平均 $\mu$、有限分散を持つとする。大数の弱法則の結論を、確率収束の定義を用いて書け。

## 答え
標本平均は母平均から任意に離れる確率が0へ近づく。

## 使用公式・定理
確率変数列 $Y_n$ が $Y$ に確率収束するとは、任意の $\varepsilon>0$ に対し
$$P(|Y_n-Y|\ge\varepsilon)\longrightarrow0$$
が成り立つことである。大数の弱法則は、適切な独立性・同分布性と有限な平均・分散の下で
$$\overline X_n\xrightarrow{p}\mu$$
を主張する。

## 計算例
例えば $\mu=5$ のとき、固定した $\varepsilon=0.1$ に対して
$$P(|\overline X_n-5|\ge0.1)\longrightarrow0.$$
これは「十分大きい $n$ では標本平均が必ず5になる」という意味ではなく、5から0.1以上離れる確率が小さくなるという意味である。

## 一手
記号 $\xrightarrow{p}$ を見たら、まず「任意の $\varepsilon>0$ に対する確率が0へ行く」と言い換える。

## 注意
確率収束は各標本列が最終的に必ず固定値になることを意味しない。収束の種類を a.s. 収束や分布収束と混同しない。

<!-- CARD -->

---
id: prob-linear-combination-moments
title: 線形結合の平均と分散を一般の分布で計算する
category: math-probability
subcategory: math-transformations
topic: linear-combination-moments
type: calc_step
difficulty: 2
priority: S
hashtags:
  - 確率変数の線形結合
  - 期待値
  - 分散
  - 共分散
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 確率変数の線形結合
archive_reason: duplicate
canonical_card: prob-variance-independent-sum
coverage_card: prob-variance-independent-sum
archive_note: 正本がE[aX+bY+c]とVar(aX+bY+c)=a^2Var(X)+b^2Var(Y)+2abCov(X,Y)を扱い、独立時の特殊化と標準化まで包含している。旧カードの線形結合の平均・分散は完全な部分集合。
---
## 問題
$E[X]=1$、$E[Y]=2$、$\operatorname{Var}(X)=4$、$\operatorname{Var}(Y)=1$、$\operatorname{Cov}(X,Y)=0.5$ とする。$W=3X-2Y$ の平均と分散を求めよ。

## 答え
期待値の線形性と分散の双線形公式に代入する。

## 使用公式・定理
期待値と分散が存在する確率変数について
$$E[aX+bY]=aE[X]+bE[Y],$$
$$\operatorname{Var}(aX+bY)=a^2\operatorname{Var}(X)+b^2\operatorname{Var}(Y)+2ab\operatorname{Cov}(X,Y).$$

## 計算例
平均は
$$E[W]=3\cdot1-2\cdot2=3-4=-1.$$
分散は
$$\begin{aligned}\operatorname{Var}(W)&=3^2\cdot4+(-2)^2\cdot1+2\cdot3\cdot(-2)\cdot0.5\\&=36+4-6\\&=34.\end{aligned}$$

## 一手
共分散項の符号は $2ab$ の符号で決まる。ここでは $a=3,b=-2$ なので負。

## 注意
独立なら共分散項は0になるが、この問題では $\operatorname{Cov}(X,Y)=0.5\ne0$ なので落とせない。

<!-- CARD -->

---
id: prob-transform-log
title: 対数変換で対数正規分布の密度を導出する
category: math-probability
subcategory: math-transformations
topic: log-transform
type: calc_step
difficulty: 3
priority: S
hashtags:
  - 変数変換
  - 対数正規分布
  - 単調変換
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 変数変換
archive_reason: duplicate
canonical_card: dist-lognormal-transformation
coverage_card: dist-lognormal-transformation
archive_note: 対数正規分布の正本は一般のY~N(mu,sigma^2),
  X=e^Yから逆変換とJacobianを用いて密度を導出しており、旧カードの標準正規Y~N(0,1)はその特殊ケース。一般形を残せば技能を失わない。
---
## 問題
$X$ を標準正規分布 $N(0,1)$ に従う確率変数とし、$Y=e^X$ とする。$Y$ の確率密度関数を求めよ。

## 答え
$X\sim N(0,1)$、$Y=e^X$ なら
$$
f_Y(y)=\frac{1}{y\sqrt{2\pi}}\exp\left\{-\frac{(\log y)^2}{2}\right\},
\qquad y>0.
$$

## 使用公式・定理
$Y=g(X)$ が台上で1対1かつ単調で、逆変換 $x=g^{-1}(y)$ が微分可能なら
$$
f_Y(y)=f_X\{g^{-1}(y)\}\left|\frac{d}{dy}g^{-1}(y)\right|.
$$
手順は
$$
\text{逆変換}\to\text{Jacobianの絶対値}\to\text{元密度へ代入}\to\text{変換後の台}
$$
である。単調減少でもJacobianは絶対値を取るので密度は負にならない。

## 計算例
まず $Y=e^X$ では逆変換が
$$x=\log y,\qquad \left|\frac{dx}{dy}\right|=\frac1y$$
なので
$$
f_Y(y)=\phi(\log y)\frac1y
=\frac{1}{y\sqrt{2\pi}}e^{-(\log y)^2/2},\qquad y>0.
$$

単調減少の例として $X\sim U(0,2)$、$Y=3-2X$ なら
$$x=\frac{3-y}{2},\qquad \left|\frac{dx}{dy}\right|=\frac12.$$
元密度は $1/2$ だから
$$f_Y(y)=\frac14.$$
台は
$$0<\frac{3-y}{2}<2\Longleftrightarrow -1<y<3.$$

非線形の単調減少例として $X\sim U(0,1)$、$Y=1/X$ なら
$$x=\frac1y,\qquad \left|\frac{dx}{dy}\right|=\frac1{y^2},$$
かつ $0<x<1\Longleftrightarrow y>1$ なので
$$f_Y(y)=\frac1{y^2},\qquad y>1.$$

## 一手
1対1の単調変換では、まず $x$ を $y$ の式として解く。次に $|dx/dy|$ を掛け、最後に元の台を $y$ の条件へ変換する。

## 注意
単調減少では不等号の向きが変わるが、密度へ掛けるJacobianは絶対値である。変換後の台を書かないと正規化を誤りやすい。

<!-- CARD -->

---
id: dist-clt-statement
title: 中心極限定理の標準形を記述する
category: math-probability
subcategory: math-limit-approximations
topic: central-limit-theorem
type: formula
difficulty: 2
priority: S
hashtags:
  - 中心極限定理
  - 標準化
  - 正規分布（ガウス分布）
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 中心極限定理
archive_reason: duplicate
canonical_card: dist-clt-sample-mean
coverage_card: dist-clt-sample-mean
archive_note: 中心極限定理の正本がsqrt(n)(Xbar-mu)/sigma=>N(0,1)を明示したうえで、標本平均と和の近似分布・標準化・数値計算まで扱う。定理文だけを独立カードにする必要がない。
---
## 問題
$X_1,X_2,\ldots$ が独立同分布で、$E[X_i]=\mu$、$0<\operatorname{Var}(X_i)=\sigma^2<\infty$ とする。中心極限定理の標準形を書け。

## 答え
標本平均を平均0・分散1になるよう標準化すると、標準正規分布へ分布収束する。

## 使用公式・定理
標準正規分布を $N(0,1)$ と書く。中心極限定理は
$$\frac{\sqrt n(\overline X_n-\mu)}{\sigma}\xrightarrow{d}N(0,1)$$
または同値に
$$\frac{\sum_{i=1}^nX_i-n\mu}{\sigma\sqrt n}\xrightarrow{d}N(0,1)$$
と述べられる。

## 計算例
標本平均の平均と分散は $\mu$、$\sigma^2/n$ なので、標準偏差は $\sigma/\sqrt n$ である。したがって
$$\frac{\overline X_n-\mu}{\sigma/\sqrt n}=\frac{\sqrt n(\overline X_n-\mu)}{\sigma}.$$
これが $n$ の増加とともに標準正規分布で近似できる量である。

## 一手
「平均を引く→標準偏差 $\sigma/\sqrt n$ で割る」の順で標準化する。

## 注意
中心極限定理は有限の $n$ で標本平均が厳密に正規分布になるという主張ではなく、分布収束の主張である。

<!-- CARD -->

---
id: dist-clt-sum-variance
title: 和の中心極限定理で標準偏差の次数を確認する
category: math-probability
subcategory: math-limit-approximations
topic: central-limit-sum
type: formula
difficulty: 2
priority: S
hashtags:
  - 中心極限定理
  - 和
  - 標準偏差
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 中心極限定理
archive_reason: duplicate
canonical_card: dist-clt-sample-mean
coverage_card: dist-clt-sample-mean
archive_note: 正本にS_n=sum XiについてE[S_n]=nmu, Var(S_n)=n sigma^2, SD(S_n)=sigma
  sqrt(n)が明示され、その値を使った標準化まで含まれる。和の標準偏差だけを問う旧カードは完全重複。
---
## 問題
独立同分布な $X_i$ の平均が $\mu$、$0<\operatorname{Var}(X_i)=\sigma^2<\infty$ のとき、和 $S_n=\sum_{i=1}^nX_i$ の中心極限定理による標準化を記せ。なぜ分母が $\sigma n$ ではないか説明せよ。

## 答え
標準化は $(S_n-n\mu)/(\sigma\sqrt n)$ である。独立な分散は加法的なので、和の分散が $n\sigma^2$ になるからである。

## 使用公式・定理
独立性から
$$E[S_n]=n\mu,\qquad \operatorname{Var}(S_n)=n\sigma^2.$$
よって $S_n$ の標準偏差は $\sqrt{n\sigma^2}=\sigma\sqrt n$ である。中心極限定理は
$$\frac{S_n-n\mu}{\sigma\sqrt n}\xrightarrow{d}N(0,1).$$

## 計算例
分散を標準偏差へ変換すると
$$\operatorname{SD}(S_n)=\sqrt{\operatorname{Var}(S_n)}=\sqrt{n\sigma^2}=\sigma\sqrt n.$$
したがって分母は $\sigma\sqrt n$ であり、$\sigma n$ ではない。

## 一手
和ではまず分散を足し、その後に平方根を取る。

## 注意
分散の増加は $n$ 倍、標準偏差の増加は $\sqrt n$ 倍である。

<!-- CARD -->

---
id: dist-clt-standard-error
title: 中心極限定理で標本平均の標準誤差を作る
category: math-probability
subcategory: math-limit-approximations
topic: central-limit-standard-error
type: calc_step
difficulty: 1
priority: S
hashtags:
  - 中心極限定理
  - 標本平均
  - 標準誤差
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 中心極限定理
archive_reason: duplicate
canonical_card: dist-clt-sample-mean
coverage_card: dist-clt-sample-mean
archive_note: 正本にVar(Xbar)=sigma^2/nとSE(Xbar)=sigma/sqrt(n)が明示され、実際の確率計算で使用している。標準誤差だけを問う旧カードは正本の一ステップに含まれる。
---
## 問題
母分散が $\sigma^2=16$、標本サイズが $n=64$ のとき、標本平均の標準誤差を求めよ。

## 答え
標準誤差は $\sigma/\sqrt n=4/8=0.5$ である。

## 使用公式・定理
独立同分布標本では
$$\operatorname{Var}(\overline X_n)=\frac{\sigma^2}{n},$$
したがって標本平均の標準誤差は
$$\operatorname{SE}(\overline X_n)=\sqrt{\operatorname{Var}(\overline X_n)}=\frac{\sigma}{\sqrt n}.$$

## 計算例
$$\sigma=\sqrt{16}=4,\qquad \sqrt n=\sqrt{64}=8.$$
よって
$$\operatorname{SE}(\overline X_{64})=\frac48=0.5.$$

## 一手
分散をそのまま使わず、平方根を取ってから $\sqrt n$ で割る。

## 注意
$\sigma^2/n=16/64=0.25$ は標本平均の分散であり、標準誤差はその平方根の0.5である。

<!-- CARD -->

---
id: samp-z-statistic-known-variance
title: 母分散既知の正規平均の$z$統計量
category: math-distributions
subcategory: math-sampling-distributions
topic: z-statistic-known-variance
type: theorem
difficulty: 2
priority: A
hashtags:
  - 正規平均
  - z統計量
  - 母分散既知
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 標本分布
archive_reason: duplicate
canonical_card: samp-xbar-normal-distribution
coverage_card: samp-xbar-normal-distribution
archive_note: 正規母集団の標本平均正本がXbar~N(mu,sigma^2/n)を厳密に示し、標準誤差sigma/sqrt(n)まで扱うため、Z=(Xbar-mu)/(sigma/sqrt(n))~N(0,1)は直接の標準化にすぎない。独立カードは不要。
---
## 問題
$X_1,\ldots,X_n\overset{\mathrm{i.i.d.}}{\sim}$ 正規分布 $N(\mu,\sigma^2)$、$\sigma^2$ 既知とする。$\mu$ の標準化統計量とその分布を答えよ。

## 答え
$$\frac{\overline X-\mu}{\sigma/\sqrt n}\sim N(0,1).$$

## 使用公式・定理
$\overline X\sim N(\mu,\sigma^2/n)$ を標準化する。

## 計算例
$n=36,\sigma=12$ なら $\sigma/\sqrt n=2$ で $(\overline X-\mu)/2\sim N(0,1)$。

## 一手
分散既知なら $\sigma/\sqrt n$ で割って標準正規を直接用いる。

## 注意
$\sigma$ 未知のときは t 分布へ移行する。

<!-- CARD -->

---
id: samp-t-statistic-mean-test
title: 母分散未知の正規平均のt統計量
category: math-distributions
subcategory: math-sampling-distributions
topic: t-statistic-mean
type: theorem
difficulty: 2
priority: S
hashtags:
  - t統計量
  - 不偏標本分散
  - 正規平均
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: t分布
archive_reason: duplicate
canonical_card: samp-t-distribution-definition
coverage_card: samp-t-distribution-definition
archive_note: t分布正本にT=Z/sqrt(V/nu)の定義だけでなく、正規標本について(Xbar-mu)/(S/sqrt(n))~t_{n-1}を、標本平均・標本分散のカイ二乗分布・独立性から導出する計算例まで既に含む。旧カードは同じ導出の重複。
---
## 問題
$X_1,\ldots,X_n\overset{\mathrm{i.i.d.}}{\sim}$ 正規分布 $N(\mu,\sigma^2)$、$\sigma^2$ 未知とする。$\overline X$ と不偏標本分散 $S^2$ から $\mu$ に関するt統計量を構成し、その分布を答えよ。

## 答え
$$T=\frac{\overline X-\mu}{S/\sqrt n}\sim t_{n-1}.$$

## 使用公式・定理
$\overline X\sim N(\mu,\sigma^2/n)$、$(n-1)S^2/\sigma^2\sim\chi^2_{n-1}$、かつ $\overline X$ と $S^2$ は独立。よって
$$T=\frac{(\overline X-\mu)/(\sigma/\sqrt n)}{\sqrt{\dfrac{(n-1)S^2}{\sigma^2}\Big/(n-1)}}\sim t_{n-1}.$$

## 計算例
$n=16$ では $T=(\overline X-\mu)/(S/\sqrt{16})\sim t_{15}$。

## 一手
分散未知なら $\sigma$ を $S$ に置き換え、分布は $N(0,1)$ から $t_{n-1}$ へ変わる。

## 注意
$\sigma$ 既知なら $t$ ではなく $N(0,1)$。自由度は $n-1$。
