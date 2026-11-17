"""U3-61 regression checks for price timing, cost and zero-fill limits."""
from __future__ import annotations

import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from market_impact import simulate


class MarketImpactTests(unittest.TestCase):
    def test_base_price_timing_and_ledger(self):
        r = simulate()
        a, b = r["rows"]
        self.assertAlmostEqual(a["pre_mid"], 100)
        self.assertAlmostEqual(a["post_mid"], 99.92)
        self.assertAlmostEqual(a["average_fill"], 99.56)
        self.assertAlmostEqual(b["pre_mid"], 99.92)
        self.assertAlmostEqual(b["post_mid"], 99.8)
        self.assertAlmostEqual(b["average_fill"], 99.26)
        self.assertAlmostEqual(r["proceeds"], 9938)
        self.assertAlmostEqual(r["actual_cost"], 62)
        self.assertAlmostEqual(r["permanent_cost"], 10)
        self.assertAlmostEqual(r["temporary_cost"], 52)
        self.assertAlmostEqual(r["variance"], 136)

    def test_fixed_schedule_shocks_not_confused_with_impact(self):
        r = simulate(shock1=0.10, shock2=-0.05)
        a, b = r["rows"]
        self.assertAlmostEqual(a["unaffected"], 100.10)
        self.assertAlmostEqual(a["average_fill"], 99.66)
        self.assertAlmostEqual(a["post_mid"], 100.02)
        self.assertAlmostEqual(b["pre_mid"], 99.97)
        self.assertAlmostEqual(b["average_fill"], 99.31)
        self.assertAlmostEqual(b["post_mid"], 99.85)
        self.assertAlmostEqual(r["unaffected_component"], -7)
        self.assertAlmostEqual(r["actual_cost"], 55)
        self.assertAlmostEqual(r["expected_cost"], 62)

    def test_schedule_concentration_and_limits(self):
        equal = simulate(first=50)
        fast = simulate(first=100)
        slow = simulate(first=0)
        self.assertAlmostEqual(equal["actual_cost"], 60)
        self.assertAlmostEqual(equal["variance"], 125)
        self.assertAlmostEqual(fast["actual_cost"], 110)
        self.assertAlmostEqual(fast["variance"], 100)
        self.assertAlmostEqual(slow["actual_cost"], 110)
        self.assertAlmostEqual(slow["variance"], 200)
        self.assertIsNone(fast["rows"][1]["average_fill"])
        self.assertIsNone(slow["rows"][0]["average_fill"])
        self.assertAlmostEqual(slow["remaining"], 0)

    def test_no_impact_and_parameter_checks(self):
        zero = simulate(gamma=0, eta=0)
        self.assertAlmostEqual(zero["expected_cost"], 0)
        self.assertAlmostEqual(zero["actual_cost"], 0)
        for kwargs in ({"quantity": 0}, {"first": -1}, {"first": 101},
                       {"eta": -1}, {"gamma": -1}, {"sigma": -1},
                       {"shock1": float("nan")}, {"initial": 0}):
            with self.subTest(kwargs=kwargs):
                with self.assertRaises(ValueError):
                    simulate(**kwargs)


if __name__ == "__main__":
    unittest.main()
