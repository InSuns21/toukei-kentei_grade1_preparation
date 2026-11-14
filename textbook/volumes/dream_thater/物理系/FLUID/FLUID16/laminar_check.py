"""FLUID16: independent quadrature checks for steady viscous flows.

No third-party packages are required. All input parameters are positive
and the script checks physical units/sign conventions through force/power balances.
"""
import argparse
import math


def simpson(f, lo, hi, n):
    if n < 4 or n % 2:
        raise ValueError("n must be even and at least 4")
    h = (hi - lo) / n
    total = f(lo) + f(hi)
    for j in range(1, n):
        total += (4 if j % 2 else 2) * f(lo + j * h)
    return total * h / 3


def relative_error(actual, expected):
    return abs(actual - expected) / max(abs(expected), 1e-15)


def pipe(n, plot=False):
    radius, length, eta, pressure_drop = 0.002, 1.0, 0.001, 100.0
    G = pressure_drop / length
    velocity = lambda r: G * (radius**2 - r**2) / (4 * eta)
    d_velocity = lambda r: -G * r / (2 * eta)

    flow_integral = simpson(lambda r: 2 * math.pi * r * velocity(r), 0, radius, n)
    flow_formula = math.pi * G * radius**4 / (8 * eta)
    stress_formula = eta * d_velocity(radius)
    h = radius / (n * 10)
    # The derivative is independently approximated from three interior samples.
    stress_difference = eta * (
        3 * velocity(radius) - 4 * velocity(radius - h)
        + velocity(radius - 2 * h)
    ) / (2 * h)
    wall_force = stress_difference * 2 * math.pi * radius * length
    pressure_force = pressure_drop * math.pi * radius**2
    dissip_integral = simpson(
        lambda r: 2 * math.pi * r * length * eta * d_velocity(r)**2,
        0, radius, n,
    )
    pressure_power = pressure_drop * flow_formula

    print("PIPE: radius [m] =", radius, "pressure difference [Pa] =", pressure_drop)
    print("Q quadrature [m3/s] =", flow_integral)
    print("Q analytic [m3/s] =", flow_formula)
    print("Wall shear numerical [Pa] =", stress_difference)
    print("Wall shear analytic [Pa] =", stress_formula)
    print("Pressure + wall force [N] =", pressure_force + wall_force)
    print("Dissipation [W] =", dissip_integral, "pressure power [W] =", pressure_power)
    assert relative_error(flow_integral, flow_formula) < 1e-9
    assert relative_error(stress_difference, stress_formula) < 1e-8
    assert abs(pressure_force + wall_force) < 1e-9
    assert relative_error(dissip_integral, pressure_power) < 1e-9

    if plot:
        import matplotlib.pyplot as plt
        radii = [radius * i / 100 for i in range(101)]
        figure, axes = plt.subplots(figsize=(7, 4))
        axes.plot([1000 * r for r in radii], [velocity(r) for r in radii],
                  color="#1d4ed8", linewidth=2, label="axial velocity")
        axes.scatter([0, 1000 * radius], [velocity(0), velocity(radius)],
                     marker="o", color="black", zorder=4, label="centre / wall")
        axes.set(xlabel="radius r (mm)", ylabel="velocity w (m/s)",
                 title="Pipe Poiseuille velocity profile")
        axes.legend()
        axes.grid(alpha=0.2)
        figure.tight_layout()


def couette(n, plot=False):
    a, b, length, eta = 0.01, 0.02, 1.0, 0.1
    omega_i, omega_o = 10.0, 0.0
    A = (b**2 * omega_o - a**2 * omega_i) / (b**2 - a**2)
    B = a**2 * b**2 * (omega_i - omega_o) / (b**2 - a**2)
    velocity = lambda r: A * r + B / r

    h = (b - a) / (n * 10)
    deriv_a = (-3 * velocity(a) + 4 * velocity(a + h) - velocity(a + 2 * h)) / (2 * h)
    deriv_b = (3 * velocity(b) - 4 * velocity(b - h) + velocity(b - 2 * h)) / (2 * h)
    shear_a = eta * (deriv_a - velocity(a) / a)
    shear_b = eta * (deriv_b - velocity(b) / b)
    torque_i = -shear_a * 2 * math.pi * a**2 * length
    torque_o = shear_b * 2 * math.pi * b**2 * length
    expected_torque = 4 * math.pi * eta * B * length
    power = torque_i * omega_i + torque_o * omega_o

    dissip_integral = simpson(
        lambda r: 2 * math.pi * r * length * eta * (2 * B / r**2)**2,
        a, b, n,
    )
    print("COUETTE: a,b [m] =", a, b, "angular speeds [1/s] =", omega_i, omega_o)
    print("Wall speed inner/outer [m/s] =", velocity(a), velocity(b))
    print("Wall torque inner/outer [N m] =", torque_i, torque_o)
    print("Torque analytic [N m] =", expected_torque)
    print("Dissipation [W] =", dissip_integral, "wall power [W] =", power)
    assert relative_error(velocity(a), a * omega_i) < 1e-10
    assert abs(velocity(b) - b * omega_o) < 1e-10
    assert relative_error(torque_i, expected_torque) < 1e-6
    assert relative_error(torque_o, -expected_torque) < 1e-6
    assert relative_error(dissip_integral, power) < 1e-6

    if plot:
        import matplotlib.pyplot as plt
        radii = [a + (b - a) * i / 100 for i in range(101)]
        figure, axes = plt.subplots(figsize=(7, 4))
        axes.plot([1000 * r for r in radii], [velocity(r) for r in radii],
                  color="#1d4ed8", linewidth=2, label="azimuthal velocity")
        axes.scatter([1000 * a, 1000 * b], [a * omega_i, b * omega_o],
                     marker="o", color="black", zorder=4, label="wall speeds")
        axes.set(xlabel="radius r (mm)", ylabel="velocity v_theta (m/s)",
                 title="Concentric-cylinder Couette velocity profile")
        axes.legend()
        axes.grid(alpha=0.2)
        figure.tight_layout()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--case", choices=["pipe", "couette", "both"], default="both")
    parser.add_argument("--n", type=int, default=512)
    parser.add_argument("--plot", action="store_true",
                        help="draw velocity profiles; requires matplotlib")
    args = parser.parse_args()
    if args.case in ("pipe", "both"):
        pipe(args.n, plot=args.plot)
    if args.case in ("couette", "both"):
        couette(args.n, plot=args.plot)


if __name__ == "__main__":
    main()
