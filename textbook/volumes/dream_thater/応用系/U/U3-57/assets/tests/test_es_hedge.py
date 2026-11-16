"""Run: python -m unittest discover -s assets/tests -v (from chapter directory)."""
import sys
import unittest
from fractions import Fraction as F
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from es_hedge import BASE, candidates, objective, optimize, scenario_losses, tail_es


class TestFiniteScenarioHedge(unittest.TestCase):
    def test_unhedged(self):
        self.assertEqual(tail_es(BASE)[0], F(20))
        self.assertEqual(tail_es(BASE)[1], (F(0), F(0), F(1, 2), F(1, 2)))

    def test_optimal_and_atom(self):
        value, x = optimize()
        self.assertEqual(x, F(4, 3))
        self.assertEqual(scenario_losses(x), (F(0), F(8), F(64, 3), F(8)))
        self.assertEqual(tail_es(scenario_losses(x))[0], F(44, 3))
        self.assertEqual(value, F(16))
        self.assertEqual(value, objective(x))
        self.assertEqual(candidates(F(2)), [F(0), F(1, 2), F(4, 3), F(2)])

    def test_capacity_and_expensive_hedge(self):
        self.assertEqual(optimize(cap=F(1)), (F(17), F(1)))
        self.assertEqual(optimize(cost=F(5)), (F(20), F(0)))

    def test_tail_level_changes_optimum(self):
        self.assertEqual(optimize(alpha=F(3, 4)), (F(37, 2), F(1, 2)))

    def test_probability_ties_and_invalid_inputs(self):
        losses = (F(0), F(8), F(64, 3), F(8))
        self.assertEqual(tail_es(losses)[0], F(44, 3))
        self.assertEqual(sum(tail_es(losses)[1]), F(1))
        with self.assertRaises(ValueError):
            tail_es(losses, alpha=F(1))
        with self.assertRaises(ValueError):
            tail_es(losses, probabilities=(F(1, 2),) * 4)
        with self.assertRaises(ValueError):
            optimize(cost=F(-1))
        with self.assertRaises(ValueError):
            optimize(cap=F(-1))


if __name__ == "__main__":
    unittest.main()
