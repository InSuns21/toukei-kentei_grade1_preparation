initial_reviewer_id: agent-math-C10
final_reviewer_id: agent-math-C10
initial_reviewed_at: 2026-08-19T12:21:33.000Z
final_reviewed_at: 2026-08-19T12:35:00.000Z

# C10-asymptotic-estimation independent mathematical review

## 初回指摘（minor: 3）
- minor: `asym-convergence-almost-sure` — 概収束例の帰属を単調収束へ（独立性不要）。
- minor: `asym-delta-method`／`asym-delta-method-sqrt` — 表記を「正規分布（ガウス分布）」へ統一。
- minor: `asym-as-conv-prob` — 極限事象を $A^c$ の部分集合として上からの連続性で示す。

## 修正確認
- 3件とも `anki/cards/31_asymptotic_estimation.md` で修正済み。再査読で各指摘の解消と全27枚の式・数值の独立再検証を確認した。最終判定は下記のとおり。

- Target: `anki/cards/31_asymptotic_estimation.md`
- Reviewer: independent MATHEMATICAL reviewer
- Date/time: 2026-08-19 Asia/Tokyo
- Scope: only the 27 new cards. Definitions, theorems, examples, and numerical calculations were independently re-derived.

## Independent recalculation summary

- Convergence in probability: for every epsilon > 0, P(|X_n - theta| > epsilon) -> 0. If E[X_n] = theta and Var(X_n) = sigma_n^2, the Chebyshev bound is sigma_n^2 / epsilon^2.
- Convergence in distribution: F_n(x) -> F(x) at every continuity point of the limiting CDF F.
- Mean-square convergence: E[(X_n - theta)^2] -> 0. Markov's inequality implies convergence in probability.
- Hierarchy: a.s. convergence implies convergence in probability, which implies convergence in distribution; mean-square convergence also implies convergence in probability. There is no general implication between a.s. and mean-square convergence.
- WLLN/SLLN: E[X_i] = mu in R gives Xbar_n ->p mu, and E[|X_i|] < infinity gives Xbar_n ->a.s. mu.
- CLT: if 0 < sigma^2 < infinity, then sqrt(n)(Xbar_n - mu)/sigma ->d N(0,1).
- Slutsky: the stated sum, product, and quotient conclusions follow from X_n ->d X and Y_n ->p c. For the t-statistic, S_n^2 ->p sigma^2, so the limit is N(0,1).
- Continuous mapping theorem: for continuous g, g(X_n) ->d g(X). In particular, Z_n ->d N(0,1) implies Z_n^2 ->d chi-square(1).
- Delta method: if sqrt(n)(T_n - theta) ->d N(0, sigma^2) and g is differentiable at theta, then sqrt(n)(g(T_n)-g(theta)) ->d N(0, g'(theta)^2 sigma^2). For g(x)=exp(x), g'(mu)=exp(mu); for g(x)=sqrt(x) with mu>0, g'(mu)=1/(2 sqrt(mu)).
- Sample mean: for n=100 and sigma=4, SE=0.4 and the normal 95% half-width is 1.96 x 0.4 = 0.784.
- Sample proportion: for n=400 and p=0.3, sqrt(0.21/400)=0.0229128..., approximately 0.0229.
- MLE asymptotic normality: under regularity, sqrt(n)(theta_hat - theta_0) ->d N(0, I_1(theta_0)^(-1)). For Bernoulli observations, I_1(p)=1/[p(1-p)]; for a normal mean with known variance, I_1(mu)=1/sigma^2.
- Asymptotic variance/SE: if sqrt(n)(T_n-theta) ->d N(0,v), then v is the sqrt(n)-scale asymptotic variance, the estimator-scale variance is v/n, and the asymptotic SE is sqrt(v/n).
- Binomial normal approximation: np=40, np(1-p)=24, z=(46.5-40)/sqrt(24)=1.3268..., approximately 1.33, and Phi(1.3268)=0.9077..., approximately 0.908.
- ARE: in a normal population, sqrt(n) Xbar has limiting variance sigma^2 and sqrt(n) Xtilde has limiting variance pi sigma^2/2. Hence ARE(Xtilde, Xbar)=2/pi=0.6366..., approximately 0.637.
- O_p/o_p: the definitions, Xbar_n - mu = O_p(n^(-1/2)), and the third centered sample mean being o_p(1) under a finite third moment were independently checked.

## Findings

### 1. minor / `asym-convergence-almost-sure`

- File/heading: `anki/cards/31_asymptotic_estimation.md`, `id: asym-convergence-almost-sure`, calculation-example field.
- Evidence: The card attributes the result for independent nonnegative Y_n with sum E[Y_n] < infinity to Kolmogorov's three-step theorem.
- Independent calculation: For nonnegative variables, monotone convergence gives E[sum Y_n] = sum E[Y_n] < infinity. Therefore sum Y_n is finite, hence convergent, with probability one. Neither independence nor Kolmogorov's three-series theorem is needed.
- Suggested fix: Attribute the result to monotone convergence and remove the unnecessary independence assumption; alternatively, name and apply the three-series theorem correctly with its actual assumptions.

### 2. minor / `asym-delta-method`, `asym-delta-method-sqrt`

- File/heading: question field of each card.
- Evidence: Both cards call N(0, sigma^2) the standard normal (Gaussian) distribution.
- Independent calculation: N(0, sigma^2) has variance sigma^2 and is standard normal only when sigma^2=1. The displayed formulas are otherwise correct.
- Suggested fix: Change the wording to normal distribution N(0, sigma^2).

### 3. minor / `asym-as-conv-prob`

- File/heading: `id: asym-as-conv-prob`, calculation-example field.
- Evidence: The card states P(union over k>=n of {|X_k-theta|>epsilon}) -> P(empty set)=0.
- Independent calculation: Let B_n be that decreasing union and B its limit. On the convergence set A, B is empty, but over the whole sample space the precise statement is B subset A^c. Since P(A^c)=0, P(B)=0, and continuity from above gives P(B_n)->0.
- Suggested fix: State the limiting event as a subset of the probability-zero set A^c and cite continuity from above.

## Checked cards

Each card covers one point and reposts the relevant definition, theorem, or formula in its formula/theorem field. Every card with a numerical calculation reaches a final concrete value. Definition and theorem cards end in complete symbolic results rather than final numbers; because their learning point is reproduction of the definition or theorem, this is not a mathematical defect.

`asym-convergence-probability`, `asym-convergence-almost-sure`, `asym-convergence-distribution`, `asym-convergence-ms`, `asym-convergence-relations`, `asym-wlln`, `asym-slln`, `asym-clt`, `asym-slutsky`, `asym-continuous-mapping`, `asym-delta-method`, `asym-sample-mean-normality`, `asym-sample-proportion-normality`, `asym-mle-consistency`, `asym-mle-asymptotic-normality`, `asym-asymptotic-variance-se`, `asym-asymptotic-relative-efficiency`, `asym-order-notation`, `asym-prob-conv-chebyshev`, `asym-as-conv-prob`, `asym-ms-conv-prob`, `asym-clt-binomial-normal`, `asym-delta-method-sqrt`, `asym-mle-av-binomial`, `asym-mle-av-normal`, `asym-slutsky-example`, `asym-are-median-mean`

## Machine validation

- `npm run anki:validate`: SUCCESS on 2026-08-19 Asia/Tokyo. It validated 445 cards with 0 warnings, built 7 category pages, and passed the site build check.

fatal: 0 / major: 0 / minor: 3

<!-- initial_reviewer_id: agent-math-C10 final_reviewer_id: agent-math-C10 -->

## Re-review after revision

- Reviewer: independent MATHEMATICAL reviewer
- Date/time: 2026-08-19 Asia/Tokyo
- Scope: the three previously flagged corrections plus a formula/number sanity sweep of all 27 cards in `anki/cards/31_asymptotic_estimation.md`.

### Confirmation of previous findings

1. `asym-convergence-almost-sure`: RESOLVED. The example now uses nonnegative $Y_n$ and monotone convergence to obtain $E[\sum Y_n]=\sum E[Y_n]<\infty$, hence $\sum Y_n<\infty$ almost surely. Independence is correctly stated as unnecessary.
2. `asym-delta-method` and `asym-delta-method-sqrt`: RESOLVED. Both now say 正規分布（ガウス分布） $N(0,\sigma^2)$, not 標準正規分布. This is correct because $N(0,\sigma^2)$ has variance $\sigma^2$ and is standard normal only when $\sigma^2=1$.
3. `asym-as-conv-prob`: RESOLVED. For decreasing $B_n=\bigcup_{k\ge n}\{|X_k-\theta|>\varepsilon\}$, the card now identifies the limiting event as a subset of $A^c$, where $P(A^c)=0$, and invokes continuity from above to conclude $P(B_n)\to0$.

### Formula and numerical sanity sweep

- Convergence definitions and hierarchy are correctly stated: probability convergence, almost-sure convergence, distribution convergence, mean-square convergence, and the implications a.s. ⇒ p ⇒ d and qm ⇒ p, with no general implication between a.s. and qm.
- WLLN/SLLN conditions and conclusions are correct: finite mean gives convergence in probability; $E[|X_i|]<\infty$ gives almost-sure convergence.
- CLT: for i.i.d. data with $0<\sigma^2<\infty$, $\sqrt n(\overline X_n-\mu)/\sigma\to_d N(0,1)$; the Bernoulli specialization and sample-proportion variance $p(1-p)/n$ are correct.
- Slutsky: sum, product, and quotient forms are correct, including the $c\ne0$ condition; the t-statistic example correctly yields $N(0,1)$ from $S_n^2\to_p\sigma^2$.
- Continuous mapping theorem and $Z_n^2\to_d\chi^2_1$ are correct.
- Delta method: $\sqrt n(g(T_n)-g(\theta))\to_d N(0,g'(\theta)^2\sigma^2)$ is correct. The exponential example gives $e^{2\mu}\sigma^2$; the square-root example gives $\sigma^2/(4\mu)$ for $\mu>0$, and the $\sigma^2=4,\mu=9$ example gives variance $1/9$ and ASE $1/(3\sqrt n)$.
- Sample-mean normal approximation: $SE=4/\sqrt{100}=0.4$ and $1.96\times0.4=0.784$ are correct.
- Sample-proportion SE: $\sqrt{0.21/400}=0.0229128...\approx0.0229$ is correct.
- MLE asymptotic normality: $\sqrt n(\widehat\theta-\theta_0)\to_d N(0,I_1(\theta_0)^{-1})$ is correct. Bernoulli $I_1(p)=1/\{p(1-p)\}$ and normal-mean $I_1(\mu)=1/\sigma^2$ give the stated variances.
- Asymptotic variance/SE and ARE definitions are internally consistent. For a normal population, median/mean limiting variances are $\pi\sigma^2/2$ and $\sigma^2$, hence ARE $=2/\pi=0.6366...\approx0.637$.
- Binomial normal approximation: for Binomial(100,0.4), $np=40$, $np(1-p)=24$, $\sqrt{24}=4.8990...$, $(46.5-40)/4.8990=1.3268...\approx1.33$, and $\Phi(1.3268)=0.9077...\approx0.908$.
- Chebyshev/Markov bounds and the $O_p/o_p$ examples were independently checked and are correct.

No remaining mathematical issue was found in the 27 cards. No essay or connection-drill requirement was applied, and the passing site-build display-term behavior was not flagged.

## Machine validation for re-review

- `npm run anki:validate`: SUCCESS on 2026-08-19 Asia/Tokyo. It validated 445 cards with 0 warnings, built 445 cards in 7 category pages, and passed the site build check.

fatal: 0 / major: 0 / minor: 0

## Second independent re-review after revision (third pass)

- Reviewer: independent MATHEMATICAL reviewer
- Reviewer ID: agent-math-C10
- Date/time: 2026-08-19T13:10:00.000Z Asia/Tokyo
- Scope: independent verification that the three previous minor fixes are actually present in `anki/cards/31_asymptotic_estimation.md`, plus an independent formula/number sweep of all 27 cards. No essay/connection-drill requirement applied (Anki scope).

### Direct confirmation of the three previous fixes (read from the card body, not the author's claim)

1. `asym-convergence-almost-sure`: CONFIRMED. The calculation-example field reads: 非負な $Y_n\ge0$ で $\sum E[Y_n]<\infty$ なら単調収束定理から $E[\sum Y_n]=\sum E[Y_n]<\infty$ となる。よって $\sum Y_n$ はほとんど確実に有限（すなわち収束）し、独立であることは不要である。 The result is attributed to the monotone convergence theorem, and independence is explicitly stated as unnecessary. The earlier Kolmogorov three-series attribution is gone.

2. `asym-delta-method` and `asym-delta-method-sqrt`: CONFIRMED. Both question fields now read "…が正規分布（ガウス分布） $N(0,\sigma^2)$ へ分布収束する…". Neither says 標準正規分布. Since $N(0,\sigma^2)$ has variance $\sigma^2$ and is standard normal only when $\sigma^2=1$, the displayed naming is correct.

3. `asym-as-conv-prob`: CONFIRMED. The calculation-example field reads: $B_n=\bigcup_{k\ge n}\{|X_k-\theta|>\varepsilon\}$ は減少列で、その極限 $B$ は $A^c$ の部分集合である。よって $P(B)=0$ かつ上からの連続性により $P(B_n)\to0$。 The earlier over-simplification $P(\bigcup_{k\ge n}\cdots)=P(\emptyset)=0$ is gone; the decreasing sequence, the subset relation $B\subset A^c$, $P(A^c)=0$, and continuity from above are all stated.

### Independent formula and numerical sweep of all 27 cards

Every numerical example was independently recomputed and reaches a final concrete value:

- `asym-prob-conv-chebyshev`: Var=1/n, $\varepsilon=0.1$, $n=100$ gives $(1/100)/0.01=1$; $n=400$ gives $0.0025/0.01=0.25$. Correct upper bound; note correctly says it is an upper bound, not the probability.
- `asym-sample-mean-normality`: $SE=4/\sqrt{100}=0.4$, half-width $1.96\times0.4=0.784$. Correct.
- `asym-sample-proportion-normality`: $\sqrt{0.3\times0.7/400}=\sqrt{0.21/400}=\sqrt{0.000525}\approx0.0229$. Correct.
- `asym-clt-binomial-normal`: $np=40$, $np(1-p)=24$, $SE=\sqrt{24}\approx4.90$, $z=(46.5-40)/4.90\approx1.33$, $\Phi(1.33)\approx0.908$. Continuity correction $46.5$ present. Correct.
- `asym-delta-method`: with $g(x)=e^x$, variance $e^{2\mu}\sigma^2$. Correct.
- `asym-delta-method-sqrt`: $\sigma^2=4,\mu=9$ gives variance $4/(4\cdot9)=1/9$ and ASE $\sqrt{1/(9n)}=1/(3\sqrt n)$. Correct.
- `asym-mle-av-binomial`: $I_1(p)=1/\{p(1-p)\}$, AVar($\sqrt n\widehat p)=p(1-p)$, AVar($\widehat p)=p(1-p)/n$; at $p=0.5$ gives $0.25/n$ and ASE $0.5/\sqrt n$. Correct and matches the sample-proportion CLT.
- `asym-mle-av-normal`: $I_1(\mu)=1/\sigma^2$, AVar($\overline X_n)=\sigma^2/n$; at $\sigma^2=9$ gives $9/n$ and ASE $3/\sqrt n$. Correct.
- `asym-are-median-mean`: ARE $=2/\pi\approx0.637$. Correct.
- `asym-order-notation`: $\overline X_n-\mu=O_p(n^{-1/2})$, $\sqrt n(\overline X_n-\mu)=O_p(1)$, third centered moment $=o_p(1)$ under finite third moment. Correct.

Definitions, theorems, and implication hierarchies were independently re-derived:

- Convergence definitions (probability, a.s., distribution, mean-square) and the hierarchy a.s. ⇒ p ⇒ d, qm ⇒ p, no general a.s.↔qm implication, are correctly stated.
- WLLN ($E[X_i]=\mu$ in $\mathbb R$ ⇒ $\xrightarrow{p}\mu$) and SLLN ($E[|X_i|]<\infty$ ⇒ $\xrightarrow{a.s.}\mu$) conditions/conclusions are correct.
- CLT: i.i.d. with $0<\sigma^2<\infty$ ⇒ $\sqrt n(\overline X_n-\mu)/\sigma\to_d N(0,1)$; Bernoulli specialization correct.
- Slutsky sum/product/quotient (with $c\ne0$ quotient condition) and the t-statistic example yielding $N(0,1)$ from $S_n^2\to_p\sigma^2$ are correct.
- Continuous mapping theorem and $Z_n^2\to_d\chi^2_1$ are correct.
- MLE asymptotic normality $\sqrt n(\widehat\theta-\theta_0)\to_d N(0,I_1(\theta_0)^{-1})$ is correct; Bernoulli and normal-mean information quantities correct.
- Asymptotic variance/SE and ARE definitions are internally consistent.

No new fatal, major, or minor mathematical issue was found in the 27 cards. The previously recorded three minor findings are resolved in the card body. No essay/connection-drill or answer-compression requirement was applied, consistent with Anki scope.

### Machine validation for third pass

- `npm run validate`: SUCCESS on 2026-08-19T13:10:00.000Z Asia/Tokyo. All three sub-validations passed (structure, math/KaTeX strict over 305 Markdown files, text over 237 generated targets). Exit code 0.

fatal: 0 / major: 0 / minor: 0
