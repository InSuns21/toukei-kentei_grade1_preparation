#!/usr/bin/env python3
"""U2-14: deterministic, exact-fraction sequential importance sampling lab.

No resampling is carried out in this lecture. All calculations use the
same three-state example and the one fixed particle realization as index.md.
"""
from __future__ import annotations

import argparse
from fractions import Fraction as F

STATES = ("A", "B", "C")
MU1 = (F(1, 2), F(1, 3), F(1, 6))
Q1 = (F(1, 4), F(1, 2), F(1, 4))
G1 = (F(1, 5), F(4, 5), F(1, 2))
M2 = (
    (F(1, 2), F(1, 2), F(0)),
    (F(0), F(1, 2), F(1, 2)),
    (F(1, 2), F(0), F(1, 2)),
)
G2 = (F(1, 4), F(1, 2), F(1))
INITIAL_PARTICLES = ("A", "B", "B", "C")
MOVED_PARTICLES = ("B", "B", "C", "A")


def divide_by_total(values: tuple[F, ...]) -> tuple[F, ...] | None:
    total = sum(values, F(0))
    if total <= 0:
        return None
    return tuple(value / total for value in values)


def aggregate(particles: tuple[str, ...], weights: tuple[F, ...]) -> tuple[F, ...]:
    return tuple(
        sum((weight for state, weight in zip(particles, weights)
             if state == target), F(0))
        for target in STATES
    )


def initial() -> dict:
    gamma = tuple(p * likelihood for p, likelihood in zip(MU1, G1))
    posterior = divide_by_total(gamma)
    assert posterior is not None
    raw = tuple(gamma[STATES.index(x)] / Q1[STATES.index(x)]
                for x in INITIAL_PARTICLES)
    weights = divide_by_total(raw)
    assert weights is not None
    return {"gamma": gamma, "evidence": sum(gamma), "posterior": posterior,
            "raw": raw, "weights": weights, "aggregate": aggregate(INITIAL_PARTICLES, weights)}


def sequential() -> dict:
    start = initial()
    # For the bootstrap proposal r_2 = M_2, the transition ratio M_2 / r_2 is 1.
    for parent, child in zip(INITIAL_PARTICLES, MOVED_PARTICLES):
        assert M2[STATES.index(parent)][STATES.index(child)] > 0
    raw = tuple(weight * G2[STATES.index(child)]
                for weight, child in zip(start["weights"], MOVED_PARTICLES))
    weights = divide_by_total(raw)
    assert weights is not None
    approximate = aggregate(MOVED_PARTICLES, weights)
    predicted = tuple(
        sum((start["posterior"][i] * M2[i][j] for i in range(3)), F(0))
        for j in range(3)
    )
    gamma = tuple(predicted[j] * G2[j] for j in range(3))
    exact = divide_by_total(gamma)
    assert exact is not None
    return {"raw": raw, "weights": weights, "approximate": approximate,
            "predicted": predicted, "gamma": gamma, "evidence": sum(gamma),
            "exact": exact}


def bar(probability: F, width: int = 30) -> str:
    # Text shape is not dependent on color.
    count = round(float(probability * width))
    return "#" * count + "." * (width - count)


def print_distribution(label: str, distribution: tuple[F, ...]) -> None:
    print(label)
    for state, probability in zip(STATES, distribution):
        print(f"  {state}: {str(probability):>8} = {float(probability):.6f} {bar(probability)}")
    print(f"  total: {sum(distribution, F(0))}")


def show_initial() -> None:
    x = initial()
    print("Proposal q1:", tuple(map(str, Q1)))
    print("Particle draw:", INITIAL_PARTICLES)
    print("Unnormalized target gamma1:", tuple(map(str, x["gamma"])))
    print("Exact evidence Z1:", x["evidence"])
    print("Per-particle importance ratio:", tuple(map(str, x["raw"])))
    print("Per-particle normalized weight:", tuple(map(str, x["weights"])))
    print_distribution("Particle approximation at time 1", x["aggregate"])
    print_distribution("Exact posterior at time 1", x["posterior"])


def show_sequential() -> None:
    show_initial()
    x = sequential()
    print("\nParticle motion:", tuple(zip(INITIAL_PARTICLES, MOVED_PARTICLES)))
    print("Second-step raw weights:", tuple(map(str, x["raw"])))
    print("Second-step normalized weights:", tuple(map(str, x["weights"])))
    print_distribution("Particle approximation at time 2", x["approximate"])
    print_distribution("Exact prediction at time 2", x["predicted"])
    print("Exact evidence given first observation:", x["evidence"])
    print_distribution("Exact posterior at time 2", x["exact"])
    print("B-state finite-sample excess:",
          x["approximate"][1] - x["exact"][1])


def show_zero() -> None:
    gamma = (F(1), F(0))
    proposal = (F(1, 2), F(1, 2))
    particle_indices = (1, 1)
    weights = tuple(gamma[i] / proposal[i] for i in particle_indices)
    print("True evidence:", sum(gamma))
    print("Proposal support covers target support:", proposal[0] > 0)
    print("Particle realization: (B, B)")
    print("Particle weights:", tuple(map(str, weights)))
    print("Sum of sampled weights:", sum(weights))
    print("Normalized estimate:", divide_by_total(weights))
    print("The true evidence is positive, but this sample has no usable weight.")


def self_test() -> None:
    assert sum(MU1) == sum(Q1) == F(1)
    assert all(sum(row) == F(1) and all(p >= 0 for p in row) for row in M2)
    first = initial()
    assert first["gamma"] == (F(1, 10), F(4, 15), F(1, 12))
    assert first["evidence"] == F(9, 20)
    assert first["raw"] == (F(2, 5), F(8, 15), F(8, 15), F(1, 3))
    assert first["weights"] == (F(6, 27), F(8, 27), F(8, 27), F(5, 27))
    assert first["aggregate"] == first["posterior"] == (F(6, 27), F(16, 27), F(5, 27))
    second = sequential()
    assert second["weights"] == (F(12, 65), F(16, 65), F(32, 65), F(5, 65))
    assert second["approximate"] == (F(5, 65), F(28, 65), F(32, 65))
    assert second["predicted"] == (F(11, 54), F(22, 54), F(21, 54))
    assert second["evidence"] == F(139, 216)
    assert second["exact"] == (F(11, 139), F(44, 139), F(84, 139))
    assert second["approximate"][1] - second["exact"][1] == F(1032, 9035)
    assert divide_by_total((F(0), F(0))) is None
    print("All U2-14 fraction arithmetic and support checks passed.")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--scenario", choices=["initial", "sequential", "zero"],
                        default="sequential")
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        self_test()
    elif args.scenario == "initial":
        show_initial()
    elif args.scenario == "zero":
        show_zero()
    else:
        show_sequential()


if __name__ == "__main__":
    main()
