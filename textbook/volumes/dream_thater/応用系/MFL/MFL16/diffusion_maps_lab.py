#!/usr/bin/env python3
"""MFL16: finite reversible diffusion maps, using only the standard library.

The eigensolver is a Jacobi diagonalization of the real symmetric
similarity transform of P. This is a small didactic test, not a scalable solver.
"""

import argparse
import math


def weights(mode, n, epsilon):
    if mode == "zero":
        return [[1.0 for _ in range(n)] for _ in range(n)]

    matrix = []
    for i in range(n):
        row = []
        for j in range(n):
            theta = 2.0 * math.pi * (i - j) / n
            chord2 = 2.0 - 2.0 * math.cos(theta)
            value = math.exp(-chord2 / (4.0 * epsilon))
            if mode == "disconnected" and (i < n // 2) != (j < n // 2):
                value = 0.0
            row.append(value)
        matrix.append(row)
    return matrix


def jacobi_symmetric(matrix, tol=1e-13):
    """Orthogonal eigendecomposition via largest-off-diagonal Jacobi rotations."""
    n = len(matrix)
    a = [row[:] for row in matrix]
    vectors = [[float(i == j) for j in range(n)] for i in range(n)]
    for _ in range(max(1, 100 * n * n)):
        p, q = 0, 0
        largest = 0.0
        for i in range(n):
            for j in range(i + 1, n):
                if abs(a[i][j]) > largest:
                    largest = abs(a[i][j])
                    p, q = i, j
        if largest < tol:
            break
        tau = (a[q][q] - a[p][p]) / (2.0 * a[p][q])
        t = (1.0 if tau >= 0.0 else -1.0) / (
            abs(tau) + math.sqrt(1.0 + tau * tau)
        )
        c = 1.0 / math.sqrt(1.0 + t * t)
        s = t * c
        old = a[p][q]
        app, aqq = a[p][p], a[q][q]
        a[p][p] = app - t * old
        a[q][q] = aqq + t * old
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
        raise ArithmeticError("Jacobi diagonalization did not converge")
    order = sorted(range(n), key=lambda index: a[index][index], reverse=True)
    return [a[i][i] for i in order], [
        [vectors[row][i] for row in range(n)] for i in order
    ]


def matmul(x, y):
    n = len(x)
    return [
        [sum(x[i][k] * y[k][j] for k in range(n)) for j in range(n)]
        for i in range(n)
    ]


def matrix_power(matrix, t):
    n = len(matrix)
    result = [[float(i == j) for j in range(n)] for i in range(n)]
    base = matrix
    while t:
        if t % 2:
            result = matmul(result, base)
        t //= 2
        if t:
            base = matmul(base, base)
    return result


def experiment(mode, n, epsilon, time):
    if n < 2 or n > 48 or epsilon <= 0 or time < 0:
        raise ValueError("require 2 <= n <= 48, epsilon > 0, time >= 0")
    if mode == "disconnected" and n < 4:
        raise ValueError("disconnected mode requires n >= 4")
    w = weights(mode, n, epsilon)
    d = [sum(row) for row in w]
    total = sum(d)
    pi = [value / total for value in d]
    p = [[w[i][j] / d[i] for j in range(n)] for i in range(n)]
    symmetric = [
        [w[i][j] / math.sqrt(d[i] * d[j]) for j in range(n)]
        for i in range(n)
    ]
    eigenvalues, u = jacobi_symmetric(symmetric)
    psi = [[u[ell][i] / math.sqrt(pi[i]) for i in range(n)] for ell in range(n)]
    pt = matrix_power(p, time)
    worst_error = 0.0
    for i in range(n):
        for j in range(i + 1, n):
            direct = sum((pt[i][k] - pt[j][k]) ** 2 / pi[k] for k in range(n))
            spectral = sum(
                eigenvalues[ell] ** (2 * time) * (psi[ell][i] - psi[ell][j]) ** 2
                for ell in range(n)
            )
            worst_error = max(worst_error, abs(direct - spectral))

    stationary_error = max(
        abs(sum(pi[i] * p[i][j] for i in range(n)) - pi[j])
        for j in range(n)
    )
    row_error = max(abs(sum(row) - 1.0) for row in p)
    far = n // 2
    direct_far = sum((pt[0][k] - pt[far][k]) ** 2 / pi[k] for k in range(n))
    return {
        "mode": mode,
        "n": n,
        "epsilon": epsilon,
        "time": time,
        "lambda_top": eigenvalues[: min(n, 6)],
        "unit_eigenvalue_count": sum(abs(value - 1.0) < 1e-9 for value in eigenvalues),
        "zero_eigenvalue_count": sum(abs(value) < 1e-9 for value in eigenvalues),
        "far_distance": math.sqrt(max(0.0, direct_far)),
        "max_squared_distance_error": worst_error,
        "stationary_error": stationary_error,
        "row_sum_error": row_error,
    }


def self_test():
    tests = [
        ("circle", 8, 0.04, 0),
        ("circle", 12, 0.15, 2),
        ("circle", 20, 0.5, 7),
        ("disconnected", 10, 0.2, 5),
        ("zero", 6, 0.1, 1),
    ]
    for args in tests:
        result = experiment(*args)
        assert result["row_sum_error"] < 1e-12, result
        assert result["stationary_error"] < 1e-12, result
        assert result["max_squared_distance_error"] < 1e-8, result
        if args[0] == "disconnected":
            assert result["unit_eigenvalue_count"] == 2, result
        if args[0] == "zero":
            assert result["zero_eigenvalue_count"] == args[1] - 1, result
            assert result["far_distance"] < 1e-10, result
    print("self-test: 5 cases passed (row/stationarity/distance/special spectra)")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--mode", choices=["circle", "disconnected", "zero"], default="circle")
    parser.add_argument("--n", type=int, default=12)
    parser.add_argument("--epsilon", type=float, default=0.15)
    parser.add_argument("--time", type=int, default=3)
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        self_test()
        return
    result = experiment(args.mode, args.n, args.epsilon, args.time)
    print("mode={mode} n={n} epsilon={epsilon:g} time={time}".format(**result))
    print("largest eigenvalues:", ", ".join(f"{v:.7g}" for v in result["lambda_top"]))
    print("unit eigenvalues:", result["unit_eigenvalue_count"])
    print("zero eigenvalues:", result["zero_eigenvalue_count"])
    print("opposite-index diffusion distance:", f"{result['far_distance']:.9g}")
    print("maximum direct/spectral squared-distance error:",
          f"{result['max_squared_distance_error']:.3e}")
    print("stationarity / row-sum errors:",
          f"{result['stationary_error']:.3e}", f"{result['row_sum_error']:.3e}")


if __name__ == "__main__":
    main()
