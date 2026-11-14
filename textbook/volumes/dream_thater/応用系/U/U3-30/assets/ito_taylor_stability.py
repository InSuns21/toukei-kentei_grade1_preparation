#!/usr/bin/env python3
"""U3-30: coupled GBM strong errors and mean-square stability, stdlib only.

Time is measured in years.  The GBM experiment has zero Ito drift and is
not a pricing recommendation.  Each method shares all increments on a path.
"""
from __future__ import annotations

import argparse
import csv
import math
import random
import statistics
from pathlib import Path


def factor(order: int, sigma: float, z: float, h: float) -> float:
    """Truncated Ito-Taylor / Hermite multiplier (order 1, 2, or 3)."""
    if order not in (1, 2, 3):
        raise ValueError("order must be 1, 2, or 3")
    value = 1.0 + sigma * z
    if order >= 2:
        value += 0.5 * sigma * sigma * (z * z - h)
    if order == 3:
        value += (sigma ** 3) * (z ** 3 - 3.0 * h * z) / 6.0
    return value


def finite_strong_mse(order: int, s0: float, sigma: float, T: float, m: int) -> float:
    """Exact coupled endpoint MSE for driftless GBM, using log/expm1."""
    if order not in (1, 2, 3) or s0 <= 0 or T <= 0 or m <= 0:
        raise ValueError("invalid order, initial value, maturity, or mesh")
    h = T / m
    u = sigma * sigma * h
    v = sum(u ** k / math.factorial(k) for k in range(order + 1))
    delta = m * math.log(v) - sigma * sigma * T
    # v <= exp(u), hence delta <= 0 in exact arithmetic.
    # Tiny positive delta can arise from floating point rounding.
    return s0 * s0 * math.exp(sigma * sigma * T) * (-math.expm1(min(0.0, delta)))


def amplification(method: str, lam: float, nu: float, h: float) -> float:
    """Exact one-step second-moment amplification for the linear test SDE."""
    if h <= 0:
        raise ValueError("h must be positive")
    base = (1.0 + lam * h) ** 2 + nu * nu * h
    if method == "EM":
        return base
    if method == "Milstein":
        return base + 0.5 * nu ** 4 * h * h
    raise ValueError("unknown method")


def stability_limit(method: str, lam: float, nu: float) -> float | None:
    """Upper end of (0, h_max), if the exact SDE is stable."""
    a = 2.0 * lam + nu * nu
    if a >= 0.0:
        return None
    denom = lam * lam + (0.5 * nu ** 4 if method == "Milstein" else 0.0)
    if method not in ("EM", "Milstein") or denom <= 0.0:
        raise ValueError("invalid method or denominator")
    return -a / denom


def coupled_experiment(
    m: int, n: int, seed: int, s0: float = 100.0,
    sigma: float = 0.2, T: float = 1.0,
) -> list[dict[str, float | int | str]]:
    """Monte Carlo MSE of endpoint differences on the SAME Brownian path."""
    if m <= 0 or n < 2 or T <= 0 or s0 <= 0:
        raise ValueError("m > 0, n >= 2, T > 0, s0 > 0 required")
    h = T / m
    rng = random.Random(seed)
    squares = {p: [] for p in (1, 2, 3)}
    for _ in range(n):
        approx = {p: s0 for p in (1, 2, 3)}
        exact = s0
        for _ in range(m):
            z = math.sqrt(h) * rng.gauss(0.0, 1.0)
            exact *= math.exp(sigma * z - 0.5 * sigma * sigma * h)
            for p in (1, 2, 3):
                approx[p] *= factor(p, sigma, z, h)
        for p in (1, 2, 3):
            squares[p].append((approx[p] - exact) ** 2)
    output = []
    for p in (1, 2, 3):
        observed = statistics.mean(squares[p])
        std_error = math.sqrt(statistics.variance(squares[p]) / n)
        theory = finite_strong_mse(p, s0, sigma, T, m)
        output.append({
            "m": m,
            "h": h,
            "order": p,
            "method": {1: "EM", 2: "Milstein", 3: "Hermite-3"}[p],
            "mse_est": observed,
            "mse_se_est": std_error,
            "mse_exact": theory,
            "rmse_est": math.sqrt(observed),
            "rmse_exact": math.sqrt(theory),
        })
    return output


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--paths", type=int, default=20000)
    parser.add_argument("--seed", type=int, default=20261114)
    parser.add_argument("--csv", type=Path, default=None, help="optional CSV output")
    args = parser.parse_args()
    if args.paths < 2:
        parser.error("--paths must be at least 2")
    rows = []
    for m in (8, 16, 32, 64):
        rows += coupled_experiment(m, args.paths, args.seed + m)
    print("Driftless GBM: S0=100, sigma=0.2/sqrt(year), T=1 year")
    print("MSE: mean squared SAME-PATH endpoint errors; ± values are estimated standard errors")
    print("    m  method       observed MSE ± SE          exact MSE       exact RMSE")
    for row in rows:
        print(f"{row['m']:5d}  {row['method']:<11s} "
              f"{row['mse_est']:12.7f} ± {row['mse_se_est']:10.7f} "
              f"{row['mse_exact']:14.8f} {row['rmse_exact']:15.8f}")
    print("\nLinear SDE: lambda=-1/year, nu=1/sqrt(year), exact exponent=-1/year")
    print("Method         stability requires h < h_max (years)")
    for method in ("EM", "Milstein"):
        limit = stability_limit(method, -1.0, 1.0)
        print(f"{method:<11s}   {limit:.9f}")
    print("    h      exact exp(-h)       G_EM        G_Milstein")
    for h in (1.0, 0.5, 0.25):
        print(f"{h:6.3f}    {math.exp(-h):12.9f}   "
              f"{amplification('EM', -1, 1, h):10.7f}  "
              f"{amplification('Milstein', -1, 1, h):12.7f}")
    if args.csv is not None:
        with args.csv.open("w", encoding="utf-8", newline="") as stream:
            writer = csv.DictWriter(stream, fieldnames=list(rows[0]))
            writer.writeheader()
            writer.writerows(rows)
        print("CSV written:", args.csv)


if __name__ == "__main__":
    main()
