"""Small reproducible finite-graph Laplacian Eigenmaps laboratory.

Uses only the Python standard library.  The graph topology is prescribed, so
the experiment tests the spectral step rather than a point-cloud estimator.
"""

import argparse
import json
import math


def symmetric_eigen(matrix, tolerance=1e-13, sweeps=10000):
    """Jacobi diagonalization of a real symmetric matrix (small n)."""
    n = len(matrix)
    a = [row[:] for row in matrix]
    v = [[float(i == j) for j in range(n)] for i in range(n)]
    for _ in range(sweeps):
        p, q = 0, 0
        maximum = 0.0
        for i in range(n):
            for j in range(i + 1, n):
                if abs(a[i][j]) > maximum:
                    maximum, p, q = abs(a[i][j]), i, j
        if maximum < tolerance:
            break
        tau = (a[q][q] - a[p][p]) / (2.0 * a[p][q])
        t = math.copysign(1.0, tau) / (abs(tau) + math.sqrt(1.0 + tau * tau))
        c = 1.0 / math.sqrt(1.0 + t * t)
        s = t * c
        app, aqq, apq = a[p][p], a[q][q], a[p][q]
        a[p][p] = app - t * apq
        a[q][q] = aqq + t * apq
        a[p][q] = a[q][p] = 0.0
        for k in range(n):
            if k not in (p, q):
                akp, akq = a[k][p], a[k][q]
                a[k][p] = a[p][k] = c * akp - s * akq
                a[k][q] = a[q][k] = s * akp + c * akq
            vkp, vkq = v[k][p], v[k][q]
            v[k][p] = c * vkp - s * vkq
            v[k][q] = s * vkp + c * vkq
    else:
        raise ArithmeticError("Jacobi iteration did not converge")
    order = sorted(range(n), key=lambda i: a[i][i])
    return [(a[j][j], [v[i][j] for i in range(n)]) for j in order]


def components(weights):
    remaining = set(range(len(weights)))
    output = []
    while remaining:
        seed = min(remaining)
        group, queue = [], [seed]
        remaining.remove(seed)
        while queue:
            i = queue.pop()
            group.append(i)
            for j in sorted(remaining):
                if weights[i][j] > 0:
                    remaining.remove(j)
                    queue.append(j)
        output.append(sorted(group))
    return output


def graph(case, bridge=0.01, weight_scale=1.0):
    if bridge <= 0 or weight_scale <= 0:
        raise ValueError("bridge and weight_scale must be positive")
    edges = {
        "path3": (3, [(0, 1, 1.0), (1, 2, 1.0)]),
        "disconnected": (4, [(0, 1, 1.0), (2, 3, 1.0)]),
        "isolated": (4, [(0, 1, 1.0), (1, 2, 1.0)]),
        "weak-bridge": (4, [(0, 1, 1.0), (1, 2, bridge), (2, 3, 1.0)]),
    }
    n, links = edges[case]
    weights = [[0.0] * n for _ in range(n)]
    for i, j, value in links:
        weights[i][j] = weights[j][i] = weight_scale * value
    return weights


def _dot(a, b):
    return sum(x * y for x, y in zip(a, b))


def _zero_modes(degrees, groups):
    """Set first zero mode to sqrt(degree), Gram-Schmidt the component modes."""
    n = len(degrees)
    first = [math.sqrt(d) for d in degrees]
    scale = math.sqrt(_dot(first, first))
    basis = [[x / scale for x in first]]
    for group in groups[:-1]:
        candidate = [math.sqrt(degrees[i]) if i in group else 0.0 for i in range(n)]
        for previous in basis:
            projection = _dot(candidate, previous)
            candidate = [x - projection * y for x, y in zip(candidate, previous)]
        size = math.sqrt(_dot(candidate, candidate))
        if size < 1e-12:
            raise ArithmeticError("dependent component null modes")
        basis.append([x / size for x in candidate])
    return basis


def calculate(case="path3", dim=1, bridge=0.01, weight_scale=1.0):
    weights = graph(case, bridge, weight_scale)
    n = len(weights)
    degree_all = [sum(row) for row in weights]
    keep = [i for i, d in enumerate(degree_all) if d > 0]
    excluded = [i + 1 for i, d in enumerate(degree_all) if d == 0]
    N = len(keep)
    if not (1 <= dim <= N - 1):
        raise ValueError("dim must be between 1 and positive-degree vertex count - 1")
    w = [[weights[i][j] for j in keep] for i in keep]
    degrees = [degree_all[i] for i in keep]
    laplacian = [[(degrees[i] if i == j else 0.0) - w[i][j]
                  for j in range(N)] for i in range(N)]
    normalized = [[laplacian[i][j] / math.sqrt(degrees[i] * degrees[j])
                   for j in range(N)] for i in range(N)]
    groups = components(w)
    # Numerically tiny positive eigenvalues are NOT null modes: the component
    # count determines the exact dimension of the kernel.
    raw = symmetric_eigen(normalized)
    k = len(groups)
    positive = [(value, vec) for value, vec in raw[k:]]
    zeros = _zero_modes(degrees, groups)
    spectrum = [(0.0, vec) for vec in zeros] + positive
    chosen = spectrum[1:dim + 1]
    coords = [[vec[i] / math.sqrt(degrees[i]) for _, vec in chosen]
              for i in range(N)]
    center = [sum(degrees[i] * coords[i][a] for i in range(N))
              for a in range(dim)]
    gram = [[sum(degrees[i] * coords[i][a] * coords[i][b] for i in range(N))
             for b in range(dim)] for a in range(dim)]
    residuals = []
    for a, (value, _) in enumerate(chosen):
        residuals.append(math.sqrt(sum((sum(laplacian[i][j] * coords[j][a]
                                             for j in range(N))
                                        - value * degrees[i] * coords[i][a]) ** 2
                                       for i in range(N))))
    energy = sum(w[i][j] * sum((coords[i][a] - coords[j][a]) ** 2
                                   for a in range(dim))
                 for i in range(N) for j in range(i + 1, N))
    return {
        "case": case, "dim": dim, "vertices": [i + 1 for i in keep],
        "excluded_isolates": excluded, "connected_components": [[keep[i] + 1 for i in group]
                                                   for group in groups],
        "degrees": degrees, "weights": w, "laplacian": laplacian,
        "normalized_laplacian": normalized,
        "eigenvalues": [val for val, _ in spectrum],
        "chosen_eigenvalues": [val for val, _ in chosen],
        "coordinates": coords, "degree_weighted_center": center,
        "degree_weighted_gram": gram,
        "eigen_residual_norms": residuals, "edge_energy": energy,
        "spectral_energy": sum(val for val, _ in chosen),
        "note": "For disconnected graphs, zero modes after the first global constant remain."
                if k > 1 else "All coordinates are determined only up to orthogonal changes.",
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--case", choices=["path3", "disconnected", "isolated", "weak-bridge"],
                        default="path3")
    parser.add_argument("--dim", type=int, default=1)
    parser.add_argument("--bridge", type=float, default=0.01)
    parser.add_argument("--weight-scale", type=float, default=1.0)
    args = parser.parse_args()
    print(json.dumps(calculate(args.case, args.dim, args.bridge, args.weight_scale),
                     ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
