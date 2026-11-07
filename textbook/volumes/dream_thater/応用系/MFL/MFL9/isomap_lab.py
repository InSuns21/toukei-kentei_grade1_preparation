#!/usr/bin/env python3
"""MFL9: finite Isomap examples using the Python standard library only.

This educational implementation uses an all-sources Dijkstra computation and
the small Jacobi eigensolver from the preceding MFL8 lesson. It is not intended
for large data sets. Distances and spectral tolerances have different meanings.
"""

from __future__ import annotations

import argparse
import heapq
import json
import math
from pathlib import Path
import sys

# Reuse the canonical Classical MDS algorithm from the direct prerequisite.
sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "MFL8"))
from classical_mds_lab import classical_mds  # noqa: E402


def examples() -> dict[str, tuple[list[tuple[float, float]], list[list[float]]]]:
    arc = [(math.cos(j * math.pi / 8), math.sin(j * math.pi / 8))
           for j in range(5)]
    arc_lengths = [j * math.pi / 8 for j in range(5)]
    u = [(0.0, 0.0), (0.0, 1.0), (0.0, 2.0),
         (0.1, 2.0), (0.1, 1.0), (0.1, 0.0)]
    u_lengths = [0.0, 1.0, 2.0, 2.1, 3.1, 4.1]
    square = [(0.0, 0.0), (1.0, 0.0), (1.0, 1.0), (0.0, 1.0)]

    def line_metric(lengths: list[float]) -> list[list[float]]:
        return [[abs(a - b) for b in lengths] for a in lengths]

    square_metric = [[min(abs(i - j), 4 - abs(i - j)) * 1.0
                      for j in range(4)] for i in range(4)]
    return {
        "arc": (arc, line_metric(arc_lengths)),
        "u": (u, line_metric(u_lengths)),
        "square": (square, square_metric),
    }


def radius_edges(points: list[tuple[float, ...]], radius: float
                 ) -> list[tuple[int, int, float]]:
    if not math.isfinite(radius) or radius <= 0:
        raise ValueError("radius must be finite and positive")
    if not 2 <= len(points) <= 30:
        raise ValueError("2 <= number of points <= 30 is required")
    if any(not all(math.isfinite(x) for x in point) for point in points):
        raise ValueError("all coordinates must be finite")
    dim = len(points[0])
    if dim == 0 or any(len(point) != dim for point in points):
        raise ValueError("points must share a positive coordinate dimension")
    result = []
    for i in range(len(points)):
        for j in range(i + 1, len(points)):
            length = math.dist(points[i], points[j])
            if length < radius:
                result.append((i, j, length))
    return result


def shortest_paths(n: int, edges: list[tuple[int, int, float]]
                   ) -> list[list[float]]:
    adjacent: list[list[tuple[int, float]]] = [[] for _ in range(n)]
    for i, j, length in edges:
        if not (0 <= i < n and 0 <= j < n and i != j):
            raise ValueError("invalid edge")
        if not math.isfinite(length) or length < 0:
            raise ValueError("edge lengths must be finite and nonnegative")
        adjacent[i].append((j, length))
        adjacent[j].append((i, length))

    result = []
    for source in range(n):
        dist = [math.inf] * n
        dist[source] = 0.0
        heap = [(0.0, source)]
        while heap:
            length, u = heapq.heappop(heap)
            if length > dist[u]:
                continue
            for v, edge_length in adjacent[u]:
                alternative = length + edge_length
                if alternative < dist[v]:
                    dist[v] = alternative
                    heapq.heappush(heap, (alternative, v))
        result.append(dist)
    return result


def connected_components(distances: list[list[float]]) -> list[list[int]]:
    components: list[list[int]] = []
    unseen = set(range(len(distances)))
    while unseen:
        start = min(unseen)
        component = sorted(i for i in unseen if math.isfinite(distances[start][i]))
        unseen.difference_update(component)
        components.append(component)
    return components


def evaluate(case: str, radius: float, dim: int, tol: float = 1e-10) -> dict:
    if case not in examples():
        raise ValueError(f"unknown case: {case}")
    points, intrinsic = examples()[case]
    if not 1 <= dim <= len(points) - 1:
        raise ValueError("dim must lie between 1 and n-1")
    edges = radius_edges(points, radius)
    distances = shortest_paths(len(points), edges)
    components = connected_components(distances)
    result = {
        "case": case,
        "radius": radius,
        "dimension": dim,
        "points": points,
        "edges": [{"i": i + 1, "j": j + 1, "length": length}
                  for i, j, length in edges],
        "components": [[i + 1 for i in part] for part in components],
        "connected": len(components) == 1,
        "shortest_path_distances": [
            [x if math.isfinite(x) else None for x in row] for row in distances
        ],
        "intrinsic_distances": intrinsic,
        "mds": None,
        "max_geometric_distance_error": None,
    }
    if len(components) == 1:
        result["max_geometric_distance_error"] = max(
            abs(distances[i][j] - intrinsic[i][j])
            for i in range(len(points)) for j in range(len(points))
        )
        result["mds"] = classical_mds(distances, dim, tol)
    return result


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--case", choices=examples(), default="arc")
    parser.add_argument("--radius", type=float, default=None)
    parser.add_argument("--dim", type=int, default=2)
    parser.add_argument("--tol", type=float, default=1e-10)
    args = parser.parse_args()
    radius = args.radius if args.radius is not None else (
        0.5 if args.case == "arc" else 1.1
    )
    print(json.dumps(evaluate(args.case, radius, args.dim, args.tol),
                     indent=2, ensure_ascii=False, allow_nan=False))


if __name__ == "__main__":
    main()
