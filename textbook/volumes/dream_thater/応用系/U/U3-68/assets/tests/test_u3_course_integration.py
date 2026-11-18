"""U3 68-lecture course: cross-module pricing, risk and execution oracles.

All scenarios are synthetic. These regressions supplement, not replace,
a human audit of definitions, hypotheses, and chapter links.
"""
from __future__ import annotations

import importlib.util
import math
from pathlib import Path
from fractions import Fraction
from statistics import covariance, variance
import sys
import unittest

U_ROOT = Path(__file__).resolve().parents[3]


def load_module(name: str, relative: str):
    spec = importlib.util.spec_from_file_location(name, U_ROOT / relative)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"cannot load {relative}")
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


lattice = load_module("u3_course_lattice", "U3-11/assets/lattice_pricing.py")
pricing = load_module("u3_course_bsm", "U3-18/assets/black_scholes_check.py")
risk = load_module("u3_course_es", "U3-57/assets/es_hedge.py")
execution = load_module("u3_course_tca", "U3-68/assets/execution_tca.py")


class U3CrossCourseIntegration(unittest.TestCase):
    """Compare independent course implementations on matched assumptions."""

    def test_q_pricing_closed_integral_two_trees_and_execution_quote(self):
        # Same European call, constant r and sigma, zero dividends, T=1.
        s = k = 100.0
        r, sigma, t = 0.02, 0.20, 1.0
        call, put = pricing.closed_form(s, k, r, sigma, t)
        call_integral, put_integral = pricing.integral_prices(s, k, r, sigma, t)
        call_crr, put_crr = pricing.crr_prices(s, k, r, sigma, t, 400)
        call_lattice = lattice.price(
            400, s0=s, T=t, r=r, sigma=sigma,
            model="crr", payoff="call", K=k,
        )
        call_tca = execution.black_scholes_call(s, k, r, sigma, t)
        self.assertAlmostEqual(call, call_integral, delta=1e-6)
        self.assertAlmostEqual(put, put_integral, delta=1e-6)
        self.assertAlmostEqual(call_crr, call_lattice, delta=1e-8)
        self.assertAlmostEqual(call, call_crr, delta=0.05)
        self.assertAlmostEqual(put, put_crr, delta=0.05)
        self.assertAlmostEqual(call, call_tca, delta=1e-10)
        self.assertAlmostEqual(call - put, s - k * math.exp(-r*t), delta=1e-10)

    def test_q_prices_inside_synthetic_p_market_are_not_p_probabilities(self):
        paths = execution.generate_paths(32, seed=20261119)
        again = execution.generate_paths(32, seed=20261119)
        self.assertEqual(paths, again)
        initial_q = pricing.closed_form(100, 100, 0.02, 0.20, 1.0)[0]
        self.assertTrue(all(abs(path.mids[0] - initial_q) < 1e-10 for path in paths))
        # Different P drift and Q financing rate imply different 1y stock means.
        self.assertNotAlmostEqual(100*math.exp(0.08), 100*math.exp(0.02), delta=0.01)

    def test_quantile_integral_expected_shortfall_and_boundary_atom(self):
        losses = [0.0, 0.0, 2.0, 4.0]
        var, es = execution.empirical_var_es(losses, alpha=0.625)
        exact, weights = risk.tail_es(
            tuple(Fraction(int(z)) for z in losses),
            probabilities=(Fraction(1, 4),)*4,
            alpha=Fraction(5, 8),
        )
        self.assertEqual(var, 2)
        self.assertEqual(exact, Fraction(10, 3))
        self.assertAlmostEqual(es, float(exact), delta=1e-12)
        self.assertEqual(sum(weights), 1)
        var_shift, es_shift = execution.empirical_var_es([z+3 for z in losses], 0.625)
        self.assertEqual(var_shift, 5)
        self.assertAlmostEqual(es_shift, float(Fraction(19, 3)), delta=1e-12)

    def test_cash_inventory_and_telescope_on_four_period_route(self):
        path = execution.Path((100.0, 99.0, 101.0, 100.0, 100.0),
                              (40, 40, 40, 40))
        result = execution.execute(path, "TWAP")
        self.assertEqual(result.orders, (3, 3, 3, 3))
        self.assertEqual(result.fills, (3, 3, 3, 3))
        self.assertEqual(result.inventory, (9, 6, 3, 0))
        self.assertAlmostEqual(result.cash, 1198.08, delta=1e-9)
        self.assertAlmostEqual(result.fees, 0.24, delta=1e-9)
        self.assertAlmostEqual(result.shortfall, 2.16, delta=1e-9)
        self.assertAlmostEqual(result.shortfall,
                               execution.telescoping_shortfall(path, result),
                               delta=1e-9)

    def test_order_invariance_does_not_imply_fill_invariance(self):
        same_history_low_capacity = execution.Path(
            (10.0, 9.0, 11.0, 10.0, 8.0), (8, 40, 40, 40))
        same_history_high_capacity = execution.Path(
            (10.0, 9.0, 11.0, 10.0, 8.0), (20, 40, 40, 40))
        low = execution.execute(same_history_low_capacity, "TWAP")
        high = execution.execute(same_history_high_capacity, "TWAP")
        self.assertEqual(low.orders[0], high.orders[0])
        self.assertNotEqual(low.fills[0], high.fills[0])
        self.assertNotEqual(low.inventory[0], high.inventory[0])
        base = execution.Path((10.0, 9.0, 11.0, 10.0, 8.0), (40,)*4)
        future_only = execution.Path((10.0, 9.0, 11.0, 10.0, 500.0),
                                     (40, 40, 40, 999))
        for name in execution.schedules():
            before = execution.execute(base, name)
            after = execution.execute(future_only, name)
            self.assertEqual(before.orders[:3], after.orders[:3])
            self.assertEqual(before.fills[:3], after.fills[:3])
            self.assertEqual(before.inventory[:3], after.inventory[:3])

    def test_same_path_paired_difference_covariance_identity(self):
        paths = execution.generate_paths(40, seed=20261119)
        a = [execution.execute(p, "TWAP").shortfall for p in paths]
        b = [execution.execute(p, "forecast-VWAP").shortfall for p in paths]
        d = [x-y for x, y in zip(a, b)]
        self.assertAlmostEqual(variance(d),
                               variance(a)+variance(b)-2*covariance(a, b),
                               delta=1e-10)
        self.assertTrue(all(math.isfinite(x) for x in d))


if __name__ == "__main__":
    unittest.main()
