"""Regression checks for FLUID10 Gaussian-vortex browser/CLI lab."""
import math
import unittest

from gaussian_vortex_lab import evaluate


class GaussianVortexLabTest(unittest.TestCase):
    def test_initial_values_and_growth(self):
        at_zero = evaluate(t=0)
        at_one = evaluate(t=1)
        self.assertAlmostEqual(at_zero["center_vorticity_per_s"], 2.0)
        self.assertAlmostEqual(at_one["center_vorticity_per_s"], 1.0)
        self.assertAlmostEqual(at_one["width_m"], math.sqrt(2))
        self.assertAlmostEqual(at_one["sample_tangential_speed_m_per_s"],
                               1 - math.exp(-0.5))

    def test_laplacian_second_order(self):
        result = evaluate(r=1.0, t=1, h=0.1)
        # Cartesian five-point Laplacian should have O(h^2) error.
        self.assertGreater(result["residual_h_per_s2"],
                           3.0 * result["residual_h_over_2_per_s2"])
        self.assertLess(result["residual_h_per_s2"], 0.001)

    def test_integral_trapezoid_convergence(self):
        coarse = evaluate(n=200)
        fine = evaluate(n=400)
        self.assertLess(fine["disk_quadrature_error_m2_per_s"],
                        0.26 * coarse["disk_quadrature_error_m2_per_s"])
        self.assertAlmostEqual(fine["total_circulation_m2_per_s"], 2*math.pi)
        self.assertGreaterEqual(fine["excluded_tail_exact_m2_per_s"], 0.0)

    def test_sign_and_center(self):
        minus = evaluate(gamma=-2*math.pi, r=0.0)
        self.assertAlmostEqual(minus["center_vorticity_per_s"], -1.0)
        self.assertAlmostEqual(minus["sample_tangential_speed_m_per_s"], 0.0)
        self.assertAlmostEqual(minus["total_circulation_m2_per_s"], -2*math.pi)

    def test_reject_invalid_parameters(self):
        for bad in ({"a0": 0}, {"nu": 0}, {"t": -1},
                    {"h": 0}, {"n": 3}, {"r": -1}, {"gamma": float("nan")}):
            with self.subTest(bad=bad):
                with self.assertRaises(ValueError):
                    evaluate(**bad)


if __name__ == "__main__":
    unittest.main()
