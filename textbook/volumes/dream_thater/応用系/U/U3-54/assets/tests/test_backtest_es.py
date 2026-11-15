"""Run: python -m unittest discover -s assets/tests -v (from chapter root)."""
import importlib.util
from pathlib import Path
import random
import unittest

MODULE = Path(__file__).resolve().parents[1] / "backtest_es.py"
spec = importlib.util.spec_from_file_location("backtest_es", MODULE)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)


class BacktestTests(unittest.TestCase):
    def test_discrete_var_and_es_include_atom(self):
        self.assertEqual(mod.two_point_var_es(.20, .75), (0.0, 8.0))
        self.assertEqual(mod.two_point_var_es(.05, .75), (0.0, 2.0))
        self.assertEqual(mod.two_point_var_es(.50, .75), (10.0, 10.0))
        self.assertEqual(mod.two_point_var_es(0, .75), (0.0, 0.0))

    def test_baseline_oracle(self):
        loss = mod.heldout_losses("baseline")
        good = mod.summary(loss, .20, .75)
        bad = mod.summary(loss, .05, .75)
        self.assertEqual(good["strict_hits"], bad["strict_hits"])
        self.assertEqual(good["strict_hits"], 4)
        self.assertAlmostEqual(good["avg_tail_residual"], 0)
        self.assertAlmostEqual(bad["avg_tail_residual"], 6)
        self.assertAlmostEqual(good["avg_crps"], 1.6)
        self.assertAlmostEqual(bad["avg_crps"], 1.825)
        self.assertAlmostEqual(good["avg_pinball"], bad["avg_pinball"])
        self.assertEqual(sum(good["pit_buckets"]), 20)

    def test_same_hit_count_different_severity(self):
        original = mod.heldout_losses("baseline")
        severe = mod.heldout_losses("severe")
        s0 = mod.summary(original, .20, .75)
        s1 = mod.summary(severe, .20, .75)
        self.assertEqual(s0["strict_hits"], s1["strict_hits"])
        self.assertAlmostEqual(s1["avg_tail_residual"], 6)
        self.assertAlmostEqual(s1["avg_crps"] - s0["avg_crps"], 1.5)

    def test_crps_proper_expected_formula(self):
        # E_true CRPS(p,Y) = 10[(p-p0)^2 + p0(1-p0)].
        p0, p = .20, .05
        expected = (1-p0)*mod.crps_two_point(p, 0) + p0*mod.crps_two_point(p, 10)
        self.assertAlmostEqual(expected, 10*((p-p0)**2 + p0*(1-p0)))

    def test_randomized_pit_atom_intervals(self):
        rng = random.Random(54)
        for x in (0, 10):
            for _ in range(100):
                u = mod.randomized_pit(.2, x, rng)
                self.assertTrue((0 <= u < .8) if x == 0 else (.8 <= u < 1))
        self.assertEqual(mod.randomized_pit(.2, 40, rng), 1)

    def test_invalid_inputs(self):
        with self.assertRaises(ValueError):
            mod.two_point_var_es(.2, 1)
        with self.assertRaises(ValueError):
            mod.two_point_var_es(-.1, .75)
        with self.assertRaises(ValueError):
            mod.summary([float("nan"), 0], .2, .75)
        with self.assertRaises(ValueError):
            mod.summary([0], .2, .75)


if __name__ == "__main__":
    unittest.main()
