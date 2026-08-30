---
id: engproc-ma1-autocovariance-numeric
title: MA(1)工程変動の自己共分散を数値計算する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: ma1-autocovariance
type: calc_step
difficulty: 2
priority: A
hashtags: [時系列解析, 移動平均過程, 自己共分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 移動平均過程 }]
---
## 問題
$X_t=\varepsilon_t+0.5\varepsilon_{t-1}$、$\operatorname{Var}(\varepsilon_t)=4$ とする。$\gamma(0),\gamma(1),\gamma(2)$ を求めよ。
## 記号・用語
$\gamma(h)=\operatorname{Cov}(X_t,X_{t-h})$ はラグ $h$ の自己共分散であり、革新 $\varepsilon_t$ は平均0で互いに無相関とする。
## 使用公式・定理
MA(1) $X_t=\varepsilon_t+\theta\varepsilon_{t-1}$ では
$$\gamma(0)=(1+\theta^2)\sigma_\varepsilon^2,\qquad \gamma(1)=\theta\sigma_\varepsilon^2,\qquad \gamma(h)=0\ (h\ge2).$$
## 一手／方針
同じ革新を共有する項だけが共分散に残る。
## 答え
$$\gamma(0)=(1+0.5^2)4=5,\qquad \gamma(1)=0.5\cdot4=2,\qquad \gamma(2)=0.$$
## 計算例
$\rho(1)=\gamma(1)/\gamma(0)=2/5=0.4$ である。
## 注意
MA(1)の自己共分散はラグ2以降で0になるが、有限標本の標本自己共分散は厳密に0とは限らない。

<!-- CARD -->

---
id: engproc-arma11-one-step-forecast
title: ARMA(1,1)の1期先予測を計算する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: arma11-forecast
type: calc_step
difficulty: 3
priority: A
hashtags: [時系列解析, ARMA過程, 予測]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 自己回帰過程 }]
---
## 問題
$X_t=2+0.6X_{t-1}+\varepsilon_t-0.3\varepsilon_{t-1}$ で、$X_t=10$、推定革新 $\widehat\varepsilon_t=1$ とする。$X_{t+1}$ の1期先予測値を求めよ。
## 記号・用語
$\widehat\varepsilon_t$ は時点 $t$ までの情報から復元した革新、$\widehat X_{t+1\mid t}$ は条件付き平均による予測値である。
## 使用公式・定理
未来の革新の条件付き期待値は0なので
$$\widehat X_{t+1\mid t}=c+\phi X_t+\theta\widehat\varepsilon_t$$
である。ここでは $\theta=-0.3$。
## 一手／方針
モデルを1期進め、未知の $\varepsilon_{t+1}$ だけを0で置き換える。
## 答え
$$\widehat X_{t+1\mid t}=2+0.6(10)-0.3(1)=7.7.$$
## 計算例
実測値が8.2なら新しい革新推定値は $8.2-7.7=0.5$ である。
## 注意
MA項の符号をモデル式からそのまま読む。係数の規約を暗記だけで処理しない。

<!-- CARD -->

---
id: engproc-arima110-difference-forecast
title: ARIMA予測を差分系列から作り水準へ累積する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: arima-difference-forecast-canonical
type: strategy
difficulty: 3
priority: A
hashtags:
  - 時系列解析
  - ARIMA過程
  - 差分
  - 予測
  - ドリフト
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ARIMA過程
---
## 問題
水準系列 $X_t$ の1階差分を
$$
Y_t=\Delta X_t=X_t-X_{t-1}
$$
とする。
1. 将来の差分予測 $\widehat Y_{t+j\mid t}$ から、$h$期先の水準予測 $\widehat X_{t+h\mid t}$ を作る一般式を導け。
2. ARIMA$(1,1,0)$ として
$$
Y_t=0.5Y_{t-1}+\varepsilon_t,
$$
$X_t=50,Y_t=4$ のとき、$X_{t+2}$ の点予測を求めよ。
3. ドリフト付きARIMA$(0,1,0)$
$$
\Delta X_t=1.5+\varepsilon_t,
$$
$X_t=100$ のとき、3期先の点予測を求めよ。

## 記号・用語
$\Delta X_t$ は1期の増分、$Y_t$ は差分系列である。ARIMAモデルでは非定常な水準系列を差分して定常なARMA型系列として扱い、その差分の予測を最後に足し戻して水準へ戻す。

## 使用公式・定理
恒等式
$$
X_{t+h}=X_t+\sum_{j=1}^{h}\Delta X_{t+j}
$$
の条件付き期待値を取れば
$$
\widehat X_{t+h\mid t}
=X_t+\sum_{j=1}^{h}\widehat Y_{t+j\mid t}.
$$

ARIMA$(1,1,0)$ で差分が
$$
Y_t=\phi Y_{t-1}+\varepsilon_t
$$
に従うなら、未来の革新の条件付き期待値を0として
$$
\widehat Y_{t+j\mid t}=\phi^jY_t.
$$

ドリフト付きARIMA$(0,1,0)$
$$
\Delta X_t=d+\varepsilon_t
$$
では各将来差分の条件付き期待値が $d$ なので
$$
\widehat X_{t+h\mid t}=X_t+hd.
$$

## 一手／方針
**水準を直接予測しようとせず、まず差分系列の各将来値を予測し、それらを現在の水準へ累積する。** ドリフト付きランダムウォークは「将来差分の予測が毎期 $d$」という特殊例として同じ手順で処理する。

## 答え
1. 
$$
\widehat X_{t+h\mid t}
=X_t+\sum_{j=1}^{h}\widehat Y_{t+j\mid t}.
$$

2. $\phi=0.5,Y_t=4$ なので
$$
\widehat Y_{t+1\mid t}=0.5(4)=2,
$$
$$
\widehat Y_{t+2\mid t}=0.5^2(4)=1.
$$
よって
$$
\widehat X_{t+2\mid t}=50+2+1=53.
$$

3. 将来の各差分の予測値は1.5なので
$$
\widehat X_{t+3\mid t}
=100+3(1.5)=104.5.
$$

## 計算例
ドリフトなしARIMA$(0,1,0)$、すなわち
$$
\Delta X_t=\varepsilon_t
$$
なら将来差分の条件付き期待値はすべて0である。したがって任意の $h\ge1$ について
$$
\widehat X_{t+h\mid t}=X_t.
$$
これはランダムウォークの点予測が現在値に等しいことを表す。

## 注意
$\widehat Y_{t+h\mid t}$ だけを $X_t$ に足してはいけない。水準へ戻すには途中の差分予測をすべて累積する。またドリフト $d$ は差分系列の平均であり、水準系列の固定切片ではない。予測区間を求める場合は将来革新の分散も累積するため、点予測だけの計算とは別に予測誤差分散を扱う。

<!-- CARD -->

---
id: engproc-pacf-significance-output
title: PACF出力から有意なラグを判定する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: pacf-output
type: calc_step
difficulty: 2
priority: A
hashtags: [時系列解析, 偏自己相関, ソフトウェア出力]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 時系列解析 }]
---
## 問題
$n=100$ の系列のPACF出力がラグ1で0.55、ラグ2で$-0.24$、ラグ3で0.12であった。近似95%限界 $\pm1.96/\sqrt n$ で有意なラグを判定せよ。
## 記号・用語
PACFは偏自己相関関数、$n$ は観測数である。有意とは近似限界の外側にあることをいう。
## 使用公式・定理
大標本での目安は $\pm1.96/\sqrt n$。
## 一手／方針
限界を数値化し、各PACFの絶対値と比較する。
## 答え
$$1.96/\sqrt{100}=0.196.$$
$|0.55|,|-0.24|>0.196$、$|0.12|<0.196$ なので、ラグ1と2が有意でラグ3は有意でない。
## 計算例
この切れ方はAR(2)候補と整合する。
## 注意
複数ラグの同時検定ではなく、次数選択の近似的な診断である。

<!-- CARD -->

---
id: engproc-ar1-spectral-ratio
title: AR(1)スペクトルの低周波・高周波比を求める
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: ar1-spectrum
type: calc_step
difficulty: 3
priority: B
hashtags: [時系列解析, スペクトル密度, 自己回帰過程]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 時系列解析 }]
---
## 問題
$X_t=0.6X_{t-1}+\varepsilon_t$ のスペクトル密度について、$f(0)/f(\pi)$ を求めよ。
## 記号・用語
$f(\omega)$ は角周波数 $\omega$ におけるスペクトル密度である。$\omega=0$ は低周波、$\omega=\pi$ は最高周波側を表す。
## 使用公式・定理
AR(1)では
$$f(\omega)=\frac{\sigma_\varepsilon^2}{2\pi\{1+\phi^2-2\phi\cos\omega\}}.$$
## 一手／方針
$\cos0=1$、$\cos\pi=-1$ を代入し、共通因子を約分する。
## 答え
$$\frac{f(0)}{f(\pi)}=\frac{(1+\phi)^2}{(1-\phi)^2}
=\left(\frac{1.6}{0.4}\right)^2=16.$$
## 計算例
正のAR係数により、ゆっくりした工程変動の強さが高周波変動の16倍になる。
## 注意
$f(0)$ と $f(\pi)$ の分母の比を逆向きにしない。

<!-- CARD -->

---
id: engproc-periodogram-period-identification
title: ピリオドグラムのピークから工程周期を読む
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: periodogram
type: calc_step
difficulty: 2
priority: B
hashtags: [時系列解析, ピリオドグラム, 周期]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 時系列解析 }]
---
## 問題
等間隔に観測した工程系列のピリオドグラムが角周波数 $\omega=\pi/6$ で最大となった。対応する周期を求めよ。
## 記号・用語
$\omega$ は1観測当たりの角周波数、周期 $T$ は同じ位相へ戻るまでの観測間隔数である。
## 使用公式・定理
角周波数と周期の関係は
$$T=\frac{2\pi}{\omega}.$$
## 一手／方針
ピーク周波数を周期の換算式へ代入する。
## 答え
$$T=\frac{2\pi}{\pi/6}=12.$$
したがって12観測ごとの周期成分が強い。
## 計算例
月次観測なら12か月周期、日次観測なら12日周期に対応する。
## 注意
周波数が cycles/sample で与えられた場合は $T=1/f$ を使う。角周波数との単位差に注意する。

<!-- CARD -->

---
id: engproc-arima-forecast-output
title: ARIMA予測出力から予測区間を復元する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: arima-software-output
type: calc_step
difficulty: 2
priority: A
hashtags: [時系列解析, ARIMA過程, ソフトウェア出力]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ARIMA過程 }]
---
## 問題
ARIMAモデルの1期先予測出力が `forecast = 80.0`, `standard error = 2.5` であった。正規近似による95%予測区間を求めよ。
## 記号・用語
`forecast` は条件付き平均、`standard error` は将来観測の予測誤差標準偏差である。
## 使用公式・定理
正規革新を仮定した近似95%予測区間は
$$\widehat X_{t+h\mid t}\pm1.96\operatorname{se}_h.$$
## 一手／方針
標準誤差を1.96倍し、点予測の両側へ加減する。
## 答え
$$80.0\pm1.96(2.5)=80.0\pm4.9,$$
よって予測区間は $(75.1,84.9)$。
## 計算例
実現値85.3はこの区間の上側外にあり、予測モデルの再点検材料になる。
## 注意
係数推定の標準誤差ではなく、予測誤差の標準誤差を用いる。

<!-- CARD -->

---
id: engproc-biased-walk-hit-upper
title: 偏りのあるランダムウォークの上側到達確率を計算する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: gambler-ruin-biased
type: calc_step
difficulty: 4
priority: B
hashtags: [ランダムウォーク, 到達確率, 差分方程式]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ランダムウォーク }]
---
## 問題
状態 $0,1,\ldots,5$ 上で、確率 $p=0.6$ で $+1$、$q=0.4$ で $-1$ 進む。状態2から出発し、0より先に5へ到達する確率を求めよ。
## 記号・用語
$h_i=P_i(T_5<T_0)$、$T_j$ は状態 $j$ への初到達時刻である。
## 使用公式・定理
$p\ne q$ の吸収ランダムウォークでは
$$h_i=\frac{1-(q/p)^i}{1-(q/p)^N},\qquad h_0=0, h_N=1.$$
## 一手／方針
$q/p=2/3$、$i=2$、$N=5$ を公式へ代入する。
## 答え
$$h_2=\frac{1-(2/3)^2}{1-(2/3)^5}=\frac{5/9}{211/243}=\frac{135}{211}\approx0.640.$$
## 計算例
公平な場合の $i/N=2/5$ より、上向きドリフトにより到達確率が大きい。
## 注意
$p=q$ のときは比の公式でなく $h_i=i/N$ を使う。

<!-- CARD -->

---
id: engproc-random-walk-expected-absorption
title: 公平なランダムウォークの平均吸収時間を計算する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: random-walk-absorption-time
type: calc_step
difficulty: 3
priority: B
hashtags: [ランダムウォーク, 平均到達時間, 吸収]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ランダムウォーク }]
---
## 問題
状態 $0,1,\ldots,6$ 上の公平なランダムウォークが状態2から出発する。0または6へ吸収されるまでの平均時点数を求めよ。
## 記号・用語
$m_i=E_i[T_{\{0,N\}}]$ はいずれかの境界への平均吸収時間である。
## 使用公式・定理
公平な吸収ランダムウォークでは $m_i=i(N-i)$。
## 一手／方針
出発状態 $i=2$ と上側境界 $N=6$ を代入する。
## 答え
$$m_2=2(6-2)=8.$$
## 計算例
中央の状態3では $m_3=3\cdot3=9$ で最大になる。
## 注意
これは吸収までの時点数の期待値で、上側へ到達する条件付き時間ではない。

<!-- CARD -->

---
id: engproc-ctmc-generator-check
title: 連続時間マルコフ連鎖の生成行列を判定する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: ctmc-generator
type: recognition
difficulty: 2
priority: B
hashtags: [マルコフ過程, 連続時間マルコフ連鎖, 生成行列]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: マルコフ過程 }]
---
## 問題
$Q=\begin{pmatrix}-3&2&1\\1&-1&0\\0&4&-4\end{pmatrix}$ は連続時間マルコフ連鎖の生成行列になり得るか。
## 記号・用語
$q_{ij}$ は状態 $i$ から $j$ への遷移率、$q_{ii}$ は状態 $i$ から出る総率の負値である。
## 使用公式・定理
生成行列は $i\ne j$ で $q_{ij}\ge0$、各行和が0を満たす。
## 一手／方針
非対角成分の符号と各行和を確認する。
## 答え
非対角成分はすべて非負で、行和は $-3+2+1=0$、$1-1=0$、$4-4=0$。よって生成行列になり得る。
## 計算例
状態1の保持時間は率3の指数分布に従う。
## 注意
離散時間の遷移行列と異なり、対角成分は負で行和は1でなく0である。

<!-- CARD -->

---
id: engproc-ctmc-holding-jump-probability
title: 生成行列から保持時間と遷移先確率を求める
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: ctmc-holding-time
type: calc_step
difficulty: 3
priority: B
hashtags: [マルコフ過程, 保持時間, ジャンプ連鎖]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: マルコフ過程 }]
---
## 問題
生成行列の状態1の行が $(-3,2,1)$ である。状態1の平均保持時間と、離脱時に状態2へ移る確率を求めよ。
## 記号・用語
離脱率は $\nu_i=-q_{ii}$、ジャンプ先確率は $q_{ij}/\nu_i$ である。$H_1$ は状態1の保持時間を表す。
## 使用公式・定理
保持時間は率 $\nu_i$ の指数分布に従い、平均は $1/\nu_i$。
## 一手／方針
対角成分から総離脱率を読み、非対角率を総率で割る。
## 答え
$$\nu_1=3,\qquad E[H_1]=\frac13,$$
$$P(1\to2\mid\text{離脱})=\frac{q_{12}}{\nu_1}=\frac23.$$
## 計算例
状態3へ移る確率は $1/3$ で、合計1になる。
## 注意
遷移率2は確率ではないため、そのまま確率として読まない。

<!-- CARD -->

---
id: engproc-two-state-ctmc-transition
title: 2状態連続時間マルコフ連鎖の遷移確率を計算する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: ctmc-transition-probability
type: calc_step
difficulty: 4
priority: B
hashtags: [マルコフ過程, 遷移確率, 可用性]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: マルコフ過程 }]
---
## 問題
稼働状態0から故障状態1への率が $\lambda=2$、修復率が $\mu=3$ である。稼働状態から出発したとき、時刻 $t$ に稼働中である確率を求めよ。
## 記号・用語
$p_{00}(t)=P(X(t)=0\mid X(0)=0)$ である。
## 使用公式・定理
2状態連続時間マルコフ連鎖では
$$p_{00}(t)=\frac{\mu}{\lambda+\mu}+\frac{\lambda}{\lambda+\mu}e^{-(\lambda+\mu)t}.$$
## 一手／方針
定常稼働確率と初期状態からの過渡項に分けて代入する。
## 答え
$$p_{00}(t)=\frac35+\frac25e^{-5t}.$$
## 計算例
$t\to\infty$ では $p_{00}(t)\to3/5$ で、長期可用率に一致する。
## 注意
$t=0$ で $p_{00}(0)=1$ になることを確認する。

<!-- CARD -->

---
id: engproc-nhpp-cumulative-intensity
title: 非定常ポアソン過程の累積強度を計算する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: nonhomogeneous-poisson
type: calc_step
difficulty: 3
priority: B
hashtags: [ポアソン過程, 非定常ポアソン過程, 累積強度]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ポアソン過程 }]
---
## 問題
時刻依存の到着強度が $\lambda(t)=2t$（$t\ge0$）である。区間 $[0,3]$ の平均到着数と無到着確率を求めよ。
## 記号・用語
$\Lambda(t)=\int_0^t\lambda(u)du$ は累積強度である。
## 使用公式・定理
非定常ポアソン過程では $N(t)\sim\operatorname{Poisson}(\Lambda(t))$、$P(N(t)=0)=e^{-\Lambda(t)}$。
## 一手／方針
強度関数を積分して平均件数を求める。
## 答え
$$\Lambda(3)=\int_0^3 2u\,du=[u^2]_0^3=9,$$
$$P(N(3)=0)=e^{-9}\approx0.000123.$$
## 計算例
区間 $[1,3]$ の平均到着数は $\Lambda(3)-\Lambda(1)=8$。
## 注意
強度 $\lambda(t)$ と累積強度 $\Lambda(t)$ を取り違えない。

<!-- CARD -->

---
id: engproc-poisson-rate-estimate-exposure
title: ポアソン過程の到着率を総曝露時間から推定する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: poisson-rate-estimation
type: calc_step
difficulty: 2
priority: B
hashtags: [ポアソン過程, 最尤推定, 曝露時間]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ポアソン過程 }]
---
## 問題
独立な5台の装置を各100時間観測し、合計8件の故障を観測した。一定故障率 $\lambda$ の最尤推定値を求めよ。
## 記号・用語
総曝露時間は全装置の観測時間の和である。
## 使用公式・定理
ポアソン過程の率の最尤推定量は $\widehat\lambda=(\text{総件数})/(\text{総曝露時間})$。
## 一手／方針
装置数と1台当たり時間を掛けて総曝露時間を求める。
## 答え
$$T=5\cdot100=500,$$
$$\widehat\lambda=\frac8{500}=0.016\quad\text{件/時間}.$$
## 計算例
平均故障間隔の推定値は $1/0.016=62.5$ 時間。
## 注意
装置数だけで割らず、観測時間を含む曝露量で割る。

<!-- CARD -->

---
id: engproc-brownian-bridge-conditional
title: ブラウン運動の終点条件付き分布を計算する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: brownian-bridge
type: calc_step
difficulty: 4
priority: B
hashtags: [マルコフ過程, ブラウン運動, 条件付き正規分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: マルコフ過程 }]
---
## 問題
標準ブラウン運動について、$B(4)=2$ の下での $B(1)$ の条件付き平均と分散を求めよ。
## 記号・用語
$\operatorname{Cov}(B(s),B(t))=\min(s,t)$ で、$(B(1),B(4))$ は2変量正規分布に従う。
## 使用公式・定理
2変量正規分布の条件付き平均・分散を用いる。
## 一手／方針
$\operatorname{Var}(B(1))=1$、$\operatorname{Var}(B(4))=4$、共分散1を条件付き正規公式へ入れる。
## 答え
$$E[B(1)\mid B(4)=2]=\frac14\cdot2=\frac12,$$
$$\operatorname{Var}(B(1)\mid B(4)=2)=1-\frac{1^2}{4}=\frac34.$$
## 計算例
条件付き平均は直線補間 $(1/4)B(4)$ になる。
## 注意
終点を条件とすると、増分の独立性はそのまま残らない。

<!-- CARD -->

---
id: engproc-ou-mean-variance
title: Ornstein--Uhlenbeck過程の平均と分散を計算する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: ornstein-uhlenbeck
type: calc_step
difficulty: 4
priority: B
hashtags: [マルコフ過程, Ornstein-Uhlenbeck過程, 平均回帰]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: マルコフ過程 }]
---
## 問題
$dX_t=-2X_tdt+3dB_t$、$X_0=4$ のOrnstein--Uhlenbeck過程について $E[X_t]$ と $\operatorname{Var}(X_t)$ を求めよ。
## 記号・用語
$B_t$ は標準ブラウン運動、係数2は平均回帰速度、係数3は拡散係数である。
## 使用公式・定理
$dX_t=-\theta X_tdt+\sigma dB_t$ では
$$E[X_t]=X_0e^{-\theta t},\qquad \operatorname{Var}(X_t)=\frac{\sigma^2}{2\theta}(1-e^{-2\theta t}).$$
## 一手／方針
$\theta=2,\sigma=3,X_0=4$ を公式へ代入する。
## 答え
$$E[X_t]=4e^{-2t},$$
$$\operatorname{Var}(X_t)=\frac94(1-e^{-4t}).$$
## 計算例
$t\to\infty$ で平均0、分散 $9/4$ の定常分布へ近づく。
## 注意
ランダムウォークと異なり分散は無限に増えず、平均回帰により上限へ収束する。

<!-- CARD -->

---
id: engproc-degradation-two-step
title: 劣化マルコフ連鎖の2段階故障確率を計算する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: markov-degradation
type: calc_step
difficulty: 2
priority: A
hashtags: [マルコフ連鎖, 遷移行列, 劣化モデル]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: マルコフ連鎖 }]
---
## 問題
状態を正常0、劣化1、故障2とし、遷移行列が $P=\begin{pmatrix}0.8&0.2&0\\0&0.6&0.4\\0&0&1\end{pmatrix}$ である。正常から2期後に故障している確率を求めよ。
## 記号・用語
$p_{ij}^{(2)}$ は状態 $i$ から2段階後に状態 $j$ にいる確率である。
## 使用公式・定理
$P^{(2)}=P^2$、$p_{ij}^{(2)}=\sum_kp_{ik}p_{kj}$。
## 一手／方針
正常から故障へ2期で至る経路 $0\to1\to2$ の確率積を求める。
## 答え
$$p_{02}^{(2)}=0.8(0)+0.2(0.4)+0(1)=0.08.$$
## 計算例
1期目に正常のままでは2期目に直接故障しない設定である。
## 注意
故障状態は吸収状態である。

<!-- CARD -->

---
id: engproc-repair-chain-stationary-availability
title: 故障修復連鎖の定常可用率を計算する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: stationary-availability
type: calc_step
difficulty: 3
priority: A
hashtags: [マルコフ連鎖, 定常分布, 可用率]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: マルコフ連鎖 }]
---
## 問題
稼働0・故障1の遷移行列が $P=\begin{pmatrix}0.9&0.1\\0.4&0.6\end{pmatrix}$ である。長期可用率を求めよ。
## 記号・用語
定常分布 $\boldsymbol\pi=(\pi_0,\pi_1)$ の $\pi_0$ が長期可用率である。
## 使用公式・定理
$\boldsymbol\pi^\top P=\boldsymbol\pi^\top$、$\pi_0+\pi_1=1$。
## 一手／方針
稼働から故障への定常流量と故障から修復への流量を等置する。
## 答え
$$0.1\pi_0=0.4\pi_1,\qquad \pi_0+\pi_1=1,$$
より $\pi_0=0.8,\pi_1=0.2$。長期可用率は0.8。
## 計算例
長期的には観測時点の20%で故障状態にいる。
## 注意
初期状態によらず収束するには既約性・非周期性を確認する。

<!-- CARD -->

---
id: engproc-stationary-mean-recurrence
title: 定常確率から平均再帰時間を計算する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: mean-recurrence-time
type: calc_step
difficulty: 3
priority: B
hashtags: [マルコフ連鎖, 再帰時間, 定常分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: マルコフ連鎖 }]
---
## 問題
有限既約マルコフ連鎖の状態Aの定常確率が $\pi_A=0.2$ である。Aから出発して次にAへ戻るまでの平均時点数を求めよ。
## 記号・用語
初回再帰時間は時点1以降で初めて同じ状態へ戻る時刻である。
## 使用公式・定理
**Kacの公式**：有限既約連鎖で平均再帰時間は $E_A[T_A^+]=1/\pi_A$。
## 一手／方針
定常確率の逆数を取る。
## 答え
$$E_A[T_A^+]=\frac1{0.2}=5.$$
## 計算例
長期的に5時点に1回現れる状態へは平均5時点で再帰する。
## 注意
滞在時間ではなく、離脱しない場合も含む次の再訪までの時点数である。

<!-- CARD -->

---
id: engproc-birth-death-detailed-balance
title: 出生死亡過程の定常比を詳細釣合いから求める
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: birth-death-process
type: calc_step
difficulty: 3
priority: B
hashtags: [マルコフ過程, 出生死亡過程, 詳細釣合い]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: マルコフ過程 }]
---
## 問題
出生率が全状態で $\lambda$、死亡率が正の状態で $\mu$ の出生死亡過程について、定常確率の比 $\pi_{n+1}/\pi_n$ を求めよ。
## 記号・用語
$\pi_n$ は定常状態で系内個数が $n$ である確率である。
## 使用公式・定理
詳細釣合い式は $\pi_n\lambda=\pi_{n+1}\mu$。
## 一手／方針
隣接状態間の流入率と流出率を等置して比を解く。
## 答え
$$\frac{\pi_{n+1}}{\pi_n}=\frac\lambda\mu=\rho.$$
## 計算例
$\rho<1$ なら $\pi_n=(1-\rho)\rho^n$ と正規化できる。
## 注意
$\rho\ge1$ では無限状態空間上の定常確率分布を正規化できない。

<!-- CARD -->

---
id: engproc-mm1-stationary-probability
title: M/M/1待ち行列の定常確率を計算する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: mm1-stationary
type: calc_step
difficulty: 3
priority: B
hashtags: [マルコフ過程, M-M-1待ち行列, 定常分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: マルコフ過程 }]
---
## 問題
到着率 $\lambda=2$/時、サービス率 $\mu=3$/時のM/M/1待ち行列で、定常時に系内人数が3人である確率を求めよ。
## 記号・用語
$\rho=\lambda/\mu$ は利用率で、定常分布には $\rho<1$ が必要である。
## 使用公式・定理
M/M/1の定常確率は $\pi_n=(1-\rho)\rho^n$。
## 一手／方針
利用率を計算し、幾何分布型の定常確率へ代入する。
## 答え
$$\rho=\frac23,$$
$$\pi_3=\left(1-\frac23\right)\left(\frac23\right)^3=\frac8{81}\approx0.0988.$$
## 計算例
空系確率は $\pi_0=1/3$。
## 注意
系内人数にはサービス中の1人も含む。

<!-- CARD -->

---
id: engproc-mm1-little-law
title: M/M/1待ち行列の平均人数と平均滞在時間を計算する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: mm1-performance
type: calc_step
difficulty: 3
priority: B
hashtags: [マルコフ過程, M-M-1待ち行列, Littleの法則]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: マルコフ過程 }]
---
## 問題
$\lambda=2$/時、$\mu=3$/時のM/M/1待ち行列で、平均系内人数 $L$ と平均系内時間 $W$ を求めよ。
## 記号・用語
$L$ はサービス中を含む平均人数、$W$ は待ち時間とサービス時間を含む平均滞在時間である。
## 使用公式・定理
$L=\rho/(1-\rho)=\lambda/(\mu-\lambda)$、Littleの法則 $L=\lambda W$。
## 一手／方針
まず平均人数を求め、到着率で割って平均時間へ変換する。
## 答え
$$L=\frac2{3-2}=2,$$
$$W=\frac L\lambda=\frac22=1\text{ 時間}.$$
## 計算例
平均待ち人数は $L_q=\rho^2/(1-\rho)=4/3$。
## 注意
$W$ は待ち時間だけでなくサービス時間も含む。

<!-- CARD -->

---
id: engproc-absorbing-fundamental-matrix
title: 吸収連鎖の基本行列を計算する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: absorbing-fundamental-matrix
type: calc_step
difficulty: 4
priority: B
hashtags: [マルコフ連鎖, 吸収連鎖, 基本行列]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: マルコフ連鎖 }]
---
## 問題
2つの一時状態の部分行列が $Q=\begin{pmatrix}0.5&0.2\\0.1&0.6\end{pmatrix}$ である。基本行列 $N$ を求めよ。
## 記号・用語
$N_{ij}$ は状態 $i$ から出発して吸収前に一時状態 $j$ を訪れる期待回数である。
## 使用公式・定理
吸収連鎖の基本行列は $N=(I-Q)^{-1}$。
## 一手／方針
$I-Q$ を作り、2次逆行列公式を使う。
## 答え
$$I-Q=\begin{pmatrix}0.5&-0.2\\-0.1&0.4\end{pmatrix},\qquad |I-Q|=0.18,$$
$$N=\frac1{0.18}\begin{pmatrix}0.4&0.2\\0.1&0.5\end{pmatrix}=\begin{pmatrix}20/9&10/9\\5/9&25/9\end{pmatrix}.$$
## 計算例
第1行和 $10/3$ は状態1から吸収まで一時状態にいる平均時点数。
## 注意
ここでの $N$ は計数過程でなく基本行列の記号である。

<!-- CARD -->

---
id: engproc-absorbing-probability-matrix
title: 基本行列から吸収先確率を計算する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: absorbing-probability
type: calc_step
difficulty: 4
priority: B
hashtags: [マルコフ連鎖, 吸収確率, 基本行列]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: マルコフ連鎖 }]
---
## 問題
一時状態から2つの吸収状態への遷移部分を $R=\begin{pmatrix}0.2&0.1\\0.1&0.2\end{pmatrix}$、基本行列を $N=\begin{pmatrix}20/9&10/9\\5/9&25/9\end{pmatrix}$ とする。吸収確率行列を求めよ。
## 記号・用語
$B_{ij}$ は一時状態 $i$ から最終的に吸収状態 $j$ へ入る確率である。
## 使用公式・定理
吸収確率行列は $B=NR$。
## 一手／方針
基本行列と吸収遷移部分を行列乗算する。
## 答え
$$B=\begin{pmatrix}5/9&4/9\\7/18&11/18\end{pmatrix}.$$
## 計算例
各行和は1で、いずれかの吸収状態へ最終的に入る。
## 注意
行が出発する一時状態、列が吸収先に対応する。

<!-- CARD -->

---
id: engproc-markov-reward-long-run
title: マルコフ報酬過程の長期平均報酬を計算する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: markov-reward
type: calc_step
difficulty: 3
priority: B
hashtags: [マルコフ連鎖, 定常分布, 報酬過程]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: マルコフ連鎖 }]
---
## 問題
定常分布が $\boldsymbol\pi=(0.7,0.2,0.1)$、各状態の1期報酬が $\boldsymbol r=(10,4,-6)^\top$ である。長期平均報酬を求めよ。
## 記号・用語
状態報酬 $r_i$ はその状態に1期いる間に得る報酬である。
## 使用公式・定理
定常状態の長期平均報酬は $\bar r=\boldsymbol\pi^\top\boldsymbol r$。
## 一手／方針
各状態報酬を定常確率で加重平均する。
## 答え
$$\bar r=0.7(10)+0.2(4)+0.1(-6)=7.2.$$
## 計算例
100期では長期的に約720の総報酬を見込む。
## 注意
初期過渡期間を含む有限期間期待値とは異なる。

<!-- CARD -->

---
id: engproc-ctmc-uniformization
title: 一様化で連続時間連鎖の埋込行列を作る
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: ctmc-uniformization
type: calc_step
difficulty: 4
priority: B
hashtags: [マルコフ過程, 一様化, 生成行列]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: マルコフ過程 }]
---
## 問題
$Q=\begin{pmatrix}-2&2\\1&-1\end{pmatrix}$ を率 $\nu=2$ で一様化した離散時間遷移行列を求めよ。
## 記号・用語
一様化は仮想的な自己遷移を加えて連続時間連鎖をポアソン時点の離散連鎖として扱う方法である。
## 使用公式・定理
$P=I+Q/\nu$、ただし $\nu\ge\max_i(-q_{ii})$。
## 一手／方針
生成行列を2で割り、単位行列を足す。
## 答え
$$P=\begin{pmatrix}1&0\\0&1\end{pmatrix}+\frac12\begin{pmatrix}-2&2\\1&-1\end{pmatrix}=\begin{pmatrix}0&1\\0.5&0.5\end{pmatrix}.$$
## 計算例
各成分は非負で行和1になっている。
## 注意
$\nu$ を最大離脱率より小さくすると負の確率が生じ得る。

<!-- CARD -->

---
id: engproc-chapman-kolmogorov-maintenance
title: 保全状態の多段階遷移を中間状態で分解する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: chapman-kolmogorov
type: calc_step
difficulty: 2
priority: A
hashtags: [マルコフ連鎖, Chapman-Kolmogorov関係, 保全]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: マルコフ連鎖 }]
---
## 問題
正常0、要保全1、停止2の連鎖の推移行列を
$$P=\begin{pmatrix}0.7&0.3&0\\0.2&0.4&0.4\\0&0&1\end{pmatrix}$$
とする。正常から2期後に停止する確率を求めよ。
## 記号・用語
$p_{ij}^{(2)}$ は2段階遷移確率である。
## 使用公式・定理
Chapman--Kolmogorov関係：$p_{ij}^{(2)}=\sum_kp_{ik}p_{kj}$。
## 一手／方針
1期後の全中間状態を経由する確率積を足す。
## 答え
$$p_{02}^{(2)}=p_{00}p_{02}+p_{01}p_{12}+p_{02}p_{22}=0+0.3(0.4)+0=0.12.$$
## 計算例
この設定では経路 $0\to1\to2$ だけが寄与する。
## 注意
各中間状態 $k=0,1,2$ を漏れなく足す。

<!-- CARD -->

---
id: engproc-stationarity-window-judgment
title: 区間別統計量から弱定常性を診断する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: weak-stationarity-diagnostic
type: recognition
difficulty: 2
priority: A
hashtags: [時系列解析, 弱定常性, 工程データ]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 時系列解析 }]
---
## 問題
工程時系列の前半・後半で標本平均が $(10.1,14.8)$、標本分散が $(2.0,2.1)$ であった。弱定常性について何が疑われるか。
## 記号・用語
弱定常過程は平均が時点によらず、自己共分散が時差だけに依存する。
## 使用公式・定理
区間別平均・分散は定常性を調べる記述的診断である。
## 一手／方針
前後半で平均と分散の安定性を別々に比較する。
## 答え
分散はほぼ一定だが平均が大きく変化しており、平均一定条件に反するトレンドまたは水準変化が疑われる。
## 計算例
後半平均は前半より4.7高い。
## 注意
有限標本の差だけで非定常性を確定せず、図示や検定も併用する。

<!-- CARD -->

---
id: engproc-sample-autocovariance-numeric
title: 工程系列の標本自己共分散を計算する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: sample-autocovariance
type: calc_step
difficulty: 2
priority: A
hashtags: [時系列解析, 自己共分散, 数値計算]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 時系列解析 }]
---
## 問題
系列 $(1,3,2,4)$ のラグ1標本自己共分散を分母 $n$ の定義で求めよ。
## 記号・用語
$\widehat\gamma(1)=n^{-1}\sum_{t=2}^n(x_t-\bar x)(x_{t-1}-\bar x)$ とする。
## 使用公式・定理
標本平均は $\bar x=n^{-1}\sum_tx_t$。
## 一手／方針
平均を引いた偏差列を作り、隣接偏差の積を足す。
## 答え
$\bar x=2.5$、偏差は $(-1.5,0.5,-0.5,1.5)$。よって
$$\widehat\gamma(1)=\frac{0.5(-1.5)+(-0.5)(0.5)+1.5(-0.5)}4=-\frac{1.75}{4}=-0.4375.$$
## 計算例
ラグ0では偏差平方和を4で割る。
## 注意
分母 $n-k$ の定義もあるため問題文の規約に従う。

<!-- CARD -->

---
id: engproc-residual-white-noise-bounds
title: 残差ACFから白色性を診断する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: white-noise-diagnostic
type: recognition
difficulty: 2
priority: B
hashtags: [時系列解析, ホワイトノイズ, 残差診断]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 時系列解析 }]
---
## 問題
標本数 $n=100$ のモデル残差でラグ1標本自己相関が0.28であった。近似95%限界 $\pm1.96/\sqrt n$ を使って白色性を診断せよ。
## 記号・用語
白色雑音では異なる時点の自己相関が0である。
## 使用公式・定理
大標本の標本自己相関の目安は $\pm1.96/\sqrt n$。
## 一手／方針
限界を数値化し、残差自己相関の絶対値と比較する。
## 答え
$$1.96/\sqrt{100}=0.196.$$
$0.28>0.196$ なのでラグ1相関が残っており、白色雑音残差とは考えにくい。
## 計算例
AR項の不足などを再検討する。
## 注意
多数ラグを個別比較すると多重性が生じるためLjung--Box検定も使う。

<!-- CARD -->

---
id: engproc-ar1-correlation-half-life
title: AR(1)自己相関の半減時点を計算する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: ar1-correlation-decay
type: calc_step
difficulty: 3
priority: B
hashtags: [自己回帰過程, 自己相関, 半減期]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 自己回帰過程 }]
---
## 問題
AR(1)係数が $\phi=0.8$ のとき、自己相関が0.5以下になる最小ラグを求めよ。
## 記号・用語
定常AR(1)のラグ $h$ 自己相関は $\rho(h)=\phi^h$。
## 使用公式・定理
$0<\phi<1$ では $\phi^h\le0.5$ を対数で解く。
## 一手／方針
$h\ge\log(0.5)/\log(0.8)$ を計算し、最小整数へ切り上げる。
## 答え
$$\frac{\log0.5}{\log0.8}\approx3.106,$$
よって最小ラグは $h=4$。実際 $0.8^3=0.512>0.5$、$0.8^4=0.4096$。
## 計算例
係数が1に近いほど相関の減衰は遅い。
## 注意
負のAR係数では自己相関の符号が交互に変わる。

<!-- CARD -->

---
id: engproc-yule-walker-estimate-ar1
title: 標本自己相関からAR(1)係数をYule--Walker推定する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: yule-walker-estimation
type: calc_step
difficulty: 2
priority: A
hashtags: [自己回帰過程, Yule-Walker方程式, 推定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 自己回帰過程 }]
---
## 問題
中心化済み系列の標本自己共分散が $\widehat\gamma(0)=10$、$\widehat\gamma(1)=6$ である。AR(1)係数と革新分散をYule--Walker法で推定せよ。
## 記号・用語
$\widehat\phi$ はAR係数、$\widehat\sigma_\varepsilon^2$ は革新分散推定値である。
## 使用公式・定理
$\phi=\gamma(1)/\gamma(0)$、$\sigma_\varepsilon^2=\gamma(0)(1-\phi^2)$。
## 一手／方針
ラグ1とラグ0の比で係数を求め、定常分散式を逆に解く。
## 答え
$$\widehat\phi=6/10=0.6,$$
$$\widehat\sigma_\varepsilon^2=10(1-0.6^2)=6.4.$$
## 計算例
推定係数は定常域 $|\widehat\phi|<1$ にある。
## 注意
有限標本では推定値に偏りがあり得る。

<!-- CARD -->

---
id: engproc-ma1-moment-identification
title: MA(1)の自己相関から係数候補を求める
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: ma1-moment-estimation
type: calc_step
difficulty: 4
priority: B
hashtags: [移動平均過程, MA1モデル, 自己相関]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 移動平均過程 }]
---
## 問題
$X_t=\varepsilon_t+\theta\varepsilon_{t-1}$ のラグ1自己相関が $\rho(1)=0.4$ である。可逆な係数 $\theta$ を求めよ。
## 記号・用語
可逆性条件は $|\theta|<1$ である。
## 使用公式・定理
MA(1)では $\rho(1)=\theta/(1+\theta^2)$。
## 一手／方針
二次方程式へ変形して2根を求め、可逆性で1つを選ぶ。
## 答え
$$0.4(1+\theta^2)=\theta\iff2\theta^2-5\theta+2=0,$$
$$\theta=0.5\ \text{または}\ 2.$$
可逆な解は $\theta=0.5$。
## 計算例
2つの係数は同じ自己相関を与えるため可逆性が識別に必要。
## 注意
自己相関だけでは可逆・非可逆の2表現を区別できない。
