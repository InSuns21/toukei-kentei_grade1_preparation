---
id: samp-statistic-definition
title: 統計量は観測値の関数として定義する
category: math-distributions
subcategory: math-sampling-distributions
topic: statistic-definition
type: recognition
difficulty: 1
priority: A
hashtags: [統計量, 標本分布, 関数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 標本分布 }]
---
## 問題
標本 $X_1,\ldots,X_n$ に対し、統計量とは何か。標本平均 $\overline X$ を例に説明せよ。

## 答え
統計量とは、観測値 $X_1,\ldots,X_n$ の関数であって未知母数を含まない確率変数である。
$$T=T(X_1,\ldots,X_n).$$
標本平均
$$\overline X=\frac1n\sum_{i=1}^nX_i$$
も母数 $\mu,\sigma^2$ を含まない $X_i$ の関数なので統計量である。

## 使用公式・定理
統計量は観測値から計算できる値。母数を式に含まないことが定義の本質。統計量の分布を標本分布と呼ぶ。

## 計算例
$X_1,\ldots,X_n\overset{\mathrm{i.i.d.}}{\sim}$ 正規分布 $N(\mu,\sigma^2)$ のとき、$\overline X$ は母数を含まないので統計量であり、その標本分布は $N(\mu,\sigma^2/n)$。

## 一手
「母数を含まない観測値の関数＝統計量」と覚える。$\mu$ を含む $X_i-\mu$ は統計量ではない。

## 注意
統計量は母数を含まないが、その分布は母数に依存する。この「母数を含まないが分布は母数に依存」が論点の核心。
<!-- CARD -->
---
id: samp-two-sample-mean-diff
title: 2標本平均差の標本分布を求める
category: math-distributions
subcategory: math-sampling-distributions
topic: two-sample-mean-diff
type: theorem
difficulty: 2
priority: S
hashtags: [2標本平均差, 標本分布, 正規分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 標本分布 }]
---
## 問題
独立な2標本 $X_1,\ldots,X_{n_1}\overset{\mathrm{i.i.d.}}{\sim}$ 正規分布 $N(\mu_1,\sigma_1^2)$ と $Y_1,\ldots,Y_{n_2}\overset{\mathrm{i.i.d.}}{\sim}$ 正規分布 $N(\mu_2,\sigma_2^2)$ について、平均の差 $\overline X-\overline Y$ の分布を答えよ。

## 答え
$$\overline X-\overline Y\sim N\left(\mu_1-\mu_2,\ \frac{\sigma_1^2}{n_1}+\frac{\sigma_2^2}{n_2}\right).$$

## 使用公式・定理
独立な正規分布の線形結合は正規分布。
$$E[\overline X-\overline Y]=\mu_1-\mu_2,$$
$$\operatorname{Var}(\overline X-\overline Y)=\operatorname{Var}(\overline X)+\operatorname{Var}(\overline Y)=\frac{\sigma_1^2}{n_1}+\frac{\sigma_2^2}{n_2}.$$
2標本は独立なので分散は和になる。

## 計算例
$n_1=n_2=25,\ \sigma_1^2=4,\ \sigma_2^2=9$ なら
$$\overline X-\overline Y\sim N\left(\mu_1-\mu_2,\ \frac{4}{25}+\frac{9}{25}=\frac{13}{25}\right).$$

## 一手
平均は差、分散は和。標本平均は $\sigma^2/n$ で縮むので $\sigma_1^2/n_1+\sigma_2^2/n_2$。

## 注意
分散が負になるなら共分散を引く誤り。2標本が独立なので共分散項は0で、分散は必ず和になる。この既知分散の分布は、母分散未知の等分散・不等分散t検定（既存 `samp-two-sample-pooled-variance`・`samp-welch-t`）の前提として使う。
<!-- CARD -->
---
id: samp-multinomial-cell-counts
title: 多項標本からPearson適合度統計量と自由度を導く
category: math-distributions
subcategory: math-sampling-distributions
topic: multinomial-cell-counts-goodness-fit
type: strategy
difficulty: 3
priority: S
hashtags:
  - 多項分布
  - 適合度の検定
  - カイ二乗分布
  - 自由度
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 多項分布
---
## 問題
$n$ 個の独立試行が $k$ 個のカテゴリーへ分類され、帰無仮説のカテゴリー確率を $p_1,\ldots,p_k$、観測度数を $O_j$、期待度数を $E_j=np_j$ とする。

1. Pearsonの適合度統計量を書き、帰無仮説のカテゴリー確率が既知のときの漸近自由度を答えよ。
2. 帰無モデルの内部母数をデータから独立に $r$ 個推定したとき、自由度はどう変わるか。
3. $k=5$ 区分で内部母数を1個推定した場合の自由度を求めよ。

## 答え
Pearsonの適合度統計量は
$$
X^2=\sum_{j=1}^k\frac{(O_j-E_j)^2}{E_j}.
$$
帰無仮説のカテゴリー確率が既知なら、通常の正則条件の下で
$$
X^2\xrightarrow{d}\chi^2_{k-1}.
$$
帰無モデルの内部母数をデータから $r$ 個推定したなら
$$
\boxed{\mathrm{df}=k-1-r}.
$$
したがって $k=5,r=1$ では
$$
\boxed{\mathrm{df}=5-1-1=3}.
$$

## 使用公式・定理
度数ベクトル $(O_1,\ldots,O_k)$ は多項分布に従い、平均と分散共分散行列は
$$
E[\boldsymbol O]=n\boldsymbol p,
\qquad
\operatorname{Cov}(\boldsymbol O)
=n\{\operatorname{diag}(\boldsymbol p)-\boldsymbol p\boldsymbol p^{\mathsf T}\}.
$$
度数には必ず
$$
\sum_{j=1}^k O_j=n
$$
という1本の線形制約があるため、カテゴリー確率が既知なら自由度は $k-1$ になる。

さらに帰無モデルの内部母数を $r$ 個、同じデータから正則な方法で推定すると
$$
\mathrm{df}=k-1-r.
$$
記号を $d$ カテゴリー、推定母数数を $q$ と書く流儀では同じ式は
$$
\mathrm{df}=d-1-q
$$
である。

## 計算例
$n=200$、$k=3$、帰無仮説 $\boldsymbol p=(0.5,0.3,0.2)$、観測度数 $(94,63,43)$ なら期待度数は $(100,60,40)$ である。したがって
$$
\begin{aligned}
X^2
&=\frac{(94-100)^2}{100}
  +\frac{(63-60)^2}{60}
  +\frac{(43-40)^2}{40}\\
&=0.735.
\end{aligned}
$$
確率が既知なので自由度は $3-1=2$ である。

一方、$k=5$ 区分の正則で識別可能な帰無モデルで内部母数を1個推定したなら
$$
\mathrm{df}=k-1-r=5-1-1=3.
$$

## 一手／方針
**まず「度数の総和が固定」で1自由度を引き、次に「同じデータから推定した帰無モデルの独立母数数」を引く。** 適合度検定の自由度を機械的に $k-1$ としない。

## 注意
$k-1-r$ は、正則で識別可能な帰無モデル、各カテゴリー確率が正で、期待度数が十分大きいという通常の漸近条件の下で使う。期待度数が極端に小さい場合はカイ二乗近似の妥当性を確認する。

推定母数数を引くのは、その母数を同じ標本から推定した場合である。既知の外部パラメータまで機械的に引かない。
<!-- CARD -->
---
id: samp-sample-correlation-basic
title: 標本相関係数の定義と帰無仮説下の分布を述べる
category: math-distributions
subcategory: math-sampling-distributions
topic: sample-correlation-basic
type: recognition
difficulty: 2
priority: A
hashtags: [標本相関係数, 定義, 標本分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 標本分布 }]
---
## 問題
2変量標本 $(X_1,Y_1),\ldots,(X_n,Y_n)$ からの標本相関係数 $r$ の定義を書き下せ。

## 答え
$$r=\frac{\sum_{i=1}^n(X_i-\overline X)(Y_i-\overline Y)}{\sqrt{\sum_{i=1}^n(X_i-\overline X)^2}\,\sqrt{\sum_{i=1}^n(Y_i-\overline Y)^2}},$$
範囲は $-1\le r\le1$。母相関係数 $\rho$ を推定する標本版である。

## 使用公式・定理
母相関係数が $\rho$ の2変量正規標本で、$\rho=0$ の帰無仮説下では
$$t=\frac{r\sqrt{n-2}}{\sqrt{1-r^2}}\sim t_{n-2}.$$

## 計算例
$n=20,\ r=0.4$ なら
$$t=\frac{0.4\sqrt{18}}{\sqrt{1-0.16}}\approx\frac{0.4\cdot4.243}{0.9165}\approx1.85.$$

## 一手
標本相関係数は標本共分散を標本標準偏差の積で割って無次元化したもの。$\rho=0$ 検定は $t$ 統計量へ帰着。

## 注意
一般の $\rho$ での $r$ の厳密分布は複雑。$\rho=0$ なら $t_{n-2}$ に帰着し、一般の $\rho$ ではフィッシャーの $z$ 変換 $\frac12\log\frac{1+r}{1-r}$ で正規近似する。
<!-- CARD -->
