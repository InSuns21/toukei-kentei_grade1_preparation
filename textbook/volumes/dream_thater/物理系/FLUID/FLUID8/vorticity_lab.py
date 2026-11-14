"""FLUID8: check analytic baroclinic curl against an independent finite difference.

This is an instantaneous local calculation, NOT a time integrator for Euler flow.
Standard-library only; x and h are metres, a is 1/metre, b is Pa/metre,
rho0 is kg/m^3, and results have units s^-2.
"""
import argparse
import json
import math


def finite_float(value):
    result = float(value)
    if not math.isfinite(result):
        raise argparse.ArgumentTypeError("parameters must be finite")
    return result


def check_baroclinic(rho0=2.0, a=0.2, b=6.0, x=1.0, h=0.1):
    """Return the exact source and central difference curl of initial acceleration."""
    values = (rho0, a, b, x, h)
    if any(not math.isfinite(v) for v in values):
        raise ValueError("all inputs must be finite")
    if rho0 <= 0 or h <= 0:
        raise ValueError("rho0 and h must be strictly positive")
    if min(1 + a * (x - h), 1 + a * x, 1 + a * (x + h)) <= 0:
        raise ValueError("density must be positive at x and x ± h")
    # Analytical source: grad(rho)=(rho0*a,0,0), grad(p)=(0,b,0).
    exact = a * b / (rho0 * (1.0 + a * x) ** 2)

    # Independently: Euler initial acceleration has a_y=-b/rho(x).
    def acceleration_y(position):
        return -b / (rho0 * (1.0 + a * position))

    central_curl = (acceleration_y(x + h) - acceleration_y(x - h)) / (2.0 * h)
    h2 = h / 2.0
    half_step_curl = (acceleration_y(x + h2) - acceleration_y(x - h2)) / (2.0 * h2)
    return {
        "rho0_kg_per_m3": rho0, "a_per_m": a, "b_Pa_per_m": b,
        "x_m": x, "h_m": h, "rho_at_x": rho0 * (1 + a * x),
        "analytical_source_z_per_s2": exact,
        "central_difference_curl_z_per_s2": central_curl,
        "half_step_difference_curl_z_per_s2": half_step_curl,
        "absolute_error_h": abs(central_curl - exact),
        "absolute_error_h_over_2": abs(half_step_curl - exact),
        "simple_shear_curl_z_for_a": -a,
        "solid_rotation_curl_z_for_omega_1": 2.0,
        "note": "Instantaneous derivatives only; no fluid trajectory or Euler PDE time integration.",
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--rho0", type=finite_float, default=2.0)
    parser.add_argument("--a", type=finite_float, default=0.2)
    parser.add_argument("--b", type=finite_float, default=6.0)
    parser.add_argument("--x", type=finite_float, default=1.0)
    parser.add_argument("--h", type=finite_float, default=0.1)
    args = parser.parse_args()
    result = check_baroclinic(args.rho0, args.a, args.b, args.x, args.h)
    print(json.dumps(result, indent=2, ensure_ascii=False, allow_nan=False))


if __name__ == "__main__":
    main()
