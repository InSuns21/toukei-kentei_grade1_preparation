#!/usr/bin/env python3
"""MFL23: exact finite-group orbits, stabilizers, fibers and action kernels."""

from __future__ import annotations

import argparse
import json
import re


# (flip, shift) acts on a vertex j as (-1)**flip * j + shift (mod n).
# It denotes r**shift * s**flip; multiplication is composition, right first.
Element = tuple[int, int]
Point = int | tuple[int, int]


def elements(kind: str, n: int) -> list[Element]:
    return [(flip, k) for flip in (range(2) if kind == "D" else range(1)) for k in range(n)]


def product(a: Element, b: Element, n: int) -> Element:
    af, ak = a
    bf, bk = b
    return af ^ bf, (ak + (-1 if af else 1) * bk) % n


def name(a: Element) -> str:
    flip, k = a
    return f"r{k}s" if flip else f"r{k}"


def rotate(v: tuple[int, int]) -> tuple[int, int]:
    return -v[1], v[0]


def opposite_pair(j: int, n: int) -> tuple[int, int]:
    if n % 2:
        raise ValueError("opposite-pairs require even n")
    return tuple(sorted((j % n, (j + n // 2) % n)))


def apply(a: Element, point: Point, space: str, n: int) -> Point:
    flip, k = a
    if space == "plane":
        if n != 4:
            raise ValueError("plane uses only C4 or D4; other rotations require noninteger coordinates")
        if not isinstance(point, tuple):
            raise TypeError("plane point must be a pair")
        x, y = point
        v = (x, -y) if flip else (x, y)
        for _ in range(k):
            v = rotate(v)
        return v
    if not isinstance(point, int):
        raise TypeError("vertex/pair point must be a vertex number")
    result = ((-point if flip else point) + k) % n
    return min(result, (result + n // 2) % n) if space == "opposite-pairs" else result


def points_for_kernel(space: str, n: int) -> list[Point]:
    if space == "vertices":
        return list(range(n))
    if space == "opposite-pairs":
        return list(range(n // 2))
    # Every group element is linear on R^2; fixing both basis vectors fixes all R^2.
    return [(1, 0), (0, 1)]


def point_label(point: Point, space: str, n: int) -> str:
    if space == "plane":
        assert isinstance(point, tuple)
        return f"({point[0]},{point[1]})"
    assert isinstance(point, int)
    if space == "opposite-pairs":
        return str(opposite_pair(point, n))
    return str(point)


def report(kind: str, n: int, space: str, point: Point) -> dict:
    if space == "opposite-pairs" and n % 2:
        raise ValueError("opposite-pairs require even n")
    if space == "plane" and n != 4:
        raise ValueError("plane is supported only for n=4")
    group = elements(kind, n)
    if space == "opposite-pairs":
        assert isinstance(point, int)
        point %= n // 2
    elif space == "vertices":
        assert isinstance(point, int)
        point %= n
    fibers: dict[Point, list[str]] = {}
    for g in group:
        y = apply(g, point, space, n)
        fibers.setdefault(y, []).append(name(g))
    stab = [name(g) for g in group if apply(g, point, space, n) == point]
    kernel = [
        name(g)
        for g in group
        if all(apply(g, p, space, n) == p for p in points_for_kernel(space, n))
    ]
    result = {
        "group": f"{kind}{n}",
        "space": space,
        "input": point_label(point, space, n),
        "group_order": len(group),
        "orbit": [point_label(y, space, n) for y in sorted(fibers)],
        "orbit_size": len(fibers),
        "stabilizer": stab,
        "stabilizer_size": len(stab),
        "fibers": {point_label(y, space, n): names for y, names in sorted(fibers.items())},
        "fiber_sizes": {point_label(y, space, n): len(names) for y, names in sorted(fibers.items())},
        "action_kernel": kernel,
        "faithful": len(kernel) == 1,
        "orbit_stabilizer_holds": len(fibers) * len(stab) == len(group)
        and all(len(v) == len(stab) for v in fibers.values()),
    }
    return result


def self_test() -> None:
    checks = 0
    for n in (3, 4, 5, 6):
        for kind in ("C", "D"):
            group = elements(kind, n)
            for space in ("vertices", "opposite-pairs" if n % 2 == 0 else "vertices"):
                sample = points_for_kernel(space, n)
                for a in group:
                    for b in group:
                        for x in sample:
                            assert apply(product(a, b, n), x, space, n) == apply(
                                a, apply(b, x, space, n), space, n
                            )
                            checks += 1
                for x in sample:
                    value = report(kind, n, space, x)
                    assert value["orbit_stabilizer_holds"]
                    checks += 1

    for kind in ("C", "D"):
        group = elements(kind, 4)
        for a in group:
            for b in group:
                for x in ((0, 0), (1, 0), (1, 1), (1, 2)):
                    assert apply(product(a, b, 4), x, "plane", 4) == apply(
                        a, apply(b, x, "plane", 4), "plane", 4
                    )
                    checks += 1
        for x in ((0, 0), (1, 0), (1, 1), (1, 2)):
            assert report(kind, 4, "plane", x)["orbit_stabilizer_holds"]
            checks += 1

    assert report("D", 4, "plane", (0, 0))["stabilizer_size"] == 8
    assert report("D", 4, "plane", (1, 0))["stabilizer_size"] == 2
    assert report("D", 4, "plane", (1, 1))["stabilizer_size"] == 2
    assert report("D", 4, "plane", (1, 2))["orbit_size"] == 8
    assert report("D", 4, "vertices", 0)["orbit_size"] == 4
    assert report("C", 4, "opposite-pairs", 0)["action_kernel"] == ["r0", "r2"]
    print(json.dumps({"self_test": "passed", "checks": checks + 6}, ensure_ascii=False))


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--group", default="D4", help="Cn or Dn, n from 3 to 32")
    parser.add_argument("--space", choices=("vertices", "opposite-pairs", "plane"), default="vertices")
    parser.add_argument("--vertex", type=int, default=0)
    parser.add_argument("--x", type=int, default=1)
    parser.add_argument("--y", type=int, default=2)
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        self_test()
        return
    matched = re.fullmatch(r"([CD])([0-9]+)", args.group)
    if matched is None:
        parser.error("--group must be Cn or Dn")
    kind, n = matched.group(1), int(matched.group(2))
    if not 3 <= n <= 32:
        parser.error("n must be between 3 and 32")
    if args.space == "opposite-pairs" and n % 2:
        parser.error("opposite-pairs require even n")
    if args.space == "plane" and n != 4:
        parser.error("plane requires C4 or D4")
    point: Point = (args.x, args.y) if args.space == "plane" else args.vertex
    print(json.dumps(report(kind, n, args.space, point), ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
