"""U3 68-lecture course: cross-module pricing, risk and execution oracles.

All scenarios are synthetic. These regressions supplement, not replace,
a human audit of definitions, hypotheses, and chapter links.
"""
from __future__ import annotations

import importlib.util
import math
from pathlib import Path
from fractions import Fraction
from statistics import covariance, variance
import re
import sys
import unittest
from urllib.parse import unquote

U_ROOT = Path(__file__).resolve().parents[3]


def load_module(name: str, relative: str):
    spec = importlib.util.spec_from_file_location(name, U_ROOT / relative)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"cannot load {relative}")
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


lattice = load_module("u3_course_lattice", "U3-11/assets/lattice_pricing.py")
pricing = load_module("u3_course_bsm", "U3-18/assets/black_scholes_check.py")
risk = load_module("u3_course_es", "U3-57/assets/es_hedge.py")
execution = load_module("u3_course_tca", "U3-68/assets/execution_tca.py")


class U3CrossCourseIntegration(unittest.TestCase):
    """Compare independent course implementations on matched assumptions."""

    def test_q_pricing_closed_integral_two_trees_and_execution_quote(self):
        # Same European call, constant r and sigma, zero dividends, T=1.
        s = k = 100.0
        r, sigma, t = 0.02, 0.20, 1.0
        call, put = pricing.closed_form(s, k, r, sigma, t)
        call_integral, put_integral = pricing.integral_prices(s, k, r, sigma, t)
        call_crr, put_crr = pricing.crr_prices(s, k, r, sigma, t, 400)
        call_lattice = lattice.price(
            400, s0=s, T=t, r=r, sigma=sigma,
            model="crr", payoff="call", K=k,
        )
        call_tca = execution.black_scholes_call(s, k, r, sigma, t)
        self.assertAlmostEqual(call, call_integral, delta=1e-6)
        self.assertAlmostEqual(put, put_integral, delta=1e-6)
        self.assertAlmostEqual(call_crr, call_lattice, delta=1e-8)
        self.assertAlmostEqual(call, call_crr, delta=0.05)
        self.assertAlmostEqual(put, put_crr, delta=0.05)
        self.assertAlmostEqual(call, call_tca, delta=1e-10)
        self.assertAlmostEqual(call - put, s - k * math.exp(-r*t), delta=1e-10)

    def test_q_prices_inside_synthetic_p_market_are_not_p_probabilities(self):
        paths = execution.generate_paths(32, seed=20261119)
        again = execution.generate_paths(32, seed=20261119)
        self.assertEqual(paths, again)
        initial_q = pricing.closed_form(100, 100, 0.02, 0.20, 1.0)[0]
        self.assertTrue(all(abs(path.mids[0] - initial_q) < 1e-10 for path in paths))
        # Different P drift and Q financing rate imply different 1y stock means.
        self.assertNotAlmostEqual(100*math.exp(0.08), 100*math.exp(0.02), delta=0.01)

    def test_quantile_integral_expected_shortfall_and_boundary_atom(self):
        losses = [0.0, 0.0, 2.0, 4.0]
        var, es = execution.empirical_var_es(losses, alpha=0.625)
        exact, weights = risk.tail_es(
            tuple(Fraction(int(z)) for z in losses),
            probabilities=(Fraction(1, 4),)*4,
            alpha=Fraction(5, 8),
        )
        self.assertEqual(var, 2)
        self.assertEqual(exact, Fraction(10, 3))
        self.assertAlmostEqual(es, float(exact), delta=1e-12)
        self.assertEqual(sum(weights), 1)
        var_shift, es_shift = execution.empirical_var_es([z+3 for z in losses], 0.625)
        self.assertEqual(var_shift, 5)
        self.assertAlmostEqual(es_shift, float(Fraction(19, 3)), delta=1e-12)

    def test_cash_inventory_and_telescope_on_four_period_route(self):
        path = execution.Path((100.0, 99.0, 101.0, 100.0, 100.0),
                              (40, 40, 40, 40))
        result = execution.execute(path, "TWAP")
        self.assertEqual(result.orders, (3, 3, 3, 3))
        self.assertEqual(result.fills, (3, 3, 3, 3))
        self.assertEqual(result.inventory, (9, 6, 3, 0))
        self.assertAlmostEqual(result.cash, 1198.08, delta=1e-9)
        self.assertAlmostEqual(result.fees, 0.24, delta=1e-9)
        self.assertAlmostEqual(result.shortfall, 2.16, delta=1e-9)
        self.assertAlmostEqual(result.shortfall,
                               execution.telescoping_shortfall(path, result),
                               delta=1e-9)

    def test_order_invariance_does_not_imply_fill_invariance(self):
        same_history_low_capacity = execution.Path(
            (10.0, 9.0, 11.0, 10.0, 8.0), (8, 40, 40, 40))
        same_history_high_capacity = execution.Path(
            (10.0, 9.0, 11.0, 10.0, 8.0), (20, 40, 40, 40))
        low = execution.execute(same_history_low_capacity, "TWAP")
        high = execution.execute(same_history_high_capacity, "TWAP")
        self.assertEqual(low.orders[0], high.orders[0])
        self.assertNotEqual(low.fills[0], high.fills[0])
        self.assertNotEqual(low.inventory[0], high.inventory[0])
        base = execution.Path((10.0, 9.0, 11.0, 10.0, 8.0), (40,)*4)
        future_only = execution.Path((10.0, 9.0, 11.0, 10.0, 500.0),
                                     (40, 40, 40, 999))
        for name in execution.schedules():
            before = execution.execute(base, name)
            after = execution.execute(future_only, name)
            self.assertEqual(before.orders[:3], after.orders[:3])
            self.assertEqual(before.fills[:3], after.fills[:3])
            self.assertEqual(before.inventory[:3], after.inventory[:3])

    def test_manifest_metadata_prerequisites_and_published_toc(self):
        # One-time course closure check, not a substitute for reading the chapters.
        repo = U_ROOT.parents[4]
        manifest = (repo / "textbook/dream-theater-series/U3.yaml").read_text("utf-8")
        toc = (repo / "textbook/dream-theater-toc/070_応用系/075_mathematical-finance.md").read_text("utf-8")
        self.assertEqual(re.findall(r"\bid: (U3-\d{2}), path:", manifest),
                         [f"U3-{i:02d}" for i in range(1, 69)])
        self.assertEqual(len(re.findall(r"\bstatus: completed,", manifest)), 68)
        published = re.findall(r"\[U3-(\d{2})\b", toc)
        self.assertEqual(published, [f"{i:02d}" for i in range(1, 69)])
        for i in range(1, 69):
            cid = f"U3-{i:02d}"
            root = U_ROOT / cid
            chapter = (root / "chapter.yaml").read_text("utf-8")
            knowledge = (root / "knowledge.yaml").read_text("utf-8")
            body = (root / "index.md").read_text("utf-8")
            with self.subTest(chapter=cid):
                self.assertIn(f'id: "{cid}"', chapter)
                self.assertRegex(knowledge, rf"(?m)^chapter: {cid}$")
                a = re.search(r"(?m)^prerequisites: .*", chapter)
                b = re.search(r"(?m)^prerequisites: .*", knowledge)
                self.assertIsNotNone(a)
                self.assertIsNotNone(b)
                self.assertEqual(a.group(0), b.group(0))
                self.assertIn("learning_objectives:", chapter)
                self.assertIn("<!-- formal-statement-start -->", body)
                self.assertIn("<!-- proof-start -->", body)
                exercises = re.findall(r'<a id="ex-u3-\d{2}-[abc]\d+"', body)
                self.assertGreaterEqual(len(exercises), 8)
                solutions = len(re.findall(r"<!-- solution-start -->", body))
                if solutions != len(exercises):
                    # Legacy U3-11 writes all ten detailed solutions without markers.
                    self.assertEqual(solutions, 0)
                    self.assertEqual(
                        len(re.findall(r"\*\*詳細解答\*\*", body)), len(exercises)
                    )

    def test_all_u3_formal_anchor_links_from_chapter_bodies(self):
        # Resolve the actual destination and compare against its stable HTML id.
        import functools

        @functools.lru_cache(maxsize=None)
        def anchor_set(file: Path) -> frozenset[str]:
            content = file.read_text("utf-8")
            return frozenset(re.findall(r'<a id="([^"]+)"', content))

        stable = re.compile(r"^(?:def|thm|prop|lem|ex)-u3-\d{2}[-\w]*$")
        failures = []
        checked = 0
        for i in range(1, 69):
            source = U_ROOT / f"U3-{i:02d}" / "index.md"
            body = source.read_text("utf-8")
            for target in re.findall(r"\]\(([^)]+)\)", body):
                link, sep, fragment = target.partition("#")
                if not sep or not stable.match(fragment):
                    continue
                if link.startswith(("https://", "http://")):
                    continue
                destination = (source.parent / unquote(link)).resolve() if link else source
                if not destination.is_relative_to(U_ROOT) or destination.name != "index.md":
                    continue
                checked += 1
                if not destination.is_file() or fragment not in anchor_set(destination):
                    failures.append(f"{source.parent.name}: {target}")
        self.assertGreater(checked, 100, "U3 cross-chapter anchor audit is unexpectedly empty")
        self.assertEqual(failures, [], "missing U3 stable anchors: " + "; ".join(failures[:20]))

    def test_same_path_paired_difference_covariance_identity(self):
        paths = execution.generate_paths(40, seed=20261119)
        a = [execution.execute(p, "TWAP").shortfall for p in paths]
        b = [execution.execute(p, "forecast-VWAP").shortfall for p in paths]
        d = [x-y for x, y in zip(a, b)]
        self.assertAlmostEqual(variance(d),
                               variance(a)+variance(b)-2*covariance(a, b),
                               delta=1e-10)
        self.assertTrue(all(math.isfinite(x) for x in d))


if __name__ == "__main__":
    unittest.main()
