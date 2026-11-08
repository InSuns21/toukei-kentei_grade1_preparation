#!/usr/bin/env python3
"""MFL26: finite C4/D4 lattice lift, group correlation and symmetry residuals.

Only Python's standard library is used. All calculations use integer values,
so the expected zero residuals are exact rather than floating-point artefacts.
Run --self-test to cover every group element on a 4x4 periodic lattice.
"""

from __future__ import annotations

import argparse
from itertools import product
from typing import TypeAlias

Point: TypeAlias = tuple[int, int]
Orientation: TypeAlias = tuple[int, int]  # r^k s^m
GroupElement: TypeAlias = tuple[Point, Orientation]
Image: TypeAlias = dict[Point, int]
GroupFeature: TypeAlias = dict[GroupElement, int]

E: Orientation = (0, 0)
R: Orientation = (1, 0)
S: Orientation = (0, 1)


def points(n: int) -> list[Point]:
    return list(product(range(n), repeat=2))


def orientations(name: str) -> list[Orientation]:
    if name not in ("C4", "D4"):
        raise ValueError(name)
    return [(k, m) for m in range(2 if name == "D4" else 1) for k in range(4)]


def mul_orientation(p: Orientation, q: Orientation) -> Orientation:
    k, m = p
    ell, t = q
    return ((k + (-1 if m else 1) * ell) % 4, (m + t) % 2)


def inv_orientation(p: Orientation) -> Orientation:
    k, m = p
    return ((k if m else -k) % 4, m)


def rotate(k: int, v: Point) -> Point:
    a, b = v
    for _ in range(k % 4):
        a, b = -b, a
    return (a, b)


def act(p: Orientation, v: Point, n: int) -> Point:
    a, b = v
    if p[1]:
        b = -b  # s first, then r^k
    a, b = rotate(p[0], (a, b))
    return (a % n, b % n)


def add(a: Point, b: Point, n: int) -> Point:
    return ((a[0] + b[0]) % n, (a[1] + b[1]) % n)


def sub(a: Point, b: Point, n: int) -> Point:
    return ((a[0] - b[0]) % n, (a[1] - b[1]) % n)


def mul_group(g: GroupElement, h: GroupElement, n: int) -> GroupElement:
    a, p = g
    b, q = h
    return (add(a, act(p, b, n), n), mul_orientation(p, q))


def inverse_group(g: GroupElement, n: int) -> GroupElement:
    a, p = g
    ip = inv_orientation(p)
    v = act(ip, a, n)
    return ((-v[0] % n, -v[1] % n), ip)


def act_image(f: Image, h: GroupElement, n: int) -> Image:
    b, q = h
    iq = inv_orientation(q)
    return {a: f[act(iq, sub(a, b, n), n)] for a in points(n)}


def act_feature(f: GroupFeature, h: GroupElement, n: int) -> GroupFeature:
    hinv = inverse_group(h, n)
    return {g: f[mul_group(hinv, g, n)] for g in f}


def kernel(name: str) -> dict[Point, int]:
    if name == "asymmetric":
        return {(0, 0): 1, (1, 0): 2, (0, 1): -1}
    if name == "symmetric":
        return {(0, 0): 3, (1, 0): 1, (0, 1): 1, (-1, 0): 1, (0, -1): 1}
    raise ValueError(name)


def lift(
    f: Image,
    kappa: dict[Point, int],
    n: int,
    point_group: list[Orientation],
    boundary: str = "periodic",
) -> GroupFeature:
    result = {}
    for a in points(n):
        for p in point_group:
            value = 0
            for v, weight in kappa.items():
                # For a zero-padded image the physical offset must not wrap.
                raw = rotate(p[0], (v[0], -v[1] if p[1] else v[1]))
                raw_pos = (a[0] + raw[0], a[1] + raw[1])
                if boundary == "zero" and not (
                    0 <= raw_pos[0] < n and 0 <= raw_pos[1] < n
                ):
                    continue
                x = (raw_pos[0] % n, raw_pos[1] % n)
                value += weight * f[x]
            result[(a, p)] = value
    return result


def group_kernel(point_group: list[Orientation]) -> dict[GroupElement, int]:
    k = {((0, 0), E): 1, ((0, 0), R): 2}
    if S in point_group:
        k[((0, 0), S)] = -1
    return k


def group_correlation(
    f: GroupFeature, k: dict[GroupElement, int], n: int
) -> GroupFeature:
    return {
        g: sum(w * f[mul_group(g, v, n)] for v, w in k.items())
        for g in f
    }


def max_residual(f: dict, other: dict) -> int:
    assert f.keys() == other.keys()
    return max((abs(f[g] - other[g]) for g in f), default=0)


def image_correlation(
    f: Image, k: dict[Point, int], n: int, boundary: str = "periodic"
) -> Image:
    out = {}
    for a in points(n):
        total = 0
        for v, w in k.items():
            raw = (a[0] + v[0], a[1] + v[1])
            if boundary == "zero" and not (
                0 <= raw[0] < n and 0 <= raw[1] < n
            ):
                continue
            total += w * f[(raw[0] % n, raw[1] % n)]
        out[a] = total
    return out


def stride_feature(
    f: GroupFeature, n: int, d: int, point_group: list[Orientation]
) -> GroupFeature:
    if n % d:
        raise ValueError("stride must divide N")
    small = n // d
    return {
        (z, p): f[((d * z[0], d * z[1]), p)]
        for z in points(small)
        for p in point_group
    }


def sample_image(n: int) -> Image:
    return {(x, y): 7 * x - 3 * y + (x * y) % 5 for x, y in points(n)}


def check_full_group(name: str) -> int:
    n = 4
    ps = orientations(name)
    f = sample_image(n)
    k = kernel("asymmetric")
    F = lift(f, k, n, ps)
    ck = group_kernel(ps)
    CF = group_correlation(F, ck, n)
    checks = 0
    for b in points(n):
        for q in ps:
            h = (b, q)
            # First layer: A(U_h f) = L_h(A f).
            left = lift(act_image(f, h, n), k, n, ps)
            right = act_feature(F, h, n)
            assert max_residual(left, right) == 0, (name, "lift", h)
            # Second layer: C(L_h F) = L_h(C F).
            left2 = group_correlation(act_feature(F, h, n), ck, n)
            right2 = act_feature(CF, h, n)
            assert max_residual(left2, right2) == 0, (name, "group", h)
            checks += 2
    return checks


def check_stride(name: str) -> int:
    n, d = 4, 2
    ps = orientations(name)
    F = lift(sample_image(n), kernel("asymmetric"), n, ps)
    D = stride_feature(F, n, d, ps)
    checks = 0
    for b in points(n // d):
        for q in ps:
            aligned_h = ((d * b[0], d * b[1]), q)
            coarse_h = (b, q)
            left = stride_feature(act_feature(F, aligned_h, n), n, d, ps)
            right = act_feature(D, coarse_h, n // d)
            assert max_residual(left, right) == 0, (name, "stride", aligned_h)
            checks += 1
    return checks


def check_specific_counterexamples() -> int:
    n = 5
    orbit = {act((k, 0), (1, 2), n) for k in range(4)}
    assert len(orbit) == 4
    assert act(S, (1, 2), n) not in orbit
    # A scalar C4-invariant kernel does not have to be D4-invariant.
    f = {v: int(v == (1, 2)) for v in points(n)}
    k = {v: int(v in orbit) for v in points(n)}
    assert image_correlation(act_image(f, ((0, 0), S), n), k, n)[(0, 0)] == 0
    assert image_correlation(f, k, n)[(0, 0)] == 1
    # A one-step periodic shift is not respected by zero padding.
    x = [1, 2, 3]
    bx = [x[0] + x[1], x[1] + x[2], x[2]]
    tx = [x[-1], x[0], x[1]]
    btx = [tx[0] + tx[1], tx[1] + tx[2], tx[2]]
    tbx = [bx[-1], bx[0], bx[1]]
    assert btx == [4, 3, 2] and tbx == [3, 3, 5]
    # An odd translation moves an impulse out of the even-even sample grid.
    n = 4
    impulse = {v: int(v == (0, 0)) for v in points(n)}
    ps = orientations("C4")
    first = lift(impulse, {(0, 0): 1}, n, ps)
    moved = act_image(impulse, ((1, 0), E), n)
    second = lift(moved, {(0, 0): 1}, n, ps)
    assert sum(stride_feature(first, n, 2, ps).values()) == 4
    assert sum(stride_feature(second, n, 2, ps).values()) == 0
    return 5


def self_test() -> None:
    count = check_specific_counterexamples()
    for name in ("C4", "D4"):
        count += check_full_group(name)
        count += check_stride(name)
    print(f"PASS {count} exact checks (C4/D4, lift, group correlation, stride, counterexamples)")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--self-test", action="store_true")
    parser.add_argument("--group", choices=("C4", "D4"), default="D4")
    parser.add_argument("--transform", choices=("rotation", "reflection", "translate"), default="rotation")
    parser.add_argument("--kernel", choices=("asymmetric", "symmetric"), default="asymmetric")
    parser.add_argument("--boundary", choices=("periodic", "zero"), default="periodic")
    parser.add_argument("--stride", type=int, choices=(1, 2), default=1)
    args = parser.parse_args()
    if args.self_test:
        self_test()
        return
    if args.transform == "reflection" and args.group != "D4":
        parser.error("reflection is not an element of C4; use --group D4")
    n = 4
    ps = orientations(args.group)
    q = {"rotation": R, "reflection": S, "translate": E}[args.transform]
    b = (1, 0) if args.transform == "translate" else (0, 0)
    h = (b, q)
    f = sample_image(n)
    k = kernel(args.kernel)
    F = lift(f, k, n, ps, args.boundary)
    left = lift(act_image(f, h, n), k, n, ps, args.boundary)
    right = act_feature(F, h, n)
    lift_residual = max_residual(left, right)
    K = group_kernel(ps)
    equivariant_group_residual = max_residual(
        group_correlation(act_feature(F, h, n), K, n),
        act_feature(group_correlation(F, K, n), h, n),
    )
    B = image_correlation(f, k, n, args.boundary)
    scalar_residual = max_residual(
        image_correlation(act_image(f, h, n), k, n, args.boundary),
        act_image(B, h, n),
    )
    print(
        f"N={n} P={args.group} transform={args.transform} "
        f"kernel={args.kernel} boundary={args.boundary} stride={args.stride}"
    )
    print(f"lift equivariance max residual:       {lift_residual}")
    print(f"group correlation max residual:       {equivariant_group_residual}")
    print(f"scalar spatial filter max residual:   {scalar_residual}")
    if args.stride > 1:
        d = args.stride
        aligned_h = ((d, 0), q)
        left_coarse = stride_feature(act_feature(F, aligned_h, n), n, d, ps)
        right_coarse = act_feature(
            stride_feature(F, n, d, ps), ((1, 0), q), n // d
        )
        print(
            "aligned stride subgroup max residual: "
            f"{max_residual(left_coarse, right_coarse)}"
        )
        impulse = {v: int(v == (0, 0)) for v in points(n)}
        impulse_f = lift(impulse, {(0, 0): 1}, n, ps)
        shifted_f = lift(
            act_image(impulse, ((1, 0), E), n),
            {(0, 0): 1},
            n,
            ps,
        )
        a = sum(stride_feature(impulse_f, n, d, ps).values())
        b_count = sum(stride_feature(shifted_f, n, d, ps).values())
        print(f"unaligned +1 translation: sampled impulse mass {a} -> {b_count}")
        print("No canonical coarse-grid translation is defined for an unaligned +1 shift.")
    if args.boundary == "zero":
        print("Zero boundary is compared against the *periodic* input action; it need not commute.")


if __name__ == "__main__":
    main()
