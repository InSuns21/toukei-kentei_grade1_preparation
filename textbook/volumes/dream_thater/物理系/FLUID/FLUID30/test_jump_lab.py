#!/usr/bin/env python3
"""Regression checks for FLUID30 analytical jump identities.

Run:
python -m unittest textbook/volumes/dream_thater/物理系/FLUID/FLUID30/test_jump_lab.py
"""
import unittest
from jump_lab import jump_state, plot_data


class JumpLabTests(unittest.TestCase):
    def test_upstream_froude_two(self):
        d = jump_state(1.0, 2.0, 0.0, 9.8)
        self.assertAlmostEqual(d["states"]["conjugate_depth_ratio"], (33 ** 0.5 - 1) / 2)
        self.assertAlmostEqual(d["checks"]["head_loss_m"], 0.27233488537882894, places=11)
        self.assertTrue(d["checks"]["entropy_inequality_holds"])
        for residual in d["checks"]["relative_residuals"].values():
            self.assertLess(residual, 2e-11)

    def test_velocity_shift_invariance(self):
        stationary = jump_state(1.0, 2.0, 0.0, 9.8)
        moving = jump_state(1.0, 2.0, 1.0, 9.8)
        a = stationary["checks"]
        b = moving["checks"]
        self.assertAlmostEqual(a["head_loss_m"], b["head_loss_m"], places=12)
        self.assertAlmostEqual(a["energy_dissipation_per_density_m4_per_s3"],
                               b["energy_dissipation_per_density_m4_per_s3"],
                               places=10)
        self.assertAlmostEqual(moving["states"]["upstream"]["laboratory_velocity_m_per_s"]
                               - stationary["states"]["upstream"]["laboratory_velocity_m_per_s"], 1.0)

    def test_parameter_range(self):
        for fr in (1.0001, 1.1, 1.5, 2.0, 3.0, 5.0):
            for speed in (-10.0, 0.0, 10.0):
                state = jump_state(2.0, fr, speed, 9.8)
                self.assertLess(state["checks"]["energy_jump_G_minus_sE_m4_per_s3"], 0)
                self.assertLess(state["states"]["downstream"]["relative_froude"], 1)

    def test_bad_inputs(self):
        for params in ((0, 2, 0, 9.8), (1, 0.9, 0, 9.8),
                       (1, 2, 0, 0), (1, 2, float("nan"), 9.8)):
            with self.assertRaises(ValueError):
                jump_state(*params)

    def test_plot_data(self):
        plots = plot_data(1, 9.8)
        self.assertEqual(len(plots), 2)
        self.assertEqual(len(plots[0]["series"][0]["points"]), 91)
        self.assertGreater(plots[0]["series"][0]["points"][0][1], 1)


if __name__ == "__main__":
    unittest.main()
