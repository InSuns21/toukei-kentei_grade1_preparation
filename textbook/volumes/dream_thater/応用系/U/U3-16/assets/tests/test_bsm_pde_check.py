"""Independent numerical and analytic sanity checks for U3-16."""
from __future__ import annotations

import importlib.util
import math
from pathlib import Path
import sys
import unittest


SOURCE = Path(__file__).resolve().parents[1] / "bsm_pde_check.py"
spec = importlib.util.spec_from_file_location("bsm_pde_check", SOURCE)
module = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = module
assert spec.loader is not None
spec.loader.exec_module(module)

Market = module.Market
quadratic_value = module.quadratic_value
analytic_terms = module.analytic_terms
finite_difference_residual = module.finite_difference_residual


class BsmPdeTests(unittest.TestCase):
    def test_quadratic_value_and_delta(self) -> None:
        m = Market()
        a = analytic_terms(0.0, 100, m)
        self.assertAlmostEqual(a["value"], 100 * math.exp(0.07), places=11)
        self.assertAlmostEqual(a["delta"], 2 * math.exp(0.07), places=12)
        self.assertAlmostEqual(quadratic_value(1.0, 120, m), 144.0, places=12)

    def test_no_dividend_residual_and_terms(self) -> None:
        m = Market()
        for t, s in ((0.0, 100.0), (0.4, 87.0), (0.9, 220.0)):
            a = analytic_terms(t, s, m)
            self.assertAlmostEqual(a["residual"], 0.0, delta=1e-11)
            self.assertAlmostEqual(a["time"], -0.07 * a["value"], places=11)
            self.assertAlmostEqual(a["diffusion"], 0.04 * a["value"], places=11)

    def test_missing_ito_term_has_positive_funding_gap(self) -> None:
        m = Market()
        a = analytic_terms(0.0, 100, m, "no_ito")
        self.assertAlmostEqual(a["value"], 100 * math.exp(0.03), places=10)
        self.assertAlmostEqual(a["residual"], 0.04 * a["value"], places=10)
        self.assertGreater(a["residual"], 4.0)

    def test_continuous_dividend_and_wrong_sign(self) -> None:
        m = Market(dividend=0.01)
        correct = analytic_terms(0.0, 100, m)
        wrong = analytic_terms(0.0, 100, m, "no_dividend")
        self.assertAlmostEqual(correct["value"], 100 * math.exp(0.05), places=10)
        self.assertAlmostEqual(correct["residual"], 0.0, delta=1e-11)
        self.assertAlmostEqual(wrong["residual"], -0.02 * wrong["value"], places=10)
        self.assertGreater(wrong["value"], correct["value"])

    def test_central_difference_second_order_time_convergence(self) -> None:
        m = Market()
        errors = [
            abs(finite_difference_residual(0.5, 100, m, h, 1.0))
            for h in (0.08, 0.04, 0.02)
        ]
        self.assertTrue(all(x > 1e-9 for x in errors))
        self.assertLess(errors[1], errors[0])
        self.assertLess(errors[2], errors[1])
        self.assertGreater(errors[0] / errors[1], 3.3)
        self.assertLess(errors[0] / errors[1], 4.7)
        self.assertGreater(errors[1] / errors[2], 3.3)
        self.assertLess(errors[1] / errors[2], 4.7)

    def test_invalid_inputs_are_rejected(self) -> None:
        with self.assertRaises(ValueError):
            Market(sigma=0.0)
        with self.assertRaises(ValueError):
            Market(dividend=-0.1)
        with self.assertRaises(ValueError):
            quadratic_value(1.5, 100, Market())
        with self.assertRaises(ValueError):
            finite_difference_residual(0.5, 100, Market(), 0.0, 1.0)
        with self.assertRaises(ValueError):
            module.exponent(Market(), "unsupported")


if __name__ == "__main__":
    unittest.main()
