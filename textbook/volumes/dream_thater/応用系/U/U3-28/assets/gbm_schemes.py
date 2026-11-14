"""U3-28: coupled exact GBM, Euler--Maruyama and scalar Milstein.

Python 3.10+, standard library only. Increment variance is h, not h**2.
All three schemes receive exactly the same increments on each path.
"""
from __future__ import annotations

import math
import random
from typing import Sequence

S0 = 100.0
MU = 0.08
SIGMA = 0.20
T = 1.0
SEED = 20261114


def check_parameters(s0: float, mu: float, sigma: float, t: float) -> None:
    if not all(map(math.isfinite, (s0, mu, sigma, t))):
        raise ValueError("parameters must be finite")
    if s0 <= 0 or sigma < 0 or t <= 0:
        raise ValueError("require s0>0, sigma>=0 and T>0")


def path_values(increments: Sequence[float], s0: float = S0,
                mu: float = MU, sigma: float = SIGMA,
                t: float = T) -> dict[str, list[float]]:
    """Values at times j*T/m, including j=0; no fresh RNG is used."""
    check_parameters(s0, mu, sigma, t)
    m = len(increments)
    if m < 1:
        raise ValueError("at least one increment is required")
    h = t / m
    exact, euler, milstein = [s0], [s0], [s0]
    for dw in increments:
        if not math.isfinite(dw):
            raise ValueError("increments must be finite")
        exact.append(exact[-1] * math.exp((mu - sigma**2 / 2) * h + sigma * dw))
        euler.append(euler[-1] * (1 + mu * h + sigma * dw))
        milstein.append(milstein[-1] *
                        (1 + mu * h + sigma * dw +
                         sigma**2 * (dw**2 - h) / 2))
    return {"exact": exact, "euler": euler, "milstein": milstein}


def weak_mean_bias(m: int, s0: float = S0, mu: float = MU,
                   t: float = T) -> float:
    """Exact difference E[approx(T)] - E[S(T)] for BOTH schemes."""
    if m < 1 or not all(map(math.isfinite, (s0, mu, t))) or s0 <= 0 or t <= 0:
        raise ValueError("invalid parameters")
    return s0 * ((1 + mu * t / m)**m - math.exp(mu * t))


def exact_terminal_mse(m: int, method: str, s0: float = S0,
                       mu: float = MU, sigma: float = SIGMA,
                       t: float = T) -> float:
    """Exact terminal E[(scheme - GBM)**2] on the SAME Brownian path.

    This uses Gaussian exponential moments, not simulation.
    For very large m, subtractive cancellation can harm this oracle;
    compare only moderate m and use numerical caution.
    """
    check_parameters(s0, mu, sigma, t)
    if m < 1 or method not in ("euler", "milstein"):
        raise ValueError("m>=1 and method in {'euler','milstein'} required")
    h = t / m
    correction = sigma**4 * h**2 / 2 if method == "milstein" else 0.0
    squared_factor = (1 + mu * h)**2 + sigma**2 * h + correction
    cross_factor = 1 + (mu + sigma**2) * h + correction
    exact_second = math.exp((2 * mu + sigma**2) * t)
    result = s0**2 * (exact_second + squared_factor**m -
                      2 * math.exp(mu * t) * cross_factor**m)
    # Protect only against roundoff that is tiny relative to component scale.
    if result < 0 and result > -1e-10 * s0**2 * exact_second:
        return 0.0
    if result < 0:
        raise ArithmeticError("negative oracle MSE from numerical cancellation")
    return result


def mean_and_se(values: Sequence[float]) -> tuple[float, float]:
    n = len(values)
    if n < 2:
        raise ValueError("at least two independent paths required")
    mean = math.fsum(values) / n
    variance = math.fsum((x - mean)**2 for x in values) / (n - 1)
    return mean, math.sqrt(variance / n)


def experiment(m: int, n: int, seed: int = SEED,
               s0: float = S0, mu: float = MU, sigma: float = SIGMA,
               t: float = T) -> dict[str, float]:
    """Coupled error observations, independent replicated Brownian paths."""
    check_parameters(s0, mu, sigma, t)
    if m < 1 or n < 2:
        raise ValueError("m>=1, n>=2 required")
    rng = random.Random(seed)
    sd = math.sqrt(t / m)
    err_e, err_m = [], []
    for _ in range(n):
        increments = [rng.gauss(0.0, sd) for _ in range(m)]
        values = path_values(increments, s0, mu, sigma, t)
        exact = values["exact"][-1]
        err_e.append(values["euler"][-1] - exact)
        err_m.append(values["milstein"][-1] - exact)
    mse_e, mse_e_se = mean_and_se([x*x for x in err_e])
    mse_m, mse_m_se = mean_and_se([x*x for x in err_m])
    weak_e, weak_e_se = mean_and_se(err_e)
    weak_m, weak_m_se = mean_and_se(err_m)
    return {
        "euler_mse": mse_e, "euler_mse_se": mse_e_se,
        "milstein_mse": mse_m, "milstein_mse_se": mse_m_se,
        "euler_rmse": math.sqrt(mse_e),
        "milstein_rmse": math.sqrt(mse_m),
        "euler_mean_difference": weak_e, "euler_mean_se": weak_e_se,
        "milstein_mean_difference": weak_m, "milstein_mean_se": weak_m_se,
    }


def main() -> None:
    print("U3-28: GBM s0=100, mu=0.08, sigma=0.20, T=1, fixed seed")
    print("All schemes reuse exactly the same Brownian increments in each path.")
    print("m  n   Euler RMSE (theory)  Milstein RMSE (theory)")
    for m in (4, 16, 64):
        n = 1800
        obs = experiment(m, n, SEED + m)
        e = math.sqrt(exact_terminal_mse(m, "euler"))
        v = math.sqrt(exact_terminal_mse(m, "milstein"))
        print(f"{m:2d} {n:4d}  {obs['euler_rmse']:8.4f} ({e:8.4f})"
              f"     {obs['milstein_rmse']:8.4f} ({v:8.4f})")
        print(f"    MSE-SE: {obs['euler_mse_se']:.5f},"
              f" {obs['milstein_mse_se']:.5f};"
              f" signed mean error: {obs['euler_mean_difference']:.4f},"
              f" {obs['milstein_mean_difference']:.4f}")
    hand = path_values([0.3, -0.1])
    print("Hand check, increments [0.3,-0.1]:")
    for name in ("exact", "euler", "milstein"):
        print(f"  {name}: {hand[name]}")
    print("Negative-path check (mu=0, sigma=2, T=1, dW=-0.5):",
          {k: v[-1] for k, v in path_values([-0.5], 100, 0, 2, 1).items()})


if __name__ == "__main__":
    main()
