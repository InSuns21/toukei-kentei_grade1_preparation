"""Deterministic periodic-circle bridge from graph to continuum Laplacian.

Only the Python standard library is required.  This tests a prescribed,
equally spaced cycle; it does not simulate random point-cloud convergence.
"""

import argparse
import json
import math


def compare_circle(n: int, radius: float, frequency: int) -> dict:
    """Evaluate the mass/stiffness and degree-normalized eigenvalue scales."""
    if n < 3:
        raise ValueError("n must be at least 3")
    if not math.isfinite(radius) or radius <= 0:
        raise ValueError("radius must be finite and positive")
    if frequency < 1 or 2 * frequency >= n:
        raise ValueError("frequency must be positive and smaller than n/2")

    h = 2.0 * math.pi * radius / n
    angle = 2.0 * math.pi * frequency / n
    values = [math.cos(angle * j) for j in range(n)]
    stiffness = sum((values[(j + 1) % n] - values[j]) ** 2 for j in range(n)) / h
    mass = h * sum(v * v for v in values)
    scaled_eigenvalue = 4.0 * math.sin(angle / 2.0) ** 2 / h**2
    degree_eigenvalue = 2.0 * math.sin(angle / 2.0) ** 2
    continuum_eigenvalue = (frequency / radius) ** 2
    residual = max(
        abs(
            (2 * values[j] - values[(j - 1) % n] - values[(j + 1) % n]) / h**2
            - scaled_eigenvalue * values[j]
        )
        for j in range(n)
    )
    pointwise_error = max(
        abs(
            (2 * values[j] - values[(j - 1) % n] - values[(j + 1) % n]) / h**2
            - continuum_eigenvalue * values[j]
        )
        for j in range(n)
    )
    fourth_derivative_bound = h**2 * (frequency / radius) ** 4 / 12.0
    return {
        "n": n,
        "radius": radius,
        "frequency": frequency,
        "arc_step": h,
        "stiffness_energy": stiffness,
        "mass_norm_squared": mass,
        "rayleigh_quotient": stiffness / mass,
        "degree_normalized_eigenvalue": degree_eigenvalue,
        "scaled_eigenvalue": scaled_eigenvalue,
        "continuum_eigenvalue": continuum_eigenvalue,
        "scaled_eigenvalue_error": abs(scaled_eigenvalue - continuum_eigenvalue),
        "eigen_residual_max": residual,
        "pointwise_error_max": pointwise_error,
        "taylor_error_bound": fourth_derivative_bound,
    }


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--n", type=int, default=48)
    parser.add_argument("--radius", type=float, default=2.0)
    parser.add_argument("--frequency", type=int, default=3)
    args = parser.parse_args()
    try:
        result = compare_circle(args.n, args.radius, args.frequency)
    except ValueError as exc:
        parser.error(str(exc))
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
