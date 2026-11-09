#!/usr/bin/env python3
"""MFL40: deterministic two-end gauge transport and cycle checks; stdlib only."""

from __future__ import annotations

import argparse
import json
import math

Matrix = tuple[tuple[float, float], tuple[float, float]]
Vector = tuple[float, float]
Vector3 = tuple[float, float, float]


def rotation(angle: float) -> Matrix:
    c, s = math.cos(angle), math.sin(angle)
    return ((c, -s), (s, c))


def gauge(angle: float, reflection: bool) -> Matrix:
    """R(angle) diag(1,-1) for an orientation-reversing frame when requested."""
    c, s = math.cos(angle), math.sin(angle)
    return ((c, s if reflection else -s), (s, -c if reflection else c))


def transpose(a: Matrix) -> Matrix:
    return ((a[0][0], a[1][0]), (a[0][1], a[1][1]))


def mm(a: Matrix, b: Matrix) -> Matrix:
    return tuple(tuple(sum(a[i][k] * b[k][j] for k in range(2))
                       for j in range(2)) for i in range(2))  # type: ignore[return-value]


def mv(a: Matrix, v: Vector) -> Vector:
    return (a[0][0] * v[0] + a[0][1] * v[1],
            a[1][0] * v[0] + a[1][1] * v[1])


def vec_residual(a: Vector, b: Vector) -> float:
    return math.hypot(a[0] - b[0], a[1] - b[1])


def mat_residual(a: Matrix, b: Matrix) -> float:
    return max(abs(a[i][j] - b[i][j]) for i in range(2) for j in range(2))


def determinant(a: Matrix) -> float:
    return a[0][0] * a[1][1] - a[0][1] * a[1][0]


def trace(a: Matrix) -> float:
    return a[0][0] + a[1][1]


def sphere_frame(theta: float, phi: float) -> tuple[Vector3, Vector3]:
    ct, st = math.cos(theta), math.sin(theta)
    cp, sp = math.cos(phi), math.sin(phi)
    return ((ct * cp, ct * sp, -st), (-sp, cp, 0.0))


def ambient(frame: tuple[Vector3, Vector3], components: Vector) -> Vector3:
    return tuple(frame[0][k] * components[0] + frame[1][k] * components[1]
                 for k in range(3))  # type: ignore[return-value]


def rotated_frame(frame: tuple[Vector3, Vector3], change: Matrix
                  ) -> tuple[Vector3, Vector3]:
    return (ambient(frame, (change[0][0], change[1][0])),
            ambient(frame, (change[0][1], change[1][1])))


def evaluate(theta: float, delta: float, alpha_i: float, alpha_j: float,
             reflect_i: bool = False, reflect_j: bool = False) -> dict[str, object]:
    if not (0 < theta < math.pi and -math.pi < delta < math.pi and
            all(math.isfinite(x) for x in (theta, delta, alpha_i, alpha_j))):
        raise ValueError("Require 0<theta<pi, -pi<delta<pi and finite angles.")

    # On the latitude from phi=0 (j) to phi=delta (i): A=cos(theta) J.
    t = rotation(-math.cos(theta) * delta)
    ri, rj = gauge(alpha_i, reflect_i), gauge(alpha_j, reflect_j)
    changed = mm(mm(transpose(ri), t), rj)
    source: Vector = (1.0, 0.0)
    source_changed = mv(transpose(rj), source)
    target = mv(t, source)
    target_changed = mv(changed, source_changed)
    expected_changed = mv(transpose(ri), target)
    wrong_one_sided = mv(mm(transpose(ri), t), source_changed)
    changed_reverse = mm(mm(transpose(rj), transpose(t)), ri)

    # Reconstruct the *same* ambient tangent vector using both end frames.
    frame_i = sphere_frame(theta, delta)
    frame_j = sphere_frame(theta, 0.0)
    ambient_target = ambient(frame_i, target)
    ambient_changed = ambient(rotated_frame(frame_i, ri), target_changed)
    ambient_source = ambient(frame_j, source)
    ambient_source_changed = ambient(rotated_frame(frame_j, rj), source_changed)

    # A separate finite triangle of orthogonal transports tests conjugacy.
    t01, t12, t20 = rotation(0.4), rotation(-0.2), rotation(0.7)
    r0, r1, r2 = ri, rj, gauge(0.31, True)
    h = mm(mm(t01, t12), t20)
    h_changed = mm(mm(
        mm(mm(transpose(r0), t01), r1),
        mm(mm(transpose(r1), t12), r2)),
        mm(mm(transpose(r2), t20), r0))
    h_expected = mm(mm(transpose(r0), h), r0)

    return {
        "theta_radians": theta,
        "latitude_delta_radians": delta,
        "source_frame_rotation_radians": alpha_j,
        "target_frame_rotation_radians": alpha_i,
        "source_reflection": reflect_j,
        "target_reflection": reflect_i,
        "edge_transport_matrix": t,
        "edge_transport_after_both_end_changes": changed,
        "source_components_before": source,
        "source_components_after": source_changed,
        "target_components_before": target,
        "target_components_after": target_changed,
        "two_end_covariance_residual": vec_residual(target_changed, expected_changed),
        "ambient_source_reconstruction_residual": math.dist(
            ambient_source, ambient_source_changed),
        "ambient_target_reconstruction_residual": math.dist(
            ambient_target, ambient_changed),
        "transport_orthogonality_residual": mat_residual(
            mm(transpose(changed), changed), rotation(0)),
        "reverse_transport_residual": mat_residual(
            changed_reverse, transpose(changed)),
        "one_sided_output_residual": vec_residual(wrong_one_sided, expected_changed),
        "cycle_holonomy": h,
        "cycle_holonomy_after_gauge": h_changed,
        "cycle_conjugacy_residual": mat_residual(h_changed, h_expected),
        "cycle_trace_residual": abs(trace(h_changed) - trace(h)),
        "cycle_determinant_residual": abs(determinant(h_changed) - determinant(h)),
    }


def self_test() -> None:
    checked = 0
    wrong_cases = 0
    for theta in (0.25, math.pi / 3, math.pi / 2, 2.6):
        for delta in (-1.3, 0.0, 0.7, math.pi / 2):
            for alpha_i in (-math.pi / 2, 0.3, math.pi / 2):
                for alpha_j in (-math.pi / 2, 0.0, 0.5):
                    for reflect_i in (False, True):
                        for reflect_j in (False, True):
                            output = evaluate(theta, delta, alpha_i, alpha_j,
                                              reflect_i, reflect_j)
                            for name in (
                                "two_end_covariance_residual",
                                "ambient_source_reconstruction_residual",
                                "ambient_target_reconstruction_residual",
                                "transport_orthogonality_residual",
                                "reverse_transport_residual",
                                "cycle_conjugacy_residual",
                                "cycle_trace_residual",
                                "cycle_determinant_residual",
                            ):
                                assert output[name] < 1e-12, (name, output)
                            if output["one_sided_output_residual"] > 0.1:
                                wrong_cases += 1
                            checked += 1
    assert wrong_cases > 0
    print(json.dumps({"status": "passed", "cases": checked,
                      "one_sided_failure_cases": wrong_cases}, ensure_ascii=False))


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--theta", type=float, default=math.pi / 3)
    parser.add_argument("--delta", type=float, default=math.pi / 2)
    parser.add_argument("--alpha-i", type=float, default=math.pi / 2)
    parser.add_argument("--alpha-j", type=float, default=-math.pi / 2)
    parser.add_argument("--reflect-i", action="store_true")
    parser.add_argument("--reflect-j", action="store_true")
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        self_test()
    else:
        print(json.dumps(evaluate(args.theta, args.delta, args.alpha_i,
                                  args.alpha_j, args.reflect_i, args.reflect_j),
                         ensure_ascii=False, indent=2))
