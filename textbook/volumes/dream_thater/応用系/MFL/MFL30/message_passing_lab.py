"""MFL30: deterministic, standard-library-only message-passing checks.

Edges are (source, target, feature) with zero-based vertex indices.
The permutation maps OLD indices to NEW indices; it must move edges too.
"""

from __future__ import annotations

from itertools import permutations


def relabel(
    values: tuple[float, ...],
    edges: tuple[tuple[int, int, float], ...],
    permutation: tuple[int, ...],
) -> tuple[tuple[float, ...], tuple[tuple[int, int, float], ...]]:
    n = len(values)
    assert sorted(permutation) == list(range(n))
    result = [0.0] * n
    for old, new in enumerate(permutation):
        result[new] = values[old]
    new_edges = tuple((permutation[j], permutation[i], weight) for j, i, weight in edges)
    return tuple(result), new_edges


def layer(
    values: tuple[float, ...],
    edges: tuple[tuple[int, int, float], ...],
    *,
    aggregate: str = "sum",
    self_loops: bool = False,
    edge_features: bool = False,
) -> tuple[float, ...]:
    n = len(values)
    incoming = [[] for _ in range(n)]
    for j, i, weight in edges:
        assert 0 <= i < n and 0 <= j < n
        incoming[i].append(values[j] + (weight if edge_features else 0.0))
    if self_loops:
        for i in range(n):
            if not any(j == i and target == i for j, target, _ in edges):
                incoming[i].append(values[i])
    output = []
    for i, messages in enumerate(incoming):
        if aggregate == "sum":
            combined = sum(messages)
        elif aggregate == "mean":
            combined = sum(messages) / len(messages) if messages else 0.0
        else:
            raise ValueError(f"unsupported aggregate: {aggregate}")
        output.append(values[i] + combined)
    return tuple(output)


def network(
    values: tuple[float, ...],
    edges: tuple[tuple[int, int, float], ...],
    *,
    depth: int,
    aggregate: str,
    self_loops: bool = False,
    edge_features: bool = False,
) -> tuple[float, ...]:
    current = values
    for _ in range(depth):
        current = layer(
            current,
            edges,
            aggregate=aggregate,
            self_loops=self_loops,
            edge_features=edge_features,
        )
    return current


def exhaustive_check(
    values: tuple[float, ...],
    edges: tuple[tuple[int, int, float], ...],
    *,
    depth: int,
    aggregate: str,
    self_loops: bool = False,
    edge_features: bool = False,
) -> tuple[int, float]:
    original = network(
        values, edges, depth=depth, aggregate=aggregate,
        self_loops=self_loops, edge_features=edge_features,
    )
    count = 0
    max_residual = 0.0
    for permutation in permutations(range(len(values))):
        moved_values, moved_edges = relabel(values, edges, permutation)
        actual = network(
            moved_values, moved_edges, depth=depth, aggregate=aggregate,
            self_loops=self_loops, edge_features=edge_features,
        )
        expected, _ = relabel(original, (), permutation)
        max_residual = max(
            max_residual, *(abs(a - b) for a, b in zip(actual, expected))
        )
        count += 1
    assert max_residual < 1e-12, (aggregate, depth, max_residual)
    return count, max_residual


def main() -> None:
    # Both orientations of each edge are represented explicitly.
    path3 = ((0, 1, 0.0), (1, 0, 0.0), (1, 2, 0.0), (2, 1, 0.0))
    path4 = (
        (0, 1, 0.0), (1, 0, 0.0), (1, 2, 0.0),
        (2, 1, 0.0), (2, 3, 0.0), (3, 2, 0.0),
    )
    values3 = (1.0, 2.0, 4.0)
    values4 = (1.0, 0.0, 2.0, 1.0)
    assert network(values3, path3, depth=1, aggregate="sum") == (3.0, 7.0, 6.0)
    assert network(values4, path4, depth=2, aggregate="sum") == (4.0, 7.0, 9.0, 6.0)
    print("three-vertex path, one-layer sum:", (3.0, 7.0, 6.0))
    print("four-vertex path, two-layer sum:", (4.0, 7.0, 9.0, 6.0))

    cases = (
        (values3, path3, 1, "sum", False, False),
        (values3, path3, 1, "mean", False, False),
        (values3, path3, 1, "mean", True, False),
        ((1.0, 2.0, 4.0, 8.0), path3, 1, "mean", False, False),
        (values4, path4, 2, "sum", False, False),
        (values4, path4, 2, "mean", False, False),
        (
            values3,
            ((0, 1, 2.0), (2, 1, -1.0)),
            2, "sum", False, True,
        ),
    )
    for values, edges, depth, aggregate, loops, edge_features in cases:
        count, residual = exhaustive_check(
            values, edges, depth=depth, aggregate=aggregate,
            self_loops=loops, edge_features=edge_features,
        )
        print(
            f"n={len(values)} depth={depth} aggregate={aggregate} "
            f"self_loops={loops} edge_features={edge_features}: "
            f"{count} permutations, max equivariance residual={residual:.2e}"
        )

    cycle3 = (1, 2, 0)  # old indices 0->1, 1->2, 2->0
    moved_values, moved_edges = relabel(values3, path3, cycle3)
    correct = network(moved_values, moved_edges, depth=1, aggregate="sum")
    wrong = network(moved_values, path3, depth=1, aggregate="sum")
    residual = tuple(x - y for x, y in zip(wrong, correct))
    assert correct == (6.0, 3.0, 7.0)
    assert wrong == (5.0, 7.0, 3.0)
    assert residual == (-1.0, 4.0, -4.0)
    print("missing-edge-relabel residual:", residual, "squared norm:", sum(x * x for x in residual))


if __name__ == "__main__":
    main()
