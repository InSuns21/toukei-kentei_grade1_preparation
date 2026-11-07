"""Recalculated small cases for MFL10."""

import unittest

from lle_lab import jacobi_eigen, lle_matrix, report, ridge_weights


class LLELabTest(unittest.TestCase):
    def test_singular_centered_and_translation(self):
        points = [[-1.0], [0.0], [1.0]]
        a, _ = ridge_weights(points, k=2, gamma=0.1)
        b, _ = ridge_weights([[p[0] + 10] for p in points], k=2, gamma=0.1)
        for row_a, row_b in zip(a, b):
            for x, y in zip(row_a, row_b):
                self.assertAlmostEqual(x, y)
        self.assertAlmostEqual(a[1][0], 0.5)
        self.assertAlmostEqual(a[1][2], 0.5)

    def test_scale_aware_weights(self):
        points = [[-1.0], [0.0], [1.0], [2.0]]
        a, lam = ridge_weights(points, gamma=0.1)
        b, scaled_lam = ridge_weights([[3 * p[0]] for p in points], gamma=0.1)
        for row_a, row_b in zip(a, b):
            for x, y in zip(row_a, row_b):
                self.assertAlmostEqual(x, y)
        for x, y in zip(lam, scaled_lam):
            self.assertAlmostEqual(9 * x, y)

    def test_signed_two_zero_eigenvalues(self):
        result = report("signed")
        self.assertEqual(result["numerical_zero_eigenvalue_count"], 2)
        self.assertAlmostEqual(result["eigenvalues"][2], 13.5)
        self.assertAlmostEqual(result["embedding_1d_energy"], 0)
        self.assertAlmostEqual(sum(result["embedding_1d"]), 0)
        self.assertAlmostEqual(sum(x * x for x in result["embedding_1d"]), 3)
        for x in result["input_reconstruction_squared_residuals"]:
            self.assertAlmostEqual(x, 0.0)

    def test_coincident_fallback(self):
        result = report("coincident")
        self.assertTrue(all(x == 1.0 for x in result["ridge_lambdas"]))
        for row in result["weights"]:
            self.assertAlmostEqual(sum(row), 1)
            self.assertEqual(sum(abs(x) > 1e-10 for x in row), 2)
        self.assertAlmostEqual(result["embedding_1d_energy"], result["spectral_minimum_1d"])

    def test_three_point_path_eigenvalues(self):
        w = [[0, 1, 0], [0.5, 0, 0.5], [0, 1, 0]]
        m = lle_matrix(w)
        self.assertEqual(m, [[1.25, -1.5, 0.25], [-1.5, 3, -1.5], [0.25, -1.5, 1.25]])
        for actual, expected in zip(jacobi_eigen(m), [0, 1, 4.5]):
            self.assertAlmostEqual(actual, expected)

    def test_disconnected_pairs(self):
        w = [[0, 1, 0, 0], [1, 0, 0, 0], [0, 0, 0, 1], [0, 0, 1, 0]]
        for actual, expected in zip(jacobi_eigen(lle_matrix(w)), [0, 0, 4, 4]):
            self.assertAlmostEqual(actual, expected)


if __name__ == "__main__":
    unittest.main()
