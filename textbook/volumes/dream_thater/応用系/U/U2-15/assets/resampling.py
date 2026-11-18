#!/usr/bin/env python3
"""U2-15: multinomial resampling, ESS and ancestor diversity.

All exact calculations use fractions. Only the optional trial experiment
uses pseudorandom numbers, with a fixed seed for reproducibility.
"""
from __future__ import annotations

import argparse
from fractions import Fraction as F
from random import Random

WEIGHTS = (F(1, 2), F(1, 4), F(1, 8), F(1, 8))
VALUES = (F(0), F(1), F(2), F(3))
FIXED_UNIFORMS = (0.10, 0.40, 0.55, 0.80)


def normalize(values: tuple[F, ...]) -> tuple[F, ...] | None:
    if any(value < 0 for value in values):
        raise ValueError("weights must be nonnegative")
    total = sum(values, F(0))
    return tuple(value / total for value in values) if total > 0 else None


def ess(weights: tuple[F, ...]) -> F:
    if not weights or any(weight < 0 for weight in weights):
        raise ValueError("invalid weights")
    if sum(weights, F(0)) != 1:
        raise ValueError("ESS expects normalized weights")
    return 1 / sum((weight * weight for weight in weights), F(0))


def ancestors(weights: tuple[F, ...], uniforms: tuple[float, ...]) -> tuple[int, ...]:
    if sum(weights, F(0)) != 1 or any(weight < 0 for weight in weights):
        raise ValueError("invalid categorical distribution")
    cumulative = []
    total = F(0)
    for weight in weights:
        total += weight
        cumulative.append(total)
    result = []
    for u in uniforms:
        if not (0 <= u < 1):
            raise ValueError("uniforms must lie in [0, 1)")
        result.append(next(i for i, cdf in enumerate(cumulative) if u < cdf))
    return tuple(result)


def expected_unique(weights: tuple[F, ...]) -> F:
    return sum((1 - (1 - weight) ** len(weights) for weight in weights), F(0))


def weighted_mean(weights: tuple[F, ...], values: tuple[F, ...]) -> F:
    return sum((w * x for w, x in zip(weights, values)), F(0))


def conditional_variance(weights: tuple[F, ...], values: tuple[F, ...]) -> F:
    n = len(weights)
    mean = weighted_mean(weights, values)
    return (weighted_mean(weights, tuple(x * x for x in values)) - mean * mean) / n


def show_fixed() -> None:
    draws = ancestors(WEIGHTS, FIXED_UNIFORMS)
    frequencies = tuple(draws.count(i) for i in range(len(WEIGHTS)))
    new_values = tuple(VALUES[i] for i in draws)
    new_weights = tuple(F(1, len(WEIGHTS)) for _ in draws)
    print("Initial weights:", tuple(map(str, WEIGHTS)))
    print("ESS before:", str(ess(WEIGHTS)), "=", float(ess(WEIGHTS)))
    print("Uniform draws:", FIXED_UNIFORMS)
    print("Ancestor indices (1-based):", tuple(i + 1 for i in draws))
    print("Counts of original ancestors:", frequencies)
    print("Selected function values:", tuple(map(str, new_values)))
    print("Weighted mean before:", weighted_mean(WEIGHTS, VALUES))
    print("Realized mean after:", sum(new_values, F(0)) / len(draws))
    print("ESS after:", ess(new_weights))
    print("Number of different ancestor indices:", len(set(draws)))


def show_trials() -> None:
    rng = Random(20261119)
    repetitions = 12000
    means = []
    unique_counts = []
    losses = 0
    for _ in range(repetitions):
        draws = ancestors(WEIGHTS, tuple(rng.random() for _ in range(4)))
        means.append(float(sum((VALUES[i] for i in draws), F(0)) / 4))
        unique_counts.append(len(set(draws)))
        losses += 3 not in draws
    theoretical_mean = weighted_mean(WEIGHTS, VALUES)
    theoretical_variance = conditional_variance(WEIGHTS, VALUES)
    average = sum(means) / repetitions
    empirical_variance = sum((x - average) ** 2 for x in means) / repetitions
    print("Fixed seed: 20261119; draws:", repetitions)
    print("Theoretical mean:", theoretical_mean, "estimated:", round(average, 6))
    print("Theoretical variance:", theoretical_variance,
          "estimated:", round(empirical_variance, 6))
    print("Expected distinct ancestors:", expected_unique(WEIGHTS),
          "estimated:", round(sum(unique_counts) / repetitions, 6))
    print("Probability ancestor #4 is lost:", (1 - WEIGHTS[3]) ** 4,
          "estimated:", round(losses / repetitions, 6))
    print("All draws are independent conditional on the original weights.")


def show_collapse() -> None:
    positions = ("A", "A", "B", "B")
    weights = (F(3, 8), F(3, 8), F(1, 8), F(1, 8))
    draws = ancestors(weights, (0.10, 0.30, 0.50, 0.70))
    new_positions = tuple(positions[i] for i in draws)
    likelihood = {"A": F(1, 4), "B": F(1)}
    new_raw = tuple(likelihood[x] for x in new_positions)
    new_weights = normalize(new_raw)
    assert new_weights is not None
    old_b_mass = sum((w for x, w in zip(positions, weights) if x == "B"), F(0))
    old_a_mass = 1 - old_b_mass
    exact = normalize((old_a_mass * likelihood["A"], old_b_mass * likelihood["B"]))
    assert exact is not None
    after_b_mass = sum((w for x, w in zip(new_positions, new_weights)
                        if x == "B"), F(0))
    print("Ancestor indices:", tuple(i + 1 for i in draws))
    print("Resampled positions:", new_positions)
    print("After observation, approximate P(B):", after_b_mass)
    print("Exact update from old weighted belief, P(B):", exact[1])
    print("ESS after update:", ess(new_weights))
    print("ESS is maximal here although the B hypothesis has disappeared.")


def self_test() -> None:
    assert sum(WEIGHTS, F(0)) == 1
    assert ess(WEIGHTS) == F(32, 11)
    assert expected_unique(WEIGHTS) == F(5015, 2048)
    assert weighted_mean(WEIGHTS, VALUES) == F(7, 8)
    assert conditional_variance(WEIGHTS, VALUES) == F(71, 256)
    assert ancestors(WEIGHTS, FIXED_UNIFORMS) == (0, 0, 1, 2)
    assert ess(tuple(F(1, 4) for _ in range(4))) == 4
    assert ess((F(1), F(0), F(0), F(0))) == 1
    assert normalize((F(0), F(0))) is None
    assert (1 - WEIGHTS[3]) ** 4 == F(2401, 4096)
    assert ess((F(3, 10), F(3, 10), F(3, 10), F(1, 10))) == F(25, 7)
    assert (F(9, 10)) ** 4 == F(6561, 10000)
    show_collapse()
    print("All exact U2-15 checks passed.")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--scenario", choices=("fixed", "trials", "collapse"),
                        default="fixed")
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        self_test()
    elif args.scenario == "fixed":
        show_fixed()
    elif args.scenario == "trials":
        show_trials()
    else:
        show_collapse()


if __name__ == "__main__":
    main()
