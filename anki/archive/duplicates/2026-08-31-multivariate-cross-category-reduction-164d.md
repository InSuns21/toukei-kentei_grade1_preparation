---
id: engmv-correlation-from-covariance
title: 分散共分散行列を相関行列へ標準化し単位変更不変性を確認する
category: applied-engineering
subcategory: engineering-multivariate
topic: covariance-to-correlation-canonical
type: calc_step
difficulty: 2
priority: B
hashtags:
  - 相関行列
  - 分散共分散行列
  - 標準化
  - 単位変換
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 相関行列
archive_reason: duplicate
canonical_card: mv-covariance-linear-transform
coverage_card: mv-covariance-linear-transform
archive_note: 分散共分散行列から相関行列への標準化、正の単位変更で相関が不変になる数値例、負の尺度変換で符号が反転する注意まで、線形変換canonical
  cardへ統合済み。engineering-multivariateの相関行列coverageもこの正本へ明示的に付け替える。
---
## 問題
分散共分散行列
$$
\boldsymbol\Sigma=
\begin{pmatrix}4&3\\3&9\end{pmatrix}
$$
から相関行列を求めよ。

さらに正の単位変更
$$
Y_1=10X_1,\qquad Y_2=100X_2
$$
を行った後も相関係数が変わらないことを数値で示せ。

## 記号・用語
$\sigma_i=\sqrt{\sigma_{ii}}$ は第 $i$ 変数の標準偏差、$\rho_{ij}$ は相関係数である。
## 使用公式・定理
$\sigma_i^2=\Sigma_{ii}$ とすると
$$
\rho_{ij}
=\frac{\Sigma_{ij}}{\sigma_i\sigma_j}
=\frac{\Sigma_{ij}}{\sqrt{\Sigma_{ii}\Sigma_{jj}}}.
$$
$\boldsymbol D=\operatorname{diag}(\Sigma_{11},\ldots,\Sigma_{pp})$ とすれば
$$
\boldsymbol R
=\boldsymbol D^{-1/2}\boldsymbol\Sigma\boldsymbol D^{-1/2}.
$$

線形変換 $\boldsymbol Y=\boldsymbol A\boldsymbol X$ では
$$
\operatorname{Cov}(\boldsymbol Y)
=\boldsymbol A\boldsymbol\Sigma\boldsymbol A^{\mathsf T}.
$$

## 一手／方針
各共分散を対応する2標準偏差の積で割る。

## 一手
**共分散を対応する2つの標準偏差で割る。** 単位変更では共分散も標準偏差の積も同じ倍率で変わるため、正の尺度変換なら比が相殺される。

## 答え
元の標準偏差は $\sigma_1=2$、$\sigma_2=3$ なので
$$
\rho_{12}=\frac3{2\cdot3}=0.5,
$$
$$
\boldsymbol R=
\begin{pmatrix}1&0.5\\0.5&1\end{pmatrix}.
$$

単位変更後は
$$
\boldsymbol\Sigma_Y
=\begin{pmatrix}400&3000\\3000&90000\end{pmatrix},
$$
したがって
$$
\rho_Y
=\frac{3000}{\sqrt{400\cdot90000}}
=0.5.
$$

## 計算例
$\boldsymbol A=\operatorname{diag}(10,100)$ とすると
$$
\begin{aligned}
\boldsymbol\Sigma_Y
&=\boldsymbol A\boldsymbol\Sigma\boldsymbol A^{\mathsf T}\\
&=
\begin{pmatrix}10&0\\0&100\end{pmatrix}
\begin{pmatrix}4&3\\3&9\end{pmatrix}
\begin{pmatrix}10&0\\0&100\end{pmatrix}\\
&=\begin{pmatrix}400&3000\\3000&90000\end{pmatrix}.
\end{aligned}
$$
変換後の標準偏差は20と300なので
$$
\frac{3000}{20\cdot300}=\frac12.
$$
共分散は1000倍、標準偏差の積も1000倍になり相殺される。

## 注意
正の単位換算では相関は不変である。一方、一方の変数だけを負の定数倍すると相関の符号は反転する。相関行列の対角成分は常に1である。

<!-- CARD -->

---
id: engmv-spectral-reconstruction
title: 固有値分解から分散共分散行列を再構成する
category: applied-engineering
subcategory: engineering-multivariate
topic: spectral-decomposition
type: calc_step
difficulty: 3
priority: B
hashtags:
  - 固有値
  - 固有ベクトル
  - スペクトル分解
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
coverage_card: mv-pca-variance-max
archive_note: 直交固有値分解Sigma=U Lambda U^Tと固有対からの2次元分散共分散行列再構成、低次元近似で捨てる分散の解釈までPCA
  canonical cardへ統合済み。固有値・固有ベクトルcoverageも正本へ明示的に付け替える。
---
## 問題
固有値が $3,1$、対応する単位固有ベクトルが $\boldsymbol v_1=(1,1)^\top/\sqrt2$、$\boldsymbol v_2=(1,-1)^\top/\sqrt2$ の対称行列を再構成せよ。
## 記号・用語
直交行列 $V=(\boldsymbol v_1,\boldsymbol v_2)$、対角行列 $\Lambda=\operatorname{diag}(3,1)$ とする。
## 使用公式・定理
**実対称行列のスペクトル分解**：$\Sigma=V\Lambda V^\top=\sum_j\lambda_j\boldsymbol v_j\boldsymbol v_j^\top$。
## 一手／方針
各固有ベクトルの外積を固有値倍して足す。
## 答え
$$\Sigma=\frac32\begin{pmatrix}1&1\\1&1\end{pmatrix}+\frac12\begin{pmatrix}1&-1\\-1&1\end{pmatrix}=\begin{pmatrix}2&1\\1&2\end{pmatrix}.$$
## 計算例
固有値の和4が再構成行列のトレース4に一致する。
## 注意
固有ベクトルは互いに直交し、長さ1に正規化して用いる。

<!-- CARD -->

---
id: engmv-silhouette-coefficient
title: silhouette係数を計算する
category: applied-engineering
subcategory: engineering-multivariate
topic: clustering-evaluation
type: calc_step
difficulty: 2
priority: B
hashtags:
  - クラスター分析
  - silhouette係数
  - クラスター評価
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: クラスタリング
archive_reason: duplicate
canonical_card: mv-hierarchical-linkage
coverage_card: mv-hierarchical-linkage
archive_note: silhouette係数s=(b-a)/max(a,b)、a=2,b=5でs=0.6の数値例と値の解釈を、連結法・Ward法からクラスタ評価まで通すcanonical
  cardへ統合済み。該当coverageがあれば正本へ付け替える。
---
## 問題
ある点の同一クラスター内平均距離が $a=2$、最も近い別クラスターへの平均距離が $b=5$ のときsilhouette係数を求めよ。
## 記号・用語
$a$ は凝集度、$b$ は最も近い他クラスターからの分離度である。
## 使用公式・定理
$$s=\frac{b-a}{\max(a,b)},\qquad -1\le s\le1.$$
## 一手／方針
分離度と凝集度の差を大きい方で標準化する。
## 答え
$$s=\frac{5-2}{5}=0.6.$$
## 計算例
1に近いほど現在の割当が適切、負なら別クラスターの方が近い可能性がある。
## 注意
単独点クラスターの扱いは実装規約を確認する。

<!-- CARD -->

---
id: mv-mahalanobis-distance
title: Mahalanobis距離を計算する
category: applied-common
subcategory: applied-multivariate
topic: mahalanobis-distance
type: calc_step
difficulty: 3
priority: B
hashtags:
  - Mahalanobis距離
  - 分散共分散行列
  - 外れ値
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: Mahalanobis距離
archive_reason: duplicate
canonical_card: engmv-mahalanobis-control-limit
coverage_card: engmv-mahalanobis-control-limit
archive_note: Mahalanobis二乗距離の定義・逆分散共分散行列による標準化・数値計算は、正規ベクトルのカイ二乗二次形式から個体管理限界と平均ベクトル信頼楕円まで扱う上位canonical
  cardに包含されている。一般多変量側coverageもこの正本へ付け替える。
---
## 問題
$\boldsymbol x-\boldsymbol\mu=(2,1)^{\mathsf T}$、$\boldsymbol\Sigma=\operatorname{diag}(4,1)$ のときMahalanobis距離を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

分散の大きい方向の差を小さく重み付けする。

## 答え
$$d^2=(\boldsymbol x-\boldsymbol\mu)^{\mathsf T}\boldsymbol\Sigma^{-1}(\boldsymbol x-\boldsymbol\mu)
=\frac{2^2}{4}+\frac{1^2}{1}=2,$$
よって $d=\sqrt2$。

## 計算例
標準化座標ではEuclid距離になる。

## 注意
分散共分散行列の可逆性が必要。
