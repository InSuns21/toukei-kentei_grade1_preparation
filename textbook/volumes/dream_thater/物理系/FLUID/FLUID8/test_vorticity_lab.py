"""Independent regression checks for the FLUID8 source and curl."""
import importlib.util
import math
from pathlib import Path
import unittest


FILE = Path(__file__).with_name("vorticity_lab.py")
SPEC = importlib.util.spec_from_file_location("fluid8_vorticity_lab", FILE)
MODULE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(MODULE)


class VorticityLabTest(unittest.TestCase):
    def test_exact_sign_and_magnitude(self):
        r = MODULE.check_baroclinic(2, .2, 6, 1, .1)
        self.assertAlmostEqual(r["analytical_source_z_per_s2"], 5/12)
        self.assertGreater(r["analytical_source_z_per_s2"], 0)

    def test_convergence_with_halved_step(self):
        r = MODULE.check_baroclinic(2, .2, 6, 1, .1)
        # Smooth reciprocal-linear field; central derivative is second order.
        self.assertLess(r["absolute_error_h_over_2"], r["absolute_error_h"] / 3.8)

    def test_orientation_reversal(self):
        r = MODULE.check_baroclinic(2, -.2, 6, 1, .1)
        self.assertLess(r["analytical_source_z_per_s2"], 0)
        self.assertLess(r["central_difference_curl_z_per_s2"], 0)

    def test_barotropic_limit(self):
        for a, b in ((0., 6.), (.2, 0.)):
            r = MODULE.check_baroclinic(2, a, b, 1, .1)
            self.assertAlmostEqual(r["analytical_source_z_per_s2"], 0)
            self.assertAlmostEqual(r["central_difference_curl_z_per_s2"], 0)

    def test_invalid_density_and_steps(self):
        for arguments in ((0, .2, 6, 1, .1), (2, .2, 6, 1, 0),
                          (2, -1, 6, 1, .1), (2, math.inf, 6, 1, .1)):
            with self.subTest(arguments=arguments):
                with self.assertRaises(ValueError):
                    MODULE.check_baroclinic(*arguments)


if __name__ == "__main__":
    unittest.main()
