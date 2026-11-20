"""U2-23: 1D SLAM factor graph, exact rational verification.

All rows use observed displacement = 1 or landmark difference = 2;
each measurement has independent N(0, 1) error. No randomness is used.
"""
from __future__ import annotations

import argparse
from fractions import Fraction as F


def fmatrix(values):
    return [[F(x) for x in row] for row in values]


# Order of columns: x0, x1, x2, landmark m.
# Anchor x0; motion x1-x0, x2-x1; landmarks m-x1, m-x2.
A = fmatrix([
    [1, 0, 0, 0],
    [-1, 1, 0, 0],
    [0, -1, 1, 0],
    [0, -1, 0, 1],
    [0, 0, -1, 1],
])
B = [F(v) for v in (0, 1, 1, 2, 2)]


def residual(rows, b, q):
    return [sum(a * x for a, x in zip(row, q)) - target
            for row, target in zip(rows, b)]


def normal_equations(rows, b):
    """H=A^T A and h=A^T b, for independent unit-variance factors."""
    n = len(rows[0])
    H = [[sum(row[i] * row[j] for row in rows)
          for j in range(n)] for i in range(n)]
    h = [sum(row[i] * val for row, val in zip(rows, b))
         for i in range(n)]
    return H, h


def solve(H, h):
    """Gauss-Jordan elimination with exact Fractions and pivot checks."""
    n = len(h)
    aug = [list(H[i]) + [h[i]] for i in range(n)]
    for col in range(n):
        pivot = next((i for i in range(col, n) if aug[i][col] != 0), None)
        if pivot is None:
            raise ValueError("singular normal matrix: gauge not fixed")
        aug[col], aug[pivot] = aug[pivot], aug[col]
        scale = aug[col][col]
        aug[col] = [v / scale for v in aug[col]]
        for i in range(n):
            if i == col:
                continue
            mul = aug[i][col]
            aug[i] = [x - mul * y for x, y in zip(aug[i], aug[col])]
    return [aug[i][-1] for i in range(n)]


def anchored():
    H, h = normal_equations(A, B)
    q = solve(H, h)
    r = residual(A, B, q)
    cost = sum(v * v for v in r) / 2
    print("H =", H)
    print("h =", h)
    print("MAP (x0, x1, x2, m) =", q)
    print("factor residuals =", r)
    print("weighted half-square cost =", cost)
    return H, h, q, r, cost


def gauge():
    relative_rows = A[1:]
    translation = [F(1)] * 4
    zero = [F(0)] * 4
    shifted = [F(5), F(6), F(7), F(8)]
    base = [F(0), F(1), F(2), F(3)]
    print("relative A times translation vector =",
          [sum(a * v for a, v in zip(row, translation))
           for row in relative_rows])
    print("relative factor residuals before shift =",
          residual(relative_rows, B[1:], base))
    print("relative factor residuals after shift =",
          residual(relative_rows, B[1:], shifted))
    assert all(sum(a * v for a, v in zip(row, translation)) == 0
               for row in relative_rows)
    assert residual(relative_rows, B[1:], base) == residual(
        relative_rows, B[1:], shifted
    )
    H, h = normal_equations(relative_rows, B[1:])
    assert [sum(a * v for a, v in zip(row, translation))
            for row in H] == zero
    try:
        solve(H, h)
    except ValueError as exc:
        print("without anchor:", exc)
    else:
        raise AssertionError("unanchored matrix must be singular")


def self_test():
    H, h, q, r, cost = anchored()
    assert H == fmatrix([
        [2, -1, 0, 0],
        [-1, 3, -1, -1],
        [0, -1, 2, -1],
        [0, -1, -1, 2],
    ])
    assert h == [F(-1), F(-2), F(-1), F(4)]
    assert q == [F(0), F(1), F(5, 3), F(10, 3)]
    assert r == [F(0), F(0), -F(1, 3), F(1, 3), -F(1, 3)]
    assert cost == F(1, 6)
    assert all(sum(a * x for a, x in zip(row, q)) == val
               for row, val in zip(H, h))
    gauge()
    print("all exact rational checks passed")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--scenario", choices=("anchored", "gauge"),
                        default="anchored")
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        self_test()
    elif args.scenario == "gauge":
        gauge()
    else:
        anchored()


if __name__ == "__main__":
    main()
