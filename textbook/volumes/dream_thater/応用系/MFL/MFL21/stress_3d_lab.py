"""MFL21 extra 3D stress cases: double helix, Swiss roll, and outliers.

The Swiss-roll oracle uses its exact unrolled metric. Outliers are excluded
from intrinsic-distance/tangent evaluation, but remain graph vertices.
All spectra compare finite graphs, NEVER a continuous Laplace operator.
"""

from __future__ import annotations

import argparse
import json
import math
import random
from dataclasses import dataclass

from geometry_cross_lab import (components, make_graph,
                                normalized_laplacian_eigenvalues, shortest_paths)


@dataclass(frozen=True)
class Datum:
    xyz: tuple[float, float, float]
    metric: tuple[float, float]  # unrolled intrinsic coordinates
    branch: int
    normal_or_tangent: tuple[float, float, float] | None


def unit(v: tuple[float, float, float]) -> tuple[float, float, float]:
    length = math.sqrt(sum(x*x for x in v))
    return tuple(x/length for x in v)  # type: ignore[return-value]


def roll_arclength(t: float, radius: float) -> float:
    return 0.5*radius*(t*math.sqrt(1 + t*t) + math.asinh(t))


def latent(preset: str, n: int, radius: float, gap: float, density: float,
           pitch: float) -> tuple[list[Datum], set[tuple[int, int]], int]:
    out: list[Datum] = []
    edges: set[tuple[int, int]] = set()
    if preset == "double-helix":
        counts = [n//2, n-n//2]
        for branch, count in enumerate(counts):
            start = len(out)
            for j in range(count):
                t = 2*math.pi*(j/(count-1))**density
                theta = t+branch*math.pi
                direction = unit((-radius*math.sin(theta), radius*math.cos(theta), pitch))
                out.append(Datum(
                    (radius*math.cos(theta), radius*math.sin(theta), pitch*t),
                    (math.sqrt(radius*radius+pitch*pitch)*t, 0), branch, direction))
                if j:
                    edges.add((start+j-1, start+j))
        dim = 1
    elif preset == "swiss-roll":
        if n % 4:
            raise ValueError("Swiss roll requires points divisible by 4")
        columns, rows = n//4, 4
        # Unrolled coordinates are (integral sqrt(1+t^2) dt, z).
        for j in range(columns):
            t = 1.5*math.pi+3*math.pi*(j/(columns-1))**density
            rx, ry = radius*(math.cos(t)-t*math.sin(t)), radius*(math.sin(t)+t*math.cos(t))
            surface_normal = unit((-ry, rx, 0))
            for k in range(rows):
                z = gap*(2*k/(rows-1)-1)
                i = len(out)
                out.append(Datum(
                    (radius*t*math.cos(t), radius*t*math.sin(t), z),
                    (roll_arclength(t, radius), z), 0, surface_normal))
                if k:
                    edges.add((i-1, i))
                if j:
                    edges.add((i-rows, i))
        dim = 2
    else:
        if n < 10:
            raise ValueError("outliers require at least 10 points")
        m = n-2
        for j in range(m):
            t = 2*math.pi*(j/m)**density
            direction = unit((-math.sin(t), math.cos(t), 0))
            out.append(Datum((radius*math.cos(t), radius*math.sin(t), 0),
                             (radius*t, 0), 0, direction))
            if j:
                edges.add((j-1, j))
        edges.add((0, m-1))
        # No latent curve/tangent/distance truth is asserted for the contaminants.
        out.extend((Datum((radius+gap, 0, 0), (0, 0), -1, None),
                    Datum((radius+gap, 0, gap), (0, 0), -1, None)))
        dim = 1
    return out, edges, dim


def truth(a: Datum, b: Datum, preset: str, radius: float) -> float | None:
    if a.branch < 0 or b.branch < 0:
        return None
    if a.branch != b.branch:
        return math.inf
    if preset == "outliers":
        length = 2*math.pi*radius
        ds = abs(a.metric[0]-b.metric[0])
        return min(ds, length-ds)
    return math.dist(a.metric, b.metric)


def principal_direction(xyz: list[tuple[float, float, float]],
                        indices: list[int], dim: int) -> tuple[float, float, float] | None:
    m = len(indices)
    if m < 4:
        return None
    means = [sum(xyz[i][k] for i in indices)/m for k in range(3)]
    a = [[sum((xyz[i][r]-means[r])*(xyz[i][c]-means[c]) for i in indices)/m
          for c in range(3)] for r in range(3)]
    eigenvectors = [[float(r == c) for c in range(3)] for r in range(3)]
    # Each Jacobi rotation updates both the covariance and eigenvector basis.
    for _ in range(100):
        i, j = max(((0, 1), (0, 2), (1, 2)), key=lambda p: abs(a[p[0]][p[1]]))
        if abs(a[i][j]) < 1e-12:
            break
        theta = 0.5*math.atan2(2*a[i][j], a[j][j]-a[i][i])
        c, s = math.cos(theta), math.sin(theta)
        ii, jj, ij = a[i][i], a[j][j], a[i][j]
        a[i][i] = c*c*ii-2*c*s*ij+s*s*jj
        a[j][j] = s*s*ii+2*c*s*ij+c*c*jj
        a[i][j] = a[j][i] = 0.0
        for k in range(3):
            if k in (i, j):
                continue
            ai, aj = a[k][i], a[k][j]
            a[k][i] = a[i][k] = c*ai-s*aj
            a[k][j] = a[j][k] = s*ai+c*aj
        for k in range(3):
            vi, vj = eigenvectors[k][i], eigenvectors[k][j]
            eigenvectors[k][i] = c*vi-s*vj
            eigenvectors[k][j] = s*vi+c*vj
    order = sorted(range(3), key=lambda i: a[i][i])
    selected = order[-1] if dim == 1 else order[0]
    companion = order[-2] if dim == 1 else order[1]
    if abs(a[selected][selected]-a[companion][companion]) < 1e-10:
        return None
    return unit(tuple(eigenvectors[k][selected] for k in range(3)))


def report(args: argparse.Namespace) -> dict[str, object]:
    if not 12 <= args.points <= 60 or args.neighbors < 1 or args.neighbors >= args.points:
        raise ValueError("points must be 12..60 and neighbors in 1..n-1")
    if args.preset not in ("double-helix", "swiss-roll", "outliers"):
        raise ValueError("invalid preset")
    for key in ("radius", "gap", "density", "pitch", "threshold", "noise"):
        if not math.isfinite(getattr(args, key)):
            raise ValueError(f"{key} must be finite")
    if min(args.radius, args.gap, args.density, args.threshold, args.pitch) <= 0 or args.noise < 0:
        raise ValueError("radius/gap/density/threshold/pitch positive, noise nonnegative")
    original, oracle, dim = latent(args.preset, args.points, args.radius,
                                   args.gap, args.density, args.pitch)
    rng = random.Random(args.seed)
    xyz = [tuple(coord + rng.gauss(0, args.noise) for coord in p.xyz)
           for p in original]
    dist = [[math.dist(a, b) for b in xyz] for a in xyz]
    edges = make_graph(dist, args.method, args.threshold, args.neighbors)
    paths = shortest_paths(dist, edges)
    pca = []
    mixed = 0
    for i, p in enumerate(original):
        if p.normal_or_tangent is None:
            continue
        neighbors = [j for j in range(len(xyz)) if dist[i][j] < args.threshold]
        if any(original[j].branch != p.branch for j in neighbors):
            mixed += 1
        estimate = principal_direction(xyz, neighbors, dim)
        if estimate is None:
            continue
        cos_angle = sum(estimate[k]*p.normal_or_tangent[k] for k in range(3))
        pca.append(math.sqrt(max(0, 1-min(1, cos_angle*cos_angle))))
    missing = 0
    abs_error = []
    shortcut = 0
    contamination_edges = 0
    for i, j in edges:
        if -1 in (original[i].branch, original[j].branch):
            contamination_edges += 1
        t = truth(original[i], original[j], args.preset, args.radius)
        if t is not None and (not math.isfinite(t) or t > 1.25*max(dist[i][j], 1e-12)):
            shortcut += 1
    for i in range(len(xyz)):
        for j in range(i+1, len(xyz)):
            t = truth(original[i], original[j], args.preset, args.radius)
            if t is None or not math.isfinite(t) or t < 1e-10:
                continue
            if not math.isfinite(paths[i][j]):
                missing += 1
            else:
                abs_error.append(abs(paths[i][j]-t)/t)
    eig = normalized_laplacian_eigenvalues(len(xyz), edges)
    ideal_eig = normalized_laplacian_eigenvalues(len(xyz), oracle)
    return {
        "settings": {k: getattr(args, k) for k in ("preset", "points", "radius",
                     "gap", "pitch", "noise", "density", "seed", "method", "threshold", "neighbors")},
        "intrinsic_metric": ("unrolled planar surface" if args.preset == "swiss-roll"
                             else "helix arclength per strand" if args.preset == "double-helix"
                             else "circle arclength (outlier pairs excluded)"),
        "manifold_dimension": dim,
        "oracle_components_including_isolated_contaminants": components(len(xyz), oracle),
        "observed_components": components(len(xyz), edges),
        "edges": len(edges),
        "mixed_or_contaminated_pca_windows": mixed,
        "tangent_or_normal_projection_error_mean": sum(pca)/len(pca) if pca else None,
        "pca_points_evaluated": len(pca),
        "shortcut_candidate_edges": shortcut,
        "contamination_edges": contamination_edges,
        "geodesic_pairs_missing": missing,
        "geodesic_pairs_evaluated": len(abs_error),
        "geodesic_relative_error_mean": sum(abs_error)/len(abs_error) if abs_error else None,
        "finite_graph_spectrum_l2_error_first_five": math.sqrt(sum(
            (eig[i]-ideal_eig[i])**2 for i in range(5))),
        "note": "fixed-design one-seed experiment; reference graph is finite; outliers lack intrinsic truth",
    }


def self_test() -> None:
    from argparse import Namespace
    base = dict(preset="double-helix", points=24, radius=1.0, gap=1.0, pitch=0.2,
                noise=0.0, density=1.0, seed=7, method="radius", threshold=0.8, neighbors=2)
    helix = report(Namespace(**base))
    assert helix["oracle_components_including_isolated_contaminants"] == 2
    assert helix["contamination_edges"] == 0
    assert helix == report(Namespace(**base))
    roll = report(Namespace(**{**base, "preset": "swiss-roll", "points": 32,
                                "radius": 0.2, "threshold": 1.5}))
    assert roll["manifold_dimension"] == 2 and roll["oracle_components_including_isolated_contaminants"] == 1
    outliers = report(Namespace(**{**base, "preset": "outliers",
                                    "gap": 0.2, "threshold": 0.8}))
    assert outliers["oracle_components_including_isolated_contaminants"] == 3
    assert outliers["geodesic_pairs_evaluated"] > 0
    assert outliers["contamination_edges"] > 0
    print("self-test: OK (double helix, Swiss roll, outliers, PCA/spectrum)")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--preset", choices=("double-helix", "swiss-roll", "outliers"),
                        default="double-helix")
    parser.add_argument("--points", type=int, default=24)
    parser.add_argument("--radius", type=float, default=1.0)
    parser.add_argument("--gap", type=float, default=1.0)
    parser.add_argument("--pitch", type=float, default=0.2)
    parser.add_argument("--noise", type=float, default=0)
    parser.add_argument("--density", type=float, default=1.0)
    parser.add_argument("--seed", type=int, default=7)
    parser.add_argument("--method", choices=("radius", "knn"), default="radius")
    parser.add_argument("--threshold", type=float, default=0.8)
    parser.add_argument("--neighbors", type=int, default=2)
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        self_test()
    else:
        print(json.dumps(report(args), indent=2, ensure_ascii=False, allow_nan=False))


if __name__ == "__main__":
    main()
