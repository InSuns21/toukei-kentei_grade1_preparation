#!/usr/bin/env python3
"""FLUID48: first-order exact-Godunov Euler shock tube (standard library only).

All quantities are nondimensional. The exact Riemann solution, reference cell
averages, finite-volume update, diagnostics, and plot data share this source.
"""
import argparse
import json
import math

GAMMA = 1.4
LEFT = (1.0, 0.0, 1.0)      # (rho, u, p)
RIGHT = (0.125, 0.0, 0.1)
X0 = 0.5


def conserved(v):
    rho, u, p = v
    if not all(math.isfinite(z) for z in v) or rho <= 0 or p <= 0:
        raise ValueError("rho and p must be finite and strictly positive")
    return (rho, rho * u, p / (GAMMA - 1.0) + 0.5 * rho * u * u)


def primitive(q):
    rho, m, energy = q
    if not all(math.isfinite(z) for z in q) or rho <= 0:
        raise ValueError("nonpositive or nonfinite conserved density")
    u = m / rho
    p = (GAMMA - 1.0) * (energy - 0.5 * m * u)
    if not math.isfinite(p) or p <= 0:
        raise ValueError("nonpositive or nonfinite pressure: abort, do not clip")
    return (rho, u, p)


def physical_flux(v):
    rho, u, p = v
    energy = p / (GAMMA - 1.0) + 0.5 * rho * u * u
    return (rho * u, rho * u * u + p, (energy + p) * u)


def sound(v):
    return math.sqrt(GAMMA * v[2] / v[0])


def wave_function(p, v):
    rho, u, pk = v
    ak = sound(v)
    if p <= pk:
        return (2 * ak / (GAMMA - 1.0)) * (
            (p / pk) ** ((GAMMA - 1.0) / (2 * GAMMA)) - 1)
    aa = 2.0 / ((GAMMA + 1.0) * rho)
    bb = ((GAMMA - 1.0) / (GAMMA + 1.0)) * pk
    return (p - pk) * math.sqrt(aa / (p + bb))


def star_state(left, right):
    """Solve the strictly increasing pressure equation by bracketed bisection."""
    al, ar = sound(left), sound(right)
    if right[1] - left[1] >= 2 * (al + ar) / (GAMMA - 1.0):
        raise ValueError("vacuum Riemann problem is not supported")
    def residual(p):
        return wave_function(p, left) + wave_function(p, right) + right[1] - left[1]
    lo, hi = 0.0, max(left[2], right[2])
    for _ in range(80):
        if residual(hi) >= 0:
            break
        hi *= 2
    else:
        raise ValueError("cannot bracket Riemann pressure")
    for _ in range(64):
        mid = 0.5 * (lo + hi)
        if residual(mid) > 0:
            hi = mid
        else:
            lo = mid
    pstar = (lo + hi) * 0.5
    ustar = 0.5 * (left[1] + right[1] +
                   wave_function(pstar, right) - wave_function(pstar, left))
    if pstar <= 0 or not math.isfinite(ustar):
        raise ValueError("invalid Riemann star state")
    return pstar, ustar


def star_density(v, pstar):
    rho, _, p = v
    if pstar <= p:
        return rho * (pstar / p) ** (1.0 / GAMMA)
    b = (GAMMA - 1.0) / (GAMMA + 1.0)
    r = pstar / p
    return rho * (r + b) / (b * r + 1.0)


def sample(left, right, xi, star=None):
    """Exact self-similar state at xi=(x-x0)/t for ideal-gas Euler."""
    ps, us = star if star is not None else star_state(left, right)
    if xi <= us:
        rho, u, p = left
        a = sound(left)
        if ps > p:  # left shock
            speed = u - a * math.sqrt(
                (GAMMA + 1) / (2 * GAMMA) * (ps / p) +
                (GAMMA - 1) / (2 * GAMMA))
            return left if xi < speed else (star_density(left, ps), us, ps)
        head, tail = u - a, us - a * (ps / p) ** ((GAMMA - 1) / (2 * GAMMA))
        if xi < head:
            return left
        if xi > tail:
            return (star_density(left, ps), us, ps)
        uf = 2 / (GAMMA + 1) * (a + (GAMMA - 1) * u / 2 + xi)
        af = 2 / (GAMMA + 1) * (a + (GAMMA - 1) * (u - xi) / 2)
        return (rho * (af / a) ** (2 / (GAMMA - 1)), uf,
                p * (af / a) ** (2 * GAMMA / (GAMMA - 1)))
    rho, u, p = right
    a = sound(right)
    if ps > p:  # right shock
        speed = u + a * math.sqrt(
            (GAMMA + 1) / (2 * GAMMA) * (ps / p) +
            (GAMMA - 1) / (2 * GAMMA))
        return right if xi > speed else (star_density(right, ps), us, ps)
    head, tail = u + a, us + a * (ps / p) ** ((GAMMA - 1) / (2 * GAMMA))
    if xi > head:
        return right
    if xi < tail:
        return (star_density(right, ps), us, ps)
    uf = 2 / (GAMMA + 1) * (-a + (GAMMA - 1) * u / 2 + xi)
    af = 2 / (GAMMA + 1) * (a - (GAMMA - 1) * (u - xi) / 2)
    return (rho * (af / a) ** (2 / (GAMMA - 1)), uf,
            p * (af / a) ** (2 * GAMMA / (GAMMA - 1)))


def godunov_flux(qleft, qright):
    left, right = primitive(qleft), primitive(qright)
    return physical_flux(sample(left, right, 0.0))


def wave_positions(left, right, t, star):
    ps, us = star
    positions = [X0 + us * t]
    for v, sign in ((left, -1), (right, +1)):
        rho, u, p = v
        a = sound(v)
        if ps > p:
            speed = u + sign * a * math.sqrt(
                (GAMMA + 1) / (2 * GAMMA) * (ps / p) +
                (GAMMA - 1) / (2 * GAMMA))
            positions.append(X0 + speed * t)
        else:
            positions.extend((X0 + (u + sign * a) * t,
                              X0 + (us + sign * a *
                                    (ps / p) ** ((GAMMA - 1) / (2 * GAMMA))) * t))
    return sorted(positions)


def exact_cell_mean(j, n, t, left=LEFT, right=RIGHT, star=None):
    """Gauss quadrature split at each analytically known wave boundary."""
    h = 1.0 / n
    a, b = j * h, (j + 1) * h
    if t == 0:
        return conserved(left if b <= X0 else right)
    star = star if star is not None else star_state(left, right)
    cuts = [a] + [x for x in wave_positions(left, right, t, star)
                  if a < x < b] + [b]
    nodes = (-0.8611363115940526, -0.3399810435848563,
             0.3399810435848563, 0.8611363115940526)
    weights = (0.3478548451374538, 0.6521451548625461,
               0.6521451548625461, 0.3478548451374538)
    total = [0.0, 0.0, 0.0]
    for start, end in zip(cuts, cuts[1:]):
        if end - start < 1e-15:
            continue
        center, half = 0.5 * (start + end), 0.5 * (end - start)
        for z, w in zip(nodes, weights):
            q = conserved(sample(left, right, (center + half * z - X0) / t,
                                 star))
            for k in range(3):
                total[k] += half * w * q[k] / h
    return tuple(total)


def calculate(n=80, cfl=0.45, final_time=0.15, plot=False):
    if type(n) is not int or n < 20 or n > 320 or n % 2:
        raise ValueError("grid must be even, 20..320")
    if not math.isfinite(cfl) or not 0 < cfl <= 0.45:
        raise ValueError("0 < cfl <= 0.45 required")
    if not math.isfinite(final_time) or not 0 < final_time <= 0.18:
        raise ValueError("0 < time <= 0.18 required (waves inside domain)")
    h = 1.0 / n
    q = [conserved(LEFT if j < n // 2 else RIGHT) for j in range(n)]
    budget = [0.0, 0.0, 0.0]
    initial = [h * sum(item[k] for item in q) for k in range(3)]
    t, steps, dtmin, dtmax = 0.0, 0, float("inf"), 0.0
    max_step_balance = 0.0
    while t < final_time - 1e-14:
        amax = max(abs(v[1]) + sound(v) for v in map(primitive, q))
        dt = min(cfl * h / amax, final_time - t)
        fluxes = [godunov_flux(q[0], q[0])]
        fluxes += [godunov_flux(q[j - 1], q[j]) for j in range(1, n)]
        fluxes += [godunov_flux(q[-1], q[-1])]
        newer = []
        for j, old in enumerate(q):
            newer.append(tuple(old[k] - dt / h *
                               (fluxes[j + 1][k] - fluxes[j][k])
                               for k in range(3)))
        # Never turn an unphysical state into an apparently successful plot.
        for cell in newer:
            primitive(cell)
        for k in range(3):
            budget[k] += dt * (fluxes[0][k] - fluxes[-1][k])
        before = [h * sum(item[k] for item in q) for k in range(3)]
        after = [h * sum(item[k] for item in newer) for k in range(3)]
        max_step_balance = max(
            max_step_balance, *(abs(after[k] - before[k] -
                                    dt * (fluxes[0][k] - fluxes[-1][k]))
                                for k in range(3)))
        q = newer
        steps += 1
        dtmin, dtmax = min(dtmin, dt), max(dtmax, dt)
        t += dt
    final = [h * sum(item[k] for item in q) for k in range(3)]
    residual = [final[k] - initial[k] - budget[k] for k in range(3)]
    star = star_state(LEFT, RIGHT)
    reference = [exact_cell_mean(j, n, final_time, star=star)
                 for j in range(n)]
    density_e1 = h * sum(abs(q[j][0] - reference[j][0]) for j in range(n))
    prim = [primitive(item) for item in q]
    pressure_jumps = [abs(prim[j + 1][2] - prim[j][2])
                      for j in range(n - 1)]
    shock_j = max((j for j in range(n - 1) if (j + 1) * h > 0.62),
                  key=lambda j: pressure_jumps[j])
    shock_position = (shock_j + 1) * h
    shock_speed = (wave_positions(LEFT, RIGHT, 1.0, star)[-1] - X0)
    exact_shock = X0 + shock_speed * final_time
    result = {
        "status": "completed without clipping",
        "model": "1D ideal-gas Euler / Sod / first-order exact Godunov",
        "gamma": GAMMA, "grid": n, "dx": h, "final_time": t,
        "cfl_limit": cfl, "dt_min": dtmin, "dt_max": dtmax, "steps": steps,
        "p_star": star[0], "u_star": star[1],
        "initial_integrals_rho_m_E": initial,
        "final_integrals_rho_m_E": final,
        "integrated_boundary_inflow_rho_m_E": budget,
        "global_balance_residual_rho_m_E": residual,
        "max_step_balance_residual": max_step_balance,
        "min_density": min(v[0] for v in prim),
        "min_pressure": min(v[2] for v in prim),
        "density_exact_cell_mean_L1": density_e1,
        "right_shock_position_numeric": shock_position,
        "right_shock_position_exact": exact_shock,
        "shock_position_error": abs(shock_position - exact_shock),
        "warning": "first-order shock smearing; finite-N convergence is empirical",
    }
    if plot:
        x = [(j + 0.5) * h for j in range(n)]
        exact_point = [sample(LEFT, RIGHT, (xx - X0) / final_time, star)
                       for xx in x]
        labels = (("density", 0), ("velocity", 1), ("pressure", 2))
        result["plots"] = [
            {"title": name + " (Sod; Godunov vs exact point samples)",
             "x_label": "x (dimensionless)",
             "y_label": name + " (dimensionless)",
             "series": [
                 {"name": "Godunov cell state",
                  "points": [[x[j], prim[j][k]] for j in range(n)]},
                 {"name": "exact Riemann point state",
                  "points": [[x[j], exact_point[j][k]] for j in range(n)]},
             ]}
            for name, k in labels]
    return result


def convergence():
    rows = [calculate(n=n) for n in (40, 80, 160)]
    errors = [r["density_exact_cell_mean_L1"] for r in rows]
    if not errors[2] < errors[1] < errors[0]:
        raise AssertionError("grid convergence failed on Sod benchmark")
    return {
        "comparison": [{key: r[key] for key in
                        ("grid", "dx", "steps", "density_exact_cell_mean_L1",
                         "shock_position_error", "max_step_balance_residual")}
                       for r in rows],
        "observed_orders": [math.log(errors[k] / errors[k + 1], 2)
                            for k in (0, 1)],
        "note": "exact density CELL means; finite-grid empirical rates, no smooth-solution theorem",
        "plots": [{"title": "Exact cell-mean density L1 error",
                   "x_label": "dx", "y_label": "E1",
                   "series": [{"name": "Godunov Sod",
                               "points": [[r["dx"], errors[j]]
                                          for j, r in enumerate(rows)]}]}],
    }


def self_test():
    checks = []
    pstar, ustar = star_state(LEFT, RIGHT)
    assert abs(pstar - 0.303130178050647) < 1e-9
    assert abs(ustar - 0.92745262004895) < 1e-9
    checks.append("Sod exact pressure and contact speed")
    for v in (LEFT, RIGHT, (0.8, -0.2, 0.7)):
        assert all(abs(a - b) < 1e-13 for a, b in
                   zip(primitive(conserved(v)), v))
        assert all(abs(a - b) < 1e-12 for a, b in
                   zip(godunov_flux(conserved(v), conserved(v)),
                       physical_flux(v)))
    checks.append("equilibrium consistency and primitive inversion")
    for n in (40, 80):
        r = calculate(n=n)
        assert max(abs(v) for v in r["global_balance_residual_rho_m_E"]) < 2e-12
        assert r["max_step_balance_residual"] < 2e-12
        assert r["min_density"] > 0 and r["min_pressure"] > 0
        assert r["shock_position_error"] < 3 / n
    checks.append("all three open-boundary budgets, positivity and right shock")
    study = convergence()
    assert all(0 < k < 2 for k in study["observed_orders"])
    checks.append("reference CELL mean convergence (40/80/160)")
    for invalid in ((0, 1, 1), (1, 0, 1), (1, 1, -1)):
        try:
            primitive(invalid)
        except ValueError:
            pass
        else:
            raise AssertionError("nonphysical primitive accepted")
    for bad in ({"n": 21}, {"n": 10}, {"cfl": 0.9},
                {"final_time": 0.4}):
        try:
            calculate(**bad)
        except ValueError:
            pass
        else:
            raise AssertionError("invalid config accepted")
    try:
        star_state((1, -10, 1), (1, 10, 1))
    except ValueError:
        pass
    else:
        raise AssertionError("vacuum data accepted")
    checks.append("reject nonphysical states, unsafe CFL and vacuum")
    return {"self_test": "passed", "checks": checks}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--grid", type=int, default=80)
    parser.add_argument("--time", type=float, default=0.15)
    parser.add_argument("--cfl", type=float, default=0.45)
    parser.add_argument("--plot", action="store_true")
    parser.add_argument("--study", action="store_true")
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        data = self_test()
    elif args.study:
        data = convergence()
    else:
        data = calculate(n=args.grid, cfl=args.cfl,
                         final_time=args.time, plot=args.plot)
    print(json.dumps(data, ensure_ascii=False, allow_nan=False, indent=2))


if __name__ == "__main__":
    main()
