"""Deterministic identities, input contracts and stochastic tolerance checks."""
from __future__ import annotations

import math
import pathlib
import sys
import unittest

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1]))
import ito_integral_diagnostics as lab  # noqa: E402


class ItoDiagnosticsTest(unittest.TestCase):
    def test_two_step_algebra_and_endpoint_midpoint(self) -> None:
        halves = [(0.2, 0.1), (-0.4, 0.05)]
        s = lab.path_sums(halves, 1.0)
        self.assertAlmostEqual(s["left_error"], -(s["qv"] - 1) / 2)
        self.assertAlmostEqual(s["mid_endpoint"], s["stratonovich"])
        self.assertAlmostEqual(s["time_mid_error"], s["half_square_diff"])
        self.assertAlmostEqual(s["time_mid_ito_error"],
                               0.5 + s["half_square_diff"])

    def test_theoretical_mse_and_refinement(self) -> None:
        self.assertEqual(lab.theory(2, 2.0), (1.0, 0.5))
        for m in (4, 16, 64):
            self.assertAlmostEqual(lab.theory(4 * m)[0],
                                   lab.theory(m)[0] / 4)
            self.assertAlmostEqual(lab.theory(4 * m)[1],
                                   lab.theory(m)[1] / 4)

    def test_input_guards(self) -> None:
        for bad in (0, -1):
            with self.assertRaises(ValueError):
                lab.theory(bad)
        with self.assertRaises(ValueError):
            lab.theory(4, 0.0)
        with self.assertRaises(ValueError):
            lab.diagnose(4, 1, 42)
        with self.assertRaises(ValueError):
            lab.moments([1.0])

    def test_sample_mse_vs_theory_with_statistical_tolerance(self) -> None:
        n, m = 1024, 16
        obs = lab.diagnose(m, n, 314159)
        left_theory, mid_theory = lab.theory(m)
        self.assertLess(abs(obs["left_mse"] - left_theory),
                        6 * obs["left_mse_se"])
        self.assertLess(abs(obs["mid_mse"] - mid_theory),
                        6 * obs["mid_mse_se"])
        self.assertLess(abs(obs["time_mid_ito_mean_error"] - 0.5),
                        6 * obs["time_mid_ito_mean_se"])
        self.assertLess(obs["roundoff_identity_max"], 1e-12)
        self.assertLess(obs["roundoff_endpoint_max"], 1e-12)

    def test_constant_integrand_has_no_ito_stratonovich_shift(self) -> None:
        halves = [(0.3, -0.1), (0.25, 0.15), (-0.1, 0.05)]
        increments = [a + b for a, b in halves]
        c = -2.0
        left = sum(c * d for d in increments)
        symmetric = sum((c + c) * d / 2 for d in increments)
        self.assertAlmostEqual(left, c * sum(increments))
        self.assertAlmostEqual(symmetric, left)


if __name__ == "__main__":
    unittest.main()
