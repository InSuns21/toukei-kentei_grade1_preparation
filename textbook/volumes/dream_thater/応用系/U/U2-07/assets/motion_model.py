#!/usr/bin/env python3
"""U2-07: differential drive, exact arc, odometry and local Euler covariance.

All distances are in metres; time in seconds; angles in radians.
Only the Python standard library is required.
"""

from __future__ import annotations

import argparse
import math


def wrap(angle: float) -> float:
    """Return the representative in [-pi, pi)."""
    return (angle + math.pi) % (2.0 * math.pi) - math.pi


def wheels_to_twist(radius: float, separation: float, left: float, right: float):
    if radius <= 0 or separation <= 0:
        raise ValueError("radius and separation must be positive")
    v = radius * (left + right) / 2.0
    omega = radius * (right - left) / separation
    return v, omega


def exact_step(pose, v: float, omega: float, dt: float):
    """Integrate constant body-frame forward/yaw speeds exactly."""
    if dt <= 0:
        raise ValueError("dt must be positive")
    x, y, theta = pose
    turn = omega * dt
    if abs(turn) < 1e-7:
        # Stable sinc-based expression to avoid cancellation at small omega.
        half = turn / 2.0
        sinc = 1.0 - half * half / 6.0 + half ** 4 / 120.0
        distance = v * dt * sinc
        return (
            x + distance * math.cos(theta + half),
            y + distance * math.sin(theta + half),
            wrap(theta + turn),
        )
    return (
        x + v / omega * (math.sin(theta + turn) - math.sin(theta)),
        y - v / omega * (math.cos(theta + turn) - math.cos(theta)),
        wrap(theta + turn),
    )


def euler_step(pose, v: float, omega: float, dt: float):
    if dt <= 0:
        raise ValueError("dt must be positive")
    x, y, theta = pose
    return (
        x + v * dt * math.cos(theta),
        y + v * dt * math.sin(theta),
        wrap(theta + omega * dt),
    )


def odometry_to_three_stage(delta_xy, delta_theta: float):
    dx, dy = delta_xy
    distance = math.hypot(dx, dy)
    if distance == 0:
        return 0.0, 0.0, wrap(delta_theta)
    turn1 = wrap(math.atan2(dy, dx))
    turn2 = wrap(delta_theta - turn1)
    return turn1, distance, turn2


def odometry_step(pose, delta_xy, delta_theta: float):
    x, y, theta = pose
    turn1, distance, turn2 = odometry_to_three_stage(delta_xy, delta_theta)
    return (
        x + distance * math.cos(theta + turn1),
        y + distance * math.sin(theta + turn1),
        wrap(theta + turn1 + turn2),
    )


def transpose(a):
    return [list(row) for row in zip(*a)]


def mm(a, b):
    if not a or not b or any(len(row) != len(a[0]) for row in a):
        raise ValueError("invalid left matrix")
    if any(len(row) != len(b[0]) for row in b) or len(a[0]) != len(b):
        raise ValueError("matrix shape mismatch")
    bt = transpose(b)
    return [[sum(x * y for x, y in zip(row, col)) for col in bt] for row in a]


def add(a, b):
    if len(a) != len(b) or any(len(x) != len(y) for x, y in zip(a, b)):
        raise ValueError("matrix shape mismatch")
    return [[x + y for x, y in zip(row, other)] for row, other in zip(a, b)]


def diag(*entries):
    return [[val if i == j else 0.0 for j, val in enumerate(entries)]
            for i in range(len(entries))]


def euler_linearization(theta: float, v: float, dt: float):
    if dt <= 0:
        raise ValueError("dt must be positive")
    c, s = math.cos(theta), math.sin(theta)
    f = [[1.0, 0.0, -v * dt * s],
         [0.0, 1.0, v * dt * c],
         [0.0, 0.0, 1.0]]
    g = [[dt * c, 0.0],
         [dt * s, 0.0],
         [0.0, dt]]
    return f, g


def covariance_predict(p, m, theta: float, v: float, dt: float):
    if len(p) != 3 or any(len(row) != 3 for row in p):
        raise ValueError("P must be 3x3")
    if len(m) != 2 or any(len(row) != 2 for row in m):
        raise ValueError("M must be 2x2")
    f, g = euler_linearization(theta, v, dt)
    return f, g, add(mm(mm(f, p), transpose(f)), mm(mm(g, m), transpose(g)))


def body_noise_to_world(body_cov, theta):
    if len(body_cov) != 2 or any(len(row) != 2 for row in body_cov):
        raise ValueError("body covariance must be 2x2")
    c, s = math.cos(theta), math.sin(theta)
    rotation = [[c, -s], [s, c]]
    return mm(mm(rotation, body_cov), transpose(rotation))


def approx(a, b, tol=1e-10):
    return abs(a - b) <= tol


def test_self():
    v, omega = wheels_to_twist(0.1, 0.5, 10, 14)
    assert approx(v, 1.2) and approx(omega, 0.8)
    x, y, th = exact_step((0, 0, 0), 1, 1, math.pi / 2)
    assert approx(x, 1) and approx(y, 1) and approx(th, math.pi / 2)
    straight = exact_step((0, 0, math.pi / 2), 2, 0, 0.5)
    assert approx(straight[0], 0) and approx(straight[1], 1)
    for omega0 in (0.0, 1e-9, 0.5, -0.5):
        r = exact_step((1, 2, 0.3), 1.7, omega0, 0.1)
        assert all(math.isfinite(x) for x in r)
    odom = odometry_step((1, 1, math.pi / 2), (0, 2), math.pi / 2)
    assert approx(odom[0], -1) and approx(odom[1], 1)
    assert approx(odom[2], -math.pi)
    assert approx(odometry_step((2, 3, 0.3), (0, 0), 0.5)[0], 2)
    rotated = body_noise_to_world(diag(0.09, 0.01), math.pi / 2)
    assert approx(rotated[0][0], 0.01) and approx(rotated[1][1], 0.09)
    f, g, p2 = covariance_predict(
        diag(0.04, 0.09, 0.01), diag(0.25, 0.04), 0, 2, 1
    )
    assert approx(f[1][2], 2) and approx(g[0][0], 1)
    expected = [[0.29, 0.0, 0.0], [0.0, 0.13, 0.02], [0.0, 0.02, 0.05]]
    assert all(approx(p2[i][j], expected[i][j]) for i in range(3) for j in range(3))
    _, _, north = covariance_predict(
        diag(0.04, 0.09, 0.01), diag(0.04, 0.01), math.pi / 2, 1, 1
    )
    assert approx(north[0][0], 0.05) and approx(north[0][2], -0.01)
    assert approx(north[1][1], 0.13) and approx(north[2][2], 0.02)
    assert approx(wrap(math.pi), -math.pi)


def report_matrix(name, matrix):
    print(name)
    for row in matrix:
        print("  " + "  ".join(f"{value: .6f}" for value in row))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--scenario", choices=["wheels", "arc", "body-noise", "covariance"],
                        default="arc")
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()

    if args.self_test:
        test_self()
        print("All U2-07 self-tests passed")
        return

    if args.scenario == "wheels":
        v, omega = wheels_to_twist(0.1, 0.5, 10, 14)
        print(f"r=0.1 m, b=0.5 m; wheel speed L=10, R=14 rad/s")
        print(f"v={v:.6f} m/s, omega={omega:.6f} rad/s")
        print(f"wheel contact speeds: left={v - 0.25 * omega:.6f},"
              f" right={v + 0.25 * omega:.6f} m/s")
    elif args.scenario == "arc":
        initial = (0, 0, 0)
        v, omega, dt = 1, 1, math.pi / 2
        print(f"initial={initial}, v={v} m/s, omega={omega} rad/s, dt={dt:.6f} s")
        print("exact:", tuple(round(x, 6) for x in exact_step(initial, v, omega, dt)))
        print("Euler:", tuple(round(x, 6) for x in euler_step(initial, v, omega, dt)))
        print("exact quarter-circle endpoint is (1,1) m; Euler endpoint is (pi/2,0) m")
    elif args.scenario == "body-noise":
        sigma_b = diag(0.09, 0.01)
        report_matrix("Body-frame covariance [m^2]", sigma_b)
        report_matrix("World-frame covariance at theta=pi/2 [m^2]",
                      body_noise_to_world(sigma_b, math.pi / 2))
    elif args.scenario == "covariance":
        p, m = diag(0.04, 0.09, 0.01), diag(0.25, 0.04)
        f, g, pred = covariance_predict(p, m, 0, 2, 1)
        print("Euler mean=(2,0,0) [m,m,rad]; dt=1 s")
        report_matrix("F", f)
        report_matrix("G", g)
        report_matrix("P'=F P F^T + G M G^T [mixed units]", pred)


if __name__ == "__main__":
    main()
