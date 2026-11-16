"""U2-02: finite-state Bayes filtering with exact fractions (Python 3.10+)."""

from __future__ import annotations

import argparse
from fractions import Fraction as F
from typing import Sequence

Vector = tuple[F, ...]
Matrix = tuple[Vector, ...]


def predict(prior: Sequence[F], transitions: Sequence[Sequence[F]]) -> Vector:
    """Rows are departure states; columns are arrival states."""
    n = len(prior)
    if n == 0 or len(transitions) != n or any(len(row) != n for row in transitions):
        raise ValueError("transition must be an n by n matrix for a nonempty prior")
    if any(p < 0 for p in prior) or sum(prior) != 1:
        raise ValueError("prior must be a probability distribution")
    if any(value < 0 for row in transitions for value in row):
        raise ValueError("transition probabilities must be nonnegative")
    if any(sum(row) != 1 for row in transitions):
        raise ValueError("departure rows must sum to one")
    result = tuple(
        sum(prior[r] * transitions[r][s] for r in range(n)) for s in range(n)
    )
    assert sum(result) == 1
    return result


def update(predicted: Sequence[F], likelihood: Sequence[F]) -> tuple[F, Vector]:
    """Bayes update for a fixed observed event; zero evidence is an error."""
    if not predicted or len(predicted) != len(likelihood):
        raise ValueError("prediction and likelihood lengths must match")
    if any(p < 0 for p in predicted) or sum(predicted) != 1:
        raise ValueError("prediction must be a probability distribution")
    if any(q < 0 or q > 1 for q in likelihood):
        raise ValueError("observed-event probabilities must lie in [0,1]")
    weights = tuple(p * q for p, q in zip(predicted, likelihood))
    evidence = sum(weights)
    if evidence == 0:
        raise ValueError("observed event has probability zero under the model")
    posterior = tuple(w / evidence for w in weights)
    assert sum(posterior) == 1
    return evidence, posterior


def step(
    prior: Sequence[F], transitions: Sequence[Sequence[F]], likelihood: Sequence[F]
) -> tuple[Vector, F, Vector]:
    predicted = predict(prior, transitions)
    evidence, posterior = update(predicted, likelihood)
    return predicted, evidence, posterior


SYMMETRIC: Matrix = ((F(3, 4), F(1, 4)), (F(1, 4), F(3, 4)))
IDENTITY: Matrix = ((F(1), F(0)), (F(0), F(1)))
SENSOR_B: Vector = (F(1, 5), F(4, 5))


def scenario(name: str) -> tuple[Vector, Matrix, Vector, int]:
    if name == "flip":
        return (F(3, 4), F(1, 4)), SYMMETRIC, SENSOR_B, 1
    if name == "no-motion":
        return (F(3, 4), F(1, 4)), IDENTITY, SENSOR_B, 1
    if name == "rescue":
        return (F(1), F(0)), SYMMETRIC, (F(0), F(1)), 1
    if name == "impossible":
        return (F(1), F(0)), IDENTITY, (F(0), F(1)), 1
    if name == "two-steps":
        return (F(3, 4), F(1, 4)), SYMMETRIC, SENSOR_B, 2
    raise ValueError(f"unknown scenario: {name}")


def main() -> None:
    parser = argparse.ArgumentParser(description="U2-02 exact finite Bayes filter")
    parser.add_argument("--scenario", choices=(
        "flip", "no-motion", "rescue", "impossible", "two-steps"
    ), default="flip")
    args = parser.parse_args()
    prior, transitions, likelihood, n_steps = scenario(args.scenario)
    print("states=L,R; fixed map; known control; time_step=1; observed=B")
    print(f"initial belief={prior}; transition rows={transitions}")
    print(f"sensor P(B|state)={likelihood}")
    for t in range(1, n_steps + 1):
        predicted = predict(prior, transitions)
        print(f"t={t}; prediction={predicted}; sum={sum(predicted)}")
        try:
            evidence, posterior = update(predicted, likelihood)
        except ValueError as exc:
            print(f"t={t}; undefined posterior: {exc}")
            return
        print(f"t={t}; evidence={evidence}; posterior={posterior}; sum={sum(posterior)}")
        prior = posterior


if __name__ == "__main__":
    main()
