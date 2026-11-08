"""MFL35 finite E(n)-equivariant coordinate layers and broken baselines.

No learned parameters: deterministic 2D examples verify identities numerically.
All vertices are updated simultaneously from the previous layer's state.
"""

from __future__ import annotations

import argparse
import math
from collections.abc import Iterable

Vec = tuple[float, float]
Mat = tuple[Vec, Vec]
Edge = tuple[int, int]


def shape_data(name: str) -> tuple[list[Vec], list[Edge], list[float]]:
    if name == "triangle":
        return [(0.0, 0.0), (2.0, 0.0), (0.0, 1.0)], [
            (0, 1), (0, 2), (1, 2)], [1.0, 0.0, 0.5]
    if name == "path":
        # The fourth vertex is deliberately isolated.
        return [(0.0, 0.0), (1.0, 0.0), (2.0, 1.0), (4.0, 1.0)], [
            (0, 1), (1, 2)], [1.0, 0.0, 0.5, 2.0]
    if name == "square":
        return [(0.0, 0.0), (1.0, 0.0), (1.0, 1.0), (0.0, 1.0)], [
            (0, 1), (1, 2), (2, 3), (0, 3)], [1.0, 0.0, 0.5, 2.0]
    raise ValueError(f"unknown shape: {name}")


def add(a: Vec, b: Vec) -> Vec:
    return (a[0] + b[0], a[1] + b[1])


def sub(a: Vec, b: Vec) -> Vec:
    return (a[0] - b[0], a[1] - b[1])


def mul(s: float, v: Vec) -> Vec:
    return (s * v[0], s * v[1])


def dot(a: Vec, b: Vec) -> float:
    return a[0] * b[0] + a[1] * b[1]


def matrix_vector(q: Mat, v: Vec) -> Vec:
    return (dot(q[0], v), dot(q[1], v))


def orthogonal(angle_deg: float, reflect: bool) -> Mat:
    angle = math.radians(angle_deg)
    c, s = math.cos(angle), math.sin(angle)
    sign = -1.0 if reflect else 1.0
    return ((sign * c, -s), (sign * s, c))


def transform(points: list[Vec], q: Mat, t: Vec) -> list[Vec]:
    return [add(matrix_vector(q, x), t) for x in points]


def neighbors(count: int, edges: list[Edge]) -> list[list[int]]:
    result: list[list[int]] = [[] for _ in range(count)]
    for i, j in edges:
        if not (0 <= i < count and 0 <= j < count) or i == j:
            raise ValueError("edges must join distinct existing vertices")
        result[i].append(j)
        result[j].append(i)
    return result


def message(hi: float, hj: float, dist2: float, weight: str) -> tuple[float, float]:
    if weight == "distance":
        return dist2, 0.1 * dist2
    if weight == "uniform":
        return 1.0, 0.15
    if weight == "asymmetric":
        # Source feature differs by direction: not centroid-preserving.
        return hi, 0.25 * hi
    raise ValueError(f"unknown weight mode: {weight}")


def one_layer(points: list[Vec], h: list[float], edges: list[Edge],
              weight: str) -> tuple[list[Vec], list[float]]:
    adjacency = neighbors(len(points), edges)
    updated_points: list[Vec] = []
    updated_h: list[float] = []
    for i, adjacent in enumerate(adjacency):
        shift = (0.0, 0.0)
        aggregate = 0.0
        for j in adjacent:
            delta = sub(points[j], points[i])
            m, c = message(h[i], h[j], dot(delta, delta), weight)
            shift = add(shift, mul(c, delta))
            aggregate += m
        updated_points.append(add(points[i], shift))
        updated_h.append(h[i] if weight == "asymmetric" else h[i] + aggregate)
    return updated_points, updated_h


def layers(points: list[Vec], h: list[float], edges: list[Edge],
           weight: str, depth: int) -> tuple[list[Vec], list[float]]:
    if depth < 1:
        raise ValueError("layers must be >= 1")
    xs, hs = list(points), list(h)
    for _ in range(depth):
        xs, hs = one_layer(xs, hs, edges, weight)
    return xs, hs


def max_vec_error(a: list[Vec], b: list[Vec]) -> float:
    return max((math.hypot(*sub(x, y)) for x, y in zip(a, b, strict=True)),
               default=0.0)


def max_scalar_error(a: list[float], b: list[float]) -> float:
    return max((abs(x - y) for x, y in zip(a, b, strict=True)), default=0.0)


def centroid(points: list[Vec]) -> Vec:
    if not points:
        raise ValueError("nonempty point set required")
    return mul(1.0 / len(points), tuple(map(sum, zip(*points, strict=True))))


def relabel(points: list[Vec], h: list[float], edges: list[Edge],
            perm: list[int]) -> tuple[list[Vec], list[float], list[Edge]]:
    # perm[old] = new; independently relabel vertex attributes and edges.
    count = len(points)
    if sorted(perm) != list(range(count)):
        raise ValueError("perm must be a permutation")
    inverse = [perm.index(i) for i in range(count)]
    return ([points[old] for old in inverse],
            [h[old] for old in inverse],
            [(perm[i], perm[j]) for i, j in edges])


def bad_absolute_coordinate(points: list[Vec], edges: list[Edge]) -> list[Vec]:
    adjacent = neighbors(len(points), edges)
    return [add(x, mul(x[0], sum_vectors(sub(points[j], x) for j in adjacent[i])))
            for i, x in enumerate(points)]


def sum_vectors(vectors: Iterable[Vec]) -> Vec:
    result = (0.0, 0.0)
    for v in vectors:
        result = add(result, v)
    return result


def bad_fixed_direction(points: list[Vec]) -> list[Vec]:
    return [add(x, (1.0, 0.0)) for x in points]


def measure(shape: str, weight: str, depth: int, angle: float,
            reflect: bool, shift: Vec) -> dict[str, object]:
    points, edges, h = shape_data(shape)
    q = orthogonal(angle, reflect)
    original_x, original_h = layers(points, h, edges, weight, depth)
    moved_points = transform(points, q, shift)
    moved_x, moved_h = layers(moved_points, h, edges, weight, depth)
    predicted_x = transform(original_x, q, shift)
    perm = list(reversed(range(len(points))))
    perm_points, perm_h, perm_edges = relabel(points, h, edges, perm)
    perm_x, perm_h_after = layers(perm_points, perm_h, perm_edges, weight, depth)
    predicted_perm_x, predicted_perm_h, _ = relabel(original_x, original_h, edges, perm)
    return {
        "original_output": original_x,
        "transformed_output": moved_x,
        "scalar_output": original_h,
        "position_equivariance_error": max_vec_error(moved_x, predicted_x),
        "scalar_invariance_error": max_scalar_error(moved_h, original_h),
        "permutation_position_error": max_vec_error(perm_x, predicted_perm_x),
        "permutation_scalar_error": max_scalar_error(perm_h_after, predicted_perm_h),
        "centroid_change": math.hypot(*sub(centroid(original_x), centroid(points))),
        "bad_absolute_translation_error": max_vec_error(
            bad_absolute_coordinate(transform(points, ((1.0, 0.0), (0.0, 1.0)),
                                              (1.0, 0.0)), edges),
            transform(bad_absolute_coordinate(points, edges),
                      ((1.0, 0.0), (0.0, 1.0)), (1.0, 0.0))),
        "bad_fixed_rotation_error": max_vec_error(
            bad_fixed_direction(transform(points, ((0.0, -1.0), (1.0, 0.0)),
                                          (0.0, 0.0))),
            transform(bad_fixed_direction(points), ((0.0, -1.0), (1.0, 0.0)),
                      (0.0, 0.0))),
    }


def self_test() -> None:
    count = 0
    for shape in ("triangle", "path", "square"):
        for weight in ("distance", "uniform", "asymmetric"):
            for depth in (1, 2, 4):
                for angle in (0.0, 37.0, 90.0):
                    for reflect in (False, True):
                        result = measure(shape, weight, depth, angle, reflect, (3.0, -2.0))
                        for key in ("position_equivariance_error", "scalar_invariance_error",
                                    "permutation_position_error", "permutation_scalar_error"):
                            assert result[key] < 1e-9, (shape, weight, depth, key, result[key])
                        if weight in ("distance", "uniform"):
                            assert result["centroid_change"] < 1e-9
                        assert result["bad_absolute_translation_error"] > 0.5
                        assert result["bad_fixed_rotation_error"] > 1.0
                        count += 1
    points, edges, h = shape_data("triangle")
    output, hh = one_layer(points, [0.0, 0.0, 0.0], edges, "distance")
    expected = [(0.8, 0.1), (0.2, 0.5), (1.0, 0.4)]
    assert max_vec_error(output, expected) < 1e-12
    assert hh == [5.0, 9.0, 6.0]
    path, path_edges, path_h = shape_data("path")
    path_out, path_h_out = layers(path, path_h, path_edges, "distance", 3)
    assert path_out[3] == path[3] and path_h_out[3] == path_h[3]
    print(f"MFL35 deterministic self-test: PASS ({count} transform/layer cases + "
          "relabeling, centroid, isolated vertex, broken controls)")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--shape", choices=("triangle", "path", "square"),
                        default="triangle")
    parser.add_argument("--weight", choices=("distance", "uniform", "asymmetric"),
                        default="distance")
    parser.add_argument("--layers", type=int, default=1)
    parser.add_argument("--angle", type=float, default=90.0)
    parser.add_argument("--shift-x", type=float, default=3.0)
    parser.add_argument("--shift-y", type=float, default=-2.0)
    parser.add_argument("--reflect", action="store_true")
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        self_test()
        return
    result = measure(args.shape, args.weight, args.layers, args.angle, args.reflect,
                     (args.shift_x, args.shift_y))
    print(f"shape={args.shape}, weight={args.weight}, layers={args.layers}, "
          f"angle_deg={args.angle}, reflect={args.reflect}")
    print(f"original_output={result['original_output']}")
    print(f"transformed_output={result['transformed_output']}")
    print(f"scalar_output={result['scalar_output']}")
    for key in ("position_equivariance_error", "scalar_invariance_error",
                "permutation_position_error", "permutation_scalar_error",
                "centroid_change", "bad_absolute_translation_error",
                "bad_fixed_rotation_error"):
        print(f"{key}={result[key]:.6e}")


if __name__ == "__main__":
    main()
