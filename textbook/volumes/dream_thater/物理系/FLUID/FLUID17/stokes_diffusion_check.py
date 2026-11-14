"""FLUID17: Stokes first/second problems, explicit diffusion grid convergence.

Published source for python-file-lab. No third-party packages.
The numerical interior is evolved without using the closed-form interior values;
the analytic first/second solutions are only for initial/boundary data and checks.
"""
import argparse
import math

NU = 1.0e-6       # kinematic viscosity [m2/s]
RHO = 1000.0      # density [kg/m3]
ETA = NU * RHO    # dynamic viscosity [Pa s]
U = 0.020         # wall-speed amplitude [m/s]
OMEGA = 2.0 * math.pi  # angular frequency [1/s]
T_END = 1.0       # final physical time [s]


def exact_first(y, t):
    if y == 0.0:
        return U
    if t <= 0.0:
        return 0.0
    return U * math.erfc(y / (2.0 * math.sqrt(NU * t)))


def exact_second(y, t):
    depth = math.sqrt(2.0 * NU / OMEGA)
    return U * math.exp(-y / depth) * math.cos(OMEGA * t - y / depth)


def exact_wall_force(case, t):
    if case == "first":
        return ETA * U / math.sqrt(math.pi * NU * t)
    depth = math.sqrt(2.0 * NU / OMEGA)
    return ETA * U * (math.cos(OMEGA * t) - math.sin(OMEGA * t)) / depth


def simulate(case, n):
    if n < 32 or n > 520:
        raise ValueError("n must be in [32,520]")
    if case not in ("first", "second"):
        raise ValueError("unknown case")
    length = 0.012 if case == "first" else 0.008
    dy = length / n
    steps = math.ceil(T_END / (0.45 * dy * dy / NU))
    dt = T_END / steps
    r = NU * dt / (dy * dy)
    assert 0 < r <= 0.5

    if case == "first":
        values = [0.0] * (n + 1)
        # The fluid interior is initially at rest. At t=0+ the wall already
        # moves, so the first interior update must use the jumped wall value.
        values[0] = U
        expected = exact_first
    else:
        values = [exact_second(j * dy, 0.0) for j in range(n + 1)]
        expected = exact_second

    for k in range(steps):
        t = (k + 1) * dt
        nxt = values[:]
        for j in range(1, n):
            nxt[j] = values[j] + r * (
                values[j - 1] - 2.0 * values[j] + values[j + 1]
            )
        if case == "first":
            nxt[0] = U
            nxt[n] = 0.0  # finite-domain surrogate of the zero far field
        else:
            nxt[0] = U * math.cos(OMEGA * t)
            nxt[n] = exact_second(length, t)  # tiny analytic tail at cut-off
        values = nxt

    error = max(
        abs(value - expected(j * dy, T_END)) for j, value in enumerate(values)
    ) / U
    # 3-point derivative at the wall for the fluid-ward traction.
    derivative = (-3.0 * values[0] + 4.0 * values[1] - values[2]) / (2.0 * dy)
    force = -ETA * derivative
    target_force = exact_wall_force(case, T_END)
    force_error = abs(force - target_force) / (ETA * U / (
        math.sqrt(math.pi * NU * T_END) if case == "first"
        else math.sqrt(2.0 * NU / OMEGA)
    ))
    assert all(math.isfinite(z) for z in values)
    return {"n": n, "dy": dy, "dt": dt, "r": r, "steps": steps,
            "error": error, "force": force, "force_expected": target_force,
            "force_error": force_error}


def run(case, n):
    coarse = simulate(case, n)
    fine = simulate(case, 2 * n)
    print("\nCASE:", case, "| length [m] =", 0.012 if case == "first" else 0.008)
    print("nu [m2/s] =", NU, "eta [Pa s] =", ETA, "U [m/s] =", U)
    if case == "second":
        print("omega [rad/s] =", OMEGA,
              "penetration depth [m] =", math.sqrt(2.0 * NU / OMEGA))
        print("Second problem starts from the periodic solution, not rest.")
    else:
        print("First problem starts from rest; the wall jumps at t=0.")
    for row in (coarse, fine):
        print("N =", row["n"], "dy [m] =", row["dy"],
              "dt [s] =", row["dt"], "r =", row["r"],
              "steps =", row["steps"])
        print("  relative max velocity error =", row["error"])
        print("  wall force [Pa] numeric/analytic =",
              row["force"], "/", row["force_expected"])
        print("  relative wall-force error =", row["force_error"])
    assert fine["error"] < coarse["error"], (
        "Refinement did not reduce velocity error"
    )
    assert fine["error"] < (0.035 if case == "first" else 0.012), (
        "Velocity error exceeds tolerance"
    )
    assert fine["force_error"] < 0.06, "Wall-force mismatch"
    print("PASS: stable time step, finite values, convergence and wall force")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--case", choices=("first", "second", "both"),
                        default="both")
    parser.add_argument("--n", type=int, default=160)
    args = parser.parse_args()
    if args.n < 32 or args.n > 260:
        parser.error("n must be between 32 and 260 (2n refinement)")
    for case in (("first", "second") if args.case == "both" else (args.case,)):
        run(case, args.n)


if __name__ == "__main__":
    main()
