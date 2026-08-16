---
id: prob-expected-value-linearity
title: 期待値の線形性で和の平均を求める
category: math-probability
subcategory: math-distribution-characteristics
topic: expectation-linearity
type: formula
difficulty: 1
priority: S
hashtags: [期待値, 線形性, 和]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 期待値 }]
---
## 問題
$E[X]=3$、$E[Y]=-1$ のとき、$E[2X-3Y+4]$ を求めよ。

## 答え
期待値を項ごとに分け、定数はそのまま外へ出す。

## 使用公式・定理
期待値が存在する確率変数 $X,Y$ と定数 $a,b,c$ について、期待値の線形性から
$$E[aX+bY+c]=aE[X]+bE[Y]+c.$$
独立性は不要である。

## 計算例
$$E[2X-3Y+4]=2\cdot3+(-3)\cdot(-1)+4=6+3+4=13.$$

## 一手
係数と定数項を分けてから各期待値を代入する。

## 注意
分散にはこの形の線形性はなく、$bY$ の係数は二乗されて $b^2$ になる。

<!-- CARD -->
---
id: prob-expected-value-discrete
title: 確率質量関数から期待値を定義通り計算する
category: math-probability
subcategory: math-distribution-characteristics
topic: expectation-discrete
type: calc_step
difficulty: 1
priority: S
hashtags: [期待値, 確率関数, 定義]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 期待値 }]
---
## 問題
$X$ の確率質量関数を $p_X(1)=0.2$、$p_X(2)=0.5$、$p_X(3)=0.3$ とする。$E[X]$ を求めよ。

## 答え
各値にその確率を掛けて足し合わせる。

## 使用公式・定理
離散確率変数の期待値は、$\sum_x|x|p_X(x)<\infty$ のとき
$$E[X]=\sum_x x\,p_X(x).$$

## 計算例
$$E[X]=1\cdot0.2+2\cdot0.5+3\cdot0.3=0.2+1.0+0.9=2.1.$$

## 一手
値と確率の対応を表にしてから積和を取る。

## 注意
確率の総和が1であることを先に確認する。ここでは $0.2+0.5+0.3=1$。

<!-- CARD -->
---
id: prob-expected-value-integral
title: 密度の積分で期待値を計算する
category: math-probability
subcategory: math-distribution-characteristics
topic: expectation-continuous
type: calc_step
difficulty: 2
priority: S
hashtags: [期待値, 確率密度関数, 積分]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 期待値 }]
---
## 問題
$X$ の確率密度関数を $f_X(x)=2x$（$0<x<1$）、それ以外で0とする。$E[X]$ を求めよ。

## 答え
$x$ に密度を掛けて台の区間で積分する。

## 使用公式・定理
連続確率変数の期待値は、$\int_{-\infty}^{\infty}|x|f_X(x)\,dx<\infty$ のとき
$$E[X]=\int_{-\infty}^{\infty}x\,f_X(x)\,dx.$$

## 計算例
台は $0<x<1$ だから
$$E[X]=\int_0^1 x\cdot 2x\,dx=\int_0^1 2x^2\,dx=\left[\frac{2x^3}{3}\right]_0^1=\frac23.$$

## 一手
台の区間を確認し、$x\cdot f_X(x)$ の形にしてから積分する。

## 注意
密度そのものを積分すると1になるだけで、期待値にはならない。

<!-- CARD -->
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
$X^2$ の分布を求めずに、$x^2$ に元の密度を掛けて積分する。

## 使用公式・定理
連続確率変数の関数 $g(X)$ の期待値は、積分が絶対収束するとき
$$E[g(X)]=\int_{-\infty}^{\infty}g(x)f_X(x)\,dx.$$

## 計算例
$$E[X^2]=\int_0^1 x^2\cdot 1\,dx=\left[\frac{x^3}{3}\right]_0^1=\frac13.$$

## 一手
$g(x)$ をそのまま密度へ掛ける。新しい変数の密度を導出する必要はない。

## 注意
$E[g(X)]\ne g(E[X])$ が一般に成り立つ。ここでも $E[X^2]=1/3$ に対し $E[X]^2=(1/2)^2=1/4$。

<!-- CARD -->
---
id: prob-variance-affine
title: 分散のスケール・シフト変換を適用する
category: math-probability
subcategory: math-distribution-characteristics
topic: variance-affine
type: formula
difficulty: 1
priority: A
hashtags: [分散, 線形変換, スケール]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 分散 }]
---
## 問題
$\operatorname{Var}(X)=5$ のとき、$\operatorname{Var}(3X-2)$ を求めよ。

## 答え
係数を二乗して掛け、定数項は分散に影響しない。

## 使用公式・定理
分散が有限な確率変数 $X$ と定数 $a,b$ について
$$\operatorname{Var}(aX+b)=a^2\operatorname{Var}(X).$$

## 計算例
$$\operatorname{Var}(3X-2)=3^2\cdot5=45.$$

## 一手
分散は「ばらつきの二乗スケール」なので、係数は二乗する。

## 注意
定数のシフト $-2$ は分散を変えない。標準偏差には係数の絶対値が掛かる。

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
独立なら共分散項が消え、分散を足す。引き算でも符号は二乗で消える。

## 使用公式・定理
分散が有限な $X,Y$ について一般に
$$\operatorname{Var}(aX+bY)=a^2\operatorname{Var}(X)+b^2\operatorname{Var}(Y)+2ab\operatorname{Cov}(X,Y).$$
$X,Y$ が独立なら $\operatorname{Cov}(X,Y)=0$ なので
$$\operatorname{Var}(aX+bY)=a^2\operatorname{Var}(X)+b^2\operatorname{Var}(Y).$$

## 計算例
$$\operatorname{Var}(X+Y)=4+9=13,$$
$$\operatorname{Var}(X-Y)=4+(-1)^2\cdot9=13.$$

## 一手
差の分散でも $b^2$ になるため、和と同じ値になる。

## 注意
独立でない場合は共分散項 $2ab\operatorname{Cov}(X,Y)$ を落とせない。

<!-- CARD -->
---
id: prob-standard-deviation-standardize
title: 標準偏差で標準化変数を作る
category: math-probability
subcategory: math-distribution-characteristics
topic: standardization
type: calc_step
difficulty: 2
priority: S
hashtags: [標準偏差, 標準化, 変数変換]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 標準偏差 }]
---
## 問題
$E[X]=10$、$\operatorname{Var}(X)=25$ とする。$Z=(X-10)/5$ の平均と分散を求めよ。

## 答え
標準偏差は分散の正の平方根で、平均を引いて標準偏差で割ると平均0・分散1になる。

## 使用公式・定理
標準偏差は $\operatorname{SD}(X)=\sqrt{\operatorname{Var}(X)}$。$\sigma=\operatorname{SD}(X)>0$、$\mu=E[X]$ として
$$Z=\frac{X-\mu}{\sigma}\quad\Rightarrow\quad E[Z]=0,\ \operatorname{Var}(Z)=1.$$

## 計算例
$\sigma=\sqrt{25}=5$。期待値の線形性から
$$E[Z]=\frac{E[X]-10}{5}=\frac{10-10}{5}=0.$$
分散のスケール変換から
$$\operatorname{Var}(Z)=\frac{1}{5^2}\operatorname{Var}(X)=\frac{25}{25}=1.$$

## 一手
「平均を引いて標準偏差で割る」と平均0・分散1の変数ができる。

## 注意
分散で割るのではなく標準偏差で割る。分散で割ると分散は $1/\sigma^2$ になる。

<!-- CARD -->
---
id: prob-moment-central-relation
title: 原点まわりのモーメントと中心モーメントを変換する
category: math-probability
subcategory: math-distribution-characteristics
topic: moments-central
type: formula
difficulty: 2
priority: A
hashtags: [モーメント, 中心モーメント, 変数変換]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: モーメント }]
---
## 問題
$\mu=E[X]$、$\mu_k'=E[X^k]$ とする。二次の中心モーメント $\mu_2=E[(X-\mu)^2]$ を $\mu_1',\mu_2'$ で表せ。

## 答え
$(X-\mu)^2$ を展開して期待値の線形性を使う。

## 使用公式・定理
$E[X^2]<\infty$ のとき、$k$ 次の原点まわりのモーメントを $\mu_k'=E[X^k]$、中心モーメントを $\mu_k=E[(X-\mu)^k]$ とする。二次では
$\mu_2=\mu_2'-(\mu_1')^2.$

## 計算例
$\mu=\mu_1'$ に注意して展開すると
$$\begin{aligned}\mu_2&=E[(X-\mu)^2]\\&=E[X^2-2\mu X+\mu^2]\\&=E[X^2]-2\mu E[X]+\mu^2\\&=\mu_2'-2\mu\cdot\mu+\mu^2\\&=\mu_2'-\mu^2=\mu_2'-(\mu_1')^2.\end{aligned}$$

## 一手
展開→線形性→$E[X]=\mu$ の代入、の順で機械的に進める。

## 注意
$\mu_2=\operatorname{Var}(X)$ であり、これは分散公式 $\operatorname{Var}(X)=E[X^2]-E[X]^2$ の導出そのものである。

<!-- CARD -->
---
id: prob-moment-third-central
title: 三次の中心モーメントを原点まわりのモーメントで表す
category: math-probability
subcategory: math-distribution-characteristics
topic: moments-third
type: calc_step
difficulty: 3
priority: S
hashtags: [モーメント, 中心モーメント, 歪度]
frequency: { past_exam: 1, textbook: 0, independent_problems: 0, source_confirmations: 1 }
sources: [{ type: official_syllabus, topic: モーメント }, { type: past_exam, id: MATH-2017-Q1, topic: 標本平均の歪度・尖度 }]
---
## 問題
$\mu=E[X]$、$\mu_k'=E[X^k]$ とする。三次の中心モーメント $\mu_3=E[(X-\mu)^3]$ を $\mu_1',\mu_2',\mu_3'$ で表せ。

## 答え
$(X-\mu)^3$ を二項展開し、期待値の線形性で各項を処理する。

## 使用公式・定理
$E[|X|^3]<\infty$ のとき、三次の中心モーメントは
$\mu_3=\mu_3'-3\mu_2'\mu_1'+2(\mu_1')^3.$

## 計算例
$(a-b)^3=a^3-3a^2b+3ab^2-b^3$ を使い、$\mu=\mu_1'$ として
$$\begin{aligned}\mu_3&=E[X^3-3\mu X^2+3\mu^2X-\mu^3]\\&=\mu_3'-3\mu\mu_2'+3\mu^2\mu_1'-\mu^3\\&=\mu_3'-3\mu_1'\mu_2'+3(\mu_1')^3-(\mu_1')^3\\&=\mu_3'-3\mu_1'\mu_2'+2(\mu_1')^3.\end{aligned}$$

## 一手
$E[\mu^2 X]=\mu^2 E[X]=\mu^3$ のように、定数は期待値の外へ出す。

## 注意
歪度の分子はこの $\mu_3$ であり、$E[X^3]$ そのものではない。

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
平均・分散・三次中心モーメントを順に計算し、$\mu_3/\sigma^3$ を取る。

## 使用公式・定理
歪度は、$0<\sigma^2=\operatorname{Var}(X)<\infty$ かつ三次モーメントが存在するとき
$$\text{歪度}=\frac{E[(X-\mu)^3]}{\sigma^3},\qquad \mu=E[X],\ \sigma=\sqrt{\operatorname{Var}(X)}.$$

## 計算例
まず原点まわりのモーメントを求める。
$$\mu_1'=0\cdot0.5+1\cdot0.3+2\cdot0.2=0.7,$$
$$\mu_2'=0^2\cdot0.5+1^2\cdot0.3+2^2\cdot0.2=1.1,$$
$$\mu_3'=0^3\cdot0.5+1^3\cdot0.3+2^3\cdot0.2=1.9.$$
分散は
$$\sigma^2=\mu_2'-(\mu_1')^2=1.1-0.49=0.61.$$
三次中心モーメントは
$$\mu_3=\mu_3'-3\mu_2'\mu_1'+2(\mu_1')^3=1.9-3(1.1)(0.7)+2(0.343)=1.9-2.31+0.686=0.276.$$
したがって
$$\text{歪度}=\frac{0.276}{0.61^{3/2}}=\frac{0.276}{0.4765\ldots}\approx0.579.$$

## 一手
$\mu_1',\mu_2',\mu_3'$ → $\sigma^2$ → $\mu_3$ → $\mu_3/\sigma^3$ の順に組み立てる。

## 注意
正の歪度は右側の大きな偏差が三次中心モーメントを優勢にしていることを示し、典型的には右に歪んだ形状を示唆する。ただし符号だけから裾の長さを断定はできない。

<!-- CARD -->
---
id: prob-skewness-shape
title: 歪度の符号から分布の形状を判定する
category: math-probability
subcategory: math-distribution-characteristics
topic: skewness-interpretation
type: recognition
difficulty: 1
priority: B
hashtags: [歪度, 分布の形状, 解釈]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 歪度 }]
---
## 問題
分布Aの歪度は $1.8$、分布Bの歪度は $-0.2$、分布Cの歪度は $0$ であった。各分布の非対称性について、歪度から典型的に推測されることを述べよ。

## 答え
正なら右側の大きな偏差が三次中心モーメントを優勢にしており、典型的には右に歪んだ形状を示唆する。負なら左側、0なら非対称性が三次モーメントには現れない。

## 使用公式・定理
歪度は $E[(X-\mu)^3]/\sigma^3$ で定義される標準化された三次中心モーメントであり、分布の非対称性を測る。

## 計算例
- 分布A: 歪度 $1.8>0$ なので、右側の大きな偏差が支配的で、典型的には右に歪んだ分布を示唆する。
- 分布B: 歪度 $-0.2<0$ なので、左側の偏差が支配的で、典型的には左に歪んだ分布を示唆する。
- 分布C: 歪度 $0$ は三次中心モーメントが0であり、左右対称な分布と整合する。

## 一手
符号は非対称性の向きの目安として読む。大きさはその強さの目安。

## 注意
歪度の符号だけから裾の長さを数学的に断定はできない。少数の遠い質点と確率配分により、符号と裾の形状が一致しない例がある。歪度0は対称の必要条件であって十分条件ではない。

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
平均0に注意して四次中心モーメントと分散を計算し、比を取る。

## 使用公式・定理
尖度は、四次モーメントが存在し $\sigma^2>0$ のとき
$$\text{尖度}=\frac{E[(X-\mu)^4]}{\sigma^4}.$$
正規分布の尖度は3であり、$\text{尖度}-3$ を超過尖度と呼ぶ。

## 計算例
対称性から $\mu=E[X]=(-1)(1/2)+(1)(1/2)=0$。したがって
$$\mu_2=E[X^2]=(-1)^2\cdot\tfrac12+1^2\cdot\tfrac12=1,$$
$$\mu_4=E[X^4]=(-1)^4\cdot\tfrac12+1^4\cdot\tfrac12=1.$$
よって
$$\text{尖度}=\frac{\mu_4}{\sigma^4}=\frac{1}{1^2}=1.$$

## 一手
対称分布では $\mu=0$ を先に確認すると中心モーメントがそのまま原点まわりのモーメントになる。

## 注意
尖度1は正規分布の3より小さく、平均から遠い値への感度が低いことを示す。二点分布に「中央が平坦」という表現は適さない。$\mu=0$ でない分布では $E[(X-\mu)^4]$ を展開して計算する。

<!-- CARD -->
---
id: prob-kurtosis-shape
title: 尖度の値から分布の形状を推測する
category: math-probability
subcategory: math-distribution-characteristics
topic: kurtosis-interpretation
type: recognition
difficulty: 1
priority: B
hashtags: [尖度, 分布の形状, 解釈]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 尖度 }]
---
## 問題
分布Pの尖度は $6$、分布Qの尖度は $2$ であった。尖度の値から、正規分布（尖度3）との比較として典型的に推測されることを述べよ。また、尖度だけから尾確率の大小を一意に断定できるか答えよ。

## 答え
尖度が3より大きければ、平均から遠い値への感度が正規分布より高いことを示し、典型的には裾が重い分布を示唆する。3より小さければその逆を示唆する。ただし尖度だけで尾確率の大小を一意に断定はできない。

## 使用公式・定理
尖度は $\mu_4/\sigma^4$ で定義され、正規分布では3となる。超過尖度 $\mu_4/\sigma^4-3$ は平均から遠い値への感度の目安であり、値だけで尾確率の大小を一意に断定はできない。

## 計算例
- 分布P: 尖度 $6>3$ なので、四次標準化モーメントが正規分布より大きく、典型的には裾が重い分布を示唆する（超過尖度 $+3$）。
- 分布Q: 尖度 $2<3$ なので、典型的には裾が軽い分布を示唆する（超過尖度 $-1$）。
- 尖度は中心部と裾部の双方の確率配置に依存するため、同じ尖度でも尾確率の形状は異なり得る。したがって値だけでは尾の順序を一意に決められない。

## 一手
基準値3との大小関係は、平均から遠い値への感度の目安として読む。

## 注意
尖度は標準化四次モーメントであり、尾確率を全閾値で順序付ける量ではない。裾の重さとの関係は分布族内や典型例での解釈に限定する。

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
$F_X(x)=0.95$ を $x$ について解く。

## 使用公式・定理
一般に第 $p$ 分位点は $q_p=\inf\{x:F_X(x)\ge p\}$ で定義する。連続かつ狭義単調増加な累積分布関数では $F_X(q_p)=p$ の解に一致する。上側 $100\alpha$ パーセント点は $F_X(x)=1-\alpha$ の解。

## 計算例
$1-e^{-x}=0.95$ より $e^{-x}=0.05$。両辺の対数を取って
$$-x=\log 0.05\quad\Rightarrow\quad x=-\log 0.05=\log 20\approx3.00.$$

## 一手
「上側 $\alpha$」は「$F_X=1-\alpha$」に読み替えてから逆関数を取る。

## 注意
下側パーセント点（$F_X(x)=p$）と上側パーセント点（$F_X(x)=1-p$）を取り違えない。

<!-- CARD -->
---
id: prob-median-from-density
title: 密度から中央値を求める
category: math-probability
subcategory: math-distribution-characteristics
topic: median
type: calc_step
difficulty: 2
priority: A
hashtags: [中央値, 累積分布関数, 分割]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 中央値 }]
---
## 問題
$X$ の確率密度関数を $f_X(x)=3x^2$（$0<x<1$）、それ以外で0とする。中央値を求めよ。

## 答え
$F_X(m)=1/2$ となる $m$ を累積分布関数から求める。

## 使用公式・定理
一般に中央値は $m=\inf\{x:F_X(x)\ge1/2\}$ で定義する。連続分布では
$F_X(m)=P(X\le m)=\frac12$
を満たす点に一致する。

## 計算例
$0<x<1$ で $F_X(x)=\int_0^x3u^2\,du=x^3$。したがって
$$m^3=\frac12\quad\Rightarrow\quad m=2^{-1/3}\approx0.794.$$

## 一手
まず累積分布関数を積分で求め、$=1/2$ と置いて解く。

## 注意
中央値は平均とは一般に異なる。この分布では $E[X]=\int_0^13x^3dx=3/4=0.75$。

<!-- CARD -->
---
id: prob-quartiles-iqr
title: 四分位数と四分位範囲を求める
category: math-probability
subcategory: math-distribution-characteristics
topic: quartiles
type: calc_step
difficulty: 2
priority: A
hashtags: [四分位数, 四分位範囲, 累積分布関数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 四分位数 }]
---
## 問題
$X$ を一様分布 $U(0,4)$ に従う確率変数とする。密度は $f_X(x)=1/4$（$0<x<4$）、累積分布関数は $F_X(x)=x/4$ である。第1四分位数 $Q_1$、第3四分位数 $Q_3$、四分位範囲を求めよ。

## 答え
$F_X(Q_1)=0.25$、$F_X(Q_3)=0.75$ を解き、差を取る。

## 使用公式・定理
一般に第 $p$ 分位点は $q_p=\inf\{x:F_X(x)\ge p\}$。連続かつ狭義単調増加な累積分布関数では、第1四分位数は $F_X(Q_1)=1/4$、第3四分位数は $F_X(Q_3)=3/4$ の解に一致する。四分位範囲は
$\mathrm{IQR}=Q_3-Q_1.$

## 計算例
$$Q_1/4=\frac14\Rightarrow Q_1=1,\qquad Q_3/4=\frac34\Rightarrow Q_3=3.$$
$$\mathrm{IQR}=3-1=2.$$

## 一手
一様分布では四分位数は台の区間を4等分する点になる。

## 注意
四分位範囲は中央50%のデータが入る区間の幅であり、範囲（最大値$-$最小値）とは異なる。

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
共分散を両標準偏差の積で割る。

## 使用公式・定理
$0<\operatorname{Var}(X),\operatorname{Var}(Y)<\infty$ のとき、相関係数は
$$\rho_{X,Y}=\frac{\operatorname{Cov}(X,Y)}{\sqrt{\operatorname{Var}(X)\operatorname{Var}(Y)}}=\frac{\operatorname{Cov}(X,Y)}{\sigma_X\sigma_Y}.$$
常に $-1\le\rho_{X,Y}\le1$。

## 計算例
$\sigma_X=\sqrt9=3$、$\sigma_Y=\sqrt{16}=4$ より
$$\rho_{X,Y}=\frac{6}{3\cdot4}=\frac{6}{12}=\frac12.$$

## 一手
分散から先に標準偏差を計算しておくと分母の積を間違えない。

## 注意
相関係数は無次元量で、変数の単位やスケールに依存しない。共分散そのものは単位に依存する。

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
