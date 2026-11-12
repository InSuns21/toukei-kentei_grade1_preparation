"""Dependency-free regression tests for the published barrier lab."""
import sys
import unittest
from fractions import Fraction as F
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from barrier_tree_check import (
    B, D, Q, R, S0, U, backward_price, backward_values,
    enumerate_price, state_for, terminal_payoff, valid_observations,
)


class BarrierChecks(unittest.TestCase):
    def test_model_and_touch_equality(self):
        self.assertEqual(Q, F(5, 8))
        self.assertTrue(D < R < U)
        self.assertEqual(state_for("UD", (0, 1, 2)), (F(96), True))
        self.assertEqual(state_for("DU", (0, 1, 2)), (F(96), False))
        self.assertEqual(terminal_payoff(F(96), True, "out"), 0)
        self.assertEqual(terminal_payoff(F(96), True, "in"), 6)
        self.assertEqual(terminal_payoff(F(96), False, "out"), 6)

    def test_two_monitoring_schedules(self):
        expected = {
            (0, 1, 2): (F(1000, 49), F(125, 98)),
            (0, 2): (F(1875, 98), F(125, 49)),
        }
        for dates, (knock_in, knock_out) in expected.items():
            with self.subTest(dates=dates):
                self.assertEqual(backward_price(2, dates, "in"), knock_in)
                self.assertEqual(backward_price(2, dates, "out"), knock_out)
                self.assertEqual(knock_in + knock_out, F(2125, 98))

    def test_enumeration_matches_recursion(self):
        for n in (1, 2, 3, 4):
            for dates in ((0, n), tuple(range(n + 1))):
                for kind in ("vanilla", "in", "out"):
                    with self.subTest(n=n, dates=dates, kind=kind):
                        self.assertEqual(
                            enumerate_price(n, dates, kind),
                            backward_price(n, dates, kind))

    def test_history_flag_changes_price_at_same_stock(self):
        dates = (0, 1, 2, 3)
        ud = state_for("UD", dates)
        du = state_for("DU", dates)
        self.assertEqual(ud, (F(96), True))
        self.assertEqual(du, (F(96), False))
        out, _ = backward_values(3, dates, "out")
        knock_in, _ = backward_values(3, dates, "in")
        self.assertEqual((out(2, *ud), out(2, *du)), (F(0), F(15)))
        self.assertEqual((knock_in(2, *ud), knock_in(2, *du)),
                         (F(15), F(0)))

    def test_monitoring_monotonicity(self):
        self.assertLessEqual(backward_price(2, (0, 1, 2), "out"),
                             backward_price(2, (0, 2), "out"))
        self.assertGreaterEqual(backward_price(2, (0, 1, 2), "in"),
                                backward_price(2, (0, 2), "in"))

    def test_invalid_inputs(self):
        with self.assertRaises(ValueError):
            valid_observations(0, (0,))
        with self.assertRaises(ValueError):
            valid_observations(2, (3,))
        with self.assertRaises(ValueError):
            valid_observations(2, ())
        with self.assertRaises(ValueError):
            terminal_payoff(F(100), False, "wrong")


if __name__ == "__main__":
    unittest.main()
