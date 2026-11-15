"""U3-54: ex-ante ES/VaR and predictive-distribution diagnostics.

Standard library only. The two forecast distributions are fixed BEFORE a
synthetic held-out evaluation series is inspected. Currency: 10,000 JPY.
For discrete forecasts, strict VaR hit rates need not equal 1-alpha.
"""
from __future__ import annotations

import argparse
import math
import random
from typing import Sequence


def validate_probability(p: float) -> None:
    if not math.isfinite(p) or not 0 <= p <= 1:
        raise ValueError("p must lie in [0,1]")


def two_point_var_es(p: float, alpha: float) -> tuple[float, float]:
    """P(L=0)=1-p, P(L=10)=p; left VaR and atom-aware ES."""
    validate_probability(p)
    if not math.isfinite(alpha) or not 0 < alpha < 1:
        raise ValueError("0 < alpha < 1 required")
    q = 0.0 if alpha <= 1 - p else 10.0
    # The positive-part ES identity handles mass at q without dropping ties.
    e = q + p * max(10 - q, 0) / (1 - alpha)
    return q, e


def tail_residual(loss: float, q: float, es: float, alpha: float) -> float:
    """q + (L-q)_+/(1-alpha) - ES, for integrable predicted losses."""
    if not all(math.isfinite(x) for x in (loss, q, es, alpha)):
        raise ValueError("nonfinite input")
    if not 0 < alpha < 1:
        raise ValueError("0 < alpha < 1 required")
    return q + max(loss - q, 0.0) / (1 - alpha) - es


def pinball(loss: float, q: float, alpha: float) -> float:
    if not all(math.isfinite(x) for x in (loss, q, alpha)) or not 0 < alpha < 1:
        raise ValueError("invalid pinball inputs")
    return (alpha - int(loss < q)) * (loss - q)


def crps_two_point(p: float, loss: float) -> float:
    """Exact proper CRPS = E|X-loss| - E|X-X'|/2 for X in {0,10}."""
    validate_probability(p)
    if not math.isfinite(loss):
        raise ValueError("nonfinite loss")
    return (1 - p) * abs(loss) + p * abs(10 - loss) - 10 * p * (1 - p)


def randomized_pit(p: float, loss: float, rng: random.Random) -> float:
    """F(loss-) + V{F(loss)-F(loss-)}, V independent uniform."""
    validate_probability(p)
    if not math.isfinite(loss):
        raise ValueError("nonfinite loss")
    if loss < 0:
        return 0.0
    if loss == 0:
        return rng.random() * (1 - p)
    if loss < 10:
        return 1 - p
    if loss == 10:
        return 1 - p + rng.random() * p
    return 1.0


def summary(losses: Sequence[float], p: float, alpha: float, seed: int = 54) -> dict:
    if len(losses) < 2 or any(not math.isfinite(x) for x in losses):
        raise ValueError("at least two finite held-out losses required")
    q, es = two_point_var_es(p, alpha)
    rng = random.Random(seed)
    pits = [randomized_pit(p, x, rng) for x in losses]
    bins = [0] * 5
    for u in pits:
        bins[min(4, int(u * 5))] += 1
    return {
        "n": len(losses), "q": q, "es": es,
        "strict_hits": sum(x > q for x in losses),
        "avg_tail_residual": sum(tail_residual(x, q, es, alpha) for x in losses) / len(losses),
        "avg_pinball": sum(pinball(x, q, alpha) for x in losses) / len(losses),
        "avg_crps": sum(crps_two_point(p, x) for x in losses) / len(losses),
        "pit_buckets": bins,
    }


def heldout_losses(scenario: str) -> list[float]:
    """Fixed validation observations; never used to fit forecast probabilities."""
    if scenario not in ("baseline", "severe"):
        raise ValueError("unknown scenario")
    observations = [0.0] * 20
    for one_based_day in (3, 8, 13, 18):
        observations[one_based_day - 1] = 10.0
    if scenario == "severe":
        observations[17] = 40.0
    return observations


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--scenario", choices=("baseline", "severe"),
                        default="baseline")
    args = parser.parse_args()
    alpha = 0.75
    losses = heldout_losses(args.scenario)
    print("synthetic holdout, 20 daily losses, unit: 10,000 JPY, alpha=0.75")
    print("Both ex-ante forecasts are fixed, with P(L=10)=p.")
    print("scenario:", args.scenario, "| loss>0 days:", [i + 1 for i, x in enumerate(losses) if x > 0])
    for label, p in (("calibrated", 0.20), ("thin-tail", 0.05)):
        result = summary(losses, p, alpha)
        print(f"{label:10s}: p={p:.2f}, VaR={result['q']:.2f}, "
              f"ES={result['es']:.2f}, hits={result['strict_hits']}/{result['n']}, "
              f"mean-tail-residual={result['avg_tail_residual']:.3f}, "
              f"pinball={result['avg_pinball']:.3f}, CRPS={result['avg_crps']:.4f}, "
              f"randomized-PIT-bins={result['pit_buckets']}")
    print("Discrete atoms: hit rate is NOT expected to equal 1-alpha.")
    print("PIT randomness is diagnostic, not a fitted parameter; 20 days lack test power.")


if __name__ == "__main__":
    main()
