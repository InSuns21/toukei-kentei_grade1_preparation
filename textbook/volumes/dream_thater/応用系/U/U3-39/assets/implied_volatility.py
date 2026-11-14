"""U3-39: implied volatility, bid/ask bands and one-parameter calibration.

Python 3 standard library only; values are hypothetical, not live quotes.
"""
from __future__ import annotations

import argparse
from math import erfc, exp, log, sqrt


def normal_cdf(z: float) -> float:
    return 0.5 * erfc(-z / sqrt(2.0))


def call(s: float, k: float, r: float, q: float,
         tau: float, sigma: float) -> float:
    if min(s, k, tau) <= 0 or sigma < 0 or q < 0:
        raise ValueError("require s,k,tau>0, sigma,q>=0")
    a = s * exp(-q * tau)
    b = k * exp(-r * tau)
    # sigma=0 is the continuous boundary extension, not a positive-IV solution.
    if sigma == 0:
        return max(a - b, 0.0)
    v = sigma * sqrt(tau)
    d1 = (log(s / k) + (r - q) * tau) / v + v / 2.0
    d2 = d1 - v
    return a * normal_cdf(d1) - b * normal_cdf(d2)


def vega(s: float, k: float, r: float, q: float,
         tau: float, sigma: float) -> float:
    if min(s, k, tau, sigma) <= 0 or q < 0:
        raise ValueError("positive volatility and maturity required")
    d1 = (log(s / k) + (r - q + sigma*sigma/2) * tau) / (
        sigma * sqrt(tau))
    return s * exp(-q*tau) * sqrt(tau) * exp(-d1*d1/2) / sqrt(2*3.141592653589793)


def implied_vol(price: float, s: float, k: float,
                r: float, q: float, tau: float,
                vol_tol: float = 1e-12) -> tuple[float, float, float]:
    """Return (IV, final lower bound, final upper bound)."""
    lower_price = max(s*exp(-q*tau)-k*exp(-r*tau), 0.0)
    upper_price = s * exp(-q*tau)
    if not (lower_price < price < upper_price):
        raise ValueError("outside the open positive-volatility call price interval")
    lo, hi = 0.0, 0.4  # lo uses the continuous boundary value, never the formula d1.
    while call(s, k, r, q, tau, hi) < price:
        hi *= 2.0
        if hi > 64.0:
            raise ArithmeticError("unable to bracket the IV")
    for _ in range(120):
        mid = (lo + hi) / 2.0
        if mid == lo or mid == hi or (hi-lo)/2 <= vol_tol:
            break
        if call(s, k, r, q, tau, mid) < price:
            lo = mid
        else:
            hi = mid
    return (lo+hi)/2.0, lo, hi


def fit_single_vol(s: float, r: float, q: float, tau: float,
                   strikes: list[float],
                   observations: list[float]) -> tuple[float, float]:
    """Bounded scalar minimization: no global convexity assumption."""
    if len(strikes) != len(observations) or not strikes:
        raise ValueError("length mismatch or empty quotes")

    def loss(sigma: float) -> float:
        return sum(
            (call(s, k, r, q, tau, sigma) - observed)**2
            for k, observed in zip(strikes, observations)
        )

    # Golden-section search on this illustrative data; compare endpoints too.
    left, right = 0.05, 0.8
    ratio = (sqrt(5.0)-1.0)/2.0
    x1 = right - ratio*(right-left)
    x2 = left + ratio*(right-left)
    y1, y2 = loss(x1), loss(x2)
    for _ in range(110):
        if y1 > y2:
            left, x1, y1 = x1, x2, y2
            x2 = left + ratio*(right-left)
            y2 = loss(x2)
        else:
            right, x2, y2 = x2, x1, y1
            x1 = right - ratio*(right-left)
            y1 = loss(x1)
    choices = [left, right, (left+right)/2.0, 0.05, 0.8]
    sigma = min(choices, key=loss)
    return sigma, loss(sigma)


def main() -> None:
    parser = argparse.ArgumentParser(description="Black–Scholes IV and quote calibration")
    parser.add_argument("--spread", type=float, default=0.04,
                        help="bid/ask half-spread in JPY per option")
    args = parser.parse_args()
    if not (0 < args.spread <= 0.2):
        parser.error("--spread must be between 0 and 0.2 JPY")
    s, r, q, tau = 100.0, 0.05, 0.02, 1.0
    strikes = [90.0, 100.0, 110.0]
    vols = [0.23, 0.20, 0.22]
    observations = [call(s, k, r, q, tau, vol)
                    for k, vol in zip(strikes, vols)]

    print("K / quoted mid (JPY) / inverted IV / repricing error (JPY)")
    for k, price, expected in zip(strikes, observations, vols):
        inverted, low, high = implied_vol(price, s, k, r, q, tau)
        err = call(s, k, r, q, tau, inverted) - price
        print(f"{k:6.0f} {price:16.10f} {inverted:13.10f} {err:+.3e}")
        assert abs(inverted - expected) < 1e-9
        assert low <= expected <= high
        assert abs(err) < 1e-9

    mid = observations[1]
    print(f"\nATM bid/mid/ask (half-spread={args.spread:.2f} JPY) / IV / repricing error (JPY)")
    for label, price in [("bid", mid-args.spread), ("mid", mid), ("ask", mid+args.spread)]:
        iv, low, high = implied_vol(price, s, 100.0, r, q, tau)
        err = call(s, 100.0, r, q, tau, iv)-price
        print(f"{label:4s} {price:16.12f} {iv:13.10f} {err:+.3e}")
        assert abs(err) < 1e-9 and high-low <= 2e-12

    print(f"\nATM Vega: {vega(s, 100, r, q, tau, 0.2):.8f} JPY / 1 vol unit")
    discount = exp(-r*tau)
    diffs = [observations[i]-observations[i+1] for i in (0, 1)]
    assert all(0 <= d <= discount*10 for d in diffs)
    assert observations[1] <= (observations[0]+observations[2])/2

    for vol in (0.20, 0.21480968674):
        residuals = [call(s, k, r, q, tau, vol) - price
                     for k, price in zip(strikes, observations)]
        print(f"vol={vol:.10f} price residuals={residuals} SSE={sum(x*x for x in residuals):.9f}")

    sigma_fit, obj = fit_single_vol(s, r, q, tau, strikes, observations)
    print(f"fitted constant vol={sigma_fit:.10f}, SSE={obj:.9f}")
    assert abs(sigma_fit-0.21480968674) < 1e-6
    assert abs(obj-0.56509960999) < 1e-6

    try:
        implied_vol(2.0, s, 100, r, q, tau)
    except ValueError:
        print("invalid call price 2.0 JPY: correctly rejected")
    else:
        raise AssertionError("a price below the intrinsic discounted bound was accepted")

    print("All U3-39 deterministic checks passed.")


if __name__ == "__main__":
    main()
