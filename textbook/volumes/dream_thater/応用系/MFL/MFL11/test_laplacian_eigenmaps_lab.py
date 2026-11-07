import unittest

from laplacian_eigenmaps_lab import calculate


class EigenmapsTests(unittest.TestCase):
    def check_constraints(self, data):
        for center in data["degree_weighted_center"]:
            self.assertAlmostEqual(center, 0, places=9)
        for i, row in enumerate(data["degree_weighted_gram"]):
            for j, value in enumerate(row):
                self.assertAlmostEqual(value, float(i == j), places=9)
        self.assertLess(max(data["eigen_residual_norms"]), 1e-8)
        self.assertAlmostEqual(data["edge_energy"], data["spectral_energy"], places=9)

    def test_path3(self):
        result = calculate("path3", 2)
        for got, want in zip(result["eigenvalues"], (0, 1, 2)):
            self.assertAlmostEqual(got, want, places=9)
        self.assertEqual(result["degrees"], [1, 2, 1])
        self.assertAlmostEqual(result["edge_energy"], 3, places=9)
        self.check_constraints(result)

    def test_disconnected_has_two_zero_modes(self):
        result = calculate("disconnected", 1)
        self.assertEqual(len(result["connected_components"]), 2)
        self.assertAlmostEqual(result["eigenvalues"][1], 0, places=10)
        self.assertAlmostEqual(result["edge_energy"], 0, places=9)
        self.check_constraints(result)

    def test_isolate_is_excluded(self):
        result = calculate("isolated", 1)
        self.assertEqual(result["vertices"], [1, 2, 3])
        self.assertEqual(result["excluded_isolates"], [4])
        self.check_constraints(result)

    def test_weak_bridge_is_positive_and_small(self):
        delta = 0.01
        result = calculate("weak-bridge", 1, bridge=delta)
        self.assertEqual(len(result["connected_components"]), 1)
        self.assertGreater(result["eigenvalues"][1], 0)
        self.assertLessEqual(result["eigenvalues"][1], 2 * delta / (2 + delta) + 1e-10)
        self.check_constraints(result)

    def test_scale_changes_coordinates_not_eigenvalues(self):
        original = calculate("path3", 1)
        scaled = calculate("path3", 1, weight_scale=9)
        for a, b in zip(original["eigenvalues"], scaled["eigenvalues"]):
            self.assertAlmostEqual(a, b, places=9)
        self.assertAlmostEqual(original["edge_energy"], scaled["edge_energy"], places=9)
        self.check_constraints(scaled)


if __name__ == "__main__":
    unittest.main()
