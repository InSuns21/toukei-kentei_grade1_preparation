"""U2-05: exact rational Kalman measurement update (Python 3.10+, stdlib).

This is a deterministic verification lab, not a sensor simulation. State and
observation are finite-dimensional Gaussian; prior covariance and observation
noise covariance are strictly positive definite; observation noise is
independent of the predicted state and previous data. All inputs use Fraction.
The matrix routines deliberately support only 1D and 2D, so a reader can
check the products and inverses by hand.
"""
from __future__ import annotations

import argparse
from fractions import Fraction as F

Vector = tuple[F, ...]
Matrix = tuple[tuple[F, ...], ...]


def shape(a: Matrix) -> tuple[int, int]:
    if not a or not a[0] or any(len(row) != len(a[0]) for row in a):
        raise ValueError("matrix must be nonempty and rectangular")
    return len(a), len(a[0])


def transpose(a: Matrix) -> Matrix:
    n, m = shape(a)
    return tuple(tuple(a[i][j] for i in range(n)) for j in range(m))


def matmul(a: Matrix, b: Matrix) -> Matrix:
    n, k = shape(a)
    p, m = shape(b)
    if k != p:
        raise ValueError("matrix dimensions do not match")
    return tuple(tuple(sum((a[i][j] * b[j][h] for j in range(k)), F(0))
                       for h in range(m)) for i in range(n))


def matvec(a: Matrix, v: Vector) -> Vector:
    n, m = shape(a)
    if m != len(v):
        raise ValueError("matrix/vector dimensions do not match")
    return tuple(sum((a[i][j] * v[j] for j in range(m)), F(0))
                 for i in range(n))


def add(a: Matrix, b: Matrix) -> Matrix:
    if shape(a) != shape(b):
        raise ValueError("matrix dimensions do not match")
    n, m = shape(a)
    return tuple(tuple(a[i][j] + b[i][j] for j in range(m))
                 for i in range(n))


def neg(a: Matrix) -> Matrix:
    return tuple(tuple(-x for x in row) for row in a)


def sub(a: Matrix, b: Matrix) -> Matrix:
    return add(a, neg(b))


def eye(n: int) -> Matrix:
    return tuple(tuple(F(int(i == j)) for j in range(n)) for i in range(n))


def det(a: Matrix) -> F:
    n, m = shape(a)
    if n != m or n not in (1, 2):
        raise ValueError("determinant supports square matrices of size 1 or 2")
    if n == 1:
        return a[0][0]
    return a[0][0] * a[1][1] - a[0][1] * a[1][0]


def positive_definite(a: Matrix) -> bool:
    n, m = shape(a)
    return n == m and n in (1, 2) and a == transpose(a) and (
        a[0][0] > 0 if n == 1 else a[0][0] > 0 and det(a) > 0
    )


def positive_semidefinite(a: Matrix) -> bool:
    n, m = shape(a)
    return n == m and n in (1, 2) and a == transpose(a) and (
        a[0][0] >= 0 if n == 1 else
        a[0][0] >= 0 and a[1][1] >= 0 and det(a) >= 0
    )


def inverse(a: Matrix) -> Matrix:
    n, m = shape(a)
    if n != m or n not in (1, 2):
        raise ValueError("inverse supports square matrices of size 1 or 2")
    d = det(a)
    if not d:
        raise ValueError("singular matrix")
    if n == 1:
        return ((1 / a[0][0],),)
    return ((a[1][1] / d, -a[0][1] / d),
            (-a[1][0] / d, a[0][0] / d))


def update(mean: Vector, prior: Matrix, observation: Matrix,
           noise: Matrix, measured: Vector) -> dict[str, Vector | Matrix]:
    """Compute innovation, gain and posterior, comparing three exact formulas.

    Prior X|D_previous ~ N(mean,prior), Z=observation*X+E,
    E~N(0,noise) independent of (X,D_previous), Z=measured.
    """
    n = len(mean)
    p = len(measured)
    if not (1 <= n <= 2 and 1 <= p <= 2):
        raise ValueError("lab supports at most two state/observation components")
    if shape(prior) != (n, n) or shape(observation) != (p, n) or \
       shape(noise) != (p, p):
        raise ValueError("state/observation dimensions do not match")
    if not positive_definite(prior) or not positive_definite(noise):
        raise ValueError("prior and observation covariance must be positive definite")

    h_t = transpose(observation)
    hmean = matvec(observation, mean)
    innovation = tuple(measured[j] - hmean[j] for j in range(p))
    s = add(matmul(matmul(observation, prior), h_t), noise)
    assert positive_definite(s)
    k = matmul(matmul(prior, h_t), inverse(s))
    correction = matvec(k, innovation)
    post_mean = tuple(mean[j] + correction[j] for j in range(n))
    standard = sub(prior, matmul(matmul(k, observation), prior))

    a = sub(eye(n), matmul(k, observation))
    joseph = add(matmul(matmul(a, prior), transpose(a)),
                 matmul(matmul(k, noise), transpose(k)))
    precision = add(inverse(prior),
                    matmul(matmul(h_t, inverse(noise)), observation))
    information_covariance = inverse(precision)

    # Exact rational comparisons test both the algorithm and the identities.
    assert standard == joseph == information_covariance
    assert standard == transpose(standard)
    assert positive_definite(standard)
    contraction = sub(prior, standard)
    assert contraction == matmul(matmul(k, s), transpose(k))
    assert positive_semidefinite(contraction)
    return {"innovation": innovation, "S": s, "K": k, "mean": post_mean,
            "covariance": standard, "joseph": joseph,
            "information_covariance": information_covariance,
            "contraction": contraction}


def scalar(prior_variance: F = F(4), noise_variance: F = F(1),
           measured: F = F(5)) -> dict[str, Vector | Matrix]:
    return update((F(2),), ((prior_variance,),), ((F(1),),),
                  ((noise_variance,),), (measured,))


def plane() -> dict[str, Vector | Matrix]:
    # Prior independent X1, X2; observe Z = X1 + X2 + E.
    return update((F(0), F(0)),
                  ((F(4), F(0)), (F(0), F(1))),
                  ((F(1), F(1)),),
                  ((F(1),),), (F(3),))


def self_test() -> None:
    """Ten independent checks (no external test runner required in Pyodide)."""
    a = scalar()
    assert a["innovation"] == (F(3),)
    assert a["S"] == ((F(5),),)
    assert a["K"] == ((F(4, 5),),)
    assert a["mean"] == (F(22, 5),)
    assert a["covariance"] == ((F(4, 5),),)
    b = plane()
    assert b["S"] == ((F(6),),)
    assert b["K"] == ((F(2, 3),), (F(1, 6),))
    assert b["mean"] == (F(2), F(1, 2))
    assert b["covariance"] == ((F(4, 3), F(-2, 3)),
                                (F(-2, 3), F(5, 6)))
    assert scalar(noise_variance=F(1000))["K"][0][0] == F(4, 1004)
    for args in (
        ((F(0),), ((F(0),),), ((F(1),),), ((F(1),),), (F(0),)),
        ((F(0),), ((F(4),),), ((F(1),),), ((F(0),),), (F(0),)),
        ((F(0), F(0)), ((F(1), F(0)), (F(0), F(1))),
         ((F(1),),), ((F(1),),), (F(0),)),
    ):
        try:
            update(*args)
        except ValueError:
            pass
        else:
            raise AssertionError("expected invalid input to be rejected")
    print("U2-05: 10 exact scenario assertions + 3 invalid-input checks passed")


def main() -> None:
    parser = argparse.ArgumentParser(description="U2-05 exact rational Kalman update")
    parser.add_argument("--scenario", choices=("scalar", "plane", "noise"),
                        default="plane")
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        self_test()
        return
    print("U2-05: exact Fraction arithmetic, no random sampling")
    print("Assumptions: P>0, R>0; independent Gaussian observation noise")
    if args.scenario == "noise":
        for r in (F(1, 10), F(1), F(10), F(100)):
            item = scalar(noise_variance=r)
            print(f"R={r}  S={item['S']}  K={item['K']}  "
                  f"updated_mean={item['mean']}  updated_covariance={item['covariance']}")
        return
    result = scalar() if args.scenario == "scalar" else plane()
    print(f"scenario={args.scenario}")
    for key, value in result.items():
        print(f"{key}={value}")
    print("exact equality: standard = Joseph = information-form covariance")
    print("The covariance does not depend on the measured z in this model.")


if __name__ == "__main__":
    main()
