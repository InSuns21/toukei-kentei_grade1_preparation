---
id: engmv-sample-mean-vector
title: 標本平均ベクトルを計算する
category: applied-engineering
subcategory: engineering-multivariate
topic: mean-vector
type: calc_step
difficulty: 1
priority: B
hashtags:
  - 平均ベクトル
  - 標本平均
  - 数値計算
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 平均ベクトル
archive_reason: duplicate
canonical_card: mv-mean-covariance-numeric
archive_note: 標本平均ベクトルは標本分散共分散行列まで同じ標本から外積で計算するcanonicalへ統合済み。
---
## 問題
3個の2変量観測 $(1,2)^\top,(3,4)^\top,(5,0)^\top$ の標本平均ベクトルを求めよ。
## 記号・用語
$\boldsymbol x_i$ は第 $i$ 観測、$\bar{\boldsymbol x}$ は標本平均ベクトルである。
## 使用公式・定理
**標本平均ベクトル**：
$$\bar{\boldsymbol x}=\frac1n\sum_{i=1}^n\boldsymbol x_i.$$
## 一手／方針
成分ごとに標本平均を計算する。
## 答え
$$\bar{\boldsymbol x}=\frac13\left\{\begin{pmatrix}1\\2\end{pmatrix}+\begin{pmatrix}3\\4\end{pmatrix}+\begin{pmatrix}5\\0\end{pmatrix}\right\}=\begin{pmatrix}3\\2\end{pmatrix}.$$
## 計算例
第1成分は $(1+3+5)/3=3$、第2成分は $(2+4+0)/3=2$ である。
## 注意
平均ベクトルの次元は各観測ベクトルの次元と同じである。

<!-- CARD -->

---
id: engmv-sample-covariance-matrix
title: 標本分散共分散行列を計算する
category: applied-engineering
subcategory: engineering-multivariate
topic: covariance-matrix
type: calc_step
difficulty: 3
priority: A
hashtags:
  - 分散共分散行列
  - 標本共分散
  - 数値計算
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 分散共分散行列
archive_reason: duplicate
canonical_card: mv-mean-covariance-numeric
archive_note: 平均ベクトル→偏差ベクトル→外積和→不偏標本分散共分散行列の計算をcanonicalが行単位で扱う。
---
## 問題
観測 $(1,2)^\top,(3,4)^\top,(5,0)^\top$ の不偏標本分散共分散行列を求めよ。
## 記号・用語
$S$ は分母 $n-1$ の不偏標本分散共分散行列、$\bar{\boldsymbol x}$ は標本平均ベクトルである。
## 使用公式・定理
**不偏標本分散共分散行列**：
$$S=\frac1{n-1}\sum_{i=1}^n(\boldsymbol x_i-\bar{\boldsymbol x})(\boldsymbol x_i-\bar{\boldsymbol x})^\top.$$
## 一手／方針
各偏差ベクトルの外積を作って足し、最後に $n-1$ で割る。
## 答え
$\bar{\boldsymbol x}=(3,2)^\top$、偏差は $(-2,0)^\top,(0,2)^\top,(2,-2)^\top$ だから、外積和は
$$\begin{pmatrix}4&0\\0&0\end{pmatrix}+\begin{pmatrix}0&0\\0&4\end{pmatrix}+\begin{pmatrix}4&-4\\-4&4\end{pmatrix}=\begin{pmatrix}8&-4\\-4&8\end{pmatrix}.$$
よって
$$S=\begin{pmatrix}4&-2\\-2&4\end{pmatrix}.$$
## 計算例
対角成分4が各変数の不偏標本分散、非対角成分 $-2$ が標本共分散である。
## 注意
最尤推定量の分母は $n$、不偏推定量の分母は $n-1$ である。

<!-- CARD -->

---
id: engmv-covariance-matrix-validity
title: 2次の行列が分散共分散行列になれるか判定する
category: applied-engineering
subcategory: engineering-multivariate
topic: covariance-matrix-validity
type: calc_step
difficulty: 2
priority: B
hashtags:
  - 分散共分散行列
  - 半正定値
  - 主座小行列式
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 分散共分散行列
archive_reason: duplicate
canonical_card: mv-mean-covariance-numeric
archive_note: 分散共分散行列の必要条件を二次形式=分散として説明する同一subcategoryのcanonicalへ統合する。
---
## 問題
$A=\begin{pmatrix}4&3\\3&1\end{pmatrix}$ は分散共分散行列になり得るか。
## 記号・用語
分散共分散行列は対称かつ半正定値、すなわち任意の $\boldsymbol a$ で $\boldsymbol a^\top A\boldsymbol a\ge0$ を満たす必要がある。
## 使用公式・定理
**2次対称行列の半正定値条件**：対角成分が非負で、行列式が非負である。
## 一手／方針
対称性と対角成分を確認し、行列式を計算する。
## 答え
$A$ は対称で対角成分も正だが
$$|A|=4\cdot1-3^2=-5<0.$$
よって半正定値でなく、分散共分散行列にはなれない。
## 計算例
$\boldsymbol a=(1,-2)^\top$ なら $\boldsymbol a^\top A\boldsymbol a=-4<0$ となり、分散として不可能である。
## 注意
対角成分が正というだけでは不十分である。

<!-- CARD -->

---
id: engmv-eigenvalues-covariance-2x2
title: 2次の分散共分散行列の固有値を計算する
category: applied-engineering
subcategory: engineering-multivariate
topic: eigenvalues
type: calc_step
difficulty: 2
priority: B
hashtags:
  - 固有値
  - 分散共分散行列
  - 主成分分析
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 固有値・固有ベクトル
archive_reason: duplicate
canonical_card: mv-pca-variance-max
archive_note: 2x2特性方程式から固有値を求める操作はPCA分散最大化canonicalの数値例で実施済み。
---
## 問題
$\Sigma=\begin{pmatrix}2&1\\1&2\end{pmatrix}$ の固有値を求めよ。
## 記号・用語
固有値 $\lambda$ は $|\Sigma-\lambda I|=0$ を満たす数である。
## 使用公式・定理
**特性方程式**：
$$|\Sigma-\lambda I|=0.$$
## 一手／方針
2次の行列式を展開し、得られた二次方程式を解く。
## 答え
$$\left|\begin{matrix}2-\lambda&1\\1&2-\lambda\end{matrix}\right|=(2-\lambda)^2-1=0,$$
したがって
$$\lambda_1=3,\qquad \lambda_2=1.$$
## 計算例
固有値の和 $3+1=4$ は $\operatorname{tr}(\Sigma)=4$、積 $3$ は $|\Sigma|=3$ に一致する。
## 注意
分散共分散行列の固有値は非負である。

<!-- CARD -->

---
id: engmv-eigenvectors-covariance-2x2
title: 固有ベクトルを正規化する
category: applied-engineering
subcategory: engineering-multivariate
topic: eigenvectors
type: calc_step
difficulty: 2
priority: B
hashtags:
  - 固有ベクトル
  - 分散共分散行列
  - 主成分分析
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 固有値・固有ベクトル
archive_reason: duplicate
canonical_card: mv-pca-variance-max
archive_note: 最大固有値の固有方程式を解き単位長へ正規化する操作までPCA canonicalに統合済み。
---
## 問題
$\Sigma=\begin{pmatrix}2&1\\1&2\end{pmatrix}$ の固有値3に対応する単位固有ベクトルを求めよ。
## 記号・用語
単位固有ベクトル $\boldsymbol v$ は $\Sigma\boldsymbol v=\lambda\boldsymbol v$、$\boldsymbol v^\top\boldsymbol v=1$ を満たす。
## 使用公式・定理
**固有ベクトル方程式**：
$$(\Sigma-\lambda I)\boldsymbol v=\boldsymbol0.$$
## 一手／方針
固有値を代入して成分比を求め、最後に長さ1へ正規化する。
## 答え
$$\begin{pmatrix}-1&1\\1&-1\end{pmatrix}\begin{pmatrix}v_1\\v_2\end{pmatrix}=\boldsymbol0$$
より $v_1=v_2$。したがって単位固有ベクトルの一つは
$$\boldsymbol v_1=\frac1{\sqrt2}\begin{pmatrix}1\\1\end{pmatrix}.$$
## 計算例
符号を反転した $-\boldsymbol v_1$ も同じ固有方向を表す。
## 注意
固有ベクトルは符号まで一意ではない。

<!-- CARD -->

---
id: engmv-pca-loading-numeric
title: 固有値と固有ベクトルから主成分負荷量を計算する
category: applied-engineering
subcategory: engineering-multivariate
topic: pca-loading
type: calc_step
difficulty: 2
priority: B
hashtags:
  - 主成分分析
  - 主成分負荷量
  - 固有値
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 固有値・固有ベクトル
archive_reason: duplicate
canonical_card: mv-pca-variance-max
archive_note: 固有値・固有ベクトル成分・元変数標準偏差から主成分負荷量を求める専用canonicalが存在する。
---
## 問題
第1固有値が $\lambda_1=3$、対応する単位固有ベクトルが $\boldsymbol v_1=(1,1)^\top/\sqrt2$、元変数の標準偏差がともに $\sqrt2$ のとき、各変数と第1主成分の相関を求めよ。
## 記号・用語
$\ell_{i1}=\operatorname{Corr}(X_i,Y_1)$ を第1主成分に対する第 $i$ 変数の主成分負荷量という。
## 使用公式・定理
**主成分負荷量**：$\ell_{ij}=\sqrt{\lambda_j}v_{ij}/\sigma_i$。
## 一手／方針
固有値の平方根、固有ベクトル成分、元変数の標準偏差を代入する。
## 答え
両変数について
$$\ell_{i1}=\frac{\sqrt3(1/\sqrt2)}{\sqrt2}=\frac{\sqrt3}{2}\approx0.866.$$
よって両変数とも第1主成分と強い正の相関をもつ。
## 計算例
主成分係数 $1/\sqrt2$ と主成分負荷量 $0.866$ は異なる量である。
## 注意
文献によって固有ベクトル成分自体を負荷量と呼ぶ流儀もあるため定義を確認する。

<!-- CARD -->

---
id: engmv-pca-monitoring-score
title: 主成分得点で工程観測を要約する
category: applied-engineering
subcategory: engineering-multivariate
topic: pca-score-application
type: calc_step
difficulty: 2
priority: B
hashtags:
  - 主成分分析
  - 主成分得点
  - 工程監視
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 主成分分析
archive_reason: duplicate
canonical_card: mv-pca-variance-max
archive_note: 標準化観測と固有ベクトルの内積による主成分得点の数値計算をcanonicalが既に扱う。
---
## 問題
標準化観測が $(z_1,z_2)=(2,0)$、第1主成分係数が $(1,1)^\top/\sqrt2$ のとき主成分得点を求めよ。
## 記号・用語
主成分得点は中心化または標準化した観測を主成分方向へ射影した値である。
## 使用公式・定理
**主成分得点**：$y_1=\boldsymbol v_1^\top\boldsymbol z$。
## 一手／方針
観測ベクトルと単位固有ベクトルの内積を取る。
## 答え
$$y_1=\frac1{\sqrt2}(2+0)=\sqrt2.$$
## 計算例
第2主成分係数が $(1,-1)^\top/\sqrt2$ なら第2得点も $\sqrt2$。
## 注意
学習時と同じ平均・標準偏差を用いて新観測を標準化する。

<!-- CARD -->

---
id: engmv-factor-covariance-numeric
title: 1因子モデルの分散共分散行列を計算する
category: applied-engineering
subcategory: engineering-multivariate
topic: factor-model-covariance
type: calc_step
difficulty: 3
priority: B
hashtags:
  - 因子分析
  - 因子負荷量
  - 独自性
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 因子分析モデル
archive_reason: duplicate
canonical_card: mv-factor-model-covariance
archive_note: lambda lambda^T + Psi の行列計算例を共通canonicalへ吸収済み。
---
## 問題
1因子モデル $\boldsymbol X=\boldsymbol\lambda F+\boldsymbol\varepsilon$ で、$\boldsymbol\lambda=(0.8,0.6)^\top$、$\operatorname{Var}(F)=1$、$\Psi=\operatorname{diag}(0.36,0.64)$ のとき $\operatorname{Cov}(\boldsymbol X)$ を求めよ。
## 記号・用語
$F$ は共通因子、$\boldsymbol\lambda$ は因子負荷量、$\Psi$ は独自因子の分散共分散行列である。
## 使用公式・定理
**因子分析モデル**：$\operatorname{Cov}(F,\boldsymbol\varepsilon)=0$ の下で $\Sigma=\boldsymbol\lambda\boldsymbol\lambda^\top+\Psi$。
## 一手／方針
負荷量ベクトルの外積を作り、対角の独自分散を足す。
## 答え
$$\boldsymbol\lambda\boldsymbol\lambda^\top=\begin{pmatrix}0.64&0.48\\0.48&0.36\end{pmatrix},$$
$$\Sigma=\begin{pmatrix}1&0.48\\0.48&1\end{pmatrix}.$$
## 計算例
標準化変数なので各対角成分は1になる。
## 注意
共通因子と独自因子の無相関条件が必要である。

<!-- CARD -->

---
id: engmv-factor-communality-numeric
title: 共通性と独自性を負荷量から計算する
category: applied-engineering
subcategory: engineering-multivariate
topic: factor-communality
type: calc_step
difficulty: 2
priority: B
hashtags:
  - 因子分析
  - 共通性
  - 独自性
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 共通性と独自性
archive_reason: duplicate
canonical_card: mv-factor-model-covariance
archive_note: 共通性=負荷量平方和、標準化時の独自性=1-共通性を同じcanonicalで数値計算済み。
---
## 問題
標準化変数 $X_i$ の2因子への負荷量が $(0.7,0.4)$ のとき、共通性と独自性を求めよ。
## 記号・用語
共通性 $h_i^2$ は共通因子で説明される分散、独自性 $\psi_i$ は残りの分散である。
## 使用公式・定理
直交因子モデルで $h_i^2=\sum_j\lambda_{ij}^2$。標準化変数では $\psi_i=1-h_i^2$。
## 一手／方針
因子負荷量を二乗して足し、1から引く。
## 答え
$$h_i^2=0.7^2+0.4^2=0.65,$$
$$\psi_i=1-0.65=0.35.$$
## 計算例
変数分散の65%を2つの共通因子で説明している。
## 注意
斜交因子では単純な負荷量平方和の解釈に注意する。

<!-- CARD -->

---
id: engmv-factor-rotation-invariance
title: 直交回転で共通性が変わらないことを示す
category: applied-engineering
subcategory: engineering-multivariate
topic: factor-rotation
type: calc_step
difficulty: 3
priority: B
hashtags:
  - 因子分析
  - 直交回転
  - 共通性
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 因子回転の考え方
archive_reason: duplicate
canonical_card: mv-factor-model-covariance
archive_note: 直交回転 Lambda*=Lambda T で Lambda*Lambda*^T が不変となる導出をcanonicalが扱う。
---
## 問題
負荷量行列を直交行列 $T$ で $\Lambda^*=\Lambda T$ と回転したとき、共通性が変わらないことを示せ。
## 記号・用語
直交行列は $TT^\top=I$ を満たす。第 $i$ 行の負荷量ベクトルを $\boldsymbol\lambda_i^\top$ とする。
## 使用公式・定理
**直交変換のノルム不変性**：$\|T^\top\boldsymbol a\|^2=\boldsymbol a^\top TT^\top\boldsymbol a=\|\boldsymbol a\|^2$。
## 一手／方針
回転後の第 $i$ 行の平方和を行列積で表す。
## 答え
$$h_i^{*2}=\boldsymbol\lambda_i^\top TT^\top\boldsymbol\lambda_i=\boldsymbol\lambda_i^\top\boldsymbol\lambda_i=h_i^2.$$
## 計算例
回転は各因子への配分を変えるが、共通因子全体で説明する分散は変えない。
## 注意
回転後の因子の意味・順序・符号は一意でない。

<!-- CARD -->

---
id: engmv-qda-quadratic-term
title: 共分散が異なると判別境界が二次になることを確認する
category: applied-engineering
subcategory: engineering-multivariate
topic: quadratic-discriminant-analysis
type: calc_step
difficulty: 3
priority: B
hashtags:
  - 判別分析
  - 二次判別
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
archive_note: 共通共分散なら二次項が消えてLDA、群別共分散なら二次項が残ってQDAになる点を同じ正規判別canonicalへ統合済み。
---
## 問題
1変量正規2群で $(\mu_1,\sigma_1^2)=(0,1)$、$(\mu_2,\sigma_2^2)=(0,4)$、事前確率が等しい。対数判別得点の差に $x^2$ 項が残ることを示せ。
## 記号・用語
群ごとに分散が異なる判別を二次判別分析という。
## 使用公式・定理
定数を除く正規分布の対数密度は $-\log\sigma_k-(x-\mu_k)^2/(2\sigma_k^2)$。
## 一手／方針
2群の対数密度差を取り、$x^2$ の係数を比較する。
## 答え
$$\delta_1(x)-\delta_2(x)=-\log1+\log2-\frac{x^2}{2}+\frac{x^2}{8}$$
$$=\log2-\frac38x^2.$$
$x^2$ 項が残るため境界は線形でない。
## 計算例
境界は $x^2=8\log2/3$、すなわち $|x|\approx1.36$。
## 注意
共通共分散なら二次項が相殺され線形判別になる。

<!-- CARD -->

---
id: engmv-kmeans-assignment
title: k-means法の割当ステップを計算する
category: applied-engineering
subcategory: engineering-multivariate
topic: kmeans-assignment
type: calc_step
difficulty: 2
priority: B
hashtags:
  - k-means法
  - クラスター分析
  - Euclid距離
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: k-means法
archive_reason: duplicate
canonical_card: mv-kmeans-one-iteration
archive_note: 最近傍重心への割当ては、割当て→重心更新を同一目的関数で扱うcanonicalの前半そのもの。
---
## 問題
重心 $\boldsymbol c_1=(0,0)^\top$、$\boldsymbol c_2=(4,2)^\top$ に対し、点 $\boldsymbol x=(3,1)^\top$ を割り当てよ。
## 記号・用語
k-means法の割当ステップでは各点をEuclid距離が最小の重心へ割り当てる。
## 使用公式・定理
**二乗Euclid距離**：$d_k^2=\|\boldsymbol x-\boldsymbol c_k\|^2$。
## 一手／方針
平方根を取らずに2つの二乗距離を比較する。
## 答え
$$d_1^2=3^2+1^2=10,$$
$$d_2^2=(3-4)^2+(1-2)^2=2.$$
よってクラスター2へ割り当てる。
## 計算例
平方根は単調なので距離の大小比較には不要である。
## 注意
変数尺度が大きく異なる場合は標準化を検討する。

<!-- CARD -->

---
id: engmv-kmeans-centroid-update
title: k-means法の重心更新を計算する
category: applied-engineering
subcategory: engineering-multivariate
topic: kmeans-update
type: calc_step
difficulty: 1
priority: B
hashtags:
  - k-means法
  - クラスター分析
  - 重心
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: k-means法
archive_reason: duplicate
canonical_card: mv-kmeans-one-iteration
archive_note: 所属点平均への重心更新は、割当てと一組で同一canonicalに数値計算済み。
---
## 問題
クラスターに $(1,2)^\top,(3,4)^\top,(5,0)^\top$ が割り当てられた。更新後の重心を求めよ。
## 記号・用語
重心はクラスター内の各座標の平均である。
## 使用公式・定理
$$\boldsymbol c=\frac1{|C|}\sum_{\boldsymbol x_i\in C}\boldsymbol x_i.$$
## 一手／方針
クラスター内の各成分を別々に平均する。
## 答え
$$\boldsymbol c=\left(\frac{1+3+5}{3},\frac{2+4+0}{3}\right)^\top=(3,2)^\top.$$
## 計算例
割当と重心更新を、割当が変化しなくなるまで交互に繰り返す。
## 注意
初期重心により局所解が変わるため複数初期値を試す。
