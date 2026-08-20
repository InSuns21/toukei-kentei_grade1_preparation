---
id: asym-convergence-probability
title: 確率収束の定義とChebyshevによる判定
category: math-estimation
subcategory: math-asymptotic-estimation
topic: convergence-in-probability
type: formula
difficulty: 2
priority: S
hashtags: [確率収束, チェビシェフの不等式, 漸近理論]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 収束の概念 }]
---
## 問題
$X_n$ が $\theta$ に確率収束するとは何か。定義を書き、分散が評価できるときの判定法を示せ。
## 答え
任意の正の $\varepsilon$ に対し $P(|X_n-\theta|>\varepsilon)\to0$ と定義する。分散既知なら Chebyshev（チェビシェフ）不等式で上界をとる。
## 使用公式・定理
$$X_n\xrightarrow{p}\theta\iff\forall\varepsilon>0,\ P(|X_n-\theta|>\varepsilon)\to0\quad(n\to\infty).$$
## 計算例
$E[X_n]=\theta$、$\operatorname{Var}(X_n)=\sigma_n^2$ なら $P(|X_n-\theta|>\varepsilon)\le\sigma_n^2/\varepsilon^2$。標本平均は $E[\overline X_n]=\mu$、$\operatorname{Var}(\overline X_n)=\sigma^2/n\to0$ なので $\overline X_n\xrightarrow{p}\mu$。
## 注意
確率収束は「確率1の例外を除いて値が近づく」ことではなく、確率の極限をいう。

<!-- CARD -->

---
id: asym-convergence-almost-sure
title: 概収束（ほとんど確実な収束）の定義を書く
category: math-estimation
subcategory: math-asymptotic-estimation
topic: convergence-almost-sure
type: formula
difficulty: 2
priority: A
hashtags: [概収束, 収束の概念, 漸近理論]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 収束の概念 }]
---
## 問題
$X_n\xrightarrow{a.s.}\theta$ の定義を書け。
## 答え
確率1の集合上で極限が $\theta$ になることをいう。
## 使用公式・定理
$$P\left(\lim_{n\to\infty}X_n=\theta\right)=1.$$
## 計算例
非負な $Y_n\ge0$ で $\sum_{n=1}^\infty E[Y_n]<\infty$ なら単調収束定理から $E[\sum_{n=1}^\infty Y_n]<\infty$ となる。よって $\sum_{n=1}^\infty Y_n<\infty$ がほとんど確実に成り立ち、特に $Y_n\to0$ は概収束する。独立性は不要である。
## 注意
概収束は確率収束より強い含意関係にある。

<!-- CARD -->

---
id: asym-convergence-distribution
title: 分布収束の定義を書く
category: math-estimation
subcategory: math-asymptotic-estimation
topic: convergence-in-distribution
type: formula
difficulty: 2
priority: S
hashtags: [分布収束, 累積分布関数, 漸近理論]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 収束の概念 }]
---
## 問題
$X_n\xrightarrow{d}X$ の定義を書け。
## 答え
極限分布の累積分布関数の連続点ですべての点で、累積分布関数が一致する極限をとる。
## 使用公式・定理
極限分布 $X$ の累積分布関数 $F_X$ の全ての連続点 $x$ で $\lim_{n\to\infty}F_{X_n}(x)=F_X(x)$。
## 計算例
標準化標本平均 $Z_n=\sqrt n(\overline X_n-\mu)/\sigma$ は、正規分布 $N(0,1)$ へ分布収束する（$Z_n\xrightarrow{d}N(0,1)$）。
## 注意
分布収束は極限の分布の形だけをいい、確率変数同士の近さを要求しない。

<!-- CARD -->

---
id: asym-convergence-ms
title: 平均二乗収束の定義を書く
category: math-estimation
subcategory: math-asymptotic-estimation
topic: convergence-in-mean-square
type: formula
difficulty: 2
priority: A
hashtags: [平均二乗収束, 分散, 漸近理論]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 収束の概念 }]
---
## 問題
$X_n\xrightarrow{qm}\theta$（平均二乗収束）の定義を書け。
## 答え
ずれの2乗の期待値が0へ収束することをいう。
## 使用公式・定理
$$E[(X_n-\theta)^2]\to0\quad(n\to\infty).$$
## 計算例
$\operatorname{Var}(X_n)\to0$ かつ $E[X_n]\to\theta$ なら $E[(X_n-\theta)^2]=\operatorname{Var}(X_n)+(E[X_n]-\theta)^2\to0$。
## 注意
平均二乗収束は確率収束を含意する。

<!-- CARD -->

---
id: asym-convergence-relations
title: 収束概念の包含関係をまとめる
category: math-estimation
subcategory: math-asymptotic-estimation
topic: convergence-hierarchy
type: recognition
difficulty: 2
priority: A
hashtags: [収束の概念, 包含関係, 漸近理論]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 収束の概念 }]
---
## 問題
概収束、平均二乗収束、確率収束、分布収束の強弱関係を述べよ。
## 答え
概収束と平均二乗収束はそれぞれ確率収束を含意し、確率収束は分布収束を含意する。
## 使用公式・定理
$$X_n\xrightarrow{a.s.}\theta\Rightarrow X_n\xrightarrow{p}\theta,\qquad X_n\xrightarrow{qm}\theta\Rightarrow X_n\xrightarrow{p}\theta,\qquad X_n\xrightarrow{p}\theta\Rightarrow X_n\xrightarrow{d}\theta.$$
## 計算例
$\overline X_n\xrightarrow{a.s.}\mu$（強法則）なら自動的に $\xrightarrow{p}\mu$ および $\xrightarrow{d}\mu$ も成り立つ。
## 注意
逆方向は一般に成り立たない。平均二乗収束と概収束の間の包含関係はない。

<!-- CARD -->

---
id: asym-wlln
title: 大数の弱法則（独立同分布）を述べる
category: math-estimation
subcategory: math-asymptotic-estimation
topic: weak-law-of-large-numbers
type: theorem
difficulty: 2
priority: A
hashtags: [大数の弱法則, 標本平均, 確率収束]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 大数の弱法則 }]
---
## 問題
独立同分布標本に対する大数の弱法則を述べよ。
## 答え
有限な平均を持つ独立同分布標本では、標本平均が真の平均へ確率収束する。
## 使用公式・定理
$X_i\overset{\mathrm{i.i.d.}}{\sim}P$、$E[X_i]=\mu\in\mathbb R$ なら $\overline X_n\xrightarrow{p}\mu$。
## 計算例
コイン投げ $X_i\in\{0,1\}$、$P(X_i=1)=p$ のとき $\overline X_n\xrightarrow{p}p$。
## 注意
弱法則は確率収束を主張し、収束速度は与えない。

<!-- CARD -->

---
id: asym-slln
title: 大数の強法則（独立同分布）を述べる
category: math-estimation
subcategory: math-asymptotic-estimation
topic: strong-law-of-large-numbers
type: theorem
difficulty: 3
priority: A
hashtags: [大数の強法則, 標本平均, 概収束]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 大数の強法則 }]
---
## 問題
独立同分布標本に対する大数の強法則を述べよ。
## 答え
1乗可積分な平均を持つ独立同分布標本では、標本平均が真の平均へほとんど確実に収束する。
## 使用公式・定理
$E[|X_i|]<\infty$、$E[X_i]=\mu$ なら $\overline X_n\xrightarrow{a.s.}\mu$。
## 計算例
コイン投げで $n\to\infty$ に伴い表の出る割合は、確率1で $p$ へ収束する。
## 注意
強法則は弱法則より強い含意を与える。

<!-- CARD -->

---
id: asym-clt
title: 中心極限定理（独立同分布）を述べる
category: math-estimation
subcategory: math-asymptotic-estimation
topic: central-limit-theorem
type: theorem
difficulty: 3
priority: S
hashtags: [中心極限定理, 正規分布（ガウス分布）, 分布収束]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 中心極限定理 }]
---
## 問題
独立同分布標本に対する中心極限定理を述べよ。
## 答え
有限な分散を持つ独立同分布標本の標準化標本平均は、標準正規分布へ分布収束する。
## 使用公式・定理
$E[X_i]=\mu$、$0<\operatorname{Var}(X_i)=\sigma^2<\infty$ なら $\dfrac{\sqrt n(\overline X_n-\mu)}{\sigma}\xrightarrow{d}N(0,1)$。
## 計算例
$X_i$ がベルヌーイ分布 $\operatorname{Bernoulli}(p)$ なら $E[X_i]=p$、$\operatorname{Var}(X_i)=p(1-p)$。$\sqrt n(\overline X_n-p)/\sqrt{p(1-p)}\xrightarrow{d}N(0,1)$。
## 注意
収束の種類は分布収束。標本サイズが十分大きいときの近似に使う。

<!-- CARD -->

---
id: asym-slutsky
title: Slutskyの定理を述べる
category: math-estimation
subcategory: math-asymptotic-estimation
topic: slutsky
type: theorem
difficulty: 3
priority: S
hashtags: [Slutskyの定理, 分布収束, 漸近理論]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 収束の概念 }]
---
## 問題
Slutsky（スルツキー）の定理を述べよ。
## 答え
分布収束する列と、定数へ確率収束する列の和・積・商は、極限分布の対応する演算の分布へ収束する。
## 使用公式・定理
$X_n\xrightarrow{d}X$、$Y_n\xrightarrow{p}c$（定数）なら $X_n+Y_n\xrightarrow{d}X+c$、$X_nY_n\xrightarrow{d}cX$、$X_n/Y_n\xrightarrow{d}X/c\ (c\ne0)$。
## 計算例
$Z_n\xrightarrow{d}N(0,1)$、$S_n^2\xrightarrow{p}\sigma^2>0$ なら $Z_n/(S_n/\sigma)=(\overline X_n-\mu)/(S_n/\sqrt n)\xrightarrow{d}N(0,1)$。
## 注意
$Y_n$ が定数でない確率変数へ確率収束する場合、積の極限は一般に成り立たない。

<!-- CARD -->

---
id: asym-continuous-mapping
title: 連続写像定理を述べる
category: math-estimation
subcategory: math-asymptotic-estimation
topic: continuous-mapping-theorem
type: theorem
difficulty: 2
priority: A
hashtags: [連続写像定理, 分布収束, 漸近理論]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 収束の概念 }]
---
## 問題
連続写像定理（連続写像定理）を述べよ。
## 答え
分布収束する列に連続関数を施したものは、極限分布に同じ関数を施した分布へ収束する。
## 使用公式・定理
$X_n\xrightarrow{d}X$ かつ $g$ が連続なら $g(X_n)\xrightarrow{d}g(X)$。
## 計算例
$Z_n\xrightarrow{d}N(0,1)$ なら $g(x)=x^2$ として $Z_n^2\xrightarrow{d}\chi^2_1$。
## 注意
多変量でも連続写像 $g$ について同じことが成り立つ。

<!-- CARD -->

---
id: asym-delta-method
title: デルタ法で漸近分布を求める
category: math-estimation
subcategory: math-asymptotic-estimation
topic: delta-method
type: formula
difficulty: 3
priority: A
hashtags: [デルタ法, 漸近分布, 微分]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: デルタ法 }]
---
## 問題
$\sqrt n(T_n-\theta)$ が正規分布（ガウス分布） $N(0,\sigma^2)$ へ分布収束するとし、微分可能な $g$ に対し $g(T_n)$ の漸近分布を求めよ。
## 答え
導関数 $g'(\theta)$ を漸近分散に掛けて $\{g'(\theta)\}^2\sigma^2$ にする。
## 使用公式・定理
$$\sqrt n(g(T_n)-g(\theta))\xrightarrow{d}N(0,\{g'(\theta)\}^2\sigma^2).$$
## 計算例
$T_n=\overline X_n$、$\theta=\mu$、$g(x)=e^x$ なら $\sqrt n(e^{\overline X_n}-e^\mu)\xrightarrow{d}N(0,e^{2\mu}\sigma^2)$（$\sigma^2=\operatorname{Var}(X_i)$）。
## 注意
$g'(\theta)=0$ のときは $\sqrt n$ の次数では収束せず、第2次デルタ法が必要になる。

<!-- CARD -->

---
id: asym-sample-mean-normality
title: 標本平均の漸近正規性を計算する
category: math-estimation
subcategory: math-asymptotic-estimation
topic: sample-mean-asymptotic
type: calc_step
difficulty: 2
priority: S
hashtags: [標本平均, 中心極限定理, 標準誤差]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 中心極限定理 }]
---
## 問題
独立同分布標本 $X_i$ の平均 $\mu$、分散 $\sigma^2$ が既知とする。$\overline X_n$ の近似95%区間の半幅を $n=100$、$\sigma=4$ で求めよ。
## 答え
中心極限定理より $\overline X_n\approx N(\mu,\sigma^2/n)$ として、標準誤差 $\sigma/\sqrt n$ に95%点を掛ける。
## 使用公式・定理
$\overline X_n\xrightarrow{d}N(\mu,\sigma^2/n)$（漸近）、標準誤差 $SE=\sigma/\sqrt n$。
## 計算例
$SE=4/\sqrt{100}=0.4$。95%点 $z_{0.975}\approx1.96$ より半幅 $1.96\times0.4\approx0.784$。
## 注意
漸近近似なので標本サイズが十分大きいことが前提。

<!-- CARD -->

---
id: asym-sample-proportion-normality
title: 標本比率の漸近正規性を計算する
category: math-estimation
subcategory: math-asymptotic-estimation
topic: sample-proportion-asymptotic
type: calc_step
difficulty: 2
priority: S
hashtags: [標本比率, 中心極限定理, 標準誤差]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 中心極限定理 }]
---
## 問題
成功確率 $p$ の独立同分布ベルヌーイ標本で、標本比率 $\widehat p$ の近似標準誤差を $n=400$、$p=0.3$ で求めよ。
## 答え
中心極限定理より $\widehat p\approx N(p,p(1-p)/n)$ として、標準誤差を出す。
## 使用公式・定理
$\widehat p\xrightarrow{d}N(p,p(1-p)/n)$、標準誤差 $\sqrt{p(1-p)/n}$。
## 計算例
$\sqrt{0.3\times0.7/400}=\sqrt{0.21/400}=\sqrt{0.000525}\approx0.0229$。
## 注意
$np$、$n(1-p)$ がともに5以上程度あることが目安。

<!-- CARD -->

---
id: asym-mle-consistency
title: 最尤推定量の一致性を確認する
category: math-estimation
subcategory: math-asymptotic-estimation
topic: mle-consistency
type: theorem
difficulty: 3
priority: S
hashtags: [最尤推定, 一致性, 確率収束]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 最尤推定 }]
---
## 問題
最尤推定量が一致性（確率収束）を持つ条件を述べよ。
## 答え
識別可能性と正則性（尤度が真値で一意に最大、モデルが滑らか等）の下で、標本サイズ増大とともに真の母数へ確率収束する。
## 使用公式・定理
正則条件の下で最尤推定量 $\widehat\theta\xrightarrow{p}\theta_0$。
## 計算例
正規平均の最尤推定量 $\overline X_n$ は大数の弱法則から $\xrightarrow{p}\mu$。ベルヌーイの最尤推定量 $\widehat p$ も $\xrightarrow{p}p$。
## 注意
境界解などの非正則な場合は一致性が崩れることがある。

<!-- CARD -->

---
id: asym-mle-asymptotic-normality
title: 最尤推定量の漸近正規性を述べる
category: math-estimation
subcategory: math-asymptotic-estimation
topic: mle-asymptotic-normality
type: theorem
difficulty: 3
priority: S
hashtags: [最尤推定, 漸近正規性, フィッシャー情報量（1次元）]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 最尤推定量の漸近正規性 }]
---
## 問題
正則条件の下での最尤推定量の漸近分布を述べよ。
## 答え
標準化した最尤推定量は標準正規分布へ分布収束し、漸近分散は1観測当たりのフィッシャー情報量（1次元）の逆数になる。
## 使用公式・定理
$\sqrt n(\widehat\theta-\theta_0)\xrightarrow{d}N(0,I_1(\theta_0)^{-1}).$
## 計算例
ベルヌーイなら $I_1(p)=1/\{p(1-p)\}$ なので $\sqrt n(\widehat p-p)\xrightarrow{d}N(0,p(1-p))$。
## 注意
偏差スコアの期待値0とフィッシャー情報量の加法性を用いる。

<!-- CARD -->

---
id: asym-asymptotic-variance-se
title: 漸近分散と漸近標準誤差を定義する
category: math-estimation
subcategory: math-asymptotic-estimation
topic: asymptotic-variance
type: formula
difficulty: 2
priority: S
hashtags: [漸近分散, 標準誤差, 漸近理論]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 漸近理論 }]
---
## 問題
推定量 $T_n$ の漸近分散と漸近標準誤差を定義せよ。
## 答え
$\sqrt n(T_n-\theta)\xrightarrow{d}N(0,v)$ のとき $v$ を $\sqrt n(T_n-\theta)$ の漸近分散と呼ぶ。したがって $T_n$ の分散は大標本で $v/n$、漸近標準誤差は $\sqrt{v/n}$ と近似する。
## 使用公式・定理
漸近分散 $=v$、漸近標準誤差 $=\sqrt{v/n}$（$v$ を $\widehat v$ で置換）。
## 計算例
$\overline X_n$ に対し $v=\sigma^2$ なら漸近標準誤差 $\sigma/\sqrt n$；不偏分散 $S^2$ で $S/\sqrt n$。
## 注意
標本分散そのものではなく $1/\sqrt n$ のオーダーである。

<!-- CARD -->

---
id: asym-asymptotic-relative-efficiency
title: 漸近相対効率を定義する
category: math-estimation
subcategory: math-asymptotic-estimation
topic: asymptotic-relative-efficiency
type: formula
difficulty: 3
priority: A
hashtags: [漸近相対効率, 有効性, 漸近理論]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 漸近理論 }]
---
## 問題
二つの漸近正規推定量 $T_n,U_n$ の漸近相対効率を定義せよ。
## 答え
極限分散の逆数の比として定義する。
## 使用公式・定理
$$\operatorname{ARE}(T,U)=\frac{v_U}{v_T},\qquad v_T=\operatorname{AVar}(\sqrt n\,T_n),\ v_U=\operatorname{AVar}(\sqrt n\,U_n).$$
## 計算例
正規母集団で $T_n=$ 標本中央値、$U_n=$ 標本平均とすると、$v_T=\pi\sigma^2/2$、$v_U=\sigma^2$ なので $\operatorname{ARE}(T,U)=2/\pi\approx0.637$。
## 注意
1より小さいほど相対的に情報量が少ない。

<!-- CARD -->

---
id: asym-order-notation
title: オーダー記号 Op・op を定義する
category: math-estimation
subcategory: math-asymptotic-estimation
topic: order-notation
type: formula
difficulty: 2
priority: A
hashtags: [オーダー記号, 確率収束, 漸近理論]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 漸近理論 }]
---
## 問題
確率論的オーダー記号 $O_p$、$o_p$ を定義せよ。
## 答え
確率的有界 $O_p$ と、確率収束して0になる $o_p$ を定義する。
## 使用公式・定理
$X_n=O_p(a_n)$ とは、任意の $\varepsilon>0$ に対して、ある $M>0$ と $N$ が存在し、すべての $n\ge N$ で $P(|X_n/a_n|>M)<\varepsilon$ となること。$X_n=o_p(a_n)$ とは $X_n/a_n\xrightarrow{p}0$ となることであり、特に $X_n=o_p(1)\iff X_n\xrightarrow{p}0$。
## 計算例
$\overline X_n-\mu=O_p(n^{-1/2})$、$\sqrt n(\overline X_n-\mu)=O_p(1)$。また $E|X_i|^3<\infty$ なら、$m_3=E[(X_i-\mu)^3]$ として $n^{-1}\sum_{i=1}^n(X_i-\mu)^3-m_3=o_p(1)$。
## 注意
$O_p$ は確率的有界、$o_p$ は確率収束して0。

<!-- CARD -->

---
id: asym-prob-conv-chebyshev
title: Chebyshev不等式で確率収束を計算する
category: math-estimation
subcategory: math-asymptotic-estimation
topic: chebyshev-convergence
type: calc_step
difficulty: 2
priority: S
hashtags: [チェビシェフの不等式, 確率収束, 分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 収束の概念 }]
---
## 問題
$E[X_n]=\theta$、$\operatorname{Var}(X_n)=1/n$ とする。$P(|X_n-\theta|>0.1)$ の上界を $n=100$ で求めよ。
## 答え
Chebyshev（チェビシェフ）不等式で分散を $\varepsilon^2$ で割る。
## 使用公式・定理
$$P(|X_n-\theta|>\varepsilon)\le\frac{\operatorname{Var}(X_n)}{\varepsilon^2}.$$
## 計算例
$(1/100)/(0.1)^2=0.01/0.01=1$。$n=400$ なら $0.0025/0.01=0.25$。$n\to\infty$ で0へ。
## 注意
これは上界であり確率そのものではない。

<!-- CARD -->

---
id: asym-as-conv-prob
title: 概収束が確率収束を含意することを確認する
category: math-estimation
subcategory: math-asymptotic-estimation
topic: as-implies-p
type: proof_step
difficulty: 3
priority: A
hashtags: [概収束, 確率収束, 含意]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 収束の概念 }]
---
## 問題
$X_n\xrightarrow{a.s.}\theta$ なら $X_n\xrightarrow{p}\theta$ となることを示せ。
## 答え
ほとんど確実に収束する集合を用い、任意の $\varepsilon$ について確率が0へ行くことを示す。
## 使用公式・定理
$E_\varepsilon=\{|X_n-\theta|>\varepsilon\}$、$A=\{\lim_{k\to\infty}X_k=\theta\}$ とおくと $P(A)=1$ より $P(E_\varepsilon)\to0$。
## 計算例
$A=\{\lim_{k\to\infty}X_k=\theta\}$ とおくと $P(A)=1$。$B_n=\bigcup_{k\ge n}\{|X_k-\theta|>\varepsilon\}$ は減少列で、その極限 $B$ は $A^c$ の部分集合である。よって $P(B)=0$ かつ上からの連続性により $P(B_n)\to0$。
## 注意
逆は一般に成り立たない。

<!-- CARD -->

---
id: asym-ms-conv-prob
title: 平均二乗収束が確率収束を含意することを確認する
category: math-estimation
subcategory: math-asymptotic-estimation
topic: qm-implies-p
type: proof_step
difficulty: 2
priority: A
hashtags: [平均二乗収束, 確率収束, チェビシェフの不等式]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 収束の概念 }]
---
## 問題
$X_n\xrightarrow{qm}\theta$ なら $X_n\xrightarrow{p}\theta$ となることを示せ。
## 答え
Markov（Chebyshev）不等式を二乗平均に適用する。
## 使用公式・定理
$$P(|X_n-\theta|>\varepsilon)\le\frac{E[(X_n-\theta)^2]}{\varepsilon^2}.$$
## 計算例
$E[(X_n-\theta)^2]=1/n$ なら上界は $1/(n\varepsilon^2)\to0$。
## 注意
平均二乗収束の直接な含意である。

<!-- CARD -->

---
id: asym-clt-binomial-normal
title: 二項分布を正規分布で近似する計算
category: math-estimation
subcategory: math-asymptotic-estimation
topic: binomial-normal-approx
type: calc_step
difficulty: 2
priority: S
hashtags: [中心極限定理, 二項分布, 連続修正]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 中心極限定理 }]
---
## 問題
$X$ は二項分布 $\operatorname{Binomial}(n=100,p=0.4)$ に従うとする。$P(X\le46)$ を正規近似（連続修正付き）で求めよ。
## 答え
中心極限定理で $X\approx N(np,np(1-p))$ とし、連続修正 $X\le46.5$ を標準化する。
## 使用公式・定理
$E[X]=np=40$、$\operatorname{Var}(X)=np(1-p)=24$、標準偏差 $SE=\sqrt{24}\approx4.90$。
## 計算例
$z=(46.5-40)/4.90\approx1.33$、標準正規の累積分布関数 $\Phi(1.33)\approx0.908$。
## 注意
離散への連続修正を忘れない。

<!-- CARD -->

---
id: asym-delta-method-sqrt
title: デルタ法で平方根変換の漸近分散を求める
category: math-estimation
subcategory: math-asymptotic-estimation
topic: delta-method-sqrt
type: calc_step
difficulty: 3
priority: A
hashtags: [デルタ法, 漸近分散, 微分]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: デルタ法 }]
---
## 問題
$\sqrt n(\overline X_n-\mu)$ が正規分布（ガウス分布） $N(0,\sigma^2)$ へ分布収束するとする。$g(x)=\sqrt x$ として $\sqrt{\overline X_n}$（$\mu>0$）の漸近分散を求めよ。
## 答え
$g'(\mu)=1/(2\sqrt\mu)$ を漸近分散に掛ける。
## 使用公式・定理
$$\sqrt n(\sqrt{\overline X_n}-\sqrt\mu)\xrightarrow{d}N\left(0,\frac{\sigma^2}{4\mu}\right).$$
## 計算例
$\sigma^2=4$、$\mu=9$ なら漸近分散 $4/(4\cdot9)=1/9$、漸近標準誤差 $\sqrt{1/(9n)}=1/(3\sqrt n)$。
## 注意
$\mu>0$ が必要（平方根の定義域）。

<!-- CARD -->

---
id: asym-mle-av-binomial
title: 最尤推定量の漸近分散を情報量から出す（ベルヌーイ）
category: math-estimation
subcategory: math-asymptotic-estimation
topic: mle-av-binomial
type: calc_step
difficulty: 3
priority: S
hashtags: [最尤推定, フィッシャー情報量（1次元）, 漸近分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 最尤推定量の漸近正規性 }]
---
## 問題
ベルヌーイ標本の最尤推定量 $\widehat p$ の漸近分散をフィッシャー情報量（1次元）から求めよ。
## 答え
漸近分散は1観測当たりの情報量の逆数を標本サイズで割ったもの。
## 使用公式・定理
$$I_1(p)=\frac1{p(1-p)},\qquad \operatorname{AVar}(\sqrt n\,\widehat p)=p(1-p),\qquad \operatorname{AVar}(\widehat p)=\frac{p(1-p)}{n}.$$
## 計算例
$p=0.5$ なら $\operatorname{AVar}(\widehat p)=0.25/n$、漸近標準誤差 $0.5/\sqrt n$。
## 注意
標本比率の中心極限定理の分散と一致する。

<!-- CARD -->

---
id: asym-mle-av-normal
title: 最尤推定量の漸近分散を情報量から出す（正規平均）
category: math-estimation
subcategory: math-asymptotic-estimation
topic: mle-av-normal
type: calc_step
difficulty: 3
priority: S
hashtags: [最尤推定, フィッシャー情報量（1次元）, 漸近分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 最尤推定量の漸近正規性 }]
---
## 問題
正規分布 $N(\mu,\sigma^2)$（$\sigma^2$ 既知）の平均の最尤推定量 $\overline X_n$ の漸近分散を情報量から求めよ。
## 答え
1観測当たりの情報量の逆数を標本サイズで割る。
## 使用公式・定理
$$I_1(\mu)=\frac1{\sigma^2},\qquad \operatorname{AVar}(\sqrt n\,\overline X_n)=\sigma^2,\qquad \operatorname{AVar}(\overline X_n)=\frac{\sigma^2}{n}.$$
## 計算例
$\sigma^2=9$ なら $\operatorname{AVar}(\overline X_n)=9/n$、漸近標準誤差 $3/\sqrt n$。
## 注意
正規母集団では正確にもこの分散になる。

<!-- CARD -->

---
id: asym-slutsky-example
title: Slutskyの定理でt統計量の漸近分布を出す
category: math-estimation
subcategory: math-asymptotic-estimation
topic: slutsky-example
type: calc_step
difficulty: 3
priority: A
hashtags: [Slutskyの定理, 分布収束, 漸近正規性]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 収束の概念 }]
---
## 問題
$\overline X_n$、$S_n^2$ が独立同分布標本から作られるとする。$(\overline X_n-\mu)/(S_n/\sqrt n)$ の漸近分布を求めよ。
## 答え
分子の標準化を $N(0,1)$ へ、分母の $S_n/\sigma$ を1へ、Slutskyで割る。
## 使用公式・定理
$Z_n=\sqrt n(\overline X_n-\mu)/\sigma\xrightarrow{d}N(0,1)$、$S_n^2\xrightarrow{p}\sigma^2$ ゆえ $Z_n/(S_n/\sigma)\xrightarrow{d}N(0,1)$。
## 計算例
$\sigma=2$、$S_n^2=4.1$ でも $n$ 大で $S_n^2/\sigma^2\to1$ なので極限は標準正規。
## 注意
正規性を仮定しない大標本のt統計量の根拠。

<!-- CARD -->

---
id: asym-are-median-mean
title: 漸近相対効率（標本中央値／平均）を計算する
category: math-estimation
subcategory: math-asymptotic-estimation
topic: are-median-mean
type: calc_step
difficulty: 3
priority: A
hashtags: [漸近相対効率, 有効性, 標本中央値]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 漸近理論 }]
---
## 問題
正規母集団で、標本平均と標本中央値の漸近相対効率を求めよ。
## 答え
極限分散の逆数比を取る。標本中央値の極限分散は $\pi\sigma^2/(2n)$。
## 使用公式・定理
$\operatorname{AVar}(\sqrt n\,\overline X)=\sigma^2$、$\operatorname{AVar}(\sqrt n\,\widetilde X)=\pi\sigma^2/2$。
## 計算例
$\operatorname{ARE}(\widetilde X,\overline X)=\sigma^2/(\pi\sigma^2/2)=2/\pi\approx0.637$。
## 注意
正規では平均がより効率的。裾が重い分布では逆転しうる。

<!-- CARD -->
