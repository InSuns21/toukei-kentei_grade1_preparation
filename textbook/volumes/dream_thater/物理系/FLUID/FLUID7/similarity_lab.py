"""FLUID7: a dimensionless scale-ratio experiment (standard library only).

The output compares a model m with a prototype p. It does not solve flow equations.
All inputs are positive ratios m/p; --length-ratio and --match determine U_m/U_p.
"""
import argparse
import json
import math


def positive(value):
    number = float(value)
    if not math.isfinite(number) or number <= 0.0:
        raise argparse.ArgumentTypeError("ratios must be finite positive numbers")
    return number


def similarity(length_ratio, match="re", density_ratio=1.0, viscosity_ratio=1.0,
               gravity_ratio=1.0, tension_ratio=1.0, sound_ratio=1.0,
               time_ratio=None):
    """Return exact scale relations for Re, Fr, We, Ma and St.

    Ratios for the five groups are (group in model)/(group in prototype).
    Fr uses speed/sqrt(g L), and St uses L/(U T).
    """
    values = (length_ratio, density_ratio, viscosity_ratio,
              gravity_ratio, tension_ratio, sound_ratio)
    if any(not math.isfinite(float(v)) or v <= 0 for v in values):
        raise ValueError("all physical scale ratios must be finite and positive")
    lam, rr, er, gr, sr, cr = values
    candidates = {
        "re": er / (rr * lam),
        "fr": math.sqrt(gr * lam),
        "we": math.sqrt(sr / (rr * lam)),
        "ma": cr,
    }
    if match not in candidates:
        raise ValueError("match must be re, fr, we or ma")
    s = candidates[match]
    tau = lam / s if time_ratio is None else time_ratio
    if not math.isfinite(tau) or tau <= 0:
        raise ValueError("time ratio must be finite and positive")
    ratios = {
        "Re": rr * s * lam / er,
        "Fr": s / math.sqrt(gr * lam),
        "We": rr * s * s * lam / sr,
        "Ma": s / cr,
        "St": lam / (s * tau),
    }
    if not all(math.isfinite(v) and v > 0 for v in ratios.values()):
        raise ValueError("computed ratios are not finite positive values")
    return {
        "matching_target": match,
        "scale_ratios_model_over_prototype": {
            "L": lam, "U": s, "T": tau, "rho": rr,
            "eta": er, "g": gr, "gamma": sr, "c": cr,
        },
        "dimensionless_ratios_model_over_prototype": ratios,
        "equal_with_relative_tolerance_1e-9": {
            k: math.isclose(v, 1.0, rel_tol=1e-9, abs_tol=0.0)
            for k, v in ratios.items()
        },
        "note": "Matching dimensionless ratios is not sufficient without matching nondimensional equations, geometry, and boundary/initial conditions.",
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--length-ratio", type=positive, default=0.1)
    parser.add_argument("--match", choices=["re", "fr", "we", "ma"], default="re")
    parser.add_argument("--density-ratio", type=positive, default=1.0)
    parser.add_argument("--viscosity-ratio", type=positive, default=1.0)
    parser.add_argument("--gravity-ratio", type=positive, default=1.0)
    parser.add_argument("--tension-ratio", type=positive, default=1.0)
    parser.add_argument("--sound-ratio", type=positive, default=1.0)
    parser.add_argument("--time-ratio", type=positive, default=None,
                        help="omit to match St automatically")
    args = parser.parse_args()
    output = similarity(
        length_ratio=args.length_ratio, match=args.match,
        density_ratio=args.density_ratio, viscosity_ratio=args.viscosity_ratio,
        gravity_ratio=args.gravity_ratio, tension_ratio=args.tension_ratio,
        sound_ratio=args.sound_ratio, time_ratio=args.time_ratio,
    )
    print(json.dumps(output, ensure_ascii=False, indent=2, sort_keys=True, allow_nan=False))


if __name__ == "__main__":
    main()
