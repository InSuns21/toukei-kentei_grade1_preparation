"""Run from the chapter directory: python -m unittest discover -s assets/tests -v."""
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from american_binomial import Model, american, european, enumerate_stopping_values


class AmericanBinomialTests(unittest.TestCase):
    def setUp(self):
        self.m = Model(100.0, 1.2, 0.8, 1.05, 100.0, 2, "put")

    def test_two_step_exact_fraction_oracles(self):
        y, c, ex = american(self.m)
        self.assertAlmostEqual(self.m.q, 5 / 8)
        self.assertAlmostEqual(y[0][0], 1175 / 147)
        self.assertAlmostEqual(european(self.m), 925 / 147)
        self.assertAlmostEqual(c[1][0], 320 / 21)
        self.assertAlmostEqual(c[1][1], 10 / 7)
        self.assertTrue(ex[1][0])   # down at t=1
        self.assertFalse(ex[1][1])  # up at t=1

    def test_exhaustive_stopping_oracle(self):
        for n in range(4):
            for option in ("put", "call"):
                with self.subTest(n=n, option=option):
                    m = Model(100, 1.2, 0.8, 1.05, 110, n, option)
                    optimal = american(m)[0][0][0]
                    self.assertAlmostEqual(optimal, max(enumerate_stopping_values(m)))
                    self.assertGreaterEqual(optimal + 1e-10, european(m))

    def test_immediate_exercise(self):
        m = Model(100, 1.2, 0.8, 1.05, 120, 1, "put")
        values, _, flags = american(m)
        self.assertTrue(flags[0][0])
        self.assertAlmostEqual(values[0][0], 20)
        self.assertAlmostEqual(european(m), 100 / 7)

    def test_zero_strike_and_expiry(self):
        for option in ("put", "call"):
            m = Model(100, 1.2, 0.8, 1.0, 0.0, 0, option)
            self.assertEqual(american(m)[0][0][0], m.payoff(0, 0))
            self.assertEqual(european(m), m.payoff(0, 0))
        m = Model(100, 1.2, 0.8, 1.0, 0, 2, "put")
        self.assertEqual(american(m)[0][0][0], 0)
        self.assertTrue(american(m)[2][0][0])  # exercise ties at t=0

    def test_invalid_market(self):
        bad = [(100, 1.2, 0.8, 1.2, 100, 2), (100, 1.2, 0.8, 0.8, 100, 2),
               (0, 1.2, 0.8, 1.05, 100, 2), (100, 1.2, 0.8, 1.05, -1, 2)]
        for args in bad:
            with self.subTest(args=args), self.assertRaises(ValueError):
                Model(*args)

    def test_oracle_limit(self):
        with self.assertRaises(ValueError):
            enumerate_stopping_values(Model(100, 1.2, 0.8, 1.05, 100, 4))


if __name__ == "__main__":
    unittest.main()
