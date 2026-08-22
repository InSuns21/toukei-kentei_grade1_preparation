---
id: engmv-normal-density-numeric
title: 2変量正規分布の密度を数値計算する
category: applied-engineering
subcategory: engineering-multivariate
topic: multivariate-normal-density
type: calc_step
difficulty: 3
priority: A
hashtags: [多変量正規分布, 確率密度関数, 数値計算]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 多変量正規分布 }]
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
id: engmv-sample-mean-vector
title: 標本平均ベクトルを計算する
category: applied-engineering
subcategory: engineering-multivariate
topic: mean-vector
type: calc_step
difficulty: 1
priority: B
hashtags: [平均ベクトル, 標本平均, 数値計算]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 平均ベクトル }]
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
hashtags: [分散共分散行列, 標本共分散, 数値計算]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 分散共分散行列 }]
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
hashtags: [分散共分散行列, 半正定値, 主座小行列式]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 分散共分散行列 }]
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
id: engmv-linear-combination-normal
title: 多変量正規分布の線形結合を計算する
category: applied-engineering
subcategory: engineering-multivariate
topic: linear-combination
type: calc_step
difficulty: 2
priority: B
hashtags: [多変量正規分布, 線形結合, 分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 多変量正規分布 }]
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
id: engmv-normal-marginal-numeric
title: 多変量正規分布の周辺分布を取り出す
category: applied-engineering
subcategory: engineering-multivariate
topic: marginal-normal
type: formula
difficulty: 1
priority: B
hashtags: [多変量正規分布, 周辺分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 多変量正規分布 }]
---
## 問題
多変量正規分布 $\boldsymbol X\sim N_3((1,2,3)^\top,\Sigma)$、$\Sigma_{11}=4$、$\Sigma_{33}=9$、$\Sigma_{13}=2$ のとき、$(X_1,X_3)^\top$ の周辺分布を書け。
## 記号・用語
周辺分布は、不要な成分を積分して除いた分布である。
## 使用公式・定理
**多変量正規分布の周辺化**：成分を抜き出したベクトルも正規分布で、平均と分散共分散行列の対応する行・列を抜き出す。
## 一手／方針
成分1と3に対応する平均成分と共分散行列の行・列だけを残す。
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
hashtags: [多変量正規分布, 条件付き分布, 数値計算]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 多変量正規分布 }]
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
id: engmv-eigenvalues-covariance-2x2
title: 2次の分散共分散行列の固有値を計算する
category: applied-engineering
subcategory: engineering-multivariate
topic: eigenvalues
type: calc_step
difficulty: 2
priority: B
hashtags: [固有値, 分散共分散行列, 主成分分析]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 固有値・固有ベクトル }]
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
hashtags: [固有ベクトル, 分散共分散行列, 主成分分析]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 固有値・固有ベクトル }]
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
hashtags: [主成分分析, 主成分負荷量, 固有値]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 固有値・固有ベクトル }]
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
2つの部分ベクトルの交差共分散行列は、一方の成分と他方の成分の共分散を並べた行列である。
## 使用公式・定理
**多変量正規分布の独立性**：同時に多変量正規分布に従う部分ベクトルは、交差共分散行列が0なら独立である。
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
2群の多変量正規性、独立性、共通共分散行列、$S_p$ の可逆性が必要である。
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
id: engmv-standardized-pca-2x2
title: 相関行列による標準化PCAを計算する
category: applied-engineering
subcategory: engineering-multivariate
topic: standardized-pca
type: calc_step
difficulty: 3
priority: B
hashtags: [主成分分析, 相関行列, 標準化]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 標準化PCAと相関行列 }]
---
## 問題
相関行列 $R=\begin{pmatrix}1&0.8\\0.8&1\end{pmatrix}$ に基づく第1主成分と寄与率を求めよ。
## 記号・用語
$Z_1,Z_2$ は平均0、分散1に標準化した変数である。
## 使用公式・定理
**相関PCA**：相関行列の最大固有値に対応する単位固有ベクトルを第1主成分係数とする。
## 一手／方針
対角成分が等しい2次相関行列なので、和方向と差方向を候補にする。
## 答え
固有値は $1+0.8=1.8$、$1-0.8=0.2$。最大固有値の単位固有ベクトルは $(1,1)^\top/\sqrt2$ だから
$$Y_1=\frac{Z_1+Z_2}{\sqrt2},\qquad c_1=\frac{1.8}{1.8+0.2}=0.9.$$
## 計算例
第1主成分だけで標準化後の全分散の90%を説明する。
## 注意
元変数の単位が大きく異なるとき、共分散PCAより相関PCAが適することが多い。
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
hashtags: [主成分分析, 主成分得点, 工程監視]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 主成分分析 }]
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
hashtags: [因子分析, 因子負荷量, 独自性]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 因子分析モデル }]
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
hashtags: [因子分析, 共通性, 独自性]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 共通性と独自性 }]
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
hashtags: [因子分析, 直交回転, 共通性]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 因子回転の考え方 }]
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
id: engmv-lda-one-dimensional-boundary
title: 1変量の線形判別境界を計算する
category: applied-engineering
subcategory: engineering-multivariate
topic: linear-discriminant-analysis
type: calc_step
difficulty: 2
priority: B
hashtags: [判別分析, 線形判別, 分類境界]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 判別分析 }]
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
hashtags: [フィッシャーの線形判別, 判別分析, 分散共分散行列]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: フィッシャーの線形判別 }]
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
hashtags: [判別分析, 事前確率, 線形判別]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 判別分析 }]
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
hashtags: [判別分析, プール分散, 分散共分散行列]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 判別分析 }]
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
id: engmv-qda-quadratic-term
title: 共分散が異なると判別境界が二次になることを確認する
category: applied-engineering
subcategory: engineering-multivariate
topic: quadratic-discriminant-analysis
type: calc_step
difficulty: 3
priority: B
hashtags: [判別分析, 二次判別, 共分散行列]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 判別分析 }]
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
id: engmv-single-linkage-update
title: 最短距離法のクラスター間距離を更新する
category: applied-engineering
subcategory: engineering-multivariate
topic: hierarchical-clustering
type: calc_step
difficulty: 2
priority: B
hashtags: [クラスター分析, 階層法, 最短距離法]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: クラスタリング：階層法 }]
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
hashtags: [クラスター分析, 階層法, 最長距離法]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: クラスタリング：階層法 }]
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
hashtags: [クラスター分析, Ward法, 平方和]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: クラスタリング：階層法 }]
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
hashtags: [k-means法, クラスター分析, Euclid距離]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: k-means法 }]
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
hashtags: [k-means法, クラスター分析, 重心]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: k-means法 }]
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
各群が白色化済みなら、正準相関は交差共分散行列の特異値である。
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
単位行列の逆行列を消し、非対角な交差共分散行列の積を作って固有値を求める。
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
id: engmv-pca-rayleigh-process-variance
title: 工程変動を最大化する第1主成分をRayleigh商で選ぶ
category: applied-engineering
subcategory: engineering-multivariate
topic: pca-variance-maximization
type: calc_step
difficulty: 3
priority: A
hashtags: [主成分分析, 分散最大化, Rayleigh商]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 主成分分析：分散最大化 }]
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
2群の独立性、多変量正規性、共通共分散行列、プール共分散の可逆性が必要である。
<!-- CARD -->
