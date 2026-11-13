"""Regression tests: independent price finite differences and self-financing P&L."""
import math
import sys
import unittest
from pathlib import Path

sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
from greeks_hedge import Phi, indices, prices, greeks, finite_difference, one_step

class GreeksTest(unittest.TestCase):
    def setUp(self):
        self.x=(100.,100.,.05,.02,.2,1.)

    def test_oracle_values_and_parity(self):
        c,p=prices(*self.x)
        self.assertAlmostEqual(c,9.227005508154036,places=9)
        self.assertAlmostEqual(p,6.330080627549918,places=9)
        self.assertAlmostEqual(c-p,100*math.exp(-.02)-100*math.exp(-.05),places=10)
        self.assertAlmostEqual(indices(*self.x)[0],.25,places=10)
        self.assertAlmostEqual(Phi(0)+Phi(-0),1,places=12)

    def test_greek_values_and_put_call_relations(self):
        c,p=greeks(*self.x)
        self.assertAlmostEqual(c["delta"],.586851146134764,places=10)
        self.assertAlmostEqual(c["gamma"],.018950578755008718,places=10)
        self.assertAlmostEqual(c["vega"],37.901157510017434,places=8)
        self.assertAlmostEqual(c["theta"],-5.0893189139983335,places=8)
        self.assertAlmostEqual(c["rho"],49.45810910532236,places=8)
        self.assertAlmostEqual(c["delta"]-p["delta"],math.exp(-.02),places=11)
        self.assertAlmostEqual(c["gamma"],p["gamma"],places=11)
        self.assertAlmostEqual(c["vega"],p["vega"],places=11)
        self.assertAlmostEqual(c["rho"]-p["rho"],100*math.exp(-.05),places=9)
        self.assertAlmostEqual(c["theta"]-p["theta"],
                               .02*100*math.exp(-.02)-.05*100*math.exp(-.05),places=9)

    def test_pde_for_both_options(self):
        call,put=prices(*self.x)
        a,b=greeks(*self.x)
        for value,g in ((call,a),(put,b)):
            residual=g["theta"]+(.05-.02)*100*g["delta"]+.5*.2**2*100**2*g["gamma"]-.05*value
            self.assertLess(abs(residual),1e-10)

    def test_centered_differences_and_shrinking_step(self):
        g=greeks(*self.x)[0]
        coarse=finite_difference(hs=1.0,hv=.01)
        fine=finite_difference(hs=.5,hv=.005)
        for name,limit in (("delta",1e-4),("gamma",1e-5),
                           ("vega",.01),("rho",1e-4),("theta",.01)):
            self.assertLess(abs(fine[name]-g[name]),limit)
        for name in ("delta","gamma","vega"):
            self.assertLess(abs(fine[name]-g[name]),abs(coarse[name]-g[name]))

    def test_one_day_pnl_and_gamma_theta(self):
        at_zero=one_step(z=0)
        at_two=one_step(z=2)
        self.assertAlmostEqual(at_zero["pnl"],.01505722482233375,places=10)
        self.assertAlmostEqual(at_two["pnl"],-.04536746307216477,places=10)
        self.assertGreater(at_zero["pnl"],0)
        self.assertLess(at_two["pnl"],0)
        self.assertLess(abs(at_zero["difference"]),3e-4)
        self.assertLess(abs(at_two["difference"]),3e-4)
        h=one_step(dt=1/252,z=2)["difference"]
        h2=one_step(dt=1/1008,z=2)["difference"]
        self.assertLess(abs(h2),abs(h))

    def test_bad_inputs_and_boundaries(self):
        with self.assertRaises(ValueError):
            prices(100,100,.05,.02,0,1)
        with self.assertRaises(ValueError):
            prices(100,100,.05,-.01,.2,1)
        with self.assertRaises(ValueError):
            one_step(dt=1)
        with self.assertRaises(ValueError):
            finite_difference(hs=101)
        g,_=greeks(100,100,-.01,0,.2,.5)
        self.assertGreater(g["gamma"],0)
        self.assertTrue(math.isfinite(g["theta"]))
if __name__=="__main__":
    unittest.main()
