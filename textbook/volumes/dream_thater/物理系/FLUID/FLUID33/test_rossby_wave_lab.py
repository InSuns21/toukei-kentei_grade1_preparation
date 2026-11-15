#!/usr/bin/env python3
"""Run: python textbook/volumes/dream_thater/物理系/FLUID/FLUID33/test_rossby_wave_lab.py"""
import math
import unittest

from rossby_wave_lab import wave_state


class RossbyWaveTests(unittest.TestCase):
    def test_reference_dispersion_group_and_scale(self):
        r, fields = wave_state()
        s = r["state"]
        self.assertAlmostEqual(s["deformation_radius_m"], 1e6)
        self.assertAlmostEqual(s["D_m-2"], 6e-12, places=22)
        self.assertAlmostEqual(s["omega_rad_s"], -5.333333333333333e-6, places=15)
        self.assertAlmostEqual(s["zonal_phase_speed_m_s"], -8 / 3)
        self.assertAlmostEqual(s["group_velocity_m_s"][0], 8 / 9)
        self.assertAlmostEqual(s["group_velocity_m_s"][1], 16 / 9)
        self.assertAlmostEqual(s["max_eta_over_H"], 1e-4)
        self.assertAlmostEqual(s["rossby_number_estimate"], 5e-4)
        self.assertEqual(s["phase_zonal_direction"], "west")
        self.assertEqual(s["group_zonal_direction"], "east")
        self.assertAlmostEqual(fields(0, 0)["psi_m2_s"], 10000)

    def test_residuals_and_hemispheres(self):
        for f in (-1e-4, 1e-4):
            for ell in (-1e-6, 0.0, 1e-6):
                for k in (-2e-6, 0.0, 2e-6):
                    if k == ell == 0:
                        continue
                    result, fields = wave_state(f0=f, k=k, ell=ell, time=12000)
                    s = result["state"]
                    self.assertLess(abs(result["checks"]["frequency_dispersion_residual_s-1"]),
                                    1e-25)
                    self.assertLess(result["checks"]["max_abs_qg_residual_s-2"], 1e-14)
                    self.assertLess(result["checks"]["max_abs_geostrophic_residual_m_s-2"],
                                    1e-14)
                    for x, y in ((0, 0), (5e5, -8e5)):
                        v = fields(x, y)
                        self.assertAlmostEqual(v["eta_m"],
                                               f / 10 * v["psi_m2_s"])
                    if k == 0:
                        self.assertEqual(s["omega_rad_s"], 0)
                        self.assertIsNone(s["zonal_phase_speed_m_s"])
                    else:
                        self.assertLess(s["zonal_phase_speed_m_s"], 0)

    def test_group_sign_reversal(self):
        east, _ = wave_state(k=2e-6, ell=1e-6)
        west, _ = wave_state(k=5e-7, ell=1e-6)
        self.assertGreater(east["state"]["group_velocity_m_s"][0], 0)
        self.assertLess(west["state"]["group_velocity_m_s"][0], 0)

    def test_plots_and_invalid_values(self):
        data, _ = wave_state()
        self.assertEqual(len(data["plots"]), 2)
        for graph in data["plots"]:
            self.assertEqual(len(graph["series"][0]["points"]), 101)
            self.assertTrue(all(math.isfinite(x) and math.isfinite(y)
                                for x, y in graph["series"][0]["points"]))
        for kw in ({"f0": 0}, {"depth": 0}, {"beta": -1e-11},
                   {"k": 0, "ell": 0}, {"amplitude": 0},
                   {"ell": float("nan")}):
            with self.assertRaises(ValueError):
                wave_state(**kw)


if __name__ == "__main__":
    unittest.main()
