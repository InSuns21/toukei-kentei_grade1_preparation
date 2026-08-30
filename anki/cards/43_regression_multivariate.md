---
id: mv-mean-covariance-numeric
title: 多変量標本の平均ベクトルと分散共分散行列を計算する
category: applied-common
subcategory: applied-multivariate
topic: multivariate-mean-covariance
type: calc_step
difficulty: 3
priority: A
hashtags: [平均ベクトル, 分散共分散行列, 多変量解析]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 多変量平均ベクトルと分散共分散行列 }]
---

## 問題
2次元観測 $(1,2),(3,4)$ の標本平均ベクトルと、不偏標本分散共分散行列を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$\boldsymbol S=(n-1)^{-1}\sum_i(\boldsymbol x_i-\bar{\boldsymbol x})(\boldsymbol x_i-\bar{\boldsymbol x})^{\mathsf T}$。

## 一手
多変量の分散共分散行列は、まず平均ベクトルを引いて偏差ベクトルを作り、その**外積を足して $n-1$ で割る**。

## 答え
$$
\overline{\boldsymbol x}
=\begin{pmatrix}2\\3\end{pmatrix},
\qquad
\boldsymbol S
=\begin{pmatrix}2&2\\2&2\end{pmatrix}.
$$

## 計算例
まず平均ベクトルは
$$
\begin{aligned}
\overline{\boldsymbol x}
&=\frac12\left\{
\begin{pmatrix}1\\2\end{pmatrix}
+\begin{pmatrix}3\\4\end{pmatrix}
\right\}\\
&=\begin{pmatrix}2\\3\end{pmatrix}.
\end{aligned}
$$
したがって2本の偏差ベクトルは
$$
\boldsymbol d_1
=\begin{pmatrix}-1\\-1\end{pmatrix},
\qquad
\boldsymbol d_2
=\begin{pmatrix}1\\1\end{pmatrix}.
$$
それぞれの外積は
$$
\boldsymbol d_1\boldsymbol d_1^{\mathsf T}
=\begin{pmatrix}1&1\\1&1\end{pmatrix},
\qquad
\boldsymbol d_2\boldsymbol d_2^{\mathsf T}
=\begin{pmatrix}1&1\\1&1\end{pmatrix}.
$$
$n=2$ なので不偏標本分散共分散行列は
$$
\begin{aligned}
\boldsymbol S
&=\frac1{n-1}
\left(
\boldsymbol d_1\boldsymbol d_1^{\mathsf T}
+\boldsymbol d_2\boldsymbol d_2^{\mathsf T}
\right)\\
&=\begin{pmatrix}2&2\\2&2\end{pmatrix}.
\end{aligned}
$$
最後に
$$
\det(\boldsymbol S)=2\cdot2-2\cdot2=0
$$
なので、この例では2変数が完全な直線関係にあり $\boldsymbol S$ は特異である。

## 注意
対角は分散、非対角は共分散。

<!-- CARD -->

---
id: reg-software-output-interpretation
title: 重回帰の係数表と分散分析出力を解釈する
category: applied-common
subcategory: applied-multiple-regression
topic: regression-software-output
type: recognition
difficulty: 3
priority: S
hashtags: [重回帰モデル, ソフトウェア出力, F検定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ソフトウェア出力結果の解釈 }]
---

## 問題
重回帰出力で $X_1$ の Estimate=1.20、Std. Error=0.40、t=3.00、p=0.004、回帰全体はF=8.0、p=0.001だった。何を結論するか。

## 記号・用語
- SE：標準誤差（standard error）

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$t=\widehat\beta_j/\operatorname{SE}(\widehat\beta_j)$。全体F検定と個別t検定は異なる帰無仮説を扱う。

## 答え
他の説明変数を一定とすると、$X_1$ の1単位増加に対する平均応答差の推定値は1.20。$H_0:\beta_1=0$ はp=0.004なので5%で棄却する。全傾き0という帰無仮説もF検定のp=0.001なので棄却する。

## 計算例
$1.20/0.40=3.00$ と出力内の整合性を確認できる。

## 注意
有意性だけで効果の大きさ・因果性を結論しない。

<!-- CARD -->

---
id: reg-general-linear-hypothesis
title: 一般線形仮説のF統計量を計算する
category: applied-common
subcategory: applied-multiple-regression
topic: general-linear-hypothesis
type: calc_step
difficulty: 4
priority: S
hashtags: [重回帰モデル, 一般線形仮説, F検定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 重回帰モデル }]
---

## 問題
$H_0:\boldsymbol R\boldsymbol\beta=\boldsymbol r$ の制約数をqとする。$\boldsymbol R\widehat{\boldsymbol\beta}-\boldsymbol r=(2,1)^{\mathsf T}$、$\boldsymbol R(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}\boldsymbol R^{\mathsf T}=\boldsymbol I_2$、$s^2=5$ のときF統計量を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

正規線形モデルの帰無仮説下で $F\sim F_{q,n-p}$。

## 一手
$H_0:\boldsymbol R\boldsymbol\beta=\boldsymbol r$ では、まず制約からのずれ
$$
\boldsymbol d=\boldsymbol R\widehat{\boldsymbol\beta}-\boldsymbol r
$$
を作り、$\boldsymbol d^{\mathsf T}A^{-1}\boldsymbol d$ という二次形式を $q s^2$ で割る。

## 答え
$$
F=0.5.
$$
帰無仮説の下では $F_{2,n-p}$ 分布と比較する。

## 計算例
ここでは
$$
\boldsymbol d
=\boldsymbol R\widehat{\boldsymbol\beta}-\boldsymbol r
=\begin{pmatrix}2\\1\end{pmatrix},
$$
$$
A
=\boldsymbol R(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}\boldsymbol R^{\mathsf T}
=\boldsymbol I_2
$$
なので $A^{-1}=\boldsymbol I_2$ である。まず分子の二次形式は
$$
\begin{aligned}
\boldsymbol d^{\mathsf T}A^{-1}\boldsymbol d
&=\begin{pmatrix}2&1\end{pmatrix}
  \begin{pmatrix}1&0\\0&1\end{pmatrix}
  \begin{pmatrix}2\\1\end{pmatrix}\\
&=2^2+1^2\\
&=5.
\end{aligned}
$$
制約数は $q=2$、$s^2=5$ だから分母は
$$
qs^2=2\cdot5=10.
$$
よって
$$
F=\frac5{10}=0.5.
$$
$q=1$ の1本の線形制約なら、このF統計量は対応するt統計量の二乗と一致する。

## 注意
Rは行フルランクとする。

<!-- CARD -->

---
id: reg-press-loocv
title: PRESS残差からLOOCV誤差を計算する
category: applied-common
subcategory: applied-multiple-regression
topic: press-loocv
type: calc_step
difficulty: 4
priority: A
hashtags: [回帰診断法, PRESS, 交差検証]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 回帰診断法 }]
---

## 問題
最小二乗法の残差が $e_i=2$、レバレッジが $h_{ii}=0.2$ の観測について、leave-one-out残差を求めよ。

## 記号・用語
- LOOCV：1個抜き交差検証（leave-one-out cross-validation）
- PRESS：予測残差平方和
- レバレッジ：説明変数空間での観測の位置を表すハット行列の対角要素

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$PRESS=\sum_i\{e_i/(1-h_{ii})\}^2$ なので、モデルをn回再推定せずLOOCVを計算できる。

## 答え
$$e_{(i)}=y_i-\widehat y_{(i)}=\frac{e_i}{1-h_{ii}}
=\frac2{0.8}=2.5.$$

## 計算例
この観測のPRESS寄与は $2.5^2=6.25$。

## 注意
式は線形最小二乗法に対する恒等式。

<!-- CARD -->

---
id: reg-dffits-numeric
title: DFFITSで予測への影響を測る
category: applied-common
subcategory: applied-multiple-regression
topic: dffits
type: calc_step
difficulty: 4
priority: B
hashtags: [回帰診断法, DFFITS, 影響点]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 回帰診断法 }]
---

## 問題
外的スチューデント化残差 $t_i=2$、$h_{ii}=0.2$ のときDFFITSを求めよ。

## 記号・用語
- DFFITS：観測を除いたときの当てはめ値変化を測る回帰診断量
- レバレッジ：説明変数空間での観測の位置を表すハット行列の対角要素

## 使用公式・定理
DFFITSは観測 $i$ を除いたときの $i$ 自身の当てはめ値変化を尺度化し、外的スチューデント化残差 $t_i$ を用いて
$$
\operatorname{DFFITS}_i
=t_i\sqrt{\frac{h_{ii}}{1-h_{ii}}}
$$
と書ける。

一方、係数 $j$ への影響は
$$
\operatorname{DFBETA}_{ij}
=\widehat\beta_j-\widehat\beta_{j(i)}
$$
で測る。標準誤差で尺度化したものをDFBETASと呼ぶ。

## 一手
DFFITSは、外的スチューデント化残差の大きさに
$$
\sqrt{\frac{h_{ii}}{1-h_{ii}}}
$$
というレバレッジの増幅係数を掛ける。

## 答え
与えられた $t_i=2,h_{ii}=0.2$ では
$$
\operatorname{DFFITS}_i=1.
$$
DFFITSは予測値への影響、DFBETAは特定の回帰係数への影響を測る。

## 計算例
まず
$$
\frac{h_{ii}}{1-h_{ii}}
=\frac{0.2}{0.8}=\frac14,
$$
したがって
$$
\sqrt{\frac{h_{ii}}{1-h_{ii}}}=\frac12.
$$
よって
$$
\operatorname{DFFITS}_i
=2\times\frac12=1.
$$

同じ観測について、ある係数が
$$
\widehat\beta_j=1.2,
\qquad
\widehat\beta_{j(i)}=0.8
$$
なら
$$
\operatorname{DFBETA}_{ij}=1.2-0.8=0.4.
$$
正の値は、その観測を含めることで係数 $j$ が正方向へ0.4動いたことを表す。

## 注意
DFFITS・DFBETAはいずれも「削除前後の変化」を見る影響診断である。大残差や高レバレッジの観測は大きな影響を持ち得るが、閾値超過だけで機械的にデータを削除しない。

<!-- CARD -->

---
id: reg-hc3-sandwich
title: HC3頑健共分散のレバレッジ補正を書く
category: applied-common
subcategory: applied-multiple-regression
topic: hc3-standard-error
type: formula
difficulty: 4
priority: A
hashtags: [異分散, HC3, サンドイッチ推定量]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 異分散と標準誤差 }]
---

## 問題
HC3型の異分散頑健共分散推定量を書け。

## 記号・用語
- HC3：レバレッジ補正を行う異分散頑健共分散推定量
- レバレッジ：説明変数空間での観測の位置を表すハット行列の対角要素

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

HC3は各残差をレバレッジで強く補正するサンドイッチ推定量。

## 答え
$$\widehat{\operatorname{Var}}_{\mathrm{HC3}}(\widehat{\boldsymbol\beta})
=(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}
\boldsymbol X^{\mathsf T}\operatorname{diag}\left\{\frac{e_i^2}{(1-h_{ii})^2}\right\}
\boldsymbol X(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}.$$

## 計算例
$h_{ii}=0$ ならその観測の補正倍率は1。

## 注意
誤差の独立性はなお必要で、系列相関には別の補正を使う。

<!-- CARD -->

---
id: reg-feasible-gls-steps
title: 実行可能一般化最小二乗法の手順を答える
category: applied-common
subcategory: applied-multiple-regression
topic: feasible-gls
type: recognition
difficulty: 3
priority: B
hashtags: [一般化最小二乗推定, FGLS, 分散モデル]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 一般化最小二乗推定 }]
---

## 問題
誤差分散共分散行列Ωが未知だが母数化できるとき、実行可能一般化最小二乗法（FGLS）の手順を述べよ。

## 記号・用語
- FGLS：実行可能一般化最小二乗法

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

既知Ωの一般化最小二乗推定量へ推定Ωを代入する。

## 答え
まず最小二乗法などで残差を得て分散・相関モデルの母数を推定し $\widehat\Omega$ を作る。次に
$$\widehat{\boldsymbol\beta}_{\mathrm{FGLS}}
=(\boldsymbol X^{\mathsf T}\widehat\Omega^{-1}\boldsymbol X)^{-1}
\boldsymbol X^{\mathsf T}\widehat\Omega^{-1}\boldsymbol y$$
を計算する。

## 計算例
必要なら分散モデルと係数推定を反復更新する。

## 注意
Ωの誤指定は効率や標準誤差へ影響する。

<!-- CARD -->

---
id: reg-nested-cross-validation
title: 入れ子交差検証の役割を説明する
category: applied-common
subcategory: applied-multiple-regression
topic: nested-cross-validation
type: recognition
difficulty: 3
priority: B
hashtags: [変数選択, 交差検証, 予測評価]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 変数選択 }]
---

## 問題
正則化強度を交差検証で選ぶとき、同じ交差検証値を最終性能として報告せず入れ子交差検証を使う理由を述べよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

評価対象は固定モデルでなく「学習・選択手順全体」。

## 答え
内側分割でハイパーパラメータを選び、外側の未使用分割で選択手順全体を評価することで、調整に使ったデータへの楽観的バイアスを避ける。

## 計算例
外側5分割それぞれで内側交差検証をやり直す。

## 注意
前処理や標準化も内側の学習データだけで推定する。

<!-- CARD -->

---
id: mv-covariance-linear-transform
title: 線形変換後の分散共分散行列を求める
category: applied-common
subcategory: applied-multivariate
topic: covariance-transform
type: calc_step
difficulty: 3
priority: A
hashtags: [分散共分散行列, 線形変換, 多変量解析]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 多変量平均ベクトルと分散共分散行列 }]
---

## 問題
$\operatorname{Var}(\boldsymbol X)=\operatorname{diag}(1,4)$、$Y=X_1+2X_2$ の分散を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$\operatorname{Var}(\boldsymbol A\boldsymbol X)=\boldsymbol A\boldsymbol\Sigma\boldsymbol A^{\mathsf T}$。

## 答え
$\boldsymbol a=(1,2)^{\mathsf T}$ として
$$\operatorname{Var}(Y)=\boldsymbol a^{\mathsf T}\boldsymbol\Sigma\boldsymbol a
=1^2(1)+2^2(4)=17.$$

## 計算例
共分散0なので交差項はない。

## 注意
相関があれば $2a_1a_2\sigma_{12}$ を含む。

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
hashtags: [Mahalanobis距離, 分散共分散行列, 外れ値]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: Mahalanobis距離 }]
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

<!-- CARD -->

---
id: mv-hotelling-one-sample
title: 1標本HotellingのT²を計算する
category: applied-common
subcategory: applied-multivariate
topic: hotelling-t-squared
type: calc_step
difficulty: 4
priority: B
hashtags: [HotellingのT2検定, 平均ベクトル, 多変量正規分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: HotellingのT²検定 }]
---

## 問題
$p$ 次元正規母集団から独立に $n$ 個を標本抽出し、標本分散共分散行列 $\boldsymbol S$ は可逆とする。$H_0:\boldsymbol\mu=\boldsymbol\mu_0$ に対する1標本Hotellingの $T^2$ 統計量と、その正確なF変換を書け。

数値例として $n=10,p=2$、
$$
\bar{\boldsymbol x}-\boldsymbol\mu_0=(1,2)^{\mathsf T},
\qquad
\boldsymbol S=\operatorname{diag}(2,4)
$$
のとき $T^2$ とF統計量を求めよ。

## 使用公式・定理
1標本Hotelling統計量は
$$
T^2=n(\bar{\boldsymbol x}-\boldsymbol\mu_0)^{\mathsf T}
\boldsymbol S^{-1}
(\bar{\boldsymbol x}-\boldsymbol\mu_0).
$$
多変量正規母集団からの独立標本で $n>p$、$\boldsymbol S$ が可逆なら、帰無仮説の下で
$$
F=\frac{n-p}{p(n-1)}T^2
\sim F_{p,n-p}.
$$

## 一手
まず平均ベクトル差を共分散で標準化した二次形式として $T^2$ を計算し、その同じ値を係数 $(n-p)/\{p(n-1)\}$ でF統計量へ変換する。別々の公式ではなく一つの検定手順として扱う。

## 答え
数値例では
$$
T^2=15,
\qquad
F=\frac{20}{3}\approx6.67,
$$
帰無仮説の下で $F_{2,8}$ と比較する。

## 計算例
まず
$$
\boldsymbol S^{-1}=\operatorname{diag}\left(\frac12,\frac14\right).
$$
したがって
$$
\begin{aligned}
T^2
&=10(1,2)
\begin{pmatrix}1/2&0\\0&1/4\end{pmatrix}
\begin{pmatrix}1\\2\end{pmatrix}\\
&=10\left(\frac12+\frac{4}{4}\right)\\
&=10\cdot\frac32\\
&=15.
\end{aligned}
$$
次に
$$
\begin{aligned}
F
&=\frac{10-2}{2(10-1)}15\\
&=\frac8{18}15\\
&=\frac{20}{3}\\
&\approx6.67.
\end{aligned}
$$

## 注意
各成分へ別々にt検定を行う方法では、成分間相関と多重性を正しく扱えない。ここでは標本分散共分散行列の分母を $n-1$ とする規約を使う。

<!-- CARD -->

---
id: mv-pca-variance-max
title: 主成分分析を行列選択から固有値・得点・負荷量まで通す
category: applied-common
subcategory: applied-multivariate
topic: pca-canonical
type: calc_step
difficulty: 4
priority: A
hashtags:
  - 主成分分析
  - 固有値
  - 寄与率
  - 主成分得点
  - 主成分負荷量
  - 相関行列
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 主成分分析
---

## 問題
中心化した $p$ 次元データの主成分分析を考える。

1. 第1主成分が分散共分散行列の最大固有値に対応する固有ベクトルになることを、分散最大化から導け。
2. 変数の単位・分散が大きく異なるとき、共分散行列PCAと相関行列PCAをどう使い分けるか。
3. 固有値が $2.4,0.5,0.1$、第1固有ベクトルが $(0.70,0.68,0.22)^{\mathsf T}$ の標準化PCAについて、第1主成分の寄与率と、標準化観測 $\boldsymbol z=(1,-1,0.5)^{\mathsf T}$ の第1主成分得点を求めよ。
4. 共分散PCAで固有値 $\lambda_j$、単位固有ベクトルの第 $k$ 成分 $a_{kj}$、元変数 $X_k$ の標準偏差 $s_k$ が与えられたとき、$X_k$ と第 $j$ 主成分の相関を求めよ。

## 使用公式・定理
主成分分析（PCA）では、単位ベクトル $\boldsymbol a$ への射影
$$
Z=\boldsymbol a^{\mathsf T}(\boldsymbol X-\boldsymbol\mu)
$$
の分散
$$
\operatorname{Var}(Z)=\boldsymbol a^{\mathsf T}\boldsymbol\Sigma\boldsymbol a
$$
を
$$
\boldsymbol a^{\mathsf T}\boldsymbol a=1
$$
の下で最大化する。Lagrange関数
$$
L(\boldsymbol a,\lambda)
=\boldsymbol a^{\mathsf T}\boldsymbol\Sigma\boldsymbol a
-\lambda(\boldsymbol a^{\mathsf T}\boldsymbol a-1)
$$
を $\boldsymbol a$ で微分すると
$$
2\boldsymbol\Sigma\boldsymbol a-2\lambda\boldsymbol a=\boldsymbol0,
$$
したがって
$$
\boldsymbol\Sigma\boldsymbol a=\lambda\boldsymbol a.
$$
よって第1主成分方向は最大固有値 $\lambda_1$ の単位固有ベクトル $\boldsymbol a_1$ である。第2主成分以降は前の主成分に直交する条件の下で同様に得られる。

固有値を
$$
\lambda_1\ge\cdots\ge\lambda_p
$$
とすると、第 $j$ 主成分の分散は $\lambda_j$、寄与率は
$$
\frac{\lambda_j}{\sum_{r=1}^p\lambda_r},
$$
上位 $m$ 主成分を残した累積寄与率は
$$
\frac{\sum_{j=1}^m\lambda_j}{\sum_{r=1}^p\lambda_r}.
$$
上位 $m$ 成分で再構成したときに捨てる分散の総和は
$$
\sum_{j=m+1}^p\lambda_j.
$$

測定単位や分散の大きさ自体に意味があるなら分散共分散行列 $\boldsymbol S$ を使う。尺度差を消して相関構造を比較したいなら
$$
Z_k=\frac{X_k-\bar X_k}{s_k}
$$
と標準化し、相関行列 $\boldsymbol R$ に対して同じ固有値問題を解く。

共分散PCAで第 $j$ 主成分を
$$
Z_j=\boldsymbol a_j^{\mathsf T}(\boldsymbol X-\boldsymbol\mu)
$$
とすれば
$$
\operatorname{Var}(Z_j)=\lambda_j,
\qquad
\operatorname{Cov}(X_k,Z_j)=\lambda_j a_{kj}.
$$
したがって変数 $X_k$ と主成分 $Z_j$ の相関は
$$
\operatorname{Corr}(X_k,Z_j)
=\frac{\sqrt{\lambda_j}\,a_{kj}}{s_k}.
$$
この相関を主成分負荷量と呼ぶ規約がある。

## 一手
**PCAは「使う行列を決める→固有値問題を解く→固有値から分散・寄与率、固有ベクトルから得点軸を読む」の一続きで処理する。** 負荷量を変数との相関として問われたら、固有ベクトル成分だけで終わらず $\sqrt{\lambda_j}/s_k$ を掛ける。

## 答え
分散最大化の一階条件は
$$
\boldsymbol\Sigma\boldsymbol a=\lambda\boldsymbol a
$$
であり、目的値は
$$
\boldsymbol a^{\mathsf T}\boldsymbol\Sigma\boldsymbol a
=\lambda
$$
だから最大固有値の方向が第1主成分になる。

数値例では固有値総和は
$$
2.4+0.5+0.1=3.0
$$
なので第1主成分の寄与率は
$$
\frac{2.4}{3.0}=0.80.
$$
第1・第2変数に同方向の大きな重み、第3変数に比較的小さな重みを置く軸である。

標準化観測の第1主成分得点は
$$
\begin{aligned}
z_{\mathrm{PC1}}
&=0.70(1)+0.68(-1)+0.22(0.5)\\
&=0.70-0.68+0.11\\
&=0.13.
\end{aligned}
$$

また $\lambda_j=4,a_{kj}=0.3,s_k=1.5$ なら
$$
\operatorname{Corr}(X_k,Z_j)
=\frac{\sqrt4\cdot0.3}{1.5}
=\frac{0.6}{1.5}
=0.4.
$$

## 計算例
相関行列
$$
\boldsymbol R=
\begin{pmatrix}1&0.8\\0.8&1\end{pmatrix}
$$
で標準化PCAを行う。固有値は
$$
\lambda_1=1+0.8=1.8,
\qquad
\lambda_2=1-0.8=0.2,
$$
第1固有ベクトルは
$$
\boldsymbol a_1=\frac1{\sqrt2}(1,1)^{\mathsf T}.
$$
したがって
$$
\mathrm{PC1}=\frac{Z_1+Z_2}{\sqrt2},
$$
寄与率は
$$
\frac{1.8}{1.8+0.2}=0.90.
$$
第1主成分だけで標準化後の全分散の90%を表す。

一方、分散共分散行列
$$
\boldsymbol S=\begin{pmatrix}2&1\\1&2\end{pmatrix}
$$
なら
$$
\det(\boldsymbol S-\lambda\boldsymbol I)
=(\lambda-3)(\lambda-1)
$$
なので最大固有値は3、対応方向は
$$
\frac1{\sqrt2}(1,1)^{\mathsf T}.
$$
第1成分だけ残したときに捨てる分散は $\lambda_2=1$ である。

## 注意
データは少なくとも中心化してからPCAを行う。共分散PCAは測定単位の変更で結果が変わるので、単位差に科学的意味がない場合は標準化を検討する。ただし標準化が常に正しいわけではない。

固有ベクトル全体の符号は任意であり、$\boldsymbol a$ と $-\boldsymbol a$ は同じ主成分軸を表す。文献・ソフトウェアによって「主成分負荷量」を固有ベクトル成分そのものと呼ぶ場合と、変数と主成分の相関と呼ぶ場合があるため定義を確認する。

<!-- CARD -->

---
id: mv-factor-model-covariance
title: 因子分析を共分散分解・回転・因子得点まで通す
category: applied-common
subcategory: applied-multivariate
topic: factor-analysis-canonical
type: calc_step
difficulty: 4
priority: B
hashtags:
  - 因子分析
  - 因子負荷量
  - 共通性
  - 独自性
  - 因子回転
  - Varimax回転
  - 因子得点
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 因子分析モデル
---

## 問題
因子分析モデル
$$
\boldsymbol X=\boldsymbol\mu+\boldsymbol\Lambda\boldsymbol F+\boldsymbol\varepsilon
$$
を考える。$\operatorname{Var}(\boldsymbol F)=\boldsymbol I$、$\operatorname{Var}(\boldsymbol\varepsilon)=\boldsymbol\Psi$、$\boldsymbol F$ と $\boldsymbol\varepsilon$ は独立とする。

1. $\boldsymbol X$ の分散共分散行列を求め、標準化変数の共通性と独自性を書け。
2. 直交行列 $\boldsymbol T$ による回転 $\boldsymbol\Lambda^*=\boldsymbol\Lambda\boldsymbol T$ が共通共分散部分を変えないことを示し、Varimax回転の目的を述べよ。
3. $\operatorname{Var}(\boldsymbol X)=\boldsymbol\Sigma$ とするとき、回帰法による因子得点予測式を導け。

## 記号・用語
- PCA：主成分分析（principal component analysis）

## 使用公式・定理
独立性から
$$
\boldsymbol\Sigma
=\operatorname{Var}(\boldsymbol X)
=\boldsymbol\Lambda\boldsymbol\Lambda^{\mathsf T}+\boldsymbol\Psi.
$$
通常 $\boldsymbol\Psi$ は対角行列で、第 $i$ 変数の共通性は
$$
h_i^2
=(\boldsymbol\Lambda\boldsymbol\Lambda^{\mathsf T})_{ii}
=\sum_{j=1}^m\lambda_{ij}^2,
$$
独自性は $\psi_i=\Psi_{ii}$。標準化変数なら
$$
1=h_i^2+\psi_i.
$$

直交回転では
$$
\boldsymbol T\boldsymbol T^{\mathsf T}=\boldsymbol I,
\qquad
\boldsymbol\Lambda^*=\boldsymbol\Lambda\boldsymbol T,
$$
なので
$$
\boldsymbol\Lambda^*\boldsymbol\Lambda^{*\mathsf T}
=\boldsymbol\Lambda\boldsymbol T\boldsymbol T^{\mathsf T}\boldsymbol\Lambda^{\mathsf T}
=\boldsymbol\Lambda\boldsymbol\Lambda^{\mathsf T}.
$$
したがって直交回転は再現する共通共分散を変えず、負荷量の見え方だけを変える。

因子得点は観測ごとの潜在因子 $\boldsymbol F$ を予測する量である。最良線形予測の係数は
$$
\operatorname{Cov}(\boldsymbol F,\boldsymbol X)
\operatorname{Var}(\boldsymbol X)^{-1}.
$$
モデルより
$$
\begin{aligned}
\operatorname{Cov}(\boldsymbol F,\boldsymbol X)
&=\operatorname{Cov}\left(\boldsymbol F,
\boldsymbol\Lambda\boldsymbol F+\boldsymbol\varepsilon\right)\\
&=\operatorname{Var}(\boldsymbol F)\boldsymbol\Lambda^{\mathsf T}\\
&=\boldsymbol\Lambda^{\mathsf T},
\end{aligned}
$$
だから回帰法による予測は
$$
\widehat{\boldsymbol F}
=\boldsymbol\Lambda^{\mathsf T}\boldsymbol\Sigma^{-1}
(\boldsymbol X-\boldsymbol\mu).
$$

## 一手
**因子分析は $\Sigma=\Lambda\Lambda^T+\Psi$ を中心に整理する。** 変数側では共通性・独自性、因子軸側では回転、観測個体側では $\Lambda^T\Sigma^{-1}(X-\mu)$ による因子得点予測へつながる。

## 答え
1因子で
$$
\boldsymbol\lambda=\begin{pmatrix}0.8\\0.6\end{pmatrix},
\qquad
\boldsymbol\Psi=\begin{pmatrix}0.36&0\\0&0.64\end{pmatrix}
$$
なら
$$
\boldsymbol\lambda\boldsymbol\lambda^{\mathsf T}
=\begin{pmatrix}0.64&0.48\\0.48&0.36\end{pmatrix},
$$
$$
\boldsymbol\Sigma
=\begin{pmatrix}1&0.48\\0.48&1\end{pmatrix}.
$$
共通性は $(0.64,0.36)$、独自性は $(0.36,0.64)$ である。

2因子への負荷量が $(0.6,0.5)$ の標準化変数なら
$$
h_i^2=0.6^2+0.5^2=0.61,
\qquad
\psi_i=0.39.
$$

## 計算例
直交回転の例として
$$
\boldsymbol T=
\begin{pmatrix}0&-1\\1&0\end{pmatrix}
$$
なら $\boldsymbol T\boldsymbol T^{\mathsf T}=\boldsymbol I$ なので、回転前後で
$$
\boldsymbol\Lambda\boldsymbol\Lambda^{\mathsf T}
$$
は同じである。Varimax回転は負荷量平方のばらつきを大きくし、各変数が少数の因子に強く負荷する単純構造を狙う。

因子得点の具体例として1因子、
$$
\boldsymbol\Lambda=\begin{pmatrix}0.8\\0.6\end{pmatrix},
\qquad
\boldsymbol\Sigma=
\begin{pmatrix}1&0.48\\0.48&1\end{pmatrix},
\qquad
\boldsymbol X-\boldsymbol\mu=\begin{pmatrix}1\\0\end{pmatrix}
$$
とする。逆行列は
$$
\boldsymbol\Sigma^{-1}
=\frac1{1-0.48^2}
\begin{pmatrix}1&-0.48\\-0.48&1\end{pmatrix}.
$$
したがって
$$
\widehat F
=\begin{pmatrix}0.8&0.6\end{pmatrix}
\boldsymbol\Sigma^{-1}
\begin{pmatrix}1\\0\end{pmatrix}
=\frac{0.8-0.288}{0.7696}
\approx0.665.
$$

## 注意
PCAは観測分散を直交方向へ分解する方法で、因子分析は潜在因子と独自誤差を仮定する確率モデルである。直交回転では因子間無相関を保つが、斜交回転では因子間相関を許す。因子得点は観測された真の因子値ではなく推定値で、回帰法以外の推定法もあるため一意ではない。回転後の因子の符号や順序も一意ではない。

<!-- CARD -->

---
id: mv-lda-classification-rule
title: Fisher方向からLDAの判別得点・分類境界まで通す
category: applied-common
subcategory: applied-multivariate
topic: lda-classification-canonical
type: formula
difficulty: 4
priority: B
hashtags:
  - 判別分析
  - Fisher線形判別
  - LDA
  - QDA
  - 事前確率
  - プール分散共分散行列
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 判別分析
---

## 問題
2群の平均を $\boldsymbol\mu_1,\boldsymbol\mu_0$、共通群内分散共分散行列を $\boldsymbol\Sigma$ とする。

1. Fisherの線形判別基準を書き、最適方向が
$$
\boldsymbol w\propto\boldsymbol\Sigma^{-1}(\boldsymbol\mu_1-\boldsymbol\mu_0)
$$
になることを説明せよ。
2. 各群が共通 $\boldsymbol\Sigma$ の多変量正規分布に従い、事前確率が $\pi_k$ のとき、LDAの判別得点を書け。
3. 共通共分散が未知の2群で、不偏標本分散共分散行列 $\boldsymbol S_1,\boldsymbol S_2$ からプール推定量を書け。
4. LDAとQDAの分類境界の違いを説明せよ。

## 記号・用語
- LDA：線形判別分析
- QDA：二次判別分析

## 使用公式・定理
2群の平均差を
$$
\boldsymbol d=\boldsymbol\mu_1-\boldsymbol\mu_0
$$
とする。Fisherの基準は
$$
J(\boldsymbol w)
=\frac{(\boldsymbol w^{\mathsf T}\boldsymbol d)^2}
{\boldsymbol w^{\mathsf T}\boldsymbol\Sigma\boldsymbol w}.
$$
分母を1に固定して分子を最大化するLagrange条件から
$$
\boldsymbol d\boldsymbol d^{\mathsf T}\boldsymbol w
=\lambda\boldsymbol\Sigma\boldsymbol w
$$
となる。左辺は $\boldsymbol d$ の定数倍なので
$$
\boldsymbol w\propto\boldsymbol\Sigma^{-1}\boldsymbol d.
$$
つまり平均差をそのまま使うのではなく、群内分散の大きい方向を $\boldsymbol\Sigma^{-1}$ で割り引く。

一方、確率モデルとして
$$
\boldsymbol X\mid G=k\sim N_p(\boldsymbol\mu_k,\boldsymbol\Sigma)
$$
と共通分散共分散を仮定すると、対数事後確率から群 $k$ のLDA得点は、群によらない項を除いて
$$
\delta_k(\boldsymbol x)
=\boldsymbol x^{\mathsf T}\boldsymbol\Sigma^{-1}\boldsymbol\mu_k
-\frac12\boldsymbol\mu_k^{\mathsf T}\boldsymbol\Sigma^{-1}\boldsymbol\mu_k
+\log\pi_k.
$$
2群の得点差 $\delta_1-\delta_0$ における $\boldsymbol x$ の係数は
$$
\boldsymbol\Sigma^{-1}(\boldsymbol\mu_1-\boldsymbol\mu_0),
$$
であり、Fisher方向と一致する。

共通 $\boldsymbol\Sigma$ を2群標本から推定するなら
$$
\boldsymbol S_p
=\frac{(n_1-1)\boldsymbol S_1+(n_2-1)\boldsymbol S_2}
{n_1+n_2-2}.
$$

QDAは群ごとに $\boldsymbol\Sigma_k$ を許し、
$$
-\frac12\log|\boldsymbol\Sigma_k|
-\frac12(\boldsymbol x-\boldsymbol\mu_k)^{\mathsf T}
\boldsymbol\Sigma_k^{-1}(\boldsymbol x-\boldsymbol\mu_k)
+\log\pi_k
$$
を比較するため、一般に二次の分類境界になる。

## 一手
**2群LDAは「平均差を共通共分散の逆行列で標準化した方向」が本体。** Fisher基準からも正規モデルの対数尤度比からも同じ $\Sigma^{-1}(\mu_1-\mu_0)$ が出る。その方向を得た後、事前確率を含む切片項で分類境界を決める。

## 答え
例として
$$
\boldsymbol\mu_1=(2,1)^{\mathsf T},
\qquad
\boldsymbol\mu_0=(0,0)^{\mathsf T},
\qquad
\boldsymbol\Sigma=\operatorname{diag}(2,1)
$$
なら
$$
\boldsymbol\Sigma^{-1}
=\operatorname{diag}\left(\frac12,1\right),
$$
よって
$$
\boldsymbol w
\propto
\begin{pmatrix}1/2&0\\0&1\end{pmatrix}
\begin{pmatrix}2\\1\end{pmatrix}
=\begin{pmatrix}1\\1\end{pmatrix}.
$$
判別方向は $x_1+x_2$ である。

1変量、共通分散1、$\mu_0=0,\mu_1=4$、等事前確率なら分類境界は中点
$$
c=2
$$
となる。$x=3$ は群1側に分類される。

## 計算例
事前確率の影響を見る。共通分散1、$\mu_0=0,\mu_1=2$、$\pi_0=0.8,\pi_1=0.2$、$x=1$ なら
$$
\delta_0(1)=\log0.8\approx-0.223,
$$
$$
\delta_1(1)=2-2+\log0.2\approx-1.609.
$$
幾何学的な中点でも、事前確率が大きい群0へ分類される。

また $n_1=6,n_0=4$、
$$
\boldsymbol S_1=\operatorname{diag}(2,4),
\qquad
\boldsymbol S_0=\operatorname{diag}(5,1)
$$
なら
$$
\begin{aligned}
\boldsymbol S_p
&=\frac{5\boldsymbol S_1+3\boldsymbol S_0}{8}\\
&=\operatorname{diag}\left(\frac{25}{8},\frac{23}{8}\right).
\end{aligned}
$$

## 注意
$\boldsymbol w$ の倍率は分類方向を変えないが、実際の境界には事前確率や誤分類損失が効く。プール共分散は単純平均ではなく自由度加重平均である。LDAは共通共分散なら線形境界、QDAは群別共分散を許すため一般に二次境界となる。QDAは柔軟だが小標本・高次元では共分散推定が不安定になりやすい。

<!-- CARD -->

---
id: mv-hierarchical-linkage
title: 階層クラスタリングの連結法とWard法を使い分ける
category: applied-common
subcategory: applied-multivariate
topic: hierarchical-clustering-canonical
type: recognition
difficulty: 2
priority: B
hashtags:
  - クラスター分析
  - 階層法
  - 単連結法
  - 完全連結法
  - 群平均法
  - Ward法
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: クラスタリング階層法
---

## 問題
凝集型階層クラスタリングを考える。

1. 単連結法・完全連結法・群平均法で、2クラスタ $A,B$ 間の距離をどう定義するか述べよ。
2. Ward法では何を最小にしてクラスタ対を併合するか。$A,B$ のサイズを $n_A,n_B$、重心を $\bar{\boldsymbol x}_A,\bar{\boldsymbol x}_B$ として、併合による群内平方和増加を書け。
3. $n_A=2,n_B=3$、重心間距離が5のときWard法の平方和増加を計算せよ。
4. 単連結法が鎖状化しやすい理由と、Ward法で距離だけでなくクラスタサイズも効く理由を説明せよ。

## 使用公式・定理
凝集型階層法では、現在のクラスタ集合から「最も近い」クラスタ対を一つ選んで逐次併合する。ただし何をクラスタ間距離と呼ぶかが連結法によって異なる。

点間距離を $d(\boldsymbol x,\boldsymbol y)$ とすると
$$
d_{\mathrm{single}}(A,B)
=\min_{\boldsymbol x\in A,\boldsymbol y\in B}d(\boldsymbol x,\boldsymbol y),
$$
$$
d_{\mathrm{complete}}(A,B)
=\max_{\boldsymbol x\in A,\boldsymbol y\in B}d(\boldsymbol x,\boldsymbol y),
$$
$$
d_{\mathrm{average}}(A,B)
=\frac1{n_An_B}
\sum_{\boldsymbol x\in A}\sum_{\boldsymbol y\in B}
d(\boldsymbol x,\boldsymbol y).
$$

Ward法は通常、平方Euclid距離を基礎に、併合後の群内平方和（WSS）の増加が最小になる対を選ぶ。2クラスタを併合したときの増加量は
$$
\Delta WSS(A,B)
=\frac{n_An_B}{n_A+n_B}
\left\|\bar{\boldsymbol x}_A-\bar{\boldsymbol x}_B\right\|^2.
$$

## 一手
**階層法では最初に「何を近さと定義している手法か」を確認する。** 単連結は最短点対、完全連結は最長点対、群平均は全点対平均、Wardは距離そのものではなく併合時のWSS増加を見る。

## 答え
点対距離が $2,4,6,8$ の4通りなら群平均距離は
$$
\frac{2+4+6+8}{4}=5.
$$

Ward法の数値例では
$$
\begin{aligned}
\Delta WSS
&=\frac{2\cdot3}{2+3}\,5^2\\
&=\frac65\cdot25\\
&=30.
\end{aligned}
$$
したがってWard法では、候補となる各クラスタ対についてこの増加量を計算し、最小の対を併合する。

## 計算例
同じ重心間距離5でも、$n_A=n_B=1$ なら
$$
\Delta WSS=\frac{1\cdot1}{2}25=12.5,
$$
一方 $n_A=n_B=10$ なら
$$
\Delta WSS=\frac{100}{20}25=125.
$$
よってWard法では重心間距離が同じでも、大きいクラスタ同士の併合はWSSを大きく増やしやすい。

単連結法では、2つのクラスタ間に1組でも非常に近い点対があれば併合される。この性質が細長い点列を次々につなぐ「鎖状化」を起こしやすい。

## 注意
単連結・完全連結・群平均は同じ距離行列でも異なるデンドログラムを与えうる。Ward法は一般の任意距離へ機械的に置き換えるものではなく、通常は平方Euclid距離と群内平方和の関係を前提にする。変数尺度が大きく異なる場合は、クラスタリング前の標準化の要否も検討する。

<!-- CARD -->

---
id: mv-kmeans-one-iteration
title: k-means法の割当てと重心更新を行う
category: applied-common
subcategory: applied-multivariate
topic: k-means
type: calc_step
difficulty: 3
priority: B
hashtags: [クラスター分析, k-means法, 重心]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: k-means法 }]
---

## 問題
1次元データ0,2,8,10、初期重心0,10でk-meansを1回更新せよ。

## 使用公式・定理
k-meansは
$$
W(C_1,\ldots,C_K)
=\sum_{k=1}^{K}\sum_{i\in C_k}
\|\boldsymbol x_i-\bar{\boldsymbol x}_k\|^2
$$
を小さくするよう、
1. 現在の重心へ最も近いクラスタに各点を割り当てる
2. 各クラスタの重心を所属点の平均へ更新する
を交互に行う。固定した割当てでは平方距離和を最小にする代表点は標本平均である。

## 一手
「最近傍へ割当てる」と「平均へ重心更新する」は、どちらも同じ群内平方和目的関数を減らす座標降下の一手と捉える。

## 答え
1次元データ $0,2,8,10$、初期重心 $0,10$ では
$$
C_1=\{0,2\},\qquad C_2=\{8,10\},
$$
更新後重心は
$$
\bar x_{C_1}=1,\qquad \bar x_{C_2}=9.
$$

## 計算例
初期重心0,10への距離を比較すると0,2は第1クラスタ、8,10は第2クラスタへ割り当てられる。
新しい重心は
$$
\frac{0+2}{2}=1,
\qquad
\frac{8+10}{2}=9.
$$
更新後の目的関数は
$$
\begin{aligned}
W
&=(0-1)^2+(2-1)^2\\
&\quad +(8-9)^2+(10-9)^2\\
&=1+1+1+1\\
&=4.
\end{aligned}
$$

## 注意
各反復で目的関数は増加しないが、大域最適解を保証しない。初期重心によって局所解が変わるため、複数初期値を試すことがある。

<!-- CARD -->

---
id: mv-mds-double-centering
title: 古典的MDSを二重中心化から座標復元・stress評価まで通す
category: applied-common
subcategory: applied-multivariate
topic: multidimensional-scaling-canonical
type: calc_step
difficulty: 4
priority: B
hashtags:
  - 多次元尺度構成法
  - MDS
  - 二重中心化
  - 距離行列
  - Gram行列
  - stress
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 多次元尺度構成法
---

## 問題
$n$ 個の対象間距離 $d_{ij}$ だけが与えられているとする。

1. 古典的多次元尺度構成法（MDS）で平方距離行列から中心化Gram行列を作り、$m$ 次元座標を復元する手順を書け。
2. 3点の距離が
$$
d_{12}=1,\qquad d_{23}=1,\qquad d_{13}=2
$$
のとき、中心を0とする1次元配置を求め、二重中心化で確認せよ。
3. 元距離 $(1,2,3)$ に対し配置上の距離が $(1,2,2)$ だったとき、正規化stress
$$
\sqrt{\frac{\sum_{i<j}(d_{ij}-\widehat d_{ij})^2}{\sum_{i<j}d_{ij}^2}}
$$
を計算せよ。

## 使用公式・定理
中心化行列を
$$
\boldsymbol J
=\boldsymbol I-\frac1n\boldsymbol1\boldsymbol1^{\mathsf T}
$$
とし、平方距離行列を
$$
\boldsymbol D^{(2)}=(d_{ij}^2)
$$
とする。中心化された座標行列を $\boldsymbol X$、Gram行列を
$$
\boldsymbol B=\boldsymbol X\boldsymbol X^{\mathsf T}
$$
とすると
$$
d_{ij}^2=b_{ii}+b_{jj}-2b_{ij}.
$$
この関係を行・列方向に中心化すると
$$
\boxed{\boldsymbol B=-\frac12\boldsymbol J\boldsymbol D^{(2)}\boldsymbol J}
$$
を得る。

$\boldsymbol B$ を
$$
\boldsymbol B
=\boldsymbol U\boldsymbol\Lambda\boldsymbol U^{\mathsf T}
$$
と固有分解し、正の上位 $m$ 固有値を
$$
\boldsymbol\Lambda_m
=\operatorname{diag}(\lambda_1,\ldots,\lambda_m)
$$
とすれば、座標の一つは
$$
\boxed{\boldsymbol X_m=\boldsymbol U_m\boldsymbol\Lambda_m^{1/2}}
$$
である。

低次元近似の距離再現誤差を見る代表的指標として
$$
\operatorname{Stress}
=\sqrt{\frac{\sum_{i<j}(d_{ij}-\widehat d_{ij})^2}
{\sum_{i<j}d_{ij}^2}}
$$
があり、0に近いほど元距離をよく再現する。

## 一手
**MDSは「距離→平方→二重中心化して内積→固有分解して座標→復元距離をstressで確認」の一続きで処理する。** 距離を直接PCAへ入れない。

## 答え
3点例では
$$
\boldsymbol D^{(2)}
=\begin{pmatrix}
0&1&4\\
1&0&1\\
4&1&0
\end{pmatrix}.
$$
二重中心化すると
$$
\boldsymbol B
=-\frac12\boldsymbol J\boldsymbol D^{(2)}\boldsymbol J
=\begin{pmatrix}
1&0&-1\\
0&0&0\\
-1&0&1
\end{pmatrix}.
$$
これは
$$
\boldsymbol x
=\begin{pmatrix}-1\\0\\1\end{pmatrix}
$$
に対して
$$
\boldsymbol B=\boldsymbol x\boldsymbol x^{\mathsf T}
$$
と書けるので、中心を0とする1次元配置の一つは
$$
x_1=-1,\qquad x_2=0,\qquad x_3=1.
$$
実際
$$
|x_1-x_2|=1,\quad |x_2-x_3|=1,\quad |x_1-x_3|=2
$$
で元距離を完全に再現する。

stress例では分子が
$$
(1-1)^2+(2-2)^2+(3-2)^2=1,
$$
分母が
$$
1^2+2^2+3^2=14
$$
なので
$$
\operatorname{Stress}
=\sqrt{\frac1{14}}
=\frac1{\sqrt{14}}
\approx0.267.
$$

## 計算例
3点例の $\boldsymbol B$ はランク1で、非零固有値は
$$
\lambda_1=\operatorname{tr}(\boldsymbol B)=2.
$$
対応する単位固有ベクトルを
$$
\boldsymbol u_1
=\frac1{\sqrt2}(-1,0,1)^{\mathsf T}
$$
と取れば
$$
\boldsymbol U_1\boldsymbol\Lambda_1^{1/2}
=\frac1{\sqrt2}
\begin{pmatrix}-1\\0\\1\end{pmatrix}\sqrt2
=\begin{pmatrix}-1\\0\\1\end{pmatrix}.
$$
したがって固有分解からも同じ1次元配置が得られる。

## 注意
距離から得る配置は平行移動・回転・鏡映までは一意でない。古典的MDSで $\boldsymbol B$ に大きな負の固有値が出る場合、与えられた距離は低次元Euclid空間では正確に再現しにくい。stressには複数の正規化規約があるので、試験では問題文の定義に従う。

<!-- CARD -->

---
id: reg-robust-sandwich
title: 異分散頑健分散をsandwich形からHC3まで計算する
category: applied-common
subcategory: applied-multiple-regression
topic: robust-standard-error-canonical
type: formula
difficulty: 4
priority: S
hashtags:
  - 回帰診断法
  - 異分散
  - 頑健標準誤差
  - sandwich
  - HC3
  - レバレッジ
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 異分散と標準誤差
---

## 問題
線形回帰
$$
\boldsymbol y=\boldsymbol X\boldsymbol\beta+\boldsymbol\varepsilon
$$
で誤差は互いに独立だが、
$$
\operatorname{Var}(\varepsilon_i\mid\boldsymbol X)=\sigma_i^2
$$
と異分散を許す。

1. 最小二乗推定量の係数値は変えずに、異分散に頑健なHC0分散共分散行列を書け。
2. 高レバレッジ点への小標本補正を強めるHC3では、各残差平方をどう補正するか。
3. 切片のみ、$n=2$、残差 $(1,-1)$、レバレッジ $h_{11}=h_{22}=1/2$ の例で、HC0とHC3の切片分散推定値を比較せよ。

## 記号・用語
- **sandwich形**：推定分散を「bread × meat × bread」の積で表す形。
- **レバレッジ** $h_{ii}$：ハット行列
$$
\boldsymbol H=\boldsymbol X(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}\boldsymbol X^{\mathsf T}
$$
の第 $i$ 対角成分。
- **HC0**：残差平方 $e_i^2$ をそのまま用いる基本的な異分散頑健分散。
- **HC3**：$e_i^2/(1-h_{ii})^2$ を用いて高レバレッジ点を強く補正する型。

## 使用公式・定理
最小二乗推定量は
$$
\widehat{\boldsymbol\beta}
=(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}
\boldsymbol X^{\mathsf T}\boldsymbol y.
$$
異分散があっても $E[\boldsymbol\varepsilon\mid\boldsymbol X]=\boldsymbol0$ なら、この係数推定式自体は変えない。

誤差共分散を
$$
\boldsymbol\Omega
=\operatorname{diag}(\sigma_1^2,\ldots,\sigma_n^2)
$$
とすると条件付き分散は
$$
\operatorname{Var}(\widehat{\boldsymbol\beta}\mid\boldsymbol X)
=(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}
\boldsymbol X^{\mathsf T}\boldsymbol\Omega\boldsymbol X
(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}.
$$
未知の $\sigma_i^2$ を $e_i^2$ で置き換えるHC0は
$$
\boxed{
\widehat{\operatorname{Var}}_{\mathrm{HC0}}(\widehat{\boldsymbol\beta})
=(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}
\boldsymbol X^{\mathsf T}
\operatorname{diag}(e_i^2)
\boldsymbol X
(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}
}.
$$

HC3では、最小二乗残差が高レバレッジ点で縮みやすいことを補うため
$$
e_i^2
\quad\longrightarrow\quad
\frac{e_i^2}{(1-h_{ii})^2}
$$
と置き換える。したがって
$$
\boxed{
\widehat{\operatorname{Var}}_{\mathrm{HC3}}(\widehat{\boldsymbol\beta})
=(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}
\boldsymbol X^{\mathsf T}
\operatorname{diag}\left\{\frac{e_i^2}{(1-h_{ii})^2}\right\}
\boldsymbol X
(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}
}.
$$

## 一手
**係数を直す方法と標準誤差を直す方法を混同しない。** 異分散頑健標準誤差では $\widehat{\beta}$ は最小二乗法のまま、分散共分散行列の中央の行列だけを残差から作り直す。HC3ならさらに各残差平方を $(1-h_{ii})^2$ で割る。

## 答え
切片のみモデルでは
$$
\boldsymbol X=\begin{pmatrix}1\\1\end{pmatrix},
\qquad
\boldsymbol X^{\mathsf T}\boldsymbol X=2,
\qquad
(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}=\frac12.
$$
HC0のmeatは
$$
\boldsymbol X^{\mathsf T}\operatorname{diag}(1,1)\boldsymbol X
=1+1=2.
$$
よって
$$
\widehat{\operatorname{Var}}_{\mathrm{HC0}}(\widehat\beta_0)
=\frac12\cdot2\cdot\frac12
=\frac12.
$$

HC3では $h_{11}=h_{22}=1/2$ なので各補正残差平方は
$$
\frac{1}{(1-1/2)^2}=4.
$$
meatは
$$
4+4=8,
$$
したがって
$$
\widehat{\operatorname{Var}}_{\mathrm{HC3}}(\widehat\beta_0)
=\frac12\cdot8\cdot\frac12
=2.
$$
この算術例ではHC3はHC0の4倍の分散を与える。

## 計算例
一般に $h_{ii}=0.1$ ならHC3の残差平方倍率は
$$
\frac1{(1-0.1)^2}
=\frac1{0.81}
\approx1.235.
$$
一方 $h_{ii}=0.5$ なら
$$
\frac1{(1-0.5)^2}=4.
$$
したがってHC3は、同じ残差の大きさでも高レバレッジ点ほど強く分散推定へ反映する。

## 注意
頑健標準誤差は異分散に対する分散推定の修正であり、平均構造の誤指定を直すものではない。説明変数との相関を持つ欠落変数などで $E[\varepsilon\mid X]=0$ が崩れれば、係数推定自体の問題は残る。

また通常のHC型は観測間独立を前提とする。系列相関・クラスタ内相関がある場合は、その依存構造に対応した頑健分散を用いる。HC0・HC1・HC2・HC3には有限標本補正の違いがあり、試験では問題文の規約を確認する。

<!-- CARD -->

---
id: reg-aic-variable-selection
title: AICで回帰モデルを比較する
category: applied-common
subcategory: applied-multiple-regression
topic: variable-selection-aic
type: calc_step
difficulty: 3
priority: B
hashtags: [変数選択, AIC, モデル比較]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 変数選択 }]
---

## 問題
モデル1は最大対数尤度-100・母数5個、モデル2は-96・母数8個である。AICで選べ。

## 記号・用語
- AIC：赤池情報量規準
- $\ell$：対数尤度

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$AIC=-2\ell(\widehat\theta)+2k$。

## 答え
$$AIC_1=-2(-100)+2(5)=210,$$
$$AIC_2=-2(-96)+2(8)=208.$$
小さいモデル2を選ぶ。

## 計算例
尤度改善8が罰則増加6を上回った。

## 注意
AIC差が小さいと選択の不確実性も大きい。

<!-- CARD -->

---
id: reg-stepwise-selection-warning
title: ステップワイズ選択後推論の問題を説明する
category: applied-common
subcategory: applied-multiple-regression
topic: stepwise-selection
type: recognition
difficulty: 3
priority: B
hashtags: [変数選択, ステップワイズ法, 選択後推論]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 変数選択 }]
---

## 問題
同じデータで変数選択した後、通常のt検定をそのまま報告する問題点は何か。

## 記号・用語
- P値：帰無仮説の下で、観測結果以上に帰無仮説と整合しない結果が出る確率
- 交絡：処置・曝露と結果の双方に関係する第三の要因によって効果比較が歪むこと

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

推論手順の標本分布にはモデル選択規則も含める必要がある。

## 答え
選択過程を固定済みとみなす通常の標準誤差・P値は選択の不確実性を無視し、第一種過誤や係数の過大評価を招き得る。

## 計算例
予測評価は独立テスト標本や入れ子交差検証で行う。

## 注意
自動選択は因果的交絡調整の代替ではない。

<!-- CARD -->

---
id: reg-frisch-waugh-lovell
title: 部分回帰係数を残差同士の回帰で求める
category: applied-common
subcategory: applied-multiple-regression
topic: partial-regression
type: calc_step
difficulty: 4
priority: A
hashtags: [重回帰モデル, 部分回帰, Frisch-Waugh-Lovell]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 重回帰モデル }]
---

## 問題
$Y$ を $X_1,X_2$ へ回帰するとき、$X_1$ の係数を残差化で求める手順を述べよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

Frisch–Waugh–Lovell定理。

## 答え
YをX2へ回帰した残差を $\widetilde Y$、X1をX2へ回帰した残差を $\widetilde X_1$ とすれば
$$\widehat\beta_1=\frac{\widetilde{\boldsymbol X}_1^{\mathsf T}\widetilde{\boldsymbol Y}}
{\widetilde{\boldsymbol X}_1^{\mathsf T}\widetilde{\boldsymbol X}_1}.$$

## 計算例
X2で説明できる部分を両方から除いて関係を見る。

## 注意
必要な切片も残差化に含める。

<!-- CARD -->

---
id: reg-condition-number
title: 条件数から共線性を判定する
category: applied-common
subcategory: applied-multiple-regression
topic: condition-number
type: calc_step
difficulty: 3
priority: B
hashtags: [多重共線性, 条件数, 固有値]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 多重共線性 }]
---

## 問題
標準化したデザイン行列の特異値の最大が10、最小が0.2である。条件数を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$\kappa(\boldsymbol X^{\mathsf T}\boldsymbol X)=\kappa(\boldsymbol X)^2$。

## 答え
$$\kappa(\boldsymbol X)=\frac{s_{\max}}{s_{\min}}=\frac{10}{0.2}=50.$$
小さなデータ変動で係数が大きく変わり得る。

## 計算例
この例ではGram行列の条件数は2500。

## 注意
尺度の影響を避けるため標準化後に見る。

<!-- CARD -->

---
id: reg-breusch-pagan-idea
title: Breusch–Pagan検定の構成を説明する
category: applied-common
subcategory: applied-multiple-regression
topic: heteroscedasticity-test
type: recognition
difficulty: 3
priority: B
hashtags: [残差分析, 異分散, Breusch-Pagan検定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 残差分析 }]
---

## 問題
Breusch–Pagan検定の補助回帰と帰無仮説を述べよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

大標本では $LM=nR_{\mathrm{aux}}^2$ が傾き数自由度のカイ二乗分布へ近似する。

## 答え
最小二乗法残差の二乗 $e_i^2$ を分散を説明しそうな変数へ回帰し、帰無仮説を「補助回帰の傾きがすべて0、すなわち等分散」とする。

## 計算例
n=100、補助回帰 $R^2=0.08$ ならLM=8。

## 注意
正規性や小標本では近似精度に注意する。

<!-- CARD -->

---
id: glm-three-components
title: 一般化線形モデルを指数型分布族・3要素・正準リンクまで通す
category: applied-common
subcategory: applied-multivariate
topic: glm-foundations-canonical
type: recognition
difficulty: 2
priority: A
hashtags:
  - 一般化線形モデル
  - 指数型分布族
  - 自然母数
  - リンク関数
  - 正準リンク
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 一般化線形モデルの3要素
---

## 問題
一般化線形モデルについて次を答えよ。

1. 一般化線形モデルを構成する3要素を述べよ。
2. 応答分布の指数型分布族の標準形を書き、平均と分散を $b(\theta)$ から表せ。
3. 正準リンクの意味を説明し、正規・二項・ポアソン分布の正準リンクを答えよ。
4. ポアソン分布とベルヌーイ分布を指数型分布族の形へ直し、自然母数を確認せよ。

## 使用公式・定理
一般化線形モデルの3要素は次の3つである。

1. **確率成分**：条件付き応答 $Y_i\mid\boldsymbol x_i$ が指数型分布族に従う。
2. **系統成分**：説明変数を線形予測子
$$
\eta_i=\boldsymbol x_i^{\mathsf T}\boldsymbol\beta
$$
にまとめる。
3. **リンク関数**：条件付き平均
$$
\mu_i=E[Y_i\mid\boldsymbol x_i]
$$
と線形予測子を
$$
g(\mu_i)=\eta_i
$$
で結ぶ。

指数型分布族を
$$
f(y;\theta,\phi)
=\exp\left\{
\frac{y\theta-b(\theta)}{a(\phi)}
+c(y,\phi)
\right\}
$$
と書く。$\theta$ は自然母数、$\phi$ は分散母数である。正規化条件を $\theta$ で微分すると
$$
E[Y]=b'(\theta),
$$
さらにもう一度微分すると
$$
\operatorname{Var}(Y)=a(\phi)b''(\theta)
$$
を得る。

**正準リンク**とは、リンクを自然母数へ一致させ
$$
\boxed{g(\mu)=\theta}
$$
とする選択である。代表例は

- 正規分布：恒等リンク $g(\mu)=\mu$
- 二項分布：ロジットリンク $g(p)=\log\{p/(1-p)\}$
- ポアソン分布：対数リンク $g(\mu)=\log\mu$

である。

## 一手
**一般化線形モデルは「分布を指数型分布族で書く → 自然母数 $\theta$ を読む → 平均 $\mu$ と線形予測子 $\eta=X\beta$ をリンクで結ぶ」と追う。** 正準リンクは、その最後のリンクを $g(\mu)=\theta$ と選ぶだけである。

## 答え
ポアソン分布では
$$
P(Y=y)
=\frac{e^{-\mu}\mu^y}{y!}
=\exp\{y\log\mu-\mu-\log(y!)\}.
$$
よって
$$
\theta=\log\mu,
\qquad
b(\theta)=e^\theta,
\qquad
a(\phi)=1.
$$
したがって
$$
b'(\theta)=e^\theta=\mu,
\qquad
b''(\theta)=e^\theta=\mu,
$$
なので $E[Y]=\operatorname{Var}(Y)=\mu$ であり、正準リンクは
$$
g(\mu)=\log\mu.
$$

ベルヌーイ分布では
$$
P(Y=y)=p^y(1-p)^{1-y}.
$$
対数を整理すると
$$
\begin{aligned}
\log P(Y=y)
&=y\log p+(1-y)\log(1-p)\\
&=y\log\frac{p}{1-p}+\log(1-p).
\end{aligned}
$$
ここで
$$
\theta=\log\frac{p}{1-p}
$$
と置けば
$$
p=\frac{e^\theta}{1+e^\theta},
\qquad
\log(1-p)=-\log(1+e^\theta),
$$
だから
$$
P(Y=y)
=\exp\{y\theta-\log(1+e^\theta)\}.
$$
よって
$$
b(\theta)=\log(1+e^\theta),
$$
自然母数そのものがロジットなので正準リンクは
$$
g(p)=\log\frac{p}{1-p}.
$$

## 計算例
ポアソン回帰で平均が $\mu=3$ なら、正準リンクによる線形予測子は
$$
\eta=\log3\approx1.099.
$$
逆に $\eta=\log5$ なら
$$
\mu=e^\eta=5.
$$

ベルヌーイ応答で成功確率が $p=0.8$ なら
$$
\eta
=\log\frac{0.8}{0.2}
=\log4
\approx1.386.
$$
逆に $\eta=0$ ならオッズが1なので
$$
p=\frac12.
$$

この2例では、分布ごとに異なる平均の範囲
$$
\mu>0\quad\text{または}\quad0<p<1
$$
を、リンク関数が実数全体を取る線形予測子へ写している。

## 注意
「一般化線形モデルでは必ず正準リンクを使う」わけではない。正準リンクは計算や理論が簡潔になる代表的選択だが、目的に応じて非正準リンクも使える。

指数型分布族として扱う際は、台が未知母数に依存しないなど通常の正則性にも注意する。また $a(\phi)$ の具体形や分散母数の有無は分布ごとに異なる。

通常の正規線形回帰は、正規分布＋恒等リンクを用いる一般化線形モデルの特殊例として含まれる。

<!-- CARD -->

---
id: glm-logistic-score
title: ロジスティック回帰を確率・オッズ比・尤度・スコア・IRLSまで通す
category: applied-common
subcategory: applied-multivariate
topic: logistic-regression-canonical
type: calc_step
difficulty: 4
priority: A
hashtags:
  - ロジスティック回帰分析
  - ロジット
  - オッズ比
  - 尤度
  - スコア
  - IRLS
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 一般化線形モデルの推定
---

## 問題
独立なベルヌーイ応答 $Y_i\in\{0,1\}$ に対し
$$
\eta_i=\boldsymbol x_i^{\mathsf T}\boldsymbol\beta,
\qquad
\operatorname{logit}(p_i)=\eta_i
$$
とする。

1. $p_i$ を $\eta_i$ から表せ。
2. 説明変数 $x_j$ が $c$ 増えたときのオッズ比を表せ。
3. 対数尤度を $\eta_i$ を用いて書き、その勾配であるスコアベクトルを導け。
4. フィッシャー情報行列とフィッシャー・スコアリング更新を書き、IRLSの重み付き最小二乗形へ変形せよ。
5. 数値例として $\eta=0$ の予測確率、$\beta_j=\log1.5$ で $x_j$ が2増える場合のオッズ比を求めよ。

## 記号・用語
- $\ell$：対数尤度

## 使用公式・定理
ロジットの逆関数は
$$
p_i
=\frac{e^{\eta_i}}{1+e^{\eta_i}}
=\frac1{1+e^{-\eta_i}}.
$$
したがってオッズは
$$
\frac{p_i}{1-p_i}=e^{\eta_i}.
$$
他の説明変数を固定して $x_j$ を $c$ 増やすと線形予測子は $c\beta_j$ 増えるので、オッズ比は
$$
\boxed{\exp(c\beta_j)}.
$$

ベルヌーイ対数尤度は
$$
\ell(\boldsymbol\beta)
=\sum_i\left\{y_i\log p_i+(1-y_i)\log(1-p_i)\right\}.
$$
$p_i=e^{\eta_i}/(1+e^{\eta_i})$ を代入すると
$$
\ell(\boldsymbol\beta)
=\sum_i\left\{y_i\eta_i-\log(1+e^{\eta_i})\right\}.
$$
また
$$
\frac{dp_i}{d\eta_i}=p_i(1-p_i).
$$
よって各観測について
$$
\frac{\partial\ell_i}{\partial\eta_i}
=y_i-p_i,
$$
さらに $\partial\eta_i/\partial\boldsymbol\beta=\boldsymbol x_i$ だから
$$
\boxed{
\boldsymbol U(\boldsymbol\beta)
=\frac{\partial\ell}{\partial\boldsymbol\beta}
=\sum_i\boldsymbol x_i(y_i-p_i)
=\boldsymbol X^{\mathsf T}(\boldsymbol y-\boldsymbol p)
}.
$$

$\boldsymbol W=\operatorname{diag}\{p_i(1-p_i)\}$ とすると
$$
-\frac{\partial^2\ell}{\partial\boldsymbol\beta\partial\boldsymbol\beta^{\mathsf T}}
=\boldsymbol X^{\mathsf T}\boldsymbol W\boldsymbol X,
$$
したがってフィッシャー情報行列も
$$
\boldsymbol I(\boldsymbol\beta)
=\boldsymbol X^{\mathsf T}\boldsymbol W\boldsymbol X.
$$
フィッシャー・スコアリング（この場合Newton法と一致）は
$$
\boxed{
\boldsymbol\beta^{\mathrm{new}}
=\boldsymbol\beta^{\mathrm{old}}
+(\boldsymbol X^{\mathsf T}\boldsymbol W\boldsymbol X)^{-1}
\boldsymbol X^{\mathsf T}(\boldsymbol y-\boldsymbol p)
}.
$$
作業応答
$$
z_i
=\eta_i+\frac{y_i-p_i}{p_i(1-p_i)}
$$
を置けば同じ更新は
$$
\boxed{
\boldsymbol\beta^{\mathrm{new}}
=(\boldsymbol X^{\mathsf T}\boldsymbol W\boldsymbol X)^{-1}
\boldsymbol X^{\mathsf T}\boldsymbol W\boldsymbol z
}
$$
となり、これが反復重み付き最小二乗法（IRLS）である。

## 一手
**ロジスティック回帰は「$\eta\to p\to\ell\to U\to I\to$ IRLS」の一本の鎖で覚える。** 係数解釈も同じ $\eta$ から、$x_j$ の増分 $c\beta_j$ を指数化してオッズ比 $e^{c\beta_j}$ と読む。

## 答え
基本関係は
$$
p_i=\frac{e^{\eta_i}}{1+e^{\eta_i}},
\qquad
\frac{p_i}{1-p_i}=e^{\eta_i}.
$$
$x_j$ が $c$ 増えるとオッズ比は
$$
e^{c\beta_j}.
$$
対数尤度、スコア、情報行列は
$$
\ell(\boldsymbol\beta)
=\sum_i\{y_i\eta_i-\log(1+e^{\eta_i})\},
$$
$$
\boldsymbol U(\boldsymbol\beta)
=\boldsymbol X^{\mathsf T}(\boldsymbol y-\boldsymbol p),
$$
$$
\boldsymbol I(\boldsymbol\beta)
=\boldsymbol X^{\mathsf T}\boldsymbol W\boldsymbol X,
\qquad
w_i=p_i(1-p_i).
$$
これをフィッシャー・スコアリングで反復するとIRLSになる。

数値例では $\eta=0$ なら
$$
p=\frac1{1+1}=\frac12.
$$
また $\beta_j=\log1.5$、$c=2$ なら
$$
OR=e^{2\log1.5}=1.5^2=2.25.
$$

## 計算例
切片のみモデルで現在値 $\beta^{(0)}=0$、観測が
$$
(y_1,y_2,y_3,y_4)=(1,1,1,0)
$$
とする。まず全観測で
$$
\eta_i^{(0)}=0,
\qquad
p_i^{(0)}=\frac12,
\qquad
w_i^{(0)}=\frac14.
$$
スコアは
$$
\begin{aligned}
U(\beta^{(0)})
&=\sum_{i=1}^4(y_i-p_i)\\
&=3-4\cdot\frac12\\
&=1.
\end{aligned}
$$
情報量は
$$
I(\beta^{(0)})
=\sum_{i=1}^4w_i
=4\cdot\frac14
=1.
$$
したがって1回目のフィッシャー・スコアリング更新は
$$
\beta^{(1)}
=0+I^{-1}U
=1.
$$
同じ計算をIRLSで見ると、作業応答は成功観測で
$$
z=0+\frac{1-1/2}{1/4}=2,
$$
失敗観測で
$$
z=0+\frac{0-1/2}{1/4}=-2.
$$
すべて同じ重み $1/4$ なので重み付き平均は
$$
\frac{2+2+2-2}{4}=1,
$$
よって同じ $\beta^{(1)}=1$ が得られる。

## 注意
オッズ比は確率差ではない。例えば基準確率が異なれば、同じオッズ比でも確率の増分は異なる。

二項応答 $Y_i\sim\operatorname{Bin}(m_i,p_i)$ では
$$
\ell_i
=y_i\log p_i+(m_i-y_i)\log(1-p_i)+\text{const.}
$$
とし、成功割合を応答にする表記ではIRLSの重みに $m_i$ が入る。

完全分離・準完全分離では係数が発散し、有限の通常最尤推定値が存在しないことがある。IRLSが収束しないときは単なる数値計算不良と決めつけず分離も疑う。

<!-- CARD -->

---
id: glm-poisson-mean-ratio
title: ポアソン回帰を平均比・発生率・offsetまで通す
category: applied-common
subcategory: applied-multivariate
topic: poisson-regression-canonical
type: calc_step
difficulty: 2
priority: A
hashtags:
  - ポアソン回帰
  - 対数リンク
  - 平均比
  - 発生率
  - offset
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ポアソン回帰
---

## 問題
ポアソン回帰で
$$
Y\mid x,t\sim\operatorname{Poisson}(\mu),
\qquad
\log\mu=\log t+\beta_0+\beta_1x
$$
とする。$t>0$ は観測時間・人口・走行距離などの曝露量である。

1. $x$ が $c$ 増えたとき、同じ曝露量における期待件数と発生率は何倍になるか。
2. $\log t$ がoffsetと呼ばれる理由を説明せよ。
3. $\beta_0=0.2,\beta_1=0.4$、$x$ が3増える場合の平均比を求めよ。
4. $t=5,x=2$ のとき期待件数を求めよ。

## 記号・用語
- **曝露量** $t$：件数が機会量に比例すると考えるときの観測時間・人口・面積など。
- **offset**：係数を推定せず、あらかじめ1に固定して線形予測子へ加える既知項。
- **発生率** $\lambda$：単位曝露量あたりの期待件数。ここでは $\mu=t\lambda$。

## 使用公式・定理
発生率を
$$
\log\lambda=\beta_0+\beta_1x
$$
とすると
$$
\lambda=\exp(\beta_0+\beta_1x).
$$
期待件数は
$$
\mu=t\lambda
=t\exp(\beta_0+\beta_1x),
$$
したがって
$$
\boxed{
\log\mu=\log t+\beta_0+\beta_1x
}.
$$
$\log t$ は係数を1に固定するためoffsetである。

$x$ を $x+c$ へ変えると
$$
\begin{aligned}
\frac{\lambda(x+c)}{\lambda(x)}
&=\frac{\exp\{\beta_0+\beta_1(x+c)\}}
{\exp(\beta_0+\beta_1x)}\\
&=\exp(c\beta_1).
\end{aligned}
$$
曝露量 $t$ が同じなら $\mu=t\lambda$ なので期待件数比も同じく
$$
\boxed{\exp(c\beta_1)}.
$$

## 一手
**ポアソン回帰は「対数を外して乗法効果を読む」。** まず
$$
\mu=t\exp(X\beta)
$$
に戻す。係数は加法的な件数差ではなく指数化した平均比・率比を表し、曝露量だけは $\log t$ を係数1のoffsetとして入れる。

## 答え
$x$ が $c$ 増えると、同じ曝露量で発生率・期待件数はいずれも
$$
e^{c\beta_1}
$$
倍になる。

$\beta_1=0.4,c=3$ なら
$$
\begin{aligned}
\text{平均比}
&=e^{3(0.4)}\\
&=e^{1.2}\\
&\approx3.32.
\end{aligned}
$$

また $\beta_0=0.2,\beta_1=0.4,t=5,x=2$ では
$$
\begin{aligned}
\lambda
&=e^{0.2+0.4\cdot2}\\
&=e^1\\
&\approx2.718,
\end{aligned}
$$
したがって
$$
\begin{aligned}
\mu
&=5e^1\\
&\approx13.59.
\end{aligned}
$$

## 計算例
同じ発生率 $\lambda=2$ 件/時間の対象を、Aでは2時間、Bでは5時間観測するとする。このとき
$$
E[Y_A]=2\cdot2=4,
\qquad
E[Y_B]=5\cdot2=10.
$$
件数だけ比べるとBはAの2.5倍だが、これは曝露量の違いだけである。

対数尺度では
$$
\log E[Y_A]=\log2+\log2,
$$
$$
\log E[Y_B]=\log5+\log2.
$$
発生率部分 $\log2$ は同じで、違いはoffset $\log t$ だけである。

一方、説明変数の変化によって $\beta_1=\log1.5$ だけ線形予測子が増えるなら、曝露量に関係なく率比は
$$
e^{\beta_1}=1.5
$$
である。

## 注意
$t$ は正でなければ $\log t$ を定義できない。offsetの係数を自由に推定すると「件数が曝露量に比例する」という仮定自体を変えることになる。

ポアソン分布では条件付き平均と分散が等しい。実データで過分散が強ければ、標準誤差やモデル選択に影響するため、Pearson統計量・逸脱度・残差構造を別途診断する。

<!-- CARD -->

---
id: glm-deviance-definition
title: 一般化線形モデルを逸脱度・Pearson統計量・尤度比・過分散まで診断する
category: applied-common
subcategory: applied-multivariate
topic: glm-diagnostics-canonical
type: calc_step
difficulty: 3
priority: B
hashtags:
  - 一般化線形モデル
  - 逸脱度
  - Pearsonカイ二乗
  - 尤度比検定
  - 過分散
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 逸脱度
---

## 問題
一般化線形モデルの当てはまりとモデル比較について、次を一つの流れで整理せよ。

1. 飽和モデルの最大対数尤度を $\ell_{\mathrm{sat}}$、当てはめモデルを $\ell_{\mathrm{fit}}$ とするとき、逸脱度を定義せよ。
2. 観測値 $y_i$、推定平均 $\widehat\mu_i$、分散関数 $V(\widehat\mu_i)$ からPearsonカイ二乗統計量を書け。
3. 入れ子な縮小モデル $R$ と完全モデル $F$ の逸脱度を $D_R,D_F$ とするとき、尤度比統計量を逸脱度差で表し、自由度を述べよ。
4. ポアソン回帰などでPearsonカイ二乗統計量が残差自由度より大幅に大きいとき、過分散倍率をどう見積もるか。

## 記号・用語
- **飽和モデル**：各観測を完全に再現できる最大自由度の基準モデル。
- **逸脱度**：当てはめモデルが飽和モデルからどれだけ尤度を失ったかを2倍した量。
- **Pearson残差**：観測値と推定平均の差をモデル分散で標準化した残差。
- **過分散**：二項・ポアソンなどの基準モデルが仮定する条件付き分散より実際のばらつきが大きい状態。

## 使用公式・定理
逸脱度は
$$
\boxed{
D=2\{\ell_{\mathrm{sat}}-\ell_{\mathrm{fit}}\}
}.
$$
同じ応答分布・同じデータなら、逸脱度が小さいほど飽和モデルに近い。ただし自由度を使わず逸脱度の大小だけでモデル選択をしてはいけない。

Pearsonカイ二乗統計量は
$$
\boxed{
X_P^2
=\sum_{i=1}^n
\frac{(y_i-\widehat\mu_i)^2}{V(\widehat\mu_i)}
}.
$$
これはPearson残差
$$
r_{Pi}
=\frac{y_i-\widehat\mu_i}{\sqrt{V(\widehat\mu_i)}}
$$
の二乗和である。

入れ子モデル $R\subset F$ では
$$
\begin{aligned}
D_R-D_F
&=2\{\ell_{\mathrm{sat}}-\ell_R\}
  -2\{\ell_{\mathrm{sat}}-\ell_F\}\\
&=2(\ell_F-\ell_R).
\end{aligned}
$$
したがって尤度比統計量は
$$
\boxed{G^2=D_R-D_F=2(\ell_F-\ell_R)}.
$$
完全モデルで追加した自由母数の数を $q$ とすれば、通常の正則性条件の下で帰無仮説下に
$$
G^2\xrightarrow{d}\chi_q^2.
$$

擬似尤度的に
$$
\operatorname{Var}(Y_i\mid\boldsymbol x_i)
=\phi V(\mu_i)
$$
と書くと、残差自由度 $df_E$ に対する過分散倍率の代表的推定量は
$$
\boxed{
\widehat\phi=\frac{X_P^2}{df_E}
}.
$$
$\widehat\phi\gg1$ なら過分散を疑い、分散のみを $\phi$ 倍する近似では標準誤差が概ね $\sqrt{\widehat\phi}$ 倍になる。

## 一手
**診断は「単一モデルの当てはまり → 入れ子モデル比較 → 分散仮定」の順に見る。**

- 飽和モデルとの差：逸脱度 $D$
- 観測残差の標準化二乗和：$X_P^2$
- 2モデルの比較：逸脱度差 $D_R-D_F$
- $X_P^2/df_E$ が1から大きく外れる：分散仮定を再点検

逸脱度と尤度比統計量を別公式として覚えず、**飽和モデル項が差を取ると消える**ことを確認する。

## 答え
数値例1として
$$
\ell_{\mathrm{sat}}=-40,
\qquad
\ell_{\mathrm{fit}}=-47
$$
なら
$$
D=2\{-40-(-47)\}=14.
$$

数値例2として3観測が
$$
(y_i,\widehat\mu_i,V(\widehat\mu_i))
=(2,1,1),(3,4,4),(5,5,5)
$$
なら
$$
X_P^2
=\frac{1^2}{1}+\frac{(-1)^2}{4}+0
=1.25.
$$

数値例3として縮小モデルと完全モデルの逸脱度が
$$
D_R=30,
\qquad
D_F=22
$$
で追加母数が2個なら
$$
G^2=30-22=8,
\qquad q=2.
$$
5%上側臨界値 $\chi^2_{2,0.95}\approx5.991$ と比べて
$$
8>5.991
$$
なので縮小モデルの制約を棄却する。

数値例4としてポアソン回帰で
$$
X_P^2=180,
\qquad df_E=90
$$
なら
$$
\widehat\phi=\frac{180}{90}=2.
$$
基準ポアソン分散の約2倍の条件付きばらつきが示唆され、単純な分散倍率補正なら標準誤差は概ね
$$
\sqrt2\approx1.41
$$
倍になる。

## 計算例
入れ子モデル比較で「なぜ逸脱度差が尤度比になるか」を実数でも確認する。飽和モデルの最大対数尤度を $-40$、縮小モデルを $-55$、完全モデルを $-51$ とする。

まず各逸脱度は
$$
\begin{aligned}
D_R
&=2\{-40-(-55)\}\\
&=30,
\end{aligned}
$$
$$
\begin{aligned}
D_F
&=2\{-40-(-51)\}\\
&=22.
\end{aligned}
$$
よって
$$
D_R-D_F=30-22=8.
$$
一方、直接尤度比から計算しても
$$
\begin{aligned}
2(\ell_F-\ell_R)
&=2\{-51-(-55)\}\\
&=2\cdot4\\
&=8.
\end{aligned}
$$
と一致する。飽和モデルはモデル比較の差では消えるため、同じ応答分布の入れ子モデル比較では逸脱度差だけを見ればよい。

## 注意
逸脱度やPearsonカイ二乗統計量のカイ二乗近似は大標本近似であり、疎な二項データや小標本では精度に注意する。

尤度比検定にはモデルが入れ子であることと通常の正則性条件が必要である。境界上の母数を検定する場合などは単純な $\chi_q^2$ 近似にならないことがある。

$X_P^2/df_E>1$ だけで過分散の原因までは特定できない。欠落変数、群内相関、ゼロ過剰、外れ値、平均構造の誤指定などを確認する。逆に $\widehat\phi<1$ なら過小分散の可能性がある。

<!-- CARD -->

---
id: glm-categorical-interaction
title: ロジスティック交互作用のオッズ比を読む
category: applied-common
subcategory: applied-multivariate
topic: glm-interaction
type: calc_step
difficulty: 3
priority: B
hashtags: [ロジスティック回帰分析, 交互作用, オッズ比]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 交互作用とカテゴリ変数 }]
---

## 問題
$\operatorname{logit}(p)=\beta_0+\beta_1D+\beta_2x+\beta_3Dx$ で、xが1増えるオッズ比をD=0,1それぞれ求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

対数オッズのx傾きは $\beta_2+\beta_3D$。

## 答え
D=0では $e^{\beta_2}$、D=1では $e^{\beta_2+\beta_3}$。両者の比は $e^{\beta_3}$。

## 計算例
$\beta_2=0.2,\beta_3=0.5$ なら1.22倍と2.01倍。

## 注意
確率尺度の交互作用とは一致しないことがある。

<!-- CARD -->

---
id: glm-logistic-marginal-effect
title: ロジスティック回帰の限界効果を計算する
category: applied-common
subcategory: applied-multivariate
topic: marginal-effect
type: calc_step
difficulty: 3
priority: B
hashtags: [ロジスティック回帰分析, 限界効果, 予測確率]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 予測確率と限界効果 }]
---

## 問題
ロジスティック回帰で係数 $\beta=0.8$、評価点の予測確率p=0.25のとき連続変数xの限界効果を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$dp/d\eta=p(1-p)$、$d\eta/dx=\beta$。

## 答え
$$\frac{\partial p}{\partial x}=\beta p(1-p)
=0.8(0.25)(0.75)=0.15.$$

## 計算例
同じ係数でもpにより確率差は変わる。

## 注意
交互作用があれば微分式に追加項が入る。

<!-- CARD -->

---
id: glm-probit-probability
title: プロビットモデルの確率を計算する
category: applied-common
subcategory: applied-multivariate
topic: probit-model
type: calc_step
difficulty: 2
priority: B
hashtags: [プロビット分析, 標準正規分布, 予測確率]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: プロビット分析 }]
---

## 問題
プロビットモデル $P(Y=1\mid x)=\Phi(-0.5+x)$ でx=0.5の確率を求めよ。

## 記号・用語
- $\Phi$：標準正規分布の累積分布関数

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

プロビットリンクは $\Phi^{-1}(p)=\eta$。

## 答え
線形予測子は0なので
$$P(Y=1\mid x=0.5)=\Phi(0)=0.5.$$

## 計算例
潜在変数 $Y^*=\eta+\varepsilon$、$\varepsilon\sim N(0,1)$ の閾値モデルで導ける。

## 注意
係数尺度はlogitモデルと異なる。

<!-- CARD -->

---
id: glm-tobit-likelihood-parts
title: Tobitモデルの尤度寄与を区別する
category: applied-common
subcategory: applied-multivariate
topic: tobit-model
type: formula
difficulty: 4
priority: B
hashtags: [トービット分析, 打ち切り, 尤度]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: トービット分析 }]
---

## 問題
$Y^*=\boldsymbol x^{\mathsf T}\boldsymbol\beta+\varepsilon$、$\varepsilon$ は正規分布 $N(0,\sigma^2)$、$Y=\max(0,Y^*)$ の左側打ち切りTobitモデルで尤度寄与を書け。

## 記号・用語
- 打ち切り：潜在的な値が観測限界を越えたとき、真の値ではなく限界と大小関係だけを観測する仕組み
- $\Phi$：標準正規分布の累積分布関数
- $\phi$：標準正規分布の確率密度関数

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

観測された正値は密度、打ち切り値は累積確率を尤度へ入れる。

## 答え
$y_i>0$ なら
$$\frac1\sigma\phi\left(\frac{y_i-\boldsymbol x_i^{\mathsf T}\boldsymbol\beta}{\sigma}\right),$$
$y_i=0$ なら
$$P(Y_i^*\le0)=\Phi\left(-\frac{\boldsymbol x_i^{\mathsf T}\boldsymbol\beta}{\sigma}\right).$$

## 計算例
全尤度は各寄与の積。

## 注意
0が真の値として生じる切断・ゼロ過剰モデルとは異なる。

<!-- CARD -->

---
id: glm-nonlinear-regression-gradient
title: 非線形回帰のGauss–Newton更新を書く
category: applied-common
subcategory: applied-multivariate
topic: nonlinear-regression
type: formula
difficulty: 4
priority: B
hashtags: [非線形回帰モデル, Gauss-Newton法, ヤコビ行列]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 非線形回帰モデル }]
---

## 問題
$y_i=f(x_i,\boldsymbol\theta)+\varepsilon_i$ の非線形最小二乗でGauss–Newton更新を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

一次近似 $\boldsymbol f(\boldsymbol\theta+\boldsymbol\delta)\approx\boldsymbol f(\boldsymbol\theta)+\boldsymbol J\boldsymbol\delta$。

## 答え
現在値で残差 $\boldsymbol r=\boldsymbol y-\boldsymbol f(\boldsymbol\theta)$、ヤコビ行列 $J_{ij}=\partial f_i/\partial\theta_j$ を作り、
$$\boldsymbol\theta^{\mathrm{new}}
=\boldsymbol\theta+(\boldsymbol J^{\mathsf T}\boldsymbol J)^{-1}\boldsymbol J^{\mathsf T}\boldsymbol r.$$

## 計算例
線形モデルでは1回で最小二乗法解へ達する。

## 注意
初期値や局所解に依存し得る。更新式には現在値でヤコビ行列Jが列フルランクであることが必要。

<!-- CARD -->

---
id: glm-svm-margin
title: ハードマージンSVMの制約と幅を書く
category: applied-common
subcategory: applied-multivariate
topic: support-vector-machine
type: formula
difficulty: 3
priority: B
hashtags: [サポートベクターマシン, マージン, 分類]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: サポートベクターマシン }]
---

## 問題
$y_i\in\{-1,+1\}$ の線形分離可能データに対するハードマージンSVMを書け。

## 記号・用語
- SVM：サポートベクターマシン

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

ノルム最小化は幾何学的マージン最大化と同値。

## 答え
$$\min_{\boldsymbol w,b}\frac12\|\boldsymbol w\|^2
\quad\text{subject to}\quad
y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)\ge1.$$
2本の支持超平面間の幅は $2/\|\boldsymbol w\|$。

## 計算例
等号となる点がサポートベクトル。

## 注意
非分離データではスラック変数と罰則Cを用いる。

<!-- CARD -->

---
id: reg-leverage-threshold
title: レバレッジを平均値と比較する
category: applied-common
subcategory: applied-multiple-regression
topic: leverage
type: calc_step
difficulty: 2
priority: B
hashtags: [回帰診断法, レバレッジ, ハット行列]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 回帰診断法 }]
---

## 問題
n=50、切片を含む係数総数k=5の回帰で観測iの $h_{ii}=0.30$ である。平均レバレッジの2倍を目安に判定せよ。

## 記号・用語
- レバレッジ：説明変数空間での観測の位置を表すハット行列の対角要素

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$\sum_i h_{ii}=\operatorname{tr}(\boldsymbol H)=k$。ここでkは切片を含む係数総数。

## 答え
平均は $k/n=5/50=0.10$、2倍は0.20。$0.30>0.20$ なので説明変数空間で高レバレッジの観測と判定する。

## 計算例
$0\le h_{ii}\le1$。

## 注意
$2k/n$ は機械的な棄却基準ではなく診断の目安。

<!-- CARD -->

---
id: reg-gls-estimator
title: 一般化最小二乗推定量を導く
category: applied-common
subcategory: applied-multiple-regression
topic: generalized-least-squares
type: calc_step
difficulty: 4
priority: A
hashtags: [一般化最小二乗推定, 一般化最小二乗法, 相関誤差]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 一般化最小二乗推定 }]
---

## 問題
$\operatorname{Var}(\boldsymbol\varepsilon)=\sigma^2\boldsymbol\Omega$、$\boldsymbol\Omega$ が既知の正定値行列のとき一般化最小二乗法推定量を書け。

## 記号・用語
- GLS：一般化最小二乗法

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$\partial Q/\partial\boldsymbol\beta=-2\boldsymbol X^{\mathsf T}\boldsymbol\Omega^{-1}(\boldsymbol y-\boldsymbol X\boldsymbol\beta)$。

## 答え
重み付き平方和
$$Q=(\boldsymbol y-\boldsymbol X\boldsymbol\beta)^{\mathsf T}\boldsymbol\Omega^{-1}(\boldsymbol y-\boldsymbol X\boldsymbol\beta)$$
を微分して0と置くと
$$\boldsymbol X^{\mathsf T}\boldsymbol\Omega^{-1}\boldsymbol X\widehat{\boldsymbol\beta}_{\mathrm{GLS}}
=\boldsymbol X^{\mathsf T}\boldsymbol\Omega^{-1}\boldsymbol y,$$
$$\widehat{\boldsymbol\beta}_{\mathrm{GLS}}
=(\boldsymbol X^{\mathsf T}\boldsymbol\Omega^{-1}\boldsymbol X)^{-1}\boldsymbol X^{\mathsf T}\boldsymbol\Omega^{-1}\boldsymbol y.$$

## 計算例
$\boldsymbol\Omega=\boldsymbol I$ なら最小二乗法へ戻る。

## 注意
$\boldsymbol X^{\mathsf T}\boldsymbol\Omega^{-1}\boldsymbol X$ の可逆性が必要。

<!-- CARD -->

---
id: reg-wls-two-points
title: 重み付き最小二乗の重みを分散から決める
category: applied-common
subcategory: applied-multiple-regression
topic: weighted-least-squares
type: calc_step
difficulty: 3
priority: B
hashtags: [一般化最小二乗推定, WLS, 不均一分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 一般化最小二乗推定 }]
---

## 問題
独立な2観測の誤差分散がそれぞれ1と4である。WLSの相対重みを求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$Q=\sum_iw_i(y_i-\boldsymbol x_i^{\mathsf T}\boldsymbol\beta)^2$、$w_i\propto1/\sigma_i^2$。

## 答え
分散の逆数を用いるので
$$w_1:w_2=1/1:1/4=4:1.$$
第1観測を第2観測の4倍重く扱う。

## 計算例
共通倍率は推定係数を変えない。

## 注意
分散モデルを誤ると効率が落ち得る。

<!-- CARD -->

---
id: reg-ridge-closed-form
title: Ridge回帰の解を導く
category: applied-common
subcategory: applied-multiple-regression
topic: ridge-regression
type: calc_step
difficulty: 4
priority: B
hashtags: [Ridge回帰, 正則化, 多重共線性]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 多重共線性 }]
---

## 問題
切片を除いて標準化した説明変数に対するRidge回帰の目的関数と解を書け。

## 記号・用語
- L2：係数平方和を使うL2罰則

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

二乗L2罰則。

## 答え
$$\min_{\boldsymbol\beta}
\{\|\boldsymbol y-\boldsymbol X\boldsymbol\beta\|^2+\lambda\|\boldsymbol\beta\|^2\}.$$
微分して
$$-2\boldsymbol X^{\mathsf T}(\boldsymbol y-\boldsymbol X\boldsymbol\beta)+2\lambda\boldsymbol\beta=0,$$
$$\widehat{\boldsymbol\beta}_{\mathrm{ridge}}
=(\boldsymbol X^{\mathsf T}\boldsymbol X+\lambda\boldsymbol I)^{-1}\boldsymbol X^{\mathsf T}\boldsymbol y.$$

## 計算例
$\lambda=0$ なら最小二乗法。

## 注意
通常は切片を罰せず、説明変数を標準化する。

<!-- CARD -->

---
id: reg-lasso-soft-threshold
title: 直交計画のLasso解を計算する
category: applied-common
subcategory: applied-multiple-regression
topic: lasso
type: calc_step
difficulty: 4
priority: A
hashtags: [L1正則化法, Lasso, ソフト閾値]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: L1正則化法 }]
---

## 問題
$\boldsymbol X^{\mathsf T}\boldsymbol X=\boldsymbol I$ で、目的関数を $\frac12\|\boldsymbol y-\boldsymbol X\boldsymbol\beta\|^2+\lambda\sum_j|\beta_j|$ とする。最小二乗法係数z=3、$\lambda=1$ のLasso係数を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$S(z,\lambda)=\operatorname{sign}(z)(|z|-\lambda)_+$。

## 答え
ソフト閾値関数より
$$\widehat\beta=\operatorname{sign}(z)(|z|-\lambda)_+
=1(3-1)=2.$$

## 計算例
$|z|\le\lambda$ なら係数は0。

## 注意
目的関数の係数規約により閾値の表記は変わる。

<!-- CARD -->

---
id: reg-lasso-vs-ridge
title: LassoとRidgeの役割を区別する
category: applied-common
subcategory: applied-multiple-regression
topic: lasso-ridge-comparison
type: recognition
difficulty: 2
priority: B
hashtags: [L1正則化法, Ridge回帰, 変数選択]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: L1正則化法 }]
---

## 問題
LassoとRidgeを、罰則と係数が厳密に0になり得るかで比較せよ。

## 記号・用語
- L1：係数絶対値の和を使うL1罰則
- L2：係数平方和を使うL2罰則

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

L1球には軸上の角があり、二次損失の等高線が角で接しやすい。

## 答え
LassoはL1罰則 $\lambda\sum_j|\beta_j|$ で疎な解を作り、変数選択を同時に行える。RidgeはL2罰則 $\lambda\sum_j\beta_j^2$ で係数を連続的に縮小するが、通常は厳密な0にしない。

## 計算例
強く相関する変数群ではRidgeは分散を安定化しやすい。

## 注意
$\lambda$ は交差検証などで選び、尺度依存を避けるため標準化する。
