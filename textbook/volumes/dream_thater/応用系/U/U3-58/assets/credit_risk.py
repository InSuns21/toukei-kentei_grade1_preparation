"""Exact finite-state credit loss, VaR and ES: U3-58.

All probabilities and currency amounts use rational arithmetic.
No external packages, data, or randomness.
"""
from __future__ import annotations

import argparse
from fractions import Fraction


def metrics(states: list[tuple[Fraction, Fraction]], alpha: Fraction):
    """Return (expected loss, left-quantile VaR, tail-integral ES).

    states: (P(state), loss) pairs; 0 < alpha < 1.
    """
    if not Fraction(0) < alpha < Fraction(1):
        raise ValueError("alpha must be strictly between 0 and 1")
    if not states or any(p < 0 for p, _ in states):
        raise ValueError("states must have nonnegative probabilities")
    if sum((p for p, _ in states), Fraction(0)) != Fraction(1):
        raise ValueError("state probabilities must sum to 1")

    expectation = sum((p * loss for p, loss in states), Fraction(0))
    cumulative = Fraction(0)
    var = None
    for probability, loss in sorted(states, key=lambda x: x[1]):
        cumulative += probability
        if cumulative >= alpha:
            var = loss
            break
    assert var is not None

    remaining = Fraction(1) - alpha
    tail_sum = Fraction(0)
    for probability, loss in sorted(states, key=lambda x: x[1], reverse=True):
        allocated = min(probability, remaining)
        tail_sum += allocated * loss
        remaining -= allocated
        if remaining == 0:
            break
    assert remaining == 0
    return expectation, var, tail_sum / (Fraction(1) - alpha)


def scenario(name: str) -> list[tuple[Fraction, Fraction]]:
    """Four synthetic financial examples; amounts are in ten-thousand yen."""
    if name == "single":
        return [(Fraction(98, 100), Fraction(0)),
                (Fraction(2, 100), Fraction(60))]
    if name == "independent":
        return [(Fraction(81, 100), Fraction(0)),
                (Fraction(18, 100), Fraction(60)),
                (Fraction(1, 100), Fraction(120))]
    if name == "clustered":
        return [(Fraction(9, 10), Fraction(0)),
                (Fraction(1, 10), Fraction(120))]
    if name == "wrong-way":
        return [(Fraction(9, 10), Fraction(0)),
                (Fraction(1, 10), Fraction(60))]
    raise ValueError("unknown scenario")


def main() -> None:
    parser = argparse.ArgumentParser(description="U3-58 finite-state credit risk")
    parser.add_argument("--scenario", choices=["single", "independent", "clustered", "wrong-way"],
                        default="independent")
    parser.add_argument("--alpha", default="0.95",
                        help="confidence level, e.g. 0.95 or 0.99")
    args = parser.parse_args()
    alpha = Fraction(args.alpha)
    el, var, es = metrics(scenario(args.scenario), alpha)
    print(f"scenario={args.scenario}, alpha={alpha}")
    for name, value in (("expected_loss", el), ("VaR", var), ("ES", es)):
        print(f"{name}={value} man-yen (decimal {float(value):.6f})")


if __name__ == "__main__":
    main()
