#!/usr/bin/env python3
"""MFL37: finite SO(3)/O(3) steerable feature checks, standard library only."""

from __future__ import annotations

import argparse
import json
import math

Vector = tuple[float, float, float]
Matrix = tuple[Vector, Vector, Vector]

IDENTITY: Matrix = ((1.0, 0.0, 0.0), (0.0, 1.0, 0.0), (0.0, 0.0, 1.0))
ROTATE90: Matrix = ((0.0, -1.0, 0.0), (1.0, 0.0, 0.0), (0.0, 0.0, 1.0))
ROTATE180: Matrix = ((-1.0, 0.0, 0.0), (0.0, -1.0, 0.0), (0.0, 0.0, 1.0))
REFLECT: Matrix = ((-1.0, 0.0, 0.0), (0.0, 1.0, 0.0), (0.0, 0.0, 1.0))
TRANSFORMS: dict[str, Matrix] = {
    "identity": IDENTITY,
    "rotate90": ROTATE90,
    "rotate180": ROTATE180,
    "reflect": REFLECT,
}


def dot(a: Vector, b: Vector) -> float:
    return sum(a[i] * b[i] for i in range(3))


def add(a: Vector, b: Vector) -> Vector:
    return tuple(a[i] + b[i] for i in range(3))  # type: ignore[return-value]


def sub(a: Vector, b: Vector) -> Vector:
    return tuple(a[i] - b[i] for i in range(3))  # type: ignore[return-value]


def mul(c: float, a: Vector) -> Vector:
    return tuple(c * a[i] for i in range(3))  # type: ignore[return-value]


def matvec(a: Matrix, v: Vector) -> Vector:
    return tuple(dot(row, v) for row in a)  # type: ignore[return-value]


def transpose(a: Matrix) -> Matrix:
    return tuple(tuple(a[i][j] for i in range(3)) for j in range(3))  # type: ignore[return-value]


def mm(a: Matrix, b: Matrix) -> Matrix:
    bt = transpose(b)
    return tuple(tuple(dot(row, col) for col in bt) for row in a)  # type: ignore[return-value]


def madd(a: Matrix, b: Matrix) -> Matrix:
    return tuple(tuple(a[i][j] + b[i][j] for j in range(3))
                 for i in range(3))  # type: ignore[return-value]


def mscale(c: float, a: Matrix) -> Matrix:
    return tuple(tuple(c * a[i][j] for j in range(3))
                 for i in range(3))  # type: ignore[return-value]


def transform_tensor(q: Matrix, t: Matrix) -> Matrix:
    return mm(mm(q, t), transpose(q))


def outer_traceless(v: Vector) -> Matrix:
    u = dot(v, v)
    return tuple(tuple(v[i] * v[j] - (u / 3.0 if i == j else 0.0)
                       for j in range(3)) for i in range(3))  # type: ignore[return-value]


def gate(s: float, v: Vector, t: Matrix, scale: float) -> tuple[float, Vector, Matrix]:
    # F(s,v,T) = (s, s v + scale T v, T + scale (vv^T - |v|^2 I / 3)).
    return s, add(mul(s, v), mul(scale, matvec(t, v))), madd(t, mscale(scale, outer_traceless(v)))


def vector_norm(v: Vector) -> float:
    return math.sqrt(dot(v, v))


def mat_norm(a: Matrix) -> float:
    return math.sqrt(sum(a[i][j] ** 2 for i in range(3) for j in range(3)))


def mat_sub(a: Matrix, b: Matrix) -> Matrix:
    return madd(a, mscale(-1.0, b))


def trace(a: Matrix) -> float:
    return sum(a[i][i] for i in range(3))


def symmetry_error(a: Matrix) -> float:
    return mat_norm(mat_sub(a, transpose(a)))


def relu(v: Vector) -> Vector:
    return tuple(max(0.0, z) for z in v)  # type: ignore[return-value]


def bad_weight(v: Vector) -> Vector:
    return (2.0 * v[0], v[1], v[2])


def cross(a: Vector, b: Vector) -> Vector:
    return (a[1] * b[2] - a[2] * b[1],
            a[2] * b[0] - a[0] * b[2],
            a[0] * b[1] - a[1] * b[0])


def det(q: Matrix) -> float:
    return dot(q[0], cross(q[1], q[2]))


def calculate(shape: str, transformation: str, scale: float) -> dict[str, object]:
    shapes: dict[str, Vector] = {"basic": (1.0, 0.0, 0.0), "mixed": (1.0, 1.0, 0.0)}
    v = shapes[shape]
    t: Matrix = ((1.0, 0.0, 0.0), (0.0, -1.0, 0.0), (0.0, 0.0, 0.0))
    s = 2.0
    q = TRANSFORMS[transformation]
    qv = matvec(q, v)
    qt = transform_tensor(q, t)
    s0, v0, t0 = gate(s, v, t, scale)
    s1, v1, t1 = gate(s, qv, qt, scale)
    # Use independent polar vectors; for the mixed case, one is T v.
    w = (0.0, 1.0, 0.0) if shape == "basic" else matvec(t, v)
    cross_before = cross(v, w)
    cross_after = cross(qv, matvec(q, w))
    polar_assumption = matvec(q, cross_before)
    axial_expected = mul(det(q), polar_assumption)
    return {
        "shape": shape,
        "transformation": transformation,
        "det_Q": det(q),
        "scale": scale,
        "input_vector": v,
        "rotated_vector": qv,
        "scalar_equivariance_error": abs(s1 - s0),
        "vector_gate_equivariance_error": vector_norm(sub(v1, matvec(q, v0))),
        "tensor_gate_equivariance_error": mat_norm(mat_sub(t1, transform_tensor(q, t0))),
        "tensor_trace_error": abs(trace(t1)),
        "tensor_symmetry_error": symmetry_error(t1),
        "bad_weight_equivariance_error": vector_norm(sub(bad_weight(qv), matvec(q, bad_weight(v)))),
        "componentwise_relu_equivariance_error": vector_norm(sub(relu(qv), matvec(q, relu(v)))),
        "cross_as_polar_error": vector_norm(sub(cross_after, polar_assumption)),
        "cross_as_axial_error": vector_norm(sub(cross_after, axial_expected)),
    }


def self_test() -> None:
    total = 0
    for shape in ("basic", "mixed"):
        for transformation in TRANSFORMS:
            for scale in (0.0, 0.5, 1.0, 2.0):
                r = calculate(shape, transformation, scale)
                for key in (
                    "scalar_equivariance_error", "vector_gate_equivariance_error",
                    "tensor_gate_equivariance_error", "tensor_trace_error",
                    "tensor_symmetry_error", "cross_as_axial_error",
                ):
                    assert float(r[key]) < 1e-12, (shape, transformation, scale, key, r[key])
                total += 1
    assert math.isclose(float(calculate("basic", "rotate90", 1.0)["bad_weight_equivariance_error"]), 1.0)
    assert math.isclose(float(calculate("basic", "rotate180", 1.0)["componentwise_relu_equivariance_error"]), 1.0)
    assert math.isclose(float(calculate("basic", "reflect", 1.0)["cross_as_polar_error"]), 2.0)
    assert math.isclose(float(calculate("mixed", "reflect", 1.0)["cross_as_polar_error"]), 4.0)
    print(f"MFL37 steerable lab self-test: PASS ({total} deterministic cases)")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--shape", choices=("basic", "mixed"), default="basic")
    parser.add_argument("--transform", choices=tuple(TRANSFORMS), default="rotate90")
    parser.add_argument("--scale", type=float, default=1.0)
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        self_test()
        return
    if not math.isfinite(args.scale):
        parser.error("--scale must be finite")
    print(json.dumps(calculate(args.shape, args.transform, args.scale), ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
