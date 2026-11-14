#!/usr/bin/env python3
"""FLUID22: Blasius boundary-value shooting and wall-friction check.

Pure Python standard library; JSON "plots" are rendered by python-file-lab.
ODE: f''' + 0.5*f*f'' = 0, f(0)=f'(0)=0, f'(infinity)=1.
The finite cutoff eta_max approximates the condition at infinity.
"""
import argparse
import json
import math


def rhs(state):
    f, g, h = state
    return (g, h, -0.5 * f * h)


def add(state, slope, factor):
    return tuple(x + factor * y for x, y in zip(state, slope))


def rk4(state, step):
    k1 = rhs(state)
    k2 = rhs(add(state, k1, step / 2))
    k3 = rhs(add(state, k2, step / 2))
    k4 = rhs(add(state, k3, step))
    return tuple(x + step * (a + 2 * b + 2 * c + d) / 6
                 for x, a, b, c, d in zip(state, k1, k2, k3, k4))


def integrate(wall_curvature, eta_max, step, record=False):
    n = math.ceil(eta_max / step)
    h = eta_max / n
    state = (0.0, 0.0, wall_curvature)
    points = [(0.0, *state)] if record else None
    for k in range(1, n + 1):
        state = rk4(state, h)
        if not all(math.isfinite(x) for x in state):
            raise ArithmeticError("non-finite Blasius shooting trajectory")
        if record:
            points.append((k * h, *state))
    return state, points


def shoot(eta_max, step):
    lower, upper = 0.2, 0.5
    gl = integrate(lower, eta_max, step)[0][1]
    gu = integrate(upper, eta_max, step)[0][1]
    if not (gl < 1 < gu):
        raise ArithmeticError("shooting interval does not bracket f'(eta_max)=1")
    for _ in range(52):
        mid = (lower + upper) / 2
        gm = integrate(mid, eta_max, step)[0][1]
        if gm < 1:
            lower = mid
        else:
            upper = mid
    a = (lower + upper) / 2
    final, points = integrate(a, eta_max, step, record=True)
    return a, final, points


def eta_at_fraction(points, fraction):
    for left, right in zip(points[:-1], points[1:]):
        e0, _, g0, _ = left
        e1, _, g1, _ = right
        if g0 <= fraction <= g1:
            return e0 + (fraction - g0) * (e1 - e0) / (g1 - g0)
    raise ArithmeticError("eta_max too short to reach requested velocity ratio")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--speed", type=float, default=2.0, help="U [m/s]")
    parser.add_argument("--nu", type=float, default=1e-6, help="nu [m^2/s]")
    parser.add_argument("--rho", type=float, default=1000.0, help="rho [kg/m^3]")
    parser.add_argument("--x", type=float, default=0.5, help="downstream x [m]")
    parser.add_argument("--eta-max", type=float, default=12.0)
    parser.add_argument("--step", type=float, default=0.05)
    args = parser.parse_args()
    if not all(v > 0 and math.isfinite(v)
               for v in (args.speed, args.nu, args.rho, args.x)):
        parser.error("speed, nu, rho and x must be finite positive")
    if not (8 <= args.eta_max <= 20 and 0.01 <= args.step <= 0.25):
        parser.error("require 8 <= eta-max <= 20 and 0.01 <= step <= 0.25")

    a, final, points = shoot(args.eta_max, args.step)
    refined, _, _ = shoot(args.eta_max, args.step / 2)
    eta99 = eta_at_fraction(points, 0.99)
    re_x = args.speed * args.x / args.nu
    scale = math.sqrt(args.nu * args.x / args.speed)
    mu = args.rho * args.nu
    wall_shear = mu * args.speed * a / scale
    cf = wall_shear / (0.5 * args.rho * args.speed ** 2)
    if not (0 < a < 1 and abs(final[1] - 1) < 2e-10):
        raise AssertionError("shooting boundary condition failed")
    if abs(cf * math.sqrt(re_x) - 2 * a) > 1e-10:
        raise AssertionError("wall shear and friction coefficient disagree")

    print(json.dumps({
        "model": "Blasius_flat_plate_zero_pressure_gradient_laminar",
        "method": "RK4_plus_bisection_shooting_at_finite_eta",
        "boundary": {"f(0)": 0, "f_prime(0)": 0,
                     "f_prime_at_eta_max": final[1], "target_at_infinity": 1},
        "numerics": {"eta_max": args.eta_max, "step_requested": args.step,
                     "wall_f_second_0": a, "refined_half_step": refined,
                     "abs_step_difference": abs(a - refined),
                     "eta_99_interpolated": eta99},
        "physical": {"Re_x": re_x, "delta_scale_m": scale,
                     "delta_99_m": eta99 * scale,
                     "wall_shear_Pa": wall_shear,
                     "Cf_local": cf, "Cf_times_sqrt_Re_x": cf * math.sqrt(re_x)},
        "notes": "Finite eta cutoff, RK4 discretization and interpolation introduce error; \
not a proof of continuous BVP existence/uniqueness. Valid for attached laminar high-Re boundary layer away from leading edge.",
        "plots": [
            {"title": "Blasius tangential velocity u/U = f'(eta)",
             "x_label": "eta = y sqrt(U/(nu x))", "y_label": "u/U",
             "series": [
                 {"name": "f'(eta)", "points": [[e, g] for e, _, g, _ in points]},
                 {"name": "outer flow (1)", "points": [[0, 1], [args.eta_max, 1]]}
             ]},
            {"title": "Blasius wall-normal velocity gradient f''(eta)",
             "x_label": "eta", "y_label": "f''(eta)",
             "series": [
                 {"name": "f''(eta)", "points": [[e, h] for e, _, _, h in points]}
             ]}
        ]
    }, ensure_ascii=False, allow_nan=False))


if __name__ == "__main__":
    main()
