"""Finite LLE experiments using only the Python standard library."""

from __future__ import annotations

import argparse
import json
import math


def solve_linear(a: list[list[float]], b: list[float]) -> list[float]:
    """Solve a positive definite system by pivoted Gaussian elimination."""
    n = len(b)
    aug = [list(row) + [value] for row, value in zip(a, b)]
    for col in range(n):
        pivot = max(range(col, n), key=lambda i: abs(aug[i][col]))
        if abs(aug[pivot][col]) < 1e-15:
            raise ValueError("singular linear system")
        aug[col], aug[pivot] = aug[pivot], aug[col]
        scale = aug[col][col]
        for j in range(col, n + 1):
            aug[col][j] /= scale
        for i in range(n):
            if i == col:
                continue
            factor = aug[i][col]
            for j in range(col, n + 1):
                aug[i][j] -= factor * aug[col][j]
    return [aug[i][n] for i in range(n)]


def ridge_weights(
    points: list[list[float]], k: int = 2, gamma: float = 0.01
) -> tuple[list[list[float]], list[float]]:
    """Find k nearest neighbours (ties by index), then scale-aware ridge weights."""
    if not (1 <= k < len(points)) or gamma <= 0:
        raise ValueError("require 1 <= k < n and gamma > 0")
    d = len(points[0])
    if d == 0 or any(len(p) != d for p in points):
        raise ValueError("points must have a common positive dimension")
    n = len(points)
    w = [[0.0] * n for _ in range(n)]
    lambdas = []
    for i in range(n):
        neighbours = sorted(
            (j for j in range(n) if j != i),
            key=lambda j: (sum((a - b) ** 2 for a, b in zip(points[i], points[j])), j),
        )[:k]
        differences = [
            [points[j][h] - points[i][h] for h in range(d)] for j in neighbours
        ]
        c = [
            [sum(u * v for u, v in zip(differences[a], differences[b])) for b in range(k)]
            for a in range(k)
        ]
        trace = sum(c[a][a] for a in range(k))
        lam = gamma * trace if trace > 0 else 1.0
        lambdas.append(lam)
        a = [[c[r][s] + (lam if r == s else 0.0) for s in range(k)] for r in range(k)]
        u = solve_linear(a, [1.0] * k)
        denominator = sum(u)
        if denominator <= 0:
            raise ArithmeticError("nonpositive ridge normalization")
        for j, value in zip(neighbours, u):
            w[i][j] = value / denominator
    return w, lambdas


def lle_matrix(w: list[list[float]]) -> list[list[float]]:
    n = len(w)
    b = [[(1.0 if i == j else 0.0) - w[i][j] for j in range(n)] for i in range(n)]
    return [[sum(b[r][i] * b[r][j] for r in range(n)) for j in range(n)] for i in range(n)]


def jacobi_eigen(matrix: list[list[float]], tol: float = 1e-12) -> list[float]:
    """Return eigenvalues of a symmetric matrix, sorted ascending."""
    n = len(matrix)
    a = [row[:] for row in matrix]
    for _ in range(100 * n * n):
        p, q = max(((i, j) for i in range(n) for j in range(i + 1, n)),
                   key=lambda ij: abs(a[ij[0]][ij[1]]))
        if abs(a[p][q]) < tol:
            return sorted(a[i][i] for i in range(n))
        angle = 0.5 * math.atan2(2 * a[p][q], a[q][q] - a[p][p])
        c, s = math.cos(angle), math.sin(angle)
        app, aqq, apq = a[p][p], a[q][q], a[p][q]
        a[p][p] = c * c * app - 2 * c * s * apq + s * s * aqq
        a[q][q] = s * s * app + 2 * c * s * apq + c * c * aqq
        a[p][q] = a[q][p] = 0.0
        for r in range(n):
            if r == p or r == q:
                continue
            arp, arq = a[r][p], a[r][q]
            a[r][p] = a[p][r] = c * arp - s * arq
            a[r][q] = a[q][r] = s * arp + c * arq
    raise ArithmeticError("Jacobi iteration did not converge")


def report(case: str, gamma: float = 0.01) -> dict:
    if case == "signed":
        points = [[-1.0], [0.0], [1.0]]
        w = [[0.0, 2.0, -1.0], [0.5, 0.0, 0.5], [-1.0, 2.0, 0.0]]
        lambdas = None  # Unregularized exact reconstruction.
    elif case == "line":
        points = [[-1.0], [0.0], [1.0], [2.0], [3.0]]
        w, lambdas = ridge_weights(points, k=2, gamma=gamma)
    elif case == "coincident":
        points = [[0.0], [0.0], [0.0], [0.0]]
        w, lambdas = ridge_weights(points, k=2, gamma=gamma)
    else:
        raise ValueError("unknown case")
    m = lle_matrix(w)
    eigenvalues = jacobi_eigen(m)
    n = len(points)
    residual = [
        sum((points[i][h] - sum(w[i][j] * points[j][h] for j in range(n))) ** 2
            for h in range(len(points[0])))
        for i in range(n)
    ]
    return {
        "case": case,
        "points": points,
        "ridge_lambdas": lambdas,
        "weights": w,
        "row_sums": [sum(row) for row in w],
        "input_reconstruction_squared_residuals": residual,
        "M": m,
        "eigenvalues": eigenvalues,
        "numerical_zero_eigenvalue_count": sum(abs(value) <= 1e-8 for value in eigenvalues),
    }


def main() -> None:
    parser = argparse.ArgumentParser(description="Finite LLE reconstruction and spectrum")
    parser.add_argument("--case", choices=["line", "coincident", "signed"], default="line")
    parser.add_argument("--gamma", type=float, default=0.01)
    args = parser.parse_args()
    print(json.dumps(report(args.case, args.gamma), ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
