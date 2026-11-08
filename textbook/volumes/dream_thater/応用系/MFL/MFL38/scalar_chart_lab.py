#!/usr/bin/env python3
"""MFL38: scalar fields on a cylinder in two nonlinear charts (stdlib only)."""

from __future__ import annotations

import argparse
import json
import math


def field_u(u: float, v: float) -> float:
    return u ** 4 + v ** 2


def field_s(s: float, t: float) -> float:
    return field_u(s - t * t, t)


def bilinear(fn, x: float, y: float, h: float) -> float:
    """Tensor-product linear interpolant on the grid h * Z^2."""
    a = math.floor(x / h) * h
    b = math.floor(y / h) * h
    lam = (x - a) / h
    mu = (y - b) / h
    return (
        (1 - lam) * (1 - mu) * fn(a, b)
        + lam * (1 - mu) * fn(a + h, b)
        + (1 - lam) * mu * fn(a, b + h)
        + lam * mu * fn(a + h, b + h)
    )


def centered(fn, x: float, h: float) -> float:
    return (fn(x + h) - fn(x - h)) / (2 * h)


def interpolation_bound(x: float, y: float, h: float, chart: str) -> float:
    """An explicit supremum bound for the two second partial derivatives."""
    a = math.floor(x / h) * h
    b = math.floor(y / h) * h
    xmax = max(abs(a), abs(a + h))
    ymax = max(abs(b), abs(b + h))
    if chart == "uv":
        upper_ss = 12 * xmax * xmax
        upper_tt = 2.0
    else:
        # |s - t^2| <= |s| + |t|^2 in the interpolation cell.
        umax = xmax + ymax * ymax
        upper_ss = 12 * umax * umax
        upper_tt = 8 * umax ** 3 + 48 * ymax * ymax * umax * umax + 2
    return (h * h / 8) * (upper_ss + upper_tt)


def evaluate(u: float, v: float, h: float) -> dict[str, object]:
    if not (-math.pi + 3 * h < u < math.pi - 3 * h and -1 + h < v < 1 - h):
        raise ValueError("Choose a point with sufficient room for the finite-difference stencil.")
    s, t = u + v * v, v
    jac = ((1.0, -2 * t), (0.0, 1.0))
    metric = ((1.0, -2 * t), (-2 * t, 1 + 4 * t * t))
    metric_inverse = ((1 + 4 * t * t, 2 * t), (2 * t, 1.0))

    # The analytic flux sqrt(det G) * G^-1 * df, in both charts.
    q_u = lambda x: 4 * x ** 3
    q_v = lambda y: 2 * y
    q_s = lambda x: 4 * (x - t * t) ** 3 + 4 * t * t
    q_t = lambda y: 2 * y
    lap_u_h = centered(q_u, u, h) + centered(q_v, v, h)
    lap_s_h = centered(q_s, s, h) + centered(q_t, t, h)

    f_u = field_u(u, v)
    f_s = field_s(s, t)
    grad_u = (4 * u ** 3, 2 * v)
    grad_s = (4 * u ** 3, -8 * t * u ** 3 + 2 * t)
    gradient_sq_u = grad_u[0] ** 2 + grad_u[1] ** 2
    gradient_sq_s = (
        metric_inverse[0][0] * grad_s[0] ** 2
        + 2 * metric_inverse[0][1] * grad_s[0] * grad_s[1]
        + metric_inverse[1][1] * grad_s[1] ** 2
    )
    exact = 12 * u * u + 2
    naive_s = 12 * u * u - 8 * u ** 3 + 48 * t * t * u * u + 2
    interp_u = bilinear(field_u, u, v, h)
    interp_s = bilinear(field_s, s, t, h)
    bound_u = interpolation_bound(u, v, h, "uv")
    bound_s = interpolation_bound(s, t, h, "st")

    # Our bilinear values in the two charts are grid-dependent, even at the same point.
    # No random sampling or training is involved.
    result = {
        "chart_point_uv": [u, v],
        "chart_point_st": [s, t],
        "embedded_cylinder_xyz": [math.cos(u), math.sin(u), v],
        "jacobian_x_by_y": jac,
        "metric_in_st": metric,
        "metric_inverse_in_st": metric_inverse,
        "scalar_uv": f_u,
        "scalar_st": f_s,
        "scalar_chart_residual": abs(f_u - f_s),
        "gradient_norm_squared_uv": gradient_sq_u,
        "gradient_norm_squared_st": gradient_sq_s,
        "gradient_residual": abs(gradient_sq_u - gradient_sq_s),
        "laplacian_exact_uv": exact,
        "laplacian_exact_st": exact,
        "laplacian_naive_st": naive_s,
        "laplacian_naive_error": abs(naive_s - exact),
        "laplacian_centered_flux_uv": lap_u_h,
        "laplacian_centered_flux_st": lap_s_h,
        "centered_flux_error_uv": abs(lap_u_h - exact),
        "centered_flux_error_st": abs(lap_s_h - exact),
        "expected_centered_error": 4 * h * h,
        "scalar_interpolated_uv": interp_u,
        "scalar_interpolated_st": interp_s,
        "interpolation_error_uv": abs(interp_u - f_u),
        "interpolation_error_st": abs(interp_s - f_s),
        "interpolation_bound_uv": bound_u,
        "interpolation_bound_st": bound_s,
        "interpolated_chart_discrepancy": abs(interp_u - interp_s),
        "h": h,
    }
    return result


def check(result: dict[str, object]) -> None:
    h = float(result["h"])
    assert float(result["scalar_chart_residual"]) < 1e-12
    assert float(result["gradient_residual"]) < 1e-11
    for key in ("centered_flux_error_uv", "centered_flux_error_st"):
        assert abs(float(result[key]) - 4 * h * h) < 1e-10
    for chart in ("uv", "st"):
        assert float(result[f"interpolation_error_{chart}"]) <= (
            float(result[f"interpolation_bound_{chart}"]) + 1e-12
        )


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--u", type=float, default=0.4)
    parser.add_argument("--v", type=float, default=0.37)
    parser.add_argument("--h", type=float, default=0.1)
    args = parser.parse_args()
    if not (math.isfinite(args.u) and math.isfinite(args.v)
            and math.isfinite(args.h) and 0 < args.h <= 0.25):
        parser.error("u, v must be finite and 0 < h <= 0.25")
    try:
        result = evaluate(args.u, args.v, args.h)
        check(result)
    except (ValueError, AssertionError) as exc:
        parser.error(str(exc) or "Analytic checks did not pass.")
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
