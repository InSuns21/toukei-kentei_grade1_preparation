#!/usr/bin/env python3
"""MFL8: Classical MDS in small dimensions using the Python standard library.

This Jacobi eigensolver is intended for hand-checkable teaching examples, not
large production matrices. An eigenvalue tolerance is a numerical convention,
not a proof that a dissimilarity is Euclidean.
"""

from __future__ import annotations

import argparse
import json
import math
from typing import Sequence


def examples() -> dict[str, list[list[float]]]:
    return {
        "triangle": [
            [0.0, 1.0, 1.0],
            [1.0, 0.0, math.sqrt(2.0)],
            [1.0, math.sqrt(2.0), 0.0],
        ],
        "non_euclidean": [
            [0.0, 1.0, 3.0],
            [1.0, 0.0, 1.0],
            [3.0, 1.0, 0.0],
        ],
        "line": [
            [0.0, 2.0, 5.0],
            [2.0, 0.0, 3.0],
            [5.0, 3.0, 0.0],
        ],
    }


def validate_distances(distance: Sequence[Sequence[float]]) -> list[list[float]]:
    n = len(distance)
    if n < 2 or n > 30 or any(len(row) != n for row in distance):
        raise ValueError("distance matrix must be square, with 2 <= n <= 30")
    result = [[float(x) for x in row] for row in distance]
    for i in range(n):
        if not math.isfinite(result[i][i]) or abs(result[i][i]) > 1e-10:
            raise ValueError("distance matrix must have zero diagonal")
        for j in range(n):
            d = result[i][j]
            if not math.isfinite(d) or d < 0:
                raise ValueError("distances must be finite and nonnegative")
            if abs(d - result[j][i]) > 1e-10:
                raise ValueError("distance matrix must be symmetric")
    return result


def double_center(distance: Sequence[Sequence[float]]) -> list[list[float]]:
    n = len(distance)
    squared = [[distance[i][j] ** 2 for j in range(n)] for i in range(n)]
    rows = [sum(row) / n for row in squared]
    mean = sum(rows) / n
    return [
        [-0.5 * (squared[i][j] - rows[i] - rows[j] + mean) for j in range(n)]
        for i in range(n)
    ]


def jacobi_eigensystem(
    matrix: Sequence[Sequence[float]],
) -> tuple[list[float], list[list[float]]]:
    """Return sorted eigenvalues and corresponding unit column vectors."""
    n = len(matrix)
    a = [list(row) for row in matrix]
    vectors = [[float(i == j) for j in range(n)] for i in range(n)]
    scale = max(1.0, max(abs(x) for row in a for x in row))
    for _ in range(100 * n * n):
        p, q = 0, 1
        largest = abs(a[p][q])
        for i in range(n):
            for j in range(i + 1, n):
                if abs(a[i][j]) > largest:
                    p, q, largest = i, j, abs(a[i][j])
        if largest <= 1e-14 * scale:
            break
        gap = (a[q][q] - a[p][p]) / (2.0 * a[p][q])
        t = (1.0 if gap >= 0 else -1.0) / (
            abs(gap) + math.sqrt(1.0 + gap * gap)
        )
        c = 1.0 / math.sqrt(1.0 + t * t)
        s = t * c
        cross = a[p][q]
        a[p][p] -= t * cross
        a[q][q] += t * cross
        a[p][q] = a[q][p] = 0.0
        for k in range(n):
            if k != p and k != q:
                akp, akq = a[k][p], a[k][q]
                a[k][p] = a[p][k] = c * akp - s * akq
                a[k][q] = a[q][k] = s * akp + c * akq
            vkp, vkq = vectors[k][p], vectors[k][q]
            vectors[k][p] = c * vkp - s * vkq
            vectors[k][q] = s * vkp + c * vkq
    else:
        raise ArithmeticError("Jacobi algorithm failed to converge")
    eigenpairs = [
        (a[j][j], [vectors[i][j] for i in range(n)])
        for j in range(n)
    ]
    eigenpairs.sort(key=lambda pair: pair[0], reverse=True)
    for _, vector in eigenpairs:
        pivot = max(range(n), key=lambda i: abs(vector[i]))
        if vector[pivot] < 0:
            for i in range(n):
                vector[i] *= -1
    return [pair[0] for pair in eigenpairs], [pair[1] for pair in eigenpairs]


def classical_mds(
    distance: Sequence[Sequence[float]], dim: int, tol: float = 1e-10
) -> dict:
    distance = validate_distances(distance)
    n = len(distance)
    if not 0 <= dim <= n - 1:
        raise ValueError("dim must lie between 0 and n-1")
    if not 0 < tol < 0.1 or not math.isfinite(tol):
        raise ValueError("tol must lie strictly between 0 and 0.1")
    gram = double_center(distance)
    eigenvalues, eigenvectors = jacobi_eigensystem(gram)
    cutoff = tol * max(1.0, max(abs(value) for value in eigenvalues))
    coordinates = [
        [
            math.sqrt(eigenvalues[k]) * eigenvectors[k][i]
            if eigenvalues[k] > cutoff else 0.0
            for k in range(dim)
        ]
        for i in range(n)
    ]
    reconstructed = [
        [
            math.sqrt(sum((coordinates[i][k] - coordinates[j][k]) ** 2
                          for k in range(dim)))
            for j in range(n)
        ]
        for i in range(n)
    ]
    gram_approx = [
        [
            sum(coordinates[i][k] * coordinates[j][k] for k in range(dim))
            for j in range(n)
        ]
        for i in range(n)
    ]
    return {
        "n": n,
        "dimension": dim,
        "tolerance": tol,
        "distances": distance,
        "squared_distances": [[x * x for x in row] for row in distance],
        "double_centered_gram": gram,
        "eigenvalues": eigenvalues,
        "negative_eigenvalues": [x for x in eigenvalues if x < -cutoff],
        "coordinates": coordinates,
        "reconstructed_distances": reconstructed,
        "gram_strain": sum(
            (gram[i][j] - gram_approx[i][j]) ** 2
            for i in range(n) for j in range(n)
        ),
        "distance_squared_error": sum(
            (distance[i][j] - reconstructed[i][j]) ** 2
            for i in range(n) for j in range(i + 1, n)
        ),
        "squared_distance_squared_error": sum(
            (distance[i][j] ** 2 - reconstructed[i][j] ** 2) ** 2
            for i in range(n) for j in range(i + 1, n)
        ),
        "numerically_euclidean": not any(x < -cutoff for x in eigenvalues),
    }


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--case", choices=examples(), default="triangle")
    parser.add_argument("--distances-json", help="JSON array of distance rows")
    parser.add_argument("--dim", type=int, default=2)
    parser.add_argument("--tol", type=float, default=1e-10)
    args = parser.parse_args()
    values = json.loads(args.distances_json) if args.distances_json else examples()[args.case]
    print(json.dumps(classical_mds(values, args.dim, args.tol), indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
