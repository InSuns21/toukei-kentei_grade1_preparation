#!/usr/bin/env python3
"""FLUID28: group velocity, linear wave energy and energy-flux transport.

Analytic linear gravity-capillary wave in a flat-bottomed fluid. No
nonlinear time integration is performed. Standard library only; plots
are JSON series rendered by the shared browser Python-lab interface.
"""
import argparse
import json
import math


def frequency(k, h, g, gamma, rho):
    """Positive finite-depth gravity-capillary angular frequency [rad/s]."""
    if not all(math.isfinite(v) and v > 0 for v in (k, h, g, rho)):
        raise ValueError("k, h, g and rho must be positive finite numbers")
    if not math.isfinite(gamma) or gamma < 0:
        raise ValueError("gamma must be finite and nonnegative")
    return math.sqrt((g * k + gamma * k**3 / rho) * math.tanh(k * h))


def depth_factor(q):
    """S(q) = 2q/sinh(2q), including the deep-water limit without overflow."""
    if not math.isfinite(q) or q <= 0:
        raise ValueError("kh must be positive and finite")
    if q < 1.0e-3:
        return 1 - (2 / 3) * q**2 + (14 / 45) * q**4
    if q > 350:
        return 0.0
    return 2 * q / math.sinh(2 * q)


def group_speed(k, h, g, gamma, rho):
    """Analytic derivative of the dispersion relation [m/s]."""
    omega = frequency(k, h, g, gamma, rho)
    r = gamma * k * k / (rho * g)
    return omega / (2 * k) * (
        (1 + 3 * r) / (1 + r) + depth_factor(k * h)
    )


def averaged_energy_and_flux(k, h, g, gamma, rho, amplitude):
    """Quadratic period-mean energy [J/m2], fluxes [W/m] per crest width."""
    omega = frequency(k, h, g, gamma, rho)
    q = k * h
    # Independent of the group-speed function: vertical pressure-work integral
    # evaluated analytically before the dispersion relation is substituted.
    pressure_flux = (
        rho * amplitude**2 * omega**3 / (4 * k**2)
        * (1 / math.tanh(q)) * (1 + depth_factor(q))
    )
    surface_flux = gamma * amplitude**2 * k * omega / 2
    kinetic = amplitude**2 * (rho * g + gamma * k**2) / 4
    gravitational = rho * g * amplitude**2 / 4
    capillary = gamma * k**2 * amplitude**2 / 4
    total_energy = kinetic + gravitational + capillary
    return {
        "kinetic_j_per_m2": kinetic,
        "gravity_j_per_m2": gravitational,
        "capillary_j_per_m2": capillary,
        "total_j_per_m2": total_energy,
        "pressure_flux_w_per_m": pressure_flux,
        "capillary_flux_w_per_m": surface_flux,
        "total_flux_w_per_m": pressure_flux + surface_flux
    }


def parse_args():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--depth", type=float, default=0.4, help="depth [m]")
    p.add_argument("--wavelength", type=float, default=1, help="carrier wavelength [m]")
    p.add_argument("--gamma", type=float, default=0.072, help="surface tension [N/m]")
    p.add_argument("--density", type=float, default=1000, help="density [kg/m^3]")
    p.add_argument("--g", type=float, default=9.8, help="gravity [m/s^2]")
    p.add_argument("--amplitude", type=float, default=0.005, help="surface amplitude [m]")
    p.add_argument("--spread", type=float, default=0.12,
                   help="fractional two-mode wavenumber gap")
    p.add_argument("--samples", type=int, default=240,
                   help="points per wave-profile curve (120..600)")
    a = p.parse_args()
    vals = (a.depth, a.wavelength, a.gamma, a.density,
            a.g, a.amplitude, a.spread)
    if not all(math.isfinite(v) for v in vals):
        p.error("all real-valued parameters must be finite")
    if not (0.005 <= a.depth <= 20 and 0.01 <= a.wavelength <= 100
            and a.density > 0 and a.g > 0 and a.gamma >= 0
            and 0 < a.amplitude <= 0.1 and 0.02 <= a.spread <= 0.30
            and 120 <= a.samples <= 600):
        p.error("require 0.005<=h<=20, 0.01<=wavelength<=100, rho,g>0, "
                "gamma>=0, 0<a<=0.1, 0.02<=spread<=0.30 and 120<=samples<=600")
    k = 2 * math.pi / a.wavelength
    if k * (1 + a.spread / 2) * a.amplitude >= 0.25:
        p.error("linear approximation requires maximum ka<0.25")
    if a.amplitude / a.depth >= 0.25:
        p.error("linear approximation requires a/h<0.25")
    return a


def main():
    a = parse_args()
    k = 2 * math.pi / a.wavelength
    omega = frequency(k, a.depth, a.g, a.gamma, a.density)
    cp = omega / k
    cg = group_speed(k, a.depth, a.g, a.gamma, a.density)
    energy = averaged_energy_and_flux(
        k, a.depth, a.g, a.gamma, a.density, a.amplitude
    )
    transported_speed = energy["total_flux_w_per_m"] / energy["total_j_per_m2"]
    flux_relative_residual = abs(transported_speed - cg) / cg
    eps = 0.0001
    numeric_derivative = (
        frequency(k * (1 + eps), a.depth, a.g, a.gamma, a.density)
        - frequency(k * (1 - eps), a.depth, a.g, a.gamma, a.density)
    ) / (2 * eps * k)
    derivative_relative_residual = abs(numeric_derivative - cg) / cg

    kminus, kplus = k * (1 - a.spread / 2), k * (1 + a.spread / 2)
    wminus = frequency(kminus, a.depth, a.g, a.gamma, a.density)
    wplus = frequency(kplus, a.depth, a.g, a.gamma, a.density)
    beat_speed = (wplus - wminus) / (kplus - kminus)
    beat_relative_residual = abs(beat_speed - cg) / cg
    if flux_relative_residual > 5e-12:
        raise ArithmeticError("energy-flux/group-velocity identity failed")
    if derivative_relative_residual > 2e-6:
        raise ArithmeticError("group speed derivative check failed")

    speeds_cp, speeds_cg = [], []
    normalized_pressure, normalized_surface = [], []
    for i in range(151):
        log_ratio = -1 + 2 * i / 150
        wavenumber = k * 10**log_ratio
        ws = frequency(wavenumber, a.depth, a.g, a.gamma, a.density)
        phase = ws / wavenumber
        group = group_speed(wavenumber, a.depth, a.g, a.gamma, a.density)
        local = averaged_energy_and_flux(
            wavenumber, a.depth, a.g, a.gamma, a.density, a.amplitude
        )
        speeds_cp.append([log_ratio, phase])
        speeds_cg.append([log_ratio, group])
        normalized_pressure.append(
            [log_ratio, local["pressure_flux_w_per_m"] / local["total_j_per_m2"]]
        )
        normalized_surface.append(
            [log_ratio, local["capillary_flux_w_per_m"] / local["total_j_per_m2"]]
        )

    t_after = 5 * (2 * math.pi / omega)
    before, after = [], []
    for i in range(a.samples + 1):
        x_over_lambda = -12 + 24 * i / a.samples
        x = x_over_lambda * a.wavelength
        # Equal halves, total carrier-scale amplitude a; two linear modes.
        for curve, time in ((before, 0.0), (after, t_after)):
            height_over_a = (
                math.cos(kminus * x - wminus * time)
                + math.cos(kplus * x - wplus * time)
            ) / 2
            curve.append([x_over_lambda, height_over_a])

    print(json.dumps({
        "model": "linear_flat_bottom_gravity_capillary_no_dissipation",
        "parameters": vars(a),
        "kh": k * a.depth,
        "capillary_to_gravity_ratio": a.gamma * k * k / (a.density * a.g),
        "linear_checks": {"ka_max": kplus * a.amplitude,
                          "amplitude_over_depth": a.amplitude / a.depth},
        "carrier_omega_rad_per_s": omega,
        "phase_speed_m_per_s": cp,
        "group_speed_m_per_s": cg,
        "central_difference_group_m_per_s": numeric_derivative,
        "two_mode_beat_speed_m_per_s": beat_speed,
        "energy": energy,
        "energy_transport_speed_m_per_s": transported_speed,
        "checks": {"relative_energy_flux_residual": flux_relative_residual,
                   "relative_group_derivative_residual": derivative_relative_residual,
                   "relative_two_mode_secant_gap": beat_relative_residual},
        "two_mode": {
            "kplus_over_kminus": kplus / kminus,
            "time_after_s": t_after,
            "caveat": "equal-amplitude linear superposition, not a nonlinear simulation; "
                      "the finite-gap beat speed need not equal the derivative"
        },
        "plots": [
            {
                "title": "Finite-depth wave phase and group speeds",
                "x_label": "log10(k / carrier k)",
                "y_label": "speed [m/s]",
                "series": [
                    {"name": "phase speed cp", "points": speeds_cp},
                    {"name": "group speed cg", "points": speeds_cg}
                ]
            },
            {
                "title": "Two-mode beat: water surface at two times",
                "x_label": "x / carrier wavelength",
                "y_label": "eta / a",
                "series": [
                    {"name": "t=0", "points": before},
                    {"name": "t=5 carrier periods", "points": after}
                ]
            },
            {
                "title": "Mean energy flux: pressure and interface",
                "x_label": "log10(k / carrier k)",
                "y_label": "flux / mean energy [m/s]",
                "series": [
                    {"name": "pressure work Jp/E", "points": normalized_pressure},
                    {"name": "surface-tension work Jgamma/E",
                     "points": normalized_surface}
                ]
            }
        ]
    }, ensure_ascii=False, allow_nan=False))


if __name__ == "__main__":
    main()
