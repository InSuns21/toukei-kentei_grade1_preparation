---
id: engmv-normal-density-numeric
title: 2変量正規分布の密度を数値計算する
category: applied-engineering
subcategory: engineering-multivariate
topic: multivariate-normal-density
type: calc_step
difficulty: 3
priority: A
hashtags:
  - 多変量正規分布
  - 確率密度関数
  - 数値計算
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 多変量正規分布
archive_reason: duplicate
canonical_card: dist-multivariate-normal-density
archive_note: 2変量正規密度の行列式・逆行列・二次形式・数値代入を一般canonicalへ吸収済み。
---
## 問題
2変量正規分布 $N_2(\boldsymbol0,\Sigma)$、$\Sigma=\begin{pmatrix}1&0\\0&4\end{pmatrix}$ の点 $\boldsymbol x=(1,2)^\top$ における確率密度を求めよ。
## 記号・用語
$N_p(\boldsymbol\mu,\Sigma)$ は平均ベクトル $\boldsymbol\mu$、分散共分散行列 $\Sigma$ の $p$ 変量正規分布、$|\Sigma|$ は行列式である。
## 使用公式・定理
**多変量正規分布の確率密度関数**：正定値行列 $\Sigma$ に対し
$$f(\boldsymbol x)=\frac{1}{(2\pi)^{p/2}|\Sigma|^{1/2}}\exp\left\{-\frac12(\boldsymbol x-\boldsymbol\mu)^\top\Sigma^{-1}(\boldsymbol x-\boldsymbol\mu)\right\}.$$
## 一手／方針
行列式、逆行列、二次形式の順に計算して公式へ代入する。
## 答え
$|\Sigma|=4$、$\Sigma^{-1}=\operatorname{diag}(1,1/4)$ だから
$$\boldsymbol x^\top\Sigma^{-1}\boldsymbol x=1^2+\frac{2^2}{4}=2.$$
したがって
$$f(1,2)=\frac1{(2\pi)\cdot2}e^{-1}=\frac{e^{-1}}{4\pi}\approx0.0293.$$
## 計算例
二次形式2は、中心からの標準化された距離の二乗に当たる。
## 注意
正規化定数では $|\Sigma|$ ではなく $|\Sigma|^{1/2}$ を使う。

<!-- CARD -->

---
id: engmv-normal-marginal-numeric
title: 多変量正規分布の周辺分布を取り出す
category: applied-engineering
subcategory: engineering-multivariate
topic: marginal-normal
type: formula
difficulty: 1
priority: B
hashtags:
  - 多変量正規分布
  - 周辺分布
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 多変量正規分布
archive_reason: duplicate
canonical_card: dist-bivariate-normal-marginal
archive_note: 任意の部分ベクトルの周辺化へ一般化し、3変量から第1・第3成分を抜く同じ数値例をcanonicalへ吸収済み。
---
## 問題
多変量正規分布 $\boldsymbol X\sim N_3((1,2,3)^\top,\Sigma)$、$\Sigma_{11}=4$、$\Sigma_{33}=9$、$\Sigma_{13}=2$ のとき、$(X_1,X_3)^\top$ の周辺分布を書け。
## 記号・用語
周辺分布は、不要な成分を積分して除いた分布である。
## 使用公式・定理
**多変量正規分布の周辺化**：成分を抜き出したベクトルも正規分布で、平均と分散共分散行列の対応する行・列を抜き出す。
## 一手／方針
成分1と3に対応する平均成分と分散共分散行列の行・列だけを残す。
## 答え
$$\begin{pmatrix}X_1\\X_3\end{pmatrix}\sim N_2\left(\begin{pmatrix}1\\3\end{pmatrix},\begin{pmatrix}4&2\\2&9\end{pmatrix}\right).$$
## 計算例
$X_1\sim N(1,4)$、$X_3\sim N(3,9)$ も直ちに得られる。
## 注意
周辺化では逆行列やSchur補行列は不要である。

<!-- CARD -->

---
id: engmv-conditional-normal-numeric
title: 2変量正規分布の条件付き分布を数値計算する
category: applied-engineering
subcategory: engineering-multivariate
topic: conditional-normal
type: calc_step
difficulty: 3
priority: A
hashtags:
  - 多変量正規分布
  - 条件付き分布
  - 数値計算
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 多変量正規分布
archive_reason: duplicate
canonical_card: dist-multivariate-normal-conditional
archive_note: 平均(1,2)、共分散[[4,3],[3,9]]、Y=5からX|Y=5~N(2,3)を求める数値例がcanonicalと同一。
---
## 問題
$(X,Y)^\top$ は平均 $(1,2)^\top$、分散共分散行列 $\begin{pmatrix}4&3\\3&9\end{pmatrix}$ の2変量正規分布に従う。$Y=5$ の下での $X$ の条件付き分布を求めよ。
## 記号・用語
$\sigma_{XY}=3$ は共分散、$\sigma_Y^2=9$ は条件に置く変数の分散である。
## 使用公式・定理
**2変量正規分布の条件付き分布**：
$$X\mid Y=y\sim N\left(\mu_X+\frac{\sigma_{XY}}{\sigma_Y^2}(y-\mu_Y),\ \sigma_X^2-\frac{\sigma_{XY}^2}{\sigma_Y^2}\right).$$
## 一手／方針
条件付き平均の回帰補正項と、条件付けで減少する分散を別々に計算する。
## 答え
$$E[X\mid Y=5]=1+\frac39(5-2)=2,$$
$$\operatorname{Var}(X\mid Y=5)=4-\frac{3^2}{9}=3.$$
したがって $X\mid Y=5\sim N(2,3)$。
## 計算例
条件付き分散3は周辺分散4より小さい。
## 注意
条件付き分散は観測値 $y$ に依存しない。

<!-- CARD -->

---
id: engmv-linear-combination-normal
title: 多変量正規分布の線形結合を計算する
category: applied-engineering
subcategory: engineering-multivariate
topic: linear-combination
type: calc_step
difficulty: 2
priority: B
hashtags:
  - 多変量正規分布
  - 線形結合
  - 分散
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 多変量正規分布
archive_reason: duplicate
canonical_card: prob-linear-combination-normal
archive_note: 多変量正規ベクトルの一般線形結合へcanonicalを拡張し、相関ありのN(-3,36)数値例も吸収済み。
---
## 問題
多変量正規分布 $\boldsymbol X\sim N_2((1,2)^\top,\begin{pmatrix}4&1\\1&9\end{pmatrix})$ のとき、$Y=X_1-2X_2$ の分布を求めよ。
## 記号・用語
$\boldsymbol a=(1,-2)^\top$ とすれば $Y=\boldsymbol a^\top\boldsymbol X$ である。
## 使用公式・定理
**多変量正規分布の線形結合**：
$$\boldsymbol a^\top\boldsymbol X\sim N(\boldsymbol a^\top\boldsymbol\mu,\boldsymbol a^\top\Sigma\boldsymbol a).$$
## 一手／方針
平均には係数を1回、分散には係数ベクトルを左右から掛ける。
## 答え
$$E[Y]=1-2\cdot2=-3,$$
$$\operatorname{Var}(Y)=4+(-2)^2\cdot9+2(1)(-2)(1)=36.$$
したがって $Y\sim N(-3,36)$。
## 計算例
共分散項は $2a_1a_2\sigma_{12}=-4$ である。
## 注意
分散計算で共分散の交差項を落とさない。

<!-- CARD -->

---
id: engmv-pca-rayleigh-process-variance
title: 工程変動を最大化する第1主成分をRayleigh商で選ぶ
category: applied-engineering
subcategory: engineering-multivariate
topic: pca-variance-maximization
type: calc_step
difficulty: 3
priority: A
hashtags:
  - 主成分分析
  - 分散最大化
  - Rayleigh商
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 主成分分析：分散最大化
archive_reason: duplicate
canonical_card: mv-pca-variance-max
archive_note: Rayleigh商最大化から最大固有値・固有ベクトルを求める操作はPCA canonicalでLagrange法と2x2数値例まで扱う。
---
## 問題
2つの工程特性の分散共分散行列が $\Sigma=\begin{pmatrix}5&2\\2&2\end{pmatrix}$ である。$\boldsymbol a^\top\boldsymbol a=1$ の下で $Y=\boldsymbol a^\top\boldsymbol X$ の分散を最大にする方向と最大分散を求めよ。
## 記号・用語
$\boldsymbol a$ は主成分係数、$\operatorname{Var}(Y)=\boldsymbol a^\top\Sigma\boldsymbol a$ はRayleigh商である。
## 使用公式・定理
**Rayleigh--Ritz定理**：単位ベクトル上の $\boldsymbol a^\top\Sigma\boldsymbol a$ の最大値は最大固有値で、最大化方向は対応する単位固有ベクトルである。
## 一手／方針
特性方程式で最大固有値を求め、その固有方程式から方向を正規化する。
## 答え
$$|\Sigma-\lambda I|=(5-\lambda)(2-\lambda)-4=\lambda^2-7\lambda+6=0,$$
よって固有値は $6,1$。$\lambda=6$ では $-a_1+2a_2=0$ なので
$$\boldsymbol a=\frac1{\sqrt5}(2,1)^\top,$$
最大分散は6である。
## 計算例
第1特性を第2特性の2倍の重みでまとめた方向が最大の工程変動を捉える。
## 注意
固有ベクトルを長さ1にしないと、係数を拡大するだけで分散を任意に大きくできる。

<!-- CARD -->

---
id: engmv-standardized-pca-2x2
title: 相関行列による標準化主成分分析を計算する
category: applied-engineering
subcategory: engineering-multivariate
topic: standardized-pca
type: calc_step
difficulty: 3
priority: B
hashtags:
  - 主成分分析
  - 相関行列
  - 標準化
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 標準化主成分分析と相関行列
archive_reason: duplicate
canonical_card: mv-pca-covariance-vs-correlation
archive_note: 相関行列[[1,.8],[.8,1]]の固有値1.8,.2、PC1、寄与率0.9をcanonicalへ吸収済み。
---
## 問題
相関行列 $R=\begin{pmatrix}1&0.8\\0.8&1\end{pmatrix}$ に基づく第1主成分と寄与率を求めよ。
## 記号・用語
$Z_1,Z_2$ は平均0、分散1に標準化した変数である。
## 使用公式・定理
**相関主成分分析**：相関行列の最大固有値に対応する単位固有ベクトルを第1主成分係数とする。
## 一手／方針
対角成分が等しい2次相関行列なので、和方向と差方向を候補にする。
## 答え
固有値は $1+0.8=1.8$、$1-0.8=0.2$。最大固有値の単位固有ベクトルは $(1,1)^\top/\sqrt2$ だから
$$Y_1=\frac{Z_1+Z_2}{\sqrt2},\qquad c_1=\frac{1.8}{1.8+0.2}=0.9.$$
## 計算例
第1主成分だけで標準化後の全分散の90%を説明する。
## 注意
元変数の単位が大きく異なるとき、共分散主成分分析より相関主成分分析が適することが多い。

<!-- CARD -->

---
id: engmv-lda-one-dimensional-boundary
title: 1変量の線形判別境界を計算する
category: applied-engineering
subcategory: engineering-multivariate
topic: linear-discriminant-analysis
type: calc_step
difficulty: 2
priority: B
hashtags:
  - 判別分析
  - 線形判別
  - 分類境界
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 判別分析
archive_reason: duplicate
canonical_card: mv-lda-classification-rule
archive_note: 共通分散・等事前確率の1変量LDAで境界が2平均の中点になる数値例をcanonicalへ吸収済み。
---
## 問題
2群が共通分散 $\sigma^2=1$、平均 $\mu_1=0,\mu_2=4$、事前確率が等しい正規分布に従う。線形判別の境界を求めよ。
## 記号・用語
判別境界は2群の判別得点が等しくなる点である。
## 使用公式・定理
共通分散・等事前確率なら1変量の境界は $(\mu_1+\mu_2)/2$。
## 一手／方針
平均の中点を計算し、どちらの平均に近いかで分類する。
## 答え
$$c=\frac{0+4}{2}=2.$$
$x<2$ を群1、$x>2$ を群2へ分類する。
## 計算例
$x=3$ は群2へ分類される。
## 注意
事前確率や誤分類損失が異なれば境界は中点から移動する。

<!-- CARD -->

---
id: engmv-fisher-discriminant-direction
title: フィッシャーの判別方向から分類境界まで計算する
category: applied-engineering
subcategory: engineering-multivariate
topic: fisher-linear-discriminant
type: calc_step
difficulty: 3
priority: B
hashtags:
  - フィッシャーの線形判別
  - 判別分析
  - 分散共分散行列
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: フィッシャーの線形判別
archive_reason: duplicate
canonical_card: mv-lda-direction
archive_note: Fisher方向Sigma^{-1}(mu1-mu0)は共通canonicalの中心操作。分類境界の役割はLDA分類canonical側で保持している。
---
## 問題
2群の平均が $\boldsymbol\mu_1=(2,1)^\top$、$\boldsymbol\mu_2=(0,0)^\top$、群内分散共分散行列が $S_W=\operatorname{diag}(4,1)$ である。フィッシャーの判別方向と、等事前確率での射影得点の中点境界を求めよ。
## 記号・用語
判別方向は定数倍まで同じ方向とみなす。射影得点は $z=\boldsymbol w^\top\boldsymbol x$ である。
## 使用公式・定理
**フィッシャーの判別方向**：$\boldsymbol w\propto S_W^{-1}(\boldsymbol\mu_1-\boldsymbol\mu_2)$。
## 一手／方針
判別方向を求め、2つの群平均を射影して中点を取る。
## 答え
$$\boldsymbol w\propto\begin{pmatrix}1/4&0\\0&1\end{pmatrix}\begin{pmatrix}2\\1\end{pmatrix}=\begin{pmatrix}0.5\\1\end{pmatrix}.$$
射影平均は $m_1=(0.5,1)(2,1)^\top=2$、$m_2=0$ なので境界は $(2+0)/2=1$。$\boldsymbol w^\top\boldsymbol x>1$ なら群1側と判定する。
## 計算例
$\boldsymbol x=(1,1)^\top$ の得点は $1.5>1$ なので群1へ分類する。
## 注意
$S_W$ が可逆であることが必要である。

<!-- CARD -->

---
id: engmv-lda-prior-probability
title: 事前確率を含む線形判別得点を比較する
category: applied-engineering
subcategory: engineering-multivariate
topic: lda-priors
type: calc_step
difficulty: 3
priority: B
hashtags:
  - 判別分析
  - 事前確率
  - 線形判別
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 判別分析
archive_reason: duplicate
canonical_card: mv-lda-classification-rule
archive_note: 事前確率0.8/0.2を含む判別得点の数値比較をcanonicalへ吸収済み。
---
## 問題
各群が1変量正規分布に従い、共通分散1、$\mu_1=0,\mu_2=2$、事前確率 $\pi_1=0.8,\pi_2=0.2$、誤分類損失は等しいとする。$x=1$ の線形判別得点を比較せよ。
## 記号・用語
$\delta_k(x)$ は群 $k$ の対数事後確率に共通定数を除いた判別得点である。
## 使用公式・定理
**共通分散の判別得点**：$\delta_k(x)=x\mu_k-\mu_k^2/2+\log\pi_k$。
## 一手／方針
各群の平均と事前確率を得点式へ代入する。
## 答え
$$\delta_1(1)=\log0.8\approx-0.223,$$
$$\delta_2(1)=2-2+\log0.2\approx-1.609.$$
よって $x=1$ は群1へ分類する。
## 計算例
平均の中点でも、事前確率の大きい群1が選ばれる。
## 注意
事前確率を無視すると少数群を過剰に選ぶ場合がある。

<!-- CARD -->

---
id: engmv-lda-pooled-covariance
title: 2群のプールした分散共分散行列を計算する
category: applied-engineering
subcategory: engineering-multivariate
topic: pooled-covariance
type: calc_step
difficulty: 2
priority: B
hashtags:
  - 判別分析
  - プール分散
  - 分散共分散行列
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 判別分析
archive_reason: duplicate
canonical_card: mv-lda-classification-rule
archive_note: 自由度加重のプール分散共分散行列とdiag(25/8,23/8)の数値計算をcanonicalへ吸収済み。
---
## 問題
$n_1=6,n_2=4$、$S_1=\operatorname{diag}(2,4)$、$S_2=\operatorname{diag}(5,1)$ のときプールした分散共分散行列を求めよ。
## 記号・用語
$S_1,S_2$ は各群で分母 $n_k-1$ を用いた不偏標本分散共分散行列である。
## 使用公式・定理
$$S_p=\frac{(n_1-1)S_1+(n_2-1)S_2}{n_1+n_2-2}.$$
## 一手／方針
各群の行列を自由度で重み付けし、総自由度で割る。
## 答え
$$S_p=\frac{5\operatorname{diag}(2,4)+3\operatorname{diag}(5,1)}8=\operatorname{diag}(25/8,23/8).$$
## 計算例
第1成分は $(10+15)/8=25/8$ である。
## 注意
単純平均 $(S_1+S_2)/2$ ではなく自由度加重平均を使う。

<!-- CARD -->

---
id: engmv-single-linkage-update
title: 最短距離法のクラスター間距離を更新する
category: applied-engineering
subcategory: engineering-multivariate
topic: hierarchical-clustering
type: calc_step
difficulty: 2
priority: B
hashtags:
  - クラスター分析
  - 階層法
  - 最短距離法
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: クラスタリング：階層法
archive_reason: duplicate
canonical_card: mv-hierarchical-linkage
archive_note: 単連結法のクラスタ間距離=minという同一操作を共通canonicalが扱う。
---
## 問題
点AとBを併合した。$d(A,C)=4$、$d(B,C)=2$ のとき、最短距離法による $d(AB,C)$ を求めよ。
## 記号・用語
最短距離法は2クラスターに属する点対の最小距離をクラスター間距離とする。
## 使用公式・定理
$$d(A\cup B,C)=\min\{d(A,C),d(B,C)\}.$$
## 一手／方針
併合前の2距離の小さい方を選ぶ。
## 答え
$$d(AB,C)=\min(4,2)=2.$$
## 計算例
点が鎖状につながるデータでは早く大きなクラスターになりやすい。
## 注意
最短距離法には chaining と呼ばれる鎖状効果がある。

<!-- CARD -->

---
id: engmv-complete-linkage-update
title: 最長距離法のクラスター間距離を更新する
category: applied-engineering
subcategory: engineering-multivariate
topic: hierarchical-clustering
type: calc_step
difficulty: 2
priority: B
hashtags:
  - クラスター分析
  - 階層法
  - 最長距離法
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: クラスタリング：階層法
archive_reason: duplicate
canonical_card: mv-hierarchical-linkage
archive_note: 完全連結法のクラスタ間距離=maxという同一操作を共通canonicalが扱う。
---
## 問題
点AとBを併合した。$d(A,C)=4$、$d(B,C)=2$ のとき、最長距離法による $d(AB,C)$ を求めよ。
## 記号・用語
最長距離法は2クラスターに属する点対の最大距離をクラスター間距離とする。
## 使用公式・定理
$$d(A\cup B,C)=\max\{d(A,C),d(B,C)\}.$$
## 一手／方針
併合前の2距離の大きい方を選ぶ。
## 答え
$$d(AB,C)=\max(4,2)=4.$$
## 計算例
最短距離法の更新値2とは異なり、クラスター全体の離れた点を考慮する。
## 注意
一般に最短距離法よりコンパクトなクラスターを作りやすい。

<!-- CARD -->

---
id: engmv-ward-merge-increase
title: Ward法で次に併合するクラスター対を選ぶ
category: applied-engineering
subcategory: engineering-multivariate
topic: ward-method
type: calc_step
difficulty: 3
priority: B
hashtags:
  - クラスター分析
  - Ward法
  - 平方和
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: クラスタリング：階層法
archive_reason: duplicate
canonical_card: mv-ward-increase
archive_note: Ward法の併合平方和増加を計算し最小の対を選ぶ操作は共通canonicalの同じ公式に基づく。
---
## 問題
1次元の3クラスターA、B、Cのサイズが $(2,3,1)$、重心が $(1,4,8)$ である。Ward法で次に併合する対を選べ。
## 記号・用語
Ward法は併合後の群内平方和増加が最小の組を併合する。
## 使用公式・定理
$$\Delta(A,B)=\frac{n_An_B}{n_A+n_B}\|\bar{\boldsymbol x}_A-\bar{\boldsymbol x}_B\|^2.$$
## 一手／方針
3つの候補対について平方和増加を計算し、最小の対を選ぶ。
## 答え
$$\Delta(A,B)=\frac{2\cdot3}{5}(1-4)^2=10.8,$$
$$\Delta(A,C)=\frac{2\cdot1}{3}(1-8)^2\approx32.67,$$
$$\Delta(B,C)=\frac{3\cdot1}{4}(4-8)^2=12.$$
最小は $\Delta(A,B)$ なのでAとBを併合する。
## 計算例
重心距離だけならA--Bが3、B--Cが4だが、Ward法ではサイズ補正も含めて比較する。
## 注意
距離そのものではなく群内平方和の増加を比較する。
