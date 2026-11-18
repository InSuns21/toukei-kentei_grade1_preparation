"""U3-68 deterministic regression tests: python -m unittest discover -s tests -v."""
import math
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from execution_tca import (
    Path as MarketPath, QUANTITY, schedules, generate_paths, execute,
    telescoping_shortfall, empirical_var_es, mean_ci, black_scholes_call,
)


class ExecutionTCATests(unittest.TestCase):
    def test_schedules(self):
        for plan in schedules().values():
            if plan is not None:
                self.assertEqual(sum(plan), QUANTITY)
                self.assertGreaterEqual(min(plan), 0)

    def test_telescope_and_no_lookahead(self):
        original = MarketPath((10., 9., 11., 10., 8.), (40, 40, 40, 40))
        changed = MarketPath((10., 9., 11., 10., 800.), (40, 40, 40, 900))
        for policy in schedules():
            result = execute(original, policy)
            future = execute(changed, policy)
            self.assertAlmostEqual(result.shortfall,
                                   telescoping_shortfall(original, result), places=9)
            self.assertEqual(result.orders[:3], future.orders[:3])
            self.assertEqual(result.fills[:3], future.fills[:3])
            self.assertEqual(sum(result.fills)+result.residual, QUANTITY)

    def test_unfilled_terminal_mark_is_not_cash(self):
        p = MarketPath((10., 9., 9., 9., 8.), (0, 0, 0, 0))
        r = execute(p, "TWAP")
        self.assertEqual(r.cash, 0.)
        self.assertEqual(r.residual, QUANTITY)
        self.assertAlmostEqual(r.shortfall, 24.)

    def test_empirical_boundary_and_translation(self):
        base = [0., 0., 2., 4.]
        var, es = empirical_var_es(base, 0.625)
        # empirical quantile integral: 0.125*2 + 0.25*4, divided by 0.375.
        self.assertEqual(var, 2.)
        self.assertAlmostEqual(es, (0.125*2+0.25*4)/0.375)
        v2, e2 = empirical_var_es([z+3 for z in base], 0.625)
        self.assertAlmostEqual(v2, var+3)
        self.assertAlmostEqual(e2, es+3)

    def test_p_q_and_reproducibility(self):
        p = generate_paths(4, 123)
        self.assertEqual(p, generate_paths(4, 123))
        self.assertNotEqual(p, generate_paths(4, 124))
        self.assertAlmostEqual(p[0].mids[0],
                               black_scholes_call(100., 100., .02, .20, 1.), places=10)
        for row in p:
            self.assertEqual(len(row.mids), 5)
            self.assertEqual(len(row.volumes), 4)

    def test_paired_interval(self):
        self.assertEqual(mean_ci([5.0, 5.0, 5.0]), (5.0, 0.0))
        self.assertTrue(math.isinf(mean_ci([3.0])[1]))


if __name__ == "__main__":
    unittest.main()
