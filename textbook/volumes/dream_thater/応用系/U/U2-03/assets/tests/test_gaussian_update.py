"""Independent exact checks of the U2-03 numerical examples."""

import importlib.util
from fractions import Fraction as F
from pathlib import Path
import unittest

FILE = Path(__file__).resolve().parents[1] / "gaussian_update.py"
spec = importlib.util.spec_from_file_location("u203_gaussian_update", FILE)
gaussian = importlib.util.module_from_spec(spec)
spec.loader.exec_module(gaussian)


class TestGaussianUpdate(unittest.TestCase):
    def test_scalar_by_square_completion(self):
        result = gaussian.update(*gaussian.scenario("scalar"))
        self.assertEqual(result[0], (F(22, 5),))
        self.assertEqual(result[1], ((F(4, 5),),))
        self.assertEqual(result[2], ((F(5, 4),),))

    def test_plane_with_negative_cross_covariance(self):
        mean, covariance, precision = gaussian.update(*gaussian.scenario("plane"))
        self.assertEqual(mean, (F(2), F(1, 2)))
        self.assertEqual(
            covariance, ((F(4, 3), -F(2, 3)), (-F(2, 3), F(5, 6)))
        )
        self.assertEqual(precision, ((F(5, 4), F(1)), (F(1), F(2))))
        self.assertEqual(gaussian.product(precision, covariance),
                         ((F(1), F(0)), (F(0), F(1))))

    def test_blind_sensor_leaves_belief_unchanged(self):
        mean, covariance, _ = gaussian.update(*gaussian.scenario("blind"))
        self.assertEqual(mean, (F(-1),))
        self.assertEqual(covariance, ((F(2),),))

    def test_degenerate_prior_is_rejected(self):
        with self.assertRaisesRegex(ValueError, "positive definite"):
            gaussian.update(
                (F(0), F(2)),
                ((F(1), F(0)), (F(0), F(0))),
                ((F(0), F(1)),),
                ((F(1),),),
                (F(3),),
            )

    def test_rank_deficient_sensor_valid_when_prior_positive(self):
        mean, covariance, _ = gaussian.update(
            (F(0), F(0)),
            ((F(1), F(0)), (F(0), F(1))),
            ((F(0), F(1)),),
            ((F(1),),),
            (F(4),),
        )
        self.assertEqual(mean, (F(0), F(2)))
        self.assertEqual(covariance, ((F(1), F(0)), (F(0), F(1, 2))))


if __name__ == "__main__":
    unittest.main()
