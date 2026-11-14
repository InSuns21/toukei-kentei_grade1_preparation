"""Unit tests for the analytic formulas and the reproducible simulation."""
import math
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from ito_taylor_stability import (
    amplification, coupled_experiment, factor, finite_strong_mse, stability_limit,
)


class TestItoTaylorStability(unittest.TestCase):
    def test_multipliers_at_zero(self):
        self.assertAlmostEqual(factor(1, 1.0, 0.0, 1.0), 1.0)
        self.assertAlmostEqual(factor(2, 1.0, 0.0, 1.0), 0.5)
        self.assertAlmostEqual(factor(3, 1.0, 0.0, 1.0), 0.5)

    def test_finite_mse_one_step(self):
        # E(R-Pp)^2=exp(u)-sum_{k=0}^p u^k/k!, T=h=1.
        for p in (1, 2, 3):
            expected = math.e - sum(1.0 / math.factorial(k) for k in range(p + 1))
            self.assertAlmostEqual(finite_strong_mse(p, 1, 1, 1, 1), expected, places=12)

    def test_orders_asymptotically(self):
        for p in (1, 2, 3):
            e1 = finite_strong_mse(p, 1, 0.5, 1, 32)
            e2 = finite_strong_mse(p, 1, 0.5, 1, 64)
            self.assertGreater(e1, e2)
            # MSE scales like h^p, not h^(p/2).
            self.assertAlmostEqual(e1 / e2, 2 ** p, delta=0.2)

    def test_stability_regions(self):
        self.assertAlmostEqual(stability_limit("EM", -1, 1), 1.0)
        self.assertAlmostEqual(stability_limit("Milstein", -1, 1), 2.0 / 3.0)
        self.assertAlmostEqual(amplification("EM", -1, 1, 1), 1)
        self.assertAlmostEqual(amplification("Milstein", -1, 1, 1), 1.5)
        for method in ("EM", "Milstein"):
            self.assertLess(amplification(method, -1, 1, 0.5), 1)

    def test_naive_heun_mean_is_inconsistent(self):
        m = 10000
        h = 1.0 / m
        self.assertAlmostEqual((1 + 0.5 * h) ** m, math.exp(0.5), delta=0.0001)
        self.assertNotAlmostEqual((1 + 0.5 * h) ** m, 1.0, places=1)

    def test_simulated_shared_path_mse(self):
        # Same-seed reproducibility is exact, not an asymptotic/statistical claim.
        a = coupled_experiment(8, 50, 712)
        b = coupled_experiment(8, 50, 712)
        self.assertEqual(a, b)
        self.assertEqual(len(a), 3)
        for row in a:
            self.assertGreaterEqual(row["mse_est"], 0)
            self.assertGreater(row["mse_exact"], 0)
            self.assertGreaterEqual(row["mse_se_est"], 0)

    def test_reject_invalid_inputs(self):
        with self.assertRaises(ValueError):
            factor(4, 1, 1, 1)
        with self.assertRaises(ValueError):
            amplification("unknown", -1, 1, 1)
        with self.assertRaises(ValueError):
            coupled_experiment(2, 1, 10)


if __name__ == "__main__":
    unittest.main()
