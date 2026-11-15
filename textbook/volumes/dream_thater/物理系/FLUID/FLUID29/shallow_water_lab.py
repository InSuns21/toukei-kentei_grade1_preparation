#!/usr/bin/env python3
"""FLUID29: conservative 1-D shallow-water finite-volume experiment.

Nonnegative wet depths only; hydrostatic reconstruction balances a fixed
smooth bed. Local Rusanov flux and reflecting walls. Standard library only.
The plotted profiles are numerical solutions of the shallow-water model,
NOT solutions of the full three-dimensional Euler equations.
"""
import argparse
import json
import math


def primitive(h, q, g):
    if h <= 0 or not math.isfinite(h) or not math.isfinite(q):
        raise ArithmeticError("nonpositive/nonfinite water depth or discharge")
    u = q / h
    return (q, q * u + 0.5 * g * h * h), abs(u) + math.sqrt(g * h)


def interface_flux(left, right, g):
    """Two *cell-sided* momentum fluxes; a common mass flux.

    States are (h, q, bed). Hydrostatic reconstruction gives identical
    pressures in an exact lake at rest. The asymmetric pressure correction
    is the discrete bed-slope source, not an extra mass flux.
    """
    hl, ql, bl = left
    hr, qr, br = right
    if min(hl, hr) <= 0:
        raise ArithmeticError("dry cells are outside this experiment")
    crest = max(bl, br)
    hls = max(0.0, hl + bl - crest)
    hrs = max(0.0, hr + br - crest)
    u_l = ql / hl
    u_r = qr / hr
    qls = hls * u_l
    qrs = hrs * u_r
    fl = (qls, qls * u_l + 0.5 * g * hls * hls)
    fr = (qrs, qrs * u_r + 0.5 * g * hrs * hrs)
    alpha = max(abs(u_l) + math.sqrt(g * hls),
                abs(u_r) + math.sqrt(g * hrs))
    mass_flux = 0.5 * (fl[0] + fr[0]) - 0.5 * alpha * (hrs - hls)
    momentum_flux = 0.5 * (fl[1] + fr[1]) - 0.5 * alpha * (qrs - qls)
    # The left cell uses its correction at its right interface;
    # the right cell uses its own correction at its left interface.
    left_momentum = momentum_flux + 0.5 * g * (hl * hl - hls * hls)
    right_momentum = momentum_flux + 0.5 * g * (hr * hr - hrs * hrs)
    return (mass_flux, left_momentum), (mass_flux, right_momentum)


def simulate(mode="dam", cells=160, left=2.0, right=1.0,
             surface=1.0, bump=0.25, final_time=0.5,
             gravity=9.8, cfl=0.35):
    """Return finite-volume diagnostics and sampled arrays.

    x is in metres, domain [-5,5], reflecting walls. Bed is static.
    """
    if mode not in ("dam", "lake"):
        raise ValueError("mode must be dam or lake")
    if not isinstance(cells, int) or not (64 <= cells <= 400):
        raise ValueError("cells must be an integer in [64,400]")
    vals = (left, right, surface, bump, final_time, gravity, cfl)
    if not all(math.isfinite(x) for x in vals):
        raise ValueError("all model parameters must be finite")
    if not (0.05 <= left <= 4 and 0.05 <= right <= 4
            and 0.2 <= surface <= 4 and 0 <= bump <= 0.5
            and surface > bump + 0.05 and 0.01 <= final_time <= 1
            and gravity > 0 and 0.05 <= cfl <= 0.45):
        raise ValueError("positive wet depths, valid time and CFL required")

    dx = 10.0 / cells
    x = [-5 + (i + 0.5) * dx for i in range(cells)]
    bed = ([0.0] * cells if mode == "dam"
           else [bump * math.exp(-(xi / 1.2) ** 2) for xi in x])
    initial_h = ([left if xi < 0 else right for xi in x]
                 if mode == "dam" else [surface - bi for bi in bed])
    h = initial_h[:]
    q = [0.0] * cells
    initial_mass = sum(h) * dx
    initial_energy = sum(0.5 * gravity * hi * hi
                         + gravity * hi * bi
                         for hi, bi in zip(h, bed)) * dx
    min_height_seen = min(h)
    time = 0.0
    steps = 0
    max_courant = 0.0

    while time < final_time - 1e-14:
        speed = max(abs(qi / hi) + math.sqrt(gravity * hi)
                    for hi, qi in zip(h, q))
        dt = min(cfl * dx / speed, final_time - time)
        if dt <= 0 or steps >= 10000:
            raise ArithmeticError("invalid step or excessive iteration count")
        max_courant = max(max_courant, speed * dt / dx)
        # Interface j connects cell j-1 to cell j.
        left_flux = []
        right_flux = []
        for j in range(cells + 1):
            if j == 0:
                a = (h[0], -q[0], bed[0])
                z = (h[0], q[0], bed[0])
            elif j == cells:
                a = (h[-1], q[-1], bed[-1])
                z = (h[-1], -q[-1], bed[-1])
            else:
                a = (h[j - 1], q[j - 1], bed[j - 1])
                z = (h[j], q[j], bed[j])
            f_left, f_right = interface_flux(a, z, gravity)
            left_flux.append(f_left)
            right_flux.append(f_right)
        factor = dt / dx
        next_h = []
        next_q = []
        for i in range(cells):
            hn = h[i] - factor * (left_flux[i + 1][0] - right_flux[i][0])
            qn = q[i] - factor * (left_flux[i + 1][1] - right_flux[i][1])
            if not math.isfinite(hn) or not math.isfinite(qn) or hn <= 1e-10:
                raise ArithmeticError("numerical failure: dry or nonfinite cell")
            next_h.append(hn)
            next_q.append(qn)
        h, q = next_h, next_q
        min_height_seen = min(min_height_seen, min(h))
        time += dt
        steps += 1

    mass = sum(h) * dx
    energy = sum(0.5 * qi * qi / hi + 0.5 * gravity * hi * hi
                 + gravity * hi * bi
                 for hi, qi, bi in zip(h, q, bed)) * dx
    mass_relative_error = abs(mass - initial_mass) / initial_mass
    max_surface_error = max(abs(hi + bi - surface)
                            for hi, bi in zip(h, bed)) if mode == "lake" else None
    max_velocity = max(abs(qi / hi) for hi, qi in zip(h, q))
    if mass_relative_error > 2e-10:
        raise ArithmeticError("failed conservative mass test")
    if mode == "lake" and (max_surface_error > 2e-10 or max_velocity > 2e-10):
        raise ArithmeticError("failed exact lake-at-rest well-balanced test")

    centre = cells // 2
    h0 = (left + right) / 2
    delta = (left - right) / 2
    linear_c = math.sqrt(gravity * h0)
    linear_u = linear_c * delta / h0
    linear_observation = ({
        "height_mean_m": h0,
        "initial_half_step_m": delta,
        "long_wave_speed_m_per_s": linear_c,
        "linear_central_velocity_m_per_s": linear_u,
        "computed_central_velocity_m_per_s": q[centre] / h[centre],
        "warning": "linear result is first order in |delta|/h0, not an exact dam-break solution"
    } if mode == "dam" else None)

    return {
        "mode": mode,
        "model": "1d_nonlinear_shallow_water_fixed_bed_wet_cells_reflecting_walls",
        "parameters": {
            "cells": cells, "left_depth_m": left, "right_depth_m": right,
            "lake_surface_m": surface, "bed_bump_m": bump,
            "gravity_m_per_s2": gravity, "cfl_target": cfl,
            "domain_m": [-5, 5], "dx_m": dx,
            "final_time_s": final_time
        },
        "checks": {
            "time_s": time, "steps": steps,
            "max_courant": max_courant,
            "initial_mass_per_width_m2": initial_mass,
            "final_mass_per_width_m2": mass,
            "relative_mass_error": mass_relative_error,
            "minimum_depth_seen_m": min_height_seen,
            "strictly_wet": min_height_seen > 0,
            "lake_surface_max_error_m": max_surface_error,
            "max_velocity_m_per_s": max_velocity,
            "initial_mechanical_energy_m4_per_s2": initial_energy,
            "final_mechanical_energy_m4_per_s2": energy,
            "note": "first-order Rusanov scheme is numerically dissipative; energy need not be equal"
        },
        "linear_reference": linear_observation,
        "sample": {"x": x, "bed": bed, "initial_h": initial_h,
                   "final_h": h, "final_q": q}
    }


def parse_args():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--mode", choices=["dam", "lake"], default="dam")
    p.add_argument("--cells", type=int, default=160)
    p.add_argument("--left", type=float, default=2.0, help="left initial depth [m]")
    p.add_argument("--right", type=float, default=1.0, help="right initial depth [m]")
    p.add_argument("--surface", type=float, default=1.0, help="lake free-surface elevation [m]")
    p.add_argument("--bump", type=float, default=0.25, help="bed Gaussian peak [m]")
    p.add_argument("--final-time", type=float, default=0.5, help="final physical time [s]")
    p.add_argument("--gravity", type=float, default=9.8, help="gravity [m/s^2]")
    p.add_argument("--cfl", type=float, default=0.35, help="target Courant number")
    return p.parse_args()


def main():
    args = parse_args()
    result = simulate(mode=args.mode, cells=args.cells, left=args.left,
                      right=args.right, surface=args.surface, bump=args.bump,
                      final_time=args.final_time, gravity=args.gravity,
                      cfl=args.cfl)
    data = result.pop("sample")
    x, bed, hin, hfin, qfin = (data[k] for k in
                              ("x", "bed", "initial_h", "final_h", "final_q"))
    plot_surface = [
        {"name": "initial water surface", "points": [[xi, hi + bi]
                                                     for xi, hi, bi in zip(x, hin, bed)]},
        {"name": "final water surface", "points": [[xi, hi + bi]
                                                   for xi, hi, bi in zip(x, hfin, bed)]},
        {"name": "fixed bed", "points": [[xi, bi] for xi, bi in zip(x, bed)]}
    ]
    plot_velocity = [
        {"name": "final horizontal velocity", "points": [[xi, qi / hi]
                                                        for xi, qi, hi in zip(x, qfin, hfin)]},
        {"name": "initial velocity (zero)", "points": [[xi, 0.0] for xi in x]}
    ]
    result["plots"] = [
        {"title": "Bed, initial and final free surface (numerical solution)",
         "x_label": "x [m]", "y_label": "elevation [m]",
         "series": plot_surface},
        {"title": "Depth-mean horizontal velocity (numerical solution)",
         "x_label": "x [m]", "y_label": "velocity [m/s]",
         "series": plot_velocity}
    ]
    print(json.dumps(result, ensure_ascii=False, allow_nan=False))


if __name__ == "__main__":
    main()
