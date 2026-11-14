#!/usr/bin/env python3
"""FLUID21: high-Re boundary-layer scale and continuity diagnostics.

This is a kinematically admissible exponential trial field, not an exact
solution of Prandtl's momentum equation. Standard library only.
Output plots are rendered by the browser's python-file-lab.
"""
import argparse
import json
import math


def thickness(x, u, nu):
    return math.sqrt(nu * x / u)


def u_trial(x, y, speed, nu):
    eta = y / thickness(x, speed, nu)
    return speed * (-math.expm1(-eta))


def v_trial(x, y, speed, nu):
    d = thickness(x, speed, nu)
    eta = y / d
    return speed * d / (2 * x) * (1 - (1 + eta) * math.exp(-eta))


def point_check(x, speed, nu):
    d = thickness(x, speed, nu)
    y = d
    hx = x * 1e-4
    hy = d * 1e-4
    ux_fd = (u_trial(x + hx, y, speed, nu) -
             u_trial(x - hx, y, speed, nu)) / (2 * hx)
    vy_fd = (v_trial(x, y + hy, speed, nu) -
             v_trial(x, y - hy, speed, nu)) / (2 * hy)
    continuity_scaled = abs(ux_fd + vy_fd) / (speed / x)
    re_x = speed * x / nu
    ratio = 1 / (2 * re_x)
    if continuity_scaled > 1e-6:
        raise AssertionError("trial velocity fails discrete continuity check")
    if abs(u_trial(x, 0, speed, nu)) > 1e-12:
        raise AssertionError("wall tangential velocity is not zero")
    if abs(v_trial(x, 0, speed, nu)) > 1e-12:
        raise AssertionError("wall normal velocity is not zero")
    return {
        "x_m": x,
        "Re_x": re_x,
        "delta_m": d,
        "delta_over_x": d / x,
        "abs_uxx_over_uyy_at_eta_1": ratio,
        "continuity_fd_residual_scaled": continuity_scaled,
        "u_at_y_delta_over_U": u_trial(x, d, speed, nu) / speed,
        "v_at_y_8delta_m_per_s": v_trial(x, 8 * d, speed, nu),
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--nu", type=float, default=1e-5,
                        help="kinematic viscosity in m^2/s")
    parser.add_argument("--speed", type=float, default=1.0,
                        help="outer tangential speed in m/s")
    parser.add_argument("--length", type=float, default=1.0,
                        help="length of the plate in metres")
    parser.add_argument("--samples", type=int, default=101)
    args = parser.parse_args()
    if args.nu <= 0 or args.speed <= 0 or args.length <= 0:
        parser.error("--nu, --speed and --length must be positive")
    if args.samples < 21 or args.samples > 501:
        parser.error("--samples must be between 21 and 501")

    re_L = args.speed * args.length / args.nu
    xs = [args.length * (0.05 + 0.95 * k / (args.samples - 1))
          for k in range(args.samples)]
    ds = [thickness(x, args.speed, args.nu) for x in xs]
    ratios = [1 / (2 * args.speed * x / args.nu) for x in xs]
    first = point_check(xs[0], args.speed, args.nu)
    last = point_check(xs[-1], args.speed, args.nu)
    if not math.isclose(ds[-1] / args.length, 1 / math.sqrt(re_L),
                        rel_tol=1e-12):
        raise AssertionError("global and local scales disagree")

    print(json.dumps({
        "model": "kinematic_exponential_trial_not_prandtl_solution",
        "units": {"x": "m", "delta": "m", "speed": "m/s"},
        "summary": {
            "Re_L": re_L,
            "delta_at_L_m": ds[-1],
            "delta_over_L": ds[-1] / args.length,
            "expected_inverse_sqrt_Re_L": 1 / math.sqrt(re_L),
            "samples": args.samples,
            "first_point": first,
            "last_point": last,
            "warning": "Thickness prefactor is illustrative; velocity trial is not a momentum-equation solution."
        },
        "plots": [
            {"title": "Local thickness scale (trial model)",
             "x_label": "x (m)", "y_label": "delta (m)", "series": [
                 {"name": "sqrt(nu*x/U)",
                  "points": [[x, d] for x, d in zip(xs, ds)]}
             ]},
            {"title": "Ratio of streamwise to wall-normal viscosity at y=delta",
             "x_label": "x (m)", "y_label": "|u_xx/u_yy|", "series": [
                 {"name": "1/(2 Re_x)",
                  "points": [[x, ratio] for x, ratio in zip(xs, ratios)]}
             ]}
        ]
    }, ensure_ascii=False, allow_nan=False))


if __name__ == "__main__":
    main()
