---
id: ms-aic-numeric-comparison
title: 対数尤度と母数数からAICを計算して比較する
category: math-estimation
subcategory: math-model-selection
topic: aic-numeric-comparison
type: calc_step
difficulty: 2
priority: S
hashtags:
  - AIC
  - 対数尤度
  - モデル選択
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 赤池情報量規準
archive_reason: duplicate
canonical_card: ms-bic-numeric-comparison
archive_note: AICとBICの式・罰則差・数値比較を同じcanonicalへ統合済み。
---
## 問題
モデルAは最大対数尤度 $-120$、推定母数数3、モデルBは最大対数尤度 $-117.5$、推定母数数6である。AICで選択せよ。

## 答え
$$\operatorname{AIC}_A=246,\qquad \operatorname{AIC}_B=247.$$
小さいモデルAを選ぶ。

## 使用公式・定理
$$\operatorname{AIC}=-2\ell(\widehat\theta)+2k,$$
ここで $k$ は推定した自由母数の個数である。AICは小さいほどよい。

## 計算例
$$\operatorname{AIC}_A=-2(-120)+2(3)=240+6=246,$$
$$\operatorname{AIC}_B=-2(-117.5)+2(6)=235+12=247.$$
Bは当てはまりの項を5改善したが、罰則が6増えたため総合的にはAが1だけ小さい。

## 一手
対数尤度は大きいほどよいが、AICへ変換した後は小さい方を選ぶ。

## 注意
全モデルで同じデータと同じ尤度の定義を使って比較する。

<!-- CARD -->

---
id: reg-mallows-cp
title: MallowsのCpを計算する
category: applied-common
subcategory: applied-multiple-regression
topic: mallows-cp
type: calc_step
difficulty: 3
priority: B
hashtags:
  - 変数選択
  - MallowsのCp
  - モデル比較
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 変数選択
archive_reason: duplicate
canonical_card: ms-bic-numeric-comparison
archive_note: MallowsのCpをAIC・BICと同じ「適合度と複雑さの比較」canonicalへ数値例ごと統合済み。
---
## 問題
候補モデルの $SSE_p=80$、完全モデルから得た $\widehat\sigma^2=4$、標本数n=30、候補の切片込み係数数p=6とする。Cpを求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$C_p=SSE_p/\widehat\sigma^2-n+2p$。

## 答え
$$C_p=\frac{SSE_p}{\widehat\sigma^2}-n+2p
=\frac{80}{4}-30+12=2.$$

## 計算例
適切に指定された候補ではCpがp付近となることを目安にする。

## 注意
分散推定値を共通の十分大きいモデルから得る。

<!-- CARD -->

---
id: ms-ridge-regression
title: Ridge回帰（L2正則化）の推定量を書く
category: math-estimation
subcategory: math-model-selection
topic: ridge
type: formula
difficulty: 3
priority: B
hashtags:
  - Ridge回帰
  - L2正則化
  - 多重共線性
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 重回帰モデル
archive_reason: duplicate
canonical_card: ms-ridge-lasso-orthogonal-numeric
archive_note: Ridgeの目的関数から勾配・停留条件・閉形式解までcanonicalへ導出付きで統合済み。
---
## 問題
線形モデル $\boldsymbol Y=\boldsymbol X\boldsymbol\beta+\boldsymbol\varepsilon$ のRidge推定量を定義せよ。$\boldsymbol X$ は $n\times p$、ランク $p$、$\lambda\ge0$。
## 答え
係数の二乗和にペナルティを置いた最小化、または制約付き最小二乗の解法として得る。
## 使用公式・定理
目的関数を
$$Q(\boldsymbol\beta)=\|\boldsymbol Y-\boldsymbol X\boldsymbol\beta\|^2+\lambda\|\boldsymbol\beta\|^2$$
と置く。勾配は
$$\nabla Q(\boldsymbol\beta)
=-2\boldsymbol X^{\mathsf T}(\boldsymbol Y-\boldsymbol X\boldsymbol\beta)+2\lambda\boldsymbol\beta.$$
これを0と置くと
$$\left(\boldsymbol X^{\mathsf T}\boldsymbol X+\lambda\boldsymbol I_p\right)\widehat{\boldsymbol\beta}
=\boldsymbol X^{\mathsf T}\boldsymbol Y,$$
したがって
$$\widehat{\boldsymbol\beta}_{\mathrm{ridge}}
=(\boldsymbol X^{\mathsf T}\boldsymbol X+\lambda\boldsymbol I_p)^{-1}\boldsymbol X^{\mathsf T}\boldsymbol Y.$$
## 計算例
$p=2$、$\boldsymbol X^{\mathsf T}\boldsymbol X=\begin{pmatrix}1&0.99\\0.99&1\end{pmatrix}$、$\lambda=0.1$ なら $\boldsymbol X^{\mathsf T}\boldsymbol X+\lambda\boldsymbol I=\begin{pmatrix}1.1&0.99\\0.99&1.1\end{pmatrix}$ となり逆行列が安定する。
## 注意
$\lambda=0$ は最小二乗法推定量に一致する。$\lambda\to\infty$ で、ペナルティ対象の係数は $\boldsymbol0$ へ収束する。通常は説明変数を標準化し、切片はペナルティから除く。

<!-- CARD -->

---
id: ms-lasso-regression
title: Lasso回帰（L1正則化）の推定量を書く
category: math-estimation
subcategory: math-model-selection
topic: lasso
type: formula
difficulty: 3
priority: B
hashtags:
  - Lasso回帰
  - L1正則化
  - 変数選択
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: L1正則化法
archive_reason: duplicate
canonical_card: ms-ridge-lasso-orthogonal-numeric
archive_note: LassoのL1目的関数、直交設計のsoft-thresholding、KKTによる零化条件までcanonicalへ統合済み。
---
## 問題
線形モデルのLasso推定量を定義せよ。ペナルティはL1ノルム。
## 答え
係数の絶対値和にペナルティを置く最小化問題として得る。
## 使用公式・定理
$\widehat{\boldsymbol\beta}_{\mathrm{lasso}}=\arg\min_{\boldsymbol\beta}\left\{\sum_{i=1}^n(Y_i-\boldsymbol x_i^{\mathsf T}\boldsymbol\beta)^2+\lambda\sum_{j=1}^p|\beta_j|\right\}$。
## 計算例
$\lambda=1$、$p=3$ なら $\sum|\beta_j|\le s$ の菱形領域で二乗誤差を最小化する。$\beta_2,\beta_3$ がちょうど0になることがある。
## 注意
$\lambda$ が大きいと多くの係数が0になる。通常は説明変数を標準化し、切片はペナルティから除く。

<!-- CARD -->

---
id: ms-l1-l2-difference
title: L1とL2正則化の違い（スパース性）を説明する
category: math-estimation
subcategory: math-model-selection
topic: l1-l2-difference
type: recognition
difficulty: 2
priority: C
hashtags:
  - L1正則化
  - L2正則化
  - スパース性
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: L1正則化法
archive_reason: duplicate
canonical_card: ms-ridge-lasso-orthogonal-numeric
archive_note: L2の連続縮小とL1の零化を制約境界の違いと合わせてcanonicalの一手・注意へ統合済み。
---
## 問題
Lasso（L1）とRidge（L2）の制約領域の形の違いが、なぜLassoだけ変数選択（スパース性）を生むか説明せよ。
## 答え
L1の制約領域は頂点が軸上にある菱形で、最小化が頂点に留まると係数がぴったり0になる。L2は滑らかな楕円で0にならない。
## 使用公式・定理
L1は $\sum_j|\beta_j|\le s$、L2は $\sum_j\beta_j^2\le s$。
## 計算例
等高線が菱形の角 $(0,\beta_2^*)$ を通ると $\beta_1=0$ となる。Ridgeの円では境界上の点は通常非零。
## 注意
相関の強い変数間ではLassoは片方を選びうる。

<!-- CARD -->

---
id: reg-ridge-svd-shrinkage
title: Ridgeの固有方向別縮小率を計算する
category: applied-common
subcategory: applied-multiple-regression
topic: ridge-svd
type: calc_step
difficulty: 4
priority: B
hashtags:
  - Ridge回帰
  - 特異値分解
  - 多重共線性
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 多重共線性
archive_reason: duplicate
canonical_card: ms-ridge-lasso-orthogonal-numeric
archive_note: SVD方向の縮小率 d_j^2/(d_j^2+lambda) と d=2, lambda=3 の4/7計算をcanonicalへ吸収済み。
---
## 問題
デザイン行列の特異値が $d=2$、Ridge罰則が $\lambda=3$ の方向について、最小二乗係数に対する縮小率を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

特異値分解ではRidgeは各右特異ベクトル方向を $d_j^2/(d_j^2+\lambda)$ 倍に縮小する。

## 答え
$$\frac{d^2}{d^2+\lambda}=\frac4{4+3}=\frac47.$$

## 計算例
小さい特異値方向ほど強く縮小される。

## 注意
分散低下と引換えにバイアスを導入する。
