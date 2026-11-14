#!/usr/bin/env python3
"""U3-31: finite-grid GBM MLMC vs standard MC (standard library only)."""
import math
import random

S0, R, SIGMA, T = 100.0, 0.30, 0.60, 1.0
M0, EPS = 2, 0.5
SEED = 20261114
DISCOUNT = math.exp(-R * T)
TARGET = S0  # E[e^{-rT} S_T] under dS=rSdt+sigma S dW


def level_moments(level):
    """Return E[Delta_l], Var(Delta_l), number of Euler updates per sample."""
    m = M0 * (2 ** level)
    h = T / m
    a = 1 + R * h
    q = a * a + SIGMA * SIGMA * h
    k = S0 * DISCOUNT
    if level == 0:
        mean = k * a ** m
        variance = k * k * (q ** m - a ** (2 * m))
        return mean, variance, m

    b = 1 + 2 * R * h
    q_c = b * b + 2 * SIGMA * SIGMA * h
    cross = a * a * b + 2 * a * SIGMA * SIGMA * h
    n = m // 2
    mean = k * (a ** m - b ** n)
    second = k * k * (q ** m + q_c ** n - 2 * cross ** n)
    variance = second - mean * mean
    if variance < -1e-7:
        raise ArithmeticError("negative analytic variance: cancellation at tiny step")
    return mean, max(0.0, variance), m + n


def fine_mean(level):
    m = M0 * 2 ** level
    return S0 * DISCOUNT * (1 + R * T / m) ** m


def fine_variance(level):
    m = M0 * 2 ** level
    h = T / m
    a = 1 + R * h
    return (S0 * DISCOUNT) ** 2 * (
        (a * a + SIGMA * SIGMA * h) ** m - a ** (2 * m)
    )


def sample_level(level, rng):
    """Each level has fresh independent samples; within a pair share increments."""
    m = M0 * 2 ** level
    h = T / m
    sd = math.sqrt(h)
    if level == 0:
        fine = S0
        for _ in range(m):
            fine *= 1 + R * h + SIGMA * rng.gauss(0, sd)
        return DISCOUNT * fine
    fine = S0
    coarse = S0
    for _ in range(m // 2):
        z1, z2 = rng.gauss(0, sd), rng.gauss(0, sd)
        fine *= (1 + R * h + SIGMA * z1) * (1 + R * h + SIGMA * z2)
        coarse *= 1 + 2 * R * h + SIGMA * (z1 + z2)
    return DISCOUNT * (fine - coarse)


def sample_standard(level, rng):
    """Independent fine-grid payoff; do not share with MLMC samples."""
    m = M0 * 2 ** level
    h = T / m
    sd = math.sqrt(h)
    x = S0
    for _ in range(m):
        x *= 1 + R * h + SIGMA * rng.gauss(0, sd)
    return DISCOUNT * x


def mean_of_samples(generator, n):
    total = 0.0
    for _ in range(n):
        total += generator()
    return total / n


def main():
    if not (EPS > 0 and M0 >= 1):
        raise ValueError("positive tolerance and number of steps required")
    # Bias is analytic here; in a real model it must be bounded or estimated.
    level = 0
    while abs(fine_mean(level) - TARGET) > EPS / math.sqrt(2):
        level += 1
        if level > 12:
            raise RuntimeError("level exceeds double-precision benchmark range")

    stats = [level_moments(l) for l in range(level + 1)]
    v = [row[1] for row in stats]
    c = [row[2] for row in stats]
    factor = sum(math.sqrt(vi * ci) for vi, ci in zip(v, c))
    counts = [max(1, math.ceil(2 * factor * math.sqrt(vi / ci) / EPS**2))
              for vi, ci in zip(v, c)]
    variance_ml = sum(vi / ni for vi, ni in zip(v, counts))
    cost_ml = sum(ci * ni for ci, ni in zip(c, counts))
    n_standard = math.ceil(2 * fine_variance(level) / EPS**2)
    variance_std = fine_variance(level) / n_standard
    m_fine = M0 * 2 ** level
    cost_std = n_standard * m_fine
    bias = fine_mean(level) - TARGET

    print("GBM r=0.30/yr sigma=0.60/sqrt(yr), S0=100, T=1yr, discount=e^-rT")
    print(f"epsilon={EPS}, L={level}, finest steps={m_fine}")
    print("level | E[Delta] | variance | work/sample | count")
    for l, ((mean, vi, ci), ni) in enumerate(zip(stats, counts)):
        print(f"{l:5d} | {mean:9.5f} | {vi:9.5f} | {ci:11d} | {ni:7d}")
    print(f"analytical bias={bias:.7f} (currency)")
    print(f"MLMC theoretical RMSE={math.sqrt(bias*bias+variance_ml):.7f}")
    print(f"MC   theoretical RMSE={math.sqrt(bias*bias+variance_std):.7f}")
    print(f"MLMC update cost={cost_ml:,}; MC cost={cost_std:,}")
    print(f"MC / MLMC update ratio={cost_std/cost_ml:.3f}")

    # One seeded realization is not a measured RMSE; repeat whole experiments
    # independently to estimate empirical RMSE.
    rng = random.Random(SEED)
    observed_ml = sum(mean_of_samples(lambda l=l: sample_level(l, rng), n)
                      for l, n in enumerate(counts))
    observed_std = mean_of_samples(lambda: sample_standard(level, rng), n_standard)
    print(f"one seeded run: MLMC estimate={observed_ml:.5f}, MC estimate={observed_std:.5f}")
    print("A single absolute error cannot replace the theoretical RMSE.")


if __name__ == "__main__":
    main()
