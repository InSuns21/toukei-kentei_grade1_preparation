---
id: engmv-correlation-from-covariance
title: 分散共分散行列から相関行列を求める
category: applied-engineering
subcategory: engineering-multivariate
topic: correlation-matrix
type: calc_step
difficulty: 2
priority: B
hashtags: [相関行列, 分散共分散行列, 標準化]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 相関行列 }]
---
## 問題
$\Sigma=\begin{pmatrix}4&3\\3&9\end{pmatrix}$ から相関行列を求めよ。
## 記号・用語
$\sigma_i=\sqrt{\sigma_{ii}}$ は第 $i$ 変数の標準偏差、$\rho_{ij}$ は相関係数である。
## 使用公式・定理
**共分散から相関への標準化**：
$$\rho_{ij}=\frac{\sigma_{ij}}{\sqrt{\sigma_{ii}\sigma_{jj}}},\qquad R=D^{-1/2}\Sigma D^{-1/2},$$
ただし $D=\operatorname{diag}(\sigma_{11},\ldots,\sigma_{pp})$。
## 一手／方針
各共分散を対応する2標準偏差の積で割る。
## 答え
$\sigma_1=2$、$\sigma_2=3$ だから
$$\rho_{12}=\frac3{2\cdot3}=\frac12,$$
$$R=\begin{pmatrix}1&0.5\\0.5&1\end{pmatrix}.$$
## 計算例
単位が変わっても相関行列は変わらない。
## 注意
相関行列の対角成分は必ず1である。

<!-- CARD -->

---
id: engmv-mahalanobis-control-limit
title: Mahalanobis二乗距離を管理限界と比較する
category: applied-engineering
subcategory: engineering-multivariate
topic: mahalanobis-control-limit
type: calc_step
difficulty: 3
priority: B
hashtags: [多変量正規分布, Mahalanobis距離, 二次形式]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 多変量正規分布 }]
---
## 問題
正常工程の平均が $\boldsymbol\mu=(0,0)^\top$、既知共分散が $\Sigma=\operatorname{diag}(4,1)$ である。観測 $\boldsymbol x=(4,2)^\top$ のMahalanobis二乗距離を求め、1%管理限界 $\chi^2_{2,0.99}=9.21$ と比較せよ。
## 記号・用語
Mahalanobis二乗距離は変数の分散と相関を補正した工程中心からの距離指標である。
## 使用公式・定理
**Mahalanobis二乗距離**：$d_M^2=(\boldsymbol x-\boldsymbol\mu)^\top\Sigma^{-1}(\boldsymbol x-\boldsymbol\mu)$。母数既知の多変量正規分布では $d_M^2\sim\chi_p^2$。
## 一手／方針
二次形式を計算し、カイ二乗管理限界と比較する。
## 答え
$\Sigma^{-1}=\operatorname{diag}(1/4,1)$ だから
$$d_M^2=4^2/4+2^2=8.$$
$8<9.21$ なので、この管理限界では異常と判定しない。
## 計算例
第1成分の偏差4は標準偏差2で割ると2標準偏差に相当する。
## 注意
平均・共分散を同じ標本から推定する場合は単純なカイ二乗限界と異なる。

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
hashtags: [分散共分散行列, 線形変換, 行列計算]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 分散共分散行列 }]
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
id: engmv-normal-uncorrelated-independent
title: 多変量正規分布で無相関から独立を判定する
category: applied-engineering
subcategory: engineering-multivariate
topic: normal-independence
type: recognition
difficulty: 2
priority: B
hashtags: [多変量正規分布, 独立, 無相関]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 多変量正規分布 }]
---
## 問題
$(X_1,X_2,X_3)^\top$ が多変量正規分布に従い、分散共分散行列が $\begin{pmatrix}1&0&2\\0&4&0\\2&0&9\end{pmatrix}$ である。$X_2$ と $(X_1,X_3)^\top$ は独立か。
## 記号・用語
2つの部分ベクトルの交差分散共分散行列は、一方の成分と他方の成分の共分散を並べた行列である。
## 使用公式・定理
**多変量正規分布の独立性**：同時に多変量正規分布に従う部分ベクトルは、交差分散共分散行列が0なら独立である。
## 一手／方針
$X_2$ と残り2成分の共分散を対応する行列成分から読む。
## 答え
$\operatorname{Cov}(X_2,X_1)=0$、$\operatorname{Cov}(X_2,X_3)=0$ なので交差共分散は0。よって $X_2$ と $(X_1,X_3)^\top$ は独立である。
## 計算例
$X_1$ と $X_3$ は共分散2なので独立でない。
## 注意
一般の分布では、無相関から独立は導けない。

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
hashtags: [多変量正規分布, 精度行列, 条件付き独立]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 多変量正規分布 }]
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
id: engmv-sample-mean-distribution
title: 多変量正規標本の標本平均分布を書く
category: applied-engineering
subcategory: engineering-multivariate
topic: sample-mean-distribution
type: formula
difficulty: 2
priority: B
hashtags: [多変量正規分布, 標本平均ベクトル, 標本分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 平均ベクトル }]
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
hashtags: [Wishart分布, 分散共分散行列, 標本分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 分散共分散行列 }]
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
hashtags: [Wishart分布, 期待値, 分散共分散行列]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 分散共分散行列 }]
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
id: engmv-normal-mean-cov-independence
title: 正規標本で標本平均と標本共分散の独立性を使う
category: applied-engineering
subcategory: engineering-multivariate
topic: mean-covariance-independence
type: formula
difficulty: 3
priority: B
hashtags: [多変量正規分布, Wishart分布, 独立性]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 多変量正規分布 }]
---
## 問題
多変量正規標本で、標本平均ベクトルと不偏標本分散共分散行列の同時分布に関する結果を述べよ。
## 記号・用語
$S=(n-1)^{-1}\sum_i(\boldsymbol X_i-\bar{\boldsymbol X})(\boldsymbol X_i-\bar{\boldsymbol X})^\top$ とする。
## 使用公式・定理
**多変量Cochran型定理**：正規標本では
$$\bar{\boldsymbol X}\perp S,\qquad (n-1)S\sim W_p(\Sigma,n-1).$$
## 一手／方針
平均に関する推測と分散共分散行列に関する推測を、独立な2部分へ分ける。
## 答え
$$\bar{\boldsymbol X}\sim N_p(\boldsymbol\mu,\Sigma/n),$$
$$(n-1)S\sim W_p(\Sigma,n-1),$$
かつ両者は独立である。
## 計算例
$p=1$ では標本平均と不偏標本分散の独立性、およびカイ二乗分布の結果に戻る。
## 注意
この独立性は一般の非正規母集団では成立しない。

<!-- CARD -->

---
id: engmv-hotelling-two-sample
title: 2標本HotellingのT²統計量を計算する
category: applied-engineering
subcategory: engineering-multivariate
topic: hotelling-two-sample
type: calc_step
difficulty: 4
priority: B
hashtags: [HotellingのT二乗検定, 2標本問題, 数値計算]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 平均ベクトル }]
---
## 問題
独立な2群で $n_1=n_2=10$、平均差 $\boldsymbol d=(1,2)^\top$、プールした共分散 $S_p=\operatorname{diag}(2,4)$ のとき、2標本Hotellingの $T^2$ を求めよ。
## 記号・用語
$S_p$ は2群の不偏分散共分散行列を自由度でプールした行列である。
## 使用公式・定理
**2標本Hotelling統計量**：
$$T^2=\frac{n_1n_2}{n_1+n_2}\boldsymbol d^\top S_p^{-1}\boldsymbol d.$$
## 一手／方針
平均差のMahalanobis二乗距離を求め、有効標本係数を掛ける。
## 答え
$S_p^{-1}=\operatorname{diag}(1/2,1/4)$ なので
$$\boldsymbol d^\top S_p^{-1}\boldsymbol d=\frac12+1=1.5,$$
$$T^2=\frac{100}{20}\cdot1.5=7.5.$$
## 計算例
検定では $\{(n_1+n_2-p-1)/[(n_1+n_2-2)p]\}T^2$ を自由度 $(p,n_1+n_2-p-1)$ のF分布と比較する。
## 注意
2群の多変量正規性、独立性、共通分散共分散行列、$S_p$ の可逆性が必要である。

<!-- CARD -->

---
id: engmv-confidence-ellipsoid-known-cov
title: 既知共分散で平均ベクトルの信頼楕円を判定する
category: applied-engineering
subcategory: engineering-multivariate
topic: confidence-ellipsoid
type: calc_step
difficulty: 3
priority: B
hashtags: [平均ベクトル, 信頼楕円, カイ二乗分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 平均ベクトル }]
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
id: engmv-spectral-reconstruction
title: 固有値分解から分散共分散行列を再構成する
category: applied-engineering
subcategory: engineering-multivariate
topic: spectral-decomposition
type: calc_step
difficulty: 3
priority: B
hashtags: [固有値, 固有ベクトル, スペクトル分解]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 固有値・固有ベクトル }]
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
hashtags: [クラスター分析, silhouette係数, クラスター評価]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: クラスタリング }]
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
id: engmv-canonical-correlation-diagonal
title: 対角的な交差相関から正準相関を読む
category: applied-engineering
subcategory: engineering-multivariate
topic: canonical-correlation
type: calc_step
difficulty: 3
priority: C
hashtags: [正準相関分析, 相関行列, 特異値]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 正準相関分析 }]
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

<!-- CARD -->

---
id: engmv-canonical-eigenvalue
title: 正準相関を固有値から求める
category: applied-engineering
subcategory: engineering-multivariate
topic: canonical-correlation
type: calc_step
difficulty: 4
priority: C
hashtags: [正準相関分析, 固有値, 行列計算]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 正準相関分析 }]
---
## 問題
$\Sigma_{XX}=I_2$、$\Sigma_{YY}=I_2$、$\Sigma_{XY}=\begin{pmatrix}0.5&0.4\\0.4&0.5\end{pmatrix}$ のとき、正準相関を固有値問題から求めよ。
## 記号・用語
$\Sigma_{YX}=\Sigma_{XY}^\top$ とする。
## 使用公式・定理
正準相関の二乗は $\Sigma_{XX}^{-1}\Sigma_{XY}\Sigma_{YY}^{-1}\Sigma_{YX}$ の固有値である。
## 一手／方針
単位行列の逆行列を消し、非対角な交差分散共分散行列の積を作って固有値を求める。
## 答え
$$\Sigma_{XY}\Sigma_{YX}=\begin{pmatrix}0.41&0.40\\0.40&0.41\end{pmatrix}.$$
固有値は $0.81,0.01$ なので、正準相関は
$$\rho_1=\sqrt{0.81}=0.9,\qquad \rho_2=\sqrt{0.01}=0.1.$$
## 計算例
第1正準方向は和方向、第2正準方向は差方向である。
## 注意
一般の場合は両群内の分散共分散行列で標準化する。

<!-- CARD -->

---
id: engmv-classical-mds-three-points
title: 3点の距離から1次元配置を復元する
category: applied-engineering
subcategory: engineering-multivariate
topic: multidimensional-scaling
type: calc_step
difficulty: 3
priority: B
hashtags: [多次元尺度構成法, 距離行列, 配置]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 多次元尺度構成法 }]
---
## 問題
3点間の距離が $d_{12}=1,d_{23}=1,d_{13}=2$ である。中心を0とする1次元配置を一つ求めよ。
## 記号・用語
多次元尺度構成法は点間距離をできるだけ保つ低次元配置を求める。
## 使用公式・定理
3距離が一直線上で $d_{13}=d_{12}+d_{23}$ を満たすなら、点2は点1と点3の間に置ける。
## 一手／方針
間隔1で3点を並べ、座標平均が0になるよう平行移動する。
## 答え
$$x_1=-1,\qquad x_2=0,\qquad x_3=1$$
と置けば、距離は順に $1,1,2$ で条件を満たす。
## 計算例
全座標の符号を反転しても同じ距離を与える。
## 注意
距離から得る配置は平行移動・回転・鏡映の違いまでは一意でない。

<!-- CARD -->

---
id: engmv-mds-stress
title: MDS配置のstressを計算する
category: applied-engineering
subcategory: engineering-multivariate
topic: mds-stress
type: calc_step
difficulty: 2
priority: B
hashtags: [多次元尺度構成法, stress, 適合度]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 多次元尺度構成法 }]
---
## 問題
3つの対象距離が $(d_{12},d_{13},d_{23})=(1,2,3)$、配置上の距離が $(\widehat d_{12},\widehat d_{13},\widehat d_{23})=(1,2,2)$ のとき、正規化stressを求めよ。
## 記号・用語
stressは元の非類似度と配置上の距離のずれを測る。
## 使用公式・定理
$$\operatorname{Stress}=\sqrt{\frac{\sum_{i<j}(d_{ij}-\widehat d_{ij})^2}{\sum_{i<j}d_{ij}^2}}.$$
## 一手／方針
距離誤差の平方和を元距離の平方和で標準化する。
## 答え
分子は $0^2+0^2+1^2=1$、分母は $1^2+2^2+3^2=14$ だから
$$\operatorname{Stress}=\frac1{\sqrt{14}}\approx0.267.$$
## 計算例
stressは0に近いほど距離再現がよい。
## 注意
stressの定義には複数の正規化規約があるため問題文に従う。

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
hashtags: [HotellingのT二乗検定, F分布, 仮説検定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: HotellingのT二乗検定 }]
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
