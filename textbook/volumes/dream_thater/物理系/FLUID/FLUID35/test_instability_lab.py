#!/usr/bin/env python3
"""Run: python textbook/volumes/dream_thater/物理系/FLUID/FLUID35/test_instability_lab.py"""
import math
import unittest
from instability_lab import benard_state, rt_state


class FLUID35LabTests(unittest.TestCase):
    def test_rt_growth_cutoff_and_maximum(self):
        x = rt_state()
        self.assertEqual(x["state"]["status"], "growing")
        rho1, rho2, g, sigma = 1050., 1000., 9.81, .072
        kc = math.sqrt((rho1-rho2)*g/sigma)
        self.assertAlmostEqual(x["state"]["cutoff_k_m-1"], kc)
        self.assertAlmostEqual(x["state"]["fastest_k_m-1"], kc/math.sqrt(3))
        self.assertLess(x["checks"]["dispersion_residual_scaled"], 1e-12)
        stable = rt_state(k=150)
        self.assertEqual(stable["state"]["status"], "oscillatory")
        no_tension = rt_state(sigma=0, k=100, amplitude=1e-6, time=0.01)
        self.assertEqual(no_tension["state"]["status"], "growing")
        self.assertIsNone(no_tension["state"]["fastest_k_m-1"])
        normal = rt_state(rho1=1000, rho2=1050)
        self.assertEqual(normal["state"]["status"], "oscillatory")

    def test_benard_threshold_and_eigen_equation(self):
        rc = 27*math.pi**4/4
        ac = math.pi/math.sqrt(2)
        x = benard_state(ra=rc, a=ac)
        self.assertAlmostEqual(x["state"]["lambda_plus"], 0, places=10)
        self.assertAlmostEqual(x["state"]["Ra_neutral_at_a_n"], rc)
        below = benard_state(ra=500, a=ac)
        above = benard_state(ra=800, a=ac)
        self.assertLess(below["state"]["lambda_plus"], 0)
        self.assertGreater(above["state"]["lambda_plus"], 0)
        second = benard_state(ra=800, a=ac, n=2)
        self.assertLess(second["state"]["lambda_plus"], 0)
        for case in (below, above, second):
            self.assertLess(case["checks"]["characteristic_plus_scaled"], 1e-11)
            self.assertLess(case["checks"]["characteristic_minus_scaled"], 1e-11)
            self.assertLess(case["checks"]["determinant_residual_scaled"], 1e-10)

    def test_viscosity_diffusivity_and_validation(self):
        ac = math.pi/math.sqrt(2)
        self.assertAlmostEqual(benard_state(ra=700, pr=1, a=ac)
                               ["state"]["Ra_neutral_at_a_n"],
                               benard_state(ra=700, pr=10, a=ac)
                               ["state"]["Ra_neutral_at_a_n"])
        x = benard_state()
        self.assertEqual(len(x["plots"]), 2)
        self.assertEqual(len(rt_state()["plots"]), 2)
        for v in (x, rt_state()):
            for chart in v["plots"]:
                for series in chart["series"]:
                    self.assertTrue(all(math.isfinite(a) and math.isfinite(b)
                                        for a, b in series["points"]))
        for kwargs in ({"rho1": 0}, {"sigma": -1}, {"k": 0},
                       {"rho1": 1050, "rho2": 1000, "k": 200,
                        "sigma": 0, "time": 10}):
            with self.assertRaises(ValueError):
                rt_state(**kwargs)
        for kwargs in ({"pr": 0}, {"ra": -1}, {"a": 0}, {"n": 0},
                       {"ra": float("nan")}):
            with self.assertRaises(ValueError):
                benard_state(**kwargs)


if __name__ == "__main__":
    unittest.main()
