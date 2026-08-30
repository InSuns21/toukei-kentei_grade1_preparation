---
id: engmv-sample-mean-distribution
title: 多変量正規標本の標本平均分布を書く
category: applied-engineering
subcategory: engineering-multivariate
topic: sample-mean-distribution
type: formula
difficulty: 2
priority: B
hashtags:
  - 多変量正規分布
  - 標本平均ベクトル
  - 標本分布
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 平均ベクトル
archive_reason: duplicate
canonical_card: engmv-normal-mean-cov-independence
archive_note: 標本平均の分布と共分散Sigma/nを、Wishart・標本共分散との独立性まで一続きに扱うcanonicalへ統合済み。
---
## 問題
$\boldsymbol X_1,\ldots,\boldsymbol X_n$ が独立に多変量正規分布 $N_p(\boldsymbol\mu,\Sigma)$ に従うとき、標本平均ベクトルの分布を書け。
## 記号・用語
$\bar{\boldsymbol X}=n^{-1}\sum_i\boldsymbol X_i$、$\Sigma$ は正定値な分散共分散行列である。
## 使用公式・定理
**正規分布の再生性と共分散の加法性**を用いる。
## 一手／方針
独立な正規ベクトルの和として平均と分散共分散行列を計算する。
## 答え
$$\bar{\boldsymbol X}\sim N_p\left(\boldsymbol\mu,\frac1n\Sigma\right).$$
## 計算例
$n=4$、$\Sigma=\operatorname{diag}(8,2)$ なら、標本平均の分散共分散行列は $\operatorname{diag}(2,0.5)$。
## 注意
成分間の相関は平均を取っても同じだが、各共分散は $1/n$ 倍になる。

<!-- CARD -->

---
id: engmv-wishart-definition
title: Wishart分布を標本外積和から定義する
category: applied-engineering
subcategory: engineering-multivariate
topic: wishart-distribution
type: formula
difficulty: 3
priority: B
hashtags:
  - Wishart分布
  - 分散共分散行列
  - 標本分布
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 分散共分散行列
archive_reason: duplicate
canonical_card: engmv-normal-mean-cov-independence
archive_note: 正規ベクトル外積和によるWishart定義、p=1でのカイ二乗への帰着までcanonicalへ統合済み。
---
## 問題
Wishart分布を独立な正規ベクトルの外積和として定義せよ。
## 記号・用語
$\boldsymbol Z_i\sim N_p(\boldsymbol0,\Sigma)$ は独立、$\Sigma$ は正定値、$\nu$ は自由度である。
## 使用公式・定理
**定義（Wishart分布）**：
$$W=\sum_{i=1}^{\nu}\boldsymbol Z_i\boldsymbol Z_i^\top\sim W_p(\Sigma,\nu).$$
## 一手／方針
1変量のカイ二乗分布を、正規ベクトルの外積和へ拡張した分布と捉える。
## 答え
$W_p(\Sigma,\nu)$ は $p\times p$ の対称半正定値確率行列の分布である。
## 計算例
$p=1$、$\Sigma=(\sigma^2)$ なら $W/\sigma^2\sim\chi_\nu^2$。
## 注意
密度を持つ正定値行列となるには通常 $\nu\ge p$ が必要である。

<!-- CARD -->

---
id: engmv-wishart-expectation
title: Wishart行列の期待値を計算する
category: applied-engineering
subcategory: engineering-multivariate
topic: wishart-expectation
type: calc_step
difficulty: 2
priority: B
hashtags:
  - Wishart分布
  - 期待値
  - 分散共分散行列
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 分散共分散行列
archive_reason: duplicate
canonical_card: engmv-normal-mean-cov-independence
archive_note: E[W]=nu Sigmaを外積和の期待値から導き、E[S]=Sigmaまで同じcanonicalで確認する。
---
## 問題
$W\sim W_2(\begin{pmatrix}2&1\\1&3\end{pmatrix},5)$ の期待値を求めよ。
## 記号・用語
$W_p(\Sigma,\nu)$ の $\Sigma$ は尺度行列、$\nu$ は自由度である。
## 使用公式・定理
**Wishart分布の期待値**：$E[W]=\nu\Sigma$。
## 一手／方針
尺度行列の各成分を自由度倍する。
## 答え
$$E[W]=5\begin{pmatrix}2&1\\1&3\end{pmatrix}=\begin{pmatrix}10&5\\5&15\end{pmatrix}.$$
## 計算例
外積和の各項の期待値が $E[\boldsymbol Z_i\boldsymbol Z_i^\top]=\Sigma$ なので、5項で $5\Sigma$ となる。
## 注意
尺度行列そのものを期待値と取り違えない。

<!-- CARD -->

---
id: engmv-unit-change-correlation-invariance
title: 単位変換後も相関が不変であることを計算する
category: applied-engineering
subcategory: engineering-multivariate
topic: correlation-unit-invariance
type: calc_step
difficulty: 3
priority: A
hashtags:
  - 分散共分散行列
  - 線形変換
  - 行列計算
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 分散共分散行列
archive_reason: duplicate
canonical_card: mv-covariance-linear-transform
archive_note: 共分散から相関への標準化と正の単位変換で倍率が相殺される数値例を同一canonicalへ統合済み。
---
## 問題
$\operatorname{Cov}(\boldsymbol X)=\begin{pmatrix}4&3\\3&9\end{pmatrix}$ とする。単位変換 $Y_1=10X_1,Y_2=100X_2$ の後も相関係数が変わらないことを数値で示せ。
## 記号・用語
$A=\operatorname{diag}(10,100)$ は単位換算行列、$\boldsymbol Y=A\boldsymbol X$ である。
## 使用公式・定理
**線形変換と相関**：$\Sigma_Y=A\Sigma_XA^\top$、$\rho_{12}=\sigma_{12}/\sqrt{\sigma_{11}\sigma_{22}}$。
## 一手／方針
変換後の分散共分散行列を求め、変換前後の相関係数を比較する。
## 答え
変換前は $\rho_X=3/\sqrt{4\cdot9}=0.5$。変換後は
$$\Sigma_Y=\begin{pmatrix}400&3000\\3000&90000\end{pmatrix},\qquad \rho_Y=\frac{3000}{\sqrt{400\cdot90000}}=0.5.$$
## 計算例
共分散は1000倍、2つの標準偏差の積も1000倍になるため相殺される。
## 注意
2変数の換算係数のうち一方だけが負なら相関の符号が反転し、両方が同符号なら符号は変わらない。

<!-- CARD -->

---
id: engmv-precision-conditional-independence
title: 精度行列から条件付き独立を判定する
category: applied-engineering
subcategory: engineering-multivariate
topic: precision-matrix
type: recognition
difficulty: 3
priority: B
hashtags:
  - 多変量正規分布
  - 精度行列
  - 条件付き独立
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 多変量正規分布
archive_reason: duplicate
canonical_card: engmv-normal-uncorrelated-independent
archive_note: 共分散行列の0による周辺独立と精度行列の0による条件付き独立を一枚で対比するcanonicalへ統合済み。
---
## 問題
多変量正規分布 $\boldsymbol X\sim N_3(\boldsymbol0,\Sigma)$ の精度行列が $\Omega=\Sigma^{-1}=\begin{pmatrix}2&0&1\\0&3&-1\\1&-1&2\end{pmatrix}$ である。$X_1$ と $X_2$ は $X_3$ を条件として独立か。
## 記号・用語
精度行列は分散共分散行列の逆行列である。
## 使用公式・定理
**正規分布の条件付き独立性**：$X_i\perp X_j\mid\boldsymbol X_{-(i,j)}$ と $\Omega_{ij}=0$ は同値である。
## 一手／方針
精度行列の $(1,2)$ 成分が0かを確認する。
## 答え
$\Omega_{12}=0$ なので
$$X_1\perp X_2\mid X_3.$$
## 計算例
$\Omega_{13}=1\ne0$ なので、$X_1$ と $X_3$ は $X_2$ を条件として独立ではない。
## 注意
分散共分散行列の0は周辺独立、精度行列の0は条件付き独立に対応する。

<!-- CARD -->

---
id: engmv-hotelling-two-sample-decision
title: 2標本Hotelling検定をF変換して判定する
category: applied-engineering
subcategory: engineering-multivariate
topic: hotelling-two-sample-test
type: calc_step
difficulty: 4
priority: B
hashtags:
  - HotellingのT二乗検定
  - F分布
  - 仮説検定
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: HotellingのT二乗検定
archive_reason: duplicate
canonical_card: engmv-hotelling-two-sample
archive_note: T二乗計算からF変換・自由度・臨界値比較まで一続きの検定手順としてcanonicalへ統合済み。
---
## 問題
独立な2変量正規2標本で $n_1=n_2=10$、共通共分散を仮定し、$T^2=7.5$ を得た。5%水準で $H_0:\boldsymbol\mu_1=\boldsymbol\mu_2$ を検定せよ。$F_{2,17;0.95}=3.59$ とする。
## 記号・用語
$p=2$ は変量数、$T^2$ は2標本Hotelling統計量である。
## 使用公式・定理
帰無仮説の下で
$$F=\frac{n_1+n_2-p-1}{(n_1+n_2-2)p}T^2\sim F_{p,n_1+n_2-p-1}.$$
## 一手／方針
$T^2$ をF統計量へ変換し、正しい2自由度の臨界値と比較する。
## 答え
$$F=\frac{20-2-1}{(20-2)2}\cdot7.5=\frac{17}{36}\cdot7.5\approx3.542.$$
$3.542<3.59$ なので5%水準では $H_0$ を棄却しない。
## 計算例
統計量は臨界値に近いが、「平均ベクトルが等しいと証明した」とは結論しない。
## 注意
2群の独立性、多変量正規性、共通分散共分散行列、プール共分散の可逆性が必要である。
