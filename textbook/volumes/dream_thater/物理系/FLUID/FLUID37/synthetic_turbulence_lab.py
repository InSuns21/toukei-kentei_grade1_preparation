#!/usr/bin/env python3
"""FLUID37: synthetic periodic velocity, correlation and Fourier spectrum.

A finite random-phase Fourier signal is NOT a Navier-Stokes solution or DNS.
Standard-library-only, deterministic by seed; same data produces all checks and plots.
"""
import argparse
import cmath
import json
import math
import random


def experiment(modes=6, seed=37, grid_size=128):
    """Return spatial statistics on [0,2*pi) metres with u in m/s."""
    if not isinstance(modes, int) or not 1 <= modes <= 12:
        raise ValueError("modes must be between 1 and 12")
    if not isinstance(seed, int) or not 0 <= seed <= 99999:
        raise ValueError("seed must be between 0 and 99999")
    if grid_size != 128:
        raise ValueError("This lab uses a fixed 128-point grid")
    n_grid = grid_size
    length = 2.0 * math.pi  # metres
    mean_speed = 1.5  # m/s
    rng = random.Random(seed)
    phases = [rng.uniform(0.0, 2.0 * math.pi) for _ in range(modes)]
    amplitudes = [1.0 / n for n in range(1, modes + 1)]  # m/s

    x = [length * j / n_grid for j in range(n_grid)]  # m
    fluctuation = [
        sum(amplitudes[n - 1] * math.cos(n * xx + phases[n - 1])
            for n in range(1, modes + 1))
        for xx in x
    ]
    velocity = [mean_speed + w for w in fluctuation]
    spatial_mean = sum(velocity) / n_grid
    # Use the measured spatial mean, not the theoretical ensemble mean.
    centered = [v - spatial_mean for v in velocity]
    variance_signal = sum(v * v for v in centered) / n_grid

    # Cyclic spatial correlation. For this constructed finite-mode field,
    # spatial orthogonality reproduces the ensemble phase average exactly.
    shifts = list(range(n_grid // 2 + 1))
    empirical_corr = [
        sum(centered[j] * centered[(j + lag) % n_grid]
            for j in range(n_grid)) / n_grid
        for lag in shifts
    ]
    theory_corr = [
        sum(0.5 * amplitude ** 2 * math.cos(n * length * lag / n_grid)
            for n, amplitude in enumerate(amplitudes, start=1))
        for lag in shifts
    ]

    # Complex DFT with a_n = (1/N) sum_j v'_j exp(-2*pi*i*n*j/N).
    # One-sided powers: double all strictly positive non-Nyquist modes.
    dft = [
        sum(centered[j] * cmath.exp(-2j * math.pi * n * j / n_grid)
            for j in range(n_grid)) / n_grid
        for n in range(n_grid // 2 + 1)
    ]
    one_sided = [
        abs(a) ** 2 * (1 if n == 0 or n == n_grid // 2 else 2)
        for n, a in enumerate(dft)
    ]
    variance_spectrum = sum(one_sided)
    variance_analytic = 0.5 * sum(a * a for a in amplitudes)
    corr_error = max(abs(e - th) for e, th in zip(empirical_corr, theory_corr))
    parseval_error = abs(variance_signal - variance_spectrum)

    return {
        "model": "finite_random_phase_periodic_signal_NOT_Navier_Stokes",
        "units": {"x": "m", "u": "m/s", "R_and_S": "m^2/s^2"},
        "inputs": {"modes": modes, "seed": seed, "N": n_grid,
                   "L_m": length, "mean_U_m_per_s": mean_speed},
        "statistics": {
            "spatial_mean_m_per_s": spatial_mean,
            "variance_spatial_m2_per_s2": variance_signal,
            "variance_analytic_ensemble_m2_per_s2": variance_analytic,
            "variance_one_sided_spectrum_m2_per_s2": variance_spectrum,
            "fluctuation_energy_per_mass_m2_per_s2": 0.5 * variance_signal,
        },
        "checks": {
            "parseval_abs_error": parseval_error,
            "correlation_max_abs_error": corr_error,
            "mean_abs_error": abs(spatial_mean - mean_speed),
            "spectrum_nonnegative": all(s >= 0 for s in one_sided),
            "not_DNS_or_ergodicity_test": True,
        },
        "plots": [
            {"title": "Synthetic instantaneous velocity (NOT DNS)",
             "x_label": "x [m]", "y_label": "u [m/s]",
             "series": [
                 {"name": "synthetic u(x)", "points": [[xx, y] for xx, y in zip(x, velocity)]},
                 {"name": "ensemble mean U", "points": [[xx, mean_speed] for xx in x]},
             ]},
            {"title": "Spatial two-point correlation and exact finite-mode prediction",
             "x_label": "lag r [m]", "y_label": "R(r) [m^2/s^2]",
             "series": [
                 {"name": "cyclic spatial correlation",
                  "points": [[length * lag / n_grid, value]
                             for lag, value in zip(shifts, empirical_corr)]},
                 {"name": "ensemble theory",
                  "points": [[length * lag / n_grid, value]
                             for lag, value in zip(shifts, theory_corr)]},
             ]},
            {"title": "One-sided power by Fourier mode (not continuous density)",
             "x_label": "mode n [1]", "y_label": "one-sided S_n [m^2/s^2]",
             "series": [
                 {"name": "DFT power",
                  "points": [[n, one_sided[n]] for n in range(0, min(16, n_grid // 2) + 1)]},
                 {"name": "theoretical finite modes",
                  "points": [[n, (amplitudes[n - 1] ** 2 / 2 if 1 <= n <= modes else 0.0)]
                             for n in range(0, min(16, n_grid // 2) + 1)]},
             ]},
        ],
    }


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--modes", type=int, default=6)
    parser.add_argument("--seed", type=int, default=37)
    args = parser.parse_args(argv)
    print(json.dumps(experiment(args.modes, args.seed), ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
