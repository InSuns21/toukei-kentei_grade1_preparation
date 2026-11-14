"""FLUID10 Gaussian vortex: independent radial integral and Cartesian Laplacian checks.

All parameters are SI: gamma [m^2/s], a0 [m^2], nu [m^2/s],
t [s], r/h [m]. This is an exact-solution check, NOT an NSE time solver.
"""
import argparse
import json
import math


def finite_float(value):
    result = float(value)
    if not math.isfinite(result):
        raise argparse.ArgumentTypeError("all parameters must be finite")
    return result


def evaluate(gamma=2 * math.pi, a0=1.0, nu=0.25, t=1.0,
             r=1.0, h=0.1, n=200):
    vals = (gamma, a0, nu, t, r, h)
    if not all(math.isfinite(z) for z in vals):
        raise ValueError("nonfinite input")
    if a0 <= 0 or nu <= 0 or t < 0 or r < 0 or h <= 0 or n < 4:
        raise ValueError("a0,nu,h must be >0, t,r >=0, and n >= 4")
    a = a0 + 4 * nu * t
    width = math.sqrt(a)

    def zeta(x, y):
        return gamma / (math.pi * a) * math.exp(-(x*x + y*y) / a)

    center = zeta(0, 0)
    point = zeta(r, 0)
    exact_dt = 4 * nu * (r*r/(a*a) - 1/a) * point

    # Four independent neighboring samples in Cartesian coordinates.
    laplacian_h = (
        zeta(r+h, 0) + zeta(r-h, 0) +
        zeta(r, h) + zeta(r, -h) - 4 * point
    ) / (h*h)
    hh = h/2
    laplacian_half = (
        zeta(r+hh, 0) + zeta(r-hh, 0) +
        zeta(r, hh) + zeta(r, -hh) - 4 * point
    ) / (hh*hh)

    radius = 6 * width  # exp(-36) analytical tail, kept separate
    dr = radius / n

    def radial_integrand(rad):
        return 2 * math.pi * rad * zeta(rad, 0)

    integrated = dr * (
        0.5 * radial_integrand(0) +
        sum(radial_integrand(i*dr) for i in range(1, n)) +
        0.5 * radial_integrand(radius)
    )
    exact_disk = gamma * (-math.expm1(-radius*radius/a))
    # vtheta is defined by the smooth r->0 limit.
    velocity = (gamma / (2*math.pi*r) *
                (-math.expm1(-r*r/a))) if r > 0 else 0.0

    return {
        "parameters": {"gamma_m2_per_s": gamma, "a0_m2": a0,
                       "nu_m2_per_s": nu, "t_s": t, "r_m": r,
                       "h_m": h, "radial_intervals": n},
        "width_m": width,
        "center_vorticity_per_s": center,
        "sample_vorticity_per_s": point,
        "sample_tangential_speed_m_per_s": velocity,
        "exact_time_derivative_per_s2": exact_dt,
        "nu_times_laplacian_h_per_s2": nu*laplacian_h,
        "nu_times_laplacian_h_over_2_per_s2": nu*laplacian_half,
        "residual_h_per_s2": abs(exact_dt - nu*laplacian_h),
        "residual_h_over_2_per_s2": abs(exact_dt - nu*laplacian_half),
        "integration_radius_m": radius,
        "total_circulation_m2_per_s": gamma,
        "disk_circulation_exact_m2_per_s": exact_disk,
        "disk_circulation_trapezoid_m2_per_s": integrated,
        "disk_quadrature_error_m2_per_s": abs(integrated - exact_disk),
        "excluded_tail_exact_m2_per_s": gamma - exact_disk,
        "note": "Analytical evolution; no time-stepping or boundary wall.",
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--gamma", type=finite_float, default=2*math.pi)
    parser.add_argument("--a0", type=finite_float, default=1.0)
    parser.add_argument("--nu", type=finite_float, default=0.25)
    parser.add_argument("--t", type=finite_float, default=1.0)
    parser.add_argument("--r", type=finite_float, default=1.0)
    parser.add_argument("--h", type=finite_float, default=0.1)
    parser.add_argument("--n", type=int, default=200)
    args = parser.parse_args()
    print(json.dumps(evaluate(**vars(args)), ensure_ascii=False,
                     allow_nan=False, indent=2))


if __name__ == "__main__":
    main()
