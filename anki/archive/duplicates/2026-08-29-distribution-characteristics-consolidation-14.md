---
id: prob-expected-value-linearity
title: 期待値の線形性で和の平均を求める
category: math-probability
subcategory: math-distribution-characteristics
topic: expectation-linearity
type: formula
difficulty: 1
priority: S
hashtags:
  - 期待値
  - 線形性
  - 和
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 期待値
archive_reason: duplicate
canonical_card: prob-expected-value-function
archive_note: 強化済み期待値canonicalへE[aX+bY+c]の線形性と独立性不要の注意を吸収済み。
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
hashtags:
  - 期待値
  - 確率関数
  - 定義
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 期待値
archive_reason: duplicate
canonical_card: prob-expected-value-function
archive_note: 強化済みcanonicalへ離散型E[g(X)]=sum g(x)p(x)の一般式と具体的な期待値計算を吸収済み。
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
hashtags:
  - 期待値
  - 確率密度関数
  - 積分
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 期待値
archive_reason: duplicate
canonical_card: prob-expected-value-function
archive_note: 強化済みcanonicalへ連続型E[g(X)]=integral g(x)f(x)dxの一般式と密度2xの計算例を吸収済み。
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
id: prob-variance-affine
title: 分散のスケール・シフト変換を適用する
category: math-probability
subcategory: math-distribution-characteristics
topic: variance-affine
type: formula
difficulty: 1
priority: A
hashtags:
  - 分散
  - 線形変換
  - スケール
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 分散
archive_reason: duplicate
canonical_card: prob-variance-independent-sum
archive_note: 一般線形結合の分散canonicalへVar(aX+c)=a^2 Var(X)を特殊形として統合し、Var(3X-2)=45の例も吸収済み。
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
id: prob-standard-deviation-standardize
title: 標準偏差で標準化変数を作る
category: math-probability
subcategory: math-distribution-characteristics
topic: standardization
type: calc_step
difficulty: 2
priority: S
hashtags:
  - 標準偏差
  - 標準化
  - 変数変換
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 標準偏差
archive_reason: duplicate
canonical_card: prob-variance-independent-sum
archive_note: 分散canonicalへZ=(X-mu)/sigmaの標準化とE[Z]=0, Var(Z)=1の導出・数値例を吸収済み。
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
id: prob-median-from-density
title: 密度から中央値を求める
category: math-probability
subcategory: math-distribution-characteristics
topic: median
type: calc_step
difficulty: 2
priority: A
hashtags:
  - 中央値
  - 累積分布関数
  - 分割
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 中央値
archive_reason: duplicate
canonical_card: prob-percentile-from-cdf
archive_note: 分位点canonicalへ中央値=q_0.5を統合し、密度3x^2から累積分布関数を作ってm=2^(-1/3)まで計算済み。
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
hashtags:
  - 四分位数
  - 四分位範囲
  - 累積分布関数
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 四分位数
archive_reason: duplicate
canonical_card: prob-percentile-from-cdf
archive_note: 分位点canonicalへQ1=q_0.25, Q3=q_0.75, IQR=Q3-Q1を統合し、U(0,4)の数値例も吸収済み。
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
id: prob-moment-central-relation
title: 原点まわりのモーメントと中心モーメントを変換する
category: math-probability
subcategory: math-distribution-characteristics
topic: moments-central
type: formula
difficulty: 2
priority: A
hashtags:
  - モーメント
  - 中心モーメント
  - 変数変換
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: モーメント
archive_reason: duplicate
canonical_card: prob-skewness-definition
archive_note: 歪度canonicalへ二次中心モーメントmu2=mu2'-(mu1')^2の導出と分散との一致を吸収済み。
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
hashtags:
  - モーメント
  - 中心モーメント
  - 歪度
frequency:
  past_exam: 1
  textbook: 0
  independent_problems: 0
  source_confirmations: 1
sources:
  - type: official_syllabus
    topic: モーメント
  - type: past_exam
    id: MATH-2017-Q1
    topic: 標本平均の歪度・尖度
archive_reason: duplicate
canonical_card: prob-skewness-definition
archive_note: 歪度canonicalへ三次中心モーメントmu3=mu3'-3mu2'mu1'+2(mu1')^3の二項展開による導出を吸収済み。
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
id: prob-skewness-shape
title: 歪度の符号から分布の形状を判定する
category: math-probability
subcategory: math-distribution-characteristics
topic: skewness-interpretation
type: recognition
difficulty: 1
priority: B
hashtags:
  - 歪度
  - 分布の形状
  - 解釈
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 歪度
archive_reason: duplicate
canonical_card: prob-skewness-definition
archive_note: 歪度canonicalの注意欄へ正負の典型的解釈、歪度0は対称性の十分条件でないこと、裾長を断定できない注意を統合済み。
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
id: prob-kurtosis-shape
title: 尖度の値から分布の形状を推測する
category: math-probability
subcategory: math-distribution-characteristics
topic: kurtosis-interpretation
type: recognition
difficulty: 1
priority: B
hashtags:
  - 尖度
  - 分布の形状
  - 解釈
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 尖度
archive_reason: duplicate
canonical_card: prob-kurtosis-definition
archive_note: 尖度canonicalへ正規分布の3との比較、超過尖度、外れ値感度の解釈と尾確率を一意に順序付けない注意を吸収済み。
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
