---
id: mv-pca-software-output
title: 主成分分析の固有値・負荷量出力を解釈する
category: applied-common
subcategory: applied-multivariate
topic: pca-software-output
type: calc_step
difficulty: 3
priority: A
hashtags:
  - 主成分分析
  - ソフトウェア出力
  - 主成分負荷量
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ソフトウェア出力結果の解釈
archive_reason: duplicate
canonical_card: mv-pca-variance-max
archive_note: 固有値から寄与率を計算し、固有ベクトルから主成分軸・得点を解釈する内容をPCA正本へ統合済み。
---
## 問題
標準化主成分分析の出力で固有値が2.4,0.5,0.1、第1主成分の固有ベクトルが $(0.70,0.68,0.22)^{\mathsf T}$ だった。第1主成分の寄与率と解釈を述べよ。

## 記号・用語
- PCA：主成分分析（principal component analysis）

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

寄与率は固有値を固有値総和で割る。主成分得点は固有ベクトルと標準化観測の内積。

## 一手
主成分分析の出力では、まず**固有値 / 固有値総和**で寄与率を計算し、その後に固有ベクトルの成分から主成分軸の意味を読む。

## 答え
第1主成分の寄与率は
$$
\frac{2.4}{2.4+0.5+0.1}=0.80.
$$
よって第1主成分だけで全標準化分散の80%を表す。第1・第2変数に同方向の大きな重み、第3変数に小さな重みを置く軸である。

## 計算例
まず固有値の総和は
$$
2.4+0.5+0.1=3.0.
$$
したがって第1主成分の寄与率は
$$
\begin{aligned}
\text{寄与率}
&=\frac{2.4}{3.0}\\
&=0.80.
\end{aligned}
$$
次に、標準化された1つの観測を
$$
\boldsymbol z
=\begin{pmatrix}1\\-1\\0.5\end{pmatrix}
$$
とすると、第1主成分得点は固有ベクトルとの内積だから
$$
\begin{aligned}
z_{\mathrm{PC1}}
&=0.70(1)+0.68(-1)+0.22(0.5)\\
&=0.70-0.68+0.11\\
&=0.13.
\end{aligned}
$$
固有ベクトル全体の符号を反転すると得点も $-0.13$ になるが、表す主成分軸そのものは同じである。

## 注意
固有ベクトル成分と変数・主成分間相関を区別する。

<!-- CARD -->

---
id: mv-pca-loading
title: 主成分負荷量を固有値から求める
category: applied-common
subcategory: applied-multivariate
topic: pca-loading
type: calc_step
difficulty: 3
priority: B
hashtags:
  - 主成分分析
  - 主成分負荷量
  - 相関
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 主成分負荷量
archive_reason: duplicate
canonical_card: mv-pca-variance-max
archive_note: 主成分負荷量を変数と主成分の相関として導く式と数値例をPCA正本へ統合済み。
---
## 問題
共分散主成分分析で固有値 $\lambda_j=4$、固有ベクトルのk成分 $a_{kj}=0.3$、元変数の標準偏差 $s_k=1.5$。$X_k$ と主成分jの相関を求めよ。

## 記号・用語
- PCA：主成分分析（principal component analysis）

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$\operatorname{Cov}(X_k,Z_j)=\lambda_ja_{kj}$、$\operatorname{SD}(Z_j)=\sqrt{\lambda_j}$。

## 答え
$$\operatorname{Corr}(X_k,Z_j)=\frac{\sqrt{\lambda_j}a_{kj}}{s_k}
=\frac{2(0.3)}{1.5}=0.4.$$

## 計算例
相関を負荷量と呼ぶ規約を採用した。

## 注意
文献により固有ベクトル成分自体を負荷量と呼ぶ。

<!-- CARD -->

---
id: mv-pca-covariance-vs-correlation
title: 共分散PCAと相関PCAを選び、標準化PCAを計算する
category: applied-common
subcategory: applied-multivariate
topic: standardized-pca
type: recognition
difficulty: 2
priority: B
hashtags:
  - 主成分分析
  - 標準化PCA
  - 相関行列
  - 寄与率
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 標準化主成分分析と相関行列
archive_reason: duplicate
canonical_card: mv-pca-variance-max
archive_note: 共分散PCAと相関PCAの使い分け、標準化、相関行列の固有値計算と寄与率をPCA正本へ統合済み。
---
## 問題
測定単位や分散が大きく異なる変数群では、分散共分散行列と相関行列のどちらで主成分分析を行うべきか。

## 記号・用語
- PCA：主成分分析（principal component analysis）

## 使用公式・定理
標準化変数
$$
Z_j=\frac{X_j-\bar X_j}{s_j}
$$
の分散共分散行列は相関行列 $\boldsymbol R$ である。したがって相関PCAでは $\boldsymbol R$ の固有値・固有ベクトルを使う。

固有値を $\lambda_1\ge\cdots\ge\lambda_p$ とすると第 $j$ 主成分の寄与率は
$$
\frac{\lambda_j}{\sum_{r=1}^{p}\lambda_r}.
$$

## 一手
単位・分散の大きさ自体を重視するなら共分散PCA、尺度差を消して相関構造を重視するなら相関PCAを選ぶ。相関PCAでも計算自体は「最大固有値と固有ベクトルを求める」同じ操作である。

## 答え
尺度差に科学的意味がなければ、標準化して相関行列PCAを使うのが基本である。ただし標準化が常に正しいわけではない。

## 計算例
$$
\boldsymbol R=
\begin{pmatrix}1&0.8\\0.8&1\end{pmatrix}
$$
とする。対角が等しいので和方向・差方向が固有ベクトルとなり、固有値は
$$
\lambda_1=1+0.8=1.8,
\qquad
\lambda_2=1-0.8=0.2.
$$
第1主成分方向は
$$
\boldsymbol a_1=\frac1{\sqrt2}(1,1)^{\mathsf T},
$$
したがって
$$
Y_1=\frac{Z_1+Z_2}{\sqrt2}.
$$
寄与率は
$$
\frac{1.8}{1.8+0.2}=0.9.
$$
よって第1主成分だけで標準化後の全分散の90%を説明する。

## 注意
共分散PCAは測定単位の変更で結果が変わり得る。相関PCAは各変数を分散1へ標準化してから行うため、変数間の尺度差を除いて比較する。
