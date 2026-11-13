#!/usr/bin/env python3
"""U3-13: Itô log/discount identities and Monte Carlo moment checks.

Usage: python3 check_ito.py
Only Python's standard library is required. Rates are continuously compounded
per year, volatility is per sqrt(year), prices are in yen.
"""
from __future__ import annotations

import math
import random
import statistics


def run_case(mu: float, r: float, sigma: float, *, n: int = 50000) -> None:
    s0, t = 100.0, 1.0
    rng = random.Random(20261113)
    log_returns: list[float] = []
    discounted: list[float] = []
    max_identity_error = 0.0

    for _ in range(n):
        w_t = math.sqrt(t) * rng.gauss(0.0, 1.0)
        x_t = (mu - sigma**2 / 2) * t + sigma * w_t
        s_t = s0 * math.exp(x_t)
        d_t = math.exp(-r * t) * s_t
        log_returns.append(math.log(s_t / s0))
        discounted.append(d_t)
        max_identity_error = max(
            max_identity_error, abs(math.log(s_t / s0) - x_t)
        )

    expected_log = (mu - sigma**2 / 2) * t
    expected_log_variance = sigma**2 * t
    expected_discount = s0 * math.exp((mu - r) * t)
    # Var(D_T) = E[D_T]^2 * (exp(sigma^2*T) - 1).
    expected_discount_variance = (
        expected_discount**2 * math.expm1(sigma**2 * t)
    )
    standard_error = math.sqrt(expected_discount_variance / n)

    print(f"mu={mu:.3f}, r={r:.3f}, sigma={sigma:.3f}, N={n}")
    print(
        f"log mean: MC={statistics.fmean(log_returns):.6f}, "
        f"theory={expected_log:.6f}"
    )
    print(
        f"log variance: MC={statistics.pvariance(log_returns):.6f}, "
        f"theory={expected_log_variance:.6f}"
    )
    observed = statistics.fmean(discounted)
    print(
        f"discounted price mean: MC={observed:.6f}, "
        f"theory={expected_discount:.6f}, SE={standard_error:.6f}"
    )
    print(
        f"drift coefficients: log={mu - sigma**2 / 2:.6f}, "
        f"discounted={mu - r:.6f}, squared={2 * mu + sigma**2:.6f}"
    )
    assert max_identity_error < 2e-14
    # Statistical tolerance rather than equality of random sample means.
    assert abs(observed - expected_discount) < 6 * standard_error
    print()


if __name__ == "__main__":
    run_case(mu=0.08, r=0.03, sigma=0.20)
    run_case(mu=0.03, r=0.03, sigma=0.20)
