"""Independent reproducibility and finite-step GBM checks."""
import importlib.util
import pathlib
import unittest

MODULE_PATH = pathlib.Path(__file__).resolve().parents[1] / "gbm_convergence.py"
spec = importlib.util.spec_from_file_location("gbm_convergence", MODULE_PATH)
import sys
module = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = module
spec.loader.exec_module(module)


class ConvergenceTest(unittest.TestCase):
    def test_theoretical_orders(self):
        r64 = module.theoretical(64)
        r128 = module.theoretical(128)
        em = module.observed_order(1/64, 1/128, r64["em_rmse"], r128["em_rmse"])
        mil = module.observed_order(1/64, 1/128, r64["mil_rmse"], r128["mil_rmse"])
        weak = module.observed_order(
            1/64, 1/128, abs(r64["weak_linear"]), abs(r128["weak_linear"])
        )
        self.assertAlmostEqual(em, 0.5, delta=0.02)
        self.assertAlmostEqual(mil, 1.0, delta=0.02)
        self.assertAlmostEqual(weak, 1.0, delta=0.02)

    def test_weak_special_case_mu_zero(self):
        p = module.Params(s0=1, mu=0, sigma=1, T=1)
        result = module.theoretical(4, p)
        self.assertAlmostEqual(result["weak_linear"], 0.0, places=12)
        self.assertLess(result["weak_quadratic_em"], 0.0)
        self.assertGreater(result["em_rmse"], 0)

    def test_identity_sde(self):
        p = module.Params(s0=1, mu=0, sigma=0, T=1)
        rows = module.simulate(n=8, seed=10, levels=(2, 4), p=p)
        for row in rows:
            self.assertEqual(row["em_rmse"], 0)
            self.assertEqual(row["mil_rmse"], 0)
            self.assertEqual(row["em_weak"], 0)

    def test_seed_and_monte_carlo_tolerance(self):
        a = module.simulate(n=1100, seed=3917, levels=(4, 8, 16))
        b = module.simulate(n=1100, seed=3917, levels=(4, 8, 16))
        self.assertEqual(a, b)
        for row in a:
            # Statistics of squared path differences, not of RMSE itself.
            self.assertLessEqual(
                abs(row["em_mse"] - row["theory_em_mse"]),
                6 * row["em_mse_se"]
            )
            self.assertLessEqual(
                abs(row["mil_mse"] - row["theory_mil_mse"]),
                6 * row["mil_mse_se"]
            )
            self.assertLessEqual(
                abs(row["em_weak"] - row["theory_weak_linear"]),
                6 * row["em_weak_se"]
            )
            self.assertLessEqual(
                abs(row["mil_weak"] - row["theory_weak_linear"]),
                6 * row["mil_weak_se"]
            )

    def test_invalid_grid(self):
        with self.assertRaises(ValueError):
            module.simulate(n=10, levels=(3, 8))
        with self.assertRaises(ValueError):
            module.observed_order(0.5, 0.25, 0, 1)


if __name__ == "__main__":
    unittest.main()
