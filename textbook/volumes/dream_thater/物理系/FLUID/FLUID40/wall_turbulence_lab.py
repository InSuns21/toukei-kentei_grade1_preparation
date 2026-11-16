#!/usr/bin/env python3
"""FLUID40: specified damped mixing-length channel PROFILE, not measured turbulence.

Steady smooth-wall half-channel, 0<=y<=h, Re_tau=h*u_tau/nu.
Dimensionless prescribed shear T=1-yplus/Re_tau.
Empirical closure: -R_uv/u_tau^2 = [kappa*yplus*(1-exp(-yplus/A))]^2*S^2,
S=dUplus/dyplus>=0. We integrate S by the trapezoid rule.
Not DNS, RANS solved from a transport closure, nor measurement data.
"""
import argparse
import json
import math


def slope(yplus, retau, kappa, damping):
    """Return nonnegative S, viscous share S, turbulent share L^2*S^2."""
    t = max(0.0, 1.0 - yplus / retau)
    ell = kappa * yplus * (-math.expm1(-yplus / damping))
    # Stable positive root of S + ell^2*S^2 = t.
    s = 2.0 * t / (1.0 + math.sqrt(1.0 + 4.0 * ell * ell * t))
    return s, ell * ell * s * s, t


def profile(retau=1000.0, kappa=0.40, damping=26.0, grid=2048):
    args = (retau, kappa, damping)
    if not all(math.isfinite(v) for v in args):
        raise ValueError("all model parameters must be finite")
    if not 200 <= retau <= 10000:
        raise ValueError("Re_tau must be in [200,10000]")
    if not 0.35 <= kappa <= 0.45:
        raise ValueError("kappa must be in [0.35,0.45]")
    if not 15 <= damping <= 40:
        raise ValueError("damping A must be in [15,40]")
    if not isinstance(grid, int) or not 256 <= grid <= 16384:
        raise ValueError("grid must be an integer in [256,16384]")
    step = retau / grid
    ys = [step * i for i in range(grid + 1)]
    parts = [slope(y, retau, kappa, damping) for y in ys]
    us = [0.0]
    for i in range(grid):
        us.append(us[-1] + step * (parts[i][0] + parts[i + 1][0]) / 2.0)
    stress_error = max(abs(vis + turb - t) for vis, turb, t in parts)
    # Nested quadrature grid, independent check on integration accuracy.
    fine_step = step / 2.0
    fine_u = 0.0
    old = slope(0.0, retau, kappa, damping)[0]
    for j in range(1, 2 * grid + 1):
        now = slope(j * fine_step, retau, kappa, damping)[0]
        fine_u += fine_step * (old + now) / 2.0
        old = now
    refinement_gap = abs(fine_u - us[-1])
    sample_index = sorted(set([0, grid] + [int(grid * j / 160) for j in range(161)]))
    log_index = [i for i in sample_index if ys[i] >= 1.0]
    return {
        "model": "PRESCRIBED_DAMPED_MIXING_LENGTH_NOT_DNS_OR_MEASUREMENT",
        "assumptions": [
            "steady constant-density pressure-driven plane channel",
            "smooth no-slip wall and centerline symmetry",
            "empirical closure ellplus=kappa*yplus*(1-exp(-yplus/A))",
            "constant empirical kappa,A; no velocity-fluctuation PDE solved",
            "reference log curve is phenomenological, not measured data"
        ],
        "units": {"yplus": "1", "Uplus": "1", "Re_tau": "1",
                  "viscous_stress_plus": "1", "turbulent_stress_plus": "1"},
        "inputs": {"Re_tau": retau, "kappa_empirical": kappa,
                   "A_empirical": damping, "trapezoid_intervals": grid},
        "diagnostics": {
            "U_center_plus": us[-1],
            "U_center_plus_refined_2N": fine_u,
            "U_center_quadrature_gap": refinement_gap,
            "max_dimensionless_total_shear_residual": stress_error,
            "S_wall_exact": parts[0][0],
            "S_center_exact": parts[-1][0],
            "R_uv_wall_exact": parts[0][1],
            "R_uv_center_exact": parts[-1][1]
        },
        "plots": [
            {
                "title": "Channel profile: prescribed closure vs reference segments (not measurements)",
                "x_label": "y+ [1]",
                "y_label": "U+ [1]",
                "series": [
                    {"name": "synthetic closure U+",
                     "points": [[ys[i], us[i]] for i in sample_index]},
                    {"name": "viscous reference U+=y+ (0 to 5)",
                     "points": [[j / 10.0, j / 10.0] for j in range(51)]},
                    {"name": "empirical logarithmic reference (30 to 0.15*Re_tau)",
                     "points": [
                         [30.0 * (0.15 * retau / 30.0) ** (j / 40.0),
                          math.log(30.0 * (0.15 * retau / 30.0) ** (j / 40.0))
                          / kappa + 5.0]
                         for j in range(41)
                     ]}
                ]
            },
            {
                "title": "Inner coordinate: logarithmic horizontal scale",
                "x_label": "log10(y+) [1]",
                "y_label": "U+ [1]",
                "series": [
                    {"name": "synthetic closure U+",
                     "points": [[math.log10(ys[i]), us[i]] for i in log_index]},
                    {"name": "log reference kappa,B=5.0 (not a fit)",
                     "points": [[math.log10(ys[i]), math.log(ys[i]) / kappa + 5.0]
                                for i in log_index if 30 <= ys[i] <= 0.15 * retau]}
                ]
            },
            {
                "title": "Exact total shear partition implied by the closure",
                "x_label": "y/h [1]",
                "y_label": "shear / (rho*u_tau^2) [1]",
                "series": [
                    {"name": "viscous part S", "points":
                     [[ys[i] / retau, parts[i][0]] for i in sample_index]},
                    {"name": "modeled turbulent part", "points":
                     [[ys[i] / retau, parts[i][1]] for i in sample_index]},
                    {"name": "exact total 1-y/h", "points":
                     [[ys[i] / retau, parts[i][2]] for i in sample_index]}
                ]
            }
        ]
    }


def self_test():
    default = profile()
    d = default["diagnostics"]
    assert d["max_dimensionless_total_shear_residual"] < 1e-12
    assert d["U_center_quadrature_gap"] < 0.005
    assert d["S_wall_exact"] == 1.0 and d["S_center_exact"] == 0.0
    assert d["R_uv_wall_exact"] == 0.0
    assert d["R_uv_center_exact"] == 0.0
    coarse = profile(grid=512)
    fine = profile(grid=2048)
    assert fine["diagnostics"]["U_center_quadrature_gap"] < (
        coarse["diagnostics"]["U_center_quadrature_gap"]
    )
    assert profile(retau=500)["diagnostics"]["U_center_plus"] > 0
    for kw in ({"retau": 10}, {"kappa": 0.1}, {"damping": -2},
               {"grid": 8}, {"retau": float("nan")}):
        try:
            profile(**kw)
        except ValueError:
            pass
        else:
            raise AssertionError("invalid parameters were accepted")
    return {"self_test": "passed", "cases": "stress, boundary, refinement, invalid inputs"}


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--retau", type=float, default=1000.0)
    parser.add_argument("--kappa", type=float, default=0.40)
    parser.add_argument("--damping", type=float, default=26.0)
    parser.add_argument("--grid", type=int, default=2048)
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args(argv)
    result = self_test() if args.self_test else profile(
        args.retau, args.kappa, args.damping, args.grid
    )
    print(json.dumps(result, ensure_ascii=False, indent=2, allow_nan=False))


if __name__ == "__main__":
    main()
