---
id: stoch-markov-property
title: マルコフ性を条件付き確率で定義する
category: applied-common
subcategory: applied-stochastic-processes
topic: markov-property
type: formula
difficulty: 2
priority: A
hashtags: [マルコフ連鎖, マルコフ性, 条件付き確率]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: マルコフ連鎖 }]
---
## 問題
離散時間過程 $\{X_t\}$ のマルコフ性を式で述べよ。
## 記号・用語
- $X_t$：時点 $t$ の状態
## 使用公式・定理
現在を条件とすると過去の追加情報が未来の分布を変えない。
## 一手／方針
現在の状態を条件に置き、過去を追加しても次状態の条件付き確率が変わらないことを式で確認する。
## 答え
任意の状態列について
$$P(X_{t+1}=j\mid X_t=i,X_{t-1},\ldots,X_0)
=P(X_{t+1}=j\mid X_t=i).$$
## 計算例
右辺を $p_{ij}$ とおけば、時間一様な連鎖の遷移確率になる。
## 注意
独立性より弱い条件であり、未来は現在には依存してよい。

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
hashtags: [偏自己相関関数, PACF, 数値計算]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 偏自己相関関数 }]
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

<!-- CARD -->

---
id: ts-software-arima-coefficients
title: ARIMA推定結果の係数表を解釈する
category: applied-common
subcategory: applied-time-series
topic: software-output-interpretation
type: calc_step
difficulty: 3
priority: A
hashtags: [ARIMAモデル, ソフトウェア出力, 係数検定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ソフトウェアの出力結果の解釈 }]
---
## 問題
ARIMA$(1,0,0)$ の出力が「AR(1)係数 $0.72$、標準誤差 $0.15$」であった。係数の有意性と定常性を判定せよ。
## 記号・用語
$\widehat\phi$ はAR係数の推定値、$\operatorname{SE}(\widehat\phi)$ はその標準誤差である。
## 使用公式・定理
**Wald統計量**：$z=\widehat\phi/\operatorname{SE}(\widehat\phi)$。大標本で両側5%臨界値は $1.96$。AR$(1)$ の定常条件は $|\phi|<1$。
## 一手／方針
係数を標準誤差で割って有意性を判定し、推定係数の絶対値で定常性を確認する。
## 答え
$$z=0.72/0.15=4.8>1.96$$
なので係数0を棄却する。また $|0.72|<1$ なので推定モデルは定常である。
## 計算例
近似95%信頼区間は $0.72\pm1.96(0.15)=(0.426,1.014)$ である。
## 注意
推定値が定常域内でも、信頼区間が1を含むなら単位根の有無は専用検定も含め慎重に判断する。

<!-- CARD -->

---
id: ts-software-residual-diagnostics
title: Ljung--Box統計量を計算し残差の白色性を診断する
category: applied-common
subcategory: applied-time-series
topic: ljung-box-residual-diagnostics-canonical
type: strategy
difficulty: 3
priority: A
hashtags:
  - 時系列解析
  - 残差診断
  - Ljung-Box検定
  - ソフトウェア出力
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ソフトウェアの出力結果の解釈
---
## 問題
時系列モデルの残差をLjung--Box検定で診断する。
1. 標本数 $n=50$、残差自己相関が $r_1=0.20,r_2=-0.10$ のとき、ラグ $m=2$ までのLjung--Box統計量 $Q$ を計算せよ。ここでは推定済みAR・MA係数を差し引かない単純な比較として、自由度2の5%上側点を5.991とする。
2. 別の推定結果で「$Q(12)=24.8$、$p=0.016$」と出力された。5%水準で残差の白色性とモデルの妥当性を判定せよ。
3. ARMA$(p,q)$ を当てはめた残差へ検定を使うとき、自由度について何に注意すべきか述べよ。

## 記号・用語
$r_h$ はラグ $h$ の残差自己相関、$m$ はまとめて調べる最大ラグである。帰無仮説は「少なくとも指定したラグまで残差自己相関が0」である。残差に自己相関が残るなら、元のモデルが時系列依存を取り切れていない可能性がある。

## 使用公式・定理
Ljung--Box統計量は
$$
Q=n(n+2)\sum_{h=1}^{m}\frac{r_h^2}{n-h}.
$$
帰無仮説の下で大標本ではカイ二乗分布で近似する。モデルを推定していない系列の白色性検定なら基本的に自由度 $m$ を用いる。

推定済みARMA$(p,q)$ の残差診断では、教科書的には推定したAR・MA係数数を差し引いて
$$
m-p-q
$$
程度の自由度を使うことが多い。ただし季節項やソフトウェアによって自由度補正の規約が異なるため、出力されたP値を読む問題ではそのソフトウェアの規約に従う。

## 一手／方針
**残差自己相関が与えられたら $Q$ を計算し、適切な自由度のカイ二乗分布と比較する。P値が出力済みなら再計算せず $p<\alpha$ を判定し、その結果を「残差に時系列構造が残っているか」という言葉へ戻す。**

## 答え
1. 
$$
Q=50(52)\left(\frac{0.20^2}{49}+\frac{(-0.10)^2}{48}\right)
$$
$$
=2600(0.0008163+0.0002083)\approx2.66.
$$
$2.66<5.991$ なので、この単純な自由度2の比較では帰無仮説を棄却しない。

2. 
$$
0.016<0.05
$$
なので、5%水準で「指定ラグまで残差が無相関」という帰無仮説を棄却する。したがって残差に自己相関が残っており、モデルが時系列依存を十分に取り切れていない可能性がある。

3. 推定済みARMAモデルの残差では、単純に自由度 $m$ とせず、推定した動的係数数を考慮する。問題文やソフトウェアがP値を直接与えている場合は、その出力の自由度規約を勝手に変更しない。

## 計算例
たとえばARMA$(1,1)$ の残差をラグ $m=10$ まで調べ、教科書的な補正 $m-p-q$ を採用するなら自由度は
$$
10-1-1=8
$$
が目安になる。一方、同じ $Q$ でも自由度を変えればP値は変わるので、モデル比較やソフトウェア出力の読解では自由度規約の確認が必要である。

## 注意
Ljung--Box検定で棄却しないことは、残差が完全に独立であること、正規分布に従うこと、分散が一定であることまで保証しない。残差ACF、外れ値、分散変動なども別に確認する。また多数のラグの個別自己相関を一つずつ検定する方法とは異なり、Ljung--Box検定は指定ラグまでをまとめて評価する検定である。

<!-- CARD -->

---
id: ts-ar-causality-check
title: AR(p)の因果性を根から判定する
category: applied-common
subcategory: applied-time-series
topic: ar-root-causality
type: calc_step
difficulty: 3
priority: B
hashtags:
  - ARモデル
  - 因果性
  - 定常性
  - 特性方程式
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 因果性・可逆性
---
## 問題
AR$(p)$
$$
\phi(B)X_t=\varepsilon_t,
\qquad
\phi(z)=1-\phi_1z-\cdots-\phi_pz^p
$$
が因果的な定常解を持つ条件を根で述べよ。

さらに
$$
X_t=0.5X_{t-1}+0.2X_{t-2}+\varepsilon_t
$$
を判定せよ。

## 記号・用語
AR多項式は $\phi(z)=1-0.5z-0.2z^2$。因果的とは、$X_t$ が現在・過去の革新の収束する線形和で表せることをいう。
## 使用公式・定理
**AR因果性条件**：AR多項式
$$
\phi(z)=0
$$
のすべての根が単位円の外側、すなわち
$$
|z|>1
$$
なら、現在の $X_t$ を現在・過去の革新の絶対収束する線形和として表せる因果的定常解が得られる。

## 一手／方針
係数そのものを1と比較せず、AR多項式を作り、その根の絶対値を1と比較する。AR(2)なら二次方程式として解けばよい。

## 答え
数値例のAR多項式は
$$
1-0.5z-0.2z^2.
$$
2根は約
$$
z_1=1.31,
\qquad
z_2=-3.81
$$
で、ともに絶対値が1より大きい。したがって因果的な定常AR(2)モデルである。

## 計算例
$$
1-0.5z-0.2z^2=0
$$
を
$$
0.2z^2+0.5z-1=0
$$
と書く。解の公式より
$$
\begin{aligned}
z
&=\frac{-0.5\pm\sqrt{0.5^2-4(0.2)(-1)}}{0.4}\\
&=\frac{-0.5\pm\sqrt{1.05}}{0.4}.
\end{aligned}
$$
よって
$$
z_1\approx1.31,
\qquad z_2\approx-3.81,
$$
$$
|z_1|>1,
\qquad |z_2|>1.
$$

## 注意
標準的なARIMAの文脈では「ARの定常条件」としてこの根条件を述べることが多いが、厳密にはここで保証しているのは**因果的な定常解**である。未来の革新に依存する非因果的表現まで許す議論とは区別する。

<!-- CARD -->

---
id: ts-linear-detrend
title: 線形トレンドを推定して除去する
category: applied-common
subcategory: applied-time-series
topic: trend-removal
type: calc_step
difficulty: 2
priority: B
hashtags: [トレンド, 最小二乗法, 定常化]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: トレンド・季節性 }]
---
## 問題
$(X_1,X_2,X_3)=(3,5,7)$ に線形トレンド $a+bt$ を当てはめ、トレンド除去後の系列を求めよ。
## 記号・用語
$a$ は切片、$b$ は1時点当たりの増分、$e_t=X_t-(a+bt)$ はトレンド除去後の残差である。
## 使用公式・定理
**最小二乗公式**：
$$\widehat b=\frac{\sum_t(t-\bar t)(X_t-\bar X)}{\sum_t(t-\bar t)^2},\qquad \widehat a=\bar X-\widehat b\bar t.$$
## 一手／方針
時点を説明変数として回帰し、各観測から推定トレンドを引く。
## 答え
推定トレンドは
$$
\widehat X_t=1+2t
$$
であり、トレンド除去後の系列は
$$
(0,0,0)
$$
である。

## 計算例
時点は $(1,2,3)$、観測は $(3,5,7)$ なので
$$
\bar t=\frac{1+2+3}{3}=2,
\qquad
\bar X=\frac{3+5+7}{3}=5.
$$
傾きの分子は
$$
\begin{aligned}
\sum_t(t-\bar t)(X_t-\bar X)
&=(-1)(-2)+0\cdot0+1\cdot2\\
&=4,
\end{aligned}
$$
分母は
$$
\begin{aligned}
\sum_t(t-\bar t)^2
&=(-1)^2+0^2+1^2\\
&=2.
\end{aligned}
$$
したがって
$$
\widehat b=\frac42=2,
$$
$$
\widehat a=\bar X-\widehat b\bar t=5-2\cdot2=1.
$$
推定トレンド値は
$$
(1+2\cdot1,\ 1+2\cdot2,\ 1+2\cdot3)=(3,5,7)
$$
なので、元の観測から引けば
$$
(3,5,7)-(3,5,7)=(0,0,0).
$$

## 注意
トレンド除去後も自己相関や季節性が残っていないかを確認する。

<!-- CARD -->

---
id: stoch-finite-dimensional-distribution
title: 有限次元分布を定義する
category: applied-common
subcategory: applied-stochastic-processes
topic: finite-dimensional-distribution
type: formula
difficulty: 2
priority: B
hashtags: [確率過程, 有限次元分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 有限次元分布 }]
---
## 問題
確率過程 $\{X_t:t\in T\}$ の有限次元分布を定義せよ。
## 記号・用語
$t_1,\ldots,t_m\in T$ は任意の有限個の時点、$x_1,\ldots,x_m$ は実数とする。
## 使用公式・定理
**定義**：確率ベクトル $(X_{t_1},\ldots,X_{t_m})$ の同時分布を有限次元分布という。
## 一手／方針
1時点の周辺分布ではなく、任意の有限個の時点の同時分布を指定する。
## 答え
分布関数で書けば
$$F_{t_1,\ldots,t_m}(x_1,\ldots,x_m)=P(X_{t_1}\le x_1,\ldots,X_{t_m}\le x_m).$$
## 計算例
標準ブラウン運動で $0<s<t$ なら、$(B_s,B_t)$ は平均 $(0,0)^\top$、分散共分散行列
$$\begin{pmatrix}s&s\\s&t\end{pmatrix}$$
の2次元正規分布である。
## 注意
各時点の周辺分布だけでは、時点間の依存関係は決まらない。

<!-- CARD -->

---
id: stoch-recurrence-definition
title: 再帰状態と過渡状態を判定する
category: applied-common
subcategory: applied-stochastic-processes
topic: recurrence
type: formula
difficulty: 2
priority: B
hashtags: [マルコフ連鎖, 再帰性, 過渡性]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 既約性・周期・再帰性 }]
---
## 問題
状態 $i$ の再帰性を帰還確率で定義し、簡単な連鎖で判定せよ。
## 記号・用語
$T_i=\inf\{n\ge1:X_n=i\}$ は状態 $i$ への初回帰還時刻、$P_i$ は $X_0=i$ の下での確率である。
## 使用公式・定理
**定義**：$P_i(T_i<\infty)=1$ なら再帰的、$P_i(T_i<\infty)<1$ なら過渡的である。
## 一手／方針
出発後にいつか状態 $i$ へ戻る確率を求める。
## 答え
$$P=\begin{pmatrix}1&0\\1/2&1/2\end{pmatrix}$$
では、状態0は吸収状態なので再帰的。状態1は、最初に0へ移ると戻れないため
$$P_1(T_1<\infty)=P_1(X_1=1)=\frac12<1$$
であり過渡的である。
## 計算例
有限状態の既約マルコフ連鎖なら、すべての状態は再帰的である。
## 注意
定常分布の存在と再帰性を結び付けるときは、既約性などの条件を確認する。

<!-- CARD -->

---
id: ts-arima-definition
title: ARIMAを差分から構成しランダムウォーク・季節差分まで判定する
category: applied-common
subcategory: applied-time-series
topic: arima-differencing-canonical
type: strategy
difficulty: 3
priority: A
hashtags:
  - ARIMAモデル
  - 差分
  - ランダムウォーク
  - 非定常
  - 季節差分
  - バックシフト
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ARIMAモデル
---
## 問題
ARIMAモデルと差分について次を解け。

1. ARIMA$(p,d,q)$ をバックシフト演算子で定義し、$d$ の意味を説明せよ。
2. ランダムウォーク
$$
X_t=X_{t-1}+\varepsilon_t,
\qquad X_0=0,
$$
で $E[\varepsilon_t]=0$、$\operatorname{Var}(\varepsilon_t)=\sigma^2$、革新は互いに無相関とする。水準系列が弱定常でないことを示し、一階差分で何になるか答えよ。
3. ランダムウォークをARIMA$(p,d,q)$ の形で分類せよ。
4. 周期12の系列で $X_{25}=130,X_{13}=118$ のとき季節差分を求め、通常の一階差分との目的の違いを述べよ。

## 記号・用語
バックシフト演算子を
$$
BX_t=X_{t-1}
$$
とし、
$$
\phi(B)=1-\phi_1B-\cdots-\phi_pB^p,
$$
$$
\theta(B)=1+\theta_1B+\cdots+\theta_qB^q
$$
とする。

通常の一階差分は
$$
\Delta X_t=(1-B)X_t=X_t-X_{t-1},
$$
周期 $s$ の季節差分は
$$
\Delta_sX_t=(1-B^s)X_t=X_t-X_{t-s}
$$
である。

## 使用公式・定理
ARIMA$(p,d,q)$ は
$$
\phi(B)(1-B)^dX_t=\theta(B)\varepsilon_t
$$
と表す。すなわち
$$
Y_t=(1-B)^dX_t
$$
とおいた差分系列 $Y_t$ がARMA$(p,q)$ に従う。

ランダムウォークは再帰式を展開すると
$$
X_t=\sum_{j=1}^t\varepsilon_j
$$
なので
$$
\operatorname{Var}(X_t)=t\sigma^2.
$$
一方、
$$
(1-B)X_t=X_t-X_{t-1}=\varepsilon_t.
$$

## 一手／方針
**ARIMAでは最初に「水準系列は定常か」を見る。非定常なら、トレンド型なら通常差分、周期的な季節成分なら季節差分を候補にし、必要な差分後にARMA構造を考える。**

$d$ は単なる記号として暗記せず、「何回通常差分すれば定常なARMA系列になるか」と読む。ランダムウォークは分散が時刻とともに増えることを確認してから差分する。

## 答え
1.
$$
\boxed{\phi(B)(1-B)^dX_t=\theta(B)\varepsilon_t}.
$$
$d$ は通常差分の次数であり、$d$ 回差分した系列がARMA$(p,q)$ に従う。

2. ランダムウォークでは
$$
\operatorname{Var}(X_t)=t\sigma^2
$$
が時点 $t$ に依存するため弱定常でない。しかし
$$
\Delta X_t=X_t-X_{t-1}=\varepsilon_t
$$
なので、一階差分はホワイトノイズとなり弱定常である。

3. 一階差分後がホワイトノイズ、すなわちARMA$(0,0)$ なので、ランダムウォークは
$$
\boxed{\operatorname{ARIMA}(0,1,0)}
$$
の代表例であり、$I(1)$ 過程である。

4. 周期12なら
$$
\Delta_{12}X_{25}=X_{25}-X_{13}=130-118=\boxed{12}.
$$
通常差分は隣接時点の持続的な水準変化・確率的トレンドを除くのに使い、季節差分は同じ季節どうしを引いて周期 $s$ の繰返し成分を除くのに使う。

## 計算例
ARIMA$(1,1,0)$ は
$$
(1-\phi B)(1-B)X_t=\varepsilon_t
$$
だから、$Y_t=\Delta X_t$ とおけば
$$
Y_t=\phi Y_{t-1}+\varepsilon_t.
$$
水準系列 $X_t$ に直接AR$(1)$を当てるのではなく、一階差分系列がAR$(1)$になるモデルと読める。

また $\sigma^2=2$ のランダムウォークでは
$$
\operatorname{Var}(X_1)=2,
\quad
\operatorname{Var}(X_5)=10,
\quad
\operatorname{Var}(X_{20})=40,
$$
だが
$$
\operatorname{Var}(\Delta X_t)=2
$$
は一定である。

## 注意
平均が一定でも、分散や自己共分散が時点に依存すれば弱定常ではない。

差分は多ければよいわけではない。過差分は不要なMA型依存などを作ることがあるので、定常化に必要な次数にとどめる。

通常差分 $(1-B)$ と季節差分 $(1-B^s)$ は目的が異なる。季節ARIMAでは両者を組み合わせることもあるが、まず問題文の非定常性が通常トレンド由来か季節性由来かを見分ける。

<!-- CARD -->

---
id: ts-acf-pacf-identification
title: ACFとPACFからモデル候補を識別する
category: applied-common
subcategory: applied-time-series
topic: acf-pacf-identification
type: formula
difficulty: 2
priority: A
hashtags: [自己相関関数, 偏自己相関関数, モデル同定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ACF・PACFによるモデル同定 }]
---
## 問題
ACFとPACFの形から AR$(p)$ と MA$(q)$ を識別する目安を答えよ。
## 記号・用語
ACFは自己相関関数、PACFは中間時点の線形効果を除いた偏自己相関関数である。
## 使用公式・定理
**モデル同定の目安**：AR$(p)$ はACFが減衰してPACFがラグ $p$ で打ち切られ、MA$(q)$ はACFがラグ $q$ で打ち切られてPACFが減衰する。
## 一手／方針
厳密に0となる側を探し、次数候補を決める。
## 答え
PACFがラグ2以降ほぼ0でACFが減衰するなら AR$(1)$、ACFがラグ2以降ほぼ0でPACFが減衰するなら MA$(1)$ が候補である。
## 計算例
標本ACFが $(0.7,0.49,0.34,\ldots)$、標本PACFが $(0.7,0.02,-0.01,\ldots)$ なら AR$(1)$ を候補にする。
## 注意
標本変動があるため、情報量規準や残差診断も併用する。

<!-- CARD -->

---
id: ts-sample-acf
title: 標本自己共分散から標本自己相関まで一続きで計算する
category: applied-common
subcategory: applied-time-series
topic: sample-autocovariance-acf-canonical
type: strategy
difficulty: 2
priority: A
hashtags:
  - 時系列解析
  - 標本自己共分散
  - 標本自己相関
  - ACF
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 自己相関関数
---
## 問題
観測列 $x_1,\ldots,x_n$ について、まず分母を $n$ にそろえた標本自己共分散を
$$
\widehat\gamma(k)
=\frac1n\sum_{t=k+1}^{n}(x_t-\bar x)(x_{t-k}-\bar x)
\qquad(k\ge0)
$$
と定義する。
1. この定義から標本自己相関 $\widehat\rho(k)$ の計算式を導け。
2. $(x_1,x_2,x_3,x_4)=(1,2,3,2)$ のラグ1標本自己相関を求めよ。
3. $(x_1,x_2,x_3,x_4)=(1,3,2,4)$ のラグ1標本自己共分散と標本自己相関を求めよ。

## 記号・用語
$\bar x=n^{-1}\sum_{t=1}^n x_t$ は標本平均、$\widehat\gamma(k)$ はラグ $k$ の標本自己共分散、$\widehat\rho(k)$ はラグ $k$ の標本自己相関である。自己共分散は変動の大きさを単位付きで測り、自己相関はそれをラグ0の分散尺度で正規化して無次元化する。

## 使用公式・定理
分母をすべて $n$ にそろえた定義なら
$$
\widehat\rho(k)
=\frac{\widehat\gamma(k)}{\widehat\gamma(0)}.
$$
ここで
$$
\widehat\gamma(0)
=\frac1n\sum_{t=1}^{n}(x_t-\bar x)^2
$$
だから、共通の $1/n$ が消えて
$$
\widehat\rho(k)
=\frac{\sum_{t=k+1}^{n}(x_t-\bar x)(x_{t-k}-\bar x)}
{\sum_{t=1}^{n}(x_t-\bar x)^2}.
$$

## 一手／方針
**平均を求める→偏差列を作る→ラグをずらした偏差の積を足す→必要ならラグ0で正規化する。** 自己共分散と自己相関を別々の公式として暗記せず、同じ偏差積から順に作る。

## 答え
1. 分母 $n$ の自己共分散規約では
$$
\widehat\rho(k)
=\frac{\widehat\gamma(k)}{\widehat\gamma(0)}
=\frac{\sum_{t=k+1}^{n}(x_t-\bar x)(x_{t-k}-\bar x)}
{\sum_{t=1}^{n}(x_t-\bar x)^2}.
$$

2. $(1,2,3,2)$ では
$$
\bar x=2,
$$
偏差列は $(-1,0,1,0)$ である。ラグ1の偏差積和は
$$
0(-1)+1(0)+0(1)=0,
$$
ラグ0の偏差平方和は
$$
1+0+1+0=2.
$$
よって
$$
\widehat\rho(1)=0.
$$

3. $(1,3,2,4)$ では
$$
\bar x=2.5,
$$
偏差列は $(-1.5,0.5,-0.5,1.5)$ である。ラグ1の偏差積和は
$$
0.5(-1.5)+(-0.5)(0.5)+1.5(-0.5)=-1.75.
$$
したがって
$$
\widehat\gamma(1)=\frac{-1.75}{4}=-0.4375.
$$
また偏差平方和は
$$
2.25+0.25+0.25+2.25=5,
$$
なので
$$
\widehat\gamma(0)=\frac54=1.25,
\qquad
\widehat\rho(1)=\frac{-0.4375}{1.25}=-0.35.
$$

## 計算例
3のデータでは、自己相関を直接計算しても
$$
\widehat\rho(1)=\frac{-1.75}{5}=-0.35
$$
となる。これは分母を各ラグで共通の $n$ にした自己共分散を正規化した結果と一致する。

## 注意
標本自己共分散には複数の規約がある。たとえばラグ $k$ で分母を $n-k$ とする定義も使われる。その場合、$\widehat\gamma(k)/\widehat\gamma(0)$ は上の「偏差積和÷偏差平方和」と同じ数値にはならない。問題文やソフトウェアの定義を先に確認し、分母規約を途中で混ぜない。また標本ACFは有限標本では理論ACFと一致しない。

<!-- CARD -->

---
id: ts-simple-exponential-smoothing
title: 単純指数平滑法で予測する
category: applied-common
subcategory: applied-time-series
topic: exponential-smoothing
type: calc_step
difficulty: 2
priority: B
hashtags: [指数平滑法, 予測]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 指数平滑法 }]
---
## 問題
$\alpha=0.3$、$X_t=120$、$S_{t-1}=100$ のとき、単純指数平滑法の1期先予測値を求めよ。
## 記号・用語
$\alpha\in(0,1)$ は平滑化定数、$S_t$ は時刻 $t$ の平滑値である。
## 使用公式・定理
**単純指数平滑法**：
$$S_t=\alpha X_t+(1-\alpha)S_{t-1},\qquad \widehat X_{t+1\mid t}=S_t.$$
## 一手／方針
新観測に重み $\alpha$、直前の平滑値に重み $1-\alpha$ を付ける。
## 答え
$$S_t=0.3\cdot120+0.7\cdot100=106.$$
よって1期先予測値は $106$ である。
## 計算例
$\alpha$ が1に近いほど新しい観測へ速く反応する。
## 注意
単純指数平滑法は、明示的なトレンドや季節性を含まない水準系列に適する。

<!-- CARD -->

---
id: ts-spectral-density-ar1
title: AR(1)のスペクトル密度を導き周波数特性を読む
category: applied-common
subcategory: applied-time-series
topic: ar1-spectral-density-canonical
type: strategy
difficulty: 3
priority: A
hashtags:
  - 時系列解析
  - ARモデル
  - スペクトル密度
  - 周波数解析
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: スペクトル密度
---
## 問題
定常AR$(1)$過程
$$
X_t=\phi X_{t-1}+\varepsilon_t,
\qquad |\phi|<1,
\qquad \operatorname{Var}(\varepsilon_t)=\sigma_\varepsilon^2
$$
を考える。
1. スペクトル密度 $f_X(\lambda)$ を導け。
2. $f_X(0)/f_X(\pi)$ を一般の $\phi$ で求め、$\phi>0$ と $\phi<0$ でどの周波数帯が強くなるか説明せよ。
3. $\phi=0.6$ のとき $f_X(0)/f_X(\pi)$ を求めよ。

## 記号・用語
$\lambda\in[-\pi,\pi]$ は角周波数、$f_X(\lambda)$ は周波数ごとの変動の強さを表すスペクトル密度である。$\lambda=0$ は非常にゆっくりした変動、$\lambda=\pi$ は離散時間で表せる最高周波数側に対応する。

## 使用公式・定理
バックシフト演算子 $B$ を用いると
$$
(1-\phi B)X_t=\varepsilon_t,
$$
したがって
$$
X_t=(1-\phi B)^{-1}\varepsilon_t.
$$
ホワイトノイズを線形フィルタ $\psi(B)$ に通した系列のスペクトル密度は
$$
f_X(\lambda)
=\frac{\sigma_\varepsilon^2}{2\pi}
\left|\psi(e^{-i\lambda})\right|^2.
$$
AR$(1)$では
$$
\psi(e^{-i\lambda})=(1-\phi e^{-i\lambda})^{-1},
$$
かつ
$$
|1-\phi e^{-i\lambda}|^2
=(1-\phi e^{-i\lambda})(1-\phi e^{i\lambda})
=1+\phi^2-2\phi\cos\lambda.
$$

## 一手／方針
**AR方程式を伝達関数へ直してから絶対値二乗を取る。** 周波数の解釈では、式全体を暗記せず $\lambda=0,\pi$ を代入して分母を比較する。

## 答え
1.
$$
f_X(\lambda)
=\frac{\sigma_\varepsilon^2}
{2\pi\{1+\phi^2-2\phi\cos\lambda\}}.
$$

2. $\cos0=1,\cos\pi=-1$ より
$$
f_X(0)=\frac{\sigma_\varepsilon^2}{2\pi(1-\phi)^2},
\qquad
f_X(\pi)=\frac{\sigma_\varepsilon^2}{2\pi(1+\phi)^2}.
$$
したがって
$$
\frac{f_X(0)}{f_X(\pi)}
=\left(\frac{1+\phi}{1-\phi}\right)^2.
$$
$\phi>0$ ならこの比は1より大きく低周波成分が強い。$\phi<0$ なら1より小さく高周波成分が相対的に強い。$\phi=0$ ならスペクトルは平坦でホワイトノイズになる。

3. $\phi=0.6$ なら
$$
\frac{f_X(0)}{f_X(\pi)}
=\left(\frac{1.6}{0.4}\right)^2
=16.
$$

## 計算例
$\phi=-0.6$ なら
$$
\frac{f_X(0)}{f_X(\pi)}
=\left(\frac{0.4}{1.6}\right)^2
=\frac1{16}.
$$
正のAR係数では系列がゆっくり持続しやすく低周波側が強くなるのに対し、負のAR係数では符号が交互に変わりやすく高周波側が強くなる。

## 注意
$f_X(0)/f_X(\pi)$ は分母の比が逆転するので、$(1+\phi)^2/(1-\phi)^2$ になる点に注意する。また $|\phi|<1$ は定常なAR$(1)$としてこのスペクトルを扱うための条件である。スペクトル密度の大きさは周波数ごとの変動の強さであり、特定周波数の確率そのものではない。

<!-- CARD -->

---
id: ts-state-space-definition
title: 線形ガウス状態空間モデルを定義する
category: applied-common
subcategory: applied-time-series
topic: state-space-definition
type: formula
difficulty: 2
priority: A
hashtags: [状態空間モデル, カルマンフィルタ]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 状態空間モデル }]
---
## 問題
正規分布を用いる線形ガウス状態空間モデルの状態方程式と観測方程式を書け。
## 記号・用語
$\boldsymbol\alpha_t$ は潜在状態、$\boldsymbol y_t$ は観測、$\boldsymbol\eta_t\sim N(\boldsymbol0,Q)$ は状態雑音、$\boldsymbol\varepsilon_t\sim N(\boldsymbol0,H)$ は観測雑音である。
## 使用公式・定理
**定義（状態空間モデル）**：
$$\boldsymbol\alpha_t=T\boldsymbol\alpha_{t-1}+\boldsymbol\eta_t,\qquad \boldsymbol y_t=Z\boldsymbol\alpha_t+\boldsymbol\varepsilon_t,$$
初期状態と2種類の雑音は互いに独立とする。
## 一手／方針
時間発展を状態方程式、状態から観測への対応を観測方程式に分ける。
## 答え
潜在状態の推移と観測生成を2本の線形式で表すモデルである。
## 計算例
局所水準モデルは $\alpha_t=\alpha_{t-1}+\eta_t$、$y_t=\alpha_t+\varepsilon_t$ であり、$T=Z=1$ である。
## 注意
$Q$ と $H$ はそれぞれ状態雑音と観測雑音の分散共分散行列である。

<!-- CARD -->

---
id: ts-kalman-update
title: カルマンフィルタの予測→更新を1サイクル計算する
category: applied-common
subcategory: applied-time-series
topic: kalman-filter-cycle
type: calc_step
difficulty: 3
priority: A
hashtags:
  - 状態空間モデル
  - カルマンフィルタ
  - 予測
  - フィルタリング
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 状態空間モデル
---
## 問題
1次元状態空間モデルで
$$
a_{t-1\mid t-1}=2,
\quad P_{t-1\mid t-1}=3,
\quad T=0.5,
\quad Q=1,
$$
$$
Z=1,
\quad H=0.25,
\quad y_t=2
$$
とする。カルマンフィルタの予測平均・予測分散を求め、その後に観測 $y_t$ で更新平均・更新分散を求めよ。

## 記号・用語
$v_t=y_t-Za_{t\mid t-1}$ は予測誤差、$F_t=Z^2P_{t\mid t-1}+H$ はその分散、$K_t=P_{t\mid t-1}Z/F_t$ はカルマンゲインである。
## 使用公式・定理
**予測**：
$$
a_{t\mid t-1}=Ta_{t-1\mid t-1},
$$
$$
P_{t\mid t-1}=T^2P_{t-1\mid t-1}+Q.
$$

**更新**：
$$
v_t=y_t-Za_{t\mid t-1},
\qquad
F_t=Z^2P_{t\mid t-1}+H,
$$
$$
K_t=\frac{P_{t\mid t-1}Z}{F_t},
$$
$$
a_{t\mid t}=a_{t\mid t-1}+K_tv_t,
$$
$$
P_{t\mid t}=P_{t\mid t-1}-K_tZP_{t\mid t-1}.
$$

多次元では分散の予測を
$$
P_{t\mid t-1}=TP_{t-1\mid t-1}T^{\mathsf T}+Q
$$
とする。

## 一手／方針
Kalmanフィルタは「前時点の事後分布を状態方程式で**予測**し、新しい観測でその予測を**更新**する」という2段階を毎時点で繰り返す。式を別カードとして暗記しない。

## 答え
予測は
$$
a_{t\mid t-1}=1,
\qquad P_{t\mid t-1}=1.75.
$$
更新では
$$
v_t=1,
\qquad F_t=2,
\qquad K_t=0.875,
$$
$$
a_{t\mid t}=1.875,
\qquad P_{t\mid t}=0.21875.
$$

## 計算例
まず予測平均は
$$
a_{t\mid t-1}=0.5\cdot2=1.
$$
予測分散は
$$
\begin{aligned}
P_{t\mid t-1}
&=0.5^2\cdot3+1\\
&=0.75+1\\
&=1.75.
\end{aligned}
$$
次に
$$
v_t=2-1\cdot1=1,
$$
$$
F_t=1^2\cdot1.75+0.25=2,
$$
$$
K_t=\frac{1.75}{2}=0.875.
$$
したがって
$$
a_{t\mid t}=1+0.875\cdot1=1.875,
$$
$$
\begin{aligned}
P_{t\mid t}
&=1.75-0.875\cdot1\cdot1.75\\
&=0.21875.
\end{aligned}
$$

## 注意
分散の予測では状態係数を左右から掛ける。更新後分散が予測分散より小さくなることも検算に使える。数値安定性が必要な実装ではJoseph形式を使う場合がある。

<!-- CARD -->

---
id: ts-weak-vs-strong-stationarity
title: 弱定常性・自己共分散・ホワイトノイズを一続きで判定する
category: applied-common
subcategory: applied-time-series
topic: stationarity-autocovariance-white-noise-canonical
type: strategy
difficulty: 2
priority: A
hashtags:
  - 時系列解析
  - 弱定常
  - 強定常
  - 自己共分散
  - 自己相関関数
  - ホワイトノイズ
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ARIMAモデル
---
## 問題
時系列の定常性と基本的な依存構造について次を解け。

1. 弱定常性と強定常性を定義し、両者の関係を述べよ。
2. 弱定常過程の自己共分散 $\gamma(h)$ が満たす基本性質を3つ挙げ、自己相関 $\rho(h)$ を定義せよ。
3. 弱ホワイトノイズ $\{\varepsilon_t\}$ を平均・分散・異時点共分散で定義せよ。
4. $\gamma(0)=4,\gamma(1)=5$ という自己共分散候補は妥当か。
5. 平均0、分散9で、異なる時点どうしが無相関な過程は弱ホワイトノイズか。また独立性まで結論できるか。

## 記号・用語
**弱定常**とは、平均が時点によらず一定で、自己共分散が2時点の絶対位置ではなくラグだけに依存することをいう。

**強定常**とは、任意の有限個の時点を同じだけ平行移動しても、その同時分布が変わらないことをいう。

弱ホワイトノイズは「平均0・分散一定・異時点で無相関」という2次モーメントで定義される過程であり、一般には独立性や正規性まで要求しない。

## 使用公式・定理
弱定常過程では
$$
E[X_t]=\mu,
\qquad
\operatorname{Cov}(X_t,X_{t+h})=\gamma(h)
$$
が $t$ に依存しない。

自己共分散には
$$
\gamma(0)=\operatorname{Var}(X_t)\ge0,
$$
$$
\gamma(-h)=\gamma(h),
$$
$$
|\gamma(h)|\le\gamma(0)
$$
が成り立つ。さらに任意の有限係数列 $a_1,\ldots,a_m$ に対して
$$
\sum_{i,j}a_ia_j\gamma(t_i-t_j)\ge0
$$
となる非負定値性も必要である。

自己相関は
$$
\rho(h)=\frac{\gamma(h)}{\gamma(0)}
$$
である。

弱ホワイトノイズは
$$
E[\varepsilon_t]=0,
\qquad
\operatorname{Var}(\varepsilon_t)=\sigma_\varepsilon^2,
$$
$$
\operatorname{Cov}(\varepsilon_t,\varepsilon_s)=0
\quad(t\ne s)
$$
を満たす。

## 一手／方針
**時系列の前提を問われたら「平均 → 分散 → ラグごとの共分散」の順に確認する。** 弱定常なら自己共分散を $\gamma(h)$ と書けるので、対称性・大きさ・非負定値性を確認する。ホワイトノイズなら、その自己共分散がラグ0以外で0になる特別な弱定常過程と見る。

## 答え
1. 弱定常は
$$
E[X_t]=\mu,
\qquad
\operatorname{Cov}(X_t,X_{t+h})=\gamma(h)
$$
が時点 $t$ に依存しないこと。強定常は任意の $k$ と時点 $t_1,\ldots,t_k$、平行移動量 $r$ に対し
$$
(X_{t_1},\ldots,X_{t_k})
\overset d=
(X_{t_1+r},\ldots,X_{t_k+r})
$$
となること。有限2次モーメントを持つ強定常過程は弱定常だが、逆は一般には成り立たない。

2. 基本性質は
$$
\boxed{\gamma(0)\ge0},\qquad
\boxed{\gamma(-h)=\gamma(h)},\qquad
\boxed{|\gamma(h)|\le\gamma(0)}.
$$
自己相関は
$$
\boxed{\rho(h)=\gamma(h)/\gamma(0)}.
$$

3. 弱ホワイトノイズは
$$
E[\varepsilon_t]=0,
\quad
\operatorname{Var}(\varepsilon_t)=\sigma_\varepsilon^2,
\quad
\operatorname{Cov}(\varepsilon_t,\varepsilon_s)=0\ (t\ne s).
$$
したがって
$$
\gamma_\varepsilon(h)=
\begin{cases}
\sigma_\varepsilon^2,&h=0,\\
0,&h\ne0.
\end{cases}
$$

4. 妥当でない。自己共分散には
$$
|\gamma(1)|\le\gamma(0)
$$
が必要だが、ここでは $5>4$ だからである。

5. 平均0・分散9一定・異時点無相関なので弱ホワイトノイズである。ただし無相関だけから一般に独立性は従わない。正規過程など追加条件があれば無相関から独立を言える場合がある。

## 計算例
弱ホワイトノイズで $\sigma_\varepsilon^2=9$ なら
$$
\gamma(0)=9,\qquad
\gamma(1)=\gamma(2)=\cdots=0,
$$
したがって
$$
\rho(0)=1,\qquad
\rho(h)=0\quad(h\ne0).
$$
これはAR・MAモデルの「革新」の基準となる依存のない2次構造である。

## 注意
「定常」は平均が一定というだけでは足りない。分散が時点で変わるランダムウォークは、平均0でも弱定常でない。

また $|\gamma(h)|\le\gamma(0)$ と対称性を満たすだけで、任意の数列が自己共分散関数になるわけではない。完全な妥当性には非負定値性が必要である。

弱ホワイトノイズの「白色」は無相関を意味し、独立・正規とは区別する。

<!-- CARD -->

---
id: ts-ar1-acf
title: AR(1)の定常モーメントとACFを導き減衰速度を読む
category: applied-common
subcategory: applied-time-series
topic: ar1-moments-acf-decay-canonical
type: strategy
difficulty: 3
priority: A
hashtags:
  - 時系列解析
  - ARモデル
  - 自己共分散
  - 自己相関関数
  - 半減ラグ
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ARIMAモデル
---
## 問題
AR$(1)$過程
$$
X_t=c+\phi X_{t-1}+\varepsilon_t,
\qquad |\phi|<1,
\qquad E[\varepsilon_t]=0,
\qquad \operatorname{Var}(\varepsilon_t)=\sigma_\varepsilon^2
$$
を考える。
1. 定常平均 $\mu$、定常分散 $\gamma(0)$、自己相関 $\rho(h)$ を導け。
2. $c=0,\phi=0.8,\sigma_\varepsilon^2=4$ のとき、$\gamma(0)$ と $\rho(2)$ を求めよ。
3. 同じ $\phi=0.8$ で、自己相関が0.5以下になる最小の非負整数ラグ $h$ を求めよ。

## 記号・用語
$\mu=E[X_t]$ は定常平均、$\gamma(h)=\operatorname{Cov}(X_t,X_{t-h})$ は自己共分散、$\rho(h)=\gamma(h)/\gamma(0)$ は自己相関である。定常AR$(1)$では現在の偏差が前期の偏差を係数 $\phi$ だけ引き継ぐ。

## 使用公式・定理
定常平均を取ると
$$
\mu=c+\phi\mu,
$$
よって
$$
\mu=\frac{c}{1-\phi}.
$$
中心化した $Y_t=X_t-\mu$ は
$$
Y_t=\phi Y_{t-1}+\varepsilon_t
$$
を満たす。革新は過去と無相関なので
$$
\gamma(0)=\phi^2\gamma(0)+\sigma_\varepsilon^2,
$$
したがって
$$
\gamma(0)=\frac{\sigma_\varepsilon^2}{1-\phi^2}.
$$
また $h\ge1$ では
$$
\gamma(h)=\phi\gamma(h-1),
$$
よって
$$
\gamma(h)=\phi^h\gamma(0),
\qquad
\rho(h)=\phi^h
\quad(h\ge0).
$$
共分散の対称性から一般には $\rho(h)=\phi^{|h|}$ と書ける。

## 一手／方針
**平均を引いてAR(1)を中心化し、分散は1本の分散方程式、自己共分散は1期ずつの再帰で導く。** 半減ラグは別公式として暗記せず、得られた $|\rho(h)|=|\phi|^h$ が所定の閾値以下になる最小整数を求める。

## 答え
1. 
$$
\mu=\frac{c}{1-\phi},
\qquad
\gamma(0)=\frac{\sigma_\varepsilon^2}{1-\phi^2},
\qquad
\rho(h)=\phi^{|h|}.
$$

2. $c=0,\phi=0.8,\sigma_\varepsilon^2=4$ なので
$$
\gamma(0)=\frac{4}{1-0.8^2}
=\frac{4}{0.36}
=\frac{100}{9}\approx11.11,
$$
$$
\rho(2)=0.8^2=0.64.
$$

3. $0<\phi<1$ なので
$$
0.8^h\le0.5
$$
を解く。対数を取ると
$$
h\ge\frac{\log0.5}{\log0.8}\approx3.106.
$$
よって最小整数は
$$
h=4.
$$
実際、$0.8^3=0.512>0.5$、$0.8^4=0.4096\le0.5$ である。

## 計算例
$\phi=-0.8$ なら
$$
\rho(h)=(-0.8)^h
$$
なので符号はラグごとに交互に変わる。一方、相関の大きさは
$$
|\rho(h)|=0.8^h
$$
だから、絶対値が0.5以下になる最小ラグは同じく4である。

## 注意
$|\phi|<1$ は定常AR$(1)$の条件である。$\phi<0$ のとき「自己相関が0.5以下」を符号付きの不等式として読むとラグ1ですでに満たし得るので、減衰速度を測る半減ラグでは通常 $|\rho(h)|$ を使う。また標本自己相関は有限標本変動を含むため、理論値 $\phi^h$ と厳密には一致しない。

<!-- CARD -->

---
id: ts-ar1-hstep-forecast
title: AR(1)の多期先予測・誤差分散・予測区間を導く
category: applied-common
subcategory: applied-time-series
topic: ar1-forecast-canonical
type: formula
difficulty: 3
priority: A
hashtags:
  - ARIMAモデル
  - AR1
  - 多期先予測
  - 予測誤差分散
  - 予測区間
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ARIMAモデル
---
## 問題
定常平均 $\mu$ のAR(1)
$$
X_t-\mu=\phi(X_{t-1}-\mu)+\varepsilon_t,
\qquad |\phi|<1,
$$
の $h$ 期先予測と予測誤差分散を導け。

数値例として $\mu=5,\phi=0.8,X_t=7,\sigma_\varepsilon^2=1,h=2$ の予測値と予測誤差分散を求めよ。

## 記号・用語
$X_t$ は時刻 $t$ の観測、$\varepsilon_t$ は平均0で一定分散のホワイトノイズ、$B$ は $BX_t=X_{t-1}$ を満たすバックシフト演算子である。$\gamma(h)$ と $\rho(h)$ はラグ $h$ の自己共分散と自己相関である。
## 使用公式・定理
モデルを前向きに反復すると
$$
X_{t+h}-\mu
=\phi^h(X_t-\mu)
+\sum_{j=0}^{h-1}\phi^j\varepsilon_{t+h-j}.
$$
時刻 $t$ までの情報を $\mathcal F_t$ とすると、将来革新は条件付き平均0だから
$$
\widehat X_{t+h\mid t}
=E[X_{t+h}\mid\mathcal F_t]
=\mu+\phi^h(X_t-\mu).
$$
予測誤差は
$$
e_{t+h\mid t}
=\sum_{j=0}^{h-1}\phi^j\varepsilon_{t+h-j},
$$
よって独立な革新の分散を加えて
$$
V_h
:=\operatorname{Var}(e_{t+h\mid t})
=\sigma_\varepsilon^2\sum_{j=0}^{h-1}\phi^{2j}
=\sigma_\varepsilon^2\frac{1-\phi^{2h}}{1-\phi^2}.
$$
さらに革新が正規分布で、母数を既知として扱うなら
$$
X_{t+h}\mid\mathcal F_t
\sim N\!\left(\widehat X_{t+h\mid t},V_h\right),
$$
したがって近似95%予測区間は
$$
\widehat X_{t+h\mid t}\pm1.96\sqrt{V_h}.
$$

## 一手／方針
予測式と誤差分散を別暗記せず、AR(1)を $h$ 回反復した一つの展開式から、既知部分を条件付き期待値へ、未知の将来革新を予測誤差へ振り分ける。

## 答え
$$
\widehat X_{t+h\mid t}=\mu+\phi^h(X_t-\mu),
$$
$$
\operatorname{Var}(e_{t+h\mid t})
=\sigma_\varepsilon^2\frac{1-\phi^{2h}}{1-\phi^2}.
$$
$h=1$ なら通常の1期先予測になる。

数値例では
$$
\widehat X_{t+2\mid t}=6.28,
\qquad
\operatorname{Var}(e_{t+2\mid t})=1.64.
$$

## 計算例
$\mu=5,\phi=0.8,X_t=7,\sigma_\varepsilon^2=1,h=2$ では、まず
$$
\begin{aligned}
\widehat X_{t+2\mid t}
&=5+0.8^2(7-5)\\
&=5+0.64\cdot2\\
&=6.28.
\end{aligned}
$$
予測誤差は
$$
e_{t+2\mid t}=\varepsilon_{t+2}+0.8\varepsilon_{t+1}
$$
なので
$$
\begin{aligned}
V_2
&=1+0.8^2\\
&=1.64.
\end{aligned}
$$
正規革新を仮定すれば標準偏差は
$$
\sqrt{1.64}\approx1.281,
$$
よって95%予測区間は
$$
\begin{aligned}
6.28\pm1.96(1.281)
&\approx6.28\pm2.51\\
&\approx(3.77,8.79).
\end{aligned}
$$
なお $h=1$ なら
$$
\widehat X_{t+1\mid t}=5+0.8(7-5)=6.6,
\qquad V_1=1.
$$

## 注意
$h\to\infty$ では予測値は $\mu$、予測誤差分散は定常分散 $\sigma_\varepsilon^2/(1-\phi^2)$ へ近づく。分散では係数を二乗する。

上の予測区間は革新分散やAR係数などの母数を既知として扱った条件付き分布に基づく。実際に母数を推定している場合、その推定不確実性を無視した区間になり得る。

<!-- CARD -->

---
id: ts-yule-walker-ar2
title: AR(2)のYule–Walker方程式を解く
category: applied-common
subcategory: applied-time-series
topic: yule-walker
type: calc_step
difficulty: 4
priority: A
hashtags: [ARIMAモデル, Yule-Walker方程式, AR2]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ARIMAモデル }]
---
## 問題
AR(2)で $\rho(1)=0.6,\rho(2)=0.4$。Yule–Walker方程式から $\phi_1,\phi_2$ を求めよ。
## 記号・用語
$X_t$ は時刻 $t$ の観測、$\varepsilon_t$ は平均0で一定分散のホワイトノイズ、$B$ は $BX_t=X_{t-1}$ を満たすバックシフト演算子である。$\gamma(h)$ と $\rho(h)$ はラグ $h$ の自己共分散と自己相関である。
## 使用公式・定理
$$\rho(1)=\phi_1+\phi_2\rho(1),\quad
\rho(2)=\phi_1\rho(1)+\phi_2.$$
## 一手／方針
与えられた自己相関を2本のYule--Walker方程式へ代入し、連立一次方程式を消去法で解く。
## 答え
$0.6=\phi_1+0.6\phi_2$、$0.4=0.6\phi_1+\phi_2$ を解き
$$\phi_1=0.5625,\qquad\phi_2=0.0625.$$
第1式から $\phi_1=0.6-0.6\phi_2$。これを第2式へ代入すると $0.4=0.36+0.64\phi_2$ なので $\phi_2=0.0625$、さらに $\phi_1=0.5625$ を得る。
## 計算例
第1式から $\phi_1=0.6-0.6\phi_2$ と代入する。
## 注意
標本ACFを代入した解は推定値である。

<!-- CARD -->

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
id: ts-maq-acf-cutoff
title: MA(q)の自己共分散を導きACFの打切りを説明する
category: applied-common
subcategory: applied-time-series
topic: maq-autocovariance-acf-canonical
type: strategy
difficulty: 3
priority: A
hashtags:
  - 時系列解析
  - MAモデル
  - 自己共分散
  - 自己相関関数
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ARIMAモデル
---
## 問題
平均0のMA$(q)$過程
$$
X_t=\sum_{j=0}^{q}\theta_j\varepsilon_{t-j},
\qquad \theta_0=1,
\qquad \operatorname{Var}(\varepsilon_t)=\sigma_\varepsilon^2
$$
を考える。革新 $\varepsilon_t$ は異時点で互いに無相関とする。
1. 自己共分散 $\gamma(h)$ の式を導き、$h>q$ で0になる理由を説明せよ。
2. MA$(1)$
$$
X_t=\varepsilon_t+0.5\varepsilon_{t-1},
\qquad \sigma_\varepsilon^2=4
$$
について、$\gamma(0),\gamma(1),\gamma(2)$ と $\rho(1)$ を求めよ。

## 記号・用語
$\gamma(h)=\operatorname{Cov}(X_t,X_{t-h})$ はラグ $h$ の自己共分散、$\rho(h)=\gamma(h)/\gamma(0)$ は自己相関である。MA過程では各 $X_t$ が有限個の革新の線形結合で表される。

## 使用公式・定理
$h\ge0$ とする。2時点を展開すると
$$
X_t=\sum_{j=0}^{q}\theta_j\varepsilon_{t-j},
\qquad
X_{t-h}=\sum_{k=0}^{q}\theta_k\varepsilon_{t-h-k}.
$$
異時点の革新は無相関なので、共分散に残るのは
$$
t-j=t-h-k
$$
すなわち $j=h+k$ を満たす同じ革新の組だけである。したがって $0\le h\le q$ では
$$
\gamma(h)
=\sigma_\varepsilon^2
\sum_{k=0}^{q-h}\theta_{k+h}\theta_k,
$$
そして $h>q$ では共有する革新が存在しないので
$$
\gamma(h)=0.
$$
定常性より $\gamma(-h)=\gamma(h)$ である。

## 一手／方針
**公式を暗記するより、$X_t$ と $X_{t-h}$ に共通して現れる革新を拾う。** 共通項があるラグだけ自己共分散が残り、次数 $q$ を超えると共有する革新がなくなる。この見方から一般式とACFの打切りを同時に得る。

## 答え
1. 
$$
\gamma(h)
=\sigma_\varepsilon^2
\sum_{k=0}^{q-h}\theta_{k+h}\theta_k
\qquad(0\le h\le q),
$$
$$
\gamma(h)=0
\qquad(h>q).
$$
よってMA$(q)$の理論ACFはラグ $q$ で打ち切られる。

2. MA$(1)$では
$$
\gamma(0)=(1+\theta^2)\sigma_\varepsilon^2,
\qquad
\gamma(1)=\theta\sigma_\varepsilon^2,
\qquad
\gamma(h)=0\ (h\ge2).
$$
$
\theta=0.5,\sigma_\varepsilon^2=4
$
を代入すると
$$
\gamma(0)=(1+0.5^2)4=5,
$$
$$
\gamma(1)=0.5\cdot4=2,
\qquad
\gamma(2)=0.
$$
したがって
$$
\rho(1)=\frac{\gamma(1)}{\gamma(0)}=\frac25=0.4.
$$

## 計算例
MA$(1)$で一般の係数 $\theta$ なら
$$
\rho(1)=\frac{\theta}{1+\theta^2},
\qquad
\rho(h)=0\quad(|h|\ge2).
$$
たとえば $\theta=-0.5$ なら $\rho(1)=-0.4$ であり、ラグ1の符号は変わるがラグ2以降が0という打切り位置は変わらない。

## 注意
理論ACFがラグ $q$ より先で厳密に0でも、有限標本の標本ACFは標本変動により0にはならない。モデル同定では「ほぼ0になる」という見え方とPACF、情報量規準、残差診断を併用する。またMA多項式の符号規約が異なる教科書では係数 $\theta_j$ の符号表示が変わるので、必ず与えられたモデル式から計算する。

<!-- CARD -->

---
id: stoch-transition-matrix-check
title: 遷移行列として妥当か判定する
category: applied-common
subcategory: applied-stochastic-processes
topic: transition-matrix
type: calc_step
difficulty: 2
priority: A
hashtags: [マルコフ連鎖, 遷移行列, 確率]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: マルコフ連鎖 }]
---
## 問題
$P=\begin{pmatrix}0.7&0.3\\-0.1&1.1\end{pmatrix}$ は遷移行列か。
## 記号・用語
- $p_{ij}=P(X_{t+1}=j\mid X_t=i)$
## 使用公式・定理
遷移行列は $p_{ij}\ge0$ かつ各行和が1である。
## 一手／方針
各成分が非負かを確認した後、行ごとに和を計算して1になるかを判定する。
## 答え
第2行に負の成分 $-0.1$ があるため、遷移行列ではない。
## 計算例
行和はどちらも1だが、非負条件を満たさない。
## 注意
行和だけを確認して終えない。

<!-- CARD -->

---
id: stoch-three-state-two-step
title: 3状態連鎖の2段階遷移確率を計算する
category: applied-common
subcategory: applied-stochastic-processes
topic: chapman-kolmogorov
type: calc_step
difficulty: 3
priority: A
hashtags: [マルコフ連鎖, Chapman-Kolmogorov, 行列積]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: マルコフ連鎖 }]
---
## 問題
$P=\begin{pmatrix}1/2&1/2&0\\0&1/2&1/2\\1&0&0\end{pmatrix}$ の $p_{13}^{(2)}$ を求めよ。
## 記号・用語
$p_{ij}=P(X_{n+1}=j\mid X_n=i)$ は1段階遷移確率、$p_{ij}^{(2)}=P(X_{n+2}=j\mid X_n=i)$ は2段階遷移確率である。
## 使用公式・定理
Chapman–Kolmogorov関係は $p_{ij}^{(2)}=\sum_kp_{ik}p_{kj}$。
## 一手／方針
中間状態を1つ挟む全経路を列挙し、対応する2つの遷移確率の積を足す。
## 答え
$$p_{13}^{(2)}=(1/2)0+(1/2)(1/2)+0=1/4.$$
## 計算例
行列積 $P^2$ の第 $(1,3)$ 成分と同じ。
## 注意
同じ行の要素同士を掛けない。

<!-- CARD -->

---
id: stoch-three-state-stationary
title: 定常分布を連立方程式で解き長期割合を読む
category: applied-common
subcategory: applied-stochastic-processes
topic: stationary-distribution-canonical
type: strategy
difficulty: 3
priority: A
hashtags:
  - マルコフ連鎖
  - 定常分布
  - 連立方程式
  - 可用率
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: マルコフ連鎖
---
## 問題
離散時間マルコフ連鎖について次を解け。
1. 遷移行列
$$
P=\begin{pmatrix}
0&1&0\\
0&0&1\\
1/2&0&1/2
\end{pmatrix}
$$
の定常分布 $\boldsymbol\pi=(\pi_1,\pi_2,\pi_3)$ を求めよ。
2. 稼働状態0・故障状態1の遷移行列
$$
P=\begin{pmatrix}
0.9&0.1\\
0.4&0.6
\end{pmatrix}
$$
について定常分布を求め、長期可用率を答えよ。

## 記号・用語
定常分布 $\boldsymbol\pi$ は、1期進めても分布が変わらない確率ベクトルである。行ベクトル表記なら
$$
\boldsymbol\pi P=\boldsymbol\pi,
\qquad
\sum_i\pi_i=1,
\qquad
\pi_i\ge0.
$$
長期可用率とは、十分長い時間で見たときに系が稼働状態にいる割合である。有限既約連鎖では各状態の長期滞在割合を対応する定常確率として読める。

## 使用公式・定理
定常分布は
$$
\boldsymbol\pi P=\boldsymbol\pi
$$
と正規化条件
$$
\sum_i\pi_i=1
$$
を連立して求める。

2状態連鎖
$$
P=\begin{pmatrix}
1-a&a\\
b&1-b
\end{pmatrix}
$$
では定常状態で状態間の流量が釣り合うため
$$
\pi_0a=\pi_1b
$$
と $\pi_0+\pi_1=1$ から解ける。

## 一手／方針
**まず $\boldsymbol\pi P=\boldsymbol\pi$ を成分ごとに書き、独立な式だけ残して最後に確率の総和1で正規化する。** 2状態なら往復流量の釣合いを使うと速い。求めた定常確率を、問題文の「長期割合」「長期可用率」などの意味へ戻して答える。

## 答え
1. 定常方程式から
$$
\pi_1=\frac12\pi_3,
\qquad
\pi_2=\pi_1.
$$
したがって $\pi_3=2\pi_1$ であり、
$$
\pi_1+\pi_2+\pi_3
=\pi_1+\pi_1+2\pi_1=1.
$$
よって
$$
\boldsymbol\pi=\left(\frac14,\frac14,\frac12\right).
$$

2. 稼働から故障への定常流量と故障から修復への定常流量を等置すると
$$
0.1\pi_0=0.4\pi_1.
$$
よって $\pi_0=4\pi_1$。さらに $\pi_0+\pi_1=1$ なので
$$
(\pi_0,\pi_1)=(0.8,0.2).
$$
したがって長期可用率は
$$
\boxed{0.8}
$$
である。

## 計算例
一般の2状態故障修復連鎖で、1期当たり故障確率を $a$、修復確率を $b$ とすると
$$
\pi_0=\frac{b}{a+b},
\qquad
\pi_1=\frac{a}{a+b}.
$$
したがって $a$ が小さくなる、または $b$ が大きくなるほど長期可用率 $\pi_0$ は高くなる。

## 注意
$\boldsymbol\pi P=\boldsymbol\pi$ の各成分方程式はすべて独立とは限らないため、最後に $\sum_i\pi_i=1$ を必ず使う。定常分布が存在しても、任意の初期分布から $\boldsymbol\pi$ へ収束するとは限らない。有限既約かつ非周期的な連鎖なら分布は定常分布へ収束する。また詳細釣合い $\pi_ip_{ij}=\pi_jp_{ji}$ は定常性を示す十分条件として便利だが、一般の定常分布が必ず詳細釣合いを満たすわけではない。

<!-- CARD -->

---
id: stoch-detailed-balance-check
title: 詳細釣合いから定常分布を確認する
category: applied-common
subcategory: applied-stochastic-processes
topic: detailed-balance
type: calc_step
difficulty: 3
priority: A
hashtags: [マルコフ連鎖, 詳細釣合い, 可逆性]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: マルコフ連鎖 }]
---
## 問題
$P=\begin{pmatrix}0.8&0.2\\0.3&0.7\end{pmatrix}$ と $\boldsymbol\pi=(0.6,0.4)$ は詳細釣合いを満たすか。
## 記号・用語
$p_{ij}$ は状態 $i$ から $j$ への1段階遷移確率、$\pi_i$ は定常分布で状態 $i$ に割り当てる確率である。
## 使用公式・定理
詳細釣合いは $\pi_ip_{ij}=\pi_jp_{ji}$。
## 一手／方針
状態の各組について定常確率×往路確率と定常確率×復路確率を比較する。
## 答え
$$0.6(0.2)=0.12=0.4(0.3)$$
なので満たし、$\boldsymbol\pi$ は定常分布である。
## 計算例
2状態では非対角の1組を確認すればよい。
## 注意
定常性は詳細釣合いを必ずしも必要としない。

<!-- CARD -->

---
id: stoch-communicating-classes
title: 遷移図から通信類を分ける
category: applied-common
subcategory: applied-stochastic-processes
topic: communicating-classes
type: recognition
difficulty: 3
priority: A
hashtags: [マルコフ連鎖, 通信類, 既約性]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: マルコフ連鎖 }]
---
## 問題
遷移が $1\to2$、$2\to1,3$、$3\to3$ のとき通信類を求め、既約か判定せよ。
## 記号・用語
- 通信：互いに有限ステップで到達可能であること
## 使用公式・定理
$i\leftrightarrow j$ なら同じ通信類に属する。
## 一手／方針
正の確率で到達できる有向経路を両方向に調べ、相互到達可能な状態を同じクラスへまとめる。
## 答え
$\{1,2\}$ と $\{3\}$ が通信類であり、全状態が1類でないので既約でない。
## 計算例
3から1または2へ戻れない。
## 注意
一方向に到達できるだけでは通信しない。

<!-- CARD -->

---
id: stoch-period-computation
title: 状態の周期を帰還時刻から求める
category: applied-common
subcategory: applied-stochastic-processes
topic: period
type: calc_step
difficulty: 3
priority: B
hashtags: [マルコフ連鎖, 周期, 非周期性]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: マルコフ連鎖 }]
---
## 問題
状態 $i$ へ正の確率で戻れる時刻が $2,4,6,\ldots$ のとき周期を求めよ。
## 記号・用語
$p_{ij}=P(X_{n+1}=j\mid X_n=i)$ は1段階遷移確率、$P=(p_{ij})$ は遷移行列である。$P_{ij}^{(n)}$ は $n$ 段階遷移確率を表す。
## 使用公式・定理
周期は $d(i)=\gcd\{n\ge1:p_{ii}^{(n)}>0\}$。
## 一手／方針
同じ状態へ戻れる歩数を列挙し、その最大公約数を取る。
## 答え
$$d(i)=\gcd(2,4,6,\ldots)=2.$$
したがって非周期的ではない。
## 計算例
自己ループ $p_{ii}>0$ があれば周期は1。
## 注意
最小帰還時刻ではなく最大公約数を取る。

<!-- CARD -->

---
id: stoch-absorption-probability
title: 吸収確率の連立方程式を解く
category: applied-common
subcategory: applied-stochastic-processes
topic: absorption-probability
type: calc_step
difficulty: 4
priority: A
hashtags: [マルコフ連鎖, 吸収確率, 初到達]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: マルコフ連鎖 }]
---
## 問題
状態0,2は吸収状態。状態1から確率 $p$ で2へ、$1-p$ で0へ移る。2への吸収確率 $h_1$ を求めよ。
## 記号・用語
$p_{ij}=P(X_{n+1}=j\mid X_n=i)$ は1段階遷移確率、$P=(p_{ij})$ は遷移行列である。$P_{ij}^{(n)}$ は $n$ 段階遷移確率を表す。
## 使用公式・定理
$h_i=\sum_jp_{ij}h_j$、境界条件は $h_0=0,h_2=1$。
## 一手／方針
次の1歩で条件付けた再帰式を作り、吸収状態の境界値を代入して解く。
## 答え
$$h_1=(1-p)h_0+ph_2=p.$$
## 計算例
$p=0.7$ なら2へ吸収される確率は0.7。
## 注意
吸収状態の境界値を先に固定する。

<!-- CARD -->

---
id: stoch-expected-hitting-time
title: 平均到達時間を再帰式で求める
category: applied-common
subcategory: applied-stochastic-processes
topic: expected-hitting-time
type: calc_step
difficulty: 4
priority: A
hashtags: [マルコフ連鎖, 到達時間, 再帰式]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: マルコフ連鎖 }]
---
## 問題
状態0は吸収。状態1から確率 $1/2$ で0、確率 $1/2$ で1へ移る。0までの平均到達時間 $m_1$ を求めよ。
## 記号・用語
$p_{ij}=P(X_{n+1}=j\mid X_n=i)$ は1段階遷移確率、$P=(p_{ij})$ は遷移行列である。$P_{ij}^{(n)}$ は $n$ 段階遷移確率を表す。
## 使用公式・定理
目標状態で $m_0=0$、それ以外では $m_i=1+\sum_jp_{ij}m_j$。
## 一手／方針
目標状態では0と置き、非目標状態では最初の1歩の時間1を足した再帰式を解く。
## 答え
$$m_1=1+\tfrac12m_0+\tfrac12m_1
\iff m_1=2.$$
## 計算例
幾何分布の成功確率 $1/2$ の平均とも一致する。
## 注意
右辺の1は現在からの1ステップである。

<!-- CARD -->

---
id: stoch-random-walk-mean-variance
title: 単純ランダムウォークの平均と分散を求める
category: applied-common
subcategory: applied-stochastic-processes
topic: random-walk-moments
type: calc_step
difficulty: 2
priority: A
hashtags: [ランダムウォーク, 平均, 分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ランダムウォーク }]
---
## 問題
$S_n=\sum_{i=1}^n\xi_i$、$P(\xi_i=1)=p$、$P(\xi_i=-1)=1-p$。$E[S_n]$ と $\operatorname{Var}(S_n)$ を求めよ。
## 記号・用語
$S_n=\sum_{k=1}^n\xi_k$ はランダムウォーク、$\xi_k$ は互いに独立で同じ分布に従う増分である。$\mathcal F_n$ は時刻 $n$ までの情報を表す。
## 使用公式・定理
独立な和では平均と分散を加える。
## 一手／方針
位置を独立同分布な増分の和に展開し、期待値は足し、分散は独立性により足す。
## 答え
$E[\xi_i]=2p-1$、$\operatorname{Var}(\xi_i)=4p(1-p)$ より
$$E[S_n]=n(2p-1),\qquad\operatorname{Var}(S_n)=4np(1-p).$$
## 計算例
$p=1/2$ なら平均0、分散 $n$。
## 注意
$E[\xi_i^2]=1$ を使うと分散を速く計算できる。

<!-- CARD -->

---
id: stoch-gambler-ruin
title: 吸収ランダムウォークの到達確率を偏りあり・対称で解く
category: applied-common
subcategory: applied-stochastic-processes
topic: gambler-ruin-canonical
type: strategy
difficulty: 4
priority: A
hashtags:
  - ランダムウォーク
  - 破産問題
  - 吸収確率
  - 差分方程式
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ランダムウォーク
---
## 問題
状態 $0,1,\ldots,N$ 上のランダムウォークを考える。$0$ と $N$ は吸収状態で、内部状態では確率 $p$ で $+1$、確率 $q=1-p$ で $-1$ 進む。状態 $i$ から出発して、0より先に $N$ へ到達する確率を $h_i$ とする。
1. $p\ne q$ のとき $h_i$ を差分方程式から導け。
2. 対称な場合 $p=q=1/2$ の $h_i$ を導け。
3. $N=5,i=2,p=0.6,q=0.4$ のとき数値を求めよ。

## 記号・用語
$T_j$ を状態 $j$ への初到達時刻とすると
$$
h_i=P_i(T_N<T_0)
$$
である。これは上側境界 $N$ への吸収確率であり、下側境界0へ先に到達する確率は $1-h_i$ である。

## 使用公式・定理
最初の1歩で条件付けると、$1\le i\le N-1$ で
$$
h_i=ph_{i+1}+qh_{i-1},
$$
境界条件は
$$
h_0=0,\qquad h_N=1
$$
である。

$p\ne q$ のとき、差分
$$
d_i=h_i-h_{i-1}
$$
を置くと
$$
p(h_{i+1}-h_i)=q(h_i-h_{i-1}),
$$
したがって
$$
d_{i+1}=\frac qp d_i.
$$
よって差分は等比数列になる。

## 一手／方針
**完成公式を暗記するのではなく、「最初の1歩で条件付ける→隣接差分 $d_i$ を置く→等比数列を足し上げる→2つの境界条件で定数を決める」と進める。** 対称な場合だけは比 $q/p=1$ となるため別に扱い、差分が一定であることから一次式を得る。

## 答え
1. $p\ne q$ とする。$r=q/p$ とおけば
$$
d_i=d_1r^{i-1}.
$$
$h_0=0$ より
$$
h_i=\sum_{j=1}^i d_j
=d_1\frac{1-r^i}{1-r}.
$$
さらに $h_N=1$ だから
$$
1=d_1\frac{1-r^N}{1-r}.
$$
したがって
$$
\boxed{
h_i=\frac{1-(q/p)^i}{1-(q/p)^N}
}.
$$

2. $p=q=1/2$ では
$$
h_i=\frac{h_{i+1}+h_{i-1}}2
$$
なので
$$
h_{i+1}-h_i=h_i-h_{i-1}.
$$
差分が一定で $h_i$ は $i$ の一次式になる。$h_0=0,h_N=1$ より
$$
\boxed{h_i=\frac{i}{N}}.
$$

3. $q/p=(0.4)/(0.6)=2/3$ なので
$$
h_2
=\frac{1-(2/3)^2}{1-(2/3)^5}
=\frac{5/9}{211/243}
=\frac{135}{211}
\approx0.640.
$$

## 計算例
同じ $N=5,i=2$ でも対称ランダムウォークなら
$$
h_2=\frac25=0.4.
$$
$p=0.6>q=0.4$ では上向きのドリフトがあるため、上側到達確率は約0.640へ増える。逆に $p<q$ なら上側到達確率は対称時より小さくなる。

## 注意
$p\ne q$ 用の式へ $p=q$ を直接代入すると分子・分母がともに0になるので使えない。対称の場合は差分方程式を直接解くか、極限として $i/N$ を得る。また「0へ先に到達する破産確率」を問われた場合は、上側到達確率と取り違えず $1-h_i$ を答える。境界が0と$N$以外なら、状態を平行移動して同じ考え方を使う。

<!-- CARD -->

---
id: stoch-random-walk-martingale
title: 対称ランダムウォークのマルチンゲール性を示す
category: applied-common
subcategory: applied-stochastic-processes
topic: random-walk-martingale
type: proof_step
difficulty: 3
priority: B
hashtags: [ランダムウォーク, マルチンゲール, 条件付き期待値]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ランダムウォーク }]
---
## 問題
対称ランダムウォーク $S_n=S_{n-1}+\xi_n$ がマルチンゲールであることを示せ。
## 記号・用語
- $\mathcal F_{n-1}$：時点 $n-1$ までの情報
## 使用公式・定理
$E[\xi_n]=0$ かつ $\xi_n$ は過去と独立。
## 一手／方針
次時点の位置を現在位置と新増分に分け、現在までの情報で条件付き期待値を取る。
## 答え
$$E[S_n\mid\mathcal F_{n-1}]
=S_{n-1}+E[\xi_n\mid\mathcal F_{n-1}]
=S_{n-1}.$$
## 計算例
$E[S_n]=E[S_0]$ も従う。
## 注意
偏り $p\ne1/2$ では $S_n$ 自身はマルチンゲールでない。

<!-- CARD -->

---
id: stoch-poisson-increments
title: ポアソン過程の増分分布を書く
category: applied-common
subcategory: applied-stochastic-processes
topic: poisson-increments
type: formula
difficulty: 2
priority: A
hashtags: [ポアソン過程, 独立増分, 定常増分]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ポアソン過程 }]
---
## 問題
率 $\lambda$ のポアソン過程 $\{N(t)\}$ の増分分布を述べよ。ここで $N(t)$ は計数過程であり、正規分布の記号ではない。
## 記号・用語
$N(t)$ は時刻 $t$ までの到着数を表す計数過程、$\lambda>0$ は単位時間当たりの到着率である。$T_k$ は第 $k$ 到着時刻である。
## 使用公式・定理
長さだけに依存する定常増分と、重ならない区間の独立増分を持つ。
## 一手／方針
対象区間の長さを求め、定常増分で分布を決め、区間が重ならない場合だけ独立増分を使う。
## 答え
$0\le s<t$ について
$$N(t)-N(s)\sim\operatorname{Poisson}\{\lambda(t-s)\}.$$
## 計算例
$\lambda=2,s=1,t=3$ なら平均4のポアソン分布。
## 注意
$N(t)$ の値ではなく区間内の到着数である。

<!-- CARD -->

---
id: stoch-poisson-count-numeric
title: 区間内のポアソン到着確率を計算する
category: applied-common
subcategory: applied-stochastic-processes
topic: poisson-count-probability
type: calc_step
difficulty: 2
priority: A
hashtags: [ポアソン過程, ポアソン分布, 数値計算]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ポアソン過程 }]
---
## 問題
率3/時のポアソン過程で、2時間にちょうど4件起こる確率を求めよ。
## 記号・用語
$N(t)$ は時刻 $t$ までの到着数を表す計数過程、$\lambda>0$ は単位時間当たりの到着率である。$T_k$ は第 $k$ 到着時刻である。
## 使用公式・定理
$N(t)\sim\operatorname{Poisson}(\lambda t)$。
## 一手／方針
到着率に区間長を掛けてポアソン分布の平均を定め、確率質量関数へ件数を代入する。
## 答え
平均は $3\times2=6$ なので
$$P\{N(2)=4\}=e^{-6}\frac{6^4}{4!}\approx0.1339.$$
## 計算例
$6^4/4!=54$ を先に計算する。
## 注意
率と時間を掛けて無次元の平均にする。

<!-- CARD -->

---
id: stoch-poisson-arrival-gamma
title: 第k到着時刻の分布を求める
category: applied-common
subcategory: applied-stochastic-processes
topic: poisson-arrival-time
type: formula
difficulty: 3
priority: A
hashtags: [ポアソン過程, 到着時刻, ガンマ分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ポアソン過程 }]
---
## 問題
率 $\lambda$ のポアソン過程の第 $k$ 到着時刻 $T_k$ の分布を述べよ。
## 記号・用語
$N(t)$ は時刻 $t$ までの到着数を表す計数過程、$\lambda>0$ は単位時間当たりの到着率である。$T_k$ は第 $k$ 到着時刻である。
## 使用公式・定理
到着間隔は独立な指数分布 $\operatorname{Exp}(\lambda)$。
## 一手／方針
第k到着時刻をk個の独立な指数待ち時間の和と見て、ガンマ分布の形状母数を決める。
## 答え
$$T_k=\sum_{i=1}^kW_i\sim\operatorname{Gamma}(k,\lambda)$$
（shape–rate）で、$E[T_k]=k/\lambda$。
## 計算例
$k=3,\lambda=2$ なら平均到着時刻は1.5。
## 注意
第 $k$ 到着までの「時間」であり件数ではない。

<!-- CARD -->

---
id: stoch-poisson-thinning
title: ポアソン過程の間引き率を求める
category: applied-common
subcategory: applied-stochastic-processes
topic: poisson-thinning
type: calc_step
difficulty: 3
priority: A
hashtags: [ポアソン過程, 間引き, 独立性]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ポアソン過程 }]
---
## 問題
率 $\lambda=10$ の各到着を独立に確率0.3で採用する。採用・不採用過程の率を求めよ。
## 記号・用語
$N(t)$ は時刻 $t$ までの到着数を表す計数過程、$\lambda>0$ は単位時間当たりの到着率である。$T_k$ は第 $k$ 到着時刻である。
## 使用公式・定理
独立な確率 $p$ の間引きで率は $p\lambda$ と $(1-p)\lambda$ になる。
## 一手／方針
各到着を独立に分類し、元の到着率へ各分類確率を掛ける。
## 答え
採用過程の率は3、不採用過程の率は7で、両過程は独立である。
## 計算例
1時間の期待件数もそれぞれ3件と7件。
## 注意
採用確率が時刻や履歴に依存しないことを要する。

<!-- CARD -->

---
id: stoch-poisson-superposition
title: 独立ポアソン過程を重ね合わせる
category: applied-common
subcategory: applied-stochastic-processes
topic: poisson-superposition
type: calc_step
difficulty: 2
priority: A
hashtags: [ポアソン過程, 重ね合わせ, 到着率]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ポアソン過程 }]
---
## 問題
率2と率5の独立なポアソン過程を重ねた過程の分布を求めよ。
## 記号・用語
$N(t)$ は時刻 $t$ までの到着数を表す計数過程、$\lambda>0$ は単位時間当たりの到着率である。$T_k$ は第 $k$ 到着時刻である。
## 使用公式・定理
独立ポアソン過程の和は率の和を持つポアソン過程。
## 一手／方針
独立な計数過程の区間内件数を足し、独立なポアソン分布の再生性で到着率を加える。
## 答え
重ね合わせは率 $2+5=7$ のポアソン過程である。
## 計算例
時間 $t$ の件数は $\operatorname{Poisson}(7t)$。
## 注意
元の過程間の独立性が必要。

<!-- CARD -->

---
id: stoch-poisson-conditional-binomial
title: 総到着数を条件に部分区間の件数を求める
category: applied-common
subcategory: applied-stochastic-processes
topic: poisson-conditional-count
type: calc_step
difficulty: 3
priority: A
hashtags: [ポアソン過程, 条件付き分布, 二項分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ポアソン過程 }]
---
## 問題
ポアソン過程で $N(2)=6$ の下に $N(1)=2$ となる条件付き確率を求めよ。ここで $N(t)$ は計数過程であり、正規分布の記号ではない。
## 記号・用語
$N(t)$ は時刻 $t$ までの到着数を表す計数過程、$\lambda>0$ は単位時間当たりの到着率である。$T_k$ は第 $k$ 到着時刻である。
## 使用公式・定理
$N(t)=n$ を条件とすると、各到着時刻は区間内で一様で、$N(s)\mid N(t)=n\sim\operatorname{Binomial}(n,s/t)$。
## 一手／方針
総到着数を固定すると各到着点が部分区間へ入る確率は区間長比になるため、二項分布へ直す。
## 答え
$$P\{N(1)=2\mid N(2)=6\}
=\binom62(1/2)^6=\frac{15}{64}.$$
## 計算例
率 $\lambda$ は条件付けにより消える。
## 注意
無条件ではポアソン分布である。
$N(t)=n$ の条件下で、順序を無視した $n$ 個の到着点は独立な一様分布と同じであり、順序付き到着時刻はその順序統計量である。

<!-- CARD -->

---
id: stoch-compound-poisson-moments
title: 複合ポアソン和の平均と分散を求める
category: applied-common
subcategory: applied-stochastic-processes
topic: compound-poisson
type: calc_step
difficulty: 4
priority: B
hashtags: [ポアソン過程, 複合ポアソン分布, 全分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ポアソン過程 }]
---
## 問題
$S=\sum_{i=1}^NY_i$、$N\sim\operatorname{Poisson}(\lambda)$、$Y_i$ は独立同分布で平均 $\mu$、分散 $\sigma^2$。$E[S]$ と $\operatorname{Var}(S)$ を求めよ。
## 記号・用語
$N\sim\operatorname{Poisson}(\lambda)$ とする。$Y_1,Y_2,\ldots$ は互いに独立で同じ分布に従い、$N$ とも独立で、$E[Y_i]=\mu$、$\operatorname{Var}(Y_i)=\sigma^2$ とする。$S=\sum_{i=1}^NY_i$ である。
## 使用公式・定理
全期待値と全分散を $N$ で条件付けして使う。
## 一手／方針
まず到着数で条件付け、条件付き平均と条件付き分散を求めてから全期待値・全分散を適用する。
## 答え
条件付き平均は $E[S\mid N]=N\mu$ だから $$E[S]=E[N\mu]=\lambda\mu.$$ また、全分散の公式により $$\operatorname{Var}(S)=E[N\sigma^2]+\operatorname{Var}(N\mu)=\lambda\sigma^2+\lambda\mu^2=\lambda E[Y_1^2].$$
## 計算例
$E[S\mid N]=N\mu$、$\operatorname{Var}(S\mid N)=N\sigma^2$。
## 注意
分散は $\lambda\sigma^2$ だけではない。

<!-- CARD -->

---
id: stoch-brownian-definition
title: 標準ブラウン運動の定義を述べる
category: applied-common
subcategory: applied-stochastic-processes
topic: brownian-motion-definition
type: formula
difficulty: 3
priority: A
hashtags: [ブラウン運動, 独立増分, 正規分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ブラウン運動 }]
---
## 問題
正規分布を用いて、標準ブラウン運動 $\{B(t)\}_{t\ge0}$ の定義を述べよ。
## 記号・用語
$B(t)$ は標準ブラウン運動、$0\le s<t$ では増分 $B(t)-B(s)$ が平均0、分散 $t-s$ の正規分布に従う。
## 使用公式・定理
初期値、増分分布、独立増分、標本路の連続性を指定する。
## 一手／方針
初期値、正規増分、独立増分、標本路連続性の4条件を漏れなく列挙する。
## 答え
$B(0)=0$、$B(t)-B(s)\sim N(0,t-s)$（$s<t$）、重ならない区間の増分は独立、かつ標本路は確率1で連続である。
## 計算例
$B(3)-B(1)\sim N(0,2)$。
## 注意
独立なのは値 $B(s),B(t)$ ではなく重ならない増分。

<!-- CARD -->

---
id: stoch-brownian-increment-probability
title: ブラウン運動の増分確率を計算する
category: applied-common
subcategory: applied-stochastic-processes
topic: brownian-increment
type: calc_step
difficulty: 2
priority: A
hashtags: [ブラウン運動, 正規分布, 標準化]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ブラウン運動 }]
---
## 問題
標準ブラウン運動の増分が従う正規分布を用いて、$P\{B(3)-B(1)>2\}$ を求めよ。
## 記号・用語
- $\Phi$：標準正規分布の累積分布関数
## 使用公式・定理
$B(3)-B(1)\sim N(0,2)$。
## 一手／方針
増分の区間長から分散を求め、標準偏差で割って標準正規分布へ変換する。
## 答え
$$P\{B(3)-B(1)>2\}
=1-\Phi(2/\sqrt2)=1-\Phi(\sqrt2)\approx0.0787.$$
## 計算例
標準偏差は時間差でなく $\sqrt2$。
## 注意
分散が時間差に等しい。

<!-- CARD -->

---
id: stoch-brownian-covariance
title: ブラウン運動の共分散を導く
category: applied-common
subcategory: applied-stochastic-processes
topic: brownian-covariance
type: proof_step
difficulty: 3
priority: A
hashtags: [ブラウン運動, 共分散, 独立増分]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ブラウン運動 }]
---
## 問題
$0\le s\le t$ のとき $\operatorname{Cov}\{B(s),B(t)\}$ を求めよ。
## 記号・用語
$B(t)$ は標準ブラウン運動、$0\le s<t$ では増分 $B(t)-B(s)$ が平均0、分散 $t-s$ の正規分布に従う。
## 使用公式・定理
$B(t)=B(s)+\{B(t)-B(s)\}$ で、増分は $B(s)$ と独立。
## 一手／方針
遅い時点までの値とその後の独立増分に分解し、独立部分との共分散を0にする。
## 答え
$$\operatorname{Cov}\{B(s),B(t)\}
=\operatorname{Var}\{B(s)\}=s.$$
一般に $\operatorname{Cov}\{B(s),B(t)\}=\min(s,t)$。
## 計算例
$\operatorname{Cov}\{B(2),B(5)\}=2$。
## 注意
相関係数は共分散を標準偏差で割る必要がある。

<!-- CARD -->

---
id: stoch-brownian-scaling
title: ブラウン運動のスケーリング性を使う
category: applied-common
subcategory: applied-stochastic-processes
topic: brownian-scaling
type: formula
difficulty: 3
priority: B
hashtags: [ブラウン運動, スケーリング, 分布同値]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ブラウン運動 }]
---
## 問題
$c>0$ に対し $\{B(ct)\}$ を標準ブラウン運動で表せ。
## 記号・用語
$B(t)$ は標準ブラウン運動、$0\le s<t$ では増分 $B(t)-B(s)$ が平均0、分散 $t-s$ の正規分布に従う。
## 使用公式・定理
時間を $c$ 倍すると増分分散も $c$ 倍になる。
## 一手／方針
変換後過程の有限次元分布を調べ、平均0と共分散が標準ブラウン運動と一致することを示す。
## 答え
過程として
$$\{B(ct)\}_{t\ge0}\overset{d}=
\{\sqrt c\,B(t)\}_{t\ge0}.$$
## 計算例
$B(4)\overset d=2B(1)$。
## 注意
同じ標本路上の等式ではなく有限次元分布の一致。

<!-- CARD -->

---
id: stoch-brownian-drift
title: ドリフト付きブラウン運動の分布を求める
category: applied-common
subcategory: applied-stochastic-processes
topic: brownian-drift
type: calc_step
difficulty: 2
priority: B
hashtags: [ブラウン運動, ドリフト, 正規分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ブラウン運動 }]
---
## 問題
正規分布を用いて、$X(t)=\mu t+\sigma B(t)$ の平均、分散、分布を求めよ。
## 記号・用語
$B(t)$ は標準ブラウン運動、$0\le s<t$ では増分 $B(t)-B(s)$ が平均0、分散 $t-s$ の正規分布に従う。
## 使用公式・定理
$B(t)\sim N(0,t)$ と正規分布の線形変換を使う。
## 一手／方針
ブラウン運動の正規分布へ線形変換を適用し、平均と分散を別々に変換する。
## 答え
$$E[X(t)]=\mu t,\quad\operatorname{Var}\{X(t)\}=\sigma^2t,$$
$$X(t)\sim N(\mu t,\sigma^2t).$$
## 計算例
$\mu=1,\sigma=2,t=3$ なら $N(3,12)$。
## 注意
第2母数は標準偏差でなく分散。

<!-- CARD -->

---
id: stoch-geometric-brownian-solution
title: 幾何ブラウン運動の解を再生する
category: applied-common
subcategory: applied-stochastic-processes
topic: geometric-brownian-motion
type: formula
difficulty: 4
priority: C
hashtags: [ブラウン運動, 幾何ブラウン運動, 伊藤補正]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ブラウン運動 }]
---
## 問題
$dX_t=\mu X_tdt+\sigma X_tdB_t$、$X_0>0$ の解を書け。
## 記号・用語
$B(t)$ は標準ブラウン運動、$0\le s<t$ では増分 $B(t)-B(s)$ が平均0、分散 $t-s$ の正規分布に従う。
## 使用公式・定理
伊藤の公式を $\log X_t$ に使うと $d\log X_t=(\mu-\sigma^2/2)dt+\sigma dB_t$。
## 一手／方針
伊藤公式を対数関数へ適用して確率微分方程式を加法形にし、両辺を時間積分して指数を取る。
## 答え
$$X_t=X_0\exp\{(\mu-\sigma^2/2)t+\sigma B_t\}.$$
## 計算例
$E[X_t]=X_0e^{\mu t}$。
## 注意
指数内の伊藤補正 $-\sigma^2t/2$ を落とさない。
