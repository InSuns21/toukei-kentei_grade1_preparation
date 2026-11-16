"""U2-04: exact Kalman prediction, 1D and 2D (Python 3.10+, stdlib only).

All values are fixed rational numbers. The model assumption is that W is
independent of the previous state and past observations, not that W's
coordinates are mutually independent. This script does not sample noise.
"""
from __future__ import annotations

import argparse
from fractions import Fraction as R

Vector = tuple[R, ...]
Matrix = tuple[tuple[R, ...], ...]


def shape(a: Matrix) -> tuple[int, int]:
    if not a or not a[0] or any(len(row) != len(a[0]) for row in a):
        raise ValueError("a matrix must be nonempty and rectangular")
    return len(a), len(a[0])


def transpose(a: Matrix) -> Matrix:
    rows, cols = shape(a)
    return tuple(tuple(a[i][j] for i in range(rows)) for j in range(cols))


def multiply(a: Matrix, b: Matrix) -> Matrix:
    rows, inner = shape(a)
    brow, cols = shape(b)
    if inner != brow:
        raise ValueError("incompatible matrix shapes")
    return tuple(tuple(sum(a[i][k] * b[k][j] for k in range(inner))
                       for j in range(cols)) for i in range(rows))


def matvec(a: Matrix, v: Vector) -> Vector:
    rows, cols = shape(a)
    if cols != len(v):
        raise ValueError("incompatible matrix and vector shapes")
    return tuple(sum(a[i][j] * v[j] for j in range(cols)) for i in range(rows))


def add(a: Matrix, b: Matrix) -> Matrix:
    if shape(a) != shape(b):
        raise ValueError("incompatible matrix shapes")
    return tuple(tuple(a[i][j] + b[i][j] for j in range(len(a[0])))
                 for i in range(len(a)))


def determinant(a: Matrix) -> R:
    rows, cols = shape(a)
    if rows != cols:
        raise ValueError("determinant requires a square matrix")
    if rows == 1:
        return a[0][0]
    if rows == 2:
        return a[0][0] * a[1][1] - a[0][1] * a[1][0]
    raise ValueError("laboratory supports dimensions 1 or 2")


def symmetric_positive(a: Matrix, *, strict: bool) -> bool:
    n, m = shape(a)
    if n != m or n not in (1, 2) or a != transpose(a):
        return False
    if n == 1:
        return a[0][0] > 0 if strict else a[0][0] >= 0
    if strict:
        return a[0][0] > 0 and determinant(a) > 0
    return a[0][0] >= 0 and a[1][1] >= 0 and determinant(a) >= 0


def predict(mean: Vector, covariance: Matrix, transition: Matrix,
            control: Matrix, input_value: Vector, process_noise: Matrix,
            offset: Vector | None = None) -> tuple[Vector, Matrix]:
    """Given X_previous | D ~ N(mean, covariance), return (m^-, P^-).

    transition: n x n; control: n x k; input_value: k;
    process_noise: n x n symmetric positive semidefinite, independent of X.
    """
    n, k = shape(control)
    if n not in (1, 2) or k < 1 or len(mean) != n or len(input_value) != k:
        raise ValueError("input shapes do not match")
    if shape(transition) != (n, n) or shape(covariance) != (n, n) or \
       shape(process_noise) != (n, n):
        raise ValueError("state matrix shapes do not match")
    if not symmetric_positive(covariance, strict=True):
        raise ValueError("prior covariance must be symmetric positive definite")
    if not symmetric_positive(process_noise, strict=False):
        raise ValueError("process covariance must be symmetric positive semidefinite")
    if offset is None:
        offset = tuple(R(0) for _ in range(n))
    if len(offset) != n:
        raise ValueError("offset dimension does not match")
    moved = matvec(transition, mean)
    shifted = matvec(control, input_value)
    predicted_mean = tuple(moved[i] + shifted[i] + offset[i] for i in range(n))
    transformed = multiply(multiply(transition, covariance), transpose(transition))
    predicted_covariance = add(transformed, process_noise)
    return predicted_mean, predicted_covariance


def scenario(name: str) -> tuple[Vector, Matrix]:
    if name == "scalar":
        # t=0: m+=2 m, P+=4 m^2; u1=3 m, Q1=1 m^2.
        m1, p1 = predict((R(2),), ((R(4),),), ((R(1),),),
                         ((R(1),),), (R(3),), ((R(1),),))
        # no observation at t=1, so m1+=m1- and P1+=P1-.
        return predict(m1, p1, ((R(1),),), ((R(1),),),
                       (R(-1),), ((R(2),),))
    if name == "kinematic":
        # state=(position [m], velocity [m/s]); dt=1 s;
        # u=2 m/s^2; acceleration noise variance=4 (m/s^2)^2.
        return predict(
            (R(0), R(1)), ((R(4), R(0)), (R(0), R(1))),
            ((R(1), R(1)), (R(0), R(1))),
            ((R(1, 2),), (R(1),)), (R(2),),
            ((R(1), R(2)), (R(2), R(4)))
        )
    if name == "singular":
        # F=0 and Q=0 collapses a positive-definite Gaussian to a point.
        return predict((R(2),), ((R(4),),), ((R(0),),),
                       ((R(1),),), (R(1),), ((R(0),),))
    raise ValueError("unknown scenario")


def main() -> None:
    parser = argparse.ArgumentParser(description="U2-04 exact Gaussian prediction")
    parser.add_argument("--scenario", choices=("scalar", "kinematic", "singular"),
                        default="kinematic")
    args = parser.parse_args()
    mean, covariance = scenario(args.scenario)
    print("U2-04; no sampling; known controls; W independent of prior state")
    print("scalar: distance m, variance m^2; kinematic: dt=1 s")
    print(f"scenario={args.scenario}")
    print(f"predicted_mean={mean}")
    print(f"predicted_covariance={covariance}")
    print(f"covariance_determinant={determinant(covariance)}")
    print(f"covariance_positive_definite={symmetric_positive(covariance, strict=True)}")
    print(f"covariance_positive_semidefinite={symmetric_positive(covariance, strict=False)}")


if __name__ == "__main__":
    main()
