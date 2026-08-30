---
id: ts-ma1-invertibility
title: MA(1)の可逆条件を導き革新を観測から復元する
category: applied-common
subcategory: applied-time-series
topic: ma1-invertibility-canonical
type: strategy
difficulty: 3
priority: A
hashtags:
  - 時系列解析
  - MAモデル
  - 可逆性
  - 革新
  - バックシフト演算子
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ARIMAモデル
archive_reason: duplicate
canonical_card: ts-ar-causality-check
archive_note: MA(1)の可逆性条件、再帰代入による|theta|<1の導出、根条件、非可逆例theta=1.2、革新復元の数値例をAR/MA根条件canonical
  cardへ統合済み。
---
## 問題
MA(1)
$$
X_t=\varepsilon_t+\theta\varepsilon_{t-1}
$$
を考える。
1. 観測系列から革新 $\varepsilon_t$ を一意に安定復元できるための可逆条件を、再帰代入とMA多項式の根の両方から導け。
2. $\theta=1.2$ のモデルが可逆か判定せよ。
3. $\theta=0.4$、$X_t=3.0$、$\varepsilon_{t-1}=-0.5$ のとき $\varepsilon_t$ を求めよ。さらに $X_{t+1}=1.8$ なら $\varepsilon_{t+1}$ も求めよ。

## 記号・用語
$\varepsilon_t$ は時点 $t$ の革新である。**可逆性**とは、現在の革新を現在・過去の観測 $X_t,X_{t-1},\ldots$ の収束する線形和として表せる性質をいう。モデル式の符号規約を
$$
X_t=(1+\theta B)\varepsilon_t
$$
とする。

## 使用公式・定理
モデル式を革新について解くと
$$
\varepsilon_t=X_t-\theta\varepsilon_{t-1}.
$$
さらに
$$
\varepsilon_{t-1}=X_{t-1}-\theta\varepsilon_{t-2}
$$
を代入すれば
$$
\varepsilon_t
=X_t-\theta X_{t-1}+\theta^2\varepsilon_{t-2}.
$$
再帰を続けると形式的に
$$
\varepsilon_t
=X_t-\theta X_{t-1}+\theta^2X_{t-2}-\theta^3X_{t-3}+\cdots.
$$
係数が減衰してこの表現が安定するには
$$
|\theta|<1
$$
が必要である。

同じ条件はMA多項式
$$
1+\theta z=0
$$
の根
$$
z=-\frac1\theta
$$
が単位円の外側、すなわち $|z|>1$ であることと同値である。

## 一手／方針
**可逆条件を根の公式だけで暗記しない。** まず $\varepsilon_t=X_t-\theta\varepsilon_{t-1}$ と解いて再帰代入し、過去観測の係数 $1,-\theta,\theta^2,\ldots$ が減衰する条件を見る。その後でMA多項式の根条件と一致することを確認する。

## 答え
1. 再帰表示の係数が幾何級数的に減衰する条件は
$$
|\theta|<1.
$$
また $1+\theta z=0$ の根は $z=-1/\theta$ なので、根が単位円外という条件 $|z|>1$ も同じく $|\theta|<1$ を与える。

2. $|1.2|>1$ なので可逆でない。

3. 
$$
\varepsilon_t
=3.0-0.4(-0.5)
=3.2.
$$
次時点は
$$
\varepsilon_{t+1}
=1.8-0.4(3.2)
=0.52.
$$

## 計算例
$\theta=-0.5$ なら
$$
\varepsilon_t
=X_t+0.5X_{t-1}+0.25X_{t-2}+\cdots
$$
となり、係数は減衰する。一方 $\theta=1.2$ では $1,-1.2,1.2^2,\ldots$ と係数が減衰せず、過去観測から安定に革新を復元できない。

## 注意
有限次数MA過程はホワイトノイズの有限線形結合なので定常性自体は満たせるが、可逆性は別条件である。また $X_t=\varepsilon_t-\theta\varepsilon_{t-1}$ のような別の符号規約では多項式の符号も変わるため、係数の符号を丸暗記せずモデル式から導く。

<!-- CARD -->

---
id: ts-pacf-lag2-calculation
title: ラグ2偏自己相関を計算する
category: applied-common
subcategory: applied-time-series
topic: partial-autocorrelation
type: calc_step
difficulty: 3
priority: A
hashtags:
  - 偏自己相関関数
  - PACF
  - 数値計算
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 偏自己相関関数
archive_reason: duplicate
canonical_card: ts-acf-pacf-identification
archive_note: ラグ2PACFをYule-Walker方程式から導出し、rho1=0.6,rho2=0.2からalpha22=-0.25を計算する小問とAR(1)で0になる確認をACF/PACFモデル同定canonical
  cardへ統合済み。
---
## 問題
$\rho_1=0.6$、$\rho_2=0.2$ の定常時系列について、ラグ2偏自己相関を計算せよ。
## 記号・用語
$\rho_h$ はラグ $h$ の自己相関、$\alpha_{22}$ は $X_t$ を $X_{t-1},X_{t-2}$ で線形予測したときの $X_{t-2}$ の係数であり、ラグ2偏自己相関に等しい。
## 使用公式・定理
**ラグ2のDurbin--Levinson公式**：
$$\alpha_{22}=\frac{\rho_2-\rho_1^2}{1-\rho_1^2}.$$
## 一手／方針
分子と分母を別々に計算し、自己相関を公式へ代入する。
## 答え
ラグ2偏自己相関は
$$
\alpha_{22}=-0.25.
$$

## 計算例
まず分子を計算する。
$$
\begin{aligned}
\rho_2-\rho_1^2
&=0.2-0.6^2\\
&=0.2-0.36\\
&=-0.16.
\end{aligned}
$$
次に分母は
$$
\begin{aligned}
1-\rho_1^2
&=1-0.6^2\\
&=1-0.36\\
&=0.64.
\end{aligned}
$$
よってDurbin--Levinson公式へ代入して
$$
\begin{aligned}
\alpha_{22}
&=\frac{\rho_2-\rho_1^2}{1-\rho_1^2}\\
&=\frac{-0.16}{0.64}\\
&=-0.25.
\end{aligned}
$$
なおAR$(1)$ では理論自己相関が $\rho_2=\rho_1^2$ を満たすので、この分子が0となりラグ2偏自己相関も0になる。

## 注意
PACFは単なる $\rho_2$ ではなく、ラグ1の線形効果を除いた相関である。
