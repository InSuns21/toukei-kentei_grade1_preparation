#!/usr/bin/env python3
"""MFL4: reproducible circle covering and bounded radial noise experiment.

All distances are exact consequences of the largest angular sample gap.
No NumPy, plotting library, or discretized test grid is required.
"""

from __future__ import annotations

import argparse
import math
import random
from dataclasses import dataclass


TAU = 2.0 * math.pi


def sample_angles(n: int, amplitude: float, rng: random.Random) -> list[float]:
    """Independent draws from (1 + a cos(theta)) / (2 pi)."""
    if n < 1 or not 0.0 <= amplitude < 1.0:
        raise ValueError("n >= 1 and 0 <= amplitude < 1 are required")
    result: list[float] = []
    while len(result) < n:
        theta = TAU * rng.random()
        # Proposal density is uniform; 1 + a is a global envelope.
        if rng.random() * (1.0 + amplitude) <= 1.0 + amplitude * math.cos(theta):
            result.append(theta)
    return sorted(result)


def largest_gap(angles: list[float]) -> float:
    """Maximum cyclic angular gap in [0, 2 pi]."""
    if not angles:
        raise ValueError("at least one angle is required")
    values = sorted(angles)
    if values[0] < 0.0 or values[-1] >= TAU:
        raise ValueError("angles must lie in [0, 2 pi)")
    gaps = [b - a for a, b in zip(values, values[1:])]
    gaps.append(TAU + values[0] - values[-1])
    return max(gaps)


def clean_fill_distance(max_gap: float) -> float:
    """Exact h(S^1, samples) using chord length."""
    return 2.0 * math.sin(max_gap / 4.0)


def noisy_hausdorff_distance(max_gap: float, noise: float) -> float:
    """Exact d_H(S^1, {(1+noise)*x_i}) for radial outward noise."""
    if noise < 0.0:
        raise ValueError("noise must be nonnegative")
    radius = 1.0 + noise
    # First directed distance maximized at the midpoint of the largest gap;
    # the reverse directed distance is noise, never larger than this value.
    return math.sqrt(
        max(0.0, 1.0 + radius * radius - 2.0 * radius * math.cos(max_gap / 2.0))
    )


def theoretical_bound(n: int, radius: float, amplitude: float) -> tuple[int, float, float]:
    """Circle net K, guaranteed ball mass q, min(1, K exp(-n q))."""
    if n < 1 or not 0.0 < radius < 2.0 or not 0.0 <= amplitude < 1.0:
        raise ValueError("need n>=1, 0<radius<2, 0<=amplitude<1")
    centers = math.ceil(TAU / radius)
    ball_mass_lower = 2.0 * (1.0 - amplitude) / math.pi * math.asin(radius / 4.0)
    return centers, ball_mass_lower, min(1.0, centers * math.exp(-n * ball_mass_lower))


@dataclass(frozen=True)
class Trial:
    fill: float
    hausdorff: float
    missed: bool


def run_trial(n: int, radius: float, amplitude: float, noise: float, rng: random.Random) -> Trial:
    max_gap = largest_gap(sample_angles(n, amplitude, rng))
    fill = clean_fill_distance(max_gap)
    hausdorff = noisy_hausdorff_distance(max_gap, noise)
    if hausdorff > fill + noise + 1e-12:
        raise ArithmeticError("bounded-noise Hausdorff inequality failed")
    return Trial(fill, hausdorff, fill >= radius)


def self_test() -> None:
    assert math.isclose(clean_fill_distance(TAU), 2.0)
    assert math.isclose(clean_fill_distance(math.pi), math.sqrt(2.0))
    assert math.isclose(noisy_hausdorff_distance(TAU, 0.1), 2.1)
    assert math.isclose(largest_gap([0.0, math.pi]), math.pi)
    assert math.isclose(largest_gap([0.0]), TAU)
    centers, q, bound = theoretical_bound(50, 1.0, 0.0)
    assert centers == math.ceil(TAU)
    assert math.isclose(q, 2.0 / math.pi * math.asin(0.25))
    assert 0.0 <= bound <= 1.0
    rng = random.Random(2026)
    for _ in range(100):
        result = run_trial(25, 0.6, 0.5, 0.08, rng)
        assert result.fill >= 0.0 and result.hausdorff >= 0.08
    print("self-test: PASS")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--n", type=int, default=250)
    parser.add_argument("--trials", type=int, default=300)
    parser.add_argument("--radius", type=float, default=0.4, help="target fill radius in (0, 2)")
    parser.add_argument("--density-amplitude", type=float, default=0.6, help="a in [0, 1)")
    parser.add_argument("--noise", type=float, default=0.08, help="outward radial displacement")
    parser.add_argument("--seed", type=int, default=2026)
    parser.add_argument("--csv", action="store_true", help="emit per-trial measurements as CSV")
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        self_test()
        return
    if args.trials < 1 or args.noise < 0.0:
        parser.error("--trials must be positive and --noise nonnegative")
    try:
        centers, q, bound = theoretical_bound(args.n, args.radius, args.density_amplitude)
    except ValueError as exc:
        parser.error(str(exc))
    rng = random.Random(args.seed)
    results = [
        run_trial(args.n, args.radius, args.density_amplitude, args.noise, rng)
        for _ in range(args.trials)
    ]
    observed_failure = sum(trial.missed for trial in results) / args.trials
    if args.csv:
        print("trial,fill_distance,noisy_hausdorff,missed")
        for i, result in enumerate(results, 1):
            print(f"{i},{result.fill:.8f},{result.hausdorff:.8f},{int(result.missed)}")
    else:
        print(f"n={args.n} trials={args.trials} seed={args.seed}")
        print(f"radius={args.radius:g} density_amplitude={args.density_amplitude:g} noise={args.noise:g}")
        print(f"cover_centers={centers} guaranteed_ball_mass={q:.6f}")
        print(f"theoretical_failure_upper_bound={bound:.6f}")
        print(f"observed_failure_frequency={observed_failure:.6f}")
        print(f"mean_clean_fill={sum(t.fill for t in results) / args.trials:.6f}")
        print(f"mean_noisy_hausdorff={sum(t.hausdorff for t in results) / args.trials:.6f}")


if __name__ == "__main__":
    main()
