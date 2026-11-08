"""MFL33: deterministic lazy diffusion and relay-bottleneck experiments.

Only the Python standard library is used. Each graph's nodes are zero-based.
The normalized centered-variation and remote linear sensitivity are different
diagnostics: neither is a surrogate for the other.
"""

from __future__ import annotations

import argparse
from math import isclose, sqrt


def graph(name: str, bridge_weight: float) -> tuple[tuple[int, int, float], ...]:
    if name == "path":
        return ((0, 1, 1.0), (1, 2, 1.0))
    return (
        (0, 1, 1.0), (1, 2, 1.0), (2, 0, 1.0),
        (3, 4, 1.0), (4, 5, 1.0), (5, 3, 1.0),
        (2, 3, bridge_weight),
    )


def laplacian(n: int, edges: tuple[tuple[int, int, float], ...]) -> list[list[float]]:
    result = [[0.0] * n for _ in range(n)]
    for i, j, weight in edges:
        assert 0 <= i < n and 0 <= j < n and i != j and weight > 0
        result[i][i] += weight
        result[j][j] += weight
        result[i][j] -= weight
        result[j][i] -= weight
    return result


def apply(matrix: list[list[float]], vector: list[float]) -> list[float]:
    return [sum(a * b for a, b in zip(row, vector, strict=True)) for row in matrix]


def lazy_operator(l: list[list[float]], fraction: float) -> tuple[list[list[float]], float]:
    n = len(l)
    d_max = max(l[i][i] for i in range(n))
    assert d_max > 0 and 0 < fraction <= 1
    tau = fraction / (2.0 * d_max)
    b = [[(1.0 if i == j else 0.0) - tau * l[i][j]
          for j in range(n)] for i in range(n)]
    for i in range(n):
        assert all(value >= -1e-14 for value in b[i])
        assert isclose(sum(b[i]), 1.0, abs_tol=1e-12)
        for j in range(n):
            assert isclose(b[i][j], b[j][i], abs_tol=1e-12)
    return b, tau


def centered_norm(vector: list[float]) -> float:
    avg = sum(vector) / len(vector)
    return sqrt(sum((x - avg) ** 2 for x in vector))


def dot(x: list[float], y: list[float]) -> float:
    return sum(a * b for a, b in zip(x, y, strict=True))


def square_distance_sum(vector: list[float]) -> float:
    return sum((vector[i] - vector[j]) ** 2
               for i in range(len(vector)) for j in range(i + 1, len(vector)))


def run_graph(name: str, depth: int, fraction: float, bridge_weight: float) -> None:
    n = 3 if name == "path" else 6
    edges = graph(name, bridge_weight)
    l = laplacian(n, edges)
    b, tau = lazy_operator(l, fraction)
    initial = [1.0, 0.0, 0.0] if name == "path" else [1.0] * 3 + [-1.0] * 3
    signal = initial[:]
    source, target = 0, n - 1
    impulse = [1.0 if i == source else 0.0 for i in range(n)]
    baseline = centered_norm(initial)
    saved = {0, 1, 2, depth // 2, depth}
    print(f"graph={name} nodes={n} tau={tau:.9g} depth={depth} "
          f"bridge_weight={bridge_weight:.9g}")
    print("depth,centered_ratio,remote_sensitivity")
    for k in range(depth + 1):
        if k in saved:
            print(f"{k},{centered_norm(signal)/baseline:.9f},{impulse[target]:.9f}")
        assert isclose(sum(signal), sum(initial), abs_tol=1e-10)
        assert isclose(square_distance_sum(signal),
                       n * centered_norm(signal) ** 2, abs_tol=1e-10)
        if k < depth:
            signal = apply(b, signal)
            impulse = apply(b, impulse)

    if name == "path":
        # Eigendirections (1,1,1), (1,0,-1), (1,-2,1) have eigenvalues 0,1,3.
        for k in (0, 1, 2, depth):
            theoretical = (0.5 * (1 - tau) ** (2 * k)
                           + (1.0 / 6.0) * (1 - 3 * tau) ** (2 * k))
            v = initial[:]
            for _ in range(k):
                v = apply(b, v)
            assert isclose(centered_norm(v) ** 2, theoretical, abs_tol=1e-11)
        print("path exact spectral decomposition: passed")
    else:
        contrast = [1.0] * 3 + [-1.0] * 3
        energy = dot(contrast, apply(l, contrast))
        assert isclose(energy, 4.0 * bridge_weight, abs_tol=1e-10)
        assert isclose(dot(contrast, contrast), 6.0, abs_tol=1e-10)
        after_one = apply(b, contrast)
        expected_square = 6 - 8 * tau * bridge_weight + 8 * tau**2 * bridge_weight**2
        assert isclose(centered_norm(after_one) ** 2, expected_square, abs_tol=1e-10)
        print(f"bridge Rayleigh upper bound lambda_2 <= {2*bridge_weight/3:.9g}")
        print("bridge one-layer Dirichlet and centered-norm identities: passed")


def run_relay(sources: int) -> None:
    # One d=1 message must carry m independent leaf signals to the target.
    gradient = [1.0 / sources] * sources
    unit_difference = [1.0, -1.0] + [0.0] * (sources - 2)
    assert isclose(dot(gradient, unit_difference), 0.0, abs_tol=1e-12)
    assert isclose(dot(gradient, gradient), 1.0 / sources, abs_tol=1e-12)
    print(f"relay_sources={sources} intermediate_dimension=1 leaf_to_target_distance=2")
    print(f"each_source_sensitivity={1/sources:.9f} "
          f"jacobian_norm={1/sqrt(sources):.9f} jacobian_rank=1")
    print("nonzero (1,-1,0,...,0) indistinguishable from zero: passed")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--graph", choices=("path", "bridge"), default="path")
    parser.add_argument("--depth", type=int, default=8)
    parser.add_argument("--lazy", type=float, default=1.0,
                        help="fraction in (0,1] of tau=1/(2*d_max)")
    parser.add_argument("--bridge-weight", type=float, default=0.05)
    parser.add_argument("--sources", type=int, default=4)
    args = parser.parse_args()
    parser.error("depth must be between 2 and 200") if not 2 <= args.depth <= 200 else None
    parser.error("lazy must be in (0,1]") if not 0 < args.lazy <= 1 else None
    parser.error("bridge-weight must be positive") if args.bridge_weight <= 0 else None
    parser.error("sources must be between 2 and 200") if not 2 <= args.sources <= 200 else None
    run_graph(args.graph, args.depth, args.lazy, args.bridge_weight)
    run_relay(args.sources)


if __name__ == "__main__":
    main()
