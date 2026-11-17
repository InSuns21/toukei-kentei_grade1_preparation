#!/usr/bin/env python3
"""FLUID47: 2-D MAC projection on a square lid-driven cavity.

Standard-library solver; optional matplotlib plot. Teaching-grid transient
only, not a grid-independent or high-Reynolds-number CFD result.
"""
import argparse
import json
import math


def divergence(u, v, n, h):
    return [[(u[i + 1][j] - u[i][j] + v[i][j + 1] - v[i][j]) / h
             for j in range(n)] for i in range(n)]


def laplace_neumann(p, i, j, n, h):
    ans = 0.0
    for di, dj in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        a, b = i + di, j + dj
        if 0 <= a < n and 0 <= b < n:
            ans += p[a][b] - p[i][j]
    return ans / (h * h)


def solve_pressure(rhs, n, h, tol=1e-8, max_sweeps=1800):
    """Solve L phi = rhs, zero wall-normal differences, mean(phi)=0."""
    compatibility = h * h * math.fsum(x for row in rhs for x in row)
    if abs(compatibility) > 1e-10:
        raise ArithmeticError("Poisson incompatibility: nonzero wall flux")
    p = [[0.0 for _ in range(n)] for _ in range(n)]
    scale = max(1.0, max(abs(z) for row in rhs for z in row))
    omega = 1.5 if n <= 16 else 1.65
    residual = float("inf")
    for sweep in range(1, max_sweeps + 1):
        for i in range(n):
            for j in range(n):
                neighbors = []
                if i: neighbors.append(p[i - 1][j])
                if i < n - 1: neighbors.append(p[i + 1][j])
                if j: neighbors.append(p[i][j - 1])
                if j < n - 1: neighbors.append(p[i][j + 1])
                target = (math.fsum(neighbors) - h * h * rhs[i][j]) / len(neighbors)
                p[i][j] += omega * (target - p[i][j])
        if sweep % 5 == 0 or sweep == max_sweeps:
            residual = max(abs(laplace_neumann(p, i, j, n, h) - rhs[i][j])
                           for i in range(n) for j in range(n))
            if residual <= tol * scale:
                mean = math.fsum(x for row in p for x in row) / (n * n)
                for i in range(n):
                    for j in range(n):
                        p[i][j] -= mean
                return p, residual, sweep, compatibility
    raise ArithmeticError("pressure Poisson did not converge (residual %.3g)" % residual)


def calculate(n=12, dt=0.01, final_time=1.0, re=20.0, plot=False):
    if not isinstance(n, int) or not (8 <= n <= 24):
        raise ValueError("grid must be integer in [8,24]")
    if not all(math.isfinite(x) for x in (dt, final_time, re)):
        raise ValueError("parameters must be finite")
    if not (0 < dt <= 0.02 and 0 < final_time <= 2.0 and 5 <= re <= 50):
        raise ValueError("dt/time/Re outside safe teaching range")
    steps = math.ceil(final_time / dt)
    if steps > 800:
        raise ValueError("too many time steps")
    dt = final_time / steps
    h = 1.0 / n
    nu = 1.0 / re  # rho=1 kg/m^3; U=1 m/s; L=1 m
    diffusion_number = 4.0 * nu * dt / (h * h)
    lid_courant = dt / h
    if diffusion_number > 0.9 or lid_courant > 0.35:
        raise ValueError("explicit predictor unsafe: decrease dt")
    # u: vertical faces (n+1,n); v: horizontal faces (n,n+1).
    u = [[0.0] * n for _ in range(n + 1)]
    v = [[0.0] * (n + 1) for _ in range(n)]
    pressure = [[0.0] * n for _ in range(n)]
    max_div = max_poisson = max_compat = 0.0
    max_sweeps_used = 0
    for step in range(steps):
        us = [[0.0] * n for _ in range(n + 1)]
        vs = [[0.0] * (n + 1) for _ in range(n)]
        for i in range(1, n):
            for j in range(n):
                z = u[i][j]
                left, right = u[i - 1][j], u[i + 1][j]
                down = u[i][j - 1] if j else -z
                up = u[i][j + 1] if j < n - 1 else 2.0 - z
                du_dx = (right - left) / (2 * h)
                du_dy = (up - down) / (2 * h)
                v_at_u = (v[i - 1][j] + v[i][j] +
                          v[i - 1][j + 1] + v[i][j + 1]) / 4.0
                adv = z * du_dx + v_at_u * du_dy
                lap = (left + right + up + down - 4.0 * z) / (h * h)
                us[i][j] = z + dt * (nu * lap - adv)
        for i in range(n):
            for j in range(1, n):
                z = v[i][j]
                left = v[i - 1][j] if i else -z
                right = v[i + 1][j] if i < n - 1 else -z
                down, up = v[i][j - 1], v[i][j + 1]
                dv_dx = (right - left) / (2 * h)
                dv_dy = (up - down) / (2 * h)
                u_at_v = (u[i][j - 1] + u[i + 1][j - 1] +
                          u[i][j] + u[i + 1][j]) / 4.0
                adv = u_at_v * dv_dx + z * dv_dy
                lap = (left + right + up + down - 4.0 * z) / (h * h)
                vs[i][j] = z + dt * (nu * lap - adv)
        rhs = [[z / dt for z in row] for row in divergence(us, vs, n, h)]
        pressure, residual, sweeps, compat = solve_pressure(rhs, n, h)
        max_poisson = max(max_poisson, residual)
        max_sweeps_used = max(max_sweeps_used, sweeps)
        max_compat = max(max_compat, abs(compat))
        for i in range(1, n):
            for j in range(n):
                u[i][j] = us[i][j] - dt * (pressure[i][j] - pressure[i - 1][j]) / h
        for i in range(n):
            for j in range(1, n):
                v[i][j] = vs[i][j] - dt * (pressure[i][j] - pressure[i][j - 1]) / h
        div = divergence(u, v, n, h)
        max_div = max(abs(z) for row in div for z in row)
        if not math.isfinite(max_div) or max_div > 1e-5:
            raise ArithmeticError("projection divergence exceeds tolerance")
    uc = [[(u[i][j] + u[i + 1][j]) / 2.0 for j in range(n)] for i in range(n)]
    vc = [[(v[i][j] + v[i][j + 1]) / 2.0 for j in range(n)] for i in range(n)]
    flux = h * (math.fsum(u[n]) - math.fsum(u[0]) +
                math.fsum(v[i][n] - v[i][0] for i in range(n)))
    vmax = max(math.hypot(uc[i][j], vc[i][j]) for i in range(n) for j in range(n))
    mid = n // 2
    result = {
        "model": "2-D square cavity, MAC projection, rho=U=L=1, no penetration",
        "boundary": "lid y=1: u_wall=1; other tangential walls=0 via ghost reflection",
        "status": "projection solved; finite-grid transient, NOT exact/steady CFD",
        "grid": n, "h_m": h, "time_s": final_time, "dt_s": dt,
        "steps": steps, "Re": re, "nu_m2_s": nu,
        "lid_Courant": lid_courant, "explicit_diffusion_number": diffusion_number,
        "pressure_gauge": "mean pressure = 0 Pa",
        "pressure_max_sweeps": max_sweeps_used,
        "max_pressure_poisson_residual_kg_m3_s2": max_poisson,
        "final_discrete_divergence_max_s_inv": max_div,
        "max_poisson_compatibility_flux_m2_s": max_compat,
        "net_boundary_flux_m2_s": flux,
        "normal_wall_velocity_max_m_s": max(
            [abs(u[0][j]) for j in range(n)] +
            [abs(u[n][j]) for j in range(n)] +
            [abs(v[i][0]) for i in range(n)] +
            [abs(v[i][n]) for i in range(n)]),
        "wall_tangential_reconstruction": "bottom 0, top 1, left/right 0 (ghost-cell midpoint)",
        "center_velocity_m_s": [uc[mid][mid], vc[mid][mid]],
        "max_cell_center_speed_m_s": vmax,
        "plots": [
            {"title": "Vertical centerline: u(x=0.5,y)", "x_label": "y (m)",
             "y_label": "u (m/s)", "series": [
                 {"name": "MAC u (centerline)", "points":
                  [[(j + 0.5) * h, u[mid][j]] for j in range(n)]}]},
            {"title": "Horizontal centerline: v(x,y=0.5)", "x_label": "x (m)",
             "y_label": "v (m/s)", "series": [
                 {"name": "MAC v (centerline)", "points":
                  [[(i + 0.5) * h, v[i][mid]] for i in range(n)]}]}]
    }
    if plot:
        import matplotlib.pyplot as plt
        from matplotlib import colors
        import numpy as np
        xx = [(i + 0.5) * h for i in range(n)]
        yy = [(j + 0.5) * h for j in range(n)]
        ux = np.asarray(uc).T
        vy = np.asarray(vc).T
        pp = np.asarray(pressure).T
        fig, ax = plt.subplots(figsize=(5, 4.5))
        ax.contourf(xx, yy, pp, 12, cmap="Greys", norm=colors.Normalize())
        ax.streamplot(xx, yy, ux, vy, color="black", linewidth=0.8, density=0.9)
        ax.set(xlabel="x (m)", ylabel="y (m)",
               title="Pressure (gray) and streamlines (black)")
        ax.set_aspect("equal")
        fig.tight_layout()
        plt.show()
    return result


def self_test():
    checks = []
    n, h = 8, 1.0 / 8
    p = [[math.cos(math.pi * (i + 0.5) * h) *
          math.cos(math.pi * (j + 0.5) * h) for j in range(n)] for i in range(n)]
    uu = [[0.0] * n for _ in range(n + 1)]
    vv = [[0.0] * (n + 1) for _ in range(n)]
    for i in range(1, n):
        for j in range(n): uu[i][j] = (p[i][j] - p[i - 1][j]) / h
    for i in range(n):
        for j in range(1, n): vv[i][j] = (p[i][j] - p[i][j - 1]) / h
    dg = divergence(uu, vv, n, h)
    assert max(abs(dg[i][j] - laplace_neumann(p, i, j, n, h))
               for i in range(n) for j in range(n)) < 1e-11
    checks.append("MAC div(grad) = Neumann Laplacian on all cells")
    a = calculate(n=8, dt=0.01, final_time=0.2)
    b = calculate(n=12, dt=0.01, final_time=0.2)
    c = calculate(n=8, dt=0.005, final_time=0.2)
    for row in (a, b, c):
        assert row["final_discrete_divergence_max_s_inv"] < 1e-6
        assert row["normal_wall_velocity_max_m_s"] == 0
        assert abs(row["net_boundary_flux_m2_s"]) < 1e-12
        assert row["max_pressure_poisson_residual_kg_m3_s2"] < 1e-4
    checks.append("divergence, wall normals, flux and Poisson residual")
    assert b["h_m"] < a["h_m"] and c["dt_s"] < a["dt_s"]
    assert a["center_velocity_m_s"] != b["center_velocity_m_s"]
    assert a["center_velocity_m_s"] != c["center_velocity_m_s"]
    checks.append("grid/time changes produce distinct finite-grid values")
    for bad in (dict(n=7), dict(dt=0), dict(re=-1),
                dict(final_time=float("nan")), dict(n=24, dt=0.02)):
        try: calculate(**bad)
        except ValueError: pass
        else: raise AssertionError("accepted unsafe input " + repr(bad))
    checks.append("invalid and unsafe inputs rejected")
    return {"self_test": "passed", "checks": checks}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--grid", type=int, default=12)
    parser.add_argument("--dt", type=float, default=0.01)
    parser.add_argument("--time", type=float, default=1.0)
    parser.add_argument("--re", type=float, default=20.0)
    parser.add_argument("--plot", action="store_true")
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    result = (self_test() if args.self_test else
              calculate(n=args.grid, dt=args.dt, final_time=args.time,
                        re=args.re, plot=args.plot))
    print(json.dumps(result, ensure_ascii=False, indent=2, allow_nan=False))


if __name__ == "__main__":
    main()
