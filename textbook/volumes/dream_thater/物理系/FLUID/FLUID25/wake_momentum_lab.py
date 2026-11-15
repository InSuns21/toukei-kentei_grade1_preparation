#!/usr/bin/env python3
"""FLUID25: sample a kinematic Gaussian wake and separate integration errors.

This is NOT a Navier-Stokes solver, vortex-shedding simulation, or a prediction
of cylinder coefficients. The far-wake drag interpretation additionally
requires the pressure and control-surface assumptions in the lecture.
"""
import argparse
import json
import math


def trapezoid(values, step):
    return step * (sum(values) - (values[0] + values[-1]) / 2.0)


def profile(y, amplitude, width):
    return 1.0 - amplitude * math.exp(-(y / width) ** 2)


def finite_integral(amplitude, width, extent):
    return width * math.sqrt(math.pi) * (
        amplitude * math.erf(extent / width)
        - amplitude ** 2 / math.sqrt(2.0)
        * math.erf(math.sqrt(2.0) * extent / width)
    )


def infinite_integral(amplitude, width):
    return width * math.sqrt(math.pi) * (
        amplitude - amplitude ** 2 / math.sqrt(2.0)
    )


def sample(n, extent, amplitude, width):
    step = 2.0 * extent / n
    nodes = [-extent + i * step for i in range(n + 1)]
    ratios = [profile(y, amplitude, width) for y in nodes]
    weights = [q * (1.0 - q) for q in ratios]
    integral = trapezoid(weights, step)
    return integral, nodes, ratios, weights


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--n", type=int, default=80, help="number of trapezoids")
    parser.add_argument("--extent", type=float, default=2.0, help="measurement half-height H [m]")
    parser.add_argument("--amplitude", type=float, default=0.4, help="relative centerline deficit")
    parser.add_argument("--width", type=float, default=0.5, help="Gaussian width b [m]")
    parser.add_argument("--speed", type=float, default=2.0, help="upstream speed U [m/s]")
    parser.add_argument("--rho", type=float, default=1.2, help="density [kg/m^3]")
    parser.add_argument("--diameter", type=float, default=0.1, help="reference length d [m]")
    parser.add_argument("--nu", type=float, default=1.5e-5, help="kinematic viscosity [m^2/s]")
    parser.add_argument("--frequency", type=float, default=3.0, help="measured shedding frequency [Hz]")
    args = parser.parse_args()

    if not 8 <= args.n <= 4096:
        parser.error("require 8 <= n <= 4096")
    scalars = [args.extent, args.width, args.speed, args.rho,
               args.diameter, args.nu, args.frequency]
    if not all(math.isfinite(x) and x > 0 for x in scalars):
        parser.error("all positive physical inputs must be finite")
    if not math.isfinite(args.amplitude) or not 0 < args.amplitude < 1:
        parser.error("require 0 < amplitude < 1")

    scale = args.rho * args.speed ** 2
    num, ys, ratios, weights = sample(
        args.n, args.extent, args.amplitude, args.width
    )
    refined, _, _, _ = sample(
        2 * args.n, args.extent, args.amplitude, args.width
    )
    finite = finite_integral(args.amplitude, args.width, args.extent)
    infinite = infinite_integral(args.amplitude, args.width)

    d_num = scale * num
    d_refined = scale * refined
    d_finite = scale * finite
    d_infinite = scale * infinite
    cd = 2 * d_num / (args.rho * args.speed ** 2 * args.diameter)

    assert finite > 0 and infinite > finite
    assert all(0 < q < 1 for q in ratios)
    assert d_infinite > 0 and math.isfinite(cd)
    assert abs(d_finite - scale * finite) < 1e-12 * max(1.0, d_finite)

    # Sample at most 161 points for browser plot performance.
    stride = max(1, math.ceil(args.n / 160))
    indices = list(range(0, args.n + 1, stride))
    if indices[-1] != args.n:
        indices.append(args.n)

    print(json.dumps({
        "model": "gaussian_kinematic_wake_no_navier_stokes_solution",
        "assumptions": "Constant-density 2D steady far-wake estimate; "
                       "p_downstream=p_upstream and correct outer fluxes; "
                       "kinematic profile is specified, not solved.",
        "inputs": vars(args),
        "dimensionless": {
            "Re_using_d": args.speed * args.diameter / args.nu,
            "St_using_measured_frequency": (
                args.frequency * args.diameter / args.speed
            )
        },
        "drag_N_per_m_span": {
            "trapezoid_n": d_num,
            "trapezoid_2n": d_refined,
            "finite_interval_exact": d_finite,
            "whole_line_exact": d_infinite,
            "quadrature_error_against_finite_exact": abs(d_num - d_finite),
            "tail_error_finite_vs_infinite": d_infinite - d_finite,
            "grid_halving_difference": abs(d_num - d_refined)
        },
        "drag_coefficient_from_n": cd,
        "plots": [
            {
                "title": "Prescribed speed ratio across wake",
                "x_label": "y [m]",
                "y_label": "u_d / U",
                "series": [
                    {"name": "wake profile",
                     "points": [[ys[i], ratios[i]] for i in indices]},
                    {"name": "uniform flow",
                     "points": [[-args.extent, 1], [args.extent, 1]]}
                ]
            },
            {
                "title": "Momentum-deficit density",
                "x_label": "y [m]",
                "y_label": "u_d (U - u_d) / U^2",
                "series": [
                    {"name": "g(1-g)",
                     "points": [[ys[i], weights[i]] for i in indices]}
                ]
            }
        ]
    }, ensure_ascii=False, allow_nan=False))


if __name__ == "__main__":
    main()
