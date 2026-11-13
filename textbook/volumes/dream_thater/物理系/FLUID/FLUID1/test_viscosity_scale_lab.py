"""Regression checks for FLUID1 dimensional calculations."""
import math
import unittest

from viscosity_scale_lab import calculate


class FluidScaleTests(unittest.TestCase):
    def test_gas_centimeter(self):
        r = calculate("gas", 7e-8, 1e-2, 1.2, 1.8e-5, 0.02)
        self.assertAlmostEqual(r["knudsen_number"], 7e-6)
        self.assertAlmostEqual(r["micro_ratio"], 7e-6)
        self.assertAlmostEqual(r["kinematic_viscosity_m2_s"], 1.5e-5)
        self.assertAlmostEqual(r["reynolds_number"], 40 / 3)
        self.assertAlmostEqual(r["viscous_time_s"], 20 / 3)
        self.assertTrue(r["has_geometric_window"])

    def test_gas_microchannel(self):
        r = calculate("gas", 7e-8, 1e-6, 1.2, 1.8e-5, 0.02)
        self.assertAlmostEqual(r["knudsen_number"], 0.07)
        self.assertAlmostEqual(r["reynolds_number"], 1 / 750)
        self.assertAlmostEqual(r["viscous_time_s"], 1 / 15_000_000)

    def test_liquid_does_not_claim_knudsen_number(self):
        r = calculate("liquid", 1e-9, 1e-3, 1000, 1e-3, 0.02)
        self.assertIsNone(r["knudsen_number"])
        self.assertEqual(r["micro_length_type"], "correlation_scale")
        self.assertAlmostEqual(r["kinematic_viscosity_m2_s"], 1e-6)
        self.assertAlmostEqual(r["reynolds_number"], 20)
        self.assertAlmostEqual(r["viscous_time_s"], 1.0)

    def test_no_window_when_micro_exceeds_macro(self):
        r = calculate("gas", 0.002, 0.001, 1.2, 1.8e-5, 0.02)
        self.assertFalse(r["has_geometric_window"])
        self.assertIsNone(r["geometric_mean_m"])

    def test_bad_inputs(self):
        for arg in (0.0, -0.1, math.nan, math.inf):
            with self.subTest(value=arg):
                with self.assertRaises(ValueError):
                    calculate("gas", arg, 1e-3, 1.2, 1.8e-5, 0.02)
        with self.assertRaises(ValueError):
            calculate("plasma", 1e-8, 1e-3, 1.2, 1.8e-5, 0.02)


if __name__ == "__main__":
    unittest.main()
