"""U2-24 graph SLAM: exact normal equations, gauge and pose Jacobian.

No randomness; independent unit-variance 1D measurement factors.
2D coordinates in metres and angles in radians; angle branch is fixed.
The elementary dense solver is for small educational examples, not large SLAM.
"""
from __future__ import annotations

import argparse
import math
from fractions import Fraction as F


A = [
    [F(x) for x in row]
    for row in [
        [1, 0, 0, 0],
        [-1, 1, 0, 0],
        [0, -1, 1, 0],
        [0, -1, 0, 1],
        [0, 0, -1, 1],
    ]
]
B = [F(x) for x in [0, 1, 1, 2, 2]]


def residual(rows, targets, q):
    return [sum(a * x for a, x in zip(row, q)) - target
            for row, target in zip(rows, targets)]


def normal_step(rows, targets, q):
    r = residual(rows, targets, q)
    n = len(q)
    h = [[sum(row[i] * row[j] for row in rows)
          for j in range(n)] for i in range(n)]
    g = [sum(row[i] * ra for row, ra in zip(rows, r))
         for i in range(n)]
    return h, g


def solve(h, rhs):
    """Exact pivoted Gauss-Jordan elimination; report singular matrices."""
    n = len(rhs)
    aug = [list(h[i]) + [rhs[i]] for i in range(n)]
    for k in range(n):
        pivot = next((i for i in range(k, n) if aug[i][k]), None)
        if pivot is None:
            raise ValueError("rank deficient: gauge or other unobserved direction")
        aug[k], aug[pivot] = aug[pivot], aug[k]
        scale = aug[k][k]
        aug[k] = [x / scale for x in aug[k]]
        for i in range(n):
            if i == k:
                continue
            scale = aug[i][k]
            aug[i] = [x - scale * y for x, y in zip(aug[i], aug[k])]
    return [row[-1] for row in aug]


def cost(r):
    return sum(v * v for v in r) / 2


def linear():
    q0 = [F(0)] * 4
    h, g = normal_step(A, B, q0)
    delta = solve(h, [-v for v in g])
    q1 = [x + dx for x, dx in zip(q0, delta)]
    r1 = residual(A, B, q1)
    print("normal matrix =", h)
    print("gradient =", g)
    print("GN increment =", delta)
    print("before =", cost(residual(A, B, q0)))
    print("after =", cost(r1), "residuals =", r1)
    assert q1 == [F(0), F(1), F(5, 3), F(10, 3)]
    assert r1 == [F(0), F(0), -F(1, 3), F(1, 3), -F(1, 3)]
    assert cost(r1) == F(1, 6)
    assert all(v == 0 for v in normal_step(A, B, q1)[1])


def gauge():
    rows = A[1:]
    v = [F(1)] * 4
    q0 = [F(0)] * 4
    h, g = normal_step(rows, B[1:], q0)
    assert all(sum(a * b for a, b in zip(row, v)) == 0 for row in rows)
    assert all(sum(a * b for a, b in zip(row, v)) == 0 for row in h)
    assert residual(rows, B[1:], q0) == residual(
        rows, B[1:], [x + 5 for x in q0]
    )
    try:
        solve(h, [-x for x in g])
    except ValueError as exc:
        print("without anchor:", exc)
    else:
        raise AssertionError("missing expected singularity")
    print("H * translation =", [sum(a * b for a, b in zip(row, v))
                                for row in h])


def nonlinear():
    x = F(1, 2)
    r = x * x - 4
    jac = 2 * x
    delta = -r / jac
    full = x + delta
    small = x + delta / 4
    before = r * r / 2
    after_full = (full * full - 4) ** 2 / 2
    after_small = (small * small - 4) ** 2 / 2
    print("initial =", x, "increment =", delta, "full =", full,
          "quarter =", small)
    print("costs: before, full, quarter =", before, after_full, after_small)
    assert (delta, full, small) == (F(15, 4), F(17, 4), F(23, 16))
    assert (before, after_full, after_small) == (
        F(225, 32), F(50625, 512), F(245025, 131072))
    assert after_small < before < after_full


def pose_residual(q):
    xi, yi, ti, xj, yj, tj = q
    dx, dy = xj - xi, yj - yi
    c, s = math.cos(ti), math.sin(ti)
    return [c * dx + s * dy - 2.0,
            -s * dx + c * dy - 1.0,
            tj - ti - math.pi / 6]


def pose_jacobian():
    q = [0.0, 0.0, 0.0, 2.0, 1.0, math.pi / 6]
    jac = [[-1, 0, 1, 1, 0, 0],
           [0, -1, -2, 0, 1, 0],
           [0, 0, -1, 0, 0, 1]]
    assert max(abs(e) for e in pose_residual(q)) < 1e-14
    eps = 1e-6
    for col in range(6):
        left, right = q[:], q[:]
        left[col] -= eps
        right[col] += eps
        el, er = pose_residual(left), pose_residual(right)
        for row in range(3):
            numerical = (er[row] - el[row]) / (2 * eps)
            assert abs(numerical - jac[row][col]) < 1e-5
    vx = [1, 0, 0, 1, 0, 0]
    vy = [0, 1, 0, 0, 1, 0]
    vr = [0, 0, 1, -1, 2, 1]
    for v in (vx, vy, vr):
        assert all(sum(a * b for a, b in zip(row, v)) == 0
                   for row in jac)
    print("2D pose: analytic Jacobian matches finite differences")
    print("gauge: two translations + one rotation are zero directions")


def self_test():
    linear()
    gauge()
    nonlinear()
    pose_jacobian()
    print("all U2-24 numerical checks passed")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--scenario", choices=("linear", "gauge", "nonlinear",
                                               "pose"), default="linear")
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        self_test()
    else:
        {"linear": linear, "gauge": gauge, "nonlinear": nonlinear,
         "pose": pose_jacobian}[args.scenario]()


if __name__ == "__main__":
    main()
