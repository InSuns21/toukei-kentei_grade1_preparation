---
id: engproc-chapman-kolmogorov-maintenance
title: 保全状態の多段階遷移を中間状態で分解する
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: chapman-kolmogorov
type: calc_step
difficulty: 2
priority: A
hashtags:
  - マルコフ連鎖
  - Chapman-Kolmogorov関係
  - 保全
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: マルコフ連鎖
archive_reason: duplicate
canonical_card: stoch-three-state-two-step
coverage_card: stoch-three-state-two-step
archive_note: 一般側の3状態連鎖カードはChapman–Kolmogorov関係で2段階遷移確率を中間状態について和を取って計算する同一判断単位を扱う。engineering側は正常・要保全・停止という文脈を付けた数値例にすぎないため吸収可能。
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
hashtags:
  - 時系列解析
  - 弱定常性
  - 工程データ
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 時系列解析
archive_reason: duplicate
canonical_card: ts-weak-vs-strong-stationarity
coverage_card: ts-weak-vs-strong-stationarity
archive_note: 弱定常性の正本へ前半・後半の標本平均(10.1,14.8)、標本分散(2.0,2.1)を比較し、分散はほぼ一定だが平均水準変化を疑う同一診断例を統合済み。有限標本だけで非定常を確定しない注意も保持している。
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
hashtags:
  - 時系列解析
  - ホワイトノイズ
  - 残差診断
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 時系列解析
archive_reason: duplicate
canonical_card: ts-software-residual-diagnostics
coverage_card: ts-software-residual-diagnostics
archive_note: 残差診断正本へ点ごとの近似95%限界 ±1.96/sqrt(n) と n=100,r1=0.28
  の同一例を追加済み。0.196を超えるため残存自己相関を疑い、複数ラグはLjung–Boxで確認する流れまで正本化した。
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
id: engproc-ma1-moment-identification
title: MA(1)の自己相関から係数候補を求める
category: applied-engineering
subcategory: engineering-stochastic-processes
topic: ma1-moment-estimation
type: calc_step
difficulty: 4
priority: B
hashtags:
  - 移動平均過程
  - MA1モデル
  - 自己相関
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 移動平均過程
archive_reason: duplicate
canonical_card: ts-maq-acf-cutoff
coverage_card: ts-maq-acf-cutoff
archive_note: MA(q)正本にMA(1)の rho(1)=theta/(1+theta^2) を既に導出しており、さらに rho(1)=0.4
  から theta=0.5,2 を求め、可逆性 |theta|<1 で theta=0.5
  を選ぶ同一逆算問題まで統合済み。自己相関だけでは可逆・非可逆表現を区別できない注意も保持する。
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
