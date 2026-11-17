"""U3-67: two-asset temporary cross-impact and liquidity-adjusted risk.

Synthetic model only. No market data, brokerage API or trading execution.
All amounts are in yen; horizon is two one-hour intervals.
"""
from __future__ import annotations

import argparse
import math
from statistics import NormalDist


BASE_A = ((2.0, 0.5), (0.5, 1.0))
BASE_SIGMA = ((4.0, 1.0), (1.0, 9.0))
INITIAL = (10.0, 10.0)
EQUAL_RESIDUAL = (5.0, 5.0)


def determinant(matrix):
    return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]


def symmetric(matrix, tolerance=1e-12):
    return abs(matrix[0][1] - matrix[1][0]) <= tolerance


def positive_definite(matrix):
    return symmetric(matrix) and matrix[0][0] > 0 and determinant(matrix) > 0


def positive_semidefinite(matrix):
    if not symmetric(matrix):
        return False
    return (
        matrix[0][0] >= 0
        and matrix[1][1] >= 0
        and determinant(matrix) >= -1e-12
    )


def scale(matrix, factor):
    return tuple(tuple(factor * value for value in row) for row in matrix)


def add(matrix, other):
    return tuple(
        tuple(matrix[i][j] + other[i][j] for j in range(2))
        for i in range(2)
    )


def matvec(matrix, vector):
    return tuple(sum(matrix[i][j] * vector[j] for j in range(2)) for i in range(2))


def dot(left, right):
    return sum(a * b for a, b in zip(left, right))


def quadratic(vector, matrix):
    return dot(vector, matvec(matrix, vector))


def solve_2x2(matrix, rhs):
    d = determinant(matrix)
    if abs(d) <= 1e-14:
        raise ValueError("singular matrix; cannot use free stationary point")
    return (
        (matrix[1][1] * rhs[0] - matrix[0][1] * rhs[1]) / d,
        (-matrix[1][0] * rhs[0] + matrix[0][0] * rhs[1]) / d,
    )


def optimize(initial, impact, covariance, lambda_risk):
    """Unconstrained solution; only valid if the box constraint holds."""
    hessian_half = add(impact, scale(covariance, lambda_risk))
    free = solve_2x2(hessian_half, matvec(impact, initial))
    residual = tuple(0.5 * x for x in free)
    feasible = all(-1e-12 <= residual[i] <= initial[i] + 1e-12 for i in range(2))
    if not feasible:
        raise ValueError(
            "free solution is outside [0, initial]; solve the constrained quadratic program"
        )
    return residual


def evaluate(initial, residual, impact, covariance, lambda_risk):
    first = tuple(initial[i] - residual[i] for i in range(2))
    if not all(0 <= residual[i] <= initial[i] for i in range(2)):
        raise ValueError("out-of-box residual")
    cost = 0.5 * (quadratic(first, impact) + quadratic(residual, impact))
    variance = quadratic(residual, covariance)  # Delta = one hour
    if variance < -1e-10:
        raise ValueError("negative loss variance")
    return cost, variance, cost + lambda_risk * variance


def normal_var_es(mean, variance, alpha=0.95):
    if not (0 < alpha < 1):
        raise ValueError("alpha must be between zero and one")
    sigma = math.sqrt(variance)
    normal = NormalDist()
    z = normal.inv_cdf(alpha)
    phi_z = math.exp(-0.5 * z * z) / math.sqrt(2 * math.pi)
    return mean + sigma * z, mean + sigma * phi_z / (1 - alpha)


def permanent_loop_cost(matrix, a=1.0, b=1.0):
    """Rectangular cycle of signed buys/sells in a frictionless permanent model."""
    return (matrix[1][0] - matrix[0][1]) * a * b


def tests():
    assert positive_definite(BASE_A)
    assert positive_definite(BASE_SIGMA)
    assert not positive_definite(((1.0, 2.0), (2.0, 1.0)))
    assert positive_semidefinite(((1.0, 1.0), (1.0, 1.0)))
    assert not positive_definite(((1.0, 1.0), (1.0, 1.0)))
    assert not positive_semidefinite(((1.0, 2.0), (2.0, 1.0)))
    assert not positive_semidefinite(((1.0, 2.0), (0.0, 1.0)))
    residual = optimize(INITIAL, BASE_A, BASE_SIGMA, 0.05)
    assert abs(residual[0] - 4.848484848484849) < 1e-10
    assert abs(residual[1] - 10.0 / 3) < 1e-10
    cost, variance, objective = evaluate(INITIAL, residual, BASE_A, BASE_SIGMA, 0.05)
    assert abs(cost - 103.07621671258033) < 1e-9
    assert abs(variance - 226.3544536271809) < 1e-9
    assert abs(objective - 114.39393939393938) < 1e-9
    c, v, j = evaluate(INITIAL, EQUAL_RESIDUAL, BASE_A, BASE_SIGMA, 0.05)
    assert abs(c - 100.0) < 1e-10 and abs(v - 375.0) < 1e-10
    assert abs(j - 118.75) < 1e-10
    var95, es95 = normal_var_es(c, v)
    assert abs(var95 - 131.85245352) < 1e-7
    assert abs(es95 - 139.94426176) < 1e-7
    stressed_cost, stressed_variance, _ = evaluate(
        INITIAL, EQUAL_RESIDUAL, scale(BASE_A, 2), scale(BASE_SIGMA, 4), 0.05
    )
    assert abs(stressed_cost - 200) < 1e-10
    assert abs(stressed_variance - 1500) < 1e-10
    assert abs(permanent_loop_cost(((1, 2), (0, 1))) + 2) < 1e-12
    assert permanent_loop_cost(((1, 2), (2, 1))) == 0
    # Telescoping identity for a single observed shock.
    shock = (-4, -6)
    loss = stressed_cost - dot(EQUAL_RESIDUAL, shock)
    assert loss == 250
    print("SELF-TEST PASS: matrix signs, feasible optimum, risk, stress, round trip")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--lambda-risk", type=float, default=0.05)
    parser.add_argument("--stress", action="store_true")
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        tests()
        return
    if not (math.isfinite(args.lambda_risk) and args.lambda_risk >= 0):
        parser.error("--lambda-risk must be a finite nonnegative number")

    a_factor = 2 if args.stress else 1
    s_factor = 4 if args.stress else 1
    impact = scale(BASE_A, a_factor)
    covariance = scale(BASE_SIGMA, s_factor)
    print("Scenario:", "stress (2A, 4Sigma)" if args.stress else "normal")
    print(f"det(A)={determinant(impact):.6f}  PD(A)={positive_definite(impact)}")
    print(
        f"det(Sigma)={determinant(covariance):.6f}  "
        f"PSD(Sigma)={positive_semidefinite(covariance)}"
    )
    if not positive_definite(impact) or not positive_semidefinite(covariance):
        raise ValueError("input matrices do not meet the model conditions")

    optimal_residual = optimize(INITIAL, impact, covariance, args.lambda_risk)
    print("Two-period residual after first trade:", optimal_residual)
    print("First trade:", tuple(INITIAL[i] - optimal_residual[i] for i in range(2)))
    print("Schedule            cost(yen)    variance(yen^2)     objective(yen)")
    for name, residual in (
        ("immediate", (0.0, 0.0)),
        ("equal", EQUAL_RESIDUAL),
        ("optimal", optimal_residual),
    ):
        cost, variance, objective = evaluate(
            INITIAL, residual, impact, covariance, args.lambda_risk
        )
        print(f"{name:12s} {cost:13.3f} {variance:18.3f} {objective:18.3f}")

    # VaR/ES comparison fixes the equal schedule in both states.
    c, variance, _ = evaluate(
        INITIAL, EQUAL_RESIDUAL, impact, covariance, args.lambda_risk
    )
    value_at_risk, expected_shortfall = normal_var_es(c, variance)
    print(
        f"Equal schedule, conditional 95% LVaR={value_at_risk:.3f}, "
        f"LES={expected_shortfall:.3f} yen"
    )
    if args.stress:
        shock = (-4.0, -6.0)
        print(
            "Single stress path (not ES), loss=",
            c - dot(EQUAL_RESIDUAL, shock),
            "yen",
        )
    print("This toy calculation is not a market calibration or a trading signal.")


if __name__ == "__main__":
    main()
