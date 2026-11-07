"""Continuous Gaussian kernel bias on a circle (deterministic quadrature).

All densities are with respect to arc length; no random sample is generated.
"""

from __future__ import annotations

import argparse
import math


def circle_integral(
    epsilon: float,
    radius: float = 2.0,
    count: int = 16384,
    *,
    chord: bool = False,
    amplitude: float = 0.0,
    target_angle: float = 0.0,
    observable: str = "one",
) -> tuple[float, float]:
    """Return (T_epsilon^p f, T_epsilon^p 1).

    When amplitude=0, density is 1/(2*pi*R), not unit volume density.
    To obtain G_epsilon 1, multiply the returned denominator by 2*pi*R.
    """
    if epsilon <= 0 or radius <= 0 or count < 32:
        raise ValueError("epsilon, radius must be positive and count >= 32")
    if abs(amplitude) >= 1:
        raise ValueError("density must remain strictly positive")
    if observable not in ("one", "cos"):
        raise ValueError("observable must be one or cos")

    step = 2.0 * math.pi / count
    factor = radius * step / math.sqrt(4.0 * math.pi * epsilon)
    total = 0.0
    mass = 0.0
    for j in range(count):
        angle = j * step
        separation = (angle - target_angle + math.pi) % (2.0 * math.pi) - math.pi
        arc = radius * abs(separation)
        distance_squared = (
            4.0 * radius * radius * math.sin(separation / 2.0) ** 2
            if chord
            else arc * arc
        )
        density = (1.0 + amplitude * math.cos(angle)) / (2.0 * math.pi * radius)
        weight = factor * math.exp(-distance_squared / (4.0 * epsilon)) * density
        mass += weight
        total += weight * (math.cos(angle) if observable == "cos" else 1.0)
    return total, mass


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--radius", type=float, default=2.0)
    parser.add_argument("--points", type=int, default=16384)
    parser.add_argument("--amplitude", type=float, default=0.3)
    args = parser.parse_args()

    r = args.radius
    print(f"R={r}, N={args.points}, a={args.amplitude}")
    print("epsilon  intrinsic mass  chord mass  (chord mass-1)/epsilon  normalized drift")
    print(f"targets: mass=1, chord coefficient={1/(4*r*r):.8f}, drift={2*args.amplitude/(r*r):.8f}")
    for epsilon in (0.16, 0.08, 0.04, 0.02):
        intrinsic = circle_integral(epsilon, r, args.points)[1] * 2 * math.pi * r
        extrinsic = circle_integral(epsilon, r, args.points, chord=True)[1] * 2 * math.pi * r
        numerator, denominator = circle_integral(
            epsilon, r, args.points, amplitude=args.amplitude,
            target_angle=math.pi/2, observable="cos"
        )
        drift = numerator / denominator / epsilon
        print(
            f"{epsilon:7.3f}  {intrinsic:14.10f}  {extrinsic:10.7f}"
            f"  {(extrinsic-1)/epsilon:23.8f}  {drift:16.8f}"
        )


if __name__ == "__main__":
    main()
