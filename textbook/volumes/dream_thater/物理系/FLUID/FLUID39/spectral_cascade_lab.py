#!/usr/bin/env python3
"""FLUID39: integrals of a prescribed, truncated -5/3 synthetic spectrum.

NOT a Navier-Stokes solution, DNS/LES, measured turbulence, or a numerical
demonstration of Kolmogorov's hypothesis. Standard-library only; JSON plots
and numerical diagnostics come from precisely the same model.
"""
import argparse
import json
import math


def spectrum(q, q0, amplitude):
    """E(q) [m^3/s^2] for q in [q0, q1]; caller sets cutoff."""
    return amplitude * (q / q0) ** (-5.0 / 3.0)


def exact_integrals(q0, q1, amplitude, nu):
    ratio = q1 / q0
    energy = 1.5 * amplitude * q0 * (1.0 - ratio ** (-2.0 / 3.0))
    dissipation = (1.5 * nu * amplitude * q0 ** 3
                   * (ratio ** (4.0 / 3.0) - 1.0))
    return energy, dissipation


def experiment(q0=1.0, q1=8.0, amplitude=3.0, nu=0.01, grid=128):
    """Finite positive cutoffs [1/m], E(q0) [m^3/s^2], nu [m^2/s]."""
    values = (q0, q1, amplitude, nu)
    if not all(math.isfinite(v) for v in values):
        raise ValueError("input values must be finite")
    if not (0.01 <= q0 <= 100.0 and q0 * 1.25 <= q1 <= 1e4):
        raise ValueError("require 0.01 <= q0 <= 100 and 1.25*q0 <= q1 <= 10000")
    if not (0 < amplitude <= 1e4 and 0 < nu <= 100):
        raise ValueError("amplitude and kinematic viscosity must be positive")
    if not isinstance(grid, int) or not 16 <= grid <= 4096:
        raise ValueError("grid must be an integer between 16 and 4096")
    step = (q1 - q0) / grid
    knots = [q0 + j * step for j in range(grid + 1)]
    heights = [spectrum(q, q0, amplitude) for q in knots]
    # Composite trapezoid: endpoints half weight, all interior full weight.
    integration_weights = [step * (0.5 if j in (0, grid) else 1.0)
                           for j in range(grid + 1)]
    numeric_energy = sum(w * e for w, e in zip(integration_weights, heights))
    numeric_dissipation = sum(2.0 * nu * w * q * q * e
                              for q, w, e in zip(knots, integration_weights, heights))
    analytic_energy, analytic_dissipation = exact_integrals(
        q0, q1, amplitude, nu
    )
    ratio = q1 / q0
    checkpoints = [q0 * ratio ** (j / 40.0) for j in range(41)]
    cumulative_energy = [
        (1.0 - (q / q0) ** (-2.0 / 3.0)) /
        (1.0 - ratio ** (-2.0 / 3.0)) for q in checkpoints
    ]
    cumulative_dissipation = [
        ((q / q0) ** (4.0 / 3.0) - 1.0) /
        (ratio ** (4.0 / 3.0) - 1.0) for q in checkpoints
    ]
    # Exact algebraic slope for a prescribed power law, NOT a measured one.
    log_slope = (
        math.log(spectrum(q1, q0, amplitude) / spectrum(q0, q0, amplitude))
        / math.log(q1 / q0)
    )
    return {
        "model": "PRESCRIBED_TRUNCATED_SYNTHETIC_SPECTRUM_NOT_DNS",
        "assumptions": [
            "E(q) = E(q0)*(q/q0)^(-5/3) on [q0,q1], zero outside",
            "continuous shell-density model; no 3D velocity field evolved",
            "epsilon = 2*nu*integral(q^2*E(q)dq) is a spectral diagnostic",
            "no stationarity, energy flux or turbulence physics is inferred"
        ],
        "units": {
            "q": "1/m", "E": "m^3/s^2", "nu": "m^2/s",
            "energy": "m^2/s^2", "epsilon": "m^2/s^3"
        },
        "parameters": {
            "q0_per_m": q0, "q1_per_m": q1,
            "E_at_q0_m3_per_s2": amplitude,
            "nu_m2_per_s": nu, "trapezoid_intervals": grid
        },
        "analytic": {
            "total_energy_m2_per_s2": analytic_energy,
            "epsilon_m2_per_s3": analytic_dissipation
        },
        "numeric": {
            "energy_trapezoid_m2_per_s2": numeric_energy,
            "epsilon_trapezoid_m2_per_s3": numeric_dissipation,
            "energy_relative_error": abs(numeric_energy / analytic_energy - 1),
            "epsilon_relative_error": abs(numeric_dissipation / analytic_dissipation - 1),
            "prescribed_loglog_slope": log_slope
        },
        "plots": [
            {
                "title": "Prescribed -5/3 spectrum (not turbulence data)",
                "x_label": "log10(q / q0) [1]",
                "y_label": "log10(E(q) / E(q0)) [1]",
                "series": [
                    {"name": "synthetic power-law model, slope -5/3",
                     "points": [
                         [math.log10(q / q0),
                          math.log10(spectrum(q, q0, amplitude) / amplitude)]
                         for q in checkpoints
                     ]}
                ]
            },
            {
                "title": "Cumulative spectral energy and viscous dissipation",
                "x_label": "q [1/m]",
                "y_label": "fraction accumulated from q0 [1]",
                "series": [
                    {"name": "energy integral / total",
                     "points": list(zip(checkpoints, cumulative_energy))},
                    {"name": "viscous dissipation integral / total",
                     "points": list(zip(checkpoints, cumulative_dissipation))}
                ]
            }
        ]
    }


def self_test():
    r = experiment()
    assert math.isclose(r["analytic"]["total_energy_m2_per_s2"],
                        3.375, abs_tol=1e-12)
    assert math.isclose(r["analytic"]["epsilon_m2_per_s3"],
                        0.675, abs_tol=1e-12)
    assert math.isclose(r["numeric"]["prescribed_loglog_slope"],
                        -5.0 / 3.0, abs_tol=1e-12)
    assert r["numeric"]["energy_relative_error"] < 0.002
    assert r["numeric"]["epsilon_relative_error"] < 0.002
    # Quadrupling the number of trapezoids improves both integrals.
    coarse = experiment(grid=32)
    fine = experiment(grid=128)
    for key in ("energy_relative_error", "epsilon_relative_error"):
        assert fine["numeric"][key] < coarse["numeric"][key]
    for args in ((1, 1, 3, 0.01, 128),
                 (1, 8, -3, 0.01, 128),
                 (1, 8, 3, -0.01, 128),
                 (1, 8, 3, 0.01, 8)):
        try:
            experiment(*args)
        except ValueError:
            pass
        else:
            raise AssertionError("invalid inputs accepted")
    return {"self_test": "passed", "cases": "analytic values, refinement, four invalid inputs"}


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--q0", type=float, default=1)
    parser.add_argument("--q1", type=float, default=8)
    parser.add_argument("--amplitude", type=float, default=3)
    parser.add_argument("--nu", type=float, default=0.01)
    parser.add_argument("--grid", type=int, default=128)
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args(argv)
    result = (self_test() if args.self_test else
              experiment(args.q0, args.q1, args.amplitude, args.nu, args.grid))
    print(json.dumps(result, ensure_ascii=False, indent=2, allow_nan=False))


if __name__ == "__main__":
    main()
