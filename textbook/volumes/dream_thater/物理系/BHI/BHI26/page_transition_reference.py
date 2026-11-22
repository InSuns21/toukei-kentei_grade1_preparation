#!/usr/bin/env python3
"""BHI26 reference calculation: identical two-bath JT/Dirac model.

Reproduces the finite-time symmetric real QES branch, its two saddle values,
the Page-type crossing, and optionally a plot. No dependency is needed for
CSV/table output; --plot optionally uses matplotlib.

This is a stationary Hartle--Hawking toy model, NOT evaporating JT gravity.
The root finder follows the late-time branch and does not enumerate all saddles.
"""

from __future__ import annotations

import argparse
import math


# Example parameters used in BHI26: entropies in nat.
C = 1.0
KAPPA = 1.0
ELL = 1.0
SH = 1.0
S0 = 0.0
B = math.log(2.0)
EPS_G = 0.01
EPS_B = 0.01


def q_equation(q: float) -> float:
    y = math.exp(-B)
    return 12 * SH * q * (1 - q * y) - C * (y - q) * (1 - q * q)


def bisect(fn, lo: float, hi: float, iterations: int = 65) -> float:
    f_lo, f_hi = fn(lo), fn(hi)
    if not f_lo < 0 < f_hi:
        raise ValueError(f"Expected sign bracket: {lo}, {hi}, {f_lo}, {f_hi}")
    for _ in range(iterations):
        mid = (lo + hi) / 2
        if fn(mid) < 0:
            lo = mid
        else:
            hi = mid
    return (lo + hi) / 2


def late_root() -> float:
    return bisect(q_equation, 1e-15, math.exp(-B) - 1e-12)


def s_empty(v: float) -> float:
    return C / 3 * math.log(2 * math.cosh(v) / (KAPPA * EPS_B))


def s_island(a: float, u: float, v: float) -> float:
    x = a + B
    f = math.cosh(x) - math.cosh(u - v)
    if a <= 0 or f <= 0:
        raise ValueError("Not in the real spacelike QES domain")
    cp = math.cosh((x + u + v) / 2)
    cm = math.cosh((x - u - v) / 2)
    factor = (
        2 * ELL * math.cosh(u) * math.cosh(v) * f
        / (KAPPA * EPS_G * EPS_B * math.sinh(a) * cp * cm)
    )
    return 2 * S0 + 2 * SH / math.tanh(a) + C / 3 * math.log(factor)


def k_late(a: float) -> float:
    return (
        2 * S0
        + 2 * SH / math.tanh(a)
        + C / 3
        * math.log(
            2 * ELL * (math.cosh(a + B) - 1)
            / (KAPPA * EPS_G * EPS_B * math.sinh(a))
        )
    )


def stationarity_and_hessian(a: float, u: float, v: float):
    """Analytic first and second derivatives of S_I wrt (A,U)."""
    if a <= 0:
        raise ValueError("A must be positive")
    x, d = a + B, u - v
    f = math.cosh(x) - math.cosh(d)
    if f <= 0:
        raise ValueError("F must be positive")
    tm = math.tanh((x - u - v) / 2)
    tp = math.tanh((x + u + v) / 2)
    sm = 1 / math.cosh((x - u - v) / 2) ** 2
    sp = 1 / math.cosh((x + u + v) / 2) ** 2
    sa = math.sinh(a)
    coth = math.cosh(a) / sa
    ga = -2 * SH / sa**2 + C / 3 * (
        math.sinh(x) / f - coth - (tm + tp) / 2
    )
    gu = C / 3 * (
        math.tanh(u) - math.sinh(d) / f + (tm - tp) / 2
    )
    aa = 4 * SH * coth / sa**2 + C / 3 * (
        (math.cosh(x) * f - math.sinh(x) ** 2) / f**2
        + 1 / sa**2 - (sm + sp) / 4
    )
    au = C / 3 * (math.sinh(x) * math.sinh(d) / f**2 + (sm - sp) / 4)
    uu = C / 3 * (
        1 / math.cosh(u) ** 2
        - (math.cosh(d) * f + math.sinh(d) ** 2) / f**2
        - (sm + sp) / 4
    )
    return ga, gu, aa, au, uu


def stationary_late_branch(v: float, a_guess: float):
    """Damped two-variable Newton method; valid near the late root."""
    a, u = a_guess, v
    for _ in range(40):
        ga, gu, aa, au, uu = stationarity_and_hessian(a, u, v)
        err = max(abs(ga), abs(gu))
        if err < 1e-12:
            break
        determinant = aa * uu - au * au
        if abs(determinant) < 1e-12:
            raise ArithmeticError("Degenerate Hessian near candidate")
        da = (uu * ga - au * gu) / determinant
        du = (-au * ga + aa * gu) / determinant
        damping = 1.0
        while damping > 1e-8:
            cand_a, cand_u = a - damping * da, u - damping * du
            try:
                cand = stationarity_and_hessian(cand_a, cand_u, v)
                if max(abs(cand[0]), abs(cand[1])) < err:
                    break
            except (ValueError, OverflowError):
                pass
            damping *= 0.5
        if damping <= 1e-8:
            raise ArithmeticError("Unable to reduce QES residual")
        a, u = cand_a, cand_u
    ga, gu, _, _, _ = stationarity_and_hessian(a, u, v)
    f = math.cosh(a + B) - math.cosh(u - v)
    if a <= 0 or f <= 0 or max(abs(ga), abs(gu)) > 1e-10:
        raise ArithmeticError("QES candidate failed residual/domain check")
    return a, u


def row(v: float, a_star: float):
    a, u = stationary_late_branch(v, a_star)
    empty = s_empty(v)
    island = s_island(a, u, v)
    return v, a, u - v, empty, island, min(empty, island)


def crossing(v: float, a_star: float) -> float:
    # In this explicit example the chosen late branch crosses within [11, 13].
    def difference(time: float) -> float:
        _, _, _, empty, island, _ = row(time, a_star)
        return empty - island

    return bisect(difference, 11.0, 13.0, iterations=45)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--plot", action="store_true",
        help="write bhi26_page_curve.png (requires matplotlib)",
    )
    args = parser.parse_args()
    q = late_root()
    a_star = -math.log(q)
    k = k_late(a_star)
    page_late = math.acosh(KAPPA * EPS_B / 2 * math.exp(3 * k / C))
    page_finite = crossing(0, a_star)
    print(f"q*={q:.13f} A*={a_star:.11f} K*={k:.11f}")
    print(f"V_Page_late={page_late:.11f}, V_Page_finite={page_finite:.11f}")
    print("V,A,U_minus_V,S_empty,S_island,S_selected")
    times = [8.0, 10.0, 11.5, 11.9, 12.0, 13.0, 14.0]
    for time in times:
        v, a, diff, empty, island, selected = row(time, a_star)
        print(f"{v:g},{a:.8f},{diff:.4e},{empty:.8f},{island:.8f},{selected:.8f}")

    if args.plot:
        try:
            import matplotlib.pyplot as plt
        except ImportError as exc:
            raise SystemExit("Install matplotlib only if you need --plot") from exc
        samples = [row(i / 10, a_star) for i in range(80, 141)]
        vs = [z[0] for z in samples]
        fig, ax = plt.subplots()
        ax.plot(vs, [z[3] for z in samples], "--", label="No island")
        ax.plot(vs, [z[4] for z in samples], ":", label="Extremized island")
        ax.plot(vs, [z[5] for z in samples], label="Selected candidate")
        ax.axvline(page_finite, linestyle="--", label="Crossing")
        ax.set_xlabel("V = kappa t")
        ax.set_ylabel("Entropy (nat)")
        ax.legend()
        fig.tight_layout()
        fig.savefig("bhi26_page_curve.png", dpi=160)
        print("wrote bhi26_page_curve.png")


if __name__ == "__main__":
    main()
