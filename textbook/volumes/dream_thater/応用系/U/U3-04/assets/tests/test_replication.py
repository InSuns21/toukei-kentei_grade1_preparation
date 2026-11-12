"""Run: python -m unittest discover -s .../U3-04/assets/tests -v."""
import importlib.util
import math
import unittest
from pathlib import Path

module_path = Path(__file__).resolve().parents[1] / "replication.py"
spec = importlib.util.spec_from_file_location("u304_replication", module_path)
rep = importlib.util.module_from_spec(spec)
spec.loader.exec_module(rep)


class ReplicationTests(unittest.TestCase):
    def setUp(self):
        self.args = (100.0, 1.2, 0.9, 1.05, 2)

    def assert_funds_and_pays(self, result):
        values, holdings, rebalance, error = result
        self.assertTrue(all(math.isfinite(v) for v in values.values()))
        self.assertEqual(len(holdings), 3)
        self.assertLess(rebalance, 1e-10)
        self.assertLess(error, 1e-10)

    def test_call_two_steps_all_four_paths(self):
        result = rep.replicate(*self.args, lambda h, s: max(s - 100, 0))
        values, holds, _, _ = result
        self.assert_funds_and_pays(result)
        self.assertAlmostEqual(values[()], 2000 / 147, places=10)
        self.assertAlmostEqual(values[("U",)], 520 / 21, places=10)
        self.assertAlmostEqual(values[("D",)], 80 / 21, places=10)
        self.assertAlmostEqual(holds[()][0], 44 / 63, places=10)
        self.assertAlmostEqual(holds[()][2], -24800 / 441, places=10)
        self.assertAlmostEqual(holds[("U",)][0], 1, places=10)
        self.assertAlmostEqual(holds[("U",)][2], -2000 / 21, places=10)
        self.assertAlmostEqual(holds[("D",)][0], 8 / 27, places=10)
        self.assertAlmostEqual(holds[("D",)][2], -160 / 7, places=10)
        for path, expected in {
            ("U", "U"): 44, ("U", "D"): 8,
            ("D", "U"): 8, ("D", "D"): 0,
        }.items():
            self.assertAlmostEqual(values[path], expected, places=10)

    def test_path_dependent_claim_same_terminal_stock(self):
        result = rep.replicate(
            *self.args, lambda h, s: 1 if h == ("U", "D") else 0
        )
        self.assert_funds_and_pays(result)
        self.assertAlmostEqual(result[0][()], 100 / 441, places=10)
        self.assertAlmostEqual(result[1][()][0], 1 / 63, places=10)
        self.assertNotEqual(result[0][("U", "D")], result[0][("D", "U")])

    def test_constant_claim_discounted(self):
        result = rep.replicate(*self.args, lambda h, s: 21)
        self.assert_funds_and_pays(result)
        self.assertAlmostEqual(result[0][()], 21 / 1.05**2, places=10)
        for delta, bank_units, bank_yen in result[1].values():
            self.assertAlmostEqual(delta, 0, places=10)

    def test_reject_boundary_and_missing_stock(self):
        for params in ((100, 1.2, 0.9, 0.9, 2),
                       (100, 1.0, 1.0, 1.0, 2),
                       (0, 1.2, 0.9, 1.05, 2)):
            with self.subTest(params=params):
                with self.assertRaises(ValueError):
                    rep.replicate(*params, lambda h, s: s)

    def test_trinomial_nonreplication(self):
        self.assertAlmostEqual(rep.check_trinomial_unattainable(), -2.0)
        for a in (0.1, 0.25, 0.4):
            probs = (a, 1 - 2 * a, a)
            self.assertTrue(all(x > 0 for x in probs))
            self.assertAlmostEqual(sum(probs), 1)
            self.assertAlmostEqual(
                sum(x * s for x, s in zip(probs, (120, 100, 80))), 100
            )
            self.assertAlmostEqual(probs[0] + probs[2], 2 * a)


if __name__ == "__main__":
    unittest.main()
