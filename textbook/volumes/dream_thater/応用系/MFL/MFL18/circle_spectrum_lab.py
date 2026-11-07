"""Deterministic Fourier-spectrum check for an equally spaced circle (MFL18).

Only the Python standard library is required. There is no random sampling.
"""

from __future__ import annotations

import argparse
import cmath
import json
import math


def validate_parameters(n: int, radius: float) -> None:
    if n < 3:
        raise ValueError("n must be at least 3")
    if not math.isfinite(radius) or radius <= 0:
        raise ValueError("radius must be positive and finite")


def mode(n: int, radius: float, frequency: int) -> list[complex]:
    validate_parameters(n, radius)
    length = 2 * math.pi * radius
    return [
        cmath.exp(2j * math.pi * frequency * j / n) / math.sqrt(length)
        for j in range(n)
    ]


def laplacian(values: list[complex], radius: float) -> list[complex]:
    n = len(values)
    validate_parameters(n, radius)
    h = 2 * math.pi * radius / n
    return [
        (2 * values[j] - values[(j - 1) % n] - values[(j + 1) % n]) / h**2
        for j in range(n)
    ]


def inner(a: list[complex], b: list[complex], radius: float) -> complex:
    if len(a) != len(b):
        raise ValueError("vectors must have the same length")
    validate_parameters(len(a), radius)
    h = 2 * math.pi * radius / len(a)
    return h * sum(x.conjugate() * y for x, y in zip(a, b))


def eigenvalue(n: int, radius: float, frequency: int) -> float:
    validate_parameters(n, radius)
    h = 2 * math.pi * radius / n
    # Reduce modulo n first: large input frequencies alias on the grid.
    k = frequency % n
    return 4 * math.sin(math.pi * k / n) ** 2 / h**2


def fixed_frequency_bound(n: int, radius: float, frequency: int) -> float | None:
    if n <= 2 * abs(frequency):
        return None
    return math.pi**2 * frequency**4 / (3 * radius**2 * n**2)


def report(n: int, radius: float, frequency: int) -> dict[str, float | int | None]:
    validate_parameters(n, radius)
    v = mode(n, radius, frequency)
    av = laplacian(v, radius)
    discrete = eigenvalue(n, radius, frequency)
    continuous = frequency**2 / radius**2
    residual = max(abs(x - discrete * y) for x, y in zip(av, v))
    result: dict[str, float | int | None] = {
        "n": n,
        "radius": radius,
        "frequency": frequency,
        "grid_spacing": 2 * math.pi * radius / n,
        "discrete_eigenvalue": discrete,
        "continuous_eigenvalue": continuous,
        "absolute_eigenvalue_error": abs(discrete - continuous),
        "bound_if_low_frequency": fixed_frequency_bound(n, radius, frequency),
        "sampled_eigen_residual": residual,
        "sampled_norm_squared": inner(v, v, radius).real,
        "nyquist_ratio": 4 / math.pi**2 if n % 2 == 0 else None,
    }
    return result


def self_test() -> None:
    for n in (5, 6, 12):
        radius = 1.7
        basis = [mode(n, radius, k) for k in range(n)]
        for k in range(n):
            for ell in range(n):
                expected = 1.0 if k == ell else 0.0
                assert abs(inner(basis[k], basis[ell], radius) - expected) < 1e-12
            applied = laplacian(basis[k], radius)
            lam = eigenvalue(n, radius, k)
            assert max(abs(x - lam * y) for x, y in zip(applied, basis[k])) < 1e-10

        # Parseval and energy identities for a nontrivial complex signal.
        signal = [complex(j - n / 2, j % 3 - 1) for j in range(n)]
        coeff = [inner(b, signal, radius) for b in basis]
        assert abs(inner(signal, signal, radius) - sum(abs(a) ** 2 for a in coeff)) < 1e-10
        spectral_energy = sum(eigenvalue(n, radius, k) * abs(a) ** 2 for k, a in enumerate(coeff))
        physical_energy = inner(signal, laplacian(signal, radius), radius).real
        assert abs(physical_energy - spectral_energy) < 1e-9

        assert max(abs(x - y) for x, y in zip(mode(n, radius, 1), mode(n, radius, n + 1))) < 1e-12

    for n in (12, 24, 48):
        error = abs(eigenvalue(n, 2.0, 2) - 1.0)
        bound = fixed_frequency_bound(n, 2.0, 2)
        assert bound is not None and error <= bound + 1e-12

    for n in (4, 10, 32):
        ratio = eigenvalue(n, 1, n // 2) / ((n // 2) ** 2)
        assert abs(ratio - 4 / math.pi**2) < 1e-12


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--n", type=int, default=24)
    parser.add_argument("--radius", type=float, default=1.0)
    parser.add_argument("--frequency", type=int, default=2)
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        self_test()
        print("MFL18 circle spectrum: self-test passed")
        return
    print(json.dumps(report(args.n, args.radius, args.frequency), ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
