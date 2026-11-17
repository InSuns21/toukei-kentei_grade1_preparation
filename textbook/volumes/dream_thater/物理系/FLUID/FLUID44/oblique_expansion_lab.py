#!/usr/bin/env python3
"""FLUID44: attached oblique shocks and Prandtl-Meyer expansion fans.

Steady 2D, inviscid calorically perfect gas. This is not a CFD solver.
All reported angles are degrees, physical thermodynamic values use SI units.
"""
import argparse
import json
import math


def _bisect(f, lo, hi, steps=80):
    flo, fhi = f(lo), f(hi)
    if flo == 0:
        return lo
    if fhi == 0:
        return hi
    if flo * fhi >= 0:
        raise ValueError("root is not bracketed")
    for _ in range(steps):
        mid = (lo + hi) / 2
        fm = f(mid)
        if flo * fm <= 0:
            hi, fhi = mid, fm
        else:
            lo, flo = mid, fm
    return (lo + hi) / 2


def mach_angle(mach):
    return math.asin(1 / mach)


def theta_at_beta(mach, gamma, beta):
    mn2 = (mach * math.sin(beta)) ** 2
    return math.atan(2 * (mn2 - 1) / math.tan(beta) /
                     (mach * mach * (gamma + math.cos(2 * beta)) + 2))


def maximum_turn(mach, gamma):
    # Set z=cot(beta)^2. The derivative numerator is AB-(3B+AC)z-Cz^2.
    a = mach * mach - 1
    b = mach * mach * (gamma - 1) + 2
    c = mach * mach * (gamma + 1) + 2
    d = 3 * b + a * c
    z = 2 * a * b / (d + math.sqrt(d * d + 4 * a * b * c))
    beta = math.atan(1 / math.sqrt(z))
    return theta_at_beta(mach, gamma, beta), beta


def oblique(mach, gamma, beta, theta, p1, t1, gas_constant):
    mn1 = mach * math.sin(beta)
    mn1sq = mn1 * mn1
    if mn1 <= 1:
        raise ValueError("normal upstream Mach must exceed one")
    r = (gamma + 1) * mn1sq / ((gamma - 1) * mn1sq + 2)
    p_ratio = 1 + 2 * gamma * (mn1sq - 1) / (gamma + 1)
    t_ratio = p_ratio / r
    rho1 = p1 / (gas_constant * t1)
    q1 = mach * math.sqrt(gamma * gas_constant * t1)
    u1n, u1t = q1 * math.sin(beta), q1 * math.cos(beta)
    u2n, u2t = u1n / r, u1t
    q2 = math.hypot(u2n, u2t)
    t2, p2, rho2 = t1 * t_ratio, p1 * p_ratio, rho1 * r
    m2 = q2 / math.sqrt(gamma * gas_constant * t2)
    mn2sq = (1 + (gamma - 1) * mn1sq / 2) / (
        gamma * mn1sq - (gamma - 1) / 2)
    cp = gamma * gas_constant / (gamma - 1)
    mass1, mass2 = rho1 * u1n, rho2 * u2n
    mom1, mom2 = p1 + rho1 * u1n ** 2, p2 + rho2 * u2n ** 2
    h01, h02 = cp * t1 + q1 ** 2 / 2, cp * t2 + q2 ** 2 / 2
    ds_over_r = (math.log(p_ratio) - gamma * math.log(r)) / (gamma - 1)
    predicted_turn = beta - math.atan2(u2n, u2t)
    return {
        "beta_deg": math.degrees(beta),
        "normal_mach_upstream": mn1,
        "normal_mach_downstream": math.sqrt(mn2sq),
        "Mach_downstream": m2,
        "pressure_ratio": p_ratio,
        "density_ratio": r,
        "temperature_ratio": t_ratio,
        "stagnation_pressure_ratio": math.exp(-ds_over_r),
        "entropy_change_over_R": ds_over_r,
        "normal_mass_flux_kg_m2_s": mass1,
        "normal_momentum_flux_Pa": mom1,
        "total_enthalpy_J_kg": h01,
        "residuals": {
            "turn_angle_rad": abs(predicted_turn - theta),
            "normal_Mach": abs(m2 * math.sin(beta - theta) -
                               math.sqrt(mn2sq)),
            "mass_rel": abs(mass2 - mass1) / mass1,
            "normal_momentum_rel": abs(mom2 - mom1) / mom1,
            "tangential_velocity_rel": abs(u2t - u1t) / q1,
            "total_enthalpy_rel": abs(h02 - h01) / h01
        }
    }


def shock_branches(mach, gamma, theta, p1, t1, gas_constant):
    mu = mach_angle(mach)
    theta_max, beta_star = maximum_turn(mach, gamma)
    status = {
        "Mach_angle_deg": math.degrees(mu),
        "theta_max_deg": math.degrees(theta_max),
        "beta_at_theta_max_deg": math.degrees(beta_star)
    }
    if theta > theta_max + 1e-12:
        status["status"] = "no attached planar shock: deflection exceeds theta_max"
        return status
    if theta <= 0:
        status["status"] = "zero turn: weak wave degenerates; no compression corner"
        return status
    if abs(theta - theta_max) < 1e-12:
        weak = strong = beta_star
    else:
        weak = _bisect(lambda b: theta_at_beta(mach, gamma, b) - theta,
                       mu, beta_star)
        strong = _bisect(lambda b: theta_at_beta(mach, gamma, b) - theta,
                         beta_star, math.pi / 2)
    status["status"] = ("double-root limit" if weak == strong else
                        "attached weak and strong branches")
    status["weak"] = oblique(mach, gamma, weak, theta, p1, t1, gas_constant)
    status["strong"] = oblique(mach, gamma, strong, theta, p1, t1, gas_constant)
    return status


def prandtl_meyer(mach, gamma):
    if mach < 1:
        raise ValueError("Prandtl-Meyer function requires Mach >= 1")
    x = math.sqrt(mach * mach - 1)
    k = math.sqrt((gamma + 1) / (gamma - 1))
    return k * math.atan(x / k) - math.atan(x)


def expansion(mach, gamma, theta, p1, t1, gas_constant):
    limit = (math.sqrt((gamma + 1) / (gamma - 1)) - 1) * math.pi / 2
    target = prandtl_meyer(mach, gamma) + theta
    if target >= limit:
        return {"status": "no finite Mach solution for this isentropic turn",
                "remaining_turn_deg": math.degrees(limit -
                                                    prandtl_meyer(mach, gamma))}
    hi = max(2 * mach, 2.)
    while prandtl_meyer(hi, gamma) < target:
        hi *= 2
    m2 = _bisect(lambda m: prandtl_meyer(m, gamma) - target, mach, hi)
    a = (gamma - 1) / 2
    t_ratio = (1 + a * mach * mach) / (1 + a * m2 * m2)
    p_ratio = t_ratio ** (gamma / (gamma - 1))
    rho_ratio = t_ratio ** (1 / (gamma - 1))
    q1 = mach * math.sqrt(gamma * gas_constant * t1)
    q2 = m2 * math.sqrt(gamma * gas_constant * t1 * t_ratio)
    cp = gamma * gas_constant / (gamma - 1)
    h01 = cp * t1 + q1 ** 2 / 2
    h02 = cp * t1 * t_ratio + q2 ** 2 / 2
    return {
        "status": "isentropic Prandtl-Meyer expansion (no discontinuity)",
        "Mach_downstream": m2,
        "pressure_ratio": p_ratio,
        "density_ratio": rho_ratio,
        "temperature_ratio": t_ratio,
        "stagnation_pressure_ratio": 1.,
        "entropy_change_over_R": (math.log(p_ratio) -
                                  gamma * math.log(rho_ratio)) / (gamma - 1),
        "nu_upstream_deg": math.degrees(prandtl_meyer(mach, gamma)),
        "nu_downstream_deg": math.degrees(prandtl_meyer(m2, gamma)),
        "residuals": {
            "turn_angle_rad": abs(prandtl_meyer(m2, gamma) -
                                  prandtl_meyer(mach, gamma) - theta),
            "total_enthalpy_rel": abs(h02 - h01) / h01
        }
    }


def compute(mach=2., turn_deg=10., gamma=1.4, p1=101325.,
            t1=300., gas_constant=287., grid=80):
    v = (mach, turn_deg, gamma, p1, t1, gas_constant)
    if not all(math.isfinite(x) for x in v):
        raise ValueError("all parameters must be finite")
    if not (1.001 <= mach <= 10 and 0.1 <= turn_deg <= 40 and
            1.1 <= gamma <= 1.67 and 1000 <= p1 <= 1e7 and
            50 <= t1 <= 3000 and 100 <= gas_constant <= 1000 and
            isinstance(grid, int) and 24 <= grid <= 240):
        raise ValueError("ranges: 1.001<=M<=10, 0.1<=turn<=40 deg, "
                         "1.1<=gamma<=1.67, 1000<=p1<=1e7 Pa, "
                         "50<=T1<=3000 K, 100<=R<=1000, grid 24..240")
    turn = math.radians(turn_deg)
    shock = shock_branches(mach, gamma, turn, p1, t1, gas_constant)
    fan = expansion(mach, gamma, turn, p1, t1, gas_constant)
    theta_max, _ = maximum_turn(mach, gamma)
    curves = {"weak_beta": [], "strong_beta": [], "weak_M2": [],
              "strong_M2": [], "weak_pressure": [],
              "strong_pressure": [], "fan_M2": [], "fan_pressure": []}
    # Separate attached-shock scan from expansion scan; no imaginary roots.
    for j in range(grid + 1):
        deg = 0.1 + (math.degrees(theta_max) - 0.1) * j / grid
        if deg > 0:
            z = shock_branches(mach, gamma, math.radians(deg),
                               p1, t1, gas_constant)
            for label, key in (("weak", "weak"), ("strong", "strong")):
                curves[label + "_beta"].append([deg, z[key]["beta_deg"]])
                curves[label + "_M2"].append([deg, z[key]["Mach_downstream"]])
                curves[label + "_pressure"].append([deg, z[key]["pressure_ratio"]])
        f = expansion(mach, gamma, math.radians(deg),
                      p1, t1, gas_constant)
        if f["status"].startswith("isentropic"):
            curves["fan_M2"].append([deg, f["Mach_downstream"]])
            curves["fan_pressure"].append([deg, f["pressure_ratio"]])
    return {
        "model": "STEADY_2D_ATTACHED_OBLIQUE_SHOCK_AND_PM_EXPANSION",
        "assumptions": [
            "calorically perfect gas, gamma and R constant, M1>1",
            "locally planar, stationary, attached shock if theta<=theta_max",
            "normal Rankine-Hugoniot jump, continuous tangential speed",
            "expansion: smooth 2D isentropic irrotational simple-wave fan",
            "no viscous boundary layer, shock reflection, detached bow shock or CFD"
        ],
        "inputs": {"M1": mach, "turn_deg": turn_deg, "gamma": gamma,
                   "p1_Pa": p1, "T1_K": t1, "R_J_kg_K": gas_constant,
                   "grid": grid},
        "shock": shock,
        "expansion": fan,
        "plots": [
            {"title": "Attached shock: weak / strong shock angle",
             "x_label": "compression turn [deg]", "y_label": "beta [deg]",
             "series": [{"name": "weak branch (solid)", "points": curves["weak_beta"]},
                        {"name": "strong branch (dashed)", "points": curves["strong_beta"]}]},
            {"title": "Downstream Mach: compression versus expansion",
             "x_label": "turn magnitude [deg]", "y_label": "Mach [1]",
             "series": [{"name": "shock weak", "points": curves["weak_M2"]},
                        {"name": "shock strong", "points": curves["strong_M2"]},
                        {"name": "expansion fan", "points": curves["fan_M2"]}]},
            {"title": "Static pressure ratio by wave type",
             "x_label": "turn magnitude [deg]", "y_label": "p2/p1 [1]",
             "series": [{"name": "shock weak", "points": curves["weak_pressure"]},
                        {"name": "shock strong", "points": curves["strong_pressure"]},
                        {"name": "expansion fan", "points": curves["fan_pressure"]}]}
        ]
    }


def self_test():
    theta = math.radians(10)
    s = shock_branches(2, 1.4, theta, 101325, 300, 287)
    assert abs(s["Mach_angle_deg"] - 30) < 1e-10
    assert abs(s["theta_max_deg"] - 22.97353176) < 1e-7
    assert abs(s["weak"]["beta_deg"] - 39.31393184) < 1e-7
    assert abs(s["strong"]["beta_deg"] - 83.70008038) < 1e-7
    assert abs(s["weak"]["pressure_ratio"] - 1.706578604) < 1e-8
    for key in ("weak", "strong"):
        q = s[key]
        assert q["entropy_change_over_R"] > 0
        assert q["stagnation_pressure_ratio"] < 1
        assert max(q["residuals"].values()) < 1e-10
    f = expansion(2, 1.4, theta, 101325, 300, 287)
    assert abs(f["Mach_downstream"] - 2.3848871546) < 1e-8
    assert abs(f["pressure_ratio"] - 0.5479687313) < 1e-8
    assert abs(f["entropy_change_over_R"]) < 1e-11
    assert max(f["residuals"].values()) < 1e-11
    assert "no attached" in shock_branches(2, 1.4, math.radians(25),
                                           101325, 300, 287)["status"]
    for kw in ({"mach": 1}, {"turn_deg": 0}, {"gamma": 1},
               {"p1": -1}, {"t1": float("nan")}, {"grid": 10}):
        try:
            compute(**kw)
        except ValueError:
            pass
        else:
            raise AssertionError("invalid inputs accepted: " + str(kw))
    assert len(compute(grid=24)["plots"][0]["series"][0]["points"]) == 25
    return {"self_test": "passed",
            "checks": ["Mach 2 / turn 10 deg weak and strong roots",
                       "normal flux and full stagnation enthalpy residuals",
                       "shock entropy positive / total pressure decreases",
                       "fan Mach, pressure, entropy and enthalpy residuals",
                       "detached-shock rejection and invalid input bounds",
                       "plot data for both branches"]}


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--mach", type=float, default=2.)
    parser.add_argument("--turn", type=float, default=10.)
    parser.add_argument("--gamma", type=float, default=1.4)
    parser.add_argument("--p1", type=float, default=101325.)
    parser.add_argument("--t1", type=float, default=300.)
    parser.add_argument("--gas-constant", type=float, default=287.)
    parser.add_argument("--grid", type=int, default=80)
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args(argv)
    data = (self_test() if args.self_test else
            compute(args.mach, args.turn, args.gamma, args.p1, args.t1,
                    args.gas_constant, args.grid))
    print(json.dumps(data, ensure_ascii=False, allow_nan=False, indent=2))


if __name__ == "__main__":
    main()
