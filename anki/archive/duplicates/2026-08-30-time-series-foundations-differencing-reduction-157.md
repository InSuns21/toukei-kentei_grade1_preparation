---
id: ts-autocovariance-properties
title: 自己共分散関数の性質を確認する
category: applied-common
subcategory: applied-time-series
topic: autocovariance
type: formula
difficulty: 2
priority: A
hashtags:
  - ARIMAモデル
  - 自己共分散
  - 定常性
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ARIMAモデル
archive_reason: duplicate
canonical_card: ts-weak-vs-strong-stationarity
archive_note: 自己共分散のgamma(0)>=0、対称性、|gamma(h)|<=gamma(0)、自己相関定義、非負定値性を弱定常性canonical
  cardへ統合済み。
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
hashtags:
  - ARIMAモデル
  - ホワイトノイズ
  - 自己共分散
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ARIMAモデル
archive_reason: duplicate
canonical_card: ts-weak-vs-strong-stationarity
archive_note: 弱ホワイトノイズの平均0・分散一定・異時点無相関、ACF、独立性を意味しない注意までcanonical cardへ統合済み。
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
archive_reason: duplicate
canonical_card: ts-arima-definition
archive_note: ランダムウォークを展開してVar(X_t)=t
  sigma^2から非定常性を示し、差分がホワイトノイズとなる導出、ARIMA(0,1,0)・I(1)の位置付けまでcanonical cardへ統合済み。
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
hashtags:
  - 季節性
  - 季節差分
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: トレンド・季節性
archive_reason: duplicate
canonical_card: ts-arima-definition
archive_note: 周期12の季節差分数値例と通常差分との目的の違いをARIMA差分canonical cardへ統合済み。
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
