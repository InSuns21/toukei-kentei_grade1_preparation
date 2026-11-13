"""CRR logarithmic-walk moments and seeded sampling; Python standard library only.

All units are per year: r [year^-1], sigma [year^-1/2], T [years].
The probability is the risk-neutral Q_N, not a forecast under physical P.
"""

from __future__ import annotations

import argparse
import math
import random
from dataclasses import dataclass


@dataclass(frozen=True)
class Moments:
    n: int
    h: float
    q_up: float
    exact_mean: float
    exact_variance: float
    limit_mean: float
    limit_variance: float


def crr_moments(t: float, n: int, r: float, sigma: float) -> Moments:
    """Finite-step exact moments of log(S_T/S_0) under the CRR Q_N."""
    if not math.isfinite(t) or t <= 0:
        raise ValueError("T must be positive and finite")
    if type(n) is not int or n < 1:
        raise ValueError("N must be a positive integer")
    if not math.isfinite(sigma) or sigma <= 0:
        raise ValueError("sigma must be positive and finite")
    if not math.isfinite(r):
        raise ValueError("r must be finite")

    h = t / n
    a = sigma * math.sqrt(h)
    # The exact arbitrage-free condition is -a < r*h < a.
    if not (-a < r * h < a):
        raise ValueError("CRR probabilities not strictly positive: increase N")
    # expm1 improves cancellation when h is small.
    q = math.expm1(r * h + a) / math.expm1(2 * a)
    if not (0.0 < q < 1.0):
        raise ValueError("CRR probability lost positivity at machine precision")
    m = a * (2 * q - 1)
    v = a * a - m * m
    return Moments(n, h, q, n * m, n * v, (r - sigma * sigma / 2) * t, sigma * sigma * t)


def sample_endpoints(t: float, n: int, r: float, sigma: float,
                     paths: int = 10000, seed: int = 20261113) -> tuple[float, float]:
    """Unbiased sample variance of M log-price endpoints; deterministic seed."""
    if paths < 2:
        raise ValueError("paths must be >=2")
    model = crr_moments(t, n, r, sigma)
    rng = random.Random(seed)
    a = sigma * math.sqrt(model.h)
    # One binomial count per path avoids constructing an unnecessary full tree.
    mean = 0.0
    squared_deviation = 0.0
    for k in range(1, paths + 1):
        up = sum(rng.random() < model.q_up for _ in range(n))
        endpoint = a * (2 * up - n)
        delta = endpoint - mean
        mean += delta / k
        squared_deviation += delta * (endpoint - mean)
    return mean, squared_deviation / (paths - 1)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--t", type=float, default=1.0)
    parser.add_argument("--r", type=float, default=0.0)
    parser.add_argument("--sigma", type=float, default=0.2)
    parser.add_argument("--paths", type=int, default=10000)
    parser.add_argument("--seed", type=int, default=20261113)
    parser.add_argument("--steps", type=int, nargs="+", default=[4, 16, 64])
    args = parser.parse_args()
    print("N  q(up)      exact_mean  sample_mean  exact_var  sample_var  limit_mean  limit_var")
    for n in args.steps:
        m = crr_moments(args.t, n, args.r, args.sigma)
        empirical_mean, empirical_variance = sample_endpoints(
            args.t, n, args.r, args.sigma, args.paths, args.seed
        )
        print(
            f"{n:<3d} {m.q_up:9.6f} {m.exact_mean:11.7f} {empirical_mean:12.7f} "
            f"{m.exact_variance:10.7f} {empirical_variance:11.7f} "
            f"{m.limit_mean:11.7f} {m.limit_variance:10.7f}"
        )


if __name__ == "__main__":
    main()
