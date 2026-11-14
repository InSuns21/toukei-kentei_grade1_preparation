#!/usr/bin/env python3
"""FLUID20: analytic Reynolds lubrication solutions and independent grid checks.

Standard library only. The JSON plots can be displayed by python-file-lab.
This is a 2-D, incompressible, no-slip, constant-viscosity thin-film model.
"""
import argparse
import json
import math


def trapz(x, y):
    return sum((x[k + 1] - x[k]) * (y[k] + y[k + 1]) / 2
               for k in range(len(x) - 1))


def wedge(args):
    L, eta, U = args.length, args.viscosity, args.speed
    h_in, h_out = args.h_in, args.h_out
    if not (0 < h_out < h_in):
        raise ValueError("wedge requires 0 < h_out < h_in")
    if U <= 0:
        raise ValueError("wedge requires --speed > 0")
    slope = (h_out - h_in) / L
    flux = U * h_in * h_out / (h_in + h_out)
    h_peak = 2 * h_in * h_out / (h_in + h_out)
    x_peak = (h_peak - h_in) / slope

    def h(x):
        return h_in + slope * x

    def pressure(x):
        hx = h(x)
        return (12 * eta / slope *
                (U / 2 * (1 / h_in - 1 / hx) -
                 flux / 2 * (1 / h_in ** 2 - 1 / hx ** 2)))

    def dpdx(x):
        hx = h(x)
        return 12 * eta / hx ** 3 * (U * hx / 2 - flux)

    x = [L * k / (args.samples - 1) for k in range(args.samples)]
    pressures = [pressure(xk) for xk in x]
    fluxes = [U * h(xk) / 2 - h(xk) ** 3 * dpdx(xk) / (12 * eta)
              for xk in x]
    p_peak = pressure(x_peak)
    pressure_drop_integral = trapz(x, [dpdx(xk) for xk in x])
    flux_error = max(abs(qk - flux) for qk in fluxes)
    if abs(pressure(L)) > 1e-7 * max(1.0, abs(p_peak)):
        raise AssertionError("outlet pressure boundary condition failed")
    if flux_error > 1e-9 * max(1.0, abs(flux)):
        raise AssertionError("flux is not constant")
    return {
        "model": "steady_converging_wedge",
        "units": {"x": "mm", "pressure": "Pa", "flux": "m2/s"},
        "summary": {
            "slope": slope, "flux_m2_per_s": flux,
            "maximum_pressure_Pa": p_peak, "maximum_x_mm": 1000 * x_peak,
            "pressure_at_inlet_Pa": pressure(0),
            "pressure_at_outlet_Pa": pressure(L),
            "grid_flux_max_abs_error_m2_per_s": flux_error,
            "trapezoidal_integral_dpdx_Pa": pressure_drop_integral,
            "expected_dpdx_integral_Pa": pressure(L) - pressure(0)
        },
        "plots": [
            {"title": "Wedge: pressure", "x_label": "x (mm)",
             "y_label": "p (Pa)", "series": [
                 {"name": "analytic pressure", "points":
                  [[1000 * xi, pi] for xi, pi in zip(x, pressures)]}]},
            {"title": "Wedge: film height", "x_label": "x (mm)",
             "y_label": "h (micrometre)", "series": [
                 {"name": "wall separation", "points":
                  [[1000 * xi, 1e6 * h(xi)] for xi in x]}]}
        ]
    }


def squeeze(args):
    L, eta, H, V = args.length, args.viscosity, args.height, args.approach
    if V <= 0:
        raise ValueError("squeeze requires --approach > 0")
    a = L / 2
    pressure_scale = 6 * eta * V / H ** 3

    def pressure(x):
        return pressure_scale * (a * a - x * x)

    def flux(x):
        return V * x

    x = [-a + L * k / (args.samples - 1)
         for k in range(args.samples)]
    pressures = [pressure(xk) for xk in x]
    force_numerical = trapz(x, pressures)
    force_analytic = eta * V * L ** 3 / H ** 3
    relative_error = abs(force_numerical / force_analytic - 1)
    if relative_error > 0.005:
        raise AssertionError("pressure integral is underresolved")
    return {
        "model": "uniform_squeeze_film",
        "units": {"x": "mm", "pressure": "Pa",
                  "flux": "m2/s", "force": "N/m"},
        "summary": {
            "maximum_pressure_Pa": pressure(0),
            "pressure_at_left_Pa": pressure(-a),
            "pressure_at_right_Pa": pressure(a),
            "analytic_force_per_width_N_per_m": force_analytic,
            "trapezoidal_force_per_width_N_per_m": force_numerical,
            "relative_force_error": relative_error,
            "left_flux_m2_per_s": flux(-a),
            "right_flux_m2_per_s": flux(a),
            "q_x_m_per_s": V, "h_t_m_per_s": -V,
            "mass_balance_h_t_plus_q_x": -V + V
        },
        "plots": [
            {"title": "Squeeze film: pressure", "x_label": "x (mm)",
             "y_label": "p (Pa)", "series": [
                 {"name": "analytic pressure", "points":
                  [[1000 * xi, pi] for xi, pi in zip(x, pressures)]}]},
            {"title": "Squeeze film: flux", "x_label": "x (mm)",
             "y_label": "q (m2/s)", "series": [
                 {"name": "signed flux", "points":
                  [[1000 * xi, flux(xi)] for xi in x]}]}
        ]
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--case", choices=["wedge", "squeeze"],
                        default="wedge")
    parser.add_argument("--length", type=float, default=0.01)
    parser.add_argument("--viscosity", type=float, default=0.1)
    parser.add_argument("--h-in", type=float, default=0.0001)
    parser.add_argument("--h-out", type=float, default=0.00005)
    parser.add_argument("--height", type=float, default=0.00005)
    parser.add_argument("--speed", type=float, default=0.1)
    parser.add_argument("--approach", type=float, default=0.0001)
    parser.add_argument("--samples", type=int, default=101)
    args = parser.parse_args()
    if args.length <= 0 or args.viscosity <= 0 or args.height <= 0:
        parser.error("length, viscosity, height must be positive")
    if args.samples < 21 or args.samples > 501:
        parser.error("samples must be between 21 and 501")
    data = wedge(args) if args.case == "wedge" else squeeze(args)
    print(json.dumps(data, ensure_ascii=False, allow_nan=False))


if __name__ == "__main__":
    main()
