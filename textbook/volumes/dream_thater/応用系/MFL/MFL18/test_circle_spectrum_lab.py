"""Independent regression tests for the MFL18 circle Fourier lab."""

import importlib.util
import math
from pathlib import Path
import unittest


SOURCE = Path(__file__).with_name("circle_spectrum_lab.py")
SPEC = importlib.util.spec_from_file_location("circle_spectrum_lab", SOURCE)
assert SPEC and SPEC.loader
lab = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(lab)


class CircleSpectrumTests(unittest.TestCase):
    def test_full_orthogonality(self) -> None:
        for n in (4, 5, 8):
            vectors = [lab.mode(n, 2.0, k) for k in range(n)]
            for k in range(n):
                for ell in range(n):
                    self.assertAlmostEqual(
                        abs(lab.inner(vectors[k], vectors[ell], 2.0) - (k == ell)),
                        0.0,
                        places=11,
                    )

    def test_four_point_spectrum(self) -> None:
        radius = 1.0
        h = 2 * math.pi * radius / 4
        actual = [lab.eigenvalue(4, radius, k) for k in range(4)]
        expected = [0, 2 / h**2, 4 / h**2, 2 / h**2]
        for a, b in zip(actual, expected):
            self.assertAlmostEqual(a, b)

    def test_fixed_frequency_error_is_second_order(self) -> None:
        previous = None
        for n in (24, 48, 96):
            result = lab.report(n, 2.0, 3)
            error = result["absolute_eigenvalue_error"]
            bound = result["bound_if_low_frequency"]
            assert isinstance(error, float) and isinstance(bound, float)
            self.assertLessEqual(error, bound + 1e-12)
            self.assertLess(result["sampled_eigen_residual"], 1e-10)
            if previous is not None:
                self.assertLess(error, previous / 3.9)
            previous = error

    def test_aliasing_and_nyquist(self) -> None:
        for n in (6, 10, 24):
            base = lab.mode(n, 1.0, 1)
            alias = lab.mode(n, 1.0, n + 1)
            self.assertLess(max(abs(x - y) for x, y in zip(base, alias)), 1e-12)
            k = n // 2
            ratio = lab.eigenvalue(n, 1.0, k) / (k**2)
            self.assertAlmostEqual(ratio, 4 / math.pi**2)

    def test_parameter_rejection(self) -> None:
        with self.assertRaises(ValueError):
            lab.mode(2, 1.0, 1)
        with self.assertRaises(ValueError):
            lab.mode(5, 0.0, 1)


if __name__ == "__main__":
    unittest.main()
