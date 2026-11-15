#!/usr/bin/env python3
"""FLUID26: static two-dimensional meniscus from the Young-Laplace first integral.

The surface is invariant in the out-of-plane direction. This is not an
axisymmetric tube calculation and does not simulate dynamic fluid motion.
"""
import argparse
import json
import math


def rhs(height):
    """dH/dX for the monotone branch; H=h/lc, X=x/lc."""
    h2 = height * height
    denominator = 1.0 - h2 / 2.0
    if denominator <= 0.0:
        raise ValueError("overhanging/vertical-tangent branch is unsupported")
    return -height * math.sqrt(max(0.0, 1.0 - h2 / 4.0)) / denominator


def runge_kutta(n, wall_height, extent=6.0):
    dx = extent / n
    heights = [wall_height]
    for _ in range(n):
        h = heights[-1]
        k1 = rhs(h)
        k2 = rhs(h + 0.5 * dx * k1)
        k3 = rhs(h + 0.5 * dx * k2)
        k4 = rhs(h + dx * k3)
        new = h + dx * (k1 + 2 * k2 + 2 * k3 + k4) / 6
        if not math.isfinite(new):
            raise ValueError("non-finite value during integration")
        heights.append(new)
    return heights


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--theta-deg", type=float, default=60.0)
    parser.add_argument("--n", type=int, default=160,
                        help="number of X intervals (multiple of 8)")
    parser.add_argument("--gamma", type=float, default=0.072,
                        help="liquid/gas surface tension [N/m]")
    parser.add_argument("--delta-rho", type=float, default=1000.0,
                        help="liquid minus gas density [kg/m^3]")
    parser.add_argument("--g", type=float, default=9.8,
                        help="gravity [m/s^2]")
    args = parser.parse_args()

    if not (40 <= args.n <= 2048 and args.n % 8 == 0):
        parser.error("require 40 <= n <= 2048 and n divisible by 8")
    if not (math.isfinite(args.theta_deg)
            and 25.0 <= args.theta_deg <= 155.0):
        parser.error("require 25 <= theta-deg <= 155")
    if not all(math.isfinite(v) and v > 0.0
               for v in (args.gamma, args.delta_rho, args.g)):
        parser.error("gamma, delta-rho and g must be finite positive")

    theta = math.radians(args.theta_deg)
    lc = math.sqrt(args.gamma / (args.delta_rho * args.g))
    h0 = math.copysign(math.sqrt(max(0.0, 2 * (1 - math.sin(theta)))),
                       math.cos(theta))
    if abs(args.theta_deg - 90.0) < 1e-12:
        h0 = 0.0
    heights = runge_kutta(args.n, h0)
    refined = runge_kutta(2 * args.n, h0)
    dx = 6.0 / args.n
    wall_slope = -1.0 / math.tan(theta)
    slope_from_first_integral = rhs(h0)
    # Independent finite-difference estimate of the first integral residual.
    residuals = []
    for i in range(1, args.n):
        slope_fd = (heights[i + 1] - heights[i - 1]) / (2 * dx)
        lhs = 1.0 / math.sqrt(1.0 + slope_fd * slope_fd)
        residuals.append(abs(lhs - (1.0 - heights[i] ** 2 / 2.0)))

    if abs(slope_from_first_integral - wall_slope) > 2e-12:
        raise ArithmeticError("wall angle inconsistent with first integral")
    if abs(heights[-1]) > abs(h0) + 1e-12:
        raise ArithmeticError("meniscus did not approach the far-field level")
    if not all(math.isfinite(v) for v in heights):
        raise ArithmeticError("non-finite computed height")

    # Keep browser plot light; x and heights in mm.
    stride = max(1, math.ceil(args.n / 150))
    indices = list(range(0, args.n + 1, stride))
    if indices[-1] != args.n:
        indices.append(args.n)
    exact_points = [[i * dx * lc * 1000, heights[i] * lc * 1000]
                    for i in indices]
    linear_points = [[i * dx * lc * 1000,
                      (lc * (1 / math.tan(theta))
                       * math.exp(-i * dx)) * 1000]
                     for i in indices]
    far_x = 6.0 * lc * 1000

    print(json.dumps({
        "model": "static_planar_Young_Laplace_first_integral_not_axisymmetric",
        "assumptions": "2D translation-invariant static interface; uniform "
                       "surface tension, constant density difference, "
                       "gravity, unpinned ideal wall angle and flat far field",
        "input": vars(args),
        "capillary_length_mm": 1000 * lc,
        "bond_number_at_length_1mm": (args.delta_rho * args.g
                                      * 0.001 ** 2 / args.gamma),
        "wall": {
            "height_exact_mm": 1000 * lc * h0,
            "slope_from_contact_angle": wall_slope,
            "slope_from_first_integral": slope_from_first_integral,
            "linearized_height_mm": 1000 * lc / math.tan(theta)
        },
        "numerics": {
            "method": "RK4 of exact first integral for monotone branch",
            "X_interval": [0, 6],
            "dimensionless_dx": dx,
            "dimensionless_height_at_X3": heights[args.n // 2],
            "grid_refinement_error_at_X3":
                abs(heights[args.n // 2] - refined[args.n]),
            "max_first_integral_residual_using_centered_difference":
                max(residuals),
            "far_field_height_mm_at_X6": 1000 * lc * heights[-1]
        },
        "plots": [{
            "title": "Static meniscus: nonlinear vs small-slope approximation",
            "x_label": "distance x [mm]",
            "y_label": "height h [mm]",
            "series": [
                {"name": "nonlinear first integral",
                 "points": exact_points},
                {"name": "small-slope exponential (near 90 deg only)",
                 "points": linear_points},
                {"name": "reservoir level h=0",
                 "points": [[0, 0], [far_x, 0]]}
            ]
        }]
    }, ensure_ascii=False, allow_nan=False))


if __name__ == "__main__":
    main()
