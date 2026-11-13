"""FLUID1: independent dimensional checks for microscopic and flow scales.

This program does not solve a continuum PDE or establish continuum validity.
No third-party Python package is required (also usable in Pyodide).
"""
from __future__ import annotations

import argparse
import json
import math
from typing import Any


def calculate(kind: str, micro_m: float, length_m: float,
              rho: float, eta: float, speed: float) -> dict[str, Any]:
    """Compute only algebraic ratios under a fixed-property model."""
    if kind not in {"gas", "liquid"}:
        raise ValueError("kind must be gas or liquid")
    values = {
        "micro_m": micro_m,
        "length_m": length_m,
        "rho": rho,
        "eta": eta,
        "speed": speed,
    }
    for name, value in values.items():
        if not math.isfinite(value) or value <= 0.0:
            raise ValueError(f"{name} must be positive and finite")

    ratio = micro_m / length_m
    nu = eta / rho
    reynolds = rho * speed * length_m / eta
    viscous_time = length_m * length_m / nu
    window_m = math.sqrt(micro_m) * math.sqrt(length_m) if micro_m < length_m else None
    metrics = [ratio, nu, reynolds, viscous_time]
    if window_m is not None:
        metrics.append(window_m)
    if any(not math.isfinite(x) for x in metrics):
        raise ValueError("derived values are not finite; rescale your input")

    return {
        "model_kind": kind,
        "micro_length_type": "mean_free_path" if kind == "gas" else "correlation_scale",
        "micro_ratio": ratio,
        "knudsen_number": ratio if kind == "gas" else None,
        "has_geometric_window": micro_m < length_m,
        "geometric_mean_m": window_m,
        "geometric_ratio": math.sqrt(ratio) if window_m is not None else None,
        "kinematic_viscosity_m2_s": nu,
        "reynolds_number": reynolds,
        "viscous_time_s": viscous_time,
        "warning": (
            "Algebraic checks only: examine actual material data, local scale, "
            "time-scale separation, wall slip and interfacial conditions separately."
        ),
    }


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--kind", choices=["gas", "liquid"], required=True)
    parser.add_argument("--micro-m", type=float, required=True)
    parser.add_argument("--length-m", type=float, required=True)
    parser.add_argument("--rho", type=float, required=True, help="kg/m^3")
    parser.add_argument("--eta", type=float, required=True, help="Pa s")
    parser.add_argument("--speed", type=float, required=True, help="m/s")
    args = parser.parse_args()
    try:
        result = calculate(args.kind, args.micro_m, args.length_m,
                           args.rho, args.eta, args.speed)
    except ValueError as exc:
        parser.error(str(exc))
    print(json.dumps(result, indent=2, ensure_ascii=False, allow_nan=False))


if __name__ == "__main__":
    main()
