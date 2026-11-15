#!/usr/bin/env python3
"""Regression tests for FLUID29's independent wet-cell shallow-water lab."""
import importlib.util
from pathlib import Path
import unittest


SOURCE = Path(__file__).with_name("shallow_water_lab.py")
SPEC = importlib.util.spec_from_file_location("shallow_water_lab", SOURCE)
LAB = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(LAB)


class TestShallowWaterLab(unittest.TestCase):
    def test_lake_at_rest_over_bump(self):
        for n in (80, 160, 320):
            with self.subTest(cells=n):
                result = LAB.simulate(mode="lake", cells=n,
                                      surface=1, bump=0.25, final_time=0.5)
                check = result["checks"]
                self.assertLess(check["relative_mass_error"], 2e-12)
                self.assertLess(check["lake_surface_max_error_m"], 2e-11)
                self.assertLess(check["max_velocity_m_per_s"], 2e-11)
                self.assertGreater(check["minimum_depth_seen_m"], 0.74)

    def test_dam_positive_and_conservative(self):
        for n in (80, 160, 320):
            with self.subTest(cells=n):
                r = LAB.simulate(mode="dam", cells=n, left=2, right=1,
                                 final_time=0.5)
                c = r["checks"]
                self.assertLess(c["relative_mass_error"], 2e-12)
                self.assertGreater(c["minimum_depth_seen_m"], 0.7)
                self.assertLessEqual(c["max_courant"], 0.350000001)
                self.assertGreater(c["max_velocity_m_per_s"], 0.2)
                # Diffusive first-order flux should not increase total E.
                self.assertLessEqual(c["final_mechanical_energy_m4_per_s2"],
                                     c["initial_mechanical_energy_m4_per_s2"] + 1e-9)

    def test_small_amplitude_linear_reference(self):
        r = LAB.simulate(mode="dam", cells=240, left=1.02, right=0.98,
                         final_time=0.5)
        reference = r["linear_reference"]
        self.assertAlmostEqual(reference["height_mean_m"], 1.0)
        self.assertAlmostEqual(reference["initial_half_step_m"], 0.02)
        self.assertLess(abs(reference["computed_central_velocity_m_per_s"] -
                            reference["linear_central_velocity_m_per_s"]), 0.005)

    def test_hydrostatic_reconstruction_balances_pressure(self):
        fl, fr = LAB.interface_flux((1.0, 0, 0), (0.8, 0, 0.2), 9.8)
        self.assertAlmostEqual(fl[0], 0.0)
        self.assertAlmostEqual(fr[0], 0.0)
        self.assertAlmostEqual(fl[1], 4.9)
        self.assertAlmostEqual(fr[1], 3.136)

    def test_reject_invalid_parameters_and_dry_state(self):
        with self.assertRaises(ValueError):
            LAB.simulate(mode="lake", surface=0.25, bump=0.25)
        with self.assertRaises(ValueError):
            LAB.simulate(mode="dam", cells=12)
        with self.assertRaises(ArithmeticError):
            LAB.interface_flux((0, 0, 0), (1, 0, 0), 9.8)


if __name__ == "__main__":
    unittest.main()
