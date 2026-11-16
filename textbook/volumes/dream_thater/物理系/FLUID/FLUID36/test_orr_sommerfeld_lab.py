"""Reproducible checks for FLUID36 Galerkin laboratory."""
import math
import unittest
import numpy as np
from numpy.polynomial import Chebyshev
from orr_sommerfeld_lab import basis_matrices, experiment, solve


class OrrSommerfeldLabTests(unittest.TestCase):
    def test_poiseuille_growth_and_order_dependence(self):
        x = experiment('poiseuille', 10000, 1, 28)
        samples = x['convergence']
        self.assertEqual([v['n'] for v in samples], [20, 24, 28, 32])
        expected = (0.00153083, 0.00370795, 0.00381438, 0.00374981)
        for result, target in zip(samples, expected):
            self.assertAlmostEqual(result['growth_sigma'], target, delta=2e-5)
            self.assertLess(result['generalized_relative_residual'], 1e-10)
        self.assertGreater(samples[2]['growth_sigma'], 0)
        self.assertGreater(abs(samples[0]['growth_sigma']-samples[2]['growth_sigma']), 0.002)
        self.assertLess(abs(samples[2]['growth_sigma']-samples[3]['growth_sigma']), 0.00015)
        self.assertTrue(x['checks']['finite_order_not_proof'])
        self.assertEqual(len(x['plots']), 2)

    def test_couette_and_walls(self):
        x = experiment('couette', 10000, 1, 28)
        self.assertLess(x['leading']['growth_sigma'], 0)
        self.assertLess(x['checks']['algebraic_residual_max'], 1e-10)
        factor = Chebyshev([0.5, 0, -0.5])**2
        for degree in range(5):
            b = factor * Chebyshev.basis(degree)
            for y in (-1, 1):
                self.assertAlmostEqual(b(y), 0, places=12)
                self.assertAlmostEqual(b.deriv()(y), 0, places=12)

    def test_negative_definite_mass_and_integral(self):
        a, b = basis_matrices('poiseuille', 10000, 1, 12)
        self.assertTrue(np.allclose(b, b.T))
        self.assertTrue(np.all(np.linalg.eigvalsh(b) < 0))
        self.assertAlmostEqual(b[0, 0], -1024/315, places=10)
        self.assertTrue(np.all(np.isfinite(a.real)))
        self.assertTrue(np.all(np.isfinite(a.imag)))

    def test_input_validation(self):
        for params in [dict(profile='other'), dict(reynolds=0),
                       dict(alpha=0), dict(n=6), dict(n=37),
                       dict(reynolds=math.nan)]:
            with self.assertRaises(ValueError):
                solve(**params)


if __name__ == '__main__':
    unittest.main()
