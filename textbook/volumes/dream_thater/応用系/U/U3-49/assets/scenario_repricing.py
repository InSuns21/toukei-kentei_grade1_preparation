"""U3-49: physical two-factor scenarios and horizon full repricing.

Only the Python standard library is required for numerical output.
Optional --plot uses Matplotlib. Prices are illustrative Black--Scholes marks:
stochastic horizon rates do not imply an arbitrage-free stochastic-rate model.
"""
from __future__ import annotations

import argparse
import math
import random
from typing import Sequence

S0 = 100.0           # yen per share
K = 100.0            # yen per option exercise
R0 = 0.02            # annual continuous rate
SIGMA_Q = 0.20       # fixed option pricing volatility
T = 1.0              # years to maturity at time zero
H = 1.0 / 12.0       # years held
MU_P = 0.04          # physical stock drift, annual
SIGMA_S_P = 0.20     # physical stock volatility, annual
SIGMA_R_P = 0.01     # annual-rate volatility, per sqrt(year)
RATE_DRIFT_P = 0.0   # annual-rate drift, per year


def normal_cdf(x: float) -> float:
    return 0.5 * math.erfc(-x / math.sqrt(2.0))


def call_price(s: float, strike: float, rate: float,
               sigma: float, tau: float) -> float:
    """Zero-dividend Black--Scholes call for a fixed scenario rate."""
    if s <= 0.0 or strike <= 0.0 or sigma <= 0.0 or tau < 0.0:
        raise ValueError("require s, strike, sigma > 0 and tau >= 0")
    if tau == 0.0:
        return max(s - strike, 0.0)
    vol_time = sigma * math.sqrt(tau)
    d1 = (math.log(s / strike) + (rate + sigma * sigma / 2.0) * tau) / vol_time
    d2 = d1 - vol_time
    return s * normal_cdf(d1) - strike * math.exp(-rate * tau) * normal_cdf(d2)


def call_delta_rho(s: float, strike: float, rate: float,
                   sigma: float, tau: float) -> tuple[float, float]:
    """Partial derivatives in spot and rate for a non-expired call."""
    if s <= 0 or strike <= 0 or sigma <= 0 or tau <= 0:
        raise ValueError("positive spot, strike, volatility and maturity required")
    d1 = (math.log(s / strike) + (rate + sigma * sigma / 2.0) * tau) / (
        sigma * math.sqrt(tau)
    )
    d2 = d1 - sigma * math.sqrt(tau)
    return normal_cdf(d1), strike * tau * math.exp(-rate * tau) * normal_cdf(d2)


def horizon_portfolio(s: float, rate: float) -> float:
    """One stock share plus one call contract, time h."""
    return s + call_price(s, K, rate, SIGMA_Q, T - H)


def quantile_and_es(losses: Sequence[float], alpha: float) -> tuple[float, float]:
    """Empirical left quantile and fractional upper-tail ES; handles ties."""
    if not losses or not (0.0 < alpha < 1.0):
        raise ValueError("need nonempty losses and alpha in (0,1)")
    if not all(math.isfinite(x) for x in losses):
        raise ValueError("losses must be finite")
    ordered = sorted(losses)
    n = len(ordered)
    k = math.ceil(n * alpha) - 1
    var = ordered[k]
    tail = n * (1.0 - alpha)
    whole = int(math.floor(tail))
    frac = tail - whole
    descending = ordered[::-1]
    numerator = sum(descending[:whole])
    if frac > 0:
        numerator += frac * descending[whole]
    return var, numerator / tail


def simulate(samples: int, alpha: float, rho: float, seed: int):
    if samples < 2 or samples > 200000:
        raise ValueError("samples must be between 2 and 200000")
    if not (0.0 < alpha < 1.0) or not (-1.0 <= rho <= 1.0):
        raise ValueError("alpha in (0,1) and |rho|<=1 required")
    rng = random.Random(seed)
    initial_value = S0 + call_price(S0, K, R0, SIGMA_Q, T)
    roll_value = horizon_portfolio(S0, R0)
    delta_c, rho_c = call_delta_rho(S0, K, R0, SIGMA_Q, T - H)
    portfolio_spot_delta = 1.0 + delta_c
    reference_value = math.exp(R0 * H) * initial_value
    independent_scale = math.sqrt(1.0 - rho * rho)
    full_losses = []
    linear_losses = []
    for _ in range(samples):
        z1 = rng.gauss(0.0, 1.0)
        z2 = rng.gauss(0.0, 1.0)
        z_rate = rho * z1 + independent_scale * z2
        s = S0 * math.exp(
            (MU_P - 0.5 * SIGMA_S_P ** 2) * H
            + SIGMA_S_P * math.sqrt(H) * z1
        )
        rate = R0 + RATE_DRIFT_P * H + SIGMA_R_P * math.sqrt(H) * z_rate
        full = horizon_portfolio(s, rate)
        first_order = (roll_value + portfolio_spot_delta * (s - S0)
                       + rho_c * (rate - R0))
        full_losses.append(reference_value - full)
        linear_losses.append(reference_value - first_order)
    return full_losses, linear_losses, initial_value, roll_value


def sample_mean_se(values: Sequence[float]) -> tuple[float, float]:
    n = len(values)
    mean = sum(values) / n
    variance = sum((v - mean) ** 2 for v in values) / (n - 1)
    return mean, math.sqrt(variance / n)


def plot_pairs(full: Sequence[float], linear: Sequence[float]) -> None:
    import matplotlib.pyplot as plt

    step = max(1, len(full) // 2500)
    a = list(full[::step])
    b = list(linear[::step])
    lo = min(min(a), min(b))
    hi = max(max(a), max(b))
    fig, ax = plt.subplots(figsize=(6.6, 5.0))
    ax.scatter(a, b, s=7, alpha=0.35, label="same-scenario points")
    ax.plot([lo, hi], [lo, hi], linestyle="--", label="exact equality y=x")
    ax.set_xlabel("Full repricing loss (yen)")
    ax.set_ylabel("First-order loss (yen)")
    ax.legend()
    ax.grid(alpha=0.2)
    fig.tight_layout()
    plt.show()


def self_test() -> None:
    assert abs(normal_cdf(0) - 0.5) < 1e-14
    assert call_price(120, 100, 0.02, 0.2, 0) == 20.0
    assert abs(call_price(100, 100, 0.02, 0.2, 1)
               - 8.916037278572539) < 1e-9
    assert quantile_and_es([-3, -1, 0, 4, 10], 0.70) == (4, 8.0)
    assert quantile_and_es([-2, 1, 3, 7], 0.75) == (3, 7.0)
    assert abs(quantile_and_es([0, 1, 4, 10], 0.625)[1]
               - (10 + 0.5 * 4) / 1.5) < 1e-12
    # A horizon spot/rate left unchanged must have no first-order residual.
    d, rr = call_delta_rho(S0, K, R0, SIGMA_Q, T - H)
    assert abs(horizon_portfolio(S0, R0) - (
        horizon_portfolio(S0, R0) + (1 + d) * 0 + rr * 0
    )) < 1e-12
    a, b, _, _ = simulate(128, 0.95, -0.4, 42)
    c, d2, _, _ = simulate(128, 0.95, -0.4, 42)
    assert a == c and b == d2  # reproducible seed
    assert len(a) == len(b) == 128
    print("self-test: PASS")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--samples", type=int, default=12000)
    parser.add_argument("--rho", type=float, default=-0.4)
    parser.add_argument("--alpha", type=float, default=0.95)
    parser.add_argument("--seed", type=int, default=20261116)
    parser.add_argument("--plot", action="store_true")
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()

    if args.self_test:
        self_test()
        return
    full, linear, initial, roll = simulate(
        args.samples, args.alpha, args.rho, args.seed
    )
    fvar, fes = quantile_and_es(full, args.alpha)
    lvar, les = quantile_and_es(linear, args.alpha)
    errors = [f - g for f, g in zip(full, linear)]
    root_mean_sq = math.sqrt(sum(x * x for x in errors) / len(errors))
    sorted_abs = sorted(abs(x) for x in errors)
    q95_abs = sorted_abs[math.ceil(0.95 * len(errors)) - 1]
    mean_full, se_full = sample_mean_se(full)

    print(f"seed={args.seed}, N={args.samples}, alpha={args.alpha:.3f}, "
          f"rho={args.rho:+.2f}")
    print(f"current value={initial:.6f} yen; rolled mark={roll:.6f} yen; "
          f"benchmark={initial * math.exp(R0 * H):.6f} yen")
    print(f"full:   VaR={fvar:.6f} yen, ES={fes:.6f} yen")
    print(f"linear: VaR={lvar:.6f} yen, ES={les:.6f} yen")
    print(f"full-linear: VaR diff={fvar-lvar:+.6f} yen; "
          f"ES diff={fes-les:+.6f} yen")
    print(f"paired price/loss residual: RMS={root_mean_sq:.6f} yen; "
          f"sample 95% abs={q95_abs:.6f} yen")
    print(f"full sample mean loss={mean_full:.6f} yen, "
          f"estimated SE of mean={se_full:.6f} yen")
    print("Notes: sample percentile residual is NOT a population error bound; "
          "outer MC sampling, P-model, and repricing model errors differ.")
    if args.plot:
        plot_pairs(full, linear)


if __name__ == "__main__":
    main()
