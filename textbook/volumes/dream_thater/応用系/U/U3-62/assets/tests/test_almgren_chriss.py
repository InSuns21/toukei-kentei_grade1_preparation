"""U3-62 analytic, discretization, constrained-sell and cash identity tests."""
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from almgren_chriss import cash_ledger, optimize


class AlmgrenChrissTests(unittest.TestCase):
    def test_two_period_known_solution(self):
        r = optimize(periods=2)
        self.assertAlmostEqual(r["path"][1], 100/3)
        self.assertAlmostEqual(r["optimal"]["fills"][0], 200/3)
        self.assertAlmostEqual(r["optimal"]["mean"], 590/9)
        self.assertAlmostEqual(r["optimal"]["variance"], 1000/9)
        self.assertAlmostEqual(r["optimal"]["objective"], 1590/9)
        self.assertAlmostEqual(r["twap"]["mean"], 60)
        self.assertAlmostEqual(r["twap"]["variance"], 125)
        self.assertAlmostEqual(r["twap"]["objective"], 185)

    def test_self_financing_cash_and_inventory_identity(self):
        r = optimize(periods=2)
        observed, theoretical = cash_ledger(r["path"], [0.10, -0.05],
                                            r["dt"], 0.01, 0.002)
        self.assertAlmostEqual(observed, theoretical)
        self.assertAlmostEqual(observed, 515/9)

    def test_zero_fill_has_no_average_execution_price(self):
        observed, identity = cash_ledger([100, 100, 0], [0.10, -0.05],
                                         1, 0.01, 0.002)
        self.assertAlmostEqual(observed, identity)
        self.assertAlmostEqual(observed, 10 + 100 - 5)

    def test_zero_risk_returns_uniform_schedule(self):
        for kw in ({"risk_aversion": 0}, {"sigma": 0}):
            r = optimize(**kw)
            for i, x in enumerate(r["path"]):
                self.assertAlmostEqual(x, 100*(1-i/4))
            self.assertAlmostEqual(r["max_residual"], 0, places=8)

    def test_one_interval_and_large_risk(self):
        r = optimize(periods=1)
        self.assertEqual(r["path"], [100.0, 0.0])
        r = optimize(periods=60, risk_aversion=100000)
        self.assertTrue(all(a >= b >= 0 for a, b in zip(r["path"], r["path"][1:])))
        self.assertLess(r["max_difference"], 1e-7)

    def test_tridiagonal_matches_closed_form_and_is_optimal(self):
        for n in (2, 3, 4, 10, 50):
            for lam in (0, 0.001, 0.25, 1, 4):
                with self.subTest(n=n, lam=lam):
                    r = optimize(periods=n, risk_aversion=lam)
                    self.assertLess(r["max_difference"], 1e-8)
                    self.assertLess(r["max_residual"], 1e-8)
                    self.assertAlmostEqual(sum(r["optimal"]["fills"]), 100)
                    self.assertLessEqual(r["optimal"]["objective"], r["twap"]["objective"]+1e-8)

    def test_frontier_monotonicity(self):
        results = [optimize(risk_aversion=lam)["optimal"] for lam in (0, 0.25, 1, 4)]
        self.assertTrue(all(b["mean"] >= a["mean"]-1e-8 for a, b in zip(results, results[1:])))
        self.assertTrue(all(b["variance"] <= a["variance"]+1e-8
                            for a, b in zip(results, results[1:])))

    def test_validation(self):
        for kw in ({"quantity": 0}, {"periods": 0}, {"periods": 2.5},
                   {"hours": 0}, {"eta": 0}, {"eta": -1},
                   {"gamma": -1}, {"sigma": -1}, {"risk_aversion": -1},
                   {"sigma": float("nan")}, {"risk_aversion": float("inf")}):
            with self.subTest(kwargs=kw):
                with self.assertRaises(ValueError):
                    optimize(**kw)
        with self.assertRaises(ValueError):
            cash_ledger([100, 0], [0.1, 0.2], 1, 0.01, 0.002)


if __name__ == "__main__":
    unittest.main()
