"""FLUID18: midpoint quadrature check of pressure and shear drag on a Stokes sphere."""
import argparse
import math


def integrate_surface(n: int, eta: float, a: float, speed: float):
    """Return (pressure, shear) force in the +z direction, in newtons."""
    dtheta = math.pi / n
    fp = fv = 0.0
    for j in range(n):
        theta = (j + 0.5) * dtheta
        st, ct = math.sin(theta), math.cos(theta)
        # Pressure relative to p_infinity, and shear traction on the sphere.
        pressure_offset = -3.0 * eta * speed * ct / (2.0 * a)
        shear_rtheta = -3.0 * eta * speed * st / (2.0 * a)
        area = 2.0 * math.pi * a * a * st * dtheta
        fp += (-pressure_offset * ct) * area
        fv += (-shear_rtheta * st) * area
    return fp, fv


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--n", type=int, default=100, help="angular panels (>= 4)")
    args = parser.parse_args()
    if args.n < 4 or args.n > 100000:
        parser.error("--n must be in [4, 100000]")

    rho = 1000.0          # kg/m^3
    eta = 0.001           # Pa s
    a = 0.001             # m
    speed = 0.00001       # m/s
    reynolds_radius = rho * speed * a / eta
    exact_p = 2.0 * math.pi * eta * a * speed
    exact_s = 4.0 * math.pi * eta * a * speed
    exact_total = exact_p + exact_s

    print(f"Re_a={reynolds_radius:.6g}, Re_d={2*reynolds_radius:.6g}")
    print(f"theory: pressure={exact_p:.10e} N, shear={exact_s:.10e} N")
    for panels in (args.n, 2 * args.n, 4 * args.n):
        pressure, shear = integrate_surface(panels, eta, a, speed)
        force = pressure + shear
        relative_error = abs(force / exact_total - 1.0)
        print(
            f"n={panels:6d}: pressure={pressure:.10e} N, "
            f"shear={shear:.10e} N, total={force:.10e} N, "
            f"relative error={relative_error:.6e}"
        )
    print(f"exact total={exact_total:.10e} N; "
          f"Cd={12/reynolds_radius:.6g} (radius-based Re)")


if __name__ == "__main__":
    main()
