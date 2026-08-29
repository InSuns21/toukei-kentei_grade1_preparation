---
id: prob-total-expectation
title: 全期待値の法則で分割した期待値を集める
category: math-probability
subcategory: math-distribution-characteristics
topic: total-expectation
type: formula
difficulty: 2
priority: S
hashtags: [全期待値の法則, 条件付き期待値, 周辺化]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 期待値 }]
---
## 問題
$P(Y=0)=0.4$、$P(Y=1)=0.6$ の離散変数 $Y$ に対し、$E[X\mid Y=0]=2$、$E[X\mid Y=1]=5$ とする。$E[X]$ を求めよ。

## 答え
各 $Y$ の値に応じた条件付き期待値を、その $Y$ の確率で重み付けして足す。

## 使用公式・定理
全期待値の法則
$$E[X]=E[E[X\mid Y]].$$
離散の $Y$ では
$$E[X]=\sum_y E[X\mid Y=y]\,P(Y=y).$$

## 計算例
$$E[X]=2\cdot0.4+5\cdot0.6=0.8+3.0=3.8.$$

## 一手
$Y$ の取る値で場合分けし、各条件付き期待値を $P(Y=y)$ で重み付けして和を取る。

## 注意
$E[X\mid Y]$ は $Y$ の関数である。この合成期待値 $E[E[X\mid Y]]$ が $E[X]$ に等しいことを全期待値の法則（二重期待値の定理）と呼ぶ。

<!-- CARD -->
---
id: prob-total-variance
title: 全分散の法則で分散を2成分に分解する
category: math-probability
subcategory: math-distribution-characteristics
topic: total-variance
type: formula
difficulty: 3
priority: S
hashtags: [全分散の法則, 分散の分解, 条件付き分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 分散 }]
---
## 問題
$Y$ に応じて $E[X\mid Y]$ と $\operatorname{Var}(X\mid Y)$ が判明しているとき、全体の $\operatorname{Var}(X)$ を2項に分解せよ。

## 答え
$$\operatorname{Var}(X)=E[\operatorname{Var}(X\mid Y)]+\operatorname{Var}(E[X\mid Y]).$$
第1項は「条件付き分散の平均」、第2項は「条件平均の分散」と呼ばれる。

## 使用公式・定理
$E[X^2]<\infty$ のとき、全分散の法則
$$\operatorname{Var}(X)=E[\operatorname{Var}(X\mid Y)]+\operatorname{Var}(E[X\mid Y]).$$
実際、$m(Y)=E[X\mid Y]$ と置くと
$$X-E[X]=\{X-m(Y)\}+\{m(Y)-E[X]\}.$$
両辺を2乗して期待値を取る。交差項は
$$E[(X-m(Y))(m(Y)-E[X])]
=E[E[X-m(Y)\mid Y](m(Y)-E[X])]=0$$
なので、残る2項がそれぞれ $E[\operatorname{Var}(X\mid Y)]$ と $\operatorname{Var}(E[X\mid Y])$ になる。

## 計算例
$E[\operatorname{Var}(X\mid Y)]=4$、$\operatorname{Var}(E[X\mid Y])=3$ なら
$$\operatorname{Var}(X)=4+3=7.$$

## 一手
「条件の散布を平均した項」と「条件平均のばらつきの項」の2つの項に分ける。分散の有限性 $E[X^2]<\infty$ が前提。

## 注意
全期待値の法則と対になる。$E[X\mid Y]$ の分布を先に整理してから計算すると符号を間違えにくい。

<!-- CARD -->
---
id: prob-conditional-covariance
title: 条件付き共分散を分解して全体の共分散へ接続する
category: math-probability
subcategory: math-distribution-characteristics
topic: conditional-covariance
type: formula
difficulty: 3
priority: S
hashtags: [条件付き共分散, 共分散, 全分散の拡張]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 共分散 }]
---
## 問題
条件付き共分散 $\operatorname{Cov}(X,Y\mid Z)$ と条件平均 $E[X\mid Z],E[Y\mid Z]$ を用いて、無条件の $\operatorname{Cov}(X,Y)$ を分解せよ。

## 答え
$$
\operatorname{Cov}(X,Y)
=E[\operatorname{Cov}(X,Y\mid Z)]
+\operatorname{Cov}(E[X\mid Z],E[Y\mid Z]).
$$
$Y=X$ とすれば全分散の法則になる。

## 使用公式・定理
$E[X^2],E[Y^2]<\infty$ とする。条件付き共分散を用いると
$$
\operatorname{Cov}(X,Y)
=E[\operatorname{Cov}(X,Y\mid Z)]
+\operatorname{Cov}(E[X\mid Z],E[Y\mid Z]).
$$
これは「各条件の中に残る共変動の平均」と「条件平均どうしの共変動」の和である。

ここで $Y=X$ と置けば
$$
\operatorname{Cov}(X,X)=\operatorname{Var}(X),
$$
$$
\operatorname{Cov}(X,X\mid Z)=\operatorname{Var}(X\mid Z)
$$
なので、全分散の法則
$$
\operatorname{Var}(X)
=E[\operatorname{Var}(X\mid Z)]
+\operatorname{Var}(E[X\mid Z])
$$
が直ちに得られる。したがって全分散は全共分散の特殊形である。

## 計算例
例えば
$$
E[\operatorname{Cov}(X,Y\mid Z)]=2,
\qquad
\operatorname{Cov}(E[X\mid Z],E[Y\mid Z])=3
$$
なら
$$
\operatorname{Cov}(X,Y)=2+3=5.
$$

同じ式で $Y=X$ とし、
$$
E[\operatorname{Var}(X\mid Z)]=4,
\qquad
\operatorname{Var}(E[X\mid Z])=3
$$
なら
$$
\operatorname{Var}(X)=4+3=7.
$$

導出では
$$
X-E[X]=\{X-E[X\mid Z]\}+\{E[X\mid Z]-E[X]\}
$$
と $Y$ の同様な分解を掛け合わせる。混合交差項は、例えば
$$
E\!\left[(X-E[X\mid Z])\{E[Y\mid Z]-E[Y]\}\right]
$$
を $Z$ で条件付けると
$$
E[X-E[X\mid Z]\mid Z]=0
$$
なので消える。

## 一手
条件付きで残るばらつき・共変動と、条件平均そのもののばらつき・共変動に分ける。分散が欲しければ全共分散式で $Y=X$ と置く。

## 注意
第1項と第2項を逆符号にしない。全分散・全共分散はいずれも二次モーメントの有限性を前提とする。

<!-- CARD -->
---
id: prob-covariance-matrix-components
title: 分散共分散行列の成分を対角・非対角で読み取る
category: math-probability
subcategory: math-distribution-characteristics
topic: covariance-matrix-components
type: recognition
difficulty: 2
priority: S
hashtags: [共分散行列, 分散共分散行列, 成分]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 分散共分散行列 }]
---
## 問題
$p$ 変量ベクトル $\boldsymbol X$ の分散共分散行列 $\boldsymbol\Sigma=\operatorname{Cov}(\boldsymbol X)$ の第 $ij$ 成分 $\Sigma_{ij}$ はどのような量か。特に $i=j$ と $i\ne j$ の場合を述べよ。

## 答え
$$\Sigma_{ii}=\operatorname{Var}(X_i),\quad \Sigma_{ij}=\operatorname{Cov}(X_i,X_j)\ (i\ne j).$$
対角成分は各変数の分散、非対角成分は変数対の共分散である。

## 使用公式・定理
$$\boldsymbol\Sigma=E[(\boldsymbol X-E[\boldsymbol X])(\boldsymbol X-E[\boldsymbol X])^{\mathsf T}],$$
その $ij$ 成分は
$$\Sigma_{ij}=E[(X_i-E[X_i])(X_j-E[X_j])].$$

## 計算例
$\operatorname{Var}(X_1)=4,\ \operatorname{Var}(X_2)=9,\ \operatorname{Cov}(X_1,X_2)=3$ なら
$$\operatorname{Cov}(\boldsymbol X)=\begin{pmatrix}4&3\\3&9\end{pmatrix}.$$

## 一手
対角は分散、非対角は共分散。分散共分散行列は常に対称行列になる。

## 注意
任意の実数ベクトル $\boldsymbol a$ に対し $\boldsymbol a^{\mathsf T}\boldsymbol\Sigma\boldsymbol a=\operatorname{Var}(\boldsymbol a^{\mathsf T}\boldsymbol X)\ge0$ なので半正定値である。

<!-- CARD -->
---
id: prob-cauchy-schwarz-correlation
title: コーシー–シュワルツの不等式で相関係数の範囲を確定する
category: math-probability
subcategory: math-distribution-characteristics
topic: cauchy-schwarz-correlation
type: theorem
difficulty: 2
priority: A
hashtags: [コーシー–シュワルツの不等式, 相関係数, 不等式]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 相関係数 }]
---
## 問題
$E[X^2],E[Y^2]<\infty$ のとき、相関係数 $\rho_{X,Y}$ の取り得る範囲を求めよ。

## 答え
$-1\le\rho_{X,Y}\le1.$
$\operatorname{Var}(X),\operatorname{Var}(Y)>0$（非退化）の下で、$\lvert\rho\rvert=1$ は直線関係 $Y=aX+b$（$a\ne0$）と同値になる。

## 使用公式・定理
Cauchy–Schwarzの不等式の期待値版
$$\operatorname{Cov}(X,Y)^2\le\operatorname{Var}(X)\operatorname{Var}(Y).$$
$\rho_{X,Y}=\operatorname{Cov}(X,Y)/(\sigma_X\sigma_Y)$ より、両辺を $(\sigma_X\sigma_Y)^2$ で割ると $0\le\rho^2\le1$。

## 計算例
$\operatorname{Var}(X)=16,\ \operatorname{Var}(Y)=25$ なら
$$\lvert\operatorname{Cov}(X,Y)\rvert\le\sqrt{16\cdot25}=20.$$

## 一手
$\operatorname{Cov}(X,Y)$ にコーシー不等式を適用し、標準偏差の積で割って無次元化する。

## 注意
$\rho=0$ は無相関を表し、独立性は含意しない。$\lvert\rho\rvert=1$ は退化した直線関係。

<!-- CARD -->
---
id: prob-jensen-inequality
title: Jensenの不等式で凸関数の期待値の向きを定める
category: math-probability
subcategory: math-distribution-characteristics
topic: jensen-inequality
type: theorem
difficulty: 2
priority: A
hashtags: [Jensen, 凸関数, 不等式]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 期待値 }]
---
## 問題
凸関数 $g$ について、$E[g(X)]$ と $g(E[X])$ の大小を述べよ。$g(x)=x^2$ の場合を具体例で確認せよ。

## 答え
$g$ が凸ならば
$$E[g(X)]\ge g(E[X]).$$
$g$ が凹なら不等号の向きが反対になる。

## 使用公式・定理
Jensenの不等式
$$E[g(X)]\ge g(E[X])\quad\text{（$g$ は凸）}.$$

## 計算例
$P(X=0)=P(X=2)=1/2$ なら $E[X]=1,\ E[X^2]=2$ であり凸関数 $g(x)=x^2$ について
$$E[X^2]=2\ge g(E[X])=1^2=1.$$

## 一手
凸なら「関数の期待値 ≥ 期待値の関数」、凹なら逆向き。$x^2,e^x$ は凸、$\log x,\sqrt x$ は凹。

## 注意
等号 $E[g(X)]=g(E[X])$ は、$X$ が確率1で定数なら成り立つ。非退化な $X$ でも、$g$ が $X$ の値域の凸包上で線形なら等号になりうる。したがって、非退化な $X$ に対して狭義不等号を結論するには、$g$ がその値域の凸包上で狭義凸であることを確認する。

<!-- CARD -->
---
id: prob-markov-inequality
title: Markovの不等式で非負変数の超過確率を抑える
category: math-probability
subcategory: math-distribution-characteristics
topic: markov-inequality
type: theorem
difficulty: 2
priority: A
hashtags: [Markovの不等式, 超過確率, 期待値]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 期待値 }]
---
## 問題
$X\ge0$（非負）で $E[X]=2$ のとき、$P(X\ge10)$ の上界を求めよ。

## 答え
$$P(X\ge a)\le\frac{E[X]}{a},\qquad a>0.$$
実際の確率はこの上界以下になる。

## 使用公式・定理
非負変数 $X\ge0$ に対するMarkovの不等式
$$aP(X\ge a)\le E[X],\qquad a>0.$$
指示関数を $\mathbf 1_{\{X\ge a\}}$ と書けば、各標本点で
$$X\ge a\mathbf 1_{\{X\ge a\}}$$
だから、期待値を取って
$$E[X]\ge aE[\mathbf 1_{\{X\ge a\}}]=aP(X\ge a)$$
を得る。

## 計算例
$$P(X\ge10)\le\frac2{10}=0.2.$$

## 一手
$X\ge0$ の非負性と $a>0$ を確認し、$aP(X\ge a)$ を $E[X]$ で上から押さえる。

## 注意
負の値を取る変数には成立しない。$a$ は正の閾値に限定する。

<!-- CARD -->
---
id: prob-chebyshev-inequality
title: チェビシェフの不等式で分散から超過確率を評価する
category: math-probability
subcategory: math-distribution-characteristics
topic: chebyshev-inequality
type: theorem
difficulty: 2
priority: A
hashtags: [チェビシェフの不等式, 分散, 超過確率]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 分散 }]
---
## 問題
$E[X]=\mu,\ 0<\operatorname{Var}(X)=\sigma^2<\infty$ のとき、$P(\lvert X-\mu\rvert\ge k\sigma)$ の上界を求めよ。

## 答え
$$
P(|X-\mu|\ge k\sigma)\le\frac1{k^2},\qquad k>0.
$$
これは $(X-\mu)^2$ にMarkovの不等式を適用した特殊形である。

## 使用公式・定理
非負確率変数 $Y\ge0$ と $a>0$ に対するMarkovの不等式は
$$
P(Y\ge a)\le\frac{E[Y]}{a}.
$$
なぜなら
$$
Y\ge a\mathbf 1_{\{Y\ge a\}}
$$
なので期待値を取れば
$$
E[Y]\ge aP(Y\ge a)
$$
となるからである。

これを
$$
Y=(X-\mu)^2\ge0
$$
に適用すると、$\operatorname{Var}(X)=\sigma^2<\infty$ に対して
$$
\begin{aligned}
P(|X-\mu|\ge t)
&=P\{(X-\mu)^2\ge t^2\}\\
&\le\frac{E[(X-\mu)^2]}{t^2}\\
&=\frac{\sigma^2}{t^2}.
\end{aligned}
$$
これがチェビシェフの不等式である。$t=k\sigma$ とすれば
$$
P(|X-\mu|\ge k\sigma)\le\frac1{k^2}.
$$

## 計算例
Markovの不等式そのものの例として、$Y\ge0$, $E[Y]=2$ なら
$$
P(Y\ge10)\le\frac2{10}=0.2.
$$

次に $E[X]=\mu$, $\operatorname{Var}(X)=\sigma^2$ なら
$$
P(|X-\mu|\ge2\sigma)\le\frac14,
$$
$$
P(|X-\mu|\ge3\sigma)\le\frac19.
$$
分布型を仮定していない点が重要である。

## 一手
非負量の超過確率ならまずMarkovを考える。平均からの偏差確率なら非負量 $(X-\mu)^2$ を作り、Markovを適用してチェビシェフへ落とす。

## 注意
Markovの不等式では対象変数の非負性と正の閾値が必要。チェビシェフの不等式は分布型に依存しないため、正規分布などを仮定した精密な尾確率より一般に保守的である。
