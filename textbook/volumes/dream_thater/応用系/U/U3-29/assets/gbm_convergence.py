"""Coupled GBM convergence: theoretical finite-grid moments and MC observations.

Standard library only (Python >=3.10). Independent paths, shared Brownian
increments across exact/EM/Milstein and across all grid resolutions.
The calculation intentionally keeps discretization and sampling error separate.
"""
from __future__ import annotations

import math
import random
from dataclasses import dataclass


@dataclass(frozen=True)
class Params:
    s0: float = 100.0
    mu: float = 0.08
    sigma: float = 0.20
    T: float = 1.0


def theoretical(m: int, p: Params = Params()) -> dict[str, float]:
    """Finite m strong MSE and weak error for phi(s)=s.

    Derived independently of MC by normal exponential moments. At extremely
    large m, this cancellation formula loses digits and should not be treated
    as a floating-point accuracy guarantee.
    """
    if m < 1 or p.T <= 0 or p.s0 <= 0 or p.sigma < 0:
        raise ValueError("m>=1, T>0, s0>0 and sigma>=0 are required")
    h = p.T / m
    mu, sig = p.mu, p.sigma
    a = 2 * mu + sig * sig
    A = math.exp(a * p.T)
    DE = (1 + mu * h) ** 2 + sig * sig * h
    DM = DE + 0.5 * sig**4 * h * h
    CE = 1 + (mu + sig * sig) * h
    CM = CE + 0.5 * sig**4 * h * h
    # CE/CM may be negative for an extremely coarse grid; integer powers
    # still make sense. No positivity of numerical scheme is assumed.
    x_e = math.exp(mu * p.T)
    em_mse = p.s0**2 * math.fsum((A, DE**m, -2 * x_e * CE**m))
    mil_mse = p.s0**2 * math.fsum((A, DM**m, -2 * x_e * CM**m))
    tol = 1e-9 * p.s0**2
    if em_mse < -tol or mil_mse < -tol:
        raise ArithmeticError("negative theoretical MSE beyond roundoff")
    weak = p.s0 * ((1 + mu * h) ** m - x_e)
    return {
        "em_mse": max(0.0, em_mse),
        "mil_mse": max(0.0, mil_mse),
        "em_rmse": math.sqrt(max(0.0, em_mse)),
        "mil_rmse": math.sqrt(max(0.0, mil_mse)),
        "weak_linear": weak,
        "weak_quadratic_em": p.s0**2 * (DE**m - A),
        "weak_quadratic_mil": p.s0**2 * (DM**m - A),
    }


def mean_and_se(values: list[float]) -> tuple[float, float]:
    """Sample mean and standard error of the mean; n>=2."""
    n = len(values)
    if n < 2:
        raise ValueError("need at least two independent paths")
    avg = math.fsum(values) / n
    squared = math.fsum((x - avg)**2 for x in values)
    return avg, math.sqrt(squared / (n * (n - 1)))


def simulate(
    n: int = 2400,
    seed: int = 20261114,
    levels: tuple[int, ...] = (4, 8, 16, 32, 64, 128),
    p: Params = Params(),
) -> list[dict[str, float]]:
    """Couple all levels with one finest Brownian grid per independent path."""
    if n < 2 or not levels or min(levels) < 1:
        raise ValueError("n>=2 and positive grid sizes required")
    if p.T <= 0 or p.s0 <= 0 or p.sigma < 0:
        raise ValueError("invalid GBM parameters")
    finest = max(levels)
    if any(finest % m != 0 for m in levels):
        raise ValueError("each grid size must divide the finest grid size")
    rng = random.Random(seed)
    observations = {
        m: {"em_sq": [], "mil_sq": [], "em_diff": [], "mil_diff": []}
        for m in levels
    }
    for _ in range(n):
        increments = [rng.gauss(0.0, math.sqrt(p.T / finest))
                      for _ in range(finest)]
        wt = math.fsum(increments)
        exact = p.s0 * math.exp((p.mu - 0.5 * p.sigma**2) * p.T
                                + p.sigma * wt)
        for m in levels:
            h = p.T / m
            stride = finest // m
            em = mil = p.s0
            for j in range(0, finest, stride):
                dw = math.fsum(increments[j:j+stride])
                em *= 1.0 + p.mu*h + p.sigma*dw
                mil *= (1.0 + p.mu*h + p.sigma*dw
                        + 0.5*p.sigma**2*(dw**2 - h))
            ed = em - exact
            md = mil - exact
            out = observations[m]
            out["em_sq"].append(ed*ed)
            out["mil_sq"].append(md*md)
            out["em_diff"].append(ed)
            out["mil_diff"].append(md)

    rows = []
    for m in sorted(levels):
        obs = observations[m]
        em_mse, em_mse_se = mean_and_se(obs["em_sq"])
        mil_mse, mil_mse_se = mean_and_se(obs["mil_sq"])
        em_weak, em_weak_se = mean_and_se(obs["em_diff"])
        mil_weak, mil_weak_se = mean_and_se(obs["mil_diff"])
        row = {
            "m": m, "em_rmse": math.sqrt(em_mse),
            "mil_rmse": math.sqrt(mil_mse),
            "em_mse": em_mse, "mil_mse": mil_mse,
            "em_mse_se": em_mse_se, "mil_mse_se": mil_mse_se,
            "em_weak": em_weak, "mil_weak": mil_weak,
            "em_weak_se": em_weak_se, "mil_weak_se": mil_weak_se,
        }
        row.update({"theory_" + k: v for k, v in theoretical(m, p).items()})
        rows.append(row)
    return rows


def observed_order(coarse_h: float, fine_h: float,
                   coarse_error: float, fine_error: float) -> float:
    if not (coarse_h > fine_h > 0 and coarse_error > 0 and fine_error > 0):
        raise ValueError("need positive ordered steps and positive errors")
    return math.log(coarse_error/fine_error) / math.log(coarse_h/fine_h)


def main() -> None:
    print("GBM: s0=100 yen, mu=0.08/year, sigma=0.20/sqrt(year), T=1 year")
    print("fixed seed 20261114; n=2400 independent paths; exact and schemes share increments")
    print("strong RMSE [yen] and linear weak error [yen]; theory versus observed MC")
    print("m | EM RMSE(theory,MC) | Milstein RMSE(theory,MC) | linear weak(theory,MC)")
    rows = simulate()
    for row in rows:
        print(
            f"{row['m']:3d} | "
            f"{row['theory_em_rmse']:.6f}, {row['em_rmse']:.6f} | "
            f"{row['theory_mil_rmse']:.6f}, {row['mil_rmse']:.6f} | "
            f"{row['theory_weak_linear']:+.6f}, {row['em_weak']:+.6f}"
        )
    r16 = theoretical(16)
    r64 = theoretical(64)
    print("theoretical observed order, m=16 -> 64:")
    print("EM strong:",
          f"{observed_order(1/16,1/64,r16['em_rmse'],r64['em_rmse']):.5f}")
    print("Milstein strong:",
          f"{observed_order(1/16,1/64,r16['mil_rmse'],r64['mil_rmse']):.5f}")
    print("linear weak:",
          f"{observed_order(1/16,1/64,abs(r16['weak_linear']),abs(r64['weak_linear'])):.5f}")


if __name__ == "__main__":
    main()
