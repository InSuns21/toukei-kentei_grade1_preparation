#!/usr/bin/env python3
"""PML1-11: Euler–Maruyama quadratic Langevin stationary variance experiment.

Python 3 standard library only. Reproducible seed; analytic formulas are
independent of the Monte Carlo sample. The script outputs the estimated
variance at each h after burn-in and the theoretical variance if it exists.
"""

import math
import random

LAM = 2.0
TAU = 1.0
CENTER = 0.0
SEED = 20261121
PATHS = 4000
BURN_IN_STEPS = 700
rng = random.Random(SEED)


def theoretical_stationary_variance(h):
    if not 0.0 < h < 2.0 / LAM:
        return None
    r = 1.0 - LAM * h
    return 2.0 * TAU * h / (1.0 - r * r)


def sample_variance(values):
    n = len(values)
    mean = sum(values) / n
    return sum((x - mean) ** 2 for x in values) / (n - 1)


def simulate(h):
    values = [CENTER] * PATHS
    drift_factor = 1.0 - LAM * h
    noise_scale = math.sqrt(2.0 * TAU * h)
    for _ in range(BURN_IN_STEPS):
        for k in range(PATHS):
            values[k] = (
                CENTER + drift_factor * (values[k] - CENTER)
                + noise_scale * rng.gauss(0.0, 1.0)
            )
    return sample_variance(values)


def main():
    true_variance = TAU / LAM
    print(f"seed={SEED} paths={PATHS} burn_in_steps={BURN_IN_STEPS}")
    print(f"lambda={LAM} tau={TAU} continuous_variance={true_variance:.6f}")
    print("h       r       analytic_Vh  estimated_Vn  relative_bias")
    for h in (0.05, 0.25, 0.75):
        v = theoretical_stationary_variance(h)
        estimate = simulate(h)
        relative_bias = (v / true_variance - 1.0) * 100.0
        print(f"{h:0.2f}    {1.0 - LAM*h:+0.2f}       "
              f"{v:10.6f}   {estimate:10.6f}   {relative_bias:8.3f}%")

    # h=1 is the stability boundary: Var(Y_n) = n * 2*tau*h.
    h = 1.0
    print(f"h=1.00: no stationary law; at n=700, "
          f"analytic variance={BURN_IN_STEPS * 2.0 * TAU * h:.1f}")


if __name__ == "__main__":
    main()
