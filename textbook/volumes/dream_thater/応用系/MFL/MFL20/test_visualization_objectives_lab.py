"""Tests for MFL20 finite-point visualization computations."""

from __future__ import annotations

import importlib.util
import math
from pathlib import Path
import unittest


SCRIPT = Path(__file__).with_name("visualization_objectives_lab.py")
spec = importlib.util.spec_from_file_location("mfl20_visualization", SCRIPT)
assert spec and spec.loader
lab = importlib.util.module_from_spec(spec)
spec.loader.exec_module(lab)


class VisualizationObjectivesTests(unittest.TestCase):
    def test_all_self_checks(self) -> None:
        lab.self_test()

    def test_perplexity_bandwidth_monotonic(self) -> None:
        energies = [0.1, 0.4, 1.3, 3.2]
        _, beta2, p2 = lab.conditional_perplexity(energies, 2)
        _, beta3, p3 = lab.conditional_perplexity(energies, 3)
        self.assertGreater(beta2, beta3)
        self.assertAlmostEqual(p2, 2)
        self.assertAlmostEqual(p3, 3)

    def test_umap_union_properties(self) -> None:
        x, y = lab.preset_points("bridge", 3)
        d = lab.distances(x)
        w, rhos, sigmas = lab.umap_weights(d, 3)
        for i in range(len(w)):
            self.assertGreater(rhos[i], 0)
            self.assertGreater(sigmas[i], 0)
            for j in range(len(w)):
                self.assertGreaterEqual(w[i][j], 0)
                self.assertLessEqual(w[i][j], 1)
                self.assertAlmostEqual(w[i][j], w[j][i])
        self.assertEqual(w[3][4], 0)
        self.assertEqual(w[0][1], 1)
        self.assertTrue(math.isfinite(lab.report(x, y)["umap_bernoulli_loss"]))

    def test_rank_preserved_under_scale(self) -> None:
        x, _ = lab.preset_points("bridge", 3)
        dx = lab.distances(x)
        scaled = [[v[0] * 7] for v in x]
        t, c = lab.rank_scores(dx, lab.distances(scaled), 1)
        self.assertAlmostEqual(t, 1)
        self.assertAlmostEqual(c, 1)
        self.assertAlmostEqual(
            lab.scale_fitted_distance_error(dx, lab.distances(scaled)), 0
        )

    def test_input_validation(self) -> None:
        x, y = lab.preset_points("bridge", 3)
        with self.assertRaises(ValueError):
            lab.report(x, y, neighbors_k=2)
        with self.assertRaises(ValueError):
            lab.report(x, y, rank_k=4)
        with self.assertRaises(ValueError):
            lab.check_points(x, y[:-1])


if __name__ == "__main__":
    unittest.main()
