
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
## 答え
標本から作る区間推定量 $I(X)=[L(X),U(X)]$ に対し、$C(\theta)=P_\theta\{\theta\in I(X)\}$ を被覆確率という。$C(\theta)=1-\alpha$ がすべての $\theta$ で成り立つ区間は、信頼係数 $1-\alpha$ の正確な信頼区間である。一般には $\inf_{\theta\in\Theta}C(\theta)$ を信頼係数と呼ぶ。
## 使用公式・定理
$$C(\theta)=P_\theta\bigl(L(X)\le \theta\le U(X)\bigr),\qquad \inf_{\theta\in\Theta}C(\theta)\ge1-\alpha.$$
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
## 答え
信頼係数は「手順」の性質であり、得られた一つの区間についての確率ではない。
## 使用公式・定理
固定された $\theta$ に対し $P_\theta(\theta\in I(X))=1-\alpha$。得られた区間は実現値であり確率変数ではない。
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
## 答え
標本 $X$ と未知パラメータ $\theta$ の関数 $Q(X,\theta)$ のうち、その分布が未知パラメータに依存しないものをいう。
## 使用公式・定理
$Q(X,\theta)$ の分布が $\theta$ によらず一定。これを用いて $P(a\le Q\le b)=1-\alpha$ を $\theta$ について解き区間を得る。
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
## 答え
分位点 $a,b$ を $P(a\le Q\le b)=1-\alpha$ に選び、不等式 $a\le Q(X,\theta)\le b$ を $\theta$ について解く。
## 使用公式・定理
$P(a\le Q(X,\theta)\le b)=1-\alpha$ を $\theta$ について同値変形し、$\theta$ を含む区間として表す。
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
## 答え
$$\left[\overline X-z_{\alpha/2}\frac{\sigma}{\sqrt n},\ \overline X+z_{\alpha/2}\frac{\sigma}{\sqrt n}\right].$$
## 使用公式・定理
$\dfrac{\overline X-\mu}{\sigma/\sqrt n}\sim N(0,1)$ をピボット量とする。$z_{\alpha/2}$ は標準正規分布の上側 $\alpha/2$ 点。
## 計算例
標準誤差は $\sigma/\sqrt n$；信頼係数 $0.95$ なら $z_{0.025}=1.96$ をかける。
## 注意
$\sigma$ 未知なら $t$ 区間へ切り替える。

<!-- CARD -->

---
id: ci-normal-mean-known-calc
title: 正規平均・分散既知の区間を数値で作る
category: math-estimation
subcategory: math-interval-estimation
topic: normal-mean-known-calc
type: calc_step
difficulty: 2
priority: S
hashtags: [信頼区間, 数値計算, 母平均]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 区間推定 }]
---
## 問題
$n=25$、$\sigma=2$、$\overline x=100$、$\alpha=0.05$ のとき $\mu$ の信頼区間を求めよ。
## 答え
標準誤差 $0.4$ に $z_{0.025}=1.96$ をかけ、半幅 $0.784$ の区間 $[99.216,100.784]$ を得る。
## 使用公式・定理
半幅 $E=z_{\alpha/2}\,\sigma/\sqrt n=1.96\times 2/5=0.784$。
## 計算例
区間は $100\pm0.784=[99.216,100.784]$。
## 注意
$\sigma/\sqrt n$ は $\sigma$ 既知でなければ使えない。

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
## 答え
$T=(\overline X-\mu)/(S/\sqrt n)\sim t_{n-1}$ がピボット量となる。この分布形は母集団が正規であることから導かれる。
## 使用公式・定理
$Z=(\overline X-\mu)/(\sigma/\sqrt n)\sim N(0,1)$ と
$$V=\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1}$$
は正規標本では独立である。したがってt分布の定義から
$$\frac{Z}{\sqrt{V/(n-1)}}
=\frac{(\overline X-\mu)/(\sigma/\sqrt n)}{S/\sigma}
=\frac{\overline X-\mu}{S/\sqrt n}sim t_{n-1}.$$
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
## 答え
既知なら標準誤差 $\sigma/\sqrt n$ に $z_{\alpha/2}$ をかけ、未知なら不偏分散 $S$ で推定して $t_{n-1,\alpha/2}$ を用いる。
## 使用公式・定理
既知：$\overline X\pm z_{\alpha/2}\sigma/\sqrt n$。未知：$\overline X\pm t_{n-1,\alpha/2}S/\sqrt n$。
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
## 答え
ピボット量 $(n-1)S^2/\sigma^2\sim\chi^2_{n-1}$ を用い、両側の分位点が異なる区間を作る。
## 使用公式・定理
ここで $\chi^2_{\nu,\gamma}$ は上側確率が $\gamma$ となる点、すなわち $P(\chi^2_\nu\ge\chi^2_{\nu,\gamma})=\gamma$ とする。この記法で
$$P\left(\chi^2_{n-1,1-\alpha/2}\le\frac{(n-1)S^2}{\sigma^2}\le\chi^2_{n-1,\alpha/2}\right)=1-\alpha,$$
$A=(n-1)S^2>0$、$c_L=\chi^2_{n-1,1-\alpha/2}$、$c_U=\chi^2_{n-1,\alpha/2}$ と置く。$0<c_L<c_U$ なので
$$c_L\le\frac{A}{\sigma^2}\le c_U
\quad\Longleftrightarrow\quad
\frac{A}{c_U}\le\sigma^2\le\frac{A}{c_L}.$$
よって区間は
$$\left[\frac{(n-1)S^2}{\chi^2_{n-1,\alpha/2}},\ 
\frac{(n-1)S^2}{\chi^2_{n-1,1-\alpha/2}}\right].$$
## 計算例
$\chi^2$ は右に裾が長いので、上側端点は下側分位点 $\chi^2_{n-1,1-\alpha/2}$ で割る。
## 注意
対称な正規に比べ区間が非対称になる。

<!-- CARD -->

---
id: ci-variance-chi-calc
title: 正規分散のカイ二乗区間を数値で作る
category: math-estimation
subcategory: math-interval-estimation
topic: variance-chi-calc
type: calc_step
difficulty: 3
priority: S
hashtags: [カイ二乗区間, 数値計算, 母分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 区間推定 }]
---
## 問題
$n=16$、$S^2=9$、$\alpha=0.05$ のとき $\sigma^2$ の信頼区間を求めよ。
## 答え
$\chi^2_{15,0.025}=27.488$、$\chi^2_{15,0.975}=6.262$ を用い、区間 $[4.91,21.56]$ を得る。
## 使用公式・定理
分子 $(n-1)S^2=15\times9=135$。上下端は $135/27.488=4.91$、$135/6.262=21.56$。
## 計算例
区間は $[4.91,21.56]$。
## 注意
分散の区間は非対称；標準偏差の区間は端点の平方根をとる。

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
## 答え
ピボット量 $(S_1^2/\sigma_1^2)/(S_2^2/\sigma_2^2)\sim F_{n_1-1,n_2-1}$ を用い、比 $S_1^2/S_2^2$ を両側のF分位点で割る。
## 使用公式・定理
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
## 計算例
$F_{n_1-1,n_2-1,1-\alpha/2}=1/F_{n_2-1,n_1-1,\alpha/2}$ で計算できる。
## 注意
分散比は非対称なので両側でも分位点の向きが異なる。

<!-- CARD -->

---
id: ci-f-variance-ratio-calc
title: 2正規母分散比のF区間を数値で作る
category: math-estimation
subcategory: math-interval-estimation
topic: f-variance-ratio-calc
type: calc_step
difficulty: 3
priority: S
hashtags: [F分布, 数値計算, 分散比]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 区間推定 }]
---
## 問題
$n_1=n_2=10$、$S_1^2=6$、$S_2^2=4$、$\alpha=0.05$ のとき $\sigma_1^2/\sigma_2^2$ の信頼区間を求めよ。
## 答え
$F_{9,9,0.025}=4.026$、$F_{9,9,0.975}=1/4.026=0.2484$ を用い、区間 $[0.373,6.04]$ を得る。
## 使用公式・定理
比 $S_1^2/S_2^2=1.5$。下端 $1.5/4.026=0.373$、上端 $1.5/0.2484=6.04$。
## 計算例
区間は $[0.373,6.04]$。
## 注意
$1$ を含むので「分散に差がある」とは言えない。

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
## 答え
プールした不偏分散 $S_p^2$ を用い、自由度 $n_1+n_2-2$ の $t$ 区間を作る。
## 使用公式・定理
$$(\overline X-\overline Y)\pm t_{n_1+n_2-2,\alpha/2}\,S_p\sqrt{\frac1{n_1}+\frac1{n_2}},$$
$$S_p^2=\frac{(n_1-1)S_1^2+(n_2-1)S_2^2}{n_1+n_2-2}.$$
## 計算例
結合分散は「重み付き平均」であり自由度で割る。
## 注意
等分散の仮定が外れると Welch 型へ。

<!-- CARD -->

---
id: ci-two-sample-mean-diff-calc
title: 2標本平均差の区間を数値で作る（等分散）
category: math-estimation
subcategory: math-interval-estimation
topic: two-sample-mean-diff-calc
type: calc_step
difficulty: 3
priority: S
hashtags: [2標本, 数値計算, 平均差]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 区間推定 }]
---
## 問題
$n_1=n_2=10$、$S_1^2=S_2^2=4$ でプールすると $S_p^2=4$、$\overline x-\overline y=2$、$\alpha=0.05$ のとき区間を求めよ。
## 答え
$t_{18,0.025}=2.101$、標準誤差 $\sqrt{4/10+4/10}=0.8944$ より半幅 $1.879$、区間 $[0.121,3.879]$。
## 使用公式・定理
半幅 $=2.101\times0.8944=1.879$。区間 $2\pm1.879=[0.121,3.879]$。
## 計算例
区間は $[0.121,3.879]$。
## 注意
$0$ を含まないので平均差の存在が示唆される。

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
## 答え
結合分散を使わず、各不偏分散を用い、Satterthwaite の近似自由度 $\nu$ の $t$ 区間を作る。
## 使用公式・定理
$$(\overline X-\overline Y)\pm t_{\nu,\alpha/2}\sqrt{\frac{S_1^2}{n_1}+\frac{S_2^2}{n_2}},$$
$$\nu=\frac{\left(\dfrac{S_1^2}{n_1}+\dfrac{S_2^2}{n_2}\right)^2}{\dfrac{(S_1^2/n_1)^2}{n_1-1}+\dfrac{(S_2^2/n_2)^2}{n_2-1}}.$$
## 計算例
$\nu$ は整数でなくてよい；$n_1+n_2-2$ 以下になりやすい。
## 注意
検定の Welch と同じ近似自由度を使う。

<!-- CARD -->

---
id: ci-welch-calc
title: Welch型区間を数値で作る
category: math-estimation
subcategory: math-interval-estimation
topic: welch-calc
type: calc_step
difficulty: 3
priority: A
hashtags: [Welch, 数値計算, 近似自由度]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 区間推定 }]
---
## 問題
$n_1=12,n_2=15,S_1^2=9,S_2^2=4,\overline x-\overline y=2,\alpha=0.05$ のとき Welch 区間を求めよ。
## 答え
標準誤差 $1.008$、$\nu\approx18.38$ で $t_{18,0.025}=2.101$ より半幅 $2.118$、区間 $[-0.118,4.118]$。
## 使用公式・定理
$SE=\sqrt{9/12+4/15}=\sqrt{1.0167}=1.008$。$\nu=(1.0167)^2/(0.0511+0.00508)=18.38$。
## 計算例
区間 $2\pm2.101\times1.008=[-0.118,4.118]$。
## 注意
$0$ を含むので平均差の有意な差は示せない。

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
## 答え
標本比率 $\widehat p$ の漸近正規性を用い、$\widehat p\pm z_{\alpha/2}\sqrt{\widehat p(1-\widehat p)/n}$ とする。
## 使用公式・定理
$$\sqrt n(\widehat p-p)\xrightarrow{d}N(0,p(1-p));\quad \widehat p\pm z_{\alpha/2}\sqrt{\frac{\widehat p(1-\widehat p)}{n}}.$$
## 計算例
$n$ が十分大ならば近似が良い；境目では連続修正を検討する。
## 注意
$p$ が $0$ または $1$ に近いと近似が悪い。

<!-- CARD -->

---
id: ci-proportion-calc
title: 母比率の正規近似区間を数値で作る
category: math-estimation
subcategory: math-interval-estimation
topic: proportion-calc
type: calc_step
difficulty: 2
priority: S
hashtags: [母比率, 数値計算, 正規近似]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 区間推定 }]
---
## 問題
$n=400$、$\widehat p=0.3$、$\alpha=0.05$ のとき $p$ の信頼区間を求めよ。
## 答え
標準誤差 $\sqrt{0.21/400}=0.02291$ に $1.96$ をかけ、区間 $[0.255,0.345]$ を得る。
## 使用公式・定理
半幅 $=1.96\times0.02291=0.0449$。区間 $0.3\pm0.0449=[0.255,0.345]$。
## 計算例
区間は $[0.255,0.345]$。
## 注意
$n\widehat p\ge5$ 程度が近似の目安。

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
## 答え
$\widehat p_1-\widehat p_2$ は漸近正規で、分散 $p_1(1-p_1)/n_1+p_2(1-p_2)/n_2$ を標本で推定して区間を作る。
## 使用公式・定理
$$(\widehat p_1-\widehat p_2)\pm z_{\alpha/2}\sqrt{\frac{\widehat p_1(1-\widehat p_1)}{n_1}+\frac{\widehat p_2(1-\widehat p_2)}{n_2}}.$$
## 計算例
群内の比率で分散を個別に推定する（プールしない）。
## 注意
差の検定でプールするのとは標準誤差の扱いが異なる。

<!-- CARD -->

---
id: ci-proportion-diff-calc
title: 母比率差の区間を数値で作る
category: math-estimation
subcategory: math-interval-estimation
topic: proportion-diff-calc
type: calc_step
difficulty: 3
priority: A
hashtags: [母比率差, 数値計算, 正規近似]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 区間推定 }]
---
## 問題
$n_1=n_2=200$、$\widehat p_1=0.5$、$\widehat p_2=0.4$、$\alpha=0.05$ のとき $p_1-p_2$ の区間を求めよ。
## 答え
標準誤差 $0.0495$ に $1.96$ をかけ、区間 $[0.003,0.197]$ を得る。
## 使用公式・定理
$SE=\sqrt{0.25/200+0.24/200}=\sqrt{0.00245}=0.04950$。半幅 $=1.96\times0.04950=0.0970$。
## 計算例
区間 $0.1\pm0.0970=[0.003,0.197]$。
## 注意
$0$ を含まないので比率に差がある。

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
## 答え
下側は $[\theta_L,\infty)$、上側は $(-\infty,\theta_U]$ の形。両側の一方の分位点だけを用いる。
## 使用公式・定理
下側：$P(\theta\ge \overline X-z_{\alpha}\sigma/\sqrt n)=1-\alpha$。上側：$P(\theta\le \overline X+z_{\alpha}\sigma/\sqrt n)=1-\alpha$。
## 計算例
$z_{\alpha}$ は上側 $\alpha$ 点（$0.05$ なら $z_{0.05}=1.645$）。
## 注意
両側 $1-\alpha$ と片側 $1-\alpha$ では分位点の $\alpha/2$ と $\alpha$ の違いに注意。

<!-- CARD -->

---
id: ci-one-sided-calc
title: 片側信頼区間を数値で作る
category: math-estimation
subcategory: math-interval-estimation
topic: one-sided-calc
type: calc_step
difficulty: 2
priority: S
hashtags: [片側信頼区間, 数値計算, 区間推定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 区間推定 }]
---
## 問題
$n=25$、$\sigma=2$、$\overline x=100$、$\alpha=0.05$ のとき $\mu$ の $95\%$ 下側信頼区間を求めよ。
## 答え
半幅 $1.645\times0.4=0.658$ より、下側信頼区間は $[100-0.658,\infty)=[99.342,\infty)$ となる。
## 使用公式・定理
$SE=\sigma/\sqrt n=0.4$。$z_{0.05}=1.645$。下側端 $\theta_L=\overline x-z_{0.05}\sigma/\sqrt n=99.342$。
## 計算例
下側 $[99.342,\infty)$、上側 $(-\infty,100.658]$ が得られる。
## 注意
片側は両側より半幅が狭い（同じ $1-\alpha$ で）。

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
## 答え
水準 $\alpha$ の検定で棄却されない $\theta$ の集合が、ちょうど信頼係数 $1-\alpha$ の信頼区間になる。
## 使用公式・定理
$$CI_{1-\alpha}(x)=\{\theta_0: \text{観測 }x\text{ で }H_0:\theta=\theta_0\text{ を棄却しない}\}.$$
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
## 答え
$|z|=|\overline x-\mu|/(\sigma/\sqrt n)\le z_{\alpha/2}$ を $\mu$ について解くと、ちょうど両側区間になる。
## 使用公式・定理
受容域 $\{|\overline x-\mu|\le z_{\alpha/2}\sigma/\sqrt n\}$ を $\mu$ に関して書くと $\mu\in[\overline x\pm z_{\alpha/2}\sigma/\sqrt n]$。
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
## 答え
標本サイズ $n\to\infty$ で被覆確率が $1-\alpha$ に近づく区間をいう。有限標本では近似的に成り立つ。
## 使用公式・定理
$\lim_{n\to\infty}P_\theta(\theta\in I_n)=1-\alpha$ となる $I_n$ を漸近 $1-\alpha$ 信頼区間という。
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
## 答え
$\sqrt n(\widehat\theta-\theta)\xrightarrow{d}N(0,I_1(\theta)^{-1})$ より、情報量の逆数を分散として $z$ 区間を作る。
## 使用公式・定理
$$\widehat\theta\pm z_{\alpha/2}\,\frac{1}{\sqrt{n\,I_1(\widehat\theta)}},$$
または対数尤度のヘッセ行列から標準誤差を推定する。
## 計算例
ベルヌーイなら $I_1(p)=1/\{p(1-p)\}$ で既知の比率区間と一致する。
## 注意
情報量は真値の関数なので、標本で $\widehat\theta$ に置き換える（Plug-in）。

<!-- CARD -->

---
id: ci-asymptotic-mle-calc
title: 最尤推定量の漸近区間を数値で作る
category: math-estimation
subcategory: math-interval-estimation
topic: asymptotic-mle-calc
type: calc_step
difficulty: 3
priority: S
hashtags: [最尤推定, 数値計算, 漸近信頼区間]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 最尤推定量の漸近正規性 }]
---
## 問題
最尤推定量を用いたベルヌーイ、$n=100$、$\widehat p=0.4$、$\alpha=0.05$ のとき $p$ の漸近区間を求めよ。
## 答え
$1/(nI_1(\widehat p))=0.4\times0.6/100=0.0024$、標準誤差 $0.0490$ より区間 $[0.304,0.496]$。
## 使用公式・定理
$SE=\sqrt{0.0024}=0.0490$。半幅 $=1.96\times0.0490=0.0960$。区間 $0.4\pm0.096=[0.304,0.496]$。
## 計算例
区間は $[0.304,0.496]$。
## 注意
Wald型の母比率正規近似区間と一致する（1観測当たりの情報量の逆数 $I_1(p)^{-1}=p(1-p)$ がベルヌーイ分散に等しいため）。

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
## 答え
$g$ が微分可能なら $\sqrt n(g(T_n)-g(\theta))\xrightarrow{d}N(0,g'(\theta)^2\sigma^2)$ を用い、$g(T_n)$ 中心の $z$ 区間を作る。
## 使用公式・定理
$$g(T_n)\pm z_{\alpha/2}\,|g'(T_n)|\,\frac{\widehat\sigma}{\sqrt n}.$$
## 計算例
$g(x)=e^x$ なら $|g'(T_n)|=e^{T_n}$；$g(x)=\sqrt x$ なら $1/(2\sqrt{T_n})$（$\theta>0$）。
## 注意
区間の端点を $g$ で変換する方法と、分散を伝播させる方法があり、非線形で差が出る。

<!-- CARD -->

---
id: ci-delta-method-calc
title: デルタ法の信頼区間を数値で作る
category: math-estimation
subcategory: math-interval-estimation
topic: delta-method-calc
type: calc_step
difficulty: 3
priority: S
hashtags: [デルタ法, 数値計算, 信頼区間]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: デルタ法 }]
---
## 問題
$T_n=2$、$\widehat\sigma^2=4$、$n=100$、$g(x)=e^x$、$\alpha=0.05$ のとき $g(\theta)$ の区間を求めよ。
## 答え
$g'(T_n)=e^2=7.389$、$\widehat\sigma/\sqrt n=2/10=0.2$ より半幅 $1.96\times7.389\times0.2=2.896$、区間 $[4.49,10.29]$。
## 使用公式・定理
$g(T_n)=e^2=7.389$。標準誤差 $|g'| \widehat\sigma/\sqrt n=7.389\times0.2=1.478$。半幅 $=1.96\times1.478=2.896$。
## 計算例
区間 $7.389\pm2.896=[4.49,10.29]$。
## 注意
端点を $e^x$ で変換した区間とも比較する（非対称の確認用）。

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
## 答え
信頼係数を大きくする（$\alpha$ を小さくする）と、分位点 $z_{\alpha/2}$ が大きくなり区間は広くなる。
## 使用公式・定理
半幅 $\propto z_{\alpha/2}$。$z_{0.05}=1.645$、$z_{0.025}=1.96$ のように $\alpha$ 減少で増大。
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
## 答え
$z_{\alpha/2}\,\sigma/\sqrt n\le E$ を解き、$n\ge (z_{\alpha/2}\sigma/E)^2$ とする（切り上げ）。
## 使用公式・定理
$$n=\left\lceil\left(\frac{z_{\alpha/2}\,\sigma}{E}\right)^2\right\rceil.$$
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

## 答え
$$\lambda\in
\left[\frac{\chi^2_{2k;0.025}}{2T},
\frac{\chi^2_{2(k+1);0.975}}{2T}\right]
=\left[\frac{3.247}{20},\frac{23.337}{20}\right]
\approx[0.162,1.167].$$

## 使用公式・定理
$K\sim\operatorname{Poisson}(\Lambda)$ の観測値が $k>0$ のとき、信頼係数 $1-\alpha$ の正確区間は
$$\Lambda_L=\frac12\chi^2_{2k;\alpha/2},\qquad
\Lambda_U=\frac12\chi^2_{2(k+1);1-\alpha/2}.$$
$\Lambda=T\lambda$ なので両端を $T$ で割る。

## 計算例
まず平均事象数 $\Lambda$ の区間を作ると
$$\Lambda_L=\frac12(3.247)=1.6235,\qquad
\Lambda_U=\frac12(23.337)=11.6685.$$
次に $T=10$ で割って
$$\lambda_L=0.16235,\qquad \lambda_U=1.16685.$$

## 一手
ポアソン平均の区間を先に作り、最後に観測時間で割って率へ戻す。

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

## 答え
$$p\in\left[0,\ 1-(0.025)^{1/20}\right]\approx[0,0.1684].$$

## 使用公式・定理
観測値 $x=0$ の両側区間では下端を0とし、上端 $p_U$ は
$$P_{p_U}(X=0)=(1-p_U)^n=\frac\alpha2$$
を満たすように定める。したがって
$$p_U=1-(\alpha/2)^{1/n}.$$

## 計算例
$\alpha=0.05,n=20$ だから
$$p_U=1-0.025^{1/20}.$$
対数を使うと
$$0.025^{1/20}
=\exp\left(\frac{\log0.025}{20}\right)
\approx\exp(-0.18444)\approx0.8316,$$
よって $p_U\approx1-0.8316=0.1684$。

## 一手
成功0回では、二項確率のうち $P(X=0)=(1-p)^n$ だけで上端を解ける。

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

## 答え
$$\mu_D\in
\overline d\pm t_{n-1;0.975}\frac{s_D}{\sqrt n}
=2.4\pm2.262\frac{1.5}{\sqrt{10}}
\approx[1.327,3.473].$$

## 使用公式・定理
対応のあるデータは各ペアの差 $D_i$ を1標本として扱う。
$$\frac{\overline D-\mu_D}{S_D/\sqrt n}\sim t_{n-1}.$$

## 計算例
標準誤差は
$$\frac{1.5}{\sqrt{10}}\approx0.4743.$$
半幅は
$$2.262(0.4743)\approx1.073.$$
したがって
$$2.4-1.073=1.327,\qquad
2.4+1.073=3.473.$$

## 一手
対応ありでは2群の分散を別々に足さず、最初に個体内差を作る。

## 注意
自由度はペア数から1を引いた $n-1=9$ である。

<!-- CARD -->
