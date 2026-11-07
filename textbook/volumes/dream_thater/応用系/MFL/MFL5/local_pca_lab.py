#!/usr/bin/env python3
"""MFL5: Local PCA for a parabolic chart, using only Python's standard library.

Samples are from a parameter interval, NOT selected by an ambient Euclidean ball.
This script illustrates population curvature bias and sample/noise fluctuations;
it is not a Monte Carlo certificate for a nonasymptotic theorem.
"""

from __future__ import annotations

import argparse
import math
import random


def population_covariance(radius: float, curvature: float, side: str) -> tuple[float, float, float]:
    """Return C11,C12,C22 of (U, curvature * U**2 / 2)."""
    if radius <= 0.0 or side not in {"one", "symmetric"}:
        raise ValueError("radius must be positive and side must be one/symmetric")
    if side == "one":
        return radius**2 / 12.0, curvature * radius**3 / 24.0, curvature**2 * radius**4 / 45.0
    return radius**2 / 3.0, 0.0, curvature**2 * radius**4 / 45.0


def covariance(points: list[tuple[float, float]]) -> tuple[float, float, float]:
    if len(points) < 2:
        raise ValueError("need at least two points")
    n = len(points)
    mx = sum(x for x, _ in points) / n
    my = sum(y for _, y in points) / n
    a = sum((x - mx) ** 2 for x, _ in points) / n
    b = sum((x - mx) * (y - my) for x, y in points) / n
    c = sum((y - my) ** 2 for _, y in points) / n
    return a, b, c


def spectral_summary(a: float, b: float, c: float) -> tuple[float, float, float, float]:
    """Eigenvalues (descending), eigengap, and acute angle to the x-axis (radians)."""
    gap = math.hypot(a - c, 2.0 * b)
    upper = (a + c + gap) / 2.0
    lower = (a + c - gap) / 2.0
    angle = math.nan if gap == 0.0 else abs(0.5 * math.atan2(2.0 * b, a - c))
    return upper, lower, gap, angle


def generate(n: int, radius: float, curvature: float, side: str, noise: float,
             rng: random.Random) -> list[tuple[float, float]]:
    if n < 2 or radius <= 0.0 or noise < 0.0 or side not in {"one", "symmetric"}:
        raise ValueError("need n>=2, radius>0, noise>=0, side=one/symmetric")
    points = []
    for _ in range(n):
        u = rng.uniform(0.0, radius) if side == "one" else rng.uniform(-radius, radius)
        clean_x, clean_y = u, 0.5 * curvature * u * u
        points.append((clean_x + rng.uniform(-noise, noise), clean_y + rng.uniform(-noise, noise)))
    return points


def self_test() -> None:
    assert covariance([(-1.0, 0.0), (0.0, 0.0), (1.0, 0.0)]) == (2 / 3, 0.0, 0.0)
    upper, lower, gap, angle = spectral_summary(2.0, 0.0, 1.0)
    assert (upper, lower, gap, angle) == (2.0, 1.0, 1.0, 0.0)
    _, _, _, angle = spectral_summary(1.0, 0.0, 2.0)
    assert math.isclose(angle, math.pi / 2)
    _, _, gap, angle = spectral_summary(1.0, 0.0, 1.0)
    assert gap == 0.0 and math.isnan(angle)
    r, k = 0.3, 2.0
    a, b, c = population_covariance(r, k, "one")
    assert math.isclose(a, r**2 / 12) and math.isclose(b, k * r**3 / 24)
    assert math.isclose(c, k**2 * r**4 / 45)
    rng = random.Random(2026)
    sample = generate(80000, r, k, "one", 0.0, rng)
    ca, cb, cc = covariance(sample)
    assert all(abs(v - w) < 0.002 for v, w in zip((ca, cb, cc), (a, b, c)))
    rng1, rng2 = random.Random(7), random.Random(7)
    assert generate(20, r, k, "symmetric", 0.01, rng1) == generate(20, r, k, "symmetric", 0.01, rng2)
    print("self-test: PASS")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--n", type=int, default=500)
    parser.add_argument("--radius", type=float, default=0.4)
    parser.add_argument("--curvature", type=float, default=2.0)
    parser.add_argument("--side", choices=("one", "symmetric"), default="one")
    parser.add_argument("--noise", type=float, default=0.02,
                        help="per-coordinate uniform noise in [-noise,noise]")
    parser.add_argument("--seed", type=int, default=2026)
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        self_test()
        return
    try:
        sample = generate(args.n, args.radius, args.curvature, args.side, args.noise,
                          random.Random(args.seed))
        theoretical = population_covariance(args.radius, args.curvature, args.side)
    except ValueError as exc:
        parser.error(str(exc))
    a, b, c = covariance(sample)
    _, _, gap, angle = spectral_summary(a, b, c)
    _, _, theory_gap, theory_angle = spectral_summary(*theoretical)
    print(f"n={args.n} radius={args.radius:g} curvature={args.curvature:g} side={args.side}")
    print(f"noise={args.noise:g} seed={args.seed} (independent coordinate-uniform noise)")
    print(f"empirical_cov=({a:.8g}, {b:.8g}, {c:.8g})")
    print(f"population_clean_cov=({theoretical[0]:.8g}, {theoretical[1]:.8g}, {theoretical[2]:.8g})")
    print(f"eigengap={gap:.8g} clean_population_eigengap={theory_gap:.8g}")
    print(f"angle_deg={math.degrees(angle):.6f} clean_population_angle_deg={math.degrees(theory_angle):.6f}")
    print(f"projection_error={math.sin(angle):.8g} (undefined if eigengap=0)")


if __name__ == "__main__":
    main()
