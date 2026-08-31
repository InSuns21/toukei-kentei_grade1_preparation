---
id: prob-bayes-diagnostic
title: 診断結果からベイズの定理で逆確率を求める
category: math-probability
subcategory: math-events
topic: bayes-theorem
type: strategy
difficulty: 2
priority: S
hashtags:
  - ベイズの定理
  - 条件付き確率
  - 計算の一手
frequency:
  past_exam: 1
  textbook: 0
  independent_problems: 0
  source_confirmations: 1
sources:
  - type: official_syllabus
    topic: ベイズの定理
  - type: past_exam
    id: MATH-2021-Q2
    topic: 事後確率最大化
archive_reason: duplicate
canonical_card: bayes-density-formula
coverage_card: bayes-density-formula
archive_note: Bayes正本へ罹患率0.01、感度0.9、偽陽性率0.05の診断検査例を統合済み。P(+)=0.0585、P(D|+)=2/13≈0.154を全確率から導き、感度と陽性後確率の条件の向きも区別しているため旧単発カードは不要。
---
## 問題
罹患率が $0.01$、感度が $0.9$、偽陽性率が $0.05$ である。陽性者が罹患している確率は？
## 方針
陽性の全確率を分母に置く。
## 使用公式・定理
$$P(D\mid +)=\frac{P(+\mid D)P(D)}{P(+\mid D)P(D)+P(+\mid D^c)P(D^c)}.$$
## なぜ？
求める向き $P(D\mid +)$ と与えられた向き $P(+\mid D)$ が逆だからである。
## 計算例
$D=$罹患、$+=$陽性と置く。公式へ代入すると
$$\begin{aligned}P(D\mid +)&=\frac{0.9\cdot0.01}{0.9\cdot0.01+0.05\cdot0.99}\\&=\frac{0.009}{0.0585}\\&=\frac{2}{13}\\&\approx0.154.\end{aligned}$$
## 重要な一手
分母には罹患者と非罹患者の両方から生じる陽性を足す。
## 注意
感度 $0.9$ をそのまま答えにしない。

<!-- CARD -->

---
id: dist-gamma-recognition
title: ガンマ型積分を正規化定数へ結び付ける
category: math-distributions
subcategory: math-continuous-distributions
topic: gamma-integral
type: recognition
difficulty: 2
priority: A
hashtags:
  - ガンマ分布
  - 積分
  - 形の認識
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 連続分布
archive_reason: duplicate
canonical_card: dist-gamma-moments-by-definition
coverage_card: dist-gamma-moments-by-definition
archive_note: Gamma分布の定義積分正本が一般に ∫_0^∞ x^(c-1)e^(-βx)dx=Γ(c)/β^c
  をu=βxで導出し、その先の1次・2次モーメントまで扱う。旧カードのa,b表記のGamma型積分は完全に包含される。
---
## 問題
$a,b>0$ のとき $\int_0^\infty x^{a-1}e^{-bx}\,dx$ を評価せよ。
## 答え
$u=bx$ と置いてガンマ関数へ寄せる。
## 使用公式・定理
$$\Gamma(a)=\int_0^\infty u^{a-1}e^{-u}\,du,\qquad a>0.$$
## 計算例
$u=bx$ とすると $x=u/b$, $dx=du/b$ だから
$$\begin{aligned}\int_0^\infty x^{a-1}e^{-bx}\,dx&=\int_0^\infty(u/b)^{a-1}e^{-u}\frac{du}{b}\\&=b^{-a}\int_0^\infty u^{a-1}e^{-u}\,du\\&=\frac{\Gamma(a)}{b^a}.\end{aligned}$$
## 重要な一手
$x^{a-1}e^{-bx}$ を見たら shape-rate のGamma型と認識する。
## 注意
$b^{-a}$ を落とさない。

<!-- CARD -->

---
id: dist-clt-standardize
title: 標本平均を中心極限定理で標準化する
category: math-probability
subcategory: math-limit-approximations
topic: central-limit-theorem
type: strategy
difficulty: 2
priority: S
hashtags:
  - 中心極限定理
  - 標準化
  - 漸近分布
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 中心極限定理
archive_reason: duplicate
canonical_card: dist-clt-sample-mean
coverage_card: dist-clt-sample-mean
archive_note: 中心極限定理正本が旧カードと同じE[X_i]=10、Var(X_i)=4、n=100を使い、標準誤差2/√100=0.2と標準化を明示したうえで標本平均の区間確率と標本和まで扱う。P(Xbar>10.4)のz=2は正本の同一計算に含まれる。
---
## 問題
独立同分布な $X_i$ が $E[X_i]=10$, $\operatorname{Var}(X_i)=4$ を満たす。$n=100$ で $P(\overline X>10.4)$ を近似せよ。
## 方針
有限分散を確認し、中心化・標準化して標準正規分布へ接続する。
## 使用公式・定理
独立同分布で平均 $\mu$、有限な正の分散 $\sigma^2$ があれば
$$\frac{\sqrt n(\overline X-\mu)}{\sigma}\xrightarrow{d}N(0,1).$$
## 計算例
標準誤差は $2/\sqrt{100}=0.2$ なので
$$\begin{aligned}P(\overline X>10.4)&\approx P\left(Z>\frac{10.4-10}{0.2}\right)\\&=P(Z>2).\end{aligned}$$
## 重要な一手
標準誤差は $\sigma/\sqrt n=0.2$ である。
## 注意
母分散を $n$ で割り、標準偏差を $n$ で割らない。

<!-- CARD -->

---
id: est-factorization
title: ネイマンの分解定理で一様分布の十分統計量を見抜く
category: math-estimation
subcategory: math-population-sample-statistic
topic: factorization-theorem
type: theorem
difficulty: 2
priority: S
hashtags:
  - 十分統計量
  - ネイマンの分解定理
  - 一様分布
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ネイマンの分解定理
archive_reason: duplicate
canonical_card: neyman-factorization
coverage_card: neyman-factorization
archive_note: ネイマン分解定理正本へU(0,θ)の完全な因子分解を統合済み。L(θ;x)=θ^(-n)1{x_(n)≤θ}1{x_(1)≥0}
  と分解し、θ依存の台をh(x)側へ移せない理由からT=X_(n)が十分統計量と導くため、旧カードの論点を完全に回収した。
---
## 問題
$X_1,\ldots,X_n$ は一様分布 $U(0,\theta)$ からの独立同分布標本とする。ただし $\theta>0$、確率密度関数は $f_\theta(x)=\theta^{-1}\boldsymbol{1}_{\{0\le x\le\theta\}}$ である。ネイマンの分解定理を使い、$\theta$ の十分統計量を求めよ。
## 答え
$T=X_{(n)}=\max_iX_i$ が $\theta$ の十分統計量である。
## 使用公式・定理
ネイマンの分解定理：$L(\theta;x)=g_\theta(T(x))h(x)$ と書ければ $T$ は $\theta$ の十分統計量である。
## 計算例
$$L(\theta;x)=\prod_{i=1}^n\frac1\theta\boldsymbol{1}_{\{0\le x_i\le\theta\}}$$
$$=\underbrace{\theta^{-n}\boldsymbol{1}_{\{x_{(n)}\le\theta\}}}_{g_\theta(x_{(n)})}
\underbrace{\boldsymbol{1}_{\{x_{(1)}\ge0\}}}_{h(x)}.$$
$h(x)$ は $\theta$ に依存しないので、ネイマンの分解定理から $T=X_{(n)}=\max_iX_i$ は十分統計量である。
## 条件
台の上端が $\theta$ に依存するため、$\boldsymbol{1}_{\{x_{(n)}\le\theta\}}$ を $h(x)$ 側へ移してはいけない。

<!-- CARD -->

---
id: test-np-bernoulli
title: Neyman--Pearson補題で棄却方向を決める
category: math-testing
subcategory: math-test-derivation
topic: neyman-pearson
type: strategy
difficulty: 3
priority: S
hashtags:
  - ネイマン・ピアソンの基本定理
  - 検定
  - 尤度比
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: Neyman--Pearsonの補題
archive_reason: duplicate
canonical_card: test-ump-binomial-one-sided
coverage_card: test-ump-binomial-one-sided
archive_note: 二項片側検定正本へ単純仮説p0対p1>p0の尤度比R(x)と R(x+1)/R(x)=p1(1-p0)/[p0(1-p1)]>1
  を追加済み。大きいXで棄却するNeyman–Pearsonの方向から複合片側の一様最強力検定まで一続きに扱うため旧単発カードは不要。
---
## 問題
$X$ は二項分布 $\operatorname{Binomial}(n,p)$ に従うとする。ただし $X\in\{0,\ldots,n\}$、$P(X=x)=\binom nxp^x(1-p)^{n-x}$ である。$H_0:p=p_0$ 対 $H_1:p=p_1$（$0<p_0<p_1<1$）の最強力検定の棄却方向は？
## 方針
尤度比が $X$ の単調増加関数かを調べる。
## 使用公式・定理
Neyman--Pearson補題：単純仮説同士では $L(p_1;x)/L(p_0;x)$ が大きい標本点から棄却域へ入れる。
## 計算例
$$\frac{L(p_1;X)}{L(p_0;X)}=\left(\frac{p_1}{p_0}\right)^X\left(\frac{1-p_1}{1-p_0}\right)^{n-X}.$$
尤度比を $R(x)$ とすると
$$\frac{R(x+1)}{R(x)}=\frac{p_1(1-p_0)}{p_0(1-p_1)}>1.$$
よって $R(x)$ は $x$ とともに増え、$X$ が大きいとき棄却する。
## 重要な一手
有意水準を満たす臨界値は $H_0$ 下で決める。厳密なサイズが必要なら臨界点で無作為化する場合がある。

<!-- CARD -->

---
id: test-sign-test
title: 符号検定を二項分布へ帰着する
category: math-testing
subcategory: math-various-tests
topic: sign-test
type: recognition
difficulty: 2
priority: A
hashtags:
  - ノンパラメトリック
  - 符号検定
  - 二項分布
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ノンパラメトリック法
archive_reason: duplicate
canonical_card: np-sign-median-ci
coverage_card: np-sign-median-ci
archive_note: 符号検定正本を拡張し、連続分布の中央値m0の下でS=#{X_i>m0}~Binomial(n,1/2)、n=10でP(S=10)=2^-10を明示した。さらに同値除外と検定反転による中央値信頼区間まで扱うため旧カードを完全に包含する。
---
## 問題
連続な共通分布からの独立同分布標本 $X_1,\ldots,X_{10}$ について、中央値が $m_0$ かを符号だけで検定する。$m_0$ より大きい個数 $S$ の帰無分布は？
## 答え
同値を除けば各符号は成功確率 $1/2$ のベルヌーイ試行である。
## 使用公式・定理
連続分布で中央値が $m_0$ なら $P(X_i>m_0)=1/2$。独立標本の正符号数は
$$S=\sum_{i=1}^n\boldsymbol{1}_{\{X_i>m_0\}}\sim\operatorname{Binomial}(n,1/2).$$
## 計算例
$$S\sim\operatorname{Binomial}(10,1/2),\qquad P(S=10)=2^{-10}.$$
## 注意
$X_i=m_0$ の同値は通常除外し、有効標本数を数え直す。
