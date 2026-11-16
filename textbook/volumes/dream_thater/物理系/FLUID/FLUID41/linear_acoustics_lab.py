#!/usr/bin/env python3
"""FLUID41: analytic 1-D linear acoustics on a periodic domain.

This is NOT a nonlinear Euler solver, shock capturing, DNS, or an experiment.
p'=P*cos(k*(x-c*t)), v'=p'/(rho*c) for mode=right.
p'=P*cos(k*x)*cos(k*c*t), v'=P/(rho*c)*sin(k*x)*sin(k*c*t)
for mode=standing. For either mode, rho'=p'/c**2.
Outputs plot data, periodic energy, and independent centered-difference
residuals with dx=L/N, dt=dx/(4*c).
"""
import argparse
import json
import math


def state(x, t, mode, rho0, c0, amplitude, length):
    k = 2.0 * math.pi / length
    if mode == "right":
        wave = math.cos(k * (x - c0 * t))
        dp = amplitude * wave
        du = amplitude * wave / (rho0 * c0)
    else:
        dp = amplitude * math.cos(k * x) * math.cos(k * c0 * t)
        du = amplitude * math.sin(k * x) * math.sin(k * c0 * t) / (rho0 * c0)
    return dp, du, dp / (c0 * c0)


def compute(mode="right", grid=256, gamma=1.4, rho0=1.2, p0=101325.0,
            amplitude=100.0, length=10.0, time=0.002):
    if mode not in ("right", "standing"):
        raise ValueError("mode must be right or standing")
    if not isinstance(grid, int) or not 64 <= grid <= 4096:
        raise ValueError("grid must be an integer in [64,4096]")
    args = (gamma, rho0, p0, amplitude, length, time)
    if not all(math.isfinite(a) for a in args):
        raise ValueError("parameters must be finite")
    if not 1.01 <= gamma <= 1.67:
        raise ValueError("gamma must be in [1.01,1.67]")
    if rho0 <= 0 or p0 <= 0 or length <= 0 or not 0 <= time <= 0.05:
        raise ValueError("rho0,p0,length must be positive and 0<=time<=0.05")
    if not 0 < amplitude <= 0.01 * p0:
        raise ValueError("amplitude must be positive and <=1% of base pressure")

    c0 = math.sqrt(gamma * p0 / rho0)
    k = 2.0 * math.pi / length
    dx = length / grid
    dt = dx / (4.0 * c0)
    xs = [i * dx for i in range(grid)]
    s = [state(x, time, mode, rho0, c0, amplitude, length) for x in xs]

    pressure_norm = amplitude * c0 * k
    momentum_norm = amplitude * k
    normalized_pressure_residual = 0.0
    normalized_momentum_residual = 0.0
    for x in xs:
        p_plus, u_plus, _ = state(x, time + dt, mode, rho0, c0, amplitude, length)
        p_minus, u_minus, _ = state(x, time - dt, mode, rho0, c0, amplitude, length)
        px_plus, ux_plus, _ = state(x + dx, time, mode, rho0, c0, amplitude, length)
        px_minus, ux_minus, _ = state(x - dx, time, mode, rho0, c0, amplitude, length)
        dp_dt = (p_plus - p_minus) / (2.0 * dt)
        du_dt = (u_plus - u_minus) / (2.0 * dt)
        dp_dx = (px_plus - px_minus) / (2.0 * dx)
        du_dx = (ux_plus - ux_minus) / (2.0 * dx)
        normalized_pressure_residual = max(
            normalized_pressure_residual,
            abs(dp_dt + rho0 * c0 * c0 * du_dx) / pressure_norm
        )
        normalized_momentum_residual = max(
            normalized_momentum_residual,
            abs(rho0 * du_dt + dp_dx) / momentum_norm
        )

    energies = [(p * p / (2 * rho0 * c0 * c0) + rho0 * u * u / 2)
                for p, u, _ in s]
    mean_energy = sum(energies) / grid
    reference = amplitude ** 2 / (2 * rho0 * c0 * c0)
    if mode == "standing":
        reference /= 2.0
    sample_indices = sorted(set([int(i * grid / 128) for i in range(129)]))
    pressure_points = [[xs[i] if i < grid else length,
                        s[i % grid][0]] for i in sample_indices]
    velocity_points = [[xs[i] if i < grid else length,
                        s[i % grid][1]] for i in sample_indices]
    density_points = [[xs[i] if i < grid else length,
                       s[i % grid][2]] for i in sample_indices]
    initial_p = [[xs[i] if i < grid else length,
                  state(xs[i] if i < grid else length, 0, mode,
                        rho0, c0, amplitude, length)[0]] for i in sample_indices]

    return {
        "model": "ANALYTIC_LINEAR_ACOUSTIC_WAVES_NOT_NONLINEAR_EULER",
        "assumptions": [
            "1D periodic domain, smooth small-amplitude perturbations",
            "homogeneous stationary ideal gas, constant gamma",
            "isentropic, inviscid, no heat flux, no body forces",
            "analytical wave sampled on grid; centered differences only diagnose residual"
        ],
        "units": {"x": "m", "time": "s", "p_prime": "Pa",
                  "v_prime": "m/s", "rho_prime": "kg/m3",
                  "energy_density": "J/m3", "c0": "m/s"},
        "inputs": {"mode": mode, "grid": grid, "gamma": gamma,
                   "rho0_kg_m3": rho0, "p0_Pa": p0, "amplitude_Pa": amplitude,
                   "domain_length_m": length, "time_s": time},
        "diagnostics": {
            "sound_speed_m_s": c0,
            "right_characteristic_m_s": c0,
            "left_characteristic_m_s": -c0,
            "wavelength_m": length,
            "period_s": length / c0,
            "max_relative_pressure_perturbation": amplitude / p0,
            "max_relative_density_perturbation": amplitude / (rho0 * c0 * c0),
            "min_total_density_kg_m3": rho0 + min(v[2] for v in s),
            "min_total_pressure_Pa": p0 + min(v[0] for v in s),
            "mean_acoustic_energy_J_m3": mean_energy,
            "reference_mean_energy_J_m3": reference,
            "relative_energy_error": abs(mean_energy - reference) / reference,
            "max_normalized_pressure_residual": normalized_pressure_residual,
            "max_normalized_momentum_residual": normalized_momentum_residual,
            "difference_dx_m": dx, "difference_dt_s": dt
        },
        "plots": [
            {"title": "Acoustic pressure: exact linear wave (not Euler simulation)",
             "x_label": "x [m]", "y_label": "p' [Pa]", "series": [
                {"name": "analytic at t=0", "points": initial_p},
                {"name": "analytic at selected time", "points": pressure_points}]},
            {"title": "Acoustic velocity perturbation",
             "x_label": "x [m]", "y_label": "v' [m/s]", "series": [
                {"name": "analytic v' at selected time", "points": velocity_points}]},
            {"title": "Density perturbation (isentropic p'=c0²*rho')",
             "x_label": "x [m]", "y_label": "rho' [kg/m3]", "series": [
                {"name": "analytic rho' at selected time", "points": density_points}]}
        ]
    }


def self_test():
    for mode in ("right", "standing"):
        coarse = compute(mode=mode, grid=128)
        fine = compute(mode=mode, grid=256)
        cc = coarse["diagnostics"]
        ff = fine["diagnostics"]
        assert ff["min_total_pressure_Pa"] > 0
        assert ff["min_total_density_kg_m3"] > 0
        assert ff["relative_energy_error"] < 1e-12
        for key in ("max_normalized_pressure_residual",
                    "max_normalized_momentum_residual"):
            assert ff[key] < 0.002, (mode, key, ff[key])
            assert 3 < cc[key] / ff[key] < 5, (mode, key, cc[key], ff[key])
        assert abs(ff["sound_speed_m_s"] ** 2 -
                   1.4 * 101325.0 / 1.2) < 1e-8
    for kw in ({"amplitude": 0}, {"amplitude": 100000},
               {"rho0": -1}, {"gamma": 1}, {"grid": 2},
               {"p0": float("nan")}, {"mode": "shock"}):
        try:
            compute(**kw)
        except ValueError:
            pass
        else:
            raise AssertionError("invalid inputs accepted")
    return {"self_test": "passed",
            "cases": "both wave modes, sound speed, energy, second-order residual refinement, input guards"}


def main(argv=None):
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--mode", choices=("right", "standing"), default="right")
    p.add_argument("--grid", type=int, default=256)
    p.add_argument("--gamma", type=float, default=1.4)
    p.add_argument("--rho0", type=float, default=1.2)
    p.add_argument("--p0", type=float, default=101325.0)
    p.add_argument("--amplitude", type=float, default=100.0)
    p.add_argument("--length", type=float, default=10.0)
    p.add_argument("--time", type=float, default=0.002)
    p.add_argument("--self-test", action="store_true")
    a = p.parse_args(argv)
    result = (self_test() if a.self_test else
              compute(a.mode, a.grid, a.gamma, a.rho0, a.p0,
                      a.amplitude, a.length, a.time))
    print(json.dumps(result, ensure_ascii=False, allow_nan=False, indent=2))


if __name__ == "__main__":
    main()
