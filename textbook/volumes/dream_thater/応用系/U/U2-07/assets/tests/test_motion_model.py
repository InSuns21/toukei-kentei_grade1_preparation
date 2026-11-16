"""Reproducible U2-07 regression tests: python -m unittest discover -s .../assets/tests."""
import importlib.util
import math
from pathlib import Path
import unittest

SOURCE = Path(__file__).resolve().parents[1] / "motion_model.py"
SPEC = importlib.util.spec_from_file_location("u2_07_motion", SOURCE)
motion = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(motion)


class MotionModelTest(unittest.TestCase):
    def test_wheel_equations_and_units(self):
        v, omega = motion.wheels_to_twist(0.1, 0.5, 10, 14)
        self.assertAlmostEqual(v, 1.2)
        self.assertAlmostEqual(omega, 0.8)
        self.assertAlmostEqual(v - 0.25 * omega, 1.0)
        self.assertAlmostEqual(v + 0.25 * omega, 1.4)
        with self.assertRaises(ValueError):
            motion.wheels_to_twist(0.1, 0, 10, 14)

    def test_arc_exact_vs_euler(self):
        dt = math.pi / 2
        arc = motion.exact_step((0, 0, 0), 1, 1, dt)
        euler = motion.euler_step((0, 0, 0), 1, 1, dt)
        self.assertAlmostEqual(arc[0], 1)
        self.assertAlmostEqual(arc[1], 1)
        self.assertAlmostEqual(euler[0], dt)
        self.assertAlmostEqual(euler[1], 0)
        self.assertAlmostEqual(arc[2], dt)

    def test_straight_and_small_turn_continuity(self):
        pose = (3.0, 4.0, -0.3)
        straight = motion.exact_step(pose, 2, 0, 0.5)
        nearly = motion.exact_step(pose, 2, 1e-10, 0.5)
        for a, b in zip(straight, nearly):
            self.assertAlmostEqual(a, b, places=8)

    def test_odometry_relative_coordinate(self):
        out = motion.odometry_step((1, 1, math.pi / 2), (0, 2), math.pi / 2)
        self.assertAlmostEqual(out[0], -1)
        self.assertAlmostEqual(out[1], 1)
        self.assertAlmostEqual(out[2], -math.pi)
        pure_rotation = motion.odometry_to_three_stage((0, 0), math.pi / 2)
        self.assertEqual(pure_rotation[0:2], (0.0, 0.0))
        self.assertAlmostEqual(pure_rotation[2], math.pi / 2)

    def test_body_noise_rotation(self):
        q = motion.body_noise_to_world(motion.diag(0.09, 0.01), math.pi / 2)
        self.assertAlmostEqual(q[0][0], 0.01)
        self.assertAlmostEqual(q[1][1], 0.09)
        self.assertAlmostEqual(q[0][1], 0)
        self.assertAlmostEqual(q[1][0], 0)

    def test_covariance_matches_independent_manual_product(self):
        f, g, q = motion.covariance_predict(
            motion.diag(0.04, 0.09, 0.01),
            motion.diag(0.25, 0.04), 0, 2, 1
        )
        self.assertAlmostEqual(f[1][2], 2.0)
        self.assertAlmostEqual(g[2][1], 1.0)
        expected = [[0.29, 0, 0], [0, 0.13, 0.02], [0, 0.02, 0.05]]
        for row, target in zip(q, expected):
            for a, b in zip(row, target):
                self.assertAlmostEqual(a, b)

    def test_north_facing_covariance(self):
        _, _, p = motion.covariance_predict(
            motion.diag(0.04, 0.09, 0.01),
            motion.diag(0.04, 0.01), math.pi / 2, 1, 1
        )
        expected = [[0.05, 0, -0.01], [0, 0.13, 0], [-0.01, 0, 0.02]]
        for row, target in zip(p, expected):
            for a, b in zip(row, target):
                self.assertAlmostEqual(a, b)

    def test_euler_jacobians_numerical_derivative(self):
        pose = (2.0, 3.0, 0.5)
        v, omega, dt = 1.2, 0.3, 0.1
        f, g = motion.euler_linearization(pose[2], v, dt)
        eps = 1e-6
        args = [*pose, v, omega]

        def evaluate(values):
            return motion.euler_step(values[:3], values[3], values[4], dt)

        for i in range(5):
            plus, minus = args.copy(), args.copy()
            plus[i] += eps
            minus[i] -= eps
            finite_diff = [(a-b)/(2*eps)
                           for a, b in zip(evaluate(plus), evaluate(minus))]
            for output in range(3):
                expected = f[output][i] if i < 3 else g[output][i-3]
                self.assertAlmostEqual(finite_diff[output], expected, places=6)

    def test_invalid_dimensions(self):
        with self.assertRaises(ValueError):
            motion.covariance_predict([[1, 0], [0, 1]], motion.diag(1, 1), 0, 1, 1)
        with self.assertRaises(ValueError):
            motion.covariance_predict(motion.diag(1, 1, 1), motion.diag(1, 1, 1), 0, 1, 1)
        with self.assertRaises(ValueError):
            motion.euler_step((0, 0, 0), 1, 0, 0)

    def test_wrap_endpoint(self):
        self.assertAlmostEqual(motion.wrap(math.pi), -math.pi)
        self.assertGreaterEqual(motion.wrap(-179 * math.pi / 180 - 179 * math.pi / 180), 0)


if __name__ == "__main__":
    unittest.main()
