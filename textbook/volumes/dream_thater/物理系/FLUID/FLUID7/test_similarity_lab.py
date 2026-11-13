"""FLUID7 scale relation regression and limiting-case tests."""
import math
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from similarity_lab import similarity


class SimilarityTests(unittest.TestCase):
    def test_same_fluid_re_matching(self):
        r = similarity(0.1, match="re")
        scales = r["scale_ratios_model_over_prototype"]
        groups = r["dimensionless_ratios_model_over_prototype"]
        self.assertAlmostEqual(scales["U"], 10.0)
        self.assertAlmostEqual(scales["T"], 0.01)
        self.assertAlmostEqual(groups["Re"], 1.0)
        self.assertAlmostEqual(groups["Fr"], math.sqrt(1000.0))
        self.assertAlmostEqual(groups["We"], 10.0)
        self.assertAlmostEqual(groups["Ma"], 10.0)
        self.assertAlmostEqual(groups["St"], 1.0)

    def test_same_fluid_fr_matching(self):
        r = similarity(0.1, match="fr")
        groups = r["dimensionless_ratios_model_over_prototype"]
        self.assertAlmostEqual(groups["Fr"], 1.0)
        self.assertAlmostEqual(groups["Re"], 0.1 ** 1.5)
        self.assertAlmostEqual(groups["We"], 0.1 ** 2)

    def test_surface_tension_reengineering(self):
        # lambda=1/9, Fr requires U ratio 1/3; matching Re, We, Ma
        # then requires eta ratio 1/27, gamma ratio 1/81, c ratio 1/3.
        r = similarity(
            1/9, match="fr", viscosity_ratio=1/27,
            tension_ratio=1/81, sound_ratio=1/3
        )
        for v in r["dimensionless_ratios_model_over_prototype"].values():
            self.assertAlmostEqual(v, 1.0)

    def test_unmatched_time_scale(self):
        r = similarity(0.1, match="re", time_ratio=1.0)
        self.assertAlmostEqual(r["dimensionless_ratios_model_over_prototype"]["St"], 0.01)

    def test_invalid_parameter(self):
        with self.assertRaises(ValueError):
            similarity(0)
        with self.assertRaises(ValueError):
            similarity(0.1, match="unknown")


if __name__ == "__main__":
    unittest.main()
