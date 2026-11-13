"""Unit tests for analytic values, independent quadrature, CRR, and boundaries."""
from __future__ import annotations

import importlib.util
import math
from pathlib import Path
import sys
import unittest

SOURCE = Path(__file__).resolve().parents[1] / "black_scholes_check.py"
spec = importlib.util.spec_from_file_location("u3_18_bs", SOURCE)
mod = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = mod
assert spec.loader is not None
spec.loader.exec_module(mod)


class BlackScholesTests(unittest.TestCase):
    def test_reference_case_and_parity(self) -> None:
        c, p = mod.closed_form(100, 100, .03, .2, 1)
        self.assertAlmostEqual(c, 9.413403383853016, places=10)
        self.assertAlmostEqual(p, 6.457956738703842, places=10)
        self.assertAlmostEqual(c-p, 100-100*math.exp(-.03), places=10)
        self.assertEqual(mod.indicators(100, 100, .03, .2, 1), (.25, .05))

    def test_independent_integrals(self) -> None:
        for s, k, r, sigma, tau in (
            (100., 100., .03, .2, 1.),
            (120., 100., -.01, .3, .6),
            (75., 90., .02, .35, .5),
        ):
            c, p = mod.closed_form(s, k, r, sigma, tau)
            ci, pi = mod.integral_prices(s, k, r, sigma, tau)
            self.assertAlmostEqual(ci, c, delta=2e-6)
            self.assertAlmostEqual(pi, p, delta=2e-6)

    def test_crr_reference_and_grid_error(self) -> None:
        target = mod.closed_form(100, 100, .03, .2, 1)[0]
        t100 = mod.crr_prices(100, 100, .03, .2, 1, 100)[0]
        t400 = mod.crr_prices(100, 100, .03, .2, 1, 400)[0]
        self.assertAlmostEqual(t100, 9.393595624252434, delta=3e-8)
        self.assertLess(abs(t400-target), abs(t100-target))

    def test_bounds_and_deltas(self) -> None:
        s, k, r, sigma, tau = 100., 100., .03, .2, 1.
        c, p = mod.closed_form(s, k, r, sigma, tau)
        self.assertTrue(max(0, s-k*math.exp(-r*tau)) <= c <= s)
        self.assertTrue(max(0, k*math.exp(-r*tau)-s) <= p <= k*math.exp(-r*tau))
        d1, d2 = mod.indicators(s, k, r, sigma, tau)
        self.assertAlmostEqual(s*mod.phi(d1), k*math.exp(-r*tau)*mod.phi(d2))
        ds = 0.0001
        cd = (mod.closed_form(s+ds,k,r,sigma,tau)[0] -
              mod.closed_form(s-ds,k,r,sigma,tau)[0])/(2*ds)
        self.assertAlmostEqual(cd, mod.Phi(d1), delta=1e-8)

    def test_small_volatility_limit(self) -> None:
        s, k, r, tau = 105., 100., .03, 1.
        c, p = mod.closed_form(s, k, r, 1e-5, tau)
        self.assertAlmostEqual(c, max(s-k*math.exp(-r*tau), 0), delta=1e-8)
        self.assertAlmostEqual(p, max(k*math.exp(-r*tau)-s, 0), delta=1e-8)

    def test_invalid_input_and_crr_probability(self) -> None:
        with self.assertRaises(ValueError):
            mod.closed_form(0, 100, .03, .2, 1)
        with self.assertRaises(ValueError):
            mod.closed_form(100, 100, .03, 0, 1)
        with self.assertRaises(ValueError):
            mod.integral_prices(100, 100, .03, .2, 1, n=5)
        with self.assertRaises(ValueError):
            mod.crr_prices(100, 100, .5, .2, 1, 1)
        with self.assertRaises(ValueError):
            mod.crr_prices(100, 100, .03, .2, 1, 0)


if __name__ == "__main__":
    unittest.main()
