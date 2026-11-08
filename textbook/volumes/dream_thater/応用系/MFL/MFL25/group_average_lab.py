#!/usr/bin/env python3
"""MFL25: deterministic finite C2/C4 group averaging and equivariance residuals."""

from __future__ import annotations

import argparse
import json
import math

Point = tuple[float, float]
Value = tuple[float, ...]
SAMPLES: tuple[Point, ...] = ((1.0, 0.0), (1.0, 1.0), (-2.0, 1.0), (0.5, -1.5))


def rotate(x: Point, k: int) -> Point:
    """Counterclockwise k quarter-turns; k is read modulo 4."""
    a, b = x
    for _ in range(k % 4):
        a, b = -b, a
    return a, b


def elements(group: str) -> tuple[int, ...]:
    return (0, 2) if group == "C2" else (0, 1, 2, 3)


def output_action(value: Value, k: int, output: str) -> Value:
    if output == "scalar":
        return value
    assert len(value) == 2
    return rotate((value[0], value[1]), k)


def base_function(x: Point, output: str, activation: str) -> Value:
    a, b = x
    if activation == "relu":
        if output == "scalar":
            return (max(0.0, a + 2.0 * b - 1.0),)
        return (max(0.0, 2.0 * a - b + 1.0), max(0.0, a + 2.0 * b - 0.5))
    if output == "scalar":
        return (a + b * b + 0.25 * a * b,)
    return (a * a + b + 1.0, b * b + 2.0 * a)


def group_average(
    x: Point, group_elements: tuple[int, ...], averaged_elements: tuple[int, ...],
    output: str, activation: str,
) -> Value:
    if not averaged_elements:
        raise ValueError("an averaging set must be nonempty")
    if any(g not in group_elements for g in averaged_elements):
        raise ValueError("averaging elements must belong to the group")
    number = 1 if output == "scalar" else 2
    total = [0.0] * number
    for g in averaged_elements:
        # f(gx) is transformed back by rho_out(g^{-1}) before summation.
        transformed = base_function(rotate(x, g), output, activation)
        corrected = output_action(transformed, (-g) % 4, output)
        for i in range(number):
            total[i] += corrected[i]
    return tuple(v / len(averaged_elements) for v in total)


def function(x: Point, group_elements: tuple[int, ...], used: tuple[int, ...],
             output: str, activation: str, average: str) -> Value:
    if average == "raw":
        return base_function(x, output, activation)
    return group_average(x, group_elements, used, output, activation)


def residual(group: str, output: str, activation: str, average: str) -> dict:
    full = elements(group)
    if average == "full":
        used = full
    elif average == "partial":
        used = (full[0],) if group == "C2" else full[:2]
    else:
        used = ()
    maximum = -1.0
    witness: dict = {}
    for x in SAMPLES:
        for h in full:
            lhs = function(rotate(x, h), full, used, output, activation, average)
            rhs = output_action(function(x, full, used, output, activation, average), h, output)
            difference = math.sqrt(sum((a - b) ** 2 for a, b in zip(lhs, rhs)))
            if difference > maximum:
                maximum = difference
                witness = {"input": x, "group_element_r_quarter_turns": h,
                           "lhs": lhs, "rhs": rhs}
    return {"group": group, "output": output, "activation": activation,
            "average": average, "averaged_elements": list(used),
            "number_of_cases": len(SAMPLES) * len(full),
            "max_equivariance_residual": maximum, "worst_case": witness}


def self_test() -> None:
    checks = 0
    for group in ("C2", "C4"):
        full = elements(group)
        for g in full:
            for h in full:
                for x in SAMPLES:
                    assert rotate(rotate(x, h), g) == rotate(x, (g + h) % 4)
                    checks += 1
        for output in ("scalar", "vector"):
            for activation in ("poly", "relu"):
                report = residual(group, output, activation, "full")
                assert report["max_equivariance_residual"] < 1e-11, report
                checks += 1

    partial = residual("C4", "scalar", "poly", "partial")
    assert partial["max_equivariance_residual"] > 0.1
    partial_c2 = residual("C2", "scalar", "poly", "partial")
    assert partial_c2["averaged_elements"] == [0]
    assert partial_c2["max_equivariance_residual"] > 0.1
    naive = residual("C4", "vector", "relu", "raw")
    assert naive["max_equivariance_residual"] > 0.1
    print(json.dumps({"self_test": "passed", "checks": checks + 3}, ensure_ascii=False))


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--group", choices=("C2", "C4"), default="C4")
    parser.add_argument("--output", choices=("scalar", "vector"), default="vector")
    parser.add_argument("--activation", choices=("poly", "relu"), default="poly")
    parser.add_argument("--average", choices=("raw", "partial", "full"), default="full")
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        self_test()
        return
    result = residual(args.group, args.output, args.activation, args.average)
    result["raw_baseline"] = residual(args.group, args.output, args.activation, "raw")[
        "max_equivariance_residual"
    ]
    result["full_group_control"] = residual(args.group, args.output, args.activation, "full")[
        "max_equivariance_residual"
    ]
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
