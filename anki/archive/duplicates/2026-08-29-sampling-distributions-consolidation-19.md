---
id: samp-chisq-additive
title: 独立なカイ二乗分布の再生性
category: math-distributions
subcategory: math-sampling-distributions
topic: chi-square-additivity
type: theorem
difficulty: 2
priority: S
hashtags:
  - カイ二乗分布
  - 再生性
  - 独立和
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: カイ二乗分布
archive_reason: duplicate
canonical_card: samp-chisq-definition
archive_note: カイ二乗canonicalへ独立和の再生性とモーメント母関数による確認を吸収済み。
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
id: samp-chisq-expectation-squared
title: 標準正規分布の2乗の期待値
category: math-distributions
subcategory: math-sampling-distributions
topic: chi-square-standard-normal-square
type: calc_step
difficulty: 2
priority: A
hashtags:
  - 標準正規分布
  - 2乗
  - カイ二乗分布
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: カイ二乗分布
archive_reason: duplicate
canonical_card: samp-chisq-definition
archive_note: カイ二乗canonicalへZ^2~chi-square_1と平均1・分散2を吸収済み。
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
id: samp-chisq-from-normal
title: 標準正規分布からカイ二乗への変数変換
category: math-distributions
subcategory: math-sampling-distributions
topic: chi-square-transform
type: recognition
difficulty: 2
priority: A
hashtags:
  - 変数変換
  - 標準正規分布
  - カイ二乗分布
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: カイ二乗分布
archive_reason: duplicate
canonical_card: samp-chisq-definition
archive_note: カイ二乗canonicalへ標準正規平方からchi-square_1を得る2枝の変数変換を吸収済み。
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
hashtags:
  - カイ二乗分布
  - ガンマ分布
  - 関係
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: カイ二乗分布
  - type: official_syllabus
    topic: ガンマ分布
archive_reason: duplicate
canonical_card: samp-chisq-definition
archive_note: カイ二乗canonicalへshape-rate表示Gamma(nu/2,1/2)との一致を吸収済み。
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
hashtags:
  - カイ二乗分布
  - 自由度
  - 期待値
  - 分散
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: カイ二乗分布
archive_reason: duplicate
canonical_card: samp-chisq-definition
archive_note: カイ二乗canonicalへ自由度と平均nu・分散2nuの関係を吸収済み。
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
id: prob-transform-normal-square-sum
title: 独立標準正規変数の平方和をカイ二乗分布に結び付ける
category: math-probability
subcategory: math-transformations
topic: chi-square-sum-transform
type: calc_step
difficulty: 2
priority: S
hashtags:
  - カイ二乗分布
  - 平方和
  - 再生性
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 変数変換
archive_reason: duplicate
canonical_card: samp-chisq-definition
archive_note: 標準正規の独立平方和、自由度、平均分散は強化済みカイ二乗canonicalに完全統合済み。
---
## 問題
$Z_1,\ldots,Z_4$ は独立に標準正規分布に従う。$Q=\sum_{i=1}^4Z_i^2$ の分布、平均、分散を求めよ。
## 答え
$$Q\sim\chi_4^2,\qquad E[Q]=4,\qquad \operatorname{Var}(Q)=8.$$
## 使用公式・定理
$Z_i^2\sim\chi_1^2$ であり、独立なカイ二乗分布の自由度は加法的。
$$\chi_{\nu_1}^2+\chi_{\nu_2}^2\sim\chi_{\nu_1+\nu_2}^2.$$
## 計算例
自由度は $1+1+1+1=4$。カイ二乗分布の公式
$$E[\chi_\nu^2]=\nu,\qquad \operatorname{Var}(\chi_\nu^2)=2\nu$$
へ $\nu=4$ を代入する。
## 一手
平方和の項数が自由度になるのは、各標準正規変数が独立な場合。
## 注意
相関がある正規変数の平方和にはそのまま適用できない。

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
hashtags:
  - t分布
  - 分散未知
  - 不偏標本分散
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: t分布
archive_reason: duplicate
canonical_card: samp-t-statistic-mean-test
archive_note: 母分散未知でsigmaをSへ置き換えるとt_{n-1}になる理由はt統計量canonicalに既に導出され、t分布canonicalにも構成法を統合済み。
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
hashtags:
  - t分布
  - 正規近似
  - 大標本
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: t分布
archive_reason: duplicate
canonical_card: samp-t-distribution-definition
archive_note: t分布canonicalへV/nuの確率収束とSlutskyによる標準正規極限を吸収済み。
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
hashtags:
  - t分布
  - 極限
  - 標準正規分布
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: t分布
archive_reason: duplicate
canonical_card: samp-t-distribution-definition
archive_note: t分布canonicalへ自由度1の標準コーシー分布と自由度無限大での標準正規極限を吸収済み。
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
id: prob-transform-student-t
title: 正規変数とカイ二乗変数の比からt分布を作る
category: math-probability
subcategory: math-transformations
topic: student-t-ratio
type: calc_step
difficulty: 2
priority: S
hashtags:
  - Studentのt分布
  - カイ二乗分布
  - 比の分布
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 変数変換
archive_reason: duplicate
canonical_card: samp-t-distribution-definition
archive_note: 標準正規と独立カイ二乗の比によるt分布構成は強化済みt分布canonicalへ統合済み。
---
## 問題
$Z$ は正規分布 $N(0,1)$、$V$ はカイ二乗分布 $\chi_{9}^2$ に従い、互いに独立である。$T=Z/\sqrt{V/9}$ の分布と $P(|T|\le2.262)$ を答えよ。
## 答え
$$T\sim t_9,\qquad P(|T|\le2.262)=0.95.$$
## 使用公式・定理
独立な $Z\sim N(0,1)$、$V\sim\chi_\nu^2$ に対し
$$\frac{Z}{\sqrt{V/\nu}}\sim t_\nu.$$
## 計算例
自由度は分母のカイ二乗自由度9。$t_{9;0.975}=2.262$ と対称性から
$$P(-2.262\le T\le2.262)=0.975-0.025=0.95.$$
## 一手
分母が $\sqrt{V}$ だけなら、自由度で割った形 $\sqrt{V/\nu}$ へ直す。
## 注意
$Z$ と $V$ の独立性が定義の一部。

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
hashtags:
  - F分布
  - 逆数
  - 自由度
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: F分布
archive_reason: duplicate
canonical_card: samp-f-distribution-definition
archive_note: F分布canonicalへ逆数で自由度が交換される関係を吸収済み。
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
hashtags:
  - t分布
  - F分布
  - 2乗
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: t分布
  - type: official_syllabus
    topic: F分布
archive_reason: duplicate
canonical_card: samp-f-distribution-definition
archive_note: F分布canonicalへt_nu^2~F_{1,nu}の導出を吸収済み。
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
hashtags:
  - F分布
  - t分布
  - 平方根
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: F分布
  - type: official_syllabus
    topic: t分布
archive_reason: duplicate
canonical_card: samp-f-distribution-definition
archive_note: F分布canonicalへsqrt(F_{1,nu})が|t_nu|に対応し符号を失う点を吸収済み。
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
id: prob-transform-f-ratio
title: 2つのカイ二乗変数の比からF分布を作る
category: math-probability
subcategory: math-transformations
topic: f-ratio-transform
type: calc_step
difficulty: 2
priority: S
hashtags:
  - F分布
  - カイ二乗分布
  - 分散比
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 変数変換
archive_reason: duplicate
canonical_card: samp-f-distribution-definition
archive_note: 独立カイ二乗を自由度で割った比によるF分布構成は強化済みF分布canonicalへ統合済み。
---
## 問題
$U\sim\chi_5^2$、$V\sim\chi_{10}^2$ が独立である。$W=(U/5)/(V/10)$ の分布を答え、$U=8,V=12$ の実現値を計算せよ。
## 答え
$$W\sim F_{5,10},\qquad w=\frac{8/5}{12/10}=\frac43\approx1.333.$$
## 使用公式・定理
独立な $U\sim\chi_m^2$、$V\sim\chi_n^2$ に対し
$$\frac{U/m}{V/n}\sim F_{m,n}.$$
## 計算例
$$\frac{8/5}{12/10}=\frac{1.6}{1.2}=1.333\ldots.$$
分子自由度5、分母自由度10の順で記す。
## 一手
各カイ二乗変数を自由度で割ってから比を取る。
## 注意
分子と分母を逆にすると $F_{10,5}$ になり、元の逆数である。

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
hashtags:
  - 最小値
  - 順序統計量
  - 余事象
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 順序統計量
archive_reason: duplicate
canonical_card: samp-order-statistics-distribution
archive_note: 一般の第k順序統計量canonicalへ最小値の生存関数導出と指数分布の最小値例を吸収済み。
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
id: prob-transform-iid-maximum-density
title: 独立同分布標本の最大値の密度を累積分布関数から求める
category: math-probability
subcategory: math-transformations
topic: maximum-transform-density
type: calc_step
difficulty: 2
priority: S
hashtags:
  - 最大値
  - 順序統計量
  - 累積分布関数
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 変数変換
archive_reason: duplicate
canonical_card: samp-order-statistics-distribution
archive_note: 最大値・最小値の一般公式と一様・指数の代表例を第k順序統計量canonicalへ統合済み。
---
## 問題
$X_1,\ldots,X_n$ は累積分布関数 $F$、密度 $f$ を持つ独立同分布標本である。$M=\max_iX_i$ の密度を求め、一様分布 $U(0,1)$、$n=3$ で具体化せよ。
## 答え
最大値は $F^n$、最小値は生存関数 $(1-F)^n$ から始める。

## 使用公式・定理
$X_1,\ldots,X_n$ が累積分布関数 $F$、密度 $f$ を持つ独立同分布標本とする。最大値 $M=\max_iX_i$ は
$$
F_M(m)=P(M\le m)=F(m)^n,
$$
よって
$$f_M(m)=nF(m)^{n-1}f(m).$$
最小値 $L=\min_iX_i$ は生存関数を使って
$$
P(L>\ell)=\{1-F(\ell)\}^n,
$$
よって
$$f_L(\ell)=n\{1-F(\ell)\}^{n-1}f(\ell).$$

## 計算例
$X_i\sim U(0,1)$、$n=3$ なら $0<m<1$ で
$$F_M(m)=m^3,\qquad f_M(m)=3m^2.$$

一方 $X_i\sim\operatorname{Exp}(\lambda)$ なら
$$P(X_i>\ell)=e^{-\lambda\ell}$$
なので
$$
P(L>\ell)=e^{-n\lambda\ell},
$$
したがって
$$L\sim\operatorname{Exp}(n\lambda),
\qquad
f_L(\ell)=n\lambda e^{-n\lambda\ell}.
$$

## 一手
最大値の「以下」は全標本が以下、最小値の「超える」は全標本が超える、と積事象へ直す。

## 注意
$F(m)^n$ や $(1-F(\ell))^n$ を使うには標本の独立性が必要である。最小値の指数率は $\lambda/n$ ではなく $n\lambda$。

<!-- CARD -->

---
id: dist-order-max
title: 最大値の分布を累積分布関数から求める
category: math-estimation
subcategory: math-population-sample-statistic
topic: order-statistics
type: strategy
difficulty: 2
priority: S
hashtags:
  - 順序統計量
  - 累積分布関数
  - 最大値
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 順序統計量
archive_reason: duplicate
canonical_card: samp-order-statistics-distribution
archive_note: 一様標本最大値の累積分布関数から密度を求める旧pilotは一般の順序統計量canonicalの特殊例として統合済み。
---
## 問題
$X_1,X_2$ は独立同分布に一様分布 $U(0,1)$ に従い、$M=\max(X_1,X_2)$ とする。$M$ の密度を求めよ。
## 方針
最大値が $m$ 以下とは、全標本が $m$ 以下ということなので累積分布関数から始める。
## 使用公式・定理
$$F_M(m)=P(M\le m)=\{F_X(m)\}^n.$$
## 計算例
$0<m<1$ では $F_X(m)=m$ だから
$$F_M(m)=m^2,\qquad f_M(m)=\frac{d}{dm}m^2=2m.$$
台の外では密度は0で、$\int_0^12m\,dm=1$。
## 注意
密度を出した後も台を残す。
