---
id: est-score-mean-zero
title: スコア関数の期待値0
category: math-estimation
subcategory: math-point-estimator-properties
topic: fisher-information
type: proof_step
difficulty: 2
priority: S
hashtags:
  - スコア関数
  - 期待値
  - 正則条件
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 有効スコア関数
archive_reason: duplicate
canonical_card: est-fisher-information-def
archive_note: スコア平均0は正規化条件の微分からフィッシャー情報量（1次元）の2表式まで同じ正本で導出済み。
---
## 問題
正則条件の下で、スコア関数（対数密度の母数に関する微分）の期待値が0になることを示せ。
## 答え
$\int f(x;\theta)dx=1$ を $\theta$ で微分する。積分と微分の交換が可能なら
$$\int \frac{\partial}{\partial\theta}f(x;\theta)\,dx=\int U(\theta)f(x;\theta)\,dx=E[U(\theta)]=\frac{\partial}{\partial\theta}\int f(x;\theta)\,dx=0.$$
## 使用公式・定理
$E[U(\theta)]=0$、ただし $\frac{\partial f}{\partial\theta}=U f$ と $\int f=1$ を用いる。ここで $U(\theta)=\partial\log f/\partial\theta$。
## 計算例
$\operatorname{Bernoulli}(p)$：$U(p)=X/p-(1-X)/(1-p)$。$E[U]=p/p-(1-p)/(1-p)=0$。
## 一手
$\int f=1$ を微分して微分を積分の中へ入れる。交換可能が正則条件。

<!-- CARD -->

---
id: est-fisher-two-forms
title: フィッシャー情報量（1次元）の2つの表式
category: math-estimation
subcategory: math-point-estimator-properties
topic: fisher-information
type: theorem
difficulty: 2
priority: S
hashtags:
  - フィッシャー情報量（1次元）
  - 2回微分
  - 分散
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: フィッシャー情報量（1次元）
archive_reason: duplicate
canonical_card: est-fisher-information-def
archive_note: E[U^2]と-E[ell'']の等価性を正則条件とともに正本で導出済み。
---
## 問題
正則条件の下でフィッシャー情報量（1次元）の2つの表式を述べ、同値であることを示せ。
## 答え
$$I_1(\theta)=E_\theta[U(\theta)^2]=-E_\theta\!\left[\frac{\partial^2}{\partial\theta^2}\log f(X;\theta)\right].$$
## 使用公式・定理
$U=\partial\log f/\partial\theta$ と $\partial f/\partial\theta=U f$ を使い、$\int f=1$ の2回微分で $E[U^2+\partial^2\log f/\partial\theta^2]=0$。
## 計算例
$X\sim N(\mu,\sigma^2)$（$\sigma^2$既知）では $\partial^2\ell/\partial\mu^2=-1/\sigma^2$、$-E[\cdot]=1/\sigma^2$。$E[U^2]$ も $1/\sigma^2$ で一致。
## 一手
第1式はスコアの2乗の期待値、第2式は対数密度の2階微分の負の期待値。計算しやすい方を使う。

<!-- CARD -->

---
id: est-fisher-additivity
title: 独立標本での情報量の加法性
category: math-estimation
subcategory: math-point-estimator-properties
topic: fisher-information
type: theorem
difficulty: 2
priority: S
hashtags:
  - フィッシャー情報量（1次元）
  - 加法性
  - 独立性
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: フィッシャー情報量（1次元）
archive_reason: duplicate
canonical_card: est-fisher-information-def
archive_note: 独立同分布標本でスコアを和にし情報量がn倍になる点を同じ正本へ統合済み。
---
## 問題
独立な観測 $X_1,\ldots,X_n$ が同一分布に従うとき、標本全体のフィッシャー情報量（1次元）はどうなるか。
## 答え
各観測の情報量の和になる：
$$I_n(\theta)=\sum_{i=1}^n I_{X_i}(\theta)=nI_1(\theta).$$
## 使用公式・定理
独立性から対数尤度が和に分解し、スコアの分散が各項の分散の和になる。$E[U]=0$ が各 $i$ で成り立つ。
## 計算例
$\operatorname{Bernoulli}(p)$ 標本なら $I_n(p)=n/[p(1-p)]$。
## 一手
標本全体の情報量＝1観測の情報量×$n$。独立でない場合は共分散の寄与に注意。

<!-- CARD -->

---
id: est-fisher-bernoulli-example
title: ベルヌーイ分布のフィッシャー情報量（1次元）
category: math-estimation
subcategory: math-point-estimator-properties
topic: fisher-info-bernoulli
type: calc_step
difficulty: 2
priority: S
hashtags:
  - フィッシャー情報量（1次元）
  - ベルヌーイ分布
  - 計算
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: フィッシャー情報量（1次元）
archive_reason: duplicate
canonical_card: est-fisher-information-def
archive_note: ベルヌーイ分布でI1(p)=1/[p(1-p)]を二階微分から求める数値例まで正本へ吸収済み。
---
## 問題
$X\sim\operatorname{Bernoulli}(p)$ の1観測当たりのフィッシャー情報量（1次元）を求めよ。
## 答え
$I_1(p)=1/[p(1-p)]$。
## 使用公式・定理
$$\ell(p;x)=x\log p+(1-x)\log(1-p),\qquad \ell''(p;x)=-\frac{x}{p^2}-\frac{1-x}{(1-p)^2}.$$
## 計算例
$$I_1(p)=-E[\ell''(p;X)]=\frac{p}{p^2}+\frac{1-p}{(1-p)^2}=\frac1{p(1-p)}.$$
## 一手
2階微分の負の期待値を取る。分母 $p(1-p)$ は分散 $p(1-p)$ の逆数。

<!-- CARD -->

---
id: est-normal-information-matrix
title: 正規分布の情報行列の導出
category: math-estimation
subcategory: math-point-estimator-properties
topic: fisher-information-matrix
type: calc_step
difficulty: 3
priority: A
hashtags:
  - 情報行列
  - 正規分布
  - 2母数
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: フィッシャー情報量（1次元）
archive_reason: duplicate
canonical_card: est-information-matrix
archive_note: 正規分布の母数(mu,v)に対するフィッシャー情報行列をHessianから導く例を一般情報行列正本へ統合済み。
---
## 問題
正規分布 $X\sim N(\mu,\sigma^2)$、$\theta=(\mu,\sigma^2)$ の情報行列を求めよ。
## 答え
$$I(\theta)=\begin{pmatrix}1/\sigma^2&0\\0&1/(2\sigma^4)\end{pmatrix}.$$
## 使用公式・定理
$$\ell=-\frac12\log(2\pi\sigma^2)-\frac{(x-\mu)^2}{2\sigma^2}.$$
$$\frac{\partial^2\ell}{\partial\mu^2}=-\frac1{\sigma^2},\quad \frac{\partial^2\ell}{\partial\sigma^2\partial\mu}=0,\quad \frac{\partial^2\ell}{\partial(\sigma^2)^2}=\frac1{2\sigma^4}-\frac{(x-\mu)^2}{\sigma^6}.$$
## 計算例
$E[(X-\mu)^2]=\sigma^2$ より $-E[\partial^2\ell/\partial(\sigma^2)^2]=-1/(2\sigma^4)+1/\sigma^4=1/(2\sigma^4)$。非対角は0。
## 一手
$\mu$ と $\sigma^2$ は直交（非対角0）。$\sigma^2$ 成分の期待値には $E[(X-\mu)^2]=\sigma^2$ を代入。

<!-- CARD -->

---
id: est-crlb-poisson-mean-efficiency
title: ポアソン平均のクラーメル・ラオの不等式による下界と有効性を計算する
category: math-estimation
subcategory: math-asymptotic-estimation
topic: crlb-poisson
type: calc_step
difficulty: 3
priority: S
hashtags:
  - クラーメル・ラオの不等式
  - ポアソン分布
  - 有効推定量
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: クラーメル・ラオの不等式
archive_reason: duplicate
canonical_card: est-cramer-rao-lower-bound
coverage_card: asym-asymptotic-relative-efficiency
archive_note: ポアソン平均の有限標本下界と達成例は一般CR正本へ統合し、math-asymptotic-estimationの公式coverageは有限標本下界から漸近効率へつなぐ正本で維持する。
---
## 問題
$X_1,\ldots,X_n\overset{iid}{\sim}\operatorname{Poisson}(\lambda)$ とする。$\lambda$ の不偏推定量の分散下界を求め、$\overline X$ が下界を達成することを示せ。
## 答え
1観測の対数確率質量関数は
$$\ell(\lambda;x)=-\lambda+x\log\lambda-\log(x!),$$
したがって
$$-E\left[\frac{\partial^2\ell}{\partial\lambda^2}\right]
=-E\left[-\frac{X}{\lambda^2}\right]=\frac1\lambda.$$
よって $I_n(\lambda)=n/\lambda$ であり、クラーメル・ラオの不等式による下界は
$$\operatorname{Var}(T)\ge\frac1{I_n(\lambda)}=\frac\lambda n.$$
$E[\overline X]=\lambda$、$\operatorname{Var}(\overline X)=\lambda/n$ なので、$\overline X$ は下界を達成する。
## 使用公式・定理
正則条件の下で、$\lambda$ の任意の不偏推定量 $T$ は
$$\operatorname{Var}(T)\ge\frac1{I_n(\lambda)},\qquad I_n(\lambda)=nI_1(\lambda).$$
## 計算例
$X\sim\operatorname{Poisson}(\lambda)$ の1観測の対数尤度は
$$\ell_1(\lambda;X)=X\log\lambda-\lambda-\log(X!).$$
よって
$$\ell_1''(\lambda)=-\frac X{\lambda^2},
\qquad I_1(\lambda)=-E_\lambda[\ell_1''(\lambda)]
=\frac1\lambda.$$
$n=20,\lambda=4$ なら $I_n(4)=20/4=5$ なので
$$\operatorname{Var}(T)\ge\frac1{I_n(4)}=\frac15=0.2.$$
また $\operatorname{Var}(\overline X)=\lambda/n=4/20=0.2$ だから、$\overline X$ は下界を達成する。
## 一手
情報量を1観測で求め、独立標本なので $n$ 倍してから逆数を取る。
## 注意
下界を達成したと言うには、不偏性と分散の両方を確認する。

<!-- CARD -->

---
id: est-crlb-bernoulli-square
title: ベルヌーイ母数の二乗を推定するときのクラーメル・ラオの不等式による下界を求める
category: math-estimation
subcategory: math-asymptotic-estimation
topic: crlb-function
type: calc_step
difficulty: 3
priority: S
hashtags:
  - クラーメル・ラオの不等式
  - ベルヌーイ分布
  - 母数の関数
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: クラーメル・ラオの不等式
archive_reason: duplicate
canonical_card: est-cramer-rao-lower-bound
coverage_card: asym-asymptotic-relative-efficiency
archive_note: g(p)=p^2の具体例は一般CR正本へ統合し、math-asymptotic-estimationのクラーメル・ラオ公式coverageは同一subcategoryの漸近効率正本で維持する。
---
## 問題
$X_i\overset{iid}{\sim}\operatorname{Bernoulli}(p)$ とする。$p^2$ の不偏推定量 $T$ に対する分散下界を求めよ。
## 答え
$g(p)=p^2$ と置けば $g'(p)=2p$。また
$$I_n(p)=\frac{n}{p(1-p)}.$$
母数の関数に対するクラーメル・ラオの不等式より
$$\operatorname{Var}(T)\ge
\frac{\{g'(p)\}^2}{I_n(p)}
=\frac{4p^2}{n/[p(1-p)]}
=\frac{4p^3(1-p)}n.$$
## 使用公式・定理
$E[T]=g(\theta)$ なら
$$\operatorname{Var}_\theta(T)\ge\frac{\{g'(\theta)\}^2}{I_n(\theta)}.$$
## 計算例
ベルヌーイ1観測の対数尤度は
$$\ell_1(p;X)=X\log p+(1-X)\log(1-p).$$
2回微分して期待値を取ると
$$\ell_1''(p)=-\frac X{p^2}-\frac{1-X}{(1-p)^2},$$
$$I_1(p)=-E_p[\ell_1''(p)]
=\frac p{p^2}+\frac{1-p}{(1-p)^2}
=\frac1{p(1-p)},
\qquad I_n(p)=\frac n{p(1-p)}.$$
推定対象は $g(p)=p^2$ なので $g'(p)=2p$。したがって
$$\operatorname{Var}_p(T)\ge
\frac{(2p)^2}{n/[p(1-p)]}
=\frac{4p^3(1-p)}n.$$
$p=0.4,n=100$ を代入すると
$$\frac{4(0.4)^3(0.6)}{100}
=\frac{0.1536}{100}=0.001536.$$
## 一手
推定対象が $\theta$ そのものか $g(\theta)$ かを最初に判定する。
## 注意
$g'(p)$ を掛け忘れて単に $1/I_n(p)$ としない。

<!-- CARD -->

---
id: est-mse-definition
title: 平均二乗誤差MSEの定義
category: math-estimation
subcategory: math-point-estimator-properties
topic: mse
type: condition
difficulty: 1
priority: S
hashtags:
  - MSE
  - 平均二乗誤差
  - リスク
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 推定量の評価
archive_reason: duplicate
canonical_card: est-bias-variance-tradeoff
archive_note: 平均二乗誤差の定義からMSE=分散+バイアス二乗を展開して導く正本へ統合済み。
---
## 問題
推定量 $T$ の母数 $\theta$ に対する平均二乗誤差 $\operatorname{MSE}_\theta(T)$ を定義せよ。
## 答え
$$\operatorname{MSE}_\theta(T)=E_\theta[(T-\theta)^2].$$
$\theta$ の関数としての損失 $\ell(T,\theta)=(T-\theta)^2$ の期待値（リスク関数）である。
## 使用公式・定理
$$\operatorname{MSE}_\theta(T)=\operatorname{Var}_\theta(T)+\{\operatorname{Bias}_\theta(T)\}^2.$$
## 計算例
$T=\overline X$、$X_i\overset{iid}{\sim}N(\mu,\sigma^2)$ では不偏なので $\operatorname{MSE}=\operatorname{Var}(\overline X)=\sigma^2/n$。
## 一手
平均二乗誤差は「分散＋バイアス²」。不偏推定量では平均二乗誤差＝分散になる。

<!-- CARD -->

---
id: est-relative-efficiency
title: 推定量の相対効率
category: math-estimation
subcategory: math-point-estimator-properties
topic: relative-efficiency
type: condition
difficulty: 2
priority: A
hashtags:
  - 相対効率
  - 分散
  - 比較
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 推定量の相対効率
archive_reason: duplicate
canonical_card: est-estimator-comparison
archive_note: 不偏推定量同士の相対効率と、有偏推定量を含む場合のMSE比較を同じ推定量比較正本へ統合済み。
---
## 問題
2つの不偏推定量 $T_1,T_2$ の相対効率をどう定義するか。
## 答え
基準 $T_1$ を分母に取る分散の比で定義する：
$\operatorname{eff}(T_1,T_2)=\frac{\operatorname{Var}_\theta(T_2)}{\operatorname{Var}_\theta(T_1)}.$
値が $>1$ なら分母 $T_1$ の分散が小さく、$T_1$ が優れる。分散が小さい方を「より効率的」という。
## 使用公式・定理
不偏推定量では分散が小さく平均二乗誤差が小さい。バイアスがある場合は平均二乗誤差で比較する。
## 計算例
$T_1=\overline X$、$T_2=X_1$（正規標本から $\mu$）で $\operatorname{Var}(T_1)=\sigma^2/n<\sigma^2=\operatorname{Var}(T_2)$。$\operatorname{eff}(T_1,T_2)=n>1$。
## 一手
相対効率は「不偏なら分散の逆比」。2つの推定量の良さ比較の指標。
