"""U3-32: exact-GBM call, antithetic and stock-control variance reduction.

Requirements: Python 3.10+, NumPy. Execute: python variance_reduction.py
Each row of the random array is an independent Monte Carlo repetition.
Methods within each row share Gaussian draws where appropriate.
"""
from math import erf, exp, log, sqrt
import numpy as np

S0, K, R, Q, SIGMA, T = 100.0, 100.0, 0.03, 0.0, 0.20, 1.0
BUDGET, PILOT, REPS, SEED = 4096, 256, 600, 20261114


def phi(x: float) -> float:
    return 0.5 * (1.0 + erf(x / sqrt(2.0)))


def analytic_moments():
    discount = exp(-R * T)
    a = S0 * exp((R - Q - SIGMA**2 / 2.0) * T)
    b = SIGMA * sqrt(T)
    d2 = log(a / K) / b

    def m(j):
        return (a**j) * exp(j * j * b * b / 2.0) * phi(d2 + j * b)

    mean_x = discount * (m(1) - K * m(0))
    ex2 = discount**2 * (m(2) - 2 * K * m(1) + K**2 * m(0))
    variance_x = ex2 - mean_x**2
    mean_c = S0 * exp(-Q * T)
    variance_c = mean_c**2 * (exp(b * b) - 1.0)
    exc = discount**2 * (m(2) - K * m(1))
    covariance_xc = exc - mean_x * mean_c
    beta = covariance_xc / variance_c
    variance_control = variance_x - covariance_xc**2 / variance_c

    if d2 > 0:
        p = 2 * phi(d2) - 1
        h = exp(b * b / 2) * (phi(d2 - b) - phi(-d2 - b))
        exxminus = discount**2 * ((a * a + K * K) * p - 2 * a * K * h)
    else:
        exxminus = 0.0
    covariance_anti = exxminus - mean_x**2
    return a, b, discount, mean_x, mean_c, variance_x, variance_control, beta, covariance_anti


def main():
    a, b, discount, price, mean_c, vx, vcv, beta, gamma = analytic_moments()
    rng = np.random.default_rng(SEED)
    z = rng.standard_normal((REPS, BUDGET))
    st = a * np.exp(b * z)
    x = discount * np.maximum(st - K, 0.0)
    c = discount * st

    plain = x.mean(axis=1)
    zhalf = z[:, : BUDGET // 2]
    antix = discount * (
        np.maximum(a * np.exp(b * zhalf) - K, 0.0)
        + np.maximum(a * np.exp(-b * zhalf) - K, 0.0)
    ) / 2.0
    anti = antix.mean(axis=1)
    oracle = (x - beta * (c - mean_c)).mean(axis=1)

    # An independent pilot stream is required for the conditional unbiasedness proof.
    zp = rng.standard_normal((REPS, PILOT))
    stock_p = discount * a * np.exp(b * zp)
    xp = discount * np.maximum(a * np.exp(b * zp) - K, 0.0)
    dc = stock_p - stock_p.mean(axis=1, keepdims=True)
    dx = xp - xp.mean(axis=1, keepdims=True)
    denominator = np.sum(dc * dc, axis=1)
    if np.any(denominator <= 1.0e-12):
        raise RuntimeError("Degenerate pilot variance")
    pilot_beta = np.sum(dc * dx, axis=1) / denominator
    evaluation_n = BUDGET - PILOT
    pilot = (
        x[:, :evaluation_n] - pilot_beta[:, None] * (c[:, :evaluation_n] - mean_c)
    ).mean(axis=1)

    theory = {
        "plain": vx / BUDGET,
        "antithetic": (vx + gamma) / BUDGET,
        "oracle-control": vcv / BUDGET,
    }
    samples = {
        "plain": plain,
        "antithetic": anti,
        "oracle-control": oracle,
        "independent-pilot": pilot,
    }
    print(f"seed={SEED} independent_repetitions={REPS} payoff_budget={BUDGET}")
    print(f"call_price={price:.8f} stock_control_mean={mean_c:.8f} beta_star={beta:.8f}")
    print("method                estimate_mean    repeat_variance   theory_variance")
    for name, vals in samples.items():
        theoretical = f"{theory[name]:.8f}" if name in theory else "pilot dependent"
        print(f"{name:21s} {vals.mean():13.8f} {vals.var(ddof=1):17.8f}   {theoretical}")
    print("Pilot uses 256 independent training evaluations plus 3840 evaluation draws.")
    print("Oracle coefficient is computed analytically, not fitted on evaluation draws.")


if __name__ == "__main__":
    main()
