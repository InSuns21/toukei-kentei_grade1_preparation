"""Regression tests for the synthetic U3-55 numeric examples."""
import math
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import stress_scenarios as s


class StressScenarioTests(unittest.TestCase):
    def test_market_losses(self):
        self.assertAlmostEqual(s.market_loss(s.SCENARIOS[0]), 4.6)
        self.assertAlmostEqual(s.market_loss(s.SCENARIOS[1]), 28.0)
        self.assertAlmostEqual(s.market_loss(s.SCENARIOS[2]), 14.0)

    def test_liquidity_costs(self):
        self.assertAlmostEqual(s.liquidity_cost(s.SCENARIOS[0]), 1.0)
        self.assertAlmostEqual(s.liquidity_cost(s.SCENARIOS[1]), 4.2)

    def test_non_linear_marking(self):
        self.assertAlmostEqual(s.market_loss(s.SCENARIOS[1], 20), 29.8)
        self.assertAlmostEqual(s.market_loss(s.SCENARIOS[0], 20), 4.65)

    def test_worst_case(self):
        w, name, k = s.worst_case()
        self.assertAlmostEqual(w, 34)
        self.assertEqual((name, k), ("joint", 20.0))

    def test_reverse_thresholds(self):
        self.assertAlmostEqual(s.reverse_level(20, kappa=0), 0.158)
        t = s.reverse_level(20, kappa=20)
        self.assertAlmostEqual(t, 0.1532998322843199)
        self.assertAlmostEqual(100*t + 20*t*t + 4.2, 20.0)

    def test_reverse_endpoints(self):
        self.assertEqual(s.reverse_level(4.2), 0)
        self.assertIsNone(s.reverse_level(200))
        self.assertAlmostEqual(s.reverse_level(104.2, kappa=0), 1.0)

    def test_invalid_depth(self):
        bad = s.Scenario("closed", -0.1, -0.1, 0.02, 0, 80)
        with self.assertRaises(ValueError):
            s.liquidity_cost(bad)


if __name__ == "__main__":
    unittest.main()
