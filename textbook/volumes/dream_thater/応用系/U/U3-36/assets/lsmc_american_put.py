#!/usr/bin/env python3
"""U3-36: independent training/hold-out LSM for a Bermudan put.

Only NumPy is required. Fixed seeds for reproducibility, not for inference.
The CRR tree is a discrete-model comparator, not an exact GBM grid value.
"""
from fractions import Fraction

import numpy as np


def generate_paths(rng, n, m, s=100.0, r=0.05, sigma=0.20, T=1.0):
    """Risk-neutral GBM at m+1 dates, including time 0."""
    dt = T / m
    z = rng.standard_normal((n, m))
    log_increments = (r - 0.5 * sigma ** 2) * dt + sigma * np.sqrt(dt) * z
    paths = np.empty((n, m + 1), dtype=float)
    paths[:, 0] = s
    paths[:, 1:] = s * np.exp(np.cumsum(log_increments, axis=1))
    return paths


def exercise_payoff(x, K=100.0):
    return np.maximum(K - x, 0.0)


def basis(x, K=100.0):
    """Three coefficient-linear, strike-scaled basis functions."""
    z = np.asarray(x) / K
    return np.column_stack((np.ones_like(z), z, z * z))


def train_lsm(paths, K=100.0, r=0.05, T=1.0):
    """Fit on in-the-money states and propagate one-date-discounted cashflows."""
    n, n_dates = paths.shape
    m = n_dates - 1
    disc = np.exp(-r * T / m)
    cash = exercise_payoff(paths[:, m], K)
    models = [None] * (m + 1)
    for j in range(m - 1, 0, -1):
        cash = disc * cash  # now worth money at date j
        immediate = exercise_payoff(paths[:, j], K)
        itm = immediate > 0.0
        if np.count_nonzero(itm) >= 12:
            X = basis(paths[itm, j], K)
            if np.linalg.matrix_rank(X) == X.shape[1]:
                # Avoid explicitly forming the ill-conditioned normal matrix.
                coef, _, _, _ = np.linalg.lstsq(X, cash[itm], rcond=None)
                models[j] = coef
                continuation = np.maximum(X @ coef, 0.0)
                exercise = immediate[itm] >= continuation
                indices = np.flatnonzero(itm)[exercise]
                cash[indices] = immediate[indices]
            # If rank-deficient, deliberately continue rather than invent an
            # unstable exercise boundary; the hold-out bound still holds.
    # Everyone starts at the same state. Train the time-0 action only once.
    time_zero_exercise = exercise_payoff(paths[0, 0], K) >= disc * cash.mean()
    in_sample = max(float(exercise_payoff(paths[0, 0], K)),
                    float(disc * cash.mean()))
    return models, bool(time_zero_exercise), in_sample


def evaluate_policy(paths, models, time_zero_exercise, K=100.0, r=0.05, T=1.0):
    """Apply frozen coefficients to paths never used in the regressions."""
    n, n_dates = paths.shape
    m = n_dates - 1
    dt = T / m
    if time_zero_exercise:
        return np.full(n, exercise_payoff(paths[0, 0], K))
    times = np.full(n, m, dtype=np.int64)
    payoff = exercise_payoff(paths[:, m], K)
    alive = np.ones(n, dtype=bool)
    for j in range(1, m):
        if models[j] is None:
            continue
        imm = exercise_payoff(paths[:, j], K)
        candidates = alive & (imm > 0.0)
        indices = np.flatnonzero(candidates)
        if len(indices) == 0:
            continue
        pred = np.maximum(basis(paths[indices, j], K) @ models[j], 0.0)
        chosen = indices[imm[indices] >= pred]
        payoff[chosen] = imm[chosen]
        times[chosen] = j
        alive[chosen] = False
    return payoff * np.exp(-r * dt * times)


def crr_american_put(m, s=100.0, K=100.0, r=0.05, sigma=0.2, T=1.0):
    dt = T / m
    u = np.exp(sigma * np.sqrt(dt))
    d = 1.0 / u
    p = (np.exp(r * dt) - d) / (u - d)
    if not 0.0 < p < 1.0:
        raise ValueError("Risk-neutral probability outside (0,1)")
    k = np.arange(m + 1)
    prices = s * u ** k * d ** (m - k)
    v = exercise_payoff(prices, K)
    for j in range(m - 1, -1, -1):
        v = np.exp(-r * dt) * (p * v[1:] + (1 - p) * v[:-1])
        k = np.arange(j + 1)
        prices = s * u ** k * d ** (j - k)
        v = np.maximum(v, exercise_payoff(prices, K))
    return float(v[0])


def verify_two_period_tree():
    """Exact rational regression target and Snell recursion."""
    p, R = Fraction(5, 8), Fraction(21, 20)
    up = (p * 0 + (1-p) * 4) / R
    down_cont = (p * 4 + (1-p) * 36) / R
    american = (p * up + (1-p) * 20) / R
    european = (2 * p * (1-p) * 4 + (1-p)**2 * 36) / R**2
    assert up == Fraction(10, 7)
    assert down_cont == Fraction(320, 21)
    assert american == Fraction(1175, 147)
    assert european == Fraction(925, 147)
    return american, european


def main():
    a, e = verify_two_period_tree()
    print(f"exact two-period tree: American={a} ({float(a):.6f}), "
          f"European={e} ({float(e):.6f})")
    s, K, r, sigma, T, m = 100.0, 100.0, 0.05, 0.20, 1.0, 25
    train_rng = np.random.default_rng(2026111401)
    test_rng = np.random.default_rng(2026111402)
    train = generate_paths(train_rng, 40000, m, s, r, sigma, T)
    test = generate_paths(test_rng, 60000, m, s, r, sigma, T)
    models, exercise_now, train_price = train_lsm(train, K, r, T)
    test_cash = evaluate_policy(test, models, exercise_now, K, r, T)
    price = test_cash.mean()
    se = test_cash.std(ddof=1) / np.sqrt(len(test_cash))
    european = (np.exp(-r*T) * exercise_payoff(test[:, -1], K)).mean()
    upper_sample = np.max(
        np.exp(-r*np.arange(m+1)*T/m)[None, :] * exercise_payoff(test, K),
        axis=1,
    ).mean()
    tree = crr_american_put(m, s, K, r, sigma, T)
    print(f"GBM put: s=K={K}, r={r}, sigma={sigma}, T={T}, dates={m+1}")
    print(f"training {len(train)} paths: in-sample average={train_price:.6f}")
    print(f"hold-out {len(test)} paths: value={price:.6f}, SE={se:.6f}, "
          f"95%-normal interval for frozen policy=({price-1.96*se:.6f}, "
          f"{price+1.96*se:.6f})")
    print(f"European MC={european:.6f}, perfect-foresight sample="
          f"{upper_sample:.6f}, {m}-step CRR={tree:.6f}")
    print("Warning: the sample means are NOT deterministic bounds; "
          "the CRR comparator is not the exact GBM Bermudan value.")


if __name__ == "__main__":
    main()
