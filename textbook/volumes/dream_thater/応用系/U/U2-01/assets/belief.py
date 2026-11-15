"""U2-01: exact finite-state Bayesian location update (Python 3.10+)."""

from __future__ import annotations

import argparse
from fractions import Fraction
from typing import Sequence


def update(
    prior: Sequence[Fraction], likelihood: Sequence[Fraction]
) -> tuple[Fraction, tuple[Fraction, ...]]:
    """Return (evidence, posterior); refuse impossible or invalid models."""
    if not prior or len(prior) != len(likelihood):
        raise ValueError("prior and likelihood must have the same nonzero length")
    if any(x < 0 for x in prior) or sum(prior) != 1:
        raise ValueError("prior must be nonnegative and sum to one")
    if any(not 0 <= x <= 1 for x in likelihood):
        raise ValueError("each observed-event probability must be in [0, 1]")
    weights = tuple(p * q for p, q in zip(prior, likelihood))
    evidence = sum(weights)
    if evidence == 0:
        raise ValueError("observed event has probability zero under this model")
    posterior = tuple(weight / evidence for weight in weights)
    assert sum(posterior) == 1
    return evidence, posterior


def scenario(name: str) -> tuple[tuple[str, ...], tuple[Fraction, ...], tuple[Fraction, ...]]:
    f = Fraction
    if name == "three":
        return ("L", "M", "R"), (f(1, 2), f(1, 3), f(1, 6)), (
            f(1, 4), f(3, 4), f(1, 2))
    if name == "prior-left":
        return ("L", "R"), (f(4, 5), f(1, 5)), (f(3, 4), f(1, 4))
    if name == "prior-right":
        return ("L", "R"), (f(1, 5), f(4, 5)), (f(3, 4), f(1, 4))
    if name == "impossible":
        return ("L", "R"), (f(1, 2), f(1, 2)), (f(0), f(0))
    raise ValueError(f"unknown scenario: {name}")


def main() -> None:
    parser = argparse.ArgumentParser(description="U2-01 exact location belief")
    parser.add_argument(
        "--scenario", choices=("three", "prior-left", "prior-right", "impossible"),
        default="three")
    args = parser.parse_args()
    places, prior, likelihood = scenario(args.scenario)
    print("time=0; fixed map; observation=B; no motion")
    for s, p, q in zip(places, prior, likelihood):
        print(f"{s}: prior={p}; P(B|{s})={q}; joint={p*q}")
    try:
        evidence, posterior = update(prior, likelihood)
    except ValueError as exc:
        print(f"undefined posterior: {exc}")
        return
    print(f"evidence={evidence}")
    for s, value in zip(places, posterior):
        print(f"posterior({s})={value}")
    print(f"sum posterior={sum(posterior)}")


if __name__ == "__main__":
    main()
