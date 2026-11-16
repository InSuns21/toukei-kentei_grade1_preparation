"""Independent cash and price-depth checks for synthetic U3-59 book."""
import sys
import unittest
from decimal import Decimal
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from order_book import book_snapshot, sweep


class OrderBookTest(unittest.TestCase):
    def test_buy_70(self):
        r = sweep("buy", 70)
        self.assertEqual(r["fills"], [(Decimal("100.1"), 40),
                                       (Decimal("100.2"), 30)])
        self.assertEqual(r["filled"], 70)
        self.assertEqual(r["remaining"], 0)
        self.assertEqual(r["notional"], Decimal("7010"))
        self.assertEqual(r["average_price"], Decimal("7010") / 70)
        self.assertEqual(r["cash"], Decimal("-7011.40"))
        self.assertEqual(r["inventory"], 70)
        self.assertEqual(r["spread_cost"], Decimal("7.0"))
        self.assertEqual(r["depth_cost"], Decimal("3.0"))
        self.assertEqual(r["fee"], Decimal("1.40"))
        self.assertEqual(r["shortfall"], Decimal("11.40"))

    def test_sell_80(self):
        r = sweep("sell", 80)
        self.assertEqual(r["fills"], [(Decimal("99.9"), 60),
                                       (Decimal("99.8"), 20)])
        self.assertEqual(r["notional"], Decimal("7990.0"))
        self.assertEqual(r["cash"], Decimal("7988.40"))
        self.assertEqual(r["inventory"], -80)
        self.assertEqual(r["spread_cost"], Decimal("8.0"))
        self.assertEqual(r["depth_cost"], Decimal("2.0"))
        self.assertEqual(r["shortfall"], Decimal("11.60"))

    def test_insufficient_book_and_terminal_mark(self):
        r = sweep("buy", 190, terminal_mid=Decimal("100.5"))
        self.assertEqual(r["filled"], 140)
        self.assertEqual(r["remaining"], 50)
        self.assertEqual(r["notional"], Decimal("14024"))
        self.assertEqual(r["fee"], Decimal("2.80"))
        self.assertEqual(r["opportunity_cost"], Decimal("25.0"))
        self.assertEqual(r["shortfall"], Decimal("51.80"))
        self.assertEqual(r["inventory"], 140)
        self.assertEqual(r["cash"], Decimal("-14026.80"))
        self.assertEqual(r["residual_mark_cash"], Decimal("-5025.0"))

    def test_only_best_quote(self):
        r = sweep("buy", 40)
        self.assertEqual(r["filled"], 40)
        self.assertEqual(r["depth_cost"], Decimal("0"))
        self.assertEqual(r["shortfall"], Decimal("4.80"))

    def test_negative_opportunity_cost_can_be_good(self):
        r = sweep("buy", 190, terminal_mid=Decimal("99.0"))
        self.assertEqual(r["opportunity_cost"], Decimal("-50.0"))
        self.assertEqual(r["shortfall"], Decimal("-23.20"))

    def test_invalid_orders(self):
        for q in (0, -1, 1.5, True):
            with self.assertRaises(ValueError):
                sweep("buy", q)
        for side in ("none", "BUY", ""):
            with self.assertRaises(ValueError):
                sweep(side, 70)
        for mid in ("0", "-1", "NaN"):
            with self.assertRaises(ValueError):
                sweep("buy", 70, terminal_mid=mid)
        with self.assertRaises(ValueError):
            sweep("buy", 70, fee_per_share=Decimal("-0.01"))

    def test_reject_invalid_book(self):
        for bad in (
            {"bids": [(Decimal("100.1"), 1)], "asks": [(Decimal("100.1"), 2)]},
            {"bids": [(Decimal("99.9"), 0)], "asks": [(Decimal("100.1"), 2)]},
            {"bids": [(Decimal("99.9"), 1), (Decimal("100"), 2)],
             "asks": [(Decimal("100.1"), 2)]},
            {"bids": [(Decimal("99.9"), 1)], "asks": []},
            {"bids": [(Decimal("99.9"), 1)],
             "asks": [(Decimal("100.1"), 2), (Decimal("100.0"), 2)]},
        ):
            with self.assertRaises(ValueError):
                sweep("buy", 10, book=bad)


if __name__ == "__main__":
    unittest.main()
