"""FLUID15: independently check the spherical angular integral by Simpson quadrature.

Run: python sphere_check.py
No third-party dependencies; analytic target is I = 2/3.
"""
from math import cos, pi, sin


def simpson_0_pi(f, n):
    """Composite Simpson rule, n positive and even."""
    if n <= 0 or n % 2 != 0:
        raise ValueError("n must be a positive even integer")
    h = pi / n
    odd = sum(f(i * h) for i in range(1, n, 2))
    even = sum(f(i * h) for i in range(2, n, 2))
    return h * (f(0.0) + 4.0 * odd + 2.0 * even + f(pi)) / 3.0


def main():
    rho, radius = 1000.0, 0.1  # kg/m^3, m
    target = 2.0 / 3.0
    exact_mass = 2.0 * pi * rho * radius**3 / 3.0
    for n in (40, 80, 160, 400):
        integral = simpson_0_pi(lambda t: cos(t) ** 2 * sin(t), n)
        mass = pi * rho * radius**3 * integral
        pressure_drag = simpson_0_pi(
            lambda t: (1.0 - 2.25 * sin(t) ** 2) * cos(t) * sin(t), n
        )
        print(
            f"n={n:4} integral={integral:.12f} "
            f"error={abs(integral - target):.3e} "
            f"added_mass={mass:.9f} kg "
            f"drag_angular={pressure_drag:.3e}"
        )
        if n == 400:
            assert abs(integral - target) < 5e-9
            assert abs(mass - exact_mass) < 5e-8
            assert abs(pressure_drag) < 1e-10


if __name__ == "__main__":
    main()
