"""Regression tests for U3-15 risk-neutral change of measure."""
import math
from pathlib import Path
import sys
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from risk_neutral_check import Model, integrate_normal, sample_normal


class RiskNeutralCheckTests(unittest.TestCase):
    def setUp(self):
        self.m = Model()

    def test_parameters_and_measure_construction(self):
        self.assertAlmostEqual(self.m.theta, 0.25)
        self.assertAlmostEqual(self.m.theory()["density"], 1.0)
        self.assertAlmostEqual(
            self.m.theory()["q_discounted_quadratic"], 100*math.exp(0.07)
        )

    def test_normal_integration_against_analytic_oracle(self):
        m = self.m
        estimates = integrate_normal(m)
        for key, expected in m.theory().items():
            with self.subTest(quantity=key):
                self.assertAlmostEqual(estimates[key], expected, delta=1e-7)

    def test_independent_monte_carlo_error_budget(self):
        m = self.m
        n = 50000
        estimates = sample_normal(m, count=n, seed=20261113)
        for key, expected in m.theory().items():
            with self.subTest(quantity=key):
                sd = m.standard_deviations()[key]
                self.assertLess(abs(estimates[key] - expected),
                                6 * sd/math.sqrt(n))

    def test_p_and_q_are_distinct_for_nonzero_risk_premium(self):
        p = self.m.theory()["p_discounted_stock"]
        q = self.m.theory()["q_discounted_stock"]
        self.assertGreater(p, q)
        self.assertAlmostEqual(p, 100*math.exp(0.05))
        self.assertEqual(q, 100.0)

    def test_invalid_parameters_rejected(self):
        with self.assertRaises(ValueError):
            Model(sigma=0)
        with self.assertRaises(ValueError):
            Model(strike=0)
        with self.assertRaises(ValueError):
            Model(maturity=-1)


if __name__ == "__main__":
    unittest.main()
