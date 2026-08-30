---
id: engmv-confidence-ellipsoid-known-cov
title: 既知共分散で平均ベクトルの信頼楕円を判定する
category: applied-engineering
subcategory: engineering-multivariate
topic: confidence-ellipsoid
type: calc_step
difficulty: 3
priority: B
hashtags:
  - 平均ベクトル
  - 信頼楕円
  - カイ二乗分布
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 平均ベクトル
archive_reason: duplicate
canonical_card: engmv-mahalanobis-control-limit
archive_note: 既知共分散の平均ベクトル信頼楕円は、正規ベクトルのMahalanobis二次形式とカイ二乗分位点を用いる同一canonicalへ統合済み。
---
## 問題
独立な2変量正規標本で $n=25$、$\bar{\boldsymbol X}=(1,2)^\top$、既知 $\Sigma=I_2$ とする。候補 $\boldsymbol\mu_0=(1.2,2.3)^\top$ が95%信頼楕円に入るか判定せよ。$\chi^2_{2,0.95}=5.991$ とする。
## 記号・用語
$\chi^2_{p,1-\alpha}$ は自由度 $p$ のカイ二乗分布の下側 $1-\alpha$ 分位点である。
## 使用公式・定理
**既知共分散での信頼楕円**：
$$n(\bar{\boldsymbol X}-\boldsymbol\mu)^\top\Sigma^{-1}(\bar{\boldsymbol X}-\boldsymbol\mu)\le\chi^2_{p,1-\alpha}.$$
## 一手／方針
候補平均と標本平均の差について二次形式を計算し、臨界値と比較する。
## 答え
差は $(-0.2,-0.3)^\top$ だから
$$25(0.2^2+0.3^2)=25(0.13)=3.25<5.991.$$
よって $\boldsymbol\mu_0$ は95%信頼楕円に入る。
## 計算例
楕円の境界は中心 $\bar{\boldsymbol X}$ からのMahalanobis距離一定の曲線である。
## 注意
$\Sigma$ 未知ならHotellingの $T^2$ に基づく臨界値を用いる。

<!-- CARD -->

---
id: engmv-canonical-correlation-diagonal
title: 対角的な交差相関から正準相関を読む
category: applied-engineering
subcategory: engineering-multivariate
topic: canonical-correlation
type: calc_step
difficulty: 3
priority: C
hashtags:
  - 正準相関分析
  - 相関行列
  - 特異値
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 正準相関分析
archive_reason: duplicate
canonical_card: engmv-canonical-eigenvalue
archive_note: 白色化済みの対角交差共分散では正準相関が特異値になる特殊例を、一般固有値問題のcanonicalへ数値例ごと統合済み。
---
## 問題
$\operatorname{Cov}(\boldsymbol X)=I_2$、$\operatorname{Cov}(\boldsymbol Y)=I_2$、$\operatorname{Cov}(\boldsymbol X,\boldsymbol Y)=\operatorname{diag}(0.8,0.3)$ のとき正準相関を求めよ。
## 記号・用語
正準相関は $\boldsymbol a^\top\boldsymbol X$ と $\boldsymbol b^\top\boldsymbol Y$ の相関を順に最大化した値である。
## 使用公式・定理
各群が白色化済みなら、正準相関は交差分散共分散行列の特異値である。
## 一手／方針
対角行列の特異値は対角成分の絶対値として読む。
## 答え
第1正準相関は $0.8$、第2正準相関は $0.3$ である。
## 計算例
第1正準変量対は $X_1,Y_1$、第2正準変量対は $X_2,Y_2$。
## 注意
正準相関の符号は係数ベクトルの符号選択に依存するため非負で定義する。
