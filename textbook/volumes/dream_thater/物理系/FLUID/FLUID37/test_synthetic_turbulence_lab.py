#!/usr/bin/env python3
"""Finite Fourier/Parseval regression checks for the FLUID37 synthetic lab."""
import unittest
from synthetic_turbulence_lab import experiment


class TurbulenceSyntheticTests(unittest.TestCase):
    def test_parseval_correlation_for_multiple_presets(self):
        for modes, seed in ((1, 37), (3, 37), (6, 37), (12, 137)):
            with self.subTest(modes=modes, seed=seed):
                result = experiment(modes, seed)
                checks = result["checks"]
                self.assertLess(checks["parseval_abs_error"], 1e-10)
                self.assertLess(checks["correlation_max_abs_error"], 1e-10)
                self.assertLess(checks["mean_abs_error"], 1e-10)
                self.assertTrue(checks["spectrum_nonnegative"])
                self.assertTrue(checks["not_DNS_or_ergodicity_test"])

    def test_one_mode_variance(self):
        result = experiment(1, 37)
        stats = result["statistics"]
        self.assertAlmostEqual(stats["variance_spatial_m2_per_s2"], 0.5, places=12)
        self.assertAlmostEqual(stats["variance_one_sided_spectrum_m2_per_s2"], 0.5, places=12)
        self.assertAlmostEqual(stats["fluctuation_energy_per_mass_m2_per_s2"], 0.25, places=12)

    def test_invalid_inputs(self):
        with self.assertRaises(ValueError):
            experiment(0, 37)
        with self.assertRaises(ValueError):
            experiment(13, 37)
        with self.assertRaises(ValueError):
            experiment(6, -1)


if __name__ == "__main__":
    unittest.main()
