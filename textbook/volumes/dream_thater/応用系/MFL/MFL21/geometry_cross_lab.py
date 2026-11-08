"""MFL21: deterministic, standard-library-only near-manifold diagnostics.

The oracle distances refer to *latent* arclength, not noisy coordinates.
Spectral errors compare two FINITE normalized graph Laplacians on the same
vertices; they are not continuum spectral convergence guarantees.
"""

from __future__ import annotations

import argparse
import heapq
import json
import math
import random
from dataclasses import dataclass


@dataclass(frozen=True)
class Point:
    xy: tuple[float, float]
    s: float
    branch: int
    tangent: tuple[float, float]


def validate(args: argparse.Namespace) -> None:
    if args.preset not in ("circle", "u", "cross", "branches"):
        raise ValueError("unknown preset")
    if not 8 <= args.points <= 60:
        raise ValueError("points must be between 8 and 60")
    if not 1 <= args.neighbors < args.points:
        raise ValueError("neighbors must be between 1 and points-1")
    for key in ("radius", "gap", "noise", "density", "threshold"):
        x = getattr(args, key)
        if not math.isfinite(x):
            raise ValueError(f"{key} must be finite")
    if args.radius <= 0 or args.gap <= 0 or args.density <= 0:
        raise ValueError("radius, gap and density must be positive")
    if args.noise < 0 or args.threshold <= 0:
        raise ValueError("noise must be nonnegative and threshold positive")


def warped(t: float, density: float) -> float:
    """Monotone deterministic density gradient; 1 means uniform arclength."""
    return t**density


def latent_points(preset: str, n: int, radius: float, gap: float,
                  density: float) -> tuple[list[Point], float | None]:
    result: list[Point] = []
    circumference: float | None = None
    if preset == "circle":
        circumference = 2 * math.pi * radius
        for j in range(n):
            s = circumference * warped(j / n, density)
            a = s / radius
            result.append(Point((radius * math.cos(a), radius * math.sin(a)),
                                s, 0, (-math.sin(a), math.cos(a))))
    elif preset == "u":
        bend_radius = gap / 2
        upright = 2 * radius
        length = 2 * upright + math.pi * bend_radius
        for j in range(n):
            s = length * warped(j / (n - 1), density)
            if s <= upright:
                x, y = -bend_radius, upright - s
                tang = (0.0, -1.0)
            elif s <= upright + math.pi * bend_radius:
                angle = math.pi + (s - upright) / bend_radius
                x, y = bend_radius * math.cos(angle), bend_radius * math.sin(angle)
                tang = (-math.sin(angle), math.cos(angle))
            else:
                x, y = bend_radius, s - upright - math.pi * bend_radius
                tang = (0.0, 1.0)
            result.append(Point((x, y), s, 0, tang))
    else:
        # Each stratum is sampled independently, with two labelled copies at
        # the cross origin.  They are identified by a zero-length oracle edge.
        left_count = n // 2
        counts = [left_count, n - left_count]
        for branch, count in enumerate(counts):
            for j in range(count):
                u = 2 * warped(j / (count - 1), density) - 1
                s = radius * u
                if preset == "cross":
                    xy = (s, 0.0) if branch == 0 else (0.0, s)
                    tangent = (1.0, 0.0) if branch == 0 else (0.0, 1.0)
                else:
                    xy = (s, -gap / 2) if branch == 0 else (s, gap / 2)
                    tangent = (1.0, 0.0)
                result.append(Point(xy, s, branch, tangent))
    return result, circumference


def latent_distance(a: Point, b: Point, preset: str,
                    circumference: float | None) -> float:
    if a.branch == b.branch:
        ds = abs(a.s - b.s)
        return min(ds, circumference - ds) if circumference is not None else ds
    if preset == "cross":
        return abs(a.s) + abs(b.s)  # via the singular junction
    return math.inf  # disconnected branches in the latent model


def norm(a: tuple[float, float], b: tuple[float, float]) -> float:
    return math.hypot(a[0] - b[0], a[1] - b[1])


def observed_points(latent: list[Point], sigma: float, seed: int) -> list[tuple[float, float]]:
    rng = random.Random(seed)
    return [(p.xy[0] + rng.gauss(0, sigma),
             p.xy[1] + rng.gauss(0, sigma)) for p in latent]


def pair_distances(xy: list[tuple[float, float]]) -> list[list[float]]:
    n = len(xy)
    return [[norm(xy[i], xy[j]) for j in range(n)] for i in range(n)]


def make_graph(dist: list[list[float]], method: str, threshold: float,
               k: int) -> set[tuple[int, int]]:
    n = len(dist)
    if method == "radius":
        return {(i, j) for i in range(n) for j in range(i + 1, n)
                if dist[i][j] < threshold}
    directed = set()
    for i in range(n):
        nearest = sorted((dist[i][j], j) for j in range(n) if j != i)
        directed.update((i, j) for _, j in nearest[:k])
    return {(min(i, j), max(i, j)) for i, j in directed}


def oracle_edges(latent: list[Point], preset: str) -> set[tuple[int, int]]:
    result = set()
    groups: dict[int, list[int]] = {}
    for i, p in enumerate(latent):
        groups.setdefault(p.branch, []).append(i)
    for indices in groups.values():
        for i, j in zip(indices, indices[1:]):
            result.add((i, j))
        if preset == "circle":
            result.add((indices[0], indices[-1]))
    if preset == "cross":
        # The oracle connects the two branches at their (possibly unobserved)
        # junction, by a virtual edge of length |s_i|+|s_j|.  This is exact
        # for branch-to-branch paths, regardless of density.
        a = min(groups[0], key=lambda i: abs(latent[i].s))
        b = min(groups[1], key=lambda i: abs(latent[i].s))
        result.add((min(a, b), max(a, b)))
    return result


def components(n: int, edges: set[tuple[int, int]]) -> int:
    adj = [[] for _ in range(n)]
    for i, j in edges:
        adj[i].append(j)
        adj[j].append(i)
    seen = set()
    count = 0
    for v in range(n):
        if v in seen:
            continue
        count += 1
        pending = [v]
        seen.add(v)
        while pending:
            for w in adj[pending.pop()]:
                if w not in seen:
                    seen.add(w)
                    pending.append(w)
    return count


def shortest_paths(dist: list[list[float]], edges: set[tuple[int, int]]) -> list[list[float]]:
    n = len(dist)
    adj = [[] for _ in range(n)]
    for i, j in edges:
        adj[i].append((j, dist[i][j]))
        adj[j].append((i, dist[i][j]))
    output = []
    for src in range(n):
        best = [math.inf] * n
        best[src] = 0.0
        queue = [(0.0, src)]
        while queue:
            cur, i = heapq.heappop(queue)
            if cur > best[i]:
                continue
            for j, d in adj[i]:
                new = cur + d
                if new < best[j]:
                    best[j] = new
                    heapq.heappush(queue, (new, j))
        output.append(best)
    return output


def local_pca_errors(latent: list[Point], observed: list[tuple[float, float]],
                     dist: list[list[float]], threshold: float) -> tuple[float | None, int]:
    errs = []
    ambiguous = 0
    for i, p in enumerate(latent):
        neighbors = [j for j in range(len(latent)) if dist[i][j] < threshold]
        if len(neighbors) < 3:
            continue
        if any(latent[j].branch != p.branch for j in neighbors):
            ambiguous += 1
        mx = sum(observed[j][0] for j in neighbors) / len(neighbors)
        my = sum(observed[j][1] for j in neighbors) / len(neighbors)
        xx = sum((observed[j][0] - mx)**2 for j in neighbors)
        xy = sum((observed[j][0] - mx)*(observed[j][1] - my) for j in neighbors)
        yy = sum((observed[j][1] - my)**2 for j in neighbors)
        if math.hypot(xx - yy, 2 * xy) < 1e-12:
            continue  # top direction is not identifiable
        a = 0.5 * math.atan2(2 * xy, xx - yy)
        u = (math.cos(a), math.sin(a))
        # In R^2, ||uu^T - tt^T||_op = |det(u,t)|.
        errs.append(abs(u[0] * p.tangent[1] - u[1] * p.tangent[0]))
    return (sum(errs) / len(errs) if errs else None, ambiguous)


def jacobi_symmetric_eigenvalues(matrix: list[list[float]]) -> list[float]:
    """Cyclic Jacobi rotations; suitable for the small n of this lab."""
    n = len(matrix)
    a = [row[:] for row in matrix]
    for _ in range(15 * n * n):
        i, j = max(((i, j) for i in range(n) for j in range(i + 1, n)),
                   key=lambda pair: abs(a[pair[0]][pair[1]]))
        if abs(a[i][j]) < 1e-12:
            break
        theta = 0.5 * math.atan2(2 * a[i][j], a[j][j] - a[i][i])
        c, s = math.cos(theta), math.sin(theta)
        # Columns [c,-s] and [s,c] eliminate the off-diagonal.
        old_ii, old_jj, old_ij = a[i][i], a[j][j], a[i][j]
        a[i][i] = c*c*old_ii - 2*c*s*old_ij + s*s*old_jj
        a[j][j] = s*s*old_ii + 2*c*s*old_ij + c*c*old_jj
        a[i][j] = a[j][i] = 0.0
        for k in range(n):
            if k in (i, j):
                continue
            ai, aj = a[k][i], a[k][j]
            a[k][i] = a[i][k] = c*ai - s*aj
            a[k][j] = a[j][k] = s*ai + c*aj
    else:
        raise ArithmeticError("Jacobi solver failed to converge")
    return sorted(a[i][i] for i in range(n))


def normalized_laplacian_eigenvalues(n: int, edges: set[tuple[int, int]]) -> list[float]:
    degrees = [0] * n
    for i, j in edges:
        degrees[i] += 1
        degrees[j] += 1
    a = [[0.0] * n for _ in range(n)]
    for i in range(n):
        if degrees[i]:
            a[i][i] = 1.0
    for i, j in edges:
        a[i][j] = a[j][i] = -1.0 / math.sqrt(degrees[i] * degrees[j])
    return jacobi_symmetric_eigenvalues(a)


def report(args: argparse.Namespace) -> dict[str, object]:
    validate(args)
    latent, circumference = latent_points(args.preset, args.points, args.radius,
                                          args.gap, args.density)
    xy = observed_points(latent, args.noise, args.seed)
    dist = pair_distances(xy)
    graph = make_graph(dist, args.method, args.threshold, args.neighbors)
    oracle = oracle_edges(latent, args.preset)
    paths = shortest_paths(dist, graph)
    tangent_error, mixed = local_pca_errors(latent, xy, dist, args.threshold)
    missing, evaluated, signed, abs_errors = 0, 0, [], []
    for i in range(len(latent)):
        for j in range(i + 1, len(latent)):
            true = latent_distance(latent[i], latent[j], args.preset, circumference)
            if not math.isfinite(true) or true < 1e-10:
                continue
            estimate = paths[i][j]
            if not math.isfinite(estimate):
                missing += 1
                continue
            evaluated += 1
            signed.append((estimate - true) / true)
            abs_errors.append(abs(estimate - true) / true)
    shortcut = 0
    cross_stratum_edges = 0
    for i, j in graph:
        if latent[i].branch != latent[j].branch:
            cross_stratum_edges += 1
        true = latent_distance(latent[i], latent[j], args.preset, circumference)
        if not math.isfinite(true) or true > 1.25 * max(dist[i][j], 1e-12):
            shortcut += 1
    eig = normalized_laplacian_eigenvalues(len(latent), graph)
    oracle_eig = normalized_laplacian_eigenvalues(len(latent), oracle)
    m = min(5, len(latent))
    return {
        "settings": {k: getattr(args, k) for k in ("preset", "points", "radius",
                     "gap", "noise", "density", "seed", "method", "neighbors", "threshold")},
        "ground_truth": "latent arclength; cross through singular junction; branches disconnected",
        "true_components": 2 if args.preset == "branches" else 1,
        "observed_components": components(len(latent), graph),
        "edges": len(graph),
        "cross_stratum_edges": cross_stratum_edges,
        "shortcut_edges_ratio_1_25": shortcut,
        "tangent_projection_error_mean": tangent_error,
        "mixed_stratum_local_pca_windows": mixed,
        "geodesic_pairs_evaluated": evaluated,
        "geodesic_pairs_missing": missing,
        "geodesic_relative_error_mean": sum(abs_errors) / evaluated if evaluated else None,
        "geodesic_signed_relative_bias": sum(signed) / evaluated if evaluated else None,
        "normalized_graph_spectrum_first_five": eig[:m],
        "oracle_graph_spectrum_first_five": oracle_eig[:m],
        "finite_graph_spectrum_l2_error_first_five": math.sqrt(sum(
            (eig[i] - oracle_eig[i])**2 for i in range(m))),
        "note": "finite-graph diagnostic only; no continuum eigenspace theorem; one seed is not a guarantee",
    }


def self_test() -> None:
    from argparse import Namespace
    base = dict(preset="circle", points=24, radius=1.0, gap=0.35,
                noise=0.0, density=1.0, seed=7, method="radius",
                threshold=0.35, neighbors=2)
    a = report(Namespace(**base))
    assert a["observed_components"] == 1
    assert a["shortcut_edges_ratio_1_25"] == 0
    assert a["tangent_projection_error_mean"] is not None
    assert a["tangent_projection_error_mean"] < 0.12
    assert abs(a["normalized_graph_spectrum_first_five"][0]) < 1e-9
    assert a == report(Namespace(**base))  # seed + arithmetic reproducibility
    b = report(Namespace(**{**base, "preset": "branches", "threshold": 0.25}))
    assert b["observed_components"] == 2
    assert b["cross_stratum_edges"] == 0
    c = report(Namespace(**{**base, "preset": "branches", "threshold": 0.65}))
    assert c["cross_stratum_edges"] > 0 and c["shortcut_edges_ratio_1_25"] > 0
    assert c["observed_components"] == 1  # false connectivity
    cross = report(Namespace(**{**base, "preset": "cross", "threshold": 0.65}))
    assert cross["mixed_stratum_local_pca_windows"] > 0
    assert cross["true_components"] == 1
    u = report(Namespace(**{**base, "preset": "u", "threshold": 0.35}))
    assert u["true_components"] == 1
    # Fixed graph eigenvalue invariance and exact zero graph spectrum.
    assert normalized_laplacian_eigenvalues(3, set()) == [0.0, 0.0, 0.0]
    v = normalized_laplacian_eigenvalues(2, {(0, 1)})
    assert all(abs(x-y) < 1e-9 for x, y in zip(v, (0, 2)))
    print("self-test: OK (circle, U, cross, branches, spectral solver)")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--preset", choices=("circle", "u", "cross", "branches"), default="circle")
    parser.add_argument("--points", type=int, default=24)
    parser.add_argument("--radius", type=float, default=1.0)
    parser.add_argument("--gap", type=float, default=0.35)
    parser.add_argument("--noise", type=float, default=0.0)
    parser.add_argument("--density", type=float, default=1.0)
    parser.add_argument("--seed", type=int, default=7)
    parser.add_argument("--method", choices=("radius", "knn"), default="radius")
    parser.add_argument("--neighbors", type=int, default=2)
    parser.add_argument("--threshold", type=float, default=0.35)
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        self_test()
    else:
        print(json.dumps(report(args), indent=2, ensure_ascii=False, allow_nan=False))


if __name__ == "__main__":
    main()
