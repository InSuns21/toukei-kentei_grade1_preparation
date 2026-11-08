#!/usr/bin/env python3
"""Deterministic SO(2) Fourier and steerable-kernel quadrature lab.

Uses only the Python standard library. The signal is an analytic real
trigonometric polynomial, so rotated samples do not introduce interpolation.
"""

from __future__ import annotations

import argparse
import math


# f(theta) = MEAN + sum_m A[m] cos(m theta) + B[m] sin(m theta)
MEAN = 1.0
COEFFICIENTS = {
    1: (1.5, -0.75),
    2: (0.8, 0.25),
    3: (0.6, -0.4),
    4: (0.5, 0.0),
    5: (0.35, 0.0),
}
BASE_VECTOR = (1.25, -0.6)
WRONG_WEIGHT = 0.4


def signal(theta: float) -> float:
    return MEAN + sum(
        a * math.cos(mode * theta) + b * math.sin(mode * theta)
        for mode, (a, b) in COEFFICIENTS.items()
    )


def rotate(mode: int, alpha: float, vector: tuple[float, float]) -> tuple[float, float]:
    c = math.cos(mode * alpha)
    s = math.sin(mode * alpha)
    x, y = vector
    return c * x - s * y, s * x + c * y


def kernel(mode: int, theta: float, invalid: bool) -> tuple[float, ...]:
    if mode == 0:
        base = (BASE_VECTOR[0],)
        return (base[0] + WRONG_WEIGHT * math.cos(theta),) if invalid else base
    x, y = rotate(mode, theta, BASE_VECTOR)
    if invalid:
        wrong_x, wrong_y = rotate(mode + 1, theta, (1.0, 0.0))
        x += WRONG_WEIGHT * wrong_x
        y += WRONG_WEIGHT * wrong_y
    return x, y


def integrate(mode: int, alpha: float, samples: int, invalid: bool) -> tuple[float, ...]:
    total = [0.0] if mode == 0 else [0.0, 0.0]
    for j in range(samples):
        theta = math.tau * j / samples
        weight = signal(theta - alpha) / samples
        for component, value in enumerate(kernel(mode, theta, invalid)):
            total[component] += weight * value
    return tuple(total)


def analytic_output(mode: int, invalid: bool = False) -> tuple[float, ...]:
    if mode == 0:
        base = BASE_VECTOR[0] * MEAN
        if invalid:
            base += WRONG_WEIGHT * COEFFICIENTS[1][0] / 2
        return (base,)
    a, b = BASE_VECTOR
    c, d = COEFFICIENTS.get(mode, (0.0, 0.0))
    x, y = (a * c - b * d) / 2, (b * c + a * d) / 2
    if invalid:
        next_c, next_d = COEFFICIENTS.get(mode + 1, (0.0, 0.0))
        x += WRONG_WEIGHT * next_c / 2
        y += WRONG_WEIGHT * next_d / 2
    return x, y


def representation(mode: int, alpha: float, output: tuple[float, ...]) -> tuple[float, ...]:
    if mode == 0:
        return output
    return rotate(mode, alpha, (output[0], output[1]))


def distance(u: tuple[float, ...], v: tuple[float, ...]) -> float:
    return math.sqrt(sum((x - y) ** 2 for x, y in zip(u, v)))


def evaluate(mode: int, angle_degrees: float, samples: int, invalid: bool) -> dict:
    angle = math.radians(angle_degrees)
    before = integrate(mode, 0.0, samples, invalid)
    after = integrate(mode, angle, samples, invalid)
    expected = representation(mode, angle, before)
    analytic = analytic_output(mode, invalid)
    return {
        "mode": mode,
        "angle_degrees": angle_degrees,
        "samples": samples,
        "kernel": "invalid" if invalid else "valid",
        "output_original": before,
        "output_rotated_input": after,
        "target_rotation": expected,
        "equivariance_residual": distance(after, expected),
        "analytic_original": analytic,
        "quadrature_error_original": distance(before, analytic),
        "output_norm": math.sqrt(sum(x * x for x in before)),
    }


def check_close(got, expected, tol: float = 2e-12) -> None:
    if abs(got - expected) > tol:
        raise AssertionError(f"expected {expected:.17g}, got {got:.17g}")


def self_test() -> None:
    checks = 0
    for mode in range(5):
        for angle in (0.0, math.pi / 3, math.pi / 2, math.radians(37)):
            if mode:
                for u, v in ((0.1, 0.2), (0.7, -1.3), (math.pi, 0.6)):
                    lhs = rotate(mode, u + v, (0.7, -1.2))
                    rhs = rotate(mode, u, rotate(mode, v, (0.7, -1.2)))
                    check_close(distance(lhs, rhs), 0.0)
                    checks += 1
            for invalid in (False, True):
                # N=64 is greater than the largest nonzero frequency 10
                # in signal(theta) * kernel(theta).
                actual = integrate(mode, 0.0, 64, invalid)
                true_value = analytic_output(mode, invalid)
                check_close(distance(actual, true_value), 0.0)
                checks += 1
                rotated = integrate(mode, angle, 64, invalid)
                if not invalid:
                    check_close(distance(rotated, representation(mode, angle, actual)), 0.0)
                    checks += 1
                elif angle != 0.0:
                    # Every wrong mode here is present in the chosen signal.
                    if distance(rotated, representation(mode, angle, actual)) <= 1e-5:
                        raise AssertionError(f"wrong kernel unexpectedly passed mode {mode}")
                    checks += 1
    # A concrete aliased setting must not be reported as exact integration.
    aliased = integrate(4, 0.0, 8, False)
    if distance(aliased, analytic_output(4)) <= 1e-5:
        raise AssertionError("expected 8-point quadrature aliasing")
    checks += 1
    print(f"PASS: {checks} deterministic SO(2), Fourier, quadrature and failure checks")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--self-test", action="store_true", help="run deterministic checks")
    parser.add_argument("--mode", type=int, choices=range(5), metavar="0..4", default=2)
    parser.add_argument("--angle", type=float, default=37.0, help="input rotation in degrees")
    parser.add_argument("--samples", type=int, default=64, help="equidistant quadrature points")
    parser.add_argument("--kernel", choices=("valid", "invalid"), default="valid")
    args = parser.parse_args()
    if args.self_test:
        self_test()
        return
    if not math.isfinite(args.angle):
        parser.error("--angle must be finite")
    if args.samples < 2 or args.samples > 100000:
        parser.error("--samples must be between 2 and 100000")
    result = evaluate(args.mode, args.angle, args.samples, args.kernel == "invalid")
    for key, value in result.items():
        print(f"{key}: {value}")
    print("note: for this signal, N>10 makes the unrotated product quadrature exact;")
    print("      small N can alias even a valid continuous SO(2) kernel.")


if __name__ == "__main__":
    main()
