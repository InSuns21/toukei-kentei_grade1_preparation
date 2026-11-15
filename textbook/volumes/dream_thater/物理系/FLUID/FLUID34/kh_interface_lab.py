#!/usr/bin/env python3
"""FLUID34: two semi-infinite, inviscid Kelvin–Helmholtz interface.

Evaluate the EXACT linear dispersion relation and visualize its normal modes.
This is not a nonlinear Navier–Stokes/level-set/interface-tracking solver.
All numerical data and plot series use Python's standard library.
"""
import argparse
import cmath
import json
import math


def interface_state(rho1=1000.0, rho2=1020.0, u1=0.2, u2=0.0,
                    g=9.81, sigma=0.072, k=30.0,
                    amplitude=1e-4, time=0.5):
    values = (rho1, rho2, u1, u2, g, sigma, k, amplitude, time)
    if not all(math.isfinite(v) for v in values):
        raise ValueError("all inputs must be finite")
    if not (0 < rho1 <= 10000 and 0 < rho2 <= 10000 and
            abs(u1) <= 10 and abs(u2) <= 10 and
            0 < g <= 30 and 0 <= sigma <= 10 and
            0 < k <= 10000 and 0 < amplitude <= 0.01 and
            0 <= time <= 10):
        raise ValueError("invalid density, velocity, gravity, tension, wave number, amplitude or time")
    rho_total = rho1 + rho2
    delta_u = u1 - u2
    mean_u = (rho1 * u1 + rho2 * u2) / rho_total
    a = rho1 * rho2 / rho_total * delta_u**2
    b = (rho2 - rho1) * g
    q = b - a * k + sigma * k**2
    radicand = k * q / rho_total
    frequency_plus = k * mean_u + cmath.sqrt(radicand)
    frequency_minus = k * mean_u - cmath.sqrt(radicand)
    growth = math.sqrt(max(0, -radicand))
    if growth * time > 8:
        raise ValueError("time is too long for this illustrative growing linear mode")
    if k * amplitude * math.exp(growth * time) >= 0.1:
        raise ValueError("linear small-slope approximation invalid for chosen amplitude/time")
    threshold = None
    unstable_band = None
    if rho2 > rho1 and sigma > 0:
        threshold = math.sqrt(2 * rho_total * math.sqrt(sigma * b) / (rho1 * rho2))
        discriminant = a * a - 4 * sigma * b
        if discriminant > 0:
            # The reciprocal formula avoids cancellation for the lower root.
            upper = (a + math.sqrt(discriminant)) / (2 * sigma)
            lower = b / (sigma * upper)
            unstable_band = [lower, upper]
    rhs = (rho2 - rho1) * g * k + sigma * k**3

    def dispersion_residual(omega):
        return (rho1 * (omega - k * u1)**2 +
                rho2 * (omega - k * u2)**2 - rhs)

    # Kinematic amplitudes are calculated from the actual complex growing root.
    d1 = frequency_plus - k * u1
    d2 = frequency_plus - k * u2
    potential_top = 1j * d1 * amplitude / k
    potential_bottom = -1j * d2 * amplitude / k
    kinematic_top = -1j * d1 * amplitude - (-k * potential_top)
    kinematic_bottom = -1j * d2 * amplitude - k * potential_bottom
    dynamic = (rho1 * d1**2 + rho2 * d2**2 - rhs) * amplitude / k

    def mode_value(x, t):
        if radicand < 0:
            return amplitude * math.exp(growth * t) * math.cos(k * (x - mean_u * t))
        return amplitude * math.cos(k * x - frequency_plus.real * t)

    wavelength = 2 * math.pi / k
    profile = [[(-1 + j / 60) * wavelength,
                mode_value((-1 + j / 60) * wavelength, time)]
               for j in range(121)]
    initial_profile = [[x, mode_value(x, 0.0)] for x, _ in profile]
    # Keep the instability band visually resolvable on a linear horizontal axis.
    max_k = max(2 * k, 2 * unstable_band[1] if unstable_band else 2 * k)
    ks = [max_k * (j + 1) / 121 for j in range(121)]
    growth_curve = [[h, math.sqrt(max(0.0, -h * (b - a * h + sigma * h**2) /
                                          rho_total))]
                    for h in ks]
    zero_growth = [[h, 0.0] for h in ks]
    max_residual = max(abs(dispersion_residual(frequency_plus)),
                       abs(dispersion_residual(frequency_minus)))
    result = {
        "model": "two_semi_infinite_inviscid_sharp_interface_linear_Kelvin_Helmholtz",
        "inputs": {
            "rho_upper_kg_m-3": rho1, "rho_lower_kg_m-3": rho2,
            "U_upper_m_s": u1, "U_lower_m_s": u2,
            "g_m_s-2": g, "sigma_N_m-1": sigma,
            "wavenumber_m-1": k, "amplitude_m": amplitude, "time_s": time,
        },
        "state": {
            "wavelength_m": wavelength, "density_weighted_speed_m_s": mean_u,
            "delta_U_m_s": delta_u, "A_coefficient": a, "B_coefficient": b,
            "q_coefficient": q, "radicand_s-2": radicand,
            "omega_plus_rad_s": [frequency_plus.real, frequency_plus.imag],
            "omega_minus_rad_s": [frequency_minus.real, frequency_minus.imag],
            "growth_rate_s-1": growth,
            "time_amplification_factor": math.exp(growth * time),
            "linear_slope_k_eta_at_time": k * amplitude * math.exp(growth * time),
            "status": "unstable" if radicand < 0 else ("double_root" if radicand == 0 else "neutral"),
            "velocity_threshold_m_s": threshold,
            "unstable_wavenumber_interval_m-1": unstable_band,
        },
        "checks": {
            "max_dispersion_residual": max_residual,
            "kinematic_upper_residual": abs(kinematic_top),
            "kinematic_lower_residual": abs(kinematic_bottom),
            "dynamic_boundary_residual_Pa": abs(dynamic),
            "interpretation": "analytic linear eigenmode checks; not a nonlinear CFD simulation",
        },
        "plots": [
            {
                "title": "Linear growth rate versus wavenumber",
                "x_label": "wavenumber k [m^-1]", "y_label": "growth rate [s^-1]",
                "series": [
                    {"name": "growth rate", "points": growth_curve},
                    {"name": "zero-growth reference", "points": zero_growth},
                ],
            },
            {
                "title": "Analytic linear interface: before and after",
                "x_label": "x [m]", "y_label": "eta [m]",
                "series": [
                    {"name": "initial interface t=0", "points": initial_profile},
                    {"name": "interface at selected time", "points": profile},
                ],
            },
        ],
    }
    return result


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--rho1", type=float, default=1000.0)
    parser.add_argument("--rho2", type=float, default=1020.0)
    parser.add_argument("--u1", type=float, default=0.2)
    parser.add_argument("--u2", type=float, default=0.0)
    parser.add_argument("--g", type=float, default=9.81)
    parser.add_argument("--sigma", type=float, default=0.072)
    parser.add_argument("--k", type=float, default=30.0)
    parser.add_argument("--amplitude", type=float, default=1e-4)
    parser.add_argument("--time", type=float, default=0.5)
    args = parser.parse_args(argv)
    state = interface_state(**vars(args))
    print(json.dumps(state, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
