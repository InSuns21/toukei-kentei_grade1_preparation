#!/usr/bin/env python3
"""FLUID43: exact normal-shock jump for a calorically perfect ideal gas.

Algebraic Rankine-Hugoniot states only; not a shock thickness or CFD solver.
The shock is stationary and upstream velocity is positive in its rest frame.
"""
import argparse
import json
import math


def shock(mach, gamma=1.4, p1=101325.0, t1=300.0, gas_constant=287.0):
    inputs = (mach, gamma, p1, t1, gas_constant)
    if not all(math.isfinite(z) for z in inputs):
        raise ValueError("all parameters must be finite")
    if not (1.001 <= mach <= 10 and 1.1 <= gamma <= 1.67 and
            1000 <= p1 <= 1e7 and 50 <= t1 <= 3000 and
            100 <= gas_constant <= 1000):
        raise ValueError("ranges: 1.001<=M1<=10, 1.1<=gamma<=1.67, "
                         "1000<=p1<=1e7 Pa, 50<=T1<=3000 K, 100<=R<=1000")

    q = mach * mach
    density_ratio = (gamma + 1) * q / ((gamma - 1) * q + 2)
    pressure_ratio = 1 + 2 * gamma * (q - 1) / (gamma + 1)
    temp_ratio = pressure_ratio / density_ratio
    mach2_squared = (1 + (gamma - 1) * q / 2) / (gamma * q - (gamma - 1) / 2)
    m2 = math.sqrt(mach2_squared)
    cv = gas_constant / (gamma - 1)
    cp = gamma * cv
    rho1 = p1 / (gas_constant * t1)
    u1 = mach * math.sqrt(gamma * gas_constant * t1)
    rho2 = rho1 * density_ratio
    p2 = p1 * pressure_ratio
    t2 = t1 * temp_ratio
    u2 = u1 / density_ratio
    mass1 = rho1 * u1
    mass2 = rho2 * u2
    momentum1 = p1 + rho1 * u1 * u1
    momentum2 = p2 + rho2 * u2 * u2
    h01 = cp * t1 + u1 * u1 / 2
    h02 = cp * t2 + u2 * u2 / 2
    entropy_over_R = (math.log(pressure_ratio) -
                      gamma * math.log(density_ratio)) / (gamma - 1)
    stagnation_ratio = math.exp(-entropy_over_R)
    return {
        "upstream": {"Mach": mach, "p_Pa": p1, "T_K": t1,
                     "rho_kg_m3": rho1, "u_m_s": u1},
        "downstream": {"Mach": m2, "p_Pa": p2, "T_K": t2,
                       "rho_kg_m3": rho2, "u_m_s": u2},
        "ratios": {"p2_p1": pressure_ratio, "rho2_rho1": density_ratio,
                   "T2_T1": temp_ratio, "u2_u1": 1 / density_ratio,
                   "p02_p01": stagnation_ratio},
        "diagnostics": {
            "mass_flux_kg_m2_s": mass1,
            "mass_relative_residual": abs(mass2 - mass1) / mass1,
            "momentum_relative_residual": abs(momentum2 - momentum1) / momentum1,
            "stagnation_enthalpy_J_kg": h01,
            "energy_relative_residual": abs(h02 - h01) / h01,
            "entropy_change_J_kg_K": gas_constant * entropy_over_R,
            "entropy_change_over_R": entropy_over_R,
            "M2_from_velocity_and_sound_speed": u2 / math.sqrt(gamma * gas_constant * t2)
        }
    }


def compute(mach=2.0, gamma=1.4, p1=101325., t1=300.,
            gas_constant=287., grid=128):
    if not isinstance(grid, int) or not 32 <= grid <= 512:
        raise ValueError("grid must be an integer in [32,512]")
    selected = shock(mach, gamma, p1, t1, gas_constant)
    curves = {"pressure": [], "density": [], "mach2": [], "entropy": [],
              "stagnation": []}
    limit = max(3.0, mach)
    for j in range(grid + 1):
        x = 1.001 + (limit - 1.001) * j / grid
        z = shock(x, gamma, p1, t1, gas_constant)
        curves["pressure"].append([x, z["ratios"]["p2_p1"]])
        curves["density"].append([x, z["ratios"]["rho2_rho1"]])
        curves["mach2"].append([x, z["downstream"]["Mach"]])
        curves["entropy"].append([x, z["diagnostics"]["entropy_change_over_R"]])
        curves["stagnation"].append([x, z["ratios"]["p02_p01"]])
    return {
        "model": "STEADY_ONE_DIMENSIONAL_NORMAL_SHOCK_IDEAL_GAS",
        "assumptions": [
            "shock rest frame; uniform upstream and downstream states",
            "gamma and R constant, ideal gas, rho>0, p>0, upstream M1>1",
            "adiabatic no shaft work, net viscosity and heat conduction "
            "confined to a thin shock layer",
            "jump equations only: no nozzle geometry, shock position or shock thickness"
        ],
        "inputs": {"M1": mach, "gamma": gamma, "p1_Pa": p1,
                   "T1_K": t1, "R_J_kg_K": gas_constant, "grid": grid},
        "units": {"pressure": "Pa", "density": "kg/m3", "temperature": "K",
                  "speed": "m/s", "entropy": "J/(kg K)"},
        "selected": selected,
        "plots": [
            {"title": "Normal shock pressure and density jumps",
             "x_label": "upstream Mach M1 [1]", "y_label": "ratio [1]",
             "series": [{"name": "p2/p1 (solid)", "points": curves["pressure"]},
                        {"name": "rho2/rho1 (different quantity)", "points": curves["density"]}]},
            {"title": "Downstream Mach and normalized stagnation pressure",
             "x_label": "upstream Mach M1 [1]", "y_label": "ratio [1]",
             "series": [{"name": "M2", "points": curves["mach2"]},
                        {"name": "p02/p01", "points": curves["stagnation"]}]},
            {"title": "Entropy generated by a normal shock",
             "x_label": "upstream Mach M1 [1]", "y_label": "(s2-s1)/R [1]",
             "series": [{"name": "entropy increase", "points": curves["entropy"]}]}
        ]
    }


def self_test():
    z = shock(2)
    r = z["ratios"]
    d = z["diagnostics"]
    assert abs(r["rho2_rho1"] - 8 / 3) < 1e-12
    assert abs(r["p2_p1"] - 4.5) < 1e-12
    assert abs(r["T2_T1"] - 27 / 16) < 1e-12
    assert abs(z["downstream"]["Mach"] - 1 / math.sqrt(3)) < 1e-12
    assert abs(d["entropy_change_over_R"] - 0.327291106399644) < 1e-12
    assert all(d[k] < 1e-12 for k in
               ("mass_relative_residual", "momentum_relative_residual",
                "energy_relative_residual"))
    for m in (1.001, 1.1, 1.5, 2., 5., 10.):
        item = shock(m, 1.3)
        assert item["downstream"]["Mach"] < 1
        assert item["diagnostics"]["entropy_change_over_R"] > 0
        assert item["ratios"]["p02_p01"] < 1
        assert max(item["diagnostics"][key] for key in
                   ("mass_relative_residual", "momentum_relative_residual",
                    "energy_relative_residual")) < 1e-12
    for kw in ({"mach": 1}, {"mach": 0.5}, {"gamma": 1},
               {"p1": -1}, {"t1": float("nan")}, {"gas_constant": 0}):
        try:
            shock(**{"mach": 2.0, **kw})
        except ValueError:
            pass
        else:
            raise AssertionError("accepted invalid parameters " + str(kw))
    assert len(compute(grid=32)["plots"][0]["series"][0]["points"]) == 33
    return {"self_test": "passed", "checks": [
        "M1=2 analytic ratios and entropy",
        "mass / momentum / energy flux residuals",
        "downstream subsonic and entropy positive for weak/strong shocks",
        "invalid inputs and grid bounds"
    ]}


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--mach", type=float, default=2.)
    parser.add_argument("--gamma", type=float, default=1.4)
    parser.add_argument("--p1", type=float, default=101325.)
    parser.add_argument("--t1", type=float, default=300.)
    parser.add_argument("--gas-constant", type=float, default=287.)
    parser.add_argument("--grid", type=int, default=128)
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args(argv)
    out = (self_test() if args.self_test else
           compute(args.mach, args.gamma, args.p1, args.t1,
                   args.gas_constant, args.grid))
    print(json.dumps(out, ensure_ascii=False, allow_nan=False, indent=2))


if __name__ == "__main__":
    main()
