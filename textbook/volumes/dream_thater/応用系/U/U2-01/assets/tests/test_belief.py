"""Unit tests for U2-01's exact arithmetic and boundary conditions."""

import importlib.util
from fractions import Fraction as F
from pathlib import Path
import unittest

SOURCE = Path(__file__).resolve().parents[1] / "belief.py"
SPEC = importlib.util.spec_from_file_location("u2_belief", SOURCE)
assert SPEC is not None and SPEC.loader is not None
belief = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(belief)


class TestBelief(unittest.TestCase):
    def test_three_locations(self):
        names, p, likelihood = belief.scenario("three")
        self.assertEqual(names, ("L", "M", "R"))
        self.assertEqual(belief.update(p, likelihood), (
            F(11, 24), (F(3, 11), F(6, 11), F(2, 11))))

    def test_same_observation_different_priors(self):
        _, p1, l1 = belief.scenario("prior-left")
        _, p2, l2 = belief.scenario("prior-right")
        self.assertEqual(belief.update(p1, l1), (
            F(13, 20), (F(12, 13), F(1, 13))))
        self.assertEqual(belief.update(p2, l2), (
            F(7, 20), (F(3, 7), F(4, 7))))

    def test_zero_evidence(self):
        _, p, likelihood = belief.scenario("impossible")
        with self.assertRaisesRegex(ValueError, "probability zero"):
            belief.update(p, likelihood)

    def test_invalid_input(self):
        for p, likelihood in [
            ((F(1, 2), F(1, 2)), (F(1),)),
            ((F(1, 3), F(1, 3)), (F(1), F(1))),
            ((F(-1), F(2)), (F(1), F(1))),
            ((F(1, 2), F(1, 2)), (F(2), F(0))),
        ]:
            with self.subTest(p=p, likelihood=likelihood):
                with self.assertRaises(ValueError):
                    belief.update(p, likelihood)

    def test_zero_prior_stays_zero(self):
        self.assertEqual(
            belief.update((F(1), F(0)), (F(1, 4), F(1))),
            (F(1, 4), (F(1), F(0))))


if __name__ == "__main__":
    unittest.main()
