"""Synthetic U3-55 finite-scenario stress and liquidity calculator (stdlib only).

All amounts are in ten-thousand JPY; returns are dimensionless.
No scenario probability is inferred.
"""
from __future__ import annotations

import argparse
import math
from dataclasses import dataclass


@dataclass(frozen=True)
class Scenario:
    name: str
    x: float
    y: float
    half_spread: float
    depth_a: float
    depth_b: float


SCENARIOS = (
    Scenario("normal", -0.05, -0.04, 0.005, 600.0, 400.0),
    Scenario("joint", -0.30, -0.25, 0.02, 150.0, 80.0),
    Scenario("divergent", -0.30, 0.10, 0.02, 150.0, 80.0),
)


def market_loss(s: Scenario, kappa: float = 0.0) -> float:
    if s.x < -1 or s.y < -1 or kappa < 0:
        raise ValueError("returns >= -1 and kappa >= 0 are required")
    return -60.0 * s.x - 40.0 * s.y + kappa * s.x**2


def liquidity_cost(s: Scenario) -> float:
    if s.half_spread < 0 or s.depth_a <= 0 or s.depth_b <= 0:
        raise ValueError("nonnegative spread and strictly positive depths required")
    spread = s.half_spread * (60.0 + 40.0)
    impact = 0.05 * (60.0**2 / s.depth_a + 40.0**2 / s.depth_b)
    return spread + impact


def reverse_level(threshold: float, a: float = 100.0,
                  kappa: float = 0.0, c: float = 4.2) -> float | None:
    if a <= 0 or kappa < 0 or c < 0:
        raise ValueError("a>0, kappa>=0 and c>=0 required")
    if threshold <= c:
        return 0.0
    if threshold > a + kappa + c:
        return None
    z = threshold - c
    return 2.0 * z / (a + math.sqrt(a * a + 4 * kappa * z))


def worst_case(scenarios=SCENARIOS, kappas=(0.0, 20.0)):
    if not scenarios or not kappas:
        raise ValueError("scenario and model sets must be nonempty")
    return max(
        (market_loss(s, k) + liquidity_cost(s), s.name, k)
        for s in scenarios for k in kappas
    )


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--case", choices=("all", "joint"), default="all")
    args = parser.parse_args()
    scenarios = SCENARIOS if args.case == "all" else (SCENARIOS[1],)
    print("amounts: 10k JPY; synthetic scenarios; NO probabilities")
    print("name       L1       L2        C     L1+C     L2+C")
    for s in scenarios:
        c = liquidity_cost(s)
        l1, l2 = market_loss(s), market_loss(s, 20.0)
        print(f"{s.name:9} {l1:7.3f} {l2:8.3f} {c:8.3f} "
              f"{l1+c:8.3f} {l2+c:8.3f}")
    w, state, kappa = worst_case(scenarios)
    print(f"worst in selected set: {w:.3f}; scenario={state}; kappa={kappa:g}")
    for k in (0.0, 20.0):
        t = reverse_level(20.0, kappa=k)
        assert t is not None
        print(f"threshold 20, kappa={k:g}: shock={100*t:.8f}%, "
              f"check={100*t+k*t*t+4.2:.8f}")


if __name__ == "__main__":
    main()
