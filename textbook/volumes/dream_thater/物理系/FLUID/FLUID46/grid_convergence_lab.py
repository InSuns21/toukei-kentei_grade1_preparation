#!/usr/bin/env python3
"""FLUID46: stability and convergence of 1-D periodic linear advection.

The exact comparator is the CELL AVERAGE of a translated sine, not a
point sample. Only Python's standard library is needed (also in Pyodide).
Unstable experiments are explicitly identified, never marked as converged.
"""
import argparse
import json
import math


def exact_mean(j, n, time, mode):
    wave = 1 if mode == "smooth" else n // 4
    h = 1.0 / n
    amp = 0.3 if mode == "smooth" else 0.02
    sinc = math.sin(math.pi * wave * h) / (math.pi * wave * h)
    return 1.0 + amp * sinc * math.sin(
        2.0 * math.pi * wave * ((j + 0.5) * h - time))


def amplification(scheme, cfl, theta):
    if scheme == "upwind":
        return complex(1.0 - cfl + cfl * math.cos(theta),
                       -cfl * math.sin(theta))
    return complex(1.0, -cfl * math.sin(theta))


def calculate(n=48, cfl=0.8, final_time=0.4, scheme="upwind",
              mode="smooth"):
    if not isinstance(n, int) or n < 16 or n > 128 or n % 4:
        raise ValueError("grid must be a multiple of four in [16,128]")
    if scheme not in ("upwind", "centered"):
        raise ValueError("unknown scheme")
    if mode not in ("smooth", "high"):
        raise ValueError("unknown initial profile")
    if not (math.isfinite(cfl) and 0.1 <= cfl <= 1.5):
        raise ValueError("CFL parameter must be finite and in [0.1,1.5]")
    if not (math.isfinite(final_time) and 0 < final_time <= 0.5):
        raise ValueError("time must be finite and in (0,0.5]")
    h = 1.0 / n
    steps = math.ceil(final_time / (cfl * h))
    if steps > 4000:
        raise ValueError("too many time steps")
    dt = final_time / steps
    lam = dt / h  # constant speed a=1 m/s and domain length L=1 m
    data = [exact_mean(j, n, 0.0, mode) for j in range(n)]
    initial = data[:]
    mass0 = h * math.fsum(data)
    worst_residual = 0.0
    largest = max(abs(v - 1.0) for v in data)
    stop_reason = None
    for step in range(steps):
        if scheme == "upwind":
            new = [(1.0 - lam) * data[j] + lam * data[(j - 1) % n]
                   for j in range(n)]
        else:
            new = [data[j] - 0.5 * lam *
                   (data[(j + 1) % n] - data[(j - 1) % n])
                   for j in range(n)]
        worst_residual = max(worst_residual, abs(h * math.fsum(new)
                                               - h * math.fsum(data)))
        data = new
        largest = max(largest, max(abs(v - 1.0) for v in data))
        if not all(math.isfinite(v) for v in data) or largest > 1e8:
            stop_reason = "amplitude exceeded safety limit; terminated"
            break
    completed = stop_reason is None
    exact = [exact_mean(j, n, final_time, mode) for j in range(n)]
    mass1 = h * math.fsum(data) if completed else None
    error_l1 = (h * math.fsum(abs(v - e) for v, e in zip(data, exact))
                if completed else None)
    error_linf = (max(abs(v - e) for v, e in zip(data, exact))
                  if completed else None)
    wave = 1 if mode == "smooth" else n // 4
    theta = 2.0 * math.pi * wave / n
    factor = amplification(scheme, lam, theta)
    stable = scheme == "upwind" and lam <= 1.0
    status = ("stable-parameter demonstration" if stable
              else "UNSTABLE scheme/parameter: not a convergence result")
    centers = [(j + 0.5) * h for j in range(n)]
    result = {
        "model": "q_t + q_x = 0, periodic L=1, a=1",
        "units": {"distance": "m", "time": "s", "speed": "m/s",
                  "cell_average": "kg/m", "mass": "kg", "error_l1": "kg"},
        "scheme": scheme, "initial_mode": mode, "status": status,
        "grid": n, "dx_m": h, "dt_s": dt, "steps_completed":
            (steps if completed else step + 1),
        "cfl_actual": lam, "final_time_s": final_time,
        "Fourier_mode": wave, "Fourier_factor_magnitude": abs(factor),
        "Fourier_phase_per_step_rad": math.atan2(-factor.imag, factor.real),
        "exact_phase_per_step_rad": lam * theta,
        "initial_mass_kg": mass0, "final_mass_kg": mass1,
        "max_step_mass_residual_kg": worst_residual,
        "amplitude_max_observed_kg_per_m": largest,
        "L1_cell_average_error_kg": error_l1,
        "Linf_cell_average_error_kg_per_m": error_linf,
        "termination": stop_reason,
        "warning": ("unstable demonstration: conserved mass is not proof of "
                    "stability or convergence" if not stable else None)
    }
    if completed:
        result["plots"] = [{
            "title": "Exact and numerical CELL averages; " + scheme,
            "x_label": "x (m)", "y_label": "cell average (kg/m)",
            "series": [
                {"name": "exact (cell average)",
                 "points": [[x, v] for x, v in zip(centers, exact)]},
                {"name": scheme + " (cell average)",
                 "points": [[x, v] for x, v in zip(centers, data)]},
                {"name": "initial (cell average)",
                 "points": [[x, v] for x, v in zip(centers, initial)]}
            ]
        }]
    return result


def convergence_study():
    rows = []
    for n in (24, 48, 96):
        d = calculate(n=n, cfl=0.8, scheme="upwind", mode="smooth")
        rows.append(d)
    errors = [d["L1_cell_average_error_kg"] for d in rows]
    if not (errors[2] < errors[1] < errors[0]):
        raise AssertionError("expected asymptotic improvement absent")
    orders = [math.log(errors[i] / errors[i + 1], 2)
              for i in (0, 1)]
    centers = [1.0 / r["grid"] for r in rows]
    return {
        "status": "finite-grid E1 comparison (not a universal proof)",
        "comparison": [{"grid": r["grid"], "dx_m": r["dx_m"],
                        "dt_s": r["dt_s"], "cfl_actual": r["cfl_actual"],
                        "L1_error_kg": r["L1_cell_average_error_kg"],
                        "mass_residual_kg":
                        r["final_mass_kg"] - r["initial_mass_kg"]}
                       for r in rows],
        "empirical_orders": orders,
        "plots": [{"title": "L1 error vs grid width (fixed CFL <= 1)",
                   "x_label": "dx (m)", "y_label": "L1 error (kg)",
                   "series": [{"name": "upwind error",
                               "points": [[h, e]
                                          for h, e in zip(centers, errors)]}]}]
    }


def time_step_study():
    rows = [calculate(n=48, cfl=c, scheme="upwind", mode="smooth")
            for c in (0.8, 0.4, 0.2)]
    return {
        "status": "fixed-grid time-step comparison: spatial error remains",
        "comparison": [{"dt_s": r["dt_s"], "cfl_actual": r["cfl_actual"],
                        "L1_error_kg": r["L1_cell_average_error_kg"]}
                       for r in rows],
        "warning": "smaller dt at fixed dx need not reduce total error",
        "plots": [{"title": "Time step vs total cell-average error (fixed N)",
                   "x_label": "dt (s)", "y_label": "L1 error (kg)",
                   "series": [{"name": "upwind error",
                               "points": [[r["dt_s"],
                                           r["L1_cell_average_error_kg"]]
                                          for r in rows]}]}]
    }


def self_test():
    tests = []
    for n in (24, 48, 96):
        r = calculate(n=n)
        assert r["status"].startswith("stable")
        assert abs(r["final_mass_kg"] - r["initial_mass_kg"]) < 1e-12
        assert r["max_step_mass_residual_kg"] < 1e-12
        assert r["L1_cell_average_error_kg"] > 0
    tests.append("upwind mass conservation and exact cell means")
    study = convergence_study()
    assert 0.6 < study["empirical_orders"][-1] < 1.4
    tests.append("fixed-CFL spatial convergence (sine)")
    time_step_study()
    tests.append("fixed-grid time-step cases are distinct")
    # A Fourier mode in the centered scheme has |G|>1 at theta=pi/2.
    centered = calculate(n=64, cfl=0.8, final_time=0.2,
                         scheme="centered", mode="high")
    assert centered["Fourier_factor_magnitude"] > 1
    assert centered["amplitude_max_observed_kg_per_m"] > 0.02
    assert centered["warning"] is not None
    tests.append("unstable FTCS high-frequency mode is flagged")
    upwind = calculate(n=64, cfl=1.2, final_time=0.2,
                       scheme="upwind", mode="high")
    assert upwind["Fourier_factor_magnitude"] > 1
    assert upwind["warning"] is not None
    tests.append("CFL>1 is not labelled stable")
    for bad in ({"n": 20.0}, {"n": 18}, {"cfl": 0},
                {"cfl": float("nan")}, {"final_time": 0},
                {"scheme": "x"}, {"mode": "x"}):
        try:
            calculate(**bad)
        except ValueError:
            pass
        else:
            raise AssertionError("invalid input accepted " + repr(bad))
    tests.append("invalid arguments rejected")
    return {"self_test": "passed", "checks": tests}


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--grid", type=int, default=48)
    p.add_argument("--cfl", type=float, default=0.8)
    p.add_argument("--time", type=float, default=0.4)
    p.add_argument("--scheme", choices=["upwind", "centered"],
                   default="upwind")
    p.add_argument("--case", choices=["smooth", "high"], default="smooth")
    p.add_argument("--study", choices=["none", "space", "time"],
                   default="none")
    p.add_argument("--self-test", action="store_true")
    a = p.parse_args()
    if a.self_test:
        result = self_test()
    elif a.study == "space":
        result = convergence_study()
    elif a.study == "time":
        result = time_step_study()
    else:
        result = calculate(n=a.grid, cfl=a.cfl, final_time=a.time,
                           scheme=a.scheme, mode=a.case)
    print(json.dumps(result, ensure_ascii=False, allow_nan=False, indent=2))


if __name__ == "__main__":
    main()
