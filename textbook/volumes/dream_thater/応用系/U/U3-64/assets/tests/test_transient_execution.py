"""Regression tests for the U3-64 textbook's independently derived formulas."""
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from transient_execution import calculate, project_simplex, solve


class TransientImpactTests(unittest.TestCase):
    def test_projection(self):
        q = project_simplex([100, -1, 3], 10)
        self.assertAlmostEqual(sum(q), 10.0, places=10)
        self.assertTrue(all(v >= 0 for v in q))

    def test_cost_state_equals_kernel(self):
        z = calculate([40, 20], 60, 2, 0.02, 0.01, 0.5, 0.0, 0.0)
        self.assertAlmostEqual(z["recurrence"], 48.0, places=9)
        self.assertAlmostEqual(z["impact"], 48.0, places=9)
        self.assertAlmostEqual(z["remaining"], 0.0, places=9)
        self.assertAlmostEqual(z["before"][1], 0.4, places=9)

    def test_two_period_exact_solution(self):
        z = solve(total=100, hours=2, periods=2, kappa=0.02,
                  eta=0.01, decay=0.5, sigma=0.1, risk=1)
        self.assertTrue(z["converged"])
        self.assertAlmostEqual(z["q"][0], 62.5, places=5)
        self.assertAlmostEqual(z["q"][1], 37.5, places=5)
        self.assertAlmostEqual(z["impact"], 129.6875, places=5)
        self.assertAlmostEqual(z["variance"], 114.0625, places=5)
        self.assertAlmostEqual(z["objective"], 243.75, places=5)
        self.assertLess(z["kernel_state_gap"], 1e-8)

    def test_three_period_extremes(self):
        for a, expected in [(0, [30, 30, 30]),
                            (0.5, [1080 / 31, 630 / 31, 1080 / 31]),
                            (1, [30, 30, 30])]:
            with self.subTest(a=a):
                z = solve(total=90, hours=3, periods=3, kappa=0.02,
                          eta=0.001, decay=a, sigma=0.1, risk=0)
                self.assertTrue(z["converged"])
                for observed, target in zip(z["q"], expected):
                    self.assertAlmostEqual(observed, target, places=4)
                self.assertAlmostEqual(sum(z["q"]), 90.0, places=8)
        self.assertAlmostEqual(
            calculate([30] * 3, 90, 3, 0.02, 0.001, 1, 0, 0)["impact"],
            83.7, places=8)

    def test_invalid_inputs(self):
        for kw in (dict(decay=-0.01), dict(decay=1.1),
                   dict(eta=0), dict(hours=0), dict(periods=0),
                   dict(kappa=-1), dict(risk=-0.1)):
            with self.subTest(kw=kw), self.assertRaises(ValueError):
                solve(**kw)


if __name__ == "__main__":
    unittest.main()
