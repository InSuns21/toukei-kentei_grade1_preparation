"""Deterministic spectral-consistency bridge on a periodic 1D grid (MFL19).

No random samples or external packages.  The mixing example is a separate 2x2
matrix, not a model of random geometric-graph sampling error.
"""

from __future__ import annotations

import argparse
import cmath
import json
import math


def validate(n: int, radius: float, frequency: int, gap: float, mix: float) -> None:
    if n < 4:
        raise ValueError("n must be at least 4")
    if not math.isfinite(radius) or radius <= 0:
        raise ValueError("radius must be finite and positive")
    if not 0 <= frequency <= n // 2:
        raise ValueError("frequency must lie between 0 and n//2")
    if not math.isfinite(gap) or gap <= 0:
        raise ValueError("gap must be finite and positive")
    if not math.isfinite(mix) or mix < 0:
        raise ValueError("mix must be finite and nonnegative")


def sample(n: int, radius: float, frequency: int) -> list[complex]:
    length = 2 * math.pi * radius
    return [
        cmath.exp(2j * math.pi * frequency * j / n) / math.sqrt(length)
        for j in range(n)
    ]


def mass(v: list[complex], radius: float) -> float:
    return (2 * math.pi * radius / len(v)) * sum(abs(x) ** 2 for x in v)


def energy(v: list[complex], radius: float) -> float:
    n = len(v)
    h = 2 * math.pi * radius / n
    return sum(abs(v[(j + 1) % n] - v[j]) ** 2 for j in range(n)) / h


def linear_mass(v: list[complex], radius: float) -> float:
    """Integrate each piecewise-linear segment without using the mass identity."""
    n = len(v)
    h = 2 * math.pi * radius / n
    return h / 3 * sum(
        abs(v[j]) ** 2 + abs(v[(j + 1) % n]) ** 2
        + (v[j].conjugate() * v[(j + 1) % n]).real
        for j in range(n)
    )


def discrete_eigenvalue(n: int, radius: float, frequency: int) -> float:
    h = 2 * math.pi * radius / n
    return 4 * math.sin(math.pi * frequency / n) ** 2 / h**2


def sinc(x: float) -> float:
    return math.sin(x) / x if x else 1.0


def projection_gap(n: int, radius: float, frequency: int, interpolation: str) -> float:
    """Exact L2 projection gap of a sampled complex mode and its continuum mode.

    For linear interpolation the continuum Fourier coefficient is sinc(x)^2
    and the interpolant's L2 norm squared is 1-h^2*lambda/6.  For the
    nearest-cell constant interpolant they are sinc(x) and 1 respectively.
    """
    if interpolation not in ("linear", "nearest"):
        raise ValueError("interpolation must be linear or nearest")
    x = math.pi * frequency / n
    overlap = sinc(x) ** (2 if interpolation == "linear" else 1)
    if interpolation == "linear":
        h = 2 * math.pi * radius / n
        norm_sq = 1 - h**2 * discrete_eigenvalue(n, radius, frequency) / 6
    else:
        norm_sq = 1.0
    cosine_sq = min(1.0, overlap**2 / norm_sq)
    return math.sqrt(max(0.0, 1 - cosine_sq))


def perturbation_angle_sine(gap: float, mix: float) -> float:
    # Low eigenvector of [[0, mix], [mix, gap]] relative to (1, 0).
    return math.sqrt((1 - gap / math.hypot(gap, 2 * mix)) / 2)


def report(
    n: int, radius: float, frequency: int, interpolation: str,
    gap: float, mix: float,
) -> dict[str, object]:
    validate(n, radius, frequency, gap, mix)
    v = sample(n, radius, frequency)
    h = 2 * math.pi * radius / n
    lam = discrete_eigenvalue(n, radius, frequency)
    ml = linear_mass(v, radius)
    return {
        "n": n,
        "radius": radius,
        "frequency": frequency,
        "grid_spacing": h,
        "interpolation": interpolation,
        "discrete_rayleigh": energy(v, radius) / mass(v, radius),
        "formula_eigenvalue": lam,
        "continuum_eigenvalue": frequency**2 / radius**2,
        "interpolated_mass_linear": ml,
        "mass_identity_residual": abs(ml - (mass(v, radius) - h**2 * energy(v, radius) / 6)),
        "interpolated_rayleigh": energy(v, radius) / ml if interpolation == "linear" else None,
        "projection_gap": projection_gap(n, radius, frequency, interpolation),
        "gap_2x2": gap,
        "off_diagonal_mix_2x2": mix,
        "perturbation_angle_sine": perturbation_angle_sine(gap, mix),
        "polluted_zero_multiplicity": 2 if n % 2 == 0 else None,
        "original_zero_multiplicity": 1,
    }


def self_test() -> None:
    for n in (6, 8, 12, 25, 48):
        for frequency in (0, 1, n // 2):
            v = sample(n, 1.7, frequency)
            h = 2 * math.pi * 1.7 / n
            assert abs(mass(v, 1.7) - 1) < 1e-12
            assert abs(energy(v, 1.7) - discrete_eigenvalue(n, 1.7, frequency)) < 1e-10
            assert abs(linear_mass(v, 1.7) - (1 - h**2 * energy(v, 1.7) / 6)) < 1e-12
            for method in ("linear", "nearest"):
                assert 0 <= projection_gap(n, 1.7, frequency, method) <= 1
            if frequency == 0:
                assert projection_gap(n, 1.7, frequency, "linear") == 0
                assert projection_gap(n, 1.7, frequency, "nearest") == 0
    assert projection_gap(48, 1.0, 1, "linear") < projection_gap(12, 1.0, 1, "linear")
    assert projection_gap(48, 1.0, 1, "nearest") < projection_gap(12, 1.0, 1, "nearest")
    assert perturbation_angle_sine(0.01, 0.1) > perturbation_angle_sine(1.0, 0.1)
    assert perturbation_angle_sine(1.0, 0.0) == 0
    for n in (8, 12):
        z = [complex((-1) ** j / math.sqrt(2 * math.pi), 0) for j in range(n)]
        h = 2 * math.pi / n
        assert abs(energy(z, 1.0) - 4 / h**2) < 1e-10
        assert abs(linear_mass(z, 1.0) - 1 / 3) < 1e-12
        assert abs(sum(z)) < 1e-12
    try:
        validate(3, 1, 1, 1, 0)
    except ValueError:
        pass
    else:
        raise AssertionError("n=3 must fail")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--n", type=int, default=24)
    parser.add_argument("--radius", type=float, default=1.0)
    parser.add_argument("--frequency", type=int, default=1)
    parser.add_argument("--interpolation", choices=("linear", "nearest"), default="linear")
    parser.add_argument("--gap", type=float, default=1.0)
    parser.add_argument("--mix", type=float, default=0.1)
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        self_test()
        print("MFL19 spectral bridge: self-test passed")
    else:
        print(json.dumps(report(args.n, args.radius, args.frequency, args.interpolation, args.gap, args.mix),
                         ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
