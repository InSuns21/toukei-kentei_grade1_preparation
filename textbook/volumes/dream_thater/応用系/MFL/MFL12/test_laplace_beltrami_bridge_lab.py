"""Regression tests for the deterministic circle Laplace--Beltrami bridge."""

import importlib.util
import math
import pathlib
import unittest


MODULE_PATH = pathlib.Path(__file__).with_name("laplace_beltrami_bridge_lab.py")
SPEC = importlib.util.spec_from_file_location("mfl12_bridge", MODULE_PATH)
MODULE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(MODULE)


class CircleBridgeTests(unittest.TestCase):
    def test_mass_stiffness_vs_eigenvalue(self):
        result = MODULE.compare_circle(20, 2.0, 3)
        self.assertAlmostEqual(
            result["rayleigh_quotient"], result["scaled_eigenvalue"], places=12
        )
        self.assertAlmostEqual(
            result["scaled_eigenvalue"],
            2 * result["degree_normalized_eigenvalue"] / result["arc_step"] ** 2,
            places=12,
        )
        self.assertLess(result["eigen_residual_max"], 1e-12)

    def test_continuum_limit_and_taylor_bound(self):
        coarse = MODULE.compare_circle(20, 1.3, 2)
        fine = MODULE.compare_circle(80, 1.3, 2)
        self.assertLess(fine["scaled_eigenvalue_error"], coarse["scaled_eigenvalue_error"] / 10)
        self.assertLessEqual(
            fine["pointwise_error_max"], fine["taylor_error_bound"] + 1e-12
        )
        self.assertLess(
            fine["scaled_eigenvalue"], fine["continuum_eigenvalue"]
        )

    def test_radius_scaling(self):
        small = MODULE.compare_circle(32, 1.0, 2)
        large = MODULE.compare_circle(32, 2.0, 2)
        self.assertAlmostEqual(
            small["scaled_eigenvalue"] / large["scaled_eigenvalue"], 4.0
        )
        self.assertTrue(math.isclose(
            small["degree_normalized_eigenvalue"],
            large["degree_normalized_eigenvalue"],
        ))

    def test_invalid_parameters(self):
        for args in [(2, 1.0, 1), (8, -1.0, 1), (8, float("inf"), 1), (8, 1.0, 4)]:
            with self.subTest(args=args), self.assertRaises(ValueError):
                MODULE.compare_circle(*args)


if __name__ == "__main__":
    unittest.main()
