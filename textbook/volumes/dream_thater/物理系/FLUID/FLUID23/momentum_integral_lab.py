#!/usr/bin/env python3
"""FLUID23: integrate a quartic boundary-layer profile and check flat-plate drag.

Pure standard library. The Blasius reference is taken from the preceding
FLUID22 shooting exercise; increasing n does not remove profile-model error.
The 'plots' object is consumed by the existing python-file-lab browser viewer.
"""
import argparse
import json
import math


C_EXACT = 37.0 / 315.0
DISPLACEMENT_EXACT = 3.0 / 10.0
BLASIUS_A = 0.3320573362


def profile(z):
    if z < 0.0:
        raise ValueError("z must be nonnegative")
    if z >= 1.0:
        return 1.0
    return 2.0 * z - 2.0 * z ** 3 + z ** 4


def trapz(values, spacing):
    return spacing * (sum(values) - 0.5 * (values[0] + values[-1]))


def integrals(n):
    nodes = [i / n for i in range(n + 1)]
    speeds = [profile(z) for z in nodes]
    mass = trapz([1.0 - g for g in speeds], 1.0 / n)
    momentum = trapz([g * (1.0 - g) for g in speeds], 1.0 / n)
    return mass, momentum, list(zip(nodes, speeds))


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--n", type=int, default=80, help="intervals for composite trapezoid")
    p.add_argument("--speed", type=float, default=2.0, help="outer speed U [m/s]")
    p.add_argument("--nu", type=float, default=1e-6, help="kinematic viscosity [m^2/s]")
    p.add_argument("--rho", type=float, default=1000.0, help="density [kg/m^3]")
    p.add_argument("--length", type=float, default=0.5, help="plate length L [m]")
    args = p.parse_args()
    if not 8 <= args.n <= 2000:
        p.error("require 8 <= n <= 2000")
    if not all(math.isfinite(v) and v > 0.0
               for v in (args.speed, args.nu, args.rho, args.length)):
        p.error("speed, nu, rho, and length must be finite positive")

    mass_n, momentum_n, points = integrals(args.n)
    mass_refined, momentum_refined, _ = integrals(2 * args.n)
    re_l = args.speed * args.length / args.nu
    d = math.sqrt(args.nu * args.length / args.speed)
    delta = 2.0 * d / math.sqrt(C_EXACT)
    theta = C_EXACT * delta
    displacement = DISPLACEMENT_EXACT * delta
    wall_shear = 2.0 * args.rho * args.nu * args.speed / delta
    cf_local = 2.0 * wall_shear / (args.rho * args.speed ** 2)
    cf_local_from_integral = 2.0 * math.sqrt(C_EXACT) / math.sqrt(re_l)
    cf_average = 2.0 * theta / args.length
    force = args.rho * args.speed ** 2 * theta
    force_blasius = (2.0 * BLASIUS_A) * args.rho * args.speed ** 2 * d

    assert abs(mass_n - DISPLACEMENT_EXACT) < 0.1
    assert abs(momentum_n - C_EXACT) < 0.1
    assert abs(cf_local - cf_local_from_integral) < 1e-12 * max(1, cf_local)
    assert abs(force - 0.5 * args.rho * args.speed ** 2 *
               args.length * cf_average) < 1e-11 * max(1, force)
    assert math.isfinite(force_blasius)

    print(json.dumps({
        "model": "attached_laminar_flat_plate_quartic_integral_approximation",
        "profile": "g(z)=2z-2z^3+z^4 for 0<=z<=1; 1 outside",
        "inputs": {"n": args.n, "U_m_s": args.speed, "nu_m2_s": args.nu,
                   "rho_kg_m3": args.rho, "L_m": args.length},
        "quadrature": {
            "displacement_integral_trapezoid": mass_n,
            "displacement_integral_refined": mass_refined,
            "displacement_integral_exact": DISPLACEMENT_EXACT,
            "displacement_absolute_error": abs(mass_n - DISPLACEMENT_EXACT),
            "momentum_integral_trapezoid": momentum_n,
            "momentum_integral_refined": momentum_refined,
            "momentum_integral_exact": C_EXACT,
            "momentum_absolute_error": abs(momentum_n - C_EXACT),
            "momentum_halving_difference": abs(momentum_n - momentum_refined)
        },
        "physical": {
            "Re_L": re_l,
            "delta_profile_edge_m": delta,
            "delta_star_m": displacement,
            "theta_m": theta,
            "shape_factor": displacement / theta,
            "wall_shear_at_L_Pa": wall_shear,
            "Cf_local_at_L": cf_local,
            "Cf_local_from_momentum_integral": cf_local_from_integral,
            "Cf_average_one_face": cf_average,
            "drag_one_face_N_per_m_span": force,
            "Blasius_drag_N_per_m_span": force_blasius,
            "quartic_model_overestimate_percent":
                100.0 * (force / force_blasius - 1.0)
        },
        "notes": "Grid refinement removes trapezoidal quadrature error only; "
                 "the polynomial-profile model error remains. "
                 "Attached laminar high-Re boundary layer; one face, per unit span.",
        "plots": [
            {"title": "Profile and displacement deficit",
             "x_label": "z = y / delta", "y_label": "dimensionless",
             "series": [
                 {"name": "u/U = g(z)",
                  "points": [[z, g] for z, g in points]},
                 {"name": "displacement deficit 1-g",
                  "points": [[z, 1.0 - g] for z, g in points]},
                 {"name": "outer speed ratio 1",
                  "points": [[0, 1], [1, 1]]}
             ]},
            {"title": "Momentum deficit density",
             "x_label": "z = y / delta",
             "y_label": "g(z) (1-g(z))",
             "series": [
                 {"name": "momentum deficit",
                  "points": [[z, g * (1.0 - g)] for z, g in points]}
             ]}
        ]
    }, ensure_ascii=False, allow_nan=False))


if __name__ == "__main__":
    main()
