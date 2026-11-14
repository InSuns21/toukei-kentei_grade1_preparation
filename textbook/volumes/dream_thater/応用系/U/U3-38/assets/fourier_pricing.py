#!/usr/bin/env python3
"""U3-38: damped Fourier pricing under a dividend-paying Black--Scholes model.

Python 3 standard library only. Explicit finite-interval trapezoid quadrature:
no FFT, random sampling, or external pricing library. Runs self-tests by default.
"""
import cmath
import math


def normal_cdf(x):
    return 0.5 * math.erfc(-x / math.sqrt(2.0))


def black_scholes_call(spot, strike, rate, dividend, vol, maturity):
    if min(spot, strike, vol, maturity) <= 0:
        raise ValueError("spot, strike, vol, maturity must be strictly positive")
    d1 = (math.log(spot / strike) +
          (rate - dividend + 0.5 * vol * vol) * maturity) / (
              vol * math.sqrt(maturity))
    d2 = d1 - vol * math.sqrt(maturity)
    return (spot * math.exp(-dividend * maturity) * normal_cdf(d1) -
            strike * math.exp(-rate * maturity) * normal_cdf(d2))


def fourier_call(spot, strike, rate, dividend, vol, maturity,
                 alpha=1.5, cutoff=40.0, step=0.2):
    """Carr--Madan-style damped call with direct composite trapezoid quadrature.

    For a different model the shifted CF needs a finite (alpha+1) moment.
    This implementation only handles Gaussian log-returns (BSM).
    """
    if min(spot, strike, vol, maturity, alpha, cutoff, step) <= 0:
        raise ValueError("positive spot, strike, vol, maturity, alpha, cutoff, step required")
    intervals = round(cutoff / step)
    if intervals < 1 or not math.isclose(
            intervals * step, cutoff, rel_tol=1e-12, abs_tol=1e-12):
        raise ValueError("cutoff / step must be a positive integer")
    k = math.log(strike)
    m = math.log(spot) + (rate - dividend - 0.5 * vol * vol) * maturity
    v = vol * vol * maturity
    b = alpha + 1.0

    def integrand(u):
        z = complex(u, -b)
        shifted_cf = cmath.exp(1j * z * m - 0.5 * v * z * z)
        return (cmath.exp(-1j * u * k) * shifted_cf /
                ((alpha + 1j * u) * (alpha + 1.0 + 1j * u))).real

    total = 0.5 * (integrand(0.0) + integrand(cutoff))
    for j in range(1, intervals):
        total += integrand(j * step)
    return math.exp(-rate * maturity - alpha * k) * (step / math.pi) * total


def self_test():
    case = (100.0, 100.0, 0.05, 0.02, 0.20, 1.0)
    ref = black_scholes_call(*case)
    assert abs(ref - 9.227005508154) < 2e-11
    for alpha in (0.75, 1.5, 2.5):
        value = fourier_call(*case, alpha=alpha, cutoff=40, step=0.1)
        assert abs(value - ref) < 3e-7, (alpha, value, ref)
    for strike in (80.0, 100.0, 120.0):
        params = (100.0, strike, 0.05, 0.02, 0.20, 1.0)
        assert abs(fourier_call(*params, cutoff=60, step=0.1) -
                   black_scholes_call(*params)) < 3e-7
    no_dividend = (100.0, 90.0, 0.03, 0.0, 0.25, 0.75)
    assert abs(fourier_call(*no_dividend, cutoff=60, step=0.1) -
               black_scholes_call(*no_dividend)) < 3e-7


def main():
    self_test()
    params = (100.0, 100.0, 0.05, 0.02, 0.20, 1.0)
    exact = black_scholes_call(*params)
    print("U3-38 BSM: S=K=100 JPY, r=0.05, q=0.02, vol=0.20, T=1yr")
    print(f"Independent closed-form reference: {exact:.12f} JPY")
    print("alpha=1.5; direct frequency trapezoid (no FFT)")
    print("cutoff      step          Fourier call (JPY)        signed error (JPY)")
    for cutoff, step in ((10, 0.05), (20, 0.05), (30, 0.05),
                         (40, 0.20), (20, 0.20), (20, 0.10)):
        price = fourier_call(*params, cutoff=cutoff, step=step)
        print(f"{cutoff:6.0f} {step:9.2f} {price:26.12f} {price-exact:26.12g}")
    print("Self-tests: PASS")


if __name__ == "__main__":
    main()
