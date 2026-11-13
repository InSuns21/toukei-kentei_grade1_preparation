"""Run with: python -m unittest discover -s assets/tests -v (from U3-12)."""

import itertools
import math
import pathlib
import sys
import unittest

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1]))
from brownian_limit import crr_moments, sample_endpoints  # noqa: E402


class BrownianLimitTests(unittest.TestCase):
    def test_four_step_exact_moments(self):
        m = crr_moments(1.0, 4, 0.0, 0.2)
        self.assertAlmostEqual(m.q_up, 0.47502081252106, places=13)
        self.assertAlmostEqual(m.exact_mean, -0.019983349983152012, places=12)
        self.assertAlmostEqual(m.exact_variance, 0.03990016643086272, places=12)

    def test_independent_path_enumeration(self):
        m = crr_moments(1.0, 4, 0.0, 0.2)
        outcomes = []
        for bits in itertools.product((0, 1), repeat=4):
            up = sum(bits)
            prob = (m.q_up ** up) * ((1 - m.q_up) ** (4 - up))
            x = 0.1 * (2 * up - 4)
            outcomes.append((prob, x))
        total = sum(p for p, _ in outcomes)
        mean = sum(p * x for p, x in outcomes)
        variance = sum(p * (x - mean) ** 2 for p, x in outcomes)
        self.assertAlmostEqual(total, 1.0)
        self.assertAlmostEqual(mean, m.exact_mean)
        self.assertAlmostEqual(variance, m.exact_variance)

    def test_probability_boundary(self):
        with self.assertRaises(ValueError):
            crr_moments(1.0, 6, 0.5, 0.2)
        m = crr_moments(1.0, 7, 0.5, 0.2)
        self.assertGreater(m.q_up, 0.0)
        self.assertLess(m.q_up, 1.0)

    def test_moment_convergence(self):
        errors = []
        for n in (4, 16, 64):
            m = crr_moments(1.0, n, 0.0, 0.2)
            errors.append(abs(m.exact_mean - m.limit_mean))
            self.assertLess(abs(m.exact_variance - m.limit_variance), 0.0002)
        self.assertGreater(errors[0], errors[1])
        self.assertGreater(errors[1], errors[2])

    def test_seeded_sampling(self):
        m = crr_moments(1.0, 4, 0.0, 0.2)
        empirical_mean, empirical_variance = sample_endpoints(
            1.0, 4, 0.0, 0.2, paths=20000, seed=20261113
        )
        # 6 standard errors: diagnostic, not a mathematical proof.
        self.assertLess(abs(empirical_mean - m.exact_mean),
                        6 * math.sqrt(m.exact_variance / 20000))
        self.assertLess(abs(empirical_variance - m.exact_variance),
                        6 * m.exact_variance * math.sqrt(2 / 19999))


if __name__ == "__main__":
    unittest.main()
