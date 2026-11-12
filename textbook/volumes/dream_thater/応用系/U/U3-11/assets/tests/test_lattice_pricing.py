"""Run: python3 -m unittest discover -s assets/tests -v"""
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from lattice_pricing import parameters, price, square_closed_form, benchmark


class LatticeTests(unittest.TestCase):
    def test_probabilities_and_discounted_martingale(self):
        for n in (1, 2, 8, 32):
            for model in ("crr", "tri"):
                u, d, R, p = parameters(n, 1., 0., .2, model)
                self.assertTrue(all(0 < x < 1 for x in p))
                self.assertAlmostEqual(sum(p), 1., places=13)
                mean = p[0]*d + p[-1]*u + (p[1] if model == "tri" else 0)
                self.assertAlmostEqual(mean, R, places=13)

    def test_tree_and_independent_moment_method(self):
        for n in (1, 2, 3, 4, 8, 20):
            for model in ("crr", "tri"):
                x = price(n, 100, 1, .02, .2, model)
                y = square_closed_form(n, 100, 1, .02, .2, model)
                self.assertAlmostEqual(x, y, delta=1e-8)

    def test_call_boundary_and_nonnegative(self):
        for model in ("crr", "tri"):
            self.assertEqual(price(2, model=model, payoff="call", K=1e6), 0.0)
            self.assertGreaterEqual(price(8, model=model, payoff="call", K=100), 0.0)
            self.assertAlmostEqual(price(4, model=model, payoff="call", K=0), 100.0, places=9)

    def test_invalid_probability_ranges(self):
        for model in ("crr", "tri"):
            with self.assertRaises(ValueError):
                parameters(1, 1, 2., .1, model)
            with self.assertRaises(ValueError):
                parameters(0, 1, 0., .2, model)
        with self.assertRaises(ValueError):
            price(2, s0=0)

    def test_refinement_error_quadratic_claim(self):
        oracle = benchmark(100, 1, 0, .2)
        for model in ("crr", "tri"):
            errors = [abs(price(n, model=model)-oracle) for n in (8, 16, 32)]
            self.assertTrue(errors[0] > errors[1] > errors[2] > 0)
            self.assertTrue(1.8 < errors[0]/errors[1] < 2.2)


if __name__ == "__main__":
    unittest.main()
