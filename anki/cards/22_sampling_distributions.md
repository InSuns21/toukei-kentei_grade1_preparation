---
id: samp-xbar-normal-distribution
title: 正規母集団での標本平均の分布
category: math-distributions
subcategory: math-sampling-distributions
topic: sampling-xbar-normal
type: theorem
difficulty: 2
priority: S
hashtags: [標本分布, 標本平均, 正規分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 標本分布 }]
---
## 問題
$X_1,\ldots,X_n\overset{\mathrm{i.i.d.}}{\sim}$ 正規分布 $N(\mu,\sigma^2)$ のとき、標本平均 $\overline X=n^{-1}\sum_{i=1}^nX_i$ の分布を答えよ。

## 答え
$$\overline X\sim N\left(\mu,\frac{\sigma^2}{n}\right).$$

## 使用公式・定理
独立同分布なら
$$E[\overline X]=\mu,\qquad \operatorname{Var}(\overline X)=\frac{\sigma^2}{n}.$$
独立な正規分布の線形結合は正規分布である。

## 計算例
$n=25$, $\mu=10$, $\sigma^2=16$ とする。まず標本平均の分散を計算すると
$$
\operatorname{Var}(\overline X)
=\frac{\sigma^2}{n}
=\frac{16}{25}.
$$
したがって標準誤差は
$$
\operatorname{SE}(\overline X)
=\sqrt{\frac{16}{25}}
=\frac45.
$$
正規母集団の線形結合なので分布の形も正規のままであり、
$$
\overline X\sim N\left(10,\frac{16}{25}\right).
$$

## 一手
標本平均の分散は母分散を $n$ で割る。標準偏差は $\sigma/\sqrt n$。

## 注意
$\overline X$ の標準偏差を標準誤差 $\operatorname{SE}(\overline X)=\sigma/\sqrt n$ と呼ぶ。

<!-- CARD -->

---
id: samp-chisq-definition
title: カイ二乗分布の定義
category: math-distributions
subcategory: math-sampling-distributions
topic: chi-square-definition
type: recognition
difficulty: 2
priority: S
hashtags: [カイ二乗分布, 定義, 自由度]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: カイ二乗分布 }]
---
## 問題
$Z_1,\ldots,Z_\nu$ を独立に標準正規分布 $N(0,1)$ に従う確率変数とする。$X=Z_1^2+\cdots+Z_\nu^2$ の分布を答えよ。台と密度の形も述べよ。

## 答え
$$
\sum_{i=1}^{\nu}Z_i^2\sim\chi^2_\nu,
\qquad E[Q]=\nu,
\qquad \operatorname{Var}(Q)=2\nu.
$$

## 使用公式・定理
独立な標準正規確率変数 $Z_1,\ldots,Z_\nu$ に対して
$$
Q=\sum_{i=1}^{\nu}Z_i^2\sim\chi^2_\nu.
$$
したがって自由度 $\nu$ は「独立な標準正規平方を何個足したか」と読める。

密度は
$$
f_Q(q)=\frac{1}{2^{\nu/2}\Gamma(\nu/2)}q^{\nu/2-1}e^{-q/2},\qquad q>0,
$$
であり、shape-rate 表示のガンマ分布
$$
\chi^2_\nu=\operatorname{Gamma}\left(\frac\nu2,\frac12\right)
$$
に一致する。よって
$$
E[Q]=\nu,\qquad \operatorname{Var}(Q)=2\nu.
$$

また独立な $Q_1\sim\chi^2_{\nu_1}$、$Q_2\sim\chi^2_{\nu_2}$ なら
$$
Q_1+Q_2\sim\chi^2_{\nu_1+\nu_2}.
$$
これは標準正規平方の個数を足すと考えても、モーメント母関数
$$
M_{\chi^2_\nu}(t)=(1-2t)^{-\nu/2},\qquad t<1/2
$$
の積から確認してもよい。

## 計算例
$Z\sim N(0,1)$ なら $Z^2\sim\chi^2_1$ なので
$$
E[Z^2]=1,\qquad \operatorname{Var}(Z^2)=2.
$$
独立な $Z_1,\ldots,Z_4\sim N(0,1)$ なら
$$
\sum_{i=1}^4Z_i^2\sim\chi^2_4,
$$
したがって平均4、分散8である。

さらに独立な $X\sim\chi^2_3$, $Y\sim\chi^2_5$ なら
$$
X+Y\sim\chi^2_8.
$$
$Z^2$ の密度を直接出したければ、変換 $z=\pm\sqrt q$ の2枝を足して
$$
f_{Z^2}(q)=\frac{1}{\sqrt{2\pi q}}e^{-q/2},\qquad q>0,
$$
とし、これは $\chi^2_1$ の密度に一致する。

## 一手
標準正規の平方和を見たら、独立な項の個数を自由度として数える。平均・分散は自由度から直ちに読み、独立和では自由度を足す。

## 注意
再生性には独立性が必要である。相関した正規変数の平方和を、そのまま項数自由度のカイ二乗分布とはできない。

<!-- CARD -->

---
id: samp-chisq-additive
title: 独立なカイ二乗分布の再生性
category: math-distributions
subcategory: math-sampling-distributions
topic: chi-square-additivity
type: theorem
difficulty: 2
priority: S
hashtags: [カイ二乗分布, 再生性, 独立和]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: カイ二乗分布 }]
---
## 問題
独立な $X\sim\chi^2_\nu$ と $Y\sim\chi^2_\mu$ の和 $X+Y$ の分布を答えよ。

## 答え
$$X+Y\sim\chi^2_{\nu+\mu}.$$

## 使用公式・定理
独立和のモーメント母関数は積になる。$\chi^2_\nu$ の母関数は $(1-2t)^{-\nu/2}$（$t<1/2$）なので
$$M_{X+Y}(t)=(1-2t)^{-\nu/2}(1-2t)^{-\mu/2}=(1-2t)^{-(\nu+\mu)/2}.$$

## 計算例
独立な $X\sim\chi^2_3$, $Y\sim\chi^2_5$ とする。各モーメント母関数（積率母関数）は
$$
M_X(t)=(1-2t)^{-3/2},
\qquad
M_Y(t)=(1-2t)^{-5/2}.
$$
独立性より和のモーメント母関数（積率母関数）は積になるので
$$
\begin{aligned}
M_{X+Y}(t)
&=M_X(t)M_Y(t)\\
&=(1-2t)^{-3/2}(1-2t)^{-5/2}\\
&=(1-2t)^{-8/2}.
\end{aligned}
$$
これは自由度8のカイ二乗分布のモーメント母関数（積率母関数）だから
$$
X+Y\sim\chi^2_8.
$$

## 一手
自由度は足し算。母関数を掛け合わせて確認する。

## 注意
この再生性は独立な場合だけ成り立つ。

<!-- CARD -->

---
id: samp-chisq-mean-var-indep
title: 標本平均と標本分散の独立性
category: math-distributions
subcategory: math-sampling-distributions
topic: chi-square-independence-mean-var
type: theorem
difficulty: 3
priority: A
hashtags: [標本平均, 標本分散, 独立性, 正規標本]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 標本分布 }]
---
## 問題
$X_1,\ldots,X_n\overset{\mathrm{i.i.d.}}{\sim}$ 正規分布 $N(\mu,\sigma^2)$ のとき、標本平均 $\overline X$ と不偏標本分散 $S^2$ は独立か。また帰結として $\dfrac{(n-1)S^2}{\sigma^2}$ の分布はどうなるか。

## なぜ
正規標本では、標準化した平方和が
$$
\sum_{i=1}^n\left(\frac{X_i-\mu}{\sigma}\right)^2
=\frac{n(\overline X-\mu)^2}{\sigma^2}
+\frac{(n-1)S^2}{\sigma^2}
$$
と「平均方向」と「平均から直交する残差方向」に分解できる。Cochranの定理より、この2項は独立で、それぞれ自由度1と $n-1$ のカイ二乗分布に従う。したがって $\overline X$ と $S^2$ も独立になる。

## 答え
正規母集団では $\overline X$ と $S^2$ は独立である。これにより
$$\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1},\qquad \overline X\perp S^2.$$

## 使用公式・定理
直交変換（Helmert変換など）で平均に対応する第1成分と残差平方和が分離される。標準正規の直交変換は標準正規を保つ。

## 計算例
$n=5$, 母分散 $\sigma^2=4$ の正規標本で、不偏標本分散が $S^2=6$ だったとする。分散に対応するカイ二乗統計量は
$$
\begin{aligned}
Q
&=\frac{(n-1)S^2}{\sigma^2}\\
&=\frac{(5-1)\cdot6}{4}\\
&=6.
\end{aligned}
$$
帰無モデルの下で
$$
Q\sim\chi^2_{5-1}=\chi^2_4
$$
なので、観測値 $q=6$ を $\chi^2_4$ の分位点と比較して分散の検定・区間推定へ進める。また正規性により $\overline X\perp S^2$ なので、平均側と分散側を独立に組み合わせて t 統計量を作れる。

## 一手
正規標本で「標本平均と標本分散」が同時に出たら、Cochran分解により
$$
\overline X\perp S^2,
\qquad
\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1}
$$
を同時に発火させる。自由度 $n-1$ は平均方向を1本使った残りの次元である。

## 注意
非正規では一般に独立でない。この独立性がt分布・F分布の構成に必要。

<!-- CARD -->

---
id: samp-chisq-expectation-squared
title: 標準正規分布の2乗の期待値
category: math-distributions
subcategory: math-sampling-distributions
topic: chi-square-standard-normal-square
type: calc_step
difficulty: 2
priority: A
hashtags: [標準正規分布, 2乗, カイ二乗分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: カイ二乗分布 }]
---
## 問題
$Z$ を標準正規分布 $N(0,1)$ に従う確率変数とするとき、$E[Z^2]$ と $\operatorname{Var}(Z^2)$ を求めよ。

## 答え
$$E[Z^2]=1,\qquad \operatorname{Var}(Z^2)=2.$$

## 使用公式・定理
$E[Z^2]=\operatorname{Var}(Z)+(E[Z])^2=1$。なお $Z^2\sim\chi^2_1$ であり、そのモーメントは自由度カードで扱う。

## 計算例
$$E[Z^2]=1+0=1,\qquad \operatorname{Var}(Z^2)=E[Z^4]-1^2.$$
標準正規の4次モーメントは $3$ なので $\operatorname{Var}(Z^2)=3-1=2$。

## 一手
$E[Z^2]$ は分散と平均の2乗から直に求まる。分散を出すには4次モーメントを計算する。

## 注意
$E[Z^2]=1$ は標準正規のとき。一般の $N(\mu,\sigma^2)$ では $E[(X-\mu)^2]=\sigma^2$。

<!-- CARD -->

---
id: samp-t-distribution-definition
title: t分布の定義（Studentのt分布）
category: math-distributions
subcategory: math-sampling-distributions
topic: t-distribution-definition
type: recognition
difficulty: 2
priority: S
hashtags: [t分布, Studentのt分布, 自由度]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: t分布 }]
---
## 問題
$Z$ を標準正規分布 $N(0,1)$ に従う確率変数、$V$ を $Z$ と独立な $\chi^2_\nu$ に従う確率変数とする。$T$ をどのように定義すれば自由度 $\nu$ の t 分布に従うか答えよ。また密度の概形と $E[T],\operatorname{Var}(T)$ を述べよ。

## 答え
$$
\frac{Z}{\sqrt{V/\nu}}\sim t_\nu.
$$
自由度1では標準コーシー分布、自由度が大きくなると標準正規分布へ近づく。

## 使用公式・定理
独立な
$$
Z\sim N(0,1),\qquad V\sim\chi^2_\nu
$$
に対して
$$
T=\frac{Z}{\sqrt{V/\nu}}\sim t_\nu.
$$
密度は
$$
f_T(t)=\frac{\Gamma\{(\nu+1)/2\}}{\sqrt{\nu\pi}\,\Gamma(\nu/2)}
\left(1+\frac{t^2}{\nu}\right)^{-(\nu+1)/2},\qquad t\in\mathbb R.
$$
対称分布で、$\nu>1$ なら $E[T]=0$、$\nu>2$ なら
$$
\operatorname{Var}(T)=\frac{\nu}{\nu-2}.
$$

$\nu=1$ では
$$
f_T(t)=\frac1{\pi(1+t^2)},
$$
すなわち標準コーシー分布で、平均・分散は存在しない。

また $V/\nu$ は平均1、分散 $2/\nu$ なので
$$
\frac{V}{\nu}\xrightarrow{p}1.
$$
よって Slutsky の定理から
$$
t_\nu\xrightarrow{d}N(0,1)\qquad(\nu\to\infty).
$$

## 計算例
正規標本 $X_1,\ldots,X_n\overset{\mathrm{i.i.d.}}{\sim}N(\mu,\sigma^2)$ では
$$
Z=\frac{\overline X-\mu}{\sigma/\sqrt n}\sim N(0,1),
$$
$$
V=\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1},
$$
かつ $Z$ と $V$ は独立なので
$$
\frac{\overline X-\mu}{S/\sqrt n}\sim t_{n-1}.
$$
つまり母分散未知で $\sigma$ を $S$ に置き換えると、まさにt分布の構成になる。

## 一手
「標準正規 ÷ 独立な（カイ二乗/自由度）の平方根」がt分布。母分散未知の正規平均ではこの形を作る。

## 注意
分子の標準正規変数と分母のカイ二乗変数の独立性が必要である。小自由度では裾が重く、標準正規近似を早く使いすぎない。

<!-- CARD -->

---
id: samp-t-statistic-mean-test
title: 母分散未知の正規平均のt統計量
category: math-distributions
subcategory: math-sampling-distributions
topic: t-statistic-mean
type: theorem
difficulty: 2
priority: S
hashtags: [t統計量, 不偏標本分散, 正規平均]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: t分布 }]
---
## 問題
$X_1,\ldots,X_n\overset{\mathrm{i.i.d.}}{\sim}$ 正規分布 $N(\mu,\sigma^2)$、$\sigma^2$ 未知とする。$\overline X$ と不偏標本分散 $S^2$ から $\mu$ に関するt統計量を構成し、その分布を答えよ。

## 答え
$$T=\frac{\overline X-\mu}{S/\sqrt n}\sim t_{n-1}.$$

## 使用公式・定理
$\overline X\sim N(\mu,\sigma^2/n)$、$(n-1)S^2/\sigma^2\sim\chi^2_{n-1}$、かつ $\overline X$ と $S^2$ は独立。よって
$$T=\frac{(\overline X-\mu)/(\sigma/\sqrt n)}{\sqrt{\dfrac{(n-1)S^2}{\sigma^2}\Big/(n-1)}}\sim t_{n-1}.$$

## 計算例
$n=16$ では $T=(\overline X-\mu)/(S/\sqrt{16})\sim t_{15}$。

## 一手
分散未知なら $\sigma$ を $S$ に置き換え、分布は $N(0,1)$ から $t_{n-1}$ へ変わる。

## 注意
$\sigma$ 既知なら $t$ ではなく $N(0,1)$。自由度は $n-1$。

<!-- CARD -->

---
id: samp-t-distribution-variance-unknown
title: 分散未知の平均の推測にt分布を使う理由
category: math-distributions
subcategory: math-sampling-distributions
topic: t-variance-unknown
type: recognition
difficulty: 3
priority: A
hashtags: [t分布, 分散未知, 不偏標本分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: t分布 }]
---
## 問題
母分散未知の正規標本で、標本平均の標準化に不偏標本分散 $S^2$ を使うと分布はどうなるか、理由とともに述べよ。

## 答え
$$\frac{\overline X-\mu}{S/\sqrt n}\sim t_{n-1}.$$
母標準偏差 $\sigma$ を標本標準偏差 $S$ に置き換えると、分母自身が確率変数の平方根になり、標準正規より裾が重くなる。

## 使用公式・定理
$Z=(\overline X-\mu)/(\sigma/\sqrt n)\sim N(0,1)$、$V=(n-1)S^2/\sigma^2\sim\chi^2_{n-1}$、$Z$ と $V$ は独立。定義 $T=Z/\sqrt{V/(n-1)}$ に一致する。

## 計算例
$n=5$ なら $T\sim t_4$。$n$ が大きくなると標準正規へ近づく。

## 一手
$\sigma$ を $S$ に置き換えると、独立なカイ二乗との比の形になり自由度 $n-1$ の t 分布になる。

## 注意
自由度は $n-1$。非正規では近似になる。

<!-- CARD -->

---
id: samp-t-converges-normal
title: 標本平均のt統計量の自由度と正規近似
category: math-distributions
subcategory: math-sampling-distributions
topic: t-convergence
type: theorem
difficulty: 2
priority: A
hashtags: [t分布, 正規近似, 大標本]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: t分布 }]
---
## 問題
標本平均のt統計量の自由度が $n-1$ である理由を、標本平均と標本分散の分布から説明せよ。また自由度が大きいときの漸近分布を述べよ。

## 答え
正規標本では
$$T=\frac{\overline X-\mu}{S/\sqrt n}\sim t_{n-1}.$$
$\overline X$ の分散推定に1個の線形制約（$\sum_i(X_i-\overline X)=0$）があり、自由度が $n-1$ になる。
また、$n\to\infty$ では
$$T\xrightarrow{d}N(0,1).$$

## 使用公式・定理
$(n-1)S^2/\sigma^2\sim\chi^2_{n-1}$ を使い、t分布の定義へ当てはめる。さらに大数則から $S\xrightarrow{p}\sigma$、中心極限定理から
$$\frac{\sqrt n(\overline X-\mu)}{\sigma}\xrightarrow{d}N(0,1)$$
なので、Slutskyの定理により $S$ で標準化した $T$ も標準正規分布へ分布収束する。

## 計算例
$n=10$ では $T=(\overline X-\mu)/(S/\sqrt{10})\sim t_9$。$n$ が大きいほど標準正規に近い。

## 一手
1母数平均を「使った」ので、残る自由度が $n-1$。残差平方和の自由度。

## 注意
精密には残差ベクトルは $n-1$ 次元の部分空間を張る。非正規では厳密でない近似。

<!-- CARD -->

---
id: samp-t-distribution-limits
title: t分布の極限と自由度1の特徴
category: math-distributions
subcategory: math-sampling-distributions
topic: t-distribution-limits
type: theorem
difficulty: 2
priority: A
hashtags: [t分布, 極限, 標準正規分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: t分布 }]
---
## 問題
$\nu\to\infty$ のとき $t_\nu$ はどの分布に収束するか。また $\nu=1$ の場合の分布と特徴を答えよ。

## 答え
自由度 $\nu$ ごとに $T_\nu\sim t_\nu$ とすると
$$T_\nu\xrightarrow{d}N(0,1)\qquad(\nu\to\infty).$$
$\nu=1$ は標準のコーシー分布であり、平均・分散は存在しない。

## 使用公式・定理
$T=Z/\sqrt{V/\nu}$。$E[V/\nu]=1$ かつ $\operatorname{Var}(V/\nu)=2/\nu\to0$ なので、チェビシェフの不等式より $V/\nu$ は1へ確率収束し、分母は1に収束する。

## 計算例
$\nu\to\infty$ の収束が主結論であり、$\nu=30$ では実用上標準正規に近いとされる。$\nu=10$ ではまだ裾がやや重い。

## 一手
自由度が大きいtは標準正規。自由度1はコーシー分布。

## 注意
$t_\nu$ 分布は任意の実数 $\nu>0$ に対して定義できる。1標本 $t$ 統計量などの厳密分布では通常 $\nu=n-1$ と整数になるが、Welch の近似では非整数自由度も現れる。

<!-- CARD -->

---
id: samp-f-distribution-definition
title: F分布の定義
category: math-distributions
subcategory: math-sampling-distributions
topic: f-distribution-definition
type: recognition
difficulty: 2
priority: S
hashtags: [F分布, 自由度, 分散比]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: F分布 }]
---
## 問題
独立な $U\sim\chi^2_{\nu_1}$ と $W\sim\chi^2_{\nu_2}$ が与えられたとき、自由度 $(\nu_1,\nu_2)$ の F分布に従う確率変数 $F$ を定義せよ。また台と平均を述べよ。

## 答え
$$
\frac{U/\nu_1}{V/\nu_2}\sim F_{\nu_1,\nu_2},
\qquad
\frac1F\sim F_{\nu_2,\nu_1},
\qquad
t_\nu^2\sim F_{1,\nu}.
$$

## 使用公式・定理
独立な
$$
U\sim\chi^2_{\nu_1},\qquad V\sim\chi^2_{\nu_2}
$$
に対して
$$
F=\frac{U/\nu_1}{V/\nu_2}\sim F_{\nu_1,\nu_2}.
$$
台は $f>0$ である。分子と分母を入れ替えれば
$$
\frac1F\sim F_{\nu_2,\nu_1}.
$$
したがって分位点にも逆数関係がある。

また $T\sim t_\nu$ なら
$$
T^2=\frac{Z^2/1}{V/\nu}\sim F_{1,\nu}.
$$
逆に $F\sim F_{1,\nu}$ なら
$$
\sqrt F\overset{d}=|T|.
$$
したがって両側t検定は自由度 $(1,\nu)$ のF統計量へ書き換えられるが、平方化すると符号の情報は失われる。

## 計算例
$F\sim F_{3,8}$ なら
$$
\frac1F\sim F_{8,3}.
$$
また $T\sim t_{20}$ なら
$$
T^2\sim F_{1,20}.
$$
独立な $U\sim\chi^2_5$, $V\sim\chi^2_{10}$ に対して
$$
\frac{U/5}{V/10}\sim F_{5,10}.
$$

## 一手
「独立なカイ二乗をそれぞれ自由度で割って比を取る」がF分布。逆数では自由度を交換し、分子自由度1ならtの2乗まで連想する。

## 注意
分子・分母の順序と自由度の順序を一致させる。$\sqrt{F_{1,\nu}}$ はt分布そのものではなく絶対値tの分布である。

<!-- CARD -->

---
id: samp-f-inverse-relation
title: F分布の逆数の分布
category: math-distributions
subcategory: math-sampling-distributions
topic: f-distribution-inverse
type: theorem
difficulty: 2
priority: A
hashtags: [F分布, 逆数, 自由度]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: F分布 }]
---
## 問題
$F\sim F_{\nu_1,\nu_2}$ のとき、$1/F$ はどの分布に従うか答えよ。

## 答え
$$\frac{1}{F}\sim F_{\nu_2,\nu_1}.$$

## 使用公式・定理
$F=(U/\nu_1)/(W/\nu_2)$ で $U,W$ 独立、$U\sim\chi^2_{\nu_1}$、$W\sim\chi^2_{\nu_2}$ なら逆数は分母分子を入れ替えた比になる。

## 計算例
$F\sim F_{3,8}$ なら $1/F\sim F_{8,3}$。

## 一手
分数の分子分母をひっくり返せば自由度もひっくり返る。

## 注意
上側分位点は $F_{\nu_1,\nu_2;\alpha}=1/F_{\nu_2,\nu_1;1-\alpha}$ と対応する。

<!-- CARD -->

---
id: samp-t-squared-f
title: t分布の2乗とF分布の関係
category: math-distributions
subcategory: math-sampling-distributions
topic: t-square-f-distribution
type: theorem
difficulty: 2
priority: A
hashtags: [t分布, F分布, 2乗]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: t分布 }, { type: official_syllabus, topic: F分布 }]
---
## 問題
$T\sim t_\nu$ のとき、$T^2$ はどの分布に従うか答えよ。

## 答え
$$T^2\sim F_{1,\nu}.$$

## 使用公式・定理
$T=Z/\sqrt{V/\nu}$、$Z\sim N(0,1)$、$Z^2\sim\chi^2_1$ と独立に $V\sim\chi^2_\nu$ だから
$$T^2=\frac{Z^2/1}{V/\nu}\sim F_{1,\nu}.$$

## 計算例
$t_{20}$ の2乗は $F_{1,20}$ に従う。

## 一手
分子の標準正規平方を $\chi^2_1/1$ と見れば、F分布の比になる。

## 注意
両側t検定は $F_{1,\nu}$ で扱える。片側情報（符号）は失われる。

<!-- CARD -->

---
id: samp-sqrt-f-t
title: F分布からt分布へ（自由度1のF）
category: math-distributions
subcategory: math-sampling-distributions
topic: f-t-relationship
type: theorem
difficulty: 3
priority: B
hashtags: [F分布, t分布, 平方根]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: F分布 }, { type: official_syllabus, topic: t分布 }]
---
## 問題
$F\sim F_{1,\nu}$ のとき、$\sqrt F$ はどの分布に関係するか答えよ。

## 答え
$F=Z^2/(V/\nu)$ と書けるとき、$\sqrt F=|T|$ になる。ここで $T=Z/\sqrt{V/\nu}\sim t_\nu$ であり、$\sqrt F$ は自由度 $\nu$ の t 分布の絶対値の分布に従う。

## 使用公式・定理
$F_{1,\nu}=t_\nu^2$ の関係から、平方根は絶対値tになる。$t$ 分布の対称性により $\sqrt F=|T|$。

## 計算例
$F_{1,10}$ の平方根の分布は $|t_{10}|$ の分布。確率 $P(\sqrt F\le c)=P(|T|\le c)$。

## 一手
自由度1のFはtの2乗。平方根を取ると絶対値t。

## 注意
符号の情報（方向）は失われる。tの両側検定とFの片側が対応する。

<!-- CARD -->

---
id: samp-f-ratio-of-variances
title: 2母分散比とF分布
category: math-distributions
subcategory: math-sampling-distributions
topic: f-variance-ratio
type: theorem
difficulty: 2
priority: A
hashtags: [F分布, 分散比, 正規標本]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: F分布 }]
---
## 問題
独立標本 $X_1,\ldots,X_{n_1}\overset{\mathrm{i.i.d.}}{\sim}$ 正規分布 $N(\mu_1,\sigma_1^2)$、$Y_1,\ldots,Y_{n_2}\overset{\mathrm{i.i.d.}}{\sim}$ 正規分布 $N(\mu_2,\sigma_2^2)$ に対し、不偏標本分散を $S_1^2,S_2^2$ とする。$\dfrac{S_1^2/\sigma_1^2}{S_2^2/\sigma_2^2}$ はどの分布に従うか。

## 答え
$$\frac{S_1^2/\sigma_1^2}{S_2^2/\sigma_2^2}\sim F_{n_1-1,n_2-1}.$$

## 使用公式・定理
$(n_1-1)S_1^2/\sigma_1^2\sim\chi^2_{n_1-1}$、$(n_2-1)S_2^2/\sigma_2^2\sim\chi^2_{n_2-1}$、独立標本なので2標本は独立。自由度で割って比を取る。

## 計算例
$n_1=6,n_2=9$ では不偏分散の母分散比は2つの $\chi^2$ を自由度で割った比で $F_{5,8}$。

## 一手
各自由度は対応する標本の $n_i-1$。比の分子・分母の順に注意。

## 注意
$\sigma_1=\sigma_2$ の帰無仮説下では $S_1^2/S_2^2\sim F_{n_1-1,n_2-1}$。分散比検定に使える。

<!-- CARD -->

---
id: samp-z-statistic-known-variance
title: 母分散既知の正規平均の$z$統計量
category: math-distributions
subcategory: math-sampling-distributions
topic: z-statistic-known-variance
type: theorem
difficulty: 2
priority: A
hashtags: [正規平均, z統計量, 母分散既知]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 標本分布 }]
---
## 問題
$X_1,\ldots,X_n\overset{\mathrm{i.i.d.}}{\sim}$ 正規分布 $N(\mu,\sigma^2)$、$\sigma^2$ 既知とする。$\mu$ の標準化統計量とその分布を答えよ。

## 答え
$$\frac{\overline X-\mu}{\sigma/\sqrt n}\sim N(0,1).$$

## 使用公式・定理
$\overline X\sim N(\mu,\sigma^2/n)$ を標準化する。

## 計算例
$n=36,\sigma=12$ なら $\sigma/\sqrt n=2$ で $(\overline X-\mu)/2\sim N(0,1)$。

## 一手
分散既知なら $\sigma/\sqrt n$ で割って標準正規を直接用いる。

## 注意
$\sigma$ 未知のときは t 分布へ移行する。

<!-- CARD -->

---
id: samp-sample-proportion
title: 標本比率の分布と正規近似
category: math-distributions
subcategory: math-sampling-distributions
topic: sample-proportion
type: theorem
difficulty: 2
priority: A
hashtags: [標本比率, ベルヌーイ分布, 正規近似]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 標本分布 }]
---
## 問題
$X_1,\ldots,X_n\overset{\mathrm{i.i.d.}}{\sim}\operatorname{Bernoulli}(p)$ のとき、標本比率 $\widehat p=n^{-1}\sum_{i=1}^nX_i$ の期待値・分散を求め、正規近似を書け。

## 答え
$$E[\widehat p]=p,\qquad \operatorname{Var}(\widehat p)=\frac{p(1-p)}{n}.$$
$n$ が大きければ
$$\widehat p\mathrel{\dot{\sim}}N\left(p,\frac{p(1-p)}{n}\right).$$

## 使用公式・定理
ベルヌーイ分布の平均は $p$、分散は $p(1-p)$。また
$$n\widehat p=\sum_{i=1}^nX_i\sim\operatorname{Binomial}(n,p).$$
独立和の分散公式と中心極限定理を使うと
$$\frac{\widehat p-p}{\sqrt{p(1-p)/n}}\xrightarrow{d}N(0,1).$$

## 計算例
$n=100,p=0.3$ では $E[\widehat p]=0.3$、$\operatorname{Var}(\widehat p)=0.3\times0.7/100=0.0021$、標準偏差 $\approx0.0458$。

## 一手
標本比率はベルヌーイ平均。分散は $p(1-p)/n$。

## 注意
$np\ge5$、$n(1-p)\ge5$ 程度で正規近似が使える。厳密には二項分布。

<!-- CARD -->

---
id: samp-sample-variance-expectation
title: 不偏標本分散の期待値
category: math-distributions
subcategory: math-sampling-distributions
topic: sample-variance-expectation
type: calc_step
difficulty: 2
priority: A
hashtags: [不偏標本分散, 期待値, 不偏性]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 標本分布 }]
---
## 問題
$X_1,\ldots,X_n$ を平均 $\mu$、分散 $\sigma^2$ の独立同分布標本とする。$S^2=(n-1)^{-1}\sum_i(X_i-\overline X)^2$ と分母 $n$ の標本分散 $\widetilde S^2=n^{-1}\sum_i(X_i-\overline X)^2$ の期待値をそれぞれ求めよ。

## 答え
$$E[S^2]=\sigma^2,\qquad E[\widetilde S^2]=\frac{n-1}{n}\sigma^2.$$

## 使用公式・定理
$\sum_i(X_i-\overline X)^2=\sum_iX_i^2-n\overline X^2$。期待値を取ると
$$E\left[\sum_i(X_i-\overline X)^2\right]=n(\sigma^2+\mu^2)-n\left(\frac{\sigma^2}{n}+\mu^2\right)=(n-1)\sigma^2.$$

## 計算例
$n=5$ では $E[\widetilde S^2]=\frac45\sigma^2$。不偏にするには分母 $n-1$ を使う。

## 一手
分母 $n-1$ で不偏、分母 $n$ は母分散を $(n-1)/n$ 倍に過小推定する。

## 注意
$\overline X$ の分散を引くことで自由度1が消費される。

<!-- CARD -->

---
id: samp-two-sample-pooled-variance
title: 2標本t検定の結合分散
category: math-distributions
subcategory: math-sampling-distributions
topic: two-sample-pooled-variance
type: theorem
difficulty: 3
priority: A
hashtags: [2標本t検定, 結合分散, 自由度]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: t分布 }]
---
## 問題
独立標本 $X_1,\ldots,X_{n_1}\overset{\mathrm{i.i.d.}}{\sim}$ 正規分布 $N(\mu_1,\sigma^2)$、$Y_1,\ldots,Y_{n_2}\overset{\mathrm{i.i.d.}}{\sim}$ 正規分布 $N(\mu_2,\sigma^2)$（等分散 $\sigma^2$）に対し、不偏標本分散を $S_1^2,S_2^2$ とする。平均差の検定に使う統計量とその分布を答えよ。

## 答え
結合（プール）分散は
$$S_p^2=\frac{(n_1-1)S_1^2+(n_2-1)S_2^2}{n_1+n_2-2},$$
統計量は
$$\frac{(\overline X-\overline Y)-(\mu_1-\mu_2)}{S_p\sqrt{\dfrac{1}{n_1}+\dfrac{1}{n_2}}}\sim t_{n_1+n_2-2}.$$

## 使用公式・定理
$\overline X-\overline Y\sim N(\mu_1-\mu_2,\sigma^2(1/n_1+1/n_2))$、独立標本で分散の和。$\sigma$ を $S_p$ で置き換えて自由度 $n_1+n_2-2$ のt分布。

## 計算例
$n_1=n_2=10$ なら自由度 $18$。$S_p^2$ は自由度で重み付けた分散の平均。

## 一手
等分散なら2標本の分散を自由度で重み付け平均し、$\sqrt{1/n_1+1/n_2}$ を掛ける。

## 注意
等分散でない場合（Welchのt検定）は結合分散とこの自由度を使わない。

<!-- CARD -->

---
id: samp-order-statistics-distribution
title: 順序統計量の分布
category: math-distributions
subcategory: math-sampling-distributions
topic: order-statistics
type: theorem
difficulty: 3
priority: A
hashtags: [順序統計量, 累積分布関数, 密度]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 順序統計量 }]
---
## 問題
$X_1,\ldots,X_n$ を密度 $f_X$、累積分布関数 $F_X$ の分布からの独立同分布標本とし、順序統計量を $X_{(1)}\le X_{(2)}\le\cdots\le X_{(n)}$ とする。$X_{(k)}$ の累積分布関数と密度を求めよ。

## 答え
$$
f_{X_{(k)}}(x)
=\frac{n!}{(k-1)!(n-k)!}
F(x)^{k-1}\{1-F(x)\}^{n-k}f(x).
$$
最大値と最小値は $k=n,1$ の特殊ケースである。

## 使用公式・定理
$X_1,\ldots,X_n$ を密度 $f$、累積分布関数 $F$ を持つ独立同分布標本とし
$$
X_{(1)}\le\cdots\le X_{(n)}
$$
を順序統計量とする。

$X_{(k)}\le x$ は「$x$ 以下の標本が少なくとも $k$ 個」と同値なので
$$
P(X_{(k)}\le x)
=\sum_{j=k}^{n}\binom njF(x)^j\{1-F(x)\}^{n-j}.
$$
連続分布なら微小区間に第 $k$ 番目が入る配置を数えて
$$
f_{X_{(k)}}(x)
=\frac{n!}{(k-1)!(n-k)!}
F(x)^{k-1}\{1-F(x)\}^{n-k}f(x).
$$

特に最大値 $M=X_{(n)}$ は
$$
F_M(x)=F(x)^n,
\qquad
f_M(x)=nF(x)^{n-1}f(x),
$$
最小値 $L=X_{(1)}$ は
$$
P(L>x)=\{1-F(x)\}^n,
$$
$$
F_L(x)=1-\{1-F(x)\}^n,
\qquad
f_L(x)=n\{1-F(x)\}^{n-1}f(x).
$$

## 計算例
$X_i\sim U(0,1)$、$n=3$ なら $0<x<1$ で
$$
F_M(x)=x^3,
\qquad
f_M(x)=3x^2.
$$
また $X_i\sim\operatorname{Exp}(\lambda)$ なら
$$
P(L>x)=e^{-n\lambda x},
$$
よって
$$
L\sim\operatorname{Exp}(n\lambda).
$$

## 一手
一般の第k順序統計量は「x以下がk個以上」を二項分布で数える。最大値は「全部がx以下」、最小値は「全部がxより大きい」の余事象へ直す。

## 注意
$F(x)^n$ や $\{1-F(x)\}^n$ の積分解には標本の独立性が必要である。最大値・最小値を別公式として暗記せず、一般の順序統計量の端点ケースとして理解する。

<!-- CARD -->

---
id: samp-min-distribution
title: 標本最小値の分布
category: math-distributions
subcategory: math-sampling-distributions
topic: min-distribution
type: theorem
difficulty: 2
priority: A
hashtags: [最小値, 順序統計量, 余事象]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 順序統計量 }]
---
## 問題
独立同分布標本 $X_1,\ldots,X_n$ の最小値 $X_{(1)}=\min_iX_i$ の累積分布関数を求めよ。

## 答え
$$F_{X_{(1)}}(x)=1-\{1-F_X(x)\}^n.$$
密度は $n\{1-F_X(x)\}^{n-1}f_X(x)$。

## 使用公式・定理
$P(X_{(1)}>x)=P(X_1>x,\ldots,X_n>x)=\{1-F_X(x)\}^n$ の余事象。

## 計算例
指数分布 $f_X(x)=\lambda e^{-\lambda x}$ では $F_{X_{(1)}}(x)=1-e^{-n\lambda x}$、つまり $\operatorname{Exp}(n\lambda)$ に従う。

## 一手
最小値は「全部が $x$ より大きい」の余事象。

## 注意
指数分布の最小値は同じ族の指数分布になり、rate が $n$ 倍になる。

<!-- CARD -->

---
id: samp-range-statistic
title: 標本範囲と$R$管理図
category: math-distributions
subcategory: math-sampling-distributions
topic: range-statistic
type: recognition
difficulty: 3
priority: B
hashtags: [標本範囲, レンジ, 順序統計量]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 順序統計量 }]
---
## 問題
標本範囲 $R=X_{(n)}-X_{(1)}$ を定義する。正規標本で $E[R]$ と $d_2$ 係数の関係を述べよ。

## 答え
正規標本では $E[R]=d_2\sigma$（$d_2$ は $n$ に依存する定数）。$R$ 管理図は $E[R]=d_2\sigma$ を使い、中心線を $\overline R$ として管理限界を構成する。

## 使用公式・定理
$R$ は位置母数の影響を受けず、正規標本では $\sigma$ に比例する期待値を持つ。

## 計算例
$n=5$ のとき $d_2=2.326$ なので $E[R]=2.326\sigma$。

## 一手
レンジは「最大-最小」。正規なら標本サイズだけで決まる $d_2$ で $\sigma$ と結ぶ。

## 注意
$n$ が大きいとレンジは非効率。$R$ 管理図は小サンプルの工程管理に使う。

<!-- CARD -->

---
id: samp-quantile-approx
title: 標本分位数の分布と漸近正規性
category: math-distributions
subcategory: math-sampling-distributions
topic: sample-quantile
type: theorem
difficulty: 3
priority: B
hashtags: [標本分位数, 漸近正規性, 順序統計量]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 順序統計量 }]
---
## 問題
密度 $f$、累積分布関数 $F$ の連続分布からの標本の第 $p$ 分位数 $\widehat q_p$ について、$q_p=F^{-1}(p)$ の近傍で $f$ が連続かつ $f(q_p)>0$ とする。$n$ が大きいときの漸近分布を答えよ。

## 答え
$f(q_p)>0$ なら
$$\sqrt n(\widehat q_p-q_p)\xrightarrow{d}N\left(0,\frac{p(1-p)}{f(q_p)^2}\right).$$

## 使用公式・定理
標本分位数は順序統計量で、二項分布の正規近似から従う。分散は分位点での密度2乗に反比例。

## 計算例
中央値 $p=1/2$ では分散は $1/(4f(m)^2)$。標準正規分布なら $1/(4\phi(0)^2)=\pi/2$。

## 一手
標本分位数の分散は、分子に $p(1-p)$、分母に分位点での密度の2乗。

## 注意
$q_p$ で密度が0だと漸近正規性が崩れる。

<!-- CARD -->

---
id: samp-xbar-unbiased
title: 標本平均の不偏性と期待値
category: math-distributions
subcategory: math-sampling-distributions
topic: xbar-expectation
type: calc_step
difficulty: 1
priority: A
hashtags: [標本平均, 不偏性, 期待値]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 標本分布 }]
---
## 問題
$X_1,\ldots,X_n$ を平均 $\mu$、分散 $\sigma^2$ の独立同分布標本（分布は正規でなくてもよい） とする。$E[\overline X]$ を求めよ（分散の導出は独立和の分散のカードで扱う）。

## 答え
$E[\overline X]=\mu.$

## 使用公式・定理
期待値の線形性から
$E[\overline X]=\frac1n\sum_iE[X_i]=\frac{n\mu}{n}=\mu.$

## 計算例
$n=20,\mu=5$ では $E[\overline X]=5$。

## 一手
各観測値の期待値を $n$ 個足して $n$ で割れば $\mu$。標本平均は $\mu$ の不偏推定量。

## 注意
不偏性 $E[\overline X]=\mu$ は母集団分布によらない。分散 $\sigma^2/n$ は独立和の分散カードで扱う。

<!-- CARD -->

---
id: samp-iid-sum-variance
title: 独立和の分散と標本平均
category: math-distributions
subcategory: math-sampling-distributions
topic: iid-sum-variance
type: calc_step
difficulty: 1
priority: A
hashtags: [独立和, 分散, 標本平均]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 標本分布 }]
---
## 問題
$X_i$ が独立同分布で分散 $\sigma^2$ のとき、$T=\sum_{i=1}^nX_i$ の分散と、標本平均 $\overline X=T/n$ の分散を求めよ。

## 答え
$$\operatorname{Var}(T)=n\sigma^2,\qquad \operatorname{Var}(\overline X)=\frac{\sigma^2}{n}.$$

## 使用公式・定理
独立なら $\operatorname{Var}(\sum_iX_i)=\sum_i\operatorname{Var}(X_i)$。$\operatorname{Var}(aX)=a^2\operatorname{Var}(X)$。

## 計算例
$\sigma=3,n=16$ なら $\operatorname{Var}(T)=144$、$\operatorname{SD}(\overline X)=3/4$。

## 一手
和の分散は $n\sigma^2$、標本平均の標準偏差は $\sigma/\sqrt n$。定数倍 $c$ の分散は $c^2$ 倍。

## 注意
標準偏差には $\sqrt n$ が入る。

<!-- CARD -->

---
id: samp-chisq-from-normal
title: 標準正規分布からカイ二乗への変数変換
category: math-distributions
subcategory: math-sampling-distributions
topic: chi-square-transform
type: recognition
difficulty: 2
priority: A
hashtags: [変数変換, 標準正規分布, カイ二乗分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: カイ二乗分布 }]
---
## 問題
$Z$ を標準正規分布 $N(0,1)$ に従う確率変数とするとき、$X=Z^2$ の分布を求めよ。

## 答え
$$X=Z^2\sim\chi^2_1.$$

## 使用公式・定理
$Z$ の密度 $f_Z(z)=e^{-z^2/2}/\sqrt{2\pi}$ を $z=\pm\sqrt x$ の2点で変換すると
$$\left|\frac{d}{dx}\sqrt x\right|
=\left|\frac{d}{dx}(-\sqrt x)\right|=\frac1{2\sqrt x},$$
$$f_X(x)=f_Z(\sqrt x)\frac1{2\sqrt x}
+f_Z(-\sqrt x)\frac1{2\sqrt x}$$
$$f_X(x)=\frac{1}{\sqrt{2\pi x}}e^{-x/2},\qquad x>0,$$
これは $\operatorname{Gamma}(1/2,1/2)$ であり $\chi^2_1$ と一致する。

## 計算例
$\chi^2_1$ の平均は $1$、分散は $2$。

## 一手
正規の2乗は自由度1のカイ二乗。母関数 $(1-2t)^{-1/2}$ でも確認できる。

## 注意
$\pm\sqrt x$ の2点を足すので、密度に $1/\sqrt x$ が現れる。

<!-- CARD -->

---
id: samp-chisq-gamma-relation
title: カイ二乗分布とガンマ分布の関係
category: math-distributions
subcategory: math-sampling-distributions
topic: chi-square-gamma
type: theorem
difficulty: 2
priority: A
hashtags: [カイ二乗分布, ガンマ分布, 関係]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: カイ二乗分布 }, { type: official_syllabus, topic: ガンマ分布 }]
---
## 問題
$\chi^2_\nu$ は特別なガンマ分布である。shape-rate表示でどの $\operatorname{Gamma}$ と一致するか答えよ。

## 答え
$$\chi^2_\nu=\operatorname{Gamma}\left(\frac{\nu}{2},\frac12\right).$$

## 使用公式・定理
$\operatorname{Gamma}(\alpha,\beta)$ の密度は $\beta^\alpha x^{\alpha-1}e^{-\beta x}/\Gamma(\alpha)$。$\alpha=\nu/2,\beta=1/2$ を代入するとカイ二乗密度になる。

## 計算例
$\nu=2$ は $\operatorname{Gamma}(1,1/2)$ で指数分布 $\operatorname{Exp}(1/2)$。

## 一手
自由度 $\nu$ のカイ二乗 = shape $\nu/2$、rate $1/2$ のガンマ分布。

## 注意
rate $1/2$ に固定された特別なガンマ分布。

<!-- CARD -->

---
id: samp-chisq-degree-of-freedom
title: カイ二乗分布の自由度と期待値・分散
category: math-distributions
subcategory: math-sampling-distributions
topic: chi-square-df-moments
type: calc_step
difficulty: 2
priority: A
hashtags: [カイ二乗分布, 自由度, 期待値, 分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: カイ二乗分布 }]
---
## 問題
$X\sim\chi^2_\nu$ の期待値と分散を答えよ。

## 答え
$$E[X]=\nu,\qquad \operatorname{Var}(X)=2\nu.$$

## 使用公式・定理
$\chi^2_\nu$ は $\operatorname{Gamma}(\nu/2,1/2)$。ガンマの平均は $\alpha/\beta$、分散は $\alpha/\beta^2$ で
$$E[X]=\frac{\nu/2}{1/2}=\nu,\qquad \operatorname{Var}(X)=\frac{\nu/2}{(1/2)^2}=2\nu.$$

## 計算例
$\nu=10$ では平均 $10$、分散 $20$。

## 一手
ガンマの平均・分散公式に shape $\nu/2$、rate $1/2$ を代入。

## 注意
平均と分散を混同しない。分散は平均の2倍。

<!-- CARD -->

---
id: samp-normal-linear-combo
title: 正規標本の線形結合の分布
category: math-distributions
subcategory: math-sampling-distributions
topic: normal-linear-combination
type: theorem
difficulty: 2
priority: A
hashtags: [正規分布, 線形結合, 標本分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 標本分布 }]
---
## 問題
$X_i\overset{\mathrm{i.i.d.}}{\sim}$ 正規分布 $N(\mu,\sigma^2)$ のとき、$a_i$ を定数として $Y=\sum_{i=1}^na_iX_i$ の分布を答えよ。

## 答え
$$Y\sim N\left(\mu\sum_i a_i,\ \sigma^2\sum_i a_i^2\right).$$

## 使用公式・定理
独立な正規分布の線形結合は正規分布。平均は線形、分散は係数2乗の和に $\sigma^2$ を掛ける。

## 計算例
$a_i=1/n$ なら $Y=\overline X\sim N(\mu,\sigma^2/n)$。

## 一手
平均は係数の和、分散は係数2乗和。

## 注意
独立でないと共分散項が残る。

<!-- CARD -->

---
id: samp-poisson-normal-approx
title: ポアソン分布の正規近似
category: math-distributions
subcategory: math-sampling-distributions
topic: poisson-normal-approx
type: calc_step
difficulty: 2
priority: B
hashtags: [ポアソン分布, 正規近似, 中心極限定理]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 標本分布 }]
---
## 問題
$X\sim\operatorname{Poisson}(\lambda)$、$\lambda$ が大きいときの近似分布を標準化の形で示せ。

## 答え
$$\frac{X-\lambda}{\sqrt\lambda}\xrightarrow{d}N(0,1),\qquad X\mathrel{\dot{\sim}}N(\lambda,\lambda).$$

## 使用公式・定理
ポアソン分布は平均・分散とも $\lambda$。$\lambda$ が大きいとき中心極限定理で正規近似。

## 計算例
$\lambda=100$ なら $X\approx N(100,100)$、標準偏差 $10$。

## 一手
平均と分散が等しいので、標準化の分母は $\sqrt\lambda$。

## 注意
離散分布の近似なので必要に応じ連続修正を使う。

<!-- CARD -->

---
id: samp-cochran-theorem
title: Cochranの定理（平方和の分解）
category: math-distributions
subcategory: math-sampling-distributions
topic: cochran-theorem
type: theorem
difficulty: 3
priority: A
hashtags: [コクランの定理, 平方和分解, カイ二乗分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: カイ二乗分布 }]
---
## 問題
正規分布 $N(\mu,\sigma^2)$ からの標本 $X_1,\ldots,X_n$ について、全平方和を標本平均の平方和と残差平方和へ分解し、それぞれの分布と独立性を述べよ。

## 答え
$$\sum_{i=1}^n\frac{(X_i-\mu)^2}{\sigma^2}
=\frac{n(\overline X-\mu)^2}{\sigma^2}
+\frac{\sum_{i=1}^n(X_i-\overline X)^2}{\sigma^2}.$$ 
右辺の2項は独立で、
$$\frac{n(\overline X-\mu)^2}{\sigma^2}\sim\chi^2_1,$$
$$\frac{\sum_{i=1}^n(X_i-\overline X)^2}{\sigma^2}
=\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1}.$$ 

## 使用公式・定理
平方和の恒等式
$$\sum_{i=1}^n(X_i-\mu)^2
=\sum_{i=1}^n(X_i-\overline X)^2+n(\overline X-\mu)^2$$
とCochranの定理を使う。Cochranの定理は、標準正規ベクトルの全平方和を対称べき等行列に対応する平方和へ分解し、行列の階数の和が $n$ なら、各平方和が独立なカイ二乗分布に従うことを与える。

## 計算例
$n=3$ なら
$$\frac{3(\overline X-\mu)^2}{\sigma^2}\sim\chi^2_1,
\qquad \frac{2S^2}{\sigma^2}\sim\chi^2_2,$$
かつ両者は独立で、その和は $\chi^2_3$ に従う。

## 一手
直交変換で独立な標準正規の平方和に分解。自由度は変換後の成分数。

## 注意
分散分析の平方和分解の理論的根拠。正規性がない場合、直交分解自体はできても、各平方和の独立性と厳密なカイ二乗分布は一般には保証されない。

<!-- CARD -->

---
id: samp-ci-mean-t
title: 母平均の信頼区間（分散未知）
category: math-distributions
subcategory: math-sampling-distributions
topic: ci-mean-t
type: calc_step
difficulty: 2
priority: S
hashtags: [信頼区間, 母平均, t分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: t分布 }]
---
## 問題
$X_1,\ldots,X_n\overset{\mathrm{i.i.d.}}{\sim}$ 正規分布 $N(\mu,\sigma^2)$、$\sigma^2$ 未知とする。$\mu$ の信頼係数 $1-\alpha$ の信頼区間を、不偏標本分散 $S^2$ と $t$ 分布の上側分位点 $t_{n-1,\alpha/2}$ で示せ。

## 答え
$\overline X\pm t_{n-1,\alpha/2}\,\frac{S}{\sqrt n}.$

## 使用公式・定理
$\dfrac{\overline X-\mu}{S/\sqrt n}\sim t_{n-1}$ から
$$P\left(-t_{n-1,\alpha/2}\le\frac{\overline X-\mu}{S/\sqrt n}\le t_{n-1,\alpha/2}\right)=1-\alpha.$$
ここで $c=t_{n-1,\alpha/2}S/\sqrt n>0$ と置くと
$$-c\le\overline X-\mu\le c$$
$$\Longleftrightarrow\quad \overline X-c\le\mu\le\overline X+c,$$
となり、答えの区間を得る。

## 計算例
$n=16,\overline x=10,S=2,\alpha=0.05$ では $t_{15,0.025}\approx2.131$ で区間は $10\pm2.131\times\frac{2}{4}=[8.93,11.07]$。

## 一手
裾の分位点 $t_{n-1,\alpha/2}$ を標準誤差 $S/\sqrt n$ にかける。

## 注意
$\sigma$ 既知なら $z_{\alpha/2}$ を使う。自由度は $n-1$。

<!-- CARD -->

---
id: samp-ci-variance-chisq
title: 母分散の信頼区間（カイ二乗分布）
category: math-distributions
subcategory: math-sampling-distributions
topic: ci-variance-chisq
type: calc_step
difficulty: 2
priority: A
hashtags: [信頼区間, 母分散, カイ二乗分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: カイ二乗分布 }]
---
## 問題
正規分布 $N(\mu,\sigma^2)$ からの独立同分布標本 $X_1,\ldots,X_n$ で不偏標本分散を $S^2$ とする。$\sigma^2$ の信頼係数 $1-\alpha$ の信頼区間を示せ。

## 答え
$$\left[\frac{(n-1)S^2}{\chi^2_{n-1,\alpha/2}},\ \frac{(n-1)S^2}{\chi^2_{n-1,1-\alpha/2}}\right].$$

## 使用公式・定理
$\dfrac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1}$ を使う。$\chi^2$ は非対称なので上下の分位点が異なる。
上側確率で定義した分位点を使うと
$$P\left(\chi^2_{n-1,1-\alpha/2}
\le\frac{(n-1)S^2}{\sigma^2}
\le\chi^2_{n-1,\alpha/2}\right)=1-\alpha.$$ 
全て正なので逆数を取って不等号を反転し、$(n-1)S^2$ を掛けると
$$P\left(
\frac{(n-1)S^2}{\chi^2_{n-1,\alpha/2}}
\le\sigma^2\le
\frac{(n-1)S^2}{\chi^2_{n-1,1-\alpha/2}}
\right)=1-\alpha.$$ 

## 計算例
$n=10,S^2=4,\alpha=0.05$ では $\chi^2_{9,0.975}\approx2.700$、$\chi^2_{9,0.025}\approx19.023$ で区間は $[36/19.023,\ 36/2.700]=[1.89,13.33]$。

## 一手
上側端点は下側分位点 $\chi^2_{n-1,1-\alpha/2}$ で割り、下側端点は上側分位点 $\chi^2_{n-1,\alpha/2}$ で割る。

## 注意
$\chi^2$ は非対称なので両側でも分位点が異なる。

<!-- CARD -->

---
id: samp-chisq-percentile
title: カイ二乗分布の上側分位点の使い方
category: math-distributions
subcategory: math-sampling-distributions
topic: chi-square-percentile
type: calc_step
difficulty: 2
priority: A
hashtags: [カイ二乗分布, 上側分位点, 区間推定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: カイ二乗分布 }]
---
## 問題
$X\sim\chi^2_\nu$ とし、上側 $\alpha$ 分位点を $\chi^2_{\nu,\alpha}$ と書く。$P(\chi^2_{\nu,1-\alpha/2}\le X\le\chi^2_{\nu,\alpha/2})$ はいくらか。

## 答え
$$1-\alpha.$$

## 使用公式・定理
上側 $\alpha$ 分位点 $\chi^2_{\nu,\alpha}$ は $P(X>\chi^2_{\nu,\alpha})=\alpha$ を満たす。両側 $1-\alpha$ の区間は下側 $\chi^2_{\nu,1-\alpha/2}$ と上側 $\chi^2_{\nu,\alpha/2}$ ではさむ。

## 計算例
$\nu=9,\alpha=0.05$ なら $\chi^2_{9,0.975}\approx2.700$、$\chi^2_{9,0.025}\approx19.023$。確率 $0.95$ で $X$ はこの間にある。

## 一手
左右で確率 $\alpha/2$ ずつ残す。上側分位点は「その値より右の確率が $\alpha$」。

## 注意
$\chi^2$ は非対称なので上下の分位点は等距離でない。

<!-- CARD -->

---
id: samp-f-percentile
title: F分布の上側分位点と逆数関係
category: math-distributions
subcategory: math-sampling-distributions
topic: f-percentile-inverse
type: calc_step
difficulty: 2
priority: A
hashtags: [F分布, 上側分位点, 逆数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: F分布 }]
---
## 問題
$F_{\nu_1,\nu_2;\alpha}$ を上側 $\alpha$ 分位点とする。$F_{\nu_1,\nu_2;\alpha}$ を $F_{\nu_2,\nu_1;1-\alpha}$ で表せ。

## 答え
$$F_{\nu_1,\nu_2;\alpha}=\frac{1}{F_{\nu_2,\nu_1;1-\alpha}}.$$

## 使用公式・定理
$F\sim F_{\nu_1,\nu_2}$ なら $1/F\sim F_{\nu_2,\nu_1}$。上側 $\alpha$ 点と下側 $\alpha$ 点が逆数の関係で結ばれる。

## 計算例
$F_{3,8;0.05}=1/F_{8,3;0.95}$。

## 一手
上側 $\alpha$ を下側 $\alpha$ の逆数に直し、自由度を入れ替える。

## 注意
F分布表は上側分位点のみ載せていることが多い。小さい確率側は逆数で求める。

<!-- CARD -->

---
id: samp-t-percentile-symmetry
title: t分布の対称性と分位点
category: math-distributions
subcategory: math-sampling-distributions
topic: t-percentile-symmetry
type: calc_step
difficulty: 1
priority: A
hashtags: [t分布, 対称性, 分位点]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: t分布 }]
---
## 問題
$t_{\nu,\alpha}$ を上側 $\alpha$ 分位点とする。$t_{\nu,1-\alpha}$ を $t_{\nu,\alpha}$ で表せ。

## 答え
$$t_{\nu,1-\alpha}=-t_{\nu,\alpha}.$$

## 使用公式・定理
$t$ 分布の密度は0に関して対称なので、左裾の $\alpha$ 点は右裾の $\alpha$ 点の符号反転。

## 計算例
$t_{10,0.975}=-t_{10,0.025}$。$t_{10,0.025}\approx2.228$ なので $t_{10,0.975}\approx-2.228$。

## 一手
対称分布では下側分位点は上側の符号を反転。

## 注意
標準正規分布の $z$ 分位点と同じ性質。$\chi^2$ や $F$ にはない。

<!-- CARD -->

---
id: samp-sample-size-mean
title: 平均の区間推定での標本サイズ設計
category: math-distributions
subcategory: math-sampling-distributions
topic: sample-size-mean
type: calc_step
difficulty: 3
priority: B
hashtags: [標本サイズ, 区間推定, 誤差]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 標本分布 }]
---
## 問題
母標準偏差 $\sigma$ 既知、目標の半幅（許容誤差）を $d$、信頼係数を $1-\alpha$ とする。母平均の区間推定に必要な標本サイズ $n$ を求めよ。

## 答え
$$n=\left(\frac{z_{\alpha/2}\,\sigma}{d}\right)^2,$$
必要な $n$ は整数なので切り上げる。

## 使用公式・定理
区間の半幅は $z_{\alpha/2}\sigma/\sqrt n$。これを $d$ 以下にする。
$$\frac{z_{\alpha/2}\sigma}{\sqrt n}\le d
\quad\Longleftrightarrow\quad
\sqrt n\ge\frac{z_{\alpha/2}\sigma}{d}
\quad\Longleftrightarrow\quad
n\ge\left(\frac{z_{\alpha/2}\sigma}{d}\right)^2.$$ 

## 計算例
$\sigma=10,d=2,\alpha=0.05$ では $z_{0.025}\approx1.96$ で $n=(1.96\times10/2)^2=96.04\approx97$。

## 一手
半幅の式を $n$ について解き、切り上げる。

## 注意
$\sigma$ 未知なら $t$ 分布で反復する必要がある。

<!-- CARD -->

---
id: samp-sample-size-proportion
title: 母比率の区間推定での標本サイズ
category: math-distributions
subcategory: math-sampling-distributions
topic: sample-size-proportion
type: calc_step
difficulty: 3
priority: B
hashtags: [標本サイズ, 母比率, 信頼区間]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 標本分布 }]
---
## 問題
母比率 $p$ を誤差 $d$ 以内・信頼係数 $1-\alpha$ で推定したい。必要標本サイズ $n$ の式を、$p$ 既知の場合と未知の場合で示せ。

## 答え
$p$ の予備値 $p_0$ があれば
$$n=\frac{z_{\alpha/2}^2\,p_0(1-p_0)}{d^2}.$$
情報がなければ最悪ケース $p=1/2$ を使い
$$n=\frac{z_{\alpha/2}^2}{4d^2}.$$

## 使用公式・定理
標本比率の標準誤差は $\sqrt{p(1-p)/n}$。$p(1-p)$ は $p=1/2$ で最大 $1/4$。

## 計算例
$\alpha=0.05,d=0.03$ なら $n=(1.96^2)/(4\times0.03^2)\approx1068$。

## 一手
$p=1/2$ は分散最大で安全側。事前情報があれば実際の $p$ を使う。

## 注意
$p$ が0や1に近いと正規近似の前提が弱くなる。

<!-- CARD -->

---
id: samp-welch-t
title: Welchのt検定と近似自由度
category: math-distributions
subcategory: math-sampling-distributions
topic: welch-t
type: theorem
difficulty: 3
priority: B
hashtags: [Welchのt検定, 近似自由度, 不均等分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: t分布 }]
---
## 問題
2標本の母分散が等しいと仮定できないとき、平均差の検定統計量と近似自由度を示せ。

## 答え
$$T=\frac{\overline X-\overline Y}{\sqrt{\dfrac{S_1^2}{n_1}+\dfrac{S_2^2}{n_2}}}\approx t_\nu,$$
$$\nu=\frac{\left(\dfrac{S_1^2}{n_1}+\dfrac{S_2^2}{n_2}\right)^2}{\dfrac{(S_1^2/n_1)^2}{n_1-1}+\dfrac{(S_2^2/n_2)^2}{n_2-1}}.$$
これは Welch-Satterthwaite の近似自由度である。

## 使用公式・定理
$\overline X-\overline Y$ の分散は $\sigma_1^2/n_1+\sigma_2^2/n_2$。不偏分散で置き換えた統計量は近似t分布に従う。

## 計算例
$n_1=n_2=10$、$S_1^2=4S_2^2$ なら $\nu=(S_1^2/10+S_2^2/10)^2/\{(S_1^2/10)^2/9+(S_2^2/10)^2/9\}$ を計算して $\nu\approx13.24<18$ となる。

## 一手
等分散が疑わしい場合は結合分散を使わず、サタースウェイトの自由度で近似する。

## 注意
$\nu$ は整数である必要がなく、$\nu\le n_1+n_2-2$ となる。ただし、Welch 検定が等分散 t 検定より常に保守的という意味ではない。

<!-- CARD -->

---
id: samp-two-proportion-diff
title: 2標本比率の差の分布
category: math-distributions
subcategory: math-sampling-distributions
topic: proportion-difference
type: theorem
difficulty: 3
priority: B
hashtags: [2標本, 比率の差, 正規近似]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 標本分布 }]
---
## 問題
独立な2群の標本比率 $\widehat p_1,\widehat p_2$（標本サイズ $n_1,n_2$）の差の期待値と分散を求めよ。

## 答え
$$E[\widehat p_1-\widehat p_2]=p_1-p_2,$$
$$\operatorname{Var}(\widehat p_1-\widehat p_2)=\frac{p_1(1-p_1)}{n_1}+\frac{p_2(1-p_2)}{n_2}.$$

## 使用公式・定理
標本比率はベルヌーイ平均。独立標本なので分散は和。中心極限定理で正規近似。

## 計算例
$n_1=n_2=100,p_1=0.6,p_2=0.4$ なら分散は $0.6\times0.4/100+0.4\times0.6/100=0.0048$、標準偏差 $\approx0.069$。

## 一手
帰無仮説 $p_1=p_2=p$ ではプールして $\widehat p$ を使い、分散は $p(1-p)(1/n_1+1/n_2)$。

## 注意
帰無仮説下では共通の $p$ をプールする方が検定のレベルを保ちやすい。

<!-- CARD -->

---
id: samp-noncentral-chisq
title: 非心カイ二乗分布
category: math-distributions
subcategory: math-sampling-distributions
topic: noncentral-chisq
type: recognition
difficulty: 3
priority: B
hashtags: [非心カイ二乗分布, 非心度, 検出力]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: カイ二乗分布 }]
---
## 問題
独立に正規分布 $N(\mu_i,1)$ に従う $X_i$（$i=1,\ldots,\nu$）のとき、$X=\sum_iX_i^2$ はどのような分布に従うか、非心パラメータ $\lambda$ とともに述べよ。

## 答え
$$X\sim\chi^2_\nu(\lambda),\qquad \lambda=\sum_{i=1}^\nu\mu_i^2.$$
期待値は $E[X]=\nu+\lambda$、分散は $\operatorname{Var}(X)=2(\nu+2\lambda)$。

## 使用公式・定理
非心度 $\lambda$ は平均の2乗和。$\lambda=0$ なら通常の $\chi^2_\nu$。

## 計算例
$\nu=3,\lambda=2$ では $E[X]=5$、$\operatorname{Var}(X)=2(3+4)=14$。

## 一手
平均が0でない正規の平方和は非心カイ二乗。非心度は平均の2乗和。

## 注意
検出力の計算（適合度検定など）に使われる。

<!-- CARD -->

---
id: samp-noncentral-t
title: 非心t分布の定義
category: math-distributions
subcategory: math-sampling-distributions
topic: noncentral-t
type: recognition
difficulty: 3
priority: B
hashtags: [非心t分布, 検出力, 定義]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: t分布 }]
---
## 問題
$Z$ を正規分布 $N(\delta,1)$ に従う確率変数、$Z$ と独立な $V\sim\chi^2_\nu$ があるとき、非心t分布 $t_\nu(\delta)$ の定義式を示せ。

## 答え
$$T=\frac{Z}{\sqrt{V/\nu}}\sim t_\nu(\delta),$$
$\delta$ を非心度パラメータと呼ぶ。$\delta=0$ なら通常の $t_\nu$。

## 使用公式・定理
検出力の計算では $\delta=(\mu_1-\mu_0)/(\sigma/\sqrt n)$ のような非心度を使う。

## 計算例
$\nu=15,\delta=2$ では通常のtより右へずれ、$H_1$ 下での検出力はこの分布の上側確率で求まる。

## 一手
通常のtの分子を非心正規に置き換えたものが非心t。

## 注意
非心tの密度は複雑。検出力の計算に使う分布として認識。

<!-- CARD -->

---
id: samp-f-anova-ratio
title: 分散分析のF比と標本分布
category: math-distributions
subcategory: math-sampling-distributions
topic: f-anova-ratio
type: theorem
difficulty: 3
priority: A
hashtags: [分散分析, F比, 平方和]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: F分布 }]
---
## 問題
一元配置のグループ間平方和 $SS_B$（自由度 $k-1$）とグループ内平方和 $SS_W$（自由度 $N-k$）が独立であるとする。帰無仮説下でF統計量はどの分布に従うか。

## 答え
$$F=\frac{SS_B/(k-1)}{SS_W/(N-k)}\sim F_{k-1,N-k}.$$

## 使用公式・定理
$SS_B/\sigma^2\sim\chi^2_{k-1}$、$SS_W/\sigma^2\sim\chi^2_{N-k}$、両者は独立（コクランの定理）。自由度で割って比を取る。

## 計算例
$k=3,N=30$ なら $F\sim F_{2,27}$。

## 一手
平方和を $\sigma^2$ で割ったカイ二乗を自由度で割って比を取る。

## 注意
$SS_B$ と $SS_W$ の独立性が本質。非正規では近似になる。
