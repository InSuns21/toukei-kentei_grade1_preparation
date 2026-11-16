"""U2-05: independent exact arithmetic checks of Kalman measurement update."""
import importlib.util
from fractions import Fraction as F
from pathlib import Path
import unittest

FILE = Path(__file__).resolve().parents[1] / "kalman_update.py"
spec = importlib.util.spec_from_file_location("u205_kalman_update", FILE)
lab = importlib.util.module_from_spec(spec)
spec.loader.exec_module(lab)


class TestKalmanUpdate(unittest.TestCase):
    def test_scalar_innovation_gain_and_posterior(self):
        a = lab.scalar()
        self.assertEqual(a["innovation"], (F(3),))
        self.assertEqual(a["S"], ((F(5),),))
        self.assertEqual(a["K"], ((F(4, 5),),))
        self.assertEqual(a["mean"], (F(22, 5),))
        self.assertEqual(a["covariance"], ((F(4, 5),),))

    def test_planar_sum_observation(self):
        a = lab.plane()
        self.assertEqual(a["S"], ((F(6),),))
        self.assertEqual(a["K"], ((F(2, 3),), (F(1, 6),)))
        self.assertEqual(a["mean"], (F(2), F(1, 2)))
        self.assertEqual(a["covariance"], ((F(4, 3), F(-2, 3)),
                                           (F(-2, 3), F(5, 6))))
        self.assertEqual(lab.det(a["covariance"]), F(2, 3))

    def test_joseph_in_1d_with_nonunit_sensor(self):
        a = lab.update((F(0),), ((F(3),),), ((F(2),),),
                       ((F(4),),), (F(5),))
        self.assertEqual(a["S"], ((F(16),),))
        self.assertEqual(a["K"], ((F(3, 8),),))
        self.assertEqual(a["covariance"], ((F(3, 4),),))
        self.assertEqual(a["joseph"], a["information_covariance"])

    def test_correlated_unmeasured_coordinate_is_updated(self):
        a = lab.update((F(0), F(0)),
                       ((F(2), F(1)), (F(1), F(2))),
                       ((F(1), F(0)),), ((F(1),),), (F(3),))
        self.assertEqual(a["K"], ((F(2, 3),), (F(1, 3),)))
        self.assertEqual(a["mean"], (F(2), F(1)))
        self.assertEqual(a["covariance"],
                         ((F(2, 3), F(1, 3)),
                          (F(1, 3), F(5, 3))))

    def test_unobservable_h_zero_does_not_update(self):
        a = lab.update((F(1), F(-1)),
                       ((F(2), F(0)), (F(0), F(1))),
                       ((F(0), F(0)),), ((F(1, 10),),), (F(300),))
        self.assertEqual(a["K"], ((F(0),), (F(0),)))
        self.assertEqual(a["mean"], (F(1), F(-1)))
        self.assertEqual(a["covariance"],
                         ((F(2), F(0)), (F(0), F(1))))

    def test_covariance_independent_of_observed_value(self):
        a = lab.scalar(measured=F(5))
        b = lab.scalar(measured=F(100))
        self.assertEqual(a["covariance"], b["covariance"])
        self.assertEqual(b["mean"], (F(402, 5),))

    def test_noise_controls_weight_and_limit(self):
        tight = lab.scalar(noise_variance=F(1, 10))
        loose = lab.scalar(noise_variance=F(100))
        self.assertGreater(tight["K"][0][0], loose["K"][0][0])
        self.assertLess(tight["covariance"][0][0], loose["covariance"][0][0])
        self.assertEqual(loose["K"], ((F(1, 26),),))

    def test_c01_position_velocity_predict_then_update(self):
        a = lab.update((F(0), F(0)),
                       ((F(3), F(1)), (F(1), F(1))),
                       ((F(1), F(0)),), ((F(1),),), (F(2),))
        self.assertEqual(a["innovation"], (F(2),))
        self.assertEqual(a["S"], ((F(4),),))
        self.assertEqual(a["K"], ((F(3, 4),), (F(1, 4),)))
        self.assertEqual(a["mean"], (F(3, 2), F(1, 2)))
        self.assertEqual(a["covariance"],
                         ((F(3, 4), F(1, 4)), (F(1, 4), F(3, 4))))
        v = (F(1), F(-3))
        self.assertEqual(lab.matvec(a["contraction"], v), (F(0), F(0)))

    def test_invalid_covariances_rejected(self):
        with self.assertRaisesRegex(ValueError, "positive definite"):
            lab.scalar(noise_variance=F(0))
        with self.assertRaisesRegex(ValueError, "positive definite"):
            lab.update((F(0), F(0)),
                       ((F(1), F(2)), (F(2), F(1))),
                       ((F(1), F(0)),), ((F(1),),), (F(0),))

    def test_invalid_dimensions_rejected(self):
        with self.assertRaisesRegex(ValueError, "dimensions"):
            lab.update((F(0), F(0)),
                       ((F(1), F(0)), (F(0), F(1))),
                       ((F(1),),), ((F(1),),), (F(0),))

    def test_direct_self_test_scenarios(self):
        lab.self_test()


if __name__ == "__main__":
    unittest.main()
