"""Exact arithmetic tests for U2-02 prediction, update, and edge cases."""

import importlib.util
from fractions import Fraction as F
from pathlib import Path
import unittest

SOURCE = Path(__file__).resolve().parents[1] / "bayes_filter.py"
SPEC = importlib.util.spec_from_file_location("u2_bayes_filter", SOURCE)
assert SPEC is not None and SPEC.loader is not None
filtering = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(filtering)


class TestBayesFilter(unittest.TestCase):
    def test_one_step_prediction_and_update(self):
        prior, transition, likelihood, _ = filtering.scenario("flip")
        self.assertEqual(filtering.step(prior, transition, likelihood), (
            (F(5, 8), F(3, 8)), F(17, 40), (F(5, 17), F(12, 17))
        ))

    def test_second_step(self):
        prior, transition, likelihood, _ = filtering.scenario("two-steps")
        _, _, posterior = filtering.step(prior, transition, likelihood)
        self.assertEqual(filtering.step(posterior, transition, likelihood), (
            (F(27, 68), F(41, 68)),
            F(191, 340),
            (F(27, 191), F(164, 191)),
        ))

    def test_no_motion_is_not_a_prediction(self):
        prior, transition, likelihood, _ = filtering.scenario("no-motion")
        self.assertEqual(filtering.step(prior, transition, likelihood), (
            (F(3, 4), F(1, 4)), F(7, 20), (F(3, 7), F(4, 7))
        ))

    def test_zero_prior_rescued_by_motion(self):
        prior, transition, likelihood, _ = filtering.scenario("rescue")
        self.assertEqual(filtering.step(prior, transition, likelihood), (
            (F(3, 4), F(1, 4)), F(1, 4), (F(0), F(1))
        ))

    def test_zero_evidence_is_rejected(self):
        prior, transition, likelihood, _ = filtering.scenario("impossible")
        predicted = filtering.predict(prior, transition)
        with self.assertRaisesRegex(ValueError, "probability zero"):
            filtering.update(predicted, likelihood)

    def test_invalid_inputs(self):
        with self.assertRaises(ValueError):
            filtering.predict((), ())
        with self.assertRaises(ValueError):
            filtering.predict((F(1), F(0)), ((F(1), F(0)),))
        with self.assertRaises(ValueError):
            filtering.predict((F(1, 2), F(1, 2)), filtering.SYMMETRIC[:1])
        with self.assertRaises(ValueError):
            filtering.predict((F(-1), F(2)), filtering.SYMMETRIC)
        with self.assertRaises(ValueError):
            filtering.predict((F(1), F(0)), ((F(2), F(-1)), (F(0), F(1))))
        with self.assertRaises(ValueError):
            filtering.predict((F(1), F(0)), ((F(1, 2), F(1, 3)), (F(0), F(1))))
        with self.assertRaises(ValueError):
            filtering.update((F(1), F(0)), (F(2), F(0)))
        with self.assertRaises(ValueError):
            filtering.update((F(1), F(0)), (F(1),))

    def test_nonsymmetric_transition_rows_not_columns(self):
        transitions = ((F(1, 4), F(3, 4)), (F(1, 2), F(1, 2)))
        self.assertEqual(
            filtering.predict((F(3, 4), F(1, 4)), transitions),
            (F(5, 16), F(11, 16)),
        )


if __name__ == "__main__":
    unittest.main()
