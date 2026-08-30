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
title: 残差診断出力からモデル妥当性を判定する
category: applied-common
subcategory: applied-time-series
topic: software-residual-diagnostics
type: calc_step
difficulty: 3
priority: A
hashtags: [残差診断, Ljung-Box検定, ソフトウェア出力]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ソフトウェアの出力結果の解釈 }]
---
## 問題
推定後のLjung--Box検定出力が「$Q(12)=24.8$、$p=0.016$」であった。残差の白色性とモデルの妥当性を判定せよ。
## 記号・用語
$Q(12)$ はラグ12までの残差自己相関をまとめた統計量、$p$ は「残差が無相関」という帰無仮説のP値である。
## 使用公式・定理
**判定規則**：有意水準 $\alpha$ で $p<\alpha$ なら、残差が無相関という帰無仮説を棄却する。
## 一手／方針
P値を有意水準と比較し、棄却結果を残差診断の言葉へ戻す。
## 答え
$0.016<0.05$ なので、5%水準で残差の白色性を棄却する。モデルが時系列依存を取り切れていない可能性がある。
## 計算例
ARまたはMA次数の見直し、季節項の追加、外れ値の確認が次の候補となる。
## 注意
「棄却しない」は残差が完全に独立で正規分布に従うことまで保証しない。

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
title: ARIMAモデルを差分演算子で書く
category: applied-common
subcategory: applied-time-series
topic: arima-definition
type: formula
difficulty: 2
priority: A
hashtags: [ARIMAモデル, 差分, バックシフト]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ARIMAモデル }]
---
## 問題
ARIMA$(p,d,q)$ モデルをバックシフト演算子で定義せよ。
## 記号・用語
$BX_t=X_{t-1}$、$\phi(B)=1-\phi_1B-\cdots-\phi_pB^p$、$\theta(B)=1+\theta_1B+\cdots+\theta_qB^q$ とする。$\varepsilon_t$ はホワイトノイズである。
## 使用公式・定理
**定義（ARIMAモデル）**：
$$\phi(B)(1-B)^dX_t=\theta(B)\varepsilon_t.$$
## 一手／方針
$d$ 回差分した $Y_t=(1-B)^dX_t$ が ARMA$(p,q)$ に従うと読む。
## 答え
ARIMA$(p,d,q)$ は、$d$ 回差分後に ARMA$(p,q)$ となるモデルである。
## 計算例
ARIMA$(1,1,0)$ は
$$X_t-X_{t-1}=\phi(X_{t-1}-X_{t-2})+\varepsilon_t$$
と展開できる。
## 注意
定常性は水準系列ではなく、差分系列に対して考える。

<!-- CARD -->

---
id: ts-difference-random-walk
title: ランダムウォークの非定常性を示して差分で定常化する
category: applied-common
subcategory: applied-time-series
topic: random-walk-differencing
type: calc_step
difficulty: 2
priority: A
hashtags:
  - ARIMAモデル
  - ランダムウォーク
  - 非定常
  - 差分
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 差分・ARIMAモデル
---
## 問題
$$
X_t=X_{t-1}+\varepsilon_t,
\qquad X_0=0,
$$
$$
E[\varepsilon_t]=0,
\qquad \operatorname{Var}(\varepsilon_t)=\sigma^2
$$
で、革新が互いに無相関とする。

1. $X_t$ が弱定常でないことを示せ。
2. 一階差分 $\Delta X_t$ が定常になることを示せ。

## 記号・用語
$\nabla X_t=(1-B)X_t=X_t-X_{t-1}$ は1階差分である。
## 使用公式・定理
再帰式を展開すると
$$
X_t=\sum_{j=1}^{t}\varepsilon_j.
$$
したがって無相関な革新の分散加法性より
$$
\operatorname{Var}(X_t)=t\sigma^2.
$$
一階差分は
$$
\Delta X_t=X_t-X_{t-1}=\varepsilon_t.
$$

## 一手／方針
水準系列は革新を累積しているので分散が時間とともに増える。一方、隣接時点を引くと累積が打ち消され、革新そのものへ戻ることを見る。

## 答え
$$
\operatorname{Var}(X_t)=t\sigma^2
$$
が $t$ に依存するため $X_t$ は弱定常でない。

しかし
$$
\Delta X_t=\varepsilon_t
$$
なので、革新がホワイトノイズなら一階差分系列は弱定常である。したがってランダムウォークは典型的な $I(1)$ 過程である。

## 計算例
$\sigma^2=2$ なら
$$
\operatorname{Var}(X_1)=2,
\quad \operatorname{Var}(X_5)=10,
\quad \operatorname{Var}(X_{20})=40,
$$
と水準系列の分散は増え続ける。

一方
$$
\operatorname{Var}(\Delta X_t)=\operatorname{Var}(\varepsilon_t)=2
$$
は時点に依存しない。

## 注意
平均が一定でも分散や自己共分散が時点に依存すれば弱定常ではない。差分を取り過ぎると別の依存構造を作るので、必要次数だけ差分する。

<!-- CARD -->

---
id: ts-seasonal-difference
title: 季節差分を計算する
category: applied-common
subcategory: applied-time-series
topic: seasonal-difference
type: calc_step
difficulty: 2
priority: B
hashtags: [季節性, 季節差分]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: トレンド・季節性 }]
---
## 問題
周期12の季節性をもつ系列で、$X_{25}=130$、$X_{13}=118$ のとき季節差分を求めよ。
## 記号・用語
$B^{12}X_t=X_{t-12}$、$\nabla_{12}=1-B^{12}$ とする。
## 使用公式・定理
**季節差分**：
$$\nabla_sX_t=(1-B^s)X_t=X_t-X_{t-s}.$$
## 一手／方針
同じ季節どうしを引き、繰り返す季節成分を除く。
## 答え
$$\nabla_{12}X_{25}=X_{25}-X_{13}=130-118=12.$$
## 計算例
周期4の四半期系列なら $\nabla_4X_t=X_t-X_{t-4}$ を使う。
## 注意
通常差分 $X_t-X_{t-1}$ と季節差分 $X_t-X_{t-s}$ は目的が異なる。

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
title: 標本自己相関を計算する
category: applied-common
subcategory: applied-time-series
topic: sample-acf
type: calc_step
difficulty: 2
priority: A
hashtags: [自己相関関数, 標本自己相関]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 自己相関関数 }]
---
## 問題
データ $(1,2,3,2)$ のラグ1標本自己相関を計算せよ。
## 記号・用語
$\bar x=n^{-1}\sum_{t=1}^n x_t$ とする。
## 使用公式・定理
**標本自己相関**：
$$\widehat\rho_k=\frac{\sum_{t=k+1}^n(x_t-\bar x)(x_{t-k}-\bar x)}{\sum_{t=1}^n(x_t-\bar x)^2}.$$
## 一手／方針
平均を引き、分子では1時点ずらした偏差の積を足す。
## 答え
ラグ1標本自己相関は
$$
\widehat\rho_1=0.
$$

## 計算例
まず標本平均は
$$
\bar x=\frac{1+2+3+2}{4}=2.
$$
したがって偏差列は
$$
(x_t-\bar x)=(-1,0,1,0).
$$
ラグ1の分子は、1時点ずらした偏差の積を足して
$$
\begin{aligned}
\sum_{t=2}^4(x_t-\bar x)(x_{t-1}-\bar x)
&=0(-1)+1(0)+0(1)\\
&=0.
\end{aligned}
$$
分母は
$$
\begin{aligned}
\sum_{t=1}^4(x_t-\bar x)^2
&=(-1)^2+0^2+1^2+0^2\\
&=2.
\end{aligned}
$$
よって
$$
\widehat\rho_1=\frac02=0.
$$

## 注意
標本自己共分散の分母規約は複数あるので、問題で与えられた定義に従う。

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
title: AR(1)のスペクトル密度を導く
category: applied-common
subcategory: applied-time-series
topic: spectral-density
type: calc_step
difficulty: 3
priority: B
hashtags: [スペクトル密度, ARモデル]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: スペクトル密度 }]
---
## 問題
$X_t=\phi X_{t-1}+\varepsilon_t$、$|\phi|<1$、$\operatorname{Var}(\varepsilon_t)=\sigma^2$ のスペクトル密度を求めよ。
## 記号・用語
$\lambda\in[-\pi,\pi]$ は角周波数、$f(\lambda)$ はスペクトル密度である。
## 使用公式・定理
**線形フィルタ公式**：$X_t=\psi(B)\varepsilon_t$ なら
$$f_X(\lambda)=\frac{\sigma^2}{2\pi}|\psi(e^{-i\lambda})|^2.$$
## 一手／方針
AR$(1)$ では $\psi(B)=(1-\phi B)^{-1}$ として代入する。
## 答え
AR$(1)$ のスペクトル密度は
$$
f_X(\lambda)
=\frac{\sigma^2}
{2\pi\{1+\phi^2-2\phi\cos\lambda\}}.
$$

## 計算例
AR$(1)$ を
$$
(1-\phi B)X_t=\varepsilon_t
$$
と書けば
$$
X_t=(1-\phi B)^{-1}\varepsilon_t
$$
なので、線形フィルタは
$$
\psi(z)=\frac1{1-\phi z}.
$$
よって
$$
\left|\psi(e^{-i\lambda})\right|^2
=\frac1{|1-\phi e^{-i\lambda}|^2}.
$$
分母を計算すると
$$
\begin{aligned}
|1-\phi e^{-i\lambda}|^2
&=(1-\phi e^{-i\lambda})(1-\phi e^{i\lambda})\\
&=1-\phi(e^{i\lambda}+e^{-i\lambda})+\phi^2\\
&=1-2\phi\cos\lambda+\phi^2.
\end{aligned}
$$
したがって線形フィルタ公式から
$$
f_X(\lambda)
=\frac{\sigma^2}
{2\pi\{1+\phi^2-2\phi\cos\lambda\}}.
$$
例えば $\phi=0.5$, $\sigma^2=1$, $\lambda=0$ なら
$$
\begin{aligned}
f_X(0)
&=\frac1{2\pi(1+0.25-1)}\\
&=\frac1{2\pi(0.25)}\\
&=\frac2\pi.
\end{aligned}
$$

## 注意
$1/(2\pi)$ を含める正規化規約を用いた。

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
title: 弱定常性と強定常性を区別する
category: applied-common
subcategory: applied-time-series
topic: stationarity
type: recognition
difficulty: 2
priority: A
hashtags: [ARIMAモデル, 弱定常, 強定常]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ARIMAモデル }]
---
## 問題
弱定常性と強定常性の定義を述べよ。
## 記号・用語
- $\gamma(h)$：ラグ $h$ の自己共分散
## 使用公式・定理
弱定常は2次まで、強定常はすべての有限次元分布の時間移動不変性を問う。
## 一手／方針
強定常性は同時分布、弱定常性は平均と自己共分散だけを比較し、どちらまで確認できたかを分ける。
## 答え
弱定常は $E[X_t]=\mu$ が一定で $\operatorname{Cov}(X_t,X_{t+h})=\gamma(h)$ が $t$ に依存しないこと。強定常は任意の $k,h$ で $(X_{t_1},\ldots,X_{t_k})$ と $(X_{t_1+h},\ldots,X_{t_k+h})$ が同分布であること。
## 計算例
有限分散を持つ強定常過程は弱定常。
## 注意
弱定常から強定常は一般には従わない。

<!-- CARD -->

---
id: ts-autocovariance-properties
title: 自己共分散関数の性質を確認する
category: applied-common
subcategory: applied-time-series
topic: autocovariance
type: formula
difficulty: 2
priority: A
hashtags: [ARIMAモデル, 自己共分散, 定常性]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ARIMAモデル }]
---
## 問題
弱定常過程の自己共分散 $\gamma(h)$ の基本性質を述べよ。
## 記号・用語
$X_t$ は時刻 $t$ の観測、$\varepsilon_t$ は平均0で一定分散のホワイトノイズ、$B$ は $BX_t=X_{t-1}$ を満たすバックシフト演算子である。$\gamma(h)$ と $\rho(h)$ はラグ $h$ の自己共分散と自己相関である。
## 使用公式・定理
$\gamma(h)=\operatorname{Cov}(X_t,X_{t+h})$。
## 一手／方針
自己共分散の定義で時点を同じだけ平行移動し、定常性と共分散の対称性を順に使う。
## 答え
$$\gamma(0)=\operatorname{Var}(X_t)\ge0,\quad
\gamma(-h)=\gamma(h),\quad|\gamma(h)|\le\gamma(0).$$
## 計算例
自己相関は $\rho(h)=\gamma(h)/\gamma(0)$。
## 注意
任意の数列が自己共分散になるわけではなく非負定値性も要する。

<!-- CARD -->

---
id: ts-white-noise-identification
title: ホワイトノイズの平均と自己共分散を書く
category: applied-common
subcategory: applied-time-series
topic: white-noise
type: formula
difficulty: 1
priority: B
hashtags: [ARIMAモデル, ホワイトノイズ, 自己共分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ARIMAモデル }]
---
## 問題
弱ホワイトノイズ $\{\varepsilon_t\}$ を定義せよ。
## 記号・用語
$X_t$ は時刻 $t$ の観測、$\varepsilon_t$ は平均0で一定分散のホワイトノイズ、$B$ は $BX_t=X_{t-1}$ を満たすバックシフト演算子である。$\gamma(h)$ と $\rho(h)$ はラグ $h$ の自己共分散と自己相関である。
## 使用公式・定理
異時点で無相関で分散が一定の平均0過程。
## 一手／方針
平均一定、分散一定、異時点の共分散0の3条件をデータまたはモデルから一つずつ確認する。
## 答え
$$E[\varepsilon_t]=0,\qquad
\gamma_\varepsilon(h)=
\begin{cases}\sigma_\varepsilon^2&h=0,\\0&h\ne0.\end{cases}$$
## 計算例
ACFはラグ0だけ1で、他は0。
## 注意
弱ホワイトノイズは独立性や正規性を必ずしも仮定しない。

<!-- CARD -->

---
id: ts-ar1-acf
title: AR(1)の定常平均・分散・自己相関を導く
category: applied-common
subcategory: applied-time-series
topic: ar1-moments-acf
type: proof_step
difficulty: 3
priority: A
hashtags:
  - ARIMAモデル
  - AR1
  - 定常平均
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
切片付き定常AR(1)
$$
X_t=c+\phi X_{t-1}+\varepsilon_t,
\qquad |\phi|<1,
$$
$$
E[\varepsilon_t]=0,
\qquad \operatorname{Var}(\varepsilon_t)=\sigma_\varepsilon^2
$$
について、定常平均 $\mu$、定常分散 $\gamma(0)$、自己相関関数 $\rho(h)$ を導け。

## 記号・用語
$X_t$ は時刻 $t$ の観測、$\varepsilon_t$ は平均0で一定分散のホワイトノイズ、$B$ は $BX_t=X_{t-1}$ を満たすバックシフト演算子である。$\gamma(h)$ と $\rho(h)$ はラグ $h$ の自己共分散と自己相関である。
## 使用公式・定理
定常なら $E[X_t]=E[X_{t-1}]=\mu$ なので
$$
\mu=c+\phi\mu.
$$
中心化した $Y_t=X_t-\mu$ は
$$
Y_t=\phi Y_{t-1}+\varepsilon_t
$$
を満たす。

革新は過去と無相関なので
$$
\gamma(0)=\phi^2\gamma(0)+\sigma_\varepsilon^2,
$$
また $h\ge1$ では
$$
\gamma(h)=\phi\gamma(h-1).
$$

## 一手／方針
まず期待値を取って平均を求め、その平均を引いて中心化する。中心化後は同じAR(1)再帰から、ラグ0では分散、ラグ $h\ge1$ では共分散の再帰を作る。

## 答え
$$
\mu=\frac{c}{1-\phi},
$$
$$
\gamma(0)=\frac{\sigma_\varepsilon^2}{1-\phi^2},
$$
$$
\rho(h)=\phi^{|h|}.
$$

## 計算例
$c=1,\phi=0.8,\sigma_\varepsilon^2=4$ とする。まず
$$
\begin{aligned}
\mu
&=\frac{1}{1-0.8}\\
&=5.
\end{aligned}
$$
分散は
$$
\begin{aligned}
\gamma(0)
&=\frac{4}{1-0.8^2}\\
&=\frac{4}{0.36}\\
&=\frac{100}{9}\approx11.11.
\end{aligned}
$$
ラグ2の自己相関は
$$
\rho(2)=0.8^2=0.64.
$$
$\phi<0$ ならACFは符号を交互に変えながら幾何級数的に減衰する。

## 注意
切片 $c$ と定常平均 $\mu$ を混同しない。$|\phi|<1$ は通常の因果的定常AR(1)で必要である。

同じ期待値操作はARMAにも使える。例えば
$$
X_t=c+\phi X_{t-1}+\varepsilon_t+\theta\varepsilon_{t-1}
$$
で定常平均を $\mu$ とすると、革新の平均が0なので
$$
\begin{aligned}
\mu
&=c+\phi\mu+E[\varepsilon_t]+\theta E[\varepsilon_{t-1}]\\
&=c+\phi\mu,
\end{aligned}
$$
よって
$$
\mu=\frac{c}{1-\phi}.
$$
MA係数 $\theta$ は平均には現れないが、自己共分散や予測には影響する。

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
title: MA(q)のACF打切りを説明する
category: applied-common
subcategory: applied-time-series
topic: maq-acf
type: proof_step
difficulty: 3
priority: B
hashtags: [ARIMAモデル, MAモデル, 自己相関関数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ARIMAモデル }]
---
## 問題
MA($q$)過程のACFがラグ $q$ で打ち切られる理由を述べよ。
## 記号・用語
$X_t$ は時刻 $t$ の観測、$\varepsilon_t$ は平均0で一定分散のホワイトノイズ、$B$ は $BX_t=X_{t-1}$ を満たすバックシフト演算子である。$\gamma(h)$ と $\rho(h)$ はラグ $h$ の自己共分散と自己相関である。
## 使用公式・定理
$X_t=\sum_{j=0}^q\theta_j\varepsilon_{t-j}$ で革新は異時点で無相関。
## 一手／方針
2時点のMA表示に共通して現れる革新だけを拾い、ラグが次数を超えると共通項が消えることを示す。
## 答え
$|h|>q$ では $X_t$ と $X_{t-h}$ が共有する革新がないため
$$\gamma(h)=\rho(h)=0.$$
## 計算例
MA(1)ではラグ2以降のACFが0。
## 注意
標本ACFは有限標本誤差により厳密には0にならない。

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
title: 3状態連鎖の定常分布を解く
category: applied-common
subcategory: applied-stochastic-processes
topic: stationary-distribution
type: calc_step
difficulty: 3
priority: A
hashtags: [マルコフ連鎖, 定常分布, 連立方程式]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: マルコフ連鎖 }]
---
## 問題
$P=\begin{pmatrix}0&1&0\\0&0&1\\1/2&0&1/2\end{pmatrix}$ の定常分布を求めよ。
## 記号・用語
- $\boldsymbol\pi=(\pi_1,\pi_2,\pi_3)$：定常分布
## 使用公式・定理
$\boldsymbol\pi P=\boldsymbol\pi$、$\sum_i\pi_i=1$。
## 一手／方針
未知の定常確率を置き、定常方程式と確率の総和1を連立して解く。
## 答え
$\pi_2=\pi_1$、$\pi_3=2\pi_1$ より
$$\boldsymbol\pi=(1/4,1/4,1/2).$$
## 計算例
代入すると $\boldsymbol\pi P=(1/4,1/4,1/2)$。
## 注意
固有方程式だけでなく総和1も使う。

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
title: 対称ランダムウォークの破産確率を求める
category: applied-common
subcategory: applied-stochastic-processes
topic: gambler-ruin
type: calc_step
difficulty: 4
priority: A
hashtags: [ランダムウォーク, 破産問題, 吸収確率]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ランダムウォーク }]
---
## 問題
$0$ と $N$ で吸収される対称ランダムウォークが $i$ から出発する。$N$ へ先に到達する確率を求めよ。
## 記号・用語
$S_n=\sum_{k=1}^n\xi_k$ はランダムウォーク、$\xi_k$ は互いに独立で同じ分布に従う増分である。$\mathcal F_n$ は時刻 $n$ までの情報を表す。
## 使用公式・定理
$h_i=(h_{i-1}+h_{i+1})/2$、$h_0=0,h_N=1$。
## 一手／方針
次の1歩で条件付けて吸収確率の二階差分方程式を作り、2つの境界条件で定数を決める。
## 答え
差分方程式の解は一次式なので
$$h_i=\frac{i}{N}.$$
$h_i=(h_{i-1}+h_{i+1})/2$ を移項すると $h_{i+1}-h_i=h_i-h_{i-1}$。したがって差分は一定で $h_i=A+Bi$、境界条件 $h_0=0,h_N=1$ から $h_i=i/N$ となる。
## 計算例
$N=10,i=3$ なら確率は0.3。
## 注意
非対称歩行では一般に一次式にならない。

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
