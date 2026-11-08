"""MFL34: rigid-motion invariants and equivariant edge vectors.

Finite deterministic examples only; no data-fitting or approximation theorem is
claimed. The edge set is held fixed under the ambient rigid motion.
"""

from __future__ import annotations

import argparse
import math

Vec = tuple[float, float]
Mat = tuple[Vec, Vec]
Edge = tuple[int, int]


def positions(shape: str) -> tuple[list[Vec], list[Edge]]:
    if shape == "triangle":
        return [(0.0, 0.0), (2.0, 0.0), (0.0, 1.0)], [(0, 1), (1, 2), (0, 2)]
    if shape == "square":
        return [(0.0, 0.0), (1.0, 0.0), (1.0, 1.0), (0.0, 1.0)], [
            (0, 1), (1, 2), (2, 3), (0, 3)]
    if shape == "rhombus":
        return [(0.0, 0.0), (1.0, 0.0), (1.6, 0.8), (0.6, 0.8)], [
            (0, 1), (1, 2), (2, 3), (0, 3)]
    raise ValueError(f"unknown shape: {shape}")


def sub(a: Vec, b: Vec) -> Vec:
    return (a[0] - b[0], a[1] - b[1])


def dot(a: Vec, b: Vec) -> float:
    return a[0] * b[0] + a[1] * b[1]


def matrix_vector(q: Mat, v: Vec) -> Vec:
    return (dot(q[0], v), dot(q[1], v))


def add(a: Vec, b: Vec) -> Vec:
    return (a[0] + b[0], a[1] + b[1])


def det(q: Mat) -> float:
    return q[0][0] * q[1][1] - q[0][1] * q[1][0]


def orthogonal(angle_degrees: float, reflect: bool) -> Mat:
    angle = math.radians(angle_degrees)
    c, s = math.cos(angle), math.sin(angle)
    # Rotation times diag(-1, 1) for reflect=True.
    sign = -1.0 if reflect else 1.0
    return ((sign * c, -s), (sign * s, c))


def transform(points: list[Vec], q: Mat, t: Vec) -> list[Vec]:
    return [add(matrix_vector(q, x), t) for x in points]


def squared_dist(points: list[Vec], i: int, j: int) -> float:
    r = sub(points[j], points[i])
    return dot(r, r)


def gram(points: list[Vec], i: int, j: int, k: int) -> float:
    return dot(sub(points[j], points[i]), sub(points[k], points[i]))


def oriented_area(points: list[Vec], i: int, j: int, k: int) -> float:
    a = sub(points[j], points[i])
    b = sub(points[k], points[i])
    return (a[0] * b[1] - a[1] * b[0]) / 2.0


def features(points: list[Vec], edges: list[Edge]) -> tuple[list[float], list[Vec]]:
    # Scalar sum of squared neighbor distances and vector sum of relative edges.
    h = [0.0 for _ in points]
    s = [(0.0, 0.0) for _ in points]
    for i, j in edges:
        length2 = squared_dist(points, i, j)
        r = sub(points[j], points[i])
        h[i] += length2
        h[j] += length2
        s[i] = add(s[i], r)
        s[j] = add(s[j], (-r[0], -r[1]))
    return h, s


def vec_error(a: Vec, b: Vec) -> float:
    return math.hypot(a[0] - b[0], a[1] - b[1])


def calculate(shape: str, angle: float, reflect: bool, shift: Vec) -> dict[str, object]:
    points, edges = positions(shape)
    q = orthogonal(angle, reflect)
    moved = transform(points, q, shift)
    h, s = features(points, edges)
    moved_h, moved_s = features(moved, edges)
    distance_error = max(abs(squared_dist(points, i, j) - squared_dist(moved, i, j))
                         for i, j in edges)
    vector_error = max(vec_error(sub(moved[j], moved[i]),
                                 matrix_vector(q, sub(points[j], points[i])))
                       for i, j in edges)
    scalar_error = max(abs(a - b) for a, b in zip(h, moved_h, strict=True))
    feature_vector_error = max(vec_error(ms, matrix_vector(q, original))
                               for ms, original in zip(moved_s, s, strict=True))
    a, b = oriented_area(points, 0, 1, 2), oriented_area(moved, 0, 1, 2)
    area_error = abs(b - det(q) * a)
    # The second ray must also be an edge from vertex 0 in the 4-cycle.
    neighbor = 2 if shape == "triangle" else 3
    g = gram(points, 0, 1, neighbor)
    moved_g = gram(moved, 0, 1, neighbor)
    lengths = squared_dist(points, 0, 1), squared_dist(points, 0, neighbor)
    cosine = g / math.sqrt(lengths[0] * lengths[1])
    return {
        "q": q,
        "det": det(q),
        "shift": shift,
        "points": points,
        "moved": moved,
        "edge_squared_distances": [squared_dist(points, i, j) for i, j in edges],
        "diagonal_02_squared": squared_dist(points, 0, 2),
        "cosine_at_0": cosine,
        "gram_error": abs(moved_g - g),
        "area_before": a,
        "area_after": b,
        "distance_error": distance_error,
        "vector_error": vector_error,
        "scalar_feature_error": scalar_error,
        "vector_feature_error": feature_vector_error,
        "area_error": area_error,
        "absolute_coordinate_change": max(abs(y[0] - x[0]) for x, y in zip(points, moved, strict=True)),
    }


def test_permutations(shape: str) -> None:
    points, edges = positions(shape)
    h, s = features(points, edges)
    perm = list(reversed(range(len(points))))  # old i -> new perm[i]
    perm_points = [points[perm.index(i)] for i in range(len(points))]
    perm_edges = [(perm[i], perm[j]) for i, j in edges]
    hh, ss = features(perm_points, perm_edges)
    for i in range(len(points)):
        old = perm.index(i)
        assert math.isclose(hh[i], h[old], abs_tol=1e-12)
        assert vec_error(ss[i], s[old]) < 1e-12


def self_test() -> None:
    for shape in ("triangle", "square", "rhombus"):
        test_permutations(shape)
        for angle in (0.0, 37.0, 90.0, 180.0):
            for reflect in (False, True):
                result = calculate(shape, angle, reflect, (3.0, -2.0))
                for key in ("distance_error", "vector_error", "scalar_feature_error",
                            "vector_feature_error", "gram_error", "area_error"):
                    assert result[key] < 1e-12, (shape, angle, reflect, key, result[key])
                assert math.isclose(result["det"], -1.0 if reflect else 1.0,
                                    abs_tol=1e-12)
    triangle = calculate("triangle", 0.0, True, (0.0, 0.0))
    assert math.isclose(triangle["area_before"], 1.0)
    assert math.isclose(triangle["area_after"], -1.0)
    square = calculate("square", 0.0, False, (0.0, 0.0))
    rhombus = calculate("rhombus", 0.0, False, (0.0, 0.0))
    assert square["edge_squared_distances"] == [1.0] * 4
    assert all(abs(d - 1.0) < 1e-12 for d in rhombus["edge_squared_distances"])
    assert math.isclose(square["diagonal_02_squared"], 2.0)
    assert math.isclose(rhombus["diagonal_02_squared"], 16.0 / 5.0)
    print("MFL34 deterministic self-test: PASS (3 shapes, 8 transformations each, relabeling)")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--shape", choices=("triangle", "square", "rhombus"), default="triangle")
    parser.add_argument("--angle", type=float, default=90.0, help="rotation degrees")
    parser.add_argument("--shift-x", type=float, default=0.0)
    parser.add_argument("--shift-y", type=float, default=0.0)
    parser.add_argument("--reflect", action="store_true", help="mirror before rotation")
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        self_test()
        return
    result = calculate(args.shape, args.angle, args.reflect, (args.shift_x, args.shift_y))
    print(f"shape={args.shape}, rotation_deg={args.angle}, reflect={args.reflect}, det(Q)={result['det']:.6f}")
    print(f"translation={result['shift']}, first_point_before={result['points'][0]}, after={result['moved'][0]}")
    print(f"edge_squared_distances={result['edge_squared_distances']}")
    print(f"nonedge_or_diagonal_02_squared={result['diagonal_02_squared']:.8f}")
    print(f"cosine_at_vertex_0={result['cosine_at_0']:.8f}")
    print(f"oriented_area_before={result['area_before']:.8f}, after={result['area_after']:.8f}")
    for key in ("distance_error", "vector_error", "gram_error", "scalar_feature_error",
                "vector_feature_error", "area_error", "absolute_coordinate_change"):
        print(f"{key}={result[key]:.3e}")


if __name__ == "__main__":
    main()
