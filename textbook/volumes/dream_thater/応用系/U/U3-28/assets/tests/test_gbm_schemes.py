"""Unit tests for coupled GBM discretization and analytic moment oracle."""
import math
import pathlib
import sys
import unittest

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1]))
import gbm_schemes as lab  # noqa: E402


class GBMSchemeTests(unittest.TestCase):
    def test_two_step_hand_calculation(self):
        values = lab.path_values([0.3, -0.1])
        self.assertAlmostEqual(values["exact"][-1], 100 * math.exp(0.1))
        self.assertAlmostEqual(values["euler"][-1], 112.2)
        self.assertAlmostEqual(values["milstein"][-1], 110.293636)
        self.assertAlmostEqual(values["euler"][1], 110.0)
        self.assertAlmostEqual(values["milstein"][1], 109.18)

    def test_zero_volatility_and_initial_conditions(self):
        values = lab.path_values([0.8, -0.9, 0.25], 100, 0.1, 0, 1.5)
        self.assertEqual([v[0] for v in values.values()], [100] * 3)
        self.assertEqual(values["euler"], values["milstein"])
        self.assertAlmostEqual(values["exact"][-1], 100 * math.exp(0.15))

    def test_negative_factor_is_not_a_negative_exact_gbm(self):
        values = lab.path_values([-0.5], 100, 0, 2, 1)
        self.assertAlmostEqual(values["exact"][-1], 100 * math.exp(-3))
        self.assertEqual(values["euler"][-1], 0)
        self.assertAlmostEqual(values["milstein"][-1], -150)

    def test_analytic_mse_and_weak_bias(self):
        for m in (2, 4, 16, 64):
            self.assertGreater(lab.exact_terminal_mse(m, "euler"), 0)
            self.assertGreater(lab.exact_terminal_mse(m, "milstein"), 0)
            self.assertLess(lab.exact_terminal_mse(m, "milstein"),
                            lab.exact_terminal_mse(m, "euler"))
        self.assertAlmostEqual(lab.weak_mean_bias(1), 100 * (1.08-math.exp(.08)))
        self.assertEqual(lab.weak_mean_bias(4, mu=0), 0)

    def test_statistical_mse_against_independent_moment_oracle(self):
        m, n = 16, 3000
        obs = lab.experiment(m, n, seed=271828)
        for name in ("euler", "milstein"):
            theory = lab.exact_terminal_mse(m, name)
            self.assertLess(abs(obs[name+"_mse"] - theory),
                            6 * obs[name+"_mse_se"])
            self.assertLess(abs(obs[name+"_mean_difference"] -
                                lab.weak_mean_bias(m)),
                            6 * obs[name+"_mean_se"])

    def test_invalid_parameters(self):
        for args in ([], [float("nan")], [0.1, float("inf")]):
            with self.assertRaises(ValueError):
                lab.path_values(args)
        with self.assertRaises(ValueError):
            lab.path_values([0.0], s0=0)
        with self.assertRaises(ValueError):
            lab.path_values([0.0], sigma=-1)
        with self.assertRaises(ValueError):
            lab.experiment(0, 20)
        with self.assertRaises(ValueError):
            lab.experiment(2, 1)
        with self.assertRaises(ValueError):
            lab.exact_terminal_mse(1, "unknown")
        with self.assertRaises(ValueError):
            lab.mean_and_se([1.0])


if __name__ == "__main__":
    unittest.main()
