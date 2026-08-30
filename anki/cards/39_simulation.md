---
id: sim-uniform-prng-definition
title: 擬似乱数列に必要な性質を答える
category: math-data-analysis
subcategory: math-simulation
topic: random-number-generation
type: recognition
difficulty: 2
priority: C
hashtags: [乱数, 擬似乱数, 一様分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 乱数 }]
---

## 問題
モンテカルロ計算の出発点となる擬似乱数列について、統計計算上必要な性質を3つ挙げよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

理想化した乱数は $U_1,U_2,\ldots\overset{\mathrm{iid}}{\sim}U(0,1)$ と扱う。

## 答え
各値が一様分布 $U(0,1)$ に従うように見えること、系列相関が十分小さいこと、seedを固定すれば再現できること。

## 計算例
同じseedで同じ推定値が再現されれば、解析の検証ができる。

## 注意
擬似乱数は決定的アルゴリズムの出力であり、周期と生成器の品質を確認する。

<!-- CARD -->

---
id: sim-inverse-transform-continuous
title: 逆関数法を原理証明から指数分布の乱数生成まで通す
category: math-data-analysis
subcategory: math-simulation
topic: inverse-transform-canonical
type: strategy
difficulty: 3
priority: B
hashtags:
  - 乱数
  - 逆関数法
  - 分布関数
  - 指数分布
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 乱数
---

## 問題
一様分布に従う $U\sim U(0,1)$ とする。
1. 連続で狭義単調増加な分布関数 $F$ に対して $X=F^{-1}(U)$ が $F$ を分布関数にもつことを示せ。
2. 率 $\lambda>0$ の指数分布
$$
F(x)=1-e^{-\lambda x}\qquad(x\ge0)
$$
に従う乱数の生成式を導け。
3. $\lambda=2,U=0.8$ のとき生成される $X$ を計算せよ。

## 記号・用語
逆関数法は、一様乱数を目標分布の分布関数の逆関数へ通して目標乱数へ変換する方法である。一般の分布では一般化逆関数
$$
F^{-1}(u)=\inf\{x:F(x)\ge u\}
$$
を使う。

## 使用公式・定理
$U\sim U(0,1)$ なら $0\le u\le1$ で $P(U\le u)=u$。$F$ が連続かつ狭義単調増加なら
$$
P\{F^{-1}(U)\le x\}
=P\{U\le F(x)\}
=F(x).
$$
指数分布では
$$
U=1-e^{-\lambda X}
$$
を $X$ について解けばよい。

## 一手／方針
**分布関数を一様乱数 $U$ と等置し、未知量 $X$ について解く。** 原理証明では単調性で事象 $F^{-1}(U)\le x$ を $U\le F(x)$ に移す。個別分布では同じ操作を具体的な $F$ に適用する。

## 答え
原理は
$$
P(X\le x)=P\{F^{-1}(U)\le x\}
=P\{U\le F(x)\}=F(x)
$$
で示される。

指数分布では
$$
U=1-e^{-\lambda X}
\Longrightarrow
X=-\frac1\lambda\log(1-U).
$$
$1-U\sim U(0,1)$ なので、同分布の生成式として
$$
X=-\frac1\lambda\log U
$$
を使ってもよい。

$\lambda=2,U=0.8$ では
$$
X=-\frac12\log(0.2)\approx0.8047.
$$

## 計算例
$F(x)=x^2$（$0\le x\le1$）なら $X=\sqrt U$。また指数分布で $\lambda=1,U=0.5$ なら $X=\log2$ となる。

## 注意
実装で $-\log U$ を使う場合、$U=0$ では対数が定義されないため端点0を避ける。離散分布では通常の逆関数が存在しないため一般化逆関数または累積確率の区間判定を使う。この離散版は別の操作判断を伴うため別カードとして残す。

<!-- CARD -->

---
id: sim-inverse-transform-discrete
title: 離散分布を累積確率から生成する
category: math-data-analysis
subcategory: math-simulation
topic: inverse-transform-discrete
type: calc_step
difficulty: 2
priority: C
hashtags: [乱数, 逆関数法, 離散分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 乱数 }]
---

## 問題
$P(X=0,1,2)=(0.2,0.5,0.3)$ を逆関数法で生成する規則を書き、$U=0.65$ の値を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$X=\min\{x:F(x)\ge U\}$。

## 答え
累積確率は $(0.2,0.7,1)$ なので
$$X=\begin{cases}
0,&0<U\le0.2,\\
1,&0.2<U\le0.7,\\
2,&0.7<U<1.
\end{cases}$$
$U=0.65$ では $X=1$。

## 計算例
$U=0.91$ なら $X=2$。

## 注意
区間端点の規約は確率0の差しか生まないが、実装では一貫させる。

<!-- CARD -->

---
id: sim-accept-reject
title: 棄却法の受理確率を計算する
category: math-data-analysis
subcategory: math-simulation
topic: acceptance-rejection
type: calc_step
difficulty: 3
priority: C
hashtags: [乱数, 棄却法, 受理確率]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 乱数 }]
---

## 問題
目標密度f、提案密度gについて $f(x)\le Mg(x)$ とする棄却法の受理規則と平均試行回数を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

受理確率は条件付き受理確率を提案密度gで平均して求める。

## 答え
$Y\sim g,\ U\sim U(0,1)$ を独立に生成し、
$$U\le\frac{f(Y)}{Mg(Y)}$$
なら $X=Y$ として受理する。受理確率は
$$\int g(y)\frac{f(y)}{Mg(y)}\,dy=\frac1M,$$
したがって平均試行回数はM。

## 計算例
$M=1.25$ なら受理率0.8、平均1.25回。

## 注意
全てのxで成り立つ上界Mを使う。Mが大きいと効率が悪い。

<!-- CARD -->

---
id: sim-box-muller
title: Box–Muller法で標準正規乱数を作る
category: math-data-analysis
subcategory: math-simulation
topic: box-muller
type: calc_step
difficulty: 3
priority: C
hashtags: [乱数, Box-Muller法, 正規分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 乱数 }]
---

## 問題
独立な一様分布 $U_1,U_2\sim U(0,1)$ から独立な標準正規乱数を2個作る式を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

二次元標準正規密度を極座標変換すると $\Theta\sim U(0,2\pi)$、$R^2\sim\chi_2^2$。

## 答え
$$R=\sqrt{-2\log U_1},\qquad \Theta=2\pi U_2,$$
$$Z_1=R\cos\Theta,\qquad Z_2=R\sin\Theta.$$
このとき $Z_1,Z_2\overset{\mathrm{iid}}{\sim}N(0,1)$。

## 計算例
$U_1=e^{-1/2},U_2=1/4$ なら $(Z_1,Z_2)=(0,1)$。

## 注意
$U_1=0$ では対数が定義されない。

<!-- CARD -->

---
id: sim-mc-standard-error
title: Monte Carlo推定を期待値化から標準誤差・近似区間まで通す
category: math-data-analysis
subcategory: math-simulation
topic: monte-carlo-error-canonical
type: strategy
difficulty: 3
priority: B
hashtags:
  - モンテカルロシミュレーション
  - 標準誤差
  - 中心極限定理
  - 数値誤差
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: モンテカルロシミュレーション
---

## 問題
$Y_1,\ldots,Y_m$ は独立同分布で $E[Y_b]=\mu$, $\operatorname{Var}(Y_b)=\sigma^2<\infty$ とし、
$$
\widehat\mu_m=\frac1m\sum_{b=1}^mY_b
$$
で $\mu$ をMonte Carlo推定する。
1. $\widehat\mu_m$ の分散と標準誤差を求めよ。
2. $m=2500$, $\widehat\mu_m=1.40$, 反復値の標本標準偏差 $s=2.5$ のとき、Monte Carlo誤差だけに関する近似95%区間を求めよ。
3. 標準誤差を半分にするには反復数を何倍にすべきか。

## 記号・用語
Monte Carlo標準誤差は、有限回の乱数反復によって生じる**数値計算上の不確実性**を表す。元データを有限標本しか観測していないことによる統計的な標本誤差とは別物である。

## 使用公式・定理
独立性より
$$
\operatorname{Var}(\widehat\mu_m)
=\operatorname{Var}\left(\frac1m\sum_{b=1}^mY_b\right)
=\frac{\sigma^2}{m},
$$
したがって
$$
\operatorname{SE}(\widehat\mu_m)=\frac{\sigma}{\sqrt m}.
$$
$\sigma$ が未知なら反復値の標本標準偏差 $s$ で置き換える。中心極限定理による近似95%区間は
$$
\widehat\mu_m\pm1.96\frac{s}{\sqrt m}.
$$
積分 $I=\int h(x)\,dx$ も、適当な密度 $q$ に対して
$$
I=E_q\left[\frac{h(X)}{q(X)}\right]
$$
と期待値へ書き換えれば同じ標本平均の枠組みで扱える。

## 一手／方針
**積分や期待値を独立反復の平均へ落とし、その平均の分散が $1/m$、標準誤差が $1/\sqrt m$ で減ることを使う。** 推定値だけで終わらず、反復値の散らばり $s$ から数値誤差も同時に報告する。

## 答え
一般に
$$
\operatorname{Var}(\widehat\mu_m)=\frac{\sigma^2}{m},\qquad
\operatorname{SE}(\widehat\mu_m)=\frac{\sigma}{\sqrt m}.
$$
数値例では
$$
\widehat{\operatorname{SE}}
=\frac{2.5}{\sqrt{2500}}
=0.05.
$$
よって近似95%区間は
$$
1.40\pm1.96(0.05)
=[1.302,1.498].
$$
標準誤差は $1/\sqrt m$ に比例するため、半分にするには $m$ を4倍にする。

## 計算例
$$
I=\int_0^1x^2\,dx
$$
は $U\sim U(0,1)$ として $I=E[U^2]$ と書けるため、独立な一様乱数から
$$
\widehat I_m=\frac1m\sum_{b=1}^mU_b^2
$$
と推定できる。反復値の標本標準偏差が $s=4$, $m=1600$ なら標準誤差は $4/40=0.1$ である。

## 注意
この近似区間は有限反復によるMonte Carlo誤差を表す区間であり、統計モデルの母数に対する通常の信頼区間とは区別する。MCMCのように反復が自己相関をもつ場合、単純な $s/\sqrt m$ は使えず、有効標本サイズなどで依存を考慮する必要がある。

<!-- CARD -->

---
id: sim-antithetic-variates
title: 対照変量法の分散減少条件を判定する
category: math-data-analysis
subcategory: math-simulation
topic: antithetic-variates
type: calc_step
difficulty: 3
priority: C
hashtags: [モンテカルロシミュレーション, 対照変量法, 分散減少]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: モンテカルロシミュレーション }]
---

## 問題
一様分布 $U\sim U(0,1)$ に対して $Y=\{g(U)+g(1-U)\}/2$ とする。$\operatorname{Var}(Y)$ を書き、分散が減る条件を述べよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$\operatorname{Var}(A+B)=\operatorname{Var}(A)+\operatorname{Var}(B)+2\operatorname{Cov}(A,B)$。

## 答え
両項の分散が同じなら
$$\operatorname{Var}(Y)
=\frac12\operatorname{Var}\{g(U)\}
+\frac12\operatorname{Cov}\{g(U),g(1-U)\}.$$
共分散が負なら、独立な2反復の平均より分散が小さい。

## 計算例
単調増加なgでは $g(U)$ と $g(1-U)$ は負に相関しやすい。

## 注意
常に分散が減るとは限らず、共分散の符号を確認する。

<!-- CARD -->

---
id: sim-control-variate
title: 制御変量法の最適係数を導く
category: math-data-analysis
subcategory: math-simulation
topic: control-variate
type: calc_step
difficulty: 4
priority: C
hashtags: [モンテカルロシミュレーション, 制御変量法, 分散減少]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: モンテカルロシミュレーション }]
---

## 問題
$E[Y]=\mu$ を推定したい。$E[C]=\mu_C$ が既知として $Y_b=Y-b(C-\mu_C)$ の分散を最小にするbを求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$E[Y_b]=E[Y]=\mu$ なので不偏性は保たれる。

## 答え
$$\operatorname{Var}(Y_b)=\operatorname{Var}(Y)+b^2\operatorname{Var}(C)-2b\operatorname{Cov}(Y,C).$$
bで微分して0と置くと
$$b^*=\frac{\operatorname{Cov}(Y,C)}{\operatorname{Var}(C)}.$$

## 計算例
$\operatorname{Cov}(Y,C)=3,\operatorname{Var}(C)=2$ なら $b^*=1.5$。

## 注意
係数を同じ標本から推定すると有限標本で小さなバイアスが生じ得る。

<!-- CARD -->

---
id: sim-stratified-sampling
title: 層化Monte Carlo推定量を計算する
category: math-data-analysis
subcategory: math-simulation
topic: stratified-monte-carlo
type: calc_step
difficulty: 3
priority: C
hashtags: [モンテカルロシミュレーション, 層化抽出, 分散減少]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: モンテカルロシミュレーション }]
---

## 問題
領域を確率 $w_1=0.4,w_2=0.6$ の2層に分け、層内平均が $\bar y_1=2,\bar y_2=5$ だった。層化推定値を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

全期待値の公式 $E[Y]=\sum_hP(H=h)E[Y\mid H=h]$。

## 答え
$$\widehat\mu_{\mathrm{str}}=\sum_{h=1}^2w_h\bar y_h
=0.4(2)+0.6(5)=3.8.$$

## 計算例
層内分散が小さければ、単純無作為抽出より分散を減らせる。

## 注意
重みは層への配分比でなく母集団確率 $w_h$。

<!-- CARD -->

---
id: sim-importance-sampling
title: 重点サンプリングの恒等式を書く
category: math-data-analysis
subcategory: math-simulation
topic: importance-sampling
type: formula
difficulty: 3
priority: C
hashtags: [モンテカルロシミュレーション, 重点サンプリング, 重み]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: モンテカルロシミュレーション }]
---

## 問題
目標密度fの下の $\mu=E_f[h(X)]$ を提案密度gからの標本で推定する式を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

積分に $g(x)/g(x)$ を掛ける測度変換。

## 答え
$f(x)h(x)\ne0$ の領域で $g(x)>0$ として
$$\mu=\int h(x)\frac{f(x)}{g(x)}g(x)\,dx
=E_g[h(X)w(X)],\qquad w(x)=\frac{f(x)}{g(x)}.$$
よって $\widehat\mu=m^{-1}\sum_bh(X_b)w(X_b)$。

## 計算例
稀な領域でhが大きいなら、その領域を多く生成するgを選ぶ。

## 注意
重みの分散が極端に大きい提案分布は不安定。

<!-- CARD -->

---
id: sim-importance-numeric
title: 重点サンプリング推定値を数値で求める
category: math-data-analysis
subcategory: math-simulation
topic: importance-sampling-numeric
type: calc_step
difficulty: 3
priority: C
hashtags: [モンテカルロシミュレーション, 重点サンプリング, 数値計算]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: モンテカルロシミュレーション }]
---

## 問題
提案分布 $g$ から2点を得て、$h(x_b)=(3,1)$、重み $f(x_b)/g(x_b)=(0.4,1.2)$ だった。通常の重点サンプリング推定値を求めよ。

## 記号・用語
- $f$：期待値を計算したい目標分布の確率密度関数
- $g$：実際に標本を生成する提案分布の確率密度関数
- $h$：期待値の対象となる関数

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$h(x)f(x)\ne0$ となるすべての $x$ で $g(x)>0$ とする。重み $w(x)=f(x)/g(x)$ を掛けると
$$E_f[h(X)]=\int h(x)f(x)\,dx
=\int h(x)\frac{f(x)}{g(x)}g(x)\,dx
=E_g[h(X)w(X)].$$
よって $X_1,\ldots,X_m\overset{iid}{\sim}g$ に対する通常の重点サンプリング推定量は
$$\widehat\mu=\frac1m\sum_{b=1}^m h(X_b)\frac{f(X_b)}{g(X_b)}.$$

## 答え
$$\widehat\mu=\frac12\{3(0.4)+1(1.2)\}
=\frac{2.4}{2}=1.2.$$

## 計算例
重み付き寄与はそれぞれ1.2と1.2。

## 注意
自己正規化推定量 $\sum h_bw_b/\sum w_b$ とは分母が異なる。

<!-- CARD -->

---
id: sim-markov-stationary
title: 定常分布の方程式を解く
category: math-data-analysis
subcategory: math-simulation
topic: mcmc-stationary
type: calc_step
difficulty: 3
priority: B
hashtags: [MCMC, マルコフ連鎖, 定常分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: MCMC }]
---

## 問題
遷移行列
$$P=\begin{pmatrix}0.8&0.2\\0.3&0.7\end{pmatrix}$$
の定常分布 $\boldsymbol\pi$ を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

定常分布は左固有ベクトル方程式 $\boldsymbol\pi P=\boldsymbol\pi$ を満たす。

## 答え
$\boldsymbol\pi=\boldsymbol\pi P$、$\pi_1+\pi_2=1$ より
$$0.2\pi_1=0.3\pi_2,\qquad
(\pi_1,\pi_2)=(0.6,0.4).$$

## 計算例
$0.6(0.8)+0.4(0.3)=0.6$。

## 注意
定常分布の存在だけでは任意の初期値から収束するとは限らない。

<!-- CARD -->

---
id: sim-detailed-balance
title: 詳細釣合いから定常性を示す
category: math-data-analysis
subcategory: math-simulation
topic: detailed-balance
type: calc_step
difficulty: 3
priority: C
hashtags: [MCMC, 詳細釣合い, 定常分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: MCMC }]
---

## 問題
離散状態で $\pi_iP_{ij}=\pi_jP_{ji}$ が全てのi,jで成り立つとき、$\boldsymbol\pi$ が定常分布であることを示せ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

遷移行列の各行和は1：$\sum_iP_{ji}=1$。

## 答え
j成分について
$$\sum_i\pi_iP_{ij}
=\sum_i\pi_jP_{ji}
=\pi_j\sum_iP_{ji}
=\pi_j.$$

## 計算例
Metropolis–Hastings法は詳細釣合いを満たすよう受理確率を構成する。

## 注意
詳細釣合いは定常性の十分条件であり必要条件ではない。

<!-- CARD -->

---
id: sim-mh-algorithm
title: Metropolis–Hastings法の受理確率を書く
category: math-data-analysis
subcategory: math-simulation
topic: metropolis-hastings
type: formula
difficulty: 4
priority: B
hashtags: [MCMC, Metropolis-Hastings法, 受理確率]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: MCMC }]
---

## 問題
現在値x、提案密度 $q(y\mid x)$、定数倍まで既知の目標密度 $\pi$ に対するMH法の更新規則を書け。

## 記号・用語
- MH：Metropolis–Hastings法

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

この受理率により $\pi(x)P(x,dy)=\pi(y)P(y,dx)$ が成立する。

## 答え
$Y\sim q(\cdot\mid x)$ を生成し、
$$\alpha(x,y)=\min\left\{1,
\frac{\pi(y)q(x\mid y)}{\pi(x)q(y\mid x)}\right\}$$
の確率でYへ移動し、それ以外はxに留まる。

## 計算例
対称提案ならqが消え、$\alpha=\min\{1,\pi(y)/\pi(x)\}$。

## 注意
目標密度の正規化定数は比で消える。

<!-- CARD -->

---
id: sim-mh-numeric
title: Metropolis–Hastings受理判定を計算する
category: math-data-analysis
subcategory: math-simulation
topic: metropolis-hastings-numeric
type: calc_step
difficulty: 3
priority: C
hashtags: [MCMC, Metropolis-Hastings法, 数値計算]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: MCMC }]
---

## 問題
対称提案を用い、現在値xと提案値yで未正規化目標密度が $\widetilde\pi(x)=0.5,\widetilde\pi(y)=0.2$。一様乱数 $U=0.30$ のとき受理するか。

## 記号・用語
- MH：Metropolis–Hastings法

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

対称提案のMH受理確率 $\alpha=\min\{1,\widetilde\pi(y)/\widetilde\pi(x)\}$。

## 答え
$$\alpha=\min\left(1,\frac{0.2}{0.5}\right)=0.4.$$
$U=0.30\le0.4$ なのでyを受理する。

## 計算例
$U=0.60$ なら棄却し、次の状態もx。

## 注意
棄却時もxを反復列へ記録する。

<!-- CARD -->

---
id: sim-random-walk-mh
title: ランダムウォークMHの調整を判定する
category: math-data-analysis
subcategory: math-simulation
topic: random-walk-metropolis
type: recognition
difficulty: 3
priority: C
hashtags: [MCMC, ランダムウォーク, 受理率]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: MCMC }]
---

## 問題
提案 $Y=X+\varepsilon$ で、誤差が正規分布 $\varepsilon\sim N(0,\tau^2)$ に従うとする。$\tau$ が小さすぎる場合と大きすぎる場合の挙動を述べよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

対称提案なので $\alpha=\min\{1,\pi(Y)/\pi(X)\}$。

## 答え
小さすぎると受理率は高いが少しずつしか移動せず、自己相関が高い。大きすぎると遠い提案の多くを棄却し、同じ状態に留まりやすい。

## 計算例
トレースが滑らかにゆっくり動くなら $\tau$ が小さすぎる疑いがある。

## 注意
受理率だけでなく自己相関と有効標本サイズも確認する。

<!-- CARD -->

---
id: sim-gibbs-bivariate-normal
title: 二変量正規分布のギブス更新式を書く
category: math-data-analysis
subcategory: math-simulation
topic: gibbs-sampling
type: formula
difficulty: 4
priority: C
hashtags: [MCMC, ギブスサンプリング, 二変量正規分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: MCMC }]
---

## 問題
$(X,Y)$ が平均0、分散1、相関係数 $|\rho|<1$ の二変量正規分布に従う。ギブス更新の完全条件付き分布を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

二変量正規分布の条件付き分布公式。

## 答え
$$X\mid Y=y\sim N(\rho y,1-\rho^2),$$
$$Y\mid X=x\sim N(\rho x,1-\rho^2).$$
$X^{(t+1)}$ を第1式、$Y^{(t+1)}$ を $X^{(t+1)}$ を使う第2式から順に生成する。

## 計算例
$\rho=0$ なら各更新は独立な $N(0,1)$。

## 注意
同じ掃引内では更新済みの $X^{(t+1)}$ を使う。

<!-- CARD -->

---
id: sim-mcmc-convergence-conditions
title: MCMCが定常分布へ収束する条件を判定する
category: math-data-analysis
subcategory: math-simulation
topic: mcmc-convergence
type: recognition
difficulty: 3
priority: B
hashtags: [MCMC, 既約性, 非周期性]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: MCMC }]
---

## 問題
離散状態のMCMCで、定常分布が一意で任意の初期状態からその分布へ収束するために確認すべき代表的な条件を述べよ。

## 記号・用語
- MCMC：マルコフ連鎖モンテカルロ法
- MH：Metropolis–Hastings法

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

既約性：任意のi,jについて、ある $m\ge1$ が存在して $(P^m)_{ij}>0$。非周期性：各状態iの帰還可能時刻集合 $\{m\ge1:(P^m)_{ii}>0\}$ の最大公約数が1。

## 答え
全ての状態間を有限ステップで移動できる既約性と、特定の周期にだけ帰還時刻が制限されない非周期性を確認する。有限状態なら、既約かつ非周期的なマルコフ連鎖は一意な定常分布をもち、任意の初期分布から収束する。

## 計算例
$P_{ii}>0$ をもつ既約な有限連鎖は非周期的。MH法では棄却による自己遷移が非周期性に寄与する。

## 注意
定常方程式 $\boldsymbol\pi P=\boldsymbol\pi$ を解けるだけでは収束は保証されない。

<!-- CARD -->

---
id: sim-burnin-thinning
title: burn-inとthinningの役割を区別する
category: math-data-analysis
subcategory: math-simulation
topic: mcmc-burnin-thinning
type: recognition
difficulty: 2
priority: C
hashtags: [MCMC, burn-in, thinning]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: MCMC }]
---

## 問題
MCMCのburn-inとthinningの目的を区別して述べよ。

## 記号・用語
- MCMC：マルコフ連鎖モンテカルロ法
- MCSE：モンテカルロ標準誤差

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

定常分布へ十分近づいた後の標本平均で $E_\pi[h(X)]$ を近似する。

## 答え
burn-inは初期値の影響が強い初期反復を捨てる操作。thinningは一定間隔で保存して系列相関や保存量を減らす操作。

## 計算例
10000反復から最初の1000を捨て、10個おきに保存すると900個を得る。

## 注意
thinningは計算済み標本を捨てるので、通常は全反復を使ってMCSEを評価する方が効率的。

<!-- CARD -->

---
id: sim-ess-mcse
title: 自己相関から有効標本サイズを計算する
category: math-data-analysis
subcategory: math-simulation
topic: mcmc-effective-sample-size
type: calc_step
difficulty: 4
priority: C
hashtags: [MCMC, 有効標本サイズ, Monte-Carlo標準誤差]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: MCMC }]
---

## 問題
有限分散をもちMCMC中心極限定理が成り立つ定常列の長さをm、ラグk自己相関を $\rho_k$ とする。$\sum_{k\ge1}|\rho_k|<\infty$ として、有効標本サイズ（ESS）と平均のMCSEを書き、$m=1000,\ 1+2\sum_{k\ge1}\rho_k=5$ で計算せよ。

## 記号・用語
- MCMC：マルコフ連鎖モンテカルロ法
- MCSE：モンテカルロ標準誤差
- ESS：有効標本サイズ（effective sample size）

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

MCMC中心極限定理の長期分散 $\sigma^2\{1+2\sum_{k\ge1}\rho_k\}$。

## 答え
$$m_{\mathrm{eff}}=\frac{m}{1+2\sum_{k\ge1}\rho_k}
=\frac{1000}{5}=200.$$
反復値の定常標準偏差を $\sigma$ とすると
$$\operatorname{MCSE}(\bar h)\approx\frac{\sigma}{\sqrt{m_{\mathrm{eff}}}}.$$

## 計算例
$\sigma=2$ ならMCSEは $2/\sqrt{200}\approx0.141$。

## 注意
自己相関が負ならESSがmを超えることもある。

<!-- CARD -->

---
id: boot-empirical-distribution
title: ノンパラメトリック・ブートストラップを再標本化から標準誤差まで通す
category: math-data-analysis
subcategory: math-simulation
topic: bootstrap-resampling-se-canonical
type: strategy
difficulty: 3
priority: B
hashtags:
  - ブートストラップ
  - 経験分布
  - リサンプリング
  - 標準誤差
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ブートストラップ
---

## 問題
標本 $x_1,\ldots,x_n$ と統計量 $\widehat\theta=T(x_1,\ldots,x_n)$ がある。
1. ノンパラメトリック・ブートストラップで再標本を生成する分布を書け。
2. $B$ 回の再標本から $\widehat\theta^{*(1)},\ldots,\widehat\theta^{*(B)}$ を得たとき、ブートストラップ標準誤差を書け。
3. 標本 $(1,2,3)$ から4個の再標本 $(1,1,2),(1,2,3),(2,3,3),(1,3,3)$ が得られ、統計量を標本平均とした。4個のブートストラップ推定値と、その標準偏差を計算せよ。

## 記号・用語
経験分布 $\widehat F_n$ は観測された各標本点へ確率 $1/n$ を置く分布である。$\widehat\theta^{*(b)}$ は第 $b$ ブートストラップ標本へ元と同じ統計量 $T$ を適用した値、$B$ は反復回数である。

## 使用公式・定理
経験分布は
$$
\widehat F_n(x)=\frac1n\sum_{i=1}^n\boldsymbol1_{\{x_i\le x\}}.
$$
各反復で
$$
X_1^*,\ldots,X_n^*\overset{\mathrm{iid}}{\sim}\widehat F_n
$$
と復元抽出し、
$$
\widehat\theta^{*(b)}=T(X_1^{*(b)},\ldots,X_n^{*(b)})
$$
を計算する。ブートストラップ推定値の平均を
$$
\overline{\theta^*}=\frac1B\sum_{b=1}^B\widehat\theta^{*(b)}
$$
とすると、標準誤差の推定値は
$$
\widehat{\operatorname{SE}}_{\mathrm{boot}}
=\sqrt{\frac1{B-1}\sum_{b=1}^B
\left(\widehat\theta^{*(b)}-\overline{\theta^*}\right)^2}.
$$

## 一手／方針
**元標本を母集団そのものだとみなすのではなく、経験分布を未知の母分布の代用品として使う。** そこから元と同じ大きさ $n$ を復元抽出し、元と同じ推定手順を繰り返す。最後に得られた推定値の散らばりを、元の推定量の標本変動の近似として読む。

## 答え
数値例の4個のブートストラップ平均は
$$
\frac43,\quad 2,\quad \frac83,\quad \frac73.
$$
その平均は
$$
\overline{\theta^*}=\frac{25}{12}.
$$
偏差平方和は
$$
\sum_{b=1}^4
\left(\widehat\theta^{*(b)}-\frac{25}{12}\right)^2
=\frac{35}{36},
$$
したがって
$$
\widehat{\operatorname{SE}}_{\mathrm{boot}}
=\sqrt{\frac{35}{108}}
\approx0.569.
$$

## 計算例
$n=3$ なら順序を区別した再標本は $3^3=27$ 通りあり得る。実際のブートストラップでは通常この全列挙ではなく、大きな $B$ をとって乱数で再標本化する。上の $B=4$ は計算手順を確認するためだけの小さな例である。

## 注意
復元抽出が本質であり、非復元抽出では元標本の並べ替えに近くなる。ブートストラップ標準誤差は**元の統計量の標本変動を近似する量**であり、有限回 $B$ しか反復しないことによるMonte Carlo誤差とは区別する。非滑らかな統計量、境界母数、極端値などでは通常のブートストラップがうまく近似しないことがある。

<!-- CARD -->

---
id: boot-bias-estimate
title: ブートストラップのバイアスを推定し補正値まで計算する
category: math-data-analysis
subcategory: math-simulation
topic: bootstrap-bias-correction-canonical
type: calc_step
difficulty: 2
priority: B
hashtags:
  - ブートストラップ
  - バイアス
  - バイアス補正
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ブートストラップ
---

## 問題
元の推定値が $\widehat\theta=10$、ブートストラップ反復の平均が $\overline{\theta^*}=10.6$ であった。
1. ブートストラップによるバイアス推定値を求めよ。
2. その推定バイアスを1次的に差し引いた補正推定値を求めよ。

## 記号・用語
$\widehat\theta$ は元標本からの推定値、$\overline{\theta^*}$ はブートストラップ推定値の反復平均である。ブートストラップでは経験分布の下で生じる推定量のずれを、元の母分布の下でのバイアスの近似として使う。

## 使用公式・定理
推定バイアスは
$$
\widehat{\operatorname{bias}}_{\mathrm{boot}}
=\overline{\theta^*}-\widehat\theta.
$$
これを元の推定値から引く1次バイアス補正は
$$
\widehat\theta_{\mathrm{bc}}
=\widehat\theta-\widehat{\operatorname{bias}}_{\mathrm{boot}}
=2\widehat\theta-\overline{\theta^*}.
$$

## 一手／方針
**「ブートストラップ世界で元の推定値からどちらへずれたか」を先に計算し、そのずれを元の推定値から逆向きに差し引く。** バイアスの符号と補正方向を別々に暗記しない。

## 答え
$$
\widehat{\operatorname{bias}}_{\mathrm{boot}}
=10.6-10=0.6.
$$
よって
$$
\widehat\theta_{\mathrm{bc}}
=10-0.6=9.4.
$$
同じ結果は $2(10)-10.6=9.4$ からも得られる。

## 計算例
もし $\overline{\theta^*}=9.7$ なら推定バイアスは $-0.3$ で、補正値は $10-(-0.3)=10.3$ となる。負のバイアスなら補正方向は上向きになる。

## 注意
バイアスを減らしても分散が増えれば平均二乗誤差が改善するとは限らない。補正式を機械的に適用する前に、ブートストラップ近似自体が妥当な状況かを確認する。

<!-- CARD -->

---
id: boot-percentile-ci
title: パーセンタイル区間と基本区間を同じ分位点から計算する
category: math-data-analysis
subcategory: math-simulation
topic: bootstrap-ci-percentile-basic-canonical
type: strategy
difficulty: 3
priority: B
hashtags:
  - ブートストラップ
  - パーセンタイル区間
  - 基本区間
  - 区間推定
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: Percentile区間
---

## 問題
元の推定値を $\widehat\theta=2.5$ とし、ブートストラップ分布の2.5%点と97.5%点が
$$
q_{0.025}^*=0.8,\qquad q_{0.975}^*=3.4
$$
であった。
1. 95%パーセンタイル区間を求めよ。
2. 95%基本区間（basic区間）を求めよ。
3. 2つの作り方の違いを述べよ。

## 記号・用語
$q_\alpha^*$ はブートストラップ推定値 $\widehat\theta^*$ の $\alpha$ 分位点である。パーセンタイル区間はこの分位点を直接使い、基本区間は $\widehat\theta^*-\widehat\theta$ の誤差分布を反転して作る。

## 使用公式・定理
両側 $100(1-\alpha)$% パーセンタイル区間は
$$
[q_{\alpha/2}^*,\ q_{1-\alpha/2}^*].
$$
基本区間は
$$
[2\widehat\theta-q_{1-\alpha/2}^*,\ 2\widehat\theta-q_{\alpha/2}^*].
$$
基本区間では誤差分布を反転するため、上側分位点が下端、下側分位点が上端に現れる。

## 一手／方針
**パーセンタイル区間は分位点をそのまま置く。basic区間は元の推定値 $\widehat\theta$ を中心に分位点を反射する。** 同じ分位点を使って2本を並べて計算すると混同しにくい。

## 答え
パーセンタイル区間は
$$
[0.8,3.4].
$$
基本区間は
$$
[2(2.5)-3.4,\ 2(2.5)-0.8]
=[1.6,4.2].
$$

## 計算例
$\widehat\theta=2.5$ に対し、下側分位点0.8は中心から1.7下、上側分位点3.4は0.9上にある。basic区間ではこの非対称な誤差を反対側へ写すため、下端は $2.5-0.9=1.6$、上端は $2.5+1.7=4.2$ となる。

## 注意
パーセンタイル区間とbasic区間は一般に一致しない。単調変換に対する性質なども異なる。どちらも有限標本で常に正確な被覆率を保証するわけではなく、強い歪みや境界問題では他の補正法が必要になることがある。

<!-- CARD -->

---
id: boot-parametric-nonparametric
title: パラメトリック・ブートストラップとノンパラメトリック・ブートストラップを区別する
category: math-data-analysis
subcategory: math-simulation
topic: bootstrap-types
type: recognition
difficulty: 2
priority: C
hashtags: [ブートストラップ, パラメトリック, ノンパラメトリック]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ブートストラップ }]
---

## 問題
パラメトリック・ブートストラップとノンパラメトリック・ブートストラップの再標本生成元を述べよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

どちらも再標本ごとに元と同じ推定手順で $\widehat\theta^*$ を計算する。

## 答え
Parametricは仮定したモデル $F_{\widehat\theta}$ から生成する。Nonparametricは経験分布 $\widehat F_n$、すなわち観測値から復元抽出する。

## 計算例
$X_i\sim N(\mu,\sigma^2)$ を仮定するparametric法なら $N(\bar X,\widehat\sigma^2)$ から生成する。

## 注意
Parametric法はモデルが正しければ効率的だが、誤指定の影響を受ける。

<!-- CARD -->

---
id: jackknife-leave-one-out
title: ジャックナイフを1個抜き推定から標準誤差まで通す
category: math-data-analysis
subcategory: math-simulation
topic: jackknife-resampling-se-canonical
type: strategy
difficulty: 3
priority: B
hashtags:
  - ジャックナイフ法
  - 1個抜き法
  - 標準誤差
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ブートストラップ
---

## 問題
標本 $(1,2,6)$ について統計量を標本平均とする。
1. 3個の1個抜き推定値 $\widehat\theta_{(-i)}$ と、その平均 $\overline\theta_{(-\cdot)}$ を求めよ。
2. ジャックナイフ標準誤差を求めよ。

## 記号・用語
$\widehat\theta_{(-i)}$ は第 $i$ 観測だけを除いた $n-1$ 個のデータへ元と同じ統計量を適用した値である。標準的なdelete-oneジャックナイフでは、この推定値を $n$ 個作る。

## 使用公式・定理
$$
\overline\theta_{(-\cdot)}
=\frac1n\sum_{i=1}^n\widehat\theta_{(-i)}.
$$
ジャックナイフ分散推定値と標準誤差は
$$
\widehat{\operatorname{Var}}_{\mathrm{jack}}(\widehat\theta)
=\frac{n-1}{n}\sum_{i=1}^n
\left(\widehat\theta_{(-i)}-\overline\theta_{(-\cdot)}\right)^2,
$$
$$
\widehat{\operatorname{SE}}_{\mathrm{jack}}
=\sqrt{\widehat{\operatorname{Var}}_{\mathrm{jack}}(\widehat\theta)}.
$$

## 一手／方針
**まず各観測を1個ずつ消して同じ推定をやり直し、その $n$ 個の推定値の散らばりを専用係数 $(n-1)/n$ で尺度化する。** 「1個抜き標本を作る」と「標準誤差を出す」を別手順として暗記しない。

## 答え
1個抜き推定値は
$$
\widehat\theta_{(-1)}=\frac{2+6}{2}=4,
$$
$$
\widehat\theta_{(-2)}=\frac{1+6}{2}=3.5,
$$
$$
\widehat\theta_{(-3)}=\frac{1+2}{2}=1.5.
$$
したがって
$$
\overline\theta_{(-\cdot)}=\frac{4+3.5+1.5}{3}=3.
$$
偏差平方和は
$$
(4-3)^2+(3.5-3)^2+(1.5-3)^2
=1+0.25+2.25=3.5.
$$
よって
$$
\widehat{\operatorname{SE}}_{\mathrm{jack}}
=\sqrt{\frac23\cdot3.5}
=\sqrt{\frac73}
\approx1.528.
$$

## 計算例
ブートストラップでは通常 $B$ を自由に大きく取るのに対し、標準的なdelete-oneジャックナイフの反復数は標本サイズと同じ $n$ 個である。

## 注意
係数 $(n-1)/n$ を通常の標本分散の係数 $1/(n-1)$ と混同しない。ジャックナイフは滑らかな統計量では有効だが、中央値など非滑らかな統計量では単純なdelete-one近似が不安定になる場合がある。

<!-- CARD -->

---
id: jackknife-bias
title: ジャックナイフ法のバイアス推定値を計算する
category: math-data-analysis
subcategory: math-simulation
topic: jackknife-bias
type: calc_step
difficulty: 3
priority: C
hashtags: [ジャックナイフ法, バイアス, バイアス補正]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ブートストラップ }]
---

## 問題
$n=5$、元の推定値 $\widehat\theta=2.0$、1個抜き推定値の平均 $\bar\theta_{(-\cdot)}=2.1$。ジャックナイフ法のバイアス推定値と補正値を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$\widehat\theta_{\mathrm{jack,bc}}
=n\widehat\theta-(n-1)\bar\theta_{(-\cdot)}.$$

## 答え
$$\widehat{\operatorname{bias}}_{\mathrm{jack}}
=(n-1)(\bar\theta_{(-\cdot)}-\widehat\theta)
=4(0.1)=0.4.$$
補正値は $2.0-0.4=1.6$。

## 計算例
$5(2.0)-4(2.1)=1.6$。

## 注意
ブートストラップのバイアス式にはない係数 $n-1$ が付く。

<!-- CARD -->

---
id: perm-test-principle
title: 置換検定が正確になる条件を答える
category: math-data-analysis
subcategory: math-simulation
topic: permutation-test
type: recognition
difficulty: 3
priority: B
hashtags: [置換検定, 交換可能性, リサンプリング]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 置換検定 }]
---

## 問題
2群のラベルを置換して帰無分布を作る検定が有限標本で正確な水準をもつための中心条件を述べよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

交換可能なら、観測されたラベル配置は全ての許容配置の中で一様。

## 答え
帰無仮説の下で、群ラベルを入れ替えてもデータの同時分布が変わらない交換可能性が必要。

## 計算例
2群が同一分布から独立に得られた帰無仮説では交換可能。

## 注意
平均だけ等しく分散や分布形が異なる場合、単純なラベル置換は一般に正確でない。

<!-- CARD -->

---
id: perm-test-numeric
title: 置換検定の正確P値を計算する
category: math-data-analysis
subcategory: math-simulation
topic: permutation-p-value
type: calc_step
difficulty: 3
priority: C
hashtags: [置換検定, P値, 数値計算]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 置換検定 }]
---

## 問題
全20通りのラベル配置のうち、観測統計量以上に極端な配置が3通り（観測配置を含む）だった。片側の正確P値を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

正確P値＝帰無仮説下で観測値以上に極端な配置数／全許容配置数。

## 答え
全配置を列挙した正確検定なので
$$p=\frac3{20}=0.15.$$

## 計算例
5%水準では棄却しない。

## 注意
Monte CarloでB個だけ置換する場合は、0を避ける補正 $(K+1)/(B+1)$ を使うことがある。

<!-- CARD -->

---
id: randomization-vs-permutation
title: ランダム化検定と置換検定を区別する
category: math-data-analysis
subcategory: math-simulation
topic: randomization-test
type: recognition
difficulty: 3
priority: C
hashtags: [ランダム化検定, 置換検定, 無作為割付]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ランダム化検定 }]
---

## 問題
ランダム化検定と置換検定で、帰無分布を正当化する根拠を区別せよ。

## 記号・用語
- 置換検定：帰無仮説下で交換可能なラベルを入れ替え、統計量の帰無分布を作る検定

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

いずれも、帰無仮説下で許される再配置に対する統計量の分布を使う。

## 答え
ランダム化検定は実験で実際に用いた無作為割付機構を反復する。置換検定は帰無仮説下の交換可能性に基づいてラベルを入れ替える。

## 計算例
完全無作為化実験では処置人数を固定した全割付を列挙する。

## 注意
観察研究で実験上の無作為割付を仮定してはならない。

<!-- CARD -->

---
id: cv-kfold-estimator
title: k-fold交差検証誤差を書く
category: math-data-analysis
subcategory: math-simulation
topic: cross-validation
type: formula
difficulty: 3
priority: B
hashtags: [クロスバリデーション, k-fold, 予測誤差]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: クロスバリデーション }]
---

## 問題
標本を互いに素なk個のfold $I_1,\ldots,I_k$ に分けたときの交差検証誤差を書け。

## 記号・用語
- CV：交差検証（cross-validation）

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

各観測は学習に使われていないモデルで1回評価される。

## 答え
fold jを除いて学習した予測器を $\widehat f^{(-j)}$ とすると
$$\operatorname{CV}_k
=\frac1n\sum_{j=1}^k\sum_{i\in I_j}
L\{Y_i,\widehat f^{(-j)}(X_i)\}.$$

## 計算例
各foldの損失和が $(8,10,12)$、$n=15$ なら $\operatorname{CV}_3=30/15=2$。

## 注意
foldサイズが異なるとき、fold平均の単純平均より全損失をnで割る式が安全。

<!-- CARD -->

---
id: cv-loocv-kfold
title: LOOCVとk-fold CVの差を判断する
category: math-data-analysis
subcategory: math-simulation
topic: loocv-kfold
type: recognition
difficulty: 3
priority: C
hashtags: [クロスバリデーション, LOOCV, k-fold]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: LOOCVとk-fold CV }]
---

## 問題
LOOCVと通常のk-fold CVを、学習標本サイズ・計算量・推定誤差の観点で比較せよ。

## 記号・用語
- LOOCV：1個抜き交差検証（leave-one-out cross-validation）
- CV：交差検証（cross-validation）

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

LOOCV：
$$\operatorname{CV}_{\mathrm{LOO}}=\frac1n\sum_{i=1}^n
L\{Y_i,\widehat f^{(-i)}(X_i)\}.$$

## 答え
LOOCVは $k=n$ で毎回 $n-1$ 個を学習に使うため学習標本減少によるバイアスは小さいが、n回の適合が必要で、評価値同士の相関により分散が大きくなり得る。小さいkのCVは計算が軽いが、各学習標本が小さくバイアスが増えやすい。

## 計算例
$n=100$ ならLOOCVは100回、5-foldは5回のモデル適合。

## 注意
データ依存性がある時系列では無作為fold分割をそのまま使わない。

<!-- CARD -->

---
id: boot-sampling-distribution-relation
title: ブートストラップ分布と標本抽出分布の対応を書く
category: math-data-analysis
subcategory: math-simulation
topic: bootstrap-sampling-distribution
type: recognition
difficulty: 4
priority: C
hashtags: [ブートストラップ, 標本抽出分布, プラグイン原理]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ブートストラップ }]
---

## 問題
ブートストラップ分布が近似する標本抽出分布を、条件付き分布の形で書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

未知のFを経験分布 $\widehat F_n$ で置き換えるプラグイン原理。

## 答え
真の分布Fの下の
$$\mathcal L_F\{\widehat\theta-\theta(F)\}$$
を、観測標本に条件付けた
$$\mathcal L_{\widehat F_n}
\{\widehat\theta^*-\widehat\theta\mid X_1,\ldots,X_n\}$$
で近似する。

## 計算例
この近似分布の標準偏差がブートストラップ標準誤差。

## 注意
非滑らかな統計量、境界母数、極端値では通常のブートストラップが一致しないことがある。
