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
id: engmv-mahalanobis-control-limit
title: 正規ベクトルのMahalanobis二次形式で管理限界と信頼楕円を扱う
category: applied-engineering
subcategory: engineering-multivariate
topic: mahalanobis-chi-square-canonical
type: calc_step
difficulty: 3
priority: B
hashtags:
  - 多変量正規分布
  - Mahalanobis距離
  - 信頼楕円
  - カイ二乗分布
  - 二次形式
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 多変量正規分布
---
## 問題
多変量正規分布に従う確率ベクトル
$$
\boldsymbol Z\sim N_p(\boldsymbol m,\boldsymbol V)
$$
に対して、Mahalanobis二次形式の分布を述べよ。

さらに次の2例を計算せよ。

**(1) 個体観測の管理限界**  
$\boldsymbol\mu=(0,0)^{\mathsf T}$、
$$
\boldsymbol\Sigma=\operatorname{diag}(4,1),
\qquad
\boldsymbol x=(4,2)^{\mathsf T}
$$
とする。Mahalanobis二乗距離を求め、1%管理限界 $\chi^2_{2,0.99}=9.21$ と比較せよ。

**(2) 平均ベクトルの95%信頼楕円**  
$n=25$、$\bar{\boldsymbol X}=(1,2)^{\mathsf T}$、既知 $\boldsymbol\Sigma=I_2$ とする。候補
$$
\boldsymbol\mu_0=(1.2,2.3)^{\mathsf T}
$$
が95%信頼楕円に入るか。$\chi^2_{2,0.95}=5.991$ とする。

## 記号・用語
Mahalanobis二乗距離は変数の分散と相関を補正した工程中心からの距離指標である。
## 使用公式・定理
正規ベクトル
$$
\boldsymbol Z\sim N_p(\boldsymbol m,\boldsymbol V)
$$
で $\boldsymbol V$ が正定値なら
$$
Q=(\boldsymbol Z-\boldsymbol m)^{\mathsf T}
\boldsymbol V^{-1}
(\boldsymbol Z-\boldsymbol m)
\sim\chi_p^2.
$$

個体観測 $\boldsymbol X\sim N_p(\boldsymbol\mu,\boldsymbol\Sigma)$ では
$$
Q=(\boldsymbol X-\boldsymbol\mu)^{\mathsf T}
\boldsymbol\Sigma^{-1}
(\boldsymbol X-\boldsymbol\mu).
$$

一方
$$
\bar{\boldsymbol X}\sim
N_p\left(\boldsymbol\mu,\frac1n\boldsymbol\Sigma\right)
$$
なので平均ベクトルについては
$$
n(\bar{\boldsymbol X}-\boldsymbol\mu)^{\mathsf T}
\boldsymbol\Sigma^{-1}
(\bar{\boldsymbol X}-\boldsymbol\mu)
\sim\chi_p^2.
$$

## 一手／方針
二次形式を計算し、カイ二乗管理限界と比較する。

## 一手
**まず対象の共分散行列を確認する。** 個体なら $V=\Sigma$、標本平均なら $V=\Sigma/n$。その逆行列で標準化した二次形式を作り、カイ二乗分位点と比較する。

## 答え
(1) は
$$
d_M^2=8<9.21
$$
なので1%管理限界では異常と判定しない。

(2) は
$$
25(0.2^2+0.3^2)=3.25<5.991
$$
なので $\boldsymbol\mu_0$ は95%信頼楕円に入る。

## 計算例
(1) では
$$
\boldsymbol\Sigma^{-1}
=\operatorname{diag}\left(\frac14,1\right)
$$
だから
$$
\begin{aligned}
d_M^2
&=(4,2)
\begin{pmatrix}1/4&0\\0&1\end{pmatrix}
\begin{pmatrix}4\\2\end{pmatrix}\\
&=\frac{4^2}{4}+2^2\\
&=4+4\\
&=8.
\end{aligned}
$$

(2) では
$$
\bar{\boldsymbol X}-\boldsymbol\mu_0
=(-0.2,-0.3)^{\mathsf T}
$$
なので
$$
\begin{aligned}
Q
&=25(-0.2,-0.3)I_2
\begin{pmatrix}-0.2\\-0.3\end{pmatrix}\\
&=25(0.04+0.09)\\
&=25(0.13)\\
&=3.25.
\end{aligned}
$$
個体観測と標本平均の違いは、後者の共分散が $\Sigma/n$ なので二次形式に $n$ が付く点だけである。

## 注意
平均・共分散を同じ標本から推定する場合、平均ベクトルの推測は単純なカイ二乗ではなくHotellingの $T^2$ が基本になる。管理限界と信頼楕円は用途が違うが、背後の標準化二次形式は同じである。

<!-- CARD -->

---
id: engmv-normal-uncorrelated-independent
title: 多変量正規分布で共分散行列と精度行列から独立性を読む
category: applied-engineering
subcategory: engineering-multivariate
topic: gaussian-marginal-conditional-independence
type: recognition
difficulty: 2
priority: B
hashtags:
  - 多変量正規分布
  - 独立
  - 無相関
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
---
## 問題
多変量正規分布に従う確率ベクトルについて、次の2種類の0が何を意味するか区別せよ。

1. 分散共分散行列で2つの部分ベクトル間の交差共分散が0。
2. 精度行列 $\boldsymbol\Omega=\boldsymbol\Sigma^{-1}$ の非対角成分 $\Omega_{ij}$ が0。

数値例として
$$
\boldsymbol\Sigma=
\begin{pmatrix}1&0&2\\0&4&0\\2&0&9\end{pmatrix}
$$
のとき $X_2$ と $(X_1,X_3)^{\mathsf T}$ の独立性を判定せよ。

また
$$
\boldsymbol\Omega=
\begin{pmatrix}2&0&1\\0&3&-1\\1&-1&2\end{pmatrix}
$$
のとき $X_1$ と $X_2$ が $X_3$ を条件として独立か判定せよ。

## 記号・用語
2つの部分ベクトルの交差分散共分散行列は、一方の成分と他方の成分の共分散を並べた行列である。
## 使用公式・定理
多変量正規分布では、部分ベクトル $\boldsymbol X_A,\boldsymbol X_B$ について
$$
\operatorname{Cov}(\boldsymbol X_A,\boldsymbol X_B)=\boldsymbol0
\quad\Longleftrightarrow\quad
\boldsymbol X_A\perp\boldsymbol X_B.
$$

一方、精度行列 $\boldsymbol\Omega=\boldsymbol\Sigma^{-1}$ について
$$
\Omega_{ij}=0
\quad\Longleftrightarrow\quad
X_i\perp X_j\mid\boldsymbol X_{-(i,j)}.
$$

## 一手／方針
$X_2$ と残り2成分の共分散を対応する行列成分から読む。

## 一手
**共分散行列の0は周辺独立、精度行列の0は他成分を条件とした条件付き独立。** どちらの行列を見ているかを最初に確認する。

## 答え
第1例では
$$
\operatorname{Cov}(X_2,X_1)=0,
\qquad
\operatorname{Cov}(X_2,X_3)=0,
$$
なので
$$
X_2\perp(X_1,X_3)^{\mathsf T}.
$$

第2例では
$$
\Omega_{12}=0
$$
なので
$$
X_1\perp X_2\mid X_3.
$$

## 計算例
第1例では交差共分散ベクトルが
$$
\operatorname{Cov}\left(X_2,
\begin{pmatrix}X_1\\X_3\end{pmatrix}\right)
=\begin{pmatrix}0&0\end{pmatrix}
$$
なので独立である。ただし
$$
\operatorname{Cov}(X_1,X_3)=2\ne0
$$
なので $X_1$ と $X_3$ は独立ではない。

第2例では $\Omega_{12}=0$ だが $\Omega_{13}=1\ne0$ なので
$$
X_1\perp X_2\mid X_3,
\qquad
X_1\not\perp X_3\mid X_2.
$$

## 注意
一般の分布では無相関から独立は導けない。「共分散行列の0」と「精度行列の0」は意味が異なるため、周辺独立と条件付き独立を混同しない。

<!-- CARD -->

---
id: engmv-normal-mean-cov-independence
title: 多変量正規標本の平均・共分散・Wishart分布を一続きで扱う
category: applied-engineering
subcategory: engineering-multivariate
topic: multivariate-normal-sampling-canonical
type: formula
difficulty: 3
priority: B
hashtags:
  - 多変量正規分布
  - 標本平均ベクトル
  - Wishart分布
  - 標本分散共分散行列
  - 独立性
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 多変量正規分布
---
## 問題
多変量正規分布から独立に
$$
\boldsymbol X_1,\ldots,\boldsymbol X_n
\sim N_p(\boldsymbol\mu,\boldsymbol\Sigma)
$$
を得たとする。不偏標本分散共分散行列を
$$
\boldsymbol S
=\frac1{n-1}\sum_{i=1}^n
(\boldsymbol X_i-\bar{\boldsymbol X})
(\boldsymbol X_i-\bar{\boldsymbol X})^{\mathsf T}
$$
とする。

1. $\bar{\boldsymbol X}$ の分布を求めよ。
2. $(n-1)\boldsymbol S$ の分布と、$\bar{\boldsymbol X}$ との関係を述べよ。
3. Wishart分布 $W_p(\boldsymbol\Sigma,\nu)$ の外積和による定義と期待値を述べよ。

数値例として $n=4$、
$$
\boldsymbol\Sigma=\operatorname{diag}(8,2)
$$
のとき $\operatorname{Cov}(\bar{\boldsymbol X})$ を求めよ。

## 記号・用語
$S=(n-1)^{-1}\sum_i(\boldsymbol X_i-\bar{\boldsymbol X})(\boldsymbol X_i-\bar{\boldsymbol X})^\top$ とする。
## 使用公式・定理
独立な正規ベクトルの平均も多変量正規分布に従い、
$$
\bar{\boldsymbol X}
\sim N_p\left(\boldsymbol\mu,\frac1n\boldsymbol\Sigma\right).
$$

また多変量正規標本では
$$
(n-1)\boldsymbol S\sim W_p(\boldsymbol\Sigma,n-1),
\qquad
\bar{\boldsymbol X}\perp\boldsymbol S.
$$

Wishart分布は、独立な
$$
\boldsymbol Z_1,\ldots,\boldsymbol Z_\nu
\sim N_p(\boldsymbol0,\boldsymbol\Sigma)
$$
に対し
$$
\boldsymbol W
=\sum_{i=1}^{\nu}\boldsymbol Z_i\boldsymbol Z_i^{\mathsf T}
\sim W_p(\boldsymbol\Sigma,\nu)
$$
と定義でき、
$$
E[\boldsymbol W]=\nu\boldsymbol\Sigma.
$$

## 一手／方針
平均に関する推測と分散共分散行列に関する推測を、独立な2部分へ分ける。

## 一手
**平均側と残差側に分解する。** 平均は独立正規ベクトルの線形結合なので共分散が $\Sigma/n$、中心化残差の外積和はWishart分布になり、正規標本ではこの2部分が独立になる。

## 答え
$$
\bar{\boldsymbol X}
\sim N_p\left(\boldsymbol\mu,\frac1n\boldsymbol\Sigma\right),
$$
$$
(n-1)\boldsymbol S\sim W_p(\boldsymbol\Sigma,n-1),
\qquad
\bar{\boldsymbol X}\perp\boldsymbol S.
$$
Wishart分布について
$$
E[\boldsymbol W]=\nu\boldsymbol\Sigma.
$$
数値例では
$$
\operatorname{Cov}(\bar{\boldsymbol X})
=\frac14\operatorname{diag}(8,2)
=\operatorname{diag}(2,0.5).
$$

## 計算例
標本平均について
$$
\bar{\boldsymbol X}=\frac1n\sum_{i=1}^n\boldsymbol X_i
$$
だから、独立性より
$$
\begin{aligned}
\operatorname{Cov}(\bar{\boldsymbol X})
&=\frac1{n^2}\sum_{i=1}^n\operatorname{Cov}(\boldsymbol X_i)\\
&=\frac1{n^2}\,n\boldsymbol\Sigma\\
&=\frac1n\boldsymbol\Sigma.
\end{aligned}
$$
$n=4$、$\boldsymbol\Sigma=\operatorname{diag}(8,2)$ なら
$$
\operatorname{Cov}(\bar{\boldsymbol X})
=\operatorname{diag}(2,0.5).
$$

Wishart期待値は外積和の定義から
$$
\begin{aligned}
E[\boldsymbol W]
&=\sum_{i=1}^{\nu}E[\boldsymbol Z_i\boldsymbol Z_i^{\mathsf T}]\\
&=\sum_{i=1}^{\nu}\boldsymbol\Sigma\\
&=\nu\boldsymbol\Sigma.
\end{aligned}
$$
したがって
$$
E[(n-1)\boldsymbol S]=(n-1)\boldsymbol\Sigma,
$$
よって $E[\boldsymbol S]=\boldsymbol\Sigma$ となり、不偏性とも整合する。

$p=1$ なら
$$
\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1}
$$
に戻るので、Wishart分布はカイ二乗分布の多変量版とみなせる。

## 注意
$\bar{\boldsymbol X}$ と $\boldsymbol S$ の独立性は多変量正規性に依存する。一般の非正規母集団では成立しない。Wishart分布の第1引数 $\boldsymbol\Sigma$ は尺度行列で、期待値そのものではなく $E[W]=\nu\Sigma$ である。

<!-- CARD -->

---
id: engmv-hotelling-two-sample
title: 2標本HotellingのT二乗統計量を計算してF検定まで行う
category: applied-engineering
subcategory: engineering-multivariate
topic: hotelling-two-sample-canonical
type: calc_step
difficulty: 4
priority: B
hashtags:
  - HotellingのT二乗検定
  - F分布
  - 平均ベクトル
  - 2標本問題
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 平均ベクトル
---
## 問題
独立な2群の多変量正規標本で、共通分散共分散行列を仮定する。$p=2$、$n_1=n_2=10$、標本平均差
$$
\boldsymbol d=(1,2)^{\mathsf T},
$$
プールした不偏標本分散共分散行列
$$
\boldsymbol S_p=\operatorname{diag}(2,4)
$$
とする。

1. 2標本Hotellingの $T^2$ を求めよ。
2. $H_0:\boldsymbol\mu_1=\boldsymbol\mu_2$ を5%水準で検定せよ。$F_{2,17;0.95}=3.59$ とする。

## 記号・用語
$S_p$ は2群の不偏分散共分散行列を自由度でプールした行列である。
## 使用公式・定理
2標本Hotelling統計量は
$$
T^2
=\frac{n_1n_2}{n_1+n_2}
\boldsymbol d^{\mathsf T}\boldsymbol S_p^{-1}\boldsymbol d.
$$
帰無仮説の下で
$$
F
=\frac{n_1+n_2-p-1}{(n_1+n_2-2)p}T^2
\sim F_{p,n_1+n_2-p-1}.
$$

## 一手／方針
平均差のMahalanobis二乗距離を求め、有効標本係数を掛ける。

## 一手
**平均差のMahalanobis二乗距離 → 有効標本係数で $T^2$ → F変換 → 臨界値比較** の一続きで処理する。

## 答え
$$
T^2=7.5.
$$
さらに
$$
F=\frac{17}{36}\cdot7.5\approx3.542.
$$
$3.542<3.59$ なので、5%水準では $H_0$ を棄却しない。

## 計算例
まず
$$
\boldsymbol S_p^{-1}=\operatorname{diag}\left(\frac12,\frac14\right).
$$
よって
$$
\begin{aligned}
\boldsymbol d^{\mathsf T}\boldsymbol S_p^{-1}\boldsymbol d
&=(1,2)
\begin{pmatrix}1/2&0\\0&1/4\end{pmatrix}
\begin{pmatrix}1\\2\end{pmatrix}\\
&=\frac12+1\\
&=1.5.
\end{aligned}
$$
有効標本係数は
$$
\frac{n_1n_2}{n_1+n_2}
=\frac{100}{20}=5
$$
なので
$$
T^2=5\cdot1.5=7.5.
$$
次に
$$
\begin{aligned}
F
&=\frac{10+10-2-1}{(10+10-2)2}\,7.5\\
&=\frac{17}{36}\,7.5\\
&\approx3.542.
\end{aligned}
$$
自由度は $(2,17)$ で、臨界値3.59を超えないため棄却しない。

## 注意
「棄却しない」は平均ベクトルが等しいと証明した意味ではない。2群の独立性、多変量正規性、共通分散共分散行列、および $\boldsymbol S_p$ の可逆性が必要である。

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
id: engmv-canonical-eigenvalue
title: 正準相関を一般固有値問題と白色化後の特異値から求める
category: applied-engineering
subcategory: engineering-multivariate
topic: canonical-correlation-canonical
type: calc_step
difficulty: 4
priority: C
hashtags:
  - 正準相関分析
  - 固有値
  - 特異値
  - 共分散行列
  - 白色化
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 正準相関分析
---
## 問題
2つの確率ベクトル $\boldsymbol X,\boldsymbol Y$ の共分散ブロックを
$$
\boldsymbol\Sigma_{XX},\quad
\boldsymbol\Sigma_{YY},\quad
\boldsymbol\Sigma_{XY}
$$
とする。正準相関を求める一般の固有値問題を書け。

さらに次を計算せよ。

**(1) 白色化済み・対角交差共分散**
$$
\boldsymbol\Sigma_{XX}=I_2,\qquad
\boldsymbol\Sigma_{YY}=I_2,\qquad
\boldsymbol\Sigma_{XY}=\operatorname{diag}(0.8,0.3).
$$

**(2) 白色化済み・非対角交差共分散**
$$
\boldsymbol\Sigma_{XY}
=\begin{pmatrix}0.5&0.4\\0.4&0.5\end{pmatrix}.
$$

## 記号・用語
$\Sigma_{YX}=\Sigma_{XY}^\top$ とする。
## 使用公式・定理
正準相関 $\rho_j$ の二乗は
$$
\boldsymbol M
=\boldsymbol\Sigma_{XX}^{-1}
\boldsymbol\Sigma_{XY}
\boldsymbol\Sigma_{YY}^{-1}
\boldsymbol\Sigma_{YX}
$$
の固有値である。

したがって
$$
\lambda_j(\boldsymbol M)=\rho_j^2.
$$

両群が白色化されて
$$
\boldsymbol\Sigma_{XX}=I,
\qquad
\boldsymbol\Sigma_{YY}=I
$$
なら
$$
\boldsymbol M
=\boldsymbol\Sigma_{XY}\boldsymbol\Sigma_{YX},
$$
よって正準相関は $\boldsymbol\Sigma_{XY}$ の特異値に一致する。

## 一手／方針
単位行列の逆行列を消し、非対角な交差分散共分散行列の積を作って固有値を求める。

## 一手
**一般形では共分散で白色化してから交差構造を見る。** 固有値は正準相関の二乗、白色化済みなら交差共分散の特異値をそのまま読める。

## 答え
(1) の正準相関は
$$
\rho_1=0.8,\qquad\rho_2=0.3.
$$

(2) では
$$
\boldsymbol\Sigma_{XY}\boldsymbol\Sigma_{YX}
=\begin{pmatrix}0.41&0.40\\0.40&0.41\end{pmatrix}
$$
の固有値が $0.81,0.01$ なので
$$
\rho_1=0.9,\qquad\rho_2=0.1.
$$

## 計算例
(1) では交差共分散が対角行列なので特異値は対角成分の絶対値であり、直ちに
$$
0.8,\ 0.3
$$
を得る。第1正準変量対は $X_1,Y_1$、第2は $X_2,Y_2$ に対応する。

(2) では対称行列なので
$$
\begin{aligned}
\boldsymbol\Sigma_{XY}^2
&=
\begin{pmatrix}0.5&0.4\\0.4&0.5\end{pmatrix}^2\\
&=\begin{pmatrix}0.41&0.40\\0.40&0.41\end{pmatrix}.
\end{aligned}
$$
行列
$$
\begin{pmatrix}a&b\\b&a\end{pmatrix}
$$
の固有値は $a+b,a-b$ だから
$$
0.81,\ 0.01.
$$
その平方根を取り
$$
\rho_1=0.9,\qquad\rho_2=0.1.
$$

## 注意
正準相関は係数ベクトルの符号を反転できるため非負で定義する。一般の場合は $\Sigma_{XX},\Sigma_{YY}$ を無視せず、両群内の分散共分散で標準化する。
