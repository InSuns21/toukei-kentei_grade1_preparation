---
id: reg-fitted-residual-numeric
title: 当てはめ値と残差を計算する
category: math-data-analysis
subcategory: math-regression
topic: fitted-residual
type: calc_step
difficulty: 2
priority: S
hashtags:
  - 当てはめ値
  - 残差
  - 回帰
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 残差
archive_reason: duplicate
canonical_card: reg-ols-normal-equations-simple
archive_note: 当てはめ値・残差の数値計算を最小二乗導出と残差直交まで含む正本へ統合済み。
---
## 問題
回帰式 $\widehat y=1+2x$ に対し、観測 $(x,y)=(3,8)$ の当てはめ値と残差を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

残差は観測値から当てはめ値を引く：$e_i=Y_i-\widehat Y_i$。

## 答え
$$\widehat y=1+2\cdot3=7,$$
$$e=y-\widehat y=8-7=1.$$

## 計算例
$x=3$ を回帰式へ代入すると
$$\widehat y=1+2\cdot3=7.$$
残差を「観測値－当てはめ値」と定義すると
$$e=y-\widehat y=8-7=1.$$
正の残差なので観測値は回帰直線より1だけ上にある。

## 注意
誤差 $\varepsilon_i$ は観測不能な確率変数、残差 $e_i$ は推定後に計算される量。

<!-- CARD -->

---
id: reg-residual-orthogonality
title: 最小二乗法残差の直交条件を使う
category: math-data-analysis
subcategory: math-regression
topic: residual-orthogonality
type: calc_step
difficulty: 3
priority: S
hashtags:
  - 残差
  - 正規方程式
  - 直交
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 残差
archive_reason: duplicate
canonical_card: reg-ols-normal-equations-simple
archive_note: 残差の直交条件を正規方程式から導く正本へ統合済み。
---
## 問題
切片を含む最小二乗法で残差が満たす2つの恒等式を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

最小二乗法残差はデザイン行列の列空間に直交する。

## 答え
正規方程式より
$$\sum_i e_i=0,\qquad \sum_i x_ie_i=0.$$
さらに $\widehat Y_i=\widehat\beta_0+\widehat\beta_1x_i$ だから
$$\sum_i\widehat Y_ie_i=\widehat\beta_0\sum_i e_i+\widehat\beta_1\sum_i x_ie_i=0.$$

## 計算例
説明変数が $x=(0,1,2)$、残差が $e=(1,-2,1)$ なら
$$\sum_i e_i=1-2+1=0,$$
$$\sum_i x_ie_i=0\cdot1+1\cdot(-2)+2\cdot1=0.$$
したがって残差は切片列と説明変数列の両方に直交し、残差平均も0である。

## 注意
切片を含まない回帰では $\sum_i e_i=0$ は一般に成立しない。

<!-- CARD -->

---
id: reg-r-squared
title: 決定係数を平方和から計算する
category: math-data-analysis
subcategory: math-regression
topic: r-squared
type: calc_step
difficulty: 2
priority: S
hashtags:
  - 決定係数
  - 回帰平方和
  - 適合度
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 決定係数
archive_reason: duplicate
canonical_card: reg-sst-decomposition
archive_note: 決定係数の定義を平方和分解から導く正本へ統合済み。
---
## 問題
全平方和 $SST=80$、残差平方和 $SSE=20$ の回帰で、決定係数 $R^2=1-SSE/SST$ を求めよ。

## 記号・用語
- SSE：残差平方和（sum of squared errors）
- SSR：回帰平方和（regression sum of squares）
- SST：全平方和（total sum of squares）

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

切片を含む最小二乗法では $SST=SSR+SSE$。

## 答え
$$R^2=\frac{SSR}{SST}=1-\frac{SSE}{SST}
=1-\frac{20}{80}=0.75.$$

## 計算例
$$R^2=1-\frac{SSE}{SST}
=1-\frac{20}{80}
=1-0.25=0.75.$$
したがって標本内の応答変数 $Y$ の変動の75%が回帰で説明されたと読む。

## 注意
高い $R^2$ は因果関係やモデルの正しさを保証しない。

<!-- CARD -->

---
id: reg-simple-r2-correlation
title: 単回帰でR二乗と相関係数を結ぶ
category: math-data-analysis
subcategory: math-regression
topic: r2-correlation
type: calc_step
difficulty: 3
priority: A
hashtags:
  - 決定係数
  - 相関係数
  - 単回帰
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 重相関係数
archive_reason: duplicate
canonical_card: reg-sst-decomposition
archive_note: 単回帰でR二乗が標本相関係数の二乗に一致する導出を正本へ統合済み。
---
## 問題
切片あり単回帰で $R^2$ と標本相関係数 $r_{xy}$ の関係を書け。

## 記号・用語
- SSR：回帰平方和（regression sum of squares）

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$S_{yy}=\sum_i(Y_i-\overline Y)^2$、$r_{xy}=S_{xy}/\sqrt{S_{xx}S_{yy}}$。

## 答え
$$\widehat\beta_1=\frac{S_{xy}}{S_{xx}},\qquad SSR=\widehat\beta_1^2S_{xx}=\frac{S_{xy}^2}{S_{xx}}.$$
したがって
$$R^2=\frac{SSR}{S_{yy}}=\frac{S_{xy}^2}{S_{xx}S_{yy}}=r_{xy}^2.$$

## 計算例
$r=-0.8$ なら $R^2=0.64$ だが傾きは負。

## 注意
$R^2$ から相関の符号は分からない。

<!-- CARD -->

---
id: reg-adjusted-r-squared
title: 自由度調整済み決定係数を計算する
category: math-data-analysis
subcategory: math-regression
topic: adjusted-r2
type: calc_step
difficulty: 3
priority: A
hashtags:
  - 自由度調整済み決定係数
  - 重回帰
  - モデル比較
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 決定係数
archive_reason: duplicate
canonical_card: reg-sst-decomposition
archive_note: 自由度調整済み決定係数を通常の決定係数・平方和分解と同じ正本へ統合済み。
---
## 問題
$n=20$、切片を除く説明変数数 $p=3$、$R^2=0.60$ の調整済み $R^2$ を求めよ。

## 記号・用語
- SSE：残差平方和（sum of squared errors）
- SST：全平方和（total sum of squares）

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

誤差分散を自由度で調整して全分散と比較する。

## 答え
$$\overline R^2=1-\frac{SSE/(n-p-1)}{SST/(n-1)}
=1-(1-R^2)\frac{n-1}{n-p-1}.$$
よって
$$\overline R^2=1-0.4\frac{19}{16}=0.525.$$

## 計算例
$$\overline R^2
=1-(1-R^2)\frac{n-1}{n-p-1}$$
へ $n=20,p=3,R^2=0.60$ を代入すると
$$\overline R^2
=1-(1-0.60)\frac{19}{16}
=1-0.475=0.525.$$

## 注意
$p$ に切片を含める流儀と混同しない。

<!-- CARD -->

---
id: reg-slope-variance
title: 単回帰の傾き推定量の分散を求める
category: math-data-analysis
subcategory: math-regression
topic: slope-variance
type: calc_step
difficulty: 3
priority: S
hashtags:
  - 傾き
  - 分散
  - 単回帰
frequency:
  past_exam: 1
  textbook: 0
  independent_problems: 0
  source_confirmations: 1
sources:
  - type: official_syllabus
    topic: 線形単回帰
  - type: past_exam
    id: MATH-2024-Q1
    topic: 回帰係数の推定・検定・検出力
archive_reason: duplicate
canonical_card: reg-slope-t-test
archive_note: 傾き推定量の分散・標準誤差をt検定・信頼区間の正本へ統合済み。
---
## 問題
固定された説明変数 $x_i$ の下で、誤差が独立に平均0、分散 $\sigma^2$ を持つ単回帰を考える。$S_{xx}=\sum_i(x_i-\overline x)^2$ として、傾き推定量 $\widehat\beta_1$ の分散を導け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

独立な線形結合の分散と $S_{xx}=\sum_i(x_i-\overline x)^2$。

## 答え
$$\widehat\beta_1=\beta_1+\frac{\sum_i(x_i-\overline x)\varepsilon_i}{S_{xx}}.$$
誤差が独立で分散 $\sigma^2$ だから
$$\operatorname{Var}(\widehat\beta_1)=
\frac{\sigma^2\sum_i(x_i-\overline x)^2}{S_{xx}^2}
=\frac{\sigma^2}{S_{xx}}.$$

## 計算例
$\sigma^2=9,S_{xx}=36$ なら
$$\operatorname{Var}(\widehat\beta_1)=\frac{9}{36}=0.25,$$
$$\operatorname{SE}(\widehat\beta_1)=\sqrt{0.25}=0.5.$$
$S_{xx}$ が4倍の144なら標準誤差は $\sqrt{9/144}=0.25$ まで小さくなる。

## 注意
外挿点を増やす設計判断には実験上の制約も考える。

<!-- CARD -->

---
id: reg-intercept-variance
title: 単回帰の切片推定量の分散を書く
category: math-data-analysis
subcategory: math-regression
topic: intercept-variance
type: formula
difficulty: 3
priority: A
hashtags:
  - 切片
  - 分散
  - 単回帰
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 線形単回帰
archive_reason: duplicate
canonical_card: reg-slope-t-test
archive_note: 切片推定量の分散を傾き推定量の分散と同じ推測正本へ統合済み。
---
## 問題
切片あり単回帰で、$S_{xx}=\sum_i(x_i-\overline x)^2$、誤差分散を $\sigma^2$ とする。$\operatorname{Var}(\widehat\beta_0)$ と $\operatorname{Cov}(\widehat\beta_0,\widehat\beta_1)$ を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$\widehat\beta_0=\overline Y-\widehat\beta_1\overline x$。

## 答え
$$\operatorname{Var}(\widehat\beta_0)=\sigma^2\left(\frac1n+\frac{\overline x^2}{S_{xx}}\right),$$
$$\operatorname{Cov}(\widehat\beta_0,\widehat\beta_1)=-\frac{\overline x\sigma^2}{S_{xx}}.$$

## 計算例
$n=10,\overline x=2,S_{xx}=20,\sigma^2=4$ なら
$$\operatorname{Var}(\widehat\beta_0)
=4\left(\frac1{10}+\frac{2^2}{20}\right)=1.2,$$
$$\operatorname{Cov}(\widehat\beta_0,\widehat\beta_1)
=-\frac{4\cdot2}{20}=-0.4.$$
$x_i$ を中心化して $\overline x=0$ とすれば共分散は0になる。

## 注意
0が観測範囲外なら切片の実質的解釈は慎重に行う。

<!-- CARD -->

---
id: reg-slope-t-numeric
title: 回帰係数のt検定を数値で完遂する
category: math-data-analysis
subcategory: math-regression
topic: slope-t-numeric
type: calc_step
difficulty: 3
priority: S
hashtags:
  - 回帰係数
  - t検定
  - 棄却判断
frequency:
  past_exam: 1
  textbook: 0
  independent_problems: 0
  source_confirmations: 1
sources:
  - type: official_syllabus
    topic: 線形単回帰
  - type: past_exam
    id: MATH-2024-Q1
    topic: 回帰係数の推定・検定・検出力
archive_reason: duplicate
canonical_card: reg-slope-t-test
archive_note: 傾きのt検定の数値判定を係数分散から通す正本へ統合済み。
---
## 問題
固定された説明変数の下で誤差が独立な正規分布に従い、分散が共通である単回帰で、$n=12$、傾き推定値 $\widehat\beta_1=1.5$、誤差平均平方 $MS_E=4$、$S_{xx}=\sum_i(x_i-\overline x)^2=25$ を得た。$H_0:\beta_1=0$ を両側5%で検定せよ。自由度10のt分布の両側臨界値を2.228とする。

## 記号・用語
- SE：標準誤差（standard error）

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$T=(\widehat\beta_1-\beta_{1,0})/\operatorname{SE}(\widehat\beta_1)\sim t_{n-2}$。

## 答え
$$\operatorname{SE}(\widehat\beta_1)=\sqrt{4/25}=0.4,$$
$$t=1.5/0.4=3.75.$$
$|3.75|>2.228$ なので $H_0$ を棄却する。

## 計算例
傾きの標準誤差は
$$\operatorname{SE}(\widehat\beta_1)
=\sqrt{\frac{MS_E}{S_{xx}}}
=\sqrt{\frac4{25}}=0.4.$$
したがって
$$t=\frac{1.5-0}{0.4}=3.75.$$
自由度は $12-2=10$ で、$3.75>2.228$ より帰無仮説を棄却する。

## 注意
統計的有意性と傾きの実質的大きさは別に評価する。

<!-- CARD -->

---
id: reg-slope-confidence-interval
title: 回帰傾きの信頼区間を計算する
category: math-data-analysis
subcategory: math-regression
topic: slope-ci
type: calc_step
difficulty: 2
priority: A
hashtags:
  - 回帰係数
  - 信頼区間
  - t分布
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 線形単回帰
archive_reason: duplicate
canonical_card: reg-slope-t-test
archive_note: 傾きの信頼区間を同じ標準誤差を使うt検定の正本へ統合済み。
---
## 問題
固定された説明変数の下で誤差が独立な正規分布に従い、分散が共通である単回帰を考える。傾き推定値 $\widehat\beta_1=1.5$、標準誤差0.4、誤差自由度10、t分布の片側2.5%点 $t_{10,0.025}=2.228$ として95%信頼区間を求めよ。

## 記号・用語
- SE：標準誤差（standard error）

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$(\widehat\beta_1-\beta_1)/\operatorname{SE}(\widehat\beta_1)\sim t_{n-2}$。

## 答え
$$\widehat\beta_1\pm t_{10,0.025}\operatorname{SE}(\widehat\beta_1)
=1.5\pm2.228(0.4).$$
よって
$$[0.609,2.391]$$
である。

## 計算例
誤差幅は
$$2.228\times0.4=0.8912.$$
したがって
$$1.5\pm0.8912=(0.6088,2.3912).$$
区間が0を含まないので、$H_0:\beta_1=0$ の両側5%検定でも棄却する。

## 注意
丸めは最終段階で行う。

<!-- CARD -->

---
id: reg-prediction-interval
title: 新しい1観測の予測区間を作る
category: math-data-analysis
subcategory: math-regression
topic: prediction-interval
type: formula
difficulty: 3
priority: S
hashtags:
  - 予測区間
  - 単回帰
  - 予測誤差
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 線形単回帰
archive_reason: duplicate
canonical_card: reg-mean-response-ci
archive_note: 新規1観測の予測区間を平均応答信頼区間との比較正本へ統合済み。
---
## 問題
固定された説明変数の下で誤差が独立な正規分布に従い、分散が共通である切片あり単回帰を考える。標本サイズを $n$、残差標準偏差を $s$、$S_{xx}=\sum_i(x_i-\overline x)^2$ として、説明変数の値 $x_0$ における新しい1観測 $Y_0$ の $1-\alpha$ 予測区間を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

予測誤差 $Y_0-\widehat y_0$ の分散は、新観測の誤差分散 $\sigma^2$ と平均推定分散の和。

## 答え
$$\widehat y_0\pm t_{n-2,\alpha/2}s
\sqrt{1+\frac1n+\frac{(x_0-\overline x)^2}{S_{xx}}}.$$

## 計算例
$n=25,s=2,x_0=\overline x$、当てはめ値 $\widehat y_0=10$、自由度23の95%臨界値 $t_{23,0.025}=2.069$ とする。新観測の標準誤差は
$$2\sqrt{1+\frac1{25}}=2\sqrt{1.04}\approx2.040.$$
したがって95%予測区間は
$$10\pm2.069\left(2\sqrt{1.04}\right)
\approx10\pm4.220,$$
すなわち
$$(5.780,14.220)$$
である。平均応答の標準誤差 $2/\sqrt{25}=0.4$ より大きく、予測区間の方が広い。

## 注意
観測範囲外の外挿では式が使えてもモデル妥当性が弱い。

<!-- CARD -->

---
id: reg-ci-versus-pi-numeric
title: 平均応答区間と予測区間の幅を比較する
category: math-data-analysis
subcategory: math-regression
topic: ci-pi-numeric
type: calc_step
difficulty: 3
priority: A
hashtags:
  - 信頼区間
  - 予測区間
  - 標準誤差
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 線形単回帰
archive_reason: duplicate
canonical_card: reg-mean-response-ci
archive_note: 平均応答区間と予測区間の幅の数値比較を同じ正本へ統合済み。
---
## 問題
固定された説明変数の下で誤差が独立な正規分布に従い、分散が共通である単回帰を考える。$x_0=\overline x$、標本サイズ $n=25$、残差標準偏差 $s=2$ のとき、平均応答と新観測の標準誤差を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$x_0=\overline x$ では $(x_0-\overline x)^2/S_{xx}=0$。

## 答え
平均応答は
$$2\sqrt{1/25}=0.4.$$
新観測は
$$2\sqrt{1+1/25}=2\sqrt{1.04}\approx2.040.$$

## 計算例
平均応答の標準誤差は
$$2\sqrt{\frac1{25}}=0.4.$$
新観測の標準誤差は
$$2\sqrt{1+\frac1{25}}=2\sqrt{1.04}\approx2.040.$$
比は $2.040/0.4\approx5.10$ であり、新観測固有の誤差があるため予測区間が広い。

## 注意
区間半幅はさらに同じt臨界値を掛ける。

<!-- CARD -->

---
id: reg-matrix-ols-derivation
title: 行列微分から最小二乗法推定量を導く
category: math-data-analysis
subcategory: math-regression
topic: matrix-ols
type: calc_step
difficulty: 3
priority: S
hashtags:
  - 重回帰
  - 最小二乗推定
  - 正規方程式
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 最小二乗推定
archive_reason: duplicate
canonical_card: reg-multiple-model-matrix
archive_note: 行列微分による最小二乗推定量の導出を重回帰行列正本へ統合済み。
---
## 問題
$\boldsymbol Y\in\mathbb R^n$、列フルランクの計画行列 $\boldsymbol X\in\mathbb R^{n\times k}$、係数 $\boldsymbol\beta\in\mathbb R^k$ とする。残差平方和 $Q(\boldsymbol\beta)=\|\boldsymbol Y-\boldsymbol X\boldsymbol\beta\|^2$ を最小化せよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$\nabla_{\beta}(\beta^{\mathsf T}A\beta)=2A\beta$（$A$ 対称）。

## 答え
$$Q=\boldsymbol Y^{\mathsf T}\boldsymbol Y-2\boldsymbol\beta^{\mathsf T}\boldsymbol X^{\mathsf T}\boldsymbol Y+\boldsymbol\beta^{\mathsf T}\boldsymbol X^{\mathsf T}\boldsymbol X\boldsymbol\beta.$$
勾配を0と置くと
$$\boldsymbol X^{\mathsf T}\boldsymbol X\widehat{\boldsymbol\beta}=\boldsymbol X^{\mathsf T}\boldsymbol Y.$$
$X$ が列フルランクなら
$$\widehat{\boldsymbol\beta}=(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}\boldsymbol X^{\mathsf T}\boldsymbol Y.$$

## 計算例
$\boldsymbol X=\begin{pmatrix}1&0\\1&1\end{pmatrix}$、$\boldsymbol Y=(1,3)^{\mathsf T}$ とすると
$$\boldsymbol X^{\mathsf T}\boldsymbol X
=\begin{pmatrix}2&1\\1&1\end{pmatrix},
\quad
\boldsymbol X^{\mathsf T}\boldsymbol Y
=\begin{pmatrix}4\\3\end{pmatrix}.$$
逆行列は $\begin{pmatrix}1&-1\\-1&2\end{pmatrix}$ なので
$$\widehat{\boldsymbol\beta}
=\begin{pmatrix}1&-1\\-1&2\end{pmatrix}
\begin{pmatrix}4\\3\end{pmatrix}
=\begin{pmatrix}1\\2\end{pmatrix}.$$

## 注意
実際の数値計算では逆行列を明示的に作らずQR分解などを使う。

<!-- CARD -->

---
id: reg-beta-unbiased-covariance
title: 最小二乗法係数の不偏性と共分散を導く
category: math-data-analysis
subcategory: math-regression
topic: ols-covariance
type: calc_step
difficulty: 4
priority: S
hashtags:
  - 最小二乗法
  - 不偏性
  - 分散共分散行列
frequency:
  past_exam: 1
  textbook: 0
  independent_problems: 0
  source_confirmations: 1
sources:
  - type: official_syllabus
    topic: 線形重回帰
  - type: past_exam
    id: MATH-2024-Q1
    topic: 回帰係数の推定・検定・検出力
archive_reason: duplicate
canonical_card: reg-multiple-model-matrix
archive_note: 最小二乗法係数の不偏性と共分散行列を行列表現・導出と同じ正本へ統合済み。
---
## 問題
線形モデル $\boldsymbol Y=\boldsymbol X\boldsymbol\beta+\boldsymbol\varepsilon$ で、$\boldsymbol X$ は列フルランク、$E[\boldsymbol\varepsilon]=\boldsymbol0$、$\operatorname{Var}(\boldsymbol\varepsilon)=\sigma^2\boldsymbol I$ とする。最小二乗推定量の期待値と共分散を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$\operatorname{Var}(A\varepsilon)=A\operatorname{Var}(\varepsilon)A^{\mathsf T}$。

## 答え
$$\widehat\beta=\beta+(X^{\mathsf T}X)^{-1}X^{\mathsf T}\varepsilon$$
より
$$E[\widehat\beta]=\beta,$$
$$\operatorname{Var}(\widehat\beta)
=(X^{\mathsf T}X)^{-1}X^{\mathsf T}(\sigma^2I)X(X^{\mathsf T}X)^{-1}
=\sigma^2(X^{\mathsf T}X)^{-1}.$$

## 計算例
モデル式を最小二乗推定量へ代入すると
$$\widehat{\boldsymbol\beta}
=(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}\boldsymbol X^{\mathsf T}
(\boldsymbol X\boldsymbol\beta+\boldsymbol\varepsilon)$$
$$=\boldsymbol\beta
+(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}\boldsymbol X^{\mathsf T}\boldsymbol\varepsilon.$$
よって期待値は $\boldsymbol\beta$。数値例として
$$\boldsymbol X=\begin{pmatrix}1&0\\1&1\end{pmatrix},
\qquad
(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}
=\begin{pmatrix}1&-1\\-1&2\end{pmatrix}$$
とし、$\sigma^2=4$ なら
$$\operatorname{Var}(\widehat{\boldsymbol\beta})
=4\begin{pmatrix}1&-1\\-1&2\end{pmatrix}
=\begin{pmatrix}4&-4\\-4&8\end{pmatrix}.$$

## 注意
不均一分散ではこの共分散式は正しくない。
