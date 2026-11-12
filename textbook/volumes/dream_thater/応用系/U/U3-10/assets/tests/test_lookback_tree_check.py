"""Unit tests for two independent exact lookback pricing algorithms."""
import sys
import unittest
from fractions import Fraction
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from lookback_tree_check import (  # noqa: E402
    S0, U, D, R, Q, enumerate_price, compressed_tree
)


class LookbackTreeTests(unittest.TestCase):
    def test_market_is_arbitrage_free(self):
        self.assertEqual(U * D, 1)
        self.assertTrue(D < R < U)
        self.assertEqual(Q, Fraction(5, 9))

    def test_exact_prices_match_independent_paths(self):
        self.assertEqual(enumerate_price(2), Fraction(582500, 35721))
        self.assertEqual(enumerate_price(3), Fraction(155912500, 6751269))
        for n in range(7):
            with self.subTest(n=n):
                compact, counts, _ = compressed_tree(n)
                self.assertEqual(enumerate_price(n), compact)
                self.assertLessEqual(sum(counts), sum((t + 1) ** 2 for t in range(n + 1)))

    def test_same_stock_different_running_maximum(self):
        _, _, v = compressed_tree(3)
        self.assertEqual(v[2][(0, 1)], Fraction(100, 7))
        self.assertEqual(v[2][(0, 0)], Fraction(500, 63))
        self.assertEqual(v[2][(0, 1)] - v[2][(0, 0)], Fraction(400, 63))

    def test_no_option_value_if_strike_exceeds_all_reachable_maxima(self):
        # Max possible price through N=3 is S0 * U**3.
        strike = S0 * U ** 3 + 1
        self.assertEqual(enumerate_price(3, strike), 0)
        self.assertEqual(compressed_tree(3, strike)[0], 0)

    def test_zero_maturity_is_immediate_payoff(self):
        self.assertEqual(enumerate_price(0, Fraction(90)), 10)
        self.assertEqual(compressed_tree(0, Fraction(90))[0], 10)

    def test_invalid_maturity_rejected(self):
        with self.assertRaises(ValueError):
            enumerate_price(-1)
        with self.assertRaises(ValueError):
            compressed_tree(-1)


if __name__ == "__main__":
    unittest.main()
