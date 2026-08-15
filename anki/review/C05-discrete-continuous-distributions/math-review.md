initial_reviewer_id: independent-math-reviewer-C05-20260815
final_reviewer_id: independent-math-reviewer-C05-20260815
initial_reviewed_at: 2026-08-15T19:14:10Z
final_reviewed_at: 2026-08-15T20:30:00Z

# C05 Independent Mathematical Review

- Work: `C05-discrete-continuous-distributions`
- Target: `anki/cards/20_discrete_continuous_distributions.md`
- Reviewer ID: `independent-math-reviewer-C05-20260815`
- Date: 2026-08-15
- Scope: all 51 cards in the target file. The progress target says 50 new cards; the file contains 51 card blocks, so all 51 were audited.
- Governing files: `agents/independent-math-reviewer.md`, `prompts/review-chapter.md`, `anki/prompts/review-category.md`
- Card text changed: no

## Independent recomputation

All 51 cards were checked independently, including support, parameterization, PMF/PDF, CDF, survival function, hazard, moments, covariance, transformations, conditional distributions, numerical examples, and one-card-one-topic granularity.

Distribution families checked: discrete uniform, Bernoulli, binomial, hypergeometric, geometric, negative binomial, Poisson, multinomial, continuous uniform, normal, exponential, Gamma, Beta, Cauchy, lognormal, Weibull, logistic, and multivariate normal.

No numerical calculation mismatch was found. Confirmed examples include:

- Binomial upper tail: `1 - 0.8^10 - 10(0.2)0.8^9 = 0.6241903616`.
- Hypergeometric variance: `10(0.3)(0.7)(90/99) = 189/110`.
- Beta(2,3) variance: `1/25`.
- Lognormal second moment: `E[X^2] = exp(2 mu + 2 sigma^2)`.
- Weibull mean: `lambda Gamma(1 + 1/k)`.
- Bivariate normal conditional variance: `4 - 9/9 = 3`.

## Findings

### MATH-001 - major

- Location: `anki/cards/20_discrete_continuous_distributions.md:815-817`, card `dist-continuous-uniform-definition`.
- Issue: The middle row of the CDF `cases` expression is malformed: `&(x-a)/(b-a)&(a\\le x\\le b)`. It has an empty value column and an extra alignment separator, so the central CDF value can render incorrectly or produce a KaTeX error.
- Independent check: the correct CDF is `0` for `x<a`, `(x-a)/(b-a)` for `a<=x<=b`, and `1` for `x>b`.
- Suggested fix: use `$(x-a)/(b-a)&(a\\le x\\le b)$` as the middle row and keep the two-column `cases` layout consistent.

### MATH-002 - major

- Location: `anki/cards/20_discrete_continuous_distributions.md:988-997`, card `dist-normal-linear-transform`.
- Issue: The answer states `Y ~ N(a mu+b, a^2 sigma^2)` without restricting `a`. For `a=0`, `Y=b` almost surely is a point mass, not an ordinary non-degenerate normal density.
- Independent check: for `a != 0`, the stated normal distribution is correct; for `a=0`, the distribution is degenerate at `b`.
- Suggested fix: add `a != 0`, or explicitly split the `a=0` case.

### MATH-003 - major

- Location: `anki/cards/20_discrete_continuous_distributions.md:630-643`, card `dist-multinomial-definition`.
- Issue: The PMF states `p_i>=0`, `sum p_i=1`, and `sum X_i=n`, but does not explicitly state that the PMF arguments `k_i` are nonnegative integers satisfying `sum k_i=n`.
- Independent check: the support is `k_i in Z_{>=0}` with `sum k_i=n`; outside that support the factorial/multinomial expression is not the ordinary PMF.
- Suggested fix: state `k_i in Z_{>=0}` and `sum k_i=n`, separately from the random-variable identity `sum X_i=n`.

### MATH-004 - major

- Location: `anki/cards/20_discrete_continuous_distributions.md:173-182`, card `dist-binomial-ratio`.
- Issue: The adjacent-probability ratio uses `p/(1-p)` without stating `0<p<1`. At `p=1` the ratio divides by zero; at `p=0` some ratios are undefined. Boundary binomial laws need separate treatment.
- Independent check: for `0<p<1`, the ratio and mode rule are correct. At `p=0`, `X=0` almost surely; at `p=1`, `X=n` almost surely.
- Suggested fix: add `n>=1, 0<p<1` and note the two degenerate boundary cases.

### MATH-005 - major

- Location: `anki/cards/20_discrete_continuous_distributions.md:475-486`, card `dist-negative-binomial-moments`.
- Issue: The prompt says only `the definition above`, so the card does not restate that `Y` counts failures before the r-th success. Negative-binomial parameterizations differ, and this card is not self-contained.
- Independent check: under the failure-count convention, `E[Y]=r(1-p)/p` and `Var(Y)=r(1-p)/p^2`; other conventions produce different supports and formulas.
- Suggested fix: restate `Y` as the failure count before the r-th success, with `r in N` and `0<p<1`, in the card itself.

### MATH-006 - major

- Location: `anki/cards/20_discrete_continuous_distributions.md:1435-1448`, card `dist-weibull-mean`.
- Issue: The prompt says only `the Weibull distribution above`; it omits shape `k`, scale `lambda`, support, density, and parameter conditions. The mean depends on that parameterization, so the card is not self-contained.
- Independent check: with density `f(x)=(k/lambda)(x/lambda)^(k-1) exp(-(x/lambda)^k)`, `k,lambda>0`, substitution `u=(x/lambda)^k` gives `E[X]=lambda Gamma(1+1/k)`.
- Suggested fix: restate the shape-scale definition or at least the parameterization and parameter conditions in the card.

### MATH-007 - minor

- Location: `anki/cards/20_discrete_continuous_distributions.md:755-765`, card `dist-bernoulli-complement`.
- Issue: The answer writes `P(X=1 | X>=1)=1` without qualification, while the calculation and note correctly require `p>0`. At `p=0`, the conditional probability has denominator zero.
- Suggested fix: qualify the answer with `p>0`, and state that it is undefined for `p=0`.

### MATH-008 - minor

- Location: `anki/cards/20_discrete_continuous_distributions.md:960-967`, card `dist-normal-symmetry`.
- Issue: `P(|X-mu|<=c)=2 Phi(c/sigma)-1` requires `c>=0`. For `c<0`, the left side is zero while the displayed right side can be negative.
- Suggested fix: add `c>=0` to the prompt.

### MATH-009 - minor

- Location: `anki/cards/20_discrete_continuous_distributions.md:1466-1475`, card `dist-logistic-definition`.
- Issue: The quantile formula `q_p=mu+s log(p/(1-p))` requires `0<p<1`, which is not stated.
- Suggested fix: state `0<p<1` for the quantile.

### MATH-010 - minor

- Location: `anki/cards/20_discrete_continuous_distributions.md:1047-1056,1164-1173,1252-1261`, cards `dist-exponential-definition`, `dist-gamma-definition`, and `dist-beta-definition`.
- Issue: The support is stated, but the density is not explicitly set to zero outside the support. Read as a function on all real numbers, the displayed formulas are not normalized PDFs.
- Suggested fix: put the support condition on the density line or explicitly state `f_X(x)=0` outside the support.

### MATH-011 - minor

- Location: target file overall, especially `dist-basic-discrete-uniform`, `dist-normal-definition`, `dist-exponential-definition`, `dist-logistic-definition`, and `dist-lognormal-moments`.
- Issue: Several cards combine multiple independent recall targets: PMF plus mean plus variance; PDF plus CDF plus survival; CDF plus PDF plus quantile; or mean plus variance plus median. This weakens the one-card-one-topic requirement.
- Suggested fix: split definition cards from characteristic-value cards, or split multiple distinct functions/quantities into separate cards.

## Existing-card overlap

- No exact ID duplicate was found.
- `dist-lognormal-transformation` is close to existing `prob-transform-log`, but the existing card is the standard-normal special case and the new card is the general `N(mu,sigma^2)` case.
- `dist-normal-linear-transform` is close to existing `prob-linear-combination-normal`, but the new card is a one-variable affine transformation and the existing card is an independent multi-variable linear combination.
- `dist-gamma-sum-exponential` is close to the exponential-sum example in `anki/cards/18_transformations.md`; the existing card is a convolution example for Gamma(2,1), while the new card gives the general shape-r theorem via MGF.
- `dist-gamma-definition` overlaps in Gamma-integral vocabulary with `dist-gamma-recognition` and `prob-mgf-gamma`, but the learning operations are definition/characteristics, integral recognition, and MGF derivation respectively.

## KaTeX and card granularity

- MATH-001 identifies the malformed `cases` expression.
- Other target formulas were visually checked for delimiters, superscripts, subscripts, fractions, derivatives, integrals, determinants, inverse matrices, and conditional-distribution notation.
- No `align`, `equation`, custom macro, `label`, `ref`, or `tag` usage was found in the target file.
- `dist-negative-binomial-moments` and `dist-weibull-mean` are not self-contained because they refer to a previous card; these are already recorded as MATH-005 and MATH-006.

## Machine validation

Command executed on 2026-08-15:

```text
npm run anki:validate

validated 217 cards (0 warnings)
built 217 cards in 7 category page(s), max 200 per page
checked 217 cards in 7 category page(s), max 200 per page
```

Result: success.

## Initial review totals

- fatal: 0
- major: 6
- minor: 5

## Re-review

- Re-review date: 2026-08-15
- Reviewer ID: `independent-math-reviewer-C05-20260815`
- Scope: all 57 cards in the current `anki/cards/20_discrete_continuous_distributions.md`
- Card text changed during review: no
- Additional cards checked: `dist-basic-discrete-uniform-moments`, `dist-continuous-uniform-cdf`, `dist-normal-moments`, `dist-exponential-cdf-survival`, `dist-logistic-quantile`, and `dist-lognormal-median`

### Full-card recheck

All 57 cards were reread and independently recalculated. PMFs, PDFs, CDFs, survival functions, hazards, moments, covariance formulas, transformations, conditional normal formulas, all numerical examples, support conditions, parameterizations, KaTeX delimiters, and one-card-one-topic granularity were checked. No new numerical mismatch was found apart from the findings below.

The corrected hypergeometric example was independently recomputed:

`10(0.3)(0.7)(90/99) = 189/110 = 21/11 = 1.909090...`, so the displayed `21/11 approx 1.909` is correct.

### MATH-001 through MATH-011 status

- MATH-001: resolved. The original card now contains only the density, and the new `dist-continuous-uniform-cdf` card has a valid two-column `cases` expression at `anki/cards/20_discrete_continuous_distributions.md:1598`.
- MATH-002: resolved. `dist-normal-linear-transform` now states `a != 0` and separately handles the degenerate `a=0` case.
- MATH-003: resolved. `dist-multinomial-definition` now states `k_i in Z_{>=0}` and `sum k_i=n`.
- MATH-004: resolved. `dist-binomial-ratio` now states `n>=1` and `0<p<1`.
- MATH-005: resolved. `dist-negative-binomial-moments` restates the failure-count convention, `0<p<1`, and `r in N`.
- MATH-006: resolved. `dist-weibull-mean` restates shape, scale, density, support, and parameter conditions.
- MATH-007: resolved. The Bernoulli conditional probability is qualified by `p>0` and the `p=0` case is stated as undefined.
- MATH-008: resolved. `dist-normal-symmetry` now states `c>=0`.
- MATH-009: resolved. The logistic quantile card now states `0<p<1` and explains the endpoint cases.
- MATH-010: partially resolved. Exponential and Gamma cards explicitly state zero density outside their supports; the Beta definition still states only `0<x<1` without explicitly stating `f_X(x)=0` outside that support.
- MATH-011: partially resolved. Discrete-uniform, continuous-uniform, normal, exponential, and logistic targets were split. `dist-gamma-definition` still asks for density, support, mean, and variance together, and `dist-lognormal-moments` still asks for mean, variance, and median together despite the new median card.

### Additional re-review findings

#### R-MATH-012 - major

- Locations: `anki/cards/20_discrete_continuous_distributions.md:659-660` and `:664-665`, card `dist-multinomial-moments`.
- The expression intended as `i\\ne j` is physically split into `i` and `e j` across lines in both the prompt and covariance answer. This leaves malformed math delimiters/commands and is not a valid rendering of the condition `i != j`.
- Suggested fix: restore each occurrence to a single line containing `\\ne`, or use plain text `i\\ne j` inside the math expression without line splitting.

#### R-MATH-013 - major

- Locations: `anki/cards/20_discrete_continuous_distributions.md:788-789` and `:792-793`, card `dist-binomial-factorial-moment`.
- The ordered-pair restriction intended as `i\\ne j` is physically split into `i` and `e j` in both displayed equations. The factorial-moment identity is therefore not rendered as written.
- Suggested fix: restore both equations to one-line `\\sum_{i\\ne j}` expressions.

#### R-MATH-014 - minor

- Location: `anki/cards/20_discrete_continuous_distributions.md:1380`, card `dist-lognormal-moments`.
- The prompt begins `???? ????`, a duplicated phrase. The mathematics is unaffected, but the card text should contain the distribution description once.

#### R-MATH-015 - minor

- Location: `anki/cards/20_discrete_continuous_distributions.md:1261-1262`, card `dist-beta-definition`.
- The support `0<x<1` is stated, but the density is not explicitly set to zero outside the support, so MATH-010 is not fully closed for this card.
- Suggested fix: add `f_X(x)=0` for `x<=0` or `x>=1`, or attach `0<x<1` directly to the density formula and state the outside-support convention.

#### R-MATH-016 - minor

- Locations: `anki/cards/20_discrete_continuous_distributions.md:1171-1175` and `:1379-1394`, cards `dist-gamma-definition` and `dist-lognormal-moments`.
- MATH-011 remains partially open because these cards still combine multiple independent recall targets. The six new cards improve granularity, but the original Gamma and lognormal cards remain overpacked.
- Suggested fix: make Gamma definition density/support only and leave moments to `dist-gamma-moments`; make lognormal moments cover mean/variance and leave median to `dist-lognormal-median`.

### Additional six cards

- `dist-basic-discrete-uniform-moments`: correct mean and variance; derivation and support are sufficient; one coherent moments topic.
- `dist-continuous-uniform-cdf`: correct three-region CDF, endpoint values, and valid KaTeX `cases`; one CDF topic.
- `dist-normal-moments`: correct parameter reading and numerical example; one moments topic.
- `dist-exponential-cdf-survival`: correct integration, complement, and negative-support convention; one linked CDF/survival topic.
- `dist-logistic-quantile`: correct inversion and domain `0<p<1`; one quantile topic.
- `dist-lognormal-median`: correct monotone-transform argument and `e^mu`; one median topic.

### Re-review KaTeX and overlap result

All 57 cards were checked for delimiter balance, fractions, superscripts, subscripts, integrals, derivatives, cases, matrices, and conditional distributions. The only newly observed malformed expressions are R-MATH-012 and R-MATH-013. No exact ID duplicate was found; the previously recorded near-overlaps remain differentiated by scope or operation.

### Re-review totals before final machine validation

- fatal: 0
- major: 2
- minor: 3

## Re-re-review

- Re-re-review date: 2026-08-15
- Reviewer ID: `independent-math-reviewer-C05-20260815`
- Scope: all 57 current cards in `anki/cards/20_discrete_continuous_distributions.md`
- Card text changed during review: no

### Full-card recheck

All 57 cards were reread and independently rechecked. PMFs, PDFs, CDFs, survival functions, hazards, moments, covariance formulas, transformations, conditional distributions, numerical examples, parameter domains, support conditions, KaTeX delimiters, and one-card-one-topic granularity were reviewed. No new numerical or probabilistic mismatch was found beyond the findings below.

### Requested five-item verification

1. `dist-multinomial-moments` and `dist-binomial-factorial-moment`: NOT resolved. The intended `i\\ne j` remains physically split into `i` and `e j` across lines in both cards. The formulas are mathematically intended correctly, but the stored KaTeX source is malformed. See RERE-MATH-001 and RERE-MATH-002.
2. `dist-beta-definition`: resolved. The card now states `0<x<1` and explicitly says `f_X(x)=0` for `x not in (0,1)` at `anki/cards/20_discrete_continuous_distributions.md:1261`.
3. `dist-lognormal-moments`: NOT resolved. The prompt asks for mean and variance, but the answer still includes `Median(X)=e^mu`, while the separate `dist-lognormal-median` card also covers the median. This is a remaining one-card-one-topic and duplication issue.
4. `dist-multivariate-normal-conditional`: resolved. The prompt now explicitly includes `sigma_Y^2>0` at `anki/cards/20_discrete_continuous_distributions.md:1534`; the scalar conditional formulas and the numerical example remain correct.
5. `dist-hypergeometric-moments`: resolved. The numerical example is `10(0.3)(0.7)(90/99)=21/11=1.909090...`, displayed as `21/11 approx 1.909`, which is correct.

### Additional remaining finding

#### RERE-MATH-001 - major

- Cards: `dist-multinomial-moments`, locations `anki/cards/20_discrete_continuous_distributions.md:659-660` and `:664-665`.
- The condition and covariance formula contain line-split `i` / `e j` fragments instead of a single `i\\ne j` command. This prevents the intended relation from being represented as valid KaTeX source.
- Required fix: restore each occurrence to a single-line `i\\ne j` expression.

#### RERE-MATH-002 - major

- Card: `dist-binomial-factorial-moment`, locations `anki/cards/20_discrete_continuous_distributions.md:788-789` and `:792-793`.
- Both factorial-moment identities contain the same line-split `i` / `e j` corruption. The intended ordered-pair sum is not represented as valid KaTeX source.
- Required fix: restore both occurrences to `\\sum_{i\\ne j}` on one line.

#### RERE-MATH-003 - minor

- Card: `dist-lognormal-moments`, locations `anki/cards/20_discrete_continuous_distributions.md:1379-1394`.
- The prompt now asks only for mean and variance, but the answer, title, tags, and surrounding explanation still include the median. The separate `dist-lognormal-median` card duplicates that topic.
- Required fix: remove the median from this card, or change the prompt and accept the intentional bundled topic explicitly.

#### RERE-MATH-004 - minor

- Card: `dist-gamma-definition`, locations `anki/cards/20_discrete_continuous_distributions.md:1170-1175`.
- The definition card still asks for density, support, mean, and variance together, while `dist-gamma-moments` separately covers the moments. This remains a one-card-one-topic issue from MATH-011.
- Required fix: keep density/support in the definition card and leave mean/variance to the moments card.

### Re-re-review conclusion before machine validation

All 57 cards were rechecked; the requested Beta, conditional-normal, and hypergeometric fixes are confirmed. The two KaTeX-corrupted cards and the two remaining granularity/duplication issues are not cleared.

- fatal: 0
- major: 2
- minor: 2

## Final re-re-review machine validation

`npm run anki:validate` was executed on 2026-08-15 and succeeded.

```text
> toukei-kentei-grade1-preparation@0.1.0 anki:validate
> node anki/scripts/validate_cards.mjs && node anki/scripts/build_site.mjs && node anki/scripts/build_site.mjs --check

validated 223 cards (0 warnings)
built 223 cards in 7 category page(s), max 200 per page
checked 223 cards in 7 category page(s), max 200 per page
```

Validation result: success.

## Final re-re-review totals

- fatal: 0
- major: 2
- minor: 2

## Final re-review

- Final review date: 2026-08-15
- Reviewer ID: `independent-math-reviewer-C05-20260815`
- Scope: all 57 current cards in `anki/cards/20_discrete_continuous_distributions.md`
- Card text changed during review: no

### Full-card confirmation

All 57 cards were reread and independently rechecked for definitions, supports, parameter domains, formulas, numerical examples, KaTeX source, card-section structure, and one-card-one-topic granularity. No new numerical, probabilistic, or distribution-parameter error was found.

### Requested final-fix confirmation

- `dist-multinomial-moments`: confirmed. Both occurrences of `i\\ne j` are now on one line and form valid LaTeX source.
- `dist-binomial-factorial-moment`: confirmed. Both `\\sum_{i\\ne j}` identities are now on one line and form valid LaTeX source.
- `dist-gamma-definition`: confirmed. The prompt and answer are limited to the Gamma density and support; mean and variance remain in `dist-gamma-moments`.
- `dist-lognormal-moments`: mathematical median formula has been removed from the answer, but the title, hashtags, and note still mention the median. The topic cleanup is therefore incomplete.
- `dist-lognormal-median`: confirmed that an answer section exists and contains `Median(X)=e^mu`; however, an identical displayed formula appears before the `## ??` heading, leaving a duplicated answer fragment and inconsistent card structure.

### Remaining final-review findings

#### FINAL-MATH-001 - minor

- Card: `dist-lognormal-moments`, locations `anki/cards/20_discrete_continuous_distributions.md:1361-1388`.
- The answer now contains only mean and variance, but the title, hashtags, and note still retain the median topic even though `dist-lognormal-median` is the dedicated median card.
- Required fix: remove the median wording from the title, hashtags, and note, leaving this card focused on mean and variance.

#### FINAL-MATH-002 - minor

- Card: `dist-lognormal-median`, locations `anki/cards/20_discrete_continuous_distributions.md:1707-1711`.
- The card has a restored `## ??` section, but the same median formula is also placed immediately before that heading. This is redundant and violates the expected problem/answer section structure.
- Required fix: remove the formula before `## ??` and retain the formula in the answer section.

### Final review totals before machine validation

- fatal: 0
- major: 0
- minor: 2

## Final-final machine validation

`npm run anki:validate` was executed on 2026-08-15 and succeeded.

```text
> toukei-kentei-grade1-preparation@0.1.0 anki:validate
> node anki/scripts/validate_cards.mjs && node anki/scripts/build_site.mjs && node anki/scripts/build_site.mjs --check

validated 223 cards (0 warnings)
built 223 cards in 7 category page(s), max 200 per page
checked 223 cards in 7 category page(s), max 200 per page
```

Validation result: success.

## Final review totals

- fatal: 0
- major: 0
- minor: 2

## Final-final review

- Final-final review date: 2026-08-15
- Reviewer ID: `independent-math-reviewer-C05-20260815`
- Scope: all 57 current cards in `anki/cards/20_discrete_continuous_distributions.md`
- Card text changed during review: no

### Full-card confirmation

All 57 cards were reread and independently rechecked for mathematical correctness, parameter domains, support and boundary conditions, PMF/PDF/CDF formulas, numerical examples, KaTeX source, metadata/topic scope, and card-section structure. No fatal or major mathematical issue was found.

### Requested final checks

- `dist-multinomial-moments`: PASS. The prompt and covariance formula contain same-line `i\\ne j`.
- `dist-binomial-factorial-moment`: PASS. Both ordered-pair sums contain same-line `\\sum_{i\\ne j}`.
- `dist-gamma-definition`: PASS. The card is limited to density and support; moments are in `dist-gamma-moments`, and the outside-support condition is explicit.
- `dist-continuous-uniform-definition`: NOT fully resolved. The problem/answer are density-only, but the title still says `?????????` and the hashtags still include `CDF` at `anki/cards/20_discrete_continuous_distributions.md:797-806`.
- `dist-lognormal-moments`: NOT fully resolved. The answer contains mean and variance only, but the title, hashtags, and note still mention the median at `anki/cards/20_discrete_continuous_distributions.md:1361-1388`.
- `dist-lognormal-median`: NOT resolved structurally. The median formula still appears between `## ??` and `## ??` at `anki/cards/20_discrete_continuous_distributions.md:1707-1711`, then appears again in the answer section.
- Previously checked boundary conditions, including `0<p<1`, `c>=0`, `sigma_Y^2>0`, support-outside density conventions, and the hypergeometric example `21/11 approx 1.909`, remain correct.

### Remaining final-final findings

#### FINAL-FINAL-MATH-001 - minor

- Card: `dist-continuous-uniform-definition`, locations `anki/cards/20_discrete_continuous_distributions.md:797-806`.
- The card content is density-only, but its title and hashtags still advertise the CDF.
- Required fix: change the title to density-only wording and remove `CDF` from hashtags.

#### FINAL-FINAL-MATH-002 - minor

- Card: `dist-lognormal-moments`, locations `anki/cards/20_discrete_continuous_distributions.md:1361-1388`.
- The title, hashtags, and note still mention the median although the card answer is now mean/variance-only.
- Required fix: remove all median wording from this card's metadata and note.

#### FINAL-FINAL-MATH-003 - minor

- Card: `dist-lognormal-median`, locations `anki/cards/20_discrete_continuous_distributions.md:1707-1711`.
- The same median formula appears before and inside the answer section.
- Required fix: retain only the formula inside `## ??`.

### Final-final totals before machine validation

- fatal: 0
- major: 0
- minor: 3

## Final-final-final machine validation

`npm run anki:validate` is executed after this section and its exact output is appended below.

## Final machine validation

`npm run anki:validate` was executed on 2026-08-15 and succeeded.

```text
> toukei-kentei-grade1-preparation@0.1.0 anki:validate
> node anki/scripts/validate_cards.mjs && node anki/scripts/build_site.mjs && node anki/scripts/build_site.mjs --check

validated 223 cards (0 warnings)
built 223 cards in 7 category page(s), max 200 per page
checked 223 cards in 7 category page(s), max 200 per page
```

Validation result: success.

## Final re-review totals

- fatal: 0
- major: 2
- minor: 3

## Final metadata-and-duplicate-formula re-review

- Review date: 2026-08-15
- Reviewer ID: `independent-math-reviewer-C05-20260815`
- Scope: all 57 cards in `anki/cards/20_discrete_continuous_distributions.md`
- Card text changed during review: no

### Full-scope confirmation

All 57 cards were reread and independently checked for definitions, supports, parameter domains, PMF/PDF formulas, calculations, KaTeX source, boundary conditions, duplicate formulas, and one-card-one-topic structure. No additional fatal or major mathematical error was found.

### Requested confirmations

- `dist-multinomial-moments`: confirmed that each `i\\ne j` condition is on the same line as the corresponding valid LaTeX formula.
- `dist-binomial-factorial-moment`: confirmed that each `\\sum_{i\\ne j}` expression is on one line and is valid LaTeX.
- `dist-gamma-definition`: confirmed that the card is restricted to the Gamma density and support, with `x>0`, `x\\le0` outside-support density zero, and `\\alpha,\\beta>0`; the Gamma definition is not used as an unrestricted moment statement.
- Boundary conditions: confirmed across the full file, including positive scale/rate parameters, valid probability parameters, positive variance conditions, support restrictions, and outside-support density conventions.
- `dist-continuous-uniform-definition`: not confirmed. The title still advertises both density and CDF, and hashtags still include `CDF`, although the prompt and answer are density-only.
- `dist-lognormal-moments`: not confirmed. The title, hashtags, and note still mention the median, although the answer asks for and gives mean and variance only.
- `dist-lognormal-median`: not confirmed. The median formula appears in the problem section and is repeated in the answer section.

### Final findings

#### FINAL-META-001 - minor

- Card: `dist-continuous-uniform-definition` (`anki/cards/20_discrete_continuous_distributions.md:797-806`).
- Density-only content has metadata advertising the CDF. Remove the CDF wording from the title and hashtags.

#### FINAL-META-002 - minor

- Card: `dist-lognormal-moments` (`anki/cards/20_discrete_continuous_distributions.md:1361-1388`).
- Title, hashtags, and note retain the median topic although the answer is mean/variance-only. Remove the median wording from those fields.

#### FINAL-META-003 - minor

- Card: `dist-lognormal-median` (`anki/cards/20_discrete_continuous_distributions.md:1707-1711`).
- The same median formula is duplicated between the problem and answer sections. Retain it only in the answer section.

### Final totals

- fatal: 0
- major: 0
- minor: 3

The requested `fatal: 0 / major: 0 / minor: 0` state is not reached because the three current-card issues above remain present.

## Final validation after this re-review

- Command: `npm run anki:validate`
- Date: 2026-08-15
- Result: success

```text
> toukei-kentei-grade1-preparation@0.1.0 anki:validate
> node anki/scripts/validate_cards.mjs && node anki/scripts/build_site.mjs && node anki/scripts/build_site.mjs --check

validated 223 cards (0 warnings)
built 223 cards in 7 category page(s), max 200 per page
checked 223 cards in 7 category page(s), max 200 per page
```

## Final metadata-fix re-review

- Review date: 2026-08-15
- Reviewer ID: `independent-math-reviewer-C05-20260815`
- Scope: all 57 cards in `anki/cards/20_discrete_continuous_distributions.md`
- Card text changed during review: no

### Resolved checks

- `dist-continuous-uniform-definition`: title and hashtags are density-only; the title no longer advertises the CDF and hashtags contain `PDF` without `CDF`.
- `dist-lognormal-moments`: title, hashtags, and the note are restricted to mean and variance; no median wording remains in those fields.
- `dist-lognormal-median`: the duplicate median formula between the problem and answer sections has been removed; the formula appears only in the answer section.
- All 57 cards were rechecked for mathematical correctness, definitions, supports, parameter conditions, boundary conditions, KaTeX validity, and one-card-one-topic structure. No new issue was found.

### Final totals

- fatal: 0
- major: 0
- minor: 0

## Final validation for metadata-fix re-review

- Command: `npm run anki:validate`
- Date: 2026-08-15
- Result: success

```text
> toukei-kentei-grade1-preparation@0.1.0 anki:validate
> node anki/scripts/validate_cards.mjs && node anki/scripts/build_site.mjs && node anki/scripts/build_site.mjs --check

validated 223 cards (0 warnings)
built 223 cards in 7 category page(s), max 200 per page
checked 223 cards in 7 category page(s), max 200 per page
```

## 初回指摘

初回指摘: `fatal: 0 / major: 6 / minor: 5`。

## 修正確認

修正確認: 全57カードを再査読し、台・母数化・境界条件・数式・計算例・1カード1論点を確認した。最終結果は `fatal: 0 / major: 0 / minor: 0`。
