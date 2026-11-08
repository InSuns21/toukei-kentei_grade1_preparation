#!/usr/bin/env python3
"""Finite D4/H scalar and reflection-odd kernels; exact integer verification.

No dependencies beyond the Python standard library. Vertex j is the coset r^j H,
H={e,s}. The two representatives r^j and r^j s must agree for scalar features
and differ by a sign for reflection-odd features.
"""

from __future__ import annotations

import argparse
import json
from typing import TypeAlias

Element: TypeAlias = tuple[int, int]  # r^k s^m, k modulo 4 and m modulo 2
Signal: TypeAlias = tuple[int, int, int, int]

E: Element = (0, 0)
R: Element = (1, 0)
S: Element = (0, 1)
G: tuple[Element, ...] = tuple((k, m) for m in range(2) for k in range(4))
H: tuple[Element, ...] = (E, S)


def multiply(g: Element, h: Element) -> Element:
    k, m = g
    ell, n = h
    return ((k + (-1 if m else 1) * ell) % 4, (m + n) % 2)


def inverse(g: Element) -> Element:
    k, m = g
    return ((k if m else -k) % 4, m)


def vertex_action(g: Element, j: int) -> int:
    k, m = g
    return (k + (-j if m else j)) % 4


def representative(j: int, reflected: bool = False) -> Element:
    return (j % 4, int(reflected))


def coefficients(
    model: str, valid: bool, a: int, b: int, c: int, t: int
) -> Signal:
    if not valid:
        # Deliberately asymmetric right-neighbour-only coefficient.
        return (0, 1, 0, 0)
    if model == "scalar":
        return (a, b, c, b)
    if model == "odd":
        return (0, t, 0, -t)
    raise ValueError(model)


def kernel_value(g: Element, k: Signal) -> int:
    # Right H invariance: r^j and r^j s have the same coefficient.
    return k[g[0]]


def apply_at(g: Element, f: Signal, k: Signal) -> int:
    gi = inverse(g)
    return sum(
        kernel_value(multiply(gi, representative(j)), k) * f[j]
        for j in range(4)
    )


def apply_signal(f: Signal, k: Signal, reflected: bool = False) -> Signal:
    values = tuple(apply_at(representative(j, reflected), f, k) for j in range(4))
    return values  # type: ignore[return-value]


def transform_input(f: Signal, g: Element) -> Signal:
    gi = inverse(g)
    values = tuple(f[vertex_action(gi, j)] for j in range(4))
    return values  # type: ignore[return-value]


def representative_residual(f: Signal, k: Signal, model: str) -> int:
    sign = 1 if model == "scalar" else -1
    return max(
        abs(apply_at(representative(j, True), f, k)
            - sign * apply_at(representative(j), f, k))
        for j in range(4)
    )


def equivariance_residual(f: Signal, k: Signal, h: Element, model: str) -> int:
    transformed = transform_input(f, h)
    hi = inverse(h)
    residuals = []
    for j in range(4):
        destination = multiply(hi, representative(j))
        # Compare in canonical vertex coordinates, including the declared output
        # fiber type. A raw left-regular comparison on all G would be zero for
        # even an invalid kernel and would hide the representative ambiguity.
        factor = -1 if model == "odd" and destination[1] else 1
        expected = factor * apply_at(representative(destination[0]), f, k)
        residuals.append(abs(apply_at(representative(j), transformed, k) - expected))
    return max(residuals)


def kernel_constraints(k: Signal, model: str) -> bool:
    sign = 1 if model == "scalar" else -1
    for v in G:
        for h1 in H:
            for h2 in H:
                lhs = kernel_value(multiply(multiply(h1, v), h2), k)
                rhs = sign if h1 == S else 1
                if lhs != rhs * kernel_value(v, k):
                    return False
    return True


def self_test() -> None:
    checks = 0
    for g in G:
        assert multiply(g, inverse(g)) == E
        assert multiply(inverse(g), g) == E
        for h in G:
            assert vertex_action(multiply(g, h), 0) == vertex_action(
                g, vertex_action(h, 0)
            )
            for z in G:
                assert multiply(multiply(g, h), z) == multiply(g, multiply(h, z))
                checks += 1

    # Exhaust all basis inputs and all group transformations for several kernels.
    signals: list[Signal] = [
        (1, 2, 3, 4),
        (-2, 5, 0, 7),
        *(tuple(int(i == j) for i in range(4)) for j in range(4)),
    ]
    for model, parameters in [
        ("scalar", (1, 2, -1, 5)),
        ("scalar", (0, 1, 0, 5)),
        ("scalar", (-3, 0, 4, 5)),
        ("odd", (1, 2, -1, 1)),
        ("odd", (1, 2, -1, -3)),
    ]:
        k = coefficients(model, True, *parameters)
        assert kernel_constraints(k, model)
        for f in signals:
            assert representative_residual(f, k, model) == 0
            checks += 1
            for h in G:
                assert equivariance_residual(f, k, h, model) == 0
                checks += 1

    # Structural classification: valid scalar coefficients have 3 parameters;
    # valid sign coefficients have 1. Invalid kernels violate both constraints.
    for model in ("scalar", "odd"):
        bad = coefficients(model, False, 1, 2, -1, 1)
        assert not kernel_constraints(bad, model)
        assert max(representative_residual(f, bad, model) for f in signals) > 0
        assert max(
            equivariance_residual(f, bad, h, model) for f in signals for h in G
        ) > 0
        checks += 3

    f: Signal = (1, 2, 3, 4)
    assert apply_signal(f, (1, 2, -1, 2)) == (10, 6, 14, 10)
    assert apply_signal(f, (0, 1, 0, -1)) == (-2, 2, 2, -2)
    reflected = transform_input(f, S)
    assert reflected == (1, 4, 3, 2)
    assert apply_signal(reflected, (0, 1, 0, -1)) == (2, 2, -2, -2)
    checks += 4
    print(json.dumps({"self_test": "passed", "integer_checks": checks}, ensure_ascii=False))


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--model", choices=("scalar", "odd"), default="scalar")
    parser.add_argument("--kernel", choices=("valid", "invalid"), default="valid")
    parser.add_argument("--transform", choices=("identity", "rotation", "reflection"), default="reflection")
    parser.add_argument("--representative", choices=("base", "reflected"), default="base")
    parser.add_argument("--values", default="1,2,3,4", help="four comma-separated integer vertex values")
    parser.add_argument("--a", type=int, default=1)
    parser.add_argument("--b", type=int, default=2)
    parser.add_argument("--c", type=int, default=-1)
    parser.add_argument("--t", type=int, default=1)
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        self_test()
        return

    values = tuple(int(piece.strip()) for piece in args.values.split(","))
    if len(values) != 4:
        parser.error("--values must contain exactly four integers")
    f: Signal = values  # type: ignore[assignment]
    k = coefficients(args.model, args.kernel == "valid", args.a, args.b, args.c, args.t)
    h = {"identity": E, "rotation": R, "reflection": S}[args.transform]
    transformed = transform_input(f, h)
    reflected = args.representative == "reflected"
    result = {
        "group": "D4",
        "stabilizer": ["e", "s"],
        "coset_count": 4,
        "model": args.model,
        "kernel_type": args.kernel,
        "kernel_values": list(k),
        "kernel_satisfies_both_H_constraints": kernel_constraints(k, args.model),
        "input": list(f),
        "transformation": args.transform,
        "transformed_input": list(transformed),
        "representatives": "r^j s" if reflected else "r^j",
        "output": list(apply_signal(f, k, reflected)),
        "transformed_output": list(apply_signal(transformed, k, reflected)),
        "representative_residual": representative_residual(f, k, args.model),
        "equivariance_residual": equivariance_residual(f, k, h, args.model),
        "max_equivariance_residual_all_D4": max(
            equivariance_residual(f, k, x, args.model) for x in G
        ),
    }
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
