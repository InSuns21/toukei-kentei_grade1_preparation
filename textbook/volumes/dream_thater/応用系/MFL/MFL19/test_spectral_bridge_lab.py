"""Deterministic unit tests for the MFL19 laboratory."""

from __future__ import annotations

import importlib.util
import math
from pathlib import Path
import unittest


SCRIPT = Path(__file__).with_name("spectral_bridge_lab.py")
spec = importlib.util.spec_from_file_location("mfl19_spectral_bridge", SCRIPT)
assert spec and spec.loader
lab = importlib.util.module_from_spec(spec)
spec.loader.exec_module(lab)


class SpectralBridgeTests(unittest.TestCase):
    def test_self_test(self) -> None:
        lab.self_test()

    def test_mass_energy_identity_for_non_mode(self) -> None:
        v = [complex(j % 3 - 1, j % 4) for j in range(11)]
        h = 2 * math.pi * 2 / len(v)
        lhs = lab.linear_mass(v, 2)
        rhs = lab.mass(v, 2) - h**2 * lab.energy(v, 2) / 6
        self.assertAlmostEqual(lhs, rhs, places=11)

    def test_gap_and_interpolation(self) -> None:
        for method in ("linear", "nearest"):
            coarse = lab.projection_gap(12, 1.0, 1, method)
            fine = lab.projection_gap(96, 1.0, 1, method)
            self.assertLess(fine, coarse)
        self.assertLess(lab.perturbation_angle_sine(1.0, .1),
                        lab.perturbation_angle_sine(.01, .1))

    def test_pollution_experiment_is_explicit(self) -> None:
        r = lab.report(24, 1.0, 1, "linear", 1, .1)
        self.assertEqual(r["original_zero_multiplicity"], 1)
        self.assertEqual(r["polluted_zero_multiplicity"], 2)
        self.assertLess(r["mass_identity_residual"], 1e-12)
        self.assertAlmostEqual(r["discrete_rayleigh"], r["formula_eigenvalue"])

    def test_invalid_parameters(self) -> None:
        for args in ((3, 1., 1, 1., .1), (8, 0., 1, 1., .1),
                     (8, 1., 5, 1., .1), (8, 1., 1, 0., .1),
                     (8, 1., 1, 1., -.1)):
            with self.assertRaises(ValueError):
                lab.validate(*args)


if __name__ == "__main__":
    unittest.main()
