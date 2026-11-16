"""Reproducibility and boundary checks for U3-58."""
import sys
import unittest
from fractions import Fraction
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from credit_risk import metrics, scenario


class CreditRiskTest(unittest.TestCase):
    def test_single_95_percent(self):
        self.assertEqual(metrics(scenario("single"), Fraction(95, 100)),
                         (Fraction(6, 5), Fraction(0), Fraction(24)))

    def test_single_99_percent(self):
        self.assertEqual(metrics(scenario("single"), Fraction(99, 100)),
                         (Fraction(6, 5), Fraction(60), Fraction(60)))

    def test_independent_vs_clustered(self):
        self.assertEqual(metrics(scenario("independent"), Fraction(95, 100)),
                         (Fraction(12), Fraction(60), Fraction(72)))
        self.assertEqual(metrics(scenario("clustered"), Fraction(95, 100)),
                         (Fraction(12), Fraction(120), Fraction(120)))

    def test_wrong_way_exposure(self):
        self.assertEqual(metrics(scenario("wrong-way"), Fraction(95, 100)),
                         (Fraction(6), Fraction(60), Fraction(60)))

    def test_boundary_atom_and_ties(self):
        x = [(Fraction(3, 4), Fraction(0)),
             (Fraction(1, 8), Fraction(60)),
             (Fraction(1, 8), Fraction(60))]
        self.assertEqual(metrics(x, Fraction(3, 4)),
                         (Fraction(15), Fraction(0), Fraction(60)))

    def test_invalid_input(self):
        for alpha in (Fraction(0), Fraction(1), Fraction(-1, 2)):
            with self.assertRaises(ValueError):
                metrics(scenario("single"), alpha)
        with self.assertRaises(ValueError):
            metrics([(Fraction(1, 2), Fraction(60))], Fraction(95, 100))
        with self.assertRaises(ValueError):
            metrics([(Fraction(-1, 2), Fraction(60)),
                     (Fraction(3, 2), Fraction(0))], Fraction(95, 100))


if __name__ == "__main__":
    unittest.main()
