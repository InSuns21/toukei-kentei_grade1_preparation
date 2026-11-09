#!/usr/bin/env python3
"""MFL24 finite-group representations and intertwiner checks (stdlib only).

Enumerates every group element: a small calculation, not a test for all groups.
"""

import argparse


I = ((1, 0), (0, 1))
R = ((0, -1), (1, 0))
S = ((1, 0), (0, -1))


def multiply(a, b):
    return tuple(tuple(sum(a[i][k] * b[k][j] for k in range(2))
                       for j in range(2)) for i in range(2))


def matvec(a, x):
    return tuple(sum(a[i][j] * x[j] for j in range(2)) for i in range(2))


def subtract(a, b):
    return tuple(tuple(a[i][j] - b[i][j] for j in range(2))
                 for i in range(2))


def group_elements(group):
    powers = [I]
    for _ in range(3):
        powers.append(multiply(powers[-1], R))
    if group == "C2":
        return {"e": I, "s": S}
    if group == "C4":
        return {f"r^{k}": value for k, value in enumerate(powers)}
    if group == "D4":
        result = {f"r^{k}": value for k, value in enumerate(powers)}
        result.update({f"sr^{k}": multiply(S, value)
                       for k, value in enumerate(powers)})
        return result
    raise ValueError(f"unknown group: {group}")


def choices(group):
    # C2: even/odd feature channels may scale independently, but not mix.
    if group == "C2":
        return {"valid": ((2, 0), (0, 3)),
                "invalid": ((0, 1), (1, 0))}
    # C4: matrices aI+bR commute with the quarter-turn R.
    if group == "C4":
        return {"valid": ((2, -1), (1, 2)),
                "invalid": ((2, 0), (0, 1))}
    # D4: imposing the reflection S as well rules out bR.
    return {"valid": ((2, 0), (0, 2)),
            "invalid": ((2, -1), (1, 2))}


def residuals(group, matrix):
    """For identical input/output representations, check W rho(g) - rho(g) W."""
    elements = group_elements(group)
    x = (2, -1)
    results = []
    for name, g in elements.items():
        commutator = subtract(multiply(matrix, g), multiply(g, matrix))
        matrix_error = max(abs(v) for row in commutator for v in row)
        vector_error = max(abs(a - b) for a, b in zip(
            matvec(matrix, matvec(g, x)), matvec(g, matvec(matrix, x))))
        # A vector coincidence is insufficient: the matrix equality is the criterion.
        results.append((name, matrix_error, vector_error))
    return results


def self_test():
    for group, order in (("C2", 2), ("C4", 4), ("D4", 8)):
        elements = group_elements(group)
        values = set(elements.values())
        assert len(values) == order and I in values
        assert all(multiply(g, h) in values for g in values for h in values)
        examples = choices(group)
        assert max(row[1] for row in residuals(group, examples["valid"])) == 0
        assert max(row[1] for row in residuals(group, examples["invalid"])) > 0
    print("PASS: C2/C4/D4 cardinalities and closure; valid and invalid intertwiners")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--group", choices=("C2", "C4", "D4"), default="D4")
    parser.add_argument("--model", choices=("valid", "invalid", "both"), default="both")
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        self_test()
        return
    elements = group_elements(args.group)
    print(f"group={args.group}, elements={len(elements)}, feature space=R^2")
    models = choices(args.group)
    for name, matrix in models.items():
        if args.model not in ("both", name):
            continue
        rows = residuals(args.group, matrix)
        print(f"{name}: W={matrix}, max matrix residual={max(r[1] for r in rows)}")
        for element, matrix_error, vector_error in rows:
            print(f"  {element:4s}  matrix={matrix_error}  at x=(2,-1): {vector_error}")
    print("The matrix residual tests all inputs, unlike a single-vector check.")


if __name__ == "__main__":
    main()
