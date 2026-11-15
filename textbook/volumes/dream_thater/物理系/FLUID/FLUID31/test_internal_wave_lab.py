#!/usr/bin/env python3
"""Run: python textbook/volumes/dream_thater/物理系/FLUID/FLUID31/test_internal_wave_lab.py"""
import math
import unittest
from internal_wave_lab import wave_state


class InternalWaveTests(unittest.TestCase):
    def test_reference_frequency_and_transport(self):
        result, fields = wave_state()
        state = result["state"]
        self.assertAlmostEqual(state["omega_rad_s"], 0.012, places=12)
        self.assertAlmostEqual(state["period_s"], 2 * math.pi / 0.012, places=9)
        self.assertAlmostEqual(state["group_velocity_m_s"][0], 2.56, places=11)
        self.assertAlmostEqual(state["group_velocity_m_s"][1], -1.92, places=11)
        self.assertLess(abs(state["k_dot_cg_s-1"]), 1e-14)
        self.assertAlmostEqual(state["relative_background_density_difference_over_500m"],
                               0.0004 * 500 / 9.8)
        self.assertAlmostEqual(fields(0, 0)["w_m_s"], 0.001)

    def test_linear_equation_residuals_and_phase(self):
        for n in (0.01, 0.02, 0.04):
            for m in (-0.01, -0.004, 0.0, 0.004, 0.01):
                data, fields = wave_state(n=n, m=m, time=25.0)
                for residual in data["checks"]["maximum_absolute_linear_PDE_residuals"].values():
                    self.assertLess(residual, 2e-15)
                omega = data["state"]["omega_rad_s"]
                for x, z in ((0, 0), (100, 20), (-450, -200)):
                    v = fields(x, z)
                    self.assertAlmostEqual(v["b_m_s2"], -n*n*v["xi_m"], places=12)
                    self.assertTrue(math.isfinite(v["pi_m2_s2"]))
                self.assertGreater(omega, 0)

    def test_reverse_vertical_wavenumber(self):
        pos, _ = wave_state(m=0.004)
        neg, _ = wave_state(m=-0.004)
        self.assertEqual(pos["state"]["omega_rad_s"], neg["state"]["omega_rad_s"])
        self.assertAlmostEqual(pos["state"]["group_velocity_m_s"][1],
                               -neg["state"]["group_velocity_m_s"][1])

    def test_invalid_inputs(self):
        for kwargs in ({"n": 0}, {"n": -0.01}, {"k": 0},
                       {"amplitude": 0}, {"m": float("nan")}):
            with self.assertRaises(ValueError):
                wave_state(**kwargs)

    def test_plots(self):
        result, _ = wave_state()
        self.assertEqual(len(result["plots"]), 2)
        self.assertEqual(len(result["plots"][0]["series"][0]["points"]), 101)


if __name__ == "__main__":
    unittest.main()
