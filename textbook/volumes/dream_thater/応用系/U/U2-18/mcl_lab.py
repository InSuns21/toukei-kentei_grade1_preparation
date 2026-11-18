#!/usr/bin/env python3
"""U2-18: deterministic one-step Monte Carlo localization on a known 2D map.

Python 3 standard library only. Distances: metres, headings: radians.
The fixed uniforms represent one reproducible multinomial-resampling outcome.
"""
from __future__ import annotations

from dataclasses import dataclass
from math import cos, exp, isclose, sin
from typing import Iterable

DOMAIN = (0.0, 6.0, 0.0, 4.0)
OBSTACLES = (
    (3.0, 4.0, 1.0, 2.0),
    (4.0, 5.0, 2.0, 3.0),
)
RANGE_MAX = 3.0
BIN_SIZE = 1.0
MAX_BIN = 3
SIGMA = 0.5


@dataclass(frozen=True)
class Pose:
    x: float
    y: float
    theta: float


def inside_domain(x: float, y: float) -> bool:
    xmin, xmax, ymin, ymax = DOMAIN
    return xmin < x < xmax and ymin < y < ymax


def inside_rectangle(x: float, y: float, rectangle: tuple[float, ...]) -> bool:
    xmin, xmax, ymin, ymax = rectangle
    return xmin <= x <= xmax and ymin <= y <= ymax


def ray_rectangle_entry(pose: Pose, rectangle: tuple[float, ...],
                        ray_angle: float, maximum: float) -> float | None:
    """Return first intersection of a ray segment with a closed rectangle."""
    vx, vy = cos(ray_angle), sin(ray_angle)
    lo, hi = 0.0, maximum
    xmin, xmax, ymin, ymax = rectangle
    for point, direction, low, high in (
        (pose.x, vx, xmin, xmax),
        (pose.y, vy, ymin, ymax),
    ):
        if abs(direction) < 1e-12:
            if not low <= point <= high:
                return None
            continue
        enter = (low - point) / direction
        leave = (high - point) / direction
        lo = max(lo, min(enter, leave))
        hi = min(hi, max(enter, leave))
        if lo > hi:
            return None
    return lo


def first_hit(pose: Pose, beam_angle: float = 0.0) -> float:
    """Ray trace only when start/end are inside known map and start is free."""
    angle = pose.theta + beam_angle
    endpoint = (
        pose.x + RANGE_MAX * cos(angle),
        pose.y + RANGE_MAX * sin(angle),
    )
    if not inside_domain(pose.x, pose.y) or not inside_domain(*endpoint):
        raise ValueError("ray outside the known map")
    if any(inside_rectangle(pose.x, pose.y, box) for box in OBSTACLES):
        raise ValueError("ray starts in an obstacle")
    hits = [t for box in OBSTACLES
            if (t := ray_rectangle_entry(pose, box, angle, RANGE_MAX)) is not None]
    return min(hits, default=RANGE_MAX)


def beam_probability(observed_bin: int, predicted_range: float) -> float:
    """The normalized finite-bin likelihood of U2-17, not a Gaussian pdf."""
    if not 0 <= observed_bin <= MAX_BIN:
        raise ValueError("invalid measurement bin")
    scores = [exp(-((k * BIN_SIZE - predicted_range) ** 2)
                  / (2 * SIGMA ** 2))
              for k in range(MAX_BIN + 1)]
    denominator = sum(scores)
    if denominator <= 0:
        raise ArithmeticError("beam likelihood normalization failed")
    return scores[observed_bin] / denominator


def normalize(scores: Iterable[float]) -> list[float]:
    values = list(scores)
    total = sum(values)
    if total <= 0:
        raise ArithmeticError("particle weights have zero total")
    return [w / total for w in values]


def resample_labels(labels: list[str], weights: list[float],
                    uniforms: Iterable[float]) -> list[str]:
    """Inverse-CDF multinomial resampling with explicitly fixed uniforms."""
    if len(labels) != len(weights):
        raise ValueError("mismatched particle arrays")
    if not isclose(sum(weights), 1.0, abs_tol=1e-12):
        raise ValueError("weights are not normalized")
    output = []
    for u in uniforms:
        if not 0 <= u < 1:
            raise ValueError("uniform outside [0,1)")
        cumulative = 0.0
        for label, weight in zip(labels, weights):
            cumulative += weight
            if u < cumulative:
                output.append(label)
                break
        else:
            # The last-ulp case can arise when a rounded CDF ends below 1.
            output.append(labels[-1])
    return output


def main() -> None:
    before = {
        "A": Pose(0.5, 1.5, 0),
        "B": Pose(1.5, 1.5, 0),
        "C": Pose(0.5, 2.5, 0),
    }
    # Deterministic world-frame translation 1 metre east.
    after = {key: Pose(p.x + 1.0, p.y, p.theta)
             for key, p in before.items()}
    labels = list(after)
    ranges = [first_hit(after[label]) for label in labels]
    assert ranges == [1.5, 0.5, 2.5], ranges

    # All old particle weights are 1/3; the common factor cancels.
    likelihoods = [beam_probability(1, value) for value in ranges]
    for distance in ranges:
        assert isclose(sum(beam_probability(k, distance)
                           for k in range(MAX_BIN + 1)), 1.0, abs_tol=1e-12)
    weights = normalize(likelihoods)
    assert isclose(sum(weights), 1.0, abs_tol=1e-12)
    assert all(w > 0 for w in weights)
    assert isclose(weights[0], 0.493205250635258, abs_tol=1e-12)
    assert isclose(weights[1], 0.497679432594982, abs_tol=1e-12)
    assert isclose(weights[2], 0.009115316769760, abs_tol=1e-12)

    ess = 1.0 / sum(w * w for w in weights)
    ancestors = resample_labels(labels, weights, [0.2, 0.7, 0.98])
    disappearance = (1.0 - weights[2]) ** 3
    assert ancestors == ["A", "B", "B"]
    assert isclose(ess, 2.0365797175164255, abs_tol=1e-12)
    assert isclose(disappearance, 0.9729025593076063, abs_tol=1e-12)

    # Missing known-map support is never silently identified with 'no hit'.
    try:
        first_hit(Pose(5.0, 1.5, 0))
    except ValueError:
        pass
    else:
        raise AssertionError("map boundary was not enforced")

    print("ranges:", ranges)
    print("posterior:", [round(w, 6) for w in weights])
    print(f"ESS: {ess:.6f}")
    print("ancestors:", ancestors)
    print(f"P(C disappears): {disappearance:.6f}")


if __name__ == "__main__":
    main()
