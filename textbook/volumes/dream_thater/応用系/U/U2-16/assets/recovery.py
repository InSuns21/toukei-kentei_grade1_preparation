#!/usr/bin/env python3
"""U2-16 kidnapped robot recovery: exact finite-state calculations and sampling.

All analytical quantities are exact Fractions. Random draws use a fixed seed.
The script works in both a terminal and the python-file-lab browser runtime.
"""
from __future__ import annotations

import argparse
from fractions import Fraction as F
from random import Random

KAPPA = F(1, 5)
ALPHA = F(1, 5)
DELTA = F(1, 5)
PRIOR = (F(1), F(0))
EXPLORATION = (F(1, 2), F(1, 2))
LIKELIHOOD = (F(1, 10), F(9, 10))
OUTLIER_Y = F(1, 2)
N = 4
SEED = 20261119
REPETITIONS = 12000


def normalize(masses: tuple[F, ...]) -> tuple[F, ...] | None:
    """A finite Bayesian update, undefined for all-zero masses."""
    if not masses or any(x < 0 for x in masses):
        raise ValueError("masses must be nonnegative and nonempty")
    z = sum(masses, F(0))
    return tuple(x / z for x in masses) if z > 0 else None


def mixture(a: tuple[F, ...], b: tuple[F, ...], rate: F) -> tuple[F, ...]:
    if len(a) != len(b) or not F(0) <= rate <= F(1):
        raise ValueError("invalid mixture")
    if sum(a, F(0)) != 1 or sum(b, F(0)) != 1:
        raise ValueError("mixture inputs must be probability vectors")
    return tuple((1 - rate) * x + rate * y for x, y in zip(a, b))


def update(prior: tuple[F, ...], likelihood: tuple[F, ...]) -> tuple[F, ...] | None:
    return normalize(tuple(x * y for x, y in zip(prior, likelihood)))


def ess(weights: tuple[F, ...]) -> F | None:
    if not weights or sum(weights, F(0)) != 1 or any(w < 0 for w in weights):
        return None
    return 1 / sum((w * w for w in weights), F(0))


def get_exact():
    predicted = mixture(PRIOR, EXPLORATION, KAPPA)
    posterior = update(predicted, LIKELIHOOD)
    robust_likelihood = tuple((1 - DELTA) * g + DELTA * OUTLIER_Y for g in LIKELIHOOD)
    robust = update(predicted, robust_likelihood)
    z_normal = sum((p * g for p, g in zip(predicted, LIKELIHOOD)), F(0))
    z_robust = sum((p * g for p, g in zip(predicted, robust_likelihood)), F(0))
    lambda_outlier = DELTA * OUTLIER_Y / z_robust
    p_jump_and_y = KAPPA * sum((r * g for r, g in zip(EXPLORATION, LIKELIHOOD)), F(0))
    p_jump_given_y = p_jump_and_y / z_normal
    assert posterior is not None and robust is not None
    return predicted, posterior, robust_likelihood, robust, z_normal, z_robust, lambda_outlier, p_jump_given_y


def show_exact() -> None:
    predicted, posterior, robust_g, robust, z_g, z_mix, lam, jump_post = get_exact()
    print("S = (A, B), prior =", tuple(map(str, PRIOR)))
    print("normal motion = identity, exploration =", tuple(map(str, EXPLORATION)))
    print("kidnap rate =", KAPPA, "predicted =", tuple(map(str, predicted)))
    print("normal likelihood for y =", tuple(map(str, LIKELIHOOD)))
    print("normal evidence =", z_g, "posterior =", tuple(map(str, posterior)))
    print("P(kidnap event | y) =", jump_post, "(not P(B | y))")
    print("outlier rate =", DELTA, "outlier P(y) =", OUTLIER_Y)
    print("robust likelihood =", tuple(map(str, robust_g)))
    print("robust evidence =", z_mix, "posterior =", tuple(map(str, robust)))
    print("P(outlier event | y) =", lam)
    print("P(B | y, robust) =", robust[1])
    print("Counterexample: N particles all at A have ESS=N but P_particle(B)=0.")


def draw_state(rng: Random, probs: tuple[F, ...]) -> int:
    u = rng.random()
    cumulative = 0.0
    for i, p in enumerate(probs):
        cumulative += float(p)
        if u < cumulative:
            return i
    return len(probs) - 1


def show_sampling() -> None:
    rng = Random(SEED)
    predicted, *_ = get_exact()
    missing = 0
    for _ in range(REPETITIONS):
        sample = tuple(draw_state(rng, predicted) for _ in range(N))
        missing += 1 not in sample
    p_theory = (1 - predicted[1]) ** N
    print("seed =", SEED, "draws per trial =", N, "trials =", REPETITIONS)
    print("P(B in each proposal) =", predicted[1])
    print("exact P(no B) =", p_theory, "=", float(p_theory))
    print("empirical P(no B) =", round(missing / REPETITIONS, 6))
    print("Missed B despite the predicted distribution covering it.")


def show_zeros() -> None:
    predicted, *_ = get_exact()
    impossible_at_a = (F(0), F(1))
    z = sum((p * g for p, g in zip(predicted, impossible_at_a)), F(0))
    sample = (0, 0, 0, 0)  # a possible realized sample, all at A
    sample_raw = tuple(impossible_at_a[i] for i in sample)
    print("predicted =", tuple(map(str, predicted)))
    print("observed likelihood = (0, 1)")
    print("exact evidence =", z, "> 0")
    print("realized sample =", tuple("AB"[i] for i in sample))
    print("sample raw weights =", tuple(map(str, sample_raw)))
    print("normalized sample weights =", normalize(sample_raw))
    print("P(this all-A draw) =", (1 - predicted[1]) ** N)
    print("ESS undefined when all sample raw weights are zero.")


def self_test() -> None:
    predicted, posterior, robust_g, robust, z_g, z_mix, lam, jump_post = get_exact()
    assert predicted == (F(9, 10), F(1, 10))
    assert posterior == (F(1, 2), F(1, 2))
    assert z_g == F(9, 50) and jump_post == F(5, 9)
    assert robust_g == (F(9, 50), F(41, 50))
    assert z_mix == F(61, 250) and robust == (F(81, 122), F(41, 122))
    assert lam == F(25, 61)
    assert (1 - predicted[1]) ** N == F(6561, 10000)
    assert update(PRIOR, LIKELIHOOD) == (F(1), F(0))
    assert ess(tuple(F(1, 4) for _ in range(N))) == N
    assert normalize((F(0), F(0), F(0), F(0))) is None
    target = (F(3, 4), F(1, 4))
    proposal = mixture(target, EXPLORATION, ALPHA)
    assert proposal == (F(7, 10), F(3, 10))
    weights = (target[0] * F(1, 4) / proposal[0], target[1] / proposal[1])
    assert weights == (F(15, 56), F(5, 6))
    assert sum((q * w for q, w in zip(proposal, weights)), F(0)) == F(7, 16)
    assert update(target, (F(1, 4), F(1))) == (F(3, 7), F(4, 7))
    print("All exact U2-16 tests passed.")
    show_exact()
    show_zeros()


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--scenario", choices=("exact", "sampling", "zeros"), default="exact")
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        self_test()
    elif args.scenario == "sampling":
        show_sampling()
    elif args.scenario == "zeros":
        show_zeros()
    else:
        show_exact()


if __name__ == "__main__":
    main()
