#!/usr/bin/env python3
"""MFL39: deterministic cylinder chart and sphere moving-frame checks; stdlib only."""

from __future__ import annotations

import argparse
import json
import math


def dot(a: tuple[float, ...], b: tuple[float, ...]) -> float:
    return sum(x * y for x, y in zip(a, b))


def add(a: tuple[float, ...], b: tuple[float, ...]) -> tuple[float, ...]:
    return tuple(x + y for x, y in zip(a, b))


def scale(k: float, a: tuple[float, ...]) -> tuple[float, ...]:
    return tuple(k * x for x in a)


def norm(a: tuple[float, ...]) -> float:
    return math.sqrt(dot(a, a))


def sphere(theta: float, phi: float):
    st, ct, sp, cp = math.sin(theta), math.cos(theta), math.sin(phi), math.cos(phi)
    p = (st * cp, st * sp, ct)
    eth = (ct * cp, ct * sp, -st)
    eph = (-sp, cp, 0.0)
    return p, eth, eph


def constant_frame_vector(theta: float, phi: float, a: float, b: float):
    _, eth, eph = sphere(theta, phi)
    return add(scale(a, eth), scale(b, eph))


def evaluate(theta: float, phi: float, alpha: float, h: float,
             a: float = 1.0, b: float = 2.0) -> dict[str, object]:
    if not (0.0 < theta < math.pi and -math.pi + h < phi < math.pi - h
            and 0.0 < h < 0.2 and math.isfinite(alpha)):
        raise ValueError("Use 0<theta<pi, -pi+h<phi<pi-h and 0<h<0.2.")

    p, eth, eph = sphere(theta, phi)
    ca, sa = math.cos(alpha), math.sin(alpha)
    # E' = E R(alpha), and c' = R(alpha)^T c.
    e1p = add(scale(ca, eth), scale(sa, eph))
    e2p = add(scale(-sa, eth), scale(ca, eph))
    ap, bp = ca * a + sa * b, -sa * a + ca * b
    old_vector = constant_frame_vector(theta, phi, a, b)
    new_vector = add(scale(ap, e1p), scale(bp, e2p))
    old_chart_coeffs = (a, b / math.sin(theta))
    old_chart_metric_norm_sq = a * a + (
        math.sin(theta) ** 2 * old_chart_coeffs[1] ** 2
    )

    # Fixed latitude: the exact tangent part of dV/dphi for constant a,b.
    k = math.cos(theta)
    exact = add(scale(-k * b, eth), scale(k * a, eph))
    plus = constant_frame_vector(theta, phi + h, a, b)
    minus = constant_frame_vector(theta, phi - h, a, b)
    ambient_centered = scale(1.0 / (2 * h), add(plus, scale(-1.0, minus)))
    projected = add(ambient_centered, scale(-dot(ambient_centered, p), p))
    derivative_residual = norm(add(projected, scale(-1.0, exact)))

    # Cylinder at t=1/2: v_old=(2,-1), v_new=(1,-1).
    t = 0.5
    vx = (2.0, -1.0)
    vy = (vx[0] + 2 * t * vx[1], vx[1])
    metric_y = ((1.0, -2.0 * t), (-2.0 * t, 1.0 + 4.0 * t * t))
    norm_old = dot(vx, vx)
    norm_new = (
        metric_y[0][0] * vy[0] ** 2
        + 2 * metric_y[0][1] * vy[0] * vy[1]
        + metric_y[1][1] * vy[1] ** 2
    )

    return {
        "sphere_point_xyz": p,
        "sphere_frame_e_theta": eth,
        "sphere_frame_e_phi": eph,
        "frame_rotation_radians": alpha,
        "frame_components_before": (a, b),
        "frame_components_after": (ap, bp),
        "embedded_vector_before": old_vector,
        "embedded_vector_after": new_vector,
        "frame_reconstruction_residual": norm(add(old_vector, scale(-1.0, new_vector))),
        "tangency_residual": abs(dot(p, old_vector)),
        "orthonormal_frame_residual": max(
            abs(dot(e1p, e1p) - 1), abs(dot(e2p, e2p) - 1), abs(dot(e1p, e2p))
        ),
        "norm_squared_orthonormal": dot(old_vector, old_vector),
        "norm_squared_coordinate_metric": old_chart_metric_norm_sq,
        "analytic_covariant_derivative_xyz": exact,
        "projected_centered_difference_xyz": projected,
        "finite_difference_residual": derivative_residual,
        "expected_centered_residual": norm(exact) * abs(math.sin(h) / h - 1),
        "cylinder_chart_old_components": vx,
        "cylinder_chart_new_components": vy,
        "cylinder_metric_old_norm_squared": norm_old,
        "cylinder_metric_new_norm_squared": norm_new,
        "cylinder_metric_residual": abs(norm_old - norm_new),
    }


def self_test() -> None:
    cases = 0
    for theta in (0.3, math.pi / 3, math.pi / 2, 2.0, 2.8):
        for phi in (-1.2, 0.0, 1.2):
            for alpha in (-0.7, 0.0, math.pi / 2):
                coarse = evaluate(theta, phi, alpha, 0.04)
                fine = evaluate(theta, phi, alpha, 0.02)
                assert coarse["frame_reconstruction_residual"] < 1e-12
                assert coarse["tangency_residual"] < 1e-12
                assert coarse["orthonormal_frame_residual"] < 1e-12
                assert abs(coarse["norm_squared_orthonormal"]
                           - coarse["norm_squared_coordinate_metric"]) < 1e-12
                assert coarse["cylinder_metric_residual"] < 1e-12
                assert abs(coarse["finite_difference_residual"]
                           - coarse["expected_centered_residual"]) < 1e-11
                if coarse["finite_difference_residual"] > 1e-10:
                    ratio = fine["finite_difference_residual"] / coarse[
                        "finite_difference_residual"
                    ]
                    assert 0.24 < ratio < 0.26, (theta, phi, alpha, ratio)
                cases += 1
    print(json.dumps({"passed_cases": cases, "status": "passed"}, ensure_ascii=False))


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--theta", type=float, default=math.pi / 3)
    parser.add_argument("--phi", type=float, default=0.3)
    parser.add_argument("--alpha", type=float, default=math.pi / 2)
    parser.add_argument("--h", type=float, default=0.02)
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        self_test()
    else:
        print(json.dumps(evaluate(args.theta, args.phi, args.alpha, args.h),
                         ensure_ascii=False, indent=2))
