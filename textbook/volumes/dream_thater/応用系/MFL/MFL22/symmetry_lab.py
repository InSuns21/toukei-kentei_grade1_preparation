#!/usr/bin/env python3
"""MFL22: finite symmetry residuals and the limitation of augmentation."""

from __future__ import annotations

import argparse
import json
import math
from typing import Callable


Vector = tuple[float, float]


def rotate(x: Vector) -> Vector:
    return -x[1], x[0]


def reflect(x: Vector) -> Vector:
    return -x[0], x[1]


def swap(x: Vector) -> Vector:
    return x[1], x[0]


TRANSFORMS: dict[str, Callable[[Vector], Vector]] = {
    "rotate": rotate,
    "reflect": reflect,
    "swap": swap,
}


def norm_sq(x: Vector) -> float:
    return x[0] * x[0] + x[1] * x[1]


def predict(model: str, x: Vector, epsilon: float) -> Vector | float:
    if model == "identity":
        return x
    if model == "norm":
        return norm_sq(x)
    if model == "sum":
        return x[0] + x[1]
    if model == "first":
        return x[0]
    if model == "augmented":
        return x[0] + epsilon * (norm_sq(x) - 1.0), x[1]
    raise ValueError(f"unknown model: {model}")


def residual_report(transform: str, model: str, x: Vector, epsilon: float) -> dict:
    operation = TRANSFORMS[transform]
    transformed = operation(x)
    after_input = predict(model, transformed, epsilon)
    original_prediction = predict(model, x, epsilon)
    vector_output = model in {"identity", "augmented"}
    if vector_output:
        assert isinstance(original_prediction, tuple)
        assert isinstance(after_input, tuple)
        after_output = operation(original_prediction)
        error = math.hypot(
            after_input[0] - after_output[0], after_input[1] - after_output[1]
        )
    else:
        assert isinstance(original_prediction, float)
        assert isinstance(after_input, float)
        after_output = original_prediction  # scalar output: trivial transformation
        error = abs(after_input - after_output)

    report = {
        "transform": transform,
        "model": model,
        "input": x,
        "transformed_input": transformed,
        "output_type": "vector" if vector_output else "scalar",
        "predict_after_transform": after_input,
        "transform_after_predict": after_output,
        "equivariance_residual": error,
        "epsilon": epsilon if model == "augmented" else None,
    }
    if model == "augmented":
        unit_orbit = [(1.0, 0.0), (0.0, 1.0), (-1.0, 0.0), (0.0, -1.0)]
        training_errors = []
        for point in unit_orbit:
            value = predict(model, point, epsilon)
            assert isinstance(value, tuple)
            training_errors.append(math.hypot(value[0] - point[0], value[1] - point[1]))
        report["augmented_training_max_error"] = max(training_errors)
        report["augmented_training_count"] = len(unit_orbit)
    return report


def self_test() -> None:
    assert rotate(rotate(rotate(rotate((1.0, 2.0))))) == (1.0, 2.0)
    assert reflect(reflect((1.0, 2.0))) == (1.0, 2.0)
    assert swap(swap((1.0, 2.0))) == (1.0, 2.0)
    for operation in TRANSFORMS.values():
        assert norm_sq(operation((3.0, 4.0))) == 25.0
    for transform in TRANSFORMS:
        assert residual_report(transform, "identity", (1.0, 2.0), 0.2)["equivariance_residual"] < 1e-12
        assert residual_report(transform, "norm", (1.0, 2.0), 0.2)["equivariance_residual"] < 1e-12
    assert residual_report("swap", "sum", (1.0, 2.0), 0.2)["equivariance_residual"] < 1e-12
    assert residual_report("reflect", "first", (1.0, 2.0), 0.2)["equivariance_residual"] == 2.0
    assert residual_report("swap", "first", (1.0, 2.0), 0.2)["equivariance_residual"] == 1.0
    unit = residual_report("rotate", "augmented", (1.0, 0.0), 0.2)
    assert unit["equivariance_residual"] == 0.0
    assert unit["augmented_training_max_error"] == 0.0
    outside = residual_report("rotate", "augmented", (2.0, 0.0), 0.2)
    assert math.isclose(outside["equivariance_residual"], 0.6 * math.sqrt(2), rel_tol=1e-12)
    print(json.dumps({"self_test": "passed", "checks": 18}, ensure_ascii=False))


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--transform", choices=sorted(TRANSFORMS), default="rotate")
    parser.add_argument(
        "--model",
        choices=["identity", "norm", "sum", "first", "augmented"],
        default="identity",
    )
    parser.add_argument("--x", type=float, default=1.0)
    parser.add_argument("--y", type=float, default=2.0)
    parser.add_argument("--epsilon", type=float, default=0.2)
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        self_test()
        return
    if not all(math.isfinite(value) for value in (args.x, args.y, args.epsilon)):
        parser.error("x, y, epsilon must be finite")
    result = residual_report(args.transform, args.model, (args.x, args.y), args.epsilon)
    print(json.dumps(result, ensure_ascii=False, indent=2, allow_nan=False))


if __name__ == "__main__":
    main()
