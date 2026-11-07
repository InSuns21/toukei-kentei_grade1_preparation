"""MFL7: deterministic radius, union kNN and mutual kNN graph experiment.

Only the Python standard library is used. All output vertices are 1-based.
The metric is ambient Euclidean distance, not intrinsic manifold distance.
"""

from __future__ import annotations

import argparse
import json
import math
from typing import Iterable


def example_points(dataset: str) -> list[tuple[float, ...]]:
    if dataset == "clusters":
        return [(0.0,), (1.0,), (10.0,), (11.0,)]
    if dataset == "asymmetric":
        return [(0.0,), (1.0,), (3.0,), (100.0,)]
    if dataset == "u":
        # Two branches separated by 0.05; endpoints are first and last.
        return (
            [(0.0, j / 4) for j in range(4, -1, -1)]
            + [(0.05, j / 4) for j in range(0, 5)]
        )
    raise ValueError("Unknown dataset")


def radius_edges(
    points: list[tuple[float, ...]], radius: float
) -> set[tuple[int, int]]:
    if radius <= 0:
        raise ValueError("radius must be strictly positive")
    return {
        (i, j)
        for i in range(len(points))
        for j in range(i + 1, len(points))
        if math.dist(points[i], points[j]) < radius
    }


def knn_edges(
    points: list[tuple[float, ...]], k: int
) -> tuple[set[tuple[int, int]], set[tuple[int, int]]]:
    n = len(points)
    if not 1 <= k < n:
        raise ValueError("k must be between 1 and n-1")
    neighbors = [
        set(
            sorted(
                (j for j in range(n) if j != i),
                key=lambda j: (math.dist(points[i], points[j]), j),
            )[:k]
        )
        for i in range(n)
    ]
    union = {
        (i, j)
        for i in range(n)
        for j in range(i + 1, n)
        if j in neighbors[i] or i in neighbors[j]
    }
    mutual = {
        (i, j)
        for i in range(n)
        for j in range(i + 1, n)
        if j in neighbors[i] and i in neighbors[j]
    }
    return union, mutual


def components(
    vertex_count: int, edges: Iterable[tuple[int, int]]
) -> list[list[int]]:
    adjacency = [set() for _ in range(vertex_count)]
    for i, j in edges:
        adjacency[i].add(j)
        adjacency[j].add(i)
    visited: set[int] = set()
    result = []
    for start in range(vertex_count):
        if start in visited:
            continue
        queue = [start]
        visited.add(start)
        component = []
        for i in queue:
            component.append(i + 1)
            for j in sorted(adjacency[i]):
                if j not in visited:
                    visited.add(j)
                    queue.append(j)
        result.append(sorted(component))
    return result


def describe(n: int, edges: set[tuple[int, int]]) -> dict:
    degrees = [0] * n
    for i, j in edges:
        degrees[i] += 1
        degrees[j] += 1
    return {
        "edges": [[i + 1, j + 1] for i, j in sorted(edges)],
        "degree": degrees,
        "isolated_vertices": [i + 1 for i, degree in enumerate(degrees) if degree == 0],
        "components": components(n, edges),
    }


def self_test() -> None:
    pts = example_points("clusters")
    assert radius_edges(pts, 1.5) == {(0, 1), (2, 3)}
    union, mutual = knn_edges(pts, 1)
    assert union == mutual == {(0, 1), (2, 3)}
    assert components(4, union) == [[1, 2], [3, 4]]
    pts = example_points("asymmetric")
    union, mutual = knn_edges(pts, 1)
    assert union == {(0, 1), (1, 2), (2, 3)}
    assert mutual == {(0, 1)}
    assert describe(4, mutual)["isolated_vertices"] == [3, 4]
    tie_union, tie_mutual = knn_edges([(0.0,), (-1.0,), (1.0,)], 1)
    assert tie_union == {(0, 1), (0, 2)}
    assert tie_mutual == {(0, 1)}
    pts = example_points("u")
    assert (0, len(pts) - 1) in radius_edges(pts, 0.3)
    assert math.isclose(math.dist(pts[0], pts[-1]), 0.05)
    assert len(components(len(pts), radius_edges(pts, 0.3))) == 1
    # Strict threshold: equality is not an edge.
    assert radius_edges([(0.0,), (1.0,)], 1.0) == set()


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dataset", choices=("clusters", "asymmetric", "u"), default="clusters")
    parser.add_argument("--radius", type=float, default=1.5)
    parser.add_argument("--k", type=int, default=1)
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        self_test()
        print("MFL7 neighborhood graph self-tests passed")
        return
    pts = example_points(args.dataset)
    union, mutual = knn_edges(pts, args.k)
    result = {
        "dataset": args.dataset,
        "points": pts,
        "radius": args.radius,
        "k": args.k,
        "tie_break": "ascending (Euclidean distance, zero-based neighbor index)",
        "radius_graph": describe(len(pts), radius_edges(pts, args.radius)),
        "union_knn": describe(len(pts), union),
        "mutual_knn": describe(len(pts), mutual),
    }
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
