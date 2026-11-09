#!/usr/bin/env python3
"""Deterministic finite graph gauge-equivariant convolution checks (MFL41).

This tests algebraic identities; it does not approximate a manifold's connection.
"""

import argparse
import math


def mm(a, b):
    return [[sum(a[i][k] * b[k][j] for k in range(2)) for j in range(2)] for i in range(2)]


def mv(a, v):
    return [sum(a[i][k] * v[k] for k in range(2)) for i in range(2)]


def tr(a):
    return [[a[j][i] for j in range(2)] for i in range(2)]


def rot(theta):
    c, s = math.cos(theta), math.sin(theta)
    return [[c, -s], [s, c]]


def gauge(theta, reflect=False):
    q = rot(theta)
    return mm(q, [[1.0, 0.0], [0.0, -1.0]]) if reflect else q


def norm(v):
    return math.sqrt(sum(x * x for x in v))


def add(v, w):
    return [v[0] + w[0], v[1] + w[1]]


def scale(x, v):
    return [x * v[0], x * v[1]]


def gate(v):
    return scale(1.0 / (1.0 + norm(v) ** 2), v)


def conv(graph, fields, transports, weights, broken=None):
    result = {}
    distortion = [[2.0, 0.0], [0.0, 1.0]]
    for i, neighbors in graph.items():
        z = [0.0, 0.0]
        for j in neighbors:
            t = transports[(i, j)]
            if broken == "no-transport":
                t = [[1.0, 0.0], [0.0, 1.0]]
            v = mv(t, fields[j])
            if broken == "fixed-anisotropy":
                v = mv(distortion, v)
            z = add(z, scale(weights[(i, j)], v))
        result[i] = gate(z)
    return result


def trial(angles, reflections, verbose=False):
    graph = {0: (1, 2), 1: (0,), 2: (0,)}
    fields = {0: [1.0, 2.0], 1: [2.0, -1.0], 2: [-1.0, 3.0]}
    # Each oriented edge is assigned a matrix; opposites use the transpose.
    t01, t02 = rot(0.3), rot(-0.7)
    transports = {(0, 1): t01, (1, 0): tr(t01), (0, 2): t02, (2, 0): tr(t02)}
    weights = {(0, 1): 0.5, (1, 0): 0.5, (0, 2): 0.75, (2, 0): 0.75}

    r = {i: gauge(angles[i], reflections[i]) for i in graph}
    transformed_fields = {i: mv(tr(r[i]), fields[i]) for i in graph}
    transformed_transports = {
        (i, j): mm(mm(tr(r[i]), t), r[j]) for (i, j), t in transports.items()
    }
    out = conv(graph, fields, transports, weights)
    new = conv(graph, transformed_fields, transformed_transports, weights)
    residual = max(norm(add(new[i], scale(-1.0, mv(tr(r[i]), out[i])))) for i in graph)

    # The two intentionally broken implementations are recomputed in each frame.
    bad_residuals = {}
    for kind in ("no-transport", "fixed-anisotropy"):
        old_bad = conv(graph, fields, transports, weights, broken=kind)
        new_bad = conv(graph, transformed_fields, transformed_transports, weights, broken=kind)
        bad_residuals[kind] = max(
            norm(add(new_bad[i], scale(-1.0, mv(tr(r[i]), old_bad[i])))) for i in graph
        )
    if verbose:
        print("angles:", angles, "reflections:", reflections)
        print("gauge-equivariant residual:", f"{residual:.3e}")
        for key, value in bad_residuals.items():
            print(f"{key} residual:", f"{value:.6f}")
    return residual, bad_residuals


def self_test():
    cases = 0
    max_residual = 0.0
    max_broken = {"no-transport": 0.0, "fixed-anisotropy": 0.0}
    for angles in ((0.0, 0.0, 0.0), (0.2, -0.8, 1.3), (math.pi / 2, -math.pi / 3, 0.1)):
        for mask in range(8):
            reflected = tuple(bool(mask & (1 << i)) for i in range(3))
            residual, broken = trial(angles, reflected)
            assert math.isfinite(residual) and residual < 1e-12, (angles, reflected, residual)
            max_residual = max(max_residual, residual)
            for kind, value in broken.items():
                max_broken[kind] = max(max_broken[kind], value)
            cases += 1
    assert all(value > 0.1 for value in max_broken.values()), max_broken
    print(f"PASS: {cases} deterministic O(2) gauge cases")
    print(f"maximum correct residual: {max_residual:.3e}")
    for kind, value in max_broken.items():
        print(f"max {kind} counterexample residual: {value:.6f}")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--alpha", type=float, default=0.2)
    parser.add_argument("--beta", type=float, default=-0.8)
    parser.add_argument("--gamma", type=float, default=1.3)
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        self_test()
    else:
        trial((args.alpha, args.beta, args.gamma), (False, True, False), verbose=True)


if __name__ == "__main__":
    main()
