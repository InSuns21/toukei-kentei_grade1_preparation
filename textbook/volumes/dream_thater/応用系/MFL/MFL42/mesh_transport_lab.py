#!/usr/bin/env python3
"""MFL42: periodic latitude mesh / gauge / transport / stability checks.

Only the Python standard library is required. No random seed or learned model.
The continuum target is -D_t^2 along a sphere latitude, not the full
sphere Laplace--Beltrami operator.
"""

import argparse
import math


def rot(theta):
    c, s = math.cos(theta), math.sin(theta)
    return ((c, -s), (s, c))


def mul(a, b):
    return tuple(tuple(sum(a[i][p] * b[p][j] for p in range(2)) for j in range(2)) for i in range(2))


def transpose(a):
    return ((a[0][0], a[1][0]), (a[0][1], a[1][1]))


def mv(a, v):
    return tuple(sum(a[i][j] * v[j] for j in range(2)) for i in range(2))


def sub(a, b):
    return (a[0] - b[0], a[1] - b[1])


def length(v):
    return math.hypot(v[0], v[1])


def max_difference(a, b):
    return max(length(sub(x, y)) for x, y in zip(a, b))


def apply_laplacian(c, plus, minus, h):
    n = len(c)
    return [
        tuple((2 * c[i][p] - mv(plus[i], c[(i + 1) % n])[p]
               - mv(minus[i], c[(i - 1) % n])[p]) / h**2 for p in range(2))
        for i in range(n)
    ]


def transform_edges(plus, minus, gauges):
    n = len(gauges)
    new_plus = [mul(mul(transpose(gauges[i]), plus[i]), gauges[(i + 1) % n]) for i in range(n)]
    new_minus = [mul(mul(transpose(gauges[i]), minus[i]), gauges[(i - 1) % n]) for i in range(n)]
    return new_plus, new_minus


def run_case(n, amplitude=0.4, mode=1, k=0.5):
    if n < 4 or not isinstance(n, int):
        raise ValueError("n must be an integer >= 4")
    h = 2 * math.pi / n
    times = [i * h for i in range(n)]
    c = [mv(rot(mode * t), (1.0, 0.0)) for t in times]
    exact_plus = [rot(k * h) for _ in times]
    exact_minus = [rot(-k * h) for _ in times]
    old = apply_laplacian(c, exact_plus, exact_minus, h)
    continuum = [tuple((mode + k)**2 * value for value in v) for v in c]
    consistency = max_difference(old, continuum)
    consistency_bound = (mode + k)**4 * h**2 / 12

    # Arbitrary independent O(2) gauges, including reflections.
    reflections = ((1.0, 0.0), (0.0, -1.0))
    gauges = [mul(rot(0.13 + 0.7 * i), reflections) if i % 3 == 1
              else rot(0.13 + 0.7 * i) for i in range(n)]
    transformed_c = [mv(transpose(s), v) for s, v in zip(gauges, c)]
    trans_plus, trans_minus = transform_edges(exact_plus, exact_minus, gauges)
    transformed_old = apply_laplacian(transformed_c, trans_plus, trans_minus, h)
    expected_old = [mv(transpose(s), v) for s, v in zip(gauges, old)]
    gauge_residual = max_difference(transformed_old, expected_old)

    # Smooth rotation psi(t)=amplitude*sin(t). Transforming the exact
    # edge is algebraically equivariant; separately midpoint-integrating
    # the transformed connection generally is not.
    smooth_gauges = [rot(amplitude * math.sin(t)) for t in times]
    smooth_c = [mv(transpose(s), v) for s, v in zip(smooth_gauges, c)]
    exact_new_plus, exact_new_minus = transform_edges(exact_plus, exact_minus, smooth_gauges)
    exact_new = apply_laplacian(smooth_c, exact_new_plus, exact_new_minus, h)
    expected_new = [mv(transpose(s), v) for s, v in zip(smooth_gauges, old)]
    exact_new_residual = max_difference(exact_new, expected_new)
    # At i=n-1, the forward point is t_i+h=2*pi; at i=0 the
    # backward point is -h. The midpoint cosine is periodic.
    midpoint_plus = [rot((k + amplitude * math.cos(t + h / 2)) * h) for t in times]
    midpoint_minus = [rot(-(k + amplitude * math.cos(t - h / 2)) * h) for t in times]
    mid_new = apply_laplacian(smooth_c, midpoint_plus, midpoint_minus, h)
    reintegration_residual = max_difference(mid_new, expected_new)
    midpoint_bound = abs(amplitude) * h / 12
    transport_angle_bound = abs(amplitude) * h**3 / 24

    return {
        "n": n, "h": h, "consistency": consistency,
        "consistency_bound": consistency_bound,
        "gauge_residual": gauge_residual,
        "exact_new_residual": exact_new_residual,
        "reintegration_residual": reintegration_residual,
        "midpoint_bound": midpoint_bound,
        "transport_angle_bound": transport_angle_bound,
    }


def instability_case():
    n = 8
    h = 2 * math.pi / n
    c = [(float((-1)**i), 0.0) for i in range(n)]
    identity = [rot(0.0) for _ in range(n)]
    lap = apply_laplacian(c, identity, identity, h)
    r = 0.6
    next_c = [tuple(c[i][p] - r * h**2 * lap[i][p] for p in range(2)) for i in range(n)]
    ratio = math.sqrt(sum(length(v)**2 for v in next_c) / sum(length(v)**2 for v in c))
    return ratio


def self_test(amplitude):
    runs = [run_case(n, amplitude) for n in (8, 16, 32, 64)]
    print("N   h       continuum error   gauge O(2) residual   re-integrate residual")
    for r in runs:
        print(f"{r['n']:2d}  {r['h']:.5f}  {r['consistency']:.8f}        "
              f"{r['gauge_residual']:.3e}           {r['reintegration_residual']:.6e}")
        assert r["consistency"] <= r["consistency_bound"] + 1e-11, r
        assert r["gauge_residual"] < 1e-10, r
        assert r["exact_new_residual"] < 1e-10, r
        assert r["reintegration_residual"] <= r["midpoint_bound"] + 1e-10, r
    for prev, curr in zip(runs, runs[1:]):
        assert prev["consistency"] > 3.5 * curr["consistency"], (prev, curr)
    # This counterexample is independent of the smooth gauge amplitude.
    ratio = instability_case()
    assert abs(ratio - 1.4) < 1e-12, ratio
    if amplitude != 0:
        assert max(x["reintegration_residual"] for x in runs) > 1e-9
    print(f"unstable alternating-mode amplification (tau/h^2=0.6): {ratio:.6f}")
    print("PASS: 4 refinements, O(2) frames, midpoint error bounds, unstable control")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--amplitude", type=float, default=0.4)
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if not math.isfinite(args.amplitude):
        parser.error("amplitude must be finite")
    if args.self_test:
        self_test(args.amplitude)
    else:
        r = run_case(16, args.amplitude)
        for key, value in r.items():
            print(f"{key}: {value}")


if __name__ == "__main__":
    main()
