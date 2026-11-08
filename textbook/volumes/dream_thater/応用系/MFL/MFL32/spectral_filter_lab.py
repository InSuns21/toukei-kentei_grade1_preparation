"""MFL32: deterministic, standard-library graph spectral-filter checks.

Graph vertices are 0-based. No randomness or external eigen-solver is needed:
the three P3 eigendirections are given explicitly and checked by multiplication.
"""

from __future__ import annotations

from math import sqrt

Vector = tuple[float, ...]
Matrix = tuple[Vector, ...]


def laplacian(n: int, edges: tuple[tuple[int, int, float], ...]) -> Matrix:
    l = [[0.0] * n for _ in range(n)]
    for i, j, w in edges:
        assert 0 <= i < n and 0 <= j < n and i != j and w >= 0
        l[i][i] += w
        l[j][j] += w
        l[i][j] -= w
        l[j][i] -= w
    return tuple(tuple(row) for row in l)


def dot(x: Vector, y: Vector) -> float:
    return sum(a * b for a, b in zip(x, y, strict=True))


def matvec(a: Matrix, x: Vector) -> Vector:
    return tuple(dot(row, x) for row in a)


def add(x: Vector, y: Vector, coefficient: float = 1.0) -> Vector:
    return tuple(a + coefficient * b for a, b in zip(x, y, strict=True))


def scale(c: float, x: Vector) -> Vector:
    return tuple(c * a for a in x)


def close(x: Vector, y: Vector, tolerance: float = 1e-10) -> bool:
    return max(abs(a - b) for a, b in zip(x, y, strict=True)) < tolerance


def polynomial(l: Matrix, x: Vector, coefficients: tuple[float, ...]) -> Vector:
    """Sum of a_k L^k x, evaluated without materializing L^k."""
    value = (0.0,) * len(x)
    power = x
    for a in coefficients:
        value = add(value, power, a)
        power = matvec(l, power)
    return value


def spectral(
    x: Vector, eigenpairs: tuple[tuple[float, Vector], ...], g
) -> Vector:
    """Orthogonal spectral expansion with an explicit checked eigenbasis."""
    result = (0.0,) * len(x)
    for value, unit in eigenpairs:
        result = add(result, unit, g(value) * dot(unit, x))
    return result


def chebyshev(
    l: Matrix, x: Vector, bound: float, coefficients: tuple[float, ...]
) -> tuple[Vector, tuple[Vector, ...]]:
    assert bound > 0 and coefficients

    def scaled(v: Vector) -> Vector:
        return add(scale(2.0 / bound, matvec(l, v)), v, -1.0)

    values = [x]
    if len(coefficients) > 1:
        values.append(scaled(x))
    for _ in range(2, len(coefficients)):
        values.append(add(scale(2.0, scaled(values[-1])), values[-2], -1.0))
    result = (0.0,) * len(x)
    for c, v in zip(coefficients, values, strict=True):
        result = add(result, v, c)
    return result, tuple(values)


def reorder(l: Matrix, x: Vector, permutation: tuple[int, ...]):
    """permutation[old]=new, so L'=P L P^T and x'=P x."""
    n = len(x)
    assert sorted(permutation) == list(range(n))
    updated = [[0.0] * n for _ in range(n)]
    signal = [0.0] * n
    for old_i, new_i in enumerate(permutation):
        signal[new_i] = x[old_i]
        for old_j, new_j in enumerate(permutation):
            updated[new_i][new_j] = l[old_i][old_j]
    return tuple(tuple(row) for row in updated), tuple(signal)


def main() -> None:
    l = laplacian(3, ((0, 1, 1.0), (1, 2, 1.0)))
    x = (1.0, 0.0, 0.0)
    eigenpairs = (
        (0.0, scale(1.0 / sqrt(3.0), (1.0, 1.0, 1.0))),
        (1.0, scale(1.0 / sqrt(2.0), (1.0, 0.0, -1.0))),
        (3.0, scale(1.0 / sqrt(6.0), (1.0, -2.0, 1.0))),
    )
    # Independently verify eigen-equations and orthonormality.
    for i, (value, direction) in enumerate(eigenpairs):
        assert close(matvec(l, direction), scale(value, direction))
        for j, (_, other) in enumerate(eigenpairs):
            assert abs(dot(direction, other) - (1.0 if i == j else 0.0)) < 1e-10

    direct = polynomial(l, x, (1.0, -1.0 / 3.0))
    eig = spectral(x, eigenpairs, lambda value: 1.0 - value / 3.0)
    cheb, terms = chebyshev(l, x, 3.0, (0.5, -0.5))
    assert close(direct, (2.0 / 3.0, 1.0 / 3.0, 0.0))
    assert close(eig, direct) and close(cheb, direct)
    assert close(terms[1], (-1.0 / 3.0, -2.0 / 3.0, 0.0))

    _, longer_terms = chebyshev(l, x, 3.0, (0.0, 0.0, 1.0))
    assert close(longer_terms[2], (1.0 / 9.0, 0.0, 8.0 / 9.0))
    second = polynomial(l, x, (1.0, -2.0 / 3.0, 1.0 / 9.0))
    assert close(second, (5.0 / 9.0, 1.0 / 3.0, 1.0 / 9.0))
    assert direct[2] == 0.0 and second[2] > 0.0

    permutation = (2, 0, 1)
    relabeled_l, relabeled_x = reorder(l, x, permutation)
    relabeled_output = polynomial(relabeled_l, relabeled_x, (1.0, -1.0 / 3.0))
    expected = tuple(direct[permutation.index(i)] for i in range(3))
    assert close(relabeled_output, expected)

    # C4 has a repeated eigenvalue 2. Different weights within that eigenspace
    # depend on which orthonormal basis the eigen-solver happened to return.
    cycle = laplacian(4, ((0, 1, 1.0), (1, 2, 1.0),
                          (2, 3, 1.0), (3, 0, 1.0)))
    u = scale(1.0 / sqrt(2.0), (1.0, 0.0, -1.0, 0.0))
    v = scale(1.0 / sqrt(2.0), (0.0, 1.0, 0.0, -1.0))
    assert close(matvec(cycle, u), scale(2.0, u))
    assert close(matvec(cycle, v), scale(2.0, v))
    rotated_u = scale(1.0 / sqrt(2.0), add(u, v))
    rotated_v = scale(1.0 / sqrt(2.0), add(v, u, -1.0))

    def weighted_modes(input_signal: Vector, a: Vector, b: Vector) -> Vector:
        return add(scale(dot(a, input_signal), a),
                   b, 2.0 * dot(b, input_signal))

    original = weighted_modes(u, u, v)
    rotated = weighted_modes(u, rotated_u, rotated_v)
    assert close(original, u)
    assert close(rotated, add(scale(1.5, u), v, -0.5))
    assert not close(original, rotated)
    assert close(polynomial(cycle, u, (1.0, 1.0)), scale(3.0, u))

    print("P3 eigenvalues: 0, 1, 3; eigenvectors orthonormal: passed")
    print("p(L)e1 = spectral = Chebyshev degree 1:", tuple(round(z, 6) for z in direct))
    print("degree 2 (I-L/3)^2 e1:", tuple(round(z, 6) for z in second))
    print("Chebyshev T2(A)e1:", tuple(round(z, 6) for z in longer_terms[2]))
    print("permutation equivariance: passed; C4 repeated-eigenvalue basis failure: passed")


if __name__ == "__main__":
    main()
