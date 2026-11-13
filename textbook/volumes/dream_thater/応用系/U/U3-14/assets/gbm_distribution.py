"""GBM terminal law: exact sampling, analytical moments, and a reproducible CSV.

Use Python 3.10+ without third-party dependencies.
All time inputs are in years, drift in 1/year, volatility in 1/sqrt(year).
"""

import argparse
import csv
import math
import random
from statistics import NormalDist

DEFAULT_SEED = 20261113


def validate_parameters(s0: float, mu: float, sigma: float, t: float) -> None:
    if not all(math.isfinite(v) for v in (s0, mu, sigma, t)):
        raise ValueError("All parameters must be finite")
    if s0 <= 0 or sigma < 0 or t < 0:
        raise ValueError("Require s0 > 0, sigma >= 0, t >= 0")


def moment(s0: float, mu: float, sigma: float, t: float, p: float) -> float:
    """E[S_t**p] for any real p (when the floating result is representable)."""
    validate_parameters(s0, mu, sigma, t)
    return s0 ** p * math.exp((p * mu + 0.5 * p * (p - 1.0) * sigma**2) * t)


def theory(s0: float, mu: float, sigma: float, t: float) -> dict:
    """Return theoretical statistics. Quantiles handle degenerate sigma=0 or t=0."""
    validate_parameters(s0, mu, sigma, t)
    a = (mu - 0.5 * sigma * sigma) * t
    v = sigma * sigma * t
    log_sd = math.sqrt(v)
    mean = s0 * math.exp(mu * t)
    var = s0 * s0 * math.exp(2.0 * mu * t) * math.expm1(v)
    median = s0 * math.exp(a)
    q95 = s0 * math.exp(a + NormalDist().inv_cdf(0.95) * log_sd)
    if v == 0.0:
        p_up = float(a > 0.0)
    else:
        p_up = NormalDist().cdf(a / log_sd)
    return {
        "log_mean": a,
        "log_var": v,
        "stock_mean": mean,
        "stock_var": var,
        "stock_median": median,
        "stock_q95": q95,
        "prob_above_initial": p_up,
    }


def empirical_quantile(xs: list[float], p: float) -> float:
    """Continuous piecewise-linear order-statistic quantile (type 7)."""
    if not xs or not 0 <= p <= 1:
        raise ValueError("Require nonempty observations and 0 <= p <= 1")
    ys = sorted(xs)
    h = (len(ys) - 1) * p
    i = int(h)
    w = h - i
    return (1 - w) * ys[i] + w * ys[min(i + 1, len(ys) - 1)]


def sample(s0: float, mu: float, sigma: float, t: float,
           n: int = 50000, seed: int = DEFAULT_SEED) -> dict:
    """Exact terminal sampling: not an Euler approximation of the SDE."""
    validate_parameters(s0, mu, sigma, t)
    if n < 2:
        raise ValueError("Require n >= 2 for sample variance")
    rng = random.Random(seed)
    a = (mu - 0.5 * sigma**2) * t
    b = sigma * math.sqrt(t)
    logs = [a + b * rng.gauss(0.0, 1.0) for _ in range(n)]
    prices = [s0 * math.exp(x) for x in logs]

    def statistics(xs: list[float]) -> tuple[float, float]:
        avg = math.fsum(xs) / n
        var = math.fsum((x - avg) ** 2 for x in xs) / (n - 1)
        return avg, var

    log_mean, log_var = statistics(logs)
    price_mean, price_var = statistics(prices)
    return {
        "log_mean": log_mean,
        "log_var": log_var,
        "stock_mean": price_mean,
        "stock_var": price_var,
        "stock_median": empirical_quantile(prices, 0.5),
        "stock_q95": empirical_quantile(prices, 0.95),
        "prob_above_initial": sum(x > s0 for x in prices) / n,
    }


def run(s0: float = 100.0, mu: float = 0.08, sigma: float = 0.20,
        t: float = 1.0, n: int = 50000, seed: int = DEFAULT_SEED,
        csv_path: str | None = None) -> tuple[dict, dict]:
    exact = theory(s0, mu, sigma, t)
    observed = sample(s0, mu, sigma, t, n, seed)

    print(f"GBM: s0={s0:.2f} yen, mu={mu:.4f}/year, "
          f"sigma={sigma:.4f}/sqrt(year), T={t:.2f} years, "
          f"n={n}, seed={seed}")
    print("Statistic                theory          sample          sample-theory")
    for name in exact:
        print(f"{name:24s} {exact[name]:14.6f} {observed[name]:14.6f}"
              f" {observed[name] - exact[name]:14.6f}")
    se_mean = math.sqrt(exact["stock_var"] / n)
    print(f"Stock-mean sampling SE: {se_mean:.6f} yen")
    print("No time-discretization error: sampled from the exact GBM law.")

    if csv_path is not None:
        with open(csv_path, "w", encoding="utf-8", newline="") as f:
            out = csv.writer(f)
            out.writerow(("statistic", "theory", "sample", "sample_minus_theory"))
            for name in exact:
                out.writerow((name, format(exact[name], ".12g"),
                              format(observed[name], ".12g"),
                              format(observed[name] - exact[name], ".12g")))
        print(f"Saved deterministic summary: {csv_path}")
    return exact, observed


def main() -> None:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--s0", type=float, default=100.0)
    p.add_argument("--mu", type=float, default=0.08)
    p.add_argument("--sigma", type=float, default=0.20)
    p.add_argument("--t", type=float, default=1.0)
    p.add_argument("--n", type=int, default=50000)
    p.add_argument("--seed", type=int, default=DEFAULT_SEED)
    p.add_argument("--csv", default=None)
    args = p.parse_args()
    run(args.s0, args.mu, args.sigma, args.t, args.n, args.seed, args.csv)


if __name__ == "__main__":
    main()
