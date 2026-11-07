#!/usr/bin/env python3
"""MFL17: deterministic boundary Gaussian integrals on [0, 1].

The quadrature and the truncated-moment formula are independent checks.
No numpy, network, randomness, or spectral convergence claims are involved.
"""

import argparse
import json
import math


def density(y, slope):
    return 1.0 + slope * (2.0 * y - 1.0)


def function_value(y, kind):
    if kind == "constant":
        return 1.0
    if kind == "linear":
        return y
    return y * y


def derivatives(x, kind):
    if kind == "constant":
        return 1.0, 0.0, 0.0, 0.0
    if kind == "linear":
        return x, 1.0, 0.0, 0.0
    return x * x, 2.0 * x, 2.0, 1.0


def simpson(function, steps):
    h = 1.0 / steps
    total = function(0.0) + function(1.0)
    for i in range(1, steps):
        total += (4.0 if i % 2 else 2.0) * function(i * h)
    return h * total / 3.0


def moments(a, b):
    """Integrals u^j exp(-u^2/4) from -a to b, j=0,...,3."""
    left = math.exp(-a * a / 4.0)
    right = math.exp(-b * b / 4.0)
    m0 = math.sqrt(math.pi) * (math.erf(a / 2.0) + math.erf(b / 2.0))
    m1 = 2.0 * (left - right)
    m2 = 2.0 * m0 - 2.0 * (a * left + b * right)
    m3 = 2.0 * ((a * a + 4.0) * left - (b * b + 4.0) * right)
    return m0, m1, m2, m3


def experiment(x, epsilon, slope, beta, kind, steps):
    if not 0.0 <= x <= 1.0:
        raise ValueError("x must be in [0,1]")
    if not 0.0 < epsilon <= 1.0:
        raise ValueError("epsilon must be in (0,1]")
    if not -1.0 < slope < 1.0:
        raise ValueError("require |slope| < 1 for strictly positive density")
    if not math.isfinite(beta) or abs(beta) > 8:
        raise ValueError("require finite |beta| <= 8")
    if steps < 100 or steps > 200000 or steps % 2:
        raise ValueError("steps must be even and between 100 and 200000")

    p0 = density(x, slope)
    rho = p0 ** (-beta)
    delta = math.sqrt(epsilon) * rho
    if not math.isfinite(delta) or delta <= 0:
        raise ValueError("invalid local bandwidth")
    a, b = x / delta, (1.0 - x) / delta
    m0, m1, m2, m3 = moments(a, b)
    mu1, mu2 = m1 / m0, m2 / m0
    variance = mu2 - mu1 * mu1
    p1 = 2.0 * slope
    f0, f1, f2, quadratic_coefficient = derivatives(x, kind)

    denominator = p0 * m0 + delta * p1 * m1
    numerator = (
        f0 * p0 * m0
        + delta * (f1 * p0 + f0 * p1) * m1
        + delta * delta * (quadratic_coefficient * p0 + f1 * p1) * m2
        + delta ** 3 * quadratic_coefficient * p1 * m3
    )
    moment_increment = numerator / denominator - f0

    def weighted(y):
        return math.exp(-((x - y) / delta) ** 2 / 4.0) * density(y, slope)

    d_numeric = simpson(weighted, steps)
    n_numeric = simpson(lambda y: weighted(y) * function_value(y, kind), steps)
    numerical_increment = n_numeric / d_numeric - f0

    leading = delta * mu1 * f1
    second = leading + delta * delta * (
        0.5 * mu2 * f2 + variance * (p1 / p0) * f1
    )
    return {
        "x": x,
        "epsilon": epsilon,
        "density_slope": slope,
        "beta": beta,
        "function": kind,
        "local_length": delta,
        "mu1": mu1,
        "mu2": mu2,
        "numerical_increment": numerical_increment,
        "moment_increment": moment_increment,
        "quadrature_error": abs(numerical_increment - moment_increment),
        "leading_boundary_increment": leading,
        "second_order_increment": second,
        "second_order_remainder": moment_increment - second,
        "scaled_generator": numerical_increment / epsilon,
        "interior_generator_prediction": rho * rho * (
            f2 + 2.0 * p1 / p0 * f1
        ),
    }


def self_test():
    samples = [
        (0.0, 0.01, 0.0, 0.0, "linear"),
        (0.0, 0.0025, 0.0, 0.0, "linear"),
        (0.0, 0.01, 0.0, 0.0, "quadratic"),
        (0.1, 0.01, 0.0, 0.0, "quadratic"),
        (0.5, 0.01, 0.5, 0.0, "linear"),
        (0.5, 0.01, -0.5, 0.0, "linear"),
        (0.0, 0.01, 0.5, 0.5, "linear"),
        (1.0, 0.01, -0.25, 0.5, "quadratic"),
        (0.4, 0.03, 0.2, -0.5, "constant"),
    ]
    for args in samples:
        result = experiment(*args, steps=2000)
        assert result["quadrature_error"] < 2e-8, (args, result)
        if args[4] == "constant":
            assert abs(result["moment_increment"]) < 1e-12

    boundary = experiment(0.0, 0.0025, 0.0, 0.0, "linear", 2000)
    assert abs(boundary["moment_increment"] / math.sqrt(0.0025)
               - 2.0 / math.sqrt(math.pi)) < 1e-10
    quadratic = experiment(0.0, 0.0025, 0.0, 0.0, "quadratic", 2000)
    assert abs(quadratic["scaled_generator"] - 2.0) < 2e-8
    positive = experiment(0.5, 0.0025, 0.5, 0.0, "linear", 2000)
    negative = experiment(0.5, 0.0025, -0.5, 0.0, "linear", 2000)
    assert positive["scaled_generator"] > 0
    assert negative["scaled_generator"] < 0
    assert abs(positive["scaled_generator"] + negative["scaled_generator"]) < 1e-9
    print("MFL17 boundary kernel self-test: PASS (9 cases + asymptotic checks)")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--x", type=float, default=0.0)
    parser.add_argument("--epsilon", type=float, default=0.01)
    parser.add_argument("--slope", type=float, default=0.0)
    parser.add_argument("--beta", type=float, default=0.0)
    parser.add_argument(
        "--function", choices=["constant", "linear", "quadratic"],
        default="linear",
    )
    parser.add_argument("--steps", type=int, default=2000)
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        self_test()
    else:
        print(json.dumps(
            experiment(
                args.x, args.epsilon, args.slope, args.beta,
                args.function, args.steps,
            ),
            ensure_ascii=False, indent=2,
        ))


if __name__ == "__main__":
    main()
