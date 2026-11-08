"""MFL31: deterministic checks of 1-WL, message passing, and structural seeds.

Only finite, simple, undirected graphs with zero-based vertices are used.
WL color keys for two graphs are assigned from their UNION, not separately.
"""

from __future__ import annotations

from collections import Counter


Graph = tuple[int, tuple[tuple[int, int], ...]]


def graph(n: int, edges: list[tuple[int, int]]) -> Graph:
    assert n > 0
    canonical = tuple(sorted((min(a, b), max(a, b)) for a, b in edges))
    assert all(0 <= a < b < n for a, b in canonical)
    assert len(canonical) == len(set(canonical))
    return n, canonical


def neighbors(g: Graph) -> tuple[tuple[int, ...], ...]:
    n, edges = g
    found: list[list[int]] = [[] for _ in range(n)]
    for a, b in edges:
        found[a].append(b)
        found[b].append(a)
    return tuple(tuple(sorted(items)) for items in found)


def wl_histories(
    left: Graph, right: Graph, rounds: int
) -> tuple[list[Counter[int]], list[Counter[int]]]:
    """Synchronous 1-WL with common color coding on the disjoint union."""
    adjacent_left, adjacent_right = neighbors(left), neighbors(right)
    colors_left = [0] * left[0]
    colors_right = [0] * right[0]
    history_left = [Counter(colors_left)]
    history_right = [Counter(colors_right)]
    for _ in range(rounds):
        signatures_left = [
            (colors_left[v], tuple(sorted(colors_left[u] for u in ns)))
            for v, ns in enumerate(adjacent_left)
        ]
        signatures_right = [
            (colors_right[v], tuple(sorted(colors_right[u] for u in ns)))
            for v, ns in enumerate(adjacent_right)
        ]
        # A common injective dictionary ensures color equality across graphs.
        signatures = sorted(set(signatures_left + signatures_right))
        enc = {key: i for i, key in enumerate(signatures)}
        colors_left = [enc[key] for key in signatures_left]
        colors_right = [enc[key] for key in signatures_right]
        history_left.append(Counter(colors_left))
        history_right.append(Counter(colors_right))
    return history_left, history_right


def layer(g: Graph, values: tuple[float, ...], mode: str) -> tuple[float, ...]:
    assert len(values) == g[0]
    output: list[float] = []
    for v, adjacent in enumerate(neighbors(g)):
        total = sum(values[u] for u in adjacent)
        if mode == "mean":
            # This exercise deliberately avoids isolated vertices.
            assert len(adjacent) > 0
            total /= len(adjacent)
        else:
            assert mode == "sum"
        output.append(values[v] + total)
    return tuple(output)


def triangle_counts(g: Graph) -> tuple[int, ...]:
    adjacent = [set(ns) for ns in neighbors(g)]
    result: list[int] = []
    for v in range(g[0]):
        # Each triangle at v appears as two ordered adjacent neighbor pairs.
        result.append(
            sum(
                1
                for u in adjacent[v]
                for w in adjacent[v]
                if u < w and w in adjacent[u]
            )
        )
    return tuple(result)


def relabel(g: Graph, permutation: tuple[int, ...]) -> Graph:
    assert sorted(permutation) == list(range(g[0]))
    return graph(g[0], [(permutation[u], permutation[v]) for u, v in g[1]])


def main() -> None:
    cycle6 = graph(6, [(i, (i + 1) % 6) for i in range(6)])
    triangles = graph(6, [(0, 1), (1, 2), (0, 2), (3, 4), (4, 5), (3, 5)])
    path4 = graph(4, [(0, 1), (1, 2), (2, 3)])
    star4 = graph(4, [(0, 1), (0, 2), (0, 3)])
    path3 = graph(3, [(0, 1), (1, 2)])
    triangle3 = graph(3, [(0, 1), (1, 2), (0, 2)])

    left_hist, right_hist = wl_histories(cycle6, triangles, rounds=6)
    assert left_hist == right_hist
    assert all(sorted(Counter(dict(h).values()).elements()) == [6] for h in left_hist)
    path_hist, star_hist = wl_histories(path4, star4, rounds=2)
    assert path_hist[0] == star_hist[0]
    assert path_hist[1] != star_hist[1]

    # A non-injective readout can lose information that WL/MP retains.
    path_values = layer(path4, (1.0,) * 4, mode="sum")
    star_values = layer(star4, (1.0,) * 4, mode="sum")
    assert path_values == (2.0, 3.0, 3.0, 2.0)
    assert star_values == (4.0, 2.0, 2.0, 2.0)
    assert sum(path_values) == sum(star_values) == 10
    assert sum(x * x for x in path_values) == 26
    assert sum(x * x for x in star_values) == 28

    # Means erase degree when every incoming message has the same value.
    for g in (path3, triangle3):
        first = layer(g, (1.0,) * 3, mode="mean")
        second = layer(g, first, mode="mean")
        assert first == (2.0, 2.0, 2.0)
        assert second == (4.0, 4.0, 4.0)
    assert wl_histories(path3, triangle3, rounds=1)[0][1] != wl_histories(
        path3, triangle3, rounds=1
    )[1][1]

    assert triangle_counts(cycle6) == (0,) * 6
    assert triangle_counts(triangles) == (1,) * 6

    # A vertex relabeling transports local structural features and WL colors.
    permutation = (2, 5, 1, 4, 0, 3)
    changed = relabel(triangles, permutation)
    counts = triangle_counts(triangles)
    changed_counts = triangle_counts(changed)
    for old, new in enumerate(permutation):
        assert counts[old] == changed_counts[new]
    assert wl_histories(triangles, changed, rounds=4)[0] == wl_histories(
        triangles, changed, rounds=4
    )[1]

    print("1-WL: C6 and 2C3 indistinguishable at rounds 0..6")
    print("1-WL: P4 and K1,3 distinguished after one round")
    print("MP sum readout: 10=10; squared readout: 26 != 28")
    print("MP mean: P3 and C3 collapse despite WL degree split")
    print("triangle counts: 0 versus 6; relabeling checks passed")


if __name__ == "__main__":
    main()
