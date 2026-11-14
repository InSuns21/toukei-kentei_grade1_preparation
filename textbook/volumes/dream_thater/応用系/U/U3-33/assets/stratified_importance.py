#!/usr/bin/env python3
"""U3-33: stratification / Gaussian-shift importance sampling for GBM digitals.

Only the Python standard library is required.
Run: python3 assets/stratified_importance.py --check
     python3 assets/stratified_importance.py --reps 200 --barrier-reps 100
All payoffs are in JPY and paid at maturity T. The path-monitoring contract
is discrete (m observation dates), not a continuously monitored barrier.
"""
from __future__ import annotations

import argparse
import math
import random
import statistics

S0, R, Q_DIV, SIGMA, T, H = 100.0, 0.03, 0.0, 0.2, 1.0, 180.0
D = math.exp(-R * T)
DRIFT = R - Q_DIV - 0.5 * SIGMA**2
B = SIGMA * math.sqrt(T)
A = S0 * math.exp(DRIFT * T)
THRESHOLD = math.log(H / A) / B
NORMAL = statistics.NormalDist()
STRATA = (0.0, 0.90, 0.99, 1.0)
SEED = 20261114


def upper_tail(z: float) -> float:
    return 0.5 * math.erfc(z / math.sqrt(2.0))


def digital(z: float) -> float:
    return D * float(z >= THRESHOLD)


def gaussian_weight(y: float, lam: float) -> float:
    return math.exp(-lam * y + 0.5 * lam * lam)


def theory() -> dict[str, float]:
    """Analytic oracle for the terminal-only digital, N=1536 evaluations."""
    pi = upper_tail(THRESHOLD)
    theta = pi / 0.01
    n = 1536
    var_plain = D * D * pi * (1.0 - pi) / n
    var_str = D * D * 0.01**2 * theta * (1.0 - theta) / 512
    lam = 2.0
    second_is = math.exp(lam * lam) * upper_tail(THRESHOLD + lam)
    var_is = D * D * (second_is - pi * pi) / n
    return dict(
        threshold=THRESHOLD, probability=pi, price=D * pi,
        plain_variance=var_plain, strata_variance=var_str,
        importance_variance=var_is, importance_event=upper_tail(THRESHOLD - lam),
        ess_fraction=math.exp(-lam * lam),
    )


def plain_once(rng: random.Random, n: int) -> float:
    return sum(digital(rng.gauss(0.0, 1.0)) for _ in range(n)) / n


def stratified_once(rng: random.Random, n_each: int) -> float:
    total = 0.0
    for lo, hi in zip(STRATA[:-1], STRATA[1:]):
        p = hi - lo
        subtotal = 0.0
        for _ in range(n_each):
            u = lo + p * rng.random()
            # random.Random.random() may return zero; endpoints have measure zero.
            u = min(max(u, 1e-15), 1.0 - 1e-15)
            z = NORMAL.inv_cdf(u)
            subtotal += digital(z)
        total += p * subtotal / n_each
    return total


def importance_once(rng: random.Random, n: int, lam: float) -> tuple[float, float]:
    weighted = 0.0
    sum_w = 0.0
    sum_w2 = 0.0
    for _ in range(n):
        y = rng.gauss(lam, 1.0)
        weight = gaussian_weight(y, lam)
        weighted += digital(y) * weight
        sum_w += weight
        sum_w2 += weight * weight
    ess = sum_w * sum_w / sum_w2
    return weighted / n, ess


def barrier_path(y: list[float]) -> bool:
    """Whether a discrete m-date GBM path touches H (includes maturity)."""
    m = len(y)
    if m < 1:
        raise ValueError("m must be >= 1")
    partial = 0.0
    for j, zj in enumerate(y, 1):
        partial += zj
        tj = T * j / m
        log_stock = math.log(S0) + DRIFT * tj + SIGMA * math.sqrt(T / m) * partial
        if log_stock >= math.log(H):
            return True
    return False


def path_weight(y: list[float], lam: float) -> float:
    """Product of m scalar normal density ratios for mean lam/sqrt(m)."""
    m = len(y)
    if m < 1:
        raise ValueError("m must be >= 1")
    return math.exp(-lam / math.sqrt(m) * sum(y) + lam * lam / 2.0)


def barrier_once(
    rng: random.Random, n: int, m: int, lam: float,
) -> tuple[float, float]:
    weighted_sum = 0.0
    events = 0
    for _ in range(n):
        y = [rng.gauss(lam / math.sqrt(m), 1.0) for _ in range(m)]
        hit = barrier_path(y)
        events += int(hit)
        if hit:
            weighted_sum += D * path_weight(y, lam)
    return weighted_sum / n, events / n


def repeat(fn, reps: int, seed: int) -> tuple[float, float]:
    results = []
    rng = random.Random(seed)
    for _ in range(reps):
        results.append(fn(rng))
    return statistics.mean(results), statistics.variance(results)


def check_identities() -> None:
    """Deterministic mathematical checks; not a replacement for MC validation."""
    th = theory()
    pi = th["probability"]
    assert 0.0019 < pi < 0.0020
    assert math.isclose(th["price"], 0.001875633591283304, rel_tol=2e-12)
    assert th["importance_variance"] < th["strata_variance"] < th["plain_variance"]
    assert math.isclose(
        th["strata_variance"] / th["plain_variance"],
        3.0 * (0.01 - pi) / (1.0 - pi), rel_tol=1e-12,
    )
    for lam in (0.0, 1.5, 2.0, 8.0, -2.0):
        for y in (0.0, 1.0, 3.0):
            lhs = math.exp(-y * y) / math.exp(-0.5 * (y - lam)**2)
            rhs = math.exp(lam * lam) * math.exp(-0.5 * (y + lam)**2)
            assert math.isclose(lhs, rhs, rel_tol=2e-13)
    assert math.isclose(gaussian_weight(3.0, 2.0), math.exp(-4.0))
    assert math.isclose(path_weight([0.0, 1.0, 1.0, 4.0], 2.0), math.exp(-4.0))
    assert barrier_path([0.0, 1.0, 1.0, 4.0])
    assert not barrier_path([0.0, 1.0, 1.0, 1.0])
    assert math.isclose(
        path_weight([0.4, 1.0, 2.0, -0.3], 2.0),
        math.prod(gaussian_weight(x, 1.0) for x in [0.4, 1.0, 2.0, -0.3]),
        rel_tol=2e-14,
    )
    # m=1 is exactly the terminal-only digital event, not an approximation.
    assert barrier_path([THRESHOLD + 0.1])
    assert not barrier_path([THRESHOLD - 0.1])
    # A large positive shift is damaging despite nearly certain proposal events.
    bad_var = math.exp(64.0) * upper_tail(THRESHOLD + 8.0) - pi**2
    base_var = pi * (1.0 - pi)
    assert bad_var / base_var > 2000
    print("Deterministic checks: OK")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="deterministic identities only")
    parser.add_argument("--reps", type=int, default=200)
    parser.add_argument("--barrier-reps", type=int, default=80)
    parser.add_argument("--paths", type=int, default=1536)
    args = parser.parse_args()
    check_identities()
    if args.check:
        return
    if args.paths < 3 or args.paths % 3:
        raise SystemExit("--paths must be a positive multiple of 3")
    if args.reps < 2 or args.barrier_reps < 2:
        raise SystemExit("repetitions must be >= 2")
    th = theory()
    print("Terminal-only digital: ", th)
    n = args.paths
    n_each = n // 3
    plain_mean, plain_var = repeat(lambda rng: plain_once(rng, n), args.reps, SEED)
    str_mean, str_var = repeat(
        lambda rng: stratified_once(rng, n_each), args.reps, SEED + 1,
    )
    is_mean, is_var = repeat(
        lambda rng: importance_once(rng, n, 2.0)[0], args.reps, SEED + 2,
    )
    print("Method, empirical mean JPY, empirical variance JPY^2")
    print("plain", plain_mean, plain_var)
    print("strata", str_mean, str_var)
    print("shift=2", is_mean, is_var)
    ess_rng = random.Random(SEED + 3)
    sample, ess = importance_once(ess_rng, n, 2.0)
    print("one shift=2 run: price, ESS, ESS/N", sample, ess, ess / n)
    # For the monitored barrier, use identical monitoring dates for both methods.
    m = 4
    pmean, pvar = repeat(
        lambda rng: barrier_once(rng, n, m, 0.0)[0],
        args.barrier_reps, SEED + 4,
    )
    imean, ivar = repeat(
        lambda rng: barrier_once(rng, n, m, 2.0)[0],
        args.barrier_reps, SEED + 5,
    )
    upper = min(
        1.0, sum(
            upper_tail(
                (math.log(H / S0) - DRIFT * (T * j / m))
                / (SIGMA * math.sqrt(T * j / m))
            )
            for j in range(1, m + 1)
        )
    )
    print("Discrete 4-date barrier: terminal-only lower / union upper (JPY)")
    print(th["price"], D * upper)
    print("path plain mean/empirical variance", pmean, pvar)
    print("path shift mean/empirical variance", imean, ivar)
    print("These are finite-repeat estimates, not analytic 4-date truth.")


if __name__ == "__main__":
    main()
