"""U3-26 Monte Carlo risk-neutral pricing and discretization diagnostics.
Python >= 3.10; standard library only; all random streams explicitly seeded.
"""
from __future__ import annotations
import math
import random

S0, K, R, Q, SIGMA, T = 100.0, 100.0, 0.03, 0.0, 0.20, 1.0
SEED = 20261114


def Phi(z: float) -> float:
    return 0.5 * math.erfc(-z / math.sqrt(2.0))


def exact_call() -> float:
    a = SIGMA * math.sqrt(T)
    d2 = (math.log(S0 / K) + (R - Q - SIGMA**2 / 2) * T) / a
    d1 = d2 + a
    return S0 * math.exp(-Q * T) * Phi(d1) - K * math.exp(-R * T) * Phi(d2)


def exact_call_variance() -> float:
    """Compute E[X^2] - E[X]^2, X = exp(-rT) (S_T-K)_+."""
    a = SIGMA * math.sqrt(T)
    d2 = (math.log(S0 / K) + (R - Q - SIGMA**2 / 2) * T) / a
    second = math.exp(-2 * R * T) * (
        S0**2 * math.exp(2 * (R - Q) * T + SIGMA**2 * T) * Phi(d2 + 2 * a)
        - 2 * S0 * K * math.exp((R - Q) * T) * Phi(d2 + a)
        + K**2 * Phi(d2)
    )
    return second - exact_call()**2


def discounted_call(z: float) -> float:
    st = S0 * math.exp((R - Q - SIGMA**2 / 2) * T + SIGMA * math.sqrt(T) * z)
    return math.exp(-R * T) * max(st - K, 0.0)


def estimate(values: list[float]) -> tuple[float, float, float, float]:
    """Unbiased sample variance; normal-approximate 95 percent interval."""
    n = len(values)
    if n < 2:
        raise ValueError("at least two independent observations are required")
    mean = sum(values) / n
    variance = sum((x - mean)**2 for x in values) / (n - 1)
    se = math.sqrt(variance / n)
    return mean, se, mean - 1.96 * se, mean + 1.96 * se


def asian_continuous_linear() -> float:
    """K=0, arithmetic time-average, exact continuous-monitoring price."""
    c = R - Q
    if abs(c * T) < 1e-12:
        return S0 * math.exp(-R * T)
    return S0 * math.exp(-R * T) * math.expm1(c * T) / (c * T)


def asian_discrete_linear(m: int) -> float:
    """Exact expectation of discounted average at jT/m, j=1,...,m."""
    if m < 1:
        raise ValueError("m must be positive")
    return math.exp(-R * T) * S0 * sum(
        math.exp((R - Q) * j * T / m) for j in range(1, m + 1)
    ) / m


def asian_path(m: int, rng: random.Random) -> float:
    """Exact GBM on each observation date; no SDE numerical approximation."""
    h = T / m
    log_s = math.log(S0)
    total = 0.0
    for _ in range(m):
        log_s += (R - Q - SIGMA**2 / 2) * h + SIGMA * math.sqrt(h) * rng.gauss(0.0, 1.0)
        total += math.exp(log_s)
    return math.exp(-R * T) * total / m  # K=0


def main() -> None:
    benchmark = exact_call()
    variance = exact_call_variance()
    assert variance > 0
    print(f"European call benchmark={benchmark:.9f} JPY, sigma_X={math.sqrt(variance):.6f} JPY")
    print("Each n reuses the first n observations from one seeded stream (nested samples).")
    rng = random.Random(SEED)
    x = [discounted_call(rng.gauss(0.0, 1.0)) for _ in range(16384)]
    for n in (256, 1024, 4096, 16384):
        price, se, left, right = estimate(x[:n])
        print(f"n={n:5d} price={price:10.6f} SE={se:.6f} 95%CI=[{left:.6f},{right:.6f}] "
              f"true-in-CI={left <= benchmark <= right}")
        assert abs(price - benchmark) < 6.0 * se

    print("Repeated independent experiments; empirical 95% coverage is not exactly 95%.")
    for n in (256, 1024):
        rep_rng = random.Random(SEED + 10 + n)
        covered = 0
        replications = 400
        for _ in range(replications):
            draws = [discounted_call(rep_rng.gauss(0.0, 1.0)) for _ in range(n)]
            _, _, lo, hi = estimate(draws)
            covered += lo <= benchmark <= hi
        print(f"n={n:5d} coverage={covered}/{replications}={covered/replications:.3f}")

    reference = asian_continuous_linear()
    print(f"Continuous-average Asian K=0 benchmark={reference:.9f} JPY")
    for m in (4, 16, 64):
        target = asian_discrete_linear(m)
        sample_rng = random.Random(SEED + m)
        samples = [asian_path(m, sample_rng) for _ in range(8192)]
        price, se, left, right = estimate(samples)
        print(f"m={m:2d} exact-discrete={target:.9f} bias={target-reference:+.9f} "
              f"MC={price:.6f} SE={se:.6f} CI=[{left:.6f},{right:.6f}]")
        assert abs(price - target) < 6.0 * se
    assert abs(benchmark - 9.413403383853) < 1e-9
    assert abs(reference - 98.514888171639) < 1e-9


if __name__ == "__main__":
    main()
