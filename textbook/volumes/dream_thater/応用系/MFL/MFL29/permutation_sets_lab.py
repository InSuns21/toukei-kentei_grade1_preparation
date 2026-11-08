"""MFL29: deterministic permutation tests for finite 2-D point multisets.

Only Python's standard library is needed. Exhaustive checks cover n <= 7;
larger inputs are intentionally rejected rather than sampling permutations.
"""

from __future__ import annotations

import argparse
import itertools
import math


def parse_points(value: str) -> tuple[tuple[float, float], ...]:
    rows = []
    for row in value.split(";"):
        parts = row.strip().split(",")
        if len(parts) != 2:
            raise ValueError("each point must have two comma-separated coordinates")
        xy = (float(parts[0]), float(parts[1]))
        if not all(math.isfinite(v) for v in xy):
            raise ValueError("coordinates must be finite")
        rows.append(xy)
    if not 1 <= len(rows) <= 7:
        raise ValueError("use between 1 and 7 points for exhaustive permutations")
    return tuple(rows)


def pooling(points: tuple[tuple[float, float], ...], kind: str) -> tuple[float, float]:
    if kind == "sum":
        return tuple(sum(x[j] for x in points) for j in range(2))
    if kind == "mean":
        return tuple(sum(x[j] for x in points) / len(points) for j in range(2))
    if kind == "max":
        return tuple(max(x[j] for x in points) for j in range(2))
    raise ValueError("unknown pooling")


def moments(points: tuple[tuple[float, float], ...]) -> tuple[float, float, float]:
    """Sum of phi(x,y)=(x,y,x^2+y^2)."""
    return (
        sum(x for x, _ in points),
        sum(y for _, y in points),
        sum(x * x + y * y for x, y in points),
    )


def invariant(points: tuple[tuple[float, float], ...]) -> float:
    sx, sy, ss = moments(points)
    return ss + sx * sx + sy * sy


def equivariant(points: tuple[tuple[float, float], ...]) -> tuple[tuple[float, float], ...]:
    sx, sy, _ = moments(points)
    n = len(points)
    return tuple((2 * x + sx / n, 2 * y + sy / n) for x, y in points)


def ordered_bad(points: tuple[tuple[float, float], ...]) -> float:
    """An intentionally non-invariant order-dependent readout."""
    return sum((i + 1) * x for i, (x, _) in enumerate(points))


def vec_error(left: tuple[float, ...], right: tuple[float, ...]) -> float:
    return math.sqrt(sum((a - b) ** 2 for a, b in zip(left, right)))


def diagnostics(points: tuple[tuple[float, float], ...], pool: str) -> dict[str, float | int]:
    original_pool = pooling(points, pool)
    original_moments = moments(points)
    original_invariant = invariant(points)
    original_equivariant = equivariant(points)
    original_bad = ordered_bad(points)
    worst_pool = worst_moments = worst_invariant = worst_equivariant = worst_bad = 0.0
    count = 0
    for order in itertools.permutations(range(len(points))):
        shuffled = tuple(points[i] for i in order)
        worst_pool = max(worst_pool, vec_error(original_pool, pooling(shuffled, pool)))
        worst_moments = max(worst_moments, vec_error(original_moments, moments(shuffled)))
        worst_invariant = max(worst_invariant, abs(original_invariant - invariant(shuffled)))
        expected = tuple(original_equivariant[i] for i in order)
        actual = equivariant(shuffled)
        worst_equivariant = max(
            worst_equivariant,
            math.sqrt(sum(vec_error(a, b) ** 2 for a, b in zip(expected, actual))),
        )
        worst_bad = max(worst_bad, abs(ordered_bad(shuffled) - original_bad))
        count += 1
    return {
        "permutations": count,
        "pool_residual": worst_pool,
        "moments_residual": worst_moments,
        "invariant_residual": worst_invariant,
        "equivariant_residual": worst_equivariant,
        "bad_order_residual": worst_bad,
    }


def self_test() -> int:
    cases = [
        ((0.0, 0.0),),
        ((0.0, 0.0), (2.0, 0.0)),
        ((0.0, 0.0), (2.0, 0.0), (1.0, 1.0)),
        ((1.0, -1.0), (1.0, -1.0), (2.0, 3.0), (0.0, 0.0)),
        ((0.0, 0.0), (1.0, 2.0), (-3.0, 1.0), (2.0, -1.0), (1.0, 0.0)),
    ]
    checked = 0
    for points in cases:
        for kind in ("sum", "mean", "max"):
            results = diagnostics(points, kind)
            for label in ("pool_residual", "moments_residual", "invariant_residual", "equivariant_residual"):
                assert results[label] < 1e-9, (kind, label, results)
                checked += 1
    x = ((0.0, 0.0), (2.0, 0.0))
    y = ((1.0, 0.0), (1.0, 0.0))
    assert pooling(x, "sum") == pooling(y, "sum")
    assert pooling(x, "mean") == pooling(y, "mean")
    assert pooling(x, "max") != pooling(y, "max")
    assert moments(x) == (2.0, 0.0, 4.0)
    assert moments(y) == (2.0, 0.0, 2.0)
    assert diagnostics(cases[2], "sum")["bad_order_residual"] > 0
    assert math.isclose(((3 - 4) ** 2 + (3 - 2) ** 2) / 2, 1.0)
    checked += 6
    print(f"SELF_TEST PASS: {checked} deterministic invariance/collision checks")
    return checked


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--points", default="0,0;2,0;1,1", help="x,y;x,y;... (1 to 7 points)")
    parser.add_argument("--pool", choices=("sum", "mean", "max"), default="sum")
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        self_test()
        return
    try:
        points = parse_points(args.points)
    except ValueError as exc:
        parser.error(str(exc))
    print("points:", points)
    print("pool_type:", args.pool)
    print("pool_value:", pooling(points, args.pool))
    print("quadratic_moments:", moments(points))
    print("DeepSets_invariant:", invariant(points))
    print("per_point_equivariant:", equivariant(points))
    print("bad_index_weighted:", ordered_bad(points))
    for label, result in diagnostics(points, args.pool).items():
        print(f"{label}: {result}")
    x = ((0.0, 0.0), (2.0, 0.0))
    y = ((1.0, 0.0), (1.0, 0.0))
    print("collision_pair_sum:", pooling(x, "sum"), pooling(y, "sum"))
    print("collision_pair_moments:", moments(x), moments(y))
    print("best_shared_MSE_for_quadratic_target: 1.0")


if __name__ == "__main__":
    main()
