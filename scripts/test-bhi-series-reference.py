#!/usr/bin/env python3
"""Independent numerical verification of BHI I entropy and BHI II QES references."""
from __future__ import annotations

import importlib.util
import math
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
BHI = ROOT / "textbook/volumes/dream_thater/物理系/BHI"


def load_module(name: str, filename: Path):
    spec = importlib.util.spec_from_file_location(name, filename)
    assert spec and spec.loader
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def main() -> None:
    early = load_module("bhi16_entropy_reference", BHI / "BHI16/radiation_entropy_reference.py")
    late = load_module("bhi26_page_reference", BHI / "BHI26/page_transition_reference.py")
    early.check()
    rows = list(early.rows(6, 0.5))
    assert len(rows) == 7
    for k, trace, entropy, analytic, capacity, proxy in rows:
        assert math.isclose(trace, 1.0, abs_tol=1e-12)
        assert math.isclose(entropy, analytic, abs_tol=1e-12)
        assert math.isclose(analytic / early.LN2, float(k), abs_tol=1e-12)
        assert math.isclose(capacity / early.LN2, float(6-k), abs_tol=1e-12)
        assert math.isclose(proxy, min(entropy, capacity), abs_tol=1e-12)
    # Capacity contradiction: independent pairs grow beyond the available
    # pure RB remainder; these are mutually inconsistent physical assumptions.
    assert rows[4][2] > rows[4][4]

    # The BHI26 reference solves a symmetric two-variable stationary branch
    # for a fixed equilibrium JT/Dirac bath model, NOT 4D evaporation.
    q = late.late_root()
    a_star = -math.log(q)
    assert 0 < q < math.exp(-late.B)
    assert abs(late.q_equation(q)) < 1e-12
    for v in (10.0, 11.5, 12.0, 13.0):
        _, a, delta, empty, island, selected = late.row(v, a_star)
        u = v + delta
        ga, gu, aa, au, uu = late.stationarity_and_hessian(a, u, v)
        assert max(abs(ga), abs(gu)) < 1e-9
        assert a > 0.0
        assert math.cosh(a + late.B) > math.cosh(u - v)
        assert math.isfinite(aa * uu - au * au)
        assert math.isclose(selected, min(empty, island), abs_tol=1e-11)
    vpage = late.crossing(0, a_star)
    _, a, du, empty, island, selected = late.row(vpage, a_star)
    assert 11.0 <= vpage <= 13.0
    assert abs(empty - island) < 1e-8
    assert abs(selected - min(empty, island)) < 1e-10
    # Independent finite difference against analytic stationarity formulas.
    v, a, u = 12.0, a_star, 12.0
    h = 1e-5
    f_a = (late.s_island(a+h, u, v) - late.s_island(a-h, u, v))/(2*h)
    f_u = (late.s_island(a, u+h, v) - late.s_island(a, u-h, v))/(2*h)
    ga, gu, *_ = late.stationarity_and_hessian(a, u, v)
    assert abs(f_a - ga) < 1e-6
    assert abs(f_u - gu) < 1e-6
    print("PASS: BHI I state spectra and dimension bound; BHI II QES gradient, "
          "domain, saddle crossing, and finite-difference residual")
    print(f"q={q:.12g}, A*={a_star:.12g}, V_page={vpage:.12g}, "
          f"S_page={empty:.12g} nat")


if __name__ == "__main__":
    main()
