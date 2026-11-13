"""Standard-library regression tests for the U3-14 exact GBM experiment."""

import contextlib
import io
import math
from pathlib import Path
import sys
import tempfile
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gbm_distribution import empirical_quantile, moment, run, sample, theory


class GBMTests(unittest.TestCase):
    def test_known_lognormal_moments(self):
        values = theory(100.0, 0.08, 0.2, 1.0)
        self.assertAlmostEqual(values["log_mean"], 0.06)
        self.assertAlmostEqual(values["log_var"], 0.04)
        self.assertAlmostEqual(values["stock_mean"], 100.0 * math.exp(0.08))
        self.assertAlmostEqual(values["stock_var"],
                               10000.0 * math.exp(0.16) * math.expm1(0.04))
        self.assertAlmostEqual(values["stock_median"], 100.0 * math.exp(0.06))
        self.assertAlmostEqual(values["prob_above_initial"], 0.6179114221889526)

    def test_moment_powers_and_inverse(self):
        self.assertAlmostEqual(moment(80, .03, .2, 2, 2),
                               80**2 * math.exp((.06 + .04) * 2))
        self.assertAlmostEqual(moment(80, .03, .2, 2, -1),
                               math.exp((-.03 + .04) * 2) / 80)

    def test_no_noise_is_point_mass(self):
        for sigma, t in [(0.0, 2.0), (0.3, 0.0)]:
            v = theory(80.0, -0.02, sigma, t)
            self.assertEqual(v["stock_var"], 0.0)
            self.assertEqual(v["stock_mean"], v["stock_median"])
            self.assertEqual(v["stock_q95"], v["stock_median"])
            self.assertEqual(v["prob_above_initial"], 0.0)

    def test_all_sampled_stocks_positive_and_variances_nonnegative(self):
        result = sample(0.01, -.1, .7, 2, n=500, seed=7)
        self.assertGreater(result["stock_mean"], 0)
        self.assertGreaterEqual(result["stock_var"], 0)
        self.assertGreaterEqual(result["log_var"], 0)

    def test_analytic_sampling_error_budget(self):
        n = 20000
        exact = theory(100, .08, .2, 1)
        obs = sample(100, .08, .2, 1, n=n, seed=20261113)
        self.assertLess(abs(obs["log_mean"] - exact["log_mean"]),
                        5.0 * math.sqrt(exact["log_var"] / n))
        self.assertLess(abs(obs["stock_mean"] - exact["stock_mean"]),
                        5.0 * math.sqrt(exact["stock_var"] / n))
        self.assertLess(abs(obs["log_var"] - exact["log_var"]),
                        5.0 * exact["log_var"] * math.sqrt(2.0 / (n - 1)))
        self.assertLess(abs(obs["prob_above_initial"] - exact["prob_above_initial"]),
                        5.0 * math.sqrt(exact["prob_above_initial"]
                                        * (1.0 - exact["prob_above_initial"]) / n))

    def test_deterministic_repeat(self):
        self.assertEqual(sample(100, .08, .2, 1, n=100, seed=51),
                         sample(100, .08, .2, 1, n=100, seed=51))

    def test_empirical_quantile_interpolation(self):
        self.assertAlmostEqual(empirical_quantile([10, 20, 30, 40], .5), 25)
        self.assertAlmostEqual(empirical_quantile([10, 20, 30, 40], .95), 38.5)
        with self.assertRaises(ValueError):
            empirical_quantile([], .5)

    def test_parameter_validation(self):
        for args in [(0, .05, .2, 1), (100, .05, -.1, 1),
                     (100, .05, .2, -1), (float("nan"), .05, .2, 1)]:
            with self.assertRaises(ValueError):
                theory(*args)
        with self.assertRaises(ValueError):
            sample(100, .08, .2, 1, n=1)

    def test_csv_reproducibility_and_header(self):
        with tempfile.TemporaryDirectory() as d:
            path = str(Path(d) / "summary.csv")
            with contextlib.redirect_stdout(io.StringIO()):
                exact, observed = run(n=100, seed=5, csv_path=path)
            data = Path(path).read_text(encoding="utf-8")
            self.assertTrue(data.startswith(
                "statistic,theory,sample,sample_minus_theory\n"))
            self.assertEqual(len(data.splitlines()), len(exact) + 1)
            self.assertEqual(set(exact), set(observed))


if __name__ == "__main__":
    unittest.main()
