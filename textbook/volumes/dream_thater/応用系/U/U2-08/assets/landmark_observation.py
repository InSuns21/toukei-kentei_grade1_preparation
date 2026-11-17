#!/usr/bin/env python3
"""U2-08 known landmark range-bearing observation, Jacobian and local rank.

World x right/y up, body front at bearing zero, CCW positive.
Distances in metres; angles in radians. Python standard library only.
"""
from __future__ import annotations

import argparse
import math


def wrap(a: float) -> float:
    return (a + math.pi) % (2 * math.pi) - math.pi


def observe(pose, landmark):
    x, y, theta = pose
    a, b = landmark
    dx, dy = a - x, b - y
    q = dx * dx + dy * dy
    if q <= 0:
        raise ValueError("landmark bearing undefined at zero range")
    return math.sqrt(q), wrap(math.atan2(dy, dx) - theta)


def jacobian(pose, landmark):
    x, y, _ = pose
    a, b = landmark
    dx, dy = a - x, b - y
    q = dx * dx + dy * dy
    if q <= 0:
        raise ValueError("Jacobian undefined at zero range")
    r = math.sqrt(q)
    return [[-dx / r, -dy / r, 0.0],
            [dy / q, -dx / q, -1.0]]


def residual(measurement, prediction):
    return (measurement[0] - prediction[0],
            wrap(measurement[1] - prediction[1]))


def matvec(a, v):
    return [sum(x * y for x, y in zip(row, v)) for row in a]


def centered_difference(pose, landmark, step=1e-6):
    """Differential of (range, local angle), not raw wrapped-angle subtraction."""
    columns = []
    for j in range(3):
        a = list(pose)
        b = list(pose)
        a[j] += step
        b[j] -= step
        plus = observe(a, landmark)
        minus = observe(b, landmark)
        columns.append([(plus[0] - minus[0]) / (2 * step),
                        wrap(plus[1] - minus[1]) / (2 * step)])
    return [[columns[j][i] for j in range(3)] for i in range(2)]


def near(x, y, tol=1e-7):
    return abs(x - y) <= tol


def self_test():
    r, b = observe((1.0, 1.0, math.pi / 2), (2.0, 1.0))
    assert near(r, 1.0) and near(b, -math.pi / 2)
    assert near(observe((0, 0, 0), (3, 4))[0], 5.0)
    h = jacobian((0, 0, 0), (3, 4))
    assert all(near(h[i][j], [[-0.6, -0.8, 0],
                                 [0.16, -0.12, -1]][i][j])
               for i in range(2) for j in range(3))
    fd = centered_difference((0, 0, 0), (3, 4))
    assert max(abs(fd[i][j] - h[i][j])
               for i in range(2) for j in range(3)) < 1e-7
    assert all(near(v, 0) for v in matvec(h, (4, -3, 1)))
    # For distinct landmarks the null directions (4,-3,1) and (4,-5,1) differ.
    second = jacobian((0, 0, 0), (5, 4))
    assert any(abs(v) > 1e-6 for v in matvec(second, (4, -3, 1)))
    assert near(residual((1, math.radians(-179)),
                         (1, math.radians(179)))[1], math.radians(2))
    assert near(residual((1, math.radians(179)),
                         (1, math.radians(-179)))[1], -math.radians(2))
    try:
        observe((0, 0, 0), (0, 0))
        raise AssertionError("zero-range observation should fail")
    except ValueError:
        pass
    try:
        jacobian((0, 0, 0), (0, 0))
        raise AssertionError("zero-range Jacobian should fail")
    except ValueError:
        pass


def show_matrix(matrix):
    for row in matrix:
        print("  " + " ".join(f"{x: .8f}" for x in row))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--scenario", choices=["geometry", "jacobian", "wrap", "rank"],
                        default="geometry")
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()

    if args.self_test:
        self_test()
        print("OK: range/bearing, analytic and finite-difference Jacobian, "
              "wrap, null direction, two landmarks, and zero-range checks")
        return
    if args.scenario == "geometry":
        pose = (1.0, 1.0, math.pi / 2)
        lm = (2.0, 1.0)
        r, bearing = observe(pose, lm)
        print(f"world pose={pose}, landmark={lm}")
        print(f"range={r:.6f} m, body bearing={bearing:.6f} rad "
              f"({math.degrees(bearing):.3f} deg)")
    elif args.scenario == "jacobian":
        pose, lm = (0.0, 0.0, 0.0), (3.0, 4.0)
        a, f = jacobian(pose, lm), centered_difference(pose, lm)
        print("Analytic Jacobian (rows: range, bearing):")
        show_matrix(a)
        print("Centered finite differences:")
        show_matrix(f)
        print("max absolute error:",
              max(abs(a[i][j] - f[i][j]) for i in range(2) for j in range(3)))
    elif args.scenario == "wrap":
        for pred, observed in ((179, -179), (-179, 179)):
            diff = residual((1, math.radians(observed)),
                            (1, math.radians(pred)))[1]
            print(f"pred={pred:+d} deg, observed={observed:+d} deg, "
                  f"wrapped residual={math.degrees(diff):+.3f} deg")
    elif args.scenario == "rank":
        h1 = jacobian((0, 0, 0), (3, 4))
        h2 = jacobian((0, 0, 0), (5, 4))
        null1 = (4.0, -3.0, 1.0)
        print("H1 times (4,-3,1) =", matvec(h1, null1))
        print("H2 times the same vector =", matvec(h2, null1))
        print("The two 1-D null spaces differ, hence stacked rank is 3.")


if __name__ == "__main__":
    main()
