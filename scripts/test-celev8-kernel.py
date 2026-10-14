"""Headless mathematical and implementation regression checks for CELEV8.

Execute with CPython: python3 scripts/test-celev8-kernel.py
"""
import math
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] /
    "pages" / "simulation" / "engines" / "celev"))
import celev_kernel as ce


class CELEV8KernelTests(unittest.TestCase):
    def test_newton_pair_force_and_guard(self):
        m = [1.0, 2.0, 3.0]
        p = [[-1, 0], [1, 0], [0, 2]]
        a = ce.acceleration(p, m)
        for d in range(2):
            self.assertLess(abs(sum(m[i] * a[i][d] for i in range(3))), 1e-12)
        with self.assertRaises(ValueError):
            ce.acceleration([[0, 0], [0, 0]], [1, 1])

    def test_two_body_analytic_benchmark_and_dt(self):
        period = 2 * math.pi / math.sqrt(2)
        records = []
        for h in (0.002, 0.001):
            state = ce.initialize("two-body", dt=h)
            diag = ce.diagnostics(state)
            self.assertAlmostEqual(diag["energy"], -0.5, places=12)
            self.assertAlmostEqual(diag["angularMomentum"], 1 / math.sqrt(2), places=12)
            self.assertAlmostEqual(diag["momentum"][0], 0.0, places=12)
            n = round(period / h)
            for step in range(n):
                state = ce.verlet_step(state)
            diag = ce.diagnostics(state)
            self.assertLess(abs(diag["energy"] + 0.5), 1e-4)
            self.assertLess(abs(diag["momentum"][0]), 1e-10)
            self.assertLess(abs(diag["momentum"][1]), 1e-10)
            records.append(max(math.dist(state["positions"][i], state["initialPositions"][i])
                               for i in range(2)))
        # End-point time is rounded to n*h, so strict order-two convergence of
        # the closure error cannot be inferred from these unequal end times.
        self.assertLess(max(records), 0.002)

    def test_triangle_and_figure_eight_initial_momenta(self):
        for kind in ("triangle", "figure-eight"):
            state = ce.initialize(kind)
            d = ce.diagnostics(state)
            self.assertLess(math.hypot(*d["centerOfMass"]), 1e-10)
            self.assertLess(math.hypot(*d["momentum"]), 1e-10)
            one = ce.integrate_batch(state, 8)
            self.assertEqual(one["state"]["stepIndex"], 8)
            self.assertEqual(len(one["diagnostics"]["momentum"]), 2)
        with self.assertRaises(ValueError):
            ce.initialize("figure-eight", dt=0.2)

    def test_gradient_matches_finite_difference(self):
        path = ce.initial_path(24, 1.1, 0.4, phase=0.17)
        T = 6.3259
        g = ce.gradient(path, T)
        eps = 1e-6
        for k, i, d in [(0, 0, 0), (1, 2, 1), (7, 1, 0)]:
            plus = [[p[:] for p in frame] for frame in path]
            minus = [[p[:] for p in frame] for frame in path]
            plus[k][i][d] += eps
            minus[k][i][d] -= eps
            numerical = (ce.action(plus, T) - ce.action(minus, T)) / (2*eps)
            self.assertAlmostEqual(g[k][i][d], numerical, delta=3e-5)

    def test_projection_constraints_and_idempotence(self):
        N = 24
        path = ce.initial_path(N, 1.0, 0.35)
        self.assertLess(ce.max_constraint_violation(path), 1e-12)
        projected = ce.project_path(path)
        for k in range(N):
            for i in range(3):
                for d in range(2):
                    self.assertAlmostEqual(projected[k][i][d], path[k][i][d], places=12)
        perturbed = [[p[:] for p in frame] for frame in path]
        perturbed[1][1][0] += 0.03
        projected = ce.project_path(perturbed)
        self.assertLess(ce.max_constraint_violation(projected), 1e-12)
        self.assertGreater(ce.max_constraint_violation(perturbed), 1e-4)

    def test_variational_descent_and_candidate_newton_integration(self):
        path = ce.initial_path(24, 1.0, 0.35)
        T = 6.3259
        before = ce.action(path, T)
        result = ce.optimize_batch(path, T, iterations=3)
        self.assertLessEqual(result["action"], before + 1e-10)
        self.assertLess(result["constraintViolation"], 1e-10)
        self.assertGreater(result["minimumDistance"], ce.DISTANCE_FLOOR)
        state = ce.candidate_initial_state(result["path"], T)
        start = ce.diagnostics(state)["energy"]
        next_state = ce.integrate_batch(state, 5)
        self.assertEqual(next_state["state"]["stepIndex"], 5)
        self.assertTrue(math.isfinite(next_state["diagnostics"]["energyDrift"]))
        self.assertLess(abs(next_state["diagnostics"]["energy"] - start), 0.1)
        self.assertGreaterEqual(result["newtonResidual"], 0)

    def test_physical_parameters_modify_trajectory(self):
        a = ce.initialize("two-body", dt=0.01)
        b = ce.initialize("two-body", dt=0.01, velocity_scale=1.05)
        pa = ce.integrate_batch(a, 100)["state"]["positions"]
        pb = ce.integrate_batch(b, 100)["state"]["positions"]
        self.assertGreater(math.dist(pa[0], pb[0]), 1e-3)

    def test_reversible_kick_drift_kick(self):
        s = ce.initialize("two-body", dt=0.005)
        next_s = ce.verlet_step(s)
        reverse = dict(next_s, dt=0.005,
                       velocities=[[-v for v in pair] for pair in next_s["velocities"]])
        original = ce.verlet_step(reverse)
        for x, y in zip(original["positions"], s["positions"]):
            self.assertLess(math.dist(x, y), 1e-10)


if __name__ == "__main__":
    unittest.main(verbosity=2)
