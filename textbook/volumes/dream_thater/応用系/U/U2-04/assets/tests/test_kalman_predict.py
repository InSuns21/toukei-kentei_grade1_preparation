"""U2-04: independent arithmetic checks of every numerical scenario."""
import importlib.util
from fractions import Fraction as R
from pathlib import Path
import unittest

FILE = Path(__file__).resolve().parents[1] / "kalman_predict.py"
spec = importlib.util.spec_from_file_location("u204_predict", FILE)
lab = importlib.util.module_from_spec(spec)
spec.loader.exec_module(lab)


class TestKalmanPrediction(unittest.TestCase):
    def test_two_step_scalar_time_indices(self):
        # Independent derivation: m1=2+3=5; P1=4+1=5;
        # then m2=5-1=4; P2=5+2=7.
        self.assertEqual(lab.scenario("scalar"), ((R(4),), ((R(7),),)))

    def test_kinematic_cross_covariance(self):
        mean, p = lab.scenario("kinematic")
        self.assertEqual(mean, (R(2), R(3)))
        self.assertEqual(p, ((R(6), R(3)), (R(3), R(5))))
        self.assertEqual(lab.determinant(p), R(21))
        self.assertTrue(lab.symmetric_positive(p, strict=True))
        self.assertEqual(p[0][1], R(1) + R(2))

    def test_rank_collapse_without_process_noise(self):
        mean, p = lab.scenario("singular")
        self.assertEqual(mean, (R(1),))
        self.assertEqual(p, ((R(0),),))
        self.assertTrue(lab.symmetric_positive(p, strict=False))
        self.assertFalse(lab.symmetric_positive(p, strict=True))

    def test_scalar_scaling_squares_transition(self):
        mean, p = lab.predict(
            (R(1),), ((R(4),),), ((R(2),),), ((R(1),),),
            (R(3),), ((R(1),),)
        )
        self.assertEqual(mean, (R(5),))
        self.assertEqual(p, ((R(17),),))

    def test_nonzero_offset_changes_mean_not_covariance(self):
        args = ((R(0),), ((R(1),),), ((R(1),),), ((R(1),),),
                (R(2),), ((R(3),),))
        baseline = lab.predict(*args)
        shifted = lab.predict(*args, offset=(R(7),))
        self.assertEqual(baseline, ((R(2),), ((R(4),),)))
        self.assertEqual(shifted, ((R(9),), ((R(4),),)))

    def test_invalid_noise_covariance_rejected(self):
        with self.assertRaisesRegex(ValueError, "positive semidefinite"):
            lab.predict((R(0),), ((R(1),),), ((R(1),),),
                        ((R(1),),), (R(0),), ((R(-1),),))
        with self.assertRaisesRegex(ValueError, "positive semidefinite"):
            lab.predict((R(0), R(0)), ((R(1), R(0)), (R(0), R(1))),
                        ((R(1), R(0)), (R(0), R(1))),
                        ((R(0),), (R(0),)), (R(0),),
                        ((R(1), R(2)), (R(2), R(1))))

    def test_invalid_prior_covariance_rejected(self):
        with self.assertRaisesRegex(ValueError, "positive definite"):
            lab.predict((R(0),), ((R(0),),), ((R(1),),),
                        ((R(1),),), (R(0),), ((R(0),),))

    def test_bad_dimension_rejected(self):
        with self.assertRaisesRegex(ValueError, "shapes"):
            lab.predict((R(0),), ((R(1),),), ((R(1), R(0)),),
                        ((R(1),),), (R(0),), ((R(0),),))

    def test_psd_correlated_components(self):
        q = ((R(1), R(2)), (R(2), R(4)))
        self.assertEqual(lab.determinant(q), R(0))
        self.assertTrue(lab.symmetric_positive(q, strict=False))
        self.assertFalse(lab.symmetric_positive(q, strict=True))

    def test_symmetric_two_dimensional_P(self):
        p = ((R(4), R(1)), (R(1), R(2)))
        f = ((R(1), R(2)), (R(0), R(1)))
        mean, pred = lab.predict((R(0), R(0)), p, f,
                                 ((R(0),), (R(0),)), (R(0),),
                                 ((R(0), R(0)), (R(0), R(0))))
        # FP F^T = [[4+4+8,1+4],[1+4,2]] = [[16,5],[5,2]]
        self.assertEqual(pred, ((R(16), R(5)), (R(5), R(2))))
        self.assertEqual(mean, (R(0), R(0)))


if __name__ == "__main__":
    unittest.main()
