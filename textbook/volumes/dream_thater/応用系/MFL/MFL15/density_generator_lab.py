#!/usr/bin/env python3
"""MFL15: alpha-corrected intrinsic Gaussian kernels on a nonuniform circle.

The circle has unit radius and intrinsic shortest-arc distance. Continuum
integrals use deterministic midpoint quadrature; empirical values use samples
drawn from p(theta)=(1+a*cos(theta))/(2*pi). Only stdlib is required.
"""

from __future__ import annotations

import argparse
import json
import math
import random


TWO_PI = 2.0 * math.pi
TEST_ANGLE = math.pi / 2.0


def distance(a: float, b: float) -> float:
    return abs((a - b + math.pi) % TWO_PI - math.pi)


def kernel(epsilon: float, a: float, b: float) -> float:
    arc = distance(a, b)
    return math.exp(-arc * arc / (4.0 * epsilon)) / math.sqrt(4.0 * math.pi * epsilon)


def density(theta: float, amplitude: float) -> float:
    return (1.0 + amplitude * math.cos(theta)) / TWO_PI


def moments(epsilon: float, count: int = 8192) -> tuple[float, float]:
    """C0=G(1), C1=G(cos) at zero."""
    c0 = c1 = 0.0
    step = TWO_PI / count
    for j in range(count):
        theta = step * (j + 0.5)
        k = kernel(epsilon, 0.0, theta)
        c0 += k
        c1 += k * math.cos(theta)
    return c0 * step, c1 * step


def population_q(theta: float, amplitude: float, coefficients: tuple[float, float]) -> float:
    c0, c1 = coefficients
    return (c0 + amplitude * c1 * math.cos(theta)) / TWO_PI


def continuum_value(epsilon: float, amplitude: float, alpha: float,
                    count: int = 8192) -> float:
    coefficients = moments(epsilon, count)
    numerator = denominator = 0.0
    step = TWO_PI / count
    for j in range(count):
        theta = step * (j + 0.5)
        q = population_q(theta, amplitude, coefficients)
        w = kernel(epsilon, TEST_ANGLE, theta) * density(theta, amplitude) * q ** (-alpha)
        numerator += w * math.cos(theta)
        denominator += w
    if denominator <= 0.0:
        raise ArithmeticError("continuum denominator is not positive")
    return numerator / denominator


def draw_points(rng: random.Random, n: int, amplitude: float) -> list[float]:
    """Rejection sampling from p, with normalized positive envelope."""
    points: list[float] = []
    while len(points) < n:
        theta = TWO_PI * rng.random()
        if rng.random() * (1.0 + abs(amplitude)) <= 1.0 + amplitude * math.cos(theta):
            points.append(theta)
    return points


def sample_q(points: list[float], epsilon: float) -> list[float]:
    n = len(points)
    return [math.fsum(kernel(epsilon, theta, other) for other in points) / n
            for theta in points]


def sample_value(points: list[float], qhat: list[float],
                 epsilon: float, alpha: float) -> float:
    """Out-of-sample row; qhat(test point)^(-alpha) cancels in the ratio."""
    weights = [kernel(epsilon, TEST_ANGLE, theta) * q ** (-alpha)
               for theta, q in zip(points, qhat)]
    denominator = math.fsum(weights)
    if denominator <= 0.0:
        raise ArithmeticError("empirical row denominator underflowed; increase epsilon or n")
    return math.fsum(w * math.cos(theta) for w, theta in zip(weights, points)) / denominator


def limit_generator(amplitude: float, alpha: float) -> float:
    # f=cos(theta), f''(pi/2)=0, f'(pi/2)=-1.
    return 2.0 * (1.0 - alpha) * amplitude


def estimate_row(epsilon: float, amplitude: float, alpha: float,
                 points: list[float], qhat: list[float]) -> dict[str, float]:
    pop = continuum_value(epsilon, amplitude, alpha)
    empirical = sample_value(points, qhat, epsilon, alpha)
    limit = limit_generator(amplitude, alpha)
    return {"alpha": alpha, "limit": limit,
            "continuum_generator": pop / epsilon,  # f(pi/2)=0
            "sample_generator": empirical / epsilon,
            "continuum_bias": pop / epsilon - limit,
            "sample_error": (empirical - pop) / epsilon}


def chart(title: str, xlabel: str, ylabel: str,
          series: list[tuple[str, list[list[float]]]]) -> dict:
    return {"title": title, "x_label": xlabel, "y_label": ylabel,
            "series": [{"name": name, "points": points} for name, points in series]}


def run_alpha(epsilon: float, amplitude: float, n: int,
              rng: random.Random) -> dict:
    points = draw_points(rng, n, amplitude)
    qhat = sample_q(points, epsilon)
    rows = [estimate_row(epsilon, amplitude, alpha, points, qhat)
            for alpha in (0.0, 0.5, 1.0)]
    return {"mode": "alpha", "n": n, "epsilon": epsilon, "amplitude": amplitude,
            "rows": rows, "plots": [chart(
                "密度driftと補正指数", "alpha", "(P f-f)/epsilon",
                [("極限", [[r["alpha"], r["limit"]] for r in rows]),
                 ("連続核", [[r["alpha"], r["continuum_generator"]] for r in rows]),
                 ("有限標本", [[r["alpha"], r["sample_generator"]] for r in rows])])],
            "interpretation": "alpha=1で消えるのは極限のdrift。連続核と標本の残差は別。"}


def run_bandwidth(epsilon: float, amplitude: float, n: int,
                  alpha: float, rng: random.Random) -> dict:
    points = draw_points(rng, n, amplitude)
    rows = []
    for width in (epsilon / 2.0, epsilon, 2.0 * epsilon):
        qhat = sample_q(points, width)
        rows.append({"epsilon": width,
                     **estimate_row(width, amplitude, alpha, points, qhat)})
    return {"mode": "bandwidth", "n": n, "amplitude": amplitude, "rows": rows,
            "plots": [chart("bandwidth別のgenerator", "epsilon", "generator",
                            [("極限", [[r["epsilon"], r["limit"]] for r in rows]),
                             ("連続核", [[r["epsilon"], r["continuum_generator"]] for r in rows]),
                             ("有限標本", [[r["epsilon"], r["sample_generator"]] for r in rows])])],
            "interpretation": "同じ標本のままbandwidthだけを縮めても統計誤差は自動的には減らない。"}


def run_sample(epsilon: float, amplitude: float, n: int,
               alpha: float, rng: random.Random) -> dict:
    rows = []
    for count in sorted({max(16, n // 2), n, 2 * n}):
        points = draw_points(rng, count, amplitude)
        qhat = sample_q(points, epsilon)
        rows.append({"n": count, "effective_n": count * math.sqrt(epsilon),
                     **estimate_row(epsilon, amplitude, alpha, points, qhat)})
    return {"mode": "sample", "epsilon": epsilon, "amplitude": amplitude, "rows": rows,
            "plots": [chart("標本数と連続核からの差", "n", "generatorの差",
                            [("sample - continuum", [[r["n"], r["sample_error"]]
                                                     for r in rows])])],
            "interpretation": "標本間の大小は乱数実現に依存。nの単調改善や固有空間収束は保証しない。"}


def finite_balance(points: list[float], epsilon: float,
                   alpha: float) -> dict[str, float]:
    qhat = sample_q(points, epsilon)
    n = len(points)
    w = [[kernel(epsilon, points[i], points[j]) /
          (qhat[i] ** alpha * qhat[j] ** alpha) for j in range(n)]
         for i in range(n)]
    degrees = [math.fsum(row) for row in w]
    total = math.fsum(degrees)
    pi = [d / total for d in degrees]
    pmat = [[w[i][j] / degrees[i] for j in range(n)] for i in range(n)]
    residual = max(abs(pi[i] * pmat[i][j] - pi[j] * pmat[j][i])
                   for i in range(n) for j in range(n))
    rowsum_error = max(abs(math.fsum(row) - 1.0) for row in pmat)
    values = [math.cos(theta) for theta in points]
    lhs = math.fsum(pi[i] * values[i] *
                    (math.fsum(pmat[i][j] * values[j] for j in range(n)) - values[i])
                    for i in range(n))
    rhs = -math.fsum(w[i][j] * (values[i] - values[j]) ** 2
                    for i in range(n) for j in range(n)) / (2.0 * total)
    return {"balance_residual": residual, "rowsum_residual": rowsum_error,
            "energy_residual": abs(lhs - rhs), "energy": rhs}


def self_test() -> None:
    assert abs(distance(0.0, TWO_PI - 0.1) - 0.1) < 1e-12
    c0, c1 = moments(0.05)
    assert 0.0 < c1 < c0 < 1.00001
    assert abs(c0 - 1.0) < 1e-9
    assert abs(c1 - math.exp(-0.05)) < 1e-7
    assert abs(continuum_value(0.05, 0.0, 1.0)) < 1e-12
    assert abs(continuum_value(0.05, 0.0, 0.0)) < 1e-12
    assert continuum_value(0.05, 0.6, 1.0) > 0
    assert abs(limit_generator(0.6, 0.5) - 0.6) < 1e-12
    points = draw_points(random.Random(7), 32, 0.6)
    qhat = sample_q(points, 0.05)
    assert all(q > 0 for q in qhat)
    assert abs(sample_value(points, qhat, 0.05, 0) -
               sample_value(points, [1.0] * len(points), 0.05, 0)) < 1e-12
    balance = finite_balance(points, 0.05, 0.5)
    assert balance["rowsum_residual"] < 1e-12
    assert balance["balance_residual"] < 1e-12
    assert balance["energy_residual"] < 1e-12
    assert balance["energy"] <= 0


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--mode", choices=("alpha", "bandwidth", "sample"), default="alpha")
    parser.add_argument("--amplitude", type=float, default=0.6)
    parser.add_argument("--alpha", type=float, default=1.0)
    parser.add_argument("--epsilon", type=float, default=0.06)
    parser.add_argument("--n", type=int, default=240)
    parser.add_argument("--seed", type=int, default=2026)
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        self_test()
        print("MFL15 self-test passed")
        return
    if not (-0.95 <= args.amplitude <= 0.95 and -1.0 <= args.alpha <= 2.0 and
            0.01 <= args.epsilon <= 0.4 and 16 <= args.n <= 600):
        parser.error("require |amplitude|<=.95, -1<=alpha<=2, .01<=epsilon<=.4, 16<=n<=600")
    rng = random.Random(args.seed)
    if args.mode == "alpha":
        result = run_alpha(args.epsilon, args.amplitude, args.n, rng)
    elif args.mode == "bandwidth":
        result = run_bandwidth(args.epsilon, args.amplitude, args.n, args.alpha, rng)
    else:
        result = run_sample(args.epsilon, args.amplitude, args.n, args.alpha, rng)
    result["seed"] = args.seed
    result["test_point"] = "theta=pi/2, f(theta)=cos(theta)"
    print(json.dumps(result, ensure_ascii=False, indent=2, allow_nan=False))


if __name__ == "__main__":
    main()
