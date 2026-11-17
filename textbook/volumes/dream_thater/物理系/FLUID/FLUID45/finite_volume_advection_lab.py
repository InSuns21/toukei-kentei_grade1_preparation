#!/usr/bin/env python3
"""FLUID45: first-order finite-volume transport (SI units, length L=1 m).

One array of face fluxes is shared by neighbouring cells. The resulting
balance is algebraic; closeness to the exact cell averages is tested separately.
Requires only Python 3 standard library (including in Pyodide).
"""
import argparse
import json
import math


def _validate(grid, speed, cfl, final_time, boundary, case, base, amplitude):
    if not isinstance(grid, int) or not 16 <= grid <= 160:
        raise ValueError("grid must be an integer between 16 and 160")
    for name, value in (("speed", speed), ("cfl", cfl),
                        ("time", final_time), ("base", base),
                        ("amplitude", amplitude)):
        if not math.isfinite(value):
            raise ValueError(name + " must be finite")
    if not (0 < speed <= 2):
        raise ValueError("speed must be in (0, 2] m/s")
    if not (0 < cfl <= 1):
        raise ValueError("cfl must be in (0, 1]")
    if not (0 < final_time <= 1):
        raise ValueError("time must be in (0, 1] s")
    if not (base > amplitude > 0):
        raise ValueError("require base > amplitude > 0 for positive density")
    if boundary not in ("periodic", "open"):
        raise ValueError("unsupported boundary")
    if case not in ("sine", "pulse"):
        raise ValueError("unsupported case")
    if boundary == "open" and case != "sine":
        raise ValueError("open boundary uses the smooth sine inflow only")


def _exact_cell_average(j, t, dx, speed, case, base, amplitude):
    """Integrate exact translated initial data over [j*dx,(j+1)*dx]."""
    left = j * dx
    right = (j + 1) * dx
    if case == "sine":
        center = (j + 0.5) * dx
        factor = math.sin(math.pi * dx) / (math.pi * dx)
        return base + amplitude * factor * math.sin(
            2 * math.pi * (center - speed * t))
    # Periodic pulse: base+amplitude on [1/4, 1/2) modulo domain length.
    shifted = speed * t
    kcenter = int(math.floor(shifted))
    covered = 0.0
    for k in range(kcenter - 2, kcenter + 3):
        lo = 0.25 + shifted + k
        hi = 0.50 + shifted + k
        covered += max(0.0, min(right, hi) - max(left, lo))
    return base + amplitude * covered / dx


def _initial_values(grid, case, base, amplitude):
    dx = 1.0 / grid
    return [_exact_cell_average(j, 0.0, dx, 1.0, case, base, amplitude)
            for j in range(grid)]


def _fluxes(values, t, speed, dx, boundary, base, amplitude):
    """N+1 faces. Interior face k sees upstream cell k-1 (a>0)."""
    n = len(values)
    faces = [0.0] * (n + 1)
    if boundary == "periodic":
        faces[0] = speed * values[-1]
    else:
        faces[0] = speed * (base + amplitude *
                            math.sin(-2.0 * math.pi * speed * t))
    for k in range(1, n + 1):
        faces[k] = speed * values[k - 1]
    return faces


def compute(grid=40, speed=1.0, cfl=0.8, final_time=0.4,
            boundary="periodic", case="sine", base=1.0, amplitude=0.3):
    _validate(grid, speed, cfl, final_time, boundary, case, base, amplitude)
    dx = 1.0 / grid
    # All steps, including the last one, use the same dt and never exceed CFL.
    steps = math.ceil(final_time / (cfl * dx / speed))
    if steps > 480:
        raise ValueError("too many time steps; choose a shorter time or larger cfl")
    dt = final_time / steps
    lam = speed * dt / dx
    values = _initial_values(grid, case, base, amplitude)
    initial = list(values)
    initial_mass = dx * math.fsum(values)
    time = 0.0
    influx, outflux = 0.0, 0.0
    max_step_balance_residual = 0.0
    masses = [[0.0, initial_mass]]
    min_state = min(values)
    max_state = max(values)

    for step in range(steps):
        # Assemble face fluxes *once*, then reuse same face on both sides.
        faces = _fluxes(values, time, speed, dx, boundary, base, amplitude)
        before_mass = dx * math.fsum(values)
        updated = [values[j] - (dt / dx) * (faces[j + 1] - faces[j])
                   for j in range(grid)]
        after_mass = dx * math.fsum(updated)
        face_balance = dt * (faces[0] - faces[-1])
        max_step_balance_residual = max(
            max_step_balance_residual,
            abs((after_mass - before_mass) - face_balance))
        influx += dt * faces[0]
        outflux += dt * faces[-1]
        time = (step + 1) * dt
        values = updated
        min_state = min(min_state, min(values))
        max_state = max(max_state, max(values))
        masses.append([time, after_mass])

    exact = [_exact_cell_average(j, final_time, dx, speed, case,
                                 base, amplitude) for j in range(grid)]
    error_l1 = dx * math.fsum(abs(x - y) for x, y in zip(values, exact))
    final_mass = dx * math.fsum(values)
    expected_mass = initial_mass + influx - outflux
    balance_residual = final_mass - expected_mass

    if min_state < -1e-11:
        raise ArithmeticError("negative finite-volume density")
    if abs(balance_residual) > 2e-11 * max(1, abs(initial_mass)):
        raise ArithmeticError("global balance residual exceeds tolerance")

    centers = [(j + 0.5) * dx for j in range(grid)]
    return {
        "model": "dq/dt + a dq/dx = 0, upwind finite volume",
        "case": case, "boundary": boundary,
        "units": {"length": "m", "time": "s", "speed": "m/s",
                  "cell_average": "kg/m", "mass": "kg", "flux": "kg/s",
                  "error_l1": "kg"},
        "grid_cells": grid, "dx_m": dx, "speed_m_per_s": speed,
        "time_s": final_time, "time_step_s": dt, "steps": steps,
        "cfl": lam, "initial_mass_kg": initial_mass,
        "final_mass_kg": final_mass,
        "boundary_inflow_kg": influx,
        "boundary_outflow_kg": outflux,
        "mass_predicted_from_faces_kg": expected_mass,
        "global_mass_balance_residual_kg": balance_residual,
        "maximum_one_step_balance_residual_kg": max_step_balance_residual,
        "minimum_cell_value_kg_per_m": min_state,
        "maximum_cell_value_kg_per_m": max_state,
        "cell_average_l1_error_kg": error_l1,
        "plots": [
            {"title": "セル平均：初期・数値・移流の厳密解",
             "x_label": "x (m)", "y_label": "q cell average (kg/m)",
             "series": [
                 {"name": "initial (cell mean)",
                  "points": [[x, y] for x, y in zip(centers, initial)]},
                 {"name": "upwind (cell mean)",
                  "points": [[x, y] for x, y in zip(centers, values)]},
                 {"name": "exact (cell mean)",
                  "points": [[x, y] for x, y in zip(centers, exact)]}]},
            {"title": "領域内質量の時間変化（境界流入出を含む）",
             "x_label": "time (s)", "y_label": "total mass (kg)",
             "series": [{"name": "numerical mass", "points": masses}]}
        ]
    }


def self_test():
    tests = []
    for case in ("sine", "pulse"):
        data = compute(grid=64, final_time=0.4, case=case)
        assert abs(data["final_mass_kg"] - data["initial_mass_kg"]) < 1e-12
        assert abs(data["global_mass_balance_residual_kg"]) < 1e-12
        assert data["minimum_cell_value_kg_per_m"] > 0
        assert len(data["plots"][0]["series"][1]["points"]) == 64
        tests.append("periodic " + case + ": mass and positivity")
    open_case = compute(grid=60, boundary="open", final_time=0.4)
    assert abs(open_case["global_mass_balance_residual_kg"]) < 1e-12
    assert abs(open_case["maximum_one_step_balance_residual_kg"]) < 1e-12
    tests.append("open boundaries: integrated inflow/outflow")
    same = compute(grid=32, amplitude=0.001, base=1.0)
    assert same["minimum_cell_value_kg_per_m"] > 0.0
    # The independent integral formula yields base when a complete sine
    # period is summed over all cells.
    assert abs(same["initial_mass_kg"] - 1.0) < 1e-13
    tests.append("exact cell integral: sine mean equals base")
    # Smooth, positive profile and dt proportional to dx: first-order
    # upwind should improve under refinement. No general convergence
    # claim is inferred from these finite tests.
    coarse = compute(grid=32, final_time=0.35)
    fine = compute(grid=64, final_time=0.35)
    assert fine["cell_average_l1_error_kg"] < (
        0.75 * coarse["cell_average_l1_error_kg"])
    tests.append("smooth sine L1 decreases on grid refinement")
    for kwargs in ({"grid": 10}, {"grid": 200}, {"speed": 0},
                   {"cfl": 1.1}, {"final_time": 0},
                   {"case": "pulse", "boundary": "open"},
                   {"base": 0.1, "amplitude": 0.3},
                   {"speed": float("nan")}):
        try:
            compute(**kwargs)
        except ValueError:
            pass
        else:
            raise AssertionError("invalid input accepted: " + str(kwargs))
    tests.append("invalid inputs rejected")
    return {"self_test": "passed", "checks": tests}


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--grid", type=int, default=40)
    parser.add_argument("--speed", type=float, default=1.0)
    parser.add_argument("--cfl", type=float, default=0.8)
    parser.add_argument("--time", type=float, default=0.4)
    parser.add_argument("--case", choices=["sine", "pulse"], default="sine")
    parser.add_argument("--boundary", choices=["periodic", "open"],
                        default="periodic")
    parser.add_argument("--base", type=float, default=1.0)
    parser.add_argument("--amplitude", type=float, default=0.3)
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args(argv)
    result = (self_test() if args.self_test else compute(
        grid=args.grid, speed=args.speed, cfl=args.cfl,
        final_time=args.time, case=args.case, boundary=args.boundary,
        base=args.base, amplitude=args.amplitude))
    print(json.dumps(result, ensure_ascii=False, allow_nan=False, indent=2))


if __name__ == "__main__":
    main()
