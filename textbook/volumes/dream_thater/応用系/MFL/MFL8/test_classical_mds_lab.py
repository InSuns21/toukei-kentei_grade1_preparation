#!/usr/bin/env python3
"""Exact small cases and numerical invariants for MFL8."""

from __future__ import annotations

import math
import unittest

from classical_mds_lab import classical_mds, examples, jacobi_eigensystem


class ClassicalMDSTests(unittest.TestCase):
    def test_euclidean_triangle_full_rank(self) -> None:
        result = classical_mds(examples()["triangle"], 2)
        self.assertTrue(result["numerically_euclidean"])
        self.assertEqual(result["negative_eigenvalues"], [])
        for actual, expected in zip(result["eigenvalues"], (1.0, 1.0 / 3.0, 0.0)):
            self.assertAlmostEqual(actual, expected, places=10)
        self.assertAlmostEqual(result["gram_strain"], 0.0, places=10)
        self.assertAlmostEqual(result["distance_squared_error"], 0.0, places=10)

    def test_euclidean_triangle_truncation(self) -> None:
        result = classical_mds(examples()["triangle"], 1)
        self.assertAlmostEqual(result["gram_strain"], 1.0 / 9.0, places=10)
        self.assertAlmostEqual(result["squared_distance_squared_error"], 0.5, places=10)

    def test_non_euclidean_input(self) -> None:
        result = classical_mds(examples()["non_euclidean"], 2)
        self.assertFalse(result["numerically_euclidean"])
        for actual, expected in zip(result["eigenvalues"], (4.5, 0.0, -5.0 / 6.0)):
            self.assertAlmostEqual(actual, expected, places=10)
        self.assertAlmostEqual(result["gram_strain"], 25.0 / 36.0, places=10)
        self.assertAlmostEqual(result["reconstructed_distances"][0][1], 1.5, places=10)
        self.assertAlmostEqual(result["reconstructed_distances"][0][2], 3.0, places=10)

    def test_collinear_rank_one(self) -> None:
        for dim in (1, 2):
            result = classical_mds(examples()["line"], dim)
            self.assertAlmostEqual(result["eigenvalues"][0], 38.0 / 3.0, places=10)
            self.assertAlmostEqual(result["gram_strain"], 0.0, places=9)

    def test_jacobi_orthonormality(self) -> None:
        eigenvalues, vectors = jacobi_eigensystem(
            [[2.0, 1.0, 0.0], [1.0, 3.0, 1.0], [0.0, 1.0, 4.0]]
        )
        self.assertEqual(len(eigenvalues), 3)
        for i in range(3):
            self.assertAlmostEqual(sum(x * x for x in vectors[i]), 1.0, places=10)
            for j in range(i):
                self.assertAlmostEqual(sum(a * b for a, b in zip(vectors[i], vectors[j])), 0.0, places=10)

    def test_bad_inputs(self) -> None:
        for distances in (
            [[0, 1], [2, 0]],
            [[1, 2], [2, 0]],
            [[0, -1], [-1, 0]],
            [[0, math.inf], [math.inf, 0]],
        ):
            with self.assertRaises(ValueError):
                classical_mds(distances, 1)
        with self.assertRaises(ValueError):
            classical_mds(examples()["triangle"], 3)


if __name__ == "__main__":
    unittest.main()
