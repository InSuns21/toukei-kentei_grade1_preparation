#!/usr/bin/env python3
"""U3-35: GBM continuous up-and-out survival vs discretely monitored survival.

Requires numpy. Run: python bridge_barrier_experiment.py
All prices in JPY, time in years; r and sigma use continuous annualized units.
"""
import math

import numpy as np

S0 = 100.0
SIGMA = 0.2
R = 0.02
Q = 0.0
T = 1.0
H = S0 * math.exp(0.2)
N = 200_000
SEED = 20261114
M_LIST = (1, 4, 16, 64)


def mean_se(values):
    """Independent-path sample mean and its standard error."""
    return float(np.mean(values)), float(np.std(values, ddof=1) / math.sqrt(len(values)))


def run():
    drift = R - Q - SIGMA**2 / 2
    assert abs(drift) < 1e-14
    assert H > S0 and N >= 2
    b = math.log(H / S0)
    d = b / (SIGMA * math.sqrt(T))
    normal_cdf = lambda z: (1.0 + math.erf(z / math.sqrt(2.0))) / 2.0
    continuous_survival = 2.0 * normal_cdf(d) - 1.0
    truth = math.exp(-R * T) * continuous_survival
    discrete_one_grid = math.exp(-R * T) * normal_cdf(d)
    print(f"parameters: S0={S0:g} H={H:.8f} sigma={SIGMA:g} r={R:g} q={Q:g} T={T:g}")
    print(f"continuous exact price = {truth:.9f} JPY")
    print(f"m=1 discrete analytic price = {discrete_one_grid:.9f} JPY")
    print(f"m=1 monitoring bias = {discrete_one_grid - truth:.9f} JPY")
    print("m       discrete_est  discrete_SE  BB_est        BB_SE        disc_minus_true BB_minus_true")

    rng = np.random.default_rng(SEED)
    discount = math.exp(-R * T)
    for m in M_LIST:
        h = T / m
        x = np.zeros(N, dtype=np.float64)
        discrete_alive = np.ones(N, dtype=bool)
        bridge_weight = np.ones(N, dtype=np.float64)
        for _ in range(m):
            next_x = x + drift * h + SIGMA * math.sqrt(h) * rng.standard_normal(N)
            safe = (x < b) & (next_x < b)
            # Positive distances avoid overflow in the exponent for knocked-out paths.
            distance0 = np.maximum(b - x, 0.0)
            distance1 = np.maximum(b - next_x, 0.0)
            exponent = -2.0 * distance0 * distance1 / (SIGMA * SIGMA * h)
            survival = np.where(safe, -np.expm1(exponent), 0.0)
            discrete_alive &= safe
            bridge_weight *= survival
            x = next_x
        y_disc = discount * discrete_alive.astype(np.float64)
        y_bb = discount * bridge_weight
        disc_mean, disc_se = mean_se(y_disc)
        bb_mean, bb_se = mean_se(y_bb)
        print(f"{m:<7d} {disc_mean:12.9f}  {disc_se:11.9f} "
              f"{bb_mean:12.9f}  {bb_se:11.9f} "
              f"{disc_mean - truth:+15.9f} {bb_mean - truth:+13.9f}")


if __name__ == "__main__":
    run()
