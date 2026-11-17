"""Independent benchmarks, exact two-step formulas, and feasibility tests."""
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from constrained_execution import evaluate, project_capped_simplex, solve


class CappedExecutionTests(unittest.TestCase):
    def two_step(self, lam=1, cap=100, eta=None):
        return solve(quantity=100, hours=2, eta=eta or [0.01, 0.01],
                     caps=[cap, 100], gamma=0.002, sigma=0.1, risk_aversion=lam)

    def test_unconstrained_reference_matches_u3_62(self):
        r = self.two_step()
        self.assertTrue(r["converged"])
        self.assertAlmostEqual(r["fills"][0], 200 / 3, places=6)
        self.assertAlmostEqual(r["fills"][1], 100 / 3, places=6)
        self.assertAlmostEqual(r["mean"], 590 / 9, places=6)
        self.assertAlmostEqual(r["variance"], 1000 / 9, places=6)
        self.assertAlmostEqual(r["objective"], 1590 / 9, places=6)

    def test_active_cap_and_hand_calculation(self):
        r = self.two_step(cap=60)
        self.assertTrue(r["converged"])
        self.assertAlmostEqual(r["fills"][0], 60, places=7)
        self.assertAlmostEqual(r["fills"][1], 40, places=7)
        self.assertAlmostEqual(r["mean"], 62, places=7)
        self.assertAlmostEqual(r["variance"], 116, places=7)
        self.assertAlmostEqual(r["objective"], 178, places=7)
        self.assertLess(r["error_bound_shares"], 1e-7)

    def test_early_cap_40_with_larger_variance(self):
        r = self.two_step(cap=40)
        self.assertAlmostEqual(r["fills"][0], 40, places=7)
        self.assertAlmostEqual(r["fills"][1], 60, places=7)
        self.assertAlmostEqual(r["variance"], 136, places=7)
        self.assertAlmostEqual(r["objective"], 198, places=7)

    def test_heterogeneous_temporary_impact(self):
        r = self.two_step(lam=0, eta=[0.02, 0.01])
        self.assertAlmostEqual(r["fills"][0], 100 / 3, places=7)
        self.assertAlmostEqual(r["fills"][1], 200 / 3, places=7)
        self.assertAlmostEqual(r["mean"], 230 / 3, places=7)

    def test_projection_is_capped_and_exact_sum(self):
        p = project_capped_simplex([90, 10], [60, 100], 100)
        self.assertAlmostEqual(p[0], 60)
        self.assertAlmostEqual(p[1], 40)
        r = solve(quantity=100, eta=[0.01, 0.01, 0.02],
                  caps=[20, 30, 50], risk_aversion=1)
        self.assertEqual(r["fills"], [20, 30, 50])
        self.assertAlmostEqual(r["terminal"], 0)

    def test_zero_capacity_projection_and_execution(self):
        # A zero-capacity interval is pinned at zero even when y_i-tau>0.
        p = project_capped_simplex([90, 10], [0, 100], 100)
        self.assertEqual(p, [0, 100])
        p = project_capped_simplex([10, 90, 0], [0, 80, 60], 100)
        self.assertAlmostEqual(p[0], 0)
        self.assertAlmostEqual(p[1] + p[2], 100)
        self.assertTrue(0 <= p[1] <= 80 and 0 <= p[2] <= 60)
        r = solve(quantity=100, hours=2, eta=[0.01, 0.01],
                  caps=[0, 100], gamma=0.002, sigma=0.1, risk_aversion=1)
        self.assertTrue(r["converged"])
        self.assertAlmostEqual(r["fills"][0], 0)
        self.assertAlmostEqual(r["fills"][1], 100)
        self.assertAlmostEqual(r["terminal"], 0)

    def test_gradient_by_independent_center_difference(self):
        q = [30.0, 40.0, 30.0]
        eta = [0.01, 0.02, 0.03]
        kw = dict(quantity=100.0, hours=1.5, eta=eta, gamma=0.002,
                  sigma=0.1, risk_aversion=2.0)
        g = evaluate(q, **kw)["gradient"]
        h = 1e-4
        for i in range(len(q)):
            plus, minus = q.copy(), q.copy()
            plus[i] += h
            minus[i] -= h
            expected = (evaluate(plus, **kw)["objective"]
                        - evaluate(minus, **kw)["objective"]) / (2 * h)
            self.assertAlmostEqual(expected, g[i], places=7)

    def test_frontier_and_kink(self):
        rs = [self.two_step(lam=v, cap=60) for v in (0, 0.25, 0.5, 1, 3)]
        self.assertTrue(all(r["converged"] for r in rs))
        for a, b in zip(rs, rs[1:]):
            self.assertGreaterEqual(a["variance"] + 1e-7, b["variance"])
            self.assertLessEqual(a["mean"], b["mean"] + 1e-7)
        self.assertAlmostEqual(rs[0]["fills"][0], 50, places=6)
        self.assertAlmostEqual(rs[2]["fills"][0], 60, places=6)
        self.assertAlmostEqual(rs[3]["fills"][0], 60, places=6)

    def test_zero_risk_is_uniform_when_eta_equal(self):
        for kw in (dict(risk_aversion=0), dict(sigma=0)):
            r = solve(quantity=100, hours=2, eta=[0.01] * 4,
                      caps=[100] * 4, **kw)
            self.assertTrue(r["converged"])
            for q in r["fills"]:
                self.assertAlmostEqual(q, 25, places=7)

    def test_invalid_and_infeasible(self):
        base = dict(quantity=100, hours=2, eta=[0.01, 0.01], caps=[100, 100])
        for kw in (dict(caps=[30, 60]), dict(eta=[0, 0.01]),
                   dict(caps=[-1, 101]), dict(quantity=0),
                   dict(hours=-1), dict(sigma=-1),
                   dict(gamma=float("inf")), dict(risk_aversion=float("nan"))):
            with self.subTest(kw=kw), self.assertRaises(ValueError):
                solve(**(base | kw))
        with self.assertRaises(ValueError):
            solve(**base, tol=0)


if __name__ == "__main__":
    unittest.main()
