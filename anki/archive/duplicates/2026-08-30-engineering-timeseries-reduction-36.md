---
id: engproc-ar1-intercept-long-run-mean
title: 切片付きAR(1)の長期平均を計算する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: ar1-mean
type: calc_step
difficulty: 2
priority: A
hashtags:
  - 自己回帰過程
  - ARモデル
  - 長期平均
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 自己回帰過程
archive_reason: duplicate
canonical_card: ts-ar1-acf
archive_note: 切片付きAR(1)の長期平均は、平均・分散・ACFを期待値と中心化から導く共通canonicalへ統合済み。
---
## 問題
$X_t=4+0.8X_{t-1}+\varepsilon_t$、$E[\varepsilon_t]=0$ の定常AR(1)過程の平均を求めよ。
## 記号・用語
$|0.8|<1$ なので定常解が存在する。
## 使用公式・定理
切片付きAR(1) $X_t=c+\phi X_{t-1}+\varepsilon_t$ の平均は $\mu=c/(1-\phi)$。
## 一手／方針
両辺の期待値を取り、定常平均を同じ記号で置いて解く。
## 答え
$$\mu=4+0.8\mu,$$
$$\mu=\frac4{1-0.8}=20.$$
## 計算例
平均中心化すると $X_t-20=0.8(X_{t-1}-20)+\varepsilon_t$。
## 注意
切片4をそのまま長期平均と読まない。

<!-- CARD -->

---
id: engproc-arma11-long-run-mean
title: 切片付きARMA(1,1)の長期平均を求める
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: arma11-mean
type: calc_step
difficulty: 2
priority: A
hashtags:
  - 時系列解析
  - ARMA過程
  - 長期平均
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 自己回帰過程
archive_reason: duplicate
canonical_card: ts-ar1-acf
archive_note: ARMA(1,1)の平均でMA項の期待値が0となる操作も共通canonicalの注意へ統合済み。
---
## 問題
$X_t=6+0.7X_{t-1}+\varepsilon_t+0.2\varepsilon_{t-1}$、$E[\varepsilon_t]=0$ とする。定常なときの長期平均を求めよ。
## 記号・用語
$\varepsilon_t$ は平均0の革新、長期平均 $\mu$ は定常時の $E[X_t]$ である。
## 使用公式・定理
$X_t=c+\phi X_{t-1}+\varepsilon_t+\theta\varepsilon_{t-1}$ では、$|\phi|<1$ のもとで $\mu=c/(1-\phi)$。
## 一手／方針
両辺の期待値を取り、革新項の期待値を0にする。
## 答え
$$\mu=6+0.7\mu+0+0,$$
$$\mu=\frac6{1-0.7}=20.$$
## 計算例
中心化系列 $Y_t=X_t-20$ は $Y_t=0.7Y_{t-1}+\varepsilon_t+0.2\varepsilon_{t-1}$ を満たす。
## 注意
MA係数 $0.2$ は自己共分散には影響するが、革新の平均が0なら長期平均には現れない。

<!-- CARD -->

---
id: engproc-ar1-forecast-mean-reversion
title: AR(1)の多段階予測で平均回帰を計算する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: ar1-forecast
type: calc_step
difficulty: 2
priority: A
hashtags:
  - 自己回帰過程
  - 予測
  - 平均回帰
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 自己回帰過程
archive_reason: duplicate
canonical_card: ts-ar1-hstep-forecast
archive_note: 平均からの偏差をphi^h倍する多期先予測は共通canonicalで導出・数値計算済み。
---
## 問題
平均20、AR係数0.5の定常AR(1)で現在値 $X_t=28$ のとき、2期先予測値を求めよ。
## 記号・用語
$\widehat X_{t+h\mid t}$ は時刻 $t$ までの情報による $h$ 期先予測である。
## 使用公式・定理
$\widehat X_{t+h\mid t}=\mu+\phi^h(X_t-\mu)$。
## 一手／方針
現在値の平均からの偏差を2期分減衰させる。
## 答え
$$\widehat X_{t+2\mid t}=20+0.5^2(28-20)=20+2=22.$$
## 計算例
1期先は24、長期先では20へ近づく。
## 注意
現在値28を単純に $0.5^2$ 倍せず、平均からの偏差を減衰させる。

<!-- CARD -->

---
id: engproc-ar1-forecast-interval
title: AR(1)の2期先予測区間を計算する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: ar1-forecast-interval
type: calc_step
difficulty: 3
priority: B
hashtags:
  - 自己回帰過程
  - 予測区間
  - 予測誤差
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 自己回帰過程
archive_reason: duplicate
canonical_card: ts-ar1-hstep-forecast
archive_note: 正規革新の下で予測誤差分散から95%予測区間を構成する手順まで共通canonicalへ吸収済み。
---
## 問題
AR(1)係数 $\phi=0.5$、革新分散 $\sigma_\varepsilon^2=4$、2期先点予測22のとき、正規革新を仮定した近似95%予測区間を求めよ。
## 記号・用語
2期先予測誤差は $\varepsilon_{t+2}+\phi\varepsilon_{t+1}$。
## 使用公式・定理
$V_2=\sigma_\varepsilon^2(1+\phi^2)$、予測区間は点予測 $\pm1.96\sqrt{V_2}$。
## 一手／方針
予測誤差分散を求め、標準偏差へ直して点予測に加減する。
## 答え
$$V_2=4(1+0.25)=5,$$
$$22\pm1.96\sqrt5\approx22\pm4.383,$$
よって約 $(17.62,26.38)$。
## 計算例
1期先誤差分散4より2期先の5が大きい。
## 注意
係数推定の不確実性は含めていない。

<!-- CARD -->

---
id: engproc-seasonal-difference-monthly
title: 月次系列の季節差分を計算する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: seasonal-differencing
type: calc_step
difficulty: 1
priority: B
hashtags:
  - 時系列解析
  - ARIMA過程
  - 季節差分
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ARIMA過程
archive_reason: duplicate
canonical_card: ts-seasonal-difference
archive_note: 月次12期差分は一般の季節差分 X_t-X_{t-s} の s=12 数値例にすぎず操作が同一。
---
## 問題
月次需要が2025年3月に120、2026年3月に138であった。周期12の季節差分を求めよ。
## 記号・用語
周期 $s$ の季節差分は $\Delta_sX_t=X_t-X_{t-s}$ である。月次系列では通常 $s=12$。
## 使用公式・定理
後退作用素では $\Delta_sX_t=(1-B^s)X_t$。
## 一手／方針
同じ月の1年前を対応させ、現在値から引く。
## 答え
$$\Delta_{12}X_t=138-120=18.$$
## 計算例
18は前年同月比の差であり、比率なら $(138/120-1)\times100=15\%$ と別計算になる。
## 注意
通常差分 $X_t-X_{t-1}$ と季節差分 $X_t-X_{t-12}$ を区別する。

<!-- CARD -->

---
id: engproc-acf-pacf-model-selection
title: ACFとPACFの切れ方からAR・MA候補を選ぶ
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: acf-pacf-identification
type: recognition
difficulty: 2
priority: A
hashtags:
  - 時系列解析
  - 自己相関
  - 偏自己相関
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 時系列解析
archive_reason: duplicate
canonical_card: ts-acf-pacf-identification
archive_note: ARではPACF打切り・MAではACF打切りという同一のモデル識別操作を共通canonicalが扱う。
---
## 問題
定常化後の系列で、ACFは徐々に減衰し、PACFはラグ2まで有意でラグ3以降はほぼ0であった。第一候補のモデルを答えよ。
## 記号・用語
ACFは自己相関関数、PACFは中間ラグの線形効果を除いた偏自己相関関数である。
## 使用公式・定理
純粋なAR($p$)ではPACFがラグ $p$ で打ち切られ、ACFは減衰する。純粋なMA($q$)ではACFがラグ $q$ で打ち切られる。
## 一手／方針
どちらの関数が有限ラグで切れているかを先に見る。
## 答え
PACFがラグ2で打ち切られているので、第一候補はAR(2)である。
## 計算例
逆にACFだけがラグ2で切れ、PACFが減衰するならMA(2)を候補にする。
## 注意
これは候補選択の経験則であり、残差診断や情報量規準による確認が必要である。

<!-- CARD -->

---
id: engproc-exponential-smoothing-update
title: 単純指数平滑法で逐次予測を更新する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: exponential-smoothing
type: calc_step
difficulty: 1
priority: B
hashtags:
  - 時系列解析
  - 指数平滑法
  - 予測
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 時系列解析
archive_reason: duplicate
canonical_card: ts-simple-exponential-smoothing
archive_note: 単純指数平滑の逐次更新式と数値計算は共通canonicalと同一操作。
---
## 問題
平滑化係数 $\alpha=0.3$、前期予測 $F_t=100$、実績 $X_t=110$ とする。次期予測 $F_{t+1}$ を求めよ。
## 記号・用語
$F_t$ は時点 $t$ の1期先予測として用いた水準、$\alpha$ は新しい実績へ置く重みである。
## 使用公式・定理
単純指数平滑法は
$$F_{t+1}=\alpha X_t+(1-\alpha)F_t=F_t+\alpha(X_t-F_t).$$
## 一手／方針
実績と前期予測の差に $\alpha$ を掛け、前期予測へ加える。
## 答え
$$F_{t+1}=100+0.3(110-100)=103.$$
## 計算例
次の実績が106なら $F_{t+2}=103+0.3(106-103)=103.9$。
## 注意
$\alpha$ が大きいほど直近の変化へ速く反応するが、予測も変動しやすい。

<!-- CARD -->

---
id: engproc-backshift-polynomial-expansion
title: 後退作用素の式を通常の時系列式へ展開する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: backshift-polynomial
type: calc_step
difficulty: 2
priority: B
hashtags:
  - 時系列解析
  - 後退作用素
  - ARMA過程
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ARIMA過程
archive_reason: duplicate
canonical_card: ts-arima-definition
archive_note: 後退作用素Bの定義とARIMA多項式表現を共通canonicalが扱い、このカードはその単純展開例。
---
## 問題
$(1-0.5B+0.2B^2)X_t=(1+0.3B)\varepsilon_t$ を通常の添字表示へ展開せよ。
## 記号・用語
$B$ は後退作用素で、$BX_t=X_{t-1}$、$B^2X_t=X_{t-2}$ と定義する。
## 使用公式・定理
多項式を各系列へ分配し、$B^kZ_t=Z_{t-k}$ を使う。
## 一手／方針
左辺と右辺を別々に展開してから、現在値 $X_t$ について解く。
## 答え
$$X_t-0.5X_{t-1}+0.2X_{t-2}=\varepsilon_t+0.3\varepsilon_{t-1},$$
したがって
$$X_t=0.5X_{t-1}-0.2X_{t-2}+\varepsilon_t+0.3\varepsilon_{t-1}.$$
## 計算例
$B^2X_t$ は $X_{t-2}$ であり、$(X_{t-1})^2$ ではない。
## 注意
AR多項式を右辺へ移すと各AR項の符号が変わる。
