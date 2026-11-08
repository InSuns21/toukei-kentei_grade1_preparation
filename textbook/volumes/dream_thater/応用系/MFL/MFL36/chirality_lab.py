#!/usr/bin/env python3
"""MFL36: reproducible E(3)/SE(3) chirality checks (standard library only)."""

from __future__ import annotations

import argparse
import json
import math
from typing import Sequence

Vector = tuple[float, float, float]
Matrix = tuple[Vector, Vector, Vector]
Points = tuple[Vector, Vector, Vector, Vector]

IDENTITY: Matrix = ((1.0, 0.0, 0.0), (0.0, 1.0, 0.0), (0.0, 0.0, 1.0))
ROTATE: Matrix = ((0.0, -1.0, 0.0), (1.0, 0.0, 0.0), (0.0, 0.0, 1.0))
REFLECT: Matrix = ((-1.0, 0.0, 0.0), (0.0, 1.0, 0.0), (0.0, 0.0, 1.0))


def add(a: Vector, b: Vector) -> Vector:
    return (a[0] + b[0], a[1] + b[1], a[2] + b[2])


def sub(a: Vector, b: Vector) -> Vector:
    return (a[0] - b[0], a[1] - b[1], a[2] - b[2])


def mul(k: float, a: Vector) -> Vector:
    return (k * a[0], k * a[1], k * a[2])


def dot(a: Vector, b: Vector) -> float:
    return sum(a[i] * b[i] for i in range(3))


def cross(a: Vector, b: Vector) -> Vector:
    return (
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0],
    )


def determinant(a: Vector, b: Vector, c: Vector) -> float:
    return dot(a, cross(b, c))


def matvec(q: Matrix, v: Vector) -> Vector:
    return tuple(dot(row, v) for row in q)  # type: ignore[return-value]


def transform(points: Points, q: Matrix, t: Vector) -> Points:
    return tuple(add(matvec(q, p), t) for p in points)  # type: ignore[return-value]


def signed_volume(points: Points) -> float:
    a, b, c = (sub(points[i], points[0]) for i in (1, 2, 3))
    return determinant(a, b, c) / 6.0


def squared_distances(points: Points) -> list[float]:
    return [dot(sub(points[i], points[j]), sub(points[i], points[j]))
            for i in range(4) for j in range(i + 1, 4)]


def update(points: Points, scale: float, with_pseudoscalar: bool) -> Points:
    a, b = sub(points[1], points[0]), sub(points[2], points[0])
    p = 6.0 * signed_volume(points) if with_pseudoscalar else 1.0
    x0 = add(points[0], mul(scale * p, cross(a, b)))
    return (x0, points[1], points[2], points[3])


def norm(a: Vector) -> float:
    return math.sqrt(dot(a, a))


def max_point_error(a: Points, b: Points) -> float:
    return max(norm(sub(a[i], b[i])) for i in range(4))


def calculate(shape: str, transformation: str, scale: float) -> dict[str, object]:
    shapes: dict[str, Points] = {
        "axes": ((0.0, 0.0, 0.0), (1.0, 0.0, 0.0),
                 (0.0, 1.0, 0.0), (0.0, 0.0, 1.0)),
        "skew": ((1.0, -1.0, 2.0), (2.0, 0.0, 2.0),
                 (1.0, 1.0, 3.0), (2.0, -1.0, 4.0)),
    }
    matrices = {"identity": IDENTITY, "rotate": ROTATE, "reflect": REFLECT}
    points, q = shapes[shape], matrices[transformation]
    t = (2.0, -1.0, 3.0)
    moved = transform(points, q, t)
    d0, d1 = squared_distances(points), squared_distances(moved)
    cross_then_move = transform(update(points, scale, False), q, t)
    move_then_cross = update(moved, scale, False)
    polar_then_move = transform(update(points, scale, True), q, t)
    move_then_polar = update(moved, scale, True)
    return {
        "shape": shape,
        "transformation": transformation,
        "det_Q": determinant(*q),
        "translation": t,
        "scale": scale,
        "squared_distances_original": d0,
        "squared_distances_transformed": d1,
        "distance_squared_max_difference": max(abs(a - b) for a, b in zip(d0, d1)),
        "signed_volume_original": signed_volume(points),
        "signed_volume_transformed": signed_volume(moved),
        "cross_update_equivariance_error": max_point_error(cross_then_move, move_then_cross),
        "pseudoscalar_times_cross_update_error": max_point_error(polar_then_move, move_then_polar),
    }


def self_test() -> None:
    for shape in ("axes", "skew"):
        for name in ("identity", "rotate", "reflect"):
            result = calculate(shape, name, 1.0)
            sign = float(result["det_Q"])
            assert abs(float(result["distance_squared_max_difference"])) < 1e-12
            assert math.isclose(float(result["signed_volume_transformed"]),
                                sign * float(result["signed_volume_original"]),
                                abs_tol=1e-12)
            assert float(result["pseudoscalar_times_cross_update_error"]) < 1e-12
            if sign > 0:
                assert float(result["cross_update_equivariance_error"]) < 1e-12
            else:
                assert float(result["cross_update_equivariance_error"]) > 0.1
    axes = calculate("axes", "reflect", 1.0)
    assert math.isclose(float(axes["cross_update_equivariance_error"]), 2.0)
    print("MFL36 chirality lab self-test: PASS (6 transformation cases)")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--shape", choices=("axes", "skew"), default="axes")
    parser.add_argument("--transform", choices=("identity", "rotate", "reflect"),
                        default="reflect")
    parser.add_argument("--scale", type=float, default=1.0)
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        self_test()
    else:
        if not math.isfinite(args.scale):
            parser.error("--scale must be finite")
        print(json.dumps(calculate(args.shape, args.transform, args.scale),
                         ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
