"""Lightweight deterministic checks for U3-53 VaR backtesting."""
import importlib.util
import math
import pathlib
import unittest

MODULE = pathlib.Path(__file__).resolve().parents[1] / "backtest_var.py"
spec = importlib.util.spec_from_file_location("backtest_var", MODULE)
risk = importlib.util.module_from_spec(spec)
spec.loader.exec_module(risk)


class HitBacktestTests(unittest.TestCase):
    def test_strict_exceedance_boundary(self):
        self.assertEqual(risk.hit_flags([8, 11, 10, 9], [10, 10, 10, 10]),
                         [0, 1, 0, 0])
        with self.assertRaises(ValueError):
            risk.hit_flags([1], [1])
        with self.assertRaises(ValueError):
            risk.hit_flags([1, 2], [1, float("nan")])

    def test_past_forecasts_are_not_refit_on_future_losses(self):
        # There is no fitting in the evaluator; changing a future loss does
        # not alter earlier saved forecasts nor earlier evaluated hits.
        saved_forecasts = [10, 10, 10, 10]
        earlier = [9, 11, 8, 9]
        revised_future = [9, 11, 8, 30]
        before = risk.hit_flags(earlier, saved_forecasts)
        after = risk.hit_flags(revised_future, saved_forecasts)
        self.assertEqual(before[:3], after[:3])
        self.assertEqual(saved_forecasts, [10, 10, 10, 10])

    def test_same_count_different_clustering(self):
        a, pa = risk.scenario("spread", 100)
        b, pb = risk.scenario("clustered", 100)
        self.assertEqual((len(a), sum(a), pa), (20, 6, 0.30))
        self.assertEqual((len(b), sum(b), pb), (20, 6, 0.30))
        self.assertEqual(risk.transitions(a), (8, 5, 5, 1))
        self.assertEqual(risk.transitions(b), (11, 2, 2, 4))
        self.assertAlmostEqual(risk.lr_uc(a, pa), 0)
        self.assertAlmostEqual(risk.lr_uc(b, pb), 0)
        self.assertAlmostEqual(risk.lr_ind(a), 0.9689102744108915)
        self.assertAlmostEqual(risk.lr_ind(b), 4.898315693854347)

    def test_undercoverage_and_boundary(self):
        hits, p = risk.scenario("undercoverage", 100)
        self.assertEqual((len(hits), sum(hits)), (100, 10))
        self.assertAlmostEqual(risk.lr_uc(hits, p), 4.130843782549279)
        self.assertAlmostEqual(risk.lr_uc([0] * 20, 0.05),
                               -40 * math.log(0.95))
        self.assertAlmostEqual(risk.lr_uc([1] * 20, 0.05),
                               -40 * math.log(0.05))
        # No predecessor state 1 exists, so the transition LR is undefined.
        self.assertIsNone(risk.lr_ind([0] * 20))

    def test_exact_probability_and_generators(self):
        self.assertAlmostEqual(
            risk.exact_upper_binomial_tail(10, 4, 0.1),
            0.0127951984)
        self.assertAlmostEqual(
            risk.exact_upper_binomial_tail(10, 4, 0.3),
            0.3503892816)
        iid1, p1 = risk.scenario("iid", 200)
        iid2, p2 = risk.scenario("iid", 200)
        self.assertEqual((iid1, p1), (iid2, p2))
        cluster, target = risk.scenario("markov", 200)
        self.assertEqual(len(cluster), 200)
        self.assertEqual(target, 0.05)
        self.assertEqual(sum(risk.transitions(cluster)), 199)
        with self.assertRaises(ValueError):
            risk.scenario("iid", 10)


if __name__ == "__main__":
    unittest.main()
