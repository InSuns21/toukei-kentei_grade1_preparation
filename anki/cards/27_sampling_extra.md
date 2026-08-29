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
title: 多項標本の度数分布をカイ二乗適合度検定へ接続する
category: math-distributions
subcategory: math-sampling-distributions
topic: multinomial-cell-counts
type: theorem
difficulty: 3
priority: A
hashtags: [多項分布, 適合度検定, カイ二乗分布, 度数分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 多項分布 }]
---
## 問題
$n$ 個の独立試行が確率 $p_j$（$\sum_jp_j=1$）で $d$ カテゴリーへ分類され、観測度数を $O_j$、期待度数を $E_j=np_j$ とする。多項標本の観測度数 $O_j$ は多項分布 $\operatorname{Multinomial}(n;p_1,\ldots,p_d)$ に従うことを踏まえ、Pearsonの適合度統計量 $X^2=\sum_j\frac{(O_j-E_j)^2}{E_j}$ の帰無仮説下での漸近分布を答えよ。
## 答え
$$X^2=\sum_{j=1}^d\frac{(O_j-E_j)^2}{E_j}\ \overset{d}{\longrightarrow}\ \chi^2_{d-1}.$$
自由度は $d-1$ である。これは多項標本の度数分布 $O_j$ と期待度数 $E_j=np_j$ の隔たりを測り、適合度検定として使う。
## 使用公式・定理
度数ベクトルの平均は $np$、分散共分散行列は $n\{\operatorname{diag}(p)-pp^{\mathsf T}\}$ である。標準化残差は互いに相関し、$\sum_j(O_j-np_j)=0$ という1本の線形制約があるため、二次形式 $X^2$ の自由度は $d-1$ となる。既存の多項分布の確率質量関数（$\operatorname{Multinomial}(n;p_1,\ldots,p_d)$、周辺は二項、共分散は負）は `dist-multinomial-definition` を参照。
## 計算例
$n=200$、$d=3$、帰無仮説 $p=(0.5,0.3,0.2)$、観測 $(94,63,43)$ なら $E=(100,60,40)$ で
$$X^2=\frac{(94-100)^2}{100}+\frac{(63-60)^2}{60}+\frac{(43-40)^2}{40}=0.36+0.15+0.225=0.735,$$
自由度 $d-1=2$ の $\chi^2_2$ と比較する。
## 一手
「多項標本の度数分布」を扱うときは期待度数 $E_j=np_j$ を先に計算し、$(O_j-E_j)^2/E_j$ の和を取り、自由度 $d-1$ のカイ二乗分布と比較する。
## 注意
各セルの期待度数 $E_j=np_j$ が十分大きい必要がある。$p_j$ をデータから $q$ 個の独立な母数で推定した場合、自由度は $d-1-q$ になる。多項分布の確率質量関数そのものは既存 `dist-multinomial-definition`・`dist-multinomial-moments` と重複するため、本カードは標本分布としての漸近・検定への接続に限定する。
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
