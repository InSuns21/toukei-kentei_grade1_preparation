#!/usr/bin/env python3
"""FLUID35: inviscid Rayleigh-Taylor modes and stress-free Rayleigh-Benard eigenmodes.

The RT interface is NOT a nonlinear interface-tracking simulation.
The RBC calculation solves the exact 2x2 Fourier-sine mode eigenproblem for
an infinite horizontal layer with fixed-temperature stress-free plates,
NOT the no-slip eigenproblem nor the nonlinear convection equations.
Only Python's standard library is required.
"""
import argparse
import json
import math


def rt_state(rho1=1050.0, rho2=1000.0, g=9.81, sigma=0.072,
             k=10.0, amplitude=1e-5, time=0.2):
    """rho1: upper density; rho2: lower density; both in kg/m^3."""
    vals = (rho1, rho2, g, sigma, k, amplitude, time)
    if not all(math.isfinite(x) for x in vals):
        raise ValueError("RT parameters must be finite")
    if not (0 < rho1 <= 20000 and 0 < rho2 <= 20000 and 0 < g <= 30
            and 0 <= sigma <= 10 and 0 < k <= 10000
            and 0 < amplitude <= 0.01 and 0 <= time <= 10):
        raise ValueError("RT density, gravity, tension, k, amplitude, or time out of range")

    total = rho1 + rho2
    atwood = (rho1 - rho2) / total
    radicand = ((rho2 - rho1) * g * k + sigma * k**3) / total
    growth = math.sqrt(max(0.0, -radicand))
    if growth * time > 8 or k * amplitude * math.exp(growth * time) >= 0.1:
        raise ValueError("outside the safe plotting range for a small-slope linear mode")
    cutoff = math.sqrt((rho1 - rho2) * g / sigma) if rho1 > rho2 and sigma > 0 else None
    fastest_k = cutoff / math.sqrt(3) if cutoff is not None else None
    fastest_growth = (math.sqrt(2 * atwood * g * fastest_k / 3)
                      if fastest_k is not None else None)
    scale = max(2 * k, 1.6 * cutoff if cutoff is not None else 2 * k)
    ks = [scale * (j + 1) / 121 for j in range(121)]
    growth_curve = [[h, math.sqrt(max(0, ((rho1 - rho2) * g * h -
                                          sigma * h**3) / total))] for h in ks]
    wave = 2 * math.pi / k
    xs = [wave * j / 80 for j in range(81)]
    y0 = [[x, amplitude * math.cos(k * x)] for x in xs]
    y1 = [[x, amplitude * math.exp(growth * time) * math.cos(k * x)]
          for x in xs] if radicand < 0 else [
              [x, amplitude * math.cos(k * x)] for x in xs]
    dispersion_residual = total * radicand - ((rho2 - rho1) * g * k +
                                              sigma * k**3)
    return {
        "model": "linear_inviscid_semi_infinite_Rayleigh_Taylor_interface",
        "inputs": {"rho_upper_kg_m-3": rho1, "rho_lower_kg_m-3": rho2,
                   "g_m_s-2": g, "sigma_N_m-1": sigma,
                   "k_m-1": k, "amplitude_m": amplitude, "time_s": time},
        "state": {"atwood_number": atwood, "omega_squared_s-2": radicand,
                  "growth_rate_s-1": growth,
                  "cutoff_k_m-1": cutoff, "fastest_k_m-1": fastest_k,
                  "fastest_growth_s-1": fastest_growth,
                  "amplification": math.exp(growth * time),
                  "small_slope_k_amplitude": k * amplitude * math.exp(growth * time),
                  "status": "growing" if radicand < 0 else (
                      "zero_frequency" if radicand == 0 else "oscillatory")},
        "checks": {"dispersion_residual_scaled": abs(dispersion_residual) /
                   max(1.0, abs((rho2 - rho1) * g * k), abs(sigma * k**3)),
                   "interpretation": "analytic linear mode; no nonlinear interface tracking"},
        "plots": [
            {"title": "RT growth rate versus horizontal wavenumber",
             "x_label": "k [m^-1]", "y_label": "gamma [s^-1]",
             "series": [{"name": "growing mode", "points": growth_curve},
                        {"name": "zero reference", "points": [[h, 0] for h in ks]}]},
            {"title": "RT linear displacement at the selected time",
             "x_label": "x [m]", "y_label": "interface displacement [m]",
             "series": [{"name": "initial interface", "points": y0},
                        {"name": "selected time", "points": y1}]},
        ],
    }


def benard_state(ra=800.0, pr=7.0, a=2.2, n=1):
    """Exact Fourier-sine 2x2 eigenvalues for stress-free, isothermal plates.

    Nondimensional growth lambda = s*d^2/kappa, horizontal wavenumber a = k_h*d.
    The temperature and velocity amplitudes form a two-dimensional eigenspace
    for every sin(n*pi*z/d) vertical mode.
    """
    vals = (ra, pr, a)
    if not all(math.isfinite(x) for x in vals):
        raise ValueError("RBC parameters must be finite")
    if not (0 <= ra <= 100000 and 0.05 <= pr <= 1000 and 0.1 <= a <= 20
            and isinstance(n, int) and 1 <= n <= 10):
        raise ValueError("RBC Ra, Pr, a, or n out of range")
    q = a*a + (n * math.pi)**2
    threshold = q**3 / (a*a)
    # Matrix for (W,Theta), after pressure elimination:
    # lambda W = -Pr*q*W + Pr*Ra*a^2/q * Theta,
    # lambda Theta = W - q*Theta.
    m11, m12 = -pr*q, pr*ra*a*a/q
    m21, m22 = 1.0, -q
    trace = m11 + m22
    determinant = m11*m22 - m12*m21
    discriminant = trace*trace - 4*determinant
    root = math.sqrt(max(0.0, discriminant))
    plus = (trace + root)/2
    minus = (trace - root)/2
    def residual(value):
        return abs((value-m11)*(value-m22) - m12*m21) / max(
            1.0, abs(m11*m22), abs(m12*m21))
    critical = 27 * math.pi**4 / 4
    optimum = math.pi / math.sqrt(2)
    samples = [0.3 + 5.7*j/120 for j in range(121)]
    thresholds = [[b, (b*b+math.pi**2)**3/(b*b)] for b in samples]
    growths = []
    for b in samples:
        qb = b*b+math.pi**2
        tb = -(pr+1)*qb
        db = pr*(qb*qb-ra*b*b/qb)
        eig = (tb + math.sqrt(max(0, tb*tb-4*db)))/2
        growths.append([b, eig])
    return {
        "model": "linear_Rayleigh_Benard_stress_free_fixed_temperature_infinite_layer",
        "inputs": {"Rayleigh": ra, "Prandtl": pr,
                   "horizontal_a_kd": a, "vertical_mode_n": n},
        "state": {"Q_a2_plus_n2pi2": q, "Ra_neutral_at_a_n": threshold,
                  "critical_Ra_for_all_a_n": critical, "critical_a": optimum,
                  "lambda_plus": plus, "lambda_minus": minus,
                  "lambda_units": "dimensionless s*d^2/kappa",
                  "status": "growing" if plus > 1e-10 else (
                      "decaying" if plus < -1e-10 else "neutral")},
        "checks": {"characteristic_plus_scaled": residual(plus),
                   "characteristic_minus_scaled": residual(minus),
                   "trace_residual": abs(plus+minus-trace),
                   "determinant_residual_scaled": abs(plus*minus-determinant) /
                        max(1.0, abs(determinant)),
                   "boundary": "W=0, W''=0, Theta=0 at both plates",
                   "interpretation": "exact sine-mode eigenvalues, not a nonlinear solver"},
        "plots": [
            {"title": "Stress-free stationary neutral curve, n=1",
             "x_label": "a=k_h*d", "y_label": "Ra_n(a)",
             "series": [{"name": "neutral Ra for n=1", "points": thresholds},
                        {"name": "analytic global minimum",
                         "points": [[b, critical] for b in samples]}]},
            {"title": "Stress-free leading mode growth, n=1",
             "x_label": "a=k_h*d", "y_label": "lambda=s*d^2/kappa",
             "series": [{"name": "leading eigenvalue", "points": growths},
                        {"name": "zero reference",
                         "points": [[b, 0] for b in samples]}]},
        ],
    }


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--rho1", type=float, default=1050.0)
    parser.add_argument("--rho2", type=float, default=1000.0)
    parser.add_argument("--g", type=float, default=9.81)
    parser.add_argument("--sigma", type=float, default=0.072)
    parser.add_argument("--k", type=float, default=10.0)
    parser.add_argument("--amplitude", type=float, default=1e-5)
    parser.add_argument("--time", type=float, default=0.2)
    parser.add_argument("--ra", type=float, default=800.0)
    parser.add_argument("--pr", type=float, default=7.0)
    parser.add_argument("--a", type=float, default=2.2)
    parser.add_argument("--n", type=int, default=1)
    args = vars(parser.parse_args(argv))
    rt_keys = ("rho1", "rho2", "g", "sigma", "k", "amplitude", "time")
    rt = rt_state(**{key: args[key] for key in rt_keys})
    rb = benard_state(**{key: args[key] for key in ("ra", "pr", "a", "n")})
    print(json.dumps({"model": "FLUID35-two-distinct-linear-models",
                      "RT": {key: value for key, value in rt.items() if key != "plots"},
                      "RBC": {key: value for key, value in rb.items() if key != "plots"},
                      "plots": rt["plots"] + rb["plots"]},
                     ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
