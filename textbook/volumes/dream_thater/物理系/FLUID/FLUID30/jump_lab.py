#!/usr/bin/env python3
"""FLUID30 analytical hydraulic-jump checks (not a PDE evolution solver).

One-dimensional inviscid shallow-water states on a flat fixed bed, g>0.
Inputs: upstream wet depth h1 [m], relative Froude number Fr1>1,
shock speed s [m/s], gravity [m/s^2]. Relative discharge J>0 flows
from the left (upstream) to the right (downstream). The downstream depth
follows the conjugate-depth relation. We verify both laboratory-frame
Rankine--Hugoniot equations and mechanical energy dissipation. Plots
compare exact algebraic formulae, not experimental shock profiles.
Only the Python standard library is required.
"""
import argparse
import json
import math


def jump_state(depth=1.0, fr=2.0, speed=0.0, gravity=9.8):
    values = (depth, fr, speed, gravity)
    if not all(math.isfinite(v) for v in values):
        raise ValueError("all inputs must be finite")
    if not (0.05 <= depth <= 20 and 1.0001 <= fr <= 5
            and -10 <= speed <= 10 and 0 < gravity <= 30):
        raise ValueError("require h1>0, 1.0001<=Fr1<=5, g>0, |s|<=10")

    ratio = (math.sqrt(1.0 + 8.0 * fr * fr) - 1.0) / 2.0
    h1, h2 = depth, ratio * depth
    v1 = fr * math.sqrt(gravity * h1)
    relative_discharge = h1 * v1
    v2 = relative_discharge / h2
    u1, u2 = v1 + speed, v2 + speed
    q1, q2 = h1 * u1, h2 * u2

    def momentum_flux(h, q):
        return q * q / h + 0.5 * gravity * h * h

    def energy(h, u):
        return 0.5 * h * u * u + 0.5 * gravity * h * h

    def energy_flux(h, u):
        return 0.5 * h * u ** 3 + gravity * h * h * u

    mass_residual = speed * (h2 - h1) - (q2 - q1)
    momentum_residual = (speed * (q2 - q1) -
                         (momentum_flux(h2, q2) - momentum_flux(h1, q1)))
    head1, head2 = h1 + v1 * v1 / (2.0 * gravity), h2 + v2 * v2 / (2.0 * gravity)
    head_loss = head1 - head2
    cubic_loss = (h2 - h1) ** 3 / (4.0 * h1 * h2)
    energy_jump = (energy_flux(h2, u2) - energy_flux(h1, u1)
                   - speed * (energy(h2, u2) - energy(h1, u1)))
    predicted_energy_jump = -gravity * relative_discharge * cubic_loss

    scale_m = max(1.0, abs(q1), abs(q2), abs(speed * (h2 - h1)))
    scale_p = max(1.0, abs(momentum_flux(h1, q1)),
                  abs(momentum_flux(h2, q2)))
    scale_e = max(1.0, abs(energy_flux(h1, u1)),
                  abs(energy_flux(h2, u2)), abs(predicted_energy_jump))
    normalized = {
        "mass_RH": abs(mass_residual) / scale_m,
        "momentum_RH": abs(momentum_residual) / scale_p,
        "head_loss_cubic": abs(head_loss - cubic_loss) / max(1.0, abs(head_loss)),
        "energy_jump": abs(energy_jump - predicted_energy_jump) / scale_e,
    }
    fr2 = v2 / math.sqrt(gravity * h2)
    characteristics = {
        "lambda_minus_left_minus_s": v1 - math.sqrt(gravity * h1),
        "lambda_minus_right_minus_s": v2 - math.sqrt(gravity * h2),
        "lambda_plus_left_minus_s": v1 + math.sqrt(gravity * h1),
        "lambda_plus_right_minus_s": v2 + math.sqrt(gravity * h2),
    }
    if (any(x > 2e-11 for x in normalized.values())
            or h2 <= h1 or not (fr2 < 1 < fr)
            or energy_jump >= 0
            or not (characteristics["lambda_minus_left_minus_s"] > 0
                    > characteristics["lambda_minus_right_minus_s"])):
        raise ArithmeticError("jump, entropy or characteristic test failed")

    return {
        "model": "exact_conjugate_depth_1d_flat_bed_no_shock_internal_structure",
        "inputs": {"upstream_depth_m": depth, "upstream_relative_froude": fr,
                   "shock_speed_m_per_s": speed, "gravity_m_per_s2": gravity},
        "states": {
            "upstream": {"depth_m": h1, "relative_velocity_m_per_s": v1,
                         "laboratory_velocity_m_per_s": u1,
                         "laboratory_discharge_m2_per_s": q1, "relative_froude": fr},
            "downstream": {"depth_m": h2, "relative_velocity_m_per_s": v2,
                           "laboratory_velocity_m_per_s": u2,
                           "laboratory_discharge_m2_per_s": q2, "relative_froude": fr2},
            "conjugate_depth_ratio": ratio,
            "common_relative_discharge_m2_per_s": relative_discharge,
        },
        "checks": {
            "relative_residuals": normalized,
            "head_loss_m": head_loss,
            "head_loss_cubic_formula_m": cubic_loss,
            "energy_jump_G_minus_sE_m4_per_s3": energy_jump,
            "expected_energy_jump_m4_per_s3": predicted_energy_jump,
            "energy_dissipation_per_density_m4_per_s3": -energy_jump,
            "entropy_inequality_holds": energy_jump <= 0,
            "compressed_characteristic": characteristics,
            "diagnostic": "exact algebraic shock conditions, not a finite-volume simulation",
        },
    }


def plot_data(depth, gravity):
    frs = [1.0001 + (4.0 - 1.0001) * i / 90 for i in range(91)]
    ratios = [(math.sqrt(1 + 8 * f * f) - 1) / 2 for f in frs]
    normalized_losses = [(r - 1) ** 3 / (4 * r) for r in ratios]
    downstream_fr = [math.sqrt((1 + r) / (2 * r * r)) for r in ratios]
    return [
        {"title": "Exact conjugate depth ratio (upstream Fr1 > 1)",
         "x_label": "upstream relative Froude number Fr1 [-]",
         "y_label": "downstream / upstream depth ratio [-]",
         "series": [{"name": "h2/h1 (conjugate depth)",
                     "points": [[f, r] for f, r in zip(frs, ratios)]}]},
        {"title": "Exact relative head loss and downstream Fr2",
         "x_label": "upstream relative Froude number Fr1 [-]",
         "y_label": "head loss / h1 or Fr2 [-]",
         "series": [
             {"name": "head loss / upstream depth",
              "points": [[f, loss] for f, loss in zip(frs, normalized_losses)]},
             {"name": "downstream relative Froude number",
              "points": [[f, f2] for f, f2 in zip(frs, downstream_fr)]}
         ]},
    ]


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--depth", type=float, default=1.0,
                   help="upstream depth [m]")
    p.add_argument("--fr", type=float, default=2.0,
                   help="upstream relative Froude number (>1)")
    p.add_argument("--speed", type=float, default=0.0,
                   help="shock propagation velocity [m/s]")
    p.add_argument("--gravity", type=float, default=9.8,
                   help="gravitational acceleration [m/s^2]")
    args = p.parse_args()
    result = jump_state(depth=args.depth, fr=args.fr, speed=args.speed,
                        gravity=args.gravity)
    result["plots"] = plot_data(args.depth, args.gravity)
    print(json.dumps(result, ensure_ascii=False, allow_nan=False))


if __name__ == "__main__":
    main()
