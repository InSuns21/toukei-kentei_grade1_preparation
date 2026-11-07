"""Regression tests for MFL13's deterministic continuous-integral examples."""

import math
import unittest

from kernel_bias_lab import circle_integral


class KernelBiasLabTests(unittest.TestCase):
    def test_gaussian_constant_intrinsic(self):
        radius = 2.0
        mass = circle_integral(0.04, radius)[1] * 2 * math.pi * radius
        self.assertAlmostEqual(mass, 1.0, delta=1e-10)

    def test_chord_bias_coefficient(self):
        radius = 2.0
        def slope(epsilon):
            mass = circle_integral(epsilon, radius, chord=True)[1] * 2 * math.pi * radius
            return (mass - 1.0) / epsilon
        self.assertLess(abs(slope(0.02) - 1 / (4 * radius**2)), 0.002)
        self.assertLess(
            abs(slope(0.02) - 1 / (4 * radius**2)),
            abs(slope(0.08) - 1 / (4 * radius**2)),
        )

    def test_density_drift(self):
        radius, a, epsilon = 2.0, 0.3, 0.02
        numerator, denominator = circle_integral(
            epsilon, radius, amplitude=a, target_angle=math.pi / 2,
            observable="cos"
        )
        self.assertGreater(denominator, 0)
        self.assertLess(abs(numerator / denominator / epsilon - 2*a/radius**2), 0.003)

    def test_invalid_parameters(self):
        with self.assertRaises(ValueError):
            circle_integral(0.0)
        with self.assertRaises(ValueError):
            circle_integral(0.1, amplitude=1)
        with self.assertRaises(ValueError):
            circle_integral(0.1, observable="sin")


if __name__ == "__main__":
    unittest.main()
