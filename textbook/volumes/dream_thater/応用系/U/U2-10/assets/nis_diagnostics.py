"""U2-10: innovation calibration diagnostics for the EKF.

Standard library only; m and rad are not mixed by raw Euclidean norms.
Independent synthetic draws use a fixed RNG seed, never the global RNG.
"""
import argparse
import math
import random

SEED = 20261117
GATE_2D_05 = -2.0 * math.log(0.05)


def wrap(angle):
    return (angle + math.pi) % (2.0 * math.pi) - math.pi


def positive_definite_2x2(s):
    if len(s) != 2 or any(len(row) != 2 for row in s):
        raise ValueError("S must be 2x2")
    if not math.isclose(s[0][1], s[1][0], abs_tol=1e-14):
        raise ValueError("S must be symmetric")
    determinant = s[0][0] * s[1][1] - s[0][1] ** 2
    if s[0][0] <= 0 or determinant <= 0:
        raise ValueError("S must be positive definite")
    return determinant


def nis2(nu, s):
    determinant = positive_definite_2x2(s)
    # x^T S^(-1) x using the complete matrix, not just its diagonal.
    a, b = nu
    return (s[1][1] * a * a - 2 * s[0][1] * a * b
            + s[0][0] * b * b) / determinant


def angle_example():
    predicted = math.radians(179.0)
    measured = math.radians(-179.0)
    residual = wrap(measured - predicted)
    sigma = math.radians(5.0)
    return math.degrees(residual), residual ** 2 / sigma ** 2, (
        (measured - predicted) ** 2 / sigma ** 2)


def correlated_example():
    s = [[0.04, 0.012], [0.012, 0.01]]
    nu = (0.2, 0.1)
    return nis2(nu, s), (nu[0] ** 2 / s[0][0] + nu[1] ** 2 / s[1][1])


def bias_expected(sigma=0.1, bias=0.3, extra_variance=0.0):
    if sigma <= 0 or extra_variance < 0:
        raise ValueError("invalid parameters")
    return 1.0 + (bias ** 2 + extra_variance) / sigma ** 2


def quadratic_expected():
    # X ~ N(0,1), eps ~ N(0,1/4), Z=X^2+eps; EKF h'(0)=0.
    prediction_variance = 0.25
    true_mean = 1.0
    true_variance = 2.0 + 0.25
    return (true_variance + true_mean ** 2) / prediction_variance


def monte_carlo(draws=20000):
    if draws < 1:
        raise ValueError("draws must be positive")
    rng = random.Random(SEED)
    # Under the ideal 2D linear Gaussian model:
    q = [rng.gauss(0.0, 1.0) ** 2 + rng.gauss(0.0, 1.0) ** 2
         for _ in range(draws)]
    # Independently draw the nonlinear observation:
    nonlinear = []
    for _ in range(draws):
        x = rng.gauss(0.0, 1.0)
        eps = rng.gauss(0.0, 0.5)
        nonlinear.append(4.0 * (x * x + eps) ** 2)
    return (sum(q) / draws,
            sum(value > GATE_2D_05 for value in q) / draws,
            sum(nonlinear) / draws)


def close(actual, expected, tolerance=1e-10):
    if abs(actual - expected) > tolerance:
        raise AssertionError(
            f"expected {expected}, got {actual}, tolerance {tolerance}")


def self_test():
    degrees, wrapped, raw = angle_example()
    close(degrees, 2.0)
    close(wrapped, 0.16)
    close(raw, (358.0 / 5.0) ** 2)
    correlation, diagonal = correlated_example()
    close(correlation, 1.25)
    close(diagonal, 2.0)
    close(bias_expected(), 10.0)
    close(bias_expected(sigma=0.5, bias=0.0,
                        extra_variance=0.75), 4.0)
    close(quadratic_expected(), 13.0)
    close(GATE_2D_05, 5.991464547107982)
    close(nis2((2.0, 1.0), [[4.0, 1.0], [1.0, 1.0]]), 4 / 3)
    try:
        nis2((1, 1), [[1, 1], [1, 1]])
    except ValueError:
        pass
    else:
        raise AssertionError("singular innovation covariance accepted")

    # Randomized checks: tolerances are statistical, not floating-point equality.
    mean, rejected, nonlinear = monte_carlo()
    assert abs(mean - 2.0) < 0.1, mean
    assert abs(rejected - 0.05) < 0.012, rejected
    assert abs(nonlinear - 13.0) < 1.1, nonlinear
    return ("PASS: wrap, SPD, correlated NIS, bias, nonlinear moment, "
            "Gaussian reference frequency")


def scenario(name):
    if name == "angle":
        degrees, wrapped, raw = angle_example()
        print("predicted 179 deg, observed -179 deg, sigma 5 deg")
        print("wrapped difference (deg):", degrees)
        print("NIS using wrapped angle:", wrapped)
        print("NIS using raw angle (wrong):", raw)
    elif name == "covariance":
        correlation, diagonal = correlated_example()
        print("correlated S: [[0.04,0.012],[0.012,0.01]]")
        print("residual: [0.2,0.1], NIS:", correlation)
        print("diagonal-only NIS (wrong model):", diagonal)
        print("2D 5% upper gate:", GATE_2D_05)
    elif name == "bias":
        print("predicted sigma 0.1 m, actual mean bias 0.3 m")
        print("expected scalar NIS:", bias_expected())
        print("additional variance 0.75, predicted variance 0.25")
        print("expected NIS:", bias_expected(0.5, 0.0, 0.75))
    elif name == "nonlinear":
        print("X~N(0,1), Z=X^2+eps, eps~N(0,0.25)")
        print("EKF at 0: H=0, S=0.25; true mean=1, variance=2.25")
        print("exact expected NIS:", quadratic_expected())
    elif name == "samples":
        mean, rejected, nonlinear = monte_carlo()
        print("seed:", SEED, "draws per model:", 20000)
        print("ideal 2D mean NIS:", mean, "(theory: 2)")
        print("ideal 2D gate rejection:", rejected, "(theory: 0.05)")
        print("nonlinear mean NIS:", nonlinear, "(theory: 13)")
    else:
        raise ValueError("unknown scenario")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--scenario",
                        choices=("angle", "covariance", "bias",
                                 "nonlinear", "samples"))
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test or args.scenario is None:
        print(self_test())
    if args.scenario is not None:
        scenario(args.scenario)
