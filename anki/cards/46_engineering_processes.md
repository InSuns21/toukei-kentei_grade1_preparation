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
title: CTMCの生成行列を判定し保持時間とジャンプ確率まで読む
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: ctmc-generator-holding-jump-canonical
type: strategy
difficulty: 3
priority: A
hashtags:
  - マルコフ過程
  - 連続時間マルコフ連鎖
  - 生成行列
  - 保持時間
  - ジャンプ連鎖
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: マルコフ過程
---
## 問題
連続時間マルコフ連鎖の候補として
$$
Q=\begin{pmatrix}
-3&2&1\\
1&-1&0\\
0&4&-4
\end{pmatrix}
$$
が与えられた。
1. $Q$ が生成行列になり得るか判定せよ。
2. 状態1にいるときの離脱率、保持時間の分布と平均を求めよ。
3. 状態1を離脱するとき、状態2および状態3へジャンプする確率を求めよ。

## 記号・用語
$q_{ij}$ は状態 $i$ から状態 $j$ への遷移率である。生成行列では非対角成分が遷移率を表し、対角成分はその状態から出る総率の負値である。状態 $i$ からの離脱率を
$$
\nu_i=-q_{ii}
$$
と書く。

## 使用公式・定理
有限状態の連続時間マルコフ連鎖の生成行列 $Q=(q_{ij})$ は
$$
q_{ij}\ge0\quad(i\ne j),
$$
$$
q_{ii}=-\sum_{j\ne i}q_{ij},
$$
すなわち各行和が0である。

状態 $i$ の保持時間 $H_i$ は離脱率 $\nu_i=-q_{ii}$ の指数分布に従い、
$$
P(H_i>t)=e^{-\nu_i t},
\qquad
E[H_i]=\frac1{\nu_i}.
$$
離脱したという条件のもとで、次に状態 $j$ へ移る確率は
$$
p_{ij}=\frac{q_{ij}}{\nu_i}
=\frac{q_{ij}}{-q_{ii}}
\qquad(j\ne i).
$$

## 一手／方針
**Qを見たら「非対角非負→行和0→対角の絶対値を離脱率として読む→非対角成分を離脱率で割る」の順に処理する。** 離散時間の遷移確率行列と違って、生成行列そのものの行和は1ではない。

## 答え
1. 非対角成分はすべて非負であり、各行和は
$$
-3+2+1=0,
\qquad
1-1+0=0,
\qquad
0+4-4=0.
$$
よって $Q$ は生成行列になり得る。

2. 状態1の離脱率は
$$
\nu_1=-q_{11}=3.
$$
したがって
$$
H_1\sim\operatorname{Exp}(3),
\qquad
E[H_1]=\frac13.
$$

3. 離脱時のジャンプ確率は
$$
p_{12}=\frac{2}{3},
\qquad
p_{13}=\frac{1}{3}.
$$
実際 $p_{12}+p_{13}=1$ である。

## 計算例
状態3の行は $(0,4,-4)$ なので離脱率は4、平均保持時間は $1/4$ である。また離脱時には状態2へ確率1で移る。

## 注意
生成行列 $Q$ と、ジャンプ時点だけを見た埋込離散時間連鎖の遷移行列 $P=(p_{ij})$ を混同しない。$Q$ の非対角成分は確率ではなく単位時間当たりの率なので1を超えてもよい。一方、$p_{ij}=q_{ij}/(-q_{ii})$ は離脱した後の行先確率であり各行で1に和する。

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
title: 出生死亡過程の詳細釣合いから定常分布を作りM/M/1へ適用する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: birth-death-mm1-stationary-canonical
type: strategy
difficulty: 3
priority: A
hashtags:
  - マルコフ過程
  - 出生死亡過程
  - 詳細釣合い
  - M/M/1
  - 定常分布
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: マルコフ過程
---
## 問題
状態空間 $\{0,1,2,\ldots\}$ の出生死亡過程を考える。状態 $n$ から $n+1$ への出生率を $\lambda_n$、状態 $n\ge1$ から $n-1$ への死亡率を $\mu_n$ とする。
1. 定常確率 $\pi_n$ が詳細釣合いを満たすとき、$\pi_n$ を $\pi_0$ と各率から表せ。
2. 定常分布が存在するための正規化条件を述べよ。
3. M/M/1待ち行列で到着率 $\lambda=2$/時、サービス率 $\mu=3$/時のとき、定常時に系内人数が3人である確率と空系確率を求めよ。

## 記号・用語
$\pi_n$ は定常状態で系が状態 $n$ にある確率である。出生死亡過程では隣接状態間だけ遷移する。M/M/1待ち行列では状態 $n$ を系内人数とみなし、到着が $n\to n+1$、サービス完了が $n\to n-1$ に対応する。

## 使用公式・定理
隣接状態間の詳細釣合いは
$$
\pi_n\lambda_n=\pi_{n+1}\mu_{n+1}
\qquad(n\ge0).
$$
よって
$$
\frac{\pi_{n+1}}{\pi_n}
=\frac{\lambda_n}{\mu_{n+1}},
$$
再帰的に
$$
\pi_n
=\pi_0\prod_{k=0}^{n-1}\frac{\lambda_k}{\mu_{k+1}}
\qquad(n\ge1).
$$
確率の総和が1になるように
$$
\pi_0^{-1}
=1+\sum_{n=1}^{\infty}
\prod_{k=0}^{n-1}\frac{\lambda_k}{\mu_{k+1}}
$$
と正規化する。この級数が有限であることが必要である。

M/M/1では
$$
\lambda_n=\lambda\quad(n\ge0),
\qquad
\mu_n=\mu\quad(n\ge1),
$$
なので
$$
\rho=\frac{\lambda}{\mu},
\qquad
\pi_n=\pi_0\rho^n.
$$

## 一手／方針
**隣接状態の流れを等置して比を作り、その比を掛け上げて最後に正規化する。** M/M/1の幾何型定常分布を独立公式として暗記せず、「出生率が一定 $\lambda$、死亡率が一定 $\mu$ の出生死亡過程」と見て一般式から導く。

## 答え
1. 詳細釣合いから
$$
\pi_n
=\pi_0\prod_{k=0}^{n-1}\frac{\lambda_k}{\mu_{k+1}}.
$$

2. 
$$
1+\sum_{n=1}^{\infty}
\prod_{k=0}^{n-1}\frac{\lambda_k}{\mu_{k+1}}<\infty
$$
なら正規化でき、$\pi_0$ をその逆数として定められる。

3. M/M/1では
$$
\rho=\frac{2}{3}<1.
$$
幾何級数
$$
1+\rho+\rho^2+\cdots=\frac1{1-\rho}
$$
から
$$
\pi_0=1-\rho=\frac13,
$$
$$
\pi_n=(1-\rho)\rho^n.
$$
よって
$$
\pi_3
=\left(1-\frac23\right)\left(\frac23\right)^3
=\frac8{81}
\approx0.0988.
$$

## 計算例
同じM/M/1で系内人数が2人以上である確率は
$$
P(N\ge2)
=\sum_{n=2}^{\infty}(1-\rho)\rho^n
=\rho^2
=\frac49.
$$
幾何型定常分布を得た後は、尾確率も幾何級数として処理できる。

## 注意
M/M/1の定常分布には $\rho=\lambda/\mu<1$ が必要である。$\rho\ge1$ では上の級数を確率1に正規化できない。また「系内人数」は待ち行列で待っている人数だけでなくサービス中の1人も含む。平均系内人数や平均滞在時間を求めるLittleの法則は、この定常確率の導出とは別の計算技能として扱う。

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
title: 吸収連鎖をQ,Rから基本行列・吸収時間・吸収確率まで解く
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: absorbing-chain-fundamental-probability-canonical
type: strategy
difficulty: 4
priority: A
hashtags:
  - マルコフ連鎖
  - 吸収連鎖
  - 基本行列
  - 吸収確率
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
吸収状態を後ろに並べた吸収マルコフ連鎖の遷移行列を
$$
P=\begin{pmatrix}Q&R\\0&I\end{pmatrix}
$$
とする。一時状態が2つで
$$
Q=\begin{pmatrix}0.5&0.2\\0.1&0.6\end{pmatrix},
\qquad
R=\begin{pmatrix}0.2&0.1\\0.1&0.2\end{pmatrix}
$$
とする。
1. 基本行列 $N$ を求め、その意味を説明せよ。
2. 各一時状態から吸収までの平均ステップ数を求めよ。
3. 各一時状態から各吸収状態へ最終的に吸収される確率行列 $B$ を求めよ。

## 記号・用語
$Q$ は一時状態間の遷移部分、$R$ は一時状態から吸収状態への1ステップ遷移部分である。基本行列
$$
N=(I-Q)^{-1}
$$
の成分 $N_{ij}$ は、一時状態 $i$ から出発したとき、吸収される前に一時状態 $j$ を訪れる期待回数を表す。

## 使用公式・定理
吸収されるまで一時状態内にとどまる確率を足し上げると
$$
I+Q+Q^2+\cdots=(I-Q)^{-1}=N.
$$
したがって、一時状態 $i$ から吸収までの平均ステップ数を並べたベクトルは
$$
\mathbf t=N\mathbf 1.
$$
また最終吸収先の確率行列は
$$
B=NR.
$$
これは「一時状態 $k$ を訪れる期待回数」と「そこから吸収状態へ1ステップで移る確率」を全ての $k$ について足し合わせたものと解釈できる。

## 一手／方針
**標準形を見たら $Q$ と $R$ を切り出し、まず $N=(I-Q)^{-1}$ を作る。** その同じ $N$ から、行和で平均吸収時間、$NR$ で吸収先確率を続けて求める。$N$ を計算して終わりにしない。

## 答え
1. 
$$
I-Q=\begin{pmatrix}0.5&-0.2\\-0.1&0.4\end{pmatrix}.
$$
行列式は
$$
0.5(0.4)-(-0.2)(-0.1)=0.18
$$
なので
$$
N=(I-Q)^{-1}
=\frac1{0.18}\begin{pmatrix}0.4&0.2\\0.1&0.5\end{pmatrix}
=\begin{pmatrix}20/9&10/9\\5/9&25/9\end{pmatrix}.
$$

2. 
$$
\mathbf t=N\mathbf1
=\begin{pmatrix}20/9+10/9\\5/9+25/9\end{pmatrix}
=\begin{pmatrix}10/3\\10/3\end{pmatrix}.
$$
よってどちらの一時状態から出発しても、吸収までの平均ステップ数は $10/3$ である。

3. 
$$
B=NR
=\begin{pmatrix}20/9&10/9\\5/9&25/9\end{pmatrix}
\begin{pmatrix}0.2&0.1\\0.1&0.2\end{pmatrix}
=\begin{pmatrix}5/9&4/9\\7/18&11/18\end{pmatrix}.
$$
各行和は1であり、最終的にいずれかの吸収状態へ入ることと整合する。

## 計算例
状態1から出発した場合、吸収前の一時状態1の期待訪問回数は $20/9$、一時状態2は $10/9$ で、その合計 $10/3$ が平均吸収ステップ数になる。また第1吸収状態へ入る最終確率は $5/9$、第2吸収状態へ入る確率は $4/9$ である。

## 注意
基本行列の $Q$ は「一時状態間の遷移確率部分」であり、連続時間マルコフ連鎖の生成行列を表す $Q$ とは別物である。文脈を確認する。また $N_{ij}$ は確率ではなく期待訪問回数なので1を超えてよい。$B$ の各成分は確率なので0から1の範囲にあり、各行和は1になる。

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
