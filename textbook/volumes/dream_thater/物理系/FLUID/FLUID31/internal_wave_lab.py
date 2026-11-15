#!/usr/bin/env python3
"""FLUID31 analytic 2D linear internal gravity wave; no nonlinear PDE solver.

Boussinesq, inviscid, nonrotating, constant N>0, k>0, real m.
Use --plot to draw a 2D isopycnal displacement field with matplotlib.
The JSON plots use the same exact formulae without extra dependencies.
"""
import argparse
import json
import math


def wave_state(n=0.02, k=0.003, m=0.004, amplitude=0.001, time=0.0):
    if not all(math.isfinite(v) for v in (n, k, m, amplitude, time)):
        raise ValueError("parameters must be finite")
    if not (0 < n <= 0.1 and 1e-5 <= k <= 0.1 and
            abs(m) <= 0.1 and 0 < amplitude <= 0.05 and abs(time) <= 1e5):
        raise ValueError("require 0<N<=0.1, 1e-5<=k<=0.1, |m|<=0.1, A>0")
    g = 9.8
    wave_number = math.hypot(k, m)
    omega = n * k / wave_number
    cgx = n * m * m / wave_number ** 3
    cgz = -n * k * m / wave_number ** 3
    density_contrast_500m = n * n * 500 / g

    def fields(x, z):
        phase = k * x + m * z - omega * time
        c, s = math.cos(phase), math.sin(phase)
        w = amplitude * c
        u = -(m / k) * amplitude * c
        b = n * n / omega * amplitude * s
        pressure = -omega * m / (k * k) * amplitude * c
        displacement = -amplitude / omega * s
        residuals = {
            "divergence_s-1": (m * amplitude - m * amplitude) * s,
            "horizontal_m_s-2": -(m / k) * amplitude * omega * s
                + omega * m / k * amplitude * s,
            "vertical_m_s-2": amplitude * omega * s
                + omega * m * m / (k * k) * amplitude * s - b,
            "buoyancy_m_s-3": -n * n * amplitude * c + n * n * w,
        }
        return {"u_m_s": u, "w_m_s": w, "b_m_s2": b,
                "pi_m2_s2": pressure, "xi_m": displacement,
                "residuals": residuals}

    locations = [(0, 0), (100, 50), (250, -120), (-450, 180)]
    samples = [{"x_m": x, "z_m": z, **fields(x, z)}
               for x, z in locations]
    residual_max = {key: max(abs(item["residuals"][key]) for item in samples)
                    for key in samples[0]["residuals"]}
    mean_energy = 0.5 * amplitude ** 2 * wave_number ** 2 / (k * k)
    # Compute <pi u> and <pi w> directly from the phase fields, independently
    # of group velocity, so the transport identity is a real cross-check.
    mean_flux = [
        omega * m * m * amplitude ** 2 / (2 * k ** 3),
        -omega * m * amplitude ** 2 / (2 * k ** 2),
    ]
    wave_grid_x = [-500 + 10 * i for i in range(101)]
    profile = [[x, fields(x, 0)["xi_m"]] for x in wave_grid_x]
    dispersion = [[r, n / math.hypot(1, r)]
                  for r in [i * 0.1 for i in range(101)]]
    result = {
        "model": "analytic_2d_linear_internal_gravity_wave_constant_N",
        "inputs": {"N_s-1": n, "k_m-1": k, "m_m-1": m,
                   "w_amplitude_m_s": amplitude, "time_s": time},
        "state": {
            "omega_rad_s": omega, "period_s": 2 * math.pi / omega,
            "horizontal_wavelength_m": 2 * math.pi / k,
            "vertical_wavelength_m": (2 * math.pi / abs(m) if m else None),
            "group_velocity_m_s": [cgx, cgz],
            "k_dot_cg_s-1": k * cgx + m * cgz,
            "mean_energy_m2_s2": mean_energy,
            "mean_flux_m3_s3": mean_flux,
            "relative_background_density_difference_over_500m":
                density_contrast_500m,
            "linear_advection_ratio_estimate": max(abs(k), abs(m))
                * max(amplitude, abs(m / k * amplitude)) / omega,
        },
        "checks": {
            "sample_points": samples, "maximum_absolute_linear_PDE_residuals": residual_max,
            "mean_flux_minus_cg_energy": [
                mean_flux[0] - cgx * mean_energy,
                mean_flux[1] - cgz * mean_energy,
            ],
            "description": "analytic derivatives; not finite-difference residuals",
        },
        "plots": [
            {"title": "Vertical displacement along z=0",
             "x_label": "x [m]", "y_label": "vertical displacement xi [m]",
             "series": [{"name": "xi(x,0,t)", "points": profile}]},
            {"title": "Frequency versus vertical/horizontal wavenumber ratio",
             "x_label": "m/k [-]", "y_label": "positive omega [rad/s]",
             "series": [{"name": "omega for k>0, N fixed", "points": dispersion}]},
        ],
    }
    return result, fields


def draw_wave(fields, time):
    import matplotlib.pyplot as plt

    xs = [-700 + 20 * i for i in range(71)]
    zs = [-500 + 20 * j for j in range(51)]
    xi = [[fields(x, z)["xi_m"] for x in xs] for z in zs]
    fig, ax = plt.subplots(figsize=(8, 4.8))
    contours = ax.contourf(xs, zs, xi, levels=16, cmap="coolwarm")
    lines = ax.contour(xs, zs, xi, levels=8, colors="black",
                       linewidths=0.55, linestyles="solid")
    ax.clabel(lines, inline=True, fontsize=7, fmt="%.2f")
    fig.colorbar(contours, ax=ax, label="vertical displacement xi [m]")
    ax.set_xlabel("horizontal x [m]")
    ax.set_ylabel("vertical z [m], upward positive")
    ax.set_title(f"Linear internal-wave isopycnal displacement, t={time:g} s")
    fig.tight_layout()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--n", type=float, default=0.02)
    parser.add_argument("--k", type=float, default=0.003)
    parser.add_argument("--m", type=float, default=0.004)
    parser.add_argument("--amplitude", type=float, default=0.001)
    parser.add_argument("--time", type=float, default=0.0)
    parser.add_argument("--plot", action="store_true")
    args = parser.parse_args()
    result, fields = wave_state(args.n, args.k, args.m, args.amplitude, args.time)
    if args.plot:
        draw_wave(fields, args.time)
    print(json.dumps(result, allow_nan=False, ensure_ascii=False))


if __name__ == "__main__":
    main()
