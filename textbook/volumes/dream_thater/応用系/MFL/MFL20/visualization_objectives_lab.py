"""Finite-point comparison of t-SNE and UMAP objectives (MFL20).

This evaluates supplied coordinates; it does not claim to optimize an embedding.
Pure Python, deterministic ties, no dependencies beyond the standard library.
"""

from __future__ import annotations

import argparse
import json
import math


BRIDGE = [0.0, 0.10, 0.23, 0.31, 1.70, 1.78, 1.91, 2.00]
RING_ANGLES = [0.00, 0.71, 1.55, 2.28, 3.16, 3.90, 4.78, 5.61]


def preset_points(preset: str, gap: float) -> tuple[list[list[float]], list[list[float]]]:
    if not math.isfinite(gap) or gap <= 0:
        raise ValueError("gap must be finite and positive")
    if preset == "bridge":
        x = [[z] for z in BRIDGE]
        # Separation of the two drawing blocks is exactly 'gap'.
        y = [[z, 0.0] for z in BRIDGE[:4]]
        y += [[0.31 + gap + z - 1.70, 0.0] for z in BRIDGE[4:]]
        return x, y
    if preset == "ring":
        x = [[math.cos(t), math.sin(t)] for t in RING_ANGLES]
        return x, [[1.2 * v[0], 0.8 * v[1]] for v in x]
    raise ValueError("unknown preset")


def check_points(x: list[list[float]], y: list[list[float]]) -> None:
    if not isinstance(x, list) or not isinstance(y, list) or len(x) != len(y) or len(x) < 4:
        raise ValueError("both point lists must contain at least 4 corresponding points")
    for points in (x, y):
        dim = len(points[0])
        if dim < 1:
            raise ValueError("coordinate dimensions must be positive")
        if any(not isinstance(row, list) or len(row) != dim for row in points):
            raise ValueError("all points in each space must have the same dimension")
        if any(not isinstance(v, (int, float)) or not math.isfinite(v)
               for row in points for v in row):
            raise ValueError("all coordinates must be finite numbers")
        if any(sum((a - b) ** 2 for a, b in zip(points[i], points[j])) == 0
               for i in range(len(points)) for j in range(i)):
            raise ValueError("each space needs pairwise distinct points")


def distances(points: list[list[float]]) -> list[list[float]]:
    return [
        [math.dist(points[i], points[j]) for j in range(len(points))]
        for i in range(len(points))
    ]


def neighbors(d: list[list[float]], i: int) -> list[int]:
    return sorted((j for j in range(len(d)) if j != i), key=lambda j: (d[i][j], j))


def conditional_perplexity(
    squared: list[float], target: float,
) -> tuple[list[float], float, float]:
    """Stable binary search for inverse bandwidth beta=1/(2 sigma^2)."""
    m = len(squared)
    if not (1 < target < m):
        raise ValueError("perplexity must be strictly between 1 and n-1")
    low = min(squared)

    def probabilities(beta: float) -> tuple[list[float], float]:
        raw = [math.exp(-beta * (e - low)) for e in squared]
        total = sum(raw)
        p = [v / total for v in raw]
        entropy = -sum(v * math.log(v) for v in p if v) / math.log(2)
        return p, 2**entropy

    left, right = 0.0, 1.0
    for _ in range(100):
        if probabilities(right)[1] <= target:
            break
        right *= 2
    else:
        raise ValueError("perplexity cannot be attained with tied nearest distances")
    for _ in range(100):
        mid = (left + right) / 2
        if probabilities(mid)[1] > target:
            left = mid
        else:
            right = mid
    p, actual = probabilities((left + right) / 2)
    return p, (left + right) / 2, actual


def tsne_probabilities(
    d: list[list[float]], perplexity: float,
) -> tuple[list[list[float]], list[float], list[float]]:
    n = len(d)
    conditional = [[0.0] * n for _ in range(n)]
    betas, attained = [], []
    for i in range(n):
        ids = [j for j in range(n) if j != i]
        row, beta, actual = conditional_perplexity([d[i][j] ** 2 for j in ids], perplexity)
        betas.append(beta)
        attained.append(actual)
        for j, p in zip(ids, row):
            conditional[i][j] = p
    p = [[0.0] * n for _ in range(n)]
    for i in range(n):
        for j in range(n):
            if i != j:
                p[i][j] = (conditional[i][j] + conditional[j][i]) / (2 * n)
    return p, betas, attained


def student_probabilities(d: list[list[float]]) -> list[list[float]]:
    n = len(d)
    weights = [[0 if i == j else 1 / (1 + d[i][j] ** 2) for j in range(n)]
               for i in range(n)]
    z = sum(map(sum, weights))
    return [[w / z for w in row] for row in weights]


def tsne_kl(p: list[list[float]], q: list[list[float]]) -> float:
    return sum(p[i][j] * math.log(p[i][j] / q[i][j])
               for i in range(len(p)) for j in range(len(p)) if i != j)


def tsne_gradient(
    y: list[list[float]], p: list[list[float]], q: list[list[float]],
) -> list[list[float]]:
    grad = [[0.0] * len(y[0]) for _ in y]
    for i in range(len(y)):
        for j in range(len(y)):
            if i == j:
                continue
            r2 = sum((a - b) ** 2 for a, b in zip(y[i], y[j]))
            c = 4 * (p[i][j] - q[i][j]) / (1 + r2)
            for d in range(len(y[0])):
                grad[i][d] += c * (y[i][d] - y[j][d])
    return grad


def umap_weights(
    d: list[list[float]], k: int,
) -> tuple[list[list[float]], list[float], list[float]]:
    n = len(d)
    if not 3 <= k < n:
        raise ValueError("UMAP neighbors must satisfy 3 <= neighbors < n")
    directed = [[0.0] * n for _ in range(n)]
    rhos, sigmas = [], []
    for i in range(n):
        ids = neighbors(d, i)[:k]
        rho = d[i][ids[0]]
        offsets = [max(0.0, d[i][j] - rho) for j in ids]
        goal = math.log2(k)

        def total(sigma: float) -> float:
            return sum(math.exp(-v / sigma) for v in offsets)

        left, right = 0.0, max(offsets)
        if right == 0:
            raise ValueError("UMAP bandwidth has no solution for equal distances")
        for _ in range(80):
            if total(right) >= goal:
                break
            right *= 2
        else:
            raise ValueError("UMAP bandwidth target cannot be reached")
        for _ in range(100):
            mid = (left + right) / 2
            if total(mid) > goal:
                right = mid
            else:
                left = mid
        sigma = (left + right) / 2
        if not sigma or not math.isfinite(sigma) or abs(total(sigma) - goal) > 1e-7:
            raise ValueError("UMAP bandwidth target cannot be attained (distance ties?)")
        rhos.append(rho)
        sigmas.append(sigma)
        for j, v in zip(ids, offsets):
            directed[i][j] = math.exp(-v / sigma)
    fuzzy = [[0.0] * n for _ in range(n)]
    for i in range(n):
        for j in range(n):
            if i != j:
                s, t = directed[i][j], directed[j][i]
                fuzzy[i][j] = s + t - s * t
    return fuzzy, rhos, sigmas


def umap_bernoulli_loss(
    fuzzy: list[list[float]], d: list[list[float]], a: float, b: float,
) -> float:
    if not (a > 0 and b > 0 and math.isfinite(a) and math.isfinite(b)):
        raise ValueError("low-dimensional a,b must be positive and finite")
    total = 0.0
    for i in range(len(d)):
        for j in range(i):
            r = d[i][j]
            # This form is stable even for fairly large point separation.
            power = a * r ** (2 * b)
            if not math.isfinite(power) or power <= 0:
                raise ValueError("drawing distances/parameters cannot produce finite probabilities")
            v = 1 / (1 + power)
            w = fuzzy[i][j]
            if w:
                total += w * math.log(w / v)
            if w < 1:
                total += (1 - w) * math.log((1 - w) / (1 - v))
    return total


def rank_scores(
    high: list[list[float]], low: list[list[float]], k: int,
) -> tuple[float, float]:
    n = len(high)
    if not 1 <= k < n / 2:
        raise ValueError("rank evaluation k must satisfy 1 <= k < n/2")
    trust_penalty = continuity_penalty = 0
    for i in range(n):
        hx, ly = neighbors(high, i), neighbors(low, i)
        rank_h = {j: r + 1 for r, j in enumerate(hx)}
        rank_l = {j: r + 1 for r, j in enumerate(ly)}
        trust_penalty += sum(rank_h[j] - k for j in set(ly[:k]) - set(hx[:k]))
        continuity_penalty += sum(rank_l[j] - k for j in set(hx[:k]) - set(ly[:k]))
    multiplier = 2 / (n * k * (2 * n - 3 * k - 1))
    return 1 - multiplier * trust_penalty, 1 - multiplier * continuity_penalty


def scale_fitted_distance_error(
    high: list[list[float]], low: list[list[float]],
) -> float:
    pairs = [(high[i][j], low[i][j]) for i in range(len(high)) for j in range(i)]
    scale = sum(x * y for x, y in pairs) / sum(x * x for x, _ in pairs)
    return math.sqrt(sum((y - scale * x) ** 2 for x, y in pairs) /
                     sum(y * y for _, y in pairs))


def report(
    x: list[list[float]], y: list[list[float]], perplexity: float = 2.0,
    neighbors_k: int = 3, rank_k: int = 1, a: float = 1.0, b: float = 1.0,
) -> dict[str, object]:
    check_points(x, y)
    high, low = distances(x), distances(y)
    p, betas, actual = tsne_probabilities(high, perplexity)
    q = student_probabilities(low)
    w, rhos, sigmas = umap_weights(high, neighbors_k)
    trust, continuity = rank_scores(high, low, rank_k)
    groups = (range(0, len(x) // 2), range(len(x) // 2, len(x)))
    cross_zero = all(w[i][j] == 0 for i in groups[0] for j in groups[1])
    return {
        "points": x, "embedding": y, "perplexity_target": perplexity,
        "perplexity_actual": actual, "tsne_inverse_bandwidth": betas,
        "tsne_kl": tsne_kl(p, q), "tsne_joint": p, "tsne_low_probabilities": q,
        "tsne_gradient": tsne_gradient(y, p, q),
        "umap_neighbors": neighbors_k, "umap_rho": rhos, "umap_sigma": sigmas,
        "umap_fuzzy_weights": w, "umap_bernoulli_loss": umap_bernoulli_loss(w, low, a, b),
        "umap_low_a": a, "umap_low_b": b,
        "rank_k": rank_k, "trustworthiness": trust, "continuity": continuity,
        "scale_fitted_distance_error": scale_fitted_distance_error(high, low),
        "halves_have_no_cross_fuzzy_edges": cross_zero,
    }


def self_test() -> None:
    x, y1 = preset_points("bridge", 2)
    _, y2 = preset_points("bridge", 20)
    r1 = report(x, y1)
    r2 = report(x, y2)
    assert r1["halves_have_no_cross_fuzzy_edges"]
    assert r2["halves_have_no_cross_fuzzy_edges"]
    assert r2["umap_bernoulli_loss"] < r1["umap_bernoulli_loss"]
    assert math.isclose(sum(map(sum, r1["tsne_joint"])), 1.0, abs_tol=1e-12)
    assert all(abs(t - 2.0) < 1e-9 for t in r1["perplexity_actual"])
    assert all(0 <= v <= 1 for v in (r1["trustworthiness"], r1["continuity"]))
    for i in range(len(x)):
        for j in range(len(x)):
            assert abs(r1["umap_fuzzy_weights"][i][j] -
                       r1["umap_fuzzy_weights"][j][i]) < 1e-12

    # Independent central-difference check of the claimed factor four.
    base = [row.copy() for row in y1]
    eps = 1e-5
    q = student_probabilities(distances(base))
    gradient = tsne_gradient(base, r1["tsne_joint"], q)[0][0]
    base[0][0] += eps
    plus = tsne_kl(r1["tsne_joint"], student_probabilities(distances(base)))
    base[0][0] -= 2 * eps
    minus = tsne_kl(r1["tsne_joint"], student_probabilities(distances(base)))
    assert abs((plus - minus) / (2 * eps) - gradient) < 2e-7

    ring_x, ring_y = preset_points("ring", 1)
    ring = report(ring_x, ring_y, perplexity=3)
    assert math.isfinite(ring["tsne_kl"]) and math.isfinite(ring["umap_bernoulli_loss"])
    try:
        report(x, y1, perplexity=len(x) - 1)
    except ValueError:
        pass
    else:
        raise AssertionError("invalid perplexity must fail")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--preset", choices=("bridge", "ring"), default="bridge")
    parser.add_argument("--gap", type=float, default=2.0)
    parser.add_argument("--points", help="JSON list of original coordinate vectors")
    parser.add_argument("--embedding", help="JSON list of drawing coordinate vectors")
    parser.add_argument("--perplexity", type=float, default=2.0)
    parser.add_argument("--neighbors", type=int, default=3)
    parser.add_argument("--rank-k", type=int, default=1)
    parser.add_argument("--low-a", type=float, default=1.0)
    parser.add_argument("--low-b", type=float, default=1.0)
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        self_test()
        print("MFL20 lab: self-test passed")
        return
    if (args.points is None) != (args.embedding is None):
        parser.error("--points and --embedding must be specified together")
    if args.points:
        x, y = json.loads(args.points), json.loads(args.embedding)
    else:
        x, y = preset_points(args.preset, args.gap)
    result = report(x, y, args.perplexity, args.neighbors, args.rank_k,
                    args.low_a, args.low_b)
    print(json.dumps(result, ensure_ascii=False, indent=2, allow_nan=False))


if __name__ == "__main__":
    main()
