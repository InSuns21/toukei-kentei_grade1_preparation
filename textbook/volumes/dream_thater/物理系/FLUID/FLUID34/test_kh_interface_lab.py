#!/usr/bin/env python3
"""Run: python textbook/volumes/dream_thater/物理系/FLUID/FLUID34/test_kh_interface_lab.py"""
import math
import unittest

from kh_interface_lab import interface_state


class KHInterfaceTests(unittest.TestCase):
    def test_unstable_reference_and_residuals(self):
        result = interface_state()
        state = result["state"]
        self.assertEqual(state["status"], "unstable")
        self.assertAlmostEqual(state["radicand_s-2"], -5.122880109793157)
        self.assertAlmostEqual(state["growth_rate_s-1"], 2.2633780306862477)
        self.assertAlmostEqual(state["omega_plus_rad_s"][0], 30 * 200 / 2020)
        self.assertGreater(state["omega_plus_rad_s"][1], 0)
        self.assertLess(state["omega_minus_rad_s"][1], 0)
        self.assertAlmostEqual(state["velocity_threshold_m_s"], 0.12201085529719254)
        lo, hi = state["unstable_wavenumber_interval_m-1"]
        self.assertLess(lo, 30)
        self.assertGreater(hi, 30)
        self.assertAlmostEqual(state["time_amplification_factor"],
                               math.exp(state["growth_rate_s-1"] * 0.5))
        for key in ("max_dispersion_residual", "kinematic_upper_residual",
                    "kinematic_lower_residual", "dynamic_boundary_residual_Pa"):
            self.assertLess(result["checks"][key], 1e-8, key)

    def test_stabilization_and_equal_density_shear(self):
        self.assertEqual(interface_state(k=1)["state"]["status"], "neutral")
        self.assertEqual(interface_state(k=500)["state"]["status"], "neutral")
        still = interface_state(k=30, u1=0, u2=0)
        self.assertEqual(still["state"]["growth_rate_s-1"], 0)
        no_tension = interface_state(k=500, sigma=0, amplitude=1e-5, time=0.05)
        self.assertGreater(no_tension["state"]["growth_rate_s-1"], 0)
        sheet = interface_state(rho1=1, rho2=1, g=9.81, sigma=0,
                                u1=2, u2=0, k=3, amplitude=1e-4, time=0.2)
        self.assertAlmostEqual(sheet["state"]["growth_rate_s-1"], 3.0)

    def test_galilean_invariance_and_density_inversion(self):
        orig = interface_state(u1=0.2, u2=0.0)
        shifted = interface_state(u1=1.2, u2=1.0)
        self.assertAlmostEqual(orig["state"]["growth_rate_s-1"],
                               shifted["state"]["growth_rate_s-1"])
        self.assertAlmostEqual(shifted["state"]["omega_plus_rad_s"][0] -
                               orig["state"]["omega_plus_rad_s"][0], 30)
        inverted = interface_state(rho1=1020, rho2=1000, sigma=0,
                                   u1=0, u2=0, k=5)
        self.assertGreater(inverted["state"]["growth_rate_s-1"], 0)

    def test_chart_data_and_rejected_inputs(self):
        result = interface_state()
        self.assertEqual(len(result["plots"]), 2)
        for graph in result["plots"]:
            self.assertEqual(len(graph["series"][0]["points"]), 121)
            for line in graph["series"]:
                self.assertEqual(len(line["points"]), 121)
                self.assertTrue(all(math.isfinite(x) and math.isfinite(y)
                                    for x, y in line["points"]))
        for params in ({"rho1": 0}, {"rho2": 0}, {"sigma": -1},
                       {"k": 0}, {"amplitude": -1}, {"time": -1},
                       {"g": float("nan")},
                       {"rho1": 1, "rho2": 1, "sigma": 0,
                        "u1": 5, "u2": -5, "k": 100, "time": 2}):
            with self.assertRaises(ValueError):
                interface_state(**params)


if __name__ == "__main__":
    unittest.main()
