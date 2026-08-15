initial_reviewer_id: math-reviewer-C04-20260815
final_reviewer_id: math-reviewer-C04-20260815
initial_reviewed_at: 2026-08-15T17:25:00.000Z
final_reviewed_at: 2026-08-15T17:50:00.000Z

# C04-limit-approximations independent mathematical review (initial)

- Reviewer ID: `math-reviewer-C04-20260815`
- Execution date: 2026-08-15
- Review type: initial independent mathematical review
- Scope: all 34 cards in `anki/cards/19_limit_approximations.md`, including all 8 cards with `published: false`
- Files not modified: card text, `anki/syllabus/coverage.yaml`, and `anki/progress.yaml`

## Method

- Read every card's problem, answer, theorem/formula, worked calculation, and note.
- Cross-checked `anki/notation.md`, `anki/formulae.md`, `anki/syllabus/syllabus.yaml`, and `anki/syllabus/coverage.yaml`.
- Independently recomputed the weak law via Chebyshev, the CLT standardizations, sample-mean probabilities, Bernoulli limits, binomial means and variances, continuity-correction directions, Poisson approximations, the binomial-to-Poisson limit, and complement probabilities.
- Recomputed representative numerical values: `dist-clt-sample-mean` gives endpoints `-2,2`; `dist-clt-normal-quantile` gives `1`; `dist-binomial-normal-tail` gives `1.95`; `dist-weak-law-variance-rate` gives `0.09`; `dist-poisson-approximation-complement` gives `1-3e^{-2} ~= 0.5940`; and `dist-poisson-tail-approximation` gives `1-e^{-2} ~= 0.8647`.
- Ran `npm run validate` after the review.

## Findings

### major

#### M1: `dist-normal-approximation-symmetry` (`anki/cards/19_limit_approximations.md:844-859`)

- The problem does not restrict `n` to be even, but the derivation sets the integer threshold to `k=n/2`.
- If `n` is odd, the integer-valued event `X >= n/2` is `X >= (n+1)/2`. The continuity-corrected lower boundary is then `n/2`, so the standardized point is `0`, not `-1/sqrt(n)`. The approximation is `Phi(0)=1/2`, not `Phi(1/sqrt(n))`.
- Counterexample: for `n=3`, the event is `X>=2`, the corrected normal event is `Y>=1.5` for `Y~N(1.5,0.75)`, and the standardized point is `0`; the card's formula gives `Phi(1/sqrt(3))`.
- Fix: state `n` is even, or split the derivation by parity and use `X >= (n+1)/2` for odd `n`.

### minor

#### m1: `dist-clt-sum-variance` (`anki/cards/19_limit_approximations.md:282-291`)

- The CLT standardization requires `0 < sigma^2 < infinity`, but the problem only introduces a variance `sigma^2`. If `sigma^2=0`, the denominator `sigma sqrt(n)` is zero.
- Fix: add `0 < sigma^2 < infinity` to the assumptions.

#### m2: `dist-continuity-correction-tail` (`anki/cards/19_limit_approximations.md:470-489`)

- The problem does not state that `k` is an integer. The transformations for `X>k` and `X<k` require `k in Z`.
- The worked line `X>k\ leftrightarrow X>=k+1` is missing the backslash before `leftrightarrow`, so the displayed equivalence is malformed.
- Fix: state `k in Z` and write `X>k\ \leftrightarrow\ X>=k+1`.

#### m3: `dist-poisson-limit-derivation` (`anki/cards/19_limit_approximations.md:586-601`)

- `Binomial(n,lambda/n)` is not defined for every positive integer `n` when `lambda/n>1`; the product expansion also requires `n>=x`.
- The limit calculation is correct eventually. State that `n` is sufficiently large, e.g. `n>=max(lambda,x)` (with an integer bound understood).

#### m4: `dist-law-small-numbers` (`anki/cards/19_limit_approximations.md:624-638`)

- After fixing one value `n=10^4` and `p_n=2/10^4=0.0002`, the card writes `p_n=0.0002 -> 0`. A single number is not a sequence with a limit.
- Fix: define `p_n=2/n` and then give `n=10^4` as an example, or say only that `0.0002` is small.

#### m5: `dist-approximation-choice` (`anki/cards/19_limit_approximations.md:661-675`)

- For `Binomial(30,0.4)`, the card calls `np=12` and `n(1-p)=18` insufficient without specifying a threshold. Depending on the rule of thumb, normal approximation can also be a reasonable candidate.
- Fix: state the adopted threshold, or say exact calculation is preferred because it is easy while normal approximation remains a possible rough approximation.

#### m6: `dist-approximation-error` (`anki/cards/19_limit_approximations.md:696-705`)

- The claim that increasing `n` improves the normal approximation assumes fixed `p` in a non-degenerate regime. If `p=p_n -> 0`, the Poisson limit can govern instead.
- Fix: add the condition that `p` is fixed and `np,n(1-p) -> infinity` for the normal-approximation statement.

#### m7: `dist-clt-bernoulli-count` (`anki/cards/19_limit_approximations.md:1063-1075`)

- At `p=0` or `p=1`, `np(1-p)=0`, so the displayed standardization is undefined. The non-degenerate Bernoulli CLT requires `0<p<1` and `n -> infinity`.
- Fix: add these assumptions; for finite-sample normal approximation also state that `np` and `n(1-p)` are sufficiently large.

#### m8: `dist-normal-approximation-standardization` (`anki/cards/19_limit_approximations.md:1208-1222`)

- At `p=0` or `p=1`, `sqrt(np(1-p))=0`, so the standardization is undefined. A normal approximation additionally needs `np` and `n(1-p)` sufficiently large.
- The worked example mentions the approximation condition, but the general problem statement does not state the domain. Add `0<p<1` and the approximation condition to the problem or answer.

## No finding

For the other 26 cards, the definitions, supports and parameters, formulas, standardizations, continuity-correction directions, complements, numerical calculations, and answers matched independent recomputation. In particular, `dist-binomial-normal-tail` uses `X>=220 -> Y>=219.5`, `dist-normal-approximation-continuity-full` expands both endpoints by `0.5`, `dist-poisson-limit-derivation` has the correct limiting factors, and `dist-clt-bernoulli-proportion` has limiting variance `0.21`.

## Machine validation

`npm run validate` was executed on 2026-08-15 and succeeded. The command reported successful structure/dependency/progress validation, successful KaTeX strict validation for 255 Markdown files, and successful text validation for 237 generated texts.

This validates structure, KaTeX, and text checks; it does not resolve the mathematical applicability findings above.

## Counts

- fatal: 0
- major: 1
- minor: 8


## Initial-review follow-up: re-review

- Reviewer ID: `math-reviewer-C04-20260815` (same as initial review)
- Re-review execution date: 2026-08-15
- Scope: the current full contents of `anki/cards/19_limit_approximations.md`, all 34 cards including `published: false`
- Independent procedure: reread the full current file, independently rechecked every prior finding and the formulas/calculations surrounding each affected card, then ran `npm run validate`.

### Initial findings and correction confirmation

- M1, `dist-normal-approximation-symmetry`: resolved. The problem now states that `n` is an even positive integer, so `k=n/2` and the correction `n/2-0.5` are valid.
- m1, `dist-clt-sum-variance`: resolved. The problem now assumes `0<operatorname{Var}(X_i)=sigma^2<infinity`.
- m2, `dist-continuity-correction-tail`: resolved. The problem now states `k in Z`, and the worked equivalence uses the valid `leftrightarrow` command.
- m3, `dist-poisson-limit-derivation`: resolved for the asymptotic statement. The problem now explicitly restricts attention to sufficiently large integer `n`, while `x` is fixed; hence the required eventual conditions `n>=x` and `lambda/n<=1` hold in the limit.
- m4, `dist-law-small-numbers`: resolved. The worked example now defines the sequence `p_n=2/n` before specializing to `n=10^4`.
- m5, `dist-approximation-choice`: resolved. The answer now states that exact binomial calculation is preferred because it is easy, while normal approximation remains a possible candidate for `Binomial(30,0.4)`.
- m6, `dist-approximation-error`: resolved. The normal-approximation improvement claim now states fixed `p` and the conditions `np->infinity` and `n(1-p)->infinity`; the Poisson regime is separately distinguished.
- m7, `dist-clt-bernoulli-count`: resolved. The problem now states `0<p<1` and `n->infinity`, and the finite-sample approximation conditions are included.
- m8, `dist-normal-approximation-standardization`: resolved. The problem now states `0<p<1` and asks for the finite-sample approximation condition; the answer and note state the condition and the endpoint exclusion.

### User-requested card change

`dist-approximation-error` was reread after removal of the connected exercise and its compressed-answer/partial-credit material. The current card contains one problem, one answer, one formula block, one worked example, and one note. The removed material is absent, and the remaining content is one coherent topic: distinguishing normal-approximation error, continuity correction, and Poisson approximation. The deletion does not create a mathematical or one-card-one-topic defect.

### Re-review result

All 34 current cards were reread and the prior calculations were rechecked. No new mathematical issue was found. The affected formulas, assumptions, parameter domains, continuity-correction directions, and numerical examples are now consistent with the stated scope.

## Final machine validation for re-review

`npm run validate` was executed on 2026-08-15 after the current-card re-review and succeeded:

- structure/dependency/progress validation: passed
- KaTeX strict validation: 255 Markdown files passed
- generated-text validation: 237 texts passed

## Final re-review counts

- fatal: 0
- major: 0
- minor: 0

## 初回指摘と修正確認

- 初回指摘: 初回査読で記録した指摘を保持する。
- 修正確認: 再査読で各指摘の修正を確認済み。

fatal: 0 / major: 0 / minor: 0


