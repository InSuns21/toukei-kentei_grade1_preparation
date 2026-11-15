"""Ex-ante VaR hit backtesting; standard-library-only reproducible examples.

The forecast is fixed before the held-out synthetic loss is evaluated.
All calculations use strict L_t > VaR_t and conditional transition likelihoods.
No calibration is performed on the evaluation data.
"""
from __future__ import annotations

import argparse
import math
import random
from typing import Sequence


def hit_flags(losses: Sequence[float], forecasts: Sequence[float]) -> list[int]:
    """Convert pre-saved forecasts and subsequent realized losses into hits."""
    if len(losses) != len(forecasts) or len(losses) < 2:
        raise ValueError("equal lengths of at least two days required")
    if any(not math.isfinite(x) for x in list(losses) + list(forecasts)):
        raise ValueError("nonfinite losses or forecasts")
    return [int(loss > var) for loss, var in zip(losses, forecasts)]


def transitions(hits: Sequence[int]) -> tuple[int, int, int, int]:
    if len(hits) < 2 or any(x not in (0, 1) for x in hits):
        raise ValueError("need at least two binary hits")
    n00 = n01 = n10 = n11 = 0
    for previous, current in zip(hits, hits[1:]):
        if (previous, current) == (0, 0):
            n00 += 1
        elif (previous, current) == (0, 1):
            n01 += 1
        elif (previous, current) == (1, 0):
            n10 += 1
        else:
            n11 += 1
    return n00, n01, n10, n11


def bernoulli_loglik(successes: int, trials: int, rate: float) -> float:
    """Bernoulli log likelihood, with correct endpoint/zero-count handling."""
    if not 0 <= successes <= trials or not 0 <= rate <= 1:
        raise ValueError("invalid count or probability")
    if rate == 0:
        return 0.0 if successes == 0 else -math.inf
    if rate == 1:
        return 0.0 if successes == trials else -math.inf
    return successes * math.log(rate) + (trials - successes) * math.log1p(-rate)


def lr_uc(hits: Sequence[int], p: float) -> float:
    if not 0 < p < 1 or len(hits) < 2 or any(x not in (0, 1) for x in hits):
        raise ValueError("invalid hit series or null rate")
    k, n = sum(hits), len(hits)
    return max(0.0, 2 * (bernoulli_loglik(k, n, k / n)
                           - bernoulli_loglik(k, n, p)))


def lr_ind(hits: Sequence[int]) -> float | None:
    """Christoffersen first-order independence likelihood ratio.

    Condition on first hit. Return None when one predecessor state is
    unobserved: its transition parameter is unidentified. The chi-square
    approximation can be unreliable even when a row is observed, if its
    MLE is on the boundary.
    """
    n00, n01, n10, n11 = transitions(hits)
    n0, n1 = n00 + n01, n10 + n11
    if not n0 or not n1:
        return None
    pooled = (n01 + n11) / (n0 + n1)
    log_null = bernoulli_loglik(n01 + n11, n0 + n1, pooled)
    log_markov = (bernoulli_loglik(n01, n0, n01 / n0)
                  + bernoulli_loglik(n11, n1, n11 / n1))
    return max(0.0, 2 * (log_markov - log_null))


def exact_upper_binomial_tail(n: int, k: int, p: float) -> float:
    """P_p[Bin(n,p) >= k], computed by a short finite sum."""
    if not (0 <= k <= n and 0 < p < 1):
        raise ValueError("invalid binomial inputs")
    return sum(math.comb(n, j) * p**j * (1 - p)**(n - j)
               for j in range(k, n + 1))


def scenario(name: str, n: int) -> tuple[list[int], float]:
    if name in ("spread", "clustered"):
        selected = ({2, 3, 6, 9, 12, 15} if name == "spread"
                    else {4, 5, 6, 7, 8, 10})
        return [int(day in selected) for day in range(1, 21)], 0.30
    if name == "undercoverage":
        return [int(day in set(range(5, 100, 10))) for day in range(1, 101)], 0.05
    if not 20 <= n <= 1000:
        raise ValueError("20 <= --n <= 1000 required for generated scenarios")
    rng = random.Random(5353)
    p = 0.05
    if name == "iid":
        return [int(rng.random() < p) for _ in range(n)], p
    if name == "markov":
        # Stationary hit probability p, but substantial clustering.
        p11 = 0.50
        p01 = p * (1 - p11) / (1 - p)
        hits = [int(rng.random() < p)]
        for _ in range(1, n):
            next_p = p11 if hits[-1] else p01
            hits.append(int(rng.random() < next_p))
        return hits, p
    raise ValueError("unknown scenario")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--scenario", choices=["spread", "clustered",
                        "undercoverage", "iid", "markov"], default="spread")
    parser.add_argument("--n", type=int, default=100)
    args = parser.parse_args()
    expected_hits, p = scenario(args.scenario, args.n)

    # Synthetic held-out losses (in 10,000 JPY). Forecasts are fixed at 10
    # BEFORE the synthetic observations are formed and inspected.
    ex_ante_var = [10.0] * len(expected_hits)
    realized_loss = [11.0 if hit else 9.0 for hit in expected_hits]
    hits = hit_flags(realized_loss, ex_ante_var)
    assert hits == expected_hits
    k = sum(hits)
    counts = transitions(hits)
    uc, ind = lr_uc(hits, p), lr_ind(hits)
    print(f"scenario={args.scenario}, n={len(hits)}, alpha={1-p:.2f}, "
          f"target_rate={p:.2f}, hits={k}, observed_rate={k/len(hits):.4f}")
    print("hit days (1-based):", [i for i, x in enumerate(hits, 1) if x])
    print("transitions n00,n01,n10,n11:", counts)
    print(f"LRuc={uc:.6f}")
    if ind is None:
        print("LRind=undefined (one predecessor state unobserved)")
    else:
        print(f"LRind={ind:.6f}, LRcc={uc+ind:.6f}")
        n00, n01, n10, n11 = counts
        pi01, pi11 = n01 / (n00 + n01), n11 / (n10 + n11)
        print(f"p01={pi01:.6f}, p11={pi11:.6f}; "
              "chi-square thresholds are asymptotic only")
    print("binomial upper-tail P[K>=observed] (IID null only): "
          f"{exact_upper_binomial_tail(len(hits), k, p):.8f}")
    print("Caution: single synthetic sample; no out-of-sample fitting was done.")


if __name__ == "__main__":
    main()
