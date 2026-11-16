#!/usr/bin/env python3
"""FLUID38: exact four-state synthetic covariance versus an empirical closure.

NOT a Navier-Stokes solution, DNS, LES, measurement, or time integration.
All statistics use one uniform four-state ensemble at a fixed space-time point.
Standard-library only; the same calculations produce printed values and plots.
"""
import argparse
import json
import math

A = 0.4  # horizontal fluctuation amplitude [m/s]
B = 0.3  # vertical fluctuation amplitude [m/s]


def _finite(name, x):
    if not math.isfinite(x):
        raise ValueError(f"{name} must be finite")


def experiment(corr=0.75, shear=2.0, length=0.15):
    """Calculate exactly enumerable synthetic moments and shear closure values.

    corr  : coefficient in v'=-B(corr*Z+sqrt(1-corr**2)*W) [-]
    shear : mean dU/dy [1/s], nonzero to define the fitted eddy viscosity
    length: prescribed mixing length [m]
    """
    for name, value in (("corr", corr), ("shear", shear), ("length", length)):
        _finite(name, value)
    if not -1 <= corr <= 1:
        raise ValueError("corr must be in [-1, 1]")
    if not 0.1 <= abs(shear) <= 20:
        raise ValueError("abs(shear) must be in [0.1, 20] 1/s")
    if not 0 <= length <= 2:
        raise ValueError("length must be in [0, 2] m")

    outcomes = [
        (A * z, -B * (corr * z + math.sqrt(max(0.0, 1 - corr ** 2)) * w))
        for z in (-1, 1) for w in (-1, 1)
    ]
    count = len(outcomes)
    mean_u = sum(u for u, _ in outcomes) / count
    mean_v = sum(v for _, v in outcomes) / count
    centered = [(u - mean_u, v - mean_v) for u, v in outcomes]
    r11 = sum(u * u for u, _ in centered) / count
    r22 = sum(v * v for _, v in centered) / count
    r12 = sum(u * v for u, v in centered) / count
    k = (r11 + r22) / 2.0  # w'=0
    theory_r11, theory_r22, theory_r12 = A ** 2, B ** 2, -A * B * corr

    nu_t = length ** 2 * abs(shear)
    model_r12 = -nu_t * shear
    observed_flux = -r12
    model_flux = -model_r12
    observed_production = -r12 * shear
    model_production = nu_t * shear ** 2
    fitted_nu_t = -r12 / shear
    fitted_length = (math.sqrt(fitted_nu_t / abs(shear))
                     if fitted_nu_t >= 0 else None)

    # Isotropic diagonal 2k/3, off-diagonal -nu_t*G, zero xz and yz.
    diagonal_model = 2 * k / 3
    eigenvalue_min_model = diagonal_model - abs(nu_t * shear)
    measured_minor = r11 * r22 - r12 ** 2
    tol = 1e-12
    expected_stress = -theory_r12
    expected_k = (A ** 2 + B ** 2) / 2
    moment_error = max(abs(mean_u), abs(mean_v),
                       abs(r11 - theory_r11), abs(r22 - theory_r22),
                       abs(r12 - theory_r12), abs(k - expected_k))
    stress_error = abs(observed_flux - expected_stress)
    assert moment_error < tol and stress_error < tol
    assert measured_minor >= -tol
    assert abs(observed_production + r12 * shear) < tol
    assert abs(model_production - nu_t * shear ** 2) < tol

    corr_sweep = [(-1.0 + n / 20.0) for n in range(41)]
    length_sweep = [0.3 * n / 40.0 for n in range(41)]
    return {
        "model": "FOUR_STATE_SYNTHETIC_ENSEMBLE_NOT_NAVIER_STOKES_OR_DNS",
        "assumptions": {
            "sampling": "Z,W independent equiprobable +/-1, all four outcomes exact",
            "space_time": "one fixed point; not a PDE, no spatial grid or boundary data",
            "mean_shear": "given local U(y)=U0+G*y, not solved here",
            "closure": "Boussinesq nonnegative eddy viscosity and prescribed mixing length",
        },
        "units": {
            "u_prime": "m/s", "R": "m^2/s^2", "k": "m^2/s^2",
            "shear": "1/s", "length": "m", "nu_t": "m^2/s",
            "production": "m^2/s^3"
        },
        "inputs": {
            "corr": corr, "shear_1_per_s": shear, "mixing_length_m": length,
            "a_m_per_s": A, "b_m_per_s": B, "number_of_outcomes": count
        },
        "moments": {
            "mean_u_prime_m_per_s": mean_u,
            "mean_v_prime_m_per_s": mean_v,
            "R11_m2_per_s2": r11, "R22_m2_per_s2": r22,
            "R12_m2_per_s2": r12, "R12_exact_m2_per_s2": theory_r12,
            "k_m2_per_s2": k,
            "R12_covariance_bound_m2_per_s2": math.sqrt(r11 * r22)
        },
        "comparison": {
            "observed_minus_R12_m2_per_s2": observed_flux,
            "model_minus_R12_m2_per_s2": model_flux,
            "observed_production_m2_per_s3": observed_production,
            "model_production_m2_per_s3": model_production,
            "nu_t_model_m2_per_s": nu_t,
            "nu_t_fitted_signed_m2_per_s": fitted_nu_t,
            "fitted_real_mixing_length_m_or_null": fitted_length,
            "model_diagonal_2k_over_3_m2_per_s2": diagonal_model,
            "model_min_eigenvalue_m2_per_s2": eigenvalue_min_model
        },
        "checks": {
            "moment_max_abs_error": moment_error,
            "shear_flux_abs_error": stress_error,
            "observed_covariance_is_psd": (
                r11 >= -tol and r22 >= -tol and measured_minor >= -tol
            ),
            "observed_2x2_covariance_minor": measured_minor,
            "model_covariance_is_psd": eigenvalue_min_model >= -tol,
            "model_production_nonnegative": model_production >= -tol,
            "not_DNS_or_measured_turbulence": True
        },
        "plots": [
            {
                "title": "Four-state exact shear flux vs mixing-length model (NOT DNS)",
                "x_label": "synthetic correlation c [1]",
                "y_label": "-R12 [m^2/s^2]",
                "series": [
                    {"name": "four-state exact covariance -R12(c)",
                     "points": [[c, A * B * c] for c in corr_sweep]},
                    {"name": "prescribed mixing-length flux (constant over c)",
                     "points": [[c, model_flux] for c in corr_sweep]},
                ],
            },
            {
                "title": "Sensitivity of empirical flux to prescribed mixing length",
                "x_label": "mixing length ell [m]",
                "y_label": "-R12 [m^2/s^2]",
                "series": [
                    {"name": "mixing-length model ell^2 abs(G) G",
                     "points": [[ell, ell ** 2 * abs(shear) * shear]
                                for ell in length_sweep]},
                    {"name": "fixed four-state covariance",
                     "points": [[ell, observed_flux] for ell in length_sweep]},
                ],
            },
        ],
    }


def self_test():
    for corr in (-1.0, -0.75, 0.0, 0.75, 1.0):
        for shear in (-2.0, 2.0):
            r = experiment(corr=corr, shear=shear)
            assert r["checks"]["moment_max_abs_error"] < 1e-12
            assert r["checks"]["observed_covariance_is_psd"]
            assert r["checks"]["model_production_nonnegative"]
    r = experiment(0.75, 2.0, 0.15)
    assert abs(r["comparison"]["observed_minus_R12_m2_per_s2"] - 0.09) < 1e-12
    assert abs(r["comparison"]["model_minus_R12_m2_per_s2"] - 0.09) < 1e-12
    assert abs(r["comparison"]["observed_production_m2_per_s3"] - 0.18) < 1e-12
    assert not r["checks"]["model_covariance_is_psd"]
    r = experiment(-0.75, 2.0, 0.15)
    assert r["comparison"]["observed_production_m2_per_s3"] < 0
    assert r["comparison"]["nu_t_fitted_signed_m2_per_s"] < 0
    assert r["comparison"]["fitted_real_mixing_length_m_or_null"] is None
    for args in ((2, 2, 0.15), (0, 0, 0.15), (0, 2, -0.1)):
        try:
            experiment(*args)
        except ValueError:
            pass
        else:
            raise AssertionError(f"invalid inputs were accepted: {args}")
    return {"self_test": "passed", "cases": "5 correlations x 2 shears; 3 invalid inputs"}


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--corr", type=float, default=0.75)
    parser.add_argument("--shear", type=float, default=2.0)
    parser.add_argument("--length", type=float, default=0.15)
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args(argv)
    result = (self_test() if args.self_test
              else experiment(args.corr, args.shear, args.length))
    print(json.dumps(result, ensure_ascii=False, indent=2, allow_nan=False))


if __name__ == "__main__":
    main()
