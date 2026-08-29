---
id: ci-coverage-probability
title: 被覆確率と信頼係数の定義
category: math-estimation
subcategory: math-interval-estimation
topic: coverage-probability
type: formula
difficulty: 2
priority: S
hashtags: [被覆確率, 信頼係数, 区間推定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 区間推定 }]
---

## 問題
信頼区間の「被覆確率（coverage probability）」と「信頼係数」を定義せよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$C(\theta)=P_\theta\bigl(L(X)\le \theta\le U(X)\bigr),\qquad \inf_{\theta\in\Theta}C(\theta)\ge1-\alpha.$$

## 答え
標本から作る区間推定量 $I(X)=[L(X),U(X)]$ に対し、$C(\theta)=P_\theta\{\theta\in I(X)\}$ を被覆確率という。$C(\theta)=1-\alpha$ がすべての $\theta$ で成り立つ区間は、信頼係数 $1-\alpha$ の正確な信頼区間である。一般には $\inf_{\theta\in\Theta}C(\theta)$ を信頼係数と呼ぶ。

## 計算例
信頼係数 $0.95$ なら、同じ手順で繰り返し区間を作ると約 $95\%$ が真値を覆う。

## 注意
頻度主義では $\theta$ は固定され、確率を担うのは区間の方である。「$\theta$ が区間に入る確率」は誤り。

<!-- CARD -->

---
id: ci-coverage-frequentist
title: 被覆確率の頻度主義的妥当性を確認する
category: math-estimation
subcategory: math-interval-estimation
topic: coverage-interpretation
type: recognition
difficulty: 2
priority: S
hashtags: [被覆確率, 頻度主義, 区間推定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 区間推定 }]
---

## 問題
「信頼係数 $0.95$ の区間に真値が入る確率は $0.95$」という言い方の誤りを指摘し、正しい解釈を述べよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

固定された $\theta$ に対し $P_\theta(\theta\in I(X))=1-\alpha$。得られた区間は実現値であり確率変数ではない。

## 答え
信頼係数は「手順」の性質であり、得られた一つの区間についての確率ではない。

## 計算例
$100$ 回同じ実験を繰り返して区間を作れば、被覆確率 $0.95$ なら約 $95$ 個が真値を含む。

## 注意
ベイズの信用区間（credible interval）とは意味が異なる。

<!-- CARD -->

---
id: ci-pivot-definition
title: ピボット量（pivotal quantity）の定義
category: math-estimation
subcategory: math-interval-estimation
topic: pivot-definition
type: formula
difficulty: 3
priority: A
hashtags: [ピボット量, 区間推定, 信頼区間の構成]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 区間推定 }]
---

## 問題
ピボット量とは何か。定義を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$Q(X,\theta)$ の分布が $\theta$ によらず一定。これを用いて $P(a\le Q\le b)=1-\alpha$ を $\theta$ について解き区間を得る。

## 答え
標本 $X$ と未知パラメータ $\theta$ の関数 $Q(X,\theta)$ のうち、その分布が未知パラメータに依存しないものをいう。

## 計算例
正規平均 $\mu$ で $\sigma$ 既知なら $Q=(\overline X-\mu)/(\sigma/\sqrt n)\sim N(0,1)$ がピボット量。

## 注意
ピボット量は推定量（分布が $\theta$ に依存しうる）とは異なる。

<!-- CARD -->

---
id: ci-pivot-construction
title: ピボット量から信頼区間を構成する手順
category: math-estimation
subcategory: math-interval-estimation
topic: pivot-construction
type: proof_step
difficulty: 3
priority: A
hashtags: [ピボット量, 信頼区間の構成, 区間推定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 区間推定 }]
---

## 問題
ピボット量 $Q(X,\theta)$ から、いかにして信頼係数 $1-\alpha$ の区間を得るか手順を述べよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$P(a\le Q(X,\theta)\le b)=1-\alpha$ を $\theta$ について同値変形し、$\theta$ を含む区間として表す。

## 答え
分位点 $a,b$ を $P(a\le Q\le b)=1-\alpha$ に選び、不等式 $a\le Q(X,\theta)\le b$ を $\theta$ について解く。

## 計算例
$Q=(\overline X-\mu)/(\sigma/\sqrt n)$ で $a=-z_{\alpha/2},b=z_{\alpha/2}$ とすると
$$-z_{\alpha/2}\le\frac{\overline X-\mu}{\sigma/\sqrt n}\le z_{\alpha/2}.$$
$\sigma/\sqrt n>0$ を掛け、全辺から $\overline X$ を引いて符号を反転すると
$$\overline X-z_{\alpha/2}\frac{\sigma}{\sqrt n}
\le\mu\le
\overline X+z_{\alpha/2}\frac{\sigma}{\sqrt n}.$$

## 注意
$Q$ が $\theta$ について単調でないと区間が非連結になることがある。

<!-- CARD -->

---
id: ci-normal-mean-known
title: 正規平均・分散既知の信頼区間
category: math-estimation
subcategory: math-interval-estimation
topic: normal-mean-known-variance
type: formula
difficulty: 2
priority: S
hashtags: [信頼区間, 正規分布, 母平均]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 区間推定 }]
---

## 問題
独立同分布標本 $X_1,\ldots,X_n$ が正規分布 $N(\mu,\sigma^2)$ に従い、$\sigma^2$ 既知とする。$\mu$ の信頼係数 $1-\alpha$ の信頼区間を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$\dfrac{\overline X-\mu}{\sigma/\sqrt n}\sim N(0,1)$ をピボット量とする。$z_{\alpha/2}$ は標準正規分布の上側 $\alpha/2$ 点。

## 答え
$$\left[\overline X-z_{\alpha/2}\frac{\sigma}{\sqrt n},\ \overline X+z_{\alpha/2}\frac{\sigma}{\sqrt n}\right].$$

## 計算例
標準誤差は $\sigma/\sqrt n$；信頼係数 $0.95$ なら $z_{0.025}=1.96$ をかける。

## 注意
$\sigma$ 未知なら $t$ 区間へ切り替える。

<!-- CARD -->

---
id: ci-t-interval-pivot
title: t区間のピボット構成と正規性依存
category: math-estimation
subcategory: math-interval-estimation
topic: t-interval-pivot
type: proof_step
difficulty: 3
priority: S
hashtags: [t区間, ピボット量, 正規性]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 区間推定 }]
---

## 問題
独立同分布標本が正規分布 $N(\mu,\sigma^2)$ に従い、$\sigma$ 未知のとき、$\mu$ の信頼区間を与える統計量が $t$ 分布に従うことを示し、正規性仮定の役割を述べよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$Z=(\overline X-\mu)/(\sigma/\sqrt n)\sim N(0,1)$ と
$$V=\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1}$$
は正規標本では独立である。したがってt分布の定義から
$$\frac{Z}{\sqrt{V/(n-1)}}
=\frac{(\overline X-\mu)/(\sigma/\sqrt n)}{S/\sigma}
=\frac{\overline X-\mu}{S/\sqrt n}\sim t_{n-1}.$$

## 答え
$T=(\overline X-\mu)/(S/\sqrt n)\sim t_{n-1}$ がピボット量となる。この分布形は母集団が正規であることから導かれる。

## 計算例
区間は $\overline X\pm t_{n-1,\alpha/2}\,S/\sqrt n$。

## 注意
母集団が非正規なら $T$ の $t$ 分布は近似であり、小標本では覆率が崩れる。

<!-- CARD -->

---
id: ci-t-vs-z
title: 既知分散と未知分散の区間の違いを比較する
category: math-estimation
subcategory: math-interval-estimation
topic: t-vs-z
type: recognition
difficulty: 2
priority: S
hashtags: [t区間, z区間, 比較]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 区間推定 }]
---

## 問題
分散既知（z区間）と未知（t区間）の母平均信頼区間の違いを述べよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

既知：$\overline X\pm z_{\alpha/2}\sigma/\sqrt n$。未知：$\overline X\pm t_{n-1,\alpha/2}S/\sqrt n$。

## 答え
既知なら標準誤差 $\sigma/\sqrt n$ に $z_{\alpha/2}$ をかけ、未知なら不偏分散 $S$ で推定して $t_{n-1,\alpha/2}$ を用いる。

## 計算例
$n$ が大きいと $t_{n-1,\alpha/2}\approx z_{\alpha/2}$ となり両者は近づく。

## 注意
同じ標準誤差の数値を用いるなら $t_{n-1,\alpha/2}>z_{\alpha/2}$ なので $t$ 区間の半幅が大きい。ただし実際には $S$ と $\sigma$ も異なるため、得られた個々の区間幅を無条件には比較できない。

<!-- CARD -->

---
id: ci-variance-chi-derivation
title: 正規分散のカイ二乗区間の構成（非対称性）
category: math-estimation
subcategory: math-interval-estimation
topic: variance-chi-derivation
type: proof_step
difficulty: 3
priority: S
hashtags: [カイ二乗区間, 母分散, 非対称]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 区間推定 }]
---

## 問題
正規標本の不偏分散 $S^2$ から $\sigma^2$ の信頼区間を導け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

ここで $\chi^2_{\nu,\gamma}$ は上側確率が $\gamma$ となる点、すなわち $P(\chi^2_\nu\ge\chi^2_{\nu,\gamma})=\gamma$ とする。この記法で
$$P\left(\chi^2_{n-1,1-\alpha/2}\le\frac{(n-1)S^2}{\sigma^2}\le\chi^2_{n-1,\alpha/2}\right)=1-\alpha,$$
$A=(n-1)S^2>0$、$c_L=\chi^2_{n-1,1-\alpha/2}$、$c_U=\chi^2_{n-1,\alpha/2}$ と置く。$0<c_L<c_U$ なので
$$c_L\le\frac{A}{\sigma^2}\le c_U
\quad\Longleftrightarrow\quad
\frac{A}{c_U}\le\sigma^2\le\frac{A}{c_L}.$$
よって区間は
$$\left[\frac{(n-1)S^2}{\chi^2_{n-1,\alpha/2}},\ 
\frac{(n-1)S^2}{\chi^2_{n-1,1-\alpha/2}}\right].$$

## 答え
ピボット量 $(n-1)S^2/\sigma^2\sim\chi^2_{n-1}$ を用い、両側の分位点が異なる区間を作る。

## 計算例
$\chi^2$ は右に裾が長いので、上側端点は下側分位点 $\chi^2_{n-1,1-\alpha/2}$ で割る。

## 注意
対称な正規に比べ区間が非対称になる。

<!-- CARD -->

---
id: ci-f-variance-ratio
title: 2正規母分散比のF区間
category: math-estimation
subcategory: math-interval-estimation
topic: f-variance-ratio
type: formula
difficulty: 3
priority: S
hashtags: [F分布, 分散比, 信頼区間]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 区間推定 }]
---

## 問題
独立な2つの正規分布 $N(\mu_1,\sigma_1^2)$、$N(\mu_2,\sigma_2^2)$ からの標本で、$\sigma_1^2/\sigma_2^2$ の信頼区間を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$F_{\nu_1,\nu_2,\gamma}$ を上側確率が $\gamma$ となる点とすると、区間は
$$F_{\nu_1,\nu_2,1-\alpha/2}
\le
\frac{S_1^2/S_2^2}{\sigma_1^2/\sigma_2^2}
\le F_{\nu_1,\nu_2,\alpha/2}.$$
$R=S_1^2/S_2^2$、$\rho=\sigma_1^2/\sigma_2^2$ と置き、正数の不等式を $\rho$ について解くと
$$\frac{R}{F_{\nu_1,\nu_2,\alpha/2}}
\le\rho\le
\frac{R}{F_{\nu_1,\nu_2,1-\alpha/2}}.$$
したがって区間は
$$\left[\frac{S_1^2/S_2^2}{F_{n_1-1,n_2-1,\alpha/2}},\ \frac{S_1^2/S_2^2}{F_{n_1-1,n_2-1,1-\alpha/2}}\right].$$

## 答え
ピボット量 $(S_1^2/\sigma_1^2)/(S_2^2/\sigma_2^2)\sim F_{n_1-1,n_2-1}$ を用い、比 $S_1^2/S_2^2$ を両側のF分位点で割る。

## 計算例
$F_{n_1-1,n_2-1,1-\alpha/2}=1/F_{n_2-1,n_1-1,\alpha/2}$ で計算できる。

## 注意
分散比は非対称なので両側でも分位点の向きが異なる。

<!-- CARD -->

---
id: ci-two-sample-mean-diff
title: 2標本平均差の区間推定（等分散）
category: math-estimation
subcategory: math-interval-estimation
topic: two-sample-mean-diff
type: formula
difficulty: 3
priority: S
hashtags: [2標本, 平均差, 信頼区間]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 区間推定 }]
---

## 問題
独立な2つの正規分布 $N(\mu_1,\sigma^2)$、$N(\mu_2,\sigma^2)$ からの標本で、母分散が等しい（$\sigma^2$ 未知）とき、$\mu_1-\mu_2$ の信頼区間を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$(\overline X-\overline Y)\pm t_{n_1+n_2-2,\alpha/2}\,S_p\sqrt{\frac1{n_1}+\frac1{n_2}},$$
$$S_p^2=\frac{(n_1-1)S_1^2+(n_2-1)S_2^2}{n_1+n_2-2}.$$

## 答え
プールした不偏分散 $S_p^2$ を用い、自由度 $n_1+n_2-2$ の $t$ 区間を作る。

## 計算例
結合分散は「重み付き平均」であり自由度で割る。

## 注意
等分散の仮定が外れると Welch 型へ。

<!-- CARD -->

---
id: ci-welch-interval
title: Welch型区間推定（不等分散）
category: math-estimation
subcategory: math-interval-estimation
topic: welch-interval
type: formula
difficulty: 3
priority: A
hashtags: [Welch, 不等分散, 信頼区間]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 区間推定 }]
---

## 問題
独立な2つの正規分布 $N(\mu_1,\sigma_1^2)$、$N(\mu_2,\sigma_2^2)$ からの標本で、母分散が等しくないとき、$\mu_1-\mu_2$ の信頼区間を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$(\overline X-\overline Y)\pm t_{\nu,\alpha/2}\sqrt{\frac{S_1^2}{n_1}+\frac{S_2^2}{n_2}},$$
$$\nu=\frac{\left(\dfrac{S_1^2}{n_1}+\dfrac{S_2^2}{n_2}\right)^2}{\dfrac{(S_1^2/n_1)^2}{n_1-1}+\dfrac{(S_2^2/n_2)^2}{n_2-1}}.$$

## 答え
結合分散を使わず、各不偏分散を用い、Satterthwaite の近似自由度 $\nu$ の $t$ 区間を作る。

## 計算例
$\nu$ は整数でなくてよい；$n_1+n_2-2$ 以下になりやすい。

## 注意
検定の Welch と同じ近似自由度を使う。

<!-- CARD -->

---
id: ci-proportion
title: 母比率の正規近似区間
category: math-estimation
subcategory: math-interval-estimation
topic: proportion-ci
type: formula
difficulty: 2
priority: S
hashtags: [母比率, 正規近似, 信頼区間]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 区間推定 }]
---

## 問題
ベルヌーイ標本から母比率 $p$ の信頼区間を書け。

## 記号・用語
- $\xrightarrow{d}$：分布収束

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$\sqrt n(\widehat p-p)\xrightarrow{d}N(0,p(1-p));\quad \widehat p\pm z_{\alpha/2}\sqrt{\frac{\widehat p(1-\widehat p)}{n}}.$$

## 答え
標本比率 $\widehat p$ の漸近正規性を用い、$\widehat p\pm z_{\alpha/2}\sqrt{\widehat p(1-\widehat p)/n}$ とする。

## 計算例
$n$ が十分大ならば近似が良い；境目では連続修正を検討する。

## 注意
$p$ が $0$ または $1$ に近いと近似が悪い。

<!-- CARD -->

---
id: ci-proportion-diff
title: 母比率差の区間推定
category: math-estimation
subcategory: math-interval-estimation
topic: proportion-diff-ci
type: formula
difficulty: 3
priority: A
hashtags: [母比率差, 信頼区間, 正規近似]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 区間推定 }]
---

## 問題
独立な2群の母比率 $p_1,p_2$ の差の信頼区間を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$(\widehat p_1-\widehat p_2)\pm z_{\alpha/2}\sqrt{\frac{\widehat p_1(1-\widehat p_1)}{n_1}+\frac{\widehat p_2(1-\widehat p_2)}{n_2}}.$$

## 答え
$\widehat p_1-\widehat p_2$ は漸近正規で、分散 $p_1(1-p_1)/n_1+p_2(1-p_2)/n_2$ を標本で推定して区間を作る。

## 計算例
群内の比率で分散を個別に推定する（プールしない）。

## 注意
差の検定でプールするのとは標準誤差の扱いが異なる。

<!-- CARD -->

---
id: ci-one-sided
title: 片側信頼区間の定義と構成
category: math-estimation
subcategory: math-interval-estimation
topic: one-sided-ci
type: formula
difficulty: 2
priority: S
hashtags: [片側信頼区間, 信頼係数, 区間推定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 区間推定 }]
---

## 問題
片側信頼区間（上側・下側）を定義し、正規平均既知分散での形を示せ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

下側：$P(\theta\ge \overline X-z_{\alpha}\sigma/\sqrt n)=1-\alpha$。上側：$P(\theta\le \overline X+z_{\alpha}\sigma/\sqrt n)=1-\alpha$。

## 答え
下側は $[\theta_L,\infty)$、上側は $(-\infty,\theta_U]$ の形。両側の一方の分位点だけを用いる。

## 計算例
$z_{\alpha}$ は上側 $\alpha$ 点（$0.05$ なら $z_{0.05}=1.645$）。

## 注意
両側 $1-\alpha$ と片側 $1-\alpha$ では分位点の $\alpha/2$ と $\alpha$ の違いに注意。

<!-- CARD -->

---
id: ci-test-duality
title: 信頼区間と検定の双対性
category: math-estimation
subcategory: math-interval-estimation
topic: ci-test-duality
type: recognition
difficulty: 3
priority: S
hashtags: [双対性, 信頼区間, 仮説検定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 区間推定 }]
---

## 問題
信頼区間と仮説検定の双対性を述べよ。

## 記号・用語
- 棄却域：帰無仮説を棄却する統計量・標本結果の集合

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$CI_{1-\alpha}(x)=\{\theta_0: \text{観測 }x\text{ で }H_0:\theta=\theta_0\text{ を棄却しない}\}.$$

## 答え
水準 $\alpha$ の検定で棄却されない $\theta$ の集合が、ちょうど信頼係数 $1-\alpha$ の信頼区間になる。

## 計算例
棄却域の補集合（受容域）が $1-\alpha$ 区間に対応する。

## 注意
双対性が成り立つのは「受容域が連結で両側・片側と対応」する標準的な場合。

<!-- CARD -->

---
id: ci-duality-acceptance
title: 受容域が信頼区間になることを確認する
category: math-estimation
subcategory: math-interval-estimation
topic: duality-acceptance
type: proof_step
difficulty: 3
priority: S
hashtags: [双対性, 受容域, 区間推定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 区間推定 }]
---

## 問題
両側 $z$ 検定の受容域が、正規平均既知分散の信頼区間と一致することを示せ。

## 記号・用語
- 棄却域：帰無仮説を棄却する統計量・標本結果の集合

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

受容域 $\{|\overline x-\mu|\le z_{\alpha/2}\sigma/\sqrt n\}$ を $\mu$ に関して書くと $\mu\in[\overline x\pm z_{\alpha/2}\sigma/\sqrt n]$。

## 答え
$|z|=|\overline x-\mu|/(\sigma/\sqrt n)\le z_{\alpha/2}$ を $\mu$ について解くと、ちょうど両側区間になる。

## 計算例
検定で棄却しない $\mu$ は、区間内の $\mu$ と一致する。

## 注意
検定と区間は同じ統計量・同じ片側または両側の棄却域を使って反転する。異なる検定を反転すれば異なる信頼集合になる。

<!-- CARD -->

---
id: ci-asymptotic-def
title: 漸近信頼区間の定義
category: math-estimation
subcategory: math-interval-estimation
topic: asymptotic-ci-def
type: formula
difficulty: 3
priority: S
hashtags: [漸近信頼区間, 区間推定, 大標本]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 区間推定 }]
---

## 問題
漸近信頼区間とは何か。定義を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$\lim_{n\to\infty}P_\theta(\theta\in I_n)=1-\alpha$ となる $I_n$ を漸近 $1-\alpha$ 信頼区間という。

## 答え
標本サイズ $n\to\infty$ で被覆確率が $1-\alpha$ に近づく区間をいう。有限標本では近似的に成り立つ。

## 計算例
正規近似や最尤推定量の漸近正規性に基づく区間が典型例。

## 注意
有限 $n$ では被覆確率が $1-\alpha$ からずれることがある。

<!-- CARD -->

---
id: ci-asymptotic-mle
title: 最尤推定量に基づく漸近信頼区間
category: math-estimation
subcategory: math-interval-estimation
topic: asymptotic-mle-ci
type: formula
difficulty: 3
priority: S
hashtags: [最尤推定, 漸近正規性, 信頼区間]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 最尤推定量の漸近正規性 }]
---

## 問題
正則条件の下で、最尤推定量 $\widehat\theta$ から $\theta$ の漸近信頼区間を書け。

## 記号・用語
- $\xrightarrow{d}$：分布収束

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$\widehat\theta\pm z_{\alpha/2}\,\frac{1}{\sqrt{n\,I_1(\widehat\theta)}},$$
または対数尤度のヘッセ行列から標準誤差を推定する。

## 答え
$\sqrt n(\widehat\theta-\theta)\xrightarrow{d}N(0,I_1(\theta)^{-1})$ より、情報量の逆数を分散として $z$ 区間を作る。

## 計算例
ベルヌーイなら $I_1(p)=1/\{p(1-p)\}$ で既知の比率区間と一致する。

## 注意
情報量は真値の関数なので、標本で $\widehat\theta$ に置き換える（Plug-in）。

<!-- CARD -->

---
id: ci-delta-method
title: デルタ法による信頼区間
category: math-estimation
subcategory: math-interval-estimation
topic: delta-method-ci
type: formula
difficulty: 3
priority: S
hashtags: [デルタ法, 信頼区間, 変数変換]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: デルタ法 }]
---

## 問題
$\sqrt n(T_n-\theta)$ が正規分布 $N(0,\sigma^2)$ へ分布収束するとする。$\eta=g(\theta)$ の信頼区間をデルタ法で書け。

## 記号・用語
- $\xrightarrow{d}$：分布収束

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$g(T_n)\pm z_{\alpha/2}\,|g'(T_n)|\,\frac{\widehat\sigma}{\sqrt n}.$$

## 答え
$g$ が微分可能なら $\sqrt n(g(T_n)-g(\theta))\xrightarrow{d}N(0,g'(\theta)^2\sigma^2)$ を用い、$g(T_n)$ 中心の $z$ 区間を作る。

## 計算例
$g(x)=e^x$ なら $|g'(T_n)|=e^{T_n}$；$g(x)=\sqrt x$ なら $1/(2\sqrt{T_n})$（$\theta>0$）。

## 注意
区間の端点を $g$ で変換する方法と、分散を伝播させる方法があり、非線形で差が出る。

<!-- CARD -->

---
id: ci-length-confidence-tradeoff
title: 信頼係数と区間幅のトレードオフ
category: math-estimation
subcategory: math-interval-estimation
topic: length-confidence-tradeoff
type: recognition
difficulty: 2
priority: S
hashtags: [区間幅, 信頼係数, トレードオフ]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 区間推定 }]
---

## 問題
信頼係数を上げると区間幅はどうなるか。理由を述べよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

半幅 $\propto z_{\alpha/2}$。$z_{0.05}=1.645$、$z_{0.025}=1.96$ のように $\alpha$ 減少で増大。

## 答え
信頼係数を大きくする（$\alpha$ を小さくする）と、分位点 $z_{\alpha/2}$ が大きくなり区間は広くなる。

## 計算例
$0.90$ 区間より $0.95$ 区間の方が広い。

## 注意
精度（狭さ）と信頼（被覆）はトレードオフの関係。

<!-- CARD -->

---
id: ci-sample-size-for-width
title: 目標幅から必要標本サイズを決める
category: math-estimation
subcategory: math-interval-estimation
topic: sample-size-for-width
type: calc_step
difficulty: 3
priority: S
hashtags: [標本サイズ, 区間幅, 区間推定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 区間推定 }]
---

## 問題
正規平均・分散既知で、半幅を $E$ 以下にしたい。必要な $n$ を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$$n=\left\lceil\left(\frac{z_{\alpha/2}\,\sigma}{E}\right)^2\right\rceil.$$

## 答え
$z_{\alpha/2}\,\sigma/\sqrt n\le E$ を解き、$n\ge (z_{\alpha/2}\sigma/E)^2$ とする（切り上げ）。

## 計算例
$\sigma=2,z_{0.025}=1.96,E=0.5$ なら $n\ge(3.92/0.5)^2=(7.84)^2=61.5$ で $n=62$。

## 注意
$\sigma$ 未知なら事前見積もりか保存的値を用いる。

<!-- CARD -->

---
id: ci-poisson-rate-exact
title: ポアソン率の正確信頼区間をカイ二乗分位点で作る
category: math-estimation
subcategory: math-interval-estimation
topic: exact-poisson-rate-confidence-interval
type: calc_step
difficulty: 4
priority: S
hashtags: [ポアソン分布, 正確信頼区間, カイ二乗分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 区間推定 }]
---

## 問題
観測時間 $T$ における事象数 $K$ がポアソン分布 $\operatorname{Poisson}(T\lambda)$ に従う。観測値 $k=5$、$T=10$ のとき、$\lambda$ の95%正確信頼区間を求めよ。下側確率 $q$ のカイ二乗分位点を $\chi^2_{\nu;q}$ とし、$\chi^2_{10;0.025}=3.247$、$\chi^2_{12;0.975}=23.337$ を用いよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$K\sim\operatorname{Poisson}(\Lambda)$ の観測値が $k>0$ のとき、信頼係数 $1-\alpha$ の正確区間は
$$\Lambda_L=\frac12\chi^2_{2k;\alpha/2},\qquad
\Lambda_U=\frac12\chi^2_{2(k+1);1-\alpha/2}.$$
$\Lambda=T\lambda$ なので両端を $T$ で割る。

## 一手
ポアソン平均の区間を先に作り、最後に観測時間で割って率へ戻す。

## 答え
$$\lambda\in
\left[\frac{\chi^2_{2k;0.025}}{2T},
\frac{\chi^2_{2(k+1);0.975}}{2T}\right]
=\left[\frac{3.247}{20},\frac{23.337}{20}\right]
\approx[0.162,1.167].$$

## 計算例
まず平均事象数 $\Lambda$ の区間を作ると
$$\Lambda_L=\frac12(3.247)=1.6235,\qquad
\Lambda_U=\frac12(23.337)=11.6685.$$
次に $T=10$ で割って
$$\lambda_L=0.16235,\qquad \lambda_U=1.16685.$$

## 注意
$k=0$ のとき下端は0とする。

<!-- CARD -->

---
id: ci-clopper-pearson-zero-success
title: 成功0回の二項比率にClopper–Pearson正確区間を作る
category: math-estimation
subcategory: math-interval-estimation
topic: clopper-pearson-zero-success
type: calc_step
difficulty: 3
priority: S
hashtags: [二項分布, 正確信頼区間, Clopper–Pearson区間]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 区間推定 }]
---

## 問題
$X\sim\operatorname{Binomial}(n,p)$ で $n=20$、観測成功数が $x=0$ だった。Clopper–Pearsonの95%両側正確信頼区間を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

観測値 $x=0$ の両側区間では下端を0とし、上端 $p_U$ は
$$P_{p_U}(X=0)=(1-p_U)^n=\frac\alpha2$$
を満たすように定める。したがって
$$p_U=1-(\alpha/2)^{1/n}.$$

## 一手
成功0回では、二項確率のうち $P(X=0)=(1-p)^n$ だけで上端を解ける。

## 答え
$$p\in\left[0,\ 1-(0.025)^{1/20}\right]\approx[0,0.1684].$$

## 計算例
$\alpha=0.05,n=20$ だから
$$p_U=1-0.025^{1/20}.$$
対数を使うと
$$0.025^{1/20}
=\exp\left(\frac{\log0.025}{20}\right)
\approx\exp(-0.18444)\approx0.8316,$$
よって $p_U\approx1-0.8316=0.1684$。

## 注意
Wald区間は $x=0$ で幅0になってしまうため、この状況には不適切である。

<!-- CARD -->

---
id: ci-paired-mean-difference
title: 対応のある平均差のt信頼区間を数値で作る
category: math-estimation
subcategory: math-interval-estimation
topic: paired-mean-confidence-interval
type: calc_step
difficulty: 2
priority: S
hashtags: [対応のあるデータ, 平均差, t分布, 信頼区間]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 区間推定 }]
---

## 問題
同じ10人の処置前後の差を $D_i=Y_i-X_i$ とし、$\overline d=2.4$、$s_D=1.5$ を得た。差が正規分布に従うとして、母平均差 $\mu_D$ の95%信頼区間を求めよ。$t_{9;0.975}=2.262$ とする。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

対応のあるデータは各ペアの差 $D_i$ を1標本として扱う。
$$\frac{\overline D-\mu_D}{S_D/\sqrt n}\sim t_{n-1}.$$

## 一手
対応ありでは2群の分散を別々に足さず、最初に個体内差を作る。

## 答え
$$\mu_D\in
\overline d\pm t_{n-1;0.975}\frac{s_D}{\sqrt n}
=2.4\pm2.262\frac{1.5}{\sqrt{10}}
\approx[1.327,3.473].$$

## 計算例
標準誤差は
$$\frac{1.5}{\sqrt{10}}\approx0.4743.$$
半幅は
$$2.262(0.4743)\approx1.073.$$
したがって
$$2.4-1.073=1.327,\qquad
2.4+1.073=3.473.$$

## 注意
自由度はペア数から1を引いた $n-1=9$ である。
