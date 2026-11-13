"""U3-16: deterministic verification of Black--Scholes--Merton PDE.

Python >= 3.10, only standard library. No market data and no randomness.
Price functions are analytic manufactured solutions for a quadratic payoff.
"""
from __future__ import annotations

import math
from dataclasses import dataclass


@dataclass(frozen=True)
class Market:
    s0: float = 100.0
    strike: float = 100.0
    rate: float = 0.03
    sigma: float = 0.20
    maturity: float = 1.0
    dividend: float = 0.0

    def __post_init__(self) -> None:
        if not all(math.isfinite(x) for x in (
            self.s0, self.strike, self.rate, self.sigma, self.maturity, self.dividend
        )):
            raise ValueError("all parameters must be finite")
        if self.s0 <= 0 or self.strike <= 0 or self.sigma <= 0 or self.maturity <= 0:
            raise ValueError("s0, strike, sigma, maturity must be positive")
        if self.dividend < 0:
            raise ValueError("continuous dividend yield must be non-negative")


def exponent(market: Market, mode: str = "correct") -> float:
    """Quadratic-claim backward exponent for a named model."""
    if mode == "correct":
        return market.rate - 2 * market.dividend + market.sigma**2
    if mode == "no_ito":
        return market.rate - 2 * market.dividend
    if mode == "no_dividend":
        return market.rate + market.sigma**2
    raise ValueError("mode must be correct, no_ito, or no_dividend")


def quadratic_value(t: float, s: float, market: Market, mode: str = "correct") -> float:
    """Value of a quadratic payoff with the chosen backward exponent."""
    if not (0 <= t <= market.maturity) or s <= 0:
        raise ValueError("expect 0 <= t <= maturity and s > 0")
    return (s * s / market.strike) * math.exp(
        exponent(market, mode) * (market.maturity - t)
    )


def analytic_terms(
    t: float, s: float, market: Market, mode: str = "correct"
) -> dict[str, float]:
    """Return four PDE terms and their sum, all in currency per year."""
    v = quadratic_value(t, s, market, mode)
    a = exponent(market, mode)
    vt = -a * v
    gamma_term = market.sigma**2 * v
    drift_term = 2 * (market.rate - market.dividend) * v
    discount_term = -market.rate * v
    return {
        "value": v,
        "delta": 2 * v / s,
        "time": vt,
        "diffusion": gamma_term,
        "carry": drift_term,
        "discount": discount_term,
        "residual": vt + gamma_term + drift_term + discount_term,
    }


def finite_difference_residual(
    t: float,
    s: float,
    market: Market,
    time_step: float,
    stock_step: float,
    mode: str = "correct",
) -> float:
    """Independent central differences: first t, first/second s.

    Deterministic truncation error is O(time_step**2 + stock_step**2).
    The stock-price payoff here is quadratic, so spatial difference error
    is zero in exact arithmetic; floating point roundoff remains.
    """
    if time_step <= 0 or stock_step <= 0:
        raise ValueError("both steps must be positive")
    if not (time_step < t < market.maturity - time_step) or s <= stock_step:
        raise ValueError("need interior time and positive shifted stock")
    at = lambda tt, ss: quadratic_value(tt, ss, market, mode)
    v = at(t, s)
    vt = (at(t + time_step, s) - at(t - time_step, s)) / (2 * time_step)
    vs = (at(t, s + stock_step) - at(t, s - stock_step)) / (2 * stock_step)
    vss = (at(t, s + stock_step) - 2 * v + at(t, s - stock_step)) / stock_step**2
    return (
        vt + 0.5 * market.sigma**2 * s**2 * vss
        + (market.rate - market.dividend) * s * vs - market.rate * v
    )


def show_table() -> None:
    print("U3-16 BSM PDE: manufactured quadratic payoff S_T^2/K")
    print("value: currency; delta: shares; residual: currency/year")
    cases = [
        ("no dividend, correct", Market(), "correct"),
        ("no dividend, omit Ito", Market(), "no_ito"),
        ("q=0.01, correct", Market(dividend=0.01), "correct"),
        ("q=0.01, omit dividends", Market(dividend=0.01), "no_dividend"),
    ]
    for name, market, mode in cases:
        result = analytic_terms(0.0, market.s0, market, mode)
        print(
            f"{name:29s} v0={result['value']:11.6f}  "
            f"delta0={result['delta']:9.6f}  R0={result['residual']:+12.6f}"
        )
    market = Market()
    t = 0.5
    print("Central differences, t=0.5, S=100, stock_step=1")
    for h in (0.08, 0.04, 0.02):
        numerical = finite_difference_residual(t, market.s0, market, h, 1.0)
        print(f"dt={h:.3f}  numerical residual={numerical:+.9f}")
    print("Exact residual=0. Finite-difference errors scale as O(dt^2).")


if __name__ == "__main__":
    show_table()
