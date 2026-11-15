#!/usr/bin/env python3
"""FLUID27: linear gravity-capillary wave dispersion at finite depth.

All curves use the same small-amplitude inviscid potential-flow model.
The two-mode superposition is not a nonlinear free-surface simulation.
"""
import argparse
import json
import math


def dispersion(k, depth, gravity, gamma, density):
    """Return angular frequency for wavenumber k>0 (1/m)."""
    if not all(math.isfinite(v) and v > 0 for v in
               (k, depth, gravity, density)):
        raise ValueError("k, depth, gravity, density must be positive")
    if not (math.isfinite(gamma) and gamma >= 0):
        raise ValueError("gamma must be finite and nonnegative")
    return math.sqrt((gravity * k + gamma * k**3 / density)
                     * math.tanh(k * depth))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--depth", type=float, default=0.4, help="water depth h [m]")
    parser.add_argument("--wavelength", type=float, default=1.0,
                        help="carrier wavelength [m]")
    parser.add_argument("--gamma", type=float, default=0.072,
                        help="surface tension [N/m]; zero permitted")
    parser.add_argument("--density", type=float, default=1000.0,
                        help="liquid density [kg/m^3]")
    parser.add_argument("--g", type=float, default=9.8,
                        help="gravity acceleration [m/s^2]")
    parser.add_argument("--amplitude", type=float, default=0.01,
                        help="surface elevation amplitude a [m]")
    parser.add_argument("--samples", type=int, default=240,
                        help="horizontal samples (120..600)")
    args = parser.parse_args()
    if not (0.005 <= args.depth <= 20 and 0.01 <= args.wavelength <= 100
            and 0 < args.amplitude <= 0.1 and 120 <= args.samples <= 600):
        parser.error("require depth 0.005..20 m, wavelength 0.01..100 m, "
                     "amplitude 0..0.1 m, samples 120..600")
    if not all(math.isfinite(x) for x in
               (args.depth, args.wavelength, args.amplitude, args.g,
                args.gamma, args.density)):
        parser.error("all physical inputs must be finite")
    if args.g <= 0 or args.density <= 0 or args.gamma < 0:
        parser.error("require g>0, density>0, gamma>=0")
    k = 2 * math.pi / args.wavelength
    if k * args.amplitude >= 0.25 or args.amplitude / args.depth >= 0.25:
        parser.error("linear-wave demo requires ka<0.25 and a/h<0.25")

    omega = dispersion(k, args.depth, args.g, args.gamma, args.density)
    cp = omega / k
    omega_g = dispersion(k, args.depth, args.g, 0, args.density)
    omega_deep = math.sqrt(args.g * k + args.gamma * k**3 / args.density)
    period = 2 * math.pi / omega
    cap_to_grav = args.gamma * k * k / (args.density * args.g)

    # At z=0, phi_t amplitude is -a*omega^2/(k*tanh(kh)),
    # while g*eta - gamma*eta_xx/rho has amplitude a*(g+gamma*k^2/rho).
    # The normalized dynamic boundary residual should be at roundoff.
    lhs = omega**2 / (k * math.tanh(k * args.depth))
    rhs = args.g + args.gamma * k**2 / args.density
    dynamic_relative_residual = abs(lhs - rhs) / rhs

    # Horizontal axis uses logarithm explicitly; no log-axis support required.
    speed_finite = []
    speed_gravity = []
    speed_deep = []
    for i in range(151):
        log_lambda = -2 + 4 * i / 150
        lam = 10**log_lambda
        q = 2 * math.pi / lam
        speed_finite.append([log_lambda,
                             dispersion(q, args.depth, args.g, args.gamma,
                                        args.density) / q])
        speed_gravity.append([log_lambda,
                              dispersion(q, args.depth, args.g, 0,
                                         args.density) / q])
        speed_deep.append([log_lambda,
                           math.sqrt(args.g * q + args.gamma * q**3
                                     / args.density) / q])

    # Two neighboring Fourier modes, both satisfying the same *linear*
    # kinematic and dynamic free-surface conditions independently.
    k2 = 1.10 * k
    omega2 = dispersion(k2, args.depth, args.g, args.gamma, args.density)
    profiles = [[], []]
    for i in range(args.samples + 1):
        s = -10 + 20 * i / args.samples  # x/lambda
        x = s * args.wavelength
        for j, t in enumerate((0.0, period)):
            elevation_over_a = 0.5 * (math.cos(k * x - omega * t)
                                      + math.cos(k2 * x - omega2 * t))
            profiles[j].append([s, elevation_over_a])
    if dynamic_relative_residual > 5e-13:
        raise ArithmeticError("free-surface dynamic boundary residual too large")

    print(json.dumps({
        "model": "linear_inviscid_irrotational_finite_depth_free_surface",
        "parameters": vars(args),
        "ka": k * args.amplitude,
        "amplitude_over_depth": args.amplitude / args.depth,
        "kh": k * args.depth,
        "gravity_capillary_ratio": cap_to_grav,
        "omega_rad_per_s": omega,
        "period_s": period,
        "phase_speed_m_per_s": cp,
        "gravity_only_phase_speed_m_per_s": omega_g / k,
        "deep_water_limit_phase_speed_m_per_s": omega_deep / k,
        "boundary_residual": {
            "normalized_dynamic": dynamic_relative_residual,
            "kinematic": "zero analytically for the separated potential"
        },
        "superposition": {
            "k2_over_k1": 1.10,
            "omega2_over_omega1": omega2 / omega,
            "observation_times_s": [0.0, period],
            "interpretation": "two linear modes, not a nonlinear simulation; "
                              "envelope transport is addressed in FLUID28"
        },
        "plots": [
            {
                "title": "Finite-depth gravity-capillary phase speed",
                "x_label": "log10(wavelength / 1 m)",
                "y_label": "phase speed [m/s]",
                "series": [
                    {"name": "finite depth: gravity + capillary",
                     "points": speed_finite},
                    {"name": "finite depth: gravity only (gamma=0)",
                     "points": speed_gravity},
                    {"name": "infinite-depth formula (comparison)",
                     "points": speed_deep}
                ]
            },
            {
                "title": "Two-mode linear surface elevation",
                "x_label": "x / carrier wavelength",
                "y_label": "surface elevation / amplitude",
                "series": [
                    {"name": "t=0 (solid)", "points": profiles[0]},
                    {"name": "t=one carrier period (compare)",
                     "points": profiles[1]}
                ]
            }
        ]
    }, ensure_ascii=False, allow_nan=False))


if __name__ == "__main__":
    main()
