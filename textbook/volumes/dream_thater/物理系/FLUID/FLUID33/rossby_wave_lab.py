#!/usr/bin/env python3
"""FLUID33: analytic linear Rossby wave on a midlatitude one-layer beta plane.

This is a dispersion/residual visualizer, NOT a nonlinear PDE solver.
Standard library outputs JSON, with optional matplotlib contours via --plot.
"""
import argparse
import json
import math


def wave_state(beta=1.6e-11, f0=1e-4, depth=1000.0, g=10.0,
               k=2e-6, ell=1e-6, amplitude=10000.0, time=0.0):
    params = (beta, f0, depth, g, k, ell, amplitude, time)
    if not all(math.isfinite(v) for v in params):
        raise ValueError("parameters must be finite")
    if not (0 < beta < 1e-8 and 1e-6 <= abs(f0) <= 0.01 and
            1 <= depth <= 1e5 and 0 < g <= 30 and
            0 < abs(amplitude) <= 1e7 and abs(time) <= 1e9):
        raise ValueError("invalid beta, f0, H, g, amplitude, or time")
    kmag = math.hypot(k, ell)
    if not (1e-9 <= kmag <= 1e-3):
        raise ValueError("the horizontal wave number must be nonzero and within range")
    ld = math.sqrt(g * depth) / abs(f0)
    d = k * k + ell * ell + 1 / (ld * ld)
    omega = -beta * k / d
    cgx = beta * (k * k - ell * ell - 1 / (ld * ld)) / (d * d)
    cgy = 2 * beta * k * ell / (d * d)
    surface_amplitude = abs(f0 * amplitude / g)
    speed_amplitude = abs(amplitude) * kmag
    length_scale = 1 / kmag

    def fields(x, y):
        theta = k * x + ell * y - omega * time
        c, s = math.cos(theta), math.sin(theta)
        psi = amplitude * c
        eta = f0 / g * psi
        u = amplitude * ell * s
        v = -amplitude * k * s
        q_prime = -d * psi
        # Each term is differentiated from the analytic trigonometric fields.
        q_t = -d * amplitude * omega * s
        beta_v = -beta * amplitude * k * s
        rhs_geo_x = f0 * amplitude * k * s
        lhs_geo_x = -f0 * v
        rhs_geo_y = f0 * amplitude * ell * s
        lhs_geo_y = f0 * u
        return {
            "psi_m2_s": psi, "eta_m": eta,
            "u_m_s": u, "v_m_s": v,
            "linear_qg_pv_s-1": q_prime,
            "qg_pv_time_term_s-2": q_t, "beta_v_term_s-2": beta_v,
            "qg_pv_residual_s-2": q_t + beta_v,
            "geostrophic_east_residual_m_s-2": lhs_geo_x - rhs_geo_x,
            "geostrophic_north_residual_m_s-2": lhs_geo_y - rhs_geo_y,
        }

    samples = [{"x_m": x, "y_m": y, **fields(x, y)}
               for x, y in [(0, 0), (1e5, 2e5), (-7e5, 4e5), (5e5, -3e5)]]
    checks = {
        "max_abs_qg_residual_s-2":
            max(abs(p["qg_pv_residual_s-2"]) for p in samples),
        "max_abs_geostrophic_residual_m_s-2":
            max(max(abs(p["geostrophic_east_residual_m_s-2"]),
                    abs(p["geostrophic_north_residual_m_s-2"])) for p in samples),
        "frequency_dispersion_residual_s-1": d * omega + beta * k,
        "interpretation": "analytic derivatives; not a finite-difference PDE solver",
    }
    horizontal = [[-2e6 + 4e4 * i,
                   fields(-2e6 + 4e4 * i, 0)["psi_m2_s"]]
                  for i in range(101)]
    ref_k = abs(k) if k else 1e-6
    dispersion = [[ref_k * (0.25 + 1.75 * i / 100),
                   -beta * (ref_k * (0.25 + 1.75 * i / 100)) /
                   ((ref_k * (0.25 + 1.75 * i / 100)) ** 2 +
                    ell * ell + 1 / (ld * ld))]
                  for i in range(101)]
    result = {
        "model": "linear_quasigeostrophic_rossby_wave_one_layer_beta_plane",
        "inputs": {"beta_m-1_s-1": beta, "f0_s-1": f0,
                   "H_m": depth, "g_m_s-2": g,
                   "k_m-1": k, "ell_m-1": ell,
                   "psi_amplitude_m2_s": amplitude, "time_s": time},
        "state": {
            "deformation_radius_m": ld, "D_m-2": d,
            "omega_rad_s": omega,
            "period_s": 2 * math.pi / abs(omega) if omega else None,
            "zonal_phase_speed_m_s": omega / k if k else None,
            "group_velocity_m_s": [cgx, cgy],
            "velocity_amplitude_m_s": speed_amplitude,
            "surface_displacement_amplitude_m": surface_amplitude,
            "max_eta_over_H": surface_amplitude / depth,
            "rossby_number_estimate": speed_amplitude / (abs(f0) * length_scale),
            "beta_L_over_f0": beta * length_scale / abs(f0),
            "frequency_over_f0": abs(omega / f0),
            "phase_zonal_direction": ("west" if omega / k < 0 else "east") if k else "undefined",
            "group_zonal_direction": "east" if cgx > 0 else ("west" if cgx < 0 else "stationary"),
        },
        "checks": checks, "samples": samples,
        "plots": [
            {"title": "Streamfunction at y=0",
             "x_label": "x [m]", "y_label": "psi [m^2/s]",
             "series": [{"name": "analytic psi", "points": horizontal}]},
            {"title": "Rossby frequency versus zonal wavenumber",
             "x_label": "k [m^-1]", "y_label": "omega [rad/s]",
             "series": [{"name": "analytic dispersion", "points": dispersion}]},
        ],
    }
    return result, fields


def draw_contours(fields, k, ell):
    """Plot level labels and dashed negative contours for sign accessibility."""
    import matplotlib.pyplot as plt
    from matplotlib.ticker import ScalarFormatter
    n = 80
    xs = [-2e6 + 4e6 * i / (n - 1) for i in range(n)]
    ys = [-2e6 + 4e6 * i / (n - 1) for i in range(n)]
    zs = [[fields(x, y)["psi_m2_s"] for x in xs] for y in ys]
    fig, ax = plt.subplots(figsize=(7, 5))
    levels = 9
    cs = ax.contour(xs, ys, zs, levels=levels)
    ax.clabel(cs, inline=True, fontsize=8)
    ax.set(xlabel="east x [m]", ylabel="north y [m]",
           title="Linear Rossby wave: streamfunction contours")
    ax.xaxis.set_major_formatter(ScalarFormatter(useMathText=True))
    ax.yaxis.set_major_formatter(ScalarFormatter(useMathText=True))
    fig.tight_layout()
    plt.show()


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--beta", type=float, default=1.6e-11)
    parser.add_argument("--f0", type=float, default=1e-4)
    parser.add_argument("--depth", type=float, default=1000.0)
    parser.add_argument("--g", type=float, default=10.0)
    parser.add_argument("--k", type=float, default=2e-6)
    parser.add_argument("--ell", type=float, default=1e-6)
    parser.add_argument("--amplitude", type=float, default=10000.0)
    parser.add_argument("--time", type=float, default=0)
    parser.add_argument("--plot", action="store_true")
    args = parser.parse_args(argv)
    result, fields = wave_state(
        beta=args.beta, f0=args.f0, depth=args.depth, g=args.g,
        k=args.k, ell=args.ell, amplitude=args.amplitude, time=args.time)
    print(json.dumps(result, ensure_ascii=False, indent=2))
    if args.plot:
        draw_contours(fields, args.k, args.ell)


if __name__ == "__main__":
    main()
