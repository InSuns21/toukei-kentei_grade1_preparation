"""U3-60 regression tests, runnable with unittest discovery."""
import sys
import unittest
from decimal import Decimal
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from execution_schedules import allocate_integer, causal_pov, compare, cost_breakdown


class ScheduleTests(unittest.TestCase):
    def test_base_case_and_ledger(self):
        s = compare()
        self.assertEqual(s["capacity"], (16, 48, 32, 64))
        self.assertEqual(s["market_vwap"], Decimal("100.24"))
        expected = {
            "TWAP": ((16, 30, 30, 30), 14, Decimal("42.12")),
            "forecast_VWAP": ((15, 30, 32, 30), 13, Decimal("41.84")),
            "POV": ((12, 36, 24, 48), 0, Decimal("43.20")),
        }
        for name, (fills, remaining, shortfall) in expected.items():
            with self.subTest(method=name):
                row = s["methods"][name]
                self.assertEqual(row["fills"], fills)
                self.assertEqual(row["remaining"], remaining)
                self.assertEqual(row["shortfall"], shortfall)
                self.assertEqual(row["filled"] + remaining, 120)
                self.assertEqual(row["shortfall"], row["execution_gap"] +
                                 row["opportunity"] + row["fee"])
        pov = s["methods"]["POV"]
        self.assertEqual(pov["average_price"], Decimal("100.34"))
        self.assertEqual(pov["cash"], Decimal("-12043.20"))
        self.assertEqual(pov["inventory"], 120)

    def test_no_lookahead_prefix(self):
        base = compare()
        changed = compare(last_volume=160)
        a = base["methods"]["POV"]["fills"]
        b = changed["methods"]["POV"]["fills"]
        self.assertEqual(a[:3], b[:3])
        self.assertEqual(b, (12, 36, 24, 24))
        self.assertEqual(changed["methods"]["POV"]["remaining"], 24)
        self.assertEqual(base["methods"]["forecast_VWAP"]["target"],
                         changed["methods"]["forecast_VWAP"]["target"])

    def test_cap_and_rounding(self):
        self.assertEqual(allocate_integer(150, (100, 200, 300, 200)),
                         (19, 38, 56, 37))
        self.assertEqual(causal_pov(90, (80, 240, 160, 320),
                                    Decimal("0.15")),
                         (12, 36, 24, 18))
        self.assertEqual(compare(participation=Decimal("0.10"))
                         ["methods"]["POV"]["remaining"], 40)
        # A high requested participation must update residual using actual
        # capacity-constrained fills, not the uncapped hypothetical quota.
        self.assertEqual(compare(participation=Decimal("0.40"))
                         ["methods"]["POV"]["fills"], (16, 48, 32, 24))

    def test_zero_fills_and_invalid_data(self):
        row = cost_breakdown(120, (0, 0, 0, 0))
        self.assertIsNone(row["average_price"])
        self.assertEqual(row["remaining"], 120)
        self.assertEqual(row["shortfall"], Decimal("72.0"))
        for kwargs in ({"quantity": 0}, {"quantity": -1},
                       {"last_volume": -1}, {"participation": "-0.1"},
                       {"participation": "1.1"}):
            with self.subTest(kwargs=kwargs):
                with self.assertRaises(ValueError):
                    compare(**kwargs)


if __name__ == "__main__":
    unittest.main()
