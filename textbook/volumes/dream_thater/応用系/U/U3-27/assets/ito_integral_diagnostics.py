"""U3-27: Itô-left, symmetric endpoint and true-time-midpoint sums.

Python >= 3.10, standard library only. No market data or packages required.
The half-step Brownian increments are shared between all approximations of
a given path; different experiments have explicitly separated RNG streams.
"""
from __future__ import annotations

import math
import random
from typing import Sequence

T = 1.0
SEED = 20261114


def theory(m: int, t: float = T) -> tuple[float, float]:
    """Exact E[(left-Ito)^2], E[(time-midpoint-Stratonovich)^2]."""
    if m < 1 or not math.isfinite(t) or t <= 0:
        raise ValueError("m must be positive and T must be finite and positive")
    return t * t / (2 * m), t * t / (4 * m)


def path_sums(halves: Sequence[tuple[float, float]], t: float = T) -> dict[str, float]:
    """Compute all sums using one specified Brownian increment sequence.

    Each (a,b) represents W(t_j+h/2)-W(t_j) and
    W(t_{j+1})-W(t_j+h/2). No independence assumption is needed
    for the deterministic algebra in this function.
    """
    m = len(halves)
    theory(m, t)
    w = 0.0
    left = 0.0
    mid_time = 0.0
    mid_endpoint = 0.0
    qv = 0.0
    half_square_diff = 0.0
    for a, b in halves:
        d = a + b
        left += w * d
        mid_time += (w + a) * d
        mid_endpoint += (w + d / 2) * d
        qv += d * d
        half_square_diff += (a * a - b * b) / 2
        w += d

    ito = (w * w - t) / 2
    stratonovich = w * w / 2
    return {
        "w": w, "left": left, "mid_time": mid_time,
        "mid_endpoint": mid_endpoint, "qv": qv,
        "ito": ito, "stratonovich": stratonovich,
        "half_square_diff": half_square_diff,
        "left_error": left - ito,
        "time_mid_error": mid_time - stratonovich,
        "time_mid_ito_error": mid_time - ito,
    }


def random_halves(m: int, rng: random.Random, t: float = T) -> list[tuple[float, float]]:
    theory(m, t)
    sd = math.sqrt(t / (2 * m))
    return [(rng.gauss(0.0, sd), rng.gauss(0.0, sd))
            for _ in range(m)]


def moments(values: list[float]) -> tuple[float, float]:
    """Average and estimated standard error of that average."""
    n = len(values)
    if n < 2:
        raise ValueError("at least 2 independent paths are required")
    mu = math.fsum(values) / n
    var = math.fsum((v - mu) ** 2 for v in values) / (n - 1)
    return mu, math.sqrt(var / n)


def diagnose(m: int, n: int, seed: int, t: float = T) -> dict[str, float]:
    if n < 2:
        raise ValueError("at least two paths required")
    rng = random.Random(seed)
    left_sq: list[float] = []
    mid_sq: list[float] = []
    left_signed: list[float] = []
    mid_ito_signed: list[float] = []
    mid_endpoint_max = 0.0
    algebra_max = 0.0
    for _ in range(n):
        s = path_sums(random_halves(m, rng, t), t)
        left_sq.append(s["left_error"] ** 2)
        mid_sq.append(s["time_mid_error"] ** 2)
        left_signed.append(s["left_error"])
        mid_ito_signed.append(s["time_mid_ito_error"])
        mid_endpoint_max = max(mid_endpoint_max,
                               abs(s["mid_endpoint"] - s["stratonovich"]))
        algebra_max = max(algebra_max,
                          abs(s["left_error"] + (s["qv"] - t) / 2),
                          abs(s["time_mid_error"] - s["half_square_diff"]))
    lm, lm_se = moments(left_sq)
    mm, mm_se = moments(mid_sq)
    le, le_se = moments(left_signed)
    me, me_se = moments(mid_ito_signed)
    return {
        "left_mse": lm, "left_mse_se": lm_se,
        "mid_mse": mm, "mid_mse_se": mm_se,
        "left_mean_error": le, "left_mean_se": le_se,
        "time_mid_ito_mean_error": me, "time_mid_ito_mean_se": me_se,
        "roundoff_identity_max": algebra_max,
        "roundoff_endpoint_max": mid_endpoint_max,
    }


def finite_precision_example(m: int = 512) -> tuple[float, float, float]:
    """Demonstrate cancellation when a large constant multiplies dW.

    Mathematically int (c+W) dW - c W_T = int W dW. Here both
    large terms are rounded separately in float64.
    """
    rng = random.Random(SEED + 700)
    halves = random_halves(m, rng)
    s = path_sums(halves)
    c = 1.0e12
    w = 0.0
    offset_sum = 0.0
    for a, b in halves:
        d = a + b
        offset_sum += (c + w) * d
        w += d
    recovered = offset_sum - c * s["w"]
    return s["left"], recovered, recovered - s["left"]


def main() -> None:
    n = 2048
    print("T=1, independent Brownian half-increments, same path per estimator")
    print("m   left MSE  theory  MC-SE   time-mid MSE  theory  MC-SE   mean(mid-Ito)")
    for m in (8, 32, 128, 512):
        obs = diagnose(m, n, SEED + m)
        left, midpoint = theory(m)
        print(f"{m:3d} {obs['left_mse']:.6f} {left:.6f} "
              f"{obs['left_mse_se']:.6f} "
              f"{obs['mid_mse']:.6f} {midpoint:.6f} "
              f"{obs['mid_mse_se']:.6f} "
              f"{obs['time_mid_ito_mean_error']:.6f}")
        # A generous six-estimated-SE stochastic smoke check, not an exact identity.
        assert abs(obs["left_mse"] - left) <= 6 * obs["left_mse_se"]
        assert abs(obs["mid_mse"] - midpoint) <= 6 * obs["mid_mse_se"]
        assert obs["roundoff_identity_max"] < 2e-11
        assert obs["roundoff_endpoint_max"] < 2e-11

    print("Independent re-runs at fixed m=32; n changes precision, not true MSE")
    for n in (256, 1024, 4096):
        obs = diagnose(32, n, SEED + 10000 + n)
        print(f"n={n:5d} measured MSE={obs['left_mse']:.6f} "
              f"SE(MSE)={obs['left_mse_se']:.6f} "
              f"theory={theory(32)[0]:.6f}")
    exact, recovered, loss = finite_precision_example()
    print(f"roundoff example centered={exact:.10f}, "
          f"offset-recovered={recovered:.10f}, difference={loss:+.3e}")
    print("Symmetric endpoint sum equals W_T^2/2 pathwise (up to roundoff);")
    print("actual-time midpoint approaches that value but is not pathwise exact.")


if __name__ == "__main__":
    main()
