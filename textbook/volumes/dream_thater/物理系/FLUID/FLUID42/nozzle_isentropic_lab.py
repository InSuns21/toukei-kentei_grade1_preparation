#!/usr/bin/env python3
"""FLUID42: analytic quasi-one-dimensional isentropic nozzle branches.

Computes subsonic and supersonic roots of A/A*(M) by bisection.
These are smooth local ideal-gas branches, NOT a shock or a nozzle PDE solver.
All pressure and temperature outputs refer to the same stagnation state.
"""
import argparse
import json
import math


def area_ratio(mach, gamma):
    if not (mach > 0 and gamma > 1):
        raise ValueError("Mach and gamma must be positive, gamma > 1")
    a = 0.5 * (gamma - 1)
    b = (gamma + 1) / (2 * (gamma - 1))
    return (1 + a * mach * mach) ** b * (2 / (gamma + 1)) ** b / mach


def roots(ratio, gamma):
    if ratio < 1 or not math.isfinite(ratio):
        raise ValueError("A/A* must be finite and >= 1")
    if ratio == 1:
        return 1., 1.
    # Both branches are monotone; bracket each side of M=1.
    lo, hi = 1e-9, 1.
    for _ in range(90):
        mid = (lo + hi) / 2
        if area_ratio(mid, gamma) > ratio:
            lo = mid
        else:
            hi = mid
    subsonic = (lo + hi) / 2
    lo, hi = 1., 2.
    while area_ratio(hi, gamma) < ratio:
        hi *= 2
        if hi > 1024:
            raise ValueError("supersonic root not bracketed")
    for _ in range(90):
        mid = (lo + hi) / 2
        if area_ratio(mid, gamma) < ratio:
            lo = mid
        else:
            hi = mid
    return subsonic, (lo + hi) / 2


def local_state(mach, gamma, p0, t0, gas_constant):
    alpha = (gamma - 1) / 2
    tau = 1 + alpha * mach * mach
    temperature = t0 / tau
    pressure = p0 / tau ** (gamma / (gamma - 1))
    density = pressure / (gas_constant * temperature)
    sound_speed = math.sqrt(gamma * gas_constant * temperature)
    velocity = mach * sound_speed
    cp = gamma * gas_constant / (gamma - 1)
    return {"Mach": mach, "temperature_K": temperature,
            "pressure_Pa": pressure, "density_kg_m3": density,
            "speed_m_s": velocity, "sound_speed_m_s": sound_speed,
            "stagnation_enthalpy_J_kg": cp * temperature + velocity ** 2 / 2}


def compute(ratio=1.6875, gamma=1.4, p0=101325., t0=300.,
            gas_constant=287., throat_area=0.01, grid=128):
    numbers = [ratio, gamma, p0, t0, gas_constant, throat_area]
    if not all(math.isfinite(x) for x in numbers):
        raise ValueError("all parameters must be finite")
    if not (1.0 <= ratio <= 5 and 1.1 <= gamma <= 1.67 and
            1000 <= p0 <= 1e7 and 50 <= t0 <= 3000 and
            100 <= gas_constant <= 1000 and
            1e-5 <= throat_area <= 10):
        raise ValueError("out of range: A/A* [1,5], gamma [1.1,1.67], "
                         "p0 [1000,1e7], T0 [50,3000], R [100,1000], "
                         "A* [1e-5,10]")
    if not isinstance(grid, int) or not 32 <= grid <= 512:
        raise ValueError("grid must be integer in [32,512]")

    m_sub, m_sup = roots(ratio, gamma)
    critical_pressure_ratio = (2 / (gamma + 1)) ** (gamma / (gamma - 1))
    mass_flux_star = (
        p0 * math.sqrt(gamma / (gas_constant * t0))
        * (2 / (gamma + 1)) ** ((gamma + 1) / (2 * (gamma - 1)))
    )
    mass_flow = throat_area * mass_flux_star
    profiles = {"sub_M": [], "sup_M": [], "sub_p": [], "sup_p": []}
    max_area_error = 0.
    max_mass_error = 0.
    max_energy_error = 0.
    cp = gamma * gas_constant / (gamma - 1)
    for i in range(grid + 1):
        a_ratio = 1 + (ratio - 1) * i / grid
        branches = roots(a_ratio, gamma)
        for kind, m in zip(("sub", "sup"), branches):
            state = local_state(m, gamma, p0, t0, gas_constant)
            profiles[kind + "_M"].append([a_ratio, m])
            profiles[kind + "_p"].append([a_ratio, state["pressure_Pa"] / p0])
            max_area_error = max(max_area_error, abs(area_ratio(m, gamma) - a_ratio))
            reconstructed_mass = (
                state["density_kg_m3"] * state["speed_m_s"]
                * throat_area * a_ratio
            )
            max_mass_error = max(max_mass_error,
                                 abs(reconstructed_mass / mass_flow - 1))
            max_energy_error = max(max_energy_error,
                                   abs(state["stagnation_enthalpy_J_kg"] /
                                       (cp * t0) - 1))
    s_sub = local_state(m_sub, gamma, p0, t0, gas_constant)
    s_sup = local_state(m_sup, gamma, p0, t0, gas_constant)
    return {
        "model": "STEADY_SMOOTH_ISENTROPIC_QUASI_1D_NO_SHOCK",
        "assumptions": [
            "ideal gas with fixed gamma and R; p0,T0 uniform stagnation data",
            "smooth quasi-1D steady inviscid adiabatic reversible flow",
            "no shock, heat transfer, shaft work, wall friction or body force",
            "two algebraic branches at each A/A*; not a back-pressure solver"
        ],
        "units": {"area": "m2", "temperature": "K", "pressure": "Pa",
                  "speed": "m/s", "mass_flow": "kg/s", "Mach": "dimensionless"},
        "inputs": {"area_ratio": ratio, "gamma": gamma, "p0_Pa": p0,
                   "t0_K": t0, "R_J_kg_K": gas_constant,
                   "throat_area_m2": throat_area, "grid": grid},
        "diagnostics": {
            "critical_pressure_to_stagnation": critical_pressure_ratio,
            "critical_mass_flux_kg_m2_s": mass_flux_star,
            "critical_mass_flow_kg_s": mass_flow,
            "subsonic": s_sub, "supersonic": s_sup,
            "max_area_ratio_absolute_residual": max_area_error,
            "max_mass_flux_relative_residual": max_mass_error,
            "max_energy_relative_residual": max_energy_error,
            "branch_count_at_selected_area": 1 if ratio == 1 else 2
        },
        "plots": [
            {"title": "Area-Mach: subsonic and supersonic roots",
             "x_label": "A/A* [1]", "y_label": "Mach [1]", "series": [
                 {"name": "subsonic root", "points": profiles["sub_M"]},
                 {"name": "supersonic root", "points": profiles["sup_M"]}]},
            {"title": "Isentropic static pressure, both branches (not shocks)",
             "x_label": "A/A* [1]", "y_label": "p/p0 [1]", "series": [
                 {"name": "subsonic root", "points": profiles["sub_p"]},
                 {"name": "supersonic root", "points": profiles["sup_p"]}]}
        ]
    }


def self_test():
    r = compute()
    d = r["diagnostics"]
    assert abs(area_ratio(2., 1.4) - 1.6875) < 1e-12
    assert abs(d["supersonic"]["Mach"] - 2.) < 1e-10
    assert abs(d["subsonic"]["Mach"] - 0.3722444862) < 1e-8
    assert abs(d["critical_pressure_to_stagnation"] - 0.5282817877) < 1e-9
    assert abs(d["critical_mass_flow_kg_s"] - 2.3644782115) < 1e-8
    for key in ("max_area_ratio_absolute_residual",
                "max_mass_flux_relative_residual",
                "max_energy_relative_residual"):
        assert d[key] < 1e-10, (key, d[key])
    assert compute(ratio=1.)["diagnostics"]["branch_count_at_selected_area"] == 1
    for kw in ({"ratio": 0.99}, {"gamma": 1.0}, {"p0": -1},
               {"t0": float("nan")}, {"grid": 3}, {"throat_area": 0}):
        try:
            compute(**kw)
        except ValueError:
            pass
        else:
            raise AssertionError("invalid parameters accepted: " + str(kw))
    return {"self_test": "passed",
            "checks": "M=2 reference, subsonic branch, critical pressure and "
                      "mass flow, full-grid area/mass/energy residuals, bounds"}


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--area-ratio", type=float, default=1.6875)
    parser.add_argument("--gamma", type=float, default=1.4)
    parser.add_argument("--p0", type=float, default=101325.)
    parser.add_argument("--t0", type=float, default=300.)
    parser.add_argument("--gas-constant", type=float, default=287.)
    parser.add_argument("--throat-area", type=float, default=0.01)
    parser.add_argument("--grid", type=int, default=128)
    parser.add_argument("--self-test", action="store_true")
    a = parser.parse_args(argv)
    value = (self_test() if a.self_test else compute(
        a.area_ratio, a.gamma, a.p0, a.t0,
        a.gas_constant, a.throat_area, a.grid))
    print(json.dumps(value, ensure_ascii=False, allow_nan=False, indent=2))


if __name__ == "__main__":
    main()
