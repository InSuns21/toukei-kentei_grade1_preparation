"""U2-03: exact 1D/2D linear Gaussian position update (Python 3.10+)."""

from __future__ import annotations

import argparse
from fractions import Fraction as F

Matrix = tuple[tuple[F, ...], ...]
Vector = tuple[F, ...]


def transpose(a: Matrix) -> Matrix:
    return tuple(tuple(a[i][j] for i in range(len(a))) for j in range(len(a[0])))


def product(a: Matrix, b: Matrix) -> Matrix:
    if not a or not b or len(a[0]) != len(b):
        raise ValueError("incompatible matrix dimensions")
    return tuple(
        tuple(sum(a[i][k] * b[k][j] for k in range(len(b))) for j in range(len(b[0])))
        for i in range(len(a))
    )


def plus(a: Matrix, b: Matrix) -> Matrix:
    if len(a) != len(b) or any(len(x) != len(y) for x, y in zip(a, b)):
        raise ValueError("incompatible matrix dimensions")
    return tuple(tuple(x + y for x, y in zip(row_a, row_b)) for row_a, row_b in zip(a, b))


def determinant(a: Matrix) -> F:
    if len(a) == 1 and len(a[0]) == 1:
        return a[0][0]
    if len(a) == 2 and all(len(row) == 2 for row in a):
        return a[0][0] * a[1][1] - a[0][1] * a[1][0]
    raise ValueError("exact example supports 1x1 and 2x2 matrices")


def positive_definite(a: Matrix) -> bool:
    if len(a) not in (1, 2) or any(len(row) != len(a) for row in a):
        return False
    if a != transpose(a):
        return False
    return a[0][0] > 0 and determinant(a) > 0


def inverse(a: Matrix) -> Matrix:
    d = determinant(a)
    if d == 0:
        raise ValueError("singular matrix")
    if len(a) == 1:
        return ((1 / d,),)
    return ((a[1][1] / d, -a[0][1] / d), (-a[1][0] / d, a[0][0] / d))


def column(v: Vector) -> Matrix:
    return tuple((x,) for x in v)


def vector(a: Matrix) -> Vector:
    if any(len(row) != 1 for row in a):
        raise ValueError("expected a column vector")
    return tuple(row[0] for row in a)


def update(
    mean: Vector, covariance: Matrix, sensor: Matrix, noise: Matrix, observed: Vector
) -> tuple[Vector, Matrix, Matrix]:
    """Return posterior mean, posterior covariance, and precision exactly."""
    n, m = len(mean), len(observed)
    if n not in (1, 2) or m not in (1, 2):
        raise ValueError("this laboratory supports dimensions 1 and 2")
    if len(covariance) != n or len(noise) != m:
        raise ValueError("covariance dimensions do not match")
    if len(sensor) != m or any(len(row) != n for row in sensor):
        raise ValueError("sensor must have m rows and n columns")
    if not positive_definite(covariance) or not positive_definite(noise):
        raise ValueError("prior and noise covariance must be symmetric positive definite")
    prior_precision = inverse(covariance)
    noise_precision = inverse(noise)
    sensor_t = transpose(sensor)
    weighted_sensor = product(sensor_t, noise_precision)
    precision = plus(prior_precision, product(weighted_sensor, sensor))
    information = plus(
        product(prior_precision, column(mean)),
        product(weighted_sensor, column(observed)),
    )
    posterior_covariance = inverse(precision)
    posterior_mean = vector(product(posterior_covariance, information))
    return posterior_mean, posterior_covariance, precision


def scenario(name: str) -> tuple[Vector, Matrix, Matrix, Matrix, Vector]:
    if name == "scalar":
        return (F(2),), ((F(4),),), ((F(1),),), ((F(1),),), (F(5),)
    if name == "plane":
        return (
            (F(0), F(0)), ((F(4), F(0)), (F(0), F(1))),
            ((F(1), F(1)),), ((F(1),),), (F(3),),
        )
    if name == "blind":
        return (F(-1),), ((F(2),),), ((F(0),),), ((F(1),),), (F(7),)
    raise ValueError("unknown scenario")


def main() -> None:
    parser = argparse.ArgumentParser(description="U2-03 exact Gaussian position update")
    parser.add_argument("--scenario", choices=("scalar", "plane", "blind"), default="scalar")
    args = parser.parse_args()
    mean, covariance, sensor, noise, observed = scenario(args.scenario)
    posterior_mean, posterior_covariance, precision = update(
        mean, covariance, sensor, noise, observed
    )
    print("one measurement; distance=m; covariance=m^2; no stochastic sampling")
    print(f"prior_mean={mean}; prior_covariance={covariance}")
    print(f"sensor_H={sensor}; noise_covariance={noise}; observation={observed}")
    print(f"precision={precision}; posterior_mean={posterior_mean}")
    print(f"posterior_covariance={posterior_covariance}")
    print(f"posterior_covariance_positive_definite={positive_definite(posterior_covariance)}")


if __name__ == "__main__":
    main()
