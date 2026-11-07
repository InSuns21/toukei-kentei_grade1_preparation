"""Numerical regression cases for MFL9's hand-checkable models."""

from __future__ import annotations

import math
import unittest

from isomap_lab import evaluate, radius_edges, shortest_paths


class IsomapLabTests(unittest.TestCase):
    def test_arc_chain_and_second_order_bound(self) -> None:
        result = evaluate("arc", radius=0.5, dim=2)
        self.assertEqual(len(result["edges"]), 4)
        self.assertTrue(result["connected"])
        graph_length = result["shortest_path_distances"][0][4]
        true_length = math.pi / 2
        h = math.pi / 8
        self.assertAlmostEqual(graph_length, 8 * math.sin(math.pi / 16))
        self.assertLessEqual(true_length - graph_length,
                             true_length * h * h / 24 + 1e-12)

    def test_u_shortcut(self) -> None:
        result = evaluate("u", radius=1.1, dim=2)
        self.assertTrue(result["connected"])
        self.assertAlmostEqual(result["intrinsic_distances"][0][5], 4.1)
        self.assertAlmostEqual(result["shortest_path_distances"][0][5], 0.1)

    def test_square_cycle_negative_eigenvalue(self) -> None:
        result = evaluate("square", radius=1.1, dim=2)
        self.assertEqual(len(result["edges"]), 4)
        self.assertAlmostEqual(result["shortest_path_distances"][0][2], 2)
        eigenvalues = result["mds"]["eigenvalues"]
        for actual, expected in zip(eigenvalues, [2, 2, 0, -1]):
            self.assertAlmostEqual(actual, expected, places=9)
        self.assertAlmostEqual(result["mds"]["gram_strain"], 1.0, places=9)

    def test_disconnected_is_not_mds_input(self) -> None:
        result = evaluate("arc", radius=0.1, dim=2)
        self.assertFalse(result["connected"])
        self.assertIsNone(result["mds"])
        self.assertIsNone(result["shortest_path_distances"][0][4])

    def test_dijkstra_and_radius_strictness(self) -> None:
        self.assertEqual(shortest_paths(4, [
            (0, 1, 1), (0, 2, 4), (1, 2, 2), (1, 3, 5), (2, 3, 1)
        ])[0], [0, 1, 3, 4])
        self.assertEqual(radius_edges([(0.0,), (1.0,)], 1.0), [])

    def test_rejects_negative_edge(self) -> None:
        with self.assertRaises(ValueError):
            shortest_paths(2, [(0, 1, -1)])


if __name__ == "__main__":
    unittest.main()
