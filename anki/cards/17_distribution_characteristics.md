---
id: prob-expected-value-function
title: 確率変数の関数の期待値を求める
category: math-probability
subcategory: math-distribution-characteristics
topic: expectation-function
type: calc_step
difficulty: 2
priority: S
hashtags: [期待値, 関数の期待値, LOTUS]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 期待値 }]
---
## 問題
$X$ の確率密度関数を $f_X(x)=1$（$0<x<1$）、それ以外で0とする。$E[X^2]$ を求めよ。

## 答え
$X\sim U(0,1)$ なら
$$
E[X^2]=\int_0^1x^2\,dx=\frac13.
$$
$X^2$ の分布を先に求める必要はない。

## 使用公式・定理
期待値は「値を確率で重み付けして平均する」操作である。確率変数の関数 $g(X)$ について、期待値が存在するとき
$$
E[g(X)]=\sum_x g(x)p_X(x)
$$
（離散型）、
$$
E[g(X)]=\int_{-\infty}^{\infty}g(x)f_X(x)\,dx
$$
（連続型）である。$g(x)=x$ とすれば通常の期待値になる。

また期待値が存在するなら、独立性を仮定せず
$$
E[aX+bY+c]=aE[X]+bE[Y]+c
$$
が成り立つ。

## 計算例
離散型の例として
$$
P(X=1)=0.2,\quad P(X=2)=0.5,\quad P(X=3)=0.3
$$
なら
$$
E[X]=1\cdot0.2+2\cdot0.5+3\cdot0.3=2.1.
$$

連続型で $f_X(x)=2x$（$0<x<1$）なら
$$
\begin{aligned}
E[X]
&=\int_0^1x\cdot2x\,dx\\
&=\int_0^12x^2\,dx\\
&=\frac23.
\end{aligned}
$$

関数の期待値では、$X\sim U(0,1)$ に対して
$$
E[X^2]=\int_0^1x^2\,dx=\frac13.
$$
これは
$$
E[X^2]\ne E[X]^2=\frac14
$$
であることも示す。

最後に $E[X]=3,E[Y]=-1$ なら、独立性を使わず
$$
E[2X-3Y+4]=2\cdot3-3(-1)+4=13.
$$

## 一手
求めたい量を $g(X)$ と見て、離散なら総和、連続なら積分で直接平均する。線形結合なら期待値の線形性で項ごとに分ける。

## 注意
密度だけを積分すれば1になる。期待値では必ず求めたい関数 $g(x)$ を掛ける。期待値の線形性には独立性は不要である。

<!-- CARD -->

---
id: prob-variance-independent-sum
title: 独立な確率変数の和の分散を求める
category: math-probability
subcategory: math-distribution-characteristics
topic: variance-sum
type: calc_step
difficulty: 2
priority: A
hashtags: [分散, 統計的独立, 和]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 分散 }]
---
## 問題
独立な $X,Y$ について $\operatorname{Var}(X)=4$、$\operatorname{Var}(Y)=9$ とする。$\operatorname{Var}(X+Y)$ と $\operatorname{Var}(X-Y)$ を求めよ。

## 答え
独立な $X,Y$ に対し $\operatorname{Var}(X)=4,\operatorname{Var}(Y)=9$ なら
$$
\operatorname{Var}(X+Y)=\operatorname{Var}(X-Y)=13.
$$

## 使用公式・定理
分散が有限な $X,Y$ と定数 $a,b,c$ について
$$
\operatorname{Var}(aX+bY+c)
=a^2\operatorname{Var}(X)+b^2\operatorname{Var}(Y)
+2ab\operatorname{Cov}(X,Y).
$$
定数 $c$ は分散へ影響しない。

$Y$ を使わない特殊形では
$$
\operatorname{Var}(aX+c)=a^2\operatorname{Var}(X).
$$
$X,Y$ が独立なら $\operatorname{Cov}(X,Y)=0$ なので
$$
\operatorname{Var}(aX+bY)
=a^2\operatorname{Var}(X)+b^2\operatorname{Var}(Y).
$$

さらに $\mu=E[X]$, $\sigma^2=\operatorname{Var}(X)>0$ として
$$
Z=\frac{X-\mu}{\sigma}
$$
と標準化すれば
$$E[Z]=0,\qquad \operatorname{Var}(Z)=1.$$

## 計算例
一般式へ $a=1,b=\pm1$ を入れ、独立性から共分散を0にすると
$$
\operatorname{Var}(X+Y)=4+9=13,
$$
$$
\operatorname{Var}(X-Y)=4+(-1)^2\cdot9=13.
$$
引き算でも係数は二乗される。

1変数の例として $\operatorname{Var}(X)=5$ なら
$$
\operatorname{Var}(3X-2)=3^2\cdot5=45.
$$
シフト $-2$ は消える。

また $E[X]=10,\operatorname{Var}(X)=25$ では $\sigma=5$ だから
$$Z=\frac{X-10}{5}.$$
期待値の線形性より
$$E[Z]=\frac{10-10}{5}=0,$$
分散のスケール則より
$$
\operatorname{Var}(Z)=\frac1{25}\operatorname{Var}(X)=1.
$$

## 一手
まず一般式の共分散項まで書く。独立性が与えられたときだけ共分散項を0にし、1変数なら不要な項を落とす。

## 注意
独立でない和の分散で共分散項を落とさない。標準化では分散ではなく標準偏差 $\sigma$ で割る。

<!-- CARD -->

---
id: prob-skewness-definition
title: 歪度を三次中心モーメントから計算する
category: math-probability
subcategory: math-distribution-characteristics
topic: skewness
type: calc_step
difficulty: 3
priority: S
hashtags: [歪度, モーメント, 分布の形状]
frequency: { past_exam: 1, textbook: 0, independent_problems: 0, source_confirmations: 1 }
sources: [{ type: official_syllabus, topic: 歪度 }, { type: past_exam, id: MATH-2017-Q1, topic: 標本平均の歪度・尖度 }]
---
## 問題
$X$ の確率質量関数を $p_X(0)=0.5$、$p_X(1)=0.3$、$p_X(2)=0.2$ とする。歪度を求めよ。

## 答え
$P(X=0)=0.5,P(X=1)=0.3,P(X=2)=0.2$ では
$$\gamma_1\approx0.579.$$

## 使用公式・定理
原点まわりのモーメントを
$$\mu_k'=E[X^k],\qquad \mu=\mu_1'$$
とする。二次中心モーメントは
$$
\mu_2=E[(X-\mu)^2]
=\mu_2'-(\mu_1')^2
=\operatorname{Var}(X).
$$
三次中心モーメントは二項展開から
$$
\begin{aligned}
\mu_3
&=E[(X-\mu)^3]\\
&=\mu_3'-3\mu_2'\mu_1'+2(\mu_1')^3.
\end{aligned}
$$
$0<\sigma^2=\mu_2<\infty$ かつ三次モーメントが存在するとき、歪度は
$$
\gamma_1=\frac{\mu_3}{\sigma^3}.
$$

## 計算例
原点まわりのモーメントは
$$
\mu_1'=0.7,\qquad \mu_2'=1.1,\qquad \mu_3'=1.9.
$$
まず
$$
\mu_2=1.1-0.7^2=0.61.
$$
次に
$$
\begin{aligned}
\mu_3
&=1.9-3(1.1)(0.7)+2(0.7)^3\\
&=0.276.
\end{aligned}
$$
したがって
$$
\gamma_1=\frac{0.276}{0.61^{3/2}}\approx0.579.
$$

公式自体は
$$
(X-\mu)^3=X^3-3\mu X^2+3\mu^2X-\mu^3
$$
を期待値に入れ、$E[X]=\mu$ と整理すれば導ける。

## 一手
原点まわりの $\mu_1',\mu_2',\mu_3'$ を先に求め、二次中心モーメント、三次中心モーメント、標準化の順に進む。

## 注意
正の歪度は右側の大きな偏差が三次中心モーメントを優勢にしていることを示し、典型的には右歪みを示唆する。負なら逆方向。ただし歪度0は対称性の十分条件ではなく、符号だけから裾の長さを断定もできない。

<!-- CARD -->

---
id: prob-kurtosis-definition
title: 尖度を四次中心モーメントから計算する
category: math-probability
subcategory: math-distribution-characteristics
topic: kurtosis
type: calc_step
difficulty: 3
priority: S
hashtags: [尖度, モーメント, 分布の形状]
frequency: { past_exam: 1, textbook: 0, independent_problems: 0, source_confirmations: 1 }
sources: [{ type: official_syllabus, topic: 尖度 }, { type: past_exam, id: MATH-2017-Q1, topic: 標本平均の歪度・尖度 }]
---
## 問題
$X$ を $p_X(-1)=p_X(1)=1/2$ の確率質量関数を持つ確率変数とする。尖度 $\mu_4/\sigma^4$ を求めよ。

## 答え
$P(X=-1)=P(X=1)=1/2$ では
$$\mu=0,\qquad \sigma^2=1,\qquad \mu_4=1,$$
よって尖度は
$$\gamma_2=1.$$

## 使用公式・定理
四次中心モーメントが存在し $\sigma^2=\operatorname{Var}(X)>0$ のとき、尖度は
$$
\gamma_2=\frac{E[(X-\mu)^4]}{\sigma^4}
=\frac{\mu_4}{\sigma^4}.
$$
正規分布の尖度は3であり、
$$
\gamma_2-3
$$
を超過尖度と呼ぶ。

尖度は標準化四次モーメントなので、平均から遠い値の影響を強く受ける。3より大きい値は典型的には正規分布より大きな外れ値感度・重い裾と整合し、3より小さければ逆方向を示唆する。

## 計算例
対称性から
$$E[X]=0.$$
したがって
$$
\sigma^2=E[X^2]
=(-1)^2\frac12+1^2\frac12=1,
$$
$$
\mu_4=E[X^4]
=(-1)^4\frac12+1^4\frac12=1.
$$
よって
$$
\gamma_2=\frac{1}{1^2}=1,
\qquad \gamma_2-3=-2.
$$

例えば尖度6と2を正規分布の3と比べるなら、6は平均から遠い値への四次モーメント上の感度が高く、2は低い。ただしこれは尾確率を全ての閾値で順序付ける主張ではない。

## 一手
平均を求め、四次中心モーメントと分散を計算し、最後に $\sigma^4$ で標準化する。解釈では必ず正規分布の3を基準にする。

## 注意
「尖度が大きいから全ての閾値で尾確率が大きい」とは言えない。尖度は1個の標準化モーメントであり、分布の尾全体を一意に決める量ではない。

<!-- CARD -->

---
id: prob-coefficient-of-variation
title: 変動係数で相対的なばらつきを比較する
category: math-probability
subcategory: math-distribution-characteristics
topic: coefficient-of-variation
type: calc_step
difficulty: 1
priority: A
hashtags: [変動係数, 標準偏差, 相対ばらつき]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 変動係数 }]
---
## 問題
集団Aは平均50、標準偏差10、集団Bは平均200、標準偏差30である。変動係数で相対的なばらつきを比較せよ。

## 答え
標準偏差を平均で割った変動係数が大きいほど、平均に対する相対的なばらつきが大きい。

## 使用公式・定理
比率尺度で平均 $\mu>0$、標準偏差 $\sigma$ の分布の変動係数は
$CV=\frac{\sigma}{\mu}.$
負の平均を持つ分布や原点を任意に移せる尺度には適さない。

## 計算例
$$CV_A=\frac{10}{50}=0.20,\qquad CV_B=\frac{30}{200}=0.15.$$
$CV_A>CV_B$ なので、集団Aの方が平均に対する相対的なばらつきが大きい。

## 一手
標準偏差の絶対値ではなく、平均で割った比で比較する。

## 注意
平均が0に近い分布では変動係数が不安定になり、比較指標として意味を持たない。

<!-- CARD -->

---
id: prob-percentile-from-cdf
title: 累積分布関数からパーセント点を求める
category: math-probability
subcategory: math-distribution-characteristics
topic: percentile
type: calc_step
difficulty: 2
priority: A
hashtags: [パーセント点, 累積分布関数, 逆関数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: パーセント点 }]
---
## 問題
$X$ の累積分布関数を $F_X(x)=1-e^{-x}$（$x>0$）とする。上側5パーセント点（$P(X>x)=0.05$ となる $x$）を求めよ。

## 答え
$F_X(x)=1-e^{-x}$（$x>0$）の上側5パーセント点は
$$
x=-\log0.05=\log20\approx3.00.
$$

## 使用公式・定理
第 $p$ 分位点は一般に
$$
q_p=\inf\{x:F_X(x)\ge p\},\qquad 0<p<1
$$
と定義する。連続かつ狭義単調増加な累積分布関数なら
$$F_X(q_p)=p$$
を解けばよい。

特殊な名前は
$$
\text{中央値}=q_{0.5},\qquad Q_1=q_{0.25},\qquad Q_3=q_{0.75},
$$
$$
\operatorname{IQR}=Q_3-Q_1.
$$
上側 $100\alpha$ パーセント点は
$$F_X(x)=1-\alpha$$
の解である。

## 計算例
上側5パーセント点では
$$
1-e^{-x}=0.95
$$
だから
$$e^{-x}=0.05,
\qquad x=-\log0.05=\log20.
$$

中央値の例として $f_X(x)=3x^2$（$0<x<1$）なら
$$
F_X(x)=\int_0^x3u^2\,du=x^3.
$$
したがって
$$
F_X(m)=\frac12
\Longrightarrow m^3=\frac12
\Longrightarrow m=2^{-1/3}.
$$

四分位数の例として $X\sim U(0,4)$ では $F_X(x)=x/4$ なので
$$Q_1=1,\qquad Q_3=3,$$
よって
$$\operatorname{IQR}=3-1=2.$$

## 一手
「中央値」「四分位数」「パーセント点」を別公式として覚えず、全て $F_X(q_p)=p$ という分位点の逆問題へ直す。

## 注意
上側 $\alpha$ は累積確率 $1-\alpha$ に対応する。離散分布では等式 $F(q_p)=p$ を満たす点が存在しないことがあるため、一般定義の下限を使う。

<!-- CARD -->

---
id: prob-range-definition
title: 分布の範囲を台から求める
category: math-probability
subcategory: math-distribution-characteristics
topic: range
type: calc_step
difficulty: 1
priority: A
hashtags: [範囲, 台, 分布の特性値]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 範囲 }]
---
## 問題
$X$ の確率密度関数を $f_X(x)=2(1-x)$（$0<x<1$）、それ以外で0とする。この分布の範囲を求めよ。

## 答え
台の上限と下限の差を取る。

## 使用公式・定理
分布の範囲は、台の上限 $\sup$ と下限 $\inf$ の差
$$\text{範囲}=\sup(\text{台})-\inf(\text{台}).$$

## 計算例
台は $0<x<1$ なので
$$\text{範囲}=1-0=1.$$

## 一手
密度が正になる区間を確認し、端点の差を取る。

## 注意
台が非有界（例えば $x>0$）の分布では範囲は有限値を持たない。範囲は外れ値に強く影響される粗い散布度である。

<!-- CARD -->

---
id: prob-mode-from-density
title: 密度の最大点として最頻値を求める
category: math-probability
subcategory: math-distribution-characteristics
topic: mode
type: calc_step
difficulty: 2
priority: A
hashtags: [最頻値, 密度の最大化, 微分]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 最頻値 }]
---
## 問題
$X$ の確率密度関数を $f_X(x)=6x(1-x)$（$0<x<1$）、それ以外で0とする。最頻値を求めよ。

## 答え
密度を微分して0と置き、極大点を求める。

## 使用公式・定理
連続分布の最頻値（モード）は密度を最大にする点
$$\operatorname{mode}=\operatorname*{arg\,max}_x f_X(x).$$

## 計算例
$f_X(x)=6x-6x^2$ より
$$f_X'(x)=6-12x=0\quad\Rightarrow\quad x=\frac12.$$
$f_X''(x)=-12<0$ なので極大。端点では $f_X(0)=f_X(1)=0$ だから、最頻値は $x=1/2$。

## 一手
$f_X'=0$ の候補と台の端点を比較し、最大を与える点を選ぶ。

## 注意
最頻値は平均・中央値と一般に異なる。密度が単調な分布では、端点が台に含まれ最大値を達成する場合に最頻値は端点に来る。開区間の端点では上限のみで最頻値が存在しない場合がある。

<!-- CARD -->

---
id: prob-covariance-computation
title: 同時分布から共分散を計算する
category: math-probability
subcategory: math-distribution-characteristics
topic: covariance
type: calc_step
difficulty: 2
priority: A
hashtags: [共分散, 同時分布, 期待値]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 共分散 }]
---
## 問題
$(X,Y)$ の同時確率質量関数を $p(0,0)=0.1$、$p(0,1)=0.2$、$p(1,0)=0.3$、$p(1,1)=0.4$ とする。$\operatorname{Cov}(X,Y)$ を求めよ。

## 答え
$E[XY]$、$E[X]$、$E[Y]$ を計算し、$\operatorname{Cov}(X,Y)=E[XY]-E[X]E[Y]$ に代入する。

## 使用公式・定理
共分散は、$E[X^2]<\infty$ かつ $E[Y^2]<\infty$ のとき（Cauchy--Schwarz不等式により $E|XY|<\infty$ も保証される）
$\operatorname{Cov}(X,Y)=E[XY]-E[X]E[Y].$

## 計算例
$X,Y$ はともに0か1の値しか取らないので
$$E[XY]=1\cdot1\cdot p(1,1)=0.4,$$
$$E[X]=1\cdot\{p(1,0)+p(1,1)\}=0.7,$$
$$E[Y]=1\cdot\{p(0,1)+p(1,1)\}=0.6.$$
したがって
$$\operatorname{Cov}(X,Y)=0.4-0.7\cdot0.6=0.4-0.42=-0.02.$$

## 一手
周辺分布を先に求めてから $E[X],E[Y]$ を計算すると間違いが少ない。

## 注意
共分散が負なら一方が大きいとき他方が小さい傾向を示す。ここではわずかに負。

<!-- CARD -->

---
id: prob-correlation-coefficient
title: 共分散と標準偏差から相関係数を求める
category: math-probability
subcategory: math-distribution-characteristics
topic: correlation
type: calc_step
difficulty: 2
priority: A
hashtags: [相関係数, 共分散, 標準化]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 相関係数 }]
---
## 問題
$\operatorname{Cov}(X,Y)=6$、$\operatorname{Var}(X)=9$、$\operatorname{Var}(Y)=16$ とする。相関係数 $\rho_{X,Y}$ を求めよ。

## 答え
$\operatorname{Cov}(X,Y)=6$, $\operatorname{Var}(X)=9$, $\operatorname{Var}(Y)=16$ なら
$$
\rho_{X,Y}=\frac{6}{\sqrt9\sqrt{16}}=\frac12.
$$

## 使用公式・定理
$E[X^2],E[Y^2]<\infty$ のとき共分散は
$$
\operatorname{Cov}(X,Y)
=E[(X-E[X])(Y-E[Y])]
=E[XY]-E[X]E[Y].
$$
さらに $0<\operatorname{Var}(X),\operatorname{Var}(Y)<\infty$ なら相関係数は
$$
\rho_{X,Y}
=\frac{\operatorname{Cov}(X,Y)}{\sigma_X\sigma_Y}.
$$

$U=X-E[X]$, $V=Y-E[Y]$ にコーシー–シュワルツの不等式を使うと
$$
E[UV]^2\le E[U^2]E[V^2],
$$
すなわち
$$
\operatorname{Cov}(X,Y)^2
\le \operatorname{Var}(X)\operatorname{Var}(Y).
$$
両辺を $\sigma_X^2\sigma_Y^2$ で割って
$$
-1\le\rho_{X,Y}\le1.
$$
非退化な場合、$|\rho|=1$ は中心化した2変数が確率1で比例すること、すなわち $Y=aX+b$ という直線関係と同値である。

独立なら積の期待値が分離するので
$$
E[XY]=E[X]E[Y]
$$
となり無相関を含意する。ただし逆は一般に成り立たない。

## 計算例
まず同時確率質量関数
$$
p(0,0)=0.1,\quad p(0,1)=0.2,\quad
p(1,0)=0.3,\quad p(1,1)=0.4
$$
を考える。$X,Y$ は0,1値なので
$$
E[X]=0.3+0.4=0.7,
\qquad
E[Y]=0.2+0.4=0.6,
$$
$$
E[XY]=p(1,1)=0.4.
$$
よって
$$
\operatorname{Cov}(X,Y)
=0.4-0.7\cdot0.6
=-0.02.
$$
またBernoulli型なので
$$
\operatorname{Var}(X)=0.7(0.3)=0.21,
\qquad
\operatorname{Var}(Y)=0.6(0.4)=0.24.
$$
したがって
$$
\rho_{X,Y}
=\frac{-0.02}{\sqrt{0.21\cdot0.24}}
\approx-0.089.
$$
共分散の単位依存性を標準偏差で除くことで、相関係数は無次元になる。

無相関でも従属な反例として、
$$
P(X=-1)=P(X=0)=P(X=1)=\frac13,
\qquad Y=X^2
$$
とする。対称性から
$$E[X]=0,$$
また
$$XY=X^3$$
なので
$$E[XY]=E[X^3]=0.$$
よって
$$\operatorname{Cov}(X,Y)=0.$$
しかし $Y$ は $X$ から完全に決まる。実際
$$
P(X=1,Y=0)=0
$$
に対して
$$
P(X=1)P(Y=0)=\frac13\cdot\frac13=\frac19\ne0,
$$
なので独立ではない。

## 一手
同時分布から相関まで求めるときは、$E[X],E[Y],E[XY]$ から共分散を作り、分散の平方根で標準化する。独立性を問われたら相関0だけで結論せず、同時分布の積分解を確認する。

## 注意
相関係数は線形関係の強さを測る量であり、$\rho=0$ は一般には独立を意味しない。ただし多変量正規分布では無相関と独立が同値になる。$|\rho|\le1$ は暗記せず、中心化した変数へのコーシー–シュワルツの不等式から導ける。

<!-- CARD -->

---
id: prob-correlation-independence
title: 無相関と独立性の関係を判定する
category: math-probability
subcategory: math-distribution-characteristics
topic: correlation-independence
type: recognition
difficulty: 2
priority: A
hashtags: [相関係数, 統計的独立, 無相関]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 相関係数 }]
---
## 問題
$X$ を $p_X(-1)=p_X(0)=p_X(1)=1/3$ とし、$Y=X^2$ とする。$\operatorname{Cov}(X,Y)$ を計算し、$X$ と $Y$ が独立かどうか答えよ。

## 答え
共分散は0になるが、$Y$ は $X$ の関数なので独立ではない。

## 使用公式・定理
独立なら $\operatorname{Cov}(X,Y)=0$（無相関）である。しかし逆は一般に成り立たない。$\operatorname{Cov}(X,Y)=0$ でも関数関係があり得る。

## 計算例
$E[X]=(-1+0+1)/3=0$。$XY=X^3$ で、$X^3$ の取る値は $-1,0,1$ だから
$$E[XY]=E[X^3]=\frac{-1+0+1}{3}=0.$$
よって
$$\operatorname{Cov}(X,Y)=E[XY]-E[X]E[Y]=0-0\cdot E[Y]=0.$$
一方、$P(X=1,Y=0)=0$ だが $P(X=1)P(Y=0)=(1/3)(1/3)=1/9\ne0$ なので独立ではない。

## 一手
「無相関だが独立でない」例は、対称な $X$ と偶関数 $Y=X^2$ の組合せが典型。

## 注意
多変量正規分布に限り、無相関と独立は同値になる。一般の分布では区別する。

<!-- CARD -->

---
id: prob-partial-correlation
title: 偏相関係数を相関係数から計算する
category: math-probability
subcategory: math-distribution-characteristics
topic: partial-correlation
type: calc_step
difficulty: 3
priority: A
hashtags: [偏相関係数, 相関係数, 第三変数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 偏相関係数 }]
---
## 問題
$\rho_{XY}=0.7$、$\rho_{XZ}=0.5$、$\rho_{YZ}=0.4$ とする。$Z$ を固定したときの $X$ と $Y$ の偏相関係数 $\rho_{XY\cdot Z}$ を求めよ。

## 答え
3変数の偏相関係数の公式に代入する。

## 使用公式・定理
第三変数 $Z$ の影響を除いた偏相関係数は
$$\rho_{XY\cdot Z}=\frac{\rho_{XY}-\rho_{XZ}\rho_{YZ}}{\sqrt{(1-\rho_{XZ}^2)(1-\rho_{YZ}^2)}}.$$

## 計算例
分子は
$$\rho_{XY}-\rho_{XZ}\rho_{YZ}=0.7-0.5\cdot0.4=0.7-0.2=0.5.$$
分母は
$$\sqrt{(1-0.25)(1-0.16)}=\sqrt{0.75\cdot0.84}=\sqrt{0.63}\approx0.7937.$$
したがって
$$\rho_{XY\cdot Z}=\frac{0.5}{0.7937}\approx0.630.$$

## 一手
分子（見かけの相関から第三変数経由の相関を引く）と分母（残差の分散の積の平方根）を分けて計算する。

## 注意
偏相関が通常の相関より小さくなる場合、見かけの相関の一部が第三変数で説明されていたことを意味する。ここでは $0.7\to0.63$ とわずかに減少した。

<!-- CARD -->

---
id: prob-shape-summary
title: 複数の特性値から分布の形状を総合的に推測する
category: math-probability
subcategory: math-distribution-characteristics
topic: shape-summary
type: recognition
difficulty: 2
priority: B
hashtags: [分布の形状, 特性値, 総合判定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 分布の特性値 }]
---
## 問題
ある連続分布について、平均 $5.2$、中央値 $4.8$、最頻値 $4.5$、四分位範囲 $2.0$、歪度 $0.9$、尖度 $4.5$ が得られた。この分布の形状として言えることと、これらの値だけでは断定できないことを述べよ。

## 答え
平均 $>$ 中央値 $>$ 最頻値と正の歪度は右に歪んだ形状を示唆し、尖度 $4.5>3$ は正規分布より平均から遠い値への感度が高いことを示す。ただし、これらの値だけで尾確率の大小や裾の長さを一意に断定はできない。

## 使用公式・定理
歪度は $E[(X-\mu)^3]/\sigma^3$、尖度は $E[(X-\mu)^4]/\sigma^4$ で定義される標準化モーメントである。平均・中央値・最頻値の大小関係は分布の非対称性の目安となり、四分位範囲は中央50%の散布を測る。

## 計算例
- 位置: 平均 $5.2>$ 中央値 $4.8>$ 最頻値 $4.5$ は、右側に大きな値が引っ張る典型的な右歪みのパターンと整合する。
- 非対称性: 歪度 $0.9>0$ も右側の偏差が三次中心モーメントを優勢にしていることを示し、右歪みを補強する。
- 散布: 四分位範囲 $2.0$ は中央50%のデータが幅2の区間に入ることを示す。
- 外れ値感度: 尖度 $4.5>3$ は正規分布より四次標準化モーメントが大きく、典型的には裾が重い分布を示唆する。
- 断定できないこと: 尖度だけで尾確率が全閾値で正規分布より大きいとは言えない。歪度の符号だけで裾の長さを数学的に断定もできない。

## 一手
位置（平均・中央値・最頻値）、散布（IQR）、非対称性（歪度）、外れ値感度（尖度）を分けて整理し、「言えること」と「断定できないこと」を区別する。

## 注意
特性値は分布の形状を推測する手がかりだが、各指標の定義と限界を理解した上で総合する。単一指標の値だけで分布を一意に特定することはできない。
